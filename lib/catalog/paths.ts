import { CAREER_PATHS, type CareerPath, type PathMilestone } from '@/data/career-paths'
import { PLANNED_TRACKS } from '@/data/planned-tracks'
import { LIVE_LESSONS, getTrack } from './index'
import type { Lesson } from './types'

/** Used when a lesson has no reading-time estimate. */
const DEFAULT_LESSON_MINUTES = 30

export interface PathLesson {
  href: string
  title: string
  /** Module name inside the track, when the track has modules. */
  section?: string
  minutes: number
}

export interface ResolvedMilestone extends PathMilestone {
  status: 'live' | 'planned'
  href: string
  trackTitle: string
  /** Live lessons in curriculum order; empty when planned. */
  lessons: PathLesson[]
  minutes: number
}

export interface ResolvedPath extends CareerPath {
  milestones: ResolvedMilestone[]
  liveLessons: number
  minutes: number
  plannedMilestones: number
}

export function lessonMinutes(lesson: Pick<Lesson, 'readTime'>): number {
  const numbers = lesson.readTime?.match(/\d+/g)?.map(Number) ?? []
  if (!numbers.length) return DEFAULT_LESSON_MINUTES
  return Math.round(numbers.reduce((sum, value) => sum + value, 0) / numbers.length)
}

function resolveMilestone(milestone: PathMilestone): ResolvedMilestone {
  const track = getTrack(milestone.track)
  if (track && !track.status && !track.hidden) {
    const lessons = LIVE_LESSONS.filter(lesson =>
      lesson.track === track.slug && (!milestone.sections || milestone.sections.includes(lesson.section ?? '')))
    return {
      ...milestone,
      status: 'live',
      href: track.indexHref,
      trackTitle: track.title,
      lessons: lessons.map(lesson => ({ href: lesson.href, title: lesson.title, section: lesson.section, minutes: lessonMinutes(lesson) })),
      minutes: lessons.reduce((sum, lesson) => sum + lessonMinutes(lesson), 0),
    }
  }
  const planned = PLANNED_TRACKS.find(item => item.slug === milestone.track)
  return {
    ...milestone,
    status: 'planned',
    href: planned?.href ?? track?.indexHref ?? '/learn',
    trackTitle: planned?.title ?? track?.title ?? milestone.track,
    lessons: [],
    minutes: 0,
  }
}

export function resolvePath(path: CareerPath): ResolvedPath {
  const milestones = path.milestones.map(resolveMilestone)
  const unique = new Set(milestones.flatMap(milestone => milestone.lessons.map(lesson => lesson.href)))
  return {
    ...path,
    milestones,
    liveLessons: unique.size,
    minutes: milestones.reduce((sum, milestone) => sum + milestone.minutes, 0),
    plannedMilestones: milestones.filter(milestone => milestone.status === 'planned').length,
  }
}

export function getResolvedPaths(): ResolvedPath[] {
  return CAREER_PATHS.map(resolvePath)
}

export function formatHours(minutes: number): string {
  if (!minutes) return 'Coming soon'
  const hours = Math.round(minutes / 60)
  return hours < 1 ? `${minutes} min` : `about ${hours} hours`
}
