

'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Roadmap, RoadmapNode, NodeState } from '@/data/roadmaps/types'

interface Props {
  roadmap: Roadmap
}

const TYPE_CFG = {
  required:    { color: '#00e676', label: 'Required' },
  optional:    { color: '#888888', label: 'Optional' },
  recommended: { color: '#ff9900', label: 'Recommended' },
  chaduvuko:   { color: '#7b61ff', label: 'Chaduvuko' },
} as const

const DIFF_COLOR = {
  beginner:     '#00e676',
  intermediate: '#ff9900',
  advanced:     '#ff4757',
} as const

function getInitialStates(roadmap: Roadmap): Record<string, NodeState> {
  const s: Record<string, NodeState> = {}
  roadmap.nodes.forEach(n => {
    s[n.id] = (n.prerequisites ?? []).length === 0 ? 'available' : 'locked'
  })
  return s
}

function propagateUnlocks(
  states: Record<string, NodeState>,
  nodes: RoadmapNode[]
): Record<string, NodeState> {
  const next = { ...states }
  nodes.forEach(n => {
    if (next[n.id] === 'locked' && (n.prerequisites ?? []).every(p => next[p] === 'done')) {
      next[n.id] = 'available'
    }
  })
  return next
}

function propagateLocks(
  states: Record<string, NodeState>,
  nodes: RoadmapNode[]
): Record<string, NodeState> {
  const next = { ...states }
  let changed = true
  while (changed) {
    changed = false
    nodes.forEach(n => {
      if ((n.prerequisites ?? []).length === 0) return
      if (next[n.id] !== 'locked' && !(n.prerequisites ?? []).every(p => next[p] === 'done')) {
        if (next[n.id] === 'available' || next[n.id] === 'in-progress') {
          next[n.id] = 'locked'
          changed = true
        }
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
        const p = JSON.parse(saved)
        const loadedStates = p.states || getInitialStates(roadmap)
        setStates(loadedStates)
        setXpTotal(p.xp || 0)
        setDisplayXp(p.xp || 0)
        const doneCount = Object.values(loadedStates).filter(s => s === 'done').length
        if (doneCount >= 5) setSalaryVisible(true)
      }
    } catch {}
  }, [KEY, roadmap])

  useEffect(() => {
    if (!mounted) return
    try { localStorage.setItem(KEY, JSON.stringify({ states, xp: xpTotal })) } catch {}
  }, [states, xpTotal, mounted, KEY])

  // Animate XP counter
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
    setStates(prev => {
      const next = propagateLocks({ ...prev, [id]: 'available' }, roadmap.nodes)
      return next
    })
    if (states[id] === 'done') {
      setXpTotal(prev => Math.max(0, prev - (node.xp ?? 0)))
    }
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

  useEffect(() => {
    if (doneCount >= 5) setSalaryVisible(true)
  }, [doneCount])

  const canvasW = Math.max(...roadmap.nodes.map(n => (n.x ?? 0) + (n.width ?? 0))) + 40
  const canvasH = Math.max(...roadmap.nodes.map(n => (n.y ?? 0) + (n.height ?? 0))) + 40

  if (!mounted) return null

  return (
    <div style={{ background: 'var(--bg)', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)' }}>

      {/* Stats bar */}
      <div style={{ background: 'var(--bg2)', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,230,118,.05)', border: '1px solid rgba(0,230,118,.15)', borderRadius: 20, padding: '5px 14px' }}>
          <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: 'var(--green)' }}>XP</span>
          <span style={{ fontSize: 18, fontWeight: 900, color: 'var(--green)', fontFamily: 'monospace', minWidth: 44 }}>{displayXp}</span>
        </div>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>
          <b style={{ color: 'var(--text)', fontWeight: 700 }}>{doneCount}</b> / {roadmap.nodes.length} complete
        </span>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>
          <b style={{ color: 'var(--text)', fontWeight: 700 }}>{availCount}</b> available
        </span>
        {todayCount > 0 && (
          <span style={{ fontSize: 11, color: '#ff9900', background: 'rgba(255,153,0,.06)', border: '1px solid rgba(255,153,0,.15)', borderRadius: 20, padding: '3px 11px', marginLeft: 'auto' }}>
            {todayCount} node{todayCount > 1 ? 's' : ''} today
          </span>
        )}
      </div>

      {/* Filters */}
      <div style={{ padding: '9px 18px', display: 'flex', gap: 6, flexWrap: 'wrap' as const, borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
        {(['required', 'optional', 'chaduvuko'] as const).map(ty => {
          const cfg = TYPE_CFG[ty]
          const hidden = hiddenTypes.has(ty)
          return (
            <button
              key={ty}
              onClick={() => toggleFilter(ty)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${cfg.color}${hidden ? '20' : '40'}`, background: hidden ? 'transparent' : `${cfg.color}08`, color: hidden ? 'rgba(255,255,255,.1)' : cfg.color, transition: 'all .15s' }}
            >
              <span style={{ width: 8, height: 8, borderRadius: 2, background: hidden ? 'rgba(255,255,255,.08)' : cfg.color, flexShrink: 0 }} />
              {ty === 'chaduvuko' ? '✦ Chaduvuko' : cfg.label}
            </button>
          )
        })}
      </div>

      {/* Tree canvas */}
      <div style={{ overflowX: 'auto', padding: '24px 18px 8px', background: 'var(--bg)' }}>
        <div style={{ position: 'relative', width: canvasW, height: canvasH }}>

          {/* SVG edges */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: canvasW, height: canvasH, pointerEvents: 'none' }}>
            {(roadmap.edges ?? []).map(edge => {
              const a = roadmap.nodes.find(n => n.id === edge.from)
              const b = roadmap.nodes.find(n => n.id === edge.to)
              if (!a || !b) return null
              const ax = (a.x ?? 0) + (a.width ?? 0) / 2, ay = (a.y ?? 0) + (a.height ?? 0)
              const bx = (b.x ?? 0) + (b.width ?? 0) / 2, by = (b.y ?? 0)
              const my = (ay + by) / 2
              const sa = states[edge.from], sb = states[edge.to]
              const col = TYPE_CFG[b.type].color
              const isDone = sa === 'done' && sb === 'done'
              const isActive = sa === 'done' && (sb === 'available' || sb === 'in-progress')
              return (
                <path
                  key={`${edge.from}-${edge.to}`}
                  d={`M${ax},${ay} C${ax},${my} ${bx},${my} ${bx},${by}`}
                  fill="none"
                  stroke={isDone ? col + 'cc' : isActive ? col + '55' : 'rgba(255,255,255,.05)'}
                  strokeWidth={1.5}
                  strokeDasharray={isDone ? '8,3' : isActive ? 'none' : '4,4'}
                />
              )
            })}
          </svg>

          {/* Nodes */}
          {roadmap.nodes.map(node => {
            if (hiddenTypes.has(node.type)) return null
            const s = states[node.id]
            const col = TYPE_CFG[node.type].color
            const isSelected = selected === node.id

            const baseStyle: React.CSSProperties = {
              position: 'absolute',
              left: node.x ?? 0,
              top: node.y ?? 0,
              width: node.width ?? 0,
              height: node.height ?? 0,
              borderRadius: 10,
              cursor: s === 'locked' ? 'not-allowed' : 'pointer',
              transition: 'transform .16s, box-shadow .2s',
              outline: isSelected ? `2px solid ${col}` : 'none',
              outlineOffset: 3,
            }

            const stateStyle: React.CSSProperties = s === 'locked'
              ? { background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.05)', borderLeft: '4px solid rgba(255,255,255,.04)' }
              : s === 'available'
              ? { background: 'var(--surface)', border: `1px solid ${col}40`, borderLeft: `4px solid ${col}` }
              : s === 'in-progress'
              ? { background: `${col}0d`, border: `1px solid ${col}70`, borderLeft: `4px solid ${col}`, boxShadow: `0 0 14px ${col}18` }
              : { background: `${col}14`, border: `1px solid ${col}`, borderLeft: `4px solid ${col}`, boxShadow: `0 0 20px ${col}22` }

            return (
              <div key={node.id} style={{ ...baseStyle, ...stateStyle }} onClick={() => setSelected(node.id)}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '8px 8px 0 11px' }}>
                  {s !== 'locked' ? (
                    <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase' as const, padding: '2px 7px', borderRadius: 20, background: `${col}${s === 'done' ? '28' : '18'}`, color: col, border: `1px solid ${col}${s === 'done' ? '55' : '35'}` }}>
                      {s === 'in-progress' ? 'In progress' : node.type === 'chaduvuko' ? '✦' : TYPE_CFG[node.type].label}
                    </span>
                  ) : <span />}
                  {s === 'done' && (
                    <span style={{ fontSize: 10, fontWeight: 900, width: 17, height: 17, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: col, color: node.type === 'required' ? '#000' : '#fff', flexShrink: 0 }}>✓</span>
                  )}
                  {s === 'in-progress' && <span style={{ fontSize: 8, color: col }}>●</span>}
                  {s === 'locked' && <span style={{ fontSize: 12, color: 'rgba(255,255,255,.08)' }}>⊘</span>}
                </div>
                <div style={{ padding: '3px 9px 0 11px', fontSize: 12, fontWeight: 700, lineHeight: 1.25, color: s === 'locked' ? 'rgba(255,255,255,.1)' : s === 'done' ? 'var(--text)' : s === 'in-progress' ? '#ddd' : '#aaa' }}>
                  {node.title}
                </div>
                <div style={{ padding: '3px 9px 0 11px' }}>
                  <span style={{ fontSize: 10, fontWeight: 800, fontFamily: 'monospace', color: s === 'done' ? 'rgba(255,255,255,.18)' : s === 'locked' ? 'rgba(255,255,255,.06)' : col }}>
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
        <div style={{ padding: '0 18px 14px', background: 'var(--bg)' }}>
          <div style={{ background: 'var(--surface)', borderRadius: 12, padding: '20px 22px', border: '1px solid var(--border)', borderTop: `2.5px solid ${TYPE_CFG[selectedNode.type].color}` }}>
            {selectedState === 'locked' ? (
              <>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.13em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,.15)', marginBottom: 6 }}>Locked</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: 'rgba(255,255,255,.18)', marginBottom: 10 }}>{selectedNode.title}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.1)', marginBottom: 8, fontStyle: 'italic' }}>Complete these to unlock:</div>
                <div>
                  {(selectedNode.prerequisites ?? []).filter(p => states[p] !== 'done').map(p => {
                    const pn = roadmap.nodes.find(n => n.id === p)!
                    return (
                      <span key={p} style={{ display: 'inline-block', padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 700, margin: 2, background: `${TYPE_CFG[pn.type].color}18`, color: TYPE_CFG[pn.type].color, border: `1px solid ${TYPE_CFG[pn.type].color}40` }}>
                        {pn.title}
                      </span>
                    )
                  })}
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.13em', textTransform: 'uppercase' as const, color: TYPE_CFG[selectedNode.type].color, marginBottom: 6 }}>
                  {selectedNode.type === 'chaduvuko' ? '✦ Chaduvuko Project' : TYPE_CFG[selectedNode.type].label} · +{selectedNode.xp} XP
                </div>
                <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-.6px', color: 'var(--text)', marginBottom: 8, lineHeight: 1.15 }}>{selectedNode.title}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.72, marginBottom: 13, fontStyle: 'italic' }}>{selectedNode.description}</div>
                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' as const, marginBottom: 14 }}>
                  {selectedNode.time && <span style={{ fontSize: 12, color: 'var(--muted)' }}><b style={{ color: 'rgba(255,255,255,.3)', marginRight: 5, fontWeight: 700 }}>Time</b>{selectedNode.time}</span>}
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}><b style={{ color: 'rgba(255,255,255,.3)', marginRight: 5, fontWeight: 700 }}>Level</b><span style={{ color: DIFF_COLOR[selectedNode.difficulty] }}>{selectedNode.difficulty}</span></span>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}><b style={{ color: 'rgba(255,255,255,.3)', marginRight: 5, fontWeight: 700 }}>XP</b><span style={{ color: TYPE_CFG[selectedNode.type].color }}>+{selectedNode.xp}</span></span>
                </div>
                {(selectedNode.prerequisites ?? []).length > 0 && (
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,.12)', marginBottom: 5 }}>Prerequisites</div>
                    {(selectedNode.prerequisites ?? []).map(p => {
                      const pn = roadmap.nodes.find(n => n.id === p)!
                      const done = states[p] === 'done'
                      return (
                        <span key={p} style={{ display: 'inline-block', padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 700, margin: 2, background: done ? `${TYPE_CFG[pn.type].color}22` : 'rgba(255,255,255,.03)', color: done ? TYPE_CFG[pn.type].color : 'rgba(255,255,255,.2)', border: `1px solid ${done ? TYPE_CFG[pn.type].color + '45' : 'rgba(255,255,255,.06)'}` }}>
                          {done ? '✓ ' : ''}{pn.title}
                        </span>
                      )
                    })}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' as const }}>
                  <button
                    onClick={() => selectedState === 'done' ? markReset(selectedNode.id) : markDone(selectedNode.id)}
                    style={{ padding: '8px 18px', borderRadius: 9, fontSize: 12, fontWeight: 800, cursor: 'pointer', border: 'none', background: selectedState === 'done' ? 'rgba(255,255,255,.04)' : TYPE_CFG[selectedNode.type].color, color: selectedState === 'done' ? 'rgba(255,255,255,.25)' : selectedNode.type === 'required' ? '#000' : '#fff', transition: 'all .13s' }}
                  >
                    {selectedState === 'done' ? '✓ Done — click to reset' : 'Mark as done'}
                  </button>
                  {selectedState !== 'done' && (
                    <button
                      onClick={() => markProgress(selectedNode.id)}
                      style={{ padding: '8px 18px', borderRadius: 9, fontSize: 12, fontWeight: 800, cursor: 'pointer', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', color: 'rgba(255,255,255,.3)' }}
                    >
                      ↻ In progress
                    </button>
                  )}
                  {selectedNode.href && (
                    <a
                      href={selectedNode.href}
                      style={{ padding: '8px 18px', borderRadius: 9, fontSize: 12, fontWeight: 800, cursor: 'pointer', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', color: TYPE_CFG[selectedNode.type].color, textDecoration: 'none', display: 'inline-block' }}
                    >
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
        <div style={{ padding: '0 18px 22px', background: 'var(--bg)' }}>
          <div style={{ background: 'var(--bg2)', border: '1px solid rgba(0,230,118,.1)', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.13em', textTransform: 'uppercase' as const, color: 'var(--green)', marginBottom: 6 }}>Reward — unlocked after 5 nodes complete</div>
            <div style={{ fontSize: 15, fontWeight: 900, color: 'var(--text)', marginBottom: 3 }}>{roadmap.title} salaries · India 2026</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 14 }}>Bangalore · 2–4 yrs exp · Glassdoor, Naukri, AmbitionBox</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(130px,1fr))', gap: 7 }}>
              {roadmap.salaryData.map((s, i) => (
                <div key={i} style={{ background: 'var(--surface)', borderRadius: 9, padding: '12px 13px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 9, color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase' as const, letterSpacing: '.06em', marginBottom: 3 }}>{s.company}</div>
                  <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--text)' }}>{s.range}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,.2)', marginTop: 2 }}>{s.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}