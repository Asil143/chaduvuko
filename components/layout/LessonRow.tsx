'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Check, ChevronDown, X } from 'lucide-react'
import { useProgress } from '@/lib/progress'
import type { LessonNavLink, LessonNavLinks } from '@/lib/lesson-nav'
import { useMenuDisclosure } from '@/components/layout/useMenuDisclosure'
import { ReadingLine } from '@/components/layout/ReadingLine'

/** At the ends of a track, Previous/Next point to the track overview. */
function prevText(link: LessonNavLink) {
  return link.label === 'Previous' ? link.title : 'Track overview'
}
function nextText(link: LessonNavLink) {
  return link.title
}
function prevName(link: LessonNavLink) {
  return link.label === 'Previous' ? `Previous lesson: ${link.title}` : `Back to ${link.title}`
}
function nextName(link: LessonNavLink) {
  return link.label === 'Next' ? `Next lesson: ${link.title}` : `Track complete: ${link.title}`
}

const CHIP = 'flex items-center h-11 lg:h-10 rounded-[10px] text-[13px] whitespace-nowrap flex-shrink-0'

/**
 * The row under the site bar on lesson pages: track and module, position, the track's lesson
 * picker, and Previous/Next. Neighbour titles show at 1200px and wider; below that the row keeps
 * only the controls and the lesson title lives in the page heading.
 */
export function LessonRow({ nav }: { nav: LessonNavLinks }) {
  const { prev, next, context } = nav
  const shortTrack = context.trackTitle

  return (
    <nav
      aria-label="Lesson"
      className="lesson-row fixed left-0 right-0 z-40 flex flex-col"
      style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="h-[52px] flex items-center gap-2 lg:gap-3 pl-3.5 pr-2 lg:px-6">
        <span className="flex items-center gap-1.5 min-w-0 text-[13px] whitespace-nowrap" style={{ color: 'var(--muted)' }}>
          <Link href={context.trackHref} className="flex items-center h-11 font-semibold flex-shrink-0" style={{ color: 'var(--accent)' }}>
            {shortTrack}
          </Link>
          {context.module && (
            <span className="hidden lg:inline truncate">
              <span aria-hidden="true">› </span>{context.module}
            </span>
          )}
        </span>

        <span className="hidden min-[1200px]:block w-px h-5 flex-shrink-0" style={{ background: 'var(--border2)' }} />
        <span className="hidden min-[1200px]:block flex-1 min-w-0 truncate text-sm font-semibold" style={{ color: 'var(--text)' }}>
          {/* Current title, for orientation; the h1 is the heading. */}
          <LessonTitle lessons={context.lessons} />
        </span>

        <span className="hidden lg:inline ml-auto min-[1200px]:ml-0 font-mono text-xs whitespace-nowrap" style={{ color: 'var(--muted)' }}>
          Lesson {context.position} of {context.total}
        </span>

        <LessonPicker nav={nav} />

        {prev && (
          <Link
            href={prev.href}
            aria-label={prevName(prev)}
            title={prev.title}
            className={`${CHIP} justify-center w-11 lg:w-auto lg:px-3`}
            style={{ border: '1px solid var(--border2)', color: 'var(--text)' }}
          >
            <span aria-hidden="true">←</span>
            <span className="hidden lg:inline min-[1200px]:hidden">&nbsp;Previous</span>
            <span className="hidden min-[1200px]:inline max-w-[22ch] truncate">&nbsp;{prevText(prev)}</span>
          </Link>
        )}
        {next && (
          <Link
            href={next.href}
            aria-label={nextName(next)}
            title={next.title}
            className={`${CHIP} px-3.5 font-bold`}
            style={{ background: 'var(--green)', color: '#04140a' }}
          >
            {next.label === 'Next' ? (
              <>
                <span className="min-[1200px]:hidden">Next&nbsp;→</span>
                <span className="hidden min-[1200px]:inline max-w-[30ch] truncate">Next · {nextText(next)}&nbsp;→</span>
              </>
            ) : (
              <>
                <span className="lg:hidden">Done&nbsp;→</span>
                <span className="hidden lg:inline">Track complete&nbsp;→</span>
              </>
            )}
          </Link>
        )}
      </div>
      <ReadingLine />
    </nav>
  )
}

function LessonTitle({ lessons }: { lessons: LessonNavLinks['context']['lessons'] }) {
  const pathname = usePathname()
  return <>{lessons.find(([href]) => href === pathname)?.[1] ?? ''}</>
}

