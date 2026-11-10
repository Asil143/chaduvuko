import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

function Code({ title, children }: { title: string; children: string }) { return <div style={{ margin: '20px 0', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}><div style={{ padding: '8px 14px', background: 'var(--surface)', color: 'var(--muted)', font: '12px var(--font-mono)' }}>{title} · C</div><pre style={{ margin: 0, padding: 18, overflowX: 'auto', background: '#0d0d0d', color: '#e0e0e0', font: '13px/1.7 var(--font-mono)' }}><code>{children}</code></pre></div> }
const p = { color: 'var(--text)', fontSize: 15, lineHeight: 1.85, marginBottom: 14 }
const h = { color: 'var(--text)', fontSize: 22, fontWeight: 800, marginTop: 36, marginBottom: 12, fontFamily: 'var(--font-display)' }

export default function GraphAlgorithmsPage() {
  return <LearnLayout title="Graph Algorithms — BFS/DFS Applications, Topological Sort, Shortest Paths" description="Apply graph traversals to reachability, dependencies, and shortest paths." section="DSA — Lesson 23" readTime="120 min">
    <Callout type="info"><strong>Prerequisites:</strong> the Graphs lesson (Lesson 16), queues, stacks/recursion, and Big O. The examples use a small adjacency matrix so every storage detail is visible; for sparse large graphs, adjacency lists reduce traversal to O(V + E).</Callout>
    <h2 style={h}>Objectives and graph vocabulary</h2>
    <p style={p}>After this lesson you should be able to select BFS or DFS for a graph task, use topological order only for a directed acyclic graph (DAG), and select a shortest-path algorithm from the edge-weight constraints. A vertex is a node, an edge is a connection, V is the number of vertices, and E is the number of edges. Always clarify whether edges are directed and whether weights can be negative.</p>
    <Callout type="tip">This is a concept-and-implementation lesson, not another interview question collection. For problem recognition, dry runs, and placement practice, use <Link href="/learn/dsa/interview-patterns" style={{ color: 'var(--green)' }}>Interview Problem-Solving Patterns →</Link>.</Callout>

    <h2 style={h}>1. BFS: layers, reachability, and unweighted distance</h2>
    <p style={p}>Breadth-first search visits vertices in increasing number of edges from a source. A FIFO queue preserves this layer order. Mark a vertex visited when you enqueue it, not when you remove it: otherwise several neighbours can enqueue the same vertex before its first visit. BFS finds a shortest path measured in edge count when every edge has equal cost.</p>
    <Code title="BFS distances with an adjacency matrix">{`#include <stdbool.h>
#define MAX_V 100

void bfs_distances(int n, int graph[MAX_V][MAX_V], int source, int distance[MAX_V]) {
    int queue[MAX_V];
    int front = 0, back = 0;
    for (int v = 0; v < n; v++) distance[v] = -1;
    distance[source] = 0;
    queue[back++] = source;
    while (front < back) {
        int current = queue[front++];
        for (int next = 0; next < n; next++) {
            if (graph[current][next] && distance[next] == -1) {
                distance[next] = distance[current] + 1;
                queue[back++] = next;
            }
        }
    }
}`}</Code>
    <p style={p}>This fixed-array example assumes 0 &lt; n ≤ MAX_V and a valid source index. A distance of -1 means unreachable. To reconstruct a shortest route, store <code>parent[next] = current</code> at the same moment that you first set the distance; then walk parents backward from the destination and reverse the route. With a matrix, scanning all possible neighbours costs O(V²); with adjacency lists it is O(V + E). Queue capacity V is sufficient because each vertex is enqueued at most once.</p>

    <h2 style={h}>2. DFS: components, cycle reasoning, and exploration</h2>
    <p style={p}>Depth-first search follows a branch until it cannot continue, then backtracks. Recursion implicitly uses the call stack; an explicit stack avoids recursion-depth limits on a very deep graph. For an undirected graph, start DFS from every unvisited vertex to count connected components. For directed cycle detection, use three states—unvisited, active on the current recursion path, and complete—because a visited edge alone does not prove a cycle.</p>
    <Code title="Recursive DFS over a matrix">{`#define MAX_V 100

void dfs_visit(int n, int graph[MAX_V][MAX_V], int vertex, int visited[MAX_V]) {
    visited[vertex] = 1;
    for (int next = 0; next < n; next++) {
        if (graph[vertex][next] && !visited[next]) {
            dfs_visit(n, graph, next, visited);
        }
    }
}

int count_components(int n, int graph[MAX_V][MAX_V]) {
    int visited[MAX_V] = {0};
    int components = 0;
    for (int v = 0; v < n; v++) {
        if (!visited[v]) {
            components++;
            dfs_visit(n, graph, v, visited);
        }
    }
    return components;
}`}</Code>
    <Callout type="warning">This component routine assumes an undirected graph. For directed graphs, “connected component” may mean weakly connected or strongly connected; those are different definitions and need different algorithms.</Callout>

    <h2 style={h}>3. Topological sorting: order prerequisites</h2>
    <p style={p}>A topological order places every prerequisite before the task that depends on it. It exists exactly when a directed graph has no cycle. Kahn’s algorithm repeatedly removes a zero-indegree vertex (one with no remaining prerequisites), then decreases the indegree of its outgoing neighbours. If fewer than V vertices are emitted, a cycle remains. With adjacency lists this is O(V + E); the matrix version below scans rows and costs O(V²).</p>
    <Code title="Kahn's algorithm (matrix representation)">{`#include <stdbool.h>
#define MAX_V 100

bool topological_order(int n, int graph[MAX_V][MAX_V], int order[MAX_V]) {
    int indegree[MAX_V] = {0};
    int queue[MAX_V], front = 0, back = 0, count = 0;
    for (int from = 0; from < n; from++)
        for (int to = 0; to < n; to++)
            if (graph[from][to]) indegree[to]++;
    for (int v = 0; v < n; v++)
        if (indegree[v] == 0) queue[back++] = v;
    while (front < back) {
        int current = queue[front++];
        order[count++] = current;
        for (int next = 0; next < n; next++) {
            if (graph[current][next] && --indegree[next] == 0)
                queue[back++] = next;
        }
    }
    return count == n;
}`}</Code>
    <p style={p}>There can be multiple valid orders; do not compare one arbitrary output against a single expected sequence. Validate every directed edge <code>u → v</code> by checking that u occurs earlier than v. A failed result is useful: report a dependency cycle rather than returning a partial order as if it were complete.</p>

    <h2 style={h}>4. Shortest paths: use the edge model</h2>
    <div style={{ overflowX: 'auto', margin: '18px 0' }}><table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text)', fontSize: 14 }}><thead><tr>{['Graph condition', 'Algorithm', 'Core idea', 'Typical complexity'].map(x => <th key={x} style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid var(--border)' }}>{x}</th>)}</tr></thead><tbody>{[
      ['Unweighted / equal-cost edges', 'BFS', 'First discovery is minimum edge count', 'O(V + E) with adjacency lists'],
      ['Non-negative weights', "Dijkstra's", 'Repeatedly finalise the closest unsettled vertex', 'O((V + E) log V) with a binary heap'],
      ['Negative weights; no reachable negative cycle', 'Bellman–Ford', 'Relax every edge up to V − 1 rounds', 'O(VE)'],
      ['All pairs, small/dense graph', 'Floyd–Warshall', 'Allow each vertex as an intermediate', 'O(V³) time, O(V²) space'],
    ].map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} style={{ padding: 10, borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{cell}</td>)}</tr>)}</tbody></table></div>
    <p style={p}>Dijkstra is not valid for negative edge weights: a vertex thought to be finished can later receive a shorter path. Bellman–Ford can also detect a negative cycle reachable from the source if another relaxation succeeds after V−1 rounds. Shortest paths are undefined as a finite minimum when such a reachable negative cycle can be traversed repeatedly.</p>
    <Code title="Dijkstra for non-negative weights (matrix, O(V²))">{`#include <stdbool.h>
#include <limits.h>
#define MAX_V 100
#define INF (LLONG_MAX / 4)

bool dijkstra(int n, long long weight[MAX_V][MAX_V], int source,
              long long distance[MAX_V]) {
    if (n <= 0 || n > MAX_V || source < 0 || source >= n) return false;
    for (int from = 0; from < n; from++)
        for (int to = 0; to < n; to++)
            if (weight[from][to] != INF && (weight[from][to] < 0 || weight[from][to] >= INF)) return false;
    int done[MAX_V] = {0};
    for (int v = 0; v < n; v++) distance[v] = INF;
    distance[source] = 0;
    for (int step = 0; step < n; step++) {
        int current = -1;
        for (int v = 0; v < n; v++)
            if (!done[v] && (current == -1 || distance[v] < distance[current]))
                current = v;
        if (current == -1 || distance[current] == INF) break;
        done[current] = 1;
        for (int next = 0; next < n; next++) {
            if (weight[current][next] == INF) continue;
            long long candidate = distance[current] + weight[current][next];
            if (candidate < distance[next]) distance[next] = candidate;
        }
    }
    return true;
}`}</Code>
    <p style={p}>Initialize every absent edge to INF and the diagonal to zero. This version validates the non-negative-weight precondition and reserves the INF range for missing edges so additions stay representable. A binary heap reduces the search cost on sparse graphs; when using a heap with duplicate entries, discard stale entries whose key no longer equals the best known distance.</p>

    <h2 style={h}>5. Recover a route and verify your result</h2>
    <p style={p}>Distances answer “how far?” but many applications need the route. In BFS or Dijkstra, set a predecessor only when a strict improvement (or first discovery for BFS) is accepted. Starting at the destination, follow parents until reaching the source; if the destination has infinite distance or no parent chain to the source, it is unreachable. Test source equal to destination, isolated vertices, parallel edges, and ties. Ties can produce different but equally valid paths.</p>

    <h2 style={h}>6. Common mistakes</h2>
    <ul style={{ ...p, paddingLeft: 22 }}><li><strong>Marking visited on dequeue:</strong> duplicate queue entries can fill memory and repeat work. Mark when enqueuing.</li><li><strong>Using DFS for shortest unweighted distance:</strong> DFS discovers a path, not necessarily a shortest one. Use BFS for equal-cost edges.</li><li><strong>Topologically sorting a cyclic graph:</strong> a partial list is not a valid complete schedule. Check that the output count is V.</li><li><strong>Using Dijkstra with negative edges:</strong> its greedy finalisation proof fails. Choose Bellman–Ford when negative weights are allowed.</li></ul>

    <h2 style={h}>7. Practice</h2>
    <ol style={{ ...p, paddingLeft: 22 }}><li>Return BFS distances and parent pointers from a source in a disconnected undirected graph.</li><li>Count connected components. Explain why the routine must start a traversal from every still-unvisited vertex.</li><li>Build a course schedule order with Kahn’s algorithm and detect a cycle. Verify edge ordering instead of expecting one exact order.</li><li>Implement Bellman–Ford and return whether a source-reachable negative cycle exists.</li><li>Compare matrix and list memory use for a graph with many vertices but few roads; justify the representation and complexity.</li></ol>
    <KeyTakeaways items={['BFS explores by edge-count layers and gives shortest paths in unweighted graphs.', 'DFS supports exhaustive exploration and component/cycle reasoning, but not shortest-path guarantees.', 'Topological sorting is defined only for DAGs; emitted count detects a cycle.', 'Choose shortest-path algorithms from weight constraints: BFS, Dijkstra, Bellman–Ford, or Floyd–Warshall.', 'State graph direction, weight, and connectivity assumptions before implementing.', 'Use the Interview Problem-Solving Patterns unit for separate pattern drills and dry runs.']} />
    <h2 style={h}>Next</h2><p style={p}>Apply state-and-transition reasoning to classic dynamic programming shapes.</p><p><Link href="/learn/dsa/dynamic-programming-patterns" style={{ color: 'var(--green)' }}>Lesson 24 · Dynamic Programming Patterns →</Link></p>
  </LearnLayout>
}
