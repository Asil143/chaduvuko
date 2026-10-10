import { LESSON_QUICK } from '@/data/lesson-quick'
import SQL_RESULTS from '@/data/lesson-quick/sql-results.json'
import { QUIZZES } from '@/data/quizzes'
import type { LessonQuickView, QuickCheck, QuickResult } from '@/lib/lesson-quick'

const results: Record<string, QuickResult> = SQL_RESULTS

/**
 * Rotates the options so the correct answer sits at a position picked by a hash of the lesson URL.
 * Entries tend to be written with it second; this spreads it evenly and stays stable across renders.
 */
function spreadOptions(href: string, check: QuickCheck): QuickCheck {
  let hash = 0
  for (const char of href) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  const n = check.options.length
  const target = hash % n
  const shift = (check.answer - target + n) % n
  return {
    ...check,
    options: check.options.map((_, i) => check.options[(i + shift) % n]),
    answer: target,
  }
}

/** Server-only: the quick answer and check for one lesson, so the rest stay out of the client bundle. */
export function getLessonQuick(href: string): LessonQuickView | null {
  const entry = LESSON_QUICK[href]
  if (!entry) return null
  const { check, ...rest } = entry
  return {
    ...rest,
    ...(results[href] ? { result: results[href] } : {}),
    ...(QUIZZES[href]?.length ? {} : { check: spreadOptions(href, check) }),
  }
}
