'use client'
import { useState, useEffect, useCallback } from 'react'
import type { RoadmapNode } from '@/data/roadmaps/types'

interface Props {
  roadmapId: string
  nodes: RoadmapNode[]
  refreshKey?: number
}

export function RoadmapProgress({ roadmapId, nodes, refreshKey }: Props) {
  const [done, setDone] = useState(0)
  const [inProgress, setInProgress] = useState(0)
  const total = nodes.length

  const recalc = useCallback(() => {
    let d = 0, p = 0
    nodes.forEach(n => {
      const v = localStorage.getItem(`chaduvuko_rm_${roadmapId}_${n.id}`)
      if (v === 'done') d++
      else if (v === 'in-progress') p++
    })
    setDone(d)
    setInProgress(p)
  }, [roadmapId, nodes])

  useEffect(() => { recalc() }, [recalc, refreshKey])

  const pct = Math.round((done / total) * 100)

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: '16px 20px',
      marginBottom: 32,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>
            {done} / {total} complete
          </span>
          {inProgress > 0 && (
            <span style={{ fontSize: 12, color: '#0078d4' }}>
              {inProgress} in progress
            </span>
          )}
          {done === 0 && inProgress === 0 && (
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>
              Click any node to track progress · saved in your browser
            </span>
          )}
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: pct === 100 ? 'var(--green)' : 'var(--muted)' }}>
          {pct}%
        </span>
      </div>
      <div style={{ height: 6, background: 'var(--bg)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: pct === 100 ? 'var(--green)' : 'linear-gradient(90deg, var(--green), #00b4d8)',
          borderRadius: 3,
          transition: 'width 0.4s ease',
        }} />
      </div>
      {done > 0 && (
        <div style={{ marginTop: 10, display: 'flex', gap: 12 }}>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>Done</span>
          </div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0078d4', display: 'inline-block' }} />
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>In progress</span>
          </div>
          <button
            onClick={() => {
              nodes.forEach(n => localStorage.removeItem(`chaduvuko_rm_${roadmapId}_${n.id}`))
              recalc()
            }}
            style={{
              marginLeft: 'auto', fontSize: 11, color: 'var(--muted)', background: 'none',
              border: 'none', cursor: 'pointer', textDecoration: 'underline',
            }}
          >
            Reset progress
          </button>
        </div>
      )}
    </div>
  )
}