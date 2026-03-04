'use client'
import { useState } from 'react'
import { Send, Check, Loader } from 'lucide-react'

export function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [email,   setEmail]   = useState('')
  const [name,    setName]    = useState('')
  const [status,  setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function submit() {
    if (!email.includes('@')) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
      const data = await res.json()
      if (data.ok) {
        setStatus('success')
        setMessage('You are on the list. Check your inbox.')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Could not connect. Try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 px-5 py-4 rounded-2xl"
        style={{ background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.2)' }}>
        <Check size={16} style={{ color: 'var(--green)', flexShrink: 0 }} />
        <p className="text-sm font-mono" style={{ color: 'var(--green)' }}>{message}</p>
      </div>
    )
  }

  if (compact) {
    return (
      <div className="flex gap-2 flex-wrap">
        <input value={email} onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="your@email.com"
          className="flex-1 min-w-0 px-4 py-2.5 rounded-xl text-sm font-mono"
          style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }} />
        <button onClick={submit} disabled={!email.includes('@') || status === 'loading'}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-mono font-semibold"
          style={{ background: 'var(--accent)', color: '#fff', opacity: email.includes('@') ? 1 : 0.6 }}>
          {status === 'loading' ? <Loader size={14} className="animate-spin" /> : <Send size={14} />}
          Subscribe
        </button>
        {status === 'error' && <p className="w-full text-xs font-mono" style={{ color: '#ff6b6b' }}>{message}</p>}
      </div>
    )
  }

  return (
    <div className="rounded-2xl p-8 text-center"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div className="text-3xl mb-3">📬</div>
      <h3 className="font-display font-bold text-xl mb-2" style={{ color: 'var(--text)' }}>
        Stay updated
      </h3>
      <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>
        New tutorials, career tips, and data engineering updates. No spam. Unsubscribe any time.
      </p>
      <div className="flex flex-col gap-3 max-w-sm mx-auto">
        <input value={name} onChange={e => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="px-4 py-3 rounded-xl text-sm"
          style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none', textAlign: 'center' }} />
        <input value={email} onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="your@email.com"
          className="px-4 py-3 rounded-xl text-sm font-mono"
          style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none', textAlign: 'center' }} />
        <button onClick={submit} disabled={!email.includes('@') || status === 'loading'}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-mono font-semibold"
          style={{ background: 'var(--accent)', color: '#fff', opacity: email.includes('@') ? 1 : 0.6 }}>
          {status === 'loading' ? <Loader size={14} className="animate-spin" /> : <Send size={14} />}
          Subscribe for free
        </button>
        {status === 'error' && <p className="text-xs font-mono" style={{ color: '#ff6b6b' }}>{message}</p>}
      </div>
    </div>
  )
}