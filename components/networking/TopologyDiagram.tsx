'use client'

import dynamic from 'next/dynamic'

const TopologyDiagram3D = dynamic(() => import('./TopologyDiagram3D'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%', height: 380, borderRadius: 12, border: '1px solid #1e293b',
      background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ fontSize: 12, color: '#475569', fontFamily: 'monospace' }}>Loading 3D diagram…</span>
    </div>
  ),
})

export type TopologyType = 'bus' | 'star' | 'ring' | 'mesh' | 'hybrid'

interface TopologyDiagramProps {
  type: TopologyType
  height?: number
  caption?: string
}

export default function TopologyDiagram({ type, height = 380, caption }: TopologyDiagramProps) {
  return (
    <div style={{ margin: '20px 0 8px' }}>
      <TopologyDiagram3D type={type} height={height} />
      {caption && (
        <div style={{ fontSize: 11, color: '#64748b', textAlign: 'center', marginTop: 8, fontFamily: 'var(--font-mono)', letterSpacing: '.04em' }}>
          {caption}
        </div>
      )}
    </div>
  )
}
