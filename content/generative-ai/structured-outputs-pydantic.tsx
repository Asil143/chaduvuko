import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function StructuredOutputsPydantic() {
  return (
    <LearnLayout
      title="Structured Outputs with JSON Schema and Pydantic"
      description="Make models return validated JSON using JSON Schema, provider structured-output modes, and Pydantic models, and recover when validation fails."
      section="Generative AI & LLM Engineering — Lesson 03"
      readTime="30 min"
    >
      <Part n={1} label="Why structure" title="Text That Looks Like JSON Is Not Yet Data">
        <P>
          A model reply is untrusted text until your application parses and validates it. A response that looks like JSON can
          still omit a field, return a string where an integer is needed, invent an enum value, or contain commentary around
          the object. If a downstream service uses this result to create a support ticket, update a catalogue, or show a UPI
          payment status, malformed data can become a real product bug.
        </P>
        <P>
          Structured output narrows the format the model is asked to produce. A provider may expose JSON mode or a stricter
          schema-constrained response mode. JSON Schema describes the allowed shape; Pydantic validates values in Python and
          turns the result into a typed object. Use both the provider feature and local validation where possible: neither
          removes the need to handle refusal, truncation, transport errors, or domain-specific rules.
        </P>
        <Table
          head={['Layer', 'Responsibility', 'Example check']}
          rows={[
            ['Provider format mode', 'Encourage or constrain response syntax', 'Response conforms to supported schema mode'],
            ['JSON parser', 'Convert serialized text into a Python value', 'Valid JSON syntax, no trailing prose'],
            ['Pydantic model', 'Validate types, required fields and constraints', 'Confidence is between 0 and 1'],
            ['Business logic', 'Check the result is appropriate for this workflow', 'Payment state is confirmed from trusted backend data'],
          ]}
        />
        <Callout type="warning">
          Valid JSON is not the same as true information. A schema can prove that <code>status</code> is a string; it cannot
          prove that a payment really settled. Verify facts and authorization against trusted systems.
        </Callout>
      </Part>

      <Part n={2} label="Define contract" title="Design a Small Pydantic Model">
        <P>
          Start from what the application needs, not every detail the model might mention. Use explicit field types, required
          values, bounds, and a controlled vocabulary where practical. The example classifies an inbound delivery-support
          message for triage. The order and payment data remain in the application database; the model only suggests a category
          and a short explanation.
        </P>
        <Code lang="bash" code={`
python -m pip install pydantic
`} />
        <Code file="triage_schema.py" code={`
from typing import Literal
from pydantic import BaseModel, ConfigDict, Field

class TriageResult(BaseModel):
    model_config = ConfigDict(extra="forbid")

    category: Literal["delivery", "payment", "refund", "other"]
    summary: str = Field(min_length=1, max_length=240)
    needs_human: bool
    confidence: float = Field(ge=0, le=1)

print(TriageResult.model_json_schema())
`} />
        <P>
          <code>extra=&quot;forbid&quot;</code> rejects surprise fields instead of quietly accepting an expanding contract. Bounds
          prevent excessively long summaries and out-of-range confidence values. Keep a schema version with your application
          when persisted records may outlive a deployment; changing a field can affect old data and clients.
        </P>
        <Callout type="tip">
          Make fields required unless there is a clear reason they may be absent. Avoid ambiguous optional strings that use an
          empty value to mean several different things.
        </Callout>
      </Part>

      <Part n={3} label="Generate" title="Ask the Provider for a Schema-Constrained Result">
        <P>
          Provider APIs differ: they may take a JSON Schema, a Pydantic class through an SDK helper, or a response-format
          option. Read the documentation for your selected provider and SDK version. The following is intentionally provider-
          neutral pseudocode around the stable contract: supply a schema, retrieve a JSON text value, and validate locally.
        </P>
        <Code file="parse_result.py" code={`
import json
from pydantic import ValidationError
from triage_schema import TriageResult


def parse_result(raw_text: str) -> TriageResult:
    """Parse the provider's JSON text and enforce our local contract."""
    value = json.loads(raw_text)
    return TriageResult.model_validate(value)

raw = '{"category":"payment","summary":"Customer reports pending status.","needs_human":true,"confidence":0.82}'
try:
    result = parse_result(raw)
except (json.JSONDecodeError, ValidationError) as error:
    print("The response needs recovery:", error)
else:
    print(result.category, result.needs_human)
`} />
        <P>
          Do not paste provider-specific arguments into this adapter until you have checked the official SDK documentation;
          names and capabilities vary. If the provider returns a parsed object, validate that object locally as well. If it
          returns a refusal or a truncated response, handle that provider signal explicitly rather than treating it as a
          schema error and blindly retrying.
        </P>
      </Part>

      <Part n={4} label="Validate" title="Separate Shape Checks from Domain Rules">
        <P>
          Pydantic validates local shape and types. Domain rules add meaning: for example, a payment support classification
          might require human review if confidence is low. These checks should be deterministic and should not rely on the
          model to confirm its own authority. Persist provenance such as the model configuration, schema version, and whether
          the result passed review when the workflow requires an audit trail.
        </P>
        <Code file="triage_policy.py" code={`
from triage_schema import TriageResult


def apply_policy(result: TriageResult) -> dict:
    needs_review = result.needs_human or result.confidence < 0.65
    return {
        "suggested_category": result.category,
        "summary": result.summary,
        "review_required": needs_review,
        "confidence": result.confidence,
    }

# A payment status is fetched from the trusted payment service separately.
`} />
        <Steps items={[
          'Define a narrow schema from the product contract and document its version.',
          'Request a supported provider structured-output mode, supplying the schema in the documented format.',
          'Check refusal, incomplete-output and transport status before parsing.',
          'Parse and validate locally, then apply deterministic business rules and human review policy.',
          'Record validation outcome and schema version without logging sensitive prompt content by default.',
        ]} />
        <Callout type="example">
          In a Swiggy-style delivery support workflow, the model can propose &quot;delivery&quot; as a category. The order service,
          not model-generated JSON, determines the actual delivery status and whether a refund is allowed.
        </Callout>
      </Part>

      <Part n={5} label="Recover" title="Use a Bounded Repair or Retry Path">
        <P>
          A malformed response can be repaired, but recovery must be explicit and bounded. First distinguish a transient
          provider error from invalid output. For invalid output, you may make one targeted correction request that includes
          the validation issues and the original task, while limiting the returned data. Avoid sending secrets or unrelated
          customer records into a repair prompt. If validation still fails, route to a safe fallback or human review.
        </P>
        <Code file="bounded_recovery.py" code={`
from pydantic import ValidationError
from triage_schema import TriageResult

MAX_REPAIR_ATTEMPTS = 1


def validate_with_repair(initial_text: str, request_repair) -> TriageResult | None:
    text = initial_text
    for attempt in range(MAX_REPAIR_ATTEMPTS + 1):
        try:
            return TriageResult.model_validate_json(text)
        except ValidationError as error:
            if attempt == MAX_REPAIR_ATTEMPTS:
                return None  # caller routes to review or a safe fallback
            # Keep the repair request constrained; don't expose unrelated data.
            text = request_repair(
                invalid_output=text,
                issues=error.errors(include_input=False),
                schema=TriageResult.model_json_schema(),
            )
    return None
`} />
        <P>
          <code>request_repair</code> is an application adapter, not a specific provider API. It should use the configured model,
          a short timeout, and the provider&apos;s documented structured-output feature where available. Do not let a repair loop
          recurse indefinitely or treat a corrected shape as proof that the content is factually correct.
        </P>
      </Part>

      <Part n={6} label="Test" title="Test the Contract Like Any Other Interface">
        <P>
          Keep fixtures for valid, missing-field, wrong-type, extra-field, invalid-enum, malformed JSON, refusal, and truncated
          cases. Test the schema itself when it changes, and test business rules independently of the model. During evaluation,
          compare model output with expected labels and have a human inspect failures; schema conformance alone is not a quality
          score.
        </P>
        <Code file="test_triage_schema.py" code={`
import pytest
from pydantic import ValidationError
from triage_schema import TriageResult


def test_valid_result():
    result = TriageResult(
        category="delivery", summary="Courier has not arrived.",
        needs_human=False, confidence=0.9,
    )
    assert result.category == "delivery"


def test_rejects_unknown_category():
    with pytest.raises(ValidationError):
        TriageResult(
            category="urgent", summary="Review this",  # type: ignore[arg-type]
            needs_human=True, confidence=0.7,
        )


def test_rejects_extra_fields():
    with pytest.raises(ValidationError):
        TriageResult.model_validate({
            "category": "other", "summary": "Question", "needs_human": False,
            "confidence": 0.5, "account_number": "not-allowed",
        })
`} />
        <Callout type="info">
          Treat schemas as API contracts. Review compatibility before removing a field, renaming a key, or changing the meaning
          of an existing value.
        </Callout>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Structured-Output Mistakes">
        <Mistakes items={[
          { mistake: 'Assume JSON mode guarantees the right schema', cause: 'A syntactically valid object can still omit required fields or use invalid values.', fix: 'Use a supported schema mode and validate the returned value locally.' },
          { mistake: 'Use model output as authoritative business state', cause: 'A valid schema checks shape, not truth, identity, permission or payment status.', fix: 'Fetch facts and authorize actions using trusted application services.' },
          { mistake: 'Repair forever until something parses', cause: 'An unbounded loop can increase spend, delay responses and conceal a persistent failure.', fix: 'Set a small attempt limit and route unresolved cases to review or fallback.' },
          { mistake: 'Accept any fields for future flexibility', cause: 'Unexpected keys can hide schema drift or expose data the consumer did not expect.', fix: 'Forbid extra fields where appropriate and version intentional schema changes.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Build a Structured Support Classifier">
        <Practice
          title="Validate the suggestion before your app uses it"
          tasks={[
            'Extend the triage schema with a nullable language field chosen from a small documented set; decide whether it is required.',
            'Generate a JSON Schema from Pydantic and inspect required fields, bounds and additional-property behaviour.',
            'Write tests for malformed JSON, missing fields, an invalid enum, a confidence outside its range, and an extra field.',
            'Add a deterministic rule that routes low-confidence or payment-related cases to a human queue.',
            'Sketch a provider adapter using the structured-output feature documented for your chosen SDK; keep model and credentials in configuration.',
            'Decide what you will log for debugging while excluding prompts and personal data by default.',
          ]}
          hint="Keep the provider call replaceable. Your local validation and domain policy should be testable without making a network request."
        />
      </Part>

      <KeyTakeaways items={[
        'Model output remains untrusted text until parsing, schema validation and domain checks succeed.',
        'JSON Schema describes shape; Pydantic enforces a local typed contract in Python.',
        'Use a provider structured-output feature documented for the selected provider and SDK version.',
        'Handle refusal, truncation, transport errors and validation failures as distinct outcomes.',
        'Keep repair attempts bounded and send only the minimum context needed to correct a response.',
        'Use trusted services for facts and permissions; valid JSON does not make a claim true.',
      ]} />
      <H3>Next</H3>
      <NextLesson
        href="/learn/generative-ai/function-tool-calling"
        label="Lesson 04 · Function and Tool Calling"
        text="Structured data is useful on its own. Next, let a model request an action and build the guarded loop that executes it safely."
      />
    </LearnLayout>
  )
}
