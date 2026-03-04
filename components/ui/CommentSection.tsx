'use client'
import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { ThumbsUp, Reply, Flag, Pin, Github, Send, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react'

interface Comment {
  id: string
  page_slug: string
  content: string
  author_name: string
  author_avatar?: string
  author_github?: string
  auth_provider: string
  parent_id?: string
  upvotes: number
  is_pinned: boolean
  is_flagged: boolean
  created_at: string
  user_upvoted?: boolean
}

interface User {
  name: string
  email?: string
  avatar?: string
  github?: string
  provider: 'github' | 'guest'
}

const VOTER_KEY    = 'asil_voter_id'
const USER_KEY     = 'asil_user'
const ADMIN_GITHUB = process.env.NEXT_PUBLIC_ADMIN_GITHUB || 'Asil143'

function getVoterId() {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem(VOTER_KEY)
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36)
    localStorage.setItem(VOTER_KEY, id)
  }
  return id
}

function timeAgo(date: string) {
  const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (s < 60) return 'just now'
  if (s < 3600) return Math.floor(s / 60) + 'm ago'
  if (s < 86400) return Math.floor(s / 3600) + 'h ago'
  if (s < 2592000) return Math.floor(s / 86400) + 'd ago'
  return new Date(date).toLocaleDateString()
}

function Avatar({ name, avatar, size = 7 }: { name: string; avatar?: string; size?: number }) {
  const dim = size * 4
  if (avatar) {
    return (
      <img src={avatar} alt={name}
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: dim, height: dim }} />
    )
  }
  return (
    <div className="rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
      style={{ width: dim, height: dim, background: 'var(--accent)', color: '#fff' }}>
      {name[0].toUpperCase()}
    </div>
  )
}

