import { LearnLayout } from '@/components/content/LearnLayout';
import { Callout } from '@/components/content/Callout';
import { KeyTakeaways } from '@/components/content/KeyTakeaways';
import SQLPlayground from '@/components/sql/SQLPlayground';
import TryItChallenge from '@/components/sql/TryItChallenge';
import Link from 'next/link';

const C = '#06b6d4';

const Part = ({ n, title }: { n: string; title: string }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 11, color: C, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>// Part {n}</p>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
);

const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>{children}</h3>
);

const Hl = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: C }}>{children}</strong>
);

const HR = () => <div style={{ borderTop: '1px solid var(--border)', margin: '48px 0' }} />;

const IQ = ({ q, children }: { q: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ background: `${C}10`, border: `1px solid ${C}25`, borderRadius: '8px 8px 0 0', padding: '14px 18px', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Q: {q}</div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
);

const Err = ({ msg, cause, fix }: { msg: string; cause: string; fix: string }) => (
  <div style={{ marginBottom: 24, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
    <div style={{ background: 'rgba(255,71,87,0.09)', borderBottom: '1px solid var(--border)', padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#ff4757', wordBreak: 'break-all', lineHeight: 1.6 }}>{msg}</div>
    <div style={{ padding: '14px 16px' }}>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: '0 0 8px' }}><strong style={{ color: 'var(--text)' }}>Cause: </strong>{cause}</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}><strong style={{ color: '#00e676' }}>Fix: </strong>{fix}</p>
    </div>
  </div>
);

const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${C}08`, border: `1px solid ${C}20`, borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>🎯 Pro Tip</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
);

const TimeBlock = ({ time, label, children }: { time: string; label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
    <div style={{ flexShrink: 0, textAlign: 'right', width: 95 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)' }}>{time}</div>
    </div>
    <div style={{ flex: 1, borderLeft: `2px solid ${C}30`, paddingLeft: 20, paddingBottom: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{children}</div>
    </div>
  </div>
);

const DBCard = ({
  name, color, type, examples, strengths, weaknesses, indiaUse,
}: {
  name: string; color: string; type: string; examples: string;
  strengths: string[]; weaknesses: string[]; indiaUse: string;
}) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${color}30`, borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
    <div style={{ padding: '14px 18px', background: `${color}12`, borderBottom: `1px solid ${color}20`, display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ width: 10, height: 10, borderRadius: 3, background: color, display: 'inline-block', flexShrink: 0 }} />
      <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{name}</span>
      <span style={{ fontSize: 11, color, fontFamily: 'var(--font-mono)', marginLeft: 4 }}>{type}</span>
    </div>
    <div style={{ padding: '16px 18px' }}>
      <p style={{ fontSize: 12, color, fontFamily: 'var(--font-mono)', margin: '0 0 12px' }}>{examples}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#00e676', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 6px' }}>Strengths</p>
          {strengths.map(s => <p key={s} style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6, margin: '0 0 4px' }}>· {s}</p>)}
        </div>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#ff4757', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 6px' }}>Weaknesses</p>
          {weaknesses.map(w => <p key={w} style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6, margin: '0 0 4px' }}>· {w}</p>)}
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Used by in India</p>
        <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6, margin: 0 }}>{indiaUse}</p>
      </div>
    </div>
  </div>
);

