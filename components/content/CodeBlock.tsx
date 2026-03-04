'use client'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface Props {
  code: string
  language?: string
  filename?: string
}

export function CodeBlock({ code, language = 'python', filename }: Props) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 rounded-xl overflow-hidden"
      style={{ border: '1px solid var(--border)', background: '#0d1117' }}>

      {/* Header — always dark background so dots and text are visible */}
      <div className="flex items-center justify-between px-4 py-2.5"
        style={{ background: '#161b22', borderBottom: '1px solid #30363d' }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
          </div>
          {filename && (
            <span className="text-xs font-mono" style={{ color: '#8b949e' }}>{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono" style={{ color: '#6e7681' }}>{language}</span>
          <button onClick={copy}
            className="flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded transition-all"
            style={{
              background: copied ? 'rgba(63,185,80,0.15)' : 'rgba(139,148,158,0.1)',
              color: copied ? '#3fb950' : '#8b949e',
              border: `1px solid ${copied ? 'rgba(63,185,80,0.3)' : 'rgba(139,148,158,0.2)'}`,
            }}>
            {copied
              ? <><Check size={11} /> copied!</>
              : <><Copy size={11} /> copy</>
            }
          </button>
        </div>
      </div>

      {/* Code body — always dark */}
      <pre className="p-5 overflow-x-auto text-sm leading-relaxed m-0"
        style={{ fontFamily: 'JetBrains Mono, Fira Code, monospace', color: '#c9d1d9', background: '#0d1117' }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}