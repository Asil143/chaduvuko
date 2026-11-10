import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const K = '#f97316'
const MONO = 'var(--font-mono)'
const DISPLAY = 'var(--font-display)'

export function Chapter({ n, title, subtitle }: { n: string; title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontSize: 11, color: K, fontFamily: MONO, fontWeight: 800, margin: '0 0 8px', letterSpacing: '.12em', textTransform: 'uppercase' }}>Chapter {n}</p>
      <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', margin: '0 0 10px' }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.75, margin: 0, maxWidth: 720 }}>{subtitle}</p>}
    </div>
  )
}

export function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.95, margin: '0 0 18px' }}>{children}</p>
}

export function Divider() {
  return <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
}

export function Callout({ title, tone = 'orange', children }: { title: string; tone?: 'orange' | 'blue' | 'green' | 'red'; children: React.ReactNode }) {
  const colors = { orange: K, blue: '#38bdf8', green: '#22c55e', red: '#ef4444' }
  const color = colors[tone]
  return (
    <div style={{ background: `${color}0d`, border: `1px solid ${color}33`, borderLeft: `4px solid ${color}`, borderRadius: '0 12px 12px 0', padding: '18px 22px', margin: '24px 0' }}>
      <p style={{ fontSize: 11, color, fontFamily: MONO, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>{title}</p>
      <div style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
    </div>
  )
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ display: 'grid', gap: 10, margin: '0 0 20px', paddingLeft: 0, listStyle: 'none' }}>
      {items.map(item => <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.75 }}><span style={{ color: K, fontWeight: 900, marginTop: 2 }}>✓</span><span>{item}</span></li>)}
    </ul>
  )
}

export function CodeBlock({ title, children }: { title: string; children: string }) {
  return (
    <div style={{ background: '#0d1117', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', margin: '24px 0' }}>
      <div style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: 12, color: 'var(--muted)', fontFamily: MONO }}>{title}</div>
      <pre style={{ margin: 0, padding: '18px 20px', fontSize: 13, color: '#e2e8f0', lineHeight: 1.8, overflowX: 'auto', fontFamily: MONO }}><code>{children}</code></pre>
    </div>
  )
}

export function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ overflowX: 'auto', margin: '22px 0 30px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
        <thead><tr>{headers.map(header => <th key={header} style={{ padding: '11px 14px', textAlign: 'left', fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: K, fontFamily: MONO, borderBottom: `2px solid ${K}55`, background: `${K}0d` }}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row, i) => <tr key={row.join('|')} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>{row.map((cell, j) => <td key={j} style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', color: j === 0 ? 'var(--text)' : 'var(--muted)', lineHeight: 1.65, verticalAlign: 'top', fontWeight: j === 0 ? 700 : 400 }}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

export function DeepExplain({ title, children }: { title: string; children: React.ReactNode }) {
  return <div style={{ marginBottom: 34 }}><h3 style={{ fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 900, color: 'var(--text)', fontFamily: DISPLAY, letterSpacing: '-0.6px', margin: '0 0 14px' }}>{title}</h3>{children}</div>
}

export { KeyTakeaways }
