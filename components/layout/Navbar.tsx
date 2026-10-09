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
import { useContinueLesson } from '@/components/layout/useContinueLesson'

type NavItem = { label: string; href: string }

// Blog and the Industry guide live in the footer and search.
const ROADMAPS: NavItem = { label: 'Roadmaps', href: '/learn/roadmap' }
const INTERVIEW: NavItem = { label: 'Interview Prep', href: '/learn/interview' }

const START_HREF = TRACKS_HREF

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

export function Navbar({ tracks }: { tracks: TrackSummaries }) {
  const continueLesson = useContinueLesson()
  const cta = continueLesson
    ? { href: continueLesson[0], label: 'Continue →', title: `Continue: ${continueLesson[1]}` }
    : { href: START_HREF, label: 'Start Learning →', title: undefined }
  const pathname = usePathname()
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

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between gap-3 px-4 md:px-6"
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

      <nav aria-label="Main" className="hidden lg:block mx-2">
        <ul className="flex items-center gap-0.5">
          <li>
            <TracksMenuDesktop tracks={tracks} active={activeHref === TRACKS_HREF} />
          </li>
          <li><DesktopLink item={ROADMAPS} active={activeHref === ROADMAPS.href} /></li>
          <li>
            <PracticeMenuDesktop activeHref={activeHref} />
          </li>
          <li><DesktopLink item={INTERVIEW} active={activeHref === INTERVIEW.href} /></li>
        </ul>
      </nav>

      <div className="flex items-center gap-2 flex-shrink-0">
        <SiteSearch />
        <ThemePicker />
        <div className="hidden sm:flex items-center ml-2">
          <Link
            href={cta.href}
            title={cta.title}
            aria-label={cta.title}
            style={{
              fontSize: '12px',
              fontWeight: 700,
              padding: '5px 14px',
              borderRadius: '6px',
              background: 'var(--green)',
              color: '#000',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {cta.label}
          </Link>
        </div>
        <button
          ref={menuButtonRef}
          type="button"
          className="lg:hidden p-2 flex-shrink-0"
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
          className="absolute top-16 left-0 right-0 p-4 lg:hidden z-40 max-h-[80vh] overflow-y-auto"
          style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
        >
          <TracksListMobile tracks={tracks} active={activeHref === TRACKS_HREF} onNavigate={() => setMobileOpen(false)} />
          <MobileLink item={ROADMAPS} active={activeHref === ROADMAPS.href} onNavigate={() => setMobileOpen(false)} />
          <PracticeListMobile activeHref={activeHref} onNavigate={() => setMobileOpen(false)} />
          <div className="mt-2 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
            <MobileLink item={INTERVIEW} active={activeHref === INTERVIEW.href} onNavigate={() => setMobileOpen(false)} />
          </div>
          <div className="sm:hidden mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
            <Link
              href={cta.href}
              className="block px-3 py-2.5 text-sm rounded-lg text-center font-bold"
              style={{ background: 'var(--green)', color: '#000' }}
              onClick={() => setMobileOpen(false)}
            >
              {continueLesson ? `Continue: ${continueLesson[1]} →` : 'Start Learning →'}
            </Link>
          </div>
        </nav>
      )}
    </header>
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
