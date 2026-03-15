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

/* ── Array bar chart visual ── */
const ArrayBar = ({ values, highlight = [] }: { values: number[]; highlight?: number[] }) => (
  <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 60 }}>
    {values.map((v, i) => (
      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <div style={{
          width: 36,
          height: v * 6,
          background: highlight.includes(i) ? 'var(--green)' : 'rgba(0,230,118,0.25)',
          border: `1px solid ${highlight.includes(i) ? 'var(--green)' : 'rgba(0,230,118,0.4)'}`,
          borderRadius: '3px 3px 0 0',
          transition: 'all 0.2s',
        }} />
        <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: highlight.includes(i) ? 'var(--green)' : 'var(--muted)', fontWeight: highlight.includes(i) ? 800 : 400 }}>{v}</div>
      </div>
    ))}
  </div>
)

/* ── Algorithm header card ── */
const AlgoHeader = ({ num, name, best, avg, worst, space, stable, tagline }: {
  num: string; name: string; best: string; avg: string; worst: string
  space: string; stable: boolean; tagline: string
}) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 0, marginTop: 32 }}>
    <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '14px 20px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--green)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 4, padding: '2px 8px' }}>{num}</span>
      <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{name}</span>
      <span style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic' }}>{tagline}</span>
    </div>
    <div style={{ padding: '14px 20px', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {[
        { label: 'Best', value: best, color: '#00e676' },
        { label: 'Average', value: avg, color: '#facc15' },
        { label: 'Worst', value: worst, color: '#ff4757' },
        { label: 'Space', value: space, color: '#4285f4' },
        { label: 'Stable', value: stable ? 'Yes ✓' : 'No ✗', color: stable ? '#00e676' : '#ff4757' },
      ].map(item => (
        <div key={item.label} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{item.label}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800, color: item.color }}>{item.value}</div>
        </div>
      ))}
    </div>
  </div>
)

