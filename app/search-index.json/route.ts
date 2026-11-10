import { NextResponse } from 'next/server'
import { LIVE_LESSONS, TRACKS, getCatalogStats, getLiveLesson, getTrack, isHiddenHref } from '@/lib/catalog'
import { ROLE_ROADMAPS } from '@/data/roadmaps/role-registry'
import { BLOG_ARTICLES } from '@/data/blog-articles'
import type { SearchEntry, SearchIndex } from '@/lib/search'
import { CHEAT_SHEET_FOR_PATH } from '@/lib/cheatsheet-links'
import { CAREER_PATHS } from '@/data/career-paths'
import { SCHOOLS } from '@/lib/catalog/schools'

export const dynamic = 'force-static'

const SITE_PAGES: SearchEntry[] = [
  { href: '/learn',                 title: 'All tracks',          context: 'Browse every learning track', kind: 'page' },
  { href: '/learn/all-courses',     title: 'All courses',         context: 'Site map of every track and lesson', kind: 'page' },
  { href: '/learn/paths',           title: 'Career paths',        context: 'Step-by-step routes to a job', kind: 'page' },
  { href: '/learn/schools',         title: 'Schools',             context: 'Six subject areas',           kind: 'page' },
  { href: '/learn/roadmap',         title: 'Career roadmaps',     context: 'Role-by-role learning paths', kind: 'roadmap' },
  { href: '/learn/interview',       title: 'Interview prep',      context: 'Questions and answers',       kind: 'interview' },
  { href: '/learn/industry',        title: 'Industry guide',      context: 'Companies and roles',         kind: 'page' },
  { href: '/learn/sql/playground',  title: 'SQL playground',      context: 'Practice',                    kind: 'practice' },
  { href: '/learn/sql/joins',       title: 'Visual JOIN diagrams', context: 'Practice',                   kind: 'practice' },
  { href: '/playground',            title: 'Code playground',     context: 'Practice',                    kind: 'practice' },
  { href: '/learn/projects',        title: 'Projects',            context: 'Practice · End-to-end builds', kind: 'practice' },
  { href: '/learn/find-video',      title: 'Find a video',        context: 'Tools',                       kind: 'page' },
  { href: '/blog',                  title: 'Blog',                context: 'Articles',                    kind: 'page' },
  { href: '/newsletter',            title: 'Newsletter',          context: 'Updates',                     kind: 'page' },
]

export function GET() {
  // Tracks whose overview is itself a lesson are found through that lesson.
  // Projects is listed under Practice, not as a track.
  const tracks: SearchEntry[] = TRACKS.filter(track => track.area !== 'practice' && !track.hidden && !getLiveLesson(track.indexHref)).map(track => ({
    href: track.indexHref,
    title: track.title,
    context: 'Track overview',
    kind: 'track',
  }))

  const lessons: SearchEntry[] = LIVE_LESSONS.map(lesson => {
    const trackTitle = getTrack(lesson.track)?.title ?? lesson.track
    return {
      href: lesson.href,
      title: lesson.title,
      context: lesson.section ? `${trackTitle} · ${lesson.section}` : trackTitle,
      kind: 'lesson',
    }
  })

  const roadmaps: SearchEntry[] = Object.entries(ROLE_ROADMAPS).map(([slug, roadmap]) => ({
    href: `/learn/roadmap/${slug}`,
    title: `${roadmap.title} roadmap`,
    context: 'Career roadmap',
    kind: 'roadmap',
  }))

  const paths: SearchEntry[] = CAREER_PATHS.map(path => ({
    href: `/learn/paths/${path.slug}`,
    title: `${path.title} career path`,
    context: path.summary,
    kind: 'page',
  }))
  const schools: SearchEntry[] = SCHOOLS.map(school => ({
    href: `/learn/schools/${school.slug}`,
    title: school.title,
    context: school.description,
    kind: 'page',
  }))
  const articles: SearchEntry[] = Object.entries(BLOG_ARTICLES).map(([slug, article]) => ({
    href: `/blog/${slug}`,
    title: article.title,
    context: `Article · ${article.tags.slice(0, 2).join(', ')}`,
    kind: 'article',
  }))

  const cheatSheets: SearchEntry[] = Object.values(CHEAT_SHEET_FOR_PATH).filter(link => !isHiddenHref(link.href)).map(link => ({
    href: link.href,
    title: link.label.replace(' and project ideas', ''),
    context: 'Reference',
    kind: 'practice',
  }))

  const stats = getCatalogStats()
  const index: SearchIndex = {
    lessonCount: stats.lessons - stats.projects,
    trackCount: stats.liveTracks,
    entries: [...paths, ...schools, ...tracks, ...lessons, ...roadmaps, ...articles, ...cheatSheets, ...SITE_PAGES],
  }
  return NextResponse.json(index)
}
