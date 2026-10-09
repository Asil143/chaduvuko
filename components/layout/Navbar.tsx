'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeChoice, ThemeMenu } from '@/components/ui/ThemePicker'
import { SiteSearch } from '@/components/ui/SiteSearch'
import { TRACKS_HREF, TracksListMobile, TracksMenuDesktop } from '@/components/layout/TracksMenu'
import { PRACTICE_ITEMS, PracticeListMobile, PracticeMenuDesktop } from '@/components/layout/PracticeMenu'
import { useLearnerProgress, type LearnerProgress } from '@/components/layout/useLearnerProgress'
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
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  // The lesson index is needed for the Continue slot (hidden on lessons) and for
  // per-track completion counts once a track list is opened.
  const learner = useLearnerProgress(!isLessonPage || tracksOpened || mobileOpen)
  const projectCount = header.tracks.projects?.lessons ?? 0

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMobileOpen(false)
      menuButtonRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  const closeMenu = () => setMobileOpen(false)

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
        className="flex items-center flex-shrink-0 lg:mr-4"
        style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, textDecoration: 'none' }}
      >
        <span style={{ color: 'var(--text)' }}>Chadu</span>
        <span style={{ color: 'var(--brand-green)' }}>vuko</span>
      </Link>

      <nav aria-label="Main" className="hidden lg:block">
        <ul className="flex items-center gap-0.5">
          <li>
            <TracksMenuDesktop
              header={header}
              completedByTrack={learner.completedByTrack}
              active={activeHref === TRACKS_HREF}
              onOpenChange={open => { if (open) setTracksOpened(true) }}
            />
          </li>
          <li><DesktopLink item={ROADMAPS} active={activeHref === ROADMAPS.href} /></li>
          <li><PracticeMenuDesktop activeHref={activeHref} projectCount={projectCount} /></li>
          <li><DesktopLink item={INTERVIEW} active={activeHref === INTERVIEW.href} /></li>
        </ul>
      </nav>

      <div className="ml-auto flex items-center gap-1 sm:gap-2 flex-shrink-0">
        <SiteSearch />
        <div className="hidden lg:block">
          <ThemeMenu />
        </div>
        <ResumeSlot learner={learner} tracks={header.tracks} />
        <button
          ref={menuButtonRef}
          type="button"
          className="lg:hidden w-11 h-11 flex items-center justify-center rounded-[10px] flex-shrink-0"
          aria-label={mobileOpen ? 'Close menu' : 'Menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen(open => !open)}
          style={{ background: mobileOpen ? 'var(--bg2)' : 'transparent' }}
        >
          {mobileOpen
            ? <X size={20} aria-hidden="true" style={{ color: 'var(--text)' }} />
            : <Menu size={20} aria-hidden="true" style={{ color: 'var(--text)' }} />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label="Menu"
          className="absolute top-16 left-0 right-0 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto p-3 lg:hidden"
          style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}
        >
          <TracksListMobile
            header={header}
            completedByTrack={learner.completedByTrack}
            resumeTrack={learner.resume?.track ?? null}
            active={activeHref === TRACKS_HREF}
            onNavigate={closeMenu}
          />
          <MobileLink item={ROADMAPS} active={activeHref === ROADMAPS.href} onNavigate={closeMenu} />
          <PracticeListMobile activeHref={activeHref} projectCount={projectCount} onNavigate={closeMenu} />
          <MobileLink item={INTERVIEW} active={activeHref === INTERVIEW.href} onNavigate={closeMenu} />
          <div className="mt-2 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
            <ThemeChoice />
            <p className="px-3 pt-1 pb-2 text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
              Progress is saved in this browser, no account needed.{' '}
              <Link href="/dashboard" onClick={closeMenu} style={{ color: 'var(--accent)' }}>Your progress</Link>
            </p>
          </div>
        </nav>
      )}
    </header>
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
