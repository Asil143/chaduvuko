/**
 * Audits authored lesson components against Chaduvuko's lesson standard.
 * This is intentionally a signal report, not a linter: some project lessons
 * use different headings while still containing the same learning elements.
 *
 * Usage: npx tsx scripts/audit-lesson-content.ts
 */
import fs from 'node:fs'
import path from 'node:path'
import { LESSONS, LIVE_LESSONS } from '@/lib/catalog'
import { LESSON_QUICK } from '@/data/lesson-quick'
import { LESSON_PRACTICE } from '@/data/lesson-practice'

const root = path.join(process.cwd(), 'content')
const files = fs.readdirSync(root, { recursive: true })
  .filter((file): file is string => typeof file === 'string' && file.endsWith('.tsx'))

const source = files.map(file => ({ file, text: fs.readFileSync(path.join(root, file), 'utf8') }))
const authoredLessons = source.filter(({ text }) => text.includes('<LearnLayout'))

const signals = {
  prerequisites: /prerequisite/i,
  objective: /learning objective|objective/i,
  practice: /practice|exercise|try it|hands[- ]on/i,
  assessment: /quick check|quiz|assessment|question=/i,
  takeaways: /key takeaways|summary|recap/i,
  resources: /resources?|documentation|read next/i,
}

const counts = Object.fromEntries(Object.entries(signals).map(([name, pattern]) => [
  name,
  authoredLessons.filter(({ text }) => pattern.test(text)).length,
]))

const missing = authoredLessons.map(({ file, text }) => ({
  file,
  missing: Object.entries(signals).filter(([, pattern]) => !pattern.test(text)).map(([name]) => name),
})).filter(item => item.missing.length > 0)

const liveWithNoSource = LIVE_LESSONS.filter(lesson => {
  const slug = lesson.href.split('/').pop() ?? ''
  return !source.some(({ file }) => path.basename(file, '.tsx') === slug)
}).map(lesson => lesson.href)

console.log(JSON.stringify({
  generatedAt: new Date().toISOString(),
  catalog: { total: LESSONS.length, live: LIVE_LESSONS.length, soon: LESSONS.length - LIVE_LESSONS.length },
  interactiveCoverage: {
    quickChecks: LIVE_LESSONS.filter(lesson => Boolean(LESSON_QUICK[lesson.href])).length,
    dedicatedPracticeChallenges: LIVE_LESSONS.filter(lesson => Boolean(LESSON_PRACTICE[lesson.href])).length,
  },
  authoredLessonComponents: authoredLessons.length,
  coverage: counts,
  gaps: missing,
  liveWithNoMatchingContentFilename: liveWithNoSource,
}, null, 2))
