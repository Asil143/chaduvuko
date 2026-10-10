/**
 * The "Quick answer" at the top of a lesson and the one-question quick check at its end.
 * Entries live in data/lesson-quick/<track>.ts, keyed by lesson URL; a lesson without an
 * entry shows neither. scripts/quick-results.ts checks every entry and runs each SQL, Python and
 * C example, so the result shown on the page is the one the code really produces.
 */

export interface QuickCheck {
  question: string
  options: string[]
  /** Index into options. */
  answer: number
  explanation: string
}

export type QuickLang = 'sql' | 'python' | 'c' | 'html' | 'css' | 'bash' | 'yaml' | 'toml' | 'json' | 'javascript' | 'text'

/** Languages whose examples are run to produce the result shown under them. */
export const RUNNABLE: QuickLang[] = ['sql', 'python', 'c']

export interface QuickExample {
  /** One line naming what the example shows. */
  label: string
  lang: QuickLang
  code: string
  /**
   * Show the code without running it, for examples that need a network, a server, or a terminal.
   * Runnable examples otherwise get their real result from data/lesson-quick/results.json.
   */
  static?: boolean
}

export interface LessonQuick {
  /** The direct answer: one or two sentences. */
  answer: string
  /** Three things to remember. */
  points: string[]
  example?: QuickExample
  check: QuickCheck
}

/** What running an example produced: a table for SQL, printed text for Python and C. */
export type QuickResult =
  | { kind: 'table'; columns: string[]; rows: string[][] }
  | { kind: 'text'; text: string }

/** What a lesson page receives: the entry plus the computed SQL result, when there is one. */
export interface LessonQuickView extends Omit<LessonQuick, 'check'> {
  result?: QuickResult
  /** Omitted when the lesson already has a full quiz. */
  check?: QuickCheck
}
