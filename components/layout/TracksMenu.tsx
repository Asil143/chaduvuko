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
        className={`flex items-center justify-between gap-3 px-2 -mx-2 rounded-md text-sm hover:bg-[var(--bg3)] ${tall ? 'min-h-11' : 'py-1.5'}`}
        style={{ color: 'var(--text)', fontWeight: current ? 600 : 400 }}
      >
        <span className="min-w-0">
          {track.title}
          {slug === START_HERE && <span className="text-xs font-normal" style={{ color: 'var(--muted)' }}> · start here</span>}
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
  const toggle = () => setOpen(isOpen => { onOpenChange?.(!isOpen); return !isOpen })
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
        className="relative flex items-center gap-1 h-10 px-3 rounded-lg text-sm transition-colors"
        style={{ color: active || open ? 'var(--text)' : 'var(--text2)', fontWeight: active || open ? 600 : 400, background: open ? 'var(--bg2)' : 'transparent' }}
      >
        Tracks
        <ChevronDown size={13} aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', transformOrigin: 'center' }} />
        {active && (
          <span aria-hidden="true" className="absolute left-3 right-3 bottom-0.5 h-0.5 rounded-full" style={{ background: 'var(--accent)' }} />
        )}
      </button>

      {open && (
        <div
          id={panelId}
          data-menu-panel
          role="dialog"
          aria-label="Tracks"
          className="fixed left-0 right-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto"
          style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border2)', boxShadow: 'var(--shadow-lg)' }}
        >
          <div className="relative max-w-[1400px] mx-auto px-8 pt-6 pb-5 flex gap-8">
            <div className="flex-1 grid grid-cols-3 gap-10">
              {COLUMNS.map((areas, i) => (
                <div key={i} className="flex flex-col gap-6">
                  {areas.map(area => (
                    <AreaGroup key={area} idPrefix={panelId} area={area} header={header} completedByTrack={completedByTrack} pathname={pathname} onNavigate={navigate} />
                  ))}
                </div>
              ))}
            </div>
            <div className="hidden xl:flex flex-col w-[270px] pl-6 pr-10" style={{ borderLeft: '1px solid var(--border)' }}>
              <div id={`${panelId}-roadmaps`} className="pb-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                Featured roadmaps
              </div>
              <ul aria-labelledby={`${panelId}-roadmaps`}>
                {header.featuredRoadmaps.map(roadmap => (
                  <li key={roadmap.href}>
                    <Link href={roadmap.href} onClick={navigate} className="block py-1.5 rounded-md hover:underline">
                      <span className="block text-sm font-semibold" style={{ color: 'var(--text)' }}>{roadmap.title}</span>
                      <span className="block text-xs" style={{ color: 'var(--muted)' }}>{roadmap.blurb}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/learn/roadmap" onClick={navigate} className="pt-2.5 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                All {header.roadmapCount} roadmaps →
              </Link>
            </div>
            <button
              type="button"
              aria-label="Close tracks"
              onClick={close}
              className="absolute right-6 top-4 w-10 h-10 flex items-center justify-center rounded-lg"
              style={{ background: 'var(--bg3)', color: 'var(--text2)' }}
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
          <div className="max-w-[1400px] mx-auto px-8 py-3 flex flex-wrap justify-between gap-2 text-[13px]" style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
            <span>
              {header.lessonCount} lessons in {header.trackCount} tracks ·{' '}
              <Link href={TRACKS_HREF} onClick={navigate} style={{ color: 'var(--accent)' }}>Browse all tracks</Link>
            </span>
            <span>
              Progress is saved in this browser, no account needed ·{' '}
              <Link href={PROGRESS_HREF} onClick={navigate} style={{ color: 'var(--accent)' }}>Your progress</Link>
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
        className="w-full min-h-[50px] flex items-center justify-between px-3 text-base font-semibold rounded-lg"
        style={{ color: 'var(--text)', background: active ? 'var(--bg2)' : 'transparent' }}
      >
        Tracks
        <span className="flex items-center gap-2 text-[13px] font-normal" style={{ color: 'var(--muted)' }}>
          {header.trackCount}
          <ChevronDown size={14} aria-hidden="true" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', transformOrigin: 'center' }} />
        </span>
      </button>
      {expanded && (
        <div id={listId} className="px-3 pt-1 pb-3 space-y-4">
          {yours.length > 0 && (
            <div>
              <div className="pb-1 font-mono text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Your tracks</div>
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
          <Link href={TRACKS_HREF} onClick={onNavigate} className="flex items-center min-h-11 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
            All {header.trackCount} tracks →
          </Link>
        </div>
      )}
    </div>
  )
}
