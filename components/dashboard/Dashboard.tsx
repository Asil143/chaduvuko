'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Trophy, Flame, BookOpen, Target, ChevronRight, CheckCircle2, Award, ArrowRight, Compass, CalendarDays, PartyPopper, X, RotateCcw } from 'lucide-react'
import { useProgress, type ProgressRecord } from '@/lib/progress'
import { upNext, type LessonEntry } from '@/lib/up-next'
import type { TrackSummaries } from '@/lib/lesson-nav'
import type { NodeType } from '@/data/roadmaps/types'
import { LearnerAccount } from '@/components/auth/LearnerAccount'
import { ProjectMilestones } from '@/components/dashboard/ProjectMilestones'

interface DashboardRoadmapNode {
  id: string
  title: string
  type: NodeType
  row: number
  prerequisites: string[]
  lessonHrefs: string[]
}

interface DashboardRoadmap {
  id: string
  slug: string
  title: string
  nodes: DashboardRoadmapNode[]
  sections: { row: number; label: string }[]
}

interface RoadmapSummary {
  id: string
  slug: string
  title: string
  done: number
  total: number
  currentStage: string
  currentStageDone: number
  currentStageTotal: number
  completeStages: string[]
  nextNodeTitle: string
  nextHref: string
  lastVisitedAt: string
}

interface Props {
  lessons: LessonEntry[]
  tracks: TrackSummaries
  quizLessons: string[]
  roadmaps: DashboardRoadmap[]
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

const localDay = (d: Date) => {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

function mondayOf(date: Date) {
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7))
  return monday
}

function activityDates(progress: ProgressRecord) {
  const counts = new Map<string, number>()
  const timestamps = [...Object.values(progress.completed), ...Object.values(progress.quizzesPassed)]
  for (const timestamp of timestamps) {
    if (!timestamp) continue
    const date = new Date(timestamp)
    if (Number.isNaN(date.getTime())) continue
    const day = localDay(date)
    counts.set(day, (counts.get(day) ?? 0) + 1)
  }
  return counts
}

/** Consecutive days with a completion or a timed quiz pass, ending today or yesterday. */
function learningStreak(progress: ProgressRecord): number {
  const days = activityDates(progress)
  const cursor = new Date()
  if (!days.has(localDay(cursor))) cursor.setDate(cursor.getDate() - 1)
  let streak = 0
  while (days.has(localDay(cursor))) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

const formatDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })

function savedWeeklyGoal() {
  try {
    const goal = Number(localStorage.getItem('chaduvuko_dashboard_weekly_goal'))
    return [3, 5, 7].includes(goal) ? goal : null
  } catch (error) {
    console.error('Could not read the saved weekly goal:', error)
    return null
  }
}

