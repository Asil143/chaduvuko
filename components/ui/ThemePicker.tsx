'use client'
import { useEffect, useId, useState } from 'react'
import { Check, Monitor, Moon, Sun } from 'lucide-react'
import { THEME_STORAGE_KEY, type ThemePreference } from '@/lib/theme'
import { useMenuDisclosure } from '@/components/layout/useMenuDisclosure'

const OPTIONS: { value: ThemePreference; label: string; hint?: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'auto', label: 'Auto', hint: 'follows device' },
]

const LIGHT_QUERY = '(prefers-color-scheme: light)'

function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : 'auto'
  } catch {
    return 'auto'
  }
}

function applyTheme(preference: ThemePreference) {
  const resolved = preference === 'auto' ? (matchMedia(LIGHT_QUERY).matches ? 'light' : 'dark') : preference
  document.documentElement.dataset.theme = resolved
}

/** The saved theme preference (null until read on the client) and a setter that applies it. */
function useThemePreference() {
  const [preference, setPreference] = useState<ThemePreference | null>(null)

  useEffect(() => { setPreference(readPreference()) }, [])

  useEffect(() => {
    if (preference !== 'auto') return
    const query = matchMedia(LIGHT_QUERY)
    const follow = () => applyTheme('auto')
    query.addEventListener('change', follow)
    return () => query.removeEventListener('change', follow)
  }, [preference])

  function choose(next: ThemePreference) {
    try {
      if (next === 'auto') localStorage.removeItem(THEME_STORAGE_KEY)
      else localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {}
    applyTheme(next)
    setPreference(next)
  }

  return [preference, choose] as const
}

function ThemeIcon({ preference }: { preference: ThemePreference | null }) {
  if (preference === 'light') return <Sun size={16} aria-hidden="true" />
  if (preference === 'dark') return <Moon size={16} aria-hidden="true" />
  return <Monitor size={16} aria-hidden="true" />
}

/** Desktop: an icon button that opens Light / Dark / Auto. */
export function ThemeMenu() {
  const [preference, choose] = useThemePreference()
  const panelId = useId()
  const { open, setOpen, close, containerRef, buttonRef } = useMenuDisclosure()
  const current = OPTIONS.find(option => option.value === (preference ?? 'auto'))!

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-label={`Change theme (now: ${current.label})`}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(isOpen => !isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-[10px] flex-shrink-0"
        style={{ background: open ? 'var(--bg3)' : 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--text2)' }}
      >
        <ThemeIcon preference={preference} />
      </button>
      {open && (
        <div
          id={panelId}
          data-menu-panel
          role="dialog"
          aria-label="Theme"
          className="absolute right-0 top-full mt-2 w-[200px] p-1.5 rounded-xl z-50"
          style={{ background: 'var(--surface)', border: '1px solid var(--border2)', boxShadow: 'var(--shadow-lg)' }}
        >
          {OPTIONS.map(option => {
            const selected = option.value === current.value
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                onClick={() => { choose(option.value); close() }}
                className="w-full h-10 flex items-center gap-2.5 px-2.5 rounded-lg text-sm text-left hover:bg-[var(--bg2)]"
                style={{ color: selected ? 'var(--text)' : 'var(--text2)', fontWeight: selected ? 600 : 500, background: selected ? 'var(--bg2)' : undefined }}
              >
                <span className="w-4 flex-shrink-0">{selected && <Check size={16} aria-hidden="true" style={{ color: 'var(--green)' }} />}</span>
                {option.label}
                {option.hint && <span className="ml-auto text-xs font-normal" style={{ color: 'var(--muted)' }}>{option.hint}</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

/** Phone menu: the same three choices as a labelled row. */
export function ThemeChoice() {
  const [preference, choose] = useThemePreference()
  const current = preference ?? 'auto'
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2">
      <span className="text-sm" style={{ color: 'var(--muted)' }}>Theme</span>
      <div role="group" aria-label="Theme" className="flex p-0.5 rounded-[10px]" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
        {OPTIONS.map(option => {
          const selected = option.value === current
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => choose(option.value)}
              className="h-11 px-3 rounded-lg text-sm"
              style={{ background: selected ? 'var(--bg3)' : 'transparent', color: selected ? 'var(--text)' : 'var(--text2)', fontWeight: selected ? 600 : 500 }}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
