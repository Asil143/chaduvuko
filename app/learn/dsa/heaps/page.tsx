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

/* ── Heap node circle ── */
const HNode = ({ value, highlight, color = 'var(--green)', small }: { value: number | string; highlight?: boolean; color?: string; small?: boolean }) => (
  <div style={{
    width: small ? 36 : 44, height: small ? 36 : 44, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-mono)', fontSize: small ? 12 : 15, fontWeight: 800,
    color: highlight ? '#000' : color,
    background: highlight ? color : `${color}15`,
    border: `2px solid ${color}`,
    flexShrink: 0,
  }}>
    {value}
  </div>
)

const VEdge = () => <div style={{ width: 2, height: 14, background: 'var(--border)' }} />

export default function HeapsPage() {
  return (
    <LearnLayout
      title="Unit 13 — Heaps"
      description="A special complete binary tree where the parent is always larger or smaller than its children. Always balanced, always O(log n), powers priority queues and heap sort."
      section="DSA"
      readTime="75 min"
      updatedAt="March 2026"
    >

      {/* ── Badges ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'UNIT 13', green: true },
          { label: 'Prerequisite: Unit 12 — BST', green: false },
          { label: '75 min read', green: false },
        ].map((b) => (
          <span key={b.label} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: b.green ? 700 : 600, color: b.green ? 'var(--green)' : 'var(--muted)', background: b.green ? 'rgba(0,230,118,0.1)' : 'var(--surface)', border: `1px solid ${b.green ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`, borderRadius: 6, padding: '4px 10px' }}>
            {b.label}
          </span>
        ))}
      </div>

      <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        A BST organises data so you can search efficiently. A heap organises data
        so you can always get the largest or smallest element instantly — in O(1).
        That one difference makes heaps the perfect tool for a completely different
        set of problems: priority queues, scheduling, and the fastest known sorting algorithm
        based on comparisons.
      </p>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85 }}>
        The best part: a heap is always a complete binary tree, which means it is
        always balanced. Unlike BSTs that can degrade to O(n), every heap operation
        is guaranteed O(log n) — no special handling, no self-balancing needed.
      </p>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 1 — WHAT IS A HEAP
      ══════════════════════════════════════ */}
      <SectionTag text="Section 1" />
      <SectionTitle>What is a Heap?</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        A heap is a <strong style={{ color: 'var(--green)' }}>complete binary tree</strong> that
        satisfies the <strong style={{ color: 'var(--green)' }}>heap property</strong>.
        Two things to unpack there. Let us start with each one.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 20px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 10 }}>
            Complete Binary Tree
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
            All levels are fully filled <em>except possibly the last</em>,
            and the last level fills from <strong style={{ color: 'var(--text)' }}>left to right</strong> with no gaps.
            This guarantees the height is always O(log n) — the tree can never go skewed.
          </div>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 20px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 10 }}>
            Heap Property
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
            <strong style={{ color: 'var(--text)' }}>Max-heap:</strong> every parent is ≥ its children.<br />
            <strong style={{ color: 'var(--text)' }}>Min-heap:</strong> every parent is ≤ its children.<br />
            The root is always the maximum (max-heap) or minimum (min-heap).
          </div>
        </div>
      </div>

      {/* Max heap vs Min heap visual */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
        {/* Max heap */}
        <div style={{ background: 'rgba(0,230,118,0.05)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 12, padding: '20px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 16 }}>Max-Heap — largest at root</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            <HNode value={90} highlight />
            <VEdge />
            <div style={{ display: 'flex', gap: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                <HNode value={70} />
                <VEdge />
                <div style={{ display: 'flex', gap: 10 }}>
                  <HNode value={40} small />
                  <HNode value={60} small />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                <HNode value={50} />
                <VEdge />
                <div style={{ display: 'flex', gap: 10 }}>
                  <HNode value={20} small />
                  <HNode value={30} small />
                </div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 14, fontFamily: 'var(--font-mono)', lineHeight: 1.8 }}>
            Every parent ≥ its children ✓<br />
            Root = 90 = maximum element
          </div>
        </div>

        {/* Min heap */}
        <div style={{ background: 'rgba(66,133,244,0.05)', border: '1px solid rgba(66,133,244,0.3)', borderRadius: 12, padding: '20px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#4285f4', marginBottom: 16 }}>Min-Heap — smallest at root</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            <HNode value={10} color="#4285f4" highlight />
            <VEdge />
            <div style={{ display: 'flex', gap: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                <HNode value={20} color="#4285f4" />
                <VEdge />
                <div style={{ display: 'flex', gap: 10 }}>
                  <HNode value={50} color="#4285f4" small />
                  <HNode value={40} color="#4285f4" small />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                <HNode value={30} color="#4285f4" />
                <VEdge />
                <div style={{ display: 'flex', gap: 10 }}>
                  <HNode value={60} color="#4285f4" small />
                  <HNode value={90} color="#4285f4" small />
                </div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 14, fontFamily: 'var(--font-mono)', lineHeight: 1.8 }}>
            Every parent ≤ its children ✓<br />
            Root = 10 = minimum element
          </div>
        </div>
      </div>

      <Callout type="info">
        <strong>Heap vs BST — key difference:</strong> In a BST, inorder traversal gives sorted output
        because left {'<'} root {'<'} right at every node. In a heap, only the
        parent-child relationship is guaranteed — siblings have no defined order.
        A heap is not searchable like a BST. It is optimised for one thing:
        instantly getting the max or min.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 2 — HEAP AS ARRAY
      ══════════════════════════════════════ */}
      <SectionTag text="Section 2" />
      <SectionTitle>Storing a Heap as an Array — The Clever Trick</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Because a heap is always a <em>complete</em> binary tree, we never need to
        store left/right pointers. We can store the entire tree in a plain array —
        level by level, left to right. The parent-child relationships are calculated
        with simple index arithmetic. This makes heaps extremely memory-efficient
        and cache-friendly.
      </p>

      {/* Array mapping visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // Max-heap stored as array — level by level, left to right
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, marginBottom: 24 }}>
          <HNode value={90} highlight />
          <VEdge />
          <div style={{ display: 'flex', gap: 40 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              <HNode value={70} />
              <VEdge />
              <div style={{ display: 'flex', gap: 14 }}>
                <HNode value={40} small />
                <HNode value={60} small />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              <HNode value={50} />
              <VEdge />
              <div style={{ display: 'flex', gap: 14 }}>
                <HNode value={20} small />
                <HNode value={30} small />
              </div>
            </div>
          </div>
        </div>

        {/* Array representation */}
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>
          Array representation (0-indexed):
        </div>
        <div style={{ display: 'flex', gap: 0 }}>
          {[90, 70, 50, 40, 60, 20, 30].map((v, i) => (
            <div key={i} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 800, color: i === 0 ? '#000' : 'var(--green)', background: i === 0 ? 'var(--green)' : 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.3)', borderRight: i < 6 ? 'none' : undefined }}>
                {v}
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 5, fontFamily: 'var(--font-mono)' }}>[{i}]</div>
            </div>
          ))}
        </div>

        {/* Index formulas */}
        <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
          {[
            { formula: 'parent(i) = (i-1)/2', example: 'parent(3) = (3-1)/2 = 1 → node 70 ✓' },
            { formula: 'left(i)   = 2*i + 1', example: 'left(1)   = 2*1+1 = 3 → node 40 ✓' },
            { formula: 'right(i)  = 2*i + 2', example: 'right(1)  = 2*1+2 = 4 → node 60 ✓' },
          ].map((item) => (
            <div key={item.formula} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--green)', fontWeight: 700, marginBottom: 5 }}>{item.formula}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{item.example}</div>
            </div>
          ))}
        </div>
      </div>

      <Callout type="tip">
        <strong>Why does this work?</strong> Because the heap is always complete,
        there are never any gaps in the array. Every index from 0 to n-1 is used.
        The formulas above are just mathematics of a complete binary tree —
        they always hold regardless of the heap's values.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 3 — INSERT (BUBBLE UP)
      ══════════════════════════════════════ */}
      <SectionTag text="Section 3" />
      <SectionTitle>Insert — Add and Bubble Up</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        To insert into a max-heap: place the new element at the end of the array
        (the next available position in the complete tree), then
        <strong style={{ color: 'var(--green)' }}> bubble it up</strong> — repeatedly
        swap it with its parent as long as it is larger than its parent.
        This restores the heap property from the bottom up.
      </p>

      {/* Insert trace */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // Inserting 80 into max-heap [90, 70, 50, 40, 60, 20, 30]
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { arr: [90, 70, 50, 40, 60, 20, 30, 80], hi: [7], note: 'Step 1: Place 80 at index 7 (end)' },
            { arr: [90, 70, 50, 40, 60, 20, 30, 80], hi: [3, 7], note: 'Step 2: parent(7)=3, arr[3]=40 < 80 → swap' },
            { arr: [90, 70, 50, 80, 60, 20, 30, 40], hi: [1, 3], note: 'Step 3: parent(3)=1, arr[1]=70 < 80 → swap' },
            { arr: [90, 80, 50, 70, 60, 20, 30, 40], hi: [0, 1], note: 'Step 4: parent(1)=0, arr[0]=90 > 80 → STOP ✓' },
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 0 }}>
                {step.arr.map((v, vi) => (
                  <div key={vi} style={{ textAlign: 'center' }}>
                    <div style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800, color: step.hi.includes(vi) ? '#000' : 'var(--green)', background: step.hi.includes(vi) ? 'var(--green)' : 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.3)', borderRight: vi < step.arr.length - 1 ? 'none' : undefined }}>{v}</div>
                    <div style={{ fontSize: 9, color: 'var(--muted)', marginTop: 3, fontFamily: 'var(--font-mono)' }}>[{vi}]</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: i === 3 ? 'var(--green)' : 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: i === 3 ? 700 : 400 }}>{step.note}</div>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

