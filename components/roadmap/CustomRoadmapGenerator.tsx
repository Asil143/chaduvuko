'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { CurriculumGuide } from '@/components/roadmap/CurriculumGuide'
import { VideoResultCard, type YouTubeVideo } from '@/components/youtube/VideoResultCard'

const EXAMPLE_PROMPTS = [
  'I am new to SQL so I want to deep dive into SQL from scratch to advance',
  "What is an API and why do backend developers use it?",
  'Docker from absolute zero — I have never coded before',
  'What is Git and why does every developer use it?',
]

type Profile = {
  currentLevel: string
  previousKnowledge: string
  careerGoal: string
  targetRole: string
  dailyStudyTime: string
  learningStyle: string
  targetTimeline: string
  difficulty: string
  language: string
}

const EMPTY_PROFILE: Profile = {
  currentLevel: '',
  previousKnowledge: '',
  careerGoal: '',
  targetRole: '',
  dailyStudyTime: '',
  learningStyle: '',
  targetTimeline: '',
  difficulty: '',
  language: '',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  padding: '9px 10px',
  color: 'var(--text)',
  fontSize: 13,
  outline: 'none',
  fontFamily: 'inherit',
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 11, color: 'var(--muted)', marginBottom: 5 }}>{label}</label>
      {children}
    </div>
  )
}

export default function CustomRoadmapGenerator() {
  const [topic, setTopic] = useState('')
  const [guideLoading, setGuideLoading] = useState(false)
  const [guideReply, setGuideReply] = useState('')
  const [guideError, setGuideError] = useState('')

  const [videoLoading, setVideoLoading] = useState(false)
  const [videoResult, setVideoResult] = useState<YouTubeVideo | null>(null)
  const [videoDebug, setVideoDebug] = useState('')

  const [showPersonalize, setShowPersonalize] = useState(false)
  const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE)

  const updateProfile = (key: keyof Profile, value: string) => setProfile(prev => ({ ...prev, [key]: value }))

  const handleGenerate = useCallback(async () => {
    if (!topic.trim() || guideLoading) return
    setGuideLoading(true)
    setGuideError('')
    setGuideReply('')
    setVideoLoading(true)
    setVideoResult(null)
    setVideoDebug('')

    const guidePromise = fetch('/api/custom-roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, profile }),
    })
      .then(res => res.json())
      .then(data => setGuideReply(data.reply || 'No response returned.'))
      .catch((err: unknown) => setGuideError(err instanceof Error ? err.message : 'Could not reach the guide builder.'))
      .finally(() => setGuideLoading(false))

    const videoPromise = fetch('/api/youtube-best-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic }),
    })
      .then(res => res.json())
      .then(data => {
        setVideoResult(data.video || null)
        if (data.debug) setVideoDebug(data.debug)
      })
      .catch(() => setVideoDebug('DEBUG: could not reach the video finder.'))
      .finally(() => setVideoLoading(false))

    await Promise.allSettled([guidePromise, videoPromise])
  }, [topic, guideLoading, profile])

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
        onClick={() => setShowPersonalize(v => !v)}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--green)',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
          padding: 0,
          marginBottom: 14,
        }}
      >
        {showPersonalize ? '− Hide personalization' : '+ Personalize your roadmap (optional)'}
      </button>

      {showPersonalize && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 12,
            marginBottom: 18,
            padding: 16,
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 10,
          }}
        >
          <Field label="Current level">
            <select style={inputStyle} value={profile.currentLevel} onChange={e => updateProfile('currentLevel', e.target.value)}>
              <option value="">Not specified</option>
              <option value="Complete beginner">Complete beginner</option>
              <option value="Some exposure">Some exposure</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </Field>
          <Field label="Previous knowledge">
            <input style={inputStyle} value={profile.previousKnowledge} onChange={e => updateProfile('previousKnowledge', e.target.value)} placeholder="e.g. know Excel, no coding" />
          </Field>
          <Field label="Career goal">
            <input style={inputStyle} value={profile.careerGoal} onChange={e => updateProfile('careerGoal', e.target.value)} placeholder="e.g. switch into tech" />
          </Field>
          <Field label="Target role">
            <input style={inputStyle} value={profile.targetRole} onChange={e => updateProfile('targetRole', e.target.value)} placeholder="e.g. Data Analyst" />
          </Field>
          <Field label="Daily study time">
            <select style={inputStyle} value={profile.dailyStudyTime} onChange={e => updateProfile('dailyStudyTime', e.target.value)}>
              <option value="">Not specified</option>
              <option value="30 min/day">30 min/day</option>
              <option value="1 hr/day">1 hr/day</option>
              <option value="2 hr/day">2 hr/day</option>
              <option value="3+ hr/day">3+ hr/day</option>
            </select>
          </Field>
          <Field label="Learning style">
            <select style={inputStyle} value={profile.learningStyle} onChange={e => updateProfile('learningStyle', e.target.value)}>
              <option value="">Not specified</option>
              <option value="Hands-on projects">Hands-on projects</option>
              <option value="Reading/docs">Reading/docs</option>
              <option value="Video tutorials">Video tutorials</option>
              <option value="Mixed">Mixed</option>
            </select>
          </Field>
          <Field label="Target timeline">
            <select style={inputStyle} value={profile.targetTimeline} onChange={e => updateProfile('targetTimeline', e.target.value)}>
              <option value="">Not specified</option>
              <option value="1 month">1 month</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
              <option value="1 year">1 year</option>
              <option value="No specific deadline">No specific deadline</option>
            </select>
          </Field>
          <Field label="Preferred difficulty">
            <select style={inputStyle} value={profile.difficulty} onChange={e => updateProfile('difficulty', e.target.value)}>
              <option value="">Not specified</option>
              <option value="Relaxed pace">Relaxed pace</option>
              <option value="Balanced">Balanced</option>
              <option value="Intensive">Intensive</option>
            </select>
          </Field>
          <Field label="Preferred language">
            <input style={inputStyle} value={profile.language} onChange={e => updateProfile('language', e.target.value)} placeholder="English" />
          </Field>
        </div>
      )}

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
          This can take up to a minute — we're building a full, structured curriculum, not a quick summary.
        </p>
      )}

      <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10 }}>
        Just want a video, not a full guide? <Link href="/learn/find-video" style={{ color: 'var(--green)' }}>Find a video →</Link>
      </p>

      {guideError && (
        <p style={{ fontSize: 13, color: '#ff4757', marginTop: 16 }}>{guideError}</p>
      )}

      {(videoLoading || videoResult || (videoDebug && process.env.NODE_ENV === 'development')) && (
        <div style={{ marginTop: 24 }}>
          <VideoResultCard video={videoResult} loading={videoLoading} debug={videoDebug} />
        </div>
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
            <CurriculumGuide markdown={guideReply} />
          </div>
        )
      )}
    </div>
  )
}
