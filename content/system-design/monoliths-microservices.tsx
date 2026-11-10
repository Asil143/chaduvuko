import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function MonolithsMicroservices() {
  return (
    <LearnLayout
      title="Monoliths, Microservices and Service Boundaries"
      description="When a modular monolith wins, how to split services by domain, and the data, deployment and observability costs of microservices."
      section="System Design — Lesson 10"
      readTime="35 min"
    >
      <Part n={1} label="Architecture is about trade-offs" title="A Deployment Shape Should Serve the Team and Product">
        <P>
          A monolith packages an application as one deployable unit. A modular monolith keeps domain areas separated inside
          that unit with explicit interfaces. Microservices split capabilities into separately deployable services that
          communicate over a network. None is automatically more modern or scalable; each changes the cost of development,
          operations, and coordination.
        </P>
        <P>
          A small team building an early learning platform may move faster with one application and one transactional database.
          Clear modules can preserve boundaries without requiring network calls. Separate services become useful when a domain
          needs independent scaling, ownership, release cadence, or isolation enough to justify the extra system complexity.
        </P>
        <Table
          head={['Dimension', 'Modular monolith', 'Microservices']}
          rows={[
            ['Deployment', 'One coordinated application release', 'Services can deploy independently, with compatibility work'],
            ['Calls', 'In-process calls and local transactions', 'Network calls with timeouts, retries, and partial failure'],
            ['Data', 'One database can enforce cross-module transactions', 'Each service should own its data; cross-service workflows need coordination'],
            ['Scaling', 'Scale the application unit', 'Scale selected services independently'],
            ['Operations', 'Fewer runtime components to observe', 'More deployables, network paths, and on-call responsibility'],
          ]}
        />
        <Callout type="info">
          Microservices trade local simplicity for independent change and scaling. They do not remove coupling; they move it into
          APIs, data ownership, event contracts, and operations.
        </Callout>
      </Part>

      <Part n={2} label="Find domain boundaries" title="Split by Business Capability, Not by Technical Layer">
        <P>
          A service boundary should group behavior and data that change together. In a food-delivery platform, orders, payments,
          restaurants, and delivery coordination are possible capabilities. Splitting into generic user-service, controller-
          service, and database-service layers does not create useful ownership; every feature still crosses all of them.
        </P>
        <P>
          Look for a cohesive domain vocabulary, invariants owned by one team, and a data lifecycle that can be managed
          independently. Also look for evidence of a bottleneck: frequent conflicting edits, different scaling needs, or
          releases blocked by unrelated changes. A diagram alone cannot prove that a boundary is correct; validate it against
          actual change patterns and incidents.
        </P>
        <Code lang="text" code={`
Modular monolith (one deployment):

  Web/API
    |-- Catalog module ---- catalog tables
    |-- Orders module ----- order tables
    |-- Payments module --- payment records
    |-- Delivery module --- assignment state

Modules call public interfaces; a module does not write another module's tables.
`} />
        <Callout type="tip">
          A useful boundary makes ownership clear: one module is responsible for a rule and its data. Start with explicit
          interfaces and dependency rules before extracting that module into another process.
        </Callout>
      </Part>

      <Part n={3} label="Data ownership" title="A Service Should Own Its Writes">
        <P>
          When every service writes the same database tables, schema changes become coordinated deployments and the apparent
          service boundary is weak. Data ownership means one service is authoritative for writes to its data. Other services
          consume an API, event, or read projection rather than editing those tables directly.
        </P>
        <P>
          This makes cross-service workflows more involved. A checkout might reserve inventory, authorize a payment, and create
          an order; a single database transaction no longer spans all steps. Model the workflow as a saga or explicit state
          machine: each step records progress, and compensating actions or reconciliation handle failures. Compensation is a
          business action, not a perfect rollback of history.
        </P>
        <Code lang="text" code={`
Checkout workflow:
  Order: PENDING
    -> Inventory: RESERVED
    -> Payment: AUTHORIZED
    -> Order: CONFIRMED

If payment fails:
  Order: PAYMENT_FAILED
  -> Inventory: RELEASE_REQUESTED

Each step is durable, observable, idempotent, and recoverable.
`} />
        <P>
          Eventual consistency may be acceptable for projections such as analytics and search. For critical invariants, expose
          an explicit pending state, use a single authoritative owner, or design a coordination protocol appropriate to the
          business risk. Do not hide partial completion behind an HTTP 200 response.
        </P>
      </Part>

      <Part n={4} label="Communication" title="Every Network Call Can Fail Halfway">
        <P>
          Synchronous HTTP or RPC is useful when a response is required immediately, but it creates runtime coupling: the caller
          needs the callee to be reachable and fast. Events decouple timing and allow multiple consumers, but add eventual
          consistency, schema evolution, duplicates, and replay concerns. Many systems use both, with an explicit reason for
          each path.
        </P>
        <Table
          head={['Choose synchronous calls when…', 'Choose asynchronous events when…']}
          rows={[
            ['The caller needs a decision to continue now', 'The work can finish after the response'],
            ['The interaction is a query or short command', 'Several consumers need to react independently'],
            ['The user can receive an immediate outcome', 'The system can expose a pending or accepted state'],
            ['A bounded dependency chain fits the latency budget', 'Burst absorption, replay, or isolation is valuable'],
          ]}
        />
        <P>
          Set deadlines and retries at the boundary, propagate correlation IDs, version contracts, and record the owner of every
          field. Avoid long synchronous chains where a user action depends on many services in sequence; one slow dependency can
          dominate latency and availability.
        </P>
        <Callout type="example">
          A course enrollment can commit immediately in the core application while a queue asynchronously sends a welcome email
          and updates an analytics projection. The email failure should not roll back an already confirmed enrollment.
        </Callout>
      </Part>

      <Part n={5} label="Extract gradually" title="Use the Strangler Approach, Not a Big-Bang Rewrite">
        <P>
          If a monolith has a justified extraction candidate, first make its internal boundary explicit. Identify its data owner,
          callers, invariants, and observability. Then route one capability through a stable interface and move a narrow slice
          while preserving the old behavior. Keep the migration reversible until correctness and operational readiness are
          demonstrated.
        </P>
        <Steps items={[
          'Choose a capability with a clear owner and a measurable reason to separate it.',
          'Add an internal interface and tests around current behavior before moving code.',
          'Define the new service contract, data ownership, timeout policy, and failure response.',
          'Move one workflow slice; use an outbox or controlled event migration if data changes span systems.',
          'Compare outputs and monitor latency, errors, and business outcomes before shifting more traffic.',
          'Remove obsolete paths only after rollback, reconciliation, and data-retention requirements are satisfied.',
        ]} />
        <P>
          Avoid uncoordinated dual writes to old and new stores. If both must run during a transition, specify which is authoritative,
          how differences are detected, how writes are replayed, and when the dual path ends. A migration without a rollback or
          reconciliation plan is a risky release, not an architecture strategy.
        </P>
      </Part>

      <Part n={6} label="Team and operations" title="Independent Services Require Independent Ownership">
        <P>
          A microservice is not independent if its team cannot deploy it, observe it, and respond to its failures. Establish
          service-level objectives, dashboards, traces, alert ownership, safe deployment practices, dependency inventories, and
          on-call expectations. Provide a standard platform so each team does not reinvent authentication, logging, secrets,
          and deployment workflows.
        </P>
        <P>
          A service count is not a success metric. Evaluate lead time, deployment safety, incident impact, and team cognitive
          load. If a service has no independent scaling, ownership, or release benefit, it may be better as a module. Shared
          libraries also need care: a breaking change in a common package can recreate lockstep deployments across services.
        </P>
        <Callout type="warning">
          Do not split a system into services before there is a team capable of operating the resulting network, data, and
          deployment boundaries. Operational complexity is a product cost paid by engineers and ultimately by learners.
        </Callout>
      </Part>

      <Part n={7} label="Common mistakes" title="Avoid Distributed Complexity Without a Clear Payoff">
        <Mistakes items={[
          { mistake: 'Choosing microservices because the product is expected to grow', cause: 'Potential future scale does not prove current independent scaling or ownership needs.', fix: 'Keep modules clean and extract only when a specific change, isolation, or scale need justifies it.' },
          { mistake: 'Splitting by technical layer instead of capability', cause: 'Every feature still crosses the same services, creating chatty coupling.', fix: 'Group behavior and invariants around domain ownership and team responsibilities.' },
          { mistake: 'Letting multiple services write the same tables', cause: 'Schema and consistency ownership become hidden and deployments remain coupled.', fix: 'Assign one authoritative writer and provide APIs, events, or projections to other consumers.' },
          { mistake: 'Assuming a saga is a distributed database rollback', cause: 'Real-world actions may not be reversible and partial progress is observable.', fix: 'Model explicit states, idempotent steps, compensations, and reconciliation as business behavior.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Choose Boundaries for a Learning Platform">
        <Practice
          title="Start modular, then justify each extraction"
          tasks={[
            'Sketch a modular monolith for courses, enrollments, billing, and notifications; name the owner of each domain rule and table.',
            'Identify one capability that might need independent scaling or deployment, and state the evidence you would collect first.',
            'Design a course-enrollment workflow where email and analytics are asynchronous but enrollment correctness is immediate.',
            'Describe what changes when billing becomes a separate service, including ownership, network failures, reconciliation, and observability.',
            'Write a gradual extraction and rollback plan that avoids ambiguous dual writes and can compare old and new behavior.',
          ]}
          hint="For every proposed service, name the concrete benefit and the new operational costs. If there is no measurable benefit, keep it a module."
        />
      </Part>

      <KeyTakeaways items={[
        'A monolith is a deployment shape; a modular monolith can preserve strong boundaries without network complexity.',
        'Split by cohesive business capability and data ownership, not by technical layers or an assumed future scale.',
        'Microservices add independent deployment and scaling options but also partial failures, distributed data, and operational load.',
        'Use synchronous calls for decisions needed now and asynchronous events for work that can finish later or fan out.',
        'Model cross-service workflows as explicit state machines or sagas with idempotency and reconciliation.',
        'Extract gradually from a measured need, with observability, rollback, and data-migration plans.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/system-design/low-level-design"
        label="Lesson 11 · Low-Level Design — Classes, SOLID and Design Patterns"
        text="You have chosen deployment and domain boundaries. Next, move inside a component and model its classes, responsibilities, and interfaces clearly."
      />
    </LearnLayout>
  )
}
