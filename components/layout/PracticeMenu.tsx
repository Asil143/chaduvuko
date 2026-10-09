'use client'
import Link from 'next/link'
import { useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { useMenuDisclosure } from '@/components/layout/useMenuDisclosure'

export const PRACTICE_ITEMS = [
  { label: 'Code Playground', href: '/playground',            desc: 'Write and run code in the browser' },
  { label: 'SQL Playground',  href: '/learn/sql/playground',  desc: 'Query a real sample database' },
  { label: 'Projects',        href: '/learn/projects',        desc: 'End-to-end builds for your portfolio' },
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
        className="relative flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors"
        style={{ color: active || open ? 'var(--text)' : 'var(--muted)', fontWeight: active ? 600 : 400 }}
      >
        Practice
        <ChevronDown size={13} aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', transformOrigin: 'center' }} />
        {active && (
          <span aria-hidden="true" className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full" style={{ background: 'var(--accent)' }} />
        )}
      </button>

      {open && (
        <div
          id={panelId}
          className="absolute left-0 top-full mt-2 rounded-xl p-2"
          style={{ width: 300, background: 'var(--surface)', border: '1px solid var(--border2)', boxShadow: 'var(--shadow-lg)' }}
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
                    className="block px-3 py-2 rounded-lg hover:bg-[var(--bg2)]"
                  >
                    <span className="block text-sm" style={{ color: 'var(--text)', fontWeight: current ? 600 : 500 }}>{item.label}</span>
                    <span className="block text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{item.desc}</span>
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
    <div className="mt-2">
      <div className="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
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
                className="block px-3 py-2.5 text-sm rounded-lg"
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
