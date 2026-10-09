import type { ProgressRecord } from '@/lib/progress'

/** [href, title, track slug] for a live lesson. Lists are grouped by track in curriculum order. */
export type LessonEntry = [href: string, title: string, track: string]

/** Resume the last lesson if unfinished; otherwise the next unfinished live lesson in its track. */
export function upNext(progress: ProgressRecord, lessons: LessonEntry[]): LessonEntry | null {
  const last = progress.lastVisited?.href
  const index = last ? lessons.findIndex(([href]) => href === last) : -1
  if (index === -1) return null
  if (!progress.completed[lessons[index][0]]) return lessons[index]
  const track = lessons[index][2]
  return lessons.slice(index + 1).find(([href, , t]) => t === track && !progress.completed[href]) ?? null
}
