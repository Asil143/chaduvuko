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

export default function ProducersConsumersBrokers() {
  return (
    <LearnLayout
      title="Producers, Consumers, and Brokers"
      description="How Kafka clients and servers actually work together: metadata discovery, broker leadership, producer batching and acks, the consumer poll loop, pull-based backpressure, and cluster coordination."
      section="Apache Kafka — Module 03"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Producers, Consumers, and Brokers', href: '/learn/apache-kafka/producers-consumers-brokers' },
      ]}
      prev={{ title: 'Events, Topics, and Partitions', href: '/learn/apache-kafka/events-topics-partitions' }}
      next={{ title: 'Local Setup and Kafka CLI', href: '/learn/apache-kafka/local-setup-cli' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The three roles" />
        <SectionTitle>Kafka Has Writers, Readers, and Servers</SectionTitle>
        <Para>
          Every Kafka system has three major roles. <strong>Producers</strong> write records.
          <strong> Consumers</strong> read records. <strong>Brokers</strong> are Kafka servers that store
          records, replicate partitions, serve client requests, and coordinate cluster metadata. If you
          understand how these three roles interact, the rest of Kafka becomes much easier to debug.
        </Para>
        <Para>
          A producer does not write to "Kafka" as an abstract cloud. It writes to a specific broker that is
          currently the leader for a specific partition. A consumer does not receive magical pushes from
          Kafka. It fetches records from brokers. A broker is not just a network proxy. It stores log
          segments on disk, handles replication, enforces security, exposes metadata, and participates in
          cluster leadership.
        </Para>
        <Para>
          The reason this module matters more than it looks is that almost every production Kafka incident
          traces back to a misunderstanding of one of these three roles. "Why did we lose a message?" is
          almost always a producer acknowledgement question. "Why is processing duplicated?" is almost
          always a consumer offset-commit-timing question. "Why did clients suddenly time out?" is almost
          always a broker leadership or metadata question. Learning the mechanics up front means you debug
          real incidents by reasoning instead of guessing.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Beginner model:</strong> producer sends, broker stores, consumer reads.
          </Para>
          <Para>
            <strong>Production model:</strong> producer discovers metadata, chooses a partition, batches and
            sends to the partition leader, waits for acknowledgements; brokers append and replicate records
            and coordinate cluster state through a controller; consumers poll assigned partitions inside a
            bounded loop, process records, and commit offsets only when the work is actually safe to mark
            done.
          </Para>
        </HighlightBox>
        <Callout title="Why this ordering" color={K}>
          This module walks broker responsibilities first, then producers, then consumers, because clients
          cannot be understood in isolation. A producer's <code>acks</code> setting only makes sense once you
          know what a partition leader and an in-sync replica are. A consumer's offset commit strategy only
          makes sense once you know that Kafka retains records instead of deleting them on read.
        </Callout>
        <Table
          headers={['Role', 'Initiates connections?', 'Stateful?', 'Typical deployment shape']}
          rows={[
            ['Producer', 'Yes — connects out to brokers to send data.', 'Mostly stateless; buffers unsent batches in memory only briefly.', 'Embedded inside an application or service, not run as its own standalone process.'],
            ['Broker', 'No — accepts inbound connections from clients and other brokers.', 'Highly stateful — owns disk-resident partition logs and replication state.', 'Run as a dedicated, long-lived server process, usually one per physical or virtual machine.'],
            ['Consumer', 'Yes — connects out to brokers to fetch data.', 'Stateful in the sense of tracking offsets, but that state lives in Kafka, not the process itself.', 'Embedded inside an application or run as a dedicated consuming service, often scaled out as a group.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Brokers" />
        <SectionTitle>A Broker Is the Kafka Server, But It Has Many Jobs</SectionTitle>
        <Para>
          A broker is one Kafka server process. A cluster is a group of brokers. In a production Kafka
          cluster, each broker usually leads some partitions and follows others. Leadership is per partition,
          not per topic and not per cluster. Broker 1 might lead orders partition 0, broker 2 might lead
          orders partition 1, and broker 3 might lead payments partition 0.
        </Para>
        <Table
          headers={['Broker responsibility', 'What it means']}
          rows={[
            ['Store partition logs', 'Brokers write topic partition data to disk as log segments.'],
            ['Serve producer writes', 'The leader broker for a partition receives writes for that partition.'],
            ['Serve consumer reads', 'Consumers fetch records from brokers that host the partition leaders.'],
            ['Replicate data', 'Follower replicas copy data from partition leaders.'],
            ['Expose metadata', 'Clients ask brokers which topics exist, how many partitions they have, and who leads them.'],
            ['Enforce security', 'Brokers authenticate clients and authorize operations when security is enabled.'],
            ['Participate in cluster coordination', 'Brokers elect and follow a controller that manages partition leadership across the whole cluster.'],
          ]}
        />
        <SubTitle>Bootstrap servers are only the front door</SubTitle>
        <Para>
          Kafka clients have a setting called <code>bootstrap.servers</code>. Beginners often think this
          must list every broker. It does not. It only needs enough reachable brokers for the client to
          connect and discover cluster metadata. After that, the client learns which brokers lead which
          partitions and talks to the right brokers directly.
        </Para>
        <CodeBox label="Bootstrap discovery">
{`client config:
  bootstrap.servers=broker-1:9092,broker-2:9092

client connects to broker-1
broker-1 returns metadata:
  orders partition 0 leader = broker-3
  orders partition 1 leader = broker-2
  payments partition 0 leader = broker-1

client sends each request to the correct leader`}
        </CodeBox>
        <Para>
          In production, teams list two or three brokers in <code>bootstrap.servers</code>, not all of them,
          specifically so that a single broker being down at startup does not prevent the client from
          connecting. Listing every broker is not wrong, it is simply unnecessary — the client only needs
          one live entry point to bootstrap the rest of its metadata.
        </Para>
        <Table
          headers={['Scenario', 'Does bootstrap.servers need updating?']}
          rows={[
            ['A brand new broker joins the cluster', 'No — existing clients discover it through metadata the next time they refresh, without any config change.'],
            ['One of the listed bootstrap brokers is permanently decommissioned', 'Only if every listed broker is removed at once; as long as at least one listed entry stays reachable, the client keeps working.'],
            ['The entire cluster is migrated to new hosts with new addresses', 'Yes — bootstrap.servers is the one hardcoded entry point and must point somewhere reachable.'],
          ]}
        />
        <SubTitle>The controller broker: who manages the cluster itself</SubTitle>
        <Para>
          A Kafka cluster needs one broker to make cluster-wide decisions: which broker becomes the new
          leader when a partition's current leader fails, which brokers are allowed in the in-sync replica
          set, and how topic and partition metadata changes propagate. That broker is called the
          <strong> controller</strong>. There is exactly one active controller per cluster at any time.
        </Para>
        <Para>
          Historically, Kafka used an external coordination service called ZooKeeper to elect the controller
          and store cluster metadata. As of Kafka 3.x and later, clusters run in <strong>KRaft mode</strong>
          (Kafka Raft), where a small set of dedicated controller nodes replicate cluster metadata among
          themselves using the Raft consensus protocol, and Kafka no longer depends on ZooKeeper at all. New
          clusters you stand up today, including local development clusters, should run KRaft mode — it has
          fewer moving parts, no separate service to operate, and faster controller failover.
        </Para>
        <Table
          headers={['Mode', 'How the controller is chosen', 'Status']}
          rows={[
            ['ZooKeeper mode (legacy)', 'ZooKeeper ensemble elects the controller broker via an ephemeral lock.', 'Deprecated; removed in newer Kafka major versions. Only seen in older, unmigrated clusters.'],
            ['KRaft mode (current)', 'A quorum of controller nodes elects a leader among themselves using Raft, independent of any external service.', 'Default and recommended for all new clusters, including single-broker local setups.'],
          ]}
        />
        <Callout title="You do not need to run ZooKeeper" color="#38bdf8">
          If you are setting up Kafka for the first time in 2026, you never need to install or configure
          ZooKeeper. Every current Kafka distribution supports KRaft mode out of the box, including
          single-node setups where one process acts as both broker and controller. Module 04 walks through
          exactly this kind of setup.
        </Callout>
        <Para>
          What the controller actually does, mechanically: when a broker hosting a partition leader crashes
          or is shut down, the controller detects this (brokers send periodic heartbeats to the controller
          quorum), picks a suitable replacement leader from the partition's in-sync replicas, and pushes that
          new leadership assignment out to every broker in the cluster. Producers and consumers learn about
          the change the next time they refresh metadata, which is exactly what Part 09 of this module covers
          in depth.
        </Para>
        <SubTitle>Why a dedicated controller role, instead of every broker deciding independently</SubTitle>
        <Para>
          It might seem simpler for each broker to independently detect a failed peer and just start serving
          whichever partitions it thinks are now leaderless. This breaks down immediately in any real
          network: two brokers might both detect the same failure at slightly different times and both
          decide to become leader for the same partition, a scenario called split-brain. A single, agreed-upon
          controller avoids this entirely by making leadership decisions in one place and propagating them
          consistently, so every broker in the cluster converges on the same view of who leads what, rather
          than each broker guessing independently and possibly disagreeing.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Producers" />
        <SectionTitle>Producers Write Records, But Safe Writing Has Many Steps</SectionTitle>
        <Para>
          A producer is any application that writes records to Kafka. It can be a backend service, data
          connector, mobile ingestion API, log shipper, IoT gateway, or stream processor. The producer's
          job is not merely to "send JSON." It must serialize records, choose partitions, batch records,
          retry temporary failures, and decide what acknowledgement is enough for a write to count as
          successful.
        </Para>
        <BulletList
          items={[
            'Serialize the key and value into bytes.',
            'Fetch metadata so it knows partition leaders.',
            'Choose a partition using the key or partitioning strategy.',
            'Batch records for efficiency.',
            'Send the batch to the leader broker.',
            'Retry when safe and configured.',
            'Report success or failure to the application.',
          ]}
        />
        <SubTitle>Acknowledgements decide durability risk</SubTitle>
        <Para>
          The producer's <code>acks</code> setting controls when Kafka confirms a write. With
          <code>acks=0</code>, the producer does not wait for confirmation. With <code>acks=1</code>, the
          leader confirms after writing. With <code>acks=all</code>, the leader waits for the required
          in-sync replicas. For important business events, <code>acks=all</code> plus appropriate
          replication settings is the normal direction.
        </Para>
        <Table
          headers={['acks setting', 'Meaning', 'Risk profile']}
          rows={[
            ['acks=0', 'Producer does not wait for broker acknowledgement.', 'Fast but can silently lose records.'],
            ['acks=1', 'Partition leader acknowledges after local append.', 'Leader failure before replication can lose acknowledged records.'],
            ['acks=all', 'Leader waits for required in-sync replicas.', 'Stronger durability, usually higher latency.'],
          ]}
        />
        <Callout title="Producer design rule" color="#22c55e">
          Producer settings are business decisions. A clickstream event may tolerate occasional loss. A
          payment, order, shipment, or audit event usually cannot. Do not copy performance settings before
          defining the cost of data loss.
        </Callout>
        <SubTitle>Partitioning: how a producer decides where a record goes</SubTitle>
        <Para>
          Every record a producer sends must be assigned to exactly one partition of the target topic. If
          the record has a key, the default partitioner hashes that key and maps it deterministically to a
          partition — the same key always lands on the same partition, for as long as the topic's partition
          count does not change. If the record has no key, the producer distributes records across
          partitions using a sticky, batch-aware strategy: it picks one partition and sends a full batch to
          it, then picks another partition for the next batch, rather than round-robining record by record,
          which would defeat the purpose of batching by scattering a handful of records across many
          partially-filled batches.
        </Para>
        <CodeBox label="Keyed vs unkeyed partitioning">
{`# Keyed records: same key -> same partition, every time
send(topic="orders", key="customer-42", value=order1)  -> partition 2
send(topic="orders", key="customer-42", value=order2)  -> partition 2
send(topic="orders", key="customer-91", value=order3)  -> partition 0

# Unkeyed records: sticky batching, not strict round robin
send(topic="orders", key=None, value=event1)  -> batch A, partition 1
send(topic="orders", key=None, value=event2)  -> batch A, partition 1
# batch A fills or lingers out, sent; next batch sticks to a new partition
send(topic="orders", key=None, value=event3)  -> batch B, partition 2`}
        </CodeBox>
        <Para>
          Choosing a key is one of the most consequential decisions a producer makes, because it directly
          determines ordering guarantees downstream. Keying by <code>customer_id</code> guarantees every
          event for one customer is processed in order by whichever single consumer owns that partition —
          exactly the property a per-customer state machine or audit trail needs. Keying by something with
          very uneven distribution, like a single tenant that accounts for half of all traffic, creates a
          hot partition that no amount of adding consumers can fix, since a partition is only ever owned by
          one consumer in a group at a time.
        </Para>
        <SubTitle>Retries and idempotence at the client level</SubTitle>
        <Para>
          Producers can retry failed sends automatically, controlled by <code>retries</code> and
          <code>retry.backoff.ms</code>. Retries are safe against transient errors like a leader election in
          progress, but naive retries can introduce duplicates or reorder records if multiple requests are
          in flight at once. Enabling <code>enable.idempotence=true</code> closes this gap: the broker
          tracks a sequence number per producer session and partition, and silently discards a retried write
          it has already committed, so retries become safe without any application-level deduplication logic.
        </Para>
        <Table
          headers={['Setting', 'What it controls', 'Recommended default']}
          rows={[
            ['retries', 'How many times the producer retries a failed send before giving up.', 'A high value (or Integer.MAX_VALUE) combined with a bounded delivery.timeout.ms.'],
            ['enable.idempotence', 'Whether the broker deduplicates retried writes using per-partition sequence numbers.', 'true, for nearly all production producers.'],
            ['max.in.flight.requests.per.connection', 'How many unacknowledged requests can be in flight at once.', 'Safe up to 5 when idempotence is enabled; should be 1 without it, to avoid reordering on retry.'],
          ]}
        />
        <SubTitle>Delivery is asynchronous by default</SubTitle>
        <Para>
          Most Kafka client libraries send records asynchronously: the call to send a record returns almost
          immediately, and the actual network write happens on a background thread. This is a performance
          feature, but it is also the single most common source of silently lost data in beginner producer
          code. If you never inspect the result of a send — a delivery report, a callback, a returned future
          — a failed write looks identical to a successful one from the application's point of view.
        </Para>
        <CodeBox label="Ignoring vs handling delivery results">
{`# Silent failure pattern — do not do this
producer.send(topic, key, value)
# no callback, no future check — a broker error here is invisible

# Correct pattern — always attach a delivery callback or check the future
future = producer.send(topic, key, value)
try:
    record_metadata = future.get(timeout=10)
    # confirmed: partition + offset are known and durable per acks setting
except Exception as error:
    log_and_alert("producer delivery failed", error)
    # decide: retry, dead-letter, or fail the request upstream`}
        </CodeBox>
        <Para>
          The distinction matters most at scale: a service sending a few requests per minute might notice a
          failed send immediately because someone is watching the logs closely. A service sending thousands
          of records per second with no delivery-result handling can lose a meaningful percentage of its
          writes during a rough patch of broker instability and never know it happened, because every
          individual <code>send()</code> call still returned normally — the failure only shows up in the
          ignored callback or future.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Batching, linger.ms, and compression" />
        <SectionTitle>Producers Trade Latency for Throughput on Purpose</SectionTitle>
        <Para>
          A naive producer would send one network request per record. At any real volume this is
          disastrously inefficient — the fixed cost of a network round trip and a broker append operation
          dominates the actual work of writing a few hundred bytes. Kafka producers instead group records
          destined for the same partition into a <strong>batch</strong> and send the whole batch as one
          request. Batching is what lets a single producer push millions of records per second without
          saturating the network with tiny packets.
        </Para>
        <SubTitle>linger.ms: how long to wait before sending an incomplete batch</SubTitle>
        <Para>
          A batch fills either when it reaches <code>batch.size</code> bytes or when <code>linger.ms</code>
          elapses since the first record was added to it, whichever comes first. <code>linger.ms</code> is
          the deliberate trade-off knob: it tells the producer "wait up to this many milliseconds hoping more
          records show up to fill the batch, even if that means this specific record sits a little longer
          before being sent." A <code>linger.ms</code> of 0, the default in many clients, sends immediately
          whenever the network is free — lowest latency per record, but batches end up smaller under light
          load. A <code>linger.ms</code> of 5-20 lets batches fill up under moderate to heavy load, trading a
          few milliseconds of added latency for dramatically higher throughput and fewer, larger requests.
        </Para>
        <CodeBox label="linger.ms in practice">
{`# linger.ms = 0 (default in many client libraries)
# record arrives -> sent almost immediately if the network is idle
# under high throughput, natural batching still happens because
# many records arrive faster than one round trip completes

# linger.ms = 10
# record arrives -> producer waits up to 10ms for more records
#   before sending the batch, UNLESS batch.size is reached first
# result under moderate load: fewer, fatter requests to the broker
#   at the cost of up to 10ms of added latency per record`}
        </CodeBox>
        <Table
          headers={['Setting', 'Low value effect', 'High value effect']}
          rows={[
            ['linger.ms', 'Lower per-record latency, smaller batches, more requests.', 'Higher per-record latency, larger batches, fewer requests, better throughput.'],
            ['batch.size', 'Batches fill and flush quickly, less memory used per partition.', 'More records can accumulate per batch before flushing, amortizing overhead further.'],
          ]}
        />
        <SubTitle>Compression: trading CPU for network and disk</SubTitle>
        <Para>
          Producers can compress each batch before sending it, using <code>compression.type</code> —
          common choices are <code>gzip</code>, <code>snappy</code>, <code>lz4</code>, and <code>zstd</code>.
          Compression happens once, on the whole batch, on the producer side; brokers store the compressed
          batch as-is and only decompress it when a consumer's client library needs to read individual
          records back out (the broker itself does not need to decompress to append the batch to the log,
          which keeps broker CPU usage low). Compressing at the batch level, after records are grouped, gets
          far better compression ratios than compressing records individually, because similar JSON keys and
          repeated field names across many records in the same batch compress well together.
        </Para>
        <Table
          headers={['Codec', 'CPU cost', 'Compression ratio', 'When to reach for it']}
          rows={[
            ['none', 'Zero', 'None', 'Very low volume, or payloads that are already compressed (e.g. images, encrypted blobs).'],
            ['lz4', 'Low', 'Moderate', 'Default good choice for most high-throughput pipelines — fast compress and decompress.'],
            ['snappy', 'Low', 'Moderate', 'Similar profile to lz4; older but still common, especially in legacy pipelines.'],
            ['zstd', 'Moderate', 'High', 'Best ratio for the CPU spent in most benchmarks; a common default on newer clusters with headroom.'],
            ['gzip', 'High', 'Highest', 'Best ratio but slowest; used when network or storage cost dominates and CPU is cheap.'],
          ]}
        />
        <Callout title="Batching and compression compound" color={K}>
          A larger <code>linger.ms</code> produces bigger batches. Bigger batches compress better, because
          compression works on the whole batch as a unit. This is why teams tuning for throughput usually
          raise <code>linger.ms</code> and enable compression together rather than in isolation — the two
          settings reinforce each other.
        </Callout>
        <Para>
          The cost of aggressive batching is not just latency. A larger <code>batch.size</code> and higher
          <code>linger.ms</code> mean more unsent data sitting in producer memory (bounded by
          <code>buffer.memory</code>) at any moment, which means more data at risk if the producer process
          crashes before that batch is sent. For latency-sensitive paths — an API request that must return a
          confirmation to a user — teams often keep <code>linger.ms</code> low or zero and accept the smaller
          batches. For high-volume background ingestion where nobody is waiting on an individual record,
          raising <code>linger.ms</code> to 10-50ms is a common and safe throughput win.
        </Para>
        <SubTitle>A worked example: the request-count math</SubTitle>
        <Para>
          Concrete numbers make the trade-off easier to reason about than settings alone. Consider a producer
          sending 200,000 small records per second, each around 200 bytes.
        </Para>
        <CodeBox label="Requests per second at different linger.ms values">
{`Throughput: 200,000 records/sec at ~200 bytes each = ~40 MB/sec

linger.ms = 0, batches average ~20 records (whatever arrives per round trip):
  200,000 / 20 = 10,000 requests/sec sent to the broker

linger.ms = 10, batches average ~2,000 records (filled over 10ms):
  200,000 / 2,000 = 100 requests/sec sent to the broker

Same data volume. 100x fewer requests. Each request now carries
a batch large enough to compress meaningfully well, too --
compounding the throughput gain from Part 04's compression section.`}
        </CodeBox>
        <Para>
          This is why raising <code>linger.ms</code> from 0 to even a small double-digit number is one of
          the highest-leverage, lowest-risk tuning changes available on a high-volume producer — the added
          latency per record is small and bounded, while the reduction in broker-side request overhead is
          often dramatic.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Consumers" />
        <SectionTitle>Consumers Pull Records and Own Their Progress</SectionTitle>
        <Para>
          Kafka consumers pull records from brokers. This is different from systems where the broker pushes
          messages to subscribers. Pull-based consumption lets consumers control their own rate. A fast
          consumer can fetch more often. A slow consumer can fetch less often. If a consumer is offline,
          Kafka retains records according to topic retention, and the consumer can catch up later.
        </Para>
        <Para>
          A consumer's progress is tracked through offsets. Processing and committing offsets are separate
          actions. This separation is powerful, but it is also where many reliability bugs begin. If a
          consumer commits an offset before work is truly complete, a crash can skip work. If a consumer
          processes work but crashes before committing, the work may happen again after restart.
        </Para>
        <CodeBox label="Safe consumer loop">
{`while running:
  records = consumer.poll()

  for record in records:
    validate(record)
    process_idempotently(record)
    write_result_safely(record)

  commit offsets after successful processing`}
        </CodeBox>
        <Table
          headers={['Commit timing', 'What can happen']}
          rows={[
            ['Commit before processing', 'A crash can lose work because Kafka thinks the record is complete.'],
            ['Commit after processing', 'A crash can repeat work, so processing should be idempotent.'],
            ['Auto-commit without thought', 'The client may commit progress unrelated to your actual business success.'],
            ['Manual commit after durable result', 'Usually the clearest reliability model for important workflows.'],
          ]}
        />
        <Para>
          Offsets themselves are stored durably in Kafka — specifically in an internal, compacted topic
          called <code>__consumer_offsets</code>. A committed offset is just a message: key is
          (consumer group, topic, partition), value is the offset and some metadata. This is why offset
          commits are not free — each commit is itself a write to a Kafka topic, replicated like any other
          write, which is part of why committing after every single record (rather than after a batch) can
          become a throughput bottleneck under high volume.
        </Para>
        <SubTitle>Auto-commit: convenient, and dangerous by default</SubTitle>
        <Para>
          Most client libraries default to <code>enable.auto.commit=true</code>, which periodically commits
          the latest offset returned by <code>poll()</code> on a fixed interval (<code>auto.commit.interval.ms</code>,
          typically 5 seconds), regardless of whether your application has actually finished doing anything
          useful with those records yet. This is convenient for prototypes and genuinely fine for workloads
          where occasional reprocessing or occasional loss is acceptable. It is a reliability trap for
          anything that writes to a database, calls a payment API, or otherwise has a real side effect,
          because the commit clock runs independently of your processing logic.
        </Para>
        <CodeBox label="Why auto-commit can silently skip work">
{`enable.auto.commit = true
auto.commit.interval.ms = 5000

t=0s    poll() returns records offset 100-150
t=1s    application starts processing record 100
t=3s    auto-commit fires -- commits offset 150 (already returned by poll)
t=4s    application crashes while still processing record 112
t=restart  consumer resumes from committed offset 150
           records 112-150 are never processed -- silently skipped`}
        </CodeBox>
        <Para>
          The fix is not necessarily to abandon auto-commit everywhere — it is to understand precisely what
          it commits and when, and to switch to manual, synchronous commits (<code>enable.auto.commit=false</code>
          plus an explicit <code>commitSync()</code> or equivalent after your own processing has durably
          succeeded) for any workflow where a skipped or duplicated record has a real cost.
        </Para>
        <SubTitle>Sync vs async manual commits</SubTitle>
        <Para>
          When committing manually, most clients offer both a synchronous and an asynchronous variant.
          <code>commitSync()</code> blocks until the broker confirms the commit, retrying on retriable
          errors, and only returns once the offset is durably recorded — the safest choice, at the cost of
          adding that round-trip latency to your processing loop. <code>commitAsync()</code> fires the commit
          without blocking and reports success or failure later through a callback, which keeps the loop
          moving faster but means a failed commit can be missed if the callback is not checked carefully. A
          common, pragmatic pattern is to use <code>commitAsync()</code> for routine commits during normal
          processing, and a final <code>commitSync()</code> right before a graceful shutdown, so the last
          commit is guaranteed to land even if earlier async commits are still in flight.
        </Para>
        <CodeBox label="A common sync/async commit pattern">
{`try:
    while running:
        records = consumer.poll(timeout=1.0)
        for record in records:
            process_idempotently(record)
        if records:
            consumer.commit_async()   # fast, non-blocking, routine path
finally:
    consumer.commit_sync()            # guaranteed final commit on shutdown
    consumer.close()`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — The poll loop" />
        <SectionTitle>The Poll Loop Has Its Own Timing Rules</SectionTitle>
        <Para>
          Calling <code>consumer.poll()</code> does more than fetch records. It is also how the consumer
          tells the broker "I am still alive and working." Kafka consumer groups use this fact to detect
          dead or stuck consumers and rebalance partitions away from them. Understanding the poll loop's
          timing settings is what separates a consumer that runs for months without a rebalance storm from
          one that gets kicked out of its group every few minutes under load.
        </Para>
        <SubTitle>max.poll.records: how much work one poll hands you</SubTitle>
        <Para>
          <code>max.poll.records</code> caps how many records a single call to <code>poll()</code> returns.
          It does not cap how many records exist to be read — it only limits the batch size handed to your
          application per call. This matters because the consumer must call <code>poll()</code> again within
          <code>max.poll.interval.ms</code> or it is considered dead and removed from the group. If your
          processing logic is slow per record and <code>max.poll.records</code> is set high, you can end up
          processing for longer than <code>max.poll.interval.ms</code> allows, triggering a rebalance in the
          middle of your own processing.
        </Para>
        <CodeBox label="max.poll.records and max.poll.interval.ms interacting badly">
{`max.poll.records = 500
max.poll.interval.ms = 300000  (5 minutes, the default)
average processing time per record = 700ms

worst case time to process one poll's batch:
  500 records * 700ms = 350,000ms = ~5.8 minutes

5.8 minutes > 5 minute max.poll.interval.ms
-> consumer is presumed dead, group rebalances mid-batch
-> in-flight work may be duplicated by whichever consumer
   picks up the reassigned partition`}
        </CodeBox>
        <Callout title="Fix the ratio, not just one setting" color="#ef4444">
          If per-record processing is slow (calling a slow downstream API, writing to a database per
          record), either lower <code>max.poll.records</code> so each batch fits comfortably inside
          <code>max.poll.interval.ms</code>, or raise <code>max.poll.interval.ms</code> to match realistic
          processing time, or move slow work off the poll thread entirely (hand records to a worker pool and
          keep calling <code>poll()</code> promptly). Changing only one side of this ratio without checking
          the other is how "random" rebalances get introduced into a stable pipeline.
        </Callout>
        <SubTitle>session.timeout.ms and heartbeats: detecting a dead consumer</SubTitle>
        <Para>
          Separately from the poll call itself, most Kafka client libraries run a background heartbeat
          thread that pings the group coordinator broker every <code>heartbeat.interval.ms</code>. If the
          coordinator does not hear a heartbeat within <code>session.timeout.ms</code>, it assumes the
          consumer has crashed and triggers a rebalance, even if the consumer's main thread is still
          technically alive but stuck. This is a separate failure mode from the poll-interval timeout above:
          <code>session.timeout.ms</code> catches a genuinely frozen or network-partitioned process,
          while <code>max.poll.interval.ms</code> catches a process that is alive and heartbeating but stuck
          doing slow application work between polls.
        </Para>
        <Table
          headers={['Setting', 'What it detects', 'Typical starting value']}
          rows={[
            ['session.timeout.ms', 'The consumer process is unresponsive or network-partitioned from the coordinator.', '10-45 seconds, depending on client version defaults.'],
            ['heartbeat.interval.ms', 'How often the background thread pings the coordinator — usually about a third of session.timeout.ms.', '3 seconds, scaled with session.timeout.ms.'],
            ['max.poll.interval.ms', 'The application is alive but has not returned to call poll() again in time — usually because per-batch processing took too long.', '5 minutes by default, tune to match real processing time.'],
          ]}
        />
        <Para>
          The practical takeaway: if you see unexplained rebalances, check which timeout tripped. A tripped
          <code>session.timeout.ms</code> usually points to network issues, GC pauses, or resource starvation
          on the consumer host. A tripped <code>max.poll.interval.ms</code> almost always points to slow
          business logic inside the poll loop relative to <code>max.poll.records</code>.
        </Para>
        <CodeBox label="A concrete heartbeat timeline">
{`session.timeout.ms = 10000       (10 seconds)
heartbeat.interval.ms = 3000     (3 seconds)

t=0s    consumer sends heartbeat, coordinator resets its timer
t=3s    consumer sends heartbeat, coordinator resets its timer
t=6s    consumer sends heartbeat, coordinator resets its timer
t=8s    a long GC pause freezes the whole JVM, including the
        background heartbeat thread
t=9s    coordinator has not heard a heartbeat since t=6s -- still
        within the 10s window, no action yet
t=17s   GC pause finally ends, but 11 seconds have now passed
        since t=6s -- past the 10s session.timeout.ms
t=17s   coordinator has already declared this consumer dead and
        triggered a rebalance; another consumer now owns its
        partitions`}
        </CodeBox>
        <Para>
          This is exactly why session timeout tuning and JVM garbage collection tuning are often discussed
          together for Java-based Kafka consumers — a heartbeat thread that shares a process with a long GC
          pause is just as unresponsive during that pause as a genuinely crashed process, from the
          coordinator's point of view.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Consumer groups" />
        <SectionTitle>Consumer Groups Let Readers Share Work</SectionTitle>
        <Para>
          A consumer group is a named team of consumers. Kafka assigns partitions to consumers within the
          group. For any one partition, only one consumer in the same group reads it at a time. This lets a
          service scale horizontally without every instance duplicating the same work.
        </Para>
        <CodeBox label="Consumer group assignment">
{`orders topic has 4 partitions

billing group:
  billing-consumer-1 -> partition 0, partition 1
  billing-consumer-2 -> partition 2, partition 3

analytics group:
  analytics-consumer-1 -> partition 0, partition 1, partition 2, partition 3

Billing and analytics are separate groups.
They read the same topic independently.`}
        </CodeBox>
        <Para>
          This is why Kafka can behave like a queue and a publish-subscribe system at the same time. Inside
          one consumer group, partitions are shared, so records are distributed across workers. Across
          different consumer groups, each group gets its own independent read position, so the same records
          can feed many applications.
        </Para>
        <Callout title="Parallelism limit" color="#38bdf8">
          If a topic has 4 partitions, one consumer group can actively use at most 4 consumers for that
          topic. Adding a fifth consumer to the same group does not create a fifth partition. It usually
          waits idle.
        </Callout>
        <Para>
          Adding or removing a consumer from a group — including a crash, a deploy, or an autoscale event —
          triggers a <strong>rebalance</strong>: the group coordinator reassigns partitions among whichever
          consumers are currently alive. During a rebalance, consumers involved briefly stop processing while
          new assignments are handed out. Newer cooperative rebalancing strategies reduce this pause by only
          reassigning the partitions that actually need to move, instead of revoking every partition from
          every consumer and reassigning from scratch, which is what the older eager rebalancing protocol
          does.
        </Para>
        <SubTitle>Eager vs cooperative rebalancing</SubTitle>
        <Para>
          Under the original, eager rebalancing protocol, every consumer in the group revokes all of its
          assigned partitions the moment a rebalance starts, even partitions that will be reassigned right
          back to the same consumer, and the group only resumes processing once every member has a full new
          assignment. This is simple to reason about but means the entire group pauses on every membership
          change, however small. The cooperative (incremental) rebalancing protocol, the default in current
          client versions, instead computes the minimal set of partitions that actually need to move and only
          revokes those, letting every other consumer keep processing its unaffected partitions throughout
          the rebalance.
        </Para>
        <Table
          headers={['Protocol', 'What happens on a rebalance', 'Pause during rebalance']}
          rows={[
            ['Eager', 'Every consumer revokes every partition; the whole group waits for a fresh assignment.', 'Whole group pauses, even consumers whose assignment does not actually change.'],
            ['Cooperative (incremental)', 'Only the specific partitions that need to move are revoked and reassigned.', 'Unaffected consumers keep processing throughout; only the moving partitions pause briefly.'],
          ]}
        />
        <SubTitle>Static membership: avoiding unnecessary rebalances entirely</SubTitle>
        <Para>
          A rolling deploy that briefly stops and restarts each consumer instance can trigger a full
          rebalance for every single restart, even though the group's real membership is unchanged a few
          seconds later. Setting <code>group.instance.id</code> to a stable, unique value per consumer
          instance enables <strong>static membership</strong>: the group coordinator recognizes a consumer
          reconnecting with the same instance ID within <code>session.timeout.ms</code> as the same member
          returning, rather than as a departure followed by a new arrival, and skips the rebalance entirely.
          This is a meaningful operational win for any consumer group that gets redeployed frequently.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Pull vs push" />
        <SectionTitle>Why Kafka Chose Pull Over Push</SectionTitle>
        <Para>
          Many older messaging systems push messages to subscribers: the broker decides when to send data,
          and the consumer's job is to keep up. Kafka deliberately inverted this. The consumer decides when
          to ask for more data by calling <code>poll()</code>. This single design choice explains a large
          share of Kafka's operational behavior, so it is worth understanding in depth rather than as a
          trivia fact.
        </Para>
        <SubTitle>The problem push-based systems run into</SubTitle>
        <Para>
          In a push model, the broker must decide a send rate for each consumer without knowing that
          consumer's true current capacity. If the broker guesses too high, it floods a slow consumer faster
          than it can process, forcing the consumer to either drop messages, buffer them until it runs out of
          memory, or apply some kind of flow-control signal back to the broker asking it to slow down — which
          is effectively reinventing a pull model through a side channel. If the broker guesses too low, fast
          consumers sit idle waiting for data that could have already been sent.
        </Para>
        <Table
          headers={['Model', 'Who controls rate', 'Failure mode under a slow consumer']}
          rows={[
            ['Push', 'The broker decides how fast to send.', 'Consumer is overwhelmed unless the broker implements its own flow control back-channel — added complexity to solve a problem pull avoids by construction.'],
            ['Pull', 'The consumer decides how often to call poll() and how much to request.', 'Consumer naturally falls behind (visible as growing lag) instead of being overwhelmed; it resumes at its own pace whenever it is ready.'],
          ]}
        />
        <Para>
          With pull, backpressure is implicit and safe by default: a slow consumer simply calls
          <code>poll()</code> less often or processes what it receives more slowly, and the unread records
          just sit durably in the broker's log until the consumer is ready for them, bounded only by the
          topic's retention period. Nothing needs to be buffered in the consumer's memory beyond what it
          asked for. Nothing needs to be dropped. The broker does not need to track each consumer's real-time
          capacity — it only needs to serve whatever range of offsets each consumer's next fetch request asks
          for.
        </Para>
        <SubTitle>Pull also enables batching on the consumer's own terms</SubTitle>
        <Para>
          Because the consumer initiates each fetch, it can ask for as many records as it can comfortably
          handle in one round trip (bounded by <code>max.poll.records</code> and related fetch-size settings
          covered in Part 06), rather than receiving records one at a time as a broker decides to push them.
          This is part of why a single Kafka consumer can sustain very high throughput — each network round
          trip can carry a large batch of records the consumer itself decided it wanted.
        </Para>
        <Callout title="The trade-off pull makes" color={K}>
          Pull is not free. It means slightly higher latency for a truly idle topic, since a consumer polling
          on an interval might wait up to that interval before noticing new data (Kafka mitigates this with
          long-poll style fetch requests that return promptly once data arrives, rather than requiring tight
          polling loops). In exchange, Kafka gets a backpressure model that cannot overwhelm a consumer by
          construction — a property that matters far more at production scale than shaving milliseconds off
          an idle topic's latency.
        </Callout>
        <SubTitle>What "falling behind safely" looks like in numbers</SubTitle>
        <Para>
          If a producer sustains 50,000 records/second and a consumer can only sustain 40,000 records/second,
          a push-based system without its own flow control would either drop the excess 10,000 records/second
          or force the consumer to buffer them in memory until it runs out. A pull-based consumer instead
          simply falls 10,000 records/second further behind in the broker's durable log every second — fully
          visible as growing consumer lag, and fully recoverable later, bounded only by the topic's retention
          window, exactly as covered in this module's monitoring guidance in Part 10.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Metadata, leadership, and cluster coordination" />
        <SectionTitle>Clients Must Know Which Broker Leads Which Partition</SectionTitle>
        <Para>
          Kafka clients are metadata-aware. This is different from a simple load-balanced HTTP service where
          any backend can handle any request. In Kafka, writes and reads for a partition go through the
          current partition leader. If leadership changes because a broker fails or maintenance occurs,
          clients refresh metadata and send future requests to the new leader.
        </Para>
        <Para>
          This explains common errors like <code>NotLeaderOrFollower</code> or temporary timeouts during
          broker restarts. The client may have old metadata for a short period. Good clients refresh and
          retry. Good applications still log and monitor these errors so real cluster instability is not
          ignored.
        </Para>
        <Table
          headers={['Event', 'What Kafka does', 'What clients do']}
          rows={[
            ['Broker starts', 'It joins the cluster and receives partition assignments.', 'Clients may discover it through metadata.'],
            ['Leader fails', 'The controller elects a new leader from suitable in-sync replicas.', 'Clients refresh metadata and retry requests.'],
            ['Partition reassigned', 'Replicas move between brokers.', 'Clients update where they send reads/writes.'],
            ['Topic created', 'Metadata changes.', 'Clients discover partitions and leaders.'],
          ]}
        />
        <SubTitle>How brokers actually coordinate as a cluster</SubTitle>
        <Para>
          The controller broker described in Part 02 is what makes leadership changes cluster-wide and
          consistent rather than something each broker figures out independently. In KRaft mode, cluster
          metadata — which topics exist, how many partitions each has, who currently leads each partition,
          which brokers are in each partition's ISR — is itself stored as a replicated, ordered log, managed
          by the Raft protocol among the controller nodes. Every broker in the cluster maintains a local,
          continuously updated copy of this metadata log, which is what lets any broker answer a client's
          metadata request correctly and quickly, without having to ask another broker first.
        </Para>
        <CodeBox label="Leadership change, end to end">
{`1. broker-3 (leader for orders partition 0) crashes
2. controller quorum detects the missed heartbeat
3. controller checks orders-partition-0's ISR: [broker-1, broker-2]
4. controller elects broker-1 as the new leader
5. controller writes this change to the cluster metadata log
6. every broker replicates the updated metadata log
7. producer's next write to orders partition 0 is rejected by the
   old cached leader info (NotLeaderOrFollower) or times out
8. producer refreshes metadata, learns broker-1 is now the leader
9. producer resumes sending to broker-1 -- no data was lost because
   acks=all had already required broker-2's replica to be caught up`}
        </CodeBox>
        <Para>
          This is also why <code>acks=all</code> and a correctly sized in-sync replica set matter beyond just
          the producer-side durability story from Part 03 — they are what guarantee that whichever replica
          the controller picks as the new leader after a failure is actually caught up, so a leadership
          change does not silently roll back recently acknowledged writes.
        </Para>
        <SubTitle>What clients actually cache, and when they refresh it</SubTitle>
        <Para>
          A client does not fetch fresh metadata before every single request — that would defeat the purpose
          of knowing partition leaders in the first place. Instead, it caches the metadata it receives and
          only refreshes it on specific triggers: periodically on a fixed interval
          (<code>metadata.max.age.ms</code>), immediately when a request to a cached leader fails with an
          error indicating that broker is no longer the leader, and on startup or when a new topic is
          referenced that the client has no cached metadata for at all.
        </Para>
        <Table
          headers={['Trigger', 'Why the client refreshes']}
          rows={[
            ['metadata.max.age.ms elapses', 'Routine background refresh, even if nothing has failed, to catch cluster changes proactively.'],
            ['NotLeaderOrFollowerException on a request', 'The cached leader for this partition is stale — the broker just told the client so directly.'],
            ['Unknown topic or partition referenced', 'The client has never seen this topic before and has no cached entry to use at all.'],
            ['Connection to the cached leader fails outright', 'The broker may be down or unreachable; the client needs a fresh view of who else could serve this partition.'],
          ]}
        />
        <Para>
          This caching-with-triggered-refresh design is why a brief broker restart is usually invisible to a
          well-behaved client beyond a short burst of retried requests — the client does not need to be told
          proactively that something changed; it discovers this the moment it tries to use stale information
          and gets corrected.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Putting it together" />
        <SectionTitle>Monitoring the Whole Picture: Producers, Brokers, Consumers</SectionTitle>
        <Para>
          Every setting covered in this module maps to a real, observable metric. Treating producers,
          brokers, and consumers as three independently healthy systems misses the point — a Kafka pipeline
          is only as reliable as the weakest link across all three, and the right monitoring makes that
          weak link visible before it becomes an incident rather than after.
        </Para>
        <Table
          headers={['Role', 'Metric to watch', 'What it tells you']}
          rows={[
            ['Producer', 'record-error-rate / delivery failures', 'Whether sends are actually succeeding, since sends are asynchronous by default and failures are invisible unless checked, per Part 03.'],
            ['Producer', 'request-latency-avg and batch-size-avg', 'Whether linger.ms and compression settings from Part 04 are actually producing the batching behavior intended.'],
            ['Broker', 'under-replicated-partitions', 'Whether any partition currently has fewer in-sync replicas than its full replica set — a direct durability risk signal.'],
            ['Broker', 'active-controller-count', 'Should be exactly 1 across the whole cluster at all times; 0 or more than 1 indicates a serious coordination problem, per Part 02 and Part 09.'],
            ['Consumer', 'records-lag-max (per partition)', 'The single most important consumer health signal — a growing value means the consumer cannot keep up, per Part 05 and Part 06.'],
            ['Consumer', 'rebalance rate', 'Frequent rebalances point to either session.timeout.ms or max.poll.interval.ms being tripped repeatedly, per Part 06 and Part 07.'],
          ]}
        />
        <Callout title="A pipeline is only as reliable as its weakest configured piece" color={K}>
          A producer with <code>acks=all</code> writing to a broker with <code>min.insync.replicas=2</code>
          still loses the durability story if the consumer reading that data commits offsets before
          processing finishes. Every layer's guarantees are necessary but none is sufficient on its own —
          this is why this module covers all three roles together instead of in isolation.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Kafka Clients</SectionTitle>
        {[
          {
            wrong: '"bootstrap.servers has to list every broker in the cluster"',
            right: 'Part 02 covers this directly: bootstrap.servers only needs enough reachable brokers to let the client discover cluster metadata. Listing two or three is normal production practice, purely so one being down does not block startup.',
          },
          {
            wrong: '"Kafka pushes messages to consumers like a webhook"',
            right: 'Part 08 explains the opposite is true by design: consumers pull by calling poll(), which is exactly what lets a slow consumer fall behind safely instead of being overwhelmed by a broker guessing at its capacity.',
          },
          {
            wrong: '"acks=all means the message can never be lost, no matter what"',
            right: 'Part 03 and Part 09 together show the real contract: acks=all waits for the in-sync replica set at that moment. If min.insync.replicas is not also configured, a shrunk ISR can still satisfy acks=all with weaker guarantees than the name implies.',
          },
          {
            wrong: '"Adding more consumers to a group always increases throughput"',
            right: 'Part 07 is explicit that a partition is owned by exactly one consumer in a group at a time. Once consumers equal partitions, additional consumers in that same group sit idle — you need more partitions, not more consumers, to go further.',
          },
          {
            wrong: '"A rebalance always means a consumer crashed"',
            right: 'Part 06 separates two distinct timeout mechanisms: session.timeout.ms catches a genuinely dead or network-partitioned process, while max.poll.interval.ms catches a perfectly healthy process that simply took too long processing a batch before calling poll() again. Diagnosing which one tripped points you to a completely different fix.',
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
            <strong>At Robinhood:</strong> a new trade-confirmation consumer keeps getting kicked out of its
            consumer group every few minutes under market-open load, even though the process never crashes.
            You pull the consumer's logs and see repeated rebalance events with no matching error. Following
            Part 06, you check <code>max.poll.records</code> against actual per-record processing time and
            find each poll's batch is taking almost 6 minutes to process against a 5-minute
            <code>max.poll.interval.ms</code>. Lowering <code>max.poll.records</code> from 500 to 100 fixes it
            without touching business logic.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At DoorDash:</strong> the platform team is designing a new order-events producer expected
            to handle dinner-rush peak load. Using Part 04, they set <code>linger.ms=15</code> and
            <code>compression.type=lz4</code> for the high-volume delivery-tracking topic, since no single
            record needs to be visible within milliseconds, while keeping <code>linger.ms=0</code> on the
            separate payment-authorization topic where a customer is actively waiting on a checkout response.
            Same producer library, two different latency-versus-throughput trade-offs made deliberately per
            topic.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>In a system design interview:</strong> "Why does Kafka use a pull model instead of
            push?" The strong answer, straight from Part 08, is not just "consumers ask for data" — it is
            that pull makes backpressure implicit and safe by construction: a slow consumer simply falls
            behind in the durable log instead of being overwhelmed, and the broker never needs to track each
            consumer's real-time capacity to avoid flooding it.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. Walk me through what happens, end to end, when a producer sends one record to a topic it has never written to before.',
            a: `The producer first needs metadata: it doesn't yet know which broker leads which partition for this topic, so per Part 02 it uses whatever brokers are listed in bootstrap.servers to fetch that metadata. If the topic exists, the response includes the partition list and current leaders.

The producer then, per Part 03, serializes the key and value, decides which partition the record belongs to (using the key's hash if one is provided, or a partitioning strategy if not), and adds the record to an in-memory batch for that specific partition, per Part 04. That batch is held until it fills to batch.size or linger.ms elapses, whichever comes first, then sent as one request to the partition's current leader broker.

The leader appends the record to its local log and, depending on the acks setting from Part 03, either responds immediately, waits for its own local write, or waits for the configured in-sync replicas to confirm before acknowledging back to the producer.`,
          },
          {
            q: 'Q2. What is the practical difference between session.timeout.ms and max.poll.interval.ms, and why do both exist?',
            a: `They detect two different failure modes, both covered in Part 06. session.timeout.ms is enforced through a background heartbeat thread most client libraries run independently of your application code — it detects a consumer that is truly dead or unreachable, such as a crashed process or a severed network connection, because heartbeats simply stop arriving.

max.poll.interval.ms is enforced against the main thread's call pattern to poll() itself. A consumer can be heartbeating perfectly fine on its background thread while its main thread is stuck doing slow application work — a slow downstream API call inside the processing loop, for example — and never returning to call poll() again. Without a separate timeout for that, the group coordinator would have no way to detect a consumer that is alive but effectively stuck.

In practice, if I see a rebalance, the first thing I check is which timeout tripped — that tells me whether to look at infrastructure health (session.timeout.ms) or at per-batch processing time versus max.poll.records (max.poll.interval.ms).`,
          },
          {
            q: 'Q3. Why does Kafka use a pull-based consumer model instead of pushing messages to consumers?',
            a: `Part 08 is the reference here. In a push model the broker has to guess each consumer's real-time processing capacity in order to decide a safe send rate. Guess too high and a slow consumer gets flooded, forcing either dropped messages, unbounded buffering, or a flow-control channel back to the broker — which is really just reinventing pull through the back door. Guess too low and fast consumers sit idle.

With pull, the consumer itself decides when to call poll() and effectively how much work to take on. A slow consumer just falls behind — visible directly as growing consumer lag — while the unread records sit safely and durably in the broker's log until the consumer is ready, bounded only by the topic's retention window. The broker never needs to track per-consumer capacity to avoid overwhelming anyone.

The trade-off is slightly higher latency for an idle topic, which Kafka mitigates with fetch requests that return promptly once new data is available rather than requiring tight, wasteful polling.`,
          },
          {
            q: 'Q4. A team wants to increase producer throughput on a high-volume topic without adding brokers. What levers would you pull?',
            a: `Starting from Part 04, I'd first look at batching: is linger.ms set to 0? If nothing is waiting on individual record latency for this specific topic, raising linger.ms to somewhere in the 10-50ms range lets batches fill up more before being sent, meaning fewer, larger requests to the broker for the same volume of data.

Second, I'd check compression.type. Enabling lz4 or zstd compresses whole batches before they go over the network, which reduces both network bytes and the disk footprint on the broker, at a modest CPU cost on the producer side — usually a very good trade for high-volume topics.

Third, I'd check whether the producer is actually using async sends properly rather than blocking on every future, per Part 03 — a producer that waits for each record's delivery confirmation before sending the next defeats the purpose of batching entirely. I would not reach for more partitions or more brokers until these client-side levers were already tuned, since they're free relative to infrastructure changes.`,
          },
          {
            q: 'Q5. What is the role of the controller broker, and how does KRaft mode change how it is elected?',
            a: `Per Part 02 and Part 09, the controller is the one broker in a cluster responsible for cluster-wide coordination decisions — most importantly, electing a new partition leader from the in-sync replica set whenever a current leader fails, and propagating that change to the rest of the cluster's metadata.

Historically Kafka used ZooKeeper, an external coordination service, to elect the controller and to store this metadata. In KRaft mode, which is the current default and what any new cluster should run, a quorum of dedicated controller nodes replicates cluster metadata among themselves directly using the Raft consensus protocol, with no external dependency. Every broker keeps a locally replicated copy of that metadata log, which is what lets any broker answer a client's metadata query quickly and correctly.

The end-to-end effect for a client is the same either way — producers and consumers refresh metadata and retry against whichever broker is now the leader — but KRaft removes an entire external system to operate and generally fails over faster.`,
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
        <SectionTitle>The Mistakes That Make Kafka Clients Unreliable</SectionTitle>
        {[
          {
            q: 'Thinking bootstrap.servers must include every broker',
            a: 'Part 02 covers why this is unnecessary — a client only needs a reachable subset to bootstrap metadata discovery, and it learns the full picture of partition leaders from there.',
          },
          {
            q: 'Thinking Kafka pushes records to consumers instead of consumers polling',
            a: 'Part 08 walks through why this distinction matters operationally, not just semantically — it is the entire reason Kafka backpressure is safe by construction instead of requiring a flow-control side channel.',
          },
          {
            q: 'Using auto-commit for workflows where database writes or API calls must finish first',
            a: 'Part 05\'s commit-timing table is the reference: auto-commit fires on its own schedule, unrelated to whether your actual business-critical work has durably succeeded, which can silently skip work on a crash.',
          },
          {
            q: 'Setting max.poll.records high without checking it against real per-record processing time',
            a: 'Part 06 shows exactly how this produces mysterious, hard-to-reproduce rebalances — the batch simply takes longer to process than max.poll.interval.ms allows, and the group coordinator has no way to know the consumer is actually still working.',
          },
          {
            q: 'Adding more consumers than partitions and expecting more throughput',
            a: 'Part 07 is explicit that partition count is a hard ceiling on active parallelism within one consumer group — extra consumers beyond that ceiling sit idle rather than doing work.',
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
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>
        {[
          {
            error: `Producer logs repeated "NotLeaderOrFollowerException" for a partition it was writing to successfully seconds earlier`,
            cause: 'The broker that was leading this partition failed, was restarted, or lost leadership during a planned rebalance of partition assignments. The producer\'s cached metadata still points at the old leader, and the broker it is talking to correctly rejects the write because it no longer leads that partition.',
            fix: 'This is expected transient behavior, not a bug, as long as it is brief — the client library should automatically refresh metadata and retry against the new leader, per Part 09. If it persists for more than a few seconds, check the controller\'s logs for repeated leader elections, which usually points to broker instability rather than a one-off failover.',
          },
          {
            error: `Consumer group rebalances every few minutes with no crash or deploy correlated to it`,
            cause: 'As covered in Part 06, this is almost always max.poll.interval.ms being exceeded — the consumer\'s main thread is taking longer to process one poll()\'s worth of records than the interval allows, even though its heartbeat thread is reporting it as alive.',
            fix: 'Compare max.poll.records times average per-record processing time against max.poll.interval.ms. Lower max.poll.records, raise max.poll.interval.ms to match realistic processing time, or move slow per-record work off the poll thread entirely.',
          },
          {
            error: `A downstream system receives the same order confirmation event twice, seconds apart`,
            cause: 'Per Part 05\'s commit-timing table, the consumer processed the record, performed its side effect (sending the confirmation), but crashed or was rebalanced away before committing the offset. On resumption, either the same consumer or a new one re-reads the same offset and processes it again.',
            fix: 'Make the downstream side effect idempotent — for example, keyed on a unique order confirmation ID that is checked before sending — rather than trying to eliminate all possible duplicate delivery, which Kafka\'s at-least-once default does not guarantee against on its own.',
          },
          {
            error: `Producer throughput plateaus far below expected, with high CPU usage on the producer host`,
            cause: 'Compression codec mismatch with available CPU headroom, most commonly gzip chosen for its compression ratio without checking its CPU cost, per Part 04\'s codec comparison table — or linger.ms left at 0 under high volume, causing far more, smaller network requests than necessary.',
            fix: 'Switch to lz4 or zstd for a better throughput-per-CPU trade-off, and raise linger.ms to let batches fill up more before sending, if per-record latency is not critical for this specific topic.',
          },
          {
            error: `A single partition\'s consumer lag climbs steadily while every other partition in the same group sits near zero`,
            cause: 'One consumer in the group owns that partition alone — per Part 07, a partition is never shared between consumers in the same group — and it is structurally slower than the volume arriving on that specific partition, often because of a hot key concentrating too much traffic there.',
            fix: 'Adding more consumers to the group will not help once you are already at one consumer per partition; the fix is either a better partition key that spreads the hot entity\'s traffic more evenly, or splitting that specific workload out to more partitions.',
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
          'Producers write records, consumers read records, and brokers store and serve records — but every one of those verbs hides real mechanics: metadata discovery, batching, acknowledgement, offset commit timing, and cluster-wide leadership coordination.',
          'Kafka clients are metadata-aware and always talk to the current partition leader; the controller broker, elected via KRaft in current Kafka versions, is what makes leadership changes consistent across the whole cluster.',
          'Producer batching (linger.ms, batch.size) and compression (lz4, zstd, gzip) trade a small amount of added latency for significantly higher throughput, and the two settings reinforce each other.',
          'The consumer poll loop is governed by two independent timeout mechanisms — session.timeout.ms for a truly dead consumer, and max.poll.interval.ms for a live consumer stuck processing too large a batch — and diagnosing rebalances means figuring out which one tripped.',
          'Kafka\'s pull model makes backpressure implicit and safe: a slow consumer falls behind in a durable log instead of being overwhelmed, which is a deliberate trade against the small added latency of an idle topic.',
          'Consumer groups distribute partition work, but partition count is a hard ceiling on active parallelism — more consumers than partitions in the same group just sit idle.',
        ]}
      />
    </LearnLayout>
  )
}
