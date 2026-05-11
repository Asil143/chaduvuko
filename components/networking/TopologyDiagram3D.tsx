'use client'

import { useRef, useState, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'

export type TopologyType = 'bus' | 'star' | 'ring' | 'mesh' | 'hybrid'

// ─── Shared: PC Node ─────────────────────────────────────────────────────────
function PCNode({
  position, label, color, isActive, isHighlighted, onClick,
}: {
  position: [number, number, number]
  label: string
  color: string
  isActive: boolean
  isHighlighted: boolean
  onClick?: () => void
}) {
  const ref = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (!ref.current) return
    if (isActive) ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 3) * 0.06
    else ref.current.position.y = position[1]
  })

  const lit = hovered || isActive || isHighlighted

  return (
    <group ref={ref} position={position}
      onClick={(e) => { e.stopPropagation(); onClick?.() }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Monitor body */}
      <mesh castShadow>
        <boxGeometry args={[0.55, 0.42, 0.09]} />
        <meshStandardMaterial color={lit ? color : '#1e293b'} emissive={new THREE.Color(color)} emissiveIntensity={lit ? 0.5 : 0.04} roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.03, 0.052]}>
        <planeGeometry args={[0.42, 0.28]} />
        <meshStandardMaterial color={color} emissive={new THREE.Color(color)} emissiveIntensity={lit ? 1.1 : 0.25} transparent opacity={0.9} />
      </mesh>
      {/* Scan lines */}
      {[0.06, 0, -0.06].map((y, i) => (
        <mesh key={i} position={[0, y + 0.03, 0.055]}>
          <planeGeometry args={[0.34, 0.013]} />
          <meshStandardMaterial color="#fff" emissive={new THREE.Color('#fff')} emissiveIntensity={lit ? 0.5 : 0.06} transparent opacity={0.22} />
        </mesh>
      ))}
      {/* Stand */}
      <mesh position={[0, -0.29, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.14, 8]} />
        <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.8} />
      </mesh>
      <mesh position={[0, -0.38, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.035, 16]} />
        <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.8} />
      </mesh>
      {/* Label */}
      <Html position={[0, 0.44, 0]} center distanceFactor={7}>
        <div style={{ fontSize: 10, fontWeight: 800, color, fontFamily: 'monospace', whiteSpace: 'nowrap', textShadow: `0 0 8px ${color}`, pointerEvents: 'none' }}>{label}</div>
      </Html>
      {lit && <pointLight color={color} intensity={1.8} distance={1.6} />}
    </group>
  )
}

// ─── Shared: Animated Packet ─────────────────────────────────────────────────
function Packet({ from, to, color, duration, delay }: {
  from: [number, number, number]
  to: [number, number, number]
  color: string
  duration: number
  delay: number
}) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = ((clock.getElapsedTime() - delay) % duration) / duration
    if (t < 0) { ref.current.visible = false; return }
    ref.current.visible = true
    ref.current.position.set(
      from[0] + (to[0] - from[0]) * t,
      from[1] + (to[1] - from[1]) * t + Math.sin(t * Math.PI) * 0.08,
      from[2] + (to[2] - from[2]) * t,
    )
    ref.current.rotation.y += 0.1
  })
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.07, 0]} />
      <meshStandardMaterial color={color} emissive={new THREE.Color(color)} emissiveIntensity={1.8} />
    </mesh>
  )
}

// ─── Cable between two points ─────────────────────────────────────────────────
function Cable({ from, to, color = '#10b981', opacity = 0.7, thickness = 0.025 }: {
  from: [number, number, number]
  to: [number, number, number]
  color?: string
  opacity?: number
  thickness?: number
}) {
  const mid = useMemo(() => new THREE.Vector3(
    (from[0] + to[0]) / 2, (from[1] + to[1]) / 2, (from[2] + to[2]) / 2
  ), [from, to])
  const dir = useMemo(() => new THREE.Vector3(to[0] - from[0], to[1] - from[1], to[2] - from[2]), [from, to])
  const len = dir.length()
  const quat = useMemo(() => {
    const q = new THREE.Quaternion()
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize())
    return q
  }, [dir])

  return (
    <mesh position={mid} quaternion={quat}>
      <cylinderGeometry args={[thickness, thickness, len, 6]} />
      <meshStandardMaterial color={color} emissive={new THREE.Color(color)} emissiveIntensity={0.2} transparent opacity={opacity} />
    </mesh>
  )
}

