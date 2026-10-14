'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useId, useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import type { TrackArea } from '@/lib/catalog/types'
import type { HeaderData, TrackSummary } from '@/lib/lesson-nav'
import { useMenuDisclosure } from '@/components/layout/useMenuDisclosure'

export const TRACKS_HREF = '/learn'
const PROGRESS_HREF = '/dashboard'
const START_HERE = 'foundations'

const AREA_LABELS: Record<Exclude<TrackArea, 'practice'>, string> = {
  data: 'Data',
  programming: 'Programming',
  cs: 'CS Core',
  ai: 'AI & ML',
  cloud: 'Cloud',
  security: 'Security',
}

// Desktop columns. Projects ('practice') is listed under Practice, not here.
const COLUMNS: (keyof typeof AREA_LABELS)[][] = [['data'], ['programming', 'cs'], ['ai', 'cloud', 'security']]

type TrackEntry = [slug: string, track: TrackSummary]

function liveTracksIn(tracks: HeaderData['tracks'], area: TrackArea): TrackEntry[] {
  return Object.entries(tracks).filter(([, track]) => track.area === area && track.lessons > 0)
}

function isInTrack(pathname: string, slug: string, track: TrackSummary) {
  return pathname === track.href || pathname.startsWith(`/learn/${slug}/`)
}

function TrackRow({ slug, track, completed, pathname, onNavigate, tall = false }: {
  slug: string
  track: TrackSummary
  completed: number
  pathname: string
  onNavigate: () => void
  tall?: boolean
}) {
  const current = isInTrack(pathname, slug, track)
  return (
    <li>
      <Link
        href={track.href}
        aria-current={pathname === track.href ? 'page' : undefined}
        onClick={onNavigate}
        className={`flex items-start justify-between gap-3 px-2 -mx-2 rounded-md text-sm hover:bg-[var(--bg3)] ${tall ? 'py-2' : 'py-1.5'}`}
        style={{ color: 'var(--text)', fontWeight: current ? 600 : 400 }}
      >
        <span className="min-w-0">
          <span className="block">
            {track.title}
            {slug === START_HERE && <span className="text-xs font-normal" style={{ color: 'var(--muted)' }}> · start here</span>}
          </span>
          {track.blurb && (
            <span className="block text-xs font-normal mt-0.5" style={{ color: 'var(--muted)' }}>{track.blurb}</span>
          )}
        </span>
        <span className="flex items-center gap-1.5 flex-shrink-0 text-xs">
          {completed > 0 ? (
            <span className="font-medium" style={{ color: 'var(--green)' }}>{completed} completed</span>
          ) : (
            <>
              {track.early && (
                <span className="px-1.5 py-0.5 rounded font-mono text-[10px] font-semibold" style={{ background: 'rgba(245,158,11,0.14)', color: 'var(--gold)' }}>
                  EARLY
                </span>
              )}
              <span style={{ color: 'var(--muted)' }}>{track.lessons}</span>
            </>
          )}
        </span>
      </Link>
    </li>
  )
}

function AreaGroup({ idPrefix, area, header, completedByTrack, pathname, onNavigate, tall }: {
  idPrefix: string
  area: keyof typeof AREA_LABELS
  header: HeaderData
  completedByTrack: Record<string, number>
  pathname: string
  onNavigate: () => void
  tall?: boolean
}) {
  const tracks = liveTracksIn(header.tracks, area)
  if (!tracks.length) return null
  const headingId = `${idPrefix}-${area}`
  return (
    <div>
      <div id={headingId} className="pb-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
        {AREA_LABELS[area]}
      </div>
      <ul aria-labelledby={headingId}>
        {tracks.map(([slug, track]) => (
          <TrackRow key={slug} slug={slug} track={track} completed={completedByTrack[slug] ?? 0} pathname={pathname} onNavigate={onNavigate} tall={tall} />
        ))}
      </ul>
    </div>
  )
}

