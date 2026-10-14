'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeftRight, Check, Circle, Download, LocateFixed, LockKeyhole, Map, Route } from 'lucide-react'
import type { Roadmap, RoadmapNode } from '@/data/roadmaps/types'
import { useProgress } from '@/lib/progress'
import { TopicDrawer, type TopicLesson, type TopicStatus } from '@/components/roadmap/TopicDrawer'

interface Props {
  roadmap: Roadmap
  /** Chaduvuko lessons for each node id, resolved on the server. */
  topicLessons: Record<string, TopicLesson[]>
}

const P = {
  required:    { solid: '#0a8c3e', bg: '#e6f9ed', border: '#7dd4a4', text: '#053d1b', label: 'Required' },
  optional:    { solid: '#555e6c', bg: 'var(--surface)', border: 'var(--border)', text: 'var(--muted)', label: 'Optional' },
  recommended: { solid: '#b06a00', bg: '#fff3d6', border: '#f0c060', text: '#7a4a00', label: 'Recommended' },
  chaduvuko:   { solid: '#6c4fc9', bg: '#ece8ff', border: '#b8a8f0', text: '#2d1780', label: '✦ Chaduvuko' },
} as const

const SITE = 'https://chaduvuko.com'

function getStartScrollLeft(viewport: HTMLDivElement, node: RoadmapNode) {
  const paddingLeft = Number.parseFloat(window.getComputedStyle(viewport).paddingLeft) || 0
  return Math.max(
    0,
    (node.x ?? 0) + (node.width ?? 0) / 2 + paddingLeft - viewport.clientWidth / 2,
  )
}

/** Statuses the reader set by hand. Older saves also held 'locked'/'available', which are derived now. */
function readSaved(key: string): Record<string, TopicStatus> {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? '{}')
    const saved: Record<string, TopicStatus> = {}
    for (const [id, value] of Object.entries(parsed?.states ?? {})) {
      if (value === 'done' || value === 'in-progress' || value === 'not-started') saved[id] = value
    }
    return saved
  } catch {
    return {}
  }
}

