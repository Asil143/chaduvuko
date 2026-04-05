'use client'
import React from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import Link from 'next/link'

const CodeBlock = ({ code, language = 'c' }: { code: string; language?: string }) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderCode = (raw: string) => {
    return raw.split('\n').map((line, i) => {
      const slashIdx = line.indexOf('//')
      const blockStart = line.indexOf('/*')
      const blockEnd = line.indexOf('*/')
      if (slashIdx !== -1) {
        return (
          <div key={i}>
            <span>{line.slice(0, slashIdx)}</span>
            <span style={{ color: '#6a9955', fontStyle: 'italic' }}>{line.slice(slashIdx)}</span>
          </div>
        )
      }
      if (blockStart !== -1 && blockEnd !== -1) {
        return (
          <div key={i}>
            <span>{line.slice(0, blockStart)}</span>
            <span style={{ color: '#6a9955', fontStyle: 'italic' }}>{line.slice(blockStart, blockEnd + 2)}</span>
            <span>{line.slice(blockEnd + 2)}</span>
          </div>
        )
      }
      return <div key={i}>{line || ' '}</div>
    })
  }

  return (
    <div style={{ background: '#0d0d0d', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', margin: '20px 0' }}>
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
          </div>
          <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginLeft: 6 }}>{language}</span>
        </div>
        <button onClick={handleCopy} style={{ background: copied ? 'rgba(0,230,118,0.15)' : 'var(--bg2)', border: `1px solid ${copied ? 'rgba(0,230,118,0.4)' : 'var(--border)'}`, borderRadius: 6, padding: '4px 12px', fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 600, color: copied ? 'var(--green)' : 'var(--muted)', cursor: 'pointer', transition: 'all 0.2s' }}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre style={{ margin: 0, padding: '20px 24px', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.75, color: '#e0e0e0' }}>
        <code>{renderCode(code)}</code>
      </pre>
    </div>
  )
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>
    // {text}
  </div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
    {children}
  </h2>
)

const Divider = () => (
  <div style={{ height: 1, background: 'var(--border)', margin: '48px 0' }} />
)

const ComplexityBadge = ({ value, color }: { value: string; color: string }) => (
  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color, background: `${color}15`, border: `1px solid ${color}33`, borderRadius: 6, padding: '3px 10px' }}>
    {value}
  </span>
)

