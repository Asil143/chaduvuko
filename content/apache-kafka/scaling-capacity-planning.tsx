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

export default function ScalingCapacityPlanning() {
  return (
    <LearnLayout
      title="Scaling and Capacity Planning"
      description="How to size a Kafka cluster before it exists and grow it correctly afterward: disk math from throughput and retention, partition count sizing, broker sizing, horizontal scaling and throttled reassignment, quotas for multi-tenancy, and a full worked capacity-planning example."
      section="Apache Kafka — Module 18"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Scaling and Capacity Planning', href: '/learn/apache-kafka/scaling-capacity-planning' },
      ]}
      prev={{ title: 'Performance Tuning', href: '/learn/apache-kafka/performance-tuning' }}
      next={{ title: 'Disaster Recovery and Multi-Region Kafka', href: '/learn/apache-kafka/disaster-recovery-multi-region' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Capacity Planning Inputs" />
        <SectionTitle>The Four Numbers Every Capacity Plan Starts From</SectionTitle>
        <Para>
          The performance tuning module covered how to make an already-running cluster faster. This module is
          about a different, earlier question: how big does the cluster need to be in the first place, and how
          does it need to grow. Capacity planning is not a guess — it is arithmetic performed on four inputs
          that every team can actually measure or reasonably estimate before a single broker is provisioned.
        </Para>
        <BulletList
          items={[
            'Expected throughput — how much data arrives per second, in MB/s, at peak (not average — sizing for average leaves no headroom for the busiest moments).',
            'Average message size — bytes per record, which combined with throughput gives you a messages-per-second figure as well as a bytes-per-second figure.',
            'Retention window — how long data must stay available before it ages out, in seconds or days, per topic (different topics legitimately have different retention needs).',
            'Replication factor — how many copies of every message the cluster stores, which multiplies disk usage directly and is a durability decision, not a performance one.',
          ]}
        />
        <Para>
          These four numbers feed directly into the most fundamental capacity-planning calculation there is:
          how much disk a topic needs. Every other sizing decision in this module — partition count, broker
          count, broker specs — is downstream of getting a realistic handle on these four inputs first.
        </Para>
        <Para>
          It is worth being explicit about what getting this wrong actually costs, in either direction.
          Under-provisioning based on an optimistic throughput estimate means a cluster that runs comfortably for
          a while and then, with no code change on anyone's part, starts rejecting writes or falling dangerously
          close to disk capacity during a traffic spike nobody explicitly planned for — often first noticed as an
          incident, not a planning conversation. Over-provisioning wastes real budget on idle capacity, and in
          some organizations makes the next capacity request harder to get approved, since the previous
          "generous" estimate visibly went unused. Neither failure mode is free, which is the whole argument for
          doing the arithmetic in this module rather than picking a round number that feels safe.
        </Para>
        <SubTitle>The disk math</SubTitle>
        <CodeBox label="the core capacity-planning formula">
{`disk_needed = throughput_bytes_per_sec * retention_seconds * replication_factor

# Example: a topic receiving 20 MB/sec, retained for 7 days,
# replicated 3 ways (replication.factor=3)

throughput_bytes_per_sec = 20 * 1024 * 1024        # 20,971,520 bytes/sec
retention_seconds        = 7 * 24 * 60 * 60         # 604,800 seconds
replication_factor       = 3

disk_needed = 20,971,520 * 604,800 * 3
            = 38,050,975,027,200 bytes
            ≈ 34.6 TB total, across the whole cluster

# This is the RAW capacity the cluster needs for this one topic.
# Real deployments add headroom on top of this raw number -- see
# the worked example in Part 07 for why 34.6 TB of raw need does
# not mean provisioning exactly 34.6 TB of disk.`}
        </CodeBox>
        <Para>
          Notice that this formula multiplies, rather than adds, replication factor into disk usage — going
          from <code>replication.factor=2</code> to <code>replication.factor=3</code> is not a 50% increase in
          disk need, it is exactly a 50% increase per replica added, applied to the full retained dataset, not
          just the newest data. This is why raising replication factor on an already-large topic is a real,
          sometimes surprising capacity decision, not a free durability upgrade.
        </Para>
        <Callout title="Peak, not average, is the number that matters" color="#ef4444">
          A topic averaging 10 MB/s across a day but spiking to 40 MB/s during a two-hour peak window needs to
          be sized — at least for broker throughput capacity, if not always for disk, since disk fills based on
          total bytes retained regardless of when they arrived — around that 40 MB/s peak. Sizing purely on the
          daily average produces a cluster that looks correctly sized on a dashboard and then falls behind or
          rejects writes every single day during the exact window when the data actually matters most.
        </Callout>
        <SubTitle>Where these four numbers actually come from</SubTitle>
        <Para>
          For a system that already exists, the answer is measurement, not estimation — the monitoring module's
          metrics (bytes-in-rate, bytes-out-rate at the broker level) give you real peak throughput directly, and
          existing topic configuration gives you current retention and replication factor. For a genuinely new
          system with no production traffic yet, these numbers have to be estimated, and the estimation process
          itself deserves some rigor rather than a guess pulled from thin air.
        </Para>
        <Table
          headers={['Input', 'For an existing system', 'For a new system']}
          rows={[
            ['Peak throughput', 'Read directly from broker bytes-in/bytes-out metrics over a representative recent window, focused on the actual peak, not an average.', 'Estimate from expected user count or event volume times a per-user/per-event rate, informed by a comparable existing system if one exists, then add explicit margin for estimation uncertainty.'],
            ['Average message size', 'Measure directly from a sample of real production payloads.', 'Measure from a schema/payload prototype — serialize a handful of realistic sample records and check their actual byte size, rather than guessing.'],
            ['Retention window', 'Read from existing topic configuration, cross-checked against the actual business or compliance requirement it was meant to satisfy.', 'A deliberate decision made with input from whoever will consume the data — replay needs, compliance requirements, and downstream reprocessing needs all factor in.'],
            ['Replication factor', 'Read from existing topic configuration.', 'A durability decision made using the same framework as the message brokers module\'s durability-versus-availability trade-off — not defaulted without consideration.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Sizing Partition Count" />
        <SectionTitle>Enough Partitions for Peak Parallelism, Not So Many That Metadata Suffers</SectionTitle>
        <Para>
          Partition count is the single most consequential sizing decision in this module, because — unlike
          broker count or disk size — it is expensive and disruptive to change later, for reasons covered in
          Part 06. Getting it roughly right up front avoids a much harder problem down the line.
        </Para>
        <SubTitle>The floor: enough partitions for your peak required consumer parallelism</SubTitle>
        <Para>
          A partition is the unit of parallelism within a consumer group — Module 03 established that within one
          group, only one consumer reads a given partition at a time, so a topic with 8 partitions can never be
          processed by more than 8 active consumers in a single group, no matter how many instances you deploy.
          The floor for partition count is therefore driven by the maximum number of consumers you will ever
          realistically want processing this topic in parallel, at peak load, with room to grow — not the
          number you need on day one.
        </Para>
        <CodeBox label="working backward from required parallelism">
{`# A topic needs to sustain 200 MB/sec at peak
# A single consumer instance, given realistic per-record processing
# time, can sustain roughly 15 MB/sec before it becomes the bottleneck

min_consumers_needed = 200 / 15 ≈ 14 consumers

# Partition count must be AT LEAST 14 to let 14 consumers run in
# parallel. Add headroom for future growth and for hot-partition
# skew (a perfectly even key distribution is rare in practice):

partition_count = 14 * 1.5 (growth + skew headroom) ≈ 21, round to 24

# 24 partitions gives room to scale the consumer group up to 24
# instances later without a repartitioning project, while still
# comfortably covering today's 14-consumer requirement`}
        </CodeBox>
        <SubTitle>The ceiling: why "just add more partitions" is not free</SubTitle>
        <Para>
          Every partition is real, ongoing overhead, not a free logical construct. Each partition means more
          open file handles on every broker hosting a replica, more metadata the controller has to track and
          propagate to every broker in the cluster, and more state the client's consumer group protocol has to
          coordinate during a rebalance — a rebalance across a consumer group covering a topic with thousands of
          partitions takes measurably longer than one covering a topic with dozens, because there is simply more
          assignment work to compute and propagate. Very high partition counts across a cluster (tens of
          thousands, cluster-wide) have been a documented source of longer leader-election time during a broker
          failure and slower controller failover specifically, since the controller's own metadata log has more
          to replicate.
        </Para>
        <Para>
          A short worked comparison makes the floor-versus-ceiling tension in this section concrete: two teams
          reasoning from the same peak-throughput number can land on very different, both-defensible partition
          counts depending on how much growth headroom and skew tolerance they build in — the ranges below are a
          starting point for that conversation, not a formula with one correct output.
        </Para>
        <Table
          headers={['Topic size / use case', 'Reasonable partition count range', 'Reasoning']}
          rows={[
            ['Low-volume config or control topic', '1-6', 'Little to no need for consumer parallelism; more partitions here is pure overhead with no benefit.'],
            ['Typical mid-volume business event topic', '6-24', 'Covers realistic consumer-group scaling headroom without meaningfully burdening cluster metadata.'],
            ['High-volume ingestion topic (clickstream, CDC firehose)', '24-100+', 'Driven directly by the peak-throughput-divided-by-per-consumer-throughput math from above; large but justified by real parallelism need.'],
            ['Cluster-wide total across all topics', 'Typically kept well under the tens-of-thousands range on a single cluster', 'Beyond this, controller metadata propagation and failover time measurably degrade, independent of any single topic\'s needs — a signal to consider splitting workloads across multiple clusters instead.'],
          ]}
        />
        <Callout title="Rule of thumb: size for 18-24 months of growth, not just current load" color={K}>
          Since increasing partition count later has the ordering-guarantee cost covered in Part 06, a common
          practical approach is to size initial partition count for roughly 18-24 months of projected growth in
          required parallelism, rather than exactly matching today's consumer count — accepting a small amount
          of unnecessary overhead now in exchange for avoiding a disruptive repartitioning project later.
        </Callout>
        <SubTitle>Partition count also interacts with per-partition throughput limits</SubTitle>
        <Para>
          The parallelism-driven floor is not the only constraint worth checking. A single partition also has a
          practical throughput ceiling of its own — commonly cited guidance puts a single partition's sustainable
          write throughput on modern hardware somewhere in the range of tens of megabytes per second, since a
          partition's writes are handled by a single leader broker and a single log. A topic's total required
          throughput divided across too few partitions can bump into this per-partition ceiling even when the
          consumer-parallelism math from earlier in this Part would have suggested fewer partitions were enough.
        </Para>
        <CodeBox label="checking partition count against a per-partition throughput ceiling, not just parallelism">
{`# Topic needs to sustain 150 MB/sec total, and a single partition
# on this hardware comfortably sustains ~15 MB/sec of write
# throughput before becoming a bottleneck on its own leader broker

min_partitions_for_per_partition_throughput = 150 / 15 = 10 partitions

# Compare against the earlier parallelism-driven floor from this
# same Part (e.g. 14 consumers needed -> 14 partitions minimum)

# The BINDING constraint is whichever number is larger -- in this
# example, the parallelism requirement (14) already exceeds the
# throughput-driven minimum (10), so parallelism is the actual
# floor here. For a topic with few consumers but very high
# per-partition write volume, the throughput ceiling can instead
# be the binding constraint, even with low required parallelism.`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Broker Sizing" />
        <SectionTitle>CPU, Memory, Disk, Network — and Why More Smaller Brokers Often Beats Fewer Bigger Ones</SectionTitle>
        <SubTitle>Per-broker resource guidelines</SubTitle>
        <Table
          headers={['Resource', 'What drives the requirement', 'Practical guideline']}
          rows={[
            ['CPU', 'Compression/decompression at scale (mostly producer/consumer-side, but SSL termination and request handling cost broker CPU too), replication throughput, num.io.threads sizing from the performance module.', '8-16 cores is a common mid-size broker starting point; scale with sustained throughput and how much SSL/compression work the broker itself performs.'],
            ['Memory (RAM)', 'Mostly the OS page cache, per the performance module\'s finding that Kafka relies on page cache — not JVM heap — for read performance.', '32-64 GB+ total RAM with only ~6 GB reserved for the JVM heap; the rest serves the page cache directly.'],
            ['Disk', 'The disk_needed formula from Part 01, divided across brokers and partition replicas.', 'Fast, sequential-write-friendly storage (Part 05 of the performance module) sized with real headroom above the raw calculated need — see Part 07\'s worked example.'],
            ['Network', 'Peak aggregate throughput in and out, including replication traffic between brokers, which effectively multiplies producer-facing throughput by the replication factor on the broker side.', 'A broker\'s network capacity should comfortably exceed peak_throughput * replication_factor, not just peak producer throughput, since every write also triggers replication traffic to followers.'],
          ]}
        />
        <Para>
          The network guideline is easy to under-budget. A partition leader receiving 20 MB/sec of producer
          writes with <code>replication.factor=3</code> is not moving 20 MB/sec across its network interface —
          it is receiving 20 MB/sec from producers and then sending roughly 40 MB/sec more to its two follower
          replicas, for a total of roughly 60 MB/sec of network activity attributable to that one partition's
          leadership alone, before any consumer read traffic is even counted.
        </Para>
        <CodeBox label="a full per-broker network budget, including consumer reads">
{`# A broker leading partitions that receive 20 MB/sec of total
# producer writes, replication.factor=3, and serving 3 independent
# consumer groups that each read the full volume

incoming_from_producers   = 20 MB/sec
outgoing_to_followers     = 20 MB/sec * (replication_factor - 1)
                           = 20 * 2 = 40 MB/sec
outgoing_to_consumers     = 20 MB/sec * number_of_consumer_groups
                           = 20 * 3 = 60 MB/sec
                           # (each independent consumer group reads
                           #  the full topic, per Module 03's
                           #  consumer-group independence model)

total_network_activity = 20 + 40 + 60 = 120 MB/sec

# Note this is 6x the raw 20 MB/sec producer figure most teams
# start their mental model from. Provisioning network capacity
# against only the producer-facing number, ignoring replication
# fan-out and consumer fan-out, is a common and easy-to-miss
# under-provisioning mistake.`}
        </CodeBox>
        <Para>
          Reads from the OS page cache (per the performance tuning module) mean consumer-facing network traffic
          does not translate one-to-one into additional disk I/O the way it does into additional network load —
          but it is still real network bandwidth the broker's network interface has to carry, and undersizing for
          it produces exactly the kind of symptom the performance module's thread-pool diagnosis table describes:
          elevated request latency that looks disk-and-CPU-idle, because the actual constraint is the network
          interface itself.
        </Para>
        <SubTitle>Why more, smaller brokers often beats fewer, bigger brokers</SubTitle>
        <Para>
          Given a fixed total budget of CPU, memory, and disk, it is tempting to provision a small number of
          very large broker machines — fewer machines to patch, fewer machines to monitor, simpler-looking
          topology. This trades away something important: fault tolerance and blast radius. When one broker in
          a 12-broker cluster fails, it was hosting roughly 1/12th of the cluster's partition leaders, and the
          controller has to re-elect leaders for that fraction of partitions from their in-sync replicas. When
          one broker in a 3-broker cluster of otherwise-equivalent total capacity fails, it was hosting roughly
          1/3rd of the cluster's partition leaders — a much larger simultaneous leader-election event, and a
          much larger share of total cluster capacity suddenly gone.
        </Para>
        <CodeBox label="blast radius comparison at equal total capacity">
{`# Same total capacity, two topologies:

# Topology A: 3 large brokers, each handling ~33% of cluster load
# One broker fails -> ~33% of partition leaders need re-election
# simultaneously, and remaining 2 brokers must absorb 50% more
# load each to cover the lost capacity

# Topology B: 12 smaller brokers, each handling ~8.3% of cluster load
# One broker fails -> ~8.3% of partition leaders need re-election
# simultaneously, and remaining 11 brokers absorb ~9% more load
# each to cover the lost capacity

# Topology B's single-broker-failure event is meaningfully smaller
# and easier for the remaining cluster to absorb, at the same total
# hardware budget`}
        </CodeBox>
        <Para>
          This is not an argument for unlimited fragmentation — very many extremely small brokers add their own
          overhead (more replication connections between more machines, more operational surface area to
          patch and monitor) and eventually run into the same kind of diminishing returns Part 02 describes for
          partition count. The practical guidance is to prefer a broker count in the range that keeps
          any single broker from holding more than a modest fraction (commonly cited guidance is well under 15-20%)
          of total cluster capacity, rather than defaulting to the smallest broker count that technically fits
          the workload.
        </Para>
        <SubTitle>Rack and availability-zone awareness</SubTitle>
        <Para>
          Broker sizing decisions do not happen in a vacuum — where brokers physically live matters as much as
          how many of them there are. Kafka supports rack awareness (<code>broker.rack</code>), which the
          controller uses when placing partition replicas: it deliberately spreads a partition's replicas across
          different racks (or, in a cloud deployment, different availability zones) rather than allowing all
          replicas for a partition to land in the same failure domain. Without rack awareness configured, it is
          entirely possible for replication factor 3 to provide no real protection against a correlated failure —
          if all three replicas happen to sit in the same availability zone, an AZ-wide outage takes out every
          replica simultaneously, and replication factor 3 provided zero actual durability benefit for that
          specific failure mode.
        </Para>
        <CodeBox label="why rack awareness matters even with replication factor 3">
{`# Without broker.rack configured:
# Partition 0 replicas: [broker-2 (az-1), broker-5 (az-1), broker-9 (az-1)]
# All three replicas happen to land in az-1 -- the controller had
# no rack information to make a better placement decision

# az-1 has an outage -> ALL THREE replicas of this partition are
# unavailable simultaneously, despite replication.factor=3

# With broker.rack configured (broker.rack=az-1, az-2, az-3 etc.):
# Partition 0 replicas: [broker-2 (az-1), broker-6 (az-2), broker-11 (az-3)]
# The controller deliberately spread replicas across three
# different availability zones

# az-1 has an outage -> only ONE of three replicas is affected
# -> the partition remains available, served by its remaining
#    in-sync replicas in az-2 and az-3, exactly as replication
#    factor 3 was meant to guarantee`}
        </CodeBox>
        <Callout title="Configure broker.rack before the cluster holds meaningful production data" color="#ef4444">
          Rack awareness affects replica placement at write time — it does not retroactively fix the placement
          of data already written before it was configured. Set <code>broker.rack</code> as part of initial
          cluster provisioning, not as an afterthought once a cluster is already carrying production traffic,
          since correcting existing bad placement afterward requires the same throttled reassignment process
          covered in Part 04.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Horizontal Scaling" />
        <SectionTitle>Adding Brokers and Reassigning Partitions With kafka-reassign-partitions.sh</SectionTitle>
        <Para>
          Adding a new broker to a running cluster does not automatically move any existing data onto it. A
          newly joined broker is immediately available to host new partitions for newly created topics, but
          every partition that already existed before it joined stays exactly where it was, on exactly the
          brokers it was already assigned to — the new broker sits idle from that data's perspective until you
          explicitly move some of it over. This is a common surprise for teams expecting a new broker to
          automatically "spread the load."
        </Para>
        <SubTitle>Partition reassignment</SubTitle>
        <Para>
          <code>kafka-reassign-partitions.sh</code> is the tool for explicitly moving partition replicas between
          brokers — whether to make use of a newly added broker, to rebalance load away from a broker that has
          become a hotspot, or to prepare for decommissioning a broker being removed from the cluster. The
          workflow is a three-step process: generate a proposed reassignment plan, review and optionally adjust
          it, then execute it and monitor progress.
        </Para>
        <CodeBox label="generating and executing a reassignment plan">
{`# Step 1: describe which topics/partitions to move, and which
# brokers are eligible destinations, in a JSON file

# topics-to-move.json
{
  "topics": [{ "topic": "clickstream.events" }],
  "version": 1
}

kafka-reassign-partitions.sh --bootstrap-server broker-1:9092 \\
  --topics-to-move-json-file topics-to-move.json \\
  --broker-list "1,2,3,4,5,6" \\
  --generate

# outputs a proposed reassignment JSON -- review it before executing`}
        </CodeBox>
        <Output>{`Current partition replica assignment:
{"version":1,"partitions":[{"topic":"clickstream.events","partition":0,"replicas":[1,2,3]}, ...]}

Proposed partition reassignment configuration:
{"version":1,"partitions":[{"topic":"clickstream.events","partition":0,"replicas":[4,2,5]}, ...]}`}</Output>
        <CodeBox label="executing the reassignment with a throttle">
{`kafka-reassign-partitions.sh --bootstrap-server broker-1:9092 \\
  --reassignment-json-file proposed-reassignment.json \\
  --throttle 50000000 \\
  --execute

# --throttle limits reassignment traffic to 50 MB/sec per broker
# CRITICAL -- see below for why this flag is not optional in practice

kafka-reassign-partitions.sh --bootstrap-server broker-1:9092 \\
  --reassignment-json-file proposed-reassignment.json \\
  --verify

# --verify reports whether the reassignment has completed`}
        </CodeBox>
        <SubTitle>Why reassignment must be throttled</SubTitle>
        <Para>
          Moving a partition replica from one broker to another means copying its entire retained log — every
          byte within that topic's retention window — over the network from the source broker to the
          destination broker. This is not a metadata operation; it is real, sustained I/O and network load, on
          top of whatever normal production traffic those brokers are already serving. An unthrottled
          reassignment of a large, high-retention topic can saturate a broker's disk and network capacity,
          degrading latency and throughput for every other topic that broker also happens to host — turning a
          routine rebalancing operation into a self-inflicted incident.
        </Para>
        <CodeBox label="the cost of skipping the throttle -- a real scenario">
{`# Topic being reassigned: 500 GB total across the partitions being moved
# Broker network capacity: 1 Gbps ≈ 125 MB/sec

# Without --throttle: reassignment traffic competes directly with
# production traffic for the same network and disk bandwidth
# -> production produce/consume latency spikes during the move
# -> in a severe case, under-replicated-partitions alerts fire for
#    UNRELATED topics sharing the same broker, because normal
#    replication traffic is now starved by reassignment traffic

# With --throttle 20000000 (20 MB/sec):
# reassignment takes longer (500 GB / 20 MB/sec ≈ 7 hours) but
# leaves headroom for production traffic to proceed normally
# throughout the move -- a deliberate, safe trade of reassignment
# speed for production stability`}
        </CodeBox>
        <Callout title="Always throttle, and always verify before considering it done" color="#ef4444">
          Treat <code>--throttle</code> as a required flag, not an optional tuning knob, for any reassignment of
          meaningful size on a cluster serving real production traffic. Pick a throttle value using the same
          headroom thinking as the network guideline in Part 03 — comfortably below the spare capacity the
          broker actually has after accounting for its existing production load. Always follow up with
          <code>--verify</code>; a reassignment that appears to have started successfully is not guaranteed to
          have completed without an explicit check.
        </Callout>
        <SubTitle>Decommissioning a broker safely</SubTitle>
        <Para>
          Removing a broker from a cluster is the reassignment workflow applied deliberately in one direction:
          every partition replica currently living on the broker being removed must be reassigned to remaining
          brokers before that broker is shut down, or the partitions it was hosting lose a replica the moment
          it goes offline — potentially dropping below <code>min.insync.replicas</code> for any partition where
          it was the last replica to be moved.
        </Para>
        <CodeBox label="the safe decommissioning sequence">
{`# 1. Generate a reassignment plan that EXCLUDES the broker being
#    decommissioned from the target broker list entirely
kafka-reassign-partitions.sh --bootstrap-server broker-1:9092 \\
  --topics-to-move-json-file all-topics-on-broker-7.json \\
  --broker-list "1,2,3,4,5,6,8,9"  # broker 7 deliberately excluded \\
  --generate

# 2. Execute with a throttle, exactly as in a normal reassignment
kafka-reassign-partitions.sh --bootstrap-server broker-1:9092 \\
  --reassignment-json-file proposed-reassignment.json \\
  --throttle 30000000 \\
  --execute

# 3. Verify completion -- do not proceed until this confirms done
kafka-reassign-partitions.sh --bootstrap-server broker-1:9092 \\
  --reassignment-json-file proposed-reassignment.json \\
  --verify

# 4. Confirm broker 7 hosts zero partition replicas
kafka-topics.sh --bootstrap-server broker-1:9092 --describe \\
  | grep "broker-7"
# (expect no output -- broker 7 should not appear in any replica list)

# 5. Only now is it safe to shut broker 7 down`}
        </CodeBox>
        <Para>
          Skipping straight to shutting the broker down without completing this sequence is a common and
          entirely avoidable cause of a self-inflicted availability incident — the broker being removed is
          treated exactly like any other broker failure at that point, and if it was still hosting the last
          in-sync replica of any partition, that partition becomes unavailable for writes the moment it goes
          offline, precisely the scenario <code>min.insync.replicas</code> was designed to prevent for a planned,
          controllable operation.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Vertical vs Horizontal Scaling" />
        <SectionTitle>When to Make Brokers Bigger vs When to Add More of Them</SectionTitle>
        <Para>
          Vertical scaling — upgrading existing brokers to more CPU, more RAM, faster disks — and horizontal
          scaling — adding more broker machines — solve different constraints, and conflating them leads to
          scaling the wrong dimension.
        </Para>
        <Table
          headers={['Constraint you\'re actually hitting', 'Right lever', 'Why']}
          rows={[
            ['A single broker\'s CPU is saturated (compression, SSL, request handling) but disk and network have headroom', 'Vertical (more CPU cores) — or horizontal if the bottleneck is concentrated on brokers leading a disproportionate share of partitions', 'More CPU per broker directly relieves a CPU-bound broker without redistributing any data at all.'],
            ['Total cluster disk is running out, evenly across brokers', 'Horizontal (add brokers) or vertical (bigger disks) — horizontal is usually preferred since it also improves fault tolerance per Part 03', 'Both add capacity, but horizontal scaling additionally reduces the blast radius of any single broker failure, which vertical scaling alone does not.'],
            ['One specific broker is a hotspot (uneven partition leadership or a hot key landing disproportionately on it)', 'Reassignment (Part 04) to redistribute load, not necessarily more hardware anywhere', 'Adding capacity everywhere does not fix an uneven distribution problem — the existing capacity just needs to be spread out differently.'],
            ['Cluster-wide throughput ceiling reached with balanced load across all brokers', 'Horizontal (add brokers, then reassign to use them)', 'Every broker is already contributing its fair share; the only way to raise the ceiling is more brokers sharing more of the total load.'],
          ]}
        />
        <Para>
          The general pattern: vertical scaling is the right response to a resource constraint localized to
          existing hardware with no fault-tolerance concern, while horizontal scaling is the right response to a
          genuine capacity ceiling across the whole cluster, and it comes with the fault-tolerance upside from
          Part 03 that vertical scaling alone never provides. In practice, most mature Kafka platforms lean
          horizontal by default for exactly that reason, reserving vertical scaling for narrowly-diagnosed,
          single-resource bottlenecks.
        </Para>
        <SubTitle>The operational cost each direction actually carries</SubTitle>
        <Para>
          It is worth being honest about what each direction costs operationally, not just which resource it
          adds, since the "right lever" from the table above is only the right choice once the operational cost
          is also acceptable.
        </Para>
        <Table
          headers={['Scaling direction', 'What the change requires operationally', 'Typical disruption to production traffic']}
          rows={[
            ['Vertical (resize existing brokers)', 'A rolling restart of each broker onto new hardware or with new resource limits, one at a time, waiting for each to rejoin the ISR before moving to the next.', 'Brief, per-broker — each restarted broker is temporarily unavailable, but replication factor and min.insync.replicas (message brokers module) keep the partition available throughout if done one broker at a time.'],
            ['Horizontal (add brokers)', 'Provisioning new hardware, joining it to the cluster, then a reassignment (Part 04) to actually move data onto it — the new capacity does nothing until reassignment happens.', 'Reassignment traffic itself, throttled per Part 04\'s guidance — no broker restart is required for the new broker to join, only for any rebalancing of leadership that follows.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Planning for Growth" />
        <SectionTitle>Increasing Partition Count on an Existing Topic — and What It Costs</SectionTitle>
        <Para>
          Part 02 covered sizing partition count up front with growth headroom built in, specifically because
          increasing it later is not free. Kafka does allow adding partitions to an existing topic — but doing
          so has a consequence that is easy to overlook until it silently breaks something downstream: it
          changes the key-to-partition mapping for every key in the topic going forward.
        </Para>
        <Para>
          The keys, ordering, and partitioning module established that the default partitioner maps a key to a
          partition deterministically by hashing the key and taking the result modulo the current partition
          count — <code>hash(key) % partition_count</code>. The moment partition count changes, that modulo
          operation produces different results for most keys. Every key does not simply get appended a new
          possible partition; the mapping for existing keys shifts, because the divisor in the formula itself
          changed.
        </Para>
        <CodeBox label="why adding partitions breaks the existing key-to-partition mapping">
{`# Before: 4 partitions
hash("customer-42") % 4 = 2   -> customer-42's events go to partition 2

# After adding partitions: 6 partitions
hash("customer-42") % 6 = 5   -> customer-42's events now go to partition 5

# customer-42's OLD events (produced before the change) are still
# sitting in partition 2. customer-42's NEW events (produced after
# the change) now land in partition 5.

# Consequence: a consumer relying on "all of customer-42's events
# are in the same partition, therefore in order relative to each
# other" is now WRONG going forward -- the same customer's history
# is split across two partitions with no ordering guarantee between
# them, exactly the warning from the keys/ordering/partitioning module`}
        </CodeBox>
        <Para>
          This does not mean partition count can never be increased — it means the decision has to account for
          this cost explicitly, not be treated as a purely capacity-driven, reversible-looking config change.
          Any downstream system relying on per-key ordering, a stateful stream-processing job keyed by the same
          field, or a consumer maintaining local state partitioned the same way, needs to be aware that history
          before the change and new data after the change are not guaranteed to land in the same partition for
          any given key.
        </Para>
        <Table
          headers={['Situation', 'Is increasing partition count on an existing topic safe?', 'Reasoning']}
          rows={[
            ['Topic has no key (round-robin/sticky distribution, no ordering guarantee relied on)', 'Yes, generally safe', 'There was never a per-key ordering guarantee to break in the first place.'],
            ['Topic is keyed, but no consumer relies on per-key ordering across the change', 'Usually safe, but confirm this is actually true for every consumer', 'The mapping still shifts, but if nothing depends on it, the shift has no functional consequence.'],
            ['Topic is keyed and a consumer or stream-processing job relies on all of one key\'s events landing in the same partition', 'Not safe without a plan — requires either creating a new topic with the target partition count and migrating, or accepting a defined transition period with degraded ordering guarantees', 'The key-to-partition mapping change is unavoidable with the default partitioner; the only way around it is to not increase partition count on the same topic in place.'],
          ]}
        />
        <Callout title="When in doubt, create a new topic rather than repartitioning in place" color={K}>
          For any topic where per-key ordering genuinely matters downstream, the safer pattern is to create a
          new topic with the target partition count from the start, and migrate producers and consumers to it
          deliberately (often alongside a dual-write or backfill period), rather than increasing partition count
          on the existing topic and hoping nothing downstream notices the mapping shift. This is a direct
          consequence of getting partition count roughly right up front, per Part 02 — it avoids needing to make
          this trade-off at all.
        </Callout>
        <SubTitle>What increasing partition count does NOT break</SubTitle>
        <Para>
          It is worth being precise about the scope of this cost, since overstating it can lead teams to avoid a
          genuinely safe partition increase out of excess caution. The mapping shift only matters for topics that
          are keyed and where a consumer or downstream system actually depends on per-key ordering being
          preserved across the full history of a key. An unkeyed topic, or a keyed topic where consumers process
          each record independently without caring which partition it lands on, can have its partition count
          increased with no functional consequence at all — the sticky, batch-aware distribution for unkeyed
          records (Module 03) simply spreads across more partitions going forward, and no ordering guarantee
          existed to break in the first place.
        </Para>
        <Table
          headers={['Topic characteristic', 'Cost of increasing partition count in place']}
          rows={[
            ['Unkeyed topic', 'None — records are distributed across whatever partition count currently exists; no mapping to preserve.'],
            ['Keyed topic, consumers process records independently of partition assignment', 'None functionally, though downstream systems relying on a stable partition-count assumption for their own sharding should still be checked.'],
            ['Keyed topic, a consumer or stream job relies on same-key-same-partition for ordering or local state co-location', 'Real — per-key history splits across old and new partition mappings with no ordering guarantee between them, as this Part covers in depth.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Multi-Tenancy and Quotas" />
        <SectionTitle>quota.producer.default and quota.consumer.default — Preventing One Team From Starving the Cluster</SectionTitle>
        <Para>
          A shared Kafka cluster serving many teams' topics has a resource-contention problem that is invisible
          until it happens: nothing stops one team's producer or consumer, whether through a genuine traffic
          spike or a bug (a retry loop, a misconfigured backfill job replaying far more data than intended),
          from consuming enough of the cluster's network and I/O capacity to degrade every other team's topics
          sharing the same brokers — even though those other topics did nothing wrong.
        </Para>
        <Para>
          Kafka's quota mechanism addresses this directly by capping the byte-rate (and, separately, request
          rate) any given client — identified by client ID, authenticated user, or both — can produce or consume
          at, cluster-wide. A client that exceeds its quota is not rejected outright; instead, the broker throttles
          it by delaying its responses just enough to bring its effective rate back under the configured limit,
          which the client-side library surfaces as added latency rather than an outright error.
        </Para>
        <CodeBox label="setting cluster-wide default quotas">
{`kafka-configs.sh --bootstrap-server broker-1:9092 \\
  --alter --add-config 'producer_byte_rate=10485760,consumer_byte_rate=10485760' \\
  --entity-type clients --entity-default

# 10485760 bytes/sec = 10 MB/sec, applied as a DEFAULT for every
# client ID that does not have a more specific override

# Per-client override for a team that legitimately needs more:
kafka-configs.sh --bootstrap-server broker-1:9092 \\
  --alter --add-config 'producer_byte_rate=52428800,consumer_byte_rate=52428800' \\
  --entity-type clients --entity-name checkout-service-producer`}
        </CodeBox>
        <Para>
          Quotas are typically applied at three levels of specificity, resolved from most to least specific:
          a named client-ID or user override, a default applied to all clients, or in more granular
          multi-tenant setups, a combination keyed on both user and client ID together — letting a platform
          team set a safe cluster-wide default while still granting specific, known-legitimate high-volume
          producers or consumers a higher explicit limit.
        </Para>
        <Table
          headers={['Without quotas', 'With quotas']}
          rows={[
            ['A single misbehaving producer (retry loop, bug) can consume unbounded broker network/I/O capacity.', 'The same producer is throttled at a configured byte-rate ceiling, capping its worst-case impact on shared infrastructure.'],
            ['Diagnosing "why is everything slow" during an incident requires checking every team\'s traffic individually.', 'A quota violation shows up as a specific, attributable throttling metric on the offending client — the incident points directly at its cause.'],
            ['Onboarding a new team\'s workload onto a shared cluster is a trust exercise with no technical backstop.', 'A new team\'s workload has a known, bounded worst-case impact from day one, regardless of bugs on their side.'],
          ]}
        />
        <Callout title="Quotas are a multi-tenancy safety net, not a substitute for capacity planning" color="#38bdf8">
          Quotas bound the worst case for any one client — they do not replace the disk and broker sizing math
          from Parts 01-03. A cluster correctly sized for its aggregate expected load, with quotas protecting
          against any single tenant exceeding their fair share, is a materially safer posture than either
          practice alone.
        </Callout>
        <SubTitle>Request-rate quotas, not just byte-rate quotas</SubTitle>
        <Para>
          Byte-rate quotas protect against a client sending or receiving too much data, but a separate failure
          mode exists even for a client whose byte volume is modest: a client issuing an excessive number of
          small requests per second (a misconfigured polling loop with an unreasonably tight interval, for
          example) can consume a disproportionate share of broker request-handling capacity — the thread pools
          covered in the performance tuning module — without ever approaching a byte-rate limit at all, since
          each individual request carries very little data. Kafka's quota system separately supports a
          request-percentage quota (<code>request_percentage</code>) that caps the percentage of a broker's
          request-handling and network-thread time a given client is allowed to consume, addressing exactly this
          gap.
        </Para>
        <Table
          headers={['Quota type', 'What it bounds', 'Catches']}
          rows={[
            ['producer_byte_rate / consumer_byte_rate', 'Bytes per second a client can produce or consume.', 'A high-volume traffic spike or a bug replaying large amounts of data.'],
            ['request_percentage', 'Percentage of broker request-handling thread time a client can consume.', 'A client issuing excessive numbers of small, low-byte-volume requests — a tight polling loop, a misconfigured retry storm — that byte-rate quotas alone would not catch.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Worked Capacity-Planning Example" />
        <SectionTitle>Sizing a Clickstream Ingestion System From Scratch</SectionTitle>
        <Para>
          Pulling every piece of this module together: a hypothetical e-commerce platform needs to ingest
          clickstream events — page views, clicks, add-to-cart actions — into Kafka for real-time
          personalization and downstream warehouse loading.
        </Para>
        <SubTitle>The inputs</SubTitle>
        <Table
          headers={['Input', 'Value']}
          rows={[
            ['Peak events per second', '80,000 events/sec'],
            ['Average event size', '600 bytes (JSON payload with user, page, and interaction metadata)'],
            ['Retention window', '5 days (enough for reprocessing and short-term replay needs, not indefinite storage)'],
            ['Replication factor', '3 (standard durability for a business-relevant topic, per the durability guidance in the message brokers module)'],
            ['Required consumer parallelism at peak', 'Personalization service needs to sustain the full peak rate; a single consumer instance benchmarked (per the performance module\'s methodology) at ~6,000 events/sec sustained'],
          ]}
        />
        <SubTitle>Step 1 — throughput in bytes/sec</SubTitle>
        <CodeBox label="throughput calculation">
{`peak_throughput = 80,000 events/sec * 600 bytes/event
                = 48,000,000 bytes/sec
                ≈ 48 MB/sec`}
        </CodeBox>
        <SubTitle>Step 2 — disk needed, using Part 01's formula</SubTitle>
        <CodeBox label="disk calculation">
{`disk_needed = throughput_bytes_per_sec * retention_seconds * replication_factor

retention_seconds = 5 * 24 * 60 * 60 = 432,000 seconds

disk_needed = 48,000,000 * 432,000 * 3
            = 62,208,000,000,000 bytes
            ≈ 56.6 TB raw need, cluster-wide

# Real provisioning adds headroom -- never provision to exactly the
# calculated minimum. A common approach is to size for ~65-70% target
# disk utilization at peak retained volume, leaving room for:
#   - traffic growth between now and the next capacity review
#   - temporary spikes above the modeled peak
#   - operational headroom for reassignment, log cleanup lag, etc.

target_provisioned = 56.6 TB / 0.65 ≈ 87 TB total provisioned disk`}
        </CodeBox>
        <SubTitle>Step 3 — partition count, using Part 02's parallelism math</SubTitle>
        <CodeBox label="partition count calculation">
{`min_consumers_needed = 80,000 events/sec / 6,000 events/sec per consumer
                      ≈ 13.3, round up to 14

# Apply growth + skew headroom per Part 02
partition_count = 14 * 1.5 ≈ 21, round to 24 for a clean number

# 24 partitions supports up to 24 parallel consumers in the
# personalization group later, well above today's 14-consumer need`}
        </CodeBox>
        <SubTitle>Step 4 — broker count, using Part 03's guidelines</SubTitle>
        <CodeBox label="broker count calculation">
{`# Target: no single broker holding more than ~15% of cluster
# capacity (Part 03's blast-radius guidance), and enough brokers
# to comfortably host 24 partitions * 3 replicas = 72 partition
# replicas without overloading any one broker

# 87 TB total provisioned disk, assuming brokers with 8 TB of
# usable disk each (a reasonable mid-size broker disk footprint):

broker_count = 87 TB / 8 TB per broker ≈ 11, round up to 12 brokers

# Sanity check against the "no broker >15% of capacity" guideline:
# 1 / 12 ≈ 8.3% per broker -- comfortably under the 15% threshold

# Sanity check against partition distribution:
# 72 total partition replicas / 12 brokers = 6 replicas per broker
# on average -- a reasonable, well-distributed load per broker`}
        </CodeBox>
        <SubTitle>The result</SubTitle>
        <HighlightBox>
          <Para>
            <strong>Final sizing:</strong> a 24-partition topic, replication factor 3, retained for 5 days,
            spread across a 12-broker cluster with roughly 8 TB of usable disk per broker (≈96 TB total
            provisioned, comfortably covering the 87 TB target with additional margin), sized so no single
            broker holds more than roughly 8% of total cluster capacity — well under the fault-tolerance
            threshold from Part 03 — while supporting up to 24 parallel consumers in the personalization
            group, well above today's measured 14-consumer requirement.
          </Para>
        </HighlightBox>
        <Para>
          Every number in this plan traces back to a measured or reasonably estimated input from Part 01, run
          through the specific formulas from Parts 02 and 03 — nothing here was chosen by instinct or copied
          from an unrelated system's configuration. This traceability is exactly what makes a capacity plan
          defensible in a design review, and exactly what makes it possible to revisit and recalculate cleanly
          when actual traffic patterns diverge from the original estimate six months later.
        </Para>
        <SubTitle>A sensitivity check — what if the peak-throughput estimate is wrong?</SubTitle>
        <Para>
          Since peak throughput for a genuinely new system is an estimate rather than a measurement, it is worth
          checking how much the plan changes if that estimate turns out to be significantly off, in either
          direction — this is standard practice for any estimate-driven plan, not unique to Kafka.
        </Para>
        <CodeBox label="re-running the plan at 2x the original throughput estimate">
{`# If peak throughput turns out to be 160,000 events/sec instead of
# the original 80,000 estimate (a 2x miss):

peak_throughput = 160,000 * 600 bytes ≈ 96 MB/sec  (2x the original)

disk_needed = 96,000,000 * 432,000 * 3 ≈ 124.4 TB raw  (2x the original)
target_provisioned = 124.4 / 0.65 ≈ 191 TB  (2x the original)

min_consumers_needed = 160,000 / 6,000 ≈ 27, round up to 28
partition_count = 28 * 1.5 ≈ 42, round to 48

broker_count = 191 / 8 ≈ 24 brokers

# Notice the plan scales roughly linearly with throughput across
# every dimension -- disk, partitions, and brokers all roughly
# double when throughput doubles. This linearity is itself a
# useful property to confirm: it means a capacity plan built on an
# imperfect initial estimate degrades gracefully into "provision
# more of the same shape" rather than requiring an entirely
# different architecture if the estimate turns out to be wrong.`}
        </CodeBox>
        <Para>
          This kind of sensitivity check is a cheap, valuable step to include in any capacity plan presented for
          review — it demonstrates the plan was reasoned through deliberately, shows stakeholders what the cost
          of an estimation miss actually looks like in concrete terms, and often surfaces which single input
          (usually peak throughput, for a genuinely new system) the whole plan is most sensitive to, which is
          exactly the input worth re-measuring first and most frequently once real traffic starts flowing, per
          Part 09's ongoing review guidance.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — A Capacity Review Checklist" />
        <SectionTitle>Revisiting a Plan as Real Traffic Diverges From the Original Estimate</SectionTitle>
        <Para>
          Part 08's worked example produced a specific, numbered plan — but a capacity plan is not a one-time
          artifact. Real traffic grows, shrinks, and shifts shape in ways the original estimate could not fully
          predict, and a plan that was correct on day one can become quietly wrong six months later if nobody
          revisits it. This closing section is a practical checklist for what a periodic capacity review should
          actually check, tying every earlier part of this module back into a repeatable process.
        </Para>
        <SubTitle>What changed since the last review</SubTitle>
        <Table
          headers={['Input from Part 01', 'What to check on a periodic review', 'What a meaningful change implies']}
          rows={[
            ['Peak throughput', 'Compare current measured peak MB/s against the figure the current plan was sized around, not the average.', 'Recalculate disk_needed (Part 01) and re-check whether partition count still covers required consumer parallelism (Part 02).'],
            ['Average message size', 'Check whether payload shape has grown (new fields, richer events) since the original estimate.', 'Throughput in bytes/sec can rise even with a stable events/sec rate — disk math depends on bytes, not event count alone.'],
            ['Retention window', 'Confirm the business requirement for retention has not changed (compliance, replay needs, downstream consumer requirements).', 'A retention increase multiplies disk need directly, per the Part 01 formula — this is often a policy decision made without anyone re-running the disk math.'],
            ['Replication factor', 'Confirm no durability requirement change has occurred for this topic.', 'Same multiplicative effect on disk as retention — a durability upgrade from RF=2 to RF=3 is a real, sometimes large capacity decision.'],
            ['Required consumer parallelism', 'Check whether any new consumer group has been added to this topic, or an existing one\'s throughput need has grown.', 'A new, independent consumer group does not consume additional partitions from other groups (Module 03), but a growing single group can approach the existing partition-count ceiling.'],
          ]}
        />
        <SubTitle>Signals that a review is overdue, even before a scheduled date</SubTitle>
        <BulletList
          items={[
            'Broker disk utilization trending toward Part 07\'s target ceiling (e.g. the 65-70% target used in the worked example) faster than the original growth projection assumed.',
            'A consumer group consistently running at or near partition count in active consumers — the parallelism ceiling from Part 02 is close to being reached.',
            'Quota throttling metrics (Part 07) showing a specific team\'s legitimate traffic being capped by a default quota that was sized for a smaller workload.',
            'A broker repeatedly showing up as a hotspot in monitoring — a signal that either partition distribution needs reassignment (Part 04) or the broker-count-to-load ratio from Part 03 needs revisiting.',
            'A new topic being proposed with an ordering requirement and a rough initial-load estimate that suggests it will need to grow partition count later — worth sizing generously up front per Part 02, rather than accepting the repartitioning cost from Part 06 as a near-certain future event.',
          ]}
        />
        <Callout title="A capacity plan is a living document, not a one-time calculation" color={K}>
          Treat the inputs from Part 01 as values to be re-measured on a regular cadence (quarterly is a common
          starting interval for a actively growing system, longer for a stable one), not constants set once at
          launch. The worked example in Part 08 is exactly as valid six months later only if its underlying
          inputs have not meaningfully changed — and the only way to know that is to actually check.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Kafka Scaling and Capacity Planning</SectionTitle>
        {[
          {
            wrong: '"Adding a broker to the cluster automatically rebalances existing data onto it"',
            right: 'Part 04 is explicit that a newly joined broker only receives new partitions created after it joins — every existing partition stays exactly where it was until an explicit kafka-reassign-partitions.sh reassignment moves some of it over. A new broker sitting idle after joining is the expected default behavior, not a bug.',
          },
          {
            wrong: '"More partitions is always better for scalability, so oversize partition count generously"',
            right: 'Part 02 covers the real ceiling — every partition adds ongoing metadata, file-handle, and rebalance-coordination overhead across the cluster, and very high cluster-wide partition counts have been a documented source of slower controller failover. The right target is enough for realistic peak parallelism plus growth headroom, not the largest number that technically works.',
          },
          {
            wrong: '"Fewer, bigger brokers is simpler to operate and therefore the better default"',
            right: 'Part 03 covers the fault-tolerance cost this trades away — at equal total capacity, fewer bigger brokers means each broker failure takes out a larger fraction of cluster leadership simultaneously. More, smaller brokers reduce blast radius at the same hardware budget, which is usually worth the modest added operational surface.',
          },
          {
            wrong: '"Reassigning partitions is a safe, low-impact operation since it just moves data between machines already in the same cluster"',
            right: 'Part 04 is explicit that reassignment means copying a partition\'s full retained log over the network between brokers — real, sustained I/O and network load that competes directly with production traffic if left unthrottled. The --throttle flag is a required safeguard for any reassignment of meaningful size, not an optional tuning knob.',
          },
          {
            wrong: '"Increasing partition count on an existing topic is just a capacity change with no other consequences"',
            right: 'Part 06 covers the real cost: the default partitioner\'s hash(key) % partition_count mapping shifts for most existing keys the moment partition count changes, splitting a given key\'s event history across two partitions with no ordering guarantee between them going forward — a serious concern for any consumer relying on per-key ordering.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red,#ff4757)', marginBottom: 8, fontFamily: FONT_MONO }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// What This Looks Like at Work" />
        <SectionTitle>What This Looks Like on Day One</SectionTitle>
        <HighlightBox>
          <Para>
            <strong>At Grubhub:</strong> an order-events topic is approaching its provisioned disk capacity
            faster than projected, after a successful new-market launch. Following Part 01's disk formula, the
            platform team recalculates disk_needed using the new, higher measured throughput and confirms the
            existing 5-day retention and replication factor of 3 are unchanged assumptions — the only input that
            moved was throughput — and uses that recalculation to justify and correctly size an urgent broker
            disk expansion, rather than guessing at a round number under time pressure.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Pinterest:</strong> a data platform team decommissioning an older broker generation
            follows Part 04's reassignment workflow precisely: generate a plan moving that broker's partitions
            onto its replacements, execute with a conservative --throttle value calculated against the
            replacement brokers' known spare network capacity, and confirm completion with --verify before
            finally shutting the old broker down — avoiding the kind of unthrottled-reassignment incident that
            had previously degraded an unrelated topic sharing the same broker during a rushed migration.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Yelp:</strong> a shared internal Kafka cluster serving many engineering teams sees a
            newly onboarded team's backfill job, due to a bug, attempt to replay months of historical data at
            far higher than its normal rate. Because quota.producer.default was already configured per Part 07,
            the runaway producer is throttled at the cluster-wide default byte rate instead of degrading every
            other team's topics sharing the same brokers — the incident shows up as a specific, attributable
            throttling metric on that one client, and is resolved by raising that team's specific quota after
            confirming the higher rate is intentional, rather than as a cluster-wide outage.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. Walk me through how you would calculate how much disk a new Kafka topic needs.',
            a: `I'd start from four inputs: expected peak throughput in bytes per second, average message size (which combined with an events-per-second estimate gives you the throughput figure if you don't already have it directly), the retention window in seconds, and the replication factor.

The formula is disk_needed = throughput_bytes_per_sec * retention_seconds * replication_factor. It's important that replication factor multiplies the whole retained dataset, not just new data — going from replication factor 2 to 3 isn't a 50% increase in overall disk use, it's a full extra copy of everything retained, which can be a much bigger number than people expect on an already-large topic.

I'd also make sure I'm using peak throughput, not a daily average, since disk needs to hold whatever volume actually arrives, and a topic that spikes well above its average during a specific window still needs to be sized for that spike. Finally, I would never provision to exactly the calculated minimum — I'd add real headroom, commonly targeting something like 65-70% disk utilization at the calculated peak retained volume, to leave room for growth, temporary spikes above the model, and operational overhead like reassignment traffic.`,
          },
          {
            q: 'Q2. How do you decide how many partitions a topic should have?',
            a: `The floor is driven by the maximum realistic consumer parallelism you'll need — since only one consumer in a group can read a given partition at a time, partition count caps how many consumers can process a topic in parallel within one group. I'd estimate peak required throughput divided by a benchmarked per-consumer sustained throughput to get a minimum consumer count, then set partition count at least that high, with headroom for growth and for the fact that key distribution is rarely perfectly even in practice.

The ceiling matters just as much, though it's less intuitive. Every partition is ongoing overhead — more open file handles per broker, more metadata for the controller to track and propagate, more coordination work during a consumer group rebalance. Very high partition counts cluster-wide have been a documented cause of slower leader election and controller failover. So I wouldn't just pick the largest number that seems safe; I'd size for something like 18-24 months of realistic growth in required parallelism, since increasing partition count later on an existing topic has a real cost — it changes the key-to-partition hash mapping for every key going forward, which can break per-key ordering guarantees downstream consumers were relying on.`,
          },
          {
            q: 'Q3. Why might a platform team choose more, smaller Kafka brokers over fewer, larger ones at the same total capacity?',
            a: `It comes down to fault tolerance and blast radius. At a fixed total capacity budget, fewer, larger brokers each host a bigger share of the cluster's partition leadership. When one of them fails, a bigger fraction of the cluster's partitions need simultaneous leader re-election, and the remaining brokers have to absorb a bigger proportional increase in load to cover the loss.

With more, smaller brokers at the same total capacity, each one holds a smaller share, so a single broker failure is a smaller, easier-to-absorb event — both in terms of how much leadership needs re-electing at once and how much extra load the survivors need to pick up. A common practical target is keeping any single broker under roughly 15% of total cluster capacity, specifically so no single failure event is disproportionately disruptive.

The trade-off isn't free — more brokers means more machines to patch, monitor, and manage, and more replication connections between them — but for a production cluster where fault tolerance matters, that operational overhead is usually worth it. I wouldn't take this to an extreme either; going very small on broker size just to minimize blast radius runs into its own overhead and diminishing returns, similar to what happens with an oversized partition count.`,
          },
          {
            q: 'Q4. Why is it important to throttle a Kafka partition reassignment, and what happens if you don\'t?',
            a: `Reassigning a partition replica to a different broker means copying that partition's entire retained log — everything within its retention window — over the network from the source broker to the destination broker. That's real, sustained disk and network I/O, not a lightweight metadata update, and it happens on top of whatever normal production traffic those brokers are already serving.

If you don't throttle it, that reassignment traffic competes directly with production reads, writes, and normal replication for the same disk and network bandwidth. On a large topic, this can be severe enough to spike latency for completely unrelated topics that happen to share the same broker, and in a bad case can even trigger under-replicated-partition alerts on other topics because normal replication traffic is being starved.

The --throttle flag on kafka-reassign-partitions.sh caps how much bandwidth the reassignment itself is allowed to consume, trading reassignment speed for production stability — I'd pick a throttle value based on the actual spare capacity the involved brokers have after accounting for their existing production load, and I'd always follow up with --verify to confirm the reassignment actually completed rather than assuming it did.`,
          },
          {
            q: 'Q5. What are Kafka quotas, and what problem do they solve in a shared, multi-tenant cluster?',
            a: `Quotas — quota.producer.default and quota.consumer.default, plus per-client or per-user overrides — cap the byte rate a given client can produce or consume at, enforced by the broker throttling that client's requests rather than rejecting them outright. The client experiences this as added latency, not an error.

The problem they solve is that on a shared cluster hosting many teams' topics, nothing else stops one team's producer or consumer — whether from a genuine traffic spike or a bug, like a retry loop or a backfill job replaying far more data than intended — from consuming enough network or disk I/O to degrade every other team's topics on the same brokers, even though those other topics did nothing wrong.

With a sane cluster-wide default in place and specific, deliberate overrides for teams with genuinely higher legitimate needs, a misbehaving client gets throttled at a known, bounded worst-case impact instead of causing a shared-infrastructure incident, and when it does happen, it shows up as a specific, attributable throttling metric on that one client rather than a mysterious cluster-wide slowdown that takes time to trace back to its source. I'd be clear that quotas are a safety net on top of correct capacity planning, not a substitute for it — a cluster still needs to be sized correctly for its aggregate expected load in the first place.`,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>The Mistakes That Undermine Kafka Capacity Planning</SectionTitle>
        {[
          {
            q: 'Sizing disk and throughput needs against average load instead of peak load',
            a: 'Part 01 covers why this leaves no headroom for the busiest moments — a topic that spikes well above its daily average during a specific window still needs to be sized for that spike, or the cluster falls behind or rejects writes precisely when the data matters most.',
          },
          {
            q: 'Assuming a newly added broker automatically absorbs some of the existing cluster load',
            a: 'Part 04 is explicit that this does not happen automatically — every existing partition stays on its original brokers until an explicit kafka-reassign-partitions.sh reassignment moves it, which is a common source of "why isn\'t the new broker doing anything" confusion.',
          },
          {
            q: 'Running a large partition reassignment without a --throttle value',
            a: 'Part 04 covers the real cost: reassignment copies a partition\'s full retained log over the network, competing directly with production traffic for disk and network bandwidth if left unthrottled, and can degrade latency for unrelated topics sharing the same broker.',
          },
          {
            q: 'Increasing partition count on an existing, actively-consumed keyed topic without checking whether any consumer relies on per-key ordering',
            a: 'Part 06 covers the mechanism: the default partitioner\'s key-to-partition hash mapping shifts for most keys the moment partition count changes, silently splitting a key\'s event history across partitions with no ordering guarantee between the old and new data.',
          },
          {
            q: 'Treating quotas as a substitute for correct capacity planning rather than a complement to it',
            a: 'Part 07 is explicit that quotas bound the worst-case impact of any single client — they do not replace the disk, partition, and broker sizing math from earlier parts. A correctly sized cluster with quotas as a safety net is meaningfully safer than either practice alone.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Symptoms You Will Hit While Scaling — And Exactly Why They Happen</SectionTitle>
        {[
          {
            error: `a newly added broker shows near-zero disk and network utilization while other brokers in the same cluster remain near capacity`,
            cause: 'Per Part 04, joining a cluster does not move any existing partition data onto the new broker automatically — it only becomes eligible to host partitions created after it joins, so every pre-existing partition stays exactly where it was until an explicit reassignment happens.',
            fix: 'Generate a reassignment plan with kafka-reassign-partitions.sh --generate that includes the new broker in the target broker list, review the proposed assignment, and execute it with an appropriate --throttle value to actually move some existing load onto the new broker.',
          },
          {
            error: `production produce/consume latency spikes noticeably, and under-replicated-partitions briefly fires for topics unrelated to a reassignment that was just started`,
            cause: 'Per Part 04, the reassignment was executed without a --throttle value (or with one set too high), so the network and disk I/O required to copy the moved partitions\' full retained logs is competing directly with normal production traffic and normal replication traffic on the same brokers.',
            fix: 'Cancel or wait out the current reassignment, then re-run future reassignments with a --throttle value calculated against the actual spare network/disk capacity the involved brokers have after accounting for their existing production load.',
          },
          {
            error: `a consumer or stream-processing job that relies on all of one key\'s events being processed in order starts seeing out-of-order results shortly after a topic\'s partition count was increased`,
            cause: 'Per Part 06, the default partitioner\'s hash(key) % partition_count mapping shifted for most existing keys the moment partition count changed — a given key\'s history is now split between its old partition and a new one, with no ordering guarantee between them.',
            fix: 'For topics where per-key ordering matters, avoid increasing partition count on the topic in place going forward — migrate to a new topic created with the target partition count from the start, using a deliberate migration plan rather than an in-place partition increase.',
          },
          {
            error: `one team\'s traffic spike or backfill bug causes noticeably degraded latency across unrelated topics sharing the same Kafka cluster`,
            cause: 'Per Part 07, no quota was configured (or the configured default was too permissive), so nothing capped that team\'s producer or consumer byte rate, letting it consume enough shared network and disk I/O capacity to degrade every other tenant on the same brokers.',
            fix: 'Configure quota.producer.default and quota.consumer.default cluster-wide as a safety net, with specific, deliberate per-client overrides for teams with genuinely higher legitimate throughput needs, so any single client\'s worst-case impact is bounded going forward.',
          },
          {
            error: `disk usage on brokers hosting a specific topic is approaching capacity noticeably faster than the original capacity plan projected`,
            cause: 'Per Part 01 and the worked example in Part 08, one or more of the original planning inputs — measured peak throughput, average message size, or retention window — has changed since the plan was made, most commonly due to real traffic growth exceeding the original estimate.',
            fix: 'Recalculate disk_needed using current measured throughput and confirm which input actually moved before provisioning more disk, so the new capacity target is based on updated real numbers rather than an arbitrary round-number expansion.',
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
          'Disk capacity planning reduces to one formula — disk_needed = throughput_bytes_per_sec * retention_seconds * replication_factor — always calculated against peak throughput, not average, and always provisioned with real headroom above the raw calculated minimum.',
          'Partition count should cover realistic peak consumer parallelism plus growth headroom (commonly 18-24 months out), because increasing it later on an existing topic shifts the default partitioner\'s key-to-partition hash mapping for every existing key, breaking per-key ordering guarantees downstream consumers may rely on.',
          'Broker sizing balances CPU, memory (mostly for OS page cache, not JVM heap), disk, and network — and network capacity must account for replication traffic (roughly throughput times replication factor on the leader side), not just producer-facing throughput.',
          'More, smaller brokers usually beat fewer, bigger brokers at equal total capacity, because a single broker failure takes out a smaller fraction of cluster leadership and load — a common target is keeping any one broker under ~15% of total cluster capacity.',
          'A newly added broker does not automatically receive any existing data — kafka-reassign-partitions.sh must be run explicitly, always with a --throttle value, since reassignment means copying a partition\'s full retained log over the network and can otherwise degrade unrelated production traffic sharing the same brokers.',
          'Vertical scaling (bigger brokers) fits a localized resource bottleneck with no fault-tolerance concern; horizontal scaling (more brokers) fits a genuine cluster-wide capacity ceiling and additionally improves fault tolerance — most mature platforms lean horizontal by default.',
          'quota.producer.default and quota.consumer.default cap any single client\'s byte rate on a shared cluster, bounding the worst-case impact of a traffic spike or a buggy producer/consumer on every other tenant — a safety net that complements, but never replaces, correct capacity planning.',
          'A defensible capacity plan traces every number — disk, partition count, broker count — back to a measured or estimated input (throughput, message size, retention, replication factor, required parallelism) run through a specific formula, not chosen by instinct or copied from an unrelated system.',
        ]}
      />
    </LearnLayout>
  )
}