// ─── BUS Topology ─────────────────────────────────────────────────────────────
function BusTopology({ activeNode, setActiveNode }: { activeNode: number | null; setActiveNode: (n: number | null) => void }) {
  const nodes = [
    { label: 'PC-1', color: '#10b981', x: -3.2 },
    { label: 'PC-2', color: '#3b82f6', x: -1.6 },
    { label: 'PC-3', color: '#8b5cf6', x:  0.0 },
    { label: 'PC-4', color: '#f97316', x:  1.6 },
    { label: 'PC-5', color: '#ef4444', x:  3.2 },
  ]
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} castShadow />
      {/* Bus cable */}
      <mesh position={[0, -0.95, 0]}>
        <cylinderGeometry args={[0.038, 0.038, 7.2, 10]} />
        <meshStandardMaterial color="#10b981" emissive={new THREE.Color('#10b981')} emissiveIntensity={0.3} roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, -0.95, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 7.2, 10]} />
        <meshStandardMaterial color="#10b981" transparent opacity={0.12} />
      </mesh>
      {/* Terminators */}
      {([-3.72, 3.72] as number[]).map(x => (
        <group key={x} position={[x, -0.95, 0]}>
          <mesh><boxGeometry args={[0.18, 0.18, 0.18]} /><meshStandardMaterial color="#1e293b" emissive={new THREE.Color('#10b981')} emissiveIntensity={0.6} roughness={0.3} metalness={0.9} /></mesh>
          <Html position={[0, 0.24, 0]} center distanceFactor={7}><div style={{ fontSize: 10, color: '#10b981', fontFamily: 'monospace', fontWeight: 800, pointerEvents: 'none' }}>T</div></Html>
        </group>
      ))}
      {/* Drop cables + nodes */}
      {nodes.map((n, i) => (
        <group key={n.label}>
          <Cable from={[n.x, -0.95, 0]} to={[n.x, -0.42, 0]} color={n.color} thickness={0.014} />
          <mesh position={[n.x, -0.95, 0]}>
            <sphereGeometry args={[0.055, 10, 10]} />
            <meshStandardMaterial color={n.color} emissive={new THREE.Color(n.color)} emissiveIntensity={0.9} />
          </mesh>
          <PCNode position={[n.x, 0.1, 0]} label={n.label} color={n.color} isActive={activeNode === i} isHighlighted={false} onClick={() => setActiveNode(activeNode === i ? null : i)} />
        </group>
      ))}
      {/* Packets */}
      <Packet from={[-3.7, -0.95, 0]} to={[3.7, -0.95, 0]} color="#fbbf24" duration={3} delay={0} />
      <Packet from={[-3.7, -0.95, 0]} to={[3.7, -0.95, 0]} color="#34d399" duration={3} delay={1.5} />
      <Html position={[0, -1.5, 0]} center distanceFactor={7}>
        <div style={{ fontSize: 10, color: '#475569', fontFamily: 'monospace', whiteSpace: 'nowrap', pointerEvents: 'none' }}>shared backbone cable — all devices transmit on same medium</div>
      </Html>
      <OrbitControls enablePan={false} minDistance={4} maxDistance={12} minPolarAngle={0.2} maxPolarAngle={Math.PI / 2.1} />
    </>
  )
}

