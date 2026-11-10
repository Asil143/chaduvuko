'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { TrackStats } from '@/components/content/TrackStats'
import { DE_CURRICULUM } from '@/data/de-curriculum'

const FOUNDATION_LESSONS = [
  { href: '/learn/what-is-data-engineering', title: 'What is Data Engineering?' },
  { href: '/learn/foundations/sql', title: 'SQL for Data Engineers' },
  { href: '/learn/foundations/postgresql', title: 'PostgreSQL' },
  { href: '/learn/foundations/python', title: 'Python for Data Engineers' },
]

type PhaseFilter = 'all' | '1' | '2' | '3' | '4' | '5' | '6' | '7'

interface Module {
  num: string
  title: string
  slug: string
  readTime: string
  status: 'live' | 'soon'
  phase: number
  description: string
  topics: string[]
  color: string
}

// Derived from the shared DE_CURRICULUM
// so the module list only has one source of truth.
const phaseColors: Record<number, string> = Object.fromEntries(
  DE_CURRICULUM.map(s => [s.id, s.color])
)

const phaseInfo = DE_CURRICULUM.map(s => ({ id: s.id, title: s.title }))

const modules: Module[] = DE_CURRICULUM.flatMap(s => s.modules.map(m => ({
  num: String(m.id).padStart(2, '0'),
  title: m.title,
  slug: m.slug,
  readTime: m.readTime,
  status: m.status,
  phase: s.id,
  description: m.description,
  topics: m.tags,
  color: s.color,
})))

