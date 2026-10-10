/**
 * Checks every quick answer (data/lesson-quick) and runs every runnable example: SQL on FreshCart
 * exactly as the lesson playground does, Python with python3, C with cc. The results go to
 * data/lesson-quick/results.json, which the lesson page shows under the example. With --check,
 * fails if that file is out of date instead of writing it.
 *
 *   npx tsx scripts/quick-results.ts [--check]
 *
 * Python and C are skipped (with a note) when python3 or cc is not installed, as on some hosted
 * builders; SQL needs only sql.js and always runs.
 */
import { execFileSync, spawnSync } from 'child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { LESSON_QUICK } from '@/data/lesson-quick'
import { getLiveLesson } from '@/lib/catalog'
import type { LessonQuick, QuickResult } from '@/lib/lesson-quick'
import { runFreshCart } from './lib/freshcart'

const OUT = 'data/lesson-quick/results.json'
const MAX_ROWS = 8
const MAX_COLUMNS = 6
const MAX_OUTPUT_LINES = 12

const has = (command: string) => spawnSync(command, ['--version'], { stdio: 'ignore' }).status === 0

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
}

/** Runs a program in a fresh temporary directory and returns what it printed. */
function runProgram(lang: 'python' | 'c', code: string): string {
  const dir = mkdtempSync(join(tmpdir(), 'quick-'))
  try {
    if (lang === 'python') {
      writeFileSync(join(dir, 'example.py'), code)
      return execFileSync('python3', ['example.py'], { cwd: dir, encoding: 'utf8', timeout: 20000, env: { ...process.env, PYTHONHASHSEED: '0', PYTHONIOENCODING: 'utf-8' } })
    }
    writeFileSync(join(dir, 'example.c'), code)
    execFileSync('cc', ['-std=c11', '-Wall', '-Werror', '-o', 'example', 'example.c', '-lm'], { cwd: dir, stdio: 'pipe' })
    return execFileSync('./example', [], { cwd: dir, encoding: 'utf8', timeout: 20000 })
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

async function main() {
  const canRun = { python: has('python3'), c: has('cc') }
  const previous: Record<string, QuickResult> = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {}
  const results: Record<string, QuickResult> = {}
  const problems: string[] = []
  const skipped: string[] = []

  for (const href of Object.keys(LESSON_QUICK).sort()) {
    const quick = LESSON_QUICK[href]
    checkEntry(href, quick, problems)
    const example = quick.example
    if (!example || example.static) continue
    try {
      if (example.lang === 'sql') {
        const { columns, rows } = await runFreshCart(example.code)
        if (!columns.length) problems.push(`${href}: the example returns no result set`)
        if (rows.length > MAX_ROWS) problems.push(`${href}: ${rows.length} rows; keep quick examples to ${MAX_ROWS}`)
        if (columns.length > MAX_COLUMNS) problems.push(`${href}: ${columns.length} columns; keep quick examples to ${MAX_COLUMNS}`)
        results[href] = { kind: 'table', columns, rows }
      } else if (example.lang === 'python' || example.lang === 'c') {
        if (!canRun[example.lang]) {
          // Keep the committed result so a builder without the toolchain does not report drift.
          if (previous[href]) results[href] = previous[href]
          skipped.push(href)
          continue
        }
        const text = runProgram(example.lang, example.code).replace(/\s+$/, '')
        if (!text) problems.push(`${href}: the example prints nothing`)
        if (text.split('\n').length > MAX_OUTPUT_LINES) problems.push(`${href}: output is over ${MAX_OUTPUT_LINES} lines`)
        results[href] = { kind: 'text', text }
      }
    } catch (error) {
      const e = error as Error & { stderr?: Buffer | string }
      problems.push(`${href}: ${(e.stderr?.toString() || e.message).trim().split('\n').slice(-3).join(' / ')}`)
    }
  }

  if (skipped.length) console.log(`quick results: ${skipped.length} Python/C example(s) not run here (no python3 or cc)`)
  if (problems.length) {
    console.error(`quick results: ${problems.length} problem(s):\n${problems.map(p => `  - ${p}`).join('\n')}`)
    process.exit(1)
  }
  const json = JSON.stringify(results, null, 1) + '\n'
  const count = Object.keys(results).length
  if (process.argv.includes('--check')) {
    if (readFileSync(OUT, 'utf8') !== json) {
      console.error(`quick results: ${OUT} is out of date. Run: npx tsx scripts/quick-results.ts`)
      process.exit(1)
    }
    console.log(`quick results OK (${Object.keys(LESSON_QUICK).length} lessons, ${count} examples run)`)
  } else {
    writeFileSync(OUT, json)
    console.log(`quick results: ${count} example results written to ${OUT}`)
  }
}

main()
