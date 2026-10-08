// Client-safe shapes computed on the server from the catalog.
import type { TrackArea } from '@/lib/catalog/types'

export interface TrackSummary {
  href: string
  title: string
  area: TrackArea
  lessons: number
}

/** Keyed by track slug, in catalog order. */
export type TrackSummaries = Record<string, TrackSummary>

export interface LessonNavLink {
  href: string
  title: string
  label: string
  subtitle: string
}

export interface LessonNavLinks {
  prev: LessonNavLink | null
  next: LessonNavLink | null
}
