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

/* ── Search step visual ── */
const SearchStep = ({ values, low, high, mid, found, eliminated }: {
  values: number[]
  low: number
  high: number
  mid: number
  found?: boolean
  eliminated?: number[]
}) => (
  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
    {values.map((v, i) => {
      const isElim = eliminated?.includes(i)
      const isMid = i === mid
      const isLow = i === low
      const isHigh = i === high
      const inRange = i >= low && i <= high
      return (
        <div key={i} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 9, color: isMid ? 'var(--green)' : isLow ? '#4285f4' : isHigh ? '#f97316' : 'transparent', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 2, height: 14 }}>
            {isMid ? 'mid' : isLow && isHigh ? 'L=H' : isLow ? 'low' : isHigh ? 'high' : ''}
          </div>
          <div style={{
            width: 40, height: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 800,
            color: isElim ? 'var(--border)' : isMid ? (found ? '#000' : 'var(--green)') : inRange ? 'var(--text)' : 'var(--muted)',
            background: isElim ? 'transparent' : isMid ? (found ? 'var(--green)' : 'rgba(0,230,118,0.15)') : inRange ? 'var(--bg2)' : 'transparent',
            border: `2px solid ${isElim ? 'transparent' : isMid ? 'var(--green)' : inRange ? 'var(--border)' : 'transparent'}`,
            borderRadius: 6,
            opacity: isElim ? 0.2 : 1,
          }}>
            {v}
          </div>
          <div style={{ fontSize: 9, color: 'var(--muted)', marginTop: 3, fontFamily: 'var(--font-mono)' }}>[{i}]</div>
        </div>
      )
    })}
  </div>
)

