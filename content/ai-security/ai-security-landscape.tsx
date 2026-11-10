import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function AiSecurityLandscape() {
  return (
    <LearnLayout
      title="The AI Security Landscape — OWASP Top 10 for LLM Applications"
      description="Why AI systems create new attack surfaces, the OWASP Top 10 for LLM applications, and MITRE ATLAS as a map of real attacks."
      section="AI Security & LLM Security — Lesson 01"
      readTime="35 min"
    >
      <Part n={1} label="The big picture" title="AI Adds New Trust Boundaries; It Does Not Replace Old Security Work">
        <P>
          An LLM feature is a software system that accepts data, calls a model, and often returns an answer or triggers another
          operation. The model introduces a new kind of uncertainty: it produces probabilistic text from both trusted
          instructions and untrusted context. That does not make every model call a vulnerability, but it does mean a prompt
          cannot serve as an access-control boundary.
        </P>
        <P>
          Think of a campus help desk that answers questions from public policy pages and private student records. The feature
          has ordinary web risks (authentication bugs, exposed credentials, unsafe output) plus AI-specific risks such as
          instruction conflict, retrieval leakage, and an agent taking an action it should not take. Security belongs in the
          surrounding application: identity checks, data permissions, narrow tools, validation, monitoring, and tested failure
          paths.
        </P>
        <Callout type="info">
          An instruction such as &quot;never reveal a private record&quot; is useful behavior guidance, not an authorization
          mechanism. The database and application must enforce who can read each record.
        </Callout>
      </Part>

      <Part n={2} label="Risk taxonomy" title="Read the OWASP Top 10 as a Starting Map">
        <P>
          The OWASP Top 10 for Large Language Model Applications (2025 edition) groups recurring security concerns into ten
          categories. It is an awareness and risk-identification resource, not a severity ranking for your particular product
          and not a checklist that proves a system is secure. Use the names consistently, then connect each concern to your own
          data flows, permissions, and consequences.
        </P>
        <Table
          head={['2025 category', 'What to ask in your design review']}
          rows={[
            ['LLM01 Prompt Injection', 'Can user or retrieved content influence behavior beyond the intended task?'],
            ['LLM02 Sensitive Information Disclosure', 'Could the model or application expose information a user is not allowed to see?'],
            ['LLM03 Supply Chain', 'Can dependencies, models, datasets, or hosted services change or be tampered with?'],
            ['LLM04 Data and Model Poisoning', 'Could manipulated training, fine-tuning, or retrieval data change system behavior?'],
            ['LLM05 Improper Output Handling', 'Is generated content safely validated before rendering or passing to another system?'],
            ['LLM06 Excessive Agency', 'Does the application grant more tools, permissions, or autonomy than the task needs?'],
            ['LLM07 System Prompt Leakage', 'Could internal instructions or sensitive prompt contents be exposed?'],
            ['LLM08 Vector and Embedding Weaknesses', 'Can vector creation, storage, or retrieval cause manipulation or data exposure?'],
            ['LLM09 Misinformation', 'Could users rely on plausible but inaccurate output without suitable checks?'],
            ['LLM10 Unbounded Consumption', 'Can requests or loops consume excessive model, compute, or service resources?'],
          ]}
        />
        <Callout type="tip">
          Prioritise by product context. A study assistant may focus on student-record confidentiality and misinformation; an
          internal coding agent may place greater emphasis on tool permissions, output handling, and supply-chain controls.
        </Callout>
      </Part>

      <Part n={3} label="Attack surface" title="Draw the Whole Request Path">
        <P>
          Start from a user action and follow every boundary: browser, application server, identity provider, prompt builder,
          model provider, retrieval index, databases, tools, logs, and human reviewer. Include data that arrives indirectly—an
          uploaded PDF, a support ticket, a web page fetched by a tool, or a code repository—not just the prompt box. A source
          can be legitimate business data and still be untrusted as an instruction.
        </P>
        <Steps items={[
          'List assets: credentials, personal data, tenant records, model configuration, indexes, and actions that affect users or money.',
          'Name actors and entry points: signed-in users, administrators, external content, scheduled jobs, and service identities.',
          'Mark trust boundaries and data flows, including provider calls, logs, queues, and agent tool results.',
          'For each flow, ask what could go wrong, what impact follows, and which control is enforced outside the model.',
          'Record an owner and a test for each important risk; revisit the model when a tool, data source, or permission changes.',
        ]} />
        <P>
          For an Indian delivery-support assistant, order status and phone numbers are sensitive assets; an order lookup is a
          privileged action; the support transcript and a retrieved FAQ have different trust levels. These distinctions guide
          what can enter the prompt and what the assistant may do.
        </P>
      </Part>

      <Part n={4} label="MITRE ATLAS" title="Use ATLAS to Learn Adversary Behavior">
        <P>
          MITRE ATLAS (Adversarial Threat Landscape for Artificial-Intelligence Systems) is a living knowledge base of
          adversary tactics and techniques involving AI-enabled systems. It helps security teams discuss observed or plausible
          adversary behavior and connect threat scenarios to mitigations. The knowledge base evolves, so consult its current
          matrix and technique pages rather than copying an old technique count or assuming an entry applies to every model.
        </P>
        <P>
          OWASP and ATLAS serve different but complementary purposes. OWASP’s 2025 list is a compact set of application risk
          categories for awareness and design conversations. ATLAS organizes adversary tactics, techniques, and case studies
          in a matrix. Neither is a certification, and neither replaces your asset inventory, architecture review, or
          application-specific tests.
        </P>
        <Table
          head={['Resource', 'Use it for', 'Do not use it as']}
          rows={[
            ['OWASP Top 10 for LLM Applications', 'Shared vocabulary for common LLM application risk areas', 'A complete threat model or a guarantee of security'],
            ['MITRE ATLAS', 'Exploring adversary tactics and techniques and identifying relevant mitigations', 'A prediction that every technique will affect your system'],
            ['Your threat model', 'Prioritising risks for your architecture, users, data, and impact', 'A one-time document that never changes'],
          ]}
        />
      </Part>

      <Part n={5} label="Hands-on" title="Build a Small Risk Register">
        <P>
          A useful first artifact is a short register that connects a scenario to an asset, impact, control owner, and evidence.
          The following Python example is self-contained and deliberately uses fictional records. It helps structure a review;
          it does not calculate risk automatically or substitute for security judgement.
        </P>
        <Code file="risk_register.py" code={`
from dataclasses import dataclass

@dataclass(frozen=True)
class Risk:
    scenario: str
    asset: str
    impact: str
    control: str
    evidence: str

risks = [
    Risk(
        scenario="A user receives another tenant's retrieved support note",
        asset="Customer support records",
        impact="Privacy breach and loss of trust",
        control="Filter retrieval by authenticated tenant before context assembly",
        evidence="Automated cross-tenant access tests",
    ),
    Risk(
        scenario="A generated summary is rendered as executable markup",
        asset="Support agent browser session",
        impact="Unsafe browser behavior",
        control="Render as text or use a maintained output sanitizer",
        evidence="Output-encoding tests in the web application",
    ),
]

for risk in risks:
    print(f"Scenario: {risk.scenario}")
    print(f"  Asset: {risk.asset}; impact: {risk.impact}")
    print(f"  Control: {risk.control}")
    print(f"  Evidence: {risk.evidence}")
`} />
        <P>
          A register is only as good as its evidence. Replace vague entries such as &quot;the prompt says not to&quot; with a
          control enforced at the database, API, identity, sandbox, or human approval boundary and an observable test result.
        </P>
        <Callout type="example">
          A benign test can verify that a user assigned to Tenant A gets no Tenant B documents. The expected result is an empty
          or appropriately filtered retrieval—not a carefully crafted prompt that hopes the model hides the document.
        </Callout>
      </Part>

      <Part n={6} label="Production" title="Turn Categories into Controls and Tests">
        <P>
          For each risk, separate prevention, detection, and recovery. Prevention might mean a database predicate bound to the
          authenticated identity. Detection might mean an audit event for a denied tool call. Recovery might mean revoking a
          credential, disabling a tool integration, or notifying affected users under your incident process. Measure controls
          at the layer that owns them rather than scoring the model’s promise to comply.
        </P>
        <Steps items={[
          'Map each feature to the OWASP categories that matter; document why a category is or is not relevant.',
          'Use ATLAS to enrich scenarios with adversary behavior and mitigation ideas, then adapt them to your architecture.',
          'Write acceptance tests for authorization, unsafe output, resource limits, and tool boundaries.',
          'Keep harmless regression examples for prompt and retrieval behavior; avoid placing real secrets in tests or logs.',
          'Assign review ownership and repeat the exercise after material changes to models, tools, data, or providers.',
        ]} />
        <P>
          Treat model output as untrusted input even when it is fluent. Encode it for its destination, validate structured
          fields against a schema, enforce access in the service layer, and cap time, tokens, retries, and tool calls. These
          controls address different failure modes; no single filter covers them all.
        </P>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Treating the OWASP list as a ranked checklist', cause: 'A general taxonomy cannot know your product assets or impact.', fix: 'Build a system-specific threat model and prioritize by realistic impact and exposure.' },
          { mistake: 'Treating prompt wording as an authorization control', cause: 'Model instructions are not enforced access checks and may be overridden or misunderstood.', fix: 'Authorize every read and action in deterministic application code.' },
          { mistake: 'Assuming ATLAS predicts a specific attack', cause: 'A knowledge base describes behaviors and mitigations, not certainty about your deployment.', fix: 'Use relevant entries to create testable scenarios and record your assumptions.' },
          { mistake: 'Reviewing only the model call', cause: 'Data import, retrieval, browser rendering, logs, and downstream tools are also part of the system.', fix: 'Trace end-to-end flows and include every trust boundary in the review.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Map a Student Support Assistant">
        <Practice
          title="Create a first-pass AI security map"
          tasks={[
            'Draw a data-flow diagram for a student assistant that answers from public FAQs and private account records.',
            'List at least five assets and identify which user or service identity may access each one.',
            'Select relevant OWASP Top 10 for LLM Applications (2025) categories and explain the architecture-specific reason for each.',
            'Find one relevant current MITRE ATLAS scenario or mitigation, and record its official page title and why it applies.',
            'Write four risk-register entries with a concrete control owner and a testable piece of evidence.',
          ]}
          hint="Start with trust boundaries: browser to application, application to identity/database, application to model provider, and retrieved content to prompt. Keep test data fictional."
        />
      </Part>

      <KeyTakeaways items={[
        'LLM applications inherit ordinary software risks and add uncertainty around instructions, generated output, and connected tools.',
        'The OWASP Top 10 for LLM Applications 2025 provides ten shared risk categories, not a product-specific ranking or security guarantee.',
        'MITRE ATLAS is a living knowledge base for adversary tactics and techniques involving AI systems; use its current entries as scenario input.',
        'A prompt is not an access-control boundary; enforce permissions in the application, data store, and tool APIs.',
        'Threat models should trace assets, identities, trust boundaries, data flows, controls, and test evidence end to end.',
        'Revisit the model when the system changes and assign owners to prevention, detection, and recovery controls.',
      ]} />

      <Bullets items={[
        <span key="owasp">Official references: <a href="https://genai.owasp.org/llm-top-10/">OWASP Top 10 for LLM Applications</a> (consult the 2025 edition and current project pages).</span>,
        <span key="atlas">Official reference: <a href="https://atlas.mitre.org/">MITRE ATLAS</a>, a living knowledge base; review the current matrix, technique pages, and mitigations.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/ai-security/threat-modelling-ai-systems"
        label="Lesson 02 · Threat Modelling AI Systems"
        text="You have a vocabulary for AI security risks. Next, map assets, trust boundaries, and data flows, then turn likely threats into controls and tests."
      />
    </LearnLayout>
  )
}
