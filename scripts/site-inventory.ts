// Builds a page-by-page inventory of the site from lib/catalog plus the built HTML.
// Run after `next build`: npx tsx scripts/site-inventory.ts
// Writes docs/chaduvuko/SITE_INVENTORY.csv, site-inventory.json, and SITE_MAP.md.
import fs from 'node:fs'
import path from 'node:path'
import { LESSONS, NON_LESSON_PREFIXES, NON_LESSON_ROUTES, TRACKS } from '@/lib/catalog'
import { PLANNED_TRACKS } from '@/data/planned-tracks'
import { BLOG_ARTICLES } from '@/data/blog-articles'
import { ROLE_ROADMAPS } from '@/data/roadmaps/role-registry'
import { CAREER_ROLES } from '@/data/careers'
import sitemap from '@/app/sitemap'

const ROOT = process.cwd()
const BUILT = path.join(ROOT, '.next', 'server', 'app')
const DOCS = path.join(ROOT, 'docs', 'chaduvuko')

if (!fs.existsSync(BUILT)) {
  console.error('No build output found. Run `next build` first.')
  process.exit(1)
}

interface Row {
  url: string
  kind: string
  track: string
  trackTitle: string
  area: string
  section: string
  order: number | ''
  status: string
  inSitemap: boolean
  built: boolean
  words: number
  inboundLinks: number
  sourceFile: string
  updatedAt: string
}

function walkHtml(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walkHtml(full, out)
    else if (entry.name.endsWith('.html')) out.push(full)
  }
  return out
}

function routeFromHtml(file: string): string {
  const rel = path.relative(BUILT, file).replace(/\.html$/, '').split(path.sep).join('/')
  return rel === 'index' ? '/' : `/${rel}`
}

function mainContent(html: string): string {
  const start = html.indexOf('<main')
  const end = html.lastIndexOf('</main>')
  return start >= 0 && end > start ? html.slice(start, end) : html
}

function countWords(html: string): number {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
  return text.split(/\s+/).filter(word => /[a-z0-9]/i.test(word)).length
}

