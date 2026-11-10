import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function AiPrivacyOutputHandling() {
  return (
    <LearnLayout
      title="Sensitive Data, Privacy and Output Handling"
      description="Keep PII and secrets out of prompts, logs and training data, treat model output as untrusted input, and meet privacy obligations such as the DPDP Act."
      section="AI Security & LLM Security — Lesson 06"
      readTime="35 min"
    >
      <Part n={1} label="Privacy boundaries" title="An AI Feature Creates More Copies of Data">
        <P>
          A request to an AI feature may pass through a browser, your application server, a retrieval service, an observability
          pipeline and a model provider. A customer support assistant for a UPI payments app might handle a name, an order
          reference and a conversation that unexpectedly includes a phone number or account detail. Each copy and each recipient
          is a place where data can be exposed, retained longer than intended or made available to someone who should not see it.
        </P>
        <P>
          Start by tracing the data, not by choosing a masking library. Identify which fields are necessary for the task, where
          they enter, where they leave your control, who can access them, how long they persist and what happens when the user
          asks for a deletion or correction. Separate personal data from credentials and other secrets: both need protection,
          but an API key should never be sent to a model as if it were ordinary user content.
        </P>
        <Table
          head={['Data path', 'Question to ask', 'Safer default']}
          rows={[
            ['User input', 'Could the field contain unexpected personal or payment data?', 'Collect only what the task needs; show a clear input boundary'],
            ['Prompt and retrieval', 'Does context include another person or tenant?', 'Filter by authorization before retrieval and minimize context'],
            ['Provider request', 'What is sent to an external service and under what terms?', 'Review provider configuration and approved data classes'],
            ['Logs and traces', 'Can operators read raw prompts or outputs?', 'Record metadata; redact or avoid sensitive content'],
            ['Output and tools', 'Can generated text trigger a consequential action?', 'Treat it as untrusted; validate and authorize downstream use'],
          ]}
        />
        <Callout type="info">
          A privacy review is a data-flow exercise. A promise that a prompt is &quot;private&quot; does not replace checking the
          actual product configuration, provider terms, retention controls, subprocessors and access permissions.
        </Callout>
      </Part>

      <Part n={2} label="Minimize first" title="Send the Smallest Useful Context">
        <P>
          Data minimization is often stronger than trying to redact everything after it has already been copied. If a delivery
          assistant only needs to explain a delayed order, provide an internal order status and a coarse time window—not the
          customer’s full profile, address, payment credentials or unrelated chat history. Where identity is required, use a
          short-lived internal reference and resolve it inside a trusted service rather than placing identifying data in a prompt.
        </P>
        <Steps items={[
          'Map fields from the user, database, retrieved documents, tools and model response.',
          'For each field, state the purpose and the minimum precision needed; remove fields with no clear purpose.',
          'Decide whether the model actually needs the original value or whether a category, range or opaque reference works.',
          'Set access, retention and deletion expectations for every system that receives the data.',
        ]} />
        <Callout type="tip">
          Tokenization is not automatically anonymization. A stable identifier can still be linkable to a person if another system
          can map it back. Protect the mapping and limit where the token can be used.
        </Callout>
      </Part>

      <Part n={3} label="Privacy-aware code" title="Minimize and Redact Before the Provider Boundary">
        <P>
          The small Python example below demonstrates a conservative allow-list for fields and a narrow redaction step. It is
          deliberately not presented as a complete PII detector: patterns miss names, context-dependent identifiers and new
          formats. For sensitive workflows, prefer structured inputs, dedicated detection services where appropriate, human
          review for uncertain matches and an explicit failure path.
        </P>
        <Code file="privacy_boundary.py" code={`
import re
from typing import Any

# This demo recognizes only a few illustrative formats; it is not a full PII detector.
PHONE = re.compile(r"(?<!\\d)(?:\\+91[ -]?)?[6-9]\\d{9}(?!\\d)")
EMAIL = re.compile(r"(?i)\\b[\\w.+-]+@[\\w.-]+\\.[a-z]{2,}\\b")


def minimize_order_context(order: dict[str, Any]) -> dict[str, str]:
    allowed = {"status", "estimated_window"}
    return {
        key: str(value)
        for key, value in order.items()
        if key in allowed and value is not None
    }


def redact_obvious_contact_details(text: str) -> str:
    text = EMAIL.sub("[EMAIL]", text)
    return PHONE.sub("[PHONE]", text)


customer_text = "My order is late; call me at +91 9876543210"
order = {"status": "in transit", "estimated_window": "this evening", "address": "ignored"}
model_input = {
    "question": redact_obvious_contact_details(customer_text),
    "order": minimize_order_context(order),
}
print(model_input)
`} />
        <P>
          Notice two separate controls: the allow-list avoids sending an unnecessary address, while redaction reduces exposure in
          free-form text. Neither control grants authorization. The server must still verify that the signed-in customer is
          entitled to access that order before it constructs the context.
        </P>
      </Part>

      <Part n={4} label="Logging and retention" title="Observe the System Without Keeping Every Prompt">
        <P>
          Teams need enough telemetry to find failures and investigate misuse, but a full prompt-and-response archive is not the
          only way to do that. Keep operational metadata such as a request identifier, model configuration reference, latency,
          token counts, policy decision and outcome. If sampled content is necessary for quality review, document its purpose,
          restrict access, redact carefully, define retention and make the collection transparent to the people responsible for it.
        </P>
        <Code file="safe_event.py" code={`
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
import json

@dataclass
class ModelEvent:
    request_id: str
    created_at: str
    model_config: str
    input_tokens: int
    output_tokens: int
    policy_result: str
    outcome: str


def log_event(event: ModelEvent) -> None:
    # Deliberately omit raw prompt, completion, user ID, and provider credentials.
    print(json.dumps(asdict(event), separators=(",", ":")))


event = ModelEvent(
    request_id="req-example-001",
    created_at=datetime.now(timezone.utc).isoformat(),
    model_config="support-assistant-prod",
    input_tokens=180,
    output_tokens=42,
    policy_result="allowed",
    outcome="answered",
)
log_event(event)
`} />
        <P>
          Use a random request ID for correlation and keep any identity mapping in a separately protected system. Check error
          handlers, traces, analytics events, support dashboards and crash reports too: data often leaks through diagnostics
          that were not designed as a content store. A retention period should be justified and enforced, not merely written down.
        </P>
      </Part>

      <Part n={5} label="Output is untrusted" title="Validate Before Rendering, Saving or Acting">
        <P>
          A model can return malformed JSON, unsafe HTML, a false claim or text that looks like an instruction. Its output has no
          special trust merely because it came from an approved model. Encode text for the rendering context, parse structured
          values with a strict schema, enforce bounds and check authorization in ordinary application code. Never treat a model
          statement such as &quot;the user is an administrator&quot; as proof of identity or permission.
        </P>
        <Code file="validate_output.py" code={`
import json
from pydantic import BaseModel, ConfigDict, Field, ValidationError

class SupportReply(BaseModel):
    model_config = ConfigDict(extra="forbid")
    message: str = Field(min_length=1, max_length=1200)
    order_reference: str | None = Field(default=None, max_length=40)


def parse_reply(raw: str) -> SupportReply:
    # Parsing validates shape and bounds; it does not make claims true.
    return SupportReply.model_validate_json(raw)


def reply_for_customer(raw: str, customer_id: str) -> str:
    try:
        reply = parse_reply(raw)
    except ValidationError as error:
        raise ValueError("The assistant returned an invalid response") from error

    if reply.order_reference is not None:
        # A real application must fetch the order and authorize ownership here.
        if not customer_id:
            raise PermissionError("Authentication required")
    return reply.message


candidate = '{"message":"Your order is being checked.","order_reference":null}'
print(reply_for_customer(candidate, customer_id="customer-123"))
`} />
        <P>
          If output is inserted into HTML, use the framework’s escaped text rendering instead of concatenating markup. If it is
          used in SQL, use parameterized queries. If it could initiate a refund or change an account, require a trusted service
          to authorize the action and apply transaction limits independently of the model.
        </P>
        <Callout type="warning">
          Schema-valid does not mean safe, private or correct. Validate semantics, permissions and business rules after parsing;
          retain a safe fallback when validation fails.
        </Callout>
      </Part>

      <Part n={6} label="Privacy obligations" title="Make Compliance a Designed Workflow">
        <P>
          In India, the Digital Personal Data Protection Act, 2023 is a relevant part of the privacy landscape for digital
          personal data. Whether and how particular duties apply depends on the facts, applicable rules and current official
          guidance. Do not treat this lesson as legal advice or assume that a model provider’s setting alone settles your
          organization’s responsibilities. Ask the appropriate privacy or legal owner to review purpose, notice, access,
          retention, transfers, vendor roles and processes for requests or incidents.
        </P>
        <P>
          Translate the review into engineering controls: documented data inventory, purpose-linked fields, least-privilege
          access, approved vendors, deletion paths, data-subject request handling and incident escalation. For user-facing AI,
          make it clear what the feature does and avoid promising that generated content is a verified decision. Keep evidence of
          the design and review so changes in prompts, providers or logging can be reassessed.
        </P>
        <Bullets items={[
          <>Assign an owner for each data flow and provider integration.</>,
          <>Record what is sent, why it is needed, and which environment or vendor receives it.</>,
          <>Test deletion and access-control paths across caches, logs, indexes and backups according to approved policy.</>,
          <>Escalate a suspected exposure promptly through the organization’s incident process; do not silently erase evidence.</>,
        ]} />
      </Part>

      <Part n={7} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Assuming a regex removes all personal data', cause: 'Identifiers vary by format and context, and users can disclose unexpected details.', fix: 'Minimize structured fields first; use layered detection and test misses with representative synthetic cases.' },
          { mistake: 'Logging complete prompts for convenience', cause: 'Logs and traces often have broader access and longer retention than the primary database.', fix: 'Log operational metadata by default; limit, protect and expire content samples when a justified need exists.' },
          { mistake: 'Calling a pseudonymous ID anonymous', cause: 'A separate mapping or repeated usage may make a person identifiable again.', fix: 'Treat linkable tokens as sensitive, separate the mapping and limit purpose and access.' },
          { mistake: 'Trusting schema-valid model output', cause: 'A schema checks shape, not truth, authorization or safe downstream behavior.', fix: 'Validate business rules and ownership in trusted code; encode for the output context.' },
        ]} />
      </Part>

      <Part n={8} label="Practice and review" title="Trace One Sensitive Data Flow">
        <Practice
          title="Audit a fictional order-status assistant"
          tasks={[
            'Draw the path from browser input through retrieval, provider, logs and response rendering; mark trust boundaries.',
            'Choose the minimum order fields needed to answer a delivery-status question and justify each one.',
            'Create synthetic examples with phone numbers, emails and an unexpected credential; note what your detector misses.',
            'Design a metadata-only event record and a retention/access policy for any approved review sample.',
            'Define output schema checks plus the server-side ownership check before showing an order-specific response.',
          ]}
          hint="Use fake values only. A successful test must also show that another customer’s record is never retrieved or logged."
        />
        <KeyTakeaways items={[
          'Map personal data, secrets, recipients, access and retention before adding a model call.',
          'Minimize the context at its source; redaction is a secondary control, not a substitute.',
          'Keep prompts and completions out of routine logs; correlate with protected request identifiers.',
          'Treat generated text and structured output as untrusted until parsed and checked against application rules.',
          'Pseudonymized values can remain personal when they are linkable to a person.',
          'Review privacy obligations with current official guidance and qualified owners; build controls into the product.',
        ]} />
        <H3>Next</H3>
        <NextLesson href="/learn/ai-security/model-supply-chain-poisoning" label="Lesson 07 · Model Supply Chain and Data Poisoning" text="Next, examine how third-party models, datasets and packages enter an AI system—and how to verify provenance and limit poisoning risk." />
      </Part>
    </LearnLayout>
  )
}
