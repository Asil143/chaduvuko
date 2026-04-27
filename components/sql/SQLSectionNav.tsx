'use client'

import Link from 'next/link'
import { SQL_CURRICULUM } from '@/data/sql-freshcart'

export default function SQLSectionNav({ slug }: { slug: string }) {
  const section = SQL_CURRICULUM.find(s => s.modules.some(m => m.slug === slug))
  if (!section) return null

  const color = section.color

  return (
    <div style={{ marginBottom: 36 }}>
      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        <Link href="/learn/sql" style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}>
          SQL
        </Link>
        <span style={{ fontSize: 12, color: 'var(--border)', userSelect: 'none' }}>›</span>
        <span style={{ fontSize: 12, color, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
          {section.title}
        </span>
      </nav>

      {/* Section badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '4px 12px', borderRadius: 5,
        border: `1px solid ${color}40`, background: `${color}10`,
        marginBottom: 20,
      }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.09em',
          textTransform: 'uppercase', color,
          fontFamily: 'var(--font-mono)',
        }}>
          Section {section.id} · {section.title}
        </span>
      </div>

      {/* Module progress panel */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 10, padding: '14px 16px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--muted)',
            fontFamily: 'var(--font-mono)',
          }}>
            {section.title} · {section.modules.length} modules
          </span>
          <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
            Module {section.modules.find(m => m.slug === slug)?.id ?? '—'}
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', gap: 3, marginBottom: 8 }}>
          {section.modules.map(m => {
            const isActive = m.slug === slug
            const isLive = m.status === 'live'
            const href = isLive ? `/learn/sql/${m.slug}` : '#'
            return (
              <Link
                key={m.slug}
                href={href}
                title={m.title}
                style={{
                  flex: 1, height: 5, borderRadius: 3, display: 'block', textDecoration: 'none',
                  background: isActive ? color : isLive ? `${color}40` : 'var(--border)',
                }}
              />
            )
          })}
        </div>

        {/* Module name pills */}
        <div style={{ display: 'flex', gap: 3 }}>
          {section.modules.map(m => {
            const isActive = m.slug === slug
            const isLive = m.status === 'live'
            const href = isLive ? `/learn/sql/${m.slug}` : '#'
            return (
              <Link
                key={m.slug}
                href={href}
                title={m.title}
                style={{
                  flex: 1, fontSize: 9, textAlign: 'center', overflow: 'hidden',
                  textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  color: isActive ? color : isLive ? 'var(--muted)' : 'var(--border)',
                  fontWeight: isActive ? 700 : 400,
                  textDecoration: 'none',
                  fontFamily: 'var(--font-mono)',
                  opacity: isActive || isLive ? 1 : 0.5,
                }}
              >
                {m.title.split(' ')[0]}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
