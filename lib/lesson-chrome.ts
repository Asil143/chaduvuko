'use client'

import { useSyncExternalStore } from 'react'
import type { LessonNavLinks } from '@/lib/lesson-nav'

// The site header lives in the root layout, outside the page that knows which
// lesson is open. LearnLayout publishes the open lesson here; the header subscribes.
let chrome: LessonNavLinks | null = null
let token = 0
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach(listener => listener())
}

/** Publish the open lesson. The returned function clears it on unmount. */
export function setLessonChrome(next: LessonNavLinks | null): () => void {
  const mine = ++token
  chrome = next
  emit()
  return () => {
    if (token !== mine) return
    chrome = null
    emit()
  }
}

export function useLessonChrome(): LessonNavLinks | null {
  return useSyncExternalStore(
    listener => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    () => chrome,
    () => null,
  )
}
