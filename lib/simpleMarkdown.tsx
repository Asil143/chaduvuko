import type { ReactNode } from 'react'

function renderInline(line: string): ReactNode[] {
  const parts = line.split(/(\*\*.+?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} style={{ color: 'var(--text)' }}>
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

type ListItem = { text: string; checklist: boolean }

export function renderSimpleMarkdown(text: string): JSX.Element[] {
  const lines = text.split('\n')
  const blocks: JSX.Element[] = []
  let listItems: ListItem[] = []
  let key = 0

  function flushList() {
    if (listItems.length === 0) return
    const isChecklist = listItems.every(i => i.checklist)
    blocks.push(
      <ul key={`ul-${key++}`} style={{ margin: '0 0 14px', paddingLeft: isChecklist ? 0 : 20, listStyle: isChecklist ? 'none' : undefined }}>
        {listItems.map((item, i) => (
          isChecklist ? (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 8 }}>
              <span style={{ flexShrink: 0, width: 16, height: 16, marginTop: 3, border: '1.5px solid var(--border)', borderRadius: 4, display: 'inline-block' }} />
              <span>{renderInline(item.text)}</span>
            </li>
          ) : (
            <li key={i} style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 6 }}>
              {renderInline(item.text)}
            </li>
          )
        ))}
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
    } else if (line.startsWith('## ')) {
      flushList()
      blocks.push(
        <h2 key={`h-${key++}`} style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)', marginTop: 28, marginBottom: 10 }}>
          {renderInline(line.slice(3))}
        </h2>
      )
    } else if (line.startsWith('# ')) {
      flushList()
      blocks.push(
        <h1 key={`h-${key++}`} style={{ fontSize: 26, fontWeight: 900, color: 'var(--green)', marginTop: 36, marginBottom: 14, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
          {renderInline(line.slice(2))}
        </h1>
      )
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
      blocks.push(
        <p key={`p-${key++}`} style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 14 }}>
          {renderInline(line)}
        </p>
      )
    }
  }
  flushList()

  return blocks
}
