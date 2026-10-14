'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'
import { CurriculumGuide } from '@/components/roadmap/CurriculumGuide'
import { VideoResultCard, type YouTubeVideo } from '@/components/youtube/VideoResultCard'

const EXAMPLE_PROMPTS = [
  { label: 'SQL, from basics to advanced', prompt: 'I am new to SQL and want to learn from the basics through advanced queries.' },
  { label: 'Build backend APIs', prompt: 'I want to understand APIs and learn to build production-ready backend services.' },
  { label: 'Docker from scratch', prompt: 'I am new to Docker and want to learn containers from the beginning through practical projects.' },
  { label: 'Learn Git & GitHub', prompt: 'I want to learn Git and GitHub from the basics and use them in real software projects.' },
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

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="custom-builder-field">
      <span className="custom-builder-field-label">{label}</span>
      {children}
    </label>
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
    <div className="custom-roadmap-builder">
      <div className="custom-builder-header">
        <span className="custom-builder-icon"><Sparkles size={20} aria-hidden="true" /></span>
        <div>
          <p className="custom-builder-eyebrow">PERSONALIZED GUIDE</p>
          <h3>Start with what you want to learn</h3>
          <p>Tell us your goal and starting point. We’ll shape a practical, step-by-step guide around you.</p>
        </div>
      </div>

      <div className="custom-builder-examples" aria-label="Example learning goals">
        {EXAMPLE_PROMPTS.map(p => (
          <button
            key={p.label}
            type="button"
            aria-pressed={topic === p.prompt}
            className={topic === p.prompt ? 'is-selected' : ''}
            onClick={() => setTopic(p.prompt)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="custom-builder-goal">
        <label htmlFor="custom-roadmap-goal">Your learning goal</label>
        <textarea
          id="custom-roadmap-goal"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          placeholder="e.g. I’m new to data analysis and want to learn Python, SQL, and build a portfolio project."
          rows={3}
        />
        <span className="custom-builder-hint">Be as specific as you like. You can add your experience and timeline below.</span>
      </div>

      <button
        type="button"
        onClick={() => setShowPersonalize(v => !v)}
        className="custom-builder-personalize"
        aria-expanded={showPersonalize}
        aria-controls="custom-roadmap-preferences"
      >
        <span>{showPersonalize ? 'Hide preferences' : 'Add learning preferences'}</span>
        <span className="custom-builder-optional">Optional</span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>

      {showPersonalize && (
        <div
          id="custom-roadmap-preferences"
          className="custom-builder-preferences"
        >
          <Field label="Current level">
            <select className="custom-builder-input" value={profile.currentLevel} onChange={e => updateProfile('currentLevel', e.target.value)}>
              <option value="">Not specified</option>
              <option value="Complete beginner">Complete beginner</option>
              <option value="Some exposure">Some exposure</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </Field>
          <Field label="Previous knowledge">
            <input className="custom-builder-input" value={profile.previousKnowledge} onChange={e => updateProfile('previousKnowledge', e.target.value)} placeholder="e.g. know Excel, no coding" />
          </Field>
          <Field label="Career goal">
            <input className="custom-builder-input" value={profile.careerGoal} onChange={e => updateProfile('careerGoal', e.target.value)} placeholder="e.g. switch into tech" />
          </Field>
          <Field label="Target role">
            <input className="custom-builder-input" value={profile.targetRole} onChange={e => updateProfile('targetRole', e.target.value)} placeholder="e.g. Data Analyst" />
          </Field>
          <Field label="Daily study time">
            <select className="custom-builder-input" value={profile.dailyStudyTime} onChange={e => updateProfile('dailyStudyTime', e.target.value)}>
              <option value="">Not specified</option>
              <option value="30 min/day">30 min/day</option>
              <option value="1 hr/day">1 hr/day</option>
              <option value="2 hr/day">2 hr/day</option>
              <option value="3+ hr/day">3+ hr/day</option>
            </select>
          </Field>
          <Field label="Learning style">
            <select className="custom-builder-input" value={profile.learningStyle} onChange={e => updateProfile('learningStyle', e.target.value)}>
              <option value="">Not specified</option>
              <option value="Hands-on projects">Hands-on projects</option>
              <option value="Reading/docs">Reading/docs</option>
              <option value="Video tutorials">Video tutorials</option>
              <option value="Mixed">Mixed</option>
            </select>
          </Field>
          <Field label="Target timeline">
            <select className="custom-builder-input" value={profile.targetTimeline} onChange={e => updateProfile('targetTimeline', e.target.value)}>
              <option value="">Not specified</option>
              <option value="1 month">1 month</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
              <option value="1 year">1 year</option>
              <option value="No specific deadline">No specific deadline</option>
            </select>
          </Field>
          <Field label="Preferred difficulty">
            <select className="custom-builder-input" value={profile.difficulty} onChange={e => updateProfile('difficulty', e.target.value)}>
              <option value="">Not specified</option>
              <option value="Relaxed pace">Relaxed pace</option>
              <option value="Balanced">Balanced</option>
              <option value="Intensive">Intensive</option>
            </select>
          </Field>
          <Field label="Preferred language">
            <input className="custom-builder-input" value={profile.language} onChange={e => updateProfile('language', e.target.value)} placeholder="English" />
          </Field>
        </div>
      )}

      <button
        type="button"
        onClick={handleGenerate}
        disabled={!topic.trim() || guideLoading}
        className="custom-builder-submit"
      >
        {guideLoading ? 'Building your guide…' : 'Build my learning guide'}
        {!guideLoading && <ArrowRight size={16} aria-hidden="true" />}
      </button>

      {guideLoading && (
        <p className="custom-builder-loading-note">This can take up to a minute while we build your structured guide.</p>
      )}

      <p className="custom-builder-video-link">
        Looking for one lesson instead? <Link href="/learn/find-video">Find a video <ArrowRight size={13} aria-hidden="true" /></Link>
      </p>

      {guideError && (
        <p className="custom-builder-error">
          {process.env.NODE_ENV === 'development' ? guideError : "Something went wrong building your guide — please try again."}
        </p>
      )}

      {(videoLoading || videoResult || (videoDebug && process.env.NODE_ENV === 'development')) && (
        <div style={{ marginTop: 24 }}>
          <VideoResultCard video={videoResult} loading={videoLoading} debug={videoDebug} />
        </div>
      )}

      {guideReply && (
        guideReply.startsWith('DEBUG') ? (
          process.env.NODE_ENV === 'development' ? (
            <p className="custom-builder-error">{guideReply}</p>
          ) : (
            <p className="custom-builder-error">
              Something went wrong building your guide — please try again in a moment.
            </p>
          )
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
