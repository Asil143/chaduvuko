import HomePage from '@/components/home/HomePage'
import { getCatalogStats, getTrackSummaries } from '@/lib/catalog'
import { BLOG_ARTICLES } from '@/data/blog-articles'
import { ROLE_ROADMAPS } from '@/data/roadmaps/role-registry'
import type { SiteStats } from '@/lib/lesson-nav'

export default function Page() {
  const stats: SiteStats = {
    ...getCatalogStats(),
    roadmaps: Object.keys(ROLE_ROADMAPS).length,
    articles: Object.keys(BLOG_ARTICLES).length,
  }
  return <HomePage tracks={getTrackSummaries()} stats={stats} />
}