function readRoadmapSummaries(roadmaps: DashboardRoadmap[], progress: ProgressRecord): RoadmapSummary[] {
  return roadmaps.map(roadmap => {
    let savedStates: Record<string, string> = {}
    let lastVisitedAt = ''
    try {
      const saved = JSON.parse(localStorage.getItem(`chaduvuko_rm_${roadmap.id}`) ?? '{}')
      if (saved?.states && typeof saved.states === 'object') savedStates = saved.states
      if (typeof saved?.lastVisitedAt === 'string') lastVisitedAt = saved.lastVisitedAt
    } catch {
      savedStates = {}
    }

    const recorded: Record<string, 'done' | 'in-progress' | 'not-started'> = {}
    for (const node of roadmap.nodes) {
      const lessonCompletions = node.lessonHrefs.filter(href => progress.completed[href]).length
      const manual = savedStates[node.id]
      recorded[node.id] = manual === 'done' || (node.lessonHrefs.length > 0 && lessonCompletions === node.lessonHrefs.length)
        ? 'done'
        : manual === 'in-progress' || lessonCompletions > 0
          ? 'in-progress'
          : 'not-started'
    }

    const effective = { ...recorded }
    for (let pass = 0; pass < roadmap.nodes.length; pass++) {
      let changed = false
      for (const node of roadmap.nodes) {
        if (node.prerequisites.some(id => effective[id] !== 'done') && effective[node.id] !== 'not-started') {
          effective[node.id] = 'not-started'
          changed = true
        }
      }
      if (!changed) break
    }

    const rows = Array.from(new Set(roadmap.nodes.map(node => node.row))).sort((a, b) => a - b)
    const stages = rows.map((row, index) => {
      const nodes = roadmap.nodes.filter(node => node.row === row)
      const required = nodes.filter(node => node.type === 'required' || node.type === 'chaduvuko')
      const counted = required.length ? required : nodes
      const done = counted.filter(node => effective[node.id] === 'done').length
      const label = roadmap.sections.find(section => section.row === row)?.label
        ?? ['Foundations', 'Core skills', 'Build practical skills', 'Production skills', 'Career-ready'][index]
        ?? `Stage ${index + 1}`
      return { label, done, total: counted.length, complete: counted.length > 0 && done === counted.length }
    })
    const currentStage = stages.find(stage => !stage.complete) ?? stages.at(-1)
    const nextNode = roadmap.nodes.find(node =>
      effective[node.id] !== 'done' &&
      node.prerequisites.every(id => effective[id] === 'done') &&
      node.lessonHrefs.length > 0,
    )
    return {
      id: roadmap.id,
      slug: roadmap.slug,
      title: roadmap.title,
      done: Object.values(effective).filter(value => value === 'done').length,
      total: roadmap.nodes.length,
      currentStage: currentStage?.label ?? 'Getting started',
      currentStageDone: currentStage?.done ?? 0,
      currentStageTotal: currentStage?.total ?? 0,
      completeStages: stages.filter(stage => stage.complete).map(stage => stage.label),
      nextNodeTitle: nextNode?.title ?? '',
      nextHref: nextNode?.lessonHrefs[0] ?? `/learn/roadmap/${roadmap.slug}`,
      lastVisitedAt,
    }
  })
}