export default function ArraysPage() {
  return (
    <LearnLayout
      title="Unit 02 — Arrays"
      description="The first and most fundamental data structure. Boxes lined up in memory — simple to understand, powerful in practice, used absolutely everywhere."
      section="DSA"
      readTime="90 min"
      updatedAt="March 2026"
    >

      {/* ── Badges ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'UNIT 02', green: true },
          { label: 'Prerequisite: Unit 00 + Unit 01', green: false },
          { label: '90 min read', green: false },
        ].map((b) => (
          <span key={b.label} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: b.green ? 700 : 600, color: b.green ? 'var(--green)' : 'var(--muted)', background: b.green ? 'rgba(0,230,118,0.1)' : 'var(--surface)', border: `1px solid ${b.green ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`, borderRadius: 6, padding: '4px 10px' }}>
            {b.label}
          </span>
        ))}
      </div>

      <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Everything in data structures starts here. Linked lists, stacks, queues, heaps,
        graphs — they all either use arrays internally or are compared against arrays.
        If you understand arrays deeply, the rest of DSA becomes much easier to learn.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>
        In this unit we build arrays from scratch in C, understand exactly how they
        live in your computer's memory, and implement every core operation with full
        code and complexity analysis.
      </p>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 1 — WHAT IS AN ARRAY
      ══════════════════════════════════════ */}
      <SectionTag text="Section 1" />
      <SectionTitle>What is an Array?</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        An array is a collection of items stored at <strong style={{ color: 'var(--green)' }}>
        contiguous (back-to-back) memory locations</strong>, where every item is of
        the same data type.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 24 }}>
        The word <em>contiguous</em> is the key. It means the items do not scatter
        randomly in RAM — they sit in a neat, unbroken row. This single property
        is what gives arrays their superpower: accessing any element instantly in O(1).
      </p>

      {/* Analogy */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 14 }}>
          🪑 Think of a row of seats in a cinema
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 16 }}>
          Imagine Row A in a cinema hall. It has seats A1, A2, A3, A4, A5 — all
          in a straight line, numbered from left to right. Every seat exists, every seat
          has a number, and they are all together.
        </p>

        {/* Visual seats */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {[
            { idx: 0, val: 10, label: 'A1' },
            { idx: 1, val: 25, label: 'A2' },
            { idx: 2, val: 8, label: 'A3' },
            { idx: 3, val: 47, label: 'A4' },
            { idx: 4, val: 33, label: 'A5' },
          ].map((seat) => (
            <div key={seat.idx} style={{ textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, border: '2px solid var(--green)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: 'var(--green)', fontFamily: 'var(--font-mono)', background: 'rgba(0,230,118,0.06)' }}>
                {seat.val}
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>
                index [{seat.idx}]
              </div>
              <div style={{ fontSize: 11, color: 'var(--text)', marginTop: 2 }}>{seat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', marginBottom: 6 }}>Seat number = Array Index</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>
              Just like seat A3 always means the 3rd seat, index [2] always means the 3rd element.
              (We count from 0, not 1 — more on that shortly.)
            </div>
          </div>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', marginBottom: 6 }}>Row = Contiguous memory</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>
              All seats are in one row — just like all array elements occupy one
              unbroken stretch of RAM. No gaps, no random jumps.
            </div>
          </div>
        </div>
      </div>

      <Callout type="info">
        <strong>Why does contiguous memory matter?</strong> Because the computer can calculate
        the exact address of any element using simple math: <br />
        <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>address of arr[i] = base address + (i × size of one element)</code><br />
        This is why accessing arr[999] is just as fast as accessing arr[0]. No searching needed — pure arithmetic.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 2 — ARRAYS IN MEMORY
      ══════════════════════════════════════ */}
      <SectionTag text="Section 2" />
      <SectionTitle>How Arrays Sit in Memory</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Let us go one level deeper and see exactly what happens in RAM when you
        create an array in C. This is the part most tutorials skip — and it is
        the part that makes everything else click.
      </p>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 12 }}>
        Say you declare this:
      </p>

      <CodeBlock code={`int marks[5] = {85, 92, 78, 60, 95};`} />

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        An <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>int</code> takes
        4 bytes in C. So 5 integers need 5 × 4 = 20 bytes of contiguous RAM.
        Here is what that looks like:
      </p>

      {/* Memory layout visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '28px 24px', marginBottom: 24, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 20, fontFamily: 'var(--font-mono)' }}>
          // int marks[5] in RAM — each cell = 4 bytes
        </div>
        <div style={{ display: 'flex', gap: 0, minWidth: 500 }}>
          {[
            { addr: '0x2000', val: '85', idx: 0 },
            { addr: '0x2004', val: '92', idx: 1 },
            { addr: '0x2008', val: '78', idx: 2 },
            { addr: '0x200C', val: '60', idx: 3 },
            { addr: '0x2010', val: '95', idx: 4 },
          ].map((cell, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', borderRight: i < 4 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ padding: '14px 8px', background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.2)', borderRight: 'none', fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 800, color: 'var(--green)' }}>
                {cell.val}
              </div>
              <div style={{ fontSize: 10, color: '#4285f4', marginTop: 6, fontFamily: 'var(--font-mono)' }}>{cell.addr}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>marks[{cell.idx}]</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
            ↑ base address: 0x2000
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
            each step = +4 bytes (size of int)
          </div>
        </div>
      </div>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        To find <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>marks[3]</code>,
        the computer does:
      </p>
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted)', lineHeight: 2, marginBottom: 24 }}>
        address = base + (index × size)<br />
        address = 0x2000 + (3 × 4)<br />
        address = 0x2000 + 12<br />
        address = 0x200C → value is 60 ✓
      </div>

      <Callout type="tip">
        <strong>This is why arrays start at index 0, not 1.</strong> Index 0 means
        "0 steps from the base." If arrays started at 1, every access would need
        an extra subtraction. Starting at 0 makes the address formula perfectly clean.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 3 — DECLARING ARRAYS IN C
      ══════════════════════════════════════ */}
      <SectionTag text="Section 3" />
      <SectionTitle>Declaring and Accessing Arrays in C</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        There are three ways to create an array in C. Each one is useful in different situations.
      </p>

      <CodeBlock code={`#include <stdio.h>

int main() {

    /* Method 1: declare with size, fill values later */
    int scores[5];
    scores[0] = 10;
    scores[1] = 20;
    scores[2] = 30;
    scores[3] = 40;
    scores[4] = 50;

    /* Method 2: declare and initialise together */
    int marks[5] = {85, 92, 78, 60, 95};

    /* Method 3: let C count the size for you */
    int ages[] = {18, 22, 25, 30};  /* compiler sets size to 4 */

    /* Accessing elements — always use index */
    printf("First mark: %d\\n", marks[0]);   /* prints 85 */
    printf("Third mark: %d\\n", marks[2]);   /* prints 78 */
    printf("Last mark:  %d\\n", marks[4]);   /* prints 95 */

    return 0;
}`} />

      <Callout type="warning">
        <strong>The off-by-one mistake — the most common array error ever.</strong> An array
        of size 5 has valid indices 0, 1, 2, 3, 4. Accessing <code style={{ fontFamily: 'var(--font-mono)' }}>arr[5]</code> goes
        out of bounds — you are reading memory that does not belong to you. C will not warn
        you. It will silently read garbage data or crash your program. Always remember:
        last valid index = size − 1.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 4 — TRAVERSAL
      ══════════════════════════════════════ */}
      <SectionTag text="Section 4" />
      <SectionTitle>Traversal — Visiting Every Element</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Traversal means visiting each element of the array exactly once — from index 0
        to index n−1. It is the most basic operation and the foundation of everything else.
      </p>

      <CodeBlock code={`#include <stdio.h>

int main() {
    int marks[5] = {85, 92, 78, 60, 95};
    int n = 5;  /* total number of elements */
    int i;

    printf("All marks:\\n");
    for (i = 0; i < n; i++) {      /* start at 0, stop before n */
        printf("marks[%d] = %d\\n", i, marks[i]);
    }

    return 0;
}`} />

      <CodeBlock code={`/* Output:
marks[0] = 85
marks[1] = 92
marks[2] = 78
marks[3] = 60
marks[4] = 95
*/`} language="output" />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time Complexity:</span>
          <ComplexityBadge value="O(n)" color="#facc15" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Space Complexity:</span>
          <ComplexityBadge value="O(1)" color="#00e676" />
        </div>
      </div>

      <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8 }}>
        We visit n elements so time is O(n). We use no extra memory — just one loop
        variable i — so space is O(1).
      </p>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 5 — INSERTION
      ══════════════════════════════════════ */}
      <SectionTag text="Section 5" />
      <SectionTitle>Insertion — Adding an Element</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Here is an important truth about arrays: <strong style={{ color: 'var(--green)' }}>their size is fixed
        when you create them.</strong> You declare <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>int arr[10]</code> and
        you get exactly 10 slots — no more, no less. So "insertion" in an array means
        placing a value into an existing empty slot, or shifting elements to make room.
      </p>

      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 12, marginTop: 28 }}>
        Case 1 — Insert at the end
      </h3>
      <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 8 }}>
        If there is space at the end, just put it there. No shifting needed.
      </p>

      <CodeBlock code={`#include <stdio.h>

int main() {
    int arr[10] = {10, 20, 30, 40, 50};  /* array has capacity 10 */
    int n = 5;    /* currently 5 elements filled */
    int newVal = 60;

    arr[n] = newVal;  /* insert at position n (the next empty slot) */
    n++;              /* update the count */

    /* print to confirm */
    int i;
    for (i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    /* Output: 10 20 30 40 50 60 */

    return 0;
}`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time Complexity:</span>
          <ComplexityBadge value="O(1)" color="#00e676" />
        </div>
      </div>

      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 12, marginTop: 28 }}>
        Case 2 — Insert at a specific position
      </h3>
      <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 8 }}>
        This is where arrays show their weakness. To insert at position 2,
        every element from position 2 onwards must shift one step to the right
        to make room. The more elements, the more shifting.
      </p>

      {/* Shift visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // Insert 99 at index 2 — elements must shift right
        </div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 10 }}>Before:</div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
          {[10, 20, 30, 40, 50].map((v, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ width: 52, height: 48, border: `2px solid ${i >= 2 ? '#f97316' : 'var(--border)'}`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: i >= 2 ? '#f97316' : 'var(--text)', fontFamily: 'var(--font-mono)', background: i >= 2 ? 'rgba(249,115,22,0.06)' : 'var(--bg2)' }}>{v}</div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>[{i}]</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13, color: '#f97316', marginBottom: 8 }}>→ Shift indices 2, 3, 4 one step right</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 10 }}>After inserting 99 at index 2:</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[10, 20, 99, 30, 40, 50].map((v, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ width: 52, height: 48, border: `2px solid ${i === 2 ? 'var(--green)' : 'var(--border)'}`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: i === 2 ? 'var(--green)' : 'var(--text)', fontFamily: 'var(--font-mono)', background: i === 2 ? 'rgba(0,230,118,0.08)' : 'var(--bg2)' }}>{v}</div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>[{i}]</div>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

int main() {
    int arr[10] = {10, 20, 30, 40, 50};
    int n = 5;
    int pos = 2;    /* insert at index 2 */
    int newVal = 99;
    int i;

    /* shift elements right from the end to make room */
    for (i = n - 1; i >= pos; i--) {
        arr[i + 1] = arr[i];  /* move each element one step right */
    }

    arr[pos] = newVal;  /* place the new value */
    n++;                /* one more element now */

    for (i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    /* Output: 10 20 99 30 40 50 */

    return 0;
}`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time Complexity:</span>
          <ComplexityBadge value="O(n)" color="#facc15" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(worst case: insert at index 0 shifts everything)</span>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 6 — DELETION
      ══════════════════════════════════════ */}
      <SectionTag text="Section 6" />
      <SectionTitle>Deletion — Removing an Element</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Deletion is the mirror image of insertion. To remove an element at a position,
        you shift everything after it one step to the left to fill the gap.
        The array size in memory stays the same — you just track one fewer filled element.
      </p>

      {/* Delete visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // Delete element at index 2 (value 30) — shift left to close gap
        </div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 10 }}>Before:</div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
          {[10, 20, 30, 40, 50].map((v, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ width: 52, height: 48, border: `2px solid ${i === 2 ? '#ff4757' : 'var(--border)'}`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: i === 2 ? '#ff4757' : 'var(--text)', fontFamily: 'var(--font-mono)', background: i === 2 ? 'rgba(255,71,87,0.08)' : 'var(--bg2)' }}>{v}</div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>[{i}]</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13, color: '#f97316', marginBottom: 8 }}>→ Shift indices 3, 4 one step left</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 10 }}>After deleting index 2:</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[10, 20, 40, 50].map((v, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ width: 52, height: 48, border: '2px solid var(--border)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)', background: 'var(--bg2)' }}>{v}</div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>[{i}]</div>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

int main() {
    int arr[10] = {10, 20, 30, 40, 50};
    int n = 5;
    int pos = 2;   /* delete element at index 2 */
    int i;

    /* shift elements left from pos+1 onwards */
    for (i = pos; i < n - 1; i++) {
        arr[i] = arr[i + 1];  /* overwrite with the next element */
    }

    n--;  /* one fewer element now */

    for (i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    /* Output: 10 20 40 50 */

    return 0;
}`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time Complexity:</span>
          <ComplexityBadge value="O(n)" color="#facc15" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(worst case: delete at index 0 shifts everything)</span>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 7 — SEARCHING
      ══════════════════════════════════════ */}
      <SectionTag text="Section 7" />
      <SectionTitle>Searching — Finding an Element</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        To find a value in an unsorted array, the only option is to check each element
        one by one until you find it or reach the end. This is called <strong>linear search</strong>.
      </p>

      <CodeBlock code={`#include <stdio.h>

int linearSearch(int arr[], int n, int target) {
    int i;
    for (i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;    /* found — return the index */
        }
    }
    return -1;  /* not found — return -1 as a signal */
}

int main() {
    int marks[5] = {85, 92, 78, 60, 95};
    int n = 5;

    int result = linearSearch(marks, n, 78);

    if (result != -1) {
        printf("Found 78 at index %d\\n", result);  /* Found 78 at index 2 */
    } else {
        printf("Not found\\n");
    }

    return 0;
}`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Best Case:</span>
          <ComplexityBadge value="O(1)" color="#00e676" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(target is at index 0)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Worst Case:</span>
          <ComplexityBadge value="O(n)" color="#facc15" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(target at end or not present)</span>
        </div>
      </div>

      <Callout type="info">
        We will cover <strong>Binary Search</strong> in Unit 10 — a far faster way to search
        that works in O(log n). But it only works on sorted arrays. For now, linear search
        is the correct tool for unsorted data.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 8 — 2D ARRAYS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 8" />
      <SectionTitle>2D Arrays — Rows and Columns</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        A 2D array is an array of arrays — like a table or a grid. Think of a spreadsheet:
        rows going across, columns going down. Every cell has two coordinates — a row number
        and a column number.
      </p>

      {/* 2D grid visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // int matrix[3][4] — 3 rows, 4 columns
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {/* Column headers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginRight: 8 }}>
            <div style={{ width: 40, height: 40 }} />
            {[0, 1, 2].map(r => (
              <div key={r} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>row {r}</div>
            ))}
          </div>
          <div>
            <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
              {[0, 1, 2, 3].map(c => (
                <div key={c} style={{ width: 52, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>col {c}</div>
              ))}
            </div>
            {[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]].map((row, ri) => (
              <div key={ri} style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                {row.map((val, ci) => (
                  <div key={ci} style={{ width: 52, height: 40, border: '1px solid var(--border)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'var(--green)', fontFamily: 'var(--font-mono)', background: 'rgba(0,230,118,0.05)' }}>
                    {val}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 14, fontFamily: 'var(--font-mono)' }}>
          matrix[1][2] = 7 &nbsp;|&nbsp; matrix[2][3] = 12 &nbsp;|&nbsp; matrix[0][0] = 1
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

int main() {
    /* declare a 3x4 matrix and fill it */
    int matrix[3][4] = {
        {1,  2,  3,  4},   /* row 0 */
        {5,  6,  7,  8},   /* row 1 */
        {9, 10, 11, 12}    /* row 2 */
    };

    int i, j;

    /* print the matrix row by row */
    for (i = 0; i < 3; i++) {          /* loop over rows */
        for (j = 0; j < 4; j++) {      /* loop over columns */
            printf("%3d ", matrix[i][j]);
        }
        printf("\\n");  /* new line after each row */
    }

    /* access a specific element */
    printf("matrix[1][2] = %d\\n", matrix[1][2]);  /* prints 7 */

    return 0;
}`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Traversal Time:</span>
          <ComplexityBadge value="O(rows × cols)" color="#facc15" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Access Time:</span>
          <ComplexityBadge value="O(1)" color="#00e676" />
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 9 — CLASSIC PROBLEMS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 9" />
      <SectionTitle>Classic Array Problems — With Full Solutions</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 28 }}>
        These four problems appear constantly in interviews and in real code.
        Understand every line — do not just copy.
      </p>

      {/* Problem 1 — Find max and min */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '12px 20px', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--green)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 4, padding: '2px 8px' }}>Problem 01</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Find Maximum and Minimum</span>
          <ComplexityBadge value="O(n)" color="#facc15" />
        </div>
        <div style={{ padding: '16px 20px' }}>
          <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, marginBottom: 0 }}>
            Start by assuming the first element is both the max and the min.
            Then walk through the rest — if you find something bigger, update max.
            If smaller, update min.
          </p>
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

int main() {
    int arr[] = {64, 25, 12, 90, 38, 7, 55};
    int n = 7;
    int max = arr[0];  /* assume first element is max */
    int min = arr[0];  /* assume first element is min */
    int i;

    for (i = 1; i < n; i++) {
        if (arr[i] > max) {
            max = arr[i];  /* found a new max */
        }
        if (arr[i] < min) {
            min = arr[i];  /* found a new min */
        }
    }

    printf("Maximum: %d\\n", max);  /* Maximum: 90 */
    printf("Minimum: %d\\n", min);  /* Minimum: 7  */

    return 0;
}`} />

      {/* Problem 2 — Reverse */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 24, marginTop: 32 }}>
        <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '12px 20px', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--green)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 4, padding: '2px 8px' }}>Problem 02</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Reverse an Array</span>
          <ComplexityBadge value="O(n)" color="#facc15" />
        </div>
        <div style={{ padding: '16px 20px' }}>
          <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, marginBottom: 0 }}>
            Use two pointers — one at the start, one at the end. Swap them and move
            inward until they meet in the middle. No extra array needed.
          </p>
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

