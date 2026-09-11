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

export default function ManagedKafkaCloud() {
  return (
    <LearnLayout
      title="Managed Kafka and Cloud Choices"
      description="Why teams choose managed Kafka over self-hosting, how Confluent Cloud, Amazon MSK, Redpanda, and WarpStream actually differ, Kubernetes-based self-management with Strimzi as a middle ground, real cost-model trade-offs, migration considerations, and a decision framework for choosing based on team size, cloud provider, compliance, and throughput."
      section="Apache Kafka — Module 22"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Managed Kafka and Cloud Choices', href: '/learn/apache-kafka/managed-kafka-cloud' },
      ]}
      prev={{ title: 'Change Data Capture with Debezium', href: '/learn/apache-kafka/cdc-debezium' }}
      next={{ title: 'Testing and Debugging Kafka Systems', href: '/learn/apache-kafka/testing-debugging' }}
    >
      {/* ── Part 01 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why Teams Stop Self-Hosting" />
        <SectionTitle>Running Kafka Yourself Is a Real, Ongoing Team-Time Cost — Not Just a Server Bill</SectionTitle>
        <Para>
          Every module up to this point has treated "the Kafka cluster" as a given — brokers exist, they
          have leaders and followers, they store data on disk. What those modules did not cover is who
          keeps that cluster alive: who patches broker versions, plans disk capacity ahead of growth,
          responds when a broker's disk fills at 3 AM, rebalances partitions after adding hardware, and
          keeps ZooKeeper or a KRaft controller quorum healthy. Self-hosting Kafka means a team owns all of
          that, indefinitely, on top of building the actual data pipelines the business needs.
        </Para>
        <Para>
          This is the real reason managed Kafka exists and has grown to dominate new deployments: it is not
          that self-hosted Kafka is unreliable — plenty of large, sophisticated companies run it well — it
          is that operating a distributed, stateful system well requires specialized, ongoing expertise that
          many teams would rather not build and staff for, when a vendor can provide the same capability as
          a managed service.
        </Para>
        <HighlightBox>
          <Para>
            <strong>What self-hosting actually requires a team to own, continuously:</strong>
          </Para>
          <Para>
            <strong>Capacity planning</strong> — provisioning enough broker disk and network throughput
            ahead of growth, not after a topic starts rejecting writes because a broker ran out of disk, a
            failure mode covered in the data-engineering broker module.
          </Para>
          <Para>
            <strong>Version upgrades and patching</strong> — Kafka broker upgrades, especially major version
            jumps, require careful rolling-restart sequencing to avoid downtime, and security patches on the
            underlying JVM and host OS need their own cadence.
          </Para>
          <Para>
            <strong>On-call for broker and disk failures</strong> — a broker disk failing, a network
            partition between brokers, or an under-replicated partition alert are 3 AM pages on a
            self-hosted cluster; on a managed service, the vendor's own on-call team absorbs the
            infrastructure-layer half of that page.
          </Para>
          <Para>
            <strong>Security and access control plumbing</strong> — TLS certificate rotation, SASL
            credential management, and ACL administration all need an owner, continuously, not just at
            initial setup.
          </Para>
        </HighlightBox>
        <Para>
          None of this means self-hosting is the wrong choice for every team — Part 05 covers exactly when
          it still makes sense. But the decision should be made with the full, ongoing cost in view, not
          just the sticker price of running broker VMs, which is usually the smallest part of the real cost.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Confluent Cloud" />
        <SectionTitle>Confluent Cloud — the Broadest Feature Parity, From the Company Kafka's Original Creators Founded</SectionTitle>
        <Para>
          Confluent was founded by the original creators of Kafka at LinkedIn, and Confluent Cloud is its
          fully managed Kafka offering. Because Confluent has spent over a decade building the broader
          ecosystem around Kafka — Schema Registry, ksqlDB, a large library of Kafka Connect connectors, and
          the reference implementations several of those pieces are built around — Confluent Cloud generally
          offers the broadest feature parity with a full, self-hosted open-source Kafka ecosystem of any
          managed option.
        </Para>
        <SubTitle>What comes managed, beyond just brokers</SubTitle>
        <Para>
          A meaningful distinction from other managed Kafka options: Confluent Cloud does not just manage
          broker infrastructure, it manages the surrounding ecosystem components as fully hosted services
          too — a managed Schema Registry (the same Avro/Protobuf schema-compatibility enforcement covered
          in the Kafka Connect module), managed Kafka Connect (many of the same source and sink connectors
          covered in that module, offered as a point-and-click managed service rather than something you
          deploy and operate on your own Connect cluster), and managed ksqlDB for stream processing without
          managing a Kafka Streams application's own deployment.
        </Para>
        <Table
          headers={['Component', 'Self-hosted, the way earlier modules covered it', 'Confluent Cloud equivalent']}
          rows={[
            ['Brokers', 'Deployed, patched, and capacity-planned by your team', 'Fully managed, provisioned by cluster type and throughput tier'],
            ['Schema Registry', 'A separate service you deploy and operate', 'A managed service, provisioned alongside the cluster'],
            ['Kafka Connect', 'A distributed Connect cluster you deploy, per Module 13', 'Managed connectors, configured through Confluent\'s own console/API rather than a self-run Connect REST API'],
            ['ksqlDB / stream processing', 'Deployed and scaled as your own application or cluster', 'Managed ksqlDB clusters, provisioned per workload'],
          ]}
        />
        <Callout title="Broad feature parity is the trade-off, not a free lunch" color="#38bdf8">
          Confluent Cloud's breadth of managed ecosystem components generally comes at a higher price point
          than a bare-bones managed broker service like MSK Serverless. The right read of this is not
          "Confluent Cloud is expensive" in isolation — it is that Confluent Cloud is pricing in more
          operational surface being taken off your team's plate than a brokers-only managed offering does,
          and whether that trade is worth it depends on how much of that surrounding ecosystem your team
          would otherwise have to operate itself.
        </Callout>
        <Para>
          The practical implication for a team evaluating Confluent Cloud: if the pipeline design already
          depends on Schema Registry, Connect, or ksqlDB — which, having gone through the Kafka Connect
          module, most production pipelines in this track's scope do — Confluent Cloud is worth strong
          consideration specifically because it removes the operational burden of those pieces too, not
          just the brokers.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Amazon MSK" />
        <SectionTitle>Amazon MSK — Managed Brokers With Deep AWS Integration, More Client-Side Responsibility Left to You</SectionTitle>
        <Para>
          Amazon Managed Streaming for Apache Kafka (MSK) is AWS's managed Kafka offering. It manages
          broker provisioning, patching, and the underlying infrastructure, but MSK's managed surface is
          narrower than Confluent Cloud's — it does not bundle a managed Schema Registry, managed Connect,
          or managed ksqlDB as first-party equivalents (AWS offers a separate, related but distinct service,
          MSK Connect, for running Kafka Connect connectors, and Glue Schema Registry as a separate product
          for schema management, rather than these being unified into one MSK offering the way Confluent
          bundles them).
        </Para>
        <SubTitle>Deep AWS IAM and VPC integration</SubTitle>
        <Para>
          MSK's strongest differentiator is how tightly it integrates with the rest of AWS. Broker access
          can be authenticated using IAM roles and policies directly — the same access-control model used
          for S3 buckets, Lambda functions, and every other AWS service — rather than managing a separate
          SASL credential system. MSK clusters run inside your own VPC by default, meaning network-level
          access control, security groups, and private connectivity to other AWS services (S3, Lambda,
          Kinesis, RDS) work the same way they do for any other AWS-native resource, with no separate
          networking model to learn.
        </Para>
        <CodeBox label="IAM-based MSK authentication, conceptually — no separate credential store to manage">
{`# A producer authenticating to MSK using IAM, rather than SASL/SCRAM:

producer_config = {
    "bootstrap.servers": "b-1.mycluster.abc123.kafka.us-east-1.amazonaws.com:9098",
    "security.protocol": "SASL_SSL",
    "sasl.mechanism": "AWS_MSK_IAM",
    # No static username/password anywhere in this config --
    # the AWS SDK's normal credential chain (an EC2 instance role,
    # an ECS task role, or an assumed IAM role) is what authenticates.
}

# The IAM policy attached to that role grants specific Kafka
# actions on specific resources, the same policy-document model
# used for every other AWS service:
{
  "Effect": "Allow",
  "Action": ["kafka-cluster:Connect", "kafka-cluster:WriteData"],
  "Resource": "arn:aws:kafka:us-east-1:123456789012:topic/mycluster/*/orders"
}`}
        </CodeBox>
        <SubTitle>MSK Serverless — usage-based, no capacity planning</SubTitle>
        <Para>
          MSK Serverless is a variant that removes broker sizing and partition capacity planning entirely —
          you create topics and produce/consume, and AWS scales the underlying capacity automatically,
          billing based on actual throughput and storage rather than provisioned broker instances. This
          trades some of the fine-grained performance tuning available on provisioned MSK clusters (and a
          higher per-unit cost at sustained high throughput) for meaningfully less operational thinking about
          cluster sizing — closer in spirit to how a team would think about a fully serverless database.
        </Para>
        <Table
          headers={['', 'MSK Provisioned', 'MSK Serverless']}
          rows={[
            ['Capacity planning', 'You choose broker instance types, count, and storage — similar mental model to self-hosting, minus the patching', 'None — capacity scales automatically with actual usage'],
            ['Pricing model', 'Per broker-hour plus storage, regardless of whether it\'s fully utilized', 'Per GB produced/consumed plus storage — usage-based'],
            ['Performance tuning surface', 'Broker-level configuration is more exposed and tunable', 'Less exposed — AWS manages more of the tuning decisions internally'],
            ['Best fit', 'Predictable, sustained high-throughput workloads where provisioned capacity is well-utilized', 'Spiky, unpredictable, or lower-throughput workloads where the ops savings outweigh the per-unit cost premium'],
          ]}
        />
        <Callout title="MSK leaves more client-side configuration to you than Confluent Cloud" color={K}>
          Because MSK is closer to &quot;managed brokers, same open-source Kafka underneath, more of the
          surrounding ecosystem left to you,&quot; a team choosing MSK should expect to run its own Kafka Connect
          (via MSK Connect or self-hosted Connect workers) and its own Schema Registry decision (Glue Schema
          Registry, a self-hosted Confluent-compatible registry, or Confluent Cloud's registry pointed at an
          MSK cluster) more deliberately than a Confluent Cloud customer would need to.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Redpanda and WarpStream" />
        <SectionTitle>Redpanda and WarpStream — Kafka-Protocol-Compatible, Built on Fundamentally Different Architectures</SectionTitle>
        <Para>
          A newer category of entrant does not run Apache Kafka's actual broker code at all. Instead, these
          systems implement the Kafka wire protocol — the same network protocol every Kafka client library
          already speaks — on top of a completely different internal architecture. The practical significance
          is that existing Kafka producer and consumer client code can often point at one of these systems
          with just a configuration change, no application code rewrite, because from the client's point of
          view, the protocol looks like Kafka.
        </Para>
        <SubTitle>Redpanda — Kafka-API-compatible, not built on the JVM</SubTitle>
        <Para>
          Redpanda is a from-scratch reimplementation of a Kafka-compatible broker, written in C++ rather
          than Java, with no JVM in its runtime at all. Its stated design goals center on avoiding JVM
          garbage-collection pauses (a real source of the session-timeout and rebalance issues covered in
          the producers-consumers-brokers module) and simplifying operations by removing ZooKeeper-or-KRaft
          as a separate concern — Redpanda bundles its own Raft-based consensus directly into each broker
          process rather than requiring a distinct controller quorum to operate.
        </Para>
        <SubTitle>WarpStream — Kafka-API-compatible, built directly on object storage</SubTitle>
        <Para>
          WarpStream takes a more radical architectural departure: rather than brokers with attached local
          disks holding partition data the way Kafka, Redpanda, and MSK all fundamentally work, WarpStream's
          brokers are stateless and write data directly to object storage (S3 or an equivalent) as the
          primary and only durable store — there is no broker-local disk holding the canonical copy of a
          partition's data at all. This removes the need for the broker-to-broker replication mechanics
          covered in the message-brokers module (leaders, followers, ISRs) as the durability mechanism,
          since object storage itself provides the durability, at the cost of the higher latency inherent
          to writing through an object store rather than a local disk.
        </Para>
        <Table
          headers={['', 'Apache Kafka / MSK', 'Redpanda', 'WarpStream']}
          rows={[
            ['Runtime', 'JVM', 'C++, no JVM', 'Go, stateless brokers'],
            ['Primary durable storage', 'Local broker disk, replicated to followers', 'Local broker disk, replicated to followers', 'Object storage (S3 or equivalent) directly — no broker-local canonical copy'],
            ['Consensus/coordination', 'KRaft controller quorum (or legacy ZooKeeper)', 'Built into each broker via Raft, no separate quorum service', 'Coordination metadata also object-storage-backed, in WarpStream\'s architecture'],
            ['Kafka wire protocol compatible', 'Is Kafka', 'Yes — client libraries generally work unmodified', 'Yes — client libraries generally work unmodified'],
            ['Maturity / ecosystem breadth', 'The reference implementation, broadest tooling and connector support', 'Younger, growing connector and tooling ecosystem', 'Newest of the three, narrowest ecosystem maturity as of this writing'],
          ]}
        />
        <Callout title="'Kafka-API-compatible' is not the same claim as 'full feature parity with Apache Kafka'" color="#ff4757">
          It is important not to overstate what protocol compatibility guarantees. Basic produce/consume
          workflows generally work unmodified against Redpanda or WarpStream because they speak the same
          wire protocol. But specific advanced features, specific client library edge-case behaviors, and
          the breadth of first-party Kafka Connect connector support can differ meaningfully from
          self-hosted Apache Kafka or from Confluent Cloud's ecosystem depth. Evaluating one of these newer
          options for a specific production workload means testing the specific features that workload
          actually depends on, not assuming &quot;Kafka-compatible&quot; means &quot;drop-in identical.&quot;
        </Callout>
        <Para>
          The reason these options are worth knowing conceptually, even for a team that ultimately chooses
          Confluent Cloud or MSK: they represent a genuinely different set of trade-offs — lower operational
          complexity and different cost curves in exchange for a younger ecosystem — and understanding what
          "no JVM" or "object-storage-native" actually changes structurally (not just as a marketing claim)
          is what lets you evaluate whether that trade-off fits a specific workload's needs.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Self-Managed on Kubernetes" />
        <SectionTitle>Self-Managed Kafka on Kubernetes — Control Without Hand-Rolling Every Operational Script</SectionTitle>
        <Para>
          Between fully managed and fully hand-rolled self-hosting sits a middle ground: running Kafka
          yourself, but on Kubernetes, using an operator that automates the operational mechanics that would
          otherwise be manual scripts and runbooks. Strimzi is the most widely adopted open-source Kafka
          operator for this purpose.
        </Para>
        <Para>
          A Kubernetes operator, in general, is a piece of software that encodes operational knowledge about
          running a specific system as Kubernetes-native automation — instead of a human running a rolling
          restart script for a broker version upgrade, the operator watches a declarative configuration
          (expressed as Kubernetes custom resources) and reconciles the running cluster to match it,
          handling the sequencing of broker restarts, and coordinating changes across the cluster safely.
        </Para>
        <CodeBox label="a Strimzi Kafka cluster definition, conceptually — declarative, not a runbook">
{`apiVersion: kafka.strimzi.io/v1beta2
kind: Kafka
metadata:
  name: freshcart-kafka
