import { getCatalogStats, getTrackSummaries } from '@/lib/catalog'
import { ROLE_ROADMAPS } from '@/data/roadmaps/role-registry'
import { getResolvedPaths } from '@/lib/catalog/paths'
import { areaLabel } from '@/lib/catalog/schools'
import type { HeaderData, TrackSummaries } from '@/lib/lesson-nav'

// One line under each track name in the header. Counts stay separate, so these do not repeat them.
const TRACK_BLURBS: Record<string, string> = {
  'data-engineering': 'From what a pipeline is to production patterns',
  sql: 'Queries on a real database, from SELECT to window functions',
  'apache-kafka': 'Topics, partitions, consumers, and stream processing',
  dbt: 'Models, tests, and the analytics transformation layer',
  snowflake: 'Warehouses, loading, Time Travel, and cost',
  'cloud-data': 'AWS, Azure, and Google Cloud data services',
  python: 'From a first script to production Python',
  'html-css': 'Semantic HTML, Flexbox, Grid, and responsive pages',
  dsa: 'Arrays through dynamic programming for interviews',
  dbms: 'ER models, normalization, transactions, and indexes',
  networking: 'OSI, TCP/IP, DNS, and how traffic moves',
  cybersecurity: 'OWASP, detection, and how attacks work',
  'ai-ml': 'Classical ML, deep learning, and GenAI',
  'generative-ai': 'LLM applications, RAG, evaluation, and agents',
  'data-science': 'pandas, statistics, and modeling',
}

function withBlurbs(tracks: TrackSummaries): TrackSummaries {
  return Object.fromEntries(
    Object.entries(tracks).map(([slug, track]) => [slug, { ...track, blurb: TRACK_BLURBS[slug] }]),
  )
}

export function getHeaderData(): HeaderData {
  const stats = getCatalogStats()
  return {
    tracks: withBlurbs(getTrackSummaries()),
    lessonCount: stats.lessons - stats.projects,
    trackCount: stats.liveTracks,
    roadmapCount: Object.keys(ROLE_ROADMAPS).length,
    careerPaths: getResolvedPaths().map(path => ({
      href: `/learn/paths/${path.slug}`,
      title: path.title,
      school: areaLabel(path.school),
      lessons: path.liveLessons,
      icon: path.icon,
      trending: Boolean(path.trending),
    })),
  }
}
