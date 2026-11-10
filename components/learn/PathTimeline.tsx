'use client'

import Link from 'next/link'
import { useProgress } from '@/lib/progress'
import type { PathLesson } from '@/lib/catalog/paths'

export interface TimelineMilestone {
  title: string
  outcome: string
  status: 'live' | 'planned'
  href: string
  trackTitle: string
  lessons: PathLesson[]
  hours: string
}

interface Props {
  milestones: TimelineMilestone[]
  stats: { label: string; value: string }[]
}

function percentOf(done: number, total: number) {
  return total ? Math.round((done / total) * 100) : 0
}

function groupBySection(lessons: PathLesson[]) {
  const groups: { section?: string; items: { lesson: PathLesson; number: number }[] }[] = []
  lessons.forEach((lesson, index) => {
    const last = groups[groups.length - 1]
    if (last && last.section === lesson.section) last.items.push({ lesson, number: index + 1 })
    else groups.push({ section: lesson.section, items: [{ lesson, number: index + 1 }] })
  })
  return groups
}

function ProgressBar({ percent, label }: { percent: number; label: string }) {
  return (
    <div className="cp-bar" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
      <div style={{ width: `${percent}%` }} />
    </div>
  )
}

/** Progress card for the hero; reads saved progress on the client. */
export function PathProgressCard({ milestones, stats }: Props) {
  const progress = useProgress()
  const done = (href: string) => Boolean(progress?.completed[href])
  const all = milestones.flatMap(milestone => milestone.lessons)
  const completed = all.filter(lesson => done(lesson.href)).length
  const next = all.find(lesson => !done(lesson.href))
  const percent = percentOf(completed, all.length)

  return (
    <aside className="cp-glance" aria-label="Path at a glance">
      <dl className="cp-stats">
        {stats.map(stat => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
      <div className="cp-glance-progress">
        <div className="cp-glance-row" aria-live="polite">
          <span>Your progress</span>
          <strong>{progress ? `${completed}/${all.length} · ${percent}%` : `0/${all.length}`}</strong>
        </div>
        <ProgressBar percent={percent} label="Path progress" />
      </div>
      {next && (
        <Link href={next.href} className="cp-cta">
          <span>{completed ? 'Resume the path' : 'Start the path'} →</span>
          <small>{completed ? 'Next' : 'First'}: {next.title}</small>
        </Link>
      )}
    </aside>
  )
}

export function PathTimeline({ milestones }: Pick<Props, 'milestones'>) {
  const progress = useProgress()
  const done = (href: string) => Boolean(progress?.completed[href])

  return (
    <div>
      <nav aria-label="Jump to milestone" className="cp-stepper">
        <ol>
          {milestones.map((milestone, index) => {
            const total = milestone.lessons.length
            const complete = total > 0 && milestone.lessons.every(lesson => done(lesson.href))
            return (
              <li key={`${milestone.title}-step`}>
                <a href={`#milestone-${index + 1}`} data-state={complete ? 'complete' : milestone.status}>
                  <span className="cp-step-num" aria-hidden="true">{complete ? '✓' : index + 1}</span>
                  <span className="cp-step-label">{milestone.title}</span>
                </a>
              </li>
            )
          })}
        </ol>
      </nav>

      <ol className="cp-timeline">
        {milestones.map((milestone, index) => {
          const total = milestone.lessons.length
          const finished = milestone.lessons.filter(lesson => done(lesson.href)).length
          const complete = total > 0 && finished === total
          const planned = milestone.status === 'planned'
          const firstOpen = milestone.lessons.find(lesson => !done(lesson.href))
          const state = complete ? 'complete' : planned ? 'planned' : finished ? 'active' : 'live'
          const groups = groupBySection(milestone.lessons)
          const showSections = groups.length > 1 && groups.every(group => group.section)

          return (
            <li key={`${milestone.title}-${index}`} id={`milestone-${index + 1}`} className="cp-milestone" data-state={state}>
              <div className="cp-rail" aria-hidden="true">
                <span className="cp-node">{complete ? '✓' : index + 1}</span>
              </div>
              <article className="cp-card">
                <header className="cp-card-head">
                  <div>
                    <p className="cp-kicker">Milestone {index + 1} · {milestone.trackTitle}</p>
                    <h3>{milestone.title}</h3>
                  </div>
                  {planned ? (
                    <span className="cp-pill cp-pill-soon">Coming soon</span>
                  ) : complete ? (
                    <span className="cp-pill cp-pill-done">Complete</span>
                  ) : (
                    <span className="cp-pill">{total} lessons · {milestone.hours}</span>
                  )}
                </header>
                <p className="cp-outcome">{milestone.outcome}</p>

                {!planned && total > 0 && (
                  <div className="cp-card-progress">
                    <ProgressBar percent={percentOf(finished, total)} label={`${milestone.title} progress`} />
                    <span>{finished}/{total}</span>
                  </div>
                )}

                <div className="cp-actions">
                  {!planned && firstOpen && (
                    <Link href={firstOpen.href} className="cp-btn cp-btn-primary">
                      {finished ? 'Continue' : 'Start'}: {firstOpen.title}
                    </Link>
                  )}
                  <Link href={milestone.href} className="cp-btn">
                    {planned ? `See the ${milestone.trackTitle} skills map` : `${milestone.trackTitle} course overview`} →
                  </Link>
                </div>

                {!planned && total > 0 && (
                  <details className="cp-lessons">
                    <summary>
                      <span className="cp-summary-open">Hide lessons</span>
                      <span className="cp-summary-closed">Show all {total} lessons</span>
                    </summary>
                    {groups.map(group => (
                      <div key={`${group.section ?? 'lessons'}-${group.items[0].number}`} className="cp-group">
                        {showSections && (
                          <p className="cp-group-title">
                            {group.section}
                            <span>Lessons {group.items[0].number}–{group.items[group.items.length - 1].number}</span>
                          </p>
                        )}
                        <ol className="cp-lesson-list">
                          {group.items.map(({ lesson, number }) => {
                            const isDone = done(lesson.href)
                            return (
                              <li key={lesson.href}>
                                <Link href={lesson.href} className="cp-lesson" data-done={isDone || undefined}>
                                  <span className="cp-lesson-num">{isDone ? '✓' : String(number).padStart(2, '0')}</span>
                                  <span className="cp-lesson-title">
                                    <span className="sr-only">Lesson {number}{isDone ? ', completed' : ''}: </span>{lesson.title}
                                  </span>
                                  <span className="cp-lesson-time">{lesson.minutes} min</span>
                                </Link>
                              </li>
                            )
                          })}
                        </ol>
                      </div>
                    ))}
                  </details>
                )}
              </article>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
