'use client'
import { useEffect, useState } from 'react'

/** How far down the page the reader is: a 2px neutral line along the lesson row. Decorative. */
export function ReadingLine() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'var(--border)' }}>
      <div className="h-full origin-left" style={{ transform: `scaleX(${progress})`, background: 'var(--text2)' }} />
    </div>
  )
}
