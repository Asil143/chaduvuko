'use client'
import React from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import Link from 'next/link'

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = React.useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div style={{ background: '#0d0d0d', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', margin: '18px 0' }}>
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '8px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>C</span>
        <button onClick={copy} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 10px', color: copied ? 'var(--green)' : 'var(--muted)', fontSize: 11, cursor: 'pointer' }}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre style={{ margin: 0, padding: '18px 20px', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.7, color: '#e0e0e0' }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

const patterns = [
  { name: 'Two pointers', signals: 'Sorted array; pair/triplet; palindrome; compare both ends', approach: 'Move one or two indices while preserving an ordering invariant.', time: 'O(n)', space: 'O(1)' },
  { name: 'Sliding window', signals: 'Contiguous subarray/substring; longest/shortest window satisfying a rule', approach: 'Extend right; move left when the window constraint requires it.', time: 'O(n)', space: 'O(1)–O(k)' },
  { name: 'Fast / slow pointers', signals: 'Linked-list cycle or middle; repeated transitions; cycle detection', approach: 'Advance pointers at different speeds; meeting or termination gives structure.', time: 'O(n)', space: 'O(1)' },
  { name: 'Binary search on answer', signals: 'Minimise the maximum / maximise the minimum; feasibility changes monotonically', approach: 'Search the answer range and test whether a candidate is feasible.', time: 'O(n log R)', space: 'O(1)' },
  { name: 'Prefix sums', signals: 'Many range-sum queries; subarray sum; cumulative counts', approach: 'Store cumulative totals so a range is the difference of two prefixes.', time: 'O(n) build; O(1) query', space: 'O(n)' },
  { name: 'Monotonic stack', signals: 'Next greater/smaller; nearest boundary; histogram; wait until a value is exceeded', approach: 'Keep indices in increasing or decreasing value order; resolve them when order breaks.', time: 'O(n)', space: 'O(n)' },
  { name: 'Heap / top-k', signals: 'K largest/smallest; repeatedly get current min/max; streaming ranking', approach: 'Keep a heap of k candidates or a priority queue of pending work.', time: 'O(n log k)', space: 'O(k)' },
  { name: 'Intervals', signals: 'Overlapping ranges; meeting rooms; merge / schedule intervals', approach: 'Sort by start or end, then merge or greedily choose compatible intervals.', time: 'O(n log n)', space: 'O(n) or O(1) extra' },
  { name: 'BFS / DFS on grids', signals: 'Islands, regions, shortest unweighted path, flood fill, adjacent cells', approach: 'Treat each cell as a vertex; mark it visited when adding it to the worklist.', time: 'O(rows × cols)', space: 'O(rows × cols)' },
  { name: 'Backtracking', signals: 'Enumerate valid arrangements, combinations, paths; constraints prune choices', approach: 'Choose, explore, undo; prune partial candidates that cannot succeed.', time: 'O(b^d) worst case', space: 'O(d) recursion' },
  { name: 'DP state design', signals: 'Choices repeat the same subproblems; optimal count/min/max; take or skip', approach: 'Define a state, recurrence, base case, and evaluation order; memoise or tabulate.', time: 'O(states × transitions)', space: 'O(states)' },
  { name: 'Union-Find (DSU)', signals: 'Dynamic connectivity; components after adding edges; cycle checks in undirected graphs', approach: 'Represent each component by a parent; find roots and unite distinct roots.', time: 'O(α(n)) amortised / operation', space: 'O(n)' },
  { name: 'Topological sort', signals: 'Prerequisites, dependency ordering, course schedule; directed acyclic graph', approach: 'Use indegrees with Kahn’s queue, or DFS postorder; a cycle prevents a full order.', time: 'O(V + E)', space: 'O(V)' },
]

const problems = [
  {
    title: '1. Two Sum in a Sorted Array — two pointers',
    prompt: 'Given a sorted array and a target, return the indices of two values whose sum equals the target. Assume one answer exists.',
    insight: 'If the sum is too small, only moving the left pointer can increase it; if too large, move the right pointer. The sorted order lets us discard a whole set of pairs at each step.',
    code: `int twoSumSorted(const int a[], int n, int target, int *leftOut, int *rightOut) {
    int left = 0;
    int right = n - 1;
    while (left < right) {
        long long sum = (long long)a[left] + a[right];
        if (sum == target) {
            *leftOut = left;
            *rightOut = right;
            return 1;
        }
        if (sum < target) left++;
        else right--;
    }
    return 0;
}`,
    dryRun: 'a = [1, 2, 4, 6, 10], target = 8. Start (1, 10) = 11, so move right; (1, 6) = 7, so move left; (2, 6) = 8. Return indices 1 and 3.',
    cost: 'O(n) time, O(1) extra space.'
  },
  {
    title: '2. Longest Substring Without Repeating Characters — sliding window',
    prompt: 'Find the length of the longest substring with no repeated byte characters.',
    insight: 'Maintain a valid window [left, right]. When a character repeats inside it, jump left past that character’s previous position. This is the variable-window technique from Unit 19, now used as a pattern-recognition example.',
    code: `int longestUniqueSubstring(const char *s) {
    int lastSeen[256];
    for (int i = 0; i < 256; i++) lastSeen[i] = -1;
    int left = 0;
    int best = 0;
    for (int right = 0; s[right] != '\\0'; right++) {
        unsigned char ch = (unsigned char)s[right];
        if (lastSeen[ch] >= left) left = lastSeen[ch] + 1;
        lastSeen[ch] = right;
        int length = right - left + 1;
        if (length > best) best = length;
    }
    return best;
}`,
    dryRun: 's = "pwwkew". At the second w (index 2), move left from 0 to 2. The window then grows to "wke" at indices 2–4 (length 3); the final w cannot extend it past the prior w. Answer: 3.',
    cost: 'O(n) time, O(1) space for a fixed 256-character table.'
  },
  {
    title: '3. Find the Middle of a Linked List — fast / slow pointers',
    prompt: 'Return the middle node. For an even-length list, return the second of the two middle nodes.',
    insight: 'Move slow by one link and fast by two. When fast reaches the end, slow has travelled half as far. No length count or second pass is needed.',
    code: `struct Node {
    int value;
    struct Node *next;
};

struct Node *middleNode(struct Node *head) {
    struct Node *slow = head;
    struct Node *fast = head;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}`,
    dryRun: '1 → 2 → 3 → 4 → 5: after two iterations, slow is at 3 and fast is at 5; the loop ends, so return 3. With 1 → 2 → 3 → 4, slow finishes at 3, the second middle.',
    cost: 'O(n) time, O(1) extra space.'
  },
  {
    title: '4. Minimum Eating Speed — binary search on answer',
    prompt: 'Given positive pile sizes and h hours, find the smallest integer speed k that can finish all piles in h hours. One pile is worked on per hour.',
    insight: 'Feasibility is monotonic: if speed k works, any larger speed also works. Binary-search the answer, not an array index. Search from 1 to the largest pile.',
    code: `int feasible(const int piles[], int n, int h, int speed) {
    long long hours = 0;
    for (int i = 0; i < n; i++) {
        hours += ((long long)piles[i] + speed - 1) / speed;
        if (hours > h) return 0;
    }
    return 1;
}

int minEatingSpeed(const int piles[], int n, int h) {
    int low = 1;
    int high = piles[0];
    for (int i = 1; i < n; i++)
        if (piles[i] > high) high = piles[i];
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (feasible(piles, n, h, mid)) high = mid;
        else low = mid + 1;
    }
    return low;
}`,
    dryRun: 'piles = [3, 6, 7, 11], h = 8. At speed 3, required hours = 1 + 2 + 3 + 4 = 10 (too slow). At speed 4, hours = 1 + 2 + 2 + 3 = 8 (feasible). Binary search continues left to prove 4 is the minimum.',
    cost: 'O(n log M) time, O(1) extra space; M is the largest pile.'
  },
  {
    title: '5. Range Sum Query — prefix sums',
    prompt: 'Preprocess an integer array so any inclusive range [left, right] can be summed quickly.',
    insight: 'prefix[i] stores the sum of the first i values. The requested range is prefix[right + 1] − prefix[left]. Define the prefix convention clearly to avoid off-by-one errors.',
    code: `void buildPrefix(const int a[], int n, long long prefix[]) {
    prefix[0] = 0;
    for (int i = 0; i < n; i++)
        prefix[i + 1] = prefix[i] + a[i];
}

long long rangeSum(const long long prefix[], int left, int right) {
    return prefix[right + 1] - prefix[left];
}`,
    dryRun: 'a = [2, -1, 3, 5] gives prefix = [0, 2, 1, 4, 9]. Sum indices 1 through 3 = prefix[4] − prefix[1] = 9 − 2 = 7.',
    cost: 'O(n) preprocessing, O(1) per query, O(n) extra space.'
  },
  {
    title: '6. Next Greater Element — monotonic stack',
    prompt: 'For each array position, find the first value to its right that is strictly greater; use -1 if none exists.',
    insight: 'Keep indices whose next greater value is not known in a decreasing-value stack. A new larger value resolves every smaller value at the top. Each index is pushed and popped once.',
    code: `void nextGreater(const int a[], int n, int answer[]) {
    int stack[n];
    int top = -1;
    for (int i = 0; i < n; i++) answer[i] = -1;
    for (int i = 0; i < n; i++) {
        while (top >= 0 && a[i] > a[stack[top]])
            answer[stack[top--]] = a[i];
        stack[++top] = i;
    }
}`,
    dryRun: 'a = [2, 1, 2, 4, 3]. The 2 at index 0 is resolved by 4; 1 at index 1 is resolved by the 2 at index 2; that 2 is resolved by 4. The 4 and final 3 remain unresolved. Answer: [4, 2, 4, -1, -1].',
    cost: 'O(n) time, O(n) extra space.'
  },
  {
    title: '7. Kth Largest Element — min-heap of size k',
    prompt: 'Return the kth largest value without sorting the entire input. Assume 1 <= k <= n.',
    insight: 'Keep only the k largest values seen so far in a min-heap. Its root is the smallest of those k values, and therefore the kth largest overall. Heap helpers are shown explicitly for a zero-based array.',
    code: `void swapInt(int *a, int *b) {
    int t = *a; *a = *b; *b = t;
}

void siftDown(int heap[], int size, int i) {
    while (2 * i + 1 < size) {
        int child = 2 * i + 1;
        if (child + 1 < size && heap[child + 1] < heap[child]) child++;
        if (heap[i] <= heap[child]) break;
        swapInt(&heap[i], &heap[child]);
        i = child;
    }
}

int kthLargest(const int a[], int n, int k) {
    int heap[k];
    int size = 0;
    for (int i = 0; i < n; i++) {
        if (size < k) {
            int j = size++;
            heap[j] = a[i];
            while (j > 0 && heap[(j - 1) / 2] > heap[j]) {
                swapInt(&heap[j], &heap[(j - 1) / 2]);
                j = (j - 1) / 2;
            }
        } else if (a[i] > heap[0]) {
            heap[0] = a[i];
            siftDown(heap, size, 0);
        }
    }
    return heap[0];
}`,
    dryRun: '[3, 2, 1, 5, 6, 4], k = 2. The heap retains the two largest seen: after 3 and 2 it is {2,3}; 1 is ignored; 5 replaces 2; 6 replaces 3; 4 is ignored. The min-heap root is 5, the second largest.',
    cost: 'O(n log k) time, O(k) extra space.'
  },
  {
    title: '8. Number of Islands — BFS on a grid',
    prompt: 'Count groups of adjacent land cells represented by 1, connected horizontally or vertically. Each island is counted once.',
    insight: 'A grid is an implicit graph. Start BFS at each unvisited land cell and mark cells when enqueued, so no cell enters the queue twice. Diagonal neighbors are not connected in this definition.',
    code: `int countIslands(int rows, int cols, char grid[rows][cols]) {
    int queue[rows * cols];
    int directions[5] = {-1, 0, 1, 0, -1};
    int islands = 0;
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] != '1') continue;
            islands++;
            int head = 0, tail = 0;
            queue[tail++] = r * cols + c;
            grid[r][c] = '0';
            while (head < tail) {
                int cell = queue[head++];
                int row = cell / cols, col = cell % cols;
                for (int d = 0; d < 4; d++) {
                    int nr = row + directions[d];
                    int nc = col + directions[d + 1];
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == '1') {
                        grid[nr][nc] = '0';
                        queue[tail++] = nr * cols + nc;
                    }
                }
            }
        }
    }
    return islands;
}`,
    dryRun: 'For grid rows 110 / 010 / 001, start at the top-left land and visit its two connected neighbors: island 1. The bottom-right land is disconnected: island 2. The function returns 2 and marks visited land as water.',
    cost: 'O(rows × cols) time and queue space in the worst case; the input grid is modified.'
  },
  {
    title: '9. Coin Change — one-dimensional dynamic programming',
    prompt: 'Given coin denominations and an amount, return the fewest coins needed to make that amount, or -1 if it cannot be made. Coins may be reused.',
    insight: 'State: dp[value] is the minimum number of coins for that value. Transition from each coin c: dp[value] = min(dp[value], dp[value − c] + 1). The smaller value is already solved.',
    code: `int minCoins(const int coins[], int count, int amount) {
    int dp[amount + 1];
    int unreachable = amount + 1;
    for (int value = 0; value <= amount; value++) dp[value] = unreachable;
    dp[0] = 0;
    for (int value = 1; value <= amount; value++) {
        for (int i = 0; i < count; i++) {
            int coin = coins[i];
            if (coin <= value && dp[value - coin] != unreachable &&
                dp[value - coin] + 1 < dp[value])
                dp[value] = dp[value - coin] + 1;
        }
    }
    return dp[amount] == unreachable ? -1 : dp[amount];
}`,
    dryRun: 'coins = [1, 3, 4], amount = 6. dp[0] = 0; dp[3] = 1 (3); dp[4] = 1 (4); dp[6] becomes dp[3] + 1 = 2 (3 + 3), better than 4 + 1 + 1. Answer: 2.',
    cost: 'O(amount × number of denominations) time, O(amount) extra space.'
  },
  {
    title: '10. Course Schedule — topological sort with Kahn’s algorithm',
    prompt: 'Given prerequisite pairs [course, prerequisite], decide whether all courses can be completed. This example supports at most MAX_COURSES courses.',
    insight: 'Build directed edges prerequisite → course. Repeatedly remove nodes with indegree zero. If all nodes are removed, the graph is acyclic; otherwise a cycle blocks progress. This matrix version keeps the example self-contained.',
    code: `#define MAX_COURSES 100

int canFinish(int n, const int prerequisites[][2], int edgeCount) {
    int graph[MAX_COURSES][MAX_COURSES] = {{0}};
    int indegree[MAX_COURSES] = {0};
    int queue[MAX_COURSES];
    for (int i = 0; i < edgeCount; i++) {
        int course = prerequisites[i][0];
        int prerequisite = prerequisites[i][1];
        if (!graph[prerequisite][course]) {
            graph[prerequisite][course] = 1;
            indegree[course]++;
        }
    }
    int head = 0, tail = 0, completed = 0;
    for (int i = 0; i < n; i++)
        if (indegree[i] == 0) queue[tail++] = i;
    while (head < tail) {
        int current = queue[head++];
        completed++;
        for (int next = 0; next < n; next++) {
            if (graph[current][next] && --indegree[next] == 0)
                queue[tail++] = next;
        }
    }
    return completed == n;
}`,
    dryRun: 'Prerequisites [1,0], [2,1], [3,2] give edges 0→1→2→3. Initially only 0 has indegree zero; removing each course unlocks the next, so all four complete. Adding [0,3] creates a cycle: the queue stalls before all nodes are removed.',
    cost: 'O(V² + E) time and O(V²) space for this adjacency-matrix teaching version. An adjacency list improves this to O(V + E).'
  },
]

const interviewSteps = [
  ['1. Clarify', 'Restate the goal. Ask about input sizes, sortedness, duplicates, negative values, mutation, and what to return when no answer exists. Confirm examples and constraints before coding.'],
  ['2. Brute force', 'Give a correct simple approach first. State its time and space costs. This proves you understand the requirement and gives a baseline to improve.'],
  ['3. Optimise', 'Use constraints and signals to select a data structure or pattern. Explain the invariant and why it improves complexity; state trade-offs and edge cases.'],
  ['4. Code', 'Name variables for their roles, use small helpers when helpful, and narrate the invariant rather than reading each line. Keep the implementation aligned with the discussed algorithm.'],
  ['5. Test', 'Dry-run the sample, then test boundaries: empty/singleton input, duplicates, all-equal values, no solution, and minimum/maximum constraints. Recheck complexity.'],
]

const practiceWeeks = [
  { week: 'Week 1 · Arrays and strings', focus: 'Two pointers, sliding windows, prefix sums, hash-based lookup.', routine: 'Five focused sessions: learn/review one pattern, solve two easy and three medium problems, then explain one solution aloud. Revisit Unit 19 for the underlying window and pointer mechanics.' },
  { week: 'Week 2 · Search and ordering', focus: 'Binary search on answer, intervals, monotonic stacks, heaps / top-k.', routine: 'Practise boundary-safe binary search and heap invariants. Complete at least one timed 45-minute set and review every incorrect assumption.' },
  { week: 'Week 3 · Graphs and choices', focus: 'Grid BFS/DFS, union-find, topological sort, backtracking, DP state design.', routine: 'Draw states and transitions before coding. Solve one graph and one DP problem on most days; explain why the algorithm is complete.' },
  { week: 'Week 4 · Placement simulation', focus: 'Mixed pattern selection, online assessments, communication, revision.', routine: 'Take three timed mock assessments; practise writing compilable C under the platform constraints; maintain an error log and redo missed problems without hints.' },
]

const cellStyle: React.CSSProperties = { padding: '12px 14px', borderBottom: '1px solid var(--border)', textAlign: 'left', verticalAlign: 'top' }

export default function InterviewPatternsPage() {
  return (
    <LearnLayout
      title="Interview Problem-Solving Patterns"
      description="Recognise the shape of a problem, choose a reliable algorithm, and communicate a correct C solution for product-company interviews and online assessments."
      section="DSA"
      readTime="180 min"
    >
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {['Prerequisite: DSA Units 00–19', 'C solutions', 'Placement practice'].map(label => (
          <span key={label} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '5px 10px' }}>{label}</span>
        ))}
      </div>
      <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Strong interview performance is not about memorising hundreds of answers. It is about identifying what the input and constraints imply, choosing a sound model, and proving your approach works. In Indian campus and lateral placements, product companies commonly combine online assessments with one or more technical rounds; the exact format varies by company and role. Practise under both time pressure and a live discussion, and always follow the instructions of the specific assessment.
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>
        A pattern is a useful hypothesis, not a keyword trick. “Contiguous” suggests a window or prefix sums; it does not decide which one until you inspect the condition. State your invariant, test it against an example, and be ready to change course if it does not fit.
      </p>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px', marginTop: 22 }}>
        <strong style={{ color: 'var(--text)' }}>Avoid duplication:</strong>{' '}
        <span style={{ color: 'var(--muted)', lineHeight: 1.75 }}>Unit 19, <Link href="/learn/dsa/advanced" style={{ color: 'var(--green)' }}>Advanced Topics</Link>, already teaches sliding window and two pointers (along with DSU, tries, segment trees, and bit manipulation). Use that unit for the detailed mechanics; this unit focuses on recognition, trade-offs, interview delivery, and applying those patterns alongside others.</span>
      </div>

      <section style={{ marginTop: 42 }}>
        <h2 style={{ color: 'var(--text)', fontSize: 'clamp(21px, 2.6vw, 29px)', fontWeight: 900, fontFamily: 'var(--font-display)', marginBottom: 10 }}>Recognise the problem shape</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 18 }}>Before naming an algorithm, extract the object, the operation, and the constraint. Ask: Is the answer about a contiguous range or any subset? Is the input sorted? Do updates happen? Is there a graph of dependencies? Does a yes/no feasibility test become easier as the answer changes?</p>
        <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 10 }}>
          <table style={{ width: '100%', minWidth: 850, borderCollapse: 'collapse', fontSize: 13, lineHeight: 1.65 }}>
            <thead><tr style={{ background: 'var(--surface)', color: 'var(--text)' }}>{['Pattern', 'Signal phrases / structure', 'Core idea', 'Typical time', 'Extra space'].map(h => <th key={h} style={cellStyle}>{h}</th>)}</tr></thead>
            <tbody>{patterns.map((p, i) => <tr key={p.name} style={{ background: i % 2 ? 'var(--bg)' : 'transparent', color: 'var(--muted)' }}>
              <td style={{ ...cellStyle, color: 'var(--text)', fontWeight: 700 }}>{p.name}</td><td style={cellStyle}>{p.signals}</td><td style={cellStyle}>{p.approach}</td><td style={{ ...cellStyle, fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>{p.time}</td><td style={{ ...cellStyle, fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>{p.space}</td>
            </tr>)}</tbody>
          </table>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.7, marginTop: 10 }}>Complexities describe common implementations, not guarantees. For example, binary search on answer costs O(n log R) when one feasibility check scans n items over a range of R candidate values.</p>
      </section>

      <section style={{ marginTop: 46 }}>
        <h2 style={{ color: 'var(--text)', fontSize: 'clamp(21px, 2.6vw, 29px)', fontWeight: 900, fontFamily: 'var(--font-display)', marginBottom: 8 }}>Ten classic problems, solved in C</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 8 }}>Each example names the invariant and includes a small dry-run. Snippets use C99 features where noted (variable-length arrays in the stack, heap, grid, and DP examples). In production or a platform with fixed limits, validate sizes and adapt storage to its constraints.</p>
        {problems.map(problem => (
          <article key={problem.title} style={{ borderTop: '1px solid var(--border)', paddingTop: 25, marginTop: 28 }}>
            <h3 style={{ color: 'var(--text)', fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: 9 }}>{problem.title}</h3>
            <p style={{ color: 'var(--text)', lineHeight: 1.75, marginBottom: 8 }}><strong>Problem:</strong> {problem.prompt}</p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.75, marginBottom: 8 }}><strong style={{ color: 'var(--green)' }}>Pattern / invariant:</strong> {problem.insight}</p>
            <CodeBlock code={problem.code} />
            <p style={{ color: 'var(--muted)', lineHeight: 1.75, marginBottom: 6 }}><strong style={{ color: 'var(--text)' }}>Dry run:</strong> {problem.dryRun}</p>
            <p style={{ color: 'var(--muted)', fontSize: 13, fontFamily: 'var(--font-mono)' }}><strong style={{ color: 'var(--text)' }}>Complexity:</strong> {problem.cost}</p>
          </article>
        ))}
      </section>

      <section style={{ marginTop: 48 }}>
        <h2 style={{ color: 'var(--text)', fontSize: 'clamp(21px, 2.6vw, 29px)', fontWeight: 900, fontFamily: 'var(--font-display)', marginBottom: 10 }}>The interview communication framework</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 18 }}>In a live round, the interviewer is evaluating how you reason as well as whether the final code passes. Keep the discussion structured and collaborative.</p>
        <div style={{ display: 'grid', gap: 10 }}>
          {interviewSteps.map(([step, detail]) => <div key={step} style={{ display: 'grid', gridTemplateColumns: 'minmax(105px, 150px) 1fr', gap: 14, padding: 15, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 9 }}>
            <strong style={{ color: 'var(--green)', fontFamily: 'var(--font-display)' }}>{step}</strong><span style={{ color: 'var(--muted)', lineHeight: 1.7 }}>{detail}</span>
          </div>)}
        </div>
      </section>

      <section style={{ marginTop: 48 }}>
        <h2 style={{ color: 'var(--text)', fontSize: 'clamp(21px, 2.6vw, 29px)', fontWeight: 900, fontFamily: 'var(--font-display)', marginBottom: 10 }}>A practical 4-week placement plan</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 18 }}>Aim for consistent, deliberate practice rather than a large problem count. A realistic session is 60–90 minutes: attempt independently, review one solution only after making progress, then re-solve from a blank editor.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 12 }}>
          {practiceWeeks.map(w => <div key={w.week} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 17 }}>
            <h3 style={{ color: 'var(--green)', fontSize: 15, fontWeight: 800, marginBottom: 10 }}>{w.week}</h3><p style={{ color: 'var(--text)', fontSize: 13, lineHeight: 1.65, marginBottom: 8 }}><strong>Focus:</strong> {w.focus}</p><p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>{w.routine}</p>
          </div>)}
        </div>
        <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.7, marginTop: 12 }}>For Indian placement schedules, adapt the final week to the company’s announced format: timed OA, coding interview, or both. Practise in the required language and editor, read negative-marking and submission rules carefully, and do not assume one company’s pattern applies to another.</p>
      </section>

      <section style={{ marginTop: 48 }}>
        <h2 style={{ color: 'var(--text)', fontSize: 'clamp(21px, 2.6vw, 29px)', fontWeight: 900, fontFamily: 'var(--font-display)', marginBottom: 12 }}>Common mistakes to avoid</h2>
        <ul style={{ color: 'var(--muted)', lineHeight: 1.85, paddingLeft: 22 }}>
          <li><strong style={{ color: 'var(--text)' }}>Pattern-matching by one keyword:</strong> verify all constraints and prove the invariant; “subarray” alone does not guarantee a sliding window (negative values can break common shrink rules).</li>
          <li><strong style={{ color: 'var(--text)' }}>Skipping clarification:</strong> assumptions about duplicates, indexing, empty inputs, and output format can invalidate an otherwise good algorithm.</li>
          <li><strong style={{ color: 'var(--text)' }}>Coding before estimating complexity:</strong> compare the expected input size with your time and memory costs before committing.</li>
          <li><strong style={{ color: 'var(--text)' }}>Off-by-one binary search:</strong> write down the search invariant and use overflow-safe midpoint calculation.</li>
          <li><strong style={{ color: 'var(--text)' }}>Marking graph nodes too late:</strong> mark when enqueuing, not when dequeuing, to avoid duplicate work or queue overflow.</li>
          <li><strong style={{ color: 'var(--text)' }}>Vague DP definitions:</strong> define exactly what a state means, then derive transitions and base cases from that meaning.</li>
          <li><strong style={{ color: 'var(--text)' }}>Ignoring C details:</strong> consider integer overflow, array bounds, null pointers, string signedness, allocation limits, and platform C standard.</li>
          <li><strong style={{ color: 'var(--text)' }}>Treating an OA like a live interview:</strong> online assessments may reward exact input/output handling and fast edge-case coverage; live interviews additionally require clear collaboration. Practise both.</li>
          <li><strong style={{ color: 'var(--text)' }}>Memorising without retrieval practice:</strong> after reviewing an explanation, close it and reconstruct the algorithm, code, tests, and complexity yourself.</li>
        </ul>
      </section>

      <KeyTakeaways items={[
        'Translate the prompt into an input model, constraints, and output before selecting a pattern.',
        'Use signal phrases to generate candidate patterns, then verify the invariant with examples and edge cases.',
        'Two pointers and sliding window are covered in Unit 19; this unit connects them to interview recognition and other core patterns.',
        'Use the clarify → brute force → optimise → code → test framework to make reasoning visible.',
        'For product-company placements and online assessments, practise the actual language, editor, timing, and rules announced for that process.',
        'Review mistakes deliberately and solve again without hints; durable pattern recognition beats answer memorisation.',
      ]} />
    </LearnLayout>
  )
}
