'use client'

export type TopologyPreviewType = 'bus' | 'star' | 'ring' | 'mesh' | 'tree' | 'hybrid'

const COLORS: Record<TopologyPreviewType, string> = {
  bus:    '#10b981',
  star:   '#3b82f6',
  ring:   '#8b5cf6',
  mesh:   '#f97316',
  tree:   '#06b6d4',
  hybrid: '#ef4444',
}

const LABELS: Record<TopologyPreviewType, string> = {
  bus:    'Bus',
  star:   'Star',
  ring:   'Ring',
  mesh:   'Mesh (Full)',
  tree:   'Tree',
  hybrid: 'Hybrid',
}

const DESCS: Record<TopologyPreviewType, string> = {
  bus:    'shared backbone cable',
  star:   'central switch hub',
  ring:   'token passing ring',
  mesh:   'every node connected',
  tree:   '3-tier hierarchy',
  hybrid: 'enterprise mix',
}

// ─── SVG helpers ──────────────────────────────────────────────────────────────

function Node({ x, y, c, r = 11, hub = false, delay = '0s' }: {
  x: number; y: number; c: string; r?: number; hub?: boolean; delay?: string
}) {
  const pd = hub ? '1.8s' : '2.6s'
  return (
    <g>
      <circle cx={x} cy={y} r={r + 6} fill={c} fillOpacity={0}>
        <animate attributeName="fill-opacity" values="0;0.14;0" dur={pd} begin={delay} repeatCount="indefinite" />
        <animate attributeName="r" values={`${r + 4};${r + 9};${r + 4}`} dur={pd} begin={delay} repeatCount="indefinite" />
      </circle>
      <circle cx={x} cy={y} r={r} fill="#080d18" stroke={c} strokeWidth={hub ? 2 : 1.5} strokeOpacity={0.95} />
      <circle cx={x} cy={y} r={hub ? r - 4 : r - 5} fill={c} fillOpacity={hub ? 0.55 : 0.28} />
    </g>
  )
}

function Wire({ x1, y1, x2, y2, c, op = 0.35 }: {
  x1: number; y1: number; x2: number; y2: number; c: string; op?: number
}) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={1.6} strokeOpacity={op} />
}

function Pkt({ path, c, dur, begin = '0s' }: { path: string; c: string; dur: string; begin?: string }) {
  return (
    <g>
      <animateMotion dur={dur} repeatCount="indefinite" begin={begin} path={path} />
      <circle r={5.5} fill={c} fillOpacity={0.22} />
      <circle r={3} fill={c} />
    </g>
  )
}

// ─── Topology SVGs ────────────────────────────────────────────────────────────

function BusSVG({ c }: { c: string }) {
  const xs = [60, 128, 198, 268, 338]
  const ny = 82, by = 150
  return (
    <svg viewBox="0 0 400 195" style={{ width: '100%', display: 'block' }}>
      <line x1={24} y1={by} x2={376} y2={by} stroke={c} strokeWidth={4} strokeOpacity={0.85} />
      <rect x={17} y={by - 5} width={11} height={11} rx={2} fill={c} fillOpacity={0.9} />
      <rect x={372} y={by - 5} width={11} height={11} rx={2} fill={c} fillOpacity={0.9} />
      {xs.map((x, i) => (
        <g key={x}>
          <Wire x1={x} y1={ny + 11} x2={x} y2={by - 4} c={c} op={0.45} />
          <circle cx={x} cy={by} r={5} fill={c} fillOpacity={0.88} />
          <Node x={x} y={ny} c={c} delay={`${i * 0.38}s`} />
        </g>
      ))}
      <Pkt path={`M 24 ${by} L 376 ${by}`} c={c} dur="2.4s" begin="0s" />
      <Pkt path={`M 24 ${by} L 376 ${by}`} c="#fbbf24" dur="2.4s" begin="1.2s" />
    </svg>
  )
}

