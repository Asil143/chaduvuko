// Language-agnostic coding challenges for /playground. Each challenge is
// solvable in any of the playground's 14 general-purpose languages — the
// problem only specifies the expected stdout, not an implementation.
// SQL has its own separate, query-based challenge set — see
// sqlPlaygroundChallenges.ts — since "print stdout" doesn't map onto SQL
// and these algorithmic problems (FizzBuzz, binary search, ...) aren't
// natural query exercises either.

export type ChallengeDifficulty = 'Easy' | 'Medium' | 'Hard'

export interface PlaygroundChallenge {
  id: string
  title: string
  difficulty: ChallengeDifficulty
  prompt: string
  expectedOutput: string
}

export const PLAYGROUND_CHALLENGES: PlaygroundChallenge[] = [
  {
    id: 'hello-world',
    title: 'Hello, World!',
    difficulty: 'Easy',
    prompt: 'Print exactly: Hello, World!',
    expectedOutput: 'Hello, World!',
  },
  {
    id: 'sum-1-to-10',
    title: 'Sum 1 to 10',
    difficulty: 'Easy',
    prompt: 'Print the sum of all integers from 1 to 10 (inclusive).',
    expectedOutput: '55',
  },
  {
    id: 'even-odd',
    title: 'Even or Odd',
    difficulty: 'Easy',
    prompt: 'Print "Even" if 42 is even, otherwise print "Odd".',
    expectedOutput: 'Even',
  },
  {
    id: 'reverse-string',
    title: 'Reverse a String',
    difficulty: 'Easy',
    prompt: 'Print the string "chaduvuko" reversed.',
    expectedOutput: 'okuvudahc',
  },
  {
    id: 'count-vowels',
    title: 'Count the Vowels',
    difficulty: 'Easy',
    prompt: 'Print the number of vowels (a, e, i, o, u — lowercase) in the string "data engineering".',
    expectedOutput: '6',
  },
  {
    id: 'fizzbuzz',
    title: 'FizzBuzz',
    difficulty: 'Easy',
    prompt: 'For numbers 1 to 15, print "Fizz" if divisible by 3, "Buzz" if divisible by 5, "FizzBuzz" if divisible by both, otherwise the number itself — one per line.',
    expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
  },
  {
    id: 'max-of-three',
    title: 'Largest of Three',
    difficulty: 'Easy',
    prompt: 'Print the largest of the three numbers 17, 42, and 8.',
    expectedOutput: '42',
  },
  {
    id: 'palindrome',
    title: 'Palindrome Check',
    difficulty: 'Medium',
    prompt: 'Print "true" if the string "racecar" is a palindrome, otherwise print "false".',
    expectedOutput: 'true',
  },
  {
    id: 'factorial',
    title: 'Factorial',
    difficulty: 'Medium',
    prompt: 'Print the factorial of 6 (6! = 6 × 5 × 4 × 3 × 2 × 1).',
    expectedOutput: '720',
  },
  {
    id: 'fibonacci-10',
    title: 'First 10 Fibonacci Numbers',
    difficulty: 'Medium',
    prompt: 'Print the first 10 Fibonacci numbers (starting 0, 1), space-separated on one line.',
    expectedOutput: '0 1 1 2 3 5 8 13 21 34',
  },
  {
    id: 'prime-check',
    title: 'Is It Prime?',
    difficulty: 'Medium',
    prompt: 'Print "true" if 97 is a prime number, otherwise print "false".',
    expectedOutput: 'true',
  },
  {
    id: 'sum-of-array',
    title: 'Sum of an Array',
    difficulty: 'Medium',
    prompt: 'Given the numbers [4, 8, 15, 16, 23, 42], print their sum.',
    expectedOutput: '108',
  },
  {
    id: 'anagram-check',
    title: 'Anagram Check',
    difficulty: 'Medium',
    prompt: 'Print "true" if "listen" and "silent" are anagrams of each other, otherwise print "false".',
    expectedOutput: 'true',
  },
  {
    id: 'gcd',
    title: 'Greatest Common Divisor',
    difficulty: 'Medium',
    prompt: 'Print the greatest common divisor (GCD) of 48 and 18.',
    expectedOutput: '6',
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    difficulty: 'Hard',
    prompt: 'Given the sorted array [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91], print the index (0-based) of the value 23 using binary search.',
    expectedOutput: '5',
  },
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Hard',
    prompt: 'Given the array [2, 7, 11, 15] and target 9, print the two 0-based indices of the numbers that add up to the target, space-separated (lower index first).',
    expectedOutput: '0 1',
  },
]
