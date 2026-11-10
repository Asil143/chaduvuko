'use client'

import Link from 'next/link'
import { useProgress } from '@/lib/progress'

export interface TimelineMilestone {
  title: string
  outcome: string
  status: 'live' | 'planned'
  href: string
  trackTitle: string
  lessons: [href: string, title: string][]
  hours: string
}

const pill: React.CSSProperties = { display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999 }

export function PathTimeline({ milestones }: { milestones: TimelineMilestone[] }) {
  const progress = useProgress()
  const done = (href: string) => Boolean(progress?.completed[href])

  const all = milestones.flatMap(milestone => milestone.lessons)
  const completed = all.filter(([href]) => done(href)).length
  const nextLesson = all.find(([href]) => !done(href))
  const percent = all.length ? Math.round((completed / all.length) * 100) : 0
  const started = completed > 0

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, padding: '16px 20px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--surface)', marginBottom: 28 }}>
        <div style={{ flex: '1 1 260px' }}>
          <div style={{ fontSize: 13, color: 'var(--muted)' }} aria-live="polite">
            {progress ? `${completed} of ${all.length} live lessons complete · ${percent}%` : `${all.length} live lessons`}
          </div>
          <div role="progressbar" aria-label="Path progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} style={{ marginTop: 8, height: 8, borderRadius: 999, background: 'var(--bg3)', overflow: 'hidden' }}>
            <div style={{ width: `${percent}%`, height: '100%', background: 'var(--brand-green)', transition: 'width .3s' }} />
          </div>
        </div>
        {nextLesson && (
          <Link href={nextLesson[0]} className="inline-flex min-h-11 items-center rounded-xl px-5 text-sm font-bold" style={{ background: 'var(--header-cta)', color: 'var(--header-cta-text)' }}>
            {started ? `Resume: ${nextLesson[1]}` : 'Start the path'} →
          </Link>
        )}
      </div>

      <ol style={{ listStyle: 'none', margin: 0, padding: 0, position: 'relative' }}>
        {milestones.map((milestone, index) => {
          const total = milestone.lessons.length
          const finished = milestone.lessons.filter(([href]) => done(href)).length
          const complete = total > 0 && finished === total
          const planned = milestone.status === 'planned'
          const firstOpen = milestone.lessons.find(([href]) => !done(href))
          return (
            <li key={`${milestone.title}-${index}`} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 14, paddingBottom: 18 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: 36, height: 36, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14,
                    background: complete ? 'var(--brand-green)' : planned ? 'var(--bg3)' : 'var(--brand-soft)',
                    color: complete ? 'var(--header-cta-text)' : planned ? 'var(--muted)' : 'var(--brand-green)',
                    border: planned ? '1px dashed var(--border2)' : 'none',
                  }}
                >
                  {complete ? '✓' : index + 1}
                </span>
                {index < milestones.length - 1 && <span aria-hidden="true" style={{ flex: 1, width: 2, marginTop: 6, background: 'var(--border)' }} />}
              </div>
              <div style={{ padding: '14px 18px', borderRadius: 12, border: `1px ${planned ? 'dashed' : 'solid'} var(--border)`, background: planned ? 'transparent' : 'var(--surface)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
                  <h3 style={{ margin: 0, fontSize: 16, color: 'var(--text)' }}>
                    <span className="sr-only">Milestone {index + 1}: </span>{milestone.title}
                  </h3>
                  {planned ? (
                    <span style={{ ...pill, background: 'rgba(168,85,247,0.12)', color: '#a855f7' }}>Coming soon</span>
                  ) : complete ? (
                    <span style={{ ...pill, background: 'var(--brand-soft)', color: 'var(--brand-green)' }}>Complete</span>
                  ) : (
                    <span style={{ ...pill, background: 'var(--bg3)', color: 'var(--muted)' }}>{progress ? `${finished}/${total}` : total} lessons · {milestone.hours}</span>
                  )}
                </div>
                <p style={{ margin: '6px 0 10px', fontSize: 14, color: 'var(--text2)', lineHeight: 1.6 }}>{milestone.outcome}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, fontSize: 13 }}>
                  <Link href={milestone.href} style={{ color: 'var(--brand-green)', fontWeight: 600 }}>
                    {planned ? `See the ${milestone.trackTitle} skills map` : milestone.trackTitle} →
                  </Link>
                  {!planned && firstOpen && (
                    <Link href={firstOpen[0]} style={{ color: 'var(--muted)' }}>
                      {finished ? 'Next' : 'First'} lesson: {firstOpen[1]}
                    </Link>
                  )}
                </div>
                {!planned && total > 0 && (
                  <details style={{ marginTop: 10 }}>
                    <summary style={{ cursor: 'pointer', fontSize: 13, color: 'var(--muted)' }}>Show {total} lessons</summary>
                    <ol style={{ margin: '8px 0 0', paddingLeft: 20, fontSize: 13, lineHeight: 1.9 }}>
                      {milestone.lessons.map(([href, title]) => (
                        <li key={href}>
                          <Link href={href} style={{ color: done(href) ? 'var(--muted)' : 'var(--text)' }}>
                            {done(href) && <span aria-label="completed">✓ </span>}{title}
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </details>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
