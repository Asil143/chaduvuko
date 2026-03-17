import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'NoSQL Databases — Complete Guide | DBMS | Chaduvuko',
  description:
    'Complete NoSQL guide from first principles — why NoSQL exists, key-value stores, document databases, column-family stores, graph databases, time-series databases, choosing the right NoSQL type, and every interview pattern with real production examples.',
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

export default function NoSQLDatabases() {
  return (
    <LearnLayout
      title="NoSQL Databases"
      description="Why relational databases are not always the right tool, what NoSQL means in practice, and how each NoSQL family solves a specific class of problem that SQL databases handle poorly."
      section="DBMS"
      readTime="85–100 min"
      updatedAt="March 2026"
    >

      {/* ========================================
          PART 1 — WHY NOSQL EXISTS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 01 — The Origin" />
        <SectionTitle>Why NoSQL Exists — The Problems That Relational Databases Solve Poorly</SectionTitle>

        <Para>
          NoSQL is not a rejection of relational databases. It is an acknowledgment
          that relational databases were designed around a specific set of assumptions
          — structured data with a known schema, moderate scale, and the primacy of
          data integrity — and that those assumptions do not hold for every problem.
          When you encounter a problem where those assumptions break down, a different
          data model serves you better.
        </Para>

        <Para>
          The term NoSQL was coined around 2009 and stands for "Not Only SQL" — a
          recognition that SQL databases solve many problems well, but not all of them.
          The NoSQL movement emerged from the engineering challenges faced by
          internet-scale companies (Google, Amazon, Facebook) in the mid-2000s, and
          the internal systems they built to address those challenges became the
          first NoSQL databases (Bigtable, Dynamo, Cassandra).
        </Para>

        <SubTitle>The Four Pain Points That Drive People Toward NoSQL</SubTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
          {[
            {
              pain: 'Impedance Mismatch — Object vs Table',
              color: '#0078d4',
              problem: 'Application objects (a User object with embedded addresses, preferences, and activity history) map awkwardly to normalised relational tables. To store one User object you might need 6 tables, 5 joins, and 20 foreign key relationships. Reading it back requires a complex multi-join query. Every read and write involves a non-trivial translation layer.',
              nosql_answer: 'Document databases (MongoDB, CouchDB) store the entire object as a single document. The object in the database matches the object in the application code. One read, one document, no joins.',
            },
            {
              pain: 'Scale Beyond One Machine',
              color: 'var(--accent)',
              problem: 'Relational databases are designed for vertical scaling (bigger machines). Horizontal scaling (more machines) requires sharding, which breaks JOIN operations across shard boundaries, complicates transactions, and adds enormous operational complexity. When you have petabytes of data or millions of writes per second, the relational model becomes an impediment.',
              nosql_answer: 'NoSQL databases are designed from the ground up for horizontal scaling. Cassandra, HBase, and DynamoDB distribute data across hundreds of nodes with no single coordinator. Adding capacity means adding nodes.',
            },
            {
              pain: 'Schema Rigidity',
              color: '#f97316',
              problem: 'Relational schemas are defined upfront. Adding a column to a table with billions of rows requires an ALTER TABLE that can take hours and locks the table. For rapidly evolving applications where the data model changes weekly, schema migrations become a major bottleneck.',
              nosql_answer: 'Document and key-value databases are schema-flexible. Different documents in the same collection can have different fields. Adding a new field to some documents doesn\'t require migrating the entire collection.',
            },
            {
              pain: 'Specific Access Patterns That SQL Handles Inefficiently',
              color: '#8b5cf6',
              problem: 'Some data structures and query patterns do not map naturally to tables. A graph of social connections (who follows whom, who is friends with whom) requires recursive queries or many self-joins in SQL. Time-series data (10 million sensor readings per second) requires specific write optimisations that row-store databases cannot provide. Caching frequently-accessed data in a relational database wastes the relational engine\'s capabilities.',
              nosql_answer: 'Specialised databases for specialised access patterns: graph databases for relationship traversal, time-series databases for high-throughput sequential writes, key-value stores for caching.',
            },
          ].map((item) => (
            <div key={item.pain} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '18px 22px' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 10 }}>{item.pain}</div>
              <Para><strong style={{ color: 'var(--text)' }}>The relational problem:</strong> {item.problem}</Para>
              <Para><strong style={{ color: item.color }}>The NoSQL answer:</strong> {item.nosql_answer}</Para>
            </div>
          ))}
        </div>

        <SubTitle>What NoSQL Gives Up — The Real Trade-offs</SubTitle>

        <Para>
          NoSQL databases trade relational guarantees for scalability and flexibility.
          Understanding what is given up is as important as understanding what is gained.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 12, marginBottom: 24 }}>
          {[
            { tradeoff: 'ACID transactions', detail: 'Most NoSQL databases provide only BASE guarantees. Multi-document transactions are either absent or expensive. No roll-back on partial failures across multiple records without application-level compensation.', color: '#ff4757' },
            { tradeoff: 'Joins', detail: 'NoSQL databases generally do not support joins. If you need data from two collections, you do multiple queries in the application and join in code. This is intentional — joins across distributed nodes are prohibitively expensive.', color: '#ff4757' },
            { tradeoff: 'Schema enforcement', detail: 'Schema flexibility is a double-edged sword. Without a schema, nothing prevents bad data from being written. Inconsistent document structures make queries brittle. Data quality requires application-level validation.', color: '#f97316' },
            { tradeoff: 'Ad-hoc queries', detail: 'Relational databases can answer arbitrary questions efficiently with SQL. NoSQL databases are optimised for specific query patterns defined at design time. Unexpected queries often require full table scans.', color: '#f97316' },
            { tradeoff: 'Normalisation and consistency', detail: 'NoSQL encourages denormalisation (embedding data). When the same data is stored in multiple places, updates must be made in multiple places. Eventual consistency means reads may return stale data.', color: '#facc15' },
          ].map((item) => (
            <div key={item.tradeoff} style={{ background: 'var(--surface)', border: `1px solid ${item.color}20`, borderTop: `3px solid ${item.color}`, borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: item.color, marginBottom: 6 }}>{item.tradeoff}</div>
              <Para>{item.detail}</Para>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 2 — KEY-VALUE STORES
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 02 — Key-Value Stores" />
        <SectionTitle>Key-Value Stores — The Simplest and Fastest NoSQL Model</SectionTitle>

        <Para>
          A key-value store is the simplest possible database model: a giant,
          distributed dictionary. Every item of data is stored as a value associated
          with a unique key. You look up data by its key — O(1) average case.
          You cannot query by value, you cannot do range scans on values,
          you cannot filter across keys without scanning all of them.
          In exchange for this limitation you get the fastest possible lookups
          at the largest possible scale.
        </Para>

        <SubTitle>Redis — The Most Widely Used Key-Value Store</SubTitle>

        <Para>
          Redis (Remote Dictionary Server) is an in-memory key-value store with
          persistence options. Its defining characteristic is that it stores data
          in RAM — read and write latency is measured in microseconds, not milliseconds.
          Redis also supports rich data types beyond simple string values,
          making it far more powerful than a plain dictionary.
        </Para>

        <CodeBox label="Redis data types and commands — complete reference">
{`// ─────────────────────────────────────────────────────────────────
// STRING — simple key-value pairs
// ─────────────────────────────────────────────────────────────────
SET user:1001:name "Rahul Sharma"
GET user:1001:name           -- returns "Rahul Sharma"
SET user:1001:session "tok_abc123xyz" EX 3600   -- expires in 3600 seconds
TTL user:1001:session        -- returns remaining TTL in seconds
INCR page:homepage:visits    -- atomic increment (great for counters)
INCRBY order:5001:attempts 1 -- increment by specific amount
SETNX config:maintenance "1" -- SET if Not eXists (atomic, for distributed locks)

// ─────────────────────────────────────────────────────────────────
// HASH — nested key-value (object/struct)
// ─────────────────────────────────────────────────────────────────
HSET user:1001 name "Rahul Sharma" email "rahul@email.com" city "Bengaluru" tier "Gold"
HGET  user:1001 name              -- "Rahul Sharma"
HGETALL user:1001                 -- all fields and values
HMGET user:1001 name email        -- multiple fields at once
HINCRBY user:1001 order_count 1   -- increment a hash field atomically
HDEL user:1001 tier               -- delete one field

// USE CASE: Caching database objects
// Instead of serialising the entire user object as JSON,
// store individual fields as a hash. Can update one field (e.g., city)
// without reading and rewriting the entire object.

// ─────────────────────────────────────────────────────────────────
// LIST — ordered collection (deque)
// ─────────────────────────────────────────────────────────────────
RPUSH notifications:user:1001 "Order #5001 delivered" "Review reminder"
LPUSH feed:user:1001 "new_post:P123"    -- prepend (most recent first)
LRANGE feed:user:1001 0 19              -- get first 20 items (pagination)
LPOP  job_queue                         -- pop from left (FIFO queue)
RPOPLPUSH src_queue processing_queue    -- atomic move (reliable queue)
LLEN  feed:user:1001                    -- length of list

// USE CASE: Activity feeds, message queues, recent items lists
// Twitter/Instagram-style home feed: LPUSH new posts, LRANGE for pagination

// ─────────────────────────────────────────────────────────────────
// SET — unordered collection of unique strings
// ─────────────────────────────────────────────────────────────────
SADD user:1001:interests "cricket" "movies" "biryani"
SISMEMBER user:1001:interests "cricket"  -- 1 (yes) or 0 (no)
SMEMBERS user:1001:interests             -- all members
SCARD user:1001:interests                -- count of members
SINTER user:1001:interests user:1002:interests  -- intersection (common interests)
SUNION user:1001:interests user:1002:interests  -- union
SDIFF  user:1001:interests user:1002:interests  -- difference

// USE CASE: Unique visitor tracking, tag systems, friend recommendations
// "Which articles has this user already seen?" — store article IDs in a set
// O(1) membership check: SISMEMBER

// ─────────────────────────────────────────────────────────────────
// SORTED SET (ZSET) — set with float scores, ordered by score
// ─────────────────────────────────────────────────────────────────
ZADD leaderboard 8500 "player:rahul"
ZADD leaderboard 9200 "player:priya"
ZADD leaderboard 7800 "player:arjun"
ZRANK  leaderboard "player:priya"        -- 0 (rank, 0-indexed, lowest score first)
ZREVRANK leaderboard "player:priya"      -- 0 (rank from highest: priya is #1)
ZRANGE  leaderboard 0 2 WITHSCORES       -- bottom 3 with scores
ZREVRANGE leaderboard 0 9 WITHSCORES     -- top 10 with scores (leaderboard!)
ZINCRBY leaderboard 300 "player:arjun"  -- add 300 points to arjun's score
ZRANGEBYSCORE leaderboard 8000 9000     -- players with score between 8000-9000

// USE CASE: Leaderboards, rate limiting, priority queues, trending content
// Real-time game leaderboard: ZADD on every score update, ZREVRANGE for top-N
// Rate limiting: score = timestamp, count members in last minute window

// ─────────────────────────────────────────────────────────────────
// BITMAP — compact bit array operations
// ─────────────────────────────────────────────────────────────────
SETBIT user:1001:daily_login 20240315 1  -- user logged in on day 20240315
GETBIT user:1001:daily_login 20240315    -- 1 (they did)
BITCOUNT user:1001:daily_login           -- total days logged in

// USE CASE: Tracking daily active users, feature flags
// "How many users logged in today?" — BITCOUNT a shared bitmap
// Storage: 100 million users tracked in 12.5 MB (1 bit per user)

// ─────────────────────────────────────────────────────────────────
// PERSISTENCE OPTIONS
// ─────────────────────────────────────────────────────────────────
// RDB (snapshot): periodic dump of entire dataset to disk
//   Fast restarts, compact file, but may lose last few minutes of data on crash
// AOF (Append-Only File): log every write operation
//   More durable (can sync every second or every operation), larger file
// Both: use RDB for backups, AOF for durability (recommended production setup)`}
        </CodeBox>

        <SubTitle>DynamoDB — Key-Value at AWS Scale</SubTitle>

        <Para>
          Amazon DynamoDB is a fully managed key-value and document database.
          Unlike Redis (in-memory with optional persistence), DynamoDB stores data
          durably on SSDs and scales to any throughput by automatically sharding
          across nodes. It is the database behind many of Amazon's own services
          including the shopping cart, session management, and order tracking.
        </Para>

        <CodeBox label="DynamoDB data model and access patterns">
{`// DYNAMODB TABLE STRUCTURE:
// Every item has a primary key:
//   Simple primary key: just a partition key (PK)
//   Composite primary key: partition key (PK) + sort key (SK)
//
// Access patterns MUST be defined upfront — DynamoDB is query-first design

// EXAMPLE: E-commerce order system
// Table: Orders
// PK: customer_id (partition key — determines which node stores this item)
// SK: order_date#order_id (sort key — orders sorted by date within a customer)

// WRITE:
{
  "customer_id": "C001",                    // PK
  "order_date#order_id": "2024-03-15#O5001", // SK
  "status": "delivered",
  "total_amount": 280.00,
  "items": ["biryani", "raita"],            // flexible attributes
  "restaurant": "Biryani House"
}

// QUERY: "All orders for customer C001 in March 2024"
// KeyConditionExpression: customer_id = 'C001'
//                    AND begins_with(sort_key, '2024-03')
// → Efficiently retrieves all March 2024 orders for C001
// Scans only C001's partition, sorted by date — O(log n) + O(k results)

// GLOBAL SECONDARY INDEX (GSI): query by non-primary-key attributes
// GSI on status#order_date to find "all delivered orders in March 2024"
// GSI on restaurant to find "all orders from Biryani House"
// Each GSI is essentially a copy of the data sorted differently

// CAPACITY UNITS:
// Read Capacity Unit (RCU): 1 strongly consistent read of up to 4KB
// Write Capacity Unit (WCU): 1 write of up to 1KB
// On-demand mode: automatically scales, pay per request
// Provisioned mode: set RCUs and WCUs, pay for provisioned capacity

// DYNAMODB STREAMS: capture all changes as a stream
// Trigger Lambda functions on item changes
// Replicate to other systems (Elasticsearch for search, Redshift for analytics)
// Event-driven architecture patterns`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 3 — DOCUMENT DATABASES
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 03 — Document Databases" />
        <SectionTitle>Document Databases — Flexible Schema for Hierarchical Data</SectionTitle>

        <Para>
          Document databases store data as semi-structured documents — typically JSON,
          BSON, or XML. A document is a self-contained unit of data that can contain
          nested objects and arrays, representing a complex entity without joins.
          The document model is the most natural fit when your data naturally forms
          a hierarchy — an order with multiple items, a blog post with multiple comments,
          a user profile with multiple addresses.
        </Para>

        <SubTitle>MongoDB — The Most Popular Document Database</SubTitle>

        <Para>
          MongoDB stores documents in collections (analogous to tables in SQL).
          Documents within a collection do not need to have the same structure —
          schema flexibility is a first-class feature. MongoDB provides a rich
          query language, aggregation pipeline, and supports secondary indexes
          including geospatial, text, and compound indexes.
        </Para>

        <CodeBox label="MongoDB — document structure, CRUD, and aggregation pipeline">
{`// DOCUMENT STRUCTURE: embedded vs referenced
// Embed when: data is always accessed together, document count is bounded
// Reference when: data is large, accessed independently, or reused by many documents

// EMBEDDED (good when you always read the whole order):
{
  "_id": ObjectId("65f2a1b3..."),
  "order_id": "O5001",
  "customer": {
    "customer_id": "C001",
    "name": "Rahul Sharma",
    "city": "Bengaluru"
  },
  "restaurant": {
    "restaurant_id": "R01",
    "name": "Biryani House"
  },
  "items": [
    { "name": "Chicken Biryani", "qty": 1, "price": 280.00 },
    { "name": "Raita",           "qty": 1, "price":  40.00 }
  ],
  "total": 320.00,
  "status": "delivered",
  "created_at": ISODate("2024-03-15T14:32:00Z")
}

// CRUD OPERATIONS:
// INSERT:
db.orders.insertOne({ order_id: "O5002", status: "pending", total: 180 });
db.orders.insertMany([...array of documents...]);

// FIND (SELECT equivalent):
db.orders.find({ status: "delivered" })
db.orders.find({ "customer.city": "Bengaluru", total: { $gt: 300 } })
// Dot notation accesses embedded fields: "customer.city"

// PROJECTION (SELECT specific fields):
db.orders.find(
  { status: "delivered" },
  { order_id: 1, total: 1, "customer.name": 1, _id: 0 }
)

// QUERY OPERATORS:
// $gt, $lt, $gte, $lte, $ne, $in, $nin — comparison
// $and, $or, $not, $nor — logical
// $exists, $type — element operators
// $regex — pattern matching
// $elemMatch — match array elements

db.orders.find({
  status: { $in: ["delivered", "out_for_delivery"] },
  total:  { $gte: 200 },
  created_at: { $gte: ISODate("2024-01-01") }
})

// UPDATE:
db.orders.updateOne(
  { order_id: "O5001" },                     // filter
  { $set: { status: "delivered" },           // update operators
    $currentDate: { delivered_at: true } }
)
db.orders.updateMany(
  { "customer.city": "Bengaluru", status: "pending" },
  { $set: { priority: "high" } }
)
// UPDATE OPERATORS: $set, $unset, $inc, $push, $pull, $addToSet

// DELETE:
db.orders.deleteOne({ order_id: "O5001" })
db.orders.deleteMany({ status: "cancelled", created_at: { $lt: ISODate("2024-01-01") } })

// ─────────────────────────────────────────────────────────────────
// AGGREGATION PIPELINE — MongoDB's most powerful feature
// ─────────────────────────────────────────────────────────────────
db.orders.aggregate([
  // Stage 1: Filter (like WHERE)
  { $match: {
    status: "delivered",
    created_at: { $gte: ISODate("2024-01-01") }
  }},

  // Stage 2: Group (like GROUP BY + aggregate functions)
  { $group: {
    _id: "$customer.city",              // group by city
    total_revenue: { $sum: "$total" },
    order_count:   { $sum: 1 },
    avg_order:     { $avg: "$total" },
    max_order:     { $max: "$total" }
  }},

  // Stage 3: Sort (like ORDER BY)
  { $sort: { total_revenue: -1 } },     // descending

  // Stage 4: Limit (like LIMIT)
  { $limit: 10 },

  // Stage 5: Project (like SELECT with computed fields)
  { $project: {
    city: "$_id",
    total_revenue: 1,
    order_count: 1,
    avg_order: { $round: ["$avg_order", 2] },
    _id: 0
  }}
])
// Result: top 10 cities by revenue in 2024`}
        </CodeBox>

        <SubTitle>MongoDB Indexing — Essential for Performance</SubTitle>

        <CodeBox label="MongoDB indexes — every type with use cases">
{`// SINGLE FIELD INDEX:
db.orders.createIndex({ customer_id: 1 })   // ascending
db.orders.createIndex({ created_at: -1 })   // descending (latest first)

// COMPOUND INDEX (order of fields matters — leftmost prefix rule applies):
db.orders.createIndex({ "customer.city": 1, created_at: -1 })
// Efficiently serves: queries on city alone, queries on city+date
// Does NOT efficiently serve: queries on date alone (not leftmost)

// TEXT INDEX (full-text search):
db.restaurants.createIndex({ name: "text", description: "text" })
db.restaurants.find({ $text: { $search: "biryani chicken" } })
// Returns documents containing these words anywhere in indexed fields

// GEOSPATIAL INDEX (2dsphere — spherical coordinates):
db.restaurants.createIndex({ location: "2dsphere" })
db.restaurants.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [77.5946, 12.9716] }, // Bengaluru
      $maxDistance: 5000  // 5km radius
    }
  }
})

// TTL INDEX (auto-expire documents):
db.sessions.createIndex({ created_at: 1 }, { expireAfterSeconds: 3600 })
// Sessions older than 1 hour are automatically deleted by MongoDB

// PARTIAL INDEX (only index documents meeting a condition):
db.orders.createIndex(
  { customer_id: 1 },
  { partialFilterExpression: { status: "pending" } }
)
// Only pending orders are in the index — much smaller, faster for pending order queries

// EXPLAIN to check index usage:
db.orders.find({ customer_id: "C001" }).explain("executionStats")
// Look for: "IXSCAN" (index used) vs "COLLSCAN" (full collection scan)
// totalDocsExamined should be close to nReturned for good index usage`}
        </CodeBox>

        <SubTitle>Document Database — When to Use and When Not To</SubTitle>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 10, padding: '18px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 12 }}>Use Document DB When</div>
            {[
              'Data naturally forms hierarchical documents (orders with items, blog posts with comments)',
              'Schema evolves frequently — different records have different structures',
              'You always read the document as a whole unit (no partial reads)',
              'The application team owns the data model and it maps closely to application objects',
              'Content management, product catalogs, user profiles',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <span style={{ color: 'var(--accent)', flexShrink: 0 }}>✓</span>
                <Para>{item}</Para>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.3)', borderRadius: 10, padding: '18px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#ff4757', marginBottom: 12 }}>Avoid Document DB When</div>
            {[
              'You frequently need to join data across document types',
              'You need multi-document ACID transactions as a core requirement',
              'Data is highly relational with complex referential integrity needs',
              'You need to run arbitrary analytical queries (ad-hoc SQL-style analysis)',
              'Financial transactions where partial updates are catastrophic',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <span style={{ color: '#ff4757', flexShrink: 0 }}>✗</span>
                <Para>{item}</Para>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          PART 4 — COLUMN-FAMILY STORES
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 04 — Column-Family Stores" />
        <SectionTitle>Column-Family Stores — Write-Optimised at Massive Scale</SectionTitle>

        <Para>
          Column-family databases (also called wide-column stores) organise data into
          rows and columns, but with a crucial difference from relational databases:
          different rows can have completely different columns, and columns are grouped
          into <strong style={{ color: 'var(--accent)' }}>column families</strong>
          that are stored together on disk. The data model is a sparse, distributed,
          multi-dimensional sorted map.
        </Para>

        <Para>
          The defining characteristic: column-family stores are designed for
          extremely high write throughput at scale. They achieve this through an
          architecture that converts random writes into sequential writes
          using an in-memory write buffer (memtable) and append-only disk files (SSTables).
        </Para>

        <SubTitle>Cassandra — The Most Widely Used Column-Family Store</SubTitle>

        <Para>
          Apache Cassandra was developed at Facebook to handle inbox search — storing
          billions of messages across hundreds of nodes with no single point of failure.
          It combines Google's Bigtable data model with Amazon's Dynamo architecture:
          leaderless, peer-to-peer, with tunable consistency.
        </Para>

        <CodeBox label="Cassandra data model — query-first design">
{`// CASSANDRA DESIGN RULE: design tables around your queries, not your entities
// In SQL: design normalised entities, write any query
// In Cassandra: decide your queries first, design tables to answer them

// ─────────────────────────────────────────────────────────────────
// CASSANDRA TABLE STRUCTURE:
// Partition Key: determines which node stores this row (hash-based sharding)
// Clustering Key: sorts rows within a partition on disk
// ─────────────────────────────────────────────────────────────────

// QUERY 1: "Get all orders for a customer, sorted by date descending"
CREATE TABLE orders_by_customer (
    customer_id   UUID,
    order_date    TIMESTAMP,
    order_id      UUID,
    status        TEXT,
    total_amount  DECIMAL,
    restaurant    TEXT,
    PRIMARY KEY (customer_id, order_date, order_id)
    -- customer_id: PARTITION KEY (all rows for one customer on same node)
    -- order_date, order_id: CLUSTERING KEYS (sorted on disk within partition)
) WITH CLUSTERING ORDER BY (order_date DESC, order_id DESC);

// This query is fast (reads from one partition, pre-sorted):
SELECT * FROM orders_by_customer
WHERE customer_id = c1234
ORDER BY order_date DESC
LIMIT 20;

// This query is FORBIDDEN (no partition key filter = full cluster scan):
SELECT * FROM orders_by_customer WHERE status = 'pending'; -- ERROR or very slow

// QUERY 2: "Get all orders for a restaurant, sorted by date"
-- Same data, different table! Cassandra recommends denormalisation.
CREATE TABLE orders_by_restaurant (
    restaurant_id UUID,
    order_date    TIMESTAMP,
    order_id      UUID,
    customer_id   UUID,
    status        TEXT,
    total_amount  DECIMAL,
    PRIMARY KEY (restaurant_id, order_date, order_id)
) WITH CLUSTERING ORDER BY (order_date DESC);

-- When an order is placed: insert into BOTH tables
-- This is intentional denormalisation for query efficiency

// ─────────────────────────────────────────────────────────────────
// CASSANDRA WRITE PATH — why writes are so fast
// ─────────────────────────────────────────────────────────────────
// 1. Write to Commit Log (sequential append — extremely fast)
// 2. Write to Memtable (in-memory table for this column family)
// 3. Acknowledge to client ← happens here, before hitting disk!
// 4. Background: when memtable is full, flush to SSTable (Sorted String Table)
// 5. Background: compaction merges SSTables, removes tombstones (deleted rows)

// WHY IT'S FAST: steps 1-3 are all sequential writes or in-memory operations
// No random disk I/O for writes — all disk writes are sequential

// READ PATH (more complex than writes):
// 1. Check bloom filter — is this key potentially in this SSTable?
// 2. Check key cache — is the disk offset known?
// 3. Read row index from SSTable → find exact page
// 4. Read the actual data from disk page
// 5. Merge results from all SSTables (multiple versions may exist)
// Reads are more expensive than writes in Cassandra

// ─────────────────────────────────────────────────────────────────
// CASSANDRA CONSISTENCY LEVELS (tunable per query)
// ─────────────────────────────────────────────────────────────────
// ONE:    write/read succeeds when 1 replica responds
//         fastest, weakest consistency
// QUORUM: write/read succeeds when majority (floor(RF/2)+1) responds
//         balanced consistency and availability (RF=3 → 2 nodes needed)
// ALL:    write/read requires all replicas to respond
//         strongest, fails if any replica down
// LOCAL_QUORUM: quorum within the local data centre only
//         good for multi-DC deployments with cross-DC latency

-- Example queries with consistency levels:
INSERT INTO orders_by_customer (...) VALUES (...)
USING CONSISTENCY QUORUM;  -- write to majority of replicas

SELECT * FROM orders_by_customer
WHERE customer_id = ?
LIMIT 20
USING CONSISTENCY ONE;  -- read from nearest replica (fastest, possibly stale)`}
        </CodeBox>

        <SubTitle>HBase — Column-Family Store for the Hadoop Ecosystem</SubTitle>

        <Para>
          Apache HBase is an open-source implementation of Google's Bigtable, designed
          to run on top of HDFS (Hadoop Distributed File System). Where Cassandra is
          leaderless and peer-to-peer, HBase uses a master-region server architecture.
          HBase is the database of choice for applications that need random read/write
          access to petabytes of data — the use case Bigtable was originally designed for.
        </Para>

        <CodeBox label="HBase data model — rows, column families, cells, and timestamps">
{`// HBASE ROW KEY: the primary access mechanism
// Rows are sorted lexicographically by row key
// Row key design is the most critical design decision in HBase

// TABLE: web_crawl
// Row key: reversed URL (com.example.www/page)
// Column family: info (metadata), content (page content), links (outbound links)

// ROW STRUCTURE:
// RowKey           | CF:info                  | CF:content     | CF:links
// com.google.www/  | title:"Google",lang:"en" | <html>...</html>| cnt:3
// com.twitter.www/ | title:"Twitter",lang:"en"| <html>...</html>| cnt:150

// MULTI-VERSION (timestamps):
// Each cell can have multiple versions (timestamped)
// Get the version at a specific timestamp:
// HBase.get(row, cf, col, timestamp)
// Default: return the latest version

// JAVA API (simplified):
Table table = connection.getTable(TableName.valueOf("orders"));

// PUT (write):
Put put = new Put(Bytes.toBytes("customer:C001:2024-03-15:O5001")); // row key
put.addColumn(Bytes.toBytes("order_info"),     // column family
              Bytes.toBytes("status"),          // qualifier
              Bytes.toBytes("delivered"));      // value
put.addColumn(Bytes.toBytes("order_info"),
              Bytes.toBytes("total"),
              Bytes.toBytes("320.00"));
table.put(put);

// GET (read by row key):
Get get = new Get(Bytes.toBytes("customer:C001:2024-03-15:O5001"));
Result result = table.get(get);
byte[] status = result.getValue(Bytes.toBytes("order_info"),
                                Bytes.toBytes("status"));

// SCAN (range scan on row keys):
Scan scan = new Scan();
scan.withStartRow(Bytes.toBytes("customer:C001:2024-03-01"));
scan.withStopRow(Bytes.toBytes("customer:C001:2024-03-31\xFF"));
// Scans all orders for C001 in March 2024 — leverages sorted row key order

// ROW KEY DESIGN FOR HOT SPOT AVOIDANCE:
// BAD: timestamp prefix — all recent writes go to same region (hot region)
//   20240315:C001:O5001
// GOOD: hash prefix + data
//   [md5(C001) first 4 chars]:C001:20240315:O5001
// Distributes writes across all regions evenly`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 5 — GRAPH DATABASES
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 05 — Graph Databases" />
        <SectionTitle>Graph Databases — Native Storage for Relationship-Heavy Data</SectionTitle>

        <Para>
          Some problems are fundamentally about relationships. Social networks
          (who follows whom), fraud detection (which accounts share phone numbers
          or devices), recommendation engines (users who bought X also bought Y),
          knowledge graphs, supply chain dependencies — these are all graph problems.
          In a relational database, graph traversal requires recursive queries
          or self-joins that become exponentially expensive with depth.
          Graph databases store and query graph structures natively.
        </Para>

        <SubTitle>Neo4j — The Most Widely Used Graph Database</SubTitle>

        <Para>
          Neo4j stores data as nodes (entities) and edges (relationships between entities).
          Both nodes and edges can have properties (key-value attributes).
          The query language, Cypher, uses ASCII-art syntax that mirrors the graph
          structure visually — relationships look like arrows between node circles.
        </Para>

        <CodeBox label="Neo4j and Cypher — nodes, relationships, and traversal queries">
{`// DATA MODEL:
// Nodes: represent entities — (Customer), (Restaurant), (MenuItem), (Order)
// Relationships: represent connections — [:PLACED], [:ORDERED], [:SERVES], [:FOLLOWS]
// Properties: key-value attributes on both nodes and relationships

// CREATE nodes:
CREATE (rahul:Customer {id: 'C001', name: 'Rahul Sharma', city: 'Bengaluru'})
CREATE (biryani_house:Restaurant {id: 'R01', name: 'Biryani House', rating: 4.5})
CREATE (chicken_biryani:MenuItem {id: 'M001', name: 'Chicken Biryani', price: 280})

// CREATE relationships:
MATCH (c:Customer {id: 'C001'}), (r:Restaurant {id: 'R01'})
CREATE (c)-[:PLACED_ORDER {order_id: 'O5001', date: '2024-03-15', total: 320}]->(r)

MATCH (r:Restaurant {id: 'R01'}), (m:MenuItem {id: 'M001'})
CREATE (r)-[:SERVES]->(m)

// ─────────────────────────────────────────────────────────────────
// TRAVERSAL QUERIES — where graph databases shine
// ─────────────────────────────────────────────────────────────────

// "What has Rahul ordered?" (one hop)
MATCH (c:Customer {name: 'Rahul Sharma'})-[:PLACED_ORDER]->(r:Restaurant)
-[:SERVES]->(m:MenuItem)
RETURN m.name, r.name

// "Who does Rahul follow?" (social graph, one hop)
MATCH (c:Customer {id: 'C001'})-[:FOLLOWS]->(followed:Customer)
RETURN followed.name, followed.city

// "Find friends of friends (2 hops)" — expensive in SQL, natural in graph
MATCH (c:Customer {id: 'C001'})-[:FOLLOWS*2]->(fof:Customer)
WHERE NOT (c)-[:FOLLOWS]->(fof) AND fof <> c
RETURN DISTINCT fof.name
// *2 = exactly 2 hops. *1..3 = 1 to 3 hops (variable length traversal)

// "Shortest path between two users" — impossible efficiently in SQL
MATCH path = shortestPath(
  (start:Customer {id: 'C001'})-[:FOLLOWS*]-(end:Customer {id: 'C099'})
)
RETURN path, length(path)

// "FRAUD DETECTION: find accounts sharing the same device ID"
MATCH (a1:Account)-[:USED_DEVICE]->(d:Device)<-[:USED_DEVICE]-(a2:Account)
WHERE a1 <> a2
  AND a1.flagged = false
  AND a2.flagged = true     -- one known fraudulent account
RETURN a1.id, a1.email, d.device_id
// Instantly finds accounts connected to known fraudsters through shared devices
// In SQL: would require multiple self-joins on a transactions table

// "RECOMMENDATION: customers who ordered from the same restaurant"
MATCH (target:Customer {id: 'C001'})
      -[:PLACED_ORDER]->(r:Restaurant)
      <-[:PLACED_ORDER]-(similar:Customer)
WHERE similar <> target
WITH similar, COUNT(r) AS shared_restaurants
ORDER BY shared_restaurants DESC
LIMIT 10
MATCH (similar)-[:PLACED_ORDER]->(rec_rest:Restaurant)
WHERE NOT (target)-[:PLACED_ORDER]->(rec_rest)
RETURN rec_rest.name, COUNT(*) AS popularity
ORDER BY popularity DESC
LIMIT 5
// "Restaurants ordered by similar customers that Rahul hasn't tried yet"`}
        </CodeBox>

        <SubTitle>When to Choose a Graph Database</SubTitle>

        <Para>
          The key question: is the most important aspect of your data the
          <em> connections between entities</em> rather than the entities themselves?
          If your primary queries traverse relationships — "find all friends of friends",
          "trace a transaction chain", "find the shortest path" — a graph database
          will outperform a relational database by orders of magnitude for those
          queries as the graph grows deep. For simple entity storage with occasional
          relationship queries, a relational database is usually sufficient.
        </Para>
      </section>

      {/* ========================================
          PART 6 — TIME-SERIES DATABASES
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 06 — Time-Series Databases" />
        <SectionTitle>Time-Series Databases — Optimised for Sequential Timestamped Data</SectionTitle>

        <Para>
          A time-series database is optimised for storing and querying data that changes
          over time — metrics, sensor readings, financial prices, application logs,
          IoT data. Time-series data has specific characteristics: writes are almost
          always appends (new readings, not updates to old ones), queries are almost
          always range scans by time, data often ages out (old readings are less
          valuable), and compression opportunities are enormous (sequential values
          often change slowly).
        </Para>

        <SubTitle>InfluxDB and TimescaleDB — The Leading Time-Series Solutions</SubTitle>

        <CodeBox label="Time-series data model and queries">
{`// INFLUXDB DATA MODEL:
// Measurement: like a table (cpu_usage, http_requests, order_rate)
// Tags: indexed metadata (host, region, service) — low cardinality
// Fields: actual measurements (value, count, latency) — high cardinality
// Timestamp: nanosecond precision

// WRITE (Line Protocol):
// measurement,tag_key=tag_value field_key=field_value timestamp
cpu_usage,host=web-01,region=ap-south-1 usage_percent=72.4,load_avg=2.1 1710499200000000000
http_requests,service=order-api,status=200 count=1450,avg_latency_ms=12.4 1710499200000000000
order_rate,city=Bengaluru placed=847,delivered=801,cancelled=23 1710499200000000000

// INFLUXQL QUERIES (SQL-like):
SELECT mean(usage_percent)
FROM cpu_usage
WHERE host='web-01'
  AND time >= now() - 1h
GROUP BY time(5m)
-- Average CPU usage per 5-minute window in the last hour

SELECT max(avg_latency_ms), count(count)
FROM http_requests
WHERE service='order-api'
  AND time >= '2024-03-15T00:00:00Z'
  AND time < '2024-03-16T00:00:00Z'
GROUP BY time(1h)
-- Hourly max latency and request count for March 15

// RETENTION POLICIES: automatically delete old data
CREATE RETENTION POLICY "30_days"
ON "metrics_db"
DURATION 30d
REPLICATION 1
DEFAULT;
-- Data older than 30 days is automatically purged

// ─────────────────────────────────────────────────────────────────
// TIMESCALEDB: time-series extension for PostgreSQL
// ─────────────────────────────────────────────────────────────────
-- TimescaleDB adds time-series superpowers to PostgreSQL
-- Use full SQL, JOINs with other PostgreSQL tables, same connection pooling

-- Create a hypertable (automatically partitioned by time):
CREATE TABLE cpu_metrics (
    time        TIMESTAMPTZ NOT NULL,
    host        TEXT NOT NULL,
    region      TEXT,
    usage_pct   DOUBLE PRECISION,
    load_avg    DOUBLE PRECISION
);
SELECT create_hypertable('cpu_metrics', 'time');
-- TimescaleDB automatically partitions by time chunks (e.g., 7-day chunks)
-- Each chunk is a separate PostgreSQL table internally
-- Old chunks can be compressed or moved to cheaper storage

-- CONTINUOUS AGGREGATE (materialised time-bucket views, auto-updated):
CREATE MATERIALIZED VIEW cpu_hourly
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('1 hour', time) AS hour,
    host,
    AVG(usage_pct) AS avg_usage,
    MAX(usage_pct) AS peak_usage
FROM cpu_metrics
GROUP BY time_bucket('1 hour', time), host
WITH NO DATA;

-- Schedule automatic refresh:
SELECT add_continuous_aggregate_policy('cpu_hourly',
    start_offset => INTERVAL '3 hours',
    end_offset   => INTERVAL '1 hour',
    schedule_interval => INTERVAL '1 hour');

-- QUERY the continuous aggregate (fast — reads pre-computed results):
SELECT hour, host, avg_usage
FROM cpu_hourly
WHERE hour >= NOW() - INTERVAL '24 hours'
ORDER BY hour DESC;`}
        </CodeBox>

        <Para>
          Time-series databases achieve high write throughput through several mechanisms.
          They use append-only storage — new data is always written at the end, never
          requiring random writes. They apply columnar compression aggressively — sequential
          numeric values compress extremely well with delta encoding and run-length encoding,
          often achieving 10-100x compression ratios. They use time-based partitioning
          so queries that filter by time range only touch the relevant partitions.
        </Para>
      </section>

      {/* ========================================
          PART 7 — SEARCH ENGINES AS DATABASES
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 07 — Search Engines" />
        <SectionTitle>Elasticsearch — When You Need Full-Text Search at Scale</SectionTitle>

        <Para>
          Elasticsearch is not strictly a database — it is a distributed search
          and analytics engine built on Apache Lucene. But it stores data and
          is used as the primary data store for search use cases: product search,
          log analysis, application performance monitoring, and full-text document search.
          Its data model is document-oriented (JSON documents), but its query model
          is built around text analysis, relevance scoring, and aggregations.
        </Para>

        <CodeBox label="Elasticsearch — indexing, search, and aggregations">
{`// INDEX A DOCUMENT (store a product):
PUT /products/_doc/P001
{
  "product_id": "P001",
  "name": "Chicken Biryani",
  "description": "Fragrant basmati rice cooked with tender chicken and aromatic spices",
  "restaurant": "Biryani House",
  "city": "Bengaluru",
  "price": 280,
  "rating": 4.5,
  "tags": ["non-veg", "rice", "spicy"],
  "available": true
}

// FULL-TEXT SEARCH (the killer feature):
GET /products/_search
{
  "query": {
    "match": {
      "description": "chicken rice spicy"  // tokenised, stemmed, scored by relevance
    }
  }
}

// MULTI-FIELD SEARCH WITH BOOSTING:
GET /products/_search
{
  "query": {
    "multi_match": {
      "query": "biryani",
      "fields": ["name^3", "description", "tags"]
      // ^3: name field matches are 3x more relevant than description matches
    }
  }
}

// FILTERED SEARCH (bool query: text search + exact filters):
GET /products/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "name": "biryani" } }  // full-text on name
      ],
      "filter": [
        { "term":  { "city": "Bengaluru" } },  // exact match (not scored)
        { "term":  { "available": true } },
        { "range": { "price": { "gte": 100, "lte": 500 } } }
      ]
    }
  },
  "sort": [
    { "rating": "desc" },
    "_score"             // sort by rating, then relevance score
  ]
}

// AGGREGATIONS (like GROUP BY + analytics):
GET /products/_search
{
  "size": 0,             // don't return documents, only aggregations
  "aggs": {
    "by_city": {
      "terms": { "field": "city" },  // group by city
      "aggs": {
        "avg_price": { "avg": { "field": "price" } },
        "price_ranges": {
          "range": {
            "field": "price",
            "ranges": [
              { "to": 200 },
              { "from": 200, "to": 500 },
              { "from": 500 }
            ]
          }
        }
      }
    }
  }
}

// ELASTICSEARCH IN PRODUCTION:
// Never use as your primary transactional database — no ACID, no joins
// Use as a secondary index: write to PostgreSQL (source of truth),
// sync to Elasticsearch for search, use Elasticsearch for search queries only
// Tools for sync: Debezium (CDC from PostgreSQL to ES), Logstash, custom ETL`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 8 — CHOOSING THE RIGHT DATABASE
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 08 — Decision Framework" />
        <SectionTitle>Choosing the Right Database — The Complete Decision Framework</SectionTitle>

        <Para>
          The single most important skill in database engineering is choosing the
          right database for a given problem. There is no universally best database.
          Every choice involves trade-offs that depend on the specific access patterns,
          consistency requirements, scale, and team expertise of your system.
        </Para>

        <div style={{ overflowX: 'auto', marginBottom: 28 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Use Case', 'First Choice', 'Why', 'Avoid'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', color: 'var(--muted)', fontWeight: 700, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Transactional data (orders, payments)', 'PostgreSQL / MySQL', 'ACID, joins, constraints, mature tooling', 'Cassandra — eventual consistency risks money'],
                ['Session store / cache', 'Redis', 'Microsecond latency, TTL, rich types', 'PostgreSQL — overkill, too slow for cache'],
                ['User profiles / product catalog', 'MongoDB or PostgreSQL', 'Flexible schema, document model', 'HBase — over-engineered for this scale'],
                ['Write-heavy time-series metrics', 'InfluxDB or TimescaleDB', 'Optimised for append, compression, time queries', 'MongoDB — no native time bucketing'],
                ['Social graph / recommendations', 'Neo4j', 'Native graph traversal, Cypher language', 'PostgreSQL — joins become recursive nightmares'],
                ['Full-text search', 'Elasticsearch', 'Relevance scoring, tokenisation, aggregations', 'PostgreSQL LIKE — no relevance ranking'],
                ['Internet-scale writes (IoT, logs)', 'Cassandra / HBase', 'Linear write scalability, no SPOF', 'PostgreSQL — single write leader bottleneck'],
                ['Distributed config / locks', 'etcd / Zookeeper', 'Strong consistency, consensus, watch API', 'Cassandra — eventual consistency is wrong here'],
                ['Event streaming', 'Apache Kafka', 'Log-based, replayable, consumer groups', 'Redis pubsub — no persistence'],
                ['Analytical queries (OLAP)', 'Snowflake / BigQuery / ClickHouse', 'Columnar, compression, distributed joins', 'MongoDB — no columnar, no complex analytics'],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '12px 14px', color: j === 1 ? 'var(--accent)' : 'var(--text)', fontFamily: j === 1 ? 'var(--font-mono)' : 'Inter, sans-serif', fontSize: 13, fontWeight: j === 1 ? 700 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SubTitle>Polyglot Persistence — Using Multiple Databases in One System</SubTitle>

        <Para>
          Most production systems at scale use multiple databases simultaneously,
          each chosen for the specific data it manages best.
          This is called <strong style={{ color: 'var(--accent)' }}>polyglot persistence</strong> —
          using different storage technologies for different parts of the same system.
        </Para>

        <CodeBox label="Swiggy's polyglot persistence architecture">
{`// SWIGGY PRODUCTION DATABASE ARCHITECTURE (typical for Indian unicorns):

// POSTGRESQL (primary transactional data):
// - Orders, customers, payments, restaurants, menu items
// - Full ACID, complex queries, reporting
// - Streamed to all other systems via Debezium CDC

// REDIS (caching + real-time features):
// - Session tokens (TTL-based auto-expiry)
// - OTP storage (short TTL, high throughput)
// - Restaurant availability flag (frequently checked, rarely changed)
// - Sorted sets for real-time order queue per delivery zone
// - Rate limiting (INCR with TTL per API key per minute)

// CASSANDRA (delivery tracking):
// - GPS location history: write 10 updates/second per active delivery agent
// - 50,000 active agents at dinner peak = 500,000 writes/second
// - Queries: latest location for an agent, location history for a delivery
// - Perfect fit: high write throughput, simple query by agent_id

// ELASTICSEARCH (search):
// - Restaurant search with full text, geo-filtering, cuisine facets
// - Menu item search with relevance ranking
// - Sync'd from PostgreSQL via Debezium → Kafka → Elasticsearch consumer

// MONGODB (content management):
// - Restaurant banners, promotional content, onboarding questionnaires
// - Schema evolves frequently, not transactional
// - Marketing team writes directly via a CMS

// INFLUXDB / PROMETHEUS (metrics):
// - API latency per endpoint per second
// - Database connection pool utilisation
// - Order funnel metrics (placed/confirmed/delivered rates per city per hour)
// - Never joins with business data — purely operational

// APACHE KAFKA (event streaming):
// - Order state machine events (ORDER_PLACED → CONFIRMED → PREPARING → ...)
// - Decouples producers from consumers
// - All other databases consume from Kafka to stay in sync

// SNOWFLAKE (data warehouse):
// - Historical data from all above systems via daily/hourly ETL
// - Business intelligence, executive dashboards, ML feature engineering
// - Columnar, massive parallelism, no production query load

// THE PRINCIPLE:
// PostgreSQL = source of truth for business entities
// Other databases = purpose-built views or caches of that truth`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 9 — WHAT THIS LOOKS LIKE AT WORK
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 09 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>💼 What This Looks Like at Work</div>
        <SectionTitle>The Architecture Review — Why We Need Redis AND PostgreSQL</SectionTitle>

        <Para>
          A junior engineer asks: "We already have PostgreSQL. Why are we adding Redis?
          Can't we just cache in PostgreSQL?" This question comes up in every team
          building their first distributed system. Here is the full answer.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0078d4', background: 'rgba(0,120,212,0.1)', border: '1px solid rgba(0,120,212,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Architecture Review — Razorpay API Rate Limiting
          </div>

          <CodeBox label="The problem: 100K API requests/second, each needs a rate limit check">
{`// REQUIREMENT:
// Every API request checks: "Has this API key exceeded 1000 requests/minute?"
// 100,000 API requests per second
// Each request requires one "increment and check" operation

// APPROACH 1: PostgreSQL only (naive)
-- For each API request:
BEGIN;
UPDATE api_rate_limits
SET request_count = request_count + 1,
    window_start = CASE
        WHEN window_start < NOW() - INTERVAL '1 minute' THEN NOW()
        ELSE window_start
    END,
    request_count = CASE
        WHEN window_start < NOW() - INTERVAL '1 minute' THEN 1
        ELSE request_count + 1
    END
WHERE api_key = :key;

SELECT request_count FROM api_rate_limits WHERE api_key = :key;
COMMIT;

-- PROBLEM: 100,000 requests/second × one transaction each
-- PostgreSQL max transactions/second: ~10,000-50,000
-- Each transaction: disk write (WAL) + table lock + disk read
-- Result: PostgreSQL maxes out, rate limit checks take 50-100ms
-- API response time dominated by rate limit check — unacceptable

// APPROACH 2: Redis (correct approach)
-- For each API request:
-- ATOMIC increment and check using Redis pipeline:
pipeline = redis.pipeline()
pipe_key = f"rate::{api_key}::{current_minute}"  -- key includes time window
pipeline.incr(pipe_key)          -- atomic increment
pipeline.expire(pipe_key, 61)    -- auto-expire after 61 seconds
count, _ = pipeline.execute()

if count > 1000:
    return {"error": "Rate limit exceeded"}, 429

-- REDIS PERFORMANCE:
-- INCR operation: ~0.1ms (in-memory, no disk I/O)
-- 100,000 requests/second: each takes 0.1ms = sustainable
-- Redis single-threaded for commands = no lock contention
-- Each API key's counter lives for one minute then automatically expires (no cleanup)

// RESULT:
// PostgreSQL: source of truth (API key metadata, billing, usage history)
// Redis: rate limit counters (ephemeral, high-throughput, TTL-based)
// Each database doing what it's best at.`}
          </CodeBox>
        </div>
      </section>

      {/* ========================================
          PART 10 — INTERVIEW QUESTIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 10 — Interview Prep" />
        <SectionTitle>NoSQL Interview Questions — Complete Answers</SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              q: 'What is NoSQL and why was it created?',
              color: '#0078d4',
              a: 'NoSQL ("Not Only SQL") refers to a broad category of databases that do not use the traditional relational model. It was created in response to four specific limitations of relational databases at internet scale: (1) Impedance mismatch — application objects map awkwardly to normalised tables; document databases store objects naturally without joins. (2) Horizontal scale — relational databases are designed for vertical scaling; sharding breaks joins and transactions. NoSQL databases are designed for linear horizontal scale from the start. (3) Schema rigidity — ALTER TABLE on billion-row tables is prohibitively expensive; NoSQL databases support schema-flexible data where different records can have different fields. (4) Specific access patterns — graph traversal, time-series writes, full-text search are all inefficient in SQL; specialised NoSQL databases handle each case optimally. NoSQL systems trade ACID guarantees, joins, and ad-hoc query flexibility for scale, flexibility, and performance on specific workloads.',
            },
            {
              q: 'What are the four main categories of NoSQL databases? Give one example and use case for each.',
              color: 'var(--accent)',
              a: 'The four main categories: (1) Key-Value stores — store a value indexed by a key. Example: Redis. Use case: session management, caching, rate limiting, leaderboards. O(1) lookups, microsecond latency. (2) Document databases — store semi-structured JSON-like documents with flexible schemas. Example: MongoDB. Use case: product catalogs, user profiles, content management systems. Natural fit for hierarchical data that would need many joins in SQL. (3) Column-family stores — organise data in column families with rows that can have arbitrary columns. Example: Cassandra, HBase. Use case: write-heavy time-series data, IoT sensor data, activity logs. Designed for high write throughput across many nodes. (4) Graph databases — store entities as nodes and relationships as edges, both with properties. Example: Neo4j. Use case: social networks, fraud detection, recommendation engines. Efficient multi-hop relationship traversal that would require recursive queries in SQL.',
            },
            {
              q: 'When would you choose Cassandra over PostgreSQL?',
              color: '#f97316',
              a: 'Choose Cassandra over PostgreSQL when: (1) Write throughput exceeds what a single primary server can handle — Cassandra scales writes linearly by adding nodes, while PostgreSQL\'s single leader eventually becomes the bottleneck. (2) The dataset is too large for one machine and you need automatic sharding — Cassandra handles this natively, PostgreSQL sharding is complex and manual. (3) 100% availability is required and you can tolerate eventual consistency — Cassandra is leaderless with no single point of failure; PostgreSQL requires a primary and failover takes 15-30 seconds. (4) The access patterns are simple and known in advance — Cassandra forces you to design tables around specific queries; if you know all your queries, Cassandra executes them extremely efficiently. Avoid Cassandra when: you need multi-row transactions, complex joins, ad-hoc queries, or strong consistency for financial data. Cassandra is the right choice for GPS tracking (write 10 updates/second per driver × 50,000 drivers = 500,000 writes/second), time-series metrics, and activity logs. PostgreSQL is right for orders, payments, inventory — anything requiring ACID transactions.',
            },
            {
              q: 'What is the difference between embedding and referencing in MongoDB?',
              color: '#8b5cf6',
              a: 'In MongoDB, embedding means including related data directly inside a document as a nested object or array. Referencing means storing only the ID of related data and requiring a separate query to fetch it. Embedding works well when: the related data is always accessed with the parent document, the embedded data is bounded in size (arrays that never grow very large), and you don\'t need to access the embedded data independently. An order document embedding its items is a good example. Referencing works well when: the related document is large and not always needed, the same data is referenced by many documents (normalisation), or the related data changes frequently and you don\'t want to update it in many places. A user profile referencing their city by city_id rather than embedding the full city object is an example. The key rule: embed when you always read together, reference when you read independently. MongoDB provides no JOIN — if you reference, you must fetch separately in the application. This is why embedding is favoured for data that forms natural aggregates.',
            },
            {
              q: 'Explain the write path in Cassandra. Why is it so fast?',
              color: '#facc15',
              a: 'Cassandra achieves high write throughput through three architectural choices that convert random writes into sequential operations. Step 1: write to the Commit Log — a sequential append-only file on disk. This is extremely fast (sequential I/O, no seek time). Step 2: write to the Memtable — an in-memory data structure sorted by partition key and clustering key. This is a RAM write, essentially instantaneous. Step 3: acknowledge to the client — this happens immediately after steps 1 and 2. The client gets confirmation without waiting for any disk-based data structures to be updated. Background steps: when the Memtable reaches a threshold size, it is flushed to an SSTable (Sorted String Table) on disk — a sequential write of all in-memory data. Periodically, multiple SSTables are compacted into one to merge updates and remove tombstones (deleted records). The key insight: the client-facing write path is entirely sequential I/O (commit log) and in-memory (memtable). There are no random disk reads during writes, no B-tree node splits, no index updates at write time. The price paid is that reads are more complex — they must check the Memtable and potentially multiple SSTables, merging results.',
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
        'NoSQL was created to address four relational database limitations: impedance mismatch (objects vs tables), horizontal scale (joins break across shards), schema rigidity (ALTER TABLE on billions of rows), and specific access patterns (graph traversal, time-series, full-text search). NoSQL trades ACID, joins, and ad-hoc queries for these capabilities.',
        'Four NoSQL families: Key-Value (Redis, DynamoDB) — fastest lookups, O(1), no range queries by value. Document (MongoDB) — flexible JSON documents, rich queries, no joins. Column-Family (Cassandra, HBase) — high write throughput, wide rows, query-first design. Graph (Neo4j) — native relationship traversal, Cypher language.',
        'Redis data types: String (get/set/incr), Hash (object fields), List (ordered, deque/queue), Set (unique members, intersection/union), Sorted Set (score-ranked, leaderboards), Bitmap (bit-level operations). Each type has O(1) or O(log n) operations. All data in RAM — microsecond latency.',
        'MongoDB: documents in collections with flexible schema. Rich query language with operators. Aggregation pipeline: $match → $group → $sort → $project (equivalent to WHERE → GROUP BY → ORDER BY → SELECT). Embed when always read together; reference when data is shared, large, or accessed independently.',
        'Cassandra write path: Commit Log (sequential disk append) → Memtable (RAM) → acknowledge client. Background: Memtable flush to SSTable, periodic compaction. Fast because all client-facing writes are sequential I/O or RAM — no random disk writes. Query-first design: create one table per query pattern, embrace denormalisation.',
        'HBase: sorted by row key lexicographically. Row key design is the most critical decision — it determines data locality and prevents hot spots. Use hash prefix for write-heavy tables (distribute across regions). Use natural prefix for scan-heavy tables (keep related data on same region).',
        'Neo4j and Cypher: nodes (entities) and relationships (edges) both have properties. Traversal queries with variable-length paths (*1..3) are native operations. shortestPath(), allShortestPaths() built-in. Graph databases excel when relationship traversal is the primary access pattern — multi-hop queries that require recursive SQL in relational databases.',
        'Time-series databases (InfluxDB, TimescaleDB): optimised for append-heavy sequential writes. Aggressive compression via delta encoding and run-length encoding (10-100x ratios). Time-based partitioning for efficient range queries. Retention policies for automatic data expiry. TimescaleDB = PostgreSQL + hypertable extension (full SQL, JOINs, continuous aggregates).',
        'Polyglot persistence: use multiple databases in one system, each chosen for specific data. Typical production: PostgreSQL (transactional truth), Redis (cache/sessions/queues), Cassandra (high-write time-series), Elasticsearch (search), Kafka (streaming), Snowflake/BigQuery (analytics). PostgreSQL is source of truth; others are purpose-built views of that truth.',
        'Decision rule: use SQL when you need ACID transactions, complex joins, ad-hoc queries, or referential integrity. Use NoSQL when: write throughput exceeds one machine (Cassandra), data is hierarchical and schema evolves (MongoDB), access is by key with microsecond SLA (Redis), data is fundamentally relational/graph (Neo4j), or data is time-sequential with high append rate (InfluxDB).',
      ]} />

    </LearnLayout>
  )
}