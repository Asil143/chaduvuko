export const DSA_UNITS = [
  {
    number: '00', section: 'Foundations', title: 'Before We Write Code',
    description: 'What DSA actually is, why every tech company tests it, how your computer stores data, and writing your very first C program.',
    topics: ['What is DSA & why it matters', 'How computers think', 'Why C for DSA', 'Your first C program'], time: '45 min', slug: 'introduction', status: 'live' as const, color: '#00e676',
  },
  {
    number: '01', section: 'Foundations', title: 'Complexity — The Scoreboard for Code',
    description: 'Learn to measure how fast and how memory-hungry any piece of code is. This is what separates good code from great code.',
    topics: ['Time Complexity', 'Space Complexity', 'Big O Notation', 'Best / Worst / Average Case', 'Analyzing any code'], time: '60 min', slug: 'complexity', status: 'live' as const, color: '#00e676',
  },
  {
    number: '02', section: 'Foundations', title: 'Arrays',
    description: 'The foundation of every data structure. Boxes lined up in memory — simple to understand, used everywhere.',
    topics: ['What is an Array', 'Insert & Delete', 'Traversal', '2D Arrays', 'Common problems'], time: '90 min', slug: 'arrays', status: 'live' as const, color: '#00e676',
  },
  {
    number: '03', section: 'Foundations', title: 'Strings',
    description: 'Text is just an array of characters. Learn how computers store and manipulate words, sentences, and names.',
    topics: ['Strings in C', 'Reverse & Palindrome', 'Anagram check', 'Pattern matching basics'], time: '60 min', slug: 'strings', status: 'live' as const, color: '#7b61ff',
  },
  {
    number: '04', section: 'Foundations', title: 'Pointers',
    description: 'The concept that confuses 90% of beginners — explained so clearly you\'ll wonder why everyone makes it complicated.',
    topics: ['Memory addresses', 'What is a pointer', '& and * operators', 'Pointers + arrays', 'Common mistakes'], time: '75 min', slug: 'pointers', status: 'live' as const, color: '#7b61ff',
  },
  {
    number: '05', section: 'Foundations', title: 'Recursion',
    description: 'A function that calls itself. Learn base cases, call stacks, and how to reason about recursive solutions.',
    topics: ['Base case vs recursive case', 'Tracing call stacks', 'Factorial & Fibonacci', 'Tower of Hanoi'], time: '90 min', slug: 'recursion', status: 'live' as const, color: '#f97316',
  },
  {
    number: '06', section: 'Foundations', title: 'Sorting Algorithms',
    description: 'Six ways to arrange data in order — from the simplest to the fastest. Every algorithm explained with step-by-step visuals.',
    topics: ['Bubble, Selection, Insertion', 'Merge Sort', 'Quick Sort', 'Counting Sort', 'Big O comparison'], time: '120 min', slug: 'sorting', status: 'live' as const, color: '#facc15',
  },
  {
    number: '07', section: 'Foundations', title: 'Searching Algorithms',
    description: 'Linear search checks every item. Binary search cuts the problem in half each time. Learn when and why to use each.',
    topics: ['Linear Search', 'Binary Search', 'Iterative vs Recursive', 'Binary Search variations'], time: '45 min', slug: 'searching', status: 'live' as const, color: '#facc15',
  },
  {
    number: '08', section: 'Linear Structures', title: 'Linked Lists',
    description: 'A chain of nodes where each one points to the next. More flexible than arrays — and a favourite in interviews.',
    topics: ['Singly Linked List', 'Doubly Linked List', 'Circular Linked List', 'Reverse a list', 'Detect a loop'], time: '90 min', slug: 'linked-lists', status: 'live' as const, color: '#7b61ff',
  },
  {
    number: '09', section: 'Linear Structures', title: 'Stacks',
    description: 'Last In, First Out. Like a stack of plates — you always pick from the top. Powers undo/redo and function calls.',
    topics: ['Stack using array', 'Stack using linked list', 'Balanced parentheses', 'Function call stack'], time: '60 min', slug: 'stacks', status: 'live' as const, color: '#f97316',
  },
  {
    number: '10', section: 'Linear Structures', title: 'Queues',
    description: 'First In, First Out. Like a ticket counter line. Powers everything from CPU scheduling to message delivery.',
    topics: ['Queue using array', 'Circular Queue', 'Deque', 'Priority Queue', 'Real-world uses'], time: '60 min', slug: 'queues', status: 'live' as const, color: '#f97316',
  },
  {
    number: '11', section: 'Linear Structures', title: 'Hashing',
    description: 'Look up anything in O(1) average time. Learn how hash tables handle collisions and power fast lookups.',
    topics: ['Hash functions', 'Collisions', 'Chaining', 'Open Addressing', 'Build one in C'], time: '75 min', slug: 'hashing', status: 'live' as const, color: '#4285f4',
  },
  {
    number: '12', section: 'Non-Linear Structures', title: 'Trees',
    description: 'Hierarchical data — like a company org chart. The most important non-linear structure you\'ll ever learn.',
    topics: ['Tree terminology', 'Binary Tree in C', 'Inorder / Preorder / Postorder', 'Level Order traversal'], time: '90 min', slug: 'trees', status: 'live' as const, color: '#facc15',
  },
  {
    number: '13', section: 'Non-Linear Structures', title: 'Binary Search Tree',
    description: 'A tree with a rule: left is smaller, right is bigger. Enables search, insert, and delete in O(log n) when balanced.',
    topics: ['BST property', 'Insert & Search', 'Delete (3 cases)', 'Balanced vs Unbalanced'], time: '75 min', slug: 'binary-search-tree', status: 'live' as const, color: '#4285f4',
  },
  {
    number: '14', section: 'Non-Linear Structures', title: 'Heaps',
    description: 'A tree where each parent outranks its children. Powers priority queues and heap sort.',
    topics: ['Min Heap vs Max Heap', 'Heap as array', 'Insert & Delete', 'Heap Sort'], time: '75 min', slug: 'heaps', status: 'live' as const, color: '#4285f4',
  },
  {
    number: '15', section: 'Non-Linear Structures', title: 'Graphs',
    description: 'Nodes connected by edges. Learn graph representations and the core ideas behind traversing networks.',
    topics: ['Graph types', 'Adjacency list/matrix', 'BFS & DFS overview', 'Connected components'], time: '120 min', slug: 'graphs', status: 'live' as const, color: '#0078d4',
  },
  {
    number: '16', section: 'Non-Linear Structures', title: 'Tries',
    description: 'Store words by shared prefixes to power autocomplete, dictionary lookup, and prefix search.',
    topics: ['Trie nodes and edges', 'Insert & search', 'Prefix queries', 'Deletion and memory trade-offs'], time: '75 min', slug: 'tries', status: 'live' as const, color: '#0078d4',
  },
  {
    number: '17', section: 'Non-Linear Structures', title: 'Union-Find (Disjoint Set Union)',
    description: 'Track connected components as edges arrive, with path compression and union by size.',
    topics: ['Find and union', 'Path compression', 'Union by size', 'Connectivity and cycle checks'], time: '60 min', slug: 'union-find', status: 'live' as const, color: '#0078d4',
  },
  {
    number: '18', section: 'Non-Linear Structures', title: 'Minimum Spanning Trees — Kruskal and Prim',
    description: 'Connect every vertex in a weighted, undirected graph at minimum total cost using two classic MST algorithms.',
    topics: ['Spanning tree properties', 'Kruskal + DSU', 'Prim + priority queue', 'Disconnected graphs'], time: '90 min', slug: 'minimum-spanning-trees', status: 'live' as const, color: '#0078d4',
  },
  {
    number: '19', section: 'Algorithm Paradigms', title: 'Dynamic Programming',
    description: 'Remember answers you\'ve already computed. DP turns exponential problems into polynomial ones — build the idea from scratch.',
    topics: ['Memoization', 'Tabulation', 'Knapsack', 'LCS', 'Coin Change', 'Edit Distance'], time: '150 min', slug: 'dynamic-programming', status: 'live' as const, color: '#0078d4',
  },
  {
    number: '20', section: 'Algorithm Paradigms', title: 'Greedy Algorithms',
    description: 'Always pick the best option right now. Learn when that choice is provably safe and when it is not.',
    topics: ['Activity Selection', 'Fractional Knapsack', 'Huffman Coding', 'Greedy vs DP'], time: '75 min', slug: 'greedy', status: 'live' as const, color: '#0078d4',
  },
  {
    number: '21', section: 'Algorithm Paradigms', title: 'Backtracking',
    description: 'Try a path. Hit a dead end. Go back. Backtracking is how computers solve puzzles — N-Queens, Sudoku, mazes.',
    topics: ['N-Queens', 'Rat in a Maze', 'Sudoku Solver', 'Subset Sum'], time: '90 min', slug: 'backtracking', status: 'live' as const, color: '#8b5cf6',
  },
  {
    number: '22', section: 'Algorithm Paradigms', title: 'Graph Algorithms — BFS/DFS Applications, Topological Sort, Shortest Paths',
    description: 'Turn graph traversals into solutions for reachability, dependencies, and shortest paths; choose the algorithm that matches the edge model.',
    topics: ['BFS applications', 'DFS applications', 'Topological sort', 'BFS vs Dijkstra vs Bellman-Ford'], time: '120 min', slug: 'graph-algorithms', status: 'live' as const, color: '#0078d4',
  },
  {
    number: '23', section: 'Algorithm Paradigms', title: 'Dynamic Programming Patterns — 1D, 2D, Knapsack, Subsequences',
    description: 'A pattern-focused DP workshop: define states and transitions for sequences, grids, capacities, and subsequences.',
    topics: ['1D DP', '2D grid DP', '0/1 Knapsack', 'Subsequence DP', 'Reconstruction'], time: '120 min', slug: 'dynamic-programming-patterns', status: 'live' as const, color: '#0078d4',
  },
  {
    number: '24', section: 'Algorithm Paradigms', title: 'Two Pointers and Sliding Window',
    description: 'Use monotone indices and maintained window state to replace many quadratic scans with linear passes.',
    topics: ['Opposite-direction pointers', 'Fast/slow pointers', 'Fixed windows', 'Variable windows'], time: '90 min', slug: 'two-pointers-sliding-window', status: 'live' as const, color: '#facc15',
  },
  {
    number: '25', section: 'Algorithm Paradigms', title: 'Bit Manipulation',
    description: 'Reason about binary representations and use bitwise operators for masks, flags, and compact state.',
    topics: ['AND / OR / XOR', 'Set, clear, toggle, test', 'Masks', 'Overflow and signed integers'], time: '75 min', slug: 'bit-manipulation', status: 'live' as const, color: '#8b5cf6',
  },
  {
    number: '26', section: 'Algorithm Paradigms', title: 'Advanced Topics',
    description: 'Explore Segment Trees, Fenwick Trees, and advanced techniques; dedicated lessons now provide focused coverage of tries, DSU, windows, and bit manipulation.',
    topics: ['Segment Tree', 'Fenwick Tree', 'Range queries', 'Advanced techniques'], time: '120 min', slug: 'advanced', status: 'live' as const, color: '#8b5cf6',
  },
  {
    number: '27', section: 'Interview', title: 'Interview Problem-Solving Patterns',
    description: 'Recognise recurring interview problem shapes, choose an efficient approach, explain your reasoning, and practise classic solutions in C for placement rounds and online assessments.',
    topics: ['Pattern Recognition', 'Problem-Solving Framework', 'Classic Interview Problems', 'Dry Runs', '4-Week Practice Plan'], time: '180 min', slug: 'interview-patterns', status: 'live' as const, color: '#8b5cf6',
  },
] as const
