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

/* ── Stack visual — plates stacked vertically ── */
const StackVisual = ({ items, topLabel }: { items: { val: string; highlight?: boolean }[]; topLabel?: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
    {topLabel && (
      <div style={{ fontSize: 11, color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 6 }}>
        ← TOP {topLabel}
      </div>
    )}
    {[...items].reverse().map((item, i) => (
      <div key={i} style={{
        width: 140,
        padding: '12px 0',
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: 16,
        fontWeight: 800,
        color: item.highlight ? '#000' : 'var(--green)',
        background: item.highlight ? 'var(--green)' : 'rgba(0,230,118,0.06)',
        border: `2px solid ${item.highlight ? 'var(--green)' : 'rgba(0,230,118,0.3)'}`,
        borderBottom: i === 0 ? undefined : 'none',
        borderTopLeftRadius: i === items.length - 1 ? 8 : 0,
        borderTopRightRadius: i === items.length - 1 ? 8 : 0,
        borderBottomLeftRadius: i === 0 ? 8 : 0,
        borderBottomRightRadius: i === 0 ? 8 : 0,
      }}>
        {item.val}
      </div>
    ))}
    <div style={{ width: 140, height: 6, background: 'var(--border)', borderRadius: '0 0 4px 4px', marginTop: 0 }} />
    <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginTop: 6 }}>BOTTOM</div>
  </div>
)

