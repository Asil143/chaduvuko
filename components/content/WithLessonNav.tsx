import { getLessonNavLinks } from '@/lib/catalog'
import { LessonNavProvider } from './LessonNavContext'

// Server Component: keeps the catalog out of the client bundle and sends only this lesson's links.
export function WithLessonNav({ href, children }: { href: string; children: React.ReactNode }) {
  return <LessonNavProvider nav={getLessonNavLinks(href)}>{children}</LessonNavProvider>
}
