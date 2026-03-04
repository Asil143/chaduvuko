'use client'
import { useState, useEffect } from 'react'
import { CheckCircle, Circle, Trophy, ChevronDown, ChevronUp, Zap, Flame, Star, Target, Award } from 'lucide-react'
import Link from 'next/link'

const LESSONS = [
  { id: 'what-is-de',   title: 'What is Data Engineering?',  section: 'Foundations', href: '/learn/what-is-data-engineering', color: '#00c2ff', xp: 100 },
  { id: 'roadmap',      title: 'Roadmap 2025',                section: 'Foundations', href: '/learn/roadmap',                  color: '#00c2ff', xp: 100 },
  { id: 'sql',          title: 'SQL for Data Engineers',      section: 'Foundations', href: '/learn/foundations/sql',          color: '#00c2ff', xp: 150 },
  { id: 'python',       title: 'Python for Data Engineers',   section: 'Foundations', href: '/learn/foundations/python',       color: '#00c2ff', xp: 150 },
  { id: 'azure-intro',  title: 'Azure Introduction',          section: 'Azure',       href: '/learn/azure/introduction',       color: '#0078d4', xp: 100 },
  { id: 'adls',         title: 'ADLS Gen2',                   section: 'Azure',       href: '/learn/azure/adls-gen2',          color: '#0078d4', xp: 150 },
  { id: 'adf',          title: 'Azure Data Factory',          section: 'Azure',       href: '/learn/azure/adf',                color: '#0078d4', xp: 150 },
  { id: 'databricks',   title: 'Azure Databricks',            section: 'Azure',       href: '/learn/azure/databricks',         color: '#0078d4', xp: 200 },
  { id: 'synapse',      title: 'Azure Synapse',               section: 'Azure',       href: '/learn/azure/synapse',            color: '#0078d4', xp: 200 },
  { id: 'aws-intro',    title: 'AWS Introduction',            section: 'AWS',         href: '/learn/aws/introduction',         color: '#ff9900', xp: 100 },
  { id: 'aws-s3',       title: 'Amazon S3',                   section: 'AWS',         href: '/learn/aws/s3',                   color: '#ff9900', xp: 150 },
  { id: 'aws-glue',     title: 'AWS Glue',                    section: 'AWS',         href: '/learn/aws/glue',                 color: '#ff9900', xp: 150 },
  { id: 'aws-redshift', title: 'Amazon Redshift',             section: 'AWS',         href: '/learn/aws/redshift',             color: '#ff9900', xp: 200 },
  { id: 'aws-kinesis',  title: 'Amazon Kinesis',              section: 'AWS',         href: '/learn/aws/kinesis',              color: '#ff9900', xp: 200 },
  { id: 'gcp-intro',    title: 'GCP Introduction',            section: 'GCP',         href: '/learn/gcp/introduction',         color: '#4285f4', xp: 100 },
  { id: 'bigquery',     title: 'Google BigQuery',             section: 'GCP',         href: '/learn/gcp/bigquery',             color: '#4285f4', xp: 150 },
  { id: 'dataflow',     title: 'Cloud Dataflow',              section: 'GCP',         href: '/learn/gcp/dataflow',             color: '#4285f4', xp: 200 },
  { id: 'pubsub',       title: 'Cloud Pub/Sub',               section: 'GCP',         href: '/learn/gcp/pubsub',               color: '#4285f4', xp: 150 },
  { id: 'composer',     title: 'Cloud Composer',              section: 'GCP',         href: '/learn/gcp/composer',             color: '#4285f4', xp: 200 },
  { id: 'project-1',    title: 'Project 1: Azure Pipeline',   section: 'Projects',    href: '/learn/projects/azure-batch-pipeline', color: '#00e676', xp: 500 },
  { id: 'interview',    title: 'Interview Prep',              section: 'Interview',   href: '/learn/interview',                color: '#ff6b6b', xp: 200 },
]

const LEVELS = [
  { min: 0,    max: 499,  label: 'Beginner',      icon: '🌱', color: '#00c2ff' },
  { min: 500,  max: 999,  label: 'Explorer',      icon: '🔭', color: '#00e676' },
  { min: 1000, max: 1999, label: 'Engineer',      icon: '⚙️', color: '#0078d4' },
  { min: 2000, max: 2999, label: 'Senior Engineer',icon: '🚀', color: '#7b61ff' },
  { min: 3000, max: 9999, label: 'Staff Engineer', icon: '🏆', color: '#f5c542' },
]

