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

/* ── Hash table bucket visual ── */
const Bucket = ({ index, items, empty }: { index: number; items?: string[]; empty?: boolean }) => (
  <div style={{ display: 'flex', gap: 0, alignItems: 'center' }}>
    <div style={{ width: 36, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg2)', border: '1px solid var(--border)', borderRight: 'none', borderRadius: '6px 0 0 6px', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, flexShrink: 0 }}>
      [{index}]
    </div>
    <div style={{ minWidth: 120, height: 40, display: 'flex', alignItems: 'center', paddingLeft: 10, background: empty ? 'var(--bg2)' : 'rgba(0,230,118,0.06)', border: `1px solid ${empty ? 'var(--border)' : 'rgba(0,230,118,0.3)'}`, borderRadius: '0 6px 6px 0', gap: 6 }}>
      {empty
        ? <span style={{ fontSize: 11, color: 'var(--border)', fontFamily: 'var(--font-mono)' }}>NULL</span>
        : items?.map((item, i) => (
            <span key={i} style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', fontFamily: 'var(--font-mono)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 4, padding: '2px 7px' }}>
              {item}{i < (items?.length ?? 0) - 1 ? ' →' : ''}
            </span>
          ))
      }
    </div>
  </div>
)

export default function HashingPage() {
  return (
    <LearnLayout
      title="Unit 14 — Hashing"
      description="The technique behind O(1) lookup. Hash tables power database indexes, caches, password storage, and almost every fast system you have ever used. Built from scratch in C."
      section="DSA"
      readTime="75 min"
      updatedAt="March 2026"
    >

      {/* ── Badges ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'UNIT 14', green: true },
          { label: 'Prerequisite: Unit 05 — Linked Lists', green: false },
          { label: '75 min read', green: false },
        ].map((b) => (
          <span key={b.label} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: b.green ? 700 : 600, color: b.green ? 'var(--green)' : 'var(--muted)', background: b.green ? 'rgba(0,230,118,0.1)' : 'var(--surface)', border: `1px solid ${b.green ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`, borderRadius: 6, padding: '4px 10px' }}>
            {b.label}
          </span>
        ))}
      </div>

      <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Every data structure we have built so far searches by comparison —
        check this element, is it the one? Try the next. Binary search cuts
        this to O(log n). But hashing does something completely different:
        it calculates exactly where the data should be using arithmetic,
        then goes there directly. No comparison loop at all.
        The result is O(1) average lookup — constant time regardless of how many
        items you have stored.
      </p>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85 }}>
        In this unit we build a hash table from scratch — hash functions,
        collision handling with chaining, open addressing, and load factor.
        By the end you will understand exactly how Python dictionaries,
        JavaScript objects, and database indexes work under the hood.
      </p>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 1 — THE CORE IDEA
      ══════════════════════════════════════ */}
      <SectionTag text="Section 1" />
      <SectionTitle>The Core Idea — A Locker Room</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Imagine a gym locker room with 100 numbered lockers (0 to 99).
        You want to store your belongings. Instead of searching every locker,
        you use a rule: take your membership number, divide by 100,
        take the remainder — that is your locker. Membership 347 → locker 47.
        Membership 892 → locker 92. You always know exactly which locker is yours.
        No searching. No comparing. Just arithmetic.
      </p>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 28 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
          🔑 From locker room to hash table
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { gym: 'Locker room (100 lockers)', hash: 'Hash table (array of buckets)', color: 'var(--green)' },
            { gym: 'Membership number', hash: 'Key (what you want to store/find)', color: '#4285f4' },
            { gym: 'Your locker number', hash: 'Index in the array (hash value)', color: '#7b61ff' },
            { gym: 'The rule: memberNo % 100', hash: 'Hash function: maps key → index', color: '#f97316' },
            { gym: 'Your belongings in the locker', hash: 'Value stored at that index', color: '#facc15' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, background: 'var(--bg2)', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
              <div style={{ padding: '10px 14px', borderRight: '1px solid var(--border)', fontSize: 13, color: 'var(--muted)' }}>{item.gym}</div>
              <div style={{ padding: '10px 14px', fontSize: 13, color: item.color, fontWeight: 600 }}>{item.hash}</div>
            </div>
          ))}
        </div>
      </div>

      <Callout type="info">
        <strong>The key insight:</strong> A hash function converts a key (any value — a number,
        a string, an email address) into an array index. Given the same key, the same function
        always produces the same index. So lookup is just: compute the index, go there directly.
        No scanning. O(1).
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 2 — HASH FUNCTIONS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 2" />
      <SectionTitle>Hash Functions — The Formula That Maps Keys to Indices</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        A hash function takes a key and returns an index between 0 and SIZE-1.
        A good hash function distributes keys evenly across all buckets —
        if keys pile up in a few buckets, performance degrades.
        Here are the most common approaches.
      </p>

      <CodeBlock code={`#define SIZE 10  /* number of buckets in our hash table */

/* Method 1: Division method — key mod table size */
int hashInt(int key) {
    return key % SIZE;
    /* key=23  → 23%10  = 3
       key=47  → 47%10  = 7
       key=100 → 100%10 = 0  */
}

/* Method 2: Hash a string — sum of ASCII values mod SIZE */
int hashString(char *key) {
    int hash = 0;
    int i;
    for (i = 0; key[i] != '\\0'; i++) {
        hash += key[i];  /* add ASCII value of each character */
    }
    return hash % SIZE;
    /* "cat" → 99+97+116 = 312 → 312%10 = 2  */
}

/* Method 3: Better string hash (djb2 — widely used in real systems) */
int hashStringDJB2(char *key) {
    unsigned long hash = 5381;  /* magic seed value */
    int c;
    while ((c = *key++)) {
        hash = ((hash << 5) + hash) + c;  /* hash * 33 + c */
    }
    return (int)(hash % SIZE);
}

int main() {
    printf("hash(23)    = %d\\n", hashInt(23));       /* 3 */
    printf("hash(47)    = %d\\n", hashInt(47));       /* 7 */
    printf("hash(cat)   = %d\\n", hashString("cat")); /* 2 */
    printf("hash(dog)   = %d\\n", hashString("dog")); /* 8 */
    return 0;
}`} />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 28 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
          Properties of a good hash function:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { icon: '⚡', text: 'Fast to compute — O(1) or O(length of key)' },
            { icon: '📊', text: 'Uniform distribution — keys spread evenly, no bucket gets overloaded' },
            { icon: '🔄', text: 'Deterministic — same key always produces the same index' },
            { icon: '📦', text: 'Output always in range [0, SIZE-1] — use modulo to guarantee this' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 3 — COLLISIONS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 3" />
      <SectionTitle>Collisions — Two Keys, Same Bucket</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        A collision happens when two different keys hash to the same index.
        With a table of size 10 and keys like 13 and 23, both give index 3.
        Collisions are <strong style={{ color: 'var(--green)' }}>inevitable</strong> — by the
        pigeonhole principle, if you store more items than buckets there must be
        at least one collision. The question is not how to avoid them —
        it is how to handle them gracefully.
      </p>

      {/* Collision visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // hash(13) = 13%10 = 3 · hash(23) = 23%10 = 3 → COLLISION at index 3
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 800, color: 'var(--green)' }}>13</div>
            <div style={{ fontSize: 14, color: 'var(--muted)' }}>→ hash →</div>
            <div style={{ width: 44, height: 44, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 800, color: '#000', background: 'var(--green)', border: '2px solid var(--green)' }}>3</div>
          </div>
          <div style={{ fontSize: 22, color: '#ff4757', fontWeight: 900 }}>⚡</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 800, color: '#f97316' }}>23</div>
            <div style={{ fontSize: 14, color: 'var(--muted)' }}>→ hash →</div>
            <div style={{ width: 44, height: 44, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 800, color: '#000', background: '#f97316', border: '2px solid #f97316' }}>3</div>
          </div>
        </div>
        <div style={{ fontSize: 13, color: '#ff4757', marginTop: 14, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
          Both map to index 3 — where does 23 go?
        </div>
      </div>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        There are two main strategies to handle collisions. We will build both from scratch.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
        <div style={{ background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 10, padding: '16px 18px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green)', marginBottom: 8 }}>Chaining</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>
            Each bucket holds a linked list. Multiple keys at the same index
            form a chain. Fast and simple — never runs out of space.
          </div>
        </div>
        <div style={{ background: 'rgba(66,133,244,0.06)', border: '1px solid rgba(66,133,244,0.3)', borderRadius: 10, padding: '16px 18px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#4285f4', marginBottom: 8 }}>Open Addressing</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>
            All data stays in the array itself. On collision, probe the next
            available slot. More cache-friendly, trickier to implement.
          </div>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 4 — CHAINING
      ══════════════════════════════════════ */}
      <SectionTag text="Section 4" />
      <SectionTitle>Collision Handling — Chaining</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        With chaining, each bucket in the array is the head of a linked list.
        When two keys collide, both live in the same bucket — one after the other
        in the chain. To find a key, compute its hash (go to the bucket),
        then walk the chain until you find it.
      </p>

      {/* Chaining visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // Hash table with chaining after inserting 5, 15, 25, 7, 17, 3
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Bucket index={0} empty />
          <Bucket index={1} empty />
          <Bucket index={2} empty />
          <Bucket index={3} items={['3']} />
          <Bucket index={4} empty />
          <Bucket index={5} items={['5', '15', '25']} />
          <Bucket index={6} empty />
          <Bucket index={7} items={['7', '17']} />
          <Bucket index={8} empty />
          <Bucket index={9} empty />
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 14, fontFamily: 'var(--font-mono)' }}>
          5%10=5, 15%10=5, 25%10=5 → all chain at bucket 5
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define SIZE 10

/* each node in the chain stores a key-value pair */
struct Node {
    int key;
    int value;
    struct Node *next;
};
typedef struct Node Node;

/* hash table: array of linked list heads */
Node *table[SIZE];

void initTable() {
    int i;
    for (i = 0; i < SIZE; i++) table[i] = NULL;
}

int hash(int key) { return key % SIZE; }

/* insert key-value pair */
void insert(int key, int value) {
    int idx = hash(key);

    /* check if key already exists — update it */
    Node *current = table[idx];
    while (current != NULL) {
        if (current->key == key) {
            current->value = value;  /* update existing */
            return;
        }
        current = current->next;
    }

    /* key not found — insert new node at front of chain */
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->key   = key;
    newNode->value = value;
    newNode->next  = table[idx];  /* point to existing chain */
    table[idx]     = newNode;     /* new node becomes head */
}

/* search: returns value or -1 if not found */
int search(int key) {
    int idx = hash(key);
    Node *current = table[idx];

    while (current != NULL) {
        if (current->key == key) return current->value;
        current = current->next;
    }
    return -1;  /* not found */
}

/* delete a key */
void delete(int key) {
    int idx = hash(key);
    Node *current = table[idx];
    Node *prev = NULL;

    while (current != NULL) {
        if (current->key == key) {
            if (prev == NULL) {
                table[idx] = current->next;  /* removing head */
            } else {
                prev->next = current->next;  /* bypass this node */
            }
            free(current);
            return;
        }
        prev = current;
        current = current->next;
    }
}

void printTable() {
    int i;
    for (i = 0; i < SIZE; i++) {
        printf("[%d]: ", i);
        Node *current = table[i];
        while (current != NULL) {
            printf("(%d→%d) ", current->key, current->value);
            current = current->next;
        }
        printf("\\n");
    }
}

int main() {
    initTable();

    insert(5,  50);
    insert(15, 150);
    insert(25, 250);   /* all three collide at bucket 5 */
    insert(7,  70);
    insert(3,  30);

    printTable();

    printf("Search 15: %d\\n", search(15));  /* 150 */
    printf("Search 99: %d\\n", search(99));  /* -1  */

    delete(15);
    printf("After delete 15, search: %d\\n", search(15));  /* -1 */

    return 0;
}`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Average Case:</span>
          <ComplexityBadge value="O(1)" color="#00e676" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Worst Case:</span>
          <ComplexityBadge value="O(n)" color="#ff4757" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(all keys in one bucket)</span>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 5 — OPEN ADDRESSING
      ══════════════════════════════════════ */}
      <SectionTag text="Section 5" />
      <SectionTitle>Collision Handling — Open Addressing</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Open addressing keeps everything in the array itself — no linked lists, no extra memory.
        When a collision occurs, it <strong style={{ color: 'var(--green)' }}>probes</strong> for
        the next empty slot. There are three probing strategies.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {[
          {
            name: 'Linear Probing',
            formula: 'index = (hash(key) + i) % SIZE',
            desc: 'Try next slot, then the one after, then the one after that. Simple but causes "clustering" — occupied slots clump together and slow down future searches.',
            color: 'var(--green)',
          },
          {
            name: 'Quadratic Probing',
            formula: 'index = (hash(key) + i²) % SIZE',
            desc: 'Jump by increasing squares: +1, +4, +9, +16... Reduces primary clustering but can cause secondary clustering.',
            color: '#4285f4',
          },
          {
            name: 'Double Hashing',
            formula: 'index = (hash1(key) + i × hash2(key)) % SIZE',
            desc: 'Use a second hash function to determine the step size. Best distribution, eliminates clustering. Most complex to implement.',
            color: '#7b61ff',
          },
        ].map((item) => (
          <div key={item.name} style={{ background: 'var(--surface)', border: `1px solid ${item.color}33`, borderRadius: 10, padding: '16px 20px' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: item.color }}>{item.name}</div>
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', background: 'var(--bg2)', padding: '2px 8px', borderRadius: 4 }}>{item.formula}</code>
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Linear probing trace */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // Linear probing — inserting 5, 15, 25 into table of size 10
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { state: [null,null,null,null,null,5,null,null,null,null], hi: 5, note: 'Insert 5: hash=5, slot 5 empty → place here' },
            { state: [null,null,null,null,null,5,15,null,null,null], hi: 6, note: 'Insert 15: hash=5, slot 5 taken → probe slot 6, empty → place here' },
            { state: [null,null,null,null,null,5,15,25,null,null], hi: 7, note: 'Insert 25: hash=5, slot 5 taken → slot 6 taken → slot 7 empty → place here' },
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 0 }}>
                {step.state.map((v, vi) => (
                  <div key={vi} style={{ textAlign: 'center' }}>
                    <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 800, color: vi === step.hi ? '#000' : v ? 'var(--green)' : 'var(--border)', background: vi === step.hi ? 'var(--green)' : v ? 'rgba(0,230,118,0.08)' : 'var(--bg2)', border: `1px solid ${vi === step.hi ? 'var(--green)' : v ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`, borderRight: vi < 9 ? 'none' : undefined }}>
                      {v ?? '—'}
                    </div>
                    <div style={{ fontSize: 9, color: 'var(--muted)', marginTop: 3, fontFamily: 'var(--font-mono)' }}>{vi}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11, color: i === 2 ? '#f97316' : 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{step.note}</div>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <string.h>

#define SIZE 10
#define EMPTY -1
#define DELETED -2  /* tombstone — marks a deleted slot */

int keys[SIZE];
int values[SIZE];

void initTableOA() {
    int i;
    for (i = 0; i < SIZE; i++) {
        keys[i]   = EMPTY;
        values[i] = EMPTY;
    }
}

int hash(int key) { return key % SIZE; }

void insertOA(int key, int value) {
    int idx = hash(key);
    int i;

    for (i = 0; i < SIZE; i++) {
        int probe = (idx + i) % SIZE;  /* linear probing */

        /* empty or deleted slot — insert here */
        if (keys[probe] == EMPTY || keys[probe] == DELETED) {
            keys[probe]   = key;
            values[probe] = value;
            return;
        }
        /* key already exists — update */
        if (keys[probe] == key) {
            values[probe] = value;
            return;
        }
    }
    printf("Table is full\\n");
}

int searchOA(int key) {
    int idx = hash(key);
    int i;

    for (i = 0; i < SIZE; i++) {
        int probe = (idx + i) % SIZE;

        if (keys[probe] == EMPTY) return -1;  /* empty slot = not in table */
        if (keys[probe] == key)   return values[probe];  /* found */
        /* DELETED slot — keep probing past it */
    }
    return -1;
}

void deleteOA(int key) {
    int idx = hash(key);
    int i;

    for (i = 0; i < SIZE; i++) {
        int probe = (idx + i) % SIZE;

        if (keys[probe] == EMPTY) return;  /* not found */
        if (keys[probe] == key) {
            keys[probe] = DELETED;  /* tombstone — do NOT set to EMPTY */
            return;                  /* EMPTY would break chains for other keys */
        }
    }
}

int main() {
    initTableOA();

    insertOA(5,  50);
    insertOA(15, 150);  /* collides at 5 → goes to 6 */
    insertOA(25, 250);  /* collides at 5,6 → goes to 7 */
    insertOA(7,  70);   /* collides at 7 → goes to 8 */

    printf("Search 15: %d\\n", searchOA(15));  /* 150 */
    printf("Search 25: %d\\n", searchOA(25));  /* 250 */

    deleteOA(15);
    printf("After delete 15: %d\\n", searchOA(15));  /* -1 */
    printf("Search 25 still works: %d\\n", searchOA(25)); /* 250 — tombstone preserved chain */

    return 0;
}`} />

      <Callout type="warning">
        <strong>The tombstone trick for deletion:</strong> In open addressing, you must never
        set a deleted slot back to EMPTY. If you do, future searches for keys that probed
        past this slot will stop early and incorrectly report "not found."
        Instead mark it as DELETED (a tombstone) — searches skip over it,
        new inserts can reuse it.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 6 — LOAD FACTOR
      ══════════════════════════════════════ */}
      <SectionTag text="Section 6" />
      <SectionTitle>Load Factor — When to Resize</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        The <strong style={{ color: 'var(--green)' }}>load factor</strong> (λ) is the ratio of
        stored elements to the number of buckets:
      </p>

      <div style={{ background: 'rgba(0,230,118,0.06)', border: '2px solid rgba(0,230,118,0.3)', borderRadius: 10, padding: '16px 24px', marginBottom: 24, textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 900, color: 'var(--green)' }}>
          λ = number of elements / number of buckets
        </div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8 }}>
          10 elements in a table of 20 buckets → λ = 0.5
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
        {[
          { range: 'λ < 0.5', color: 'var(--green)', status: 'Ideal', desc: 'Very few collisions. O(1) average lookup. Table has plenty of room.' },
          { range: '0.5 ≤ λ ≤ 0.75', color: '#facc15', status: 'Acceptable', desc: 'Some collisions but still fast. Most production systems target this range.' },
          { range: 'λ > 0.75', color: '#f97316', status: 'Degrading', desc: 'Collision chains grow. Performance approaching O(n). Time to resize.' },
          { range: 'λ = 1.0+', color: '#ff4757', status: 'Critical', desc: 'Open addressing breaks completely — no empty slots to probe. Chaining still works but slowly.' },
        ].map((item) => (
          <div key={item.range} style={{ display: 'flex', gap: 0, background: 'var(--surface)', border: `1px solid ${item.color}33`, borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ width: 4, background: item.color, flexShrink: 0 }} />
            <div style={{ padding: '12px 16px', flex: 1, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800, color: item.color, minWidth: 120 }}>{item.range}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: item.color, background: `${item.color}15`, border: `1px solid ${item.color}33`, borderRadius: 4, padding: '2px 8px' }}>{item.status}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, flex: 1 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        When the load factor exceeds a threshold (typically 0.75), the table is
        <strong style={{ color: 'var(--green)' }}> rehashed</strong> — a new larger array
        is created (usually double the size), and every existing key is re-inserted
        using the new hash function (new SIZE).
      </p>

      <CodeBlock code={`/* conceptual rehash — double the table size when load factor > 0.75 */
void rehash(Node **oldTable, int oldSize) {
    int newSize = oldSize * 2;  /* double the size */
    Node **newTable = calloc(newSize, sizeof(Node*));

    /* re-insert all existing elements using new size */
    int i;
    for (i = 0; i < oldSize; i++) {
        Node *current = oldTable[i];
        while (current != NULL) {
            int newIdx = current->key % newSize;  /* NEW hash with new size */

            /* insert into new table */
            Node *newNode = malloc(sizeof(Node));
            newNode->key   = current->key;
            newNode->value = current->value;
            newNode->next  = newTable[newIdx];
            newTable[newIdx] = newNode;

            current = current->next;
        }
    }
    /* swap old table with new (simplified — in practice free old table) */
}`} />

      <Callout type="info">
        <strong>Real-world load factors:</strong> Java's HashMap rehashes at λ = 0.75 (the default).
        Python's dict rehashes at λ = 0.67. Redis uses incremental rehashing —
        it spreads the cost over many operations instead of one big pause.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 7 — COMPLETE HASH TABLE
      ══════════════════════════════════════ */}
      <SectionTag text="Section 7" />
      <SectionTitle>Complete Hash Table — String Keys</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Let us build a complete, working hash table that stores string key → integer value pairs.
        This is exactly what Python's dictionary and JavaScript's object do internally.
      </p>

      <CodeBlock code={`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TABLE_SIZE 16

struct Entry {
    char *key;
    int   value;
    struct Entry *next;
};
typedef struct Entry Entry;

Entry *hashTable[TABLE_SIZE];

/* djb2 hash for strings */
int hashStr(char *key) {
    unsigned long h = 5381;
    int c;
    while ((c = *key++)) h = ((h << 5) + h) + c;
    return (int)(h % TABLE_SIZE);
}

void htInsert(char *key, int value) {
    int idx = hashStr(key);
    Entry *current = hashTable[idx];

    /* update if key already exists */
    while (current) {
        if (strcmp(current->key, key) == 0) {
            current->value = value;
            return;
        }
        current = current->next;
    }

    /* create new entry */
    Entry *e  = malloc(sizeof(Entry));
    e->key    = strdup(key);  /* copy the key string */
    e->value  = value;
    e->next   = hashTable[idx];
    hashTable[idx] = e;
}

int htSearch(char *key, int *found) {
    int idx = hashStr(key);
    Entry *current = hashTable[idx];

    while (current) {
        if (strcmp(current->key, key) == 0) {
            *found = 1;
            return current->value;
        }
        current = current->next;
    }
    *found = 0;
    return -1;
}

void htDelete(char *key) {
    int idx = hashStr(key);
    Entry *current = hashTable[idx];
    Entry *prev = NULL;

    while (current) {
        if (strcmp(current->key, key) == 0) {
            if (prev) prev->next = current->next;
            else hashTable[idx] = current->next;
            free(current->key);
            free(current);
            return;
        }
        prev = current;
        current = current->next;
    }
}

int main() {
    /* initialise all buckets to NULL */
    int i;
    for (i = 0; i < TABLE_SIZE; i++) hashTable[i] = NULL;

    /* store student marks */
    htInsert("Aisha",  92);
    htInsert("Rohan",  85);
    htInsert("Priya",  78);
    htInsert("Kiran",  95);
    htInsert("Dev",    88);

    int found;
    printf("Aisha:  %d\\n", htSearch("Aisha",  &found));  /* 92 */
    printf("Priya:  %d\\n", htSearch("Priya",  &found));  /* 78 */
    printf("Kiran:  %d\\n", htSearch("Kiran",  &found));  /* 95 */

    /* update */
    htInsert("Rohan", 90);
    printf("Rohan updated: %d\\n", htSearch("Rohan", &found)); /* 90 */

    /* delete */
    htDelete("Dev");
    htSearch("Dev", &found);
    printf("Dev found: %s\\n", found ? "yes" : "no");  /* no */

    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 8 — REAL WORLD
      ══════════════════════════════════════ */}
      <SectionTag text="Section 8" />
      <SectionTitle>Hashing in the Real World</SectionTitle>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {[
          {
            icon: '🐍',
            title: 'Python dict and set',
            desc: 'Every Python dictionary is a hash table. d["name"] = "Asil" uses a hash function on "name" to find the bucket. Average O(1) for get, set, and delete. Python uses open addressing with pseudo-random probing.',
          },
          {
            icon: '🔐',
            title: 'Password storage',
            desc: 'Websites never store your actual password. They store hash("yourpassword" + salt). When you log in, they hash your input and compare. Even if the database leaks, passwords cannot be reversed — hash functions are one-way.',
          },
          {
            icon: '🗄️',
            title: 'Database indexes',
            desc: 'Hash indexes in PostgreSQL and MySQL give O(1) exact lookups on equality queries (WHERE id = 5). They are faster than B-tree indexes for equality but cannot do range queries (BETWEEN).',
          },
          {
            icon: '⚡',
            title: 'Caching (Redis, Memcached)',
            desc: 'Redis is essentially a distributed hash table. SET key value and GET key are hash table insert and lookup. Used by Twitter, GitHub, and Snapchat to serve millions of requests per second.',
          },
          {
            icon: '🧬',
            title: 'Compiler symbol tables',
            desc: 'When a compiler sees a variable name, it looks it up in a symbol table — a hash table mapping names to types and memory locations. Every function call, every variable access goes through this table.',
          },
        ].map((item) => (
          <div key={item.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px' }}>
            <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 9 — COMPARISON TABLE
      ══════════════════════════════════════ */}
      <SectionTag text="Section 9" />
      <SectionTitle>Chaining vs Open Addressing — When to Use Which</SectionTitle>

      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Aspect', 'Chaining', 'Open Addressing'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, background: 'var(--surface)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Memory', 'Extra memory for pointers', 'No extra memory — all in array'],
              ['Load factor', 'Works fine above 1.0', 'Must stay below 1.0 (no empty slots)'],
              ['Cache performance', 'Poor — linked list nodes scattered', 'Excellent — everything in one array'],
              ['Deletion', 'Simple — remove from chain', 'Needs tombstones — tricky'],
              ['Implementation', 'Easier to implement correctly', 'Trickier — probing + tombstones'],
              ['Best for', 'Unknown or high load, large values', 'Known load under 0.7, small values'],
            ].map(([aspect, chain, open], ri) => (
              <tr key={ri}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)', fontWeight: 600 }}>{aspect}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>{chain}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>{open}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Errors */}
      <SectionTag text="Errors You Will Hit" />
      <SectionTitle>Common Hashing Mistakes</SectionTitle>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
        {[
          {
            title: 'Using % SIZE with a non-prime table size',
            symptom: 'Keys cluster into a small number of buckets — poor distribution',
            fix: 'Use a prime number for table size (7, 13, 31, 61...). Prime sizes reduce patterns in hash(key) % SIZE. Many production tables use prime or power-of-2 sizes with special hash functions.',
          },
          {
            title: 'Setting deleted slot to EMPTY in open addressing',
            symptom: 'Searches incorrectly return "not found" for keys that probed past the deleted slot',
            fix: 'Always use a DELETED tombstone constant, never EMPTY, when deleting in open addressing. Searches skip over DELETED but stop at EMPTY.',
          },
          {
            title: 'Not handling negative hash values',
            symptom: 'Negative array index — program crashes or reads garbage',
            fix: 'key % SIZE can be negative in C if key is negative. Use abs(key) % SIZE or cast: (unsigned)key % SIZE to guarantee a non-negative index.',
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
      <SectionTitle>You Are Ready for Unit 15</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        You now understand hashing completely — hash functions, collision handling
        with both chaining and open addressing, load factor, rehashing, and why
        Python dicts, Redis, and database indexes all use this technique.
        O(1) average lookup is one of the most powerful tools in all of computing.
      </p>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 32 }}>
        In Unit 15 we cover <strong style={{ color: 'var(--text)' }}>Graphs</strong> —
        the most general and most powerful data structure in DSA. Nodes connected by edges
        in any direction. Maps, social networks, flight routes, dependency graphs —
        every complex relationship is a graph. We build BFS, DFS, Dijkstra's shortest path,
        and topological sort from scratch.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(0,230,118,0.02) 100%)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 12, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 700, marginBottom: 6 }}>UP NEXT → UNIT 15</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Graphs — The Most Powerful Data Structure</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>BFS, DFS, Dijkstra's, topological sort — adjacency list in C.</div>
        </div>
        <Link href="/learn/dsa/graphs" style={{ background: 'var(--green)', color: '#000', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '10px 22px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Coming Soon →
        </Link>
      </div>

      <KeyTakeaways items={[
        'Hashing converts a key into an array index using a hash function — enables O(1) average lookup',
        'Hash function: key % SIZE for integers, sum of ASCII values % SIZE for strings — must be fast and uniform',
        'Collisions are inevitable — two keys producing the same index must be handled',
        'Chaining: each bucket is a linked list — simple, works above load factor 1.0, poor cache performance',
        'Open addressing: probe for next empty slot — linear probing, quadratic, double hashing',
        'Tombstone deletion: in open addressing, mark deleted slots as DELETED not EMPTY — or searches break',
        'Load factor λ = elements / buckets — keep below 0.75 for good performance, rehash when exceeded',
        'Rehashing: create new larger array (double size), re-insert all keys with new hash',
        'Python dict, JavaScript object, Java HashMap, Redis — all hash tables under the hood',
        'Hash tables do NOT support range queries or sorted output — use BST/B-tree for those needs',
      ]} />

    </LearnLayout>
  )
}