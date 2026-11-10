export type LessonStatus = 'live' | 'soon'

export type TrackArea = 'data' | 'cloud' | 'programming' | 'cs' | 'security' | 'ai' | 'practice'

export interface Track {
  slug: string
  title: string
  area: TrackArea
  indexHref: string
  /** Extra URL prefixes whose lessons belong to this track (merged tracks keep their old URLs). */
  urlPrefixes?: string[]
  status?: 'coming-soon'
  /**
   * Hidden tracks stay reachable by direct URL but are noindex and left out of
   * listings, search, sitemap, counts, and progress. Reversible: remove the flag.
   */
  hidden?: { reason: string; since: string }
}

export interface Lesson {
  /** Canonical ID. */
  href: string
  title: string
  track: string
  order: number
  section?: string
  readTime?: string
  status: LessonStatus
  /** ISO date of the last substantive content change; omit unless known. */
  updatedAt?: string
}

export type NonLessonKind = 'catalog' | 'track-index' | 'hub' | 'roadmap' | 'tool' | 'preview'
