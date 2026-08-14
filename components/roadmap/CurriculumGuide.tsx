'use client'

import { useState } from 'react'
import { parseCurriculumSections } from '@/lib/parseCurriculumSections'
import { renderSimpleMarkdown } from '@/lib/simpleMarkdown'

export function CurriculumGuide({ markdown }: { markdown: string }) {
  const sections = parseCurriculumSections(markdown)
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [allOpen, setAllOpen] = useState(false)

  if (sections.length === 0) return null

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <button
          onClick={() => { setAllOpen(v => !v); setOpenIndex(null) }}
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--green)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {sections.map((section, i) => {
          const isOpen = allOpen || openIndex === i
          return (
            <div
              key={section.title}
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => { setAllOpen(false); setOpenIndex(isOpen ? null : i) }}
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
                <span style={{ fontSize: 18, flexShrink: 0 }}>{section.icon}</span>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{section.title}</span>
                <span
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
                <div style={{ padding: '0 18px 18px' }}>
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
