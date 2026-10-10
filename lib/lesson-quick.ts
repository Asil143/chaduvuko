/**
 * The "Quick answer" at the top of a lesson and the one-question quick check at its end.
 * Entries live in data/lesson-quick/<track>.ts, keyed by lesson URL; a lesson without an
 * entry shows neither. scripts/validate-quick.ts checks every entry, and runs each SQL example
 * on FreshCart so the result shown on the page is the one the query really returns.
 */

export interface QuickCheck {
  question: string
  options: string[]
  /** Index into options. */
  answer: number
  explanation: string
}

export type QuickLang = 'sql' | 'python' | 'c' | 'html' | 'css' | 'bash' | 'yaml' | 'json' | 'javascript' | 'text'

export interface QuickExample {
  /** One line naming what the example shows. */
  label: string
  lang: QuickLang
  code: string
  /**
   * What running the code prints, for languages the playground cannot run. Only set when it
   * was produced by running the code. SQL results are computed instead (data/lesson-quick/sql-results.json).
   */
  output?: string
}

export interface LessonQuick {
  /** The direct answer: one or two sentences. */
  answer: string
  /** Three things to remember. */
  points: string[]
  example?: QuickExample
  check: QuickCheck
}

export interface QuickResult {
  columns: string[]
  rows: string[][]
}

/** What a lesson page receives: the entry plus the computed SQL result, when there is one. */
export interface LessonQuickView extends Omit<LessonQuick, 'check'> {
  result?: QuickResult
  /** Omitted when the lesson already has a full quiz. */
  check?: QuickCheck
}
