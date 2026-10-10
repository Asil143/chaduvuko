import type { LessonQuick } from '@/lib/lesson-quick'

const D = '/learn/dsa'

// C examples are compiled with cc -std=c11 -Wall -Werror and run by scripts/quick-results.ts;
// the output shown on the page is what the program really prints.
export const DSA_QUICK: Record<string, LessonQuick> = {
  [`${D}/introduction`]: {
    answer: 'Data structures are ways of organising data in memory (arrays, lists, trees, hash tables) and algorithms are step-by-step procedures that work on them (searching, sorting). Interviews test DSA because it shows how you reason about speed and memory.',
    points: [
      'Every variable lives at an address in memory; its name is just a label.',
      'The right structure can turn a slow program into a fast one.',
      'This track uses C because it shows exactly what happens in memory.',
    ],
    example: {
      label: 'A first C program: values and where they live',
      lang: 'c',
      code: `#include <stdio.h>

int main(void) {
    int orders = 42;
    double total = 129.50;
    printf("orders = %d, total = %.2f\\n", orders, total);
    printf("orders uses %zu bytes, total uses %zu bytes\\n", sizeof orders, sizeof total);
    return 0;
}`,
    },
    check: {
      question: 'What is an algorithm?',
      options: ['A way of storing data', 'A step-by-step procedure that solves a problem', 'A programming language', 'A kind of memory'],
      answer: 1,
      explanation: 'Data structures organise data; algorithms are the procedures that operate on it.',
    },
  },

  [`${D}/complexity`]: {
    answer: 'Time complexity describes how the number of steps grows as the input size n grows, and space complexity how the extra memory grows. Big O names the growth rate: O(1) constant, O(log n), O(n), O(n log n), O(n²), O(2ⁿ).',
    points: [
      'Big O ignores constants and keeps the fastest-growing term.',
      'One loop over n items is O(n); a loop inside a loop is O(n²).',
      'Halving the problem each step gives O(log n).',
    ],
    example: {
      label: 'Counting steps: one loop vs nested loops',
      lang: 'c',
      code: `#include <stdio.h>

int main(void) {
    for (int n = 10; n <= 1000; n *= 10) {
        long linear = 0, quadratic = 0;
        for (int i = 0; i < n; i++) linear++;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++) quadratic++;
        printf("n=%4d  O(n)=%4ld  O(n^2)=%7ld\\n", n, linear, quadratic);
    }
    return 0;
}`,
    },
    check: {
      question: 'What is the time complexity of a loop inside a loop, each running n times?',
      options: ['O(n)', 'O(2n)', 'O(n²)', 'O(log n)'],
      answer: 2,
      explanation: 'The inner loop runs n times for each of the n outer iterations: n × n steps.',
    },
  },

  [`${D}/arrays`]: {
    answer: 'An array stores elements of one type in consecutive memory slots, so element i is found instantly at base address + i × element size. Reading by index is O(1); inserting or deleting in the middle means shifting elements, which is O(n).',
    points: [
      'Indices run from 0 to n−1; index n is out of bounds.',
      'Contiguous memory is what makes indexing O(1).',
      'Insert or delete at position k shifts everything after it.',
    ],
    example: {
      label: 'Index in O(1), insert by shifting',
      lang: 'c',
      code: `#include <stdio.h>

int main(void) {
    int a[6] = {10, 20, 30, 40, 50};
    int n = 5;
    printf("a[2] = %d\\n", a[2]);

    // insert 25 at index 2: shift elements right
    for (int i = n; i > 2; i--) a[i] = a[i - 1];
    a[2] = 25;
    n++;

    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`,
    },
    check: {
      question: 'Why is reading a[i] O(1)?',
      options: ['Arrays are sorted', 'The address is computed directly from the index', 'The CPU caches every array', 'Arrays are small'],
      answer: 1,
      explanation: 'Elements sit back to back, so the address of a[i] is base + i × size: one calculation, whatever n is.',
    },
  },

  [`${D}/strings`]: {
    answer: 'In C, a string is an array of characters ending with a null terminator \'\\0\'. The <string.h> functions strlen, strcpy, strcat and strcmp work on that convention; compare strings with strcmp, never ==.',
    points: [
      'Allocate length + 1 bytes for the terminating \'\\0\'.',
      '== compares addresses, not contents.',
      'Many interview problems are string scans with two indices.',
    ],
    example: {
      label: 'Length, comparison, and an in-place reverse',
      lang: 'c',
      code: `#include <stdio.h>
#include <string.h>

int main(void) {
    char word[] = "stack";
    printf("length = %zu\\n", strlen(word));
    printf("same? %s\\n", strcmp(word, "stack") == 0 ? "yes" : "no");

    for (size_t i = 0, j = strlen(word) - 1; i < j; i++, j--) {
        char t = word[i]; word[i] = word[j]; word[j] = t;
    }
    printf("reversed = %s\\n", word);
    return 0;
}`,
    },
    check: {
      question: 'How many bytes does the string "hello" need in a char array?',
      options: ['5', '6', '4', '10'],
      answer: 1,
      explanation: 'Five characters plus the terminating \'\\0\'.',
    },
  },

  [`${D}/pointers`]: {
    answer: 'A pointer is a variable that holds a memory address. &x gives the address of x, and *p reads or writes the value at the address stored in p. Pointers let functions change the caller\'s variables and are how linked structures connect.',
    points: [
      'int *p declares a pointer to an int.',
      '* in a declaration means "pointer"; in an expression it means "the value at".',
      'Passing &x to a function lets it modify x.',
    ],
    example: {
      label: 'Address-of, dereference, and a swap through pointers',
      lang: 'c',
      code: `#include <stdio.h>

void swap(int *a, int *b) {
    int t = *a; *a = *b; *b = t;
}

int main(void) {
    int age = 30;
    int *p = &age;
    *p = 31;                       /* changes age through the pointer */
    printf("age = %d\\n", age);

    int x = 1, y = 2;
    swap(&x, &y);
    printf("x = %d, y = %d\\n", x, y);
    return 0;
}`,
    },
    check: {
      question: 'p holds the address of age. What does *p = 5 do?',
      options: ['Changes p to point at address 5', 'Sets age to 5', 'Creates a new variable', 'Nothing'],
      answer: 1,
      explanation: '*p refers to the value stored at the address in p, which is age.',
    },
  },

  [`${D}/linked-lists`]: {
    answer: 'A linked list is a chain of nodes, each holding data and a pointer to the next node, ending in NULL. Nodes can live anywhere in memory, so inserting at the front is O(1), but reaching the k-th element means walking the chain, which is O(n).',
    points: [
      'Create nodes with malloc and free them when done.',
      'Traverse with a temporary pointer; moving head loses the list.',
      'node->next reads a field through a pointer.',
    ],
    example: {
      label: 'Build a list by inserting at the front, then walk it',
      lang: 'c',
      code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

Node *push_front(Node *head, int value) {
    Node *n = malloc(sizeof *n);
    n->data = value;
    n->next = head;
    return n;
}

int main(void) {
    Node *head = NULL;
    for (int v = 1; v <= 3; v++) head = push_front(head, v);
    for (Node *cur = head; cur; cur = cur->next) printf("%d -> ", cur->data);
    printf("NULL\\n");
    while (head) { Node *next = head->next; free(head); head = next; }
    return 0;
}`,
    },
    check: {
      question: 'What is the cost of reading the 1,000th element of a linked list?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      answer: 2,
      explanation: 'There is no index arithmetic; you follow next pointers one node at a time.',
    },
  },

  [`${D}/stacks`]: {
    answer: 'A stack is last in, first out (LIFO): push adds to the top, pop removes from the top, and peek reads it, each in O(1). Stacks power undo, the function call stack, and checking balanced brackets.',
    points: [
      'An array stack tracks a top index that starts at -1.',
      'Check for overflow before push and underflow before pop.',
      'Balanced brackets: push openers, pop and match on closers.',
    ],
    example: {
      label: 'Check balanced brackets with a stack',
      lang: 'c',
      code: `#include <stdio.h>

int balanced(const char *s) {
    char stack[100];
    int top = -1;
    for (; *s; s++) {
        if (*s == '(' || *s == '[' || *s == '{') stack[++top] = *s;
        else if (*s == ')' || *s == ']' || *s == '}') {
            if (top < 0) return 0;
            char open = stack[top--];
            if ((*s == ')' && open != '(') || (*s == ']' && open != '[') || (*s == '}' && open != '{')) return 0;
        }
    }
    return top == -1;
}

int main(void) {
    printf("%d %d %d\\n", balanced("{[()]}"), balanced("([)]"), balanced("(("));
    return 0;
}`,
    },
    check: {
      question: 'You push 1, 2, 3 and then pop once. What comes out?',
      options: ['1', '2', '3', 'Nothing'],
      answer: 2,
      explanation: 'Last in, first out: 3 was pushed last, so it is popped first.',
    },
  },

  [`${D}/queues`]: {
    answer: 'A queue is first in, first out (FIFO): enqueue adds at the rear and dequeue removes from the front, each in O(1). A circular queue wraps the indices with modulo so freed slots are reused.',
    points: [
      'Queues model waiting lines: print jobs, task schedulers, BFS.',
      'rear = (rear + 1) % MAX wraps around the array.',
      'Keep a count to tell a full queue from an empty one.',
    ],
    example: {
      label: 'A circular queue that reuses freed slots',
      lang: 'c',
      code: `#include <stdio.h>
#define MAX 3

int q[MAX], front = 0, count = 0;

void enqueue(int v) { q[(front + count) % MAX] = v; count++; }
int dequeue(void)   { int v = q[front]; front = (front + 1) % MAX; count--; return v; }

int main(void) {
    enqueue(1); enqueue(2); enqueue(3);
    printf("%d ", dequeue());
    enqueue(4);                  /* reuses the slot 1 left behind */
    while (count) printf("%d ", dequeue());
    printf("\\n");
    return 0;
}`,
    },
    check: {
      question: 'You enqueue A, B, C and dequeue once. What comes out?',
      options: ['A', 'B', 'C', 'Nothing'],
      answer: 0,
      explanation: 'First in, first out: A arrived first, so it leaves first.',
    },
  },

  [`${D}/recursion`]: {
    answer: 'A recursive function solves a problem by calling itself on a smaller version of it until it reaches a base case it can answer directly. Each call gets its own frame on the call stack, which unwinds as results come back.',
    points: [
      'Every recursion needs a base case, or it never stops.',
      'Each call must move closer to the base case.',
      'Too many nested calls overflow the stack.',
    ],
    example: {
      label: 'Factorial and the Tower of Hanoi move count',
      lang: 'c',
      code: `#include <stdio.h>

long factorial(int n) {
    if (n <= 1) return 1;          /* base case */
    return n * factorial(n - 1);   /* smaller problem */
}

long hanoi_moves(int disks) {
    if (disks == 0) return 0;
    return 2 * hanoi_moves(disks - 1) + 1;
}

int main(void) {
    printf("5! = %ld\\n", factorial(5));
    printf("moves for 3 disks = %ld\\n", hanoi_moves(3));
    return 0;
}`,
    },
    check: {
      question: 'What happens if a recursive function has no base case?',
      options: ['It returns 0', 'It recurses until the call stack overflows', 'The compiler adds one', 'It runs once'],
      answer: 1,
      explanation: 'Without a stopping condition each call makes another, until the stack runs out of space.',
    },
  },

  [`${D}/sorting`]: {
    answer: 'Sorting puts items in order. Simple sorts (bubble, selection, insertion) are O(n²); merge sort and heap sort are O(n log n) in every case, and quicksort is O(n log n) on average but O(n²) in its worst case.',
    points: [
      'Insertion sort is fast on nearly sorted data.',
      'Merge sort is stable and always O(n log n), but needs extra memory.',
      'Sorted data enables binary search.',
    ],
    example: {
      label: 'Insertion sort, step by step',
      lang: 'c',
      code: `#include <stdio.h>

int main(void) {
    int a[] = {5, 2, 4, 6, 1, 3};
    int n = sizeof a / sizeof a[0];
    for (int i = 1; i < n; i++) {
        int key = a[i], j = i - 1;
        while (j >= 0 && a[j] > key) { a[j + 1] = a[j]; j--; }
        a[j + 1] = key;
        printf("pass %d: ", i);
        for (int k = 0; k < n; k++) printf("%d ", a[k]);
        printf("\\n");
    }
    return 0;
}`,
    },
    check: {
      question: 'Which sort is O(n log n) even in its worst case?',
      options: ['Bubble sort', 'Quicksort', 'Merge sort', 'Insertion sort'],
      answer: 2,
      explanation: 'Merge sort always splits in half and merges in linear time. Quicksort degrades to O(n²) with bad pivots.',
    },
  },

  [`${D}/searching`]: {
    answer: 'Linear search checks each element in turn, O(n), and works on any data. Binary search works on sorted data: it compares with the middle element and discards half the range each step, so it is O(log n).',
    points: [
      'A billion sorted items take about 30 binary-search steps.',
      'Compute mid as low + (high - low) / 2 to avoid overflow.',
      'Binary search on unsorted data gives wrong answers.',
    ],
    example: {
      label: 'Binary search, showing each step',
      lang: 'c',
      code: `#include <stdio.h>

int main(void) {
    int a[] = {3, 8, 15, 23, 42, 57, 61, 78, 90};
    int target = 61, low = 0, high = 8, step = 0;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        printf("step %d: check a[%d] = %d\\n", ++step, mid, a[mid]);
        if (a[mid] == target) { printf("found at index %d\\n", mid); return 0; }
        if (a[mid] < target) low = mid + 1; else high = mid - 1;
    }
    printf("not found\\n");
    return 0;
}`,
    },
    check: {
      question: 'What does binary search require?',
      options: ['A linked list', 'Sorted data', 'Unique values', 'An even number of items'],
      answer: 1,
      explanation: 'Discarding half the range only works if order tells you which half the target is in.',
    },
  },

  [`${D}/trees`]: {
    answer: 'A tree stores data hierarchically: each node has children and no cycles exist. In a binary tree each node has at most a left and a right child. Traversals visit every node in a set order: preorder, inorder, postorder (depth-first) or level order (breadth-first).',
    points: [
      'Leaves have no children; their pointers are NULL.',
      'Inorder is left, root, right; preorder is root first; postorder is root last.',
      'File systems, the HTML DOM and parsers are trees.',
    ],
    example: {
      label: 'Three depth-first traversals of one tree',
      lang: 'c',
      code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int v; struct Node *l, *r; } Node;
Node *node(int v, Node *l, Node *r) { Node *n = malloc(sizeof *n); n->v = v; n->l = l; n->r = r; return n; }

void pre(Node *n)  { if (!n) return; printf("%d ", n->v); pre(n->l); pre(n->r); }
void in(Node *n)   { if (!n) return; in(n->l); printf("%d ", n->v); in(n->r); }
void post(Node *n) { if (!n) return; post(n->l); post(n->r); printf("%d ", n->v); }

int main(void) {
    /*      1
          /   \\
         2     3
        / \\
       4   5      */
    Node *root = node(1, node(2, node(4, NULL, NULL), node(5, NULL, NULL)), node(3, NULL, NULL));
    printf("preorder:  "); pre(root);  printf("\\n");
    printf("inorder:   "); in(root);   printf("\\n");
    printf("postorder: "); post(root); printf("\\n");
    return 0;
}`,
    },
    check: {
      question: 'In which order does an inorder traversal visit a node and its subtrees?',
      options: ['Root, left, right', 'Left, root, right', 'Left, right, root', 'Level by level'],
      answer: 1,
      explanation: 'Inorder visits the left subtree, then the node, then the right subtree.',
    },
  },

  [`${D}/binary-search-tree`]: {
    answer: 'A binary search tree keeps every value in a node\'s left subtree smaller than the node and every value in its right subtree larger. Search, insert and delete follow one path down, O(log n) when the tree is balanced and O(n) when it degenerates into a line.',
    points: [
      'The rule holds against every ancestor, not just the parent.',
      'An inorder traversal of a BST prints the values sorted.',
      'Inserting already-sorted data makes a degenerate, list-like tree.',
    ],
    example: {
      label: 'Insert values, then print them in order',
      lang: 'c',
      code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int v; struct Node *l, *r; } Node;

Node *insert(Node *n, int v) {
    if (!n) { n = calloc(1, sizeof *n); n->v = v; return n; }
    if (v < n->v) n->l = insert(n->l, v); else n->r = insert(n->r, v);
    return n;
}
void inorder(Node *n) { if (n) { inorder(n->l); printf("%d ", n->v); inorder(n->r); } }
int contains(Node *n, int v) { while (n && n->v != v) n = v < n->v ? n->l : n->r; return n != NULL; }

int main(void) {
    Node *root = NULL;
    int values[] = {50, 30, 70, 20, 40, 60, 80};
    for (int i = 0; i < 7; i++) root = insert(root, values[i]);
    inorder(root);
    printf("\\ncontains 60? %d  contains 65? %d\\n", contains(root, 60), contains(root, 65));
    return 0;
}`,
    },
    check: {
      question: 'What does an inorder traversal of a BST produce?',
      options: ['Values in insertion order', 'Values in sorted order', 'Values level by level', 'Only the leaves'],
      answer: 1,
      explanation: 'Left subtree (smaller), node, right subtree (larger) at every level gives ascending order.',
    },
  },

  [`${D}/heaps`]: {
    answer: 'A heap is a complete binary tree stored in an array where every parent is at least as large as its children (max-heap) or at most as small (min-heap). The top is always the maximum or minimum, and insert and remove-top are O(log n).',
    points: [
      'For index i: parent (i−1)/2, children 2i+1 and 2i+2.',
      'Insert: add at the end and bubble up. Remove: move the last item to the top and sift down.',
      'Heaps implement priority queues and heap sort.',
    ],
    example: {
      label: 'A max-heap: insert values, then remove the largest each time',
      lang: 'c',
      code: `#include <stdio.h>

int h[16], n = 0;
void swap(int i, int j) { int t = h[i]; h[i] = h[j]; h[j] = t; }

void push(int v) {
    int i = n++;
    h[i] = v;
    while (i > 0 && h[(i - 1) / 2] < h[i]) { swap(i, (i - 1) / 2); i = (i - 1) / 2; }
}

int pop(void) {
    int top = h[0];
    h[0] = h[--n];
    for (int i = 0;;) {
        int l = 2 * i + 1, r = l + 1, big = i;
        if (l < n && h[l] > h[big]) big = l;
        if (r < n && h[r] > h[big]) big = r;
        if (big == i) break;
        swap(i, big); i = big;
    }
    return top;
}

int main(void) {
    int values[] = {15, 40, 8, 23, 42, 4};
    for (int i = 0; i < 6; i++) push(values[i]);
    while (n) printf("%d ", pop());
    printf("\\n");
    return 0;
}`,
    },
    check: {
      question: 'In an array-based heap, where are the children of index 3?',
      options: ['4 and 5', '6 and 7', '7 and 8', '1 and 2'],
      answer: 2,
      explanation: 'Children are at 2i + 1 and 2i + 2: 7 and 8.',
    },
  },

  [`${D}/hashing`]: {
    answer: 'Hashing turns a key into an array index with a hash function, giving O(1) average lookup. When two keys land on the same index (a collision), the table resolves it by chaining (a list per bucket) or open addressing (probing for another slot).',
    points: [
      'A good hash function is fast and spreads keys evenly.',
      'Collisions always happen eventually; the table must handle them.',
      'Keep the load factor low, resizing as the table fills.',
    ],
    example: {
      label: 'A string hash and where keys land (eggs and rice collide)',
      lang: 'c',
      code: `#include <stdio.h>
#define SIZE 7

unsigned hash(const char *key) {
    unsigned h = 0;
    while (*key) h = h * 31 + (unsigned char)*key++;
    return h % SIZE;
}

int main(void) {
    const char *keys[] = {"apple", "milk", "bread", "eggs", "rice"};
    for (int i = 0; i < 5; i++) printf("%-5s -> bucket %u\\n", keys[i], hash(keys[i]));
    return 0;
}`,
    },
    check: {
      question: 'Two different keys hash to the same index. What is that called?',
      options: ['An overflow', 'A collision', 'A rehash', 'A miss'],
      answer: 1,
      explanation: 'A collision. Chaining or open addressing lets both keys be stored.',
    },
  },

  [`${D}/graphs`]: {
    answer: 'A graph is a set of vertices connected by edges, which may be directed or undirected and weighted or not. Store it as an adjacency matrix (O(V²) space) or adjacency lists (O(V + E)). BFS explores level by level with a queue; DFS goes deep with a stack or recursion.',
    points: [
      'BFS finds shortest paths in unweighted graphs.',
      'Dijkstra\'s algorithm finds shortest paths with non-negative weights.',
      'Topological sort orders the vertices of a directed acyclic graph.',
    ],
    example: {
      label: 'BFS distances from vertex 0',
      lang: 'c',
      code: `#include <stdio.h>
#define V 6

int main(void) {
    int adj[V][V] = {0};
    int edges[][2] = {{0, 1}, {0, 2}, {1, 3}, {2, 3}, {3, 4}, {4, 5}};
    for (int i = 0; i < 6; i++) { adj[edges[i][0]][edges[i][1]] = 1; adj[edges[i][1]][edges[i][0]] = 1; }

    int dist[V], queue[V], head = 0, tail = 0;
    for (int i = 0; i < V; i++) dist[i] = -1;
    dist[0] = 0; queue[tail++] = 0;
    while (head < tail) {
        int u = queue[head++];
        for (int v = 0; v < V; v++)
            if (adj[u][v] && dist[v] == -1) { dist[v] = dist[u] + 1; queue[tail++] = v; }
    }
    for (int i = 0; i < V; i++) printf("vertex %d: distance %d\\n", i, dist[i]);
    return 0;
}`,
    },
    check: {
      question: 'Which traversal finds the shortest path in an unweighted graph?',
      options: ['DFS', 'BFS', 'Inorder', 'Topological sort'],
      answer: 1,
      explanation: 'BFS reaches vertices in order of distance, so the first time it reaches one is via a shortest path.',
    },
  },

  [`${D}/dynamic-programming`]: {
    answer: 'Dynamic programming solves a problem by storing the answers to overlapping subproblems so each is computed once. It applies when a problem has optimal substructure and overlapping subproblems, and is written top-down (memoization) or bottom-up (tabulation).',
    points: [
      'Memoization: recursion plus a cache checked before computing.',
      'Tabulation: fill a table from the smallest subproblems up.',
      'Naive Fibonacci is O(2ⁿ); with DP it is O(n).',
    ],
    example: {
      label: 'Fibonacci: naive call count vs a DP table',
      lang: 'c',
      code: `#include <stdio.h>

long calls = 0;
long fib_naive(int n) { calls++; return n < 2 ? n : fib_naive(n - 1) + fib_naive(n - 2); }

int main(void) {
    long a = fib_naive(25);
    printf("naive: fib(25) = %ld using %ld calls\\n", a, calls);

    long table[51] = {0, 1};
    for (int i = 2; i <= 50; i++) table[i] = table[i - 1] + table[i - 2];
    printf("table: fib(25) = %ld, fib(50) = %ld using 49 additions\\n", table[25], table[50]);
    return 0;
}`,
    },
    check: {
      question: 'Which two properties make a problem suitable for DP?',
      options: ['Sorted input and unique values', 'Optimal substructure and overlapping subproblems', 'Recursion and pointers', 'Greedy choice and small input'],
      answer: 1,
      explanation: 'The best answer must build from best sub-answers, and the same subproblems must recur so caching pays off.',
    },
  },

  [`${D}/greedy`]: {
    answer: 'A greedy algorithm makes the locally best choice at each step and never revisits it. It is correct only for problems with the greedy-choice property, such as activity selection (pick the earliest finish) and fractional knapsack (best value per weight first).',
    points: [
      'Greedy is fast, usually O(n log n) because of a sort.',
      'It fails on problems such as 0/1 knapsack; those need DP.',
      'Prove greedy correctness or test it against brute force.',
    ],
    example: {
      label: 'Activity selection: always take the earliest finish',
      lang: 'c',
      code: `#include <stdio.h>

int main(void) {
    /* already sorted by finish time */
    int start[]  = {1, 3, 0, 5, 8, 5};
    int finish[] = {2, 4, 6, 7, 9, 9};
    int n = 6, last_finish = -1, chosen = 0;
    for (int i = 0; i < n; i++) {
        if (start[i] >= last_finish) {
            printf("take [%d, %d)\\n", start[i], finish[i]);
            last_finish = finish[i];
            chosen++;
        }
    }
    printf("%d activities\\n", chosen);
    return 0;
}`,
    },
    check: {
      question: 'Which problem does greedy NOT solve correctly?',
      options: ['Activity selection', 'Fractional knapsack', '0/1 knapsack', 'Huffman coding'],
      answer: 2,
      explanation: 'In 0/1 knapsack you cannot take part of an item, and the best-ratio-first choice can miss the optimum. It needs DP.',
    },
  },

  [`${D}/backtracking`]: {
    answer: 'Backtracking builds a solution one choice at a time, explores further with recursion, and undoes the choice when it leads to a dead end. Checking constraints before going deeper (pruning) skips whole branches, which makes puzzles like N-Queens and Sudoku feasible.',
    points: [
      'Choose, explore, unchoose: every choice is undone after the recursive call.',
      'Prune as early as possible.',
      'It enumerates subsets, permutations and placements.',
    ],
    example: {
      label: 'Count N-Queens solutions for N = 4 to 6',
      lang: 'c',
      code: `#include <stdio.h>
#include <stdlib.h>

int col[12], n;

int safe(int row, int c) {
    for (int r = 0; r < row; r++)
        if (col[r] == c || abs(col[r] - c) == row - r) return 0;
    return 1;
}

int solve(int row) {
    if (row == n) return 1;
    int count = 0;
    for (int c = 0; c < n; c++)
        if (safe(row, c)) { col[row] = c; count += solve(row + 1); }  /* choose, explore */
    return count;                                                       /* unchoose: overwritten next */
}

int main(void) {
    for (n = 4; n <= 6; n++) printf("N = %d: %d solutions\\n", n, solve(0));
    return 0;
}`,
    },
    check: {
      question: 'What makes backtracking faster than brute force?',
      options: ['It sorts the input', 'It prunes branches that already break a constraint', 'It uses a hash table', 'It runs in parallel'],
      answer: 1,
      explanation: 'Abandoning a partial solution as soon as it is invalid skips every completion of it.',
    },
  },

  [`${D}/advanced`]: {
    answer: 'The advanced toolkit covers patterns and structures for harder problems: sliding window and two pointers for linear scans, tries for prefix search, union-find for connected groups, segment and Fenwick trees for range queries with updates, and bit manipulation.',
    points: [
      'Sliding window turns many O(n²) subarray problems into O(n).',
      'Union-find with path compression is nearly O(1) per operation.',
      'A Fenwick tree answers prefix sums and updates in O(log n).',
    ],
    example: {
      label: 'Sliding window: the best sum of 3 consecutive days',
      lang: 'c',
      code: `#include <stdio.h>

int main(void) {
    int sales[] = {4, 2, 9, 7, 1, 8, 6, 3};
    int n = 8, k = 3, window = 0;
    for (int i = 0; i < k; i++) window += sales[i];
    int best = window, best_start = 0;
    for (int i = k; i < n; i++) {
        window += sales[i] - sales[i - k];   /* slide: add the new day, drop the oldest */
        if (window > best) { best = window; best_start = i - k + 1; }
    }
    printf("best %d-day total = %d, starting at day %d\\n", k, best, best_start);
    return 0;
}`,
    },
    check: {
      question: 'Which structure suits "are these two users in the same network?" with frequent merges?',
      options: ['Trie', 'Union-find', 'Segment tree', 'Heap'],
      answer: 1,
      explanation: 'Union-find tracks connected components, with near-constant find and union operations.',
    },
  },
}