export default function SortingPage() {
  return (
    <LearnLayout
      title="Unit 09 — Sorting Algorithms"
      description="Six ways to arrange data in order — from the simplest to the fastest. Every algorithm explained with step-by-step visuals, full C code, and complexity analysis."
      section="DSA"
      readTime="120 min"
      updatedAt="March 2026"
    >

      {/* ── Badges ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'UNIT 09', green: true },
          { label: 'Prerequisite: Units 02 + 08', green: false },
          { label: '120 min read', green: false },
        ].map((b) => (
          <span key={b.label} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: b.green ? 700 : 600, color: b.green ? 'var(--green)' : 'var(--muted)', background: b.green ? 'rgba(0,230,118,0.1)' : 'var(--surface)', border: `1px solid ${b.green ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`, borderRadius: 6, padding: '4px 10px' }}>
            {b.label}
          </span>
        ))}
      </div>

      <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Sorting is one of the most studied problems in all of computer science.
        Given a list of items in random order, arrange them in a defined sequence —
        ascending, descending, alphabetical. Simple to describe, endlessly interesting to optimise.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>
        In this unit we cover six sorting algorithms — from the naive O(n²) ones that
        every beginner learns, to the powerful O(n log n) ones that real systems use.
        Every algorithm gets a full explanation, a step-by-step trace, complete C code,
        and honest complexity analysis.
      </p>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 1 — WHY SORTING MATTERS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 1" />
      <SectionTitle>Why Does Sorting Matter?</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Sorting is not just a textbook exercise. It is the foundation that makes
        almost every other operation faster. Consider:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {[
          { icon: '🔍', title: 'Binary search requires sorted data', desc: 'The O(log n) search algorithm we cover in Unit 10 only works if the array is sorted. Searching 1 million items takes 20 steps instead of 1 million — but only if sorted.' },
          { icon: '📊', title: 'Databases sort constantly', desc: 'Every ORDER BY in SQL triggers a sort. Every index in PostgreSQL or MySQL is a sorted structure. Database performance depends heavily on efficient sorting.' },
          { icon: '🤝', title: 'Merge operations need sorted input', desc: 'Combining two datasets, removing duplicates, finding common elements — all of these are trivial with sorted data and expensive without.' },
          { icon: '📱', title: 'Leaderboards, rankings, feeds', desc: 'Every time you see a leaderboard, search results, or a ranked feed — a sorting algorithm ran to produce that view.' },
        ].map((item) => (
          <div key={item.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px' }}>
            <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Stability explained */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 12 }}>
          One term to know before we start — Stability
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 10 }}>
          A sorting algorithm is <strong style={{ color: 'var(--green)' }}>stable</strong> if it preserves the
          original relative order of elements that have equal keys.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', marginBottom: 6 }}>Stable example</div>
            <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.7 }}>
              Sort students by marks. Two students both scored 85.
              A stable sort keeps them in their original name order (Alice before Bob if Alice was listed first).
            </div>
          </div>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ff4757', marginBottom: 6 }}>Unstable — may reorder equal elements</div>
            <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.7 }}>
              An unstable sort might put Bob before Alice even though
              Alice was originally first — their relative order is not guaranteed.
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          ALGORITHM 1 — BUBBLE SORT
      ══════════════════════════════════════ */}
      <SectionTag text="Algorithm 1" />

      <AlgoHeader
        num="01"
        name="Bubble Sort"
        tagline="The simplest — and the slowest"
        best="O(n)"
        avg="O(n²)"
        worst="O(n²)"
        space="O(1)"
        stable={true}
      />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          Bubble sort repeatedly steps through the array, compares adjacent elements,
          and swaps them if they are in the wrong order. After each pass, the largest
          unsorted element "bubbles up" to its correct position at the end — just like
          air bubbles rising in water. Repeat n-1 times and the array is sorted.
        </p>
      </div>

      {/* Trace visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // Tracing bubble sort on [5, 3, 8, 1, 2] — Pass 1
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { arr: [5, 3, 8, 1, 2], note: 'Start — compare arr[0]=5 and arr[1]=3', hi: [0, 1] },
            { arr: [3, 5, 8, 1, 2], note: '5 > 3 → swap. Compare arr[1]=5 and arr[2]=8', hi: [1, 2] },
            { arr: [3, 5, 8, 1, 2], note: '5 < 8 → no swap. Compare arr[2]=8 and arr[3]=1', hi: [2, 3] },
            { arr: [3, 5, 1, 8, 2], note: '8 > 1 → swap. Compare arr[3]=8 and arr[4]=2', hi: [3, 4] },
            { arr: [3, 5, 1, 2, 8], note: '8 > 2 → swap. Pass 1 done — 8 is in final position', hi: [4] },
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <ArrayBar values={step.arr} highlight={step.hi} />
              <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', flex: 1, minWidth: 200 }}>{step.note}</div>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

void bubbleSort(int arr[], int n) {
    int i, j, temp;
    int swapped;

    for (i = 0; i < n - 1; i++) {
        swapped = 0;  /* track if any swap happened this pass */

        for (j = 0; j < n - i - 1; j++) {  /* inner loop shrinks each pass */
            if (arr[j] > arr[j + 1]) {
                /* swap adjacent elements */
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }

        /* optimisation: if no swaps happened, array is already sorted */
        if (swapped == 0) break;
    }
}

