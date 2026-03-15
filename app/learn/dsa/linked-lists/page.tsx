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

/* ── Linked list node visual ── */
const NodeBox = ({ value, isHead, isTail, hasArrow = true }: { value: string; isHead?: boolean; isTail?: boolean; hasArrow?: boolean }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
    <div style={{ textAlign: 'center' }}>
      {(isHead || isTail) && (
        <div style={{ fontSize: 10, color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 4 }}>
          {isHead ? 'HEAD' : 'TAIL'}
        </div>
      )}
      <div style={{ display: 'flex', border: '2px solid var(--green)', borderRadius: 8, overflow: 'hidden', minWidth: 90 }}>
        <div style={{ padding: '10px 14px', background: 'rgba(0,230,118,0.06)', fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 800, color: 'var(--green)', borderRight: '1px solid var(--border)' }}>
          {value}
        </div>
        <div style={{ padding: '10px 10px', background: 'rgba(123,97,255,0.06)', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#7b61ff', display: 'flex', alignItems: 'center' }}>
          next
        </div>
      </div>
    </div>
    {hasArrow && (
      <div style={{ fontSize: 18, color: 'var(--muted)', padding: '0 6px', marginTop: isHead || isTail ? 22 : 0 }}>→</div>
    )}
  </div>
)

const NullBox = ({ marginTop }: { marginTop?: number }) => (
  <div style={{ border: '2px solid #ff4757', borderRadius: 8, padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800, color: '#ff4757', background: 'rgba(255,71,87,0.06)', marginTop: marginTop || 0 }}>
    NULL
  </div>
)

export default function LinkedListsPage() {
  return (
    <LearnLayout
      title="Unit 05 — Linked Lists"
      description="A chain of nodes where each one points to the next. More flexible than arrays, a favourite in interviews, and the foundation of stacks, queues, and trees."
      section="DSA"
      readTime="90 min"
      updatedAt="March 2026"
    >

      {/* ── Badges ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'UNIT 05', green: true },
          { label: 'Prerequisite: Unit 04 — Pointers', green: false },
          { label: '90 min read', green: false },
        ].map((b) => (
          <span key={b.label} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: b.green ? 700 : 600, color: b.green ? 'var(--green)' : 'var(--muted)', background: b.green ? 'rgba(0,230,118,0.1)' : 'var(--surface)', border: `1px solid ${b.green ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`, borderRadius: 6, padding: '4px 10px' }}>
            {b.label}
          </span>
        ))}
      </div>

      <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Arrays are powerful but they have one big weakness — their size is fixed.
        Once you declare <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>int arr[10]</code>,
        you get exactly 10 slots. You cannot grow or shrink it while the program runs.
        Linked lists solve this completely — they grow and shrink dynamically,
        one node at a time, using the pointers you mastered in Unit 04.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>
        In this unit we build linked lists completely from scratch in C —
        singly, doubly, and circular. We implement every operation, understand
        every edge case, and solve the classic interview problems that come from this topic.
      </p>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 1 — WHAT IS A LINKED LIST
      ══════════════════════════════════════ */}
      <SectionTag text="Section 1" />
      <SectionTitle>What is a Linked List?</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        A linked list is a collection of <strong style={{ color: 'var(--green)' }}>nodes</strong> where
        each node holds two things: a piece of data, and a pointer to the next node.
        The nodes do not need to be next to each other in memory — they can be
        scattered anywhere in RAM, connected only by their pointers.
      </p>

      {/* Train analogy */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 14 }}>
          🚂 Think of a train
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 16 }}>
          Each train coach is a node. It carries passengers (data) and is coupled
          to the next coach (next pointer). The last coach has no coupling — it points to nothing (NULL).
          You always start from the engine (HEAD) and move forward coach by coach.
          You cannot jump directly to coach 5 — you must pass through 1, 2, 3, 4 first.
        </p>

        {/* Visual linked list */}
        <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, minWidth: 500 }}>
            <NodeBox value="10" isHead hasArrow />
            <NodeBox value="20" hasArrow />
            <NodeBox value="30" hasArrow />
            <NodeBox value="40" isTail hasArrow />
            <NullBox marginTop={22} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 20 }}>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', marginBottom: 6 }}>data field</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
              Holds the actual value — 10, 20, 30, 40. Could be any type: int, float, string.
            </div>
          </div>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#7b61ff', marginBottom: 6 }}>next field</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
              Pointer to the next node. The last node's next is NULL — meaning "chain ends here."
            </div>
          </div>
        </div>
      </div>

      <Callout type="info">
        <strong>Array vs Linked List — the core tradeoff:</strong> Arrays give O(1) access by index
        but O(n) insertion/deletion. Linked lists give O(1) insertion/deletion at the head
        but O(n) access — you must walk from the start every time. Neither is better overall.
        The right choice depends on what your program does most.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 2 — NODE STRUCTURE IN C
      ══════════════════════════════════════ */}
      <SectionTag text="Section 2" />
      <SectionTitle>Building a Node in C — The struct</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        In C, we group data together using a <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>struct</code>.
        Think of a struct as a custom box that can hold multiple values of different types
        under one name. A linked list node needs exactly two things in its box:
        an integer (the data) and a pointer to the next node.
      </p>

      <CodeBlock code={`/* Define the structure of one node */
struct Node {
    int data;           /* the value this node holds */
    struct Node *next;  /* pointer to the next node in the chain */
};

/* typedef lets us write Node instead of struct Node everywhere */
typedef struct Node Node;`} />

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Now let us create actual nodes using <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>malloc</code> —
        which allocates memory dynamically at runtime. This is why linked lists can grow:
        each new node gets fresh memory from the system on demand.
      </p>

      <CodeBlock code={`#include <stdio.h>
#include <stdlib.h>  /* required for malloc and free */

struct Node {
    int data;
    struct Node *next;
};
typedef struct Node Node;

/* helper function: create a new node with given data */
Node* createNode(int value) {
    Node *newNode = (Node*)malloc(sizeof(Node)); /* ask OS for memory */

    if (newNode == NULL) {
        printf("Memory allocation failed!\\n");
        return NULL;
    }

    newNode->data = value;  /* set the data */
    newNode->next = NULL;   /* next points to nothing yet */
    return newNode;
}

int main() {
    Node *n1 = createNode(10);
    Node *n2 = createNode(20);
    Node *n3 = createNode(30);

    /* link them together manually */
    n1->next = n2;  /* 10 → 20 */
    n2->next = n3;  /* 20 → 30 */
    n3->next = NULL; /* 30 → NULL */

    /* n1 is our HEAD — the entry point to the whole list */
    printf("First node: %d\\n", n1->data);         /* 10 */
    printf("Second node: %d\\n", n1->next->data);  /* 20 */
    printf("Third node: %d\\n", n1->next->next->data); /* 30 */

    return 0;
}`} />

      <Callout type="tip">
        <strong>The arrow operator <code style={{ fontFamily: 'var(--font-mono)' }}>-&gt;</code></strong> is shorthand
        for dereferencing a pointer and accessing a field.
        <code style={{ fontFamily: 'var(--font-mono)' }}> n1-&gt;data</code> means the same as{' '}
        <code style={{ fontFamily: 'var(--font-mono)' }}>(*n1).data</code> — go to the node n1 points to,
        then read its data field. Always use <code style={{ fontFamily: 'var(--font-mono)' }}>-&gt;</code> with pointers
        to structs. It is cleaner and you will see it everywhere.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 3 — TRAVERSAL
      ══════════════════════════════════════ */}
      <SectionTag text="Section 3" />
      <SectionTitle>Traversal — Walking the Chain</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        To visit every node you start at HEAD and follow the next pointers one by one
        until you reach NULL. Use a temporary pointer — never move HEAD itself,
        or you will lose track of the start of the list.
      </p>

      <CodeBlock code={`void printList(Node *head) {
    Node *current = head;  /* temporary pointer — do NOT move head */

    while (current != NULL) {
        printf("%d", current->data);
        if (current->next != NULL) {
            printf(" → ");
        }
        current = current->next;  /* move to the next node */
    }
    printf(" → NULL\\n");
}

/* calling it: printList(head); */
/* Output: 10 → 20 → 30 → NULL */`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time Complexity:</span>
          <ComplexityBadge value="O(n)" color="#facc15" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Space Complexity:</span>
          <ComplexityBadge value="O(1)" color="#00e676" />
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 4 — INSERTION
      ══════════════════════════════════════ */}
      <SectionTag text="Section 4" />
      <SectionTitle>Insertion — Three Cases</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 24 }}>
        Inserting into a linked list has three cases depending on where you insert.
        Each one has different steps and different complexity. Understand all three.
      </p>

      {/* Case 1 — Insert at head */}
      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 10 }}>
        Case 1 — Insert at the Head
      </h3>
      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 8 }}>
        The new node becomes the new HEAD. Point its next to the old head, then update HEAD.
        This is the fastest insertion — O(1).
      </p>

      {/* Visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 12, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>// Insert 5 at head — before: 10→20→30  after: 5→10→20→30</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, minWidth: 420 }}>
          <NodeBox value="5" isHead hasArrow />
          <NodeBox value="10" hasArrow />
          <NodeBox value="20" hasArrow />
          <NodeBox value="30" hasArrow={false} />
          <div style={{ fontSize: 18, color: 'var(--muted)', padding: '0 6px', marginTop: 22 }}>→</div>
          <NullBox marginTop={22} />
        </div>
      </div>

      <CodeBlock code={`Node* insertAtHead(Node *head, int value) {
    Node *newNode = createNode(value);
    newNode->next = head;  /* new node points to old head */
    head = newNode;        /* head now points to new node */
    return head;           /* return updated head */
}