void reverseArray(int arr[], int n) {
    int left = 0;
    int right = n - 1;
    int temp;

    while (left < right) {
        /* swap arr[left] and arr[right] */
        temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;

        left++;   /* move left pointer inward */
        right--;  /* move right pointer inward */
    }
}

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int n = 5;
    int i;

    reverseArray(arr, n);

    for (i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    /* Output: 50 40 30 20 10 */

    return 0;
}`} />

      {/* Problem 3 — Count duplicates */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 24, marginTop: 32 }}>
        <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '12px 20px', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--green)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 4, padding: '2px 8px' }}>Problem 03</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Find Duplicate Elements</span>
          <ComplexityBadge value="O(n²)" color="#ff4757" />
        </div>
        <div style={{ padding: '16px 20px' }}>
          <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, marginBottom: 0 }}>
            For each element, check if the same value appears again later in the array.
            This uses a nested loop — O(n²) — which is the straightforward approach.
            There are faster methods using hashing (Unit 14) but this version
            requires no extra knowledge.
          </p>
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

int main() {
    int arr[] = {4, 2, 7, 2, 9, 4, 1};
    int n = 7;
    int i, j;

    printf("Duplicate elements: ");

    for (i = 0; i < n - 1; i++) {
        for (j = i + 1; j < n; j++) {
            if (arr[i] == arr[j]) {
                printf("%d ", arr[i]);
                break;  /* avoid printing the same duplicate multiple times */
            }
        }
    }
    /* Output: Duplicate elements: 4 2 */

    printf("\\n");
    return 0;
}`} />

      {/* Problem 4 — Rotate */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 24, marginTop: 32 }}>
        <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '12px 20px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--green)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 4, padding: '2px 8px' }}>Problem 04</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Rotate Array Left by One</span>
          <ComplexityBadge value="O(n)" color="#facc15" />
        </div>
        <div style={{ padding: '16px 20px' }}>
          <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, marginBottom: 0 }}>
            Save the first element, shift everything left by one position,
            then place the saved element at the end.
          </p>
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

