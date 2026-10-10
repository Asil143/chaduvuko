'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useId } from 'react'
import { ChevronDown } from 'lucide-react'
import type { HeaderData } from '@/lib/lesson-nav'
import { useMenuDisclosure } from '@/components/layout/useMenuDisclosure'

const INDEX_HREF = '/learn/roadmap'

export function RoadmapsMenuDesktop({ header, active }: { header: HeaderData; active: boolean }) {
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
        className="relative flex items-center gap-1 h-10 px-3 rounded-lg text-sm transition-colors"
        style={{ color: active || open ? 'var(--text)' : 'var(--text2)', fontWeight: active || open ? 600 : 400, background: open ? 'var(--bg2)' : 'transparent' }}
      >
        Roadmaps
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
          aria-label="Roadmaps"
          className="absolute left-0 top-full mt-2 w-[320px] p-2 rounded-xl z-50"
          style={{ background: 'var(--surface)', border: '1px solid var(--border2)', boxShadow: 'var(--shadow-lg)' }}
        >
          <ul>
            {header.featuredRoadmaps.map(roadmap => {
              const current = pathname === roadmap.href
              return (
                <li key={roadmap.href}>
                  <Link
                    href={roadmap.href}
                    aria-current={current ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 rounded-lg hover:bg-[var(--bg2)]"
                  >
                    <span className="block text-sm" style={{ color: 'var(--text)', fontWeight: 600 }}>{roadmap.title}</span>
                    <span className="block text-[13px] mt-0.5" style={{ color: 'var(--muted)' }}>{roadmap.blurb}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
          <Link
            href={INDEX_HREF}
            aria-current={pathname === INDEX_HREF ? 'page' : undefined}
            onClick={() => setOpen(false)}
            className="flex items-center min-h-10 px-3 text-sm font-semibold"
            style={{ color: 'var(--accent)' }}
          >
            All {header.roadmapCount} roadmaps →
          </Link>
        </div>
      )}
    </div>
  )
}

export function RoadmapsListMobile({ header, active, onNavigate }: { header: HeaderData; active: boolean; onNavigate: () => void }) {
  const pathname = usePathname()
  return (
    <div className="py-1">
      <div className="px-3 pt-2 pb-1 font-mono text-[11px] font-semibold uppercase tracking-wider" style={{ color: active ? 'var(--text)' : 'var(--muted)' }}>
        Roadmaps
      </div>
      <ul>
        {header.featuredRoadmaps.map(roadmap => {
          const current = pathname === roadmap.href
          return (
            <li key={roadmap.href}>
              <Link
                href={roadmap.href}
                aria-current={current ? 'page' : undefined}
                onClick={onNavigate}
                className="block min-h-11 px-3 py-2 rounded-lg"
                style={{ background: current ? 'var(--bg2)' : 'transparent' }}
              >
                <span className="block text-[15px]" style={{ color: 'var(--text)', fontWeight: current ? 600 : 500 }}>{roadmap.title}</span>
                <span className="block text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{roadmap.blurb}</span>
              </Link>
            </li>
          )
        })}
      </ul>
      <Link
        href={INDEX_HREF}
        aria-current={pathname === INDEX_HREF ? 'page' : undefined}
        onClick={onNavigate}
        className="flex items-center min-h-11 px-3 text-sm font-semibold"
        style={{ color: 'var(--accent)' }}
      >
        All {header.roadmapCount} roadmaps →
      </Link>
    </div>
  )
}