/* usage: head = insertAtHead(head, 5); */`} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time:</span>
        <ComplexityBadge value="O(1)" color="#00e676" />
      </div>

      {/* Case 2 — Insert at tail */}
      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 10 }}>
        Case 2 — Insert at the Tail
      </h3>
      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 8 }}>
        Walk to the last node (the one whose next is NULL), then attach the new node there.
        Must traverse the whole list — O(n).
      </p>

      <CodeBlock code={`Node* insertAtTail(Node *head, int value) {
    Node *newNode = createNode(value);

    /* edge case: empty list — new node becomes head */
    if (head == NULL) {
        return newNode;
    }

    Node *current = head;
    while (current->next != NULL) {  /* walk until last node */
        current = current->next;
    }

    current->next = newNode;  /* attach new node at the end */
    return head;
}

/* usage: head = insertAtTail(head, 40); */`} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time:</span>
        <ComplexityBadge value="O(n)" color="#facc15" />
      </div>

      {/* Case 3 — Insert at position */}
      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 10 }}>
        Case 3 — Insert at a Specific Position
      </h3>
      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 8 }}>
        Walk to the node just before the target position, then rewire the pointers.
        The key is stopping one node early — at position-1.
      </p>

      {/* Rewire visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 12, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>
          // Insert 15 at position 1 — between 10 and 20
        </div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>Step 1 — new node's next → 20</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>Step 2 — 10's next → new node</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, minWidth: 460 }}>
          <NodeBox value="10" isHead hasArrow />
          <NodeBox value="15" hasArrow />
          <NodeBox value="20" hasArrow />
          <NodeBox value="30" hasArrow={false} />
          <div style={{ fontSize: 18, color: 'var(--muted)', padding: '0 6px', marginTop: 22 }}>→</div>
          <NullBox marginTop={22} />
        </div>
      </div>

      <CodeBlock code={`Node* insertAtPosition(Node *head, int value, int pos) {
    /* position 0 means insert at head */
    if (pos == 0) {
        return insertAtHead(head, value);
    }

    Node *newNode = createNode(value);
    Node *current = head;
    int i;

    /* walk to the node just BEFORE our target position */
    for (i = 0; i < pos - 1 && current != NULL; i++) {
        current = current->next;
    }

    if (current == NULL) {
        printf("Position out of range\\n");
        return head;
    }

    /* rewire: new node points forward, previous node points to new node */
    newNode->next = current->next;
    current->next = newNode;

    return head;
}

