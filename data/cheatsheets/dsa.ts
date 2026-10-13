import type { TrackCheatSheet } from '@/lib/cheatsheet'

export const dsaCheatSheet: TrackCheatSheet = {
  track: 'dsa',
  title: 'Data Structures & Algorithms',
  trackHref: '/learn/dsa',
  accent: '#a78bfa',
  blurb: 'Complexity, the classic structures, and the algorithm patterns from the track — tiny Python sketches of the idea, not full solutions. Bookmark it.',
  sections: [
    {
      title: 'Complexity',
      entries: [
        { label: 'Big-O ladder', code: `# drop constants and lower terms\n# 3n² + 100n + 5  →  O(n²)\nO(1) < O(log n) < O(n) < O(n log n)\n       < O(n²) < O(2ⁿ) < O(n!)` },
        { label: 'Loops add or multiply', code: `for x in a:          # O(n)  consecutive: add\n    ...\nfor x in a:\n    for y in a:      # O(n²) nested: multiply\n        ...` },
        { label: 'Best, worst, space', code: `# linear search of n items\n# best  O(1)  hit at the front\n# worst O(n)  missing, or at the end\n# space O(1)  a handful of variables` },
      ],
    },
    {
      title: 'Arrays & strings',
      entries: [
        { label: 'Array access', code: `a = [4, 1, 7]\na[0]            # O(1) by index\na.append(9)     # O(1) amortized at the end\n# insert or delete at the front: O(n)` },
        { label: 'String as chars', code: `s = "level"\ns[0], s[-1]           # ends\ns == s[::-1]          # palindrome check\n# anagram: sorted(s) == sorted(t)` },
        { label: 'Two pointers', code: `# sorted array, or a palindrome\ni, j = 0, len(a) - 1\n# move the side that is still wrong\n# pair-sum, partition, reverse in place` },
      ],
    },
    {
      title: 'Linked lists',
      entries: [
        { label: 'Node', code: `class Node:\n    def __init__(self, val, nxt=None):\n        self.val = val\n        self.next = nxt   # the arrow\n# 1 -> 2 -> 3 -> None` },
        { label: 'Walk vs index', code: `node = head\nwhile node:            # O(n) to reach i\n    node = node.next\n# insert at the head is O(1)\n# no random access` },
        { label: 'Singly, doubly, cycle', code: `# doubly: node.prev and node.next\n# circular: tail.next is head\n# cycle? slow and fast pointers\n# if they meet, a loop exists` },
      ],
    },
    {
      title: 'Stacks & queues',
      entries: [
        { label: 'Stack (LIFO)', code: `stack = []\nstack.append(x)    # push\nstack.pop()        # pop the top\n# undo, recursion, balanced brackets` },
        { label: 'Brackets idea', code: `pair = {")": "(", "]": "[", "}": "{"}\n# open: push it\n# close: pop, and it must match\n# valid if the stack ends empty` },
        { label: 'Queue (FIFO)', code: `from collections import deque\nq = deque()\nq.append(x)      # enqueue at the back\nq.popleft()      # dequeue the front\n# deque: both ends; heap: priority` },
      ],
    },
    {
      title: 'Recursion',
      entries: [
        { label: 'Base and smaller', code: `def fact(n):\n    if n == 0:              # base: stop\n        return 1\n    return n * fact(n - 1)  # smaller n` },
        { label: 'Trust the call', code: `# do not simulate every frame at once\n# assume fact(n - 1) is already right\n# then attach the work for n\n# missing base case → RecursionError` },
        { label: 'Hanoi count', code: `# move n-1 aside, move the disk,\n# move n-1 on top\n# 1 disk = 1 move\n# n disks = 2ⁿ - 1` },
      ],
    },
    {
      title: 'Sorting & searching',
      entries: [
        { label: 'Comparison sorts', code: `# bubble, selection, insertion  O(n²)\n# merge, heap               O(n log n)\n# quick average O(n log n), worst O(n²)\n# merge is stable; quick usually is not` },
        { label: 'Merge idea', code: `# split until one item (already sorted)\n# merge two sorted halves:\n# take the smaller head each time\n# counting sort is O(n + k), not comparison` },
        { label: 'Linear vs binary', code: `# unsorted: look at every item, O(n)\n# sorted: throw away half, O(log n)\nlo, hi = 0, len(a) - 1\nmid = (lo + hi) // 2` },
        { label: 'Which half', code: `# a must be sorted\n# target < a[mid] → hi = mid - 1\n# target > a[mid] → lo = mid + 1\n# equal → found; lo > hi → absent` },
      ],
    },
    {
      title: 'Trees & heaps',
      entries: [
        { label: 'Binary tree walks', code: `class T:\n    def __init__(self, val, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n# pre: node, left, right\n# in:  left, node, right\n# post: left, right, node` },
        { label: 'BST rule', code: `# every left value  < node\n# every right value > node\n# search / insert is O(h)\n# balanced h ≈ log n; skewed h = n` },
        { label: 'Heap as an array', code: `# parent of i:     (i - 1) // 2\n# children of i:   2*i+1, 2*i+2\n# max-heap: parent >= children\n# peek min or max in O(1)` },
        { label: 'Level order', code: `# a queue, not the call stack\n# push the root, then its children\n# each pop is the next level-left node\n# heap sort: build a heap, pop n times` },
      ],
    },
    {
      title: 'Hashing',
      entries: [
        { label: 'Average O(1)', code: `seen = {}\nseen["ada"] = 1\n"ada" in seen     # hash, then the bucket\n# worst case O(n) if everything collides` },
        { label: 'Collisions', code: `# index = hash(key) % buckets\n# chaining: a list in that bucket\n# open addressing: probe the next slot\n# load factor high → more collisions` },
        { label: 'A usable hash', code: `# same key → same bucket, always\n# spread keys; don't use only one field\n# mutable keys break the bucket\n# Python dicts and sets are hash tables` },
      ],
    },
    {
      title: 'Graphs',
      entries: [
        { label: 'Adjacency list', code: `g = {"A": ["B", "C"], "B": ["C"], "C": []}\n# list: sparse, O(V + E) to scan\n# matrix: g[u][v] is 1 if an edge, O(V²)\n# directed or not; weighted or not` },
        { label: 'BFS and DFS', code: `# BFS: queue, layer by layer\n# shortest path when every edge is 1\n# DFS: stack or recursion, go deep\n# mark visited or you loop forever` },
        { label: 'Paths and order', code: `# Dijkstra: non-negative weights, best path\n# a negative edge → Bellman-Ford\n# topo sort: directed, no cycles\n# an edge u→v means u comes first` },
      ],
    },
    {
      title: 'DP, greedy & backtracking',
      entries: [
        { label: 'Memoize', code: `# overlapping subproblems + optimal pieces\nmemo = {}\ndef fib(n):\n    if n < 2: return n\n    if n not in memo:\n        memo[n] = fib(n - 1) + fib(n - 2)\n    return memo[n]\n# tabulation: fill a table from the base` },
        { label: 'Greedy choice', code: `# activity selection:\n# sort by finish time\n# take the next one that starts after\n# the last finish you took\n# only correct when a local best stays best` },
        { label: 'Choose, explore, undo', code: `def bt(path):\n    if done(path):\n        save(path); return\n    for choice in options:\n        path.append(choice)  # choose\n        bt(path)             # explore\n        path.pop()           # undo` },
      ],
    },
  ],
  projects: [
    { title: 'Operation counter', level: 'Beginner', build: 'Time a single loop and a nested loop on lists of size 1,000, 10,000 and 100,000. Plot the times and label each curve O(n) or O(n²).', skills: ['Big O', 'timing', 'arrays'] },
    { title: 'Undo stack and print queue', level: 'Beginner', build: 'A tiny text buffer whose undo history is a stack, plus a print queue that releases jobs in arrival order. Trace five operations by hand, then code them.', skills: ['stacks', 'queues', 'tracing'] },
    { title: 'Two phone books', level: 'Intermediate', build: 'Store the same contacts in a dict and in a sorted list of names. Search both, and count the comparisons so hashing and binary search are visible side by side.', skills: ['hashing', 'binary search', 'lists'] },
    { title: 'Grid maze', level: 'Intermediate', build: 'Represent a grid maze as a graph. Find a shortest path with BFS and any path with backtracking, then mark where the two routes differ.', skills: ['graphs', 'BFS', 'backtracking'] },
    { title: 'Coins that fool greedy', level: 'Advanced', build: 'For coins such as 1, 5 and 6 making 10, compute the greedy pick and a bottom-up DP table. Explain which cells each amount reuses, and why greedy used more coins.', skills: ['greedy', 'dynamic programming', 'tables'] },
  ],
}
