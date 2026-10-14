'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { FolderKanban, Menu, X } from 'lucide-react'
import { ThemeChoice, ThemeMenu } from '@/components/ui/ThemePicker'
import { SiteSearch, type SearchResume } from '@/components/ui/SiteSearch'
import { TRACKS_HREF, TracksListMobile, TracksMenuDesktop } from '@/components/layout/TracksMenu'
import { PRACTICE_ITEMS, PracticeListMobile, PracticeMenuDesktop } from '@/components/layout/PracticeMenu'
import { RoadmapsListMobile, RoadmapsMenuDesktop } from '@/components/layout/RoadmapsMenu'
import { RESOURCE_ITEMS, ResourcesListMobile, ResourcesMenuDesktop } from '@/components/layout/ResourcesMenu'
import { LessonHeaderControls } from '@/components/layout/LessonRow'
import { ReadingLine } from '@/components/layout/ReadingLine'
import { useLessonChrome } from '@/lib/lesson-chrome'
import { useLearnerProgress, type LearnerProgress } from '@/components/layout/useLearnerProgress'
import { useMenuDisclosure } from '@/components/layout/useMenuDisclosure'
import { useIsLessonPage } from '@/lib/lesson-page'
import type { HeaderData } from '@/lib/lesson-nav'
import { BrandLogo } from '@/components/layout/BrandLogo'

type NavItem = { label: string; href: string }

// Blog and the Industry guide live in the footer and search.
const ROADMAPS: NavItem = { label: 'Roadmaps', href: '/learn/roadmap' }
const PROJECTS: NavItem = { label: 'Projects', href: '/learn/projects' }
const CAREER_PREP: NavItem = { label: 'Career prep', href: '/learn/interview' }

// Longest matching prefix wins, so /learn/roadmap/x highlights Roadmaps and
// /learn/sql/playground highlights Practice, not Tracks.
function getActiveHref(pathname: string): string | null {
  const candidates = [TRACKS_HREF, ROADMAPS.href, PROJECTS.href, CAREER_PREP.href, ...PRACTICE_ITEMS.map(i => i.href), ...RESOURCE_ITEMS.map(i => i.href)]
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
      className="site-header fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center gap-1 min-[1200px]:gap-3"
      style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
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
        className="brand flex items-center flex-shrink-0 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        <BrandLogo priority />
      </Link>

      {lesson ? (
        <LessonHeaderControls nav={lesson} />
      ) : (
        <nav aria-label="Main" className="desktop-nav hidden min-[768px]:block">
          <ul className="site-primary-nav flex items-center gap-0 min-[1200px]:gap-1">
            <li>
              <TracksMenuDesktop
                header={header}
                completedByTrack={learner.completedByTrack}
                active={activeHref === TRACKS_HREF}
                onOpenChange={open => { if (open) setTracksOpened(true) }}
              />
            </li>
            <li><RoadmapsMenuDesktop header={header} active={activeHref === ROADMAPS.href} /></li>
            <li><DesktopLink item={PROJECTS} active={activeHref === PROJECTS.href} count={projectCount} /></li>
            <li><PracticeMenuDesktop activeHref={activeHref} /></li>
            <li><DesktopLink item={CAREER_PREP} active={activeHref === CAREER_PREP.href} /></li>
            <li><ResourcesMenuDesktop activeHref={activeHref} /></li>
          </ul>
        </nav>
      )}

      <div className="ml-auto flex items-center gap-1 min-[1200px]:gap-2 flex-shrink-0">
        <SiteSearch resume={resume} tracks={searchTracks} />
        {!lesson && (
          <div className="header-theme hidden min-[1200px]:block">
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
    <div ref={containerRef} className="header-menu min-[768px]:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="site-header-icon-button w-11 h-11 flex items-center justify-center rounded-[10px] flex-shrink-0"
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
          <div className="h-[72px] flex-shrink-0 flex items-center justify-between px-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <span aria-hidden="true">
              <BrandLogo />
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="site-header-icon-button w-11 h-11 flex items-center justify-center rounded-[10px]"
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
                style={{ background: 'var(--brand-soft)', border: '1px solid var(--border2)' }}
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
            <MobileLink item={PROJECTS} active={activeHref === PROJECTS.href} onNavigate={navigate} count={projectCount} />
            <PracticeListMobile activeHref={activeHref} onNavigate={navigate} />
            <MobileLink item={CAREER_PREP} active={activeHref === CAREER_PREP.href} onNavigate={navigate} />
            <ResourcesListMobile activeHref={activeHref} onNavigate={navigate} />
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
  const base = 'site-header-cta resume-slot flex items-center h-11 min-[1200px]:h-10 px-3 min-[1200px]:px-2.5 rounded-xl text-sm font-semibold whitespace-nowrap flex-shrink-0'
  const style = { textDecoration: 'none' }

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
        <span className="hidden min-[1440px]:inline min-[1600px]:hidden font-medium">&nbsp;· Lesson {position}</span>
        <span className="hidden min-[1600px]:inline font-medium truncate">&nbsp;· {title}</span>
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
      <span className="min-[1200px]:hidden">Start learning</span>
      <span className="hidden min-[1200px]:inline">Start learning&nbsp;→</span>
    </Link>
  )
}

function DesktopLink({ item, active, count }: { item: NavItem; active: boolean; count?: number }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className="site-nav-control relative flex items-center gap-1.5 h-11 px-1.5 min-[900px]:px-2 min-[1200px]:px-2 rounded-xl text-[13px] min-[1200px]:text-sm transition-colors whitespace-nowrap"
      style={{ color: active ? 'var(--text)' : 'var(--text2)', fontWeight: active ? 600 : 500 }}
    >
      {item.href === PROJECTS.href && <FolderKanban className="hidden min-[1440px]:block" size={14} aria-hidden="true" />}
      {item.label}
      {count !== undefined && <span className="hidden min-[1200px]:inline-flex min-w-5 justify-center rounded-full px-1 text-[10px] font-medium" style={{ background: 'var(--bg2)', color: 'var(--muted)' }}>{count}</span>}
    </Link>
  )
}

function MobileLink({ item, active, onNavigate, count }: { item: NavItem; active: boolean; onNavigate: () => void; count?: number }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className="flex items-center justify-between min-h-[50px] px-3 text-base font-semibold rounded-lg"
      style={{ color: 'var(--text)', background: active ? 'var(--bg2)' : 'transparent' }}
      onClick={onNavigate}
    >
      {item.label}
      {count !== undefined && <span className="text-sm font-normal" style={{ color: 'var(--muted)' }}>{count}</span>}
    </Link>
  )
}
