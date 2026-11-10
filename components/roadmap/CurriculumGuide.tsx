'use client'

import { useState } from 'react'
import { parseCurriculumSections } from '@/lib/parseCurriculumSections'
import { renderSimpleMarkdown } from '@/lib/simpleMarkdown'

/** Sections most readers want first, so they start expanded. */
const OPEN_BY_DEFAULT = new Set(['Study Plan', 'Project Roadmap'])

export function CurriculumGuide({ markdown }: { markdown: string }) {
  const sections = parseCurriculumSections(markdown)
  const [open, setOpen] = useState<Set<number>>(
    () => new Set(sections.flatMap((section, i) => (OPEN_BY_DEFAULT.has(section.title.trim()) ? [i] : []))),
  )

  if (sections.length === 0) return null

  const allOpen = open.size === sections.length
  const toggle = (i: number) => setOpen(prev => {
    const next = new Set(prev)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    return next
  })
  const jumpTo = (i: number) => {
    setOpen(prev => new Set(prev).add(i))
    requestAnimationFrame(() => {
      const target = document.getElementById(`curriculum-heading-${i}`)
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      target?.focus({ preventScroll: true })
    })
  }

  return (
    <div>
      <nav aria-label="Curriculum sections" className="rm-toc">
        {sections.map((section, i) => (
          <button key={section.title} type="button" onClick={() => jumpTo(i)} className="rm-toc-chip">
            <span aria-hidden="true">{section.icon}</span> {section.title}
          </button>
        ))}
      </nav>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(sections.map((_, i) => i)))}
          aria-controls="curriculum-guide-sections"
          className="rm-toc-toggle"
        >
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      <div id="curriculum-guide-sections" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {sections.map((section, i) => {
          const isOpen = open.has(i)
          return (
            <div
              key={section.title}
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                overflow: 'hidden',
                scrollMarginTop: 80,
              }}
              id={`curriculum-heading-${i}`}
              tabIndex={-1}
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`curriculum-section-${i}`}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 16px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span aria-hidden="true" style={{ fontSize: 18, flexShrink: 0 }}>{section.icon}</span>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{section.title}</span>
                <span
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    color: 'var(--muted)',
                    fontSize: 12,
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.15s',
                  }}
                >
                  ▾
                </span>
              </button>
              {isOpen && (
                <div id={`curriculum-section-${i}`} style={{ padding: '0 18px 18px' }}>
                  {renderSimpleMarkdown(section.body)}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