function LessonPicker({ nav }: { nav: LessonNavLinks }) {
  const { context } = nav
  const pathname = usePathname()
  const progress = useProgress()
  const panelId = useId()
  const listRef = useRef<HTMLUListElement>(null)
  const [query, setQuery] = useState('')
  const { open, setOpen, close, containerRef, buttonRef } = useMenuDisclosure()

  const completedCount = useMemo(
    () => (progress ? context.lessons.filter(([href]) => progress.completed[href]).length : 0),
    [progress, context.lessons],
  )

  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const result: { module: string; items: { href: string; title: string; number: number }[] }[] = []
    context.lessons.forEach(([href, title, module], i) => {
      if (needle && !title.toLowerCase().includes(needle)) return
      const group = result.at(-1)?.module === module ? result.at(-1)! : (result.push({ module, items: [] }), result.at(-1)!)
      group.items.push({ href, title, number: i + 1 })
    })
    return result
  }, [context.lessons, query])

  // Open scrolled to the current lesson; lock page scroll while the phone sheet covers it.
  useEffect(() => {
    if (!open) { setQuery(''); return }
    listRef.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'center' })
    if (!matchMedia('(max-width: 1023px)').matches) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [open])

  const label = `${context.trackTitle} lessons`

  return (
    <div ref={containerRef} className="lg:relative mr-auto lg:mr-0">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${label}, lesson ${context.position} of ${context.total}`}
        onClick={() => setOpen(isOpen => !isOpen)}
        className={`${CHIP} gap-1 px-2 lg:px-3`}
        style={{ border: '1px solid var(--border2)', color: 'var(--text)', background: open ? 'var(--bg3)' : 'transparent' }}
      >
        <span className="lg:hidden font-mono text-xs" style={{ color: 'var(--text2)' }}>{context.position} of {context.total}</span>
        <span className="hidden lg:inline">{label}</span>
        <ChevronDown size={12} aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
      </button>

      {open && (
        <div
          id={panelId}
          data-menu-panel
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-[60] flex flex-col lg:absolute lg:inset-auto lg:right-0 lg:top-full lg:mt-2 lg:w-[460px] lg:h-[min(440px,70vh)] lg:rounded-xl overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border2)', boxShadow: 'var(--shadow-lg)' }}
        >
          <div className="flex items-center gap-2 px-4 lg:px-3.5 py-2" style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="flex-1 min-w-0 lg:hidden">
              <div className="text-base font-bold" style={{ color: 'var(--text)' }}>{label}</div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>
                Lesson {context.position} of {context.total}{completedCount > 0 ? ` · ${completedCount} completed` : ''}
              </div>
            </div>
            <label className="hidden lg:flex flex-1 items-center gap-2 h-9">
              <span className="sr-only">Filter {label}</span>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={`Filter ${context.total} lessons`}
                className="flex-1 min-w-0 bg-transparent text-sm outline-none"
                style={{ color: 'var(--text)' }}
              />
            </label>
            <button
              type="button"
              aria-label={`Close ${label}`}
              onClick={close}
              className="w-11 h-11 lg:w-9 lg:h-9 flex items-center justify-center rounded-lg flex-shrink-0"
              style={{ background: 'var(--bg2)', color: 'var(--text2)' }}
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
          <label className="lg:hidden flex items-center mx-3 my-2.5 px-3 h-11 rounded-[10px]" style={{ background: 'var(--bg)', border: '1px solid var(--border2)' }}>
            <span className="sr-only">Filter {label}</span>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={`Filter ${context.total} lessons`}
              className="flex-1 min-w-0 bg-transparent text-base outline-none"
              style={{ color: 'var(--text)' }}
            />
          </label>

          <ul ref={listRef} className="flex-1 overflow-y-auto px-1.5 pb-2">
            {groups.map((group, gi) => (
              <li key={`${group.module}-${gi}`}>
                {group.module && (
                  <div aria-hidden="true" className="flex justify-between px-2.5 pt-3 pb-1 font-mono text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
                    <span>{group.module}</span>
                    {gi === 0 && !query && completedCount > 0 && <span className="hidden lg:inline">{completedCount} completed</span>}
                  </div>
                )}
                <ul aria-label={group.module || label}>
                  {group.items.map(item => {
                    const current = item.href === pathname
                    const done = Boolean(progress?.completed[item.href])
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={current ? 'page' : undefined}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 min-h-12 lg:min-h-9 px-2.5 rounded-lg text-[15px] lg:text-sm hover:bg-[var(--bg2)]"
                          style={{ color: current ? 'var(--text)' : done ? 'var(--text2)' : 'var(--text)', fontWeight: current ? 600 : 400, background: current ? 'var(--bg2)' : undefined }}
                        >
                          <span className="w-4 flex-shrink-0 flex justify-center" aria-hidden={!done}>
                            {done
                              ? <><Check size={16} aria-hidden="true" style={{ color: 'var(--green)' }} /><span className="sr-only">Completed:</span></>
                              : <span className="w-4 h-4 rounded-full box-border" style={{ border: current ? '5px solid var(--accent)' : '2px solid var(--border2)' }} />}
                          </span>
                          <span className="min-w-0">{String(item.number).padStart(2, '0')} · {item.title}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))}
            {groups.length === 0 && (
              <li className="px-3 py-6 text-sm text-center" style={{ color: 'var(--muted)' }}>No lessons match “{query.trim()}”.</li>
            )}
          </ul>
          <div className="flex justify-end px-3.5 py-2.5" style={{ borderTop: '1px solid var(--border)' }}>
            <Link href={context.trackHref} onClick={() => setOpen(false)} className="flex items-center min-h-11 lg:min-h-0 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
              {context.trackTitle} track page →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
