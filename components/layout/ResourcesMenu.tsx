'use client'
import Link from 'next/link'
import { useId } from 'react'
import { ChevronDown, FileVideo2, Mail, Newspaper, Workflow } from 'lucide-react'
import { useMenuDisclosure } from '@/components/layout/useMenuDisclosure'

export const RESOURCE_ITEMS = [
  { label: 'Industry guide', href: '/learn/industry', desc: 'Explore technology companies and roles', Icon: Workflow },
  { label: 'Find a video', href: '/learn/find-video', desc: 'Find a lesson across our learning library', Icon: FileVideo2 },
  { label: 'Articles', href: '/blog', desc: 'Practical ideas and technical explainers', Icon: Newspaper },
  { label: 'Newsletter', href: '/newsletter', desc: 'Get new lessons and projects in your inbox', Icon: Mail },
]

export function ResourcesMenuDesktop({ activeHref }: { activeHref: string | null }) {
  const panelId = useId()
  const { open, setOpen, containerRef, buttonRef } = useMenuDisclosure()
  const active = RESOURCE_ITEMS.some(item => item.href === activeHref)

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
        Resources
        <ChevronDown size={13} aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', transformOrigin: 'center' }} />
      </button>
      {open && (
        <div
          id={panelId}
          data-menu-panel
          role="dialog"
          aria-label="Resources"
          className="site-header-popover absolute right-0 top-full mt-2 w-[360px] max-w-[calc(100vw-24px)] p-2 z-50"
        >
          <ul>
            {RESOURCE_ITEMS.map(({ label, href, desc, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={activeHref === href ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-3 rounded-lg px-3 py-3 hover:bg-[var(--bg2)]"
                >
                  <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: 'var(--brand-soft)', color: 'var(--brand-green)' }}>
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold" style={{ color: 'var(--text)' }}>{label}</span>
                    <span className="mt-0.5 block text-[13px]" style={{ color: 'var(--muted)' }}>{desc}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export function ResourcesListMobile({ activeHref, onNavigate }: { activeHref: string | null; onNavigate: () => void }) {
  return (
    <div className="py-1">
      <div className="px-3 pt-2 pb-1 font-mono text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
        Resources
      </div>
      <ul>
        {RESOURCE_ITEMS.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={activeHref === href ? 'page' : undefined}
              onClick={onNavigate}
              className="flex min-h-11 items-center rounded-lg px-3 text-[15px]"
              style={{ color: activeHref === href ? 'var(--text)' : 'var(--text2)', fontWeight: activeHref === href ? 600 : 400, background: activeHref === href ? 'var(--bg2)' : 'transparent' }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
