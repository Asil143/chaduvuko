'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Trophy, Flame, Zap, BookOpen, Target, Clock, ChevronRight, Star, Award } from 'lucide-react'

const KEY_COMPLETED  = 'vedalera_progress'
const KEY_XP         = 'vedalera_xp'
const KEY_STREAK     = 'vedalera_streak'
const KEY_LAST_VISIT = 'vedalera_last_visit'

const ALL_LESSONS = [
  { href: '/learn/what-is-data-engineering', title: 'What is Data Engineering?',  track: 'Foundations', xp: 100, color: '#00c2ff' },
  { href: '/learn/roadmap',                  title: 'Roadmap 2025',               track: 'Foundations', xp: 100, color: '#00c2ff' },
  { href: '/learn/foundations/sql',          title: 'SQL for Data Engineers',     track: 'Foundations', xp: 200, color: '#00c2ff' },
  { href: '/learn/foundations/python',       title: 'Python for Data Engineers',  track: 'Foundations', xp: 200, color: '#00c2ff' },
  { href: '/learn/azure/introduction',       title: 'Azure Introduction',         track: 'Azure',       xp: 150, color: '#0078d4' },
  { href: '/learn/azure/adls-gen2',          title: 'ADLS Gen2',                  track: 'Azure',       xp: 200, color: '#0078d4' },
  { href: '/learn/azure/adf',                title: 'Azure Data Factory',         track: 'Azure',       xp: 200, color: '#0078d4' },
  { href: '/learn/azure/databricks',         title: 'Azure Databricks',           track: 'Azure',       xp: 250, color: '#0078d4' },
  { href: '/learn/azure/synapse',            title: 'Azure Synapse',              track: 'Azure',       xp: 200, color: '#0078d4' },
  { href: '/learn/aws/introduction',         title: 'AWS Introduction',           track: 'AWS',         xp: 150, color: '#ff9900' },
  { href: '/learn/aws/s3',                   title: 'Amazon S3',                  track: 'AWS',         xp: 200, color: '#ff9900' },
  { href: '/learn/aws/glue',                 title: 'AWS Glue',                   track: 'AWS',         xp: 200, color: '#ff9900' },
  { href: '/learn/aws/redshift',             title: 'Amazon Redshift',            track: 'AWS',         xp: 200, color: '#ff9900' },
  { href: '/learn/aws/kinesis',              title: 'Amazon Kinesis',             track: 'AWS',         xp: 200, color: '#ff9900' },
  { href: '/learn/gcp/introduction',         title: 'GCP Introduction',           track: 'GCP',         xp: 150, color: '#4285f4' },
  { href: '/learn/gcp/bigquery',             title: 'BigQuery',                   track: 'GCP',         xp: 250, color: '#4285f4' },
  { href: '/learn/gcp/dataflow',             title: 'Dataflow',                   track: 'GCP',         xp: 200, color: '#4285f4' },
  { href: '/learn/gcp/pubsub',               title: 'Pub/Sub',                    track: 'GCP',         xp: 200, color: '#4285f4' },
  { href: '/learn/gcp/composer',             title: 'Cloud Composer',             track: 'GCP',         xp: 200, color: '#4285f4' },
  { href: '/learn/interview',                title: 'Interview Prep',             track: 'Career',      xp: 300, color: '#00e676' },
]

const TRACKS = ['Foundations', 'Azure', 'AWS', 'GCP', 'Career']
const TRACK_COLORS: Record<string, string> = {
  Foundations: '#00c2ff', Azure: '#0078d4', AWS: '#ff9900', GCP: '#4285f4', Career: '#00e676'
}

const BADGES = [
  { id: 'first_lesson', icon: '🌱', label: 'First Step',    desc: 'Complete your first lesson',          threshold: 1 },
  { id: 'five_lessons', icon: '🔥', label: 'On Fire',       desc: 'Complete 5 lessons',                  threshold: 5 },
  { id: 'ten_lessons',  icon: '⚡', label: 'Momentum',      desc: 'Complete 10 lessons',                 threshold: 10 },
  { id: 'azure_done',   icon: '☁️', label: 'Azure Ready',   desc: 'Complete all Azure lessons',          threshold: 0 },
  { id: 'aws_done',     icon: '🟧', label: 'AWS Ready',     desc: 'Complete all AWS lessons',            threshold: 0 },
  { id: 'xp_500',       icon: '💎', label: 'XP Hunter',     desc: 'Earn 500 XP',                         threshold: 0 },
  { id: 'xp_1000',      icon: '🏆', label: 'Power Learner', desc: 'Earn 1000 XP',                        threshold: 0 },
  { id: 'streak_7',     icon: '📅', label: 'Week Streak',   desc: '7 day learning streak',               threshold: 0 },
]

