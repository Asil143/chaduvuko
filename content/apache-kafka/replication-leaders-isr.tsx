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

export default function ReplicationLeadersISR() {
  return (
    <LearnLayout
      title="Replication, Leaders, and ISR"
      description="Why Kafka replicates partitions, how leader/follower replication and the in-sync replica set actually work, what happens when a leader fails, and how acks, min.insync.replicas, and unclean leader election combine to define your real durability guarantee."
      section="Apache Kafka — Module 06"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Replication, Leaders, and ISR', href: '/learn/apache-kafka/replication-leaders-isr' },
      ]}
      prev={{ title: 'Consumer Groups and Offsets', href: '/learn/apache-kafka/consumer-groups-offsets' }}
      next={{ title: 'Keys, Ordering, and Partitioning Strategy', href: '/learn/apache-kafka/keys-ordering-partitioning' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why replication exists" />
        <SectionTitle>A Partition on One Disk Is One Failure Away From Gone</SectionTitle>
        <Para>
          Every partition of every Kafka topic ultimately lives on the local disks of some set of broker
          machines. Disks fail. Machines get decommissioned, lose power, or run out of memory and get killed
          by the OS. Whole availability zones occasionally go dark. If a partition existed as a single copy on
          a single broker, any one of those ordinary, expected failures would permanently destroy every record
          in it — not delay access to the data, destroy it, with no way to recover.
        </Para>
        <Para>
          Replication is Kafka's answer: instead of one copy of a partition's log, Kafka maintains multiple
          copies, spread across different broker machines (and, if you configure rack awareness, across
          different racks or availability zones), so that the loss of any single broker still leaves the data
          intact on the others. This is not an advanced feature you opt into for special topics — it is the
          basic durability model every production Kafka deployment relies on, and it is worth understanding
          precisely, because the exact guarantees it provides depend on several settings working together
          correctly, not on any one of them alone.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Beginner model:</strong> replication factor 3 means my data is copied three times, so
            it's safe.
          </Para>
          <Para>
            <strong>Production model:</strong> replication factor determines how many broker-local copies of
            a partition <em>can</em> exist. Whether a specific acknowledged write actually survives a broker
            failure depends on the interaction of <code>acks</code>, <code>min.insync.replicas</code>, the
            in-sync replica set at the moment of the write, and whether unclean leader election is disabled —
            all covered in this module, in that order.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Replication factor" />
        <SectionTitle>Replication Factor Is a Count of Copies, Placed on Different Brokers</SectionTitle>
        <Para>
          The <code>replication.factor</code> of a topic (settable per topic, with a cluster-wide default)
          is the number of copies Kafka maintains of every partition in that topic — one <strong>leader
          replica</strong> and <code>replication.factor − 1</code> <strong>follower replicas</strong>, always
          placed on different broker machines from each other. A replication factor of 3 on a topic with 4
          partitions does not mean 3 brokers total; it means each of the 4 partitions individually has 3
          copies, and Kafka spreads those copies (and which broker leads which partition) across the cluster
          so that no single broker is overloaded and no single broker's failure takes out every partition's
          only copy.
        </Para>
        <CodeBox label="replication factor 3, 4 partitions, 5 brokers — leadership and replicas spread out">
{`orders topic, replication.factor=3, 4 partitions, cluster of 5 brokers

partition 0: leader=broker-1  replicas=[broker-1, broker-2, broker-3]
partition 1: leader=broker-2  replicas=[broker-2, broker-3, broker-4]
partition 2: leader=broker-3  replicas=[broker-3, broker-4, broker-5]
partition 3: leader=broker-4  replicas=[broker-4, broker-5, broker-1]

notice: leadership is spread across brokers 1-4, not concentrated on one broker
notice: every partition has exactly 3 total copies, on 3 DIFFERENT brokers
notice: broker-5 holds replicas but currently leads nothing — still doing useful work`}
        </CodeBox>
        <Para>
          A replication factor of 1 means no replication at all — a single copy, the scenario Part 01 warns
          against. A replication factor of 2 tolerates exactly one broker failure at a time, but leaves zero
          margin if a second broker fails before the first is replaced and re-replicated. Replication factor
          3 is the conventional production default for a reason: it tolerates one broker failure while still
          maintaining a full 2 remaining copies, giving you a safety margin during the (sometimes lengthy)
          window it takes to replace a failed broker and let it fully re-replicate.
        </Para>
        <Callout title="Replication factor is not free" color="#f59e0b">
          Every additional replica is additional disk usage, additional network bandwidth for the leader to
          push data to followers, and additional write amplification. Replication factor 5 is not simply
          "more durable than 3" in a way that's free to adopt everywhere — it roughly doubles storage and
          replication network cost over factor 3 for a durability improvement that, past 3, mostly protects
          against correlated multi-broker failures, which are rare relative to single-broker failures.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Leader and follower roles" />
        <SectionTitle>Only the Leader Serves Clients — Followers Exist Purely to Replicate</SectionTitle>
        <Para>
          For a given partition, exactly one of its replicas is the leader at any moment, and every producer
          write and every consumer read for that partition goes through that leader broker exclusively.
          Followers do not serve client reads or writes at all under normal operation — their entire job is
          to continuously fetch new records from the leader's log and append them to their own local copy,
          keeping pace with the leader as closely as possible.
        </Para>
        <Para>
          This is a deliberate simplification compared to systems that allow reads from any replica. Kafka's
          leader-only model avoids an entire class of consistency problems that arise when a client can read
          from a replica that happens to be slightly behind — there is never a question of "which replica did
          I read from and how stale was it," because there is only one replica clients ever talk to for that
          partition. The tradeoff is that a follower's CPU and network capacity for serving reads sits
          unused by client traffic; that capacity exists purely as replication insurance and (in clusters
          with follower-fetching enabled for reduced cross-zone traffic) for other followers to read from
          instead of always adding load to the leader.
        </Para>
        <CodeBox label="the leader-only request path">
{`producer wants to write to orders partition 2
  -> looks up metadata: partition 2 leader = broker-3
  -> sends write directly to broker-3
  -> broker-3 (leader) appends to its local log
  -> broker-3's followers (say broker-4, broker-5) fetch the new record
     and append it to their own local copies, independently, on their own schedule

consumer wants to read orders partition 2
  -> looks up metadata: partition 2 leader = broker-3
  -> sends fetch request directly to broker-3
  -> broker-4 and broker-5, even though they have the same data, are never contacted
     for this read under normal client fetches`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — In-sync replicas (ISR)" />
        <SectionTitle>The ISR Is the Live List of Replicas Actually Caught Up</SectionTitle>
        <Para>
          Not every replica listed for a partition is necessarily caught up at every moment. A follower can
          fall behind — a slow disk, network congestion, a garbage collection pause, or simply being
          overloaded relative to the leader's write rate. The <strong>in-sync replica set (ISR)</strong> is
          the leader's live-tracked list of which replicas — including itself — are currently keeping up
          closely enough to be considered "in sync," and it is this list, not the static replication factor,
          that determines what a durable acknowledgement actually means at any given moment.
        </Para>
        <Para>
          A follower is removed from the ISR when it falls behind the leader's log by more than
          <code> replica.lag.time.max.ms</code> (default 30 seconds in modern Kafka) — specifically, when the
          follower has not fetched up to the leader's log-end-offset within that time window. It is added
          back to the ISR once it catches up. This is a continuously recalculated set, not a one-time
          configuration; a healthy cluster's ISR for a partition is normally all of its replicas, and it
          shrinks only when something is actually going wrong with a specific follower.
        </Para>
        <CodeBox label="a follower falling out of, then back into, the ISR">
{`orders partition 0, replication.factor=3
  replicas: [broker-1 (leader), broker-2, broker-3]
  ISR (t=0): [broker-1, broker-2, broker-3]   <- all caught up

broker-3 hits a long GC pause and stops fetching for 45 seconds
  (replica.lag.time.max.ms = 30000)

  ISR (t=45s): [broker-1, broker-2]           <- broker-3 dropped from ISR
  broker-3 is still a replica, still holds most of the data,
  but is no longer counted for acks=all durability until it catches up

broker-3 recovers, fetches rapidly, catches up to the leader's log-end-offset

  ISR (t=60s): [broker-1, broker-2, broker-3] <- broker-3 rejoins the ISR`}
        </CodeBox>
        <Callout title="ISR shrinkage is a real signal, not noise" color="#38bdf8">
          A partition whose ISR is regularly shrinking and growing is telling you a specific follower broker
          is under-provisioned, overloaded, or experiencing network issues relative to the write rate it's
          expected to keep up with. Monitoring <code>UnderReplicatedPartitions</code> (partitions whose ISR
          is smaller than their replication factor) is one of the highest-signal alerts you can run on a
          Kafka cluster — it is an early warning that durability margin is currently reduced for the affected
          partitions, well before any leader actually fails.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Leader election on failure" />
        <SectionTitle>When a Leader Broker Dies, a New One Is Elected From the ISR</SectionTitle>
        <Para>
          When the broker currently leading a partition fails — crashes, is network-partitioned, or is taken
          down for maintenance — that partition needs a new leader immediately, or it becomes unavailable for
          both reads and writes. The cluster's controller (covered in Part 07) detects the failure and elects
          a new leader for every partition the failed broker was leading. Under normal, clean leader
          election, the new leader is chosen from the partition's <strong>current ISR</strong> — a replica
          that was, by definition, fully caught up with the old leader's log at the moment of failure.
        </Para>
        <Para>
          This is the entire point of maintaining an ISR rather than just a replica list: electing a new
          leader from a replica that was actually in sync guarantees the new leader's log contains every
          record that was ever fully acknowledged under <code>acks=all</code>. Nothing acknowledged is lost,
          because the replica taking over already had it.
        </Para>
        <CodeBox label="clean leader election — the new leader was already caught up">
{`orders partition 0: leader=broker-1, ISR=[broker-1, broker-2, broker-3]
broker-1 crashes

controller elects a new leader from the current ISR: broker-2 (or broker-3)
  -> broker-2 becomes the new leader
  -> broker-2's log already contained every record that had been
     acknowledged to producers under acks=all, because it was in the ISR
  -> no acknowledged data is lost
  -> broker-3 continues following the new leader, broker-2
  -> once broker-1 recovers, it rejoins as a follower and catches back up`}
        </CodeBox>
        <SubTitle>Unclean leader election — the dangerous escape hatch</SubTitle>
        <Para>
          What if every in-sync replica is also unavailable at the moment of failure — say, both
          <code>broker-1</code> (the leader) and <code>broker-2</code> are down, and only <code>broker-3</code>
          is alive, but <code>broker-3</code> had already fallen out of the ISR before the failure because it
          was lagging? The setting <code>unclean.leader.election.enable</code> decides what happens next. If
          it is <code>true</code>, Kafka is allowed to elect that out-of-sync replica as the new leader anyway,
          in the name of availability — the partition comes back online, but its new leader's log is missing
          whatever records the lagging replica hadn't caught up to yet, including some that may have already
          been acknowledged to producers. Those records are not merely delayed. They are gone, silently,
          from the client's point of view.
        </Para>
        <CodeBox label="unclean leader election — acknowledged data silently vanishes">
{`orders partition 0: leader=broker-1, replicas=[broker-1, broker-2, broker-3]
broker-3 had already fallen out of the ISR (lagging 200 records behind)
ISR at time of failure: [broker-1, broker-2]

broker-1 AND broker-2 both go down simultaneously (a correlated failure —
rack outage, bad deploy, etc). Only broker-3 (out of sync) is left alive.

unclean.leader.election.enable=true:
  -> broker-3 is elected leader anyway, missing its last 200 records
  -> those 200 records, some of which may have been acked to producers
     under acks=all when broker-1 was still leader, are gone
  -> the topic is available again, but has silently lost data

unclean.leader.election.enable=false (the safer default in modern Kafka):
  -> the partition simply stays unavailable — no leader is elected
  -> no data is lost, but the partition cannot serve reads or writes
     until broker-1 or broker-2 comes back and can resume as leader`}
        </CodeBox>
        <Callout title="This is a deliberate availability-vs-durability choice, not a default to accept blindly" color="#ef4444">
          <code>unclean.leader.election.enable=false</code> is the right default for almost any data where
          silent loss is worse than temporary unavailability — payments, orders, anything with financial or
          legal consequence. Setting it to <code>true</code> trades correctness for uptime, and should be a
          conscious choice made per-topic for genuinely loss-tolerant data (some metrics or log pipelines),
          never a cluster-wide default left unexamined.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — acks, min.insync.replicas, and real durability" />
        <SectionTitle>acks and min.insync.replicas Together Define What "Acknowledged" Actually Means</SectionTitle>
        <Para>
          This is the single most commonly mis-taught relationship in Kafka, so it is worth being exact. Three
          separate settings interact to define your real durability guarantee, and no one of them alone tells
          you the whole story: the producer's <code>acks</code>, the topic's <code>min.insync.replicas</code>,
          and the current size of the ISR at the moment of the write.
        </Para>
        <SubTitle>acks — how many replicas the producer waits for</SubTitle>
        <Table
          headers={['acks value', 'What the producer waits for', 'Durability implication']}
          rows={[
            ['acks=0', 'Nothing — the write is considered sent the instant it leaves the client', 'A broker failure, or even just a dropped network packet, can lose the record with the producer never knowing'],
            ['acks=1', 'Only the partition leader\'s local append', 'If the leader crashes before any follower replicates the record, it is lost — even though the producer received a success acknowledgement'],
            ['acks=all (or -1)', 'Every replica currently in the ISR to confirm the write', 'The record survives the failure of any broker that was in the ISR at write time — but only if the ISR was large enough, which is where min.insync.replicas comes in'],
          ]}
        />
        <SubTitle>min.insync.replicas — the floor that makes acks=all actually mean something</SubTitle>
        <Para>
          Here is the detail that trips people up: <code>acks=all</code> by itself means "wait for every
          replica <em>currently in the ISR</em>" — not "wait for <code>replication.factor</code> replicas."
          If the ISR has shrunk to just the leader (every follower has fallen behind or is down),
          <code>acks=all</code> is satisfied by the leader alone confirming the write. That write is now
          exactly as durable as <code>acks=1</code> would have been — a single point of failure — even though
          the producer configured <code>acks=all</code> in good faith believing it was safe.
        </Para>
        <Para>
          <code>min.insync.replicas</code> is the topic-level setting that closes this gap. It sets a minimum
          ISR size the leader will accept an <code>acks=all</code> write against at all — if the current ISR
          is smaller than <code>min.insync.replicas</code>, the leader rejects the write outright with a
          <code>NotEnoughReplicasException</code>, rather than accepting it and quietly providing weaker
          durability than the producer expects. This is what actually turns <code>acks=all</code> from "wait
          for whatever happens to be in sync right now" into "wait for a real, guaranteed number of replicas,
          or refuse the write."
        </Para>
        <CodeBox label="the exact mechanics — replication.factor=3, min.insync.replicas=2, acks=all">
{`healthy state: ISR = [broker-1 (leader), broker-2, broker-3]  (size 3)
  acks=all write -> leader waits for confirmation from all 3 ISR members
  write succeeds -> durable against the loss of any 1 or even 2 of these 3 brokers

one follower falls out of the ISR (still 2 members left): ISR = [broker-1, broker-2]
  acks=all write -> leader waits for confirmation from both remaining ISR members
  write succeeds because ISR size (2) still meets min.insync.replicas (2)
  durable against the loss of 1 more broker, no more margin left

a second follower falls out of the ISR: ISR = [broker-1]  (just the leader)
  acks=all write -> ISR size (1) is BELOW min.insync.replicas (2)
  the leader REJECTS the write: NotEnoughReplicasException
  the producer sees a clear failure and can retry, alert, or fail the request —
  instead of getting a false "success" backed by only one broker's disk`}
        </CodeBox>
        <HighlightBox>
          <Para>
            <strong>The rule, stated precisely:</strong> the actual durability guarantee of an
            <code> acks=all</code> write is "this record exists on however many replicas were in the ISR at
            write time, and that number is guaranteed to be at least <code>min.insync.replicas</code>, or the
            write is rejected." Replication factor sets the ceiling on how many copies can exist.
            <code> min.insync.replicas</code> sets the floor on how many must confirm. <code>acks=all</code>
            is the producer opting into waiting for that floor. Change any one of the three in isolation and
            you've changed the actual guarantee, whether or not you meant to.
          </Para>
        </HighlightBox>
        <Table
          headers={['Configuration', 'Durability', 'Availability cost', 'Typical use']}
          rows={[
            ['RF=3, min.isr=2, acks=all', 'Survives any single broker failure without loss', 'Unavailable for writes if 2 of 3 brokers are down', 'Payments, orders — financial or legally significant data'],
            ['RF=3, min.isr=1, acks=all', 'Effectively acks=1-level risk once the ISR shrinks to the leader alone', 'Stays writable even with only 1 broker up', 'Rarely the right choice for anything important — misleadingly labeled "acks=all safe"'],
            ['RF=3, min.isr=2, acks=1', 'Leader-only durability regardless of ISR size — data loss possible on leader crash before replication', 'No availability cost from min.isr, since acks=1 never checks it meaningfully', 'Higher-throughput, loss-tolerant data — clickstream, non-critical metrics'],
            ['RF=1, acks=0', 'None — single copy, no wait for any acknowledgement', 'Maximum availability of the write path, minimum durability', 'Debug logs, ephemeral data with no business consequence if lost'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — The KRaft controller's role" />
        <SectionTitle>Someone Has to Decide Leadership — That's the Controller's Job</SectionTitle>
        <Para>
          All of the leader-election behavior in Part 05 has to be decided by something — some component of
          the cluster has to detect a broker failure, know which replicas are currently in each partition's
          ISR, and actually record "this broker is now the leader of this partition" in a way every other
          broker and every client can find out about. In modern Kafka, that component is the
          <strong> KRaft controller</strong> — a small quorum of controller-eligible brokers that use the
          Raft consensus protocol among themselves to agree on cluster metadata, including partition
          leadership, without depending on an external system.
        </Para>
        <Para>
          You do not need deep Raft internals to work productively with Kafka day to day, and this module
          deliberately does not go there — the point to take away is narrower: there is always exactly one
          active controller for the cluster at a time, it is the component that notices a broker has stopped
          sending heartbeats, it is the component that consults the ISR to pick a new leader per Part 05's
          rules, and it is the component that then propagates "here is the new leader for partition X" as
          metadata every broker and every client refreshes and relies on. When a client sees a
          <code>NotLeaderOrFollower</code> error and refreshes its metadata, it is asking the cluster
          — ultimately backed by the controller's metadata — who the current leader actually is now.
        </Para>
        <CodeBox label="the controller's role in a failure, at a glance">
{`broker-1 (leader of several partitions) stops responding

active controller notices broker-1 has missed its expected heartbeats
  -> for each partition broker-1 was leading:
       consult that partition's current ISR
       elect a new leader from the ISR (or apply unclean election policy
         if configured and the ISR is empty of live replicas)
       record the new leader assignment in cluster metadata
  -> the new leadership metadata propagates to every broker

clients that try to reach broker-1 get connection failures or stale-metadata
errors, refresh their metadata from any reachable broker, learn the new
leader, and resume sending requests to the correct broker — usually within
a few seconds of the failure being detected`}
        </CodeBox>
        <Callout title="This replaced ZooKeeper" color="#38bdf8">
          Older Kafka deployments used ZooKeeper to elect a controller and store this same metadata. KRaft
          (Kafka Raft) removed that external dependency — the controller quorum is made of Kafka brokers
          themselves, using Raft directly. The responsibilities described here — detecting failures, electing
          leaders from the ISR, propagating metadata — are unchanged conceptually; what changed is which
          system implements them.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Preferred leaders and rebalancing leadership" />
        <SectionTitle>Leadership Doesn't Automatically Move Back When a Broker Recovers</SectionTitle>
        <Para>
          When a leader broker fails and a new leader is elected from the ISR per Part 05, the cluster does
          not automatically move leadership back once the original broker recovers and rejoins as a follower.
          It simply keeps following the current leader, fully caught up, indefinitely. This is intentional —
          moving leadership back automatically the instant a broker returns would itself be disruptive, and a
          broker that just recovered from a failure is not necessarily the broker you'd want serving live
          traffic again immediately.
        </Para>
        <Para>
          But left unaddressed across many partitions and many recoveries over time, this produces
          <strong> leadership skew</strong>: leadership for a disproportionate number of partitions drifts
          onto whichever brokers happened to survive the most failures, while brokers that failed and
          recovered end up leading very little, sitting mostly idle as followers despite being fully healthy.
          Since only the leader serves client traffic for a partition (Part 03), this translates directly into
          uneven load — some brokers running hot serving reads and writes for many partitions, others
          under-utilized.
        </Para>
        <Para>
          Kafka tracks each partition's <strong>preferred leader</strong> — the replica that was the leader
          when the partition was originally created or last explicitly reassigned, typically the first entry
          in the replica list. A preferred leader election, triggered manually or automatically on a schedule
          (<code>auto.leader.rebalance.enable=true</code>, checked against
          <code>leader.imbalance.check.interval.seconds</code>), moves leadership back to the preferred leader
          whenever it is healthy and in the ISR, restoring the cluster's intended even distribution.
        </Para>
        <CodeBox label="leadership skew, and preferred leader election correcting it">
{`initial state, evenly distributed:
  partition 0: preferred=broker-1  current leader=broker-1
  partition 1: preferred=broker-2  current leader=broker-2
  partition 2: preferred=broker-3  current leader=broker-3

broker-1 fails; partition 0's leader fails over to broker-2 (from its ISR)
broker-1 recovers, rejoins as a healthy in-sync follower of partition 0
  -> but broker-2 is still leading BOTH partition 0 and partition 1 now
  -> broker-2 is doing 2x the leader work it was designed for
  -> broker-1, fully healthy, leads nothing

preferred leader election runs (manually via kafka-leader-election.sh,
or automatically if auto.leader.rebalance.enable=true):
  -> partition 0's preferred leader (broker-1) is in the ISR and healthy
  -> leadership is moved back to broker-1
  -> distribution is restored to the original, balanced state`}
        </CodeBox>
        <Callout title="Why this matters beyond neatness" color="#f59e0b">
          Leadership skew is not cosmetic — it means a subset of brokers absorb a disproportionate share of
          every partition's client read and write traffic, replication fan-out to followers, and
          controller-facing metadata churn. A cluster that has been running for months through several
          rolling restarts without preferred leader election enabled can end up with a small number of brokers
          quietly carrying most of the cluster's real work while the rest coast — worth checking directly with
          <code> kafka-leader-election.sh</code> or an equivalent dashboard rather than assuming it self-heals.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Rack awareness and reassignment" />
        <SectionTitle>Replica Placement Should Assume Correlated Failures, Not Just Independent Ones</SectionTitle>
        <Para>
          Part 02's replication-factor examples spread replicas across different brokers, which protects
          against a single broker failing independently. In a real deployment, broker failures are not always
          independent — an entire rack can lose power, an entire availability zone can have a networking
          incident, and every broker physically located there fails at once, together, regardless of how
          carefully replicas were spread across broker <em>IDs</em>.
        </Para>
        <Para>
          <code>broker.rack</code> lets each broker declare which rack or availability zone it physically
          lives in, and Kafka's replica-placement algorithm uses that information to avoid putting all of a
          partition's replicas in the same rack whenever the cluster topology allows it. Without rack
          awareness configured, Kafka only guarantees replicas land on different brokers — it has no idea two
          of those brokers happen to share a power supply or a network switch, and a correlated failure there
          can take out every replica of a partition simultaneously, defeating the entire purpose of
          replication factor 3.
        </Para>
        <CodeBox label="rack-unaware vs rack-aware placement for the same partition">
{`without broker.rack configured, replicas spread only across broker IDs:
  orders partition 0: replicas=[broker-1, broker-2, broker-3]
  broker-1 and broker-2 happen to both be physically in rack-A
  a rack-A power incident takes out 2 of the partition's 3 replicas at once
  -> ISR drops to just broker-3 -> min.insync.replicas=2 rejects writes
  -> much closer to full data loss than replication.factor=3 implied

with broker.rack configured (rack-A, rack-B, rack-C):
  orders partition 0: replicas=[broker-1 (rack-A), broker-4 (rack-B), broker-7 (rack-C)]
  a single rack-A incident takes out only 1 of the 3 replicas
  -> ISR drops to 2, still meets min.insync.replicas=2, writes continue
  -> the replication.factor=3 durability promise is actually intact`}
        </CodeBox>
        <Para>
          Replica placement is not permanently fixed at topic-creation time either. Partition reassignment
          (<code>kafka-reassign-partitions.sh</code>) lets an operator move replicas between brokers — used
          when decommissioning a broker, rebalancing disk usage across the cluster, or correcting a placement
          that turned out not to be rack-aware. A reassignment is itself a replication operation: the new
          target replica catches up by fetching the full partition history from the current leader before it
          is considered in sync, which is why large reassignments are throttled deliberately — an
          unthrottled reassignment can saturate broker network bandwidth and degrade normal replication
          traffic for every other partition sharing that network path.
        </Para>
        <Callout title="Rack awareness is a placement default, not an override" color="#38bdf8">
          Rack-aware placement is a best-effort constraint the assignment algorithm applies when creating a
          topic or reassigning partitions — it doesn't retroactively fix an already-placed topic's replicas
          on its own. Setting broker.rack after topics already exist protects future topics and future
          reassignments; existing partitions need an explicit reassignment to actually benefit from it.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Diagnosing replication state from the CLI" />
        <SectionTitle>Reading kafka-topics --describe Correctly, Column by Column</SectionTitle>
        <Para>
          Every concept in this module — replicas, leader, ISR — shows up directly in the output of
          <code> kafka-topics.sh --describe</code>, which is the first thing worth checking during any
          replication-related incident. Reading it correctly, and knowing exactly what a discrepancy between
          columns means, turns this from a wall of text into a precise diagnostic tool.
        </Para>
        <CodeBox label="kafka-topics.sh --describe --topic orders">
{`kafka-topics.sh --bootstrap-server broker:9092 --describe --topic orders

Topic: orders   PartitionCount: 4   ReplicationFactor: 3
  Partition: 0  Leader: 3   Replicas: 3,1,2   Isr: 3,1,2
  Partition: 1  Leader: 1   Replicas: 1,2,3   Isr: 1,2
  Partition: 2  Leader: 2   Replicas: 2,3,1   Isr: 2,3,1
  Partition: 3  Leader: -1  Replicas: 1,2,3   Isr: 1`}
        </CodeBox>
        <Para>
          Partition 0 is fully healthy: Replicas and Isr list the same three brokers in the same set,
          meaning every assigned replica is caught up, per Part 04. Partition 1 has a real problem worth
          investigating: Replicas lists three brokers (1, 2, 3) but Isr lists only two (1, 2) — broker 3 has
          fallen behind and dropped out of the in-sync set, exactly the condition
          <code> UnderReplicatedPartitions</code> is built to catch. Partition 3 is the most serious of the
          three: <code>Leader: -1</code> means there is currently no leader at all — the partition is fully
          unavailable for both reads and writes, the scenario from Part 05 where every in-sync replica became
          unreachable and, with <code>unclean.leader.election.enable=false</code>, the controller correctly
          refused to promote the one out-of-sync replica still listed in Isr.
        </Para>
        <Table
          headers={['Pattern you see', 'What it means', 'Where it\'s explained']}
          rows={[
            ['Replicas and Isr match exactly', 'Fully healthy — every assigned replica is caught up', 'Part 04'],
            ['Isr is a strict subset of Replicas', 'One or more followers have fallen behind — reduced durability margin right now', 'Part 04, UnderReplicatedPartitions'],
            ['Leader: -1', 'No leader at all — partition unavailable, likely every ISR member became unreachable simultaneously', 'Part 05'],
            ['Isr contains a broker not in Replicas', 'Should never happen in a healthy cluster — worth escalating as a metadata inconsistency', 'N/A — an anomaly'],
          ]}
        />
        <Para>
          The consumer-groups equivalent tool, <code>kafka-consumer-groups.sh --describe</code>, is unrelated
          to replication but is worth mentioning here because the two are commonly confused: replication
          health (this module) is about whether a partition's data is durably copied across brokers, while
          consumer group health (the previous module) is about how far behind a group's readers are. A
          partition can have a perfectly healthy ISR while a consumer group reading it has enormous lag, and
          vice versa — they are orthogonal failure modes that happen to both show up as "something is wrong
          with this topic" from a distance.
        </Para>
        <Callout title="Check this before escalating a replication incident" color={K}>
          A one-line habit worth building: before assuming a production issue is a networking problem, an
          application bug, or "Kafka being flaky," run <code>--describe</code> on the affected topic. The
          Leader, Replicas, and Isr columns will tell you within seconds whether the actual root cause is a
          replication or leadership problem at all, rather than guessing from symptoms several layers removed
          from the actual state.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Designing replication settings per topic, not per cluster" />
        <SectionTitle>The Same Cluster Should Rarely Have One Replication Policy for Every Topic</SectionTitle>
        <Para>
          Every setting covered in this module — replication factor, min.insync.replicas,
          unclean.leader.election.enable, acks — can be set per topic (the first three) or per producer (acks),
          not just as a single cluster-wide default. Treating them as a single cluster-wide policy is a common
          simplification that either over-pays for durability on data that doesn't need it, or under-protects
          data that does, because a real production cluster almost always hosts topics with genuinely
          different loss tolerance sitting side by side.
        </Para>
        <Para>
          A useful exercise, walked through concretely here, is to take a handful of realistic topics on one
          shared cluster and reason about what each one's settings should actually be, rather than assuming a
          single answer applies everywhere.
        </Para>
        <Table
          headers={['Topic', 'What it carries', 'Recommended settings', 'Why']}
          rows={[
            ['payments.events', 'Financial transaction records', 'RF=3, min.isr=2, acks=all, unclean=false', 'Loss is unacceptable; availability is the acceptable tradeoff, per Part 06 and Part 05'],
            ['orders.events', 'Customer order lifecycle events', 'RF=3, min.isr=2, acks=all, unclean=false', 'Same reasoning as payments — losing an order event has direct customer and operational impact'],
            ['clickstream.raw', 'High-volume page-view and interaction events', 'RF=3, min.isr=1, acks=1, unclean=true', 'Individual event loss is statistically invisible in aggregate analytics; throughput and availability matter more'],
            ['app.debug.logs', 'Verbose application debug logging', 'RF=1 or RF=2, acks=0 or acks=1', 'No business consequence from loss; minimizing storage and replication cost is the priority'],
            ['inventory.changelog', 'Compacted current-state topic for product inventory', 'RF=3, min.isr=2, acks=all, unclean=false', 'A compacted topic represents current truth — losing a key\'s latest value silently corrupts every consumer rebuilding state from it'],
          ]}
        />
        <Para>
          Notice that the compacted changelog topic gets the same strict settings as payments, even though it
          isn't financial data in the traditional sense — the reasoning is different but the conclusion is the
          same. Because log compaction (covered generally for message brokers elsewhere in this track) retains
          only the latest value per key, losing an acknowledged write to a compacted topic doesn't just lose
          one historical event — it can silently corrupt the "current state" view every downstream consumer
          reconstructs from that topic, which is a much larger blast radius than a single lost event in an
          append-only, non-compacted topic.
        </Para>
        <Callout title="Set these explicitly per topic at creation time" color={K}>
          Relying on a cluster-wide default for min.insync.replicas and unclean.leader.election.enable means
          every new topic silently inherits whatever tradeoff the cluster operator originally chose — which is
          easy to get wrong in either direction as the cluster grows to host workloads with very different
          durability needs. Set these explicitly in the topic-creation command or infrastructure-as-code
          definition for every topic that carries data with real business consequence if lost, rather than
          trusting a cluster default that was chosen for a different topic's tradeoffs.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Replication and Durability</SectionTitle>
        {[
          {
            wrong: '"Replication factor 3 means my data is always safe"',
            right: 'Part 06 is precise about this: replication factor only sets how many copies can exist. Whether an individual acknowledged write actually survives a failure depends on acks, min.insync.replicas, and the ISR size at write time — RF=3 with acks=1 can still lose a record on a leader crash despite having 3 possible copies.',
          },
          {
            wrong: '"acks=all guarantees a write is on every replica before it is acknowledged"',
            right: 'Part 06 corrects this precisely: acks=all only waits for replicas currently in the ISR, which can be smaller than the full replica set. Without min.insync.replicas set as a floor, an ISR shrunk to just the leader still satisfies acks=all — the guarantee is as weak as acks=1 in that moment.',
          },
          {
            wrong: '"Any replica can become the new leader if the current leader fails"',
            right: 'Part 05 distinguishes clean from unclean leader election: by default (unclean.leader.election.enable=false), only a replica currently in the ISR — one that was actually caught up — can become leader. An out-of-sync replica becoming leader only happens if unclean election is explicitly enabled, and it comes with real data-loss risk.',
          },
          {
            wrong: '"Followers can serve consumer reads to help balance load, the same as the leader"',
            right: 'Part 03 is explicit that under Kafka\'s standard model, all client reads and writes for a partition go through the leader exclusively — followers exist to replicate, not to serve client traffic directly, which is what avoids a whole class of stale-read consistency problems.',
          },
          {
            wrong: '"ISR and replica list are basically the same thing, just different names"',
            right: 'Part 04 draws this distinction directly: the replica list is the static set of brokers assigned to hold a copy, while the ISR is the live, continuously recalculated subset of those replicas that are actually caught up right now. A replica can be on the replica list and simultaneously not be in the ISR.',
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
            <strong>At Coinbase:</strong> a post-incident review finds that a burst of trade-confirmation
            events was lost during a broker restart, even though the topic was configured with
            <code> replication.factor=3</code> and the producer used <code>acks=all</code>. Digging into the
            metrics shows <code>min.insync.replicas</code> had been left at the cluster default of 1, and two
            of the three brokers had briefly fallen out of the ISR earlier that day due to an unrelated disk
            issue — meaning acks=all was, in practice, only waiting on the leader alone during exactly the
            window the restart happened. The fix is setting <code>min.insync.replicas=2</code> on financial
            topics cluster-wide and adding an alert on <code>UnderReplicatedPartitions</code>, so an ISR
            shrinking below the safe margin is caught long before the next restart.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Netflix:</strong> a platform team is designing the replication settings for a new
            billing-events topic versus an existing playback-heartbeat topic. Billing events get
            <code> replication.factor=3</code>, <code>min.insync.replicas=2</code>,
            <code> unclean.leader.election.enable=false</code>, and <code>acks=all</code> — availability is
            deliberately sacrificed for correctness, because a lost or duplicated billing event has real
            financial and customer-trust consequences. Playback-heartbeat events, which are high-volume,
            loss-tolerant telemetry, get <code>replication.factor=3</code> with <code>acks=1</code> and
            unclean election left enabled — favoring throughput and availability, because losing a scattering
            of heartbeat pings changes nothing that matters. Same cluster, two topics, deliberately different
            durability postures.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>In a system design interview:</strong> "A candidate broker configuration uses
            replication.factor=3, acks=all, and min.insync.replicas=1. Is this durable? Why or why not?" The
            weak answer says "yes, replication factor 3 with acks=all is the standard durable setup." The
            strong answer catches the trap: with min.insync.replicas=1, acks=all only requires the current
            ISR to have at least 1 member — which the leader alone always satisfies — so this configuration
            provides no more durability than acks=1 the moment any follower falls behind. The correct fix is
            min.insync.replicas=2, which is exactly the distinction covered in Part 06.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. Walk through exactly what determines whether an acknowledged Kafka write actually survives a broker failure.',
            a: `It is never determined by a single setting in isolation — it's the combination described in Part 06. acks controls how many replicas the producer waits to hear from: 0 waits for nothing, 1 waits only for the leader's local append, and all waits for every replica currently in the ISR.

The subtlety most people miss is that "every replica in the ISR" is not the same as "replication.factor replicas." If followers have fallen behind and dropped out of the ISR, acks=all can be satisfied by a smaller set — in the worst case, just the leader. min.insync.replicas is what prevents that from silently happening: it's a floor on ISR size that the leader enforces, rejecting the write with NotEnoughReplicasException if the current ISR is smaller than that floor, rather than accepting a write and quietly providing weaker durability than acks=all implies.

So the real answer is: a write's actual durability equals the number of replicas in the ISR at the moment it was acknowledged, and min.insync.replicas is what guarantees that number is never below a value you've chosen — combined with unclean.leader.election.enable=false to ensure a subsequent leader election can't throw away that guarantee either.`,
          },
          {
            q: 'Q2. What is the difference between a partition\'s replica list and its ISR, and why does that distinction matter operationally?',
            a: `The replica list, per Part 02 and Part 04, is the static set of brokers assigned to hold a copy of a partition — determined at topic creation or reassignment time, and it doesn't change just because a broker is temporarily slow. The ISR is the dynamically maintained subset of that replica list currently confirmed to be caught up with the leader, based on replica.lag.time.max.ms.

Operationally, the gap between these two sets is exactly what UnderReplicatedPartitions measures — partitions where the ISR is smaller than the replica list, meaning some assigned replica exists but isn't currently providing durability. This is one of the highest-signal alerts on a Kafka cluster because it tells you your actual, real-time durability margin has shrunk, independent of whether a failure has happened yet.

It matters for leader election too: Part 05 covers that clean leader election only picks from the current ISR, not from the full replica list — a replica that's on the replica list but has fallen out of the ISR is not eligible to become leader without explicitly enabling unclean leader election.`,
          },
          {
            q: 'Q3. Explain unclean leader election — what problem does disabling it solve, and what does disabling it cost you?',
            a: `Unclean leader election addresses the scenario where every in-sync replica for a partition is simultaneously unavailable, but a replica that had already fallen out of the ISR — lagging behind — is still reachable. With unclean.leader.election.enable=true, Kafka is allowed to promote that lagging replica to leader anyway, prioritizing bringing the partition back online.

The cost, covered in Part 05, is that the promoted replica's log is missing whatever records it hadn't caught up to before it fell out of the ISR — including records that may have already been acknowledged to producers under acks=all when the previous leader was still up. Those records don't just become temporarily inaccessible; they're gone from the partition's history entirely, silently, from any client's point of view.

Setting unclean.leader.election.enable=false removes that escape hatch: if every in-sync replica is down, the partition simply stays unavailable rather than risk silent data loss. That's the right default for financially or legally significant data — reject availability, not correctness. It's a legitimate choice to enable it for genuinely loss-tolerant data where staying available matters more than the small chance of losing some recent records, but it should be a deliberate per-topic decision, not an unexamined cluster default.`,
          },
          {
            q: 'Q4. Why does Kafka route all reads and writes through the partition leader instead of allowing any in-sync replica to serve them?',
            a: `Because it eliminates an entire category of consistency bugs at the cost of some unused follower capacity. Per Part 03, if any in-sync replica could serve a read, clients would need to reason about which replica they happened to read from and how far behind the leader it might be at that instant — a follower can be "in sync" by the ISR's lag-based definition while still being a few hundred milliseconds of replication behind the leader's very latest writes.

By funneling every read and write through the single current leader, there's only ever one place a client's request can go for a given partition, and that place always has the most current data for that partition — no staleness window to reason about, no need to pick a consistency level per read. The tradeoff is that follower brokers' read-serving capacity sits idle under normal client traffic; their role is purely to replicate and to stand ready to become leader if the current leader fails.

Some modern Kafka deployments do support follower fetching for reduced cross-availability-zone network cost, but that's a separate, opt-in mechanism for other brokers or specifically-configured clients reading replicated data — it doesn't change the fact that a given partition's canonical, leader-served view is still what everything is measured against.`,
          },
          {
            q: 'Q5. What role does the controller play when a broker fails, and how does that connect to KRaft?',
            a: `Some component of the cluster has to actually notice a broker has failed and decide what happens to every partition it was leading — that's the controller's job, covered in Part 07. It detects the failure (missed heartbeats from that broker), and for every partition the failed broker was leading, it consults that partition's current ISR and elects a new leader from it, following the clean-election rules from Part 05 (or the unclean-election policy, if that's been explicitly enabled). It then records and propagates that new leadership assignment as cluster metadata that every broker and client can look up.

KRaft is the mechanism modern Kafka uses to run the controller itself reliably: a small quorum of controller-eligible brokers use the Raft consensus protocol among themselves to agree on this metadata, replacing the older architecture where ZooKeeper played that role. The responsibilities are the same either way — detect failures, elect from the ISR, propagate metadata — what changed is that Kafka brokers now handle it internally via Raft rather than depending on an external coordination service.

I wouldn't expect to need deep Raft internals day to day, but understanding that there is always exactly one active controller making these leadership decisions, and that it strictly follows the ISR-based election rules, is what makes the failure behavior in Part 05 predictable rather than mysterious.`,
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
            q: 'Treating replication.factor as the whole durability story',
            a: 'Part 02 and Part 06 both stress that replication factor only sets a ceiling on how many copies can exist. Real durability comes from the combination with acks and min.insync.replicas — RF=3 with acks=1 can still lose an acknowledged record on a leader crash.',
          },
          {
            q: 'Setting acks=all without also setting min.insync.replicas to a meaningful floor',
            a: 'Part 06 and Interview Prep Q1 cover this exactly: acks=all only waits for the current ISR, which can shrink to just the leader. Without min.insync.replicas set to at least 2, acks=all can silently provide no more protection than acks=1.',
          },
          {
            q: 'Leaving unclean.leader.election.enable=true on topics where data loss is unacceptable',
            a: 'Part 05 walks through the exact failure mode: an out-of-sync replica gets promoted to leader, and any records it hadn\'t caught up to are silently gone, even if they were previously acknowledged under acks=all. Financially or legally significant topics should disable this explicitly, not rely on cluster defaults.',
          },
          {
            q: 'Assuming a follower can serve consumer reads to spread out load',
            a: 'Part 03 and Interview Prep Q4 are clear that under Kafka\'s standard model, all client reads and writes go through the leader only. Followers replicate; they don\'t serve client traffic in the default model.',
          },
          {
            q: 'Not monitoring UnderReplicatedPartitions and treating ISR shrinkage as invisible until a leader actually fails',
            a: 'Part 04 frames ISR shrinkage as a real, actionable signal — a partition whose ISR is smaller than its replication factor has reduced durability margin right now, well before any leader failure makes that visible the hard way.',
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
            error: 'NotEnoughReplicasException (or NotEnoughReplicasAfterAppendException) returned to the producer on a write',
            cause: 'The partition\'s current ISR has shrunk below the topic\'s min.insync.replicas setting — per Part 06, the leader refuses acks=all writes when it cannot guarantee the configured minimum number of replicas will confirm them, rather than silently accepting a write with weaker durability than requested.',
            fix: 'This is the leader correctly protecting your durability guarantee, not a bug to silently retry past. Investigate why replicas fell out of the ISR (broker down, network issues, replica lag) and restore them; the write should succeed again once enough replicas are back in the ISR. Alert on this exception rate directly — it is a leading indicator of reduced cluster durability margin.',
          },
          {
            error: 'A post-incident review shows records that were acknowledged to producers are simply missing from the topic after a broker outage',
            cause: 'Per Part 05, either unclean.leader.election.enable was set to true and an out-of-sync replica was promoted to leader after every in-sync replica became unavailable, or min.insync.replicas was set too low (often 1) so that acks=all was effectively only as durable as acks=1 once the ISR had already shrunk before the outage.',
            fix: 'Set unclean.leader.election.enable=false on any topic where silent loss is unacceptable, and set min.insync.replicas to at least 2 with replication.factor=3 so acks=all provides a real, guaranteed floor. Add alerting on UnderReplicatedPartitions so an ISR shrinking below safe margin is caught and fixed before a subsequent failure can trigger loss.',
          },
          {
            error: 'UnderReplicatedPartitions metric is elevated for one specific partition, persistently, without a broker actually being down',
            cause: 'A specific follower replica for that partition is consistently failing to fetch within replica.lag.time.max.ms, per Part 04 — commonly because that broker is under-provisioned relative to the partition\'s write rate, or is experiencing network contention, or is running a disk that is slower than its peers.',
            fix: 'Identify the specific lagging broker (kafka-topics.sh --describe shows replicas vs. ISR per partition) and investigate its resource usage directly — CPU, disk I/O, and network throughput relative to what the partition\'s write rate demands. Rebalancing partition leadership or replicas away from a chronically underpowered broker is often necessary, not just a config tweak.',
          },
          {
            error: 'A partition becomes completely unavailable for both reads and writes after what looked like a routine broker restart',
            cause: 'The restarted broker was the sole remaining member of that partition\'s ISR at the time — the other replicas had already fallen out of sync for an unrelated reason — and unclean.leader.election.enable=false correctly refused to promote an out-of-sync replica, per Part 05, leaving the partition leaderless until an in-sync replica becomes available again.',
            fix: 'This is the deliberate durability-over-availability tradeoff of unclean.leader.election.enable=false working as intended — the fix is not to flip it to true reflexively, but to get the restarted broker back online quickly (it was in the ISR, so it can resume as leader immediately) and to investigate why the other replicas had already fallen behind before this incident, since that pre-existing lag is what created the exposure.',
          },
          {
            error: 'Consumers occasionally see a brief burst of NotLeaderOrFollower errors immediately after a broker restart, then recover on their own',
            cause: 'Per Part 07, when a broker leading several partitions restarts or fails, the controller elects new leaders for those partitions and propagates updated metadata — but clients holding stale metadata briefly send requests to the old, no-longer-leading broker until they refresh.',
            fix: 'This is expected, self-recovering behavior in a well-configured client — most Kafka client libraries handle this transparently by refreshing metadata and retrying. It only needs investigation if the errors persist well beyond the time it should take metadata to propagate, which would suggest a genuine controller or metadata-propagation problem rather than a normal leader-election blip.',
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
          'Replication exists to survive broker and disk failures; replication.factor sets how many copies of each partition exist, spread across different brokers.',
          'Only the partition leader serves client reads and writes; followers replicate the leader\'s log and stand ready to take over, but do not serve normal client traffic themselves.',
          'The ISR is the live, continuously recalculated subset of replicas currently caught up with the leader — distinct from the static replica list, and it is what durability guarantees are actually measured against.',
          'Clean leader election only promotes a replica from the current ISR, guaranteeing no acknowledged data is lost; unclean leader election (when enabled) can promote an out-of-sync replica and silently lose acknowledged records.',
          'acks=all only waits for the current ISR, not the full replication factor — min.insync.replicas is what turns that into a real, guaranteed floor, rejecting writes rather than silently accepting weaker durability when the ISR shrinks too far.',
          'The KRaft controller quorum detects broker failures, elects new leaders from the ISR following these rules, and propagates the resulting metadata to every broker and client in the cluster.',
        ]}
      />
    </LearnLayout>
  )
}