export default function DataEngineeringTrack() {
  const [activePhase, setActivePhase] = useState<PhaseFilter>('all')

  const filtered =
    activePhase === 'all'
      ? modules
      : modules.filter((m) => m.phase === parseInt(activePhase))

  const liveModules = modules.filter(m => m.status === 'live')
  const totalTopics  = liveModules.reduce((sum, m) => sum + m.topics.length, 0)

  return (
    <LearnLayout
      title="Data Engineering"
      description="A structured Data Engineering course: four foundation lessons, then 51 core lessons from first pipelines to production patterns."
      section="Data Engineering"
      readTime="Self-paced"
      updatedAt="November 2026"
    >

      {/* ── Who This Is For ────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12,
        marginBottom: 40,
      }}>
        {[
          { icon: '🎓', label: 'New to Data Engineering — no prior DE job experience required' },
          { icon: '🔄', label: 'Non-IT background switching to tech' },
          { icon: '💼', label: 'Anyone preparing for DE interviews' },
          { icon: '📱', label: 'Students who want real depth, not just definitions' },
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

      <TrackStats
        lessons={liveModules.length}
        phases={phaseInfo.length}
        topics={totalTopics}
      />

      {/* ── Tooling expectations ───────────────────────────────────────── */}
      <div style={{
        background: 'rgba(0,230,118,0.06)',
        border: '1px solid rgba(0,230,118,0.2)',
        borderRadius: 10,
        padding: '16px 20px',
        marginBottom: 40,
        fontSize: 14,
        color: 'var(--text)',
        lineHeight: 1.7,
      }}>
        <strong style={{ color: 'var(--accent)' }}>Know what the examples require.</strong>{' '}
        The lessons discuss cloud and platform tools including Azure, AWS, GCP, Spark, Airflow, Kafka, and Snowflake.
        Most guided workshops use local or self-contained examples; some cloud examples require a separate account, setup,
        and may incur provider charges. Check each lesson before running an external service.
      </div>

      <p style={{ margin: '-20px 0 32px', color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>
        No prior Data Engineering job experience is required. Lessons 14 and 15 assume Python and SQL basics; if needed,
        start with <Link href="/learn/python" style={{ color: 'var(--accent)' }}>Python foundations</Link> and{' '}
        <Link href="/learn/sql" style={{ color: 'var(--accent)' }}>SQL foundations</Link> first.
      </p>

      {/* ── Start here: foundation lessons ─────────────────────────────── */}
      <section aria-labelledby="de-foundations" style={{ marginBottom: 8 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', marginBottom: 10,
        }}>
          {'// Start here'}
        </div>
        <h2 id="de-foundations" style={{
          fontSize: 'clamp(18px, 2.2vw, 24px)', fontWeight: 900, letterSpacing: '-0.5px',
          color: 'var(--text)', fontFamily: 'var(--font-display)', margin: '0 0 6px',
        }}>
          Data Engineering Foundations
        </h2>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 560, margin: '0 0 16px' }}>
          Four short lessons on what the job is and the SQL, PostgreSQL, and Python you use every day. Then start the core curriculum below.
        </p>
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
          {FOUNDATION_LESSONS.map((lesson, i) => (
            <li key={lesson.href}>
              <Link href={lesson.href} style={{
                display: 'block', height: '100%', background: 'var(--surface)',
                border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px', textDecoration: 'none',
              }}>
                <span style={{ display: 'block', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>F{i + 1}</span>
                <span style={{ display: 'block', marginTop: 4, fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{lesson.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Curriculum heading + phase filter ─────────────────────────── */}
      <div style={{ marginTop: 48, marginBottom: 8 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', marginBottom: 10,
        }}>
          {'// Curriculum'}
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 6,
        }}>
          <div>
            <h2 style={{
              fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
              letterSpacing: '-1px', color: 'var(--text)',
              fontFamily: 'var(--font-display)', marginBottom: 6,
            }}>
              Core curriculum: 51 lessons.
            </h2>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 520, margin: 0 }}>
              Follow in order. Each module builds on the last. Every concept is
              introduced exactly when you need it, not before.
            </p>
          </div>

          {/* Phase filter tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {(['all', '1', '2', '3', '4', '5', '6', '7'] as PhaseFilter[]).map((f) => {
              const col = f === 'all' ? 'var(--accent)' : phaseColors[parseInt(f)]
              const isActive = activePhase === f
              return (
                <button
                  key={f}
                  onClick={() => setActivePhase(f)}
                  style={{
                    fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)',
                    letterSpacing: '.08em', textTransform: 'uppercase',
                    padding: '6px 12px', borderRadius: 8, cursor: 'pointer',
                    border: isActive ? `1px solid ${col}` : '1px solid var(--border)',
                    background: isActive ? `${col}18` : 'var(--surface)',
                    color: isActive ? col : 'var(--muted)',
                    transition: 'all 0.15s',
                  }}
                >
                  {f === 'all' ? 'All' : `P${f}`}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Module Cards ───────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
        {filtered.map((mod, idx) => {
          const isLive = mod.status === 'live'
          const href   = isLive ? `/learn/data-engineering/${mod.slug}` : '#'

          return (
            <div key={mod.num}>

              {/* Phase section header — 'all' view only */}
              {activePhase === 'all' && (idx === 0 || filtered[idx - 1].phase !== mod.phase) && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: idx === 0 ? '16px 0 10px' : '28px 0 10px',
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                    background: `${mod.color}18`, border: `1px solid ${mod.color}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 900, color: mod.color,
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {mod.phase}
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: mod.color,
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase',
                  }}>
                    Phase {mod.phase} — {phaseInfo[mod.phase - 1].title}
                  </span>
                </div>
              )}

              {/* Card — exact DSA card structure */}
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                overflow: 'hidden',
                opacity: isLive ? 1 : 0.88,
                transition: 'border-color 0.2s',
              }}>
                {/* Colored top accent bar */}
                <div style={{ height: 3, background: mod.color, opacity: 0.75 }} />

                <div style={{ padding: '20px 24px' }}>
                  <div style={{
                    display: 'flex', alignItems: 'flex-start',
                    justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
                  }}>

                    {/* Left */}
                    <div style={{ flex: 1, minWidth: 240 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                          color: mod.color,
                          background: `${mod.color}18`,
                          border: `1px solid ${mod.color}33`,
                          borderRadius: 6, padding: '3px 8px',
                        }}>
                          MODULE {mod.num}
                        </span>
                        {isLive ? (
                          <span style={{
                            fontSize: 10, fontWeight: 700, color: 'var(--green)',
                            background: 'rgba(0,230,118,0.12)',
                            border: '1px solid rgba(0,230,118,0.3)',
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
                            COMING live
                          </span>
                        )}
                      </div>

                      <h3 style={{
                        fontSize: 17, fontWeight: 800, color: 'var(--text)',
                        fontFamily: 'var(--font-display)', marginBottom: 6,
                        letterSpacing: '-0.4px', lineHeight: 1.3,
                      }}>
                        {mod.title}
                      </h3>

                      <p style={{
                        fontSize: 13, color: 'var(--muted)', lineHeight: 1.65,
                        marginBottom: 14, maxWidth: 560,
                      }}>
                        {mod.description}
                      </p>

                      {/* Topic pills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {mod.topics.map((topic) => (
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

                    {/* Right — read time + CTA */}
                    <div style={{
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'flex-end', gap: 12, paddingTop: 4,
                    }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          fontSize: 18, fontWeight: 800, color: 'var(--text)',
                          fontFamily: 'var(--font-display)',
                        }}>
                          {mod.readTime}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--muted)' }}>read time</div>
                      </div>

                      {isLive ? (
                        <Link href={href} style={{
                          display: 'inline-block',
                          background: mod.color,
                          color: '#000',
                          fontSize: 12, fontWeight: 700,
                          borderRadius: 8, padding: '8px 18px',
                          textDecoration: 'none',
                          letterSpacing: '.04em', whiteSpace: 'nowrap',
                        }}>
                          Start →
                        </Link>
                      ) : (
                        <span style={{
                          display: 'inline-block',
                          background: 'var(--bg2)', color: 'var(--muted)',
                          fontSize: 12, fontWeight: 600,
                          borderRadius: 8, padding: '8px 18px',
                          letterSpacing: '.04em', cursor: 'not-allowed',
                          border: '1px solid var(--border)', whiteSpace: 'nowrap',
                        }}>
                          live
                        </span>
                      )}
                    </div>

                  </div>
                </div>
              </div>

            </div>
          )
        })}
      </div>

      {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
      <div style={{
        marginTop: 56,
        background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(66,133,244,0.06) 100%)',
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
          {'// Ready to start?'}
        </div>
        <h3 style={{
          fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 900,
          color: 'var(--text)', fontFamily: 'var(--font-display)',
          letterSpacing: '-1px', marginBottom: 12,
        }}>
          Modules are dropping weekly.
        </h3>
        <p style={{
          fontSize: 14, color: 'var(--muted)', lineHeight: 1.7,
          maxWidth: 480, margin: '0 auto 24px',
        }}>
          Start with Lesson 01 the moment it goes live. Each module is self-contained
          enough to read on its own — but follow the order. Every concept earns the next one.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/learn/roadmap" style={{
            display: 'inline-block', background: 'var(--green)',
            color: '#000', fontWeight: 700, fontSize: 13,
            borderRadius: 8, padding: '10px 24px', textDecoration: 'none',
          }}>
            View full roadmap →
          </Link>
          <Link href="/learn/projects" style={{
            display: 'inline-block', background: 'var(--surface)',
            color: 'var(--text)', fontWeight: 600, fontSize: 13,
            borderRadius: 8, padding: '10px 24px', textDecoration: 'none',
            border: '1px solid var(--border)',
          }}>
            Browse projects
          </Link>
        </div>
      </div>

    </LearnLayout>
  )
}