const BADGES = [
  { id: 'first_lesson',   label: 'First Step',      icon: '👣', desc: 'Complete your first lesson',           check: (c: Set<string>) => c.size >= 1 },
  { id: 'foundations',    label: 'Solid Foundation', icon: '🧱', desc: 'Complete all Foundations lessons',     check: (c: Set<string>) => ['what-is-de','roadmap','sql','python'].every(id => c.has(id)) },
  { id: 'azure_complete', label: 'Azure Ready',      icon: '☁️', desc: 'Complete all Azure Track lessons',     check: (c: Set<string>) => ['azure-intro','adls','adf','databricks','synapse'].every(id => c.has(id)) },
  { id: 'aws_complete',   label: 'AWS Ready',        icon: '🟠', desc: 'Complete all AWS Track lessons',       check: (c: Set<string>) => ['aws-intro','aws-s3','aws-glue','aws-redshift','aws-kinesis'].every(id => c.has(id)) },
  { id: 'gcp_complete',   label: 'GCP Ready',        icon: '🔵', desc: 'Complete all GCP Track lessons',       check: (c: Set<string>) => ['gcp-intro','bigquery','dataflow','pubsub','composer'].every(id => c.has(id)) },
  { id: 'multi_cloud',    label: 'Multi-Cloud',      icon: '🌐', desc: 'Complete Azure, AWS, and GCP tracks',  check: (c: Set<string>) => ['azure-intro','aws-intro','gcp-intro'].every(id => c.has(id)) },
  { id: 'project_done',   label: 'Builder',          icon: '🏗️', desc: 'Complete Project 1',                   check: (c: Set<string>) => c.has('project-1') },
  { id: 'all_done',       label: 'Data Engineer',    icon: '🎓', desc: 'Complete every lesson',                check: (c: Set<string>) => LESSONS.every(l => c.has(l.id)) },
]

const KEY_COMPLETED = 'vedalera_progress'
const KEY_XP = 'vedalera_xp'
const KEY_STREAK = 'vedalera_streak'
const KEY_LAST_VISIT = 'vedalera_last_visit'

function getLevel(xp: number) {
  return LEVELS.findLast(l => xp >= l.min) || LEVELS[0]
}

function getNextLevel(xp: number) {
  return LEVELS.find(l => xp < l.max) || LEVELS[LEVELS.length - 1]
}