// ─── STAR Topology ────────────────────────────────────────────────────────────
function StarTopology({ activeNode, setActiveNode }: { activeNode: number | null; setActiveNode: (n: number | null) => void }) {
  const nodes = [
    { label: 'PC-1', color: '#10b981', angle: 0 },
    { label: 'PC-2', color: '#3b82f6', angle: 60 },
    { label: 'PC-3', color: '#8b5cf6', angle: 120 },
    { label: 'PC-4', color: '#f97316', angle: 180 },
    { label: 'PC-5', color: '#ef4444', angle: 240 },
    { label: 'PC-6', color: '#06b6d4', angle: 300 },
  ]
  const radius = 2.8
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} castShadow />
      {/* Central switch */}
      <group position={[0, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.9, 0.22, 0.55]} />
          <meshStandardMaterial color="#0f172a" emissive={new THREE.Color('#10b981')} emissiveIntensity={0.35} roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Port LEDs */}
        {nodes.map((n, i) => (
          <mesh key={i} position={[-0.35 + i * 0.14, 0.115, 0.22]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial color={n.color} emissive={new THREE.Color(n.color)} emissiveIntensity={activeNode === i ? 2 : 0.6} />
          </mesh>
        ))}
        <Html position={[0, -0.28, 0]} center distanceFactor={7}>
          <div style={{ fontSize: 10, color: '#10b981', fontFamily: 'monospace', fontWeight: 800, pointerEvents: 'none' }}>SWITCH</div>
        </Html>
        <pointLight color="#10b981" intensity={1.5} distance={3} />
      </group>
      {/* Spokes + nodes */}
      {nodes.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180
        const x = Math.cos(rad) * radius
        const z = Math.sin(rad) * radius
        const isActive = activeNode === i
        return (
          <group key={n.label}>
            <Cable from={[0, 0, 0]} to={[x, 0, z]} color={isActive ? n.color : '#334155'} opacity={isActive ? 0.9 : 0.4} thickness={isActive ? 0.03 : 0.018} />
            {isActive && <Packet from={[0, 0, 0]} to={[x, 0, z]} color={n.color} duration={1.8} delay={0} />}
            <PCNode position={[x, 0, z]} label={n.label} color={n.color} isActive={isActive} isHighlighted={false} onClick={() => setActiveNode(activeNode === i ? null : i)} />
          </group>
        )
      })}
      <Html position={[0, -2.2, 0]} center distanceFactor={7}>
        <div style={{ fontSize: 10, color: '#475569', fontFamily: 'monospace', whiteSpace: 'nowrap', pointerEvents: 'none' }}>all traffic passes through the central switch — click a PC</div>
      </Html>
      <OrbitControls enablePan={false} minDistance={4} maxDistance={14} minPolarAngle={0.1} maxPolarAngle={Math.PI / 1.9} />
    </>
  )
}

// ─── RING Topology ────────────────────────────────────────────────────────────
function RingTopology({ activeNode, setActiveNode }: { activeNode: number | null; setActiveNode: (n: number | null) => void }) {
  const count = 6
  const radius = 2.6
  const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f97316', '#ef4444', '#06b6d4']
  const positions: [number, number, number][] = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2 - Math.PI / 2
      return [Math.cos(a) * radius, 0, Math.sin(a) * radius]
    }), [count, radius])

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} castShadow />
      {/* Ring cables */}
      {positions.map((pos, i) => {
        const next = positions[(i + 1) % count]
        return <Cable key={i} from={pos} to={next} color={colors[i]} opacity={0.55} thickness={0.022} />
      })}
      {/* Token packet going around the ring */}
      {positions.map((pos, i) => {
        const next = positions[(i + 1) % count]
        return <Packet key={i} from={pos} to={next} color="#fbbf24" duration={count * 0.5} delay={i * 0.5} />
      })}
      {/* Nodes */}
      {positions.map((pos, i) => (
        <PCNode key={i} position={pos} label={`PC-${i + 1}`} color={colors[i]} isActive={activeNode === i} isHighlighted={false} onClick={() => setActiveNode(activeNode === i ? null : i)} />
      ))}
      <Html position={[0, -2.4, 0]} center distanceFactor={7}>
        <div style={{ fontSize: 10, color: '#475569', fontFamily: 'monospace', whiteSpace: 'nowrap', pointerEvents: 'none' }}>token passes around ring — one device transmits at a time</div>
      </Html>
      <OrbitControls enablePan={false} minDistance={4} maxDistance={13} minPolarAngle={0.1} maxPolarAngle={Math.PI / 1.9} />
    </>
  )
}

