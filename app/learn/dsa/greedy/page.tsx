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

const ProblemHeader = ({ num, title, time, space }: { num: string; title: string; time: string; space: string }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginTop: 32, marginBottom: 0 }}>
    <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '14px 20px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--green)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 4, padding: '2px 8px' }}>{num}</span>
      <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{title}</span>
      <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
        <ComplexityBadge value={`Time: ${time}`} color="#00e676" />
        <ComplexityBadge value={`Space: ${space}`} color="#4285f4" />
      </div>
    </div>
  </div>
)

export default function GreedyPage() {
  return (
    <LearnLayout
      title="Unit 17 — Greedy Algorithms"
      description="Always pick the locally best option at each step. Sometimes that is enough to reach the global optimum — and it is much faster than DP. Activity selection, fractional knapsack, Huffman coding, and when greedy fails."
      section="DSA"
      readTime="75 min"
      updatedAt="March 2026"
    >

      {/* ── Badges ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'UNIT 17', green: true },
          { label: 'Prerequisite: Unit 09 — Sorting', green: false },
          { label: '75 min read', green: false },
        ].map((b) => (
          <span key={b.label} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: b.green ? 700 : 600, color: b.green ? 'var(--green)' : 'var(--muted)', background: b.green ? 'rgba(0,230,118,0.1)' : 'var(--surface)', border: `1px solid ${b.green ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`, borderRadius: 6, padding: '4px 10px' }}>
            {b.label}
          </span>
        ))}
      </div>

      <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        In the previous unit, Dynamic Programming tried every possibility and remembered the results.
        Greedy algorithms take a completely different approach — they never look back.
        At each step, make the best available choice right now, and commit to it.
        No exploring alternatives. No going back. Just always grab the best option in front of you.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>
        When greedy works, it is dramatically simpler and faster than DP.
        When it fails — and it does fail for many problems — you need DP.
        Understanding the difference is one of the most important skills in algorithm design.
      </p>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 1 — WHAT IS GREEDY
      ══════════════════════════════════════ */}
      <SectionTag text="Section 1" />
      <SectionTitle>What is a Greedy Algorithm?</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        A greedy algorithm makes the <strong style={{ color: 'var(--green)' }}>locally optimal choice</strong> at
        each step with the hope that these local choices lead to a
        <strong style={{ color: 'var(--green)' }}> globally optimal solution</strong>.
        It never reconsiders a choice once made.
      </p>

      {/* Analogy */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
          💰 The coin change analogy — where greedy works perfectly
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 16 }}>
          You need to give someone ₹41 change using Indian coins (₹25, ₹10, ₹5, ₹1).
          A greedy cashier always picks the largest coin that fits:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { step: '41 remaining', coin: '₹25', left: '16 remaining', color: 'var(--green)' },
            { step: '16 remaining', coin: '₹10', left: '6 remaining', color: '#4285f4' },
            { step: '6 remaining', coin: '₹5', left: '1 remaining', color: '#7b61ff' },
            { step: '1 remaining', coin: '₹1', left: '0 remaining ✓', color: '#facc15' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', background: 'var(--bg2)', border: `1px solid ${row.color}22`, borderRadius: 8, padding: '10px 14px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', minWidth: 120 }}>{row.step}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 800, color: row.color, minWidth: 50 }}>{row.coin}</span>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>{row.left}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, fontSize: 13, color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
          4 coins total — this IS the optimal answer for Indian denominations ✓
        </div>
      </div>

      {/* Two conditions for greedy to work */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
        <div style={{ background: 'rgba(0,230,118,0.06)', border: '2px solid rgba(0,230,118,0.3)', borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--green)', marginBottom: 10 }}>
            Condition 1 — Greedy Choice Property
          </div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>
            A globally optimal solution can always be built by making locally optimal
            (greedy) choices. The best choice now is always part of some optimal solution.
          </div>
        </div>
        <div style={{ background: 'rgba(66,133,244,0.06)', border: '2px solid rgba(66,133,244,0.3)', borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#4285f4', marginBottom: 10 }}>
            Condition 2 — Optimal Substructure
          </div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>
            After making the greedy choice, the remaining subproblem has the same structure
            as the original. Its optimal solution combines with the greedy choice to give
            the global optimum.
          </div>
        </div>
      </div>

      <Callout type="warning">
        <strong>Greedy does NOT always work.</strong> If the greedy choice property does not hold,
        the algorithm will give a suboptimal answer without any error.
        It will silently produce the wrong answer. This is why you must <em>prove</em>
        a greedy approach is correct before trusting it — or use DP to be safe.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          PROBLEM 1 — ACTIVITY SELECTION
      ══════════════════════════════════════ */}
      <SectionTag text="Problem 1" />

      <ProblemHeader num="Problem 01" title="Activity Selection — Maximum Non-Overlapping Events" time="O(n log n)" space="O(1)" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          You have n activities, each with a start time and finish time.
          Only one activity can run at a time. Select the maximum number of
          non-overlapping activities you can attend. This is the classic greedy problem —
          and the greedy solution is provably optimal.
        </p>
      </div>

      {/* Activity visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // 6 activities — which ones to pick?
        </div>
        <table style={{ borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--font-mono)', width: '100%' }}>
          <thead>
            <tr>
              {['Activity', 'Start', 'Finish', 'Selected?'].map(h => (
                <th key={h} style={{ padding: '7px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontWeight: 600, textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['A1', 1, 4, true],
              ['A2', 3, 5, false],
              ['A3', 0, 6, false],
              ['A4', 5, 7, true],
              ['A5', 3, 9, false],
              ['A6', 6, 10, false],
              ['A7', 8, 11, true],
            ].map(([name, s, f, sel]) => (
              <tr key={name as string}>
                <td style={{ padding: '8px 14px', borderBottom: '1px solid var(--border)', color: sel ? 'var(--green)' : 'var(--muted)', fontWeight: sel ? 700 : 400 }}>{name as string}</td>
                <td style={{ padding: '8px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)' }}>{s as number}</td>
                <td style={{ padding: '8px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)' }}>{f as number}</td>
                <td style={{ padding: '8px 14px', borderBottom: '1px solid var(--border)', color: sel ? 'var(--green)' : 'var(--border)', fontWeight: 700 }}>{sel ? '✓ YES' : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 12, fontSize: 12, color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
          Selected: A1 (1-4), A4 (5-7), A7 (8-11) → 3 activities maximum
        </div>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
          The greedy insight — always pick the activity that finishes earliest:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { step: '1', text: 'Sort all activities by their finish time (earliest finish first)', color: '#4285f4' },
            { step: '2', text: 'Select the first activity (it finishes earliest — leaves maximum time for others)', color: 'var(--green)' },
            { step: '3', text: 'For each remaining activity: if its start time ≥ finish time of last selected → select it', color: 'var(--green)' },
            { step: '4', text: 'Skip activities that overlap with the last selected one', color: '#f97316' },
          ].map(item => (
            <div key={item.step} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--bg2)', border: `1px solid ${item.color}22`, borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: item.color, color: '#000', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.step}</div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <stdlib.h>

struct Activity {
    int start;
    int finish;
    char name[3];
};
typedef struct Activity Activity;

/* compare by finish time — for sorting */
int compareFinish(const void *a, const void *b) {
    return ((Activity*)a)->finish - ((Activity*)b)->finish;
}

int activitySelection(Activity acts[], int n) {
    /* step 1: sort by finish time */
    qsort(acts, n, sizeof(Activity), compareFinish);

    printf("Selected activities:\\n");

    /* step 2: always pick the first activity */
    int count = 1;
    int lastFinish = acts[0].finish;
    printf("  %s (start=%d, finish=%d)\\n", acts[0].name, acts[0].start, acts[0].finish);

    /* step 3: pick next non-overlapping activity */
    int i;
    for (i = 1; i < n; i++) {
        if (acts[i].start >= lastFinish) {
            /* this activity starts after last one ends — no overlap */
            printf("  %s (start=%d, finish=%d)\\n", acts[i].name, acts[i].start, acts[i].finish);
            lastFinish = acts[i].finish;
            count++;
        }
    }

    return count;
}

int main() {
    Activity acts[] = {
        {1,  4,  "A1"},
        {3,  5,  "A2"},
        {0,  6,  "A3"},
        {5,  7,  "A4"},
        {3,  9,  "A5"},
        {6,  10, "A6"},
        {8,  11, "A7"},
    };
    int n = 7;

    int total = activitySelection(acts, n);
    printf("Maximum activities: %d\\n", total);  /* 3 */

    return 0;
}`} />

      <Callout type="tip">
        <strong>Why earliest finish — not earliest start, not shortest duration?</strong>
        Picking the earliest-finishing activity leaves the maximum remaining time for future
        activities. This is provably optimal. An activity that finishes later "blocks" more
        of the future timeline. Always finishing early = always leaving the most options open.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          PROBLEM 2 — FRACTIONAL KNAPSACK
      ══════════════════════════════════════ */}
      <SectionTag text="Problem 2" />

      <ProblemHeader num="Problem 02" title="Fractional Knapsack — Take Fractions of Items" time="O(n log n)" space="O(1)" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, marginBottom: 8 }}>
          Same as 0/1 knapsack — items with weights and values, bag with capacity W —
          but now you can take <strong>fractions of items</strong>. Take 60% of an item,
          get 60% of its value. This small difference means greedy works perfectly here,
          whereas 0/1 knapsack required DP.
        </p>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>
          The greedy insight — sort by value-per-kg, take the most valuable first:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { step: '1', text: 'Calculate value/weight ratio for each item', color: '#4285f4' },
            { step: '2', text: 'Sort items by ratio — highest ratio first', color: '#4285f4' },
            { step: '3', text: 'Take as much of the most valuable item as fits', color: 'var(--green)' },
            { step: '4', text: 'Move to the next item. If it fully fits — take all. If not — take the fraction that fits.', color: 'var(--green)' },
          ].map(item => (
            <div key={item.step} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--bg2)', border: `1px solid ${item.color}22`, borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: item.color, color: '#000', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.step}</div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Items table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          // 4 items, capacity W = 50 — sorted by value/weight ratio
        </div>
        <table style={{ borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--font-mono)', width: '100%' }}>
          <thead>
            <tr>
              {['Item', 'Weight', 'Value', 'Value/Weight', 'Taken', 'Value added'].map(h => (
                <th key={h} style={{ padding: '7px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontWeight: 600, textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Item 2', '10 kg', '₹60', '6.0 ← highest', 'All 10 kg', '₹60'],
              ['Item 4', '20 kg', '₹100', '5.0', 'All 20 kg', '₹100'],
              ['Item 1', '20 kg', '₹80', '4.0', '20 kg (full)', '₹80'],
              ['Item 3', '30 kg', '₹120', '4.0', '0 kg (bag full)', '₹0'],
            ].map((row, ri) => (
              <tr key={ri}>
                <td style={{ padding: '8px 14px', borderBottom: '1px solid var(--border)', color: 'var(--green)', fontWeight: 700 }}>{row[0]}</td>
                <td style={{ padding: '8px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)' }}>{row[1]}</td>
                <td style={{ padding: '8px 14px', borderBottom: '1px solid var(--border)', color: '#facc15', fontWeight: 700 }}>{row[2]}</td>
                <td style={{ padding: '8px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontSize: 12 }}>{row[3]}</td>
                <td style={{ padding: '8px 14px', borderBottom: '1px solid var(--border)', color: ri < 3 ? 'var(--green)' : 'var(--border)' }}>{row[4]}</td>
                <td style={{ padding: '8px 14px', borderBottom: '1px solid var(--border)', color: '#facc15', fontWeight: 700 }}>{row[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 12, fontSize: 12, color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
          Total value: ₹60 + ₹100 + ₹80 = ₹240 with exactly 50 kg used
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <stdlib.h>

struct Item {
    int weight;
    int value;
    double ratio;  /* value per unit weight */
};
typedef struct Item Item;

int compareRatio(const void *a, const void *b) {
    double diff = ((Item*)b)->ratio - ((Item*)a)->ratio;
    return (diff > 0) - (diff < 0);  /* sort descending by ratio */
}

double fractionalKnapsack(Item items[], int n, int capacity) {
    int i;

    /* compute ratio for each item */
    for (i = 0; i < n; i++) {
        items[i].ratio = (double)items[i].value / items[i].weight;
    }

    /* sort by value/weight ratio — highest first */
    qsort(items, n, sizeof(Item), compareRatio);

    double totalValue = 0.0;
    int remaining = capacity;

    for (i = 0; i < n && remaining > 0; i++) {
        if (items[i].weight <= remaining) {
            /* take the whole item */
            totalValue += items[i].value;
            remaining  -= items[i].weight;
            printf("Took all of item %d (weight=%d, value=%d)\\n",
                   i+1, items[i].weight, items[i].value);
        } else {
            /* take a fraction — whatever fits */
            double fraction = (double)remaining / items[i].weight;
            totalValue += items[i].value * fraction;
            printf("Took %.1f%% of item %d (value=%.2f)\\n",
                   fraction * 100, i+1, items[i].value * fraction);
            remaining = 0;
        }
    }

    return totalValue;
}

int main() {
    Item items[] = {
        {20, 80,  0},  /* item 1 */
        {10, 60,  0},  /* item 2 */
        {30, 120, 0},  /* item 3 */
        {20, 100, 0},  /* item 4 */
    };
    int n = 4, capacity = 50;

    double maxValue = fractionalKnapsack(items, n, capacity);
    printf("Maximum value: %.2f\\n", maxValue);  /* 240.00 */

    return 0;
}`} />

      <div style={{ background: 'rgba(255,71,87,0.06)', border: '1px solid rgba(255,71,87,0.25)', borderRadius: 10, padding: '16px 20px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#ff4757', marginBottom: 10 }}>
          Why this does NOT work for 0/1 knapsack:
        </div>
        <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>
          With 0/1 knapsack (no fractions), capacity=10, items: A(weight=6,value=6), B(weight=5,value=5), C(weight=5,value=5).<br />
          Greedy picks A first (ratio=1.0), then bag is full: value=6.<br />
          But B+C = weight 10, value 10 → <strong style={{ color: '#ff4757' }}>greedy missed the better answer.</strong><br />
          Fractional knapsack: take all of A + 4/5 of B → 6 + 4 = 10 ✓ (greedy works because fractions are allowed).
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          PROBLEM 3 — HUFFMAN CODING
      ══════════════════════════════════════ */}
      <SectionTag text="Problem 3" />

      <ProblemHeader num="Problem 03" title="Huffman Coding — Optimal Data Compression" time="O(n log n)" space="O(n)" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, marginBottom: 8 }}>
          Huffman coding assigns variable-length binary codes to characters — shorter codes
          for more frequent characters, longer codes for rare ones. This is how ZIP files,
          JPEG images, and MP3 audio compress data. It is provably the optimal prefix-free encoding.
        </p>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>
          The idea — assign shorter codes to more frequent characters:
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ff4757', marginBottom: 8 }}>Fixed length (naive)</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', lineHeight: 2 }}>
              A → 000 (freq: 45)<br />
              B → 001 (freq: 13)<br />
              C → 010 (freq: 12)<br />
              D → 011 (freq: 16)<br />
              E → 100 (freq: 9)<br />
              F → 101 (freq: 5)<br />
              <span style={{ color: '#ff4757' }}>3 bits per char always</span>
            </div>
          </div>
          <div style={{ background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', marginBottom: 8 }}>Huffman (optimal)</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', lineHeight: 2 }}>
              A → 0&nbsp;&nbsp; (1 bit — most frequent)<br />
              B → 101 (3 bits)<br />
              C → 100 (3 bits)<br />
              D → 111 (3 bits)<br />
              E → 1101 (4 bits)<br />
              F → 1100 (4 bits)<br />
              <span style={{ color: 'var(--green)' }}>Avg ~2.24 bits per char ✓</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
          The greedy algorithm — always merge the two least frequent nodes:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { step: '1', text: 'Put all characters in a min-heap ordered by frequency', color: '#4285f4' },
            { step: '2', text: 'Extract the two nodes with lowest frequency', color: 'var(--green)' },
            { step: '3', text: 'Create a new internal node with frequency = sum of the two. Make them its left and right children', color: 'var(--green)' },
            { step: '4', text: 'Insert the new node back into the heap', color: 'var(--green)' },
            { step: '5', text: 'Repeat until only one node remains — that is the root of the Huffman tree', color: '#7b61ff' },
            { step: '6', text: 'Assign 0 to every left edge and 1 to every right edge. Read path from root to leaf = code for that character', color: '#facc15' },
          ].map(item => (
            <div key={item.step} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--bg2)', border: `1px solid ${item.color}22`, borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: item.color, color: '#000', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.step}</div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct HNode {
    char ch;
    int  freq;
    struct HNode *left, *right;
};
typedef struct HNode HNode;