function StarSVG({ c }: { c: string }) {
  const cx = 200, cy = 122, r = 93
  const pts = [0, 1, 2, 3, 4, 5].map(i => {
    const a = (i * 60 - 90) * (Math.PI / 180)
    return { x: Math.round(cx + r * Math.cos(a)), y: Math.round(cy + r * Math.sin(a)) }
  })
  return (
    <svg viewBox="0 0 400 240" style={{ width: '100%', display: 'block' }}>
      {pts.map((p, i) => <Wire key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} c={c} op={0.4} />)}
      <Node x={cx} y={cy} c={c} r={15} hub />
      {pts.map((p, i) => <Node key={i} x={p.x} y={p.y} c={c} delay={`${i * 0.35}s`} />)}
      {pts.map((p, i) => (
        <Pkt key={i} path={`M ${cx} ${cy} L ${p.x} ${p.y}`} c={c} dur="1.9s" begin={`${i * 0.32}s`} />
      ))}
    </svg>
  )
}

function RingSVG({ c }: { c: string }) {
  const cx = 200, cy = 122, r = 88
  const pts = [0, 1, 2, 3, 4, 5].map(i => {
    const a = (i * 60 - 90) * (Math.PI / 180)
    return { x: Math.round(cx + r * Math.cos(a)), y: Math.round(cy + r * Math.sin(a)) }
  })
  const ringPath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ` L ${pts[0].x} ${pts[0].y}`
  return (
    <svg viewBox="0 0 400 240" style={{ width: '100%', display: 'block' }}>
      {pts.map((p, i) => {
        const n = pts[(i + 1) % 6]
        return <Wire key={i} x1={p.x} y1={p.y} x2={n.x} y2={n.y} c={c} op={0.45} />
      })}
      {pts.map((p, i) => <Node key={i} x={p.x} y={p.y} c={c} delay={`${i * 0.42}s`} />)}
      <Pkt path={ringPath} c={c} dur="3.2s" begin="0s" />
      <Pkt path={ringPath} c="#fbbf24" dur="3.2s" begin="1.6s" />
    </svg>
  )
}

function MeshSVG({ c }: { c: string }) {
  const cx = 200, cy = 122, r = 86
  const pts = [0, 1, 2, 3, 4].map(i => {
    const a = (i * 72 - 90) * (Math.PI / 180)
    return { x: Math.round(cx + r * Math.cos(a)), y: Math.round(cy + r * Math.sin(a)) }
  })
  const pairs: [number, number][] = []
  for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) pairs.push([i, j])
  const pkts = [
    { fi: 0, ti: 3, begin: '0s' },
    { fi: 1, ti: 4, begin: '0.5s' },
    { fi: 2, ti: 0, begin: '1.0s' },
  ]
  return (
    <svg viewBox="0 0 400 240" style={{ width: '100%', display: 'block' }}>
      {pairs.map(([a, b], i) => <Wire key={i} x1={pts[a].x} y1={pts[a].y} x2={pts[b].x} y2={pts[b].y} c={c} />)}
      {pts.map((p, i) => <Node key={i} x={p.x} y={p.y} c={c} delay={`${i * 0.38}s`} />)}
      {pkts.map((pk, i) => (
        <Pkt key={i} path={`M ${pts[pk.fi].x} ${pts[pk.fi].y} L ${pts[pk.ti].x} ${pts[pk.ti].y}`} c={c} dur="1.5s" begin={pk.begin} />
      ))}
    </svg>
  )
}

function TreeSVG({ c }: { c: string }) {
  const core = { x: 200, y: 28 }
  const dists = [{ x: 108, y: 115 }, { x: 292, y: 115 }]
  const access = [{ x: 52, y: 202 }, { x: 162, y: 202 }, { x: 238, y: 202 }, { x: 348, y: 202 }]
  return (
    <svg viewBox="0 0 400 240" style={{ width: '100%', display: 'block' }}>
      {dists.map((d, i) => <Wire key={i} x1={core.x} y1={core.y} x2={d.x} y2={d.y} c={c} op={0.55} />)}
      {access.map((a, i) => {
        const d = dists[Math.floor(i / 2)]
        return <Wire key={i} x1={d.x} y1={d.y} x2={a.x} y2={a.y} c={c} />
      })}
      <Node x={core.x} y={core.y} c={c} r={14} hub />
      {dists.map((d, i) => <Node key={i} x={d.x} y={d.y} c={c} r={12} hub delay={`${i * 0.3}s`} />)}
      {access.map((a, i) => <Node key={i} x={a.x} y={a.y} c={c} delay={`${i * 0.22}s`} />)}
      <Pkt path={`M ${access[0].x} ${access[0].y} L ${dists[0].x} ${dists[0].y} L ${core.x} ${core.y}`} c={c} dur="2.2s" begin="0s" />
      <Pkt path={`M ${access[3].x} ${access[3].y} L ${dists[1].x} ${dists[1].y} L ${core.x} ${core.y}`} c={c} dur="2.2s" begin="1.1s" />
    </svg>
  )
}

