import type { Subject } from '@/data/subjects/types'
import Link from 'next/link'

interface Props {
  subject: Subject
  breadcrumbs: { label: string; href: string }[]
}

const LEVEL_COLOR: Record<string, string> = {
  beginner: '#065f2c',
  intermediate: '#7a4a00',
  advanced: '#8b0000',
}

export default function SubjectPage({ subject, breadcrumbs }: Props) {
  const totalTopics = subject.chapters.reduce((sum, ch) => sum + ch.topics.length, 0)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '0 0 80px' }}>

      {/* Top bar */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '14px 24px' }}>

          {/* Breadcrumb */}
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</Link>
            {breadcrumbs.map((b, i) => (
              <span key={i} style={{ display: 'contents' }}>
                <span style={{ opacity: 0.4 }}>›</span>
                <Link href={b.href} style={{ color: 'var(--muted)', textDecoration: 'none' }}>{b.label}</Link>
              </span>
            ))}
            <span style={{ opacity: 0.4 }}>›</span>
            <span style={{ color: 'var(--text)' }}>{subject.name}</span>
          </div>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ width: 48, height: 48, borderRadius: 10, background: subject.color + '18', border: `1.5px solid ${subject.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 16, height: 16, borderRadius: 4, background: subject.color }} />
            </div>
            <div style={{ flex: 1 }}>
              {subject.className && (
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: subject.color, marginBottom: 4 }}>
                  {subject.className}{subject.board ? ` · ${subject.board}` : ''}
                </div>
              )}
              <h1 style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', lineHeight: 1.1, marginBottom: 8 }}>
                {subject.name}
              </h1>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 580, marginBottom: 12 }}>
                {subject.description}
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: subject.live ? '#d4f5e2' : 'var(--surface)', color: subject.live ? '#065f2c' : 'var(--muted)', border: `1px solid ${subject.live ? '#7dd4a4' : 'var(--border)'}` }}>
                  {subject.live ? 'Live' : 'Coming soon'}
                </span>
                <span style={{ fontSize: 11, color: 'var(--muted)', background: 'var(--surface)', padding: '3px 10px', borderRadius: 20, border: '1px solid var(--border)' }}>
                  {subject.chapters.length} chapters
                </span>
                <span style={{ fontSize: 11, color: 'var(--muted)', background: 'var(--surface)', padding: '3px 10px', borderRadius: 20, border: '1px solid var(--border)' }}>
                  {totalTopics} topics
                </span>
                <span style={{ fontSize: 11, color: 'var(--muted)', background: 'var(--surface)', padding: '3px 10px', borderRadius: 20, border: '1px solid var(--border)' }}>
                  {subject.level}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>

        {!subject.live && (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${subject.color}`, borderRadius: 10, padding: '16px 20px', marginBottom: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: subject.color, marginBottom: 4 }}>Coming soon</div>
            <div style={{ fontSize: 14, color: 'var(--text)', fontWeight: 700, marginBottom: 4 }}>Content is being written for this subject</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
              The chapter outline below shows exactly what will be covered. Content for {subject.name} is actively being prepared and will be published section by section — 100% free, no login required.
            </div>
          </div>
        )}

        {/* Chapter list */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>
            Course outline — {subject.chapters.length} chapters
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {subject.chapters.map((ch, i) => (
              <div
                key={i}
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}
              >
                <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 26, height: 26, borderRadius: 8, background: subject.color + '18', border: `1px solid ${subject.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: subject.color, flexShrink: 0 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', flex: 1 }}>{ch.title}</span>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>{ch.topics.length} topics</span>
                </div>
                <div style={{ borderTop: '1px solid var(--border)', padding: '10px 18px 14px 56px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {ch.topics.map((topic, j) => (
                    <span
                      key={j}
                      style={{ fontSize: 11, color: 'var(--muted)', background: 'var(--bg)', padding: '3px 10px', borderRadius: 20, border: '1px solid var(--border)' }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div style={{ marginTop: 32, padding: '16px 20px', background: 'var(--surface)', borderRadius: 10, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#009950', flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>
            Chaduvuko is 100% free · No login · No ads · Built for every student in India
          </span>
          <Link href="/learn/roadmap" style={{ marginLeft: 'auto', fontSize: 12, color: '#009950', textDecoration: 'none', fontWeight: 700 }}>
            View roadmap →
          </Link>
        </div>
      </div>
    </div>
  )
}