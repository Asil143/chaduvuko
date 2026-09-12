'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { DBT_CURRICULUM } from '@/data/dbt-curriculum'

type SectionFilter = 'all' | string

export default function DbtTrackPage() {
  const [activeSection, setActiveSection] = useState<SectionFilter>('all')

  const allModules = DBT_CURRICULUM.flatMap(section =>
    section.modules.map(module => ({
      ...module,
      sectionId: section.id,
      sectionTitle: section.title,
      color: section.color,
    }))
  )
  const liveModules = allModules.filter(module => module.status === 'live')
  const queuedModules = allModules.length - liveModules.length

  const filtered =
    activeSection === 'all'
      ? allModules
      : allModules.filter(module => module.sectionId === parseInt(activeSection))

  const totalMinutes = allModules.reduce((sum, module) => {
    const parts = module.readTime.match(/\d+/g) ?? ['0']
    const avg = parts.length > 1 ? (parseInt(parts[0]) + parseInt(parts[1])) / 2 : parseInt(parts[0])
    return sum + avg
  }, 0)
  const totalHours = Math.round(totalMinutes / 60)
  const totalTopics = allModules.reduce((sum, module) => sum + module.tags.length, 0)
  const K = '#ff6b4a'

  return (
    <LearnLayout
      title="dbt — Zero to Advanced"
      description="A complete dbt track for beginners, analytics engineers, and data teams: models, sources, testing, documentation, Jinja, incremental models, snapshots, CI/CD, and production project structure."
      section="dbt"
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
          { icon: '◎', label: 'Absolute beginners who need dbt explained without jargon' },
          { icon: '↗', label: 'Analytics engineers building transformation pipelines' },
          { icon: '⚙', label: 'Data engineers standardizing SQL across a team' },
          { icon: '◈', label: 'Anyone prepping for an analytics engineering interview' },
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
            <span style={{ fontSize: 20, color: K }}>{item.icon}</span>
            <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{item.label}</span>
          </div>
        ))}
      </div>

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
          { value: `${liveModules.length}`, label: 'Live modules' },
          { value: `${queuedModules}`, label: 'Queued modules' },
          { value: `${DBT_CURRICULUM.length}`, label: 'Sections' },
          { value: `${totalTopics}+`, label: 'Concepts covered' },
          { value: `${totalHours}h`, label: 'Total reading' },
          { value: '0', label: 'Prerequisites' },
        ].map(stat => (
          <div key={stat.label}>
            <div style={{ fontSize: 24, fontWeight: 900, color: K, fontFamily: 'var(--font-display)' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{
        background: 'rgba(255,107,74,0.07)',
        border: '1px solid rgba(255,107,74,0.24)',
        borderRadius: 10,
        padding: '16px 20px',
        marginBottom: 40,
        fontSize: 14,
        color: 'var(--text)',
        lineHeight: 1.75,
      }}>
        <strong style={{ color: K }}>This track starts with what dbt actually does, then builds toward production analytics engineering.</strong>{' '}
        You will learn what a transformation layer is, how models and the DAG work, how to test and document data,
        how to write reusable Jinja, and how real teams structure, test, and ship dbt projects in CI/CD.
      </div>

      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 800, marginBottom: 16 }}>
          Learning path
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16 }}>
          {[
            { title: 'dbt Foundations', desc: 'What dbt is, how it compiles and runs, project setup, models, sources, and ref().', color: K },
            { title: 'Core Development', desc: 'Materializations, incremental models, testing, documentation, and Jinja/macros.', color: '#f97316' },
            { title: 'Intermediate dbt', desc: 'Packages, seeds, snapshots, environments, and hooks/operations.', color: '#eab308' },
            { title: 'Production and Advanced', desc: 'Project structure, performance, CI/CD, testing strategy, and system design.', color: '#ef4444' },
          ].map(item => (
            <div key={item.title} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: 20,
            }}>
              <div style={{ width: 28, height: 3, background: item.color, borderRadius: 999, marginBottom: 14 }} />
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 48, marginBottom: 8 }}>
        <div style={{
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          fontFamily: 'var(--font-mono)',
          marginBottom: 10,
        }}>
          // Curriculum
        </div>

        <div style={{ marginBottom: 14 }}>
          <h2 style={{
            fontSize: 'clamp(20px, 2.5vw, 28px)',
            fontWeight: 900,
            letterSpacing: '-1px',
            color: 'var(--text)',
            fontFamily: 'var(--font-display)',
            marginBottom: 6,
          }}>
            {liveModules.length} Live Modules. {queuedModules} Modules Queued.
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 620, margin: 0 }}>
            Follow in order. Each module begins with a simple explanation, then adds the production detail analytics engineers need.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'flex-end' }}>
          {(['all', ...DBT_CURRICULUM.map(section => String(section.id))] as SectionFilter[]).map(filter => {
            const section = DBT_CURRICULUM.find(s => String(s.id) === filter)
            const color = filter === 'all' ? K : (section?.color ?? K)
            const isActive = activeSection === filter
            return (
              <button
                key={filter}
                onClick={() => setActiveSection(filter)}
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  padding: '6px 12px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  border: isActive ? `1px solid ${color}` : '1px solid var(--border)',
                  background: isActive ? `${color}18` : 'var(--surface)',
                  color: isActive ? color : 'var(--muted)',
                }}
              >
                {filter === 'all' ? 'All' : `S${filter}`}
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
        {filtered.map((module, index) => (
          <div key={module.id}>
            {activeSection === 'all' && (index === 0 || filtered[index - 1].sectionId !== module.sectionId) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: index === 0 ? '16px 0 10px' : '28px 0 10px' }}>
                <div style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: `${module.color}18`,
                  border: `1px solid ${module.color}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 900,
                  color: module.color,
                  fontFamily: 'var(--font-mono)',
                }}>
                  {module.sectionId}
                </div>
                <span style={{ fontSize: 11, fontWeight: 800, color: module.color, fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                  Section {module.sectionId} — {module.sectionTitle}
                </span>
              </div>
            )}

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ height: 3, background: module.color, opacity: 0.8 }} />
              <div style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 800, color: module.color, background: `${module.color}18`, border: `1px solid ${module.color}33`, borderRadius: 6, padding: '3px 8px' }}>
                        MODULE {String(module.id).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 800, color: module.status === 'live' ? 'var(--green)' : 'var(--muted)', background: module.status === 'live' ? 'rgba(0,230,118,0.12)' : 'var(--bg2)', border: module.status === 'live' ? '1px solid rgba(0,230,118,0.3)' : '1px solid var(--border)', borderRadius: 20, padding: '2px 10px', letterSpacing: '.08em' }}>
                        {module.status === 'live' ? 'LIVE' : 'QUEUED'}
                      </span>
                    </div>

                    <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 6, letterSpacing: '-0.4px', lineHeight: 1.3 }}>
                      {module.title}
                    </h3>

                    <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 14, maxWidth: 620 }}>
                      {module.description}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {module.tags.map(tag => (
                        <span key={tag} style={{ fontSize: 11, color: 'var(--muted)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 20, padding: '3px 10px', fontFamily: 'var(--font-mono)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, paddingTop: 4 }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                        {module.readTime}
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: module.color, background: `${module.color}12`, border: `1px solid ${module.color}30`, borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', display: 'inline-block' }}>
                        {module.difficulty}
                      </div>
                    </div>

                    {module.status === 'live' ? (
                      <Link href={`/learn/dbt/${module.slug}`} style={{ display: 'inline-block', background: module.color, color: '#000', fontSize: 12, fontWeight: 800, borderRadius: 8, padding: '8px 18px', textDecoration: 'none', letterSpacing: '.04em', whiteSpace: 'nowrap' }}>
                        Start →
                      </Link>
                    ) : (
                      <span style={{ display: 'inline-block', background: 'var(--bg2)', color: 'var(--muted)', border: '1px solid var(--border)', fontSize: 12, fontWeight: 800, borderRadius: 8, padding: '8px 18px', letterSpacing: '.04em', whiteSpace: 'nowrap' }}>
                        Coming soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 60,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '32px 28px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', fontFamily: 'var(--font-display)', letterSpacing: '-1px', marginBottom: 10 }}>
          Recommended foundation before advanced dbt projects
        </div>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 20px' }}>
          dbt becomes much easier when you also understand SQL, data warehouses, and pipeline design. This track teaches dbt directly, then points naturally into the Snowflake and Data Engineering paths.
        </p>
        <Link href="/learn/snowflake" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 14,
          fontWeight: 800,
          color: '#000',
          background: K,
          borderRadius: 10,
          padding: '10px 22px',
          textDecoration: 'none',
        }}>
          Explore Snowflake →
        </Link>
      </div>
    </LearnLayout>
  )
}
