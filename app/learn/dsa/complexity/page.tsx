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
    <div style={{
      background: '#0d0d0d',
      border: '1px solid var(--border)',
      borderRadius: 10,
      overflow: 'hidden',
      margin: '20px 0',
    }}>
      <div style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
          </div>
          <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginLeft: 6 }}>
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          style={{
            background: copied ? 'rgba(0,230,118,0.15)' : 'var(--bg2)',
            border: `1px solid ${copied ? 'rgba(0,230,118,0.4)' : 'var(--border)'}`,
            borderRadius: 6, padding: '4px 12px',
            fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 600,
            color: copied ? 'var(--green)' : 'var(--muted)',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre style={{
        margin: 0, padding: '20px 24px', overflowX: 'auto',
        fontFamily: 'var(--font-mono)', fontSize: 13,
        lineHeight: 1.75, color: '#e0e0e0',
      }}>
        <code>{renderCode(code)}</code>
      </pre>
    </div>
  )
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: 'var(--font-mono)', marginBottom: 10,
  }}>// {text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
    letterSpacing: '-1px', color: 'var(--text)',
    fontFamily: 'var(--font-display)', marginBottom: 16,
  }}>{children}</h2>
)

const Divider = () => (
  <div style={{ height: 1, background: 'var(--border)', margin: '48px 0' }} />
)

const BigOCard = ({
  notation, name, color, analogy, example, speed,
}: {
  notation: string; name: string; color: string
  analogy: string; example: string; speed: number
}) => (
  <div style={{
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '20px 22px', overflow: 'hidden',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 900,
        color, background: `${color}15`,
        border: `1px solid ${color}33`,
        borderRadius: 8, padding: '4px 14px',
      }}>{notation}</span>
      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{name}</span>
    </div>
    {/* Speed bar */}
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>
        relative speed
      </div>
      <div style={{ height: 6, background: 'var(--bg2)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${speed}%`,
          background: color, borderRadius: 3,
          transition: 'width 0.4s ease',
        }} />
      </div>
    </div>
    <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75, marginBottom: 10 }}>
      <strong style={{ color: 'var(--text)' }}>Real life: </strong>{analogy}
    </div>
    <div style={{
      fontSize: 12, color, fontFamily: 'var(--font-mono)',
      background: `${color}0d`, border: `1px solid ${color}22`,
      borderRadius: 6, padding: '6px 12px',
    }}>
      {example}
    </div>
  </div>
)

