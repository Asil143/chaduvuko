'use client'
import { createContext, useContext } from 'react'
import type { LessonNavLinks } from '@/lib/lesson-nav'

const LessonNavContext = createContext<LessonNavLinks | null>(null)

export function LessonNavProvider({ nav, children }: { nav: LessonNavLinks | null; children: React.ReactNode }) {
  return <LessonNavContext.Provider value={nav}>{children}</LessonNavContext.Provider>
}

export function useLessonNav(): LessonNavLinks | null {
  return useContext(LessonNavContext)
}
