// app/learn/data-engineering/distributed-systems/page.tsx

import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Distributed Systems for Data Engineers — CAP Theorem, Partitioning, Fault Tolerance | Chaduvuko',
  description:
    'CAP theorem applied to real data systems, consistency models, replication strategies, partitioning and sharding, distributed joins, fault tolerance and delivery semantics, consensus protocols, and the Saga pattern — explained for data engineers, not distributed systems PhDs.',
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

export default function DistributedSystemsModule() {
  return (
    <LearnLayout
      title="Distributed Systems for Data Engineers"
      description="CAP theorem applied to real data systems, consistency models, replication strategies, partitioning and sharding, distributed joins, fault tolerance and delivery semantics, consensus protocols, and the Saga pattern — explained for data engineers, not distributed systems PhDs."
      section="Data Engineering · Phase 6"
      readTime="65 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — Why This Matters ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why This Matters" />
        <SectionTitle>You Are Already Building Distributed Systems — Whether You Know It or Not</SectionTitle>

        <Para>
          The moment your pipeline reads from a Kafka topic spread across 8 brokers,
          joins two tables in a Snowflake cluster with 32 nodes, and writes results
          to an ADLS Gen2 account replicated across three Azure regions — you are
          operating a distributed system. Every design decision in that pipeline is
          a distributed systems decision, even if it doesn't look like one.
        </Para>

        <Para>
          Why does your Spark job slow down when one executor runs out of memory?
          Why does your Kafka consumer occasionally see the same event twice?
          Why does your data warehouse return slightly different counts depending
          on when you run the query? Why does adding more nodes to your cluster
          sometimes make things slower, not faster? The answers are in distributed
          systems theory — and they are not academic. They are the explanation
          for the bugs you will hit every week.
        </Para>

        <HighlightBox>
          <Para>
            <strong>What this module covers and what it deliberately does not:</strong>
            This module covers the concepts a data engineer needs to make correct
            architectural decisions and debug distributed failures — CAP theorem,
            consistency models, replication, partitioning, joins, fault tolerance,
            and consensus. It does not cover implementing a distributed database
            from scratch, the full Paxos or Raft algorithms in academic depth, or
            network programming. Those are software engineering and systems
            programming topics. If you want those, read Designing Data-Intensive
            Applications by Martin Kleppmann — it is the best book on this subject
            ever written.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Part 02 — CAP Theorem ────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — CAP Theorem" />
        <SectionTitle>CAP Theorem — What It Actually Says and How It Applies to Your Stack</SectionTitle>

        <Para>
          CAP theorem, proved by Eric Brewer in 2000, states that a distributed
          data system can guarantee at most two of three properties simultaneously:
          Consistency, Availability, and Partition Tolerance. Every distributed
          database and every distributed data system makes this trade-off — the
          ones that don't advertise it are hiding it from you.
        </Para>

        <SubTitle>The three properties, precisely defined</SubTitle>

        <Para>
          <strong>Consistency (C)</strong> — Every read receives the most recent
          write or an error. Not "eventually the most recent write." The most recent
          write, right now. If you write a value to node 1 and immediately read it
          from node 2, you get the value you just wrote. Every node in the cluster
          agrees on the same value at all times.
        </Para>

        <Para>
          <strong>Availability (A)</strong> — Every request receives a response —
          not an error, not a timeout. The response might not contain the most
          recent data, but the system always responds. A node that is running
          always handles requests.
        </Para>

        <Para>
          <strong>Partition Tolerance (P)</strong> — The system continues
          operating even when network partitions occur — when messages between
          nodes are lost or delayed indefinitely. A partition is when nodes in
          the cluster cannot communicate with each other.
        </Para>

        <HighlightBox>
          <Para>
            <strong>The real insight of CAP:</strong> In any real distributed
            system, network partitions will happen. A cable gets unplugged.
            A switch fails. An AWS availability zone loses connectivity for
            4 minutes. You cannot prevent partitions — you can only choose
            how your system behaves when they occur. This means Partition
            Tolerance is not optional. The real trade-off is between
            Consistency and Availability during a partition.
          </Para>
          <Para>
            During a partition, you must choose: do you refuse to respond
            until the partition heals and you can guarantee a consistent
            answer (CP — prefer consistency over availability), or do you
            respond with potentially stale data and risk returning an
            inconsistent answer (AP — prefer availability over consistency)?
          </Para>
        </HighlightBox>

        <SubTitle>CAP applied to the systems in your stack</SubTitle>

        <Table
          headers={['System', { label: 'CAP choice', color: '#7b61ff' }, 'What this means in practice']}
          rows={[
            {
              '0': 'HBase / Zookeeper',
              '1': 'CP — Consistent + Partition Tolerant',
              '2': 'During a network partition, HBase refuses reads and writes rather than returning stale data. Some requests get errors. Data is never inconsistent.',
            },
            {
              '0': 'Cassandra / DynamoDB',
              '1': 'AP — Available + Partition Tolerant',
              '2': 'During a partition, Cassandra continues serving reads and writes on all nodes. When partition heals, nodes reconcile — you may have read stale data.',
            },
            {
              '0': 'PostgreSQL (single node)',
              '1': 'CA — but this is misleading',
              '2': 'A single-node database has no network partition between nodes — so P is trivially true. Distribute it (read replicas, Citus) and P becomes a real choice.',
            },
            {
              '0': 'Kafka (acks=all, min.isr=2)',
              '1': 'CP for writes',
              '2': 'During a partition, if fewer than min.isr replicas are reachable, Kafka refuses writes (errors to producer) rather than risk data loss.',
            },
            {
              '0': 'Elasticsearch',
              '1': 'AP by default',
              '2': 'Reads can return stale data if a shard replica has not yet received the latest write. Configurable with wait_for_active_shards.',
            },
            {
              '0': 'Snowflake / BigQuery',
              '1': 'CP for queries',
              '2': 'Query results are always consistent — you will never see a partial write. At the cost of potential latency under heavy load.',
            },
            {
              '0': 'Delta Lake / Iceberg',
              '1': 'CP via ACID transactions',
              '2': 'Serialisable isolation — readers see a consistent snapshot. Writers that conflict are rejected. Uses optimistic concurrency control.',
            },
          ]}
        />

        <SubTitle>The PACELC extension — latency matters too</SubTitle>

        <Para>
          CAP only describes behaviour during partitions. PACELC (proposed by
          Daniel Abadi) extends the model: even when the system is running
          normally (no partition), there is a trade-off between Latency and
          Consistency. A strongly consistent system must coordinate across nodes
          before returning a result — this takes time. An eventually consistent
          system responds immediately from local state — this is fast but
          potentially stale.
        </Para>

        <Para>
          This is why Cassandra with quorum reads is slower than Cassandra with
          eventual consistency reads. The quorum read waits for a majority of
          replicas to agree. The eventual consistency read returns whatever the
          nearest replica has. For a data engineer choosing a storage system,
          the latency vs consistency trade-off during normal operation is often
          more practically important than the partition behaviour.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 — Consistency Models ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Consistency Models" />
        <SectionTitle>Consistency Models — The Spectrum from Strong to Eventual</SectionTitle>

        <Para>
          "Consistent" is not a binary property. There is a spectrum of
          consistency guarantees, each with different performance costs and
          different correctness guarantees. Understanding this spectrum is
          essential for choosing the right storage system for each workload
          and for debugging data correctness issues in production.
        </Para>

        <SubTitle>Strong consistency (linearisability)</SubTitle>

        <Para>
          The strictest model. Every operation appears to take effect
          instantaneously at some point between its invocation and completion.
          The system behaves as if there is a single global copy of the data.
          Any read after a successful write always returns that write's value,
          regardless of which node handles the read.
        </Para>

        <Para>
          PostgreSQL with synchronous replication, Zookeeper, and etcd offer
          strong consistency. The cost: every write must be coordinated across
          nodes before acknowledging. In a multi-region setup, a write in
          Mumbai must wait for confirmation from a replica in Singapore before
          completing. That round trip adds latency — typically 50–200ms across
          regions. This is why strongly consistent multi-region databases are
          rare and expensive.
        </Para>

        <SubTitle>Serialisable isolation</SubTitle>

        <Para>
          The strongest isolation level for concurrent transactions. Transactions
          appear to execute one at a time, in some serial order, even though
          they actually run concurrently. Two transactions that read and write
          the same data cannot interfere with each other in any observable way.
          Delta Lake and PostgreSQL's SERIALIZABLE isolation level offer this.
          Cost: higher abort rates for conflicting transactions, more coordination
          overhead.
        </Para>

        <SubTitle>Read-your-writes consistency</SubTitle>

        <Para>
          A weaker but practically useful guarantee: after you write a value,
          any subsequent read from your own session will return that value.
          Other clients may not see it yet. This is the minimum consistency
          guarantee that makes applications feel correct to individual users.
          If you update your profile photo and then immediately view your
          profile, you should see the new photo — even if other users don't
          see it for another few seconds.
        </Para>

        <SubTitle>Eventual consistency</SubTitle>

        <Para>
          The weakest model. If no new writes are made, all replicas will
          eventually converge to the same value. There is no guarantee about
          how long "eventually" takes. During that convergence window, different
          nodes return different values for the same key. Amazon DynamoDB with
          eventually consistent reads, Cassandra with consistency level ONE,
          and DNS are all eventually consistent.
        </Para>

        <CodeBox label="consistency model — the impact on your pipeline">
{`# Scenario: PhonePe user tops up wallet. You read the balance immediately after.

# With STRONG CONSISTENCY (linearisable):
write_wallet_balance(user_id='U1234', new_balance=500_00)  # ₹500 in paise
balance = read_wallet_balance(user_id='U1234')
# balance is GUARANTEED to be 500_00
# The read was routed to any node — all nodes agree because write was fully replicated

# With EVENTUAL CONSISTENCY:
write_wallet_balance(user_id='U1234', new_balance=500_00)
balance = read_wallet_balance(user_id='U1234')
# balance MIGHT be 500_00 (if read hits the node that just received the write)
# balance MIGHT be 350_00 (old value — if read hits a replica not yet updated)
# Both are valid responses. The system makes no guarantee about which you get.

# In a financial system, this is catastrophic — showing the old balance
# after a top-up makes users think the top-up failed. They retry.
# Now you have a double top-up problem.

# → Financial data: always use strongly consistent reads
# → Analytics aggregations (eventual consistency of 30 seconds is fine):
#   Swiggy's live order count dashboard can be off by a few orders for 30 seconds.
#   Nobody is making financial decisions based on it.

# The read-your-writes workaround for eventually consistent stores:
# Route the user's own reads to the same node that accepted their write
# (sticky sessions / consistent routing) — a common pattern in Cassandra deployments`}
        </CodeBox>

        <Table
          headers={[
            'Model',
            { label: 'Guarantee', color: '#00e676' },
            'Performance',
            'Use in data engineering',
          ]}
          rows={[
            {
              '0': 'Linearisable',
              '1': 'Every read returns the latest write, across all nodes',
              '2': 'Highest latency — requires cross-node coordination',
              '3': 'Financial balances, inventory counts where accuracy is critical',
            },
            {
              '0': 'Serialisable',
              '1': 'Concurrent transactions appear serial — no interference',
              '2': 'High latency — may abort conflicting transactions',
              '3': 'Delta Lake MERGE operations, warehouse upserts',
            },
            {
              '0': 'Read-your-writes',
              '1': 'You always see your own writes — others may not',
              '2': 'Medium — only your session is coordinated',
              '3': 'User-facing features, profile updates',
            },
            {
              '0': 'Monotonic reads',
              '1': 'You never read data older than what you previously read',
              '2': 'Low-medium',
              '3': 'Streaming consumers that must not go backwards in time',
            },
            {
              '0': 'Eventual',
              '1': 'All replicas converge eventually — no timing guarantee',
              '2': 'Lowest latency — respond from local state immediately',
              '3': 'Analytics dashboards, recommendation signals, search indexes',
            },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 04 — Replication ────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Replication" />
        <SectionTitle>Replication — Leader-Follower, Multi-Leader, and Leaderless</SectionTitle>

        <Para>
          Replication means keeping a copy of the same data on multiple nodes.
          The reasons are: durability (survive node failures), read scalability
          (distribute reads across replicas), and geographic distribution (serve
          data from nodes close to users). There are three fundamentally different
          replication topologies, each with different consistency and failure
          characteristics.
        </Para>

        <SubTitle>Leader-follower replication (single-leader)</SubTitle>

        <Para>
          One node is designated the leader (also called primary or master).
          All writes go to the leader. The leader writes the change to its local
          log and then replicates to followers (also called replicas or secondaries).
          Reads can go to followers — but follower reads may be stale because
          replication has a lag.
        </Para>

        <Para>
          This is the most common topology. PostgreSQL streaming replication,
          MySQL replication, Redis Sentinel, and Kafka partition replication
          all use leader-follower. The trade-off: the leader is the write
          bottleneck. You cannot scale writes by adding followers — only
          reads scale horizontally.
        </Para>

        <CodeBox label="leader-follower — replication lag and its consequences">
{`# PostgreSQL leader-follower replication lag scenario

# Leader receives a write: INSERT INTO orders VALUES (ORD-9999, ...)
# Leader writes to its WAL (Write-Ahead Log) — offset 10,441
# Leader acknowledges the write to the application
# Replication to follower begins asynchronously

# At this exact moment: replication lag = a few milliseconds
# Application immediately queries a follower for reporting:
# SELECT COUNT(*) FROM orders WHERE date = TODAY

# If the follower has not yet received offset 10,441:
# → COUNT returns a value that does not include ORD-9999
# → Report is stale by exactly 1 order
# → This is normal and expected with asynchronous replication

# How replication lag is measured (PostgreSQL):
# On the follower:
# SELECT now() - pg_last_xact_replay_timestamp() AS replication_lag;
# → "00:00:00.003" (3 milliseconds of lag — healthy)
# → "00:05:23" (5 minutes of lag — the follower is struggling, investigate)

# Common causes of high replication lag:
# 1. Follower disk I/O is saturated — cannot apply WAL fast enough
# 2. Long-running query on follower blocking WAL replay (PostgreSQL pre-14 issue)
# 3. Network congestion between leader and follower
# 4. Follower is under high read load, starving WAL replay threads

# Solutions:
# 1. Route time-sensitive reads to the leader, not followers
# 2. Use synchronous replication for critical data (blocks writes until follower confirms)
# 3. Monitor lag and alert on thresholds — 30s lag for analytics, 100ms for OLTP followers`}
        </CodeBox>

        <SubTitle>Multi-leader replication</SubTitle>

        <Para>
          Multiple nodes can accept writes simultaneously. Each node replicates
          its writes to all other leaders. This enables writes from multiple
          geographic regions without routing everything to a single leader —
          a write from a Mumbai user goes to the Mumbai node, not to a US-East
          leader 200ms away.
        </Para>

        <Para>
          The fundamental problem with multi-leader: write conflicts. Two users
          simultaneously update the same row on two different leader nodes.
          Both writes succeed locally. When the nodes try to replicate to each
          other, they have conflicting versions of the same row. The system must
          resolve the conflict — and there is no universally correct answer.
          Common strategies: last-write-wins (by timestamp — but clocks are
          never perfectly synchronised across machines), application-level
          merge logic, or recording the conflict and surfacing it to the user.
        </Para>

        <HighlightBox>
          <Para>
            <strong>Last-write-wins (LWW) is dangerous</strong> — it silently
            discards writes without errors. Two users simultaneously update
            a document. Both see a success confirmation. One update is silently
            lost. The user whose update lost has no idea. LWW is only safe
            when: the same user is the only writer to a key (impossible to
            guarantee in practice), or losing concurrent writes is acceptable
            (user preference settings, not financial data). CRDTs
            (Conflict-free Replicated Data Types) are the mathematically
            correct solution for data structures that must support multi-leader
            writes — but they are complex to implement and reason about.
          </Para>
        </HighlightBox>

        <SubTitle>Leaderless replication (Dynamo-style)</SubTitle>

        <Para>
          No single node is the leader. Writes go to multiple nodes
          simultaneously. Reads also go to multiple nodes simultaneously.
          The system uses quorums to determine correctness: with N replicas,
          a write requires W nodes to confirm, and a read fetches from R nodes.
          The rule for consistency: W + R {'>'} N.
        </Para>

        <CodeBox label="quorum reads and writes — the W + R > N rule">
{`# Cassandra cluster: N = 5 replicas (replication_factor = 5)
# Write consistency: W = 3 (quorum — majority)
# Read consistency:  R = 3 (quorum — majority)
# W + R = 6 > N = 5 → reads and writes overlap by at least 1 node
# → At least one node in every read quorum has the latest write
# → Strong consistency guaranteed

# But strong consistency means:
# Write must wait for 3/5 nodes to confirm → slower
# Read must contact 3/5 nodes and take the most recent value → slower
# If 3 nodes are unreachable, writes fail (W = 3 cannot be satisfied)

# Eventual consistency config (R = 1, W = 1):
# W + R = 2, not > N = 5 → no overlap guaranteed
# Write goes to 1 node, completes immediately
# Read goes to 1 node, returns immediately
# Maximum speed, minimum consistency

# FreshCart product catalogue (can tolerate slight staleness):
# N=3, W=1, R=1 → fastest, eventually consistent
# A product price being 30 seconds stale is acceptable

# FreshCart order status (must be accurate):
# N=3, W=2, R=2 → W+R=4 > N=3 → consistent
# A user checking whether their order is placed must get the truth

# Read repair — how leaderless systems eventually converge:
# Consumer reads from R=3 nodes. Gets values: v3, v3, v2 (one replica behind)
# System detects the stale replica (v2 while others have v3)
# Background read repair: sends the latest value (v3) to the stale replica
# Next read: all 3 nodes return v3 → consistent`}
        </CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — Partitioning and Sharding ─────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Partitioning and Sharding" />
        <SectionTitle>Partitioning and Sharding — Splitting Data Across Nodes</SectionTitle>

        <Para>
          Replication duplicates data across nodes for durability and read
          scalability. Partitioning (also called sharding) splits data across
          nodes so that each node holds only a subset. Partitioning is what
          enables horizontal scaling of writes and storage beyond the capacity
          of a single machine.
        </Para>

        <Para>
          Every distributed database and every distributed processing engine
          partitions data. Kafka partitions topics. Cassandra and DynamoDB
          shard rows by partition key. Snowflake and BigQuery distribute
          table data across micro-partitions. Spark distributes DataFrames
          across executor partitions. Understanding how data is partitioned
          in a given system explains its performance characteristics, its
          failure modes, and its hot spot problems.
        </Para>

        <SubTitle>Hash partitioning</SubTitle>

        <Para>
          Apply a hash function to the partition key. The hash value, modulo
          the number of partitions, determines which node holds the record.
          This distributes data evenly as long as the partition key has high
          cardinality — many distinct values. A partition key with low
          cardinality (city: only 5 values, or boolean: only 2) creates
          severe imbalance.
        </Para>

        <CodeBox label="hash partitioning — how it works and where it breaks">
{`# Hash partitioning: consistent_hash(key) % num_partitions → node assignment

# Good partition key: user_id (millions of distinct values)
# consistent_hash('user_U98765') % 32 = 17 → goes to node 17
# consistent_hash('user_U12345') % 32 = 3  → goes to node 3
# Distribution: roughly equal across all 32 nodes ✓

# Bad partition key: payment_method (4 distinct values: upi, card, netbanking, wallet)
# In India, UPI = 80% of all transactions
# consistent_hash('upi') % 32 = 9 → node 9 receives 80% of all traffic
# consistent_hash('card') % 32 = 22 → node 22 receives 15%
# Nodes 9 is a HOT SHARD — slower, more likely to fail, capacity bottleneck

# Bad partition key: timestamp (or anything that increases monotonically)
# All new writes go to the same partition (the latest time range)
# All reads for recent data also go to that partition
# This is called a HOT PARTITION — the most common mistake in time-series data

# Fix for time-series hot partitions:
# Compound partition key: (shard_id, timestamp)
# shard_id = hash(entity_id) % num_shards
# Writes are spread across shards, each shard has its own time ordering

# DynamoDB example for FreshCart orders:
# Bad:  partition_key = date          → all orders for today on one partition
# Good: partition_key = store_id      → 10 stores → 10 evenly distributed partitions
# Best: partition_key = store_id + "#" + hour  → 10 stores × 24 hours = 240 partitions`}
        </CodeBox>

        <SubTitle>Range partitioning</SubTitle>

        <Para>
          Records are assigned to partitions based on ranges of the partition
          key. Keys from A–M go to partition 1, N–Z go to partition 2.
          Dates from January to June go to partition 1, July to December to
          partition 2. Range partitioning enables efficient range scans —
          a query for all orders in March only needs to scan the March
          partition, not the entire table.
        </Para>

        <Para>
          Range partitioning is used extensively in data warehouses. Snowflake's
          automatic clustering, BigQuery's column partitioning, Delta Lake's
          partition pruning by date — all rely on range partitioning of
          date/timestamp columns. The cost: range partitioning can create
          hot partitions if most writes go to the same range (today's date).
        </Para>

        <SubTitle>Consistent hashing — why it matters for resharding</SubTitle>

        <Para>
          Simple modulo hashing has a critical problem: when you add or remove
          nodes, almost every key remaps to a different node. If you grow
          from 8 to 9 partitions, 8 out of 9 keys move. Every moving key
          means data must be copied between nodes — an expensive resharding
          operation that takes hours and impacts availability.
        </Para>

        <Para>
          Consistent hashing solves this. Keys are arranged on a virtual
          ring, and each node owns a segment of the ring. When a node is
          added, only the keys that fall in its new ring segment move —
          approximately 1/N of all keys, not N-1/N. This makes adding and
          removing nodes dramatically less expensive. Cassandra, DynamoDB,
          and most modern distributed databases use consistent hashing.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 — Distributed Joins ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Distributed Joins" />
        <SectionTitle>Distributed Joins — Why They Are Expensive and How Engines Handle Them</SectionTitle>

        <Para>
          A JOIN on a single machine is simple: both tables are in memory (or
          on the same disk). On a distributed system, the two tables are spread
          across dozens of nodes. The rows that need to be joined might be on
          completely different nodes. Getting them together requires moving data
          across the network — and network data transfer is the most expensive
          operation in a distributed system: slower than memory by 100x,
          slower than local disk by 10x.
        </Para>

        <Para>
          Understanding distributed join strategies explains why some Spark jobs
          take 2 hours and others take 2 minutes on the same hardware — often
          because of a single JOIN. It also explains why data modellers
          pre-join and denormalise data in warehouses (reducing join cost at
          query time by paying it at write time).
        </Para>

        <SubTitle>Shuffle join (sort-merge join)</SubTitle>

        <Para>
          Both tables are repartitioned by the JOIN key. All rows with
          join_key = X from both tables are sent to the same node. Once
          co-located, the join is local. The repartitioning step — called
          the shuffle — requires every node to potentially send data to
          every other node. This is an all-to-all network transfer and is
          the most expensive operation in distributed processing.
        </Para>

        <CodeBox label="shuffle join — what happens on the wire">
{`# Spark joining orders (100M rows, 50 partitions) with customers (10M rows, 50 partitions)
# JOIN condition: orders.customer_id = customers.customer_id

# Phase 1 — SHUFFLE (the expensive part):
# Both DataFrames are repartitioned by customer_id
# Each of the 50 executors scans its partition of orders
# For every row, it computes hash(customer_id) % 50 → target partition
# It SENDS that row over the network to the target executor
# Same for customers

# Network traffic during shuffle:
# orders:    100M rows × 500 bytes avg = 50 GB sent across the network
# customers: 10M rows × 200 bytes avg = 2 GB sent across the network
# Total: ~52 GB of network transfer just for this one JOIN

# Phase 2 — LOCAL JOIN (fast):
# Each executor now has all orders AND all customers for its hash range
# Joins them locally — no more network transfers

# Why shuffle joins kill performance:
# 1. Network transfer of 52 GB takes 5-10 minutes on typical cluster network
# 2. All executors must finish Phase 1 before Phase 2 can begin (barrier sync)
# 3. If one executor is slow (straggler), everything waits
# 4. If one customer_id is very common (data skew), one executor gets overloaded

# Optimisation: pre-partitioning
# If orders is ALREADY partitioned by customer_id (e.g., in Delta Lake with Z-order)
# Spark can skip shuffling orders — only customers needs to be shuffled
# 50 GB → 2 GB of network transfer. 25x faster.`}
        </CodeBox>

        <SubTitle>Broadcast join</SubTitle>

        <Para>
          When one table is small enough to fit in memory on every executor
          (typically under 10 MB, configurable up to a few GB), the engine
          broadcasts the entire small table to all executors. Each executor
          then does a local lookup for every row in the large table — no
          shuffle required.
        </Para>

        <Para>
          This is the most important join optimisation in Spark and SQL engines.
          A broadcast join on a 1 MB lookup table joined against a 100 GB fact
          table takes seconds. The same join as a shuffle join takes minutes.
          Spark automatically uses broadcast joins when the smaller table is
          below the <code>spark.sql.autoBroadcastJoinThreshold</code> (default
          10 MB). If your small table is 15 MB, you can explicitly force a
          broadcast hint.
        </Para>

        <CodeBox label="broadcast join — when to force it">
{`# PySpark — explicit broadcast hint
from pyspark.sql.functions import broadcast

# store_metadata: 10 stores, tiny table (< 1 MB)
# orders: 500M rows, huge table
result = orders.join(
    broadcast(store_metadata),   # force broadcast — skip shuffle
    on='store_id',
    how='left'
)
# Spark sends store_metadata to all 200 executors once (10 stores × 200 bytes = trivial)
# Each executor joins locally — zero shuffle
# 500M rows processed with no network transfer for the join

# SQL equivalent (Spark SQL / Snowflake / BigQuery):
# SELECT /*+ BROADCAST(s) */ o.*, s.city, s.region
# FROM orders o
# JOIN store_metadata s ON o.store_id = s.store_id

# When NOT to broadcast:
# Table is > 500 MB → serialising and sending to 200 executors takes longer than the shuffle
# Memory on executors is tight → broadcasting a large table causes OOM
# The "small" table has data skew when joined → broadcast doesn't help with skew

# Rule of thumb: if the dimension/lookup table has fewer than 1M rows and fits in 500 MB,
# consider broadcasting. Always check the query plan to confirm it was applied.`}
        </CodeBox>

        <SubTitle>Data skew in joins — the silent killer</SubTitle>

        <Para>
          After a shuffle join, if 20% of your data has the same join key value
          (for example, a large enterprise customer with millions of orders),
          one executor receives 20% of the entire dataset while others receive
          0.4% each. That one executor becomes the straggler — all others finish
          and wait. Your 2-hour job is actually a 30-minute job waiting 90 minutes
          for one overloaded executor.
        </Para>

        <CodeBox label="salting — fixing data skew in distributed joins">
{`# Problem: customer C00001 (Reliance Industries) has 10M orders out of 50M total
# After shuffle join, one executor gets 10M rows, others get ~800k
# Result: 1 executor runs for 45 minutes, others finish in 4 minutes

# Solution: SALTING — add randomness to the join key to spread the hot key

import random
from pyspark.sql.functions import col, expr, explode, array, lit, concat_ws

NUM_SALTS = 20  # must match on both sides

# Explode the small (or known hot-key) side: replicate each row NUM_SALTS times
store_salted = store_metadata.withColumn(
    'salt', explode(array([lit(i) for i in range(NUM_SALTS)]))
).withColumn('salted_key', concat_ws('_', col('store_id'), col('salt')))

# Add a random salt to the large side
orders_salted = orders.withColumn(
    'salt', (expr('rand()') * NUM_SALTS).cast('int')
).withColumn('salted_key', concat_ws('_', col('store_id'), col('salt')))

# Now join on salted_key instead of store_id
# C00001_0, C00001_1, ..., C00001_19 are spread across 20 different executors
result = orders_salted.join(store_salted, on='salted_key', how='left')`}
        </CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Fault Tolerance ────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Fault Tolerance" />
        <SectionTitle>Fault Tolerance — How Distributed Systems Survive Failures</SectionTitle>

        <Para>
          In a cluster of 200 machines, the probability that at least one machine
          will fail on any given day approaches certainty. A single machine has
          perhaps a 0.1% daily failure probability. Two hundred machines:
          1 − (0.999)^200 ≈ 18% chance of at least one failure per day. At 1000
          machines: 63% per day. Distributed systems are not resilient to failures
          despite node failures being rare — they are resilient because node
          failures are routine and expected.
        </Para>

        <SubTitle>Checkpointing</SubTitle>

        <Para>
          A checkpoint is a snapshot of a computation's state at a point in time.
          If the computation fails after the checkpoint, it can be resumed from
          the checkpoint rather than re-run from the beginning. Without
          checkpointing, a 6-hour Spark job that fails at hour 5 restarts from
          zero. With checkpointing every 30 minutes, a failure restarts from the
          last checkpoint — at most 30 minutes of rework.
        </Para>

        <CodeBox label="checkpointing — Spark and Kafka Streams">
{`# Spark streaming checkpoint — saves state and progress to durable storage
spark = SparkSession.builder.getOrCreate()

query = (
    spark
    .readStream
    .format('kafka')
    .option('kafka.bootstrap.servers', 'broker:9092')
    .option('subscribe', 'freshmart.orders')
    .load()
    .writeStream
    .format('delta')
    .option('path', 'abfss://gold@stfreshmartdev.dfs.core.windows.net/orders_agg/')
    .option(
        'checkpointLocation',
        'abfss://checkpoints@stfreshmartdev.dfs.core.windows.net/orders_agg_ckpt/'
        # MUST be on durable storage (ADLS, S3) — not local disk
        # Local disk checkpoint = lost on executor failure = no recovery
    )
    .trigger(processingTime='1 minute')
    .start()
)

# What the checkpoint stores:
# 1. Kafka offsets consumed so far (per partition)
# 2. Streaming aggregation state (partial counts, sums, windows)
# 3. Schema of the output
# On restart, Spark reads the checkpoint and continues from exactly where it stopped
# No duplicate processing. No missed events.

# How often to checkpoint:
# More frequent = smaller recovery window, more overhead per checkpoint
# Less frequent = larger recovery window, less overhead
# Typical: every 1,000-10,000 events OR every 1-5 minutes for streaming jobs
# For batch jobs: checkpoint after each stage boundary — Spark does this automatically`}
        </CodeBox>

        <SubTitle>Idempotency and exactly-once in pipelines</SubTitle>

        <Para>
          Checkpointing tells you where to resume. Idempotency determines
          whether resuming from a checkpoint produces correct output even if
          some work gets redone. If your pipeline is not idempotent, resuming
          from a checkpoint can produce duplicate records, double-counted
          aggregations, or inconsistent state — even though the checkpoint
          itself is correct.
        </Para>

        <CodeBox label="idempotent pipeline stage — the contract">
{`# Non-idempotent (WRONG — unsafe after checkpoint restore):
def write_order_count(date: str, count: int):
    execute_sql(
        "UPDATE daily_stats SET order_count = order_count + %s WHERE date = %s",
        [count, date]
    )
    # If this runs twice (checkpoint restored after this line), count is doubled

# Idempotent (CORRECT — safe to run multiple times):
def write_order_count(date: str, count: int, pipeline_run_id: str):
    execute_sql("""
        INSERT INTO daily_stats (date, order_count, pipeline_run_id)
        VALUES (%s, %s, %s)
        ON CONFLICT (date) DO UPDATE
            SET order_count = EXCLUDED.order_count,
                pipeline_run_id = EXCLUDED.pipeline_run_id
        WHERE daily_stats.pipeline_run_id != EXCLUDED.pipeline_run_id
    """, [date, count, pipeline_run_id])
    # If this runs twice with the same pipeline_run_id:
    # The WHERE clause on pipeline_run_id prevents the second update from doing anything
    # Exactly-once semantics achieved through idempotent writes

# The pattern: make writes conditional on not having already applied this exact computation
# Mechanism: pipeline run ID, event ID, sequence number, or content hash as idempotency key`}
        </CodeBox>

        <SubTitle>Failure types — what actually fails in production</SubTitle>

        <Table
          headers={[
            'Failure type',
            { label: 'What it looks like', color: '#ff4757' },
            'Recovery strategy',
          ]}
          rows={[
            {
              '0': 'Node crash',
              '1': 'Machine reboots, process killed by OOM killer, hardware failure. Sudden, complete.',
              '2': 'Checkpoint + restart. Kafka consumer group rebalances. Spark job retries failed stage.',
            },
            {
              '0': 'Slow node (straggler)',
              '1': 'Node responds but 10x slower than others. Job completion waits for the slowest node.',
              '2': 'Speculative execution — launch a duplicate task on another node, take whichever finishes first.',
            },
            {
              '0': 'Network partition',
              '1': 'Two groups of nodes cannot communicate. Both groups think they are the leader.',
              '2': 'Fencing tokens, STONITH (Shoot the Other Node in the Head), or refusing writes until partition heals.',
            },
            {
              '0': 'Byzantine failure',
              '1': 'A node behaves incorrectly — returns wrong data, corrupts writes, sends conflicting messages to different nodes.',
              '2': 'Byzantine fault-tolerant consensus (rare in data engineering — assumes nodes fail cleanly, not maliciously).',
            },
            {
              '0': 'Gray failure',
              '1': 'A node is partially failed — responds to health checks, but fails under actual load. Hardest to detect.',
              '2': 'Application-level health checks. Monitor actual latency, not just heartbeats. Circuit breakers.',
            },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 08 — Consensus Protocols ───────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Consensus" />
        <SectionTitle>Consensus Protocols — How Distributed Nodes Agree on Anything</SectionTitle>

        <Para>
          Consensus is the problem of getting multiple nodes to agree on a
          single value, even when some nodes are slow or have crashed. This
          sounds simple. It is provably difficult — the FLP impossibility result
          (Fischer, Lynch, Paterson, 1985) proves that in an asynchronous
          distributed system, consensus is impossible if even one node can fail.
          Real systems work around this by relaxing the asynchrony assumption —
          they assume that eventually, messages arrive.
        </Para>

        <Para>
          You will never implement a consensus protocol as a data engineer.
          But consensus protocols run inside almost every tool you use, and
          knowing what they do explains their behaviour, their latency
          characteristics, and their failure modes.
        </Para>

        <SubTitle>What consensus is used for in your stack</SubTitle>

        <Table
          headers={['System', 'Consensus use', 'Protocol']}
          rows={[
            {
              '0': 'Kafka (KRaft mode)',
              '1': 'Electing partition leaders. Committing changes to cluster metadata (which broker is leader for which partition). In KRaft mode (Kafka 3.3+), Kafka uses Raft internally — no more ZooKeeper dependency.',
              '2': 'Raft',
            },
            {
              '0': 'ZooKeeper (legacy Kafka)',
              '1': 'Distributed coordination — storing broker metadata, electing the Kafka controller, storing consumer group offsets (pre-Kafka 0.9).',
              '2': 'ZAB (ZooKeeper Atomic Broadcast) — similar to Paxos',
            },
            {
              '0': 'etcd (Airflow, Kubernetes)',
              '1': 'Airflow uses etcd or a database for distributed scheduler locking — ensuring only one scheduler instance runs a DAG at a time. Kubernetes uses etcd for all cluster state.',
              '2': 'Raft',
            },
            {
              '0': 'CockroachDB / Spanner',
              '1': 'Every write is a distributed transaction requiring consensus across replicas before acknowledging. This is what makes them strongly consistent globally.',
              '2': 'Raft (CockroachDB) / Paxos variant (Spanner)',
            },
            {
              '0': 'Delta Lake / Iceberg',
              '1': 'Optimistic concurrency control for table commits — uses cloud object storage conditional writes (S3 conditional put) as a lightweight consensus mechanism.',
              '2': 'Storage-level conditional writes (not a full consensus protocol)',
            },
          ]}
        />

        <SubTitle>Raft — the readable consensus protocol</SubTitle>

        <Para>
          Raft was designed to be understandable — it was published with the
          explicit goal of being easier to teach than Paxos. You don't need to
          implement it, but reading the Raft paper (Ongaro and Ousterhout, 2014)
          will give you a concrete mental model for how any consensus-based
          system behaves under failures.
        </Para>

        <Para>
          The key concepts in Raft that affect you as a data engineer: a cluster
          elects one leader at a time via a term-based election. The leader
          handles all writes and replicates them to followers. A write is committed
          when a majority of nodes (quorum) have written it to their logs. If the
          leader fails, a new election occurs. During the election window
          (typically 150–300ms), writes are rejected. This is the source of the
          brief unavailability you see when a Kafka broker is replaced — the 
          partition leader election takes a few hundred milliseconds.
        </Para>
      </section>

      <Divider />

      {/* ── Part 09 — The Saga Pattern ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Distributed Transactions" />
        <SectionTitle>The Saga Pattern — Distributed Transactions Without Two-Phase Commit</SectionTitle>

        <Para>
          A transaction in a single database is atomic — either all operations
          succeed or all are rolled back. Across multiple independent services
          with independent databases, there is no built-in transaction boundary.
          An order being placed at Swiggy involves: deducting from the customer's
          wallet (payment service), creating the order record (order service),
          deducting from restaurant inventory (inventory service), and assigning
          a delivery partner (logistics service). All four must succeed, or the
          system is in an inconsistent state.
        </Para>

        <Para>
          Two-Phase Commit (2PC) is the classic solution: a coordinator tells
          all participants to "prepare" (lock their resources), then tells them
          all to "commit" simultaneously. If any participant fails, all roll
          back. This works but has severe problems at scale: the coordinator
          is a single point of failure, locking resources across services blocks
          throughput, and if the coordinator crashes between prepare and commit,
          all participants are permanently locked waiting for a decision that
          never comes.
        </Para>

        <Para>
          The Saga pattern is the modern alternative. A saga is a sequence of
          local transactions, each in its own service, connected by events.
          If any step fails, the saga executes compensating transactions —
          undoing the completed steps in reverse order. There is no global
          lock, no coordinator bottleneck, and no two-phase protocol.
        </Para>

        <CodeBox label="saga pattern — choreography style">
{`# Swiggy order placement — choreography-based saga
# Each service listens for events and publishes its own events
# No central coordinator

# Step 1 — Order Service
# Receives HTTP request to place order
# Creates order in PENDING state in its own database
# Publishes event: order.placement.requested

# Step 2 — Payment Service
# Listens for: order.placement.requested
# Attempts to deduct from wallet
# SUCCESS → publishes: payment.completed  (order_id, amount)
# FAILURE → publishes: payment.failed     (order_id, reason)

# Step 3 — Inventory Service
# Listens for: payment.completed
# Deducts item quantities from restaurant inventory
# SUCCESS → publishes: inventory.reserved  (order_id)
# FAILURE → publishes: inventory.failed    (order_id, reason)
#           → Compensating transaction: publish payment.refund.requested

# Step 4 — Order Service
# Listens for: inventory.reserved
# Updates order state to CONFIRMED
# Publishes: order.confirmed → triggers notification, logistics assignment

# ── Failure path — compensating transactions ─────────────────────────────────
# Inventory reservation fails AFTER payment was taken:

# Inventory Service publishes: inventory.failed
# Payment Service listens for: inventory.failed
# Payment Service REFUNDS the charge → publishes: payment.refunded
# Order Service listens for: payment.refunded
# Order Service marks order as CANCELLED → publishes: order.cancelled
# Notification Service sends: "Sorry, items unavailable — refund initiated"

# Each compensating transaction is also an event in the same Kafka topic
# The full saga history is the append-only event log — perfect audit trail
# No global lock ever held. Each service only locks its own resources.`}
        </CodeBox>

        <Para>
          The Saga pattern's trade-off: sagas are eventually consistent, not
          immediately consistent. Between the time payment is deducted and the
          time inventory fails, there is a brief window where the system is
          in an intermediate state. A well-designed saga makes this window
          as short as possible and handles all failure cases explicitly —
          including partial failures that are neither complete success nor
          complete failure.
        </Para>

        <Callout type="tip">
          Sagas work because each step is idempotent and each compensating
          transaction is also idempotent. If the payment refund event is
          delivered twice, the payment service only refunds once (it checks
          whether the refund has already been applied). Without idempotency,
          compensating transactions can cause more damage than the original
          failure they are trying to undo.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 10 — Clocks and Time ────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Clocks" />
        <SectionTitle>Clocks in Distributed Systems — Why You Cannot Trust a Timestamp</SectionTitle>

        <Para>
          Every node in a distributed system has its own clock. Those clocks
          are never perfectly synchronised. NTP (Network Time Protocol) keeps
          clocks within roughly 10–100ms of each other in practice. But 100ms
          is a long time at the event rates modern data systems operate at —
          a Kafka topic receiving 100,000 events per second produces 10,000
          events in 100ms. If two nodes' clocks disagree by 100ms, events
          from two nodes can appear in the wrong order when sorted by timestamp.
        </Para>

        <Para>
          This is not a theoretical concern. It is why the financial industry
          uses logical clocks (Lamport timestamps, vector clocks) rather than
          wall-clock timestamps for event ordering in critical systems. It is
          why Google Spanner uses atomic clocks and GPS receivers (TrueTime API)
          to bound clock uncertainty and provide globally ordered timestamps.
          It is why databases use transaction IDs (monotonic counters) rather
          than timestamps for ordering concurrent transactions.
        </Para>

        <CodeBox label="clock skew — how it breaks your pipeline">
{`# Two Kafka producers on different servers, clocks skewed by 80ms

# Server A (clock: 14:23:11.000):
# Produces event: order ORD-001 placed at 14:23:11.000

# Server B (clock: 14:23:10.920, 80ms behind):
# Produces event: order ORD-002 placed at 14:23:10.920

# Both events arrive at the Kafka broker within milliseconds of each other
# But ORD-002's event_time is EARLIER than ORD-001's, even though it was produced LATER
# A consumer sorting by event_time sees ORD-002 before ORD-001 — out of order

# This breaks any logic like:
# "What was the last order before ORD-001?" → might incorrectly return ORD-003
# "What was the total revenue in the 1 second before ORD-001?" → might include ORD-003

# Symptoms in production:
# Windowed aggregations with small windows return slightly wrong counts
# "First order of the day" queries return different results at different times
# Joins on timestamps produce unexpected missing rows

# Solutions:
# 1. Use event time with a watermark (covers clock skew within the watermark window)
#    If watermark = 5 minutes, events up to 5 minutes late are still included correctly
# 2. Use monotonic logical clocks where strict ordering is required
#    (e.g., database transaction IDs, Lamport timestamps)
# 3. Use Kafka's log offset as the ordering key (not event_time)
#    → Guaranteed ordered within a partition, even with clock skew
# 4. NTP synchronisation + monitoring clock drift on all producer machines
#    → Alert if any machine's clock drifts > 50ms`}
        </CodeBox>
      </section>

      <Divider />

      {/* ── Part 11 — What This Looks Like at Work ───────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — What This Looks Like at Work" />
        <SectionTitle>What This Looks Like on Day One</SectionTitle>

        <HighlightBox>
          <Para>
            <strong>At a data platform team (Flipkart / Meesho):</strong>
            A Spark job is running correctly in staging but producing
            incorrect aggregation results in production. You investigate
            and discover the production orders table has severe data skew —
            one enterprise B2B customer accounts for 30% of all orders.
            After the shuffle join, one executor processes 30% of the dataset
            while others process 0.7% each. The straggler completes last,
            but because it has been running under memory pressure for 4 hours,
            it has been spilling to disk and producing slightly corrupted
            partial aggregations. The fix is salting the join key. Understanding
            shuffle joins and data skew is what lets you find this in 2 hours
            instead of 2 weeks.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <Para>
            <strong>At a fintech during an incident (Razorpay):</strong>
            The payment database's follower replica is 4 minutes behind the
            leader. A downstream analytics pipeline that reads from the follower
            is showing payment counts from 4 minutes ago. Someone suggests
            querying the leader directly. You push back — the leader is handling
            production write traffic and adding read queries to it risks
            impacting payment processing latency. Instead you identify why
            the follower is lagging: a long-running analytical query is blocking
            WAL replay. You kill the query, the follower catches up in seconds.
            Understanding leader-follower replication and replication lag is
            what makes you the person who solves the incident, not the person
            who makes it worse.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <Para>
            <strong>In a system design interview:</strong> "Design a distributed
            pipeline that processes 10 million orders per day and guarantees
            that each order is counted exactly once in the daily revenue report,
            even if nodes fail mid-processing." The interviewer is listening
            for: checkpointing strategy (how far back do you replay on failure),
            idempotent writes (why an upsert on order_id is needed, not an
            INSERT), delivery semantics (at-least-once delivery with idempotent
            consumers = exactly-once behaviour), and partition strategy
            (what is the partition key, how do you avoid hot partitions).
            Every one of these is covered in this module and the modules before it.
          </Para>
        </HighlightBox>
      </section>

      <KeyTakeaways items={[
        'CAP theorem: a distributed system can guarantee at most two of Consistency, Availability, and Partition Tolerance. Since network partitions are unavoidable, the real choice is between consistency and availability during a partition. CP systems reject requests to stay consistent; AP systems respond with potentially stale data.',
        'Consistency is a spectrum: linearisable (every read sees the latest write, globally) → serialisable → read-your-writes → monotonic reads → eventual (replicas converge eventually, no timing guarantee). Financial data needs strong consistency; analytics dashboards tolerate eventual consistency.',
        'Leader-follower replication routes all writes to one leader and replicates to followers. Reads from followers may be stale — replication lag is normal. High lag means the follower is struggling. Route time-critical reads to the leader.',
        'Multi-leader replication allows writes from multiple nodes but creates write conflicts. Last-write-wins silently discards data. Conflict-free resolution requires CRDTs or application-level merge logic.',
        'Leaderless replication uses quorums: W + R > N guarantees that at least one node in every read quorum has the latest write. Tuning W and R trades consistency for latency and availability.',
        'Hash partitioning distributes data evenly for high-cardinality keys. Range partitioning enables efficient range scans. Hot partitions occur when the partition key has low cardinality or monotonically increases — one of the most common performance problems in distributed data systems.',
        'Shuffle joins require all-to-all network data transfer to co-locate matching rows. This is the most expensive operation in distributed processing. Broadcast joins eliminate the shuffle for small tables. Data skew causes stragglers — salt the join key to distribute hot keys across multiple partitions.',
        'Checkpointing saves computation state to durable storage. On failure, resume from the last checkpoint — not from the beginning. Checkpoints are only useful if your processing is idempotent; otherwise resuming from a checkpoint produces duplicate results.',
        'Consensus protocols (Raft, Paxos) are used internally by Kafka KRaft, ZooKeeper, etcd, and CockroachDB to elect leaders and commit changes across replicas. A consensus round-trip is the source of the brief unavailability during leader elections.',
        'The Saga pattern handles distributed transactions across multiple services without two-phase commit. Each step is a local transaction. Failures trigger compensating transactions in reverse order. Every step and compensation must be idempotent because events can be delivered more than once.',
      ]} />

    </LearnLayout>
  )
}