#define MAX 100

struct MaxHeap {
    int data[MAX];
    int size;
};
typedef struct MaxHeap MaxHeap;

void initHeap(MaxHeap *h) { h->size = 0; }

int parent(int i) { return (i - 1) / 2; }
int leftChild(int i)  { return 2 * i + 1; }
int rightChild(int i) { return 2 * i + 2; }

void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

void insert(MaxHeap *h, int value) {
    if (h->size == MAX) { printf("Heap full\\n"); return; }

    /* place at end */
    h->data[h->size] = value;
    int i = h->size;
    h->size++;

    /* bubble up: swap with parent while larger than parent */
    while (i > 0 && h->data[i] > h->data[parent(i)]) {
        swap(&h->data[i], &h->data[parent(i)]);
        i = parent(i);  /* move up to parent position */
    }
}

void printHeap(MaxHeap *h) {
    int i;
    for (i = 0; i < h->size; i++) printf("%d ", h->data[i]);
    printf("\\n");
}

int main() {
    MaxHeap h;
    initHeap(&h);

    insert(&h, 50);
    insert(&h, 70);
    insert(&h, 40);
    insert(&h, 90);
    insert(&h, 20);

    printHeap(&h);  /* 90 70 40 50 20 — root is always max */
    printf("Max element: %d\\n", h.data[0]);  /* 90 */

    return 0;
}`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time:</span>
          <ComplexityBadge value="O(log n)" color="#00e676" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(at most height bubbles = log n swaps)</span>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 4 — DELETE MAX (HEAPIFY DOWN)
      ══════════════════════════════════════ */}
      <SectionTag text="Section 4" />
      <SectionTitle>Delete Max — Extract Root and Heapify Down</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Deleting from a heap always means removing the root — the maximum (or minimum).
        You cannot just remove the root and leave a hole. The strategy:
        move the last element to the root position, shrink the size by 1,
        then <strong style={{ color: 'var(--green)' }}>heapify down</strong> —
        push the misplaced root down by swapping with its larger child
        until the heap property is restored.
      </p>

      {/* Delete trace */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // Extracting max (90) from heap [90, 70, 50, 40, 60, 20, 30]
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { arr: [30, 70, 50, 40, 60, 20], hi: [0], note: 'Step 1: Move last (30) to root. Remove old last.' },
            { arr: [30, 70, 50, 40, 60, 20], hi: [0, 1], note: 'Step 2: children=70,50. Larger=70 > 30 → swap with index 1' },
            { arr: [70, 30, 50, 40, 60, 20], hi: [1, 4], note: 'Step 3: children=40,60. Larger=60 > 30 → swap with index 4' },
            { arr: [70, 60, 50, 40, 30, 20], hi: [4], note: 'Step 4: children of index 4 = none. Heap property restored ✓' },
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 0 }}>
                {step.arr.map((v, vi) => (
                  <div key={vi} style={{ textAlign: 'center' }}>
                    <div style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800, color: step.hi.includes(vi) ? '#000' : 'var(--green)', background: step.hi.includes(vi) ? 'var(--green)' : 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.3)', borderRight: vi < step.arr.length - 1 ? 'none' : undefined }}>{v}</div>
                    <div style={{ fontSize: 9, color: 'var(--muted)', marginTop: 3, fontFamily: 'var(--font-mono)' }}>[{vi}]</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: i === 3 ? 'var(--green)' : 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: i === 3 ? 700 : 400 }}>{step.note}</div>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock code={`/* push element at index i down to its correct position */
