'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-9 h-9" />
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
      style={{ border: '1px solid var(--border)' }}
      aria-label="Toggle theme"
    >
      {theme === 'dark'
        ? <Sun size={15} style={{ color: 'var(--gold)' }} />
        : <Moon size={15} style={{ color: 'var(--accent)' }} />
      }
    </button>
  )
}
