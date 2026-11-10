import { LearnLayout } from '@/components/content/LearnLayout'
import { BulletList, Callout, Chapter, CodeBlock, DeepExplain, Divider, KeyTakeaways, P, Table } from './_lesson-ui'

export default function KafkaWithoutZooKeeperKRaftMode() {
  return (
    <LearnLayout
      title="Kafka Without ZooKeeper — KRaft Mode"
      description="Learn how Kafka's KRaft metadata quorum replaces ZooKeeper, how controller and broker roles work, and what the Kafka 3.3 and 4.0 milestones mean for operators."
      section="Apache Kafka — Lesson 21"
      readTime="40 min"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Kafka Without ZooKeeper — KRaft Mode', href: '/learn/apache-kafka/kafka-without-zookeeper-kraft-mode' },
      ]}
    >
      <Chapter n="01" title="Why Kafka Replaced ZooKeeper" subtitle="Prerequisites: brokers, partitions, replication, leaders, and the controller's role in cluster metadata." />
      <P><strong>Learning objective:</strong> explain the KRaft controller quorum, start a disposable local cluster, and identify the migration boundary between ZooKeeper-based Kafka and Kafka 4.0.</P>
      <P>Kafka stores user records in partition logs, but it also needs an authoritative view of cluster metadata: which brokers exist, which broker leads each partition, what topic configuration applies, and how the cluster should react when a broker fails. Historically Kafka delegated this coordination and metadata storage to ZooKeeper. That meant operators ran and secured two distributed systems: Kafka for event data and ZooKeeper for coordination.</P>
      <P>KRaft is Kafka's built-in consensus-based metadata mode. Controllers keep the metadata log and elect an active controller through a quorum; brokers use that metadata to serve partitions. The metadata log is separate from application-topic data logs. KRaft reduces the dependency and coordination boundary, but it does not eliminate cluster operations, replication design, monitoring, or careful quorum sizing.</P>
      <Callout title="Version facts that matter" tone="green">KRaft reached general availability in Apache Kafka 3.3. ZooKeeper mode was removed in Apache Kafka 4.0. Kafka 4.x therefore runs with KRaft; a Kafka 4.0 deployment cannot be configured to use ZooKeeper. These milestones do not mean every older cluster can be upgraded with a one-command switch.</Callout>
      <Divider />

      <Chapter n="02" title="The KRaft Roles and Metadata Quorum" />
      <DeepExplain title="Controllers maintain the cluster's metadata history">
        <P>A KRaft controller is a Kafka process role responsible for the metadata quorum. The active controller handles metadata changes and leadership decisions; other controllers replicate the metadata log and can take over if the active controller fails. A broker serves client requests and partition replicas. In a combined deployment a process can have both roles; in a larger production environment, dedicated controller nodes isolate metadata duties from broker data traffic.</P>
        <P>Quorum consensus requires a majority of controller voters to make progress. For three voters, two must be available; for five, three must be available. Adding voters improves fault tolerance only when they are independent and correctly configured. A network partition that leaves no majority prevents metadata changes, even if some brokers still have local data.</P>
      </DeepExplain>
      <Table headers={['Role', 'Primary responsibility', 'Typical placement']} rows={[
        ['Broker', 'Serve client reads and writes; host partition replicas.', 'All Kafka clusters.'],
        ['Controller', 'Replicate metadata log; coordinate cluster metadata and partition leadership.', 'Combined for development; often dedicated in larger clusters.'],
        ['Combined node', 'Run broker and controller roles in one process.', 'Local development and appropriately sized small clusters.'],
        ['Dedicated controller', 'Keep quorum work isolated from broker workload.', 'Production clusters with separate role configuration.'],
      ]} />
      <Callout title="Do not count brokers as quorum voters" tone="red">Only controller members participate in the metadata quorum. Three brokers do not provide a three-controller quorum unless those processes are actually configured as controller voters.</Callout>
      <Divider />

      <Chapter n="03" title="Start a Local KRaft Broker" subtitle="Use the configuration and command syntax shipped with the Kafka distribution you install." />
      <P>Kafka quickstarts are useful for a disposable local cluster, but a single combined broker/controller is not a production topology. Start from the distribution's KRaft-ready server configuration, which defines node identity, process roles, listeners, and quorum settings. Format the empty metadata log once with a generated cluster ID, then start the server.</P>
      <CodeBlock title="Shell — local single-node KRaft development setup">{`# Run from the extracted Kafka distribution directory.
export KAFKA_CLUSTER_ID="$(bin/kafka-storage.sh random-uuid)"

# For a disposable, single-node local cluster. The config must be a
# KRaft-ready server configuration from this Kafka distribution.
bin/kafka-storage.sh format --standalone \
  -t "$KAFKA_CLUSTER_ID" \
  -c config/server.properties

bin/kafka-server-start.sh config/server.properties`}</CodeBlock>
      <P>The format command initializes storage metadata; it is not a command to run on every restart. Keep the generated cluster identity and storage directory together. Never point a production node at an existing data directory and reformat it to “fix” startup errors—first identify the cluster ID, node ID, quorum membership, and log directory state.</P>
      <CodeBlock title="Create and inspect a topic after the broker starts">{`bin/kafka-topics.sh --bootstrap-server localhost:9092 \
  --create --topic orders --partitions 3 --replication-factor 1

bin/kafka-topics.sh --bootstrap-server localhost:9092 \
  --describe --topic orders`}</CodeBlock>
      <Callout title="One replica is only for local practice" tone="orange">The example uses replication factor 1 because one broker cannot host multiple independent replicas. A single-node development cluster cannot demonstrate broker failure tolerance. Production replication factor, min.insync.replicas, acknowledgements, and failure-domain placement are separate decisions.</Callout>
      <Divider />

      <Chapter n="04" title="Membership, Listeners, and Storage Are Explicit" />
      <P>KRaft configuration describes each node's identity, its roles, client/inter-broker listeners, controller listener, and how a node discovers the quorum. Kafka has supported static and dynamic controller quorum configurations across the KRaft era; the appropriate properties and bootstrap procedure depend on the Kafka release and quorum mode. Do not copy a configuration from a different release without checking its versioned documentation.</P>
      <P>For a dedicated-controller layout, controller nodes are configured as controllers and brokers as brokers; both sides must agree on listener names and quorum membership. A controller listener should not be advertised as the public client endpoint. Bind or advertise client endpoints to addresses reachable from the intended client network, and secure them with the chosen TLS/SASL mechanism.</P>
      <CodeBlock title="Topology sketch — not a copy/paste properties file">{`Development:
  node-1: broker + controller
  one local metadata quorum member

Production example:
  controller-1, controller-2, controller-3: controller role
  broker-1 ... broker-N: broker role
  controller listener: private controller network
  client listener: client-facing network with authentication

All controller members need consistent quorum identity and membership.
All brokers need reachable controller bootstrap configuration.`}</CodeBlock>
      <P>Before adding a node, confirm whether the cluster uses a static voter list or dynamic quorum membership, and follow the supported add/remove procedure for that mode. Treat node IDs, cluster ID, metadata directories, and quorum membership as durable operational state. A controller replacement is not just a DNS change.</P>
      <Divider />

      <Chapter n="05" title="Migration and Upgrade Are Planned Operations" />
      <P>Kafka 3.3 made KRaft generally available, but a ZooKeeper-to-KRaft migration still has to follow the exact supported procedure for the source and target releases. Migration involves metadata state, controller quorum configuration, broker versions, and a carefully managed transition. Check the versioned upgrade documentation and vendor guidance before operating on real data. Do not skip intermediate releases or infer that a successful binary upgrade means metadata migration completed.</P>
      <P>Kafka 4.0 removes ZooKeeper mode. That is a compatibility boundary: a ZooKeeper-based cluster must be migrated through a supported KRaft path before moving to 4.0. Keep backups, verify the migration plan in a representative test cluster, check client and connector compatibility, and define a rollback point before changing production metadata.</P>
      <Table headers={['Milestone', 'What it means', 'Operator action']} rows={[
        ['Kafka before 3.3', 'KRaft existed as an evolving mode, not yet GA.', 'Use release-specific support guidance; do not assume production readiness.'],
        ['Kafka 3.3', 'KRaft became generally available.', 'Plan a supported migration if the cluster is on ZooKeeper.'],
        ['Kafka 4.0', 'ZooKeeper mode was removed.', 'KRaft is required; confirm migration and client compatibility first.'],
      ]} />
      <Callout title="Versioned documentation beats a generic recipe" tone="blue">Before migration, identify the exact broker version, quorum mode, deployment platform, and replication setup. The procedure can change across releases; treat the versioned Apache Kafka upgrade guide as the runbook source, not a copied blog command.</Callout>
      <Divider />

      <Chapter n="06" title="Recovery, Monitoring, and Common Mistakes" />
      <BulletList items={[
        'Formatting an existing metadata directory as if it were a fresh node; inspect logs and cluster identity before taking action.',
        'Running too few controller voters for the required failure tolerance; size the quorum and distribute members across failure domains.',
        'Making every process combined by default; separate controller and broker roles when workload isolation is useful.',
        'Exposing the controller listener to application clients; keep controller traffic on a controlled network.',
        'Assuming KRaft removes the need for backups, upgrade tests, or broker data replication; it changes metadata management, not every reliability concern.',
      ]} />
      <P>Observe controller health and quorum progress alongside broker metrics. Alert on controller unavailability, metadata replication lag, repeated elections, offline partitions, under-replicated partitions, and storage pressure. During an incident, gather logs and configuration before changing membership; arbitrary quorum edits can make recovery harder.</P>
      <Divider />

      <Chapter n="07" title="Practice and Takeaways" />
      <BulletList items={[
        'Run the local single-node setup in a disposable environment. Create a topic and explain why replication factor 1 proves no failure tolerance.',
        'Draw a three-controller, five-broker topology. Mark which nodes vote in the metadata quorum and what happens if one controller is unavailable.',
        'Compare combined and dedicated roles for a small team and a high-throughput production cluster.',
        'Write an upgrade checklist for a ZooKeeper-backed cluster targeting Kafka 4.0. Identify versioned documentation, backups, compatibility checks, and rollback criteria.',
        'Review a sample listener configuration and identify which endpoint is for clients versus controller communication.',
      ]} />
      <KeyTakeaways items={[
        'KRaft stores Kafka cluster metadata in Kafka’s own replicated metadata log and quorum.',
        'Controllers participate in the metadata quorum; brokers serve data partitions.',
        'KRaft has been GA since Kafka 3.3, and Kafka 4.0 removed ZooKeeper mode.',
        'A local one-node cluster demonstrates startup, not production availability.',
        'Migration and upgrades must follow the exact versioned procedure for the current cluster.',
      ]} />
    </LearnLayout>
  )
}
