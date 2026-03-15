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

/* ── Graph node circle ── */
const GNode = ({ label, x, y, highlight, color = 'var(--green)' }: { label: string | number; x: number; y: number; highlight?: boolean; color?: string }) => (
  <g>
    <circle cx={x} cy={y} r={20} fill={highlight ? color : `${color}20`} stroke={color} strokeWidth={2} />
    <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fill={highlight ? '#000' : color} fontSize={14} fontWeight={800} fontFamily="monospace">
      {label}
    </text>
  </g>
)

/* ── Graph edge ── */
const GEdge = ({ x1, y1, x2, y2, weight, directed, color = 'var(--border)' }: { x1: number; y1: number; x2: number; y2: number; weight?: number; directed?: boolean; color?: string }) => {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2} markerEnd={directed ? 'url(#arrow)' : undefined} />
      {weight !== undefined && (
        <text x={mx} y={my - 8} textAnchor="middle" fill="#facc15" fontSize={11} fontFamily="monospace" fontWeight={700}>
          {weight}
        </text>
      )}
    </g>
  )
}

export default function GraphsPage() {
  return (
    <LearnLayout
      title="Unit 15 — Graphs"
      description="Nodes connected by edges in any direction. Maps, social networks, flight routes, dependency graphs — every complex relationship is a graph. BFS, DFS, Dijkstra's, topological sort — all from scratch."
      section="DSA"
      readTime="120 min"
      updatedAt="March 2026"
    >

      {/* ── Badges ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'UNIT 15', green: true },
          { label: 'Prerequisite: Units 05 + 07 + 14', green: false },
          { label: '120 min read', green: false },
        ].map((b) => (
          <span key={b.label} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: b.green ? 700 : 600, color: b.green ? 'var(--green)' : 'var(--muted)', background: b.green ? 'rgba(0,230,118,0.1)' : 'var(--surface)', border: `1px solid ${b.green ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`, borderRadius: 6, padding: '4px 10px' }}>
            {b.label}
          </span>
        ))}
      </div>

      <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Every data structure we have covered — arrays, linked lists, trees — has been
        a special case of a graph. A linked list is a graph where each node connects
        to exactly one other. A tree is a graph with no cycles and one root.
        A graph removes all these restrictions. Any node can connect to any other node.
        Connections can go in both directions or just one. There can be cycles.
        This generality makes graphs the most powerful and most widely used
        data structure in computer science.
      </p>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85 }}>
        In this unit we build graphs from scratch, implement BFS and DFS,
        find shortest paths with Dijkstra's algorithm, detect cycles,
        and sort dependencies with topological sort — all in C.
      </p>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 1 — WHAT IS A GRAPH
      ══════════════════════════════════════ */}
      <SectionTag text="Section 1" />
      <SectionTitle>What is a Graph?</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        A graph is a collection of <strong style={{ color: 'var(--green)' }}>vertices</strong> (also called nodes)
        connected by <strong style={{ color: 'var(--green)' }}>edges</strong> (also called links or connections).
        That is all. No root, no parent-child, no left-right. Just nodes and connections.
      </p>

      {/* Real world examples */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 28 }}>
        {[
          { icon: '🗺️', title: 'Maps', desc: 'Cities are nodes. Roads are edges. Distance is the edge weight.' },
          { icon: '👥', title: 'Social networks', desc: 'People are nodes. Friendships are edges. LinkedIn, Instagram, Facebook.' },
          { icon: '✈️', title: 'Flight routes', desc: 'Airports are nodes. Direct flights are edges. Cost is the weight.' },
          { icon: '🌐', title: 'The internet', desc: 'Web pages are nodes. Hyperlinks are directed edges. Google PageRank uses this.' },
          { icon: '📦', title: 'Build systems', desc: 'Tasks are nodes. Dependencies are edges. Build A before B before C.' },
          { icon: '🧬', title: 'Neural networks', desc: 'Neurons are nodes. Synaptic connections are weighted edges.' },
        ].map((item) => (
          <div key={item.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{item.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 2 — TYPES OF GRAPHS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 2" />
      <SectionTitle>Types of Graphs — Know These Cold</SectionTitle>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, marginBottom: 28 }}>
        {[
          {
            name: 'Undirected Graph',
            desc: 'Edges have no direction — if A connects to B then B also connects to A. Friendships on Facebook. Roads you can drive both ways.',
            color: 'var(--green)',
            example: 'A — B — C',
          },
          {
            name: 'Directed Graph (Digraph)',
            desc: 'Edges have a direction — A → B does NOT mean B → A. Twitter follows. One-way streets. Web page links.',
            color: '#4285f4',
            example: 'A → B → C',
          },
          {
            name: 'Weighted Graph',
            desc: 'Each edge has a number (weight) — typically representing distance, cost, or time. Used in shortest path algorithms.',
            color: '#facc15',
            example: 'A —5— B —3— C',
          },
          {
            name: 'Cyclic Graph',
            desc: 'Contains at least one cycle — a path that starts and ends at the same node. Most real-world graphs have cycles.',
            color: '#f97316',
            example: 'A → B → C → A',
          },
          {
            name: 'Acyclic Graph (DAG)',
            desc: 'No cycles. Directed Acyclic Graph. Used for dependency resolution, build systems, course prerequisites.',
            color: '#7b61ff',
            example: 'A → B → C (no way back)',
          },
          {
            name: 'Connected Graph',
            desc: 'Every node can be reached from every other node. If any node is isolated — the graph is disconnected.',
            color: '#00e676',
            example: 'All nodes reachable',
          },
        ].map((item) => (
          <div key={item.name} style={{ background: 'var(--surface)', border: `1px solid ${item.color}33`, borderRadius: 10, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 6 }}>{item.name}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 10 }}>{item.desc}</div>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: item.color, background: `${item.color}10`, padding: '3px 8px', borderRadius: 4 }}>{item.example}</code>
          </div>
        ))}
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 3 — REPRESENTATIONS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 3" />
      <SectionTitle>Graph Representation — Adjacency Matrix vs Adjacency List</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        How do you store a graph in memory? There are two standard ways.
        Each has different tradeoffs for space and time. Choosing the right one
        depends on whether your graph is dense (many edges) or sparse (few edges).
      </p>

      {/* Graph we'll represent */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // Example undirected graph — 5 nodes, 6 edges
        </div>
        <svg width="280" height="160" viewBox="0 0 280 160" style={{ display: 'block', margin: '0 auto' }}>
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="var(--border)" />
            </marker>
          </defs>
          <GEdge x1={80} y1={40} x2={200} y2={40} />
          <GEdge x1={80} y1={40} x2={40} y2={120} />
          <GEdge x1={80} y1={40} x2={160} y2={120} />
          <GEdge x1={200} y1={40} x2={240} y2={120} />
          <GEdge x1={200} y1={40} x2={160} y2={120} />
          <GEdge x1={40} y1={120} x2={160} y2={120} />
          <GNode label={0} x={80} y={40} highlight />
          <GNode label={1} x={200} y={40} />
          <GNode label={2} x={40} y={120} />
          <GNode label={3} x={160} y={120} />
          <GNode label={4} x={240} y={120} />
        </svg>
        <div style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginTop: 12, fontFamily: 'var(--font-mono)' }}>
          Edges: 0-1, 0-2, 0-3, 1-3, 1-4, 2-3
        </div>
      </div>

      {/* Adjacency Matrix */}
      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 12 }}>
        Method 1 — Adjacency Matrix
      </h3>
      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 16 }}>
        A 2D array where <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>matrix[i][j] = 1</code> means there is an edge from i to j.
        For weighted graphs, store the weight instead of 1.
      </p>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // Adjacency matrix for our 5-node graph
        </div>
        <table style={{ borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
          <thead>
            <tr>
              <th style={{ padding: '6px 14px', color: 'var(--muted)', fontWeight: 600 }}></th>
              {[0, 1, 2, 3, 4].map(c => (
                <th key={c} style={{ padding: '6px 14px', color: 'var(--green)', fontWeight: 700 }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              [0, 1, 1, 1, 0],
              [1, 0, 0, 1, 1],
              [1, 0, 0, 1, 0],
              [1, 1, 1, 0, 0],
              [0, 1, 0, 0, 0],
            ].map((row, ri) => (
              <tr key={ri}>
                <td style={{ padding: '6px 14px', color: 'var(--green)', fontWeight: 700 }}>{ri}</td>
                {row.map((v, ci) => (
                  <td key={ci} style={{ padding: '6px 14px', color: v ? 'var(--green)' : 'var(--border)', fontWeight: v ? 700 : 400, background: v ? 'rgba(0,230,118,0.06)' : 'transparent', textAlign: 'center', border: '1px solid var(--border)' }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', gap: 24, marginTop: 14, flexWrap: 'wrap', fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          <span>Space: O(V²)</span>
          <span>Edge lookup: O(1)</span>
          <span>List all neighbours: O(V)</span>
        </div>
      </div>

      {/* Adjacency List */}
      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 12, marginTop: 28 }}>
        Method 2 — Adjacency List
      </h3>
      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 16 }}>
        An array of linked lists. Each index holds the list of neighbours for that node.
        Only actual edges are stored — much more space-efficient for sparse graphs.
        This is what almost every real graph algorithm uses.
      </p>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // Adjacency list for same graph
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { node: 0, neighbours: [1, 2, 3] },
            { node: 1, neighbours: [0, 3, 4] },
            { node: 2, neighbours: [0, 3] },
            { node: 3, neighbours: [0, 1, 2] },
            { node: 4, neighbours: [1] },
          ].map((row) => (
            <div key={row.node} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: '6px 0 0 6px', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800, color: 'var(--green)', flexShrink: 0 }}>
                {row.node}
              </div>
              <div style={{ height: 36, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg2)', border: '1px solid var(--border)', borderLeft: 'none', borderRadius: '0 6px 6px 0', padding: '0 12px', flex: 1 }}>
                {row.neighbours.map((n, i) => (
                  <React.Fragment key={n}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{n}</span>
                    {i < row.neighbours.length - 1 && <span style={{ color: 'var(--muted)', fontSize: 12 }}>→</span>}
                  </React.Fragment>
                ))}
                <span style={{ color: 'var(--border)', fontSize: 12, fontFamily: 'var(--font-mono)', marginLeft: 4 }}>→ NULL</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 14, flexWrap: 'wrap', fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          <span>Space: O(V + E)</span>
          <span>Edge lookup: O(degree)</span>
          <span>List all neighbours: O(degree)</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
        <div style={{ background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 8 }}>Use Matrix when</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
            Graph is dense (many edges). Need O(1) edge lookup. V is small (fewer than ~1000).
          </div>
        </div>
        <div style={{ background: 'rgba(66,133,244,0.06)', border: '1px solid rgba(66,133,244,0.2)', borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#4285f4', marginBottom: 8 }}>Use List when</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
            Graph is sparse (few edges). Memory matters. V is large. Almost every real-world case.
          </div>
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <stdlib.h>

#define V 5  /* number of vertices */

/* node in the adjacency list */
struct AdjNode {
    int dest;
    int weight;           /* 0 if unweighted */
    struct AdjNode *next;
};
typedef struct AdjNode AdjNode;

/* graph: array of adjacency list heads */
AdjNode *graph[V];

void initGraph() {
    int i;
    for (i = 0; i < V; i++) graph[i] = NULL;
}

/* add an undirected edge between u and v */
void addEdge(int u, int v, int weight) {
    /* add v to u's list */
    AdjNode *newU = malloc(sizeof(AdjNode));
    newU->dest = v; newU->weight = weight;
    newU->next = graph[u]; graph[u] = newU;

    /* add u to v's list (undirected — both directions) */
    AdjNode *newV = malloc(sizeof(AdjNode));
    newV->dest = u; newV->weight = weight;
    newV->next = graph[v]; graph[v] = newV;
}

void printGraph() {
    int i;
    for (i = 0; i < V; i++) {
        printf("%d: ", i);
        AdjNode *current = graph[i];
        while (current) {
            printf("%d ", current->dest);
            current = current->next;
        }
        printf("\\n");
    }
}

int main() {
    initGraph();
    addEdge(0, 1, 0);
    addEdge(0, 2, 0);
    addEdge(0, 3, 0);
    addEdge(1, 3, 0);
    addEdge(1, 4, 0);
    addEdge(2, 3, 0);
    printGraph();
    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 4 — BFS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 4" />
      <SectionTitle>BFS — Breadth First Search</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        BFS explores a graph <strong style={{ color: 'var(--green)' }}>level by level</strong> —
        all neighbours at distance 1 first, then distance 2, then distance 3, and so on.
        It uses a <strong>queue</strong> — exactly like level order traversal of a tree from Unit 11.
        BFS finds the <strong>shortest path</strong> in an unweighted graph —
        the first time it reaches a node, it has found the fewest-step route.
      </p>

      {/* BFS trace visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // BFS from node 0 — visit level by level
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { step: '1', queue: '[0]', visited: '0', action: 'Start: enqueue node 0', color: 'var(--green)' },
            { step: '2', queue: '[1, 2, 3]', visited: '0, 1, 2, 3', action: 'Dequeue 0, enqueue neighbours 1, 2, 3', color: '#4285f4' },
            { step: '3', queue: '[2, 3, 3, 4]', visited: '0, 1, 2, 3, 4', action: 'Dequeue 1, enqueue unvisited neighbours 3 (already), 4', color: '#4285f4' },
            { step: '4', queue: '[]', visited: '0, 1, 2, 3, 4', action: 'Continue dequeuing — all nodes visited', color: 'var(--green)' },
          ].map((item) => (
            <div key={item.step} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'var(--bg2)', border: `1px solid ${item.color}22`, borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: item.color, color: '#000', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.step}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: 'var(--text)', marginBottom: 4 }}>{item.action}</div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>Queue: {item.queue}</span>
                  <span style={{ fontSize: 11, color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>Visited: {item.visited}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: '8px 14px', background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--green)', fontWeight: 700 }}>
          BFS order: 0 → 1 → 2 → 3 → 4
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <stdlib.h>

#define V 5
#define QMAX 100

AdjNode *graph[V];  /* adjacency list from previous section */

void bfs(int start) {
    int visited[V];
    int queue[QMAX];
    int front = 0, rear = 0;
    int i;

    /* initialise — nothing visited yet */
    for (i = 0; i < V; i++) visited[i] = 0;

    /* enqueue start node and mark visited */
    queue[rear++] = start;
    visited[start] = 1;

    printf("BFS from %d: ", start);

    while (front < rear) {
        int node = queue[front++];  /* dequeue */
        printf("%d ", node);

        /* enqueue all unvisited neighbours */
        AdjNode *curr = graph[node];
        while (curr != NULL) {
            if (!visited[curr->dest]) {
                visited[curr->dest] = 1;
                queue[rear++] = curr->dest;
            }
            curr = curr->next;
        }
    }
    printf("\\n");
}

/* BFS also finds shortest path in unweighted graph */
void shortestPathBFS(int start, int end) {
    int visited[V], parent[V], dist[V];
    int queue[QMAX];
    int front = 0, rear = 0;
    int i;

    for (i = 0; i < V; i++) {
        visited[i] = 0;
        parent[i]  = -1;
        dist[i]    = -1;
    }

    queue[rear++]  = start;
    visited[start] = 1;
    dist[start]    = 0;

    while (front < rear) {
        int node = queue[front++];

        AdjNode *curr = graph[node];
        while (curr != NULL) {
            if (!visited[curr->dest]) {
                visited[curr->dest] = 1;
                parent[curr->dest]  = node;
                dist[curr->dest]    = dist[node] + 1;
                queue[rear++]       = curr->dest;
            }
            curr = curr->next;
        }
    }

    if (dist[end] == -1) {
        printf("No path from %d to %d\\n", start, end);
        return;
    }

    printf("Shortest path from %d to %d: distance = %d\\n", start, end, dist[end]);

    /* trace path using parent array */
    int path[V], len = 0, cur = end;
    while (cur != -1) { path[len++] = cur; cur = parent[cur]; }

    printf("Path: ");
    for (i = len - 1; i >= 0; i--) printf("%d ", path[i]);
    printf("\\n");
}

int main() {
    initGraph();
    addEdge(0,1,0); addEdge(0,2,0); addEdge(0,3,0);
    addEdge(1,3,0); addEdge(1,4,0); addEdge(2,3,0);

    bfs(0);                    /* BFS from 0: 0 1 2 3 4 */
    shortestPathBFS(0, 4);     /* Shortest: distance=2, Path: 0 1 4 */
    return 0;
}`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time:</span>
          <ComplexityBadge value="O(V + E)" color="#00e676" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Space:</span>
          <ComplexityBadge value="O(V)" color="#00e676" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(visited array + queue)</span>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 5 — DFS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 5" />
      <SectionTitle>DFS — Depth First Search</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        DFS goes <strong style={{ color: 'var(--green)' }}>as deep as possible</strong> before
        backtracking. Start at a node, pick any unvisited neighbour and go there,
        then repeat. When you reach a dead end (all neighbours visited), backtrack
        and try another path. DFS uses the <strong>call stack</strong> naturally through
        recursion — or an explicit stack if iterative. DFS is used for cycle detection,
        topological sort, maze solving, and finding connected components.
      </p>

      {/* DFS trace */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          // DFS from node 0 — go deep first
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', lineHeight: 2.2 }}>
          visit(0) → neighbours: 1, 2, 3 → go to 1<br />
          {'  '}visit(1) → neighbours: 0✓, 3, 4 → go to 3<br />
          {'    '}visit(3) → neighbours: 0✓, 1✓, 2 → go to 2<br />
          {'      '}visit(2) → neighbours: 0✓, 3✓ → <span style={{ color: '#f97316' }}>backtrack</span><br />
          {'    '}→ <span style={{ color: '#f97316' }}>backtrack</span> from 3<br />
          {'  '}→ go to 4<br />
          {'    '}visit(4) → neighbours: 1✓ → <span style={{ color: '#f97316' }}>backtrack</span><br />
          <span style={{ color: 'var(--green)', fontWeight: 700 }}>DFS order: 0 → 1 → 3 → 2 → 4</span>
        </div>
      </div>

      <CodeBlock code={`int visitedDFS[V];

void dfsRecursive(int node) {
    visitedDFS[node] = 1;
    printf("%d ", node);

    AdjNode *curr = graph[node];
    while (curr != NULL) {
        if (!visitedDFS[curr->dest]) {
            dfsRecursive(curr->dest);  /* go deep */
        }
        curr = curr->next;
    }
    /* when all neighbours visited — backtrack (return) */
}

void dfs(int start) {
    int i;
    for (i = 0; i < V; i++) visitedDFS[i] = 0;
    printf("DFS from %d: ", start);
    dfsRecursive(start);
    printf("\\n");
}

/* DFS on ALL nodes — handles disconnected graphs */
void dfsAll() {
    int i;
    for (i = 0; i < V; i++) visitedDFS[i] = 0;

    printf("DFS (all): ");
    for (i = 0; i < V; i++) {
        if (!visitedDFS[i]) {
            dfsRecursive(i);  /* start new DFS from unvisited node */
        }
    }
    printf("\\n");
}

int main() {
    initGraph();
    addEdge(0,1,0); addEdge(0,2,0); addEdge(0,3,0);
    addEdge(1,3,0); addEdge(1,4,0); addEdge(2,3,0);

    dfs(0);   /* DFS from 0: 0 1 3 2 4 */
    return 0;
}`} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
        <div style={{ background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 8 }}>BFS — use when</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
            Finding shortest path in unweighted graph.
            Level-order exploration. Minimum steps between nodes.
          </div>
        </div>
        <div style={{ background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.2)', borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#7b61ff', marginBottom: 8 }}>DFS — use when</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
            Detecting cycles. Topological sort. Finding connected components.
            Exploring all possible paths (backtracking).
          </div>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 6 — CYCLE DETECTION
      ══════════════════════════════════════ */}
      <SectionTag text="Section 6" />
      <SectionTitle>Cycle Detection — Is There a Loop?</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Detecting whether a graph has a cycle is a classic problem. The approach is different
        for undirected and directed graphs. For an <strong>undirected graph</strong>:
        during DFS, if you visit a neighbour that is already visited AND it is not the
        parent you just came from — you have found a cycle.
      </p>

      <CodeBlock code={`int hasCycleHelper(int node, int parent, int visited[]) {
    visited[node] = 1;

    AdjNode *curr = graph[node];
    while (curr != NULL) {
        if (!visited[curr->dest]) {
            /* unvisited — continue DFS */
            if (hasCycleHelper(curr->dest, node, visited)) return 1;
        } else if (curr->dest != parent) {
            /* visited AND not the parent → back edge → CYCLE */
            return 1;
        }
        curr = curr->next;
    }
    return 0;
}

int hasCycle() {
    int visited[V], i;
    for (i = 0; i < V; i++) visited[i] = 0;

    for (i = 0; i < V; i++) {
        if (!visited[i]) {
            if (hasCycleHelper(i, -1, visited)) return 1;
        }
    }
    return 0;
}

int main() {
    initGraph();
    addEdge(0, 1, 0); addEdge(1, 2, 0); addEdge(2, 0, 0); /* 0-1-2-0 cycle */
    printf("Has cycle: %s\\n", hasCycle() ? "YES" : "NO");  /* YES */
    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 7 — DIJKSTRA
      ══════════════════════════════════════ */}
      <SectionTag text="Section 7" />
      <SectionTitle>Dijkstra's Algorithm — Shortest Path in Weighted Graph</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        BFS finds the shortest path by number of hops in an unweighted graph.
        But what if edges have different costs — distances, travel times, prices?
        <strong style={{ color: 'var(--green)' }}> Dijkstra's algorithm</strong> finds
        the shortest path from one source node to all other nodes in a weighted graph
        with non-negative edge weights.
      </p>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // Weighted graph — find shortest path from 0 to all nodes
        </div>
        <svg width="300" height="160" viewBox="0 0 300 160" style={{ display: 'block', margin: '0 auto' }}>
          <GEdge x1={50} y1={80} x2={150} y2={30} weight={4} color="rgba(0,230,118,0.5)" />
          <GEdge x1={50} y1={80} x2={150} y2={130} weight={2} color="rgba(0,230,118,0.5)" />
          <GEdge x1={150} y1={30} x2={250} y2={80} weight={5} color="rgba(0,230,118,0.5)" />
          <GEdge x1={150} y1={130} x2={250} y2={80} weight={3} color="rgba(0,230,118,0.5)" />
          <GEdge x1={150} y1={30} x2={150} y2={130} weight={1} color="rgba(0,230,118,0.5)" />
          <GNode label={0} x={50} y={80} highlight />
          <GNode label={1} x={150} y={30} />
          <GNode label={2} x={150} y={130} />
          <GNode label={3} x={250} y={80} />
        </svg>
        <div style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginTop: 8, fontFamily: 'var(--font-mono)' }}>
          0→1: weight 4 | 0→2: weight 2 | 1→3: weight 5 | 2→3: weight 3 | 1→2: weight 1
        </div>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
          Dijkstra's idea — always process the closest unvisited node:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { step: '1', text: 'Set distance to source = 0, all others = ∞', color: '#4285f4' },
            { step: '2', text: 'Pick the unvisited node with smallest distance (greedy choice)', color: 'var(--green)' },
            { step: '3', text: 'For each neighbour: if dist[current] + edge weight < dist[neighbour], update dist[neighbour]', color: 'var(--green)' },
            { step: '4', text: 'Mark current node as visited. Repeat until all visited.', color: '#4285f4' },
          ].map(item => (
            <div key={item.step} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--bg2)', border: `1px solid ${item.color}22`, borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: item.color, color: '#000', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.step}</div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dijkstra trace table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          // Dijkstra trace from node 0
        </div>
        <table style={{ borderCollapse: 'collapse', fontSize: 12, fontFamily: 'var(--font-mono)', width: '100%' }}>
          <thead>
            <tr>
              {['Step', 'Current', 'dist[0]', 'dist[1]', 'dist[2]', 'dist[3]'].map(h => (
                <th key={h} style={{ padding: '6px 12px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontWeight: 600, textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Init', '—', '0', '∞', '∞', '∞'],
              ['1', '0', '0', '4', '2', '∞'],
              ['2', '2', '0', '3', '2', '5'],
              ['3', '1', '0', '3', '2', '5'],
              ['4', '3', '0', '3', '2', '5'],
            ].map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: '7px 12px', borderBottom: '1px solid var(--border)', color: ci === 0 || ci === 1 ? 'var(--muted)' : 'var(--green)', fontWeight: ci > 1 && cell !== '∞' ? 700 : 400 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 10, fontSize: 12, color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
          Final: 0→0=0, 0→1=3, 0→2=2, 0→3=5
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <limits.h>

#define V 4
#define INF INT_MAX

/* weighted adjacency matrix for Dijkstra */
int wGraph[V][V] = {
    {0, 4, 2, 0},  /* 0→1: weight 4, 0→2: weight 2 */
    {4, 0, 1, 5},  /* 1→0: 4, 1→2: 1, 1→3: 5 */
    {2, 1, 0, 3},  /* 2→0: 2, 2→1: 1, 2→3: 3 */
    {0, 5, 3, 0},  /* 3→1: 5, 3→2: 3 */
};

/* find the unvisited node with minimum distance */
int minDistance(int dist[], int visited[]) {
    int min = INF, minIdx = -1, i;
    for (i = 0; i < V; i++) {
        if (!visited[i] && dist[i] <= min) {
            min = dist[i]; minIdx = i;
        }
    }
    return minIdx;
}

void dijkstra(int src) {
    int dist[V], visited[V], i, count;

    for (i = 0; i < V; i++) { dist[i] = INF; visited[i] = 0; }
    dist[src] = 0;

    for (count = 0; count < V - 1; count++) {
        int u = minDistance(dist, visited);  /* pick closest unvisited */
        visited[u] = 1;

        /* relax all neighbours of u */
        for (int v = 0; v < V; v++) {
            if (!visited[v] && wGraph[u][v] && dist[u] != INF
                && dist[u] + wGraph[u][v] < dist[v]) {
                dist[v] = dist[u] + wGraph[u][v];  /* shorter path found */
            }
        }
    }

    printf("Shortest distances from node %d:\\n", src);
    for (i = 0; i < V; i++) {
        printf("  to %d: %d\\n", i, dist[i]);
    }
}

int main() {
    dijkstra(0);
    /* Output:
       to 0: 0
       to 1: 3  (0→2→1, cost 2+1=3)
       to 2: 2  (0→2, cost 2)
       to 3: 5  (0→2→3, cost 2+3=5)
    */
    return 0;
}`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time (matrix):</span>
          <ComplexityBadge value="O(V²)" color="#facc15" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time (with min-heap):</span>
          <ComplexityBadge value="O((V+E) log V)" color="#00e676" />
        </div>
      </div>

      <Callout type="warning">
        <strong>Dijkstra does not work with negative edge weights.</strong> If any edge weight
        is negative, use the Bellman-Ford algorithm instead. Negative weights can trick Dijkstra
        into missing shorter paths it already marked as "visited."
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 8 — TOPOLOGICAL SORT
      ══════════════════════════════════════ */}
      <SectionTag text="Section 8" />
      <SectionTitle>Topological Sort — Ordering Dependencies</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Topological sort orders the nodes of a <strong>Directed Acyclic Graph (DAG)</strong>
        such that for every directed edge u → v, node u comes before v in the ordering.
        It is the algorithm that figures out the correct order to do things when
        some tasks depend on others.
      </p>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>Real examples of topological sort:</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { icon: '📚', ex: 'Course prerequisites', desc: 'Must take DSA before System Design. Must take OS before Compilers. Topo sort gives a valid study order.' },
            { icon: '🔧', ex: 'Build systems (make, npm)', desc: 'Compile module A before B because B depends on A. npm install resolves package dependencies using topo sort.' },
            { icon: '🧾', ex: 'Task scheduling', desc: 'Task C requires A and B to be done first. Topo sort gives the valid execution order.' },
          ].map(item => (
            <div key={item.ex} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 3 }}>{item.ex}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        The DFS-based approach: run DFS on every node. When you finish processing a node
        (all its descendants are done), push it onto a stack. When all nodes are processed,
        pop the stack — that is the topological order.
      </p>

      <CodeBlock code={`#include <stdio.h>
#include <stdlib.h>

#define VDAG 6

/* directed graph for topological sort */
/* Represents: 5→2, 5→0, 4→0, 4→1, 2→3, 3→1 */
int dagAdj[VDAG][VDAG] = {
    {0,0,0,0,0,0},  /* node 0 — no outgoing edges */
    {0,0,0,0,0,0},  /* node 1 — no outgoing edges */
    {0,0,0,1,0,0},  /* node 2 → 3 */
    {0,1,0,0,0,0},  /* node 3 → 1 */
    {1,1,0,0,0,0},  /* node 4 → 0, 4 → 1 */
    {1,0,1,0,0,0},  /* node 5 → 0, 5 → 2 */
};

int topoStack[VDAG];
int topoTop = -1;
int topoVisited[VDAG];

void topoSort(int node) {
    topoVisited[node] = 1;
    int i;
    for (i = 0; i < VDAG; i++) {
        if (dagAdj[node][i] && !topoVisited[i]) {
            topoSort(i);  /* go deeper first */
        }
    }
    /* all descendants done — push this node */
    topoStack[++topoTop] = node;
}

int main() {
    int i;
    for (i = 0; i < VDAG; i++) topoVisited[i] = 0;

    /* run DFS from every unvisited node */
    for (i = 0; i < VDAG; i++) {
        if (!topoVisited[i]) topoSort(i);
    }

    printf("Topological order: ");
    while (topoTop >= 0) {
        printf("%d ", topoStack[topoTop--]);
    }
    printf("\\n");
    /* Output: 5 4 2 3 1 0 — one valid topological order */

    return 0;
}`} />

      <Callout type="info">
        <strong>Topological sort only works on DAGs.</strong> If the graph has a cycle, there is no valid
        topological order — a cycle means A depends on B which depends on A which is impossible.
        If you try to topo-sort a graph with a cycle (like circular npm dependencies),
        the algorithm detects the cycle instead of producing an order.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 9 — COMPARISON
      ══════════════════════════════════════ */}
      <SectionTag text="Section 9" />
      <SectionTitle>Graph Algorithms — Side by Side</SectionTitle>

      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Algorithm', 'Data structure', 'Time', 'What it solves'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, background: 'var(--surface)', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['BFS', 'Queue', 'O(V + E)', 'Shortest path (unweighted), level traversal'],
              ['DFS', 'Stack / recursion', 'O(V + E)', 'Cycle detection, topological sort, connectivity'],
              ["Dijkstra's", 'Min-heap + visited', 'O((V+E) log V)', 'Shortest path (weighted, non-negative)'],
              ['Topological Sort', 'Stack + DFS', 'O(V + E)', 'Dependency ordering on DAGs'],
            ].map(([algo, ds, time, use], ri) => (
              <tr key={ri}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--green)', fontWeight: 700 }}>{algo}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{ds}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: '#00e676', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{time}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)', fontSize: 12 }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Common errors */}
      <SectionTag text="Errors You Will Hit" />
      <SectionTitle>Common Graph Mistakes</SectionTitle>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
        {[
          {
            title: 'Forgetting to mark nodes as visited in BFS/DFS',
            symptom: 'Infinite loop — the algorithm visits the same node repeatedly and never terminates',
            fix: 'Always initialise a visited[] array before BFS or DFS and mark visited[node] = 1 immediately when you enqueue (BFS) or enter (DFS) a node.',
          },
          {
            title: 'Using Dijkstra with negative edge weights',
            symptom: 'Incorrect shortest paths — some routes are missed because their source was already marked visited',
            fix: 'Dijkstra requires all edge weights to be non-negative. For negative weights, use Bellman-Ford algorithm instead.',
          },
          {
            title: 'Running topological sort on a cyclic graph',
            symptom: 'Produces an incomplete or incorrect ordering — not all nodes appear',
            fix: 'Check for cycles first (using DFS cycle detection). Topological sort is only valid on DAGs.',
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
      <SectionTitle>You Are Ready for Unit 16</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        You now understand graphs completely — types, representations, BFS, DFS, cycle detection,
        Dijkstra's shortest path, and topological sort. These algorithms appear in
        every serious technical interview and power every map application, social network,
        and build system on earth.
      </p>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 32 }}>
        In Unit 16 we cover <strong style={{ color: 'var(--text)' }}>Dynamic Programming</strong> —
        the hardest and most rewarding topic in all of DSA. Remember what you already computed
        so you never compute it twice. We go from naive recursion to memoization to tabulation,
        solving the knapsack, LCS, coin change, and edit distance problems from first principles.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(0,230,118,0.02) 100%)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 12, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 700, marginBottom: 6 }}>UP NEXT → UNIT 16</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Dynamic Programming — Remember, Don't Recompute</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Memoization, tabulation, knapsack, LCS, coin change, edit distance — in C.</div>
        </div>
        <Link href="/learn/dsa/dynamic-programming" style={{ background: 'var(--green)', color: '#000', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '10px 22px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Coming Soon →
        </Link>
      </div>

      <KeyTakeaways items={[
        'A graph is vertices (nodes) connected by edges — the most general data structure, no root, no direction restrictions',
        'Undirected: edges go both ways. Directed: edges have one direction. Weighted: edges have costs. DAG: directed, no cycles',
        'Adjacency matrix: O(V²) space, O(1) edge lookup — use for dense graphs. Adjacency list: O(V+E) space — use for sparse graphs',
        'BFS uses a queue, explores level by level — finds shortest path in unweighted graphs in O(V+E)',
        'DFS uses recursion (or explicit stack), goes deep first — used for cycle detection, topo sort, connectivity',
        'Mark nodes visited immediately when enqueuing (BFS) or entering (DFS) — never skip this step or you get infinite loops',
        "Dijkstra's finds shortest paths in weighted graphs with non-negative weights — O(V²) naive, O((V+E) log V) with heap",
        'Dijkstra works by always processing the closest unvisited node — greedy approach, correct for non-negative weights only',
        'Topological sort orders a DAG so every edge u→v has u before v — used for dependency resolution and build systems',
        'Topological sort only works on DAGs — if there is a cycle, no valid ordering exists',
      ]} />

    </LearnLayout>
  )
}