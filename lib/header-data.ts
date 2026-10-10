import { getCatalogStats, getTrackSummaries } from '@/lib/catalog'
import { ROLE_ROADMAPS } from '@/data/roadmaps/role-registry'
import type { HeaderData, TrackSummaries } from '@/lib/lesson-nav'

// One line under each track name in the header. Counts stay separate, so these do not repeat them.
const TRACK_BLURBS: Record<string, string> = {
  foundations: 'What a pipeline is, before the full Data Engineering track',
  'data-engineering': 'Pipelines, warehouses, and production patterns',
  sql: 'Queries on a real database, from SELECT to window functions',
  'apache-kafka': 'Topics, partitions, consumers, and stream processing',
  dbt: 'Models, tests, and the analytics transformation layer',
  snowflake: 'Warehouses, loading, Time Travel, and cost',
  aws: 'S3, Glue, Redshift, EMR, and Kinesis',
  azure: 'Data Factory, Databricks, Synapse, and Fabric',
  gcp: 'BigQuery, Dataflow, Pub/Sub, and Composer',
  python: 'From a first script to production Python',
  'html-css': 'Semantic HTML, Flexbox, Grid, and responsive pages',
  dsa: 'Arrays through dynamic programming for interviews',
  dbms: 'ER models, normalization, transactions, and indexes',
  networking: 'OSI, TCP/IP, DNS, and how traffic moves',
  cybersecurity: 'OWASP, detection, and how attacks work',
  'ai-ml': 'Classical ML, deep learning, and GenAI',
  'data-science': 'pandas, statistics, and modeling',
}

// Roadmaps featured in the Roadmaps menu; titles come from the registry.
const FEATURED: [slug: string, blurb: string][] = [
  ['data-engineer', 'Pipelines, SQL, cloud, Kafka'],
  ['ml-engineer', 'Python, models, deployment'],
  ['ai-engineer', 'LLM apps on top of ML'],
  ['cybersecurity-analyst', 'Networks, Linux, threat defense'],
]

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
    featuredRoadmaps: FEATURED.map(([slug, blurb]) => {
      const roadmap = ROLE_ROADMAPS[slug]
      if (!roadmap) throw new Error(`Featured roadmap "${slug}" is not in ROLE_ROADMAPS`)
      return { href: `/learn/roadmap/${slug}`, title: roadmap.title, blurb }
    }),
  }
}