export default function ComplexityPage() {
  return (
    <LearnLayout
      title="Unit 01 — Complexity"
      description="How to measure how fast your code runs and how much memory it uses — the skill that separates good code from great code."
      section="DSA"
      readTime="60 min"
      updatedAt="March 2026"
    >

      {/* ── Badges ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'UNIT 01', green: true },
          { label: 'Prerequisite: Unit 00', green: false },
          { label: '60 min read', green: false },
        ].map((b) => (
          <span key={b.label} style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: b.green ? 700 : 600,
            color: b.green ? 'var(--green)' : 'var(--muted)',
            background: b.green ? 'rgba(0,230,118,0.1)' : 'var(--surface)',
            border: `1px solid ${b.green ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`,
            borderRadius: 6, padding: '4px 10px',
          }}>{b.label}</span>
        ))}
      </div>

      <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Two programs can both solve the same problem and produce the same correct answer —
        yet one can be a million times faster than the other. How do you know which one
        is better? How do you even measure it?
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>
        That is exactly what this unit answers. Complexity is the scoreboard for code.
        It tells you — before you even run the program — how it will behave when the
        data gets big. This is what every interviewer means when they ask
        "what is the time complexity of your solution?"
      </p>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 1 — TIME COMPLEXITY
      ══════════════════════════════════════ */}
      <SectionTag text="Section 1" />
      <SectionTitle>What is Time Complexity?</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Time complexity does <strong>not</strong> measure how many seconds your code takes to run.
        If it did, a slow computer would make every program look bad, and a fast computer
        would make every program look good. That is not useful.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 24 }}>
        Instead, time complexity measures <strong style={{ color: 'var(--green)' }}>how the number of steps
        grows as the input size grows.</strong> It is about the relationship between
        input and effort — not the actual clock time.
      </p>

      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '24px 28px', marginBottom: 24,
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
          A story to make this stick forever
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, marginBottom: 14 }}>
          Imagine a teacher has a stack of exam papers to return. There are 30 students.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            {
              icon: '👩‍🏫',
              label: 'Teacher A',
              desc: 'Calls each student\'s name one by one and hands the paper. 30 students = 30 calls. 100 students = 100 calls. The work grows directly with the number of students.',
              color: '#facc15',
            },
            {
              icon: '📌',
              label: 'Teacher B',
              desc: 'Puts all papers on a notice board sorted alphabetically. Every student walks up and finds their own in seconds. 30 students or 3000 students — it doesn\'t matter. The board is ready instantly.',
              color: 'var(--green)',
            },
          ].map((t) => (
            <div key={t.label} style={{
              display: 'flex', gap: 14,
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '14px 18px',
            }}>
              <span style={{ fontSize: 22 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.color, marginBottom: 5 }}>{t.label}</div>
                <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginTop: 16, marginBottom: 0 }}>
          Teacher A's method grows with input size. Teacher B's method stays constant.
          That difference — that relationship between input and steps — is time complexity.
        </p>
      </div>

      <Callout type="info">
        <strong>Key definition:</strong> Time complexity describes how the number of operations
        in your code scales as the input size (n) increases. We write it using
        Big O notation — which we will cover in Section 3.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 2 — SPACE COMPLEXITY
      ══════════════════════════════════════ */}
      <SectionTag text="Section 2" />
      <SectionTitle>What is Space Complexity?</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        While time complexity is about speed, space complexity is about memory.
        It measures <strong style={{ color: 'var(--green)' }}>how much extra memory your
        program uses as the input size grows.</strong>
      </p>

      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '24px 28px', marginBottom: 24,
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
          The moving house analogy again
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#ff4757', marginBottom: 8 }}>High space usage</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75 }}>
              You make a full photocopy of every document before packing.
              200 documents → 400 pieces of paper. Your memory doubles.
            </div>
          </div>
          <div style={{ background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 8 }}>Low space usage</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75 }}>
              You just write a list of what is in each box. 200 documents →
              one small list. Memory stays minimal regardless of document count.
            </div>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        In code, this means: does your program create extra variables, arrays, or
        data structures that grow with the input? Or does it work with a fixed small
        amount of memory no matter how large the input is?
      </p>

      <Callout type="tip">
        <strong>Time vs Space tradeoff:</strong> In real engineering, you often trade one for the other.
        A faster algorithm sometimes uses more memory. A memory-efficient one is sometimes slower.
        Knowing complexity lets you make that tradeoff consciously instead of accidentally.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 3 — BIG O NOTATION
      ══════════════════════════════════════ */}
      <SectionTag text="Section 3" />
      <SectionTitle>Big O Notation — The Universal Language</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Big O notation is how engineers all over the world describe complexity in a
        standard way. When someone says "this algorithm is O(n²)" — every engineer
        on earth knows exactly what that means.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 28 }}>
        The letter <strong style={{ color: 'var(--green)' }}>n</strong> always represents
        the size of the input. If you have an array of 100 elements, n = 100.
        If you have 1 million users, n = 1,000,000.
        Big O describes what happens to the number of steps as n grows.
      </p>

      {/* Big O cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, marginBottom: 36 }}>
        <BigOCard
          notation="O(1)"
          name="Constant Time"
          color="#00e676"
          speed={95}
          analogy="You know your locker number. You walk straight to it. 100 lockers or 10,000 — same number of steps: one."
          example="Accessing arr[5] in an array"
        />
        <BigOCard
          notation="O(log n)"
          name="Logarithmic Time"
          color="#4285f4"
          speed={80}
          analogy="Finding a word in a dictionary by opening to the middle, then the middle of the half, and so on. Each step cuts the remaining work in half."
          example="Binary search in a sorted array"
        />
        <BigOCard
          notation="O(n)"
          name="Linear Time"
          color="#facc15"
          speed={60}
          analogy="Checking every seat in a cinema to find your friend. 100 seats = 100 checks. 500 seats = 500 checks. Grows directly with input."
          example="Looping through every element once"
        />
        <BigOCard
          notation="O(n log n)"
          name="Linearithmic Time"
          color="#f97316"
          speed={45}
          analogy="Sorting a pack of cards by repeatedly splitting the deck in half and merging — slightly worse than linear but much better than quadratic."
          example="Merge Sort, Quick Sort"
        />
        <BigOCard
          notation="O(n²)"
          name="Quadratic Time"
          color="#ff4757"
          speed={25}
          analogy="Comparing every student in class with every other student. 10 students = 100 comparisons. 100 students = 10,000. Gets slow very fast."
          example="Nested loops — bubble sort"
        />
        <BigOCard
          notation="O(2ⁿ)"
          name="Exponential Time"
          color="#8b5cf6"
          speed={8}
          analogy="Every time you add one more item, the work doubles. With 30 items you already have over a billion operations. Avoid this at all costs."
          example="Naive recursive Fibonacci"
        />
      </div>

      {/* Order of growth visual */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '24px 28px', marginBottom: 28,
      }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // From fastest to slowest — best to worst
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto', paddingBottom: 8 }}>
          {[
            { n: 'O(1)', c: '#00e676' },
            { n: '→', c: 'var(--muted)' },
            { n: 'O(log n)', c: '#4285f4' },
            { n: '→', c: 'var(--muted)' },
            { n: 'O(n)', c: '#facc15' },
            { n: '→', c: 'var(--muted)' },
            { n: 'O(n log n)', c: '#f97316' },
            { n: '→', c: 'var(--muted)' },
            { n: 'O(n²)', c: '#ff4757' },
            { n: '→', c: 'var(--muted)' },
            { n: 'O(2ⁿ)', c: '#8b5cf6' },
          ].map((item, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-mono)', fontSize: 13,
              fontWeight: item.n.startsWith('O') ? 800 : 400,
              color: item.c, padding: '0 8px', whiteSpace: 'nowrap',
            }}>
              {item.n}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, paddingLeft: 8, paddingRight: 8 }}>
          <span style={{ fontSize: 11, color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>← FAST (want this)</span>
          <span style={{ fontSize: 11, color: '#8b5cf6', fontFamily: 'var(--font-mono)' }}>SLOW (avoid this) →</span>
        </div>
      </div>

      <Callout type="info">
        <strong>Big O ignores constants and small terms.</strong> If an algorithm takes 3n + 5 steps,
        Big O calls it O(n) — we drop the 3 and the 5 because for large inputs they don't change
        the overall shape of the growth. We only care about the dominant term.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 4 — BEST / AVERAGE / WORST
      ══════════════════════════════════════ */}
      <SectionTag text="Section 4" />
      <SectionTitle>Best, Average, and Worst Case</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        The same algorithm can behave very differently depending on what data you give it.
        This is why we talk about three cases.
      </p>

      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '24px 28px', marginBottom: 24,
      }}>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 16 }}>
          Suppose you are searching for a person in a list of 1000 names, going one by one:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            {
              label: '🟢 Best Case',
              desc: 'The person you are looking for is the very first name on the list. You find them in 1 step. This is the best possible situation.',
              note: 'O(1) — constant',
              color: '#00e676',
            },
            {
              label: '🟡 Average Case',
              desc: 'The person is somewhere in the middle — around position 500. On average, you do about n/2 checks. Still grows with n.',
              note: 'O(n) — linear',
              color: '#facc15',
            },
            {
              label: '🔴 Worst Case',
              desc: 'The person is the very last name, or not in the list at all. You check all 1000 names before you know. This is the worst possible situation.',
              note: 'O(n) — linear',
              color: '#ff4757',
            },
          ].map((item) => (
            <div key={item.label} style={{
              display: 'flex', gap: 16, alignItems: 'flex-start',
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '14px 18px',
            }}>
              <div style={{ minWidth: 120 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.label}</div>
                <div style={{
                  fontSize: 11, fontFamily: 'var(--font-mono)', color: item.color,
                  background: `${item.color}15`, border: `1px solid ${item.color}30`,
                  borderRadius: 4, padding: '2px 8px', display: 'inline-block',
                }}>{item.note}</div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <Callout type="warning">
        <strong>In interviews and real systems, always think in worst case.</strong> A system that
        works well most of the time but crashes under bad input is not reliable.
        When engineers say "this is O(n)", they almost always mean worst case.
        Building for worst case means your system never surprises you.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 5 — HOW TO ANALYSE CODE
      ══════════════════════════════════════ */}
      <SectionTag text="Section 5" />
      <SectionTitle>How to Analyse Any Code — Step by Step</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 24 }}>
        Now let us actually apply all of this. Here is the method — four simple rules
        you can apply to any piece of code to figure out its Big O complexity.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
        {[
          {
            rule: 'Rule 1',
            title: 'A single statement = O(1)',
            desc: 'Any single operation — assigning a variable, adding two numbers, accessing an array index — takes constant time. It does not matter what n is.',
            color: '#00e676',
          },
          {
            rule: 'Rule 2',
            title: 'A single loop over n items = O(n)',
            desc: 'If you loop through all elements once, the number of steps grows directly with n. Double the input, double the steps.',
            color: '#facc15',
          },
          {
            rule: 'Rule 3',
            title: 'A loop inside a loop = O(n²)',
            desc: 'If the outer loop runs n times and the inner loop also runs n times for each outer iteration, total steps = n × n = n². This gets expensive fast.',
            color: '#ff4757',
          },
          {
            rule: 'Rule 4',
            title: 'Halving the input each step = O(log n)',
            desc: 'If each step cuts the remaining work in half — like binary search — the total steps grow as log₂(n). For n = 1,000,000, log₂(n) is only about 20 steps.',
            color: '#4285f4',
          },
        ].map((item) => (
          <div key={item.rule} style={{
            display: 'flex', gap: 0,
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, overflow: 'hidden',
          }}>
            <div style={{ width: 4, background: item.color, flexShrink: 0 }} />
            <div style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)',
                  color: item.color, background: `${item.color}15`,
                  border: `1px solid ${item.color}30`,
                  borderRadius: 4, padding: '2px 8px',
                }}>{item.rule}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{item.title}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Example 1 — O(1) */}
      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 8 }}>
        Example 1 — O(1) Constant Time
      </h3>
      <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 4 }}>
        No matter what value n has, this function always does exactly the same number of steps.
      </p>

      <CodeBlock code={`int getFirstElement(int arr[], int n) {
    return arr[0];  /* always 1 step — doesn't matter if n is 10 or 10 million */
}`} />

      <div style={{
        display: 'inline-block',
        background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)',
        borderRadius: 8, padding: '8px 18px', marginBottom: 32,
        fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--green)', fontWeight: 700,
      }}>
        Time Complexity: O(1)
      </div>

      {/* Example 2 — O(n) */}
      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 8 }}>
        Example 2 — O(n) Linear Time
      </h3>
      <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 4 }}>
        The loop runs once for every element. More elements = more steps, directly.
      </p>

      <CodeBlock code={`void printAll(int arr[], int n) {
    int i;
    for (i = 0; i < n; i++) {   /* this loop runs n times */
        printf("%d\\n", arr[i]);  /* one step each time */
    }
    /* total steps = n → O(n) */
}`} />

      <div style={{
        display: 'inline-block',
        background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.3)',
        borderRadius: 8, padding: '8px 18px', marginBottom: 32,
        fontFamily: 'var(--font-mono)', fontSize: 13, color: '#facc15', fontWeight: 700,
      }}>
        Time Complexity: O(n)
      </div>

      {/* Example 3 — O(n²) */}
      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 8 }}>
        Example 3 — O(n²) Quadratic Time
      </h3>
      <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 4 }}>
        A loop inside a loop. The inner loop runs n times for every iteration of the outer loop.
        Total steps = n × n.
      </p>

      <CodeBlock code={`void printPairs(int arr[], int n) {
    int i, j;
    for (i = 0; i < n; i++) {        /* outer loop — runs n times */
        for (j = 0; j < n; j++) {    /* inner loop — runs n times for EACH outer step */
            printf("(%d, %d)\\n", arr[i], arr[j]);
        }
    }
    /* total steps = n × n = n² → O(n²) */
}`} />

      <div style={{
        display: 'inline-block',
        background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.3)',
        borderRadius: 8, padding: '8px 18px', marginBottom: 32,
        fontFamily: 'var(--font-mono)', fontSize: 13, color: '#ff4757', fontWeight: 700,
      }}>
        Time Complexity: O(n²)
      </div>

      {/* Example 4 — Mixed */}
      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 8 }}>
        Example 4 — Mixed: What is the complexity here?
      </h3>
      <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 4 }}>
        When you have multiple parts, identify the dominant one.
      </p>

      <CodeBlock code={`void mixedExample(int arr[], int n) {
    int x = arr[0];          /* O(1) — single statement */

    int i;
    for (i = 0; i < n; i++) {     /* O(n) — single loop */
        printf("%d\\n", arr[i]);
    }

    int j, k;
    for (j = 0; j < n; j++) {     /* O(n²) — nested loops */
        for (k = 0; k < n; k++) {
            printf("%d %d\\n", arr[j], arr[k]);
        }
    }
    /* Total = O(1) + O(n) + O(n²) */
    /* We keep only the dominant term → O(n²) */
}`} />

      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 10, padding: '18px 22px', marginBottom: 12,
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>
          How to simplify: drop everything except the largest term
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { expr: 'O(1) + O(n) + O(n²)', result: 'O(n²)', note: 'n² dominates for large n' },
            { expr: 'O(n) + O(n) + O(n)', result: 'O(n)', note: '3n simplifies to n — drop constants' },
            { expr: 'O(n²) + O(n log n)', result: 'O(n²)', note: 'n² grows faster than n log n' },
          ].map((row) => (
            <div key={row.expr} style={{
              display: 'flex', gap: 12, alignItems: 'center',
              flexWrap: 'wrap', fontSize: 13,
            }}>
              <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)', background: 'var(--bg2)', padding: '3px 10px', borderRadius: 5 }}>{row.expr}</code>
              <span style={{ color: 'var(--muted)' }}>→</span>
              <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 700 }}>{row.result}</code>
              <span style={{ color: 'var(--muted)', fontSize: 12 }}>({row.note})</span>
            </div>
          ))}
        </div>
      </div>

      <Callout type="tip">
        <strong>The golden rule:</strong> When you have a mix of complexities, keep only the one
        that grows the fastest as n gets very large. Everything else becomes insignificant
        and gets dropped.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 6 — REAL WORLD TABLE
      ══════════════════════════════════════ */}
      <SectionTag text="Section 6" />
      <SectionTitle>What These Numbers Actually Mean</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Let us make this real. Here is how many operations each complexity class
        produces for different input sizes. Assume your computer does 1 billion
        operations per second.
      </p>

      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['n (input size)', 'O(1)', 'O(log n)', 'O(n)', 'O(n²)', 'O(2ⁿ)'].map((h, i) => (
                <th key={h} style={{
                  textAlign: i === 0 ? 'left' : 'center',
                  padding: '10px 14px',
                  borderBottom: '1px solid var(--border)',
                  color: i === 0 ? 'var(--muted)' : ['var(--muted)', '#00e676', '#4285f4', '#facc15', '#ff4757', '#8b5cf6'][i],
                  fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11,
                  background: 'var(--surface)',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['10', '1', '3', '10', '100', '1,024'],
              ['100', '1', '7', '100', '10,000', '1.3 × 10³⁰'],
              ['1,000', '1', '10', '1,000', '1,000,000', '> universe'],
              ['1,000,000', '1', '20', '1,000,000', '10¹²', '> universe'],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{
                    padding: '10px 14px',
                    borderBottom: '1px solid var(--border)',
                    textAlign: ci === 0 ? 'left' : 'center',
                    color: ci === 0 ? 'var(--text)' :
                      ci === 1 ? '#00e676' :
                      ci === 2 ? '#4285f4' :
                      ci === 3 ? '#facc15' :
                      ci === 4 ? '#ff4757' : '#8b5cf6',
                    fontFamily: ci > 0 ? 'var(--font-mono)' : 'inherit',
                    fontWeight: ci === 0 ? 600 : 400,
                    background: ri % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                  }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="warning">
        <strong>Look at O(2ⁿ) for n = 100.</strong> That is more operations than there are
        atoms in the observable universe. A computer running at 1 billion operations per second
        would not finish before the end of time. This is why exponential algorithms are never
        used in real software — and why understanding complexity is not optional.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          WHAT'S NEXT
      ══════════════════════════════════════ */}
      <SectionTag text="What's Next" />
      <SectionTitle>You Are Ready for Unit 02</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        You now have the single most important mental tool in all of DSA — the ability
        to look at any piece of code and judge whether it is efficient or not.
        Every unit from here uses this language. When we say "arrays give O(1) access"
        or "bubble sort is O(n²)", you now know exactly what that means.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 32 }}>
        In Unit 02 we dive into <strong style={{ color: 'var(--text)' }}>Arrays</strong> —
        the very first and most fundamental data structure. We will build them from scratch
        in C, understand exactly how they sit in memory, and write the core operations:
        insert, delete, search, and traverse.
      </p>

      <div style={{
        background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(0,230,118,0.02) 100%)',
        border: '1px solid rgba(0,230,118,0.25)',
        borderRadius: 12, padding: '24px 28px',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 40,
      }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 700, marginBottom: 6 }}>
            UP NEXT → UNIT 02
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>
            Arrays — The Foundation of Everything
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>
            Memory layout, insert, delete, search, 2D arrays — in C.
          </div>
        </div>
        <Link
          href="/learn/dsa/arrays"
          style={{
            background: 'var(--green)', color: '#000',
            fontWeight: 700, fontSize: 13, borderRadius: 8,
            padding: '10px 22px', textDecoration: 'none', whiteSpace: 'nowrap',
          }}
        >
          Coming Soon →
        </Link>
      </div>

      <KeyTakeaways items={[
        'Time complexity measures how the number of steps grows as input size (n) grows — not actual clock time',
        'Space complexity measures how much extra memory your program uses as n grows',
        'Big O notation is the standard language: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)',
        'O(1) = constant — same steps no matter what. O(n) = linear — steps grow with n. O(n²) = nested loops',
        'Always analyse for worst case — a system that fails under bad input is not reliable',
        'When combining complexities, keep only the dominant term — O(n² + n) simplifies to O(n²)',
        'Exponential O(2ⁿ) algorithms are never used in real systems — they become impossibly slow instantly',
      ]} />

    </LearnLayout>
  )
}