void heapifyDown(MaxHeap *h, int i) {
    int largest = i;
    int left  = leftChild(i);
    int right = rightChild(i);

    /* find the largest among node, left child, right child */
    if (left < h->size && h->data[left] > h->data[largest]) {
        largest = left;
    }
    if (right < h->size && h->data[right] > h->data[largest]) {
        largest = right;
    }

    /* if current node is not the largest — swap and continue down */
    if (largest != i) {
        swap(&h->data[i], &h->data[largest]);
        heapifyDown(h, largest);  /* recursively fix the affected subtree */
    }
}

/* extract the maximum element (root) */
int extractMax(MaxHeap *h) {
    if (h->size == 0) { printf("Heap empty\\n"); return -1; }

    int maxVal = h->data[0];          /* save the max value to return */
    h->data[0] = h->data[h->size-1]; /* move last element to root */
    h->size--;                         /* shrink heap */
    heapifyDown(h, 0);                /* restore heap property */

    return maxVal;
}

int main() {
    MaxHeap h;
    initHeap(&h);

    insert(&h, 90); insert(&h, 70); insert(&h, 50);
    insert(&h, 40); insert(&h, 60); insert(&h, 20); insert(&h, 30);

    printf("Extract: %d\\n", extractMax(&h)); /* 90 */
    printf("Extract: %d\\n", extractMax(&h)); /* 70 */
    printf("Extract: %d\\n", extractMax(&h)); /* 60 */

    printHeap(&h);  /* remaining: 50 40 30 20 */

    return 0;
}`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Extract Max:</span>
          <ComplexityBadge value="O(log n)" color="#00e676" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Peek Max:</span>
          <ComplexityBadge value="O(1)" color="#00e676" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(just read arr[0])</span>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 5 — BUILD HEAP
      ══════════════════════════════════════ */}
      <SectionTag text="Section 5" />
      <SectionTitle>Build Heap — Turn Any Array into a Heap</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        If you have an existing unsorted array and want to make it a valid heap,
        you could insert elements one by one — O(n log n) total.
        But there is a smarter approach: <strong style={{ color: 'var(--green)' }}>heapify the array in-place</strong>
        by applying heapifyDown to every non-leaf node, starting from the last one
        and moving to the root. This runs in <strong style={{ color: 'var(--green)' }}>O(n)</strong> —
        faster than n individual insertions.
      </p>

      <CodeBlock code={`/* build a max-heap from an existing unsorted array in O(n) */
