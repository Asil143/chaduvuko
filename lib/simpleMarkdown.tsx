import type { ReactNode } from 'react'

const BOLD_LABEL_PATTERN = /^\*\*(.+?)\*\*:\s*(.*)$/
const PLAIN_LABEL_PATTERN = /^([A-Z][A-Za-z][A-Za-z /&-]{1,30}):\s+(.+)$/

function matchLabel(line: string): { label: string; rest: string } | null {
  const bold = line.match(BOLD_LABEL_PATTERN)
  if (bold) return { label: bold[1], rest: bold[2] }
  const plain = line.match(PLAIN_LABEL_PATTERN)
  if (plain) return { label: plain[1], rest: plain[2] }
  return null
}

function renderInline(line: string): ReactNode[] {
  const parts = line.split(/(\*\*.+?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} style={{ color: 'var(--green)', fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

function LabelRow({ label, rest }: { label: string; rest: string }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '4px 10px', marginBottom: 10 }}>
      <span
        style={{
          flexShrink: 0,
          background: 'rgba(0,230,118,0.1)',
          color: 'var(--green)',
          border: '1px solid rgba(0,230,118,0.3)',
          borderRadius: 20,
          padding: '2px 10px',
          fontSize: 11,
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
      {rest && (
        <span style={{ color: 'var(--muted)', lineHeight: 1.7, flex: '1 1 260px' }}>
          {renderInline(rest)}
        </span>
      )}
    </div>
  )
}

type ListItem = { text: string; checklist: boolean }

export function renderSimpleMarkdown(text: string): JSX.Element[] {
  const lines = text.split('\n')
  const blocks: JSX.Element[] = []
  let listItems: ListItem[] = []
  let key = 0
  let blockCount = 0

  function flushList() {
    if (listItems.length === 0) return
    const isChecklist = listItems.every(i => i.checklist)
    blocks.push(
      <ul key={`ul-${key++}`} style={{ margin: '0 0 14px', paddingLeft: 0, listStyle: 'none' }}>
        {listItems.map((item, i) => {
          if (isChecklist) {
            return (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 8 }}>
                <span style={{ flexShrink: 0, width: 16, height: 16, marginTop: 3, border: '1.5px solid var(--border)', borderRadius: 4, display: 'inline-block' }} />
                <span>{renderInline(item.text)}</span>
              </li>
            )
          }
          const match = matchLabel(item.text)
          return (
            <li key={i} style={{ marginBottom: 10, paddingLeft: 16, borderLeft: '2px solid var(--border)' }}>
              {match ? <LabelRow label={match.label} rest={match.rest} /> : (
                <span style={{ color: 'var(--muted)', lineHeight: 1.7 }}>{renderInline(item.text)}</span>
              )}
            </li>
          )
        })}
      </ul>
    )
    listItems = []
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (line.startsWith('### ')) {
      flushList()
      blocks.push(
        <h3 key={`h-${key++}`} style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginTop: 20, marginBottom: 8 }}>
          {renderInline(line.slice(4))}
        </h3>
      )
      blockCount++
    } else if (line.startsWith('## ')) {
      flushList()
      blocks.push(
        <h2
          key={`h-${key++}`}
          style={{
            fontSize: 18,
            fontWeight: 900,
            color: 'var(--text)',
            marginTop: 28,
            marginBottom: 12,
            paddingBottom: 8,
            borderBottom: '2px solid rgba(0,230,118,0.25)',
          }}
        >
          {renderInline(line.slice(3))}
        </h2>
      )
      blockCount++
    } else if (line.startsWith('# ')) {
      flushList()
      blocks.push(
        <h1 key={`h-${key++}`} style={{ fontSize: 26, fontWeight: 900, color: 'var(--green)', marginTop: 36, marginBottom: 14, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
          {renderInline(line.slice(2))}
        </h1>
      )
      blockCount = 0
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const content = line.slice(2)
      if (content.startsWith('☐ ') || content.startsWith('☐')) {
        listItems.push({ text: content.replace(/^☐\s*/, ''), checklist: true })
      } else {
        listItems.push({ text: content, checklist: false })
      }
    } else if (line.startsWith('☐ ') || line.startsWith('☐')) {
      listItems.push({ text: line.replace(/^☐\s*/, ''), checklist: true })
    } else if (line === '') {
      flushList()
    } else {
      flushList()
      const match = matchLabel(line)
      const isLead = blockCount === 0
      if (match) {
        blocks.push(
          <div key={`p-${key++}`} style={{ marginBottom: 14 }}>
            <LabelRow label={match.label} rest={match.rest} />
          </div>
        )
      } else {
        blocks.push(
          <p
            key={`p-${key++}`}
            style={{
              color: isLead ? 'var(--text)' : 'var(--muted)',
              fontSize: isLead ? 15 : 14,
              lineHeight: 1.75,
              marginBottom: 14,
            }}
          >
            {renderInline(line)}
          </p>
        )
      }
      blockCount++
    }
  }
  flushList()

  return blocks
}
