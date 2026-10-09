import Link from 'next/link'
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
const sectionTitle = 'mt-2.5 text-[26px] sm:text-[32px] font-extrabold tracking-tight leading-tight'
const card = 'block rounded-xl px-[18px] py-4 transition-colors hover:border-[var(--accent)]'

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

      <section aria-labelledby="home-goals" className="border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-14 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className={eyebrow} style={{ color: 'var(--muted)' }}>Pick a goal</p>
              <h2 id="home-goals" className={sectionTitle}>Roadmaps for {header.roadmapCount} tech roles</h2>
            </div>
            <Link href="/learn/roadmap" className="flex items-center min-h-11 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
              All roadmaps →
            </Link>
          </div>
          <ul className="mt-6 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {header.featuredRoadmaps.map(roadmap => (
              <li key={roadmap.href}>
                <Link href={roadmap.href} className={`${card} h-full`} style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <span className="block text-base font-bold">{roadmap.title}</span>
                  <span className="block mt-1.5 text-[13px] leading-relaxed" style={{ color: 'var(--muted)' }}>{roadmap.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="home-tracks">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-14 sm:py-[72px]">
          <p className={eyebrow} style={{ color: 'var(--muted)' }}>Every track</p>
          <h2 id="home-tracks" className={sectionTitle}>{header.trackCount} tracks, from zero to job-ready</h2>
          <ul className="mt-7 grid gap-2.5 grid-cols-2 lg:grid-cols-4">
            {topTracks.map(track => (
              <li key={track.href}>
                <Link href={track.href} className={`${card} h-full`} style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <span className={`block ${eyebrow}`} style={{ color: 'var(--muted)' }}>{AREA_LABELS[track.area]}</span>
                  <span className="block mt-1.5 text-[15px] font-bold leading-snug">{track.title}</span>
                  <span className="block mt-0.5 text-[13px]" style={{ color: 'var(--muted)' }}>{track.lessons} lessons</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/learn"
            className="mt-3.5 flex items-center justify-center min-h-12 rounded-xl text-[15px] font-semibold"
            style={{ border: '1px solid var(--border2)' }}
          >
            See all {header.trackCount} tracks
          </Link>
        </div>
      </section>

      <section aria-labelledby="home-practice" className="border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-14 sm:py-[72px] grid gap-10 lg:gap-14 lg:grid-cols-[1.1fr_1fr] items-center">
          <div className="order-2 lg:order-1 rounded-2xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}>
            <div className="flex items-center h-11 px-4 font-mono text-xs" style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>
              FRESHCART SQL
              <span aria-hidden="true" className="ml-auto px-3 py-1 rounded-md font-bold" style={{ background: '#06b6d4', color: '#001016' }}>▶ Run</span>
            </div>
            <pre className="m-0 px-4 py-4 font-mono text-[13px] leading-7 overflow-x-auto" style={{ color: 'var(--text2)', background: 'var(--bg)' }}>
              {'SELECT city, COUNT(*) AS orders\nFROM orders\nGROUP BY city\nORDER BY orders DESC;'}
            </pre>
          </div>
          <div className="order-1 lg:order-2">
            <p className={eyebrow} style={{ color: 'var(--muted)' }}>Practice</p>
            <h2 id="home-practice" className={sectionTitle}>Try it in the browser</h2>
            <p className="mt-3.5 text-base leading-relaxed" style={{ color: 'var(--text2)' }}>
              A SQL playground with a real sample database, a code playground, and {projects} end-to-end Azure projects. Nothing to install.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/learn/sql/playground" className="flex items-center min-h-12 px-5 rounded-xl text-[15px] font-semibold" style={{ border: '1px solid var(--border2)' }}>SQL Playground</Link>
              <Link href="/playground" className="flex items-center min-h-12 px-5 rounded-xl text-[15px] font-semibold" style={{ border: '1px solid var(--border2)' }}>Code Playground</Link>
              <Link href="/learn/projects" className="flex items-center min-h-12 px-5 rounded-xl text-[15px] font-semibold" style={{ border: '1px solid var(--border2)' }}>Projects</Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="home-start" className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16 sm:py-20 text-center">
          <h2 id="home-start" className="text-[28px] sm:text-[40px] font-black tracking-tight leading-tight">Start with one lesson today.</h2>
          <p className="mt-3 text-base" style={{ color: 'var(--text2)' }}>No account. Your progress saves in this browser.</p>
          <Link
            href="/learn"
            className="mt-7 inline-flex items-center min-h-[52px] px-7 rounded-xl text-base font-bold"
            style={{ background: 'var(--green)', color: '#04140a' }}
          >
            Start learning →
          </Link>
        </div>
      </section>
    </div>
  )
}
