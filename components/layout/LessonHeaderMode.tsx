'use client'
import { useEffect } from 'react'

const MIN_DELTA = 6
const SHOW_NEAR_TOP = 128

/**
 * Lesson mode: hides the site header while the reader scrolls down and brings
 * it back on any upward scroll. It never hides while the header has focus or
 * one of its menus is open. Styling lives in globals.css (html[data-header-hidden]).
 */
export function LessonHeaderMode() {
  useEffect(() => {
    const root = document.documentElement
    const header = document.querySelector<HTMLElement>('.site-header')
    let lastY = window.scrollY
    let frame = 0

    const setHidden = (hidden: boolean) => {
      if (hidden) root.dataset.headerHidden = 'true'
      else delete root.dataset.headerHidden
    }
    const headerBusy = () =>
      !!header && (header.contains(document.activeElement) || !!header.querySelector('[aria-expanded="true"]'))

    const update = () => {
      frame = 0
      const y = window.scrollY
      const delta = y - lastY
      if (Math.abs(delta) < MIN_DELTA) return
      setHidden(delta > 0 && y > SHOW_NEAR_TOP && !headerBusy())
      lastY = y
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    const onFocusIn = () => setHidden(false)

    window.addEventListener('scroll', onScroll, { passive: true })
    header?.addEventListener('focusin', onFocusIn)
    return () => {
      window.removeEventListener('scroll', onScroll)
      header?.removeEventListener('focusin', onFocusIn)
      cancelAnimationFrame(frame)
      setHidden(false)
    }
  }, [])

  return null
}
