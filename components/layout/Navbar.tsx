'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeChoice, ThemeMenu } from '@/components/ui/ThemePicker'
import { SiteSearch, type SearchResume } from '@/components/ui/SiteSearch'
import { TRACKS_HREF, TracksListMobile, TracksMenuDesktop } from '@/components/layout/TracksMenu'
import { PRACTICE_ITEMS, PracticeListMobile, PracticeMenuDesktop } from '@/components/layout/PracticeMenu'
import { RoadmapsListMobile, RoadmapsMenuDesktop } from '@/components/layout/RoadmapsMenu'
import { LessonHeaderControls } from '@/components/layout/LessonRow'
import { ReadingLine } from '@/components/layout/ReadingLine'
import { useLessonChrome } from '@/lib/lesson-chrome'
import { useLearnerProgress, type LearnerProgress } from '@/components/layout/useLearnerProgress'
import { useMenuDisclosure } from '@/components/layout/useMenuDisclosure'
import { useIsLessonPage } from '@/lib/lesson-page'
import type { HeaderData } from '@/lib/lesson-nav'

type NavItem = { label: string; href: string }

// Blog and the Industry guide live in the footer and search.
const ROADMAPS: NavItem = { label: 'Roadmaps', href: '/learn/roadmap' }
const INTERVIEW: NavItem = { label: 'Interview Prep', href: '/learn/interview' }

// Longest matching prefix wins, so /learn/roadmap/x highlights Roadmaps and
// /learn/sql/playground highlights Practice, not Tracks.
function getActiveHref(pathname: string): string | null {
  const candidates = [TRACKS_HREF, ROADMAPS.href, INTERVIEW.href, ...PRACTICE_ITEMS.map(i => i.href)]
  let best: string | null = null
  for (const href of candidates) {
    const matches = pathname === href || pathname.startsWith(href + '/')
    if (matches && (!best || href.length > best.length)) best = href
  }
  return best
}

export function Navbar({ header }: { header: HeaderData }) {
  const pathname = usePathname()
  const activeHref = getActiveHref(pathname)
  const isLessonPage = useIsLessonPage()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [tracksOpened, setTracksOpened] = useState(false)
  // The lesson index is needed for the Continue slot (hidden on lessons) and for
  // per-track completion counts once a track list is opened.
  const learner = useLearnerProgress(!isLessonPage || tracksOpened || mobileOpen)
  const lesson = useLessonChrome()
  const projectCount = header.tracks.projects?.lessons ?? 0
  const searchTracks = useMemo(
    () => Object.values(header.tracks)
      .filter(track => track.area !== 'practice' && track.lessons > 0)
      .map(track => ({ href: track.href, title: track.title, context: `${track.lessons} lessons`, kind: 'track' as const })),
    [header.tracks],
  )
  const resume = learner.status === 'ready' && learner.resume
    ? {
        href: learner.resume.href,
        title: learner.resume.title,
        detail: `${header.tracks[learner.resume.track]?.title ?? ''} · Lesson ${learner.resume.position} of ${learner.resume.trackSize}`,
      }
    : null

  return (
    <header
      className="site-header fixed top-0 left-0 right-0 z-50 h-16 flex items-center gap-1 sm:gap-2 pl-3.5 pr-2 sm:px-4 lg:px-6"
      style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:px-4 focus:py-2 focus:text-sm"
        style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border2)' }}
      >
        Skip to content
      </a>

      <Link
        href="/"
        aria-label="Chaduvuko home"
        className="brand flex items-center flex-shrink-0 lg:mr-4"
        style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, textDecoration: 'none' }}
      >
        <span style={{ color: 'var(--text)' }}>Chadu</span>
        <span style={{ color: 'var(--brand-green)' }}>vuko</span>
      </Link>

      {lesson ? (
        <LessonHeaderControls nav={lesson} />
      ) : (
        <nav aria-label="Main" className="desktop-nav hidden lg:block">
          <ul className="flex items-center gap-0.5">
            <li>
              <TracksMenuDesktop
                header={header}
                completedByTrack={learner.completedByTrack}
                active={activeHref === TRACKS_HREF}
                onOpenChange={open => { if (open) setTracksOpened(true) }}
              />
            </li>
            <li><RoadmapsMenuDesktop header={header} active={activeHref === ROADMAPS.href} /></li>
            <li><PracticeMenuDesktop activeHref={activeHref} projectCount={projectCount} /></li>
            <li><DesktopLink item={INTERVIEW} active={activeHref === INTERVIEW.href} /></li>
          </ul>
        </nav>
      )}

      <div className="ml-auto flex items-center gap-1 sm:gap-2 flex-shrink-0">
        <SiteSearch resume={resume} tracks={searchTracks} />
        {!lesson && (
          <div className="header-theme hidden lg:block">
            <ThemeMenu />
          </div>
        )}
        <ResumeSlot learner={learner} tracks={header.tracks} />
        <MobileMenu
          header={header}
          learner={learner}
          resume={resume}
          activeHref={activeHref}
          projectCount={projectCount}
          onOpenChange={setMobileOpen}
        />
      </div>
      {lesson && <ReadingLine />}
    </header>
  )
}

