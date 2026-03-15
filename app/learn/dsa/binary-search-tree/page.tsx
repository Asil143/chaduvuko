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

/* ── BST node visual ── */
const BSTNode = ({ value, highlight, color = 'var(--green)', small }: { value: string | number; highlight?: boolean; color?: string; small?: boolean }) => (
  <div style={{
    width: small ? 36 : 44, height: small ? 36 : 44, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-mono)', fontSize: small ? 12 : 15, fontWeight: 800,
    color: highlight ? '#000' : color,
    background: highlight ? color : `${color}15`,
    border: `2px solid ${color}`,
    flexShrink: 0,
  }}>
    {value}
  </div>
)

const Edge = ({ horizontal }: { horizontal?: boolean }) => (
  <div style={horizontal
    ? { width: 20, height: 2, background: 'var(--border)' }
    : { width: 2, height: 16, background: 'var(--border)' }
  } />
)

export default function BSTPage() {
  return (
    <LearnLayout
      title="Unit 12 — Binary Search Tree"
      description="A binary tree with one powerful rule: every left child is smaller, every right child is larger. This rule makes search, insert, and delete all run in O(log n) on a balanced tree."
      section="DSA"
      readTime="75 min"
      updatedAt="March 2026"
    >

      {/* ── Badges ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'UNIT 12', green: true },
          { label: 'Prerequisite: Unit 11 — Trees', green: false },
          { label: '75 min read', green: false },
        ].map((b) => (
          <span key={b.label} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: b.green ? 700 : 600, color: b.green ? 'var(--green)' : 'var(--muted)', background: b.green ? 'rgba(0,230,118,0.1)' : 'var(--surface)', border: `1px solid ${b.green ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`, borderRadius: 6, padding: '4px 10px' }}>
            {b.label}
          </span>
        ))}
      </div>

      <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        In Unit 11 we built a binary tree and learned to traverse it. But a plain binary tree
        has no organisation — elements can be placed anywhere. A Binary Search Tree adds one
        simple rule on top of everything you already know, and that rule transforms the tree
        from a random structure into a powerful, searchable, self-organised data structure.
      </p>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85 }}>
        In this unit we learn the BST property, build insert and search from scratch,
        tackle the tricky delete operation with all three cases, and understand why
        balance matters — and what happens when a BST goes wrong.
      </p>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 1 — THE BST PROPERTY
      ══════════════════════════════════════ */}
      <SectionTag text="Section 1" />
      <SectionTitle>The BST Property — One Rule That Changes Everything</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        A Binary Search Tree is a binary tree where every node satisfies this rule:
      </p>

      <div style={{ background: 'rgba(0,230,118,0.06)', border: '2px solid rgba(0,230,118,0.4)', borderRadius: 12, padding: '20px 28px', marginBottom: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--green)', fontFamily: 'var(--font-display)', lineHeight: 1.6 }}>
          All values in the LEFT subtree are LESS than the node.<br />
          All values in the RIGHT subtree are GREATER than the node.
        </div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 12 }}>
          This rule applies at every single node — not just the root. Every node, everywhere in the tree.
        </div>
      </div>

      {/* Valid vs Invalid BST */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
        {/* Valid BST */}
        <div style={{ background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 12, padding: '20px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 16 }}>✅ Valid BST</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            <BSTNode value={8} highlight />
            <Edge />
            <div style={{ display: 'flex', gap: 40 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                <BSTNode value={3} color="#4285f4" />
                <Edge />
                <div style={{ display: 'flex', gap: 16 }}>
                  <BSTNode value={1} color="#facc15" small />
                  <BSTNode value={6} color="#facc15" small />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                <BSTNode value={10} color="#4285f4" />
                <Edge />
                <BSTNode value={14} color="#facc15" small />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 14, fontFamily: 'var(--font-mono)', lineHeight: 1.8 }}>
            Left of 8: 3,1,6 — all {'<'} 8 ✓<br />
            Right of 8: 10,14 — all {'>'} 8 ✓<br />
            Left of 3: 1 {'<'} 3 ✓ · Right of 3: 6 {'>'} 3 ✓
          </div>
        </div>

        {/* Invalid BST */}
        <div style={{ background: 'rgba(255,71,87,0.06)', border: '1px solid rgba(255,71,87,0.3)', borderRadius: 12, padding: '20px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#ff4757', marginBottom: 16 }}>❌ NOT a Valid BST</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            <BSTNode value={8} color="#ff4757" highlight />
            <Edge />
            <div style={{ display: 'flex', gap: 40 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                <BSTNode value={3} color="#ff4757" />
                <Edge />
                <div style={{ display: 'flex', gap: 16 }}>
                  <BSTNode value={1} color="#facc15" small />
                  <BSTNode value={9} color="#ff4757" small />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                <BSTNode value={10} color="#4285f4" />
                <Edge />
                <BSTNode value={14} color="#facc15" small />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: '#ff4757', marginTop: 14, fontFamily: 'var(--font-mono)', lineHeight: 1.8 }}>
            9 is in left subtree of 8 but 9 {'>'} 8 ✗<br />
            BST property violated at node 8!<br />
            (Even though 9 {'>'} 3 locally, globally it breaks the rule)
          </div>
        </div>
      </div>

      <Callout type="warning">
        <strong>The BST rule is global, not just local.</strong> A value in the left subtree
        must be less than ALL ancestors above it — not just its immediate parent.
        This is the trap that catches most people when validating a BST.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 2 — INSERT
      ══════════════════════════════════════ */}
      <SectionTag text="Section 2" />
      <SectionTitle>Insert — Finding the Right Home</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Inserting into a BST is elegant. Start at the root and walk down:
        if the new value is smaller, go left; if larger, go right.
        Keep going until you reach a NULL — that is where the new node belongs.
        No shifting, no reorganising. Just walk and attach.
      </p>

      {/* Insert trace */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // Inserting 5 into BST with root 8
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { step: '1', text: 'Start at root (8). 5 < 8 → go LEFT', color: '#4285f4' },
            { step: '2', text: 'At node (3). 5 > 3 → go RIGHT', color: '#4285f4' },
            { step: '3', text: 'At node (6). 5 < 6 → go LEFT', color: '#4285f4' },
            { step: '4', text: 'Left of (6) is NULL → insert 5 here ✓', color: 'var(--green)' },
          ].map((item) => (
            <div key={item.step} style={{ display: 'flex', gap: 12, alignItems: 'center', background: 'var(--bg2)', border: `1px solid ${item.color}22`, borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: item.color, color: '#000', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.step}</div>
              <div style={{ fontSize: 13, color: item.color === 'var(--green)' ? 'var(--green)' : 'var(--text)', fontFamily: 'var(--font-mono)' }}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <stdlib.h>

struct BST {
    int data;
    struct BST *left;
    struct BST *right;
};
typedef struct BST BST;

BST* createNode(int value) {
    BST *node = (BST*)malloc(sizeof(BST));
    node->data  = value;
    node->left  = NULL;
    node->right = NULL;
    return node;
}

/* insert returns the root of the (possibly updated) tree */
BST* insert(BST *root, int value) {
    /* base case: found the right spot — create node here */
    if (root == NULL) {
        return createNode(value);
    }

    if (value < root->data) {
        root->left = insert(root->left, value);   /* go left */
    } else if (value > root->data) {
        root->right = insert(root->right, value); /* go right */
    }
    /* if value == root->data: duplicate — ignore (or handle as needed) */

    return root;  /* return unchanged root pointer */
}

/* inorder prints BST values in sorted order */
void inorder(BST *root) {
    if (root == NULL) return;
    inorder(root->left);
    printf("%d ", root->data);
    inorder(root->right);
}

int main() {
    BST *root = NULL;

    /* build a BST by inserting one at a time */
    root = insert(root, 8);
    root = insert(root, 3);
    root = insert(root, 10);
    root = insert(root, 1);
    root = insert(root, 6);
    root = insert(root, 14);
    root = insert(root, 5);

    printf("Inorder (sorted): ");
    inorder(root);
    /* Output: 1 3 5 6 8 10 14 */

    return 0;
}`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Average Case:</span>
          <ComplexityBadge value="O(log n)" color="#00e676" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(balanced tree)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Worst Case:</span>
          <ComplexityBadge value="O(n)" color="#ff4757" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(degenerate / skewed tree)</span>
        </div>
      </div>

      <Callout type="tip">
        <strong>Inorder traversal of a BST always gives sorted output.</strong>
        This is the most beautiful property of a BST. If you insert 8, 3, 10, 1, 6, 14, 5
        in any order, inorder traversal always prints: 1 3 5 6 8 10 14.
        The tree self-organises by value — you never need to sort explicitly.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 3 — SEARCH
      ══════════════════════════════════════ */}
      <SectionTag text="Section 3" />
      <SectionTitle>Search — O(log n) by Design</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Searching in a BST is the same logic as binary search from Unit 10 —
        but on a tree instead of an array. At each node you either found the target,
        or the BST property tells you exactly which half to search. You never
        look at both sides. Half the tree is eliminated at every step.
      </p>

      <CodeBlock code={`/* Recursive search */
BST* search(BST *root, int target) {
    /* base cases: empty tree or found it */
    if (root == NULL)         return NULL;  /* not found */
    if (root->data == target) return root;  /* found */

    /* BST property tells us which way to go */
    if (target < root->data) {
        return search(root->left, target);   /* must be in left subtree */
    } else {
        return search(root->right, target);  /* must be in right subtree */
    }
}

/* Iterative search — same logic, uses a loop */
BST* searchIterative(BST *root, int target) {
    while (root != NULL) {
        if (root->data == target) return root;       /* found */
        if (target < root->data)  root = root->left; /* go left */
        else                      root = root->right; /* go right */
    }
    return NULL;  /* not found */
}

int main() {
    BST *root = NULL;
    root = insert(root, 8);
    root = insert(root, 3);
    root = insert(root, 10);
    root = insert(root, 1);
    root = insert(root, 6);

    BST *found = search(root, 6);
    if (found) printf("Found: %d\\n", found->data);  /* Found: 6 */
    else       printf("Not found\\n");

    BST *missing = search(root, 99);
    if (!missing) printf("99 not in tree\\n");  /* 99 not in tree */

    return 0;
}`} />

      {/* Search trace visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          // Searching for 6 in BST [8, 3, 10, 1, 6, 14]
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', lineHeight: 2.2 }}>
          search(8, 6): 6 {'<'} 8 → go left<br />
          search(3, 6): 6 {'>'} 3 → go right<br />
          search(6, 6): 6 == 6 → <span style={{ color: 'var(--green)', fontWeight: 700 }}>FOUND ✓ (3 steps)</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10, fontFamily: 'var(--font-mono)' }}>
          Linear search on same data: up to 6 steps. BST: 3 steps. Gap grows with n.
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 4 — DELETE
      ══════════════════════════════════════ */}
      <SectionTag text="Section 4" />
      <SectionTitle>Delete — Three Cases You Must Know</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Deletion is the hardest BST operation because after removing a node,
        the BST property must still hold for every remaining node.
        There are exactly three cases depending on how many children the node has.
        Each case needs a different strategy.
      </p>

      {/* Three cases */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>

        {/* Case 1 */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ background: 'rgba(0,230,118,0.06)', borderBottom: '1px solid var(--border)', padding: '12px 20px', display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--green)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 4, padding: '2px 8px' }}>CASE 1</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Node is a LEAF (no children)</span>
            <ComplexityBadge value="Easiest" color="#00e676" />
          </div>
          <div style={{ padding: '16px 20px' }}>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 14 }}>
              Just remove it. Set its parent's pointer to NULL. Nothing else needs to change
              because a leaf has no children that need rehoming.
            </p>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>Before (delete 1)</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                  <BSTNode value={3} />
                  <Edge />
                  <div style={{ display: 'flex', gap: 20 }}>
                    <BSTNode value={1} color="#ff4757" highlight />
                    <BSTNode value={6} color="#facc15" small />
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 20, color: 'var(--green)' }}>→</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>After</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                  <BSTNode value={3} />
                  <Edge />
                  <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', border: '2px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--border)', fontFamily: 'var(--font-mono)' }}>NULL</div>
                    <BSTNode value={6} color="#facc15" small />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Case 2 */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ background: 'rgba(66,133,244,0.06)', borderBottom: '1px solid var(--border)', padding: '12px 20px', display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#4285f4', background: 'rgba(66,133,244,0.1)', border: '1px solid rgba(66,133,244,0.3)', borderRadius: 4, padding: '2px 8px' }}>CASE 2</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Node has ONE child</span>
            <ComplexityBadge value="Medium" color="#4285f4" />
          </div>
          <div style={{ padding: '16px 20px' }}>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 14 }}>
              Bypass the node — make the parent point directly to the node's only child.
              The single child takes the deleted node's place. BST property preserved
              because the child was already correctly positioned relative to the parent.
            </p>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>Before (delete 10, it has one child 14)</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                  <BSTNode value={8} />
                  <Edge />
                  <BSTNode value={10} color="#ff4757" highlight />
                  <Edge />
                  <BSTNode value={14} color="#facc15" small />
                </div>
              </div>
              <div style={{ fontSize: 20, color: 'var(--green)' }}>→</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>After — 14 promoted</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                  <BSTNode value={8} />
                  <Edge />
                  <BSTNode value={14} color="var(--green)" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Case 3 */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ background: 'rgba(249,115,22,0.06)', borderBottom: '1px solid var(--border)', padding: '12px 20px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#f97316', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: 4, padding: '2px 8px' }}>CASE 3</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Node has TWO children</span>
            <ComplexityBadge value="Hardest" color="#f97316" />
          </div>
          <div style={{ padding: '16px 20px' }}>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 14 }}>
              You cannot just remove it — two subtrees would be left dangling.
              The trick: find the <strong style={{ color: 'var(--green)' }}>inorder successor</strong> —
              the smallest value in the right subtree. Copy its value into the current node,
              then delete the inorder successor (which has at most one child — Case 1 or 2).
              The BST property is maintained because the inorder successor is larger than
              everything in the left subtree and smaller than everything else in the right subtree.
            </p>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px', marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>What is the inorder successor?</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
                The inorder successor of a node is the <strong style={{ color: 'var(--green)' }}>smallest node in its right subtree</strong>.
                To find it: go one step right, then go left as far as possible.
                That leftmost node is the inorder successor.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>Before (delete 3 — has children 1 and 6)</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                  <BSTNode value={8} />
                  <Edge />
                  <BSTNode value={3} color="#ff4757" highlight />
                  <Edge />
                  <div style={{ display: 'flex', gap: 20 }}>
                    <BSTNode value={1} color="#facc15" small />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                      <BSTNode value={6} color="#facc15" small />
                      <Edge />
                      <BSTNode value={5} color='var(--green)' small />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'center', maxWidth: 180 }}>
                <div style={{ fontSize: 12, color: 'var(--green)', fontFamily: 'var(--font-mono)', lineHeight: 1.8 }}>
                  Inorder successor of 3<br />
                  = smallest in right subtree<br />
                  = go right (6), then left (5)<br />
                  = <strong>5</strong><br />
                  Copy 5 → node 3<br />
                  Delete original 5
                </div>
              </div>
              <div style={{ fontSize: 20, color: 'var(--green)' }}>→</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>After — 5 replaced 3</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                  <BSTNode value={8} />
                  <Edge />
                  <BSTNode value={5} color="var(--green)" highlight />
                  <Edge />
                  <div style={{ display: 'flex', gap: 20 }}>
                    <BSTNode value={1} color="#facc15" small />
                    <BSTNode value={6} color="#facc15" small />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CodeBlock code={`/* find the minimum value node in a subtree — used for inorder successor */
BST* findMin(BST *root) {
    while (root->left != NULL) {
        root = root->left;  /* go left as far as possible */
    }
    return root;
}

BST* deleteNode(BST *root, int value) {
    if (root == NULL) return NULL;  /* value not found */

    /* find the node to delete */
    if (value < root->data) {
        root->left = deleteNode(root->left, value);   /* search left */
    } else if (value > root->data) {
        root->right = deleteNode(root->right, value); /* search right */
    } else {
        /* found the node to delete — handle the three cases */

        /* CASE 1: leaf node — no children */
        if (root->left == NULL && root->right == NULL) {
            free(root);
            return NULL;
        }

        /* CASE 2a: only right child */
        if (root->left == NULL) {
            BST *temp = root->right;
            free(root);
            return temp;  /* right child takes this node's place */
        }

        /* CASE 2b: only left child */
        if (root->right == NULL) {
            BST *temp = root->left;
            free(root);
            return temp;  /* left child takes this node's place */
        }

        /* CASE 3: two children — find inorder successor */
        BST *successor = findMin(root->right);  /* smallest in right subtree */
        root->data = successor->data;           /* copy successor's value here */
        root->right = deleteNode(root->right, successor->data); /* delete successor */
    }

    return root;
}

int main() {
    BST *root = NULL;
    root = insert(root, 8);
    root = insert(root, 3);
    root = insert(root, 10);
    root = insert(root, 1);
    root = insert(root, 6);
    root = insert(root, 5);
    root = insert(root, 14);

    printf("Before delete: "); inorder(root); printf("\\n");
    /* 1 3 5 6 8 10 14 */

    root = deleteNode(root, 3);  /* Case 3 — two children */
    printf("After delete 3: "); inorder(root); printf("\\n");
    /* 1 5 6 8 10 14 — 5 replaced 3 */

    root = deleteNode(root, 14); /* Case 1 — leaf */
    printf("After delete 14: "); inorder(root); printf("\\n");
    /* 1 5 6 8 10 */

    return 0;
}`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Average:</span>
          <ComplexityBadge value="O(log n)" color="#00e676" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Worst:</span>
          <ComplexityBadge value="O(n)" color="#ff4757" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(skewed tree)</span>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 5 — INORDER = SORTED
      ══════════════════════════════════════ */}
      <SectionTag text="Section 5" />
      <SectionTitle>The Beautiful Property — Inorder = Sorted</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Here is the most elegant fact about BSTs: no matter what order you insert elements,
        an inorder traversal always returns them in sorted ascending order.
        Insert 50, 30, 70, 20, 40, 60, 80 — inorder gives 20, 30, 40, 50, 60, 70, 80.
      </p>

      <CodeBlock code={`int main() {
    BST *root = NULL;

    /* insert in random order */
    int values[] = {50, 30, 70, 20, 40, 60, 80};
    int i;
    for (i = 0; i < 7; i++) {
        root = insert(root, values[i]);
    }

    /* inorder always gives sorted output — this is the BST guarantee */
    printf("Inorder (sorted): ");
    inorder(root);
    /* Output: 20 30 40 50 60 70 80 */

    /* the tree looks like this:
              50
            /    \\
          30      70
         /  \\   /  \\
        20  40 60  80
    */

    return 0;
}`} />

      <Callout type="info">
        <strong>This is why BSTs are used in databases.</strong> An ordered set of records
        (like rows in a table) is stored as a BST or B-Tree. Range queries like
        WHERE age BETWEEN 20 AND 40 use inorder traversal to find all matching records
        efficiently — without scanning the entire table.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 6 — BALANCED VS UNBALANCED
      ══════════════════════════════════════ */}
      <SectionTag text="Section 6" />
      <SectionTitle>Balanced vs Unbalanced — When BST Goes Wrong</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        The O(log n) performance of a BST depends on one assumption: the tree is roughly balanced.
        If the tree is skewed — all insertions go to one side — the tree becomes a linked list
        and every operation degrades to O(n). This is the BST's critical weakness.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
        {/* Balanced */}
        <div style={{ background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 12, padding: '20px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 12 }}>✅ Balanced BST</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, marginBottom: 14 }}>
            <BSTNode value={4} highlight />
            <Edge />
            <div style={{ display: 'flex', gap: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                <BSTNode value={2} />
                <Edge />
                <div style={{ display: 'flex', gap: 12 }}>
                  <BSTNode value={1} color="#facc15" small />
                  <BSTNode value={3} color="#facc15" small />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                <BSTNode value={6} />
                <Edge />
                <div style={{ display: 'flex', gap: 12 }}>
                  <BSTNode value={5} color="#facc15" small />
                  <BSTNode value={7} color="#facc15" small />
                </div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', lineHeight: 1.8 }}>
            Insert: 4, 2, 6, 1, 3, 5, 7<br />
            Height = 2<br />
            Search = O(log 7) ≈ 3 steps<br />
            <span style={{ color: 'var(--green)' }}>Wide and short — efficient ✓</span>
          </div>
        </div>

        {/* Degenerate */}
        <div style={{ background: 'rgba(255,71,87,0.06)', border: '1px solid rgba(255,71,87,0.3)', borderRadius: 12, padding: '20px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#ff4757', marginBottom: 12 }}>❌ Degenerate BST (skewed)</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0, marginBottom: 14, paddingLeft: 20 }}>
            <BSTNode value={1} color="#ff4757" highlight />
            <div style={{ paddingLeft: 36, display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-start' }}>
              <Edge />
              <BSTNode value={2} color="#ff4757" />
              <div style={{ paddingLeft: 36, display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-start' }}>
                <Edge />
                <BSTNode value={3} color="#ff4757" />
                <div style={{ paddingLeft: 36, display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'flex-start' }}>
                  <Edge />
                  <BSTNode value={4} color="#ff4757" small />
                </div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', lineHeight: 1.8 }}>
            Insert: 1, 2, 3, 4 (sorted order)<br />
            Height = 3 (= n-1)<br />
            Search = O(n) steps<br />
            <span style={{ color: '#ff4757' }}>Tall and thin — basically a list ✗</span>
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
          The fix — Self-Balancing BSTs
        </div>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 12 }}>
          Self-balancing trees automatically restructure themselves after each insert/delete
          to maintain O(log n) height. The two most important ones:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { name: 'AVL Tree', desc: 'Strictly balanced — height difference between left and right subtree never exceeds 1. Faster searches. Rebalances more often on insert/delete.', color: '#4285f4' },
            { name: 'Red-Black Tree', desc: 'Loosely balanced — uses coloring rules to keep height O(log n). Faster insertions. Used in Java TreeMap, C++ std::map, and Linux kernel process scheduling.', color: '#ff4757' },
          ].map((item) => (
            <div key={item.name} style={{ display: 'flex', gap: 0, background: 'var(--bg2)', border: `1px solid ${item.color}22`, borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ width: 4, background: item.color, flexShrink: 0 }} />
              <div style={{ padding: '12px 16px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Callout type="tip">
        <strong>For interviews:</strong> You will not be asked to implement AVL or Red-Black trees from scratch.
        But you must know they exist, why they are needed, and what problem they solve.
        The answer is always: a plain BST degrades to O(n) on sorted input — self-balancing trees
        guarantee O(log n) always.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 7 — COMPLETE PROGRAM
      ══════════════════════════════════════ */}
      <SectionTag text="Section 7" />
      <SectionTitle>Complete BST Program — All Operations Together</SectionTitle>

      <CodeBlock code={`#include <stdio.h>
#include <stdlib.h>

struct BST {
    int data;
    struct BST *left;
    struct BST *right;
};
typedef struct BST BST;

BST* createNode(int v) {
    BST *n = (BST*)malloc(sizeof(BST));
    n->data = v; n->left = n->right = NULL;
    return n;
}

BST* insert(BST *root, int v) {
    if (!root) return createNode(v);
    if (v < root->data) root->left  = insert(root->left, v);
    else if (v > root->data) root->right = insert(root->right, v);
    return root;
}

BST* search(BST *root, int v) {
    if (!root || root->data == v) return root;
    if (v < root->data) return search(root->left, v);
    return search(root->right, v);
}

BST* findMin(BST *root) {
    while (root->left) root = root->left;
    return root;
}

BST* deleteNode(BST *root, int v) {
    if (!root) return NULL;
    if (v < root->data) { root->left  = deleteNode(root->left, v); }
    else if (v > root->data) { root->right = deleteNode(root->right, v); }
    else {
        if (!root->left && !root->right) { free(root); return NULL; }
        if (!root->left)  { BST *t = root->right; free(root); return t; }
        if (!root->right) { BST *t = root->left;  free(root); return t; }
        BST *s = findMin(root->right);
        root->data = s->data;
        root->right = deleteNode(root->right, s->data);
    }
    return root;
}

int height(BST *root) {
    if (!root) return -1;
    int l = height(root->left), r = height(root->right);
    return 1 + (l > r ? l : r);
}

void inorder(BST *root) {
    if (!root) return;
    inorder(root->left);
    printf("%d ", root->data);
    inorder(root->right);
}

int main() {
    BST *root = NULL;
    int vals[] = {8, 3, 10, 1, 6, 14, 4, 7, 13};
    int i, n = 9;

    for (i = 0; i < n; i++) root = insert(root, vals[i]);

    printf("Inorder:  "); inorder(root); printf("\\n");
    /* 1 3 4 6 7 8 10 13 14 */

    printf("Height:   %d\\n", height(root));  /* 3 */

    BST *found = search(root, 6);
    printf("Search 6: %s\\n", found ? "Found" : "Not found");  /* Found */

    root = deleteNode(root, 3);  /* delete node with two children */
    printf("After delete 3: "); inorder(root); printf("\\n");
    /* 1 4 6 7 8 10 13 14 */

    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 8 — COMPLEXITY SUMMARY
      ══════════════════════════════════════ */}
      <SectionTag text="Section 8" />
      <SectionTitle>BST Operations — Complexity Summary</SectionTitle>

      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Operation', 'Average (balanced)', 'Worst (skewed)', 'Notes'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, background: 'var(--surface)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Search', 'O(log n)', 'O(n)', 'Halves the search space each step'],
              ['Insert', 'O(log n)', 'O(n)', 'Walk down to find insertion point'],
              ['Delete', 'O(log n)', 'O(n)', 'Find node + handle 3 cases'],
              ['Inorder traversal', 'O(n)', 'O(n)', 'Must visit every node'],
              ['Find min / max', 'O(log n)', 'O(n)', 'Walk all the way left / right'],
              ['Height', 'O(n)', 'O(n)', 'Must check all paths'],
            ].map(([op, avg, worst, note], ri) => (
              <tr key={ri}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)', fontWeight: 600 }}>{op}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: '#00e676', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{avg}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: worst === 'O(n)' ? '#ff4757' : '#00e676', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{worst}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontSize: 12 }}>{note}</td>
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
      <SectionTitle>You Are Ready for Unit 13</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        You now know the BST completely — the property, insert, search, all three delete cases,
        inorder sorted output, and the balance problem. These are the exact topics
        that appear in every serious technical interview.
      </p>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 32 }}>
        In Unit 13 we cover <strong style={{ color: 'var(--text)' }}>Heaps</strong> —
        a special tree where the parent is always larger (or smaller) than its children.
        Heaps power priority queues, heap sort, and Dijkstra's shortest path algorithm.
        Unlike BSTs, heaps are always balanced — so every operation is guaranteed O(log n).
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(0,230,118,0.02) 100%)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 12, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 700, marginBottom: 6 }}>UP NEXT → UNIT 13</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Heaps — Always Balanced, Always Fast</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Min heap, max heap, heap as array, insert, delete, heap sort — in C.</div>
        </div>
        <Link href="/learn/dsa/heaps" style={{ background: 'var(--green)', color: '#000', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '10px 22px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Coming Soon →
        </Link>
      </div>

      <KeyTakeaways items={[
        'BST rule: every left subtree value is less than the node, every right subtree value is greater — at every node',
        'The BST rule is global — a value must satisfy the rule relative to ALL its ancestors, not just its parent',
        'Insert: walk left if smaller, right if larger, until NULL — create node there. O(log n) average',
        'Search: same as binary search — half the tree eliminated at every step. O(log n) average',
        'Delete Case 1 (leaf): just remove it — set parent pointer to NULL',
        'Delete Case 2 (one child): bypass the node — connect parent directly to the single child',
        'Delete Case 3 (two children): replace with inorder successor (smallest in right subtree), then delete successor',
        'Inorder traversal of any BST always produces sorted ascending output — the defining property',
        'Balanced BST: O(log n) for all operations. Skewed BST: O(n) — degrades to a linked list',
        'Self-balancing trees (AVL, Red-Black) fix the skew problem — used in Java TreeMap, C++ std::map',
      ]} />

    </LearnLayout>
  )
}