spec:
  kafka:
    replicas: 3
    version: 3.7.0
    config:
      default.replication.factor: 3
      min.insync.replicas: 2
    storage:
      type: persistent-claim
      size: 500Gi
  entityOperator:
    topicOperator: {}
    userOperator: {}

# Bumping "version: 3.7.0" to a newer version and re-applying this
# resource triggers Strimzi's own controlled, rolling upgrade of
# every broker in the cluster -- the same operation Part 01 described
# as a real, careful, manual process on a hand-rolled self-hosted setup.`}
        </CodeBox>
        <Table
          headers={['', 'Hand-rolled self-hosting', 'Strimzi on Kubernetes', 'Fully managed (Confluent Cloud / MSK)']}
          rows={[
            ['Who patches broker versions', 'Your team, via a manual/scripted runbook', 'Your team declares the target version; Strimzi automates the rolling upgrade sequence', 'The vendor, on their own schedule and SLA'],
            ['Who owns the underlying compute', 'Your team, VMs or bare metal', 'Your team, via your existing Kubernetes cluster', 'The vendor, entirely'],
            ['Configuration model', 'Broker config files, managed by hand or your own IaC', 'Kubernetes custom resources — declarative, GitOps-friendly', 'Vendor console/API/Terraform provider'],
            ['Control over broker-level tuning', 'Full', 'Full — same underlying Kafka, exposed through the operator\'s config surface', 'Reduced — many tuning decisions are abstracted or unavailable'],
            ['Team ops burden', 'Highest', 'Meaningfully reduced by the operator, but the team still owns Kubernetes itself', 'Lowest'],
          ]}
        />
        <Callout title="Strimzi doesn't remove Kubernetes as an operational dependency — it shifts Kafka expertise into Kubernetes expertise" color={K}>
          A team choosing Strimzi still needs to operate a Kubernetes cluster well — node capacity planning,
          persistent volume management, and Kubernetes upgrades themselves become dependencies. This is a
          reasonable trade for a team that already runs Kubernetes at scale and has that operational muscle
          in place; it is a less obviously good trade for a team with no existing Kubernetes investment,
          where adopting Kubernetes specifically to run Strimzi adds a whole second operational surface
          rather than simplifying one.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Cost Models" />
        <SectionTitle>Cost Isn't One Number — Self-Hosted Trades Infra Cost for Headcount Cost, Managed Trades It Back</SectionTitle>
        <Para>
          Comparing "self-hosted Kafka" against "managed Kafka" purely on a cloud infrastructure bill is a
          category error. The honest cost comparison has to include the ongoing engineering time from Part
          01 — capacity planning, patching, on-call, security administration — priced at that team's actual
          fully-loaded cost, not treated as free because it does not show up as a separate line item on a
          cloud invoice.
        </Para>
        <CodeBox label="a simplified but honest framing of the two cost models">
{`Self-hosted total cost, roughly:
  infrastructure cost (broker VMs, disk, network)
  + ongoing engineering time (capacity planning, patching,
    on-call, security admin) x fully-loaded engineer cost
  + the opportunity cost of that engineering time not being
    spent on product work

Managed total cost, roughly:
  usage-based or capacity-based vendor pricing
    (which already has the vendor's own ops cost baked in)
  + a smaller amount of engineering time for integration,
    monitoring, and vendor-specific configuration

Neither number is universally smaller. The crossover point
depends entirely on throughput scale and how much the team's
engineering time is worth relative to the vendor's markup.`}
        </CodeBox>
        <SubTitle>Where the crossover point tends to sit</SubTitle>
        <Para>
          At low-to-moderate, steady throughput, managed pricing is usually the cheaper total-cost choice
          for most teams, because the ongoing engineering-time cost of self-hosting a small cluster well
          rarely justifies itself against a modest vendor bill — a small team keeping a Kafka expert on
          call for a cluster processing a few hundred megabytes a day is spending far more in engineering
          time than the equivalent managed service would cost.
        </Para>
        <Para>
          At sustained very high throughput, usage-based managed pricing can grow to significantly exceed
          the cost of self-hosted infrastructure plus a dedicated operations team, because the per-unit
          markup on managed pricing is charged against every byte at scale, while the engineering-time cost
          of running a larger self-hosted team does not scale linearly with throughput the same way — a
          platform team sized to operate a 50-broker cluster well is not meaningfully bigger than one sized
          to operate a 15-broker cluster well.
        </Para>
        <Table
          headers={['Scale profile', 'Where cost usually favors']}
          rows={[
            ['Low-to-moderate, steady throughput; small team; no dedicated platform/infra function', 'Managed — the vendor markup is smaller than the cost of building dedicated Kafka expertise for this scale'],
            ['Sustained very high throughput; existing platform/infra team; multi-year time horizon', 'Self-hosted or Kubernetes-based (Strimzi) — usage-based managed pricing scales with volume in a way infrastructure-plus-headcount cost does not'],
            ['Spiky, unpredictable throughput at any scale', 'Usage-based managed options (MSK Serverless, or Confluent Cloud\'s consumption pricing) — paying for idle provisioned capacity is the specific cost self-hosting and provisioned managed clusters both share'],
          ]}
        />
        <Callout title="This crossover point is a real, team-specific calculation — not a fixed throughput number" color="#38bdf8">
          There is no universal "above X GB/day, self-host" rule that holds across every company, because
          the engineering-time side of the equation depends heavily on what a team's engineers actually
          cost, whether a platform team already exists for other reasons, and how much the business values
          the flexibility of not being tied to a specific vendor's roadmap and pricing changes. Run the
          actual numbers for the specific team and scale in question rather than applying a rule of thumb
          from a different company's blog post.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Migration Considerations" />
        <SectionTitle>Migrating Between Kafka Deployments — Client Code Doesn't Change, the Operational Surface Does</SectionTitle>
        <Para>
          Because every option covered in this module — self-hosted Apache Kafka, MSK, Confluent Cloud,
          Redpanda, WarpStream, Strimzi-on-Kubernetes — speaks the same Kafka wire protocol, a producer or
          consumer written against one of them generally requires no application code changes to point at
          another. The bootstrap servers change, authentication configuration changes, and TLS settings
          change — the actual <code>producer.send()</code> or <code>consumer.poll()</code> call in the
          application does not.
        </Para>
        <CodeBox label="what actually changes in a migration — configuration, not application logic">
{`# Before: self-hosted Kafka cluster
producer_config = {
    "bootstrap.servers": "kafka-1.internal:9092,kafka-2.internal:9092",
    "security.protocol": "SASL_SSL",
    "sasl.mechanism": "SCRAM-SHA-512",
    "sasl.username": "orders-service",
    "sasl.password": "...",
}

# After: migrated to Confluent Cloud
producer_config = {
    "bootstrap.servers": "pkc-abc123.us-east-1.aws.confluent.cloud:9092",
    "security.protocol": "SASL_SSL",
    "sasl.mechanism": "PLAIN",
    "sasl.username": "<API key>",
    "sasl.password": "<API secret>",
}

# The application code calling producer.send(topic, key, value)
# is IDENTICAL before and after. Every acks, retries, batching,
# and idempotence setting from the producers-consumers-brokers
# module still means exactly what it meant before.`}
        </CodeBox>
        <Para>
          What does change, and requires real planning, is the operational surface: monitoring dashboards
          and alerting rules built against self-hosted broker metrics need to be rebuilt against whatever
          observability surface the new platform exposes, topic and ACL administration workflows change to
          whatever the new platform's management interface is, and any tooling that assumed direct SSH
          access to broker hosts (for log inspection, disk checks, or manual intervention) has no equivalent
          on a fully managed platform, where that layer is intentionally not exposed to the customer.
        </Para>
        <Table
          headers={['What migrates unchanged', 'What has to be rebuilt']}
          rows={[
            ['Producer/consumer application code and its Kafka client library calls', 'Bootstrap servers, authentication mechanism, and TLS configuration'],
            ['Topic-level semantics: keys, partitioning, ordering guarantees, compaction behavior', 'Broker-level monitoring dashboards and alerting rules built against self-hosted metrics'],
            ['Kafka Connect connector configurations, in most cases (the connector plugin itself is portable)', 'Connect deployment model, if moving from self-hosted distributed Connect to a managed Connect offering with a different management interface'],
            ['Schema Registry-enforced schemas and compatibility rules, if the same registry is retained or a compatible one is used', 'Direct host-level operational tooling — SSH-based log inspection, manual disk checks — that assumed access a managed platform does not expose'],
          ]}
        />
        <Para>
          A useful practical consequence of this: a team is not locked into a migration decision the way it
          might be with a database that requires a genuine data-model rewrite. A poor initial choice of
          managed provider, or a self-hosted setup that has outgrown a team's operational capacity, is a
          real but bounded migration project — mostly configuration, deployment tooling, and monitoring
          rework — rather than an application rewrite.
        </Para>
      </section>

      <Divider />

      {/* ── Part 08 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Decision Framework" />
        <SectionTitle>Choosing a Deployment Model — A Framework Based on Team Size, Cloud Provider, Compliance, and Throughput</SectionTitle>
        <Para>
          With every option's real trade-offs on the table, the actual decision comes down to four factors
          most teams weigh, in roughly this order of practical importance.
        </Para>
        <SubTitle>Factor 1 — team size and existing platform expertise</SubTitle>
        <Para>
          A small team with no dedicated platform or infrastructure function should weight heavily toward a
          fully managed option (Confluent Cloud or MSK), because the ongoing engineering-time cost from
          Part 06 is disproportionately expensive for a small team relative to the vendor markup. A team
          that already runs a mature Kubernetes platform, with existing operational muscle for exactly the
          kind of concerns Strimzi automates, has a much more viable self-managed path than a team starting
          from zero.
        </Para>
        <SubTitle>Factor 2 — existing cloud provider</SubTitle>
        <Para>
          A team already deeply invested in AWS — using IAM for access control everywhere else, running
          workloads inside a carefully designed VPC topology — gets real, compounding value from MSK's
          native IAM and VPC integration that a cloud-agnostic managed service like Confluent Cloud does not
          replicate as tightly, even though Confluent Cloud also runs on AWS (and GCP and Azure) as
          underlying infrastructure. Conversely, a team intentionally avoiding cloud-provider lock-in, or
          running a genuinely multi-cloud footprint, often prefers a provider-agnostic managed option
          specifically to avoid deepening a single-cloud dependency.
        </Para>
        <SubTitle>Factor 3 — compliance and data-residency requirements</SubTitle>
        <Para>
          Regulated industries with specific data-residency requirements (data must stay within a specific
          country's borders, or within a specific certified environment) need to verify a managed provider's
          available regions and compliance certifications (SOC 2, HIPAA, PCI-DSS, FedRAMP, and equivalents)
          cover their specific requirement before committing — availability varies by provider and by
          region, and this is exactly the kind of requirement that can rule out an otherwise-preferred
          option outright, making it worth verifying early rather than after most of the evaluation is done.
        </Para>
        <SubTitle>Factor 4 — throughput and its predictability</SubTitle>
        <Para>
          As covered in Part 06, sustained very high and predictable throughput tends to favor self-hosted
          or Kubernetes-based deployment on a long enough time horizon, while low, moderate, or unpredictable
          throughput tends to favor managed, usage-based pricing. This factor is deliberately weighted last
          in this framework because, in practice, most teams evaluating this decision are not yet at the
          throughput scale where this factor dominates the other three — it becomes the deciding factor
          specifically for larger, more mature platforms.
        </Para>
        <Table
          headers={['Team profile', 'Reasonable starting recommendation']}
          rows={[
            ['Small team, no dedicated platform function, general cloud usage', 'Confluent Cloud, or MSK Serverless if already AWS-committed — minimize ops burden first'],
            ['Team deeply invested in AWS, wants tight IAM/VPC integration', 'Amazon MSK (Provisioned if throughput is predictable, Serverless if it is not)'],
            ['Team wants broadest ecosystem parity — Connect, Schema Registry, ksqlDB — without operating any of it', 'Confluent Cloud'],
            ['Team already runs Kubernetes at scale, wants control without hand-rolled ops', 'Strimzi on Kubernetes'],
            ['Team evaluating lower-operational-complexity alternatives, willing to accept a younger ecosystem', 'Redpanda or WarpStream, evaluated against the specific features the workload depends on (Part 04\'s caution applies directly here)'],
            ['Very high, sustained, predictable throughput; existing platform team; multi-year horizon', 'Self-hosted or Strimzi — the cost crossover from Part 06 usually favors this at real scale'],
            ['Strict data-residency or compliance certification requirements', 'Verify the specific provider and region meet the requirement before any other factor is weighed'],
          ]}
        />
        <Callout title="This framework produces a starting point, not a permanent commitment" color={K}>
          Because Part 07 established that migration between these options is mostly configuration and
          tooling rework rather than an application rewrite, the cost of choosing conservatively now and
          re-evaluating later — as team size, cloud footprint, compliance needs, or throughput actually
          change — is genuinely lower for Kafka than it would be for a similar decision about, say, a
          primary transactional database. It is reasonable to start with the option that best fits today's
          team and revisit the decision as the picture changes, rather than trying to pick the permanently
          correct answer up front.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Evaluating a Managed Provider Hands-On" />
        <SectionTitle>What to Actually Check Before Committing — A Practical Evaluation Checklist</SectionTitle>
        <Para>
          The decision framework in Part 08 narrows the field. Before signing a contract or migrating
          production traffic, it is worth running a short, concrete evaluation against the specific
          shortlisted options, rather than deciding purely on paper feature comparisons and pricing pages.
        </Para>
        <SubTitle>Throughput and latency, measured against your own traffic shape</SubTitle>
        <Para>
          Published benchmarks from any vendor — including Confluent, AWS, Redpanda, and WarpStream — are
          run against traffic patterns chosen to showcase that vendor's strengths. A team's own producer
          batching settings, message sizes, partition counts, and acks configuration (all covered in the
          producers-consumers-brokers module) materially change real-world throughput and latency, often by
          a wide margin from a generic published number. Running an actual load test with representative
          traffic — same message sizes, same partition strategy, same acks setting the production workload
          will use — against each shortlisted option is the only way to get a number that means anything for
          the specific workload in question.
        </Para>
        <SubTitle>Support responsiveness and escalation paths</SubTitle>
        <Para>
          A fully managed service's support tier and SLA matter disproportionately more than they would for
          a less operationally critical system, precisely because choosing managed means deliberately giving
          up the direct operational visibility self-hosting would provide. Before committing, it is worth
          understanding concretely what happens during an actual incident — what response-time SLA applies
          at the specific pricing tier being considered, whether there is a direct escalation path to an
          engineer versus a generic support queue, and what visibility the platform provides into an
          in-progress incident on the vendor's side (a public status page is a minimum bar, not a complete
          answer).
        </Para>
        <CodeBox label="a short, concrete checklist worth running before committing to a managed provider">
{`1. Run an actual load test with representative message sizes,
   partition counts, and acks settings -- not the vendor's
   published benchmark numbers.

2. Test every specific Connect connector, Schema Registry
   compatibility rule, or ksqlDB feature the pipeline design
   already depends on -- don't assume "supports Kafka" covers
   every feature in use today.

3. Confirm the specific compliance certifications and available
   regions cover the requirement (Part 08, Factor 3) -- in writing,
   not from a general marketing page.

4. Ask directly: what is the support SLA at this pricing tier,
   and what does escalation actually look like during an incident?

5. Estimate cost at both current throughput AND a realistic
   growth projection 12-24 months out -- usage-based pricing
   that looks fine today can cross the Part 06 crossover point
   sooner than expected if growth is fast.

6. Confirm the migration path back out is understood before
   migrating in -- per Part 07, this should be a configuration
   project, not a surprise application rewrite, but it is worth
   confirming that understanding explicitly rather than assuming it.`}
        </CodeBox>
        <Callout title="A short proof-of-concept catches problems a feature comparison table cannot" color={K}>
          Running a two-to-four week proof of concept against real (or realistically shaped) traffic, using
          the exact connectors, schema rules, and client configuration the production workload will actually
          use, surfaces gaps that no amount of reading documentation or comparing feature tables catches —
          a specific connector's undocumented limitation, a client library version incompatibility, or a
          latency characteristic that only shows up under the workload's actual message-size distribution.
          The cost of a short proof of concept is small relative to the cost of discovering a gap after a
          production migration is already underway.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 10 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Multi-Region and Disaster Recovery" />
        <SectionTitle>Multi-Region Kafka — How the Deployment Model Changes the Disaster-Recovery Story</SectionTitle>
        <Para>
          A single-region Kafka cluster, whether self-hosted or managed, is only as durable as that region.
          A team with a genuine business requirement to survive a full regional outage needs a
          multi-region story, and how straightforward that story is differs sharply across the deployment
          models this module has covered.
        </Para>
        <SubTitle>Cluster linking and cross-cluster replication — the general mechanism</SubTitle>
        <Para>
          Regardless of provider, cross-region Kafka durability is generally achieved by replicating topics
          from a primary cluster in one region to a standby cluster in another, using a cluster-to-cluster
          replication tool — MirrorMaker 2 in the open-source ecosystem, or a vendor-specific equivalent
          (Confluent Cluster Linking, for instance) that offers the same underlying capability with tighter
          integration into that vendor's own management tooling. This is a fundamentally different
          mechanism from the in-cluster replication (leaders, followers, ISRs) covered in the message-brokers
          module — that replication protects against a single broker failing within one cluster; cross-region
          replication protects against an entire cluster, and the region it runs in, becoming unavailable.
        </Para>
        <Table
          headers={['Deployment model', 'Multi-region story']}
          rows={[
            ['Confluent Cloud', 'Cluster Linking is a first-party managed feature — replication between Confluent Cloud clusters in different regions (or between a self-hosted cluster and Confluent Cloud) is configured, not self-operated'],
            ['Amazon MSK', 'MirrorMaker 2 (self-operated, deployed by the team, often on MSK Connect or a separate Connect cluster) or a third-party replication tool — AWS does not provide a fully managed cross-region replication product bundled into MSK itself'],
            ['Self-hosted / Strimzi', 'MirrorMaker 2, self-operated end to end — the team owns deploying, scaling, and monitoring the replication pipeline itself, on top of everything else it already owns'],
            ['Redpanda / WarpStream', 'Each has its own evolving story here — Redpanda offers its own tiered/remote replication tooling, and WarpStream\'s object-storage-native architecture changes the cross-region durability calculus in ways worth evaluating specifically against the requirement, not assumed from either open-source or Confluent\'s model'],
          ]}
        />
        <Para>
          The practical takeaway: multi-region requirements are a real, additional factor beyond Part 08's
          four-factor framework for a team that genuinely needs to survive a regional outage, and the
          operational cost of that requirement varies significantly by provider — a fully managed,
          first-party cross-region feature (as with Confluent Cloud) is a meaningfully different commitment
          than deploying and operating MirrorMaker 2 as an additional piece of self-managed infrastructure
          on top of an otherwise-managed cluster, which is closer to the MSK reality today.
        </Para>
        <Callout title="Multi-region is a requirement to confirm early, not bolt on later" color="#38bdf8">
          Because the operational shape of cross-region replication differs so much by provider, a genuine
          multi-region disaster-recovery requirement should be weighed alongside Part 08's four factors from
          the start of an evaluation, not discovered as a gap after a single-region deployment is already in
          production. A provider that was the right choice for a single-region workload is not automatically
          the right choice once cross-region durability becomes a hard requirement.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 11 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Team Topology and Ownership" />
        <SectionTitle>Who Actually Owns What — Team Topology Changes More Than the Infrastructure Diagram</SectionTitle>
        <Para>
          Moving from self-hosted to managed Kafka, or the reverse, is not purely an infrastructure decision
          — it changes what a platform or infrastructure team's job actually consists of day to day, and
          getting that team-topology shift wrong is a common, under-discussed source of friction after a
          migration that was technically successful.
        </Para>
        <SubTitle>Self-hosted — a platform team owns the full stack</SubTitle>
        <Para>
          With self-hosted Kafka (or Strimzi-on-Kubernetes), a platform team's Kafka-related work spans the
          full stack: broker capacity, version upgrades, security patching, topic and ACL administration,
          and being the first responder for every category of incident, from a single flaky broker to a
          full cluster outage. This is a substantial, specialized skill set, and teams that build it well
          tend to develop deep operational intuition about their specific cluster's behavior under their
          specific workload — a real asset, but one that takes real time and dedicated headcount to build
          and, importantly, to retain as engineers move on to other roles or companies.
        </Para>
        <SubTitle>Managed — the platform team's job shifts toward integration and governance</SubTitle>
        <Para>
          With a fully managed provider, a platform team's Kafka-related work shifts away from
          infrastructure operations and toward integration, governance, and cost management: onboarding new
          teams onto shared clusters or topics, administering topic-naming and schema-governance conventions
          (the same naming-discipline concerns covered for Kafka Connect apply directly here), managing the
          vendor relationship and monitoring spend against the cost model from Part 06, and being the
          escalation point to the vendor's own support organization during an incident rather than being the
          incident's first, and only, responder.
        </Para>
        <Table
          headers={['Responsibility', 'Self-hosted / Strimzi', 'Fully managed']}
          rows={[
            ['Broker capacity and version upgrades', 'Owned directly by the platform team', 'Owned by the vendor'],
            ['First incident response for broker/disk/network failures', 'The platform team, directly', 'The vendor\'s own on-call, with the platform team as an informed escalation point'],
            ['Topic naming, schema governance, ACL conventions', 'Owned by the platform team either way', 'Owned by the platform team either way'],
            ['Cost and capacity forecasting', 'Infrastructure capacity planning against workload growth', 'Usage-based spend forecasting against the pricing model, per Part 06'],
            ['Vendor relationship management', 'Not applicable', 'A genuinely new, ongoing responsibility — contract terms, support tier, roadmap alignment'],
          ]}
        />
        <Callout title="A migration to managed Kafka is also a role redefinition for whoever operated the old cluster" color="#38bdf8">
          Teams sometimes plan the infrastructure side of a managed migration carefully while leaving the
          people side implicit, and then are surprised when engineers who built deep expertise running Kafka
          feel their role has narrowed, or when nobody on the team has developed the specific governance and
          vendor-management skills the new model actually requires day to day. Planning explicitly for what
          the platform team's job becomes after the migration — not just what infrastructure changes — is
          worth doing as part of the decision, not as an afterthought once the migration is already complete.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 12 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Security and Multi-Tenancy Across Providers" />
        <SectionTitle>Security Configuration Looks Similar Everywhere — the Access-Control Model Underneath Differs</SectionTitle>
        <Para>
          Every option covered in this module supports the same broad security building blocks the earlier
          Kafka modules assumed — TLS in transit, authentication, and per-topic authorization — but how those
          building blocks are configured and administered differs enough across providers to be worth a
          direct comparison, especially for a team that will be running many teams' workloads on one shared
          cluster.
        </Para>
        <SubTitle>Authentication mechanisms, by provider</SubTitle>
        <Table
          headers={['Provider', 'Primary authentication mechanism', 'How credentials are administered']}
          rows={[
            ['Self-hosted / Strimzi', 'SASL/SCRAM, SASL/PLAIN, or mTLS, entirely as configured by the operating team', 'Fully self-managed — credential rotation, storage, and distribution are the team\'s own responsibility'],
            ['Confluent Cloud', 'API keys (a Confluent-specific credential concept) or OAuth/OIDC integration', 'Managed through Confluent\'s own console and API, with role-based access control (RBAC) layered on top'],
            ['Amazon MSK', 'IAM roles and policies, or SASL/SCRAM as an alternative', 'IAM-based auth reuses the same AWS-wide identity system the rest of a team\'s AWS resources already use, per Part 03'],
            ['Redpanda / WarpStream', 'SASL mechanisms compatible with the Kafka protocol, with provider-specific management consoles for administration', 'Each has its own administration surface — check the specific product\'s current documentation for RBAC maturity relative to the two established players'],
          ]}
        />
        <SubTitle>Multi-tenancy — many teams, one cluster</SubTitle>
        <Para>
          A shared cluster serving many internal teams needs a clear multi-tenancy model: which team can
          create topics, who can read or write to a given topic, and how one team's misbehaving producer or
          consumer (a runaway retry loop, an unbounded topic) is prevented from degrading service for every
          other team on the same cluster. Quotas — per-client-ID or per-user limits on produce/consume
          throughput — are the standard mechanism for the second concern, available in some form across
          every provider covered here, though the specific configuration surface (a Kafka-native quota
          config on self-hosted clusters, versus a managed provider's own throughput-tier and quota
          controls) differs by provider.
        </Para>
        <CodeBox label="a client-quota concept, expressed the Kafka-native way — the underlying mechanism most providers build on">
{`# Limiting one client's produce and consume throughput,
# to prevent it from starving other tenants on a shared cluster:

kafka-configs --bootstrap-server broker:9092 --alter \\
  --add-config 'producer_byte_rate=5242880,consumer_byte_rate=10485760' \\
  --entity-type clients --entity-name reporting-service-readonly

# reporting-service-readonly is now capped at 5MB/s produce and
# 10MB/s consume, regardless of how much the underlying broker
# hardware could otherwise deliver to it -- protecting every other
# tenant's share of the cluster's real capacity.`}
        </CodeBox>
        <Callout title="RBAC maturity is a real differentiator worth evaluating directly, not assuming" color="#ff4757">
          For a platform serving many internal teams, how granular and how easy to administer a provider's
          role-based access control actually is — can access be scoped to specific topics or topic prefixes,
          can it be managed through infrastructure-as-code rather than a manual console, does it integrate
          with an existing identity provider — is a real, practical differentiator between providers that a
          basic feature-comparison table often glosses over. This is worth testing directly as part of the
          Part 09 evaluation checklist, using the team's actual planned tenancy model, rather than assumed
          from a marketing page.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 13 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Observability Across Providers" />
        <SectionTitle>What You Can See Differs by Provider — and That Difference Shapes On-Call</SectionTitle>
        <Para>
          Part 01 framed self-hosting's operational cost partly in terms of who responds to a 3 AM broker
          failure. The other half of that picture is what an on-call engineer can actually see when
          something goes wrong, and that visibility differs meaningfully depending on how much infrastructure
          sits behind the vendor's abstraction layer.
        </Para>
        <Table
          headers={['', 'Self-hosted / Strimzi', 'MSK', 'Confluent Cloud']}
          rows={[
            ['Broker-level JVM/OS metrics (GC pauses, disk I/O, page cache hit rate)', 'Full access — the same metrics covered throughout this track', 'Exposed via CloudWatch, reasonably detailed', 'More abstracted — Confluent surfaces cluster-level and topic-level metrics, less raw broker-internal detail'],
            ['Direct host access for deep debugging (attaching a profiler, reading raw log segment files)', 'Full access', 'Not available — MSK brokers are not directly accessible', 'Not available'],
            ['Consumer lag, throughput, and topic-level metrics', 'Self-instrumented, or via standard exporters', 'Native CloudWatch metrics, integrates with existing AWS observability', 'Native Confluent Cloud metrics API and console, integrates with Confluent\'s own tooling'],
            ['Underlying infrastructure incident visibility (a host failing, a network partition between brokers)', 'Directly visible — it is your infrastructure', 'Visible only as symptoms (elevated latency, ISR shrink) — root cause on AWS\'s side is opaque unless AWS\'s own status page or support says otherwise', 'Same opacity — the underlying cause of a managed-side incident is only as visible as the vendor\'s own status communication'],
          ]}
        />
        <Para>
          This is not an argument against managed platforms — for most teams, trading away the deepest tier
          of host-level visibility is a reasonable trade for not needing to build the expertise to interpret
          it in the first place. But it is worth setting on-call expectations accurately: an engineer
          debugging an incident on a fully managed cluster will, at some point, hit a wall where the next
          diagnostic step is "open a support ticket," rather than "SSH into the broker" — and that hand-off
          point should be a known, rehearsed part of the team's incident response process, not a surprise
          discovered mid-incident.
        </Para>
        <Callout title="Build the vendor support escalation path into the actual incident runbook" color="#38bdf8">
          A team's incident runbook for a managed Kafka platform should explicitly name the point at which
          on-call escalates to the vendor's support channel, what information to gather before doing so (the
          relevant cluster ID, topic names, and time window), and what the expected response time is at the
          team's specific support tier — the same way a runbook for self-hosted infrastructure would name
          the specific broker or disk metrics to check first, per Part 11's team-topology framing.
        </Callout>
      </section>

      <Divider />

      {/* ── Misconceptions ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Managed Kafka and Cloud Choices</SectionTitle>
        {[
          {
            wrong: '"Managed Kafka is always more expensive than self-hosting, since you\'re paying a vendor markup"',
            right: 'Part 06 is explicit that the honest comparison has to include the ongoing engineering-time cost of self-hosting well, not just the infrastructure bill. At low-to-moderate throughput, most teams find managed pricing cheaper in total cost once engineering time is priced in — the crossover to self-hosted being cheaper only tends to happen at sustained high throughput with an existing platform team.',
          },
          {
            wrong: '"Redpanda and WarpStream being \'Kafka-API-compatible\' means they have full feature parity with Apache Kafka"',
            right: 'Part 04 is direct about this: protocol compatibility means basic produce/consume workflows generally work unmodified, not that every advanced feature, client library edge case, or connector integration matches. The specific features a workload depends on need to be verified, not assumed.',
          },
          {
            wrong: '"Amazon MSK manages the same full ecosystem — Schema Registry, Connect, ksqlDB — the same way Confluent Cloud does"',
            right: 'Part 03 draws this distinction directly: MSK\'s managed surface is narrower, covering brokers with deep AWS IAM/VPC integration, while Schema Registry (via a separate Glue Schema Registry product) and Connect (via the separate MSK Connect product) are not unified into one unified managed experience the way Confluent Cloud bundles them.',
          },
          {
            wrong: '"Migrating between Kafka providers means rewriting the application\'s producer and consumer code"',
            right: 'Part 07 shows the opposite is the normal case: because every option speaks the same Kafka wire protocol, application-level send() and poll() calls are typically unchanged across a migration. What actually changes is configuration (bootstrap servers, auth) and the operational tooling built around the old platform\'s specific surface.',
          },
          {
            wrong: '"Running Kafka on Kubernetes with an operator like Strimzi eliminates the operational burden the same way a fully managed service does"',
            right: 'Part 05 is explicit that Strimzi shifts Kafka-specific operational burden into Kubernetes operational burden — a team still has to run Kubernetes itself well, including node capacity, persistent volumes, and its own upgrade cadence. It is a meaningful reduction in hand-rolled Kafka-specific ops work, not a removal of all ops work.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red,#ff4757)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Real-World Story ─────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// What This Looks Like at Work" />
        <SectionTitle>What This Looks Like on Day One</SectionTitle>
        <HighlightBox>
          <Para>
            <strong>At Vercel (a platform company whose entire product is built on making infrastructure
            decisions disappear for its customers):</strong> internally, the platform engineering team
            faces the same build-vs-buy question this module covers, but pointed at their own event
            pipelines. A small platform team supporting rapid product iteration does not want its senior
            engineers spending a quarter building Kafka operational tooling when a managed offering gets
            them the same reliability with a fraction of the internal build cost — the same Part 01 and
            Part 06 trade-off this module walks through, evaluated by a company whose entire business model
            is making exactly this kind of infrastructure trade-off invisible to its own customers.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At HashiCorp (whose own products — Vault, Consul, Terraform — are frequently the tools
            teams use to manage the infrastructure decisions this module covers):</strong> an internal
            platform team standardizing on Kubernetes across the company evaluates Strimzi specifically
            because their organization already runs Kubernetes everywhere for other services, and adding a
            second, unrelated ops model (a hand-rolled VM-based Kafka cluster, or a new vendor relationship)
            would work against the operational consistency the company generally optimizes for internally —
            exactly Part 05's framing that Strimzi is the stronger choice specifically for a team with
            existing Kubernetes muscle.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Fivetran (a company built on moving data reliably between systems, including into
            and out of Kafka-compatible platforms for its customers):</strong> a solutions engineer working
            with a mid-market customer walks them through the decision framework from Part 08 directly — the
            customer is deeply committed to AWS, has moderate but growing throughput, and has no dedicated
            Kafka expertise on staff. The recommendation that falls out of the framework is MSK Serverless
            to start, specifically because of the AWS IAM/VPC fit and the customer's small team, with an
            explicit note that the decision is revisitable later without an application rewrite, per Part 07,
            if throughput growth eventually makes provisioned MSK or a different platform more cost-effective.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Interview Prep ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. Walk me through how you would decide between Confluent Cloud, Amazon MSK, and self-hosting Kafka for a new project.',
            a: `I'd work through the decision framework in roughly four factors, from Part 08. First, team size and existing platform expertise — a small team with no dedicated infrastructure function should weight heavily toward a fully managed option, since the ongoing engineering-time cost of self-hosting well, covered in Part 01, is disproportionately expensive for a small team relative to vendor markup.

Second, existing cloud provider commitment. A team already deeply invested in AWS gets real, compounding value from MSK's native IAM and VPC integration — no separate credential system to manage, security groups and private connectivity working the same way they do for every other AWS resource. A team wanting to stay cloud-agnostic, or one that wants the broadest managed ecosystem parity — Schema Registry, Connect, ksqlDB all managed, not just brokers — is generally better served by Confluent Cloud.

Third, compliance and data residency — I'd verify a specific provider's available regions and certifications cover the requirement early, since this can rule out an option outright regardless of the other factors.

Fourth, throughput and its predictability, weighted last because most teams evaluating this aren't yet at the scale where it dominates — but at sustained very high, predictable throughput with an existing platform team, the cost crossover from Part 06 can favor self-hosting or a Kubernetes-based approach like Strimzi.

I'd also flag that this isn't a permanent decision — because everything speaks the same Kafka wire protocol, migrating later is mostly configuration and tooling rework, not an application rewrite.`,
          },
          {
            q: 'Q2. Why would a team choose Amazon MSK over Confluent Cloud, given that Confluent Cloud has broader ecosystem feature parity?',
            a: `The main reason is depth of integration with the rest of AWS, not raw feature breadth. MSK supports IAM-based authentication directly, so broker access uses the exact same access-control model — IAM roles and policies — that the rest of the team already uses for S3, Lambda, and every other AWS service, rather than managing a separate SASL credential store. MSK clusters also run inside your VPC by default, so network-level access control and private connectivity to other AWS services work the same way they do for any other AWS-native resource.

For a team that's already deeply AWS-native, that consistency has real, compounding value — one less identity and access model to reason about, one less networking model to learn. Confluent Cloud is broader in what it manages — a unified Schema Registry, Connect, and ksqlDB as fully managed services — but that breadth comes with its own pricing and its own separate control plane to learn, which is a real trade-off against MSK's tighter AWS-native fit, not a strictly better option in every dimension.

I'd also mention MSK Serverless as a specific reason to lean MSK for a team with spiky or hard-to-predict throughput — it removes capacity planning almost entirely, billing on actual usage rather than provisioned broker capacity.`,
          },
          {
            q: 'Q3. What does it actually mean for Redpanda or WarpStream to be "Kafka-API-compatible," and what should you verify before betting a production workload on one of them?',
            a: `It means these systems implement the Kafka wire protocol — the same network protocol Kafka client libraries already speak — on top of a fundamentally different internal architecture, rather than running Apache Kafka's actual broker code. Redpanda is a C++ reimplementation with no JVM, aimed at avoiding garbage-collection-related issues like the session-timeout and rebalance problems covered in the producers-consumers-brokers module, and bundles its own Raft-based coordination into each broker rather than needing a separate controller quorum. WarpStream goes further architecturally — its brokers are stateless and write directly to object storage as the sole durable store, removing the broker-to-broker replication model — leaders, followers, ISRs — that Kafka, MSK, and Redpanda all still use.

Because both speak the actual Kafka wire protocol, existing producer and consumer client code generally works against them with just a configuration change. But protocol compatibility is not the same claim as full feature parity — specific advanced features, specific client library edge-case behaviors, and the breadth of Kafka Connect connector support can differ from Apache Kafka or Confluent Cloud's more mature ecosystem.

Before committing a production workload, I'd specifically test the exact features that workload depends on — transactions, particular SMTs or connectors, specific consumer group rebalancing behavior — rather than assuming "Kafka-compatible" means every corner of the ecosystem is a drop-in match.`,
          },
          {
            q: 'Q4. Your CFO asks why the team\'s Kafka bill has grown so much faster than expected after moving from self-hosted to a managed, usage-based platform. How do you explain the cost dynamics at play?',
            a: `I'd start by separating the two cost models explicitly, as covered in Part 06. Self-hosted cost is roughly infrastructure plus the fully-loaded cost of the engineering time spent on capacity planning, patching, and on-call — a cost that scales with team size more than with raw throughput, since a platform team sized to operate a larger cluster well isn't proportionally bigger than one operating a smaller cluster. Managed, usage-based cost scales more directly with actual throughput and storage, with the vendor's own operational cost baked into that per-unit price.

If throughput has grown significantly since the migration, the usage-based bill grows roughly in proportion — and at high enough sustained throughput, that per-unit markup, charged against every byte, can end up costing more in aggregate than the infrastructure-plus-headcount cost of self-hosting or running a Kubernetes-based setup like Strimzi would have, at that same scale.

The actionable next step I'd propose is running the actual numbers for current throughput and its trend: what would provisioned MSK, Strimzi on our existing Kubernetes platform, or a hybrid look like at this specific scale, given that migrating later — per Part 07 — is a configuration and tooling project, not an application rewrite, so revisiting this decision now that we understand actual usage patterns is a reasonable, low-risk move rather than a sunk-cost commitment to the current platform.`,
          },
          {
            q: 'Q5. What operational responsibilities does a team still own when running Kafka via Strimzi on Kubernetes, versus using a fully managed service like Confluent Cloud or MSK?',
            a: `Strimzi automates the Kafka-specific operational mechanics — a team declares a target broker version and cluster configuration as a Kubernetes custom resource, and the operator handles the sequencing of a safe rolling upgrade, reconciling the running cluster to match the declared state, rather than a human running a manual or scripted runbook for that upgrade.

But Strimzi doesn't remove Kubernetes itself as an operational dependency — the team still owns node capacity planning, persistent volume management for broker storage, and the Kubernetes cluster's own upgrade cadence, all of which are real operational surfaces in their own right. It shifts Kafka-specific expertise into Kubernetes expertise, rather than eliminating operational ownership altogether.

Compare that to a fully managed service, where the vendor owns broker patching, the underlying compute, and — for Confluent Cloud specifically — the surrounding ecosystem components like Schema Registry and Connect as well. So the honest framing for Strimzi is: a meaningful reduction in hand-rolled, Kafka-specific ops burden, for a team that already has Kubernetes operational maturity to build on — not a reduction to zero, and not a good trade for a team with no existing Kubernetes investment, where standing up Kubernetes specifically to run Strimzi adds an entirely new operational surface rather than simplifying an existing one.`,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Common Mistakes ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Mistakes Beginners Make Constantly</SectionTitle>
        {[
          {
            q: 'Comparing managed vs self-hosted Kafka purely on the cloud infrastructure bill, ignoring engineering time',
            a: 'Part 06 is explicit that this is a category error — the honest self-hosted cost includes ongoing capacity planning, patching, and on-call time at that team\'s fully-loaded engineering cost, which is very often the larger part of the real comparison, not the smaller part.',
          },
          {
            q: 'Assuming Amazon MSK gives you a managed Schema Registry and managed Kafka Connect the same way Confluent Cloud does',
            a: 'Part 03 is direct that MSK\'s managed surface is narrower — Schema Registry and Connect exist as separate AWS products (Glue Schema Registry, MSK Connect) rather than a single unified managed experience. Assuming MSK equals Confluent Cloud\'s ecosystem breadth leads to under-planning for those pieces.',
          },
          {
            q: 'Betting a production workload on Redpanda or WarpStream based only on "Kafka-API-compatible" marketing, without testing the specific features the workload needs',
            a: 'Part 04 and Interview Prep Q3 both warn against this directly: protocol compatibility covers basic produce/consume, not necessarily every advanced feature, client library edge case, or connector integration. Verify the specific dependencies before committing.',
          },
          {
            q: 'Adopting Kubernetes specifically to run Strimzi, without an existing Kubernetes operational investment',
            a: 'Part 05 frames Strimzi as a strong choice for a team that already runs Kubernetes well — for a team starting from zero, standing up Kubernetes just to get Strimzi\'s benefits adds a whole new operational surface rather than reducing one, which can end up costing more in total ops burden than either self-hosting Kafka directly or choosing a fully managed service.',
          },
          {
            q: 'Treating a managed-Kafka provider choice as permanent and irreversible, avoiding a reasonable starting choice out of fear of lock-in',
            a: 'Part 07 and Part 08\'s closing point both push back on this: because every option speaks the same Kafka wire protocol, a migration between them is mostly configuration and operational tooling rework, not an application rewrite. It is reasonable to choose conservatively for today\'s team and revisit later as scale or requirements change.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors and Surprises You Will Hit — And Exactly Why They Happen</SectionTitle>
        {[
          {
            error: `A producer that worked fine against a self-hosted cluster gets consistent authentication failures immediately after a migration to Amazon MSK`,
            cause: 'The producer config was migrated with the old SASL/SCRAM username and password left in place, but MSK is configured for IAM-based authentication (AWS_MSK_IAM as the SASL mechanism) — there is no SCRAM credential store on this cluster at all, so any client still presenting a static username/password is rejected outright.',
            fix: 'Update the client configuration to use the AWS_MSK_IAM SASL mechanism, which authenticates using the AWS SDK\'s normal credential chain (an instance role, a task role, or an assumed role) rather than a static credential, and grant that role the specific kafka-cluster:* IAM actions needed on the specific topic resources, per Part 03.',
          },
          {
            error: `A team's finance review flags that their MSK Serverless bill has grown much faster than their provisioned-capacity estimate suggested it would`,
            cause: 'MSK Serverless bills on actual throughput and storage rather than provisioned broker capacity, which is precisely the point of it — but a team that mentally budgeted for it the way they would budget for a fixed-size provisioned cluster is comparing against the wrong cost model, and a genuine throughput increase (more producers, higher event volume, larger retention) shows up dollar-for-dollar in the bill rather than being absorbed by already-provisioned, already-paid-for capacity.',
            fix: 'Track actual GB produced/consumed and storage against the usage-based pricing model directly, rather than against a provisioned-cluster mental model. If throughput has grown enough that sustained, predictable usage now dominates, re-run the Part 06 cost comparison — provisioned MSK or a self-hosted/Strimzi setup may now be more cost-effective at this new, higher, more predictable throughput level.',
          },
          {
            error: `A newly evaluated Redpanda cluster fails to run a specific Kafka Connect connector the team depends on, despite passing all basic produce/consume smoke tests`,
            cause: 'Basic produce/consume workflows generally work against a Kafka-API-compatible system because they exercise only the core wire protocol. A specific connector plugin, especially one with vendor-specific assumptions or dependencies on a feature not yet implemented by the compatible system, is a narrower and less-tested compatibility surface than the basic protocol itself, exactly the gap Part 04 warns about.',
            fix: 'Before committing to a Kafka-API-compatible alternative, explicitly test every specific connector, client library feature, and operational tool the production workload actually depends on — not just basic produce/consume — and check the specific alternative\'s own documentation and compatibility notes for known gaps against that workload\'s dependency list.',
          },
          {
            error: `A compliance review blocks a planned move to a managed Kafka provider late in the evaluation process, after most of the technical evaluation work is already done`,
            cause: 'Data-residency or certification requirements (SOC 2, HIPAA, PCI-DSS, FedRAMP, or equivalents) were not checked against the specific provider and specific region early in the evaluation — these requirements vary by provider and by region, and can rule out an otherwise well-suited technical choice outright.',
            fix: 'Verify compliance certifications and available regions for every managed provider under consideration as the very first evaluation step, per Part 08\'s Factor 3, before investing further evaluation time in options that may already be disqualified on this basis alone.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red,#ff4757)', marginBottom: 12, background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '8px 12px', lineHeight: 1.5 }}>
              {item.error}
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      <KeyTakeaways items={[
        'Self-hosting Kafka is a real, ongoing engineering-time cost — capacity planning, version upgrades, on-call, and security administration — not just a server bill. Weigh that time at its fully-loaded cost when comparing against managed pricing.',
        'Confluent Cloud offers the broadest ecosystem feature parity — managed Schema Registry, Connect, and ksqlDB alongside brokers — generally at a higher price point than a brokers-only managed offering.',
        'Amazon MSK manages brokers with deep native AWS IAM and VPC integration, but leaves Schema Registry and Connect as separate AWS products rather than a unified managed experience; MSK Serverless removes capacity planning entirely at usage-based pricing.',
        'Redpanda (C++, no JVM) and WarpStream (stateless brokers on object storage) are Kafka-wire-protocol-compatible, so basic client code generally works unmodified — but protocol compatibility is not the same claim as full ecosystem feature parity, and specific dependencies need explicit testing.',
        'Strimzi on Kubernetes automates Kafka-specific operational mechanics (rolling upgrades, reconciliation) through a declarative operator model, but shifts the operational burden into Kubernetes expertise rather than eliminating it — a strong fit specifically for teams with existing Kubernetes maturity.',
        'The self-hosted vs. managed cost crossover depends on scale: managed pricing usually wins at low-to-moderate throughput once engineering time is priced in; self-hosted or Kubernetes-based deployment can win at sustained very high throughput with an existing platform team.',
        'Migrating between Kafka platforms is mostly a configuration and operational-tooling project, not an application rewrite, because every option in this module speaks the same Kafka wire protocol — client send() and poll() calls are typically unchanged.',
        'Choose a deployment model using team size and existing platform expertise first, then cloud-provider fit, then compliance/data-residency requirements, then throughput and its predictability — and treat the decision as revisitable, not permanent.',
      ]} />
    </LearnLayout>
  )
}
