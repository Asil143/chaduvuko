'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Trophy, Flame, BookOpen, Target, ChevronRight, CheckCircle2, Award } from 'lucide-react'
import { useProgress, type ProgressRecord } from '@/lib/progress'
import type { TrackSummaries } from '@/lib/lesson-nav'

/** [href, title, track slug], live lessons in catalog order. */
export type DashboardLesson = [string, string, string]

interface Props {
  lessons: DashboardLesson[]
  tracks: TrackSummaries
  quizLessons: string[]
}

const BADGES = [
  { id: 'first_lesson', icon: '🌱', label: 'First Step',  desc: 'Complete your first lesson' },
  { id: 'five_lessons', icon: '🔥', label: 'On Fire',     desc: 'Complete 5 lessons' },
  { id: 'ten_lessons',  icon: '⚡', label: 'Momentum',    desc: 'Complete 10 lessons' },
  { id: 'first_quiz',   icon: '🧠', label: 'Quiz Taker',  desc: 'Pass your first quiz' },
  { id: 'azure_done',   icon: '☁️', label: 'Azure Ready', desc: 'Complete every Azure lesson' },
  { id: 'aws_done',     icon: '🟧', label: 'AWS Ready',   desc: 'Complete every AWS lesson' },
  { id: 'streak_7',     icon: '📅', label: 'Week Streak', desc: '7-day learning streak' },
]

const localDay = (iso: string) => {
  const d = new Date(iso)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

/** Consecutive days with a completion or a timed quiz pass, ending today or yesterday. */
function learningStreak(progress: ProgressRecord): number {
  const days = new Set(
    [...Object.values(progress.completed), ...Object.values(progress.quizzesPassed)]
      .filter((at): at is string => typeof at === 'string')
      .map(localDay),
  )
  const cursor = new Date()
  if (!days.has(localDay(cursor.toISOString()))) cursor.setDate(cursor.getDate() - 1)
  let streak = 0
  while (days.has(localDay(cursor.toISOString()))) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

/** Resume the last lesson if unfinished; otherwise the next unfinished live lesson in its track. */
function upNext(progress: ProgressRecord, lessons: DashboardLesson[]): DashboardLesson | null {
  const last = progress.lastVisited?.href
  const index = last ? lessons.findIndex(([href]) => href === last) : -1
  if (index === -1) return null
  if (!progress.completed[last!]) return lessons[index]
  const track = lessons[index][2]
  return lessons.slice(index + 1).find(([href, , t]) => t === track && !progress.completed[href]) ?? null
}

const formatDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })

