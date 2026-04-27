import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Storage & File Organization — Complete Guide | DBMS | Chaduvuko',
  description:
    'How databases physically store data — storage hierarchy, disk mechanics, pages and blocks, heap files, sorted files, ISAM, slotted page format, buffer pool management, replacement policies, and row vs columnar storage explained from first principles.',
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

export default function StorageFileOrganization() {
  return (
    <LearnLayout
      title="Storage & File Organization"
      description="The physical foundation everything else rests on — how databases talk to disks, how data is laid out in pages, how files are organised for fast access, and how the buffer pool keeps the most useful data in RAM."
      section="DBMS"
      readTime="75–90 min"
      updatedAt="March 2026"
    >

      {/* ========================================
          PART 1 — STORAGE HIERARCHY
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 01 — Storage Hierarchy" />
        <SectionTitle>The Storage Hierarchy — Why Physical Storage Determines Everything</SectionTitle>

        <Para>
          Every design decision in a DBMS — how data is organised on disk, how the buffer
          pool works, why B+ trees have high fan-out, why sequential reads are preferred
          over random reads — traces back to one fundamental constraint: different storage
          media have wildly different performance characteristics, and most database data
          lives on the slowest of them.
        </Para>

        <Para>
          The storage hierarchy orders storage types by speed and capacity.
          The fastest storage (CPU registers, L1 cache) holds bytes at a time
          and operates in nanoseconds. The slowest practical storage (spinning hard
          drives) holds terabytes but operates in milliseconds — a million times slower.
          Understanding this hierarchy is understanding why database engineering
          is fundamentally a problem of minimising slow storage accesses.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 28 }}>
          {[
            {
              level: 'CPU Registers',
              capacity: '~1 KB',
              latency: '< 1 ns',
              bandwidth: '~TB/s',
              color: '#ff4757',
              note: 'Managed by compiler and CPU. DBMS has no direct control.',
              volatile: true,
            },
            {
              level: 'L1 / L2 Cache',
              capacity: '32 KB – 4 MB',
              latency: '1–10 ns',
              bandwidth: '~500 GB/s',
              color: '#f97316',
              note: 'CPU manages automatically. Hot data structures (lock tables, hash maps) benefit from cache locality.',
              volatile: true,
            },
            {
              level: 'L3 Cache',
              capacity: '8–64 MB',
              latency: '10–40 ns',
              bandwidth: '~200 GB/s',
              color: '#facc15',
              note: 'Shared across cores. Buffer pool pages accessed very frequently may reside here.',
              volatile: true,
            },
            {
              level: 'DRAM (Main Memory)',
              capacity: '16 GB – 4 TB',
              latency: '60–100 ns',
              bandwidth: '~50 GB/s',
              color: 'var(--accent)',
              note: 'The Buffer Pool lives here. All active database pages are brought into DRAM before the DBMS can read or modify them.',
              volatile: true,
            },
            {
              level: 'NVMe SSD',
              capacity: '1–8 TB',
              latency: '70–150 µs',
              bandwidth: '3–7 GB/s',
              color: '#0078d4',
              note: 'Modern production databases increasingly use NVMe. Random read latency ≈ 100µs vs DRAM ≈ 100ns — still 1000× slower. Set random_page_cost ≈ 1.1 in PostgreSQL.',
              volatile: false,
            },
            {
              level: 'SATA SSD',
              capacity: '1–4 TB',
              latency: '200–500 µs',
              bandwidth: '0.5–1 GB/s',
              color: '#8b5cf6',
              note: 'Common in cloud VMs. Slower than NVMe but still much faster than spinning disk. Standard for most cloud database deployments.',
              volatile: false,
            },
            {
              level: 'Spinning HDD',
              capacity: '1–20 TB',
              latency: '5–10 ms',
              bandwidth: '100–200 MB/s',
              color: 'var(--muted)',
              note: 'Latency dominated by seek time (moving the read head) + rotational latency. Random access is catastrophically slow. Sequential reads are 50× faster than random reads on the same disk.',
              volatile: false,
            },
            {
              level: 'Network Storage / S3',
              capacity: 'Unlimited',
              latency: '1–100 ms',
              bandwidth: '1–10 GB/s',
              color: 'var(--muted)',
              note: 'Object storage for cold data, backups, data lake. Not suitable for hot OLTP data. Used by data warehouses (Snowflake, BigQuery) for columnar storage files.',
              volatile: false,
            },
          ].map((item, i) => (
            <div key={item.level} style={{
              display: 'flex', gap: 0,
              borderBottom: i < 7 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{
                background: `${item.color}10`,
                borderRight: '1px solid var(--border)',
                padding: '14px 12px', minWidth: 140,
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center', gap: 4,
              }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: item.color, lineHeight: 1.3 }}>{item.level}</span>
                {item.volatile && (
                  <span style={{ fontSize: 9, fontWeight: 700, color: '#ff4757', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.07em' }}>VOLATILE</span>
                )}
              </div>
              <div style={{ padding: '14px 18px', flex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gap: '4px 20px', marginBottom: 6, fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--muted)' }}>Capacity:</span>
                  <span style={{ color: item.color }}>{item.capacity}</span>
                  <span />
                  <span style={{ color: 'var(--muted)' }}>Latency:</span>
                  <span style={{ color: item.color }}>{item.latency}</span>
                  <span style={{ color: 'var(--muted)', fontSize: 11 }}>BW: {item.bandwidth}</span>
                </div>
                <Para>{item.note}</Para>
              </div>
            </div>
          ))}
        </div>

        <SubTitle>The Fundamental Access Pattern Rule</SubTitle>

        <Para>
          The storage hierarchy creates one rule that governs all of database storage design:
          <strong style={{ color: 'var(--accent)' }}> minimise random I/O, maximise sequential I/O</strong>.
          On a spinning disk, reading 1 MB sequentially takes about 10ms.
          Reading 1 MB as 256 random 4KB reads takes about 1.25 seconds — 125× slower.
          On NVMe SSDs, the gap is smaller but still significant (sequential bandwidth
          is 5–10× higher than random access throughput). Every data structure
          and file organisation decision in this module is ultimately about this principle.
        </Para>

        <CodeBox label="The cost gap — sequential vs random I/O in numbers">
{`// SPINNING DISK:
// Sequential read throughput: ~150 MB/s
// Random read latency: ~8ms (seek + rotational delay)
// Random read throughput: 1 read / 8ms = 125 IOPS = ~500 KB/s
// RATIO: sequential is 300× faster for the same data volume

// NVMe SSD:
// Sequential read throughput: ~5,000 MB/s
// Random read latency: ~100µs
// Random read IOPS: ~500,000 = ~2,000 MB/s
// RATIO: sequential is ~2.5× faster

// DRAM (buffer pool):
// Sequential throughput: ~50,000 MB/s
// Random access latency: ~100ns
// Effectively no penalty for random access in DRAM

// IMPLICATION FOR DATABASE DESIGN:
// Full table scan (sequential): read all N pages in order
//   → exploits OS prefetching, disk elevator algorithm, hardware readahead
//   → cost: N × (page_size / sequential_throughput)

// Index scan with many random heap fetches (random):
//   → each page fetch may require a separate disk seek
//   → at some selectivity threshold (~15-20% of table), full scan beats index scan
//   → this is why PostgreSQL's planner sometimes chooses seq scan over index scan

// B+ tree design: high fan-out minimises height, minimises random reads (one per level)
// Bulk loading: fills pages sequentially, exploiting sequential write throughput
// Clustered index: keeps related rows physically adjacent → range scan = sequential read`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 2 — DISK MECHANICS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 02 — Disk Mechanics" />
        <SectionTitle>Disk Mechanics — Why Seek Time Is the Enemy</SectionTitle>

        <Para>
          Understanding spinning disk mechanics explains why every database optimisation
          targets sequential access. Even as SSDs become dominant, the mental model of
          disk mechanics explains buffer pool design, file organisation choices, and
          index structure decisions that remain relevant regardless of storage medium.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 14, marginBottom: 28 }}>
          {[
            {
              component: 'Platters',
              color: '#0078d4',
              desc: 'Circular magnetic disks that spin at 5,400–15,000 RPM. Data is encoded magnetically on concentric circular tracks. Multiple platters share a common spindle.',
            },
            {
              component: 'Read/Write Head',
              color: 'var(--accent)',
              desc: 'Electromagnetic head that floats nanometres above the platter surface. One head per platter surface. All heads move together on a common arm — seeking one track moves all heads simultaneously.',
            },
            {
              component: 'Track',
              color: '#f97316',
              desc: 'A concentric circle on a platter. The outermost track is track 0. Each track is divided into sectors (typically 512 bytes or 4KB per sector). Data is written sector by sector along a track.',
            },
            {
              component: 'Cylinder',
              color: '#8b5cf6',
              desc: 'The set of tracks at the same radial position across all platters and both surfaces. Data on the same cylinder can be accessed without moving the arm — important for sequential multi-platter reads.',
            },
            {
              component: 'Seek Time',
              color: '#ff4757',
              desc: 'Time to move the read/write arm to the correct track. 3–12ms typical. This is the dominant cost of random disk access and the primary reason random I/O is so expensive.',
            },
            {
              component: 'Rotational Latency',
              color: '#facc15',
              desc: 'Time waiting for the desired sector to rotate under the head after the arm has seeked. Average = half a rotation. At 7,200 RPM: 60s/7200 × 0.5 ≈ 4ms average.',
            },
            {
              component: 'Transfer Time',
              color: 'var(--accent)',
              desc: 'Time to actually read/write the data once the head is positioned. Proportional to data size. At 150 MB/s, reading 8KB takes ~0.05ms — tiny compared to seek + rotational latency.',
            },
            {
              component: 'Total Access Time',
              color: '#0078d4',
              desc: 'Seek time + Rotational latency + Transfer time. For a random 8KB read: ~8ms + ~4ms + 0.05ms ≈ 12ms. For sequential: only transfer time after the first seek, so ~0.05ms per 8KB page.',
            },
          ].map((item) => (
            <div key={item.component} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: `3px solid ${item.color}`, borderRadius: 10, padding: '16px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 8 }}>{item.component}</div>
              <Para>{item.desc}</Para>
            </div>
          ))}
        </div>

        <CodeBox label="Access time calculation — random vs sequential">
{`// RANDOM READ ACCESS TIME (spinning disk):
// seek_time     = 8ms  (average arm movement)
// rot_latency   = 4ms  (average half-rotation at 7200 RPM)
// transfer_time = 0.05ms (8KB page at 150 MB/s)
// total         = 12.05ms per random page read
// IOPS          = 1000ms / 12.05ms ≈ 83 random IOPS

// SEQUENTIAL READ THROUGHPUT:
// After initial seek + rotation (12ms for first page):
// Each subsequent page: only transfer_time = 0.05ms
// Because: head stays at the same track, platters keep spinning
// Effective throughput ≈ 150 MB/s = 18,750 pages/second

// COMPARISON:
// Random: 83 IOPS × 8KB = 664 KB/s effective throughput
// Sequential: 18,750 pages/s × 8KB = 150 MB/s
// Sequential is 225× faster for the same data volume

// HOW THIS SHAPES DATABASE DESIGN:
// 1. Full table scan: sequential — reads pages in disk order
//    → 18,750 pages/second → 150 MB/s
// 2. Index scan (many heap fetches): random — one seek per row
//    → 83 fetches/second → 664 KB/s
// Crossover: at ~0.44% selectivity (664/150,000 ≈ 0.44%)
// For selectivity > 0.44%: full scan can be FASTER than index scan
// This is exactly why PostgreSQL sometimes ignores your index

// SSDS CHANGE THE NUMBERS:
// NVMe: seek ≈ 0, rot ≈ 0, transfer ≈ 100µs per random 4KB read
// Sequential NVMe: 5,000 MB/s = still 2.5× faster than random NVMe
// The principle remains: sequential > random, just less dramatically`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 3 — PAGES AND BLOCKS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 03 — Pages and Blocks" />
        <SectionTitle>Pages and Blocks — The Fundamental Unit of Database I/O</SectionTitle>

        <Para>
          Neither the database nor the OS reads individual bytes or rows from disk.
          All disk I/O happens in fixed-size chunks. The OS works in
          <strong style={{ color: 'var(--accent)' }}> blocks</strong> (typically 4KB,
          determined by the filesystem). The DBMS works in
          <strong style={{ color: 'var(--accent)' }}> pages</strong> (a configurable
          multiple of the OS block size). PostgreSQL defaults to 8KB pages.
          MySQL InnoDB uses 16KB pages. The DBMS page is the unit of all
          buffer pool management — pages are loaded into and evicted from the
          buffer pool as complete units.
        </Para>

        <Para>
          The choice of page size involves a trade-off. Larger pages mean fewer
          I/O operations to read the same amount of data (better for sequential scans)
          but waste more space when only part of a page is needed (worse for point lookups
          on sparse data). 8KB is the sweet spot for most OLTP workloads because it
          balances scan efficiency with per-lookup overhead.
        </Para>

        <SubTitle>The Slotted Page Format — How a Page Is Laid Out Internally</SubTitle>

        <Para>
          Inside each page, the DBMS must track which rows are present, where each row
          starts, and which slots are free. The standard layout for variable-length records
          is the <strong style={{ color: 'var(--accent)' }}>slotted page format</strong>.
        </Para>

        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '22px 26px', marginBottom: 24, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2, overflowX: 'auto' }}>
          <div style={{ color: 'var(--muted)', marginBottom: 8 }}>// Slotted page layout (8KB page, grows from both ends)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', fontSize: 12 }}>
            {[
              { label: 'Page Header', color: '#0078d4', content: 'page_id | lsn (log sequence number) | free_space_start | free_space_end | slot_count', side: 'fixed, at start of page' },
              { label: 'Slot Array', color: 'var(--accent)', content: '[slot_0: offset=200, len=45] [slot_1: offset=150, len=50] [slot_2: offset=100, len=50] ...', side: 'grows forward →' },
              { label: 'Free Space', color: 'var(--muted)', content: '(empty space in the middle)', side: 'shrinks from both sides' },
              { label: 'Record Data', color: '#f97316', content: '← ... [row_2: Arjun|New York|24] [row_1: Priya|Hyd|31] [row_0: Rahul|Blr|28]', side: '← grows backward' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ background: `${item.color}10`, borderRight: '1px solid var(--border)', padding: '10px 14px', minWidth: 110, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: item.color, textAlign: 'center', lineHeight: 1.4 }}>{item.label}</span>
                </div>
                <div style={{ padding: '10px 14px', flex: 1, color: 'var(--text2)' }}>{item.content}</div>
                <div style={{ padding: '10px 14px', color: 'var(--muted)', fontSize: 11, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>{item.side}</div>
              </div>
            ))}
          </div>
        </div>

        <CodeBox label="Slotted page format — how records are accessed and why">
{`// SLOTTED PAGE STRUCTURE:
// Page header (fixed, at page start):
//   page_id:         which page this is in the file
//   lsn:             log sequence number (for crash recovery)
//   num_slots:       current number of slot entries
//   free_space_ptr:  pointer to start of free space (between slot array and records)
//   flags:           dirty flag, page type, etc.

// Slot array (grows forward from end of header):
//   Each slot: [offset: 2 bytes | length: 2 bytes]
//   slot[0] → (offset=7900, length=48): row 0 starts 7900 bytes into page, is 48 bytes
//   slot[1] → (offset=7848, length=52): row 1 starts 7848 bytes into page, is 52 bytes
//   slot[2] → (offset=0, length=0):    slot 2 is DELETED (marked with null offset)

// Record data (grows backward from end of page):
//   Row 0: [customer_id=1 | name=Rahul | city=San Francisco | age=28]  at offset 7900
//   Row 1: [customer_id=2 | name=Priya | city=Austin | age=31]  at offset 7848

// ROW ID (RID): (page_id, slot_number)
//   RID = (page_47, slot_0) → always identifies the same row
//   Even if the row MOVES within the page (compaction), slot[0] is updated
//   to point to the new offset — RID remains stable
//   This is critical for indexes: indexes store RIDs, not byte offsets

// INSERT a new row:
//   1. Check free_space: is there room for the row + one new slot entry?
//   2. Write new row at current free_space_ptr (from the end)
//   3. Decrement free_space_ptr by row size
//   4. Add new slot entry: (offset=new_row_start, length=row_size)
//   5. Increment num_slots
//   6. If no room: request a new page or compact this page (VACUUM)

// DELETE a row (logical delete):
//   1. Set slot[i].offset = 0 (or a null marker)
//   2. The space is NOT immediately reclaimed
//   3. VACUUM later compacts the page: moves remaining rows, reclaims dead space

// UPDATE a row (variable-length change):
//   If new row is SAME SIZE or SMALLER: update in place, adjust slot length
//   If new row is LARGER: delete old slot, insert new row at free space
//   If too large for this page: move to a different page, leave a forwarding pointer

// WHY THIS DESIGN:
// Variable-length records: rows have different sizes (VARCHAR columns)
// The slot array at the front gives O(1) access to any row by slot number
// Records at the back can be compacted without changing the slot array
// RIDs through the slot array remain stable even after compaction`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 4 — FILE ORGANISATION
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 04 — File Organisation" />
        <SectionTitle>File Organisation — How Pages Are Arranged Into Files</SectionTitle>

        <Para>
          A database table is stored as a collection of pages in one or more files on disk.
          How those pages are arranged — their logical and physical ordering — determines
          how efficiently different types of operations can be performed.
          There are four major file organisation strategies, each with distinct performance
          characteristics for search, insertion, and deletion.
        </Para>

        {/* HEAP FILE */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ height: 3, background: '#0078d4' }} />
          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)' }}>Heap File</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#0078d4', background: 'rgba(0,120,212,0.1)', border: '1px solid rgba(0,120,212,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Unordered — Default</span>
            </div>
            <Para>
              The simplest file organisation. Records are stored in no particular order —
              new records are inserted wherever free space exists.
              This is the default table storage in PostgreSQL and most relational databases.
              No assumptions are made about the physical ordering of rows.
            </Para>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 12, marginBottom: 16 }}>
              {[
                { op: 'Insert', cost: 'O(1)', detail: 'Find any page with free space (tracked in a free-space map). Write the record. Done.' },
                { op: 'Point Search (no index)', cost: 'O(n)', detail: 'Must scan every page. No way to skip to the matching record without an index.' },
                { op: 'Point Search (with index)', cost: 'O(log n)', detail: 'Index provides the RID. Fetch exactly that page.' },
                { op: 'Range Search (no index)', cost: 'O(n)', detail: 'Full scan — records are not in order so all pages must be checked.' },
                { op: 'Delete', cost: 'O(1) logical', detail: 'Mark slot as deleted. Space reclaimed later by VACUUM.' },
              ].map((item) => (
                <div key={item.op} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 4, alignItems: 'baseline' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#0078d4' }}>{item.op}</span>
                    <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{item.cost}</span>
                  </div>
                  <Para>{item.detail}</Para>
                </div>
              ))}
            </div>
            <Para>
              <strong style={{ color: 'var(--text)' }}>When it wins:</strong> Heap files
              are the right default for most OLTP tables because writes are fast (no need
              to maintain physical ordering), and most read access goes through indexes
              (which provide the RID for direct page access). The lack of physical ordering
              only hurts for range scans without an index — and in a well-designed schema,
              range scans always use an index.
            </Para>
          </div>
        </div>

        {/* SORTED FILE */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ height: 3, background: 'var(--accent)' }} />
          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)' }}>Sorted File</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Ordered on search key</span>
            </div>
            <Para>
              Records are physically stored in sorted order on a designated search key.
              This is the same as a
              <strong style={{ color: 'var(--accent)' }}> clustered index</strong> on that key —
              the physical file order matches the index order. Implemented in MySQL InnoDB
              (primary key is always clustered) and achievable in PostgreSQL with CLUSTER.
            </Para>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 12, marginBottom: 16 }}>
              {[
                { op: 'Insert', cost: 'O(log n + n)', detail: 'Must find the insertion point (binary search), then shift records to maintain order — expensive. Often insert into a separate unsorted overflow area and merge periodically.' },
                { op: 'Point Search', cost: 'O(log n)', detail: 'Binary search on the sorted key — O(log n) page reads even without a separate index structure.' },
                { op: 'Range Search', cost: 'O(log n + k)', detail: 'Binary search to first match, then sequential scan through k matching pages. Extremely efficient — sequential I/O through contiguous pages.' },
                { op: 'Delete', cost: 'O(log n)', detail: 'Find and mark deleted. Gaps in ordering left in place (sorted order of remaining records maintained).' },
              ].map((item) => (
                <div key={item.op} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 4, alignItems: 'baseline' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>{item.op}</span>
                    <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{item.cost}</span>
                  </div>
                  <Para>{item.detail}</Para>
                </div>
              ))}
            </div>
            <Para>
              <strong style={{ color: 'var(--text)' }}>When it wins:</strong> When the primary
              access pattern is range scans on the sort key — time-series data (WHERE date BETWEEN),
              ordered paginated results (ORDER BY id LIMIT 100), or any workload where
              related rows by key are always accessed together. Clustered indexes on the
              primary key also eliminate the heap fetch step — the data row IS the leaf
              node of the index.
            </Para>
          </div>
        </div>

        {/* ISAM */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ height: 3, background: '#f97316' }} />
          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)' }}>ISAM — Indexed Sequential Access Method</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#f97316', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Static Index + Sorted Data</span>
            </div>
            <Para>
              ISAM is a historical file organisation that combines a sorted data file
              with a simple static index structure. The data pages are sorted and fixed.
              The index is a separate static structure (like a simplified B-tree but
              not self-balancing) pointing into the sorted data pages. Overflow pages
              handle insertions that don't fit in the original data pages.
            </Para>
            <Para>
              ISAM was an important step in database history (IBM's earliest database
              products used it) but it has two critical limitations compared to B+ trees.
              First, the index is static — it does not rebalance when data grows, so
              overflow chains accumulate over time and performance degrades. Second,
              concurrent access requires locking entire leaf pages (no fine-grained
              record locking possible in the original design).
            </Para>
            <Para>
              Modern databases do not use ISAM directly — it has been entirely superseded
              by B+ trees. It remains on GATE syllabi as historical context and as a
              contrast case that explains why B+ trees were developed.
            </Para>
          </div>
        </div>

        {/* CLUSTERED vs UNCLUSTERED */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ height: 3, background: '#8b5cf6' }} />
          <div style={{ padding: '24px 28px' }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', marginBottom: 14 }}>Clustered vs Unclustered File Organisation</div>
            <Para>
              This distinction is critical and frequently confused. A
              <strong style={{ color: 'var(--accent)' }}> clustered file</strong> stores
              records from related tables (those frequently joined) physically together in
              the same pages — not to be confused with a clustered index.
              An <strong style={{ color: 'var(--accent)' }}>unclustered file</strong> stores
              each table's records in separate pages.
            </Para>
            <CodeBox label="Clustered file organisation — storing related tables together">
{`// CLUSTERED FILE: orders and their order_items stored interleaved by order_id
// Page 1: [order O001 header] [O001 item 1] [O001 item 2] [O001 item 3]
// Page 2: [order O002 header] [O002 item 1] [O002 item 2]
// Page 3: [order O003 header] [O003 item 1] [O003 item 2] [O003 item 3] [O003 item 4]

// BENEFIT: JOIN of orders and order_items is extremely fast
// Query: SELECT * FROM orders o JOIN order_items oi ON o.order_id = oi.order_id
// With clustered file: reading the order page ALSO reads its items — 1 page read per order
// Without: reading order page + separate order_items pages per order = many more reads

// UNCLUSTERED FILE (separate tables, standard):
// orders file:      [O001] [O002] [O003] [O004] ...
// order_items file: [O001_i1] [O001_i2] [O002_i1] ...
// JOIN requires: read from orders file + read from order_items file = separate I/Os

// PostgreSQL does NOT support clustered files (interleaved table storage).
// MySQL InnoDB uses clustered primary key (data stored in PK order) but not multi-table.
// Oracle supports clustered tables.
// Most widely available implementation: MySQL InnoDB clustered PK index.`}
            </CodeBox>
          </div>
        </div>
      </section>

      {/* ========================================
          PART 5 — RECORD FORMATS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 05 — Record Formats" />
        <SectionTitle>Record Formats — Fixed-Length vs Variable-Length Records</SectionTitle>

        <Para>
          How individual records (rows) are laid out within a page affects how efficiently
          the DBMS can access individual fields, how much space is consumed, and how
          updates are handled. There are two fundamental record formats.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#0078d4', marginBottom: 14 }}>Fixed-Length Records</div>
            <Para>
              Every record has exactly the same size. Fields are stored at fixed,
              predetermined byte offsets within the record. To access field N,
              compute byte_offset = sum of preceding field sizes.
            </Para>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 7, padding: '12px', marginBottom: 14, fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2 }}>
              <div style={{ color: 'var(--muted)' }}>// Fixed-length record: 40 bytes total</div>
              <div><span style={{ color: '#0078d4' }}>Bytes 0-3:  </span><span style={{ color: 'var(--text2)' }}>customer_id (INT, 4 bytes)</span></div>
              <div><span style={{ color: '#0078d4' }}>Bytes 4-33: </span><span style={{ color: 'var(--text2)' }}>name (CHAR(30), always 30 bytes)</span></div>
              <div><span style={{ color: '#0078d4' }}>Bytes 34-37:</span><span style={{ color: 'var(--text2)' }}>age (INT, 4 bytes)</span></div>
              <div><span style={{ color: '#0078d4' }}>Bytes 38-39:</span><span style={{ color: 'var(--text2)' }}>is_active (BOOL, 2 bytes padded)</span></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { label: 'Field access', value: 'O(1) — compute offset directly', good: true },
                { label: 'Space', value: 'Wasteful for short strings (CHAR pads with spaces)', good: false },
                { label: 'Inserts', value: 'Simple — always the same size', good: true },
                { label: 'Updates', value: 'Always in-place — same size', good: true },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: 8 }}>
                  <span style={{ color: item.good ? 'var(--accent)' : '#ff4757', flexShrink: 0, fontSize: 12 }}>{item.good ? '✓' : '✗'}</span>
                  <Para><strong style={{ color: 'var(--text)' }}>{item.label}:</strong> {item.value}</Para>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--accent)', marginBottom: 14 }}>Variable-Length Records</div>
            <Para>
              Records have different sizes depending on actual data values.
              VARCHAR, TEXT, and BLOB columns are variable-length. The record
              stores both data and metadata about field boundaries.
            </Para>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 7, padding: '12px', marginBottom: 14, fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2 }}>
              <div style={{ color: 'var(--muted)' }}>// Variable-length record layout</div>
              <div><span style={{ color: 'var(--accent)' }}>Header: </span><span style={{ color: 'var(--text2)' }}>[null_bitmap][field_offsets]</span></div>
              <div><span style={{ color: 'var(--accent)' }}>Fixed:  </span><span style={{ color: 'var(--text2)' }}>customer_id=1, age=28</span></div>
              <div><span style={{ color: 'var(--accent)' }}>Var:    </span><span style={{ color: 'var(--text2)' }}>name="Rahul" (5 bytes)</span></div>
              <div><span style={{ color: 'var(--accent)' }}>Var:    </span><span style={{ color: 'var(--text2)' }}>email="rahul@x.com" (11 bytes)</span></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { label: 'Field access', value: 'O(n) — must parse header to find variable fields', good: false },
                { label: 'Space', value: 'Efficient — stores only actual string length', good: true },
                { label: 'Inserts', value: 'Requires fitting the actual record size', good: true },
                { label: 'Updates', value: 'If new value larger: may need to move to different page', good: false },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: 8 }}>
                  <span style={{ color: item.good ? 'var(--accent)' : '#ff4757', flexShrink: 0, fontSize: 12 }}>{item.good ? '✓' : '✗'}</span>
                  <Para><strong style={{ color: 'var(--text)' }}>{item.label}:</strong> {item.value}</Para>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SubTitle>TOAST — Handling Very Large Values</SubTitle>

        <Para>
          What happens when a single field value is larger than an entire page?
          A TEXT column storing a 10MB document cannot fit in an 8KB page.
          PostgreSQL handles this with <strong style={{ color: 'var(--accent)' }}>TOAST</strong>
          (The Oversized-Attribute Storage Technique). Values larger than approximately
          2KB are automatically compressed or moved to a separate TOAST table,
          with a pointer stored in the main row.
        </Para>

        <CodeBox label="TOAST — automatic large value storage">
{`-- TOAST strategies per column (PostgreSQL):
-- PLAIN:    no compression, no out-of-line storage (for small fixed types)
-- EXTENDED: compress first, then out-of-line if still too large (default for TEXT, JSONB)
-- EXTERNAL: out-of-line without compression (fast access, more space)
-- MAIN:     compress before considering out-of-line

-- Check a table's TOAST table:
SELECT relname, reltoastrelid::regclass AS toast_table
FROM pg_class
WHERE relname = 'products';

-- Check column storage strategies:
SELECT attname, attstorage
FROM pg_attribute
WHERE attrelid = 'products'::regclass AND attnum > 0;
-- attstorage: 'x' = extended (default), 'e' = external, 'm' = main, 'p' = plain

-- TOAST impact on queries:
-- SELECT * FROM articles: always decompresses/fetches large TEXT columns
-- SELECT id, title FROM articles: does NOT touch TOAST if TEXT columns not selected
-- Always select only needed columns to avoid unnecessary TOAST access`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 6 — BUFFER POOL MANAGEMENT
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 06 — Buffer Pool" />
        <SectionTitle>Buffer Pool Management — The DBMS's Window Into Disk</SectionTitle>

        <Para>
          The <strong style={{ color: 'var(--accent)' }}>buffer pool</strong> is the
          DBMS-managed area of main memory (RAM) that caches disk pages.
          It is the single most important performance component in a database system.
          When a query needs a page, the DBMS checks the buffer pool first. If the page
          is there (a <strong style={{ color: 'var(--accent)' }}>hit</strong>), it is returned
          in nanoseconds. If not (a <strong style={{ color: 'var(--accent)' }}>miss</strong>),
          the DBMS must read it from disk (milliseconds) and load it into the buffer pool,
          possibly evicting another page to make room.
        </Para>

        <Para>
          The buffer pool is organised as an array of fixed-size
          <strong style={{ color: 'var(--accent)' }}> frames</strong>, each holding exactly one
          page. A <strong style={{ color: 'var(--accent)' }}>page table</strong> maps page IDs
          to frame numbers. Each frame also maintains a
          <strong style={{ color: 'var(--accent)' }}> dirty bit</strong> (modified since
          it was read from disk — must be written back before eviction) and a
          <strong style={{ color: 'var(--accent)' }}> pin count</strong>
          (number of currently active threads using this frame — cannot be evicted while pinned).
        </Para>

        <SubTitle>Buffer Pool Mechanics — The Complete Request Flow</SubTitle>

        <CodeBox label="Buffer pool request flow — every step from query to data">
{`// HOW THE BUFFER POOL HANDLES A PAGE REQUEST:

// Step 1: Query needs page P (e.g., page 47 of orders table)
// Step 2: Look up page table: is page 47 in any frame?

// CASE A: PAGE HIT (page is in buffer pool)
// Page 47 found in frame 23
// Increment pin_count[23] (mark as in-use, cannot evict while pinned)
// Return pointer to frame 23 contents
// Thread accesses the data directly in RAM — O(1) ns

// CASE B: PAGE MISS (page not in buffer pool)
// Step 2b: Find a free frame (evict if necessary)
//   a. Find a frame with pin_count = 0 (not currently in use)
//   b. If dirty_bit[frame] = 1:
//      Write frame contents back to disk first (WAL write)
//      Reset dirty_bit = 0
// Step 2c: Read page 47 from disk into the chosen frame
//   disk_read(page_47_disk_location → frame_X)
//   Cost: ~8-12ms for spinning disk, ~100µs for NVMe
// Step 2d: Update page table: page 47 → frame X
// Step 2e: Pin the frame: pin_count[X]++
// Step 2f: Return pointer to frame X

// When thread FINISHES using the page:
// Decrement pin_count[frame]
// If the page was MODIFIED: set dirty_bit[frame] = 1
// (Do NOT write to disk immediately — buffer pool batches writes)

// BUFFER POOL SIZE MATTERS ENORMOUSLY:
-- Check PostgreSQL buffer pool configuration:
SHOW shared_buffers;  -- default: 128MB (way too small for production)
-- Recommendation: 25% of RAM for a dedicated database server
-- 32GB RAM server: shared_buffers = 8GB
-- This allows 8GB / 8KB = 1,048,576 pages in the buffer pool

-- Check buffer pool hit rate (should be > 99% for OLTP):
SELECT
    sum(heap_blks_hit) AS heap_hits,
    sum(heap_blks_read) AS heap_reads,
    ROUND(
        sum(heap_blks_hit)::numeric
        / NULLIF(sum(heap_blks_hit) + sum(heap_blks_read), 0) * 100,
        2
    ) AS hit_rate_pct
FROM pg_statio_user_tables;
-- If hit_rate_pct < 95%: increase shared_buffers or add RAM`}
        </CodeBox>

        <SubTitle>Page Replacement Policies — Which Page to Evict</SubTitle>

        <Para>
          When the buffer pool is full and a new page must be loaded, the DBMS must
          choose which existing page to evict. This is the page replacement problem —
          the same problem CPU caches face. The choice of replacement policy significantly
          affects the buffer pool hit rate.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>

          {/* LRU */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)', borderRadius: 10, padding: '18px 22px' }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)' }}>LRU — Least Recently Used</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.07em' }}>Standard</span>
            </div>
            <Para>
              Evict the page that was least recently accessed. The intuition: if a page
              hasn't been used in a long time, it is unlikely to be used soon. Tracks
              a timestamp or order of last access for every frame.
            </Para>
            <Para>
              <strong style={{ color: 'var(--text)' }}>Implementation:</strong> Maintain a
              doubly-linked list of frames ordered by last access time.
              On each access, move the frame to the head of the list. Evict from the tail.
              O(1) per access with a hashmap for frame lookup.
            </Para>
            <Para>
              <strong style={{ color: '#ff4757' }}>The LRU-K problem (Sequential Flooding):</strong> A full table scan
              reads every page in the table exactly once. With basic LRU, these scan pages
              flood the buffer pool, evicting the frequently-used index and "hot" pages
              that are accessed constantly. After the scan, those hot pages must be
              re-read from disk. The scan, which needed each page only once,
              has destroyed the working set.
            </Para>
          </div>

          {/* CLOCK */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #0078d4', borderRadius: 10, padding: '18px 22px' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 10 }}>Clock Policy (Second-Chance LRU Approximation)</div>
            <Para>
              An efficient approximation of LRU using a circular buffer with a
              single "clock hand" pointer. Each frame has a reference bit (0 or 1).
              When a frame is accessed: set reference bit to 1. When the clock hand
              sweeps to a frame with bit=1: reset it to 0 and advance (give it a
              second chance). When the hand reaches a frame with bit=0: evict it.
            </Para>
            <CodeBox>
{`// CLOCK ALGORITHM:
// frames = circular array of buffer frames
// hand = current position of clock hand
// ref_bit[i] = 0 or 1 for each frame

// On PAGE ACCESS (hit or after loading):
ref_bit[frame] = 1  // mark recently used

// On EVICTION NEEDED:
while True:
    if pin_count[hand] > 0:
        hand = (hand + 1) % total_frames  // skip pinned frames
    elif ref_bit[hand] == 1:
        ref_bit[hand] = 0                 // give second chance
        hand = (hand + 1) % total_frames
    else:
        // ref_bit[hand] == 0: evict this frame
        if dirty_bit[hand]:
            write frame to disk
        load new page into hand's frame
        ref_bit[hand] = 1
        break

// ADVANTAGE: O(1) amortised, much lower overhead than true LRU
// (no linked list manipulation on every access)
// USED BY: PostgreSQL's buffer pool uses a clock-sweep algorithm`}
            </CodeBox>
          </div>

          {/* MRU */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #f97316', borderRadius: 10, padding: '18px 22px' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 10 }}>MRU — Most Recently Used (for Sequential Scans)</div>
            <Para>
              Evict the <em>most recently</em> used page instead of the least recently used.
              This sounds counterintuitive but is optimal for sequential table scans —
              a page just scanned will not be needed again during the scan,
              so evicting it immediately frees space for the next page.
            </Para>
            <Para>
              <strong style={{ color: 'var(--text)' }}>When to use MRU:</strong> specifically
              for pages being read by a sequential scan. Modern databases use
              "buffer ring" strategies where sequential scans use a small private
              ring buffer (a few frames cycling with MRU) instead of the main buffer
              pool — preventing scan pages from evicting the working set.
            </Para>
            <CodeBox>
{`-- PostgreSQL buffer ring for sequential scans:
-- A sequential scan larger than 1/4 of shared_buffers gets a "bulk read" ring
-- The ring has only ~256KB (32 pages) of buffer frames
-- Scan pages cycle through this ring — never polluting the main buffer pool
-- The main buffer pool's working set is preserved

-- This is why a large table scan doesn't destroy buffer pool performance
-- for concurrent OLTP queries in PostgreSQL.

-- Check if a scan is using the ring strategy:
EXPLAIN (ANALYZE, BUFFERS)
SELECT COUNT(*) FROM orders;
-- "Buffers: shared hit=X read=Y"
-- If Y is large but hit rate for other queries is still high:
-- The ring strategy is working correctly`}
            </CodeBox>
          </div>

          {/* LRU-K */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #8b5cf6', borderRadius: 10, padding: '18px 22px' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 10 }}>LRU-K — The Production Standard</div>
            <Para>
              LRU-K tracks the timestamps of the last K accesses to each page (not just
              the most recent). The eviction candidate is the page whose K-th most
              recent access was furthest in the past. With K=2, pages that have only
              been accessed once (like scan pages) have no second access timestamp
              and are treated as if their second access was infinitely far in the past —
              making them the first eviction candidates. Frequently accessed pages
              (many recent accesses) are protected.
            </Para>
            <Para>
              LRU-2 is the most common choice. It effectively solves the sequential
              flooding problem: scan pages (accessed once) are immediately vulnerable
              to eviction. Index root pages (accessed thousands of times per second)
              have very recent K-th access timestamps and are practically never evicted.
            </Para>
          </div>
        </div>

        <SubTitle>Write-Back vs Write-Through — When Dirty Pages Hit Disk</SubTitle>

        <CodeBox label="Dirty page write strategies">
{`// WRITE-THROUGH: write to disk immediately on every modification
// Pro: disk always has current data — simple recovery
// Con: every write requires a disk I/O — catastrophically slow for write-heavy workloads
// NOT used by production databases (except for specific WAL writes)

// WRITE-BACK (standard in all production databases):
// Modifications go to buffer pool only (dirty bit = 1)
// Dirty pages written to disk:
//   a. When evicted from buffer pool (must write before evicting)
//   b. By background writer process (periodically, before frames get too dirty)
//   c. At CHECKPOINT (all dirty pages flushed to disk)
// Pro: batches writes, dramatically reduces disk I/O
// Con: data in buffer pool is newer than data on disk
//      crash between modification and disk write → need WAL for recovery

-- PostgreSQL background writer (bgwriter) configuration:
SHOW bgwriter_delay;           -- default: 200ms between write rounds
SHOW bgwriter_lru_maxpages;    -- max pages written per round (default: 100)
SHOW bgwriter_lru_multiplier;  -- lookahead for pages likely to be needed soon

-- CHECKPOINT: flush all dirty buffer pool pages to disk
-- Occurs at: explicit CHECKPOINT command, wal segment filled, periodic timeout
SHOW checkpoint_completion_target;  -- default: 0.9 (spread writes over 90% of interval)
SHOW checkpoint_timeout;            -- default: 5min (checkpoint at least every 5min)

-- After a crash: WAL replay restores any dirty pages not yet flushed
-- The checkpoint determines how far back WAL replay must go
-- More frequent checkpoints = faster crash recovery, more write I/O
-- Less frequent checkpoints = slower crash recovery, less write I/O`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 7 — ROW vs COLUMNAR STORAGE
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 07 — Row vs Columnar" />
        <SectionTitle>Row Store vs Column Store — Why Data Warehouses Store Data Differently</SectionTitle>

        <Para>
          All the file organisations discussed so far are
          <strong style={{ color: 'var(--accent)' }}> row-oriented</strong> (NSM —
          N-ary Storage Model): all columns of a row are stored together on the same page.
          This is optimal for OLTP workloads that access entire rows (SELECT * FROM orders
          WHERE order_id = 5001 — fetch all columns of one row).
        </Para>

        <Para>
          Data warehouse (OLAP) workloads have a completely different access pattern:
          they access a few columns from millions of rows (SELECT AVG(total_amount),
          COUNT(*), city FROM orders GROUP BY city — three columns from all rows).
          For this pattern, row storage is terrible — every page read brings in all
          columns, but only 3 of perhaps 20 columns are needed. 85% of every I/O
          is wasted reading irrelevant columns.
          <strong style={{ color: 'var(--accent)' }}> Columnar storage</strong> (DSM —
          Decomposition Storage Model) solves this.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#0078d4', marginBottom: 14 }}>Row Store (NSM)</div>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 7, padding: '12px', marginBottom: 12, fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.9 }}>
              <div style={{ color: 'var(--muted)' }}>// Page layout:</div>
              <div><span style={{ color: '#0078d4' }}>Row 1:</span> <span style={{ color: 'var(--text2)' }}>[id=1][name=Rahul][city=Blr][amt=280][date=Jan]</span></div>
              <div><span style={{ color: '#0078d4' }}>Row 2:</span> <span style={{ color: 'var(--text2)' }}>[id=2][name=Priya][city=Hyd][amt=450][date=Jan]</span></div>
              <div><span style={{ color: '#0078d4' }}>Row 3:</span> <span style={{ color: 'var(--text2)' }}>[id=3][name=Arjun][city=Blr][amt=180][date=Feb]</span></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { item: 'Point lookup (all columns of one row)', good: true },
                { item: 'INSERT one row', good: true },
                { item: 'UPDATE one row (few columns)', good: true },
                { item: 'Full column scan (SELECT AVG(amount) FROM orders)', good: false },
                { item: 'Compression (mixed types per page)', good: false },
              ].map((item) => (
                <div key={item.item} style={{ display: 'flex', gap: 8 }}>
                  <span style={{ color: item.good ? 'var(--accent)' : '#ff4757', flexShrink: 0, fontSize: 12 }}>{item.good ? '✓' : '✗'}</span>
                  <Para>{item.item}</Para>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)', marginBottom: 14 }}>Column Store (DSM)</div>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 7, padding: '12px', marginBottom: 12, fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.9 }}>
              <div style={{ color: 'var(--muted)' }}>// Separate file per column:</div>
              <div><span style={{ color: 'var(--accent)' }}>city_col:</span>  <span style={{ color: 'var(--text2)' }}>[Blr][Hyd][Blr][Mum][Blr]...</span></div>
              <div><span style={{ color: 'var(--accent)' }}>amount_col:</span><span style={{ color: 'var(--text2)' }}>[280][450][180][320][280]...</span></div>
              <div><span style={{ color: 'var(--accent)' }}>date_col:</span>  <span style={{ color: 'var(--text2)' }}>[Jan][Jan][Feb][Jan][Mar]...</span></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { item: 'Point lookup (all columns of one row)', good: false },
                { item: 'INSERT one row (must update all column files)', good: false },
                { item: 'Full column scan (SELECT AVG(amount))', good: true },
                { item: 'Compression (same type per file → RLE, delta encoding)', good: true },
                { item: 'SIMD vectorised operations on column arrays', good: true },
              ].map((item) => (
                <div key={item.item} style={{ display: 'flex', gap: 8 }}>
                  <span style={{ color: item.good ? 'var(--accent)' : '#ff4757', flexShrink: 0, fontSize: 12 }}>{item.good ? '✓' : '✗'}</span>
                  <Para>{item.item}</Para>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SubTitle>Column Store Compression — Why Columnar Data Compresses So Well</SubTitle>

        <Para>
          Storing all values of one column together enables dramatically better compression
          than row stores, because adjacent values in a column are often similar or even
          identical. Three compression techniques are especially effective on columnar data:
        </Para>

        <CodeBox label="Columnar compression techniques — run-length encoding, delta, and dictionary">
{`// 1. RUN-LENGTH ENCODING (RLE): compress runs of repeated values
// city column (sorted): [San Francisco, San Francisco, San Francisco, San Francisco, Austin, Austin, New York]
// RLE compressed:       [(San Francisco, 4), (Austin, 2), (New York, 1)]
// Compression ratio: 7 values → 3 entries (57% smaller)
// Works best on: low-cardinality sorted columns (status, country, category)

// 2. DELTA ENCODING: store differences instead of absolute values
// timestamp column: [1704067200, 1704067260, 1704067320, 1704067380, ...]
// Delta encoded:    [1704067200, +60, +60, +60, ...]  (first value + deltas)
// For regularly-spaced timestamps: [base, step=60, count=N] → 3 values for N rows!
// Works best on: monotonically increasing or slowly changing numeric values

// 3. DICTIONARY ENCODING: replace strings with integer codes
// city column: [San Francisco, Austin, New York, San Francisco, Boston, San Francisco, ...]
// Dictionary: {0: San Francisco, 1: Austin, 2: New York, 3: Boston}
// Encoded:    [0, 1, 2, 0, 3, 0, ...]
// String comparisons → integer comparisons (much faster)
// Works best on: moderate-cardinality string columns (city, category, status)

// 4. BIT-PACKING: store small integers using minimal bits
// A column with values 0-15 needs only 4 bits per value, not 4 bytes
// Column with 1,000,000 rows and max value 255: 1MB instead of 4MB

// COMBINED IMPACT:
-- Snowflake reports: typical columnar compression ratio 5-10×
-- A 100GB row-store table becomes 10-20GB columnar
-- Fewer pages to read → fewer I/Os → faster queries even without algorithmic changes
-- Plus: vectorised SIMD operations on contiguous same-type arrays: 4-16× faster computation

// USED BY:
-- Snowflake, BigQuery, Redshift, ClickHouse: native columnar storage
-- PostgreSQL: heap file (row store) + optional columnar extensions (pg_monostore, Citus)
-- Apache Parquet: columnar file format for data lakes (used by Spark, Pandas, dbt)`}
        </CodeBox>

        <Callout type="tip">
          <strong>The practical rule for data engineers:</strong> OLTP workloads (web app
          reads/writes, point lookups, transactional operations) → row store (PostgreSQL,
          MySQL). OLAP workloads (analytics, aggregations, reporting, full column scans) →
          columnar store (Snowflake, BigQuery, Redshift, ClickHouse). Most modern
          architectures use both: row-store transactional DB → ETL/ELT → columnar
          data warehouse. This is the exact pattern in every Azure, AWS, and GCP
          data engineering project on this platform.
        </Callout>
      </section>

      {/* ========================================
          PART 8 — WHAT THIS LOOKS LIKE AT WORK
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 08 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>💼 What This Looks Like at Work</div>
        <SectionTitle>Tuning a Production PostgreSQL Instance — Storage and Buffer Pool</SectionTitle>

        <Para>
          This is the checklist a data engineer or DBA runs when setting up or tuning
          a PostgreSQL instance for production workloads. Every item connects to a
          concept from this module.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0078d4', background: 'rgba(0,120,212,0.1)', border: '1px solid rgba(0,120,212,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            PostgreSQL Production Tuning Checklist
          </div>

          <CodeBox label="postgresql.conf — the most impactful storage and memory settings">
{`# ─────────────────────────────────────────────────────────────────
# MEMORY SETTINGS
# ─────────────────────────────────────────────────────────────────

# Buffer pool — the most important setting. Set to 25% of total RAM.
# On a 64GB RAM server:
shared_buffers = 16GB

# Per-sort/hash work memory. Affects sort, hash join, hash aggregate.
# Set to: RAM_for_connections / (max_connections × 3)
# On 64GB server, 100 connections: 64GB × 0.75 / (100 × 3) ≈ 160MB
work_mem = 128MB
# WARNING: each query node (sort, hash join) gets work_mem
# A complex query with 5 operations uses 5 × 128MB = 640MB

# Memory for VACUUM and CREATE INDEX operations
maintenance_work_mem = 2GB

# OS cache (effective_cache_size tells the planner how much RAM is available
# for caching, including OS page cache + shared_buffers)
effective_cache_size = 48GB  # shared_buffers + OS cache estimate

# ─────────────────────────────────────────────────────────────────
# STORAGE TYPE SETTINGS
# ─────────────────────────────────────────────────────────────────

# For NVMe SSD (random I/O almost as fast as sequential):
random_page_cost = 1.1    # default is 4.0 (for spinning disks)
seq_page_cost = 1.0
# With random_page_cost = 1.1: planner will aggressively use indexes
# With random_page_cost = 4.0: planner prefers seq scans for lower selectivity

# ─────────────────────────────────────────────────────────────────
# WRITE-AHEAD LOG (WAL) SETTINGS
# ─────────────────────────────────────────────────────────────────

# Durability vs performance trade-off:
synchronous_commit = on   # default: durable, ~1-10ms added per commit
# For non-critical writes (logging, analytics): off saves latency at cost of
# up to synchronous_commit_delay ms of data on crash

# WAL buffer (in-memory buffer before WAL is flushed to disk)
wal_buffers = 64MB  # default: -1 (auto = 1/32 of shared_buffers, max 64MB)

# ─────────────────────────────────────────────────────────────────
# CHECKPOINT SETTINGS
# ─────────────────────────────────────────────────────────────────

# Spread checkpoint I/O over this fraction of the checkpoint interval:
checkpoint_completion_target = 0.9  # write dirty pages over 90% of interval
# Prevents I/O spike at checkpoint time

checkpoint_timeout = 15min   # maximum time between checkpoints
max_wal_size = 4GB           # trigger checkpoint if WAL grows past this

# ─────────────────────────────────────────────────────────────────
# AUTOVACUUM (MVCC dead tuple cleanup)
# ─────────────────────────────────────────────────────────────────
autovacuum = on
autovacuum_vacuum_scale_factor = 0.1    # vacuum when 10% of rows are dead
autovacuum_analyze_scale_factor = 0.05  # analyze when 5% of rows changed
autovacuum_vacuum_cost_delay = 2ms      # IO throttle for autovacuum

# ─────────────────────────────────────────────────────────────────
# MONITORING COMMANDS
# ─────────────────────────────────────────────────────────────────
-- Check buffer pool hit rate:
SELECT ROUND(100 * sum(blks_hit) / NULLIF(sum(blks_hit) + sum(blks_read), 0), 2)
AS hit_rate_pct FROM pg_stat_database;
-- Target: > 99% for OLTP workloads

-- Check pages currently in buffer pool:
SELECT c.relname, count(*) AS pages_in_pool,
       pg_size_pretty(count(*) * 8192) AS size_in_pool
FROM pg_buffercache b
JOIN pg_class c ON b.relfilenode = c.relfilenode
GROUP BY c.relname ORDER BY pages_in_pool DESC LIMIT 20;`}
          </CodeBox>
        </div>
      </section>

      {/* ========================================
          PART 9 — INTERVIEW QUESTIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 09 — Interview Prep" />
        <SectionTitle>Storage Interview Questions — Complete Answers</SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              q: 'Why does a database read and write data in pages rather than individual rows?',
              color: '#0078d4',
              a: 'Disk I/O operates in fixed-size blocks — the hardware reads or writes a minimum of one block at a time (typically 512 bytes to 4KB). Reading a single byte requires reading an entire block containing it. Database pages are sized to match or exceed the disk block size (PostgreSQL uses 8KB, MySQL InnoDB uses 16KB) so that each I/O operation is maximally useful. Reading one page brings in approximately 40 rows (for a 200-byte average row). If rows were accessed individually, the disk would need one I/O per row — 40× more I/O for the same data. Pages are also the unit of buffer pool management — it is practical to track 1 million 8KB frames in a buffer pool, whereas tracking 40 million individual row locations would be impractical.',
            },
            {
              q: 'What is the difference between a dirty page and a pinned page in the buffer pool?',
              color: 'var(--accent)',
              a: 'A dirty page is a buffer pool frame that has been modified since it was last read from disk — its in-memory content is newer than the disk copy. Before a dirty page can be evicted from the buffer pool, its content must be written back to disk (or at least its changes recorded in the WAL) to preserve durability. A pinned page is a frame that is currently in use by one or more active threads — its pin count is greater than zero. A pinned frame cannot be evicted regardless of its dirty status, because evicting it while a thread is reading from or writing to it would cause data corruption. The pin count is incremented when a thread starts using a page and decremented when it finishes. A frame can be both dirty (modified) and pinned (in use) simultaneously.',
            },
            {
              q: 'Why is a sequential table scan sometimes faster than an index scan even on a large table?',
              color: '#f97316',
              a: 'An index scan on a non-clustered index involves two steps: read the index to get the row ID, then fetch the actual row from the heap (a random I/O). If the query returns many rows, each row fetch is a separate random disk access — on spinning disk each takes ~8-12ms. A sequential scan reads the entire table in physical page order, exploiting sequential I/O (which is 200-300× faster than random I/O per unit of data on spinning disk). The crossover point: when more than approximately 15-20% of the table rows match the query, a sequential scan reads less total data (all rows read sequentially) vs the index scan (random heap fetches for each matching row). The database query optimiser computes this crossover using the table\'s statistics (row count, selectivity estimates) and the cost parameters (random_page_cost vs seq_page_cost). Setting random_page_cost = 1.1 for SSDs (where random I/O is much cheaper) causes the optimiser to prefer index scans at much lower selectivity thresholds.',
            },
            {
              q: 'What is the LRU sequential flooding problem and how do databases solve it?',
              color: '#8b5cf6',
              a: 'LRU sequential flooding occurs when a full table scan fills the buffer pool with pages that are each needed only once — while evicting the frequently-accessed "hot" pages (index root nodes, popular rows) that were providing high buffer pool hit rates. After the scan, all those hot pages must be re-read from disk, causing a spike in disk I/O and query latency. Databases solve this several ways. PostgreSQL uses a "buffer ring" strategy: sequential scans larger than 1/4 of shared_buffers use a small dedicated ring of ~32 pages with MRU replacement. Scan pages cycle through this ring and never touch the main buffer pool. LRU-K (especially LRU-2) is another solution: pages accessed only once (scan pages) have no second access timestamp and are immediately eligible for eviction, while frequently accessed pages (with many recent accesses) are protected. SQL Server uses a "stolen" buffer pool strategy where sequential scan allocations are tracked separately and are first candidates for eviction.',
            },
            {
              q: 'When would you choose columnar storage over row storage?',
              color: '#facc15',
              a: 'Choose columnar storage for analytical (OLAP) workloads that scan a small number of columns across a large number of rows — aggregations, GROUP BY, time-series analysis, reporting. The benefits are: (1) I/O reduction — only the needed columns are read, avoiding irrelevant columns (a query on 3 of 20 columns reads 85% less data). (2) Better compression — a column file contains one data type, enabling run-length encoding, delta encoding, and dictionary encoding that can achieve 5-10× compression ratios, further reducing I/O. (3) SIMD vectorisation — processors can apply the same operation to multiple values simultaneously when they are packed contiguously with the same type. Choose row storage for OLTP workloads that access complete rows — point lookups by primary key, inserts, updates, deletes. Inserting one row into a column store requires updating all column files. Use both: row store for transactional data, column store for the analytical data warehouse built from it.',
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
        'Storage hierarchy from fastest to slowest: CPU registers → L1/L2/L3 cache → DRAM (buffer pool) → NVMe SSD → SATA SSD → spinning HDD → network storage. The DBMS is primarily concerned with the DRAM↔disk boundary. Everything above DRAM is managed automatically by the CPU.',
        'Sequential I/O is 200-300× faster than random I/O on spinning disk, and still 2-5× faster on SSDs. All database storage design — page size, file organisation, B+ tree fan-out, bulk loading — optimises for sequential access and minimises random I/O.',
        'Disk access time = seek time + rotational latency + transfer time. Random 8KB read on HDD: ~12ms. Sequential reads after the first: ~0.05ms each. This gap explains why full table scans sometimes beat index scans at high selectivity.',
        'Pages (8KB in PostgreSQL, 16KB in MySQL InnoDB) are the fundamental unit of all database I/O. The buffer pool holds pages in RAM frames. The slotted page format stores variable-length records with a slot array at the front and records growing backward from the end.',
        'Heap file: unordered, fast inserts (O(1)), O(n) scan without index, default in PostgreSQL. Sorted file: O(log n) range scans, expensive inserts. ISAM: historical, superseded by B+ trees. Clustered file: related tables interleaved for fast joins.',
        'Buffer pool: array of frames in DRAM, page table maps page IDs to frames, dirty bit tracks modifications, pin count prevents eviction of in-use pages. Hit rate should exceed 99% for OLTP. Set shared_buffers to 25% of RAM.',
        'LRU replacement policy: evict least recently used page. Clock policy: efficient approximation with reference bits, O(1). MRU: optimal for sequential scan pages — evict the most recently used. LRU-K: tracks K most recent accesses, protects frequently-used pages from scan flooding.',
        'Write-back: modifications held in buffer pool until eviction or checkpoint. Dirty pages must be written to disk (or WAL must record changes) before a frame can be reused. Checkpoint: all dirty pages flushed to disk, establishes recovery starting point.',
        'Row store (NSM): all columns of a row stored together. Optimal for OLTP (point lookups, inserts, updates). Column store (DSM): each column stored separately. Optimal for OLAP (aggregations, few columns across many rows). 5-10× better compression via RLE, delta encoding, dictionary encoding.',
        'The practical architecture: row-store transactional database (PostgreSQL/MySQL) for application writes → ETL/ELT pipeline → columnar data warehouse (Snowflake/BigQuery/Redshift) for analytics. This separation is the foundation of every modern data engineering stack.',
      ]} />

    </LearnLayout>
  )
}