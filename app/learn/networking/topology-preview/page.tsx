'use client'

import dynamic from 'next/dynamic'

// Three.js must be loaded client-side only — no SSR
const BusTopology3D = dynamic(() => import('./BusTopology3D'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%', height: 420,
      borderRadius: 14, overflow: 'hidden',
      border: '1px solid #1e293b',
      background: '#0a0f1e',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ fontSize: 13, color: '#475569', fontFamily: 'monospace' }}>Loading 3D scene…</span>
    </div>
  ),
})

export default function TopologyPreviewPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#050810',
      padding: '36px 20px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* Header */}
        <p style={{ fontSize: 11, color: '#10b981', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', margin: '0 0 8px' }}>
          // Three.js · React Three Fiber · @react-three/drei
        </p>
        <h1 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#f1f5f9', margin: '0 0 6px' }}>
          Bus Topology — Interactive 3D
        </h1>
        <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 24px', lineHeight: 1.6 }}>
          Drag to orbit · Scroll to zoom · Click any PC to activate it
        </p>

        {/* 3D Scene */}
        <BusTopology3D />

        {/* Concept cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginTop: 24 }}>
          {[
            { label: 'Shared medium',     desc: 'All PCs share one cable — only one can transmit at a time',      color: '#10b981' },
            { label: 'Broadcast traffic', desc: 'Every packet reaches every device — recipient keeps, others drop', color: '#3b82f6' },
            { label: 'Terminators',       desc: 'Absorb signals at each end so they do not reflect back',          color: '#8b5cf6' },
            { label: 'Single failure',    desc: 'One break anywhere in the cable kills the entire network',         color: '#ef4444' },
          ].map(c => (
            <div key={c.label} style={{
              background: '#0f172a', border: '1px solid #1e293b',
              borderRadius: 10, padding: '14px 16px',
              borderLeft: `3px solid ${c.color}`,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: c.color, marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6 }}>{c.desc}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
