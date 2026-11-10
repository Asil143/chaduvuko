import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Table } from '@/components/content/LessonKit'

export default function WhatIsSystemDesign() {
  return (
    <LearnLayout
      title="What Is System Design? Requirements, Constraints and Trade-offs"
      description="Learn to turn a product idea into requirements, measurable constraints and a system architecture whose trade-offs you can explain."
      section="System Design — Lesson 01"
      readTime="30 min"
    >
      <Part n={1} label="Start with the problem" title="System Design Is Making a Product Work Reliably at Scale">
        <P>
          System design is the practice of choosing how software components, data stores and networks fit together to meet a
          product need. It is not a contest to name the most fashionable database or draw the most boxes. A good design makes
          the user-visible behaviour clear, makes important constraints explicit, and explains why the chosen components are
          sufficient for the expected workload.
        </P>
        <P>
          Consider a food-delivery app. A customer browses restaurants, places an order and pays; a restaurant accepts it; a
          delivery partner is assigned and the customer follows progress. Those are product behaviours. They imply distinct
          concerns—search freshness, payment correctness, order state transitions and location updates—but not necessarily a
          separate microservice for each concern. Start by understanding the behaviour before drawing the architecture.
        </P>
        <Callout type="tip">
          In an interview, ask clarifying questions before proposing components. In a real project, confirm the product brief,
          existing system boundaries and operational ownership. The design begins with the same discipline in both settings.
        </Callout>
      </Part>

      <Part n={2} label="Requirements" title="Separate What the System Does from How Well It Does It">
        <P>
          Functional requirements describe actions and outcomes: a learner can enrol in a course; an instructor can publish a
          lesson; a learner can resume progress. Non-functional requirements describe qualities and constraints such as
          latency, availability, durability, privacy, accessibility and cost. Write both as testable statements. “Fast” is not
          a requirement until you say what operation, what percentile and what user experience it protects.
        </P>
        <Table
          head={['Question', 'Example for an order service', 'Design consequence']}
          rows={[
            ['Who uses it?', 'Customers, restaurants, delivery partners, support staff', 'Identify roles and access boundaries'],
            ['What must happen?', 'Create an order and show its current status', 'Define commands, queries and state transitions'],
            ['How much traffic?', 'Normal and peak order creation and status reads', 'Estimate capacity rather than guessing'],
            ['What must never happen?', 'A retry must not charge the same order twice', 'Use idempotency and explicit payment state'],
            ['What can be delayed?', 'A promotional email can arrive after checkout', 'Move non-critical work off the response path'],
          ]}
          caption="A short requirements checklist keeps architecture decisions tied to user outcomes."
        />
        <P>
          Classify requirements as must-have, should-have or out of scope. An interview prompt rarely includes every detail, so
          state assumptions and invite correction. Product requirements can change; recorded assumptions make the design easy
          to revise instead of hiding guesses in the diagram.
        </P>
      </Part>

      <Part n={3} label="Quality attributes" title="Turn Qualities into Observable Targets">
        <P>
          A quality attribute becomes useful when it has a measurement and a boundary. For example, “order status should feel
          responsive” might become a target for read latency at a stated percentile under an agreed peak load. Availability
          should identify the exact user action and observation window; a service can answer health checks while checkout is
          still unusable. Durability should specify which acknowledged writes must survive which failures.
        </P>
        <P>
          Targets are product decisions, not universal constants. Discuss them with product and operations teams, and record
          how they will be measured. A service-level indicator (SLI) is the observed measurement; a service-level objective
          (SLO) is the target for that measurement. An external service-level agreement (SLA), when one exists, is a commitment
          with defined scope and consequences. Do not treat these terms as interchangeable.
        </P>
        <Code lang="python" file="quality_targets.py" code={`
from dataclasses import dataclass

@dataclass(frozen=True)
class Target:
    operation: str
    latency_p95_ms: int
    availability_percent: float


targets = [
    Target("browse_catalog", 350, 99.9),
    Target("place_order", 700, 99.95),
]

for target in targets:
    print(
        f"{target.operation}: p95 <= {target.latency_p95_ms} ms, "
        f"availability >= {target.availability_percent}%"
    )
`} />
        <P>
          This small data structure does not prove a system meets its targets. It demonstrates a useful habit: name the
          operation and its measurement rather than writing “the platform must be highly available.” A later monitoring plan
          must define how requests are counted, which errors count as failures and which time window is used.
        </P>
      </Part>

      <Part n={4} label="Boundaries" title="Choose Responsibilities Before Choosing Servers">
        <P>
          Decompose the problem into responsibilities: identity and permissions, catalog reads, order lifecycle, payment
          coordination, delivery assignment and notifications. Then decide which data each responsibility owns and which
          interactions are synchronous. A box on a diagram is a responsibility, not automatically a separately deployed
          service. A modular application can enforce clear boundaries before operational complexity justifies distribution.
        </P>
        <Code lang="text" code={`
Customer app       API edge        Order application       Order database
     |                 |                    |                       |
     |-- place order ->|-- validate ------->|-- save pending ------->|
     |                 |                    |                       |
     |<-- order ID ----|<-- accepted -------|                       |
     |                 |                    |                       |
     |                 |              Payment provider                
     |                 |                    |-- authorize ---------->|
     |                 |                    |<-- result -------------|
     |                 |                    |-- record outcome ----->|

Notifications are a separate side effect; payment outcome is not inferred
from whether the customer's browser received a response.
`} />
        <P>
          The sketch exposes an important question: what if the payment provider succeeds but the application times out before
          recording the reply? A user retry must not create a second charge. The system needs a durable order/payment state,
          an idempotency strategy and a reconciliation path—not merely another arrow on the diagram.
        </P>
        <Callout type="example">
          For a course platform, recording lesson progress can be the synchronous core action; updating a recommendation
          dashboard can happen asynchronously. Which work blocks the user should follow product semantics, not a blanket rule
          that everything must be synchronous or everything must be queued.
        </Callout>
      </Part>

      <Part n={5} label="Constraints" title="Make the Trade-offs Visible">
        <P>
          Every design trades one quality for another. Replicas can improve read capacity but introduce replication lag.
          Redundant instances can reduce a single-machine failure domain but add deployment and coordination work. Keeping
          more data online can speed access but raise storage and privacy costs. A queue can absorb bursts but makes the
          result eventually visible and introduces retries, duplicate delivery and operational monitoring.
        </P>
        <Table
          head={['Decision', 'Potential benefit', 'Cost or risk to discuss']}
          rows={[
            ['Synchronous call', 'Immediate result and simpler user feedback', 'A slow dependency lengthens the request path'],
            ['Asynchronous task', 'Decouples work and absorbs a burst', 'The user may see pending state; retries need idempotency'],
            ['Read replica', 'More read capacity', 'Reads may be stale; failover must be designed'],
            ['Cache', 'Faster repeated reads and less origin load', 'Staleness, invalidation and memory limits'],
            ['Multiple services', 'Independent ownership or scaling', 'Network failures, deployment and tracing complexity'],
          ]}
        />
        <P>
          Record the context for each choice: workload, target, failure mode and the simpler alternative considered. “We use
          microservices because we expect growth” is not a reasoned decision. “Catalog reads have a distinct scaling profile
          and an independently staffed team owns them” is a testable reason to consider a service boundary.
        </P>
      </Part>

      <Part n={6} label="A first design" title="Use a Repeatable Sequence, Then Refine">
        <P>
          In an interview or design review, keep the conversation collaborative. Confirm scope, list the main use cases, agree
          on quality goals, estimate the workload, sketch the simplest viable components, then examine bottlenecks and failure
          cases. Explain what you would measure after launch. This sequence prevents premature detail and gives the listener
          a chance to correct an assumption before it drives the whole design.
        </P>
        <Code lang="python" file="availability_budget.py" code={`
def annual_error_budget_minutes(availability_percent: float) -> float:
    if not 0 <= availability_percent <= 100:
        raise ValueError("availability must be between 0 and 100")
    unavailable_fraction = 1 - availability_percent / 100
    return 365 * 24 * 60 * unavailable_fraction


for target in (99.0, 99.9, 99.99):
    minutes = annual_error_budget_minutes(target)
    print(f"{target}% target: {minutes:.1f} minutes per 365-day year")
`} />
        <P>
          The calculation is an illustration, not an availability promise: it assumes a 365-day year and says nothing about
          maintenance windows, measurement scope or whether failures are user-visible. Its value is in making the effect of
          an apparently small percentage concrete, so stakeholders can choose a target deliberately.
        </P>
        <Callout type="warning">
          Do not optimize for peak scale before you know the ordinary workload or the product's failure tolerance. Premature
          complexity has a real cost: more components to deploy, secure, observe and recover.
        </Callout>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Design Mistakes">
        <Mistakes items={[
          { mistake: 'Drawing boxes before clarifying the user journey', cause: 'A diagram can look complete while missing the actual product behaviour.', fix: 'List the key commands and queries first, then connect responsibilities to those flows.' },
          { mistake: 'Calling a system “scalable” without a workload', cause: 'Scale differs for reads, writes, data size and traffic bursts.', fix: 'State assumptions and estimate average and peak load in the next lesson.' },
          { mistake: 'Treating availability as a property of one service', cause: 'A dependency can make the complete user action fail even if the front end responds.', fix: 'Define the user-facing SLI across the whole critical path.' },
          { mistake: 'Adding a distributed component without naming its failure modes', cause: 'Network calls and retries create partial failures and duplicate work.', fix: 'For each boundary, decide timeouts, retry policy, ownership and recovery behaviour.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Write a One-Page Design Brief">
        <Practice
          title="Scope a course-enrolment system before drawing its architecture"
          tasks={[
            'Write three functional requirements and identify the user or role for each one.',
            'Choose two quality attributes and define the operation, measurement and target for each.',
            'List your traffic, data-retention and dependency assumptions; mark every unverified assumption.',
            'Sketch a synchronous enrolment flow and one non-critical task that could run asynchronously.',
            'Describe what happens if the payment provider times out after it may have accepted the charge.',
          ]}
          hint="A useful brief fits on one page. Make uncertainty visible; do not hide it behind precise-looking numbers."
        />
      </Part>

      <KeyTakeaways items={[
        'System design turns product behaviour and constraints into components, data ownership and interactions.',
        'Functional requirements say what the system does; quality attributes say how well and under what constraints.',
        'Make targets measurable and scoped to user-visible operations; distinguish SLI, SLO and SLA.',
        'Choose boundaries and synchronous work from product semantics, not from fashion.',
        'Every scaling or reliability choice has costs; state the workload and trade-off that justify it.',
        'A clear sequence—scope, targets, estimates, design, failure modes, operations—keeps reviews focused.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/system-design/back-of-envelope-estimation"
        label="Lesson 02 · Back-of-the-Envelope Estimation"
        text="You have a design brief and explicit constraints. Next, turn rough user and workload assumptions into traffic, storage and bandwidth estimates that help size the first architecture."
      />
    </LearnLayout>
  )
}