export default function TypesOfDatabases() {
  return (
    <LearnLayout
      title="Types of Databases"
      description="Relational, Document, Key-Value, Column-Family, Graph, Time-Series — what each one is built for and how Indian companies use them"
      section="SQL — Module 03"
      readTime="8–12 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why Multiple Types of Databases Exist" />

      <P>When you walk into a hardware store, you do not see one type of screwdriver. You see flathead, Phillips, Torx, hex — each shaped for a specific kind of screw. Using the wrong one strips the head and wastes time. Databases are the same. Relational databases are extraordinarily good at what they do. They are also genuinely wrong for certain problems. The engineers who invented those alternatives were not being contrarian — they were solving problems that relational databases could not solve efficiently at scale.</P>

      <P>Here is the core tension that drove the creation of every non-relational database type:</P>

      <div style={{ background: `${C}08`, border: `1px solid ${C}25`, borderLeft: `4px solid ${C}`, borderRadius: '0 10px 10px 0', padding: '20px 24px', margin: '4px 0 28px' }}>
        <P>Relational databases guarantee consistency and correctness. But guaranteeing consistency in a distributed system — where data is spread across hundreds of servers across multiple data centres — requires coordination between those servers. That coordination takes time. At extreme scale, the time spent coordinating becomes the bottleneck. Some systems need speed so badly that they are willing to trade a degree of consistency for it. That trade-off is what every NoSQL database is fundamentally about.</P>
      </div>

      <P>This module maps every major type of database — what it is built for, where it breaks down, and which Indian companies actually use it. By the end, you will be able to answer the question "which database should we use?" for any system you are ever asked to design.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="The CAP Theorem — The Foundation of Every Database Trade-Off" />

      <P>To understand why different databases make different choices, you need to understand the CAP theorem. It is one of the most important concepts in all of distributed systems, and it directly explains every design decision you will see in this module.</P>

      <P>The CAP theorem states that a distributed data system can guarantee at most two of the following three properties simultaneously:</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, margin: '20px 0 28px' }}>
        {[
          { letter: 'C', word: 'Consistency', color: C, desc: 'Every read receives the most recent write or an error. All nodes in the system see the same data at the same time. No stale reads.' },
          { letter: 'A', word: 'Availability', color: '#10b981', desc: 'Every request receives a response — not an error. The system is always up and always responds, even if some nodes are down.' },
          { letter: 'P', word: 'Partition Tolerance', color: '#f97316', desc: 'The system continues operating even when network messages between nodes are lost or delayed — i.e. when the network partitions.' },
        ].map(({ letter, word, color, desc }) => (
          <div key={letter} style={{ background: 'var(--surface)', border: `1px solid ${color}30`, borderRadius: 10, padding: '18px' }}>
            <div style={{ fontSize: 32, fontWeight: 900, color, fontFamily: 'var(--font-display)', letterSpacing: '-2px', marginBottom: 6 }}>{letter}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{word}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{desc}</div>
          </div>
        ))}
      </div>

      <P>In any real distributed system, network partitions will happen — servers go down, cables get cut, data centres lose connectivity. So <Hl>Partition Tolerance is not optional</Hl>. Every production database must tolerate partitions. This means the real choice is always between <Hl>C and A</Hl> — consistency or availability — when a partition occurs.</P>

      <P><Hl>CP systems</Hl> (Consistent + Partition Tolerant) choose to return an error or wait rather than return potentially stale data. PostgreSQL and MySQL are CP — during a partition, they will refuse to serve requests rather than risk returning incorrect data. <Hl>AP systems</Hl> (Available + Partition Tolerant) always respond, but the response might be slightly stale. Cassandra and CouchDB are AP — they always return a result, but it might not reflect the very latest write from a node that is currently unreachable.</P>

      <P>Neither choice is wrong. It depends entirely on what your application cannot tolerate. A banking app cannot tolerate incorrect balance information — CP. A social media feed can tolerate showing a post from 2 seconds ago — AP. Every database type in this module makes one of these two choices.</P>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Relational Databases (RDBMS) — The Default Choice" />

      <P>You already know relational databases from Modules 01 and 02. They store data in tables with rows and columns, enforce relationships through foreign keys, guarantee ACID properties, and are queried with SQL. They are the right choice for the vast majority of business applications — and they have been for 50 years.</P>

      <H>When relational databases are the right choice</H>
      <P>Use a relational database when your data is <Hl>structured and well-defined</Hl> — you know in advance what columns exist and what types they hold. When relationships between entities matter and must be enforced — customers have orders, orders have items. When you need <Hl>complex queries</Hl> — multi-table joins, aggregations, subqueries, window functions. When ACID guarantees are non-negotiable — financial transactions, inventory management, booking systems.</P>

      <H>When relational databases struggle</H>
      <P>RDBMS starts to struggle when your schema changes frequently and unpredictably — adding new columns to a 500-million-row table takes hours and locks the table. When data is inherently hierarchical or graph-shaped — storing a social network's friend-of-friend relationships in relational tables requires complex recursive queries. When write throughput requirements exceed what a single master node can handle and you need to shard across hundreds of servers — relational databases can be sharded, but it is operationally complex and breaks some SQL features.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Database', 'Who uses it in India', 'Why'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['PostgreSQL', 'Stripe, Brex, Robinhood, Acorns, Venmo', 'Open source, ACID compliant, excellent for fintech — handles complex financial queries and JSON payment metadata with JSONB.'],
              ['MySQL', 'DoorDash, Sephora, OYO, BookMyShow', 'Mature, battle-tested at high traffic, excellent read-replica support for consumer apps with millions of concurrent users.'],
              ['MS SQL Server', 'HDFC Bank, ICICI Bank, Deloitte enterprise clients', 'Enterprise support, Windows ecosystem, deep compliance tooling for RBI-regulated financial institutions.'],
              ['Oracle', 'Accenture, KPMG clients, IRCTC, LIC, government', 'Legacy enterprise and government. IRCTC runs one of Asia\'s highest-volume Oracle installations. Expensive but deeply entrenched.'],
              ['SQLite', 'Every Android and iOS app (device-local storage)', 'Serverless, zero-config, runs on the device itself. DoorDash, Venmo, Cred — all store local user data in SQLite on your phone.'],
            ].map(([db, who, why], i) => (
              <tr key={db} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: C, borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{db}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{who}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Document Databases — Flexible Schema for Changing Data" />

      <P>A document database stores data as <Hl>documents</Hl> — typically JSON or BSON objects — rather than rows in tables. Each document is a self-contained unit that can have any structure. Two documents in the same collection (the NoSQL equivalent of a table) can have completely different fields.</P>

      <H>What a document looks like</H>

      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', margin: '16px 0 24px' }}>
        <div style={{ padding: '10px 16px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>MongoDB document — one customer, all their data embedded</span>
        </div>
        <pre style={{ margin: 0, padding: '16px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.8, color: 'var(--text)', overflowX: 'auto' }}>
{`{
  "_id": "cust_001",
  "first_name": "Aisha",
  "last_name": "Khan",
  "city": "Seattle",
  "loyalty_tier": "Gold",
  "contact": {
    "email": "aisha.khan@gmail.com",
    "phone": "9876543210"
  },
  "recent_orders": [
    { "order_id": 1001, "total": 856, "date": "2024-01-05" },
    { "order_id": 1016, "total": 445, "date": "2024-02-14" }
  ],
  "preferences": ["organic", "dairy-free"]
}`}
        </pre>
      </div>

      <P>Notice what is different from the relational model. The customer's contact details are <Hl>embedded</Hl> inside the document as a nested object — not in a separate contacts table. Recent orders are embedded as an array. Preferences are a free-form array. There are no foreign keys and no JOINs needed to get this customer's complete profile — it is all in one document, fetched in one read.</P>

      <H>The core advantage — read performance for document-shaped data</H>
      <P>In a relational database, getting a customer's profile plus their last 5 orders plus their preferences would require at minimum 3 JOINs across 3 tables. Each JOIN means more disk reads, more coordination, more CPU. In a document database, the same query is a single document fetch — one read, one result. For read-heavy workloads where the access pattern is always "give me everything about this entity," document databases are significantly faster.</P>

      <H>The core weakness — no JOINs, limited cross-document consistency</H>
      <P>Document databases do not support JOINs. If you need to find all customers who ordered a specific product, you either embed so much data that the document becomes enormous and stale, or you do multiple queries and join them in application code — which is slower and more complex than a SQL JOIN. Transactions across multiple documents in different collections are also either not supported or limited — atomicity within a single document is guaranteed, but cross-document atomicity is not always available.</P>

      <H>MongoDB — the dominant document database in India</H>
      <P>MongoDB is used by Uber Eats for restaurant and menu data (menus change constantly — no fixed schema), by Lyft for driver and ride metadata, and by many early-stage startups that move fast and cannot afford to define a rigid schema before the product has found its shape. It is also extremely popular for storing event logs, user activity data, and any data where the structure varies per record.</P>

      <Callout type="tip">
        Document databases are not a replacement for relational databases — they are a complement. Most mature companies run both. PostgreSQL for transactional data where ACID matters and structure is stable. MongoDB for content, product catalogues, and user activity data where the schema evolves and reads dominate.
      </Callout>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Key-Value Databases — The Fastest Database That Exists" />

      <P>A key-value database is the simplest possible database: every piece of data is stored as a pair — a unique key and a value. The value can be anything: a string, a number, a JSON object, a binary blob. You retrieve data by key. There is no schema, no columns, no relationships, no query language. Just: <Hl>set(key, value)</Hl> and <Hl>get(key)</Hl>.</P>

      <P>This radical simplicity is the source of their superpower. Because there is nothing to parse, plan, or coordinate — just a key lookup in memory — key-value databases are <Hl>extraordinarily fast</Hl>. Redis, the most popular key-value database, can serve over 1 million operations per second on a single node with sub-millisecond latency. No relational database comes close to this for simple key lookups.</P>

      <H>What key-value databases are used for</H>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, margin: '16px 0 28px' }}>
        {[
          { use: 'Session storage', desc: 'User login sessions. Key = session token, Value = user ID and permissions. Sub-millisecond lookup on every API request.', company: 'Stripe, Brex' },
          { use: 'Caching', desc: 'Store the result of expensive database queries. Key = query fingerprint, Value = result. Serve from Redis instead of hitting PostgreSQL.', company: 'DoorDash, Uber Eats' },
          { use: 'Rate limiting', desc: 'Count how many API requests a user has made in the last minute. Increment a counter in Redis — atomic, fast, automatic expiry.', company: 'Venmo, Stripe' },
          { use: 'OTP storage', desc: 'Store a one-time password with a 5-minute expiry. Key = phone number, Value = OTP, TTL = 300 seconds. Automatic deletion when expired.', company: 'Every app with SMS login' },
          { use: 'Leaderboards', desc: 'Redis sorted sets let you maintain a ranked leaderboard with O(log n) insert and rank queries. Used in gaming apps and referral programs.', company: 'MPL, DraftKings' },
          { use: 'Pub/Sub messaging', desc: 'Redis supports publish/subscribe — one service publishes an event, multiple services receive it. Lightweight alternative to Kafka for simple messaging.', company: 'Shopify, Amazon' },
        ].map(item => (
          <div key={item.use} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{item.use}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 8 }}>{item.desc}</div>
            <div style={{ fontSize: 11, color: C, fontFamily: 'var(--font-mono)' }}>{item.company}</div>
          </div>
        ))}
      </div>

      <H>Redis — the key-value database every Indian startup uses</H>
      <P>Redis (Remote Dictionary Server) stores everything in memory, which is what makes it fast. It also supports persistence — writing snapshots to disk so data survives restarts. Redis is not just a simple key-value store — it supports rich data structures: strings, lists, sets, sorted sets, hashes, streams, and geospatial indexes. This makes it useful for a surprisingly wide range of use cases beyond simple caching.</P>

      <P>Almost every Indian tech company of any size runs Redis. DoorDash uses Redis to cache restaurant menus — a menu does not change every second, so serving it from Redis instead of PostgreSQL handles the 50× traffic spike at 7 PM without the database breaking a sweat. Stripe uses Redis for rate limiting API keys. Venmo uses it for session management across hundreds of millions of users.</P>

      <Callout type="warning">
        Redis stores data in memory. Memory is expensive and limited. Do not use Redis as your primary database — use it as a cache in front of your primary database. Always set TTL (Time To Live) on cached keys so stale data automatically expires. And always assume Redis data can be lost — design your system so it can rebuild the cache from the primary database if Redis restarts.
      </Callout>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Column-Family Databases — Built for Extreme Write Volume" />

      <P>Column-family databases (also called wide-column databases) store data in tables, but the tables work very differently from relational tables. In a column-family database, each row can have a completely different set of columns — and tables can have millions of columns. Data is stored physically by column rather than by row, which makes range scans across specific columns extremely fast.</P>

      <P>The dominant column-family database is <Hl>Apache Cassandra</Hl>. It was built by Facebook to handle their Inbox search — billions of messages, hundreds of millions of users, write rates that no relational database could sustain. Cassandra is designed from the ground up for massive write throughput and linear horizontal scalability — add more nodes and throughput scales linearly.</P>

      <H>How Cassandra is different from PostgreSQL</H>

      <div style={{ overflowX: 'auto', margin: '16px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Dimension', 'PostgreSQL', 'Cassandra'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Write throughput', '~10,000 writes/sec on a single node (tunable)', '~1,000,000 writes/sec across a cluster — writes are always fast'],
              ['Scaling model', 'Scale up (bigger server) or complex sharding', 'Scale out — add nodes and throughput scales linearly. No single point of failure'],
              ['Consistency', 'Strong — always consistent (CP)', 'Tunable — you choose consistency level per query (AP by default)'],
              ['JOINs', 'Full SQL JOIN support', 'No JOINs. One query = one table. Data must be denormalised'],
              ['Schema', 'Rigid — ALTER TABLE on large tables is painful', 'Flexible — add new columns without downtime'],
              ['Query patterns', 'Ad-hoc — query anything with SQL', 'Fixed — you design tables around your query patterns, not the other way around'],
              ['Best for', 'Complex relational data, financial systems', 'Time-series data, event logs, IoT data, write-heavy workloads at massive scale'],
            ].map(([dim, pg, cass], i) => (
              <tr key={dim} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 600, color: 'var(--text)', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{dim}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{pg}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{cass}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H>Who uses Cassandra in India</H>
      <P>Amazon uses Cassandra for their product catalogue and recommendation engine — hundreds of millions of products, billions of user interaction events, all written at a rate no relational database could absorb. Lyft uses Cassandra for ride event data — every GPS ping from every driver, every second, across millions of active rides. Hotstar (now JioCinema) used Cassandra for user watch history and playback state. The pattern is consistent: Cassandra is chosen when write volume is the primary constraint and the data does not need complex relational queries.</P>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Graph Databases — When Relationships Are the Data" />

      <P>In a relational database, relationships are stored implicitly through foreign keys and are reconstructed at query time through JOINs. In a graph database, relationships are <Hl>first-class citizens</Hl> — they are stored explicitly as edges with their own properties, and the database is optimised to traverse them. This makes certain types of queries dramatically faster than any relational equivalent.</P>

      <H>The graph model</H>
      <P>A graph database stores data as <Hl>nodes</Hl> (entities — a person, a product, a location) and <Hl>edges</Hl> (relationships between entities — FOLLOWS, PURCHASED, LOCATED_IN). Both nodes and edges can have properties. The database is physically designed for traversal — following edges from node to node — which is what makes multi-hop relationship queries fast.</P>

      <H>Where relational databases fail at graph queries</H>
      <P>Consider this question: "Find all users who might know Aisha Khan — specifically people who are followed by at least 3 of Aisha's direct followers, but who Aisha does not already follow." In SQL this requires multiple levels of self-joins on a users and follows table. On a social network with 100 million users, this query takes minutes — the JOIN fan-out is exponential. In Neo4j (the dominant graph database), the same query is expressed as a simple graph traversal and executes in milliseconds because the edges are physically stored next to their nodes.</P>

      <H>Where graph databases are used in India</H>
      <P>LinkedIn India's connection graph, fraud detection at fintech companies (Stripe uses graph analysis to detect fraud rings — accounts that share phones, addresses, or devices form a graph, and suspicious clusters become visible), recommendation engines at e-commerce companies (customers who bought this also bought that — a product graph), and knowledge graphs at content platforms. Neo4j and Amazon Neptune are the most common graph database choices in production.</P>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Time-Series Databases — Built for Metrics, Events, and IoT" />

      <P>A time-series database is optimised for storing and querying data that is indexed by time — measurements taken at regular intervals, or events that occur with a timestamp. Every data point has a timestamp, and the most common query pattern is "give me all values for this metric between time A and time B."</P>

      <H>Why time-series data is different</H>
      <P>Time-series data has properties that standard databases do not optimise for. It is <Hl>append-only</Hl> — you almost never update or delete historical measurements. It arrives in time order — writes are always for "now." It is queried in ranges — "last 6 hours," "last 30 days." It is often aggregated — "average CPU per 5-minute bucket." And it grows without bound — a server emitting metrics every second generates 86,400 data points per day, millions per year.</P>

      <P>Relational databases can store this data, but they are not optimised for the write rate (millions of inserts per second across thousands of metric series) or the range-aggregation query pattern. Time-series databases use specialised storage formats — columnar compression, time-partitioned storage — that make them 10–100× more efficient for this specific access pattern.</P>

      <H>Popular time-series databases</H>
      <P><Hl>InfluxDB</Hl> is the most popular open-source time-series database — used for application metrics, server monitoring, and IoT sensor data. <Hl>TimescaleDB</Hl> is PostgreSQL with time-series extensions — you get full SQL plus time-series optimisations, which makes it popular at companies that already run PostgreSQL and want one less database to operate. <Hl>Prometheus</Hl> is the standard for infrastructure metrics in Kubernetes environments — almost every Indian startup running on k8s uses Prometheus with Grafana dashboards.</P>

      <H>Who uses time-series databases in India</H>
      <P>Every company running cloud infrastructure uses time-series databases for monitoring — CPU, memory, latency, error rates, request volume. DoorDash monitors millions of time-series metrics across thousands of microservices. Venmo tracks transaction success rates per second across payment rails. Lyft tracks GPS pings and driver location updates. Any IoT application — smart meters, factory sensors, connected vehicles — is a natural time-series use case. Tata Motors uses time-series databases for vehicle telemetry from their connected car fleet.</P>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="How Real Companies Use Multiple Database Types Together" />

      <P>No production company uses just one type of database. Every system of meaningful complexity uses two, three, or four database types simultaneously — each handling the part of the problem it is best suited for. Here is how two well-known Indian companies actually structure their data infrastructure.</P>

      <H>DoorDash — food delivery at scale</H>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px', margin: '16px 0 28px' }}>
        {[
          { db: 'MySQL', color: '#4479A1', role: 'Core transactional data', detail: 'Orders, payments, customer accounts, restaurant accounts. Every rupee transaction runs through MySQL. ACID compliance is non-negotiable here.' },
          { db: 'MongoDB', color: '#10b981', role: 'Restaurant menus and item data', detail: 'Menus are deeply nested, change constantly, and have no fixed schema — a burger has different options than a thali. MongoDB\'s document model handles this naturally.' },
          { db: 'Redis', color: '#ff4757', role: 'Caching and session management', detail: 'Restaurant lists, user sessions, OTP storage, rate limiting. Every time you open DoorDash, the first screen is served from Redis — not MySQL — to handle the dinner-time spike.' },
          { db: 'Cassandra', color: '#8b5cf6', role: 'Order event log and delivery tracking', detail: 'Every GPS update from every delivery partner, every status change on every order. Millions of writes per hour at peak — only Cassandra handles this write rate.' },
          { db: 'Prometheus + InfluxDB', color: C, role: 'Infrastructure and application metrics', detail: 'CPU, latency, error rates across 500+ microservices. Alerts fire when delivery success rate drops below threshold.' },
        ].map(item => (
          <div key={item.db} style={{ display: 'flex', gap: 14, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
            <div style={{ flexShrink: 0, width: 10, height: 10, borderRadius: 3, background: item.color, marginTop: 5 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: item.color }}>{item.db}</span>
                <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: 600 }}>{item.role}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <H>Stripe — payment infrastructure</H>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px', margin: '16px 0 28px' }}>
        {[
          { db: 'PostgreSQL', color: '#336791', role: 'Payment transactions, merchant accounts', detail: 'Every payment, refund, and settlement. ACID compliance and DECIMAL money types are mandatory. Horizontal sharding by merchant_id for scale.' },
          { db: 'Redis', color: '#ff4757', role: 'API rate limiting, idempotency keys, sessions', detail: 'A merchant making 1000 API calls per second gets rate-limited in Redis — one atomic increment per call, no database hit needed.' },
          { db: 'Elasticsearch', color: '#f59e0b', role: 'Payment search and dispute management', detail: 'Merchants search their transactions by amount, date, customer, status. Full-text search across billions of transactions — SQL LIKE queries at this scale would take minutes.' },
          { db: 'InfluxDB / Prometheus', color: C, role: 'Payment success rate monitoring', detail: 'Real-time dashboards showing success rate per payment instrument, per bank, per second. When SBI\'s payment gateway degrades, an alert fires in under 30 seconds.' },
        ].map(item => (
          <div key={item.db} style={{ display: 'flex', gap: 14, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
            <div style={{ flexShrink: 0, width: 10, height: 10, borderRadius: 3, background: item.color, marginTop: 5 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: item.color }}>{item.db}</span>
                <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: 600 }}>{item.role}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <ProTip>
        When a system design interview asks "which database would you use?", the wrong answer is picking one and defending it absolutely. The right answer is: "It depends on the access pattern. I would use PostgreSQL for transactional data, Redis for caching and sessions, and Cassandra or MongoDB for [the specific high-volume component]." Knowing when to use each type — and being able to articulate why — is a senior-level signal that most candidates miss.
      </ProTip>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="The Decision Framework — How to Choose the Right Database" />

      <P>When you are designing a system and need to choose a database, run through these five questions in order. The answers will almost always point to the right choice.</P>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, margin: '20px 0 32px' }}>
        {[
          { n: '01', q: 'Does this data have relationships that need to be enforced?', a: 'Yes → Relational (PostgreSQL, MySQL). Foreign key constraints and JOINs are your friends. No → NoSQL is viable — consider the next questions.' },
          { n: '02', q: 'What is the primary access pattern?', a: 'Fetch one complete entity → Document (MongoDB). Key lookup, cache → Key-Value (Redis). Range scan by time → Time-Series (InfluxDB, TimescaleDB). Multi-hop relationship traversal → Graph (Neo4j). Anything complex → Relational.' },
          { n: '03', q: 'What are the write volume requirements?', a: 'Under ~100,000 writes/sec → Relational handles it. Over 100,000 writes/sec with simple write patterns → Cassandra. Metrics / IoT at millions/sec → Time-Series DB.' },
          { n: '04', q: 'Do you need ACID guarantees?', a: 'Yes (financial transactions, inventory, bookings) → Relational or CockroachDB/Spanner (NewSQL). No → NoSQL options open up significantly.' },
          { n: '05', q: 'How stable is the schema?', a: 'Well-defined and stable → Relational. Evolving rapidly or inherently variable → Document (MongoDB). No schema at all → Key-Value.' },
        ].map((step, i, arr) => (
          <div key={step.n} style={{ display: 'flex', gap: 20, marginBottom: i === arr.length - 1 ? 0 : 20 }}>
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${C}20`, border: `1px solid ${C}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)' }}>{step.n}</div>
              {i < arr.length - 1 && <div style={{ width: 1, flex: 1, background: 'var(--border)', marginTop: 6 }} />}
            </div>
            <div style={{ flex: 1, paddingBottom: i < arr.length - 1 ? 8 : 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{step.q}</div>
              <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{step.a}</div>
            </div>
          </div>
        ))}
      </div>

      <P>For this entire SQL course, you will use <Hl>DuckDB</Hl> — a modern analytical relational database that runs in your browser. Every query you write here translates directly to MySQL, PostgreSQL, or any other relational database. The relational model and SQL are universal — learn them once and you can work with any relational database on day one.</P>

      <SQLPlayground
        initialQuery={`-- The FreshCart database is a perfect relational database use case:
-- structured data, relationships that matter, complex queries needed
-- Let's see all three in action: JOIN across 3 tables
SELECT
  c.first_name || ' ' || c.last_name   AS customer,
  c.city,
  COUNT(o.order_id)                     AS total_orders,
  SUM(o.total_amount)                   AS total_spent,
  c.loyalty_tier
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_status = 'Delivered'
GROUP BY c.customer_id, c.first_name, c.last_name, c.city, c.loyalty_tier
ORDER BY total_spent DESC
LIMIT 8;`}
        height={180}
        showSchema={true}
      />

      <HR />

      {/* ── PART 11 — Day in the Life ── */}
      <Part n="11" title="What This Looks Like at Work" />

      <P>You are a backend engineer at a Series B fintech startup in Austin. The company processes UPI payments for small merchants. The CTO calls a system design meeting — you have hit 50,000 transactions per day and need to plan for 5 million. You are asked to review the current architecture and recommend database changes.</P>

      <TimeBlock time="2:00 PM" label="Current state — everything in MySQL">
        Right now, the company runs everything in a single MySQL instance: transactions, merchant profiles, session data, API rate limit counters, and audit logs. It works at 50k transactions/day but the CTO is worried. You pull up the MySQL slow query log and find three problems: session lookups are hitting the database on every API request (10,000 requests/second at peak), rate limit counters are doing read-modify-write cycles that create lock contention, and the audit log table has 500 million rows and is slowing down every backup.
      </TimeBlock>

      <TimeBlock time="2:45 PM" label="Your recommendation — three databases, not one">
        You draw the architecture on the whiteboard. Keep MySQL for payment transactions — it is correct and ACID compliant, which is non-negotiable for money. Move sessions and rate limiting to Redis — sub-millisecond lookup, atomic increments, automatic TTL expiry. Move the audit log to Cassandra — append-only, time-series-like access pattern, writes are always fast, and the data grows without a defined end. The CTO asks why not just add more MySQL servers. You explain: Redis is not just faster — it is 100× cheaper per operation for session data because it is in-memory and there is no SQL parsing, no query planning, no disk I/O. Cassandra is not just scalable — it is specifically designed for append-only audit data where you never need complex queries across rows.
      </TimeBlock>

      <TimeBlock time="4:00 PM" label="The decision is made">
        The CTO approves the architecture. You are asked to lead the Redis migration first — lowest risk, highest immediate impact. You estimate 3 days of engineering. The current session lookup time is 8ms average (MySQL query). After Redis, it will be under 0.5ms. At 10,000 requests per second, that is 75 seconds of latency saved per second of traffic. Not a percentage improvement — a 16× improvement.
      </TimeBlock>

      <ProTip>
        The ability to choose the right database for the right problem — and explain why, in business terms — is a rare skill. Most engineers learn one database well and reach for it for every problem. Engineers who understand the landscape choose databases the way a surgeon chooses instruments: precisely, based on the specific problem, with a clear rationale for each choice.
      </ProTip>

      <HR />

      {/* ── Interview Prep ── */}
      <Part n="12" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is the difference between SQL and NoSQL databases?">
        <p style={{ margin: '0 0 14px' }}>SQL databases are relational databases that store data in tables with rows and columns, enforce relationships through foreign keys, require a defined schema, and are queried using Structured Query Language. They guarantee ACID properties — atomicity, consistency, isolation, and durability — making them the standard choice for transactional data where correctness is critical. Examples: PostgreSQL, MySQL, Oracle.</p>
        <p style={{ margin: '0 0 14px' }}>NoSQL databases is a broad category covering any database that does not use the relational table model. The term covers four main sub-types: document databases (MongoDB — JSON documents), key-value stores (Redis — simple key lookups), column-family databases (Cassandra — wide rows, extreme write throughput), and graph databases (Neo4j — nodes and edges). They were built to solve specific problems that relational databases handle inefficiently: flexible schemas, horizontal scaling across hundreds of nodes, extreme write throughput, or relationship traversal.</p>
        <p style={{ margin: 0 }}>The choice between them is not about which is better — it is about which access pattern and consistency trade-off fits the problem. Most production systems at scale use both: relational for transactional data where ACID matters, NoSQL for the components where scale, flexibility, or speed is the primary constraint.</p>
      </IQ>

      <IQ q="What is the CAP theorem and why does it matter for database selection?">
        <p style={{ margin: '0 0 14px' }}>The CAP theorem states that a distributed data system can guarantee at most two of three properties: Consistency (every read receives the most recent write), Availability (every request receives a response), and Partition Tolerance (the system continues operating when network partitions occur). Since network partitions are inevitable in any real distributed system, the practical choice is always between consistency and availability when a partition occurs.</p>
        <p style={{ margin: '0 0 14px' }}>CP systems (Consistent + Partition Tolerant) return an error rather than stale data during a partition. PostgreSQL and MySQL are CP. They are appropriate for financial systems, inventory, and any data where an incorrect read is worse than a temporary unavailability. AP systems (Available + Partition Tolerant) always respond, but the response might be slightly stale. Cassandra and CouchDB are AP. They are appropriate for social feeds, search results, and analytics where serving slightly stale data is better than returning an error.</p>
        <p style={{ margin: 0 }}>In an interview, CAP theorem comes up in system design questions. The right answer is never "I will use a CP system" or "I will use an AP system" — it is "for the transactional component I need CP because incorrect balance information is catastrophic, and for the activity feed component I can use AP because a 2-second delay in showing a new post is acceptable."</p>
      </IQ>

      <IQ q="When would you use Redis over a relational database?">
        <p style={{ margin: '0 0 14px' }}>Redis is appropriate when the access pattern is a key lookup — retrieve a value by its exact key — and the latency requirement is sub-millisecond. The primary use cases are: caching (store the result of expensive database queries and serve from Redis for subsequent identical requests), session storage (user login state, permissions, preferences — retrieved on every authenticated API request), rate limiting (atomic increment of a counter with automatic TTL expiry), OTP storage (a one-time password with a short expiry is a perfect key-value pair), and pub/sub messaging (lightweight event broadcast between services).</p>
        <p style={{ margin: '0 0 14px' }}>Redis should not be used when you need: complex queries (JOIN, GROUP BY, aggregations), strong durability guarantees (Redis is memory-first — data can be lost if the server crashes without persistence configured), or as a primary database for relational data. Redis is most powerful as a layer in front of a relational database — it handles the hot, frequently-accessed data at microsecond speed, while the relational database handles the full dataset with all its query flexibility.</p>
        <p style={{ margin: 0 }}>A practical rule: if the question is "give me the value for key X" and the answer is used in less than 1 millisecond, Redis. If the question requires joining, filtering, or aggregating across multiple entities, relational database — possibly with Redis caching the result.</p>
      </IQ>

      <IQ q="What is a document database and what are its trade-offs compared to a relational database?">
        <p style={{ margin: '0 0 14px' }}>A document database stores data as self-contained documents — typically JSON — rather than as rows in tables. Each document can have any structure, and two documents in the same collection can have entirely different fields. Data that belongs together conceptually is stored together physically — a customer document can embed their address, contact details, and recent orders, rather than spreading that data across multiple tables.</p>
        <p style={{ margin: '0 0 14px' }}>The advantages over relational databases are: flexible schema (add new fields without a migration), fast reads for document-shaped access patterns (one read fetches the complete entity without JOINs), and easier horizontal scaling (documents can be distributed across nodes by a shard key). MongoDB is the dominant document database and is widely used for product catalogues, user profiles, content management systems, and any data where the structure varies per record or evolves frequently.</p>
        <p style={{ margin: 0 }}>The trade-offs are significant. No JOINs — if you need to query across collections, you either embed data (creating redundancy) or do multiple queries and join in application code. Cross-document transactions are limited — atomicity within a single document is guaranteed, but operations across multiple documents require careful design. Complex ad-hoc queries are harder — MongoDB's aggregation pipeline is powerful but less expressive than SQL for complex analytical queries. And because schema is not enforced, data quality problems (missing fields, wrong types) accumulate silently over time and must be managed in application code.</p>
      </IQ>

      <IQ q="Why would DoorDash use Cassandra instead of MySQL for delivery tracking data?">
        <p style={{ margin: '0 0 14px' }}>Delivery tracking data has specific characteristics that make Cassandra the right choice. First, write volume: at peak dinner time, DoorDash might have 500,000 active deliveries simultaneously, each emitting a GPS update every 5 seconds. That is 100,000 writes per second of location data alone. MySQL on a single node handles approximately 10,000–50,000 writes per second under optimal conditions — this is already at the limit. Cassandra is designed to handle millions of writes per second across a cluster, and adding nodes scales write throughput linearly.</p>
        <p style={{ margin: '0 0 14px' }}>Second, the access pattern is simple and fixed: "give me all location updates for order X in the last 30 minutes." This is a primary key lookup plus a time range — exactly what Cassandra's data model is optimised for. There is no need for JOINs, GROUP BY, or complex analytics on this data.</p>
        <p style={{ margin: 0 }}>Third, the data is append-only. Location updates are never updated or deleted while the delivery is active. After delivery completion, the data is rarely accessed. Cassandra's log-structured storage is optimised for append-only workloads — writes are always fast because they never need to find and update existing records. MySQL's write path requires finding the right page, checking constraints, and updating indexes — all slower for pure-append workloads. DoorDash still uses MySQL for the orders table itself (the authoritative record of the transaction), but delegates the high-volume, time-series-like tracking data to Cassandra.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="13" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="MongoServerError: Document failed validation — additional properties not allowed: 'loyalty_points'"
        cause="You tried to insert a document with a field that is not allowed by the collection's JSON Schema validator. MongoDB collections can have optional schema validation rules — when they are defined and a document violates them, MongoDB rejects the insert. This happens when a developer adds a new field to a document without first updating the schema validator, or when importing data from a source with different field names."
        fix="Check the collection's validator: db.getCollectionInfos({name: 'customers'})[0].options.validator — this shows the current schema rules. Either update the validator to allow the new field using db.runCommand({collMod: 'customers', validator: {...updated rules...}}), or remove the field from your document if it is genuinely not supposed to be there. If you are in development and want to temporarily disable validation, use db.runCommand({collMod: 'customers', validationLevel: 'off'}) — never do this in production."
      />

      <Err
        msg="WARN  o.a.c.c.QueryProcessor - Invalid query: Clustering column 'order_date' cannot be restricted by both an equality and an inequality relation"
        cause="In Cassandra, you are trying to use both = (equality) and > or < (range) on the same clustering column in the same query. Cassandra's query model is strict: you can only use range queries on the last clustering column in the WHERE clause, and only if all preceding clustering columns are filtered by equality. This is a fundamental constraint of Cassandra's storage model — data is sorted on disk by clustering columns, and only specific access patterns are efficiently supported."
        fix="Restructure your WHERE clause to use equality on all clustering columns except the last one, where you can use a range. If your query pattern requires filtering that does not match the table's clustering order, you may need to create a separate table (or materialized view) designed for that specific query. In Cassandra, you design tables around queries — not the other way around. Use ALLOW FILTERING sparingly and only in development — it forces a full table scan, which is extremely slow on large datasets."
      />

      <Err
        msg="redis.exceptions.ConnectionError: Error 111 connecting to localhost:6379. Connection refused."
        cause="The Redis server is not running or is not reachable at the specified host and port. This typically happens when: you have not started the Redis server (common in development), the Redis container has crashed or was not started, the host or port in your connection configuration is wrong, or a firewall rule is blocking the connection."
        fix="On Linux/Mac, check if Redis is running: redis-cli ping — if it returns PONG, Redis is up. If not, start it with: redis-server or sudo systemctl start redis. In a Docker setup: docker ps | grep redis to check if the container is running, docker start <container_name> to restart it. Check your connection string — default Redis is localhost:6379 with no password. If Redis is on a remote server, verify the host, port, and that the security group / firewall allows inbound on port 6379."
      />

      <Err
        msg="SQLSTATE[HY000]: General error: 1 no such table: customers (SQLite)"
        cause="You are trying to query a table that does not exist in the SQLite database file you have connected to. This happens when: you are connected to a different database file than the one where you created the table, the CREATE TABLE statement failed silently and the table was never created, you forgot to run the schema migration, or the database file was deleted and recreated empty."
        fix="List all tables in the current SQLite database: .tables in the sqlite3 shell, or SELECT name FROM sqlite_master WHERE type='table'; — this shows every table that actually exists. If the table is missing, run the CREATE TABLE statement again. If you are in a development environment that uses database file paths, double-check you are opening the correct .db file. In application code, ensure your database migration runs before any query is executed."
      />

      <Err
        msg="OperationalError: UNIQUE constraint failed: customers.email"
        cause="You are trying to insert or update a row where the email value already exists in another row, and the email column has a UNIQUE constraint. This error appears in SQLite (and similar in other databases) and is the database correctly preventing duplicate email addresses. Common causes: importing a dataset that has duplicate emails, a user registering twice with the same email, or a bug in application code that allows duplicate inserts."
        fix="Before inserting, check if the email already exists: SELECT customer_id FROM customers WHERE email = 'the_email@gmail.com'; — if a row is returned, handle it as a duplicate (update the existing record, or return 'email already registered' to the user). For bulk imports, deduplicate the source data first: SELECT email, COUNT(*) FROM source_data GROUP BY email HAVING COUNT(*) > 1; to find duplicates. If you want an insert-or-update behaviour (upsert), use INSERT OR REPLACE in SQLite, or INSERT ... ON CONFLICT DO UPDATE in PostgreSQL."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="FreshCart decides to expand: they want to store unstructured customer feedback (star rating, free-text review, photos, tags — all optional). They also want to add a real-time 'driver location' tracker for their delivery staff, updating every 5 seconds per active delivery. And they want to cache the homepage product list (same for all users, valid for 10 minutes). For each of these three new requirements — what type of database would you recommend, and why? The existing orders, products, and customers data stays in the relational database."
        hint="Think about each requirement's access pattern, schema flexibility, write volume, and how long the data needs to live. They all have different answers."
        answer={`1. Customer feedback → Document database (MongoDB)
   Reason: Feedback has no fixed schema — some reviews have photos, some have tags, 
   some just have text. Star rating is always present, everything else is optional. 
   This variable structure fits MongoDB's document model perfectly. You would never 
   JOIN feedback to other tables in complex ways — you just fetch feedback for a 
   given product. Schema flexibility + document-shaped reads = MongoDB.

2. Driver location tracker → Time-series or Key-Value (Redis or InfluxDB)
   Reason: Location updates are append-only, arrive every 5 seconds per delivery, 
   and you only ever query "current location of driver X" or "last N locations of 
   delivery Y." Redis is the simplest choice — key = driver_id, value = {lat, lng, 
   timestamp}, updated every 5 seconds with automatic expiry when the delivery ends. 
   For historical playback (showing the full route after delivery), a time-series 
   database like InfluxDB would be better.

3. Homepage product list cache → Key-Value (Redis)
   Reason: Same data for all users, valid for 10 minutes, retrieved on every page 
   load. This is the textbook Redis caching use case. Key = 'homepage_products', 
   value = serialized JSON of the product list, TTL = 600 seconds. The cache is 
   rebuilt from the relational database when it expires. Zero database load for 
   10 minutes per rebuild cycle.`}
        explanation="This is the multi-database architecture pattern that every real production system uses. Relational for structured transactional data (orders, products, customers). Document for flexible schema content (feedback, menus, user profiles). Key-value for speed-critical lookups (sessions, caches, live tracking). The art is knowing which type solves each specific problem — and being able to explain the reasoning behind each choice."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'The CAP theorem: distributed systems can guarantee at most 2 of Consistency, Availability, and Partition Tolerance. Since partitions are inevitable, the real choice is between consistency (CP) and availability (AP). Relational databases are CP. Cassandra and most NoSQL databases are AP.',
          'Relational databases (PostgreSQL, MySQL) are the right default for structured data with relationships, complex queries, and ACID requirements — financial systems, inventory, bookings, anything where correctness is critical.',
          'Document databases (MongoDB) store flexible JSON documents. Best for data with variable structure, content-heavy applications, and entity-centric access patterns. No JOINs — embed related data or accept multiple queries.',
          'Key-value databases (Redis) are the fastest database type for simple lookups. Best for caching, sessions, rate limiting, OTP storage, and any use case where you retrieve a value by an exact key with sub-millisecond requirements.',
          'Column-family databases (Cassandra) are built for extreme write throughput and linear horizontal scalability. Best for append-only data: event logs, delivery tracking, IoT sensor data, audit trails. No JOINs. Design tables around queries.',
          'Graph databases (Neo4j) store relationships as first-class entities. Best when relationships are the data — social networks, fraud ring detection, recommendation engines, knowledge graphs. Multi-hop traversals are dramatically faster than relational equivalents.',
          'Time-series databases (InfluxDB, TimescaleDB, Prometheus) are optimised for timestamp-indexed measurements. Best for infrastructure metrics, IoT sensor data, application performance monitoring. 10–100× more efficient than relational databases for this access pattern.',
          'No production system uses just one database type. DoorDash runs MySQL + MongoDB + Redis + Cassandra + Prometheus simultaneously — each handling the component it is best suited for.',
          'The database selection framework: Does it need relationships enforced? → Relational. What is the access pattern? → determines the NoSQL type. Write volume above 100k/sec? → Cassandra. ACID non-negotiable? → Relational. Schema unstable? → Document.',
          'For this entire SQL course, DuckDB runs in your browser. Every query you write translates directly to MySQL and PostgreSQL. The relational model and SQL are universal — master them here and you can work with any relational database from day one.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 04</strong>, you set up your local SQL environment — install MySQL or PostgreSQL, connect with a client, and run your first query on a real database server. If you prefer to keep using the browser playground for now, you can skip ahead to <strong>Module 05</strong> where the SQL writing begins.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/learn/sql/setting-up" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
            Module 04 → Setting Up
          </Link>
          <Link href="/learn/sql/select-from" style={{ background: 'none', color: 'var(--text)', border: '1px solid var(--border)', padding: '11px 20px', borderRadius: 7, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
            Skip to Module 05 → Your First Query
          </Link>
        </div>
      </div>

    </LearnLayout>
  );
}