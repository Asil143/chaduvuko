// Shared building blocks for lessons in the registry-driven tracks (data/tracks).
// Keeps new lessons visually consistent with the hand-styled ones without each
// file redefining its own headings, code boxes, and tables.
import Link from 'next/link'
import { CodeBlock } from '@/components/content/CodeBlock'

export { Callout } from '@/components/content/Callout'
export { KeyTakeaways } from '@/components/content/KeyTakeaways'

const pad = (n: number) => String(n).padStart(2, '0')

export function Part({ n, label, title, children }: { n: number; label: string; title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 56 }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase',
        color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10,
      }}>{`// Part ${pad(n)} — ${label}`}</div>
      <h2 style={{
        fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)',
        marginBottom: 18, fontFamily: 'var(--font-display)', lineHeight: 1.2,
      }}>{title}</h2>
      {children}
    </section>
  )
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700, letterSpacing: '-0.3px', color: 'var(--text)',
      margin: '28px 0 12px', fontFamily: 'var(--font-display)',
    }}>{children}</h3>
  )
}

export function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
}

export function Code({ code, lang = 'python', file }: { code: string; lang?: string; file?: string }) {
  return <CodeBlock code={code.replace(/^\n+|\s+$/g, '')} language={lang} filename={file} />
}

export function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul style={{ margin: '0 0 22px', paddingLeft: 22, listStyle: 'disc' }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8, marginBottom: 8 }}>{item}</li>
      ))}
    </ul>
  )
}

export function Steps({ items }: { items: React.ReactNode[] }) {
  return (
    <ol style={{ margin: '0 0 22px', padding: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, color: 'var(--text)', lineHeight: 1.8 }}>
          <span aria-hidden="true" style={{
            flexShrink: 0, minWidth: 28, height: 28, borderRadius: 8, display: 'inline-flex', alignItems: 'center',
            justifyContent: 'center', background: 'var(--bg2)', border: '1px solid var(--border)',
            fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--green)',
          }}>{i + 1}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  )
}

export function Table({ head, rows, caption }: { head: string[]; rows: React.ReactNode[][]; caption?: string }) {
  return (
    <div style={{ overflowX: 'auto', margin: '0 0 24px', border: '1px solid var(--border)', borderRadius: 10 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        {caption && <caption style={{ textAlign: 'left', padding: '10px 14px', color: 'var(--muted)', fontSize: 13 }}>{caption}</caption>}
        <thead>
          <tr>
            {head.map(cell => (
              <th key={cell} scope="col" style={{
                textAlign: 'left', padding: '10px 14px', background: 'var(--bg2)', color: 'var(--text)',
                borderBottom: '1px solid var(--border)', fontWeight: 700,
              }}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td key={c} style={{
                  padding: '10px 14px', color: 'var(--text)', lineHeight: 1.7, verticalAlign: 'top',
                  borderBottom: r === rows.length - 1 ? 'none' : '1px solid var(--border)',
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export interface Mistake { mistake: string; cause: string; fix: string }

export function Mistakes({ items }: { items: Mistake[] }) {
  const label = { fontSize: 10, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' as const }
  return (
    <div style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
      {items.map(item => (
        <div key={item.mistake} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', margin: '0 0 8px' }}>{item.mistake}</p>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, margin: '0 0 6px' }}><span style={label}>Why: </span>{item.cause}</p>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}><span style={label}>Fix: </span>{item.fix}</p>
        </div>
      ))}
    </div>
  )
}

export function Practice({ title, tasks, hint }: { title: string; tasks: React.ReactNode[]; hint?: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderLeft: '3px solid var(--green)', borderRadius: 10, padding: '18px 22px', marginBottom: 24 }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--green)', fontFamily: 'var(--font-mono)', margin: '0 0 8px' }}>
        Practice
      </p>
      <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '0 0 12px' }}>{title}</p>
      <Steps items={tasks} />
      {hint && <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}><strong>Hint:</strong> {hint}</p>}
    </div>
  )
}

export function NextLesson({ href, label, text }: { href: string; label: string; text: string }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 24, marginTop: 40 }}>
      <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
        What comes next
      </p>
      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>{text}</p>
      <Link href={href} style={{ background: 'var(--green)', color: '#04120a', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
        {label} →
      </Link>
    </div>
  )
}

export function Divider() {
  return <div style={{ borderTop: '1px solid var(--border)', margin: '8px 0 48px' }} />
}
