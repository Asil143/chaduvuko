import type { Metadata } from 'next'
import Dashboard from '@/components/dashboard/Dashboard'
import { getLessonOrder, getLiveLesson, getTrackSummaries } from '@/lib/catalog'
import { QUIZZES } from '@/data/quizzes'
import { ROLE_ROADMAPS } from '@/data/roadmaps/role-registry'
import { lessonsForTopic } from '@/data/roadmaps/topic-lessons'

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: { index: false, follow: true },
}

export default function Page() {
  const quizLessons = Object.keys(QUIZZES).filter(href => getLiveLesson(href))
  const roadmaps = Object.values(ROLE_ROADMAPS).map(roadmap => ({
    id: roadmap.id,
    slug: roadmap.slug,
    title: roadmap.title,
    sections: (roadmap.sections ?? []).map(section => ({ row: section.row, label: section.label })),
    nodes: roadmap.nodes.map(node => ({
      id: node.id,
      title: node.title,
      type: node.type,
      row: node.row ?? node.y ?? 0,
      prerequisites: node.prerequisites ?? [],
      lessonHrefs: lessonsForTopic(roadmap.slug, node.id).filter(href => getLiveLesson(href)),
    })),
  }))
  return (
    <Dashboard
      lessons={getLessonOrder()}
      tracks={getTrackSummaries()}
      quizLessons={quizLessons}
      roadmaps={roadmaps}
    />
  )
}
