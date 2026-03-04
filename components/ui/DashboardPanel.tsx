'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { X, Zap, Flame, BookOpen, Trophy, ChevronRight, LayoutDashboard } from 'lucide-react'

const KEY_COMPLETED  = 'vedalera_progress'
const KEY_XP         = 'vedalera_xp'
const KEY_STREAK     = 'vedalera_streak'

const ALL_LESSONS = [
  { href: '/learn/what-is-data-engineering', title: 'What is Data Engineering?',  track: 'Foundations', color: '#00c2ff' },
  { href: '/learn/roadmap',                  title: 'Roadmap 2025',               track: 'Foundations', color: '#00c2ff' },
  { href: '/learn/foundations/sql',          title: 'SQL for Data Engineers',     track: 'Foundations', color: '#00c2ff' },
  { href: '/learn/foundations/python',       title: 'Python for Data Engineers',  track: 'Foundations', color: '#00c2ff' },
  { href: '/learn/azure/introduction',       title: 'Azure Introduction',         track: 'Azure',       color: '#0078d4' },
  { href: '/learn/azure/adls-gen2',          title: 'ADLS Gen2',                  track: 'Azure',       color: '#0078d4' },
  { href: '/learn/azure/adf',                title: 'Azure Data Factory',         track: 'Azure',       color: '#0078d4' },
  { href: '/learn/azure/databricks',         title: 'Azure Databricks',           track: 'Azure',       color: '#0078d4' },
  { href: '/learn/azure/synapse',            title: 'Azure Synapse',              track: 'Azure',       color: '#0078d4' },
  { href: '/learn/aws/introduction',         title: 'AWS Introduction',           track: 'AWS',         color: '#ff9900' },
  { href: '/learn/aws/s3',                   title: 'Amazon S3',                  track: 'AWS',         color: '#ff9900' },
  { href: '/learn/aws/glue',                 title: 'AWS Glue',                   track: 'AWS',         color: '#ff9900' },
  { href: '/learn/aws/redshift',             title: 'Amazon Redshift',            track: 'AWS',         color: '#ff9900' },
  { href: '/learn/aws/kinesis',              title: 'Amazon Kinesis',             track: 'AWS',         color: '#ff9900' },
  { href: '/learn/gcp/introduction',         title: 'GCP Introduction',           track: 'GCP',         color: '#4285f4' },
  { href: '/learn/gcp/bigquery',             title: 'BigQuery',                   track: 'GCP',         color: '#4285f4' },
  { href: '/learn/gcp/dataflow',             title: 'Dataflow',                   track: 'GCP',         color: '#4285f4' },
  { href: '/learn/gcp/pubsub',               title: 'Pub/Sub',                    track: 'GCP',         color: '#4285f4' },
  { href: '/learn/gcp/composer',             title: 'Cloud Composer',             track: 'GCP',         color: '#4285f4' },
  { href: '/learn/interview',                title: 'Interview Prep',             track: 'Career',      color: '#00e676' },
]

const TRACKS = [
  { name: 'Foundations', color: '#00c2ff' },
  { name: 'Azure',       color: '#0078d4' },
  { name: 'AWS',         color: '#ff9900' },
  { name: 'GCP',         color: '#4285f4' },
  { name: 'Career',      color: '#00e676' },
]

function getLevelName(xp: number) {
  if (xp < 500)  return 'Beginner'
  if (xp < 1200) return 'Learner'
  if (xp < 2500) return 'Practitioner'
  if (xp < 4500) return 'Engineer'
  return 'Expert'
}

function getLevelProgress(xp: number) {
  const steps = [0, 500, 1200, 2500, 4500, 9999]
  const idx = steps.findIndex((s, i) => xp >= s && xp < (steps[i + 1] ?? Infinity))
  const lo = steps[idx] ?? 0
  const hi = steps[idx + 1] ?? 9999
  return Math.round(((xp - lo) / (hi - lo)) * 100)
}

