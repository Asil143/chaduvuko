import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const K = '#f97316'
const FONT_MONO = 'var(--font-mono)'
const FONT_DISPLAY = 'var(--font-display)'

const SectionTag = ({ text }: { text: string }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: FONT_MONO, marginBottom: 10 }}>{text}</div>
)
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: FONT_DISPLAY, lineHeight: 1.2 }}>{children}</h2>
)
const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 'clamp(17px, 2vw, 22px)', fontWeight: 800, letterSpacing: '-0.4px', color: 'var(--text)', margin: '30px 0 12px', fontFamily: FONT_DISPLAY }}>{children}</h3>
)
const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.95, marginBottom: 20 }}>{children}</p>
)
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '54px 0' }} />
const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 26 }}>{children}</div>
)
const Callout = ({ title, children, color = K }: { title: string; children: React.ReactNode; color?: string }) => (
  <div style={{ background: `${color}0d`, border: `1px solid ${color}33`, borderLeft: `4px solid ${color}`, borderRadius: '0 12px 12px 0', padding: '18px 22px', margin: '26px 0' }}>
    <div style={{ fontSize: 11, fontWeight: 800, color, letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: FONT_MONO, marginBottom: 8 }}>{title}</div>
    <div style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)
const CodeBox = ({ label, children }: { label: string; children: string }) => (
  <div style={{ marginBottom: 26 }}>
    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: FONT_MONO }}>{label}</div>
    <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: FONT_MONO, margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const Output = ({ children }: { children: string }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: FONT_MONO, display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ opacity: 0.6 }}>▸</span> output
    </div>
    <pre style={{ background: 'transparent', border: '1px dashed var(--border)', borderRadius: 10, padding: '14px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8, color: 'var(--muted)', fontFamily: FONT_MONO, margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const BulletList = ({ items }: { items: string[] }) => (
  <ul style={{ display: 'grid', gap: 11, margin: '0 0 22px', paddingLeft: 0, listStyle: 'none' }}>
    {items.map(item => (
      <li key={item} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.8 }}>
        <span style={{ color: K, fontWeight: 900, marginTop: 2 }}>✓</span><span>{item}</span>
      </li>
    ))}
  </ul>
)
const Table = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div style={{ overflowX: 'auto', marginBottom: 30 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
      <thead><tr>{headers.map(header => <th key={header} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: K, fontFamily: FONT_MONO, borderBottom: `2px solid ${K}55`, background: `${K}0d`, minWidth: 180 }}>{header}</th>)}</tr></thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.join('|')} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
            {row.map((cell, j) => <td key={j} style={{ padding: '12px 16px', color: j === 0 ? 'var(--text)' : 'var(--muted)', borderBottom: '1px solid var(--border)', verticalAlign: 'top', lineHeight: 1.7, fontWeight: j === 0 ? 700 : 400 }}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default function DisasterRecoveryMultiRegion() {
  return (
    <LearnLayout
      title="Disaster Recovery and Multi-Region Kafka"
      description="Why a single-cluster, single-region Kafka deployment has a blast radius, how rack awareness and MirrorMaker 2 mitigate it, active-passive vs active-active DR patterns, RPO/RTO framing, and a worked regional failover runbook."
      section="Apache Kafka — Module 19"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Disaster Recovery and Multi-Region Kafka', href: '/learn/apache-kafka/disaster-recovery-multi-region' },
      ]}
      prev={{ title: 'Scaling and Capacity Planning', href: '/learn/apache-kafka/scaling-capacity-planning' }}
      next={{ title: 'Event-Driven Architecture', href: '/learn/apache-kafka/event-driven-architecture' }}
    >
      {/* Part 01 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Blast Radius Problem" />
        <SectionTitle>Why a Single Cluster in a Single Region Is a Single Point of Failure</SectionTitle>
        <Para>
          Every module up to this point has treated "the Kafka cluster" as a fixed, given thing — a set of
          brokers in one place that you scale, secure, and tune. That framing quietly hides an assumption:
          that the region hosting those brokers is always available. It is not. Cloud regions have full
          outages — a shared networking fabric, a power event, a control-plane failure in the provider's own
          infrastructure. When that happens, every broker in that region becomes unreachable at once,
          regardless of how carefully you configured replication factor and <code>min.insync.replicas</code>
          inside the cluster.
        </Para>
        <Para>
          This is the blast radius problem: replication within a cluster protects you against losing a
          broker, a disk, or a rack. It does nothing against losing the region the entire cluster lives in.
          A three-broker cluster with replication factor 3 is fully durable against any single broker
          failure — and fully unavailable the moment the region itself goes dark, because all three replicas
          of every partition were in that same region.
        </Para>
        <Para>
          The same blast radius applies to operator error, not just infrastructure failure. A botched
          rolling config change pushed to every broker in the cluster, a bad ACL update that locks out every
          producer, a runaway retention-policy change that deletes data cluster-wide — none of these are
          "region" failures, but they still take down the entire event backbone, because there is only one
          cluster and every application depends on it. Disaster recovery for Kafka is really about answering
          one question: when this one cluster becomes unusable — for any reason — how does the business keep
          moving?
        </Para>
        <HighlightBox>
          <Para>
            <strong>What this module is not about:</strong> normal broker failures, disk failures, or a
            single broker restart. Those are covered by replication and the ISR mechanics you already know —
            they are routine, survivable, and largely invisible to applications. This module is specifically
            about failures large enough that the cluster itself — or the region it lives in — stops being a
            usable unit at all.
          </Para>
        </HighlightBox>
        <Table
          headers={['Failure scope', 'Protected by', 'Recovery time']}
          rows={[
            ['One disk fails', 'Replication within the cluster (RF ≥ 2)', 'Seconds — follower promoted automatically'],
            ['One broker crashes', 'Replication + controller-driven leader election', 'Seconds to low minutes'],
            ['One availability zone fails', 'Rack awareness (broker.rack) spreading replicas across AZs', 'Seconds — replicas in surviving AZs still available'],
            ['Entire region fails', 'Nothing within a single-region cluster — requires a second cluster', 'Minutes to hours, depending on DR readiness'],
            ['Operator pushes a bad cluster-wide config', 'Nothing within a single cluster — a second, isolated cluster limits blast radius', 'Depends entirely on how quickly the mistake is caught and traffic is redirected'],
          ]}
        />
        <Callout title="The core trade-off ahead" color={K}>
          Everything in this module is really one recurring trade-off: more geographic spread buys more
          resilience against large-scale failure, at the direct cost of write latency, operational
          complexity, and (for active-active designs) the correctness headaches of handling conflicting
          writes. There is no configuration that gives you regional resilience for free.
        </Callout>
      </section>

      <Divider />

      {/* Part 02 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Rack Awareness" />
        <SectionTitle>Rack Awareness — Surviving an Availability Zone Failure Inside One Cluster</SectionTitle>
        <Para>
          Before reaching for multiple clusters and multiple regions, there is a cheaper, simpler layer of
          resilience available inside a single cluster: spreading replicas of the same partition across
          different availability zones (AZs) within one region. This is called rack awareness, and it is
          controlled by a single broker-level configuration, <code>broker.rack</code>.
        </Para>
        <Para>
          Without rack awareness, Kafka's default replica placement strategy only guarantees that replicas of
          a partition land on different brokers — it has no idea that broker-1, broker-2, and broker-3 might
          all happen to sit in the same physical availability zone, in which case a replication factor of 3
          gives you zero protection against that one AZ failing. <code>broker.rack</code> lets each broker
          declare which physical or logical "rack" it belongs to — in a cloud deployment this is almost
          always set to the cloud AZ identifier — and the partition-assignment logic then spreads replicas
          across distinct racks whenever possible.
        </Para>
        <CodeBox label="broker.rack — configuring rack-aware replica placement">
{`# broker-1/server.properties
broker.id=1
broker.rack=us-east-1a

# broker-2/server.properties
broker.id=2
broker.rack=us-east-1b

# broker-3/server.properties
broker.id=3
broker.rack=us-east-1c

# broker-4/server.properties (added later, same AZ as broker-1)
broker.id=4
broker.rack=us-east-1a

# With rack awareness enabled, a partition with replication.factor=3
# on this 4-broker cluster will be assigned to three DIFFERENT racks
# whenever three distinct racks are available -- never all three
# replicas landing in us-east-1a alone, even though two brokers live there`}
        </CodeBox>
        <SubTitle>What rack awareness actually buys you</SubTitle>
        <Para>
          If one AZ fails entirely — a real, common failure mode in every major cloud provider, far more
          common than a full region failure — a rack-aware cluster still has at least one in-sync replica of
          every partition alive in a surviving AZ. The controller promotes that replica to leader, and the
          cluster keeps serving reads and writes without operator intervention. Without rack awareness, an AZ
          failure has some real chance of taking out every replica of some partitions simultaneously,
          because nothing prevented all of them from landing in the same AZ.
        </Para>
        <Para>
          Rack awareness is not multi-region DR — it does nothing if the entire region fails, since every AZ
          in that region goes down together. But it is the first, cheapest, and most important layer of
          resilience, and it should be configured on every production cluster regardless of whether
          multi-region DR is also in place. It has essentially no downside: replication traffic between AZs
          typically has low, predictable latency (single-digit milliseconds within a region), so
          <code>acks=all</code> write latency is barely affected compared to same-AZ replication.
        </Para>
        <Callout title="Rack awareness is the default you should never skip" color="#22c55e">
          Unlike cross-region replication, rack awareness across AZs within one region has almost no latency
          cost and no conflict-handling complexity. There is essentially no reason to run a production
          cluster without <code>broker.rack</code> set correctly — it is the cheapest resilience upgrade
          available, and it should be in place long before anyone starts designing a multi-region DR strategy.
        </Callout>
      </section>

      <Divider />

      {/* Part 03 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Why Not Just Stretch One Cluster Across Regions?" />
        <SectionTitle>The Real Trade-Off of a Cross-Region Stretched Cluster</SectionTitle>
        <Para>
          If spreading replicas across AZs within a region protects against an AZ failure, the obvious next
          idea is: why not spread replicas across regions too? Put broker-1 in us-east-1, broker-2 in
          us-west-2, broker-3 in eu-west-1, and now a whole region failing still leaves two regions with a
          live replica. This is technically possible to configure. It is very rarely what production teams
          actually run, and the reason is latency, not theory.
        </Para>
        <Para>
          Recall from earlier modules that <code>acks=all</code> means the leader waits for every replica
          currently in the ISR to confirm the write before acknowledging the producer. If those replicas are
          in different regions, that acknowledgement now has to wait for a full round trip across whatever
          network path connects the regions — typically 30-90ms between two US regions on the same
          continent, and 100ms or more between continents. Compare that to same-AZ replication (under 1ms)
          or cross-AZ-same-region replication (1-5ms). A cross-region stretched cluster turns every
          <code>acks=all</code> write into a multi-hundred-times-slower operation.
        </Para>
        <CodeBox label="the latency math that rules out cross-region stretched clusters for most workloads">
{`# Same-AZ replication (leader and follower in the same data center):
# round trip: under 1ms
# acks=all write latency: roughly the disk fsync time, a few ms

# Cross-AZ, same-region replication (us-east-1a to us-east-1c):
# round trip: 1-5ms
# acks=all write latency: single-digit ms -- barely noticeable

# Cross-region replication (us-east-1 to us-west-2):
# round trip: ~60-70ms
# acks=all write latency: dominated by that 60-70ms round trip
# -- a write that used to take 3ms now takes 60-70ms
# -- for a payment API waiting on that write before responding to
#    a user, this is the difference between a snappy checkout and
#    a customer-visible slowdown on every single order

# Cross-continent replication (us-east-1 to eu-west-1):
# round trip: 90-120ms
# acks=all write latency: effectively unusable for
#   latency-sensitive, synchronous write paths`}
        </CodeBox>
        <Para>
          For latency-insensitive batch workloads, a stretched cluster's latency hit might be tolerable. But
          most production Kafka topics carry a mix of traffic, and the slowest path sets the tone for the
          whole cluster's behavior under <code>acks=all</code>. This is why, in practice, almost no production
          team runs one Kafka cluster with brokers physically spread across regions for latency-sensitive
          workloads. Instead, the standard pattern is multiple independent clusters — one per region — kept
          in sync by a separate replication tool running <em>between</em> clusters, not inside one. That tool
          is MirrorMaker 2, covered next.
        </Para>
        <Callout title="The one-sentence rule" color={K}>
          Rack awareness spreads replicas of one partition across AZs inside one region, for a small latency
          cost, to survive an AZ failure. Multi-region DR uses two separate clusters, each entirely local to
          its own region, kept in sync by an external replication tool, specifically to avoid paying
          cross-region latency on every write.
        </Callout>
      </section>

      <Divider />

      {/* Part 04 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — MirrorMaker 2" />
        <SectionTitle>MirrorMaker 2 — Replicating Between Independent Clusters</SectionTitle>
        <Para>
          MirrorMaker 2 (MM2) is Kafka's standard tool for replicating data between two independent clusters
          — it is not a broker feature, it is a separate application, built on the Kafka Connect framework,
          that runs as its own set of processes reading from a source cluster and writing to a target
          cluster. Because it is built on Connect, it inherits Connect's scalability and fault-tolerance
          model: MM2 workers can be scaled horizontally, and failed tasks are automatically reassigned to
          healthy workers.
        </Para>
        <Para>
          MM2 replicates three distinct things, and it is worth naming all three because teams often assume
          it only copies message data:
        </Para>
        <BulletList
          items={[
            'Topic data — the actual records, preserving partition-to-partition mapping where possible, so partition 3 on the source generally maps to partition 3 on the target.',
            'Consumer group offsets — via a mechanism called offset translation, so a consumer group failing over to the target cluster can resume from roughly the right position instead of starting from the beginning or the end.',
            'Configuration and ACLs — topic configs (retention, partition count, compaction settings) and access-control entries can be kept in sync so the target cluster is not a bare, unconfigured clone.',
          ]}
        />
        <CodeBox label="MirrorMaker 2 — a minimal active-passive replication config">
{`# mm2.properties -- replicating us-east (primary) to us-west (DR)

clusters = us-east, us-west
us-east.bootstrap.servers = broker-a1:9092,broker-a2:9092,broker-a3:9092
us-west.bootstrap.servers = broker-b1:9092,broker-b2:9092,broker-b3:9092

# Enable replication in one direction only: us-east -> us-west
us-east->us-west.enabled = true
us-west->us-east.enabled = false

# Which topics to mirror
us-east->us-west.topics = orders.*, payments.*, inventory.*

# Replicate consumer group offsets too, not just topic data
us-east->us-west.emit.checkpoints.enabled = true
us-east->us-west.sync.group.offsets.enabled = true
us-east->us-west.emit.checkpoints.interval.seconds = 30

# Replicate topic configs (retention, partitions, compaction) too
us-east->us-west.sync.topic.configs.enabled = true

# Replication factor for the mirrored topics on the target cluster
replication.factor = 3`}
        </CodeBox>
        <SubTitle>Topic naming — how MM2 avoids infinite replication loops</SubTitle>
        <Para>
          A subtle but important detail: when MM2 replicates a topic named <code>orders</code> from
          us-east to us-west, it does not write to a topic also named <code>orders</code> on the target.
          By default it prefixes the topic name with the source cluster's alias — the replicated topic on
          us-west is named <code>us-east.orders</code>. This naming convention is what makes bidirectional
          replication (used in active-active designs, covered next) safe: it prevents MM2 from picking up
          the records it just replicated and re-replicating them back to the source in an infinite loop,
          because <code>us-east.orders</code> is a distinct topic from <code>orders</code>, and the
          replication topic filter only matches the original topic names, not the mirrored ones.
        </Para>
        <Output>{`# On us-west, after MM2 replication is running, topics visible include:
us-west> kafka-topics --bootstrap-server broker-b1:9092 --list

orders                     <- native topics created directly on us-west, if any
us-east.orders              <- mirrored copy of us-east's "orders" topic
us-east.payments            <- mirrored copy of us-east's "payments" topic
us-east.inventory            <- mirrored copy of us-east's "inventory" topic
us-east.checkpoints.internal  <- MM2's internal offset-translation bookkeeping topic`}</Output>
        <Callout title="MM2 replication is asynchronous — there is always some lag" color="#ef4444">
          MM2 reads from the source cluster and writes to the target cluster as two separate Kafka
          producer/consumer operations across a real network link. It is not synchronous, and it cannot be —
          if it blocked the source write until the target confirmed, you would be back to paying cross-region
          latency on every write, exactly what Part 03 ruled out. This means there is always some replication
          lag between clusters, and that lag is precisely what determines your recovery point objective,
          covered in Part 07.
        </Callout>
      </section>

      <Divider />

      {/* Part 05 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Active-Passive DR" />
        <SectionTitle>Active-Passive — One Region Serves Traffic, the Other Waits</SectionTitle>
        <Para>
          Active-passive is the simpler and by far the more common multi-region Kafka DR pattern. One
          cluster — the primary — serves all production traffic: every producer writes there, every consumer
          reads from there. A second cluster — the secondary, or DR cluster — sits in a different region,
          continuously receiving a mirrored copy of the primary's data via MM2, but no application writes to
          it or reads from it during normal operation. It exists purely to be promoted if the primary becomes
          unusable.
        </Para>
        <CodeBox label="active-passive topology">
{`                     normal operation
                     ─────────────────

  producers ──write──► [ us-east cluster ] ──MM2──► [ us-west cluster ]
                              │                            │
                        (primary, live)              (passive, DR-only)
                              │
  consumers ◄──read────────────┘

  # us-west receives a continuous mirrored copy but serves
  # no production traffic under normal conditions`}
        </CodeBox>
        <Para>
          The appeal of active-passive is operational simplicity: applications only ever talk to one cluster
          at a time, so there is no need to reason about conflicting writes from two regions touching the
          same data — the primary is the single source of truth until the moment of failover. The cost is
          that the secondary region's capacity sits mostly idle, paid for but unused, until the day it is
          needed.
        </Para>
        <SubTitle>The real gotcha — offsets do not automatically match between clusters</SubTitle>
        <Para>
          This is the detail that catches teams off guard the first time they actually fail over. A consumer
          group reading from the primary cluster has committed offsets like "partition 3, offset 48,201."
          When that consumer group is redirected to the DR cluster after a failover, offset 48,201 on the DR
          cluster's copy of that partition is <em>not necessarily the same record</em> as offset 48,201 on
          the primary. MM2 writes replicated records to the target cluster as new records, at whatever
          offsets the target partition happens to be at when they arrive — the offsets are not preserved
          identically across clusters.
        </Para>
        <Para>
          If a consumer just resumes from its old, primary-cluster offset number on the DR cluster, it will
          either skip records (if the DR cluster's offset numbering is ahead of where that data actually
          starts) or reprocess a huge amount of already-processed data (if it's behind). This is exactly why
          MM2's offset translation feature exists: it maintains a mapping, per consumer group, between
          "offset X on the source cluster" and "the corresponding offset on the target cluster," recorded
          continuously as replication happens, specifically so that a failed-over consumer group can resume
          from the translated equivalent position rather than a raw, meaningless offset number.
        </Para>
        <CodeBox label="offset translation — what MM2 tracks and how failover uses it">
{`# MM2's internal checkpoint topic records translations like:

# consumer_group=order-processing-service, source=us-east,
#   source_topic=orders, partition=3, source_offset=48201
#   -> target_offset=48198 (on us-west's us-east.orders topic)

# On failover, the DR runbook (or an automated tool built on top of
# MM2's RemoteClusterUtils / checkpoint API) looks up this mapping
# and explicitly seeks the consumer group to offset 48198 on
# us-west's us-east.orders partition 3 -- NOT to raw offset 48201,
# and NOT just to "latest" or "earliest," either of which would
# silently skip or reprocess a large amount of data

# Without offset translation, a team's only fallback is an
# application-level reconciliation: seeking consumers by TIMESTAMP
# instead of offset (using the timeindex covered in earlier modules),
# accepting some imprecision, and relying on idempotent downstream
# processing to absorb any resulting reprocessing`}
        </CodeBox>
        <Callout title="Offset translation is not perfectly precise" color={K}>
          Even with offset translation enabled, the mapping is checkpointed periodically (commonly every
          30-60 seconds), not on every single record. A failover can still land a consumer slightly ahead or
          slightly behind the exact right position — close enough that idempotent, at-least-once processing
          on the consumer side is still the right safety net, not a replacement for offset translation, but a
          backstop underneath it.
        </Callout>
      </section>

      <Divider />

      {/* Part 06 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Active-Active DR" />
        <SectionTitle>Active-Active — Both Regions Serve Writes, and Conflicts Become Your Problem</SectionTitle>
        <Para>
          Active-active takes the next step: both regional clusters serve live production traffic
          simultaneously, each with local producers and consumers, and MM2 (or an equivalent tool) mirrors
          data bidirectionally between them, so each region eventually has a copy of the other's data. The
          appeal is obvious — no idle secondary region, and lower write latency for users in each region
          since they write to their local cluster rather than a distant primary.
        </Para>
        <CodeBox label="active-active topology">
{`  us-east producers ──write──► [ us-east cluster ] ◄──MM2, both ways──► [ us-west cluster ] ◄──write── us-west producers
                                      │                                       │
                                 us-east consumers                     us-west consumers
                                 (read local + mirrored                (read local + mirrored
                                  us-west.* topics)                     us-east.* topics)

  # both regions accept writes AND serve reads to local applications
  # each region eventually sees the other's data, with replication lag`}
        </CodeBox>
        <Para>
          The real complexity active-active introduces is not replication mechanics — MM2 handles the
          bidirectional mirroring the same way it handles one-directional replication, using the
          source-cluster-prefixed topic naming from Part 04 to avoid replication loops. The real complexity
          is that <strong>Kafka itself does not dedupe or merge writes across independently-written
          clusters</strong>. If an entity's state can be modified from either region — the same customer's
          shopping cart, the same inventory count for the same product SKU — and both regions write an update
          to that entity at close to the same time, you now have two conflicting versions of that entity's
          state, replicated to both clusters, with no built-in mechanism to reconcile them.
        </Para>
        <SubTitle>A concrete conflict scenario</SubTitle>
        <CodeBox label="the inventory-count conflict — why active-active needs application-level design">
{`# SKU-4471 has 10 units in stock, tracked as a compacted-topic
# changelog entry with key=SKU-4471

# t=0    us-east cluster: 10 units in stock (both regions agree so far)
# t=1    a customer in New York buys 3 units
#        -> us-east producer writes: SKU-4471, stock=7
# t=1.05 (50ms later) a customer in Los Angeles, whose request is
#        routed to us-west, buys 4 units, based on us-west's LOCAL
#        view of stock which STILL SAYS 10, because MM2's replication
#        of the t=1 update hasn't arrived at us-west yet
#        -> us-west producer writes: SKU-4471, stock=6

# Now both writes replicate to both clusters:
# us-east ends up with: stock=7, then later overwritten by stock=6 (replicated from us-west)
# us-west ends up with: stock=6, then later overwritten by stock=7 (replicated from us-east)

# Whichever write arrives LAST at each cluster "wins" -- last-write-wins
# by arrival time, not by correctness. The true stock level after two
# independent purchases of 3 and 4 units from a starting 10 should be 3.
# Neither region's version (6 or 7) is correct -- both undercounted
# how much was actually sold, because neither wrote against the other's update`}
        </CodeBox>
        <Para>
          This is not a Kafka bug — Kafka faithfully replicated exactly what each producer wrote, in the
          order each cluster received it. The conflict exists because the business logic allowed the same
          mutable entity to be modified independently from two places without coordination. Solving it
          requires application-level design, not a Kafka setting: options include partitioning entities by
          region so each one has a single writing region (a customer's cart is only ever written from the
          region they're logged into), using conflict-free replicated data types (CRDTs) for counters that
          need to merge correctly regardless of order, or routing all writes for a given entity through one
          region while still serving reads from both (a hybrid that is really active-passive at the entity
          level, wrapped in an active-active-looking topology).
        </Para>
        <Table
          headers={['Pattern', 'Conflict risk', 'Complexity', 'When it fits']}
          rows={[
            ['Active-passive', 'None — single writer at all times', 'Low — no conflict handling needed', 'Most production DR needs; the default choice unless a specific reason rules it out'],
            ['Active-active, entity-partitioned by region', 'Low — each entity has exactly one writing region', 'Moderate — requires routing logic to pin an entity to a region', 'Global user bases where most entities are naturally region-local (a user profile, a regional warehouse)'],
            ['Active-active, freely writable from either region', 'High — same entity can be modified from both regions concurrently', 'High — needs CRDTs or application-level conflict resolution', 'Rare; only when write-latency requirements truly cannot tolerate a single-writer region and conflicts are rare or mergeable'],
          ]}
        />
        <Callout title="Default to active-passive unless you can name the conflict resolution strategy" color="#ef4444">
          If a team proposes active-active Kafka and cannot describe, concretely, what happens when the same
          key is written from both regions within the replication lag window, that is a sign the design is
          not ready. Active-passive with a fast, well-drilled failover process solves the DR problem for the
          overwhelming majority of production systems without ever having to answer that question.
        </Callout>
      </section>

      <Divider />

      {/* Part 07 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — RPO and RTO" />
        <SectionTitle>RPO and RTO — Putting Numbers on "How Bad Is a Failover"</SectionTitle>
        <Para>
          Disaster recovery conversations need concrete, measurable targets, not just "we have a DR cluster."
          The two standard metrics, borrowed from general DR practice and directly applicable to Kafka, are
          Recovery Point Objective (RPO) and Recovery Time Objective (RTO).
        </Para>
        <SubTitle>RPO — how much data could be lost</SubTitle>
        <Para>
          Recovery Point Objective answers: if the primary cluster disappears right now, how much recently
          written data has not yet made it to the DR cluster, and is therefore lost? For MM2-based
          replication, RPO is directly determined by replication lag at the moment of failure — the gap
          between what the primary has committed and what the DR cluster has actually received and durably
          written.
        </Para>
        <Para>
          RPO is not a fixed number; it is a moving target that depends on network conditions between
          regions, MM2's own throughput and tuning, and how close to real time the specific topic's
          replication has been keeping up. A healthy MM2 pipeline under normal load might run seconds behind.
          A pipeline under strain — a network degradation between regions, or MM2 workers under-provisioned
          for the topic's volume — could be minutes behind, and that lag is exactly how much data an
          instantaneous primary-region failure would lose.
        </Para>
        <SubTitle>RTO — how fast you can cut over</SubTitle>
        <Para>
          Recovery Time Objective answers: from the moment the primary is declared unusable, how long until
          traffic is fully served by the DR cluster again? This includes detecting the failure, deciding to
          fail over (often a deliberate human decision, not an automatic one, precisely because falsely
          failing over has its own cost), reconfiguring or redeploying producers and consumers to point at
          the DR cluster, and validating that offset translation landed consumer groups in a sane place
          before declaring the failover complete.
        </Para>
        <Table
          headers={['Metric', 'Question it answers', 'Primary lever to improve it']}
          rows={[
            ['RPO', 'How much data is lost in a sudden failure?', 'Reduce MM2 replication lag — adequate MM2 worker capacity, sufficient network bandwidth between regions, monitoring lag as a first-class metric'],
            ['RTO', 'How long until the business is back to normal after a failure?', 'Rehearsed, largely-automated failover runbooks; pre-provisioned DR cluster capacity so you are not waiting on infrastructure to scale up during the incident'],
          ]}
        />
        <CodeBox label="RPO and RTO — a worked numeric example">
{`# Observed MM2 replication lag under normal conditions: 8 seconds average
# Observed lag during a network degradation event last quarter: 4 minutes peak

# RPO, normal conditions: ~8 seconds of data at risk in a sudden failure
# RPO, degraded conditions: up to 4 minutes of data at risk

# Failover runbook (rehearsed quarterly), timed end to end:
#   detect primary unavailable (alerting):        ~2 minutes
#   decide to fail over (human confirmation):      ~3 minutes
#   redirect producers/consumers to DR cluster:    ~5 minutes
#   validate offset translation landed correctly:  ~5 minutes
#   ────────────────────────────────────────────────────────
#   RTO (rehearsed, under normal conditions):     ~15 minutes

# These numbers only mean anything if measured from real drills,
# not estimated from how the runbook reads on paper`}
        </CodeBox>
        <Para>
          RPO and RTO targets should come from the business, not from infrastructure convenience — a
          payments topic might demand an RPO of seconds and an RTO of minutes, justifying tightly monitored
          MM2 lag and a heavily automated failover process, while an internal analytics-events topic might
          tolerate an RPO of tens of minutes and an RTO measured in hours. Applying the same DR rigor to
          every topic regardless of its actual business cost of loss is how DR programs become expensive
          without becoming more effective.
        </Para>
      </section>

      <Divider />

      {/* Part 08 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Backup Strategies Beyond Replication" />
        <SectionTitle>Topic-to-S3 Snapshotting — The Last-Resort Restore Path</SectionTitle>
        <Para>
          MM2 replication is designed for fast failover — a DR cluster that is ready to serve live traffic
          within minutes. It is not designed as a long-term archival backup, and it shares a real weakness
          with the primary cluster: it is still a live, running Kafka cluster, subject to its own operator
          error, its own storage failures, and its own potential for a bad config change to be mirrored
          right alongside the good data it's replicating.
        </Para>
        <Para>
          For genuine last-resort recovery — a scenario severe enough that both the primary and DR clusters
          are compromised, or where you need to reconstruct historical data outside of Kafka's own retention
          window entirely — teams commonly run a Kafka Connect sink connector that continuously exports
          topic data to object storage (commonly S3), independent of both live clusters. This is not a
          replacement for MM2-based DR; it is a separate, slower, cheaper safety net underneath it.
        </Para>
        <CodeBox label="a Kafka Connect S3 sink connector config — continuous topic-to-S3 snapshotting">
{`{
  "name": "orders-s3-backup-sink",
  "config": {
    "connector.class": "io.confluent.connect.s3.S3SinkConnector",
    "tasks.max": "4",
    "topics": "orders,payments,inventory",
    "s3.bucket.name": "kafka-backups-orders-payments",
    "s3.region": "us-east-1",
    "flush.size": "10000",
    "rotate.interval.ms": "300000",
    "storage.class": "io.confluent.connect.s3.storage.S3Storage",
    "format.class": "io.confluent.connect.s3.format.parquet.ParquetFormat",
    "partitioner.class": "io.confluent.connect.storage.partitioner.TimeBasedPartitioner",
    "path.format": "'year'=YYYY/'month'=MM/'day'=dd/'hour'=HH",
    "locale": "en-US",
    "timezone": "UTC"
  }
}`}
        </CodeBox>
        <Para>
          Restoring from an S3 snapshot is deliberately a manual, slow-path operation: a batch job reads the
          Parquet (or Avro/JSON) files back out of S3 and produces them into a freshly created topic on
          whichever cluster is being rebuilt. This is orders of magnitude slower than MM2 failover and loses
          the original partition-level offsets entirely, which is exactly why it is a last resort rather than
          the primary DR mechanism — it exists for the scenario where MM2-based replication itself has failed
          or was never keeping up, not as the everyday recovery path.
        </Para>
        <Callout title="Treat S3 snapshots as insurance, not as your DR plan" color="#38bdf8">
          A team that can only recover by restoring from S3 snapshots is looking at hours-to-days of downtime
          and reconstruction work, not the minutes of a proper active-passive failover. Budget and design for
          MM2-based DR as the real plan; keep S3 snapshotting running quietly in the background as the
          backstop for the failure modes DR replication itself cannot cover — accidental topic deletion that
          also gets faithfully mirrored to the DR cluster being the classic example.
        </Callout>
      </section>

      <Divider />

      {/* Part 09 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Worked Example" />
        <SectionTitle>A Regional Failover Runbook, Worked End to End</SectionTitle>
        <Para>
          Bringing the whole module together, here is what an active-passive regional failover actually looks
          like in practice, for a company running an order-processing platform with a primary cluster in
          us-east-1 and a passive DR cluster in us-west-2, mirrored continuously by MM2.
        </Para>
        <CodeBox label="regional failover runbook — freshcart.orders platform">
{`# ── STAGE 1: Detection ─────────────────────────────────────────────
# Alerting fires: us-east-1 broker health checks failing cluster-wide,
# not just one broker. Confirmed via cloud provider's own status page
# showing a us-east-1 networking incident. This is NOT a single-broker
# issue that self-heals via normal replication -- it is a region-level
# event, which is the trigger condition for this runbook.

# ── STAGE 2: Declare the failover ────────────────────────────────
# On-call incident commander confirms with a second engineer.
# Failover is a DELIBERATE decision, not automatic -- a false failover
# has real cost too (split traffic, confused consumers, wasted DR
# capacity), so this step is intentionally a human checkpoint.

# ── STAGE 3: Check MM2 replication lag AT time of failure ────────
us-west> kafka-consumer-groups --bootstrap-server broker-b1:9092 \\
  --describe --group mm2-orders-replication

# LAG column shows: partition 0: 1,204 records, partition 1: 890 records
# This tells the team roughly how much data is about to be "lost"
# for RPO reporting purposes -- these records were written to
# us-east but had not yet replicated to us-west when it went down

# ── STAGE 4: Promote consumer groups using offset translation ────
us-west> kafka-mirror-maker-offset-tool --translate-offsets \\
  --group order-processing-service \\
  --source-cluster us-east --target-cluster us-west

# This seeks every consumer in the order-processing-service group
# to the translated-equivalent offset on us-west's mirrored topics,
# not a raw copy of the us-east offset numbers (Part 05)

# ── STAGE 5: Redirect producers and consumers ─────────────────────
# Application config / service discovery updated:
#   bootstrap.servers: broker-a1,broker-a2,broker-a3 (us-east)
#     -> broker-b1,broker-b2,broker-b3 (us-west)
# Rolled out via existing config-management pipeline, same one used
# for routine deploys -- deliberately NOT a special one-off mechanism,
# so it is well-tested by ordinary use rather than only during a crisis

# ── STAGE 6: Validate ──────────────────────────────────────────────
# Confirm: producers writing successfully to us-west
# Confirm: consumer lag on us-west's mirrored topics is draining,
#   not growing -- proves consumers picked up from a sane position
# Confirm: downstream systems (payment processor, notification
#   service) are receiving events again

# ── STAGE 7: Stop the clock, record RTO/RPO ───────────────────────
# Time from Stage 1 detection to Stage 6 validated: 17 minutes (RTO)
# Records lost per Stage 3's lag reading: ~2,094 records across two
#   partitions (RPO) -- logged for post-incident review and for
#   deciding whether MM2 capacity needs to increase to tighten RPO`}
        </CodeBox>
        <Para>
          The runbook's value comes entirely from having been rehearsed, not from existing on paper. A
          failover drilled quarterly, with the team actually executing Stages 1 through 7 against a real
          (non-production) cluster pair, surfaces the gaps that a document review never will — a config
          management pipeline that turns out to require manual approval steps nobody remembered, an offset
          translation tool that needs a flag nobody had used before, a monitoring dashboard that does not
          actually show MM2 lag broken out by topic. Every one of those gaps is cheap to fix in a drill and
          expensive to discover during an actual regional outage.
        </Para>
        <Callout title="Failback is a second runbook, not an afterthought" color={K}>
          This example stops at "traffic is now served from us-west." Returning to us-east once it recovers —
          failback — is its own procedure with its own RPO/RTO considerations, because now us-west has
          accumulated writes that need to replicate back before us-east can safely resume as primary. Teams
          that only ever rehearse failover and never rehearse failback often find the return trip is where
          the real surprises live.
        </Callout>
      </section>

      <Divider />

      {/* Part 10 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Monitoring DR Readiness" />
        <SectionTitle>Monitoring DR Readiness — Catching a Silent DR Failure Before You Need It</SectionTitle>
        <Para>
          A DR cluster that has quietly stopped receiving replication traffic looks, from a distance,
          identical to a healthy one — until the day the primary fails and the team discovers the secondary
          has been weeks stale. This is the single most dangerous failure mode in any DR program: not the
          primary failing, but the DR mechanism itself failing silently, unnoticed, until it's needed and
          found wanting. Monitoring DR readiness deserves the same rigor as monitoring the primary cluster.
        </Para>
        <Table
          headers={['Signal', 'What it tells you', 'Alert threshold worth considering']}
          rows={[
            ['MM2 replication lag, per topic', 'Directly bounds current RPO — the gap between what the primary has and what the DR cluster has actually received', 'Alert on sustained upward trend, not a single spike; alert louder as lag approaches your topic-specific RPO target'],
            ['MM2 connector/task health', 'Whether the replication pipeline itself is running at all, independent of lag — a fully stalled connector eventually shows as unbounded lag, but catching the stall directly is faster', 'Any MM2 task in a failed or paused state for more than a few minutes'],
            ['DR cluster topic existence and partition count parity', 'Whether new topics or partition-count changes on the primary have actually propagated, since sync.topic.configs.enabled only helps if it is actually enabled and working', 'Any drift between primary and DR topic/partition inventory'],
            ['DR cluster broker health (independent of replication)', 'Whether the DR cluster itself is healthy and could actually serve traffic if promoted — a stale-but-healthy cluster and a fresh-but-unhealthy cluster are both DR failures, for different reasons', 'Standard broker health checks, run continuously on the DR cluster exactly as they run on the primary'],
            ['Last successful failover drill date', 'An operational, not technical, signal — but the most predictive one for whether the runbook will actually work when it matters', 'Alert (as a calendar/process reminder, not a system metric) if the last drill is older than the team\'s rehearsal cadence'],
          ]}
        />
        <Para>
          The last row is easy to dismiss as not really "monitoring," but it belongs on the same dashboard
          conceptually as the technical signals. A DR cluster with perfect replication lag numbers and a
          runbook nobody has executed in eight months carries real, unmeasured risk — precisely the kind Part
          09 emphasizes drills exist to surface before an actual incident does.
        </Para>
        <Callout title="Treat DR readiness as a first-class SLO, not a background assumption" color={K}>
          Teams that report uptime and latency SLOs for their primary cluster but track nothing for DR
          readiness are, in effect, running an unmeasured second system. Define an explicit DR readiness SLO
          — for example, "MM2 lag stays under 60 seconds for 99.9% of the time" and "a full failover drill
          completes successfully at least once per quarter" — and report on it with the same seriousness as
          primary-cluster availability.
        </Callout>
      </section>

      <Divider />

      {/* Part 11 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — The Cost Conversation" />
        <SectionTitle>Paying for Resilience — What Multi-Region DR Actually Costs, and How to Scope It</SectionTitle>
        <Para>
          Every pattern in this module has a real dollar cost, and pretending otherwise is how DR proposals
          stall in budget review. A passive DR cluster in a second region means paying for a second set of
          brokers, sized to handle full production load even though it serves none of it day to day — plus
          cross-region data transfer costs for the continuous MM2 replication stream, which scale directly
          with how much data you're mirroring and how many topics you've chosen to replicate.
        </Para>
        <Table
          headers={['Cost driver', 'What increases it', 'How to control it']}
          rows={[
            ['DR cluster compute', 'Sizing the DR cluster to match full primary capacity at all times', 'Size the DR cluster to your actual promotion target — if a full regional failure also means reduced overall traffic (a real, if uncomfortable, possibility), an appropriately smaller DR cluster with a scale-up plan may be acceptable'],
            ['Cross-region data transfer', 'Replicating every topic at full retention volume, including low-value topics', 'Apply Part 07\'s per-topic RPO/RTO reasoning to decide what actually needs cross-region replication at all — not every topic warrants the cost'],
            ['MM2 worker compute', 'Under-provisioning causes replication lag (a reliability cost); over-provisioning wastes compute for headroom rarely used', 'Size MM2 workers to sustained peak topic volume, monitored and adjusted based on real lag data rather than a one-time estimate'],
            ['S3 snapshot storage', 'Long retention windows on the backup path, applied uniformly to all topics', 'Set S3 lifecycle policies per topic\'s actual recovery-value profile, not a single blanket retention setting for everything'],
            ['Operational cost of drills', 'Full production-scale failover drills run too frequently, or with more manual effort than necessary', 'Automate as much of the runbook as safely possible so drills are cheap enough to run on the cadence Part 09 recommends, without each one being a major undertaking'],
          ]}
        />
        <Para>
          The framing that tends to get DR investment approved is not "resilience is important" in the
          abstract — it's translating Part 07's RPO/RTO targets into a concrete cost of downtime and comparing
          it directly against the cost of the DR infrastructure. A regional outage that costs the business
          $40,000 per hour in lost orders, held for two hours because no DR plan existed, is a $80,000
          incident that a DR cluster costing a few thousand dollars a month would have prevented or
          dramatically shortened — that comparison, with real numbers specific to the business, is what makes
          the investment case land.
        </Para>
        <Callout title="Not every topic deserves the same DR spend" color="#22c55e">
          The single highest-leverage cost-control decision in this whole module is refusing to apply uniform
          DR treatment to every topic. A payments topic justifies full cross-region replication, tight RPO
          monitoring, and frequent drills. An internal debug-logging topic very likely does not. Scoping DR
          spend to where the business cost of loss actually justifies it, rather than defaulting to "replicate
          everything," is what keeps a DR program sustainable rather than something leadership quietly starts
          questioning at the next budget cycle.
        </Callout>
      </section>

      <Divider />

      {/* Part 12 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Warm Standby, Cold Standby, and Pilot Light" />
        <SectionTitle>How "Ready" Should the DR Cluster Be? Three Levels of Standby</SectionTitle>
        <Para>
          "Active-passive" is not one single configuration — there is a real spectrum in how ready the passive
          cluster is kept, and where a team lands on that spectrum is itself a cost/RTO trade-off worth making
          deliberately, not by default.
        </Para>
        <Table
          headers={['Standby level', 'DR cluster state before failover', 'Typical RTO', 'Ongoing cost']}
          rows={[
            ['Cold standby', 'Brokers and infrastructure are provisioned but not continuously replicating; MM2 is started only at the point of failover, or replication runs on a long, infrequent schedule', 'Hours — includes catch-up replication time from wherever the last sync left off', 'Lowest — minimal ongoing compute and data transfer cost'],
            ['Warm standby', 'Brokers are running, MM2 replication is continuous, but the cluster is not pre-scaled to instantly absorb full production load without some scale-up step', 'Minutes to tens of minutes — mostly the time to redirect traffic and scale up, replication itself is already current', 'Moderate — the pattern this module has described as the default active-passive setup'],
            ['Hot standby', 'Brokers running, MM2 replication continuous, DR cluster pre-scaled to instantly absorb full production load with no scale-up step needed', 'Minutes — largely just the traffic-redirection and validation steps from Part 09\'s runbook', 'Highest — effectively paying for two full production-capacity clusters continuously'],
          ]}
        />
        <Para>
          Most of this module's guidance, including the Part 09 runbook, describes warm standby — it is the
          most common production choice because it gets RTO down to a reasonable, business-justifiable number
          without paying for a fully duplicated, always-scaled second production environment. Cold standby is
          sometimes acceptable for genuinely low-priority topics where a multi-hour RTO is tolerable and the
          cost savings matter more. Hot standby is reserved for the small set of systems where minutes of RTO
          genuinely isn't good enough and the cost is justified — most commonly regulated financial systems
          with explicit, contractual recovery-time requirements.
        </Para>
        <Callout title="Pick the standby level per topic tier, the same way you pick RPO/RTO per topic" color={K}>
          A single company can reasonably run hot standby for its payments topics, warm standby for its order
          and inventory topics, and cold standby (or no cross-region replication at all) for internal
          debug-logging topics — all on the same pair of regions, using the same MM2 tooling, just configured
          and scaled differently per topic tier. This is a direct continuation of Part 07's and Part 11's
          per-topic scoping principle, applied to the standby-readiness dimension specifically.
        </Callout>
      </section>

      <Divider />

      {/* Part 13 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Testing DR Without Touching Production" />
        <SectionTitle>Drilling Failover Safely — Chaos-Style Testing for a DR Pipeline</SectionTitle>
        <Para>
          A recurring objection to frequent DR drills is real and worth addressing directly: nobody wants to
          risk an actual production outage just to test the failover process. The good news is that most of
          the DR pipeline can be validated without ever touching production traffic, using the same layered
          approach chaos-engineering practice applies elsewhere.
        </Para>
        <Table
          headers={['Drill type', 'What it validates', 'Production risk']}
          rows={[
            ['Non-production cluster pair, full failover run', 'The entire runbook mechanically works: MM2 config, offset translation tooling, config-management redirect steps', 'None — entirely isolated from production traffic'],
            ['Shadow consumer group on the real DR cluster', 'That a consumer group can actually be seeked using offset translation and process real, currently-replicating data correctly, without redirecting real producers', 'Low — reads only, against already-replicated data; does not touch the live producer or consumer path'],
            ['Game-day exercise: redirect a single, low-risk producer to the DR cluster temporarily', 'That producers can genuinely write to and be redirected toward the DR cluster under close supervision', 'Moderate — deliberately scoped to one low-impact producer, with an easy, pre-planned rollback'],
            ['Full production failover drill, run during a low-traffic maintenance window', 'The complete, real end-to-end process, including the human decision-making step', 'Highest — but the most accurate signal, and the only drill type that fully validates RTO under real conditions'],
          ]}
        />
        <Para>
          A mature DR program uses all four layers on different cadences: the non-production full-failover
          drill and the shadow-consumer-group validation can run monthly or even continuously, cheaply,
          because they carry essentially no production risk. The game-day exercise and the full production
          drill are reserved for a slower cadence — quarterly is common — specifically because they carry
          real, if carefully scoped, risk and require more coordination to execute safely.
        </Para>
        <Callout title="A DR pipeline that has only ever been tested against a non-production cluster is not fully validated" color="#ef4444">
          Non-production drills catch the majority of runbook and tooling gaps cheaply, but they cannot
          validate everything — production-scale data volume affecting MM2 throughput, production's actual
          config-management approval process, or how the team behaves under the real pressure of an actual
          incident are all things only a real production drill, however infrequent, can genuinely test. Treat
          the cheap drills as necessary but not sufficient on their own.
        </Callout>
      </section>

      <Divider />

      {/* Part 14 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Schema Registry and ACLs in a Multi-Region Setup" />
        <SectionTitle>Don't Forget the Supporting Systems — Schema Registry and Security Config Also Need a DR Story</SectionTitle>
        <Para>
          Everything in this module has focused on the Kafka clusters themselves, but a production Kafka
          deployment almost always runs alongside a schema registry (covered in earlier modules for its role
          in enforcing compatibility) and a set of access-control configurations. A DR plan that covers the
          Kafka clusters but forgets these supporting systems still leaves a real gap: a failed-over cluster
          that producers and consumers cannot actually authenticate against, or a DR cluster whose schema
          registry doesn't have the schemas needed to deserialize the very data MM2 has been faithfully
          replicating into it.
        </Para>
        <Table
          headers={['Supporting system', 'DR gap if forgotten', 'How teams typically close it']}
          rows={[
            ['Schema registry', 'The DR cluster has replicated data, but consumers there can\'t deserialize it because the corresponding schemas were never registered in a DR-region schema registry instance', 'Run a schema registry instance per region, and replicate schema registrations between them (many registries support this, or it can be scripted against the registry API) alongside MM2\'s data replication'],
            ['ACLs and authentication config', 'Producers and consumers redirected to the DR cluster during failover are rejected because the DR cluster\'s access-control list was never kept in sync with the primary\'s', 'MM2\'s sync.acls.enabled (or equivalent config sync feature) keeps ACLs mirrored alongside topic configs, covered briefly in Part 04 — verify it\'s actually enabled and tested, not just assumed'],
            ['Client configuration / service discovery', 'Applications have the primary cluster\'s address hardcoded or cached in a way that a config change during failover doesn\'t actually reach every instance', 'Route client configuration through the same config-management pipeline used for ordinary deploys, per Part 09\'s runbook, rather than a special-cased DR-only mechanism that\'s rarely exercised'],
          ]}
        />
        <Callout title="A DR drill that only checks the brokers has checked half the system" color={K}>
          The most realistic failover drills, per Part 13, deliberately exercise the full path — including
          whether a consumer redirected to the DR cluster can actually authenticate and deserialize real data
          — rather than only confirming the brokers themselves are reachable and have the expected topics.
          Broker-only validation is a necessary first check, not a complete one.
        </Callout>
      </section>

      <Divider />

      {/* Misconceptions */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Kafka Disaster Recovery</SectionTitle>
        {[
          {
            wrong: '"Replication factor 3 already protects us from a regional disaster"',
            right: 'Part 01 draws this distinction directly: replication factor protects against losing individual brokers, disks, or (with rack awareness) an availability zone — all within one region. It provides zero protection if the region itself, hosting every replica, becomes unavailable. Regional DR requires a second, independently-located cluster.',
          },
          {
            wrong: '"We should just stretch one Kafka cluster across two regions for maximum resilience"',
            right: 'Part 03 works through the actual cost: acks=all write latency is dominated by the slowest replica\'s round trip, and cross-region round trips (60-120ms) are tens to hundreds of times slower than same-region replication. This is why production teams run separate per-region clusters kept in sync by MirrorMaker 2 instead.',
          },
          {
            wrong: '"MirrorMaker 2 keeps offsets identical between the source and target clusters"',
            right: 'Part 05 is explicit that MM2 writes replicated records as new records at whatever offset the target partition happens to be at — offsets are not preserved identically. This is exactly why MM2\'s offset translation feature exists: to track the mapping between equivalent positions across clusters for failing-over consumer groups.',
          },
          {
            wrong: '"Active-active is strictly better than active-passive since both regions are useful"',
            right: 'Part 06 shows the real cost: Kafka does not dedupe or merge conflicting writes to the same key from two independently-writing regions, so active-active pushes real conflict-resolution complexity onto the application. Active-passive avoids this entirely because there is only ever one writer, and is the right default unless a team can name a concrete conflict-resolution strategy.',
          },
          {
            wrong: '"Having a DR cluster means our RPO and RTO are effectively zero"',
            right: 'Part 07 is direct about this: RPO is bounded below by MM2\'s actual replication lag at the moment of failure, which is never exactly zero for asynchronous cross-region replication, and RTO is bounded below by however long the failover runbook genuinely takes to execute — both need to be measured from real drills, not assumed from the existence of a DR cluster.',
          },
          {
            wrong: '"Every topic in the cluster deserves the same DR treatment"',
            right: 'Part 11 and Part 12 both make the same point from different angles: applying uniform cross-region replication, tight RPO monitoring, and hot-standby-level readiness to every topic regardless of its actual business cost of loss is what makes DR programs expensive without making them proportionally more effective. Scope DR investment — including which standby level to run — per topic tier.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red,#ff4757)', marginBottom: 8, fontFamily: FONT_MONO }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* Story */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// What This Looks Like at Work" />
        <SectionTitle>What This Looks Like on Day One</SectionTitle>
        <HighlightBox>
          <Para>
            <strong>At Zillow:</strong> the listings-events pipeline runs on a single us-east cluster, and a
            regional networking incident takes the whole cluster unreachable for 40 minutes during a normal
            business day. Listings stop updating, agent notifications stop firing, and search-index freshness
            begins visibly degrading. In the postmortem, the fix on the table is not "add more brokers" — it
            is exactly the pattern from Part 05: stand up a passive DR cluster in us-west, replicate with MM2,
            and rehearse the failover runbook from Part 09 quarterly so the next regional incident is a
            15-minute blip instead of a 40-minute outage discovered mid-incident with no rehearsed plan.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Expedia:</strong> the booking-confirmation topic and the marketing-clickstream topic
            sit on the same cluster today, and leadership initially asks for "the same DR setup for
            everything." Following Part 07's RPO/RTO framing, the platform team pushes back with numbers: the
            booking-confirmation topic gets an RPO of seconds and RTO of minutes, justifying tightly monitored
            MM2 lag and a heavily rehearsed failover; the clickstream topic gets an RPO measured in tens of
            minutes and a same-day RTO, since a few minutes of lost marketing events has no customer-facing
            consequence. Differentiated DR targets per topic keep the DR program focused and affordable
            instead of uniformly expensive.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Chewy:</strong> a proposal to go active-active across two regions — for lower write
            latency to customers on both coasts — stalls in review when someone asks the Part 06 question:
            "what happens when the same customer's subscription order is modified from both regions within
            the replication lag window?" Nobody has an answer. The team ships active-passive instead, with
            us-east as primary and us-west as DR, and revisits active-active later only for the specific
            entities — like read-mostly product catalog data — where conflicting concurrent writes genuinely
            cannot happen.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      {/* Interview Prep */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. Why doesn\'t a Kafka cluster with replication factor 3 already provide disaster recovery?',
            a: `Replication factor determines how many copies of each partition exist across the brokers in one cluster — it protects against losing individual brokers, disks, or, with rack awareness configured via broker.rack, an entire availability zone. What it does not protect against is the region hosting the whole cluster becoming unavailable, because every replica, regardless of replication factor, lives in that same region.

I'd draw the distinction Part 01 makes explicit: within-cluster replication and disaster recovery solve different scopes of failure. Disaster recovery specifically means having a second, independently-located cluster — in a different region — that can take over if the first cluster, for any reason including a full regional outage or a bad operator change, becomes unusable.

I'd also mention rack awareness as the cheap, in-between layer: setting broker.rack to spread replicas across availability zones within one region protects against the much more common AZ-level failure, at almost no latency cost, and should be configured regardless of whether a full DR strategy is also in place.`,
          },
          {
            q: 'Q2. Why don\'t most production teams just run one Kafka cluster with brokers spread across multiple regions?',
            a: `The blocker is write latency, not feasibility — it's technically possible to configure, but acks=all requires the leader to wait for every in-sync replica to confirm before acknowledging the producer, and if those replicas are in different regions, that wait now includes a full cross-region network round trip.

Concretely, same-AZ replication is sub-millisecond, cross-AZ-same-region is single-digit milliseconds, but cross-region round trips run 60-120ms depending on distance. That turns every acks=all write into a dramatically slower operation, which is unacceptable for latency-sensitive paths like a checkout flow waiting on a payment event to be durably written.

The standard alternative, which I'd describe from Part 03 and Part 04, is running fully independent clusters, one per region, each with all of its own brokers local to that region for fast local writes, kept in sync between regions by an external replication tool — MirrorMaker 2 — running asynchronously between them rather than inside the write path.`,
          },
          {
            q: 'Q3. Walk me through what MirrorMaker 2 replicates and why offset translation matters for failover.',
            a: `MM2 replicates three things between clusters: the actual topic data, consumer group offsets via a mechanism called offset translation, and topic configs/ACLs. It's built on Kafka Connect, so it scales out and recovers from worker failures the same way any Connect-based pipeline does.

The offset translation piece is the one that catches teams off guard if they don't understand it up front. MM2 writes replicated records to the target cluster as new records, landing at whatever offset the target partition happens to be at — it does not preserve the source cluster's offset numbers identically. So a consumer group that failed over and just resumed from its old, primary-cluster offset number on the DR cluster would either skip data or massively reprocess it, because that offset number means something different on each cluster.

Offset translation solves this by maintaining a continuously updated mapping, per consumer group, between source-cluster offsets and their target-cluster equivalents, checkpointed periodically. On failover, the consumer group is explicitly seeked to the translated position rather than a raw copy of the old offset — and because that checkpoint isn't instantaneous, idempotent downstream processing is still the right backstop underneath it, not a replacement for it.`,
          },
          {
            q: 'Q4. When would you recommend active-active Kafka replication over active-passive, and what has to be true for it to be safe?',
            a: `My default recommendation is active-passive, because it has a genuinely simpler correctness story: there is exactly one writing cluster at any time, so there's no scenario where the same key gets independently modified from two regions and produces a conflict Kafka itself has no mechanism to resolve.

I'd only recommend active-active when a team can name, concretely, what happens when the same entity is written from both regions within the replication lag window — for example, because entities are naturally partitioned so each one only ever has a single writing region (a customer's data written only from the region they're logged into), or because the specific data type genuinely tolerates conflict-free merging, like using a CRDT for a counter.

Without a concrete answer to that question, active-active isn't actually buying resilience — it's trading a clean single-writer DR story for a live data-correctness problem that will eventually surface in production, usually at the worst possible time, like during the very regional instability that active-active was meant to help with.`,
          },
          {
            q: 'Q5b. How would you decide between cold, warm, and hot standby for a DR cluster, and would you use the same level for every topic?',
            a: `I would not use the same level for every topic — that's the mistake Part 11 and Part 12 both warn against. The right standby level is a direct function of a topic's RPO/RTO targets, which should themselves come from the topic's actual business cost of loss and downtime, not from infrastructure convenience.

Cold standby — infrastructure provisioned but not continuously replicating — fits low-priority topics where a multi-hour RTO genuinely doesn't hurt the business and the cost savings matter more. Warm standby — continuous replication, but not pre-scaled to instantly absorb full production load — is the right default for most production topics, getting RTO down to minutes-to-tens-of-minutes without paying for a fully duplicated, always-scaled second environment. Hot standby — fully scaled and ready at all times — I'd reserve for the small set of systems where minutes of RTO genuinely isn't acceptable, most often regulated financial systems with contractual recovery-time requirements, because it effectively means paying for two full production environments continuously.

In practice, I'd expect a single company to run different standby levels for different topic tiers on the same pair of regions — hot standby for payments, warm standby for orders and inventory, and cold standby or no cross-region replication at all for internal debug topics — configured and scaled independently even though they share the same MM2 tooling underneath.`,
          },
          {
            q: 'Q5. How would you define and measure RPO and RTO for a Kafka-based system, and how would you actually validate those numbers?',
            a: `RPO — recovery point objective — is how much recently written data could be lost in a sudden failure. For MM2-based replication, that's directly bounded by replication lag: whatever hasn't yet made it from the primary to the DR cluster at the moment of failure is what's lost. I'd monitor MM2 lag continuously, per topic, as a first-class metric, not just check it after the fact.

RTO — recovery time objective — is how long from detecting the failure to the DR cluster fully serving production traffic again. That includes detection time, the decision to fail over (which I'd keep as a deliberate human checkpoint, since a false failover has its own real cost), redirecting producers and consumers, and validating that offset translation landed consumer groups in a sane position.

Critically, neither number means anything as a target on a slide — they need to come from actually running the failover runbook against a real cluster pair, on a rehearsed cadence like quarterly, and measuring the real elapsed time and the real lag reading at the moment of the drill. I'd also push to set different RPO/RTO targets per topic based on real business cost of loss, rather than applying one blanket DR standard to everything, since that's usually how DR programs become expensive without becoming more effective.`,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* Common Mistakes */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>The Mistakes That Undermine Kafka DR Plans</SectionTitle>
        {[
          {
            q: 'Treating replication factor as sufficient disaster recovery and never standing up a second, regionally isolated cluster',
            a: 'Part 01 is the reference: replication within one cluster protects against broker- and disk-level failures, and with rack awareness, AZ-level failures — but it provides no protection against the region itself, hosting every replica, becoming unavailable.',
          },
          {
            q: 'Skipping broker.rack configuration because "we already have a multi-region DR cluster"',
            a: 'Part 02 is explicit that rack awareness and multi-region DR solve different, complementary problems, and rack awareness has almost no latency cost. An AZ failure is far more common than a regional failure, and skipping the cheap protection because the expensive protection exists leaves an easily-closed gap open.',
          },
          {
            q: 'Assuming a failed-over consumer group can resume from its old offset numbers on the DR cluster',
            a: 'Part 05 walks through exactly why this breaks — MM2 does not preserve identical offsets across clusters. Skipping offset translation during failover causes either skipped records or a large amount of unnecessary reprocessing, depending on which direction the offsets happen to be misaligned.',
          },
          {
            q: 'Building active-active replication without a concrete conflict-resolution plan for entities writable from both regions',
            a: 'Part 06\'s inventory-count example shows the real outcome: Kafka faithfully replicates whatever each region wrote, in the order it arrived — it does not merge or dedupe conflicting updates to the same key. Skipping this design question up front means discovering the conflict in production, usually as a data-correctness bug that looks unrelated to Kafka at first.',
          },
          {
            q: 'Never actually rehearsing the failover runbook end to end',
            a: 'Part 09 makes the point directly: a runbook\'s value comes from having been executed, not from existing as a document. Untested runbooks reliably have gaps — a config pipeline step that needs manual approval, a tool flag nobody has used — that only surface during a real incident if they were never drilled beforehand.',
          },
          {
            q: 'Monitoring the primary cluster closely while treating the DR cluster\'s health as an unmonitored assumption',
            a: 'Part 10 is explicit that a DR cluster silently falling behind on replication looks, from a distance, identical to a healthy one — until the day it\'s actually needed. Give DR readiness (replication lag, connector health, topic parity, drill cadence) the same monitoring rigor and SLO treatment as primary-cluster availability, not an afterthought checked only during an incident.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* Error Library */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>
        {[
          {
            error: `After a regional failover, a consumer group processes a huge burst of records it appears to have already handled days earlier`,
            cause: 'The failover redirected the consumer group to the DR cluster and it resumed from its old primary-cluster offset numbers directly, without offset translation. Those numbers point to an earlier, already-processed position on the DR cluster\'s differently-numbered partitions, per Part 05.',
            fix: 'Use MM2\'s offset translation (the checkpoint mapping between source and target cluster offsets) when seeking consumer groups during failover, rather than reusing raw offset numbers. Build this seek step explicitly into the failover runbook rather than relying on it happening automatically.',
          },
          {
            error: `An "active-active" inventory system shows two regions disagreeing about the same product\'s stock count, and neither number is correct`,
            cause: 'Both regions accepted independent writes to the same key within MM2\'s replication lag window, per Part 06\'s worked example. Kafka replicated both writes faithfully, and whichever arrived last at each cluster overwrote the other — last-write-wins by arrival time, not by correctness, with no merge of the two purchases.',
            fix: 'This is not fixable by tuning MM2 — it requires an application-level change: partition the entity so it only ever has one writing region, or use a CRDT-based counter that can merge concurrent updates correctly, or fall back to routing writes for that entity through a single region even in an otherwise active-active topology.',
          },
          {
            error: `acks=all producer latency jumps from a few milliseconds to over 80ms after a cluster reconfiguration`,
            cause: 'A broker was added (or a replica was reassigned) into a different region than the rest of the cluster, likely by mistake or as an attempted DIY multi-region stretch, per Part 03. The leader now has to wait for that cross-region replica to confirm on every acks=all write.',
            fix: 'Check broker.rack and the actual physical/cloud-region location of every broker in the cluster. A single Kafka cluster should have all of its brokers within one region (spread across AZs for rack awareness); cross-region resilience belongs to a second cluster and MirrorMaker 2, not to stretching one cluster\'s membership across regions.',
          },
          {
            error: `MM2 replication lag climbs steadily for hours and does not recover on its own`,
            cause: 'MM2 worker capacity (tasks.max, or the number of Connect worker instances) is under-provisioned for the actual replicated topic volume, or there is a sustained network degradation between the two regions reducing effective throughput below the source cluster\'s write rate.',
            fix: 'Scale out MM2 workers/tasks, similar to scaling any Kafka Connect connector, and check the network path between regions for packet loss or reduced bandwidth. Treat sustained, growing MM2 lag as a direct, real-time increase to your RPO and alert on it accordingly, per Part 07 — it is not just an operational nuisance, it is a widening DR gap.',
          },
          {
            error: `A failover drill reveals the DR cluster has almost no data for a topic that has existed and been actively written to for months`,
            cause: 'MM2\'s replication configuration for that topic was never actually enabled, or the topic name did not match the configured topic filter pattern (for example, a topic named differently than the pattern in us-east->us-west.topics expected), so replication silently never started for it.',
            fix: 'Explicitly list and verify every production topic against the MM2 topic filter configuration, rather than assuming a broad wildcard pattern caught everything — and include a check for "does the DR cluster actually have recent data for every critical topic" as a standing item in every DR drill, not just a one-time setup verification.',
          },
          {
            error: `A quarterly cost review flags the DR cluster as one of the largest line items in the Kafka budget, with no clear owner able to justify the spend`,
            cause: 'The DR cluster was sized as hot standby (or replicated every topic at full retention) by default, per Part 11 and Part 12, without a deliberate per-topic decision about which topics actually justify that level of readiness and cost.',
            fix: 'Revisit standby level and replicated-topic scope per topic tier, matched explicitly to each topic\'s RPO/RTO targets and real business cost of loss from Part 07 — downgrade low-priority topics to warm or cold standby, or drop cross-region replication for topics where it was never actually justified, and document the reasoning so the next cost review has a clear answer.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: 'var(--red,#ff4757)', marginBottom: 12, background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '8px 12px', lineHeight: 1.5 }}>
              {item.error}
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: FONT_MONO, letterSpacing: '.1em', textTransform: 'uppercase' }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', fontFamily: FONT_MONO, letterSpacing: '.1em', textTransform: 'uppercase' }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      <KeyTakeaways
        items={[
          'A single-region Kafka cluster has a real blast radius: replication factor and rack awareness protect against broker, disk, and AZ failures, but nothing protects against the region itself failing except a second, independently-located cluster.',
          'DR readiness deserves the same monitoring and SLO treatment as primary-cluster availability — a DR cluster silently falling behind on replication looks identical to a healthy one until the day it is actually needed.',
          'DR cost and standby readiness (cold, warm, or hot) should be scoped per topic tier based on real RPO/RTO targets and business cost of loss, not applied uniformly — schema registry, ACLs, and client configuration need the same DR treatment as the brokers themselves.',
          'broker.rack spreads replicas across availability zones within one region at nearly zero latency cost, and should be configured on every production cluster regardless of whether a full multi-region DR strategy also exists.',
          'Stretching one Kafka cluster across regions is rare in production because acks=all write latency is dominated by the slowest in-sync replica\'s round trip, and cross-region round trips are tens to hundreds of times slower than same-region replication.',
          'MirrorMaker 2 replicates topic data, consumer group offsets (via offset translation), and configs/ACLs between independent, regionally isolated clusters — it is built on Kafka Connect and scales the same way any Connect pipeline does.',
          'Active-passive DR keeps exactly one writing cluster at all times, avoiding conflict handling entirely; active-active DR allows both regions to write and requires an explicit application-level plan for conflicting concurrent writes, since Kafka does not merge or dedupe them itself.',
          'MM2 does not preserve identical offsets across clusters — offset translation tracks the equivalent position on the target cluster, and failover runbooks must explicitly use it rather than reusing raw source-cluster offset numbers.',
          'RPO is bounded by MM2\'s replication lag at the moment of failure; RTO is bounded by how long the failover runbook genuinely takes. Both should be set per topic based on real business cost of loss, and validated through rehearsed drills, not assumed from having a DR cluster.',
          'Topic-to-S3 snapshotting via a Connect sink connector is a slow, last-resort backstop underneath MM2-based DR — useful for scenarios like accidental deletion that get faithfully mirrored, not a substitute for a fast, rehearsed failover process.',
        ]}
      />
    </LearnLayout>
  )
}
