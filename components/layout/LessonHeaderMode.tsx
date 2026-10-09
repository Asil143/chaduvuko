'use client'
import { useEffect } from 'react'

const HIDE_AFTER_DOWN = 64  // continuous downward travel before the bar hides
const SHOW_AFTER_UP = 28    // continuous upward travel before it returns
const FOCUSABLE = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'

/**
 * Lesson mode: past the first screen, the site bar slides away while the reader scrolls down
 * and the lesson row stays pinned; it returns on a deliberate scroll up or near the top.
 * While hidden the bar is inert, so focus never lands on an invisible control. It is revealed
 * before focus can move into it (Shift+Tab from the lesson row, or Ctrl/Cmd+K), and it never
 * hides while it has focus or one of its panels is open. Styling: html[data-header-hidden].
 */
export function LessonHeaderMode() {
  useEffect(() => {
    const root = document.documentElement
    const header = document.querySelector<HTMLElement>('.site-header')
    let hidden = false
    let anchorY = window.scrollY
    let lastY = window.scrollY
    let frame = 0

    const setHidden = (next: boolean) => {
      if (next === hidden || !header) return
      hidden = next
      header.inert = next
      if (next) root.dataset.headerHidden = 'true'
      else delete root.dataset.headerHidden
    }
    const headerBusy = () =>
      !!header && (header.contains(document.activeElement) || !!header.querySelector('[aria-expanded="true"]'))

    const update = () => {
      frame = 0
      const y = window.scrollY
      // A change of direction restarts the travel count.
      if ((y > lastY && anchorY > lastY) || (y < lastY && anchorY < lastY)) anchorY = lastY
      lastY = y
      if (y < window.innerHeight * 0.25) return setHidden(false)
      const travel = y - anchorY
      if (travel > HIDE_AFTER_DOWN && y > window.innerHeight && !headerBusy()) setHidden(true)
      else if (travel < -SHOW_AFTER_UP) setHidden(false)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }

    const onKeyDown = (e: KeyboardEvent) => {
      if (!hidden) return
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') return setHidden(false)
      if (e.key !== 'Tab' || !e.shiftKey) return
      const row = document.querySelector<HTMLElement>('.lesson-row')
      const first = row?.querySelector<HTMLElement>(FOCUSABLE)
      if (first && document.activeElement === first) setHidden(false)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // Capture phase, so the bar is revealed before the shortcut or Tab moves focus.
    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('keydown', onKeyDown, true)
      cancelAnimationFrame(frame)
      setHidden(false)
    }
  }, [])

  return null
}
