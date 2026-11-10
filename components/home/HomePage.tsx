import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, Code2, Compass, Library, Wrench } from 'lucide-react'
import type { HeaderData } from '@/lib/lesson-nav'
import { areaLabel } from '@/lib/catalog/schools'
import { HomeHero } from '@/components/home/HomeHero'
import { ContinueLearning } from '@/components/learn/ContinueLearning'

export interface HomePreview {
  href: string
  title: string
  trackTitle: string
  trackHref: string
  module: string | null
  position: number
  total: number
}

export interface HomePathCard {
  href: string
  title: string
  summary: string
  steps: number
  lessons: number
}

export interface HomeData {
  header: HeaderData
  paths: HomePathCard[]
  pathCount: number
  projects: number
  preview: HomePreview
}

const TRACK_CARDS = 8

const eyebrow = 'font-mono text-[11px] font-semibold uppercase tracking-[0.12em]'
const sectionTitle = 'mt-2.5 text-[28px] sm:text-[36px] font-extrabold tracking-[-0.035em] leading-tight'
const card = 'home-content-card group block rounded-2xl px-5 py-5 transition-all'

export default function HomePage({ data }: { data: HomeData }) {
  const { header, projects, preview, paths, pathCount } = data
  // Largest live learning tracks first; the full list is one click away.
  const topTracks = Object.values(header.tracks)
    .filter(track => track.area !== 'practice' && track.lessons > 0 && !track.early)
    .sort((a, b) => b.lessons - a.lessons)
    .slice(0, TRACK_CARDS)

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <HomeHero header={header} projects={projects} preview={preview} />

      <div className="mx-auto max-w-[1320px] px-5 pt-6 sm:px-8">
        <ContinueLearning />
      </div>

      <section aria-labelledby="home-journey" className="border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <div className="mx-auto max-w-[1320px] px-5 py-12 sm:px-8 sm:py-14">
          <div className="max-w-[660px]">
            <p className={eyebrow} style={{ color: 'var(--brand-green)' }}>Three ways in</p>
            <h2 id="home-journey" className={sectionTitle}>Start where you are.</h2>
            <p className="mt-3 text-sm leading-6 sm:text-base" style={{ color: 'var(--muted)' }}>
              Every route uses the same lessons, in the order that builds each skill on the one before it.
            </p>
          </div>
          <ul className="mt-7 grid gap-3 md:grid-cols-3">
            {[
              { href: '/learn/find-your-path', title: 'Start from zero', desc: 'Answer two questions and get a suggested starting point and route.', cta: 'Find your path', Icon: Compass },
              { href: '/learn/paths', title: 'Choose a career path', desc: `${pathCount} step-by-step routes to a job, from first lesson to capstone and interview preparation.`, cta: 'See career paths', Icon: BriefcaseBusiness },
              { href: '/learn/schools', title: 'Browse by school', desc: 'Six schools: AI, Data, Software Engineering, Cloud, Security, and Computer Science.', cta: 'Browse schools', Icon: Library },
            ].map(({ href, title, desc, cta, Icon }) => (
              <li key={href}>
                <Link href={href} className="home-step-card group flex h-full flex-col rounded-2xl border p-5" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'var(--brand-soft)', color: 'var(--brand-green)' }}>
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="mt-4 block text-base font-bold tracking-tight" style={{ color: 'var(--text)' }}>{title}</span>
                  <span className="mt-2 block flex-1 text-[13px] leading-5" style={{ color: 'var(--muted)' }}>{desc}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--brand-green)' }}>
                    {cta} <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="home-goals" className="border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
        <div className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className={eyebrow} style={{ color: 'var(--brand-green)' }}>Career paths</p>
              <h2 id="home-goals" className={sectionTitle}>Pick the role. Follow the route.</h2>
              <p className="mt-3 max-w-[620px] text-sm leading-6 sm:text-base" style={{ color: 'var(--muted)' }}>
                Each path puts the right lessons in order, tracks your progress, and ends with a capstone and interview preparation.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-5">
              <Link href="/learn/paths" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold" style={{ color: 'var(--brand-green)' }}>
                All {pathCount} career paths <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link href="/learn/roadmap" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold" style={{ color: 'var(--muted)' }}>
                {header.roadmapCount} skill roadmaps <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <ul className="mt-6 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {paths.map(path => (
              <li key={path.href}>
                <Link href={path.href} className={`${card} h-full`} style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-base font-bold">{path.title}</span>
                    <ArrowUpRight className="flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100" size={16} aria-hidden="true" style={{ color: 'var(--brand-green)' }} />
                  </span>
                  <span className="block mt-1.5 text-[13px] leading-relaxed" style={{ color: 'var(--muted)' }}>{path.summary}</span>
                  <span className="block mt-3 font-mono text-[11px] uppercase tracking-wider" style={{ color: 'var(--text2)' }}>{path.steps} steps · {path.lessons} lessons live</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="home-tracks">
        <div className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 sm:py-[72px]">
          <p className={eyebrow} style={{ color: 'var(--brand-green)' }}>Explore the learning library</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="home-tracks" className={sectionTitle}>{header.trackCount} paths to build practical skills.</h2>
              <p className="mt-3 max-w-[620px] text-sm leading-6 sm:text-base" style={{ color: 'var(--muted)' }}>Start with a subject that interests you. Each path is organized to help you progress step by step.</p>
            </div>
            <Link href="/learn" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold" style={{ color: 'var(--brand-green)' }}>
              Browse every path <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-7 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {topTracks.map(track => (
              <li key={track.href}>
                <Link href={track.href} className={`${card} h-full`} style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <span className="flex items-center justify-between gap-2">
                    <span className={`block ${eyebrow}`} style={{ color: 'var(--muted)' }}>{areaLabel(track.area)}</span>
                    <ArrowUpRight className="flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100" size={16} aria-hidden="true" style={{ color: 'var(--brand-green)' }} />
                  </span>
                  <span className="block mt-3 text-base font-bold leading-snug">{track.title}</span>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-[13px]" style={{ color: 'var(--muted)' }}>
                    <BookOpen size={13} aria-hidden="true" /> {track.lessons} lessons
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="home-practice" className="border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-5 py-14 sm:px-8 sm:py-[72px] lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="order-2 overflow-hidden rounded-2xl border shadow-lg lg:order-1" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex h-12 items-center gap-2 px-4 font-mono text-xs" style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>
              <span className="h-2 w-2 rounded-full" style={{ background: 'var(--brand-green)' }} />
              FRESHCART · SQL EDITOR
              <span aria-hidden="true" className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-sans text-xs font-bold" style={{ background: 'var(--brand-green)', color: 'var(--header-cta-text)' }}>
                <Code2 size={13} /> Run query
              </span>
            </div>
            <div className="grid sm:grid-cols-[1fr_0.8fr]">
              <pre className="m-0 overflow-x-auto px-5 py-5 font-mono text-[13px] leading-7" style={{ color: 'var(--text2)', background: 'var(--bg)' }}>
                <span style={{ color: 'var(--accent)' }}>SELECT</span> city, <span style={{ color: 'var(--accent)' }}>COUNT</span>(*) <span style={{ color: 'var(--accent)' }}>AS</span> orders{'\n'}
                <span style={{ color: 'var(--accent)' }}>FROM</span> orders{'\n'}
                <span style={{ color: 'var(--accent)' }}>GROUP BY</span> city{'\n'}
                <span style={{ color: 'var(--accent)' }}>ORDER BY</span> orders <span style={{ color: 'var(--accent)' }}>DESC</span>;
              </pre>
              <div className="flex flex-col justify-center border-t px-5 py-5 sm:border-l sm:border-t-0" style={{ borderColor: 'var(--border)' }}>
                <p className={`${eyebrow}`} style={{ color: 'var(--muted)' }}>Work with a sample database</p>
                <p className="mt-2 text-lg font-bold tracking-tight">Ask better questions of data.</p>
                <p className="mt-2 text-sm leading-6" style={{ color: 'var(--muted)' }}>Write a query, inspect the result, and learn by experimenting.</p>
                <Link href="/learn/sql/playground" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--brand-green)' }}>
                  Open SQL playground <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className={eyebrow} style={{ color: 'var(--brand-green)' }}>Learn by doing</p>
            <h2 id="home-practice" className={sectionTitle}>Turn lessons into things you can build.</h2>
            <p className="mt-3.5 max-w-[560px] text-base leading-relaxed" style={{ color: 'var(--text2)' }}>
              Practice in the browser, explore guided project builds, and learn by working through realistic examples—without a complicated setup.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/learn/sql/playground" className="inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold" style={{ border: '1px solid var(--border2)' }}>SQL playground <ArrowRight size={14} /></Link>
              <Link href="/playground" className="inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold" style={{ border: '1px solid var(--border2)' }}>Code playground <ArrowRight size={14} /></Link>
              <Link href="/learn/projects" className="inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold" style={{ border: '1px solid var(--border2)' }}>{projects} projects <ArrowRight size={14} /></Link>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
              <Wrench size={15} aria-hidden="true" style={{ color: 'var(--brand-green)' }} />
              Practice and projects are part of the learning journey.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="home-start" className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 sm:py-20">
          <div className="home-closing-cta flex flex-col items-start gap-6 rounded-3xl border p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between" style={{ borderColor: 'var(--border2)' }}>
            <div className="max-w-[700px]">
              <p className={eyebrow} style={{ color: 'var(--brand-green)' }}>LEARN. BUILD. GROW.</p>
              <h2 id="home-start" className="mt-3 text-[28px] font-black leading-tight tracking-[-0.04em] sm:text-[40px]">Your next skill starts with one step.</h2>
              <p className="mt-3 text-sm leading-6 sm:text-base" style={{ color: 'var(--text2)' }}>Choose a path, learn at your own pace, and build confidence through practice.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/learn" className="inline-flex min-h-12 items-center gap-2 rounded-xl px-5 text-sm font-bold" style={{ background: 'var(--header-cta)', color: 'var(--header-cta-text)' }}>
                Start learning <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <span className="text-xs" style={{ color: 'var(--muted)' }}>Free to explore · Progress saved in this browser</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
