// After `next build`, checks every prerendered page's canonical link and robots
// meta, and that every sitemap URL is an indexable, self-canonical page.
// Usage: tsx scripts/validate-seo.ts
import fs from 'node:fs'
import path from 'node:path'

const SITE = 'https://chaduvuko.com'
const appDir = path.join(process.cwd(), '.next', 'server', 'app')

const errors: string[] = []
const fail = (message: string) => errors.push(message)

const decode = (s: string) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'")
const urlFor = (route: string) => (route === '/' ? SITE : `${SITE}${route}`)

interface Page { canonicals: string[]; noindex: boolean; status: number }

function htmlFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return htmlFiles(full)
    return entry.name.endsWith('.html') ? [full] : []
  })
}

function readPages(): Map<string, Page> {
  const pages = new Map<string, Page>()
  for (const file of htmlFiles(appDir)) {
    const rel = path.relative(appDir, file).replace(/\.html$/, '').split(path.sep).join('/')
    const route = rel === 'index' ? '/' : `/${rel}`
    const html = fs.readFileSync(file, 'utf8')
    const head = html.slice(0, html.indexOf('</head>') + 1 || undefined)
    const canonicals = Array.from(head.matchAll(/<link\b[^>]*\brel="canonical"[^>]*>/g))
      .map(([tag]) => decode(tag.match(/\bhref="([^"]*)"/)?.[1] ?? ''))
    const robots = Array.from(head.matchAll(/<meta\b[^>]*\bname="robots"[^>]*>/g))
      .map(([tag]) => tag.match(/\bcontent="([^"]*)"/)?.[1] ?? '')
    const metaFile = file.replace(/\.html$/, '.meta')
    const status = fs.existsSync(metaFile) ? JSON.parse(fs.readFileSync(metaFile, 'utf8')).status ?? 200 : 200
    const noindex = robots.some(content => /\bnoindex\b/i.test(content))
    if (noindex && robots.some(content => /(^|,)\s*index\b/i.test(content))) fail(`${route}: contradictory robots meta (${robots.join(' / ')})`)
    pages.set(route, { canonicals, noindex, status })
  }
  return pages
}

function checkPages(pages: Map<string, Page>) {
  pages.forEach((page, route) => {
    const expected = urlFor(route)
    const selfOnly = page.canonicals.length === 1 && page.canonicals[0] === expected
    if (page.noindex || page.status !== 200) {
      if (page.canonicals.length && !selfOnly) fail(`${route}: noindex page has a canonical that is not itself (${page.canonicals.join(', ')})`)
    } else if (!selfOnly) {
      fail(`${route}: expected one canonical ${expected}, found ${page.canonicals.length ? page.canonicals.join(', ') : 'none'}`)
    }
  })
}

function checkSitemap(pages: Map<string, Page>): number {
  const sitemap = path.join(appDir, 'sitemap.xml.body')
  if (!fs.existsSync(sitemap)) {
    fail('sitemap.xml was not prerendered')
    return 0
  }
  const urls = Array.from(fs.readFileSync(sitemap, 'utf8').matchAll(/<loc>([^<]*)<\/loc>/g)).map(([, url]) => decode(url))
  const listed = new Set<string>()
  for (const url of urls) {
    if (listed.has(url)) fail(`duplicate sitemap URL: ${url}`)
    listed.add(url)
  }
  pages.forEach((page, route) => {
    if (!page.noindex && page.status === 200 && !listed.has(urlFor(route))) fail(`indexable page missing from sitemap: ${route}`)
  })
  for (const url of urls) {
    if (url !== SITE && !url.startsWith(`${SITE}/`)) {
      fail(`sitemap URL outside ${SITE}: ${url}`)
      continue
    }
    const route = url === SITE ? '/' : url.slice(SITE.length)
    const page = pages.get(route)
    if (!page) fail(`sitemap URL has no prerendered page: ${url}`)
    else if (page.status !== 200) fail(`sitemap URL renders status ${page.status}: ${url}`)
    else if (page.noindex) fail(`sitemap URL is noindex: ${url}`)
  }
  return urls.length
}

if (!fs.existsSync(appDir)) {
  fail('no build found in .next — run `next build` first')
} else {
  const pages = readPages()
  checkPages(pages)
  const sitemapCount = checkSitemap(pages)
  const indexable = Array.from(pages.values()).filter(page => !page.noindex && page.status === 200).length
  console.log(`seo: ${pages.size} pages, ${indexable} indexable, ${sitemapCount} sitemap URLs checked`)
}

if (errors.length) {
  console.error(`\n${errors.length} SEO problem(s):\n${errors.slice(0, 50).map(e => `  - ${e}`).join('\n')}`)
  process.exit(1)
}
console.log('seo OK')
