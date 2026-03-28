'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Roadmap, RoadmapNode, NodeState } from '@/data/roadmaps/types'

interface Props { roadmap: Roadmap }

const P = {
  required:    { solid: '#0a8c3e', bg: '#e6f9ed', border: '#7dd4a4', text: '#053d1b', xpBg: '#065f2c', xpText: '#a8f0c0', label: 'Required' },
  optional:    { solid: '#555e6c', bg: 'var(--surface)', border: 'var(--border)', text: 'var(--muted)', xpBg: 'var(--bg2)', xpText: 'var(--muted)', label: 'Optional' },
  recommended: { solid: '#b06a00', bg: '#fff3d6', border: '#f0c060', text: '#7a4a00', xpBg: '#7a4a00', xpText: '#fff3d6', label: 'Recommended' },
  chaduvuko:   { solid: '#6c4fc9', bg: '#ece8ff', border: '#b8a8f0', text: '#2d1780', xpBg: '#3d26a0', xpText: '#c8baff', label: '✦ Chaduvuko' },
} as const

const DIFF = {
  beginner:     { c: '#065f2c', bg: '#d4f5e2' },
  intermediate: { c: '#7a4a00', bg: '#fff3d6' },
  advanced:     { c: '#8b0000', bg: '#fde8e8' },
} as const

function getInitialStates(roadmap: Roadmap): Record<string, NodeState> {
  const s: Record<string, NodeState> = {}
  roadmap.nodes.forEach(n => { s[n.id] = (n.prerequisites ?? []).length === 0 ? 'available' : 'locked' })
  return s
}

function propagateUnlocks(states: Record<string, NodeState>, nodes: RoadmapNode[]): Record<string, NodeState> {
  const next = { ...states }
  nodes.forEach(n => {
    if (next[n.id] === 'locked' && (n.prerequisites ?? []).every(p => next[p] === 'done')) next[n.id] = 'available'
  })
  return next
}

function propagateLocks(states: Record<string, NodeState>, nodes: RoadmapNode[]): Record<string, NodeState> {
  const next = { ...states }
  let changed = true
  while (changed) {
    changed = false
    nodes.forEach(n => {
      if (!(n.prerequisites ?? []).length) return
      if ((next[n.id] === 'available' || next[n.id] === 'in-progress') && !(n.prerequisites ?? []).every(p => next[p] === 'done')) {
        next[n.id] = 'locked'
        changed = true
      }
    })
  }
  return next
}

