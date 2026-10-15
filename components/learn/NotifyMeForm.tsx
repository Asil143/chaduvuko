'use client'

import { useState } from 'react'

type Status = 'idle' | 'saving' | 'done' | 'error'

export function NotifyMeForm({ trackSlug, trackTitle, color }: { trackSlug: string; trackTitle: string; color: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setStatus('saving')
    try {
      const res = await fetch('/api/track-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, track: trackSlug }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus('done')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (status === 'done') {
    return (
      <div role="status" style={{ padding: 16, borderRadius: 10, border: `1px solid ${color}55`, color: 'var(--text)' }}>
        ✅ Thanks—your interest in {trackTitle} is recorded. We’ll use it to prioritize upcoming content and share relevant track updates.
      </div>
    )
  }

  return (
    <form onSubmit={submit} style={{ padding: 18, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', marginBottom: 30 }}>
      <label htmlFor={`notify-${trackSlug}`} style={{ display: 'block', color: 'var(--text)', fontWeight: 700, marginBottom: 4 }}>
        Get notified when this track launches
      </label>
      <p style={{ color: 'var(--muted)', fontSize: 13, margin: '0 0 12px' }}>
        Your request helps us prioritize this track. We’ll use your email for updates about this track only. See our <a href="/privacy" style={{ color }}>privacy notice</a>.
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input
          id={`notify-${trackSlug}`}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={{ flex: '1 1 220px', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg, transparent)', color: 'var(--text)' }}
        />
        <button
          type="submit"
          disabled={status === 'saving'}
          style={{ padding: '10px 18px', borderRadius: 8, border: 'none', background: color, color: '#0b1020', fontWeight: 700, cursor: 'pointer' }}
        >
          {status === 'saving' ? 'Saving…' : 'Notify me'}
        </button>
      </div>
      {status === 'error' && <p role="alert" style={{ color: '#f87171', fontSize: 13, margin: '10px 0 0' }}>{message}</p>}
    </form>
  )
}
