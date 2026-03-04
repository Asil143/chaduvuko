'use client'
import { useEffect } from 'react'
import { THEMES } from '@/components/ui/ThemePicker'

const KEY = 'vedalera_theme'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Read saved theme from localStorage, default to dark
    const saved = localStorage.getItem(KEY) || 'dark'
    const theme = THEMES.find(t => t.id === saved) || THEMES[1]
    const root = document.documentElement
    Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v))
    root.setAttribute('data-theme', saved)
  }, [])

  return <>{children}</>
}