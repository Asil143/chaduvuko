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

export default function LocalSetupCli() {
  return (
    <LearnLayout
      title="Local Setup and Kafka CLI"
      description="Run a real single-broker Kafka cluster on your laptop with Docker Compose and KRaft mode, then learn the actual command-line tools engineers use every day: creating topics, producing and consuming test messages, and inspecting consumer group lag."
      section="Apache Kafka — Module 04"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Local Setup and Kafka CLI', href: '/learn/apache-kafka/local-setup-cli' },
      ]}
      prev={{ title: 'Producers, Consumers, and Brokers', href: '/learn/apache-kafka/producers-consumers-brokers' }}
      next={{ title: 'Consumer Groups and Offsets', href: '/learn/apache-kafka/consumer-groups-offsets' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why run Kafka locally" />
        <SectionTitle>You Cannot Learn Kafka Without Running It</SectionTitle>
        <Para>
          Every concept in the previous two modules — partitions, leaders, producers, consumers, offsets —
          is easy to nod along to and easy to misunderstand without actually watching it happen. Reading
          about consumer lag is not the same as producing 50 messages, killing your consumer halfway
          through, restarting it, and watching it resume from exactly where it left off. This module gets a
          real, working Kafka broker running on your own machine in a few minutes, and then teaches the
          command-line tools you will use constantly, both while learning and in real production debugging.
        </Para>
        <Para>
          Historically, running Kafka locally meant running two separate systems: ZooKeeper, an external
          coordination service, and the Kafka broker itself, which depended on it. That is no longer true.
          Kafka 3.x and later fully support <strong>KRaft mode</strong>, where the broker manages its own
          cluster metadata internally using the Raft consensus protocol, with no separate service to install,
          configure, or keep alive. This module uses KRaft mode exclusively — you should never need to set
          up ZooKeeper to learn or run Kafka today.
        </Para>
        <HighlightBox>
          <Para>
            <strong>What you need before starting:</strong> Docker and Docker Compose installed and running.
            That's it. You do not need to install Java, download Kafka binaries, or manage a JVM yourself —
            the Docker image bundles everything, and Docker Compose gives you a single, disposable, one-command
            way to bring the whole thing up and tear it down.
          </Para>
        </HighlightBox>
        <Table
          headers={['Approach', 'Setup effort', 'When it makes sense']}
          rows={[
            ['Docker Compose, single broker, KRaft (this module)', 'One file, one command, running in seconds.', 'Learning, local development, reproducing bugs, quick experiments — the default choice for almost everyone.'],
            ['Raw Kafka binaries installed directly on the host', 'Download, unpack, manage a JVM version, manage the process lifecycle yourself.', 'Rare today; mainly when you need to inspect or modify Kafka\'s own startup scripts directly.'],
            ['A managed cloud Kafka service (Confluent Cloud, MSK, etc.)', 'Account setup, no local process at all.', 'Testing against production-like managed infrastructure specifically, not for day-to-day local learning.'],
          ]}
        />
        <Para>
          This module focuses entirely on the first approach, because it is the fastest path to a real,
          fully-functional broker with zero cloud dependency, zero cost, and a completely disposable
          environment you can tear down and recreate in seconds whenever you want a clean slate.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Docker Compose, single broker, KRaft mode" />
        <SectionTitle>A Real, Working docker-compose.yml</SectionTitle>
        <Para>
          The configuration below runs one Kafka broker that also acts as its own controller — a common,
          fully supported topology for local development and small deployments. In a real production
          cluster you would run multiple brokers and typically separate the controller role onto its own
          nodes, but for learning, one process doing both jobs is exactly what you want: simpler to reason
          about, and it starts in seconds.
        </Para>
        <CodeBox label="docker-compose.yml — single-broker KRaft-mode Kafka">
{`services:
  kafka:
    image: apache/kafka:3.8.0
    container_name: kafka
    ports:
      - "9092:9092"
    environment:
      # This one process is both the broker and the controller
      KAFKA_NODE_ID: 1
      KAFKA_PROCESS_ROLES: broker,controller

      # Where controller-role traffic and broker-role traffic each listen
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:9093
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER

      # Since this single node is the entire controller quorum,
      # it votes for itself: node id 1 is reachable at kafka:9093
      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@kafka:9093

      # Fine for local learning -- never use replication factor 1 in production
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1

      # A KRaft cluster needs a cluster ID -- this is a fixed, valid
      # pre-generated one purely for local development convenience
      CLUSTER_ID: "4L6g3nShT-eMCtK--X86sw"
    volumes:
      - kafka-data:/var/lib/kafka/data

volumes:
  kafka-data:`}
        </CodeBox>
        <Para>
          Bring it up with a single command, and Kafka will be listening on <code>localhost:9092</code> a
          few seconds later.
        </Para>
        <CodeBox label="starting the cluster">
{`docker compose up -d`}
        </CodeBox>
        <Output>
{`[+] Running 2/2
 ✔ Network local-setup-cli_default  Created
 ✔ Container kafka                  Started`}
        </Output>
        <SubTitle>Why a fixed CLUSTER_ID is fine here</SubTitle>
        <Para>
          In a real deployment, you generate a fresh, random cluster ID once per cluster using
          <code>kafka-storage.sh random-uuid</code>, then format each broker's storage directory with that
          ID before it ever starts, using <code>kafka-storage.sh format</code>. The official Docker image
          used above handles this bootstrap step automatically on first startup when a
          <code>CLUSTER_ID</code> environment variable is provided, which is why the compose file above works
          without you running those commands by hand — that machinery still happens, just inside the
          container's startup script.
        </Para>
        <SubTitle>What each environment variable is actually doing</SubTitle>
        <Table
          headers={['Variable', 'What it configures']}
          rows={[
            ['KAFKA_NODE_ID', 'This process\'s unique identifier within the cluster — every broker and controller needs a distinct one.'],
            ['KAFKA_PROCESS_ROLES', 'Which roles this process performs. broker,controller means one process does both, the simplest local topology.'],
            ['KAFKA_LISTENERS', 'The network addresses this process binds to and listens on, separated by purpose — client traffic vs internal controller traffic.'],
            ['KAFKA_ADVERTISED_LISTENERS', 'The address clients should actually connect to, which can differ from KAFKA_LISTENERS when running behind Docker\'s network translation.'],
            ['KAFKA_CONTROLLER_QUORUM_VOTERS', 'The full list of controller-role node IDs and their addresses that make up the Raft quorum — just this one node, in a single-broker setup.'],
            ['KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR', 'Replication factor for the internal __consumer_offsets topic specifically — must be 1 here since there is only one broker available.'],
          ]}
        />
        <Para>
          The split between <code>KAFKA_LISTENERS</code> and <code>KAFKA_ADVERTISED_LISTENERS</code> trips
          up a lot of first-time Docker Compose Kafka setups. The broker binds to <code>0.0.0.0:9092</code>
          inside the container (that's what <code>KAFKA_LISTENERS</code> says), but it needs to tell
          connecting clients an address those clients can actually reach — from your host machine, that
          address is <code>localhost:9092</code>, which is exactly what <code>KAFKA_ADVERTISED_LISTENERS</code>
          specifies. Get this pair wrong, and clients can often connect for the very first metadata request
          but then fail mysteriously on subsequent requests, because the broker handed back an advertised
          address the client cannot actually reach.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Verifying the broker is up" />
        <SectionTitle>Confirm the Broker Is Actually Ready Before Doing Anything Else</SectionTitle>
        <Para>
          A container reporting "running" is not the same as Kafka being ready to accept connections — the
          broker process needs a few seconds to initialize its log directories and start listening. Check
          logs first, then confirm with the CLI tools themselves, since a successful metadata request is the
          most reliable proof the broker is genuinely ready.
        </Para>
        <CodeBox label="checking container logs">
{`docker compose logs -f kafka`}
        </CodeBox>
        <Output>
{`kafka  | [KafkaServer id=1] started (kafka.server.KafkaServer)`}
        </Output>
        <Para>
          Once you see a line like that, the broker is accepting client connections. All CLI commands from
          here on run <em>inside</em> the container, using <code>docker compose exec</code>, because the
          container image ships the CLI scripts under <code>/opt/kafka/bin/</code> — you do not need to
          install the Kafka CLI tools on your host machine at all for local learning.
        </Para>
        <SubTitle>What "ready" actually means under the hood</SubTitle>
        <Para>
          Broker startup, even for this single-node setup, goes through a specific, observable sequence:
          the process first formats or validates its KRaft storage directory against the configured cluster
          ID, then starts the controller role and establishes itself as the single-member controller quorum,
          then starts the broker role and registers itself with that controller, and finally opens its
          client-facing listener socket. Only after that last step can a producer, consumer, or CLI tool
          successfully connect. If you run a CLI command too early, before that final step, you will see a
          connection-refused or timeout error rather than a Kafka-specific error — the process for these is
          simply not listening on the port yet.
        </Para>
        <CodeBox label="the startup sequence, roughly, in the logs">
{`kafka  | [MetadataLoader] initialized (using CLUSTER_ID 4L6g3nShT-eMCtK--X86sw)
kafka  | [QuorumController] Becoming the active controller
kafka  | [BrokerServer id=1] Transitioning from STARTING to RECOVERY
kafka  | [BrokerServer id=1] Transitioning from RECOVERY to RUNNING
kafka  | [SocketServer] Started socket server acceptors on PLAINTEXT://0.0.0.0:9092
kafka  | [KafkaServer id=1] started (kafka.server.KafkaServer)`}
        </CodeBox>
        <CodeBox label="listing topics as a readiness check">
{`docker compose exec kafka /opt/kafka/bin/kafka-topics.sh \\
  --bootstrap-server localhost:9092 \\
  --list`}
        </CodeBox>
        <Output>
{`__consumer_offsets`}
        </Output>
        <Para>
          Seeing the internal <code>__consumer_offsets</code> topic listed (even with zero topics of your
          own created yet) confirms the broker is fully initialized — that topic is created automatically
          the first time it is needed, and its presence means the broker successfully handled a metadata
          request end to end.
        </Para>
        <Callout title="Every command in this module follows this shape" color={K}>
          Real Kafka CLI tools always take <code>--bootstrap-server host:port</code> (older tool versions
          used <code>--zookeeper</code> for some commands — that flag is legacy and should not be used on a
          current KRaft-mode cluster). To save repetition, the rest of this module shows commands without
          the <code>docker compose exec kafka</code> prefix — assume every command below runs against the
          broker the same way this one did.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — kafka-topics.sh" />
        <SectionTitle>Creating, Listing, and Describing Topics</SectionTitle>
        <Para>
          <code>kafka-topics.sh</code> is the tool for all topic administration: creating topics, listing
          what exists, inspecting a topic's configuration and partition layout, and deleting topics. Every
          subcommand needs <code>--bootstrap-server</code> to know which broker to talk to.
        </Para>
        <SubTitle>Creating a topic</SubTitle>
        <CodeBox label="kafka-topics.sh --create">
{`kafka-topics.sh --bootstrap-server localhost:9092 \\
  --create \\
  --topic orders \\
  --partitions 3 \\
  --replication-factor 1`}
        </CodeBox>
        <Output>
{`Created topic orders.`}
        </Output>
        <Callout title="Replication factor 1 is a local-only choice" color="#ef4444">
          <code>--replication-factor 1</code> means exactly one copy of the data exists, on this one broker.
          That is completely fine for local learning, where you have only one broker anyway and losing data
          on container restart is not a real concern. In production, a replication factor of 1 means a
          single disk failure loses that partition's data permanently — production topics use a replication
          factor of at least 3, exactly as covered in the broker durability material in Module 03. Never
          carry <code>--replication-factor 1</code> from a local example into a production command.
        </Callout>
        <SubTitle>Listing topics</SubTitle>
        <CodeBox label="kafka-topics.sh --list">
{`kafka-topics.sh --bootstrap-server localhost:9092 --list`}
        </CodeBox>
        <Output>
{`__consumer_offsets
orders`}
        </Output>
        <SubTitle>Describing a topic</SubTitle>
        <Para>
          <code>--describe</code> is the command you will run most often once a cluster has real topics on
          it — it shows partition count, replication factor, which broker leads each partition, and which
          replicas are currently in-sync.
        </Para>
        <CodeBox label="kafka-topics.sh --describe">
{`kafka-topics.sh --bootstrap-server localhost:9092 \\
  --describe \\
  --topic orders`}
        </CodeBox>
        <Output>
{`Topic: orders  TopicId: 5f3d8a...  PartitionCount: 3  ReplicationFactor: 1  Configs: segment.bytes=1073741824
  Topic: orders  Partition: 0  Leader: 1  Replicas: 1  Isr: 1
  Topic: orders  Partition: 1  Leader: 1  Replicas: 1  Isr: 1
  Topic: orders  Partition: 2  Leader: 1  Replicas: 1  Isr: 1`}
        </Output>
        <Para>
          On a single-broker cluster, every partition's leader and only replica is broker 1 — there is
          nowhere else for a replica to live. In a real multi-broker cluster this same output is exactly how
          you would confirm, for example, that a replication-factor-3 topic actually has 3 healthy entries
          in each partition's <code>Isr</code> list, not just 3 in its <code>Replicas</code> list (a replica
          can exist but have fallen out of the in-sync set, which this command makes immediately visible).
        </Para>
        <Table
          headers={['Flag', 'Purpose']}
          rows={[
            ['--bootstrap-server', 'Broker address the CLI connects to for every kafka-topics.sh subcommand.'],
            ['--create', 'Create a new topic.'],
            ['--list', 'List every topic name in the cluster.'],
            ['--describe', 'Show partition count, replication factor, leaders, and ISR for one or all topics.'],
            ['--partitions', 'How many partitions the topic should have (only meaningful with --create or --alter).'],
            ['--replication-factor', 'How many copies of each partition to keep (only meaningful with --create).'],
            ['--delete', 'Delete a topic and all of its data permanently.'],
          ]}
        />
        <SubTitle>Changing partition count and topic configuration with --alter</SubTitle>
        <Para>
          <code>--alter</code> lets you increase a topic's partition count after creation (Kafka does not
          support decreasing partition count, since that would require deciding which existing partition's
          data to discard or merge). It is also how you change individual topic-level configs, like
          retention, without recreating the topic.
        </Para>
        <CodeBox label="kafka-topics.sh --alter — increasing partition count">
{`kafka-topics.sh --bootstrap-server localhost:9092 \\
  --alter \\
  --topic orders \\
  --partitions 6`}
        </CodeBox>
        <Output>
{`WARNING: If partitions are increased for a topic that has a key,
the partition logic or ordering of the messages will be affected
Adding partitions succeeded!`}
        </Output>
        <Callout title="Increasing partitions changes key-to-partition mapping" color="#ef4444">
          The warning above is not boilerplate — it is a real, important consequence. The default
          partitioner maps a key to a partition using a hash modulo the partition count. Changing the
          partition count changes that modulo, so the same key that used to land on partition 2 out of 3
          can land on a completely different partition once the topic has 6. Any downstream assumption about
          "this key always lands on the same partition" holds only until you alter partition count — plan
          partition count carefully up front rather than treating it as a value you casually bump later.
        </Callout>
        <SubTitle>Deleting a topic</SubTitle>
        <CodeBox label="kafka-topics.sh --delete">
{`kafka-topics.sh --bootstrap-server localhost:9092 \\
  --delete \\
  --topic orders`}
        </CodeBox>
        <Para>
          Deletion is asynchronous — the command returns immediately, but the broker removes the underlying
          log segments from disk in the background. Running <code>--list</code> again immediately afterward
          may still briefly show the topic until that background cleanup finishes.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Producing and consuming from the CLI" />
        <SectionTitle>Sending and Reading Test Messages Without Writing Any Code</SectionTitle>
        <Para>
          Before writing a single line of producer or consumer application code, you can exercise a topic
          entirely from the command line. This is invaluable for two things: sanity-checking that a topic
          and broker are behaving correctly, and reproducing production issues locally by feeding known test
          data through the same topic shape.
        </Para>
        <SubTitle>kafka-console-producer.sh</SubTitle>
        <Para>
          This starts an interactive prompt. Each line you type and press enter on becomes one record sent
          to the topic. Exit with Ctrl+D (or Ctrl+C).
        </Para>
        <CodeBox label="kafka-console-producer.sh">
{`kafka-console-producer.sh --bootstrap-server localhost:9092 \\
  --topic orders`}
        </CodeBox>
        <Output>
{`>order-1001 placed
>order-1002 placed
>order-1003 cancelled
>`}
        </Output>
        <Para>
          Those three lines are now three separate records in the <code>orders</code> topic, distributed
          across its partitions (with no key specified, the producer spreads records across partitions using
          a round-robin-like strategy, as covered in Module 02's partitioning material).
        </Para>
        <SubTitle>kafka-console-consumer.sh</SubTitle>
        <Para>
          By default, the console consumer only shows messages produced <em>after</em> it starts — exactly
          like a fresh consumer group with no committed offset reading only new records. The flag that
          changes this, and the one you will reach for constantly while learning, is
          <code>--from-beginning</code>, which reads the entire retained history of the topic from the
          earliest available offset.
        </Para>
        <CodeBox label="kafka-console-consumer.sh --from-beginning">
{`kafka-console-consumer.sh --bootstrap-server localhost:9092 \\
  --topic orders \\
  --from-beginning`}
        </CodeBox>
        <Output>
{`order-1001 placed
order-1003 cancelled
order-1002 placed`}
        </Output>
        <Callout title="Output order across partitions is not guaranteed" color={K}>
          Notice the order above does not match the order the messages were produced in. This is expected,
          not a bug — the three records landed on different partitions (no key was given), and the console
          consumer reads across all of a topic's partitions concurrently. Kafka only guarantees ordering
          within a single partition, exactly as covered in Module 03's discussion of ordering guarantees. If
          you need to see strict production order for a test, create a single-partition topic or produce
          with an explicit key so related records land on the same partition.
        </Callout>
        <SubTitle>Producing with an explicit key</SubTitle>
        <Para>
          To test key-based partitioning specifically, use <code>--property parse.key=true</code> with a key
          separator, then type <code>key</code><code>TAB</code><code>value</code> lines (or use the
          explicit separator property shown below for clarity in scripts).
        </Para>
        <CodeBox label="producing with keys from the CLI">
{`kafka-console-producer.sh --bootstrap-server localhost:9092 \\
  --topic orders \\
  --property "parse.key=true" \\
  --property "key.separator=:"`}
        </CodeBox>
        <Output>
{`>customer-42:order-1001 placed
>customer-42:order-1004 placed
>customer-91:order-1002 placed
>`}
        </Output>
        <Para>
          Every record keyed <code>customer-42</code> will always land on the same partition as every other
          record with that exact key, for as long as the topic's partition count does not change — this is
          what lets a consumer reading that one partition see all of one customer's events in the exact
          order they were produced.
        </Para>
        <SubTitle>Producing from a file instead of typing interactively</SubTitle>
        <Para>
          For anything beyond a couple of quick test records, typing into the interactive prompt gets
          tedious fast, and it is not reproducible. Piping a file into the producer is the practical pattern
          for reproducing a bug with a known, fixed set of input records, or for quickly loading realistic
          test data into a local topic.
        </Para>
        <CodeBox label="producing many records from a file">
{`# test-orders.txt, one record per line
echo "order-2001 placed
order-2002 placed
order-2003 shipped
order-2004 cancelled" > test-orders.txt

kafka-console-producer.sh --bootstrap-server localhost:9092 \\
  --topic orders < test-orders.txt`}
        </CodeBox>
        <Para>
          This produces all four lines as four separate records without any interactive typing, and the
          same input file can be replayed identically as many times as needed — invaluable when trying to
          reproduce a timing-sensitive bug reliably.
        </Para>
        <SubTitle>Inspecting raw records with formatting flags</SubTitle>
        <Para>
          By default the console consumer prints only the record's value. Two flags that come up constantly
          during debugging are <code>--property print.key=true</code>, which prepends each record's key, and
          <code>--property print.timestamp=true</code>, which prepends the broker-assigned or
          producer-assigned timestamp — both essential when you need to see not just what was sent, but
          which partition-determining key it carried and exactly when.
        </Para>
        <CodeBox label="consuming with key and timestamp visible">
{`kafka-console-consumer.sh --bootstrap-server localhost:9092 \\
  --topic orders \\
  --from-beginning \\
  --property print.key=true \\
  --property print.timestamp=true \\
  --property key.separator=" | "`}
        </CodeBox>
        <Output>
{`CreateTime:1757600123456 | customer-42 | order-1001 placed
CreateTime:1757600123901 | customer-42 | order-1004 placed
CreateTime:1757600124210 | customer-91 | order-1002 placed`}
        </Output>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Consumer groups from the CLI" />
        <SectionTitle>Reading as a Named Consumer Group, and Why It Changes Behavior</SectionTitle>
        <Para>
          Running the console consumer without a group ID (as in Part 05) creates a random, throwaway group
          each time — nothing about its position is remembered between runs. Adding
          <code>--group</code> turns it into a real, named consumer group whose offsets are committed and
          persisted, exactly like an application consumer.
        </Para>
        <CodeBox label="consuming as a named group">
{`kafka-console-consumer.sh --bootstrap-server localhost:9092 \\
  --topic orders \\
  --group orders-cli-test \\
  --from-beginning`}
        </CodeBox>
        <Para>
          Run that command, let it read everything, then stop it with Ctrl+C and run the exact same command
          again. The second run will print nothing new — the group's committed offset already covers every
          record that exists. This is the fastest way to physically see offset commit behavior instead of
          just reading about it.
        </Para>
        <Callout title="Try this yourself" color="#22c55e">
          Start the named-group consumer above, let it catch up, stop it, produce three more records with
          <code>kafka-console-producer.sh</code>, then start the same named-group consumer again without
          <code>--from-beginning</code>. It will print exactly the three new records — proof that its
          committed offset, stored durably in the broker's <code>__consumer_offsets</code> topic, survived
          the consumer being stopped entirely.
        </Callout>
        <SubTitle>Resetting a group's offset deliberately</SubTitle>
        <Para>
          Sometimes you want to intentionally rewind or skip a group's position — to replay a topic from
          scratch after fixing a bug, or to skip past a poison message a group is stuck on.
          <code>kafka-consumer-groups.sh --reset-offsets</code> does this, but only for a group with no
          currently active members, and only takes effect when you pass <code>--execute</code> — without it,
          the command runs in a dry-run mode that shows what it would do without actually changing anything.
        </Para>
        <CodeBox label="resetting a group's offset to the earliest available">
{`# stop the consumer first -- reset-offsets refuses to run against
# a group with active members

kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\
  --group orders-cli-test \\
  --topic orders \\
  --reset-offsets \\
  --to-earliest \\
  --execute`}
        </CodeBox>
        <Output>
{`GROUP            TOPIC   PARTITION  NEW-OFFSET
orders-cli-test  orders  0          0
orders-cli-test  orders  1          0
orders-cli-test  orders  2          0`}
        </Output>
        <Table
          headers={['Reset target', 'Effect']}
          rows={[
            ['--to-earliest', 'Rewinds to the oldest offset still retained — full replay of everything currently in the topic.'],
            ['--to-latest', 'Jumps to the current end of the log — skips everything currently unread, starts fresh from now.'],
            ['--to-offset <n>', 'Jumps to a specific, exact offset — useful for skipping past one known poison message.'],
            ['--to-datetime <ISO8601>', 'Jumps to whatever offset corresponds to that timestamp, using the time index covered conceptually in Module 03.'],
            ['--shift-by <n>', 'Moves the current offset forward or backward by a relative amount, e.g. --shift-by -100 to rewind 100 records.'],
          ]}
        />
        <Callout title="Always dry-run first against anything that matters" color="#ef4444">
          Omitting <code>--execute</code> shows exactly what the reset would do without touching anything —
          run it that way first against any group you did not create purely for throwaway local testing.
          Resetting offsets on a real production group is a deliberate, consequential operation: rewinding
          reprocesses everything since that point, and jumping forward permanently skips whatever lies
          between the old and new offset.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Inspecting offsets and lag" />
        <SectionTitle>kafka-consumer-groups.sh — The Command You Will Run Most in Production</SectionTitle>
        <Para>
          <code>kafka-consumer-groups.sh</code> is arguably the single most important operational CLI tool
          in Kafka, because consumer lag is the primary health signal for almost every streaming pipeline.
          It lets you list every consumer group, and, most usefully, describe one group's per-partition
          offset position and lag.
        </Para>
        <SubTitle>Listing consumer groups</SubTitle>
        <CodeBox label="kafka-consumer-groups.sh --list">
{`kafka-consumer-groups.sh --bootstrap-server localhost:9092 --list`}
        </CodeBox>
        <Output>
{`orders-cli-test`}
        </Output>
        <SubTitle>Describing a group's offsets and lag</SubTitle>
        <CodeBox label="kafka-consumer-groups.sh --describe">
{`kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\
  --describe \\
  --group orders-cli-test`}
        </CodeBox>
        <Output>
{`GROUP            TOPIC   PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG  CONSUMER-ID  HOST  CLIENT-ID
orders-cli-test  orders  0          2               2               0    -            -     -
orders-cli-test  orders  1          1               1               0    -            -     -
orders-cli-test  orders  2          3               3               0    -            -     -`}
        </Output>
        <Para>
          <code>LAG</code> is simply <code>LOG-END-OFFSET</code> minus <code>CURRENT-OFFSET</code> for each
          partition — how many records exist in the partition that this group has not yet committed past.
          The <code>CONSUMER-ID</code>, <code>HOST</code>, and <code>CLIENT-ID</code> columns show
          <code>-</code> here because the consumer that last committed these offsets is not currently
          running; when a live consumer is actively connected and assigned to the group, those columns
          populate with its identity.
        </Para>
        <CodeBox label="describing while a lagging consumer is live">
{`GROUP            TOPIC   PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG   CONSUMER-ID
billing-service  orders  0          148200          151900          3700  billing-service-0-a1b2c3
billing-service  orders  1          150010          150300          290   billing-service-0-a1b2c3
billing-service  orders  2          149500          162100          12600 billing-service-1-d4e5f6`}
        </CodeBox>
        <Para>
          This is exactly the shape of output referenced in Module 03's discussion of per-partition lag
          hiding behind a healthy-looking average — partition 2 here has over 12,000 records of lag while
          partition 1 is nearly caught up. Always check the per-partition breakdown, not just a summed
          total, when diagnosing a slow consumer group.
        </Para>
        <Table
          headers={['Flag', 'Purpose']}
          rows={[
            ['--list', 'List every consumer group known to the cluster.'],
            ['--describe --group <name>', 'Show per-partition current offset, log-end offset, and lag for one group.'],
            ['--all-groups', 'Describe every group at once instead of naming one.'],
            ['--reset-offsets', 'Move a group\'s committed offset — to earliest, latest, or a specific point — for replay or skip scenarios.'],
            ['--members', 'Show which consumer instances are currently part of a group and what they are assigned.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Topic configuration overrides" />
        <SectionTitle>Setting Per-Topic Configuration for Fast Local Iteration</SectionTitle>
        <Para>
          Kafka's cluster-wide defaults are tuned for production durability and retention, which often
          fight against fast local iteration. A 7-day default retention means a topic you create, fill with
          test data, and forget about will happily keep that data around for a week, quietly consuming disk.
          Per-topic configuration overrides, set with <code>kafka-configs.sh</code>, let you tune individual
          topics without touching cluster-wide broker settings.
        </Para>
        <SubTitle>Shortening retention for a throwaway test topic</SubTitle>
        <CodeBox label="kafka-configs.sh --alter — setting short retention">
{`kafka-configs.sh --bootstrap-server localhost:9092 \\
  --alter \\
  --entity-type topics \\
  --entity-name orders \\
  --add-config retention.ms=600000`}
        </CodeBox>
        <Output>
{`Completed updating config for topic orders.`}
        </Output>
        <Para>
          That sets retention to 10 minutes (600,000 milliseconds) for just the <code>orders</code> topic —
          any data older than 10 minutes becomes eligible for deletion by the broker's background log
          cleaner, without affecting retention on any other topic in the cluster.
        </Para>
        <SubTitle>Viewing a topic's current configuration overrides</SubTitle>
        <CodeBox label="kafka-configs.sh --describe">
{`kafka-configs.sh --bootstrap-server localhost:9092 \\
  --describe \\
  --entity-type topics \\
  --entity-name orders`}
        </CodeBox>
        <Output>
{`Dynamic configs for topic orders are:
  retention.ms=600000 sensitive=false synonyms={DYNAMIC_TOPIC_CONFIG:retention.ms=600000}`}
        </Output>
        <Para>
          Only settings that have been explicitly overridden for this specific topic show up here — a topic
          with no overrides at all describes as having no dynamic configs, meaning it inherits every setting
          from the broker's cluster-wide defaults.
        </Para>
        <SubTitle>Removing an override, back to the cluster default</SubTitle>
        <CodeBox label="kafka-configs.sh --alter — deleting a config override">
{`kafka-configs.sh --bootstrap-server localhost:9092 \\
  --alter \\
  --entity-type topics \\
  --entity-name orders \\
  --delete-config retention.ms`}
        </CodeBox>
        <Table
          headers={['Common config', 'What it controls', 'Useful local-dev value']}
          rows={[
            ['retention.ms', 'How long records are retained before becoming eligible for deletion.', 'A short value like 600000 (10 min) keeps disk usage low during iterative testing.'],
            ['cleanup.policy', 'delete (age out old segments) or compact (keep latest value per key) or both.', 'compact, when testing changelog-style topics locally, per the compaction material in Module 02.'],
            ['min.insync.replicas', 'Minimum in-sync replicas required for an acks=all write to succeed.', '1 on a single-broker local cluster — anything higher makes the topic permanently unwritable with only one broker.'],
            ['max.message.bytes', 'Largest single record the topic will accept.', 'Raise temporarily if testing with unusually large local payloads; keep at cluster default otherwise.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Local dev gotchas" />
        <SectionTitle>The Things That Trip Up a First Local Kafka Setup</SectionTitle>
        <SubTitle>Port conflicts</SubTitle>
        <Para>
          Port 9092 is Kafka's conventional default, and it is common for a previous Kafka container, a
          different local install, or another tool entirely to already be bound to it. Docker Compose will
          fail to start with a clear "address already in use" error in that case.
        </Para>
        <CodeBox label="finding what is already using port 9092">
{`lsof -i :9092`}
        </CodeBox>
        <Output>
{`COMMAND   PID   USER   FD   TYPE  NODE NAME
java      4821  you    62u  IPv6  TCP *:9092 (LISTEN)`}
        </Output>
        <Para>
          Either stop that process, or change the host-side port mapping in <code>docker-compose.yml</code>
          (for example <code>"19092:9092"</code>) and adjust your client's <code>bootstrap.servers</code> to
          match. Note that the container-internal port stays 9092 regardless — only the host-side mapping
          changes.
        </Para>
        <SubTitle>Cluster ID mismatches after editing the compose file</SubTitle>
        <Para>
          KRaft's metadata log is formatted with a specific cluster ID the first time the broker starts, and
          that ID is written into the data directory. If you change <code>CLUSTER_ID</code> in your compose
          file later but the old, already-formatted volume is still attached, the broker refuses to start,
          because the ID it was told to use no longer matches the ID already stamped into its storage.
        </Para>
        <CodeBox label="fixing a cluster ID mismatch — wipe the local volume">
{`docker compose down -v
# -v removes the named volume too, forcing a clean re-format
# on the next docker compose up. Fine for local learning; this
# permanently deletes all locally stored topic data.
docker compose up -d`}
        </CodeBox>
        <Callout title="Never do this to a real cluster" color="#ef4444">
          <code>docker compose down -v</code> deletes the data volume, which is exactly what you want when
          a disposable local learning environment gets into a bad state. That command against anything
          resembling a real broker's storage would be permanent, cluster-wide data loss — this section is
          local-dev-only advice.
        </Callout>
        <SubTitle>Replication factor limits on a single broker</SubTitle>
        <Para>
          If you try to create a topic with <code>--replication-factor 3</code> against this single-broker
          cluster, the command fails outright — there are not 3 brokers to place 3 replicas on.
        </Para>
        <CodeBox label="what happens when replication factor exceeds broker count">
{`kafka-topics.sh --bootstrap-server localhost:9092 \\
  --create --topic payments --partitions 3 --replication-factor 3`}
        </CodeBox>
        <Output>
{`Error while executing topic command : Unable to replicate the partition to 3 broker(s)
InvalidReplicationFactorException: Replication factor: 3 larger than available brokers: 1`}
        </Output>
        <Para>
          This is not a bug to work around locally — it is a correct, honest error. If you want to exercise
          multi-broker behavior (leader election, ISR shrinking, replication) locally, you need to extend
          the compose file to run 3 broker services instead of 1, each with a unique <code>KAFKA_NODE_ID</code>
          and listed in a shared <code>KAFKA_CONTROLLER_QUORUM_VOTERS</code>. A single broker is sufficient
          for everything in this module and the next several, but topic-design and replication modules later
          in this track will walk through a multi-broker compose file.
        </Para>
        <SubTitle>Commands hanging with no output at all</SubTitle>
        <Para>
          If a CLI command appears to hang indefinitely rather than returning an error, the most common
          cause is a mismatch between the address the client is told to connect to and the address the
          broker actually advertises. If you changed the host-side port mapping in
          <code>docker-compose.yml</code> but ran a command against the old port, or if you are running the
          CLI from your host machine instead of inside the container without adjusting
          <code>KAFKA_ADVERTISED_LISTENERS</code> accordingly, the TCP connection can appear to hang rather
          than failing cleanly, because the client is waiting on a socket that either isn't listening or is
          advertising a hostname unreachable from where the command is being run.
        </Para>
        <CodeBox label="diagnosing a hanging CLI command">
{`# add a short explicit timeout to fail fast instead of hanging indefinitely
kafka-topics.sh --bootstrap-server localhost:9092 \\
  --list \\
  --command-config <(echo "request.timeout.ms=5000")

# or, simpler first check: confirm the container is actually running
docker compose ps`}
        </CodeBox>
        <Output>
{`NAME    IMAGE                 STATUS
kafka   apache/kafka:3.8.0    Up 2 minutes (healthy)`}
        </Output>
        <SubTitle>Running out of memory with several other containers active</SubTitle>
        <Para>
          Kafka broker processes default to a JVM heap sized for production hardware, which can be
          unnecessarily large for a throwaway local single-broker setup, especially if Docker Desktop's
          allocated memory is already shared with several other running containers. If the container is
          being killed unexpectedly (visible as an OOMKilled status in <code>docker compose ps</code> or
          <code>docker inspect</code>), lowering the heap explicitly keeps local resource usage predictable.
        </Para>
        <CodeBox label="capping JVM heap for local development">
{`# add to the kafka service's environment block in docker-compose.yml
KAFKA_HEAP_OPTS: "-Xmx512m -Xms512m"`}
        </CodeBox>
        <Para>
          512MB of heap is comfortably enough for the volume of test data covered in this module — a few
          topics, a handful of partitions, and a modest number of test records — while leaving headroom for
          whatever else is running on the same machine.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Running Kafka Locally</SectionTitle>
        {[
          {
            wrong: '"I need to install and run ZooKeeper to run Kafka"',
            right: 'Part 01 and Part 02 are explicit: KRaft mode, the current default since Kafka 3.x, needs no external coordination service at all. A single container can be both broker and controller, as the docker-compose.yml in Part 02 shows.',
          },
          {
            wrong: '"--replication-factor 1 is a fine setting to copy into a real deployment"',
            right: 'Part 04\'s callout is direct about this: replication factor 1 means one disk failure loses that partition\'s data permanently. It is correct for local learning purely because there is only one broker to place replicas on, and losing a throwaway local topic has no consequence.',
          },
          {
            wrong: '"The console consumer always shows every message ever produced to a topic"',
            right: 'Part 05 shows the opposite default: without --from-beginning, the console consumer only shows records produced after it starts, exactly like a fresh consumer group with no prior committed offset.',
          },
          {
            wrong: '"Messages printed by the console consumer come back in the order they were produced"',
            right: 'Part 05\'s callout demonstrates this directly — records land on different partitions without an explicit key, and Kafka only guarantees order within one partition, not across a topic as a whole.',
          },
          {
            wrong: '"Consumer lag is one single number for a group"',
            right: 'Part 07\'s live-consumer example shows lag reported per partition, and one badly-lagging partition can hide behind an average that looks healthy — always check the per-partition breakdown from kafka-consumer-groups.sh --describe.',
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
            <strong>At Netflix:</strong> a new hire on the streaming platform team is asked to reproduce a
            reported bug where a billing consumer appears to skip records under specific timing conditions.
            Rather than requesting access to a shared staging cluster and waiting on approvals, they spin up
            the exact single-broker Compose setup from Part 02, create a topic matching the production
            topic's partition count, script the same sequence of produces and consumer restarts using
            <code>kafka-console-producer.sh</code> and a named consumer group, per Part 06, and reproduce the
            skip locally in about twenty minutes — entirely on their laptop, with zero risk to real data.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Instacart:</strong> an on-call engineer gets paged for a lagging inventory-sync
            consumer group at 2 AM. They do not open a dashboard first — they SSH into a bastion host and
            run <code>kafka-consumer-groups.sh --describe --group inventory-sync</code> directly against
            production, exactly as shown in Part 07, and immediately see that lag is concentrated on one
            partition out of twelve while the rest sit near zero — pointing straight at a hot-key problem on
            a specific high-volume warehouse rather than a general capacity issue.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>In a system design interview:</strong> "How would you quickly verify a Kafka topic is
            configured the way you expect, without writing any code?" The strong answer walks through
            <code>kafka-topics.sh --describe</code> to confirm partition count, replication factor, and that
            the in-sync replica set actually matches the full replica set — not just that replicas exist,
            per Part 04 — plus <code>kafka-consumer-groups.sh --describe</code> to confirm a consuming
            application's real offset position, which is exactly the toolkit this module builds.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. How would you set up a minimal local Kafka environment for development, and what changed about this compared to a few years ago?',
            a: `Today, per Part 01 and Part 02, the simplest correct setup is a single Docker container running Kafka in KRaft mode, configured with process.roles set to both broker and controller. Docker Compose makes this a one-command operation, and the official image handles cluster ID formatting automatically given a CLUSTER_ID environment variable.

What changed is that Kafka used to require a separate ZooKeeper ensemble for cluster metadata and controller election. As of Kafka 3.x, KRaft mode replaces that with a Raft-based metadata log the brokers themselves maintain, so a from-scratch local setup no longer needs a second service at all — one container, one process, no external dependency.

For genuinely multi-broker local testing — replication, leader failover — I'd extend the same compose file to run 3 broker services, each with a unique node ID and listed in a shared controller quorum voter list, rather than reaching for anything more complex.`,
          },
          {
            q: 'Q2. Walk me through exactly how you would verify a topic is correctly replicated and healthy using only the CLI.',
            a: `I'd run kafka-topics.sh --bootstrap-server <broker> --describe --topic <name>, per Part 04. The output gives me the partition count, the configured replication factor, and, per partition, both the Replicas list and the Isr (in-sync replicas) list.

The key thing I'm checking is not just that Replicas has the expected number of entries — that only tells me replicas were assigned, not that they're healthy. I'm checking that Isr matches Replicas in length. If Isr is shorter than Replicas for a partition, that partition has a follower that has fallen behind or gone offline, which is a real signal worth investigating even if the topic is technically still serving traffic through its leader.

For a full health picture I'd pair that with kafka-consumer-groups.sh --describe on the topic's actual consuming applications, since a perfectly replicated topic with a badly lagging consumer group is still an unhealthy pipeline end to end.`,
          },
          {
            q: 'Q3. What is the difference between running the console consumer with and without --group, and why does it matter?',
            a: `Without --group, per Part 06, the console consumer is assigned a random, throwaway group ID each time it starts, and nothing about its read position is persisted between runs — it behaves like a disposable tail of the topic, useful for a quick look but not representative of how a real application consumer behaves.

With --group <name>, the consumer commits its offset to the broker's internal __consumer_offsets topic under that specific group name, exactly like a production application would. Stopping and restarting it with the same group name resumes from exactly where it left off, rather than starting over or starting fresh.

This matters for debugging specifically because it lets you reproduce real offset-commit behavior — including duplicate-processing or skip scenarios tied to when a commit happens relative to a crash — using nothing but the CLI, without deploying any application code.`,
          },
          {
            q: 'Q4. A consumer group\'s overall lag looks fine on a dashboard, but a specific downstream process is clearly falling behind. How would you investigate from the CLI?',
            a: `I would not trust an aggregated lag number and go straight to kafka-consumer-groups.sh --describe --group <name>, per Part 07, which reports lag per partition rather than as one summed total. An average can look healthy while one specific partition is badly behind — exactly the pattern in the Instacart example in this module, where twelve partitions summed to a modest-looking average while one partition alone carried the vast majority of the lag.

Once I've identified the specific lagging partition, I'd check whether it consistently receives disproportionate volume — a hot key concentrating too much traffic there — since Module 03 covers that a partition is only ever owned by one consumer in a group at a time, so adding more consumers to the group does nothing to help one already-saturated partition.

The fix from there is either a better partitioning key that spreads that hot entity's traffic more evenly, or increasing partition count for that topic specifically, not simply scaling out the consumer group.`,
          },
          {
            q: 'Q5. Why would kafka-topics.sh --create fail with a replication factor error on a fresh local cluster, and is it something to "fix" by lowering the setting in production too?',
            a: `Locally, per Part 09, this happens because you asked for more replicas than there are brokers to place them on — a single-broker cluster physically cannot satisfy --replication-factor 3, and the broker correctly refuses the request with an InvalidReplicationFactorException rather than silently creating an under-replicated topic.

The fix locally is either to lower the replication factor to 1 for that throwaway topic, which is fine because there's nothing at stake, or to extend the local compose setup to run 3 broker services if you specifically want to exercise multi-broker replication behavior.

Importantly, this is purely a local capacity constraint, not a signal that replication factor 3 is somehow wrong or unnecessary — the exact opposite is true in production, where replication factor 1 is the actual danger, per Part 04's callout and the durability material in Module 03. The error is the cluster doing its job correctly; the response is to fix the local topology, never to carry a lowered replication factor into a real deployment.`,
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
        <SectionTitle>Mistakes Beginners Make Constantly</SectionTitle>
        {[
          {
            q: 'Trying to install and run ZooKeeper for a brand-new local setup',
            a: 'Part 01 and Part 02 cover why this is unnecessary work for any current Kafka version — KRaft mode needs no external coordination service, and the single-container compose file in this module handles everything ZooKeeper used to be responsible for.',
          },
          {
            q: 'Copying --replication-factor 1 from a local tutorial straight into a production topic-creation script',
            a: 'Part 04\'s callout and Interview Prep Q5 both flag this directly — replication factor 1 is only safe locally because there is nothing at stake and only one broker to place replicas on. In production it means a single disk failure permanently loses that partition\'s data.',
          },
          {
            q: 'Assuming the console consumer without --from-beginning is broken because it shows nothing',
            a: 'Part 05 explains this is the correct default behavior — a consumer with no prior committed offset and no --from-beginning flag only sees records produced after it starts, exactly like a fresh application consumer group would.',
          },
          {
            q: 'Reading console consumer output top to bottom as if it reflects true production order',
            a: 'Part 05\'s callout is explicit that Kafka only guarantees order within a single partition. Without an explicit key, records spread across partitions, and the console consumer interleaves them from all partitions concurrently — the printed order is not the produced order.',
          },
          {
            q: 'Checking only a consumer group\'s total or average lag instead of the per-partition breakdown',
            a: 'Part 07 and Interview Prep Q4 both make the same point — kafka-consumer-groups.sh --describe reports lag per partition specifically because a single badly-lagging partition can hide behind a healthy-looking aggregate.',
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
            error: `docker compose up fails with "Bind for 0.0.0.0:9092 failed: port is already allocated"`,
            cause: 'Something else on the host machine — a previous Kafka container that was not fully stopped, a locally installed Kafka install, or an unrelated service — is already bound to port 9092, and Docker cannot bind the same host port twice.',
            fix: 'Run lsof -i :9092 (or docker ps if it is likely a leftover container) to identify what is using the port, per Part 09. Stop that process, or change the host-side port mapping in docker-compose.yml (e.g. "19092:9092") and update bootstrap.servers in any client accordingly — the container-internal port of 9092 does not need to change.',
          },
          {
            error: `Broker container exits immediately with "InconsistentClusterIdException" after editing the compose file`,
            cause: 'The KRaft metadata log was already formatted with one cluster ID on a previous startup and is stored in the attached volume. Changing CLUSTER_ID in the compose file afterward does not reformat existing storage — it just gives the broker a new ID that conflicts with the one already stamped into its data directory.',
            fix: 'For local development, run docker compose down -v to remove the volume and force a clean re-format on the next startup, per Part 09. This permanently deletes locally stored topic data, which is expected and harmless for a disposable local environment — never run the equivalent against real cluster storage.',
          },
          {
            error: `kafka-topics.sh --create fails with "InvalidReplicationFactorException: Replication factor: 3 larger than available brokers: 1"`,
            cause: 'The topic-creation command asked for 3 replicas per partition, but the cluster being targeted only has 1 broker running — there is nowhere to place the other 2 replicas.',
            fix: 'For this single-broker learning setup, use --replication-factor 1, per Part 04 and Part 09. To actually exercise multi-broker replication locally, extend the compose file to run 3 broker services with unique node IDs sharing one controller quorum voter list.',
          },
          {
            error: `kafka-console-consumer.sh with --group <name> prints nothing on a second run, even though the topic clearly has messages`,
            cause: 'This is expected, not an error — the named group\'s offset was already committed past every existing record on the first run, per Part 06, so a second run with the same group name correctly has nothing new to show.',
            fix: 'To re-read everything, either use a new, unused --group name, or reset the existing group\'s offset back to the earliest position with kafka-consumer-groups.sh --reset-offsets --to-earliest --group <name> --topic <name> --execute.',
          },
          {
            error: `kafka-consumer-groups.sh --describe shows blank dashes in the CONSUMER-ID and HOST columns for a group you expect to be actively running`,
            cause: 'The group\'s last committed offsets are stored durably in __consumer_offsets and remain visible even when no consumer instance is currently connected and assigned to that group — the blank columns mean the group exists and has committed progress, but nothing is live right now.',
            fix: 'If you expect an application to be actively consuming, confirm it is actually running and successfully connected to this broker\'s bootstrap-server address, per Part 07 — blank identity columns on a group you believe should be live is itself a useful diagnostic signal that the consumer process is down or misconfigured.',
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
          'A single-broker, KRaft-mode Kafka cluster runs entirely from one Docker Compose file with no external ZooKeeper dependency — the broker manages its own cluster metadata internally.',
          'kafka-topics.sh handles all topic administration: --create, --list, and --describe, with --describe showing the partition-by-partition leader, replica list, and in-sync replica list that reveals real topic health.',
          'kafka-console-producer.sh and kafka-console-consumer.sh let you exercise a topic entirely from the command line; --from-beginning reads full retained history, and --group turns a throwaway read into a real, offset-committing consumer group.',
          'kafka-consumer-groups.sh --describe is the primary operational tool for consumer health, reporting lag per partition rather than as one aggregate — always check the per-partition breakdown before concluding a group is healthy.',
          'Replication factor 1 is a correct, deliberate choice for local learning on a single broker, and a dangerous one in production — never carry a local-dev setting into a production topic-creation command without reconsidering it.',
          'Common local-dev failures — port conflicts, cluster ID mismatches after editing compose files, and replication factor exceeding broker count — all have specific, predictable causes and fixes rather than being random flakiness.',
        ]}
      />
    </LearnLayout>
  )
}
