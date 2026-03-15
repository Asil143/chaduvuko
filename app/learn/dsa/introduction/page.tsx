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
            borderRadius: 6,
            padding: '4px 12px',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            color: copied ? 'var(--green)' : 'var(--muted)',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre style={{
        margin: 0,
        padding: '20px 24px',
        overflowX: 'auto',
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        lineHeight: 1.75,
        color: '#e0e0e0',
      }}>
        <code>{renderCode(code)}</code>
      </pre>
    </div>
  )
}

const MemoryBox = ({ address, value, label }: { address: string; value: string; label?: string }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{
      width: 64, height: 64,
      border: '2px solid var(--green)',
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      fontWeight: 800,
      color: 'var(--green)',
      fontFamily: 'var(--font-mono)',
      background: 'rgba(0,230,118,0.06)',
      margin: '0 auto',
    }}>
      {value}
    </div>
    <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>{address}</div>
    {label && <div style={{ fontSize: 11, color: 'var(--text)', marginTop: 3 }}>{label}</div>}
  </div>
)

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: 'var(--font-mono)', marginBottom: 10,
  }}>
    // {text}
  </div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
    letterSpacing: '-1px', color: 'var(--text)',
    fontFamily: 'var(--font-display)', marginBottom: 16,
  }}>
    {children}
  </h2>
)

const Divider = () => (
  <div style={{ height: 1, background: 'var(--border)', margin: '48px 0' }} />
)