export default function SkillTree({ roadmap, topicLessons }: Props) {
  const KEY = `chaduvuko_rm_${roadmap.id}`
  const progress = useProgress()
  const completed = progress?.completed ?? null
  const [loaded, setLoaded] = useState(false)
  const [manual, setManual] = useState<Record<string, TopicStatus>>({})
  const [selected, setSelected] = useState<string | null>(null)
  const [hiddenTypes, setHiddenTypes] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<'guided' | 'map'>('guided')
  const canvasViewportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setManual(readSaved(KEY))
    setLoaded(true)
  }, [KEY])

  useEffect(() => {
    if (!loaded) return
    try { localStorage.setItem(KEY, JSON.stringify({ states: manual })) } catch {}
  }, [manual, loaded, KEY])

  // A topic is done when the reader says so or every one of its lessons is complete; it is
  // being learned when the reader says so or some of its lessons are complete.
  const status = useMemo(() => {
    const result: Record<string, { status: TopicStatus; fromLessons: boolean }> = {}
    for (const node of roadmap.nodes) {
      const lessons = topicLessons[node.id] ?? []
      const done = completed ? lessons.filter(lesson => completed[lesson.href]).length : 0
      const allDone = lessons.length > 0 && done === lessons.length
      const set = manual[node.id]
      if (allDone) result[node.id] = { status: 'done', fromLessons: true }
      else if (set) result[node.id] = { status: set, fromLessons: false }
      else result[node.id] = { status: done > 0 ? 'in-progress' : 'not-started', fromLessons: false }
    }
    return result
  }, [roadmap.nodes, topicLessons, completed, manual])

  const prerequisitesDone = (node: RoadmapNode) => (node.prerequisites ?? []).every(id => status[id]?.status === 'done')

  const toggleFilter = (ty: string) => {
    setHiddenTypes(prev => {
      const next = new Set(prev)
      if (next.has(ty)) next.delete(ty)
      else next.add(ty)
      return next
    })
  }

  const doneCount = roadmap.nodes.filter(node => status[node.id].status === 'done').length
  const learningCount = roadmap.nodes.filter(node => status[node.id].status === 'in-progress').length
  const selectedNode = selected ? roadmap.nodes.find(n => n.id === selected) : null
  const stages = useMemo(() => {
    const getStageKey = (node: RoadmapNode) => node.row ?? node.y ?? 0
    const keys = Array.from(new Set(roadmap.nodes.map(getStageKey))).sort((a, b) => a - b)
    const labels = ['Foundations', 'Core skills', 'Build practical skills', 'Production skills', 'Career-ready']

    return keys.map((key, index) => {
      const nodes = roadmap.nodes.filter(node => getStageKey(node) === key)
      const section = roadmap.sections?.find(item => item.row === key)
      const done = nodes.filter(node => status[node.id].status === 'done').length
      const actionable = nodes.filter(node => status[node.id].status !== 'done' && prerequisitesDone(node))
      const requiredNodes = nodes.filter(node => node.type === 'required' || node.type === 'chaduvuko')
      const requiredDone = requiredNodes.filter(node => status[node.id].status === 'done').length

      return {
        key,
        label: section?.label ?? labels[index] ?? `Stage ${index + 1}`,
        description: section?.description,
        nodes,
        done,
        actionable,
        requiredDone,
        requiredCount: requiredNodes.length,
      }
    })
  }, [roadmap.nodes, roadmap.sections, status])

  const firstActionableNode = stages.flatMap(stage => stage.actionable)[0]
  const completedPercent = roadmap.nodes.length ? Math.round(doneCount / roadmap.nodes.length * 100) : 0

  const canvasW = Math.max(...roadmap.nodes.map(n => (n.x ?? 0) + (n.width ?? 0))) + 40
  const canvasH = Math.max(...roadmap.nodes.map(n => (n.y ?? 0) + (n.height ?? 0))) + 40
  const startNode = roadmap.nodes.find(node => node.id === 'root') ?? roadmap.nodes[0]

  useEffect(() => {
    if (viewMode !== 'map') return
    const viewport = canvasViewportRef.current
    if (!viewport || !startNode) return

    const centerStart = () => {
      if (viewport.scrollWidth <= viewport.clientWidth) return
      viewport.scrollTo({ left: getStartScrollLeft(viewport, startNode), behavior: 'auto' })
    }

    centerStart()
    window.addEventListener('resize', centerStart)
    return () => window.removeEventListener('resize', centerStart)
  }, [roadmap.id, canvasW, startNode, viewMode])

  const returnToStart = () => {
    const viewport = canvasViewportRef.current
    if (!viewport || !startNode) return
    viewport.scrollTo({ left: getStartScrollLeft(viewport, startNode), behavior: 'smooth' })
  }

  return (
    <>
      <div className="no-print" style={{ background: 'var(--bg2)', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)' }}>

        {/* Progress and export */}
        <div style={{ background: 'var(--bg)', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>
            <b style={{ color: 'var(--text)', fontWeight: 700 }}>{doneCount}</b> of {roadmap.nodes.length} done
            {learningCount > 0 && <> · <b style={{ color: 'var(--text)', fontWeight: 700 }}>{learningCount}</b> learning</>}
          </span>
          <button
            type="button"
            onClick={() => window.print()}
            title="Opens the print dialog. Choose Save as PDF as the destination."
            className="ml-auto flex items-center gap-1.5 min-h-10 px-3.5 rounded-lg text-[13px] font-semibold"
            style={{ border: '1px solid var(--border2)', color: 'var(--text)', background: 'var(--surface)' }}
          >
            <Download size={14} aria-hidden="true" /> Save as PDF
          </button>
        </div>

        {/* View mode */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <div role="group" aria-label="Roadmap view" className="inline-flex gap-1 rounded-xl p-1" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            {([
              { id: 'guided', label: 'Guided path', icon: Route },
              { id: 'map', label: 'Explore map', icon: Map },
            ] as const).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                aria-pressed={viewMode === id}
                onClick={() => setViewMode(id)}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold transition-colors"
                style={{ background: viewMode === id ? 'var(--brand-green)' : 'transparent', color: viewMode === id ? 'var(--brand-green-text)' : 'var(--text2)' }}
              >
                <Icon size={16} aria-hidden="true" /> {label}
              </button>
            ))}
          </div>
          <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>
            {completedPercent}% complete
          </span>
        </div>

        <div className="h-1.5 w-full" role="progressbar" aria-label="Roadmap completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={completedPercent} style={{ background: 'var(--border)' }}>
          <div className="h-full transition-[width] duration-300" style={{ width: `${completedPercent}%`, background: 'var(--brand-green)' }} />
        </div>

        {/* Filters */}
        {viewMode === 'map' && <div style={{ padding: '9px 18px', display: 'flex', gap: 6, flexWrap: 'wrap' as const, borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          {([
            { ty: 'required',  label: 'Required',     borderC: '#0a8c3e', color: '#065f2c', bg: '#e6f9ed' },
            { ty: 'recommended', label: 'Recommended', borderC: '#b06a00', color: '#7a4a00', bg: '#fff3d6' },
            { ty: 'optional',  label: 'Optional',     borderC: 'var(--border)', color: 'var(--muted)', bg: 'var(--surface)' },
            { ty: 'chaduvuko', label: '✦ Chaduvuko',  borderC: '#6c4fc9', color: '#3d26a0', bg: '#ece8ff' },
          ] as const).map(f => (
            <button
              key={f.ty}
              type="button"
              aria-pressed={!hiddenTypes.has(f.ty)}
              onClick={() => toggleFilter(f.ty)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 13px', borderRadius: 20, fontSize: 11, fontWeight: 500,
                cursor: 'pointer', border: `1.5px solid ${f.borderC}`,
                background: f.bg, color: f.color,
                opacity: hiddenTypes.has(f.ty) ? 0.35 : 1,
                transition: 'opacity .15s',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: 2, background: f.borderC, flexShrink: 0 }} />
              {f.label}
            </button>
          ))}
        </div>}

        {viewMode === 'guided' ? (
          <div className="px-4 py-5 sm:px-6 sm:py-7" style={{ background: 'var(--bg2)' }}>
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 rounded-2xl p-5 sm:p-6" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <p className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: 'var(--brand-green)' }}>Your learning journey</p>
                <h2 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl" style={{ color: 'var(--text)' }}>
                  {doneCount === roadmap.nodes.length ? 'Roadmap complete — great work!' : firstActionableNode ? `Your next step: ${firstActionableNode.title}` : 'Your roadmap is ready'}
                </h2>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {doneCount === roadmap.nodes.length
                    ? 'You have completed every topic in this roadmap.'
                    : firstActionableNode
                      ? `Complete this topic to unlock the next steps. ${firstActionableNode.time ? `Estimated time: ${firstActionableNode.time}.` : ''}`
                      : 'Mark a topic complete to reveal the next steps in your path.'}
                </p>
                {firstActionableNode && (
                  <button type="button" onClick={() => setSelected(firstActionableNode.id)} className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-sm font-bold" style={{ background: 'var(--brand-green)', color: 'var(--brand-green-text)' }}>
                    {status[firstActionableNode.id].status === 'in-progress' ? 'Continue this topic' : 'Start this topic'}
                  </button>
                )}
              </div>

              <ol className="relative flex flex-col gap-4 before:absolute before:bottom-8 before:left-[17px] before:top-8 before:w-px before:bg-[var(--border2)] before:content-[''] sm:gap-5">
                {stages.map((stage, stageIndex) => {
                  const milestoneDone = stage.requiredCount > 0 && stage.requiredDone === stage.requiredCount
                  const currentStage = stage.actionable.length > 0 && stages.slice(0, stageIndex).every(item => item.requiredDone === item.requiredCount)
                  return (
                    <li key={stage.key} className="relative rounded-2xl p-4 pl-12 sm:p-5 sm:pl-14" style={{ background: 'var(--bg)', border: `1px solid ${currentStage ? 'var(--brand-green)' : 'var(--border)'}`, boxShadow: currentStage ? '0 4px 18px rgba(21,128,61,.08)' : 'none' }}>
                      <span aria-hidden="true" className="absolute left-2.5 top-4 flex h-8 w-8 items-center justify-center rounded-full" style={{ background: milestoneDone ? 'var(--brand-green)' : currentStage ? 'var(--brand-soft)' : 'var(--bg2)', color: milestoneDone ? 'var(--brand-green-text)' : currentStage ? 'var(--brand-green)' : 'var(--muted)', border: '1px solid var(--border)' }}>
                        {milestoneDone ? <Check size={16} /> : <span className="text-xs font-bold">{stageIndex + 1}</span>}
                      </span>
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: currentStage ? 'var(--brand-green)' : 'var(--muted)' }}>{currentStage ? 'Current stage' : `Stage ${stageIndex + 1}`}</p>
                          <h3 className="mt-1 text-lg font-bold" style={{ color: 'var(--text)' }}>{stage.label}</h3>
                        </div>
                        <span className="rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: 'var(--bg2)', color: 'var(--text2)' }}>
                          {stage.done}/{stage.nodes.length} topics
                        </span>
                      </div>
                      {stage.description && <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{stage.description}</p>}
                      <p className="mt-3 text-xs" style={{ color: milestoneDone ? 'var(--brand-green)' : 'var(--muted)' }}>
                        Milestone: {milestoneDone ? 'Core topics complete' : `${stage.requiredDone} of ${stage.requiredCount} required topics complete`}
                      </p>
                      <ul className="mt-3 flex flex-col gap-2">
                        {stage.nodes.map(node => {
                          const nodeStatus = status[node.id].status
                          const ready = prerequisitesDone(node)
                          const stateLabel = nodeStatus === 'done' ? 'Done' : nodeStatus === 'in-progress' ? 'In progress' : ready ? (node.id === firstActionableNode?.id ? 'Up next' : 'Ready') : 'Locked'
                          const stateColor = nodeStatus === 'done' ? 'var(--brand-green)' : ready ? 'var(--text2)' : 'var(--muted)'
                          const lesson = (topicLessons[node.id] ?? []).find(item => !completed?.[item.href])
                          return (
                            <li key={node.id} className="flex flex-col gap-3 rounded-xl p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4" style={{ background: 'var(--surface)', border: `1px solid ${node.id === firstActionableNode?.id ? 'var(--brand-green)' : 'var(--border)'}` }}>
                              <button type="button" onClick={() => setSelected(node.id)} className="min-w-0 flex-1 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" style={{ borderRadius: 4 }}>
                                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                  <span className="font-semibold" style={{ color: 'var(--text)' }}>{node.title}</span>
                                  <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: stateColor }}>
                                    {nodeStatus === 'done' ? <Check size={13} aria-hidden="true" /> : !ready ? <LockKeyhole size={12} aria-hidden="true" /> : <Circle size={10} aria-hidden="true" />}
                                    {stateLabel}
                                  </span>
                                </span>
                                <span className="mt-1 block text-xs" style={{ color: 'var(--muted)' }}>
                                  {[node.time, node.difficulty, `${(topicLessons[node.id] ?? []).length} lesson${(topicLessons[node.id] ?? []).length === 1 ? '' : 's'}`].filter(Boolean).join(' · ')}
                                </span>
                                {!ready && nodeStatus !== 'done' && (
                                  <span className="mt-1 block text-xs" style={{ color: 'var(--muted)' }}>
                                    Learn first: {(node.prerequisites ?? []).filter(id => status[id]?.status !== 'done').map(id => roadmap.nodes.find(item => item.id === id)?.title).filter(Boolean).join(', ')}
                                  </span>
                                )}
                              </button>
                              {lesson ? (
                                <Link href={lesson.href} className="inline-flex min-h-10 flex-shrink-0 items-center justify-center rounded-lg px-3 text-sm font-semibold" style={{ background: node.id === firstActionableNode?.id ? 'var(--brand-green)' : 'var(--bg2)', color: node.id === firstActionableNode?.id ? 'var(--brand-green-text)' : 'var(--text2)' }}>
                                  {nodeStatus === 'in-progress' ? 'Continue lesson' : 'Start lesson'}
                                </Link>
                              ) : (
                                <button type="button" onClick={() => setSelected(node.id)} className="min-h-10 flex-shrink-0 rounded-lg px-3 text-sm font-semibold" style={{ background: 'var(--bg2)', color: 'var(--text2)' }}>
                                  {ready ? 'Explore topic' : 'View prerequisites'}
                                </button>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        ) : (
        <>

        {/* Diagram navigation */}
        <div className="flex min-h-11 items-center justify-between gap-3 px-4" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
          <span className="flex min-w-0 items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
            <ArrowLeftRight size={15} aria-hidden="true" className="flex-shrink-0" />
            <span>Scroll sideways to explore; follow prerequisites from the top</span>
          </span>
          <button
            type="button"
            onClick={returnToStart}
            className="inline-flex min-h-9 flex-shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold"
            style={{ color: 'var(--text2)', border: '1px solid var(--border)', background: 'var(--surface)' }}
          >
            <LocateFixed size={14} aria-hidden="true" /> Start
          </button>
        </div>

        {/* Canvas */}
        <div
          ref={canvasViewportRef}
          role="region"
          aria-label={`${roadmap.title} roadmap diagram. Scroll horizontally to explore all topics.`}
          tabIndex={0}
          className="roadmap-diagram-viewport focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px]"
          style={{ overflow: 'auto', padding: '20px 18px', background: 'var(--bg2)', scrollbarWidth: 'thin', scrollbarColor: 'var(--border2) transparent' }}
        >
          <div style={{ position: 'relative', width: canvasW, height: canvasH }}>

            {/* Edges */}
            <svg aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, width: canvasW, height: canvasH, pointerEvents: 'none' }}>
              {(roadmap.edges ?? []).map(edge => {
                const a = roadmap.nodes.find(n => n.id === edge.from)
                const b = roadmap.nodes.find(n => n.id === edge.to)
                if (!a || !b) return null
                const ax = (a.x ?? 0) + (a.width ?? 0) / 2, ay = (a.y ?? 0) + (a.height ?? 0)
                const bx = (b.x ?? 0) + (b.width ?? 0) / 2, by = (b.y ?? 0)
                const my = (ay + by) / 2
                const fromDone = status[edge.from]?.status === 'done'
                const toDone = status[edge.to]?.status === 'done'
                const col = P[b.type].solid
                return (
                  <path
                    key={`${edge.from}-${edge.to}`}
                    d={`M${ax},${ay} C${ax},${my} ${bx},${my} ${bx},${by}`}
                    fill="none"
                    stroke={fromDone ? col : 'var(--muted)'}
                    strokeOpacity={fromDone && toDone ? 1 : fromDone ? 0.65 : 0.42}
                    strokeWidth={fromDone && toDone ? 2.5 : fromDone ? 2 : 1.5}
                    strokeDasharray={fromDone && toDone ? '7,3' : fromDone ? 'none' : '4,4'}
                  />
                )
              })}
            </svg>

            {/* Nodes */}
            {roadmap.nodes.map(node => {
              if (hiddenTypes.has(node.type)) return null
              const s = status[node.id].status
              const p = P[node.type]
              const ready = prerequisitesDone(node)
              const lessonCount = (topicLessons[node.id] ?? []).length
              const muted = s === 'not-started' && !ready

              return (
                <button
                  key={node.id}
                  type="button"
                  aria-haspopup="dialog"
                  aria-label={`${node.title}, ${p.label.replace('✦ ', '')}${muted ? ', prerequisites incomplete' : ''}${s === 'done' ? ', done' : s === 'in-progress' ? ', learning' : ''}${lessonCount ? `, ${lessonCount} Chaduvuko lesson${lessonCount > 1 ? 's' : ''}` : ''}`}
                  onClick={() => setSelected(node.id)}
                  className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    position: 'absolute',
                    left: node.x ?? 0, top: node.y ?? 0,
                    width: node.width ?? 0, height: node.height ?? 0,
                    borderRadius: 10,
                    cursor: 'pointer',
                    opacity: 1,
                    background: muted ? 'var(--surface)' : p.bg,
                    border: s === 'not-started' ? `1.5px solid ${muted ? 'var(--border2)' : p.border}` : `2px solid ${p.solid}`,
                    borderLeft: `3px solid ${muted ? 'var(--border2)' : p.solid}`,
                    boxShadow: s === 'not-started' ? (muted ? '0 1px 3px rgba(0,0,0,.06)' : '0 2px 8px rgba(0,0,0,.1)') : `0 3px 14px ${p.solid}30`,
                    outline: selected === node.id ? `2px solid ${p.solid}` : undefined,
                    outlineOffset: 3,
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '6px 8px 0 10px' }}>
                    <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase' as const, padding: '2px 8px', borderRadius: 20, background: s === 'in-progress' ? p.solid : muted ? 'var(--bg2)' : p.bg, color: s === 'in-progress' ? '#fff' : muted ? 'var(--text2)' : p.text, border: `0.5px solid ${muted ? 'var(--border2)' : p.border}`, lineHeight: 1.5 }}>
                      {s === 'in-progress' ? 'Learning' : p.label}
                    </span>
                    {s === 'done' ? (
                      <span aria-hidden="true" style={{ width: 17, height: 17, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: p.solid, color: '#fff', flexShrink: 0 }}>
                        <Check size={11} />
                      </span>
                    ) : lessonCount > 0 && node.type !== 'chaduvuko' && (
                      <span aria-hidden="true" style={{ fontSize: 10, fontWeight: 500, lineHeight: '17px', color: muted ? 'var(--muted)' : p.text, opacity: 0.85, flexShrink: 0 }}>
                        {lessonCount} lesson{lessonCount > 1 ? 's' : ''}
                      </span>
                    )}
                  </span>
                  <span title={node.title} style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: '2px 8px 0 10px', fontSize: 12, fontWeight: 600, lineHeight: 1.3, color: muted ? 'var(--text2)' : p.text }}>
                    {node.title}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <p style={{ padding: '0 18px 14px', margin: 0, fontSize: 12, color: 'var(--muted)', background: 'var(--bg2)' }}>
          Select a topic to see what it covers and the Chaduvuko lessons that teach it.
        </p>
        </>
        )}

        {/* Salary reveal */}
        {doneCount >= 5 && roadmap.salaryData && (
          <div style={{ padding: '0 18px 22px', background: 'var(--bg2)' }}>
            <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase' as const, color: '#0a8c3e' }}>Reward — unlocked after 5 nodes complete</div>
              <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)', marginTop: 5 }}>{roadmap.title} salaries · USA 2026</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2, marginBottom: 14 }}>US market · 2–4 yrs exp · Glassdoor, LinkedIn, Levels.fyi</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(130px,1fr))', gap: 7 }}>
                {roadmap.salaryData.map((entry, i) => (
                  <div key={i} style={{ background: 'var(--surface)', borderRadius: 9, padding: '12px 13px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 9, color: 'var(--muted)', fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '.06em', marginBottom: 4 }}>{entry.company}</div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)' }}>{entry.range}</div>
                    <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>{entry.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedNode && (
        <TopicDrawer
          key={selectedNode.id}
          node={selectedNode}
          lessons={topicLessons[selectedNode.id] ?? []}
          completed={completed}
          status={status[selectedNode.id].status}
          statusFromLessons={status[selectedNode.id].fromLessons}
          prerequisites={(selectedNode.prerequisites ?? []).flatMap(id => {
            const pre = roadmap.nodes.find(n => n.id === id)
            return pre ? [{ node: pre, done: status[id]?.status === 'done' }] : []
          })}
          onStatus={next => setManual(prev => ({ ...prev, [selectedNode.id]: next }))}
          onClose={() => setSelected(null)}
        />
      )}

      {/* What "Save as PDF" prints: every topic in order, with its status and lessons. */}
      <section className="print-only" aria-hidden="true">
        <ol className="roadmap-print-list">
          {roadmap.nodes.filter(node => node.id !== 'root').map(node => {
            const s = status[node.id].status
            const lessons = topicLessons[node.id] ?? []
            return (
              <li key={node.id}>
                <p className="roadmap-print-title">
                  <span>{s === 'done' ? '☑' : '☐'}</span> {node.title}
                  <span className="roadmap-print-meta"> · {P[node.type].label.replace('✦ ', '')}{node.time ? ` · ${node.time}` : ''}{s === 'in-progress' ? ' · learning' : ''}</span>
                </p>
                <p>{node.description}</p>
                {lessons.length > 0 && (
                  <ul>
                    {lessons.map(lesson => (
                      <li key={lesson.href}>{lesson.title} ({lesson.track}): {SITE}{lesson.href}</li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ol>
      </section>
    </>
  )
}
