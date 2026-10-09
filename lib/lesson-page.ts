'use client'
import { useSyncExternalStore } from 'react'

// Lesson pages hide the header's Continue/Start slot with CSS (body:has([data-lesson-page])),
// which works before hydration. This store tells client code the same thing, so the header
// does not download the lesson index just to fill a slot that is hidden.
let mounted = 0
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach(listener => listener())
}

export function markLessonPage(): () => void {
  mounted++
  emit()
  return () => {
    mounted--
    emit()
  }
}

export function useIsLessonPage(): boolean {
  return useSyncExternalStore(
    listener => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    () => mounted > 0,
    () => false,
  )
}
