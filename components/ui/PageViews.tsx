'use client'
import { useState, useEffect } from 'react'
import { Eye } from 'lucide-react'

export function PageViews({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    // Increment view count
    fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    })
      .then(r => r.json())
      .then(d => setViews(d.views))
      .catch(() => {})
  }, [slug])

  if (!views) return null

  return (
    <span className="flex items-center gap-1 text-xs font-mono" style={{ color: 'var(--muted)' }}>
      <Eye size={11} />
      {views >= 1000 ? (views / 1000).toFixed(1) + 'k' : views} reads
    </span>
  )
}