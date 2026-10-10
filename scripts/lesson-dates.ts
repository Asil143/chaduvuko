/**
 * Writes data/lesson-updated.json: the date each live lesson's own source file last changed
 * in git. Commits listed in scripts/lesson-dates-ignore.txt (wording sweeps across hundreds
 * of lessons) do not count as an update.
 *
 *   npx tsx scripts/lesson-dates.ts          rewrite the file
 *   npx tsx scripts/lesson-dates.ts --check  fail if the file is out of date (skipped on a
 *                                            shallow clone, where git history is incomplete)
 *
 * The dates are committed rather than computed at build time because hosted builds clone
 * shallowly, and a shallow clone reports the wrong date for files untouched in recent commits.
 */
import { execFileSync } from 'child_process'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { LIVE_LESSONS } from '@/lib/catalog'

const OUT = 'data/lesson-updated.json'
const IGNORE = 'scripts/lesson-dates-ignore.txt'

const git = (...args: string[]) => execFileSync('git', args, { encoding: 'utf8' }).trim()

/** The files that hold a lesson's content: its content module and/or its route page. */
export function lessonSources(href: string): string[] {
  const rel = href.replace(/^\/learn\//, '')
  return [`content/${rel}.tsx`, `app${href}/page.tsx`].filter(file => existsSync(file))
}

function ignoredCommits(): Set<string> {
  return new Set(
    readFileSync(IGNORE, 'utf8').split('\n').map(line => line.replace(/#.*/, '').trim()).filter(Boolean),
  )
}

function lastChanged(files: string[], ignore: Set<string>): string | undefined {
  // An edit not yet committed is today's change; committing it the same day keeps the date.
  if (git('status', '--porcelain', '--', ...files)) return new Date().toLocaleDateString('en-CA')
  // Per file with --follow, so a lesson moved or split into a new file keeps its history.
  const dates = files.map(file => {
    const log = git('log', '--follow', '--format=%H %as', '--', file)
    for (const line of log.split('\n')) {
      const [hash, date] = line.split(' ')
      if (hash && !ignore.has(hash)) return date
    }
    return ''
  })
  return dates.sort().at(-1) || undefined
}

function build(): Record<string, string> {
  const ignore = ignoredCommits()
  const dates: Record<string, string> = {}
  for (const lesson of [...LIVE_LESSONS].sort((a, b) => a.href.localeCompare(b.href))) {
    const files = lessonSources(lesson.href)
    if (!files.length) throw new Error(`No source file for ${lesson.href}`)
    const date = lastChanged(files, ignore)
    if (date) dates[lesson.href] = date
  }
  return dates
}

const json = (dates: Record<string, string>) => JSON.stringify(dates, null, 2) + '\n'

if (require.main === module && process.argv.includes('--check')) {
  if (git('rev-parse', '--is-shallow-repository') === 'true') {
    console.log('lesson dates: shallow clone, check skipped')
  } else if (!existsSync(OUT) || readFileSync(OUT, 'utf8') !== json(build())) {
    console.error(`lesson dates: ${OUT} is out of date. Run: npx tsx scripts/lesson-dates.ts`)
    process.exit(1)
  } else {
    console.log('lesson dates OK')
  }
} else if (require.main === module) {
  const dates = build()
  writeFileSync(OUT, json(dates))
  console.log(`lesson dates: ${Object.keys(dates).length} lessons written to ${OUT}`)
}
