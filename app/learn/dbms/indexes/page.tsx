import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Indexes in Databases — Complete Guide | DBMS | Chaduvuko',
  description:
    'How database indexes work from first principles — B+ trees, hash indexes, clustered vs non-clustered, covering indexes, composite indexes, when NOT to index, EXPLAIN plans, and real query optimization examples from production systems.',
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

export default function Indexes() {
  return (
    <LearnLayout
      title="Indexes"
      description="Why queries slow down at scale, how indexes fix them, and the data structures powering every fast database lookup — explained from scratch."
      section="DBMS"
      readTime="75–90 min"
      updatedAt="March 2026"
    >

      {/* ========================================
          PART 1 — WHY INDEXES EXIST
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 01 — The Problem" />
        <SectionTitle>Why Queries Slow Down — And What Indexes Do About It</SectionTitle>

        <Para>
          Imagine a physical library with one million books, completely unsorted.
          No catalogue, no shelves organised by topic, no numbering system.
          Just books piled randomly across thousands of shelves.
          Someone walks in and asks: "Do you have a book called Database System Concepts by Silberschatz?"
          The only way to find it is to walk through every single shelf and read
          every single book title until you either find it or exhaust every possibility.
          In the worst case — the book isn't there — you checked one million books for nothing.
        </Para>

        <Para>
          This is exactly what a database does when you query a table with no index.
          It reads every single row from disk, evaluates your WHERE condition against each one,
          and keeps the matches. This operation is called a
          <strong style={{ color: 'var(--accent)' }}> full table scan</strong> (or sequential scan),
          and at small data volumes it is perfectly acceptable.
          At millions of rows, it becomes the difference between a query taking
          2 milliseconds and 8 seconds.
        </Para>

        <Para>
          Now imagine the library installs a catalogue — a small organised book that tells you
          exactly which shelf and position every book is on, sorted alphabetically by title.
          Finding "Database System Concepts" takes two seconds: open the catalogue, flip to D,
          find the entry, walk directly to shelf 47 row 3. Done. You checked perhaps 20 entries
          in the catalogue instead of one million books on the shelves.
          That catalogue is a <strong style={{ color: 'var(--accent)' }}>database index</strong>.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.3)', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#ff4757', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Without Index — Full Table Scan</div>
            <Para>
              Query: <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>SELECT * FROM orders WHERE customer_id = 'C001'</code>
            </Para>
            <Para>
              On a table with 50 million rows the database reads all 50 million rows,
              evaluates customer_id on each, keeps the matches. One row per disk read
              in the worst case.
            </Para>
            <div style={{ fontSize: 13, color: '#ff4757', fontFamily: 'var(--font-mono)', background: 'rgba(255,71,87,0.06)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '10px 14px' }}>
              Rows read: 50,000,000<br />
              Query time: ~8 seconds<br />
              Disk reads: potentially all data pages
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>With Index on customer_id</div>
            <Para>
              Same query on the same 50 million rows. The database checks the
              B+ tree index — a structure about log₂(50,000,000) ≈ 26 comparisons deep —
              and jumps directly to matching rows.
            </Para>
            <div style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--font-mono)', background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '10px 14px' }}>
              Comparisons: ~26 tree nodes<br />
              Query time: ~2 milliseconds<br />
              Disk reads: 3–4 pages maximum
            </div>
          </div>
        </div>

        <Para>
          That is not a small difference. It is a 4000× speedup for one missing index on one query.
          At Swiggy's scale — tens of millions of orders, queries running thousands of times per
          second — a missing index can bring down an entire service. Adding the right index can
          fix a production incident in under a minute. This is why indexes are one of the
          most practically important topics in all of database engineering.
        </Para>

        <SubTitle>What an Index Actually Is</SubTitle>

        <Para>
          An index is a separate data structure stored alongside the table, maintained
          automatically by the DBMS. It contains a sorted copy of the values in the
          indexed column(s), along with pointers to the actual row locations on disk.
          When you query using an indexed column, the database uses the index to find
          the right disk location directly — without reading unrelated rows at all.
        </Para>

        <Para>
          The key properties of an index: it speeds up reads dramatically, it costs
          storage space (an index can be as large as the table itself for wide tables),
          and it slows down writes slightly (every INSERT, UPDATE, and DELETE must also
          update every index on that table). This trade-off — faster reads, slower writes,
          more storage — is the central tension of index design.
        </Para>

        <CodeBox label="Creating and dropping indexes in SQL">
{`-- CREATE an index (the most common operation)
CREATE INDEX idx_orders_customer ON orders(customer_id);
-- Index name convention: idx_{table}_{column(s)}
-- This creates a B+ tree index by default in PostgreSQL and MySQL

-- CREATE a UNIQUE index (also enforces uniqueness constraint)
CREATE UNIQUE INDEX idx_customers_email ON customers(email);
-- Equivalent to: ALTER TABLE customers ADD CONSTRAINT UNIQUE(email)

-- CREATE INDEX CONCURRENTLY (PostgreSQL — safe on live production tables)
CREATE INDEX CONCURRENTLY idx_orders_date ON orders(order_date);
-- Without CONCURRENTLY: locks the table during index creation (dangerous in production)
-- With CONCURRENTLY: builds the index without any table lock (takes longer but safe)

-- DROP an index
DROP INDEX idx_orders_customer;

-- View indexes on a table (PostgreSQL)
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'orders';

-- View indexes on a table (MySQL)
SHOW INDEX FROM orders;`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 2 — HOW DATA IS STORED ON DISK
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 02 — Physical Storage" />
        <SectionTitle>How Databases Store Data on Disk — Pages, Blocks, and Heap Files</SectionTitle>

        <Para>
          To understand why indexes work the way they do, you need to understand
          how databases physically store data. This is the layer that index structures
          are specifically designed to navigate efficiently.
        </Para>

        <SubTitle>Pages — The Fundamental Unit of Disk Storage</SubTitle>

        <Para>
          Databases never read or write individual rows to disk. They operate in fixed-size
          units called <strong style={{ color: 'var(--accent)' }}>pages</strong> (also called
          blocks). A page is typically 8KB in PostgreSQL (configurable), 16KB in MySQL InnoDB.
          Every read from disk retrieves at least one full page. Every write writes at least one
          full page.
        </Para>

        <Para>
          A single page contains many rows. For a typical orders table where each row is
          about 200 bytes, an 8KB page holds roughly 40 rows. This means reading one order
          from disk also reads the 39 rows stored near it on the same page — whether you
          wanted those rows or not. This is why sequential scans are expensive: they read
          every page in the table, even if only a fraction of rows on each page match your query.
        </Para>

        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 20, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2 }}>
          <div style={{ color: 'var(--muted)', marginBottom: 6 }}>// Physical layout of a table on disk (heap file)</div>
          <div><span style={{ color: 'var(--accent)' }}>Page 1</span> <span style={{ color: 'var(--text2)' }}>[Row 1][Row 2][Row 3]...[Row 40]</span></div>
          <div><span style={{ color: 'var(--accent)' }}>Page 2</span> <span style={{ color: 'var(--text2)' }}>[Row 41][Row 42]...[Row 80]</span></div>
          <div><span style={{ color: 'var(--accent)' }}>Page 3</span> <span style={{ color: 'var(--text2)' }}>[Row 81]...[Row 120]</span></div>
          <div style={{ color: 'var(--muted)' }}>... (thousands more pages)</div>
          <div style={{ color: 'var(--muted)', marginTop: 8 }}>
            // Full scan: read ALL pages sequentially — every page hits disk<br />
            // Index scan: follow index pointer → read EXACTLY the target page(s)
          </div>
        </div>

        <SubTitle>Heap Files — Unordered Row Storage</SubTitle>

        <Para>
          By default, database tables store rows in a
          <strong style={{ color: 'var(--accent)' }}> heap file</strong> — an unordered collection
          of pages where rows are inserted wherever space is available.
          There is no particular order to the rows. A row inserted today might be on page 1.
          The next row might go to page 847 because that is where the last available space was.
          Heap files make inserts fast (just find free space and write) but make targeted lookups
          slow (no structure to navigate to a specific row without an index).
        </Para>

        <Para>
          This is why a new table with no indexes behaves as we described: finding one row
          requires reading the entire heap file page by page. An index is a separately maintained
          structure that provides the navigation shortcut the heap file inherently lacks.
        </Para>

        <SubTitle>The Buffer Pool — How Databases Cache Pages in RAM</SubTitle>

        <Para>
          The database does not read from disk every time it needs a page. It maintains
          a <strong style={{ color: 'var(--accent)' }}>buffer pool</strong> — a cache of
          recently accessed pages kept in RAM. When a query needs a page, the database
          checks the buffer pool first. If the page is there (a cache hit), it uses the
          RAM copy — microseconds. If not (a cache miss), it reads from disk — milliseconds.
        </Para>

        <Para>
          This means query performance depends on the buffer pool hit rate. Frequently
          accessed index pages (especially the upper levels of a B+ tree) stay permanently
          in the buffer pool on a busy system — making index lookups even faster in practice
          than the raw numbers suggest. The root and upper levels of a B+ tree on a production
          system are almost always in RAM.
        </Para>
      </section>

      {/* ========================================
          PART 3 — B+ TREE — THE STANDARD INDEX
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 03 — B+ Tree" />
        <SectionTitle>B+ Tree — The Data Structure Behind Every Standard Index</SectionTitle>

        <Para>
          The vast majority of database indexes use a data structure called the
          <strong style={{ color: 'var(--accent)' }}> B+ tree</strong>. Understanding why
          B+ trees specifically — and not binary search trees, red-black trees, or hash tables —
          requires understanding the constraints of disk-based storage.
        </Para>

        <SubTitle>Why Not Binary Search Trees?</SubTitle>

        <Para>
          A binary search tree (BST) gives O(log₂ n) search time and seems like a natural
          choice for an index. But BSTs have one fatal property for disk-based storage:
          each node has at most 2 children. For a table with 50 million rows, a balanced BST
          has a height of log₂(50,000,000) ≈ 26 levels. Each level potentially requires
          a separate disk read (if the node is not in the buffer pool).
          26 disk reads × ~5 milliseconds per disk read = 130 milliseconds per query.
          At 10,000 queries per second, this is unacceptable.
        </Para>

        <Para>
          The solution: make each node much wider. Instead of 2 children, allow thousands
          of children per node. This dramatically reduces the height of the tree.
          A B+ tree node with 1000 children on 50 million rows has height
          log₁₀₀₀(50,000,000) ≈ 3 levels. Three disk reads instead of 26.
          This is the core design insight of B+ trees.
        </Para>

        <SubTitle>B+ Tree Structure — Internal Nodes and Leaf Nodes</SubTitle>

        <Para>
          A B+ tree has two types of nodes with different purposes:
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #0078d4', borderRadius: 10, padding: '18px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0078d4', marginBottom: 10 }}>Internal Nodes (Non-Leaf)</div>
            <Para>
              Store only <strong style={{ color: 'var(--text)' }}>keys</strong> — the indexed values.
              No pointers to actual table rows. Their only purpose is navigation:
              given a search key, which child node should we follow next?
              Internal nodes can have hundreds to thousands of children,
              keeping the tree shallow.
            </Para>
            <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#0078d4', background: 'rgba(0,120,212,0.06)', border: '1px solid rgba(0,120,212,0.15)', borderRadius: 6, padding: '8px 12px' }}>
              [10 | 30 | 50 | 70 | 90]<br />
              ↓    ↓    ↓    ↓    ↓    ↓<br />
              (6 child pointers)
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)', borderRadius: 10, padding: '18px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 10 }}>Leaf Nodes</div>
            <Para>
              Store the actual <strong style={{ color: 'var(--text)' }}>key values AND pointers</strong>
              to the corresponding rows in the heap file (or the actual row data for clustered indexes).
              This is where every search ultimately terminates.
              All leaf nodes are linked together in a doubly-linked list.
            </Para>
            <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent)', background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.15)', borderRadius: 6, padding: '8px 12px' }}>
              [10→row][20→row][25→row] ↔<br />
              [30→row][35→row][40→row] ↔<br />
              [50→row][55→row][60→row]
            </div>
          </div>
        </div>

        <SubTitle>The Critical Property — All Leaf Nodes Are Linked</SubTitle>

        <Para>
          The defining feature that makes B+ trees superior to B-trees for databases:
          all leaf nodes are connected in a <strong style={{ color: 'var(--accent)' }}>doubly-linked list</strong>
          from left to right. After finding the first matching key using the tree traversal,
          you can follow the linked list forward to retrieve all subsequent matching keys
          in sorted order — without going back up the tree.
        </Para>

        <Para>
          This is what makes range queries (<code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>WHERE age BETWEEN 25 AND 35</code>,
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> WHERE order_date {'>'} '2024-01-01'</code>) fast.
          Find the first matching leaf node using tree traversal, then walk the linked list
          collecting all subsequent matches until the range condition is no longer satisfied.
          No re-traversal of the tree needed for each match.
        </Para>

        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '22px 26px', marginBottom: 24, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2, overflowX: 'auto' }}>
          <div style={{ color: 'var(--muted)', marginBottom: 8 }}>// B+ Tree structure — orders indexed on customer_id</div>
          <div style={{ color: 'var(--muted)', marginBottom: 4 }}>// Internal nodes: navigation only (keys)</div>
          <div style={{ paddingLeft: 0 }}><span style={{ color: '#0078d4' }}>Root:         </span><span style={{ color: 'var(--text2)' }}>[C030 | C060 | C090]</span></div>
          <div style={{ paddingLeft: 0 }}><span style={{ color: '#0078d4' }}>Level 2:      </span><span style={{ color: 'var(--text2)' }}>[C010|C020|C030] [C040|C050|C060] [C070|C080|C090] [C100|C110]</span></div>
          <div style={{ color: 'var(--muted)', marginTop: 4, marginBottom: 4 }}>// Leaf nodes: data + pointers + linked list</div>
          <div><span style={{ color: 'var(--accent)' }}>Leaves: </span><span style={{ color: 'var(--text2)' }}>[C001→pg3][C002→pg7][C003→pg1] ↔ [C004→pg12]... ↔ [C110→pg445]</span></div>
          <div style={{ color: 'var(--muted)', marginTop: 8 }}>
            // Query: WHERE customer_id BETWEEN 'C040' AND 'C060'<br />
            // Step 1: Traverse root→level2→leaf containing C040 (3 reads)<br />
            // Step 2: Walk linked list forward: C040, C041, C042... until C060<br />
            // Total disk reads: 3 (tree) + N (matching leaf pages) — not all pages
          </div>
        </div>

        <SubTitle>B+ Tree Search — Step by Step</SubTitle>

        <CodeBox label="B+ Tree search algorithm — how every indexed lookup works">
{`// QUERY: SELECT * FROM orders WHERE customer_id = 'C042'
// B+ tree index exists on customer_id

// STEP 1: Read the ROOT node (almost always in buffer pool — cached in RAM)
// Root contains: [C030 | C060 | C090]
// C042 > C030 AND C042 < C060 → follow pointer to SECOND child

// STEP 2: Read the INTERNAL NODE at level 2 (may be cached)
// Node contains: [C040 | C050 | C060]
// C042 > C040 AND C042 < C050 → follow pointer to FIRST child of this node

// STEP 3: Read the LEAF NODE
// Leaf contains: [C040→page12, C041→page18, C042→page7, C043→page22, C044→page9]
// C042 found! Pointer says: the row is on page 7

// STEP 4: Read DATA PAGE 7 from the heap file
// Retrieve the actual row data for customer C042

// TOTAL DISK READS: 4 (root + level2 + leaf + data page)
// For 50 million rows with branching factor 1000: 3 levels + 1 = 4 reads
// Compare: full table scan would read every page of the heap file
//          For 50M rows at 40 rows/page: 1,250,000 page reads

// RANGE QUERY: WHERE customer_id BETWEEN 'C040' AND 'C060'
// Step 1-3: same as above — navigate to leaf containing C040
// Step 4: read all matching rows from data pages for C040, C041... C060
// Step 5: follow leaf linked list forward to C041's leaf page (if different page)
// Continue until C060 is passed
// TOTAL: 3 tree reads + (number of matching leaf pages) + (number of matching data pages)
// Still dramatically fewer reads than full scan`}
        </CodeBox>

        <SubTitle>B+ Tree Insertion — How the Tree Grows</SubTitle>

        <Para>
          Insertions are what make indexes cost something. Every time a row is inserted
          into the table, the database must also insert the new key into every index on that table.
          B+ tree insertion works as follows: navigate to the correct leaf node,
          insert the key in sorted position. If the leaf node is full (has reached
          maximum capacity), split it into two nodes and push the middle key up to
          the parent internal node. If the parent is also full, split it too.
          This splitting can cascade all the way to the root — when the root splits,
          a new root is created and the tree grows one level taller.
        </Para>

        <CodeBox label="B+ Tree insertion — tracing a split">
{`// ORDER: INSERT INTO orders VALUES ('C042', ...) — index on customer_id

// Before insertion — leaf node is full (max 4 keys in this example):
// Leaf: [C040 | C041 | C043 | C044]

// Insert C042 in sorted position → overflow:
// [C040 | C041 | C042 | C043 | C044] → exceeds capacity

// SPLIT: divide into two leaf nodes
// Left leaf:  [C040 | C041 | C042]
// Right leaf: [C043 | C044]
// Push middle key (C042) up to parent internal node

// Parent internal node before: [C030 | C060]
// After push-up: [C030 | C042 | C060] — with new pointer to right leaf
// Parent not full → no further splitting needed

// INSERT COST: O(log_B n) comparisons + potentially O(log_B n) page writes
// B = branching factor (typically 100-1000)
// At 50M rows: ~3 page reads + potentially 3 page writes for splits (rare)
// Most insertions do NOT cause splits — leaf nodes are often half-empty`}
        </CodeBox>

        <SubTitle>B+ Tree Deletion</SubTitle>

        <Para>
          Deletion is the inverse of insertion. Navigate to the leaf node containing the key
          and remove it. If the leaf node falls below the minimum occupancy threshold
          (typically 50%), either borrow a key from a sibling node (redistribution)
          or merge with a sibling (underflow merge). Merging can cascade up the tree similarly
          to how splits cascade during insertion. In practice, databases often leave slightly
          underfull pages without immediate merging — merging is triggered periodically
          by maintenance operations (VACUUM in PostgreSQL).
        </Para>
      </section>

      {/* ========================================
          PART 4 — TYPES OF INDEXES
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 04 — Index Types" />
        <SectionTitle>Every Index Type — What It Is, When to Use It, When to Avoid It</SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* CLUSTERED INDEX */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#0078d4' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)' }}>Clustered Index</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#0078d4', background: 'rgba(0,120,212,0.1)', border: '1px solid rgba(0,120,212,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>One per table</span>
              </div>
              <Para>
                A clustered index changes the physical organisation of the table itself.
                The rows in the table are physically stored on disk in the same sorted order
                as the index keys. This means the data pages of the table ARE the leaf nodes
                of the index — there is no separate heap file; the index and the data are one.
              </Para>
              <Para>
                Because there is only one physical ordering possible, a table can have
                <strong style={{ color: 'var(--accent)' }}> only one clustered index</strong>.
                In MySQL InnoDB, the primary key is automatically the clustered index.
                In PostgreSQL, tables are heap files by default — you create a clustered
                organisation with <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>CLUSTER table USING index</code>,
                though it does not auto-maintain the ordering as data changes.
              </Para>
              <Para>
                <strong style={{ color: 'var(--text)' }}>When it wins:</strong> Range queries on the
                clustered key are extremely fast because matching rows are physically adjacent
                on disk — reading one page retrieves many consecutive matches without jumping
                around the disk. Querying by primary key (the default clustered index) is
                always the fastest possible lookup.
              </Para>
              <Para>
                <strong style={{ color: 'var(--text)' }}>The trade-off:</strong> INSERT operations
                that don't follow the clustered order cause page splits (the new row must be
                inserted in sorted position, potentially splitting existing pages).
                For tables with very high random insert rates, a sequential surrogate key
                (SERIAL/AUTO_INCREMENT) is preferred over a natural key — it always inserts
                at the end and avoids page splitting entirely.
              </Para>
              <CodeBox label="Clustered index — MySQL InnoDB (automatic) vs PostgreSQL">
{`-- MySQL InnoDB: PRIMARY KEY is always the clustered index
CREATE TABLE orders (
    order_id    INT PRIMARY KEY AUTO_INCREMENT,  -- clustered index automatically
    customer_id INT NOT NULL,
    order_date  DATETIME,
    total       DECIMAL(10,2)
);
-- Rows on disk: sorted by order_id (sequential integers = perfect clustering)

-- PostgreSQL: CLUSTER command (one-time reorganisation, not auto-maintained)
CREATE TABLE orders (order_id SERIAL PRIMARY KEY, ...);
CREATE INDEX idx_orders_date ON orders(order_date);
CLUSTER orders USING idx_orders_date;
-- Physically reorders table rows by order_date RIGHT NOW
-- Future inserts are NOT automatically in sorted order
-- Must run CLUSTER again periodically to maintain physical ordering

-- CHECKING: which columns benefit from clustered access?
-- Columns used in ORDER BY + LIMIT (pagination)
-- Columns used in range queries: BETWEEN, >, 
-- Primary key columns (always)`}
              </CodeBox>
            </div>
          </div>

          {/* NON-CLUSTERED INDEX */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: 'var(--accent)' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)' }}>Non-Clustered Index</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Many per table</span>
              </div>
              <Para>
                A non-clustered index is a completely separate data structure from the table.
                The leaf nodes of the index contain the indexed key values and pointers
                (row IDs or primary key values) back to the actual rows in the heap file.
                The table data itself is not reordered — it stays in heap file order.
                Looking up a row requires two steps: find the pointer in the index,
                then follow the pointer to the actual data page.
              </Para>
              <Para>
                A table can have many non-clustered indexes — one for each column or combination
                of columns that is frequently searched. Each additional index costs storage and
                write overhead. The benefit-cost analysis for each index must be justified by
                actual query patterns.
              </Para>
              <CodeBox label="Non-clustered indexes — multiple on one table">
{`-- Table with multiple non-clustered indexes:
CREATE TABLE orders (
    order_id      SERIAL   PRIMARY KEY,     -- clustered (MySQL) or heap (PostgreSQL)
    customer_id   INT      NOT NULL,
    restaurant_id INT      NOT NULL,
    order_date    TIMESTAMP,
    status        VARCHAR(20),
    total_amount  DECIMAL(10,2)
);

-- Non-clustered index on customer_id (most common query: "orders for this customer")
CREATE INDEX idx_orders_customer ON orders(customer_id);

-- Non-clustered index on order_date (range queries: "orders in this month")
CREATE INDEX idx_orders_date ON orders(order_date);

-- Non-clustered index on status (filter: "all pending orders")
CREATE INDEX idx_orders_status ON orders(status);
-- ⚠ BUT: is a status index useful? See "when NOT to index" section below.

-- HOW NON-CLUSTERED LOOKUP WORKS:
-- Query: SELECT * FROM orders WHERE customer_id = 5
-- Step 1: B+ tree traversal in idx_orders_customer → finds leaf nodes for C_id=5
-- Step 2: Leaf node contains pointer: "row is at page 47, slot 3 in heap file"
-- Step 3: Read page 47 of the heap file → retrieve the row
-- Total: ~3 tree reads + 1 data page read per matching row
-- For customers with many orders: each order might be on a DIFFERENT data page
-- This is called "random I/O" — expensive if many rows match`}
              </CodeBox>
            </div>
          </div>

          {/* COMPOSITE INDEX */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#f97316' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)' }}>Composite Index</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#f97316', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Column order is critical</span>
              </div>
              <Para>
                A composite index (also called a multi-column index) covers two or more columns.
                The columns are indexed together as a combined key — the index sorts by the first
                column, then by the second column within each group of equal first-column values,
                then by the third column within that, and so on.
              </Para>
              <Para>
                The most important rule about composite indexes:
                <strong style={{ color: 'var(--accent)' }}> the leftmost prefix rule</strong>.
                A composite index on (A, B, C) can be used to satisfy queries that filter on:
                A alone, (A, B) together, or (A, B, C) together. It CANNOT efficiently satisfy
                queries that filter on B alone, C alone, or (B, C) without A.
                The index can only be traversed starting from the leftmost column.
              </Para>
              <CodeBox label="Composite indexes — leftmost prefix rule with examples">
{`-- Index on (customer_id, order_date)
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);

-- QUERIES THAT USE THIS INDEX:
-- 1. Filter on customer_id alone (uses first column of composite index):
SELECT * FROM orders WHERE customer_id = 5;
-- Uses index: scans all entries where first key = 5

-- 2. Filter on customer_id AND order_date (uses both columns):
SELECT * FROM orders WHERE customer_id = 5 AND order_date >= '2024-01-01';
-- Uses index optimally: navigates to customer_id=5 entries, then filters by date

-- 3. Filter + sort using index (no separate sort step needed):
SELECT * FROM orders WHERE customer_id = 5 ORDER BY order_date;
-- Perfect: results are already sorted by date within customer_id=5

-- QUERIES THAT DO NOT FULLY USE THIS INDEX:
-- 4. Filter on order_date alone:
SELECT * FROM orders WHERE order_date >= '2024-01-01';
-- Cannot use the index efficiently! order_date is the SECOND column.
-- The index sorts by customer_id first — within each customer, dates are sorted,
-- but across ALL customers, dates are not in order.
-- Result: full index scan or table scan depending on selectivity.
-- FIX: create a separate index on just order_date.

-- 5. Filter on order_date with different customer:
SELECT * FROM orders WHERE order_date >= '2024-01-01' AND customer_id = 5;
-- This DOES use the index — the query optimizer recognizes both columns are present
-- and can apply them in index order (customer_id first, then date).

-- COLUMN ORDER DECISION RULE:
-- Put the most selective column FIRST (the one that filters the most rows)
-- Put equality conditions BEFORE range conditions in the index definition
-- CREATE INDEX idx ON table(equality_col, range_col) -- correct ordering
-- CREATE INDEX idx ON table(range_col, equality_col) -- less optimal`}
              </CodeBox>
            </div>
          </div>

          {/* COVERING INDEX */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#8b5cf6' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)' }}>Covering Index</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#8b5cf6', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Zero table reads</span>
              </div>
              <Para>
                A covering index is an index that contains all the columns a query needs —
                so the query can be answered entirely from the index without ever touching
                the actual table rows. This is the fastest possible query execution:
                only index pages are read, and data pages are never touched at all.
              </Para>
              <Para>
                A covering index is not a special index type — it is any index that happens
                to cover a specific query's needs. You design it deliberately by including
                extra columns (beyond the search columns) that the query also needs to retrieve.
                The extra columns are typically included using the INCLUDE syntax
                (PostgreSQL, SQL Server) which adds them to the leaf nodes of the index
                without affecting the sort order.
              </Para>
              <CodeBox label="Covering indexes — designing for zero table access">
{`-- Query we want to optimise (runs millions of times per day):
SELECT order_id, order_date, total_amount
FROM orders
WHERE customer_id = 5
ORDER BY order_date DESC
LIMIT 20;

-- Non-covering index (requires table access):
CREATE INDEX idx_orders_customer ON orders(customer_id);
-- Steps: B+ tree → leaf (has customer_id + row pointer) → follow 20 pointers to data pages
-- = 1 index lookup + up to 20 data page reads

-- COVERING index (no table access needed):
CREATE INDEX idx_orders_customer_covering
ON orders(customer_id, order_date DESC)
INCLUDE (order_id, total_amount);
-- Leaf node now contains: customer_id, order_date, order_id, total_amount
-- Steps: B+ tree → leaf → DONE (all needed columns are IN the leaf node)
-- = 1 index lookup + 0 data page reads
-- Dramatically faster — especially when data pages are not in buffer pool

-- PostgreSQL EXPLAIN output difference:
-- WITHOUT covering: Index Scan using idx_orders_customer (also reads heap)
-- WITH covering:    Index Only Scan using idx_orders_customer_covering
-- "Index Only Scan" = covering index hit — the holy grail of query optimization

-- DESIGN RULE FOR COVERING INDEXES:
-- Index columns: all WHERE and ORDER BY columns (determine sort order)
-- INCLUDE columns: all SELECT columns that are not in WHERE/ORDER BY
-- (INCLUDE columns don't affect index order — they just ride along for free)

-- Example:
CREATE INDEX idx_order_lookup ON orders
    (customer_id, status)        -- WHERE/ORDER BY columns
INCLUDE
    (order_id, total_amount, order_date);  -- SELECT columns`}
              </CodeBox>
            </div>
          </div>

          {/* HASH INDEX */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#facc15' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)' }}>Hash Index</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#facc15', background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Equality only</span>
              </div>
              <Para>
                A hash index uses a hash function to map key values to bucket locations.
                For an exact equality lookup (<code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>WHERE id = 42</code>),
                it computes the hash of the search key, goes directly to the bucket,
                and finds the row. This is theoretically O(1) — no tree traversal needed.
              </Para>
              <Para>
                The fundamental limitation: hash functions destroy ordering information.
                The hash of 30 and the hash of 31 are completely different and have no
                relationship to each other. This makes hash indexes
                <strong style={{ color: '#ff4757' }}> completely useless for range queries</strong>
                (<code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>BETWEEN, {'>'}, {'<'}, ORDER BY</code>).
                You cannot follow "nearby" hashes to find keys with nearby values.
              </Para>
              <CodeBox label="Hash index — when to use and when NOT to use">
{`-- CREATE a hash index (PostgreSQL explicit syntax):
CREATE INDEX idx_sessions_token ON sessions USING HASH(session_token);
-- Perfect: session_token lookups are ALWAYS exact equality (never range)
-- WHERE session_token = 'abc123xyz...' ← hash index excels here

-- MySQL InnoDB: automatically uses hash-based "adaptive hash index" internally
-- You don't create hash indexes explicitly in MySQL — InnoDB manages them

-- USE HASH INDEX FOR:
SELECT * FROM sessions WHERE session_token = 'abc123xyz';   -- exact equality ✓
SELECT * FROM users   WHERE username = 'rahul_sharma';       -- exact equality ✓
SELECT * FROM cache   WHERE cache_key = 'product:P001';      -- exact equality ✓

-- DO NOT USE HASH INDEX FOR:
SELECT * FROM orders WHERE total_amount > 500;               -- range: USELESS
SELECT * FROM orders WHERE total_amount BETWEEN 200 AND 500; -- range: USELESS
SELECT * FROM customers ORDER BY age;                        -- ordering: USELESS
SELECT * FROM orders WHERE order_date LIKE '2024%';          -- pattern: USELESS

-- DECISION RULE: Use B+ tree indexes for almost everything.
-- Hash indexes are a micro-optimisation for columns that are ONLY ever
-- queried with exact equality and never with ranges or ordering.
-- In PostgreSQL, the B+ tree index on equality queries is almost as fast
-- as a hash index due to buffer pool caching of tree root nodes.
-- B+ tree is the safe default. Hash index is a very specific optimisation.`}
              </CodeBox>
            </div>
          </div>

          {/* PARTIAL INDEX */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#e879f9' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)' }}>Partial Index</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#e879f9', background: 'rgba(232,121,249,0.1)', border: '1px solid rgba(232,121,249,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Index a subset of rows</span>
              </div>
              <Para>
                A partial index indexes only the rows that satisfy a specified WHERE condition.
                It is much smaller than a full table index, takes less storage, is faster to scan,
                and has lower write overhead — because only qualifying rows update the index.
              </Para>
              <Para>
                Partial indexes are powerful when you repeatedly query a specific subset of the table
                that is far smaller than the whole — for example, only active orders, only unread
                notifications, only pending payments.
              </Para>
              <CodeBox label="Partial indexes — small, fast, targeted">
{`-- SCENARIO: 10 million orders. 99% are 'delivered'. Only 1% are 'pending'.
-- You only ever query pending orders in the operations dashboard.

-- Full index on status (wasteful):
CREATE INDEX idx_orders_status_full ON orders(status);
-- Index contains 10 million entries — 99% are 'delivered' which you never query this way

-- Partial index (only pending orders):
CREATE INDEX idx_orders_pending ON orders(order_id)
WHERE status = 'pending';
-- Index contains only 100,000 entries — 100x smaller, 100x faster to scan

-- Query that uses the partial index:
SELECT * FROM orders WHERE status = 'pending';
-- Optimizer sees the partial index covers exactly this query → uses it

-- More examples:
-- Index only active users (most users are inactive):
CREATE INDEX idx_users_active_email ON users(email)
WHERE is_active = true;

-- Index only large orders (most orders are small):
CREATE INDEX idx_large_orders ON orders(customer_id, total_amount)
WHERE total_amount > 1000;

-- Index only unprocessed events:
CREATE INDEX idx_events_unprocessed ON events(created_at)
WHERE processed_at IS NULL;

-- BENEFIT CALCULATION:
-- Table: 10M rows, 50KB per index entry
-- Full index: 500MB storage, updated on EVERY insert/update
-- Partial index (1% of rows): 5MB storage, updated only when pending rows change
-- For high-write systems: partial indexes can be 10-100x more efficient`}
              </CodeBox>
            </div>
          </div>

          {/* EXPRESSION / FUNCTIONAL INDEX */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#0078d4' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', marginBottom: 14 }}>Expression (Functional) Index</div>
              <Para>
                A functional index indexes the result of an expression or function applied
                to a column, not the raw column value itself. When a query applies the same
                function in its WHERE clause, the database can use the functional index
                instead of computing the function on every row.
              </Para>
              <CodeBox label="Functional indexes — indexing computed values">
{`-- PROBLEM: case-insensitive email search
-- Query: WHERE LOWER(email) = 'rahul@example.com'
-- Without functional index: LOWER() is computed on every row — cannot use regular index
SELECT * FROM users WHERE LOWER(email) = 'rahul@example.com';

-- SOLUTION: Index on LOWER(email)
CREATE INDEX idx_users_email_lower ON users(LOWER(email));
-- Now: WHERE LOWER(email) = 'rahul@example.com' uses the index ✓

-- Another example: date part extraction
-- Query: find all orders from 2024
-- Without functional index: full scan computing EXTRACT on every row
SELECT * FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2024;

-- With functional index:
CREATE INDEX idx_orders_year ON orders(EXTRACT(YEAR FROM order_date));
-- Much better: still better to use range: WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31'

-- JSON field indexing (PostgreSQL):
-- Index a specific field inside a JSONB column
CREATE INDEX idx_metadata_city ON customers((metadata->>'city'));
-- Query: WHERE metadata->>'city' = 'Bengaluru' now uses the index`}
              </CodeBox>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          PART 5 — WHEN NOT TO INDEX
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 05 — When NOT to Index" />
        <SectionTitle>When NOT to Add an Index — The Cases That Hurt More Than They Help</SectionTitle>

        <Para>
          Every index has a cost. Storage space for the index structure itself.
          CPU and disk writes to maintain the index on every INSERT, UPDATE, and DELETE.
          Buffer pool space competing with actual data pages.
          More index options for the query optimiser to evaluate.
          Adding indexes blindly — indexing every column "just in case" — is a common
          mistake that makes write-heavy systems significantly slower without meaningful
          read improvement.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
          {[
            {
              title: 'Small tables (fewer than ~10,000 rows)',
              color: '#ff4757',
              desc: 'For small tables, a full table scan reads only a handful of pages and completes in microseconds. The overhead of maintaining and traversing an index exceeds the benefit of avoiding a sequential scan. The query optimiser will likely ignore your index and do a sequential scan anyway — it can calculate which approach is cheaper.',
              example: 'A lookup table of 50 countries or a settings table with 20 rows — no index needed, ever.',
            },
            {
              title: 'Low-cardinality columns (few distinct values)',
              color: '#f97316',
              desc: 'Cardinality is the number of distinct values in a column. A column with only 2 distinct values (is_active: true/false) has very low cardinality. An index on a low-cardinality column is often useless because the index lookup returns half the table — at that point a sequential scan is equally fast and avoids the two-step lookup overhead.',
              example: 'Index on gender (M/F/Other) or status (active/inactive) — the optimizer will typically ignore these. Exception: partial indexes that target only one value of the low-cardinality column.',
            },
            {
              title: 'Write-heavy tables with infrequent reads',
              color: '#facc15',
              desc: 'Tables that receive thousands of inserts per second (event logs, clickstreams, sensor data, audit trails) pay the index maintenance cost on every write. If these tables are rarely queried interactively, the performance cost of maintaining indexes far exceeds the benefit of faster occasional reads.',
              example: 'An application event log receiving 50,000 events/second. Each event insert must update every index. With 5 indexes, that\'s 250,000 index write operations per second. For a table only queried once per day for reporting, this cost is not justified.',
            },
            {
              title: 'Columns never used in WHERE, JOIN, or ORDER BY',
              color: '#8b5cf6',
              desc: 'An index is only useful when it matches a query\'s access pattern. Indexing a column that is only ever selected (in the SELECT list) but never used to filter or sort provides zero query performance benefit while adding full write overhead.',
              example: 'Adding an index on a "description" TEXT column that is only ever displayed, never filtered on. The index is dead weight.',
            },
            {
              title: 'After bulk loads and batch operations',
              color: '#0078d4',
              desc: 'When loading large amounts of data into a table, it is faster to drop all non-essential indexes before the load, perform the bulk insert, then recreate the indexes afterward. Maintaining indexes during a bulk load of 10 million rows is dramatically slower than rebuilding them once after the load completes.',
              example: 'ETL pipeline loading 100M rows: DROP INDEX → bulk COPY/INSERT → CREATE INDEX. Typically 5-10x faster than loading with indexes active.',
            },
          ].map((item) => (
            <div key={item.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '18px 22px' }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <span style={{ color: '#ff4757', fontWeight: 700, flexShrink: 0 }}>✕</span>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{item.title}</div>
              </div>
              <Para>{item.desc}</Para>
              <div style={{ fontSize: 13, color: item.color, fontFamily: 'var(--font-mono)', background: `${item.color}0e`, border: `1px solid ${item.color}25`, borderRadius: 6, padding: '8px 12px', lineHeight: 1.7 }}>
                → {item.example}
              </div>
            </div>
          ))}
        </div>

        <Callout type="tip">
          <strong>The correct indexing process:</strong> Start with no indexes (except the primary key).
          Identify slow queries in production using query logs and monitoring tools.
          Add indexes one at a time for specific slow queries. Measure before and after.
          Remove indexes that are never used (PostgreSQL tracks index usage in pg_stat_user_indexes).
          An unused index is pure overhead — it slows down writes without helping any read.
        </Callout>
      </section>

      {/* ========================================
          PART 6 — READING QUERY PLANS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 06 — Reading Query Plans" />
        <SectionTitle>EXPLAIN and EXPLAIN ANALYZE — Reading the Database's Execution Plan</SectionTitle>

        <Para>
          The EXPLAIN command shows you how the database plans to execute a query —
          which indexes it will use, which join algorithms it chooses, how many rows
          it estimates at each step. EXPLAIN ANALYZE actually executes the query and
          shows both the plan AND the actual measured runtime statistics. This is
          the primary diagnostic tool for query performance.
        </Para>

        <SubTitle>Key Scan Types — What They Mean</SubTitle>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 12, marginBottom: 24 }}>
          {[
            { scan: 'Seq Scan', color: '#ff4757', meaning: 'Sequential (full table) scan. Reads every row. Expected for small tables or when no useful index exists. On large tables with a selective WHERE clause: a problem.', good: false },
            { scan: 'Index Scan', color: '#f97316', meaning: 'Uses an index to find rows, then fetches the actual row data from the heap (two-step). Good for selective queries returning a small fraction of the table.', good: true },
            { scan: 'Index Only Scan', color: 'var(--accent)', meaning: 'Uses a covering index — all needed columns are in the index. Never touches the heap file. The fastest possible access pattern.', good: true },
            { scan: 'Bitmap Index Scan', color: '#0078d4', meaning: 'Builds a bitmap of matching row locations from the index, then fetches all matching heap pages in physical order. Efficient for queries matching many rows via multiple indexes.', good: true },
          ].map((item) => (
            <div key={item.scan} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderTop: `3px solid ${item.color}`, borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800, color: item.color, marginBottom: 8 }}>{item.scan}</div>
              <Para>{item.meaning}</Para>
            </div>
          ))}
        </div>

        <CodeBox label="EXPLAIN ANALYZE — reading the output and diagnosing problems">
{`-- Run EXPLAIN ANALYZE on a slow query
EXPLAIN ANALYZE
SELECT o.order_id, c.name, o.total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.status = 'pending'
  AND o.total_amount > 500;

-- EXAMPLE OUTPUT:
-- Hash Join  (cost=1500.00..8400.00 rows=450 width=64)
--             (actual time=45.123..156.789 rows=423 loops=1)
--   Hash Cond: (o.customer_id = c.customer_id)
--   ->  Seq Scan on orders o
--         (cost=0.00..6500.00 rows=850 width=40)
--         (actual time=0.025..145.234 rows=847 loops=1)
--         Filter: ((status = 'pending') AND (total_amount > 500))
--         Rows Removed by Filter: 9153153
--   ->  Hash  (cost=600.00..600.00 rows=72000 width=28)
--         (actual time=32.456..32.456 rows=72000 loops=1)
--       ->  Seq Scan on customers c
--             (cost=0.00..600.00 rows=72000 width=28)
--             (actual time=0.012..18.234 rows=72000 loops=1)
-- Planning Time: 2.345 ms
-- Execution Time: 157.123 ms

-- READING THE OUTPUT:
-- "Seq Scan on orders" → full table scan on 10M row table → PROBLEM
-- "Rows Removed by Filter: 9153153" → reading 10M rows to find 847 → 99.99% waste
-- "Execution Time: 157ms" → acceptable? not for a user-facing API endpoint

-- DIAGNOSIS:
-- The Seq Scan on orders is the bottleneck
-- WHERE clause: status = 'pending' AND total_amount > 500
-- FIX: Add a partial index on pending orders with total_amount

CREATE INDEX idx_orders_pending_large
ON orders(total_amount)
WHERE status = 'pending';

-- AFTER INDEX:
-- Index Scan using idx_orders_pending_large on orders
--   (actual time=0.123..2.456 rows=847 loops=1)
--   Index Cond: (total_amount > 500)
-- Execution Time: 4.567 ms
-- 35x improvement from adding one targeted index

-- KEY NUMBERS TO LOOK FOR IN EXPLAIN ANALYZE:
-- "Rows Removed by Filter" large → index could help filter earlier
-- "actual rows" >> "estimated rows" → statistics are stale → run ANALYZE
-- "actual time" large for a node → that node is the bottleneck
-- "loops" > 1 → this node runs multiple times (e.g., inner side of nested loop join)
-- cost=X..Y → X=startup cost (first row), Y=total cost (all rows)`}
        </CodeBox>

        <SubTitle>Common Query Optimisation Patterns</SubTitle>

        <CodeBox label="Practical optimisation — the patterns that matter most">
{`-- PATTERN 1: Leading wildcard LIKE cannot use B+ tree index
-- SLOW: leading % forces full scan
SELECT * FROM customers WHERE name LIKE '%Sharma%';
-- The B+ tree is sorted by name — we don't know where names containing "Sharma" start

-- BETTER: trailing wildcard CAN use index (scans from prefix)
SELECT * FROM customers WHERE name LIKE 'Sharma%';
-- Uses index: starts at "Sharma" in sorted order, reads forward

-- BEST for arbitrary substring search: Full-Text Search
CREATE INDEX idx_customers_name_fts ON customers USING GIN(to_tsvector('english', name));
SELECT * FROM customers WHERE to_tsvector('english', name) @@ to_tsquery('Sharma');

-- PATTERN 2: Function on indexed column disables the index
-- SLOW: applying function to column prevents index use
SELECT * FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2024;
-- Function applied to order_date → cannot use B+ tree index on order_date

-- FAST: use range instead of function
SELECT * FROM orders WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01';
-- Range query → B+ tree index on order_date used efficiently

-- PATTERN 3: Implicit type conversion disables index
-- SLOW: comparing VARCHAR column to integer causes implicit cast
SELECT * FROM customers WHERE customer_id = 42;  -- customer_id is VARCHAR
-- FAST: match types explicitly
SELECT * FROM customers WHERE customer_id = '42';  -- same type as column

-- PATTERN 4: OR conditions often prevent index use
-- SLOW: OR can force full scan (depends on optimizer sophistication)
SELECT * FROM orders WHERE status = 'pending' OR status = 'confirmed';
-- FAST: use IN (optimizer handles better)
SELECT * FROM orders WHERE status IN ('pending', 'confirmed');
-- OR BEST: UNION ALL if each condition benefits from different index
SELECT * FROM orders WHERE status = 'pending'
UNION ALL
SELECT * FROM orders WHERE status = 'confirmed';

-- PATTERN 5: ORDER BY + LIMIT uses index efficiently
-- If index matches ORDER BY column, no separate sort step is needed
CREATE INDEX idx_orders_date ON orders(order_date DESC);
-- This query is extremely fast:
SELECT * FROM orders ORDER BY order_date DESC LIMIT 20;
-- Uses index scan directly — no sort, reads exactly 20 leaf pages`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 7 — INDEX MAINTENANCE
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 07 — Maintenance" />
        <SectionTitle>Index Maintenance — Bloat, Fragmentation, and Keeping Indexes Healthy</SectionTitle>

        <Para>
          Indexes degrade over time. Heavy insert and delete workloads leave
          partially empty pages (fragmentation). Deleted rows leave dead entries
          in index leaf nodes (bloat). Both conditions make the index slower than it should be —
          the database must read more pages to retrieve the same data, and the index
          takes more disk space than necessary. Regular maintenance is required.
        </Para>

        <SubTitle>Index Bloat and Fragmentation</SubTitle>

        <Para>
          When a row is deleted from a table, the corresponding entry in every index is
          marked as dead — but the space is not immediately reclaimed. Over time, especially
          in high-churn tables (many deletes and updates), indexes can become bloated with
          dead entries. The index size grows while the useful data shrinks.
          PostgreSQL's VACUUM process cleans dead tuples, but indexes may still become
          fragmented (many half-empty pages in a non-contiguous layout on disk).
        </Para>

        <CodeBox label="Index maintenance commands — PostgreSQL and MySQL">
{`-- POSTGRESQL: VACUUM cleans dead tuples from tables and indexes
VACUUM orders;             -- clean dead tuples, non-blocking
VACUUM ANALYZE orders;     -- clean + update statistics (optimizer uses statistics)
VACUUM FULL orders;        -- full rewrite, reclaim all space (BLOCKS table — use in maintenance window)

-- Check for index bloat (PostgreSQL):
SELECT
    schemaname,
    tablename,
    indexname,
    pg_size_pretty(pg_relation_size(indexrelid)) AS index_size,
    idx_scan    AS times_used,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY pg_relation_size(indexrelid) DESC;

-- Find unused indexes (indexes never used since last stats reset):
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0
  AND indexname NOT LIKE '%_pkey'  -- exclude primary keys
ORDER BY schemaname, tablename;
-- Consider dropping indexes with idx_scan = 0 — they are pure overhead

-- REINDEX: rebuild an index from scratch (removes bloat, fixes fragmentation)
REINDEX INDEX idx_orders_customer;       -- specific index
REINDEX TABLE orders;                     -- all indexes on table
REINDEX INDEX CONCURRENTLY idx_orders_customer;  -- non-blocking (PostgreSQL 12+)

-- MYSQL: ANALYZE TABLE updates statistics
ANALYZE TABLE orders;

-- MYSQL: OPTIMIZE TABLE rebuilds table and indexes (equivalent to VACUUM FULL + REINDEX)
OPTIMIZE TABLE orders;  -- ⚠ locks table during operation — use in maintenance window

-- Statistics matter: the query optimizer uses row count estimates and
-- value distributions to choose execution plans. Stale statistics cause
-- the optimizer to make wrong decisions (wrong join order, wrong index).
-- Run ANALYZE regularly on frequently updated tables.`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 8 — WHAT THIS LOOKS LIKE AT WORK
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 08 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>💼 What This Looks Like at Work</div>
        <SectionTitle>The 3am Alert — Diagnosing and Fixing a Missing Index in Production</SectionTitle>

        <Para>
          This is the most realistic production scenario involving indexes.
          It happens at every company that operates at scale.
          Understanding this sequence — alert, diagnosis, fix — is what
          makes you a valuable engineer.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#ff4757', background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Production Incident — Swiggy Order History API
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              {
                time: '2:47 AM',
                event: 'PagerDuty alert fires',
                detail: 'API p99 latency for /orders/history endpoint crossed 5000ms. SLA is 200ms. 3,847 users currently experiencing timeout errors.',
                color: '#ff4757',
              },
              {
                time: '2:49 AM',
                event: 'On-call engineer checks monitoring',
                detail: 'Database CPU at 94%. Connections at 480/500 maximum. Active query count: 2,847. Something is blocking — queries are piling up waiting for locks or disk I/O.',
                color: '#f97316',
              },
              {
                time: '2:51 AM',
                event: 'Check currently running queries',
                detail: `SELECT pid, now() - pg_stat_activity.query_start AS duration, query
FROM pg_stat_activity
WHERE state = 'active' ORDER BY duration DESC LIMIT 10;
Result: 847 copies of the same query running simultaneously, each taking 4-6 seconds.`,
                color: '#facc15',
              },
              {
                time: '2:52 AM',
                event: 'Run EXPLAIN ANALYZE on the slow query',
                detail: `EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = $1 AND status != 'cancelled' ORDER BY order_date DESC LIMIT 20;
Result: Seq Scan on orders (cost=0.00..285432.00 rows=18 width=284) (actual time=4521.234..4521.267 rows=18 loops=1) Rows Removed by Filter: 9999982`,
                color: '#facc15',
              },
              {
                time: '2:53 AM',
                event: 'Root cause identified',
                detail: 'The orders table has 10 million rows. A new feature deployed yesterday added the status != cancelled filter. The existing index is on (customer_id) only — not (customer_id, status). The planner is doing a full scan on customer_id matches then filtering status in memory. With 10K QPS on this endpoint, 10M row scans are destroying the database.',
                color: '#f97316',
              },
              {
                time: '2:54 AM',
                event: 'Apply the fix',
                detail: `CREATE INDEX CONCURRENTLY idx_orders_customer_status ON orders(customer_id, order_date DESC) WHERE status != 'cancelled';
CONCURRENTLY means no table lock — safe to run on live production. Takes about 90 seconds for 10M rows.`,
                color: 'var(--accent)',
              },
              {
                time: '2:56 AM',
                event: 'Index creation completes',
                detail: 'API latency drops from 5000ms to 12ms. Database CPU drops from 94% to 8%. Connection count drops from 480 to 12. PagerDuty alert resolves. Incident duration: 9 minutes.',
                color: 'var(--accent)',
              },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14 }}>
                <div style={{ flexShrink: 0, width: 70, textAlign: 'right' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>{item.time}</span>
                </div>
                <div style={{ borderLeft: `2px solid ${item.color}40`, paddingLeft: 16, flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 6 }}>{item.event}</div>
                  <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, background: 'rgba(0,230,118,0.05)', border: '1px solid rgba(0,230,118,0.15)', borderRadius: 8, padding: '16px 18px' }}>
            <Para>
              <strong style={{ color: 'var(--accent)' }}>The post-mortem lesson:</strong> The new feature
              was deployed without checking its query plan. The WHERE clause changed from
              just customer_id (indexed) to customer_id + status (not fully covered by the index).
              The index strategy should be reviewed in code review for any query that changes
              filter conditions on large tables. One missing index caused a 9-minute production
              incident affecting thousands of users.
            </Para>
          </div>
        </div>
      </section>

      {/* ========================================
          PART 9 — INTERVIEW QUESTIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 09 — Interview Prep" />
        <SectionTitle>Index Interview Questions — With Complete Answers</SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              q: 'What is the difference between a clustered and a non-clustered index?',
              color: '#0078d4',
              a: 'A clustered index determines the physical storage order of rows in the table. The table data pages ARE the leaf nodes of the index — data and index are one structure. A table can have only one clustered index because rows can only be physically sorted one way. A non-clustered index is a separate structure from the table. Its leaf nodes contain the indexed key values and pointers back to the actual rows in the heap file. A table can have many non-clustered indexes. In MySQL InnoDB, the primary key is automatically the clustered index. In PostgreSQL, all tables are heap files by default (non-clustered).',
            },
            {
              q: 'You have an index on (A, B, C). Which of these queries will use the index: WHERE A=1, WHERE B=2, WHERE A=1 AND B=2, WHERE B=2 AND C=3?',
              color: 'var(--accent)',
              a: 'WHERE A=1: YES — uses the index (first column is A, leftmost prefix rule satisfied). WHERE B=2: NO (or very limited) — B is the second column; without filtering on A first, the index cannot be traversed to find all B=2 entries efficiently. WHERE A=1 AND B=2: YES — uses both columns optimally (leftmost prefix A, then narrows by B). WHERE B=2 AND C=3: NO — neither B nor C is the leftmost prefix; without A, the index cannot be used for navigation. The leftmost prefix rule: an index on (A,B,C) efficiently answers queries that filter on A, or (A,B), or (A,B,C) — not B alone, C alone, or (B,C) without A.',
            },
            {
              q: 'When would you use a partial index?',
              color: '#f97316',
              a: 'Use a partial index when queries consistently target a specific subset of table rows that is much smaller than the full table. Classic cases: queries on active records only (WHERE is_active = true), pending/unprocessed items (WHERE status = \'pending\'), recent data (WHERE created_at > \'2024-01-01\'). A partial index on 1% of rows is 100x smaller than a full index, updates 100x less frequently on writes, and scans 100x faster. It is ideal when the indexed subset is highly selective and the queries targeting it are frequent and performance-critical.',
            },
            {
              q: 'Why does LIKE \'%keyword%\' not use a B+ tree index?',
              color: '#8b5cf6',
              a: 'A B+ tree index is sorted — it allows efficient lookup by navigating from a known starting point in the sorted order. A leading wildcard (%keyword%) means the search key can start with any character. There is no "starting point" in the sorted tree — every entry could potentially match. The database must scan the entire index (or table) to find matches. This is as slow as a full table scan. Only trailing wildcards (keyword%) can use B+ tree indexes because there IS a known starting point (start at "keyword" in sorted order and scan forward). For arbitrary substring search, use full-text search indexes (GIN with tsvectors in PostgreSQL) which use inverted indexes designed for this purpose.',
            },
            {
              q: 'What is index cardinality and why does it matter?',
              color: '#facc15',
              a: 'Index cardinality refers to the number of distinct values in an indexed column. High cardinality means many distinct values (e.g., customer_id — nearly as many distinct values as rows). Low cardinality means few distinct values (e.g., status with 5 values, is_active with 2 values). Cardinality matters because it determines how selective an index is. A highly selective index (high cardinality) narrows down the result set dramatically — it is worth the lookup overhead. A low-selectivity index (low cardinality) might return 50% of the table — at that point a full table scan is equally fast and avoids the double-lookup overhead. The query optimiser uses cardinality statistics to decide whether to use an index or scan the table directly.',
            },
            {
              q: 'What is a covering index and when should you use it?',
              color: '#e879f9',
              a: 'A covering index is one that contains all columns needed by a specific query — both the columns used in WHERE/ORDER BY conditions and the columns in the SELECT list. When a query is answered entirely from the index without touching the actual table rows, it is called an "Index Only Scan" in PostgreSQL. This is the fastest possible access pattern because: (1) the index is typically much smaller than the table, (2) index pages are more likely to be cached in the buffer pool, (3) there is no second lookup to fetch actual row data. Use covering indexes for high-frequency, performance-critical queries. Design them by putting search columns in the index key and additional needed columns in INCLUDE. The cost is larger index size and more write overhead — justified only for queries with very high frequency.',
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
        'A full table scan reads every page in the table. An index lookup reads only the relevant pages. For a 50-million row table, this is the difference between 1.25 million page reads and 4 page reads — a 4000x difference.',
        'Databases operate in fixed-size pages (8KB in PostgreSQL). Every disk read retrieves at least one full page. Indexes work by reducing the number of pages that need to be read to answer a query.',
        'B+ trees are the standard index structure because they are wide (thousands of children per node), shallow (3-4 levels for billions of rows), and have linked leaf nodes enabling efficient range scans. Binary search trees are too deep for disk-based storage.',
        'The linked leaf node list in a B+ tree is what makes range queries fast. Find the first match via tree traversal, then walk forward through the linked list — no re-traversal needed for each subsequent match.',
        'Clustered index: table rows physically stored in index key order — one per table. Non-clustered index: separate structure with pointers to heap rows — many per table. Clustered is fastest for range queries on the key; non-clustered adds a heap lookup step.',
        'Composite index leftmost prefix rule: index on (A,B,C) efficiently serves queries filtering on A, (A,B), or (A,B,C). It cannot efficiently serve queries filtering on B alone, C alone, or (B,C) without A. Column order in composite indexes is a critical design decision.',
        'Covering index: all columns needed by a query are in the index — enables Index Only Scan with zero table page reads. Design by putting WHERE/ORDER BY columns in the index key and additional SELECT columns in INCLUDE.',
        'Hash indexes are O(1) for equality lookups but completely useless for range queries. B+ tree is the safe default for all index types. Hash indexes are a micro-optimisation only for columns never used in ranges or ordering.',
        'Partial indexes cover only rows satisfying a WHERE condition. A partial index on 1% of rows is 100x smaller, faster, and cheaper to maintain than a full index. Use for queries that consistently target a selective subset.',
        'Do NOT index: small tables (full scan is fast), low-cardinality columns (index returns too many rows), write-heavy tables with rare reads (write overhead exceeds read benefit), columns never used in WHERE/JOIN/ORDER BY. Use EXPLAIN ANALYZE to diagnose and pg_stat_user_indexes to find unused indexes.',
      ]} />

    </LearnLayout>
  )
}