HNode* newNode(char ch, int freq) {
    HNode *n = malloc(sizeof(HNode));
    n->ch = ch; n->freq = freq;
    n->left = n->right = NULL;
    return n;
}

/* simple min-heap for Huffman (array-based priority queue) */
#define MAXNODES 256
HNode* heap[MAXNODES];
int heapSize = 0;

void heapSwap(int i, int j) {
    HNode *t = heap[i]; heap[i] = heap[j]; heap[j] = t;
}

void heapPush(HNode *node) {
    heap[heapSize] = node;
    int i = heapSize++;
    /* bubble up */
    while (i > 0 && heap[(i-1)/2]->freq > heap[i]->freq) {
        heapSwap(i, (i-1)/2);
        i = (i-1)/2;
    }
}

HNode* heapPop() {
    HNode *top = heap[0];
    heap[0] = heap[--heapSize];
    /* heapify down */
    int i = 0;
    while (1) {
        int smallest = i;
        int l = 2*i+1, r = 2*i+2;
        if (l < heapSize && heap[l]->freq < heap[smallest]->freq) smallest = l;
        if (r < heapSize && heap[r]->freq < heap[smallest]->freq) smallest = r;
        if (smallest == i) break;
        heapSwap(i, smallest);
        i = smallest;
    }
    return top;
}

