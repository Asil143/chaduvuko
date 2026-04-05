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

/* ── Queue visual — horizontal row with FRONT and REAR labels ── */
const QueueVisual = ({ items, frontLabel, rearLabel }: {
  items: { val: string; highlight?: 'front' | 'rear' }[]
  frontLabel?: string
  rearLabel?: string
}) => (
  <div style={{ overflowX: 'auto' }}>
    <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, width: 'fit-content' }}>
      {/* DEQUEUE arrow on left */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
        <div style={{ fontSize: 11, color: '#ff4757', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 4 }}>dequeue</div>
        <div style={{ fontSize: 18, color: '#ff4757' }}>←</div>
      </div>

      {items.map((item, i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          {i === 0 && (
            <div style={{ fontSize: 10, color: '#ff4757', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 4 }}>
              FRONT {frontLabel || ''}
            </div>
          )}
          {i === items.length - 1 && i !== 0 && (
            <div style={{ fontSize: 10, color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 4 }}>
              REAR {rearLabel || ''}
            </div>
          )}
          {i !== 0 && i !== items.length - 1 && (
            <div style={{ fontSize: 10, color: 'transparent', marginBottom: 4 }}>—</div>
          )}
          <div style={{
            width: 60, height: 52,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 800,
            color: item.highlight === 'front' ? '#ff4757' : item.highlight === 'rear' ? 'var(--green)' : 'var(--text)',
            background: item.highlight === 'front' ? 'rgba(255,71,87,0.1)' : item.highlight === 'rear' ? 'rgba(0,230,118,0.1)' : 'var(--bg2)',
            border: `2px solid ${item.highlight === 'front' ? '#ff4757' : item.highlight === 'rear' ? 'var(--green)' : 'var(--border)'}`,
            borderRight: i < items.length - 1 ? 'none' : undefined,
            borderTopLeftRadius: i === 0 ? 8 : 0,
            borderBottomLeftRadius: i === 0 ? 8 : 0,
            borderTopRightRadius: i === items.length - 1 ? 8 : 0,
            borderBottomRightRadius: i === items.length - 1 ? 8 : 0,
          }}>
            {item.val}
          </div>
        </div>
      ))}

      {/* ENQUEUE arrow on right */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: 8 }}>
        <div style={{ fontSize: 11, color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 4 }}>enqueue</div>
        <div style={{ fontSize: 18, color: 'var(--green)' }}>←</div>
      </div>
    </div>
  </div>
)

