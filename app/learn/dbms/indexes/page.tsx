import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Indexes in Databases — B+ Tree, Clustered, Covering | DBMS | Chaduvuko',
  description:
    'How database indexes work, why queries slow down at scale, B+ tree vs hash indexes, clustered vs non-clustered, covering indexes, and when NOT to add an index.',
}

export default function Indexes() {
  return (
    <LearnLayout
      title="Indexes"
      description="Why queries slow down at scale and exactly how indexes fix it. The data structure behind every fast database lookup — explained without skipping anything."
      section="DBMS"
      readTime="35–40 min"
      updatedAt="March 2026"
    >
      {/* ── SECTION 1 — THE PROBLEM ── */}
      <section style={{ marginBottom: 60 }}>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          Imagine a library with 1 million books — no catalogue, no shelf labels, no organisation.
          Finding one specific book means walking through every single shelf until you find it.
          That's called a <strong style={{ color: 'var(--text)' }}>full table scan</strong> — what
          a database does without an index.
        </p>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          Now imagine the library has a catalogue — a small organised book that tells you exactly
          which shelf and row number every book is on. You check the catalogue (2 seconds), go
          directly to the shelf (1 second), pick the book (1 second). Done.
          That catalogue is a <strong style={{ color: 'var(--text)' }}>database index</strong>.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.3)', borderRadius: 10, padding: '18px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#ff4757', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Without Index</div>
            <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8,  marginBottom: 10 }}>
              SELECT * FROM orders WHERE customer_id = 'C001' on 50 million rows:
            </div>
            <div style={{ fontSize: 13, color: '#ff4757', fontFamily: 'var(--font-mono)', background: 'rgba(255,71,87,0.05)', border: '1px solid rgba(255,71,87,0.15)', borderRadius: 6, padding: '8px 12px' }}>
              Full table scan — reads all 50M rows<br />
              Query time: ~8 seconds ⚠
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 10, padding: '18px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>With Index on customer_id</div>
            <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8,  marginBottom: 10 }}>
              Same query, same 50 million rows:
            </div>
            <div style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--font-mono)', background: 'rgba(0,230,118,0.05)', border: '1px solid rgba(0,230,118,0.15)', borderRadius: 6, padding: '8px 12px' }}>
              Index lookup — reads ~log₂(50M) ≈ 26 comparisons<br />
              Query time: ~2ms ✓
            </div>
          </div>
        </div>

        <Callout type="info">
          An index is a separate data structure stored alongside the table. It contains
          a sorted copy of the indexed column values along with pointers to the actual
          row locations on disk. The database keeps the index updated automatically every
          time data changes.
        </Callout>
      </section>

      {/* ── B+ TREE INDEX ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>
          B+ Tree Index — The Standard
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          The vast majority of database indexes use a data structure called a
          <strong style={{ color: 'var(--text)' }}> B+ Tree</strong>. Not a binary tree —
          a B+ tree is much wider and much shallower, which is critical for disk-based storage.
        </p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em' }}>B+ Tree Structure</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2, color: 'var(--text2)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto' }}>
            <div style={{ color: '#0078d4', marginBottom: 4 }}>Internal nodes (keys only — no data):</div>
            <div style={{ paddingLeft: 20, color: 'var(--text2)' }}>           [30  |  60  |  90]</div>
            <div style={{ paddingLeft: 20, color: 'var(--muted)' }}>          /      |       |      \</div>
            <div style={{ color: 'var(--accent)', marginTop: 4 }}>Leaf nodes (keys + data pointers — all linked):</div>
            <div style={{ paddingLeft: 20, color: 'var(--text2)' }}>[10,20] → [30,40,50] → [60,70,80] → [90,100]</div>
            <div style={{ color: 'var(--muted)', marginTop: 8, fontSize: 12 }}>// All leaf nodes are linked together ↑ — enables range scans</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 12, marginBottom: 20 }}>
          {[
            { prop: 'Internal nodes', desc: 'Store only keys (no actual row data). Used for navigation — finding the right path down the tree.' },
            { prop: 'Leaf nodes', desc: 'Store the key values AND pointers to the actual data rows on disk. This is where the search ends.' },
            { prop: 'Leaf nodes are linked', desc: 'All leaf nodes are connected in a doubly-linked list. This is what makes range queries (BETWEEN, >, <) blazing fast.' },
            { prop: 'Balanced always', desc: 'Every path from root to leaf is the same length. Guarantees O(log n) for every search, insert, and delete.' },
          ].map((item) => (
            <div key={item.prop} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6, fontFamily: 'Syne, sans-serif' }}>{item.prop}</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── INDEX TYPES ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>Index Types — Know Each One</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              name: 'Clustered Index', color: '#0078d4',
              desc: 'The table data itself is physically sorted and stored in the order of the index. Only ONE clustered index per table — because you can only physically sort data one way.',
              detail: 'Primary keys automatically become clustered indexes in most databases. Querying by primary key is fastest because the data is already in sorted order on disk.',
              example: 'SELECT * FROM orders WHERE order_id = \'ORD-001\' — uses clustered index on order_id',
            },
            {
              name: 'Non-Clustered Index', color: 'var(--accent)',
              desc: 'A separate structure that contains the indexed values and pointers to the actual rows. The table data itself is NOT sorted by this index.',
              detail: 'A table can have many non-clustered indexes. Each one costs storage and slows down INSERT/UPDATE/DELETE — but speeds up SELECT on the indexed columns.',
              example: 'Index on customer_id in orders table — the orders are not sorted by customer_id physically, but lookups are fast.',
            },
            {
              name: 'Composite Index', color: '#f97316',
              desc: 'An index on two or more columns combined. Column ORDER matters critically — the index can only be used if the query filters on the leftmost columns.',
              detail: 'Index on (last_name, first_name) helps queries filtering by last_name OR (last_name, first_name). It does NOT help queries filtering only on first_name.',
              example: 'CREATE INDEX idx_name ON customers(city, age) — helps WHERE city=X and WHERE city=X AND age>Y. Does NOT help WHERE age>Y alone.',
            },
            {
              name: 'Covering Index', color: '#8b5cf6',
              desc: 'An index that contains all the columns a query needs — the query is answered entirely from the index without even reading the actual table rows.',
              detail: 'The fastest possible query — zero disk reads to the actual table. Design these specifically for your most frequently run, performance-critical queries.',
              example: 'Query: SELECT name, city FROM customers WHERE customer_id = \'C001\'. Index on (customer_id, name, city) = covering index — answers query entirely.',
            },
            {
              name: 'Hash Index', color: '#facc15',
              desc: 'Uses a hash function to map keys to bucket locations. Blazing fast for equality lookups (=). Completely useless for range queries (BETWEEN, >, <).',
              detail: 'Used internally in databases for hash joins and hash-based partitioning. PostgreSQL supports explicit hash indexes. MySQL InnoDB does not.',
              example: 'WHERE session_id = \'abc123\' — perfect for hash index. WHERE age > 25 — useless for hash index.',
            },
          ].map((item) => (
            <div key={item.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '20px 24px' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>{item.name}</div>
              <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>{item.desc}</p>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>{item.detail}</p>
              <div style={{ fontSize: 12, color: item.color, fontFamily: 'var(--font-mono)', background: `${item.color}0d`, border: `1px solid ${item.color}25`, borderRadius: 6, padding: '8px 12px' }}>{item.example}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHEN NOT TO INDEX ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 16, fontFamily: 'Syne, sans-serif' }}>
          When NOT to Add an Index
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          Indexes have a cost — every INSERT, UPDATE, and DELETE must also update every index
          on that table. More indexes = slower writes. Adding indexes thoughtlessly makes
          write-heavy tables significantly slower.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { title: 'Small tables (fewer than a few thousand rows)', reason: 'Full table scan is faster than index lookup overhead. The optimizer ignores indexes on small tables anyway.' },
            { title: 'Low-cardinality columns', reason: 'A column with only 2 possible values (e.g., gender = M/F) has low selectivity. An index on it reads almost half the table anyway — not worth it.' },
            { title: 'Columns rarely used in WHERE/JOIN', reason: 'If your queries never filter on that column, the index is just dead weight that slows down writes.' },
            { title: 'Write-heavy tables (logs, events, metrics)', reason: 'A table that receives thousands of inserts per second cannot afford the overhead of maintaining 10 indexes. Keep indexes minimal.' },
            { title: 'Columns with frequent bulk updates', reason: 'Bulk UPDATE operations on indexed columns are significantly slower because every changed row must update the index too.' },
          ].map((item) => (
            <div key={item.title} style={{ display: 'flex', gap: 12, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', alignItems: 'flex-start' }}>
              <span style={{ color: '#ff4757', flexShrink: 0, fontSize: 14, marginTop: 2 }}>✕</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4, fontFamily: 'Syne, sans-serif' }}>{item.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>{item.reason}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT THIS LOOKS LIKE AT WORK ── */}
      <section style={{ marginBottom: 60 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>💼 What This Looks Like at Work</div>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>
          The Slow Query at 2am
        </h2>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px' }}>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 20px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.8, marginBottom: 20 }}>
            <div style={{ color: 'var(--muted)' }}>Slack — Backend Alert (2:14 AM)</div>
            <div style={{ color: '#ff4757' }}>"🚨 API p99 latency just hit 8s. Orders page timing out. Users can't see their order history."</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { step: '1. Run EXPLAIN ANALYZE', detail: 'EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = \'C001\'; → Seq Scan on orders (cost=0.00..184732.00 rows=47 width=284) (actual time=7841.234..7841.289 rows=47)', color: '#ff4757' },
              { step: '2. See "Seq Scan" = full table scan', detail: 'The query is reading all 50 million rows to find 47 orders for one customer. No index on customer_id.', color: '#f97316' },
              { step: '3. Add the missing index', detail: 'CREATE INDEX CONCURRENTLY idx_orders_customer ON orders(customer_id); — CONCURRENTLY means no table lock, safe on live production.', color: 'var(--accent)' },
              { step: '4. Run EXPLAIN ANALYZE again', detail: 'Index Scan using idx_orders_customer on orders (actual time=0.234..0.289 rows=47) — from 7841ms to 0.289ms. Problem solved.', color: 'var(--accent)' },
            ].map((item) => (
              <div key={item.step} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', background: `${item.color}15`, border: `1px solid ${item.color}30`, borderRadius: 5, padding: '3px 8px', flexShrink: 0, whiteSpace: 'nowrap' }}>{item.step}</span>
                <span style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>{item.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KeyTakeaways items={[
        'Without an index, the database reads every row (full table scan). With a B+ tree index, it reads O(log n) nodes — the difference between 8 seconds and 2ms at scale.',
        'B+ tree indexes have leaf nodes linked in a list — this is why range queries (BETWEEN, >, <) are fast. Internal nodes store only keys for navigation.',
        'Clustered index: table data is physically sorted by this key — one per table. Non-clustered index: separate structure with pointers — many allowed per table.',
        'Composite index: column ORDER matters. (city, age) index helps queries on city alone or city+age. It does NOT help queries on age alone.',
        'Covering index: all needed columns are in the index — zero table reads required. The fastest possible query design.',
        'Never index low-cardinality columns, small tables, or columns on write-heavy tables. Each index slows down INSERT/UPDATE/DELETE.',
      ]} />
    </LearnLayout>
  )
}