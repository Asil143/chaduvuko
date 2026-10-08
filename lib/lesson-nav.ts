// Client-safe shapes computed on the server from the catalog.

export type TrackSummaries = Record<string, { href: string; lessons: number }>

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
