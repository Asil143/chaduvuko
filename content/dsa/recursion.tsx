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

/* ── Call stack frame visual ── */
const CallFrame = ({ fn, val, status, returning }: { fn: string; val?: string; status: 'active' | 'waiting' | 'done'; returning?: string }) => {
  const colors = { active: 'var(--green)', waiting: '#facc15', done: 'var(--muted)' }
  const bgs = { active: 'rgba(0,230,118,0.08)', waiting: 'rgba(250,204,21,0.08)', done: 'rgba(255,255,255,0.02)' }
  const color = colors[status]
  return (
    <div style={{ border: `2px solid ${color}`, borderRadius: 8, padding: '10px 16px', background: bgs[status], display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800, color }}>{fn}</div>
        {val && <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3, fontFamily: 'var(--font-mono)' }}>n = {val}</div>}
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 10, color, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{status.toUpperCase()}</div>
        {returning && <div style={{ fontSize: 11, color: 'var(--green)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>returns {returning}</div>}
      </div>
    </div>
  )
}

export default function RecursionPage() {
  return (
    <LearnLayout
      title="Unit 08 — Recursion"
      description="A function that calls itself. The concept that trips up most beginners — explained step by step, traced visually, and built up from the simplest example to the legendary Tower of Hanoi."
      section="DSA"
      readTime="90 min"
      updatedAt="March 2026"
    >

      {/* ── Badges ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'UNIT 08', green: true },
          { label: 'Prerequisite: Unit 06 — Stacks', green: false },
          { label: '90 min read', green: false },
        ].map((b) => (
          <span key={b.label} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: b.green ? 700 : 600, color: b.green ? 'var(--green)' : 'var(--muted)', background: b.green ? 'rgba(0,230,118,0.1)' : 'var(--surface)', border: `1px solid ${b.green ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`, borderRadius: 6, padding: '4px 10px' }}>
            {b.label}
          </span>
        ))}
      </div>

      <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Recursion is one of those ideas that sounds impossible the first time you hear it.
        A function that calls <em>itself</em>? Does it not just loop forever?
        How does it ever stop? How does it know what to return?
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>
        These are exactly the right questions. By the end of this unit every one of them
        will have a clear, satisfying answer. We will build the idea from a simple analogy,
        trace every call on the stack by hand, solve five classic problems,
        and understand why recursion is one of the most powerful tools in all of programming.
      </p>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 1 — WHAT IS RECURSION
      ══════════════════════════════════════ */}
      <SectionTag text="Section 1" />
      <SectionTitle>What is Recursion?</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Recursion is when a function solves a problem by <strong style={{ color: 'var(--green)' }}>
        breaking it into a smaller version of the same problem</strong> and calling
        itself to solve that smaller version. It keeps breaking the problem down
        until it reaches a version so small it can be answered directly — without
        any further calls. That stopping point is called the <strong>base case</strong>.
      </p>

      {/* Mirror analogy */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 14 }}>
          🪞 The mirror analogy
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 14 }}>
          Stand between two mirrors facing each other. You see yourself reflected,
          and inside that reflection you see another reflection, and inside that another —
          going smaller and smaller until they become too small to see.
        </p>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 0 }}>
          Recursion works the same way. Each call creates a smaller version of itself,
          which creates an even smaller one, going deeper and deeper — until we hit
          the base case (the point where the mirrors end) and start coming back.
        </p>
      </div>

      {/* The two laws */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
        <div style={{ background: 'rgba(0,230,118,0.06)', border: '2px solid rgba(0,230,118,0.3)', borderRadius: 12, padding: '20px 22px' }}>
          <div style={{ fontSize: 22, marginBottom: 10 }}>🛑</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--green)', marginBottom: 8 }}>Law 1 — The Base Case</div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>
            Every recursive function MUST have a condition where it stops calling itself
            and returns a direct answer. Without this, it runs forever and crashes with
            a stack overflow.
          </div>
        </div>
        <div style={{ background: 'rgba(123,97,255,0.06)', border: '2px solid rgba(123,97,255,0.3)', borderRadius: 12, padding: '20px 22px' }}>
          <div style={{ fontSize: 22, marginBottom: 10 }}>🔁</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#7b61ff', marginBottom: 8 }}>Law 2 — The Recursive Case</div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>
            Every recursive call must move closer to the base case. Each call should
            work on a smaller version of the problem — never the same or larger.
            Otherwise it never terminates.
          </div>
        </div>
      </div>

      <Callout type="warning">
        <strong>Missing the base case is the #1 recursion mistake.</strong> If you forget it
        or write it incorrectly, the function calls itself infinitely, fills up the call stack,
        and your program crashes with "Segmentation fault" or "Stack overflow."
        Always write the base case first — before writing the recursive case.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 2 — HOW IT WORKS INSIDE
      ══════════════════════════════════════ */}
      <SectionTag text="Section 2" />
      <SectionTitle>How Recursion Works Inside — The Call Stack</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Remember the call stack from Unit 06? When a function calls another function,
        the current function is paused and pushed onto the call stack. When the called
        function returns, the paused function resumes from where it stopped.
        Recursion uses this exact mechanism — but the function calls <em>itself</em>.
      </p>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Recursion has two clear phases. Going down — each call pushes a new frame
        and makes the problem smaller. Coming back up — each call finishes and returns
        its answer to the call that made it. The final answer bubbles all the way
        back to the very first call.
      </p>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
          Tracing <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>factorial(3)</code> — call stack at each stage
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
          {/* Going down */}
          <div>
            <div style={{ fontSize: 11, color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 10 }}>📉 Going down (building up)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <CallFrame fn="factorial(3)" val="3" status="waiting" />
              <CallFrame fn="factorial(2)" val="2" status="waiting" />
              <CallFrame fn="factorial(1)" val="1" status="waiting" />
              <CallFrame fn="factorial(0)" val="0" status="active" returning="1" />
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8, fontFamily: 'var(--font-mono)' }}>
              base case hit → start returning
            </div>
          </div>
          {/* Coming back up */}
          <div>
            <div style={{ fontSize: 11, color: '#7b61ff', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 10 }}>📈 Coming back up (answers bubble)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <CallFrame fn="factorial(3)" val="3" status="active" returning="6" />
              <CallFrame fn="factorial(2)" val="2" status="done" returning="2" />
              <CallFrame fn="factorial(1)" val="1" status="done" returning="1" />
              <CallFrame fn="factorial(0)" val="0" status="done" returning="1" />
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8, fontFamily: 'var(--font-mono)' }}>
              final answer = 6 returned to caller
            </div>
          </div>
        </div>
      </div>

      <Callout type="tip">
        <strong>The key insight:</strong> Each recursive call is completely independent.
        It has its own copy of local variables and its own position in the code.
        When factorial(2) calls factorial(1), factorial(2) is frozen mid-execution,
        waiting. Only when factorial(1) returns does factorial(2) resume and finish.
        This is what the call stack manages for you automatically.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 3 — FACTORIAL
      ══════════════════════════════════════ */}
      <SectionTag text="Section 3" />
      <SectionTitle>Problem 1 — Factorial</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Factorial of n (written as n!) means multiply all integers from 1 to n together.
        5! = 5 × 4 × 3 × 2 × 1 = 120. And 0! = 1 by definition.
        This is the perfect first recursion problem because the pattern is obvious:
        n! = n × (n-1)!. The problem contains a smaller version of itself.
      </p>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
          Breaking down factorial(4):
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
          {[
            { expr: 'factorial(4)', eq: '4 × factorial(3)', color: 'var(--green)' },
            { expr: 'factorial(3)', eq: '3 × factorial(2)', color: '#4285f4' },
            { expr: 'factorial(2)', eq: '2 × factorial(1)', color: '#facc15' },
            { expr: 'factorial(1)', eq: '1 × factorial(0)', color: '#f97316' },
            { expr: 'factorial(0)', eq: '1  ← BASE CASE', color: '#7b61ff' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: row.color, minWidth: 140 }}>{row.expr}</span>
              <span style={{ color: 'var(--muted)' }}>=</span>
              <span style={{ color: row.color }}>{row.eq}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, fontSize: 13, color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>
          Unwinding: 1 → 1×1=1 → 2×1=2 → 3×2=6 → 4×6=24 ✓
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

int factorial(int n) {
    /* base case: factorial of 0 is 1 — stop here */
    if (n == 0) {
        return 1;
    }

    /* recursive case: n! = n × (n-1)! */
    return n * factorial(n - 1);
}

int main() {
    printf("factorial(0) = %d\\n", factorial(0));  /* 1 */
    printf("factorial(1) = %d\\n", factorial(1));  /* 1 */
    printf("factorial(5) = %d\\n", factorial(5));  /* 120 */
    printf("factorial(7) = %d\\n", factorial(7));  /* 5040 */
    return 0;
}`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time:</span>
          <ComplexityBadge value="O(n)" color="#facc15" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Space:</span>
          <ComplexityBadge value="O(n)" color="#facc15" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(n frames on call stack)</span>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 4 — FIBONACCI
      ══════════════════════════════════════ */}
      <SectionTag text="Section 4" />
      <SectionTitle>Problem 2 — Fibonacci</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        The Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21 ...
        Each number is the sum of the two before it.
        fib(n) = fib(n-1) + fib(n-2). Two base cases: fib(0) = 0 and fib(1) = 1.
      </p>

      <CodeBlock code={`#include <stdio.h>

int fibonacci(int n) {
    /* two base cases */
    if (n == 0) return 0;
    if (n == 1) return 1;

    /* recursive case: sum of the two before it */
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    int i;
    printf("Fibonacci sequence: ");
    for (i = 0; i < 10; i++) {
        printf("%d ", fibonacci(i));
    }
    printf("\\n");
    /* Output: 0 1 1 2 3 5 8 13 21 34 */
    return 0;
}`} />

      {/* Why naive fib is slow */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: '#ff4757', fontFamily: 'var(--font-display)', marginBottom: 14 }}>
          ⚠ Why this is dangerously slow
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 14 }}>
          Computing fib(5) looks harmless — but look at how many times the same values
          get computed repeatedly:
        </p>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', lineHeight: 2 }}>
          fib(5)<br />
          ├── fib(4)<br />
          │   ├── fib(3) ← computed again below<br />
          │   │   ├── fib(2)<br />
          │   │   └── fib(1)<br />
          │   └── fib(2) ← computed again below<br />
          └── fib(3) ← same as above, recomputed<br />
          {'    '}├── fib(2) ← same again<br />
          {'    '}└── fib(1)
        </div>
        <div style={{ marginTop: 14, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time:</span>
            <ComplexityBadge value="O(2ⁿ)" color="#ff4757" />
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>fib(50) requires over 1 trillion calls!</div>
        </div>
      </div>

      <Callout type="info">
        <strong>The fix is Dynamic Programming</strong> — store answers you have already computed
        so you never recompute them. We cover this completely in Unit 16.
        For now, understand the pattern and the problem. Naive recursive Fibonacci
        is a perfect example of why O(2ⁿ) is catastrophic at scale.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 5 — SUM OF DIGITS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 5" />
      <SectionTitle>Problem 3 — Sum of Digits</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Given a number like 1234, find the sum of its digits: 1+2+3+4 = 10.
        The recursive insight: the sum of digits of 1234 =
        last digit (4) + sum of digits of 123.
        Keep peeling off the last digit until the number is 0.
      </p>

      <CodeBlock code={`#include <stdio.h>

int sumOfDigits(int n) {
    /* base case: no digits left */
    if (n == 0) return 0;

    /* recursive case: last digit + sum of remaining digits */
    return (n % 10) + sumOfDigits(n / 10);
    /* n % 10 gives the last digit: 1234 % 10 = 4 */
    /* n / 10 removes the last digit: 1234 / 10 = 123 */
}

int main() {
    printf("sumOfDigits(1234) = %d\\n", sumOfDigits(1234)); /* 10 */
    printf("sumOfDigits(9999) = %d\\n", sumOfDigits(9999)); /* 36 */
    printf("sumOfDigits(100)  = %d\\n", sumOfDigits(100));  /* 1 */
    return 0;
}`} />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 20px', marginBottom: 12 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', lineHeight: 2 }}>
          sumOfDigits(1234)<br />
          = 4 + sumOfDigits(123)<br />
          = 4 + 3 + sumOfDigits(12)<br />
          = 4 + 3 + 2 + sumOfDigits(1)<br />
          = 4 + 3 + 2 + 1 + sumOfDigits(0)<br />
          = 4 + 3 + 2 + 1 + <span style={{ color: 'var(--green)' }}>0  ← base case</span><br />
          = <span style={{ color: 'var(--green)' }}>10 ✓</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time:</span>
          <ComplexityBadge value="O(d)" color="#00e676" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>where d = number of digits</span>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 6 — POWER
      ══════════════════════════════════════ */}
      <SectionTag text="Section 6" />
      <SectionTitle>Problem 4 — Power (x to the n)</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Computing x^n (x raised to the power n). The naive way: multiply x by itself n times — O(n).
        The recursive insight: x^n = x × x^(n-1). Base case: x^0 = 1.
        And with one small improvement we can make it O(log n) — the fast power trick.
      </p>

      <CodeBlock code={`#include <stdio.h>

/* Simple version — O(n) */
int power(int base, int exp) {
    if (exp == 0) return 1;            /* x^0 = 1 — base case */
    return base * power(base, exp - 1); /* x^n = x × x^(n-1) */
}

/* Fast version — O(log n) — splits the problem in half each time */
int fastPower(int base, int exp) {
    if (exp == 0) return 1;

    if (exp % 2 == 0) {
        /* even exponent: x^n = (x^(n/2))^2 */
        int half = fastPower(base, exp / 2);
        return half * half;  /* compute half once, use twice */
    } else {
        /* odd exponent: x^n = x × x^(n-1) */
        return base * fastPower(base, exp - 1);
    }
}

int main() {
    printf("2^10  = %d\\n", power(2, 10));      /* 1024 */
    printf("3^4   = %d\\n", power(3, 4));        /* 81 */
    printf("2^10  = %d (fast)\\n", fastPower(2, 10)); /* 1024 */
    printf("2^20  = %d (fast)\\n", fastPower(2, 20)); /* 1048576 */
    return 0;
}`} />

      <Callout type="tip">
        <strong>Fast power is O(log n)</strong> because each call divides the exponent by 2.
        To compute 2^20, the simple version makes 20 calls.
        The fast version makes only 5 — because 20 → 10 → 5 → 4 → 2 → 1.
        This same divide-in-half pattern appears in binary search, merge sort,
        and many other O(log n) algorithms.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 7 — GCD
      ══════════════════════════════════════ */}
      <SectionTag text="Section 7" />
      <SectionTitle>Problem 5 — Greatest Common Divisor (GCD)</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        GCD of two numbers is the largest number that divides both of them exactly.
        GCD(12, 8) = 4. The Euclidean algorithm is one of the oldest algorithms in history
        — and it is naturally recursive. The insight: GCD(a, b) = GCD(b, a % b).
        Keep taking the remainder until b becomes 0. At that point, a is the GCD.
      </p>

      <CodeBlock code={`#include <stdio.h>

int gcd(int a, int b) {
    /* base case: when b is 0, GCD is a */
    if (b == 0) return a;

    /* recursive case: GCD(a, b) = GCD(b, a % b) */
    return gcd(b, a % b);
}

int main() {
    printf("GCD(12, 8)  = %d\\n", gcd(12, 8));   /* 4 */
    printf("GCD(48, 18) = %d\\n", gcd(48, 18));  /* 6 */
    printf("GCD(100, 75)= %d\\n", gcd(100, 75)); /* 25 */
    return 0;
}`} />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 20px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>Tracing gcd(48, 18):</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', lineHeight: 2 }}>
          gcd(48, 18) → gcd(18, 48%18) = gcd(18, 12)<br />
          gcd(18, 12) → gcd(12, 18%12) = gcd(12, 6)<br />
          gcd(12, 6)  → gcd(6, 12%6)  = gcd(6, 0)<br />
          gcd(6, 0)   → <span style={{ color: 'var(--green)' }}>return 6  ← base case ✓</span>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 8 — RECURSION VS ITERATION
      ══════════════════════════════════════ */}
      <SectionTag text="Section 8" />
      <SectionTitle>Recursion vs Iteration — When to Use Which</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Every recursive solution can be rewritten as an iterative one (with loops),
        and vice versa. They are equally powerful. The choice depends on which
        makes the code clearer and more maintainable for a given problem.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
        <div style={{ background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green)', marginBottom: 12 }}>Use Recursion when:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'The problem is naturally self-similar (trees, graphs, divide & conquer)',
              'Code clarity matters more than performance',
              'The depth of recursion is small and bounded',
              'Working with tree traversal, backtracking, or DFS',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--green)', flexShrink: 0, marginTop: 1 }}>→</span>
                <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'rgba(250,204,21,0.06)', border: '1px solid rgba(250,204,21,0.2)', borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#facc15', marginBottom: 12 }}>Use Iteration when:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'Performance is critical and stack depth could be large',
              'The problem is a simple loop — no natural self-similarity',
              'You want to avoid stack overflow on large inputs',
              'Simple traversals: arrays, linked lists, strings',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ color: '#facc15', flexShrink: 0, marginTop: 1 }}>→</span>
                <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Factorial — recursive vs iterative */}
      <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 10 }}>
        Same problem — two solutions side by side
      </h3>

      <CodeBlock code={`/* Recursive factorial — elegant, uses call stack */
int factorialRecursive(int n) {
    if (n == 0) return 1;
    return n * factorialRecursive(n - 1);
}

/* Iterative factorial — uses a loop, no extra stack space */
int factorialIterative(int n) {
    int result = 1;
    int i;
    for (i = 1; i <= n; i++) {
        result = result * i;
    }
    return result;
}

/* Both give identical answers — different tradeoffs:
   Recursive: cleaner code, O(n) space (call stack)
   Iterative: slightly more code, O(1) space (just one variable)
*/`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 9 — TOWER OF HANOI
      ══════════════════════════════════════ */}
      <SectionTag text="Section 9" />
      <SectionTitle>Tower of Hanoi — The Legendary Recursion Puzzle</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Tower of Hanoi is the most famous recursion problem in all of computer science.
        It has three rods and n disks of different sizes stacked on the first rod —
        largest at the bottom, smallest at the top. The goal: move all disks to the third rod.
      </p>

      {/* Rules */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>Three strict rules:</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            'Only one disk can be moved at a time',
            'Only the top disk on any rod can be moved',
            'A larger disk can never be placed on top of a smaller disk',
          ].map((rule, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--green)', color: '#000', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
              <div style={{ fontSize: 13, color: 'var(--text)' }}>{rule}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tower visual for n=3 */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // n=3 disks — move all from Rod A to Rod C, using Rod B as helper
        </div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', minWidth: 360, flexWrap: 'wrap' }}>
          {[
            { rod: 'A (Source)', disks: [{ w: 80, label: 'disk 3 (large)' }, { w: 56, label: 'disk 2' }, { w: 36, label: 'disk 1 (small)' }] },
            { rod: 'B (Helper)', disks: [] },
            { rod: 'C (Target)', disks: [] },
          ].map((col) => (
            <div key={col.rod} style={{ textAlign: 'center', minWidth: 120 }}>
              <div style={{ fontSize: 11, color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 10 }}>{col.rod}</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, minHeight: 90 }}>
                {col.disks.map((disk, i) => (
                  <div key={i} style={{ height: 26, width: disk.w, background: 'rgba(0,230,118,0.15)', border: '2px solid var(--green)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>
                    {disk.label}
                  </div>
                ))}
              </div>
              <div style={{ width: 4, height: 96, background: 'var(--border)', margin: '0 auto', marginTop: col.disks.length === 0 ? 0 : 0 }} />
              <div style={{ width: 120, height: 4, background: 'var(--border)', margin: '0 auto' }} />
            </div>
          ))}
        </div>
      </div>

      {/* The recursive insight */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
          The recursive insight — think in 3 steps:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { step: '1', text: 'Move the top n-1 disks from source to helper (using target as intermediate)', color: '#4285f4' },
            { step: '2', text: 'Move the largest disk (disk n) directly from source to target', color: 'var(--green)' },
            { step: '3', text: 'Move the n-1 disks from helper to target (using source as intermediate)', color: '#7b61ff' },
          ].map((item) => (
            <div key={item.step} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 16px', background: 'var(--bg2)', border: `1px solid ${item.color}33`, borderRadius: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: item.color, color: '#000', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.step}</div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75 }}>{item.text}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 16, lineHeight: 1.75, marginBottom: 0 }}>
          Step 1 and Step 3 are the recursive calls — the same problem on n-1 disks.
          Step 2 is the base work. When n = 1 (just one disk), move it directly — that is the base case.
          The magic: you never need to think about which specific disk goes where.
          Just trust the three steps — recursion handles all the details.
        </p>
      </div>

      <CodeBlock code={`#include <stdio.h>

/*
 * hanoi(n, source, target, helper)
 * Move n disks from source rod to target rod, using helper rod
 */
void hanoi(int n, char source, char target, char helper) {
    /* base case: only one disk — move it directly */
    if (n == 1) {
        printf("Move disk 1 from rod %c to rod %c\\n", source, target);
        return;
    }

    /* step 1: move top n-1 disks from source to helper */
    hanoi(n - 1, source, helper, target);

    /* step 2: move the largest disk from source to target */
    printf("Move disk %d from rod %c to rod %c\\n", n, source, target);

    /* step 3: move n-1 disks from helper to target */
    hanoi(n - 1, helper, target, source);
}

int main() {
    printf("Tower of Hanoi with 3 disks:\\n");
    hanoi(3, 'A', 'C', 'B');
    return 0;
}`} />

      <CodeBlock code={`/* Output for n=3 (7 moves — minimum possible):
Move disk 1 from rod A to rod C
Move disk 2 from rod A to rod B
Move disk 1 from rod C to rod B
Move disk 3 from rod A to rod C
Move disk 1 from rod B to rod A
Move disk 2 from rod B to rod C
Move disk 1 from rod A to rod C
*/`} language="output" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>
          Minimum moves needed:
        </div>
        <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
          {[
            { n: 'n=1', moves: '1' },
            { n: 'n=2', moves: '3' },
            { n: 'n=3', moves: '7' },
            { n: 'n=4', moves: '15' },
            { n: 'n=10', moves: '1,023' },
            { n: 'n=64', moves: '1.8 × 10¹⁹' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '10px 16px', borderRight: i < 5 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>{item.n}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 800, color: 'var(--green)' }}>{item.moves}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12, fontFamily: 'var(--font-mono)' }}>
          Formula: 2ⁿ - 1 moves. Time complexity: O(2ⁿ) — exponential and unavoidable for this problem.
        </div>
      </div>

      <Callout type="example">
        <strong>Ancient legend:</strong> There is a temple in Hanoi with 64 golden disks.
        Monks move one disk per second following the rules. When they finish —
        the world ends. At 2⁶⁴ - 1 moves and one per second,
        that is about 585 billion years. The universe is only 14 billion years old.
        This is what exponential complexity looks like in real life.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 10 — COMMON MISTAKES
      ══════════════════════════════════════ */}
      <SectionTag text="Section 10" />
      <SectionTitle>Errors You Will Hit</SectionTitle>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
        {[
          {
            title: 'Missing base case — infinite recursion',
            symptom: 'Program crashes with "Segmentation fault" — stack overflow from infinite calls',
            fix: 'Always write the base case first. Ask: what is the simplest possible input that can be answered directly?',
            bad: `int factorial(int n) {\n    return n * factorial(n - 1);  /* no base case — infinite! */\n}`,
            good: `int factorial(int n) {\n    if (n == 0) return 1;  /* base case first */\n    return n * factorial(n - 1);\n}`,
          },
          {
            title: 'Recursive case does not move toward base case',
            symptom: 'Same infinite crash — each call is no closer to stopping',
            fix: 'The input to the recursive call must be smaller/simpler than the current input. If n goes in, n-1 or n/2 must go into the recursive call.',
            bad: `int badFunc(int n) {\n    if (n == 0) return 0;\n    return n + badFunc(n);  /* same n — never reaches 0 */\n}`,
            good: `int goodFunc(int n) {\n    if (n == 0) return 0;\n    return n + goodFunc(n - 1);  /* n-1 — moves toward 0 */\n}`,
          },
          {
            title: 'Not returning the recursive call result',
            symptom: 'Function returns garbage or 0 even though logic looks correct',
            fix: 'Always return the result of the recursive call. Forgetting return means the answer gets computed but thrown away.',
            bad: `int factorial(int n) {\n    if (n == 0) return 1;\n    n * factorial(n - 1);  /* computed but not returned! */\n}`,
            good: `int factorial(int n) {\n    if (n == 0) return 1;\n    return n * factorial(n - 1);  /* return is essential */\n}`,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ background: 'rgba(255,71,87,0.06)', borderBottom: '1px solid rgba(255,71,87,0.15)', padding: '12px 20px' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#ff4757' }}>⚠ {item.title}</span>
            </div>
            <div style={{ padding: '16px 20px' }}>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}><strong style={{ color: 'var(--text)' }}>Symptom:</strong> {item.symptom}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 14 }}><strong style={{ color: 'var(--green)' }}>Fix:</strong> {item.fix}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <div style={{ fontSize: 11, color: '#ff4757', fontWeight: 700, marginBottom: 6 }}>❌ Wrong</div>
                  <div style={{ background: '#0d0d0d', borderRadius: 6, padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#e0e0e0', lineHeight: 1.75, whiteSpace: 'pre' }}>{item.bad}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--green)', fontWeight: 700, marginBottom: 6 }}>✅ Correct</div>
                  <div style={{ background: '#0d0d0d', borderRadius: 6, padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#e0e0e0', lineHeight: 1.75, whiteSpace: 'pre' }}>{item.good}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          WHAT'S NEXT
      ══════════════════════════════════════ */}
      <SectionTag text="What's Next" />
      <SectionTitle>You Are Ready for Unit 09</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        You now understand recursion completely — the base case, recursive case,
        how the call stack manages each frame, and why some recursive solutions
        are dangerously slow. You traced factorial, Fibonacci, sum of digits,
        power, GCD, and the legendary Tower of Hanoi.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 32 }}>
        In Unit 09 we cover <strong style={{ color: 'var(--text)' }}>Sorting Algorithms</strong> —
        six different ways to arrange data in order, from the simplest to the fastest.
        Bubble sort, selection sort, insertion sort, merge sort, quick sort, counting sort.
        Each explained with step-by-step visuals and full C code.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(0,230,118,0.02) 100%)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 12, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 700, marginBottom: 6 }}>UP NEXT → UNIT 09</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Sorting Algorithms — Six Ways to Sort</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Bubble, selection, insertion, merge, quick, counting — with Big O comparison.</div>
        </div>
        <Link href="/learn/dsa/sorting" style={{ background: 'var(--green)', color: '#000', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '10px 22px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Coming Soon →
        </Link>
      </div>

      <KeyTakeaways items={[
        'Recursion = a function that calls itself on a smaller version of the problem until it hits a base case',
        'Two laws: base case (where it stops) and recursive case (must move closer to base case each call)',
        'The call stack manages recursion automatically — each call gets its own frame, frozen until it returns',
        'Recursion has two phases: going down (building up calls) and coming back up (returning answers)',
        'Factorial: n! = n × (n-1)! — base case n=0 returns 1',
        'Fibonacci naive is O(2ⁿ) because it recomputes the same values — fixed by Dynamic Programming in Unit 16',
        'Fast power uses divide-and-conquer to compute x^n in O(log n) instead of O(n)',
        'GCD(a, b) = GCD(b, a%b) — keep taking remainder until b=0, then a is the answer',
        'Tower of Hanoi: move n-1 to helper, move largest to target, move n-1 to target — O(2ⁿ) moves',
        'Always write base case first. Always return the recursive call result. Always move toward the base case',
      ]} />

    </LearnLayout>
  )
}