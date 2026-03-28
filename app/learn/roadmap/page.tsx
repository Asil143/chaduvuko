'use client'
import { useState } from 'react'
import Link from 'next/link'
import { roadmapRegistry, getRoadmapsByCategory } from '@/data/roadmaps/index'
import type { RoadmapMeta, RoadmapCategory } from '@/data/roadmaps/types'

const CATEGORY_LABELS: Record<RoadmapCategory, string> = {
  'role': 'Role-based',
  'skill': 'Skill-based',
  'project': 'Project-based',
  'best-practices': 'Best Practices',
}

const CATEGORY_DESCRIPTIONS: Record<RoadmapCategory, string> = {
  'role': 'What job role do you want? Start here.',
  'skill': 'Master a specific technology or tool.',
  'project': 'Learn by building real end-to-end projects.',
  'best-practices': 'Do it the right way, not just the working way.',
}

const CATEGORY_COLORS: Record<RoadmapCategory, string> = {
  'role': '#7b61ff',
  'skill': '#00e676',
  'project': '#ff9900',
  'best-practices': '#ff4757',
}

const CATEGORIES: RoadmapCategory[] = ['role', 'skill', 'project', 'best-practices']

function RoadmapCard({ rm }: { rm: RoadmapMeta }) {
  const color = CATEGORY_COLORS[rm.category]
  return (
    <Link href={`/learn/roadmap/${rm.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '14px 16px',
        cursor: 'pointer',
        transition: 'all 0.15s',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = color + '50'
          ;(e.currentTarget as HTMLDivElement).style.background = 'var(--bg2)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'
          ;(e.currentTarget as HTMLDivElement).style.background = 'var(--surface)'
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>
          {rm.title}
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.55, flex: 1 }}>
          {rm.description}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4, flexWrap: 'wrap' }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase',
            padding: '2px 7px', borderRadius: 20,
            background: rm.hasLiveContent ? 'rgba(0,230,118,0.1)' : 'rgba(255,255,255,0.05)',
            color: rm.hasLiveContent ? 'var(--green)' : 'var(--muted)',
            border: rm.hasLiveContent ? '1px solid rgba(0,230,118,0.2)' : '1px solid var(--border)',
          }}>
            {rm.hasLiveContent ? 'Content live' : 'Coming soon'}
          </span>
          <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 'auto' }}>
            {rm.nodeCount} nodes · {rm.totalTime}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function RoadmapIndexPage() {
  const [activeFilter, setActiveFilter] = useState<RoadmapCategory | 'all'>('all')

  const liveCount = roadmapRegistry.filter(r => r.hasLiveContent).length
  const totalCount = roadmapRegistry.length

  const displayCategories = activeFilter === 'all'
    ? CATEGORIES
    : [activeFilter]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '0 0 80px' }}>
      {/* Header */}
      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '60px 24px 32px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 12px', borderRadius: 20,
          background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.2)',
          marginBottom: 16,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--green)' }}>
            {liveCount} of {totalCount} roadmaps live
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900,
          letterSpacing: '-2px', color: 'var(--text)',
          fontFamily: 'Syne, var(--font-display), sans-serif',
          marginBottom: 12, lineHeight: 1.1,
        }}>
          Find your learning path
        </h1>
        <p style={{
          fontSize: 16, color: 'var(--muted)', lineHeight: 1.7,
          maxWidth: 520, marginBottom: 28,
        }}>
          Structured roadmaps for every IT role and skill — from beginner to job-ready.
          Every node links to a lesson or real project.
        </p>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['all', ...CATEGORIES] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: '7px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                cursor: 'pointer', border: '1px solid',
                transition: 'all 0.15s',
                background: activeFilter === cat
                  ? (cat === 'all' ? 'rgba(0,230,118,0.12)' : `${CATEGORY_COLORS[cat]}18`)
                  : 'transparent',
                borderColor: activeFilter === cat
                  ? (cat === 'all' ? 'rgba(0,230,118,0.3)' : `${CATEGORY_COLORS[cat]}50`)
                  : 'var(--border)',
                color: activeFilter === cat
                  ? (cat === 'all' ? 'var(--green)' : CATEGORY_COLORS[cat])
                  : 'var(--muted)',
              }}
            >
              {cat === 'all' ? `All (${totalCount})` : CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Roadmap sections */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 0' }}>
        {displayCategories.map(category => {
          const items = getRoadmapsByCategory(category)
          return (
            <div key={category} style={{ marginBottom: 48 }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}>
                  <h2 style={{
                    fontSize: 18, fontWeight: 800, letterSpacing: '-0.5px',
                    color: 'var(--text)',
                    fontFamily: 'Syne, var(--font-display), sans-serif',
                  }}>
                    {CATEGORY_LABELS[category]}
                  </h2>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                    {items.length} roadmaps
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--muted)' }}>
                  {CATEGORY_DESCRIPTIONS[category]}
                </p>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 10,
              }}>
                {items.map(rm => (
                  <RoadmapCard key={rm.slug} rm={rm} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}