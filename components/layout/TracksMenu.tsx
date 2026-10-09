'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { TrackArea } from '@/lib/catalog/types'
import type { TrackSummaries } from '@/lib/lesson-nav'
import type { LessonEntry } from '@/lib/up-next'
import { trackForPath } from '@/lib/study-nav'
import { useMenuDisclosure } from '@/components/layout/useMenuDisclosure'

export const TRACKS_HREF = '/learn'

// Projects is listed under the header's Practice menu, so 'practice' is not listed here.
const AREA_GROUPS: { area: TrackArea; label: string }[] = [
  { area: 'data',        label: 'Data' },
  { area: 'cloud',       label: 'Cloud' },
  { area: 'ai',          label: 'AI & ML' },
  { area: 'programming', label: 'Programming' },
  { area: 'cs',          label: 'CS Core' },
  { area: 'security',    label: 'Security' },
]

function groupLiveTracks(tracks: TrackSummaries) {
  const live = Object.entries(tracks).filter(([, track]) => track.lessons > 0)
  return AREA_GROUPS
    .map(group => ({ ...group, tracks: live.filter(([, track]) => track.area === group.area) }))
    .filter(group => group.tracks.length > 0)
}

function TrackLinks({ tracks, pathname, onNavigate }: { tracks: TrackSummaries; pathname: string; onNavigate: () => void }) {
  return (
    <>
      {groupLiveTracks(tracks).map(group => (
        <div key={group.area}>
          <div className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
            {group.label}
          </div>
          <ul>
            {group.tracks.map(([slug, track]) => {
              const current = pathname === track.href
              return (
                <li key={slug}>
                  <Link
                    href={track.href}
                    aria-current={current ? 'page' : undefined}
                    onClick={onNavigate}
                    className="flex items-baseline justify-between gap-3 px-2 py-1.5 rounded-md text-sm hover:bg-[var(--bg2)]"
                    style={{ color: 'var(--text)', fontWeight: current ? 600 : 400 }}
                  >
                    <span>{track.title}</span>
                    <span className="text-xs flex-shrink-0" style={{ color: 'var(--muted)' }}>
                      {track.early ? 'Early · ' : ''}{track.lessons}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </>
  )
}

function PlaceRow({ tracks, lessons, continueLesson, onNavigate }: {
  tracks: TrackSummaries
  lessons: LessonEntry[]
  continueLesson: LessonEntry | null
  onNavigate: () => void
}) {
  const pathname = usePathname()
  const slug = trackForPath(pathname, lessons, tracks)
  const track = slug ? tracks[slug] : undefined
  const href = track?.href ?? continueLesson?.[0]
  const eyebrow = track ? 'Current track' : 'Continue'
  const title = track?.title ?? continueLesson?.[1]
  if (!href || !title) return null
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="block px-2 py-2 mb-4 rounded-md hover:bg-[var(--bg2)]"
    >
      <span className="block text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{eyebrow}</span>
      <span className="block text-sm font-semibold mt-0.5" style={{ color: 'var(--text)' }}>{title}</span>
    </Link>
  )
}

function AllTracksLink({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname()
  return (
    <Link href={TRACKS_HREF} onClick={onNavigate} aria-current={pathname === TRACKS_HREF ? 'page' : undefined}
      className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
      All tracks →
    </Link>
  )
}

export function TracksMenuDesktop({ tracks, lessons, continueLesson, active }: {
  tracks: TrackSummaries
  lessons: LessonEntry[]
  continueLesson: LessonEntry | null
  active: boolean
}) {
  const pathname = usePathname()
  const panelId = useId()
  const { open, setOpen, containerRef, buttonRef } = useMenuDisclosure()

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-current={active ? 'location' : undefined}
        aria-controls={panelId}
        onClick={() => setOpen(isOpen => !isOpen)}
        className="relative flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors"
        style={{ color: active || open ? 'var(--text)' : 'var(--muted)', fontWeight: active ? 600 : 400 }}
      >
        Tracks
        <ChevronDown size={13} aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', transformOrigin: 'center' }} />
        {active && (
          <span aria-hidden="true" className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full" style={{ background: 'var(--accent)' }} />
        )}
      </button>

      {open && (
        <div
          id={panelId}
          data-menu-panel
          className="absolute left-0 top-full mt-2 rounded-xl p-5"
          style={{ width: 'min(720px, calc(100vw - 48px))', background: 'var(--surface)', border: '1px solid var(--border2)', boxShadow: 'var(--shadow-lg)' }}
        >
          <PlaceRow tracks={tracks} lessons={lessons} continueLesson={continueLesson} onNavigate={() => setOpen(false)} />
          <div className="grid grid-cols-3 gap-x-6 gap-y-5">
            <TrackLinks tracks={tracks} pathname={pathname} onNavigate={() => setOpen(false)} />
          </div>
          <div className="mt-5 pt-4 flex justify-end" style={{ borderTop: '1px solid var(--border)' }}>
            <AllTracksLink onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export function TracksListMobile({ tracks, lessons, continueLesson, active, onNavigate }: {
  tracks: TrackSummaries
  lessons: LessonEntry[]
  continueLesson: LessonEntry | null
  active: boolean
  onNavigate: () => void
}) {
  const pathname = usePathname()
  const listId = useId()
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <button
        type="button"
        aria-expanded={expanded}
        aria-current={active ? 'location' : undefined}
        aria-controls={listId}
        onClick={() => setExpanded(isExpanded => !isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg"
        style={{ color: active ? 'var(--text)' : 'var(--text2)', fontWeight: active ? 600 : 400, background: active ? 'var(--bg2)' : 'transparent' }}
      >
        Tracks
        <ChevronDown size={14} aria-hidden="true" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', transformOrigin: 'center' }} />
      </button>
      {expanded && (
        <div id={listId} className="pl-2 pr-1 pt-2 pb-3 space-y-4">
          <PlaceRow tracks={tracks} lessons={lessons} continueLesson={continueLesson} onNavigate={onNavigate} />
          <TrackLinks tracks={tracks} pathname={pathname} onNavigate={onNavigate} />
          <div className="px-2"><AllTracksLink onNavigate={onNavigate} /></div>
        </div>
      )}
    </div>
  )
}
