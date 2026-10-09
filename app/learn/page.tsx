import LearnIndex from '@/components/learn/LearnIndex'
import { getCatalogStats, getTrackSummaries } from '@/lib/catalog'
import { BLOG_ARTICLES } from '@/data/blog-articles'
import { ROLE_ROADMAPS } from '@/data/roadmaps/role-registry'
import type { SiteStats } from '@/lib/lesson-nav'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'All Learning Tracks' }

export default function Page() {
  const stats: SiteStats = {
    ...getCatalogStats(),
    roadmaps: Object.keys(ROLE_ROADMAPS).length,
    articles: Object.keys(BLOG_ARTICLES).length,
  }
  return <LearnIndex tracks={getTrackSummaries()} stats={stats} />
}
