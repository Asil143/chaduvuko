'use client'
import { Sun, Moon } from 'lucide-react'
import { THEME_STORAGE_KEY } from '@/lib/theme'

export function ThemePicker({ labeled = false }: { labeled?: boolean }) {
  function toggle() {
    const root = document.documentElement
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark'
    root.dataset.theme = next
    try { localStorage.setItem(THEME_STORAGE_KEY, next) } catch {}
  }

  if (labeled) {
    return (
      <button
        type="button"
        onClick={toggle}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg"
        style={{ color: 'var(--text2)' }}
      >
        <span>Theme</span>
        <span className="flex items-center justify-center w-9 h-9 rounded-lg" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
          <Sun size={15} className="theme-icon-sun" style={{ color: 'var(--gold)' }} />
          <Moon size={15} className="theme-icon-moon" style={{ color: 'var(--accent)' }} />
        </span>
      </button>
    )
  }

  return (
    <button type="button" onClick={toggle} title="Toggle theme" aria-label="Toggle light and dark theme"
      className="flex items-center justify-center w-9 h-9 rounded-lg transition-all flex-shrink-0"
      style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
      <Sun size={15} className="theme-icon-sun" style={{ color: 'var(--gold)' }} />
      <Moon size={15} className="theme-icon-moon" style={{ color: 'var(--accent)' }} />
    </button>
  )
}
