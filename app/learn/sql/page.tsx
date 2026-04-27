'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { SQL_CURRICULUM, SQL_TABLES } from '@/data/sql-freshmart'

type SectionFilter = 'all' | string

export default function SQLTrackPage() {
  const [activeSection, setActiveSection] = useState<SectionFilter>('all')

  const allModules = SQL_CURRICULUM.flatMap(s => s.modules.map(m => ({ ...m, sectionId: s.id, sectionTitle: s.title, color: s.color })))

  const filtered =
    activeSection === 'all'
      ? allModules
      : allModules.filter(m => m.sectionId === parseInt(activeSection))

  const totalTopics  = allModules.reduce((sum, m) => sum + m.tags.length, 0)
  const totalMinutes = allModules.reduce((sum, m) => sum + parseInt(m.readTime), 0)
  const totalHours   = Math.round(totalMinutes / 60)

  return (
    <LearnLayout
      title="SQL — Zero to Advanced"
      description="From your first SELECT to window functions and query optimisation — 62 modules, no prerequisites"
      section="SQL"
      readTime="Self-paced"
      updatedAt="April 2026"
    >

      {/* ── Who This Is For ─────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12,
        marginBottom: 40,
      }}>
        {[
          { icon: '🎓', label: 'Complete beginners — zero SQL knowledge needed' },
          { icon: '📊', label: 'Analysts who want to go beyond basic queries' },
          { icon: '💼', label: 'Anyone preparing for SQL interview questions' },
          { icon: '🔄', label: 'Developers switching into data roles' },
        ].map(item => (
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

      {/* ── Stats bar ───────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        gap: 28,
        flexWrap: 'wrap',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '20px 28px',
        marginBottom: 36,
      }}>
        {[
          { value: `${allModules.length}`, label: 'Modules'       },
          { value: '13',                   label: 'Sections'       },
          { value: `${totalTopics}+`,      label: 'Topics covered' },
          { value: `${totalHours}h`,       label: 'Total content'  },
          { value: '100%',                 label: 'Free forever'   },
        ].map(s => (
          <div key={s.label}>
            <div style={{
              fontSize: 24, fontWeight: 900,
              color: '#06b6d4', fontFamily: 'var(--font-display)',
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── 4 Special Features ──────────────────────────────────────────── */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 16 }}>
          What makes this different
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {[
            { icon: '▶', title: 'Live SQL Playground',   desc: 'Run real queries in your browser — no install, no account. Uses DuckDB-WASM with the FreshCart database preloaded.',               color: '#06b6d4', href: '/learn/sql/playground' },
            { icon: '◎', title: 'Try It Challenges',     desc: "Every module ends with a practice question. Reveal the answer and explanation when you're ready.",                                  color: '#10b981', href: '/learn/sql/what-is-a-database' },
            { icon: '⊞', title: 'Visual JOIN Diagrams',  desc: "Row-matching visualizations that make joins click — switch between INNER, LEFT, RIGHT, and FULL OUTER live.",                      color: '#8b5cf6', href: '/learn/sql/joins' },
            { icon: '≡', title: 'SQL Cheat Sheet',       desc: "All 62 modules' syntax on one printable page. Bookmark it for interviews.",                                                        color: '#f97316', href: '/learn/sql/cheatsheet' },
          ].map(f => (
            <div key={f.title} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '20px',
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

      {/* ── FreshCart Database ──────────────────────────────────────────── */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 8 }}>
          Your learning dataset
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2.5vw,24px)', fontWeight: 900, letterSpacing: '-1px', margin: '0 0 8px' }}>
          The FreshCart Database
        </h2>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 580, marginBottom: 20 }}>
          Every module, every query, every example uses FreshCart — a fictional Indian grocery chain with 10 stores across Seattle, Austin, New York, Delhi, Chicago, and Ahmedabad.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {SQL_TABLES.map(table => (
            <div key={table.name} style={{
              background: 'var(--surface)',
              border: `1px solid ${table.color}30`,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
              <div style={{
                padding: '10px 14px',
                borderBottom: `1px solid ${table.color}20`,
                display: 'flex', alignItems: 'center', gap: 8,
                background: `${table.color}10`,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: table.color, display: 'inline-block' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{table.name}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 'auto' }}>{table.rowCount} rows</span>
              </div>
              <div style={{ padding: '8px 0' }}>
                {table.columns.slice(0, 5).map(col => (
                  <div key={col.name} style={{ padding: '4px 14px', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text)' }}>{col.name}</span>
                    <span style={{ fontSize: 10, color: table.color, marginLeft: 'auto' }}>{col.type}</span>
                  </div>
                ))}
                {table.columns.length > 5 && (
                  <div style={{ padding: '4px 14px', fontSize: 11, color: 'var(--muted)' }}>
                    +{table.columns.length - 5} more columns
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Curriculum heading + section filter ─────────────────────────── */}
      <div style={{ marginTop: 48, marginBottom: 8 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', marginBottom: 10,
        }}>
          // Curriculum
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
              62 Modules. Zero to Advanced.
            </h2>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 520, margin: 0 }}>
              Follow in order. Each module builds on the last. Module 01 assumes you know nothing —
              Module 62 ends with real projects and 50 interview questions.
            </p>
          </div>

          {/* Section filter tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {(['all', ...SQL_CURRICULUM.map(s => String(s.id))] as SectionFilter[]).map(f => {
              const section = SQL_CURRICULUM.find(s => String(s.id) === f)
              const col = f === 'all' ? '#06b6d4' : (section?.color ?? '#06b6d4')
              const isActive = activeSection === f
              return (
                <button
                  key={f}
                  onClick={() => setActiveSection(f)}
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
                  {f === 'all' ? 'All' : `S${f}`}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Module Cards ────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
        {filtered.map((mod, idx) => {
          const isLive = mod.status === 'live'
          const href   = isLive ? `/learn/sql/${mod.slug}` : '#'

          return (
            <div key={mod.id}>

              {/* Section header — 'all' view only */}
              {activeSection === 'all' && (idx === 0 || filtered[idx - 1].sectionId !== mod.sectionId) && (
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
                    {mod.sectionId}
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: mod.color,
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase',
                  }}>
                    Section {mod.sectionId} — {mod.sectionTitle}
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
                          MODULE {String(mod.id).padStart(2, '0')}
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
                        {mod.description}
                      </p>

                      {/* Topic pills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {mod.tags.map(tag => (
                          <span key={tag} style={{
                            fontSize: 11, color: 'var(--muted)',
                            background: 'var(--bg2)', border: '1px solid var(--border)',
                            borderRadius: 20, padding: '3px 10px',
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {tag}
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

      {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
      <div style={{
        marginTop: 56,
        background: 'linear-gradient(135deg, rgba(6,182,212,0.06) 0%, rgba(139,92,246,0.06) 100%)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '36px 32px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: '#06b6d4',
          fontFamily: 'var(--font-mono)', marginBottom: 14,
        }}>
          // Ready to start?
        </div>
        <h3 style={{
          fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 900,
          color: 'var(--text)', fontFamily: 'var(--font-display)',
          letterSpacing: '-1px', marginBottom: 12,
        }}>
          Start with Module 01. No setup required.
        </h3>
        <p style={{
          fontSize: 14, color: 'var(--muted)', lineHeight: 1.7,
          maxWidth: 480, margin: '0 auto 24px',
        }}>
          Every module runs entirely in your browser. Write real SQL against the FreshCart database
          from your very first lesson.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/learn/sql/what-is-a-database" style={{
            display: 'inline-block', background: '#06b6d4',
            color: '#000', fontWeight: 700, fontSize: 13,
            borderRadius: 8, padding: '10px 24px', textDecoration: 'none',
          }}>
            Start Module 01 →
          </Link>
          <Link href="/learn/sql/cheatsheet" style={{
            display: 'inline-block', background: 'var(--surface)',
            color: 'var(--text)', fontWeight: 600, fontSize: 13,
            borderRadius: 8, padding: '10px 24px', textDecoration: 'none',
            border: '1px solid var(--border)',
          }}>
            SQL Cheat Sheet
          </Link>
        </div>
      </div>

    </LearnLayout>
  )
}
