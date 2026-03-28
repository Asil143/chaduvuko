import { notFound } from 'next/navigation'
import { LearnLayout } from '@/components/content/LearnLayout'
import { RoadmapCanvas } from '@/components/roadmap/RoadmapCanvas'
import { RoadmapProgress } from '@/components/roadmap/RoadmapProgress'
import { getRoadmapMeta } from '@/data/roadmaps/index'
import { dataEngineerRoadmap } from '@/data/roadmaps/role/data-engineer'
import { azureRoadmap } from '@/data/roadmaps/skill/azure'
import { azureDataPipelineRoadmap } from '@/data/roadmaps/project/azure-data-pipeline'
import type { Roadmap } from '@/data/roadmaps/types'

// Registry of built roadmaps. Add new entries here as new data files are created.
const BUILT_ROADMAPS: Record<string, Roadmap> = {
  'data-engineer': dataEngineerRoadmap,
  'azure': azureRoadmap,
  'azure-data-pipeline': azureDataPipelineRoadmap,
}

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
  const meta = getRoadmapMeta(params.slug)
  if (!meta) return { title: 'Roadmap — Chaduvuko' }
  return {
    title: `${meta.title} Roadmap 2026 — Chaduvuko`,
    description: meta.description,
  }
}

export default function RoadmapSlugPage({ params }: Props) {
  const meta = getRoadmapMeta(params.slug)
  if (!meta) notFound()

  const roadmap = BUILT_ROADMAPS[params.slug]

  // Coming soon page for unbuilt roadmaps
  if (!roadmap) {
    return (
      <LearnLayout
        title={`${meta.title} Roadmap`}
        description={meta.description}
        section="Roadmap"
        readTime="—"
        updatedAt="Coming soon"
      >
        <div style={{
          textAlign: 'center', padding: '48px 24px',
          background: 'var(--surface)', borderRadius: 16,
          border: '1px solid var(--border)',
        }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🗺️</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
            This roadmap is being built
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', maxWidth: 400, margin: '0 auto 24px', lineHeight: 1.7 }}>
            The {meta.title} roadmap ({meta.nodeCount} nodes, {meta.totalTime}) is planned and will go live soon.
            Start with the <a href="/learn/roadmap/data-engineer" style={{ color: 'var(--green)' }}>Data Engineer roadmap</a> while you wait.
          </p>
          <a href="/learn/roadmap" style={{
            display: 'inline-block', padding: '10px 20px', borderRadius: 8,
            background: 'var(--surface)', border: '1px solid var(--border)',
            color: 'var(--text)', fontSize: 13, fontWeight: 600, textDecoration: 'none',
          }}>
            ← Back to all roadmaps
          </a>
        </div>
      </LearnLayout>
    )
  }

  return (
    <LearnLayout
      title={`${roadmap.title} Roadmap 2026`}
      description={roadmap.description}
      section={`${
        roadmap.category === 'role' ? 'Role-based Roadmap' :
        roadmap.category === 'skill' ? 'Skill Roadmap' :
        roadmap.category === 'project' ? 'Project Roadmap' :
        'Best Practices'
      }`}
      readTime={`${roadmap.nodes.length} nodes`}
      updatedAt="March 2026"
    >
      {/* Progress tracker — client component reading localStorage */}
      <RoadmapProgress roadmapId={roadmap.id} nodes={roadmap.nodes} />

      {/* Total time */}
      <div style={{
        display: 'flex', gap: 20, marginBottom: 28, flexWrap: 'wrap',
      }}>
        <div>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 2 }}>Total time</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{roadmap.totalTime}</span>
        </div>
        <div>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 2 }}>Nodes</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{roadmap.nodes.length}</span>
        </div>
        <div>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 2 }}>Category</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', textTransform: 'capitalize' }}>
            {roadmap.category.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Interactive roadmap canvas */}
      <RoadmapCanvas roadmap={roadmap} />

      {/* Guide content — migrated from the original roadmap page */}
      {roadmap.guide?.howToUse && (
        <>
          <h2 style={{ marginTop: 48 }}>How to use this roadmap</h2>
          <p>{roadmap.guide.howToUse}</p>
        </>
      )}

      {roadmap.guide?.commonMistakes && roadmap.guide.commonMistakes.length > 0 && (
        <>
          <h2>Common mistakes to avoid</h2>
          <ul>
            {roadmap.guide.commonMistakes.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </>
      )}
    </LearnLayout>
  )
}