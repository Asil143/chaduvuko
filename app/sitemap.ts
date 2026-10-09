import type { MetadataRoute } from 'next'
import { LIVE_LESSONS, NON_LESSON_ROUTES } from '@/lib/catalog'
import { BLOG_ARTICLES } from '@/data/blog-articles'
import { ROLE_ROADMAPS } from '@/data/roadmaps/role-registry'

const BASE_URL = 'https://chaduvuko.com'

const SITE_PAGES = ['/', '/blog', '/about', '/careers', '/privacy', '/terms', '/newsletter', '/playground']

export default function sitemap(): MetadataRoute.Sitemap {
  const nonLessonPages = Object.entries(NON_LESSON_ROUTES)
    .filter(([, kind]) => kind !== 'preview')
    .map(([href]) => href)

  const lessonEntries = LIVE_LESSONS.map(lesson => ({
    url: `${BASE_URL}${lesson.href}`,
    ...(lesson.updatedAt ? { lastModified: new Date(lesson.updatedAt) } : {}),
  }))

  return [
    ...SITE_PAGES.map(href => ({ url: href === '/' ? BASE_URL : `${BASE_URL}${href}` })),
    ...nonLessonPages.map(href => ({ url: `${BASE_URL}${href}` })),
    ...lessonEntries,
    ...Object.keys(ROLE_ROADMAPS).map(slug => ({ url: `${BASE_URL}/learn/roadmap/${slug}` })),
    ...Object.keys(BLOG_ARTICLES).map(slug => ({ url: `${BASE_URL}/blog/${slug}` })),
  ]
}
