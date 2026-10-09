// Client-safe shapes computed on the server from the catalog.
import type { TrackArea } from '@/lib/catalog/types'

export interface TrackSummary {
  href: string
  title: string
  area: TrackArea
  lessons: number
  /** True when most of the track is still unpublished. Short finished tracks stay unmarked. */
  early: boolean
}

/** Live counts shown on the homepage and /learn, computed on the server. */
export interface SiteStats {
  lessons: number
  liveTracks: number
  projects: number
  roadmaps: number
  articles: number
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