function internalLinks(html: string): string[] {
  const links: string[] = []
  for (const match of Array.from(html.matchAll(/href="(\/[^"#?]*)/g))) {
    const href = match[1].replace(/\/$/, '') || '/'
    if (!href.startsWith('/_next') && !/\.[a-z0-9]+$/i.test(href)) links.push(href)
  }
  return links
}

// Built pages, their word counts and outbound links (main content only, so header/footer links do not count).
const builtPages = new Map<string, { words: number; links: string[] }>()
for (const file of walkHtml(BUILT)) {
  const route = routeFromHtml(file)
  if (route.startsWith('/_not-found') || route.includes('[')) continue
  const metaFile = file.replace(/\.html$/, '.meta')
  const meta = fs.existsSync(metaFile) ? JSON.parse(fs.readFileSync(metaFile, 'utf8')) : {}
  if ((meta.status ?? 200) !== 200) continue
  const main = mainContent(fs.readFileSync(file, 'utf8'))
  builtPages.set(route, { words: countWords(main), links: internalLinks(main) })
}

const inbound = new Map<string, number>()
const deadLinks: { from: string; to: string }[] = []
const dynamicPrefixes = ['/api/', '/auth/', '/blog/', '/careers/', '/dashboard', '/admin', '/search', '/learn/track-plan/']
for (const [from, page] of Array.from(builtPages)) {
  for (const to of Array.from(new Set(page.links))) {
    if (to === from) continue
    inbound.set(to, (inbound.get(to) ?? 0) + 1)
    if (!builtPages.has(to) && !dynamicPrefixes.some(prefix => to.startsWith(prefix))) deadLinks.push({ from, to })
  }
}

const sitemapUrls = new Set(sitemap().map(entry => entry.url.replace('https://chaduvuko.com', '') || '/'))

function sourceFor(url: string): string {
  const segments = url.replace(/^\/learn\/?/, '').split('/').filter(Boolean)
  const candidates = [
    path.join('app', ...url.split('/').filter(Boolean), 'page.tsx'),
    path.join('app', ...url.split('/').filter(Boolean), 'page.mdx'),
    segments.length ? path.join('content', ...segments) + '.tsx' : '',
    segments.length ? path.join('content', ...segments) + '.mdx' : '',
    segments.length > 1 ? path.join('content', segments[0], ...segments.slice(1)) + '/index.tsx' : '',
  ].filter(Boolean)
  return candidates.find(candidate => fs.existsSync(path.join(ROOT, candidate))) ?? ''
}

const trackBySlug = new Map(TRACKS.map(track => [track.slug, track]))
const rows: Row[] = []
const seen = new Set<string>()

function add(row: Omit<Row, 'inSitemap' | 'built' | 'words' | 'inboundLinks' | 'sourceFile'> & { sourceFile?: string }) {
  if (seen.has(row.url)) return
  seen.add(row.url)
  const page = builtPages.get(row.url)
  rows.push({
    ...row,
    inSitemap: sitemapUrls.has(row.url),
    built: Boolean(page),
    words: page?.words ?? 0,
    inboundLinks: inbound.get(row.url) ?? 0,
    sourceFile: row.sourceFile ?? sourceFor(row.url),
  })
}

for (const lesson of LESSONS) {
  const track = trackBySlug.get(lesson.track)
  add({
    url: lesson.href,
    kind: 'lesson',
    track: lesson.track,
    trackTitle: track?.title ?? '',
    area: track?.area ?? '',
    section: lesson.section ?? '',
    order: lesson.order,
    status: track?.hidden && lesson.status === 'live' ? 'hidden' : lesson.status,
    updatedAt: lesson.updatedAt ?? '',
  })
}

for (const track of TRACKS) {
  add({
    url: track.indexHref,
    kind: track.status === 'coming-soon' ? 'planned-track' : 'track-index',
    track: track.slug,
    trackTitle: track.title,
    area: track.area,
    section: '',
    order: '',
    status: track.status === 'coming-soon' ? 'planned' : track.hidden ? 'hidden' : 'live',
    updatedAt: '',
  })
}

for (const [url, kind] of Object.entries(NON_LESSON_ROUTES)) {
  const trackSlug = url.split('/')[2] ?? ''
  const track = TRACKS.find(item => url.startsWith(item.indexHref.split('/').slice(0, 3).join('/') + '/') || item.slug === trackSlug)
  add({
    url,
    kind,
    track: track?.slug ?? '',
    trackTitle: track?.title ?? '',
    area: track?.area ?? '',
    section: '',
    order: '',
    status: kind === 'preview' ? 'preview' : track?.hidden ? 'hidden' : 'live',
    updatedAt: '',
  })
}

for (const slug of Object.keys(ROLE_ROADMAPS)) {
  add({ url: `/learn/roadmap/${slug}`, kind: 'roadmap', track: '', trackTitle: '', area: '', section: '', order: '', status: 'live', updatedAt: '' })
}
for (const slug of Object.keys(BLOG_ARTICLES)) {
  add({ url: `/blog/${slug}`, kind: 'blog', track: '', trackTitle: '', area: '', section: '', order: '', status: 'live', updatedAt: '', sourceFile: 'data/blog-articles.ts' })
}
for (const role of CAREER_ROLES) {
  add({ url: `/careers/${role.slug}`, kind: 'career', track: '', trackTitle: '', area: '', section: '', order: '', status: 'live', updatedAt: '', sourceFile: 'data/careers.ts' })
}
for (const url of ['/', '/about', '/blog', '/careers', '/privacy', '/terms', '/newsletter', '/playground', '/search', '/dashboard']) {
  add({ url, kind: 'site', track: '', trackTitle: '', area: '', section: '', order: '', status: 'live', updatedAt: '' })
}

// Built pages that no registry knows about.
const unregistered = Array.from(builtPages.keys())
  .filter(route => !seen.has(route) && !route.startsWith('/api') && route !== '/index')
  .filter(route => !Object.keys(NON_LESSON_PREFIXES).some(prefix => route.startsWith(prefix)))
  .sort()
for (const url of unregistered) {
  add({ url, kind: 'unregistered', track: '', trackTitle: '', area: '', section: '', order: '', status: 'unregistered', updatedAt: '' })
}

const order = (row: Row) => [row.kind === 'site' ? 0 : row.url.startsWith('/learn') ? 1 : 2, row.track, typeof row.order === 'number' ? row.order : -1]
rows.sort((a, b) => {
  const [ak, at, ao] = order(a)
  const [bk, bt, bo] = order(b)
  return (ak as number) - (bk as number) || String(at).localeCompare(String(bt)) || (ao as number) - (bo as number) || a.url.localeCompare(b.url)
})

const columns: (keyof Row)[] = ['url', 'kind', 'track', 'trackTitle', 'area', 'section', 'order', 'status', 'inSitemap', 'built', 'words', 'inboundLinks', 'sourceFile', 'updatedAt']
const csvCell = (value: unknown) => {
  const text = String(value ?? '')
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}
fs.writeFileSync(
  path.join(DOCS, 'SITE_INVENTORY.csv'),
  [columns.join(','), ...rows.map(row => columns.map(column => csvCell(row[column])).join(','))].join('\n') + '\n',
)

const summary = {
  generatedAt: new Date().toISOString().slice(0, 10),
  totals: {
    rows: rows.length,
    liveLessons: rows.filter(row => row.kind === 'lesson' && row.status === 'live').length,
    hiddenLessons: rows.filter(row => row.kind === 'lesson' && row.status === 'hidden').length,
    unpublishedLessons: rows.filter(row => row.kind === 'lesson' && row.status === 'soon').length,
    liveTracks: TRACKS.filter(track => !track.status && !track.hidden).length,
    hiddenTracks: TRACKS.filter(track => track.hidden).length,
    plannedTracks: PLANNED_TRACKS.length,
    roadmaps: Object.keys(ROLE_ROADMAPS).length,
    blogArticles: Object.keys(BLOG_ARTICLES).length,
    careerRoles: CAREER_ROLES.length,
  },
  issues: {
    liveLessonsNotBuilt: rows.filter(row => row.kind === 'lesson' && row.status === 'live' && !row.built).map(row => row.url),
    thinLiveLessons: rows.filter(row => row.kind === 'lesson' && row.status === 'live' && row.built && row.words < 400).map(row => `${row.url} (${row.words} words)`),
    orphanLiveLessons: rows.filter(row => row.kind === 'lesson' && row.status === 'live' && row.inboundLinks === 0).map(row => row.url),
    unregisteredBuiltPages: unregistered,
    deadInternalLinks: deadLinks,
  },
}
fs.writeFileSync(path.join(DOCS, 'site-inventory.json'), JSON.stringify({ summary, rows }, null, 2) + '\n')

console.log(JSON.stringify(summary.totals, null, 2))
for (const [name, list] of Object.entries(summary.issues)) console.log(`${name}: ${list.length}`)

// ── SITE_MAP.md ──────────────────────────────────────────────────────────────
const AREA_LABELS: Record<string, string> = {
  data: 'Data', cloud: 'Cloud', ai: 'AI & ML', programming: 'Programming', cs: 'CS Core', security: 'Security', practice: 'Practice',
}
const AREA_ORDER = ['data', 'cloud', 'ai', 'programming', 'cs', 'security', 'practice']
const liveRows = rows.filter(row => row.kind === 'lesson' && row.status === 'live')
const publishedTracks = TRACKS.filter(track => !track.status && !track.hidden)
const nodeId = (text: string) => text.replace(/[^a-zA-Z0-9]/g, '_')
const mermaidText = (text: string) => text.replace(/"/g, "'").replace(/&/g, 'and')

function modulesOf(slug: string): { section: string; lessons: number; words: number }[] {
  const out: { section: string; lessons: number; words: number }[] = []
  for (const row of liveRows.filter(item => item.track === slug)) {
    const section = row.section || 'Overview'
    const last = out.at(-1)
    if (last && last.section === section) { last.lessons += 1; last.words += row.words }
    else out.push({ section, lessons: 1, words: row.words })
  }
  return out
}

const md: string[] = []
md.push('# Chaduvuko site map')
md.push('')
md.push(`> Generated by \`scripts/site-inventory.ts\` on ${summary.generatedAt}. Do not edit by hand: run \`npm run build\` (or \`npx next build\`), then \`npx tsx scripts/site-inventory.ts\`.`)
md.push('> The public version of this map is [/learn/all-courses](https://chaduvuko.com/learn/all-courses). Page-level data is in [SITE_INVENTORY.csv](./SITE_INVENTORY.csv).')
md.push('')
md.push('## How the site is organised')
md.push('')
md.push('**Area → Track → Module → Lesson.** An *area* groups related tracks (Data, Cloud, AI & ML, ...). A *track* is a guided course with its own overview page. A *module* is a section inside a track, and a *lesson* is one page with one learning objective.')
md.push('')
md.push('| What | Count | Where it comes from |')
md.push('|---|---:|---|')
md.push(`| Published tracks | ${publishedTracks.filter(track => track.area !== 'practice').length} (+ Projects) | \`lib/catalog/tracks.ts\` |`)
md.push(`| Published lessons | ${summary.totals.liveLessons} | \`lib/catalog\` (\`LIVE_LESSONS\`) |`)
md.push(`| Hidden tracks / lessons | ${summary.totals.hiddenTracks} / ${summary.totals.hiddenLessons} | \`hidden\` flag in \`lib/catalog/tracks.ts\` |`)
md.push(`| Unpublished (\`soon\`) lessons | ${summary.totals.unpublishedLessons} | \`data/*-curriculum.ts\` |`)
md.push(`| Planned tracks (skills maps) | ${summary.totals.plannedTracks} | \`data/planned-tracks.ts\` |`)
md.push(`| Career roadmaps | ${summary.totals.roadmaps} | \`data/roadmaps/role-registry.ts\` |`)
md.push(`| Blog articles | ${summary.totals.blogArticles} | \`data/blog-articles.ts\` |`)
md.push(`| Open careers roles | ${summary.totals.careerRoles} | \`data/careers.ts\` |`)
md.push('')
md.push('## Map')
md.push('')
md.push('```mermaid')
md.push('flowchart LR')
md.push('  root(["Chaduvuko"])')
for (const area of AREA_ORDER) {
  const tracks = publishedTracks.filter(track => track.area === area)
  const planned = PLANNED_TRACKS.filter(track => track.area === area)
  if (!tracks.length && !planned.length) continue
  const areaId = `area_${area}`
  md.push(`  root --> ${areaId}["${mermaidText(AREA_LABELS[area])}"]`)
  for (const track of tracks) {
    const lessons = liveRows.filter(row => row.track === track.slug).length
    md.push(`  ${areaId} --> t_${nodeId(track.slug)}["${mermaidText(track.title)}<br/>${lessons} lessons"]`)
  }
  if (planned.length) md.push(`  ${areaId} -.-> p_${area}["${planned.length} planned tracks"]:::planned`)
}
md.push('  root --> practice["Practice and tools<br/>roadmaps, playgrounds, interview prep, blog"]')
for (const track of TRACKS.filter(item => item.hidden)) {
  md.push(`  root -.-> h_${nodeId(track.slug)}["${mermaidText(track.title)} (hidden)"]:::hidden`)
}
md.push('  classDef planned fill:#f3e8ff,stroke:#a855f7,color:#3b0764')
md.push('  classDef hidden fill:#f1f5f9,stroke:#94a3b8,color:#475569,stroke-dasharray: 4 3')
md.push('```')
md.push('')
md.push('## Published tracks')
md.push('')
md.push('| Area | Track | Overview | Modules | Lessons | Avg words / lesson |')
md.push('|---|---|---|---:|---:|---:|')
for (const area of AREA_ORDER) {
  for (const track of publishedTracks.filter(item => item.area === area)) {
    const lessons = liveRows.filter(row => row.track === track.slug)
    const avg = lessons.length ? Math.round(lessons.reduce((sum, row) => sum + row.words, 0) / lessons.length) : 0
    md.push(`| ${AREA_LABELS[area]} | ${track.title} | \`${track.indexHref}\` | ${modulesOf(track.slug).length} | ${lessons.length} | ${avg.toLocaleString('en-US')} |`)
  }
}
md.push('')
md.push('### Modules in each track')
md.push('')
for (const area of AREA_ORDER) {
  for (const track of publishedTracks.filter(item => item.area === area)) {
    const modules = modulesOf(track.slug)
    if (!modules.length) continue
    md.push(`<details><summary><strong>${track.title}</strong> — ${modules.length} modules</summary>`)
    md.push('')
    for (const module of modules) md.push(`- ${module.section} — ${module.lessons} lesson${module.lessons === 1 ? '' : 's'}`)
    md.push('')
    md.push('</details>')
    md.push('')
  }
}
md.push('## Hidden content')
md.push('')
md.push('Hidden tracks stay reachable by direct link but are `noindex`, and are left out of navigation, search, the sitemap, counts, and progress. To restore one, delete its `hidden` field in `lib/catalog/tracks.ts`.')
md.push('')
md.push('| Track | Overview | Published lessons | Since | Reason |')
md.push('|---|---|---:|---|---|')
for (const track of TRACKS.filter(item => item.hidden)) {
  const count = rows.filter(row => row.kind === 'lesson' && row.track === track.slug && row.status === 'hidden').length
  md.push(`| ${track.title} | \`${track.indexHref}\` | ${count} | ${track.hidden!.since} | ${track.hidden!.reason} |`)
}
md.push('')
md.push('## Planned tracks')
md.push('')
md.push('Skills maps only; no lessons are published yet. Each page collects learner interest.')
md.push('')
md.push('| Area | Track | Page | Skills mapped |')
md.push('|---|---|---|---:|')
for (const area of AREA_ORDER) {
  for (const track of PLANNED_TRACKS.filter(item => item.area === area)) {
    md.push(`| ${AREA_LABELS[area]} | ${track.title} | \`${track.href}\` | ${track.stages.reduce((sum, stage) => sum + stage.skills.length, 0)} |`)
  }
}
md.push('')
md.push('## Health checks')
md.push('')
md.push('| Check | Result |')
md.push('|---|---|')
for (const [name, list] of Object.entries(summary.issues)) {
  const label = name.replace(/([A-Z])/g, ' $1').toLowerCase()
  const detail = list.length ? list.slice(0, 8).map(item => `\`${item}\``).join(', ') + (list.length > 8 ? `, and ${list.length - 8} more` : '') : 'none'
  md.push(`| ${label} | ${list.length} — ${detail} |`)
}
md.push('')
md.push('Thin = fewer than 400 words in the main content area. Unregistered built pages such as `/admin` and `/auth/callback` are expected.')
md.push('')
fs.writeFileSync(path.join(DOCS, 'SITE_MAP.md'), md.join('\n'))
console.log('wrote docs/chaduvuko/SITE_MAP.md')