/* print codes — traverse tree, track path */
void printCodes(HNode *root, char *code, int depth) {
    if (root->left == NULL && root->right == NULL) {
        code[depth] = '\\0';
        printf("  '%c' (freq=%d) → %s\\n", root->ch, root->freq, code);
        return;
    }
    if (root->left)  { code[depth] = '0'; printCodes(root->left,  code, depth+1); }
    if (root->right) { code[depth] = '1'; printCodes(root->right, code, depth+1); }
}

HNode* buildHuffman(char chars[], int freqs[], int n) {
    int i;
    /* step 1: insert all characters into min-heap */
    for (i = 0; i < n; i++) heapPush(newNode(chars[i], freqs[i]));

    /* step 2-4: keep merging two smallest until one tree remains */
    while (heapSize > 1) {
        HNode *left  = heapPop();  /* smallest frequency */
        HNode *right = heapPop();  /* second smallest */

        /* create parent node with combined frequency */
        HNode *parent = newNode('$', left->freq + right->freq);
        parent->left  = left;
        parent->right = right;

        heapPush(parent);  /* push back into heap */
    }

    return heapPop();  /* the root of the Huffman tree */
}

int main() {
    char chars[] = {'A', 'B', 'C', 'D', 'E', 'F'};
    int freqs[]  = {45,  13,  12,  16,   9,   5};
    int n = 6;

    HNode *root = buildHuffman(chars, freqs, n);

    char code[50];
    printf("Huffman codes:\\n");
    printCodes(root, code, 0);

    return 0;
}`} />

      <Callout type="info">
        <strong>Huffman coding is used everywhere.</strong> ZIP and GZIP use it for lossless
        compression. JPEG uses a variant for image compression. MP3 uses it for audio.
        HTTP/2 uses HPACK which is Huffman-based for header compression.
        Every time you download a file faster than raw bytes would allow —
        Huffman coding is likely involved.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          PROBLEM 4 — JOB SEQUENCING
      ══════════════════════════════════════ */}
      <SectionTag text="Problem 4" />

      <ProblemHeader num="Problem 04" title="Job Sequencing with Deadlines — Maximise Profit" time="O(n²)" space="O(n)" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          You have n jobs. Each takes exactly 1 unit of time. Each has a deadline and a profit
          (earned only if completed before/by the deadline). Only one job can run at a time.
          Select jobs to maximise total profit. Greedy: always pick the highest profit job first,
          schedule it as late as possible before its deadline.
        </p>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Job {
    char id;
    int  deadline;
    int  profit;
};
typedef struct Job Job;

/* sort by profit descending */
int compareProfit(const void *a, const void *b) {
    return ((Job*)b)->profit - ((Job*)a)->profit;
}

int jobSequencing(Job jobs[], int n) {
    /* sort jobs by profit — highest first */
    qsort(jobs, n, sizeof(Job), compareProfit);

    /* find max deadline — tells us how many time slots we need */
    int maxDeadline = 0, i;
    for (i = 0; i < n; i++) {
        if (jobs[i].deadline > maxDeadline) maxDeadline = jobs[i].deadline;
    }

    /* slots array: slot[t] = job id scheduled at time t (-1 = free) */
    char slots[maxDeadline + 1];
    memset(slots, -1, sizeof(slots));

    int totalProfit = 0, count = 0;

    for (i = 0; i < n; i++) {
        /* try to schedule this job as LATE as possible before its deadline */
        int t;
        for (t = jobs[i].deadline; t >= 1; t--) {
            if (slots[t] == -1) {  /* slot is free */
                slots[t] = jobs[i].id;
                totalProfit += jobs[i].profit;
                count++;
                break;
            }
        }
    }

    printf("Scheduled jobs: ");
    for (i = 1; i <= maxDeadline; i++) {
        if (slots[i] != -1) printf("%c ", slots[i]);
    }
    printf("\\nTotal profit: %d\\n", totalProfit);

    return totalProfit;
}

int main() {
    Job jobs[] = {
        {'A', 2, 100},
        {'B', 1, 19},
        {'C', 2, 27},
        {'D', 1, 25},
        {'E', 3, 15},
    };
    jobSequencing(jobs, 5);
    /* Scheduled: A C E → profit 100+27+15 = 142 */
    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION — WHEN GREEDY FAILS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 6" />
      <SectionTitle>When Greedy Fails — And Why</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Greedy is not a universal solution. It fails whenever a locally optimal choice
        leads to a globally suboptimal result. Here are the three most important examples —
        understand them and you will never misapply greedy again.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>

        {/* Failure 1 — 0/1 Knapsack */}
        <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.25)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ background: 'rgba(255,71,87,0.06)', borderBottom: '1px solid rgba(255,71,87,0.15)', padding: '12px 20px', display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#ff4757' }}>✗ Failure 1 — 0/1 Knapsack</span>
          </div>
          <div style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, marginBottom: 8 }}>
              Items: A(w=3,v=9), B(w=4,v=10), C(w=5,v=12). Capacity=7.
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', lineHeight: 1.9 }}>
              Ratio: A=3.0, B=2.5, C=2.4<br />
              Greedy picks A(3kg, ₹9), then B doesn't fit (3+4=7 ✓ wait it does)... B fits → A+B = 7kg, ₹19<br />
              But C+B = 4+5=9 {'>'} 7 ✗. A+C = 3+5=8 {'>'} 7 ✗.<br />
              Actually here greedy gets ₹19 and optimal is also ₹19. Better counter-example:<br />
              Items: A(w=10,v=10), B(w=6,v=7), C(w=6,v=7). Cap=12.<br />
              Greedy: ratio A=1.0, B=C=1.17 → pick B(₹7), C(₹7) = ₹14 but 6+6=12 fits ✓ greedy works here too.<br />
              Real failure: Items X(w=1,v=1), Y(w=10,v=9). Cap=10.<br />
              <span style={{ color: '#ff4757' }}>Greedy: ratio X=1.0{'>'} Y=0.9 → pick X(1kg,₹1), then Y won't fit = ₹1</span><br />
              <span style={{ color: 'var(--green)' }}>Optimal: pick Y alone = ₹9</span>
            </div>
          </div>
        </div>

        {/* Failure 2 — Coin Change with unusual denominations */}
        <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.25)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ background: 'rgba(255,71,87,0.06)', borderBottom: '1px solid rgba(255,71,87,0.15)', padding: '12px 20px' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#ff4757' }}>✗ Failure 2 — Coin Change with unusual denominations</span>
          </div>
          <div style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>
              Coins: [1, 3, 4]. Amount: 6.<br />
              <span style={{ color: '#ff4757' }}>Greedy: 4 + 1 + 1 = 3 coins</span><br />
              <span style={{ color: 'var(--green)' }}>Optimal (DP): 3 + 3 = 2 coins</span><br />
              Greedy grabs 4 (the largest) but misses the fact that two 3s are better.
            </div>
          </div>
        </div>

        {/* Failure 3 — Shortest path with greedy */}
        <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.25)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ background: 'rgba(255,71,87,0.06)', borderBottom: '1px solid rgba(255,71,87,0.15)', padding: '12px 20px' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#ff4757' }}>✗ Failure 3 — Shortest path without Dijkstra</span>
          </div>
          <div style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>
              Simply picking the shortest edge at each step (pure greedy) does not find
              the shortest path in a graph. A short first step might lead to a very long
              path overall. This is why Dijkstra needs the priority queue — it is a more
              careful greedy that considers total distance, not just the current edge.
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION — GREEDY VS DP
      ══════════════════════════════════════ */}
      <SectionTag text="Section 7" />
      <SectionTitle>Greedy vs DP — The Decision Framework</SectionTitle>

      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Aspect', 'Greedy', 'Dynamic Programming'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, background: 'var(--surface)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Approach', 'One pass — pick best now, never look back', 'Explore all choices, store results, pick optimal'],
              ['Speed', 'Fast — usually O(n log n)', 'Slower — usually O(n²) or O(n × W)'],
              ['Correctness', 'Only correct if greedy choice property holds', 'Always correct if recurrence is right'],
              ['Code complexity', 'Simple — sort + one loop', 'More complex — 2D tables, careful indexing'],
              ['Works on', 'Activity selection, fractional knapsack, Huffman', '0/1 knapsack, LCS, coin change, edit distance'],
              ['Safety', 'Can silently give wrong answer', 'Gives optimal answer by construction'],
            ].map(([aspect, greedy, dp], ri) => (
              <tr key={ri}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)', fontWeight: 600 }}>{aspect}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--green)', fontSize: 12 }}>{greedy}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: '#4285f4', fontSize: 12 }}>{dp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 28 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>
          Quick decision rule for interviews:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { q: 'Can you take fractions of items?', a: 'Yes → Fractional knapsack → Greedy. No → 0/1 knapsack → DP', color: 'var(--green)' },
            { q: 'Is it about scheduling maximum non-overlapping events?', a: 'Sort by finish time → Greedy works perfectly', color: 'var(--green)' },
            { q: 'Is it minimum coins / minimum steps / minimum operations?', a: 'Almost always DP — greedy fails with non-standard denominations', color: '#ff4757' },
            { q: 'Does making the greedy choice now ever make a future choice worse?', a: 'If yes → DP. If provably no → Greedy', color: '#facc15' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 0, background: 'var(--bg2)', border: `1px solid ${item.color}22`, borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ width: 4, background: item.color, flexShrink: 0 }} />
              <div style={{ padding: '12px 16px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Q: {item.q}</div>
                <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.7 }}>→ {item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          WHAT'S NEXT
      ══════════════════════════════════════ */}
      <SectionTag text="What's Next" />
      <SectionTitle>You Are Ready for Unit 18</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        You now know greedy algorithms — the idea, four classic problems,
        when greedy is provably correct, and the critical cases where it fails.
        The greedy vs DP decision framework will save you hours in interviews.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 32 }}>
        In Unit 18 we cover <strong style={{ color: 'var(--text)' }}>Backtracking</strong> —
        try a path, hit a dead end, undo, try another. The technique behind N-Queens,
        Sudoku solvers, and maze problems. Backtracking is brute force made smart —
        it prunes paths that cannot possibly lead to a solution.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(0,230,118,0.02) 100%)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 12, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 700, marginBottom: 6 }}>UP NEXT → UNIT 18</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Backtracking — Try, Fail, Undo, Try Again</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>N-Queens, Rat in a Maze, Sudoku Solver, Subset Sum — all in C.</div>
        </div>
        <Link href="/learn/dsa/backtracking" style={{ background: 'var(--green)', color: '#000', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '10px 22px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Coming Soon →
        </Link>
      </div>

      <KeyTakeaways items={[
        'Greedy = at each step pick the locally best option and never reconsider it',
        'Two conditions for greedy to work: greedy choice property (local best is part of global best) + optimal substructure',
        'Activity selection: sort by finish time, always pick the earliest-finishing non-overlapping activity — provably optimal',
        'Fractional knapsack: sort by value/weight ratio, take highest ratio items first, take fractions when needed — O(n log n)',
        'Huffman coding: always merge the two lowest-frequency nodes — builds optimal prefix-free binary codes',
        'Job sequencing: sort by profit descending, schedule each job as late as possible before its deadline',
        'Greedy FAILS for 0/1 knapsack, coin change with unusual denominations, and shortest path without careful tracking',
        'Greedy vs DP: if you can take fractions → greedy. If you cannot → DP. If minimum ops/coins → almost always DP',
        'Greedy silently gives wrong answers when the greedy choice property does not hold — always verify correctness',
        'Greedy is usually O(n log n) due to sorting. DP is usually O(n²) or higher. When greedy is correct, always prefer it',
      ]} />

    </LearnLayout>
  )
}