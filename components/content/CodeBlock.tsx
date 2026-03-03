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
    <div className="my-6 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--code-bg)' }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-70" />
          </div>
          {filename && <span className="text-xs font-mono ml-2 opacity-60">{filename}</span>}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono opacity-40">{language}</span>
          <button onClick={copy} className="flex items-center gap-1 text-xs font-mono opacity-60 hover:opacity-100 transition-opacity">
            {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
            {copied ? 'copied!' : 'copy'}
          </button>
        </div>
      </div>
      <pre className="p-5 overflow-x-auto text-sm leading-relaxed" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#a8b4c8' }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}
