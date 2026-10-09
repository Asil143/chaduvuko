'use client'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

const FOCUSABLE = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'

/**
 * Makes everything outside `container` inert: the siblings of the container and of each of its
 * ancestors, so it also works for panels nested inside the page. Returns a function that undoes it.
 */
export function inertOutside(container: Element): () => void {
  const inert: HTMLElement[] = []
  for (let node: Element = container; node !== document.body && node.parentElement; node = node.parentElement) {
    for (const sibling of Array.from(node.parentElement.children)) {
      if (sibling !== node && sibling instanceof HTMLElement && !sibling.inert) inert.push(sibling)
    }
  }
  inert.forEach(el => { el.inert = true })
  return () => inert.forEach(el => { el.inert = false })
}

/**
 * Click-to-open header panel that behaves as a modal: focus moves into the panel
 * ([data-menu-panel]) and Tab stays inside it, the rest of the page is inert, and
 * Escape, outside click, or navigation closes it and returns focus to the trigger.
 */
export function useMenuDisclosure() {
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  const close = useCallback(() => {
    setOpen(false)
    buttonRef.current?.focus()
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (!open) return
    const container = containerRef.current
    const panel = container?.querySelector<HTMLElement>('[data-menu-panel]')
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus({ preventScroll: true })

    const restoreInert = container ? inertOutside(container) : () => {}

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (!panel.contains(document.activeElement)) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    const onPointerDown = (e: MouseEvent) => {
      if (!container?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      restoreInert()
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [open, close])

  return { open, setOpen, close, containerRef, buttonRef }
}
