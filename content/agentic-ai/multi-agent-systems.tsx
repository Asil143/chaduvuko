import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function MultiAgentSystems() {
  return (
    <LearnLayout
      title="Multi-Agent Systems — Supervisors and Handoffs"
      description="Supervisor, router, and handoff patterns; when several agents beat one; and how to keep their cost and behaviour under control."
      section="Agentic AI & Automation — Lesson 07"
      readTime="35 min"
    >
      <Part n={1} label="The decision first" title="More Agents Add Coordination, Not Free Intelligence">
        <P>
          A multi-agent system assigns different work to multiple agent roles and coordinates the results. It can help when a
          task has genuinely separable expertise, independent work that can run in parallel, or a clear review boundary. It
          also adds model calls, latency, state hand-offs, failure modes and more permissions to manage.
        </P>
        <P>
          Start by writing the task as a workflow. If its steps are predictable, ordinary code and one model call may be enough.
          Use multiple agents only when you can explain what each role uniquely contributes and how the coordinator detects
          an incomplete or conflicting result.
        </P>
        <Callout type="tip">
          A stronger prompt, a deterministic tool, or a single agent with a structured plan is often simpler than adding a
          second agent. Compare against that baseline before building a team.
        </Callout>
      </Part>

      <Part n={2} label="Coordination patterns" title="Supervisor, Router and Handoff">
        <Table
          head={['Pattern', 'Who chooses the next step?', 'Good fit', 'Main risk']}
          rows={[
            ['Supervisor', 'A central coordinator delegates and reviews', 'A task has a few specialist sub-tasks and one owner for the final response', 'The supervisor becomes a bottleneck or keeps delegating in a loop'],
            ['Router', 'A classifier or deterministic rule selects one path', 'Requests fall into known, mostly independent categories', 'A wrong route can silently skip required checks'],
            ['Handoff', 'The current agent transfers control to a specialist', 'A specialist needs ownership of a distinct interaction or toolset', 'Context or responsibility is lost at the transfer'],
            ['Parallel specialists', 'A coordinator launches independent work and merges results', 'Independent research or extraction can be checked and combined', 'More cost, duplicated work and incompatible outputs'],
          ]}
        />
        <P>
          A pattern describes control flow, not a guarantee of quality. Pass only the context a specialist needs, define its
          output contract and preserve a clear owner for the user-facing answer.
        </P>
      </Part>

      <Part n={3} label="A supervisor" title="Make Delegation Explicit and Bounded">
        <P>
          This small example uses Python functions to make the control flow visible without a provider SDK. Each specialist
          returns a typed result. A production system can replace the functions with model calls, but should keep the same
          bounded interface and verify the result before presenting it.
        </P>
        <Code file="supervisor.py" code={`
from dataclasses import dataclass

@dataclass
class Finding:
    specialist: str
    summary: str
    evidence: list[str]


def check_order(order_id: str) -> Finding:
    return Finding("orders", f"Order {order_id} is in transit.", ["order-status"])


def search_policy(question: str) -> Finding:
    return Finding("policy", "Refund eligibility depends on order status.", ["refund-policy-v3"])


def supervise(question: str, order_id: str) -> dict:
    # Delegation is explicit: only these two read-only specialists are callable.
    findings = [check_order(order_id), search_policy(question)]
    if not all(item.summary and item.evidence for item in findings):
        return {"status": "needs_review", "findings": findings}
    return {
        "status": "ready_to_draft",
        "findings": [item.__dict__ for item in findings],
    }

if __name__ == "__main__":
    print(supervise("Can I get a refund?", "ORD-1001"))
`} />
        <Callout type="example">
          For a support request, a supervisor might ask an order specialist for verified status and a policy specialist for
          a cited rule. Neither specialist should issue a refund; that consequential operation belongs behind a separate
          approval workflow.
        </Callout>
      </Part>

      <Part n={4} label="Handoffs" title="Transfer Ownership with a Contract">
        <P>
          A handoff is more than adding a second name to a prompt. It should carry a task, a small context packet and an
          explicit return shape. The receiving agent needs enough information to act, but should not inherit unrelated private
          conversation history or credentials.
        </P>
        <Code file="handoff_contract.py" code={`
from dataclasses import dataclass
from typing import Literal

@dataclass(frozen=True)
class Handoff:
    target: Literal["order_specialist", "policy_specialist"]
    task: str
    context: dict[str, str]
    expected_fields: tuple[str, ...]


def route_request(category: str, order_id: str) -> Handoff:
    if category == "delivery_status":
        return Handoff(
            target="order_specialist",
            task="Return verified status and ETA only.",
            context={"order_id": order_id},
            expected_fields=("status", "verified_eta", "source_id"),
        )
    return Handoff(
        target="policy_specialist",
        task="Find the applicable policy and return a supporting citation.",
        context={"topic": category},
        expected_fields=("answer", "policy_id", "section"),
    )
`} />
        <Steps items={[
          'Name the target specialist and its allowed capability set.',
          'Send a task statement plus the minimum verified context required.',
          'Require a structured result and validate required fields and evidence.',
          'Record the handoff and result under one trace ID; escalate instead of silently guessing.',
        ]} />
      </Part>

      <Part n={5} label="When not to split" title="Prefer One Agent or a Deterministic Workflow When">
        <Bullets items={[
          <span key="simple">The task is short, sequential and already has a clear tool-call sequence.</span>,
          <span key="shared">Specialists would need the same context and produce nearly identical answers.</span>,
          <span key="state">A handoff would make it hard to keep one authoritative state or user conversation.</span>,
          <span key="impact">The task can change money, access or records and the approval boundary is not yet defined.</span>,
          <span key="budget">The added model calls do not measurably improve success enough to justify latency and operating cost.</span>,
        ]} />
        <P>
          In a predictable workflow, put control flow in code. Reserve model discretion for ambiguous interpretation, then
          keep business rules, permissions, retries and final validation deterministic wherever practical.
        </P>
        <Callout type="warning">
          Never let an agent delegate around a denied action. The coordinator and specialists must share the same policy
          boundary, and a sensitive action must remain blocked unless its required approval is present.
        </Callout>
      </Part>

      <Part n={6} label="Control the run" title="Set Budgets, Stop Conditions and Recovery Paths">
        <P>
          Multi-agent loops need explicit limits. Bound the number of handoffs, tool calls, elapsed time and total model work.
          Define a response for a timeout or partial result. Do not retry an uncertain write as if it were a harmless read;
          first determine whether the operation already happened.
        </P>
        <Code file="bounded_runner.py" code={`
def run_team(initial_task: str, max_handoffs: int = 4) -> dict:
    task = initial_task
    history = []
    for turn in range(max_handoffs + 1):
        result = dispatch_one_step(task)
        history.append(result)
        if result["status"] == "complete":
            return {"status": "complete", "answer": result["answer"], "history": history}
        if result["status"] != "handoff" or turn == max_handoffs:
            break
        task = result["next_task"]
    return {"status": "needs_human", "history": history}

# dispatch_one_step is the application adapter to tested, allowlisted specialists.
`} />
        <P>
          In a real service, add request deadlines and cancellation, per-user concurrency limits, idempotency for writes and
          a durable record of approval state. Use an overall budget as well as a per-agent limit; otherwise a coordinator can
          multiply a seemingly small limit by repeatedly creating new work.
        </P>
      </Part>

      <Part n={7} label="Common mistakes" title="Multi-Agent Failure Modes">
        <Mistakes items={[
          { mistake: 'Creating an agent for every role in an org chart', cause: 'Role names do not prove tasks are separable or need different capabilities.', fix: 'Measure a single-agent baseline and add a specialist only for a demonstrated gap.' },
          { mistake: 'Passing the entire conversation to every specialist', cause: 'Convenience expands privacy exposure and can bury the relevant task.', fix: 'Create a minimal, typed handoff packet with only authorised fields.' },
          { mistake: 'Letting specialists return free-form answers only', cause: 'The supervisor cannot reliably check completion, provenance or missing fields.', fix: 'Specify and validate structured outputs with evidence references.' },
          { mistake: 'Allowing unlimited delegation or retry loops', cause: 'A failed coordinator can amplify cost, latency and external side effects.', fix: 'Enforce global budgets, deadlines, idempotency and a human escalation path.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Design a Delivery-and-Policy Team">
        <Practice
          title="Compare one agent with a small supervised team"
          tasks={[
            'Write a deterministic baseline for answering an order-status question from an order record and a policy excerpt.',
            'Identify one distinct task that could benefit from an order specialist and one from a policy specialist.',
            'Implement a supervisor with explicit handoff inputs and validated structured outputs; keep both specialists read-only.',
            'Add a maximum handoff count and a needs-human outcome for missing or conflicting evidence.',
            'Test an unknown order, a policy conflict and a specialist timeout; compare success, latency and model-call count with the baseline.',
          ]}
          hint="Do not use model calls to simulate agent roles until you have a useful baseline and can state what each additional call is meant to improve."
        />
      </Part>

      <KeyTakeaways items={[
        'A multi-agent system is justified by separable expertise, parallel work or a clear ownership boundary—not by novelty.',
        'A supervisor delegates and reviews; a router selects a known path; a handoff transfers bounded ownership.',
        'Pass minimal context and enforce structured outputs so the coordinator can validate evidence and completion.',
        'Do not use multiple agents for simple predictable workflows or when they add cost without measurable quality gains.',
        'Bound total handoffs, tools, time and model work; make failure and human escalation explicit.',
        'Keep sensitive actions behind the same authorisation and approval rules across every agent.',
      ]} />

      <Bullets items={[
        <span key="refs">Further reading: orchestration-framework documentation such as LangGraph concepts for routing, state and handoffs; use official docs for the framework version you adopt.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/agentic-ai/agent-evaluation-observability"
        label="Lesson 08 · Testing, Evaluating and Tracing Agents"
        text="A team can appear convincing while hiding a bad tool call or incomplete result. Next, test trajectories, measure task outcomes and trace each step."
      />
    </LearnLayout>
  )
}
