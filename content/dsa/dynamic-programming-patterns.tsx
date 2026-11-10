import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

function Code({ title, children }: { title: string; children: string }) { return <div style={{ margin: '20px 0', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}><div style={{ padding: '8px 14px', background: 'var(--surface)', color: 'var(--muted)', font: '12px var(--font-mono)' }}>{title} · C</div><pre style={{ margin: 0, padding: 18, overflowX: 'auto', background: '#0d0d0d', color: '#e0e0e0', font: '13px/1.7 var(--font-mono)' }}><code>{children}</code></pre></div> }
const p = { color: 'var(--text)', fontSize: 15, lineHeight: 1.85, marginBottom: 14 }
const h = { color: 'var(--text)', fontSize: 22, fontWeight: 800, marginTop: 36, marginBottom: 12, fontFamily: 'var(--font-display)' }

export default function DynamicProgrammingPatternsPage() {
  return <LearnLayout title="Dynamic Programming Patterns — 1D, 2D, Knapsack, Subsequences" description="Design DP states and transitions for sequences, grids, capacities, and subsequences." section="DSA — Lesson 24" readTime="120 min">
    <Callout type="info"><strong>Prerequisites:</strong> recursion, arrays, loops, and the Dynamic Programming lesson (Lesson 20). That earlier lesson introduces memoization and tabulation; here we practise state design across reusable problem families.</Callout>
    <h2 style={h}>Objectives: make a problem smaller without losing information</h2>
    <p style={p}>Dynamic programming applies when a problem has overlapping subproblems and an optimal substructure: smaller answers can be reused to build the full answer. For each task, write down the state, recurrence, base cases, evaluation order, and answer location before writing code. A state is a compact description of everything from the past that can affect the future—not a copy of the full history.</p>
    <Callout type="tip">To practise interview framing and dry runs, go to <Link href="/learn/dsa/interview-patterns" style={{ color: 'var(--green)' }}>Interview Problem-Solving Patterns →</Link>. This lesson focuses on DP derivation and implementation, not duplicate interview questions.</Callout>

    <h2 style={h}>1. Start with a state and recurrence</h2>
    <p style={p}>Ask: what does one subproblem mean? What choices are available next? If two paths reach the same state, can their remaining work be solved identically? For a “minimum cost” problem, the recurrence often takes a minimum over predecessor states; for “count ways,” it sums counts. Do not mix these objectives: the same state space can have a different recurrence depending on whether the question asks for a count, optimum, or feasibility.</p>
    <div style={{ overflowX: 'auto', margin: '18px 0' }}><table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text)', fontSize: 14 }}><thead><tr>{['Pattern', 'State example', 'Transition idea', 'Typical table'].map(x => <th key={x} style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid var(--border)' }}>{x}</th>)}</tr></thead><tbody>{[
      ['1D sequence', 'dp[i] = best answer through index i', 'Use a small set of earlier states', 'One array'],
      ['2D grid / two prefixes', 'dp[r][c] = answer upon reaching cell', 'Combine legal cells immediately before', 'Rows × columns'],
      ['0/1 knapsack', 'dp[c] = best value under capacity c', 'Skip item or take it once', 'Capacity array or items × capacity'],
      ['Subsequence', 'dp[i] = best subsequence ending at i', 'Extend compatible earlier endpoints', 'Often O(n²); optimisations exist'],
    ].map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} style={{ padding: 10, borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{cell}</td>)}</tr>)}</tbody></table></div>

    <h2 style={h}>2. 1D DP: decisions along a sequence</h2>
    <p style={p}>In the staircase example, each step can be reached from one or two steps below. Let <code>ways[i]</code> count ways to reach step i; then <code>ways[i] = ways[i−1] + ways[i−2]</code>. Define the starting values consistently with the problem: there is one way to stand at step zero (take no moves), which makes the recurrence clean. This is also a model for “take one of a small number of previous states.”</p>
    <Code title="Count one- or two-step climbs">{`#include <stddef.h>
#include <stdint.h>

uint64_t count_climbs(int n) {
    if (n < 0) return 0;
    if (n == 0) return 1;
    uint64_t two_back = 1;
    uint64_t one_back = 1;
    for (int step = 2; step <= n; step++) {
        uint64_t current = one_back + two_back;
        two_back = one_back;
        one_back = current;
    }
    return one_back;
}`}</Code>
    <p style={p}>Only two preceding states are needed, so the recurrence can be compressed from O(n) storage to O(1). The return type is finite: sufficiently large results overflow <code>uint64_t</code>. If the task asks for counts at large n, use a stated modulus or a big-integer representation rather than assuming arithmetic is unbounded.</p>

    <h2 style={h}>3. 2D DP: move through a grid</h2>
    <p style={p}>Let <code>ways[r][c]</code> count paths to a cell when moves are only right or down and all cells are open. Every non-start cell can be entered from above or left. A blocked cell has zero ways. To count paths with obstacles, initialize the first row and column through the same transition; a blocked cell resets the path count to zero, which prevents paths from passing through it.</p>
    <Code title="Grid paths with blocked cells">{`#include <stdint.h>
#define MAX_SIDE 100

uint64_t count_grid_paths(int rows, int cols, int blocked[MAX_SIDE][MAX_SIDE]) {
    if (rows <= 0 || cols <= 0 || rows > MAX_SIDE || cols > MAX_SIDE) return 0;
    uint64_t ways[MAX_SIDE][MAX_SIDE] = {{0}};
    if (blocked[0][0]) return 0;
    ways[0][0] = 1;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (blocked[r][c]) {
                ways[r][c] = 0;
                continue;
            }
            if (r > 0) ways[r][c] += ways[r - 1][c];
            if (c > 0) ways[r][c] += ways[r][c - 1];
        }
    }
    return ways[rows - 1][cols - 1];
}`}</Code>
    <p style={p}>The function checks dimensions against its fixed storage. For a large grid, the table can be reduced to one row because each cell needs only the value above and the value to its left. Count overflow still needs a defined policy. The state interpretation is “number of paths ending at this cell,” not “number of paths from this cell onward”; both are possible, but their traversal direction and base cases differ.</p>

    <h2 style={h}>4. 0/1 Knapsack: each item is chosen at most once</h2>
    <p style={p}>Given weights and values, choose items within a capacity to maximise total value. For each item and capacity, either skip it or take it once if it fits. A one-dimensional optimization updates capacities in descending order. Descending order is crucial: it ensures the current item cannot be reused during the same iteration. An ascending loop instead describes the unbounded variant where repeated copies are allowed.</p>
    <Code title="0/1 knapsack with one-dimensional storage">{`#include <stddef.h>

int knapsack_01(const int weight[], const int value[], int count, int capacity) {
    if (capacity < 0 || count < 0) return 0;
    int best[capacity + 1];
    for (int c = 0; c <= capacity; c++) best[c] = 0;
    for (int item = 0; item < count; item++) {
        for (int c = capacity; c >= weight[item]; c--) {
            int take = best[c - weight[item]] + value[item];
            if (take > best[c]) best[c] = take;
        }
    }
    return best[capacity];
}`}</Code>
    <p style={p}>This C99 variable-length array should be replaced by checked dynamic allocation when capacity is large or untrusted; the teaching version makes the state visible. If all values are non-negative and the capacity is a limit, initializing to zero correctly allows choosing no items. To reconstruct chosen items, store decisions or retain the full DP table and trace backward; the compressed array alone does not preserve every decision.</p>

    <h2 style={h}>5. Subsequences: order matters, adjacency does not</h2>
    <p style={p}>A subsequence keeps relative order but may skip elements. For the longest increasing subsequence (LIS), define <code>length[i]</code> as the length of the longest increasing subsequence ending exactly at i. Try each earlier j whose value is smaller, then extend its best ending sequence. This direct recurrence is O(n²), simple to reason about and often the right baseline before an O(n log n) optimisation is introduced.</p>
    <Code title="Longest increasing subsequence length, O(n²)">{`#include <stddef.h>

int lis_length(const int values[], int n) {
    if (n <= 0) return 0;
    int length[n];
    int answer = 1;
    for (int i = 0; i < n; i++) {
        length[i] = 1;
        for (int j = 0; j < i; j++) {
            if (values[j] < values[i] && length[j] + 1 > length[i])
                length[i] = length[j] + 1;
        }
        if (length[i] > answer) answer = length[i];
    }
    return answer;
}`}</Code>
    <p style={p}>The strict comparison means equal values cannot extend one another; replace it with ≤ for a longest non-decreasing subsequence. To recover an actual subsequence, keep a predecessor index whenever the best value improves, remember the endpoint of the global best, and follow predecessors backward. Be precise about whether the problem requests the length, one sequence, or the number of optimal sequences.</p>

    <h2 style={h}>6. Choose table order and space carefully</h2>
    <p style={p}>Tabulation is valid only when dependencies are already computed. In grid DP, row-major order works because each state depends on the previous row and the current row’s previous column. In 0/1 knapsack, descending capacity preserves the previous item layer. If an optimized update order feels mysterious, first write the full two-dimensional table; compress space only after the dependency direction is clear.</p>
    <Callout type="example">For an order-counting task, two different histories that reach the same state may be merged only if their future choices and contribution are identical. If the future depends on the last colour, remaining coupon, or previous item, include that information in the state instead of accidentally merging unlike histories.</Callout>

    <h2 style={h}>7. Common mistakes</h2>
    <ul style={{ ...p, paddingLeft: 22 }}><li><strong>Writing code before defining the state:</strong> informal state meanings cause wrong transitions. Write one sentence defining what every cell stores.</li><li><strong>Missing base cases:</strong> a recurrence does not define the first state automatically. Test the smallest valid input by hand.</li><li><strong>Wrong knapsack loop direction:</strong> ascending capacity lets one item feed its own later states; descending capacity enforces 0/1 use.</li><li><strong>Claiming an optimised space table can reconstruct a solution:</strong> compressed values may discard decisions. Keep predecessor/choice data when reconstruction is required.</li></ul>

    <h2 style={h}>8. Practice</h2>
    <ol style={{ ...p, paddingLeft: 22 }}><li>Count ways to climb n stairs using 1, 2, or 3 steps. Define base cases before deriving the recurrence.</li><li>Find the minimum cost to travel from top-left to bottom-right in a grid, moving only right/down. State how obstacles change the recurrence.</li><li>Modify 0/1 knapsack to return both the best value and a chosen-item list. Explain the extra memory needed.</li><li>Change the LIS solution to allow equal adjacent subsequence values, then add predecessor reconstruction.</li><li>For each exercise, label the state, transition, base case, traversal order, answer cell, time, and space complexity.</li></ol>
    <KeyTakeaways items={['A DP state must preserve exactly the information future decisions need.', 'Write the recurrence and base cases before choosing memoization or tabulation.', '1D, grid, knapsack, and subsequence problems are common state-space shapes.', 'Descending capacity in 0/1 knapsack prevents reusing the current item.', 'Space compression depends on dependency order and can lose reconstruction information.', 'The Interview Problem-Solving Patterns unit offers separate interview drills for applying these ideas.']} />
    <h2 style={h}>Next</h2><p style={p}>Use index movement and maintained range state for another family of linear-time techniques.</p><p><Link href="/learn/dsa/two-pointers-sliding-window" style={{ color: 'var(--green)' }}>Lesson 25 · Two Pointers and Sliding Window →</Link></p>
  </LearnLayout>
}
