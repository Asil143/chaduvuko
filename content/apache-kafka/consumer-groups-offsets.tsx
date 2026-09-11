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

export default function ConsumerGroupsOffsets() {
  return (
    <LearnLayout
      title="Consumer Groups and Offsets"
      description="What a consumer group really is, how rebalancing and partition assignment work, where offsets actually live, commit strategies, auto.offset.reset, consumer lag, and static group membership — the operational core of running Kafka consumers in production."
      section="Apache Kafka — Module 05"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Consumer Groups and Offsets', href: '/learn/apache-kafka/consumer-groups-offsets' },
      ]}
      prev={{ title: 'Local Setup and Kafka CLI', href: '/learn/apache-kafka/local-setup-cli' }}
      next={{ title: 'Replication, Leaders, and ISR', href: '/learn/apache-kafka/replication-leaders-isr' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What a consumer group actually is" />
        <SectionTitle>A Consumer Group Is a Named Claim on a Set of Partitions</SectionTitle>
        <Para>
          A consumer group is not a queue, a thread pool, or a load balancer in the traditional sense. It is
          a set of consumer processes that share one <code>group.id</code> string. Kafka's job is to hand out
          the partitions of every topic the group subscribes to across the consumers currently in that group,
          so that <strong>each partition is owned by exactly one consumer within the group at any moment</strong>.
          That single sentence is the entire mental model, and almost every consumer-group bug traces back to
          forgetting one clause of it — "within the group," "at any moment," or "exactly one."
        </Para>
        <Para>
          The "within the group" clause is what makes Kafka behave like a queue and a pub-sub system
          simultaneously, the same duality covered for brokers generally in the Data Engineering track. Two
          consumers in the <em>same</em> group compete — Kafka gives each one a disjoint slice of the
          partitions, so records are spread across them like workers pulling from a shared queue. Two
          consumers in <em>different</em> groups reading the same topic do not compete at all. Each group
          gets its own independent read position over the same log. A payments-processing group and a
          fraud-analytics group can both subscribe to the <code>orders</code> topic, each seeing every
          record, each moving through the log at its own pace, with zero coordination between the two groups.
        </Para>
        <CodeBox label="one topic, two groups, independent read positions">
{`orders topic — 6 partitions

group: payments-service (3 consumer instances)
  payments-1  owns partitions 0, 1
  payments-2  owns partitions 2, 3
  payments-3  owns partitions 4, 5

group: fraud-analytics (1 consumer instance)
  fraud-1     owns partitions 0, 1, 2, 3, 4, 5

payments-service has processed through offset 940,201 on partition 0.
fraud-analytics has processed through offset 812,004 on the same partition.
Neither group affects the other's position. Neither "removes" records for
the other. Both are reading the same durable log independently.`}
        </CodeBox>
        <HighlightBox>
          <Para>
            <strong>Beginner model:</strong> a consumer group is a pool of workers that split up a topic's
            messages so nothing is processed twice.
          </Para>
          <Para>
            <strong>Production model:</strong> a consumer group is a coordination unit tracked by a specific
            broker (the group coordinator), which assigns partitions to member consumers via a generation-
            numbered protocol, tracks group membership through heartbeats, triggers rebalances when
            membership or subscriptions change, and persists the group's progress as committed offsets in an
            internal Kafka topic — not in the application, not in ZooKeeper, and not in memory.
          </Para>
        </HighlightBox>
        <Callout title="Group id is the whole identity" color={K}>
          Kafka does not know or care what your consumers are called, what language they're written in, or
          what they do with a record. The only identity that matters for grouping is the string you put in
          <code> group.id</code>. Two processes with the same group.id are automatically teammates, even if
          nobody meant for that to happen — a classic incident is a staging consumer accidentally sharing a
          group.id with production and silently stealing partitions from it.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The group coordinator" />
        <SectionTitle>Every Group Has a Coordinator Broker That Runs the Protocol</SectionTitle>
        <Para>
          For every consumer group, one broker in the cluster is elected as that group's <strong>group
          coordinator</strong>. Which broker it is depends on hashing the group id to a partition of the
          internal <code>__consumer_offsets</code> topic — the coordinator is whichever broker currently
          leads that partition. Consumers discover their coordinator the same way producers discover
          partition leaders: they ask any broker via <code>bootstrap.servers</code>, and the cluster tells
          them.
        </Para>
        <Para>
          The coordinator's job is to run the membership protocol: track which consumer instances are
          currently alive in the group, decide when a rebalance is needed, choose a partition assignment (or
          delegate the assignment computation to a chosen "group leader" consumer, depending on the assignor),
          and distribute that assignment back out. It also owns the group's offset storage — commits and
          fetches for that group's offsets go through the coordinator.
        </Para>
        <SubTitle>Heartbeats are how the coordinator knows you're alive</SubTitle>
        <Para>
          Each consumer runs a background heartbeat thread that pings the coordinator on an interval
          (<code>heartbeat.interval.ms</code>, default 3 seconds). If the coordinator does not hear a
          heartbeat from a member within <code>session.timeout.ms</code> (default 45 seconds in modern
          clients), it considers that consumer dead and evicts it from the group — triggering a rebalance so
          its partitions can be reassigned to a still-living consumer. This is deliberately decoupled from
          the main polling loop: heartbeats run on their own thread precisely so that a consumer doing slow
          record processing between <code>poll()</code> calls is not mistaken for a dead one.
        </Para>
        <Para>
          There is a second, related timeout that catches a different failure mode: <code>max.poll.
          interval.ms</code> (default 5 minutes). This bounds how long a consumer is allowed to go between
          calls to <code>poll()</code> itself. A consumer that is alive at the heartbeat-thread level but
          stuck processing a batch — deadlocked, or just genuinely too slow — will still get evicted once it
          blows past this interval, because the coordinator's real concern is whether the consumer is making
          forward progress, not merely whether its process is running.
        </Para>
        <Table
          headers={['Setting', 'What it controls', 'Too low', 'Too high']}
          rows={[
            ['heartbeat.interval.ms', 'How often the background thread pings the coordinator', 'Wasted network chatter', 'Slower detection of a real failure'],
            ['session.timeout.ms', 'How long without a heartbeat before the member is evicted', 'False evictions on transient GC pauses or network blips', 'Slow to react to a genuinely dead consumer'],
            ['max.poll.interval.ms', 'How long between poll() calls before the member is evicted', 'Legitimate slow batches trigger unnecessary rebalances', 'A truly stuck consumer holds its partitions for a long time'],
          ]}
        />
        <Callout title="Production tuning note" color="#38bdf8">
          If your processing occasionally takes longer per batch than <code>max.poll.interval.ms</code>
          allows, the fix is almost never "raise the timeout indefinitely." It is usually to lower
          <code>max.poll.records</code> so each batch is smaller and finishes well inside the interval, or to
          move slow work (a downstream API call, a large write) off the polling thread entirely.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — What triggers a rebalance" />
        <SectionTitle>A Rebalance Is Kafka Recomputing Who Owns What</SectionTitle>
        <Para>
          A rebalance is the process of reassigning partitions among the members of a consumer group. It is
          not an error condition by itself — it is the mechanism that lets a group adapt to a changing set of
          consumers or a changing set of partitions. But a rebalance is disruptive: assigned partitions are
          revoked and reassigned, which means, depending on the protocol, active fetching from those
          partitions can pause. Understanding what triggers one is the difference between an expected,
          brief blip and a mysterious recurring outage.
        </Para>
        <BulletList
          items={[
            'A new consumer instance joins the group (a deploy adding a pod, a scale-out event).',
            'An existing consumer leaves the group cleanly (a graceful shutdown that calls consumer.close()).',
            'An existing consumer is considered dead by the coordinator — missed heartbeats past session.timeout.ms, or a stalled poll loop past max.poll.interval.ms.',
            'The set of partitions a subscribed topic has changes (a topic is repartitioned to add partitions).',
            'A consumer changes its subscription — for example calling subscribe() with a different topic pattern.',
            'The group coordinator itself changes broker (rare, but forces members to rediscover it and can coincide with a rebalance).',
          ]}
        />
        <Para>
          Every rebalance is tagged with a <strong>generation id</strong> — a monotonically increasing
          integer the coordinator increments each time it recomputes group membership. This number exists to
          reject stale requests: if a consumer's heartbeat or offset commit arrives carrying an old
          generation id, the coordinator rejects it, because that consumer is operating on an assignment that
          has already been superseded. This is what prevents a consumer that was evicted and is unaware of it
          — a "zombie" — from continuing to commit offsets for partitions it no longer owns.
        </Para>
        <CodeBox label="a rolling deploy from the group's point of view">
{`orders-consumer group, generation 41, 4 partitions, 4 consumers (1 each)

deploy starts: pod orders-consumer-2 is terminated
  -> coordinator misses its heartbeats (or sees a clean leave request)
  -> generation increments to 42
  -> rebalance: partitions 0,1,2,3 are reassigned among the 3 remaining consumers
  -> some consumers now own partitions they didn't own a moment ago

new pod orders-consumer-2 (replacement) starts and joins
  -> generation increments to 43
  -> rebalance again: partitions reshuffled among 4 consumers

net effect of one pod replacement: two rebalances, each one briefly pausing
fetches on affected partitions while the new assignment is computed and applied`}
        </CodeBox>
        <Callout title="Rebalance storms" color="#ef4444">
          If deploys are rolling one pod at a time and each pod restart triggers two rebalances that each
          pause the group for a few seconds, a deploy of 20 pods can produce 40 rebalances back to back —
          a group that appears to be almost constantly reorganizing rather than processing. This is one of
          the most common causes of a consumer group's throughput mysteriously cratering during a deploy
          window, and it is directly addressed by static group membership in Part 08.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Eager vs cooperative rebalancing" />
        <SectionTitle>Eager Rebalancing Stops the World; Cooperative Rebalancing Doesn't</SectionTitle>
        <Para>
          How disruptive a rebalance is depends on which <strong>partition assignment strategy</strong> the
          group is configured with. This is a production distinction that matters far more than most
          introductory material suggests, because the historical default behaved in a way that surprises
          people the first time they watch it happen at scale.
        </Para>
        <SubTitle>Eager rebalancing — revoke everything, then reassign everything</SubTitle>
        <Para>
          With the classic eager protocol (assignors like <code>RangeAssignor</code> and
          <code>RoundRobinAssignor</code>), a rebalance works in two hard phases. First, <strong>every</strong>
          consumer in the group gives up <strong>all</strong> of its currently assigned partitions —
          including the ones it would end up keeping anyway. Only after every member has revoked everything
          does the coordinator compute the new assignment and hand partitions back out. For the entire window
          between revoke and reassign, the whole group stops consuming. This is the "stop-the-world" behavior:
          one new consumer joining a 50-consumer group pauses all 50, not just the ones whose assignment
          actually changes.
        </Para>
        <CodeBox label="eager rebalance — everyone stops, even members whose assignment won't change">
{`group has 5 consumers, 10 partitions, 2 partitions each. consumer-6 joins.

phase 1 (revoke): ALL 5 existing consumers give up ALL of their partitions
  -> for a moment, nobody in the group owns anything
  -> nothing is being consumed from any of the 10 partitions

phase 2 (reassign): coordinator computes a fresh assignment across 6 consumers
  -> each of the 6 gets partitions back (most get the same 1-2 they had before,
     purely by coincidence of the assignment algorithm, not because it was preserved)

net effect: the entire group was idle during the revoke/reassign window,
even though only 1 out of 6 consumers' assignment was actually new`}
        </CodeBox>
        <SubTitle>Cooperative sticky rebalancing — only revoke what actually has to move</SubTitle>
        <Para>
          <code>CooperativeStickyAssignor</code> changes this fundamentally. A rebalance still happens, but it
          runs in incremental rounds: the coordinator computes the new assignment, and each consumer only
          revokes the specific partitions it is actually losing — partitions it keeps stay assigned and keep
          being fetched the entire time. "Sticky" means the assignor also biases toward keeping a consumer's
          existing partitions when computing the new assignment in the first place, minimizing how much
          actually needs to move. The practical effect: a single consumer joining or leaving a large group
          now disrupts only the small number of partitions that genuinely change owners, not the whole group.
        </Para>
        <Table
          headers={['', 'Eager (Range / RoundRobin)', 'Cooperative Sticky']}
          rows={[
            ['Revocation scope', 'All partitions, from all members, every rebalance', 'Only the specific partitions actually being reassigned'],
            ['Consumers paused', 'The entire group, for the whole rebalance window', 'Only members losing a partition, and only briefly'],
            ['Assignment stability', 'No guarantee of keeping the same partitions', 'Biased to keep existing assignments where possible'],
            ['Number of rebalance rounds', 'One pass: revoke-all then assign-all', 'One or more incremental passes'],
            ['Good default for', 'Legacy compatibility only', 'Virtually all new production consumer groups'],
          ]}
        />
        <Callout title="Migration has to be done carefully" color="#f59e0b">
          You cannot just flip <code>partition.assignment.strategy</code> to
          <code>CooperativeStickyAssignor</code> on one consumer while the rest of the group is still on an
          eager assignor — the protocols aren't interoperable mid-rebalance. Kafka supports a documented
          two-phase rolling upgrade: first roll out a config that supports both protocols, let the group settle,
          then roll out the config that only uses cooperative. Skipping the intermediate step is a common
          source of a group getting stuck unable to rebalance at all during a botched migration.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — What an offset actually is" />
        <SectionTitle>An Offset Is a Position in a Log — Committed Offsets Live in Kafka Itself</SectionTitle>
        <Para>
          An offset is simply the sequential position of a record within one partition — 0, 1, 2, 3, and so
          on, strictly increasing, never reused. It has meaning only relative to a specific topic-partition;
          "offset 500" on <code>orders</code> partition 0 has nothing to do with "offset 500" on
          <code>orders</code> partition 1. There are two offsets worth keeping distinct in your head: the
          <strong> log-end-offset</strong> (the position of the next record that will be written — how far
          the partition has grown) and the <strong>committed offset</strong> (the position a given consumer
          group has durably recorded as "everything before this has been safely processed").
        </Para>
        <Para>
          A very common belief left over from older Kafka deployments is that offsets are stored in
          ZooKeeper. They are not, and have not been since Kafka 0.9. Committed offsets are stored as records
          in an internal Kafka topic named <code>__consumer_offsets</code> — a normal, replicated,
          partitioned Kafka topic, created automatically, with 50 partitions by default. Each commit is
          itself a Kafka write: a record keyed by <code>(group.id, topic, partition)</code> whose value
          encodes the committed offset, written to whichever partition of
          <code>__consumer_offsets</code> that key hashes to. The topic is compacted, so only the latest
          committed offset per key is retained long-term — exactly the same log-compaction mechanism used
          for changelog-style topics elsewhere in Kafka.
        </Para>
        <CodeBox label="__consumer_offsets — what a commit actually writes">
{`group.id = payments-service commits offset 940,202 for orders partition 0

this is written as a Kafka record to __consumer_offsets:
  key:   (group=payments-service, topic=orders, partition=0)
  value: (offset=940202, metadata=..., commit_timestamp=...)

which partition of __consumer_offsets does this land on?
  partition = hash("payments-service") % 50

so ALL offset commits for a given group.id land on the SAME
__consumer_offsets partition, and are handled by that partition's
leader broker — which is exactly the broker that acts as the
group coordinator for that group.id`}
        </CodeBox>
        <Callout title="Why this matters operationally" color="#38bdf8">
          Because offsets are ordinary Kafka records, they inherit Kafka's own durability guarantees —
          replication, not a separate consensus system. It also means you can inspect them with the same
          tools you use for any topic (<code>kafka-console-consumer</code> against
          <code>__consumer_offsets</code> with the right deserializer), and that resetting a group's offsets
          is really just producing new commit records, which is exactly what
          <code>kafka-consumer-groups.sh --reset-offsets</code> does under the hood.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Commit strategies" />
        <SectionTitle>Auto-Commit vs Manual Commit, and Exactly When You Commit</SectionTitle>
        <Para>
          By default, most Kafka clients auto-commit offsets on a timer — <code>enable.auto.commit=true</code>
          with <code>auto.commit.interval.ms</code> defaulting to 5 seconds. Every five seconds, the client
          library commits the offset of the latest record returned by <code>poll()</code>, regardless of
          whether your application has actually finished doing anything useful with it. This is convenient
          and, for workloads where an occasional reprocessed or skipped record is harmless, perfectly fine.
          For anything where correctness matters, it is a trap.
        </Para>
        <Para>
          The trap: auto-commit fires on a wall-clock timer that has no relationship to your processing.
          If your application pulls a batch of records, starts processing them, and crashes halfway through
          — after the auto-commit timer already fired for offsets beyond where processing actually got to —
          those records are silently skipped on restart. The consumer resumes from the committed offset,
          which is now ahead of the last record actually processed.
        </Para>
        <SubTitle>The manual-commit alternative: commit only after real work is durable</SubTitle>
        <Para>
          Turning off auto-commit (<code>enable.auto.commit=false</code>) and committing explicitly, after
          your application has confirmed the record's effects are durable — written to a database, published
          downstream, whatever "done" means for that pipeline — moves the failure mode from "silently skipped"
          to "possibly reprocessed." That is a strictly better failure mode for most business logic, because
          reprocessing can be made safe with idempotency (a unique key, an upsert, a dedup check), while a
          silently skipped record usually cannot be recovered at all without a full reprocess from an earlier
          offset.
        </Para>
        <CodeBox label="manual commit — commit after the durable side effect, not before">
{`while running:
    records = consumer.poll(timeout=1.0)

    for record in records:
        result = process(record)          # e.g. compute a derived value
        db.upsert(record.key, result)     # durable, idempotent write FIRST

    consumer.commit()   # only now — after every record in the batch is durably written`}
        </CodeBox>
        <Para>
          Manual commits come in two flavors. <code>commitSync()</code> blocks until the coordinator
          acknowledges the commit, retrying on retriable failures — it is slower per call but you know for
          certain the commit landed (or got an exception telling you it didn't) before you move on.
          <code> commitAsync()</code> fires the commit and continues immediately, calling back on completion
          — higher throughput, but a failed async commit is easy to lose track of if you don't handle the
          callback, and async commits can complete out of order under retries. A common, well-tested pattern:
          use <code>commitAsync()</code> during the normal processing loop for throughput, and a final
          <code> commitSync()</code> on shutdown to guarantee the last commit is durable before the process
          exits.
        </Para>
        <Table
          headers={['Strategy', 'Failure mode on crash', 'When it is the right call']}
          rows={[
            ['Auto-commit (timer-based)', 'Can silently skip unprocessed records', 'Metrics, logs, best-effort analytics where occasional loss is acceptable'],
            ['Manual commit before processing', 'Can silently skip records, same as auto-commit but self-inflicted', 'Rarely correct — avoid unless you truly do not care about the record\'s fate'],
            ['Manual commit after processing (sync)', 'Can reprocess records — safe if processing is idempotent', 'Payments, orders, anything where loss is worse than a rare duplicate'],
            ['Manual commit after processing (async)', 'Same as sync, plus a small risk of losing track of a failed commit callback', 'High-throughput pipelines with a sync commit on shutdown as a safety net'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Restart behavior and auto.offset.reset" />
        <SectionTitle>What Happens When a Consumer Comes Back — and When There's Nothing to Come Back To</SectionTitle>
        <Para>
          When an existing consumer group restarts, it asks the coordinator for its last committed offset per
          partition and resumes exactly there. This is the entire point of committing offsets in the first
          place — the group's progress lives in Kafka, not in the process, so a restart, a redeploy, or a
          total replacement of every consumer instance in the group loses no memory of where it was.
        </Para>
        <Para>
          But there is a case with no committed offset to resume from: a brand-new <code>group.id</code> that
          has never committed anything for a partition, or an existing group whose committed offset has aged
          out of retention (<code>offsets.retention.minutes</code>, default 7 days — a group that has been
          offline longer than that loses its position entirely). In either case, Kafka has nothing to resume
          from, and falls back to the <code>auto.offset.reset</code> policy.
        </Para>
        <Table
          headers={['auto.offset.reset', 'Behavior with no committed offset', 'Typical use']}
          rows={[
            ['earliest', 'Start from the beginning of the partition\'s retained log', 'A new consumer that needs the full history — backfills, new downstream systems, rebuilding state'],
            ['latest', 'Start from the current log-end-offset — only new records from now on', 'A new consumer that only cares about events going forward, e.g. a live alerting service'],
            ['none', 'Throw an exception instead of guessing', 'Pipelines where silently picking a start point is unacceptable and a human should decide explicitly'],
          ]}
        />
        <Callout title="This setting only applies once" color={K}>
          <code>auto.offset.reset</code> is not a general "what to do when confused" switch — it is
          consulted <strong>only</strong> when there is no valid committed offset to use. Once a group has
          committed at least one offset for a partition, this setting is irrelevant for that partition; the
          consumer always resumes from the committed position, full stop. Setting it to <code>latest</code>
          and expecting it to somehow recover a stuck consumer is a common, mistaken debugging move — it does
          nothing if a committed offset already exists.
        </Callout>
        <Para>
          This is also exactly why standing up a brand-new consumer group against a topic that already has
          months of history is a decision, not a default. If that new group id has never committed anything
          and <code>auto.offset.reset=earliest</code>, it will start consuming from the oldest retained
          record — potentially reprocessing a huge volume of historical data the moment it starts, which can
          overwhelm a downstream system that wasn't expecting a flood.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Consumer lag and static membership" />
        <SectionTitle>Consumer Lag Is the Health Signal; Static Membership Avoids Needless Rebalances</SectionTitle>
        <Para>
          Consumer lag is the gap between the log-end-offset of a partition and the offset a consumer group
          has committed for it: <code>lag = log-end-offset − committed-offset</code>, measured in number of
          records. Lag of zero means the group is fully caught up. A small, stable, or oscillating lag means
          the group is keeping pace with bursts and draining them. A lag that trends upward over a sustained
          window means the group is structurally slower than the rate records are being produced, and — left
          alone — it only gets worse, since nothing about Kafka causes a falling-behind consumer to
          automatically catch up.
        </Para>
        <Para>
          Lag should always be checked per partition, not just summed across the group. A healthy-looking
          total can hide one badly lagging partition — a hot key concentrating disproportionate volume onto a
          single partition, which only one consumer instance can ever own regardless of how many consumers
          exist in the group. Tools like <code>kafka-consumer-groups.sh --describe --group &lt;id&gt;</code>
          report lag per partition specifically because the aggregate number is not enough to diagnose a
          skew problem.
        </Para>
        <CodeBox label="checking lag with the CLI">
{`kafka-consumer-groups.sh --bootstrap-server broker:9092 \\
  --describe --group payments-service

GROUP             TOPIC   PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG
payments-service  orders  0          940310          940310          0
payments-service  orders  1          812004          812004          0
payments-service  orders  2          551200          812440          261240   <- badly lagging
payments-service  orders  3          940190          940310          120`}
        </CodeBox>
        <SubTitle>Static group membership — surviving a restart without a rebalance</SubTitle>
        <Para>
          By default, every consumer process is a fresh, anonymous member of its group — when it restarts,
          the coordinator sees it as a brand-new member joining, which triggers a rebalance, exactly as
          described in Part 03. For a rolling restart of many instances, this produces exactly the rebalance
          storm called out earlier, even though from a human's point of view nothing really "changed" —
          the same set of instances just cycled one at a time.
        </Para>
        <Para>
          Setting <code>group.instance.id</code> to a stable, unique string per consumer instance turns that
          instance into a <strong>static member</strong>. When a static member disconnects and reconnects
          within <code>session.timeout.ms</code>, the coordinator recognizes it as the same member returning
          — not a departure followed by an arrival — and simply hands its previous assignment back without
          triggering a rebalance at all. This converts a rolling restart from "one or two rebalances per pod
          cycled" into "zero rebalances, as long as each pod comes back reasonably quickly."
        </Para>
        <CodeBox label="static membership config — one stable id per instance">
{`# each consumer pod gets a stable, unique instance id (e.g. derived from pod name)
group.id=payments-service
group.instance.id=payments-service-pod-3
session.timeout.ms=45000   # window in which a static member can reconnect without a rebalance`}
        </CodeBox>
        <Callout title="Static membership is not free" color="#f59e0b">
          A static member that disconnects and does not come back within <code>session.timeout.ms</code> still
          gets evicted and its partitions reassigned — the same as a dynamic member, just on a longer fuse
          you control. And because static membership is identity-based, deploying with a colliding
          <code>group.instance.id</code> across two different real instances (a copy-paste mistake in a
          StatefulSet configuration) causes one of them to be fenced off by the coordinator with a
          <code>FencedInstanceIdException</code> — worth knowing before it shows up as a confusing production
          error.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Multi-topic subscriptions and assignment strategies" />
        <SectionTitle>Assignment Strategy Also Decides How Partitions Split Across Topics</SectionTitle>
        <Para>
          Everything in Part 04 about eager versus cooperative rebalancing describes <em>how</em> a rebalance
          plays out mechanically. A separate question is <em>which</em> partitions each consumer ends up with
          when a group subscribes to more than one topic at once — a very common real-world shape, since many
          services consume several related topics with one group id rather than running a separate group per
          topic.
        </Para>
        <Para>
          <code>RangeAssignor</code> assigns partitions topic by topic, independently, trying to give
          consecutive consumers consecutive partition ranges within each topic. This sounds harmless until you
          notice the failure mode: because each topic is assigned independently using the same ordering of
          consumers, the <em>same</em> consumer instance tends to land at the "front of the line" for every
          topic, and can end up with a disproportionate share of the total partitions across all subscribed
          topics while another consumer gets comparatively few.
        </Para>
        <CodeBox label="RangeAssignor imbalance across two topics">
{`group subscribes to: orders (3 partitions), payments (3 partitions)
3 consumers: c1, c2, c3

RangeAssignor computes each topic's assignment independently, same consumer order:
  orders:   c1 -> [0,1]   c2 -> [2]     c3 -> []
  payments: c1 -> [0,1]   c2 -> [2]     c3 -> []

totals:
  c1 owns 4 partitions
  c2 owns 2 partitions
  c3 owns 0 partitions   <- sitting idle despite being a paid-for running instance

RoundRobinAssignor and CooperativeStickyAssignor both spread partitions across
ALL subscribed topics as one combined pool, avoiding this per-topic repetition:
  c1 -> orders[0], payments[1]
  c2 -> orders[1], payments[2]
  c3 -> orders[2], payments[0]
  every consumer gets 2 — evenly split`}
        </CodeBox>
        <Callout title="Prefer RoundRobin or CooperativeSticky for multi-topic groups" color="#38bdf8">
          If a consumer group subscribes to more than one topic, RangeAssignor's topic-by-topic assignment can
          silently leave some instances doing far more work than others while the rest sit comparatively idle
          — with no error, no log line, just a quietly uneven load distribution that only shows up as one
          instance running hot under CPU or memory pressure while its peers look fine.
        </Callout>
        <Para>
          It is also worth being precise about <code>subscribe()</code> versus <code>assign()</code>. Calling
          <code>subscribe()</code> with a topic name or pattern hands partition assignment over to the group
          coordinator entirely — this is the consumer-group model described throughout this module, with
          rebalancing, heartbeats, and generation ids all in play. Calling <code>assign()</code> instead lets
          an application manually pin itself to specific partitions, bypassing the group protocol altogether.
          Manual assignment has real uses — a Kafka Streams-style application doing custom partition-to-
          instance mapping, or a tool that genuinely needs to read one specific partition regardless of group
          membership — but it forfeits every benefit covered in this module: no automatic rebalancing on
          scale-out, no automatic failover if that instance dies, and no group-tracked offset management unless
          you build it yourself.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Operational monitoring in practice" />
        <SectionTitle>What to Actually Watch, and What Good Looks Like</SectionTitle>
        <Para>
          Everything covered so far is mechanism. In production, the mechanism only matters insofar as it
          shows up in a small set of metrics that tell you whether a consumer group is healthy — and, more
          usefully, whether it is about to become unhealthy before anyone notices from user-facing symptoms.
        </Para>
        <Table
          headers={['Metric', 'What it tells you', 'What to alert on']}
          rows={[
            ['records-lag / records-lag-max (per partition)', 'How far a consumer is behind the log-end-offset, per Part 08', 'Sustained positive slope over a meaningful window, not a single spike'],
            ['rebalance rate / time-since-last-rebalance', 'How often the group is reorganizing, per Parts 03-04', 'Frequent rebalances outside expected deploy windows — a sign of flapping consumers or a bad assignor choice'],
            ['commit-latency / commit failure rate', 'Whether offset commits to the coordinator are healthy, per Part 06', 'Rising commitSync latency or a nonzero commitAsync failure rate that goes unhandled'],
            ['poll interval vs max.poll.interval.ms headroom', 'Whether processing is approaching the eviction threshold, per Part 02', 'Batches regularly taking more than half of max.poll.interval.ms'],
            ['number of active members vs expected replica count', 'Whether the group actually has as many live workers as the deployment expects', 'Fewer active members than deployed instances for more than a brief window'],
          ]}
        />
        <Para>
          A healthy consumer group, viewed on a dashboard, looks almost boring: per-partition lag hovering
          near zero with brief, self-correcting spikes during load bursts; rebalances only around expected
          deploy windows and quickly settling; commit latency flat and low. The interesting failures in
          production are rarely a total outage — they are one of these signals quietly drifting in the wrong
          direction for hours before anyone notices, which is exactly why they are worth alerting on directly
          rather than waiting for a downstream symptom like a customer-facing delay.
        </Para>
        <CodeBox label="a minimal but effective consumer-group alerting set">
{`# Per-partition lag, not aggregate — catches hot-key skew (Part 08)
alert: max(kafka_consumer_lag) by (group, topic, partition) > 100000
       AND deriv(kafka_consumer_lag[10m]) > 0

# Rebalance frequency outside deploy windows — catches assignor / static
# membership misconfiguration (Parts 03-04, 08)
alert: increase(kafka_consumer_group_rebalances_total[15m]) > 3
       AND NOT deploy_in_progress

# Active member count below expected replica count — catches consumers
# stuck evicted in a crash loop (Part 02)
alert: kafka_consumer_group_active_members < expected_replica_count
       for: 5m`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Consumer groups and transactional reads" />
        <SectionTitle>isolation.level Decides Whether a Consumer Sees In-Flight Transactions</SectionTitle>
        <Para>
          Everything in this module assumes a consumer reads whatever is physically appended to a partition's
          log. That assumption gets one important qualifier when the producer side is using Kafka
          transactions — the read-process-write pattern where a producer writes to an output topic and
          commits a consumer offset atomically, as one unit. A transactional producer's writes land in the
          log the moment they're sent, before the transaction actually commits or aborts — which means a
          naive consumer reading that log could see data from a transaction that later gets aborted and
          rolled back, or read a record before the rest of its transaction's records have landed.
        </Para>
        <Para>
          The consumer-side control for this is <code>isolation.level</code>. The default,
          <code> read_uncommitted</code>, hands back every record the moment it's in the log, transactional or
          not, committed or not — this is fine for a consumer group whose upstream producers never use
          transactions, but wrong for a consumer of a topic written to by a transactional producer, because it
          can observe records from a transaction that is later aborted and never actually should have existed
          from the application's point of view. <code>read_committed</code> instead buffers and withholds
          records belonging to an open transaction until that transaction's outcome is known, delivering them
          only if the transaction commits, and silently skipping them if it aborts.
        </Para>
        <CodeBox label="read_uncommitted vs read_committed on a topic written by a transactional producer">
{`producer begins a transaction, writes 3 records to orders.enriched,
then the transaction aborts (an exception during processing, e.g.)

isolation.level=read_uncommitted (the default):
  consumer sees all 3 records immediately as they're appended
  -> consumer processes records from a transaction that was later rolled back
  -> the application-level effect of an aborted operation leaks downstream anyway

isolation.level=read_committed:
  consumer's fetch withholds those 3 records while the transaction is open
  transaction aborts -> those 3 records are never delivered to this consumer at all
  -> exactly matches the producer's intent: an aborted transaction produced nothing`}
        </CodeBox>
        <Para>
          This setting is scoped per consumer group, not per producer, which means the decision belongs to
          whoever owns the consuming application: a group reading a topic it knows is written
          transactionally should set <code>read_committed</code> explicitly rather than relying on a default
          that happens to be permissive. Getting this wrong doesn't throw an error or fail loudly — the
          consumer just silently sees records it shouldn't, which is exactly the kind of bug that surfaces
          much later as an unexplained downstream inconsistency rather than as an obvious failure at the
          point where the mistake was actually made.
        </Para>
        <Callout title="Most groups never need to think about this" color="#38bdf8">
          If nothing upstream ever produces transactionally to the topics a group consumes, isolation.level
          has no observable effect either way. It only becomes a real decision the moment a producer somewhere
          in the pipeline starts using begin_transaction / commit_transaction — at that point every downstream
          consumer group of that topic needs to explicitly decide whether it should see uncommitted, in-flight
          writes or not.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Designing a consumer for the failure cases, not just the happy path" />
        <SectionTitle>Putting It Together — A Consumer Loop That Survives Real Production Conditions</SectionTitle>
        <Para>
          Every individual mechanism in this module — commits, rebalances, lag, static membership, isolation
          level — is straightforward on its own. What makes consumer design genuinely hard in practice is that
          production conditions combine several of them at once: a rebalance happens mid-batch, a downstream
          write times out right before a commit, a deploy restarts half the group while the other half is
          still catching up on lag from an earlier spike. A consumer designed only against the happy path
          tends to work perfectly in every demo and staging environment, then surface a subtle correctness
          bug the first time two of these conditions overlap in production.
        </Para>
        <SubTitle>Handling a revoked partition mid-batch</SubTitle>
        <Para>
          A cooperative rebalance (Part 04) can revoke a specific partition out from under a consumer while
          it is in the middle of processing a batch fetched from that partition. Client libraries expose this
          through a rebalance listener — <code>onPartitionsRevoked</code> fires before partitions are taken
          away, giving the application a chance to finish and commit any in-flight work for exactly those
          partitions before ownership actually changes. Ignoring this callback and committing blindly on the
          normal loop schedule risks committing an offset for a partition the consumer no longer owns, which
          the coordinator will reject once the generation id has moved on, per Part 03.
        </Para>
        <CodeBox label="a rebalance listener that commits in-flight work before partitions are revoked">
{`class SafeRebalanceListener(ConsumerRebalanceListener):
    def __init__(self, consumer, pending_offsets):
        self.consumer = consumer
        self.pending_offsets = pending_offsets  # offsets processed but not yet committed

    def on_partitions_revoked(self, revoked_partitions):
        # Commit only the offsets for partitions actually being taken away —
        # finishing in-flight work for THOSE partitions before losing ownership
        to_commit = {
            tp: offset for tp, offset in self.pending_offsets.items()
            if tp in revoked_partitions
        }
        if to_commit:
            self.consumer.commit(offsets=to_commit)

    def on_partitions_assigned(self, assigned_partitions):
        # Newly assigned partitions start from their last committed offset automatically —
        # nothing to do here beyond logging, unless warming local state is needed`}
        </CodeBox>
        <SubTitle>Bounding retries so a stuck downstream write doesn't stall the whole partition</SubTitle>
        <Para>
          A slow or failing downstream dependency — a database under load, a flaky third-party API — inside
          the processing loop has the same effect on a consumer group as a poison message covered for message
          brokers generally: unbounded retries on one record block every record behind it in that partition,
          and eventually trip <code>max.poll.interval.ms</code> from Part 02, causing an eviction and
          rebalance on top of the original problem. Bounding retries with a real limit, and routing records
          that exhaust their retries to a separate topic for later inspection, keeps one bad record from
          taking an entire partition's throughput down with it — the same dead-letter-queue pattern used for
          message brokers generally, applied specifically at the consumer-group layer.
        </Para>
        <SubTitle>Choosing where lag is allowed to hide</SubTitle>
        <Para>
          Finally, a consumer's design should make an explicit choice about where temporary slowness is
          allowed to accumulate. Buffering a large batch in application memory before committing anything
          trades commit overhead for a bigger reprocessing window if the process crashes mid-batch; committing
          very frequently trades some throughput for a much smaller window of potential reprocessing. Neither
          is universally correct — a payments consumer usually wants the smaller, more frequent commits even
          at some throughput cost, while a high-volume analytics consumer usually wants the opposite. The
          point is that this should be a deliberate choice made with Part 06's commit-timing tradeoffs in
          mind, not an accident of whatever batch size a library defaults to.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Consumer Groups and Offsets</SectionTitle>
        {[
          {
            wrong: '"Adding more consumers to a group always increases throughput"',
            right: 'Part 01 is explicit that a partition can only ever be owned by one consumer within a group at a time. Once the number of consumers equals the number of partitions, additional consumers sit idle — they have nothing to be assigned. Throughput scales with partitions, not headcount, past that point.',
          },
          {
            wrong: '"Kafka stores consumer offsets in ZooKeeper"',
            right: 'Part 05 covers this directly: since Kafka 0.9, committed offsets live in the internal, compacted __consumer_offsets topic — an ordinary replicated Kafka topic, not a separate coordination system. This has been true for a long time, but the belief persists from older documentation and tutorials.',
          },
          {
            wrong: '"A rebalance always pauses the whole consumer group for a noticeable amount of time"',
            right: 'Part 04\'s eager-vs-cooperative distinction is the correction: that stop-the-world behavior is specific to eager assignors like RangeAssignor. CooperativeStickyAssignor only pauses the specific partitions actually being reassigned, leaving the rest of the group consuming uninterrupted.',
          },
          {
            wrong: '"auto.offset.reset controls what happens every time a consumer is unsure where to read from"',
            right: 'Part 07 is precise about the scope: this setting is consulted only when there is no committed offset at all for a partition — a brand-new group, or one whose offset expired past retention. Once any offset is committed, the consumer always resumes from it regardless of this setting.',
          },
          {
            wrong: '"Auto-commit is always the wrong choice and manual commit is always safer"',
            right: 'Part 06 frames this as a trade-off, not an absolute: auto-commit\'s risk is silently skipped records on a crash, which is fine for lossy-tolerant workloads like metrics. Manual commit after processing trades that for possible reprocessing, which requires idempotent handling to actually be safer — it is not automatically safe just because it is manual.',
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
            <strong>At Robinhood:</strong> a trade-settlement consumer group is redeployed as part of a
            routine rollout, and dashboards show a brief but sharp dip in settlement throughput during every
            single deploy — reliably, every time, for months. Someone finally traces it to the assignor: the
            group has been running the default eager <code>RangeAssignor</code>, so every pod restart during
            a rolling deploy stops the entire group's consumption while partitions are fully revoked and
            reassigned. Switching to <code>CooperativeStickyAssignor</code> (via the documented two-phase
            rolling upgrade) combined with static <code>group.instance.id</code> per pod turns the same
            deploy into a non-event on the dashboards.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At DoorDash:</strong> a new team wants to build a dispatch-latency analytics service on
            top of the existing <code>order.placed</code> topic, which already has 90 days of retained
            history. They stand up a consumer with a brand-new <code>group.id</code> and, without thinking
            about it, leave <code>auto.offset.reset</code> at its default of <code>latest</code> — so the
            service only ever sees new orders from the moment it started, and the backfill they actually
            wanted never happens. Once someone explains that this setting only fires when there's no
            committed offset yet, they correctly reset it to <code>earliest</code> for the first run, and
            switch it back for any future restart where they don't want to reprocess 90 days again.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>In a system design interview:</strong> "Your consumer group's lag is steadily increasing
            on one partition out of eight, while the rest sit at zero. What do you do?" A weak answer says
            "add more consumers." The strong answer recognizes this is a per-partition skew problem, not a
            general scaling problem — a partition can only be owned by one consumer regardless of pool size —
            and investigates whether a hot key is concentrating volume on that partition, whether that
            consumer instance is doing unusually slow downstream work, and whether the partitioning key
            itself needs to change. That answer is built entirely from Parts 01 and 08.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. Explain exactly what happens, step by step, when a consumer joins an existing group.',
            a: `The new consumer sends a JoinGroup request to the group coordinator — the broker currently leading the relevant partition of __consumer_offsets, as covered in Part 02. The coordinator sees this as a membership change and increments the group's generation id, which invalidates any in-flight requests still carrying the old generation.

Depending on the assignor, either the coordinator computes the new partition assignment directly, or (in the classic protocol) it designates one member as the group leader and that member computes the assignment client-side using the chosen strategy. The new assignment is sent back to all members via a SyncGroup response.

Whether this pauses the rest of the group depends entirely on the assignor, per Part 04: with an eager assignor like RangeAssignor, every member revokes everything first, so the whole group briefly stops consuming. With CooperativeStickyAssignor, only the specific partitions that are actually changing owners are revoked and reassigned — everyone else keeps consuming through the rebalance.`,
          },
          {
            q: 'Q2. Where are Kafka consumer offsets actually stored, and why does that matter operationally?',
            a: `Committed offsets are stored as records in an internal, compacted Kafka topic called __consumer_offsets, not in ZooKeeper — that changed in Kafka 0.9, per Part 05. Each commit is keyed by (group.id, topic, partition) and its value is the committed offset; log compaction keeps only the latest value per key.

Operationally, this matters in a few concrete ways. First, offset commits inherit ordinary Kafka replication and durability — there's no separate consensus system to reason about. Second, because it's a normal topic, you can inspect it directly with a console consumer and the right deserializer for debugging. Third, offsets for a given group.id are colocated on one partition of __consumer_offsets, whose leader broker is that group's coordinator — which is why one broker can become a hotspot if it happens to coordinate several very high-throughput groups at once.`,
          },
          {
            q: 'Q3. What is the difference between eager and cooperative sticky rebalancing, and why would you choose one over the other in production?',
            a: `Eager rebalancing (RangeAssignor, RoundRobinAssignor) works in two strict phases: every member in the group first revokes all of its currently assigned partitions, and only after that global revoke completes does the coordinator compute and hand out the new assignment. The practical effect, covered in Part 04, is that the entire group stops consuming for the length of the rebalance, even for members whose assignment doesn't actually change.

CooperativeStickyAssignor runs incrementally instead: the coordinator computes the new assignment, and each member only revokes the specific partitions it's actually losing, while partitions it keeps stay assigned and keep being fetched throughout. The "sticky" part also biases the algorithm toward preserving existing assignments, minimizing churn in the first place.

In production, cooperative sticky is close to a strict upgrade for any group that experiences routine membership changes — rolling deploys, autoscaling — because it avoids pausing the whole group for a change that only affects a few members. The one caveat is the migration itself needs the documented two-phase rolling upgrade, since eager and cooperative members can't coexist mid-rebalance.`,
          },
          {
            q: 'Q4. A consumer group has been offline for two weeks and is restarted. What happens to its position, and why?',
            a: `It depends entirely on offsets.retention.minutes, which defaults to 7 days. If the group's committed offsets are still within that retention window when it restarts, it resumes exactly where it left off — normal behavior, no special handling needed.

But two weeks exceeds the default 7-day retention, so the committed offsets for that group will have already been deleted from __consumer_offsets by the time it restarts, per Part 05 and Part 07. With no committed offset to resume from, the consumer falls back to whatever auto.offset.reset is configured to — earliest replays the entire retained history from scratch, latest skips straight to new records and permanently loses the two weeks of history it missed, and none throws an exception instead of silently picking either.

The fix, if this is expected to matter, is either raising offsets.retention.minutes to comfortably exceed realistic outage windows, or explicitly deciding and documenting what should happen on an extended outage rather than leaving it to whatever the default reset policy happens to be.`,
          },
          {
            q: 'Q5. Your team wants to move from auto-commit to manual commit for a payments consumer. What exactly changes, and what new responsibility does the team take on?',
            a: `With auto-commit, the client library commits the offset of the most recently returned record on a wall-clock timer (auto.commit.interval.ms), completely independent of whether the application has actually finished processing it. As Part 06 covers, this means a crash between a timer firing and processing actually completing can silently skip records on restart — the consumer resumes past work it never truly did.

Switching to manual commit means the application calls commit() itself, and the team gets to decide precisely when — ideally only after the record's effects are durably written somewhere (a database write, a downstream publish). This moves the failure mode from silent skips to possible reprocessing on a crash between the durable write and the commit call.

The new responsibility that comes with this: processing must become idempotent, because manual commit-after-processing only improves correctness if reprocessing a record is safe — a unique constraint, an upsert, or an explicit dedup check. Manual commit without idempotent processing just trades one class of bug for a different one; it isn't automatically safer on its own.`,
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
            q: 'Scaling a consumer group past the partition count and expecting more throughput',
            a: 'Part 01 covers this directly — a partition is owned by exactly one consumer within a group at a time, so once consumers equal partitions, extras are idle. Throughput scales by increasing partitions (with the repartitioning consequences that involves), not by adding more consumer instances beyond that ceiling.',
          },
          {
            q: 'Leaving the default eager assignor in place for a group that redeploys frequently',
            a: 'Part 04 and the Robinhood story both walk through the consequence: every rolling deploy pauses the entire group\'s consumption during the revoke-then-reassign window, even for members that end up with the exact same assignment. CooperativeStickyAssignor, migrated correctly, avoids this almost entirely.',
          },
          {
            q: 'Treating auto.offset.reset as a general fallback instead of understanding it only fires with no committed offset',
            a: 'Part 07 is explicit: this setting is irrelevant once any offset has been committed for a partition — the consumer always resumes from the committed position. Setting it to latest and expecting it to unstick a misbehaving existing consumer does nothing.',
          },
          {
            q: 'Using manual commit without making processing idempotent',
            a: 'Interview Prep Q5 makes the point precisely: manual commit-after-processing only trades a silent-skip failure mode for a reprocessing failure mode. Without idempotent handling — a unique key, an upsert, a dedup check — reprocessing on a crash can double-apply side effects just as badly as auto-commit can skip them.',
          },
          {
            q: 'Reading only the aggregate lag number for a consumer group instead of per-partition lag',
            a: 'Part 08 warns about this specifically: a healthy-looking total can hide one badly lagging partition caused by a hot key or skewed volume. Always check lag with --describe, per partition, not just the sum.',
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
            error: 'Consumer group throughput drops sharply and repeatedly during every deploy, recovering a few seconds after each pod finishes restarting',
            cause: 'The group is using the default eager assignor (RangeAssignor or RoundRobinAssignor). Per Part 04, every pod restart during a rolling deploy triggers a rebalance that pauses the entire group\'s consumption during the revoke-then-reassign window, not just the restarting pod.',
            fix: 'Migrate the group to CooperativeStickyAssignor using the documented two-phase rolling upgrade (first deploy a config that supports both protocols, let it settle, then deploy cooperative-only). Combine with static group.instance.id per instance so restarts within session.timeout.ms don\'t trigger a rebalance at all.',
          },
          {
            error: 'A newly deployed consumer group instantly reprocesses months of historical data it was never meant to touch',
            cause: 'The group.id is brand-new and has never committed an offset, so per Part 07 there is nothing to resume from, and auto.offset.reset defaulted to earliest — the consumer started from the oldest retained record in the partition rather than from the current tail.',
            fix: 'Decide auto.offset.reset deliberately before the first run of any new group, based on whether it genuinely needs history. Use earliest only when a backfill is actually wanted; use latest for consumers that should only see events going forward from deployment.',
          },
          {
            error: 'FencedInstanceIdException thrown when a consumer tries to join its group',
            cause: 'Two separate running consumer instances were configured with the same group.instance.id — often a copy-paste mistake in a StatefulSet or deployment manifest where the instance id wasn\'t templated per pod. The coordinator treats a group.instance.id as a unique identity per Part 08, and refuses to let a second live process claim an identity already in use.',
            fix: 'Ensure group.instance.id is derived from something guaranteed unique per running instance — the pod name in Kubernetes, for example — never a static string shared across replicas.',
          },
          {
            error: 'A payments consumer\'s offset commit fails silently and the same batch of records is reprocessed on the next poll',
            cause: 'commitAsync() was used without a callback that logs or handles failure, so a rebalance-in-progress error or a network blip during the commit call went unnoticed. Per Part 06, an async commit that fails just means the offset never advanced — the batch will be delivered again on the next poll from the last successfully committed position.',
            fix: 'Always attach a callback to commitAsync() that logs failures, and perform a final commitSync() on graceful shutdown so the last batch\'s offset is guaranteed durable before the process exits. Processing itself must also be idempotent so an occasional reprocess is safe rather than corrupting downstream state.',
          },
          {
            error: 'A consumer is repeatedly evicted from its group and rejoins in a loop, even though the process itself is clearly still running',
            cause: 'Per-batch processing time is exceeding max.poll.interval.ms. The background heartbeat thread keeps reporting the process as alive, but the coordinator specifically tracks whether poll() is being called often enough to represent real forward progress — a stuck or overly slow processing loop still gets evicted, per Part 02.',
            fix: 'Reduce max.poll.records so each batch is smaller and reliably finishes well inside max.poll.interval.ms, or move slow per-record work (an external API call, a large write) off the polling thread. Raising the timeout is a last resort, not a first fix, since it just delays detection of a genuinely stuck consumer.',
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
          'A consumer group hands each partition to exactly one member at a time within the group; different groups reading the same topic are fully independent, each with its own committed position.',
          'The group coordinator (a specific broker) runs the membership protocol via heartbeats, generation ids, and rebalances — triggered by a member joining, leaving, timing out, or a subscription changing.',
          'Eager assignors pause the entire group during a rebalance; CooperativeStickyAssignor only revokes and reassigns the specific partitions that actually change owners, and should be the default for production groups.',
          'Committed offsets are ordinary, compacted Kafka records in the internal __consumer_offsets topic — not ZooKeeper — and inherit normal Kafka replication and durability.',
          'auto.offset.reset only applies when there is no committed offset to resume from; once a group has committed anything for a partition, it always resumes from that position regardless of this setting.',
          'Manual commit-after-processing trades silent skips for possible reprocessing, which is only actually safer if processing is idempotent; consumer lag should always be checked per partition, and static group.instance.id avoids unnecessary rebalances on routine restarts.',
        ]}
      />
    </LearnLayout>
  )
}
