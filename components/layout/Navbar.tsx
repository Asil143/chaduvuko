'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemePicker } from '@/components/ui/ThemePicker'
import { SiteSearch } from '@/components/ui/SiteSearch'
import { TRACKS_HREF, TracksListMobile, TracksMenuDesktop } from '@/components/layout/TracksMenu'
import { PRACTICE_ITEMS, PracticeListMobile, PracticeMenuDesktop } from '@/components/layout/PracticeMenu'
import type { TrackSummaries } from '@/lib/lesson-nav'
import type { LessonEntry } from '@/lib/up-next'
import { studyContext, type StudyContext } from '@/lib/study-nav'
import { useContinueLesson } from '@/components/layout/useContinueLesson'

type NavItem = { label: string; href: string }

// Blog and the Industry guide live in the footer and search.
const ROADMAPS: NavItem = { label: 'Roadmaps', href: '/learn/roadmap' }
const INTERVIEW: NavItem = { label: 'Interview', href: '/learn/interview' }

const START_HREF = TRACKS_HREF

const ctaStyle = {
  fontSize: '12px',
  fontWeight: 700,
  borderRadius: '6px',
  background: 'var(--green)',
  color: '#000',
  textDecoration: 'none',
  whiteSpace: 'nowrap' as const,
}

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

export function Navbar({ tracks, lessons }: { tracks: TrackSummaries; lessons: LessonEntry[] }) {
  const continueLesson = useContinueLesson()
  const cta = continueLesson
    ? { href: continueLesson[0], label: 'Continue', wide: 'Continue →', title: `Continue: ${continueLesson[1]}` }
    : { href: START_HREF, label: 'Start', wide: 'Start Learning →', title: undefined }
  const pathname = usePathname()
  const study = studyContext(pathname, lessons, tracks)
  const activeHref = getActiveHref(pathname)
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

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
      className="site-header fixed top-0 left-0 right-0 z-50 h-16 flex items-center gap-3 px-4 md:px-6"
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
        className="flex items-center flex-shrink-0"
        style={{ fontSize: '21px', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, textDecoration: 'none' }}
      >
        <span style={{ color: 'var(--text)' }}>Chadu</span>
        <span style={{ color: 'var(--brand-green)' }}>vuko</span>
      </Link>

      {study ? (
        <StudyTrail study={study} />
      ) : (
        <nav aria-label="Main" className="hidden lg:block mx-2">
          <ul className="flex items-center gap-0.5">
            <li>
              <TracksMenuDesktop tracks={tracks} lessons={lessons} continueLesson={continueLesson} active={activeHref === TRACKS_HREF} />
            </li>
            <li><DesktopLink item={ROADMAPS} active={activeHref === ROADMAPS.href} /></li>
            <li>
              <PracticeMenuDesktop activeHref={activeHref} />
            </li>
            <li><DesktopLink item={INTERVIEW} active={activeHref === INTERVIEW.href} /></li>
          </ul>
        </nav>
      )}

      <div className={`flex items-center gap-2 flex-shrink-0 ${study ? 'ml-auto sm:ml-0' : 'ml-auto'}`}>
        <SiteSearch />
        <div className="hidden lg:block">
          <ThemePicker />
        </div>
        {study ? (
          <Link href={study.nextHref} title={study.nextTitle} aria-label={`${study.nextLabel}: ${study.nextTitle}`} className="px-2.5 sm:px-3.5 py-[5px]" style={ctaStyle}>
            <span className="sm:hidden">{study.nextLabel}</span>
            <span className="hidden sm:inline">{study.nextLabel} →</span>
          </Link>
        ) : (
          <Link href={cta.href} title={cta.title} aria-label={cta.title ?? cta.wide} className="px-2.5 sm:px-3.5 py-[5px]" style={ctaStyle}>
            <span className="sm:hidden">{cta.label}</span>
            <span className="hidden sm:inline">{cta.wide}</span>
          </Link>
        )}
        <button
          ref={menuButtonRef}
          type="button"
          className={study ? 'p-2 flex-shrink-0' : 'lg:hidden p-2 flex-shrink-0'}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen(open => !open)}
        >
          {mobileOpen
            ? <X size={20} style={{ color: 'var(--text)' }} />
            : <Menu size={20} style={{ color: 'var(--text)' }} />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className={`absolute top-16 z-40 max-h-[80vh] overflow-y-auto p-4 ${study ? 'left-0 right-0 lg:left-auto lg:w-96' : 'left-0 right-0 lg:hidden'}`}
          style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}
        >
          {study && (
            <div className="mb-3 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <Link href={study.trackHref} onClick={closeMenu} className="block text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
                {study.trackTitle}
              </Link>
              <div className="mt-1 text-sm font-semibold" style={{ color: 'var(--text)' }}>{study.lessonTitle}</div>
              <Link href={study.nextHref} onClick={closeMenu} className="inline-block mt-2 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                {study.nextLabel}: {study.nextTitle} →
              </Link>
            </div>
          )}
          <TracksListMobile tracks={tracks} lessons={lessons} continueLesson={continueLesson} active={activeHref === TRACKS_HREF} onNavigate={closeMenu} />
          <MobileLink item={ROADMAPS} active={activeHref === ROADMAPS.href} onNavigate={closeMenu} />
          <PracticeListMobile activeHref={activeHref} onNavigate={closeMenu} />
          <div className="mt-2 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
            <MobileLink item={INTERVIEW} active={activeHref === INTERVIEW.href} onNavigate={closeMenu} />
          </div>
          <div className="lg:hidden mt-2 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
            <ThemePicker labeled />
          </div>
        </nav>
      )}
    </header>
  )
}

function StudyTrail({ study }: { study: StudyContext }) {
  return (
    <div className="hidden sm:flex items-center gap-2 min-w-0 flex-1">
      <Link
        href={study.trackHref}
        className="flex-shrink-0 text-sm font-semibold truncate max-w-[40%]"
        style={{ color: 'var(--text)', textDecoration: 'none' }}
      >
        {study.trackTitle}
      </Link>
      <span aria-hidden="true" className="flex-shrink-0 text-sm" style={{ color: 'var(--muted)' }}>/</span>
      <span className="truncate text-sm min-w-0" style={{ color: 'var(--muted)' }}>{study.lessonTitle}</span>
    </div>
  )
}

function DesktopLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className="relative flex items-center px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap"
      style={{ color: active ? 'var(--text)' : 'var(--muted)', fontWeight: active ? 600 : 400 }}
    >
      {item.label}
      {active && (
        <span aria-hidden="true" className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full" style={{ background: 'var(--accent)' }} />
      )}
    </Link>
  )
}

function MobileLink({ item, active, onNavigate }: { item: NavItem; active: boolean; onNavigate: () => void }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className="block px-3 py-2.5 text-sm rounded-lg"
      style={{ color: active ? 'var(--text)' : 'var(--text2)', fontWeight: active ? 600 : 400, background: active ? 'var(--bg2)' : 'transparent' }}
      onClick={onNavigate}
    >
      {item.label}
    </Link>
  )
}
