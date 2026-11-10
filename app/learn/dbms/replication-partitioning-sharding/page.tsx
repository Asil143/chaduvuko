import { WithLessonNav } from '@/components/content/WithLessonNav'
import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Replication, Partitioning and Sharding | DBMS',
  description:
    'Compare database replication, table partitioning, and sharding; learn their PostgreSQL patterns, consistency trade-offs, routing choices, and production failure modes.',
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'Syne, sans-serif', lineHeight: 1.2 }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700, letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12 }}>{children}</h3>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 20 }}>
    {label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}
    <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text2)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}><code>{children}</code></pre>
  </div>
)

const BulletList = ({ items }: { items: string[] }) => (
  <ul style={{ paddingLeft: 22, margin: '0 0 22px', color: 'var(--text)', lineHeight: 1.9, fontSize: 15 }}>
    {items.map(item => <li key={item} style={{ marginBottom: 8 }}>{item}</li>)}
  </ul>
)

export default function ReplicationPartitioningSharding() {
  return (
    <WithLessonNav href="/learn/dbms/replication-partitioning-sharding">
      <LearnLayout
        title="Replication, Partitioning and Sharding"
        description="Three different ways to change database capacity and failure behavior: copy the data, divide a table, or distribute rows across independent database nodes."
        section="DBMS"
        readTime="40–45 min"
      >
        <section style={{ marginBottom: 64 }}>
          <SectionTag text="// Part 01 — Start with the bottleneck" />
          <SectionTitle>These techniques solve different problems</SectionTitle>
          <Para>
            A growing order database can hit several limits: reads overwhelm one server, old records make maintenance expensive, a single machine cannot store the full data set, or one hardware failure makes the service unavailable. The right response depends on which limit is real. Replication copies data to another server. Partitioning divides one logical table into manageable pieces, usually inside the same database. Sharding distributes subsets of rows across multiple independent database nodes.
          </Para>
          <Para>
            These words are often mixed together, but the distinctions matter. Replicas contain overlapping copies; partitions contain different portions of a table; shards are partitions whose storage and query execution are distributed across servers. Some systems combine approaches—for example, each shard can itself have replicas—but each added layer creates operational responsibilities.
          </Para>
          <Callout type="info">
            Prerequisites: understand indexes, transactions, query plans, and the distributed-database concepts of consistency and replication. Scale up a well-measured database before adding distribution: a missing index or an N+1 query is not fixed by creating more database nodes.
          </Callout>
          <div style={{ overflowX: 'auto', marginBottom: 24 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, lineHeight: 1.7 }}>
              <thead><tr style={{ background: 'var(--bg2)', textAlign: 'left' }}>
                {['Technique', 'What is divided or copied?', 'Common goal', 'New cost'].map(h => <th key={h} style={{ padding: 12, border: '1px solid var(--border)', color: 'var(--text)' }}>{h}</th>)}
              </tr></thead>
              <tbody>
                {[
                  ['Replication', 'The same data is copied to another server', 'Availability, disaster recovery, read capacity', 'Lag, failover coordination, duplicate storage'],
                  ['Partitioning', 'Rows (or sometimes columns) within a logical table', 'Pruning, retention, maintenance, very large tables', 'Partition design and additional planning/management'],
                  ['Sharding', 'Different rows are assigned to different database nodes', 'Capacity beyond one node; distributed write throughput', 'Routing, cross-shard operations, rebalancing'],
                ].map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} style={{ padding: 12, border: '1px solid var(--border)', color: 'var(--text2)', verticalAlign: 'top' }}>{cell}</td>)}</tr>)}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: 64 }}>
          <SectionTag text="// Part 02 — Replication copies state" />
          <SectionTitle>Primary and standby: the copy is useful only if you understand its lag</SectionTitle>
          <Para>
            In primary/standby replication, the primary accepts writes and sends the changes needed to maintain another database. PostgreSQL physical streaming replication ships WAL records so a standby can replay the primary's cluster-wide changes. A hot standby can serve read-only queries while it follows the primary. Logical replication instead publishes logical row changes for selected tables to a subscriber; it can support selective data movement, but schema changes and sequence state need their own operational plan.
          </Para>
          <Para>
            Asynchronous replication lets the primary acknowledge a commit without waiting for a standby to confirm it. That reduces write latency, but the standby may be behind. If the primary fails, a failover can lose recently acknowledged writes that had not reached the promoted standby. Synchronous replication waits for acknowledgements from configured synchronous standbys according to the chosen commit behavior. That can reduce the acknowledged-data-loss window, but adds latency and can make writes wait when required standbys are unavailable. Read the actual configuration and failure assumptions; the word &quot;synchronous&quot; is not a substitute for a recovery design.
          </Para>
          <CodeBox label="Check whether a server is a standby">
{`-- On PostgreSQL, true means this server is in recovery
-- (for example, operating as a standby).
SELECT pg_is_in_recovery();

-- On the primary, inspect connected WAL senders and their state.
SELECT application_name, state, sync_state,
       write_lag, flush_lag, replay_lag
FROM pg_stat_replication;`}
          </CodeBox>
          <Para>
            Lag affects application behavior. A user who saves a profile and immediately reads it from a lagging replica can see the old profile. Route read-after-write requests to the primary, or use a consistency mechanism that waits until the replica has replayed the relevant commit. Replica routing should be an explicit policy, not a random load-balancer decision.
          </Para>
          <CodeBox label="Application routing policy — pseudocode">
{`if (request.isWrite || request.requiresReadYourWrites) {
  return primary.query(request.sql, request.params);
}

const replica = replicaPool.chooseHealthyReplica();
return replica.query(request.sql, request.params);`}
          </CodeBox>
          <Para>
            A standby is not automatically a backup. Deletes and corrupted data can replicate too, and an operator can promote the wrong node. Keep independent backups and test point-in-time recovery. Automated failover also needs health checks, fencing so the old primary cannot accept writes after promotion, and a controlled way to route clients to the new primary; otherwise both sides can accept conflicting writes (split brain).
          </Para>
          <Callout type="warning">
            Do not claim zero data loss from an asynchronous replica, and do not promise high availability just because a second server exists. Verify replica health, replication mode, failure domains, promotion procedure, and restore tests.
          </Callout>
        </section>

        <section style={{ marginBottom: 64 }}>
          <SectionTag text="// Part 03 — Partitioning keeps one table manageable" />
          <SectionTitle>Partition by a key that matches real query and retention patterns</SectionTitle>
          <Para>
            Partitioning creates one logical table backed by multiple physical partitions. In PostgreSQL's declarative table partitioning, the parent defines a partition key and child tables hold non-overlapping key ranges or values. Common strategies are RANGE (often dates), LIST (a finite category), and HASH (distribute key values across a fixed set of partitions). The application can query the parent; the planner can prune partitions that cannot contain matching rows when the query includes suitable predicates.
          </Para>
          <CodeBox label="Create a range-partitioned orders table">
{`CREATE TABLE orders (
  order_id bigint NOT NULL,
  created_at timestamptz NOT NULL,
  customer_id bigint NOT NULL,
  total_paise bigint NOT NULL,
  status text NOT NULL,
  PRIMARY KEY (order_id, created_at)
) PARTITION BY RANGE (created_at);

CREATE TABLE orders_2026_01
  PARTITION OF orders
  FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

CREATE TABLE orders_2026_02
  PARTITION OF orders
  FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');`}
          </CodeBox>
          <Para>
            The range's lower bound is inclusive and its upper bound is exclusive, so adjacent monthly partitions meet without overlapping. The primary key includes the partition key because a PostgreSQL partitioned unique or primary-key constraint must include all partition-key columns; the database must be able to enforce uniqueness across partitions. If the business needs global uniqueness of <code>order_id</code> alone, design for that explicitly, for example with a separate globally unique identifier strategy and the right constraints.
          </Para>
          <CodeBox label="A query whose date predicate can prune partitions">
{`EXPLAIN
SELECT order_id, total_paise
FROM orders
WHERE created_at >= TIMESTAMPTZ '2026-02-01 00:00:00+00'
  AND created_at <  TIMESTAMPTZ '2026-03-01 00:00:00+00'
  AND customer_id = 7421;`}
          </CodeBox>
          <Para>
            Partition pruning is not a magic speed switch. A query that omits the partition key may need to visit many or all partitions. The planner still needs suitable indexes inside partitions for selective lookups. Keep partition bounds and time zones consistent, monitor partition count, and create upcoming partitions before the write path needs them. A backlog or missing partition can cause inserts to fail unless a suitable default partition exists.
          </Para>
          <CodeBox label="Other row-partitioning strategies">
{`-- LIST partitioning suits a small, stable set of values.
CREATE TABLE events (
  event_id bigint NOT NULL,
  region text NOT NULL,
  payload jsonb NOT NULL
) PARTITION BY LIST (region);

CREATE TABLE events_south PARTITION OF events
  FOR VALUES IN ('south');
CREATE TABLE events_other PARTITION OF events DEFAULT;

-- HASH partitioning spreads a key across a fixed partition count.
CREATE TABLE sessions (
  session_id uuid NOT NULL,
  user_id bigint NOT NULL,
  data jsonb NOT NULL
) PARTITION BY HASH (user_id);

CREATE TABLE sessions_h0 PARTITION OF sessions
  FOR VALUES WITH (MODULUS 4, REMAINDER 0);
CREATE TABLE sessions_h1 PARTITION OF sessions
  FOR VALUES WITH (MODULUS 4, REMAINDER 1);
CREATE TABLE sessions_h2 PARTITION OF sessions
  FOR VALUES WITH (MODULUS 4, REMAINDER 2);
CREATE TABLE sessions_h3 PARTITION OF sessions
  FOR VALUES WITH (MODULUS 4, REMAINDER 3);`}
          </CodeBox>
          <Para>
            Vertical partitioning is a different design: split frequently accessed columns from rarely used or large columns into related tables, joined by a key. It can reduce row width for hot queries, but adds joins and consistency concerns. PostgreSQL declarative partitioning is primarily about dividing rows of one logical table; it does not automatically move child partitions to separate servers.
          </Para>
          <Callout type="tip">
            Use partitioning when it improves a measured query, retention, or maintenance problem. Partitioning every table pre-emptively makes schema changes and operations more complicated without guaranteeing faster queries.
          </Callout>
        </section>

        <section style={{ marginBottom: 64 }}>
          <SectionTag text="// Part 04 — Sharding distributes rows" />
          <SectionTitle>Sharding makes the application or a routing layer part of the database design</SectionTitle>
          <Para>
            A shard is an independent database node that owns a subset of the rows. A request needs a shard key and a routing rule. If customer data is sharded by <code>customer_id</code>, a request that knows the customer can go directly to one node. An analytics query that asks for all customers may have to fan out to every shard and merge results. Joins and transactions that cross shards require distributed coordination or application-level alternatives, and can be much more expensive than a local join or transaction.
          </Para>
          <Para>
            A good shard key has high enough cardinality to distribute load, appears in common access paths, and keeps related records together. It should not create a single hot shard. Sharding by a monotonically increasing timestamp can direct all new writes to the newest range; sharding by a tenant ID can overload one shard if one tenant is much larger or busier than others. These are workload properties to measure, not just schema choices.
          </Para>
          <CodeBox label="Stable hash routing — simplified application example">
{`import hashlib


def shard_for(customer_id: int, shard_count: int) -> int:
    key = str(customer_id).encode("utf-8")
    digest = hashlib.sha256(key).digest()
    bucket = int.from_bytes(digest[:8], "big")
    return bucket % shard_count

# Route every table for a customer using the same key:
# customers, orders, and addresses stay co-located.
shard_index = shard_for(customer_id=7421, shard_count=8)`}
          </CodeBox>
          <Para>
            This modulo example is intentionally simple: changing the shard count changes the destination for many keys, so adding a node can require a large data movement and coordinated cutover. Consistent hashing or an indirection layer (a directory mapping key ranges/buckets to nodes) can reduce or control movement, but neither removes the need to copy data, verify it, and switch reads and writes safely. Plan migrations and rebalancing before growth makes them urgent.
          </Para>
          <Para>
            Choose whether shard-local uniqueness is enough. A primary key that is unique only within one shard is not globally unique; applications may use globally unique IDs, include the shard key in identifiers and constraints, or maintain a separate coordination service. Co-locating related rows makes common joins local, but can make a shard key hard to change later. Avoid cross-shard transactions where a domain workflow can instead use an outbox, idempotent commands, or a saga with explicit compensation and eventual consistency.
          </Para>
          <Callout type="example">
            For a multi-tenant learning platform, tenant ID can route each learner's courses and progress to one shard, making tenant-scoped requests straightforward. A very large tenant may become a hot shard; a global course catalog or platform-wide analytics query still needs a separate strategy.
          </Callout>
        </section>

        <section style={{ marginBottom: 64 }}>
          <SectionTag text="// Part 05 — Choose the smallest useful step" />
          <SectionTitle>A decision path for an order platform</SectionTitle>
          <Para>
            Start with observed symptoms. If reports or dashboards overload the primary but transactional reads are fine, consider a read replica and route only queries that tolerate replica lag. If one append-heavy table makes retention or date-range scans costly, consider range partitioning by time and test partition pruning. If the data set or write rate has exceeded what a single database node can serve after sensible tuning, and requests naturally include a stable customer or tenant key, evaluate sharding with a measured migration plan.
          </Para>
          <Para>
            These choices can be combined: each shard might have a primary and standby, and a large table on each shard can have local partitions. But the systems are not interchangeable. Replicas improve redundancy and may spread reads, but do not increase the primary's write capacity. Partitions organize one database's table; by themselves they do not increase the total capacity of one server. Shards distribute storage and work but introduce cross-node complexity.
          </Para>
          <SubTitle>Questions to answer before production rollout</SubTitle>
          <BulletList items={[
            'What measured bottleneck are we addressing, and what baseline metric will prove the change helped?',
            'Which reads can accept stale data? What is the required read-after-write behavior?',
            'How will backups, restore, failover, fencing, and point-in-time recovery work during an actual outage?',
            'For partitions, which predicate drives pruning, and who creates, indexes, archives, and removes partitions?',
            'For shards, how are keys routed, globally unique IDs generated, hot keys handled, and data rebalanced?',
            'What happens when a query spans many partitions or shards, and what is the explicit timeout / partial-result policy?',
          ]} />
        </section>

        <section style={{ marginBottom: 64 }}>
          <SectionTag text="// Part 06 — Common mistakes & practice" />
          <SectionTitle>Protect correctness while changing topology</SectionTitle>
          <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
            {[
              { mistake: 'Calling a read replica a backup.', cause: 'Accidental deletes, bad migrations, and logical corruption can be copied to the replica.', fix: 'Keep independent, retained backups and regularly test restores; use replicas for availability/read load, not as the only recovery copy.' },
              { mistake: 'Sending every read to a replica immediately after a write.', cause: 'Asynchronous replicas can lag, so a user may not see their own committed change.', fix: 'Route read-after-write work to the primary or use a documented consistency wait before reading from a replica.' },
              { mistake: 'Partitioning by a convenient column without checking access patterns.', cause: 'Queries without the partition key may scan every child table, while too many partitions increase planning and maintenance overhead.', fix: 'Use representative EXPLAIN plans and measured workload/retention needs to validate the partition key and count.' },
              { mistake: 'Sharding before designing cross-shard behavior.', cause: 'Global joins, unique constraints, transactions, and rebalancing become application or distributed-system problems.', fix: 'Document routing and failure semantics first; preserve shard-local workflows and test migration/recovery procedures.' },
            ].map(item => <div key={item.mistake} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #f97316', borderRadius: 10, padding: '16px 20px' }}>
              <Para><strong>Mistake:</strong> {item.mistake}</Para><Para><strong>Why it fails:</strong> {item.cause}</Para><Para><strong>Better approach:</strong> {item.fix}</Para>
            </div>)}
          </div>
          <SubTitle>Practice — design, test, and explain</SubTitle>
          <BulletList items={[
            'Draw a primary with two asynchronous replicas. Mark which reads can go to replicas, how a read-after-write request is handled, and what committed data could be missing after failover.',
            'Create a monthly range-partitioned events table in a disposable PostgreSQL database. Run EXPLAIN with and without a date predicate and compare which partitions are scanned.',
            'Choose a shard key for a multi-tenant application. Explain the common queries it localizes, one hot-key risk, and how you would move an oversized tenant.',
            'List the unique constraints and joins that become difficult after sharding an orders and order_items schema. Propose a co-location strategy and identifier format.',
            'Write a rollout checklist for adding a partition or shard: deploy schema, copy/backfill, verify counts/checksums, route traffic, monitor, and define rollback conditions.',
          ]} />
        </section>

        <KeyTakeaways items={[
          'Replication copies data; partitioning divides a logical table; sharding distributes row subsets across independent database nodes.',
          'Asynchronous replication can lag and lose recent acknowledged primary commits on failover. Synchronous acknowledgement trades latency/availability for stronger commit durability assumptions.',
          'A read replica is not a backup, and failover requires health checks, fencing, promotion, and client routing to avoid split brain.',
          'PostgreSQL range, list, and hash partitioning can enable pruning and simpler retention, but only when query predicates and partition management match the design.',
          'A PostgreSQL partitioned primary/unique key must include the partition key; design global identity requirements deliberately.',
          'Sharding can scale storage and writes, but it makes routing, hot-key handling, global uniqueness, cross-shard joins/transactions, and rebalancing explicit design concerns.',
          'Measure the bottleneck first, preserve the required consistency, and rehearse backups, migrations, failover, and rollback before production traffic depends on the new topology.',
        ]} />
      </LearnLayout>
    </WithLessonNav>
  )
}