export default function SearchingPage() {
  return (
    <LearnLayout
      title="Unit 10 — Searching Algorithms"
      description="Linear search checks every element. Binary search cuts the problem in half each step. Learn when to use each, how binary search works exactly, and all its powerful variations."
      section="DSA"
      readTime="45 min"
      updatedAt="March 2026"
    >

      {/* ── Badges ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'UNIT 10', green: true },
          { label: 'Prerequisite: Unit 09 — Sorting', green: false },
          { label: '45 min read', green: false },
        ].map((b) => (
          <span key={b.label} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: b.green ? 700 : 600, color: b.green ? 'var(--green)' : 'var(--muted)', background: b.green ? 'rgba(0,230,118,0.1)' : 'var(--surface)', border: `1px solid ${b.green ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`, borderRadius: 6, padding: '4px 10px' }}>
            {b.label}
          </span>
        ))}
      </div>

      <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Searching is the act of finding a specific value inside a collection of data.
        You have already seen linear search in Unit 02 when we searched arrays.
        In this unit we go deeper — understanding exactly when linear search is the right
        choice, and when binary search makes it hundreds of thousands of times faster.
      </p>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85 }}>
        Binary search is one of the most elegant ideas in all of computer science.
        A simple trick — always check the middle — that turns a million-item search
        into just 20 steps. We will understand it completely, implement it two ways,
        and learn its most useful variations.
      </p>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 1 — LINEAR SEARCH
      ══════════════════════════════════════ */}
      <SectionTag text="Section 1" />
      <SectionTitle>Linear Search — Check Every Element</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Linear search is the simplest possible search strategy: start from the first element
        and check each one in order until you either find the target or reach the end.
        No tricks, no requirements. Works on any array — sorted or unsorted.
      </p>

      {/* Visual trace */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // Searching for 7 in [3, 9, 2, 7, 5, 1, 8] — check one by one
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { vals: [3, 9, 2, 7, 5, 1, 8], idx: 0, note: 'Check index 0: arr[0]=3 ≠ 7 → continue' },
            { vals: [3, 9, 2, 7, 5, 1, 8], idx: 1, note: 'Check index 1: arr[1]=9 ≠ 7 → continue' },
            { vals: [3, 9, 2, 7, 5, 1, 8], idx: 2, note: 'Check index 2: arr[2]=2 ≠ 7 → continue' },
            { vals: [3, 9, 2, 7, 5, 1, 8], idx: 3, note: 'Check index 3: arr[3]=7 = 7 → FOUND ✓' },
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {step.vals.map((v, vi) => (
                  <div key={vi} style={{ textAlign: 'center' }}>
                    <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 800, color: vi === step.idx ? (v === 7 ? '#000' : 'var(--green)') : vi < step.idx ? 'var(--muted)' : 'var(--text)', background: vi === step.idx ? (v === 7 ? 'var(--green)' : 'rgba(0,230,118,0.15)') : 'var(--bg2)', border: `2px solid ${vi === step.idx ? 'var(--green)' : 'var(--border)'}`, borderRadius: 6, opacity: vi < step.idx ? 0.3 : 1 }}>{v}</div>
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

int linearSearch(int arr[], int n, int target) {
    int i;
    for (i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;   /* found — return the index */
        }
    }
    return -1;  /* not found — -1 is the universal "not found" signal */
}

int main() {
    int arr[] = {3, 9, 2, 7, 5, 1, 8};
    int n = 7;

    int result = linearSearch(arr, n, 7);
    if (result != -1) {
        printf("Found 7 at index %d\\n", result);  /* Found 7 at index 3 */
    } else {
        printf("Not found\\n");
    }

    /* searching for something not in the array */
    result = linearSearch(arr, n, 99);
    printf("Search for 99: %d\\n", result);  /* -1 */

    return 0;
}`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Best Case:</span>
          <ComplexityBadge value="O(1)" color="#00e676" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(target at index 0)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Worst Case:</span>
          <ComplexityBadge value="O(n)" color="#facc15" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(target at end or absent)</span>
        </div>
      </div>

      {/* When to use linear search */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 28 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
          When is linear search the right choice?
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { yes: true, text: 'Array is unsorted and sorting first would cost more than searching' },
            { yes: true, text: 'Array is small (fewer than ~100 elements) — overhead of other methods is not worth it' },
            { yes: true, text: 'You only need to search once — no repeated searches on the same data' },
            { yes: false, text: 'Array is sorted — binary search is dramatically faster' },
            { yes: false, text: 'You search the same data repeatedly — sort once, binary search many times' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
              <span style={{ color: item.yes ? 'var(--green)' : '#ff4757', flexShrink: 0, fontWeight: 700 }}>{item.yes ? '✓' : '✗'}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 2 — BINARY SEARCH IDEA
      ══════════════════════════════════════ */}
      <SectionTag text="Section 2" />
      <SectionTitle>Binary Search — The Half-Every-Step Idea</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Binary search works on a <strong style={{ color: 'var(--green)' }}>sorted array</strong> only.
        The insight is simple and powerful: if you check the middle element and it is
        too big, the target must be in the left half. If it is too small, the target
        must be in the right half. Either way you eliminate half the remaining elements
        with every single check.
      </p>

      {/* Dictionary analogy */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 14 }}>
          📖 How you already use binary search every day
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 14 }}>
          When you look up a word in a physical dictionary, you do not start from page 1
          and flip through every page. You open somewhere in the middle. If the word
          you need comes after what you see, you open the right half. If it comes before,
          you open the left half. You keep halving until you land on the right page.
          That is binary search — you have been doing it your whole life.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ff4757', marginBottom: 6 }}>Linear approach</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
              1000-page dictionary. Looking for "Zebra." You start at page 1 and flip
              one page at a time. You reach page ~950 after ~950 flips. Painful.
            </div>
          </div>
          <div style={{ background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', marginBottom: 6 }}>Binary approach</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
              Open page 500 → too early. Open page 750 → still early.
              Open page 875... You find "Zebra" in about 10 flips. Always.
            </div>
          </div>
        </div>
      </div>

      {/* The numbers proof */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>
          How many steps does binary search actually need?
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: 13, width: '100%' }}>
            <thead>
              <tr>
                {['Array size (n)', 'Linear search (worst)', 'Binary search (worst)', 'How much faster'].map(h => (
                  <th key={h} style={{ padding: '8px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, textAlign: 'left', background: 'var(--surface)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['100', '100', '7', '14×'],
                ['1,000', '1,000', '10', '100×'],
                ['1,000,000', '1,000,000', '20', '50,000×'],
                ['1,000,000,000', '1,000,000,000', '30', '33,000,000×'],
              ].map(([n, lin, bin, faster], ri) => (
                <tr key={ri}>
                  <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{n}</td>
                  <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--border)', color: '#ff4757', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{lin}</td>
                  <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--border)', color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{bin}</td>
                  <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--border)', color: '#facc15', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{faster}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12, fontFamily: 'var(--font-mono)' }}>
          Binary search steps = log₂(n). Every time you double n, you only need 1 more step.
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 3 — BINARY SEARCH TRACE
      ══════════════════════════════════════ */}
      <SectionTag text="Section 3" />
      <SectionTitle>Binary Search — Step by Step Trace</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Let us trace binary search on a sorted array to see every decision clearly.
        We search for <strong style={{ color: 'var(--green)' }}>target = 23</strong> in{' '}
        <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>
          [2, 5, 8, 12, 16, 23, 38, 45, 67, 91]
        </code>
      </p>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 20, fontFamily: 'var(--font-mono)' }}>
          // blue = low/high boundary · green = mid being checked · faded = eliminated
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Step 1 */}
          <div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>
              Step 1: low=0, high=9, mid=4 → arr[4]=16 &lt; 23 → search RIGHT half
            </div>
            <SearchStep
              values={[2, 5, 8, 12, 16, 23, 38, 45, 67, 91]}
              low={0} high={9} mid={4}
              eliminated={[]}
            />
          </div>

          {/* Step 2 */}
          <div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>
              Step 2: low=5, high=9, mid=7 → arr[7]=45 &gt; 23 → search LEFT half
            </div>
            <SearchStep
              values={[2, 5, 8, 12, 16, 23, 38, 45, 67, 91]}
              low={5} high={9} mid={7}
              eliminated={[0, 1, 2, 3, 4]}
            />
          </div>

          {/* Step 3 */}
          <div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>
              Step 3: low=5, high=6, mid=5 → arr[5]=23 = target → FOUND ✓
            </div>
            <SearchStep
              values={[2, 5, 8, 12, 16, 23, 38, 45, 67, 91]}
              low={5} high={6} mid={5}
              found={true}
              eliminated={[0, 1, 2, 3, 4, 7, 8, 9]}
            />
          </div>
        </div>

        <div style={{ marginTop: 20, padding: '10px 14px', background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--green)', fontWeight: 700 }}>
          Found 23 at index 5 in just 3 steps — linear search would have needed 6 steps
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 4 — ITERATIVE BINARY SEARCH
      ══════════════════════════════════════ */}
      <SectionTag text="Section 4" />
      <SectionTitle>Binary Search — Iterative Version</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        The iterative version uses a loop with three pointers — low, high, mid.
        Each iteration either finds the target or narrows the search window by half.
        This is the version most commonly asked in interviews.
      </p>

      <CodeBlock code={`#include <stdio.h>

int binarySearch(int arr[], int n, int target) {
    int low  = 0;
    int high = n - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        /* Note: use low + (high-low)/2 instead of (low+high)/2
           to avoid integer overflow when low and high are large */

        if (arr[mid] == target) {
            return mid;           /* found — return index */
        } else if (arr[mid] < target) {
            low = mid + 1;        /* target is in the RIGHT half */
        } else {
            high = mid - 1;       /* target is in the LEFT half */
        }
    }

    return -1;  /* low > high — target not in array */
}

int main() {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 45, 67, 91};
    int n = 10;

    printf("Search 23:  index %d\\n", binarySearch(arr, n, 23));  /* 5 */
    printf("Search 2:   index %d\\n", binarySearch(arr, n, 2));   /* 0 */
    printf("Search 91:  index %d\\n", binarySearch(arr, n, 91));  /* 9 */
    printf("Search 50:  index %d\\n", binarySearch(arr, n, 50));  /* -1 */

    return 0;
}`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Best Case:</span>
          <ComplexityBadge value="O(1)" color="#00e676" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(target is the middle element)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Worst Case:</span>
          <ComplexityBadge value="O(log n)" color="#00e676" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Space:</span>
          <ComplexityBadge value="O(1)" color="#00e676" />
        </div>
      </div>

      <Callout type="warning">
        <strong>The overflow bug:</strong> Writing <code style={{ fontFamily: 'var(--font-mono)' }}>mid = (low + high) / 2</code> can
        cause integer overflow when low and high are both large numbers — their sum exceeds
        the maximum int value. Always write{' '}
        <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>mid = low + (high - low) / 2</code>{' '}
        instead. This is a well-known bug that existed in Java's standard library for years.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 5 — RECURSIVE BINARY SEARCH
      ══════════════════════════════════════ */}
      <SectionTag text="Section 5" />
      <SectionTitle>Binary Search — Recursive Version</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        The recursive version expresses the same logic using function calls instead of a loop.
       The base cases: array is empty (low {'>'} high) → not found. Middle element matches → found.
        Recursive cases: search left half or right half.
      </p>

      <CodeBlock code={`#include <stdio.h>

int binarySearchRecursive(int arr[], int low, int high, int target) {
    /* base case: search space is empty */
    if (low > high) return -1;

    int mid = low + (high - low) / 2;

    if (arr[mid] == target) {
        return mid;  /* found */
    } else if (arr[mid] < target) {
        /* search right half */
        return binarySearchRecursive(arr, mid + 1, high, target);
    } else {
        /* search left half */
        return binarySearchRecursive(arr, low, mid - 1, target);
    }
}

int main() {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 45, 67, 91};
    int n = 10;

    printf("Search 23: index %d\\n",
        binarySearchRecursive(arr, 0, n-1, 23));  /* 5 */
    printf("Search 38: index %d\\n",
        binarySearchRecursive(arr, 0, n-1, 38));  /* 6 */
    printf("Search 99: index %d\\n",
        binarySearchRecursive(arr, 0, n-1, 99));  /* -1 */

    return 0;
}`} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
        <div style={{ background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 10, padding: '16px 18px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 8 }}>Iterative version</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>
            O(1) space — no call stack frames. Preferred in production and interviews
            where stack depth could be a concern on very large arrays.
          </div>
        </div>
        <div style={{ background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.2)', borderRadius: 10, padding: '16px 18px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#7b61ff', marginBottom: 8 }}>Recursive version</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>
            O(log n) space — one call per level. Cleaner and easier to understand.
            Good for learning and for variations that naturally require recursion.
          </div>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 6 — BINARY SEARCH VARIATIONS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 6" />
      <SectionTitle>Binary Search Variations — The Interview Favourites</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 24 }}>
        Standard binary search finds <em>a</em> position of the target. But interviewers
        often ask variations. These four come up constantly — learn the subtle changes
        that make each one work.
      </p>

      {/* Variation 1 — First occurrence */}
      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 10 }}>
        Variation 1 — Find First Occurrence of a Repeated Value
      </h3>
      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 8 }}>
        In <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>[1, 2, 2, 2, 3, 4]</code>, finding 2 could return index 1, 2, or 3.
        How do you always return the first one (index 1)?
        When you find the target, do not stop — save the index and keep searching left.
      </p>

      <CodeBlock code={`int firstOccurrence(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    int result = -1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            result = mid;      /* save this position */
            high = mid - 1;    /* keep searching LEFT for an earlier occurrence */
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return result;
}