function ReplyCard({ reply, onUpvote, onFlag }: {
  reply: Comment
  onUpvote: (id: string) => void
  onFlag: (id: string) => void
}) {
  return (
    <div className="flex gap-3 px-5 py-4" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div className="w-px self-stretch mt-1 flex-shrink-0 rounded-full" style={{ background: 'var(--border)' }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <Avatar name={reply.author_name} avatar={reply.author_avatar} size={5} />
          <span className="text-xs font-mono font-semibold" style={{ color: 'var(--text)' }}>
            {reply.author_github
              ? <a href={'https://github.com/' + reply.author_github} target="_blank" rel="noopener noreferrer" className="hover:underline">{reply.author_name}</a>
              : reply.author_name}
          </span>
          {reply.auth_provider === 'github' && <Github size={10} style={{ color: 'var(--muted)' }} />}
          <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{timeAgo(reply.created_at)}</span>
        </div>
        <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>
          {reply.content}
        </p>
        <div className="flex items-center gap-3">
          <button onClick={() => onUpvote(reply.id)}
            className="flex items-center gap-1 text-xs font-mono"
            style={{ color: reply.user_upvoted ? 'var(--accent)' : 'var(--muted)' }}>
            <ThumbsUp size={10} /> {reply.upvotes}
          </button>
          <button onClick={() => onFlag(reply.id)}
            className="flex items-center gap-1 text-xs font-mono ml-auto"
            style={{ color: reply.is_flagged ? '#ff6b6b' : 'var(--muted)' }}>
            <Flag size={10} />
          </button>
        </div>
      </div>
    </div>
  )
}

function CommentCard({ comment, replies, user, isAdmin, replyTo, replyContent, setReplyTo, setReplyContent, onUpvote, onPin, onFlag, onSubmitReply, submitting }: {
  comment: Comment; replies: Comment[]; user: User | null; isAdmin: boolean
  replyTo: string | null; replyContent: string
  setReplyTo: (id: string | null) => void; setReplyContent: (v: string) => void
  onUpvote: (id: string) => void; onPin: (id: string, pinned: boolean) => void
  onFlag: (id: string) => void; onSubmitReply: () => void; submitting: boolean
}) {
  const [showReplies, setShowReplies] = useState(true)

  return (
    <div className="rounded-2xl overflow-hidden" style={{
      border: '1px solid ' + (comment.is_pinned ? 'rgba(245,197,66,0.35)' : 'var(--border)'),
      background: comment.is_pinned ? 'rgba(245,197,66,0.03)' : 'var(--surface)',
    }}>
      <div className="p-5">
        {comment.is_pinned && (
          <div className="flex items-center gap-1.5 mb-3 text-xs font-mono font-semibold" style={{ color: '#f5c542' }}>
            <Pin size={11} /> Pinned by Asil
          </div>
        )}

        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <Avatar name={comment.author_name} avatar={comment.author_avatar} />
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm font-mono font-semibold" style={{ color: 'var(--text)' }}>
                  {comment.author_github
                    ? <a href={'https://github.com/' + comment.author_github} target="_blank" rel="noopener noreferrer" className="hover:underline">{comment.author_name}</a>
                    : comment.author_name}
                </span>
                {comment.auth_provider === 'github' && (
                  <span className="flex items-center gap-1 text-xs font-mono px-1.5 py-0.5 rounded"
                    style={{ background: 'var(--bg3)', color: 'var(--muted)' }}>
                    <Github size={9} /> GitHub
                  </span>
                )}
              </div>
              <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{timeAgo(comment.created_at)}</span>
            </div>
          </div>
        </div>

        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif', lineHeight: '1.7' }}>
          {comment.content}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => onUpvote(comment.id)}
            className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg transition-all"
            style={{
              background: comment.user_upvoted ? 'var(--accent-glow)' : 'var(--bg)',
              color: comment.user_upvoted ? 'var(--accent)' : 'var(--muted)',
              border: '1px solid ' + (comment.user_upvoted ? 'var(--accent)' : 'var(--border)'),
            }}>
            <ThumbsUp size={11} /> {comment.upvotes}
          </button>

          {user && (
            <button onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
              className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg"
              style={{ background: 'var(--bg)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
              <Reply size={11} /> Reply{replies.length > 0 ? ' (' + replies.length + ')' : ''}
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            {isAdmin && (
              <button onClick={() => onPin(comment.id, comment.is_pinned)}
                className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg"
                style={{
                  background: comment.is_pinned ? 'rgba(245,197,66,0.12)' : 'var(--bg)',
                  color: '#f5c542', border: '1px solid rgba(245,197,66,0.3)',
                }}>
                <Pin size={11} /> {comment.is_pinned ? 'Unpin' : 'Pin'}
              </button>
            )}
            <button onClick={() => onFlag(comment.id)}
              className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg"
              style={{
                background: 'var(--bg)',
                color: comment.is_flagged ? '#ff6b6b' : 'var(--muted)',
                border: '1px solid ' + (comment.is_flagged ? 'rgba(255,107,107,0.3)' : 'var(--border)'),
              }}>
              <Flag size={11} /> {comment.is_flagged ? 'Flagged' : 'Flag'}
            </button>
          </div>
        </div>

        {replyTo === comment.id && user && (
          <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            <textarea value={replyContent} onChange={e => setReplyContent(e.target.value)}
              placeholder={'Reply to ' + comment.author_name + '...'}
              rows={2} className="w-full px-3 py-2.5 rounded-xl text-sm resize-none"
              style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none', fontFamily: 'Lora, serif' }} />
            <div className="flex gap-2 mt-2 justify-end">
              <button onClick={() => { setReplyTo(null); setReplyContent('') }}
                className="px-3 py-1.5 rounded-lg text-xs font-mono"
                style={{ background: 'var(--bg2)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
                Cancel
              </button>
              <button onClick={onSubmitReply} disabled={!replyContent.trim() || submitting}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono"
                style={{ background: 'var(--accent)', color: '#fff', opacity: replyContent.trim() && !submitting ? 1 : 0.5 }}>
                <Send size={11} /> Post reply
              </button>
            </div>
          </div>
        )}
      </div>

      {replies.length > 0 && (
        <>
          <button onClick={() => setShowReplies(!showReplies)}
            className="w-full flex items-center gap-2 px-5 py-2.5 text-xs font-mono"
            style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
            {showReplies ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
          </button>
          {showReplies && replies.map(reply => (
            <ReplyCard key={reply.id} reply={reply} onUpvote={onUpvote} onFlag={onFlag} />
          ))}
        </>
      )}
    </div>
  )
}

export function CommentSection() {
  const pathname = usePathname()
  const slug = pathname.replace(/\//g, '_').replace(/^_/, '') || 'home'

  const [comments,     setComments]     = useState<Comment[]>([])
  const [loading,      setLoading]      = useState(true)
  const [user,         setUser]         = useState<User | null>(null)
  const [content,      setContent]      = useState('')
  const [replyTo,      setReplyTo]      = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [submitting,   setSubmitting]   = useState(false)
  const [loginMode,    setLoginMode]    = useState<'guest' | null>(null)
  const [guestName,    setGuestName]    = useState('')
  const [guestEmail,   setGuestEmail]   = useState('')
  const voterId = typeof window !== 'undefined' ? getVoterId() : ''

  useEffect(() => {
    try {
      const saved = localStorage.getItem(USER_KEY)
      if (saved) setUser(JSON.parse(saved))
    } catch {}
    const params = new URLSearchParams(window.location.search)
    const ghUser = params.get('gh_user')
    if (ghUser) {
      try {
        const u = JSON.parse(decodeURIComponent(ghUser))
        setUser(u)
        localStorage.setItem(USER_KEY, JSON.stringify(u))
        window.history.replaceState({}, '', window.location.pathname)
      } catch {}
    }
  }, [])

  const fetchComments = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/comments?slug=' + slug + '&voter=' + voterId)
      const data = await res.json()
      setComments(data.comments || [])
    } finally {
      setLoading(false)
    }
  }, [slug, voterId])

  useEffect(() => { fetchComments() }, [fetchComments])

  async function submitComment(parentId?: string) {
    if (!user) return
    const text = parentId ? replyContent : content
    if (!text.trim()) return
    setSubmitting(true)
    try {
      await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_slug: slug, content: text.trim(),
          author_name: user.name, author_email: user.email,
          author_avatar: user.avatar, author_github: user.github,
          auth_provider: user.provider, parent_id: parentId || null,
        }),
      })
      if (parentId) { setReplyContent(''); setReplyTo(null) } else setContent('')
      await fetchComments()
    } finally {
      setSubmitting(false)
    }
  }

  async function upvote(id: string) {
    await fetch('/api/comments/' + id + '/upvote', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ voter_id: voterId }),
    })
    fetchComments()
  }

  async function pin(id: string, currentlyPinned: boolean) {
    await fetch('/api/comments/' + id + '/pin', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pinned: !currentlyPinned, admin_github: user?.github }),
    })
    fetchComments()
  }

  async function flag(id: string) {
    await fetch('/api/comments/' + id + '/flag', { method: 'POST' })
    fetchComments()
  }

  function loginAsGuest() {
    if (!guestName.trim()) return
    const u: User = { name: guestName.trim(), email: guestEmail.trim() || undefined, provider: 'guest' }
    setUser(u)
    localStorage.setItem(USER_KEY, JSON.stringify(u))
    setLoginMode(null)
  }

  const isAdmin    = user?.github === ADMIN_GITHUB
  const topLevel   = comments.filter(c => !c.parent_id)
  const pinned     = topLevel.filter(c => c.is_pinned)
  const regular    = topLevel.filter(c => !c.is_pinned)
  const allOrdered = [...pinned, ...regular]

  return (
    <section className="mt-16 pt-10" style={{ borderTop: '2px solid var(--border)' }}>
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare size={20} style={{ color: 'var(--accent)' }} />
        <h2 className="font-display font-bold text-2xl" style={{ color: 'var(--text)' }}>Discussion</h2>
        <span className="text-sm font-mono px-2.5 py-1 rounded-full"
          style={{ background: 'var(--bg2)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
          {comments.length}
        </span>
      </div>

      {!user ? (
        <div className="rounded-2xl p-6 mb-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p className="text-sm mb-5" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>
            Have a better approach? Found something outdated? Share it — your knowledge helps everyone learning here.
          </p>
          {loginMode === null && (
            <div className="flex flex-wrap gap-3">
              <a href={'/api/auth/github?return=' + encodeURIComponent(pathname)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-mono font-semibold"
                style={{ background: 'var(--text)', color: 'var(--bg)' }}>
                <Github size={15} /> Continue with GitHub
              </a>
              <button onClick={() => setLoginMode('guest')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-mono"
                style={{ background: 'var(--bg2)', color: 'var(--text2)', border: '1px solid var(--border)' }}>
                Comment as Guest
              </button>
            </div>
          )}
          {loginMode === 'guest' && (
            <div className="space-y-3">
              <div className="flex gap-3 flex-wrap">
                <input value={guestName} onChange={e => setGuestName(e.target.value)}
                  placeholder="Your name *" className="flex-1 min-w-0 px-3 py-2.5 rounded-xl text-sm"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }} />
                <input value={guestEmail} onChange={e => setGuestEmail(e.target.value)}
                  placeholder="Email (optional)" className="flex-1 min-w-0 px-3 py-2.5 rounded-xl text-sm"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }} />
              </div>
              <div className="flex gap-2">
                <button onClick={loginAsGuest} disabled={!guestName.trim()}
                  className="px-4 py-2 rounded-xl text-sm font-mono"
                  style={{ background: 'var(--accent)', color: '#fff', opacity: guestName.trim() ? 1 : 0.5 }}>
                  Continue
                </button>
                <button onClick={() => setLoginMode(null)}
                  className="px-4 py-2 rounded-xl text-sm font-mono"
                  style={{ background: 'var(--bg2)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-2xl p-5 mb-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <Avatar name={user.name} avatar={user.avatar} />
              <span className="text-sm font-mono font-semibold" style={{ color: 'var(--text)' }}>{user.name}</span>
              {user.provider === 'github' && (
                <span className="text-xs font-mono px-1.5 py-0.5 rounded flex items-center gap-1"
                  style={{ background: 'var(--bg2)', color: 'var(--muted)' }}>
                  <Github size={9} /> GitHub
                </span>
              )}
              {isAdmin && (
                <span className="text-xs font-mono px-1.5 py-0.5 rounded"
                  style={{ background: 'rgba(245,197,66,0.15)', color: '#f5c542' }}>
                  admin
                </span>
              )}
            </div>
            <button onClick={() => { setUser(null); localStorage.removeItem(USER_KEY) }}
              className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
              Sign out
            </button>
          </div>
          <textarea value={content} onChange={e => setContent(e.target.value)}
            placeholder="Share your approach, a correction, ask a question, or point out something outdated..."
            rows={3} className="w-full px-4 py-3 rounded-xl text-sm resize-none"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none', fontFamily: 'Lora, serif', lineHeight: '1.6' }} />
          <div className="flex justify-end mt-2">
            <button onClick={() => submitComment()} disabled={!content.trim() || submitting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono"
              style={{ background: 'var(--accent)', color: '#fff', opacity: content.trim() && !submitting ? 1 : 0.5 }}>
              <Send size={13} /> {submitting ? 'Posting...' : 'Post comment'}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-10 text-sm font-mono" style={{ color: 'var(--muted)' }}>Loading...</div>
      ) : allOrdered.length === 0 ? (
        <div className="text-center py-14 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p className="text-3xl mb-3">💬</p>
          <p className="font-display font-semibold mb-1" style={{ color: 'var(--text)' }}>No comments yet</p>
          <p className="text-sm font-mono" style={{ color: 'var(--muted)' }}>Be the first to share your thoughts or a better approach.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {allOrdered.map(comment => (
            <CommentCard key={comment.id}
              comment={comment}
              replies={comments.filter(c => c.parent_id === comment.id)}
              user={user} isAdmin={isAdmin}
              replyTo={replyTo} replyContent={replyContent}
              setReplyTo={setReplyTo} setReplyContent={setReplyContent}
              onUpvote={upvote} onPin={pin} onFlag={flag}
              onSubmitReply={() => submitComment(comment.id)}
              submitting={submitting} />
          ))}
        </div>
      )}
    </section>
  )
}