'use client'

import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'

const COMPUTERS = [
  { label: 'PC-1', color: '#10b981', x: -3.2 },
  { label: 'PC-2', color: '#3b82f6', x: -1.6 },
  { label: 'PC-3', color: '#8b5cf6', x:  0.0 },
  { label: 'PC-4', color: '#f97316', x:  1.6 },
  { label: 'PC-5', color: '#ef4444', x:  3.2 },
]

function Monitor({
  position,
  label,
  color,
  isActive,
  onClick,
}: {
  position: [number, number, number]
  label: string
  color: string
  isActive: boolean
  onClick: () => void
}) {
  const bodyRef  = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (!bodyRef.current) return
    const t = clock.getElapsedTime()
    bodyRef.current.rotation.y = hovered ? Math.sin(t * 2) * 0.1 : 0
    bodyRef.current.position.y = isActive ? Math.sin(t * 3) * 0.04 + 0.06 : 0
  })

  return (
    <group
      position={position}
      onClick={(e) => { e.stopPropagation(); onClick() }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Monitor body */}
      <mesh ref={bodyRef} castShadow>
        <boxGeometry args={[0.7, 0.55, 0.1]} />
        <meshStandardMaterial
          color={hovered || isActive ? color : '#1e293b'}
          emissive={new THREE.Color(color)}
          emissiveIntensity={hovered || isActive ? 0.45 : 0.04}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Screen panel */}
      <mesh position={[0, 0.04, 0.056]}>
        <planeGeometry args={[0.54, 0.36]} />
        <meshStandardMaterial
          color={color}
          emissive={new THREE.Color(color)}
          emissiveIntensity={isActive ? 1.1 : 0.3}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Scan lines */}
      {[0.08, 0.0, -0.08].map((y, i) => (
        <mesh key={i} position={[0, y + 0.04, 0.058]}>
          <planeGeometry args={[0.44, 0.016]} />
          <meshStandardMaterial
            color="white"
            emissive={new THREE.Color('white')}
            emissiveIntensity={isActive ? 0.5 : 0.06}
            transparent
            opacity={0.2}
          />
        </mesh>
      ))}

      {/* Stand neck */}
      <mesh position={[0, -0.38, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.18, 8]} />
        <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.8} />
      </mesh>

      {/* Stand base */}
      <mesh position={[0, -0.49, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.04, 16]} />
        <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.8} />
      </mesh>

      {/* Drop cable */}
      <mesh position={[0, -0.76, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.48, 6]} />
        <meshStandardMaterial
          color={color}
          emissive={new THREE.Color(color)}
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* T-connector on bus */}
      <mesh position={[0, -1.02, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={new THREE.Color(color)}
          emissiveIntensity={0.9}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* HTML label — no font loading needed */}
      <Html position={[0, 0.58, 0]} center distanceFactor={6}>
        <div style={{
          fontSize: 11, fontWeight: 800, color,
          fontFamily: 'monospace',
          whiteSpace: 'nowrap',
          textShadow: `0 0 8px ${color}`,
          pointerEvents: 'none',
          userSelect: 'none',
        }}>
          {label}
        </div>
      </Html>

      {isActive && (
        <pointLight color={color} intensity={2} distance={2} />
      )}
    </group>
  )
}

function Packet({ color, speed, offset }: { color: string; speed: number; offset: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = (clock.getElapsedTime() * speed + offset) % 1
    ref.current.position.set(-4.2 + t * 8.4, -1.0, 0)
    ref.current.rotation.y += 0.08
  })
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.09, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={new THREE.Color(color)}
        emissiveIntensity={1.6}
      />
    </mesh>
  )
}

