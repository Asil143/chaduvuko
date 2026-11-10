import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function DatabasesAtScale() {
  return (
    <LearnLayout
      title="Databases at Scale — Replication, Partitioning and Sharding"
      description="Choose SQL or NoSQL, scale reads with replicas, partition and shard data, and handle hot keys and rebalancing."
      section="System Design — Lesson 06"
      readTime="45 min"
    >
      <Part n={1} label="Why scale changes the design" title="A Database Is a Product Decision, Not a Box">
        <P>
          An early application might fit on one database server. As it grows, the same database may face more reads, more writes,
          larger tables, tighter latency goals, and a bigger failure impact. Scaling is not simply &quot;add more machines&quot;:
          every extra copy or partition introduces coordination, operational work, and new failure modes.
        </P>
        <P>
          Start from a workload. A Swiggy-style order service may need strongly consistent writes for a payment state transition,
          fast reads for restaurant menus, and high-volume append-only events for delivery tracking. Those workloads can justify
          different storage strategies; a fashionable database name cannot.
        </P>
        <Table
          head={['Question', 'Relational database often fits', 'NoSQL family may fit']}
          rows={[
            ['Data shape', 'Relationships, constraints, joins matter', 'Access patterns are known and data is naturally key-oriented'],
            ['Transactions', 'Multi-row invariants need ACID transactions', 'A bounded aggregate can be updated atomically by key'],
            ['Queries', 'Ad hoc joins and flexible reporting', 'Predictable key lookups or scans dominate'],
            ['Evolution', 'Schema and constraints are valuable contracts', 'Different records vary or throughput needs a specific model'],
          ]}
        />
        <Callout type="info">
          SQL versus NoSQL is not a scale ladder. Relational systems scale vertically and horizontally, while NoSQL systems still
          require careful data modelling, indexes, backups, and operations.
        </Callout>
      </Part>

      <Part n={2} label="Choose from the workload" title="Model Queries Before Picking a Database">
        <P>
          Write down the important reads and writes before choosing a storage engine. Record the fields used to locate data,
          sort order, expected result size, consistency requirement, and whether a query spans multiple entities. A key-value
          store can be excellent for a lookup and awkward for an unplanned report; a relational database can be a strong default
          while the product is still discovering its access patterns.
        </P>
        <Steps items={[
          'List entities and invariants: an order has one current payment state, and a payment must not be captured twice.',
          'List access patterns: fetch an order by ID, list a customer’s recent orders, and find pending payments for reconciliation.',
          'Estimate read/write rates, row growth, payload size, and peak-to-average variation using stated assumptions.',
          'Choose the simplest engine and schema that supports the operations and correctness guarantees.',
          'Measure real query plans and saturation before introducing replicas or shards.',
        ]} />
        <P>
          A useful design note also names the source of truth. If both a SQL database and a search index contain an order, decide
          which one accepts writes and how the other catches up. Two independent writable copies usually create a conflict
          problem, not redundancy.
        </P>
        <Callout type="tip">
          In an interview, explain the access pattern and invariant first. Then name a storage model and say what would make you
          reconsider it. This is more convincing than claiming one database is universally fastest.
        </Callout>
      </Part>

      <Part n={3} label="Replication" title="Replicas Increase Read Capacity, Not Write Capacity">
        <P>
          Replication maintains copies of data on multiple database nodes. With a primary-replica arrangement, writes go to the
          primary and are copied to replicas. Directing eligible reads to replicas can spread read load and provide copies for
          failover, but a replica can lag behind the primary. A user who writes an address and immediately reads it from a lagging
          replica may see the old address.
        </P>
        <Code lang="text" code={`
                 writes                    replication stream
Client  -------------------->  Primary  -------------------->  Replica A
  |                                |                                |
  | reads requiring freshness      | commit                         | stale-able reads
  +------------------------------> +                                <+
                                                                   Replica B

Primary failure: choose/promote a replica, then redirect traffic.
The promotion decision must prevent two primaries from accepting writes.
`} />
        <P>
          A common session guarantee is read-your-writes: after a customer changes an address, route that customer’s next read to
          the primary or to a replica known to have applied the write. Other screens may accept slightly stale catalog data.
          This is a product-level choice, not just a connection-pool setting.
        </P>
        <Table
          head={['Replication choice', 'Benefit', 'Cost / concern']}
          rows={[
            ['Synchronous acknowledgement', 'Stronger acknowledgement durability across copies', 'Write latency and availability depend on replicas'],
            ['Asynchronous replication', 'Low-latency primary writes; replica can be far away', 'Lag and possible loss of acknowledged data during failure'],
            ['Read replicas', 'More capacity for eligible reads', 'Stale reads, replica overload, and failover complexity'],
          ]}
        />
      </Part>

      <Part n={4} label="Partitioning" title="Partition Large Tables Before You Need a New Cluster">
        <P>
          Partitioning splits one logical table into smaller physical pieces while keeping it within one database system. Range
          partitioning can group orders by month; hash partitioning can distribute users across buckets. Partition pruning lets
          the database skip irrelevant pieces when a query filters on the partition key.
        </P>
        <P>
          For example, an order history query for one customer and date range can benefit from partitions aligned with those
          filters. A query that omits the partition key may still touch every partition. Partitioning does not automatically
          make every query faster, and partition boundaries need maintenance as data grows.
        </P>
        <Code file="partition_plan.py" code={`
from datetime import date


def order_partition_for(created_on: date) -> str:
    """Return the monthly partition name used by the storage layer."""
    return f"orders_{created_on.year}_{created_on.month:02d}"


for day in [date(2026, 1, 15), date(2026, 11, 9)]:
    print(day.isoformat(), order_partition_for(day))
`} />
        <P>
          The example only names a partition; it does not replace database DDL, indexes, retention policy, or query planning.
          Production partitioning is a storage-engine feature, so use the documentation for your selected database and verify
          that representative queries prune partitions as expected.
        </P>
        <Callout type="example">
          A shipment-events table might use monthly partitions for retention, while the hot order table stays unpartitioned until
          measurements show a need. Apply partitioning to a concrete access or lifecycle problem rather than as a default ritual.
        </Callout>
      </Part>

      <Part n={5} label="Sharding" title="Sharding Distributes Data Across Independent Nodes">
        <P>
          Sharding is horizontal partitioning across database nodes. A shard key maps each record to a shard. Picking the key is
          consequential: it should distribute traffic and storage while keeping common queries local. Customer ID is a natural
          key for a customer’s orders, but one unusually active customer can still create a hot shard. A key that spreads writes
          evenly may make a customer-history query span many shards.
        </P>
        <Code file="shard_routing.py" code={`
from hashlib import sha256

SHARD_COUNT = 8


def shard_for(customer_id: str) -> int:
    """Stable routing for a fixed shard count; not a full resharding strategy."""
    digest = sha256(customer_id.encode("utf-8")).digest()
    return int.from_bytes(digest[:8], "big") % SHARD_COUNT


for customer in ["customer-101", "customer-202", "customer-303"]:
    print(customer, shard_for(customer))
`} />
        <P>
          Modulo routing is easy to understand but changing the shard count remaps many keys. Consistent-hash rings or a routing
          directory can reduce movement or enable explicit placement, but both add complexity. Plan how to move data, dual-read
          or dual-write safely during migration, validate counts, and roll back before increasing shard count.
        </P>
        <Callout type="warning">
          Cross-shard joins and transactions are expensive or unavailable depending on the database. Keep invariants that must
          commit together inside one shard where possible; otherwise explicitly design the coordination and recovery workflow.
        </Callout>
      </Part>

      <Part n={6} label="Operations" title="Hot Keys, Lag and Rebalancing Are the Real Work">
        <P>
          Average traffic hides hotspots. A celebrity restaurant, a popular sale, or one shared counter can send a large fraction
          of requests to a single key. Replicas do not necessarily fix a write hotspot, and adding shards does not help if the
          routing key still maps all hot traffic to one shard. Consider caching suitable reads, splitting a counter into
          buckets, or changing the data model while preserving the correctness rule.
        </P>
        <P>
          Watch query latency, connection saturation, replication lag, disk and index growth, per-shard traffic, error rates, and
          backup restore time. Failover is not complete until clients reconnect safely and the promoted node is the only writer.
          Test recovery from backups; a successful backup job alone does not prove that the data can be restored.
        </P>
        <Steps items={[
          'Set an explicit freshness budget for every read path and route reads accordingly.',
          'Keep shard ownership and schema changes observable, and alert on skew between shards.',
          'Use bounded connection pools and query timeouts so database saturation does not spread through the application.',
          'Practice failover and restore procedures with realistic data volumes.',
        ]} />
      </Part>

      <Part n={7} label="Common mistakes" title="Scale Without Breaking the Data Model">
        <Mistakes items={[
          { mistake: 'Adding replicas and assuming writes will scale too', cause: 'Replicas mainly distribute reads; writes still pass through the primary or coordination path.', fix: 'Measure read and write pressure separately, then choose a write-scaling strategy only if needed.' },
          { mistake: 'Choosing a shard key by intuition alone', cause: 'The key may create skew or scatter the most frequent query across shards.', fix: 'Model traffic distribution and query locality with representative data before migration.' },
          { mistake: 'Sending every read to a replica', cause: 'Replication lag can violate user expectations such as seeing an update immediately.', fix: 'Classify reads by freshness requirement and provide read-your-writes routing where needed.' },
          { mistake: 'Treating partitioning as a substitute for indexes or query design', cause: 'Queries can still scan every partition or perform expensive joins.', fix: 'Check execution plans, partition pruning, indexes, and realistic latency under load.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Plan Storage for a Growing Orders Platform">
        <Practice
          title="Write a scale plan before choosing a shard count"
          tasks={[
            'List the key reads and writes for checkout, order history, restaurant menus, and delivery tracking; mark their freshness and transaction needs.',
            'Choose SQL or a NoSQL model for each workload and justify it through access patterns, invariants, and query flexibility.',
            'Sketch a primary with replicas and identify which reads may go to replicas and what read-your-writes behavior is required.',
            'Choose a partition key and shard key for order history; describe one query that becomes easier and one that becomes harder.',
            'Describe how you would find a hot key, move a shard, validate copied records, and recover if the migration fails.',
          ]}
          hint="State assumptions explicitly. Do not invent a traffic target; estimate it from a defined user and order volume, then explain which measurement would validate the estimate."
        />
      </Part>

      <KeyTakeaways items={[
        'Choose storage from data invariants, access patterns, and workload rather than from a SQL-versus-NoSQL slogan.',
        'Replicas can improve read capacity and resilience, but may be stale and do not automatically scale writes.',
        'Partitioning organizes data within a database; sharding distributes it across nodes and makes routing a design responsibility.',
        'A shard key trades even distribution against query locality; hot keys can defeat otherwise good distribution.',
        'Plan failover, backups, restores, rebalancing, and migrations as core parts of the design.',
        'Measure query plans, lag, saturation, and per-shard skew before adding complexity.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/system-design/message-queues-async"
        label="Lesson 07 · Message Queues and Asynchronous Processing"
        text="Storage can persist work, but synchronous request chains still couple services. Next, use queues and workers to decouple slow or bursty tasks safely."
      />
    </LearnLayout>
  )
}