export default function StacksPage() {
  return (
    <LearnLayout
      title="Unit 06 — Stacks"
      description="Last In, First Out. The data structure behind undo/redo, function calls, browser history, and expression evaluation. Built using arrays and linked lists."
      section="DSA"
      readTime="60 min"
      updatedAt="March 2026"
    >

      {/* ── Badges ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'UNIT 06', green: true },
          { label: 'Prerequisite: Units 02 + 05', green: false },
          { label: '60 min read', green: false },
        ].map((b) => (
          <span key={b.label} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: b.green ? 700 : 600, color: b.green ? 'var(--green)' : 'var(--muted)', background: b.green ? 'rgba(0,230,118,0.1)' : 'var(--surface)', border: `1px solid ${b.green ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`, borderRadius: 6, padding: '4px 10px' }}>
            {b.label}
          </span>
        ))}
      </div>

      <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        A stack is not a new data structure built from scratch — it is an array or linked list
        with one strict rule imposed on top: <strong style={{ color: 'var(--green)' }}>you can only
        add and remove from one end.</strong> That rule — as simple as it sounds —
        makes stacks incredibly useful for a whole class of problems.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>
        Every time you press Ctrl+Z to undo, every time your browser goes back a page,
        every time a function calls another function — a stack is working underneath.
        In this unit we build stacks two ways, learn all four operations, and solve
        the classic problems that make stacks a staple of every coding interview.
      </p>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 1 — WHAT IS A STACK
      ══════════════════════════════════════ */}
      <SectionTag text="Section 1" />
      <SectionTitle>What is a Stack?</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        A stack follows the <strong style={{ color: 'var(--green)' }}>LIFO</strong> principle —
        <strong> Last In, First Out.</strong> The last item you put in is the first one you get out.
        Think of a stack of plates in a canteen: you always place a new plate on top,
        and you always take from the top. You never reach into the middle.
      </p>

      {/* Plates analogy */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '28px', marginBottom: 28 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 20 }}>
          🍽️ The plate stack — LIFO in action
        </h3>
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'center' }}>

          {/* Push visual */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 14 }}>PUSH — add to top</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
              <StackVisual items={[
                { val: '10' },
                { val: '20' },
                { val: '30' },
              ]} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, paddingBottom: 32 }}>
                <div style={{ fontSize: 11, color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>push(40)</div>
                <div style={{ fontSize: 20, color: 'var(--green)' }}>↓</div>
              </div>
              <StackVisual items={[
                { val: '10' },
                { val: '20' },
                { val: '30' },
                { val: '40', highlight: true },
              ]} topLabel="40 added" />
            </div>
          </div>

          {/* Pop visual */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: '#ff4757', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 14 }}>POP — remove from top</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
              <StackVisual items={[
                { val: '10' },
                { val: '20' },
                { val: '30' },
                { val: '40', highlight: true },
              ]} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, paddingBottom: 32 }}>
                <div style={{ fontSize: 11, color: '#ff4757', fontFamily: 'var(--font-mono)' }}>pop() → 40</div>
                <div style={{ fontSize: 20, color: '#ff4757' }}>↑</div>
              </div>
              <StackVisual items={[
                { val: '10' },
                { val: '20' },
                { val: '30' },
              ]} topLabel="40 removed" />
            </div>
          </div>
        </div>
      </div>

      {/* Four operations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 28 }}>
        {[
          { op: 'push(x)', desc: 'Add element x to the top of the stack', color: 'var(--green)', time: 'O(1)' },
          { op: 'pop()', desc: 'Remove and return the top element', color: '#ff4757', time: 'O(1)' },
          { op: 'peek()', desc: 'Read the top element without removing it', color: '#facc15', time: 'O(1)' },
          { op: 'isEmpty()', desc: 'Check if the stack has no elements', color: '#4285f4', time: 'O(1)' },
        ].map((item) => (
          <div key={item.op} style={{ background: 'var(--surface)', border: `1px solid ${item.color}33`, borderRadius: 10, padding: '16px 18px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 800, color: item.color, marginBottom: 8 }}>{item.op}</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 10 }}>{item.desc}</div>
            <ComplexityBadge value={item.time} color={item.color} />
          </div>
        ))}
      </div>

      <Callout type="info">
        <strong>All four stack operations are O(1).</strong> This is the stack's biggest strength.
        No matter how many items are in the stack — 10 or 10 million — every push, pop, peek,
        and isEmpty check takes the same constant time.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 2 — STACK USING ARRAY
      ══════════════════════════════════════ */}
      <SectionTag text="Section 2" />
      <SectionTitle>Stack Using an Array</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        The simplest way to implement a stack is using an array. We keep an integer
        called <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>top</code> that
        always tracks the index of the topmost element. It starts at -1 (empty stack).
        Push increments top and places the value. Pop reads the value and decrements top.
      </p>

      <CodeBlock code={`#include <stdio.h>

#define MAX 100  /* maximum capacity of our stack */

/* stack structure — array + top index */
struct Stack {
    int data[MAX];
    int top;
};
typedef struct Stack Stack;

/* initialise: top = -1 means the stack is empty */
void initStack(Stack *s) {
    s->top = -1;
}

/* isEmpty: true if top is still -1 */
int isEmpty(Stack *s) {
    return s->top == -1;
}

/* isFull: true if top has reached the last index */
int isFull(Stack *s) {
    return s->top == MAX - 1;
}

/* push: add to top */
void push(Stack *s, int value) {
    if (isFull(s)) {
        printf("Stack overflow — cannot push %d\\n", value);
        return;
    }
    s->top++;              /* move top up */
    s->data[s->top] = value; /* place value at new top */
}

/* pop: remove from top */
int pop(Stack *s) {
    if (isEmpty(s)) {
        printf("Stack underflow — nothing to pop\\n");
        return -1;
    }
    int val = s->data[s->top]; /* save top value */
    s->top--;                   /* move top down */
    return val;
}

/* peek: read top without removing */
int peek(Stack *s) {
    if (isEmpty(s)) {
        printf("Stack is empty\\n");
        return -1;
    }
    return s->data[s->top];
}

/* print all elements from top to bottom */
void printStack(Stack *s) {
    if (isEmpty(s)) {
        printf("Stack is empty\\n");
        return;
    }
    printf("Stack (top to bottom): ");
    int i;
    for (i = s->top; i >= 0; i--) {
        printf("%d ", s->data[i]);
    }
    printf("\\n");
}

int main() {
    Stack s;
    initStack(&s);

    push(&s, 10);
    push(&s, 20);
    push(&s, 30);
    push(&s, 40);

    printStack(&s);              /* Stack (top to bottom): 40 30 20 10 */
    printf("Peek: %d\\n", peek(&s));  /* Peek: 40 */
    printf("Pop:  %d\\n", pop(&s));   /* Pop:  40 */
    printf("Pop:  %d\\n", pop(&s));   /* Pop:  30 */
    printStack(&s);              /* Stack (top to bottom): 20 10 */

    return 0;
}`} />

      <Callout type="tip">
        <strong>Stack overflow and underflow</strong> are the two error conditions you must always check.
        Overflow: trying to push when the stack is full.
        Underflow: trying to pop when the stack is empty.
        In real systems, unchecked stack overflow causes crashes — which is also where
        the name of the famous programming website comes from.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 3 — STACK USING LINKED LIST
      ══════════════════════════════════════ */}
      <SectionTag text="Section 3" />
      <SectionTitle>Stack Using a Linked List</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        The array-based stack has a fixed size — you must decide MAX upfront.
        A linked list-based stack has <strong style={{ color: 'var(--green)' }}>no size limit</strong> —
        it grows and shrinks dynamically. The top of the stack is always the HEAD of the list.
        Push = insert at head. Pop = delete head. Both are O(1).
      </p>

      <CodeBlock code={`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};
typedef struct Node Node;

/* the top pointer is just our linked list head */
Node *top = NULL;

int isEmptyLL() {
    return top == NULL;
}

void pushLL(int value) {
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->data = value;
    newNode->next = top;  /* new node points to current top */
    top = newNode;         /* new node becomes the new top */
}

int popLL() {
    if (isEmptyLL()) {
        printf("Stack underflow\\n");
        return -1;
    }
    Node *temp = top;
    int val = temp->data;
    top = top->next;  /* move top to the next node */
    free(temp);        /* free the popped node */
    return val;
}

int peekLL() {
    if (isEmptyLL()) {
        printf("Stack is empty\\n");
        return -1;
    }
    return top->data;
}

void printStackLL() {
    Node *current = top;
    printf("Stack (top to bottom): ");
    while (current != NULL) {
        printf("%d ", current->data);
        current = current->next;
    }
    printf("\\n");
}

int main() {
    pushLL(10);
    pushLL(20);
    pushLL(30);

    printStackLL();                   /* Stack (top to bottom): 30 20 10 */
    printf("Peek: %d\\n", peekLL()); /* Peek: 30 */
    printf("Pop:  %d\\n", popLL());  /* Pop:  30 */
    printStackLL();                   /* Stack (top to bottom): 20 10 */

    return 0;
}`} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
        <div style={{ background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 10, padding: '16px 18px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 8 }}>Array-based stack</div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75 }}>Fixed size. Simpler code. Better cache performance. Use when max size is known.</div>
        </div>
        <div style={{ background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.2)', borderRadius: 10, padding: '16px 18px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#7b61ff', marginBottom: 8 }}>Linked list-based stack</div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75 }}>Dynamic size. No overflow. Extra memory per node (the pointer). Use when size is unpredictable.</div>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 4 — BALANCED PARENTHESES
      ══════════════════════════════════════ */}
      <SectionTag text="Section 4" />
      <SectionTitle>Classic Problem — Balanced Parentheses</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        This is the most famous stack problem and appears in almost every interview.
        Given a string of brackets like <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>{`"({[]})"`}</code>,
        determine if every opening bracket has a matching closing bracket in the correct order.
      </p>

      {/* Why stack works */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>
          Why a stack is the perfect tool here:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { step: '1', text: 'When you see an opening bracket ( [ { — push it onto the stack.' },
            { step: '2', text: 'When you see a closing bracket ) ] } — check if the top of the stack is the matching opener.' },
            { step: '3', text: 'If it matches — pop the opener off. If it does not match — the string is invalid.' },
            { step: '4', text: 'At the end — if the stack is empty, all brackets were matched. If not, some opener was never closed.' },
          ].map(item => (
            <div key={item.step} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--green)', color: '#000', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.step}</div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trace visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // Tracing "( [ ] )" step by step
        </div>
        <div style={{ display: 'flex', gap: 0, minWidth: 480 }}>
          {[
            { char: '(', action: 'push (', stack: '(', result: '✓' },
            { char: '[', action: 'push [', stack: '( [', result: '✓' },
            { char: ']', action: 'top=[ matches ] → pop', stack: '(', result: '✓' },
            { char: ')', action: 'top=( matches ) → pop', stack: 'empty', result: '✓' },
          ].map((step, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', padding: '10px 8px', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--green)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>{step.char}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 8 }}>{step.action}</div>
              <div style={{ fontSize: 11, color: '#4285f4', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>stack: {step.stack}</div>
              <div style={{ fontSize: 14, color: 'var(--green)' }}>{step.result}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, fontSize: 13, color: 'var(--green)', fontWeight: 700, textAlign: 'center' }}>
          Stack is empty at end → BALANCED ✓
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

#define MAX 100

struct Stack {
    char data[MAX];
    int top;
};
typedef struct Stack Stack;

void initStack(Stack *s) { s->top = -1; }
int isEmpty(Stack *s) { return s->top == -1; }
void push(Stack *s, char c) { s->data[++(s->top)] = c; }
char pop(Stack *s) { return s->data[(s->top)--]; }
char peek(Stack *s) { return s->data[s->top]; }

int isBalanced(char *expr) {
    Stack s;
    initStack(&s);
    int i;

    for (i = 0; expr[i] != '\\0'; i++) {
        char c = expr[i];

        /* opening bracket — push onto stack */
        if (c == '(' || c == '[' || c == '{') {
            push(&s, c);
        }

        /* closing bracket — must match the top */
        else if (c == ')' || c == ']' || c == '}') {
            if (isEmpty(&s)) {
                return 0;  /* closing with nothing open — invalid */
            }

            char top = pop(&s);

            /* check if the popped opener matches this closer */
            if ((c == ')' && top != '(') ||
                (c == ']' && top != '[') ||
                (c == '}' && top != '{')) {
                return 0;  /* mismatch — invalid */
            }
        }
    }

    /* valid only if all openers were matched (stack is empty) */
    return isEmpty(&s);
}

int main() {
    char e1[] = "({[]})";
    char e2[] = "({[})";
    char e3[] = "((())";

    printf("'%s' → %s\\n", e1, isBalanced(e1) ? "BALANCED" : "NOT BALANCED");
    printf("'%s' → %s\\n", e2, isBalanced(e2) ? "BALANCED" : "NOT BALANCED");
    printf("'%s' → %s\\n", e3, isBalanced(e3) ? "BALANCED" : "NOT BALANCED");

    /* Output:
       '({[]})' → BALANCED
       '({[})'  → NOT BALANCED
       '((())'  → NOT BALANCED
    */
    return 0;
}`} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time:</span>
        <ComplexityBadge value="O(n)" color="#facc15" />
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>Space:</span>
        <ComplexityBadge value="O(n)" color="#facc15" />
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>(worst case: all openers, none closed)</span>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 5 — FUNCTION CALL STACK
      ══════════════════════════════════════ */}
      <SectionTag text="Section 5" />
      <SectionTitle>The Function Call Stack — What Happens Inside Your Computer</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Your computer uses a stack internally every time one function calls another.
        This is called the <strong style={{ color: 'var(--green)' }}>call stack</strong>.
        Understanding it explains recursion, stack overflow errors, and how programs
        know where to return after a function finishes.
      </p>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
          When main() calls funcA() which calls funcB():
        </div>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>call stack grows ↑</div>
            <StackVisual items={[
              { val: 'main()' },
              { val: 'funcA()' },
              { val: 'funcB()', highlight: true },
            ]} topLabel="currently running" />
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { step: '1', text: 'main() is called — pushed onto the call stack.' },
                { step: '2', text: 'main() calls funcA() — funcA() pushed on top.' },
                { step: '3', text: 'funcA() calls funcB() — funcB() pushed on top.' },
                { step: '4', text: 'funcB() finishes — popped off, execution returns to funcA().' },
                { step: '5', text: 'funcA() finishes — popped off, execution returns to main().' },
              ].map(item => (
                <div key={item.step} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--green)', color: '#000', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{item.step}</div>
                  <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Callout type="info">
        <strong>Stack overflow the error</strong> happens when the call stack grows too deep —
        usually from infinite recursion. Each function call pushes a frame onto the stack.
        If a recursive function never hits its base case, it keeps pushing until the stack
        runs out of memory and the OS kills the program.
        This is the real meaning of "stack overflow."
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 6 — REVERSE A STRING USING STACK
      ══════════════════════════════════════ */}
      <SectionTag text="Section 6" />
      <SectionTitle>Reverse a String Using a Stack</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Because a stack is LIFO, pushing all characters of a string and then popping them
        gives you the string in reverse — automatically. No two-pointer needed.
        Push every character, then pop them all back out.
      </p>

      <CodeBlock code={`#include <stdio.h>
#include <string.h>

#define MAX 100

struct Stack {
    char data[MAX];
    int top;
};
typedef struct Stack Stack;

void initStack(Stack *s) { s->top = -1; }
int isEmpty(Stack *s) { return s->top == -1; }
void push(Stack *s, char c) { s->data[++(s->top)] = c; }
char pop(Stack *s) { return s->data[(s->top)--]; }

void reverseString(char *str) {
    Stack s;
    initStack(&s);
    int i;
    int len = strlen(str);

    /* push every character */
    for (i = 0; i < len; i++) {
        push(&s, str[i]);
    }

    /* pop them back — they come out in reverse order */
    for (i = 0; i < len; i++) {
        str[i] = pop(&s);
    }
}

int main() {
    char str[] = "Chaduvuko";
    printf("Before: %s\\n", str);   /* Chaduvuko */
    reverseString(str);
    printf("After:  %s\\n", str);   /* okuvadhC  */
    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 7 — UNDO/REDO CONCEPT
      ══════════════════════════════════════ */}
      <SectionTag text="Section 7" />
      <SectionTitle>Undo / Redo — How Real Applications Use Stacks</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Every text editor, image editor, and IDE you have ever used implements
        undo/redo with two stacks. This is one of the most elegant real-world
        applications of the stack data structure.
      </p>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 10 }}>Undo Stack</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'var(--text)', lineHeight: 1.75 }}>
              <div>Every action you perform gets <strong style={{ color: 'var(--text)' }}>pushed</strong> onto the undo stack.</div>
              <div>When you press Ctrl+Z — <strong style={{ color: 'var(--text)' }}>pop</strong> from undo stack, reverse the action, <strong style={{ color: 'var(--text)' }}>push</strong> it onto the redo stack.</div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#7b61ff', marginBottom: 10 }}>Redo Stack</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'var(--text)', lineHeight: 1.75 }}>
              <div>When you press Ctrl+Y — <strong style={{ color: 'var(--text)' }}>pop</strong> from redo stack, redo the action, <strong style={{ color: 'var(--text)' }}>push</strong> it back onto the undo stack.</div>
              <div>If you perform a new action — the redo stack is <strong style={{ color: '#ff4757' }}>cleared</strong> entirely.</div>
            </div>
          </div>
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <string.h>

#define MAX 50

/* simple demo — tracking text changes as strings */
struct StrStack {
    char data[MAX][100];
    int top;
};
typedef struct StrStack StrStack;

void initSS(StrStack *s) { s->top = -1; }
int isEmptySS(StrStack *s) { return s->top == -1; }
void pushSS(StrStack *s, char *val) { strcpy(s->data[++(s->top)], val); }
void popSS(StrStack *s, char *out) { strcpy(out, s->data[(s->top)--]); }
void peekSS(StrStack *s, char *out) { strcpy(out, s->data[s->top]); }

int main() {
    StrStack undoStack, redoStack;
    initSS(&undoStack);
    initSS(&redoStack);

    char buf[100];

    /* simulate three actions */
    pushSS(&undoStack, "Typed: Hello");
    pushSS(&undoStack, "Typed: World");
    pushSS(&undoStack, "Bold applied");

    printf("--- Undo ---\\n");
    popSS(&undoStack, buf);
    printf("Undid: %s\\n", buf);    /* Undid: Bold applied */
    pushSS(&redoStack, buf);

    popSS(&undoStack, buf);
    printf("Undid: %s\\n", buf);    /* Undid: Typed: World */
    pushSS(&redoStack, buf);

    printf("--- Redo ---\\n");
    popSS(&redoStack, buf);
    printf("Redid: %s\\n", buf);    /* Redid: Typed: World */
    pushSS(&undoStack, buf);

    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 8 — ERRORS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 8" />
      <SectionTitle>Errors You Will Hit</SectionTitle>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
        {[
          {
            title: 'Stack Underflow — popping from an empty stack',
            symptom: 'Program reads garbage value or crashes when trying to pop',
            fix: 'Always call isEmpty() before pop() or peek(). Never assume the stack has elements.',
          },
          {
            title: 'Stack Overflow — pushing to a full array stack',
            symptom: 'Values silently overwrite memory beyond the array boundary',
            fix: 'Always call isFull() before push() in array-based stacks. Or use the linked list version which has no fixed limit.',
          },
          {
            title: 'Not resetting top after using the stack',
            symptom: 'Old data appears when you reuse the stack for a new problem',
            fix: 'Always call initStack() to set top = -1 before using a stack for a fresh problem.',
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
          SECTION 9 — OPERATIONS SUMMARY
      ══════════════════════════════════════ */}
      <SectionTag text="Section 9" />
      <SectionTitle>Quick Reference — All Stack Operations</SectionTitle>

      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Operation', 'Array Stack', 'Linked List Stack', 'Time'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, background: 'var(--surface)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['push(x)', 'data[++top] = x', 'insert new node at head', 'O(1)'],
              ['pop()', 'return data[top--]', 'delete head, return its data', 'O(1)'],
              ['peek()', 'return data[top]', 'return top->data', 'O(1)'],
              ['isEmpty()', 'top == -1', 'top == NULL', 'O(1)'],
              ['isFull()', 'top == MAX-1', 'not applicable (dynamic)', 'O(1)'],
              ['Space used', 'Fixed MAX slots', 'Grows as needed', '—'],
            ].map(([op, arr, ll, time], ri) => (
              <tr key={ri}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{op}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{arr}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{ll}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: '#00e676', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{time}</td>
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
      <SectionTitle>You Are Ready for Unit 07</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        You now understand stacks completely — the LIFO rule, all four operations,
        both implementations, and three classic applications. You also understand
        the call stack that powers every program you have ever run.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 32 }}>
        In Unit 07 we cover <strong style={{ color: 'var(--text)' }}>Queues</strong> —
        the other side of the coin. Where stacks are LIFO, queues are FIFO:
        First In, First Out. Think of a ticket counter line — the person who
        arrives first gets served first. Queues power CPU scheduling,
        message delivery systems, and breadth-first graph traversal.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(0,230,118,0.02) 100%)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 12, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 700, marginBottom: 6 }}>UP NEXT → UNIT 07</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Queues — First In, First Out</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Enqueue, dequeue, circular queue, priority queue — explained simply.</div>
        </div>
        <Link href="/learn/dsa/queues" style={{ background: 'var(--green)', color: '#000', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '10px 22px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Coming Soon →
        </Link>
      </div>

      <KeyTakeaways items={[
        'A stack is LIFO — Last In, First Out. Only the top element is accessible at any time',
        'Four operations: push (add to top), pop (remove from top), peek (read top), isEmpty (check if empty) — all O(1)',
        'Array stack: simple, fixed size. Track top index starting at -1. Linked list stack: dynamic, no size limit',
        'Stack overflow = pushing to a full stack. Stack underflow = popping from an empty stack. Always check both',
        'Balanced parentheses: push openers, pop and match on closers, valid if stack empty at end',
        'The call stack is how your computer tracks function calls — each call pushes a frame, return pops it',
        'Undo/redo in editors uses two stacks — undo stack for done actions, redo stack for undone actions',
        'Reversing a string with a stack: push all characters, pop them back — LIFO gives you reverse for free',
      ]} />

    </LearnLayout>
  )
}