'use client'

import { useState, useCallback } from 'react'
import { VideoResultCard, type YouTubeVideo } from '@/components/youtube/VideoResultCard'

const EXAMPLE_TOPICS = [
  'SQL for beginners',
  'What is an API',
  'Docker explained simply',
  'Git and GitHub basics',
]

export function VideoFinder() {
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)
  const [video, setVideo] = useState<YouTubeVideo | null>(null)
  const [debug, setDebug] = useState('')
  const [searched, setSearched] = useState(false)

  const handleSearch = useCallback(async () => {
    if (!topic.trim() || loading) return
    setLoading(true)
    setVideo(null)
    setDebug('')
    setSearched(true)
    try {
      const res = await fetch('/api/youtube-best-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      })
      const data = await res.json()
      setVideo(data.video || null)
      if (data.debug) setDebug(data.debug)
    } catch {
      setDebug('DEBUG: could not reach the video finder.')
    } finally {
      setLoading(false)
    }
  }, [topic, loading])

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '28px 26px',
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        {EXAMPLE_TOPICS.map(t => (
          <button
            key={t}
            onClick={() => setTopic(t)}
            style={{
              fontSize: 11,
              color: 'var(--muted)',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 20,
              padding: '6px 12px',
              cursor: 'pointer',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <input
          value={topic}
          onChange={e => setTopic(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="e.g. SQL for beginners"
          style={{
            flex: 1,
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '12px 14px',
            color: 'var(--text)',
            fontSize: 14,
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />
        <button
          onClick={handleSearch}
          disabled={!topic.trim() || loading}
          style={{
            background: !topic.trim() || loading ? 'var(--border)' : 'var(--green)',
            color: !topic.trim() || loading ? 'var(--muted)' : '#000',
            border: 'none',
            borderRadius: 8,
            padding: '11px 22px',
            fontSize: 14,
            fontWeight: 700,
            cursor: !topic.trim() || loading ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {loading ? 'Searching…' : 'Find Video'}
        </button>
      </div>

      {searched && (
        <div style={{ marginTop: 20 }}>
          <VideoResultCard video={video} loading={loading} debug={debug} />
          {!loading && !video && !debug && (
            <p style={{ fontSize: 13, color: 'var(--muted)' }}>No strong video match found — try rephrasing your topic.</p>
          )}
        </div>
      )}
    </div>
  )
}
