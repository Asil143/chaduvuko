'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

/** Click-to-open header menu: closes on Escape (returning focus), outside click, and navigation. */
export function useMenuDisclosure() {
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (!open) return
    const panel = containerRef.current?.querySelector<HTMLElement>('[data-menu-panel]')
    panel?.querySelector<HTMLElement>('a, button')?.focus({ preventScroll: true })
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      buttonRef.current?.focus()
    }
    const onPointerDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [open])

  return { open, setOpen, containerRef, buttonRef }
}
