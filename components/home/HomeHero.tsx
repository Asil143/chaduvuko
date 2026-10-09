'use client'
import Link from 'next/link'
import { useLearnerProgress } from '@/components/layout/useLearnerProgress'
import type { HeaderData } from '@/lib/lesson-nav'
import type { HomePreview } from '@/components/home/HomePage'

const eyebrow = 'font-mono text-[11px] font-semibold uppercase tracking-[0.12em]'
const primary = 'flex items-center justify-center min-h-[50px] px-6 rounded-xl text-base font-bold'
const secondary = 'flex items-center justify-center min-h-[50px] px-6 rounded-xl text-base font-semibold'

/**
 * The homepage hero. First-time visitors see a real lesson next to the pitch; a returning
 * learner (saved progress in this browser) sees where to pick up. The server renders the
 * first-visit version, which stays until saved progress has been read.
 */
export function HomeHero({ header, projects, preview }: { header: HeaderData; projects: number; preview: HomePreview }) {
  const learner = useLearnerProgress(true)
  const resume = learner.status === 'ready' ? learner.resume : null

  if (resume) {
    const track = header.tracks[resume.track]
    const completed = learner.completedByTrack[resume.track] ?? 0
    const others = Object.entries(learner.completedByTrack).filter(([slug]) => slug !== resume.track && header.tracks[slug])
    return (
      <section aria-labelledby="home-hero" className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-12 pb-14 sm:pt-20 sm:pb-[72px] grid gap-10 lg:gap-14 lg:grid-cols-[1fr_1.1fr] items-center">
        <div>
          <p className={eyebrow} style={{ color: 'var(--muted)' }}>Welcome back</p>
          <h1 id="home-hero" className="mt-4 text-[34px] sm:text-[46px] font-black tracking-tight leading-[1.08]">
            Pick up where you <span style={{ color: 'var(--green)' }}>left off.</span>
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed" style={{ color: 'var(--text2)' }}>
            {track?.title} · Lesson {resume.position} of {resume.trackSize}
            {completed > 0 ? ` · ${completed} completed in this track` : ''}
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link href={resume.href} className={primary} style={{ background: 'var(--green)', color: '#04140a' }}>Continue lesson →</Link>
            {track && <Link href={track.href} className={secondary} style={{ border: '1px solid var(--border2)' }}>{track.title} lessons</Link>}
          </div>
          {others.length > 0 && (
            <p className="mt-6 text-sm" style={{ color: 'var(--muted)' }}>
              Also in progress:{' '}
              {others.map(([slug, count], i) => (
                <span key={slug}>
                  {i > 0 && ', '}
                  <Link href={header.tracks[slug].href} className="font-semibold" style={{ color: 'var(--text)' }}>{header.tracks[slug].title}</Link> · {count} completed
                </span>
              ))}
            </p>
          )}
        </div>
        <Link
          href={resume.href}
          aria-label={`Continue ${track?.title ?? ''}, lesson ${resume.position} of ${resume.trackSize}: ${resume.title}`}
          className="block rounded-2xl overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.35)', boxShadow: 'var(--shadow-lg)' }}
        >
          <span className="flex items-center gap-2.5 h-11 px-4 text-[13px]" style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>
            <span className="font-semibold" style={{ color: 'var(--accent)' }}>{track?.title}</span>
            <span className="ml-auto font-mono text-xs">Lesson {resume.position} of {resume.trackSize}</span>
          </span>
          <span className="block px-6 py-6">
            <span className="block text-2xl font-extrabold tracking-tight leading-snug">{resume.title}</span>
            <span className="block mt-4 h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
              <span className="block h-full rounded-full" style={{ width: `${Math.round((completed / resume.trackSize) * 100)}%`, background: 'var(--green)' }} />
            </span>
            <span className="block mt-2 text-[13px]" style={{ color: 'var(--muted)' }}>{completed} of {resume.trackSize} completed</span>
          </span>
        </Link>
      </section>
    )
  }

  return (
    <section aria-labelledby="home-hero" className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-12 pb-14 sm:pt-20 sm:pb-[72px] grid gap-10 lg:gap-14 lg:grid-cols-[1fr_1.1fr] items-center">
      <div>
        <p className={eyebrow} style={{ color: 'var(--muted)' }}>Free tech lessons · No account</p>
        <h1 id="home-hero" className="mt-4 text-[34px] sm:text-[54px] font-black tracking-tight leading-[1.06]">
          Lessons that show how the work <span style={{ color: 'var(--green)' }}>really goes.</span>
        </h1>
        <p className="mt-5 text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text2)' }}>
          Each lesson walks through the concept, the errors you are likely to hit, and the kind of task you would be handed at work.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link href="/learn" className={primary} style={{ background: 'var(--green)', color: '#04140a' }}>Start learning →</Link>
          <Link href="/learn/roadmap" className={secondary} style={{ border: '1px solid var(--border2)' }}>Find your roadmap</Link>
        </div>
        <p className="mt-7 flex flex-wrap gap-x-5 gap-y-1 text-sm" style={{ color: 'var(--muted)' }}>
          <span><b style={{ color: 'var(--text)' }}>{header.lessonCount}</b> lessons</span>
          <span><b style={{ color: 'var(--text)' }}>{header.trackCount}</b> tracks</span>
          <span><b style={{ color: 'var(--text)' }}>{header.roadmapCount}</b> career roadmaps</span>
          <span><b style={{ color: 'var(--text)' }}>{projects}</b> projects</span>
        </p>
      </div>

      <Link
        href={preview.href}
        aria-label={`Open the lesson ${preview.title}`}
        className="block rounded-2xl overflow-hidden"
        style={{ background: 'var(--surface)', border: '1px solid var(--border2)', boxShadow: 'var(--shadow-lg)' }}
      >
        <span className="flex items-center gap-2.5 h-11 px-4 text-[13px] min-w-0" style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>
          <span className="font-semibold flex-shrink-0" style={{ color: 'var(--accent)' }}>{preview.trackTitle}</span>
          {preview.module && <span className="hidden sm:inline truncate">› {preview.module}</span>}
          <span className="ml-auto font-mono text-xs flex-shrink-0">Lesson {preview.position} of {preview.total}</span>
        </span>
        <span className="block px-5 sm:px-6 py-5 sm:py-6">
          <span className="block text-xl sm:text-2xl font-extrabold tracking-tight leading-snug">{preview.title}</span>
          <span className="block mt-2.5 text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
            Reading user input, printing output the right way, and every f-string formatting trick you will actually use.
          </span>
          <span className="block mt-4 rounded-[10px] px-4 py-3.5 font-mono text-[13px] leading-7 overflow-x-auto whitespace-pre" style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text2)' }}>
            {'age = input("Enter your age: ")\nprint(type(age))  '}<span style={{ color: 'var(--muted)' }}># &lt;class &apos;str&apos;&gt;</span>{'\nprint(age + 1)'}
          </span>
          <span className="block mt-3.5 rounded-[10px] px-4 py-3.5" style={{ background: 'rgba(255,71,87,0.06)', border: '1px solid rgba(255,71,87,0.28)' }}>
            <span className={`block ${eyebrow}`} style={{ color: 'var(--danger)' }}>Error you will hit</span>
            <span className="block mt-1.5 font-mono text-[13px] break-words" style={{ color: 'var(--text)' }}>TypeError: can only concatenate str (not &quot;int&quot;) to str</span>
            <span className="block mt-1.5 text-[13px] leading-relaxed" style={{ color: 'var(--text2)' }}>input() always returns a string. Convert it right away with int(input(...)), or build messages with an f-string.</span>
          </span>
        </span>
      </Link>
    </section>
  )
}
