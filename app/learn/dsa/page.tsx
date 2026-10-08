import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import Link from 'next/link'
import { DSA_UNITS as units } from '@/data/dsa-curriculum'

export const metadata = {
  title: 'Data Structures & Algorithms — Chaduvuko',
  description:
    'Learn DSA from absolute zero to advanced. No CS degree needed. Every concept explained simply in plain English with C code. Built for freshers and non-IT learners.',
}


const phaseColors: Record<string, string> = {
  '00': '#00e676', '01': '#00e676', '02': '#00e676',
  '03': '#7b61ff', '04': '#7b61ff', '05': '#7b61ff',
  '06': '#f97316', '07': '#f97316', '08': '#f97316',
  '09': '#facc15', '10': '#facc15', '11': '#facc15', '12': '#facc15',
  '13': '#4285f4', '14': '#4285f4', '15': '#4285f4',
  '16': '#0078d4', '17': '#0078d4', '18': '#0078d4',
  '19': '#8b5cf6',
}

export default function DSAPage() {
  const totalTopics = units.reduce((acc, u) => acc + u.topics.length, 0)
  const totalTime = units.reduce((acc, u) => acc + parseInt(u.time), 0)
  const totalHours = Math.round(totalTime / 60)

  return (
    <LearnLayout
      title="Data Structures & Algorithms"
      description="From absolute zero to advanced — no CS degree needed. Every concept explained in plain English with C code."
      section="CS Core"
      readTime="Self-paced"
      updatedAt="March 2026"
    >

      {/* ── Who This Is For ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12,
        marginBottom: 40,
      }}>
        {[
          { icon: '🎓', label: 'Complete freshers — zero knowledge required' },
          { icon: '🔄', label: 'Non-IT background switching to tech' },
          { icon: '💼', label: 'Anyone preparing for coding interviews' },
          { icon: '📱', label: 'Students who want real understanding, not just code' },
        ].map((item) => (
          <div key={item.label} style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* ── Stats bar ── */}
      <div style={{
        display: 'flex',
        gap: 24,
        flexWrap: 'wrap',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '20px 28px',
        marginBottom: 40,
      }}>
        {[
          { value: `${units.length}`, label: 'Units' },
          { value: `${totalTopics}+`, label: 'Topics covered' },
          { value: `${totalHours}h`, label: 'Total content' },
          { value: 'C', label: 'Language used' },
          { value: '100%', label: 'Free forever' },
        ].map((stat) => (
          <div key={stat.label}>
            <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--green)', fontFamily: 'var(--font-display)' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── Why C ── */}
      <Callout type="info">
        <strong>Why do we use C?</strong> — C forces you to understand what is actually happening in memory. No garbage collector, no shortcuts. When you learn DSA in C, you truly understand how data is stored and manipulated. Every other language becomes easier after this. You do not need to know C before starting — we teach you exactly what you need, when you need it.
      </Callout>

      {/* ── Prereqs ── */}
      <Callout type="tip">
        <strong>Prerequisites:</strong> None. Absolutely zero. If you can use a computer and type, you can start Unit 00 right now. No math degree, no prior coding, no CS background required.
      </Callout>

      {/* ── Units heading ── */}
      <div style={{ marginTop: 48, marginBottom: 8 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', marginBottom: 10,
        }}>
          // Curriculum
        </div>
        <h2 style={{
          fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
          letterSpacing: '-1px', color: 'var(--text)',
          fontFamily: 'var(--font-display)', marginBottom: 6,
        }}>
          20 Units. Zero to Advanced.
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, maxWidth: 560 }}>
          Go in order. Each unit builds on the last. Do not skip — every concept
          is introduced exactly when you need it, not before.
        </p>
      </div>

      {/* ── Unit Cards ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
        {units.map((unit) => {
          const accentColor = phaseColors[unit.number] || 'var(--green)'
          const isLive = unit.status === 'live'

          return (
            <div
              key={unit.number}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                overflow: 'hidden',
                opacity: isLive ? 1 : 0.88,
                transition: 'border-color 0.2s, transform 0.15s',
              }}
            >
              {/* Top accent line */}
              <div style={{ height: 3, background: accentColor, opacity: 0.7 }} />

              <div style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>

                  {/* Left: number + title + desc */}
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: 11,
                        fontWeight: 700, color: accentColor,
                        background: `${accentColor}18`,
                        border: `1px solid ${accentColor}33`,
                        borderRadius: 6, padding: '3px 8px',
                      }}>
                        UNIT {unit.number}
                      </span>
                      {isLive ? (
                        <span style={{
                          fontSize: 10, fontWeight: 700, color: 'var(--green)',
                          background: 'rgba(0,230,118,0.12)', border: '1px solid rgba(0,230,118,0.3)',
                          borderRadius: 20, padding: '2px 10px', letterSpacing: '.08em',
                        }}>
                          ✓ LIVE
                        </span>
                      ) : (
                        <span style={{
                          fontSize: 10, fontWeight: 600, color: 'var(--muted)',
                          background: 'var(--bg2)', border: '1px solid var(--border)',
                          borderRadius: 20, padding: '2px 10px', letterSpacing: '.08em',
                        }}>
                          COMING SOON
                        </span>
                      )}
                    </div>

                    <h3 style={{
                      fontSize: 17, fontWeight: 800, color: 'var(--text)',
                      fontFamily: 'var(--font-display)', marginBottom: 6, letterSpacing: '-0.5px',
                    }}>
                      {unit.title}
                    </h3>

                    <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 14, maxWidth: 560 }}>
                      {unit.description}
                    </p>

                    {/* Topic pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {unit.topics.map((topic) => (
                        <span key={topic} style={{
                          fontSize: 11, color: 'var(--muted)',
                          background: 'var(--bg2)', border: '1px solid var(--border)',
                          borderRadius: 20, padding: '3px 10px',
                          fontFamily: 'var(--font-mono)',
                        }}>
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: time + CTA */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12, paddingTop: 4 }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                        {unit.time}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>read time</div>
                    </div>

                    {isLive ? (
                      <Link
                        href={`/learn/dsa/${unit.slug}`}
                        style={{
                          display: 'inline-block',
                          background: accentColor,
                          color: '#000',
                          fontSize: 12,
                          fontWeight: 700,
                          borderRadius: 8,
                          padding: '8px 18px',
                          textDecoration: 'none',
                          letterSpacing: '.04em',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Start →
                      </Link>
                    ) : (
                      <span style={{
                        display: 'inline-block',
                        background: 'var(--bg2)',
                        color: 'var(--muted)',
                        fontSize: 12,
                        fontWeight: 600,
                        borderRadius: 8,
                        padding: '8px 18px',
                        letterSpacing: '.04em',
                        cursor: 'not-allowed',
                        border: '1px solid var(--border)',
                        whiteSpace: 'nowrap',
                      }}>
                        Soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{
        marginTop: 56,
        background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(123,97,255,0.06) 100%)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '36px 32px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--green)',
          fontFamily: 'var(--font-mono)', marginBottom: 14,
        }}>
          // Ready to start?
        </div>
        <h3 style={{
          fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 900,
          color: 'var(--text)', fontFamily: 'var(--font-display)',
          letterSpacing: '-1px', marginBottom: 12,
        }}>
          Units are dropping weekly.
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 24px' }}>
          Start with Unit 00 the moment it goes live. Each unit is self-contained —
          no chapter you need to have read first. Just come back, pick up where you left off.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/learn/roadmap"
            style={{
              display: 'inline-block',
              background: 'var(--green)',
              color: '#000',
              fontWeight: 700,
              fontSize: 13,
              borderRadius: 8,
              padding: '10px 24px',
              textDecoration: 'none',
            }}
          >
            View full roadmap →
          </Link>
          <Link
            href="/learn/projects"
            style={{
              display: 'inline-block',
              background: 'var(--surface)',
              color: 'var(--text)',
              fontWeight: 600,
              fontSize: 13,
              borderRadius: 8,
              padding: '10px 24px',
              textDecoration: 'none',
              border: '1px solid var(--border)',
            }}
          >
            Browse projects
          </Link>
        </div>
      </div>

    </LearnLayout>
  )
}