/* usage: head = insertAtPosition(head, 15, 1); */`} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time:</span>
        <ComplexityBadge value="O(n)" color="#facc15" />
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 5 — DELETION
      ══════════════════════════════════════ */}
      <SectionTag text="Section 5" />
      <SectionTitle>Deletion — Three Cases</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 24 }}>
        Deleting a node means rewiring the previous node's pointer to skip the deleted node,
        then freeing the memory. Three cases again — head, tail, and middle.
      </p>

      <CodeBlock code={`Node* deleteNode(Node *head, int value) {
    if (head == NULL) {
        printf("List is empty\\n");
        return NULL;
    }

    /* Case 1: delete the HEAD node */
    if (head->data == value) {
        Node *temp = head;
        head = head->next;  /* move head forward */
        free(temp);          /* release the old head's memory */
        return head;
    }

    /* Case 2 & 3: delete a middle or tail node */
    Node *current = head;

    /* walk until we find the node BEFORE the one to delete */
    while (current->next != NULL && current->next->data != value) {
        current = current->next;
    }

    if (current->next == NULL) {
        printf("Value %d not found\\n", value);
        return head;
    }

    /* rewire: skip the target node */
    Node *temp = current->next;       /* save pointer to node being deleted */
    current->next = temp->next;       /* bypass the deleted node */
    free(temp);                        /* release its memory */

    return head;
}

