import type { PlaygroundChallenge } from './playgroundChallenges'

// Language-specific idiom challenges. Unlike the generic set in
// playgroundChallenges.ts, each of these targets exactly one language and
// asks the student to solve it using that language's idiomatic feature —
// Python comprehensions, Java streams, Rust's borrow checker, and so on.
//
// Validation is still output-only (same stdout match as every other
// challenge here) — the prompt instructs which idiom to use, but nothing
// statically checks the submitted code actually uses it. A regex/AST check
// would inevitably reject stylistically-different-but-valid solutions, so
// this trusts the student the same way the rest of the playground does.
//
// `language` matches a LANGUAGES[].value in app/playground/page.tsx exactly
// (python, javascript, typescript, java, cpp, c, go, rust, shell, ruby,
// php, swift, kotlin, csharp) so the modal can filter to whatever the
// student currently has selected.
export interface IdiomPlaygroundChallenge extends PlaygroundChallenge {
  language: string
  concept: string
}

export const IDIOM_PLAYGROUND_CHALLENGES: IdiomPlaygroundChallenge[] = [
  // ── Python — comprehensions, generators ──────────────────────────────────
  {
    id: 'idiom-python-list-comp',
    language: 'python',
    concept: 'List comprehension',
    title: 'Squares, the Pythonic Way',
    difficulty: 'Easy',
    prompt: 'Using a list comprehension (not a for-loop with .append), print the squares of 1 through 10, space-separated.',
    expectedOutput: '1 4 9 16 25 36 49 64 81 100',
  },
  {
    id: 'idiom-python-dict-comp',
    language: 'python',
    concept: 'Dict comprehension',
    title: 'Word Lengths, the Pythonic Way',
    difficulty: 'Medium',
    prompt: "Using a dict comprehension, build a mapping of each word in ['cat', 'dog', 'elephant'] to its length, then print the resulting dict directly (its default repr).",
    expectedOutput: "{'cat': 3, 'dog': 3, 'elephant': 8}",
  },
  {
    id: 'idiom-python-genexpr',
    language: 'python',
    concept: 'Generator expression',
    title: 'Sum of Squares Without a List',
    difficulty: 'Hard',
    prompt: 'Using a generator expression inside sum() — not a list comprehension, not a for-loop — compute and print the sum of squares of 1 through 100.',
    expectedOutput: '338350',
  },

  // ── JavaScript — array methods, destructuring ────────────────────────────
  {
    id: 'idiom-js-map',
    language: 'javascript',
    concept: 'Array.prototype.map',
    title: 'Double Every Number',
    difficulty: 'Easy',
    prompt: 'Using Array.prototype.map (not a for-loop), print the doubled values of [1, 2, 3, 4, 5], space-separated.',
    expectedOutput: '2 4 6 8 10',
  },
  {
    id: 'idiom-js-destructure-swap',
    language: 'javascript',
    concept: 'Array destructuring',
    title: 'Swap Without a Temp Variable',
    difficulty: 'Medium',
    prompt: 'Given let a = 1, b = 2;, use array destructuring assignment to swap their values without a temporary variable, then print exactly: a=2 b=1',
    expectedOutput: 'a=2 b=1',
  },
  {
    id: 'idiom-js-reduce',
    language: 'javascript',
    concept: 'Array.prototype.reduce',
    title: 'Sum 1 to 20 Without a Loop',
    difficulty: 'Hard',
    prompt: 'Using Array.prototype.reduce (no for/while loop), compute and print the sum of the integers 1 through 20.',
    expectedOutput: '210',
  },

  // ── TypeScript — generics, union types, optional chaining ────────────────
  {
    id: 'idiom-ts-generic-identity',
    language: 'typescript',
    concept: 'Generics',
    title: 'A Type-Safe Identity Function',
    difficulty: 'Easy',
    prompt: 'Write a generic function identity<T>(x: T): T that returns its argument unchanged. Call it with 42 and print the result, then call it with "hello" and print that result on the next line.',
    expectedOutput: '42\nhello',
  },
  {
    id: 'idiom-ts-optional-chaining',
    language: 'typescript',
    concept: 'Optional chaining + nullish coalescing',
    title: 'Safely Reading a Missing Field',
    difficulty: 'Medium',
    prompt: 'Given const user: { profile: { name: string } | null } = { profile: null };, use optional chaining (?.) together with the nullish coalescing operator (??) to print user.profile?.name, defaulting to "Guest".',
    expectedOutput: 'Guest',
  },
  {
    id: 'idiom-ts-discriminated-union',
    language: 'typescript',
    concept: 'Discriminated union',
    title: 'Area of a Shape',
    difficulty: 'Hard',
    prompt: 'Define a discriminated union type Shape = { kind: "circle"; radius: number } | { kind: "square"; side: number }, write a function computing its area with a switch on `kind`, and print the area of a circle with radius 5 (use Math.PI, print with exactly 2 decimal places via .toFixed(2)).',
    expectedOutput: '78.54',
  },

  // ── Java — streams, Optional ──────────────────────────────────────────────
  {
    id: 'idiom-java-stream-map-sum',
    language: 'java',
    concept: 'Streams',
    title: 'Sum of Squares via Streams',
    difficulty: 'Easy',
    prompt: 'Using an IntStream (IntStream.rangeClosed(1,5).map(...).sum()), compute and print the sum of squares of 1 through 5.',
    expectedOutput: '55',
  },
  {
    id: 'idiom-java-stream-filter',
    language: 'java',
    concept: 'Streams',
    title: 'Filter Even Numbers via Streams',
    difficulty: 'Medium',
    prompt: 'Given List.of(3, 7, 2, 9, 4, 1, 8), use a Stream with .filter to keep only the even numbers (preserving their original order), then print them space-separated.',
    expectedOutput: '2 4 8',
  },
  {
    id: 'idiom-java-optional',
    language: 'java',
    concept: 'Optional',
    title: 'A Method That Might Not Return a Value',
    difficulty: 'Hard',
    prompt: 'Write a method returning Optional<Integer> — Optional.empty() when the input is 0, otherwise Optional.of(100 / x). Call it with 0, then print the result of .orElse(-1).',
    expectedOutput: '-1',
  },

  // ── C++ — STL algorithms ──────────────────────────────────────────────────
  {
    id: 'idiom-cpp-sort',
    language: 'cpp',
    concept: 'std::sort',
    title: 'Sort With the STL, Not By Hand',
    difficulty: 'Easy',
    prompt: 'Using std::sort from <algorithm> (not a hand-written sort), sort {5, 3, 8, 1, 9} in ascending order and print the result space-separated.',
    expectedOutput: '1 3 5 8 9',
  },
  {
    id: 'idiom-cpp-accumulate',
    language: 'cpp',
    concept: 'std::accumulate',
    title: 'Sum With the STL',
    difficulty: 'Medium',
    prompt: 'Using std::accumulate from <numeric>, compute and print the sum of {1,2,3,4,5,6,7,8,9,10}.',
    expectedOutput: '55',
  },
  {
    id: 'idiom-cpp-count-if',
    language: 'cpp',
    concept: 'std::count_if + lambda',
    title: 'Count Evens With a Lambda',
    difficulty: 'Hard',
    prompt: 'Using std::count_if from <algorithm> with a lambda predicate, count how many values in {4, 7, 2, 9, 12, 5, 18} are even, and print the count.',
    expectedOutput: '4',
  },

  // ── C — pointers, structs, bitwise ────────────────────────────────────────
  {
    id: 'idiom-c-pointer-arith',
    language: 'c',
    concept: 'Pointer arithmetic',
    title: 'Sum an Array Using Pointer Arithmetic',
    difficulty: 'Easy',
    prompt: 'Given int arr[] = {1,2,3,4,5};, sum its elements using pointer arithmetic (*(p+i)) — not array-index syntax like arr[i] — and print the sum.',
    expectedOutput: '15',
  },
  {
    id: 'idiom-c-struct',
    language: 'c',
    concept: 'Structs',
    title: 'Manhattan Distance With a Struct',
    difficulty: 'Medium',
    prompt: 'Define a struct Point { int x, y; }, write a function computing the Manhattan distance between two Points, and print the distance between (3,4) and (0,0).',
    expectedOutput: '7',
  },
  {
    id: 'idiom-c-bitwise',
    language: 'c',
    concept: 'Bitwise operators',
    title: 'Even Check Without % or /',
    difficulty: 'Hard',
    prompt: 'Using only a bitwise operator (no % or / at all), check whether 42 is even and print exactly true or false.',
    expectedOutput: 'true',
  },

  // ── Go — multiple returns, defer, goroutines ──────────────────────────────
  {
    id: 'idiom-go-multi-return',
    language: 'go',
    concept: 'Multiple return values',
    title: "Go's (result, error) Pattern",
    difficulty: 'Easy',
    prompt: 'Write a function divide(a, b int) (int, error) following Go\'s standard (result, error) return pattern. Call divide(10, 2), ignore the error, and print the result.',
    expectedOutput: '5',
  },
  {
    id: 'idiom-go-defer',
    language: 'go',
    concept: 'defer',
    title: 'defer Runs Last',
    difficulty: 'Medium',
    prompt: 'In a single function, use defer to schedule printing "done" — call it immediately after printing "start" in the function body — and prove defer really runs at the end by seeing "done" printed after "start".',
    expectedOutput: 'start\ndone',
  },
  {
    id: 'idiom-go-goroutine-channel',
    language: 'go',
    concept: 'Goroutines + channels',
    title: 'Compute a Sum in a Goroutine',
    difficulty: 'Hard',
    prompt: 'Launch a goroutine that computes the sum of 1 through 100 and sends the result on a channel; in main, receive from the channel and print it.',
    expectedOutput: '5050',
  },

  // ── Rust — iterators, Option, borrowing ───────────────────────────────────
  {
    id: 'idiom-rust-iterator-sum',
    language: 'rust',
    concept: 'Iterator chains',
    title: 'Sum of Squares via Iterators',
    difficulty: 'Easy',
    prompt: 'Using an iterator chain — (1..=5).map(...).sum() — compute and print the sum of squares of 1 through 5.',
    expectedOutput: '55',
  },
  {
    id: 'idiom-rust-option-match',
    language: 'rust',
    concept: 'Option + match',
    title: 'A Function That Might Return Nothing',
    difficulty: 'Medium',
    prompt: 'Write a function returning Option<i32> — None when the input is 0, otherwise Some(100 / x). Call it with 0 and match on the result, printing "none" for the None case.',
    expectedOutput: 'none',
  },
  {
    id: 'idiom-rust-borrow',
    language: 'rust',
    concept: 'Borrowing (&)',
    title: "Sum a Vec Without Taking Ownership",
    difficulty: 'Hard',
    prompt: 'Write a function fn sum_vec(v: &Vec<i32>) -> i32 that takes a borrowed reference (not ownership) and returns the sum of its elements. Call it with vec![1,2,3,4,5], then — proving the vector is still valid because it was only borrowed — print its .len() on one line, followed by the sum on the next.',
    expectedOutput: '5\n15',
  },

  // ── Bash — parameter expansion, arrays ────────────────────────────────────
  {
    id: 'idiom-bash-param-length',
    language: 'shell',
    concept: 'Parameter expansion',
    title: 'String Length, No wc or expr',
    difficulty: 'Easy',
    prompt: 'Given var="chaduvuko", use bash parameter expansion (${#var}) — not wc or expr — to print its length.',
    expectedOutput: '9',
  },
  {
    id: 'idiom-bash-array-sum',
    language: 'shell',
    concept: 'Bash arrays',
    title: 'Sum a Bash Array',
    difficulty: 'Medium',
    prompt: 'Given arr=(10 20 30 40), a real bash array, loop over "${arr[@]}" to sum its elements and print the total.',
    expectedOutput: '100',
  },
  {
    id: 'idiom-bash-string-replace',
    language: 'shell',
    concept: 'Parameter expansion (substitution)',
    title: 'Replace Every Occurrence, No sed',
    difficulty: 'Hard',
    prompt: 'Given s="banana", use bash parameter expansion (${s//a/A}) — not sed or tr — to replace every "a" with "A" and print the result.',
    expectedOutput: 'bAnAnA',
  },

  // ── Ruby — blocks, enumerable ──────────────────────────────────────────────
  {
    id: 'idiom-ruby-map',
    language: 'ruby',
    concept: '.map with a block',
    title: 'Squares via .map',
    difficulty: 'Easy',
    prompt: 'Using (1..5).map with a block (not a for-loop), print the squares of 1 through 5, space-separated.',
    expectedOutput: '1 4 9 16 25',
  },
  {
    id: 'idiom-ruby-select',
    language: 'ruby',
    concept: '.select',
    title: 'Filter Evens via .select',
    difficulty: 'Medium',
    prompt: 'Using (1..10).select with a block, filter the even numbers and print them space-separated.',
    expectedOutput: '2 4 6 8 10',
  },
  {
    id: 'idiom-ruby-inject',
    language: 'ruby',
    concept: '.inject (reduce)',
    title: 'Sum 1 to 100 via .inject',
    difficulty: 'Hard',
    prompt: 'Using (1..100).inject(:+) — Ruby\'s reduce — compute and print the sum, with no explicit loop.',
    expectedOutput: '5050',
  },

  // ── PHP — array functions, match ──────────────────────────────────────────
  {
    id: 'idiom-php-array-map',
    language: 'php',
    concept: 'array_map',
    title: 'Double Every Number',
    difficulty: 'Easy',
    prompt: 'Using array_map (not a foreach loop), double every value in [1, 2, 3, 4, 5] and print the results space-separated.',
    expectedOutput: '2 4 6 8 10',
  },
  {
    id: 'idiom-php-null-coalescing',
    language: 'php',
    concept: 'Null coalescing (??)',
    title: 'A Safe Default',
    difficulty: 'Medium',
    prompt: "Given $data = ['name' => null];, use the null coalescing operator (??) to print $data['name'], defaulting to \"Guest\".",
    expectedOutput: 'Guest',
  },
  {
    id: 'idiom-php-match',
    language: 'php',
    concept: 'match expression (PHP 8)',
    title: 'Day Name via match',
    difficulty: 'Hard',
    prompt: 'Using a match expression (PHP 8+, not switch or if/else), map the number 3 to its weekday name assuming 1=Monday through 7=Sunday, and print the result.',
    expectedOutput: 'Wednesday',
  },

  // ── Swift — optionals, guard ───────────────────────────────────────────────
  {
    id: 'idiom-swift-map',
    language: 'swift',
    concept: '.map',
    title: 'Double Every Number',
    difficulty: 'Easy',
    prompt: 'Using [1,2,3,4,5].map (not a for-loop), double every value and print the results space-separated.',
    expectedOutput: '2 4 6 8 10',
  },
  {
    id: 'idiom-swift-nil-coalescing',
    language: 'swift',
    concept: 'Nil-coalescing (??)',
    title: 'A Safe Default',
    difficulty: 'Medium',
    prompt: 'Given var name: String? = nil, use the nil-coalescing operator (??) to print name, defaulting to "Guest".',
    expectedOutput: 'Guest',
  },
  {
    id: 'idiom-swift-guard',
    language: 'swift',
    concept: 'guard',
    title: 'Early Exit With guard',
    difficulty: 'Hard',
    prompt: 'Write a function that takes a Double, uses a guard statement to print "invalid" and return early if it is negative, and otherwise prints the square root as an Int. Call it with 16.',
    expectedOutput: '4',
  },

  // ── Kotlin — null safety, when, data classes ──────────────────────────────
  {
    id: 'idiom-kotlin-elvis',
    language: 'kotlin',
    concept: 'Elvis operator (?:)',
    title: 'A Safe Default',
    difficulty: 'Easy',
    prompt: 'Given var name: String? = null, use the Elvis operator (?:) to print name, defaulting to "Guest".',
    expectedOutput: 'Guest',
  },
  {
    id: 'idiom-kotlin-when',
    language: 'kotlin',
    concept: 'when expression',
    title: 'Day Name via when',
    difficulty: 'Medium',
    prompt: 'Using a when expression (not an if/else chain), map the number 3 to its weekday name assuming 1=Monday through 7=Sunday, and print the result.',
    expectedOutput: 'Wednesday',
  },
  {
    id: 'idiom-kotlin-data-class',
    language: 'kotlin',
    concept: 'Data classes + filter/map',
    title: 'Filter People by Age',
    difficulty: 'Hard',
    prompt: 'Define data class Person(val name: String, val age: Int), build a list in this exact order — Person("Alice", 30), Person("Bob", 22), Person("Cara", 28) — then use .filter and .map to print the names of everyone older than 25, space-separated.',
    expectedOutput: 'Alice Cara',
  },

  // ── C# — LINQ, null-conditional ────────────────────────────────────────────
  {
    id: 'idiom-csharp-linq-select',
    language: 'csharp',
    concept: 'LINQ .Select',
    title: 'Double Every Number',
    difficulty: 'Easy',
    prompt: 'Using LINQ\'s .Select (not a foreach loop), double every value in {1, 2, 3, 4, 5} and print the results space-separated.',
    expectedOutput: '2 4 6 8 10',
  },
  {
    id: 'idiom-csharp-null-coalescing',
    language: 'csharp',
    concept: 'Null-coalescing (??)',
    title: 'A Safe Default',
    difficulty: 'Medium',
    prompt: 'Given string? name = null;, use the null-coalescing operator (??) to print name, defaulting to "Guest".',
    expectedOutput: 'Guest',
  },
  {
    id: 'idiom-csharp-linq-where-sum',
    language: 'csharp',
    concept: 'LINQ .Where + .Sum',
    title: 'Sum the Evens via LINQ',
    difficulty: 'Hard',
    prompt: 'Using LINQ (.Where followed by .Sum, no explicit loop), sum the even numbers from 1 through 20 and print the total.',
    expectedOutput: '110',
  },
]
