import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Hashing & B+ Trees — Complete Guide | DBMS | Chaduvuko',
  description:
    'Static and dynamic hashing, extendible hashing, linear hashing, B+ tree structure, insertion and deletion with splits and merges, bulk loading, B-tree vs B+ tree, and every exam and interview pattern with full worked examples.',
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

export default function HashingBTrees() {
  return (
    <LearnLayout
      title="Hashing & B+ Trees"
      description="The two data structures that power every fast database lookup — how hashing handles exact searches in O(1), and how B+ trees handle everything else in O(log n), with every insert, delete, split, and merge traced step by step."
      section="DBMS"
      readTime="85–100 min"
      updatedAt="March 2026"
    >

      {/* ========================================
          PART 1 — HASHING FOUNDATIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 01 — Hashing Foundations" />
        <SectionTitle>Hashing in Databases — Why O(1) Lookup Exists and When It Fails</SectionTitle>

        <Para>
          A hash function maps a search key to a bucket number.
          If you want to find the row where <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>customer_id = 'C042'</code>,
          the hash function computes a bucket number from 'C042' and you go directly
          to that bucket — no comparisons, no tree traversal, no sequential scan.
          In theory this is O(1). In practice it is more nuanced, but the core idea
          is the fastest possible lookup structure for exact equality searches.
        </Para>

        <Para>
          The database hashing problem is harder than in-memory hashing because
          data lives on disk in fixed-size pages (buckets). A bucket that fills up
          cannot simply grow like a dynamic array in memory — it must overflow
          into additional pages, and managing those overflow pages efficiently
          is what distinguishes the different hashing schemes.
        </Para>

        <SubTitle>Hash Functions for Database Keys — Requirements</SubTitle>

        <Para>
          A good database hash function must satisfy three properties simultaneously.
          <strong style={{ color: 'var(--accent)' }}> Uniformity</strong>: keys should
          be distributed evenly across all buckets. If 90% of keys hash to bucket 0,
          that bucket becomes a bottleneck while other buckets sit empty.
          <strong style={{ color: 'var(--accent)' }}> Determinism</strong>: the same
          key must always hash to the same bucket — otherwise lookups fail.
          <strong style={{ color: 'var(--accent)' }}> Speed</strong>: the hash function
          must be fast to compute — it runs on every single insert and lookup.
        </Para>

        <CodeBox label="Common hash functions for database keys">
{`// DIVISION METHOD: h(k) = k mod N  (N = number of buckets)
// Simple and fast. Best when N is a prime not close to a power of 2.
h(42)  = 42 mod 10 = 2   → bucket 2
h(52)  = 52 mod 10 = 2   → bucket 2 (COLLISION — same bucket as 42)
h(73)  = 73 mod 10 = 3   → bucket 3

// PROBLEM with division: if keys cluster (e.g., all end in 0), one bucket fills up.
// N should be prime to reduce clustering patterns.

// MULTIPLICATION METHOD: h(k) = floor(N × (k × A mod 1))
// A = (√5 - 1)/2 ≈ 0.618 (golden ratio) — produces excellent distribution
// More complex to compute but avoids clustering for common key patterns.

// STRING HASHING — polynomial rolling hash:
h("C042") = (ord('C') × 31³ + ord('0') × 31² + ord('4') × 31 + ord('2')) mod N
// Different characters → different hash values
// Order-sensitive: "C042" and "C024" hash differently

// UNIVERSALLY UNIQUE HASH (for distributed systems):
// MurmurHash3, FNV-1a, xxHash — designed for speed and excellent distribution
// Used in PostgreSQL's internal hashing (e.g., hash joins, hash indexes)

// KEY PROPERTY TO REMEMBER:
// Hash functions DESTROY ORDER information.
// h(30) and h(31) have no mathematical relationship.
// This is why hash indexes cannot be used for range queries (>, <, BETWEEN).
// Only B+ trees preserve order and support range scans.`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 2 — STATIC HASHING
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 02 — Static Hashing" />
        <SectionTitle>Static Hashing — Fixed Buckets With Overflow Chains</SectionTitle>

        <Para>
          Static hashing uses a fixed number of buckets determined at index creation time.
          The hash function maps every key to one of N fixed buckets.
          Each bucket is a disk page (or a fixed number of pages) that holds a set of
          key-pointer pairs. When a bucket fills up, it creates an
          <strong style={{ color: 'var(--accent)' }}> overflow bucket</strong> — a linked
          page chained to the original bucket.
        </Para>

        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '22px 26px', marginBottom: 20, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2, overflowX: 'auto' }}>
          <div style={{ color: 'var(--muted)', marginBottom: 8 }}>// Static hash index: N=4 buckets, h(k) = k mod 4</div>
          <div><span style={{ color: 'var(--accent)' }}>Bucket 0:</span> <span style={{ color: 'var(--text2)' }}>[k=4, ptr] [k=8, ptr] [k=12, ptr]</span> <span style={{ color: 'var(--muted)' }}>← full</span></div>
          <div style={{ paddingLeft: 24, color: 'var(--text2)' }}>↳ Overflow page: [k=16, ptr] [k=20, ptr] ← overflow chain</div>
          <div><span style={{ color: 'var(--accent)' }}>Bucket 1:</span> <span style={{ color: 'var(--text2)' }}>[k=1, ptr] [k=5, ptr] [k=9, ptr]</span></div>
          <div><span style={{ color: 'var(--accent)' }}>Bucket 2:</span> <span style={{ color: 'var(--text2)' }}>[k=2, ptr] [k=6, ptr]</span></div>
          <div><span style={{ color: 'var(--accent)' }}>Bucket 3:</span> <span style={{ color: 'var(--text2)' }}>[k=3, ptr] [k=7, ptr] [k=11, ptr]</span></div>
        </div>

        <SubTitle>Static Hashing Operations</SubTitle>

        <CodeBox label="Static hashing — search, insert, delete with overflow handling">
{`// SEARCH for key k:
bucket = h(k)           // compute bucket number
page = bucket_directory[bucket]  // get the disk page for this bucket
while page != null:
    for each (key, ptr) in page:
        if key == k: return ptr  // found!
    page = page.overflow_next    // follow overflow chain
return NOT_FOUND

// Average case: O(1) if no overflow, O(overflow_chain_length) with overflow
// Worst case: O(n) if all keys hash to same bucket (terrible hash function)

// INSERT key k with row pointer ptr:
bucket = h(k)
page = bucket_directory[bucket]
if page has free slot:
    add (k, ptr) to page
    write page to disk
else:
    // bucket is full — allocate overflow page
    new_page = allocate_new_disk_page()
    add (k, ptr) to new_page
    page.overflow_next = new_page
    write both pages to disk

// DELETE key k:
bucket = h(k)
page = bucket_directory[bucket]
while page != null:
    if k in page:
        remove (k, ptr) from page
        if page is empty and is overflow page:
            // optionally reclaim the overflow page
            unlink page from overflow chain
        return SUCCESS
    page = page.overflow_next
return NOT_FOUND

// THE FUNDAMENTAL PROBLEM WITH STATIC HASHING:
// As data grows, overflow chains grow, and lookup cost degrades.
// As data shrinks, buckets are mostly empty — wasted space.
// N is fixed at creation — cannot adapt to changing data volumes.
// Solution: Dynamic hashing (Extendible or Linear hashing).`}
        </CodeBox>

        <SubTitle>Static Hashing Problems — Why Dynamic Hashing Was Invented</SubTitle>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.3)', borderRadius: 10, padding: '18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#ff4757', marginBottom: 10 }}>Problem 1 — Overflow degradation</div>
            <Para>
              As more data is inserted, buckets fill and overflow chains grow.
              A lookup that should be O(1) becomes O(chain_length) as
              the hash index accumulates data over time.
              A chain of 100 overflow pages means 100 disk reads for one lookup.
            </Para>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.3)', borderRadius: 10, padding: '18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#ff4757', marginBottom: 10 }}>Problem 2 — Rehashing cost</div>
            <Para>
              The only way to fix a bloated static hash index is to create a new
              index with more buckets (rehash). Rehashing reads every key, recomputes
              h(k) with new N, and rewrites every bucket — O(n) operation on the
              entire index. During rehashing, the index is unavailable.
            </Para>
          </div>
        </div>
      </section>

      {/* ========================================
          PART 3 — EXTENDIBLE HASHING
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 03 — Extendible Hashing" />
        <SectionTitle>Extendible Hashing — Splitting Only the Overflowing Bucket</SectionTitle>

        <Para>
          Extendible hashing solves static hashing's rehashing problem by splitting
          only the one bucket that overflows — not the entire index.
          It uses a two-level structure: a
          <strong style={{ color: 'var(--accent)' }}> directory</strong> of pointers
          (in memory or on one page) and the actual
          <strong style={{ color: 'var(--accent)' }}> bucket pages</strong> on disk.
          The key insight: multiple directory entries can point to the same bucket page,
          so doubling the directory does not require doubling the number of actual pages.
        </Para>

        <SubTitle>The Two Key Quantities</SubTitle>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)', borderRadius: 10, padding: '18px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--accent)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>Global Depth (d)</div>
            <Para>
              The number of bits of the hash value used by the directory to determine
              which bucket a key belongs to. The directory has 2^d entries.
              When the directory doubles in size, global depth increases by 1.
            </Para>
            <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent)', background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.15)', borderRadius: 6, padding: '8px 12px' }}>
              Directory size = 2^global_depth
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #0078d4', borderRadius: 10, padding: '18px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0078d4', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>Local Depth (d_i)</div>
            <Para>
              Each bucket has its own local depth — the number of bits actually used
              to distinguish keys in that bucket. Local depth ≤ global depth always.
              When a bucket splits, its local depth increases by 1.
              When local depth of a split bucket = global depth, the directory must
              also double before the split can proceed.
            </Para>
            <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#0078d4', background: 'rgba(0,120,212,0.06)', border: '1px solid rgba(0,120,212,0.15)', borderRadius: 6, padding: '8px 12px' }}>
              Pointers sharing bucket i = 2^(global_depth - local_depth_i)
            </div>
          </div>
        </div>

        <SubTitle>Complete Extendible Hashing Walkthrough — From Empty to Split</SubTitle>

        <CodeBox label="Extendible hashing — full traced example with directory doublings">
{`// SETUP: bucket capacity = 2 entries, h(k) uses binary representation of k

// STATE 0: global_depth=1, 2 directory entries, 2 buckets, both local_depth=1
// Directory:
//   0 → Bucket A (local_depth=1): empty
//   1 → Bucket B (local_depth=1): empty

// INSERT k=2 (binary: 10, last bit = 0 → Bucket A):
// Directory[0] → Bucket A: [2]

// INSERT k=4 (binary: 100, last bit = 0 → Bucket A):
// Directory[0] → Bucket A: [2, 4]  ← Bucket A is now FULL (capacity=2)

// INSERT k=6 (binary: 110, last bit = 0 → Bucket A):
// Bucket A is full → SPLIT required

// SPLIT PROCEDURE for Bucket A (local_depth=1, global_depth=1):
// local_depth == global_depth → must DOUBLE THE DIRECTORY first

// STEP 1: Double the directory (global_depth: 1 → 2)
// Old directory (depth=1):    New directory (depth=2):
//   bit[0]: 0 → Bucket A        bit[1:0]: 00 → Bucket A (unchanged)
//   bit[0]: 1 → Bucket B        bit[1:0]: 01 → Bucket B (unchanged)
//                                bit[1:0]: 10 → Bucket A (SAME as 00 for now)
//                                bit[1:0]: 11 → Bucket B (SAME as 01 for now)
// After doubling: 4 directory entries, but still only 2 actual buckets

// STEP 2: Create new Bucket A' and redistribute Bucket A's keys
// Bucket A had: [2, 4]
// New bit to distinguish: bit[1] (second bit from right)
// k=2: binary 010, bit[1]=1 → Bucket A' (new)
// k=4: binary 100, bit[1]=0 → Bucket A  (original, renamed)
// k=6: binary 110, bit[1]=1 → Bucket A' (new)

// STEP 3: Update directory pointers
// bit[1:0]=00 → Bucket A  (local_depth=2): [4]
// bit[1:0]=01 → Bucket B  (local_depth=1): []
// bit[1:0]=10 → Bucket A' (local_depth=2): [2, 6]
// bit[1:0]=11 → Bucket B  (local_depth=1): []

// STATE after inserting 2, 4, 6:
// Global depth = 2, directory = [00→A, 01→B, 10→A', 11→B]
// Bucket A  (local_depth=2): [4]
// Bucket A' (local_depth=2): [2, 6]
// Bucket B  (local_depth=1): []

// INSERT k=1 (binary: 001, last 2 bits = 01 → Bucket B):
// Bucket B: [1]

// INSERT k=3 (binary: 011, last 2 bits = 11 → Bucket B):
// Bucket B: [1, 3]  ← full

// INSERT k=5 (binary: 101, last 2 bits = 01 → Bucket B):
// Bucket B is full → SPLIT
// local_depth(B) = 1 < global_depth = 2 → NO directory doubling needed!
// Create Bucket B', redistribute by bit[1]:
// k=1: binary 001, bit[1]=0 → Bucket B
// k=3: binary 011, bit[1]=1 → Bucket B'
// k=5: binary 101, bit[1]=0 → Bucket B
// Update directory: 01 → Bucket B (local_depth=2): [1,5]
//                   11 → Bucket B' (local_depth=2): [3]

// FINAL STATE:
// Global depth = 2
// Directory: 00→A [4], 01→B [1,5], 10→A' [2,6], 11→B' [3]
// All buckets have local_depth = 2

// SEARCH for k=6:
// h(6) = 110, last 2 bits = 10 → directory[10] → Bucket A' → find 6 ✓
// COST: 1 directory lookup + 1 bucket page read = 2 operations (near O(1))`}
        </CodeBox>

        <SubTitle>Extendible Hashing — Properties and Trade-offs</SubTitle>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 12, marginBottom: 24 }}>
          {[
            { prop: 'Lookup cost', value: 'O(1) — one directory access + one bucket page read (if directory fits in memory, zero disk reads for directory)', color: 'var(--accent)' },
            { prop: 'Insert cost', value: 'O(1) amortised — occasional splits require redistributing one bucket and possibly doubling the directory', color: 'var(--accent)' },
            { prop: 'Directory doubling', value: 'Only when split bucket\'s local_depth = global_depth. Each doubling copies the directory (O(2^d)) but is infrequent. Directory size grows at most logarithmically.', color: '#f97316' },
            { prop: 'Space efficiency', value: 'Good — no overflow chains. Each bucket holds exactly the records assigned to it. Multiple directory entries pointing to same bucket = no wasted pages.', color: 'var(--accent)' },
            { prop: 'Range queries', value: 'Not supported — hash destroys order. For range queries, B+ tree is required.', color: '#ff4757' },
            { prop: 'Skewed distributions', value: 'Problem — if many keys hash to same prefix, one bucket gets all the data. Repeated splits without redistributing to other buckets → deep local depths on hot buckets.', color: '#ff4757' },
          ].map((item) => (
            <div key={item.prop} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: `3px solid ${item.color}`, borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: item.color, marginBottom: 6, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{item.prop}</div>
              <Para>{item.value}</Para>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 4 — LINEAR HASHING
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 04 — Linear Hashing" />
        <SectionTitle>Linear Hashing — Splitting Buckets in Order, No Directory Needed</SectionTitle>

        <Para>
          Linear hashing is an alternative dynamic hashing scheme that avoids
          the directory entirely. Instead of splitting whichever bucket overflows,
          linear hashing splits buckets in a fixed linear order —
          bucket 0 first, then bucket 1, then bucket 2, and so on — regardless
          of which bucket actually overflowed. Overflow from non-current-split
          buckets is handled with temporary overflow chains that are eliminated
          when that bucket's turn comes to split.
        </Para>

        <Para>
          The result is a simpler structure with no directory overhead, predictable
          memory usage, and no directory doubling step. The trade-off is that
          overflow chains may temporarily exist on buckets that are not yet at
          their split point.
        </Para>

        <SubTitle>Linear Hashing Mechanics</SubTitle>

        <CodeBox label="Linear hashing — the split pointer and two hash functions">
{`// LINEAR HASHING STATE:
// n     = current number of buckets
// sp    = split pointer (which bucket splits next, starts at 0)
// level = current level (how many times n has doubled, starts at 0)

// TWO HASH FUNCTIONS:
// h_level(k)   = k mod (2^level × n₀)         // current level hash
// h_level+1(k) = k mod (2^(level+1) × n₀)     // next level hash (twice as many buckets)
// n₀ = initial number of buckets (e.g., 2)

// WHICH HASH FUNCTION TO USE FOR A GIVEN KEY:
// Compute h_level(k)
// If h_level(k) < sp (bucket has already been split this round):
//     use h_level+1(k)  ← use next-level hash for already-split buckets
// Else:
//     use h_level(k)   ← use current hash for not-yet-split buckets

// INSERT TRIGGER: when load factor > threshold (e.g., 0.75 full):
// 1. Split bucket at sp (regardless of which bucket overflowed)
// 2. Create new bucket at position n + sp
// 3. Redistribute keys in bucket[sp] between bucket[sp] and new bucket
//    using h_level+1(k): keys where h_level+1(k) = sp stay in bucket[sp]
//                        keys where h_level+1(k) = sp + old_n go to new bucket
// 4. sp++ (advance split pointer)
// 5. If sp == old_n: level++, sp = 0, n = 2 × old_n (completed one round)

// ─────────────────────────────────────────────────────────────────
// WORKED EXAMPLE: n₀=2, bucket capacity=3, h_level(k) = k mod 2
// ─────────────────────────────────────────────────────────────────

// Initial state: level=0, sp=0, n=2
// h₀(k) = k mod 2
// Bucket 0: []  Bucket 1: []

// INSERT 4,8,2,12,6 (all even → all hash to bucket 0 via k mod 2)
// After 4: Bucket 0: [4]
// After 8: Bucket 0: [4,8]
// After 2: Bucket 0: [4,8,2]  ← full (capacity=3)
// INSERT 12: would overflow bucket 0 → TRIGGER SPLIT at sp=0

// SPLIT bucket[0]:
// Create bucket[2] (= n + sp = 2 + 0)
// Use h₁(k) = k mod 4 to redistribute bucket[0]=[4,8,2]:
//   h₁(4)=0  → stays in bucket[0]
//   h₁(8)=0  → stays in bucket[0]
//   h₁(2)=2  → moves to bucket[2]
// sp = 1, n = 3

// State: level=0, sp=1, n=3
// Bucket 0: [4,8]  Bucket 1: []  Bucket 2: [2]
// Now INSERT 12: h₀(12)=0, but 0 < sp=1 → use h₁(12)=12 mod 4=0
//   bucket[0]=[4,8,12]  ← full again already!

// INSERT 6: h₀(6)=0, 0 < sp=1 → h₁(6)=6 mod 4=2 → bucket[2]=[2,6]
// INSERT 5: h₀(5)=1, 1 >= sp=1 → h₀(5)=1 → bucket[1]=[5]
// INSERT 11: overflow trigger → SPLIT bucket[sp=1]:
// Create bucket[3] (= 3 + 1)
// Use h₁(k) = k mod 4 to redistribute bucket[1]=[5]:
//   h₁(5)=1 → stays in bucket[1]
// sp=2 now equals old_n=2? No, old_n was 2, sp=2 → YES, round complete
// level=1, sp=0, n=4, h_level = k mod 4 now

// SEARCH for k in linear hashing:
// h_current(k) = k mod (2^level × n₀)
// if result < sp: use h_next(k) = k mod (2^(level+1) × n₀)
// Look in that bucket (+ overflow chain if exists)
// Cost: O(1) average if overflow chains are short`}
        </CodeBox>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid var(--accent)', borderRadius: 10, padding: '18px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 10 }}>Linear Hashing Advantages</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'No directory — no directory doubling step, no directory memory overhead',
                'Smooth growth — one bucket splits at a time, no large reorganisation events',
                'Good space utilisation — load factor stays near the threshold',
                'Simpler implementation than extendible hashing',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0 }}>✓</span>
                  <Para>{item}</Para>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #f97316', borderRadius: 10, padding: '18px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f97316', marginBottom: 10 }}>Linear Hashing Disadvantages</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'Overflow chains exist temporarily on non-split-point buckets',
                'Split triggered by load factor, not by actual overflow — may split full buckets late',
                'Two hash functions must be maintained simultaneously during a level transition',
                'Still no support for range queries',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8 }}>
                  <span style={{ color: '#f97316', flexShrink: 0 }}>✗</span>
                  <Para>{item}</Para>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          PART 5 — B-TREE vs B+ TREE
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 05 — B-Tree vs B+ Tree" />
        <SectionTitle>B-Tree vs B+ Tree — Why Databases Chose B+ Trees</SectionTitle>

        <Para>
          Both B-trees and B+ trees are self-balancing multi-way search trees with
          guaranteed O(log n) search, insert, and delete. The distinction between
          them is subtle but has profound performance implications for database workloads.
          Understanding the difference explains a frequently asked interview question
          and a key design decision in every relational database.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #8b5cf6', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#8b5cf6', marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>B-Tree</div>
            <Para>
              Every node (both internal and leaf) stores key-value pairs.
              The actual data pointers live wherever the key lives in the tree —
              internal nodes store data too.
            </Para>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
              {[
                ['Search', 'May terminate early at an internal node if key found there'],
                ['Range scan', 'Must traverse the tree — no linked leaf list'],
                ['Node size', 'Smaller: internal nodes store keys + pointers to both children AND data'],
                ['Use case', 'Good for point lookups where keys are large and range scans are rare'],
              ].map(([prop, value]) => (
                <div key={prop} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#8b5cf6', marginBottom: 3, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.07em' }}>{prop}</div>
                  <Para>{value}</Para>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid var(--accent)', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--accent)', marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>B+ Tree</div>
            <Para>
              Internal nodes store only keys (for navigation).
              ALL data pointers live exclusively in leaf nodes.
              Leaf nodes are linked in a doubly-linked list.
            </Para>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
              {[
                ['Search', 'Always reaches a leaf node — no early termination'],
                ['Range scan', 'Find first matching leaf via tree, then follow linked list — O(log n + k)'],
                ['Node size', 'Larger fan-out: internal nodes store only keys, no data pointers → fit more keys per page → shallower tree'],
                ['Use case', 'The standard choice for database indexes — range queries are common'],
              ].map(([prop, value]) => (
                <div key={prop} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', marginBottom: 3, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.07em' }}>{prop}</div>
                  <Para>{value}</Para>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SubTitle>The Fan-Out Advantage — Why B+ Trees Are Shallower</SubTitle>

        <Para>
          The most important practical difference between B-trees and B+ trees is
          <strong style={{ color: 'var(--accent)' }}> fan-out</strong> — the number of
          children each internal node can have. A larger fan-out means a shallower tree,
          which means fewer page reads to find any key.
        </Para>

        <CodeBox label="Fan-out calculation — why B+ tree internal nodes hold more keys">
{`// ASSUMPTIONS:
// Page size = 8KB = 8192 bytes
// Key size = 8 bytes (64-bit integer)
// Data pointer = 8 bytes (row ID)
// Child pointer = 8 bytes (page number)

// B-TREE internal node:
// Each entry: [child_ptr | key | data_ptr] = 8+8+8 = 24 bytes
// Plus one extra child pointer at end
// Fan-out = (8192 - 8) / 24 ≈ 341 children per internal node

// B+ TREE internal node (keys only, no data pointers):
// Each entry: [child_ptr | key] = 8+8 = 16 bytes
// Plus one extra child pointer at end
// Fan-out = (8192 - 8) / 16 ≈ 511 children per internal node

// TREE HEIGHT COMPARISON for 50 million records:
// B-tree  height: ceil(log₃₄₁(50,000,000)) ≈ ceil(3.44) = 4 levels
// B+ tree height: ceil(log₅₁₁(50,000,000)) ≈ ceil(3.14) = 4 levels
// (similar at this scale)

// But for 50 BILLION records:
// B-tree  height: ceil(log₃₄₁(50,000,000,000)) ≈ ceil(5.98) = 6 levels
// B+ tree height: ceil(log₅₁₁(50,000,000,000)) ≈ ceil(5.69) = 6 levels

// More importantly: RANGE QUERY difference
// "Find all orders from Jan 2024" — 100,000 matching rows
// B-tree:  traverse tree for each matching row → 100,000 × O(log n) lookups
//          OR traverse in-order which requires going up and down the tree
// B+ tree: find first Jan 2024 leaf via tree traversal (O(log n) = 4 reads)
//          follow linked list through 100K matching leaf entries (sequential reads)
//          Total: 4 random reads + N sequential leaf page reads
//          Sequential reads are 4-10x faster than random reads on spinning disk

// THE DEFINITIVE REASON DATABASES USE B+ TREES:
// Range scans (WHERE date BETWEEN x AND y, ORDER BY col, etc.) are extremely common
// in database workloads. B+ tree's linked leaf list makes range scans as fast as
// a sequential scan of just the matching portion — without reading the entire table.`}
        </CodeBox>

        <Callout type="info">
          <strong>The interview answer in one sentence:</strong> B+ trees store data pointers
          only in leaf nodes (internal nodes are navigation-only), and leaf nodes are linked,
          making range scans a single tree traversal followed by a sequential linked-list walk.
          B-trees store data in all nodes, making point lookups potentially faster (early
          termination) but range scans expensive (requires tree traversal for each key).
          Databases use B+ trees because database workloads are dominated by range queries.
        </Callout>
      </section>

      {/* ========================================
          PART 6 — B+ TREE STRUCTURE IN DEPTH
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 06 — B+ Tree Structure" />
        <SectionTitle>B+ Tree Structure — Formal Definitions and Invariants</SectionTitle>

        <Para>
          A B+ tree of order n (also called a B+ tree with maximum degree n) satisfies
          the following structural invariants at all times. These invariants are what
          guarantee the O(log n) performance — if any invariant is violated,
          the tree must be repaired immediately (via split or merge operations).
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {[
            {
              invariant: 'Root node',
              color: '#0078d4',
              rule: 'The root has at least 2 children (unless the entire tree fits in the root — i.e., the tree has height 1). The root is the only node allowed to have fewer than the minimum number of keys.',
              formula: 'Root keys: between 1 and n−1 (min 1 because 2+ children need 1+ separator keys)',
            },
            {
              invariant: 'Internal nodes (non-root, non-leaf)',
              color: 'var(--accent)',
              rule: 'Each internal node has between ⌈n/2⌉ and n children. It has exactly (number of children − 1) keys. Keys in an internal node are separator values that guide the tree traversal.',
              formula: 'Children: ⌈n/2⌉ to n. Keys: ⌈n/2⌉−1 to n−1',
            },
            {
              invariant: 'Leaf nodes',
              color: '#f97316',
              rule: 'Each leaf holds between ⌈(n−1)/2⌉ and n−1 key-pointer pairs. All leaves are at the same level (the tree is perfectly balanced). Adjacent leaves are linked by pointers (doubly-linked list).',
              formula: 'Keys: ⌈(n−1)/2⌉ to n−1. Same level as every other leaf.',
            },
            {
              invariant: 'Search key ordering',
              color: '#8b5cf6',
              rule: 'For an internal node with keys K₁ < K₂ < ... < Kₘ and child pointers P₁, P₂, ..., Pₘ₊₁: all keys in the subtree rooted at Pᵢ are ≥ Kᵢ₋₁ and < Kᵢ. This ensures binary search property at every level.',
              formula: 'keys(Pᵢ) ∈ [Kᵢ₋₁, Kᵢ) for all valid i',
            },
            {
              invariant: 'All leaves at same level',
              color: '#facc15',
              rule: 'This is the balance invariant. Every path from the root to a leaf has exactly the same length. This guarantees O(log n) worst-case for all operations. Splits and merges maintain this invariant.',
              formula: 'height(all leaves) = constant = ⌈log_{⌈n/2⌉}(number of records)⌉',
            },
          ].map((item) => (
            <div key={item.invariant} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '16px 20px' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>{item.invariant}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: item.color, background: `${item.color}0e`, border: `1px solid ${item.color}25`, borderRadius: 5, padding: '2px 8px' }}>{item.formula}</span>
              </div>
              <Para>{item.rule}</Para>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 7 — B+ TREE SEARCH AND INSERT
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 07 — Search and Insert" />
        <SectionTitle>B+ Tree Search and Insertion — Step by Step With Splits</SectionTitle>

        <SubTitle>Search — Always Reaches a Leaf</SubTitle>

        <CodeBox label="B+ tree search algorithm — exact and range">
{`// EXACT SEARCH for key k in B+ tree:
node = root
while node is not a leaf:
    i = index such that key[i] <= k < key[i+1]
    node = child[i+1]   // follow the appropriate child pointer
// Now at a leaf node:
if k in node.keys:
    return node.pointer_for(k)  // found — follow pointer to actual row
else:
    return NOT_FOUND

// EXAMPLE: Search for k=45 in a tree of order 4
// Root: [20 | 40 | 60]  (3 keys → 4 children)
// 45 > 40 and 45 < 60 → follow third child pointer
// Internal node: [42 | 46]
// 45 > 42 and 45 < 46 → follow second child pointer
// Leaf node: [43 | 45 | 45*]
// 45 found! Follow pointer to row.

// RANGE SEARCH for k BETWEEN a AND b:
// Step 1: Search for a (exact search reaching a leaf)
node = leaf containing first key >= a
// Step 2: Follow linked list forward collecting all keys <= b
result = []
while node != null and node.keys.min <= b:
    for key in node.keys:
        if a <= key <= b:
            result.append(key)
    node = node.next_leaf  // follow linked list right pointer
return result

// COST: O(log_n(N)) tree traversal + O(k/capacity) leaf page reads
// k = number of matching keys, capacity = keys per leaf page
// This is optimal — no wasted reads of non-matching data`}
        </CodeBox>

        <SubTitle>Insertion — The Split Cascade</SubTitle>

        <Para>
          Insertion always begins at a leaf node. If the leaf has room, the key is
          inserted in sorted order — done. If the leaf is full, it splits into two
          leaves and the middle key is pushed up to the parent. If the parent is also
          full, it splits too, pushing its middle key further up. This cascade can
          reach the root — a root split increases the tree height by one.
        </Para>

        <CodeBox label="B+ tree insertion — complete walkthrough with leaf and internal splits">
{`// B+ TREE of ORDER 4 (max 3 keys per node, max 4 children per internal node)
// Min keys: internal nodes ≥ ⌈4/2⌉-1 = 1 key, leaf nodes ≥ ⌈3/2⌉ = 2 keys

// INITIAL STATE:
//                 [30 | 70]
//               /     |     \
//     [10|20]  [40|50|60]  [80|90]
// All are leaf nodes, linked: [10|20] ↔ [40|50|60] ↔ [80|90]

// INSERT k=25:
// Search: 25 < 30 → first child → leaf [10|20]
// Leaf [10|20] has room → insert in sorted order
// Leaf becomes [10|20|25]  ✓ (capacity 3, now full)

// INSERT k=35:
// Search: 30 < 35 < 70 → middle child → leaf [40|50|60]
// 35 < 40 → wait, 35 < 40 but we're in this leaf... actually:
// The separator 30 means: keys in left subtree < 30
// 30 ≤ 35 < 70 → middle child → leaf [40|50|60]
// Hmm, 35 < 40. This should go in the leaf that contains values between 30 and 40.
// Actually in a B+ tree the key 30 in the parent means:
// Left child ≤ 30, middle child between 30 and 70
// 35 ≥ 30 → middle child
// Middle leaf [40|50|60] is full (3 keys) → SPLIT

// LEAF SPLIT of [40|50|60] when inserting 35:
// Temporary: [35|40|50|60] (4 keys — overflow, then split)
// Left new leaf:  [35|40]
// Right new leaf: [50|60]
// Push COPY of first key in right leaf up to parent: push up 50
// Parent was: [30|70], becomes [30|50|70]
// Update leaf linked list: [10|20|25] ↔ [35|40] ↔ [50|60] ↔ [80|90]

// INSERT k=15:
// 15 < 30 → left leaf [10|20|25]
// Leaf is FULL (3 keys) → SPLIT
// Temporary: [10|15|20|25]
// Left leaf:  [10|15]
// Right leaf: [20|25]
// Push copy of 20 up to parent
// Parent was: [30|50|70], becomes [20|30|50|70] — 4 keys → OVERFLOW

// INTERNAL NODE SPLIT of [20|30|50|70]:
// This is the root (or parent internal node)
// Split: left internal node [20|30], right internal node [50|70]
// Middle key 50? Wait — for internal nodes the MIDDLE key is PUSHED UP (not copied)
// Keys: [20|30|50|70]
// Middle = 50 → push 50 up
// Left internal:  [20|30] with appropriate children
// Right internal: [70] with appropriate children
// If this was the root: create new root [50] with left and right as children
// Tree height increases by 1

// KEY RULE FOR SPLITS:
// LEAF split: copy the first key of the right half up to parent (key stays in leaf too)
// INTERNAL split: push the middle key up to parent (key is REMOVED from the split node)

// FINAL STATE (after all insertions):
//               [50]
//              /    \
//         [20|30]   [70]
//        /   |   \    |   \
// [10|15] [20|25] [35|40] [50|60] [80|90]`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 8 — B+ TREE DELETION
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 08 — Deletion and Merges" />
        <SectionTitle>B+ Tree Deletion — Merges and Redistributions</SectionTitle>

        <Para>
          Deletion is the inverse of insertion. After removing a key from a leaf,
          if the leaf falls below the minimum occupancy threshold, the tree must
          be repaired. There are two possible repairs: borrow a key from a sibling
          (redistribution) if the sibling has keys to spare, or merge with a sibling
          if neither has spare keys. Merging reduces the number of nodes and may
          cascade up the tree, potentially reducing its height.
        </Para>

        <CodeBox label="B+ tree deletion — redistribution and merge with complete examples">
{`// DELETION ALGORITHM:
// 1. Find the leaf containing the key
// 2. Remove the key from the leaf
// 3. If leaf still has >= minimum keys: done (update parent separator if needed)
// 4. If leaf has < minimum keys: UNDERFLOW
//    a. Try to borrow from left sibling (redistribution)
//    b. Try to borrow from right sibling (redistribution)
//    c. If neither works: merge with a sibling

// ─────────────────────────────────────────────────────────────────
// EXAMPLE TREE (order 4, min keys in leaf = 2):
//            [30 | 70]
//           /    |    \
//    [10|20] [40|50|60] [80|90]
// ─────────────────────────────────────────────────────────────────

// DELETE k=60:
// Leaf [40|50|60] → remove 60 → [40|50]
// Still has 2 keys (minimum) → NO UNDERFLOW → done ✓
//            [30 | 70]
//           /    |    \
//    [10|20] [40|50] [80|90]

// DELETE k=10:
// Leaf [10|20] → remove 10 → [20]
// Only 1 key < minimum (2) → UNDERFLOW

// CHECK LEFT SIBLING: none (leftmost leaf)
// CHECK RIGHT SIBLING: [40|50] → has 2 keys = minimum → cannot borrow
//   (borrowing would leave sibling with 1 key, also below minimum)

// MERGE: merge [20] with right sibling [40|50]
// Merged leaf: [20|40|50]
// Remove separator key 30 from parent (30 separated these two leaves)
// Parent becomes [70]

// UPDATE LEAF LIST: remove the merged-in leaf from the chain

// PARENT [70] now has only 1 key and 2 children — is this valid?
// Root node: minimum is 1 key (root can have as few as 1 key and 2 children)
// So [70] as root is valid ✓

// FINAL STATE:
//         [70]
//        /    \
// [20|40|50] [80|90]

// ─────────────────────────────────────────────────────────────────
// DELETE WITH REDISTRIBUTION EXAMPLE:
// ─────────────────────────────────────────────────────────────────
// Tree (order 4):
//          [50]
//         /    \
//   [20|30|40] [60|70]

// DELETE k=60:
// Leaf [60|70] → remove 60 → [70]
// Only 1 key < minimum (2) → UNDERFLOW
// LEFT SIBLING [20|30|40] has 3 keys > minimum → CAN BORROW

// REDISTRIBUTION (borrow from left sibling):
// Move the LARGEST key from left sibling (40) to the underflowing leaf
// Underflowing leaf becomes [40|70]
// Update separator in parent: was 50, now becomes 40
//   (50 was the boundary between left and right; now 40 is the boundary)

// FINAL STATE:
//          [40]
//         /    \
//   [20|30] [40|70]   ← wait, 40 appears in both parent and right leaf
// In B+ tree: leaf contains 40 (it's actual data), parent contains copy as separator
// This is correct! Parent's 40 means: left subtree < 40, right subtree >= 40
// [20|30] < 40 ✓, [40|70] >= 40 ✓

// KEY REDISTRIBUTION RULES:
// Borrow from LEFT sibling:
//   → move largest key from left sibling to start of underflowing leaf
//   → update parent separator to be the new smallest key of the right leaf
// Borrow from RIGHT sibling:
//   → move smallest key from right sibling to end of underflowing leaf
//   → update parent separator to be the new smallest key of the right sibling`}
        </CodeBox>

        <SubTitle>Merge vs Redistribute — The Decision Rule</SubTitle>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 10, padding: '18px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>Redistribute (Borrow)</div>
            <Para><strong style={{ color: 'var(--text)' }}>When:</strong> At least one sibling has more than the minimum number of keys (can spare a key without going underflow itself).</Para>
            <Para><strong style={{ color: 'var(--text)' }}>What happens:</strong> Move one key from sibling to underflowing node. Update parent separator. Tree structure unchanged — same number of nodes.</Para>
            <Para><strong style={{ color: 'var(--text)' }}>Cost:</strong> O(1) — modify two leaf nodes and one parent separator.</Para>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.3)', borderRadius: 10, padding: '18px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#ff4757', marginBottom: 8 }}>Merge</div>
            <Para><strong style={{ color: 'var(--text)' }}>When:</strong> Both siblings are at minimum occupancy (neither can spare a key). Must combine two nodes into one.</Para>
            <Para><strong style={{ color: 'var(--text)' }}>What happens:</strong> Concatenate underflowing node and sibling. Remove separator from parent. Parent loses a key — may cause recursive underflow up the tree.</Para>
            <Para><strong style={{ color: 'var(--text)' }}>Cost:</strong> O(log n) in worst case — cascade of merges up to root. Root with 1 child → remove root → tree shrinks by one level.</Para>
          </div>
        </div>
      </section>

      {/* ========================================
          PART 9 — BULK LOADING
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 09 — Bulk Loading" />
        <SectionTitle>B+ Tree Bulk Loading — Building a Tree From Scratch Efficiently</SectionTitle>

        <Para>
          Inserting N records one at a time into a B+ tree takes O(N log N) time —
          each of the N inserts costs O(log N). For building an index on an existing
          table with millions of rows, this is acceptable but not optimal.
          <strong style={{ color: 'var(--accent)' }}> Bulk loading</strong> builds the
          entire B+ tree in O(N) time by sorting the data first and building the tree
          bottom-up — creating leaf pages directly, then building the internal pages
          layer by layer above them.
        </Para>

        <CodeBox label="Bulk loading algorithm — O(N) B+ tree construction">
{`// BULK LOADING ALGORITHM:

// Step 1: Sort all N key-pointer pairs by key
// Cost: O(N log N) for external sort
// After sort: [1,ptr] [2,ptr] [4,ptr] [7,ptr] [8,ptr] [10,ptr] [12,ptr] ...

// Step 2: Fill leaf pages to ~67% capacity (leave room for future inserts)
// Why 67%? Inserting into a nearly-full tree causes immediate splits.
// Pre-loading to 67% gives ~33% free space for growth before first split.
// Fill factor is configurable: CREATE INDEX ... WITH (fillfactor=70)

// Create leaf pages in order:
// Leaf 1: [1 | 2 | 4]      (3 keys at ~67% of capacity-4 leaf)
// Leaf 2: [7 | 8 | 10]
// Leaf 3: [12 | 15 | 18]
// Leaf 4: [20 | 25]        (last leaf, partially filled)
// Link leaves: L1 ↔ L2 ↔ L3 ↔ L4

// Step 3: Build internal nodes using FIRST KEY of each leaf (except the first)
// First key of L2 = 7, L3 = 12, L4 = 20
// Create internal node: [7 | 12 | 20]  → 4 children (3 keys, 4 pointers)
// If more leaves exist than fit one internal node: recurse upward

// Step 4: If multiple internal nodes created, build the next level
// Continue until only one node remains → that is the root

// RESULT: fully-built B+ tree in O(N log N) time
// (dominated by the sort step; tree construction is O(N))

// POSTGRESQL BULK LOADING (happens automatically during CREATE INDEX):
CREATE INDEX idx_orders_date ON orders(order_date);
-- PostgreSQL sorts the column values (using work_mem for in-memory sort)
-- Then builds the B+ tree bottom-up using the bulk loading algorithm
-- This is why CREATE INDEX is faster than inserting rows one at a time

-- FILL FACTOR control:
CREATE INDEX idx_orders_date ON orders(order_date) WITH (fillfactor = 70);
-- Leaves filled to 70% during bulk load
-- Leaves: more free space for inserts → fewer splits
-- Trade-off: slightly larger index (more pages) but better write performance`}
        </CodeBox>

        <Callout type="tip">
          <strong>Why this matters for data engineering:</strong> When loading large datasets
          (ETL pipelines, data warehouse loads), the standard practice is: drop indexes,
          load data, rebuild indexes with bulk loading. Bulk loading the index on 100M rows
          after a full table load is far faster than maintaining the index during the load
          (which would trigger millions of individual inserts into the index, each with
          potential splits). This is one of the first performance optimisations every
          data engineer learns in production.
        </Callout>
      </section>

      {/* ========================================
          PART 10 — EXAM PATTERNS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 10 — Exam Patterns" />
        <SectionTitle>GATE and Interview Exam Patterns — Every Question Type With Solutions</SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0078d4', marginBottom: 16 }}>Pattern 1 — B+ Tree Height Calculation</div>
            <Para>
              Given: B+ tree of order n, storing N records. Find the minimum and maximum height.
            </Para>
            <CodeBox>
{`// MAXIMUM HEIGHT (minimum fan-out at every level):
// Internal nodes: minimum ⌈n/2⌉ children
// Leaf nodes: minimum ⌈(n-1)/2⌉ keys
// Max height = ⌈log_{⌈n/2⌉}(N / ⌈(n-1)/2⌉)⌉ + 1  (rough upper bound)

// MINIMUM HEIGHT (maximum fan-out at every level):
// All internal nodes have n children (full)
// All leaf nodes have n-1 keys (full)
// Min height = ⌈log_n(N / (n-1))⌉ + 1

// COMMON EXAM QUESTION:
// Q: A B+ tree of order 10 has 1 million records.
//    What is the minimum number of disk accesses to find a record?

// Order 10 means: max 9 keys per node, max 10 children per internal node
// Min fan-out for internal = ⌈10/2⌉ = 5
// Min keys per leaf = ⌈9/2⌉ = 5

// Height = ⌈log₁₀(1,000,000 / 9)⌉ + 1 = ⌈log₁₀(111,111)⌉ + 1
//        = ⌈5.05⌉ + 1 = 6 + 1 = 7 levels total
// But minimum height (all nodes full):
// Height = ⌈log₁₀(1,000,000)⌉ = ⌈6⌉ = 6 levels
// Disk accesses to find a record = tree height = 6 (one page read per level)

// ANSWER: minimum disk accesses = ceil(log₁₀(N)) where N = number of records
// With root always in buffer pool: height - 1 disk accesses`}
            </CodeBox>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 16 }}>Pattern 2 — Count nodes after N insertions</div>
            <CodeBox>
{`// Q: A B+ tree of order 3 (max 2 keys per node) starts empty.
//    How many leaf nodes after inserting keys: 10, 20, 30, 40, 50, 60?

// Order 3: max 2 keys per leaf, max 2 keys per internal node

// INSERT 10: Leaf L1=[10]
// INSERT 20: L1=[10|20] — full
// INSERT 30: OVERFLOW → split L1
//   L1=[10], L2=[20|30], push 20 to root
//   Root=[20], leaves: [10] ↔ [20|30]
// INSERT 40: 40>20 → L2=[20|30] full → SPLIT
//   L2=[20], L3=[30|40], push 30 to root
//   Root=[20|30], leaves: [10] ↔ [20] ↔ [30|40]
// INSERT 50: 50>30 → L3=[30|40] full → SPLIT
//   L3=[30], L4=[40|50], push 40 to root
//   Root=[20|30|40] — root is now FULL
//   Wait, order 3 means max 2 keys per root too
//   Root overflow → split root
//   Left=[20], Right=[40], new root=[30]
//   Children of Left=[20]: [10] and [20]
//   Children of Right=[40]: [30] and [40|50]
//   Tree height = 3 now

// INSERT 60: 60>30 → right subtree → [40|50] full → split
//   [40], [50|60], push 50 to parent [40]
//   Parent [40] becomes [40|50] — full

// FINAL STATE: 6 leaf nodes
// Answer: 6 leaf nodes for 6 inserted keys (each key in its own leaf after splits)`}
            </CodeBox>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f97316', marginBottom: 16 }}>Pattern 3 — Extendible Hashing Directory Size</div>
            <CodeBox>
{`// Q: An extendible hash index has global depth 3.
//    Bucket B has local depth 2. How many directory entries point to B?

// Number of entries pointing to bucket B
// = 2^(global_depth - local_depth_B)
// = 2^(3 - 2) = 2^1 = 2 entries

// INTUITION: If global depth = 3, directory has 8 entries (000 to 111).
// Bucket B with local_depth=2 uses only last 2 bits.
// Two 3-bit prefixes share the same last 2 bits with B's prefix:
// If B was created for prefix "10": directory entries "010" and "110" both point to B.
// That's 2 entries → matches our formula.

// GENERAL RULE: entries pointing to bucket = 2^(global - local)
// global=local: exactly 1 entry points to this bucket
//   → next overflow of this bucket will force a directory doubling
// global > local: multiple entries share this bucket
//   → overflow can split without directory doubling

// Q: After a split of bucket B, what is its new local depth?
// New local depth = old local depth + 1 = 2 + 1 = 3
// After split: each of the 2 half-buckets has local_depth=3 = global_depth=3
// The next overflow of either half will require directory doubling again`}
            </CodeBox>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#8b5cf6', marginBottom: 16 }}>Pattern 4 — B+ Tree vs Hash Index Choice</div>
            <CodeBox>
{`// For each query, which index type is more appropriate?

// Q1: SELECT * FROM employees WHERE emp_id = 42
// Answer: Either B+ tree or hash index — equality on primary key
// Hash is theoretically O(1) vs O(log n) but difference is negligible in practice
// B+ tree preferred in PostgreSQL (hash index has additional maintenance cost)

// Q2: SELECT * FROM orders WHERE total_amount BETWEEN 500 AND 1000
// Answer: B+ TREE only
// Hash index destroys order — cannot answer range queries
// B+ tree: find first key ≥ 500 via tree traversal, follow leaf list to 1000

// Q3: SELECT * FROM sessions WHERE session_token = 'abc123xyz...'
// Answer: HASH index preferred
// Pure equality on a high-cardinality column
// Session token never used in ranges or ORDER BY
// Hash index: O(1) lookup

// Q4: SELECT * FROM customers ORDER BY last_name LIMIT 100
// Answer: B+ TREE only
// Hash: no ordering → full sort required
// B+ tree on last_name: leaf list is already in sorted order → read first 100 leaves

// Q5: SELECT * FROM products WHERE category = 'Electronics' ORDER BY price DESC
// Answer: B+ TREE on (category, price DESC)
// Composite index covers both the filter and the sort
// Hash cannot handle the ORDER BY

// DECISION RULE:
// Use hash index: pure equality lookups, no ranges, no ordering, very high cardinality
// Use B+ tree: everything else (ranges, ordering, composite conditions)`}
            </CodeBox>
          </div>
        </div>
      </section>

      {/* ========================================
          PART 11 — WHAT THIS LOOKS LIKE AT WORK
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 11 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>💼 What This Looks Like at Work</div>
        <SectionTitle>Choosing the Right Index Structure — A Real Schema Decision</SectionTitle>

        <Para>
          The knowledge from this module directly informs every index design decision.
          Here is a realistic scenario showing how to apply it.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Stripe — Payment lookup service schema design
          </div>

          <Para>The payments table receives 50,000 inserts per second and must support these query patterns:</Para>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {[
              { query: 'Q1: Find payment by payment_id (API: GET /payments/:id)', pattern: 'Exact equality on primary key', choice: 'B+ tree on payment_id (PK) — default, automatically created', reason: 'Primary key range queries do happen (paginate payments by ID), and the clustered PK index means the data row is at the leaf — no heap fetch needed.' },
              { query: 'Q2: Authenticate request by API key (every API call validates the key)', pattern: 'Pure equality: WHERE api_key = $1', choice: 'Hash index on api_key — 100,000 validations/second', reason: 'api_key is a 32-byte random string, never used in ranges or ORDER BY. Hash index gives near-O(1) lookup vs O(log n) for B+ tree. At 100K QPS, this difference matters.' },
              { query: 'Q3: Get all payments for a merchant in a date range', pattern: 'WHERE merchant_id = $1 AND created_at BETWEEN $2 AND $3', choice: 'B+ tree composite index on (merchant_id, created_at)', reason: 'merchant_id equality narrows to one merchant\'s records, created_at range further filters. Composite B+ tree handles both in one traversal. Hash cannot handle the date range.' },
              { query: 'Q4: Get all failed payments for fraud detection dashboard', pattern: 'WHERE status = \'failed\'', choice: 'Partial B+ tree index: WHERE status = \'failed\'', reason: 'Only ~2% of payments fail. Partial index covers 2% of rows — 50x smaller and faster than a full index on status. B+ tree (not hash) because the dashboard also sorts by created_at.' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{item.query}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 10, marginTop: 8 }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', marginBottom: 3, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.07em' }}>Pattern</div>
                    <Para>{item.pattern}</Para>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', marginBottom: 3, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.07em' }}>Choice</div>
                    <Para>{item.choice}</Para>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#0078d4', marginBottom: 3, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.07em' }}>Why</div>
                    <Para>{item.reason}</Para>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <CodeBox label="The resulting schema with all indexes">
{`CREATE TABLE payments (
    payment_id   UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id  VARCHAR(30)   NOT NULL,
    api_key      VARCHAR(64)   NOT NULL,
    amount       DECIMAL(15,2) NOT NULL,
    currency     CHAR(3)       NOT NULL DEFAULT 'INR',
    status       VARCHAR(20)   NOT NULL DEFAULT 'created',
    created_at   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Q1: Primary key B+ tree index — created automatically
-- (payment_id is the clustered index in PostgreSQL via CLUSTER, or implicit in MySQL InnoDB)

-- Q2: Hash index for pure equality API key lookups
CREATE INDEX idx_payments_apikey ON payments USING HASH(api_key);

-- Q3: Composite B+ tree for merchant + date range queries
CREATE INDEX idx_payments_merchant_date ON payments(merchant_id, created_at DESC);

-- Q4: Partial B+ tree for failed payments only
CREATE INDEX idx_payments_failed ON payments(created_at DESC)
WHERE status = 'failed';

-- BULK LOAD CONSIDERATION:
-- When loading historical payment data (100M rows):
-- 1. Load data with no indexes except PRIMARY KEY
-- 2. After load completes:
CREATE INDEX CONCURRENTLY idx_payments_apikey ON payments USING HASH(api_key);
CREATE INDEX CONCURRENTLY idx_payments_merchant_date ON payments(merchant_id, created_at DESC);
CREATE INDEX CONCURRENTLY idx_payments_failed ON payments(created_at DESC) WHERE status='failed';
-- CONCURRENTLY: builds indexes without locking the table`}
          </CodeBox>
        </div>
      </section>

      {/* ========================================
          PART 12 — INTERVIEW QUESTIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 12 — Interview Prep" />
        <SectionTitle>Hashing and B+ Tree Interview Questions — Complete Answers</SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              q: 'What is the difference between static, extendible, and linear hashing?',
              color: '#0078d4',
              a: 'Static hashing uses a fixed number of buckets that never changes. When buckets fill, overflow pages are chained. Performance degrades as overflow chains grow, and the only fix is a full rehash (rebuild with more buckets). Extendible hashing uses a directory of pointers with a global depth d (directory has 2^d entries). Each bucket has a local depth. When a bucket overflows, only that bucket splits — the directory doubles only when the split bucket\'s local depth equals global depth. Multiple directory entries can point to the same bucket. Linear hashing has no directory. It splits buckets in a fixed linear order using a split pointer sp. When any bucket overflows, the bucket at sp splits (not the overflowing one), and sp advances. Two hash functions are maintained during a level transition. Linear hashing produces overflow chains temporarily but eliminates them when each bucket\'s split turn comes.',
            },
            {
              q: 'Why do databases use B+ trees instead of B-trees for indexes?',
              color: 'var(--accent)',
              a: 'Three reasons. First, larger fan-out: B+ tree internal nodes store only keys (no data pointers), fitting more keys per page and producing a shallower tree with fewer page reads per lookup. Second, efficient range scans: B+ tree leaf nodes are connected in a doubly-linked list. After finding the first matching key via tree traversal, a range scan follows the linked list sequentially — reading each leaf page once, in order. B-trees have no leaf list; range scans require expensive tree traversals between each key. Database workloads are dominated by range queries (WHERE date BETWEEN, ORDER BY, LIMIT), making the linked leaf list a critical advantage. Third, predictable I/O: every B+ tree lookup always reaches a leaf node (no early termination at internal nodes like B-trees). This makes I/O cost predictable and cache behaviour consistent.',
            },
            {
              q: 'In a B+ tree of order n, what is the minimum and maximum number of keys in a leaf node?',
              color: '#f97316',
              a: 'A B+ tree of order n (maximum n children per internal node, maximum n-1 keys per leaf) has the following leaf key bounds: Maximum keys in a leaf = n-1 (a completely full leaf). Minimum keys in a leaf = ⌈(n-1)/2⌉ (half full, rounded up). The root is a special case — if the tree has height 1 (root is also a leaf), the root-leaf can have as few as 1 key. For non-root leaves, the minimum is ⌈(n-1)/2⌉. Example: B+ tree of order 5. Max keys per leaf = 4. Min keys per leaf = ⌈4/2⌉ = 2. Any leaf with fewer than 2 keys has underflowed and must be redistributed or merged.',
            },
            {
              q: 'When does a B+ tree grow in height?',
              color: '#8b5cf6',
              a: 'A B+ tree grows in height exactly when the root node splits. The root is the only node without a parent to push a key into. When an insertion causes a leaf to overflow, the overflow propagates upward via splits. If the split cascade reaches the root, the root also splits — but there is no parent to receive the pushed-up key. Instead, a new root is created containing just the single pushed-up key, with the two halves of the old root as its children. The tree height increases by exactly one. This is the only way the tree grows taller. Symmetrically, the tree shrinks in height when the root is left with only one child (after a merge removes a separator from the root), in which case the root is removed and its single child becomes the new root.',
            },
            {
              q: 'An extendible hash index has global depth 3 and a bucket with local depth 2. If this bucket overflows, does the directory double?',
              color: '#facc15',
              a: 'No, the directory does not double. The directory doubles only when the overflowing bucket\'s local depth equals the global depth. Here, local depth 2 < global depth 3, so the directory does not double. The split creates a new bucket. The two directory entries that currently point to this bucket (2^(3-2) = 2 entries share this bucket) are redistributed: one continues pointing to the original bucket, and the other points to the new split bucket. The local depth of both resulting buckets increases to 3. After the split, both new buckets have local depth = global depth = 3, meaning the next overflow of either would require a directory doubling.',
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
        'Hash functions map keys to bucket numbers, destroying order information. Good hash functions are uniform, deterministic, and fast. Division method (k mod N) is simple. Multiplicative and polynomial methods handle skewed distributions better.',
        'Static hashing: fixed N buckets, overflow chains when full. Performance degrades as chains grow. Rebuild (rehash) required to fix — O(n) full reconstruction. Good for stable, predictable data volumes.',
        'Extendible hashing: directory of 2^d entries, each bucket has local depth d_i. When bucket overflows: split that bucket, increase its local depth. Directory doubles only when local depth = global depth. Multiple directory entries point to same bucket. O(1) lookup when directory fits in memory.',
        'Linear hashing: no directory. Split pointer advances through buckets in order. Splits triggered by load factor, not by which bucket overflowed. Two hash functions during level transition. Overflow chains exist temporarily. Smooth growth, no large reorganisation events.',
        'B-tree: stores data pointers in ALL nodes (internal and leaf). Early termination possible on internal node hit. No leaf linked list — range scans expensive. B+ tree: data pointers ONLY in leaf nodes. Internal nodes store keys only for navigation. All leaf nodes linked in doubly-linked list — range scans are efficient sequential leaf traversals.',
        'B+ tree higher fan-out: internal nodes without data pointers fit more keys per page. B+ tree of order 511 on 50M records: 3-4 levels deep. Shallower tree = fewer disk reads per lookup.',
        'B+ tree insertion: find leaf, insert in order. If leaf full → split: copy middle key to parent, split leaf into two. If parent full → recursive split upward. Root split → tree grows one level. Leaf split copies key up; internal split pushes key up (removed from the split node).',
        'B+ tree deletion: find leaf, remove key. If underflow: try redistribution (borrow from sibling — O(1)). If redistribution impossible: merge with sibling, remove separator from parent — may cascade upward. Root with one child → remove root, child becomes new root — tree shrinks.',
        'Bulk loading: sort data, fill leaf pages to ~67% (fillfactor), build internal pages bottom-up. O(N log N) total (dominated by sort), far faster than N individual inserts. PostgreSQL uses bulk loading for CREATE INDEX. Always: drop indexes before bulk data load, rebuild after.',
        'B+ tree height for N records, order n: ≈ ⌈log_{n}(N)⌉. For order 10, 1M records: height ≈ 6. Each level = one disk read. Tree height determines worst-case lookup cost. With root cached in buffer pool: height-1 disk reads per lookup.',
      ]} />

    </LearnLayout>
  )
}