export default function QueuesPage() {
  return (
    <LearnLayout
      title="Unit 07 — Queues"
      description="First In, First Out. The data structure behind CPU scheduling, WhatsApp message delivery, printer spooling, and breadth-first search. Built two ways with full C code."
      section="DSA"
      readTime="60 min"
      updatedAt="March 2026"
    >

      {/* ── Badges ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'UNIT 07', green: true },
          { label: 'Prerequisite: Unit 06 — Stacks', green: false },
          { label: '60 min read', green: false },
        ].map((b) => (
          <span key={b.label} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: b.green ? 700 : 600, color: b.green ? 'var(--green)' : 'var(--muted)', background: b.green ? 'rgba(0,230,118,0.1)' : 'var(--surface)', border: `1px solid ${b.green ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`, borderRadius: 6, padding: '4px 10px' }}>
            {b.label}
          </span>
        ))}
      </div>

      <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        If a stack is a pile of plates — a queue is a line of people at a ticket counter.
        The first person in the line is the first one served. The last person in the line
        waits until everyone ahead of them is done. No jumping, no skipping.
        <strong style={{ color: 'var(--green)' }}> First In, First Out.</strong>
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>
        Queues are everywhere in computing — your print jobs wait in a queue,
        your CPU runs processes in a queue, every BFS graph traversal uses a queue.
        In this unit we build queues from scratch two ways, fix the classic wasted-space
        problem with circular queues, and understand every real-world application.
      </p>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 1 — WHAT IS A QUEUE
      ══════════════════════════════════════ */}
      <SectionTag text="Section 1" />
      <SectionTitle>What is a Queue?</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        A queue is a linear data structure with two open ends — one for adding
        elements (<strong style={{ color: 'var(--green)' }}>REAR</strong>) and one for
        removing elements (<strong style={{ color: '#ff4757' }}>FRONT</strong>).
        You always add at the rear and remove from the front — just like a real queue.
      </p>

      {/* Ticket counter analogy */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 28 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
          🎟️ The ticket counter — FIFO in action
        </h3>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 14, lineHeight: 1.75 }}>
            Three people are in line: Alice, Bob, Carol. A new person Dave joins at the rear.
            The counter serves Alice first — she is at the front.
          </div>
          <QueueVisual
            items={[
              { val: 'Alice', highlight: 'front' },
              { val: 'Bob' },
              { val: 'Carol' },
              { val: 'Dave', highlight: 'rear' },
            ]}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ff4757', marginBottom: 6 }}>FRONT — where removal happens</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>
              The oldest element. Always served next. Like the person at the front of the line.
            </div>
          </div>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', marginBottom: 6 }}>REAR — where addition happens</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>
              The newest element. Just joined. Like the person who just got in line.
            </div>
          </div>
        </div>
      </div>

      {/* Four operations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 28 }}>
        {[
          { op: 'enqueue(x)', desc: 'Add element x at the REAR of the queue', color: 'var(--green)', time: 'O(1)' },
          { op: 'dequeue()', desc: 'Remove and return the element at FRONT', color: '#ff4757', time: 'O(1)' },
          { op: 'peek()', desc: 'Read the FRONT element without removing it', color: '#facc15', time: 'O(1)' },
          { op: 'isEmpty()', desc: 'Check if the queue has no elements', color: '#4285f4', time: 'O(1)' },
        ].map((item) => (
          <div key={item.op} style={{ background: 'var(--surface)', border: `1px solid ${item.color}33`, borderRadius: 10, padding: '16px 18px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 800, color: item.color, marginBottom: 8 }}>{item.op}</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 10 }}>{item.desc}</div>
            <ComplexityBadge value={item.time} color={item.color} />
          </div>
        ))}
      </div>

      <Callout type="info">
        <strong>Stack vs Queue — one line summary:</strong> Stack = LIFO, one end.
        Queue = FIFO, two ends. Both have O(1) operations. Choose based on
        whether you need the newest item (stack) or the oldest item (queue).
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 2 — QUEUE USING ARRAY
      ══════════════════════════════════════ */}
      <SectionTag text="Section 2" />
      <SectionTitle>Queue Using an Array</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        To build a queue with an array we track two indices:
        <strong style={{ color: '#ff4757' }}> front</strong> (where we remove from) and
        <strong style={{ color: 'var(--green)' }}> rear</strong> (where we add to).
        Both start at -1. When we enqueue, rear moves right. When we dequeue, front moves right.
      </p>

      <CodeBlock code={`#include <stdio.h>

#define MAX 6

struct Queue {
    int data[MAX];
    int front;
    int rear;
};
typedef struct Queue Queue;

void initQueue(Queue *q) {
    q->front = -1;
    q->rear  = -1;
}

int isEmpty(Queue *q) {
    return q->front == -1;
}

int isFull(Queue *q) {
    return q->rear == MAX - 1;
}

void enqueue(Queue *q, int value) {
    if (isFull(q)) {
        printf("Queue is full — cannot enqueue %d\\n", value);
        return;
    }
    if (isEmpty(q)) {
        q->front = 0;  /* first element — set front to 0 */
    }
    q->rear++;
    q->data[q->rear] = value;
    printf("Enqueued: %d\\n", value);
}

int dequeue(Queue *q) {
    if (isEmpty(q)) {
        printf("Queue is empty — nothing to dequeue\\n");
        return -1;
    }
    int val = q->data[q->front];

    if (q->front == q->rear) {
        /* last element removed — reset both pointers */
        q->front = -1;
        q->rear  = -1;
    } else {
        q->front++;  /* move front forward */
    }
    return val;
}

int peek(Queue *q) {
    if (isEmpty(q)) return -1;
    return q->data[q->front];
}

void printQueue(Queue *q) {
    if (isEmpty(q)) {
        printf("Queue is empty\\n");
        return;
    }
    printf("Queue (front → rear): ");
    int i;
    for (i = q->front; i <= q->rear; i++) {
        printf("%d ", q->data[i]);
    }
    printf("\\n");
}

int main() {
    Queue q;
    initQueue(&q);

    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);
    enqueue(&q, 40);
    printQueue(&q);                     /* Queue (front → rear): 10 20 30 40 */

    printf("Dequeue: %d\\n", dequeue(&q)); /* Dequeue: 10 */
    printf("Dequeue: %d\\n", dequeue(&q)); /* Dequeue: 20 */
    printQueue(&q);                     /* Queue (front → rear): 30 40 */
    printf("Peek: %d\\n", peek(&q));    /* Peek: 30 */

    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 3 — THE WASTED SPACE PROBLEM
      ══════════════════════════════════════ */}
      <SectionTag text="Section 3" />
      <SectionTitle>The Wasted Space Problem — Why Circular Queue Exists</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        The simple array queue has a critical flaw. Once you dequeue elements,
        the slots at the front of the array become empty — but you can never
        use them again because rear can only move right, never left.
        Eventually the queue reports "full" even though most of the array is empty.
      </p>

      {/* Wasted space visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 24, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // After enqueueing 6 items then dequeueing 4 — rear = 5 (MAX-1), looks "full"
        </div>
        <div style={{ display: 'flex', gap: 4, minWidth: 360, marginBottom: 10 }}>
          {[
            { val: '—', wasted: true },
            { val: '—', wasted: true },
            { val: '—', wasted: true },
            { val: '—', wasted: true },
            { val: '50', front: true },
            { val: '60', rear: true },
          ].map((cell, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, border: `2px solid ${cell.wasted ? 'var(--border)' : cell.front ? '#ff4757' : 'var(--green)'}`, borderRadius: 6, color: cell.wasted ? 'var(--border)' : cell.front ? '#ff4757' : 'var(--green)', background: cell.wasted ? 'var(--bg2)' : cell.front ? 'rgba(255,71,87,0.08)' : 'rgba(0,230,118,0.08)' }}>
                {cell.val}
              </div>
              <div style={{ fontSize: 10, color: cell.wasted ? '#ff4757' : 'var(--muted)', marginTop: 5, fontFamily: 'var(--font-mono)' }}>
                {cell.wasted ? 'wasted' : cell.front ? 'front' : 'rear'}
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13, color: '#ff4757', fontFamily: 'var(--font-mono)', marginTop: 8 }}>
          rear == MAX-1 → isFull() returns true — but 4 slots are empty and unused!
        </div>
      </div>

      <Callout type="warning">
        <strong>This is a real problem in systems programming.</strong> Imagine a network
        packet buffer that reports full after processing a few thousand packets —
        even though most of the buffer is empty. The fix is the circular queue.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 4 — CIRCULAR QUEUE
      ══════════════════════════════════════ */}
      <SectionTag text="Section 4" />
      <SectionTitle>Circular Queue — Fixing Wasted Space</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        A circular queue wraps around. When rear reaches the last index,
        the next enqueue goes back to index 0 — if that slot is free.
        The array is treated as a circle, not a straight line.
        We achieve this with one elegant trick: the <strong style={{ color: 'var(--green)' }}>modulo operator</strong>.
      </p>

      {/* Circular visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // rear = (rear + 1) % MAX — wraps back to 0 when it reaches MAX
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          {/* Linear view */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>Linear (broken)</div>
            <div style={{ display: 'flex', gap: 2 }}>
              {['×', '×', '×', '50', '60', '→?'].map((v, i) => (
                <div key={i} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${i < 3 ? 'var(--border)' : i === 5 ? '#ff4757' : 'var(--green)'}`, borderRadius: 4, fontSize: 12, fontFamily: 'var(--font-mono)', color: i < 3 ? 'var(--border)' : i === 5 ? '#ff4757' : 'var(--green)', background: i === 5 ? 'rgba(255,71,87,0.08)' : 'transparent' }}>{v}</div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: '#ff4757', marginTop: 6 }}>rear can't move → STUCK</div>
          </div>

          <div style={{ fontSize: 24, color: 'var(--muted)' }}>→</div>

          {/* Circular view */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>Circular (fixed)</div>
            <div style={{ display: 'flex', gap: 2 }}>
              {['70', '×', '×', '50', '60', '→0'].map((v, i) => (
                <div key={i} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${i === 0 ? 'var(--green)' : i < 3 ? 'var(--border)' : 'var(--green)'}`, borderRadius: 4, fontSize: 12, fontFamily: 'var(--font-mono)', color: i === 0 ? 'var(--green)' : i < 3 ? 'var(--border)' : 'var(--green)', background: i === 0 ? 'rgba(0,230,118,0.1)' : 'transparent' }}>{v}</div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: 'var(--green)', marginTop: 6 }}>70 wraps to index 0 ✓</div>
          </div>
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

#define MAX 6

struct CQueue {
    int data[MAX];
    int front;
    int rear;
    int size;  /* track actual number of elements */
};
typedef struct CQueue CQueue;

void initCQ(CQueue *q) {
    q->front = 0;
    q->rear  = -1;
    q->size  = 0;
}

int isEmptyCQ(CQueue *q) { return q->size == 0; }
int isFullCQ(CQueue *q)  { return q->size == MAX; }

void enqueueCQ(CQueue *q, int value) {
    if (isFullCQ(q)) {
        printf("Circular queue is full\\n");
        return;
    }
    q->rear = (q->rear + 1) % MAX;  /* wrap around using modulo */
    q->data[q->rear] = value;
    q->size++;
    printf("Enqueued: %d at index %d\\n", value, q->rear);
}

int dequeueCQ(CQueue *q) {
    if (isEmptyCQ(q)) {
        printf("Circular queue is empty\\n");
        return -1;
    }
    int val = q->data[q->front];
    q->front = (q->front + 1) % MAX;  /* wrap front around too */
    q->size--;
    return val;
}

void printCQ(CQueue *q) {
    if (isEmptyCQ(q)) { printf("Queue is empty\\n"); return; }
    printf("Circular queue: ");
    int i, idx = q->front;
    for (i = 0; i < q->size; i++) {
        printf("%d ", q->data[idx]);
        idx = (idx + 1) % MAX;
    }
    printf("\\n");
}

int main() {
    CQueue q;
    initCQ(&q);

    enqueueCQ(&q, 10);  /* index 0 */
    enqueueCQ(&q, 20);  /* index 1 */
    enqueueCQ(&q, 30);  /* index 2 */
    enqueueCQ(&q, 40);  /* index 3 */
    enqueueCQ(&q, 50);  /* index 4 */
    enqueueCQ(&q, 60);  /* index 5 */

    printf("Dequeue: %d\\n", dequeueCQ(&q)); /* 10 — front moves to index 1 */
    printf("Dequeue: %d\\n", dequeueCQ(&q)); /* 20 — front moves to index 2 */

    enqueueCQ(&q, 70);  /* wraps around to index 0 — the slot freed earlier */
    enqueueCQ(&q, 80);  /* wraps around to index 1 */

    printCQ(&q);  /* 30 40 50 60 70 80 — all 6 slots used efficiently */

    return 0;
}`} />

      <Callout type="tip">
        <strong>The modulo trick explained:</strong> When rear = 5 (MAX-1) and MAX = 6,
        doing <code style={{ fontFamily: 'var(--font-mono)' }}>(5 + 1) % 6 = 0</code> — rear wraps back to index 0.
        This single line of arithmetic turns a straight array into a circular buffer.
        Used everywhere: operating system scheduling, network buffers, audio processing.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 5 — QUEUE USING LINKED LIST
      ══════════════════════════════════════ */}
      <SectionTag text="Section 5" />
      <SectionTitle>Queue Using a Linked List</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        A linked list queue has no size limit and no wasted space problem.
        We keep two pointers — <code style={{ fontFamily: 'var(--font-mono)', color: '#ff4757', fontSize: 14 }}>front</code> pointing
        to the first node (dequeue here) and <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>rear</code> pointing
        to the last node (enqueue here). Enqueue is O(1) because we have the rear pointer directly.
      </p>

      <CodeBlock code={`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};
typedef struct Node Node;

/* keep both front and rear pointers */
Node *front = NULL;
Node *rear  = NULL;

int isEmptyLL() { return front == NULL; }

void enqueueLL(int value) {
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->data = value;
    newNode->next = NULL;

    if (rear == NULL) {
        /* empty queue — new node is both front and rear */
        front = rear = newNode;
    } else {
        rear->next = newNode;  /* attach at rear */
        rear = newNode;         /* move rear forward */
    }
}

int dequeueLL() {
    if (isEmptyLL()) {
        printf("Queue is empty\\n");
        return -1;
    }
    Node *temp = front;
    int val = temp->data;
    front = front->next;  /* move front forward */

    if (front == NULL) {
        rear = NULL;  /* queue became empty — reset rear too */
    }
    free(temp);
    return val;
}

void printQueueLL() {
    Node *current = front;
    printf("Queue (front → rear): ");
    while (current != NULL) {
        printf("%d ", current->data);
        current = current->next;
    }
    printf("\\n");
}

int main() {
    enqueueLL(10);
    enqueueLL(20);
    enqueueLL(30);
    enqueueLL(40);

    printQueueLL();                        /* 10 20 30 40 */
    printf("Dequeue: %d\\n", dequeueLL()); /* 10 */
    printf("Dequeue: %d\\n", dequeueLL()); /* 20 */
    printQueueLL();                        /* 30 40 */

    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 6 — DEQUE
      ══════════════════════════════════════ */}
      <SectionTag text="Section 6" />
      <SectionTitle>Deque — Double Ended Queue</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        A Deque (pronounced "deck") is a queue where you can insert and delete
        from <strong style={{ color: 'var(--green)' }}>both ends</strong> — front and rear.
        It is more flexible than both stack and queue and can act as either.
        Real use: the browser's back/forward history, sliding window problems in DSA.
      </p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Operation', 'What it does', 'Time'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, background: 'var(--surface)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['insertFront(x)', 'Add x at the FRONT', 'O(1)'],
              ['insertRear(x)', 'Add x at the REAR', 'O(1)'],
              ['deleteFront()', 'Remove from FRONT', 'O(1)'],
              ['deleteRear()', 'Remove from REAR', 'O(1)'],
              ['peekFront()', 'Read FRONT without removing', 'O(1)'],
              ['peekRear()', 'Read REAR without removing', 'O(1)'],
            ].map(([op, desc, time], ri) => (
              <tr key={ri}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{op}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)' }}>{desc}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: '#00e676', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CodeBlock code={`#include <stdio.h>

#define MAX 8

struct Deque {
    int data[MAX];
    int front;
    int rear;
    int size;
};
typedef struct Deque Deque;

void initDeque(Deque *dq) {
    dq->front = MAX / 2;  /* start in the middle so both ends have room */
    dq->rear  = MAX / 2 - 1;
    dq->size  = 0;
}

int isEmptyDQ(Deque *dq) { return dq->size == 0; }
int isFullDQ(Deque *dq)  { return dq->size == MAX; }

void insertRear(Deque *dq, int val) {
    if (isFullDQ(dq)) { printf("Deque full\\n"); return; }
    dq->rear = (dq->rear + 1) % MAX;
    dq->data[dq->rear] = val;
    dq->size++;
}

void insertFront(Deque *dq, int val) {
    if (isFullDQ(dq)) { printf("Deque full\\n"); return; }
    dq->front = (dq->front - 1 + MAX) % MAX;  /* move front backward (wrap) */
    dq->data[dq->front] = val;
    dq->size++;
}

int deleteRear(Deque *dq) {
    if (isEmptyDQ(dq)) return -1;
    int val = dq->data[dq->rear];
    dq->rear = (dq->rear - 1 + MAX) % MAX;
    dq->size--;
    return val;
}

int deleteFront(Deque *dq) {
    if (isEmptyDQ(dq)) return -1;
    int val = dq->data[dq->front];
    dq->front = (dq->front + 1) % MAX;
    dq->size--;
    return val;
}

int main() {
    Deque dq;
    initDeque(&dq);

    insertRear(&dq, 10);   /* [10] */
    insertRear(&dq, 20);   /* [10, 20] */
    insertFront(&dq, 5);   /* [5, 10, 20] */
    insertFront(&dq, 1);   /* [1, 5, 10, 20] */

    printf("Delete front: %d\\n", deleteFront(&dq)); /* 1 */
    printf("Delete rear:  %d\\n", deleteRear(&dq));  /* 20 */
    /* remaining: [5, 10] */

    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 7 — PRIORITY QUEUE
      ══════════════════════════════════════ */}
      <SectionTag text="Section 7" />
      <SectionTitle>Priority Queue — Not All Are Equal</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        In a normal queue, everyone waits in order. In a priority queue,
        the element with the <strong style={{ color: 'var(--green)' }}>highest priority</strong> is served first —
        regardless of when it arrived. Think of a hospital emergency room:
        a critical patient goes ahead of someone with a minor injury,
        even if the minor patient arrived first.
      </p>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>
          Simple priority queue using an ordered array:
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: '#ff4757' }} />
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>Priority 3 (highest)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: '#facc15' }} />
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>Priority 2</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: 'var(--green)' }} />
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>Priority 1 (lowest)</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[
            { val: 'P3: Surgery', color: '#ff4757' },
            { val: 'P2: X-Ray', color: '#facc15' },
            { val: 'P2: Blood', color: '#facc15' },
            { val: 'P1: Check', color: 'var(--green)' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '10px 14px', border: `2px solid ${item.color}`, borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: item.color, background: `${item.color}10` }}>
              {item.val}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12, fontFamily: 'var(--font-mono)' }}>
          Surgery is served first — highest priority, regardless of arrival order
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