export default function SkillTree({ roadmap }: Props) {
  const KEY = `chaduvuko_rm_${roadmap.id}`
  const [mounted, setMounted] = useState(false)
  const [states, setStates] = useState<Record<string, NodeState>>(() => getInitialStates(roadmap))
  const [selected, setSelected] = useState<string | null>(null)
  const [xpTotal, setXpTotal] = useState(0)
  const [displayXp, setDisplayXp] = useState(0)
  const [todayCount, setTodayCount] = useState(0)
  const [hiddenTypes, setHiddenTypes] = useState<Set<string>>(new Set())
  const [salaryVisible, setSalaryVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem(KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        const loaded = parsed.states || getInitialStates(roadmap)
        setStates(loaded)
        setXpTotal(parsed.xp || 0)
        setDisplayXp(parsed.xp || 0)
        if (Object.values(loaded).filter(s => s === 'done').length >= 5) setSalaryVisible(true)
      }
    } catch {}
  }, [KEY, roadmap])

  useEffect(() => {
    if (!mounted) return
    try { localStorage.setItem(KEY, JSON.stringify({ states, xp: xpTotal })) } catch {}
  }, [states, xpTotal, mounted, KEY])

  useEffect(() => {
    if (displayXp === xpTotal) return
    const diff = xpTotal - displayXp
    const step = Math.ceil(Math.abs(diff) / 12)
    const timer = setInterval(() => {
      setDisplayXp(prev => {
        const next = diff > 0 ? Math.min(prev + step, xpTotal) : Math.max(prev - step, xpTotal)
        if (next === xpTotal) clearInterval(timer)
        return next
      })
    }, 20)
    return () => clearInterval(timer)
  }, [xpTotal, displayXp])

  const markDone = useCallback((id: string) => {
    const node = roadmap.nodes.find(n => n.id === id)
    if (!node) return
    setStates(prev => propagateUnlocks({ ...prev, [id]: 'done' }, roadmap.nodes))
    setXpTotal(prev => prev + (node.xp ?? 0))
    setTodayCount(prev => prev + 1)
  }, [roadmap.nodes])

  const markProgress = useCallback((id: string) => {
    setStates(prev => ({ ...prev, [id]: 'in-progress' }))
  }, [])

  const markReset = useCallback((id: string) => {
    const node = roadmap.nodes.find(n => n.id === id)
    if (!node) return
    setStates(prev => propagateLocks({ ...prev, [id]: 'available' }, roadmap.nodes))
    if (states[id] === 'done') setXpTotal(prev => Math.max(0, prev - (node.xp ?? 0)))
  }, [roadmap.nodes, states])

  const toggleFilter = (ty: string) => {
    setHiddenTypes(prev => {
      const next = new Set(prev)
      next.has(ty) ? next.delete(ty) : next.add(ty)
      return next
    })
  }

  const doneCount = Object.values(states).filter(s => s === 'done').length
  const availCount = Object.values(states).filter(s => s === 'available' || s === 'in-progress').length
  const selectedNode = selected ? roadmap.nodes.find(n => n.id === selected) : null
  const selectedState = selected ? states[selected] : null

  useEffect(() => { if (doneCount >= 5) setSalaryVisible(true) }, [doneCount])

  const canvasW = Math.max(...roadmap.nodes.map(n => (n.x ?? 0) + (n.width ?? 0))) + 40
  const canvasH = Math.max(...roadmap.nodes.map(n => (n.y ?? 0) + (n.height ?? 0))) + 40

  if (!mounted) return null

  const xpPillStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 8,
    background: '#065f2c', border: '1.5px solid #0a8c3e',
    borderRadius: 20, padding: '6px 14px',
  }

  return (
    <div style={{ background: 'var(--bg2)', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)' }}>

      {/* Stats */}
      <div style={{ background: 'var(--bg)', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', borderBottom: '1px solid var(--border)' }}>
        <div style={xpPillStyle}>
          <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: '#6ee9a0' }}>XP</span>
          <span style={{ fontSize: 18, fontWeight: 500, color: '#ffffff', fontFamily: 'monospace', minWidth: 36 }}>{displayXp}</span>
        </div>
        <span style={{ fontSize: 12, color: 'var(--muted)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: '4px 12px' }}>
          <b style={{ color: 'var(--text)', fontWeight: 700 }}>{doneCount}</b> / {roadmap.nodes.length} done
        </span>
        <span style={{ fontSize: 12, color: 'var(--muted)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: '4px 12px' }}>
          <b style={{ color: 'var(--text)', fontWeight: 700 }}>{availCount}</b> available
        </span>
        {todayCount > 0 && (
          <span style={{ fontSize: 11, fontWeight: 500, color: '#7a4a00', background: '#fff3d6', border: '1px solid #f0c060', borderRadius: 20, padding: '4px 12px', marginLeft: 'auto' }}>
            {todayCount} node{todayCount > 1 ? 's' : ''} today
          </span>
        )}
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
            onClick={() => toggleFilter(f.ty)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 13px', borderRadius: 20, fontSize: 11, fontWeight: 500,
              cursor: 'pointer', border: `1.5px solid ${f.borderC}`,
              background: f.bg, color: f.color,
              opacity: hiddenTypes.has(f.ty) ? 0.2 : 1,
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
          <svg style={{ position: 'absolute', top: 0, left: 0, width: canvasW, height: canvasH, pointerEvents: 'none' }}>
            {(roadmap.edges ?? []).map(edge => {
              const a = roadmap.nodes.find(n => n.id === edge.from)
              const b = roadmap.nodes.find(n => n.id === edge.to)
              if (!a || !b) return null
              const ax = (a.x ?? 0) + (a.width ?? 0) / 2, ay = (a.y ?? 0) + (a.height ?? 0)
              const bx = (b.x ?? 0) + (b.width ?? 0) / 2, by = (b.y ?? 0)
              const my = (ay + by) / 2
              const sa = states[edge.from], sb = states[edge.to]
              const col = P[b.type].solid
              const isDone = sa === 'done' && sb === 'done'
              const isActive = sa === 'done' && (sb === 'available' || sb === 'in-progress')
              return (
                <path
                  key={`${edge.from}-${edge.to}`}
                  d={`M${ax},${ay} C${ax},${my} ${bx},${my} ${bx},${by}`}
                  fill="none"
                  stroke={isDone ? col : isActive ? col : '#888'}
                  strokeOpacity={isDone ? 1 : isActive ? 0.4 : 0.18}
                  strokeWidth={isDone ? 2 : isActive ? 1.5 : 1}
                  strokeDasharray={isDone ? '7,3' : isActive ? 'none' : '4,4'}
                />
              )
            })}
          </svg>

          {/* Nodes */}
          {roadmap.nodes.map(node => {
            if (hiddenTypes.has(node.type)) return null
            const s = states[node.id]
            const p = P[node.type]
            const isSelected = selected === node.id
            const isLocked = s === 'locked'

            const baseStyle: React.CSSProperties = {
              position: 'absolute',
              left: node.x ?? 0, top: node.y ?? 0,
              width: node.width ?? 0, height: node.height ?? 0,
              borderRadius: 10,
              cursor: isLocked ? 'not-allowed' : 'pointer',
              transition: 'transform .15s, box-shadow .15s',
              outline: isSelected ? `2px solid ${p.solid}` : 'none',
              outlineOffset: 3,
              opacity: isLocked ? 0.55 : 1,
            }

            const stateStyle: React.CSSProperties = isLocked ? {
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderLeft: '3px solid var(--border)',
            } : s === 'available' ? {
              background: p.bg,
              border: `1.5px solid ${p.border}`,
              borderLeft: `3px solid ${p.solid}`,
              boxShadow: '0 2px 8px rgba(0,0,0,.1)',
            } : s === 'in-progress' ? {
              background: p.bg,
              border: `2px solid ${p.solid}`,
              borderLeft: `3px solid ${p.solid}`,
              boxShadow: `0 3px 14px ${p.solid}30`,
            } : {
              background: p.bg,
              border: `2px solid ${p.solid}`,
              borderLeft: `3px solid ${p.solid}`,
              boxShadow: `0 3px 14px ${p.solid}30`,
            }

            const titleColor = isLocked ? 'var(--muted)' : p.text
            const xpBg = isLocked ? 'var(--bg2)' : p.xpBg
            const xpColor = isLocked ? 'var(--muted)' : p.xpText
            const badgeLabel = s === 'in-progress' ? 'In progress' : p.label
            const badgeBg = isLocked ? 'var(--surface)' : s === 'in-progress' ? p.xpBg : p.bg
            const badgeColor = isLocked ? 'var(--muted)' : s === 'in-progress' ? p.xpText : p.text
            const badgeBorder = isLocked ? 'var(--border)' : p.border

            return (
              <div
                key={node.id}
                style={{ ...baseStyle, ...stateStyle }}
                onClick={() => setSelected(node.id)}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '7px 8px 0 10px' }}>
                  <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '.07em', textTransform: 'uppercase' as const, padding: '2px 8px', borderRadius: 20, background: badgeBg, color: badgeColor, border: `0.5px solid ${badgeBorder}`, lineHeight: 1.5 }}>
                    {badgeLabel}
                  </span>
                  {s === 'done' && (
                    <span style={{ fontSize: 11, fontWeight: 500, width: 17, height: 17, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: p.solid, color: '#fff', flexShrink: 0 }}>✓</span>
                  )}
                  {s === 'in-progress' && <span style={{ fontSize: 8, color: p.solid }}>●</span>}
                  {isLocked && <span style={{ fontSize: 12, color: 'var(--border)' }}>⊘</span>}
                </div>
                <div style={{ padding: '2px 8px 0 10px', fontSize: 12, fontWeight: 500, lineHeight: 1.3, color: titleColor }}>
                  {node.title}
                </div>
                <div style={{ padding: '3px 8px 0 10px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 500, fontFamily: 'monospace', background: xpBg, color: xpColor }}>
                    +{node.xp} XP{s === 'done' ? ' ✓' : ''}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Detail card */}
      {selectedNode && selectedState && (
        <div style={{ padding: '0 18px 14px', background: 'var(--bg2)' }}>
          <div style={{ background: 'var(--bg)', borderRadius: 12, padding: '20px 22px', border: '1px solid var(--border)', borderTop: `3px solid ${selectedState === 'locked' ? 'var(--border)' : P[selectedNode.type].solid}` }}>
            {selectedState === 'locked' ? (
              <>
                <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'var(--muted)', marginBottom: 6 }}>Locked</div>
                <div style={{ fontSize: 18, fontWeight: 500, color: 'var(--muted)', marginBottom: 10, opacity: 0.5 }}>{selectedNode.title}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>Complete these first:</div>
                <div>
                  {(selectedNode.prerequisites ?? []).filter(p => states[p] !== 'done').map(pr => {
                    const pp = P[roadmap.nodes.find(n => n.id === pr)!.type]
                    return (
                      <span key={pr} style={{ display: 'inline-block', padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 500, margin: 2, background: pp.bg, color: pp.text, border: `0.5px solid ${pp.border}` }}>
                        {roadmap.nodes.find(n => n.id === pr)!.title}
                      </span>
                    )
                  })}
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: P[selectedNode.type].solid, marginBottom: 6 }}>
                  {P[selectedNode.type].label} · +{selectedNode.xp} XP
                </div>
                <div style={{ fontSize: 20, fontWeight: 500, color: 'var(--text)', marginBottom: 8, lineHeight: 1.2 }}>{selectedNode.title}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.72, marginBottom: 13 }}>{selectedNode.description}</div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' as const, marginBottom: (selectedNode.prerequisites ?? []).length ? 14 : 0 }}>
                  {selectedNode.time && (
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                      <b style={{ color: 'var(--text)', fontWeight: 500, marginRight: 5 }}>Time</b>{selectedNode.time}
                    </span>
                  )}
                  <span style={{ fontSize: 12 }}>
                    <b style={{ color: 'var(--text)', fontWeight: 500, marginRight: 5 }}>Level</b>
                    <span style={{ padding: '1px 8px', borderRadius: 20, fontSize: 11, background: DIFF[selectedNode.difficulty].bg, color: DIFF[selectedNode.difficulty].c }}>
                      {selectedNode.difficulty}
                    </span>
                  </span>
                  <span style={{ fontSize: 12 }}>
                    <b style={{ color: 'var(--text)', fontWeight: 500, marginRight: 5 }}>XP</b>
                    <span style={{ padding: '2px 9px', borderRadius: 20, background: P[selectedNode.type].xpBg, color: P[selectedNode.type].xpText, fontFamily: 'monospace', fontSize: 11 }}>
                      +{selectedNode.xp}
                    </span>
                  </span>
                </div>
                {(selectedNode.prerequisites ?? []).length > 0 && (
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'var(--muted)', marginBottom: 5 }}>Prerequisites</div>
                    {(selectedNode.prerequisites ?? []).map(pr => {
                      const pnode = roadmap.nodes.find(n => n.id === pr)!
                      const done = states[pr] === 'done'
                      const pp = P[pnode.type]
                      return (
                        <span key={pr} style={{ display: 'inline-block', padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 500, margin: 2, background: done ? pp.bg : 'var(--surface)', color: done ? pp.text : 'var(--muted)', border: `0.5px solid ${done ? pp.border : 'var(--border)'}` }}>
                          {done ? '✓ ' : ''}{pnode.title}
                        </span>
                      )
                    })}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' as const, marginTop: 14 }}>
                  <button
                    onClick={() => selectedState === 'done' ? markReset(selectedNode.id) : markDone(selectedNode.id)}
                    style={{ padding: '8px 18px', borderRadius: 9, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: 'none', background: selectedState === 'done' ? 'var(--surface)' : P[selectedNode.type].solid, color: selectedState === 'done' ? 'var(--muted)' : '#fff', outline: selectedState === 'done' ? '1px solid var(--border)' : 'none' }}
                  >
                    {selectedState === 'done' ? '✓ Done — click to reset' : 'Mark as done'}
                  </button>
                  {selectedState !== 'done' && (
                    <button onClick={() => markProgress(selectedNode.id)} style={{ padding: '8px 18px', borderRadius: 9, fontSize: 12, fontWeight: 500, cursor: 'pointer', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
                      ↻ In progress
                    </button>
                  )}
                  {selectedNode.href && (
                    <a href={selectedNode.href} style={{ padding: '8px 18px', borderRadius: 9, fontSize: 12, fontWeight: 500, cursor: 'pointer', background: P[selectedNode.type].bg, border: `1px solid ${P[selectedNode.type].border}`, color: P[selectedNode.type].text, textDecoration: 'none', display: 'inline-block' }}>
                      Open tutorial →
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Salary reveal */}
      {salaryVisible && roadmap.salaryData && (
        <div style={{ padding: '0 18px 22px', background: 'var(--bg2)' }}>
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase' as const, color: '#0a8c3e' }}>Reward — unlocked after 5 nodes complete</div>
            <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)', marginTop: 5 }}>{roadmap.title} salaries · India 2026</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2, marginBottom: 14 }}>Bangalore · 2–4 yrs exp · Glassdoor, Naukri, AmbitionBox</div>
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
  )
}