void buildHeap(MaxHeap *h, int arr[], int n) {
    int i;
    /* copy array into heap */
    for (i = 0; i < n; i++) h->data[i] = arr[i];
    h->size = n;

    /* start from last non-leaf node and heapify down each one
       last non-leaf index = (n/2) - 1 */
    for (i = (n / 2) - 1; i >= 0; i--) {
        heapifyDown(h, i);
    }
}

int main() {
    int arr[] = {3, 9, 2, 1, 4, 5, 8, 7, 6};
    int n = 9;

    MaxHeap h;
    buildHeap(&h, arr, n);

    printHeap(&h);
    /* Output: 9 7 8 6 4 5 2 1 3 — valid max-heap ✓ */
    printf("Max: %d\\n", h.data[0]);  /* 9 */

    return 0;
}`} />

      <Callout type="info">
        <strong>Why O(n) and not O(n log n)?</strong> Most nodes are near the bottom of the tree
        and only need to travel a short distance down. The mathematical sum of all these
        distances works out to O(n). This is one of the nicest results in algorithm analysis —
        and it is what makes heap sort practical.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 6 — HEAP SORT
      ══════════════════════════════════════ */}
      <SectionTag text="Section 6" />
      <SectionTitle>Heap Sort — Sort Using a Heap</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Heap sort uses the heap to sort an array in O(n log n) with O(1) extra space.
        It has two phases:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { step: '1', title: 'Build a max-heap from the array', desc: 'O(n) — the array is now a valid max-heap. Largest element is at index 0.', color: '#4285f4' },
          { step: '2', title: 'Repeatedly extract the max', desc: 'Swap root (max) with the last element, shrink heap size by 1, heapify down. The extracted max goes to the end of the array. Repeat n-1 times.', color: 'var(--green)' },
        ].map((item) => (
          <div key={item.step} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'var(--surface)', border: `1px solid ${item.color}33`, borderRadius: 10, padding: '14px 18px' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: item.color, color: '#000', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.step}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Heap sort trace */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          // Heap sort on [4, 10, 3, 5, 1] — step by step
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', lineHeight: 2.2 }}>
          Build heap: [4,10,3,5,1] → <span style={{ color: 'var(--green)' }}>[10,5,3,4,1]</span><br />
          Pass 1: swap arr[0]=10 and arr[4]=1 → [1,5,3,4,<span style={{ color: '#facc15' }}>10</span>] → heapify → [5,4,3,1,<span style={{ color: '#facc15' }}>10</span>]<br />
          Pass 2: swap arr[0]=5  and arr[3]=1 → [1,4,3,<span style={{ color: '#facc15' }}>5,10</span>] → heapify → [4,1,3,<span style={{ color: '#facc15' }}>5,10</span>]<br />
          Pass 3: swap arr[0]=4  and arr[2]=3 → [3,1,<span style={{ color: '#facc15' }}>4,5,10</span>] → heapify → [3,1,<span style={{ color: '#facc15' }}>4,5,10</span>]<br />
          Pass 4: swap arr[0]=3  and arr[1]=1 → [<span style={{ color: '#facc15' }}>1,3,4,5,10</span>]<br />
          <span style={{ color: 'var(--green)', fontWeight: 700 }}>Result: 1 3 4 5 10 — sorted ✓</span>
        </div>
      </div>

      <CodeBlock code={`/* heap sort — sorts arr[] in ascending order in-place */
