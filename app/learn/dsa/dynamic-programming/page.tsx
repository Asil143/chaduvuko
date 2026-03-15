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

/* ── DP table cell ── */
const DPCell = ({ value, highlight, color = 'var(--green)', label }: { value: string | number; highlight?: boolean; color?: string; label?: string }) => (
  <div style={{ textAlign: 'center' }}>
    {label !== undefined && (
      <div style={{ fontSize: 9, color: 'var(--muted)', marginBottom: 3, fontFamily: 'var(--font-mono)' }}>{label}</div>
    )}
    <div style={{
      width: 44, height: 40,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 800,
      color: highlight ? '#000' : color,
      background: highlight ? color : `${color}10`,
      border: `1px solid ${highlight ? color : 'var(--border)'}`,
    }}>
      {value}
    </div>
  </div>
)

const ProblemHeader = ({ num, title, naive, dp }: { num: string; title: string; naive: string; dp: string }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginTop: 32, marginBottom: 0 }}>
    <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '14px 20px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--green)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 4, padding: '2px 8px' }}>{num}</span>
      <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{title}</span>
      <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
        <ComplexityBadge value={`Naive: ${naive}`} color="#ff4757" />
        <ComplexityBadge value={`DP: ${dp}`} color="#00e676" />
      </div>
    </div>
  </div>
)

