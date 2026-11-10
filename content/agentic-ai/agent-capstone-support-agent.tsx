import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function AgentCapstoneSupportAgent() {
  return (
    <LearnLayout
      title="Capstone — A Tool-Using Support Agent"
      description="Plan and build a support agent that searches a knowledge base, calls tools, asks for approval on refunds, and is traced and evaluated."
      section="Agentic AI & Automation — Lesson 13"
      readTime="50 min"
    >
      <Part n={1} label="The project brief" title="A Safer Support Agent for an Indian E-Commerce Store">
        <P>
          Build a support assistant for a fictional Indian online shop. A signed-in customer may ask about an order, delivery,
          return or refund. The assistant can look up an order, retrieve relevant policy excerpts and request a refund review.
          It must not issue a refund itself, infer a customer's identity from chat text or promise an outcome that policy and
          verified order data do not support.
        </P>
        <P>
          Use synthetic orders and policy documents. Store monetary amounts as integer paise or as a decimal type in a real
          database; do not use binary floating-point for money. Keep payment credentials out of the agent entirely. The goal
          is not to build a fully autonomous finance workflow—it is to demonstrate a useful agent with explicit boundaries.
        </P>
        <Callout type="example">
          Example: a customer asks about an order paid through UPI and delayed in transit. The agent can verify status, cite the
          return/refund policy and prepare a review request. A trained support employee decides whether to approve the refund.
        </Callout>
      </Part>

      <Part n={2} label="Architecture" title="Separate the Model from Trusted Services">
        <Table
          head={['Component', 'Responsibility', 'Trust boundary']}
          rows={[
            ['Web or chat interface', 'Authenticate the customer and display answers or pending review status', 'Never expose provider credentials or accept model identity as proof'],
            ['Agent orchestrator', 'Interpret intent, select allowed reads and draft a response', 'Treat user and retrieved text as untrusted'],
            ['Order lookup tool', 'Return scoped, minimal order facts', 'Backend binds the verified customer identity'],
            ['Policy retrieval', 'Find current policy excerpts with source IDs', 'Content is evidence, not executable instruction'],
            ['Refund approval service', 'Create and track a pending review request', 'No refund side effect until authorised approval'],
            ['Evaluation and tracing', 'Measure quality and inspect failures', 'Synthetic eval data; redact and restrict production traces'],
          ]}
        />
        <P>
          Keep the first version as a single bounded agent or deterministic workflow. A specialist team is not required for this
          capstone. The core work is defining clean interfaces, tool permissions, approval state, tests and a deployable service.
        </P>
        <Callout type="warning">
          A demo approval button is not enough by itself. In production, the backend must authenticate the reviewer, check their
          permission, bind the decision to one pending request and prevent duplicate execution.
        </Callout>
      </Part>

      <Part n={3} label="Order lookup" title="Build a Read-Only, Customer-Scoped Tool">
        <P>
          The example below uses an in-memory fixture and a trusted customer ID argument supplied by the authenticated server
          context. In production, inject identity through a verified session or service context; never let the model choose
          the customer ID. Return only useful order details, and keep payment instruments out of the result.
        </P>
        <Code file="orders.py" code={`
from dataclasses import dataclass

@dataclass(frozen=True)
class Order:
    order_id: str
    customer_id: str
    status: str
    verified_eta: str | None
    total_paise: int

ORDERS = {
    "ORD-1001": Order("ORD-1001", "cust-demo-7", "in_transit", "2026-11-12", 159900),
}

def lookup_order(order_id: str, authenticated_customer_id: str) -> dict:
    key = order_id.strip().upper()
    if not key.startswith("ORD-") or len(key) > 24:
        return {"found": False}
    order = ORDERS.get(key)
    if order is None or order.customer_id != authenticated_customer_id:
        return {"found": False}
    return {
        "found": True,
        "order_id": order.order_id,
        "status": order.status,
        "verified_eta": order.verified_eta,
        "total_paise": order.total_paise,
    }

if __name__ == "__main__":
    print(lookup_order("ORD-1001", "cust-demo-7"))
`} />
        <P>
          The combined not-found response avoids revealing that a different customer's order exists. Add repository-level
          access checks as well as API checks, and use synthetic fixtures in the development notebook or command line.
        </P>
      </Part>

      <Part n={4} label="Policy retrieval" title="Ground Answers in Versioned Store Policies">
        <P>
          Retrieval should return a small relevant excerpt and a stable source identifier. The following teaching example uses
          a tiny local list and simple term overlap so it can run without an embedding service. A real RAG system should add
          document ingestion, chunking, retrieval evaluation, access filters and current policy versioning.
        </P>
        <Code file="policy_search.py" code={`
POLICIES = [
    {
        "source_id": "returns-v3-section-2",
        "text": "Eligible items may be returned when they meet the stated condition and return window. Check order status before offering next steps.",
    },
    {
        "source_id": "refunds-v3-section-4",
        "text": "A refund request is reviewed by support. Do not promise approval. Refund timing depends on the payment provider after approval.",
    },
]

def search_policy(question: str, limit: int = 2) -> list[dict]:
    terms = {word.lower().strip(".,?!") for word in question.split() if len(word) > 3}
    scored = []
    for item in POLICIES:
        text_terms = set(item["text"].lower().split())
        score = len(terms & text_terms)
        if score:
            scored.append((score, item))
    scored.sort(key=lambda pair: pair[0], reverse=True)
    return [
        {"source_id": item["source_id"], "excerpt": item["text"]}
        for _, item in scored[:limit]
    ]

if __name__ == "__main__":
    print(search_policy("How does a refund get approved?"))
`} />
        <P>
          In the prompt, label excerpts as untrusted evidence. Ask the agent to cite source IDs in its internal result or user
          response, and verify those IDs against the retrieved set before displaying them. If retrieval returns no relevant
          policy, ask a clarifying question or escalate instead of inventing a rule.
        </P>
      </Part>

      <Part n={5} label="Human approval" title="Make a Refund Request Pending Until a Person Decides">
        <P>
          The agent can prepare a review request, but it does not decide the refund. This small state machine illustrates the
          boundary: only a pending request can be approved, and an approval does not imply the external payment operation has
          been completed. A production service must add persistence, reviewer authentication, expiry, idempotency and audit
          history.
        </P>
        <Code file="refund_approval.py" code={`
from dataclasses import dataclass
from typing import Literal
from uuid import uuid4

Status = Literal["pending", "approved", "rejected"]

@dataclass
class RefundRequest:
    request_id: str
    order_id: str
    amount_paise: int
    reason: str
    status: Status = "pending"

REQUESTS: dict[str, RefundRequest] = {}

def request_refund_approval(order_id: str, amount_paise: int, reason: str) -> dict:
    if amount_paise <= 0 or not reason.strip():
        return {"created": False, "error": "invalid_request"}
    request = RefundRequest(str(uuid4()), order_id, amount_paise, reason.strip())
    REQUESTS[request.request_id] = request
    return {"created": True, "request_id": request.request_id, "status": request.status}

def record_human_decision(request_id: str, decision: str, reviewer_id: str) -> dict:
    request = REQUESTS.get(request_id)
    if request is None or request.status != "pending":
        return {"updated": False, "status": "not_pending"}
    if decision not in {"approve", "reject"} or not reviewer_id:
        return {"updated": False, "status": "invalid_decision"}
    request.status = "approved" if decision == "approve" else "rejected"
    return {"updated": True, "status": request.status, "reviewer_id": reviewer_id}

if __name__ == "__main__":
    pending = request_refund_approval("ORD-1001", 159900, "Delayed delivery review")
    print(pending)
`} />
        <Callout type="info">
          This in-memory sample is for learning only; it loses state when the process exits and is not a payment integration.
          Keep the eventual refund executor in a separate service that checks a valid, authorised approval record.
        </Callout>
      </Part>

      <Part n={6} label="Evaluate" title="Test the Workflow, Not Just the Wording">
        <P>
          Create a synthetic suite before connecting a model to real customer traffic. Test normal order lookup, unknown and
          out-of-scope orders, policy retrieval, refund requests, missing approval, injection in a retrieved document and
          service timeouts. Score task success, tool-call accuracy, required citations and prohibited actions separately.
        </P>
        <Code file="capstone_eval.py" code={`
EVALS = [
    {"id": "known-order", "expected_tool": "lookup_order", "forbidden": ["issue_refund"]},
    {"id": "refund-review", "expected_tool": "request_refund_approval", "forbidden": ["issue_refund"]},
    {"id": "other-customer", "expected_tool": "lookup_order", "expected_found": False},
]

def evaluate(case: dict, run: dict) -> dict:
    tool_names = [call["name"] for call in run.get("tool_calls", [])]
    forbidden_used = any(name in case.get("forbidden", []) for name in tool_names)
    expected = case["expected_tool"] in tool_names
    found_ok = (
        "expected_found" not in case
        or run.get("tool_result", {}).get("found") is case["expected_found"]
    )
    return {
        "case_id": case["id"],
        "tool_call_accuracy": expected,
        "task_success": run.get("task_success", False) and found_ok,
        "policy_pass": not forbidden_used,
    }
`} />
        <P>
          Save a trace for each run with a root request ID and spans for model, retrieval, lookup, approval and response.
          Record outcome categories, durations and source IDs; redact customer content and credentials. Review failed traces
          under access control and turn each confirmed defect into a regression case.
        </P>
      </Part>

      <Part n={7} label="Deployment" title="A Production Checklist Before Real Customers">
        <Table
          head={['Area', 'Checklist']}
          rows={[
            ['Identity and privacy', 'Authenticate users; scope every order lookup; minimise personal data; define retention and deletion'],
            ['Tools and approvals', 'Read/write separation; eligibility checks; reviewer authorisation; expiry and idempotency'],
            ['Model and retrieval', 'Model from environment config; prompt and policy versions; source citations; injection tests'],
            ['Reliability', 'Timeouts, bounded retries, rate limits, concurrency controls and graceful escalation'],
            ['Security operations', 'Short-lived least-privilege credentials; secret manager; sandbox boundaries; restricted egress'],
            ['Observability', 'Trace IDs, safe structured logs, latency/error/cost dashboards and incident response'],
            ['Quality', 'Offline scenario suite; release gates; staged rollout; human review and rollback plan'],
            ['India payment context', 'Use a payment provider\'s approved refund flow; never collect or expose UPI PINs, OTPs or card secrets'],
          ]}
          caption="Confirm each control in the actual deployment environment; a checklist alone is not evidence that it works."
        />
        <Steps items={[
          'Deploy to a staging environment with synthetic accounts, orders and policy data.',
          'Run the evaluation suite and security abuse cases against the deployed endpoints.',
          'Verify that secrets are server-side, logs are redacted and approval actions require an authorised reviewer.',
          'Test degraded modes: model unavailable, retrieval empty, order service timeout and approval service unavailable.',
          'Roll out gradually with a rollback switch, monitoring owner and documented incident escalation.',
        ]} />
      </Part>

      <Part n={8} label="Common mistakes" title="Capstone Mistakes to Avoid">
        <Mistakes items={[
          { mistake: 'Letting the model decide which customer an order belongs to', cause: 'A model-generated identifier is not authenticated identity or proof of ownership.', fix: 'Bind the signed-in customer in trusted server context and scope the database query.' },
          { mistake: 'Returning an order address or payment detail for convenience', cause: 'Extra fields increase privacy and prompt-injection impact without helping the task.', fix: 'Use a minimal response schema and add a field only when a clear need is documented.' },
          { mistake: 'Treating an agent response as a refund instruction', cause: 'A generated answer can be manipulated, duplicated or based on stale context.', fix: 'Create a pending request and require an authenticated, auditable human decision.' },
          { mistake: 'Calling a keyword demo production RAG', cause: 'A tiny fixture does not establish retrieval quality, freshness, access control or coverage.', fix: 'Version documents, build an eval set, measure retrieval and answer grounding, and test deployment permissions.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Extend the Capstone in Safe Increments">
        <Practice
          title="Build a testable, reviewable support assistant"
          tasks={[
            'Implement the order service and verify that one customer cannot retrieve another customer\'s order.',
            'Replace the sample policy list with a versioned document collection and return source IDs with retrieved excerpts.',
            'Connect a model using a configured model name and a bounded tool allowlist; keep credentials out of the browser and traces.',
            'Persist refund requests with pending, approved and rejected states; require reviewer identity and prevent duplicate execution.',
            'Add at least eight synthetic eval cases, including indirect injection and service failures, and report tool accuracy, task success and policy passes.',
            'Complete the deployment checklist in staging, including a rollback test and a documented human escalation route.',
          ]}
          hint="Ship read-only order lookup and policy answers first. Add the approval-request workflow only after its access checks, idempotency and audit trail are independently tested."
        />
      </Part>

      <KeyTakeaways items={[
        'A practical support agent combines scoped order lookup, policy retrieval, evaluation, tracing and human review.',
        'Authenticated identity and order ownership belong in trusted application services, not model-generated arguments.',
        'RAG provides evidence, not authority: preserve provenance, test retrieval and treat document text as untrusted.',
        'Refunds stay pending until an authorised human decision is recorded and verified by a separate executor.',
        'Evaluate trajectories, tool accuracy, outcomes and prohibited actions with synthetic scenarios before release.',
        'Production readiness includes privacy, credentials, sandboxing, rate limits, monitoring, rollout and rollback—not just a working demo.',
      ]} />

      <Bullets items={[
        <span key="refs">Reference the official docs for your selected model provider, retrieval store, MCP/agent framework and deployment platform; keep the payment workflow aligned with the provider's approved integration and current policies.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/agentic-ai/agentic-ai-interview-prep"
        label="Lesson 14 · Agentic AI Interview Prep"
        text="Agent architecture, tool design, memory, evaluation and security questions from agentic AI interviews, with model answers and design exercises."
      />
    </LearnLayout>
  )
}
