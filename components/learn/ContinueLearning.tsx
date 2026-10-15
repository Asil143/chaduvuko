'use client'

import Link from 'next/link'
import { useProgress } from '@/lib/progress'

function humanize(href: string) {
  const slug = href.split('/').filter(Boolean).pop() ?? ''
  return slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
}

export function ContinueLearning() {
  const progress = useProgress()
  if (!progress) return null

  const completedCount = Object.keys(progress.completed).length
  const lastVisited = progress.lastVisited
  const last = lastVisited && lastVisited.href.startsWith('/') && !lastVisited.href.startsWith('//') && !lastVisited.href.includes('\\')
    ? lastVisited
    : null

  if (!last && completedCount === 0) return null

  return (
    <section
      aria-label="Continue learning"
      style={{ margin: '0 auto 28px', padding: '16px 20px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', justifyContent: 'space-between' }}
    >
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--green)' }}>Continue learning</div>
        <div style={{ color: 'var(--text)', fontWeight: 650, marginTop: 4 }}>
          {last ? humanize(last.href) : 'Pick your next lesson'}
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>
          {completedCount} {completedCount === 1 ? 'lesson' : 'lessons'} completed on this device
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {last && (
          <Link href={last.href} style={{ padding: '9px 16px', borderRadius: 8, background: 'var(--green)', color: '#04210f', fontWeight: 700, textDecoration: 'none' }}>
            Resume →
          </Link>
        )}
        <Link href="/dashboard" style={{ padding: '9px 16px', borderRadius: 8, border: '1px solid var(--border)', color: 'var(--text)', textDecoration: 'none' }}>
          Dashboard & sync
        </Link>
      </div>
    </section>
  )
}
