'use client'
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export const THEMES = [
  {
    id: 'light', label: 'Light', icon: '☀️',
    preview: ['#f8f9fc', '#0a0a0f', '#0078d4'],
    vars: {
      '--bg': '#f8f9fc', '--bg2': '#f1f3f8', '--bg3': '#e8ebf2', '--surface': '#ffffff',
      '--text': '#0a0a0f', '--text2': '#1a1a2e', '--muted': '#6b7280',
      '--border': '#e2e6ef', '--border2': '#d1d5e0',
      '--accent': '#0078d4', '--accent-glow': 'rgba(0,120,212,0.08)', '--green': '#16a34a',
      '--shadow': '0 1px 3px rgba(0,0,0,0.08)', '--shadow-lg': '0 8px 30px rgba(0,0,0,0.12)',
    }
  },
  {
    id: 'dark', label: 'Dark', icon: '🌙',
    preview: ['#0a0a0f', '#e8eaf0', '#00c2ff'],
    vars: {
      '--bg': '#0a0a0f', '--bg2': '#0f0f18', '--bg3': '#14141f', '--surface': '#12121c',
      '--text': '#e8eaf0', '--text2': '#c4c6d0', '--muted': '#6b7280',
      '--border': '#1e1e2e', '--border2': '#252535',
      '--accent': '#00c2ff', '--accent-glow': 'rgba(0,194,255,0.06)', '--green': '#00e676',
      '--shadow': '0 1px 3px rgba(0,0,0,0.4)', '--shadow-lg': '0 8px 30px rgba(0,0,0,0.6)',
    }
  },
]

const KEY = 'chaduvuko_theme'

export function applyTheme(id: string) {
  const theme = THEMES.find(t => t.id === id) || THEMES[1]
  const root = document.documentElement
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v))
  root.setAttribute('data-theme', id)
  try { localStorage.setItem(KEY, id) } catch {}
}

export function ThemePicker() {
  const [current, setCurrent] = useState('dark')

  useEffect(() => {
    const saved = localStorage.getItem(KEY) || 'dark'
    setCurrent(saved)
    applyTheme(saved)
  }, [])

  function toggle() {
    const next = current === 'dark' ? 'light' : 'dark'
    setCurrent(next)
    applyTheme(next)
  }

  return (
    <button onClick={toggle} title="Toggle theme" aria-label="Toggle theme"
      className="flex items-center justify-center w-9 h-9 rounded-lg transition-all"
      style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
      {current === 'dark'
        ? <Sun size={15} style={{ color: 'var(--gold, #f5c542)' }} />
        : <Moon size={15} style={{ color: 'var(--accent)' }} />}
    </button>
  )
}
