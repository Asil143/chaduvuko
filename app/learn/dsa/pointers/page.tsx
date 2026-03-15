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

const MemoryRow = ({ cells }: { cells: { label: string; value: string; address: string; highlight?: boolean; arrow?: boolean }[] }) => (
  <div style={{ display: 'flex', gap: 0, overflowX: 'auto', minWidth: 400 }}>
    {cells.map((cell, i) => (
      <div key={i} style={{ flex: 1, textAlign: 'center', borderRight: i < cells.length - 1 ? '1px solid var(--border)' : 'none' }}>
        <div style={{ padding: '14px 8px', background: cell.highlight ? 'rgba(123,97,255,0.1)' : 'rgba(0,230,118,0.04)', border: `1px solid ${cell.highlight ? 'rgba(123,97,255,0.4)' : 'rgba(0,230,118,0.15)'}`, borderRight: 'none', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 800, color: cell.highlight ? '#7b61ff' : 'var(--green)', minWidth: 60 }}>
          {cell.value}
        </div>
        <div style={{ fontSize: 10, color: '#4285f4', marginTop: 6, fontFamily: 'var(--font-mono)' }}>{cell.address}</div>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{cell.label}</div>
      </div>
    ))}
  </div>
)

export default function PointersPage() {
  return (
    <LearnLayout
      title="Unit 04 — Pointers"
      description="The concept that confuses 90% of beginners — explained so clearly you will wonder why everyone makes it complicated. Pointers are the backbone of linked lists, trees, and every advanced data structure."
      section="DSA"
      readTime="75 min"
      updatedAt="March 2026"
    >

      {/* ── Badges ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'UNIT 04', green: true },
          { label: 'Prerequisite: Units 00–03', green: false },
          { label: '75 min read', green: false },
        ].map((b) => (
          <span key={b.label} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: b.green ? 700 : 600, color: b.green ? 'var(--green)' : 'var(--muted)', background: b.green ? 'rgba(0,230,118,0.1)' : 'var(--surface)', border: `1px solid ${b.green ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`, borderRadius: 6, padding: '4px 10px' }}>
            {b.label}
          </span>
        ))}
      </div>

      <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Pointers are the single most important concept in C — and the single most
        misunderstood. Most tutorials throw symbols at you and hope something sticks.
        We are going to do the opposite: build the idea from the ground up, one
        layer at a time, until it feels completely obvious.
      </p>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85 }}>
        After this unit, linked lists, trees, graphs, and dynamic memory will all make sense.
        Every advanced data structure in DSA uses pointers internally.
        This unit is the key that unlocks the rest.
      </p>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 1 — MEMORY ADDRESSES
      ══════════════════════════════════════ */}
      <SectionTag text="Section 1" />
      <SectionTitle>Every Variable Has a Home Address</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Go back to what we learned in Unit 00. RAM is like a long street of tiny houses.
        Each house has a unique address. When you create a variable, the computer
        picks an empty house, stores your value there, and gives that house number
        a name — the variable name.
      </p>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
          🏠 The house and address analogy
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>Real world</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>
              A house at <strong style={{ color: 'var(--green)' }}>12 MG Road</strong> contains a family.<br />
              The <strong>address</strong> tells you where to find them.<br />
              The <strong>contents</strong> are who lives there.
            </div>
          </div>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>In C</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>
              A variable <strong style={{ color: 'var(--green)' }}>age</strong> at address <strong style={{ color: '#4285f4' }}>0x1004</strong> contains 25.<br />
              The <strong>address</strong> tells you where to find it.<br />
              The <strong>value</strong> is what is stored there.
            </div>
          </div>
        </div>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, margin: 0 }}>
          The variable name <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>age</code> is just
          a convenient label for humans. Internally, the computer only works with
          the address <code style={{ fontFamily: 'var(--font-mono)', color: '#4285f4' }}>0x1004</code>.
          The name exists only in your source code — it disappears when the program compiles.
        </p>
      </div>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Here is how you see a variable's address in C using the
        <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}> &</code> operator:
      </p>

      <CodeBlock code={`#include <stdio.h>

int main() {
    int age = 25;
    float salary = 50000.0;
    char grade = 'A';

    printf("Value of age:    %d\\n", age);
    printf("Address of age:  %p\\n", &age);     /* %p prints an address */

    printf("Value of salary: %f\\n", salary);
    printf("Address of salary: %p\\n", &salary);

    printf("Value of grade:  %c\\n", grade);
    printf("Address of grade: %p\\n", &grade);

    return 0;
}`} />

      <CodeBlock code={`/* Sample output (addresses will differ on your machine):
Value of age:      25
Address of age:    0x7fff5fbff5ac
Value of salary:   50000.000000
Address of salary: 0x7fff5fbff5a8
Value of grade:    A
Address of grade:  0x7fff5fbff5a7
*/`} language="output" />

      <Callout type="info">
        <strong>The & operator means "give me the address of".</strong> You already used this
        in Unit 00 with scanf — <code style={{ fontFamily: 'var(--font-mono)' }}>scanf("%d", &age)</code> means
        "read a number and store it at the address of age." Now you know exactly why.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 2 — WHAT IS A POINTER
      ══════════════════════════════════════ */}
      <SectionTag text="Section 2" />
      <SectionTitle>What is a Pointer?</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        A pointer is a variable that stores a memory address instead of a regular value.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 24 }}>
        A normal variable stores something like 25, 3.14, or 'A'.
        A pointer variable stores something like <code style={{ fontFamily: 'var(--font-mono)', color: '#4285f4', fontSize: 14 }}>0x1004</code> —
        the address of where some other variable lives.
        Think of a pointer as a piece of paper with someone's home address written on it.
        The paper is not the house. It just tells you where the house is.
      </p>

      {/* Visual: normal variable vs pointer */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 20, fontFamily: 'var(--font-mono)' }}>
          // int age = 25 and int* p = &age — what lives in memory
        </div>
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* age box */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>normal variable</div>
            <div style={{ width: 80, height: 70, border: '2px solid var(--green)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: 'var(--green)', fontFamily: 'var(--font-mono)', background: 'rgba(0,230,118,0.06)', margin: '0 auto' }}>25</div>
            <div style={{ fontSize: 10, color: '#4285f4', marginTop: 6, fontFamily: 'var(--font-mono)' }}>0x1004</div>
            <div style={{ fontSize: 12, color: 'var(--text)', marginTop: 3 }}>age</div>
          </div>

          {/* arrow */}
          <div style={{ display: 'flex', alignItems: 'center', paddingTop: 30 }}>
            <div style={{ fontSize: 24, color: 'var(--muted)' }}>←</div>
          </div>

          {/* pointer box */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>pointer variable</div>
            <div style={{ width: 100, height: 70, border: '2px solid #7b61ff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#7b61ff', fontFamily: 'var(--font-mono)', background: 'rgba(123,97,255,0.06)', margin: '0 auto' }}>0x1004</div>
            <div style={{ fontSize: 10, color: '#4285f4', marginTop: 6, fontFamily: 'var(--font-mono)' }}>0x2008</div>
            <div style={{ fontSize: 12, color: 'var(--text)', marginTop: 3 }}>p (pointer to age)</div>
          </div>
        </div>
        <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 20, fontFamily: 'var(--font-mono)', lineHeight: 1.6 }}>
          p stores the address of age (0x1004). p itself also lives somewhere in memory (0x2008).
          Following p leads you to age.
        </p>
      </div>

      <Callout type="tip">
        <strong>One sentence definition:</strong> A pointer is a variable whose value is the address
        of another variable. That is all it is. Everything else — linked lists, trees,
        dynamic memory — is just a consequence of this one simple idea.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 3 — & AND * OPERATORS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 3" />
      <SectionTitle>The Two Operators — & and *</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Pointers use two operators. These two symbols are what confuse most people —
        because they look the same as other uses of & and * in C but mean completely
        different things depending on context. Let us nail this once and for all.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
        <div style={{ background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 12, padding: '20px 22px' }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--green)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>&</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Address-of operator</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 12 }}>
            Put it before a variable name to get its memory address.
            Think: "where does this variable live?"
          </div>
          <div style={{ background: '#0d0d0d', borderRadius: 6, padding: '8px 14px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--green)' }}>
            &age → 0x1004
          </div>
        </div>
        <div style={{ background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.25)', borderRadius: 12, padding: '20px 22px' }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#7b61ff', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>*</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Dereference operator</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 12 }}>
            Put it before a pointer to get the value stored at that address.
            Think: "go to that address and bring back what is there."
          </div>
          <div style={{ background: '#0d0d0d', borderRadius: 6, padding: '8px 14px', fontFamily: 'var(--font-mono)', fontSize: 13, color: '#7b61ff' }}>
            *p → 25 (the value at the address p holds)
          </div>
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