// ─── MESH Topology ────────────────────────────────────────────────────────────
function MeshTopology({ activeNode, setActiveNode }: { activeNode: number | null; setActiveNode: (n: number | null) => void }) {
  const count = 5
  const radius = 2.4
  const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f97316', '#ef4444']
  const positions: [number, number, number][] = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2 - Math.PI / 2
      return [Math.cos(a) * radius, 0, Math.sin(a) * radius]
    }), [count, radius])

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} castShadow />
      {/* Every node connected to every other */}
      {positions.map((from, i) =>
        positions.slice(i + 1).map((to, j) => {
          const isActive = activeNode === i || activeNode === (i + j + 1)
          return <Cable key={`${i}-${j}`} from={from} to={to} color={isActive ? '#10b981' : '#334155'} opacity={isActive ? 0.85 : 0.25} thickness={isActive ? 0.028 : 0.015} />
        })
      )}
      {/* Active path packets */}
      {activeNode !== null && positions.map((to, i) => {
        if (i === activeNode) return null
        return <Packet key={i} from={positions[activeNode]} to={to} color={colors[activeNode]} duration={2} delay={i * 0.4} />
      })}
      {positions.map((pos, i) => (
        <PCNode key={i} position={pos} label={`Node-${i + 1}`} color={colors[i]} isActive={activeNode === i} isHighlighted={false} onClick={() => setActiveNode(activeNode === i ? null : i)} />
      ))}
      <Html position={[0, -2.2, 0]} center distanceFactor={7}>
        <div style={{ fontSize: 10, color: '#475569', fontFamily: 'monospace', whiteSpace: 'nowrap', pointerEvents: 'none' }}>every node has a direct path to every other — click a node</div>
      </Html>
      <OrbitControls enablePan={false} minDistance={4} maxDistance={12} minPolarAngle={0.1} maxPolarAngle={Math.PI / 1.9} />
    </>
  )
}

