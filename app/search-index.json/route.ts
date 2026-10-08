import { NextResponse } from 'next/server'
import { LIVE_LESSONS, TRACKS, getLiveLesson, getTrack } from '@/lib/catalog'
import type { SearchEntry, SearchIndex } from '@/lib/search'

export const dynamic = 'force-static'

const SITE_PAGES: SearchEntry[] = [
  { href: '/learn',                 title: 'All tracks',          context: 'Browse every learning track', kind: 'page' },
  { href: '/learn/roadmap',         title: 'Career roadmaps',     context: 'Role-by-role learning paths', kind: 'page' },
  { href: '/learn/interview',       title: 'Interview prep',      context: 'Questions and answers',       kind: 'page' },
  { href: '/learn/industry',        title: 'Industry guide',      context: 'Companies and roles',         kind: 'page' },
  { href: '/learn/sql/cheatsheet',  title: 'SQL cheatsheet',      context: 'Tools',                       kind: 'page' },
  { href: '/learn/sql/playground',  title: 'SQL playground',      context: 'Tools',                       kind: 'page' },
  { href: '/learn/sql/joins',       title: 'Visual JOIN diagrams', context: 'Tools',                      kind: 'page' },
  { href: '/playground',            title: 'Builder playground',  context: 'Tools',                       kind: 'page' },
  { href: '/learn/find-video',      title: 'Find a video',        context: 'Tools',                       kind: 'page' },
  { href: '/blog',                  title: 'Blog',                context: 'Articles',                    kind: 'page' },
  { href: '/newsletter',            title: 'Newsletter',          context: 'Updates',                     kind: 'page' },
]

export function GET() {
  // Tracks whose overview is itself a lesson are found through that lesson.
  const tracks: SearchEntry[] = TRACKS.filter(track => !getLiveLesson(track.indexHref)).map(track => ({
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

  const index: SearchIndex = {
    lessonCount: LIVE_LESSONS.length,
    trackCount: TRACKS.length,
    entries: [...tracks, ...lessons, ...SITE_PAGES],
  }
  return NextResponse.json(index)
}