int main() {
    int age = 25;
    int *p;          /* declare a pointer to int — the * here means "pointer to" */

    p = &age;        /* store the address of age inside p */

    printf("age = %d\\n", age);      /* 25 — direct access */
    printf("&age = %p\\n", &age);    /* address of age */
    printf("p = %p\\n", p);          /* p holds the same address */
    printf("*p = %d\\n", *p);        /* dereference p — go to that address, get the value */

    /* you can also CHANGE age through the pointer */
    *p = 30;                         /* go to address p, write 30 there */
    printf("age is now: %d\\n", age); /* age is now: 30 */

    return 0;
}`} />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>
          Breaking down every line
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { code: 'int age = 25', meaning: 'Create a variable called age, store 25 in it. It gets some address, say 0x1004.' },
            { code: 'int *p', meaning: 'Declare a pointer variable p that will hold the address of an int. The * here means "this is a pointer type".' },
            { code: 'p = &age', meaning: '& gives us the address of age (0x1004). We store that address inside p.' },
            { code: '*p', meaning: '* here means "dereference" — go to the address stored in p (0x1004) and read the value there (25).' },
            { code: '*p = 30', meaning: 'Go to the address stored in p and write 30 there. Since p points to age, age becomes 30.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 12, minWidth: 120, flexShrink: 0, marginTop: 2 }}>{item.code}</code>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.meaning}</div>
            </div>
          ))}
        </div>
      </div>

      <Callout type="warning">
        <strong>The * symbol has two different meanings in C — do not confuse them:</strong><br />
        In a <strong>declaration</strong> like <code style={{ fontFamily: 'var(--font-mono)' }}>int *p</code> — the * means "p is a pointer to int".<br />
        In an <strong>expression</strong> like <code style={{ fontFamily: 'var(--font-mono)' }}>*p = 30</code> — the * means "go to the address p holds".<br />
        Same symbol. Different context. Different meaning. This is the #1 source of pointer confusion.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 4 — POINTER TYPES
      ══════════════════════════════════════ */}
      <SectionTag text="Section 4" />
      <SectionTitle>Pointer Types — Why They Matter</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Every pointer has a type — <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>int*</code>,
        <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}> float*</code>,
        <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}> char*</code>.
        The type tells the compiler <strong>how many bytes to read</strong> when you dereference.
        An int* reads 4 bytes. A char* reads 1 byte. If you use the wrong pointer type,
        you read the wrong amount of memory and get garbage data.
      </p>

      <CodeBlock code={`#include <stdio.h>