export default function DSAIntroductionPage() {
  return (
    <LearnLayout
      title="Unit 00 — Before We Write Code"
      description="What DSA is, why it matters, how computers store data, and your first C program."
      section="DSA"
      readTime="45 min"
      updatedAt="March 2026"
    >

      {/* ── Unit badges ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'UNIT 00', green: true },
          { label: 'No prerequisites', green: false },
          { label: '45 min read', green: false },
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
        Before we write a single line of code, we need to answer four honest questions.
        What is DSA? Why do companies test it? How does a computer actually store your data?
        And why are we using C instead of Python or JavaScript?
      </p>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85 }}>
        This unit is for everyone — especially those who have never written code before,
        or who come from a non-IT background. If you already know some programming, you will
        still find the memory and computer internals section useful. Read it anyway.
      </p>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 1 — WHAT IS DSA
      ══════════════════════════════════════ */}
      <SectionTag text="Section 1" />
      <SectionTitle>What is Data Structures & Algorithms?</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Let's start with the two words separately — because most explanations combine them
        too early and create confusion.
      </p>

      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '24px 28px', marginBottom: 20,
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--green)', fontFamily: 'var(--font-display)', marginBottom: 12 }}>
          📦 Data Structure = How you organise your data
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 12 }}>
          Imagine you are moving to a new house. You have 200 items — clothes, books, utensils,
          documents. Now you have two choices:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div style={{ background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#ff4757', marginBottom: 6 }}>❌ Bad approach</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
              Throw everything into one giant room randomly. When you need your passport,
              you dig through 200 items. Every time.
            </div>
          </div>
          <div style={{ background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 6 }}>✅ Good approach</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
              Label boxes. Documents in one box, clothes by type in another, kitchen items together.
              Finding your passport takes 5 seconds.
            </div>
          </div>
        </div>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, margin: 0 }}>
          A <strong style={{ color: 'var(--text)' }}>data structure</strong> is that labelled box system —
          but for data inside a computer. It is a way of organising information so you can
          find it, change it, and use it efficiently.
        </p>
      </div>

      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '24px 28px', marginBottom: 28,
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#7b61ff', fontFamily: 'var(--font-display)', marginBottom: 12 }}>
          📋 Algorithm = Step-by-step instructions to solve a problem
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 12 }}>
          You already use algorithms every day without knowing it. When you make tea:
        </p>
        <div style={{
          background: 'var(--bg2)', borderRadius: 8, padding: '16px 20px',
          fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted)',
          lineHeight: 2, marginBottom: 12, border: '1px solid var(--border)',
        }}>
          Step 1: Boil water<br />
          Step 2: Add tea leaves<br />
          Step 3: Wait 3 minutes<br />
          Step 4: Add milk and sugar<br />
          Step 5: Pour and serve
        </div>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, margin: 0 }}>
          That is an algorithm. A fixed set of steps that, if followed correctly, always
          produces the right result. In programming, an algorithm is the same thing —
          a clear sequence of steps to solve a specific problem, written in code.
        </p>
      </div>

      <Callout type="info">
        <strong>Put together:</strong> Data Structures decide <em>how</em> your data is stored.
        Algorithms decide <em>how</em> you work on that data. They always go together —
        the right data structure makes an algorithm fast; the wrong one makes it impossibly slow.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 2 — WHY COMPANIES TEST DSA
      ══════════════════════════════════════ */}
      <SectionTag text="Section 2" />
      <SectionTitle>Why Does Every Tech Company Test DSA?</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        If you have ever looked at a software job description, you have seen this:
        "Data Structures and Algorithms round." You may have wondered — why? I just want
        to build websites. Why do I need to know how to reverse a linked list?
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 24 }}>
        Here is the honest answer.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
        {[
          {
            number: '01',
            title: 'They cannot test your real work in 45 minutes',
            body: 'In a real job, you build things over days and weeks with teammates, documentation, and Google. Companies cannot replicate that in an interview. So they use DSA as a proxy — a controlled test of how your brain approaches problems.',
          },
          {
            number: '02',
            title: 'Efficiency matters at scale',
            body: 'When Swiggy processes 10 million orders a day, a slow algorithm is not just inconvenient — it causes system crashes and financial loss. Engineers who understand complexity know how to write code that holds up under real load.',
          },
          {
            number: '03',
            title: 'It separates problem-solvers from copy-pasters',
            body: 'Anyone can copy code from Stack Overflow. DSA tests whether you understand what the code is doing and why. That understanding is what makes someone a real engineer.',
          },
          {
            number: '04',
            title: 'It is a universal language',
            body: 'Python, Java, JavaScript, C++ — languages come and go. But a binary search tree works the same way in all of them. DSA knowledge transfers across every language, framework, and company you will ever work at.',
          },
        ].map((item) => (
          <div key={item.number} style={{
            display: 'flex', gap: 18, alignItems: 'flex-start',
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '18px 20px',
          }}>
            <div style={{
              fontSize: 11, fontWeight: 800, color: 'var(--green)',
              fontFamily: 'var(--font-mono)', minWidth: 28, marginTop: 2,
            }}>
              {item.number}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>{item.body}</div>
            </div>
          </div>
        ))}
      </div>

      <Callout type="tip">
        <strong>Real talk:</strong> Even if you never work at Google or Flipkart, DSA makes you a
        better programmer. You will write faster code, catch bugs earlier, and understand
        why systems behave the way they do. It is worth learning regardless of your goal.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 3 — HOW COMPUTERS STORE DATA
      ══════════════════════════════════════ */}
      <SectionTag text="Section 3" />
      <SectionTitle>How Your Computer Actually Stores Data</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        This section is something most tutorials completely skip. They just say "create a variable"
        and move on. We are not going to do that — because if you do not understand what
        happens in memory, a huge part of DSA will always feel like magic tricks instead of logic.
      </p>

      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 14, marginTop: 28 }}>
        Think of RAM as a street full of houses
      </h3>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Your computer's RAM (Random Access Memory) is where all active data lives while a
        program is running. Think of it as a very long street with millions of tiny houses.
        Each house has a unique address and can hold exactly one small piece of information.
      </p>

      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '28px 24px', marginBottom: 24, overflowX: 'auto',
      }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 20, fontFamily: 'var(--font-mono)' }}>
          // RAM — a row of memory cells, each with an address
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', minWidth: 480, justifyContent: 'center' }}>
          <MemoryBox address="0x1000" value="42" label="age" />
          <MemoryBox address="0x1001" value="?" label="(empty)" />
          <MemoryBox address="0x1002" value="7" label="score" />
          <MemoryBox address="0x1003" value="?" label="(empty)" />
          <MemoryBox address="0x1004" value="A" label="grade" />
        </div>
        <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginTop: 20, fontFamily: 'var(--font-mono)', lineHeight: 1.6 }}>
          Each box = one memory cell. Each address = its location. Data sits inside.
        </p>
      </div>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        When you write <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>int age = 25</code> in a program,
        your computer does three things:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
        {[
          { step: '1', text: 'Finds a free memory cell somewhere in RAM' },
          { step: '2', text: 'Puts the value 25 into that cell' },
          { step: '3', text: 'Remembers the address of that cell under the name "age"' },
        ].map((item) => (
          <div key={item.step} style={{
            display: 'flex', gap: 14, alignItems: 'center',
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '12px 16px',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'var(--green)', color: '#000',
              fontSize: 12, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>{item.step}</div>
            <div style={{ fontSize: 14, color: 'var(--text)' }}>{item.text}</div>
          </div>
        ))}
      </div>

      <Callout type="example">
        <strong>Analogy:</strong> Your name is "Rahul." That is your label. Your Aadhaar number
        is your actual address in the government system. The government does not think of you
        as "Rahul" — it thinks of you as a 12-digit number. Variables work the same way.
        The name is for you. The address is for the computer.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 4 — WHY C
      ══════════════════════════════════════ */}
      <SectionTag text="Section 4" />
      <SectionTitle>Why Are We Using C?</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        You might be wondering — everyone online uses Python or Java for DSA. Why are we
        doing this in C? Good question. Here is the full honest answer.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginBottom: 28 }}>
        {[
          {
            icon: '🔍',
            title: 'C hides nothing',
            body: 'In Python, you write mylist.append(5) and data magically goes in. In C, you manage the memory yourself. You see exactly what is happening — which means you truly understand it.',
          },
          {
            icon: '🧠',
            title: 'Forces real understanding',
            body: 'Pointers, memory allocation, struct — C forces you to think about how a linked list actually works in RAM. Python hides all this. C reveals it. Once you understand it here, Python becomes trivial.',
          },
          {
            icon: '🏎️',
            title: 'Closest to how machines work',
            body: 'C is one step above assembly language. Understanding C means understanding computers. Every language you ever learn after C will make more sense because of this foundation.',
          },
          {
            icon: '🎓',
            title: 'University standard',
            body: 'Almost every CS curriculum worldwide teaches DSA in C or C++. Textbooks, university notes, competitive programming — C is the default. Learning it here means nothing will ever be unfamiliar.',
          },
        ].map((item) => (
          <div key={item.title} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '18px 20px',
          }}>
            <div style={{ fontSize: 22, marginBottom: 10 }}>{item.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>{item.body}</div>
          </div>
        ))}
      </div>

      <Callout type="tip">
        <strong>You do not need to know C before starting.</strong> We teach you exactly the C you need,
        right before you need it. You will not be reading a C textbook. You will be learning
        just enough C to implement each data structure — nothing more.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 5 — FIRST C PROGRAM
      ══════════════════════════════════════ */}
      <SectionTag text="Section 5" />
      <SectionTitle>Your First C Program — Line by Line</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 24 }}>
        Let us write actual code. This is the most classic program in all of programming —
        printing "Hello, World!" on the screen. We are going to explain every single line
        so nothing is a mystery.
      </p>

      <CodeBlock code={`#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
        {[
          {
            line: '#include <stdio.h>',
            title: 'Import the tools you need',
            explanation: 'Think of this as saying "I need the printing tools." stdio.h is a file that contains the definition of printf. Without this line, C would not know what printf means. The # means it is a preprocessor command — it runs before your actual code compiles.',
          },
          {
            line: 'int main() {',
            title: 'The entry point of your program',
            explanation: 'Every C program must have a main function. When you run a C program, the computer looks for main and starts executing from there. The int before it means this function will return a whole number when it finishes. The { means start of the block.',
          },
          {
            line: '    printf("Hello, World!\\n");',
            title: 'Print something to the screen',
            explanation: 'printf stands for "print formatted." It takes whatever is inside the quotes and shows it on screen. The \\n is a newline character — it moves the cursor to the next line. The semicolon ; at the end is mandatory in C — it marks the end of a statement.',
          },
          {
            line: '    return 0;',
            title: 'Tell the system everything went fine',
            explanation: 'The main function promised to return an int. Returning 0 is a convention meaning "program ended successfully." If something went wrong, you would return 1 or another non-zero number.',
          },
          {
            line: '}',
            title: 'End of the main function',
            explanation: 'Every opening curly brace { must have a matching closing brace }. This one closes the main function block.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, overflow: 'hidden',
          }}>
            <div style={{
              background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
              padding: '10px 18px', fontFamily: 'var(--font-mono)',
              fontSize: 13, color: 'var(--green)',
            }}>
              {item.line}
            </div>
            <div style={{ padding: '14px 18px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>{item.explanation}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 14, marginTop: 32 }}>
        Now let us work with variables
      </h3>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        A variable is a named box in memory that holds a value. In C, you must always
        say what type of value the box will hold. This is called a <strong>data type</strong>.
      </p>

      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 10, padding: '20px 24px', marginBottom: 24, overflowX: 'auto',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Type', 'What it stores', 'Example', 'Memory size'].map(h => (
                <th key={h} style={{
                  textAlign: 'left', padding: '8px 14px',
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--muted)', fontFamily: 'var(--font-mono)',
                  fontWeight: 600, fontSize: 11,
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['int', 'Whole numbers', '5, -3, 1000', '4 bytes'],
              ['float', 'Decimal numbers', '3.14, -0.5', '4 bytes'],
              ['char', 'A single character', "\'A\', \'z\', \'9\'", '1 byte'],
              ['double', 'High-precision decimal', '3.14159265', '8 bytes'],
            ].map(([type, what, ex, mem]) => (
              <tr key={type}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{type}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)' }}>{what}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{ex}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>{mem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CodeBlock code={`#include <stdio.h>

int main() {
    int age = 20;           /* whole number */
    float height = 5.9;     /* decimal number */
    char grade = 'A';       /* single character — use single quotes */

    printf("Age: %d\\n", age);       /* %d for integers */
    printf("Height: %f\\n", height); /* %f for floats */
    printf("Grade: %c\\n", grade);   /* %c for characters */

    return 0;
}`} />

      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 28 }}>
        The <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>%d</code>,{' '}
        <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>%f</code>, and{' '}
        <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>%c</code> are
        format specifiers — placeholders that tell printf what type of value to print.
        The actual variable comes after the comma.
      </p>

      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 14, marginTop: 32 }}>
        Taking input from the user
      </h3>

      <CodeBlock code={`#include <stdio.h>

int main() {
    int number;

    printf("Enter a number: ");
    scanf("%d", &number);   /* read an integer from the user */

    printf("You entered: %d\\n", number);

    return 0;
}`} />

      <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Notice the <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>&number</code> — 
        that ampersand (&) means "the memory address of number."
        scanf needs to know <em>where</em> to store the value you type, so you give it the address.
      </p>

      <Callout type="azure">
        <strong>Preview of Unit 04:</strong> That <code style={{ fontFamily: 'var(--font-mono)' }}>&</code> symbol
        you just saw is the beginning of pointers. You gave scanf the address of a variable so it
        could write directly into memory. That exact idea — working with addresses — is how linked lists,
        trees, and graphs are built. You have already touched the most important concept in C.
      </Callout>

      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 14, marginTop: 32 }}>
        Decisions and loops — the last basics you need
      </h3>

      <CodeBlock code={`#include <stdio.h>

int main() {
    int marks;

    printf("Enter your marks: ");
    scanf("%d", &marks);

    /* Decision — if/else */
    if (marks >= 60) {
        printf("Result: Pass\\n");
    } else {
        printf("Result: Fail\\n");
    }

    /* Repetition — for loop: print 1 to 5 */
    int i;
    for (i = 1; i <= 5; i++) {  /* i++ means add 1 to i each time */
        printf("%d ", i);
    }
    printf("\\n");

    return 0;
}`} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28, paddingLeft: 4 }}>
        {[
          { part: 'i = 1', meaning: 'Start — i begins at 1' },
          { part: 'i <= 5', meaning: 'Condition — keep going while i is 5 or less' },
          { part: 'i++', meaning: 'Update — add 1 to i after each loop (i++ is shorthand for i = i + 1)' },
        ].map(item => (
          <div key={item.part} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 13, minWidth: 60, marginTop: 1 }}>{item.part}</code>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>→ {item.meaning}</div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          WHAT'S NEXT
      ══════════════════════════════════════ */}
      <SectionTag text="What's Next" />
      <SectionTitle>You Are Ready for Unit 01</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        You now know what DSA is, why it matters, how memory works, why we use C,
        and the basics of writing C programs. That is the complete foundation.
      </p>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 32 }}>
        In Unit 01, we tackle <strong style={{ color: 'var(--text)' }}>Complexity</strong> —
        how to measure the speed and memory usage of any piece of code. This is the skill
        that separates engineers who write code from engineers who write <em>good</em> code.
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
            UP NEXT → UNIT 01
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>
            Complexity — The Scoreboard for Code
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>
            Big O, time complexity, space complexity — in plain English.
          </div>
        </div>
        <Link
          href="/learn/dsa/complexity"
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
        'DSA = Data Structures (how data is organised) + Algorithms (step-by-step instructions to solve problems)',
        'Companies test DSA because it reveals how you think — not just what frameworks you know',
        'Every variable lives at a specific address in RAM. The variable name is just a human label',
        'We use C because it hides nothing — you see exactly what happens in memory',
        '#include <stdio.h> imports print tools. int main() is the entry point. printf prints. return 0 means success',
        'int, float, char, double are the four basic data types. Use %d, %f, %c to print them',
        'The & in scanf gives the memory address of a variable — your first glimpse of pointers',
      ]} />

    </LearnLayout>
  )
}