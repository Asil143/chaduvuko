'use client'
import Link from 'next/link'
import { useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { useMenuDisclosure } from '@/components/layout/useMenuDisclosure'

export const PRACTICE_ITEMS = [
  { label: 'Code Playground', href: '/playground',           desc: 'Write and run code in the browser' },
  { label: 'SQL Playground',  href: '/learn/sql/playground', desc: 'Query a real sample database' },
]

export function PracticeMenuDesktop({ activeHref }: { activeHref: string | null }) {
  const panelId = useId()
  const { open, setOpen, containerRef, buttonRef } = useMenuDisclosure()
  const active = PRACTICE_ITEMS.some(item => item.href === activeHref)

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
        Practice
        <ChevronDown size={13} aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', transformOrigin: 'center' }} />
      </button>

      {open && (
        <div
          id={panelId}
          data-menu-panel
          role="dialog"
          aria-label="Practice"
          className="site-header-popover absolute left-0 top-full mt-2 w-[340px] max-w-[calc(100vw-24px)] p-2 z-50"
          style={{ background: 'var(--surface)', border: '1px solid var(--border2)', boxShadow: 'var(--shadow-lg)' }}
        >
          <ul>
            {PRACTICE_ITEMS.map(item => {
              const current = item.href === activeHref
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 rounded-lg hover:bg-[var(--bg2)]"
                  >
                    <span className="flex justify-between text-sm" style={{ color: 'var(--text)', fontWeight: 600 }}>
                      {item.label}
                    </span>
                    <span className="block text-[13px] mt-0.5" style={{ color: 'var(--muted)' }}>{item.desc}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export function PracticeListMobile({ activeHref, onNavigate }: { activeHref: string | null; onNavigate: () => void }) {
  return (
    <div className="py-1">
      <div className="px-3 pt-2 pb-1 font-mono text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
        Practice
      </div>
      <ul>
        {PRACTICE_ITEMS.map(item => {
          const active = item.href === activeHref
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                onClick={onNavigate}
                className="flex items-center justify-between min-h-11 px-3 text-[15px] rounded-lg"
                style={{ color: active ? 'var(--text)' : 'var(--text2)', fontWeight: active ? 600 : 400, background: active ? 'var(--bg2)' : 'transparent' }}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
