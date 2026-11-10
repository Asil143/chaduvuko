import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function AiRedTeaming() {
  return (
    <LearnLayout
      title="AI Red Teaming and Security Testing"
      description="Plan an AI red-team exercise, build attack test suites, use automated scanners, and turn findings into regression tests."
      section="AI Security & LLM Security — Lesson 08"
      readTime="40 min"
    >
      <Part n={1} label="Purpose and permission" title="Red Team the System You Are Authorized to Test">
        <P>
          AI red teaming is a structured way to discover where an AI-enabled product can cause harm or fail its security
          requirements. It is not a license to probe a public chatbot, another company’s API or user data. Define a written
          scope first: the application and environment, approved accounts and data, test window, prohibited actions, rate
          limits, emergency contact and stop conditions. Use a staging deployment and synthetic data whenever possible.
        </P>
        <P>
          The goal is not to collect clever prompts. Test the complete system: user interface, prompt construction, retrieval
          permissions, tools, output handling, monitoring and incident workflow. A finding should explain a reproducible
          condition, the violated security or safety property, the impact within scope, and a practical mitigation. Report only
          the minimum evidence needed; do not retain real secrets, personal data or harmful content as proof.
        </P>
        <Table
          head={['Test area', 'Security question', 'Example safe evidence']}
          rows={[
            ['Input handling', 'Can untrusted input override intended boundaries?', 'A synthetic test case records whether policy checks triggered'],
            ['Retrieval', 'Can a user receive a document outside their permissions?', 'Two fake tenants and a deliberately isolated test document'],
            ['Tools', 'Can a model request an action beyond user intent or role?', 'A mock tool records a denied request without changing real state'],
            ['Output', 'Does downstream code parse and encode generated content safely?', 'A local test fixture verifies escaping and schema rejection'],
            ['Operations', 'Can responders detect and contain a policy failure?', 'A tabletop timeline showing alert, owner, containment and recovery'],
          ]}
        />
        <Callout type="warning">
          Keep testing inside explicit authorization. Never send test traffic to real customer accounts, attempt to obtain another
          user’s information, or trigger financial, destructive or otherwise consequential actions.
        </Callout>
      </Part>

      <Part n={2} label="Build a threat-based plan" title="Start from Assets, Boundaries and Abuse Cases">
        <P>
          Reuse the threat model from earlier lessons. List assets (personal data, credentials, model configuration, business
          actions), entry points and trust boundaries. Then select tests linked to a risk rather than trying random inputs.
          OWASP Top 10 for LLM Applications provides a useful vocabulary for risks such as prompt injection, sensitive
          information disclosure, supply-chain weakness, improper output handling and excessive agency. Check the current OWASP
          project for exact categories and use its taxonomy as a prompt for coverage—not as a pass/fail score.
        </P>
        <P>
          MITRE ATLAS is a knowledge base for adversary tactics and techniques relevant to AI systems. Use it to help organize
          threat hypotheses and understand how a technique maps to a defensive control. It does not replace authorization, a
          product-specific threat model or safe test design. NIST AI RMF’s Govern, Map, Measure and Manage functions can help
          connect the exercise to owners, context, evaluation and response.
        </P>
        <Steps items={[
          'Write the security property in observable terms, such as “a learner can retrieve only documents assigned to their account.”',
          'Choose a harmless test fixture and a bounded method that can verify the property.',
          'Record expected and observed behavior, including the control that should block or contain a failure.',
          'Define stop conditions for unexpected access, service degradation or any contact with real data.',
          'Assign an owner to triage, remediate and retest every confirmed finding.',
        ]} />
        <Callout type="tip">
          A useful test is specific enough to repeat and safe enough to run in CI. Keep exploratory testing and automated
          regression cases separate when the former needs human judgment or a controlled staging environment.
        </Callout>
      </Part>

      <Part n={3} label="Test case design" title="Use Synthetic Cases with Explicit Expected Outcomes">
        <P>
          A test case should state the setup, trust boundary, expected control and evidence to collect. For example, seed a
          staging knowledge base with two clearly labeled fictional tenants, then verify that a request authenticated as one
          tenant never receives the other tenant’s test record. Do not put an actual customer document into the exercise. Make
          the test fail when the authorization layer is missing, rather than expecting the model to infer access rules from a
          prompt.
        </P>
        <Code file="ai_security_cases.py" code={`
from dataclasses import dataclass
from typing import Callable

@dataclass(frozen=True)
class SecurityCase:
    case_id: str
    area: str
    description: str
    check: Callable[[str], bool]


def contains_other_tenant_fixture(output: str) -> bool:
    return "SYNTHETIC_TENANT_B_SECRET" in output


def output_is_bounded(output: str) -> bool:
    return len(output) <= 1200


CASES = [
    SecurityCase(
        case_id="rag-tenant-isolation",
        area="retrieval authorization",
        description="Tenant A must not receive tenant B's synthetic fixture.",
        check=contains_other_tenant_fixture,
    ),
    SecurityCase(
        case_id="output-length-bound",
        area="resource and output policy",
        description="The application must enforce its configured response bound.",
        check=lambda output: not output_is_bounded(output),
    ),
]


def review_result(case: SecurityCase, output: str) -> dict[str, str | bool]:
    # A true check result means this fixture detected the failure condition.
    return {
        "case_id": case.case_id,
        "finding_detected": case.check(output),
        "description": case.description,
    }


for case in CASES:
    print(review_result(case, output="A normal response for the signed-in user."))
`} />
        <P>
          This simple harness tests output properties; it does not prove that the retrieval implementation is secure. In a real
          staging test, the test runner should create the identity, call the application’s normal authorized endpoint, collect
          minimal structured results and clean up its synthetic fixtures. Keep expected-denial behavior distinct from a generic
          model refusal so teams can see which enforcement layer worked.
        </P>
      </Part>

      <Part n={4} label="Coverage" title="Exercise Multiple Layers, Not Only the Prompt">
        <P>
          Organize a coverage matrix around the product’s architecture. Include direct and indirect untrusted content as
          controlled inputs, but avoid relying on a single &quot;magic phrase&quot; or treating a refusal as proof. Verify that
          server-side authorization and tool permissions hold even if a model response is unexpected. Include the data lifecycle:
          prompts and completions in telemetry, secrets in configuration, artifacts in the build, and the path to disable a
          feature after an incident.
        </P>
        <Table
          head={['Layer', 'Test objective', 'Evidence to capture']}
          rows={[
            ['Identity and retrieval', 'Enforce tenant and document permissions before context is built', 'Authorized user fixture, document IDs, allow/deny decision'],
            ['Prompt and content', 'Keep untrusted text from becoming privileged application policy', 'Synthetic input ID, control decision, safe output summary'],
            ['Tool boundary', 'Require independent server-side authorization and confirmation', 'Mock action request, policy result, no real side effect'],
            ['Output and UI', 'Reject invalid structure and safely render plain content', 'Schema result and rendering test outcome'],
            ['Observability', 'Detect policy violations without copying sensitive content', 'Event type, timestamp, request correlation ID, alert route'],
            ['Supply chain', 'Use the reviewed model and dependencies in the tested release', 'Artifact/config identity and approval reference'],
          ]}
        />
        <P>
          Prioritize by plausible impact, exposure, affected users and likelihood—not by how surprising a model response looks.
          A harmless weird answer may be a quality defect; a retrieval boundary failure is a security finding. Document that
          distinction so fixes target the actual layer responsible.
        </P>
      </Part>

      <Part n={5} label="Automation and scanners" title="Use Tools to Expand Coverage, Not Replace Judgment">
        <P>
          Automated evaluation can replay fixed cases, detect response-format changes and scan for known classes of issues.
          It is useful for broad coverage and regression protection, but false positives and false negatives are expected.
          A scanner’s severity label is a lead to review, not a confirmed vulnerability. Keep test inputs synthetic, avoid
          uploading confidential prompts to an unapproved service and inspect the tool’s data handling before use.
        </P>
        <Code file="regression_gate.py" code={`
from dataclasses import dataclass

@dataclass(frozen=True)
class TestResult:
    case_id: str
    passed: bool
    reason: str


def run_case(case_id: str, output: str) -> TestResult:
    if case_id == "tenant-boundary":
        passed = "SYNTHETIC_TENANT_B_SECRET" not in output
        return TestResult(case_id, passed, "cross-tenant fixture must not appear")
    if case_id == "safe-rendering-input":
        # The UI test should assert escaped text, not executable markup.
        passed = "<script>" not in output
        return TestResult(case_id, passed, "unsafe markup fixture must be rejected or encoded")
    return TestResult(case_id, False, "unknown test case")


def release_gate(results: list[TestResult]) -> None:
    failures = [result for result in results if not result.passed]
    if failures:
        names = ", ".join(result.case_id for result in failures)
        raise SystemExit(f"Release review required: {names}")


results = [
    run_case("tenant-boundary", "Your order status is being checked."),
    run_case("safe-rendering-input", "Plain text response."),
]
release_gate(results)
print("Defined regression checks passed")
`} />
        <P>
          In a production test suite, use assertions against the real application boundary, not a stand-in string check. Pin the
          test version, record reproducible configuration, rate-limit safely and retain only the result needed to debug. Model
          upgrades should rerun the same security cases before rollout; drift in behavior should trigger review rather than
          silently changing the expected result.
        </P>
      </Part>

      <Part n={6} label="Reporting and remediation" title="Turn a Finding into a Verified Fix">
        <P>
          A clear report makes it possible to fix the product without publishing a reusable attack recipe. Include a short
          summary, affected environment and version, prerequisite test account, security property, minimal synthetic evidence,
          expected and observed behavior, impact and proposed control. Avoid including real account data, provider secrets or
          instructions that reach beyond the authorized scope. Share the report only with the designated response owners.
        </P>
        <Bullets items={[
          <>Contain first if the finding could affect real users; follow the organization’s incident and disclosure procedures.</>,
          <>Fix the enforcement layer: authorization belongs in trusted services, not solely in a system prompt.</>,
          <>Add the verified case as a regression test with a clear owner and expected behavior.</>,
          <>Retest the original condition and nearby boundaries after the fix; record residual limitations.</>,
          <>Review telemetry, access and data retention if the exercise may have exposed sensitive content.</>,
        ]} />
        <Code file="finding_record.py" code={`
from dataclasses import asdict, dataclass
import json

@dataclass(frozen=True)
class Finding:
    finding_id: str
    environment: str
    control_area: str
    expected_result: str
    observed_result: str
    owner: str
    raw_content_included: bool = False


def serialize_finding(finding: Finding) -> str:
    if finding.raw_content_included:
        raise ValueError("Store sanitized evidence only")
    return json.dumps(asdict(finding), separators=(",", ":"))


finding = Finding(
    "AI-TEST-014", "staging", "tool authorization",
    "mock action denied", "approval gate was missing", "application-security",
)
print(serialize_finding(finding))
`} />
        <P>
          Keep a report focused on the violated property and sanitized evidence. Any sensitive content unexpectedly observed
          should be handled through the approved incident process, not copied into a general test ticket.
        </P>
        <Callout type="example">
          If a mock tool tries to issue a refund without an approval, the durable fix is a server-side permission and confirmation
          gate that rejects the call—not a stronger prompt telling the model never to refund.
        </Callout>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Testing a public service without written authorization', cause: 'A feature being reachable does not grant permission to probe it or access other users’ data.', fix: 'Get explicit scope and use an organization-controlled staging environment with synthetic fixtures.' },
          { mistake: 'Treating an automated scanner score as proof', cause: 'Scanners can misclassify expected behavior and miss application-level authorization flaws.', fix: 'Reproduce safely, verify the violated property and have an owner review impact and evidence.' },
          { mistake: 'Trying to make the model refuse every test prompt', cause: 'A refusal may not protect retrieval, tools, output rendering or other application boundaries.', fix: 'Test each enforcement layer, especially server-side access control and action authorization.' },
          { mistake: 'Keeping raw conversation transcripts as test evidence', cause: 'The transcript may capture secrets or personal data and is often more evidence than needed.', fix: 'Use synthetic inputs and store minimal identifiers, decisions and sanitized outcomes.' },
        ]} />
      </Part>

      <Part n={8} label="Practice and review" title="Plan a Safe AI Red-Team Exercise">
        <Practice
          title="Test a staging campus help assistant"
          tasks={[
            'Write an authorization scope, test window, allowed accounts, prohibited actions and emergency stop contact.',
            'Define five security properties across retrieval, privacy, output handling, tools and monitoring.',
            'Create a pair of fictional learner accounts and documents to test tenant isolation without real student data.',
            'Implement a regression check that fails when a disallowed fixture or unapproved mock action is observed.',
            'Draft a finding template and a remediation/retest workflow; explain how scanners fit into human review.',
          ]}
          hint="Use fake accounts, fake documents and mock side effects. An exercise that unexpectedly reaches production data must stop and escalate."
        />
        <KeyTakeaways items={[
          'Red teaming starts with explicit authorization, a bounded scope, synthetic data and stop conditions.',
          'Use OWASP LLM risks and MITRE ATLAS as structured references, not as permission or certification.',
          'Test the full system—identity, retrieval, tools, output handling, supply chain and response—not just prompts.',
          'Automated scanners expand coverage but their findings require safe reproduction and human validation.',
          'Minimize evidence, protect it and share it with the designated owners.',
          'A confirmed finding is not done until the fix is retested and a regression check has an owner.',
        ]} />
        <H3>Next</H3>
        <NextLesson href="/learn/ai-security/ai-security-monitoring-governance" label="Lesson 09 · Monitoring, Incident Response and AI Governance" text="Next, connect testing to production telemetry, incident response and governance so controls stay effective after release." />
      </Part>
    </LearnLayout>
  )
}