int main() {
    int   num    = 100;
    float price  = 9.99;
    char  letter = 'Z';

    int   *ip = &num;      /* int pointer — points to an int */
    float *fp = &price;    /* float pointer — points to a float */
    char  *cp = &letter;   /* char pointer — points to a char */

    printf("num    via pointer: %d\\n",  *ip);  /* 100 */
    printf("price  via pointer: %f\\n",  *fp);  /* 9.990000 */
    printf("letter via pointer: %c\\n",  *cp);  /* Z */

    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 5 — POINTER ARITHMETIC
      ══════════════════════════════════════ */}
      <SectionTag text="Section 5" />
      <SectionTitle>Pointer Arithmetic — Moving Through Memory</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        You can add and subtract integers from pointers — but the result is not what
        you might expect. When you do <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>p + 1</code>,
        the pointer does not move by 1 byte. It moves by
        <strong style={{ color: 'var(--green)' }}> 1 × sizeof(type)</strong> bytes.
        An int pointer moves 4 bytes forward. A char pointer moves 1 byte forward.
        This is deliberate — it lets you step through arrays cleanly.
      </p>

      {/* Arithmetic visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // int arr[4] — p starts at arr[0], p+1 jumps 4 bytes to arr[1]
        </div>
        <MemoryRow cells={[
          { label: 'arr[0]', value: '10', address: '0x1000', highlight: false },
          { label: 'arr[1]', value: '20', address: '0x1004', highlight: true },
          { label: 'arr[2]', value: '30', address: '0x1008', highlight: false },
          { label: 'arr[3]', value: '40', address: '0x100C', highlight: false },
        ]} />
        <div style={{ marginTop: 14, display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
          <span>p = &arr[0] → 0x1000</span>
          <span style={{ color: '#7b61ff' }}>p+1 → 0x1004 (jumped 4 bytes)</span>
          <span>p+2 → 0x1008</span>
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

int main() {
    int arr[4] = {10, 20, 30, 40};
    int *p = arr;  /* p points to arr[0] — array name IS the address of first element */
    int i;

    printf("Using pointer arithmetic to walk the array:\\n");
    for (i = 0; i < 4; i++) {
        printf("p+%d = address %p, value = %d\\n", i, p+i, *(p+i));
    }

    /* arr[i] and *(p+i) are identical — two ways to say the same thing */
    printf("\\narr[2]   = %d\\n", arr[2]);    /* 30 */
    printf("*(p + 2) = %d\\n", *(p + 2));    /* 30 — same thing */

    return 0;
}`} />

      <Callout type="info">
        <strong>Array indexing and pointer arithmetic are the same thing.</strong>
        When you write <code style={{ fontFamily: 'var(--font-mono)' }}>arr[2]</code>, C internally translates it
        to <code style={{ fontFamily: 'var(--font-mono)' }}>*(arr + 2)</code>. The array name is a pointer to
        the first element. Square bracket notation is just cleaner syntax for pointer arithmetic.
        This is why arrays and pointers are so deeply connected in C.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 6 — POINTERS AND FUNCTIONS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 6" />
      <SectionTitle>Pointers and Functions — Pass by Reference</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        This is where pointers become genuinely powerful and practically useful.
        In C, when you pass a variable to a function normally, the function gets
        a copy — it cannot change the original. This is called
        <strong> pass by value</strong>.
        When you pass the address of a variable, the function can reach back and
        change the original directly. This is called
        <strong style={{ color: 'var(--green)' }}> pass by reference</strong>.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div style={{ background: 'rgba(255,71,87,0.06)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 10, padding: '18px 20px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#ff4757', marginBottom: 10 }}>❌ Pass by value — original unchanged</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>
            The function gets a photocopy. It scribbles all over the photocopy.
            Your original document stays untouched.
          </div>
        </div>
        <div style={{ background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 10, padding: '18px 20px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 10 }}>✅ Pass by reference — original changed</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>
            The function gets your home address. It walks to your house and changes
            things directly. The original is modified.
          </div>
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

/* WRONG: pass by value — cannot change the original */
void tryDouble_wrong(int n) {
    n = n * 2;  /* only changes the local copy — original untouched */
}

/* CORRECT: pass by reference — can change the original */
void tryDouble_correct(int *n) {
    *n = *n * 2;  /* dereference n to reach the original variable */
}

int main() {
    int x = 10;

    tryDouble_wrong(x);
    printf("After wrong:   x = %d\\n", x);   /* x = 10 — unchanged */

    tryDouble_correct(&x);                   /* pass the ADDRESS of x */
    printf("After correct: x = %d\\n", x);   /* x = 20 — changed! */

    return 0;
}`} />

      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 12, marginTop: 32 }}>
        Classic example — swap two numbers
      </h3>
      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 8 }}>
        The swap function is the most famous pass-by-reference example. It cannot work
        without pointers in C. This exact function is used inside sorting algorithms.
      </p>

      <CodeBlock code={`#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;  /* save value at address a */
    *a = *b;        /* write value at b into address a */
    *b = temp;      /* write saved value into address b */
}

int main() {
    int x = 100, y = 200;

    printf("Before: x = %d, y = %d\\n", x, y);  /* x=100, y=200 */
    swap(&x, &y);
    printf("After:  x = %d, y = %d\\n", x, y);  /* x=200, y=100 */

    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 7 — POINTERS AND ARRAYS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 7" />
      <SectionTitle>Pointers and Arrays — The Deep Connection</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        When you pass an array to a function in C, you are actually passing a pointer
        to its first element. The entire array is not copied — only the address is passed.
        This means functions can modify arrays directly, and it is also why arrays are fast
        to pass around even when they are huge.
      </p>

      <CodeBlock code={`#include <stdio.h>

/* when you write int arr[], C treats it as int *arr internally */
void doubleAll(int *arr, int n) {
    int i;
    for (i = 0; i < n; i++) {
        arr[i] = arr[i] * 2;  /* modifies the ORIGINAL array */
    }
}

int main() {
    int numbers[5] = {1, 2, 3, 4, 5};
    int i;

    doubleAll(numbers, 5);  /* pass array name = pass address of first element */

    for (i = 0; i < 5; i++) {
        printf("%d ", numbers[i]);
    }
    /* Output: 2 4 6 8 10 — original array was modified */

    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 8 — NULL POINTER
      ══════════════════════════════════════ */}
      <SectionTag text="Section 8" />
      <SectionTitle>The NULL Pointer — A Pointer That Points to Nothing</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>NULL</code> is
        a special value you can assign to a pointer to say "this pointer currently
        points to nothing." It is the number 0. In linked lists and trees,
        NULL is how you mark the end of a chain — "there is no next node."
      </p>

      <CodeBlock code={`#include <stdio.h>

int main() {
    int *p = NULL;  /* p does not point to anything yet */

    /* ALWAYS check before dereferencing */
    if (p != NULL) {
        printf("Value: %d\\n", *p);
    } else {
        printf("Pointer is NULL — nothing to read\\n");
    }

    /* Assigning a real address later */
    int age = 25;
    p = &age;

    if (p != NULL) {
        printf("Value: %d\\n", *p);  /* Value: 25 */
    }

    return 0;
}`} />

      <Callout type="warning">
        <strong>Never dereference a NULL pointer.</strong> If you do <code style={{ fontFamily: 'var(--font-mono)' }}>*p</code> when
        p is NULL, your program crashes immediately with a Segmentation Fault.
        Always check <code style={{ fontFamily: 'var(--font-mono)' }}>if (p != NULL)</code> before reading from a pointer
        if there is any chance it could be NULL. This rule saves you hours of debugging.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 9 — COMMON MISTAKES
      ══════════════════════════════════════ */}
      <SectionTag text="Section 9" />
      <SectionTitle>Common Pointer Mistakes — And How to Avoid Them</SectionTitle>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
        {[
          {
            title: 'Uninitialized pointer — reading garbage',
            symptom: 'Program crashes or reads random values',
            fix: 'Always initialise a pointer — either to NULL or to the address of a real variable before using it.',
            bad: `int *p;       /* p contains garbage — random address */\n*p = 10;      /* writing to random memory — crash */`,
            good: `int *p = NULL;  /* safe — clearly says "not set yet" */\nint x = 5;\np = &x;         /* now p is valid */\n*p = 10;        /* safe */`,
          },
          {
            title: 'Dangling pointer — pointing to freed memory',
            symptom: 'Program works sometimes but crashes unpredictably',
            fix: 'After freeing memory, always set the pointer to NULL immediately so it cannot be accidentally used.',
            bad: `int *p = (int*)malloc(sizeof(int));\n*p = 42;\nfree(p);\nprintf("%d\\n", *p);  /* p still points there — undefined */`,
            good: `int *p = (int*)malloc(sizeof(int));\n*p = 42;\nfree(p);\np = NULL;             /* safe — pointer is now clearly dead */`,
          },
          {
            title: 'Wrong pointer type',
            symptom: 'Reading the wrong number of bytes — getting garbage values',
            fix: 'The pointer type must match the variable type it points to.',
            bad: `float price = 9.99;\nint *p = &price;    /* WRONG — int* on a float variable */\nprintf("%d", *p);  /* reads only 4 bytes wrong way */`,
            good: `float price = 9.99;\nfloat *p = &price;  /* CORRECT — types match */\nprintf("%f", *p);   /* 9.990000 */`,
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
          SECTION 10 — WHY THIS MATTERS FOR DSA
      ══════════════════════════════════════ */}
      <SectionTag text="Section 10" />
      <SectionTitle>Why Pointers Unlock All of DSA</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Now that you understand pointers, let us connect this to what is coming.
        Every data structure from Unit 05 onwards uses pointers to link pieces of
        data together. Here is a quick preview:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {[
          { unit: 'Unit 05', name: 'Linked Lists', how: 'Each node has a pointer to the next node. The last node points to NULL. Without pointers, you cannot build a linked list at all.' },
          { unit: 'Unit 11', name: 'Trees', how: 'Each node has a left pointer and a right pointer. The tree grows by creating new nodes and linking them with pointers.' },
          { unit: 'Unit 15', name: 'Graphs', how: 'Each node has a list of pointers to its neighbours. Traversal means following pointers from node to node.' },
          { unit: 'Unit 16', name: 'Dynamic Programming', how: 'DP tables are arrays — which are pointers to contiguous memory. Memoization uses pointer-based structures internally.' },
        ].map((item) => (
          <div key={item.unit} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--green)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 4, padding: '3px 8px', whiteSpace: 'nowrap', marginTop: 2 }}>{item.unit}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{item.name}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>{item.how}</div>
            </div>
          </div>
        ))}
      </div>

      <Callout type="tip">
        <strong>Quick mental model to carry forward:</strong> A pointer is just an arrow.
        It says "go here." Linked lists are arrows chaining nodes. Trees are arrows
        branching down. Graphs are arrows going in all directions. Every time you
        see a pointer from now on, just think: arrow pointing to something.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          WHAT'S NEXT
      ══════════════════════════════════════ */}
      <SectionTag text="What's Next" />
      <SectionTitle>You Are Ready for Unit 05</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        You now understand the most important and most feared concept in C programming.
        Pointers are not magic — they are just variables that hold addresses, and
        two operators: & to get an address, * to follow one.
      </p>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 32 }}>
        In Unit 05 we build our first truly dynamic data structure —
        <strong style={{ color: 'var(--text)' }}> Linked Lists</strong>.
        Everything you just learned about pointers will be used immediately.
        A linked list is nothing more than nodes connected by pointers.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(0,230,118,0.02) 100%)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 12, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 700, marginBottom: 6 }}>UP NEXT → UNIT 05</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Linked Lists — Nodes Connected by Pointers</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Singly, doubly, circular — insert, delete, reverse, detect loops.</div>
        </div>
        <Link href="/learn/dsa/linked-lists" style={{ background: 'var(--green)', color: '#000', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '10px 22px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Coming Soon →
        </Link>
      </div>

      <KeyTakeaways items={[
        'Every variable lives at a specific address in RAM. The & operator gives you that address',
        'A pointer is a variable that stores a memory address — nothing more, nothing less',
        'int *p declares p as a pointer to int. p = &age stores the address of age in p',
        'The * symbol has two meanings: in declarations it means "pointer type", in expressions it means "go to that address"',
        '*p reads the value at the address p holds. *p = 10 writes 10 to that address',
        'Pointer arithmetic: p+1 moves by sizeof(type) bytes — not by 1 byte',
        'Pass by reference: passing &variable lets a function modify the original. Pass by value only passes a copy',
        'NULL means the pointer points to nothing. Always check for NULL before dereferencing',
        'Array name is a pointer to the first element. arr[i] and *(arr+i) are identical',
        'Every data structure from here — linked lists, trees, graphs — is built by connecting nodes with pointers',
      ]} />

    </LearnLayout>
  )
}