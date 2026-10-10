import { getLessonNavLinks } from '@/lib/catalog'
import { getLessonQuick } from '@/lib/lesson-quick-data'
import { LessonNavProvider } from './LessonNavContext'

// Server Component: keeps the catalog and the quick-answer data out of the client bundle and
// sends only this lesson's links and quick answer.
export function WithLessonNav({ href, children }: { href: string; children: React.ReactNode }) {
  return <LessonNavProvider nav={getLessonNavLinks(href)} quick={getLessonQuick(href)}>{children}</LessonNavProvider>
}