#define MAX 10

struct PQItem {
    int data;
    int priority;  /* higher number = higher priority */
};

struct PQueue {
    struct PQItem items[MAX];
    int size;
};
typedef struct PQueue PQueue;

void initPQ(PQueue *pq) { pq->size = 0; }
int isEmptyPQ(PQueue *pq) { return pq->size == 0; }

void enqueuePQ(PQueue *pq, int data, int priority) {
    if (pq->size == MAX) { printf("Priority queue full\\n"); return; }
    pq->items[pq->size].data     = data;
    pq->items[pq->size].priority = priority;
    pq->size++;
}

/* dequeue returns the item with the HIGHEST priority */
int dequeuePQ(PQueue *pq) {
    if (isEmptyPQ(pq)) return -1;

    int maxIdx = 0;  /* index of highest priority item */
    int i;
    for (i = 1; i < pq->size; i++) {
        if (pq->items[i].priority > pq->items[maxIdx].priority) {
            maxIdx = i;
        }
    }

    int val = pq->items[maxIdx].data;

    /* remove by shifting remaining items left */
    for (i = maxIdx; i < pq->size - 1; i++) {
        pq->items[i] = pq->items[i + 1];
    }
    pq->size--;
    return val;
}

int main() {
    PQueue pq;
    initPQ(&pq);

    enqueuePQ(&pq, 100, 1);  /* low priority */
    enqueuePQ(&pq, 200, 3);  /* high priority */
    enqueuePQ(&pq, 300, 2);  /* medium priority */
    enqueuePQ(&pq, 400, 3);  /* also high priority */

    printf("%d\\n", dequeuePQ(&pq));  /* 200 (priority 3, arrived first) */
    printf("%d\\n", dequeuePQ(&pq));  /* 400 (priority 3) */
    printf("%d\\n", dequeuePQ(&pq));  /* 300 (priority 2) */
    printf("%d\\n", dequeuePQ(&pq));  /* 100 (priority 1) */

    return 0;
}`} />

      <Callout type="info">
        <strong>Note:</strong> This simple O(n) priority queue works for learning.
        In production systems, priority queues are implemented using a
        <strong> Heap</strong> data structure which gives O(log n) enqueue and dequeue.
        We build heaps in Unit 13 — and you will see exactly why they are better.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 8 — REAL WORLD USES
      ══════════════════════════════════════ */}
      <SectionTag text="Section 8" />
      <SectionTitle>What This Looks Like at Work — Real Queue Uses</SectionTitle>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {[
          {
            icon: '🖨️',
            title: 'Printer Spooling',
            company: 'Every office network',
            desc: 'When multiple people print, jobs go into a queue. First print request sent = first document printed. Exactly FIFO. The OS manages this with a queue internally.',
          },
          {
            icon: '⚙️',
            title: 'CPU Process Scheduling',
            company: 'Every operating system',
            desc: 'Your OS uses multiple queues to decide which program gets CPU time next. Ready queue, waiting queue, I/O queue — all managed using queue data structures.',
          },
          {
            icon: '💬',
            title: 'Message Delivery — WhatsApp, Kafka',
            company: 'WhatsApp · Zomato · Swiggy',
            desc: 'Messages are queued at the server and delivered in order. Apache Kafka is essentially a distributed queue that handles billions of messages per day for companies like Swiggy.',
          },
          {
            icon: '🌐',
            title: 'Web Server Request Handling',
            company: 'Razorpay · PhonePe · Zerodha',
            desc: 'When thousands of requests hit a payment API at once, they are queued. The server processes them one by one — fairly, in order — preventing overload.',
          },
          {
            icon: '🔍',
            title: 'BFS Graph Traversal',
            company: 'Google Search · LinkedIn · Maps',
            desc: 'Breadth-First Search — which we cover in Unit 15 — uses a queue to visit nodes level by level. Every shortest-path algorithm in maps and social networks relies on this.',
          },
        ].map((item) => (
          <div key={item.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px' }}>
            <div style={{ fontSize: 26, flexShrink: 0 }}>{item.icon}</div>
            <div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{item.title}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 8px' }}>{item.company}</div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 9 — COMPARISON TABLE
      ══════════════════════════════════════ */}
      <SectionTag text="Section 9" />
      <SectionTitle>All Queue Types — Side by Side</SectionTitle>

      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Type', 'Add at', 'Remove from', 'Key feature', 'Use case'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, background: 'var(--surface)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Simple Queue', 'Rear', 'Front', 'FIFO, fixed array', 'Basic ordering tasks'],
              ['Circular Queue', 'Rear (wraps)', 'Front (wraps)', 'No wasted space', 'Buffers, OS scheduling'],
              ['Queue (LL)', 'Rear', 'Front', 'Dynamic size', 'Unknown max size'],
              ['Deque', 'Front or Rear', 'Front or Rear', 'Both ends flexible', 'Sliding window, history'],
              ['Priority Queue', 'Anywhere', 'Highest priority first', 'Order by priority', 'Scheduling, Dijkstra'],
            ].map(([type, add, remove, key, use], ri) => (
              <tr key={ri}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--green)', fontWeight: 700 }}>{type}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>{add}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>{remove}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)', fontSize: 12 }}>{key}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontSize: 12 }}>{use}</td>
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
      <SectionTitle>You Are Ready for Unit 08</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        You now understand all queue variants — simple, circular, linked list,
        deque, and priority queue. You also know why queues are used in real systems
        from printers to payment APIs to graph algorithms.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 32 }}>
        In Unit 08 we tackle <strong style={{ color: 'var(--text)' }}>Recursion</strong> —
        the concept that trips up almost every beginner. A function that calls itself.
        We will explain it more clearly than any textbook ever has, trace every call
        step by step, and build up to the legendary Tower of Hanoi problem.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(0,230,118,0.02) 100%)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 12, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 700, marginBottom: 6 }}>UP NEXT → UNIT 08</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Recursion — A Function That Calls Itself</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Base case, recursive case, call stack tracing, Tower of Hanoi — made simple.</div>
        </div>
        <Link href="/learn/dsa/recursion" style={{ background: 'var(--green)', color: '#000', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '10px 22px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Coming Soon →
        </Link>
      </div>

      <KeyTakeaways items={[
        'A queue is FIFO — First In, First Out. Add at REAR, remove from FRONT',
        'Four operations: enqueue (add rear), dequeue (remove front), peek (read front), isEmpty — all O(1)',
        'Simple array queue wastes space — once front moves right, those slots can never be reused',
        'Circular queue fixes this with modulo: rear = (rear + 1) % MAX — wraps around to use freed slots',
        'Linked list queue: no size limit, no wasted space, enqueue and dequeue both O(1) with front and rear pointers',
        'Deque allows insert and delete from BOTH ends — more flexible than stack or queue',
        'Priority queue serves highest priority first — not necessarily the oldest. Used in scheduling and Dijkstra',
        'Real uses: printer spooling, CPU scheduling, message queues (Kafka), BFS graph traversal',
        'Stack vs Queue: stack = newest first (LIFO), queue = oldest first (FIFO)',
      ]} />

    </LearnLayout>
  )
}