function HybridSVG({ c }: { c: string }) {
  const sw     = { x: 88, y: 125 }
  const router = { x: 312, y: 125 }
  const lPCs   = [{ x: 25, y: 65 }, { x: 88, y: 22 }, { x: 152, y: 65 }]
  const ring   = [{ x: 255, y: 65 }, { x: 370, y: 65 }, { x: 370, y: 190 }, { x: 255, y: 190 }]
  const ringPath = ring.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ` L ${ring[0].x} ${ring[0].y}`
  return (
    <svg viewBox="0 0 400 240" style={{ width: '100%', display: 'block' }}>
      {lPCs.map((p, i) => <Wire key={i} x1={sw.x} y1={sw.y} x2={p.x} y2={p.y} c={c} />)}
      <Wire x1={sw.x} y1={sw.y} x2={router.x} y2={router.y} c={c} op={0.55} />
      {ring.map((n, i) => { const nx = ring[(i + 1) % 4]; return <Wire key={i} x1={n.x} y1={n.y} x2={nx.x} y2={nx.y} c={c} /> })}
      <Wire x1={router.x} y1={router.y} x2={ring[0].x} y2={ring[0].y} c={c} />
      <Wire x1={router.x} y1={router.y} x2={ring[3].x} y2={ring[3].y} c={c} />
      <Node x={sw.x} y={sw.y} c={c} r={13} hub />
      {lPCs.map((p, i) => <Node key={i} x={p.x} y={p.y} c={c} delay={`${i * 0.28}s`} />)}
      <Node x={router.x} y={router.y} c={c} r={13} hub delay="0.5s" />
      {ring.map((n, i) => <Node key={i} x={n.x} y={n.y} c={c} delay={`${i * 0.35}s`} />)}
      <Pkt path={`M ${sw.x} ${sw.y} L ${lPCs[0].x} ${lPCs[0].y}`} c={c} dur="1.4s" begin="0s" />
      <Pkt path={`M ${sw.x} ${sw.y} L ${lPCs[2].x} ${lPCs[2].y}`} c={c} dur="1.4s" begin="0.7s" />
      <Pkt path={`M ${sw.x} ${sw.y} L ${router.x} ${router.y}`} c="#fbbf24" dur="1.6s" begin="0.3s" />
      <Pkt path={ringPath} c={c} dur="2.8s" begin="0s" />
    </svg>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

interface TopologyPreviewCardProps {
  type: TopologyPreviewType
}

export default function TopologyPreviewCard({ type }: TopologyPreviewCardProps) {
  const c = COLORS[type]
  const svgs: Record<TopologyPreviewType, React.ReactNode> = {
    bus:    <BusSVG    c={c} />,
    star:   <StarSVG   c={c} />,
    ring:   <RingSVG   c={c} />,
    mesh:   <MeshSVG   c={c} />,
    tree:   <TreeSVG   c={c} />,
    hybrid: <HybridSVG c={c} />,
  }
  return (
    <div style={{ background: '#080d18', border: `1px solid ${c}28`, borderRadius: 14, overflow: 'hidden' }}>
      {svgs[type]}
      <div style={{ padding: '10px 14px', borderTop: `1px solid ${c}18`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: c, fontFamily: 'monospace', letterSpacing: '.08em', textTransform: 'uppercase' }}>
          {LABELS[type]}
        </span>
        <span style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace' }}>{DESCS[type]}</span>
      </div>
    </div>
  )
}

// ─── Grid of all 6 topologies ─────────────────────────────────────────────────

export function AllTopologyPreviews() {
  const types: TopologyPreviewType[] = ['bus', 'star', 'ring', 'mesh', 'tree', 'hybrid']
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, margin: '28px 0' }}>
      {types.map(t => <TopologyPreviewCard key={t} type={t} />)}
    </div>
  )
}
