'use client'
import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useProgress } from '@/lib/progress'
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

export interface ResumeTarget {
  href: string
  title: string
  track: string
  /** 1-based position among the live lessons of its track. */
  position: number
  trackSize: number
}

export interface LearnerProgress {
  /** 'pending' while saved progress or the lesson index is still loading. */
  status: 'pending' | 'none' | 'ready'
  resume: ResumeTarget | null
  /** Completed live lessons per track slug; only tracks with at least one. */
  completedByTrack: Record<string, number>
}

/**
 * What the header knows about this browser's learner. The lesson index is fetched only when
 * saved progress exists and `wantOrder` says a visible control needs it.
 */
export function useLearnerProgress(wantOrder: boolean): LearnerProgress {
  const progress = useProgress()
  const pathname = usePathname()
  const [order, setOrder] = useState<LessonEntry[] | null>(null)
  const hasHistory = Boolean(progress && (progress.lastVisited || Object.keys(progress.completed).length))

  useEffect(() => {
    if (!hasHistory || !wantOrder || order) return
    let active = true
    loadLessonOrder().then(lessons => { if (active) setOrder(lessons) }, () => {})
    return () => { active = false }
  }, [hasHistory, wantOrder, order])

  return useMemo((): LearnerProgress => {
    if (!progress) return { status: 'pending', resume: null, completedByTrack: {} }
    if (!hasHistory) return { status: 'none', resume: null, completedByTrack: {} }
    if (!order) return { status: 'pending', resume: null, completedByTrack: {} }

    const completedByTrack: Record<string, number> = {}
    for (const [href, , track] of order) {
      if (progress.completed[href]) completedByTrack[track] = (completedByTrack[track] ?? 0) + 1
    }

    // Resume the last lesson if unfinished, otherwise the next unfinished one in its track.
    // A Continue link never points at the page it is shown on.
    const next = upNext(progress, order)
    if (!next || next[0] === pathname) return { status: 'none', resume: null, completedByTrack }
    const inTrack = order.filter(([, , track]) => track === next[2])
    const resume: ResumeTarget = {
      href: next[0],
      title: next[1],
      track: next[2],
      position: inTrack.findIndex(([href]) => href === next[0]) + 1,
      trackSize: inTrack.length,
    }
    return { status: 'ready', resume, completedByTrack }
  }, [progress, hasHistory, order, pathname])
}
