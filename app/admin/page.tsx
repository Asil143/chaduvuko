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

interface CareerApplication {
  id: string
  job_title: string
  full_name: string
  email: string
  phone: string
  location: string
  highest_qualification: string
  field_of_study: string
  institution: string
  graduation_year: number
  years_experience: number
  current_position: string | null
  work_history: {
    employer: string
    title: string
    startDate: string
    endDate: string
    details: string
  }[]
  certifications: string | null
  engagement_preference: string
  availability: string | null
  compensation_expectation: string | null
  skills: string
  project_details: string
  teaching_approach: string
  project_links: string | null
  github_url: string | null
  linkedin_url: string | null
  portfolio_url: string | null
  teaching_sample_url: string | null
  motivation: string
  resume_url: string | null
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
  const [applications, setApplications] = useState<CareerApplication[]>([])
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [tab,      setTab]      = useState<'flagged' | 'all' | 'applications'>('flagged')

  async function login() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin', { headers: { 'x-admin-key': key } })
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
    const res = await fetch('/api/admin', { headers: { 'x-admin-key': key } })
    const data = await res.json()
    setComments(data.comments || [])
    setTab('flagged')
    setLoading(false)
  }

  async function loadApplications() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/careers/applications', { headers: { 'x-admin-key': key } })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not load applications.')
      setApplications(data.applications || [])
      setTab('applications')
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Could not load applications.')
    } finally {
      setLoading(false)
    }
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
                {tab === 'applications'
                  ? `${applications.length} application${applications.length !== 1 ? 's' : ''}`
                  : `${comments.length} comment${comments.length !== 1 ? 's' : ''} shown`}
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
            <button onClick={loadApplications}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono"
              style={{
                background: tab === 'applications' ? 'var(--accent)' : 'var(--surface)',
                color: tab === 'applications' ? '#fff' : 'var(--muted)',
                border: '1px solid var(--border)',
              }}>
              Applications
            </button>
          </div>
        </div>

        {error && <p className="mb-4 text-sm" role="alert" style={{ color: '#ff6b6b' }}>{error}</p>}

        {loading ? (
          <div className="text-center py-20 text-sm font-mono" style={{ color: 'var(--muted)' }}>
            Loading...
          </div>
        ) : tab === 'applications' ? applications.length === 0 ? (
          <div className="text-center py-20 rounded-2xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <p className="font-display font-semibold" style={{ color: 'var(--text)' }}>No applications yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map(application => (
              <article key={application.id} className="rounded-2xl p-5 md:p-6"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                  <div>
                    <h2 className="font-display font-bold text-lg" style={{ color: 'var(--text)' }}>
                      {application.full_name}
                    </h2>
                    <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{application.job_title}</p>
                  </div>
                  <time className="text-xs" style={{ color: 'var(--muted)' }}
                    dateTime={application.created_at}>{new Date(application.created_at).toLocaleString()}</time>
                </div>
                <dl className="grid gap-4 sm:grid-cols-2 text-sm">
                  <div><dt className="font-semibold" style={{ color: 'var(--muted)' }}>Contact</dt>
                    <dd><a href={`mailto:${application.email}`} className="underline">{application.email}</a> · {application.phone}</dd>
                  </div>
                  <div><dt className="font-semibold" style={{ color: 'var(--muted)' }}>Location</dt>
                    <dd>{application.location}</dd>
                  </div>
                  <div><dt className="font-semibold" style={{ color: 'var(--muted)' }}>Education</dt>
                    <dd>{application.highest_qualification} in {application.field_of_study}, {application.institution} ({application.graduation_year})</dd>
                  </div>
                  <div><dt className="font-semibold" style={{ color: 'var(--muted)' }}>Experience / preference</dt>
                    <dd>{application.years_experience} years{application.current_position ? ` · ${application.current_position}` : ''} · {application.engagement_preference}</dd>
                  </div>
                  <div><dt className="font-semibold" style={{ color: 'var(--muted)' }}>Availability / compensation</dt>
                    <dd>{application.availability || 'Not provided'} · {application.compensation_expectation || 'Not provided'}</dd>
                  </div>
                  <div><dt className="font-semibold" style={{ color: 'var(--muted)' }}>Links / resume</dt>
                    <dd className="flex flex-wrap gap-x-3">
                      {application.github_url && <a href={application.github_url} target="_blank" rel="noreferrer" className="underline">GitHub</a>}
                      {application.linkedin_url && <a href={application.linkedin_url} target="_blank" rel="noreferrer" className="underline">LinkedIn</a>}
                      {application.portfolio_url && <a href={application.portfolio_url} target="_blank" rel="noreferrer" className="underline">Portfolio</a>}
                      {application.teaching_sample_url && <a href={application.teaching_sample_url} target="_blank" rel="noreferrer" className="underline">Teaching sample</a>}
                      {application.resume_url && <a href={application.resume_url} target="_blank" rel="noreferrer" className="underline">Download resume</a>}
                      {application.project_links && <span className="basis-full whitespace-pre-wrap">{application.project_links}</span>}
                      {!application.github_url && !application.linkedin_url && !application.portfolio_url &&
                        !application.teaching_sample_url && !application.resume_url && !application.project_links && 'None provided'}
                    </dd>
                  </div>
                  <div className="sm:col-span-2"><dt className="font-semibold" style={{ color: 'var(--muted)' }}>Technical skills</dt>
                    <dd className="whitespace-pre-wrap">{application.skills}</dd>
                  </div>
                  <div className="sm:col-span-2"><dt className="font-semibold" style={{ color: 'var(--muted)' }}>Projects and contribution</dt>
                    <dd className="whitespace-pre-wrap">{application.project_details}</dd>
                  </div>
                  {application.work_history.length > 0 && (
                    <div className="sm:col-span-2"><dt className="font-semibold" style={{ color: 'var(--muted)' }}>Relevant work history</dt>
                      <dd className="mt-2 space-y-3">
                        {application.work_history.map((position, index) => (
                          <div key={`${position.employer}-${index}`}>
                            <strong>{position.title} · {position.employer}</strong>
                            <div>{position.startDate || 'Start not provided'} – {position.endDate || 'Present'}</div>
                            {position.details && <p className="whitespace-pre-wrap">{position.details}</p>}
                          </div>
                        ))}
                      </dd>
                    </div>
                  )}
                  {application.certifications && (
                    <div className="sm:col-span-2"><dt className="font-semibold" style={{ color: 'var(--muted)' }}>Certifications and training</dt>
                      <dd className="whitespace-pre-wrap">{application.certifications}</dd>
                    </div>
                  )}
                  <div className="sm:col-span-2"><dt className="font-semibold" style={{ color: 'var(--muted)' }}>Teaching approach</dt>
                    <dd className="whitespace-pre-wrap">{application.teaching_approach}</dd>
                  </div>
                  <div className="sm:col-span-2"><dt className="font-semibold" style={{ color: 'var(--muted)' }}>Why this role</dt>
                    <dd className="whitespace-pre-wrap">{application.motivation}</dd>
                  </div>
                </dl>
              </article>
            ))}
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