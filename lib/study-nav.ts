import type { LessonEntry } from '@/lib/up-next'
import type { TrackSummaries } from '@/lib/lesson-nav'

export interface StudyContext {
  trackHref: string
  trackTitle: string
  lessonTitle: string
  nextHref: string
  nextLabel: 'Next' | 'Overview'
  nextTitle: string
}

/** The open lesson, plus the following lesson in that track or the track overview. */
export function studyContext(pathname: string, lessons: LessonEntry[], tracks: TrackSummaries): StudyContext | null {
  const index = lessons.findIndex(([href]) => href === pathname)
  if (index === -1) return null
  const [, lessonTitle, slug] = lessons[index]
  const track = tracks[slug]
  if (!track) return null
  const next = lessons.slice(index + 1).find((entry) => entry[2] === slug)
  if (next) {
    return {
      trackHref: track.href,
      trackTitle: track.title,
      lessonTitle,
      nextHref: next[0],
      nextLabel: 'Next',
      nextTitle: next[1],
    }
  }
  return {
    trackHref: track.href,
    trackTitle: track.title,
    lessonTitle,
    nextHref: track.href,
    nextLabel: 'Overview',
    nextTitle: `${track.title} overview`,
  }
}

/** Track that owns this URL: a lesson, a track index, or a page nested under the track. */
export function trackForPath(pathname: string, lessons: LessonEntry[], tracks: TrackSummaries): string | null {
  const lesson = lessons.find(([href]) => href === pathname)
  if (lesson) return lesson[2]

  let best: { slug: string; len: number } | null = null
  for (const [slug, track] of Object.entries(tracks)) {
    if (track.lessons === 0) continue
    const prefix = `/learn/${slug}`
    const bySlug = pathname === prefix || pathname.startsWith(`${prefix}/`)
    const byIndex = pathname === track.href || pathname.startsWith(`${track.href}/`)
    if (!bySlug && !byIndex) continue
    const len = bySlug ? prefix.length : track.href.length
    if (!best || len > best.len) best = { slug, len }
  }
  return best?.slug ?? null
}