// ─── HYBRID (Star-of-Stars / Enterprise) Topology ────────────────────────────
function HybridTopology({ activeNode, setActiveNode }: { activeNode: number | null; setActiveNode: (n: number | null) => void }) {
  // Core layer: 2 core switches connected (partial mesh)
  // Distribution: 2 distribution switches per core
  // Access: 2 PCs per distribution switch
  const coreColor = '#ef4444'
  const distColor = '#f97316'
  const accessColor = '#10b981'

  const cores: [number, number, number][]  = [[-1.8, 1.6, 0], [1.8, 1.6, 0]]
  const dists: [number, number, number][]  = [[-3.2, 0, -1.2], [-0.4, 0, -1.2], [0.4, 0, -1.2], [3.2, 0, -1.2]]
  const pcs: [number, number, number][]    = [
    [-4.0, -1.6, -1.2], [-2.4, -1.6, -1.2],
    [-1.2, -1.6, -1.2], [ 0.4, -1.6, -1.2],
    [ 0.6, -1.6, -1.2], [ 2.0, -1.6, -1.2],
    [ 3.0, -1.6, -1.2], [ 4.2, -1.6, -1.2],
  ]

  const SwitchBox = ({ pos, color, label }: { pos: [number, number, number]; color: string; label: string }) => (
    <group position={pos}>
      <mesh castShadow>
        <boxGeometry args={[0.6, 0.16, 0.36]} />
        <meshStandardMaterial color="#0f172a" emissive={new THREE.Color(color)} emissiveIntensity={0.5} roughness={0.2} metalness={0.9} />
      </mesh>
      <Html position={[0, 0.2, 0]} center distanceFactor={8}>
        <div style={{ fontSize: 9, color, fontFamily: 'monospace', fontWeight: 800, whiteSpace: 'nowrap', pointerEvents: 'none' }}>{label}</div>
      </Html>
    </group>
  )

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} castShadow />
      {/* Core-to-core (redundant mesh link) */}
      <Cable from={cores[0]} to={cores[1]} color={coreColor} opacity={0.8} thickness={0.035} />
      {/* Core switches */}
      {cores.map((c, i) => <SwitchBox key={i} pos={c} color={coreColor} label={i === 0 ? 'CORE-1' : 'CORE-2'} />)}
      {/* Core → Distribution */}
      {dists.map((d, i) => {
        const coreIdx = i < 2 ? 0 : 1
        return <Cable key={`cd-${i}`} from={cores[coreIdx]} to={d} color={distColor} opacity={0.6} thickness={0.022} />
      })}
      {/* Distribution switches */}
      {dists.map((d, i) => <SwitchBox key={i} pos={d} color={distColor} label={`DIST-${i + 1}`} />)}
      {/* Distribution → PCs */}
      {pcs.map((pc, i) => {
        const distIdx = Math.floor(i / 2)
        return <Cable key={`dp-${i}`} from={dists[distIdx]} to={pc} color={accessColor} opacity={0.5} thickness={0.014} />
      })}
      {/* PC nodes */}
      {pcs.map((pc, i) => (
        <PCNode key={i} position={pc} label={`PC-${i + 1}`} color={accessColor} isActive={activeNode === i} isHighlighted={false} onClick={() => setActiveNode(activeNode === i ? null : i)} />
      ))}
      {/* Active packet */}
      {activeNode !== null && <Packet from={pcs[activeNode]} to={cores[0]} color={accessColor} duration={2.5} delay={0} />}
      <Html position={[0, -2.8, -1.2]} center distanceFactor={9}>
        <div style={{ fontSize: 10, color: '#475569', fontFamily: 'monospace', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
          <span style={{ color: coreColor }}>■ Core (mesh)</span>{'  '}
          <span style={{ color: distColor }}>■ Distribution (star)</span>{'  '}
          <span style={{ color: accessColor }}>■ Access (star)</span>
        </div>
      </Html>
      <OrbitControls enablePan={false} minDistance={5} maxDistance={16} minPolarAngle={0.1} maxPolarAngle={Math.PI / 1.8} />
    </>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
const LABELS: Record<TopologyType, string> = {
  bus:    'BUS TOPOLOGY',
  star:   'STAR TOPOLOGY',
  ring:   'RING TOPOLOGY',
  mesh:   'MESH TOPOLOGY (FULL)',
  hybrid: 'HYBRID (3-TIER ENTERPRISE)',
}
const COLORS: Record<TopologyType, string> = {
  bus:    '#10b981',
  star:   '#3b82f6',
  ring:   '#8b5cf6',
  mesh:   '#f97316',
  hybrid: '#ef4444',
}

export default function TopologyDiagram3D({ type, height = 380 }: { type: TopologyType; height?: number }) {
  const [activeNode, setActiveNode] = useState<number | null>(null)
  const color = COLORS[type]

  return (
    <div>
      <div style={{ width: '100%', height, borderRadius: 12, overflow: 'hidden', border: '1px solid #1e293b', background: '#0a0f1e' }}>
        <Canvas shadows camera={{ position: [0, 3.5, 8], fov: 50 }} gl={{ antialias: true }}>
          <color attach="background" args={['#0a0f1e']} />
          <fog attach="fog" args={['#0a0f1e', 14, 26]} />
          <Suspense fallback={null}>
            {type === 'bus'    && <BusTopology    activeNode={activeNode} setActiveNode={setActiveNode} />}
            {type === 'star'   && <StarTopology   activeNode={activeNode} setActiveNode={setActiveNode} />}
            {type === 'ring'   && <RingTopology   activeNode={activeNode} setActiveNode={setActiveNode} />}
            {type === 'mesh'   && <MeshTopology   activeNode={activeNode} setActiveNode={setActiveNode} />}
            {type === 'hybrid' && <HybridTopology activeNode={activeNode} setActiveNode={setActiveNode} />}
          </Suspense>
        </Canvas>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, padding: '0 4px' }}>
        <span style={{ fontSize: 10, fontFamily: 'monospace', fontWeight: 800, color, letterSpacing: '.1em' }}>{LABELS[type]}</span>
        <span style={{ fontSize: 10, color: '#475569', fontFamily: 'monospace' }}>drag · scroll · click nodes</span>
      </div>
    </div>
  )
}
