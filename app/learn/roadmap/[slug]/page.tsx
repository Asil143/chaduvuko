
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SkillTree from '@/components/roadmap/SkillTree'
import { dataEngineerRoadmap } from '@/data/roadmaps/role/data-engineer'
import type { Roadmap } from '@/data/roadmaps/types'

const ROADMAPS: Record<string, Roadmap> = {
  'data-engineer': dataEngineerRoadmap,
}

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const roadmap = ROADMAPS[params.slug]
  if (!roadmap) return {}
  return {
    title: `${roadmap.title} Roadmap — Chaduvuko`,
    description: roadmap.description,
  }
}

export function generateStaticParams() {
  return Object.keys(ROADMAPS).map(slug => ({ slug }))
}

export default function RoadmapPage({ params }: Props) {
  const roadmap = ROADMAPS[params.slug]
  if (!roadmap) notFound()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '48px 20px 80px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 24 }}>
          <a href="/learn/roadmap" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Roadmaps</a>
          <span style={{ margin: '0 8px' }}>›</span>
          <span style={{ color: 'var(--text)' }}>{roadmap.title}</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>
            {roadmap.category === 'role' ? 'Role Roadmap' : 'Skill Roadmap'}
          </div>
          <h1 style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', marginBottom: 10 }}>
            {roadmap.title}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 16, maxWidth: 560 }}>
            {roadmap.description}
          </p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>
              <b style={{ color: 'var(--text)', fontWeight: 700, marginRight: 6 }}>Level</b>
              {roadmap.level}
            </span>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>
              <b style={{ color: 'var(--text)', fontWeight: 700, marginRight: 6 }}>Time</b>
              {roadmap.estimatedTime}
            </span>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>
              <b style={{ color: 'var(--text)', fontWeight: 700, marginRight: 6 }}>Nodes</b>
              {roadmap.nodes.length}
            </span>
          </div>
        </div>

        {/* Skill tree */}
        <SkillTree roadmap={roadmap} />

        {/* Footer note */}
        <div style={{ marginTop: 28, fontSize: 12, color: 'rgba(255,255,255,.15)', textAlign: 'center', lineHeight: 1.7 }}>
          Progress saves automatically in your browser. No account needed.
        </div>

      </div>
    </div>
  )
}