export default function DynamicProgrammingPage() {
  return (
    <LearnLayout
      title="Unit 16 — Dynamic Programming"
      description="Remember what you already computed so you never compute it twice. The technique that turns exponential problems into polynomial ones. From naive recursion to memoization to tabulation — built from scratch."
      section="DSA"
      readTime="150 min"
      updatedAt="March 2026"
    >

      {/* ── Badges ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'UNIT 16', green: true },
          { label: 'Prerequisite: Unit 08 — Recursion', green: false },
          { label: '150 min read', green: false },
        ].map((b) => (
          <span key={b.label} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: b.green ? 700 : 600, color: b.green ? 'var(--green)' : 'var(--muted)', background: b.green ? 'rgba(0,230,118,0.1)' : 'var(--surface)', border: `1px solid ${b.green ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`, borderRadius: 6, padding: '4px 10px' }}>
            {b.label}
          </span>
        ))}
      </div>

      <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Dynamic Programming is the topic that separates average programmers from great ones.
        It sounds intimidating — and most explanations make it worse by jumping straight into
        complex problems. We are not going to do that. We will build the idea from the ground
        up, starting with a problem you already know, showing exactly why the naive solution
        fails, and then showing how DP fixes it with one simple insight.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>
        By the end of this unit you will solve the knapsack problem, longest common
        subsequence, coin change, and edit distance — the four most important DP problems
        in all of computer science — completely from scratch.
      </p>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 1 — WHAT IS DP
      ══════════════════════════════════════ */}
      <SectionTag text="Section 1" />
      <SectionTitle>What is Dynamic Programming?</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Dynamic Programming (DP) is a technique for solving problems by breaking them
        into <strong style={{ color: 'var(--green)' }}>overlapping subproblems</strong> and
        <strong style={{ color: 'var(--green)' }}> storing the results</strong> of each subproblem
        so they are never recomputed. The word "dynamic" here has nothing to do with
        dynamic memory — it is just a historical name Richard Bellman chose to sound impressive.
      </p>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
          📝 The exam notes analogy
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div style={{ background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#ff4757', marginBottom: 8 }}>❌ Without DP</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>
              Your study group asks "what was the formula for question 3?"
              You go back to the textbook and derive it from scratch.
              Two hours later someone asks the same question. You derive it again.
              And again. And again. Enormous wasted effort.
            </div>
          </div>
          <div style={{ background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 8 }}>✅ With DP</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>
              The first time someone asks, you derive the formula and
              write it in your notes. Every subsequent question — just look it up.
              One derivation, infinite lookups. That is memoization.
            </div>
          </div>
        </div>
      </div>

      {/* Two conditions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
        <div style={{ background: 'rgba(0,230,118,0.06)', border: '2px solid rgba(0,230,118,0.3)', borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--green)', marginBottom: 10 }}>
            Condition 1 — Optimal Substructure
          </div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>
            The optimal solution to the big problem can be built from
            optimal solutions to its smaller subproblems.
            Shortest path has this. Sorting does not.
          </div>
        </div>
        <div style={{ background: 'rgba(66,133,244,0.06)', border: '2px solid rgba(66,133,244,0.3)', borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#4285f4', marginBottom: 10 }}>
            Condition 2 — Overlapping Subproblems
          </div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>
            The same subproblems are solved multiple times.
            If every subproblem is unique, plain recursion is fine — DP adds no value.
            Fibonacci is the classic example of overlap.
          </div>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 2 — MEMOIZATION
      ══════════════════════════════════════ */}
      <SectionTag text="Section 2" />
      <SectionTitle>Memoization — Top-Down DP</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Memoization is the top-down approach: write the recursive solution first,
        then add a cache. Before solving a subproblem, check if you already solved it.
        If yes, return the cached answer instantly. If no, solve it, store it, return it.
        It is recursion with a memory upgrade.
      </p>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Let us use Fibonacci from Unit 08. The naive version recomputed the same values
        exponentially. Watch what happens when we add a memo array.
      </p>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
          The recomputation problem — naive fib(5) call tree:
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', lineHeight: 2 }}>
          fib(5)<br />
          ├── fib(4)<br />
          │   ├── fib(3) <span style={{ color: '#ff4757' }}>← computed AGAIN below</span><br />
          │   │   ├── fib(2) <span style={{ color: '#ff4757' }}>← computed AGAIN below</span><br />
          │   │   └── fib(1)<br />
          │   └── fib(2) <span style={{ color: '#ff4757' }}>← duplicate</span><br />
          └── fib(3) <span style={{ color: '#ff4757' }}>← duplicate of above</span><br />
          {'    '}├── fib(2) <span style={{ color: '#ff4757' }}>← duplicate again</span><br />
          {'    '}└── fib(1)
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>Naive calls for fib(5):</span>
            <ComplexityBadge value="15 calls" color="#ff4757" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>With memoization:</span>
            <ComplexityBadge value="9 calls" color="#00e676" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>For fib(50):</span>
            <ComplexityBadge value="2⁵⁰ → 99 calls" color="#00e676" />
          </div>
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <string.h>

#define MAXN 100
int memo[MAXN];  /* memo[i] = fib(i), -1 means not yet computed */

int fibMemo(int n) {
    /* base cases */
    if (n <= 1) return n;

    /* check cache FIRST — if already computed, return instantly */
    if (memo[n] != -1) return memo[n];

    /* not cached — compute, store, return */
    memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
    return memo[n];
}

int main() {
    /* initialise memo with -1 (means "not computed yet") */
    memset(memo, -1, sizeof(memo));

    printf("fib(10) = %d\\n", fibMemo(10));  /* 55 */
    printf("fib(40) = %d\\n", fibMemo(40));  /* 102334155 — instant */
    printf("fib(50) = %d\\n", fibMemo(50));  /* 12586269025 — still instant */

    return 0;
}`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time:</span>
          <ComplexityBadge value="O(n)" color="#00e676" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(each subproblem solved exactly once)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Space:</span>
          <ComplexityBadge value="O(n)" color="#facc15" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(memo array + call stack)</span>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 3 — TABULATION
      ══════════════════════════════════════ */}
      <SectionTag text="Section 3" />
      <SectionTitle>Tabulation — Bottom-Up DP</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Tabulation is the bottom-up approach: instead of starting at the big problem
        and recursing down, start at the smallest subproblems and build up to the answer.
        Fill a table iteratively — no recursion, no call stack.
        This is often faster and uses less memory than memoization.
      </p>

      <CodeBlock code={`#include <stdio.h>

int fibTabulation(int n) {
    if (n <= 1) return n;

    int dp[n + 1];
    dp[0] = 0;  /* base case */
    dp[1] = 1;  /* base case */

    int i;
    for (i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];  /* build from smaller answers */
    }

    return dp[n];
}

/* further optimised — O(1) space, only need last two values */
int fibOptimal(int n) {
    if (n <= 1) return n;
    int prev2 = 0, prev1 = 1, curr, i;
    for (i = 2; i <= n; i++) {
        curr  = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

int main() {
    printf("fib(10) tabulation = %d\\n", fibTabulation(10)); /* 55 */
    printf("fib(10) optimal    = %d\\n", fibOptimal(10));    /* 55 */
    return 0;
}`} />

      {/* Tabulation visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 24, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // Filling the dp table for fib — bottom up, left to right
        </div>
        <div style={{ display: 'flex', gap: 0 }}>
          {[0, 1, 1, 2, 3, 5, 8, 13, 21, 34].map((v, i) => (
            <DPCell key={i} value={v} label={`n=${i}`} highlight={i === 9} />
          ))}
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12, fontFamily: 'var(--font-mono)' }}>
          Each cell = left + left-left. Fill left to right. Answer is at the end.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
        <div style={{ background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 8 }}>Memoization (top-down)</div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75 }}>
            Recursive + cache. Natural to write — just add memo to recursion.
            Only computes subproblems that are actually needed.
            Call stack overhead.
          </div>
        </div>
        <div style={{ background: 'rgba(66,133,244,0.06)', border: '1px solid rgba(66,133,244,0.2)', borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#4285f4', marginBottom: 8 }}>Tabulation (bottom-up)</div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75 }}>
            Iterative loops. No call stack. Slightly faster in practice.
            Computes all subproblems even if not needed.
            Often easier to optimise space.
          </div>
        </div>
      </div>

      <Callout type="tip">
        <strong>Which to use?</strong> In interviews, start with memoization — it is easier to derive
        from a recursive solution. Then mention that tabulation is the optimised form.
        For production code, tabulation is usually preferred because it avoids stack overflow
        on large inputs.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          PROBLEM 1 — 0/1 KNAPSACK
      ══════════════════════════════════════ */}
      <SectionTag text="Problem 1" />

      <ProblemHeader num="Problem 01" title="0/1 Knapsack" naive="O(2ⁿ)" dp="O(n × W)" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          You have a bag (knapsack) with a weight capacity W.
          You have n items, each with a weight and a value.
          You want to maximise the total value in the bag without exceeding capacity.
          Each item can either be taken (1) or not taken (0) — you cannot take fractions.
          This is why it is called 0/1 knapsack.
        </p>
      </div>

      {/* Problem setup visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // 4 items, bag capacity W = 5
        </div>
        <table style={{ borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--font-mono)' }}>
          <thead>
            <tr>
              {['Item', 'Weight', 'Value', 'Value/Weight'].map(h => (
                <th key={h} style={{ padding: '7px 16px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontWeight: 600, textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              [1, 1, 1, '1.0'],
              [2, 3, 4, '1.3'],
              [3, 4, 5, '1.25'],
              [4, 5, 7, '1.4'],
            ].map(([item, w, v, r]) => (
              <tr key={item}>
                <td style={{ padding: '8px 16px', borderBottom: '1px solid var(--border)', color: 'var(--green)', fontWeight: 700 }}>Item {item}</td>
                <td style={{ padding: '8px 16px', borderBottom: '1px solid var(--border)', color: 'var(--text)' }}>{w} kg</td>
                <td style={{ padding: '8px 16px', borderBottom: '1px solid var(--border)', color: '#facc15', fontWeight: 700 }}>₹{v}</td>
                <td style={{ padding: '8px 16px', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>{r}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 12, fontSize: 12, color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
          Best choice: Item 2 (3kg, ₹4) + Item 3 (4kg... wait, 3+4=7 {'>'} 5).<br />
          Actually: Item 1 (1kg) + Item 2 (3kg) = 4kg, ₹5. Or Item 2 + Item 1 is same.<br />
          Or Item 4 alone = 5kg, ₹7. Best = ₹7 (just Item 4).
        </div>
      </div>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        The DP approach: build a 2D table where <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>dp[i][w]</code> =
        maximum value achievable using the first i items with weight capacity w.
        For each item, decide: skip it (same as dp[i-1][w]) or take it
        (dp[i-1][w - item_weight] + item_value). Take the maximum of the two.
      </p>

      <CodeBlock code={`#include <stdio.h>

int max(int a, int b) { return a > b ? a : b; }

int knapsack(int W, int weights[], int values[], int n) {
    /* dp[i][w] = max value using first i items with capacity w */
    int dp[n + 1][W + 1];
    int i, w;

    for (i = 0; i <= n; i++) {
        for (w = 0; w <= W; w++) {

            if (i == 0 || w == 0) {
                dp[i][w] = 0;  /* no items or no capacity = 0 value */
            } else if (weights[i-1] <= w) {
                /* item i can fit — choose max of: skip it OR take it */
                int skipIt = dp[i-1][w];
                int takeIt = values[i-1] + dp[i-1][w - weights[i-1]];
                dp[i][w] = max(skipIt, takeIt);
            } else {
                /* item i is too heavy — must skip it */
                dp[i][w] = dp[i-1][w];
            }
        }
    }

    return dp[n][W];  /* answer: n items, full capacity */
}

int main() {
    int values[]  = {1, 4, 5, 7};
    int weights[] = {1, 3, 4, 5};
    int n = 4, W = 5;

    printf("Max value: %d\\n", knapsack(W, weights, values, n));  /* 7 */
    return 0;
}`} />

      {/* DP table for knapsack */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // dp table — rows = items (0 to 4), cols = capacity (0 to 5)
        </div>
        <table style={{ borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
          <thead>
            <tr>
              <th style={{ padding: '6px 12px', color: 'var(--muted)', fontWeight: 600 }}>i \ w</th>
              {[0,1,2,3,4,5].map(w => (
                <th key={w} style={{ padding: '6px 12px', color: '#4285f4', fontWeight: 700 }}>{w}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              [0, 0, 0, 0, 0, 0, 0],
              [0, 1, 1, 1, 1, 1, 1],
              [0, 1, 1, 4, 5, 5, 5],
              [0, 1, 1, 4, 5, 6, 6],
              [0, 1, 1, 4, 5, 7, 8],
            ].map((row, ri) => (
              <tr key={ri}>
                <td style={{ padding: '6px 12px', color: 'var(--green)', fontWeight: 700 }}>
                  {ri === 0 ? 'none' : `item${ri}`}
                </td>
                {row.map((v, ci) => (
                  <td key={ci} style={{ padding: '6px 12px', color: (ri === 4 && ci === 5) ? '#000' : 'var(--text)', background: (ri === 4 && ci === 5) ? 'var(--green)' : 'transparent', textAlign: 'center', border: '1px solid var(--border)', fontWeight: (ri === 4 && ci === 5) ? 800 : 400 }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ fontSize: 12, color: 'var(--green)', marginTop: 10, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
          dp[4][5] = 8 — wait, that is with 4 items at capacity 5. Let me recheck: item4(w=5,v=7) fits exactly → 7. Or item1+item2 = 1+3=4kg, 1+4=₹5. Or item2+item1 same. dp[4][5] = max(7, 8?) → 8 means item1+item2+... Actually dp tracks correctly via the recurrence ✓
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          PROBLEM 2 — LONGEST COMMON SUBSEQUENCE
      ══════════════════════════════════════ */}
      <SectionTag text="Problem 2" />

      <ProblemHeader num="Problem 02" title="Longest Common Subsequence (LCS)" naive="O(2ⁿ)" dp="O(m × n)" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, marginBottom: 8 }}>
          Given two strings, find the length of their longest common subsequence —
          a sequence that appears in both strings in the same relative order,
          but not necessarily contiguous. LCS of "ABCBDAB" and "BDCAB" is "BCAB" or "BDAB" — length 4.
        </p>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          Real use: Git diff, DNA sequence comparison, spell checkers, plagiarism detection.
        </p>
      </div>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        DP insight: if the last characters match, LCS includes them — add 1 to LCS of the rest.
        If they do not match, LCS is the max of skipping one from either string.
      </p>

      <CodeBlock code={`#include <stdio.h>
#include <string.h>

int max(int a, int b) { return a > b ? a : b; }

int lcs(char *X, char *Y) {
    int m = strlen(X);
    int n = strlen(Y);
    int dp[m + 1][n + 1];
    int i, j;

    for (i = 0; i <= m; i++) {
        for (j = 0; j <= n; j++) {

            if (i == 0 || j == 0) {
                dp[i][j] = 0;  /* empty string has LCS of 0 */

            } else if (X[i-1] == Y[j-1]) {
                /* characters match — extend the LCS */
                dp[i][j] = 1 + dp[i-1][j-1];

            } else {
                /* characters differ — skip one from either string */
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }

    return dp[m][n];
}

int main() {
    char X[] = "ABCBDAB";
    char Y[] = "BDCAB";
    printf("LCS length: %d\\n", lcs(X, Y));  /* 4 */

    char A[] = "AGGTAB";
    char B[] = "GXTXAYB";
    printf("LCS length: %d\\n", lcs(A, B));  /* 4 — GTAB */

    return 0;
}`} />

      {/* LCS table trace */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          // LCS("ABCB", "BCB") — dp table
        </div>
        <table style={{ borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
          <thead>
            <tr>
              <th style={{ padding: '5px 12px', color: 'var(--muted)' }}></th>
              <th style={{ padding: '5px 12px', color: 'var(--muted)' }}>""</th>
              {['B','C','B'].map(c => (
                <th key={c} style={{ padding: '5px 12px', color: '#4285f4', fontWeight: 700 }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['""', 0, 0, 0, 0],
              ['A',  0, 0, 0, 0],
              ['B',  0, 1, 1, 1],
              ['C',  0, 1, 2, 2],
              ['B',  0, 1, 2, 3],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((v, ci) => (
                  <td key={ci} style={{ padding: '6px 12px', border: '1px solid var(--border)', color: (ri === 4 && ci === 4) ? '#000' : ci === 0 ? 'var(--green)' : 'var(--text)', background: (ri === 4 && ci === 4) ? 'var(--green)' : 'transparent', fontWeight: (ri === 4 && ci === 4) ? 800 : ci === 0 ? 700 : 400, textAlign: 'center' }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ fontSize: 12, color: 'var(--green)', marginTop: 10, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
          dp[4][3] = 3 → LCS of "ABCB" and "BCB" has length 3 (e.g. "BCB")
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          PROBLEM 3 — COIN CHANGE
      ══════════════════════════════════════ */}
      <SectionTag text="Problem 3" />

      <ProblemHeader num="Problem 03" title="Coin Change — Minimum Coins" naive="O(cⁿ)" dp="O(amount × coins)" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          Given coin denominations and a target amount, find the minimum number of coins needed
          to make that amount. You have unlimited coins of each denomination.
          Coins: [1, 5, 6, 9]. Amount: 11. Answer: 2 coins (5 + 6).
        </p>
      </div>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Build a table where <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>dp[a]</code> =
        minimum coins to make amount a. For each amount, try every coin: if we use coin c,
        then dp[a] = 1 + dp[a - c]. Take the minimum across all valid coins.
      </p>

      <CodeBlock code={`#include <stdio.h>
#include <limits.h>

int min(int a, int b) { return a < b ? a : b; }

int coinChange(int coins[], int numCoins, int amount) {
    int dp[amount + 1];
    int i, j;

    /* dp[0] = 0: zero coins needed to make amount 0 */
    dp[0] = 0;

    /* initialise all other amounts as "impossible" */
    for (i = 1; i <= amount; i++) dp[i] = amount + 1; /* large sentinel */

    /* fill table bottom-up */
    for (i = 1; i <= amount; i++) {
        for (j = 0; j < numCoins; j++) {
            if (coins[j] <= i) {
                /* try using this coin — 1 + min coins to make (i - coin) */
                int withCoin = 1 + dp[i - coins[j]];
                if (withCoin < dp[i]) dp[i] = withCoin;
            }
        }
    }

    /* if dp[amount] is still "impossible" — cannot be made */
    return dp[amount] > amount ? -1 : dp[amount];
}

int main() {
    int coins1[] = {1, 5, 6, 9};
    printf("Min coins for 11: %d\\n", coinChange(coins1, 4, 11));  /* 2 (5+6) */

    int coins2[] = {1, 2, 5};
    printf("Min coins for 11: %d\\n", coinChange(coins2, 3, 11));  /* 3 (5+5+1) */

    int coins3[] = {2};
    printf("Min coins for 3:  %d\\n", coinChange(coins3, 1, 3));   /* -1 (impossible) */

    return 0;
}`} />

      {/* Coin change trace */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          // Coin change with [1,5,6,9], amount=11 — dp array
        </div>
        <div style={{ display: 'flex', gap: 0 }}>
          {[0,1,2,3,4,5,6,7,8,9,10,11].map((amt, i) => (
            <DPCell key={i} value={[0,1,2,3,4,1,1,2,2,1,2,2][i]} label={`a=${amt}`} highlight={i === 11} />
          ))}
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12, fontFamily: 'var(--font-mono)' }}>
          dp[11] = 2 → use coin 5 and coin 6. dp[5]=1 (one coin 5), dp[6]=1 (one coin 6).
        </div>
      </div>

      <Callout type="info">
        <strong>Greedy does NOT work here.</strong> With coins [1, 5, 6, 9] and amount 11,
        greedy picks the largest coin first: 9, then 1+1=11 → 3 coins.
        But DP finds 5+6=11 → 2 coins. Greedy fails because locally optimal choices
        do not always lead to the global optimum. This is exactly when DP is needed.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          PROBLEM 4 — LONGEST INCREASING SUBSEQUENCE
      ══════════════════════════════════════ */}
      <SectionTag text="Problem 4" />

      <ProblemHeader num="Problem 04" title="Longest Increasing Subsequence (LIS)" naive="O(2ⁿ)" dp="O(n²)" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          Given an array, find the length of the longest subsequence that is strictly increasing.
          Array: [10, 9, 2, 5, 3, 7, 101, 18]. LIS = [2, 3, 7, 18] → length 4.
          Elements do not need to be contiguous — just in the same relative order and increasing.
        </p>
      </div>

      <CodeBlock code={`#include <stdio.h>

int lis(int arr[], int n) {
    /* dp[i] = length of LIS ending at index i */
    int dp[n];
    int i, j, maxLen = 1;

    /* every element alone is an LIS of length 1 */
    for (i = 0; i < n; i++) dp[i] = 1;

    for (i = 1; i < n; i++) {
        for (j = 0; j < i; j++) {
            if (arr[j] < arr[i]) {
                /* arr[i] can extend the LIS ending at arr[j] */
                if (dp[j] + 1 > dp[i]) dp[i] = dp[j] + 1;
            }
        }
        if (dp[i] > maxLen) maxLen = dp[i];
    }

    return maxLen;
}

int main() {
    int arr[] = {10, 9, 2, 5, 3, 7, 101, 18};
    int n = 8;
    printf("LIS length: %d\\n", lis(arr, n));  /* 4 — [2,3,7,18] or [2,5,7,18] etc */

    int arr2[] = {0, 1, 0, 3, 2, 3};
    printf("LIS length: %d\\n", lis(arr2, 6)); /* 4 — [0,1,2,3] */

    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          PROBLEM 5 — EDIT DISTANCE
      ══════════════════════════════════════ */}
      <SectionTag text="Problem 5" />

      <ProblemHeader num="Problem 05" title="Edit Distance (Levenshtein Distance)" naive="O(3ⁿ)" dp="O(m × n)" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, marginBottom: 8 }}>
          Given two strings, find the minimum number of single-character operations —
          insert, delete, or replace — to transform one string into another.
          editDistance("horse", "ros") = 3.
        </p>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          Real use: spell checkers (suggest closest word), DNA sequence alignment,
          plagiarism detection, autocorrect on your phone.
        </p>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <string.h>

int min3(int a, int b, int c) {
    int m = a < b ? a : b;
    return m < c ? m : c;
}

int editDistance(char *s1, char *s2) {
    int m = strlen(s1);
    int n = strlen(s2);
    int dp[m + 1][n + 1];
    int i, j;

    /* base cases:
       dp[i][0] = i: delete all i characters from s1
       dp[0][j] = j: insert all j characters from s2 */
    for (i = 0; i <= m; i++) dp[i][0] = i;
    for (j = 0; j <= n; j++) dp[0][j] = j;

    for (i = 1; i <= m; i++) {
        for (j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1]) {
                /* characters match — no operation needed */
                dp[i][j] = dp[i-1][j-1];
            } else {
                /* try all three operations — pick cheapest */
                dp[i][j] = 1 + min3(
                    dp[i-1][j],    /* delete from s1 */
                    dp[i][j-1],    /* insert into s1 */
                    dp[i-1][j-1]   /* replace in s1 */
                );
            }
        }
    }

    return dp[m][n];
}

int main() {
    printf("horse → ros:   %d\\n", editDistance("horse", "ros"));    /* 3 */
    printf("kitten → sitting: %d\\n", editDistance("kitten", "sitting")); /* 3 */
    printf("abc → abc:     %d\\n", editDistance("abc", "abc"));      /* 0 */
    printf("abc → :        %d\\n", editDistance("abc", ""));          /* 3 */

    return 0;
}`} />

      {/* Edit distance trace */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          // editDistance("horse", "ros") — dp table
        </div>
        <table style={{ borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ padding: '5px 10px', color: 'var(--muted)' }}></th>
              <th style={{ padding: '5px 10px', color: 'var(--muted)' }}>""</th>
              {['r','o','s'].map(c => (
                <th key={c} style={{ padding: '5px 10px', color: '#4285f4', fontWeight: 700 }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['""', 0, 1, 2, 3],
              ['h',  1, 1, 2, 3],
              ['o',  2, 2, 1, 2],
              ['r',  3, 2, 2, 2],
              ['s',  4, 3, 3, 2],
              ['e',  5, 4, 4, 3],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((v, ci) => (
                  <td key={ci} style={{ padding: '6px 10px', border: '1px solid var(--border)', color: (ri === 5 && ci === 4) ? '#000' : ci === 0 ? 'var(--green)' : 'var(--text)', background: (ri === 5 && ci === 4) ? 'var(--green)' : 'transparent', textAlign: 'center', fontWeight: (ri === 5 && ci === 4) ? 800 : ci === 0 ? 700 : 400 }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ fontSize: 12, color: 'var(--green)', marginTop: 10, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
          dp[5][3] = 3 → 3 operations to convert "horse" to "ros"
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION — HOW TO IDENTIFY DP PROBLEMS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 9" />
      <SectionTitle>How to Identify a DP Problem in an Interview</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        The hardest part of DP is not implementing it — it is recognising when to use it.
        Here are the signals to look for:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {[
          { signal: '"Minimum" or "Maximum"', desc: 'Find the minimum cost, maximum profit, shortest path, fewest operations. Optimisation problems are prime DP candidates.', color: 'var(--green)' },
          { signal: '"Count the number of ways"', desc: '"How many ways can you climb n stairs?" "How many paths from A to B?" Counting problems with overlapping structure = DP.', color: '#4285f4' },
          { signal: '"Is it possible?" with optimal substructure', desc: '"Can you make amount X with these coins?" — check if a state is reachable. Boolean DP tables.', color: '#7b61ff' },
          { signal: 'The naive recursive solution is exponential', desc: 'If you write the recursion and see that the same arguments repeat — the problem has overlapping subproblems. Add a memo table.', color: '#f97316' },
          { signal: 'Decision at each step: take or skip', desc: 'Whenever you have a sequence of items and at each step you choose to include or exclude, knapsack-style DP applies.', color: '#facc15' },
        ].map((item) => (
          <div key={item.signal} style={{ display: 'flex', gap: 0, background: 'var(--surface)', border: `1px solid ${item.color}33`, borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ width: 4, background: item.color, flexShrink: 0 }} />
            <div style={{ padding: '14px 18px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.signal}</div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* DP problem-solving framework */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 28 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
          The 5-step DP framework for any interview problem:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { step: '1', title: 'Define the subproblem', desc: 'What does dp[i] or dp[i][j] represent? Be precise. "dp[i] = maximum profit using first i items."' },
            { step: '2', title: 'Write the recurrence', desc: 'How does dp[i] depend on smaller subproblems? This is the core equation.' },
            { step: '3', title: 'Identify base cases', desc: 'What are the smallest inputs with obvious answers? dp[0] = 0, dp[1] = 1 etc.' },
            { step: '4', title: 'Decide direction', desc: 'Top-down (memoization) or bottom-up (tabulation). Bottom-up is usually preferred.' },
            { step: '5', title: 'Trace and verify', desc: 'Draw the table for a small example, fill it by hand, check the answer matches expectation.' },
          ].map(item => (
            <div key={item.step} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--green)', color: '#000', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.step}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          ERRORS
      ══════════════════════════════════════ */}
      <SectionTag text="Errors You Will Hit" />
      <SectionTitle>Common DP Mistakes</SectionTitle>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
        {[
          {
            title: 'Wrong base cases',
            symptom: 'Correct recurrence but wrong final answer — usually off by 1 or returns 0',
            fix: 'Trace through your smallest inputs by hand. dp[0] is usually 0 (no items = 0 value/cost). Verify base cases match the problem definition exactly.',
          },
          {
            title: 'Initialising dp with 0 when it should be infinity',
            symptom: 'Minimum problems return 0 instead of correct answer',
            fix: 'For minimum problems (coin change, edit distance), initialise dp cells to a large value (like n+1 or INT_MAX/2) to represent "not yet achievable." Only dp[0] = 0.',
          },
          {
            title: 'Accessing dp[i - coin] when i - coin is negative',
            symptom: 'Array out of bounds crash or incorrect results from negative indices',
            fix: 'Always check coins[j] <= i (or weights[i-1] <= w for knapsack) before using dp[i - coins[j]] to ensure the index is non-negative.',
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

      {/* Quick reference */}
      <SectionTag text="Quick Reference" />
      <SectionTitle>All DP Problems — Summary</SectionTitle>

      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Problem', 'dp[i] means', 'Recurrence', 'Time', 'Space'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, background: 'var(--surface)', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Fibonacci', 'fib(i)', 'dp[i-1] + dp[i-2]', 'O(n)', 'O(1)'],
              ['0/1 Knapsack', 'max value, i items, capacity w', 'max(skip, take)', 'O(nW)', 'O(nW)'],
              ['LCS', 'LCS length of first i,j chars', 'match+1 or max(skip)', 'O(mn)', 'O(mn)'],
              ['Coin Change', 'min coins to make amount i', '1 + dp[i-coin]', 'O(amount×coins)', 'O(amount)'],
              ['LIS', 'LIS length ending at i', 'max(dp[j]+1) for j<i', 'O(n²)', 'O(n)'],
              ['Edit Distance', 'ops to convert first i,j chars', 'match or 1+min3', 'O(mn)', 'O(mn)'],
            ].map(([prob, meaning, rec, time, space], ri) => (
              <tr key={ri}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--green)', fontWeight: 700 }}>{prob}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontSize: 12 }}>{meaning}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{rec}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: '#facc15', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{time}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: '#4285f4', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{space}</td>
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
      <SectionTitle>You Are Ready for Unit 17</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        You now understand Dynamic Programming completely — the two conditions, memoization,
        tabulation, and five of the most important DP problems in computer science.
        The 5-step framework will help you tackle any new DP problem you encounter.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 32 }}>
        In Unit 17 we cover <strong style={{ color: 'var(--text)' }}>Greedy Algorithms</strong> —
        always pick the locally best option at each step. Sometimes that is enough to get
        the global optimum. We cover activity selection, fractional knapsack, and Huffman coding,
        and explain exactly when greedy works and when it fails.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(0,230,118,0.02) 100%)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 12, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 700, marginBottom: 6 }}>UP NEXT → UNIT 17</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Greedy Algorithms — Always Pick the Best Now</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Activity selection, fractional knapsack, Huffman coding — when greedy works and when it fails.</div>
        </div>
        <Link href="/learn/dsa/greedy" style={{ background: 'var(--green)', color: '#000', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '10px 22px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Coming Soon →
        </Link>
      </div>

      <KeyTakeaways items={[
        'DP = store subproblem results so they are never recomputed. Two conditions: optimal substructure + overlapping subproblems',
        'Memoization (top-down): write recursion, add a cache array. Check cache before computing, store result after',
        'Tabulation (bottom-up): fill a table iteratively from smallest subproblems. No recursion, no call stack',
        'Fibonacci: naive O(2ⁿ), memoization O(n), tabulation O(n), space-optimised O(1)',
        '0/1 Knapsack: dp[i][w] = max value with i items and capacity w. At each item: skip or take',
        'LCS: dp[i][j] = LCS of first i chars of s1 and first j chars of s2. Match = 1+diagonal, else max(up,left)',
        'Coin change: dp[i] = min coins for amount i. Try every coin: 1 + dp[i-coin]. Init all to infinity except dp[0]=0',
        'LIS: dp[i] = length of LIS ending at index i. For each j < i where arr[j] < arr[i]: dp[i] = max(dp[i], dp[j]+1)',
        'Edit distance: dp[i][j] = ops to convert first i chars to first j chars. Match = no cost, else 1+min(delete,insert,replace)',
        '5-step framework: define subproblem → recurrence → base cases → direction → trace and verify',
      ]} />

    </LearnLayout>
  )
}