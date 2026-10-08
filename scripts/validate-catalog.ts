// Checks lib/catalog against itself and, after `next build`, against the built routes.
// Usage: tsx scripts/validate-catalog.ts [--static-only]
import fs from 'node:fs'
import path from 'node:path'
import { LESSONS, LIVE_LESSONS, NON_LESSON_PREFIXES, NON_LESSON_ROUTES, TRACKS } from '@/lib/catalog'

const errors: string[] = []
const fail = (message: string) => errors.push(message)

function checkCatalog() {
  const trackSlugs = new Set(TRACKS.map(track => track.slug))
  const seenHrefs = new Set<string>()
  const seenOrders = new Set<string>()

  for (const lesson of LESSONS) {
    if (seenHrefs.has(lesson.href)) fail(`duplicate lesson URL: ${lesson.href}`)
    seenHrefs.add(lesson.href)

    const orderKey = `${lesson.track}#${lesson.order}`
    if (seenOrders.has(orderKey)) fail(`duplicate order ${lesson.order} in track "${lesson.track}" (${lesson.href})`)
    seenOrders.add(orderKey)

    if (!trackSlugs.has(lesson.track)) fail(`unknown track "${lesson.track}" for ${lesson.href}`)
    if (!lesson.href.startsWith('/learn/')) fail(`lesson URL outside /learn: ${lesson.href}`)
    if (lesson.status !== 'live' && lesson.status !== 'soon') fail(`invalid status "${lesson.status}" for ${lesson.href}`)
    if (!Number.isFinite(lesson.order)) fail(`non-numeric order for ${lesson.href}`)
    if (NON_LESSON_ROUTES[lesson.href]) fail(`${lesson.href} is both a lesson and a non-lesson route`)
  }

  for (const track of TRACKS) {
    if (!LIVE_LESSONS.some(lesson => lesson.track === track.slug)) fail(`track "${track.slug}" has no live lessons`)
  }
}

function readBuiltLearnRoutes(nextDir: string): Map<string, number> {
  const manifest = JSON.parse(fs.readFileSync(path.join(nextDir, 'prerender-manifest.json'), 'utf8'))
  const appPaths: string[] = Object.values(JSON.parse(fs.readFileSync(path.join(nextDir, 'app-path-routes-manifest.json'), 'utf8')))
  const routes = new Set<string>(Object.keys(manifest.routes).concat(appPaths.filter(p => !p.includes("["))))

  const statusByRoute = new Map<string, number>()
  for (const route of Array.from(routes)) {
    if (route !== '/learn' && !route.startsWith('/learn/')) continue
    const base = path.join(nextDir, 'server', 'app', route)
    if (!fs.existsSync(`${base}.html`)) continue
    const meta = fs.existsSync(`${base}.meta`) ? JSON.parse(fs.readFileSync(`${base}.meta`, 'utf8')) : {}
    statusByRoute.set(route, meta.status ?? 200)
  }
  return statusByRoute
}

function checkAgainstBuild(nextDir: string) {
  const built = readBuiltLearnRoutes(nextDir)
  const isLive = (route: string) => built.get(route) === 200
  const isNonLesson = (route: string) =>
    route in NON_LESSON_ROUTES || Object.keys(NON_LESSON_PREFIXES).some(prefix => route.startsWith(prefix))
  const lessonByHref = new Map(LESSONS.map(lesson => [lesson.href, lesson]))

  for (const lesson of LESSONS) {
    if (lesson.status === 'live' && !isLive(lesson.href)) {
      fail(`live lesson is not served (missing page or content loader, or renders 404): ${lesson.href}`)
    }
    if (lesson.status === 'soon' && isLive(lesson.href)) {
      fail(`unpublished lesson is publicly served: ${lesson.href}`)
    }
  }

  for (const route of Array.from(built.keys())) {
    if (!isLive(route) || isNonLesson(route)) continue
    const lesson = lessonByHref.get(route)
    if (!lesson) fail(`built /learn route is neither a catalog lesson nor a classified non-lesson route: ${route}`)
  }

  for (const route of Object.keys(NON_LESSON_ROUTES)) {
    if (!isLive(route)) fail(`classified non-lesson route is not served: ${route}`)
  }

  return built
}

checkCatalog()
const staticOnly = process.argv.includes('--static-only')
const nextDir = path.join(process.cwd(), '.next')
let builtCount = 0
if (!staticOnly) {
  if (!fs.existsSync(path.join(nextDir, 'prerender-manifest.json'))) {
    fail('no build found in .next — run `next build` first or pass --static-only')
  } else {
    builtCount = checkAgainstBuild(nextDir).size
  }
}

const soon = LESSONS.length - LIVE_LESSONS.length
console.log(`catalog: ${TRACKS.length} tracks, ${LIVE_LESSONS.length} live lessons, ${soon} soon${staticOnly ? '' : `; ${builtCount} built /learn routes checked`}`)
if (errors.length) {
  console.error(`\n${errors.length} catalog problem(s):\n${errors.map(e => `  - ${e}`).join('\n')}`)
  process.exit(1)
}
console.log('catalog OK')
