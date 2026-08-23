// app/learn/data-engineering/message-brokers-queues/page.tsx

import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
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

const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{children}</h4>
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

const Output = ({ children }: { children: string }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{
      fontSize: 10, fontWeight: 700, color: 'var(--muted)',
      letterSpacing: '.1em', textTransform: 'uppercase',
      marginBottom: 6, fontFamily: 'var(--font-mono)',
      display: 'flex', alignItems: 'center', gap: 6,
    }}>
      <span style={{ opacity: 0.6 }}>▸</span> output
    </div>
    <pre style={{
      background: 'transparent', border: '1px dashed var(--border)',
      borderRadius: 10, padding: '14px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.8, color: 'var(--muted)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

const TryThis = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.25)',
    borderRadius: 10, padding: '16px 20px', marginBottom: 24,
    display: 'flex', gap: 12, alignItems: 'flex-start',
  }}>
    <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.5 }}>⌨️</span>
    <div>
      <div style={{
        fontSize: 10, fontWeight: 700, color: 'var(--accent2)',
        letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6,
        fontFamily: 'var(--font-mono)',
      }}>Try this yourself</div>
      <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.75 }}>{children}</div>
    </div>
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
      section="Data Engineering — Module 41"
      readTime="50 min"
      updatedAt="August 2026"
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
            to be running when the producer sends. A Stripe payment event
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
            difference. If DoorDash's order service produces 50,000 events per
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

