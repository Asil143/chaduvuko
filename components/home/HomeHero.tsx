'use client'
import Link from 'next/link'
import { ArrowRight, BookOpenCheck, CirclePlay, Code2, Map, Sparkles } from 'lucide-react'
import { useLearnerProgress } from '@/components/layout/useLearnerProgress'
import type { HeaderData } from '@/lib/lesson-nav'
import type { HomePreview } from '@/components/home/HomePage'

const eyebrow = 'font-mono text-[11px] font-semibold uppercase tracking-[0.14em]'
const primary = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition-transform hover:-translate-y-0.5'
const secondary = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-colors hover:bg-[var(--bg2)]'

export function HomeHero({ header, projects, preview }: { header: HeaderData; projects: number; preview: HomePreview }) {
  const learner = useLearnerProgress(true)
  const resume = learner.status === 'ready' ? learner.resume : null
  const track = resume ? header.tracks[resume.track] : null
  const completed = resume ? learner.completedByTrack[resume.track] ?? 0 : 0

  return (
    <section aria-labelledby="home-hero" className="home-hero relative overflow-hidden border-b" style={{ borderColor: 'var(--border)' }}>
      <div className="home-hero-glow" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 px-5 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-16 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:py-20">
        <div className="relative z-10">
          <p className={`${eyebrow} inline-flex items-center gap-2 rounded-full border px-3 py-2`} style={{ borderColor: 'var(--border2)', background: 'var(--surface)', color: 'var(--muted)' }}>
            <Sparkles size={14} aria-hidden="true" style={{ color: 'var(--brand-green)' }} />
            Practical learning for the work ahead
          </p>
          <h1 id="home-hero" className="mt-6 max-w-[760px] text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.99] tracking-[-0.055em]">
            {resume ? (
              <>Keep your <span style={{ color: 'var(--brand-green)' }}>momentum.</span></>
            ) : (
              <>Learn it. Build it. <span style={{ color: 'var(--brand-green)' }}>Become it.</span></>
            )}
          </h1>
          <p className="mt-5 max-w-[610px] text-base leading-7 sm:text-lg sm:leading-8" style={{ color: 'var(--text2)' }}>
            {resume
              ? `Pick up ${track?.title ?? 'your learning'} where you left off—or choose a new path and keep growing.`
              : 'Follow structured technology learning paths from foundations to real projects, with practice and career preparation built in.'}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {resume ? (
              <>
                <Link href={resume.href} className={primary} style={{ background: 'var(--header-cta)', color: 'var(--header-cta-text)' }}>
                  Continue learning <ArrowRight size={16} aria-hidden="true" />
                </Link>
                {track && <Link href={track.href} className={secondary} style={{ border: '1px solid var(--border2)' }}>{track.title} path</Link>}
              </>
            ) : (
              <>
                <Link href="/learn" className={primary} style={{ background: 'var(--header-cta)', color: 'var(--header-cta-text)' }}>
                  Explore learning paths <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link href="/learn/roadmap" className={secondary} style={{ border: '1px solid var(--border2)' }}>
                  Find your roadmap <Map size={16} aria-hidden="true" />
                </Link>
              </>
            )}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: 'var(--muted)' }}>
            <span><strong style={{ color: 'var(--text)' }}>{header.trackCount}</strong> learning paths</span>
            <span><strong style={{ color: 'var(--text)' }}>{header.lessonCount}</strong> lessons</span>
            <span><strong style={{ color: 'var(--text)' }}>{projects}</strong> projects</span>
            <span>No account required</span>
          </div>
        </div>

        {resume ? (
          <Link
            href={resume.href}
            aria-label={`Continue ${track?.title ?? ''}, lesson ${resume.position} of ${resume.trackSize}: ${resume.title}`}
            className="home-feature-card block rounded-2xl p-5 sm:p-7"
          >
            <span className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--brand-green)' }}>
                <BookOpenCheck size={17} aria-hidden="true" /> Your learning continues
              </span>
              <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>{resume.position} / {resume.trackSize}</span>
            </span>
            <span className="mt-7 block text-sm" style={{ color: 'var(--muted)' }}>{track?.title}</span>
            <span className="mt-2 block text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{resume.title}</span>
            <span className="mt-6 block h-2 overflow-hidden rounded-full" style={{ background: 'var(--bg3)' }}>
              <span className="block h-full rounded-full" style={{ width: `${Math.min(100, Math.round((completed / resume.trackSize) * 100))}%`, background: 'var(--brand-green)' }} />
            </span>
            <span className="mt-2 flex flex-col items-start gap-2 text-xs sm:flex-row sm:items-center sm:justify-between" style={{ color: 'var(--muted)' }}>
              <span>{completed} of {resume.trackSize} lessons completed</span>
              <span className="inline-flex items-center gap-1 font-semibold" style={{ color: 'var(--text)' }}>Resume <ArrowRight size={14} aria-hidden="true" /></span>
            </span>
          </Link>
        ) : (
          <Link href={preview.href} aria-label={`Open the lesson ${preview.title}`} className="home-feature-card block rounded-2xl p-5 sm:p-7">
            <span className="flex items-center justify-between gap-3 border-b pb-4" style={{ borderColor: 'var(--border)' }}>
              <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--brand-green)' }}>
                <CirclePlay size={17} aria-hidden="true" /> A lesson, the Chaduvuko way
              </span>
              <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>{preview.trackTitle}</span>
            </span>
            <span className="mt-5 block text-xl font-bold leading-tight tracking-tight sm:text-2xl">{preview.title}</span>
            <span className="mt-2 block text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
              Learn the concept, see the common mistake, then understand how to fix it.
            </span>
            <span className="mt-5 block overflow-hidden rounded-xl border p-4 font-mono text-[13px] leading-7" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text2)' }}>
              <span className="block"><span style={{ color: 'var(--brand-green)' }}>age</span> = input(<span style={{ color: 'var(--accent)' }}>&quot;Enter your age: &quot;</span>)</span>
              <span className="block">print(type(age))</span>
              <span className="mt-2 block rounded-lg px-3 py-2 text-xs leading-5" style={{ background: 'var(--surface)', color: 'var(--muted)' }}>
                <Code2 className="mr-1 inline-block align-[-3px]" size={13} aria-hidden="true" /> input() returns a string. Convert it before doing numeric math.
              </span>
            </span>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--brand-green)' }}>
              Preview a real lesson <ArrowRight size={15} aria-hidden="true" />
            </span>
          </Link>
        )}
      </div>
    </section>
  )
}
