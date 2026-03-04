'use client'
import { useState, useEffect } from 'react'
import { Palette, Check } from 'lucide-react'

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
  {
    id: 'midnight', label: 'Midnight', icon: '🌃',
    preview: ['#0d1117', '#c9d1d9', '#58a6ff'],
    vars: {
      '--bg': '#0d1117', '--bg2': '#161b22', '--bg3': '#1c2128', '--surface': '#21262d',
      '--text': '#c9d1d9', '--text2': '#b1bac4', '--muted': '#8b949e',
      '--border': '#30363d', '--border2': '#21262d',
      '--accent': '#58a6ff', '--accent-glow': 'rgba(88,166,255,0.08)', '--green': '#3fb950',
      '--shadow': '0 1px 3px rgba(0,0,0,0.4)', '--shadow-lg': '0 8px 30px rgba(0,0,0,0.7)',
    }
  },
  {
    id: 'sepia', label: 'Sepia', icon: '📜',
    preview: ['#f5f0e8', '#3d2b1f', '#8b5e3c'],
    vars: {
      '--bg': '#f5f0e8', '--bg2': '#ede8df', '--bg3': '#e4ddd3', '--surface': '#faf7f2',
      '--text': '#3d2b1f', '--text2': '#5c3d2e', '--muted': '#8c7b6b',
      '--border': '#d6cfc5', '--border2': '#c8bfb4',
      '--accent': '#8b5e3c', '--accent-glow': 'rgba(139,94,60,0.08)', '--green': '#4a7c59',
      '--shadow': '0 1px 3px rgba(61,43,31,0.1)', '--shadow-lg': '0 8px 30px rgba(61,43,31,0.15)',
    }
  },
  {
    id: 'terminal', label: 'Terminal', icon: '💻',
    preview: ['#0d0d0d', '#00ff41', '#00bb2d'],
    vars: {
      '--bg': '#0d0d0d', '--bg2': '#111111', '--bg3': '#161616', '--surface': '#1a1a1a',
      '--text': '#00ff41', '--text2': '#00cc33', '--muted': '#336622',
      '--border': '#1a3320', '--border2': '#224428',
      '--accent': '#00ff41', '--accent-glow': 'rgba(0,255,65,0.06)', '--green': '#00ff41',
      '--shadow': '0 1px 3px rgba(0,255,65,0.1)', '--shadow-lg': '0 0 30px rgba(0,255,65,0.12)',
    }
  },
]

const KEY = 'vedalera_theme'

export function applyTheme(id: string) {
  const theme = THEMES.find(t => t.id === id) || THEMES[1]
  const root = document.documentElement
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v))
  root.setAttribute('data-theme', id)
  try { localStorage.setItem(KEY, id) } catch {}
}

export function ThemePicker() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState('dark')

  useEffect(() => {
    const saved = localStorage.getItem(KEY) || 'dark'
    setCurrent(saved)
    applyTheme(saved)
  }, [])

  function pick(id: string) {
    setCurrent(id)
    applyTheme(id)
    setOpen(false)
  }

  const active = THEMES.find(t => t.id === current) || THEMES[1]

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} title="Choose theme"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all"
        style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
        <span>{active.icon}</span>
        <Palette size={12} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 rounded-2xl p-3 w-52"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>
            <div className="text-xs font-mono uppercase tracking-widest mb-3 px-1" style={{ color: 'var(--muted)' }}>
              Choose Theme
            </div>
            <div className="space-y-1">
              {THEMES.map(t => (
                <button key={t.id} onClick={() => pick(t.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left"
                  style={{
                    background: current === t.id ? 'var(--accent-glow)' : 'transparent',
                    border: `1px solid ${current === t.id ? 'var(--accent)' : 'transparent'}`,
                  }}>
                  <span className="text-lg flex-shrink-0">{t.icon}</span>
                  <div className="flex items-center gap-1 flex-1">
                    {t.preview.map((c, i) => (
                      <div key={i} className="w-3 h-3 rounded-full"
                        style={{ background: c, border: '1px solid rgba(128,128,128,0.2)' }} />
                    ))}
                  </div>
                  <span className="text-xs font-mono" style={{ color: 'var(--text2)' }}>{t.label}</span>
                  {current === t.id && <Check size={11} style={{ color: 'var(--accent)', flexShrink: 0 }} />}
                </button>
              ))}
            </div>
            <p className="mt-3 pt-3 text-center text-xs font-mono" style={{ color: 'var(--muted)', borderTop: '1px solid var(--border)' }}>
              Saved automatically
            </p>
          </div>
        </>
      )}
    </div>
  )
}