function getLevelInfo(xp: number) {
  const levels = [
    { name: 'Beginner',     min: 0,    max: 500,  color: '#6b7280' },
    { name: 'Learner',      min: 500,  max: 1200, color: '#00c2ff' },
    { name: 'Practitioner', min: 1200, max: 2500, color: '#0078d4' },
    { name: 'Engineer',     min: 2500, max: 4500, color: '#7b61ff' },
    { name: 'Expert',       min: 4500, max: 99999, color: '#f5c542' },
  ]
  const level = levels.find(l => xp >= l.min && xp < l.max) || levels[0]
  const next = levels[levels.indexOf(level) + 1]
  const progress = next ? ((xp - level.min) / (next.min - level.min)) * 100 : 100
  return { ...level, progress, nextXp: next?.min || level.max }
}

export default function DashboardPage() {
  const [completed, setCompleted] = useState<string[]>([])
  const [xp,        setXp]        = useState(0)
  const [streak,    setStreak]    = useState(0)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    try {
      setCompleted(JSON.parse(localStorage.getItem(KEY_COMPLETED) || '[]'))
      setXp(parseInt(localStorage.getItem(KEY_XP) || '0'))
      setStreak(parseInt(localStorage.getItem(KEY_STREAK) || '0'))
    } catch {}
  }, [])

  const level      = getLevelInfo(xp)
  const totalXp    = ALL_LESSONS.reduce((s, l) => s + l.xp, 0)
  const earnedPct  = Math.round((xp / totalXp) * 100)

  // Track progress
  const trackProgress = TRACKS.map(track => {
    const lessons = ALL_LESSONS.filter(l => l.track === track)
    const done    = lessons.filter(l => completed.includes(l.href)).length
    return { track, total: lessons.length, done, color: TRACK_COLORS[track] }
  })

  // Earned badges
  const earnedBadges = new Set<string>()
  if (completed.length >= 1)  earnedBadges.add('first_lesson')
  if (completed.length >= 5)  earnedBadges.add('five_lessons')
  if (completed.length >= 10) earnedBadges.add('ten_lessons')
  if (xp >= 500)  earnedBadges.add('xp_500')
  if (xp >= 1000) earnedBadges.add('xp_1000')
  if (streak >= 7) earnedBadges.add('streak_7')

  const azureLessons = ALL_LESSONS.filter(l => l.track === 'Azure')
  if (azureLessons.every(l => completed.includes(l.href))) earnedBadges.add('azure_done')
  const awsLessons = ALL_LESSONS.filter(l => l.track === 'AWS')
  if (awsLessons.every(l => completed.includes(l.href))) earnedBadges.add('aws_done')

  // Next recommended lesson
  const nextLesson = ALL_LESSONS.find(l => !completed.includes(l.href))

  const tabs = ['overview', 'lessons', 'badges']

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
            // Your Progress
          </div>
          <h1 className="font-display font-extrabold text-4xl mb-1" style={{ color: 'var(--text)' }}>
            Dashboard
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>
            Track your learning journey toward a data engineering role.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Zap size={18} />,     label: 'Total XP',      value: xp.toLocaleString(),                  color: '#f5c542' },
            { icon: <BookOpen size={18} />, label: 'Lessons Done',  value: completed.length + '/' + ALL_LESSONS.length, color: 'var(--accent)' },
            { icon: <Flame size={18} />,    label: 'Day Streak',    value: streak + ' days',                     color: '#ff6b6b' },
            { icon: <Trophy size={18} />,   label: 'Badges Earned', value: earnedBadges.size + '/' + BADGES.length, color: '#7b61ff' },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl p-5"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="mb-2" style={{ color: stat.color }}>{stat.icon}</div>
              <div className="font-display font-bold text-2xl mb-0.5" style={{ color: 'var(--text)' }}>
                {stat.value}
              </div>
              <div className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Level card */}
        <div className="rounded-2xl p-6 mb-8"
          style={{ background: 'var(--surface)', border: `1px solid ${level.color}30` }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Star size={16} style={{ color: level.color }} />
                <span className="font-display font-bold text-lg" style={{ color: level.color }}>
                  {level.name}
                </span>
              </div>
              <p className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
                {xp} XP · {level.nextXp - xp} XP to next level
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono" style={{ color: 'var(--muted)' }}>Overall progress</div>
              <div className="font-display font-bold text-xl" style={{ color: 'var(--text)' }}>{earnedPct}%</div>
            </div>
          </div>
          <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--bg3)' }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: level.progress + '%', background: level.color }} />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit"
          style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-lg text-sm font-mono capitalize transition-all"
              style={{
                background: activeTab === tab ? 'var(--surface)' : 'transparent',
                color: activeTab === tab ? 'var(--text)' : 'var(--muted)',
                border: activeTab === tab ? '1px solid var(--border)' : '1px solid transparent',
              }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Track progress */}
            <div className="rounded-2xl p-6"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h3 className="font-display font-semibold mb-5" style={{ color: 'var(--text)' }}>
                Track Progress
              </h3>
              <div className="space-y-4">
                {trackProgress.map(t => (
                  <div key={t.track}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-mono" style={{ color: 'var(--text2)' }}>{t.track}</span>
                      <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
                        {t.done}/{t.total} lessons
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg3)' }}>
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: (t.total > 0 ? (t.done / t.total) * 100 : 0) + '%', background: t.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next lesson */}
            {nextLesson && (
              <div className="rounded-2xl p-6"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <h3 className="font-display font-semibold mb-4 flex items-center gap-2"
                  style={{ color: 'var(--text)' }}>
                  <Target size={16} style={{ color: 'var(--accent)' }} /> Up next
                </h3>
                <Link href={nextLesson.href}
                  className="flex items-center gap-4 p-4 rounded-xl group transition-all"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = nextLesson.color)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: nextLesson.color + '15' }}>
                    <BookOpen size={18} style={{ color: nextLesson.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-sm" style={{ color: 'var(--text)' }}>
                      {nextLesson.title}
                    </div>
                    <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--muted)' }}>
                      {nextLesson.track} · +{nextLesson.xp} XP
                    </div>
                  </div>
                  <ChevronRight size={16} style={{ color: nextLesson.color, flexShrink: 0 }} />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Lessons tab */}
        {activeTab === 'lessons' && (
          <div className="space-y-2">
            {ALL_LESSONS.map(lesson => {
              const done = completed.includes(lesson.href)
              return (
                <Link key={lesson.href} href={lesson.href}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all group"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = lesson.color)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                    style={{
                      background: done ? lesson.color : 'var(--bg3)',
                      border: done ? 'none' : '1px solid var(--border)',
                      color: '#fff',
                    }}>
                    {done && '✓'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-display font-medium" style={{ color: done ? 'var(--muted)' : 'var(--text)', textDecoration: done ? 'line-through' : 'none' }}>
                      {lesson.title}
                    </div>
                    <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--muted)' }}>
                      {lesson.track}
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded flex-shrink-0"
                    style={{ background: lesson.color + '15', color: lesson.color }}>
                    +{lesson.xp} XP
                  </span>
                </Link>
              )
            })}
          </div>
        )}

        {/* Badges tab */}
        {activeTab === 'badges' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BADGES.map(badge => {
              const earned = earnedBadges.has(badge.id)
              return (
                <div key={badge.id}
                  className="rounded-2xl p-5 text-center transition-all"
                  style={{
                    background: earned ? 'var(--surface)' : 'var(--bg2)',
                    border: `1px solid ${earned ? 'var(--border)' : 'var(--border)'}`,
                    opacity: earned ? 1 : 0.5,
                    filter: earned ? 'none' : 'grayscale(1)',
                  }}>
                  <div className="text-4xl mb-3">{badge.icon}</div>
                  <div className="font-display font-semibold text-sm mb-1" style={{ color: 'var(--text)' }}>
                    {badge.label}
                  </div>
                  <div className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
                    {badge.desc}
                  </div>
                  {earned && (
                    <div className="mt-2 text-xs font-mono" style={{ color: 'var(--green)' }}>
                      ✓ Earned
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}