export function TracksMenuDesktop({ header, completedByTrack, active, onOpenChange }: {
  header: HeaderData
  completedByTrack: Record<string, number>
  active: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const pathname = usePathname()
  const panelId = useId()
  const { open, setOpen, close, containerRef, buttonRef } = useMenuDisclosure()
  const toggle = () => {
    const nextOpen = !open
    if (nextOpen) onOpenChange?.(true)
    setOpen(nextOpen)
  }
  const navigate = () => setOpen(false)

  return (
    <div ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-current={active ? 'location' : undefined}
        aria-controls={panelId}
        onClick={toggle}
        className="site-nav-control relative flex items-center gap-1 h-11 px-3 rounded-xl text-sm transition-colors"
        style={{ color: active || open ? 'var(--text)' : 'var(--text2)', fontWeight: active || open ? 600 : 500, background: open ? 'var(--brand-soft)' : 'transparent' }}
      >
        Learning paths
        <ChevronDown size={13} aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', transformOrigin: 'center' }} />
      </button>

      {open && (
        <div
          id={panelId}
          data-menu-panel
          role="dialog"
          aria-label="Learning paths"
          className="site-header-menu fixed left-1/2 top-[80px] z-40 w-[min(1320px,calc(100vw-48px))] -translate-x-1/2 max-h-[calc(100vh-6rem)] overflow-y-auto"
        >
          <div className="relative px-7 pt-6 pb-5 sm:px-8 sm:pt-7">
            <div className="mb-5 flex items-end justify-between gap-4 border-b pb-4 pr-14" style={{ borderColor: 'var(--border)' }}>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Explore learning paths</p>
                <p className="mt-1 text-xs" style={{ color: 'var(--muted)' }}>Structured lessons to help you build practical skills, step by step.</p>
              </div>
              <span className="hidden rounded-full px-3 py-1 text-xs font-medium sm:inline-flex" style={{ background: 'var(--brand-soft)', color: 'var(--brand-green)' }}>
                {header.trackCount} paths · {header.lessonCount} lessons
              </span>
            </div>
            <div className="grid grid-cols-3 gap-10">
              {COLUMNS.map((areas, i) => (
                <div key={i} className="flex flex-col gap-6">
                  {areas.map(area => (
                    <AreaGroup key={area} idPrefix={panelId} area={area} header={header} completedByTrack={completedByTrack} pathname={pathname} onNavigate={navigate} />
                  ))}
                </div>
              ))}
            </div>
            <button
              type="button"
              aria-label="Close learning paths"
              onClick={close}
              className="site-header-icon-button absolute right-5 top-4 w-10 h-10 flex items-center justify-center rounded-xl"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
          <div className="px-7 py-3.5 flex flex-wrap justify-between gap-2 text-[13px] sm:px-8" style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
            <span>
              {header.lessonCount} lessons across {header.trackCount} learning paths ·{' '}
              <Link href={TRACKS_HREF} onClick={navigate} style={{ color: 'var(--brand-green)' }}>Browse all paths</Link>
            </span>
            <span>
              Your learning progress is saved in this browser ·{' '}
              <Link href={PROGRESS_HREF} onClick={navigate} style={{ color: 'var(--brand-green)' }}>View progress</Link>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export function TracksListMobile({ header, completedByTrack, resumeTrack, active, onNavigate, onExpand }: {
  header: HeaderData
  completedByTrack: Record<string, number>
  /** The track Continue points into; listed first under Your tracks. */
  resumeTrack: string | null
  active: boolean
  onNavigate: () => void
  onExpand?: () => void
}) {
  const pathname = usePathname()
  const listId = useId()
  const [expanded, setExpanded] = useState(false)
  const yours = Object.entries(header.tracks)
    .filter(([slug]) => slug === resumeTrack || (completedByTrack[slug] ?? 0) > 0)
    .sort(([a], [b]) => Number(b === resumeTrack) - Number(a === resumeTrack))

  return (
    <div>
      <button
        type="button"
        aria-expanded={expanded}
        aria-current={active ? 'location' : undefined}
        aria-controls={listId}
        onClick={() => setExpanded(isExpanded => { if (!isExpanded) onExpand?.(); return !isExpanded })}
        className="w-full min-h-[50px] flex items-center justify-between px-3 text-base font-semibold rounded-xl"
        style={{ color: 'var(--text)', background: active ? 'var(--bg2)' : 'transparent' }}
      >
        Learning paths
        <span className="flex items-center gap-2 text-[13px] font-normal" style={{ color: 'var(--muted)' }}>
          {header.trackCount}
          <ChevronDown size={14} aria-hidden="true" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', transformOrigin: 'center' }} />
        </span>
      </button>
      {expanded && (
        <div id={listId} className="px-3 pt-1 pb-3 space-y-4">
          {yours.length > 0 && (
            <div>
              <div className="pb-1 font-mono text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Your learning</div>
              <ul>
                {yours.map(([slug, track]) => (
                  <TrackRow key={slug} slug={slug} track={track} completed={completedByTrack[slug] ?? 0} pathname={pathname} onNavigate={onNavigate} tall />
                ))}
              </ul>
            </div>
          )}
          {COLUMNS.flat().map(area => (
            <AreaGroup key={area} idPrefix={listId} area={area} header={header} completedByTrack={{}} pathname={pathname} onNavigate={onNavigate} tall />
          ))}
          <Link href={TRACKS_HREF} onClick={onNavigate} className="flex items-center min-h-11 text-sm font-semibold" style={{ color: 'var(--brand-green)' }}>
            All {header.trackCount} learning paths →
          </Link>
        </div>
      )}
    </div>
  )
}
