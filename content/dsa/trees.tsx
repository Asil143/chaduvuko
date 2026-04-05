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

/* ── Tree node visual ── */
const TreeNode = ({ value, color = 'var(--green)', highlight = false }: { value: string | number; color?: string; highlight?: boolean }) => (
  <div style={{
    width: 44, height: 44, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 800,
    color: highlight ? '#000' : color,
    background: highlight ? color : `${color}15`,
    border: `2px solid ${color}`,
    flexShrink: 0,
  }}>
    {value}
  </div>
)

export default function TreesPage() {
  return (
    <LearnLayout
      title="Unit 11 — Trees"
      description="Hierarchical data structures that look like upside-down trees. The foundation of file systems, HTML pages, databases, and compilers. Built from scratch in C with all four traversals."
      section="DSA"
      readTime="90 min"
      updatedAt="March 2026"
    >

      {/* ── Badges ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'UNIT 11', green: true },
          { label: 'Prerequisite: Unit 05 — Linked Lists', green: false },
          { label: '90 min read', green: false },
        ].map((b) => (
          <span key={b.label} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: b.green ? 700 : 600, color: b.green ? 'var(--green)' : 'var(--muted)', background: b.green ? 'rgba(0,230,118,0.1)' : 'var(--surface)', border: `1px solid ${b.green ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`, borderRadius: 6, padding: '4px 10px' }}>
            {b.label}
          </span>
        ))}
      </div>

      <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Every data structure we have covered so far has been linear — arrays, linked lists,
        stacks, queues all store items in a straight sequence. Trees are different.
        They store data in a <strong style={{ color: 'var(--green)' }}>hierarchy</strong> —
        parent–child relationships where one node can connect to multiple others.
        This single change opens up an entirely new class of problems and solutions.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>
        In this unit we build binary trees from scratch in C, learn all the
        vocabulary, implement every traversal, and understand the properties
        that make trees the backbone of some of the most important systems in computing.
      </p>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 1 — WHAT IS A TREE
      ══════════════════════════════════════ */}
      <SectionTag text="Section 1" />
      <SectionTitle>What is a Tree?</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        A tree is a collection of <strong style={{ color: 'var(--green)' }}>nodes</strong> connected by
        <strong style={{ color: 'var(--green)' }}> edges</strong>, arranged so that there is exactly
        one path between any two nodes and no cycles. It looks like a real tree — but
        drawn upside down with the root at the top and the leaves at the bottom.
      </p>

      {/* Company org chart analogy */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
          🏢 Think of a company org chart
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 20 }}>
          The CEO is at the top. Under the CEO are VPs. Under each VP are managers.
          Under each manager are engineers. This hierarchy is exactly a tree.
          The CEO is the root. Engineers with no subordinates are leaves.
        </p>

        {/* Tree visual */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, overflowX: 'auto' }}>
          {/* Root */}
          <TreeNode value="CEO" color="var(--green)" highlight />
          <div style={{ width: 2, height: 20, background: 'var(--border)' }} />

          {/* Level 1 */}
          <div style={{ display: 'flex', gap: 60, position: 'relative' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              <TreeNode value="VP1" color="#4285f4" />
              <div style={{ width: 2, height: 20, background: 'var(--border)' }} />
              <div style={{ display: 'flex', gap: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <TreeNode value="M1" color="#7b61ff" />
                  <div style={{ width: 2, height: 20, background: 'var(--border)' }} />
                  <div style={{ display: 'flex', gap: 10 }}>
                    <TreeNode value="E1" color="#facc15" />
                    <TreeNode value="E2" color="#facc15" />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <TreeNode value="M2" color="#7b61ff" />
                  <div style={{ width: 2, height: 20, background: 'var(--border)' }} />
                  <TreeNode value="E3" color="#facc15" />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              <TreeNode value="VP2" color="#4285f4" />
              <div style={{ width: 2, height: 20, background: 'var(--border)' }} />
              <TreeNode value="M3" color="#7b61ff" />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20, marginTop: 20, flexWrap: 'wrap' }}>
          {[
            { color: 'var(--green)', label: 'Root (CEO) — top of tree, no parent' },
            { color: '#4285f4', label: 'Internal nodes — have parent and children' },
            { color: '#7b61ff', label: 'Internal nodes' },
            { color: '#facc15', label: 'Leaves — no children, bottom of tree' },
          ].map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 2 — TERMINOLOGY
      ══════════════════════════════════════ */}
      <SectionTag text="Section 2" />
      <SectionTitle>Tree Terminology — Words You Must Know</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Trees have a vocabulary that everyone uses — in interviews, textbooks, and code reviews.
        Learn these terms once. You will use them forever.
      </p>

      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Term', 'Definition', 'In the org chart example'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, background: 'var(--surface)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Root', 'The topmost node — has no parent', 'CEO'],
              ['Node', 'Any single element in the tree', 'Any person in the chart'],
              ['Edge', 'The connection between a parent and child', 'The line between CEO and VP'],
              ['Parent', 'The node directly above another node', 'VP1 is parent of M1'],
              ['Child', 'A node directly below another node', 'M1 and M2 are children of VP1'],
              ['Leaf', 'A node with no children', 'E1, E2, E3, M3'],
              ['Height', 'Longest path from root to any leaf (in edges)', 'CEO → VP1 → M1 → E1 = height 3'],
              ['Depth', 'Distance from root to a specific node', 'M1 has depth 2'],
              ['Level', 'All nodes at the same depth', 'VP1 and VP2 are at level 1'],
              ['Subtree', 'Any node and all its descendants', 'VP1 + all below it = a subtree'],
            ].map(([term, def, ex], ri) => (
              <tr key={ri}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{term}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)' }}>{def}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontSize: 12 }}>{ex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 3 — BINARY TREE
      ══════════════════════════════════════ */}
      <SectionTag text="Section 3" />
      <SectionTitle>Binary Tree — At Most Two Children</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        A <strong style={{ color: 'var(--green)' }}>binary tree</strong> is a tree where every
        node has <strong>at most two children</strong> — called the
        <strong style={{ color: '#4285f4' }}> left child</strong> and the
        <strong style={{ color: '#f97316' }}> right child</strong>.
        This constraint makes binary trees the most studied and most useful type of tree
        in computer science. Binary search trees, heaps, expression trees — all are binary trees.
      </p>

      {/* Binary tree types */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 28 }}>
        {[
          { name: 'Full Binary Tree', desc: 'Every node has either 0 or 2 children. No node has exactly 1 child.', color: 'var(--green)' },
          { name: 'Complete Binary Tree', desc: 'All levels are fully filled except possibly the last, which fills left to right.', color: '#4285f4' },
          { name: 'Perfect Binary Tree', desc: 'All internal nodes have exactly 2 children and all leaves are at the same level.', color: '#7b61ff' },
          { name: 'Degenerate Tree', desc: 'Every parent has only one child — essentially becomes a linked list. Worst case for BST.', color: '#ff4757' },
        ].map((item) => (
          <div key={item.name} style={{ background: 'var(--surface)', border: `1px solid ${item.color}33`, borderRadius: 10, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 8 }}>{item.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.75 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 4 — BINARY TREE IN C
      ══════════════════════════════════════ */}
      <SectionTag text="Section 4" />
      <SectionTitle>Binary Tree in C — Node Structure</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        A binary tree node is just like a linked list node — but with two next pointers
        instead of one. A <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>left</code> pointer
        and a <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>right</code> pointer.
        Both are NULL for leaf nodes.
      </p>

      <CodeBlock code={`#include <stdio.h>
#include <stdlib.h>

struct TreeNode {
    int data;
    struct TreeNode *left;   /* pointer to left child */
    struct TreeNode *right;  /* pointer to right child */
};
typedef struct TreeNode TreeNode;

/* create a new node with given value */
TreeNode* createNode(int value) {
    TreeNode *node = (TreeNode*)malloc(sizeof(TreeNode));
    node->data  = value;
    node->left  = NULL;  /* no left child yet */
    node->right = NULL;  /* no right child yet */
    return node;
}

int main() {
    /* build this tree manually:
           1
          / \\
         2   3
        / \\
       4   5
    */
    TreeNode *root = createNode(1);
    root->left     = createNode(2);
    root->right    = createNode(3);
    root->left->left  = createNode(4);
    root->left->right = createNode(5);

    /* access nodes */
    printf("Root:         %d\\n", root->data);           /* 1 */
    printf("Left child:   %d\\n", root->left->data);     /* 2 */
    printf("Right child:  %d\\n", root->right->data);    /* 3 */
    printf("Left->Left:   %d\\n", root->left->left->data); /* 4 */

    return 0;
}`} />

      {/* Memory visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // How node 2 looks in memory — data + two pointers
        </div>
        <div style={{ display: 'flex', gap: 0, width: 'fit-content', border: '2px solid var(--green)', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', background: 'rgba(66,133,244,0.1)', borderRight: '1px solid var(--border)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4285f4', marginBottom: 4 }}>left*</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: '#4285f4' }}>→ node(4)</div>
          </div>
          <div style={{ padding: '12px 20px', background: 'rgba(0,230,118,0.08)', borderRight: '1px solid var(--border)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>data</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 800, color: 'var(--green)' }}>2</div>
          </div>
          <div style={{ padding: '12px 16px', background: 'rgba(249,115,22,0.1)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#f97316', marginBottom: 4 }}>right*</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: '#f97316' }}>→ node(5)</div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12, fontFamily: 'var(--font-mono)' }}>
          Each node = 12 bytes on a 64-bit system: 4 (int) + 4 (padding) + 8 (left ptr) + 8 (right ptr)
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 5 — TREE TRAVERSALS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 5" />
      <SectionTitle>Tree Traversals — Four Ways to Visit Every Node</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        With a linked list, there is only one way to traverse: start at head and follow next.
        With a tree, you have choices. The order in which you visit nodes produces
        completely different sequences — each useful for different problems.
        There are four standard traversals. Three use recursion (DFS), one uses a queue (BFS).
      </p>

      {/* The tree we will trace */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 28 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // We will use this tree for all four traversal examples
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          <TreeNode value={1} highlight />
          <div style={{ width: 2, height: 16, background: 'var(--border)' }} />
          <div style={{ display: 'flex', gap: 80, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              <TreeNode value={2} />
              <div style={{ width: 2, height: 16, background: 'var(--border)' }} />
              <div style={{ display: 'flex', gap: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <TreeNode value={4} color="#facc15" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <TreeNode value={5} color="#facc15" />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              <TreeNode value={3} />
              <div style={{ width: 2, height: 16, background: 'var(--border)' }} />
              <div style={{ display: 'flex', gap: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <TreeNode value={6} color="#facc15" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <TreeNode value={7} color="#facc15" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--green)' }} />
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>root (1)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(0,230,118,0.3)', border: '2px solid var(--green)' }} />
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>internal (2, 3)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(250,204,21,0.3)', border: '2px solid #facc15' }} />
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>leaves (4, 5, 6, 7)</span>
          </div>
        </div>
      </div>

      {/* Traversal overview cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, marginBottom: 32 }}>
        {[
          { name: 'Inorder', order: 'Left → Root → Right', result: '4 2 5 1 6 3 7', use: 'BST sorted output', color: '#4285f4' },
          { name: 'Preorder', order: 'Root → Left → Right', result: '1 2 4 5 3 6 7', use: 'Copy / serialize tree', color: 'var(--green)' },
          { name: 'Postorder', order: 'Left → Right → Root', result: '4 5 2 6 7 3 1', use: 'Delete tree, evaluate expressions', color: '#f97316' },
          { name: 'Level Order', order: 'Level by level (BFS)', result: '1 2 3 4 5 6 7', use: 'Shortest path, level problems', color: '#7b61ff' },
        ].map((t) => (
          <div key={t.name} style={{ background: 'var(--surface)', border: `1px solid ${t.color}33`, borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: t.color, fontFamily: 'var(--font-display)', marginBottom: 6 }}>{t.name}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>{t.order}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>{t.result}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>Use: {t.use}</div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 6 — INORDER
      ══════════════════════════════════════ */}
      <SectionTag text="Section 6" />
      <SectionTitle>Inorder Traversal — Left, Root, Right</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Inorder visits the <strong style={{ color: '#4285f4' }}>left subtree first</strong>, then the
        <strong style={{ color: 'var(--green)' }}> root</strong>, then the
        <strong style={{ color: '#f97316' }}> right subtree</strong>.
        On a Binary Search Tree, inorder traversal always produces a sorted sequence —
        this is one of the most important tree properties you will use.
      </p>

      {/* Step trace */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          // Tracing inorder on our tree — follow Left → Root → Right at every node
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', lineHeight: 2.2 }}>
          inorder(1) → go left first<br />
          {'  '}inorder(2) → go left first<br />
          {'    '}inorder(4) → no left → <span style={{ color: 'var(--green)' }}>print 4</span> → no right → return<br />
          {'  '}→ <span style={{ color: 'var(--green)' }}>print 2</span> → go right<br />
          {'    '}inorder(5) → no left → <span style={{ color: 'var(--green)' }}>print 5</span> → no right → return<br />
          → <span style={{ color: 'var(--green)' }}>print 1</span> → go right<br />
          {'  '}inorder(3) → go left first<br />
          {'    '}inorder(6) → no left → <span style={{ color: 'var(--green)' }}>print 6</span> → no right → return<br />
          {'  '}→ <span style={{ color: 'var(--green)' }}>print 3</span> → go right<br />
          {'    '}inorder(7) → no left → <span style={{ color: 'var(--green)' }}>print 7</span> → no right → return<br />
          <span style={{ color: 'var(--green)', fontWeight: 700 }}>Result: 4 2 5 1 6 3 7</span>
        </div>
      </div>

      <CodeBlock code={`void inorder(TreeNode *root) {
    if (root == NULL) return;  /* base case: empty subtree */

    inorder(root->left);         /* 1. visit left subtree */
    printf("%d ", root->data);   /* 2. print current node */
    inorder(root->right);        /* 3. visit right subtree */
}

/* inorder(root) → prints: 4 2 5 1 6 3 7 */`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time:</span>
          <ComplexityBadge value="O(n)" color="#facc15" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(every node visited exactly once)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Space:</span>
          <ComplexityBadge value="O(h)" color="#4285f4" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(h = height, call stack depth)</span>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 7 — PREORDER
      ══════════════════════════════════════ */}
      <SectionTag text="Section 7" />
      <SectionTitle>Preorder Traversal — Root, Left, Right</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Preorder visits the <strong style={{ color: 'var(--green)' }}>root first</strong>, then the left subtree,
        then the right subtree. Because you always process the current node before going deeper,
        preorder is used to <strong>copy or serialize a tree</strong> — the output can be used
        to reconstruct the exact same tree.
      </p>

      <CodeBlock code={`void preorder(TreeNode *root) {
    if (root == NULL) return;

    printf("%d ", root->data);   /* 1. print current node FIRST */
    preorder(root->left);        /* 2. visit left subtree */
    preorder(root->right);       /* 3. visit right subtree */
}

/* preorder(root) → prints: 1 2 4 5 3 6 7 */`} />

      <Callout type="info">
        <strong>Real use of preorder:</strong> When you save a file system to disk,
        the folder structure is written in preorder — the folder itself is saved
        before its contents. When you load it back, you recreate each folder before
        adding its children. That is preorder traversal in a real system.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 8 — POSTORDER
      ══════════════════════════════════════ */}
      <SectionTag text="Section 8" />
      <SectionTitle>Postorder Traversal — Left, Right, Root</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Postorder visits the left subtree, then right subtree, and processes the
        <strong style={{ color: 'var(--green)' }}> root last</strong>. Because you handle all
        children before the parent, postorder is the natural order for
        <strong> deleting a tree</strong> (free children before freeing parent)
        and <strong>evaluating expression trees</strong> (compute sub-expressions before applying the operator).
      </p>

      <CodeBlock code={`void postorder(TreeNode *root) {
    if (root == NULL) return;

    postorder(root->left);       /* 1. visit left subtree */
    postorder(root->right);      /* 2. visit right subtree */
    printf("%d ", root->data);   /* 3. print current node LAST */
}

/* postorder(root) → prints: 4 5 2 6 7 3 1 */

/* deleting a tree safely — must use postorder */
void deleteTree(TreeNode *root) {
    if (root == NULL) return;
    deleteTree(root->left);   /* free children first */
    deleteTree(root->right);
    free(root);                /* then free the parent */
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 9 — LEVEL ORDER (BFS)
      ══════════════════════════════════════ */}
      <SectionTag text="Section 9" />
      <SectionTitle>Level Order Traversal — BFS with a Queue</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Level order visits nodes level by level — all nodes at depth 0 first (root),
        then all at depth 1, then depth 2, and so on. This is
        <strong style={{ color: 'var(--green)' }}> Breadth-First Search (BFS)</strong> on a tree.
        Unlike the other three traversals which use recursion and the call stack,
        level order needs an explicit <strong>queue</strong> to track which nodes to visit next.
      </p>

      {/* Level order visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // Visit level by level — breadth first
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { level: 'Level 0', nodes: [1], color: 'var(--green)' },
            { level: 'Level 1', nodes: [2, 3], color: '#4285f4' },
            { level: 'Level 2', nodes: [4, 5, 6, 7], color: '#facc15' },
          ].map((row) => (
            <div key={row.level} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', minWidth: 60 }}>{row.level}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {row.nodes.map((v) => (
                  <div key={v} style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 800, color: row.color, background: `${row.color}15`, border: `2px solid ${row.color}` }}>{v}</div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                → print: {row.nodes.join(' ')}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, padding: '8px 14px', background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--green)', fontWeight: 700 }}>
          Full output: 1 2 3 4 5 6 7
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <stdlib.h>

/* simple queue using array for level order */
#define QMAX 100

void levelOrder(TreeNode *root) {
    if (root == NULL) return;

    TreeNode *queue[QMAX];
    int front = 0, rear = 0;

    queue[rear++] = root;  /* enqueue root */

    while (front < rear) {
        TreeNode *current = queue[front++];  /* dequeue */

        printf("%d ", current->data);  /* visit current node */

        /* enqueue left child if it exists */
        if (current->left != NULL) {
            queue[rear++] = current->left;
        }
        /* enqueue right child if it exists */
        if (current->right != NULL) {
            queue[rear++] = current->right;
        }
    }
}

/* levelOrder(root) → prints: 1 2 3 4 5 6 7 */`} />

      <Callout type="tip">
        <strong>Why a queue?</strong> When we dequeue a node and process it, we enqueue its
        children. Children go to the back of the queue — so all siblings at the current level
        are processed before going deeper. This naturally produces level-by-level order.
        This exact pattern — queue-based BFS — is used in graph traversal in Unit 15.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 10 — HEIGHT AND COUNT
      ══════════════════════════════════════ */}
      <SectionTag text="Section 10" />
      <SectionTitle>Height of a Tree and Counting Nodes</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Two of the most common tree problems in interviews. Both use recursion naturally —
        because the height of a tree depends on the height of its subtrees,
        and the count of nodes is 1 plus the count of the left subtree plus the right.
      </p>

      <CodeBlock code={`/* Height = longest path from root to any leaf (measured in edges) */
int height(TreeNode *root) {
    if (root == NULL) return -1;  /* empty tree has height -1 */
    /* (use 0 if measuring in nodes, -1 if measuring in edges) */

    int leftHeight  = height(root->left);
    int rightHeight = height(root->right);

    /* height = 1 + the taller of the two subtrees */
    int taller = leftHeight > rightHeight ? leftHeight : rightHeight;
    return 1 + taller;
}

/* Count = total number of nodes in the tree */
int countNodes(TreeNode *root) {
    if (root == NULL) return 0;  /* empty tree has 0 nodes */

    return 1 + countNodes(root->left) + countNodes(root->right);
    /* 1 for current node + all nodes in left + all nodes in right */
}

/* Count only leaf nodes (nodes with no children) */
int countLeaves(TreeNode *root) {
    if (root == NULL) return 0;
    if (root->left == NULL && root->right == NULL) return 1;  /* it is a leaf */
    return countLeaves(root->left) + countLeaves(root->right);
}

int main() {
    /* build our example tree */
    TreeNode *root = createNode(1);
    root->left     = createNode(2);
    root->right    = createNode(3);
    root->left->left  = createNode(4);
    root->left->right = createNode(5);
    root->right->left  = createNode(6);
    root->right->right = createNode(7);

    printf("Height:      %d\\n", height(root));      /* 2 */
    printf("Total nodes: %d\\n", countNodes(root));  /* 7 */
    printf("Leaf nodes:  %d\\n", countLeaves(root)); /* 4 */

    return 0;
}`} />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>
          Tracing height(root=1):
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', lineHeight: 2 }}>
          height(1) = 1 + max(height(2), height(3))<br />
          height(2) = 1 + max(height(4), height(5))<br />
          height(4) = 1 + max(-1, -1) = <span style={{ color: 'var(--green)' }}>0</span><br />
          height(5) = 1 + max(-1, -1) = <span style={{ color: 'var(--green)' }}>0</span><br />
          height(2) = 1 + max(0, 0) = <span style={{ color: 'var(--green)' }}>1</span><br />
          height(3) = 1 + max(0, 0) = <span style={{ color: 'var(--green)' }}>1</span><br />
          height(1) = 1 + max(1, 1) = <span style={{ color: 'var(--green)', fontWeight: 700 }}>2 ✓</span>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 11 — REAL WORLD
      ══════════════════════════════════════ */}
      <SectionTag text="Section 11" />
      <SectionTitle>Trees in the Real World</SectionTitle>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {[
          { icon: '📁', title: 'File systems', desc: 'Every folder on your computer is a tree node. /home/asil/projects is a path from root to a node. ls -R is a preorder traversal.' },
          { icon: '🌐', title: 'HTML / DOM', desc: 'Every webpage is a tree. The html tag is the root, head and body are children, and every div, p, span is a node. JavaScript\'s querySelector walks this tree.' },
          { icon: '🧮', title: 'Expression trees', desc: 'The expression (3 + 4) × 2 is stored as a tree with × at root, 2 as right child, and + as left child with 3 and 4 as its children. Postorder evaluates it correctly.' },
          { icon: '🗄️', title: 'Database indexes', desc: 'MySQL and PostgreSQL use B-Trees (a generalisation of binary trees) for indexes. Every time you query with WHERE id = 5, a tree traversal finds it in O(log n).' },
          { icon: '🔤', title: 'Auto-complete and spell check', desc: 'The Trie data structure (Unit 19) is a tree where each path from root to leaf spells a word. Google\'s search suggestions use trie-based trees.' },
        ].map((item) => (
          <div key={item.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px' }}>
            <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 12 — ERRORS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 12" />
      <SectionTitle>Errors You Will Hit</SectionTitle>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
        {[
          {
            title: 'Not checking NULL before accessing node fields',
            symptom: 'Segmentation fault when traversal tries to access root->left->data on a NULL pointer',
            fix: 'Every recursive traversal function must start with: if (root == NULL) return. Never access a field without checking NULL first.',
          },
          {
            title: 'Freeing a parent before freeing children',
            symptom: 'Memory leak — children become unreachable after parent is freed',
            fix: 'Always use postorder to delete a tree — free left subtree, free right subtree, then free the current node.',
          },
          {
            title: 'Confusing height in edges vs height in nodes',
            symptom: 'Height calculations off by 1',
            fix: 'A single node has height 0 (in edges) or height 1 (in nodes). Be consistent. This unit uses edges — base case returns -1 for NULL.',
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

      {/* Operations summary */}
      <SectionTag text="Quick Reference" />
      <SectionTitle>All Traversals — Side by Side</SectionTitle>

      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Traversal', 'Order', 'Output on example', 'Method', 'Key use'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, background: 'var(--surface)', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Inorder', 'Left → Root → Right', '4 2 5 1 6 3 7', 'Recursion', 'Sorted output from BST'],
              ['Preorder', 'Root → Left → Right', '1 2 4 5 3 6 7', 'Recursion', 'Copy / serialize tree'],
              ['Postorder', 'Left → Right → Root', '4 5 2 6 7 3 1', 'Recursion', 'Delete tree, evaluate expressions'],
              ['Level Order', 'Level by level', '1 2 3 4 5 6 7', 'Queue (BFS)', 'Shortest path, level problems'],
            ].map(([name, order, output, method, use], ri) => (
              <tr key={ri}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--green)', fontWeight: 700 }}>{name}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{order}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{output}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: '#4285f4' }}>{method}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontSize: 12 }}>{use}</td>
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
      <SectionTitle>You Are Ready for Unit 12</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        You now understand trees completely — the terminology, the node structure in C,
        all four traversals with full traces, height, count, and how trees power
        real systems from file systems to databases.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 32 }}>
        In Unit 12 we cover the <strong style={{ color: 'var(--text)' }}>Binary Search Tree (BST)</strong> —
        a binary tree with one powerful rule: every left child is smaller than its parent,
        every right child is larger. This rule makes search, insert, and delete
        all run in O(log n) on a balanced tree. The BST is the gateway to understanding
        every advanced tree structure.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(0,230,118,0.02) 100%)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 12, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 700, marginBottom: 6 }}>UP NEXT → UNIT 12</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Binary Search Tree — O(log n) Everything</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Insert, search, delete (3 cases), balanced vs unbalanced — in C.</div>
        </div>
        <Link href="/learn/dsa/binary-search-tree" style={{ background: 'var(--green)', color: '#000', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '10px 22px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Coming Soon →
        </Link>
      </div>

      <KeyTakeaways items={[
        'A tree stores data in a hierarchy — parent-child relationships with no cycles',
        'Binary tree: every node has at most 2 children — left and right',
        'Each node in C has: data, *left pointer, *right pointer. Both are NULL for leaf nodes',
        'Inorder (L → Root → R): produces sorted output on a BST — most important traversal',
        'Preorder (Root → L → R): visits parent before children — used to copy or serialize trees',
        'Postorder (L → R → Root): visits children before parent — used to delete trees safely',
        'Level order: visits level by level using a queue (BFS) — gives shortest path in unweighted trees',
        'Height = longest root-to-leaf path in edges. height(NULL) = -1. height(leaf) = 0',
        'All traversals are O(n) time — every node visited exactly once',
        'Trees power file systems (preorder), databases (B-trees), HTML (DOM), and compilers',
      ]} />

    </LearnLayout>
  )
}