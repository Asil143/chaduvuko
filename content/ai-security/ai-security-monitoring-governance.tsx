import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function AiSecurityMonitoringGovernance() {
  return (
    <LearnLayout
      title="Monitoring, Incident Response and AI Governance"
      description="Detect abuse in production, respond to AI incidents, and apply governance frameworks such as the NIST AI RMF and the EU AI Act."
      section="AI Security & LLM Security — Lesson 09"
      readTime="40 min"
    >
      <Part n={1} label="From tests to operations" title="Security Controls Must Keep Working After Launch">
        <P>
          A release can be secure in a test environment and still fail in production as users, model behavior, data and
          dependencies change. An AI system may reveal sensitive context, produce untrusted output that a downstream service
          mishandles, request an unauthorized tool action or consume resources unexpectedly. Monitoring should help an operator
          notice these events, understand their scope and respond—without turning every prompt into a permanent surveillance log.
        </P>
        <P>
          Begin with a baseline for the feature and its risks. Record operational indicators such as request volume, latency,
          errors, policy denials, retrieval authorization failures, tool approvals, output-validation failures and cost-related
          limits. Interpret the signals together: a change in denial rate can reflect abuse, a product bug or a legitimate
          change in user behavior. An alert should route to a person who has a defined action, not merely add another dashboard.
        </P>
        <Table
          head={['Signal', 'Possible interpretation', 'Response design']}
          rows={[
            ['Authorization denials', 'Expected rejection or a broken integration', 'Group by safe reason code; compare baseline; page only for meaningful patterns'],
            ['Output validation failures', 'Model drift, malformed response or upstream change', 'Use a safe fallback; sample minimal metadata for triage'],
            ['Tool requests blocked', 'Policy working, misuse attempt or prompt confusion', 'Record tool and decision; never log secrets or execute the denied action'],
            ['Unusual usage or latency', 'Abuse, workload shift or provider issue', 'Apply bounded quotas and a documented degraded mode'],
            ['Sensitive-data policy alerts', 'Possible exposure or overbroad context', 'Contain the path, restrict access to evidence and start incident assessment'],
          ]}
        />
        <Callout type="info">
          A metric is not a security control by itself. Decide who owns the alert, what threshold is meaningful, what safe action
          follows and how the team will learn whether the alert was useful.
        </Callout>
      </Part>

      <Part n={2} label="NIST AI RMF" title="Govern, Map, Measure and Manage Risk">
        <P>
          The NIST AI Risk Management Framework (AI RMF 1.0) organizes risk management around four functions: <strong>Govern</strong>,
          <strong> Map</strong>, <strong>Measure</strong> and <strong>Manage</strong>. Govern is cross-cutting: it establishes
          policies, roles, accountability and risk culture. Map establishes context and identifies risks; Measure uses appropriate
          methods to assess and track them; Manage prioritizes and acts on risks. Apply the functions iteratively across design,
          deployment and use. The framework is voluntary guidance, not a substitute for applicable law or an organization’s own
          policy; refer to NIST’s official AI RMF materials for the authoritative descriptions and resources.
        </P>
        <Table
          head={['Function', 'Operational question', 'Example for an AI support assistant']}
          rows={[
            ['Govern', 'Who is accountable and what policy applies?', 'Name product, privacy, security and incident owners; approve data and action boundaries'],
            ['Map', 'What is the system used for and who can be affected?', 'Document users, data paths, provider dependencies, tools and foreseeable misuse'],
            ['Measure', 'How do we know controls and outcomes are acceptable?', 'Run privacy, access-control and output tests; monitor changes and limitations'],
            ['Manage', 'What do we prioritize, mitigate, accept or stop?', 'Block risky actions, contain exposure, assign remediation and review residual risk'],
          ]}
        />
        <P>
          Governance is not a one-time checklist. A new model, data source, prompt, logging policy or tool permission can change
          risk. Define change triggers that require reassessment, such as a new data class, a new production integration or a
          significant change in user population. Keep a record of the decision, owner, evidence and review date.
        </P>
        <Callout type="tip">
          Use a framework to improve accountability and repeatability. Do not claim that following a framework automatically
          makes an AI product safe, lawful, unbiased or certified.
        </Callout>
      </Part>

      <Part n={3} label="Telemetry design" title="Log Decisions and Outcomes, Not Secrets">
        <P>
          Good observability makes a security event traceable without collecting more content than necessary. Prefer structured
          events with a random request ID, environment, policy decision, model configuration reference, tool name, latency and
          outcome. Exclude API keys, raw personal data and full conversations from routine logs. If a limited content sample is
          necessary for a defined review, document its purpose, access, protection, retention and deletion process before
          collecting it.
        </P>
        <Code file="ai_security_event.py" code={`
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
import json

@dataclass(frozen=True)
class SecurityEvent:
    request_id: str
    timestamp: str
    environment: str
    event_type: str
    policy_decision: str
    component: str
    outcome: str


def emit(event: SecurityEvent) -> None:
    # The event schema intentionally excludes prompt and completion content.
    print(json.dumps(asdict(event), separators=(",", ":")))


event = SecurityEvent(
    request_id="req-demo-8b12",
    timestamp=datetime.now(timezone.utc).isoformat(),
    environment="staging",
    event_type="tool_authorization",
    policy_decision="denied",
    component="refund-tool",
    outcome="no-side-effect",
)
emit(event)
`} />
        <P>
          Correlation IDs let responders connect service events without putting a user’s name into every log line. Apply access
          controls and retention to telemetry itself, and audit who reads high-sensitivity logs. Be cautious with third-party
          tracing and analytics services: confirm that content capture is disabled or configured appropriately and that the
          integration is approved for the data it receives.
        </P>
      </Part>

      <Part n={4} label="Alerting and response" title="Prepare to Contain, Investigate and Recover">
        <P>
          An AI incident can be a confirmed data exposure, an unsafe action, misuse of a tool, a compromised dependency, a
          recurring policy bypass or a serious integrity issue. Not every strange answer is an incident. Define severity and
          escalation with security, product, privacy, legal and operations owners as appropriate. Prepare containment choices in
          advance: disable a tool, turn off retrieval, restrict an account, route to a human, roll back a model configuration or
          temporarily disable the AI feature while preserving essential non-AI functionality.
        </P>
        <Steps items={[
          'Triage the alert and determine whether it is an incident under the organization’s process.',
          'Contain the risky capability using a pre-approved safe switch; preserve the minimum necessary evidence.',
          'Establish impact and scope: environment, time range, affected data or actions, and relevant release identity.',
          'Coordinate notification and escalation with the designated incident, privacy and legal owners; do not make unsupported promises.',
          'Recover from a known-good configuration, verify controls and communicate status through approved channels.',
          'Complete a blameless review with root cause, control gaps, owners, deadlines and regression tests.',
        ]} />
        <Code file="alert_routing.py" code={`
from dataclasses import dataclass

@dataclass(frozen=True)
class Signal:
    event_type: str
    count: int
    threshold: int


def runbook_for(signal: Signal) -> str:
    if signal.count < signal.threshold:
        return "continue monitoring"
    if signal.event_type == "cross_tenant_denial":
        return "notify security owner; review retrieval boundary"
    if signal.event_type == "output_validation_failure":
        return "use safe fallback; review model integration"
    return "create triage task for service owner"


signal = Signal("output_validation_failure", count=4, threshold=3)
print(runbook_for(signal))
`} />
        <P>
          Thresholds should be calibrated to the service baseline and reviewed by an owner. This example selects a runbook; it
          does not automatically make a consequential production change.
        </P>
        <Callout type="warning">
          Do not paste a suspected secret, customer transcript or unredacted incident log into an external model to get help
          analyzing it. Use approved internal tooling and follow the incident evidence-handling process.
        </Callout>
      </Part>

      <Part n={5} label="Operational controls" title="Use Guardrails That Fail Safely">
        <P>
          Monitoring observes behavior; it does not replace prevention. Enforce authorization before retrieval and before every
          tool action, cap request size and output, validate structured responses and provide a safe fallback when dependencies
          fail. Give the model no more permission than the feature needs. For high-impact actions, require a trusted server-side
          decision and human confirmation where the product’s risk assessment calls for it.
        </P>
        <Code file="safe_action_gate.py" code={`
from dataclasses import dataclass

@dataclass(frozen=True)
class ActionRequest:
    action: str
    account_id: str
    amount_minor_units: int
    requested_by: str


def authorize_refund(
    request: ActionRequest,
    authenticated_user: str,
    account_owner: str,
    approved_by_user: bool,
    maximum_amount_minor_units: int,
) -> bool:
    # Model text is not an authorization credential.
    if request.requested_by != authenticated_user:
        return False
    if account_owner != authenticated_user or not approved_by_user:
        return False
    if request.action != "refund" or request.amount_minor_units < 0:
        return False
    return request.amount_minor_units <= maximum_amount_minor_units


candidate = ActionRequest("refund", "acct-demo", 5000, "learner-17")
allowed = authorize_refund(
    candidate,
    authenticated_user="learner-17",
    account_owner="learner-17",
    approved_by_user=False,
    maximum_amount_minor_units=10000,
)
print("allowed:", allowed)
`} />
        <P>
          The example illustrates independent checks; it is not a payment system. Real applications need their established
          identity, transaction, audit and idempotency controls. Keep the tool interface narrow, reject unknown actions and make
          denial observable. A model should propose an action at most; trusted services decide whether it may happen.
        </P>
      </Part>

      <Part n={6} label="Governance in practice" title="Make Ownership and Change Review Visible">
        <P>
          An operational AI risk register can connect each risk to the system context, affected people, likelihood and impact
          assessment, existing controls, evidence, owner, mitigation and residual-risk decision. The exact record depends on the
          organization and use case. Keep it current when systems change, and make sure product, engineering, security and
          privacy responsibilities are explicit. For consequential uses, define appropriate human oversight and a process to
          contest or correct outputs rather than assuming an automated answer is final.
        </P>
        <Bullets items={[
          <>Name a business owner and technical owner for every production AI feature.</>,
          <>Set approval gates for new data sources, tools, providers and material model changes.</>,
          <>Document known limitations, user-facing disclosures, escalation paths and safe fallback behavior.</>,
          <>Review alert quality, abuse reports, access failures and user feedback on a defined cadence.</>,
          <>Track remediation and residual-risk acceptance with accountable decision makers.</>,
        ]} />
        <P>
          Governance must fit the context. A study-note summarizer and an assistant that initiates a financial transaction have
          different impact, autonomy and oversight needs. Use the NIST AI RMF to structure the conversation, then consult current
          applicable requirements and qualified experts for jurisdiction-specific obligations.
        </P>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Collecting full prompts because they might help later', cause: 'Content logs expand privacy and breach impact while often adding little to first-line detection.', fix: 'Define signals and owners first; log minimal metadata and separately govern any justified content sample.' },
          { mistake: 'Alerting without a response owner', cause: 'A dashboard signal can be ignored if no one knows whether to disable a tool or escalate.', fix: 'Attach each alert to a runbook, severity, owner, containment action and review cadence.' },
          { mistake: 'Calling a framework a certification', cause: 'NIST AI RMF is risk-management guidance, not a guarantee of safety or compliance.', fix: 'Describe the functions and evidence actually used, and assess legal duties separately.' },
          { mistake: 'Letting the model authorize its own tool action', cause: 'Generated text can be manipulated or incorrect and is not an identity or permission check.', fix: 'Enforce policy in a trusted service using authenticated identity, ownership, approval and bounded action rules.' },
        ]} />
      </Part>

      <Part n={8} label="Practice and review" title="Build an AI Incident-Readiness Card">
        <Practice
          title="Prepare a production response for a campus assistant"
          tasks={[
            'Map the system’s users, data, provider, retrieval, model-controlled tools and most consequential failure modes.',
            'Choose four privacy-preserving telemetry events and state what each event deliberately excludes.',
            'Create an alert runbook for repeated cross-tenant authorization denials and a separate runbook for malformed outputs.',
            'Name the safe switches, incident owners, evidence store and escalation contacts needed to contain an issue.',
            'Organize the risk review under Govern, Map, Measure and Manage; record owners and the next review trigger.',
          ]}
          hint="Use fake incidents and data. A useful runbook says who does what, how to contain safely, and how to verify recovery."
        />
        <KeyTakeaways items={[
          'Production monitoring should detect AI-specific failures while minimizing sensitive content collection.',
          'NIST AI RMF 1.0 functions are Govern, Map, Measure and Manage; use official NIST materials for details.',
          'Every actionable alert needs a responsible owner, safe containment option and review path.',
          'Prepared incident response includes evidence protection, scope assessment, recovery and regression testing.',
          'Preventive authorization and validation must remain in trusted application code.',
          'Governance is continuous: reassess when data, models, users, providers or tool permissions change.',
        ]} />
        <H3>Next</H3>
        <NextLesson href="/learn/ai-security/ai-security-interview-prep" label="Lesson 10 · AI Security Interview Prep" text="Finish the track by practicing how to explain threat scenarios, design defenses and communicate trade-offs in AI security interviews." />
      </Part>
    </LearnLayout>
  )
}
