import { TRACKS } from './tracks'
import { staticLessons } from './static-lessons'
import { curriculumLessons } from './curriculum-lessons'
import type { Lesson, NonLessonKind, Track } from './types'

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
