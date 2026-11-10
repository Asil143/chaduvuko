import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function ThreatModellingAiSystems() {
  return (
    <LearnLayout
      title="Threat Modelling AI Systems"
      description="Map data flows, trust boundaries and assets in an LLM app, then apply STRIDE-style analysis to prompts, retrieval, tools and outputs."
      section="AI Security & LLM Security — Lesson 02"
      readTime="40 min"
    >
      <Part n={1} label="Why model threats" title="Threat Modelling Is a Design Conversation">
        <P>
          Threat modelling is a structured way to ask what a system protects, who can interact with it, where trust changes,
          and what could fail. It is not a prediction that every scenario will happen. A useful model exposes assumptions while
          architecture can still change, then points to a control or test that a team can own.
        </P>
        <P>
          For an LLM application, do not draw only a box labeled &quot;model.&quot; Include identity, prompt assembly, retrieval,
          model provider, tools, result rendering, logs, and human review. User text and retrieved content are inputs, not
          trusted policy. A model output that will affect a database or user account crosses a particularly important boundary.
        </P>
        <Callout type="info">
          Model the product as a software system with an uncertain component—not as a model in isolation. Authentication,
          authorization, output encoding, and operational controls still have to work if the model response is wrong.
        </Callout>
      </Part>

      <Part n={2} label="Scope" title="Name Assets, Actors and Security Objectives">
        <P>
          Begin with a narrow feature and concrete assets. For a support assistant, assets might include customer identifiers,
          account details, support transcripts, provider credentials, and the ability to issue an account credit. Actors include
          end users, support staff, administrators, the application service, the model provider, and external content sources.
          Give service identities names too; they often have more access than a person.
        </P>
        <Table
          head={['Question', 'Example for a support assistant']}
          rows={[
            ['What must be protected?', 'Order details, account data, provider secrets, and payment adjustments'],
            ['Who may use it?', 'Authenticated customer, support agent, administrator, background job'],
            ['What may each actor do?', 'Read their own status; staff may view assigned cases; only authorized staff may approve credits'],
            ['What is the impact of failure?', 'Cross-customer disclosure, unauthorized change, service disruption, or incorrect advice'],
            ['What is explicitly out of scope?', 'Model internals the application cannot observe; record the uncertainty instead of assuming safety'],
          ]}
        />
        <P>
          Include privacy and integrity alongside availability. In a learning product, a wrong answer can be harmful without
          exposing data; in a commerce workflow, a seemingly small action may affect payment or delivery. State the consequence
          in the language of the product so engineering and operations can prioritize it.
        </P>
      </Part>

      <Part n={3} label="Data flows" title="Draw Boundaries Before Listing Attacks">
        <P>
          Use a simple data-flow diagram. Represent people and external services as actors, application functions as processes,
          data stores as stores, and arrows as flows. Mark where identity is checked, where data changes trust level, and which
          service account performs a request. A retrieval index is a data store; it is not an authorization layer by itself.
        </P>
        <Steps items={[
          'Choose one user journey and mark its start, result, and failure paths.',
          'Draw the browser, application API, identity service, database, index, model provider, and every tool that can be called.',
          'Label each arrow with data type, identity, and purpose; note sensitive fields and whether content is user-controlled.',
          'Draw a trust boundary around each component operated by a different team or organization.',
          'Mark enforcement points: authorization checks, schema validation, output encoding, rate limits, and approvals.',
        ]} />
        <Callout type="example">
          A browser sends a question to the application. The application authenticates the user, retrieves permitted records,
          constructs model context, calls a provider, then renders text. If an answer proposes an account change, a separate
          backend action and authorization check should follow; the model reply alone must not execute it.
        </Callout>
      </Part>

      <Part n={4} label="STRIDE-style analysis" title="Ask What Can Go Wrong at Each Boundary">
        <P>
          STRIDE is a classic threat-modeling mnemonic: Spoofing, Tampering, Repudiation, Information disclosure, Denial of
          service, and Elevation of privilege. Applying it to AI systems is a useful analysis technique, not a special OWASP
          or MITRE scoring method. Some threats overlap, and an AI-specific scenario may fit more than one category.
        </P>
        <Table
          head={['STRIDE lens', 'AI application example', 'Control direction']}
          rows={[
            ['Spoofing', 'A request is attributed to the wrong user or service identity', 'Verify identity at the API and bind requests to authenticated principals'],
            ['Tampering', 'An imported document or model response changes data used downstream', 'Track provenance; validate content and enforce integrity at each write boundary'],
            ['Repudiation', 'A privileged AI-assisted action has no attributable record', 'Audit actor, authorization result, approval, and action with privacy-aware retention'],
            ['Information disclosure', 'Retrieved context crosses a tenant or role boundary', 'Enforce access before context assembly and re-check sensitive reads'],
            ['Denial of service', 'Repeated prompts or agent loops exhaust model or service capacity', 'Apply quotas, timeouts, budgets, bounded retries, and concurrency controls'],
            ['Elevation of privilege', 'The assistant invokes a tool beyond the user’s permission', 'Use narrow server-side tools and authorize each operation independently'],
          ]}
        />
      </Part>

      <Part n={5} label="Hands-on" title="Represent a Boundary and Its Checks">
        <P>
          The small Python model below describes a hypothetical flow and verifies that sensitive operations have an enforcement
          point. It is plain data you can run as-is, not a threat-scoring engine. Extend it with your own services and have
          reviewers challenge whether the listed controls actually exist in code and deployment.
        </P>
        <Code file="flow_review.py" code={`
from dataclasses import dataclass

@dataclass(frozen=True)
class Flow:
    source: str
    destination: str
    data: str
    trust: str
    enforcement: str

flows = [
    Flow("browser", "application API", "question and session", "untrusted to trusted", "authenticate request"),
    Flow("application API", "retrieval store", "tenant-scoped query", "trusted service to data", "check tenant and document ACL"),
    Flow("application API", "model provider", "minimized prompt context", "trusted to external service", "redact and constrain output"),
    Flow("application API", "credit tool", "customer ID and proposed amount", "assistant proposal to privileged action", "authorize and require approval"),
]

for flow in flows:
    print(f"{flow.source} -> {flow.destination}: {flow.data}")
    print(f"  Trust: {flow.trust}; enforcement: {flow.enforcement}")
    if "privileged" in flow.trust and not flow.enforcement:
        raise ValueError("Privileged flow has no enforcement point")
`} />
        <P>
          A real diagram should distinguish the model’s suggestion from the application’s decision. The model may propose an
          action, but the service should parse a narrow schema, identify the human or service principal, re-authorize the
          operation, and record the result. A control on the diagram is a hypothesis until a test demonstrates it.
        </P>
        <Code file="risk_case.py" code={`
from dataclasses import dataclass

@dataclass(frozen=True)
class Scenario:
    asset: str
    precondition: str
    threat: str
    impact: str
    test: str

case = Scenario(
    asset="Customer order records",
    precondition="A support user can ask the assistant about an order",
    threat="The response includes a record outside the user's allowed scope",
    impact="Private information is disclosed to another customer",
    test="As Tenant A, request a Tenant B fixture and assert no B fields appear in retrieved context",
)

print(case)
`} />
      </Part>

      <Part n={6} label="Prioritization" title="Choose Controls by Impact and Evidence">
        <P>
          A practical review can record likelihood, impact, existing control, and evidence without pretending the numbers are
          precise. Use a consistent qualitative scale if it helps teams discuss priorities, but keep the assumptions visible.
          Prioritize risks that combine sensitive assets, broad access, weak boundaries, and difficult recovery.
        </P>
        <Steps items={[
          'Describe a concrete precondition and undesired outcome; avoid generic labels such as “AI is unsafe.”',
          'Identify the system component that must enforce a control and the team accountable for it.',
          'Specify a positive test and a negative test, including expected behavior when a dependency fails.',
          'Record residual risk and uncertainty, especially for third-party services and probabilistic model behavior.',
          'Revisit findings when permissions, tools, retrieval sources, model providers, or user workflows change.',
        ]} />
        <Callout type="warning">
          A control that depends on the model correctly recognizing every sensitive record is not a reliable boundary. Put
          authorization and resource limits in deterministic services and test the denied path as carefully as the allowed one.
        </Callout>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Drawing only the model provider', cause: 'Important risks often occur in prompt construction, retrieval, tools, logs, and output rendering.', fix: 'Trace one complete user journey through every service and store.' },
          { mistake: 'Treating a vector database as an access-control policy', cause: 'Similarity search ranks content; it does not establish a user’s authorization.', fix: 'Bind retrieval to the authenticated principal and enforce ACLs before adding content to context.' },
          { mistake: 'Using STRIDE as a numeric risk score', cause: 'STRIDE names threat categories; it does not tell you likelihood or business impact.', fix: 'Use it to prompt analysis, then separately document impact, likelihood assumptions, and evidence.' },
          { mistake: 'Listing controls without tests', cause: 'A design statement can drift from implementation or fail under a dependency outage.', fix: 'Attach a named owner and automated or operational evidence to each important control.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Threat-Model a Retrieval Assistant">
        <Practice
          title="From architecture sketch to test plan"
          tasks={[
            'Choose an assistant that searches private account records and public help content; define its users and one privileged action.',
            'Draw a data-flow diagram with at least six components, trust boundaries, and the identity on each service-to-service flow.',
            'Write one threat scenario for each STRIDE category and identify any categories that overlap.',
            'For the two highest-impact scenarios, write a prevention control, a negative test, and an incident signal.',
            'Add a failure case for unavailable identity, retrieval, or model provider services and describe the safe behavior.',
          ]}
          hint="Use fictional tenant data. A strong scenario states precondition, attacker capability, asset, impact, and observable evidence—not just an attack name."
        />
      </Part>

      <KeyTakeaways items={[
        'Threat modelling starts with assets, actors, objectives, and one complete user journey.',
        'Draw the model provider, prompt builder, retrieval, tools, stores, rendering, logs, and service identities as part of the system.',
        'STRIDE is a useful classic mnemonic when adapted to AI data flows; it is not a severity score.',
        'The model can propose content or actions, but application services must enforce identity, authorization, validation, and limits.',
        'Every important risk needs a control owner, a testable outcome, and documented residual uncertainty.',
        'Revisit the threat model after meaningful architecture, permission, provider, or workflow changes.',
      ]} />

      <Bullets items={[
        <span key="stride">Reference: Microsoft’s STRIDE threat-modeling methodology is a classic framework; apply it as an analytical aid, not as an AI-specific standard.</span>,
        <span key="owasp">Reference: OWASP Top 10 for LLM Applications and the current MITRE ATLAS knowledge base can inform scenarios and mitigations.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/ai-security/prompt-injection-jailbreaks"
        label="Lesson 03 · Prompt Injection and Jailbreaks — Direct and Indirect"
        text="You have mapped boundaries and controls. Next, examine direct and indirect prompt injection, why instruction filters are incomplete, and how to reduce the impact."
      />
    </LearnLayout>
  )
}
