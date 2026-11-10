import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function SystemDesignInterview() {
  return (
    <LearnLayout
      title="System Design Interview — Framework and Practice Questions"
      description="A repeatable interview framework, how to communicate trade-offs, common mistakes, and practice questions with answer outlines."
      section="System Design — Lesson 15"
      readTime="45 min"
    >
      <Part n={1} label="A repeatable framework" title="Make Your Reasoning Easy to Follow">
        <P>
          System-design interviews test how you turn an ambiguous prompt into a defensible design. Clarify users and goals;
          estimate scale, define API and data, then deep-dive into bottlenecks, failures, and trade-offs.
        </P>
        <Table
          head={['Stage', 'What to produce', 'Useful check']}
          rows={[
            ['Requirements', 'Users, core use cases, scope, and quality goals.', 'Can I state what is deliberately out of scope?'],
            ['Estimates', 'Reads, writes, storage, bandwidth, and peak assumptions.', 'Can I explain which estimate changes my design?'],
            ['API and data', 'Main operations, identifiers, entities, and access patterns.', 'Do the keys and indexes support the reads?'],
            ['High-level design', 'Request path, stores, queues, and trust boundaries.', 'Can I trace one request end to end?'],
            ['Deep dives', 'Consistency, caching, partitioning, failure recovery.', 'What fails first and how does the system recover?'],
          ]}
          caption="Treat the time boxes as a guide. Invite the interviewer to steer depth once the core design is visible."
        />
        <Callout type="tip">
          Narrate decisions as a chain: requirement, constraint, selected mechanism, and cost. &quot;I choose a queue&quot; is a
          component name; &quot;I queue analytics so provider latency cannot delay redirects, accepting slightly stale counts&quot;
          is design reasoning.
        </Callout>
        <P>
          Start with a modular service and a suitable store. Add caches, queues, replicas, or partitions only for stated needs,
          and explain their operational cost.
        </P>
      </Part>

      <Part n={2} label="Questions 1–5 · scope and estimates" title="Clarify the Problem Before You Scale It">
        <H3>1. How do you begin an open-ended design prompt?</H3>
        <P><strong>Model answer:</strong> I restate the goal, identify primary users and journeys, then clarify scale, quality goals, privacy, and scope. I record assumptions and proceed instead of asking questions indefinitely.</P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={['Prioritization and explicit scope instead of premature architecture', 'A willingness to state reasonable assumptions when the interviewer leaves details open.']} />

        <H3>2. Which non-functional requirements do you clarify first?</H3>
        <P><strong>Model answer:</strong> I ask about read and write volume, peak-to-average ratio, latency expectations, availability, durability, and consistency. For user data I clarify access control and retention. I rank the goals because they can conflict: a strict freshness guarantee may increase latency or reduce availability during a partition.</P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={['Connecting quality goals to a concrete design choice', 'Recognizing that no system can maximize every property simultaneously.']} />

        <H3>3. How do you estimate traffic without exact production metrics?</H3>
        <P><strong>Model answer:</strong> I estimate actions from active users and usage, calculate average QPS, then state a peak factor. For storage, I multiply retained records by an assumed row size. I label assumptions and refine only when a decision depends on them.</P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={['Readable arithmetic with assumptions and units', 'Awareness that averages hide peaks, skew, replicas, indexes, and retention.']} />

        <Code file="estimate.py" code={`
SECONDS_PER_DAY = 86_400
active_users = 2_000_000
actions_per_user_per_day = 12
peak_factor = 4

actions_per_day = active_users * actions_per_user_per_day
average_qps = actions_per_day / SECONDS_PER_DAY
estimated_peak_qps = average_qps * peak_factor

print(f"average QPS: {average_qps:.1f}")
print(f"illustrative peak QPS: {estimated_peak_qps:.1f}")
`} />

        <H3>4. How do you decide what to leave out of scope?</H3>
        <P><strong>Model answer:</strong> I identify optional features that do not change the core architecture and defer them explicitly, such as attachments in a text-only chat exercise. I keep constraints that do change the design—like end-to-end encryption or large public groups—visible as open questions and say how the answer would change if they become mandatory.</P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={['A tractable first version without hiding consequential assumptions', 'A clear explanation of which deferred requirements would force redesign.']} />

        <H3>5. What does a good capacity estimate change?</H3>
        <P><strong>Model answer:</strong> It tells me whether a single database is a reasonable start, whether hot reads need a cache, whether writes can use one partition, and how much data retention costs. If the estimate does not affect a decision, I avoid false precision and move to the constraints that do.</P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={['Estimates tied to storage, partitioning, or throughput choices', 'The ability to prioritize relevant math over ornamental calculations.']} />
      </Part>

      <Part n={3} label="Questions 6–10 · interfaces and architecture" title="Connect APIs and Data to the Request Path">
        <H3>6. How would you design a URL shortener's create API?</H3>
        <P><strong>Model answer:</strong> An authenticated client submits a destination and optional expiry with an idempotency key. The server validates the scheme and policy, stores a unique code-to-destination mapping, then returns the canonical short URL. A repeated key with the same payload returns the prior result; a conflicting payload is rejected.</P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={['Validation, ownership, and retry semantics in the contract', 'Durable creation before returning a successful short URL.']} />

        <H3>7. How do you choose a database for a new service?</H3>
        <P><strong>Model answer:</strong> I start from entities, consistency needs, and access patterns. Relational storage is a strong default for transactional relationships and constraints. A key-value store may fit a simple high-volume key lookup. I compare query flexibility, scale, team operations, backups, and migration cost rather than selecting by product popularity.</P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={['Evidence that schema and queries drive the choice', 'Acknowledgement of operational maturity and trade-offs, not just theoretical throughput.']} />

        <H3>8. When would you introduce a cache?</H3>
        <P><strong>Model answer:</strong> I add a cache when repeated reads or latency justify it, after identifying the source of truth, cache key, TTL, and invalidation behavior. Cache-aside is easy to start with. For mutable data I bound staleness and protect against stampedes; I do not make a cache the only copy of critical data.</P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={['Awareness that cache invalidation and stale reads are correctness concerns', 'A cache positioned around an observed bottleneck rather than added reflexively.']} />

        <H3>9. How do you shard a growing database?</H3>
        <P><strong>Model answer:</strong> I choose a key that distributes writes and localizes common queries, such as conversation ID for chat. I check hot keys, cross-shard queries, and rebalancing. Indexes and replicas may suffice before sharding.</P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={['Partition key justified by the access pattern', 'Recognition of skew, resharding, and cross-partition transaction costs.']} />

        <H3>10. What makes a queue-based design reliable?</H3>
        <P><strong>Model answer:</strong> A queue absorbs bursts, but needs bounded retries, idempotent consumers, lag visibility, and poison-message handling. Use an outbox when a database write and publish must agree, and partition if order matters.</P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={['An end-to-end failure story, not just a broker box', 'Safe duplicate processing and a plan for poison messages or growing backlog.']} />
      </Part>

      <Part n={4} label="Questions 11–15 · deep dives" title="Reason About Ordering, Fan-Out, and Coordination">
        <H3>11. How would you guarantee chat message order?</H3>
        <P><strong>Model answer:</strong> I promise order within a conversation, not global order. The server assigns a monotonically increasing sequence per conversation using a transactional counter or ordered partition. Clients sort by that sequence and deduplicate stable message IDs. Very hot conversations may require a special scaling discussion.</P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={['Ordering scope stated precisely', 'Correct handling of retries, duplicate events, and clock skew.']} />

        <H3>12. How would you handle fan-out to many followers or group members?</H3>
        <P><strong>Model answer:</strong> For ordinary audiences, I can enqueue recipient deliveries asynchronously and track progress. For very large audiences, write-time fan-out may be expensive, so I consider a hybrid or read-time fan-out. I preserve a durable source event and make delivery idempotent; the product can tolerate bounded delay.</P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={['Understanding write amplification versus read complexity', 'A design that separates durable content from delivery attempts.']} />

        <H3>13. How do you assign a rider to a delivery?</H3>
        <P><strong>Model answer:</strong> A geo index finds eligible riders; I rank by road ETA, capacity, and workload, then reserve atomically. If no one accepts, expand the search or escalate rather than stall.</P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={['Candidate generation separated from ranking and reservation', 'Handling of no-match, concurrent assignment, and changing availability.']} />

        <H3>14. What would you store for live location tracking?</H3>
        <P><strong>Model answer:</strong> I keep the latest authorized location with an observed-at timestamp in a fast, short-lived store and publish a coalesced update to the active order. Durable order events record assignment and hand-off, not necessarily every GPS point. I restrict visibility and define retention based on product need.</P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={['Freshness and privacy treated as requirements', 'Separation of ephemeral position from durable business history.']} />

        <H3>15. How do you avoid double-processing a payment or order?</H3>
        <P><strong>Model answer:</strong> I store a stable idempotency key with the state transition and deduplicate callbacks by event ID. A timeout is ambiguous, so reconcile the provider reference before charging or refunding again.</P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={['Distinguishing at-least-once delivery from exactly-once business effect', 'A recovery path for ambiguous external outcomes.']} />
      </Part>

      <Part n={5} label="Questions 16–20 · failure and operations" title="Show How the Design Behaves Under Stress">
        <H3>16. How should a service retry failed dependencies?</H3>
        <P><strong>Model answer:</strong> Set deadlines and retry transient failures with bounded backoff and jitter. Retry non-idempotent work only with idempotency protection; circuit breakers and concurrency limits protect a failing dependency.</P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={['Retries bounded by a request deadline and safe operation semantics', 'Awareness that retries can amplify an outage.']} />

        <H3>17. Where would you apply rate limiting?</H3>
        <P><strong>Model answer:</strong> I rate-limit at the edge by authenticated principal, IP where appropriate, and expensive operation. A token bucket allows small bursts while enforcing a sustained rate. Limits should protect shared capacity without unfairly punishing users behind shared networks; provide clear retry guidance.</P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={['A stated key, algorithm, and fairness concern', 'Different treatment for expensive writes and ordinary reads.']} />

        <Code file="token_bucket.py" code={`
class TokenBucket:
    def __init__(self, capacity: float, refill_per_second: float) -> None:
        self.capacity = capacity
        self.tokens = capacity
        self.refill_per_second = refill_per_second
        self.updated_at = 0.0

    def allow(self, now: float, cost: float = 1.0) -> bool:
        elapsed = max(0.0, now - self.updated_at)
        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_per_second)
        self.updated_at = now
        if self.tokens < cost:
            return False
        self.tokens -= cost
        return True

bucket = TokenBucket(capacity=5, refill_per_second=1)
print(bucket.allow(now=1.0))
`} />

        <H3>18. Which system-design metrics matter?</H3>
        <P><strong>Model answer:</strong> I begin with user-visible latency percentiles, error and success rates, saturation, and traffic. Then I add domain indicators: queue age, payment reconciliation backlog, or stale location age. Structured logs and traces carry request or event IDs, but avoid sensitive payloads.</P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={['Metrics tied to user outcomes and specific failure modes', 'Correlation IDs and privacy-aware telemetry.']} />

        <H3>19. How do you design for a region outage?</H3>
        <P><strong>Model answer:</strong> Clarify recovery-point and recovery-time goals, then choose backup restore, warm standby, or active-active. Identify replicated state, failover ownership, split-brain risks, and test the procedure regularly.</P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={['Recovery goals stated before a multi-region topology', 'Awareness that replication is not a tested recovery plan.']} />

        <H3>20. How do security and privacy change a design?</H3>
        <P><strong>Model answer:</strong> I identify assets, actors, and trust boundaries. Authenticate users, authorize every resource access, encrypt network traffic, protect secrets, and minimize stored personal data. I define retention, audit sensitive actions, and threat-model public inputs and service-to-service permissions. Security is part of the request path, not a final component.</P>
        <P><strong>What interviewers look for:</strong></P>
        <Bullets items={['Concrete controls attached to assets and boundaries', 'Data minimization and authorization considered alongside performance.']} />
      </Part>

      <Part n={6} label="Communicate trade-offs" title="Be Decisive, Then Explain the Cost">
        <P>
          Choose a reasonable design, state its supporting assumption, and compare one alternative. A relational store may
          simplify transactional orders; a key-value store may scale direct lookups but shifts query and consistency work.
        </P>
        <Code file="consumer_dedup.py" code={`
class EventConsumer:
    def __init__(self) -> None:
        self.processed: set[str] = set()
        self.count = 0

    def handle(self, event_id: str) -> bool:
        if event_id in self.processed:
            return False
        self.processed.add(event_id)
        self.count += 1
        return True

consumer = EventConsumer()
print(consumer.handle("evt-42"), consumer.handle("evt-42"))
`} />
        <P>
          Production consumers persist the idempotency marker and business update atomically. State this boundary rather than
          claiming exactly-once processing because of a queue setting.
        </P>
        <Callout type="example">
          For example: &quot;I use an outbox so a committed order cannot lose its event; consumers must handle duplicates.&quot; State both benefit and cost.
        </Callout>
        <P>Draw the smallest complete path, trace a retry and failure, then close with the main trade-off, operating metric, and next scaling step.</P>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Interview Mistakes">
        <Mistakes items={[
          { mistake: 'Starting with a list of services', cause: 'The architecture is disconnected from a user need and can change as requirements become clear.', fix: 'Clarify scope and constraints first, then draw only components required by the request path.' },
          { mistake: 'Presenting assumptions as facts', cause: 'Unstated numbers make estimates sound precise while hiding uncertainty.', fix: 'Label assumptions, show the calculation, and identify which unknown would change the design.' },
          { mistake: 'Designing only the happy path', cause: 'Timeouts, retries, duplicates, and stale data are where distributed systems fail.', fix: 'Trace at least one failure and its recovery for every critical dependency.' },
          { mistake: 'Overengineering before a bottleneck exists', cause: 'Sharding and many services increase complexity without demonstrating a need.', fix: 'Start with the simplest adequate design and name the signal that would justify the next step.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Run a 35-Minute Mock Interview">
        <Practice
          title="Design a notification service for an Indian learning platform"
          tasks={[
            'Clarify notification types, user preferences, urgency, delivery channels, and what must be persisted.',
            'Estimate daily notifications, burst rate around course announcements, and retained delivery records using explicit assumptions.',
            'Define APIs and data keys for enqueue, preference lookup, delivery attempt, and user-visible history.',
            'Draw a text architecture from producer through queue and workers to email, push, or in-app delivery.',
            'Explain retries, deduplication, quiet hours, provider outage recovery, and the metric that signals an unhealthy backlog.',
          ]}
          hint="Persist notifications, deliver asynchronously, and make retries idempotent."
        />
        <KeyTakeaways items={[
          'Use a consistent progression: requirements, estimates, API and data, high-level design, deep dives, bottlenecks, and trade-offs.',
          'State assumptions and connect calculations to a concrete decision.',
          'Design for duplicate requests, timeouts, partial failure, and recovery—not only the happy path.',
          'Choose the smallest architecture that meets stated goals and explain when you would evolve it.',
          'Make consistency, privacy, reliability, and operations part of the design conversation.',
          'Communicate one decision at a time: requirement, mechanism, benefit, and cost.',
        ]} />
      </Part>

      <H3>Next</H3>
      <NextLesson
        href="/learn/operating-systems"
        label="Next course · Operating Systems"
        text="Continue with Operating Systems to learn how processes, concurrency, memory, and storage underpin the services you design."
      />
    </LearnLayout>
  )
}
