'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { readProgress, useProgress } from '@/lib/progress'
import { upNext, type LessonEntry } from '@/lib/up-next'

let orderPromise: Promise<LessonEntry[]> | null = null
function loadLessonOrder(): Promise<LessonEntry[]> {
  orderPromise ??= fetch('/lesson-order.json').then(res => {
    if (!res.ok) throw new Error(`lesson order ${res.status}`)
    return res.json()
  })
  orderPromise.catch(() => { orderPromise = null })
  return orderPromise
}

/**
 * The lesson a returning learner should continue with, or null. The lesson-order index is
 * fetched only once progress has loaded and there is a last-visited lesson to resume from.
 */
export function useContinueLesson(): LessonEntry | null {
  const progress = useProgress()
  const pathname = usePathname()
  const [order, setOrder] = useState<LessonEntry[] | null>(null)
  const last = progress?.lastVisited?.href
  // A first visit to a lesson records it as lastVisited; while that lesson is open and
  // unfinished, Up next would be this very page, so there is nothing to fetch yet.
  const resumingThisPage = last === pathname && !progress?.completed[pathname]
  const hasHistory = Boolean(last) && !resumingThisPage

  useEffect(() => {
    if (!hasHistory || order) return
    let active = true
    // On client navigation this runs before the new lesson's LearnLayout records its visit,
    // so re-check the stored record one task later before downloading the index.
    const timer = setTimeout(() => {
      const current = readProgress()
      const lastHref = current.lastVisited?.href
      if (!lastHref || (lastHref === window.location.pathname && !current.completed[lastHref])) return
      loadLessonOrder().then(lessons => { if (active) setOrder(lessons) }, () => {})
    }, 0)
    return () => { active = false; clearTimeout(timer) }
  }, [hasHistory, order])

  if (!progress || !order) return null
  const next = upNext(progress, order)
  // On the lesson that is itself next, a Continue link would point back at this page.
  return next && next[0] !== pathname ? next : null
}
