import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { WithLessonNav } from '@/components/content/WithLessonNav'
import { DsaLesson } from '@/components/dsa/DsaLesson'
import { DSA_UNITS } from '@/data/dsa-curriculum'

const LIVE_SLUGS = new Set(DSA_UNITS.filter(unit => unit.status === 'live').map(unit => unit.slug))

export const dynamicParams = false


const moduleMeta: Record<string, { title: string; description: string }> = {
  'introduction':        { title: 'Before We Write Code',         description: 'What DSA actually is, why every tech company tests it, and your first C program.' },
  'complexity':          { title: 'Complexity — The Scoreboard',  description: 'Time complexity, space complexity, Big O notation, and how to analyse any code.' },
  'arrays':              { title: 'Arrays',                       description: 'The foundation of every data structure — contiguous memory, traversal, insert, delete.' },
  'strings':             { title: 'Strings',                      description: 'Text is just an array of characters — reverse, palindrome, anagram, pattern matching.' },
  'pointers':            { title: 'Pointers',                     description: 'Memory addresses, & and * operators, pointers + arrays — explained from scratch.' },
  'linked-lists':        { title: 'Linked Lists',                 description: 'Singly, doubly, circular linked lists — reverse a list, detect a loop.' },
  'stacks':              { title: 'Stacks',                       description: 'LIFO — balanced parentheses, function call stack, stack using array and linked list.' },
  'queues':              { title: 'Queues',                       description: 'FIFO — circular queue, deque, priority queue, real-world uses.' },
  'recursion':           { title: 'Recursion',                    description: 'Base case vs recursive case, tracing call stacks, factorial, Fibonacci, Tower of Hanoi.' },
  'sorting':             { title: 'Sorting Algorithms',           description: 'Bubble, Selection, Insertion, Merge, Quick, Counting Sort — with Big O comparison.' },
  'searching':           { title: 'Searching Algorithms',         description: 'Linear search vs binary search — iterative, recursive, and binary search variations.' },
  'trees':               { title: 'Trees',                        description: 'Binary trees, inorder/preorder/postorder traversal, level order — from scratch in C.' },
  'binary-search-tree':  { title: 'Binary Search Tree',          description: 'BST property, insert, search, delete (3 cases), balanced vs unbalanced.' },
  'heaps':               { title: 'Heaps',                        description: 'Min heap, max heap, heap as array, insert, delete, heap sort.' },
  'hashing':             { title: 'Hashing',                      description: 'Hash functions, collisions, chaining, open addressing — build one in C.' },
  'graphs':              { title: 'Graphs',                       description: 'Graph types, adjacency list/matrix, BFS, DFS, Dijkstra\'s, topological sort.' },
  'dynamic-programming': { title: 'Dynamic Programming',          description: 'Memoization, tabulation, knapsack, LCS, coin change, edit distance.' },
  'greedy':              { title: 'Greedy Algorithms',            description: 'Activity selection, fractional knapsack, Huffman coding, greedy vs DP.' },
  'backtracking':        { title: 'Backtracking',                 description: 'N-Queens, rat in a maze, Sudoku solver, subset sum.' },
  'advanced':            { title: 'Advanced Topics',              description: 'Segment tree, trie, union-find, sliding window, two pointers, bit manipulation.' },
};

export function generateStaticParams() {
  return Array.from(LIVE_SLUGS).map(topic => ({ topic }));
}

export async function generateMetadata({
  params,
}: {
  params: { topic: string };
}): Promise<Metadata> {
  const meta = moduleMeta[params.topic];
  if (!meta) return { title: 'DSA | Chaduvuko' };
  return {
    title: `${meta.title} | DSA | Chaduvuko`,
    description: meta.description,
  };
}

export default function DSAModulePage({
  params,
}: {
  params: { topic: string };
}) {
  if (!LIVE_SLUGS.has(params.topic)) notFound();
  return (
    <WithLessonNav href={`/learn/dsa/${params.topic}`}>
      <DsaLesson slug={params.topic} />
    </WithLessonNav>
  );
}