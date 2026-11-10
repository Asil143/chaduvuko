import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BookOpen, Code2, Compass, Wrench } from 'lucide-react'
import type { HeaderData } from '@/lib/lesson-nav'
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

export interface HomeSchool {
  href: string
  title: string
  short: string
  description: string
  lessons: number
  paths: number
  planned: number
  /** Live courses, largest first. */
  courses: { href: string; title: string }[]
}

export interface HomeData {
  header: HeaderData
  paths: HomePathCard[]
  schools: HomeSchool[]
  pathCount: number
  projects: number
  preview: HomePreview
}

const SCHOOL_CHIPS = 4

const eyebrow = 'font-mono text-[11px] font-semibold uppercase tracking-[0.12em]'
const sectionTitle = 'mt-2.5 text-[28px] sm:text-[36px] font-extrabold tracking-[-0.035em] leading-tight'
const card = 'home-content-card group block rounded-2xl px-5 py-5 transition-all'

export default function HomePage({ data }: { data: HomeData }) {
  const { header, projects, preview, paths, pathCount, schools } = data

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <HomeHero header={header} projects={projects} preview={preview} />

      <div className="mx-auto max-w-[1320px] px-5 pt-6 sm:px-8">
        <ContinueLearning />
      </div>

      <section aria-labelledby="home-goals" className="border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
        <div className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className={eyebrow} style={{ color: 'var(--brand-green)' }}>Career paths</p>
              <h2 id="home-goals" className={sectionTitle}>Pick the role. Follow the route.</h2>
              <p className="mt-3 max-w-[620px] text-sm leading-6 sm:text-base" style={{ color: 'var(--muted)' }}>
                Each path puts the right courses in order, tracks your progress, and ends with a capstone and interview preparation.
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
          <Link href="/learn/find-your-path" className="home-step-card group mt-3 flex flex-col gap-3 rounded-2xl border p-5 sm:flex-row sm:items-center" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: 'var(--brand-soft)', color: 'var(--brand-green)' }}>
              <Compass size={18} aria-hidden="true" />
            </span>
            <span className="flex-1">
              <span className="block text-base font-bold tracking-tight" style={{ color: 'var(--text)' }}>Not sure which role fits, or starting from zero?</span>
              <span className="mt-1 block text-[13px] leading-5" style={{ color: 'var(--muted)' }}>Answer two questions and get a suggested career path and first lesson.</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--brand-green)' }}>
              Find your path <ArrowRight size={14} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </section>

      <section aria-labelledby="home-tracks">
        <div className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8 sm:py-[72px]">
          <p className={eyebrow} style={{ color: 'var(--brand-green)' }}>Browse by school</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="home-tracks" className={sectionTitle}>{header.trackCount} courses across {schools.length} schools.</h2>
              <p className="mt-3 max-w-[620px] text-sm leading-6 sm:text-base" style={{ color: 'var(--muted)' }}>Prefer to learn one subject at a time? Each school groups related courses, from first principles to production.</p>
            </div>
            <Link href="/learn" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold" style={{ color: 'var(--brand-green)' }}>
              Browse all courses <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-7 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {schools.map(school => (
              <li key={school.href} className="home-content-card flex h-full flex-col rounded-2xl px-5 py-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <Link href={school.href} className="group block">
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--text)' }}>{school.title}</span>
                    <ArrowUpRight className="flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100" size={16} aria-hidden="true" style={{ color: 'var(--brand-green)' }} />
                  </span>
                  <span className="mt-1.5 block text-[13px] leading-relaxed" style={{ color: 'var(--muted)' }}>{school.description}</span>
                </Link>
                {school.courses.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${school.short} courses`}>
                    {school.courses.slice(0, SCHOOL_CHIPS).map(course => (
                      <li key={course.href}>
                        <Link href={course.href} className="inline-flex min-h-8 items-center rounded-full px-3 text-xs font-medium hover:bg-[var(--bg3)]" style={{ background: 'var(--bg2)', color: 'var(--text2)' }}>
                          {course.title}
                        </Link>
                      </li>
                    ))}
                    {school.courses.length > SCHOOL_CHIPS && (
                      <li>
                        <Link href={school.href} className="inline-flex min-h-8 items-center rounded-full px-3 text-xs font-medium" style={{ color: 'var(--brand-green)' }}>
                          +{school.courses.length - SCHOOL_CHIPS} more
                        </Link>
                      </li>
                    )}
                  </ul>
                )}
                <span className="mt-auto flex items-center gap-1.5 pt-4 text-[13px]" style={{ color: 'var(--muted)' }}>
                  <BookOpen size={13} aria-hidden="true" />
                  {school.lessons} lessons
                  {school.paths > 0 && ` · ${school.paths} career path${school.paths === 1 ? '' : 's'}`}
                  {school.planned > 0 && ` · ${school.planned} coming next`}
                </span>
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
    </div>
  )
}
