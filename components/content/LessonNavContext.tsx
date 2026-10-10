'use client'
import { createContext, useContext } from 'react'
import type { LessonNavLinks } from '@/lib/lesson-nav'
import type { LessonQuickView } from '@/lib/lesson-quick'

const LessonNavContext = createContext<LessonNavLinks | null>(null)
const LessonQuickContext = createContext<LessonQuickView | null>(null)

export function LessonNavProvider({ nav, quick = null, children }: { nav: LessonNavLinks | null; quick?: LessonQuickView | null; children: React.ReactNode }) {
  return (
    <LessonNavContext.Provider value={nav}>
      <LessonQuickContext.Provider value={quick}>{children}</LessonQuickContext.Provider>
    </LessonNavContext.Provider>
  )
}

export function useLessonNav(): LessonNavLinks | null {
  return useContext(LessonNavContext)
}

/** The open lesson's quick answer and check, or null when it has none. */
export function useLessonQuick(): LessonQuickView | null {
  return useContext(LessonQuickContext)
}
