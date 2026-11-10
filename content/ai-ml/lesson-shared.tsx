import type { ReactNode } from 'react'
import Link from 'next/link'

const styles = {
  section: { paddingBottom: 44, paddingTop: 8, marginBottom: 28, borderBottom: '1px solid var(--border)' },
  tag: { fontSize: 11, fontWeight: 700 as const, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--accent)', fontFamily: 'var(--font-mono)', display: 'block' as const, marginBottom: 10 },
  heading: { fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900 as const, letterSpacing: '-1.2px', color: 'var(--text)', marginBottom: 14, lineHeight: 1.15 },
  paragraph: { fontSize: 15, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 16 },
}

export function AIMLSection({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return <section style={styles.section}><span style={styles.tag}>{label}</span><h2 style={styles.heading}>{title}</h2>{children}</section>
}

export function AIMLParagraph({ children }: { children: ReactNode }) {
  return <p style={styles.paragraph}>{children}</p>
}

export function AIMLCode({ code, label = 'python' }: { code: string; label?: string }) {
  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 24 }}>
      <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--border)', background: 'var(--surface)', fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
      <pre style={{ padding: '18px 20px', margin: 0, overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.75, color: 'var(--text)' }}><code>{code}</code></pre>
    </div>
  )
}

export function AIMLNote({ title, children, tone = 'info' }: { title: string; children: ReactNode; tone?: 'info' | 'warning' | 'tip' }) {
  const color = tone === 'warning' ? '#BA7517' : tone === 'tip' ? '#1D9E75' : '#378ADD'
  return <div style={{ background: 'var(--surface)', border: `1px solid ${color}40`, borderLeft: `4px solid ${color}`, borderRadius: 8, padding: '16px 20px', marginBottom: 20 }}><strong style={{ display: 'block', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color, marginBottom: 8 }}>{title}</strong><div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{children}</div></div>
}

export function AIMLTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, lineHeight: 1.6 }}><thead><tr>{head.map(item => <th key={item} style={{ textAlign: 'left', padding: '10px 12px', background: 'var(--surface)', color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{item}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} style={{ padding: '10px 12px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>{cell}</td>)}</tr>)}</tbody></table></div>
}

export function AIMLList({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul'
  return <Tag style={{ paddingLeft: 22, margin: '0 0 20px', color: 'var(--muted)', fontSize: 14, lineHeight: 1.9 }}>{items.map((item, i) => <li key={i} style={{ marginBottom: 7 }}>{item}</li>)}</Tag>
}

export function AIMLMistakes({ items }: { items: { mistake: string; fix: string }[] }) {
  return <div style={{ display: 'grid', gap: 12, marginBottom: 24 }}>{items.map(({ mistake, fix }) => <div key={mistake} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px' }}><strong style={{ display: 'block', color: '#ff6b6b', fontSize: 13, marginBottom: 6 }}>Mistake: {mistake}</strong><span style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>Better approach: {fix}</span></div>)}</div>
}

export function AIMLNext({ href, number, section, title, text }: { href: string; number: string; section: string; title: string; text: string }) {
  return <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, margin: '28px 0' }}><div><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1D9E75', fontFamily: 'var(--font-mono)', marginBottom: 5 }}>Next — Lesson {number} · {section}</div><div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{title}</div><p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: '4px 0 0' }}>{text}</p></div><Link href={href} style={{ fontSize: 12, color: '#1D9E75', fontWeight: 700, border: '1px solid #1D9E75', padding: '7px 14px', borderRadius: 6, fontFamily: 'var(--font-mono)', textDecoration: 'none', whiteSpace: 'nowrap' }}>Start →</Link></div>
}

export function AIMLListCard({ title, items }: { title: string; items: string[] }) {
  return <div style={{ background: 'rgba(0,230,118,0.04)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 8, padding: '16px 20px', marginBottom: 20 }}><h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', fontSize: 16, margin: '0 0 10px' }}>{title}</h3><AIMLList items={items} /></div>
}
