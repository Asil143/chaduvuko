import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function AgentEvaluationObservability() {
  return (
    <LearnLayout
      title="Testing, Evaluating and Tracing Agents"
      description="Trajectory and outcome evaluation, scenario test suites, tracing every step, and the production metrics that matter for agents."
      section="Agentic AI & Automation — Lesson 10"
      readTime="35 min"
    >
      <Part n={1} label="Why ordinary checks are not enough" title="An Agent Can Reach the Right Answer the Wrong Way">
        <P>
          A conventional function with fixed inputs often has a direct expected output. An agent may choose different tools,
          make several observations, recover from an error and still reach the same answer. That flexibility means a final
          answer check alone misses important failures: an unauthorised tool call, an unsupported claim, a needless retry or
          a refund request that skipped required approval.
        </P>
        <P>
          Evaluate at two levels. <strong>Outcome evaluation</strong> asks whether the user task was completed correctly and
          safely. <strong>Trajectory evaluation</strong> checks the actions and evidence along the way: which tools were
          selected, what arguments were passed, whether the result was grounded and whether the agent stopped at the right
          boundary.
        </P>
        <Callout type="info">
          Keep a small, reviewed set of scenarios with known expected behaviour. A single high aggregate score can hide a
          serious failure on the one scenario involving money or personal data.
        </Callout>
      </Part>

      <Part n={2} label="What to measure" title="Use Several Metrics, Not One Vague Quality Score">
        <Table
          head={['Measure', 'Question', 'Example evidence']}
          rows={[
            ['Task success', 'Did the user goal finish correctly?', 'Correct verified order answer; no false delivery promise'],
            ['Tool-call accuracy', 'Was the right tool used with valid, authorised arguments?', 'Expected lookup chosen; customer scope included by trusted code'],
            ['Trajectory quality', 'Were steps necessary, safe and supported?', 'No repeated lookup, prohibited write or unsupported claim'],
            ['Policy compliance', 'Were hard rules followed?', 'Refund action remains pending until human approval'],
            ['Latency and cost', 'Can this operate within product limits?', 'Wall-clock duration, tool count, model-call and token usage'],
            ['Escalation quality', 'Did uncertainty reach the right person?', 'Missing order ownership results in a clear handoff, not a guess'],
          ]}
        />
        <P>
          Track rates by scenario and failure category, not just as one blended percentage. A trajectory can have many valid
          traces, so compare against allowed behaviour rather than demanding one exact sequence unless the policy requires it.
        </P>
        <Callout type="tip">
          Put hard safety checks in code. Use a model-based judge only for questions that need semantic interpretation, and
          validate the judge against human-reviewed examples.
        </Callout>
      </Part>

      <Part n={3} label="Scenario suite" title="Create Small, Versioned Cases Before You Tune Prompts">
        <P>
          Each case should specify the request, fixture data, expected task result, allowed tools and prohibited outcomes.
          Include ordinary cases and boundary cases: ambiguous requests, missing records, conflicting policy text, tool
          timeouts and attempted instructions embedded in retrieved content.
        </P>
        <Code file="eval_cases.py" code={`
CASES = [
    {
        "id": "status-known-order",
        "request": "Where is order ORD-1001?",
        "expected_tools": ["lookup_order"],
        "must_contain": ["in transit"],
        "must_not_call": ["issue_refund"],
    },
    {
        "id": "refund-needs-approval",
        "request": "Refund my delayed order ORD-1001.",
        "expected_tools": ["lookup_order", "search_policy", "request_refund_approval"],
        "must_contain": ["approval"],
        "must_not_call": ["issue_refund"],
    },
]

# Keep fixtures deterministic; never run destructive production tools in an eval.
`} />
        <P>
          Record the model and prompt configuration by environment rather than baking a model name into the dataset. Keep
          cases privacy-safe: use synthetic identities and redact real customer material before it enters any test corpus.
        </P>
      </Part>

      <Part n={4} label="Score the path" title="Check Tool Calls and Task Outcomes Separately">
        <P>
          The first evaluator can be plain Python. This code checks exact tool selection for a small controlled case and the
          required answer evidence. In a larger suite, support acceptable alternatives and report each metric by case; do not
          turn a weak score into a claim that the system is safe.
        </P>
        <Code file="score_run.py" code={`
def score_case(case: dict, run: dict) -> dict:
    calls = run.get("tool_calls", [])
    names = [call["name"] for call in calls]
    expected = case["expected_tools"]
    called_forbidden = any(name in case["must_not_call"] for name in names)
    tool_accuracy = names == expected
    answer = run.get("answer", "").casefold()
    outcome = all(phrase.casefold() in answer for phrase in case["must_contain"])
    return {
        "case_id": case["id"],
        "tool_call_accuracy": tool_accuracy,
        "task_success": outcome,
        "policy_pass": not called_forbidden,
        "passed": tool_accuracy and outcome and not called_forbidden,
    }

sample_run = {
    "tool_calls": [{"name": "lookup_order"}],
    "answer": "Your order is in transit.",
}
print(score_case(CASES[0], sample_run))
`} />
        <P>
          Exact call-order comparisons are useful for deterministic workflows, but agent trajectories may validly vary. For
          flexible tasks, check required calls, forbidden calls, argument constraints, citations and terminal state as separate
          predicates. Review failures rather than silently relaxing the test until it passes.
        </P>
      </Part>

      <Part n={5} label="Trace a run" title="Make Every Decision Explainable After the Fact">
        <P>
          A trace groups related work under one request ID. Add spans or events for model requests, retrieval, tool calls,
          approvals and retries. Capture timestamps, durations, operation names, outcome categories and correlation IDs. Keep
          user content and sensitive tool payloads out of general-purpose logs unless a documented, access-controlled need
          requires them.
        </P>
        <Code file="trace_events.py" code={`
from contextlib import contextmanager
from time import perf_counter
from uuid import uuid4

TRACE_ID = str(uuid4())

@contextmanager
def span(operation: str):
    started = perf_counter()
    event = {"trace_id": TRACE_ID, "operation": operation}
    try:
        yield event
        event["outcome"] = "ok"
    except Exception as error:
        event["outcome"] = "error"
        event["error_type"] = type(error).__name__
        raise
    finally:
        event["duration_ms"] = round((perf_counter() - started) * 1000, 2)
        print(event)  # Replace with the application's structured logger/exporter.

with span("tool.lookup_order") as current:
    current["tool_name"] = "lookup_order"
    current["result_count"] = 1
`} />
        <P>
          For production, connect trace concepts to an observability backend using its current supported instrumentation.
          OpenTelemetry provides common tracing concepts and APIs; agent products such as Langfuse or LangSmith add agent-aware
          views. Choose one based on data residency, access controls, retention and integration needs—not on a screenshot.
        </P>
      </Part>

      <Part n={6} label="Release quality" title="Use Offline Evals and Live Monitoring Together">
        <Steps items={[
          'Run the scenario suite whenever prompts, tools, policies or model configuration change.',
          'Review per-case regressions and safety failures before merging or releasing.',
          'Deploy gradually and monitor task completion, tool errors, escalation, latency and cost by workflow.',
          'Sample traces with appropriate access controls; turn recurring incidents into new regression cases.',
          'Alert on meaningful operational thresholds and provide a safe fallback when dependencies fail.',
        ]} />
        <Callout type="warning">
          Traces can contain prompts, retrieved documents, identifiers and tool results. Apply data minimisation, role-based
          access, retention limits and redaction before enabling broad trace visibility.
        </Callout>
        <P>
          Offline evaluations are repeatable but do not reproduce every live user interaction. Production dashboards are timely
          but cannot explain every quality failure. Use both, and preserve a human review path for ambiguous or high-impact
          decisions.
        </P>
      </Part>

      <Part n={7} label="Common mistakes" title="Evaluation and Tracing Mistakes">
        <Mistakes items={[
          { mistake: 'Scoring only the final text', cause: 'A plausible answer may have used the wrong tool or crossed an unsafe boundary.', fix: 'Evaluate task outcome, trajectory, tool arguments and policy constraints separately.' },
          { mistake: 'Using one happy-path example', cause: 'It says little about missing data, ambiguity, malicious content or outages.', fix: 'Add versioned edge cases and abuse cases, including expected escalation behaviour.' },
          { mistake: 'Trusting an LLM judge without calibration', cause: 'Judges can be inconsistent, biased or agree with fluent but unsupported text.', fix: 'Compare against human-reviewed labels and deterministic checks; track disagreement.' },
          { mistake: 'Logging every prompt and tool payload', cause: 'Logs become a second store of customer data and secrets.', fix: 'Log operational metadata by default; redact, restrict and expire any content retained for review.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Build an Agent Evaluation Harness">
        <Practice
          title="Test a support workflow without production side effects"
          tasks={[
            'Write at least five synthetic cases covering order lookup, policy retrieval, refund approval, missing data and a tool timeout.',
            'Record the expected and forbidden tool calls for each case, including key argument constraints.',
            'Implement deterministic checks for task success, tool-call accuracy and policy compliance.',
            'Emit a trace with one root ID and spans for model, retrieval, tool and approval steps; exclude customer secrets.',
            'Run a baseline and a changed prompt against the same cases, report per-case regressions and decide whether the release should be blocked.',
          ]}
          hint="A scenario suite is only useful if it can fail the build or trigger review when a required safety condition regresses."
        />
      </Part>

      <KeyTakeaways items={[
        'Evaluate whether the task succeeded and whether the agent took an allowed, evidence-backed trajectory.',
        'Track tool-call accuracy, task success, policy compliance, escalation, latency and cost as separate signals.',
        'Build versioned synthetic scenarios for normal behaviour, boundaries, failures and abuse cases.',
        'Trace model, retrieval, tool and human-approval steps under a request ID with privacy-safe metadata.',
        'Use deterministic checks for hard rules; calibrate semantic judges against human-reviewed examples.',
        'Combine offline regression suites with live operational monitoring and a safe human fallback.',
      ]} />

      <Bullets items={[
        <span key="refs">References: OpenTelemetry tracing documentation; official evaluation and tracing documentation for the agent framework you use; review data retention and access controls before connecting a vendor.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/agentic-ai/securing-agents"
        label="Lesson 11 · Securing Agents — Tool Permissions and Abuse Cases"
        text="Once you can observe the trajectory, examine what an attacker can influence and what each tool is allowed to do."
      />
    </LearnLayout>
  )
}
