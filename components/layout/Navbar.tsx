'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemePicker } from '@/components/ui/ThemePicker'
import { SiteSearch } from '@/components/ui/SiteSearch'

type NavItem = { label: string; href: string }

const navItems: NavItem[] = [
  { label: 'Learn',          href: '/learn' },
  { label: 'Roadmap',        href: '/learn/roadmap' },
  { label: 'Projects',       href: '/learn/projects' },
  { label: 'Industry',       href: '/learn/industry' },
  { label: 'Blog',           href: '/blog' },
  { label: 'Interview Prep', href: '/learn/interview' },
]

const PLAYGROUND_HREF = '/playground'
const START_HREF = '/learn/roadmap'

// Longest matching prefix wins, so /learn/roadmap/x highlights Roadmap, not Learn.
function getActiveHref(pathname: string): string | null {
  const candidates = [...navItems.map(i => i.href), PLAYGROUND_HREF]
  let best: string | null = null
  for (const href of candidates) {
    const matches = pathname === href || pathname.startsWith(href + '/')
    if (matches && (!best || href.length > best.length)) best = href
  }
  return best
}

export function Navbar() {
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

      <nav aria-label="Main" className="hidden xl:block mx-4">
        <ul className="flex items-center gap-0.5">
          {navItems.map(item => {
            const active = item.href === activeHref
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className="relative flex items-center px-3 py-2 rounded-lg text-sm transition-colors"
                  style={{ color: active ? 'var(--text)' : 'var(--muted)', fontWeight: active ? 600 : 400 }}
                >
                  {item.label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full"
                      style={{ background: 'var(--accent)' }}
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="flex items-center gap-2 flex-shrink-0">
        <SiteSearch />
        <ThemePicker />
        <div className="hidden sm:flex items-center gap-2 ml-2">
          <Link
            href={PLAYGROUND_HREF}
            aria-current={activeHref === PLAYGROUND_HREF ? 'page' : undefined}
            style={{
              fontSize: '12px',
              fontWeight: activeHref === PLAYGROUND_HREF ? 700 : 500,
              padding: '5px 13px',
              borderRadius: '6px',
              border: '1px solid var(--border2)',
              color: 'var(--text)',
              textDecoration: 'none',
            }}
          >
            Playground
          </Link>
          <Link
            href={START_HREF}
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
            Start Learning →
          </Link>
        </div>
        <button
          ref={menuButtonRef}
          type="button"
          className="xl:hidden p-2 flex-shrink-0"
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
          className="absolute top-16 left-0 right-0 p-4 xl:hidden z-40 max-h-[80vh] overflow-y-auto"
          style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
        >
          <ul>
            {navItems.map(item => {
              const active = item.href === activeHref
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className="block px-3 py-2.5 text-sm rounded-lg"
                    style={{
                      color: active ? 'var(--text)' : 'var(--text2)',
                      fontWeight: active ? 600 : 400,
                      background: active ? 'var(--bg2)' : 'transparent',
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="sm:hidden flex flex-col gap-2 mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
            <Link
              href={PLAYGROUND_HREF}
              aria-current={activeHref === PLAYGROUND_HREF ? 'page' : undefined}
              className="block px-3 py-2.5 text-sm rounded-lg text-center"
              style={{ border: '1px solid var(--border2)', color: 'var(--text)' }}
              onClick={() => setMobileOpen(false)}
            >
              Playground
            </Link>
            <Link
              href={START_HREF}
              className="block px-3 py-2.5 text-sm rounded-lg text-center font-bold"
              style={{ background: 'var(--green)', color: '#000' }}
              onClick={() => setMobileOpen(false)}
            >
              Start Learning →
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
