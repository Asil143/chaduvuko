'use client'
import { useState, useEffect } from 'react'
import { List } from 'lucide-react'

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [active, setActive]     = useState<string>('')
  const [open, setOpen]         = useState(true)

  useEffect(() => {
    // Find all h2 and h3 in the main article
    const els = Array.from(document.querySelectorAll('main h2, main h3'))
    const found: Heading[] = els.map((el, i) => {
      if (!el.id) el.id = 'heading-' + i
      return { id: el.id, text: el.textContent || '', level: el.tagName === 'H2' ? 2 : 3 }
    })
    setHeadings(found)
  }, [])

  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) setActive(visible[0].target.id)
      },
      { rootMargin: '-60px 0px -70% 0px' }
    )
    headings.forEach(h => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 2) return null

  return (
    <div className="rounded-xl overflow-hidden mb-4"
      style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3"
        style={{ borderBottom: open ? '1px solid var(--border)' : 'none' }}>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest"
          style={{ color: 'var(--muted)' }}>
          <List size={12} /> On this page
        </div>
        <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
          {open ? '▲' : '▼'}
        </span>
      </button>
      {open && (
        <nav className="p-3 space-y-0.5">
          {headings.map(h => (
            <a
              key={h.id}
              href={'#' + h.id}
              onClick={e => {
                e.preventDefault()
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-mono transition-all block"
              style={{
                paddingLeft: h.level === 3 ? '1.25rem' : '0.5rem',
                color: active === h.id ? 'var(--accent)' : 'var(--muted)',
                background: active === h.id ? 'var(--accent-glow)' : 'transparent',
                borderLeft: active === h.id ? '2px solid var(--accent)' : '2px solid transparent',
              }}>
              {h.text}
            </a>
          ))}
        </nav>
      )}
    </div>
  )
}