function BusCable() {
  return (
    <group>
      {/* Main cable */}
      <mesh position={[0, -1.0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 8.6, 12]} />
        <meshStandardMaterial
          color="#10b981"
          emissive={new THREE.Color('#10b981')}
          emissiveIntensity={0.3}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>
      {/* Glow halo */}
      <mesh position={[0, -1.0, 0]}>
        <cylinderGeometry args={[0.065, 0.065, 8.6, 12]} />
        <meshStandardMaterial
          color="#10b981"
          emissive={new THREE.Color('#10b981')}
          emissiveIntensity={0.12}
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Terminators */}
      {([-4.4, 4.4] as number[]).map((x) => (
        <group key={x} position={[x, -1.0, 0]}>
          <mesh>
            <boxGeometry args={[0.22, 0.22, 0.22]} />
            <meshStandardMaterial
              color="#1e293b"
              emissive={new THREE.Color('#10b981')}
              emissiveIntensity={0.6}
              roughness={0.3}
              metalness={0.9}
            />
          </mesh>
          <Html position={[0, 0.28, 0]} center distanceFactor={6}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#10b981', fontFamily: 'monospace', pointerEvents: 'none' }}>T</div>
          </Html>
        </group>
      ))}

      <Html position={[0, -1.38, 0]} center distanceFactor={6}>
        <div style={{ fontSize: 10, color: '#475569', fontFamily: 'monospace', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
          shared backbone cable
        </div>
      </Html>
    </group>
  )
}

function Scene({
  activePC,
  setActivePC,
}: {
  activePC: number | null
  setActivePC: (n: number | null) => void
}) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={0.9} castShadow />
      <pointLight position={[0, 4, 4]} intensity={0.5} color="#10b981" />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]} receiveShadow>
        <planeGeometry args={[16, 10]} />
        <meshStandardMaterial color="#0a0f1e" roughness={1} />
      </mesh>

      <BusCable />

      {COMPUTERS.map((pc, i) => (
        <Monitor
          key={pc.label}
          position={[pc.x, 0.1, 0]}
          label={pc.label}
          color={pc.color}
          isActive={activePC === i}
          onClick={() => setActivePC(activePC === i ? null : i)}
        />
      ))}

      <Packet color="#fbbf24" speed={0.38} offset={0.0} />
      <Packet color="#34d399" speed={0.38} offset={0.52} />

      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={14}
        minPolarAngle={0.15}
        maxPolarAngle={Math.PI / 2.1}
      />
    </>
  )
}

export default function BusTopology3D() {
  const [activePC, setActivePC] = useState<number | null>(null)

  return (
    <div>
      <div style={{
        width: '100%',
        height: 420,
        borderRadius: 14,
        overflow: 'hidden',
        border: '1px solid #1e293b',
        background: '#0a0f1e',
      }}>
        <Canvas
          shadows
          camera={{ position: [0, 2.6, 7.5], fov: 50 }}
          gl={{ antialias: true }}
        >
          <color attach="background" args={['#0a0f1e']} />
          <fog attach="fog" args={['#0a0f1e', 12, 24]} />
          <Suspense fallback={null}>
            <Scene activePC={activePC} setActivePC={setActivePC} />
          </Suspense>
        </Canvas>
      </div>

      <div style={{
        marginTop: 12,
        minHeight: 52,
        background: '#0f172a',
        border: '1px solid #1e293b',
        borderRadius: 10,
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        fontSize: 13,
      }}>
        {activePC !== null ? (
          <>
            <div style={{
              width: 10, height: 10, borderRadius: '50%',
              background: COMPUTERS[activePC].color,
              boxShadow: `0 0 8px ${COMPUTERS[activePC].color}`,
              flexShrink: 0,
            }} />
            <div>
              <span style={{ fontWeight: 700, color: COMPUTERS[activePC].color }}>
                {COMPUTERS[activePC].label} is transmitting —{' '}
              </span>
              <span style={{ color: '#64748b' }}>
                packet travels the entire bus and every device checks if it is addressed to them.
              </span>
            </div>
          </>
        ) : (
          <span style={{ color: '#475569' }}>Click a PC to see what happens when it transmits</span>
        )}
      </div>
    </div>
  )
}
