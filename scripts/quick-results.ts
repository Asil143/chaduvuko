/**
 * Checks every quick answer (data/lesson-quick) and runs each SQL example on FreshCart, exactly as
 * the lesson playground would, writing the results to data/lesson-quick/sql-results.json, which
 * the lesson page shows as "Result". With --check, fails if that file is out of date instead.
 *
 *   npx tsx scripts/quick-results.ts [--check]
 */
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { LESSON_QUICK } from '@/data/lesson-quick'
import { getLiveLesson } from '@/lib/catalog'
import type { LessonQuick } from '@/lib/lesson-quick'
import { runFreshCart, type FreshCartResult } from './lib/freshcart'

const OUT = 'data/lesson-quick/sql-results.json'
const MAX_ROWS = 8
const MAX_COLUMNS = 6

function checkEntry(href: string, quick: LessonQuick, problems: string[]) {
  const fail = (message: string) => problems.push(`${href}: ${message}`)
  if (!getLiveLesson(href)) fail('not a live lesson')
  if (!quick.answer.trim() || quick.answer.length > 400) fail('answer must be 1–400 characters')
  if (quick.points.length !== 3) fail(`needs exactly 3 points, has ${quick.points.length}`)
  const { question, options, answer, explanation } = quick.check
  if (!question.trim() || !explanation.trim()) fail('check needs a question and an explanation')
  if (options.length < 3 || options.length > 4) fail('check needs 3 or 4 options')
  if (new Set(options).size !== options.length) fail('check options repeat')
  if (!Number.isInteger(answer) || answer < 0 || answer >= options.length) fail(`check answer ${answer} is not an option index`)
  if (quick.example && quick.example.lang === 'sql' && quick.example.output) fail('SQL examples get computed results; remove output')
}

async function main() {
  const results: Record<string, FreshCartResult> = {}
  const problems: string[] = []
  for (const [href, quick] of Object.entries(LESSON_QUICK)) checkEntry(href, quick, problems)
  for (const href of Object.keys(LESSON_QUICK).sort()) {
    const example = LESSON_QUICK[href].example
    if (example?.lang !== 'sql') continue
    try {
      const result = await runFreshCart(example.code)
      if (!result.columns.length) problems.push(`${href}: the example returns no result set`)
      if (result.rows.length > MAX_ROWS) problems.push(`${href}: ${result.rows.length} rows; keep quick examples to ${MAX_ROWS}`)
      if (result.columns.length > MAX_COLUMNS) problems.push(`${href}: ${result.columns.length} columns; keep quick examples to ${MAX_COLUMNS}`)
      results[href] = result
    } catch (error) {
      problems.push(`${href}: ${(error as Error).message}`)
    }
  }
  if (problems.length) {
    console.error(`quick results: ${problems.length} problem(s):\n${problems.map(p => `  - ${p}`).join('\n')}`)
    process.exit(1)
  }
  const json = JSON.stringify(results, null, 1) + '\n'
  if (process.argv.includes('--check')) {
    if (!existsSync(OUT) || readFileSync(OUT, 'utf8') !== json) {
      console.error(`quick results: ${OUT} is out of date. Run: npx tsx scripts/quick-results.ts`)
      process.exit(1)
    }
    console.log(`quick results OK (${Object.keys(results).length} SQL examples)`)
  } else {
    writeFileSync(OUT, json)
    console.log(`quick results: ${Object.keys(results).length} SQL examples written to ${OUT}`)
  }
}

main()
