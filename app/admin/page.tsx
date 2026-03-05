'use client'
import { useState } from 'react'
import { Trash2, CheckCircle, Flag, Lock, Eye } from 'lucide-react'

interface Comment {
  id: string
  page_slug: string
  content: string
  author_name: string
  author_github?: string
  auth_provider: string
  upvotes: number
  created_at: string
}

function timeAgo(date: string) {
  const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (s < 60) return 'just now'
  if (s < 3600) return Math.floor(s / 60) + 'm ago'
  if (s < 86400) return Math.floor(s / 3600) + 'h ago'
  return Math.floor(s / 86400) + 'd ago'
}

export default function AdminPage() {
  const [key,      setKey]      = useState('')
  const [authed,   setAuthed]   = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [tab,      setTab]      = useState<'flagged' | 'all'>('flagged')

  async function login() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin?key=' + key)
      if (res.status === 401) { setError('Wrong password'); setLoading(false); return }
      const data = await res.json()
      setComments(data.comments)
      setAuthed(true)
    } catch {
      setError('Connection error')
    } finally {
      setLoading(false)
    }
  }

  async function loadAll() {
    setLoading(true)
    const res = await fetch('/api/comments?slug=&voter=admin')
    const data = await res.json()
    setComments(data.comments || [])
    setTab('all')
    setLoading(false)
  }

  async function loadFlagged() {
    setLoading(true)
    const res = await fetch('/api/admin?key=' + key)
    const data = await res.json()
    setComments(data.comments || [])
    setTab('flagged')
    setLoading(false)
  }

  async function deleteComment(id: string) {
    await fetch('/api/admin', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, key }),
    })
    setComments(prev => prev.filter(c => c.id !== id))
  }

  async function unflagComment(id: string) {
    await fetch('/api/admin', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, key }),
    })
    setComments(prev => prev.filter(c => c.id !== id))
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'var(--bg)' }}>
        <div className="w-full max-w-sm rounded-2xl p-8"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 mb-6">
            <Lock size={16} style={{ color: 'var(--accent)' }} />
            <span className="font-display font-bold" style={{ color: 'var(--text)' }}>Admin Panel</span>
          </div>
          <input
            type="password"
            value={key}
            onChange={e => setKey(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            placeholder="Admin password"
            className="w-full px-4 py-3 rounded-xl text-sm font-mono mb-3"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }}
          />
          {error && <p className="text-xs font-mono mb-3" style={{ color: '#ff6b6b' }}>{error}</p>}
          <button onClick={login} disabled={!key || loading}
            className="w-full py-3 rounded-xl text-sm font-mono font-semibold"
            style={{ background: 'var(--accent)', color: '#fff', opacity: key && !loading ? 1 : 0.6 }}>
            {loading ? 'Checking...' : 'Enter'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 px-4 md:px-8 pb-16" style={{ background: 'var(--bg)' }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-2xl mb-1" style={{ color: 'var(--text)' }}>
              Admin Panel
            </h1>
            <p className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
              {comments.length} comment{comments.length !== 1 ? 's' : ''} shown
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={loadFlagged}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono"
              style={{
                background: tab === 'flagged' ? 'var(--accent)' : 'var(--surface)',
                color: tab === 'flagged' ? '#fff' : 'var(--muted)',
                border: '1px solid var(--border)',
              }}>
              <Flag size={11} /> Flagged
            </button>
            <button onClick={loadAll}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono"
              style={{
                background: tab === 'all' ? 'var(--accent)' : 'var(--surface)',
                color: tab === 'all' ? '#fff' : 'var(--muted)',
                border: '1px solid var(--border)',
              }}>
              <Eye size={11} /> All
            </button>
          </div>
        </div>

        {/* Comments */}
        {loading ? (
          <div className="text-center py-20 text-sm font-mono" style={{ color: 'var(--muted)' }}>
            Loading...
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-20 rounded-2xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <p className="text-3xl mb-3">✅</p>
            <p className="font-display font-semibold" style={{ color: 'var(--text)' }}>
              {tab === 'flagged' ? 'No flagged comments' : 'No comments yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {comments.map(comment => (
              <div key={comment.id} className="rounded-2xl p-5"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-mono font-semibold" style={{ color: 'var(--text)' }}>
                        {comment.author_name}
                      </span>
                      {comment.author_github && (
                        <span className="text-xs font-mono px-1.5 py-0.5 rounded"
                          style={{ background: 'var(--bg2)', color: 'var(--muted)' }}>
                          @{comment.author_github}
                        </span>
                      )}
                      <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
                        {timeAgo(comment.created_at)}
                      </span>
                    </div>
                    <div className="text-xs font-mono mb-2" style={{ color: 'var(--accent)' }}>
                      /{comment.page_slug.replace(/_/g, '/')}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {tab === 'flagged' && (
                      <button onClick={() => unflagComment(comment.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono"
                        style={{ background: 'rgba(0,230,118,0.1)', color: 'var(--green)', border: '1px solid rgba(0,230,118,0.2)' }}>
                        <CheckCircle size={11} /> Keep
                      </button>
                    )}
                    <button onClick={() => deleteComment(comment.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono"
                      style={{ background: 'rgba(255,107,107,0.1)', color: '#ff6b6b', border: '1px solid rgba(255,107,107,0.2)' }}>
                      <Trash2 size={11} /> Delete
                    </button>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>
                  {comment.content}
                </p>
                <div className="flex items-center gap-3 mt-3 text-xs font-mono" style={{ color: 'var(--muted)' }}>
                  <span>👍 {comment.upvotes}</span>
                  <span>{comment.auth_provider}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}