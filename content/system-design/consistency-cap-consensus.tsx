import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function ConsistencyCapConsensus() {
  return (
    <LearnLayout
      title="Consistency, CAP and Consensus"
      description="Strong and eventual consistency, CAP and PACELC, quorums, leader election and what Raft solves."
      section="System Design — Lesson 08"
      readTime="40 min"
    >
      <Part n={1} label="Consistency is a contract" title="Ask What a Read Is Allowed to Return">
        <P>
          In a distributed system, a write may be copied to multiple nodes. A read can reach a node that has not yet received
          the latest write. Consistency describes the guarantees clients receive about the order and visibility of operations;
          it is not a vague synonym for correctness. State the guarantee for each workflow.
        </P>
        <P>
          A bank-like balance display after a transfer may need to reflect the completed transfer immediately. A product
          recommendation count can often be briefly stale. A user profile update may require read-your-writes for that user while
          other readers catch up. The correct choice depends on the invariant and the user experience.
        </P>
        <Table
          head={['Guarantee', 'Intuition', 'Example use']}
          rows={[
            ['Linearizability', 'Each operation appears to take effect at one instant in real-time order', 'A critical reservation or balance decision'],
            ['Sequential consistency', 'All clients see one shared order that respects each client’s program order', 'Shared state where real-time ordering is not required'],
            ['Eventual consistency', 'Replicas converge if updates stop and communication recovers', 'A follower count or search index projection'],
            ['Read-your-writes', 'A client sees its own successful writes on later reads', 'A profile immediately after saving it'],
          ]}
        />
        <Callout type="info">
          A consistency guarantee is an externally visible contract. Calling a system &quot;eventually consistent&quot; does not
          explain how long lag lasts, what users see during lag, or which operations remain safe.
        </Callout>
      </Part>

      <Part n={2} label="Replication timing" title="Strong and Eventual Consistency Are Trade-offs">
        <P>
          Synchronous replication waits for enough nodes to confirm an update before acknowledging it. This can provide stronger
          visibility or durability, but increases latency and may reject writes when required nodes are unreachable. Asynchronous
          replication acknowledges before all copies catch up, improving write responsiveness while allowing stale reads and
          recovery choices after a primary failure.
        </P>
        <Code lang="text" code={`
Asynchronous path:
Client -> Leader: write value v2
Client <- Leader: acknowledged
Leader ------ v2 ------> Replica A (applied)
Leader ------ v2 - delayed -> Replica B (still v1)

A read from B can return v1 until the update arrives.
`} />
        <P>
          Stronger consistency can be scoped: read from the leader for a critical operation, use a session token to ensure a
          replica has caught up, and allow stale reads for noncritical views. If the application has no clear staleness policy,
          it tends to rediscover one through production incidents.
        </P>
        <Callout type="example">
          For a UPI-like payment state, do not infer payment success from a stale replica or a browser redirect. Use an
          authoritative payment state transition and reconcile asynchronous provider callbacks against that source of truth.
        </Callout>
      </Part>

      <Part n={3} label="CAP and PACELC" title="CAP Is About a Network Partition">
        <P>
          CAP describes a trade-off when a distributed data system is partitioned: nodes cannot communicate reliably. A system
          cannot guarantee both a single consistent view for all operations and a successful response from every side of the
          partition. A consistency-oriented design may reject or delay some operations; an availability-oriented design may
          accept operations that later need conflict resolution.
        </P>
        <P>
          CAP does not mean you permanently pick only two of consistency, availability, and partition tolerance. Real systems
          must tolerate network partitions; the design question is what they do while one occurs. Outside a partition, there
          are still latency-versus-consistency decisions. PACELC summarizes this as: if there is a partition, trade availability
          against consistency; else, trade latency against consistency.
        </P>
        <Table
          head={['Situation', 'Consistency-oriented behavior', 'Availability-oriented behavior']}
          rows={[
            ['Network partition', 'Reject writes that cannot be safely coordinated', 'Accept some writes and reconcile conflicts later'],
            ['Normal operation', 'Wait for coordination or quorum before responding', 'Respond from a nearby copy with a weaker freshness guarantee'],
            ['Recovery', 'Resume when a safe leader or quorum is available', 'Merge or resolve divergent updates under defined rules'],
          ]}
        />
        <Callout type="warning">
          CAP is not a label to apply to an entire product casually. A database may offer different consistency modes, and an
          application can use different policies for separate operations.
        </Callout>
      </Part>

      <Part n={4} label="Quorums" title="A Quorum Is a Voting Rule, Not Magic">
        <P>
          Suppose a replicated value has N voting replicas. A read quorum R and write quorum W overlap when R + W is greater
          than N. That overlap can help a read encounter a replica that received a write, assuming the protocol, versioning,
          membership, and failure model support the guarantee. The arithmetic alone does not make an arbitrary distributed store
          linearizable; a correct protocol must also order concurrent writes and handle membership changes.
        </P>
        <Code file="quorum_check.py" code={`
def quorum_overlap(replica_count: int, read_quorum: int, write_quorum: int) -> bool:
    if not (1 <= read_quorum <= replica_count):
        raise ValueError("read quorum must be between 1 and replica count")
    if not (1 <= write_quorum <= replica_count):
        raise ValueError("write quorum must be between 1 and replica count")
    return read_quorum + write_quorum > replica_count


replicas = 5
for reads, writes in [(3, 3), (2, 2), (1, 5)]:
    print(reads, writes, quorum_overlap(replicas, reads, writes))
`} />
        <P>
          Quorum size changes availability and latency. Requiring more acknowledgements can improve fault tolerance or freshness
          under specific protocols, but a slow or unreachable replica can delay a response. Real systems may use leader leases,
          version vectors, epochs, or other mechanisms; read the actual product consistency model rather than importing a simple
          majority formula.
        </P>
      </Part>

      <Part n={5} label="Consensus" title="Consensus Keeps Replicas in Agreement on a Decision">
        <P>
          Consensus lets a group of nodes agree on a value or ordered log despite some node failures, under a stated failure
          model. A replicated state machine applies the same committed log entries in the same order on multiple nodes. Systems
          commonly use a leader to simplify ordering: the leader proposes entries, a quorum acknowledges them, and nodes apply
          committed entries in order.
        </P>
        <Code lang="text" code={`
Client -> Leader: append entry 42
Leader -> Followers: replicate entry 42
Followers -> Leader: acknowledge
Leader: quorum reached; entry 42 is committed
Leader -> Client: success
Followers: apply committed entries in order

If the leader fails, eligible nodes elect a new leader before new writes proceed.
`} />
        <P>
          Raft is a consensus algorithm designed to make leader election, log replication, and safety easier to reason about.
          Terms distinguish leadership epochs; a candidate needs votes from a majority; log rules prevent an elected leader
          from discarding committed entries. Consensus does not make the entire application reliable automatically: clients,
          disks, networks, configuration changes, and dependent services still fail.
        </P>
        <Steps items={[
          'Identify the failure model and which nodes can vote.',
          'Elect one leader for a term and reject stale leadership using terms or epochs.',
          'Replicate entries and mark them committed only under the protocol’s quorum rule.',
          'Apply committed entries deterministically and recover from durable logs or snapshots.',
          'Change cluster membership through the protocol, not by editing node lists casually.',
        ]} />
      </Part>

      <Part n={6} label="Choose a product contract" title="Expose Consistency to Application Code">
        <P>
          A storage API should make important guarantees visible. Is a write acknowledged after local persistence, a replica
          quorum, or a consensus commit? Can reads be stale? Can a client request read-your-writes? What happens on a timeout
          where the client cannot tell whether the write committed? These details affect safe retries and user-facing state.
        </P>
        <P>
          For uncertain outcomes, use an operation ID and query its status instead of repeating an unsafe action. For updates
          that can conflict, use version checks or a domain-specific merge rule. For projections, record their source offset or
          version so the UI can report that results are still catching up rather than pretending they are current.
        </P>
        <Callout type="tip">
          Draw a timeline for two concurrent clients and write down what each may observe. If you cannot state the allowed
          outcomes, the consistency requirement is not yet precise enough to choose a protocol.
        </Callout>
      </Part>

      <Part n={7} label="Common mistakes" title="Use Precise Words for Distributed Guarantees">
        <Mistakes items={[
          { mistake: 'Describing CAP as a permanent choice of any two properties', cause: 'That slogan hides the condition: the conflict appears during a network partition.', fix: 'Describe behavior during a partition and the latency/consistency choice during normal operation.' },
          { mistake: 'Assuming a quorum formula guarantees linearizability', cause: 'Overlap alone does not define ordering, concurrent-write handling, or membership safety.', fix: 'State the full protocol and failure model, then verify the database’s documented guarantees.' },
          { mistake: 'Treating eventual consistency as an acceptable default for every feature', cause: 'Some invariants such as a one-time payment or inventory reservation cannot tolerate arbitrary divergence.', fix: 'Set per-operation freshness and invariant requirements; use authoritative writes for critical transitions.' },
          { mistake: 'Retrying a timed-out write blindly', cause: 'The original operation may have committed even though its response was lost.', fix: 'Use idempotency keys or operation-status lookup to resolve ambiguous outcomes safely.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Specify Consistency for a Payments and Catalog App">
        <Practice
          title="Turn vague requirements into allowed and forbidden outcomes"
          tasks={[
            'For payment status, product availability, search results, and profile edits, choose a freshness guarantee and explain the user impact.',
            'Draw a primary-replica timeline where a client writes and immediately reads from a lagging replica; propose two ways to preserve read-your-writes.',
            'For N = 5 replicas, compare read/write quorum pairs and explain why overlap is necessary but not a complete consistency proof.',
            'Describe what a leader-based replicated log does when the leader fails before and after a quorum commits an entry.',
            'Write a safe client strategy for a timed-out payment-state write whose commit status is unknown.',
          ]}
          hint="For every answer, name what is guaranteed, what can be delayed or rejected, and how the client recovers from an uncertain response."
        />
      </Part>

      <KeyTakeaways items={[
        'Consistency specifies which operation histories a client is allowed to observe; choose the contract per workflow.',
        'Asynchronous replication can return stale reads; synchronous coordination trades latency or availability for stronger guarantees.',
        'CAP describes behavior during a network partition, while PACELC also highlights normal-operation latency trade-offs.',
        'Quorum overlap helps only within a protocol that correctly orders writes and manages membership and failures.',
        'Consensus coordinates a committed order of decisions; Raft structures leader election and log replication.',
        'Use idempotency or status lookup when a timeout leaves a write outcome ambiguous.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/system-design/reliability-patterns-rate-limiting"
        label="Lesson 09 · Reliability Patterns — Timeouts, Retries, Circuit Breakers and Rate Limiting"
        text="Coordination can still be slow or unavailable. Next, contain failures with timeouts, bounded retries, circuit breakers, bulkheads, and rate limits."
      />
    </LearnLayout>
  )
}
