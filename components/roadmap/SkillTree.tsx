'use client'

import { useEffect, useMemo, useState } from 'react'
import { Check, Download } from 'lucide-react'
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

  const canvasW = Math.max(...roadmap.nodes.map(n => (n.x ?? 0) + (n.width ?? 0))) + 40
  const canvasH = Math.max(...roadmap.nodes.map(n => (n.y ?? 0) + (n.height ?? 0))) + 40

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

        {/* Filters */}
        <div style={{ padding: '9px 18px', display: 'flex', gap: 6, flexWrap: 'wrap' as const, borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          {([
            { ty: 'required',  label: 'Required',     borderC: '#0a8c3e', color: '#065f2c', bg: '#e6f9ed' },
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
        </div>

        {/* Canvas */}
        <div style={{ overflowX: 'auto', padding: '20px 18px', background: 'var(--bg2)' }}>
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
                    stroke={fromDone ? col : '#888'}
                    strokeOpacity={fromDone && toDone ? 1 : fromDone ? 0.45 : 0.2}
                    strokeWidth={fromDone && toDone ? 2 : fromDone ? 1.5 : 1}
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
                  aria-label={`${node.title}, ${p.label.replace('✦ ', '')}${s === 'done' ? ', done' : s === 'in-progress' ? ', learning' : ''}${lessonCount ? `, ${lessonCount} Chaduvuko lesson${lessonCount > 1 ? 's' : ''}` : ''}`}
                  onClick={() => setSelected(node.id)}
                  className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    position: 'absolute',
                    left: node.x ?? 0, top: node.y ?? 0,
                    width: node.width ?? 0, height: node.height ?? 0,
                    borderRadius: 10,
                    cursor: 'pointer',
                    opacity: muted ? 0.6 : 1,
                    background: muted ? 'var(--surface)' : p.bg,
                    border: s === 'not-started' ? `1.5px solid ${muted ? 'var(--border)' : p.border}` : `2px solid ${p.solid}`,
                    borderLeft: `3px solid ${muted ? 'var(--border)' : p.solid}`,
                    boxShadow: s === 'not-started' ? (muted ? 'none' : '0 2px 8px rgba(0,0,0,.1)') : `0 3px 14px ${p.solid}30`,
                    outline: selected === node.id ? `2px solid ${p.solid}` : undefined,
                    outlineOffset: 3,
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '6px 8px 0 10px' }}>
                    <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '.07em', textTransform: 'uppercase' as const, padding: '2px 8px', borderRadius: 20, background: s === 'in-progress' ? p.solid : muted ? 'var(--surface)' : p.bg, color: s === 'in-progress' ? '#fff' : muted ? 'var(--muted)' : p.text, border: `0.5px solid ${muted ? 'var(--border)' : p.border}`, lineHeight: 1.5 }}>
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
                  <span title={node.title} style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: '2px 8px 0 10px', fontSize: 12, fontWeight: 500, lineHeight: 1.3, color: muted ? 'var(--muted)' : p.text }}>
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
