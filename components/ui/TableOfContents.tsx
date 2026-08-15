'use client'
import { useState, useEffect } from 'react'
import { List } from 'lucide-react'

type Kind = 'part' | 'story' | 'myth' | 'prep' | 'plain'

interface Heading {
  id: string
  text: string
  level: number
  kind: Kind
  partNum: number | null   // sequential number among 'part' kind h2s, null otherwise
  mainIndex: number        // index into the h2-only list (shared by its h3 children)
}

const CHIP_LABEL: Record<Exclude<Kind, 'part' | 'plain'>, string> = {
  story: 'Story',
  myth: 'Myths',
  prep: 'Prep',
}

const CHIP_COLOR: Record<Exclude<Kind, 'part' | 'plain'>, string> = {
  story: 'var(--gold)',
  myth: '#ff6b6b',
  prep: 'var(--accent2)',
}

// Fallback classifier for tracks without a data-toc-kind attribute (SQL, AI/ML, etc.) —
// keys off the heading text itself, matching the recurring title conventions those
// tracks already use for their "real world" / "interview prep" / "mistakes" sections.
function classifyByText(text: string): Kind {
  const t = text.trim()
  if (/^What This Looks Like at Work/i.test(t)) return 'story'
  if (/^Interview Prep/i.test(t)) return 'prep'
  if (
    /^Errors You Will Hit/i.test(t) ||
    /^Every common .*(mistake|error)/i.test(t) ||
    /^(Common|Design) .*Mistakes/i.test(t) ||
    /Mistakes?\s*—/i.test(t)
  ) return 'plain'
  return 'part'
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [active, setActive]     = useState<string>('')
  const [open, setOpen]         = useState(true)

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('main h2, main h3'))
    let mainIndex = -1
    let partCount = 0

    const found: Heading[] = els.map((el, i) => {
      if (!el.id) el.id = 'heading-' + i
      const isH2 = el.tagName === 'H2'

      if (isH2) {
        mainIndex++
        const text = el.textContent || ''
        const kindAttr = el.closest('section')?.getAttribute('data-toc-kind') as Kind | null
        const kind: Kind = kindAttr ?? classifyByText(text)
        const partNum = kind === 'part' ? ++partCount : null
        return { id: el.id, text, level: 2, kind, partNum, mainIndex }
      }

      // h3 — inherits the current mainIndex/kind context, never numbered itself
      return { id: el.id, text: el.textContent || '', level: 3, kind: 'plain', partNum: null, mainIndex }
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

  const mainCount = headings.length ? headings[headings.length - 1].mainIndex + 1 : 0
  const activeHeading = headings.find(h => h.id === active)
  const activeMainIndex = activeHeading ? activeHeading.mainIndex : -1
  const progressPct = activeMainIndex >= 0 && mainCount > 0
    ? ((activeMainIndex + 1) / mainCount) * 100
    : 0

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
        {activeMainIndex >= 0 && (
          <span className="text-xs font-mono font-bold" style={{ color: 'var(--accent)' }}>
            {activeMainIndex + 1} / {mainCount}
          </span>
        )}
      </button>
      {open && (
        <div className="p-3">
          {/* Overall progress bar */}
          <div style={{ height: 3, borderRadius: 3, background: 'var(--bg2)', overflow: 'hidden', marginBottom: 12 }}>
            <div style={{
              height: '100%', width: `${progressPct}%`, borderRadius: 3,
              background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
              transition: 'width 0.25s ease',
            }} />
          </div>

          <nav className="flex" style={{ gap: 10 }}>
            {/* Vertical rail */}
            <div style={{ position: 'relative', width: 10, flexShrink: 0 }}>
              <div style={{
                position: 'absolute', top: 4, bottom: 4, left: 4, width: 2,
                background: 'var(--border)', borderRadius: 2,
              }} />
              <div style={{
                position: 'absolute', top: 4, left: 4, width: 2,
                height: `${progressPct}%`,
                background: 'linear-gradient(180deg, var(--accent), var(--accent2))',
                borderRadius: 2, transition: 'height 0.25s ease',
              }} />
            </div>

            {/* Items */}
            <div className="flex-1 space-y-0.5" style={{ minWidth: 0 }}>
              {headings.map(h => {
                const isActive = active === h.id
                const isSub = h.level === 3
                const chipKind = h.kind !== 'part' && h.kind !== 'plain' ? h.kind : null

                return (
                  <a
                    key={h.id}
                    href={'#' + h.id}
                    onClick={e => {
                      e.preventDefault()
                      document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                    className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-mono transition-all"
                    style={{
                      paddingLeft: isSub ? '1.5rem' : '0.5rem',
                      fontSize: isSub ? '11px' : '12px',
                      opacity: isSub ? 0.82 : 1,
                      color: isActive ? 'var(--text)' : 'var(--muted)',
                      background: isActive ? 'var(--accent-glow)' : 'transparent',
                    }}>
                    {!isSub && h.kind === 'part' && (
                      <span style={{
                        fontSize: 9.5, fontWeight: 700, width: 16, flexShrink: 0, textAlign: 'right',
                        color: isActive ? 'var(--accent)' : 'var(--muted)',
                        fontVariantNumeric: 'tabular-nums',
                      }}>
                        {String(h.partNum).padStart(2, '0')}
                      </span>
                    )}
                    {!isSub && chipKind && (
                      <span style={{
                        fontSize: 8.5, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase',
                        padding: '1.5px 6px', borderRadius: 20, flexShrink: 0,
                        background: `${CHIP_COLOR[chipKind]}22`, color: CHIP_COLOR[chipKind],
                      }}>
                        {CHIP_LABEL[chipKind]}
                      </span>
                    )}
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {h.text}
                    </span>
                  </a>
                )
              })}
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
