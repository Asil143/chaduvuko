import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { Callout } from '@/components/content/Callout'

const C = '#4285f4'
const Part = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 44 }}>
    <h2 style={{ color: C, fontSize: 22, fontWeight: 700, marginBottom: 14 }}>{title}</h2>
    {children}
  </section>
)
const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ color: 'var(--heading)', fontSize: 17, fontWeight: 650, margin: '24px 0 8px' }}>{children}</h3>
)
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ color: 'var(--text)', fontSize: 15, lineHeight: 1.9, marginBottom: 14 }}>{children}</p>
)
const Block = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.8, whiteSpace: 'pre-wrap', overflowX: 'auto', marginBottom: 18 }}>{children}</pre>
)
const Hl = ({ children }: { children: React.ReactNode }) => <strong style={{ color: C }}>{children}</strong>
const Table = ({ head, rows }: { head: string[]; rows: string[][] }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20, fontSize: 14 }}>
    <thead><tr>{head.map((cell) => <th key={cell} style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border)', background: 'var(--code-bg)' }}>{cell}</th>)}</tr></thead>
    <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex} style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>{cell}</td>)}</tr>)}</tbody>
  </table>
)

export default function AiLlmSecurityBasics() {
  return (
    <LearnLayout
      title="AI and LLM Security Basics — Prompt Injection, Data Leakage, Model Abuse"
      description="A concise security orientation to prompt injection, sensitive-data exposure, and model abuse, with practical controls and a path to the full AI Security course."
      section="Cybersecurity — Lesson 38"
      readTime="15 min"
    >
      <Part title="A Short Orientation to AI Security">
        <P>
          Large language models (LLMs) turn user input and surrounding context into generated output. They can summarize a support ticket, search internal documents, or call a tool. That flexibility introduces security risks at the boundaries between untrusted content, confidential data, model instructions, and actions. This lesson is an introduction, not a complete AI security curriculum.
        </P>
        <P>
          <Hl>Prerequisites:</Hl> basic familiarity with web applications, APIs, authentication, and the confidentiality-integrity-availability model. <Hl>Objective:</Hl> identify three common LLM risk families and choose controls that keep model output from becoming trusted authority. Work only with systems and data you own or are authorised to assess.
        </P>
        <Block>{`A simple AI feature data flow

User request ──► application ──► model provider
                    │                 │
                    ├── retrieved documents
                    ├── tools / APIs ◄─┘
                    └── logs, traces, and stored conversation state

Security review: what crosses each boundary, who can influence it,
and which component is authorised to take an action?`}</Block>
        <P>
          The model is a probabilistic component, not an access-control engine. A system that gives the model broad data access or powerful tools must apply conventional security controls around those capabilities.
        </P>
      </Part>

      <Part title="Prompt Injection: Instructions Are Not a Security Boundary">
        <P>
          Prompt injection occurs when untrusted text influences a model to depart from the intended task. The text may arrive directly in a user prompt or indirectly inside a web page, email, document, code comment, or retrieved passage. A model sees a combined context; merely labelling one part as system instructions and another as data does not create a hard isolation boundary.
        </P>
        <H>Threats and the control boundary</H>
        <Table head={['Risk', 'Example', 'Control that must exist outside the model']} rows={[
          ['Prompt injection', 'A retrieved page tries to redirect the assistant', 'Keep retrieval scoped; treat retrieved text as untrusted input'],
          ['Data leakage', "A reply includes another learner's record", 'Authorize retrieval for the current identity before model context is built'],
          ['Model abuse', 'A user floods a costly generation endpoint', 'Use identity-aware quotas, limits, monitoring, and an abuse response path'],
        ]} />
        <H>Direct and indirect paths</H>
        <Block>{`Direct: a user asks the assistant to ignore its task and reveal protected data.
Indirect: a retrieved document contains adversarial instructions that the model
          treats as part of the task while summarising the document.

Risk increases when the model can also:
  • retrieve records that the caller is not allowed to see
  • send email, update a ticket, execute a workflow, or call a payment API
  • write persistent memory that will affect later users or sessions`}</Block>
        <P>
          The main concern is not a particular string. It is a trust-boundary failure: untrusted content can influence an action or disclosure. Text pattern filters can be bypassed and may block legitimate requests, so they should not be the primary defense.
        </P>
        <Callout type="warning">
          Never evaluate a prompt-injection test against a production assistant that has access to real customer records, secrets, or external tools. Use a disposable test environment with synthetic data and mocked actions.
        </Callout>
      </Part>

      <Part title="Keep Retrieval and Tool Use Inside the User's Permissions">
        <P>
          Retrieval-augmented generation (RAG) adds documents to the model's context. Apply the same authorisation rules to retrieval that the rest of the application uses. Filter by the authenticated user's permissions before content reaches the model; do not rely on the model to decide which document is appropriate. Treat retrieved text as untrusted input even when it came from an internal system.
        </P>
        <P>
          Tools need their own server-side authorization, validation, and audit trail. The model may suggest a tool call, but the application should decide whether the authenticated user may perform that action, validate its arguments, and require confirmation for consequential operations. Prefer narrowly scoped tools over a general-purpose shell or unrestricted database connection.
        </P>
        <Block>{`Safer tool boundary

1. Authenticate the person making the request.
2. Authorise that person for the exact record and operation.
3. Ask the model for a structured proposal, not an executable command.
4. Validate the proposal against a schema and business rules.
5. Require human confirmation for high-impact or irreversible actions.
6. Execute through a least-privilege service and record the result.

The model can propose. Trusted application code authorises and executes.`}</Block>
        <P>
          A delivery-support assistant might draft a refund recommendation. The order service—not the model—must verify order ownership, refund eligibility, amount limits, and approval requirements before changing payment state.
        </P>
      </Part>

      <Part title="Data Leakage: Minimise Before Sending or Logging">
        <P>
          An LLM feature can expose sensitive information through prompts sent to a provider, model replies, retrieval results, browser-visible output, traces, or support logs. Data minimisation is stronger than asking a model to keep secrets. Send only fields needed for the task, redact identifiers where practical, and confirm provider, retention, access, and contractual settings before processing regulated or confidential information.
        </P>
        <H>Build a simple redaction boundary</H>
        <Block>{`import re

EMAIL = re.compile(r"\b[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}\b")


def redact_email(text: str) -> str:
    """Illustrative minimisation; not a complete DLP solution."""
    return EMAIL.sub("[REDACTED_EMAIL]", text)


support_note = "Contact learner@example.org about the course refund."
model_input = redact_email(support_note)
print(model_input)
# Contact [REDACTED_EMAIL] about the course refund.`}</Block>
        <P>
          This example demonstrates one narrow transformation, not a universal detector. It will not identify every personal identifier, secret, or context-sensitive disclosure. Use a maintained data-loss-prevention approach, test it with representative synthetic cases, and keep authorization checks independent of redaction.
        </P>
        <Callout type="tip">
          Keep secrets out of prompts and model-visible context entirely when the task can be completed without them. Redaction is a fallback control, not permission to collect more data.
        </Callout>
      </Part>

      <Part title="Model Abuse and Unsafe Output">
        <P>
          Abuse includes attempts to use a feature for spam, fraud, harassment, prohibited content, or resource exhaustion. The risk depends on the product: a public text generator, an internal summarizer, and an assistant that can initiate account changes need different controls. Apply identity-aware quotas, request-size limits, timeouts, cost monitoring, and a clear abuse-reporting path.
        </P>
        <P>
          Treat model output as untrusted data. HTML-escape text before rendering; parameterise database queries; validate structured output against a strict schema; and never execute generated code or shell commands automatically. A refusal or safety classifier can help, but it does not replace authorization, output encoding, or a human review for high-impact decisions.
        </P>
        <Block>{`import json
from typing import Any


def parse_refund_proposal(raw: str) -> dict[str, Any]:
    """Parse a model proposal; a real service must also authorise and review it."""
    value = json.loads(raw)
    if not isinstance(value, dict):
        raise ValueError("proposal must be an object")
    if set(value) != {"order_id", "amount_paise", "reason"}:
        raise ValueError("unexpected fields")
    if not isinstance(value["order_id"], str) or not value["order_id"].strip():
        raise ValueError("order_id is required")
    if type(value["amount_paise"]) is not int or value["amount_paise"] < 0:
        raise ValueError("amount must be a non-negative integer")
    if not isinstance(value["reason"], str) or len(value["reason"]) > 300:
        raise ValueError("reason is invalid")
    return value


proposal = parse_refund_proposal(
    '{"order_id":"demo-123","amount_paise":5000,"reason":"Duplicate charge"}'
)
print(proposal["order_id"])`}</Block>
        <P>
          Schema validation confirms shape, not truth or entitlement. The order identifier still needs to be looked up under the caller's identity, the amount checked against the order and policy, and the action approved through the ordinary service workflow.
        </P>
      </Part>

      <Part title="A Lightweight Threat-Model Checklist">
        <P>Before launch or a significant model change, document the feature, data, and consequences—not just the prompt text.</P>
        <Block>{`Feature: What user goal does the model support?
Assets: Which personal, financial, business, or authentication data is involved?
Inputs: Can users, retrieved documents, or third parties influence the context?
Access: Are retrieval and tools scoped to the current identity and tenant?
Outputs: Can generated content trigger code, a database write, or a decision?
Controls: What limits, review steps, audit events, and rollback paths exist?
Testing: Are synthetic cases covering injection, leakage, malformed output, and abuse?
Operations: Who reviews alerts, handles reports, and updates the risk assessment?`}</Block>
        <P>
          Repeat the review when a model gains new tools, a new document source is connected, or generated output begins affecting a higher-impact decision. A prompt change alone may not be the largest change in the system's risk.
        </P>
      </Part>

      <Part title="Common Mistakes">
        <H>Common mistakes</H>
        <Block>{`Mistake: “The system prompt says not to reveal data, so it is safe.”
Why: A model instruction is not an access-control boundary.
Fix: Enforce record-level authorization before retrieval and tool execution.

Mistake: “We block a list of suspicious prompt phrases.”
Why: Meaning can be expressed in many forms; static phrase lists are brittle.
Fix: Reduce capabilities, isolate untrusted context, validate outputs, and test.

Mistake: “The provider never trains on our inputs, so there is no data risk.”
Why: Training is only one part of retention, access, logging, and contract review.
Fix: Review the actual service terms and configuration with the data owner.

Mistake: “The model returned valid JSON, so the action is approved.”
Why: Syntactic validity does not prove identity, eligibility, or correctness.
Fix: Apply business rules and authorization in trusted application code.`}</Block>
      </Part>

      <Part title="Practice: Review a Safe AI Feature">
        <P>
          1. Draw a data-flow diagram for a course-support chatbot and mark user, retrieval, model, tools, and logs as trust boundaries. 2. Add a synthetic retrieved document containing irrelevant instructions to a local test fixture; confirm your application still limits retrieval to the test user's records. 3. List three sensitive fields that are unnecessary for a course recommendation and remove them from a mock model request. 4. Design a schema-validation and human-confirmation step for a model-proposed account change. 5. Write an abuse-monitoring signal that records request counts and cost without storing full sensitive prompts. 6. Record one limitation of each control and an owner responsible for reviewing it.
        </P>
      </Part>

      <KeyTakeaways items={[
        'Prompt injection is a trust-boundary problem; prompt wording alone cannot enforce permissions.',
        'Authorise retrieval and tools in trusted application code using the current user and tenant context.',
        'Minimise sensitive data sent to models and review provider retention, access, and logging settings.',
        'Treat generated text and structured output as untrusted; validate, encode, and apply business rules.',
        'Use least privilege, rate limits, auditability, and human confirmation for consequential actions.',
        'Test with synthetic data in an isolated environment and reassess risks when capabilities change.',
      ]} />

      <Callout type="info">
        <strong>Next in Cybersecurity — Lesson 39: Mobile Application Security</strong><br />
        Continue with mobile threat modelling, OWASP MASVS, and practical Android and iOS review patterns.{' '}
        <Link href="/learn/cybersecurity/mobile-application-security" style={{ color: C, fontWeight: 700 }}>Continue to Lesson 39 →</Link>
      </Callout>
      <Callout type="tip">
        <strong>Want the complete AI Security learning path?</strong><br />
        This lesson is only an introduction. Continue to the full course for deeper coverage of AI threat modelling, secure design, evaluation, privacy, and operations.{' '}
        <Link href="/learn/ai-security" style={{ color: C, fontWeight: 700 }}>Explore the full AI Security course →</Link>
      </Callout>
    </LearnLayout>
  )
}