void printArray(int arr[], int n) {
    int i;
    for (i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {5, 3, 8, 1, 2};
    int n = 5;

    printf("Before: "); printArray(arr, n);
    bubbleSort(arr, n);
    printf("After:  "); printArray(arr, n);
    /* After: 1 2 3 5 8 */
    return 0;
}`} />

      <Callout type="tip">
        <strong>The swapped optimisation</strong> makes best case O(n) — if the array is already
        sorted, the first pass makes zero swaps and the loop exits immediately.
        Without this, even a sorted array takes O(n²) passes. Always include it.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          ALGORITHM 2 — SELECTION SORT
      ══════════════════════════════════════ */}
      <SectionTag text="Algorithm 2" />

      <AlgoHeader
        num="02"
        name="Selection Sort"
        tagline="Find the minimum, place it — repeat"
        best="O(n²)"
        avg="O(n²)"
        worst="O(n²)"
        space="O(1)"
        stable={false}
      />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          Selection sort divides the array into two parts: sorted (left) and unsorted (right).
          In each pass, find the minimum element in the unsorted part and swap it into
          its correct position at the start of the unsorted section. After n-1 passes, sorted.
          Simple and predictable — always exactly O(n²) regardless of input.
        </p>
      </div>

      {/* Trace */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // Tracing selection sort on [5, 3, 8, 1, 2]
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { arr: [5, 3, 8, 1, 2], note: 'Pass 1: min=1 at index 3 → swap with index 0', hi: [0, 3] },
            { arr: [1, 3, 8, 5, 2], note: 'Pass 2: min=2 at index 4 → swap with index 1', hi: [1, 4] },
            { arr: [1, 2, 8, 5, 3], note: 'Pass 3: min=3 at index 4 → swap with index 2', hi: [2, 4] },
            { arr: [1, 2, 3, 5, 8], note: 'Pass 4: min=5 at index 3 → already in place ✓', hi: [3] },
            { arr: [1, 2, 3, 5, 8], note: 'Done — fully sorted', hi: [0, 1, 2, 3, 4] },
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <ArrayBar values={step.arr} highlight={step.hi} />
              <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', flex: 1, minWidth: 200 }}>{step.note}</div>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

void selectionSort(int arr[], int n) {
    int i, j, minIdx, temp;

    for (i = 0; i < n - 1; i++) {
        minIdx = i;  /* assume current position holds the minimum */

        /* find the actual minimum in the unsorted portion */
        for (j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;  /* found a smaller element */
            }
        }

        /* swap the found minimum with the first unsorted element */
        if (minIdx != i) {
            temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
}

int main() {
    int arr[] = {5, 3, 8, 1, 2};
    int n = 5;
    selectionSort(arr, n);
    int i;
    for (i = 0; i < n; i++) printf("%d ", arr[i]);
    /* Output: 1 2 3 5 8 */
    return 0;
}`} />

      <Callout type="info">
        <strong>Selection sort makes exactly n-1 swaps</strong> — one per pass, regardless
        of input. This makes it useful when swap cost is very high (like writing to flash
        memory). It does more comparisons than bubble sort but fewer swaps.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          ALGORITHM 3 — INSERTION SORT
      ══════════════════════════════════════ */}
      <SectionTag text="Algorithm 3" />

      <AlgoHeader
        num="03"
        name="Insertion Sort"
        tagline="Like sorting cards in your hand"
        best="O(n)"
        avg="O(n²)"
        worst="O(n²)"
        space="O(1)"
        stable={true}
      />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          Imagine holding a hand of cards and picking them up one at a time.
          Each new card gets inserted into the correct position among the cards
          you already hold. Insertion sort works the same way — it takes one element
          at a time and inserts it into its correct position in the already-sorted portion
          on the left. Excellent for nearly-sorted data.
        </p>
      </div>

      {/* Trace */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // Tracing insertion sort on [5, 3, 8, 1, 2]
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { arr: [5, 3, 8, 1, 2], note: 'key=3: 3 < 5 → shift 5 right, insert 3', hi: [0, 1] },
            { arr: [3, 5, 8, 1, 2], note: 'key=8: 8 > 5 → already in place', hi: [2] },
            { arr: [3, 5, 8, 1, 2], note: 'key=1: shift 8,5,3 right → insert 1 at front', hi: [0, 3] },
            { arr: [1, 3, 5, 8, 2], note: 'key=2: shift 8,5,3 right → insert 2 after 1', hi: [1, 4] },
            { arr: [1, 2, 3, 5, 8], note: 'Done ✓', hi: [0, 1, 2, 3, 4] },
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <ArrayBar values={step.arr} highlight={step.hi} />
              <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', flex: 1, minWidth: 200 }}>{step.note}</div>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

void insertionSort(int arr[], int n) {
    int i, j, key;

    for (i = 1; i < n; i++) {
        key = arr[i];  /* element to be inserted into sorted portion */
        j = i - 1;

        /* shift elements of sorted portion that are greater than key */
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];  /* move element one position right */
            j--;
        }

        arr[j + 1] = key;  /* insert key at its correct position */
    }
}

