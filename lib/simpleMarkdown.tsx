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

export function renderSimpleMarkdown(text: string): JSX.Element[] {
  const lines = text.split('\n')
  const blocks: JSX.Element[] = []
  let listItems: string[] = []
  let key = 0

  function flushList() {
    if (listItems.length === 0) return
    blocks.push(
      <ul key={`ul-${key++}`} style={{ margin: '0 0 14px', paddingLeft: 20 }}>
        {listItems.map((item, i) => (
          <li key={i} style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 6 }}>
            {renderInline(item)}
          </li>
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
      listItems.push(line.slice(2))
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
