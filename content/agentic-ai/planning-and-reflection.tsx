import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function PlanningAndReflection() {
  return (
    <LearnLayout
      title="Planning, Reflection and Error Recovery"
      description="Use ReAct and plan-and-execute patterns, check results, and recover from errors with bounded retries and fallbacks."
      section="Agentic AI & Automation — Lesson 03"
      readTime="30 min"
    >
      <Part n={1} label="From loop to plan" title="Multi-Step Work Needs Checkpoints">
        <P>
          A one-tool request can often run as a simple observe–think–act loop. A task such as preparing a weekly delivery
          report needs several dependent steps: fetch orders, group by status, calculate totals, and verify that the report is
          complete. If the agent jumps straight to an answer, it may skip a source or confuse a tool failure with an empty
          result. Planning makes the intended work inspectable; checkpoints let the application catch a wrong turn.
        </P>
        <P>
          A plan is not a guarantee. A tool can fail, the data can contradict an assumption, and the task can change while it
          runs. Keep steps small, tie them to evidence, and let the executor revise or stop when new observations invalidate
          the plan. Human review is appropriate when the next action has financial, privacy, or operational impact.
        </P>
        <Table
          head={['Pattern', 'How it works', 'Useful when']}
          rows={[
            ['ReAct-style loop', 'Reason about the next step, act once, inspect the observation, repeat', 'The next tool depends on what the last tool returned'],
            ['Plan-and-execute', 'Create a structured plan, execute one step at a time, then re-plan if needed', 'The task has several known milestones'],
            ['Reflection / verification', 'Compare a result with explicit checks and repair or escalate', 'Completeness or correctness needs a second check'],
          ]}
        />
        <Callout type="info">
          Keep the model&apos;s internal reasoning private. Ask for structured decisions, brief evidence references, and a concise
          user-facing explanation; do not make a long chain-of-thought transcript your audit log.
        </Callout>
      </Part>

      <Part n={2} label="ReAct" title="Act in Small Steps and Use Real Observations">
        <P>
          ReAct is shorthand for combining reasoning and acting in a repeated loop. At each turn, the agent receives the goal
          and observations, selects one allowed action, and then incorporates the tool result. The important engineering
          property is not the name: each action is grounded in an observation and executed through your validated tool
          boundary. If the tool returns no matching order, the next step should not invent one.
        </P>
        <Code file="react_loop.py" code={`
from typing import Any


def run_react(goal: str, decide, tools: dict[str, Any], max_steps: int = 5):
    observations = []
    for step in range(max_steps):
        decision = decide(goal, observations)
        if decision["kind"] == "done":
            return {"status": "complete", "answer": decision["answer"], "steps": step}
        if decision["kind"] != "tool" or decision["tool"] not in tools:
            return {"status": "invalid_action", "steps": step}
        try:
            result = tools[decision["tool"]](**decision["args"])
            observations.append({"tool": decision["tool"], "result": result})
        except TimeoutError:
            observations.append({"tool": decision["tool"], "error": "timeout"})
    return {"status": "step_limit", "observations": observations}


def lookup_status(order_id: str) -> dict[str, str]:
    return {"order_id": order_id, "status": "Out for delivery"}


def local_decision(goal: str, observations: list[dict]):
    if observations:
        status = observations[-1]["result"]["status"]
        return {"kind": "done", "answer": "Current status: " + status}
    return {"kind": "tool", "tool": "lookup", "args": {"order_id": "A104"}}


result = run_react("Check order A104", local_decision, {"lookup": lookup_status})
print(result)
`} />
        <P>
          This example keeps the policy deterministic so you can test the runner without an LLM. A model-backed decision
          function would return a structured action request, but the loop should still validate the action, execute one step,
          append an observation, and enforce the cap. Never let a model update the <code>observations</code> list as if it were
          a tool result.
        </P>
        <Callout type="tip">
          Prefer one action per turn when a result can change what should happen next. A batch of independent, read-only
          lookups can be parallelised by ordinary application code after validation.
        </Callout>
      </Part>

      <Part n={3} label="Plan and execute" title="Represent Plans as Data">
        <P>
          Ask for a plan with explicit steps, expected evidence, and a completion condition. A plan step can be a short label
          and permitted operation, not a paragraph of hidden reasoning. Validate the structure before execution: reject
          unknown tools, excessive step counts, or missing required arguments. The executor should re-check permissions at
          action time because a plan may be old or the user&apos;s access may have changed.
        </P>
        <Code file="plan_execute.py" code={`
from dataclasses import dataclass

@dataclass
class Step:
    name: str
    tool: str
    args: dict[str, str]
    expected: str


def execute_plan(plan: list[Step], tools: dict, max_steps: int = 5):
    if not plan or len(plan) > max_steps:
        return {"status": "invalid_plan", "results": []}

    results = []
    for step in plan:
        if step.tool not in tools:
            return {"status": "blocked", "failed_step": step.name, "results": results}
        try:
            value = tools[step.tool](**step.args)
        except TimeoutError:
            return {"status": "retryable_failure", "failed_step": step.name, "results": results}
        results.append({"step": step.name, "expected": step.expected, "value": value})
    return {"status": "ready_for_verification", "results": results}


def fetch_orders(day: str) -> list[dict[str, str]]:
    return [{"status": "delivered"}, {"status": "in_transit"}]


plan = [Step("fetch", "orders", {"day": "today"}, "Orders are returned")]
print(execute_plan(plan, {"orders": fetch_orders}))
`} />
        <P>
          The date in a real report must come from an explicit timezone-aware request or trusted business context, not a guess
          made by the model. This small executor also stops at the first failed step. Whether the right response is retry,
          re-plan, ask for clarification, or escalate depends on the failure category and the operation&apos;s safety.
        </P>
      </Part>

      <Part n={4} label="Reflection" title="Verify Against Criteria, Not Vibes">
        <P>
          Reflection means checking an intermediate or final result against criteria. For a report, checks might confirm that
          all requested regions appear, totals reconcile with source rows, and no division by zero occurred. Prefer
          deterministic assertions for facts that code can verify. A model can help notice an ambiguity or suggest a repair,
          but an ungrounded self-critique is not an independent correctness guarantee.
        </P>
        <Code file="verify_report.py" code={`
def verify_report(expected_regions: set[str], report: dict, source_totals: dict[str, int]):
    problems = []
    actual_regions = set(report.get("regions", {}))
    if actual_regions != expected_regions:
        problems.append("Region coverage does not match the request")

    for region, expected_total in source_totals.items():
        actual = report.get("regions", {}).get(region, {}).get("orders")
        if actual != expected_total:
            problems.append("Order count mismatch for " + region)

    return {"ok": not problems, "problems": problems}


expected = {"Hyderabad", "Vijayawada"}
report = {"regions": {"Hyderabad": {"orders": 12}, "Vijayawada": {"orders": 8}}}
print(verify_report(expected, report, {"Hyderabad": 12, "Vijayawada": 8}))
`} />
        <P>
          If checks fail, keep the failure attached to the run. A repair step should identify what evidence is missing and
          whether a permitted operation can provide it. If the source data itself is inconsistent, stop and surface the
          discrepancy instead of asking the model to write a more persuasive explanation.
        </P>
      </Part>

      <Part n={5} label="Retries" title="Retry Only Failures That Can Recover">
        <P>
          A timeout or transient service failure may recover if retried. A permission denial, invalid input, or missing record
          usually will not. Define error categories, retry only safe transient failures, and use exponential backoff with
          jitter when the underlying client does not already manage retries. Set an attempt cap and an overall deadline.
          Also consider idempotency: if a request timed out after the server performed a write, repeating it could duplicate
          the effect.
        </P>
        <Code file="retry_policy.py" code={`
import random
import time


def retry_read(operation, attempts: int = 3, sleep=time.sleep):
    for attempt in range(attempts):
        try:
            return operation()
        except TimeoutError:
            if attempt == attempts - 1:
                raise
            delay = min(8.0, 0.5 * (2 ** attempt)) + random.random() * 0.25
            sleep(delay)


def read_status():
    return {"status": "Out for delivery"}


print(retry_read(read_status))
`} />
        <P>
          Retry logic should live at one well-defined boundary. If the SDK retries and your agent retries and the queue retries,
          a single request can multiply into many attempts. Include attempt counts in traces, set an overall request budget,
          and provide a fallback or escalation when the budget is used up.
        </P>
        <Callout type="warning">
          Do not blindly retry writes such as issuing a refund. Use an idempotency key and check the operation&apos;s status, or
          require a person to resolve an ambiguous outcome before attempting it again.
        </Callout>
      </Part>

      <Part n={6} label="Fallbacks" title="Fail Safely and Make the Next Step Clear">
        <P>
          A fallback is a controlled alternative, not a second chance to do anything. If a knowledge search is unavailable,
          the assistant can say it could not verify an answer and offer human support. If a required report source is missing,
          mark the report incomplete rather than filling gaps from model knowledge. If a low-risk tool fails temporarily, a
          bounded retry may be appropriate. Give each failure class a known status and user-facing response.
        </P>
        <Table
          head={['Condition', 'Safe response', 'Avoid']}
          rows={[
            ['Transient read timeout', 'Bounded retry, then report unavailable', 'Retry forever'],
            ['Authorization denied', 'Stop and explain access is needed', 'Ask the model to find another route'],
            ['Conflicting source records', 'Show the discrepancy and escalate', 'Pick the more plausible value'],
            ['No evidence for a claim', 'Ask a question or say it is unverified', 'Invent a likely answer'],
          ]}
        />
        <P>
          A fallback must preserve the same permissions as the main path. Never downgrade to a broader search, another
          customer&apos;s record, or an unapproved external service simply because the preferred tool is down. Record the failure
          category, but keep raw personal content out of routine logs.
        </P>
      </Part>

      <Part n={7} label="Production" title="Keep Plans, Budgets and Evidence Auditable">
        <P>
          A production run should expose its current step, status, attempt count, elapsed time, and verification outcome.
          Model-generated plans can change between runs, so store the validated plan snapshot alongside the run and record
          meaningful revisions. Protect that data with access controls and a retention policy. The person reviewing a task
          needs evidence about what happened, not an unrestricted dump of private reasoning.
        </P>
        <Steps items={[
          'Define a small set of terminal states: complete, needs input, waiting for approval, failed, and timed out.',
          'Set maximum steps, per-tool timeout, total deadline, retry budget, and any spend or rate budget.',
          'Verify outputs with code-based checks wherever possible; record the check result and source references.',
          'Exercise invalid plans, empty results, rate limits, partial failures, and repeated execution in tests.',
        ]} />
        <Callout type="example">
          For a Swiggy-style delivery dashboard, an agent can plan to fetch and summarise statuses. The application should
          calculate totals from the records and show which time window was queried; the model should not invent totals to make
          the summary look complete.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Trusting a plan because it sounds complete', cause: 'Plans can omit a data source, exceed permissions, or contain invalid steps.', fix: 'Validate schema, tools, arguments, step count, and authorization before executing.' },
          { mistake: 'Using reflection as the only quality check', cause: 'A model can confidently approve its own unsupported result.', fix: 'Use deterministic checks and source evidence; use model review only as an additional signal.' },
          { mistake: 'Retrying all errors or every operation', cause: 'Permanent errors never improve, and repeated writes can duplicate effects.', fix: 'Classify failures, cap transient retries, and make writes idempotent or approval-gated.' },
          { mistake: 'Treating a fallback as permission to guess', cause: 'Unavailable evidence does not make model knowledge authoritative.', fix: 'Stop, disclose uncertainty, ask for input, or route to a qualified person.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Plan and Verify a Weekly Operations Report">
        <Practice
          title="An evidence-based plan with recovery"
          tasks={[
            'Write a three-step structured plan to fetch, aggregate, and verify sample delivery data.',
            'Reject a plan containing an unregistered tool or more steps than the configured maximum.',
            'Add a deterministic check that catches a missing region or mismatched total.',
            'Simulate one timeout and verify the retry policy stops at its attempt cap.',
            'Create a fallback response for conflicting source records that does not invent a resolution.',
          ]}
          hint="Use fixture data and fake tools. Assert statuses and tool calls as well as the final report text."
        />
      </Part>

      <KeyTakeaways items={[
        'ReAct alternates a decision with an action and a real observation; plan-and-execute makes multi-step milestones explicit.',
        'Represent plans as validated data with permitted tools, expected evidence, and a completion condition.',
        'Verify with deterministic checks whenever possible; model reflection is not independent proof.',
        'Retry only recoverable failures, with attempt limits, deadlines, backoff, and idempotency for writes.',
        'Use fallbacks that preserve permissions and disclose uncertainty rather than guessing.',
        'Trace validated steps, outcomes, and verification results without storing unnecessary private reasoning or personal data.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/agentic-ai/langgraph-workflows"
        label="Lesson 04 · Building Agent Workflows with LangGraph"
        text="You have the building blocks. Next, represent state and control flow explicitly as a graph that can route and checkpoint work."
      />
    </LearnLayout>
  )
}
