import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

function Code({ title, children }: { title: string; children: string }) { return <div style={{ margin: '20px 0', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}><div style={{ padding: '8px 14px', background: 'var(--surface)', color: 'var(--muted)', font: '12px var(--font-mono)' }}>{title} · C</div><pre style={{ margin: 0, padding: 18, overflowX: 'auto', background: '#0d0d0d', color: '#e0e0e0', font: '13px/1.7 var(--font-mono)' }}><code>{children}</code></pre></div> }
const p = { color: 'var(--text)', fontSize: 15, lineHeight: 1.85, marginBottom: 14 }
const h = { color: 'var(--text)', fontSize: 22, fontWeight: 800, marginTop: 36, marginBottom: 12, fontFamily: 'var(--font-display)' }

export default function MinimumSpanningTreesPage() {
  return <LearnLayout title="Minimum Spanning Trees — Kruskal and Prim" description="Connect every vertex in a weighted graph at minimum total cost using Kruskal and Prim." section="DSA — Lesson 19" readTime="90 min">
    <Callout type="info"><strong>Prerequisites:</strong> graph representation, sorting, priority queues/heaps, and the Union-Find lesson (Lesson 18). A minimum spanning tree (MST) is defined for a connected, undirected, weighted graph.</Callout>
    <h2 style={h}>Objectives: connect all vertices as cheaply as possible</h2>
    <p style={p}>A spanning tree reaches every vertex, has no cycles, and contains exactly V−1 edges. A minimum spanning tree has the smallest possible sum of edge weights among all spanning trees. An application might choose low-cost links between locations, but real network design must also account for capacity, reliability, and constraints beyond this model. Edge weights may be negative; the graph still needs to be undirected and connected for a spanning tree over all vertices to exist.</p>
    <Callout type="tip">This lesson explains two MST algorithms. The recently added <Link href="/learn/dsa/interview-patterns" style={{ color: 'var(--green)' }}>Interview Problem-Solving Patterns →</Link> unit contains separate interview drills, so we link to it rather than repeating its question set.</Callout>

    <h2 style={h}>1. Greedy choice with a correctness argument</h2>
    <p style={p}>Both algorithms use a safe-edge principle: among the edges crossing a cut that separates already-connected work from the rest, a minimum-weight crossing edge can be included in some MST. Kruskal grows a forest by taking the globally lightest edge that connects two components. Prim grows one tree by choosing the lightest edge that leaves the current tree. The choices differ, but each maintains a partial forest that can be extended to an MST.</p>
    <div style={{ overflowX: 'auto', margin: '18px 0' }}><table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text)', fontSize: 14 }}><thead><tr>{['Property', 'Kruskal', 'Prim'].map(x => <th key={x} style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid var(--border)' }}>{x}</th>)}</tr></thead><tbody>{[
      ['Growth model', 'Forest; merge components', 'One tree; expand its frontier'],
      ['Main data structure', 'Sorted edges + DSU', 'Min-priority queue or array of keys'],
      ['Typical sparse-graph cost', 'O(E log E)', 'O(E log V) with a binary heap'],
      ['Disconnected graph', 'Returns a minimum spanning forest', 'One run covers only one component'],
    ].map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} style={{ padding: 10, borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{cell}</td>)}</tr>)}</tbody></table></div>

    <h2 style={h}>2. Kruskal: sort edges, accept safe connections</h2>
    <p style={p}>Sort all edges by nondecreasing weight. For each edge (u, v), use DSU to check whether u and v are already in the same component. If so, adding it would form a cycle, so skip it. Otherwise accept the edge and merge the components. Stop after selecting V−1 edges for a connected input. Sorting dominates the running time; DSU operations are near constant amortized time.</p>
    <Code title="Kruskal with edge sorting and Union-Find">{`#include <stdbool.h>
#include <stdlib.h>

typedef struct { int u, v, weight; } Edge;

int compare_edges(const void *left, const void *right) {
    const Edge *a = left;
    const Edge *b = right;
    return (a->weight > b->weight) - (a->weight < b->weight);
}

int find_root(int parent[], int x) {
    if (parent[x] != x) parent[x] = find_root(parent, parent[x]);
    return parent[x];
}

bool merge_sets(int parent[], int size[], int a, int b) {
    int ra = find_root(parent, a), rb = find_root(parent, b);
    if (ra == rb) return false;
    if (size[ra] < size[rb]) { int t = ra; ra = rb; rb = t; }
    parent[rb] = ra;
    size[ra] += size[rb];
    return true;
}

bool kruskal(int n, Edge edges[], int edge_count, long long *cost_out) {
    if (n <= 0 || edge_count < 0 || cost_out == NULL || (edge_count > 0 && edges == NULL)) return false;
    for (int i = 0; i < edge_count; i++)
        if (edges[i].u < 0 || edges[i].u >= n || edges[i].v < 0 || edges[i].v >= n) return false;
    if (edge_count > 1) qsort(edges, edge_count, sizeof(Edge), compare_edges);
    int parent[n], size[n];
    for (int i = 0; i < n; i++) { parent[i] = i; size[i] = 1; }
    int chosen = 0;
    long long cost = 0;
    for (int i = 0; i < edge_count && chosen < n - 1; i++) {
        if (merge_sets(parent, size, edges[i].u, edges[i].v)) {
            cost += edges[i].weight;
            chosen++;
        }
    }
    if (chosen != n - 1) return false;
    *cost_out = cost;
    return true;
}`}</Code>
    <p style={p}>The comparator avoids subtracting weights, which could overflow. This teaching API sorts the caller’s edge array in place and uses variable-length local arrays for DSU; document those choices or copy edges and allocate storage dynamically in a larger application. Validate every endpoint is in 0…n−1 before indexing. For n = 1, zero selected edges is a valid tree of cost zero.</p>

    <h2 style={h}>3. Prim: keep the cheapest edge to the tree</h2>
    <p style={p}>Prim maintains a key for each vertex outside the growing tree: the cheapest edge seen so far that connects it to a vertex already inside. Each step adds the outside vertex with minimum key and relaxes its neighbours. A heap makes this efficient on sparse graphs; a simple O(V²) implementation is easier to inspect for dense graphs or small teaching examples.</p>
    <Code title="Prim with an adjacency matrix">{`#include <stdbool.h>
#include <limits.h>
#define MAX_V 100
#define INF (LLONG_MAX / 4)

bool prim_cost(int n, long long weight[MAX_V][MAX_V], long long *cost_out) {
    if (n <= 0 || n > MAX_V || cost_out == NULL) return false;
    long long key[MAX_V];
    int in_tree[MAX_V] = {0};
    for (int v = 0; v < n; v++) key[v] = INF;
    key[0] = 0;
    long long cost = 0;
    for (int step = 0; step < n; step++) {
        int current = -1;
        for (int v = 0; v < n; v++)
            if (!in_tree[v] && (current == -1 || key[v] < key[current]))
                current = v;
        if (current == -1 || key[current] == INF) return false;
        in_tree[current] = 1;
        cost += key[current];
        for (int next = 0; next < n; next++) {
            if (!in_tree[next] && weight[current][next] < key[next])
                key[next] = weight[current][next];
        }
    }
    *cost_out = cost;
    return true;
}`}</Code>
    <p style={p}>Initialize absent edges to INF, not zero: zero-weight edges are valid and must be considered. Because the graph is undirected, the matrix must be symmetric. The first chosen key is zero for the starting vertex; each later key is the edge that attaches that vertex. If a remaining vertex has INF, the graph is disconnected. Negative weights are okay for MSTs because Prim’s choice does not rely on non-negative shortest-path distances.</p>
    <Code title="Compare both algorithms on the same connected graph">{`#include <stdio.h>

int main(void) {
    Edge edges[] = {{0, 1, 1}, {1, 2, 2}, {2, 3, 3}, {0, 2, 5}, {0, 3, 10}};
    int edge_count = sizeof(edges) / sizeof(edges[0]);
    long long weight[MAX_V][MAX_V];
    for (int i = 0; i < MAX_V; i++)
        for (int j = 0; j < MAX_V; j++) weight[i][j] = (i == j) ? 0 : INF;
    for (int i = 0; i < edge_count; i++) {
        int u = edges[i].u, v = edges[i].v;
        weight[u][v] = weight[v][u] = edges[i].weight;
    }
    long long kruskal_total, prim_total;
    if (!kruskal(4, edges, edge_count, &kruskal_total)) return 1;
    if (!prim_cost(4, weight, &prim_total)) return 1;
    printf("Kruskal: %lld, Prim: %lld\n", kruskal_total, prim_total);
    return kruskal_total == prim_total ? 0 : 1;
}`}</Code>
    <p style={p}>Both totals are 6 for this example. In a real test, assert not only that the totals agree, but also that the chosen edges connect every vertex without a cycle. Two algorithms returning the same total is a useful cross-check, not a proof by itself.</p>

    <h2 style={h}>4. Understand the selected edges, not only the cost</h2>
    <p style={p}>For a connected graph, any valid output has V−1 selected edges and no cycle. If all edge weights are distinct, the MST is unique. With ties, multiple different trees can have the same minimum cost; tests should validate spanning and total cost rather than one exact edge list. If the graph is disconnected, Kruskal can still produce a minimum spanning forest, but there is no spanning tree covering all vertices. Prim must be restarted for each connected component to produce a forest.</p>
    <Callout type="example">For a set of campuses with candidate fibre links weighted by installation cost, MST gives the cheapest network that keeps all campuses connected under a simple undirected model. If the links have direction, bandwidth limits, redundancy requirements, or multiple objectives, that is a different optimization problem.</Callout>

    <h2 style={h}>5. Common mistakes</h2>
    <ul style={{ ...p, paddingLeft: 22 }}><li><strong>Using shortest-path logic instead of MST logic:</strong> an MST minimizes total tree-edge cost, not each vertex’s route distance from a source.</li><li><strong>Accepting every sorted edge in Kruskal:</strong> DSU must reject edges whose endpoints already share a component, otherwise a cycle forms.</li><li><strong>Using zero as “no edge”:</strong> zero-weight connections are valid. Use a sentinel such as INF that cannot be confused with a real weight.</li><li><strong>Assuming a disconnected graph has an MST:</strong> detect that fewer than V−1 edges were selected or that Prim cannot reach every vertex.</li></ul>

    <h2 style={h}>6. Practice</h2>
    <ol style={{ ...p, paddingLeft: 22 }}><li>Run Kruskal by hand on a graph with one equal-weight tie. Show why two different selected edge sets can both be minimum.</li><li>Return the chosen edges as well as total cost. Explain how your output changes when the graph is disconnected.</li><li>Implement Prim with an adjacency list and min-heap. Record the complexity and how stale heap entries are handled.</li><li>Compare Kruskal and Prim on a dense graph and a sparse graph. State representation and complexity assumptions.</li><li>Test n = 1, disconnected components, negative weights, zero-weight edges, duplicate edges, and a graph with equal weights.</li></ol>
    <KeyTakeaways items={['An MST connects every vertex without cycles using exactly V−1 edges for a connected graph.', 'Kruskal sorts edges and uses DSU to accept only component-joining edges.', 'Prim expands one tree by selecting the cheapest edge to an outside vertex.', 'Both algorithms rely on safe minimum edges but grow the solution differently.', 'Zero and negative edge weights can be valid; missing edges need a separate sentinel.', 'The Interview Problem-Solving Patterns lesson contains separate interview practice.']} />
    <h2 style={h}>Next</h2><p style={p}>Continue from graph optimization to a different way of reusing subproblem answers.</p><p><Link href="/learn/dsa/dynamic-programming" style={{ color: 'var(--green)' }}>Lesson 20 · Dynamic Programming →</Link></p>
  </LearnLayout>
}