/* usage: head = deleteNode(head, 20); */`} />

      {/* Visual deletion */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 24, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          // Delete 20 — before: 10→20→30  after: 10→30
        </div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>
          10's next skips over 20 and points directly to 30. Memory for 20 is freed.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, minWidth: 300 }}>
          <NodeBox value="10" isHead hasArrow />
          <NodeBox value="30" hasArrow={false} />
          <div style={{ fontSize: 18, color: 'var(--muted)', padding: '0 6px' }}>→</div>
          <NullBox />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time:</span>
        <ComplexityBadge value="O(n)" color="#facc15" />
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>(O(1) if deleting head)</span>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 6 — SEARCH
      ══════════════════════════════════════ */}
      <SectionTag text="Section 6" />
      <SectionTitle>Search — Finding a Value</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        There is no index-based access in a linked list. You must walk from HEAD
        and check each node one by one until you find the value or reach NULL.
      </p>

      <CodeBlock code={`int searchList(Node *head, int target) {
    Node *current = head;
    int position = 0;

    while (current != NULL) {
        if (current->data == target) {
            return position;   /* found — return position */
        }
        current = current->next;
        position++;
    }
    return -1;  /* not found */
}

/* usage:
   int pos = searchList(head, 30);
   if (pos != -1) printf("Found at position %d\\n", pos);
   else printf("Not found\\n");
*/`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Best Case:</span>
          <ComplexityBadge value="O(1)" color="#00e676" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(target is HEAD)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Worst Case:</span>
          <ComplexityBadge value="O(n)" color="#facc15" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(target at tail or absent)</span>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 7 — REVERSE A LINKED LIST
      ══════════════════════════════════════ */}
      <SectionTag text="Section 7" />
      <SectionTitle>Reverse a Linked List — The Classic Interview Question</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Reversing a linked list is the most frequently asked linked list question in coding interviews.
        The idea: walk through the list and flip every arrow — each node's next should point
        to its previous node instead of the next. You need three pointers to do this without
        losing track of where you are.
      </p>

      {/* Reverse visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // Before: 10→20→30→NULL  |  After: 30→20→10→NULL
        </div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>Before reversal:</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 20, minWidth: 380 }}>
          <NodeBox value="10" isHead hasArrow />
          <NodeBox value="20" hasArrow />
          <NodeBox value="30" isTail hasArrow />
          <NullBox marginTop={22} />
        </div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>After reversal:</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, minWidth: 380 }}>
          <NodeBox value="30" isHead hasArrow />
          <NodeBox value="20" hasArrow />
          <NodeBox value="10" isTail hasArrow />
          <NullBox marginTop={22} />
        </div>
      </div>

      <CodeBlock code={`Node* reverseList(Node *head) {
    Node *prev    = NULL;   /* will become the new next for each node */
    Node *current = head;   /* the node we are processing right now */
    Node *next    = NULL;   /* saves the next node before we overwrite the pointer */

    while (current != NULL) {
        next = current->next;   /* step 1: save next before we lose it */
        current->next = prev;   /* step 2: flip the arrow — point backwards */
        prev = current;         /* step 3: prev moves forward */
        current = next;         /* step 4: current moves forward */
    }

    /* when loop ends, current is NULL and prev is the new head */
    return prev;
}