/** Phones and tablets: a full-screen modal menu with the same destinations as the bar. */
function MobileMenu({ header, learner, resume, activeHref, projectCount, onOpenChange }: {
  header: HeaderData
  learner: LearnerProgress
  resume: SearchResume | null
  activeHref: string | null
  projectCount: number
  onOpenChange: (open: boolean) => void
}) {
  const { open, setOpen, close, containerRef, buttonRef } = useMenuDisclosure()
  const isLessonPage = useIsLessonPage()
  const navigate = () => setOpen(false)

  useEffect(() => {
    onOpenChange(open)
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [open, onOpenChange])

  return (
    <div ref={containerRef} className="header-menu lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="w-11 h-11 flex items-center justify-center rounded-[10px] flex-shrink-0"
        aria-label="Menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        <Menu size={20} aria-hidden="true" style={{ color: 'var(--text)' }} />
      </button>

      {open && (
        <div
          id="mobile-menu"
          data-menu-panel
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col"
          style={{ background: 'var(--surface)' }}
        >
          <div className="h-16 flex-shrink-0 flex items-center justify-between pl-3.5 pr-2" style={{ borderBottom: '1px solid var(--border)' }}>
            <span aria-hidden="true" style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.03em' }}>
              <span style={{ color: 'var(--text)' }}>Chadu</span><span style={{ color: 'var(--brand-green)' }}>vuko</span>
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="w-11 h-11 flex items-center justify-center rounded-[10px]"
              style={{ background: 'var(--bg2)' }}
            >
              <X size={20} aria-hidden="true" style={{ color: 'var(--text)' }} />
            </button>
          </div>

          <nav aria-label="Menu" className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
            {isLessonPage && (
              <button
                type="button"
                className="flex items-center w-full min-h-[50px] px-3 mb-1 text-base font-semibold rounded-lg"
                style={{ color: 'var(--text)' }}
                onClick={() => {
                  setOpen(false)
                  requestAnimationFrame(() => document.querySelector<HTMLButtonElement>('.search-trigger')?.click())
                }}
              >
                Search
              </button>
            )}
            {resume && (
              <Link
                href={resume.href}
                onClick={navigate}
                aria-label={`Continue ${resume.detail}: ${resume.title}`}
                className="block mb-2 px-3.5 py-3 rounded-xl"
                style={{ background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.3)' }}
              >
                <span className="block font-mono text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--green)' }}>
                  Continue · {header.tracks[learner.resume!.track]?.title}
                </span>
                <span className="block mt-1 text-[15px] font-bold leading-snug" style={{ color: 'var(--text)' }}>{resume.title}</span>
                <span className="block mt-1 text-xs" style={{ color: 'var(--muted)' }}>Lesson {learner.resume!.position} of {learner.resume!.trackSize}</span>
              </Link>
            )}
            <TracksListMobile
              header={header}
              completedByTrack={learner.completedByTrack}
              resumeTrack={learner.resume?.track ?? null}
              active={activeHref === TRACKS_HREF}
              onNavigate={navigate}
            />
            <RoadmapsListMobile header={header} active={activeHref === ROADMAPS.href} onNavigate={navigate} />
            <PracticeListMobile activeHref={activeHref} projectCount={projectCount} onNavigate={navigate} />
            <MobileLink item={INTERVIEW} active={activeHref === INTERVIEW.href} onNavigate={navigate} />
            <div className="mt-2 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
              <ThemeChoice />
              <p className="px-3 pt-1 pb-2 text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                Progress is saved in this browser, no account needed.{' '}
                <Link href="/dashboard" onClick={navigate} style={{ color: 'var(--accent)' }}>Your progress</Link>
              </p>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}

/**
 * Continue (a returning learner) or Start (no saved progress). Lesson pages hide it with CSS,
 * since Next is the action there. While progress loads, an invisible Start keeps the width.
 */
function ResumeSlot({ learner, tracks }: { learner: LearnerProgress; tracks: HeaderData['tracks'] }) {
  const base = 'resume-slot flex items-center h-11 lg:h-10 px-3 lg:px-3.5 rounded-[10px] text-sm font-bold whitespace-nowrap flex-shrink-0'
  const style = { background: 'var(--green)', color: '#04140a', textDecoration: 'none' }

  if (learner.status === 'ready' && learner.resume) {
    const { href, title, track, position, trackSize } = learner.resume
    const trackTitle = tracks[track]?.title ?? ''
    return (
      <Link
        href={href}
        title={title}
        aria-label={`Continue ${trackTitle}, lesson ${position} of ${trackSize}: ${title}`}
        className={`${base} max-w-[270px] overflow-hidden`}
        style={style}
      >
        <span>Continue</span>
        <span className="hidden lg:inline xl:hidden font-medium">&nbsp;· Lesson {position}</span>
        <span className="hidden xl:inline font-medium truncate">&nbsp;· {title}</span>
      </Link>
    )
  }

  return (
    <Link
      href={TRACKS_HREF}
      aria-hidden={learner.status === 'pending' ? true : undefined}
      tabIndex={learner.status === 'pending' ? -1 : undefined}
      className={`${base} ${learner.status === 'pending' ? 'invisible' : ''}`}
      style={style}
    >
      <span className="lg:hidden">Start</span>
      <span className="hidden lg:inline">Start learning →</span>
    </Link>
  )
}

function DesktopLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className="relative flex items-center h-10 px-3 rounded-lg text-sm transition-colors whitespace-nowrap"
      style={{ color: active ? 'var(--text)' : 'var(--text2)', fontWeight: active ? 600 : 400 }}
    >
      {item.label}
      {active && (
        <span aria-hidden="true" className="absolute left-3 right-3 bottom-0.5 h-0.5 rounded-full" style={{ background: 'var(--accent)' }} />
      )}
    </Link>
  )
}

function MobileLink({ item, active, onNavigate }: { item: NavItem; active: boolean; onNavigate: () => void }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className="flex items-center min-h-[50px] px-3 text-base font-semibold rounded-lg"
      style={{ color: 'var(--text)', background: active ? 'var(--bg2)' : 'transparent' }}
      onClick={onNavigate}
    >
      {item.label}
    </Link>
  )
}
