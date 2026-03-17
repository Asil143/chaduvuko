import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Distributed Databases & CAP Theorem — Complete Guide | DBMS | Chaduvuko',
  description:
    'Distributed databases from first principles — CAP theorem proof and nuances, PACELC, consistency models, replication strategies, sharding, distributed transactions, two-phase commit, consensus protocols, and every interview pattern with real system examples.',
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.14em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: 'var(--font-mono)', marginBottom: 10,
  }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(20px, 2.5vw, 28px)',
    fontWeight: 900, letterSpacing: '-1px',
    color: 'var(--text)', marginBottom: 18,
    fontFamily: 'Syne, sans-serif', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(16px, 1.8vw, 20px)',
    fontWeight: 700, letterSpacing: '-0.3px',
    color: 'var(--text)', marginBottom: 12,
  }}>{children}</h3>
)

const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{
    fontSize: 15, fontWeight: 700,
    color: 'var(--text)', marginBottom: 10,
  }}>{children}</h4>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontSize: 15, color: 'var(--text)',
    lineHeight: 1.9, marginBottom: 20,
  }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 20 }}>
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
      fontSize: 13, lineHeight: 1.9, color: 'var(--text2)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

export default function DistributedDatabases() {
  return (
    <LearnLayout
      title="Distributed Databases & CAP Theorem"
      description="Why single-server databases stop being enough, what tradeoffs you face when data spans multiple machines, and the theorems that make those tradeoffs unavoidable."
      section="DBMS"
      readTime="90–110 min"
      updatedAt="March 2026"
    >

      {/* ========================================
          PART 1 — WHY DISTRIBUTED DATABASES
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 01 — The Problem" />
        <SectionTitle>Why Single-Server Databases Stop Being Enough</SectionTitle>

        <Para>
          Every database we have studied so far runs on a single server.
          One machine holds all the data, processes all queries, and handles
          all transactions. This is simple, correct, and sufficient for a vast
          number of applications — a startup with 100,000 users, an internal tool,
          a small e-commerce site. The single-server model works until it doesn't.
        </Para>

        <Para>
          Three distinct forces break the single-server model at scale, and each
          demands a different architectural response.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
          {[
            {
              force: 'Capacity',
              color: '#ff4757',
              problem: 'The dataset grows beyond what one machine can store. A social network with 2 billion users storing activity data — no single server has 100 petabytes of disk. An e-commerce site with 10 billion product images — one machine cannot hold them all.',
              solution: 'Horizontal scaling — distribute data across many machines. Each machine holds a partition (shard) of the total data. The system as a whole can grow by adding more machines.',
            },
            {
              force: 'Throughput',
              color: '#f97316',
              problem: 'Query load exceeds what one machine can handle. Razorpay processing 100,000 payment requests per second — one database server cannot serve all those requests within acceptable latency. A single CPU and disk can only do so much work per second.',
              solution: 'Read replicas — copy data to multiple servers and distribute read queries across them. Writes go to the primary, reads spread across many replicas. Total read throughput scales linearly with replica count.',
            },
            {
              force: 'Availability',
              color: '#8b5cf6',
              problem: 'Any single server eventually fails. Hardware fails, software crashes, data centres lose power. A system with one database server has a single point of failure — when it goes down, the entire application is unavailable.',
              solution: 'Replication — maintain copies of data on multiple machines in multiple locations. If one machine fails, others can take over. The system remains available even when individual components fail.',
            },
          ].map((item) => (
            <div key={item.force} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '18px 22px' }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)' }}>{item.force}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: item.color, background: `${item.color}12`, border: `1px solid ${item.color}30`, borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.07em' }}>Breaks single-server</span>
              </div>
              <Para><strong style={{ color: 'var(--text)' }}>Problem:</strong> {item.problem}</Para>
              <Para><strong style={{ color: item.color }}>Solution:</strong> {item.solution}</Para>
            </div>
          ))}
        </div>

        <Para>
          The moment data spans multiple machines, a new category of problems emerges that
          simply does not exist in single-server systems: the network connecting the machines
          is unreliable. Machines can be temporarily unreachable. A write to machine A
          may not immediately be visible on machine B. Two machines may have different
          views of the current state of the data. These problems have no perfect solution —
          they involve fundamental trade-offs that every distributed systems engineer
          must understand deeply.
        </Para>
      </section>

      {/* ========================================
          PART 2 — CAP THEOREM
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 02 — CAP Theorem" />
        <SectionTitle>The CAP Theorem — The Fundamental Constraint of Distributed Systems</SectionTitle>

        <Para>
          The CAP theorem, conjectured by Eric Brewer in 2000 and formally proved by
          Gilbert and Lynch in 2002, states that a distributed data system can provide
          at most two of the following three guarantees simultaneously during a network
          partition. Not two out of three as a design preference — two out of three as
          a mathematical impossibility. The third guarantee cannot be maintained.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 14, marginBottom: 28 }}>
          {[
            {
              letter: 'C',
              name: 'Consistency',
              color: '#0078d4',
              definition: 'Every read receives the most recently written value or an error. All nodes in the system see the same data at the same time. A read immediately after a write always returns that write\'s value — from any node in the system.',
              important: 'This is LINEARIZABILITY — stronger than eventual consistency. Every operation appears to take effect instantaneously at some point between its start and end.',
              notThis: 'NOT the C in ACID (which means constraint satisfaction). CAP-C means all replicas agree on the current value.',
            },
            {
              letter: 'A',
              name: 'Availability',
              color: 'var(--accent)',
              definition: 'Every request receives a response (not an error). The response may not contain the most recent data, but the system will not return a timeout or an error. Every non-failing node returns a response for all requests.',
              important: 'Availability means the system always responds. An unavailable system returns errors or timeouts. A highly available system returns responses even if they may be slightly stale.',
              notThis: 'NOT 99.9% uptime in the SLA sense. CAP-A means every request gets a non-error response from a non-failing node.',
            },
            {
              letter: 'P',
              name: 'Partition Tolerance',
              color: '#f97316',
              definition: 'The system continues operating even when network messages between nodes are lost or delayed arbitrarily. The system can sustain any number of messages being dropped by the network between nodes.',
              important: 'In any real distributed system, network partitions WILL happen. Dropping P is not a realistic option for internet-scale systems. P is essentially mandatory — which means the real choice is C vs A during a partition.',
              notThis: 'A partition is specifically a network failure causing communication breakdown — not a node failure. The nodes themselves may be running correctly but cannot communicate.',
            },
          ].map((item) => (
            <div key={item.letter} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ height: 3, background: item.color }} />
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 36, fontWeight: 900, color: item.color, fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>{item.letter}</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)' }}>{item.name}</span>
                </div>
                <Para><strong style={{ color: 'var(--text)' }}>Formal:</strong> {item.definition}</Para>
                <Para><strong style={{ color: item.color }}>Key insight:</strong> {item.important}</Para>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'Inter, sans-serif', lineHeight: 1.65, fontStyle: 'italic', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px' }}>⚠ {item.notThis}</div>
              </div>
            </div>
          ))}
        </div>

        <SubTitle>The Formal Proof — Why You Cannot Have All Three</SubTitle>

        <Para>
          The proof is surprisingly simple and illuminates exactly why the trade-off
          is unavoidable. Consider the most minimal possible distributed system:
          two nodes, N1 and N2, that share the same data and a network connecting them.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 16, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Proof by Contradiction</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { step: '1', color: '#0078d4', text: 'Setup: N1 and N2 both hold a variable V, initially V=0. A client can connect to either node to read or write V.' },
              { step: '2', color: '#0078d4', text: 'Partition: the network between N1 and N2 fails. They cannot communicate. (By assumption, we want Partition tolerance — the system should keep operating.)' },
              { step: '3', color: '#f97316', text: 'Write: a client writes V=1 to N1. N1 accepts the write. But N1 cannot inform N2 of this write (network is down).' },
              { step: '4', color: '#f97316', text: 'Read: another client reads V from N2. Now the system must choose:' },
              { step: '4a', color: '#ff4757', text: 'If N2 returns V=1 (consistent): N2 must have received the write somehow — but the network is partitioned. Impossible. N2 cannot return the updated value without network communication.' },
              { step: '4b', color: '#ff4757', text: 'If N2 returns V=0 (stale, inconsistent): the read did not return the most recent write. Consistency is violated.' },
              { step: '4c', color: '#ff4757', text: 'If N2 returns an error (refuses to answer): availability is violated. The system does not respond to a valid request.' },
              { step: '5', color: 'var(--accent)', text: 'Conclusion: there is no fourth option. During a partition, the system MUST choose between returning a stale response (sacrifice C, keep A) or returning an error (sacrifice A, keep C). It cannot maintain both C and A simultaneously during P.' },
            ].map((item) => (
              <div key={item.step} style={{ display: 'flex', gap: 12 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: item.color, flexShrink: 0, marginTop: 3 }}>{item.step}.</span>
                <Para>{item.text}</Para>
              </div>
            ))}
          </div>
        </div>

        <SubTitle>CP vs AP — The Real Architectural Choice</SubTitle>

        <Para>
          Since P (partition tolerance) is mandatory for any real distributed system
          (networks always eventually fail), the real engineering choice is:
          when a partition occurs, do you prioritise C (consistency) or A (availability)?
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(0,120,212,0.3)', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#0078d4', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>CP Systems</div>
            <Para>During a partition, the system refuses to answer rather than return stale data. Nodes that cannot confirm they have the latest data return errors. When the partition heals, the system reconciles and becomes available again.</Para>
            <Para><strong style={{ color: 'var(--text)' }}>Who uses this:</strong> HBase, Zookeeper, etcd, Consul, MongoDB (with writeConcern:majority). Any system where data correctness is more critical than always being reachable.</Para>
            <Para><strong style={{ color: 'var(--text)' }}>Real use case:</strong> Distributed configuration stores (etcd in Kubernetes), leader election, distributed locking. Wrong value is worse than no value.</Para>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--accent)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>AP Systems</div>
            <Para>During a partition, the system continues responding — but may return stale data. Nodes serve requests independently, accepting writes locally even if they cannot replicate. When the partition heals, conflicting updates are reconciled.</Para>
            <Para><strong style={{ color: 'var(--text)' }}>Who uses this:</strong> Cassandra, DynamoDB, CouchDB, Riak. Any system where always being reachable is more critical than always being exactly correct.</Para>
            <Para><strong style={{ color: 'var(--text)' }}>Real use case:</strong> Shopping cart (never reject adding an item), social media feeds, DNS, CDNs. Slightly stale is better than unavailable.</Para>
          </div>
        </div>

        <Callout type="warning">
          <strong>The most common CAP misconception:</strong> "We chose CP so we never
          have consistency issues." CAP only talks about behaviour
          <em> during a network partition</em>. When the network is healthy, a CP system
          can serve both consistent reads and available responses. The guarantee you give
          up is only relevant during the partition window. In practice, partitions are rare
          but inevitable. CAP tells you which property you are willing to sacrifice when
          they occur — not which property you permanently give up.
        </Callout>
      </section>

      {/* ========================================
          PART 3 — PACELC
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 03 — PACELC" />
        <SectionTitle>PACELC — The More Complete Framework That Replaces CAP</SectionTitle>

        <Para>
          The CAP theorem only addresses system behaviour during a network partition.
          But partitions are rare — what about the much more common case when the network
          is operating normally? Even without a partition, distributed systems face a
          trade-off between latency and consistency that CAP completely ignores.
        </Para>

        <Para>
          In 2012, Daniel Abadi proposed the
          <strong style={{ color: 'var(--accent)' }}> PACELC framework</strong> as a
          more complete characterisation. It says: in the case of a Partition (P),
          the system must choose between Availability (A) and Consistency (C)
          — as CAP says. But Else (E), even when the network is operating normally,
          the system must choose between Latency (L) and Consistency (C).
        </Para>

        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 24, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.4, overflowX: 'auto' }}>
          <div style={{ color: 'var(--muted)', marginBottom: 8 }}>// PACELC: If Partition → choose A or C; Else → choose L or C</div>
          <div>
            <span style={{ color: '#0078d4', fontWeight: 700 }}>PA/EL</span>
            <span style={{ color: 'var(--text2)' }}>: AP during partition + low latency else (sacrifice consistency both ways)</span>
          </div>
          <div>
            <span style={{ color: '#f97316', fontWeight: 700 }}>PA/EC</span>
            <span style={{ color: 'var(--text2)' }}>: AP during partition + consistent else (DynamoDB default, Cassandra)</span>
          </div>
          <div>
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>PC/EL</span>
            <span style={{ color: 'var(--text2)' }}>: CP during partition + low latency else (unusual — who is this?)</span>
          </div>
          <div>
            <span style={{ color: '#8b5cf6', fontWeight: 700 }}>PC/EC</span>
            <span style={{ color: 'var(--text2)' }}>: CP during partition + consistent else (Zookeeper, etcd, VoltDB)</span>
          </div>
        </div>

        <Para>
          The latency-consistency trade-off even without partitions arises from replication.
          To give a strongly consistent read (linearizable), the database must confirm
          the latest value with a quorum of replicas before responding — which takes
          multiple network round-trips. To give a low-latency read, the database can
          respond from the local replica immediately — which may be slightly stale.
          This trade-off exists permanently, not just during failures.
        </Para>

        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['System', 'Partition', 'Normal Operation', 'Notes'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', color: 'var(--muted)', fontWeight: 700, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['DynamoDB', 'PA — serves reads, may be stale', 'EL — low latency, eventual consistency', 'Tunable: strongly consistent reads available at higher latency'],
                ['Cassandra', 'PA — all nodes respond', 'EL/EC — tunable via consistency level', 'ONE=fast+stale, QUORUM=slower+consistent, ALL=slowest+strongest'],
                ['Zookeeper', 'PC — blocks during partition', 'EC — linearizable reads from leader', 'Leader-based, all writes go to leader, reads always consistent'],
                ['etcd', 'PC — refuses stale reads', 'EC — linearizable by default', 'Raft consensus, all reads confirm with majority'],
                ['MongoDB', 'PA or PC', 'EL or EC', 'Tunable via readConcern/writeConcern; majority=PC/EC'],
                ['PostgreSQL (single)', 'N/A — not distributed', 'EC — serializable isolation', 'Add streaming replication → PA/EC for reads from replicas'],
                ['Spanner (Google)', 'PC — TrueTime guarantees', 'EC — globally consistent', 'Uses GPS/atomic clocks to bound time uncertainty'],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '12px 14px', color: j === 0 ? 'var(--accent)' : 'var(--text)', fontFamily: j === 0 ? 'var(--font-mono)' : 'Inter, sans-serif', fontSize: 13, fontWeight: j === 0 ? 700 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================
          PART 4 — CONSISTENCY MODELS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 04 — Consistency Models" />
        <SectionTitle>Consistency Models — The Spectrum From Strong to Eventual</SectionTitle>

        <Para>
          Consistency in distributed systems is not binary. There is a spectrum of
          consistency models, from the strongest (linearizability) to the weakest
          (eventual consistency), with multiple models in between. Understanding
          this spectrum is essential because different parts of a system may require
          different consistency guarantees.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
          {[
            {
              model: 'Linearizability (Strong Consistency)',
              color: '#0078d4',
              strength: 'Strongest',
              definition: 'Every operation appears to execute instantaneously at a single point in time between its start and finish. The system behaves as if there is only one copy of the data. Any read returns the result of the most recent completed write.',
              guarantee: 'Read your own writes: always. Sequential consistency: guaranteed. CAP-C compliant: yes.',
              cost: 'Highest latency — requires coordination (quorum reads/writes or leader-based). Cannot be maintained during partitions.',
              example: 'Zookeeper, etcd. Getting a distributed lock: you must read the current lock holder and be certain of its correctness — stale is not acceptable.',
            },
            {
              model: 'Sequential Consistency',
              color: '#8b5cf6',
              strength: 'Strong',
              definition: 'All operations appear to execute in some sequential order consistent with each process\'s program order. All processes agree on the same global ordering of operations. But operations don\'t need to appear to happen instantaneously.',
              guarantee: 'All nodes see the same order of operations. A node\'s own operations appear in order. But the global ordering can be "delayed" — a write may not be visible to other nodes immediately.',
              cost: 'High — requires agreement on operation ordering across all nodes.',
              example: 'Less common in practice. Some shared memory systems implement sequential consistency.',
            },
            {
              model: 'Causal Consistency',
              color: '#f97316',
              strength: 'Medium',
              definition: 'Operations that are causally related must be seen in the correct order by all nodes. If write W1 happened before write W2 (W2 may have read W1\'s value, or a message was sent between them), all nodes see W1 before W2. Concurrent (causally unrelated) operations may be seen in any order.',
              guarantee: 'If you see write W2, you will also see all writes that causally preceded W2. "Happens before" order is preserved.',
              cost: 'Moderate — track causal dependencies (vector clocks, version vectors). No global coordination needed for concurrent operations.',
              example: 'Consistent prefix reads in MongoDB, some distributed chat systems. Comments always appear after the post they reply to.',
            },
            {
              model: 'Read-Your-Writes (Session Consistency)',
              color: '#facc15',
              strength: 'Practical Middle Ground',
              definition: 'A client always sees its own writes. Writes performed by session S are visible to subsequent reads by session S. Other clients may see stale data, but you never see your own write disappear.',
              guarantee: 'Your own writes are always visible to you. Other sessions may be behind.',
              cost: 'Low — route a session\'s reads to the node it wrote to, or use session tokens to track write position.',
              example: 'Most web applications. After posting a tweet, you immediately see it in your feed even if other users are slightly delayed.',
            },
            {
              model: 'Eventual Consistency',
              color: 'var(--accent)',
              strength: 'Weakest (but most scalable)',
              definition: 'If no new writes are made to an item, eventually all reads of that item will return the last written value. There is no guarantee of how long "eventually" takes — it could be milliseconds or hours. During the convergence window, different nodes may return different values.',
              guarantee: 'System will eventually converge to the same state if writes stop. No guarantee on timing. No guarantee on ordering of concurrent writes.',
              cost: 'Lowest — no coordination needed. Maximum availability and throughput.',
              example: 'DNS, CDN caches, Cassandra with consistency level ONE, DynamoDB default. Like count on a social media post: slightly stale is acceptable.',
            },
          ].map((item) => (
            <div key={item.model} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '18px 22px' }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)' }}>{item.model}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: item.color, background: `${item.color}12`, border: `1px solid ${item.color}30`, borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.07em' }}>{item.strength}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 10 }}>
                {[
                  ['Definition', item.definition],
                  ['Guarantee', item.guarantee],
                  ['Cost', item.cost],
                  ['Used By', item.example],
                ].map(([label, value]) => (
                  <div key={label} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 7, padding: '10px 14px' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: item.color, marginBottom: 5, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{label}</div>
                    <Para>{value}</Para>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 5 — REPLICATION
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 05 — Replication" />
        <SectionTitle>Replication — Keeping Multiple Copies of Data in Sync</SectionTitle>

        <Para>
          Replication is the process of maintaining copies of data on multiple nodes.
          It is the mechanism behind both high availability (if one node fails, another
          has the data) and read scalability (multiple nodes can serve reads simultaneously).
          The challenge is keeping the copies consistent as data changes.
        </Para>

        <SubTitle>Single-Leader Replication (Primary-Replica)</SubTitle>

        <Para>
          One node is designated the leader (primary, master). All writes go to the leader.
          The leader processes writes, records them in its replication log, and sends them
          to follower nodes (replicas, standbys). Followers apply the changes and stay
          in sync with the leader. Reads can be served from any node.
        </Para>

        <CodeBox label="Single-leader replication — how it works and its failure modes">
{`// WRITE PATH:
Client → Leader → [process write, append to replication log]
Leader → [send log entries to Follower1, Follower2, Follower3]
Follower1,2,3 → [apply log entries, acknowledge to leader]
Leader → [acknowledge to client when quorum confirms]

// READ PATH (different consistency levels):
// Read from leader: always linearizable (most recent data)
// Read from follower: may be stale by replication lag amount

// REPLICATION LAG:
// Asynchronous replication (PostgreSQL streaming default):
//   Leader acknowledges write immediately after writing to its own WAL
//   Followers apply changes in background — may be 0ms to seconds behind
//   Advantage: no write latency penalty
//   Disadvantage: if leader crashes before follower catches up → data loss
//
// Synchronous replication (PostgreSQL synchronous_standby_names):
//   Leader waits for at least one follower to confirm receipt before ack to client
//   Advantage: zero data loss on leader failure (failover to confirmed follower)
//   Disadvantage: write latency = leader processing + one network round-trip to follower
//   If synchronous follower is slow or unreachable → writes stall

// FAILOVER: what happens when the leader dies
// 1. Detect leader failure (heartbeat timeout, typically 10-30 seconds)
// 2. Elect new leader from the followers (choose one with most recent data)
// 3. Reconfigure clients to write to new leader
// 4. Former leader (if it recovers) must accept new leader — not try to reassert

// SPLIT-BRAIN PROBLEM:
// Old leader recovers but thinks it's still leader
// New leader was elected — both are now accepting writes
// Two nodes both believe they are the leader → data diverges catastrophically
// Solution: STONITH (Shoot The Other Node In The Head) — force old leader offline
//           Fencing tokens — writes require a monotonically increasing token
//           Quorum — leader requires votes from majority of nodes to stay leader

// POSTGRESQL SINGLE-LEADER SETUP:
-- On primary:
wal_level = replica
max_wal_senders = 10
-- On replica:
primary_conninfo = 'host=primary-ip port=5432 user=replicator'
-- Add hot_standby = on to allow read queries on replica
hot_standby = on`}
        </CodeBox>

        <SubTitle>Multi-Leader Replication</SubTitle>

        <Para>
          Multi-leader replication allows writes at multiple nodes simultaneously.
          Each leader processes writes independently and replicates to other leaders.
          This enables writes from multiple geographic regions without the latency
          of going to a single global leader.
        </Para>

        <CodeBox label="Multi-leader replication — write conflicts and resolution">
{`// WRITE CONFLICT PROBLEM:
// User A on Node 1: UPDATE posts SET title = 'Version A' WHERE post_id = 1
// User B on Node 2: UPDATE posts SET title = 'Version B' WHERE post_id = 1
// Both writes succeed locally. Both replicate to the other node.
// Node 1 sees: A then B (conflict)
// Node 2 sees: B then A (conflict)
// Which value wins? Different nodes have different orderings.

// CONFLICT RESOLUTION STRATEGIES:

// 1. Last Write Wins (LWW):
// Attach a timestamp to every write. The write with the latest timestamp wins.
// Problem: clock skew between nodes means "latest" is unreliable.
//   Node1 clock is 1ms ahead of Node2 → Node1's writes always win
//   DynamoDB, Cassandra, and others use LWW by default — can silently drop data.

// 2. Version Vectors / Vector Clocks:
// Each value carries a version vector: {Node1: version, Node2: version, ...}
// On write: increment this node's version number
// On conflict: if neither version vector "dominates" the other → concurrent writes
// Application must merge or choose between conflicting versions
// Used by Riak, Amazon's Dynamo paper

// 3. Merge Functions (CRDTs):
// Design data types that automatically resolve conflicts mathematically
// Counter: value = sum of all increments from all nodes (always correct)
// Set: union of all additions, tombstones for deletions
// G-Counter, PN-Counter, LWW-Register, OR-Set are common CRDTs
// Cassandra uses CRDTs for certain data types

// 4. Application-Level Resolution:
// Store all conflicting versions
// Present conflict to application (e.g., git merge conflict)
// Application logic decides what to keep
// CouchDB's document revision system works this way

// WHEN TO USE MULTI-LEADER:
// Multiple data centres that must accept writes locally
// Offline-capable applications (sync when reconnected)
// Collaborative editing (Google Docs — every keystroke is a concurrent write)

// TOOLS: Galera Cluster (MySQL), BDR (PostgreSQL), CockroachDB`}
        </CodeBox>

        <SubTitle>Leaderless Replication (Dynamo-Style)</SubTitle>

        <Para>
          Leaderless replication has no special leader node. Any node can accept writes.
          Reads and writes are sent to multiple nodes simultaneously, and a quorum
          determines success. This maximises availability — there is no single
          point of failure for writes.
        </Para>

        <CodeBox label="Quorum reads and writes — the W + R > N formula">
{`// QUORUM SYSTEM:
// N = total number of replica nodes
// W = number of nodes that must confirm a write (write quorum)
// R = number of nodes that must respond to a read (read quorum)
// Rule: W + R > N guarantees at least one node in every read has the latest write

// EXAMPLE: N=3, W=2, R=2 (Cassandra QUORUM level)
// Write to all 3 nodes, wait for 2 to confirm: W=2
// Read from all 3 nodes, wait for 2 to respond: R=2
// W + R = 4 > N=3 → there is guaranteed overlap of at least 1 node
// That overlapping node has the latest write → read returns the latest value

// AVAILABILITY vs CONSISTENCY TRADE-OFF:
// W=1, R=1 (N=3): ultra-low latency, no consistency guarantee
//   One write succeeds → client gets ack. One read responds → client gets data.
//   W+R=2 < N=3 → no guaranteed overlap → can read stale value

// W=3, R=1 (N=3): every write requires all 3 nodes
//   Highly durable (all nodes have the write) but one slow/down node blocks writes
//   R=1: any one node can answer reads — but it always has the latest (W=N)

// W=2, R=2 (N=3): balanced — quorum reads and writes
//   W+R=4>N=3 → guaranteed overlap → linearizable
//   One node can be down and both reads and writes succeed (W=2, R=2, healthy=2≥2)

// W=1, R=3 (N=3): fast writes, reads check all nodes
//   W+R=4>N=3 → linearizable  but read must check ALL nodes

// CASSANDRA CONSISTENCY LEVELS:
// ONE:     W=1, R=1  → fastest, weakest consistency
// QUORUM:  W=ceil(N/2+1), R=ceil(N/2+1) → balanced
// ALL:     W=N, R=N  → slowest, strongest consistency
-- Set per-query in Cassandra:
-- SELECT * FROM orders WHERE order_id=1 USING CONSISTENCY QUORUM;
-- INSERT INTO orders (...) VALUES (...) USING CONSISTENCY ONE;

// READ REPAIR: when a read returns stale data from some nodes
// The coordinator detects inconsistency (different versions from R nodes)
// Sends updated value to the nodes that had stale data
// Eventual consistency progresses toward consistency through read traffic

// HINTED HANDOFF: when a target node is down during a write
// The write is accepted by another node as a "hint"
// When the target recovers, the hinting node delivers the stored write
// Ensures writes are not lost even when target is temporarily unavailable`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 6 — SHARDING
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 06 — Sharding" />
        <SectionTitle>Sharding — Partitioning Data Across Multiple Nodes</SectionTitle>

        <Para>
          Replication copies all data to every node — great for read scalability
          and availability, but does not solve the capacity problem (the total dataset
          is bounded by one machine's storage). Sharding (also called horizontal
          partitioning) splits the dataset across multiple nodes — each node holds
          a different subset of the data.
        </Para>

        <SubTitle>Sharding Strategies — How to Divide the Data</SubTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#0078d4' }} />
            <div style={{ padding: '22px 26px' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 12 }}>Range-Based Sharding</div>
              <Para>
                Divide the key space into contiguous ranges. Each shard owns a range.
                {' '}Shard 1: order_id 1–1,000,000. Shard 2: order_id 1,000,001–2,000,000.
                Simple to understand, supports efficient range scans within a shard.
              </Para>
              <Para>
                <strong style={{ color: '#ff4757' }}>Problem — Hot Spots:</strong> if recent
                order_ids are all above 2,000,000, every write goes to Shard 3 while
                Shards 1 and 2 sit idle. Range-based sharding on monotonically increasing
                keys (timestamps, auto-increment IDs) always creates hot spots on the
                newest shard.
              </Para>
              <CodeBox>
{`// Range-based sharding: customer_id ranges
// Shard 0: customer_id 1 - 10,000,000
// Shard 1: customer_id 10,000,001 - 20,000,000
// Shard 2: customer_id 20,000,001 - 30,000,000

// Route query:
def get_shard(customer_id):
    if customer_id <= 10_000_000: return shard_0
    elif customer_id <= 20_000_000: return shard_1
    else: return shard_2

// RANGE QUERY within a shard is efficient:
// "All orders from customers 5,000,000 to 5,100,000" → single shard
// RANGE QUERY across shards requires scatter-gather:
// "All orders from customers 9,500,000 to 10,500,000" → two shards`}
              </CodeBox>
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: 'var(--accent)' }} />
            <div style={{ padding: '22px 26px' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 12 }}>Hash-Based Sharding</div>
              <Para>
                Apply a hash function to the shard key and use the result to determine
                which shard. Hash functions distribute keys uniformly, eliminating hot spots
                even for sequential keys. This is the most common strategy.
              </Para>
              <Para>
                <strong style={{ color: '#ff4757' }}>Problem — Range Queries:</strong>
                hash destroys ordering. A range query must hit every shard (scatter-gather).
                Also, adding or removing shards requires rehashing all existing data — expensive.
                Consistent hashing mitigates the rebalancing problem.
              </Para>
              <CodeBox>
{`// Hash-based sharding: hash(order_id) % num_shards
def get_shard(order_id, num_shards=4):
    return hash(order_id) % num_shards
// order_id=1001 → hash=7483 → shard 7483%4 = shard 3
// order_id=1002 → hash=8291 → shard 8291%4 = shard 3
// order_id=1003 → hash=2847 → shard 2847%4 = shard 3  (unlucky clustering)
// Generally uniform distribution across all shards

// CONSISTENT HASHING: hash ring to minimise rebalancing
// Arrange shards on a virtual ring of hash values 0 to 2^32
// Each shard owns a range of the ring
// A key maps to the first shard clockwise from hash(key)
// Add/remove a shard: only the data on the adjacent shard needs to move
// vs simple modular hashing where ALL data moves on rebalancing
// Used by: Cassandra, DynamoDB, Chord P2P protocol`}
              </CodeBox>
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#f97316' }} />
            <div style={{ padding: '22px 26px' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 12 }}>Directory-Based Sharding</div>
              <Para>
                Maintain a lookup table (directory) that maps each key (or key range)
                to a specific shard. The directory is a separate service queried before
                every database operation to determine which shard to use. Maximum flexibility —
                keys can be moved between shards by updating the directory.
              </Para>
              <Para>
                <strong style={{ color: '#ff4757' }}>Problem:</strong> the directory is a
                single point of failure and a performance bottleneck. Every database
                operation requires a directory lookup first.
              </Para>
              <CodeBox>
{`// Directory-based sharding
// Directory service maintains:
// customer_id → shard_id mapping

// Lookup:
async def get_customer(customer_id):
    shard_id = await directory.lookup(customer_id)  // extra network hop!
    return await shards[shard_id].get(customer_id)

// Moving data between shards (for rebalancing):
// 1. Copy customer data from shard_2 to shard_5
// 2. Update directory: customer_id → shard_5
// 3. Delete from shard_2
// All future reads go to shard_5 immediately after step 2
// No application code changes needed`}
              </CodeBox>
            </div>
          </div>
        </div>

        <SubTitle>The Cross-Shard Join Problem</SubTitle>

        <Para>
          The most painful consequence of sharding is that joins across shard boundaries
          become enormously expensive. A join between customers and orders is trivial
          on a single database. When customers are on 4 shards and orders are on 4 shards,
          a join potentially requires querying all 16 combinations — scatter-gather
          across the network with N² complexity.
        </Para>

        <CodeBox label="Cross-shard join strategies">
{`// PROBLEM: Join customers (sharded by city) with orders (sharded by date)
// Query: SELECT c.name, o.total FROM customers c JOIN orders o ON c.id=o.customer_id
// WHERE c.city='Bengaluru' AND o.order_date >= '2024-01-01'

// Strategy 1: Scatter-Gather
// Send query to all shards, collect results, join in the application layer
// Application layer becomes the join processor
// O(N_shards²) network calls → terrible at scale

// Strategy 2: Co-location (best strategy when possible)
// Shard BOTH tables by the same key used for the join (customer_id)
// customer_id=1001 → Shard 3 for customers AND Shard 3 for orders
// Join between customer 1001 and their orders is entirely within Shard 3
// The join is local — no cross-shard communication

// Implementation: consistent hash on customer_id for BOTH tables
// customer table: hash(customer_id) → shard
// orders table:   hash(customer_id) → SAME shard  ← key: shard by the join key
// All queries "by customer" are entirely local to one shard

// Strategy 3: Denormalisation
// Store the join data redundantly: include customer_name in the orders table
// orders.customer_name = redundant copy of customers.name
// "Join" is just reading orders — no cross-shard lookup needed
// Cost: update anomalies (customer name change → update all their orders)

// Strategy 4: Broadcast joins
// One table is small enough to broadcast to all shards
// Restaurants table: 10,000 rows — tiny
// Orders table: 5 billion rows — large and sharded
// Strategy: keep a full copy of restaurants on EVERY shard
// Join restaurants × orders on each shard → combine results
// Works when one side of the join is small (dimension table in star schema)`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 7 — DISTRIBUTED TRANSACTIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 07 — Distributed Transactions" />
        <SectionTitle>Distributed Transactions — Atomicity Across Multiple Nodes</SectionTitle>

        <Para>
          A distributed transaction spans multiple nodes — it reads and writes data
          on two or more separate machines and must be atomic across all of them.
          Either all nodes commit or all nodes abort — partial commits are not allowed.
          This is significantly harder than single-node transactions because
          the coordinator must handle node failures and network partitions that can
          occur between when a node says "ready to commit" and when it actually commits.
        </Para>

        <SubTitle>Two-Phase Commit (2PC) — The Standard Protocol</SubTitle>

        <Para>
          Two-Phase Commit is the classic protocol for achieving atomic commits across
          multiple nodes. It uses a coordinator node that orchestrates the commit
          decision across all participant nodes.
        </Para>

        <CodeBox label="2PC protocol — complete trace with failure scenarios">
{`// PARTICIPANTS: Coordinator C, Nodes N1, N2, N3
// Transaction T wants to commit — it modified data on N1, N2, and N3

// ─────────────────────────────────────────────────────────────────
// PHASE 1: PREPARE (Voting Phase)
// ─────────────────────────────────────────────────────────────────

// Coordinator sends PREPARE(T) to all participants
C → N1: "PREPARE transaction T"
C → N2: "PREPARE transaction T"
C → N3: "PREPARE transaction T"

// Each participant:
// 1. Checks if it CAN commit (has all necessary locks, no constraint violations)
// 2. If YES: writes all transaction changes to its WAL (durably)
//            Acquires all necessary locks for the commit
//            Sends VOTE-COMMIT to coordinator
// 3. If NO: sends VOTE-ABORT to coordinator
// KEY PROPERTY: once a node sends VOTE-COMMIT, it has promised to commit
//               if the coordinator later says COMMIT. It cannot change its mind.
//               It must hold its locks and preserve its prepared state until
//               the coordinator tells it what to do.

N1 → C: "VOTE-COMMIT"
N2 → C: "VOTE-COMMIT"
N3 → C: "VOTE-COMMIT"

// ─────────────────────────────────────────────────────────────────
// PHASE 2: COMMIT (Decision Phase)
// ─────────────────────────────────────────────────────────────────

// Coordinator decision:
// IF all votes are COMMIT → send COMMIT to all participants
// IF ANY vote is ABORT → send ABORT to all participants

// All voted COMMIT:
C writes COMMIT(T) to its own WAL (durable — now committed to committing)
C → N1: "COMMIT transaction T"
C → N2: "COMMIT transaction T"
C → N3: "COMMIT transaction T"

// Each participant:
// Applies the commit (writes committed state, releases locks)
// Sends ACK to coordinator
// Cleans up prepared state

N1,N2,N3 → C: "ACK"
// Transaction complete ✓

// ─────────────────────────────────────────────────────────────────
// FAILURE SCENARIOS
// ─────────────────────────────────────────────────────────────────

// SCENARIO 1: Node fails BEFORE sending VOTE-COMMIT
// N2 crashes before responding to PREPARE
// Coordinator times out waiting for N2's vote
// Coordinator sends ABORT to N1 and N3
// When N2 recovers: no prepared state → aborts
// Result: Transaction aborted ✓ (no partial commit)

// SCENARIO 2: Node fails AFTER sending VOTE-COMMIT (the blocking problem)
// N2 sent VOTE-COMMIT then crashed
// N2 holds locks and has prepared state on disk
// N2 recovers: "I said COMMIT but don't know if coordinator decided COMMIT or ABORT"
// N2 MUST WAIT for coordinator to tell it what to do
// N2 CANNOT release its locks — what if coordinator said COMMIT?
// N2 CANNOT commit unilaterally — what if coordinator said ABORT?
// ← THIS IS 2PC's BLOCKING PROBLEM: a prepared node blocks indefinitely
//   waiting for the coordinator if the coordinator crashes

// SCENARIO 3: Coordinator fails after sending COMMIT to N1 but not N2, N3
// N1 committed. N2, N3 are waiting for COMMIT/ABORT.
// When coordinator recovers: reads its WAL, sees COMMIT(T) was written
// Resends COMMIT to N2 and N3 → they commit
// Transaction complete ✓ (coordinator log makes recovery possible)

// THE 2PC BLOCKING PROBLEM:
// If the coordinator is unavailable AND at least one participant is in PREPARED state:
// Those participants CANNOT make progress — they must hold their locks indefinitely
// This can block the entire database in the worst case
// Solution: 3PC (Three-Phase Commit) adds a third phase to reduce blocking
//           But 3PC is complex and not widely used in practice
//           Modern systems use: Paxos/Raft-based consensus instead`}
        </CodeBox>

        <SubTitle>Three-Phase Commit (3PC) — Addressing 2PC's Blocking Problem</SubTitle>

        <Para>
          3PC adds a <strong style={{ color: 'var(--accent)' }}>pre-commit phase</strong>
          between the prepare and commit phases. After receiving all VOTE-COMMIT responses,
          the coordinator sends a PRE-COMMIT message. Participants acknowledge PRE-COMMIT
          and move to a pre-committed state. Only then does the coordinator send the final
          COMMIT. The key property: if a participant is in the pre-committed state and
          loses contact with the coordinator, it can safely commit — because pre-commit
          means the coordinator definitely decided to commit (it would not send pre-commit
          if any node had aborted).
        </Para>

        <Para>
          In practice 3PC is rarely used because it still has problems under network
          partitions and the added complexity is not worth it. Modern distributed databases
          use consensus algorithms (Raft, Paxos) for distributed transactions instead.
        </Para>

        <SubTitle>Saga Pattern — Long-Running Distributed Transactions Without 2PC</SubTitle>

        <CodeBox label="Saga pattern — the microservices alternative to 2PC">
{`// PROBLEM: 2PC across microservices is too coupled and too slow
// Each service locks its data waiting for coordinator → poor availability

// SAGA: Break a distributed transaction into a sequence of local transactions
// Each local transaction updates one service and publishes an event
// If any step fails: run compensating transactions to undo previous steps

// EXAMPLE: Swiggy order placement saga
// Step 1: OrderService.createOrder() → publishes ORDER_CREATED
// Step 2: InventoryService.reserveItems() → publishes ITEMS_RESERVED
//          OR → publishes RESERVATION_FAILED
// Step 3: PaymentService.processPayment() → publishes PAYMENT_COMPLETED
//          OR → publishes PAYMENT_FAILED
// Step 4: DeliveryService.assignDelivery() → publishes DELIVERY_ASSIGNED

// FAILURE AND COMPENSATION:
// If PaymentService fails (PAYMENT_FAILED):
//   Compensating transaction 2: InventoryService.releaseReservation()
//   Compensating transaction 1: OrderService.cancelOrder()

// IMPLEMENTATION STYLES:
// Choreography: each service listens for events and reacts
//   No central coordinator
//   Services publish and consume events directly
//   Simple but hard to track overall progress

// Orchestration: a saga orchestrator sends commands and waits for responses
//   Central saga orchestrator knows the full workflow
//   Easier to understand and track but orchestrator is a potential bottleneck

// SAGA vs 2PC:
// 2PC: distributed ACID, holds locks, blocks on failures, tightly coupled
// Saga: eventually consistent, no long-held locks, compensating instead of rollback
//       application must design for partial completion and compensation logic
// Saga is preferred in microservices architectures
// 2PC is used within a single database cluster (e.g., CockroachDB internally)`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 8 — CONSENSUS ALGORITHMS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 08 — Consensus" />
        <SectionTitle>Consensus Algorithms — How Distributed Systems Agree on Anything</SectionTitle>

        <Para>
          Consensus is the problem of getting multiple nodes in a distributed system
          to agree on a single value, even in the presence of node failures and
          message delays. It underlies leader election, distributed transactions,
          replicated logs, and virtually every coordination problem in distributed systems.
        </Para>

        <SubTitle>The FLP Impossibility — Why Perfect Consensus Is Impossible</SubTitle>

        <Para>
          Fischer, Lynch, and Paterson proved in 1985 (the FLP result) that in an
          asynchronous distributed system with even one faulty process, it is impossible
          to solve consensus in finite time. No deterministic algorithm can guarantee
          both safety (correct result) and liveness (terminates) in the presence of failures.
        </Para>

        <Para>
          Real consensus algorithms (Raft, Paxos) escape FLP by using timeouts —
          which make them partially synchronous rather than purely asynchronous.
          They give up guaranteed termination in all cases but work reliably in practice
          because real networks have bounded delays most of the time.
        </Para>

        <SubTitle>Raft — The Understandable Consensus Algorithm</SubTitle>

        <Para>
          Raft was designed specifically to be easier to understand than Paxos.
          It is used by etcd (Kubernetes), CockroachDB, TiKV, and many others.
          Raft decomposes consensus into three largely independent sub-problems:
          leader election, log replication, and safety.
        </Para>

        <CodeBox label="Raft — leader election and log replication overview">
{`// RAFT CLUSTER: N nodes, one leader at a time

// TERMS: Raft divides time into terms (monotonically increasing integers)
// Each term begins with a leader election
// At most one leader per term (possibly no leader if election fails)

// ─────────────────────────────────────────────────────────────────
// LEADER ELECTION
// ─────────────────────────────────────────────────────────────────
// Each node is in one of: FOLLOWER, CANDIDATE, LEADER

// FOLLOWER: waits for heartbeats from leader
// If election timeout expires without hearing from leader:
//   → become CANDIDATE, start an election

// CANDIDATE:
// 1. Increment current term
// 2. Vote for itself
// 3. Send RequestVote(term, candidateId, lastLogIndex, lastLogTerm) to all nodes
//
// A node grants a vote if:
//   a. Haven't voted in this term yet
//   b. Candidate's log is at least as up-to-date as the voter's log
//      (ensures elected leader has all committed entries)

// MAJORITY VOTE: candidate becomes LEADER when it receives votes from majority
// With N=5 nodes: need 3 votes (majority = floor(N/2) + 1 = 3)
// Majority ensures at most one leader per term (two candidates cannot
// both win majority — pigeonhole principle)

// ─────────────────────────────────────────────────────────────────
// LOG REPLICATION
// ─────────────────────────────────────────────────────────────────
// Client sends write to leader
// Leader appends entry to its log (with current term number)
// Leader sends AppendEntries(entries, prevLogIndex, prevLogTerm) to all followers
// Followers append entries to their logs and send success
// Once leader receives success from MAJORITY: entry is COMMITTED
// Leader applies committed entry to state machine, responds to client
// Leader notifies followers of commit in next AppendEntries
// Followers apply committed entries to their state machines

// KEY SAFETY PROPERTY:
// Once an entry is committed (applied by majority), it will NEVER be removed
// Future leaders will always have all committed entries (guaranteed by vote restriction)
// = RAFT SAFETY GUARANTEE

// LEADER CRASH RECOVERY:
// New leader elected by majority vote
// New leader has all committed entries (guaranteed by voting rules)
// New leader replaces followers' uncommitted entries with its own
// Uncommitted entries from old leader are lost (they were never committed = never ack'd to client)

// COMPARING RAFT vs PAXOS:
// Raft: one leader replicates log sequentially → easy to understand, implement
// Paxos: no designated leader for basic algorithm, complex multi-paxos for logs
// Paxos: mathematically elegant, complex to implement correctly
// Multi-Paxos: practical variant with a leader, closer to Raft
// Modern preference: Raft for new implementations (etcd, CockroachDB, TiKV, Consul)`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 9 — WHAT THIS LOOKS LIKE AT WORK
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 09 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>💼 What This Looks Like at Work</div>
        <SectionTitle>System Design — Building a Distributed Order System for Swiggy at Scale</SectionTitle>

        <Para>
          This is the kind of system design question asked at every senior engineer and
          data engineering interview. Every decision maps directly to a concept in this module.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Design: Order Database — 10M orders/day, 99.99% availability, India-wide
          </div>

          <CodeBox label="Architecture decisions mapped to distributed database concepts">
{`// REQUIREMENT ANALYSIS:
// 10M orders/day = ~116 orders/second average, ~1000/second peak (lunch/dinner)
// 99.99% availability = max 52 minutes downtime per year
// Data: customer, restaurant, items, payment, delivery tracking
// Queries: order lookup by ID, orders by customer, orders by restaurant, real-time status

// ─────────────────────────────────────────────────────────────────
// DECISION 1: Which consistency model for order writes?
// ─────────────────────────────────────────────────────────────────
// Order creation involves: inventory check, payment, order record, restaurant notification
// These must be atomic: ACID transaction required
// Decision: Strong consistency (CP) for order creation
// Use: PostgreSQL with synchronous_standby_names for zero-data-loss replication

// ─────────────────────────────────────────────────────────────────
// DECISION 2: Read scalability — thousands of customers checking order status
// ─────────────────────────────────────────────────────────────────
// Order status updates happen every 30 seconds (GPS ping from delivery driver)
// 10M active orders at peak → 333K status reads/second
// One PostgreSQL primary cannot serve 333K reads/second
// Decision: Read replicas with eventual consistency (AP for reads)
// PRIMARY: accepts all writes, master state
// 3 READ REPLICAS: serve all status reads, may be 1-2 seconds behind
// Use: PostgreSQL streaming replication, read from replicas
// Consistency model: read-your-writes for the customer who placed the order
//   (route their reads to the primary OR use session token to track write LSN)
// Acceptable: other users seeing 1-2 second stale status

// ─────────────────────────────────────────────────────────────────
// DECISION 3: Sharding for capacity
// ─────────────────────────────────────────────────────────────────
// 10M orders/day × 365 days × 5 years = 18 billion rows in 5 years
// One PostgreSQL server: max ~500GB practical, 18B rows >> that
// Decision: Shard by customer_id (hash-based)
// WHY customer_id: most queries are "orders for this customer"
//   Co-locating all of a customer's orders on one shard makes queries local
// Sharding key: hash(customer_id) mod 8 shards
// Each shard: ~62M orders after 5 years (manageable per server)
// Cross-shard joins: restaurant analytics queries hit all shards (scatter-gather)
//   Acceptable for offline analytics, not for customer-facing queries

// ─────────────────────────────────────────────────────────────────
// DECISION 4: High availability — 99.99% target
// ─────────────────────────────────────────────────────────────────
// Each shard: 1 primary + 2 synchronous replicas + 1 async replica
// Synchronous replicas: guarantee zero data loss on primary failover
// Async replica: geographic DR copy (different availability zone)
// Automatic failover: Patroni (HA manager for PostgreSQL) with etcd for consensus
// If primary fails: Patroni uses etcd (Raft consensus) to elect new leader
// Election time: ~15 seconds → application retries cover this window
// Result: single node failure is transparent to users (brief retry, then succeeds)

// ─────────────────────────────────────────────────────────────────
// DECISION 5: Distributed transaction for order placement
// ─────────────────────────────────────────────────────────────────
// Order placement touches: inventory (menu_items), payment, orders table
// All on different microservices with different databases
// Decision: Saga pattern (NOT 2PC across microservices)
// WHY saga: loose coupling, no cross-service locks, each service is independently deployable
// Saga steps:
//   1. Create order record (OrderService, order status = PENDING)
//   2. Reserve menu items (InventoryService, decrement stock)
//      Compensation: release reservation if later steps fail
//   3. Process payment (PaymentService, charge customer)
//      Compensation: refund if delivery fails to assign
//   4. Assign restaurant (RestaurantService, notify restaurant)
//   5. Mark order CONFIRMED
// Each step is locally ACID. Failures trigger compensating transactions.
// Net result: eventual consistency + atomicity without distributed locks`}
          </CodeBox>
        </div>
      </section>

      {/* ========================================
          PART 10 — INTERVIEW QUESTIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 10 — Interview Prep" />
        <SectionTitle>Distributed Database Interview Questions — Complete Answers</SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              q: 'Explain the CAP theorem. What is the real choice it presents?',
              color: '#0078d4',
              a: 'The CAP theorem states that a distributed data system can guarantee at most two of: Consistency (every read returns the most recent write or an error), Availability (every request receives a non-error response), and Partition tolerance (the system operates even when network messages are dropped). Since network partitions will inevitably occur in any real distributed system, Partition tolerance is essentially mandatory — dropping it is not a realistic choice. The real choice CAP presents is: during a network partition, do you sacrifice Consistency (return potentially stale data, prioritise availability — AP systems) or Availability (return an error rather than stale data, prioritise correctness — CP systems)? Examples: Cassandra, DynamoDB are AP — they serve reads during partitions even if data may be stale. Zookeeper, etcd are CP — they refuse requests during partitions rather than risk returning stale data. The choice depends on which is worse: slightly wrong data or no response at all.',
            },
            {
              q: 'What is the difference between CAP and PACELC?',
              color: 'var(--accent)',
              a: 'CAP only addresses system behaviour during a network partition — a relatively rare event. PACELC (PAC-ELC) is a more complete framework that additionally addresses normal operation. It states: if there is a Partition (P), choose between Availability (A) and Consistency (C) — exactly as CAP says. Else (E), when operating normally without a partition, choose between Latency (L) and Consistency (C). The latency-consistency trade-off during normal operation arises from replication: a strongly consistent read must confirm the latest value with a quorum of replicas (extra network round-trips, higher latency), while an eventually consistent read can be served locally from the nearest replica (lower latency, potentially stale). PACELC classifies systems as PA/EL (favour availability and low latency, sacrifice consistency both ways), PA/EC (AP during partitions but consistent during normal operation, like DynamoDB with eventual vs strong consistency options), or PC/EC (maximise consistency always, like Zookeeper and etcd).',
            },
            {
              q: 'What is the difference between single-leader, multi-leader, and leaderless replication?',
              color: '#f97316',
              a: 'Single-leader replication designates one node as the leader that accepts all writes. The leader replicates changes to followers. All writes go through one node — simple, avoids conflicts, but the leader is a bottleneck for writes and a single point of failure. Multi-leader replication allows multiple nodes to accept writes simultaneously. Each leader replicates to others. Enables writes from multiple geographic regions without routing to a single leader, but creates write conflicts when two leaders accept conflicting writes to the same data — the system must detect and resolve conflicts. Leaderless replication has no designated leader. Writes go to multiple nodes simultaneously, with a write quorum (W out of N nodes) required for success. Reads contact multiple nodes and use a read quorum (R out of N). If W + R > N, at least one node in every read overlaps with the write quorum, guaranteeing the reader sees the latest write. Used by Cassandra and DynamoDB. Maximises availability — no single point of failure — but handling conflicts and stale reads requires careful tuning of W, R, and N.',
            },
            {
              q: 'Explain Two-Phase Commit. What is its main problem?',
              color: '#8b5cf6',
              a: 'Two-Phase Commit is the standard protocol for achieving atomic commits across multiple nodes in a distributed system. Phase 1 (Prepare): the coordinator sends PREPARE to all participants. Each participant checks if it can commit, durably records its prepared state including the transaction changes, acquires all necessary locks, and responds VOTE-COMMIT or VOTE-ABORT. Phase 2 (Commit/Abort): if all votes are COMMIT, the coordinator durably records its COMMIT decision, then sends COMMIT to all participants. If any vote is ABORT, the coordinator sends ABORT. The main problem is blocking: once a participant has sent VOTE-COMMIT, it has promised to commit if told to do so. It must hold its locks indefinitely until it hears the coordinator\'s decision. If the coordinator crashes after receiving all VOTE-COMMITs but before sending the COMMIT messages, all participants are stuck — they cannot commit (they don\'t know if others voted abort) and they cannot abort (they promised to commit). They block, holding their locks, until the coordinator recovers. This blocking property can freeze parts of the database. Three-Phase Commit attempts to address this but adds complexity. Modern systems often use Raft/Paxos-based distributed transactions instead.',
            },
            {
              q: 'What is the quorum formula W + R > N and what consistency does it guarantee?',
              color: '#facc15',
              a: 'In a leaderless replication system with N replicas, W is the minimum number of replicas that must confirm a write for it to succeed, and R is the minimum number of replicas that must respond to a read. When W + R > N, by the pigeonhole principle, the set of nodes that confirmed the write and the set of nodes that respond to the read must overlap on at least one node. That overlapping node participated in the latest write and has the most recent value, so the read is guaranteed to see the latest write. This gives strong consistency (linearizability). Example: N=3, W=2, R=2 → W+R=4>3 → at least one overlapping node. Any read will include at least one node that confirmed the write. When W+R ≤ N, reads and writes can proceed without overlapping nodes — reads may miss the latest write, giving only eventual consistency. Performance trade-off: higher W+R = stronger consistency but higher latency (must wait for more nodes) and lower availability (more nodes must be reachable). Cassandra\'s QUORUM level sets W=R=ceil(N/2)+1, satisfying W+R>N for any N.',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: '22px 26px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Q: {item.q}</div>
              <Para>{item.a}</Para>
            </div>
          ))}
        </div>
      </section>

      {/* ── KEY TAKEAWAYS ── */}
      <KeyTakeaways items={[
        'Three forces break single-server databases: Capacity (data exceeds one machine\'s storage → sharding), Throughput (queries exceed one machine\'s compute → read replicas), Availability (single point of failure → replication). Each requires a different architectural response.',
        'CAP Theorem: a distributed system can guarantee at most two of Consistency (every read returns latest write), Availability (every request gets a non-error response), and Partition Tolerance (operates despite message loss). Since partitions are inevitable, the real choice is CP (refuse requests during partition) or AP (return potentially stale data during partition).',
        'PACELC extends CAP: during Partition → choose A or C. Else (normal operation) → choose Latency or Consistency. The latency-consistency trade-off exists permanently, not just during failures. Strongly consistent reads require quorum coordination (higher latency); eventually consistent reads serve locally (lower latency).',
        'Consistency model spectrum: Linearizability (instantaneous, globally ordered) > Sequential consistency > Causal consistency (causally related ops in order) > Read-your-writes (see your own writes) > Eventual consistency (converges eventually, no timing guarantee). Different parts of a system may use different models.',
        'Single-leader replication: all writes to leader, replicated to followers. Simple, no conflicts, but leader is write bottleneck. Multi-leader: multiple write-accepting nodes, enables geographic distribution, requires conflict resolution. Leaderless (Dynamo-style): any node accepts writes, quorum W+R>N guarantees consistency.',
        'Quorum formula W+R>N: with N replicas, requiring W write confirmations and R read responses guarantees at least one overlapping node — that node has the latest write. Cassandra QUORUM: W=R=⌈N/2⌉+1. Higher W and R = stronger consistency but higher latency and lower availability.',
        'Sharding strategies: Range (supports range scans, hot spots on sequential keys), Hash (uniform distribution, destroys range query efficiency), Directory (maximum flexibility, lookup overhead). Co-locate related data on same shard by using the join key as the shard key — eliminates cross-shard joins.',
        'Two-Phase Commit: Prepare phase (participants vote commit/abort, durably record prepared state, hold locks), Commit phase (coordinator decides, sends commit/abort to all). Main problem: blocking — a prepared participant holds locks indefinitely if coordinator fails, cannot proceed without coordinator\'s decision.',
        'Saga pattern: break distributed transaction into local transactions with compensating transactions for rollback. Each step is locally ACID. Failures trigger compensating actions. No distributed locks, loose coupling. Two styles: choreography (event-driven, decentralised) and orchestration (central saga orchestrator). Preferred over 2PC in microservices.',
        'Raft consensus: nodes are FOLLOWER, CANDIDATE, or LEADER. Leader elected by majority vote with term numbers. Leader replicates log entries to followers, commits after majority acknowledgment. Safety: committed entries are never lost — future leaders always have all committed entries. Used by etcd, CockroachDB, Consul.',
      ]} />

    </LearnLayout>
  )
}