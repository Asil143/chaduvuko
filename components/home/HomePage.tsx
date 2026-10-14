import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, Code2, Map, Wrench } from 'lucide-react'
import type { HeaderData } from '@/lib/lesson-nav'
import type { TrackArea } from '@/lib/catalog/types'
import { HomeHero } from '@/components/home/HomeHero'

export interface HomePreview {
  href: string
  title: string
  trackTitle: string
  trackHref: string
  module: string | null
  position: number
  total: number
}

export interface HomeData {
  header: HeaderData
  projects: number
  preview: HomePreview
}

const AREA_LABELS: Record<TrackArea, string> = {
  data: 'Data',
  cloud: 'Cloud',
  ai: 'AI & ML',
  programming: 'Programming',
  cs: 'CS Core',
  security: 'Security',
  practice: 'Practice',
}

const TRACK_CARDS = 8

const eyebrow = 'font-mono text-[11px] font-semibold uppercase tracking-[0.12em]'
const sectionTitle = 'mt-2.5 text-[28px] sm:text-[36px] font-extrabold tracking-[-0.035em] leading-tight'
const card = 'home-content-card group block rounded-2xl px-5 py-5 transition-all'

export default function HomePage({ data }: { data: HomeData }) {
  const { header, projects, preview } = data
  // Largest live learning tracks first; the full list is one click away.
  const topTracks = Object.values(header.tracks)
    .filter(track => track.area !== 'practice' && track.lessons > 0 && !track.early)
    .sort((a, b) => b.lessons - a.lessons)
    .slice(0, TRACK_CARDS)

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <HomeHero header={header} projects={projects} preview={preview} />

      <section aria-labelledby="home-journey" className="border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <div className="mx-auto max-w-[1320px] px-5 py-12 sm:px-8 sm:py-14">
          <div className="max-w-[660px]">
            <p className={eyebrow} style={{ color: 'var(--brand-green)' }}>A clear path forward</p>
            <h2 id="home-journey" className={sectionTitle}>From first concept to real work.</h2>
            <p className="mt-3 text-sm leading-6 sm:text-base" style={{ color: 'var(--muted)' }}>
              Build understanding in the right order, then put it to work.
            </p>
          </div>
          <ol className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Choose a direction', desc: 'Start from a technology track or a role-based roadmap.', Icon: Map },
              { title: 'Learn the foundations', desc: 'Follow structured lessons that build one skill at a time.', Icon: BookOpen },
              { title: 'Practice as you go', desc: 'Try concepts in browser-based coding and SQL tools.', Icon: Code2 },
              { title: 'Build job-ready proof', desc: 'Apply your skills through projects and career preparation.', Icon: BriefcaseBusiness },
            ].map(({ title, desc, Icon }, index) => (
              <li key={title} className="home-step-card relative rounded-2xl border p-5" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'var(--brand-soft)', color: 'var(--brand-green)' }}>
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span className="mt-5 block font-mono text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>0{index + 1}</span>
                <h3 className="mt-1.5 text-base font-bold tracking-tight">{title}</h3>
                <p className="mt-2 text-[13px] leading-5" style={{ color: 'var(--muted)' }}>{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="home-goals" className="border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
        <div className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className={eyebrow} style={{ color: 'var(--brand-green)' }}>Choose your destination</p>
              <h2 id="home-goals" className={sectionTitle}>Know the role. Find the route.</h2>
              <p className="mt-3 max-w-[620px] text-sm leading-6 sm:text-base" style={{ color: 'var(--muted)' }}>
                Explore {header.roadmapCount} career roadmaps and see the skills that connect where you are to where you want to go.
              </p>
            </div>
            <Link href="/learn/roadmap" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold" style={{ color: 'var(--brand-green)' }}>
              Explore all roadmaps <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-6 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {header.featuredRoadmaps.map(roadmap => (
              <li key={roadmap.href}>
                <Link href={roadmap.href} className={`${card} h-full`} style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-base font-bold">{roadmap.title}</span>
                    <ArrowUpRight className="flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100" size={16} aria-hidden="true" style={{ color: 'var(--brand-green)' }} />
                  </span>
                  <span className="block mt-1.5 text-[13px] leading-relaxed" style={{ color: 'var(--muted)' }}>{roadmap.blurb}</span>
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
                    <span className={`block ${eyebrow}`} style={{ color: 'var(--muted)' }}>{AREA_LABELS[track.area]}</span>
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
