'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useId } from 'react'
import { ChevronDown } from 'lucide-react'
import type { HeaderData } from '@/lib/lesson-nav'
import { useMenuDisclosure } from '@/components/layout/useMenuDisclosure'

export const PATHS_HREF = '/learn/paths'
export const ROADMAPS_HREF = '/learn/roadmap'
export const FIND_PATH_HREF = '/learn/find-your-path'
/** Every destination the Career paths menu owns, for active-state matching. */
export const PATHS_MENU_HREFS = [PATHS_HREF, ROADMAPS_HREF, FIND_PATH_HREF]

const linkColor = { color: 'var(--brand-green)' }

export function PathsMenuDesktop({ header, active }: { header: HeaderData; active: boolean }) {
  const pathname = usePathname()
  const panelId = useId()
  const { open, setOpen, containerRef, buttonRef } = useMenuDisclosure()
  const close = () => setOpen(false)

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-current={active ? 'location' : undefined}
        aria-controls={panelId}
        onClick={() => setOpen(isOpen => !isOpen)}
        className="site-nav-control relative flex items-center gap-1 h-11 px-1.5 min-[900px]:px-2 min-[1200px]:px-2 rounded-xl text-[13px] min-[1200px]:text-sm transition-colors whitespace-nowrap"
        style={{ color: active || open ? 'var(--text)' : 'var(--text2)', fontWeight: active || open ? 600 : 500, background: open ? 'var(--brand-soft)' : 'transparent' }}
      >
        Career paths
        <ChevronDown size={13} aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', transformOrigin: 'center' }} />
      </button>

      {open && (
        <div
          id={panelId}
          data-menu-panel
          role="dialog"
          aria-label="Career paths"
          className="site-header-popover absolute left-0 top-full mt-2 w-[560px] max-w-[calc(100vw-24px)] z-50 overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border2)', boxShadow: 'var(--shadow-lg)' }}
        >
          <p className="px-5 pt-4 pb-1 text-[13px]" style={{ color: 'var(--muted)' }}>
            Most in-demand roles. Step-by-step routes to a job, built from our courses.
          </p>
          <ul className="grid grid-cols-2 gap-x-2 px-2 pb-2">
            {header.careerPaths.filter(path => path.trending).map(path => {
              const current = pathname === path.href
              return (
                <li key={path.href}>
                  <Link
                    href={path.href}
                    aria-current={current ? 'page' : undefined}
                    onClick={close}
                    className="flex items-start gap-2.5 px-3 py-2 rounded-lg hover:bg-[var(--bg2)]"
                    style={{ background: current ? 'var(--bg2)' : undefined }}
                  >
                    <span aria-hidden="true" className="text-lg leading-5">{path.icon}</span>
                    <span>
                      <span className="block text-sm leading-snug" style={{ color: 'var(--text)', fontWeight: 600 }}>{path.title}</span>
                      <span className="block text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{path.school} · {path.lessons} lessons</span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="flex flex-wrap gap-x-5 gap-y-1 px-5 py-3 text-[13px] font-semibold" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
            <Link href={PATHS_HREF} onClick={close} style={linkColor}>Compare all {header.careerPaths.length} paths →</Link>
            <Link href={FIND_PATH_HREF} onClick={close} style={linkColor}>Not sure? Find your path</Link>
            <Link href={ROADMAPS_HREF} onClick={close} style={{ color: 'var(--text2)' }}>{header.roadmapCount} skill roadmaps</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export function PathsListMobile({ header, active, onNavigate }: { header: HeaderData; active: boolean; onNavigate: () => void }) {
  const pathname = usePathname()
  return (
    <div className="py-1">
      <div className="px-3 pt-2 pb-1 font-mono text-[11px] font-semibold uppercase tracking-wider" style={{ color: active ? 'var(--text)' : 'var(--muted)' }}>
        Career paths
      </div>
      <ul>
        {header.careerPaths.filter(path => path.trending).map(path => {
          const current = pathname === path.href
          return (
            <li key={path.href}>
              <Link
                href={path.href}
                aria-current={current ? 'page' : undefined}
                onClick={onNavigate}
                className="flex items-center min-h-11 px-3 rounded-lg text-[15px]"
                style={{ color: 'var(--text)', fontWeight: current ? 600 : 500, background: current ? 'var(--bg2)' : 'transparent' }}
              >
                <span aria-hidden="true" className="mr-2">{path.icon}</span>{path.title}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link href={PATHS_HREF} onClick={onNavigate} className="flex items-center min-h-11 px-3 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
        All {header.careerPaths.length} career paths →
      </Link>
      <Link href={FIND_PATH_HREF} onClick={onNavigate} className="flex items-center min-h-11 px-3 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
        Not sure? Find your path →
      </Link>
      <Link href={ROADMAPS_HREF} onClick={onNavigate} className="flex items-center min-h-11 px-3 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
        All {header.roadmapCount} skill roadmaps →
      </Link>
    </div>
  )
}
