// app/learn/data-engineering/message-brokers-queues/page.tsx

import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Message Brokers and Queues — How They Work Internally | Chaduvuko',
  description:
    'How messages flow from producer to consumer. Queues vs topics, durability, replication, compaction, backpressure, dead letter queues, ordering guarantees, and exactly-once semantics — the internal mechanics without tool noise.',
}

/* ── Local components (Module 37 style) ─────────────────────────────────── */

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.14em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: 'var(--font-mono)', marginBottom: 10,
  }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
    letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18,
    fontFamily: 'var(--font-display)', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700,
    letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12,
    fontFamily: 'var(--font-display)',
  }}>{children}</h3>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 24 }}>
    {label && (
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--muted)',
        letterSpacing: '.1em', textTransform: 'uppercase',
        marginBottom: 6, fontFamily: 'var(--font-mono)',
      }}>{label}</div>
    )}
    <pre style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '18px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.9, color: 'var(--text)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
)

const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '24px 28px', marginBottom: 24,
  }}>
    {children}
  </div>
)

type ColHeader = { label: string; color?: string }
const Table = ({ headers, rows }: { headers: (string | ColHeader)[]; rows: Record<string, string>[] }) => {
  const hdrs: ColHeader[] = headers.map(h => typeof h === 'string' ? { label: h } : h)
  return (
    <div style={{ overflowX: 'auto', marginBottom: 28 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
        <thead>
          <tr>
            {hdrs.map((h, i) => (
              <th key={i} style={{
                padding: '10px 16px', textAlign: 'left',
                fontSize: 11, fontWeight: 700,
                letterSpacing: i === 0 ? '.12em' : '.06em',
                textTransform: 'uppercase', color: h.color ?? 'var(--muted)',
                fontFamily: 'var(--font-mono)',
                borderBottom: h.color ? `2px solid ${h.color}` : '1px solid var(--border)',
                background: h.color ? `${h.color}08` : 'var(--bg2)',
                minWidth: i === 0 ? 150 : 160,
              }}>{h.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
              {hdrs.map((h, ki) => (
                <td key={ki} style={{
                  padding: '10px 16px',
                  color: ki === 0 ? 'var(--muted)' : 'var(--text)',
                  fontSize: ki === 0 ? 11 : 13.5,
                  fontFamily: ki === 0 ? 'var(--font-mono)' : 'inherit',
                  fontWeight: ki === 0 ? 700 : 400,
                  textTransform: ki === 0 ? 'uppercase' : 'none',
                  letterSpacing: ki === 0 ? '.06em' : 'normal',
                  borderBottom: '1px solid var(--border)',
                  borderLeft: ki > 0 && h.color ? `2px solid ${h.color}40` : ki > 0 ? '1px solid var(--border)' : 'none',
                  verticalAlign: 'top', lineHeight: 1.65,
                }}>{row[String(ki)]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function MessageBrokersQueuesModule() {
  return (
    <LearnLayout
      title="Message Brokers and Queues — How They Work Internally"
      description="How messages flow from producer to consumer. Queues vs topics, durability, replication, compaction, backpressure, dead letter queues, ordering guarantees, and exactly-once semantics — the internal mechanics without tool noise."
      section="Data Engineering · Phase 6"
      readTime="50 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — What a Message Broker Actually Is ──────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Problem a Broker Solves" />
        <SectionTitle>What a Message Broker Actually Is — and Why It Has to Exist</SectionTitle>

        <Para>
          Before message brokers, distributed systems communicated directly.
          Service A opened a network connection to Service B and sent data.
          This worked fine until it didn't — which was constantly. If B was
          down, A's data was lost. If B was slow, A was blocked. If B needed
          to be replaced, A needed to be reconfigured. If a third service C
          also needed the same data, A had to open another connection to C
          and send everything twice. As systems grew from 3 services to 300,
          this became unmaintainable.
        </Para>

        <Para>
          A message broker is an intermediary that decouples producers from
          consumers in time, space, and implementation. The producer sends
          data to the broker and immediately continues. The broker stores it
          durably. The consumer reads from the broker whenever it is ready.
          The producer and consumer never talk to each other directly. Neither
          knows the other's address. Neither knows when the other is running.
        </Para>

        <HighlightBox>
          <Para>
            <strong>The three guarantees a broker makes that direct connections cannot:</strong>
          </Para>
          <Para>
            <strong>Temporal decoupling —</strong> the consumer does not need
            to be running when the producer sends. A Razorpay payment event
            written at 3 AM is still there for the analytics consumer that
            starts processing at 6 AM. The broker held it safely in between.
          </Para>
          <Para>
            <strong>Spatial decoupling —</strong> the producer does not know
            the consumer's address. It knows only the broker's address and the
            topic or queue name. New consumers can be added with zero changes
            to the producer.
          </Para>
          <Para>
            <strong>Rate decoupling —</strong> the producer and consumer can
            run at completely different speeds. The broker absorbs the
            difference. If Swiggy's order service produces 50,000 events per
            second during the dinner rush but the fraud detection consumer
            can only process 10,000 per second, the broker buffers 40,000
            events per second of lag without the producer slowing down or
            losing data.
          </Para>
        </HighlightBox>

        <Para>
          The broker is not a passive pipe. It is an active storage and
          routing system with its own durability guarantees, replication
          strategy, indexing structure, and failure modes. Understanding
          those internals is what this module is about.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 — Queues vs Topics ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Queues vs Topics" />
        <SectionTitle>Queues vs Topics — Two Fundamentally Different Data Structures</SectionTitle>

        <Para>
          The most important conceptual distinction in messaging is between a
          queue and a topic. They look similar from the outside — both accept
          messages from producers and deliver them to consumers. Internally
          they have completely different semantics, and using the wrong one
          for a use case produces subtle bugs that are hard to diagnose.
        </Para>

        <SubTitle>Queues — competing consumers, destructive reads</SubTitle>

        <Para>
          A queue is a first-in, first-out data structure. Messages enter at
          the tail and leave from the head. When a consumer reads a message
          from a queue, that message is removed from the queue — it is gone.
          No other consumer can read it. This is called a destructive read.
        </Para>

        <Para>
          If multiple consumers are connected to the same queue, they compete
          for messages. Message 1 goes to consumer A. Message 2 goes to
          consumer B. Message 3 goes to consumer A again. Each message is
          delivered to exactly one consumer. This is the competing consumers
          pattern — it is how you scale out work processing. You have 10,000
          emails to send; you put them in a queue and run 20 worker processes
          that each pull messages and send emails. The work is distributed
          automatically.
        </Para>

        <CodeBox label="queue — competing consumers, each message delivered once">
{`# Queue behaviour:
# Producer sends 5 messages: M1 M2 M3 M4 M5
# Two consumers A and B both connected to the queue

# Queue state after all messages arrive:
# [M1] [M2] [M3] [M4] [M5]

# Consumer A pulls M1 → queue state: [M2] [M3] [M4] [M5]   (M1 is gone)
# Consumer B pulls M2 → queue state: [M3] [M4] [M5]         (M2 is gone)
# Consumer A pulls M3 → queue state: [M4] [M5]
# Consumer B pulls M4 → queue state: [M5]
# Consumer A pulls M5 → queue state: []

# Result: M1 M3 M5 processed by A | M2 M4 processed by B
# No message was delivered twice. No message was skipped.
# Neither consumer can go back and re-read M1. It is gone.

# Real use case: Flipkart order fulfilment
# 10,000 orders sitting in a queue
# 50 fulfilment worker threads all pulling from the same queue
# Each order is processed by exactly one worker — no double fulfilment`}
        </CodeBox>

        <SubTitle>Topics — multiple independent subscribers, non-destructive reads</SubTitle>

        <Para>
          A topic is a durable, ordered log. Messages are appended to the log
          and stay there. Multiple consumers can read from the same topic
          independently, each at their own pace, each maintaining their own
          position. Reading a message does not remove it. Every consumer sees
          every message.
        </Para>

        <Para>
          This is the publish-subscribe (pub-sub) pattern. Meesho's order
          service publishes an <code>order.placed</code> event to the
          <code>orders</code> topic. The notification service subscribes and
          sends a confirmation SMS. The inventory service subscribes and
          deducts stock. The analytics service subscribes and updates
          dashboards. All three get the same event. None of them affects
          the others' ability to read it.
        </Para>

        <CodeBox label="topic — multiple independent subscribers, each sees every message">
{`# Topic behaviour:
# Producer sends 3 messages: M1 M2 M3
# Three subscribers: notification-service, inventory-service, analytics-service

# Topic log (append-only, nothing is removed):
# offset 0: M1
# offset 1: M2
# offset 2: M3

# notification-service committed offset: 3 (has read all three)
# inventory-service committed offset:    2 (has read M1 and M2, M3 is pending)
# analytics-service committed offset:    0 (has read nothing yet, is behind)

# Neither inventory-service nor analytics-service being slow affects anyone else
# notification-service cannot "take" messages away from the others
# analytics-service can reset to offset 0 and replay all history

# If a 4th service joins now, it can also start from offset 0
# and read M1 M2 M3 — even though they were written days ago
# The topic held them. The producer wrote them once. Everyone gets them.`}
        </CodeBox>

        <Table
          headers={['', 'Queue', { label: 'Topic', color: '#00e676' }]}
          rows={[
            { '0': 'Read semantics', '1': 'Destructive — message removed after delivery', '2': 'Non-destructive — message stays after reading' },
            { '0': 'Fan-out', '1': 'No — each message delivered to one consumer', '2': 'Yes — each subscriber gets every message' },
            { '0': 'Replay', '1': 'Not possible — message is gone after delivery', '2': 'Yes — reset offset to any point in retained history' },
            { '0': 'Consumer competition', '1': 'Consumers compete for messages — parallelism by default', '2': 'Consumer groups compete within a group; groups are independent' },
            { '0': 'State', '1': 'Queue empties as messages are consumed', '2': 'Log grows until retention period expires' },
            { '0': 'Ordering', '1': 'FIFO within the queue; across competing consumers, no global order', '2': 'Strict order within a partition' },
            { '0': 'Use for', '1': 'Task distribution — email jobs, resize jobs, payment processing workers', '2': 'Event broadcasting — notify many systems of the same event' },
            { '0': 'Indian example', '1': 'Nykaa image resize queue — 1 image, 1 worker, processed once', '2': 'Swiggy order topic — 1 event, consumed by 8 different services' },
          ]}
        />

        <Callout type="tip">
          Most modern brokers (Kafka, AWS Kinesis, Azure Event Hubs, Google
          Pub/Sub) are topic-based. Traditional queue systems include
          RabbitMQ, AWS SQS, and Azure Service Bus. The reason topic-based
          systems dominate in data engineering is replay — you cannot rebuild
          a downstream system from scratch using a queue, because the data
          is gone. With a topic, you reset the offset and replay.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 — How a Broker Stores Data ──────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Internal Storage" />
        <SectionTitle>How a Broker Stores Data — The Commit Log, Segments, and Indexes</SectionTitle>

        <Para>
          A message broker is, at its core, a specialised database optimised
          for sequential writes and sequential reads. Understanding its storage
          model explains why brokers can handle millions of events per second
          on commodity hardware, why random access is slow, and why retention
          and compaction work the way they do.
        </Para>

        <SubTitle>The commit log</SubTitle>

        <Para>
          Each partition is stored as a commit log — an append-only sequence
          of bytes on disk. Writes always go to the end of the log. There are
          no inserts in the middle, no updates in place, and no deletions of
          individual records. This makes writes extremely fast — sequential
          disk writes (and page cache writes) are as fast as disk hardware
          allows. Random writes (inserting in the middle of a file) are
          orders of magnitude slower because the disk head must seek.
          Sequential writes avoid seeking entirely.
        </Para>

        <Para>
          The same is true for reads. Consumers read the log sequentially
          from their committed offset forward. The operating system's page
          cache (a region of RAM that mirrors recently accessed disk pages)
          absorbs most reads — if the consumer is near the head of the log,
          its reads almost certainly hit the page cache rather than physical
          disk. This is why a broker can serve many consumers from the same
          data with minimal disk I/O — they all read the same pages from RAM.
        </Para>

        <SubTitle>Segments — how the log is physically split on disk</SubTitle>

        <Para>
          A partition's log is not one giant file. It is split into segments —
          fixed-size files (typically 1 GB) plus a corresponding index file.
          When a segment reaches its size limit, a new segment is created.
          The currently-being-written segment is called the active segment.
          All older segments are immutable.
        </Para>

        <CodeBox label="partition on disk — physical file structure">
{`# On the broker's filesystem, one partition looks like this:
/data/kafka/freshmart.orders-3/          ← partition 3 of freshmart.orders topic
    00000000000000000000.log             ← segment starting at offset 0
    00000000000000000000.index           ← sparse offset → byte-position index
    00000000000000000000.timeindex       ← timestamp → offset index
    00000000000000985432.log             ← segment starting at offset 985432
    00000000000000985432.index
    00000000000000985432.timeindex
    00000000000001847291.log             ← active segment (currently being written)
    00000000000001847291.index
    00000000000001847291.timeindex

# The .log file: raw bytes of sequentially appended messages
# The .index file: sparse index mapping offset → byte position in the .log file
#   (not every offset is indexed — every Nth offset, configurable)
#   When a consumer requests offset 985500, the broker:
#   1. Binary searches the .index file for the largest indexed offset ≤ 985500
#   2. Seeks to that byte position in the .log file
#   3. Scans forward to offset 985500
#   This is O(log N) for the index lookup + O(small scan) — very fast

# The .timeindex file: maps timestamps to offsets
#   Used when a consumer says "start from 3 hours ago" instead of a specific offset
#   Broker translates the timestamp to an offset using this index`}
        </CodeBox>

        <SubTitle>Retention — when does data get deleted?</SubTitle>

        <Para>
          Data in a topic is not kept forever by default. Retention policy
          determines when segments are eligible for deletion. There are two
          modes: time-based retention and size-based retention. Most
          production topics use time-based retention (7 days is the Kafka
          default, but many teams set 30 days or longer for important topics).
        </Para>

        <Para>
          Retention operates at the segment level, not the message level.
          A segment becomes eligible for deletion when the timestamp of its
          newest message is older than the retention period. The broker's
          log cleaner thread periodically scans segments and deletes those
          past the retention boundary. This is why you can't delete an
          individual message from a topic — you can only wait for its
          entire segment to age out.
        </Para>

        <Callout type="warning">
          Retention is your first line of defence against disk filling up.
          A topic receiving 100 MB/second with 7-day retention needs
          100 MB × 86,400 seconds × 7 days = ~58 TB of disk space,
          multiplied by the replication factor. Size up broker disks
          based on retention period and throughput, not instinct.
          Running out of disk on a broker causes it to stop accepting
          writes — all your producers start seeing errors simultaneously.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 — Durability and Replication ─────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Durability" />
        <SectionTitle>Durability — How Replication Prevents Data Loss</SectionTitle>

        <Para>
          A message sitting on one machine is one disk failure away from being
          lost forever. Durability means a message, once acknowledged to the
          producer, will survive any single machine failure. Replication is
          how brokers achieve this.
        </Para>

        <SubTitle>Leaders and followers</SubTitle>

        <Para>
          Each partition has one leader replica and zero or more follower
          replicas, each on a different broker machine. All reads and writes
          go through the leader. Followers continuously replicate the leader's
          log — they fetch new messages as fast as the network allows and
          append them to their own local copy of the partition.
        </Para>

        <Para>
          A follower that is keeping up with the leader — specifically, that
          has fetched messages within a configured time window — is called an
          In-Sync Replica (ISR). The ISR list is the broker's real-time
          record of which replicas are currently up to date. This list is
          critical to understanding durability.
        </Para>

        <CodeBox label="replication — leader, followers, and the ISR">
{`# freshmart.orders partition 0 — replicated across 3 brokers (replication factor = 3)

# Broker 1 (leader for partition 0):
#   log: [offset 0] [offset 1] ... [offset 10,000]   ← latest
#   ISR: [broker-1, broker-2, broker-3]               ← all three are in sync

# Broker 2 (follower):
#   log: [offset 0] [offset 1] ... [offset 9,998]     ← 2 messages behind leader
#   (currently fetching, will catch up in milliseconds)

# Broker 3 (follower):
#   log: [offset 0] [offset 1] ... [offset 10,000]    ← fully in sync

# Producer writes offset 10,001 to broker-1 (leader)
# With acks=all: producer waits until broker-1, broker-2, AND broker-3 all confirm
# → offset 10,001 is now on 3 machines
# → broker-1 crashes → broker-2 or broker-3 becomes new leader
# → offset 10,001 is NOT lost

# With acks=1: producer only waits for broker-1 to confirm
# → broker-1 crashes BEFORE broker-2 and broker-3 replicate offset 10,001
# → offset 10,001 is LOST — producer thinks it was written, broker says it wasn't
# → this is called unclean leader election + data loss

# The ISR list contract:
# acks=all means "wait until all replicas in the current ISR confirm"
# If broker-3 goes offline (removed from ISR), acks=all only waits for broker-1 + broker-2
# min.insync.replicas setting: refuse writes if ISR size drops below this number
# Recommended: replication.factor=3, min.insync.replicas=2
# → tolerates 1 broker failure without data loss
# → refuses writes if 2 brokers are down (rather than silently risking data loss)`}
        </CodeBox>

        <SubTitle>Durability vs availability — the trade-off</SubTitle>

        <Para>
          <code>min.insync.replicas=2</code> with <code>replication.factor=3</code>
          means the topic is unavailable for writes if 2 out of 3 brokers are
          down. This is the right trade-off for financial data — you prefer
          rejecting writes to silently losing them. For metrics and logs where
          some data loss is acceptable, <code>min.insync.replicas=1</code>
          keeps the topic writable even when only 1 broker is alive.
        </Para>

        <Table
          headers={[
            'Configuration',
            { label: 'Durability', color: '#00e676' },
            { label: 'Risk', color: '#ff4757' },
            'Use for',
          ]}
          rows={[
            {
              '0': 'RF=3, min.isr=2, acks=all',
              '1': 'Strong — survives any single broker failure',
              '2': 'Unavailable if 2 brokers fail simultaneously',
              '3': 'Orders, payments, transactions — anything where data loss is unacceptable',
            },
            {
              '0': 'RF=3, min.isr=1, acks=1',
              '1': 'Partial — survives failures after replication',
              '2': 'Data loss possible if leader crashes before followers replicate',
              '3': 'User activity events, recommendation signals — tolerable loss',
            },
            {
              '0': 'RF=1, acks=0',
              '1': 'None — single point of failure, fire and forget',
              '2': 'Data loss on any broker restart',
              '3': 'Application logs, debug traces — no business consequence if lost',
            },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 05 — Log Compaction ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Log Compaction" />
        <SectionTitle>Log Compaction — Keeping the Latest Value Forever</SectionTitle>

        <Para>
          Retention deletes old segments entirely. But sometimes you need the
          latest version of each key to be retained indefinitely, regardless
          of how old it is. A customer's current address, a product's current
          price, a user's current account status — these change over time but
          the latest value must always be available. Time-based retention would
          eventually delete even the most recent value.
        </Para>

        <Para>
          Log compaction solves this. A compacted topic retains at least the
          most recent message for every key, forever. The log cleaner
          periodically scans old segments and removes duplicate keys —
          keeping only the message with the highest offset for each key and
          discarding all earlier versions.
        </Para>

        <CodeBox label="log compaction — before and after">
{`# freshmart.products — compacted topic
# Tracks current product price. Key = product_id. Value = current price.

# Log BEFORE compaction (chronological, by offset):
# offset 0:  key=P1001  value={"name":"Toor Dal 1kg",  "price_paise": 18900}
# offset 1:  key=P1002  value={"name":"Basmati 5kg",   "price_paise": 67500}
# offset 2:  key=P1001  value={"name":"Toor Dal 1kg",  "price_paise": 19500}  ← price updated
# offset 3:  key=P1003  value={"name":"Sunflower Oil", "price_paise": 23400}
# offset 4:  key=P1002  value={"name":"Basmati 5kg",   "price_paise": 69000}  ← price updated
# offset 5:  key=P1001  value={"name":"Toor Dal 1kg",  "price_paise": 21000}  ← price updated again

# Log AFTER compaction:
# offset 3:  key=P1003  value={"name":"Sunflower Oil", "price_paise": 23400}   ← only version
# offset 4:  key=P1002  value={"name":"Basmati 5kg",   "price_paise": 69000}   ← latest
# offset 5:  key=P1001  value={"name":"Toor Dal 1kg",  "price_paise": 21000}   ← latest

# offsets 0, 1, 2 were deleted because P1001 and P1002 have newer versions

# What a new consumer reading from offset 0 sees:
# → starts from the earliest surviving offset (3)
# → sees the latest value for every key that has ever existed
# → has a complete and current view of all products — a "changelog"

# Tombstones — how to "delete" a key from a compacted topic:
# Produce a message with key=P1001 and value=null
# This is a tombstone. Compaction will eventually remove it.
# After the tombstone is compacted away, P1001 is gone from the log.`}
        </CodeBox>

        <Para>
          Compacted topics are the foundation of a pattern called the changelog
          table — a topic that represents the current state of a database table.
          Every time a row changes, a new event is produced with the row's
          primary key as the partition key and the new row state as the value.
          New consumers can read the compacted topic from the beginning and
          reconstruct the full table in memory — a complete read-through cache
          that rebuilds itself on restart.
        </Para>

        <Callout type="info">
          Kafka Streams and ksqlDB use compacted changelog topics heavily for
          state stores — the materialised state of a streaming aggregation is
          stored in a compacted topic so it can be rebuilt after a failure
          without re-processing the entire event history.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 — Ordering Deep Dive ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Ordering Guarantees" />
        <SectionTitle>Ordering Guarantees — What the Broker Actually Promises</SectionTitle>

        <Para>
          Module 40 covered ordering at the conceptual level. Here we go deeper
          into the specific ordering guarantees and the ways ordering can break
          in real production systems even when you think it is guaranteed.
        </Para>

        <SubTitle>The promise: per-partition, per-key ordering</SubTitle>

        <Para>
          The broker's ordering guarantee is: messages written to the same
          partition are delivered in the order they were written. This is
          absolute. If message A reaches the leader before message B and
          both go to partition 3, consumers of partition 3 will always see A
          before B. This is backed by the sequential nature of the commit log —
          there is no mechanism by which a later write can appear before an
          earlier one in the same log.
        </Para>

        <SubTitle>How ordering breaks even when partitions are correct</SubTitle>

        <Para>
          There are three ways production systems experience ordering violations
          that engineers blame on the broker — but the cause is almost always
          in the producer or the consumer logic.
        </Para>

        <CodeBox label="ordering — three ways it breaks in production">
{`# ── Break 1: Producer retries with multiple in-flight requests ──────────────

# Producer config: max.in.flight.requests.per.connection = 5 (default)
# Producer sends batch B1 to the leader. Network hiccup — no acknowledgement.
# Producer sends batch B2 while waiting for B1's ack.
# B2 arrives and is written successfully (offset 100).
# B1 is retried and also arrives successfully (offset 101).
# Now B2 (later batch) has a lower offset than B1 (earlier batch).
# Consumers see B2 before B1. Ordering violated.

# Fix: set max.in.flight.requests.per.connection=1 (serialises requests)
# Better fix: enable.idempotence=true (Kafka handles deduplication + ordering)
# enable.idempotence=true forces max.in.flight=5 to be safe using sequence numbers

# ── Break 2: Consumer reading multiple partitions, merging by arrival order ──

# Topic freshmart.orders has 4 partitions.
# Consumer reads from all 4 and processes events in the order they arrive.
# Partition 0: order at 14:23:11 — arrives at consumer at 14:23:12
# Partition 2: order at 14:23:09 — arrives at consumer at 14:23:13 (1 sec delay)
# Consumer sees the 14:23:11 order BEFORE the 14:23:09 order.
# In processing time order, everything was fine.
# In event time order (which matters for business logic), it was wrong.

# Fix: do not assume cross-partition arrival order reflects event time order.
# If business logic requires event time ordering across partitions,
# buffer events and sort by event_time before processing — at the cost of latency.

# ── Break 3: Leader failover during write ────────────────────────────────────

# Producer sends message M to partition leader (broker-1).
# broker-1 writes M to its local log but crashes before replicating to followers.
# (This only happens with acks=1 or acks=0 — with acks=all, this cannot happen)
# broker-2 is elected new leader. Its log does not contain M.
# Producer retries M to broker-2 (new leader). M is written at a new, higher offset.
# If there were messages after M that DID replicate before the crash,
# M now appears AFTER those messages. Ordering is violated for any consumer
# that already read those messages.

# Fix: acks=all + min.insync.replicas=2. Non-negotiable for ordered data.`}
        </CodeBox>

        <SubTitle>Strict global ordering — when you truly need it</SubTitle>

        <Para>
          If your use case genuinely requires strict ordering across all events
          in a topic (not just per key), the only correct solution is a single
          partition. One partition means one sequential log, one writer at a
          time, guaranteed global order. The cost: no horizontal scaling.
          One partition can handle roughly 100 MB/second on modern hardware.
          Beyond that, you need to rethink whether global ordering is actually
          required or whether per-key ordering would suffice.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 — Backpressure ───────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Backpressure" />
        <SectionTitle>Backpressure — What Happens When Consumers Can't Keep Up</SectionTitle>

        <Para>
          Backpressure is the condition where data is being produced faster
          than it is being consumed. In a direct connection, this would either
          cause the producer to block (waiting for the consumer to drain its
          buffer) or cause data to be dropped. The broker decouples this by
          absorbing the difference — but the broker has finite disk space,
          and the consumer has finite time to catch up before the data ages
          out of retention.
        </Para>

        <Para>
          Consumer lag is the operational signal for backpressure. A lag of
          zero means the consumer is keeping up. A lag that is growing — even
          slowly — means the consumer is consistently behind the producer and
          will eventually fall significantly behind. A lag that is growing
          faster than the consumer can process is a production emergency.
        </Para>

        <CodeBox label="backpressure — the lag growth calculation">
{`# Producer rate:  50,000 events/second
# Consumer rate:  45,000 events/second
# Net lag growth: 5,000 events/second

# After 1 hour:  5,000 × 3,600 = 18,000,000 events of lag
# After 1 day:   5,000 × 86,400 = 432,000,000 events of lag

# If retention is 7 days and average event size is 500 bytes:
# Total data in retention: 50,000 × 86,400 × 7 × 500 = ~15 TB

# With 432M events of lag and consumer rate of 45k/sec:
# Time to catch up (if producer stops): 432M / 45k = ~2.7 hours
# But the producer doesn't stop — the consumer can NEVER catch up
# without either increasing consumer throughput or decreasing producer rate.

# Lag metric to alert on:
# ALERT if lag > 100,000 AND lag is growing (slope > 0 over last 5 minutes)
# This catches the "slow leak" before it becomes a crisis

# Solutions to backpressure (in order of preference):
# 1. Scale out consumer group — add more consumers (up to partition count)
# 2. Optimise consumer processing — reduce per-event processing time
# 3. Increase partition count — allows more consumer parallelism (requires repartitioning)
# 4. Throttle the producer at the source (last resort — affects upstream systems)`}
        </CodeBox>

        <Para>
          The broker does not apply backpressure to the producer automatically
          — it keeps accepting messages until it runs out of disk. This is
          correct behaviour for temporal decoupling, but it means you must
          monitor consumer lag and act before lag growth exhausts your
          retention window. If your consumer falls behind by more than
          your retention period's worth of data, the oldest events in the lag
          start aging out of retention — you permanently lose the ability to
          process them.
        </Para>

        <Callout type="warning">
          Lag exceeding the retention window causes permanent data loss for
          the lagging consumer — not just delay. If your retention is 7 days
          and your consumer is 8 days behind, the oldest day's events are
          already deleted. Monitor lag relative to your retention period, not
          just in absolute event count.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 — Dead Letter Queues ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Dead Letter Queues" />
        <SectionTitle>Dead Letter Queues — Handling Poison Messages Without Stopping the World</SectionTitle>

        <Para>
          A poison message is an event that causes the consumer to throw an
          exception every time it tries to process it. Maybe the schema is
          malformed. Maybe the payload contains a value the consumer's code
          cannot handle. Maybe a downstream system the consumer calls is
          rejecting this specific record. The consumer retries, fails,
          retries, fails — and because it cannot advance past this offset,
          all processing stops. Every event after the poison message is blocked.
        </Para>

        <Para>
          A dead letter queue (DLQ) is the escape valve. When a message fails
          processing after N retries, the consumer writes it to a separate
          DLQ topic and commits the offset, allowing processing of subsequent
          messages to continue. The DLQ is monitored separately — engineers
          can inspect the failed messages, understand why they failed, fix
          the issue, and optionally replay them.
        </Para>

        <CodeBox label="dead letter queue — implementation pattern">
{`import json
import logging
from typing import Callable

logger = logging.getLogger(__name__)

MAX_RETRIES = 3

def process_with_dlq(
    event: dict,
    process_fn: Callable,
    dlq_producer,
    dlq_topic: str,
):
    """
    Attempt to process an event. On repeated failure, route to DLQ.
    Caller must commit offset AFTER this function returns — whether success or DLQ.
    """
    last_exception = None

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            process_fn(event)
            return  # Success — caller will commit offset
        except Exception as exc:
            last_exception = exc
            logger.warning(
                f"Processing failed (attempt {attempt}/{MAX_RETRIES}): "
                f"event_id={event.get('event_id')} error={exc}"
            )

    # All retries exhausted — send to DLQ
    dlq_event = {
        "original_event":   event,
        "failed_at":        "2026-03-20T14:23:11Z",  # use datetime.utcnow().isoformat()
        "error_message":    str(last_exception),
        "error_type":       type(last_exception).__name__,
        "retry_count":      MAX_RETRIES,
        "source_topic":     "freshmart.orders",
        "source_partition": event.get("_partition"),
        "source_offset":    event.get("_offset"),
    }

    dlq_producer.produce(
        topic=dlq_topic,
        key=event.get("partition_key"),
        value=json.dumps(dlq_event).encode(),
    )
    dlq_producer.flush()

    logger.error(
        f"Event sent to DLQ: event_id={event.get('event_id')} "
        f"dlq_topic={dlq_topic}"
    )
    # Return normally — caller commits offset, processing continues

# DLQ topic naming convention:
# source_topic + ".dlq"
# freshmart.orders → freshmart.orders.dlq
# freshmart.payments → freshmart.payments.dlq

# DLQ monitoring:
# Alert: DLQ message count > 0 (any failure needs attention)
# Dashboard: DLQ message rate (failures per minute)
# Runbook: how to inspect, fix, and replay DLQ messages`}
        </CodeBox>

        <SubTitle>Replaying from the DLQ</SubTitle>

        <Para>
          A DLQ is not a permanent graveyard. Once the root cause of failure
          is fixed — a schema change deployed, a downstream service patched,
          a bug in the consumer fixed — messages in the DLQ can be replayed.
          You write a small replay script that reads from the DLQ topic and
          produces each message back to the original source topic. The fixed
          consumer then processes them successfully.
        </Para>

        <Callout type="tip">
          In the DLQ event, always store the source topic, partition, and
          offset of the original message. This lets you look up the original
          event in the source topic log for debugging — the DLQ message is the
          investigation starting point, the source topic contains the full
          context around that offset.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 — Exactly-Once Internals ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Exactly-Once Internals" />
        <SectionTitle>Exactly-Once Internals — Idempotent Producers and Transactional APIs</SectionTitle>

        <Para>
          Module 40 explained exactly-once semantics conceptually. Here is
          the mechanism — specifically how Kafka implements idempotent producers
          and transactions, because understanding the mechanism tells you
          exactly where it works and where it breaks down.
        </Para>

        <SubTitle>Idempotent producer — sequence numbers and deduplication</SubTitle>

        <Para>
          When <code>enable.idempotence=true</code>, the broker assigns each
          producer a Producer ID (PID). The producer attaches a monotonically
          increasing sequence number to every message it sends, scoped to each
          partition. The broker tracks the last successfully written sequence
          number per (PID, partition) pair. If the broker receives a message
          with a sequence number it has already seen, it discards it silently
          and returns a success acknowledgement. The producer never knows the
          duplicate was discarded — it just sees a successful write.
        </Para>

        <CodeBox label="idempotent producer — what sequence numbers prevent">
{`# Without idempotent producer (enable.idempotence=false):

# Producer sends batch [M1, M2, M3] with sequence numbers [101, 102, 103]
# Network delivers batch. Broker writes M1 M2 M3. Sends ack.
# Network drops the ack. Producer never receives it.
# Producer retries: sends [M1, M2, M3] again.
# Broker writes M1 M2 M3 AGAIN at new offsets.
# Partition now has: M1 M2 M3 M1 M2 M3 — DUPLICATES

# With idempotent producer (enable.idempotence=true):

# Producer sends [M1, M2, M3] with PID=5001, sequence=[101, 102, 103]
# Broker writes them. Sends ack. Network drops ack.
# Producer retries: sends [M1, M2, M3] again, same PID=5001, same sequences
# Broker checks: "PID 5001 already wrote sequence 101 to this partition"
# Broker discards M1 M2 M3 silently. Sends success ack.
# Partition has: M1 M2 M3 — exactly once, no duplicates

# The broker maintains a per-(PID, partition) window of 5 sequence numbers
# Sequences outside this window (too old) are rejected — not deduplicated
# This means idempotent producer only deduplicates retries within one producer session
# Producer restart = new PID = no deduplication for messages from the old session
# → This is why idempotent producer alone is not enough for crash recovery
# → You also need consumer-side idempotency (as covered in Module 40)`}
        </CodeBox>

        <SubTitle>Transactions — atomic writes across partitions and topics</SubTitle>

        <Para>
          An idempotent producer handles one producer instance writing to one
          partition. Transactions handle a more complex case: a consumer reads
          from topic A, does some processing, and writes the result to topic B,
          while committing its offset in topic A — all as a single atomic
          operation. Either all three happen, or none happen.
        </Para>

        <Para>
          This is the basis of Kafka's exactly-once stream processing guarantee.
          The transaction coordinator (a special partition on the broker) manages
          a two-phase commit across all participating partitions. The consumer
          reading from topic B filters out messages from uncommitted transactions —
          this is controlled by the <code>isolation.level</code> configuration.
        </Para>

        <CodeBox label="kafka transaction — atomic read-process-write">
{`# Read from freshmart.orders, transform, write to freshmart.orders.enriched
# All in one transaction — either all succeed or none

from confluent_kafka import Producer, Consumer, KafkaError

# Producer configured with transactional.id
producer = Producer({
    'bootstrap.servers': 'broker:9092',
    'transactional.id': 'order-enrichment-service-1',  # unique per producer instance
    'enable.idempotence': True,  # required for transactions
})
producer.init_transactions()

consumer = Consumer({
    'bootstrap.servers': 'broker:9092',
    'group.id': 'order-enrichment-group',
    'isolation.level': 'read_committed',  # CRITICAL — only read committed messages
    'enable.auto.commit': False,           # CRITICAL — we commit inside the transaction
})
consumer.subscribe(['freshmart.orders'])

while True:
    msg = consumer.poll(timeout=1.0)
    if msg is None or msg.error():
        continue

    try:
        event = json.loads(msg.value())
        enriched = enrich_order(event)  # your transformation logic

        producer.begin_transaction()

        # Write enriched event to output topic
        producer.produce('freshmart.orders.enriched', value=json.dumps(enriched))

        # Commit consumer offset INSIDE the transaction
        # This is what makes it atomic — offset moves only when write succeeds
        offsets = [{
            'topic': msg.topic(),
            'partition': msg.partition(),
            'offset': msg.offset() + 1,
        }]
        producer.send_offsets_to_transaction(offsets, consumer.consumer_group_metadata())

        producer.commit_transaction()
        # ↑ Either both the write AND the offset commit happened, or neither did

    except Exception as e:
        producer.abort_transaction()
        # Consumer offset was NOT committed — event will be reprocessed
        logger.error(f"Transaction aborted: {e}")`}
        </CodeBox>

        <Para>
          The <code>isolation.level=read_committed</code> on the consumer is
          the other half of the guarantee. Without it, the consumer would read
          messages from aborted transactions — seeing partial results from
          failed processing attempts. With <code>read_committed</code>, the
          consumer only sees messages from successfully committed transactions.
          Messages from in-flight or aborted transactions are invisible.
        </Para>
      </section>

      <Divider />

      {/* ── Part 10 — What This Looks Like at Work ───────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — What This Looks Like at Work" />
        <SectionTitle>What This Looks Like on Day One</SectionTitle>

        <HighlightBox>
          <Para>
            <strong>At a fintech (Razorpay / PhonePe):</strong> A production
            incident — the payment reconciliation job is showing duplicate
            transactions in its output. You are asked to investigate. You
            check the producer configuration: <code>enable.idempotence=false</code>
            and <code>retries=3</code>. Every network blip causes duplicate
            messages. The fix is two lines of config change. But before you
            can make that change, you need to understand why idempotence works,
            what sequence numbers the broker tracks, and why it's safe to
            enable without changing application logic. This module is the
            prerequisite for that conversation.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <Para>
            <strong>At an e-commerce company (Nykaa / Myntra):</strong>
            You are asked to design a new notification system. Orders topic
            already exists. Inventory, fraud, loyalty, and analytics services
            all need to react to new orders. The architecture decision is:
            do we use a queue (one service, work distribution) or a topic
            (multiple services, each sees every order)? You immediately know
            the answer — topic-based pub-sub, because four different services
            need the same event and none should "consume" it away from the
            others. You also know to set replication factor 3 with
            min.insync.replicas 2 and acks=all because orders are financial
            data. These are not guesses — they follow directly from
            understanding the concepts.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <Para>
            <strong>In a system design interview:</strong> "How would you
            handle a message that keeps failing in your streaming pipeline?"
            The wrong answer is "add more retries." The right answer covers:
            exponential backoff with a retry limit, routing to a DLQ topic
            after N failures, committing the offset so downstream processing
            continues, alerting on DLQ depth, building a replay mechanism,
            and the operational runbook for investigating and replaying DLQ
            messages. Every one of those points is in this module.
          </Para>
        </HighlightBox>
      </section>

      <KeyTakeaways items={[
        'A broker decouples producers and consumers in three ways: temporal (consumer does not need to be running when producer writes), spatial (producer does not know consumer\'s address), and rate (producer and consumer can run at different speeds).',
        'A queue is destructive — each message is delivered to one consumer and then gone. A topic is non-destructive — every subscriber sees every message, and messages stay until retention expires. Use queues for work distribution, topics for event broadcasting.',
        'The commit log is an append-only, sequential file on disk. Its sequential write pattern is what makes brokers fast — no seeking, no in-place updates. Segments are fixed-size chunks of the log with a companion index file for fast offset lookup.',
        'Retention deletes entire old segments after a time or size threshold. Log compaction retains the latest value per key forever — the right choice for changelog topics that represent current state.',
        'Durability comes from replication. With replication.factor=3, min.insync.replicas=2, and acks=all, a message survives any single broker failure. Lowering any of these settings trades durability for throughput or availability.',
        'Consumer lag = log-end-offset minus committed offset. A growing lag means the consumer is slower than the producer and will eventually fall behind the retention window, causing permanent data loss for that consumer.',
        'Poison messages block all processing at their offset. Dead letter queues are the solution — after N retries, route the failing message to a DLQ topic, commit the offset, and continue. Monitor DLQ depth and build a replay mechanism.',
        'Idempotent producers attach sequence numbers per (PID, partition). The broker discards duplicates from retries within the same session. This prevents the most common source of duplicates — unacknowledged successful writes being retried.',
        'Kafka transactions make read-process-write atomic across topics and offset commits. Consumers reading the output topic must use isolation.level=read_committed to filter out messages from aborted transactions.',
        'Ordering is guaranteed within a partition, not across partitions or across the whole topic. The three most common ordering violations in production are: in-flight producer retries, merging events from multiple partitions by arrival time, and unclean leader election with acks=1.',
      ]} />

    </LearnLayout>
  )
}