void heapSort(int arr[], int n) {
    MaxHeap h;

    /* phase 1: build max-heap from the array */
    buildHeap(&h, arr, n);

    /* phase 2: extract max one by one, place at end */
    int i;
    for (i = n - 1; i > 0; i--) {
        /* move current max (root) to end of sorted portion */
        swap(&h.data[0], &h.data[i]);
        h.size--;             /* shrink heap — sorted part grows */
        heapifyDown(&h, 0);   /* restore heap property */
    }

    /* copy sorted heap back to original array */
    for (i = 0; i < n; i++) arr[i] = h.data[i];
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = 5;
    int i;

    printf("Before: ");
    for (i = 0; i < n; i++) printf("%d ", arr[i]);

    heapSort(arr, n);

    printf("\\nAfter:  ");
    for (i = 0; i < n; i++) printf("%d ", arr[i]);
    /* After: 11 12 22 25 64 */

    return 0;
}`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time (all cases):</span>
          <ComplexityBadge value="O(n log n)" color="#00e676" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Space:</span>
          <ComplexityBadge value="O(1)" color="#00e676" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(in-place)</span>
        </div>
      </div>

      <Callout type="tip">
        <strong>Heap sort vs Quick sort:</strong> Heap sort guarantees O(n log n) even in
        the worst case — quick sort can degrade to O(n²). But quick sort is faster in practice
        due to better cache behaviour. Heap sort is used when you need a worst-case guarantee
        and cannot afford O(n²) under any circumstances.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 7 — MIN HEAP
      ══════════════════════════════════════ */}
      <SectionTag text="Section 7" />
      <SectionTitle>Min-Heap — Smallest Always at Root</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        A min-heap is identical to a max-heap — same structure, same operations —
        except the heap property is reversed: every parent is ≤ its children.
        The root always holds the minimum element. To convert our max-heap code
        to a min-heap, just flip one comparison in heapifyDown and insert.
      </p>

      <CodeBlock code={`/* Min-heap — only the comparison direction changes */