/* firstOccurrence([1,2,2,2,3,4], 6, 2) → 1 */`} />

      {/* Variation 2 — Last occurrence */}
      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 10, marginTop: 32 }}>
        Variation 2 — Find Last Occurrence of a Repeated Value
      </h3>
      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 8 }}>
        Same idea, opposite direction. When you find the target, save the index
        and keep searching <strong>right</strong> for a later occurrence.
      </p>

      <CodeBlock code={`int lastOccurrence(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    int result = -1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            result = mid;     /* save this position */
            low = mid + 1;    /* keep searching RIGHT for a later occurrence */
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return result;
}

/* lastOccurrence([1,2,2,2,3,4], 6, 2) → 3 */`} />

      {/* Variation 3 — Count occurrences */}
      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 10, marginTop: 32 }}>
        Variation 3 — Count Total Occurrences
      </h3>
      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 8 }}>
        Once you have first and last occurrence, count = last - first + 1. O(log n).
      </p>

      <CodeBlock code={`int countOccurrences(int arr[], int n, int target) {
    int first = firstOccurrence(arr, n, target);
    if (first == -1) return 0;  /* target not in array */

    int last = lastOccurrence(arr, n, target);
    return last - first + 1;
}

int main() {
    int arr[] = {1, 2, 2, 2, 3, 4, 4, 5};
    int n = 8;
    printf("Count of 2: %d\\n", countOccurrences(arr, n, 2)); /* 3 */
    printf("Count of 4: %d\\n", countOccurrences(arr, n, 4)); /* 2 */
    printf("Count of 6: %d\\n", countOccurrences(arr, n, 6)); /* 0 */
    return 0;
}`} />

      {/* Variation 4 — Search in rotated array */}
      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 10, marginTop: 32 }}>
        Variation 4 — Search in a Rotated Sorted Array
      </h3>
      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 12 }}>
        A sorted array has been rotated at some pivot: <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>[4, 5, 6, 7, 0, 1, 2]</code>.
        Standard binary search breaks here. The fix: one of the two halves is always sorted —
        check which half is sorted, and use that to decide which half the target could be in.
      </p>

      {/* Rotated array visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', marginBottom: 16, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          // [4, 5, 6, 7, 0, 1, 2] — sorted [0,1,2,3,4,5,6] rotated at index 4
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[4, 5, 6, 7, 0, 1, 2].map((v, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${i < 4 ? 'rgba(66,133,244,0.5)' : 'rgba(0,230,118,0.5)'}`, borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 800, color: i < 4 ? '#4285f4' : 'var(--green)', background: i < 4 ? 'rgba(66,133,244,0.06)' : 'rgba(0,230,118,0.06)' }}>{v}</div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>[{i}]</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, background: 'rgba(66,133,244,0.3)', borderRadius: 2 }} />
            <span style={{ fontSize: 11, color: '#4285f4', fontFamily: 'var(--font-mono)' }}>left half: sorted [4,5,6,7]</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, background: 'rgba(0,230,118,0.3)', borderRadius: 2 }} />
            <span style={{ fontSize: 11, color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>right half: sorted [0,1,2]</span>
          </div>
        </div>
      </div>

      <CodeBlock code={`int searchRotated(int arr[], int n, int target) {
    int low = 0, high = n - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) return mid;  /* found */

        /* check which half is sorted */
        if (arr[low] <= arr[mid]) {
            /* LEFT half is sorted */
            if (target >= arr[low] && target < arr[mid]) {
                high = mid - 1;  /* target is in the sorted left half */
            } else {
                low = mid + 1;   /* target must be in the right half */
            }
        } else {
            /* RIGHT half is sorted */
            if (target > arr[mid] && target <= arr[high]) {
                low = mid + 1;   /* target is in the sorted right half */
            } else {
                high = mid - 1;  /* target must be in the left half */
            }
        }
    }
    return -1;
}

int main() {
    int arr[] = {4, 5, 6, 7, 0, 1, 2};
    int n = 7;
    printf("Search 0: index %d\\n", searchRotated(arr, n, 0)); /* 4 */
    printf("Search 6: index %d\\n", searchRotated(arr, n, 6)); /* 2 */
    printf("Search 3: index %d\\n", searchRotated(arr, n, 3)); /* -1 */
    return 0;
}`} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time:</span>
        <ComplexityBadge value="O(log n)" color="#00e676" />
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>— same as standard binary search</span>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 7 — FIND INSERTION POINT
      ══════════════════════════════════════ */}
      <SectionTag text="Section 7" />
      <SectionTitle>Bonus — Find Where to Insert (Lower Bound)</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        A very common interview question: given a sorted array and a target,
        find the index where target should be inserted to keep the array sorted.
        If it already exists, return its first position.
        When the loop ends, <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>low</code> always
        holds the correct insertion index — because it is the first position where
        the value is ≥ target.
      </p>

      <CodeBlock code={`#include <stdio.h>

int lowerBound(int arr[], int n, int target) {
    int low = 0, high = n;  /* note: high = n, not n-1 */

    while (low < high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] < target) {
            low = mid + 1;  /* target goes to the RIGHT */
        } else {
            high = mid;     /* arr[mid] >= target — could be insertion point */
        }
    }

    return low;  /* insertion index */
}

int main() {
    int arr[] = {1, 3, 5, 6};
    int n = 4;

    printf("Insert 5: index %d\\n", lowerBound(arr, n, 5)); /* 2 — exists at 2 */
    printf("Insert 2: index %d\\n", lowerBound(arr, n, 2)); /* 1 — between 1 and 3 */
    printf("Insert 7: index %d\\n", lowerBound(arr, n, 7)); /* 4 — after the end */
    printf("Insert 0: index %d\\n", lowerBound(arr, n, 0)); /* 0 — before start */

    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 8 — WHEN TO USE WHICH
      ══════════════════════════════════════ */}
      <SectionTag text="Section 8" />
      <SectionTitle>Decision Guide — Which Search to Use</SectionTitle>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {[
          {
            condition: 'Array is unsorted AND you only search once',
            answer: 'Linear Search — O(n). Sorting to binary search would cost O(n log n) more.',
            color: '#facc15',
          },
          {
            condition: 'Array is unsorted AND you will search many times',
            answer: 'Sort it first (O(n log n)), then use Binary Search (O(log n) per query). The sort cost is paid once.',
            color: 'var(--green)',
          },
          {
            condition: 'Array is sorted',
            answer: 'Always Binary Search — O(log n). Never waste time with linear search on sorted data.',
            color: 'var(--green)',
          },
          {
            condition: 'Array is sorted and has repeated values, need first/last position',
            answer: 'Binary Search variation — firstOccurrence() or lastOccurrence(). Still O(log n).',
            color: 'var(--green)',
          },
          {
            condition: 'Array is sorted but has been rotated',
            answer: 'Rotated binary search — identify the sorted half first, then decide direction. O(log n).',
            color: 'var(--green)',
          },
          {
            condition: 'Data is in a hash table (Unit 14)',
            answer: 'Direct lookup — O(1). Faster than both for point queries.',
            color: '#4285f4',
          },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 0, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ width: 4, background: item.color, flexShrink: 0 }} />
            <div style={{ padding: '14px 18px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 5 }}>If: {item.condition}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>→ {item.answer}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Errors */}
      <SectionTag text="Errors You Will Hit" />
      <SectionTitle>Common Binary Search Mistakes</SectionTitle>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
        {[
          {
            title: 'Using binary search on an unsorted array',
            symptom: 'Incorrect results — sometimes finds the target, sometimes misses it',
            fix: 'Binary search only works on sorted data. Always sort first or verify the array is sorted.',
          },
          {
            title: 'Off-by-one in the loop condition',
            symptom: 'Missing the last element or going into an infinite loop',
            fix: 'Use while (low <= high) — the <= is essential. Without it, when low == high you skip checking the last candidate.',
          },
          {
            title: 'Forgetting mid + 1 and mid - 1',
            symptom: 'Infinite loop — low and high never converge',
            fix: 'When you move the boundary, always move it past mid: low = mid + 1 or high = mid - 1. Never set low = mid or high = mid in standard search.',
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

      <Divider />

      {/* ══════════════════════════════════════
          WHAT'S NEXT
      ══════════════════════════════════════ */}
      <SectionTag text="What's Next" />
      <SectionTitle>You Are Ready for Unit 11</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        You now have a complete toolkit for searching — linear search for unsorted data,
        binary search for sorted data, and four powerful variations for the most common
        interview scenarios. The overflow-safe midpoint formula and the first/last
        occurrence patterns alone will save you in dozens of future problems.
      </p>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 32 }}>
        In Unit 11 we enter the world of <strong style={{ color: 'var(--text)' }}>Trees</strong> —
        hierarchical data structures that look like upside-down trees.
        Trees are everywhere: file systems, HTML pages, databases, compilers.
        We build binary trees from scratch, learn all four traversal orders,
        and understand the properties that make trees so powerful.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(0,230,118,0.02) 100%)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 12, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 700, marginBottom: 6 }}>UP NEXT → UNIT 11</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Trees — Hierarchical Data</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Binary trees, inorder, preorder, postorder, level order — built in C.</div>
        </div>
        <Link href="/learn/dsa/trees" style={{ background: 'var(--green)', color: '#000', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '10px 22px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Coming Soon →
        </Link>
      </div>

      <KeyTakeaways items={[
        'Linear search checks every element one by one — O(n) worst case, works on unsorted data',
        'Binary search requires sorted data — cuts the search space in half every step — O(log n)',
        'For 1 billion elements: linear search = 1 billion steps, binary search = just 30 steps',
        'Always use mid = low + (high - low) / 2 — never (low + high) / 2 to avoid integer overflow',
        'Loop condition is while (low <= high) — the <= matters, not just <',
        'Always move past mid: low = mid + 1 or high = mid - 1 — never set to mid itself',
        'First occurrence: when found, save index and search left (high = mid - 1)',
        'Last occurrence: when found, save index and search right (low = mid + 1)',
        'Count occurrences = lastOccurrence - firstOccurrence + 1 — still O(log n)',
        'Rotated array search: identify the sorted half, check if target is in that half, decide direction',
      ]} />

    </LearnLayout>
  )
}