/* usage: head = reverseList(head); */`} />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
          Tracing through the first iteration (current = node 10):
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { step: '1', code: 'next = current->next', result: 'next = node(20) — saved so we don\'t lose it' },
            { step: '2', code: 'current->next = prev', result: 'node(10)->next = NULL — arrow flipped backward' },
            { step: '3', code: 'prev = current', result: 'prev = node(10)' },
            { step: '4', code: 'current = next', result: 'current = node(20) — move forward' },
          ].map(item => (
            <div key={item.step} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--green)', color: '#000', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{item.step}</div>
              <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 12, minWidth: 180, flexShrink: 0 }}>{item.code}</code>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.result}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time:</span>
        <ComplexityBadge value="O(n)" color="#facc15" />
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>Space:</span>
        <ComplexityBadge value="O(1)" color="#00e676" />
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>(in-place, no extra list)</span>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 8 — DOUBLY LINKED LIST
      ══════════════════════════════════════ */}
      <SectionTag text="Section 8" />
      <SectionTitle>Doubly Linked List — Two Directions</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        A singly linked list only goes forward — you can never go back.
        A doubly linked list gives each node two pointers:
        <strong style={{ color: 'var(--green)' }}> next</strong> (forward) and
        <strong style={{ color: '#7b61ff)' }}> prev</strong> (backward).
        You can traverse in both directions. The tradeoff: each node uses more memory,
        and insert/delete need to update two pointers instead of one.
      </p>

      {/* DLL visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 24, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // NULL ←prev | 10 | next→ ←prev | 20 | next→ ←prev | 30 | next→ NULL
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 520 }}>
          <NullBox />
          <div style={{ fontSize: 14, color: 'var(--muted)' }}>⇄</div>
          {[10, 20, 30].map((val, i) => (
            <React.Fragment key={val}>
              <div style={{ border: '2px solid var(--green)', borderRadius: 8, overflow: 'hidden', display: 'flex' }}>
                <div style={{ padding: '8px 10px', background: 'rgba(123,97,255,0.08)', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#7b61ff', borderRight: '1px solid var(--border)' }}>prev</div>
                <div style={{ padding: '8px 14px', background: 'rgba(0,230,118,0.06)', fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 800, color: 'var(--green)', borderRight: '1px solid var(--border)' }}>{val}</div>
                <div style={{ padding: '8px 10px', background: 'rgba(0,230,118,0.06)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--green)' }}>next</div>
              </div>
              {i < 2 && <div style={{ fontSize: 14, color: 'var(--muted)' }}>⇄</div>}
            </React.Fragment>
          ))}
          <div style={{ fontSize: 14, color: 'var(--muted)' }}>⇄</div>
          <NullBox />
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <stdlib.h>

struct DNode {
    int data;
    struct DNode *prev;  /* points to previous node */
    struct DNode *next;  /* points to next node */
};
typedef struct DNode DNode;

DNode* createDNode(int value) {
    DNode *node = (DNode*)malloc(sizeof(DNode));
    node->data = value;
    node->prev = NULL;
    node->next = NULL;
    return node;
}

DNode* insertAtHeadDLL(DNode *head, int value) {
    DNode *newNode = createDNode(value);

    if (head != NULL) {
        newNode->next = head;  /* new node's next → old head */
        head->prev = newNode;  /* old head's prev → new node */
    }
    return newNode;  /* new node is the new head */
}

void printForward(DNode *head) {
    DNode *current = head;
    printf("Forward:  ");
    while (current != NULL) {
        printf("%d ", current->data);
        current = current->next;
    }
    printf("\\n");
}

void printBackward(DNode *head) {
    if (head == NULL) return;

    /* walk to the last node first */
    DNode *current = head;
    while (current->next != NULL) {
        current = current->next;
    }

    /* now walk backward using prev */
    printf("Backward: ");
    while (current != NULL) {
        printf("%d ", current->data);
        current = current->prev;
    }
    printf("\\n");
}

int main() {
    DNode *head = NULL;
    head = insertAtHeadDLL(head, 30);
    head = insertAtHeadDLL(head, 20);
    head = insertAtHeadDLL(head, 10);

    printForward(head);   /* Forward:  10 20 30 */
    printBackward(head);  /* Backward: 30 20 10 */

    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 9 — CIRCULAR LINKED LIST
      ══════════════════════════════════════ */}
      <SectionTag text="Section 9" />
      <SectionTitle>Circular Linked List — No End</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        In a circular linked list, the last node does not point to NULL —
        it points back to the HEAD. The list forms a loop with no end.
        This is useful for things like round-robin scheduling (rotating through
        tasks endlessly) and implementing circular queues.
      </p>

      {/* Circular visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 24, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // 10 → 20 → 30 → (back to 10) — no NULL
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, minWidth: 360 }}>
          <NodeBox value="10" isHead hasArrow />
          <NodeBox value="20" hasArrow />
          <NodeBox value="30" hasArrow={false} />
          <div style={{ fontSize: 13, color: 'var(--green)', padding: '0 10px', fontFamily: 'var(--font-mono)', marginTop: 22 }}>→ back to HEAD</div>
        </div>
      </div>

      <CodeBlock code={`/* Traversal of circular linked list — must stop carefully */
