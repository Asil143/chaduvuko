'use client'

import { useState, useCallback } from 'react'
import { renderSimpleMarkdown } from '@/lib/simpleMarkdown'

const EXAMPLE_PROMPTS = [
  'I am new to SQL so I want to deep dive into SQL from scratch to advance',
  "What is an API and why do backend developers use it?",
  'Docker from absolute zero — I have never coded before',
  'What is Git and why does every developer use it?',
]

export default function CustomRoadmapGenerator() {
  const [topic, setTopic] = useState('')
  const [guideLoading, setGuideLoading] = useState(false)
  const [guideReply, setGuideReply] = useState('')
  const [guideError, setGuideError] = useState('')

  const handleGenerate = useCallback(async () => {
    if (!topic.trim() || guideLoading) return
    setGuideLoading(true)
    setGuideError('')
    setGuideReply('')
    try {
      const res = await fetch('/api/custom-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      })
      const data = await res.json()
      setGuideReply(data.reply || 'No response returned.')
    } catch (err: unknown) {
      setGuideError(err instanceof Error ? err.message : 'Could not reach the guide builder.')
    } finally {
      setGuideLoading(false)
    }
  }, [topic, guideLoading])

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '28px 26px',
        marginBottom: 40,
      }}
    >
      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 10 }}>
        Or describe exactly what you want to learn
      </div>
      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 16, maxWidth: 640 }}>
        Tell us where you're starting from and what you want to master — we'll build a complete, beginner-friendly guide from absolute scratch to advanced, made for you.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        {EXAMPLE_PROMPTS.map(p => (
          <button
            key={p}
            onClick={() => setTopic(p)}
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
            {p}
          </button>
        ))}
      </div>

      <textarea
        value={topic}
        onChange={e => setTopic(e.target.value)}
        placeholder="e.g. I am new to SQL so I want to deep dive into SQL from scratch to advance"
        rows={3}
        style={{
          width: '100%',
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '12px 14px',
          color: 'var(--text)',
          fontSize: 14,
          lineHeight: 1.6,
          resize: 'vertical',
          outline: 'none',
          fontFamily: 'inherit',
          marginBottom: 14,
        }}
      />

      <button
        onClick={handleGenerate}
        disabled={!topic.trim() || guideLoading}
        style={{
          background: !topic.trim() || guideLoading ? 'var(--border)' : 'var(--green)',
          color: !topic.trim() || guideLoading ? 'var(--muted)' : '#000',
          border: 'none',
          borderRadius: 8,
          padding: '11px 22px',
          fontSize: 14,
          fontWeight: 700,
          cursor: !topic.trim() || guideLoading ? 'not-allowed' : 'pointer',
        }}
      >
        {guideLoading ? 'Building your complete guide…' : 'Generate My Guide'}
      </button>

      {guideLoading && (
        <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10 }}>
          This can take 20–30 seconds — we're writing a full guide, not a summary.
        </p>
      )}

      {guideError && (
        <p style={{ fontSize: 13, color: '#ff4757', marginTop: 16 }}>{guideError}</p>
      )}

      {guideReply && (
        guideReply.startsWith('DEBUG') ? (
          <p style={{ fontSize: 13, color: '#ff4757', marginTop: 16 }}>{guideReply}</p>
        ) : (
          <div
            style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: '1px solid var(--border)',
            }}
          >
            {renderSimpleMarkdown(guideReply)}
          </div>
        )
      )}
    </div>
  )
}
