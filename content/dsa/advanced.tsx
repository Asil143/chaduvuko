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

const TopicHeader = ({ num, name, tagline, time, space, color = 'var(--green)' }: { num: string; name: string; tagline: string; time: string; space: string; color?: string }) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${color}33`, borderRadius: 12, overflow: 'hidden', marginTop: 40, marginBottom: 0 }}>
    <div style={{ background: `${color}08`, borderBottom: `1px solid ${color}22`, padding: '16px 22px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color, background: `${color}15`, border: `1px solid ${color}33`, borderRadius: 4, padding: '2px 8px' }}>{num}</span>
      <div>
        <div style={{ fontSize: 16, fontWeight: 900, color, fontFamily: 'var(--font-display)' }}>{name}</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{tagline}</div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
        <ComplexityBadge value={`Query: ${time}`} color={color} />
        <ComplexityBadge value={`Space: ${space}`} color="#4285f4" />
      </div>
    </div>
  </div>
)

export default function AdvancedPage() {
  return (
    <LearnLayout
      title="Unit 19 — Advanced Topics"
      description="The final level. Segment Trees, Fenwick Trees, Tries, Union-Find, Sliding Window, Two Pointers, and Bit Manipulation — the techniques that separate good engineers from great ones in product company interviews."
      section="DSA"
      readTime="180 min"
      updatedAt="March 2026"
    >

      {/* ── Badges ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'UNIT 19', green: true },
          { label: 'Prerequisite: All previous units', green: false },
          { label: '180 min read', green: false },
          { label: 'Final Unit 🎓', green: false },
        ].map((b) => (
          <span key={b.label} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: b.green ? 700 : 600, color: b.green ? 'var(--green)' : 'var(--muted)', background: b.green ? 'rgba(0,230,118,0.1)' : 'var(--surface)', border: `1px solid ${b.green ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`, borderRadius: 6, padding: '4px 10px' }}>
            {b.label}
          </span>
        ))}
      </div>

      <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        You have come a long way. From understanding what a variable is in Unit 00 to
        implementing graphs, dynamic programming, and backtracking — you now have a stronger
        DSA foundation than most working engineers. This final unit covers the advanced
        techniques that appear in senior-level interviews and competitive programming:
        efficient range queries, prefix trees, union-find, and the elegant two-pointer
        and sliding window patterns that turn O(n²) solutions into O(n).
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>
        Each topic here is a complete sub-field. We cover the core idea, the key operations,
        and the problems each one solves — with full C code throughout.
      </p>

      {/* Topics overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, marginTop: 32, marginBottom: 0 }}>
        {[
          { num: '19.1', name: 'Segment Tree', use: 'Range sum / min / max queries with updates', color: 'var(--green)' },
          { num: '19.2', name: 'Fenwick Tree (BIT)', use: 'Prefix sums with point updates in O(log n)', color: '#4285f4' },
          { num: '19.3', name: 'Trie', use: 'Prefix search, autocomplete, word lookup', color: '#7b61ff' },
          { num: '19.4', name: 'Union-Find (DSU)', use: 'Connected components, Kruskal\'s MST', color: '#f97316' },
          { num: '19.5', name: 'Sliding Window', use: 'Subarray problems in O(n)', color: '#facc15' },
          { num: '19.6', name: 'Two Pointers', use: 'Pair sum, sorted array problems in O(n)', color: '#00e676' },
          { num: '19.7', name: 'Bit Manipulation', use: 'XOR tricks, set/clear bits, fast operations', color: '#8b5cf6' },
        ].map((item) => (
          <div key={item.num} style={{ background: 'var(--surface)', border: `1px solid ${item.color}33`, borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: item.color, fontWeight: 700, marginBottom: 6 }}>{item.num}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 5 }}>{item.name}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.65 }}>{item.use}</div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          19.1 — SEGMENT TREE
      ══════════════════════════════════════ */}
      <TopicHeader num="19.1" name="Segment Tree" tagline="Answer range queries and point updates in O(log n)" time="O(log n)" space="O(4n)" color="var(--green)" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          You have an array and need to answer many queries like "what is the sum of elements
          from index 3 to 7?" or "what is the minimum between index 2 and 9?" If the array
          never changes, prefix sums handle this in O(1). But if the array gets updated
          frequently, prefix sums become O(n) per update. A Segment Tree does both —
          query AND update — in O(log n).
        </p>
      </div>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        A Segment Tree is a binary tree where each node stores the answer for a range of
        the array. The root covers the entire array. Each leaf covers one element.
        Internal nodes cover the union of their children's ranges. It is stored as an
        array — just like a heap — with the same index formulas.
      </p>

      {/* Segment tree visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // Segment tree for sum — array [1, 3, 5, 7, 9, 11]
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          {/* Level 0 — root */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ background: 'rgba(0,230,118,0.15)', border: '2px solid var(--green)', borderRadius: 8, padding: '6px 16px', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800, color: 'var(--green)' }}>36 [0..5]</div>
            <div style={{ width: 2, height: 14, background: 'var(--border)' }} />
          </div>
          {/* Level 1 */}
          <div style={{ display: 'flex', gap: 60, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ background: 'rgba(66,133,244,0.1)', border: '2px solid #4285f4', borderRadius: 8, padding: '5px 12px', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: '#4285f4' }}>9 [0..2]</div>
              <div style={{ width: 2, height: 14, background: 'var(--border)' }} />
              <div style={{ display: 'flex', gap: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(123,97,255,0.1)', border: '1px solid #7b61ff', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#7b61ff' }}>4 [0..1]</div>
                  <div style={{ width: 2, height: 12, background: 'var(--border)' }} />
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '3px 8px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>1[0]</div>
                    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '3px 8px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>3[1]</div>
                  </div>
                </div>
                <div style={{ background: 'rgba(123,97,255,0.1)', border: '1px solid #7b61ff', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#7b61ff' }}>5[2]</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ background: 'rgba(66,133,244,0.1)', border: '2px solid #4285f4', borderRadius: 8, padding: '5px 12px', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: '#4285f4' }}>27 [3..5]</div>
              <div style={{ width: 2, height: 14, background: 'var(--border)' }} />
              <div style={{ display: 'flex', gap: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(123,97,255,0.1)', border: '1px solid #7b61ff', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#7b61ff' }}>16 [3..4]</div>
                  <div style={{ width: 2, height: 12, background: 'var(--border)' }} />
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '3px 8px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>7[3]</div>
                    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '3px 8px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>9[4]</div>
                  </div>
                </div>
                <div style={{ background: 'rgba(123,97,255,0.1)', border: '1px solid #7b61ff', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#7b61ff' }}>11[5]</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

#define MAXN 100
int seg[4 * MAXN];  /* segment tree array — needs 4x the input size */

/* build the segment tree */
void build(int arr[], int node, int start, int end) {
    if (start == end) {
        seg[node] = arr[start];  /* leaf: store the element itself */
        return;
    }
    int mid = (start + end) / 2;
    build(arr, 2*node,   start, mid);    /* build left child */
    build(arr, 2*node+1, mid+1, end);    /* build right child */
    seg[node] = seg[2*node] + seg[2*node+1];  /* internal: sum of children */
}

/* range sum query: sum of arr[l..r] */
int query(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return 0;   /* range completely outside */
    if (l <= start && end <= r) return seg[node];  /* range completely inside */

    int mid = (start + end) / 2;
    int leftSum  = query(2*node,   start, mid,   l, r);
    int rightSum = query(2*node+1, mid+1, end,   l, r);
    return leftSum + rightSum;
}

/* point update: set arr[idx] = val */
void update(int node, int start, int end, int idx, int val) {
    if (start == end) {
        seg[node] = val;  /* update the leaf */
        return;
    }
    int mid = (start + end) / 2;
    if (idx <= mid) update(2*node,   start, mid,   idx, val);
    else            update(2*node+1, mid+1, end,   idx, val);
    seg[node] = seg[2*node] + seg[2*node+1];  /* recompute internal node */
}

int main() {
    int arr[] = {1, 3, 5, 7, 9, 11};
    int n = 6;

    build(arr, 1, 0, n-1);

    printf("Sum [1..3]: %d\\n", query(1, 0, n-1, 1, 3));  /* 3+5+7 = 15 */
    printf("Sum [0..5]: %d\\n", query(1, 0, n-1, 0, 5));  /* 1+3+5+7+9+11 = 36 */

    update(1, 0, n-1, 1, 10);  /* set arr[1] = 10 (was 3) */
    printf("Sum [1..3] after update: %d\\n", query(1, 0, n-1, 1, 3));  /* 10+5+7 = 22 */

    return 0;
}`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Build:</span>
          <ComplexityBadge value="O(n)" color="#00e676" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Query / Update:</span>
          <ComplexityBadge value="O(log n)" color="#00e676" />
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          19.2 — FENWICK TREE (BIT)
      ══════════════════════════════════════ */}
      <TopicHeader num="19.2" name="Fenwick Tree (BIT)" tagline="Prefix sums with updates — simpler than Segment Tree, same O(log n)" time="O(log n)" space="O(n)" color="#4285f4" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          A Binary Indexed Tree (BIT or Fenwick Tree) is a simpler alternative to the Segment Tree
          for prefix sum queries with point updates. It uses a clever trick with the lowest set bit
          of an index to navigate the tree implicitly — no explicit tree structure needed.
          The code is remarkably short for what it does.
        </p>
      </div>

      <CodeBlock code={`#include <stdio.h>

#define MAXN 100
int bit[MAXN + 1];  /* 1-indexed */
int n;

/* get the lowest set bit of i */
/* e.g. lowbit(6) = lowbit(110₂) = 010₂ = 2 */
int lowbit(int i) { return i & (-i); }

/* point update: add delta to position i */
void updateBIT(int i, int delta) {
    for (; i <= n; i += lowbit(i)) {
        bit[i] += delta;
    }
}

/* prefix sum query: sum of arr[1..i] */
int queryBIT(int i) {
    int sum = 0;
    for (; i > 0; i -= lowbit(i)) {
        sum += bit[i];
    }
    return sum;
}

/* range sum query: sum of arr[l..r] */
int rangeQuery(int l, int r) {
    return queryBIT(r) - queryBIT(l - 1);
}

int main() {
    int arr[] = {0, 1, 3, 5, 7, 9, 11};  /* 1-indexed, arr[0] unused */
    n = 6;
    int i;

    /* build BIT from array */
    for (i = 1; i <= n; i++) updateBIT(i, arr[i]);

    printf("Prefix sum [1..3]: %d\\n", queryBIT(3));       /* 1+3+5 = 9 */
    printf("Range sum  [2..5]: %d\\n", rangeQuery(2, 5));  /* 3+5+7+9 = 24 */

    updateBIT(2, 7);  /* add 7 to position 2: arr[2] becomes 3+7=10 */
    printf("After update, range [2..5]: %d\\n", rangeQuery(2, 5)); /* 10+5+7+9 = 31 */

    return 0;
}`} />

      <Callout type="tip">
        <strong>BIT vs Segment Tree:</strong> BIT is shorter and faster in practice for prefix sum + point update.
        Segment Tree is more flexible — it can handle range updates, range min/max, and custom operations.
        For pure prefix sum problems, always reach for BIT first.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          19.3 — TRIE
      ══════════════════════════════════════ */}
      <TopicHeader num="19.3" name="Trie (Prefix Tree)" tagline="Insert and search strings in O(length) — powers autocomplete and spell check" time="O(L)" space="O(alphabet × nodes)" color="#7b61ff" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          A Trie is a tree where each path from root to a node spells a string.
          Every character of a word occupies one node. Words that share a prefix
          share the same path from the root. Insert, search, and prefix-check
          all run in O(L) where L is the string length — independent of how many
          strings are stored. Google search suggestions, phone autocomplete,
          and dictionary lookups all use tries.
        </p>
      </div>

      {/* Trie visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // Trie after inserting: "cat", "can", "car", "bat", "bad"
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', lineHeight: 2.4 }}>
          <span style={{ color: 'var(--green)', fontWeight: 700 }}>ROOT</span><br />
          ├── <span style={{ color: '#7b61ff' }}>c</span><br />
          │{'   '}└── <span style={{ color: '#7b61ff' }}>a</span><br />
          │{'       '}├── <span style={{ color: '#7b61ff' }}>t</span> <span style={{ color: 'var(--green)' }}>← "cat" ends here ✓</span><br />
          │{'       '}├── <span style={{ color: '#7b61ff' }}>n</span> <span style={{ color: 'var(--green)' }}>← "can" ends here ✓</span><br />
          │{'       '}└── <span style={{ color: '#7b61ff' }}>r</span> <span style={{ color: 'var(--green)' }}>← "car" ends here ✓</span><br />
          └── <span style={{ color: '#f97316' }}>b</span><br />
          {'    '}└── <span style={{ color: '#f97316' }}>a</span><br />
          {'        '}├── <span style={{ color: '#f97316' }}>t</span> <span style={{ color: 'var(--green)' }}>← "bat" ends here ✓</span><br />
          {'        '}└── <span style={{ color: '#f97316' }}>d</span> <span style={{ color: 'var(--green)' }}>← "bad" ends here ✓</span>
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define ALPHA 26  /* 26 lowercase letters */

struct TrieNode {
    struct TrieNode *children[ALPHA];
    int isEnd;  /* 1 if this node marks end of a word */
};
typedef struct TrieNode TrieNode;

TrieNode* newNode() {
    TrieNode *node = calloc(1, sizeof(TrieNode));
    node->isEnd = 0;
    return node;
}

/* insert a word into the trie */
void insert(TrieNode *root, char *word) {
    TrieNode *current = root;
    int i;
    for (i = 0; word[i]; i++) {
        int idx = word[i] - 'a';  /* 'a'=0, 'b'=1, ... 'z'=25 */
        if (!current->children[idx]) {
            current->children[idx] = newNode();
        }
        current = current->children[idx];
    }
    current->isEnd = 1;  /* mark end of word */
}

/* search: returns 1 if exact word exists */
int search(TrieNode *root, char *word) {
    TrieNode *current = root;
    int i;
    for (i = 0; word[i]; i++) {
        int idx = word[i] - 'a';
        if (!current->children[idx]) return 0;  /* character not found */
        current = current->children[idx];
    }
    return current->isEnd;  /* 1 only if a complete word ends here */
}

/* startsWith: returns 1 if any word starts with given prefix */
int startsWith(TrieNode *root, char *prefix) {
    TrieNode *current = root;
    int i;
    for (i = 0; prefix[i]; i++) {
        int idx = prefix[i] - 'a';
        if (!current->children[idx]) return 0;
        current = current->children[idx];
    }
    return 1;  /* prefix exists */
}

int main() {
    TrieNode *root = newNode();

    insert(root, "cat");
    insert(root, "can");
    insert(root, "car");
    insert(root, "bat");
    insert(root, "bad");

    printf("Search 'cat':    %d\\n", search(root, "cat"));      /* 1 */
    printf("Search 'ca':     %d\\n", search(root, "ca"));       /* 0 — not a word */
    printf("Prefix 'ca':     %d\\n", startsWith(root, "ca"));   /* 1 — prefix exists */
    printf("Prefix 'xyz':    %d\\n", startsWith(root, "xyz"));  /* 0 */
    printf("Search 'dog':    %d\\n", search(root, "dog"));      /* 0 */

    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          19.4 — UNION FIND (DSU)
      ══════════════════════════════════════ */}
      <TopicHeader num="19.4" name="Union-Find (DSU)" tagline="Group elements into sets. Check if two elements are connected in near O(1)" time="≈ O(1) amortised" space="O(n)" color="#f97316" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          Union-Find (also called Disjoint Set Union, DSU) maintains a collection of disjoint sets
          and supports two operations: union (merge two sets) and find (which set does an element
          belong to). With path compression and union by rank, both operations run in nearly O(1)
          amortised time. Used in Kruskal's MST, network connectivity, and image segmentation.
        </p>
      </div>

      <CodeBlock code={`#include <stdio.h>

#define MAXN 100
int parent[MAXN];
int rank_arr[MAXN];  /* rank for union by rank */

/* initialise: each element is its own parent */
void initDSU(int n) {
    int i;
    for (i = 0; i < n; i++) {
        parent[i] = i;   /* each node is its own root */
        rank_arr[i] = 0;
    }
}

/* find: returns the root of x's set — with PATH COMPRESSION */
int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);  /* compress: point directly to root */
    }
    return parent[x];
}

/* union: merge the sets containing x and y — UNION BY RANK */
void unite(int x, int y) {
    int rootX = find(x);
    int rootY = find(y);
    if (rootX == rootY) return;  /* already in same set */

    /* attach smaller tree under larger tree */
    if (rank_arr[rootX] < rank_arr[rootY]) {
        parent[rootX] = rootY;
    } else if (rank_arr[rootX] > rank_arr[rootY]) {
        parent[rootY] = rootX;
    } else {
        parent[rootY] = rootX;
        rank_arr[rootX]++;  /* same rank — increase rank of new root */
    }
}

/* check if x and y are in the same set */
int connected(int x, int y) {
    return find(x) == find(y);
}

int main() {
    initDSU(6);  /* 6 elements: 0 to 5 */

    unite(0, 1);  /* {0,1}, {2}, {3}, {4}, {5} */
    unite(1, 2);  /* {0,1,2}, {3}, {4}, {5} */
    unite(3, 4);  /* {0,1,2}, {3,4}, {5} */

    printf("0 and 2 connected: %d\\n", connected(0, 2)); /* 1 — yes */
    printf("0 and 3 connected: %d\\n", connected(0, 3)); /* 0 — no */
    printf("3 and 4 connected: %d\\n", connected(3, 4)); /* 1 — yes */

    unite(2, 3);  /* {0,1,2,3,4}, {5} */
    printf("0 and 4 connected: %d\\n", connected(0, 4)); /* 1 — now yes */

    return 0;
}`} />

      <Callout type="info">
        <strong>Path compression + union by rank</strong> together give nearly O(1) amortised time
        per operation (technically O(α(n)) where α is the inverse Ackermann function —
        effectively constant for all practical n). Without these optimisations,
        naive union-find degrades to O(n) per operation.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          19.5 — SLIDING WINDOW
      ══════════════════════════════════════ */}
      <TopicHeader num="19.5" name="Sliding Window" tagline="Solve subarray problems in O(n) instead of O(n²)" time="O(n)" space="O(1)" color="#facc15" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          Many problems ask: "find the subarray of size k with the maximum sum" or
          "find the smallest subarray with sum ≥ target." A naive approach checks all
          subarrays in O(n²). The sliding window technique maintains a window that slides
          across the array — expanding and contracting as needed — in a single O(n) pass.
        </p>
      </div>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        The idea: instead of recomputing the sum from scratch for each subarray,
        maintain a running window. When the window slides right, add the new element
        and remove the leftmost element. One addition, one subtraction — O(1) per step.
      </p>

      {/* Sliding window visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // Max sum subarray of size k=3 in [2, 1, 5, 1, 3, 2]
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { arr: [2,1,5,1,3,2], win: [0,1,2], sum: 8,  note: 'Window [0..2]: 2+1+5 = 8' },
            { arr: [2,1,5,1,3,2], win: [1,2,3], sum: 7,  note: 'Slide right: -2+1 = 7' },
            { arr: [2,1,5,1,3,2], win: [2,3,4], sum: 9,  note: 'Slide right: -1+3 = 9 ← MAX' },
            { arr: [2,1,5,1,3,2], win: [3,4,5], sum: 6,  note: 'Slide right: -5+2 = 6' },
          ].map((step, si) => (
            <div key={si} style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 0 }}>
                {step.arr.map((v, vi) => (
                  <div key={vi} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 800, color: step.win.includes(vi) ? '#000' : 'var(--muted)', background: step.win.includes(vi) ? (si === 2 ? 'var(--green)' : '#facc15') : 'var(--bg2)', border: `1px solid ${step.win.includes(vi) ? (si === 2 ? 'var(--green)' : '#facc15') : 'var(--border)'}`, borderRight: vi < step.arr.length - 1 ? 'none' : undefined }}>{v}</div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: si === 2 ? 'var(--green)' : 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: si === 2 ? 700 : 400 }}>sum={step.sum} — {step.note}</div>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

/* FIXED WINDOW: max sum subarray of size k */
int maxSumFixed(int arr[], int n, int k) {
    int windowSum = 0, maxSum, i;

    /* compute sum of first window */
    for (i = 0; i < k; i++) windowSum += arr[i];
    maxSum = windowSum;

    /* slide the window */
    for (i = k; i < n; i++) {
        windowSum += arr[i];       /* add new right element */
        windowSum -= arr[i - k];   /* remove old left element */
        if (windowSum > maxSum) maxSum = windowSum;
    }
    return maxSum;
}

/* VARIABLE WINDOW: smallest subarray with sum >= target */
int smallestSubarray(int arr[], int n, int target) {
    int minLen = n + 1;
    int left = 0, sum = 0, right;

    for (right = 0; right < n; right++) {
        sum += arr[right];  /* expand window to the right */

        /* shrink from left while sum still >= target */
        while (sum >= target) {
            int len = right - left + 1;
            if (len < minLen) minLen = len;
            sum -= arr[left];
            left++;
        }
    }
    return minLen == n + 1 ? -1 : minLen;
}

int main() {
    int arr1[] = {2, 1, 5, 1, 3, 2};
    printf("Max sum (k=3): %d\\n", maxSumFixed(arr1, 6, 3));  /* 9 */

    int arr2[] = {2, 3, 1, 2, 4, 3};
    printf("Min subarray sum>=7: length %d\\n", smallestSubarray(arr2, 6, 7)); /* 2 — [4,3] */

    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          19.6 — TWO POINTERS
      ══════════════════════════════════════ */}
      <TopicHeader num="19.6" name="Two Pointers" tagline="Solve sorted array pair problems in O(n) instead of O(n²)" time="O(n)" space="O(1)" color="#00e676" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          Two pointers start at opposite ends of a sorted array and move toward each other.
          At each step, comparing their sum to the target tells you which pointer to move —
          eliminating one element from consideration per step. The result is O(n) instead of
          O(n²) brute force. Also applies to linked list cycle detection (Unit 05 — that was
          also two pointers: the slow and fast pointer).
        </p>
      </div>

      <CodeBlock code={`#include <stdio.h>

/* PROBLEM 1: pair sum — find two elements that sum to target */
void pairSum(int arr[], int n, int target) {
    int left = 0, right = n - 1;  /* start from both ends */

    while (left < right) {
        int sum = arr[left] + arr[right];

        if (sum == target) {
            printf("Pair found: %d + %d = %d\\n", arr[left], arr[right], target);
            left++; right--;
        } else if (sum < target) {
            left++;   /* sum too small — move left pointer right to increase sum */
        } else {
            right--;  /* sum too large — move right pointer left to decrease sum */
        }
    }
}

/* PROBLEM 2: container with most water
   Given heights[], find two lines that form the largest container */
int maxWater(int heights[], int n) {
    int left = 0, right = n - 1, maxArea = 0;

    while (left < right) {
        int h = heights[left] < heights[right] ? heights[left] : heights[right];
        int area = h * (right - left);
        if (area > maxArea) maxArea = area;

        /* move the shorter side — it is the limiting factor */
        if (heights[left] < heights[right]) left++;
        else right--;
    }
    return maxArea;
}

/* PROBLEM 3: remove duplicates from sorted array in-place */
int removeDuplicates(int arr[], int n) {
    if (n == 0) return 0;
    int slow = 0, fast;

    for (fast = 1; fast < n; fast++) {
        if (arr[fast] != arr[slow]) {
            slow++;
            arr[slow] = arr[fast];  /* copy unique element */
        }
        /* if duplicate — fast just moves on, slow stays */
    }
    return slow + 1;  /* new length */
}

int main() {
    int arr1[] = {1, 2, 3, 4, 6};  /* sorted */
    printf("Pair sum = 6:\\n");
    pairSum(arr1, 5, 6);  /* 2+4, 1+5? no 5 not there. Actually 2+4=6 */

    int heights[] = {1, 8, 6, 2, 5, 4, 8, 3, 7};
    printf("Max water: %d\\n", maxWater(heights, 9));  /* 49 */

    int arr2[] = {1, 1, 2, 3, 3, 3, 4};
    int newLen = removeDuplicates(arr2, 7);
    printf("After dedup length: %d\\n", newLen);  /* 4: [1,2,3,4] */

    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          19.7 — BIT MANIPULATION
      ══════════════════════════════════════ */}
      <TopicHeader num="19.7" name="Bit Manipulation" tagline="Work directly with binary representations for O(1) tricks" time="O(1)" space="O(1)" color="#8b5cf6" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          Every integer is stored as bits. Bit manipulation uses bitwise operators
          (&, |, ^, ~, {'<<'}, {'>>'}) to work directly on these bits.
          The results are algorithms that look like magic but run in constant time O(1).
          Used in competitive programming, low-level systems, graphics, and cryptography.
        </p>
      </div>

      {/* Bitwise operators table */}
      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Operator', 'Name', 'Effect', 'Example'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '9px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, background: 'var(--surface)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['&', 'AND', 'Both bits must be 1', '5 & 3 = 101 & 011 = 001 = 1'],
              ['|', 'OR', 'At least one bit is 1', '5 | 3 = 101 | 011 = 111 = 7'],
              ['^', 'XOR', 'Bits differ', '5 ^ 3 = 101 ^ 011 = 110 = 6'],
              ['~', 'NOT', 'Flip all bits', '~5 = -(5+1) = -6'],
              ['<<', 'Left shift', 'Multiply by 2^n', '5 << 1 = 10 = multiply by 2'],
              ['>>', 'Right shift', 'Divide by 2^n', '20 >> 2 = 5 = divide by 4'],
            ].map(([op, name, effect, ex], ri) => (
              <tr key={ri}>
                <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--border)', color: '#8b5cf6', fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 16 }}>{op}</td>
                <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)', fontWeight: 600 }}>{name}</td>
                <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>{effect}</td>
                <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{ex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CodeBlock code={`#include <stdio.h>

/* ── ESSENTIAL BIT TRICKS ── */

/* 1. Check if a number is even or odd */
int isOdd(int n) { return n & 1; }
/* n & 1 checks the last bit: 1=odd, 0=even. Faster than n%2 */

/* 2. Check if number is a power of 2 */
int isPowerOf2(int n) { return n > 0 && (n & (n - 1)) == 0; }
/* Powers of 2 have exactly one bit set: 4=100, n-1=011, AND=000 */

/* 3. Count set bits (Brian Kernighan's algorithm) */
int countBits(int n) {
    int count = 0;
    while (n) {
        n = n & (n - 1);  /* clears the lowest set bit */
        count++;
    }
    return count;
}

/* 4. Get, set, clear, toggle the i-th bit */
int getBit(int n, int i)    { return (n >> i) & 1; }
int setBit(int n, int i)    { return n | (1 << i); }
int clearBit(int n, int i)  { return n & ~(1 << i); }
int toggleBit(int n, int i) { return n ^ (1 << i); }

/* 5. XOR trick: find the one number that appears once
   (all others appear exactly twice) */
int findUnique(int arr[], int n) {
    int result = 0, i;
    for (i = 0; i < n; i++) result ^= arr[i];
    /* x ^ x = 0 for all pairs, only the unique remains */
    return result;
}

/* 6. Swap two numbers without a temp variable */
void swapBits(int *a, int *b) {
    *a ^= *b;  /* a = a XOR b */
    *b ^= *a;  /* b = b XOR (a XOR b) = original a */
    *a ^= *b;  /* a = (a XOR b) XOR original a = original b */
}

/* 7. Multiply and divide by powers of 2 */
int multiplyBy2(int n)  { return n << 1; }
int divideBy2(int n)    { return n >> 1; }
int multiplyBy8(int n)  { return n << 3; }  /* 2^3 = 8 */

/* 8. Check if two integers have opposite signs */
int oppositeSigns(int a, int b) { return (a ^ b) < 0; }

int main() {
    printf("isOdd(7):        %d\\n", isOdd(7));         /* 1 */
    printf("isOdd(8):        %d\\n", isOdd(8));         /* 0 */
    printf("isPowerOf2(16):  %d\\n", isPowerOf2(16));   /* 1 */
    printf("isPowerOf2(12):  %d\\n", isPowerOf2(12));   /* 0 */
    printf("countBits(13):   %d\\n", countBits(13));    /* 3 — 1101 has 3 set bits */

    printf("getBit(13, 2):   %d\\n", getBit(13, 2));    /* 1 — 1101, bit 2 is 1 */
    printf("clearBit(13, 3): %d\\n", clearBit(13, 3));  /* 5 — 1101 -> 0101 */
    printf("setBit(5, 3):    %d\\n", setBit(5, 3));     /* 13 — 0101 -> 1101 */

    int arr[] = {4, 1, 2, 1, 2};
    printf("Unique element:  %d\\n", findUnique(arr, 5)); /* 4 */

    int a = 10, b = 20;
    swapBits(&a, &b);
    printf("After swap: a=%d b=%d\\n", a, b);  /* a=20 b=10 */

    return 0;
}`} />

      <Callout type="tip">
        <strong>The XOR trick for finding a unique element</strong> is one of the most elegant
        algorithms ever — a single loop, zero extra memory, and it works because x ^ x = 0
        and x ^ 0 = x. All paired elements cancel out, leaving only the unique one.
        This trick extends: XOR all elements in two arrays to find the missing number,
        or the one element that appears an odd number of times.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          FINAL SUMMARY
      ══════════════════════════════════════ */}
      <SectionTag text="The Complete Picture" />
      <SectionTitle>All Advanced Topics — When to Use Each</SectionTitle>

      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Topic', 'Query/Op', 'Build/Init', 'Use when'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, background: 'var(--surface)', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Segment Tree', 'O(log n)', 'O(n)', 'Range queries + range/point updates on array'],
              ['Fenwick Tree', 'O(log n)', 'O(n log n)', 'Prefix sum queries + point updates, simpler code'],
              ['Trie', 'O(L)', 'O(n×L)', 'String prefix search, autocomplete, word dictionaries'],
              ['Union-Find', '≈ O(1)', 'O(n)', 'Connected components, Kruskal\'s MST, cycle detection'],
              ['Sliding Window', 'O(n) total', 'O(1)', 'Fixed/variable window subarray problems'],
              ['Two Pointers', 'O(n) total', 'O(n log n) sort', 'Pair sum, triplet sum, remove duplicates on sorted'],
              ['Bit Manipulation', 'O(1)', 'O(1)', 'Power of 2, count bits, XOR tricks, fast multiply'],
            ].map(([topic, q, b, use], ri) => (
              <tr key={ri}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--green)', fontWeight: 700 }}>{topic}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: '#00e676', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{q}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: '#4285f4', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{b}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontSize: 12 }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          CONGRATULATIONS
      ══════════════════════════════════════ */}
      <div style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.08) 0%, rgba(123,97,255,0.08) 100%)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 16, padding: '36px 32px', textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎓</div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--green)', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
          // You have completed the DSA track
        </div>
        <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
          Zero to Advanced. Done.
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, maxWidth: 560, margin: '0 auto 28px' }}>
          From understanding what a variable is, to segment trees and bit manipulation —
          you have covered every topic that appears in technical interviews from
          campus placements all the way to FAANG. That is 20 units, 135+ topics,
          and hundreds of problems. All in C. All from scratch.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/learn/dsa" style={{ display: 'inline-block', background: 'var(--green)', color: '#000', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '10px 24px', textDecoration: 'none' }}>
            ← Back to DSA Track
          </Link>
          <Link href="/learn/interview" style={{ display: 'inline-block', background: 'var(--surface)', color: 'var(--text)', fontWeight: 600, fontSize: 13, borderRadius: 8, padding: '10px 24px', textDecoration: 'none', border: '1px solid var(--border)' }}>
            Interview Prep →
          </Link>
        </div>
      </div>

      <KeyTakeaways items={[
        'Segment Tree: binary tree storing range answers. Build O(n), query and point update O(log n). Use for range sum/min/max with updates',
        'Fenwick Tree: simpler than segment tree for prefix sums. Uses lowbit trick (i & -i) to navigate. O(log n) query and update',
        'Trie: tree where paths spell strings. Each node has 26 children. Insert and search in O(L) where L = string length. Powers autocomplete',
        'Union-Find: track connected components. find() with path compression, unite() with rank. Both ≈ O(1) amortised',
        'Sliding Window Fixed: maintain running window sum — add right, remove left. O(n) for all windows of size k',
        'Sliding Window Variable: expand right, shrink left when constraint satisfied. O(n) total for smallest subarray problems',
        'Two Pointers: start at both ends of sorted array, move toward each other. Eliminates O(n²) brute force for pair problems',
        'Bit tricks: n&1 = odd check. n&(n-1)=0 = power of 2. n&(n-1) clears lowest set bit. x^x=0 so XOR all pairs to find unique',
        'Left shift by k = multiply by 2^k. Right shift by k = divide by 2^k. Both O(1) and faster than arithmetic',
        'The complete DSA journey: arrays → strings → pointers → linked lists → stacks → queues → recursion → sorting → searching → trees → BST → heaps → hashing → graphs → DP → greedy → backtracking → advanced',
      ]} />

    </LearnLayout>
  )
}