void printCircular(Node *head) {
    if (head == NULL) return;

    Node *current = head;

    do {
        printf("%d ", current->data);
        current = current->next;
    } while (current != head);  /* stop when we are back at head */

    printf("(back to head)\\n");
}

/* Creating a circular list manually */
int main() {
    Node *n1 = createNode(10);
    Node *n2 = createNode(20);
    Node *n3 = createNode(30);

    n1->next = n2;
    n2->next = n3;
    n3->next = n1;  /* last node points back to first — circular! */

    Node *head = n1;
    printCircular(head);  /* 10 20 30 (back to head) */

    return 0;
}`} />

      <Callout type="warning">
        <strong>Traversal must use a do-while loop</strong> or check for the head pointer
        as the stop condition — never check for NULL, because in a circular list
        there is no NULL. Using a regular while loop that checks NULL will run forever.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 10 — DETECT A LOOP
      ══════════════════════════════════════ */}
      <SectionTag text="Section 10" />
      <SectionTitle>Detect a Loop — Floyd's Cycle Detection</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Sometimes a linked list has a bug — a node's next pointer accidentally points
        back to an earlier node, creating an infinite loop. Your traversal code would run
        forever. How do you detect this?
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        The answer is <strong style={{ color: 'var(--green)' }}>Floyd's Cycle Detection Algorithm</strong>,
        also called the <strong>tortoise and hare</strong> algorithm. The idea is beautifully simple:
        use two pointers. One moves one step at a time (slow). The other moves two steps at a time (fast).
        If there is a loop, the fast pointer will eventually lap the slow one — they will meet
        at the same node. If there is no loop, the fast pointer will reach NULL.
      </p>

      {/* Tortoise and hare visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // Think of a circular running track — the faster runner always laps the slower one
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,230,118,0.15)', border: '2px solid var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🐢</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)' }}>slow pointer</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>moves 1 step at a time</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(249,115,22,0.15)', border: '2px solid #f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🐇</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f97316' }}>fast pointer</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>moves 2 steps at a time</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(123,97,255,0.15)', border: '2px solid #7b61ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🤝</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#7b61ff' }}>they meet = loop exists</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>fast reaches NULL = no loop</div>
            </div>
          </div>
        </div>
      </div>

      <CodeBlock code={`int detectLoop(Node *head) {
    Node *slow = head;  /* tortoise — moves 1 step */
    Node *fast = head;  /* hare — moves 2 steps */

    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;        /* move 1 step */
        fast = fast->next->next;  /* move 2 steps */

        if (slow == fast) {
            return 1;  /* they met — loop detected */
        }
    }

    return 0;  /* fast reached NULL — no loop */
}

