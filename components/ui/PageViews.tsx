'use client'
import { useState, useEffect } from 'react'
import { Eye } from 'lucide-react'

type ViewCountState =
  | { status: 'loading' }
  | { status: 'ready'; views: number }
  | { status: 'error' }

export function PageViews({ slug }: { slug: string }) {
  const [state, setState] = useState<ViewCountState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading' })
    fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
      signal: controller.signal,
    })
      .then(async response => {
        if (!response.ok) throw new Error(`Page view request failed: ${response.status}`)
        const result: unknown = await response.json()
        if (!result || typeof result !== 'object' || !('views' in result) ||
            typeof result.views !== 'number' || !Number.isSafeInteger(result.views) || result.views < 0) {
          throw new Error('Page view response contained an invalid count.')
        }
        setState({ status: 'ready', views: result.views })
      })
      .catch(error => {
        if (controller.signal.aborted) return
        console.error('Could not load page views:', error)
        setState({ status: 'error' })
      })
    return () => controller.abort()
  }, [slug])

  if (state.status === 'loading') return null
  if (state.status === 'error') {
    return <span role="status" className="text-xs font-mono" style={{ color: 'var(--muted)' }}>Read count unavailable</span>
  }

  return (
    <span className="flex items-center gap-1 text-xs font-mono" style={{ color: 'var(--muted)' }}>
      <Eye size={11} />
      {state.views >= 1000 ? (state.views / 1000).toFixed(1) + 'k' : state.views} reads
    </span>
  )
}
