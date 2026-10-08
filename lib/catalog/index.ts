import { TRACKS } from './tracks'
import { staticLessons } from './static-lessons'
import { curriculumLessons } from './curriculum-lessons'
import type { Lesson, NonLessonKind, Track } from './types'
import type { LessonNavLink, LessonNavLinks, TrackSummaries } from '@/lib/lesson-nav'

export type { Lesson, LessonStatus, NonLessonKind, Track, TrackArea } from './types'
export { TRACKS }

export const LESSONS: Lesson[] = [...staticLessons, ...curriculumLessons]

/** The only lessons that may appear in counts, search, sitemap, navigation, and progress. */
export const LIVE_LESSONS: Lesson[] = LESSONS.filter(lesson => lesson.status === 'live')

const liveByHref = new Map(LIVE_LESSONS.map(lesson => [lesson.href, lesson]))

export function getLiveLesson(href: string): Lesson | undefined {
  return liveByHref.get(href)
}

export function getTrack(slug: string): Track | undefined {
  return TRACKS.find(track => track.slug === slug)
}

export function liveLessonsForTrack(slug: string): Lesson[] {
  return LIVE_LESSONS.filter(lesson => lesson.track === slug).sort((a, b) => a.order - b.order)
}

/** Compact per-track data that is safe to pass to Client Components. */
export function getTrackSummaries(): TrackSummaries {
  return Object.fromEntries(
    TRACKS.map(track => [track.slug, {
      href: track.indexHref,
      title: track.title,
      area: track.area,
      lessons: liveLessonsForTrack(track.slug).length,
    }]),
  )
}

export type LessonNavTarget =
  | { kind: 'lesson'; lesson: Lesson }
  | { kind: 'track-overview'; track: Track }

export interface LessonNavigation {
  lesson: Lesson
  track: Track
  prev: LessonNavTarget | null
  next: LessonNavTarget | null
}

/**
 * Prev/next stay within the lesson's track and skip unpublished lessons.
 * At either end of a track they point to the track overview, unless the
 * overview is the current lesson itself.
 */
export function getLessonNavigation(href: string): LessonNavigation | null {
  const lesson = getLiveLesson(href)
  const track = lesson && getTrack(lesson.track)
  if (!lesson || !track) return null

  const lessons = liveLessonsForTrack(track.slug)
  const index = lessons.findIndex(item => item.href === href)
  const overview: LessonNavTarget | null = track.indexHref === href ? null : { kind: 'track-overview', track }
  const at = (i: number): LessonNavTarget | null => (lessons[i] ? { kind: 'lesson', lesson: lessons[i] } : overview)

  return { lesson, track, prev: at(index - 1), next: at(index + 1) }
}

function toNavLink(target: LessonNavTarget, direction: 'prev' | 'next'): LessonNavLink {
  if (target.kind === 'lesson') {
    return {
      href: target.lesson.href,
      title: target.lesson.title,
      label: direction === 'prev' ? 'Previous' : 'Next',
      subtitle: target.lesson.section ?? '',
    }
  }
  return {
    href: target.track.indexHref,
    title: `${target.track.title} overview`,
    label: direction === 'prev' ? 'Back to' : 'Track complete',
    subtitle: direction === 'prev' ? 'Start of track' : 'You finished every live lesson in this track',
  }
}

export function getLessonNavLinks(href: string): LessonNavLinks | null {
  const nav = getLessonNavigation(href)
  if (!nav) return null
  return {
    prev: nav.prev && toNavLink(nav.prev, 'prev'),
    next: nav.next && toNavLink(nav.next, 'next'),
  }
}

/** /learn routes that exist on purpose but are not lessons. */
export const NON_LESSON_ROUTES: Record<string, NonLessonKind> = {
  '/learn': 'catalog',
  ...Object.fromEntries(
    TRACKS.map(track => track.indexHref)
      .filter(href => !liveByHref.has(href))
      .map(href => [href, 'track-index' as const]),
  ),
  '/learn/roadmap': 'roadmap',
  '/learn/interview': 'hub',
  '/learn/industry': 'hub',
  '/learn/find-video': 'tool',
  '/learn/sql/cheatsheet': 'tool',
  '/learn/sql/playground': 'tool',
  '/learn/sql/joins': 'tool',
  '/learn/networking/topology-preview': 'preview',
}

/** Route prefixes whose children are all non-lesson pages. */
export const NON_LESSON_PREFIXES: Record<string, NonLessonKind> = {
  '/learn/roadmap/': 'roadmap',
}
