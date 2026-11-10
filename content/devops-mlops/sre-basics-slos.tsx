import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function SreBasicsSlos() {
  return (
    <LearnLayout
      title="SRE Basics — SLIs, SLOs, Error Budgets and Incidents"
      description="Define user-centred service indicators and objectives, use error budgets to balance delivery and reliability, and respond to incidents with blameless learning."
      section="DevOps & Cloud Infrastructure — Lesson 14"
      readTime="35 min"
    >
      <Part n={1} label="Reliability" title="Reliability Is a User Experience">
        <P>
          Site Reliability Engineering (SRE) applies software engineering and operational practices to keeping services useful
          and dependable. It does not mean that every server must be available every second, or that operations owns reliability
          alone. Product, engineering, and operations teams agree what users need, measure how well the service delivers it,
          and improve the system when evidence shows a gap.
        </P>
        <P>
          Imagine a learning platform used across India. A home page that loads while lesson submissions are failing is not
          fully reliable for a learner trying to finish a practice task. Start by naming the important user journey, such as
          opening a lesson or saving an answer. Then define what counts as success, what the acceptable delay is, and how the
          measurement treats retries, invalid requests, and planned maintenance.
        </P>
        <Table
          head={['Term', 'Meaning', 'Example']}
          rows={[
            ['SLI', 'A quantitative measure of a user-facing service property.', 'Share of eligible practice submissions saved successfully.'],
            ['SLO', 'A target for an SLI over an agreed window.', 'The monthly success ratio target for lesson submissions.'],
            ['SLA', 'An external commitment with terms and consequences.', 'A customer contract that defines service credits.'],
            ['Error budget', 'The unreliability allowed by an SLO.', 'The unsuccessful eligible events permitted by the target.'],
          ]}
        />
        <Callout type="info">
          An internal SLO is a team goal, not automatically a customer promise. An SLA has business and contractual meaning;
          review its terms with the right stakeholders before making commitments.
        </Callout>
      </Part>

      <Part n={2} label="Indicators" title="Choose SLIs That Match the Journey">
        <P>
          An SLI needs a numerator, denominator, population, and measurement window. For a request-based availability SLI, the
          numerator might be eligible requests completed successfully and the denominator all eligible requests. Write down
          what counts: a validation error caused by a malformed learner submission may not mean the service failed, while a
          database timeout does. Exclusions must be explicit, consistent, and hard to manipulate.
        </P>
        <P>
          Availability alone misses slow responses. A latency SLI may measure the fraction of eligible requests completed under
          a product-defined threshold. Use request or event counts when possible, not an average of averages. For a service with
          very little traffic, a small sample can swing dramatically; pair real-user measurements with carefully designed
          synthetic checks and label their different meaning.
        </P>
        <Table
          head={['User journey', 'Possible SLI', 'Boundary to define']}
          rows={[
            ['Open a lesson', 'Successful eligible page responses.', 'Exclude expected authorization failures; include server errors.'],
            ['Submit practice', 'Valid submissions persisted and acknowledged.', 'Count only requests that pass input validation.'],
            ['View delivery status', 'Eligible status requests completed within the latency target.', 'Measure at the API boundary, not just the database.'],
          ]}
        />
        <Callout type="tip">
          Keep a short SLI specification beside the dashboard: event source, query, filters, window, owner, and known blind spots.
          A chart without a definition can create false confidence.
        </Callout>
      </Part>

      <Part n={3} label="Objectives" title="Set an SLO and Make Its Error Budget Usable">
        <P>
          An SLO is a target attached to a clear SLI and time window. The target should reflect user expectations, business
          needs, architecture, and observed capability. Do not copy a familiar percentage just because it sounds impressive.
          If a target is too loose, users may suffer; if it is needlessly strict, the team can spend disproportionate effort
          chasing tiny improvements. Review the target with the people who own the service and its product decisions.
        </P>
        <P>
          Suppose a team chooses a target ratio for eligible successful events. Its error budget is the remaining allowed
          unsuccessful share during that window. The budget is a decision aid: when it is being consumed quickly, slow risky
          releases, improve tests or capacity, and focus on user-impacting failure modes. When reliability is healthy, teams can
          make room for planned change. It is not a quota to intentionally spend or a score for blaming individuals.
        </P>
        <Code lang="python" file="error_budget.py" code={`
from dataclasses import dataclass

@dataclass(frozen=True)
class SloWindow:
    eligible_events: int
    failed_events: int
    target_ratio: float

    def error_budget_events(self) -> float:
        if self.eligible_events < 0 or self.failed_events < 0:
            raise ValueError("event counts cannot be negative")
        if self.failed_events > self.eligible_events:
            raise ValueError("failures cannot exceed eligible events")
        if not 0 < self.target_ratio <= 1:
            raise ValueError("target_ratio must be greater than zero and at most one")
        allowed_failure_ratio = 1 - self.target_ratio
        return self.eligible_events * allowed_failure_ratio

    def remaining_events(self) -> float:
        return self.error_budget_events() - self.failed_events

window = SloWindow(eligible_events=100_000, failed_events=35, target_ratio=0.999)
print(f"Allowed failures: {window.error_budget_events():.0f}")
print(f"Remaining: {window.remaining_events():.0f}")
` } />
        <P>
          This small calculation illustrates an event-based budget; it is not a complete SLO platform. A real implementation
          must use the exact SLI population and window, account for missing telemetry, and explain how negative remaining budget
          is reported. The chosen values are only sample inputs, not a recommendation for any product.
        </P>
        <Steps items={[
          'Agree on a user journey and eligible population with product and engineering.',
          'Choose an SLI with a testable query and document exclusions.',
          'Set an objective and window that reflect user need and measured capability.',
          'Review burn rate and remaining budget with release and incident context.',
          'Revisit the objective when architecture, traffic, or user expectations change.',
        ]} />
      </Part>

      <Part n={4} label="Budget policy" title="Use Error Budgets to Guide Delivery, Not Punish Teams">
        <P>
          A budget policy explains what the team does when budget consumption changes. For example, a fast burn may trigger an
          incident response and temporary release guardrails; a slower trend might create an engineering task to investigate a
          dependency or improve a test. State who decides, how exceptions are approved, what work can continue, and what signals
          reopen normal delivery. Publish the policy before the budget becomes an argument during a high-pressure incident.
        </P>
        <P>
          A policy should distinguish user-facing risk from unrelated delivery goals. Security fixes, data recovery, and work
          that reduces risk may still need to proceed when the budget is low. Guardrails should be proportionate, time-bounded,
          and reviewed as new evidence arrives. Never treat a remaining budget as permission to knowingly degrade users.
        </P>
        <Code lang="yaml" file="slo-policy-example.yaml" code={`
service: practice-api
slo:
  sli: eligible_submission_success_ratio
  target: agreed-with-product-team
  window: rolling-window-defined-by-team
policy:
  fast_burn:
    action: page-on-call-and-assess-user-impact
  budget_low:
    action: review-release-risk-and-prioritize-reliability-work
  exception:
    requires: named-owner-and-expiry
    review: record-the-reason-and-follow-up
` } />
        <Callout type="warning">
          This is a policy outline, not deployable alert configuration. The SLI query, window, thresholds, and routing must be
          based on the actual service and agreed operational practice.
        </Callout>
      </Part>

      <Part n={5} label="Incidents" title="Respond in a Calm, Repeatable Sequence">
        <P>
          An incident is a service event that needs coordinated response because of user impact or credible risk. The first
          responder does not need to know the root cause before acting. Confirm the symptom, establish a shared channel, assess
          scope and severity, assign clear roles where the incident warrants them, and choose a safe mitigation. Communicate
          what is known, what is uncertain, and when the next update will arrive.
        </P>
        <P>
          During response, preserve a timeline and distinguish facts from hypotheses. Prefer reversible mitigations such as
          disabling a failing feature or rolling back a known-bad release when the team understands the consequences. Avoid
          changing multiple things at once without a reason: it makes cause and effect harder to see. Escalate when the blast
          radius, data integrity, security, or customer communication exceeds the current responder&apos;s authority.
        </P>
        <Table
          head={['Phase', 'Useful action', 'Example evidence']}
          rows={[
            ['Detect and acknowledge', 'Confirm the alert is actionable and identify an incident lead.', 'Alert link, owner, first timestamp.'],
            ['Assess', 'Determine affected journeys, regions, tenants, and recent changes.', 'Error ratio, traces, release history.'],
            ['Mitigate', 'Choose the smallest safe change that reduces user harm.', 'Rollback result or dependency recovery.'],
            ['Communicate', 'Share verified impact and the next update time.', 'Status update with known scope and uncertainty.'],
            ['Recover', 'Verify behavior and watch for recurrence before closing.', 'SLI trend and user journey checks.'],
          ]}
        />
        <Callout type="example">
          If UPI-linked payment confirmation becomes slow, do not claim that all payments failed based on one dashboard panel.
          Check which stage is unhealthy, avoid duplicate payment attempts, coordinate with the payment owner, and tell support
          what is confirmed and what learners should do next.
        </Callout>
      </Part>

      <Part n={6} label="Learning" title="Turn the Incident Timeline into Better Systems">
        <P>
          A blameless postmortem asks how the system and conditions made an outcome possible, not which person should be blamed.
          Include impact, detection, timeline, contributing factors, what helped, what made response harder, and follow-up actions
          with owners and due dates. Blameless does not mean consequence-free: teams still own actions, protect users, and address
          deliberate unsafe behavior through the appropriate process. The incident record should help future responders act
          faster, not serve as a performance ranking.
        </P>
        <P>
          Prioritize actions that reduce recurrence or impact: improve a guardrail, add a missing test, make an alert actionable,
          simplify a rollback, or document a safe diagnostic. Avoid a list of vague tasks such as &quot;be more careful.&quot; Review
          whether actions were completed and whether the SLI improved. Share the learning with relevant teams without exposing
          secrets or unnecessary personal data in the report.
        </P>
        <Code lang="text" file="incident-notes.txt" code={`
Incident: practice submission latency
Impact: submissions delayed for a subset of learners; scope confirmed from request metrics
Detection: user-impact alert acknowledged by the on-call engineer
Timeline: record timestamps, observations, decisions, and verification
Mitigation: describe the reversible action and its observed effect
Contributing conditions: telemetry, dependency, capacity, and change context
Follow-up: action | owner | due date | evidence of completion
` } />
        <P>
          Keep the report factual and useful. If you do not know the affected count, say that measurement is incomplete and assign
          an owner to improve it; do not infer a precise impact from a partial sample.
        </P>
      </Part>

      <Part n={7} label="Pitfalls" title="Common SLO and Incident Mistakes">
        <Mistakes items={[
          { mistake: 'Choosing an SLI because its metric is easy to collect', cause: 'Infrastructure health is mistaken for the user outcome.', fix: 'Map the indicator to a real journey and validate it with product owners.' },
          { mistake: 'Treating the SLO as a contractual SLA', cause: 'Internal goals and external commitments have different audiences and consequences.', fix: 'Name the commitment clearly and review external terms with appropriate stakeholders.' },
          { mistake: 'Changing the target after a bad week to make the chart green', cause: 'The team optimizes the score instead of learning why users were affected.', fix: 'Document target changes prospectively and retain historical context.' },
          { mistake: 'Writing postmortems around individual fault', cause: 'People hide useful evidence and systemic contributors remain unchanged.', fix: 'Focus on conditions, decisions, safeguards, and owned follow-up actions.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Draft a Reliability Agreement for a Learning Service">
        <Practice
          title="Define, calculate, and rehearse a service objective"
          tasks={[
            'Choose a learner journey such as loading a lesson or saving a practice answer; write the event population and failure criteria.',
            'Define one availability SLI and one latency SLI, including source, exclusions, and how missing measurements are handled.',
            'Select an objective and a time window with a short rationale; mark it as a proposal until service owners agree.',
            'Use the Python example with a small sample dataset and test zero traffic, all successes, and more failures than eligible events.',
            'Draft an error-budget response policy with fast-burn, low-budget, and exception actions plus named decision owners.',
            'Run a tabletop incident: record impact, timeline, mitigation, communication update, and three specific postmortem actions.',
          ]}
          hint="Keep the first version narrow. A well-defined indicator for one important journey is more useful than a dozen vague infrastructure targets."
        />
      </Part>

      <KeyTakeaways items={[
        'Reliability is defined by the user journey and measured with a clearly bounded SLI.',
        'An SLO is a target over a stated window; an SLA is an external commitment with terms.',
        'An error budget makes the trade-off between change and reliability visible, but is not a quota or a blame mechanism.',
        'A budget policy should define proportionate, time-bounded actions and decision ownership before an incident.',
        'Incident response prioritizes confirmed impact, safe mitigation, clear roles, and honest communication.',
        'Blameless postmortems turn timelines and contributing conditions into owned, verifiable improvements.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/devops-mlops/devops-capstone"
        label="Lesson 15 · DevOps Capstone — Containerised App with CI/CD, Terraform and Monitoring"
        text="Put the delivery and reliability practices together in an end-to-end project: build an API image, automate checks, provision infrastructure, deploy safely, and verify service health."
      />
    </LearnLayout>
  )
}
