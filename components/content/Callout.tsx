import { cn } from '@/lib/utils'

type CalloutType = 'info' | 'tip' | 'warning' | 'example' | 'azure'

const styles = {
  info:    { border: 'var(--accent)', label: '💡 Note', labelColor: 'var(--accent)' },
  tip:     { border: 'var(--gold)',   label: '🎯 Pro Tip', labelColor: 'var(--gold)' },
  warning: { border: '#ff6b6b',      label: '⚠️ Important', labelColor: '#ff6b6b' },
  example: { border: 'var(--accent2)', label: '📌 Real World Example', labelColor: 'var(--accent2)' },
  azure:   { border: '#0078d4',      label: '☁️ Azure', labelColor: '#50b0ff' },
}

interface Props {
  type?: CalloutType
  label?: string
  children: React.ReactNode
}

export function Callout({ type = 'info', label, children }: Props) {
  const s = styles[type]
  return (
    <div className="my-6 rounded-r-xl" style={{
      background: 'var(--bg2)',
      border: '1px solid var(--border)',
      borderLeft: `3px solid ${s.border}`,
      padding: '1.1rem 1.4rem',
    }}>
      <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: s.labelColor }}>
        {label || s.label}
      </div>
      <div className="text-sm leading-relaxed" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>
        {children}
      </div>
    </div>
  )
}
