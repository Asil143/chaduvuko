import type { Track } from './types'
import { PLANNED_TRACKS } from '@/data/planned-tracks'
import { REGISTRY_TRACKS } from '@/data/tracks/registry'

const LIVE_TRACKS: Track[] = [
  { slug: 'data-engineering', title: 'Data Engineering',             area: 'data',        indexHref: '/learn/data-engineering', urlPrefixes: ['/learn/what-is-data-engineering', '/learn/foundations'] },
  { slug: 'sql',              title: 'SQL',                          area: 'data',        indexHref: '/learn/sql' },
  { slug: 'apache-kafka',     title: 'Apache Kafka',                 area: 'data',        indexHref: '/learn/apache-kafka' },
  { slug: 'dbt',              title: 'dbt',                          area: 'data',        indexHref: '/learn/dbt' },
  { slug: 'snowflake',        title: 'Snowflake',                    area: 'data',        indexHref: '/learn/snowflake' },
  { slug: 'cloud-data',       title: 'Cloud Data Platforms',         area: 'cloud',       indexHref: '/learn/cloud-data', urlPrefixes: ['/learn/aws', '/learn/azure', '/learn/gcp'] },
  { slug: 'python',           title: 'Python',                       area: 'programming', indexHref: '/learn/python' },
  { slug: 'html-css',         title: 'HTML & CSS',                   area: 'programming', indexHref: '/learn/html-css' },
  { slug: 'dsa',              title: 'Data Structures & Algorithms', area: 'cs',          indexHref: '/learn/dsa' },
  { slug: 'dbms',             title: 'DBMS',                         area: 'cs',          indexHref: '/learn/dbms' },
  { slug: 'networking',       title: 'Networking',                   area: 'cs',          indexHref: '/learn/networking' },
  { slug: 'cybersecurity',    title: 'Cybersecurity',                area: 'security',    indexHref: '/learn/cybersecurity' },
  { slug: 'ai-ml',            title: 'AI & Machine Learning',        area: 'ai',          indexHref: '/learn/ai-ml' },
  {
    slug: 'data-science', title: 'Data Science', area: 'ai', indexHref: '/learn/data-science',
    hidden: { reason: 'Only 3 of 53 planned lessons are published; AI & Machine Learning covers the same ground until the track is complete.', since: '2026-11-09' },
  },
  ...REGISTRY_TRACKS.map((track): Track => ({ slug: track.slug, title: track.title, area: track.area, indexHref: `/learn/${track.slug}` })),
  { slug: 'projects',         title: 'Projects',                     area: 'practice',    indexHref: '/learn/projects' },
]

export const HIDDEN_TRACK_SLUGS: ReadonlySet<string> = new Set(
  LIVE_TRACKS.filter(track => track.hidden).map(track => track.slug),
)

export const TRACKS: Track[] = [
  ...LIVE_TRACKS,
  ...PLANNED_TRACKS.map((track): Track => ({
    slug: track.slug,
    title: track.title,
    area: track.area,
    indexHref: track.href,
    status: 'coming-soon',
  })),
]
