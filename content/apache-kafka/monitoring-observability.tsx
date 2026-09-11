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

export default function MonitoringObservability() {
  return (
    <LearnLayout
      title="Monitoring and Observability"
      description="Why Kafka needs monitoring beyond generic host metrics: the critical broker, producer, and consumer metrics, how they are exposed via JMX and scraped by Prometheus, setting alert thresholds that catch real problems, and diagnosing a real consumer lag incident step by step."
      section="Apache Kafka — Module 16"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Monitoring and Observability', href: '/learn/apache-kafka/monitoring-observability' },
      ]}
      prev={{ title: 'Kafka Security: TLS, SASL, and ACLs', href: '/learn/apache-kafka/security-acls-sasl-tls' }}
      next={{ title: 'Performance Tuning', href: '/learn/apache-kafka/performance-tuning' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why generic host metrics are not enough" />
        <SectionTitle>Kafka's Health Is a Distributed-Systems Question, Not a Host Question</SectionTitle>
        <Para>
          CPU usage, memory usage, and disk usage are the metrics most engineers reach for first when
          deciding whether a server is healthy, and they are necessary for Kafka too. They are also
          dangerously insufficient on their own. A broker can show comfortable CPU headroom, plenty of free
          memory, and disk usage well under any alarm threshold, while the cluster is actively losing its
          durability guarantees, a consumer group is silently falling further behind every second, or the
          cluster's single controller has gone missing — none of which shows up as a spike on a generic
          host dashboard.
        </Para>
        <Para>
          This is because Kafka's correctness depends on distributed-systems-specific state that has no
          analog on a single machine: how many replicas of a partition are actually caught up right now, how
          many messages a consumer group has accumulated but not yet processed, whether exactly one broker
          in the cluster currently believes it is the controller. A host-level dashboard has no concept of
          any of these things — they live inside Kafka's own internal bookkeeping, and Kafka exposes them
          through its own metrics, not through anything the operating system reports.
        </Para>
        <HighlightBox>
          <Para>
            <strong>The mental model shift this module asks for:</strong> a healthy-looking host does not
            mean a healthy cluster. The signals that actually predict a Kafka incident — before it becomes
            visible to end users — are broker replication state, consumer lag, and controller stability.
            These are covered in Parts 02 through 04, and they are the metrics worth building dashboards and
            alerts around first, well ahead of generic infrastructure metrics.
          </Para>
        </HighlightBox>
        <Callout title="Why this matters operationally" color={K}>
          Teams that monitor only host-level metrics for Kafka tend to discover problems the same way: a
          downstream consumer starts complaining about stale or missing data, and only then does anyone look
          at Kafka-specific metrics and find a replication or lag problem that had been building for hours.
          The metrics in this module are what let you find that same problem in minutes, before a downstream
          team notices anything.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Under-replicated partitions" />
        <SectionTitle>Under-Replicated Partitions: the Single Most Important Cluster-Health Signal</SectionTitle>
        <Para>
          A partition is under-replicated when the number of replicas currently in its in-sync replica (ISR)
          set is smaller than its configured replication factor. If a topic has replication factor 3 and one
          follower has fallen behind or gone offline, that partition now has only 2 replicas in its ISR — it
          is under-replicated, even though the leader is still healthy and still serving reads and writes
          normally. Nothing about this is visible from the outside; clients keep working exactly as before.
        </Para>
        <Para>
          This metric matters more than almost any other because it is a direct, real-time measurement of
          how much durability margin the cluster currently has. A partition with replication factor 3 that
          is fully in sync can lose any single broker without losing data. The same partition, already
          under-replicated by one, is now one more broker failure away from data loss or unavailability — the
          exact safety margin that <code>acks=all</code> and <code>min.insync.replicas</code> depend on has
          quietly shrunk, with no other symptom yet visible.
        </Para>
        <CodeBox label="checking under-replicated partitions via the CLI">
{`kafka-topics.sh --bootstrap-server broker1:9092 --describe --under-replicated-partitions

# A healthy cluster returns nothing here — empty output is the
# expected, correct state. Any line returned is a partition that
# currently has fewer in-sync replicas than its replication factor.`}
        </CodeBox>
        <Output>{`Topic: freshcart.orders  Partition: 2  Leader: 3  Replicas: 1,2,3  Isr: 1,3
  (broker 2 is missing from the ISR — this partition is under-replicated)`}</Output>
        <Para>
          The JMX metric behind this is
          <code>kafka.server:type=ReplicaManager,name=UnderReplicatedPartitions</code>, exposed as a simple
          integer count per broker. A cluster-wide dashboard typically sums this across all brokers, because
          a single under-replicated partition anywhere in the cluster is worth investigating regardless of
          which broker reports it.
        </Para>
        <SubTitle>What causes a partition to become under-replicated</SubTitle>
        <BulletList
          items={[
            'A follower broker crashes, is restarted for maintenance, or is network-partitioned from the leader — the most common and usually self-resolving cause.',
            'A follower is alive and reachable but cannot keep up with the leader\'s write rate — often a sign of disk I/O saturation or an undersized broker relative to actual throughput.',
            'A large, sudden burst of writes to a partition outpaces what followers can fetch and replicate in the configured replica.lag.time.max.ms window, temporarily dropping them out of the ISR.',
          ]}
        />
        <Callout title="This is not just a broker metric — it is the metric" color="#ff4757">
          If a team can watch only one Kafka metric, this is the one to pick. It is the earliest, most direct
          signal that the cluster's actual durability no longer matches what the topic's replication factor
          promises on paper.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Request handler / network handler idle ratio" />
        <SectionTitle>Handler Idle Ratio: How Close a Broker Is to Saturation</SectionTitle>
        <Para>
          Each broker runs a fixed-size pool of network threads (which read requests off the wire and write
          responses back) and a fixed-size pool of I/O request handler threads (which actually process those
          requests — appending to the log, serving a fetch, and so on). The idle ratio for each pool is the
          fraction of time, over a measurement window, that threads in that pool were sitting idle rather
          than actively working.
        </Para>
        <Para>
          A ratio near 1.0 means the pool is mostly idle — plenty of spare capacity. A ratio approaching 0
          means threads are almost always busy, which means new requests are starting to queue rather than
          being handled immediately, and client-observed latency is about to climb even though nothing has
          crashed. This metric tends to give earlier warning of an overloaded broker than raw CPU usage does,
          because a broker can be CPU-comfortable while its fixed-size handler thread pools are still the
          actual bottleneck.
        </Para>
        <Table
          headers={['Metric', 'JMX bean', 'What a falling value means']}
          rows={[
            ['Request handler idle ratio', 'kafka.server:type=KafkaRequestHandlerPool,name=RequestHandlerAvgIdlePercent', 'The threads that append to the log and serve fetches are increasingly saturated — requests start queuing.'],
            ['Network handler idle ratio', 'kafka.network:type=SocketServer,name=NetworkProcessorAvgIdlePercent', 'The threads reading requests off the network and writing responses are saturated — often the earliest sign of a broker approaching its connection/throughput ceiling.'],
          ]}
        />
        <Para>
          Both ratios trending steadily downward over days or weeks, rather than only spiking briefly during
          a known traffic peak, is the pattern worth treating as a capacity-planning signal — it usually
          means organic growth in producer or consumer traffic has outpaced the broker's current sizing, and
          the fix is either scaling the cluster out (more brokers, more partitions) or tuning
          <code>num.io.threads</code> and <code>num.network.threads</code> if the bottleneck is genuinely
          thread-pool sizing rather than raw broker capacity.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Active controller count" />
        <SectionTitle>Active Controller Count: Should Always Be Exactly 1</SectionTitle>
        <Para>
          As covered in the producers-and-brokers module, every Kafka cluster has exactly one active
          controller broker responsible for cluster-wide coordination — electing new partition leaders,
          propagating metadata changes, tracking ISR membership. The metric
          <code>kafka.controller:type=KafkaController,name=ActiveControllerCount</code> reports 1 on the
          broker that currently holds the controller role, and 0 on every other broker. Summed across the
          cluster, the total should always equal exactly 1.
        </Para>
        <CodeBox label="reading active controller count across a 3-broker cluster">
{`broker-1: kafka.controller:...ActiveControllerCount = 0
broker-2: kafka.controller:...ActiveControllerCount = 1   <- current controller
broker-3: kafka.controller:...ActiveControllerCount = 0

sum across cluster = 1   <- healthy, expected state`}
        </CodeBox>
        <Para>
          A cluster-wide sum of 0 means no broker currently believes it is the controller — cluster
          coordination is stalled, and no leadership changes can be processed until a new controller is
          elected. A sum greater than 1, briefly, can happen during the short window of a controller
          failover as the old controller is stepping down and a new one is taking over; a sum greater than 1
          that persists is a serious split-brain-adjacent condition where two brokers disagree about cluster
          leadership, which risks inconsistent metadata propagation across the cluster.
        </Para>
        <Callout title="Alert on != 1, not just on 0" color="#ff4757">
          It is tempting to alert only when the controller count drops to 0, since that is the more obvious
          failure. A sustained count greater than 1 is just as serious and easy to miss if the alert
          condition only checks for zero — the correct check is that the cluster-wide sum equals exactly 1,
          full stop.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — ISR churn and log flush latency" />
        <SectionTitle>ISR Shrink/Expand Rate and Log Flush Latency</SectionTitle>
        <Para>
          Under-replicated partitions (Part 02) is a point-in-time snapshot — it tells you the current state.
          ISR shrink and expand rates tell you how often that state is changing, which is a different and
          complementary signal. A partition can flicker in and out of full replication repeatedly without
          ever staying under-replicated long enough to be caught by an instantaneous check, and that flicker
          — called ISR churn — is itself a symptom worth catching.
        </Para>
        <CodeBox label="ISR churn metrics">
{`kafka.server:type=ReplicaManager,name=IsrShrinksPerSec
kafka.server:type=ReplicaManager,name=IsrExpandsPerSec

# A healthy broker shows both near zero, most of the time.
# A broker with frequent shrink-then-expand cycles on the same
# partition indicates a follower that is intermittently falling
# behind and catching back up -- often a sign of network jitter,
# an overloaded follower disk, or replica.lag.time.max.ms being
# tuned too aggressively tight for the cluster's real network
# characteristics.`}
        </CodeBox>
        <Para>
          Log flush latency is a separate, disk-focused signal:
          <code>kafka.log:type=LogFlushStats,name=LogFlushRateAndTimeMs</code> measures how long it takes the
          broker to flush log segments to disk. Kafka relies heavily on the operating system's page cache
          rather than flushing synchronously on every write, so this metric is normally very low — a rising
          trend is a direct signal of disk I/O pressure on the broker, often before that pressure shows up
          clearly in generic disk-utilization dashboards, because it specifically isolates the write path
          Kafka itself depends on rather than all disk activity on the host.
        </Para>
        <Table
          headers={['Metric', 'What it isolates', 'When to worry']}
          rows={[
            ['IsrShrinksPerSec / IsrExpandsPerSec', 'How often replicas are falling out of and rejoining the ISR — churn, not just current state.', 'Frequent, repeating shrink/expand cycles on the same partition or broker, rather than isolated one-off events during known maintenance.'],
            ['LogFlushRateAndTimeMs', 'How long it takes the broker to flush segments to disk, isolating Kafka\'s specific write path.', 'A sustained upward trend, independent of whether generic disk-utilization metrics have crossed any threshold yet.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Producer-side metrics" />
        <SectionTitle>Producer-Side Metrics: Is the Write Path Actually Healthy?</SectionTitle>
        <Para>
          Broker metrics describe the server's internal state. Producer metrics, exposed by the client
          library itself, describe whether writes are actually succeeding from the application's point of
          view — a distinction that matters because a broker can look perfectly healthy while a specific
          producer is failing every send due to a client-side misconfiguration, an authorization problem, or
          a network path issue specific to that one client.
        </Para>
        <Table
          headers={['Metric', 'What it measures', 'Why it matters']}
          rows={[
            ['record-error-rate', 'Records per second that failed to send, after exhausting retries.', 'The most direct signal that writes are actually failing — as covered elsewhere in this track, sends are asynchronous by default, so this metric is often the only reliable way to notice failures without inspecting every delivery callback individually.'],
            ['request-latency-avg', 'Average time for a produce request to receive a response from the broker.', 'Rising latency here, even with zero errors, is an early sign of broker-side saturation or network degradation before it becomes outright failures.'],
            ['record-retry-rate', 'Records per second being retried before eventually succeeding or failing.', 'A rising retry rate with a still-low error rate is often the earliest visible sign of a developing problem — requests are succeeding, but only after retries that would not normally be needed.'],
          ]}
        />
        <CodeBox label="a producer metrics snapshot showing an emerging problem">
{`record-error-rate:  0.02 records/sec   (still low)
record-retry-rate:  340 records/sec    (climbing steadily over the last hour)
request-latency-avg: 480 ms            (was 40ms an hour ago)

# Interpretation: writes are still mostly succeeding (low error
# rate), but it is taking meaningfully more retries and more time
# per request to get there. This pattern -- rising retries and
# latency with error rate still low -- is a leading indicator, not
# a trailing one. Waiting for record-error-rate to rise before
# investigating means investigating after clients have already
# started actually failing, not before.`}
        </CodeBox>
        <Callout title="Retry rate is the canary, error rate is the alarm" color={K}>
          By the time <code>record-error-rate</code> rises meaningfully, retries have already been exhausted
          and clients are failing outright. <code>record-retry-rate</code> climbing while errors are still
          near zero is the earlier, more useful signal — it shows the system is under strain before it starts
          dropping writes.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Consumer-side metrics" />
        <SectionTitle>Consumer-Side Metrics: Consumer Lag Is the Headline Signal</SectionTitle>
        <Para>
          Consumer lag — the difference between the latest offset written to a partition and the offset a
          consumer group has committed for that partition — is the single most important consumer-health
          metric, for the same reason under-replicated partitions is the single most important broker
          metric: it is a direct, quantitative measurement of exactly how far behind reality the consumer
          currently is, and it is the metric that most directly maps to a business-visible symptom
          ("why is this dashboard showing stale data?", "why hasn't this notification been sent yet?").
        </Para>
        <CodeBox label="checking consumer lag via the CLI">
{`kafka-consumer-groups.sh --bootstrap-server broker1:9092 \\
  --describe --group fraud-detection-consumer-group`}
        </CodeBox>
        <Output>{`GROUP                          TOPIC              PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG
fraud-detection-consumer-group freshcart.orders   0          1,204,552       1,204,560       8
fraud-detection-consumer-group freshcart.orders   1          998,201         1,041,880       43,679
fraud-detection-consumer-group freshcart.orders   2          1,190,004       1,190,020       16`}
        </Output>
        <Para>
          Notice that partition 1 in this output has dramatically higher lag than partitions 0 and 2 — an
          aggregate or average across the group would show a moderate-looking total lag, while the real story
          is that one partition is badly behind and the others are essentially caught up. Checking per-
          partition lag rather than only the group-level total is what catches this — the same averaging
          trap that shows up whenever data or work is unevenly distributed across partitions.
        </Para>
        <Table
          headers={['Metric', 'What it measures', 'Why it matters']}
          rows={[
            ['records-lag-max (per partition)', 'The largest gap, in records, between the latest offset and the committed offset for any partition this consumer owns.', 'The primary consumer health signal — catches a single badly-lagging partition that a group-level average would hide.'],
            ['rebalance rate / frequency', 'How often this consumer group triggers a partition reassignment.', 'Frequent rebalances mean processing keeps pausing and restarting, which itself worsens lag — a consumer that rebalances constantly may never fully catch up even if its steady-state processing speed is adequate.'],
            ['records-consumed-rate', 'Records per second the consumer is actually processing.', 'Compared against the producer\'s write rate on the same topic, this is what tells you whether the consumer is structurally fast enough, independent of any current lag it may be working through.'],
          ]}
        />
        <Para>
          A useful framing: lag by itself, at a single point in time, tells you how far behind a consumer
          currently is. Lag combined with <code>records-consumed-rate</code> and the producer's write rate
          tells you whether that gap is closing, holding steady, or growing — and only that combination
          actually tells you whether the situation is self-resolving or needs intervention.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — The JMX / Prometheus / Grafana toolchain" />
        <SectionTitle>How These Metrics Actually Get From Kafka to a Dashboard</SectionTitle>
        <Para>
          Every metric covered in Parts 02 through 07 is exposed by Kafka's JVM process through JMX (Java
          Management Extensions) — Kafka does not natively speak Prometheus's metrics format, and it does
          not ship its own dashboard. The standard, widely adopted toolchain bridges this gap with three
          pieces working together, each doing one job.
        </Para>
        <Table
          headers={['Component', 'Role']}
          rows={[
            ['JMX Exporter', 'A Java agent attached to the Kafka broker (and, separately, to producer/consumer client JVMs) that reads JMX MBeans and re-exposes them as a Prometheus-scrapeable HTTP endpoint.'],
            ['Prometheus', 'Periodically scrapes that HTTP endpoint on every broker (and every client that exposes one), storing the resulting time series and evaluating alert rules against them.'],
            ['Grafana', 'Queries Prometheus\'s stored time series to render dashboards — under-replicated partitions over time, consumer lag by group and partition, request latency percentiles, and so on.'],
          ]}
        />
        <CodeBox label="attaching the JMX Exporter java agent to a broker's startup">
{`# kafka-server-start.sh (or the systemd unit's ExecStart) launches
# the broker JVM with the exporter agent attached:

KAFKA_OPTS="-javaagent:/opt/jmx_exporter/jmx_prometheus_javaagent.jar=7071:/opt/jmx_exporter/kafka-broker.yml"

kafka-server-start.sh /etc/kafka/server.properties`}
        </CodeBox>
        <CodeBox label="the exporter's config file — which JMX beans to expose and how to label them">
{`# kafka-broker.yml (JMX Exporter config)
rules:
  - pattern: "kafka.server<type=ReplicaManager, name=UnderReplicatedPartitions><>Value"
    name: kafka_server_replicamanager_underreplicatedpartitions
  - pattern: "kafka.controller<type=KafkaController, name=ActiveControllerCount><>Value"
    name: kafka_controller_activecontrollercount
  - pattern: "kafka.server<type=KafkaRequestHandlerPool, name=RequestHandlerAvgIdlePercent><>OneMinuteRate"
    name: kafka_server_requesthandlerpool_requesthandleravgidlepercent`}
        </CodeBox>
        <CodeBox label="prometheus.yml — scraping every broker's exporter endpoint">
{`scrape_configs:
  - job_name: 'kafka-brokers'
    static_configs:
      - targets:
          - 'broker1.internal:7071'
          - 'broker2.internal:7071'
          - 'broker3.internal:7071'
    scrape_interval: 15s`}
        </CodeBox>
        <Para>
          Consumer lag specifically is often collected through a slightly different path in addition to raw
          JMX — a dedicated exporter such as Kafka's own lag-exporting tooling, or a sidecar that periodically
          runs the equivalent of <code>kafka-consumer-groups.sh --describe</code> against every group and
          exposes the result as Prometheus metrics — because consumer lag depends on the relationship between
          two offsets (log-end and committed) that is most reliably computed from the broker's own
          consumer-group-offset bookkeeping rather than from any single client's local JMX metrics, which
          only reflect that one client instance's view.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Setting alert thresholds that catch real problems" />
        <SectionTitle>Alerting: Thresholds That Reflect What Actually Matters</SectionTitle>
        <Para>
          A metric without a sensible alert threshold is a dashboard nobody looks at until something is
          already broken. But a badly chosen threshold is worse than no alert at all — it either fires
          constantly on noise until the team learns to ignore it, or it stays silent through a real,
          developing incident because the condition was defined too loosely to catch the actual failure
          pattern.
        </Para>
        <Table
          headers={['Metric', 'Alert condition', 'Why this specific condition']}
          rows={[
            ['Under-replicated partitions', 'Any value greater than 0, sustained for more than a couple of minutes.', 'Per Part 02, the healthy state is exactly zero — there is no "acceptable" nonzero baseline to tune around, unlike most metrics. A brief blip during a rolling restart is expected and should self-clear quickly; anything sustained is a real durability degradation.'],
            ['Active controller count', 'Cluster-wide sum not equal to 1, sustained beyond a brief failover window.', 'Per Part 04, both 0 and >1 are broken states — checking only for 0 misses a persistent split-brain-adjacent condition.'],
            ['Consumer lag', 'Lag exceeding an absolute threshold AND showing a positive slope over a sustained window (e.g. the last 15-30 minutes), not a single-point spike.', 'A momentary lag spike during a deploy or a brief traffic burst is normal and usually self-resolves within minutes. Alerting on any single spike trains the team to ignore the alert; alerting on sustained growth catches the case that will not resolve itself without intervention.'],
            ['Request/network handler idle ratio', 'Sustained downward trend approaching a low floor (e.g. below 20%) over an extended window, rather than momentary dips.', 'Brief dips during traffic peaks are expected; a sustained low ratio is the earlier warning of approaching saturation described in Part 03.'],
            ['Producer record-error-rate', 'Any sustained nonzero rate, scaled to the specific producer\'s normal volume.', 'Per Part 06, by the time errors are visible, retries have already been exhausted — this should be treated as an active, ongoing write failure, not a leading indicator.'],
          ]}
        />
        <CodeBox label="a consumer lag alert expressed as a sustained-slope condition, not a single spike">
{`# Pseudocode for the alerting rule's intent:
# lag_now > 100,000 records
# AND lag_15_minutes_ago > 0
# AND lag_now > lag_15_minutes_ago * 1.2   (lag grew by at least 20% over 15 min)
#
# This deliberately ignores a lag that spiked once and is already
# recovering -- it only fires when the trend over a real window
# confirms the consumer is structurally behind, not just momentarily
# busy.`}
        </CodeBox>
        <Callout title="Alert on trend, not just on threshold, wherever the metric can spike normally" color={K}>
          Consumer lag and handler idle ratio both have legitimate, harmless reasons to move briefly in the
          "bad" direction — a deploy, a traffic burst, a rolling restart. Under-replicated partitions and
          active controller count do not have a legitimate nonzero-sustained state at all. Match the alert
          condition's shape (instantaneous threshold vs. sustained trend) to which category the metric falls
          into, or the alert will either be noisy or miss real incidents.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Worked incident: consumer lag spike" />
        <SectionTitle>Worked Incident: Diagnosing a Consumer Lag Spike, Step by Step</SectionTitle>
        <Para>
          An alert fires: <code>fraud-detection-consumer-group</code>'s lag on <code>freshcart.orders</code>
          has grown past the sustained-slope threshold from Part 09. Here is the order of checks that
          actually isolates the root cause, rather than guessing.
        </Para>
        <SubTitle>Step 1 — confirm it is real and see the shape of it, per-partition</SubTitle>
        <Para>
          The first check is <code>kafka-consumer-groups.sh --describe</code> for the group, exactly as in
          Part 07, broken down by partition. This immediately answers a critical branching question: is lag
          growing evenly across every partition the group owns, or is it concentrated in one or two
          partitions while the rest sit near zero?
        </Para>
        <CodeBox label="step 1 output — lag concentrated in one partition">
{`GROUP                          TOPIC              PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG
fraud-detection-consumer-group freshcart.orders   0          1,204,552       1,204,560       8
fraud-detection-consumer-group freshcart.orders   1          822,004       1,041,880       219,876
fraud-detection-consumer-group freshcart.orders   2          1,190,004       1,190,020       16`}
        </CodeBox>
        <Para>
          This shape — one partition badly lagging while its siblings are essentially caught up — points
          strongly toward either a hot key concentrating unusual volume on that specific partition, or a
          single consumer instance (the one assigned to that partition) being individually unhealthy, rather
          than a cluster-wide or group-wide capacity problem.
        </Para>
        <SubTitle>Step 2 — check whether the consumer group is rebalancing repeatedly</SubTitle>
        <Para>
          Next, the rebalance-rate metric from Part 07. Frequent rebalances would explain lag growth on
          their own — every rebalance pauses processing for the partitions being reassigned — and would
          redirect the investigation entirely toward <code>session.timeout.ms</code> or
          <code>max.poll.interval.ms</code> tuning rather than a data or throughput problem.
        </Para>
        <Output>{`fraud-detection-consumer-group rebalance rate: 0 rebalances in the last hour
# Rebalancing is ruled out as the cause -- assignment has been stable.`}</Output>
        <SubTitle>Step 3 — check the producer's write rate on that specific partition</SubTitle>
        <Para>
          With rebalancing ruled out, the next question is whether partition 1 is simply receiving more
          volume than usual. Comparing the partition's log-end-offset growth rate against its historical
          baseline answers this directly.
        </Para>
        <Output>{`freshcart.orders partition 1 write rate:
  normal baseline: ~800 records/sec
  last 30 minutes: ~2,400 records/sec  (3x normal)

freshcart.orders partitions 0 and 2 write rate: unchanged from baseline`}</Output>
        <Para>
          This is the finding: partition 1 specifically is receiving three times its normal write volume,
          while the other partitions are unaffected — consistent with the earlier per-partition lag shape,
          and consistent with a hot key (a single high-volume entity whose events all hash to the same
          partition) rather than a general traffic increase, which would have shown up evenly across all
          three partitions.
        </Para>
        <SubTitle>Step 4 — check the consumer's own processing rate on that partition</SubTitle>
        <Para>
          The final check confirms whether the consumer's processing speed on that partition has also
          degraded, or whether it is simply outmatched by 3x the normal volume it was already running close
          to capacity against.
        </Para>
        <Output>{`records-consumed-rate for the consumer instance owning partition 1:
  before incident: ~850 records/sec (slightly above the ~800/sec baseline write rate)
  during incident: ~830 records/sec (essentially unchanged)

# The consumer's own throughput did not degrade. It was already
# running close to the partition's normal write rate with little
# headroom, and a 3x volume spike on that one partition instantly
# outpaced it.`}
        </Output>
        <Para>
          Root cause: a hot key drove partition 1's write volume to roughly 3x normal, and the single
          consumer instance that owns that partition — which was already running with little spare capacity
          even at baseline volume — could not absorb the spike. This is not a cluster-wide capacity problem
          (the other two partitions and their consumers are fine), and it is not a rebalance problem (ruled
          out in step 2), so scaling the whole consumer group would not help beyond what partition count
          already allows.
        </Para>
        <SubTitle>The fix, and the longer-term follow-up</SubTitle>
        <Para>
          Immediate mitigation: since the consumer group is already at one consumer per partition, the
          immediate option is optimizing the per-record processing path for that specific consumer to buy
          headroom, or temporarily accepting the lag and letting it drain once the spike subsides, provided
          it stays within retention. The longer-term fix is investigating why one key is receiving 3x the
          volume of its peers and whether the partition key choice needs to change to spread that specific
          entity's traffic more evenly — the same hot-partition problem covered in the producers-and-brokers
          module's partitioning discussion, here caught through monitoring rather than through a
          post-incident review.
        </Para>
        <Callout title="The diagnostic order matters" color="#38bdf8">
          Notice the sequence: per-partition shape first (rules in or out a group-wide vs. localized
          problem), rebalance rate second (rules in or out a group-membership problem), producer write rate
          third (rules in or out a volume spike), consumer processing rate last (confirms whether the
          consumer itself also degraded, or was simply outmatched). Checking these in a different order —
          for example, jumping straight to "add more consumers" — would have wasted effort on a lever that
          could not have helped, since the group was already at one consumer per partition.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Dashboard design and capacity planning" />
        <SectionTitle>From Metrics to a Dashboard That Actually Gets Used</SectionTitle>
        <Para>
          Collecting the right metrics and setting sensible alert thresholds, covered in Parts 02 through 09,
          solves the reactive half of monitoring — noticing when something is already wrong. The other half
          is a dashboard layout that makes the cluster's state legible at a glance during a live incident,
          and a habit of reviewing longer-term trends for capacity planning before a slow-moving problem
          becomes an urgent one.
        </Para>
        <SubTitle>What belongs on the first screen</SubTitle>
        <Para>
          A common mistake is building one large dashboard with every available metric spread evenly across
          the screen, which means the two or three signals that matter most during an actual incident are no
          more visually prominent than dozens of secondary ones. The metrics from Part 02 and Part 04 —
          under-replicated partitions and active controller count — earn a permanently visible, oversized
          position specifically because they have no legitimate bad state at all; anything else on the same
          screen requires more judgment to interpret.
        </Para>
        <Table
          headers={['Dashboard tier', 'What belongs here', 'Review cadence']}
          rows={[
            ['Tier 1 — always visible, large panels', 'Under-replicated partitions (cluster-wide sum), active controller count, top consumer group lags.', 'Glanced at constantly; this is what an on-call engineer opens first during any Kafka-related page.'],
            ['Tier 2 — one click away, per-broker detail', 'Request/network handler idle ratio per broker, ISR shrink/expand rate, log flush latency, per-partition lag breakdown for the group currently under investigation.', 'Opened during active diagnosis, following the Part 10 worked-incident order.'],
            ['Tier 3 — trend and capacity views', 'Handler idle ratio over weeks/months, disk usage growth rate, producer/consumer throughput trends by topic.', 'Reviewed on a regular cadence (weekly or monthly) rather than during incidents — this tier answers "are we heading toward a problem" rather than "is there a problem right now."'],
          ]}
        />
        <SubTitle>Using trend data for capacity planning, not just incident response</SubTitle>
        <Para>
          The same metrics that page someone during an acute incident are also the right inputs for deciding,
          well ahead of any page, when a cluster needs more brokers, more partitions, or larger disks. A
          request handler idle ratio (Part 03) that has been trending downward for two months, even though it
          has never crossed the alert threshold, is telling you the same thing an alert would eventually tell
          you — just earlier, and with enough lead time to plan the change instead of reacting to it.
        </Para>
        <CodeBox label="a capacity-planning read on a slow trend, distinct from an incident-response read">
{`request-handler-idle-ratio, weekly average:
  8 weeks ago: 62%
  6 weeks ago: 58%
  4 weeks ago: 51%
  2 weeks ago: 44%
  this week:   38%

# No single week crossed an alert threshold. The trend line is the
# signal: at the current rate of decline, this broker pool is on a
# path toward saturation within roughly another month. This is a
# capacity-planning finding, surfaced from exactly the same metric
# used for incident alerting -- read differently, on a longer window.`}
        </CodeBox>
        <Para>
          This is also where under-replicated-partition history (not just its current value) is worth
          retaining and reviewing — a partition that briefly goes under-replicated during every single
          rolling restart is arguably expected and not worth an individual page each time, but if that same
          pattern is taking longer to recover with each restart, that is itself a capacity signal, distinct
          from the instantaneous alert covered in Part 09.
        </Para>
        <SubTitle>Metric retention — how long Prometheus should keep this data</SubTitle>
        <Para>
          Tier 3's trend view only works if the underlying time series is actually retained long enough to
          show a multi-week or multi-month trend. A Prometheus instance configured with a short retention
          window (a common default for a fast-moving development environment) will happily serve Tier 1 and
          Tier 2 dashboards but silently cannot answer "has this been getting worse over the last two
          months" — the data to answer that question was already deleted.
        </Para>
        <Table
          headers={['Retention window', 'Supports', 'Typical fit']}
          rows={[
            ['A few days', 'Recent-incident diagnosis (Tier 1 and Tier 2) only.', 'Rarely sufficient on its own for a production cluster — too short for meaningful trend analysis.'],
            ['Weeks to a few months', 'Both incident diagnosis and short-to-medium-term capacity trends.', 'A common production baseline for the raw, high-resolution time series.'],
            ['A year or more, at reduced resolution', 'Long-range capacity planning and year-over-year comparisons (seasonal traffic patterns, growth trajectory).', 'Usually achieved with a downsampled long-term store (such as Thanos or Cortex layered on Prometheus) rather than raw Prometheus retention, since high-resolution data at that timescale becomes expensive to store.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Monitoring beyond brokers and clients" />
        <SectionTitle>Monitoring the Wider Ecosystem: Connect, Schema Registry, and End-to-End Latency</SectionTitle>
        <Para>
          Parts 02 through 07 cover brokers, producers, and consumers — the three roles at the center of
          every Kafka deployment. In practice, most real pipelines also depend on Kafka Connect workers
          moving data in and out of external systems, and a schema registry every producer and consumer
          relies on. Each of these has its own health signals, and each can silently degrade a pipeline in a
          way that looks, from the broker's point of view, like nothing is wrong at all.
        </Para>
        <SubTitle>Kafka Connect metrics</SubTitle>
        <Para>
          A Connect worker exposes its own JMX metrics, scraped through the same JMX Exporter toolchain from
          Part 08. The most important of these mirror consumer and producer health in spirit, but at the
          level of an individual connector task rather than a generic client.
        </Para>
        <Table
          headers={['Metric', 'What it measures', 'Why it matters']}
          rows={[
            ['connector task status (RUNNING / FAILED / PAUSED)', 'Whether each individual connector task is actively processing.', 'A connector task can fail silently from Kafka\'s point of view — the broker sees a consumer that simply stopped fetching, which looks identical to a lagging-but-healthy consumer unless the task status is checked directly.'],
            ['sink-record-send-rate / source-record-poll-rate', 'Records per second flowing through a specific connector.', 'A rate that drops to zero while the task still reports RUNNING is a strong sign the connector is stuck on a specific record or blocked on its external system, not merely slow.'],
            ['put-batch-avg-time-ms (sink connectors)', 'Average time for a batch write to the external system (database, storage, API) to complete.', 'Rising batch write latency to the external system is very often the true root cause of consumer lag that appears to originate from the Connect consumer group — the external system, not Kafka, is the bottleneck.'],
          ]}
        />
        <CodeBox label="a Connect-specific incident that would be misdiagnosed as a Kafka problem without task-level metrics">
{`fraud-connect-sink-task-0 status: RUNNING
sink-record-send-rate: 0 records/sec (was ~500/sec an hour ago)
put-batch-avg-time-ms: 42,000 ms (was ~80ms an hour ago)

# The consumer group backing this connector shows growing lag --
# indistinguishable, from the broker's point of view, from a
# generically slow consumer. The Connect-level metrics reveal the
# actual cause: the external database this sink writes to has
# become extremely slow to accept writes. Scaling the consumer
# group or investigating Kafka broker health would not have found
# this -- the bottleneck is downstream of Kafka entirely.`}
        </CodeBox>
        <SubTitle>Schema registry metrics</SubTitle>
        <Para>
          A schema registry sits in the critical path of both producing and consuming, even though it is not
          a Kafka broker itself — a producer or consumer that cannot reach the registry to fetch or register a
          schema typically cannot proceed at all. Its own request latency and error rate are worth monitoring
          with the same seriousness as broker request latency, since a registry outage can stall every
          producer and consumer across the entire cluster simultaneously, even while every broker reports
          perfectly healthy.
        </Para>
        <Table
          headers={['Metric', 'What it measures', 'Why it matters']}
          rows={[
            ['registry request latency', 'How long schema lookups and registrations take.', 'A slow registry adds latency to every producer and consumer that needs a schema lookup — often invisible until it is checked directly, since it does not show up in broker metrics at all.'],
            ['registry error rate', 'Failed schema lookups or registration attempts.', 'A rising error rate here can stall producers and consumers cluster-wide, since most client libraries fail closed (refuse to serialize/deserialize) rather than proceeding without a schema.'],
          ]}
        />
        <SubTitle>End-to-end latency — the metric no single component reports on its own</SubTitle>
        <Para>
          Every metric so far, on brokers, producers, consumers, Connect, and the schema registry, measures
          one component in isolation. None of them directly answers the question a business stakeholder
          actually cares about: how long does it take, right now, from the moment an event happens to the
          moment a downstream system has acted on it? That end-to-end latency has to be constructed
          deliberately, usually by embedding a timestamp in the event at production time and comparing it
          against a timestamp at the point the consumer finishes processing.
        </Para>
        <CodeBox label="a simple end-to-end latency measurement, built on top of the per-component metrics">
{`# At produce time, the event already carries its creation timestamp
event = {"order_id": "o-8834", "event_time": "2026-09-11T14:02:11.204Z", ...}

# At the point a consumer finishes processing, compute:
end_to_end_latency_ms = now() - parse(event["event_time"])

# Emitted as its own histogram metric, e.g.
# order_processing_end_to_end_latency_ms

# This single number reflects the combined effect of producer
# batching (Part 06 of the producers/brokers module), broker
# request handling (Part 03), consumer lag (Part 07), and any
# Connect or downstream processing time -- all of it, in one
# metric that maps directly to what a stakeholder actually
# experiences.`}
        </CodeBox>
        <Callout title="Component metrics diagnose; end-to-end latency tells you if there is a problem at all" color={K}>
          A useful pairing: alert on end-to-end latency first, since it reflects the thing that actually
          matters to the business, then use the Part 02 through Part 07 component metrics — plus the Connect
          and schema registry metrics here — to diagnose which specific stage is responsible once end-to-end
          latency has already told you something is wrong.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — SLOs and error budgets" />
        <SectionTitle>Turning Metrics Into SLOs: Deciding What "Good Enough" Actually Means</SectionTitle>
        <Para>
          Every metric and alert threshold covered so far answers "is something currently broken." A
          service-level objective (SLO) asks a related but distinct question: over a meaningful window of
          time, is the pipeline meeting the reliability bar its consumers actually need — and how much room
          is left before it doesn't? Framing Kafka monitoring in terms of SLOs turns a pile of individually
          useful metrics into a single, business-relevant number that both engineers and non-engineers can
          reason about together.
        </Para>
        <SubTitle>Choosing the right SLI for a Kafka pipeline</SubTitle>
        <Para>
          A service-level indicator (SLI) is the specific measurement an SLO is built on. For a Kafka-backed
          pipeline, the end-to-end latency metric from Part 12 is usually the strongest SLI candidate,
          because it is the one number that reflects the combined health of every component — broker,
          producer, consumer, and any Connect or downstream processing — in a way a stakeholder outside the
          data platform team can actually understand and care about.
        </Para>
        <CodeBox label="an SLO built on the end-to-end latency SLI from Part 12">
{`SLI: order_processing_end_to_end_latency_ms (from event creation
     to fraud-detection-service finishing its check)

SLO: 99% of orders processed within 5,000 ms, measured over a
     rolling 30-day window

Error budget: 1% of orders over 30 days may exceed 5,000 ms
     before the SLO is considered breached`}
        </CodeBox>
        <Para>
          The error budget framing changes how alerting and incident response are prioritized. A single lag
          spike that resolves within a few minutes (the kind of event Part 09 explicitly designs alert
          thresholds to ignore) consumes a small, known amount of error budget and does not, by itself,
          require an incident response. A sustained degradation that is visibly on pace to exhaust the
          month's error budget — even before the SLO is technically breached yet — is exactly the kind of
          early warning that justifies proactive investigation, ahead of a customer-visible failure.
        </Para>
        <SubTitle>Mapping component metrics to SLO risk</SubTitle>
        <Para>
          None of the component-level metrics from Parts 02 through 07 need their own separate SLO — instead,
          they function as the diagnostic tools for understanding why the end-to-end SLI is trending the way
          it is, exactly as the Part 10 worked incident demonstrated for a single lag spike. The SLO is the
          business-facing summary; the component metrics are how an engineer explains and fixes a bad
          reading on that summary.
        </Para>
        <Table
          headers={['Observation', 'SLO framing', 'Component metric that explains it']}
          rows={[
            ['End-to-end latency creeping up over several days, still within budget', 'Early warning — error budget consumption is accelerating even though the SLO has not yet been breached.', 'Check request/network handler idle ratio (Part 03) and consumer lag trend (Part 07) for the earliest signs of the same degradation.'],
            ['A brief latency spike during a known deploy window', 'Consumes a small, expected amount of error budget; not itself a signal anything is structurally wrong.', 'Consumer group rebalance rate (Part 07) — a deploy-triggered rebalance is the expected, self-resolving cause.'],
            ['Error budget nearly exhausted midway through the 30-day window', 'A strong signal to prioritize reliability work over new feature work for the remainder of the window — the classic error-budget-driven prioritization decision.', 'A pattern across multiple component metrics, most often under-replicated partitions (Part 02) or sustained consumer lag (Part 07) recurring more often than the SLO tolerates.'],
          ]}
        />
        <Callout title="SLOs make monitoring a shared language, not just an engineering concern" color="#38bdf8">
          A product manager or a downstream team lead is unlikely to have an opinion about under-replicated
          partition counts, and shouldn't need one. They can absolutely have an informed opinion about
          "99% of orders processed within 5 seconds" and whether that bar is the right one for the business.
          SLOs are what let the deep, component-level metrics in this module stay an engineering concern
          while still connecting directly to a number everyone can discuss together.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — A pre-production monitoring checklist" />
        <SectionTitle>Before a Cluster Goes Live: A Concrete Monitoring Checklist</SectionTitle>
        <Para>
          As with security, the gap between "monitoring is set up" and "monitoring actually catches real
          incidents" is usually a handful of specific, checkable items that are easy to defer. A cluster with
          a Grafana dashboard already open in a browser tab can still be missing the one alert that would
          have caught the incident that eventually happens. This checklist pulls together the concrete,
          verifiable items from this module into a single pre-production pass.
        </Para>
        <Table
          headers={['Checklist item', 'Confirms', 'Reference']}
          rows={[
            ['JMX Exporter is attached and scraping successfully on every broker, not just a subset', 'No blind spot exists where a single broker\'s state is invisible to the monitoring stack.', 'Part 08'],
            ['Under-replicated partitions and active controller count are Tier 1 dashboard panels with an alert on any-deviation, not just on the more obvious zero-controller case', 'The two metrics with no legitimate sustained-bad state are surfaced immediately, and both failure directions of controller count are covered.', 'Part 02, Part 04, Part 09'],
            ['Consumer lag alerting uses a sustained-slope condition, checked per partition, not a group-level average or single-spike threshold', 'The alert catches structurally slow consumers without paging on every self-resolving spike, and without a badly-lagging single partition hiding inside a healthy average.', 'Part 07, Part 09'],
            ['Producer record-retry-rate is monitored alongside record-error-rate, not error-rate alone', 'The earlier, leading-indicator signal is visible before writes actually start failing outright.', 'Part 06'],
            ['Kafka Connect task status and per-task throughput are monitored separately from the underlying consumer group metrics', 'A stuck or failed connector task is caught directly, rather than only appearing as unexplained consumer lag with no clear root cause.', 'Part 12'],
            ['Schema registry latency and error rate have their own monitoring, independent of broker metrics', 'A registry outage — which can stall every producer and consumer cluster-wide — is visible even though no broker metric reflects it.', 'Part 12'],
            ['An end-to-end latency metric exists, built from an event timestamp embedded at production time', 'There is one metric that reflects what a business stakeholder actually experiences, not just isolated per-component health.', 'Part 12'],
            ['At least one SLO is defined on the end-to-end latency metric, with an explicit error budget', 'Reliability work can be prioritized against a concrete, business-relevant target rather than an implicit, undiscussed standard.', 'Part 13'],
            ['Metric retention is long enough to support Tier 3 capacity-planning trend views, not just recent-incident diagnosis', 'Slow-moving problems (a handler idle ratio declining over months) are visible before they become an acute incident.', 'Part 11'],
            ['The Part 10 diagnostic order (per-partition shape, then rebalance rate, then producer volume, then consumer processing rate) is documented as a runbook, not left as tribal knowledge', 'An on-call engineer unfamiliar with a specific pipeline can still diagnose a lag incident correctly and efficiently.', 'Part 10'],
          ]}
        />
        <Callout title="A checklist catches gaps; it does not replace an incident retrospective" color={K}>
          This list confirms the monitoring foundation described throughout the module is actually in place.
          It is not a substitute for reviewing real incidents after they happen — every real production
          incident is also a chance to check whether an existing metric or alert would have caught it sooner,
          and to add what was missing, exactly the way the Part 10 worked incident itself was constructed.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 15 — Runbooks and automated remediation" />
        <SectionTitle>From Alert to Fix: Runbooks, and What Is Safe to Automate</SectionTitle>
        <Para>
          An alert firing is the start of a response, not the end of one. Whether that response takes five
          minutes or forty-five often comes down to a single factor unrelated to the underlying technical
          skill of whoever is on call: does a written runbook already exist for this specific alert, or does
          the responder have to reconstruct the diagnostic process from scratch, under time pressure, the
          way Part 10 walked through once as a worked example.
        </Para>
        <SubTitle>Turning a worked incident into a reusable runbook</SubTitle>
        <Para>
          Part 10's consumer lag investigation is exactly the shape a runbook should take: a specific,
          ordered sequence of checks, each with a concrete command and an explicit "if this, then check that
          next" branch, rather than a vague description of the general area to investigate. The value of
          writing this down is that the next person who hits a similar alert — who may not have built the
          original mental model of why the checks are ordered the way they are — can still follow the same
          effective path.
        </Para>
        <CodeBox label="a runbook entry derived directly from the Part 10 worked incident">
{`ALERT: consumer-group-lag-sustained-growth

1. Run kafka-consumer-groups.sh --describe for the alerting group.
   -> Is lag concentrated in one/few partitions, or spread evenly?
      Concentrated -> go to step 2.
      Evenly spread -> likely a group-wide capacity issue; check
        whether consumer count already equals partition count
        before considering any other cause.

2. Check the group's rebalance rate over the last hour.
   -> Rebalancing frequently? Investigate session.timeout.ms and
      max.poll.interval.ms tuning; this likely explains the lag on
      its own.
   -> Stable assignment? Go to step 3.

3. Compare the affected partition's current write rate to its
   historical baseline.
   -> Significantly elevated? Likely a hot key or traffic spike;
      check whether the partition key choice is the underlying
      cause.
   -> Normal? Go to step 4.

4. Compare the consumer's own records-consumed-rate, before and
   during the incident, for the partition(s) involved.
   -> Degraded? Investigate the consumer's own processing path
      (slow downstream call, GC pause, resource contention).
   -> Unchanged? The consumer was already near capacity and got
      outpaced by upstream volume -- see step 3's finding.`}
        </CodeBox>
        <SubTitle>What is reasonable to automate, and what still needs a human</SubTitle>
        <Para>
          Some responses in this module are safe to automate because they are low-risk and clearly correct
          regardless of root cause; others genuinely need a human to interpret the situation before acting,
          because the "fix" depends entirely on which branch of the runbook the investigation lands on.
        </Para>
        <Table
          headers={['Response', 'Safe to automate?', 'Reasoning']}
          rows={[
            ['Paging on-call when under-replicated partitions is sustained above zero', 'Yes', 'This metric has no legitimate sustained-bad state, per Part 02 and Part 09 — there is no ambiguity to resolve before paging is warranted.'],
            ['Automatically restarting a Connect task reporting FAILED status', 'Often yes, with a retry limit', 'A single automatic restart is a low-risk, frequently-correct first response to a transient failure; capping retries and escalating to a human after repeated failures avoids an automated restart loop masking a real, persistent problem.'],
            ['Automatically scaling a consumer group up in response to rising lag', 'No, not blindly', 'Per the Part 10 worked incident, scaling does nothing once the group is already at one consumer per partition, and can be actively wrong if the root cause is a downstream bottleneck (Part 12\'s Connect sink example) that more consumers cannot fix at all.'],
            ['Automatically rotating a credential and re-issuing ACLs after a suspected compromise', 'No', 'Confirming actual scope of exposure and misuse, per the security module\'s incident-response sequence, requires human judgment about what else needs investigating — this should never happen silently without a person aware it occurred.'],
          ]}
        />
        <Callout title="Automate the diagnosis-free responses; keep a human in the loop for branching decisions" color="#38bdf8">
          The pattern across this table is consistent: actions with one clearly correct response regardless
          of root cause are reasonable to automate. Actions whose correctness depends on which branch of a
          runbook the situation falls into — exactly the kind of branching Part 10's worked incident walks
          through — need a person making that judgment call, at least until an organization has enough
          confidence in its own historical incident data to automate specific, well-understood branches
          individually.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Kafka Monitoring</SectionTitle>
        {[
          {
            wrong: '"If CPU, memory, and disk all look fine, the Kafka cluster is healthy"',
            right: 'Part 01 is explicit that Kafka\'s correctness depends on distributed-systems-specific state — ISR membership, consumer lag, controller uniqueness — that has no host-level analog. A cluster can look perfectly comfortable on generic infrastructure dashboards while actively losing durability margin or falling behind on a consumer group.',
          },
          {
            wrong: '"Consumer lag should be alerted on the moment it goes above zero"',
            right: 'Part 09 covers why this produces alert fatigue: lag briefly appearing during a deploy or a normal traffic burst is expected and usually self-resolves within minutes. The useful alert condition is a sustained positive slope over a real window, not any nonzero reading.',
          },
          {
            wrong: '"Under-replicated partitions is just a broker-internal detail that doesn\'t need its own alert"',
            right: 'Part 02 frames this as arguably the single most important cluster-health signal precisely because it is invisible from the outside — clients keep working normally while the cluster\'s actual durability margin has already shrunk. Waiting for a visible symptom means waiting until after a second failure has already caused real data loss or unavailability.',
          },
          {
            wrong: '"Active controller count only needs an alert for when it drops to zero"',
            right: 'Part 04 and Part 09 both point out that a sustained count greater than 1 is just as serious as zero — a persistent split-brain-adjacent state where the cluster metadata can propagate inconsistently. The correct alert checks for anything other than exactly 1, not only for the absence of a controller.',
          },
          {
            wrong: '"A rising average consumer lag across a group means the whole group needs more consumers"',
            right: 'Part 07 and the Part 10 worked incident both show the opposite is common: an average or total hides a single badly-lagging partition while the rest of the group is fine, and adding consumers beyond the partition count does nothing at all. Per-partition lag is what actually diagnoses the problem.',
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
            <strong>At Datadog:</strong> the internal team operating a shared Kafka platform for dozens of
            product teams builds a single dashboard, following Part 02 and Part 04, that shows cluster-wide
            under-replicated partition count and active controller count as the two largest, most prominent
            panels — deliberately above every other metric. When a rolling AWS maintenance event reboots two
            brokers back to back, the under-replicated-partitions panel is what alerts the on-call engineer
            within seconds, well before any downstream team notices degraded data freshness.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Twilio:</strong> a messaging-delivery pipeline's consumer group starts showing
            intermittent lag spikes that always resolve within a few minutes. Per Part 09's alerting
            guidance, the on-call rotation had originally configured an alert on any nonzero lag and was
            getting paged several times a week for spikes that self-resolved — after switching to a
            sustained-slope condition modeled on this module's approach, the noisy alerts stop firing, and
            when a genuine, non-self-resolving lag incident happens weeks later, it is caught immediately
            because the team still trusts the alert.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Snowflake:</strong> a platform engineer is asked to set up monitoring for a newly
            provisioned Kafka cluster supporting a data-ingestion pipeline. Following Part 08's toolchain,
            they attach the JMX Exporter java agent to every broker's startup command, configure Prometheus
            to scrape all three exporter endpoints, and build Grafana panels for under-replicated partitions,
            active controller count, and per-group consumer lag — the same standard toolchain used across
            the industry, rather than a custom in-house metrics pipeline that would need to be maintained
            separately.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. What is the single most important Kafka broker metric to alert on, and why?',
            a: `Under-replicated partitions, covered in Part 02. It is a direct, real-time measurement of how much durability margin the cluster actually has right now, and unlike most metrics it has no legitimate sustained-nonzero baseline — a healthy cluster reports exactly zero, continuously.

What makes it especially important is that it's invisible from every other angle: clients keep producing and consuming normally, host-level CPU/memory/disk metrics look unaffected, and the only thing that has changed is that the topic's actual replication factor no longer matches what its configuration promises. A partition that's under-replicated by one is one more broker failure away from either unavailability (if min.insync.replicas can no longer be satisfied) or, in a worse misconfiguration, data loss.

I'd alert on any value greater than zero sustained for more than a couple of minutes — allowing for a brief, expected blip during a routine rolling restart, while catching anything that doesn't self-resolve quickly.`,
          },
          {
            q: 'Q2. Explain why alerting on "consumer lag > 0" is usually a mistake, and what a better alert condition looks like.',
            a: `Per Part 09, lag briefly appearing above zero is completely normal — a deploy that briefly pauses a consumer, a short traffic burst, or a rolling restart all produce a momentary lag spike that self-resolves within minutes on its own, with no intervention needed. Alerting on any nonzero reading pages someone for events that were never actually a problem, and the predictable outcome is that the team starts ignoring or muting the alert — which means it also won't be trusted when a real incident happens.

A better condition combines an absolute threshold with a sustained positive slope over a real window — for example, lag above some meaningful floor AND still growing (not shrinking) 15-30 minutes later. This specifically targets the case that will not resolve itself: a consumer that is structurally slower than its producer, not one that's just catching up from a brief pause.

I'd also emphasize checking lag per partition, not only as a group-level aggregate, since Part 07 and the Part 10 worked incident both show a single badly-lagging partition can hide inside an otherwise-healthy-looking average.`,
          },
          {
            q: 'Q3. Walk me through how you would diagnose a sudden consumer lag spike in a specific consumer group.',
            a: `I'd follow the order from Part 10's worked incident, because the sequence matters — each step rules something in or out before moving to the next, rather than jumping to a fix.

First, kafka-consumer-groups.sh --describe broken down per partition, to see whether the lag is spread evenly across every partition the group owns or concentrated in one or two. An even spread points toward a group-wide capacity problem; a concentrated spike points toward a hot key or one unhealthy consumer instance.

Second, the group's rebalance rate — frequent rebalances would explain lag growth on their own, since every rebalance pauses processing for reassigned partitions, and would redirect the investigation toward session.timeout.ms or max.poll.interval.ms tuning instead.

Third, the producer's write rate on the specific lagging partition, compared to its historical baseline — this tells you whether the partition is simply receiving unusually high volume right now.

Fourth, the consumer's own records-consumed-rate on that partition, to see whether its processing speed also degraded, or whether it was already running near capacity and simply got outpaced by a volume spike it couldn't absorb.`,
          },
          {
            q: 'Q4. What is the standard toolchain for exposing Kafka metrics to a dashboard, and why isn\'t Kafka\'s own JMX interface used directly?',
            a: `Per Part 08, Kafka exposes all of its internal metrics through JMX, the standard JVM instrumentation interface — but JMX itself isn't something Prometheus (or most modern time-series systems) can scrape natively, and Kafka doesn't ship a built-in dashboard of its own.

The standard bridge is the JMX Exporter, a Java agent attached to the broker's (and optionally client) JVM startup that reads JMX MBeans and re-exposes them as a Prometheus-scrapeable HTTP endpoint. Prometheus then scrapes that endpoint on a fixed interval from every broker and stores the resulting time series, and Grafana queries Prometheus to render actual dashboards and drive alerting rules.

Consumer lag is often collected slightly differently, since it depends on the relationship between two offsets — log-end and committed — that's most reliably computed centrally from the broker's own consumer-group-offset bookkeeping, via a dedicated lag exporter or sidecar, rather than from any single client's local JMX view, which only reflects that one instance.`,
          },
          {
            q: 'Q5. Why should active controller count be monitored, and what does a value other than 1 actually indicate?',
            a: `A Kafka cluster is designed to always have exactly one broker acting as the controller — the one responsible for cluster-wide coordination like electing new partition leaders and propagating metadata changes, as this track's earlier module on brokers covers. ActiveControllerCount reports 1 on whichever broker currently holds that role and 0 everywhere else, so the cluster-wide sum should always equal exactly 1.

A sum of 0 means no broker currently believes it's the controller — cluster coordination is stalled, and leadership changes for any partition can't be processed until a new controller is elected, which is a serious, actionable condition.

A sum greater than 1 is more subtle and, per Part 04 and Part 09, just as important to catch: it can happen briefly during a normal controller failover as one broker steps down and another takes over, but if it persists, it means two brokers disagree about who holds cluster leadership — a split-brain-adjacent state that risks inconsistent metadata propagating to different brokers. The correct alert checks for the sum not equaling 1 at all, not only for the more obvious zero case.`,
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
        <SectionTitle>The Mistakes That Make Kafka Monitoring Ineffective</SectionTitle>
        {[
          {
            q: 'Relying only on generic host-level metrics (CPU, memory, disk) and assuming they represent cluster health',
            a: 'Part 01 covers why this misses the signals that actually predict a Kafka incident — replication state, consumer lag, and controller stability all live in Kafka\'s own internal bookkeeping and have no host-level analog. A host can look completely comfortable while the cluster is already degraded.',
          },
          {
            q: 'Alerting on consumer lag at any nonzero value instead of a sustained trend',
            a: 'Part 09 and the Twilio example in the story section both cover the predictable outcome: constant paging for spikes that self-resolve within minutes trains the on-call rotation to ignore the alert, which means it also won\'t be trusted for a real incident later.',
          },
          {
            q: 'Checking only aggregate or average consumer lag across a group, never per-partition',
            a: 'Part 07 and the Part 10 worked incident both show this hides the most common real pattern — one badly-lagging partition sitting inside an otherwise-healthy-looking group average, which an aggregate view cannot distinguish from evenly distributed, genuine group-wide lag.',
          },
          {
            q: 'Alerting on active controller count only for the value dropping to zero',
            a: 'Part 04 and Interview Prep Q5 both point out that a sustained count greater than 1 is an equally serious, easy-to-miss failure mode — the correct check is for the cluster-wide sum not equaling exactly 1, not only for its absence.',
          },
          {
            q: 'Waiting for record-error-rate to rise before investigating a producer\'s health',
            a: 'Part 06 is explicit that by the time errors are visible, retries have already been exhausted. record-retry-rate climbing while errors are still near zero is the earlier, more actionable signal that something is starting to degrade.',
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
        <SectionTitle>Errors and Alert States You Will Hit — And Exactly Why They Happen</SectionTitle>
        {[
          {
            error: `kafka_server_replicamanager_underreplicatedpartitions reports a nonzero value that does not clear within a few minutes`,
            cause: 'Per Part 02, one or more followers for the affected partition(s) have fallen out of the ISR — either because the follower broker is down or network-partitioned, or because it is alive but cannot keep up with the leader\'s write rate within replica.lag.time.max.ms, often due to disk I/O pressure on that specific follower.',
            fix: 'Identify the affected partitions and their current ISR with kafka-topics.sh --describe --under-replicated-partitions, then check whether the missing replica\'s broker is reachable and healthy. If the broker is up but lagging, check its log flush latency (Part 05) and disk I/O for saturation rather than assuming a full broker failure.',
          },
          {
            error: `active controller count sums to 0 across the entire cluster`,
            cause: 'Per Part 04, no broker currently holds the controller role — this can happen during an unusually slow or failed controller election, often correlated with the metadata quorum (in KRaft mode) being unable to reach consensus, for example due to a network partition between controller nodes.',
            fix: 'Check the health and connectivity of the dedicated controller nodes (in KRaft mode) or the ZooKeeper ensemble (in legacy deployments) first — this is a cluster-coordination-layer problem, not something fixable from an individual broker. Cluster-wide operations like leadership changes will not proceed until a controller is re-elected.',
          },
          {
            error: `A consumer group\'s lag alert fires repeatedly, but kafka-consumer-groups.sh --describe shows lag returning to near zero within minutes each time`,
            cause: 'The alert condition is checking an instantaneous threshold rather than a sustained trend, per Part 09 — routine, expected events like deploys or brief traffic bursts are triggering it even though the underlying consumer is healthy and catching up quickly every time.',
            fix: 'Change the alert condition to require both an absolute lag threshold and a positive slope sustained over a real window (15-30 minutes is a reasonable starting point), so momentary, self-resolving spikes no longer trigger a page.',
          },
          {
            error: `Producer record-retry-rate has been climbing for the past hour with record-error-rate still near zero`,
            cause: 'Per Part 06, this is the leading-indicator pattern — requests are still eventually succeeding, but only after more retries than normal, which usually points to broker-side saturation (check request/network handler idle ratio, Part 03) or network path degradation between the producer and its partition leaders.',
            fix: 'Do not wait for record-error-rate to rise before investigating. Cross-check the affected broker\'s handler idle ratios and under-replicated-partitions status — a saturated or degraded broker is the most common root cause of a rising retry rate with writes still nominally succeeding.',
          },
          {
            error: `A Grafana panel built from the JMX Exporter shows no data at all for one broker, while the others report normally`,
            cause: 'Almost always the JMX Exporter java agent failed to start on that specific broker\'s JVM, or Prometheus\'s scrape target list for that broker\'s exporter endpoint is misconfigured or unreachable — this is a metrics-pipeline problem, not necessarily a sign the broker itself is unhealthy.',
            fix: 'Check that broker\'s startup logs for the javaagent flag actually loading successfully, and manually curl the exporter\'s HTTP endpoint (the port configured in KAFKA_OPTS, per Part 08) directly from the Prometheus host to confirm network reachability before assuming a broker-health problem.',
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
          'Kafka\'s health depends on distributed-systems-specific state — ISR membership, consumer lag, controller uniqueness — that has no analog on generic host metrics; a cluster can look perfectly comfortable on CPU/memory/disk dashboards while actually degraded.',
          'Under-replicated partitions is the single most important broker metric: a healthy cluster reports exactly zero, continuously, and any sustained nonzero value is a direct, real-time measurement of lost durability margin, invisible to clients until a second failure occurs.',
          'Active controller count must sum to exactly 1 across the cluster — both 0 (no controller, coordination stalled) and a sustained value greater than 1 (a split-brain-adjacent state) are serious failure conditions.',
          'Producer record-retry-rate climbing while record-error-rate stays near zero is a leading indicator of broker saturation or network degradation — waiting for the error rate to rise means investigating only after writes have already started failing outright.',
          'Consumer lag, checked per partition rather than as a group-level average, is the headline consumer-health signal — an average can hide a single badly-lagging partition behind an otherwise-healthy-looking group.',
          'The standard toolchain is JMX Exporter (bridges Kafka\'s native JMX metrics to a Prometheus-scrapeable endpoint) plus Prometheus (scrapes and stores the time series) plus Grafana (renders dashboards and drives alerting) — Kafka does not natively speak Prometheus or ship its own dashboard.',
          'Alert thresholds should match the metric\'s normal behavior: under-replicated partitions and active controller count have no legitimate sustained-bad state, so alert on any deviation; consumer lag and handler idle ratio can spike briefly and harmlessly, so alert on a sustained trend over a real window instead of a single reading.',
          'Diagnosing a real consumer lag incident follows a specific order — per-partition shape, then rebalance rate, then producer write rate on the affected partition, then consumer processing rate — because each step rules a category of cause in or out before the next, rather than guessing at a fix.',
        ]}
      />
    </LearnLayout>
  )
}