void heapifyDownMin(MaxHeap *h, int i) {
    int smallest = i;
    int left  = leftChild(i);
    int right = rightChild(i);

    /* find SMALLEST among node, left child, right child */
    if (left  < h->size && h->data[left]  < h->data[smallest]) smallest = left;
    if (right < h->size && h->data[right] < h->data[smallest]) smallest = right;

    if (smallest != i) {
        swap(&h->data[i], &h->data[smallest]);
        heapifyDownMin(h, smallest);
    }
}

void insertMin(MaxHeap *h, int value) {
    h->data[h->size] = value;
    int i = h->size++;

    /* bubble UP while SMALLER than parent */
    while (i > 0 && h->data[i] < h->data[parent(i)]) {
        swap(&h->data[i], &h->data[parent(i)]);
        i = parent(i);
    }
}

int extractMin(MaxHeap *h) {
    int minVal = h->data[0];
    h->data[0] = h->data[--h->size];
    heapifyDownMin(h, 0);
    return minVal;
}

int main() {
    MaxHeap h;
    initHeap(&h);

    insertMin(&h, 50); insertMin(&h, 20); insertMin(&h, 80);
    insertMin(&h, 10); insertMin(&h, 60);

    printf("Min: %d\\n", h.data[0]);           /* 10 */
    printf("Extract: %d\\n", extractMin(&h));  /* 10 */
    printf("Extract: %d\\n", extractMin(&h));  /* 20 */
    printf("Extract: %d\\n", extractMin(&h));  /* 50 */

    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 8 — PRIORITY QUEUE
      ══════════════════════════════════════ */}
      <SectionTag text="Section 8" />
      <SectionTitle>Priority Queue Using a Heap</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        In Unit 07 we built a priority queue using a simple array that searched
        for the highest priority element in O(n). A heap-based priority queue
        does all the same things in O(log n) — dramatically faster at scale.
        This is the real-world implementation used in every production system.
      </p>

      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Operation', 'Array-based (Unit 07)', 'Heap-based', 'Why better'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, background: 'var(--surface)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Insert', 'O(1)', 'O(log n)', 'Heap: always maintains order'],
              ['Get highest priority', 'O(n)', 'O(1)', 'Heap: root is always max/min'],
              ['Remove highest priority', 'O(n)', 'O(log n)', 'Heap: heapify restores order'],
              ['Build from n items', 'O(n)', 'O(n)', 'Both same — heap is faster after'],
            ].map(([op, arr, heap, why], ri) => (
              <tr key={ri}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)', fontWeight: 600 }}>{op}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: '#ff4757', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{arr}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{heap}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontSize: 12 }}>{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Real systems that use heap-based priority queues:</div>
        {[
          { icon: '⚙️', title: 'CPU Process Scheduling', desc: 'The OS picks the highest-priority process to run next. A min-heap of process priorities makes this O(log n).' },
          { icon: '🗺️', title: "Dijkstra's Shortest Path", desc: 'Always processes the nearest unvisited node first. A min-heap of distances makes each step O(log n) instead of O(n).' },
          { icon: '🏥', title: 'Hospital Emergency Room', desc: 'Critical patients are seen first. A max-heap of severity scores ensures the most urgent case is always at the front.' },
          { icon: '📦', title: 'Event-Driven Simulation', desc: 'Events are processed in time order. A min-heap of timestamps gives the next event in O(log n).' },
        ].map((item) => (
          <div key={item.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 18px' }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 9 — ERRORS
      ══════════════════════════════════════ */}
      <SectionTag text="Errors You Will Hit" />
      <SectionTitle>Common Heap Mistakes</SectionTitle>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
        {[
          {
            title: 'Wrong parent/child index formula',
            symptom: 'Heap property violated after every operation — wrong elements being compared',
            fix: 'For 0-indexed array: parent = (i-1)/2, left = 2i+1, right = 2i+2. For 1-indexed: parent = i/2, left = 2i, right = 2i+1. Be consistent throughout.',
          },
          {
            title: 'Not checking bounds before accessing children',
            symptom: 'Accessing arr[left] or arr[right] when index is beyond heap size — reading garbage',
            fix: 'Always check left < h->size and right < h->size before accessing children in heapifyDown.',
          },
          {
            title: 'Forgetting to update h->size on extract',
            symptom: 'Extracted element remains accessible and heap size appears unchanged',
            fix: 'After extract: h->size-- to shrink the heap. The last element is now logically outside the heap even though it remains in the array.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ background: 'rgba(255,71,87,0.06)', borderBottom: '1px solid rgba(255,71,87,0.15)', padding: '12px 20px' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#ff4757' }}>⚠ {item.title}</span>
            </div>
            <div style={{ padding: '14px 20px' }}>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}><strong style={{ color: 'var(--text)' }}>Symptom:</strong> {item.symptom}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}><strong style={{ color: 'var(--green)' }}>Fix:</strong> {item.fix}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary table */}
      <SectionTag text="Quick Reference" />
      <SectionTitle>All Heap Operations</SectionTitle>

      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Operation', 'Time', 'How it works'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, background: 'var(--surface)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Peek max/min', 'O(1)', 'Read arr[0] — root is always max or min'],
              ['Insert', 'O(log n)', 'Add at end, bubble up while out of order'],
              ['Extract max/min', 'O(log n)', 'Move last to root, heapify down'],
              ['Build heap', 'O(n)', 'Heapify down from last non-leaf to root'],
              ['Heap sort', 'O(n log n)', 'Build heap + n extractions'],
              ['Search', 'O(n)', 'No ordering between siblings — must scan all'],
            ].map(([op, time, how], ri) => (
              <tr key={ri}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)', fontWeight: 600 }}>{op}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: '#00e676', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{time}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontSize: 12 }}>{how}</td>
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
      <SectionTitle>You Are Ready for Unit 14</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        You now understand heaps completely — the heap property, the array representation,
        insert with bubble-up, extract with heapify-down, build heap in O(n),
        heap sort, and why heaps are the foundation of every production priority queue.
      </p>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 32 }}>
        In Unit 14 we cover <strong style={{ color: 'var(--text)' }}>Hashing</strong> —
        the technique behind O(1) lookup. Hash tables power database indexes,
        caches, language runtimes, and almost every fast system you have ever used.
        We build one from scratch in C and understand every design decision.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(0,230,118,0.02) 100%)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 12, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 700, marginBottom: 6 }}>UP NEXT → UNIT 14</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Hashing — O(1) Lookup</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Hash functions, collisions, chaining, open addressing — built in C.</div>
        </div>
        <Link href="/learn/dsa/hashing" style={{ background: 'var(--green)', color: '#000', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '10px 22px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Coming Soon →
        </Link>
      </div>

      <KeyTakeaways items={[
        'A heap is a complete binary tree with the heap property: max-heap = parent ≥ children, min-heap = parent ≤ children',
        'A complete binary tree is always balanced — height is O(log n) guaranteed, no skewing possible',
        'Heap stored as array: parent(i) = (i-1)/2, left(i) = 2i+1, right(i) = 2i+2',
        'Insert: add at end, bubble up while larger than parent — O(log n)',
        'Extract max/min: move last element to root, heapify down swapping with larger child — O(log n)',
        'Peek at max/min: just read arr[0] — always O(1)',
        'Build heap from unsorted array: heapify down from last non-leaf to root — O(n) total',
        'Heap sort: build heap O(n) + n extractions O(n log n) = O(n log n) total, O(1) space',
        'Heap-based priority queue: O(log n) insert and extract vs O(n) for naive array implementation',
        'Heap does NOT support efficient search — siblings have no ordering, must scan all nodes O(n)',
      ]} />

    </LearnLayout>
  )
}