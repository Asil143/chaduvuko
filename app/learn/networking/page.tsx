'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { NETWORKING_CURRICULUM } from '@/data/networking-curriculum'

type SectionFilter = 'all' | string

export default function NetworkingTrackPage() {
  const [activeSection, setActiveSection] = useState<SectionFilter>('all')

  const allModules = NETWORKING_CURRICULUM.flatMap(s =>
    s.modules.map(m => ({ ...m, sectionId: s.id, sectionTitle: s.title, color: s.color, difficulty: s.difficulty }))
  )

  const filtered =
    activeSection === 'all'
      ? allModules
      : allModules.filter(m => m.sectionId === parseInt(activeSection))

  const totalTopics  = allModules.reduce((sum, m) => sum + m.tags.length, 0)
  const totalMinutes = allModules.reduce((sum, m) => {
    const parts = m.readTime.match(/\d+/g) ?? ['0']
    const avg = parts.length > 1 ? (parseInt(parts[0]) + parseInt(parts[1])) / 2 : parseInt(parts[0])
    return sum + avg
  }, 0)
  const totalHours = Math.round(totalMinutes / 60)

  const N = '#10b981'

  return (
    <LearnLayout
      title="Networking Fundamentals — Zero to Advanced"
      description="From what a packet is to subnetting, routing, DNS, TCP, firewalls, and Wireshark — 20 modules, no prerequisites"
      section="Networking"
      readTime="Self-paced"
      updatedAt="May 2026"
    >

      {/* ── Who This Is For ─────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12,
        marginBottom: 40,
      }}>
        {[
          { icon: '🎓', label: 'Complete beginners — no networking knowledge needed' },
          { icon: '🔐', label: 'Security learners who need networking foundations' },
          { icon: '💼', label: 'Anyone preparing for CompTIA Network+ or Security+' },
          { icon: '🖧',  label: 'Developers who want to understand what their code runs on' },
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
          { value: `${allModules.length}`, label: 'Modules'        },
          { value: '5',                    label: 'Sections'        },
          { value: `${totalTopics}+`,      label: 'Topics covered'  },
          { value: `${totalHours}h`,       label: 'Total content'   },
          { value: '100%',                 label: 'Free forever'    },
        ].map(s => (
          <div key={s.label}>
            <div style={{
              fontSize: 24, fontWeight: 900,
              color: N, fontFamily: 'var(--font-display)',
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Notice box ──────────────────────────────────────────────────── */}
      <div style={{
        background: 'rgba(16,185,129,0.06)',
        border: '1px solid rgba(16,185,129,0.2)',
        borderRadius: 10,
        padding: '16px 20px',
        marginBottom: 40,
        fontSize: 14,
        color: 'var(--text)',
        lineHeight: 1.7,
      }}>
        <strong style={{ color: N }}>This course builds the networking foundation every security professional needs.</strong>{' '}
        You will understand how packets move from your keyboard to a server on the other side of the planet —
        every hop, every protocol, every layer. Module 01 assumes zero prior knowledge.
        Module 20 covers tools used by network engineers and penetration testers every day.
      </div>

      {/* ── What Makes This Different ────────────────────────────────────── */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 16 }}>
          What makes this different
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {[
            { icon: '◎', title: 'Built for Security',    desc: 'Every protocol is taught alongside how attackers abuse it — so you understand defence, not just theory.',                  color: '#ef4444' },
            { icon: '▶', title: 'Real Commands',          desc: 'Wireshark captures, tcpdump filters, nmap scans — commands you run on your own machine as you read.',                       color: N        },
            { icon: '⊞', title: 'Packet-Level Diagrams', desc: 'Every major protocol is shown as actual bytes — so the OSI model becomes concrete, not abstract.',                          color: '#3b82f6' },
            { icon: '≡', title: 'No Fluff',              desc: 'No "send us your email for a certificate". Just the concepts, explained clearly, from first principles to advanced.',        color: '#8b5cf6' },
          ].map(f => (
            <div key={f.title} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '20px',
            }}>
              <div style={{ fontSize: 20, color: f.color, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Prerequisite note ───────────────────────────────────────────── */}
      <div style={{
        background: 'rgba(16,185,129,0.04)',
        border: '1px solid rgba(16,185,129,0.15)',
        borderRadius: 10,
        padding: '16px 20px',
        marginBottom: 40,
        display: 'flex',
        gap: 14,
        alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: 22, marginTop: 2 }}>→</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
            Recommended next course after this one
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 10 }}>
            Once you have finished all 20 modules here, you have the networking foundation needed for the Cybersecurity course.
          </div>
          <Link href="/learn/cybersecurity" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 700, color: '#ff4757',
            textDecoration: 'none',
            background: 'rgba(255,71,87,0.08)',
            border: '1px solid rgba(255,71,87,0.2)',
            borderRadius: 8, padding: '6px 14px',
          }}>
            Cybersecurity — Zero to Hired →
          </Link>
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

        <div style={{ marginBottom: 6 }}>
          <div style={{ marginBottom: 14 }}>
            <h2 style={{
              fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
              letterSpacing: '-1px', color: 'var(--text)',
              fontFamily: 'var(--font-display)', marginBottom: 6,
            }}>
              20 Modules. Packets to Penetration Testing.
            </h2>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 520, margin: 0 }}>
              Follow in order. Each module builds on the last. Module 01 assumes you know nothing —
              Module 20 ends with tools used by professional network engineers and security researchers.
            </p>
          </div>

          {/* Section filter tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'flex-end' }}>
            {(['all', ...NETWORKING_CURRICULUM.map(s => String(s.id))] as SectionFilter[]).map(f => {
              const section = NETWORKING_CURRICULUM.find(s => String(s.id) === f)
              const col = f === 'all' ? N : (section?.color ?? N)
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
          const href   = isLive ? `/learn/networking/${mod.slug}` : '#'

          const diffColor: Record<string, string> = {
            Beginner:     '#10b981',
            Intermediate: '#f97316',
            Advanced:     '#ef4444',
          }
          const dc = diffColor[mod.difficulty] ?? '#10b981'

          return (
            <div key={mod.id} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              overflow: 'hidden',
              opacity: isLive ? 1 : 0.55,
            }}>
              <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: 11,
                          color: mod.color, fontWeight: 700,
                        }}>
                          {String(mod.id).padStart(2, '0')}
                        </span>
                        <span style={{
                          fontSize: 10, fontWeight: 700,
                          color: dc,
                          background: `${dc}15`,
                          border: `1px solid ${dc}30`,
                          borderRadius: 4, padding: '2px 7px',
                          letterSpacing: '.06em', textTransform: 'uppercase',
                        }}>
                          {mod.difficulty}
                        </span>
                        <span style={{ fontSize: 11, color: 'var(--muted)' }}>
                          🕐 {mod.readTime}
                        </span>
                        {!isLive && (
                          <span style={{
                            fontSize: 10, color: 'var(--muted)',
                            background: 'var(--border)', borderRadius: 4,
                            padding: '2px 7px', letterSpacing: '.06em', textTransform: 'uppercase',
                          }}>
                            Soon
                          </span>
                        )}
                      </div>
                      <div style={{
                        fontSize: 15, fontWeight: 700,
                        color: 'var(--text)', marginBottom: 4,
                        lineHeight: 1.4,
                      }}>
                        {mod.title}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 10 }}>
                        {mod.description}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {mod.tags.map(tag => (
                          <span key={tag} style={{
                            fontSize: 11, color: 'var(--muted)',
                            background: 'var(--background)',
                            border: '1px solid var(--border)',
                            borderRadius: 4, padding: '2px 8px',
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {isLive && (
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        border: `1px solid ${mod.color}40`,
                        background: `${mod.color}10`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: 14, color: mod.color,
                      }}>
                        →
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>

      {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
      <div style={{
        marginTop: 60,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '32px 28px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', fontFamily: 'var(--font-display)', letterSpacing: '-1px', marginBottom: 10 }}>
          Ready to go deeper?
        </div>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 20px' }}>
          After completing this course, the Cybersecurity track picks up exactly where you leave off —
          using these networking fundamentals to understand attacks, defences, and professional security work.
        </p>
        <Link href="/learn/cybersecurity" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 14, fontWeight: 700, color: '#fff',
          background: '#ff4757',
          borderRadius: 10, padding: '10px 22px',
          textDecoration: 'none',
        }}>
          Start Cybersecurity Course →
        </Link>
      </div>

    </LearnLayout>
  )
}