export default function Dashboard({ lessons, tracks, quizLessons, roadmaps }: Props) {
  const progress = useProgress()
  const [activeTab, setActiveTab] = useState<'overview' | 'completed' | 'badges'>('overview')
  const [roadmapSummaries, setRoadmapSummaries] = useState<RoadmapSummary[]>([])
  const [roadmapProgressReady, setRoadmapProgressReady] = useState(false)
  const [weeklyGoal, setWeeklyGoal] = useState(3)
  const [goalReady, setGoalReady] = useState(false)
  const [goalTouched, setGoalTouched] = useState(false)
  const [celebration, setCelebration] = useState<{ title: string; message: string } | null>(null)
  const previousMilestones = useRef<Set<string> | null>(null)
  const previousWeeklyGoal = useRef(weeklyGoal)

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
    const quizzesToReview = completedList
      .filter(lesson => quizLessons.includes(lesson.href) && !lesson.quiz)
      .slice(0, 3)
    const activity = activityDates(progress)
    const now = new Date()
    const weekStart = mondayOf(now)
    const nextWeekStart = new Date(weekStart)
    nextWeekStart.setDate(nextWeekStart.getDate() + 7)
    const weeklyLessons = done.filter(([href]) => {
      const date = new Date(progress.completed[href])
      return !Number.isNaN(date.getTime()) && date >= weekStart && date < nextWeekStart && date <= now
    }).length
    const activityStart = mondayOf(now)
    activityStart.setDate(activityStart.getDate() - 77)
    const activityCells = Array.from({ length: 84 }, (_, index) => {
      const date = new Date(activityStart)
      date.setDate(activityStart.getDate() + index)
      const day = localDay(date)
      return { day, count: activity.get(day) ?? 0, date }
    })
    return {
      done,
      quizzesPassed,
      trackProgress,
      streak,
      earned,
      completedList,
      quizzesToReview,
      weeklyLessons,
      activityCells,
      next: upNext(progress, lessons),
    }
  }, [progress, lessons, tracks, quizLessons])

  useEffect(() => {
    const savedGoal = savedWeeklyGoal()
    if (savedGoal) setWeeklyGoal(savedGoal)
    setGoalReady(true)
  }, [])

  useEffect(() => {
    if (!goalReady || !goalTouched) return
    const key = 'chaduvuko_dashboard_weekly_goal'
    const next = String(weeklyGoal)
    try {
      const previous = localStorage.getItem(key)
      if (previous === next) return
      localStorage.setItem(key, next)
      window.dispatchEvent(new Event('chaduvuko:sync-preference-change'))
    } catch (error) {
      console.error('Could not save the weekly learning goal:', error)
    }
  }, [weeklyGoal, goalReady, goalTouched])

  useEffect(() => {
    const onSync = () => {
      if (goalTouched) return
      const savedGoal = savedWeeklyGoal()
      if (savedGoal) setWeeklyGoal(savedGoal)
    }
    window.addEventListener('chaduvuko:sync-applied', onSync)
    return () => window.removeEventListener('chaduvuko:sync-applied', onSync)
  }, [goalTouched])

  useEffect(() => {
    if (!progress) return
    const refresh = () => {
      setRoadmapSummaries(readRoadmapSummaries(roadmaps, progress))
      setRoadmapProgressReady(true)
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key?.startsWith('chaduvuko_rm_')) refresh()
    }
    refresh()
    window.addEventListener('chaduvuko:roadmap-progress-change', refresh)
    window.addEventListener('storage', onStorage)
    window.addEventListener('focus', refresh)
    return () => {
      window.removeEventListener('chaduvuko:roadmap-progress-change', refresh)
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('focus', refresh)
    }
  }, [progress, roadmaps])

  useEffect(() => {
    if (!view || !roadmapProgressReady || !goalReady) return
    const milestones = new Set<string>()
    if (view.done.length >= 1) milestones.add('first-lesson')
    if (view.done.length >= 5) milestones.add('five-lessons')
    if (view.done.length >= 10) milestones.add('ten-lessons')
    view.quizzesPassed.forEach(href => milestones.add(`quiz-${href}`))
    for (const roadmap of roadmapSummaries) {
      for (const stage of roadmap.completeStages) milestones.add(`stage-${roadmap.slug}-${stage}`)
    }
    if (view.weeklyLessons >= weeklyGoal) milestones.add(`weekly-goal-${weeklyGoal}`)

    const previous = previousMilestones.current
    previousMilestones.current = milestones
    if (!previous || previousWeeklyGoal.current !== weeklyGoal) {
      previousWeeklyGoal.current = weeklyGoal
      return
    }
    const newlyReached = Array.from(milestones).find(milestone => !previous.has(milestone))
    if (!newlyReached) return

    let message = { title: 'Nice work!', message: 'You reached a new learning milestone.' }
    if (newlyReached === 'first-lesson') message = { title: 'First lesson complete!', message: 'A great start. Keep building your skills one step at a time.' }
    else if (newlyReached === 'five-lessons') message = { title: 'Five lessons completed!', message: 'Your steady practice is adding up.' }
    else if (newlyReached === 'ten-lessons') message = { title: 'Ten lessons completed!', message: 'You’ve built real momentum. Keep going at your own pace.' }
    else if (newlyReached.startsWith('quiz-')) message = { title: 'Quiz passed!', message: 'Nice recall practice. Your result is saved in this browser.' }
    else if (newlyReached.startsWith('stage-')) message = { title: 'Roadmap stage complete!', message: 'You’ve completed the required topics in a learning stage.' }
    else if (newlyReached.startsWith('weekly-goal-')) message = { title: 'Weekly goal reached!', message: 'You met the lesson goal you set for this week.' }

    setCelebration(message)
  }, [view, roadmapSummaries, roadmapProgressReady, weeklyGoal, goalReady])

  const activeRoadmap = roadmapProgressReady ? roadmapSummaries
    .filter(roadmap => roadmap.done > 0 || roadmap.lastVisitedAt)
    .sort((a, b) => b.done - a.done || b.lastVisitedAt.localeCompare(a.lastVisitedAt))[0] : undefined
  const reviewLessons = view?.quizzesToReview ?? []
  const recommendedHref = activeRoadmap?.nextNodeTitle ? activeRoadmap.nextHref : view?.next?.[0]
  const recommendedTitle = activeRoadmap?.nextNodeTitle || view?.next?.[1]

  const pct = view ? Math.round((view.done.length / lessons.length) * 100) : 0
  const stat = (value: string | null) => value ?? '—'

  return (
    <div className="dashboard-page">
      <div className="dashboard-inner">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-eyebrow">YOUR LEARNING SPACE</p>
            <h1>Your progress, at a glance.</h1>
            <p>Keep your momentum going. Your learning activity is saved in this browser.</p>
          </div>
          <Link href={view?.next?.[0] ?? '/learn'} className="dashboard-primary-action">
            <BookOpen size={17} aria-hidden="true" />
            {view?.next ? 'Continue learning' : 'Explore learning paths'}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </header>

        <div className="dashboard-stat-grid">
          {[
            { icon: <BookOpen size={18} />, label: 'Lessons completed', value: stat(view && `${view.done.length}/${lessons.length}`), color: 'var(--accent)' },
            { icon: <CheckCircle2 size={18} />, label: 'Quizzes passed', value: stat(view && `${view.quizzesPassed.length}/${quizLessons.length}`), color: '#d29b19' },
            { icon: <Flame size={18} />, label: 'Learning streak', value: stat(view && `${view.streak} ${view.streak === 1 ? 'day' : 'days'}`), color: '#e66b58' },
            { icon: <Trophy size={18} />, label: 'Badges earned', value: stat(view && `${view.earned.size}/${BADGES.length}`), color: '#7b61ff' },
          ].map(s => (
            <div key={s.label} className="dashboard-stat">
              <span className="dashboard-stat-icon" style={{ color: s.color }}>{s.icon}</span>
              <span className="dashboard-stat-value">{s.value}</span>
              <span className="dashboard-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <section className="dashboard-progress-panel" aria-labelledby="dashboard-progress-title">
          <div className="dashboard-progress-heading">
            <div>
              <div className="dashboard-panel-title">
                <Award size={17} aria-hidden="true" />
                <h2 id="dashboard-progress-title">Overall learning progress</h2>
              </div>
              <p>{view ? `${view.done.length} of ${lessons.length} available lessons completed` : 'Loading your progress…'}</p>
            </div>
            <span className="dashboard-progress-percent">{view ? `${pct}%` : '—'}</span>
          </div>
          <div
            className="dashboard-progress-track"
            role="progressbar"
            aria-label="Overall lesson completion"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={view ? pct : 0}
          >
            <div style={{ width: pct + '%' }} />
          </div>
        </section>

        {celebration && (
          <aside className="dashboard-celebration" role="status" aria-live="polite">
            <span className="dashboard-celebration-icon"><PartyPopper size={20} aria-hidden="true" /></span>
            <div>
              <strong>{celebration.title}</strong>
              <p>{celebration.message}</p>
            </div>
            <button type="button" aria-label="Dismiss milestone message" onClick={() => setCelebration(null)}>
              <X size={17} aria-hidden="true" />
            </button>
          </aside>
        )}

        <div className="dashboard-tabs" role="group" aria-label="Dashboard view">
          {(['overview', 'completed', 'badges'] as const).map(tab => (
            <button key={tab} type="button" aria-pressed={activeTab === tab} onClick={() => setActiveTab(tab)}
              className="dashboard-tab"
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
          <div className="dashboard-content">
            {view.next && (
              <section className="dashboard-next-panel" aria-labelledby="dashboard-next-title">
                <div className="dashboard-next-heading">
                  <span className="dashboard-next-icon"><Target size={19} aria-hidden="true" /></span>
                  <div>
                    <p className="dashboard-eyebrow">PICK UP WHERE YOU LEFT OFF</p>
                    <h2 id="dashboard-next-title">Your next lesson</h2>
                  </div>
                </div>
                <Link href={view.next[0]} className="dashboard-next-link">
                  <span className="dashboard-next-book"><BookOpen size={20} aria-hidden="true" /></span>
                  <span className="dashboard-next-copy">
                    <strong>{view.next[1]}</strong>
                    <small>{tracks[view.next[2]]?.title}</small>
                  </span>
                  <span className="dashboard-next-cta">Continue <ChevronRight size={17} aria-hidden="true" /></span>
                </Link>
              </section>
            )}

            <section className="dashboard-recommendation" aria-labelledby="dashboard-recommendation-title">
              <div className="dashboard-recommendation-icon"><Compass size={19} aria-hidden="true" /></div>
              <div className="dashboard-recommendation-copy">
                <p className="dashboard-eyebrow">A GOOD NEXT STEP</p>
                <h2 id="dashboard-recommendation-title">{recommendedTitle ?? 'Choose a learning path to get started'}</h2>
                <p>
                  {activeRoadmap?.nextNodeTitle
                    ? `Recommended from ${activeRoadmap.title} · ${activeRoadmap.currentStage}. Prerequisites are complete.`
                    : recommendedHref
                      ? 'Continue your current learning path. You can also choose a roadmap to get prerequisite-aware guidance.'
                      : 'Explore a roadmap for a clear, prerequisite-aware route through a skill.'}
                </p>
              </div>
              <Link href={recommendedHref ?? '/learn/roadmap'}>
                {recommendedHref ? 'Continue' : 'Explore roadmaps'} <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </section>

            <div className="dashboard-engagement-grid">
              <section className="dashboard-feature-panel" aria-labelledby="dashboard-goal-title">
                <div className="dashboard-section-heading">
                  <div>
                    <h2 id="dashboard-goal-title"><Target size={17} aria-hidden="true" /> Weekly learning goal</h2>
                    <p>Set a steady pace that works for you.</p>
                  </div>
                  <label className="dashboard-goal-select">
                    <span className="sr-only">Lessons per week goal</span>
                    <select value={weeklyGoal} onChange={event => { setWeeklyGoal(Number(event.target.value)); setGoalTouched(true) }}>
                      {[3, 5, 7].map(goal => <option key={goal} value={goal}>{goal} lessons</option>)}
                    </select>
                  </label>
                </div>
                <div className="dashboard-goal-progress">
                  <div className="dashboard-goal-count">
                    <strong>{Math.min(view.weeklyLessons, weeklyGoal)}<span> / {weeklyGoal}</span></strong>
                    <span>{view.weeklyLessons >= weeklyGoal ? 'Goal reached this week' : 'lessons completed this week'}</span>
                  </div>
                  <div
                    className="dashboard-progress-track"
                    role="progressbar"
                    aria-label="Weekly lesson goal"
                    aria-valuemin={0}
                    aria-valuemax={weeklyGoal}
                    aria-valuenow={Math.min(view.weeklyLessons, weeklyGoal)}
                  >
                    <div style={{ width: `${Math.min(view.weeklyLessons / weeklyGoal * 100, 100)}%` }} />
                  </div>
                </div>
              </section>

              <section className="dashboard-feature-panel dashboard-activity-panel" aria-labelledby="dashboard-activity-title">
                <div className="dashboard-section-heading">
                  <div>
                    <h2 id="dashboard-activity-title"><CalendarDays size={17} aria-hidden="true" /> Learning activity</h2>
                    <p>Lessons and quizzes over the last 12 weeks.</p>
                  </div>
                </div>
                <div className="dashboard-weekday-labels" aria-hidden="true">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
                </div>
                <div className="dashboard-activity-grid" role="grid" aria-label="Learning activity in the last 12 weeks">
                  {view.activityCells.map(cell => (
                    <span
                      key={cell.day}
                      role="gridcell"
                      data-level={Math.min(cell.count, 4)}
                      aria-label={`${cell.date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}: ${cell.count} ${cell.count === 1 ? 'activity' : 'activities'}`}
                      title={`${cell.day}: ${cell.count} ${cell.count === 1 ? 'activity' : 'activities'}`}
                    />
                  ))}
                </div>
                <div className="dashboard-activity-legend" aria-label="Activity intensity">
                  <span>Less</span>
                  {[0, 1, 2, 3, 4].map(level => <i key={level} data-level={level} aria-hidden="true" />)}
                  <span>More</span>
                </div>
              </section>
            </div>

            <div className="dashboard-engagement-grid">
              <section className="dashboard-feature-panel" aria-labelledby="dashboard-roadmap-title">
                <div className="dashboard-section-heading">
                  <div>
                    <h2 id="dashboard-roadmap-title"><Compass size={17} aria-hidden="true" /> Roadmap progress</h2>
                    <p>See your progress through a structured learning path.</p>
                  </div>
                </div>
                {activeRoadmap ? (
                  <Link href={`/learn/roadmap/${activeRoadmap.slug}`} className="dashboard-roadmap-card">
                    <div className="dashboard-roadmap-card-heading">
                      <strong>{activeRoadmap.title}</strong>
                      <span>{activeRoadmap.total ? Math.round(activeRoadmap.done / activeRoadmap.total * 100) : 0}%</span>
                    </div>
                    <div className="dashboard-track-bar">
                      <div style={{ width: `${activeRoadmap.total ? activeRoadmap.done / activeRoadmap.total * 100 : 0}%` }} />
                    </div>
                    <p>Current stage: <strong>{activeRoadmap.currentStage}</strong></p>
                    {activeRoadmap.currentStageTotal > 0 && (
                      <small>{activeRoadmap.currentStageDone} of {activeRoadmap.currentStageTotal} required topics complete</small>
                    )}
                    <span className="dashboard-roadmap-link">Continue roadmap <ArrowRight size={14} aria-hidden="true" /></span>
                  </Link>
                ) : (
                  <div className="dashboard-empty-state">
                    <span className="dashboard-empty-icon"><Compass size={19} aria-hidden="true" /></span>
                    <div>
                      <strong>Choose a roadmap to get started</strong>
                      <p>Your roadmap progress will appear here as you work through the required topics.</p>
                    </div>
                    <Link href="/learn/roadmap">Explore roadmaps <ArrowRight size={14} aria-hidden="true" /></Link>
                  </div>
                )}
              </section>

              <section className="dashboard-feature-panel" aria-labelledby="dashboard-review-title">
                <div className="dashboard-section-heading">
                  <div>
                    <h2 id="dashboard-review-title"><RotateCcw size={17} aria-hidden="true" /> Ready for a quick review?</h2>
                    <p>Revisit completed lessons with a quiz you haven’t passed yet.</p>
                  </div>
                </div>
                {reviewLessons.length ? (
                  <ul className="dashboard-review-list">
                    {reviewLessons.map(lesson => (
                      <li key={lesson.href}>
                        <Link href={lesson.href}>
                          <span><strong>{lesson.title}</strong><small>{tracks[lesson.track]?.title}</small></span>
                          <span className="dashboard-review-action">Review <ChevronRight size={15} aria-hidden="true" /></span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="dashboard-review-empty">
                    <CheckCircle2 size={18} aria-hidden="true" />
                    <p>{view.completedList.length ? 'You’re up to date on quizzes for completed lessons.' : 'Complete a lesson with a quiz and it will appear here for review.'}</p>
                  </div>
                )}
              </section>
            </div>

            <ProjectMilestones />
            <LearnerAccount />

            <section className="dashboard-track-panel" aria-labelledby="dashboard-track-title">
              <div className="dashboard-section-heading">
                <div>
                  <h2 id="dashboard-track-title">Track progress</h2>
                  <p>Your completed lessons by learning path</p>
                </div>
                <Link href="/learn" className="dashboard-text-link">Browse paths <ArrowRight size={14} aria-hidden="true" /></Link>
              </div>
              {view.trackProgress.length === 0 ? (
                <div className="dashboard-empty-state">
                  <span className="dashboard-empty-icon"><Compass size={19} aria-hidden="true" /></span>
                  <div>
                    <strong>Your first milestone is ready</strong>
                    <p>Complete a lesson to see your progress take shape here.</p>
                  </div>
                  <Link href={view.next?.[0] ?? '/learn'}>Start learning <ArrowRight size={14} aria-hidden="true" /></Link>
                </div>
              ) : (
                <div className="dashboard-track-list">
                  {view.trackProgress.map(t => (
                    <div key={t.slug} className="dashboard-track-row">
                      <div className="dashboard-track-meta">
                        <Link href={t.href}>{t.title}</Link>
                        <span>{t.done}/{t.lessons} lessons</span>
                      </div>
                      <div className="dashboard-track-bar">
                        <div style={{ width: (t.done / t.lessons) * 100 + '%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {view && activeTab === 'completed' && (
          view.completedList.length === 0 ? (
            <div className="dashboard-empty-panel">
              <span className="dashboard-empty-icon"><BookOpen size={20} aria-hidden="true" /></span>
              <h2>No completed lessons yet</h2>
              <p>When you finish a lesson, you’ll find it here along with its completion date.</p>
              <Link href={view.next?.[0] ?? '/learn'}>Start learning <ArrowRight size={14} aria-hidden="true" /></Link>
            </div>
          ) : (
            <ul className="dashboard-completed-list">
              {view.completedList.map(lesson => (
                <li key={lesson.href}>
                  <Link href={lesson.href} className="dashboard-completed-link">
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
          <div className="dashboard-badge-grid">
            {BADGES.map(badge => {
              const earned = view.earned.has(badge.id)
              return (
                <div key={badge.id} className="dashboard-badge"
                  style={{ background: earned ? 'var(--surface)' : 'var(--bg2)', border: '1px solid var(--border)', opacity: earned ? 1 : 0.58, filter: earned ? 'none' : 'grayscale(1)' }}>
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
