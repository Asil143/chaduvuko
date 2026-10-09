import type { Metadata } from 'next'
import Dashboard from '@/components/dashboard/Dashboard'
import { getLessonOrder, getLiveLesson, getTrackSummaries } from '@/lib/catalog'
import { QUIZZES } from '@/data/quizzes'

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: { index: false, follow: true },
}

export default function Page() {
  const quizLessons = Object.keys(QUIZZES).filter(href => getLiveLesson(href))
  return <Dashboard lessons={getLessonOrder()} tracks={getTrackSummaries()} quizLessons={quizLessons} />
}
