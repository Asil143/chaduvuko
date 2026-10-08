// Client-safe shape of a lesson's prev/next links. Computed on the server from the catalog.
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
