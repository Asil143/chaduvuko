import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function HumanInTheLoop() {
  return (
    <LearnLayout
      title="Human-in-the-Loop Approvals and Interrupts"
      description="Pause an agent before risky actions, collect approval or edits from a person, and resume safely with an audit trail."
      section="Agentic AI & Automation — Lesson 05"
      readTime="30 min"
    >
      <Part n={1} label="Why pause?" title="Let the Agent Prepare; Let a Person Decide">
        <P>
          Agents can gather evidence and prepare a proposed action, but some decisions deserve a person&apos;s judgment. An
          assistant might prepare a refund request, draft a customer message, or propose a change to an account. Before a
          sensitive or consequential action, it can pause, show the person the proposed action and relevant evidence, and
          wait for an explicit decision. This is a control boundary, not a way to make the model more confident.
        </P>
        <P>
          Human-in-the-loop (HITL) may mean approval, rejection, editing, clarification, or escalation. Choose the specific
          decision the person is being asked to make. Do not frame a vague &quot;continue?&quot; button as informed approval if the
          person cannot see the target, scope, and consequence of the action.
        </P>
        <Table
          head={['Interaction', 'What the person does', 'Example']}
          rows={[
            ['Approval', 'Approve or reject a specific proposed operation', 'Approve a refund request after reviewing order evidence'],
            ['Edit', 'Change a bounded field before execution', 'Correct a draft reply or adjust a proposed date'],
            ['Clarification', 'Supply information the system lacks', 'Confirm which order the request refers to'],
            ['Escalation', 'Take over a decision outside the agent scope', 'Route a disputed payment to a support specialist'],
          ]}
        />
        <Callout type="info">
          An interrupt pauses graph execution. The application still has to authenticate the reviewer, display context, record
          the decision, and ensure the resumed run is the one that reviewer was allowed to control.
        </Callout>
      </Part>

      <Part n={2} label="Approval design" title="Make the Review Request Specific">
        <P>
          Present a concise action summary, the affected account or record, the reason, source evidence, and the decision
          choices. For an edit, show exactly which field may change and validate the edited value before resuming. Provide
          reject and cancel paths, and tell the requester when the task is waiting. The reviewer should be able to inspect
          enough evidence without exposing unrelated customer data.
        </P>
        <Steps items={[
          'Build a proposal from validated application state, not free-form model text alone.',
          'Show who or what is affected, the action, its amount or scope, and the evidence used.',
          'Collect an authenticated decision with an explicit approve, reject, or edit choice.',
          'Revalidate permissions and business rules at execution time, then record the outcome.',
        ]} />
        <Callout type="warning">
          Approval is not a permanent permission token. Check that the proposal has not changed, expired, or been applied
          already before executing it, and reject stale approvals.
        </Callout>
      </Part>

      <Part n={3} label="LangGraph interrupt" title="Pause a Graph and Resume With a Decision">
        <P>
          LangGraph provides <code>interrupt()</code> for pausing a node and <code>Command(resume=...)</code> for supplying a
          resume value. Compile the graph with a checkpointer and pass a stable, application-controlled thread ID so the
          paused state can be found again. The interrupt payload is information for the application to display; do not treat
          a value returned from the browser as trusted until the server authenticates and validates it.
        </P>
        <Code file="approval_graph.py" code={`
from typing import TypedDict
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.graph import END, START, StateGraph
from langgraph.types import Command, interrupt

class RefundState(TypedDict, total=False):
    order_id: str
    amount_paise: int
    decision: dict
    result: str


def approval_gate(state: RefundState) -> dict:
    decision = interrupt({
        "kind": "refund_approval",
        "order_id": state["order_id"],
        "amount_paise": state["amount_paise"],
        "question": "Approve this refund proposal?",
    })
    return {"decision": decision}


def apply_decision(state: RefundState) -> dict[str, str]:
    decision = state["decision"]
    if decision.get("approved") is not True:
        return {"result": "Rejected; no refund was issued."}
    # Replace with an idempotent, permission-checked payment service call.
    return {"result": "Approved proposal is ready for the authorised refund service."}


def route_after_review(state: RefundState) -> str:
    return "apply" if state["decision"].get("approved") is True else "stop"


def stop(state: RefundState) -> dict[str, str]:
    return {"result": "Rejected; no refund was issued."}


builder = StateGraph(RefundState)
builder.add_node("approval", approval_gate)
builder.add_node("apply", apply_decision)
builder.add_node("stop", stop)
builder.add_edge(START, "approval")
builder.add_conditional_edges("approval", route_after_review, {"apply": "apply", "stop": "stop"})
builder.add_edge("apply", END)
builder.add_edge("stop", END)
graph = builder.compile(checkpointer=InMemorySaver())
config = {"configurable": {"thread_id": "refund-run-104"}}

paused = graph.invoke({"order_id": "A104", "amount_paise": 25000}, config)
print(paused["__interrupt__"])
# The server resumes only after authenticating the reviewer and validating this decision.
finished = graph.invoke(Command(resume={"approved": False}), config)
print(finished["result"])
`} />
        <P>
          Run the sample in an environment with LangGraph installed. The first call stops at the interrupt; the second sends
          a rejection to the same thread, so the state routes to the no-action branch. The approval example deliberately
          does not issue money: a real payment integration must verify current ownership and limits, use an idempotency key,
          and record the service result. In-memory checkpointing is for demonstration, not durable production recovery.
        </P>
      </Part>

      <Part n={4} label="Resume safely" title="Bind the Decision to the Exact Proposal">
        <P>
          Resuming with <code>Command(resume=...)</code> is a continuation mechanism, not a complete approval system. Your
          backend should bind the reviewer, run ID, proposed action, and decision in a durable record. Before resuming, verify
          that the reviewer has authority for that action and that the proposal hash or version still matches what they saw.
          Reject duplicate submissions and stale decisions. An approval from one customer or one refund must not be reusable
          for another.
        </P>
        <Code file="validate_approval.py" code={`
from dataclasses import dataclass

@dataclass(frozen=True)
class Approval:
    run_id: str
    proposal_id: str
    reviewer_id: str
    approved: bool
    proposal_version: int


def validate_resume(
    approval: Approval,
    expected_run_id: str,
    expected_proposal_id: str,
    expected_version: int,
    reviewer_can_approve: bool,
) -> dict[str, bool]:
    if approval.run_id != expected_run_id:
        raise ValueError("Approval belongs to another run")
    if approval.proposal_id != expected_proposal_id:
        raise ValueError("Approval belongs to another proposal")
    if approval.proposal_version != expected_version:
        raise ValueError("Proposal changed after review")
    if not reviewer_can_approve:
        raise PermissionError("Reviewer is not authorised")
    return {"approved": approval.approved}
`} />
        <P>
          In a service, load the proposal and reviewer permissions from trusted storage, not from fields submitted by the
          browser. The approval decision should be recorded before or atomically with the resume request so a network retry
          cannot silently lose the audit record. Use an idempotent resume handler and a unique decision identifier.
        </P>
      </Part>

      <Part n={5} label="Interrupt safety" title="Keep Work Before the Pause Idempotent">
        <P>
          When an interrupted node resumes, the node may run again from its beginning before it reaches the interrupt. Do not
          place an irreversible side effect before the pause and assume the code after it is the only part that can run again.
          Prepare a proposal, persist it safely, interrupt, and perform the action only after the decision has been validated.
          Make the action idempotent so an at-least-once delivery or retry cannot issue it twice.
        </P>
        <P>
          Keep the proposal immutable while it awaits review. If the order changes, the requester withdraws the request, or
          the approval window expires, invalidate it and ask for review again. Show the reviewer what will happen, not only
          the model&apos;s explanation. Maintain a cancellation path and a human escalation route for ambiguous outcomes.
        </P>
        <Callout type="tip">
          Separate &quot;approved&quot; from &quot;completed.&quot; A human can approve a proposal while the payment service later fails;
          the run should report the real operation result rather than treating approval as proof of execution.
        </Callout>
      </Part>

      <Part n={6} label="Product flow" title="Design the Waiting Experience">
        <P>
          A paused graph may wait seconds or hours. The product should tell the requester what is pending, who can review it,
          and what happens if no one responds. The reviewer needs a secure inbox, enough context to decide, and an audit
          history. When a decision arrives, the backend locates the correct checkpoint, validates the decision, resumes the
          graph, and reports the result to the original requester.
        </P>
        <Table
          head={['Run state', 'User-facing behavior', 'Backend responsibility']}
          rows={[
            ['Waiting for approval', 'Show pending and expected next step', 'Keep proposal and checkpoint linked'],
            ['Approved', 'Show that execution is starting or complete', 'Recheck limits, permissions, and idempotency'],
            ['Rejected', 'Explain no action was taken', 'Persist reviewer, reason if supplied, and timestamp'],
            ['Expired or withdrawn', 'Ask to create a fresh proposal', 'Invalidate old resume token and proposal version'],
            ['Execution failed', 'Show failure and support route', 'Record actual service outcome; do not mark complete'],
          ]}
        />
        <P>
          Escalate when the evidence is incomplete, the requested action exceeds a reviewer&apos;s authority, or the action cannot
          be safely reversed. A simple approve/reject control is not enough if policy requires a specialist, dual control, or
          an additional verification step.
        </P>
      </Part>

      <Part n={7} label="Audit and operations" title="Record the Decision Without Over-Logging">
        <P>
          An audit trail should identify the run and proposal, the reviewer, the action version, the decision, the time, and
          the eventual execution result. It should make clear which service performed the action. Store only the evidence
          needed to support review and operations, protect the record with access controls, and apply a retention policy.
          Avoid logging full chat transcripts or payment credentials as a shortcut.
        </P>
        <Steps items={[
          'Test approval, rejection, edit validation, expiry, cancellation, and duplicate decision submission.',
          'Verify that a changed proposal cannot reuse an old approval.',
          'Simulate a crash after the decision is saved and before the resume response reaches the caller.',
          'Confirm that the action runs once and that its final status matches the external service result.',
        ]} />
        <Callout type="example">
          A customer-support agent may draft a ₹250 refund proposal from order facts. A reviewer sees the amount and evidence,
          then approves or rejects. The payment system remains authoritative for whether the refund actually succeeded.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Trusting an approval value sent directly by a browser', cause: 'A caller could alter the run ID, proposal, reviewer, or choice.', fix: 'Authenticate on the server, load the proposal from trusted storage, verify authority, then resume.' },
          { mistake: 'Performing the action before interrupting', cause: 'The node can be re-entered during resume or retry.', fix: 'Pause before side effects, persist an immutable proposal, and make execution idempotent.' },
          { mistake: 'Treating approval as successful execution', cause: 'The downstream service can reject or time out after approval.', fix: 'Track approval and execution as separate states, and display the actual service result.' },
          { mistake: 'Reusing an approval after the proposal changes', cause: 'The reviewer did not consent to the new target, amount, or scope.', fix: 'Bind approval to the proposal ID and version; invalidate and request review again on change.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Add a Refund Approval Gate">
        <Practice
          title="Pause, review, validate, and resume"
          tasks={[
            'Run the LangGraph example and inspect the interrupt payload before resuming with a rejection.',
            'Add a separate approval decision and verify only the approved branch reaches the mock action node.',
            'Bind the decision to a run ID and proposal version; reject a decision for a different version.',
            'Add an expiry or withdrawal state and prove an old approval cannot resume that proposal.',
            'Simulate a retry after the mock service succeeds and verify the idempotency key prevents a duplicate action.',
          ]}
          hint="Keep the action mocked. In a real application, use authenticated server-side reviewer identity and a durable checkpointer and audit store."
        />
      </Part>

      <KeyTakeaways items={[
        'Pause before consequential actions and show a person the exact proposal, scope, and evidence they are deciding on.',
        'LangGraph interrupt() pauses a node; Command(resume=...) supplies the continuation value to the checkpointed thread.',
        'An interrupt is not an approval system: authenticate reviewers, validate the proposal and authority, and bind decisions to a run and version.',
        'Keep side effects after the pause, re-check current rules, and make writes idempotent.',
        'Track waiting, approval, rejection, expiry, and external execution as distinct states.',
        'Maintain an access-controlled audit trail with the decision and actual outcome, not unnecessary private transcripts.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/agentic-ai/model-context-protocol"
        label="Lesson 06 · Model Context Protocol (MCP) — Connecting Agents to Tools and Data"
        text="Your workflow can now pause for a person. Next, explore a standard way for agents to discover and use external tools and data."
      />
    </LearnLayout>
  )
}
