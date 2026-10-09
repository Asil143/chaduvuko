import type { Metadata } from 'next'
import Dashboard, { type DashboardLesson } from '@/components/dashboard/Dashboard'
import { TRACKS, getLiveLesson, getTrackSummaries, liveLessonsForTrack } from '@/lib/catalog'
import { QUIZZES } from '@/data/quizzes'

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: { index: false, follow: true },
}

export default function Page() {
  // Grouped by track in curriculum order, so 'Up next' can walk forward within a track.
  const lessons: DashboardLesson[] = TRACKS.flatMap(track =>
    liveLessonsForTrack(track.slug).map((lesson): DashboardLesson => [lesson.href, lesson.title, lesson.track]),
  )
  const quizLessons = Object.keys(QUIZZES).filter(href => getLiveLesson(href))
  return <Dashboard lessons={lessons} tracks={getTrackSummaries()} quizLessons={quizLessons} />
}