export function GamifiedProgress() {
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [xp, setXp] = useState(0)
  const [streak, setStreak] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showBadge, setShowBadge] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem(KEY_COMPLETED)
      if (saved) setCompleted(new Set(JSON.parse(saved)))
      const savedXp = parseInt(localStorage.getItem(KEY_XP) || '0')
      setXp(savedXp)

      // Streak logic
      const lastVisit = localStorage.getItem(KEY_LAST_VISIT)
      const savedStreak = parseInt(localStorage.getItem(KEY_STREAK) || '0')
      const today = new Date().toDateString()
      if (lastVisit === today) {
        setStreak(savedStreak)
      } else if (lastVisit === new Date(Date.now() - 86400000).toDateString()) {
        const newStreak = savedStreak + 1
        setStreak(newStreak)
        localStorage.setItem(KEY_STREAK, String(newStreak))
      } else {
        setStreak(1)
        localStorage.setItem(KEY_STREAK, '1')
      }
      localStorage.setItem(KEY_LAST_VISIT, today)
    } catch {}
  }, [])

  const toggle = (id: string, lessonXp: number) => {
    setCompleted(prev => {
      const next = new Set(prev)
      const adding = !next.has(id)
      if (adding) {
        next.add(id)
        const newXp = xp + lessonXp
        setXp(newXp)
        try { localStorage.setItem(KEY_XP, String(newXp)) } catch {}
        // Check for new badges
        const newBadge = BADGES.find(b => !b.check(prev) && b.check(next))
        if (newBadge) setShowBadge(newBadge.id)
      } else {
        next.delete(id)
        const newXp = Math.max(0, xp - lessonXp)
        setXp(newXp)
        try { localStorage.setItem(KEY_XP, String(newXp)) } catch {}
      }
      try { localStorage.setItem(KEY_COMPLETED, JSON.stringify(Array.from(next))) } catch {}
      return next
    })
  }

  if (!mounted) return null

  const level = getLevel(xp)
  const nextLevel = getNextLevel(xp)
  const levelPct = nextLevel.min === level.min ? 100 : Math.round(((xp - level.min) / (nextLevel.max - level.min)) * 100)
  const earnedBadges = BADGES.filter(b => b.check(completed))
  const sections = Array.from(new Set(LESSONS.map(l => l.section)))

  return (
    <>
      {/* Badge toast */}
      {showBadge && (() => {
        const badge = BADGES.find(b => b.id === showBadge)!
        return (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--accent)', animation: 'slideUp 0.3s ease' }}>
            <span className="text-2xl">{badge.icon}</span>
            <div>
              <div className="text-xs font-mono" style={{ color: 'var(--accent)' }}>Badge Unlocked!</div>
              <div className="font-display font-bold text-sm" style={{ color: 'var(--text)' }}>{badge.label}</div>
            </div>
            <button onClick={() => setShowBadge(null)} className="ml-2 text-xs" style={{ color: 'var(--muted)' }}>✕</button>
          </div>
        )
      })()}

      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
        {/* XP Header */}
        <button onClick={() => setExpanded(!expanded)} className="w-full p-4 text-left" style={{ background: 'var(--bg2)' }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{level.icon}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-sm" style={{ color: level.color }}>{level.label}</span>
                <div className="flex items-center gap-3 text-xs font-mono">
                  {streak > 0 && (
                    <span className="flex items-center gap-1" style={{ color: '#ff9800' }}>
                      <Flame size={11} /> {streak}d
                    </span>
                  )}
                  <span className="flex items-center gap-1" style={{ color: 'var(--accent)' }}>
                    <Zap size={11} /> {xp} XP
                  </span>
                </div>
              </div>
              <div className="h-1.5 rounded-full mt-1.5 overflow-hidden" style={{ background: 'var(--bg3)' }}>
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${levelPct}%`, background: `linear-gradient(90deg, ${level.color}, var(--accent))` }} />
              </div>
              <div className="text-xs font-mono mt-1" style={{ color: 'var(--muted)' }}>
                {completed.size}/{LESSONS.length} lessons · {levelPct}% to {nextLevel.label}
              </div>
            </div>
            {expanded ? <ChevronUp size={14} style={{ color: 'var(--muted)', flexShrink:0 }} />
                      : <ChevronDown size={14} style={{ color: 'var(--muted)', flexShrink:0 }} />}
          </div>

          {/* Badge previews */}
          {earnedBadges.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {earnedBadges.map(b => (
                <span key={b.id} title={b.desc} className="text-base">{b.icon}</span>
              ))}
            </div>
          )}
        </button>

        {expanded && (
          <div>
            {/* Badges section */}
            <div className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>Achievements</div>
              <div className="grid grid-cols-4 gap-2">
                {BADGES.map(badge => {
                  const earned = badge.check(completed)
                  return (
                    <div key={badge.id} title={badge.desc}
                      className="flex flex-col items-center gap-1 p-2 rounded-xl text-center"
                      style={{ background: earned ? 'var(--accent-glow)' : 'var(--bg3)', border: `1px solid ${earned ? 'rgba(0,120,212,0.2)' : 'var(--border)'}`, opacity: earned ? 1 : 0.35 }}>
                      <span className="text-xl">{badge.icon}</span>
                      <span className="text-xs font-mono leading-tight" style={{ color: earned ? 'var(--text)' : 'var(--muted)', fontSize: '0.55rem' }}>{badge.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Lessons */}
            <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {sections.map(section => {
                const items = LESSONS.filter(l => l.section === section)
                const done = items.filter(l => completed.has(l.id)).length
                const color = items[0]?.color || 'var(--accent)'
                return (
                  <div key={section} className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono uppercase tracking-wider" style={{ color }}>{section}</span>
                      <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{done}/{items.length}</span>
                    </div>
                    <ul className="space-y-1">
                      {items.map(lesson => {
                        const isDone = completed.has(lesson.id)
                        return (
                          <li key={lesson.id} className="flex items-center gap-2">
                            <button onClick={() => toggle(lesson.id, lesson.xp)} className="flex-shrink-0 transition-transform hover:scale-110">
                              {isDone
                                ? <CheckCircle size={15} style={{ color }} />
                                : <Circle size={15} style={{ color: 'var(--border2)' }} />}
                            </button>
                            <Link href={lesson.href} className="text-xs flex-1 truncate hover:underline"
                              style={{ color: isDone ? 'var(--muted)' : 'var(--text2)', textDecoration: isDone ? 'line-through' : 'none' }}>
                              {lesson.title}
                            </Link>
                            <span className="text-xs font-mono flex-shrink-0" style={{ color: 'var(--muted)', fontSize: '0.6rem' }}>
                              +{lesson.xp}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              })}
            </div>

            {completed.size === LESSONS.length && (
              <div className="p-4 text-center" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="text-3xl mb-1">🎓</div>
                <div className="text-sm font-display font-bold" style={{ color: '#f5c542' }}>
                  Staff Engineer — All Complete!
                </div>
              </div>
            )}

            <div className="p-3" style={{ borderTop: '1px solid var(--border)' }}>
              <button onClick={() => {
                setCompleted(new Set()); setXp(0)
                try { localStorage.removeItem(KEY_COMPLETED); localStorage.removeItem(KEY_XP) } catch {}
              }} className="text-xs font-mono w-full text-center py-1 rounded"
                style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}>
                Reset progress
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
