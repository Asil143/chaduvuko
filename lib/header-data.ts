import { getCatalogStats, getTrackSummaries } from '@/lib/catalog'
import { ROLE_ROADMAPS } from '@/data/roadmaps/role-registry'
import type { HeaderData } from '@/lib/lesson-nav'

// Roadmaps featured in the Tracks panel; titles come from the registry.
const FEATURED: [slug: string, blurb: string][] = [
  ['data-engineer', 'Pipelines, SQL, cloud, Kafka'],
  ['ml-engineer', 'Python, models, deployment'],
  ['ai-engineer', 'LLM apps on top of ML'],
  ['cybersecurity-analyst', 'Networks, Linux, threat defense'],
]

export function getHeaderData(): HeaderData {
  const stats = getCatalogStats()
  return {
    tracks: getTrackSummaries(),
    lessonCount: stats.lessons - stats.projects,
    trackCount: stats.liveTracks,
    roadmapCount: Object.keys(ROLE_ROADMAPS).length,
    featuredRoadmaps: FEATURED.map(([slug, blurb]) => {
      const roadmap = ROLE_ROADMAPS[slug]
      if (!roadmap) throw new Error(`Featured roadmap "${slug}" is not in ROLE_ROADMAPS`)
      return { href: `/learn/roadmap/${slug}`, title: roadmap.title, blurb }
    }),
  }
}