export default function Dashboard({ lessons, tracks, quizLessons }: Props) {
  const progress = useProgress()
  const [activeTab, setActiveTab] = useState<'overview' | 'completed' | 'badges'>('overview')

  const view = useMemo(() => {
    if (!progress) return null
    const done = lessons.filter(([href]) => progress.completed[href])
    const quizzesPassed = quizLessons.filter(href => href in progress.quizzesPassed)
    const trackProgress = Object.entries(tracks)
      .map(([slug, track]) => ({ slug, ...track, done: done.filter(([, , t]) => t === slug).length }))
      .filter(track => track.done > 0)
      .sort((a, b) => b.done / b.lessons - a.done / a.lessons)
    const trackDone = (slug: string) => tracks[slug] && tracks[slug].lessons > 0 &&
      lessons.filter(([, , t]) => t === slug).every(([href]) => progress.completed[href])
    const streak = learningStreak(progress)
    const earned = new Set<string>()
    if (done.length >= 1) earned.add('first_lesson')
    if (done.length >= 5) earned.add('five_lessons')
    if (done.length >= 10) earned.add('ten_lessons')
    if (quizzesPassed.length >= 1) earned.add('first_quiz')
    if (trackDone('azure')) earned.add('azure_done')
    if (trackDone('aws')) earned.add('aws_done')
    if (streak >= 7) earned.add('streak_7')
    const completedList = done
      .map(([href, title, track]) => ({ href, title, track, at: progress.completed[href], quiz: href in progress.quizzesPassed }))
      .sort((a, b) => b.at.localeCompare(a.at))
    return { done, quizzesPassed, trackProgress, streak, earned, completedList, next: upNext(progress, lessons) }
  }, [progress, lessons, tracks, quizLessons])

  const pct = view ? Math.round((view.done.length / lessons.length) * 100) : 0
  const stat = (value: string | null) => value ?? '—'

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12">

        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
            // Your Progress
          </div>
          <h1 className="font-display font-extrabold text-4xl mb-1" style={{ color: 'var(--text)' }}>Dashboard</h1>
          <p className="text-sm" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>
            Your lessons, quizzes, and streak — saved in this browser.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <BookOpen size={18} />, label: 'Lessons Done',   value: stat(view && `${view.done.length}/${lessons.length}`), color: 'var(--accent)' },
            { icon: <CheckCircle2 size={18} />, label: 'Quizzes Passed', value: stat(view && `${view.quizzesPassed.length}/${quizLessons.length}`), color: '#f5c542' },
            { icon: <Flame size={18} />,    label: 'Day Streak',     value: stat(view && `${view.streak} ${view.streak === 1 ? 'day' : 'days'}`), color: '#ff6b6b' },
            { icon: <Trophy size={18} />,   label: 'Badges Earned',  value: stat(view && `${view.earned.size}/${BADGES.length}`), color: '#7b61ff' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="mb-2" style={{ color: s.color }}>{s.icon}</div>
              <div className="font-display font-bold text-2xl mb-0.5" style={{ color: 'var(--text)' }}>{s.value}</div>
              <div className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-6 mb-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award size={16} style={{ color: 'var(--accent)' }} />
              <span className="font-display font-bold text-lg" style={{ color: 'var(--text)' }}>Overall progress</span>
            </div>
            <div className="font-display font-bold text-xl" style={{ color: 'var(--text)' }}>{view ? `${pct}%` : '—'}</div>
          </div>
          <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--bg3)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: pct + '%', background: 'var(--accent)' }} />
          </div>
          <p className="text-xs font-mono mt-2" style={{ color: 'var(--muted)' }}>
            {view ? `${view.done.length} of ${lessons.length} live lessons completed` : 'Loading your progress…'}
          </p>
        </div>

        <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit" role="group" aria-label="Dashboard view" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
          {(['overview', 'completed', 'badges'] as const).map(tab => (
            <button key={tab} type="button" aria-pressed={activeTab === tab} onClick={() => setActiveTab(tab)}
              className="px-3 sm:px-4 py-2 rounded-lg text-sm font-mono capitalize transition-all"
              style={{
                background: activeTab === tab ? 'var(--surface)' : 'transparent',
                color: activeTab === tab ? 'var(--text)' : 'var(--muted)',
                border: activeTab === tab ? '1px solid var(--border)' : '1px solid transparent',
              }}>
              {tab}
            </button>
          ))}
        </div>

        {view && activeTab === 'overview' && (
          <div className="space-y-6">
            {view.next && (
              <div className="rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <h3 className="font-display font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text)' }}>
                  <Target size={16} style={{ color: 'var(--accent)' }} /> Up next
                </h3>
                <Link href={view.next[0]} className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-glow)' }}>
                    <BookOpen size={18} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-sm" style={{ color: 'var(--text)' }}>{view.next[1]}</div>
                    <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--muted)' }}>{tracks[view.next[2]]?.title}</div>
                  </div>
                  <ChevronRight size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                </Link>
              </div>
            )}

            <div className="rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h3 className="font-display font-semibold mb-5" style={{ color: 'var(--text)' }}>Track progress</h3>
              {view.trackProgress.length === 0 ? (
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  No lessons completed yet. Open any lesson and select <strong>Mark as complete</strong> at the end —{' '}
                  <Link href="/learn" style={{ color: 'var(--accent)' }}>browse all tracks</Link>.
                </p>
              ) : (
                <div className="space-y-4">
                  {view.trackProgress.map(t => (
                    <div key={t.slug}>
                      <div className="flex items-center justify-between mb-1.5">
                        <Link href={t.href} className="text-sm font-mono" style={{ color: 'var(--text2)' }}>{t.title}</Link>
                        <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{t.done}/{t.lessons} lessons</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg3)' }}>
                        <div className="h-full rounded-full" style={{ width: (t.done / t.lessons) * 100 + '%', background: 'var(--accent)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {view && activeTab === 'completed' && (
          view.completedList.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--muted)' }}>Lessons you mark as complete will appear here.</p>
          ) : (
            <ul className="space-y-2">
              {view.completedList.map(lesson => (
                <li key={lesson.href}>
                  <Link href={lesson.href} className="flex items-center gap-4 p-4 rounded-xl"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--green)', flexShrink: 0 }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-display font-medium" style={{ color: 'var(--text)' }}>{lesson.title}</div>
                      <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--muted)' }}>
                        {tracks[lesson.track]?.title} · {formatDate(lesson.at)}{lesson.quiz ? ' · quiz passed' : ''}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )
        )}

        {view && activeTab === 'badges' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BADGES.map(badge => {
              const earned = view.earned.has(badge.id)
              return (
                <div key={badge.id} className="rounded-2xl p-5 text-center"
                  style={{ background: earned ? 'var(--surface)' : 'var(--bg2)', border: '1px solid var(--border)', opacity: earned ? 1 : 0.5, filter: earned ? 'none' : 'grayscale(1)' }}>
                  <div className="text-4xl mb-3">{badge.icon}</div>
                  <div className="font-display font-semibold text-sm mb-1" style={{ color: 'var(--text)' }}>{badge.label}</div>
                  <div className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{badge.desc}</div>
                  {earned && <div className="mt-2 text-xs font-mono" style={{ color: 'var(--green)' }}>✓ Earned</div>}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
