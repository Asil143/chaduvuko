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
      description="How Kafka clients and servers actually work together: metadata discovery, broker leadership, producer writes, consumer reads, offsets, pull-based backpressure, and cluster responsibilities."
      section="Apache Kafka — Module 03"
      readTime="55 min"
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
          <strong>Consumers</strong> read records. <strong>Brokers</strong> are Kafka servers that store
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
        <HighlightBox>
          <Para>
            <strong>Beginner model:</strong> producer sends, broker stores, consumer reads.
          </Para>
          <Para>
            <strong>Production model:</strong> producer discovers metadata, chooses a partition, sends to
            the partition leader, waits for acknowledgements; brokers append and replicate records; consumers
            poll assigned partitions, process records, and commit offsets when safe.
          </Para>
        </HighlightBox>
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
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Consumers" />
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
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Consumer groups" />
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
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Metadata and leadership" />
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
            ['Leader fails', 'Kafka elects a new leader from suitable replicas.', 'Clients refresh metadata and retry requests.'],
            ['Partition reassigned', 'Replicas move between brokers.', 'Clients update where they send reads/writes.'],
            ['Topic created', 'Metadata changes.', 'Clients discover partitions and leaders.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Common mistakes" />
        <SectionTitle>The Mistakes That Make Kafka Clients Unreliable</SectionTitle>
        <BulletList
          items={[
            'Thinking bootstrap.servers must include every broker.',
            'Thinking Kafka pushes records to consumers instead of consumers polling.',
            'Using auto-commit for workflows where database writes or API calls must finish first.',
            'Adding more consumers than partitions and expecting more throughput.',
            'Ignoring producer delivery errors because send calls are asynchronous in many clients.',
            'Using acks=0 for important business events.',
            'Not monitoring consumer lag, producer error rate, request latency, and rebalance frequency.',
          ]}
        />
        <HighlightBox>
          <Para>
            <strong>Production rule:</strong> Producers, consumers, and brokers are not independent
            boxes. Producer configuration affects broker durability. Broker health affects producer and
            consumer latency. Consumer commit strategy affects duplicates and loss. Kafka reliability is
            the combined behavior of all three.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Interview-ready summary" />
        <SectionTitle>Explain This Like a Kafka Engineer</SectionTitle>
        <Para>
          A producer is a client application that writes records to Kafka topics. It discovers metadata,
          chooses partitions, batches records, sends them to partition leaders, and waits for acknowledgements
          according to its durability settings. A broker is a Kafka server that stores partition logs,
          handles reads and writes, replicates data, exposes metadata, and enforces security. A consumer is
          a client application that polls records from brokers, processes them, and commits offsets to track
          progress. Consumer groups let multiple consumers share partitions so processing can scale.
        </Para>
        <SubTitle>Questions you should be able to answer</SubTitle>
        <BulletList
          items={[
            'What does bootstrap.servers actually do?',
            'Why does a producer need cluster metadata?',
            'Why does a consumer pull instead of Kafka pushing records?',
            'What happens if a consumer commits before processing?',
            'Why can a consumer group use only as many active consumers as there are partitions?',
            'What does a partition leader do?',
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'Producers write records, consumers read records, and brokers store and serve records.',
          'Kafka clients discover metadata and talk to the current partition leaders.',
          'Producers need deliberate acknowledgement, retry, batching, and serialization settings.',
          'Consumers own their processing pace and offset commit strategy.',
          'Consumer groups distribute partition work, but partition count limits active parallelism.',
        ]}
      />
    </LearnLayout>
  )
}