# Real use case: Amazon order fulfilment
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
          This is the publish-subscribe (pub-sub) pattern. Shopify's order
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
            { '0': 'Real-world example', '1': 'Sephora image resize queue — 1 image, 1 worker, processed once', '2': 'DoorDash order topic — 1 event, consumed by 8 different services' },
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

        <TryThis>
          Pick one integration you know of between two services (an order
          system notifying a shipping system, a signup flow triggering a
          welcome email). Decide honestly: is it a queue relationship (exactly
          one consumer should act on each message) or a topic relationship
          (multiple independent consumers each need to see it)? If more than
          one service currently reacts to the same queue, that is worth
          noticing — it is usually a sign the wrong primitive was chosen.
        </TryThis>
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
/data/kafka/freshcart.orders-3/          ← partition 3 of freshcart.orders topic
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
{`# freshcart.orders partition 0 — replicated across 3 brokers (replication factor = 3)

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
{`# freshcart.products — compacted topic
# Tracks current product price. Key = product_id. Value = current price.

# Log BEFORE compaction (chronological, by offset):
# offset 0:  key=P1001  value={"name":"Black Beans 1lb", "price_cents": 18900}
# offset 1:  key=P1002  value={"name":"Jasmine Rice 5lb","price_cents": 67500}
# offset 2:  key=P1001  value={"name":"Black Beans 1lb", "price_cents": 19500}  ← price updated
# offset 3:  key=P1003  value={"name":"Olive Oil",       "price_cents": 23400}
# offset 4:  key=P1002  value={"name":"Jasmine Rice 5lb","price_cents": 69000}  ← price updated
# offset 5:  key=P1001  value={"name":"Black Beans 1lb", "price_cents": 21000}  ← price updated again

# Log AFTER compaction:
# offset 3:  key=P1003  value={"name":"Olive Oil",       "price_cents": 23400}   ← only version
# offset 4:  key=P1002  value={"name":"Jasmine Rice 5lb","price_cents": 69000}   ← latest
# offset 5:  key=P1001  value={"name":"Black Beans 1lb", "price_cents": 21000}   ← latest

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

        <CodeBox label="ordering breaks — 1: producer retries, and 2: cross-partition merging">
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

# Topic freshcart.orders has 4 partitions.
# Consumer reads from all 4 and processes events in the order they arrive.
# Partition 0: order at 14:23:11 — arrives at consumer at 14:23:12
# Partition 2: order at 14:23:09 — arrives at consumer at 14:23:13 (1 sec delay)
# Consumer sees the 14:23:11 order BEFORE the 14:23:09 order.
# In processing time order, everything was fine.
# In event time order (which matters for business logic), it was wrong.

# Fix: do not assume cross-partition arrival order reflects event time order.
# If business logic requires event time ordering across partitions,
# buffer events and sort by event_time before processing — at the cost of latency.`}
        </CodeBox>
        <CodeBox label="ordering breaks — 3: leader failover during write">
{`# ── Break 3: Leader failover during write ────────────────────────────────────

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

        <TryThis>
          If you have access to a Kafka cluster (or a similar broker), run the
          consumer-group lag command for a real consumer group and note the
          lag per partition, not just the total. A total that looks fine can
          hide one badly-lagging partition — the same trap as averaging away
          the data-skew problem covered elsewhere in this track.
        </TryThis>
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

        <CodeBox label="dead letter queue — the retry loop">
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
            )`}
        </CodeBox>
        <CodeBox label="dead letter queue — writing the failed event once retries are exhausted">
{`    # All retries exhausted — send to DLQ
    dlq_event = {
        "original_event":   event,
        "failed_at":        "2026-03-20T14:23:11Z",  # use datetime.utcnow().isoformat()
        "error_message":    str(last_exception),
        "error_type":       type(last_exception).__name__,
        "retry_count":      MAX_RETRIES,
        "source_topic":     "freshcart.orders",
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
    # Return normally — caller commits offset, processing continues`}
        </CodeBox>
        <CodeBox label="dead letter queue — topic naming and what to monitor">
{`# DLQ topic naming convention:
# source_topic + ".dlq"
# freshcart.orders → freshcart.orders.dlq
# freshcart.payments → freshcart.payments.dlq

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

        <CodeBox label="kafka transaction — configuring the transactional producer and consumer">
{`# Read from freshcart.orders, transform, write to freshcart.orders.enriched
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
consumer.subscribe(['freshcart.orders'])`}
        </CodeBox>
        <CodeBox label="kafka transaction — the atomic read-process-write loop">
{`while True:
    msg = consumer.poll(timeout=1.0)
    if msg is None or msg.error():
        continue

    try:
        event = json.loads(msg.value())
        enriched = enrich_order(event)  # your transformation logic

        producer.begin_transaction()

        # Write enriched event to output topic
        producer.produce('freshcart.orders.enriched', value=json.dumps(enriched))

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

        <TryThis>
          Find a producer configuration in a codebase you have access to (or
          a public example on GitHub) and check three settings:
          <code>enable.idempotence</code>, <code>acks</code>, and
          <code>max.in.flight.requests.per.connection</code>. Based on Part 06
          and this Part, decide whether that combination could silently produce
          duplicates or reorder messages under a network retry.
        </TryThis>
      </section>

      <Divider />

      {/* ── Misconceptions ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Message Brokers</SectionTitle>

        {[
          {
            wrong: '"A message broker is just a pipe that moves data from A to B"',
            right: 'Part 01 is explicit that the broker is an active storage and routing system with its own durability guarantees, replication strategy, and indexing structure — not a passive pipe. Part 03\'s commit-log-and-segments model is exactly what a "pipe" would not need.',
          },
          {
            wrong: '"Queues and topics are basically the same thing with different names"',
            right: 'Part 02\'s comparison table is the reference here: a queue read is destructive (the message is gone after one consumer takes it) while a topic read is non-destructive (every subscriber sees every message). Using a queue where a topic is needed silently drops the event for every consumer after the first.',
          },
          {
            wrong: '"acks=all guarantees a message can never be lost"',
            right: 'Part 04 is precise about the actual contract: acks=all only waits for replicas currently in the ISR. If min.insync.replicas is not also set, a shrunk ISR (down to just the leader) still satisfies acks=all — the safety comes from combining acks=all with min.insync.replicas, not from acks=all alone.',
          },
          {
            wrong: '"If ordering is guaranteed, my consumer will always see events in the exact order they happened"',
            right: 'Part 06\'s three ordering-break scenarios — producer retries, cross-partition merging, and leader failover — all happen even though the broker\'s per-partition guarantee holds perfectly. The guarantee is narrower than most engineers assume: same partition, not same topic, not same real-world sequence.',
          },
          {
            wrong: '"A dead letter queue means the failed message is handled and can be ignored"',
            right: 'Part 08 frames the DLQ as an escape valve that unblocks processing, not a resolution. A DLQ with unmonitored, ever-growing depth means silent, permanent data loss — the whole point of the pattern is that engineers inspect, fix, and replay, not that the failure disappears.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red,#ff4757)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 10 — What This Looks Like at Work ───────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 10 — What This Looks Like at Work" />
        <SectionTitle>What This Looks Like on Day One</SectionTitle>

        <HighlightBox>
          <Para>
            <strong>At a fintech (Stripe / Venmo):</strong> A production
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
            <strong>At an e-commerce company (Sephora / Myntra):</strong>
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

      <Divider />

      {/* ── Interview Prep ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. What is the difference between a queue and a topic, and how would you decide which one to use for a new integration?',
            a: `A queue delivers each message to exactly one consumer and then removes it — a destructive read. A topic is a durable, ordered log that multiple independent subscribers can each read at their own pace without affecting each other — a non-destructive read, covered in Part 02.

I would ask one question to decide: does more than one independent system need to react to this event? If the answer is "no, I just need this specific work item processed by any one of a pool of workers," that's a queue — the competing-consumers pattern for work distribution. If the answer is "yes, several unrelated services each need to know this happened," that's a topic — the pub-sub pattern for event broadcasting.

The other deciding factor is replay. If I might need to rebuild a downstream system from scratch by reprocessing history, I need a topic — a queue's messages are gone the moment they're delivered, so there's nothing to replay.`,
          },
          {
            q: 'Q2. Your team sets replication.factor=3 and assumes that guarantees no data loss. Is that assumption correct?',
            a: `No, and this is one of the most common misconfigurations in production. Replication factor alone only says how many copies of the data exist — it says nothing about how many copies must confirm a write before the producer is told it succeeded.

As Part 04 covers, that acknowledgement behaviour is controlled by the producer's acks setting combined with min.insync.replicas. With acks=1, the producer only waits for the leader to write locally — if the leader crashes before followers replicate, the message is lost even with replication.factor=3. Durability requires acks=all together with min.insync.replicas set to at least 2, so a write isn't acknowledged until it exists on multiple machines.

I'd also flag that min.insync.replicas creates an availability trade-off: with RF=3 and min.isr=2, the topic becomes unavailable for writes if 2 of the 3 brokers are down. That's usually the right trade for financial data — reject writes rather than silently risk losing them — but it's a deliberate choice, not a free guarantee.`,
          },
          {
            q: 'Q3. A consumer\'s lag keeps growing throughout the day. Walk me through how you\'d diagnose and fix it.',
            a: `First I'd confirm it's a real, sustained trend and not noise — per Part 07, a lag with a positive slope over a meaningful window (not a single spike) means the consumer is structurally slower than the producer, and it will keep getting worse without intervention.

Diagnosis: check whether the consumer group has fewer consumers than partitions — that caps parallelism regardless of processing speed. Check per-partition lag, not just the aggregate, since one slow partition can hide inside a healthy-looking average. Check what the consumer is actually doing per message — a slow downstream call (a database write, an external API) inside the processing loop is the most common root cause.

Fix, in order of preference: scale out the consumer group up to the partition count first, since that's free parallelism. If already at the partition limit, optimise the per-event processing time. If neither is enough, increase the partition count — which requires repartitioning and is more disruptive. Throttling the producer is the last resort since it pushes the problem upstream.

Critically, I'd also check the lag against the retention window, not just against zero — if lag ever exceeds retention, the oldest lagged events are permanently gone, not just delayed.`,
          },
          {
            q: 'Q4. What is a poison message, and how does a dead letter queue prevent it from taking down your pipeline?',
            a: `A poison message is an event that fails processing every time it's retried — a malformed payload, a value the consumer's logic can't handle, or a downstream dependency that consistently rejects that specific record. Without a DLQ, the consumer can't advance past that offset, so every message behind it in the partition is blocked indefinitely.

The DLQ pattern, from Part 08, is: retry a bounded number of times, and if all retries fail, write the event (plus its error, source topic, partition, and offset) to a separate DLQ topic, then commit the original offset so processing continues. The failure is isolated to one message instead of stalling the whole partition.

The part candidates often miss: a DLQ is not a resolution, it's a deferral. It needs monitoring — alerting on any DLQ depth greater than zero — and a replay mechanism so that once the root cause is fixed, the failed messages can be reproduced back to the original topic and processed correctly.`,
          },
          {
            q: 'Q5. Explain how Kafka\'s idempotent producer prevents duplicate messages, and why it isn\'t sufficient on its own for exactly-once processing.',
            a: `With enable.idempotence=true, the broker assigns each producer a Producer ID and tracks a monotonically increasing sequence number per (PID, partition). If the broker sees a sequence number it has already committed for that PID and partition, it silently discards the duplicate and returns success — this is what Part 09 walks through, and it's exactly what prevents the classic "ack was lost, producer retried, message got written twice" bug.

The limit is scope: the broker only tracks a small window of recent sequence numbers per (PID, partition), and a new producer session gets a new PID. So idempotent producers deduplicate retries within one producer's live session, but not across a producer restart, and not for a consumer's own read-process-write cycle across topics.

That broader case — read from topic A, process, write to topic B, and commit the offset in A, all atomically — is what Kafka transactions solve, using begin_transaction / send_offsets_to_transaction / commit_transaction, with the consumer set to isolation.level=read_committed so it never sees results from an aborted transaction. Idempotent producer and transactions solve different, complementary problems.`,
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>
              {item.q}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
              {item.a}
            </div>
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
            q: 'Choosing a queue for an integration that turns out to need more than one independent consumer',
            a: 'Part 02\'s comparison table exists because this decision is easy to get backwards early — a queue silently gives the message to only one of the consumers competing for it, so a second subscriber added later gets nothing. Decide queue vs topic based on how many independent systems need the event, before building either.',
          },
          {
            q: 'Assuming replication.factor alone provides durability, without checking acks and min.insync.replicas',
            a: 'Part 04 and Interview Prep Q2 both cover this directly: RF=3 with acks=1 can still lose a message if the leader crashes before replicating. Durability requires acks=all plus min.insync.replicas set explicitly — replication factor by itself only says how many copies could exist, not how many must confirm before the write is considered safe.',
          },
          {
            q: 'Trusting cross-partition arrival order as if it were event-time order',
            a: 'Part 06\'s Break 2 shows a consumer reading four partitions and processing events in the order they happen to arrive — which is not the same as the order they happened in the real world. If business logic needs true event-time ordering across partitions, buffer and sort by event_time explicitly; don\'t assume the broker does this for you.',
          },
          {
            q: 'Building a dead letter queue with no monitoring or replay plan',
            a: 'Part 08 and Interview Prep Q4 both make the same point: a DLQ that nobody watches is just a slower, quieter way to lose data. Wire an alert on DLQ depth greater than zero from day one, and write the replay script before you need it under pressure.',
          },
          {
            q: 'Relying on idempotent producers alone and assuming that solves exactly-once processing end to end',
            a: 'Part 09 and Interview Prep Q5 are explicit that idempotent producers only deduplicate retries within a single producer session — a restart gets a new Producer ID and loses that protection. A true read-process-write-exactly-once pipeline needs Kafka transactions (or an equivalent), not idempotence alone.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: `Duplicate orders appear in the downstream analytics table — investigation shows the same order_id written twice with different offsets`,
            cause: 'The producer has enable.idempotence=false and retries=3 (or similar). A network blip caused the broker\'s acknowledgement to be lost even though the write succeeded — the producer, having no proof the write landed, retried the same message, which the broker happily wrote again as a new, unrelated record at a new offset.',
            fix: 'Set enable.idempotence=true on the producer. This assigns a Producer ID and per-partition sequence numbers, so the broker recognises and silently discards a retried write it has already committed, per Part 09. This is a config change, not an application-logic change — safe to enable without touching business code.',
          },
          {
            error: `A consumer group is stuck — one partition shows lag climbing steadily while every other partition in the same group sits at zero`,
            cause: 'A single partition has a hot key or an unusually large volume of messages for one entity, and only one consumer instance can ever process a given partition at a time. That one consumer is falling behind while its peers, assigned to lighter partitions, sit idle.',
            fix: 'This is a partitioning-skew problem, not a general scaling problem — adding more consumers past the partition count does nothing, since a partition is only ever owned by one consumer at a time. Check whether the partition key concentrates too much volume on one key (Part 03\'s section on segments and Part 07\'s backpressure discussion both apply), and consider a better partition key or explicit load-splitting for that hot entity.',
          },
          {
            error: `A downstream service reports receiving order events "from the past" — timestamps up to a day old showing up interleaved with current events`,
            cause: 'The consumer restarted after being down, and is replaying from its last committed offset — which, correctly, includes everything it missed while it was offline. This is not corruption; it is the broker doing exactly what temporal decoupling promises: nothing is lost while a consumer is down.',
            fix: 'The downstream service needs to handle this as expected behaviour, not an error — either by being idempotent to reprocessing, or by checking the event\'s embedded timestamp rather than assuming arrival order reflects recency. If genuinely stale events must be discarded, filter explicitly on event_time in the consumer logic rather than treating broker replay as a bug.',
          },
          {
            error: `A schema change to an event's Avro definition causes every consumer of that topic to start throwing deserialization errors simultaneously`,
            cause: 'The producer added a required field (or changed a field\'s type) without checking backward compatibility. Existing messages already in the topic don\'t have the new field, and consumers built against the old schema can\'t deserialize the new one — every consumer breaks at once, not gradually.',
            fix: 'Add new fields as optional with a default value, never as required, and use a schema registry that enforces compatibility rules (BACKWARD, FORWARD, or FULL) at publish time so an incompatible schema change is rejected before it ever reaches the topic — this is the same class of problem covered for other formats in the DE track\'s schema-evolution material, and it applies identically to broker message schemas.',
          },
          {
            error: `A "read-process-write" pipeline occasionally produces a result in the output topic with no corresponding offset commit — on restart, the same input is processed and written again`,
            cause: 'The write to the output topic and the commit of the input offset were two separate, non-atomic operations. The process crashed between them: the output write succeeded, but the offset commit never happened, so on restart the consumer reprocesses the same input and writes a second, duplicate output.',
            fix: 'Wrap the read-process-write cycle in a Kafka transaction — begin_transaction, produce the output, call send_offsets_to_transaction for the input offset, then commit_transaction — so the output write and the offset commit succeed or fail as one atomic unit, per Part 09. The consumer reading the output topic must also set isolation.level=read_committed, or it will see results from transactions that later aborted.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red,#ff4757)',
              marginBottom: 12, background: 'rgba(255,71,87,0.08)',
              border: '1px solid rgba(255,71,87,0.2)',
              borderRadius: 6, padding: '8px 12px', lineHeight: 1.5,
            }}>
              {item.error}
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
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

    
      {/* ── Next Module CTA ──────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 42 covers distributed systems — CAP theorem, consistency models, partitioning, replication, and fault tolerance — explained with data engineering scenarios, not abstract distributed systems theory.
        </p>
        <Link href="/learn/data-engineering/distributed-systems" style={{ background: '#00e676', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 42 → Distributed Systems for Data Engineers
        </Link>
      </div>
    </LearnLayout>
  )
}