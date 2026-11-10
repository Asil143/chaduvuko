import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

function Code({ title, children }: { title: string; children: string }) { return <div style={{ margin: '20px 0', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}><div style={{ padding: '8px 14px', background: 'var(--surface)', color: 'var(--muted)', font: '12px var(--font-mono)' }}>{title} · C</div><pre style={{ margin: 0, padding: 18, overflowX: 'auto', background: '#0d0d0d', color: '#e0e0e0', font: '13px/1.7 var(--font-mono)' }}><code>{children}</code></pre></div> }
const p = { color: 'var(--text)', fontSize: 15, lineHeight: 1.85, marginBottom: 14 }
const h = { color: 'var(--text)', fontSize: 22, fontWeight: 800, marginTop: 36, marginBottom: 12, fontFamily: 'var(--font-display)' }

export default function UnionFindPage() {
  return <LearnLayout title="Union-Find (Disjoint Set Union)" description="Track connected components with path compression and union by size." section="DSA — Lesson 18" readTime="60 min">
    <Callout type="info"><strong>Prerequisites:</strong> arrays, trees, and the Graphs lesson. Disjoint Set Union (DSU), also called Union-Find, is designed for adding connections and answering connectivity queries; it is not a general graph traversal or shortest-path replacement.</Callout>
    <h2 style={h}>Objectives: represent a partition efficiently</h2>
    <p style={p}>DSU maintains a partition of elements into disjoint sets. <code>find(x)</code> returns the representative (root) of x’s set; <code>union(a, b)</code> merges the two sets if they differ. This is useful when edges are added over time and we need to know whether two vertices are connected or whether an edge joins components. The structure is especially useful in Kruskal’s minimum spanning tree algorithm.</p>
    <Callout type="tip">This lesson teaches the data structure used by Kruskal’s algorithm. The <Link href="/learn/dsa/interview-patterns" style={{ color: 'var(--green)' }}>Interview Problem-Solving Patterns →</Link> lesson has a separate DSU pattern summary and practice prompts, so we link there rather than duplicating that unit.</Callout>

    <h2 style={h}>1. Parent forests and representatives</h2>
    <p style={p}>Initially, each element is its own parent and therefore forms a one-element set. A root points to itself. To find the representative of an element, follow parent pointers until reaching a root. A union connects one root beneath another. If we always attach arbitrarily, a chain can grow to length n, making find slow; balancing rules keep the forest shallow.</p>
    <Code title="Initialize and find with path compression">{`void dsu_init(int parent[], int size[], int n) {
    for (int i = 0; i < n; i++) {
        parent[i] = i;
        size[i] = 1;
    }
}

int dsu_find(int parent[], int x) {
    if (parent[x] != x)
        parent[x] = dsu_find(parent, parent[x]);
    return parent[x];
}`}</Code>
    <p style={p}>Path compression rewires visited nodes directly to the root during find. A later lookup along the same path then takes less work. This changes the forest shape but not which elements belong to each set. The recursive implementation is concise; iterative path halving is an alternative when avoiding recursion is important.</p>

    <h2 style={h}>2. Union by size</h2>
    <p style={p}>After finding both roots, attach the smaller tree under the larger one. Update the size only at the new root. If both inputs already share a root, no merge occurs. The returned Boolean is useful to count successful merges or detect whether an undirected edge joined vertices already in the same component.</p>
    <Code title="Union by size; true means two sets were merged">{`#include <stdbool.h>

bool dsu_union(int parent[], int size[], int a, int b) {
    int root_a = dsu_find(parent, a);
    int root_b = dsu_find(parent, b);
    if (root_a == root_b) return false;
    if (size[root_a] < size[root_b]) {
        int temp = root_a;
        root_a = root_b;
        root_b = temp;
    }
    parent[root_b] = root_a;
    size[root_a] += size[root_b];
    return true;
}`}</Code>
    <p style={p}>Union by rank is a related alternative. Rank estimates tree height before path compression; size records the number of members. Either balancing strategy combined with path compression gives near-constant amortized operations, conventionally written O(α(n)), where α is the inverse Ackermann function.</p>

    <h2 style={h}>3. Connectivity and component counts</h2>
    <p style={p}>Two vertices are connected in the DSU’s current partition exactly when their representatives are equal. Keep a component count initialized to n and decrement it only when union succeeds. For a sequence of edge additions, this answers component counts without retraversing the entire graph after each change.</p>
    <Code title="Process edges and maintain components">{`#include <stdbool.h>

int add_edges(int parent[], int size[], int components,
              const int edges[][2], int edge_count) {
    for (int i = 0; i < edge_count; i++) {
        if (dsu_union(parent, size, edges[i][0], edges[i][1]))
            components--;
    }
    return components;
}

bool dsu_connected(int parent[], int a, int b) {
    return dsu_find(parent, a) == dsu_find(parent, b);
}`}</Code>
    <p style={p}>For cycle detection in an undirected graph processed edge by edge, if an edge’s endpoints already have the same representative, adding that edge creates a cycle (assuming the input edge was not otherwise excluded by the problem). DSU cannot report the actual cycle path; DFS/BFS parent tracking is more suitable when the path itself is needed.</p>

    <h2 style={h}>4. Worked trace: merge only when roots differ</h2>
    <p style={p}>Use five elements, numbered 0 through 4. Start with five components. After union(0, 1), there are four; after union(1, 2), there are three. The second call finds 1’s current root before merging, so it joins the entire existing component with 2 rather than treating 1 as an isolated set. Union(3, 4) creates a fourth connection but leaves two components. A repeated union(0, 2) is a no-op, so the count remains two.</p>
    <p style={p}>The exact root chosen depends on the union order and size tie-breaking. A test should assert that 0, 1, and 2 have equal representatives, that 3 and 4 have equal representatives, that these groups differ, and that the component count is two. Avoid hard-coding a particular root value.</p>
    <Callout type="example">For Kruskal, sorting edges is a separate step. DSU does not choose the cheapest edge; it only answers whether an edge would connect two different components. Keep the responsibilities separate: sorting determines candidate order, DSU prevents cycles.</Callout>

    <Code title="Small connectivity demonstration (uses the helpers above)">{`#include <stdio.h>

int main(void) {
    int parent[5], size[5], components = 5;
    dsu_init(parent, size, 5);
    if (dsu_union(parent, size, 0, 1)) components--;
    if (dsu_union(parent, size, 1, 2)) components--;
    if (dsu_union(parent, size, 3, 4)) components--;
    if (dsu_union(parent, size, 0, 2)) components--;
    printf("connected(0, 2)=%d components=%d\n",
           dsu_connected(parent, 0, 2), components);
    return 0;
}`}</Code>
    <p style={p}>The repeated merge does not lower the component count; the output reports 1 for connected and two components. These helpers assume every vertex id is in range, so validate external ids before indexing the parent and size arrays.</p>

    <h2 style={h}>5. What DSU does not support</h2>
    <div style={{ overflowX: 'auto', margin: '18px 0' }}><table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text)', fontSize: 14 }}><thead><tr>{['Operation or task', 'DSU fit?', 'Reason'].map(x => <th key={x} style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid var(--border)' }}>{x}</th>)}</tr></thead><tbody>{[
      ['Add an undirected connection; query connectivity', 'Yes', 'Components only merge, so parent forest captures the partition'],
      ['Remove arbitrary edges', 'Usually no', 'A merge cannot be undone by ordinary DSU'],
      ['Return a path or distance', 'No', 'It stores component membership, not graph routes'],
      ['Kruskal edge acceptance', 'Yes', 'Reject an edge when endpoints already share a root'],
    ].map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} style={{ padding: 10, borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{cell}</td>)}</tr>)}</tbody></table></div>
    <Callout type="warning">Ordinary DSU is optimized for monotone additions: connected components only merge. Supporting deletions requires more advanced offline or dynamic-connectivity techniques; do not pretend a removed edge can simply be “un-unioned.”</Callout>

    <h2 style={h}>6. A second connectivity check</h2>
    <p style={p}>Start with {`{0}, {1}, {2}, {3}, {4}`}. Union(0, 1) and union(1, 2) create one component {`{0,1,2}`}. Union(3, 4) creates {`{3,4}`}; the component count is now two. A query for 0 and 2 returns connected; a query for 0 and 4 does not. Trying to union(0, 2) returns false because it is already one set and leaves the count unchanged.</p>
    <p style={p}>Representatives are implementation details: after different valid union orders, the root for {`{0,1,2}`} may differ. Tests should verify connectivity and component counts, not assume a particular root number.</p>

    <h2 style={h}>7. Common mistakes</h2>
    <ul style={{ ...p, paddingLeft: 22 }}><li><strong>Unioning raw vertices instead of their roots:</strong> attach representatives after calling find, otherwise the sets may not combine correctly.</li><li><strong>Updating the child root’s size:</strong> size is meaningful at roots. Add into the surviving root only.</li><li><strong>Decrementing components on every edge:</strong> duplicate or cycle-forming edges may not merge two sets. Decrement only when union reports success.</li><li><strong>Expecting DSU to handle deletions or return routes:</strong> those operations need different data structures or algorithms.</li></ul>

    <h2 style={h}>8. Practice</h2>
    <ol style={{ ...p, paddingLeft: 22 }}><li>Implement a component counter for n vertices and a list of undirected edges. Compare it with DFS on the same small input.</li><li>Return the number of successful merges, then use it to identify whether an edge closes a cycle.</li><li>Extend DSU with a component-size query. Explain why the answer is valid only when reading the root’s size.</li><li>Process edges in two different orders and show that the representative may change while connectivity stays the same.</li><li>Design test cases for n = 1, repeated edges, self-loops, and disconnected vertices; state any required input validation.</li></ol>
    <KeyTakeaways items={['DSU represents a partition as a forest of parent pointers.', 'Find returns a component representative; union merges distinct roots.', 'Path compression and union by size keep operations near constant amortized time.', 'Decrement the component count only when a union actually merges two sets.', 'Ordinary DSU supports additions, not arbitrary edge deletions or path queries.', 'Kruskal uses DSU to decide whether an edge joins two different components.']} />
    <h2 style={h}>Next</h2><p style={p}>Use DSU to build a minimum spanning tree with Kruskal, then compare it with Prim’s approach.</p><p><Link href="/learn/dsa/minimum-spanning-trees" style={{ color: 'var(--green)' }}>Lesson 19 · Minimum Spanning Trees — Kruskal and Prim →</Link></p>
  </LearnLayout>
}
