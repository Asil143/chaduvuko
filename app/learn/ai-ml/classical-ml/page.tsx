import type { Metadata } from 'next'
import Link from 'next/link'
import { AIML_SECTIONS } from '@/data/aiml-curriculum'

export const metadata: Metadata = {
  title: 'Classical Machine Learning — Chaduvuko',
}

export default function ClassicalMLIndexPage() {
  const section = AIML_SECTIONS.find((s) => s.slug === 'classical-ml')!
  const color = section.color

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '64px 24px 100px' }}>

        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 28, flexWrap: 'wrap' as const }}>
          <Link href="/learn/ai-ml" style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}>
            AI &amp; ML
          </Link>
          <span style={{ fontSize: 12, color: 'var(--border)' }}>›</span>
          <span style={{ fontSize: 12, color, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
            Classical ML
          </span>
        </nav>

        {/* Section tag pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '4px 12px', borderRadius: 5,
          border: `1px solid ${color}40`, background: `${color}10`,
          marginBottom: 20,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.09em',
            textTransform: 'uppercase' as const, color,
            fontFamily: 'var(--font-mono)',
          }}>
            Section {section.num} · {section.title}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(26px, 4vw, 42px)',
          fontWeight: 900,
          letterSpacing: '-2px',
          color: 'var(--text)',
          marginBottom: 16,
          lineHeight: 1.1,
        }}>
          Classical Machine Learning
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 15,
          color: 'var(--muted)',
          lineHeight: 1.75,
          marginBottom: 48,
          maxWidth: 600,
        }}>
          The algorithms powering 80% of production ML today. Every topic uses the same running example —
          predicting Swiggy delivery time — so you always know exactly why each concept matters.
        </p>

        {/* Topic list */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
          {section.topics.map((topic, i) => {
            const num = String(i + 1).padStart(2, '0')
            const isLive = topic.status === 'live'

            const inner = (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: 'var(--surface)',
                border: isLive ? `1px solid ${color}50` : '1px solid var(--border)',
                borderRadius: 10,
                padding: '14px 18px',
                opacity: isLive ? 1 : 0.6,
                textDecoration: 'none',
              }}>
                {/* Number circle */}
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: isLive ? `${color}18` : 'var(--bg)',
                  border: isLive ? `1.5px solid ${color}60` : '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700,
                  color: isLive ? color : 'var(--muted)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {num}
                </div>

                {/* Title */}
                <span style={{
                  flex: 1,
                  fontSize: 14,
                  fontWeight: isLive ? 600 : 400,
                  color: isLive ? 'var(--text)' : 'var(--muted)',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.2px',
                }}>
                  {topic.title}
                </span>

                {/* Badge */}
                {isLive ? (
                  <span style={{
                    fontSize: 10, padding: '3px 10px', borderRadius: 4,
                    background: `${color}18`, color,
                    border: `1px solid ${color}50`,
                    fontWeight: 700, fontFamily: 'var(--font-mono)',
                    whiteSpace: 'nowrap' as const,
                  }}>
                    read →
                  </span>
                ) : (
                  <span style={{
                    fontSize: 10, padding: '3px 10px', borderRadius: 4,
                    background: 'var(--bg)', color: 'var(--muted)',
                    border: '1px solid var(--border)',
                    fontFamily: 'var(--font-mono)',
                    whiteSpace: 'nowrap' as const,
                  }}>
                    soon
                  </span>
                )}
              </div>
            )

            return isLive ? (
              <Link
                key={topic.slug}
                href={`/learn/ai-ml/classical-ml/${topic.slug}`}
                style={{ textDecoration: 'none' }}
              >
                {inner}
              </Link>
            ) : (
              <div key={topic.slug}>{inner}</div>
            )
          })}
        </div>

        {/* Back link */}
        <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
          <Link href="/learn/ai-ml" style={{
            fontSize: 13, color: 'var(--muted)', textDecoration: 'none',
            fontFamily: 'var(--font-mono)',
          }}>
            ← Back to AI &amp; ML track
          </Link>
        </div>

      </div>
    </main>
  )
}
