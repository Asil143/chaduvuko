'use client'
import { Sun, Moon } from 'lucide-react'
import { THEME_STORAGE_KEY } from '@/lib/theme'

export function ThemePicker() {
  function toggle() {
    const root = document.documentElement
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark'
    root.dataset.theme = next
    try { localStorage.setItem(THEME_STORAGE_KEY, next) } catch {}
  }

  return (
    <button onClick={toggle} title="Toggle theme" aria-label="Toggle light and dark theme"
      className="flex items-center justify-center w-9 h-9 rounded-lg transition-all flex-shrink-0"
      style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
      <Sun size={15} className="theme-icon-sun" style={{ color: 'var(--gold)' }} />
      <Moon size={15} className="theme-icon-moon" style={{ color: 'var(--accent)' }} />
    </button>
  )
}