int main() {
    int arr[] = {5, 3, 8, 1, 2};
    int n = 5;
    insertionSort(arr, n);
    int i;
    for (i = 0; i < n; i++) printf("%d ", arr[i]);
    /* Output: 1 2 3 5 8 */
    return 0;
}`} />

      <Callout type="tip">
        <strong>Insertion sort is the best of the O(n²) algorithms for nearly sorted data.</strong>
        If the array is almost sorted — only a few elements out of place —
        insertion sort runs in almost O(n). Real systems like TimSort (used in Python and Java)
        use insertion sort for small subarrays because of this property.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          ALGORITHM 4 — MERGE SORT
      ══════════════════════════════════════ */}
      <SectionTag text="Algorithm 4" />

      <AlgoHeader
        num="04"
        name="Merge Sort"
        tagline="Divide and conquer — guaranteed O(n log n)"
        best="O(n log n)"
        avg="O(n log n)"
        worst="O(n log n)"
        space="O(n)"
        stable={true}
      />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          Merge sort uses the divide-and-conquer strategy and recursion from Unit 08.
          Split the array in half, recursively sort each half, then merge the two sorted
          halves back together. The merge step is where the real work happens — and it
          is linear. This guarantees O(n log n) in all cases — best, average, and worst.
        </p>
      </div>

      {/* Merge sort tree visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // Merge sort on [5, 3, 8, 1] — divide phase (going down)
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', minWidth: 400 }}>
          {/* Level 0 */}
          <div style={{ display: 'flex', gap: 4 }}>
            {[5, 3, 8, 1].map((v, i) => (
              <div key={i} style={{ width: 44, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--green)', borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 800, color: 'var(--green)', background: 'rgba(0,230,118,0.06)' }}>{v}</div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>↓ split</div>
          {/* Level 1 */}
          <div style={{ display: 'flex', gap: 24 }}>
            {[[5, 3], [8, 1]].map((pair, pi) => (
              <div key={pi} style={{ display: 'flex', gap: 4 }}>
                {pair.map((v, i) => (
                  <div key={i} style={{ width: 44, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #4285f4', borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 800, color: '#4285f4', background: 'rgba(66,133,244,0.06)' }}>{v}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>↓ split</div>
          {/* Level 2 */}
          <div style={{ display: 'flex', gap: 12 }}>
            {[5, 3, 8, 1].map((v, i) => (
              <div key={i} style={{ width: 44, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #7b61ff', borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 800, color: '#7b61ff', background: 'rgba(123,97,255,0.06)' }}>{v}</div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>↑ merge back up</div>
          {/* Merge results */}
          <div style={{ display: 'flex', gap: 24 }}>
            {[[3, 5], [1, 8]].map((pair, pi) => (
              <div key={pi} style={{ display: 'flex', gap: 4 }}>
                {pair.map((v, i) => (
                  <div key={i} style={{ width: 44, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #4285f4', borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 800, color: '#4285f4', background: 'rgba(66,133,244,0.06)' }}>{v}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>↑ merge</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1, 3, 5, 8].map((v, i) => (
              <div key={i} style={{ width: 44, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--green)', borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 800, color: 'var(--green)', background: 'rgba(0,230,118,0.1)' }}>{v}</div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>sorted ✓</div>
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

/* merge two sorted halves into one sorted array */
void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;   /* size of left half */
    int n2 = right - mid;       /* size of right half */

    /* temporary arrays to hold the two halves */
    int L[n1], R[n2];
    int i, j, k;

    /* copy data into temp arrays */
    for (i = 0; i < n1; i++) L[i] = arr[left + i];
    for (j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

    /* merge the temp arrays back — comparing front elements */
    i = 0; j = 0; k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    /* copy remaining elements if any */
    while (i < n1) { arr[k] = L[i]; i++; k++; }
    while (j < n2) { arr[k] = R[j]; j++; k++; }
}

/* recursively split and sort */
void mergeSort(int arr[], int left, int right) {
    if (left >= right) return;  /* base case: one or zero elements */

    int mid = left + (right - left) / 2;  /* find midpoint */

    mergeSort(arr, left, mid);       /* sort left half */
    mergeSort(arr, mid + 1, right);  /* sort right half */
    merge(arr, left, mid, right);    /* merge both halves */
}

int main() {
    int arr[] = {5, 3, 8, 1, 2, 9, 4};
    int n = 7;
    mergeSort(arr, 0, n - 1);
    int i;
    for (i = 0; i < n; i++) printf("%d ", arr[i]);
    /* Output: 1 2 3 4 5 8 9 */
    return 0;
}`} />

      <Callout type="info">
        <strong>Why O(n log n)?</strong> The array splits log n times (halving each level).
        At each level, merging all elements costs O(n). So total = n × log n = O(n log n).
        The tradeoff: it needs O(n) extra space for the temporary arrays during merge.
        If memory is tight — quick sort is preferred.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          ALGORITHM 5 — QUICK SORT
      ══════════════════════════════════════ */}
      <SectionTag text="Algorithm 5" />

      <AlgoHeader
        num="05"
        name="Quick Sort"
        tagline="The fastest in practice — pivot-based partitioning"
        best="O(n log n)"
        avg="O(n log n)"
        worst="O(n²)"
        space="O(log n)"
        stable={false}
      />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          Quick sort picks a <strong style={{ color: 'var(--green)' }}>pivot</strong> element and partitions
          the array so that all elements smaller than the pivot go to its left and all larger
          go to its right. The pivot is now in its final correct position. Recursively apply
          the same to the left and right parts. Despite O(n²) worst case,
          quick sort is the fastest in practice on average due to excellent cache behaviour.
        </p>
      </div>

      {/* Partition trace */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // Partition step on [3, 6, 8, 10, 1, 2, 1] — pivot = last element (1)
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { arr: [3, 6, 8, 10, 1, 2, 1], note: 'pivot = 1 (last). i = -1. Walk j from left to right', hi: [6] },
            { arr: [1, 6, 8, 10, 3, 2, 1], note: 'arr[0]=3 > pivot → skip. arr[4]=1 ≤ pivot → swap with arr[0]', hi: [0, 4] },
            { arr: [1, 1, 8, 10, 3, 2, 6], note: 'arr[5]=2 > pivot → skip. Partition done — place pivot', hi: [1, 6] },
            { arr: [1, 1, 8, 10, 3, 2, 6], note: 'Pivot 1 is now in its FINAL position at index 1 ✓', hi: [1] },
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <ArrayBar values={step.arr} highlight={step.hi} />
              <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', flex: 1, minWidth: 220 }}>{step.note}</div>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

/* swap helper */
void swap(int *a, int *b) {
    int temp = *a; *a = *b; *b = temp;
}

/*
 * partition: choose last element as pivot
 * place all smaller elements to its left
 * returns the final position of the pivot
 */
int partition(int arr[], int low, int high) {
    int pivot = arr[high];  /* last element is pivot */
    int i = low - 1;        /* i tracks the boundary of smaller elements */
    int j;

    for (j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);  /* move element to left side */
        }
    }

    /* place pivot in its correct final position */
    swap(&arr[i + 1], &arr[high]);
    return i + 1;  /* return pivot's final index */
}

