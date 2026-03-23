'use client'

import Link from 'next/link'
import { getSectionBySlug } from '@/data/aiml-curriculum'

type Props = {
  section: string
  topic: string
  completedTopics?: string[]
}

export default function MLPageHeader({ section, topic, completedTopics = [] }: Props) {
  const sec = getSectionBySlug(section)
  if (!sec) return null

  const currentTopic = sec.topics.find((t) => t.slug === topic)
  const color = sec.color

  return (
    <div style={{ marginBottom: 36 }}>
      <nav aria-label="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14, flexWrap: 'wrap' as const }}>
        <Link href="/learn/ai-ml" style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}>
          AI &amp; ML
        </Link>
        <span style={{ fontSize: 12, color: 'var(--border)', userSelect: 'none' as const }}>›</span>
        <Link href={`/learn/ai-ml/${section}`} style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}>
          {sec.shortTitle}
        </Link>
        <span style={{ fontSize: 12, color: 'var(--border)', userSelect: 'none' as const }}>›</span>
        <span style={{ fontSize: 12, color, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
          {currentTopic?.title ?? topic}
        </span>
      </nav>

      <Link href={`/learn/ai-ml/${section}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '4px 12px', borderRadius: 5, border: `1px solid ${color}40`, background: `${color}10`, textDecoration: 'none', marginBottom: 20 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase' as const, color, fontFamily: 'var(--font-mono)' }}>
          Section {sec.num} · {sec.title}
        </span>
      </Link>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
            {sec.shortTitle} · {sec.topics.length} topics
          </span>
          <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
            {completedTopics.length}/{sec.topics.length} done
          </span>
        </div>

        <div style={{ display: 'flex', gap: 3, marginBottom: 8 }}>
          {sec.topics.map((t) => {
            const isDone = completedTopics.includes(t.slug)
            const isActive = t.slug === topic
            return (
              <Link key={t.slug} href={`/learn/ai-ml/${section}/${t.slug}`} title={t.title} style={{ flex: 1, height: 5, borderRadius: 3, background: isDone ? '#00e676' : isActive ? color : 'var(--border)', display: 'block', textDecoration: 'none' }} />
            )
          })}
        </div>

        <div style={{ display: 'flex', gap: 3 }}>
          {sec.topics.map((t) => {
            const isDone = completedTopics.includes(t.slug)
            const isActive = t.slug === topic
            return (
              <Link key={t.slug} href={`/learn/ai-ml/${section}/${t.slug}`} style={{ flex: 1, fontSize: 9, textAlign: 'center' as const, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const, color: isDone ? '#00e676' : isActive ? color : 'var(--muted)', fontWeight: isActive ? 700 : 400, textDecoration: 'none', fontFamily: 'var(--font-mono)', opacity: isDone || isActive ? 1 : 0.6 }} title={t.title}>
                {t.title.split(' ')[0]}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