void rotateLeft(int arr[], int n) {
    int first = arr[0];  /* save the first element */
    int i;

    for (i = 0; i < n - 1; i++) {
        arr[i] = arr[i + 1];  /* shift each element one step left */
    }

    arr[n - 1] = first;  /* place saved element at the end */
}

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int n = 5;
    int i;

    rotateLeft(arr, n);

    for (i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    /* Output: 20 30 40 50 10 */

    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 10 — STRENGTHS & WEAKNESSES
      ══════════════════════════════════════ */}
      <SectionTag text="Section 10" />
      <SectionTitle>Array Strengths and Weaknesses</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        No data structure is perfect. Understanding where arrays shine and where
        they struggle is exactly the kind of thinking interviewers test for.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
        <div style={{ background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 12, padding: '20px 22px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green)', marginBottom: 14 }}>✅ Strengths</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Access any element by index in O(1) — fastest possible',
              'Simple to understand and implement',
              'Cache-friendly — contiguous memory means faster real-world performance',
              'Works well when size is known in advance',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--green)', marginTop: 2, flexShrink: 0 }}>→</span>
                <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'rgba(255,71,87,0.06)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 12, padding: '20px 22px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#ff4757', marginBottom: 14 }}>❌ Weaknesses</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Fixed size — you must decide the size before you start',
              'Insertion and deletion are O(n) — shifting is expensive',
              'Wasted memory if you declare size 100 but only use 10',
              'No built-in way to grow or shrink dynamically',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: '#ff4757', marginTop: 2, flexShrink: 0 }}>→</span>
                <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Callout type="tip">
        <strong>This is exactly why Linked Lists exist</strong> — they solve the fixed-size
        and slow-insertion problems of arrays. We cover them in Unit 05. Every weakness
        of arrays becomes a motivation for the next data structure.
      </Callout>

      {/* Operations summary table */}
      <div style={{ overflowX: 'auto', marginTop: 32, marginBottom: 12 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Operation', 'Best Case', 'Worst Case', 'Notes'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, background: 'var(--surface)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Access by index', 'O(1)', 'O(1)', 'Always instant — best property of arrays'],
              ['Search (unsorted)', 'O(1)', 'O(n)', 'Best: element at index 0. Worst: not found'],
              ['Insert at end', 'O(1)', 'O(1)', 'Just place in the next slot'],
              ['Insert at position', 'O(1)', 'O(n)', 'Worst: insert at index 0 shifts everything'],
              ['Delete at position', 'O(1)', 'O(n)', 'Worst: delete index 0 shifts everything'],
              ['Traversal', 'O(n)', 'O(n)', 'Must visit all n elements'],
            ].map(([op, best, worst, note], ri) => (
              <tr key={ri}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)', fontWeight: 600 }}>{op}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: '#00e676', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{best}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: best === worst ? '#00e676' : '#facc15', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{worst}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontSize: 12 }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          WHAT'S NEXT
      ══════════════════════════════════════ */}
      <SectionTag text="What's Next" />
      <SectionTitle>You Are Ready for Unit 03</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        You now understand arrays completely — from how they sit in RAM to every core
        operation with full complexity analysis. This knowledge will never become
        irrelevant. Arrays are inside almost every program ever written.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 32 }}>
        In Unit 03 we cover <strong style={{ color: 'var(--text)' }}>Strings</strong> —
        which are, at their core, just arrays of characters. You already know
        how they work in memory. Now we learn how to search, reverse, compare,
        and manipulate text in C.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(0,230,118,0.02) 100%)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 12, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 700, marginBottom: 6 }}>UP NEXT → UNIT 03</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Strings — Text is Just an Array</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Reverse, palindrome, anagram, pattern matching — in C.</div>
        </div>
        <Link href="/learn/dsa/strings" style={{ background: 'var(--green)', color: '#000', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '10px 22px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Coming Soon →
        </Link>
      </div>

      <KeyTakeaways items={[
        'An array stores elements at contiguous (back-to-back) memory locations — all of the same type',
        'Accessing any element by index is O(1) because the address is calculated with simple math: base + (index × size)',
        'Arrays are zero-indexed — valid indices are 0 to n−1. Accessing index n is an out-of-bounds error',
        'Insertion and deletion at a position require shifting elements — worst case O(n)',
        'Linear search checks every element one by one — O(n) worst case',
        '2D arrays are tables: accessed as matrix[row][column], traversal is O(rows × cols)',
        'Arrays are fast to access but slow to insert/delete. This weakness motivates linked lists in Unit 05',
      ]} />

    </LearnLayout>
  )
}