void quickSort(int arr[], int low, int high) {
    if (low >= high) return;  /* base case: one or zero elements */

    int pi = partition(arr, low, high);  /* partition and get pivot index */

    quickSort(arr, low, pi - 1);   /* sort left of pivot */
    quickSort(arr, pi + 1, high);  /* sort right of pivot */
}

int main() {
    int arr[] = {5, 3, 8, 1, 2, 9, 4};
    int n = 7;
    quickSort(arr, 0, n - 1);
    int i;
    for (i = 0; i < n; i++) printf("%d ", arr[i]);
    /* Output: 1 2 3 4 5 8 9 */
    return 0;
}`} />

      <Callout type="warning">
        <strong>Quick sort's worst case is O(n²)</strong> — it happens when the pivot is
        always the smallest or largest element (e.g. already sorted array with last element as pivot).
        The fix: use a random pivot or the median-of-three strategy.
        In practice with good pivot selection, quick sort is faster than merge sort
        because it sorts in-place and has better cache locality.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          ALGORITHM 6 — COUNTING SORT
      ══════════════════════════════════════ */}
      <SectionTag text="Algorithm 6" />

      <AlgoHeader
        num="06"
        name="Counting Sort"
        tagline="Not comparison-based — O(n+k) when values are bounded"
        best="O(n+k)"
        avg="O(n+k)"
        worst="O(n+k)"
        space="O(k)"
        stable={true}
      />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          All previous algorithms compare elements against each other.
          Counting sort does not compare at all — it counts how many times each value appears,
          then reconstructs the sorted array from those counts.
          k = the range of values (max - min). When k is small relative to n, this is blazing fast.
          Useless when values are unbounded (like real numbers or large integers).
        </p>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <string.h>

void countingSort(int arr[], int n) {
    /* find the maximum value to know the count array size */
    int max = arr[0];
    int i;
    for (i = 1; i < n; i++) {
        if (arr[i] > max) max = arr[i];
    }

    /* count array — one slot per possible value (0 to max) */
    int count[max + 1];
    memset(count, 0, sizeof(count));  /* initialise all counts to 0 */

    /* step 1: count occurrences of each value */
    for (i = 0; i < n; i++) {
        count[arr[i]]++;
    }

    /* step 2: reconstruct sorted array from counts */
    int idx = 0;
    for (i = 0; i <= max; i++) {
        while (count[i] > 0) {
            arr[idx] = i;   /* place value i into the output */
            idx++;
            count[i]--;
        }
    }
}

int main() {
    int arr[] = {4, 2, 2, 8, 3, 3, 1};
    int n = 7;

    printf("Before: ");
    int i;
    for (i = 0; i < n; i++) printf("%d ", arr[i]);

    countingSort(arr, n);

    printf("\\nAfter:  ");
    for (i = 0; i < n; i++) printf("%d ", arr[i]);
    /* After: 1 2 2 3 3 4 8 */
    return 0;
}`} />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>
          Tracing counting sort on [4, 2, 2, 8, 3, 3, 1]:
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', lineHeight: 2 }}>
          count[0]=0, count[1]=1, count[2]=2, count[3]=2, count[4]=1, ... count[8]=1<br />
          Reconstruct: 1×1, 2×2, 3×2, 4×1, 8×1 → <span style={{ color: 'var(--green)' }}>1 2 2 3 3 4 8 ✓</span>
        </div>
      </div>

      <Callout type="tip">
        <strong>When to use counting sort:</strong> When you know the values are non-negative
        integers in a small bounded range. Sorting 1 million exam scores from 0–100?
        Counting sort is perfect — k=100 is tiny. Sorting 1 million phone numbers?
        k would be 10 billion — terrible choice. Know your data before choosing.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION — COMPARISON TABLE
      ══════════════════════════════════════ */}
      <SectionTag text="The Full Picture" />
      <SectionTitle>All Six Algorithms — Side by Side</SectionTitle>

      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr>
              {['Algorithm', 'Best', 'Average', 'Worst', 'Space', 'Stable', 'When to use'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 10, background: 'var(--surface)', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Bubble Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', '✓', 'Learning, nearly sorted small data'],
              ['Selection Sort', 'O(n²)', 'O(n²)', 'O(n²)', 'O(1)', '✗', 'When swap count must be minimized'],
              ['Insertion Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', '✓', 'Small or nearly sorted arrays'],
              ['Merge Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(n)', '✓', 'Large data, stability required, linked lists'],
              ['Quick Sort', 'O(n log n)', 'O(n log n)', 'O(n²)', 'O(log n)', '✗', 'General purpose, in-place, cache-friendly'],
              ['Counting Sort', 'O(n+k)', 'O(n+k)', 'O(n+k)', 'O(k)', '✓', 'Small range integers (marks, ages, ratings)'],
            ].map(([name, best, avg, worst, space, stable, when], ri) => (
              <tr key={ri}>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--green)', fontWeight: 700 }}>{name}</td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)', color: '#00e676', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{best}</td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)', color: '#facc15', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{avg}</td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)', color: worst.includes('n²') ? '#ff4757' : '#facc15', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{worst}</td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)', color: '#4285f4', fontFamily: 'var(--font-mono)' }}>{space}</td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)', color: stable === '✓' ? 'var(--green)' : '#ff4757', fontWeight: 700 }}>{stable}</td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontSize: 11 }}>{when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Real numbers that matter */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 28 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>
          Real numbers — sorting 1 million elements (1,000,000):
        </div>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 360 }}>
            {[
              { name: 'Bubble / Selection / Insertion', ops: '1,000,000,000,000', color: '#ff4757', note: '1 trillion ops — takes minutes' },
              { name: 'Merge Sort / Quick Sort', ops: '20,000,000', color: '#facc15', note: '20 million ops — takes milliseconds' },
              { name: 'Counting Sort (k=100)', ops: '1,000,100', color: 'var(--green)', note: 'barely over 1 million — near instant' },
            ].map((item) => (
              <div key={item.name} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '10px 14px', background: 'var(--bg2)', border: `1px solid ${item.color}22`, borderRadius: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 3 }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{item.note}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: item.color, fontWeight: 700, textAlign: 'right', whiteSpace: 'nowrap' }}>{item.ops} ops</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Callout type="example">
        <strong>Interview answer pattern:</strong> When asked "which sorting algorithm would you use?"
        — never say just "quick sort." Say: "It depends on the constraints. For general purpose
        in-place sorting I'd use quick sort. If stability is required I'd use merge sort.
        If the values are bounded integers I'd use counting sort. For small or nearly-sorted
        data, insertion sort." That answer shows real engineering judgment.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          WHAT'S NEXT
      ══════════════════════════════════════ */}
      <SectionTag text="What's Next" />
      <SectionTitle>You Are Ready for Unit 10</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        You now know six sorting algorithms inside out — their logic, their code,
        their complexity, and when to pick each one. This unit alone covers a
        significant portion of what most coding interviews test.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 32 }}>
        In Unit 10 we cover <strong style={{ color: 'var(--text)' }}>Searching Algorithms</strong> —
        linear search for unsorted data, and the elegant binary search that cuts the
        problem in half each step to achieve O(log n). Sorting and searching always
        go together — sorted data makes searching dramatically faster.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(0,230,118,0.02) 100%)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 12, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 700, marginBottom: 6 }}>UP NEXT → UNIT 10</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Searching Algorithms — Find It Fast</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Linear search, binary search, variations — with full C code and complexity.</div>
        </div>
        <Link href="/learn/dsa/searching" style={{ background: 'var(--green)', color: '#000', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '10px 22px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Coming Soon →
        </Link>
      </div>

      <KeyTakeaways items={[
        'Sorting enables binary search, database indexing, merge operations, and ranked displays — it is foundational',
        'Bubble sort: compare adjacent pairs, bubble largest to end each pass — O(n²) but O(n) if already sorted',
        'Selection sort: find minimum, place it — always exactly O(n²), minimizes swap count',
        'Insertion sort: pick one element, insert into correct position in sorted portion — best for nearly sorted data',
        'Merge sort: split in half, sort each, merge back — guaranteed O(n log n), needs O(n) extra space',
        'Quick sort: pick pivot, partition smaller left larger right — O(n log n) average, O(n²) worst, fastest in practice',
        'Counting sort: count occurrences, reconstruct — O(n+k), only works for bounded non-negative integers',
        'Stable sort preserves relative order of equal elements — Bubble, Insertion, Merge, Counting are stable',
        'Interview rule: pick quick sort for general use, merge sort for stability, counting sort for bounded integers',
        'O(n²) sorts handle ~10,000 elements fine. O(n log n) sorts handle millions. Never use O(n²) on large datasets',
      ]} />

    </LearnLayout>
  )
}