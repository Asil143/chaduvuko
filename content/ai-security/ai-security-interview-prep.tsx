import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function AiSecurityInterviewPrep() {
  return (
    <LearnLayout
      title="AI Security Interview Prep"
      description="Prompt injection, RAG security, agent security and governance questions from AI security interviews, with model answers."
      section="AI Security & LLM Security — Lesson 10"
      readTime="40 min"
    >
      <Part n={1} label="Core concepts · Questions 1–4" title="Explain the Threat Model, Not Just the Model">
        <P>
          Strong answers name assets, boundaries, controls and evidence. Prompts do not grant permissions. State assumptions and adapt examples to your experience.
        </P>
        <H3>1. What makes an LLM application’s attack surface different from a conventional web application?</H3>
        <P>
          <strong>Model answer:</strong> LLM apps add untrusted natural-language and retrieved content to familiar identity, API, database and dependency risks. I map data flows and ensure generated text cannot bypass server-side authorization or output validation.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          <>Maps the model and surrounding application surfaces.</>,
          <>Separates model behavior from trusted authorization.</>,
        ]} />
        <H3>2. How do you use OWASP Top 10 for LLM Applications in a security review?</H3>
        <P>
          <strong>Model answer:</strong> I use the current OWASP LLM Top 10 as a risk taxonomy, mapping applicable categories—such as prompt injection, disclosure, supply chain, poisoning, improper output handling and excessive agency—to controls and tests. It is not certification.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          <>Uses current OWASP terminology and verifies the source.</>,
          <>Maps relevant risks to controls and evidence.</>,
        ]} />
        <H3>3. What is prompt injection, and why is a prompt-only fix insufficient?</H3>
        <P>
          <strong>Model answer:</strong> Prompt injection is untrusted direct or retrieved content steering model behavior. Since model boundaries are imperfect, I limit context and tools, enforce access in code, validate output, confirm risky actions, monitor and test.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          <>Explains direct and indirect untrusted inputs.</>,
          <>Recommends layered controls, not a perfect filter.</>,
        ]} />
        <H3>4. How would you threat-model a campus knowledge assistant?</H3>
        <P>
          <strong>Model answer:</strong> For a campus assistant, I map learners, records, credentials and boundaries across browser, app, retrieval, provider and tools. I test cross-learner access and sensitive logging, assign controls and owners, record residual risk and reassess on changes.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          <>Names assets, actors, boundaries and impact.</>,
          <>Includes test evidence, ownership and reassessment.</>,
        ]} />
      </Part>

      <Part n={2} label="Data and retrieval · Questions 5–8" title="Protect Context Before It Reaches the Model">
        <H3>5. How do you prevent cross-tenant data leakage in RAG?</H3>
        <P>
          <strong>Model answer:</strong> Apply authorization using authenticated principal and trusted metadata before context reaches the model. Test synthetic tenants across retrieval, reranking and caches; a prompt and response are not access controls.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          <>Enforces access before prompt construction.</>,
          <>Tests tenants, caches and alternate retrieval paths.</>,
        ]} />
        <H3>6. What would you log for an AI security incident?</H3>
        <P>
          <strong>Model answer:</strong> Log request ID, timestamp, environment, model config, policy and tool decisions, validation outcome and latency; exclude secrets and raw content by default. Govern any necessary sample with purpose, access and retention limits.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          <>Balances investigation with privacy and retention.</>,
          <>Uses correlation IDs and protected, minimal evidence.</>,
        ]} />
        <H3>7. How do you handle personal data in prompts and outputs?</H3>
        <P>
          <strong>Model answer:</strong> Minimize fields before provider transfer; redaction is imperfect and pseudonyms may be linkable. Restrict logs, review provider handling, validate output and enforce access in code. For India, consult current DPDP materials with a privacy or legal owner.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          <>Prioritizes minimization and layered privacy controls.</>,
          <>Avoids unsupported legal claims or guarantees.</>,
        ]} />
        <H3>8. Why is generated output considered untrusted input?</H3>
        <P>
          <strong>Model answer:</strong> Output can be false, malformed or unsafe for its destination. Parse a strict schema, validate semantics, encode for rendering, parameterize database calls and recheck identity and authorization before actions.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          <>Distinguishes parsing from truth and authorization.</>,
          <>Names context-appropriate output handling.</>,
        ]} />
        <Callout type="tip">
          An interview answer is stronger when it follows the data: source → trust boundary → control → evidence → residual risk.
        </Callout>
      </Part>

      <Part n={3} label="Tools and supply chain · Questions 9–12" title="Limit What the Model Can Cause">
        <H3>9. How do you secure an agent that can call business tools?</H3>
        <P>
          <strong>Model answer:</strong> Expose narrow tools with validated arguments. The server authenticates users and checks ownership and policy, with confirmations, bounds, idempotency and audit where needed; the model proposes, the service authorizes.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          <>Uses least privilege and server-side authorization.</>,
          <>Bounds actions and accounts for retries and audit.</>,
        ]} />
        <H3>10. What is excessive agency, and how would you reduce it?</H3>
        <P>
          <strong>Model answer:</strong> Excessive agency is more autonomy or permission than a task needs. Remove unnecessary tools, separate read and write, use least privilege and approvals for high-impact actions, and test that denials have no side effects.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          <>Treats autonomy as a permission design choice.</>,
          <>Separates read/write capability and tests denial.</>,
        ]} />
        <H3>11. How would you assess a third-party model or dataset?</H3>
        <P>
          <strong>Model answer:</strong> Review source, revision, publisher, license, dependencies and data provenance; evaluate in isolation with synthetic tests. Verify the deployed digest from trusted approval, noting a hash does not establish safety; plan updates and rollback.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          <>Covers provenance, evaluation and update lifecycle.</>,
          <>Distinguishes artifact identity from behavioral trust.</>,
        ]} />
        <H3>12. What is data or model poisoning?</H3>
        <P>
          <strong>Model answer:</strong> Poisoning manipulates training examples or artifacts to change behavior. Protect sources, labels, revisions and evaluation data. Distinguish poisoned training from malicious retrieved content; use MITRE ATLAS to structure testable threat hypotheses.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          <>Separates training-data, artifact and retrieval risks.</>,
          <>Uses provenance and independent evaluation.</>,
        ]} />
      </Part>

      <Part n={4} label="Testing and governance · Questions 13–16" title="Demonstrate Evidence and Ownership">
        <H3>13. How would you conduct an AI red-team exercise?</H3>
        <P>
          <strong>Model answer:</strong> Get written authorization, scope, accounts, window, prohibited actions and stop conditions. Use synthetic cases to test retrieval, tools, privacy and output; minimize evidence, report safely, remediate and add regression tests.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          <>Starts with written scope and synthetic data.</>,
          <>Includes remediation, minimal evidence and retesting.</>,
        ]} />
        <H3>14. What role do automated AI security scanners play?</H3>
        <P>
          <strong>Model answer:</strong> Scanners broaden coverage but produce false positives and miss application-specific issues. Check data handling and scope, treat findings as hypotheses, validate safely and add deterministic tests; scores are not certification.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          <>Understands scanner limits and authorized scope.</>,
          <>Validates findings and adds repeatable checks.</>,
        ]} />
        <H3>15. How would you use the NIST AI RMF in a security program?</H3>
        <P>
          <strong>Model answer:</strong> Govern defines accountability, Map identifies context, Measure evaluates risk and Manage prioritizes action. Apply iteratively with evidence and owners; NIST AI RMF is voluntary guidance, not compliance certification.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          <>Accurately explains all four NIST AI RMF functions.</>,
          <>Treats the framework as guidance, not certification.</>,
        ]} />
        <H3>16. How do you respond to a suspected sensitive-data disclosure?</H3>
        <P>
          <strong>Model answer:</strong> Follow incident process to confirm, contain, preserve minimal evidence, scope impact and coordinate security, privacy and legal owners. Recover, verify controls and add regressions; notification decisions follow approved policy and current requirements.
        </P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={[
          <>Covers containment, evidence and appropriate escalation.</>,
          <>Includes recovery and avoids unsupported claims.</>,
        ]} />
        <Callout type="info">
          Interviewers value calibrated answers. State assumptions, name what you would verify and be honest about uncertainty
          rather than inventing a model version, compliance requirement or universal defense.
        </Callout>
      </Part>

      <Part n={5} label="Practical snippets" title="Show That Controls Live in Application Code">
        <P>
          These examples illustrate selected controls; production systems need reviewed security controls.
        </P>
        <Code file="strict_output.py" code={`
from pydantic import BaseModel, ConfigDict, Field, ValidationError

class Answer(BaseModel):
    model_config = ConfigDict(extra="forbid")
    text: str = Field(min_length=1, max_length=1000)
    category: str = Field(pattern="^(delivery|billing|other)$")


def parse_model_output(raw: str) -> Answer:
    try:
        return Answer.model_validate_json(raw)
    except ValidationError as error:
        raise ValueError("Invalid assistant response") from error


candidate = '{"text":"Your delivery is being checked.","category":"delivery"}'
print(parse_model_output(candidate).category)
`} />
        <P>
          Parsing checks shape, not truth or access. Use authenticated identity and source-of-truth data for those checks.
        </P>
        <Code file="authorize_tool.py" code={`
from dataclasses import dataclass

@dataclass(frozen=True)
class RefundRequest:
    order_id: str
    requested_by: str
    amount_minor_units: int


def can_refund(
    request: RefundRequest,
    authenticated_user: str,
    order_owner: str,
    approved: bool,
    limit_minor_units: int,
) -> bool:
    return (
        request.requested_by == authenticated_user
        and order_owner == authenticated_user
        and approved
        and 0 <= request.amount_minor_units <= limit_minor_units
    )


request = RefundRequest("order-demo", "user-demo", 2500)
print(can_refund(request, "user-demo", "user-demo", False, 10000))
`} />
        <P>
          A denied action must have no side effect. Record a minimal protected event and obtain approval through a trusted user interaction.
        </P>
        <Code file="minimal_event.py" code={`
from dataclasses import asdict, dataclass
import json

@dataclass(frozen=True)
class Event:
    request_id: str
    event_type: str
    policy_result: str
    component: str


def serialize(event: Event) -> str:
    # Keep prompts, secrets and personal details out of routine events.
    return json.dumps(asdict(event), separators=(",", ":"))


print(serialize(Event("req-demo", "tool_check", "denied", "refund")))
`} />
        <Table
          head={['Claim', 'Evidence to describe']}
          rows={[
            ['Secure retrieval', 'Authorization before prompt assembly; synthetic cross-tenant denial test'],
            ['Validate output', 'Strict parsing, semantic checks, safe fallback and downstream authorization'],
          ]}
        />
      </Part>

      <Part n={6} label="Pitfalls" title="Common Interview Mistakes">
        <Mistakes items={[
          { mistake: 'Claiming prompt engineering eliminates prompt injection', cause: 'Natural-language instructions are not a hard authorization boundary.', fix: 'Describe layered controls and enforce permissions in trusted services.' },
          { mistake: 'Saying a scanner or framework guarantees security', cause: 'Tools and frameworks organize work but cannot prove every system property.', fix: 'Explain what was tested, what evidence exists and what residual risk remains.' },
          { mistake: 'Treating valid JSON as a safe action', cause: 'A schema checks structure, not ownership, truth or user approval.', fix: 'Add semantic validation, authenticated identity and server-side authorization.' },
          { mistake: 'Giving a generic answer without assumptions', cause: 'The best control depends on data sensitivity, autonomy, users and impact.', fix: 'Clarify scope, state assumptions and describe how you would verify the unknowns.' },
        ]} />
      </Part>

      <Part n={7} label="Practice and review" title="Practice a Structured Security Answer">
        <Practice
          title="Run a mock AI security interview"
          tasks={[
            'Choose four questions above and answer each in two minutes using asset, boundary, control, evidence and residual risk.',
            'Sketch a RAG assistant data flow and mark where tenant authorization must be enforced.',
            'Review a hypothetical model-release record and list missing provenance, evaluation and rollback details.',
            'Explain how you would contain a blocked-but-repeated tool request without logging raw conversation content.',
            'Ask a peer to challenge one assumption and revise your answer with a concrete verification step.',
          ]}
          hint="Share only accurate, authorized examples; explain how you would test controls you have not implemented."
        />
      </Part>

      <Part n={8} label="Takeaways" title="Communicate Security as Engineering">
        <KeyTakeaways items={[
          'Strong AI security answers follow the system’s data flow and identify trust boundaries.',
          'Prompts guide model behavior; application code enforces identity, authorization and business rules.',
          'OWASP LLM risks and MITRE ATLAS provide useful, evolving references—not guarantees or permissions.',
          'NIST AI RMF organizes risk work through Govern, Map, Measure and Manage.',
          'Use synthetic cases, minimal evidence and authorized environments for testing.',
          'Describe trade-offs, owners, validation evidence and residual risk; never overstate compliance or certainty.',
        ]} />
        <H3>Next</H3>
        <NextLesson href="/learn/cybersecurity" label="Next course · Cybersecurity" text="You have completed AI Security & LLM Security. Continue with Cybersecurity to strengthen the foundational skills behind secure AI engineering." />
      </Part>
    </LearnLayout>
  )
}
