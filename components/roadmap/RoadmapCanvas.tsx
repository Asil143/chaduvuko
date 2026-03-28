'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import type { Roadmap, RoadmapNode } from '@/data/roadmaps/types'

interface Props {
  roadmap: Roadmap
  onProgressChange?: () => void
}

type Status = 'not-started' | 'in-progress' | 'done'

const NODE_COLORS: Record<string, { border: string; bg: string; label: string }> = {
  required:      { border: '#00e676', bg: 'rgba(0,230,118,0.06)',  label: 'Required' },
  recommended:   { border: '#0078d4', bg: 'rgba(0,120,212,0.06)',  label: 'Recommended' },
  optional:      { border: 'rgba(255,255,255,0.12)', bg: 'var(--surface)', label: 'Optional' },
  chaduvuko:     { border: '#7b61ff', bg: 'rgba(123,97,255,0.08)', label: 'Chaduvuko' },
}

function getKey(roadmapId: string, nodeId: string) {
  return `chaduvuko_rm_${roadmapId}_${nodeId}`
}

function NodePill({
  node, roadmapId, isOpen, onToggle, statusMap,
}: {
  node: RoadmapNode
  roadmapId: string
  isOpen: boolean
  onToggle: (id: string) => void
  statusMap: Record<string, Status>
}) {
  const c = NODE_COLORS[node.type]
  const status = statusMap[node.id] ?? 'not-started'

  return (
    <button
      onClick={() => onToggle(node.id)}
      style={{
        padding: '8px 14px',
        borderRadius: 8,
        border: `1.5px solid ${isOpen ? c.border : 'var(--border)'}`,
        background: isOpen ? c.bg : 'var(--surface)',
        color: status === 'done' ? 'var(--muted)' : 'var(--text)',
        fontSize: 13,
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.15s',
        position: 'relative',
        minWidth: 120,
        maxWidth: 200,
        textAlign: 'center',
        lineHeight: 1.35,
        textDecoration: status === 'done' ? 'line-through' : 'none',
        opacity: status === 'done' ? 0.55 : 1,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
      title={node.title}
    >
      {node.type === 'chaduvuko' && (
        <span style={{ color: '#7b61ff', marginRight: 4, fontSize: 11 }}>✦</span>
      )}
      {node.title}
      {status !== 'not-started' && (
        <span style={{
          position: 'absolute', top: -5, right: -5,
          width: 14, height: 14, borderRadius: '50%',
          background: status === 'done' ? 'var(--green)' : '#0078d4',
          fontSize: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#000', fontWeight: 800, border: '1.5px solid var(--bg)',
          lineHeight: 1,
        }}>
          {status === 'done' ? '✓' : '◉'}
        </span>
      )}
    </button>
  )
}

function InlineCard({
  node, roadmapId, status, onStatusChange, onClose,
}: {
  node: RoadmapNode
  roadmapId: string
  status: Status
  onStatusChange: (id: string, status: Status) => void
  onClose: () => void
}) {
  const c = NODE_COLORS[node.type]

  function cycleStatus() {
    const next: Status =
      status === 'not-started' ? 'in-progress'
      : status === 'in-progress' ? 'done'
      : 'not-started'
    const key = getKey(roadmapId, node.id)
    if (next === 'not-started') localStorage.removeItem(key)
    else localStorage.setItem(key, next)
    onStatusChange(node.id, next)
  }

  const diffColor: Record<string, string> = {
    beginner: 'var(--green)',
    intermediate: '#ff9900',
    advanced: '#ff4757',
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: 520,
      margin: '8px auto 0',
      background: 'var(--surface)',
      border: `1px solid ${c.border}40`,
      borderRadius: 12,
      padding: '16px 18px',
      position: 'relative',
      animation: 'slideDown 0.2s ease',
    }}>
      <style>{`@keyframes slideDown { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      {/* Arrow pointing up */}
      <div style={{
        position: 'absolute', top: -7, left: '50%', transform: 'translateX(-50%)',
        width: 0, height: 0,
        borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
        borderBottom: `7px solid ${c.border}40`,
      }} />

      <button onClick={onClose} style={{
        position: 'absolute', top: 10, right: 10,
        background: 'none', border: 'none', cursor: 'pointer',
        color: 'var(--muted)', fontSize: 16, lineHeight: 1, padding: '2px 6px',
      }}>×</button>

      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '.1em',
        textTransform: 'uppercase', color: c.border, marginBottom: 5,
      }}>
        {c.label}
      </div>

      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 7 }}>
        {node.title}
      </div>

      <p style={{
        fontSize: 13, color: 'var(--muted)', lineHeight: 1.7,
        marginBottom: 12, fontFamily: 'Lora, serif', fontStyle: 'italic',
      }}>
        {node.description}
      </p>

      <div style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
        {node.time && (
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            <span style={{ color: 'var(--text)', fontWeight: 600 }}>Time</span>&nbsp;&nbsp;{node.time}
          </span>
        )}
        {node.difficulty && (
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            <span style={{ color: 'var(--text)', fontWeight: 600 }}>Level</span>&nbsp;&nbsp;
            <span style={{ color: diffColor[node.difficulty] }}>{node.difficulty}</span>
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        {node.href && (
          <Link href={node.href} style={{
            display: 'inline-block',
            padding: '7px 16px', borderRadius: 8,
            background: c.border,
            color: node.type === 'optional' ? 'var(--text)' : '#fff',
            fontSize: 12, fontWeight: 700, textDecoration: 'none',
          }}>
            {node.type === 'chaduvuko' ? '→ Open project' : '→ Go to lesson'}
          </Link>
        )}
        <button onClick={cycleStatus} style={{
          padding: '7px 14px', borderRadius: 8, fontSize: 12, cursor: 'pointer',
          border: '1px solid var(--border)',
          background: status === 'done'
            ? 'rgba(0,230,118,0.1)'
            : status === 'in-progress'
            ? 'rgba(0,120,212,0.1)'
            : 'var(--bg)',
          color: status === 'done'
            ? 'var(--green)'
            : status === 'in-progress'
            ? '#0078d4'
            : 'var(--muted)',
          fontWeight: 600,
          transition: 'all 0.15s',
        }}>
          {status === 'not-started' && '○  Mark progress'}
          {status === 'in-progress' && '↻  In progress'}
          {status === 'done' && '✓  Done'}
        </button>
      </div>
    </div>
  )
}

export function RoadmapCanvas({ roadmap, onProgressChange }: Props) {
  const [openNodeId, setOpenNodeId] = useState<string | null>(null)
  const [statusMap, setStatusMap] = useState<Record<string, Status>>({})

  // Load all statuses from localStorage on mount
  useEffect(() => {
    const map: Record<string, Status> = {}
    roadmap.nodes.forEach(n => {
      const v = localStorage.getItem(getKey(roadmap.id, n.id)) as Status | null
      if (v) map[n.id] = v
    })
    setStatusMap(map)
  }, [roadmap])

  function toggleNode(id: string) {
    setOpenNodeId(prev => prev === id ? null : id)
  }

  const handleStatusChange = useCallback((nodeId: string, status: Status) => {
    setStatusMap(prev => ({ ...prev, [nodeId]: status }))
    onProgressChange?.()
  }, [onProgressChange])

  // Group nodes by row
  const maxRow = Math.max(...roadmap.nodes.map(n => n.row ?? 0))
  const rows: RoadmapNode[][] = Array.from({ length: maxRow + 1 }, (_, i) =>
    roadmap.nodes.filter(n => (n.row ?? 0) === i).sort((a, b) => (a.col ?? 0) - (b.col ?? 0))
  )

  // Section map: row → section info
  const sectionMap: Record<number, { label: string; description?: string; color?: string }> = {}
  roadmap.sections?.forEach(s => { sectionMap[s.row] = s })

  const openNode = openNodeId ? roadmap.nodes.find(n => n.id === openNodeId) : null

  const legendItems = [
    { type: 'required', label: 'Required' },
    { type: 'recommended', label: 'Recommended' },
    { type: 'optional', label: 'Optional' },
    { type: 'chaduvuko', label: 'Chaduvuko lesson' },
  ] as const

  return (
    <div>
      {/* Legend */}
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 24 }}>
        {legendItems.map(({ type, label }) => {
          const c = NODE_COLORS[type]
          return (
            <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted)' }}>
              <span style={{
                width: 10, height: 10, borderRadius: 3,
                border: `1.5px solid ${c.border}`,
                background: c.bg, display: 'inline-block', flexShrink: 0,
              }} />
              {label}
            </div>
          )
        })}
      </div>

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {rows.map((rowNodes, rowIndex) => {
          if (rowNodes.length === 0) return null
          const section = sectionMap[rowIndex]
          const openInThisRow = openNodeId && rowNodes.some(n => n.id === openNodeId)

          return (
            <div key={rowIndex}>
              {/* Section label */}
              {section && (
                <div style={{ marginBottom: 10, marginTop: rowIndex > 0 ? 24 : 0 }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: section.color ?? 'var(--muted)',
                    marginBottom: section.description ? 4 : 0,
                  }}>
                    {section.label}
                  </div>
                  {section.description && (
                    <p style={{
                      fontSize: 13, color: 'var(--muted)', lineHeight: 1.6,
                      fontFamily: 'Lora, serif', fontStyle: 'italic',
                      maxWidth: 600,
                    }}>
                      {section.description}
                    </p>
                  )}
                </div>
              )}

              {/* Node pills */}
              <div style={{
                display: 'flex', gap: 8, flexWrap: 'wrap',
                paddingBottom: openInThisRow ? 0 : 4,
              }}>
                {rowNodes.map(node => (
                  <NodePill
                    key={node.id}
                    node={node}
                    roadmapId={roadmap.id}
                    isOpen={openNodeId === node.id}
                    onToggle={toggleNode}
                    statusMap={statusMap}
                  />
                ))}
              </div>

              {/* Inline card — expands below the row when any node in it is open */}
              {openInThisRow && openNode && (
                <InlineCard
                  node={openNode}
                  roadmapId={roadmap.id}
                  status={statusMap[openNode.id] ?? 'not-started'}
                  onStatusChange={handleStatusChange}
                  onClose={() => setOpenNodeId(null)}
                />
              )}

              {/* Connector arrow to next row */}
              {rowIndex < maxRow && rows[rowIndex + 1]?.length > 0 && (
                <div style={{
                  display: 'flex', justifyContent: 'center',
                  padding: '10px 0 6px',
                }}>
                  <div style={{
                    width: 1, height: 20,
                    background: 'var(--border)',
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute', bottom: -4, left: '50%',
                      transform: 'translateX(-50%)',
                      width: 0, height: 0,
                      borderLeft: '4px solid transparent',
                      borderRight: '4px solid transparent',
                      borderTop: '5px solid var(--border)',
                    }} />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}