import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { DEWorkshop, WorkshopCode, WorkshopAnswer } from '@/components/content/DEWorkshop'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'NoSQL Stores for Data Engineers — Document, Key-Value, Wide-Column | Chaduvuko',
  description: 'Compare document, key-value, and wide-column data models through access patterns, consistency choices, and analytics integration.',
}

const SectionTag = ({ text }: { text: string }) => <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
const SectionTitle = ({ children }: { children: React.ReactNode }) => <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{children}</h2>
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
const CodeBox = ({ children, language = 'text' }: { children: string; language?: string }) => <div style={{ marginBottom: 22 }}><div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>{language}</div><pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}><code>{children}</code></pre></div>
const Table = ({ rows }: { rows: string[][] }) => <div style={{ overflowX: 'auto', marginBottom: 24 }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}><thead><tr>{['Model', 'Natural access pattern', 'Engineering trade-off'].map(x => <th key={x} style={{ textAlign: 'left', padding: 10, color: 'var(--muted)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>{x}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} style={{ padding: 10, color: 'var(--text)', borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>{cell}</td>)}</tr>)}</tbody></table></div>

export default function NoSQLStoresModule() {
  return (
    <LearnLayout title="NoSQL Stores for Data Engineers — Document, Key-Value, Wide-Column" description="Compare document, key-value, and wide-column data models through access patterns, consistency choices, and analytics integration." section="Data Engineering — Lesson 36" readTime="60 min">
      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 01 — Start with the Workload" />
        <SectionTitle>NoSQL Is a Family of Data Models, Not One Alternative to SQL</SectionTitle>
        <Para>Prerequisites: understand tables, keys, indexes, transactions, and the relational vs non-relational distinction. “NoSQL” commonly groups systems with very different models: document stores, key-value stores, wide-column stores, graph systems, and others. For data engineers, the useful question is not whether one model is fashionable; it is which read and write patterns, consistency needs, data shape, scale, and operational constraints the store is designed to serve.</Para>
        <Para>A delivery app might keep a mutable order aggregate, a short-lived session token, and a high-volume stream of status events. Those are different workloads. A relational store may still be the best system of record for a transaction, while a key-value store supports a fast lookup or a wide-column store serves a high-write event history. Choosing multiple stores adds synchronization, observability, backup, access-control, and schema-management work that must be justified.</Para>
        <Callout label="Learning objective" type="info">By the end, map an access pattern to document, key-value, or wide-column modeling; identify partition and consistency risks; and sketch an extraction path that preserves change history for analytics.</Callout>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 02 — Document Stores" />
        <SectionTitle>Keep Related, Nested Data Together When Reads Need the Aggregate</SectionTitle>
        <Para>A document store represents records as documents, often JSON-like objects with nested structures and arrays. It can be convenient when a service reads and writes a natural aggregate such as an order with line items and delivery details. Fields can evolve, but flexible structure does not remove the need for a contract: inconsistent names, types, and optional-field behavior make downstream analysis harder.</Para>
        <Para>Denormalization can avoid joins for common access paths, but duplicate values create update and reconciliation work. An embedded array can grow without bound or make updates expensive. Before choosing embedding, ask whether the child data is bounded, whether it is read with the parent, and whether it has independent lifecycle or ownership. Indexes should support measured queries; indexing every nested field increases write and storage costs.</Para>
        <CodeBox language="json">{`{
  "order_id": "ord-4821",
  "customer_id": "cus-19",
  "status": "dispatched",
  "placed_at": "2026-10-12T10:14:00Z",
  "items": [
    {"sku": "tea-01", "quantity": 2, "unit_price_minor": 18000},
    {"sku": "cup-04", "quantity": 1, "unit_price_minor": 25000}
  ]
}`}</CodeBox>
        <Para>This shape supports reading one order aggregate. An analytics pipeline may flatten each item into a fact-like row, preserve the original document for audit or reprocessing, and retain the extraction timestamp and source version. Be explicit whether a status update replaces the document, appends an event, or is available through change capture; that difference determines whether historical status is reconstructable.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 03 — Key-Value Stores" />
        <SectionTitle>Optimize for a Known Key, Not Ad Hoc Analytics</SectionTitle>
        <Para>A key-value store maps a key to a value and is designed around direct lookup or update by that key. The value may be opaque to the store or have limited query features. Common uses include caching, session state, counters, feature lookups, and idempotency records. Keys need careful namespaces, expiration behavior, cardinality estimates, and lifecycle rules. A cache miss or eviction should not silently become data loss if the value is authoritative.</Para>
        <Para>Design keys from the actual lookup: &quot;session:user_id&quot;, &quot;rate-limit:client:window&quot;, or &quot;payment:payment_id:dedupe&quot;. Avoid a single shared key that becomes a hotspot and avoid storing personally sensitive information in a key that may appear in logs. A TTL is a cleanup policy, not a substitute for a retention and correctness decision.</Para>
        <CodeBox>{`def cache_key(customer_id, region):
    return f"customer-profile:{region}:{customer_id}"

# A lookup cache can accelerate a pipeline but should not be its only durable source.
key = cache_key("c-172", "ap-south")
print(key)
print("Use a durable source for rebuilds and replay")`}</CodeBox>
        <Para>For analytics, key-value stores usually need a separate export, change stream, or source-of-record system. A full scan can be expensive or interfere with production traffic. Ask about snapshot consistency, incremental change capture, throttling, and deletes before promising a complete replica to a warehouse.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 04 — Wide-Column Stores" />
        <SectionTitle>Model Rows Around the Partition and Query You Must Serve</SectionTitle>
        <Para>Wide-column systems organize data into partitions identified by partition keys, with clustering or sort columns arranging records within a partition. This model can handle high write volume and predictable queries when keys distribute load and match read patterns. It is not the same thing as columnar file storage such as Parquet: wide-column refers to an operational data model, while columnar files optimize analytical scans over columns.</Para>
        <Para>For example, a status history could be partitioned by a delivery region and a bounded time bucket, then sorted by event time and order identifier. A partition that is too broad can grow indefinitely; a low-cardinality key can create a hot partition; an overly granular key can make reads fan out across many partitions. Query-first modeling may lead to duplicated rows for distinct access patterns, which requires clear update and repair behavior.</Para>
        <CodeBox language="text">{`Conceptual table: order_status_by_region_day

Partition key: (region, event_date)
Clustering keys: (order_id, event_time)

Query served:
  list status events for one region and one day,
  ordered by order and event time

Not automatically served:
  scan every region for one order across all history`}</CodeBox>
        <Callout label="Design the key from queries" type="tip">Write the critical query first, then identify the partition boundary and ordering it needs. Validate that the key spreads writes, keeps partition growth bounded, and supports retention and backfill without a full-table scan.</Callout>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 05 — Compare Consistency and Transactions" />
        <SectionTitle>Know Which Guarantees the Workload Actually Requires</SectionTitle>
        <Table rows={[
          ['Document', 'Read or update one aggregate with nested data.', 'Cross-document operations and secondary indexes vary; bound document size and update scope.'],
          ['Key-value', 'Read or write by a stable key with predictable latency needs.', 'Limited ad hoc querying; define expiration, hot-key, and rebuild behavior.'],
          ['Wide-column', 'High-volume writes and queries with known partition keys.', 'Partition design is part of the schema; avoid unbounded or skewed partitions.'],
          ['Relational database', 'Relationships, constraints, joins, and transactional workflows.', 'Scale and workload trade-offs still exist; normalize where integrity matters.'],
        ]} />
        <Para>Consistency is not a single “strong vs eventual” property across all systems or operations. Read consistency, write acknowledgement, replication behavior, and transaction scope may differ. Ask what a caller can observe after an acknowledged write, what failures can lose or duplicate work, and whether a cross-record invariant is enforced by the database or by application code.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 06 — Make Operational Data Useful for Analytics" />
        <SectionTitle>Plan Snapshots, Changes, Deletes, and Schema Drift</SectionTitle>
        <Para>Operational stores are optimized for application behavior, not necessarily for full analytical scans. A data pipeline may use a consistent snapshot followed by change data capture, periodic incremental exports, or application events. Each method has a correctness boundary: snapshot isolation, checkpoint position, delete representation, source retention, and schema-change handling. Confirm whether the source can capture updates and deletes before setting expectations for historical completeness.</Para>
        <Para>Keep an immutable raw representation where appropriate, add ingestion metadata such as extraction time and source sequence, and normalize into analytics-friendly tables with explicit keys and types. Protect the source with rate limits, read replicas or export services where supported, bounded concurrency, and backpressure. Reconciliation counts between source and landing layers detect missing ranges and duplicate delivery.</Para>
        <ul style={{ paddingLeft: 22, color: 'var(--text)', lineHeight: 1.9 }}>
          <li>Document store: preserve nested source data and version parsing rules when flattening.</li>
          <li>Key-value store: avoid assuming key scans provide a low-cost consistent snapshot.</li>
          <li>Wide-column store: export by partition ranges and monitor hot partitions and source impact.</li>
          <li>All models: test delete propagation, replay, schema changes, credentials, and retention.</li>
        </ul>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 07 — Guided Store Selection" />
        <DEWorkshop title="Choose a store for three application reads" objective="Choose a primary data model from the access pattern, then identify the analytics extraction risk." prerequisites="Know the document, key-value, and wide-column models, and distinguish serving queries from analytical scans.">
          <Para>A fictional delivery service needs (A) fetch one order with its bounded line items, (B) look up an expiring session token by exact key, and (C) append status events for a region-day and read them in event-time order. The platform team proposes one NoSQL store for all three and a nightly export to analytics. Pick a reasonable primary model per workload and name one source-impact risk.</Para>
          <WorkshopCode language="python" expectedOutput={'order=Document\nsession=KeyValue\nstatus_history=WideColumn\nexport_risk=source_scan_and_delete_capture'}>{`workloads = {
    "order": {"read": "aggregate by order_id", "writes": "bounded order updates"},
    "session": {"read": "exact key lookup", "writes": "expire after inactivity"},
    "status_history": {"read": "region-day ordered events", "writes": "append-heavy"},
}
choices = {"order": "Document", "session": "KeyValue", "status_history": "WideColumn"}
for name, store in choices.items():
    print(f"{name}={store}")
print("export_risk=source_scan_and_delete_capture")`}</WorkshopCode>
          <WorkshopAnswer><Para>Document is a natural fit for a bounded order aggregate, key-value for exact session access with a deliberate TTL, and wide-column for an append-heavy region-day history query if partition sizing and ordering are validated. A nightly scan can burden production and may not capture deletes consistently. Ask for a snapshot/change-capture strategy, bounded extraction ranges, a source-lag limit, and reconciliation before promising analytics freshness.</Para></WorkshopAnswer>
        </DEWorkshop>
        <Para>Practice: sketch keys and queries for a product catalog; identify a hot-key risk; decide how to represent deletes in an analytics feed; compare a full snapshot with CDC; and propose a source-load guardrail that pauses ingestion when application latency rises.</Para>
      </section>

      <section style={{ marginBottom: 48 }}>
        <SectionTag text="// Part 08 — Key Takeaways" />
        <KeyTakeaways items={[
          'NoSQL is a set of distinct models; pick from access patterns and correctness requirements.',
          'Document stores suit aggregate reads, key-value stores exact-key access, and wide-column systems partitioned query patterns.',
          'Wide-column operational tables are not the same as columnar analytical files.',
          'Keys, partition boundaries, TTLs, indexes, and consistency guarantees are production design choices.',
          'Analytics extraction must account for source load, snapshots, updates, deletes, replay, and schema drift.',
          'Every additional serving store creates synchronization and operational ownership work.',
        ]} />
        <Para>Next, use these storage choices alongside facts, dimensions, and grain to shape an analytical model.</Para>
        <Link href="/learn/data-engineering/data-modelling" style={{ display: 'inline-block', background: '#4285f4', color: '#000', fontSize: 13, fontWeight: 700, borderRadius: 8, padding: '10px 18px', textDecoration: 'none' }}>Lesson 37 → Data Modelling — Dimensional, Star and Snowflake Schema</Link>
      </section>
    </LearnLayout>
  )
}
