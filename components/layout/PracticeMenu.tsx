'use client'
import Link from 'next/link'
import { useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { useMenuDisclosure } from '@/components/layout/useMenuDisclosure'

export const PRACTICE_ITEMS = [
  { label: 'Code Playground', href: '/playground',           desc: 'Write and run code in the browser' },
  { label: 'SQL Playground',  href: '/learn/sql/playground', desc: 'Query a real sample database' },
  { label: 'Projects',        href: '/learn/projects',       desc: 'End-to-end builds for your portfolio' },
]

const PROJECTS_HREF = '/learn/projects'

export function PracticeMenuDesktop({ activeHref, projectCount }: { activeHref: string | null; projectCount: number }) {
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
        className="relative flex items-center gap-1 h-10 px-3 rounded-lg text-sm transition-colors"
        style={{ color: active || open ? 'var(--text)' : 'var(--text2)', fontWeight: active || open ? 600 : 400, background: open ? 'var(--bg2)' : 'transparent' }}
      >
        Practice
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
          aria-label="Practice"
          className="absolute left-0 top-full mt-2 w-[320px] p-2 rounded-xl z-50"
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
                      {item.href === PROJECTS_HREF && <span className="font-normal" style={{ color: 'var(--muted)' }}>{projectCount}</span>}
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

export function PracticeListMobile({ activeHref, projectCount, onNavigate }: { activeHref: string | null; projectCount: number; onNavigate: () => void }) {
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
                {item.href === PROJECTS_HREF && <span className="text-[13px]" style={{ color: 'var(--muted)' }}>{projectCount}</span>}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
