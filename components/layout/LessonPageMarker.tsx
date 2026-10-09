'use client'
import { useEffect } from 'react'
import { markLessonPage } from '@/lib/lesson-page'

/** Rendered by LearnLayout on lesson pages; see lib/lesson-page.ts. */
export function LessonPageMarker() {
  useEffect(() => markLessonPage(), [])
  return <span hidden data-lesson-page />
}
