'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { SNOWFLAKE_CURRICULUM } from '@/data/snowflake-curriculum'

type SectionFilter = 'all' | string

export default function SnowflakeTrackPage() {
  const [activeSection, setActiveSection] = useState<SectionFilter>('all')
  const allModules = SNOWFLAKE_CURRICULUM.flatMap(section =>
    section.modules.map(module => ({ ...module, sectionId: section.id, sectionTitle: section.title, color: section.color }))
  )
  const filtered = activeSection === 'all' ? allModules : allModules.filter(module => module.sectionId === parseInt(activeSection))
  const liveCount = allModules.filter(module => module.status === 'live').length
  const totalTopics = allModules.reduce((sum, module) => sum + module.tags.length, 0)
  const S = '#29b5e8'

  return (
    <LearnLayout
      title="Snowflake — Zero to Advanced"
      description="A real Snowflake track: warehouse fundamentals, architecture, SQL, loading, ELT, governance, performance, cost, dbt, operations, and system design."
      section="Snowflake"
      readTime="Self-paced"
      updatedAt="September 2026"
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: 12,
        marginBottom: 40,
      }}>
        {[
          ['Beginners', 'Starts from what a warehouse is and why Snowflake exists.'],
          ['Data engineers', 'Covers loading, MERGE, ELT, tasks, monitoring, and operations.'],
          ['Analytics engineers', 'Covers marts, dbt, testing, governance, and cost.'],
          ['Interview prep', 'Builds senior-level Snowflake explanation and design language.'],
        ].map(([title, text]) => (
          <div key={title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: 14, fontWeight: 900, color: S, marginBottom: 7 }}>{title}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{text}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 28px', marginBottom: 36 }}>
        {[
          [`${allModules.length}`, 'Planned modules'],
          [`${liveCount}`, 'Deep modules live now'],
          [`${SNOWFLAKE_CURRICULUM.length}`, 'Sections'],
          [`${totalTopics}+`, 'Concepts covered'],
          ['0', 'Prerequisites'],
        ].map(([value, label]) => (
          <div key={label}>
            <div style={{ fontSize: 24, fontWeight: 900, color: S, fontFamily: 'var(--font-display)' }}>{value}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'rgba(41,181,232,0.07)', border: '1px solid rgba(41,181,232,0.24)', borderRadius: 10, padding: '16px 20px', marginBottom: 40, fontSize: 14, color: 'var(--text)', lineHeight: 1.75 }}>
        <strong style={{ color: S }}>This is a full Snowflake track, not a single article.</strong>{' '}
        Every module has a live lesson: plain-English explanation, SQL examples, production mistakes, cost and security notes, and interview framing.
      </div>

      <div style={{ marginTop: 48, marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>
          // Curriculum
        </div>
        <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 6 }}>
          20 Modules. Snowflake from First Query to Production Platform.
        </h2>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 660, margin: 0 }}>
          Follow in order. Each module starts from the beginner mental model and ends with production and interview readiness.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'flex-end', marginBottom: 28 }}>
        {(['all', ...SNOWFLAKE_CURRICULUM.map(section => String(section.id))] as SectionFilter[]).map(filter => {
          const section = SNOWFLAKE_CURRICULUM.find(s => String(s.id) === filter)
          const color = filter === 'all' ? S : (section?.color ?? S)
          const isActive = activeSection === filter
          return (
            <button key={filter} onClick={() => setActiveSection(filter)} style={{ fontSize: 11, fontWeight: 800, fontFamily: 'var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: 8, cursor: 'pointer', border: isActive ? `1px solid ${color}` : '1px solid var(--border)', background: isActive ? `${color}18` : 'var(--surface)', color: isActive ? color : 'var(--muted)' }}>
              {filter === 'all' ? 'All' : `S${filter}`}
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map((module, index) => {
          const isLive = module.status === 'live'
          return (
            <div key={module.id}>
              {activeSection === 'all' && (index === 0 || filtered[index - 1].sectionId !== module.sectionId) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: index === 0 ? '16px 0 10px' : '28px 0 10px' }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0, background: `${module.color}18`, border: `1px solid ${module.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: module.color, fontFamily: 'var(--font-mono)' }}>
                    {module.sectionId}
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: module.color, fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                    Section {module.sectionId} — {module.sectionTitle}
                  </span>
                </div>
              )}

              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', opacity: isLive ? 1 : 0.78 }}>
                <div style={{ height: 3, background: module.color, opacity: 0.8 }} />
                <div style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 240 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 800, color: module.color, background: `${module.color}18`, border: `1px solid ${module.color}33`, borderRadius: 6, padding: '3px 8px' }}>
                          MODULE {String(module.id).padStart(2, '0')}
                        </span>
                        <span style={{ fontSize: 10, fontWeight: 800, color: isLive ? 'var(--green)' : 'var(--muted)', background: isLive ? 'rgba(0,230,118,0.12)' : 'var(--bg2)', border: isLive ? '1px solid rgba(0,230,118,0.3)' : '1px solid var(--border)', borderRadius: 20, padding: '2px 10px', letterSpacing: '.08em' }}>
                          {isLive ? 'LIVE' : 'EXPANSION QUEUED'}
                        </span>
                      </div>
                      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 6, letterSpacing: '-0.4px', lineHeight: 1.3 }}>{module.title}</h3>
                      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 14, maxWidth: 650 }}>{module.description}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {module.tags.map(tag => (
                          <span key={tag} style={{ fontSize: 11, color: 'var(--muted)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 20, padding: '3px 10px', fontFamily: 'var(--font-mono)' }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, paddingTop: 4 }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>{module.readTime}</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: module.color, background: `${module.color}12`, border: `1px solid ${module.color}30`, borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', display: 'inline-block' }}>{module.difficulty}</div>
                      </div>
                      {isLive ? (
                        <Link href={`/learn/snowflake/${module.slug}`} style={{ display: 'inline-block', background: module.color, color: '#000', fontSize: 12, fontWeight: 800, borderRadius: 8, padding: '8px 18px', textDecoration: 'none', letterSpacing: '.04em', whiteSpace: 'nowrap' }}>Start →</Link>
                      ) : (
                        <span style={{ display: 'inline-block', background: 'var(--bg2)', color: 'var(--muted)', fontSize: 12, fontWeight: 700, borderRadius: 8, padding: '8px 18px', border: '1px solid var(--border)' }}>Queued</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </LearnLayout>
  )
}