export function DashboardPanel() {
  const [open,      setOpen]      = useState(false)
  const [completed, setCompleted] = useState<string[]>([])
  const [xp,        setXp]        = useState(0)
  const [streak,    setStreak]    = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      setCompleted(JSON.parse(localStorage.getItem(KEY_COMPLETED) || '[]'))
      setXp(parseInt(localStorage.getItem(KEY_XP) || '0'))
      setStreak(parseInt(localStorage.getItem(KEY_STREAK) || '0'))
    } catch {}
  }, [open])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handle(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [open])

  // Close on Escape
  useEffect(() => {
    function handle(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [])

  const nextLesson   = ALL_LESSONS.find(l => !completed.includes(l.href))
  const levelName    = getLevelName(xp)
  const levelPct     = getLevelProgress(xp)
  const totalLessons = ALL_LESSONS.length

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
        style={{
          background: 'var(--bg2)',
          border: '1px solid var(--border)',
          color: 'var(--text2)',
        }}
        title="Your progress">
        <LayoutDashboard size={13} style={{ color: 'var(--accent)' }} />
        <span className="hidden sm:inline">Progress</span>
        {completed.length > 0 && (
          <span className="flex items-center gap-0.5" style={{ color: 'var(--accent)' }}>
            <Zap size={10} />{xp}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[90]"
          style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }}
        />
      )}

      {/* Slide-out panel */}
      <div
        ref={panelRef}
        className="fixed top-0 right-0 h-full z-[100] overflow-y-auto"
        style={{
          width: 'min(380px, 100vw)',
          background: 'var(--bg)',
          borderLeft: '1px solid var(--border)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: open ? '-20px 0 60px rgba(0,0,0,0.3)' : 'none',
        }}>

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4"
          style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2">
            <LayoutDashboard size={16} style={{ color: 'var(--accent)' }} />
            <span className="font-display font-bold text-sm" style={{ color: 'var(--text)' }}>
              Your Progress
            </span>
          </div>
          <button onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: 'var(--muted)', background: 'var(--bg2)' }}>
            <X size={14} />
          </button>
        </div>

        <div className="p-5 space-y-5">

          {/* XP + Level */}
          <div className="rounded-xl p-4"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest mb-0.5"
                  style={{ color: 'var(--muted)' }}>Level</div>
                <div className="font-display font-bold text-lg" style={{ color: 'var(--accent)' }}>
                  {levelName}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono uppercase tracking-widest mb-0.5"
                  style={{ color: 'var(--muted)' }}>Total XP</div>
                <div className="font-display font-bold text-lg flex items-center gap-1"
                  style={{ color: '#f5c542' }}>
                  <Zap size={14} /> {xp.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg3)' }}>
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: levelPct + '%', background: 'var(--accent)' }} />
            </div>
            <div className="text-xs font-mono mt-1.5 text-right" style={{ color: 'var(--muted)' }}>
              {levelPct}% to next level
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: <BookOpen size={14} />, val: completed.length + '/' + totalLessons, label: 'Lessons', color: 'var(--accent)' },
              { icon: <Flame size={14} />,    val: streak + 'd',                         label: 'Streak',  color: '#ff6b6b'       },
              { icon: <Trophy size={14} />,   val: Math.round((completed.length / totalLessons) * 100) + '%', label: 'Done', color: '#7b61ff' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3 text-center"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="flex justify-center mb-1" style={{ color: s.color }}>{s.icon}</div>
                <div className="font-display font-bold text-base" style={{ color: 'var(--text)' }}>{s.val}</div>
                <div className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Track progress bars */}
          <div className="rounded-xl p-4 space-y-3"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="text-xs font-mono uppercase tracking-widest mb-3"
              style={{ color: 'var(--muted)' }}>Tracks</div>
            {TRACKS.map(track => {
              const lessons = ALL_LESSONS.filter(l => l.track === track.name)
              const done    = lessons.filter(l => completed.includes(l.href)).length
              const pct     = lessons.length > 0 ? Math.round((done / lessons.length) * 100) : 0
              return (
                <div key={track.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono" style={{ color: 'var(--text2)' }}>{track.name}</span>
                    <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{done}/{lessons.length}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg3)' }}>
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{ width: pct + '%', background: track.color }} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Next lesson */}
          {nextLesson && (
            <div>
              <div className="text-xs font-mono uppercase tracking-widest mb-2"
                style={{ color: 'var(--muted)' }}>Up next</div>
              <Link href={nextLesson.href} onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl group transition-all"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = nextLesson.color)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: nextLesson.color + '15' }}>
                  <BookOpen size={14} style={{ color: nextLesson.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-display font-semibold truncate" style={{ color: 'var(--text)' }}>
                    {nextLesson.title}
                  </div>
                  <div className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
                    {nextLesson.track}
                  </div>
                </div>
                <ChevronRight size={14} style={{ color: nextLesson.color, flexShrink: 0 }} />
              </Link>
            </div>
          )}

          {/* Full dashboard link */}
          <Link href="/dashboard" onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-mono font-semibold transition-all"
            style={{ background: 'var(--accent)', color: '#fff' }}>
            <LayoutDashboard size={14} /> View Full Dashboard
          </Link>

        </div>
      </div>
    </>
  )
}