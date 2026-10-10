'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { Check, X } from 'lucide-react'
import { inertOutside } from '@/components/layout/useMenuDisclosure'
import type { RoadmapNode } from '@/data/roadmaps/types'

export type TopicStatus = 'not-started' | 'in-progress' | 'done'

export interface TopicLesson {
  href: string
  title: string
  track: string
}

const FOCUSABLE = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'

const STATUS_LABELS: [TopicStatus, string][] = [
  ['not-started', 'Not started'],
  ['in-progress', 'Learning'],
  ['done', 'Done'],
]

const TYPE_LABELS: Record<RoadmapNode['type'], string> = {
  required: 'Required',
  optional: 'Optional',
  recommended: 'Recommended',
  chaduvuko: 'Chaduvuko project',
}

/**
 * Side drawer (bottom sheet on phones) for one roadmap topic: what it is, the Chaduvuko lessons
 * that teach it with their completion, what to learn first, and the reader's status. It is
 * modal: focus moves in and stays, the page behind is inert, and Escape or the backdrop closes
 * it, returning focus to the topic that opened it.
 */
export function TopicDrawer({
  node,
  lessons,
  completed,
  status,
  statusFromLessons,
  prerequisites,
  onStatus,
  onClose,
}: {
  node: RoadmapNode
  lessons: TopicLesson[]
  completed: Record<string, string> | null
  status: TopicStatus
  /** True when every lesson for the topic is complete, which makes it done. */
  statusFromLessons: boolean
  prerequisites: { node: RoadmapNode; done: boolean }[]
  onStatus: (status: TopicStatus) => void
  onClose: () => void
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const titleId = `topic-${node.id}-title`

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const root = rootRef.current
    const panel = panelRef.current
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus({ preventScroll: true })
    const restoreInert = root ? inertOutside(root) : () => {}
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    const lock = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = lock
      restoreInert()
      opener?.focus({ preventScroll: true })
    }
    // The drawer is remounted per topic, so this runs once per opening.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const doneCount = completed ? lessons.filter(lesson => completed[lesson.href]).length : 0

  return (
    <div ref={rootRef} className="fixed inset-0 z-[70]">
      <div aria-hidden="true" className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.45)' }} onClick={onClose} />
      <div
        ref={panelRef}
        data-menu-panel
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute left-0 right-0 bottom-0 max-h-[88vh] rounded-t-2xl sm:rounded-none sm:left-auto sm:top-0 sm:max-h-none sm:w-[440px] flex flex-col"
        style={{ background: 'var(--bg)', borderLeft: '1px solid var(--border2)', boxShadow: 'var(--shadow-lg)' }}
      >
        <div className="flex items-start gap-3 px-5 pt-5 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--muted)' }}>
              {TYPE_LABELS[node.type]}
              {node.time ? ` · ${node.time}` : ''}
              {` · ${node.difficulty}`}
            </p>
            <h2 id={titleId} className="mt-1.5 text-xl font-extrabold tracking-tight leading-snug" style={{ color: 'var(--text)' }}>
              {node.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${node.title}`}
            className="flex items-center justify-center w-11 h-11 -mr-2 -mt-1.5 rounded-lg flex-shrink-0 hover:bg-[var(--bg2)]"
            style={{ color: 'var(--text2)' }}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
          <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text2)' }}>{node.description}</p>

          <h3 className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--muted)' }}>
            Learn it on Chaduvuko
          </h3>
          {lessons.length > 0 ? (
            <>
              <ul className="mt-2.5 flex flex-col gap-2">
                {lessons.map(lesson => {
                  const done = Boolean(completed?.[lesson.href])
                  return (
                    <li key={lesson.href}>
                      <Link
                        href={lesson.href}
                        className="flex items-center gap-3 min-h-[52px] px-3.5 py-2.5 rounded-xl hover:border-[var(--accent)]"
                        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold leading-snug" style={{ color: 'var(--text)' }}>{lesson.title}</span>
                          <span className="block text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{lesson.track}</span>
                        </span>
                        {done && (
                          <span className="flex items-center gap-1 text-xs font-semibold flex-shrink-0" style={{ color: 'var(--green)' }}>
                            <Check size={13} aria-hidden="true" /> Completed
                          </span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
              {completed && (
                <p className="mt-2.5 text-[13px]" style={{ color: 'var(--muted)' }}>
                  {doneCount} of {lessons.length} completed. Finishing all of them marks this topic done.
                </p>
              )}
            </>
          ) : (
            <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              Chaduvuko has no lesson on this topic yet. Track it here as you learn it elsewhere.
            </p>
          )}

          {prerequisites.length > 0 && (
            <>
              <h3 className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--muted)' }}>
                Learn first
              </h3>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {prerequisites.map(({ node: pre, done }) => (
                  <li
                    key={pre.id}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: done ? 'var(--green)' : 'var(--text2)' }}
                  >
                    {done && <Check size={12} aria-hidden="true" />}
                    {pre.title}
                    {done && <span className="sr-only"> (done)</span>}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="px-5 py-4" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <div role="group" aria-label="Your status" className="grid grid-cols-3 gap-1.5 p-1 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            {STATUS_LABELS.map(([value, label]) => {
              const checked = status === value
              const locked = statusFromLessons && value !== 'done'
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={checked}
                  disabled={locked}
                  onClick={() => onStatus(value)}
                  className="min-h-11 rounded-lg text-sm font-semibold transition-colors"
                  style={{
                    background: checked ? (value === 'done' ? 'var(--green)' : 'var(--text)') : 'transparent',
                    color: checked ? (value === 'done' ? '#04140a' : 'var(--bg)') : locked ? 'var(--muted)' : 'var(--text2)',
                    opacity: locked ? 0.5 : 1,
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>
          {statusFromLessons && (
            <p className="mt-2 text-[13px]" style={{ color: 'var(--muted)' }}>Done because you completed every lesson for this topic.</p>
          )}
        </div>
      </div>
    </div>
  )
}