int main() {
    /* create a list with a loop: 1→2→3→4→2 (4 points back to 2) */
    Node *head = createNode(1);
    head->next = createNode(2);
    head->next->next = createNode(3);
    head->next->next->next = createNode(4);
    head->next->next->next->next = head->next;  /* create loop: 4→2 */

    if (detectLoop(head)) {
        printf("Loop detected!\\n");    /* Loop detected! */
    } else {
        printf("No loop\\n");
    }

    return 0;
}`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time:</span>
          <ComplexityBadge value="O(n)" color="#facc15" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Space:</span>
          <ComplexityBadge value="O(1)" color="#00e676" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(only two extra pointers)</span>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 11 — COMPARISON TABLE
      ══════════════════════════════════════ */}
      <SectionTag text="Section 11" />
      <SectionTitle>Array vs Linked List — Side by Side</SectionTitle>

      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Operation', 'Array', 'Linked List', 'Winner'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, background: 'var(--surface)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Access by index', 'O(1)', 'O(n)', 'Array'],
              ['Insert at head', 'O(n) — shift all', 'O(1)', 'Linked List'],
              ['Insert at tail', 'O(1) if space', 'O(n) — walk to end', 'Array'],
              ['Insert at middle', 'O(n) — shift', 'O(n) — walk + rewire', 'Tie'],
              ['Delete at head', 'O(n) — shift all', 'O(1)', 'Linked List'],
              ['Search', 'O(n)', 'O(n)', 'Tie'],
              ['Memory', 'Fixed — may waste', 'Dynamic — exact fit', 'Linked List'],
              ['Cache performance', 'Excellent — contiguous', 'Poor — scattered RAM', 'Array'],
            ].map(([op, arr, ll, winner], ri) => (
              <tr key={ri}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)', fontWeight: 600 }}>{op}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{arr}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{ll}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: winner === 'Array' ? '#facc15' : winner === 'Linked List' ? 'var(--green)' : 'var(--muted)', fontWeight: 700, fontSize: 12 }}>{winner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="tip">
        <strong>Rule of thumb for interviews:</strong> If you need fast access by index — use array.
        If you need frequent insertions and deletions at the front — use linked list.
        If you do not know which operations dominate, ask the interviewer what the most
        common operation will be.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          WHAT'S NEXT
      ══════════════════════════════════════ */}
      <SectionTag text="What's Next" />
      <SectionTitle>You Are Ready for Unit 06</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        You now know how to build, traverse, insert into, delete from, reverse,
        and detect loops in a linked list. Every one of those operations used
        the pointer knowledge from Unit 04 directly.
      </p>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 32 }}>
        In Unit 06 we build <strong style={{ color: 'var(--text)' }}>Stacks</strong> —
        a data structure built on top of arrays or linked lists that enforces one rule:
        Last In, First Out. Stacks power undo/redo, function calls, expression evaluation,
        and much more.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(0,230,118,0.02) 100%)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 12, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 700, marginBottom: 6 }}>UP NEXT → UNIT 06</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Stacks — Last In, First Out</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Push, pop, peek — with arrays and linked lists. Balanced brackets and the call stack.</div>
        </div>
        <Link href="/learn/dsa/stacks" style={{ background: 'var(--green)', color: '#000', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '10px 22px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Coming Soon →
        </Link>
      </div>

      <KeyTakeaways items={[
        'A linked list is a chain of nodes — each node holds data and a pointer to the next node',
        'Nodes are created with malloc and can be anywhere in memory — they do not need to be contiguous',
        'Always use a temporary pointer to traverse — never move HEAD or you lose the start of the list',
        'Use the -> operator to access struct fields through a pointer: node->data, node->next',
        'Insert at head is O(1). Insert at tail or middle requires walking the list — O(n)',
        'Delete a node by rewiring the previous node\'s next to skip it, then free the deleted node',
        'Reverse a linked list using three pointers: prev, current, next — flip each arrow in one pass',
        'Doubly linked list: each node has prev and next — allows traversal in both directions',
        'Circular linked list: last node points back to head — use do-while to traverse, never check NULL',
        'Floyd\'s cycle detection: slow moves 1 step, fast moves 2 — if they meet, a loop exists',
      ]} />

    </LearnLayout>
  )
}