import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'SQL vs NoSQL — The Real Difference — Data Engineering | Chaduvuko',
  description:
    'Why the choice matters, what each one trades off, the four NoSQL families explained from first principles, and how to pick the right store for any situation without cargo-culting trends.',
}

// ── Local components ────────────────────────────────────────────────────────

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

interface TableRow { [key: string]: string }
interface CompareTableProps {
  headers: { label: string; color?: string }[]
  rows: TableRow[]
  keys: string[]
}

const CompareTable = ({ headers, rows, keys }: CompareTableProps) => (
  <div style={{ overflowX: 'auto', marginBottom: 28 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, lineHeight: 1.6 }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={h.label} style={{
              padding: '10px 16px', textAlign: 'left',
              fontSize: i === 0 ? 10 : 11, fontWeight: 700,
              letterSpacing: i === 0 ? '.12em' : '.06em',
              textTransform: 'uppercase',
              color: h.color ?? 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              borderBottom: h.color ? `2px solid ${h.color}` : '1px solid var(--border)',
              background: h.color ? `${h.color}08` : 'var(--bg2)',
              minWidth: i === 0 ? 130 : 160,
            }}>{h.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
            {keys.map((k, ki) => (
              <td key={k} style={{
                padding: '10px 16px',
                color: ki === 0 ? 'var(--muted)' : 'var(--text)',
                fontSize: ki === 0 ? 11 : 13,
                fontFamily: ki === 0 ? 'var(--font-mono)' : 'inherit',
                fontWeight: ki === 0 ? 700 : 400,
                textTransform: ki === 0 ? 'uppercase' : 'none',
                letterSpacing: ki === 0 ? '.06em' : 'normal',
                borderBottom: '1px solid var(--border)',
                borderLeft: ki > 0 && headers[ki]?.color
                  ? `2px solid ${headers[ki].color}40`
                  : ki > 0 ? '1px solid var(--border)' : 'none',
                verticalAlign: 'top',
              }}>{row[k]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// ── Page ────────────────────────────────────────────────────────────────────

export default function SQLvsNoSQLModule() {
  return (
    <LearnLayout
      title="SQL vs NoSQL — The Real Difference"
      description="What each one trades off, four NoSQL families from first principles, and how to choose."
      section="Data Engineering"
      readTime="55 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — The Misconception ──────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Misconception That Causes Bad Decisions" />
        <SectionTitle>The "SQL vs NoSQL" Framing Is Wrong</SectionTitle>

        <Para>
          The phrase "SQL vs NoSQL" implies a competition — one wins, one loses,
          you pick a side. This framing has misled entire teams into wrong
          architectural decisions for over a decade. Companies rewrote perfectly
          fine relational databases into MongoDB because NoSQL was "web-scale."
          Others kept cramming document data into rigid relational schemas because
          SQL felt familiar.
        </Para>

        <Para>
          The actual question is never "SQL or NoSQL?" The actual question is:
          <strong> what are the access patterns of this data, and which storage
          model serves those patterns best?</strong> SQL databases and NoSQL
          databases are not competitors — they solve different problems. Many
          production systems at Indian tech companies use both simultaneously,
          each handling the workload it is suited for.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 15, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', letterSpacing: '-0.3px', marginBottom: 14,
          }}>The correct framing</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div style={{
                fontSize: 11, fontWeight: 700, color: '#00e676',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase', marginBottom: 8,
              }}>Relational (SQL) databases</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
                Exist to model <strong style={{ color: 'var(--text)' }}>relationships between entities</strong> with
                guaranteed consistency. Optimised for arbitrary queries across any
                combination of columns, with ACID transactions and referential integrity.
                The right choice when you need flexible querying and strong guarantees.
              </div>
            </div>
            <div>
              <div style={{
                fontSize: 11, fontWeight: 700, color: '#7b61ff',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase', marginBottom: 8,
              }}>Non-relational (NoSQL) databases</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
                Exist to optimise <strong style={{ color: 'var(--text)' }}>specific access patterns</strong> at
                scale — trading flexibility and consistency for extreme performance
                on a narrow set of operations. The right choice when you know
                exactly how data will be accessed and need to maximise throughput.
              </div>
            </div>
          </div>
        </HighlightBox>

        <Para>
          As a data engineer, you are a consumer of both types of systems —
          you ingest from them, you understand their data models, and you know
          what can and cannot be efficiently extracted from each. Knowing the
          trade-offs deeply means you can design ingestion strategies that work
          with each system's strengths rather than fighting against its limitations.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 — Relational Model ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The Relational Model" />
        <SectionTitle>Relational Databases — What Makes Them Relational</SectionTitle>

        <Para>
          The relational model was invented by Edgar Codd at IBM in 1970. Its central
          insight: organise data into <strong>relations</strong> (tables of rows and
          columns) and use a declarative query language (SQL) to retrieve any
          combination of data across any number of tables at query time. You do not
          need to know in advance how data will be queried — the relational model
          handles arbitrary queries over any combination of columns and tables.
        </Para>

        <SubTitle>The core properties of relational databases</SubTitle>

        {[
          {
            prop: 'Schema enforcement',
            color: '#00e676',
            detail: 'Every table has a defined schema — column names, data types, constraints. The database enforces this schema on every write. Bad data is rejected before it enters the system. This enforcement is what makes relational data trustworthy — once data is in, it conforms to the contract.',
          },
          {
            prop: 'Referential integrity',
            color: '#7b61ff',
            detail: 'Foreign key constraints ensure that relationships between tables are always valid. An order cannot reference a customer_id that does not exist in the customers table. The database enforces this automatically. Without referential integrity, orphaned records accumulate silently and JOIN queries produce wrong results.',
          },
          {
            prop: 'ACID transactions',
            color: '#f97316',
            detail: 'Multiple operations across multiple tables can be grouped into one atomic transaction. Either all succeed or all fail, leaving the database in a consistent state. This is essential for financial systems, inventory management, and any domain where partial updates are catastrophic.',
          },
          {
            prop: 'Flexible ad-hoc queries',
            color: '#4285f4',
            detail: 'SQL allows any combination of filters, JOINs, aggregations, and ordering over any columns. The same data can answer thousands of different business questions without redesigning the schema. This flexibility is what makes relational databases the standard for analytical systems.',
          },
          {
            prop: 'Normalisation',
            color: '#facc15',
            detail: 'Data is stored in one place and referenced from others via foreign keys. A customer\'s name appears in the customers table, not duplicated in every order. This reduces storage and ensures updates happen in one place — no inconsistency from partial updates.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, overflow: 'hidden', marginBottom: 10,
            display: 'flex',
          }}>
            <div style={{ width: 4, background: item.color, flexShrink: 0 }} />
            <div style={{ padding: '14px 18px', flex: 1 }}>
              <div style={{
                fontSize: 13, fontWeight: 800, color: item.color,
                fontFamily: 'var(--font-display)', marginBottom: 6,
              }}>{item.prop}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
                {item.detail}
              </div>
            </div>
          </div>
        ))}

        <SubTitle>The relational model's weakness — why NoSQL exists</SubTitle>

        <Para>
          The relational model's greatest strength — flexible querying through
          arbitrary JOINs — is also the source of its scaling limitations.
          A JOIN requires the database to correlate rows across multiple tables,
          which requires either sorting both sides (merge join) or building a
          hash table (hash join). At internet scale — billions of rows across
          dozens of tables with thousands of concurrent users — these operations
          become expensive enough that the relational model alone cannot keep up.
        </Para>

        <Para>
          The other limitation: rigid schema. When your data is genuinely variable
          in structure — a product catalogue where each product category has
          completely different attributes — forcing everything into fixed columns
          produces either enormous NULL-filled tables or complex EAV (Entity-Attribute-Value)
          anti-patterns that are painful to query and maintain.
        </Para>

        <CodeBox label="The schema rigidity problem — where relational breaks down">{`Problem: E-commerce product catalogue
  Electronics: RAM, storage, display_size, processor, battery_life
  Clothing:    size, colour, fabric, gender, sleeve_length, care_instructions
  Books:       author, isbn, pages, publisher, genre, language, edition
  Food:        weight, expiry_date, allergens, nutritional_info, storage_temp

Forcing this into one relational table:
  CREATE TABLE products (
    id INT, name VARCHAR, price DECIMAL, category VARCHAR,
    -- Electronics
    ram VARCHAR, storage VARCHAR, display_size DECIMAL, processor VARCHAR,
    battery_life INT,
    -- Clothing
    size VARCHAR, colour VARCHAR, fabric VARCHAR, gender VARCHAR,
    sleeve_length VARCHAR, care_instructions TEXT,
    -- Books
    author VARCHAR, isbn VARCHAR, pages INT, publisher VARCHAR,
    genre VARCHAR, language VARCHAR, edition VARCHAR,
    -- Food
    weight DECIMAL, expiry_date DATE, allergens TEXT,
    nutritional_info TEXT, storage_temp VARCHAR
    -- ... and 50 more product-specific columns
  );

Result:
  A clothing row has 40+ NULL columns for electronics/books/food fields
  Adding a new category requires ALTER TABLE (schema migration)
  Table has 80+ columns, 75% NULL for any given row

Document database solution (MongoDB):
  Electronics product: {"id":1, "name":"iPhone 15", "ram":"6GB", "storage":"128GB"}
  Clothing product:    {"id":2, "name":"Cotton Kurta", "size":"M", "fabric":"cotton"}
  Each document contains only the fields relevant to it.
  New categories need no schema migration — just add new documents.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — The Four NoSQL Families ───────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The Four NoSQL Families" />
        <SectionTitle>NoSQL Is Not One Thing — It Is Four Completely Different Things</SectionTitle>

        <Para>
          "NoSQL" is an umbrella term that groups four completely different database
          designs under one label. This is the core source of confusion. MongoDB,
          Redis, Cassandra, and Neo4j are all "NoSQL" — but they have nothing in
          common beyond not being relational. Each was built for a specific access
          pattern that relational databases handle poorly. Understanding each
          family separately is the only way to make correct choices.
        </Para>

        {/* ── Key-Value ── */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, overflow: 'hidden', marginBottom: 20,
        }}>
          <div style={{ height: 3, background: '#00e676', opacity: 0.8 }} />
          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                background: 'rgba(0,230,118,0.12)', border: '1px solid rgba(0,230,118,0.3)',
                borderRadius: 8, padding: '4px 12px',
                fontSize: 11, fontWeight: 700, color: '#00e676',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase',
              }}>Family 1</div>
              <h3 style={{
                fontSize: 18, fontWeight: 800, color: 'var(--text)',
                fontFamily: 'var(--font-display)', margin: 0,
              }}>Key-Value Stores</h3>
            </div>

            <Para>
              The simplest NoSQL model. A key-value store is a distributed hash map —
              you store a value under a key, and retrieve that value by its key.
              Nothing more. No schema, no query language, no relationships.
              The entire API is: <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>SET key value</code>,{' '}
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>GET key</code>,{' '}
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>DELETE key</code>.
            </Para>

            <Para>
              This extreme simplicity enables extreme performance. Redis, the dominant
              key-value store, operates entirely in memory and handles over 1 million
              operations per second on a single node. The trade-off: you can only look
              up data by its exact key. There is no equivalent of{' '}
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>WHERE amount &gt; 500</code> —
              you can only retrieve the value for a key you already know.
            </Para>

            <CodeBox label="Key-value store — operations and real use cases">{`Redis operations:
  SET session:user_4201938 '{"user_id":4201938,"name":"Priya","cart":[...]}' EX 3600
  GET session:user_4201938  → returns the JSON string (or nil if expired)
  DEL session:user_4201938

  SET rate_limit:ip_192.168.1.1 0 EX 60
  INCR rate_limit:ip_192.168.1.1  → returns 1, 2, 3... (atomic increment)
  GET rate_limit:ip_192.168.1.1   → returns current count

  SET cache:product_SKU-00283741 '{"name":"...","price":2499,...}' EX 300
  GET cache:product_SKU-00283741  → returns cached product JSON (or miss)

Redis data structures (beyond plain strings):
  Hash:   HSET user:4201938 name "Priya" email "priya@example.com"
          HGET user:4201938 email         → "priya@example.com"
  List:   LPUSH order_queue 9284751      → add to queue
          RPOP order_queue               → take from queue (FIFO)
  Set:    SADD active_users 4201938      → track unique active users
          SCARD active_users             → count unique users
  Sorted Set: ZADD leaderboard 9800 "user_4201938"  → score-ranked set
              ZRANGE leaderboard 0 9 REV             → top 10 users

USE CASES:
  ✓ Session storage (user is logged in, shopping cart)
  ✓ Caching (product details, API responses — avoid hitting DB every request)
  ✓ Rate limiting (N requests per minute per IP)
  ✓ Real-time leaderboards (sorted sets)
  ✓ Pub/sub messaging between services
  ✓ Feature store serving (ML model features served in <10ms)

AVOID FOR:
  ✗ Anything requiring queries across multiple keys
  ✗ Perforce primary data store (Redis is in-memory — data loss risk)
  ✗ Complex relationships or JOINs`}</CodeBox>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
              {[
                { label: 'Best databases', value: 'Redis, DynamoDB (key-value mode), Memcached' },
                { label: 'Read speed', value: 'Sub-millisecond (Redis in memory)' },
                { label: 'Write speed', value: 'Sub-millisecond' },
                { label: 'Query flexibility', value: 'Exact key only — no range or filter queries' },
                { label: 'DE ingestion', value: 'Usually ingested via Redis Streams or snapshots' },
              ].map((item) => (
                <div key={item.label} style={{
                  background: 'var(--bg2)', border: '1px solid var(--border)',
                  borderRadius: 8, padding: '10px 14px',
                }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: '#00e676',
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase', marginBottom: 3,
                  }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Document ── */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, overflow: 'hidden', marginBottom: 20,
        }}>
          <div style={{ height: 3, background: '#7b61ff', opacity: 0.8 }} />
          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                background: 'rgba(123,97,255,0.12)', border: '1px solid rgba(123,97,255,0.3)',
                borderRadius: 8, padding: '4px 12px',
                fontSize: 11, fontWeight: 700, color: '#7b61ff',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Family 2</div>
              <h3 style={{
                fontSize: 18, fontWeight: 800, color: 'var(--text)',
                fontFamily: 'var(--font-display)', margin: 0,
              }}>Document Stores</h3>
            </div>

            <Para>
              Document stores organise data as self-contained JSON (or BSON) documents.
              Each document can have a different structure — there is no enforced schema.
              A document can contain nested objects and arrays, so an entire entity and
              all its related data can be stored as one document rather than spread across
              multiple related tables.
            </Para>

            <Para>
              The critical design insight: document stores are optimised for reading
              and writing one document at a time. Retrieving a single product with all
              its variants, images, reviews, and pricing requires one document read —
              compared to six-table JOINs in a relational database. This makes document
              stores extremely fast for the access pattern they are designed for, and
              very poor for the access patterns they are not.
            </Para>

            <CodeBox label="Document store — MongoDB data model vs relational equivalent">{`RELATIONAL approach for a product catalogue:
  Table: products       (id, name, price, category_id)
  Table: categories     (id, name, parent_id)
  Table: product_attrs  (product_id, attr_name, attr_value)
  Table: product_images (product_id, url, alt_text, is_primary)
  Table: product_reviews (product_id, user_id, rating, text, created_at)

Query to get one product with all details:
  SELECT p.*, c.name as category, a.*, i.*, r.*
  FROM products p
  JOIN categories c ON p.category_id = c.id
  LEFT JOIN product_attrs a ON a.product_id = p.id
  LEFT JOIN product_images i ON i.product_id = p.id
  LEFT JOIN product_reviews r ON r.product_id = p.id
  WHERE p.id = 'SKU-00283741'
  → 5 table JOINs, multiple network round trips, complex query plan

DOCUMENT approach (MongoDB):
{
  "_id": "SKU-00283741",
  "name": "Samsung Galaxy S24",
  "price": 79999,
  "category": "Electronics > Smartphones",
  "attributes": {
    "ram": "8GB",
    "storage": "256GB",
    "display": "6.2 inch FHD+",
    "battery": "4000mAh"
  },
  "images": [
    {"url": "img/s24_front.jpg", "is_primary": true},
    {"url": "img/s24_back.jpg",  "is_primary": false}
  ],
  "reviews_summary": {"avg_rating": 4.3, "count": 847}
}

Query to get the same product: db.products.findOne({_id: "SKU-00283741"})
→ 1 document read, no JOINs, millisecond response

MONGODB QUERY LANGUAGE:
  db.products.find({category: "Electronics", price: {$lt: 50000}})
  db.products.find({attributes.ram: "8GB"}).sort({price: 1}).limit(20)
  db.products.updateOne({_id: "SKU-00283741"}, {$set: {price: 74999}})`}</CodeBox>

            <SubTitle>Where document stores break down</SubTitle>
            <Para>
              Document stores are fast when you query by document ID or a known
              field. They break down when you need to query across documents in ways
              that were not anticipated at schema design time. "Find all products where
              any review mentions 'battery life'" requires scanning every document.
              "Calculate average price per category" requires an aggregation pipeline
              across all documents. These operations are significantly slower in a
              document store than in a relational database with proper indexes.
            </Para>

            <Para>
              The deeper problem: documents that store related data together
              (embedding) become inconsistent when that data changes. If a user's name
              is embedded in every review they wrote, updating the name requires
              updating thousands of documents atomically — something document stores
              do not handle well. The choice between embedding and referencing in a
              document model requires predicting access patterns at design time.
            </Para>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
              {[
                { label: 'Best databases', value: 'MongoDB, Firestore, CouchDB, Amazon DocumentDB' },
                { label: 'Best for', value: 'Product catalogues, user profiles, CMS content, configs' },
                { label: 'Avoid for', value: 'Heavy cross-document queries, strong consistency needs, frequent relationship updates' },
                { label: 'DE ingestion', value: 'Change streams (MongoDB), Firestore exports, REST API polling' },
              ].map((item) => (
                <div key={item.label} style={{
                  background: 'var(--bg2)', border: '1px solid var(--border)',
                  borderRadius: 8, padding: '10px 14px',
                }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: '#7b61ff',
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase', marginBottom: 3,
                  }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Column-Family ── */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, overflow: 'hidden', marginBottom: 20,
        }}>
          <div style={{ height: 3, background: '#f97316', opacity: 0.8 }} />
          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.3)',
                borderRadius: 8, padding: '4px 12px',
                fontSize: 11, fontWeight: 700, color: '#f97316',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Family 3</div>
              <h3 style={{
                fontSize: 18, fontWeight: 800, color: 'var(--text)',
                fontFamily: 'var(--font-display)', margin: 0,
              }}>Column-Family Stores</h3>
            </div>

            <Para>
              Column-family stores (also called wide-column stores) are the most
              complex NoSQL family to understand. Despite having "column" in the name,
              they are not related to columnar analytical databases like Parquet or
              Snowflake. They are fundamentally different — built for extreme write
              throughput and linear horizontal scalability, at the cost of very
              constrained query flexibility.
            </Para>

            <Para>
              The key design principle: data is organised by a <strong>partition key</strong>
              (determines which node stores the data) and a <strong>clustering key</strong>
              (determines the sort order within a partition). All data for a partition
              key lives on the same node, making reads for that partition extremely fast.
              Queries that do not use the partition key require scanning all nodes —
              which Cassandra will refuse or perform very slowly by design.
            </Para>

            <CodeBox label="Cassandra data model — designed around query patterns, not entities">{`PROBLEM: Store delivery tracking events for millions of deliveries.
  Requirements:
    - Write millions of GPS events per second (Uber Eats's delivery network)
    - Read all events for a specific delivery in time order
    - Events never updated once written

CASSANDRA TABLE DESIGN (designed around the query, not the entity):

  CREATE TABLE delivery_events (
    delivery_id    UUID,          -- partition key: all events for one delivery on one node
    event_time     TIMESTAMP,     -- clustering key: sorted order within partition
    event_type     TEXT,          -- 'pickup', 'in_transit', 'delivered', 'failed'
    lat            DOUBLE,
    lng            DOUBLE,
    agent_id       UUID,
    PRIMARY KEY (delivery_id, event_time)
  ) WITH CLUSTERING ORDER BY (event_time ASC);

WRITE (very fast — append to partition):
  INSERT INTO delivery_events (delivery_id, event_time, event_type, lat, lng, agent_id)
  VALUES (uuid(), toTimestamp(now()), 'in_transit', 12.9352, 77.6245, agent_uuid);

READ (fast — all data for this delivery is on one node):
  SELECT * FROM delivery_events
  WHERE delivery_id = '9f8e7d6c-...'         -- REQUIRED: partition key
  AND event_time >= '2026-03-17 20:00:00'    -- optional: clustering key range

WHAT CASSANDRA CANNOT DO EFFICIENTLY:
  -- "Find all deliveries that failed today"
  SELECT * FROM delivery_events WHERE event_type = 'failed';
  → Full cluster scan. Very slow. Cassandra will warn or block this.
  → Need a separate table designed for this query pattern.

CASSANDRA RULE: design one table per query pattern.
  "Get events for delivery X" → delivery_events table (above)
  "Get failed deliveries today" → failed_deliveries_by_date table
  "Get all deliveries for agent Y" → deliveries_by_agent table
  Data is often stored multiple times in different tables for different queries.`}</CodeBox>

            <Callout type="info">
              <strong>The Cassandra mental model shift:</strong> In a relational database,
              you design tables to represent entities, then write queries to answer any
              question. In Cassandra, you design tables to answer specific queries —
              you know the queries in advance and build the data model around them.
              This is the single most important thing to understand about column-family stores.
            </Callout>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
              {[
                { label: 'Best databases', value: 'Apache Cassandra, Amazon DynamoDB, HBase, ScyllaDB' },
                { label: 'Best for', value: 'IoT event streams, time-series data, write-heavy workloads at global scale' },
                { label: 'Avoid for', value: 'Ad-hoc queries, complex aggregations, anything requiring non-partition-key scans' },
                { label: 'DE ingestion', value: 'Cassandra CDC, Spark Cassandra Connector, periodic full exports' },
              ].map((item) => (
                <div key={item.label} style={{
                  background: 'var(--bg2)', border: '1px solid var(--border)',
                  borderRadius: 8, padding: '10px 14px',
                }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: '#f97316',
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase', marginBottom: 3,
                  }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Graph ── */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, overflow: 'hidden', marginBottom: 20,
        }}>
          <div style={{ height: 3, background: '#4285f4', opacity: 0.8 }} />
          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                background: 'rgba(66,133,244,0.12)', border: '1px solid rgba(66,133,244,0.3)',
                borderRadius: 8, padding: '4px 12px',
                fontSize: 11, fontWeight: 700, color: '#4285f4',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Family 4</div>
              <h3 style={{
                fontSize: 18, fontWeight: 800, color: 'var(--text)',
                fontFamily: 'var(--font-display)', margin: 0,
              }}>Graph Databases</h3>
            </div>

            <Para>
              Graph databases store data as nodes (entities) and edges (relationships
              between entities). Every relationship is a first-class citizen stored
              directly on disk — not derived at query time through JOINs. This makes
              multi-hop relationship traversal extremely fast — following connections
              across a social network, finding fraud rings, or recommending products
              through association chains.
            </Para>

            <Para>
              The problem that graph databases solve: in a relational database, a
              query that asks "find all friends of friends of user X who have purchased
              product Y in the last 30 days" requires five JOINs and grows
              exponentially as the number of hops increases. The same query in a
              graph database traverses edges directly, with performance that is
              proportional to the number of edges traversed rather than the total
              size of all relationships in the database.
            </Para>

            <CodeBox label="Graph database — nodes, edges, and traversal queries">{`Neo4j graph model for a social commerce network:

NODES (entities):
  (:User {id: 4201938, name: "Priya"})
  (:User {id: 1092847, name: "Rahul"})
  (:Product {id: "SKU-001", name: "Kurta", category: "Clothing"})
  (:Product {id: "SKU-002", name: "Shoes",  category: "Footwear"})

EDGES (relationships — stored directly, not derived):
  (Priya)-[:FRIENDS_WITH]->(Rahul)
  (Priya)-[:PURCHASED {date: "2026-03-01"}]->(SKU-001)
  (Rahul)-[:PURCHASED {date: "2026-03-10"}]->(SKU-001)
  (Rahul)-[:PURCHASED {date: "2026-02-28"}]->(SKU-002)
  (SKU-001)-[:FREQUENTLY_BOUGHT_WITH]->(SKU-002)

CYPHER QUERY — "Recommend products to Priya":
  MATCH (priya:User {id: 4201938})
        -[:FRIENDS_WITH]->(:User)
        -[:PURCHASED]->(product:Product)
  WHERE NOT (priya)-[:PURCHASED]->(product)
  RETURN product.name, count(*) AS purchase_count
  ORDER BY purchase_count DESC
  LIMIT 5

This query: finds Priya's friends, finds what they bought,
            filters out what Priya already bought,
            ranks by friend purchase frequency.

In PostgreSQL this is 4 JOINs with self-referencing tables.
As friend networks grow to millions, the relational version
degrades exponentially. The graph version stays fast.

REAL USE CASES:
  ✓ Social network friend-of-friend recommendations
  ✓ Fraud detection (find rings of connected fraudulent accounts)
  ✓ Knowledge graphs (how are these concepts related?)
  ✓ Network topology (how are servers in a data centre connected?)`}</CodeBox>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
              {[
                { label: 'Best databases', value: 'Neo4j, Amazon Neptune, ArangoDB, TigerGraph' },
                { label: 'Best for', value: 'Social graphs, fraud detection, recommendation engines, knowledge graphs' },
                { label: 'Avoid for', value: 'General-purpose data storage, tabular analytics, high write throughput' },
                { label: 'DE ingestion', value: 'Neo4j APOC export, Bolt protocol streaming, periodic snapshots' },
              ].map((item) => (
                <div key={item.label} style={{
                  background: 'var(--bg2)', border: '1px solid var(--border)',
                  borderRadius: 8, padding: '10px 14px',
                }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: '#4285f4',
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase', marginBottom: 3,
                  }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Part 04 — CAP Theorem ────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — CAP Theorem" />
        <SectionTitle>CAP Theorem — Why Every Distributed Database Makes a Trade-off</SectionTitle>

        <Para>
          The CAP theorem, stated by Eric Brewer in 2000 and proved by Gilbert and
          Lynch in 2002, makes a precise claim about distributed databases: a
          distributed system can provide at most two of three guarantees simultaneously.
          Understanding it explains why different databases behave differently during
          network failures — and why that behaviour matters for data pipelines.
        </Para>

        <HighlightBox>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {[
              {
                letter: 'C',
                name: 'Consistency',
                color: '#00e676',
                def: 'Every read receives the most recent write or an error. All nodes in the cluster see the same data at the same time. No stale reads.',
                example: 'You update your cart. The next page load shows the updated cart, not the old one.',
              },
              {
                letter: 'A',
                name: 'Availability',
                color: '#7b61ff',
                def: 'Every request receives a response — not an error. The system keeps responding even if some nodes are down, even if the response might be stale.',
                example: 'Even if one data centre is unreachable, the app keeps working — maybe with slightly stale data.',
              },
              {
                letter: 'P',
                name: 'Partition Tolerance',
                color: '#f97316',
                def: 'The system continues operating even when network messages between nodes are lost or delayed. In any real distributed system, network partitions happen. P is not optional in practice.',
                example: 'A network split between two data centres does not bring the system down.',
              },
            ].map((item) => (
              <div key={item.letter} style={{
                borderLeft: `3px solid ${item.color}`, paddingLeft: 14,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                    background: `${item.color}18`, border: `1px solid ${item.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 900, color: item.color,
                    fontFamily: 'var(--font-display)',
                  }}>{item.letter}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: item.color, fontFamily: 'var(--font-display)' }}>
                    {item.name}
                  </div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 6 }}>
                  {item.def}
                </div>
                <div style={{ fontSize: 12, color: item.color, fontStyle: 'italic', lineHeight: 1.5 }}>
                  {item.example}
                </div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <Para>
          Because partition tolerance is not optional in real distributed systems
          (networks do fail), the practical trade-off is between C and A:
          <strong> CP systems</strong> choose consistency over availability during
          a network partition — they return errors rather than stale data.
          <strong> AP systems</strong> choose availability over consistency during
          a partition — they keep responding but may return stale or inconsistent data.
        </Para>

        <CompareTable
          headers={[
            { label: 'Database' },
            { label: 'Type', color: '#00e676' },
            { label: 'Partition behaviour', color: '#7b61ff' },
            { label: 'Why this matters to DEs', color: '#f97316' },
          ]}
          keys={['db', 'type', 'behaviour', 'de']}
          rows={[
            {
              db: 'PostgreSQL',
              type: 'CP',
              behaviour: 'During a network partition, the primary stops accepting writes rather than risk divergence with replicas',
              de: 'Your CDC pipeline may stall during primary failover — build retry logic',
            },
            {
              db: 'MongoDB (default)',
              type: 'CP',
              behaviour: 'Reads from primary by default — no stale reads. Can be configured for AP with eventual consistency reads from secondaries',
              de: 'Change streams from primary are consistent. Secondary reads for bulk extraction may be slightly stale',
            },
            {
              db: 'Cassandra',
              type: 'AP',
              behaviour: 'Continues accepting reads and writes during partition. Nodes may have different versions of the same row — reconciled later via Last-Write-Wins',
              de: 'Data extracted from Cassandra may have duplicates or slightly inconsistent values — always deduplicate on order_id or timestamp in Silver layer',
            },
            {
              db: 'DynamoDB',
              type: 'AP (default) / CP (opt-in)',
              behaviour: 'Eventually consistent reads by default (stale possible). Strongly consistent reads available at 2× cost',
              de: 'For DE pipelines, always use strongly consistent reads to avoid processing stale records',
            },
            {
              db: 'Redis Cluster',
              type: 'AP',
              behaviour: 'Continues serving from available nodes. Keys on failed nodes unavailable until recovery',
              de: 'Cache misses during partition cause DB fallback — pipeline may see temporary slowdown',
            },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 05 — Decision Framework ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — The Decision Framework" />
        <SectionTitle>How to Choose the Right Database for Any Use Case</SectionTitle>

        <Para>
          The correct database choice is always determined by answering three questions
          in order. Never start with "which database is most popular?" or "which one
          does our current stack use?" Start with the data and access pattern.
        </Para>

        <CodeBox label="The three-question database selection framework">{`QUESTION 1: What is the primary access pattern?

  "Give me this specific entity by its ID"
    → Key-value (Redis) if speed and simplicity are priorities
    → Document (MongoDB) if the entity has variable structure

  "Give me this document with all its related data in one read"
    → Document store (MongoDB, Firestore)

  "Give me all records matching these criteria with arbitrary filters"
    → Relational (PostgreSQL, MySQL)
    → OLAP warehouse (Snowflake, BigQuery) for analytical queries

  "Write millions of events per second, query by a known key"
    → Column-family (Cassandra, DynamoDB)
    → Time-series (InfluxDB, TimescaleDB) for temporal data

  "How are these entities connected? Find N-hop relationships"
    → Graph database (Neo4j, Neptune)

QUESTION 2: How strong must the consistency guarantees be?

  "Financial transactions — partial updates are catastrophic"
    → Must have ACID. Relational database.

  "Product catalogue — slight staleness is acceptable"
    → AP NoSQL acceptable. MongoDB, DynamoDB.

  "User session data — stale session is acceptable, availability must be high"
    → AP is fine. Redis.

  "Delivery GPS events — eventual consistency acceptable"
    → AP acceptable. Cassandra.

QUESTION 3: What scale is genuinely needed?

  < 10M rows, standard read/write mix
    → PostgreSQL handles this comfortably. No NoSQL needed.

  > 100M rows, write-heavy, known access pattern
    → Column-family or key-value if the pattern fits.

  > 1B rows, analytical queries
    → Data warehouse (Snowflake/BigQuery), not operational database.

  Rule: do not introduce NoSQL complexity until relational cannot
        handle the workload. Most applications never reach that scale.`}</CodeBox>

        <SubTitle>The polyglot persistence pattern — using multiple databases together</SubTitle>

        <Para>
          At a mature Indian tech company, the right answer is almost never "one
          database for everything." Different parts of the application have different
          access patterns and consistency requirements. The polyglot persistence
          pattern uses the best database for each specific need.
        </Para>

        <CodeBox label="Polyglot persistence — Shopify-style data architecture">{`MEESHO (e-commerce platform) — representative polyglot architecture:

  PostgreSQL (relational, CP):
    → Orders, payments, settlements, user accounts
    → Needs ACID. Cannot tolerate inconsistency. Normalised.

  MongoDB (document, CP):
    → Product catalogue (variable attributes per category)
    → Seller profiles and store configurations
    → Flexible schema — categories change frequently

  Redis (key-value, AP):
    → User sessions (logged in / cart contents)
    → API rate limiting per seller per minute
    → Caching product details (avoid DB hit per page load)
    → Real-time inventory counters (INCR/DECR atomic operations)

  Cassandra (column-family, AP):
    → User activity events (page views, searches, clicks)
    → Notification delivery logs
    → Write-heavy, partition-key access only needed

  Elasticsearch (search index — a fifth type!):
    → Full-text product search ("cotton kurta under 500")
    → Inverted index — not relational, not a traditional NoSQL type
    → Synced from MongoDB product catalogue via pipeline

DATA ENGINEER'S ROLE IN THIS ARCHITECTURE:
  → Ingest from ALL five systems into the data lake
  → Each has a different extraction approach:
    PostgreSQL: CDC via Debezium WAL reading
    MongoDB:    Change streams API
    Redis:      Periodic snapshots (no built-in CDC)
    Cassandra:  CDC plugin or Spark Cassandra Connector bulk export
    Elasticsearch: Scroll API for bulk export, no CDC`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — DE Ingestion Patterns ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Ingesting From Each Type" />
        <SectionTitle>How Data Engineers Ingest From Each Database Type</SectionTitle>

        <Para>
          Every database type has different capabilities and constraints for data
          extraction. A data engineer who knows only SQL ingestion will be blocked
          when the team needs data from MongoDB or Cassandra. Here are the practical
          extraction patterns for each type.
        </Para>

        <CompareTable
          headers={[
            { label: 'Database Type' },
            { label: 'Best ingestion method', color: '#00e676' },
            { label: 'Incremental approach', color: '#7b61ff' },
            { label: 'Main challenge', color: '#ff4757' },
          ]}
          keys={['type', 'method', 'incremental', 'challenge']}
          rows={[
            {
              type: 'Relational (PostgreSQL)',
              method: 'CDC via Debezium reading WAL logical replication; or JDBC incremental extraction',
              incremental: 'WAL LSN position (CDC) or WHERE updated_at > last_run',
              challenge: 'Long transactions block WAL cleanup and stall CDC; must monitor replication lag',
            },
            {
              type: 'Document (MongoDB)',
              method: 'MongoDB Change Streams API for real-time; mongodump or Spark connector for bulk',
              incremental: 'Change stream resume token (survives restarts); or _id / updatedAt field',
              challenge: 'Schema variation between documents requires schema-on-read handling; nested arrays need exploding',
            },
            {
              type: 'Key-Value (Redis)',
              method: 'RDB snapshot file parsing; Redis Streams if events are published there; SCAN + DUMP for selective keys',
              incremental: 'No built-in CDC; Redis Streams provide append-only event log if application writes to them',
              challenge: 'In-memory store — no persistent history by default; key expiry means data can disappear before extraction',
            },
            {
              type: 'Column-Family (Cassandra)',
              method: 'Spark Cassandra Connector for bulk parallel extraction; Debezium Cassandra CDC connector for streaming',
              incremental: 'writetime() function for last-written timestamp; CDC connector reads commit log',
              challenge: 'AP consistency means extracted data may have duplicates from concurrent writes; must deduplicate',
            },
            {
              type: 'Graph (Neo4j)',
              method: 'APOC export procedures (JSON/CSV); Bolt protocol streaming; Neo4j to Kafka connector',
              incremental: 'Transaction log (Enterprise edition); or timestamp properties on nodes/edges',
              challenge: 'Graph-native queries do not map naturally to tabular format; flattening relationships for DE use requires design decisions',
            },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 07 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Choosing the Wrong Database — A Real Architectural Mistake</SectionTitle>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px', marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', marginBottom: 20, letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Scenario — Health-Tech Startup · Architectural Review
          </div>

          <Para>
            A health-tech startup joined an accelerator in 2023. In the excitement of
            building fast, their backend team chose MongoDB for everything — user accounts,
            appointments, prescriptions, billing, lab results, doctor notes. "NoSQL is
            web-scale," someone said. "We might have millions of users someday."
          </Para>

          <Para>
            By 2025 they had 80,000 users. Their data team was asked to build a monthly
            billing report — total revenue by insurance provider, doctor specialty,
            and city. The query took 45 seconds on MongoDB and required three sequential
            aggregation pipeline stages across 2 million documents. It regularly timed out.
          </Para>

          <Para>
            You are brought in as the data engineer to fix this. Your analysis:
          </Para>

          <Para>
            <strong>The fundamental problem:</strong> MongoDB was the right choice for
            patient records (variable structure — diabetes patients have different fields
            than maternity patients) and doctor notes (free-form text). It was the wrong
            choice for billing data (highly relational: patient → insurance → doctor →
            service → claim) and appointment scheduling (strong consistency required —
            two doctors cannot be double-booked).
          </Para>

          <Para>
            <strong>What you recommend:</strong> Migrate billing and appointment data to
            PostgreSQL, which has proper FOREIGN KEY constraints, fast aggregation on
            indexed columns, and ACID transactions for booking operations. Keep patient
            records and doctor notes in MongoDB where the flexible schema genuinely adds
            value. Build a data pipeline that ingests from both into Snowflake for
            reporting — a proper separation of operational and analytical concerns.
          </Para>

          <Para>
            <strong>The result after migration:</strong> The monthly billing report query
            runs in 800 milliseconds in Snowflake. Double-booking incidents disappear
            with PostgreSQL's transaction semantics. The team can now add new billing
            queries in minutes. The patient record system stays in MongoDB where
            flexibility is genuinely needed.
          </Para>

          <Para>
            The lesson: MongoDB did not fail. The team used it for the wrong problems.
            The correct architecture uses the right database for each access pattern —
            and a data engineer who understands both SQL and NoSQL deeply can recognise
            and fix these mismatches.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 08 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. When would you choose MongoDB over PostgreSQL for a data source?',
            a: `I would choose MongoDB over PostgreSQL when two conditions are both true: the data has genuinely variable structure that does not map cleanly to fixed columns, and the primary access pattern is reading or writing one complete document at a time rather than querying across documents.

The canonical example is a product catalogue in e-commerce. Electronics have RAM, storage, display size, and processor specs. Clothing has size, colour, fabric, and care instructions. Food has weight, allergens, and expiry date. Forcing all of these into one relational table produces a wide table with 80+ columns where every row has 70+ NULLs. MongoDB stores each product as a document with only the fields relevant to its category, making inserts clean, validation straightforward, and schema changes (adding a new category) require no migration.

I would not choose MongoDB when the data is strongly relational (billing, orders, financial transactions), when I need ACID transactions across multiple entities, when I need flexible ad-hoc queries across documents without knowing the query pattern in advance, or when I need the strong referential integrity that foreign keys provide. For data engineering specifically, MongoDB's change streams make incremental ingestion straightforward — an advantage over PostgreSQL CDC in some architectures.`,
          },
          {
            q: 'Q2. What is the CAP theorem and what does it mean for a data pipeline that reads from Cassandra?',
            a: `The CAP theorem states that a distributed database can provide at most two of three guarantees: Consistency (every read sees the most recent write), Availability (every request gets a response), and Partition Tolerance (the system operates despite network failures between nodes).

Since network partitions are a reality in distributed systems, the practical choice is between CP (consistency preferred during partition — return error rather than stale data) and AP (availability preferred during partition — return possibly stale data rather than an error). Cassandra is an AP system — it continues accepting reads and writes during network partitions, at the cost of potential inconsistency between nodes.

For a data pipeline reading from Cassandra, this AP nature has two concrete implications. First, Cassandra uses Last-Write-Wins conflict resolution — when two nodes receive concurrent updates to the same row, the one with the later timestamp wins. During high-write periods or after a node failure, a row might temporarily exist in different versions on different nodes. If your ingestion pipeline reads from multiple Cassandra nodes during such a period, you might see slightly different values for the same row depending on which node served each read.

Second, Cassandra does not guarantee unique writes — network issues can cause a write to be retried and applied twice (at-least-once delivery). This means your pipeline will occasionally encounter duplicate rows even in a table that logically should have one row per entity.

The practical implication: always deduplicate Cassandra extracts in the Silver layer. Use the combination of partition key and clustering key as the deduplication key, keeping the record with the most recent writetime(). Never assume Cassandra data is clean straight from extraction.`,
          },
          {
            q: 'Q3. A team wants to use Cassandra for their analytics dashboard because "it scales well." What would you tell them?',
            a: `I would explain that Cassandra's scaling characteristics are optimised for a workload that is the opposite of what analytics dashboards require.

Cassandra scales by distributing data across nodes using a partition key. All data for a given partition key lives on the same node — this makes writes for that key extremely fast. The constraint is that queries must specify the partition key. Cassandra will perform very poorly or refuse to execute queries that scan across partitions, because that requires touching every node in the cluster.

Analytics dashboards require exactly the opposite pattern: aggregations across all data, filtered by various dimensions, with flexible group-by and where clauses that change based on what the analyst wants to see. "Total revenue by city for last week" scans all partitions. "Average delivery time by restaurant category" scans all partitions. "New user growth by acquisition channel" scans all partitions. Every typical analytics query violates Cassandra's fundamental constraint.

Additionally, Cassandra has no native GROUP BY (it was added in a limited form in Cassandra 3.10 but remains very constrained), no window functions, no arbitrary JOINs between tables, and no query optimiser that can choose efficient execution plans for complex queries.

The right tool for analytics dashboards is a columnar data warehouse — Snowflake, BigQuery, Redshift, or ClickHouse — designed specifically for the scan-and-aggregate access pattern. If the team's concern is Cassandra's high write throughput for operational data, the correct architecture is to keep Cassandra for operations and build a pipeline that ingests Cassandra data into the warehouse for analytics. These two concerns are not in conflict when handled with proper architectural separation.`,
          },
          {
            q: 'Q4. How would you extract data from MongoDB into a data lake incrementally?',
            a: `MongoDB offers two mechanisms for incremental extraction, and the choice between them depends on the freshness requirement.

For near-real-time extraction (minutes of latency), MongoDB Change Streams provide an append-only log of all changes — inserts, updates, deletes, and replacements — from a collection. Change streams work similarly to PostgreSQL's WAL logical replication: the consumer receives each change with a resume token that records its position in the oplog. The consumer stores the last processed resume token and uses it to start from the correct position after restarts, ensuring no events are missed. This approach requires MongoDB 3.6 or later, a replica set or sharded cluster (not standalone), and appropriate oplog size configured to survive consumer downtime.

For batch extraction (hourly or daily), the most reliable approach is filtering by a monotonically increasing field. If documents have an updatedAt timestamp field, query WHERE updatedAt >= last_checkpoint_timestamp. If documents have a monotonically increasing _id (which MongoDB's ObjectId is — it encodes a timestamp), query WHERE _id > last_max_id.

Two important caveats for MongoDB extraction. First, not all collections have reliable update timestamps — some insert-only collections have no updatedAt field. For these, track by _id. For collections with frequent updates and no timestamp, full extraction may be necessary. Second, MongoDB's flexible schema means that different documents in the same collection can have different fields. The extraction must handle missing fields gracefully and the downstream schema must either be wide enough to accommodate all possible fields or use a VARIANT or JSON column for infrequently accessed nested data.`,
          },
          {
            q: 'Q5. What is the difference between a graph database and a relational database with JOINs for relationship data?',
            a: `Both relational databases and graph databases can model relationships between entities. The critical difference is in how those relationships are stored and how query performance scales with traversal depth.

In a relational database, relationships between entities are represented as foreign keys and JOIN operations. A "friends" relationship between users might be a user_friendships table with user_id and friend_id columns. Querying direct friends is fast — one JOIN. Querying friends-of-friends requires two JOINs with a self-referencing table. Querying three hops requires three JOINs. The performance cost grows with each hop because each JOIN requires the database to scan the entire relationships table to find matches, and the result set can grow exponentially.

In a graph database, relationships are stored as first-class edges on disk — each edge is a direct pointer from one node to another. Traversing a relationship is following a pointer, not scanning a table. Finding friends-of-friends requires traversing two pointer hops rather than two table scans. The performance is proportional to the number of edges actually traversed, not to the total size of all relationships in the database.

For data with shallow relationships and small networks, a relational database with proper indexes handles the workload adequately. A customer orders table with a product JOIN is not a graph problem. The graph database becomes clearly superior when: the relationships form a genuine network (social connections, fraud rings, knowledge graphs), queries need to traverse multiple hops, the network is large enough that relational JOIN performance degrades, and the relationship itself has properties (strength of connection, relationship type, timestamp).

In practice, most data engineering work involves the relational model. Graph databases appear in specialised use cases — recommendation engines, fraud detection, and network analysis — and represent a small fraction of overall data platform work.`,
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

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: `MongoServerError: Executor error during find command — $where is not allowed in this context (Atlas Free Tier)`,
            cause: 'The ingestion query uses $where JavaScript evaluation, which is disabled on MongoDB Atlas free tier and restricted on shared clusters for security and performance reasons. $where runs arbitrary JavaScript on the server, which is slow (cannot use indexes) and a security risk.',
            fix: 'Replace $where with native MongoDB query operators that use indexes: $gt, $lt, $gte, $lte, $in, $exists. For example, replace {$where: "this.amount > 500"} with {amount: {$gt: 500}}. Native operators use indexes and are supported on all MongoDB tiers.',
          },
          {
            error: `Cassandra InvalidRequest: Partition key part delivery_id must be restricted since preceding part is`,
            cause: 'A Cassandra query is filtering on a clustering key column (event_time) without providing the partition key (delivery_id). Cassandra requires the partition key to be specified in every query — it uses the partition key to route the request to the correct node. A query without the partition key would need to scan every node in the cluster, which Cassandra refuses unless ALLOW FILTERING is explicitly added.',
            fix: 'Always include the full partition key in Cassandra queries. If you need to query by a non-partition-key column, create a separate table where that column is the partition key, or add a secondary index (with caution — secondary indexes in Cassandra have poor performance at scale). Never use ALLOW FILTERING in production — it triggers full cluster scans.',
          },
          {
            error: `Redis connection pool exhausted — TimeoutError: Command timed out after 100ms waiting for a connection from the pool`,
            cause: 'The application or pipeline is creating more Redis connections than the pool allows. Each request that cannot get a connection from the pool waits until one is freed or the timeout expires. This happens when: connection pool size is too small for concurrent load, connections are not being returned to the pool (missing finally block or context manager), or Redis server is slow and connections are held longer than usual.',
            fix: 'Ensure all Redis connections are used within a context manager or finally block: with redis_client.pipeline() as pipe. Increase the connection pool size in the client configuration if load is genuinely higher. Check Redis server latency — a slow server causes connections to be held longer, reducing effective pool throughput. Monitor pool saturation with redis_client.connection_pool._created_connections and _available_connections.',
          },
          {
            error: `Neo4j MemoryLimitExceededException: An estimation of the memory required to execute the query exceeded allowed limits — consider using LIMIT or SKIP`,
            cause: 'A Cypher traversal query is attempting to load a very large subgraph into memory for processing. This often happens with open-ended traversal patterns like MATCH (n)-[*]->(m) with no depth limit, or MATCH queries that return millions of nodes before filtering.',
            fix: 'Add depth limits to relationship traversal: MATCH (n)-[*1..3]->(m) limits to 3 hops. Add LIMIT early in the query to reduce the working set. Use WHERE clauses that filter before traversal rather than after. For bulk extraction of large graphs, use the APOC export procedures (apoc.export.csv.all) which stream results rather than loading everything into memory.',
          },
          {
            error: `DuplicateKeyError: E11000 duplicate key error collection: orders.order_events index: order_id_1 dup key: {order_id: 9284751}`,
            cause: 'A MongoDB collection has a unique index on order_id, and the pipeline is attempting to insert a document with an order_id that already exists. This happens during pipeline reruns that re-process already-ingested records, or when the source system generates duplicate events.',
            fix: 'Use upsert operations instead of insert: db.collection.updateOne({order_id: 9284751}, {$set: {...}}, {upsert: true}). This inserts if the document does not exist, or updates if it does. For pipelines that must be idempotent (safe to rerun), always use upsert semantics rather than insert for any collection with a unique key constraint.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red)',
              marginBottom: 12, background: 'rgba(255,71,87,0.08)',
              border: '1px solid rgba(255,71,87,0.2)',
              borderRadius: 6, padding: '8px 12px', lineHeight: 1.5,
            }}>{item.error}</div>
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

      {/* ── Key Takeaways ────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        '"SQL vs NoSQL" is the wrong framing. The right question is: what are the access patterns of this data? Relational databases provide flexible querying and strong consistency. NoSQL databases optimise specific access patterns at the cost of flexibility and sometimes consistency.',
        'There are four completely different NoSQL families, not one: Key-Value (Redis — extreme speed for key lookups), Document (MongoDB — flexible schema for entity-centric data), Column-Family (Cassandra — extreme write throughput with partition-key access), and Graph (Neo4j — fast multi-hop relationship traversal).',
        'Key-value stores (Redis) provide sub-millisecond lookups by exact key. They have no query language beyond GET/SET. Use for sessions, caching, rate limiting, and real-time counters. Never as a primary persistent data store.',
        'Document stores (MongoDB) excel at reading and writing complete entities with variable structure. They break down for cross-document aggregations and strongly relational data. Best for product catalogues, user profiles, and CMS content with changing schemas.',
        'Column-family stores (Cassandra) are designed around specific query patterns, not general entities. Every query must include the partition key. Design one table per query pattern. Best for write-heavy workloads (IoT, event streams) where queries are known in advance.',
        'Graph databases (Neo4j) store relationships as first-class edges, making multi-hop traversal fast and constant relative to total graph size. Use for social networks, fraud detection, and recommendation engines. Relational JOIN performance degrades exponentially with hop count; graph traversal does not.',
        'The CAP theorem: distributed databases can guarantee at most two of Consistency, Availability, and Partition Tolerance. Since P is not optional, the real choice is CP (return error rather than stale data) vs AP (return potentially stale data rather than error). Cassandra is AP — always deduplicate its extracts.',
        'Mature companies use polyglot persistence — PostgreSQL for financial transactions, MongoDB for product catalogues, Redis for sessions and caching, Cassandra for event streams. A data engineer must ingest from all of them.',
        'Each database type has a different ingestion approach: PostgreSQL via CDC/WAL, MongoDB via Change Streams, Redis via RDB snapshots, Cassandra via Spark Connector or CDC plugin, Neo4j via APOC export. Know at least the first two deeply.',
        'Most applications never need NoSQL. PostgreSQL handles hundreds of millions of rows comfortably with proper indexing. Do not introduce NoSQL complexity until relational genuinely cannot handle the workload. The wrong database for the access pattern always causes more problems than it solves.',
      ]} />

    </LearnLayout>
  )
}