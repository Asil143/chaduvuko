'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { DBMS_SECTIONS as sections, DBMS_MODULES as modules } from '@/data/dbms-curriculum'

type SectionFilter = 'all' | '1' | '2' | '3' | '4' | '5'


export default function DBMSTrackPage() {
  const [activeSection, setActiveSection] = useState<SectionFilter>('all')

  const filtered = activeSection === 'all'
    ? modules
    : modules.filter(m => m.section === parseInt(activeSection))

  const totalCount = modules.length
  const liveCount  = modules.filter(m => m.status === 'live').length
  const totalMinutes = modules.reduce((sum, m) => {
    const parts = m.time.match(/\d+/g) ?? ['0']
    const avg = parts.length > 1 ? (parseInt(parts[0]) + parseInt(parts[1])) / 2 : parseInt(parts[0])
    return sum + avg
  }, 0)
  const totalHours = Math.round(totalMinutes / 60)

  return (
    <LearnLayout
      title="Database Management Systems (DBMS)"
      description="Complete track from absolute zero — ER diagrams, normalization, SQL, indexes, transactions, B+ trees, distributed databases, NoSQL, and interview prep."
      section="CS Core"
      readTime="Self-paced"
      updatedAt="March 2026"
    >

      {/* ── Stats Bar ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 36 }}>
        {[
          { label: 'Modules',      value: `${totalCount}` },
          { label: 'Live Now',     value: `${liveCount}`  },
          { label: 'Total Hours',  value: `~${totalHours}h` },
          { label: 'Coverage',     value: 'GATE + Placements' },
          { label: 'Prerequisite', value: 'None' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '10px 16px',
            display: 'flex', flexDirection: 'column', gap: 2,
          }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.5px' }}>
              {s.value}
            </span>
            <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <Callout type="info">
        <strong>No prior knowledge needed — zero.</strong> This track is built for freshers, career switchers,
        and non-IT backgrounds. If you know what a spreadsheet is, you have everything you need to start.
        DBMS is taught in every CS/IT degree — but most explanations are textbook-heavy and confusing.
        This track explains it the way a senior engineer would explain it to you over chai.
      </Callout>

      {/* ── What makes this different ── */}
      <div style={{ marginBottom: 40, marginTop: 32 }}>
        <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 16 }}>
          What makes this different
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {[
            { icon: '◎', title: 'GATE + Placement Ready',    desc: 'Every topic mapped to GATE syllabus, campus placement rounds, and product company interviews — one track covers all three.', color: '#ec4899' },
            { icon: '⊞', title: 'Visual Theory Diagrams',    desc: 'ER diagrams, B+ trees, lock graphs, and ARIES recovery drawn step by step — not just textbook definitions.', color: '#0078d4' },
            { icon: '▶', title: '60 Interview Questions',     desc: 'A full module of categorized Q&A — service companies, product companies, and GATE-level questions with complete answers.', color: '#00e676', href: '/learn/dbms/interview-questions' },
            { icon: '≡', title: 'Theory + SQL Together',      desc: 'DBMS theory and SQL practice taught in the same track so you understand why the syntax works, not just how to write it.', color: '#8b5cf6' },
          ].map(f => (
            <div key={f.title} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '20px',
            }}>
              <div style={{ fontSize: 20, color: f.color, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: f.href ? 12 : 0 }}>{f.desc}</div>
              {f.href && (
                <a href={f.href} style={{ fontSize: 12, color: f.color, textDecoration: 'none', fontWeight: 600 }}>Open →</a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Curriculum heading + section filter ── */}
      <div style={{ marginTop: 48, marginBottom: 8 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', marginBottom: 10,
        }}>
          // Curriculum
        </div>

        <div style={{ marginBottom: 6 }}>
          <div style={{ marginBottom: 14 }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(20px, 3vw, 28px)',
              fontWeight: 900, letterSpacing: '-1px',
              color: 'var(--text)', margin: 0,
            }}>
              20 Modules. Zero to Advanced.
            </h2>
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'nowrap' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {(['all', '1', '2', '3', '4', '5'] as SectionFilter[]).map(f => {
                const section = sections.find(p => String(p.id) === f)
                const isActive = activeSection === f
                const color = section?.color ?? 'var(--accent)'
                return (
                  <button
                    key={f}
                    onClick={() => setActiveSection(f)}
                    style={{
                      fontSize: 11, fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      padding: '5px 12px', borderRadius: 6,
                      border: isActive ? `1px solid ${color}` : '1px solid var(--border)',
                      background: isActive ? `${color}18` : 'var(--surface)',
                      color: isActive ? color : 'var(--muted)',
                      cursor: 'pointer', transition: 'all 0.15s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {f === 'all' ? 'All' : `Section ${f}`}
                  </button>
                )
              })}
            </div>
            <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {filtered.length} modules
            </span>
          </div>
        </div>
      </div>

      {/* ── Module Cards ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
        {filtered.map((mod, i) => {
          const section = sections.find(p => p.id === mod.section)!
          const color = section.color
          const isLive = mod.status === 'live'
          const prevMod = filtered[i - 1]
          const showHeader = activeSection === 'all' && (i === 0 || prevMod.section !== mod.section)

          return (
            <div key={mod.number}>
              {/* Section separator */}
              {showHeader && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  marginTop: i === 0 ? 0 : 24, marginBottom: 10,
                }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '.1em',
                    textTransform: 'uppercase', color, fontFamily: 'var(--font-mono)',
                  }}>
                    Section {mod.section} — {section.title}
                  </span>
                  <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                    · {modules.filter(m => m.section === mod.section).length} modules
                  </span>
                </div>
              )}

              {/* Card */}
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                overflow: 'hidden',
                opacity: isLive ? 1 : 0.88,
                transition: 'border-color 0.2s',
              }}>
                <div style={{ height: 3, background: color, opacity: 0.75 }} />

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
                          color, background: `${color}18`, border: `1px solid ${color}33`,
                          borderRadius: 6, padding: '3px 8px',
                        }}>
                          MODULE {mod.number}
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
                            COMING SOON
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
                        {mod.desc}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {mod.topics.map(t => (
                          <span key={t} style={{
                            fontSize: 11, color: 'var(--muted)',
                            background: 'var(--bg2)', border: '1px solid var(--border)',
                            borderRadius: 20, padding: '3px 10px',
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right — time + difficulty + CTA */}
                    <div style={{
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'flex-end', gap: 10, paddingTop: 4,
                    }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                          ⏱ {mod.time}
                        </div>
                        <div style={{
                          fontSize: 11, fontWeight: 600,
                          color, background: `${color}12`,
                          border: `1px solid ${color}30`,
                          borderRadius: 4, padding: '2px 8px',
                          fontFamily: 'var(--font-mono)', display: 'inline-block',
                        }}>
                          {mod.difficulty}
                        </div>
                      </div>

                      {isLive ? (
                        <Link href={`/learn/dbms/${mod.slug}`} style={{
                          display: 'inline-block', background: color, color: '#000',
                          fontSize: 12, fontWeight: 700, borderRadius: 8,
                          padding: '8px 18px', textDecoration: 'none',
                          letterSpacing: '.04em', whiteSpace: 'nowrap',
                        }}>
                          Start →
                        </Link>
                      ) : (
                        <span style={{
                          display: 'inline-block', background: 'var(--bg2)',
                          color: 'var(--muted)', fontSize: 12, fontWeight: 600,
                          borderRadius: 8, padding: '8px 18px',
                          letterSpacing: '.04em', border: '1px solid var(--border)',
                          whiteSpace: 'nowrap', cursor: 'not-allowed',
                        }}>
                          Soon
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

      {/* ── Bottom CTA ── */}
      <div style={{
        marginTop: 56,
        background: 'linear-gradient(135deg, rgba(0,120,212,0.06) 0%, rgba(139,92,246,0.06) 100%)',
        border: '1px solid var(--border)',
        borderRadius: 14, padding: '36px 32px', textAlign: 'center',
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: '#0078d4',
          fontFamily: 'var(--font-mono)', marginBottom: 14,
        }}>
          // Ready to start?
        </div>
        <h3 style={{
          fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 900,
          color: 'var(--text)', letterSpacing: '-1px', marginBottom: 12,
        }}>
          20 modules. Zero to exam-ready.
        </h3>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 24px' }}>
          Start with Module 01 right now — no prior database knowledge needed.
          Every module builds on the previous one, in the exact order it should be learned.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/learn/dbms/introduction" style={{
            display: 'inline-block', background: '#0078d4', color: '#fff',
            fontWeight: 700, fontSize: 13, borderRadius: 8,
            padding: '10px 24px', textDecoration: 'none',
          }}>
            Start Module 01 →
          </Link>
          <Link href="/learn/interview" style={{
            display: 'inline-block', background: 'var(--surface)', color: 'var(--text)',
            fontWeight: 600, fontSize: 13, borderRadius: 8,
            padding: '10px 24px', textDecoration: 'none',
            border: '1px solid var(--border)',
          }}>
            Interview Prep →
          </Link>
        </div>
      </div>

    </LearnLayout>
  )
}
