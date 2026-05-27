'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

/* ── Helper components ────────────────────────────────────────────────────── */

const G = '#10b981'
const FONT_MONO = 'var(--font-mono)'
const FONT_DISPLAY = 'var(--font-display)'

const Chapter = ({ n, title }: { n: number; title: string }) => (
  <div style={{ marginBottom: 32 }}>
    <p style={{ fontSize: 11, color: G, fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 6px', letterSpacing: '.12em' }}>
      {`// CHAPTER ${String(n).padStart(2, '0')}`}
    </p>
    <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
)

const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '56px 0' }} />

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
)

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: '0 0 24px' }}>{children}</h2>
)

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>{children}</h3>
)

const Accent = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: G }}>{children}</strong>
)

const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 6px', color: G }}>{children}</code>
)

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', lineHeight: 1.7, color: 'var(--text)', margin: '0 0 24px' }}>{children}</pre>
)

const StoryBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.2)', borderLeft: '4px solid #3b82f6', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.85 }}>
    <span style={{ fontWeight: 700, color: '#3b82f6', fontSize: 11, fontFamily: FONT_MONO, letterSpacing: '.1em', display: 'block', marginBottom: 8 }}>// REAL-WORLD SCENARIO</span>
    {children}
  </div>
)

const WowBox = ({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) => (
  <div style={{ background: `${G}0d`, border: `1px solid ${G}30`, borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.85 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
      <span style={{ fontSize: 20 }}>{emoji}</span>
      <span style={{ fontWeight: 800, color: G, fontSize: 13 }}>{title}</span>
    </div>
    {children}
  </div>
)

const Warn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.25)', borderLeft: '4px solid #f59e0b', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.85 }}>
    <span style={{ fontWeight: 700, color: '#f59e0b', fontSize: 12, fontFamily: FONT_MONO, display: 'block', marginBottom: 8 }}>⚠ {title}</span>
    {children}
  </div>
)

const Err = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.25)', borderLeft: '4px solid #ef4444', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.85 }}>
    <span style={{ fontWeight: 700, color: '#ef4444', fontSize: 12, fontFamily: FONT_MONO, display: 'block', marginBottom: 8 }}>✗ Common Mistake — {title}</span>
    {children}
  </div>
)

const LEVEL_COLORS: Record<string, string> = {
  Beginner: '#10b981',
  Intermediate: '#3b82f6',
  Senior: '#8b5cf6',
  PhD: '#f97316',
}

const IQ = ({ q, level, children }: { q: string; level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) => (
  <div style={{ background: `${G}08`, border: `1px solid ${G}20`, borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
    <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#fff', background: LEVEL_COLORS[level], borderRadius: 20, padding: '3px 12px', marginBottom: 10 }}>{level}</span>
    <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 8, lineHeight: 1.5 }}>{q}</div>
    <div style={{ fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

/* ── Interactive Component 1: OSPF Neighbor State Machine ─────────────────── */

interface OspfState {
  name: string
  description: string
  trigger: string
  packet: string
  color: string
}

const OSPF_STATES: OspfState[] = [
  {
    name: 'Down',
    description: 'No hello packets received. The neighbor relationship has not started or has timed out (Dead Interval expired).',
    trigger: 'Start: Hello sent',
    packet: 'Hello',
    color: '#6b7280',
  },
  {
    name: 'Attempt',
    description: 'NBMA only — unicast Hello sent to neighbor but no response yet. Not used on broadcast/P2P networks.',
    trigger: 'NBMA: Hello unicast sent',
    packet: 'Hello (unicast)',
    color: '#f59e0b',
  },
  {
    name: 'Init',
    description: 'Hello received from neighbor, but our own Router-ID is NOT yet in their Hello packet. One-way communication established.',
    trigger: 'Hello received (not bidirectional)',
    packet: 'Hello (one-way)',
    color: '#f97316',
  },
  {
    name: '2-Way',
    description: 'Bidirectional communication confirmed — our Router-ID appears in their Hello neighbor list. On broadcast networks, DR/BDR election happens here.',
    trigger: 'Our RID seen in neighbor Hello',
    packet: 'Hello (bidirectional)',
    color: '#3b82f6',
  },
  {
    name: 'ExStart',
    description: 'Master/Slave election for DBD exchange. Higher Router-ID wins Master role. Initial DBD with empty LSDB sent to negotiate sequence numbers.',
    trigger: 'Begin DBD negotiation',
    packet: 'DBD (empty)',
    color: '#8b5cf6',
  },
  {
    name: 'Exchange',
    description: 'Full LSDB summaries (DBD packets) exchanged. Each router sends database descriptor packets listing all LSA headers it has.',
    trigger: 'Exchange DBD packets',
    packet: 'DBD (LSDB summaries)',
    color: '#ec4899',
  },
  {
    name: 'Loading',
    description: 'LSR/LSU/LSAck exchange. Missing LSAs requested via Link State Request; updates sent via Link State Update; acknowledged with LSAck.',
    trigger: 'Request missing LSAs',
    packet: 'LSR / LSU / LSAck',
    color: '#06b6d4',
  },
  {
    name: 'Full',
    description: 'LSDBs are synchronized. Adjacency is complete. SPF algorithm runs. This is the only state where routing information is computed.',
    trigger: 'LSDB synchronized',
    packet: 'LSU (periodic refresh)',
    color: '#10b981',
  },
]

function OspfNeighborStateMachine() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showAttempt, setShowAttempt] = useState(false)

  const states = showAttempt ? OSPF_STATES : OSPF_STATES.filter(s => s.name !== 'Attempt')
  const state = states[currentStep] ?? states[0]

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>OSPF Neighbor State Machine</h3>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)', cursor: 'pointer' }}>
          <input type="checkbox" checked={showAttempt} onChange={e => { setShowAttempt(e.target.checked); setCurrentStep(0) }} />
          Show NBMA Attempt state
        </label>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
        {states.map((s, i) => (
          <button
            key={s.name}
            onClick={() => setCurrentStep(i)}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              border: `1px solid ${i === currentStep ? s.color : 'var(--border)'}`,
              background: i === currentStep ? s.color : 'var(--surface)',
              color: i === currentStep ? '#fff' : 'var(--text-muted)',
              fontSize: 12,
              fontWeight: i === currentStep ? 700 : 400,
              cursor: 'pointer',
              transition: 'all .15s',
            }}
          >
            {i + 1}. {s.name}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', overflowX: 'auto', gap: 0, marginBottom: 20, paddingBottom: 4 }}>
        {states.map((s, i) => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <div
              onClick={() => setCurrentStep(i)}
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: i === currentStep ? s.color : i < currentStep ? `${s.color}55` : 'var(--surface)',
                border: `2px solid ${s.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 700,
                color: i === currentStep ? '#fff' : s.color,
                cursor: 'pointer',
                textAlign: 'center',
                lineHeight: 1.2,
                transition: 'all .2s',
              }}
            >
              {s.name}
            </div>
            {i < states.length - 1 && (
              <div style={{ width: 24, height: 2, background: i < currentStep ? G : 'var(--border)', position: 'relative' }}>
                <span style={{ position: 'absolute', right: -4, top: -5, color: i < currentStep ? G : 'var(--border)', fontSize: 12 }}>▶</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--surface)', border: `1px solid ${state.color}`, borderRadius: 8, padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <span style={{ background: state.color, color: '#fff', borderRadius: 6, padding: '4px 12px', fontWeight: 700, fontSize: 14 }}>{state.name}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: state.color, border: `1px solid ${state.color}`, borderRadius: 4, padding: '2px 8px' }}>
            {state.packet}
          </span>
        </div>
        <p style={{ margin: '0 0 8px', fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>{state.description}</p>
        <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Trigger → {state.trigger}
        </p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button
          onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
          disabled={currentStep === 0}
          style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', cursor: currentStep === 0 ? 'not-allowed' : 'pointer', opacity: currentStep === 0 ? 0.4 : 1 }}
        >
          ← Previous
        </button>
        <button
          onClick={() => setCurrentStep(s => Math.min(states.length - 1, s + 1))}
          disabled={currentStep === states.length - 1}
          style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: '1px solid var(--border)', background: G, color: '#fff', cursor: currentStep === states.length - 1 ? 'not-allowed' : 'pointer', opacity: currentStep === states.length - 1 ? 0.5 : 1 }}
        >
          Next →
        </button>
      </div>
    </div>
  )
}

/* ── Interactive Component 2: BGP Path Selection Wizard ───────────────────── */

interface BgpPath {
  id: number
  peer: string
  weight: number
  localPref: number
  asPathLen: number
  origin: string
  med: number
  peerType: string
}

const BGP_PATHS: BgpPath[] = [
  { id: 1, peer: 'ISP-A (eBGP)', weight: 100, localPref: 100, asPathLen: 3, origin: 'IGP', med: 50, peerType: 'eBGP' },
  { id: 2, peer: 'ISP-B (eBGP)', weight: 0, localPref: 150, asPathLen: 2, origin: 'IGP', med: 100, peerType: 'eBGP' },
  { id: 3, peer: 'iBGP Peer', weight: 0, localPref: 150, asPathLen: 2, origin: 'EGP', med: 80, peerType: 'iBGP' },
  { id: 4, peer: 'iBGP RR', weight: 0, localPref: 150, asPathLen: 1, origin: 'IGP', med: 80, peerType: 'iBGP' },
]

const BGP_STEPS = [
  { label: 'Weight (highest wins)', key: 'weight' as const, note: 'Cisco-proprietary, local router only. Not advertised to peers.' },
  { label: 'LOCAL_PREF (highest wins)', key: 'localPref' as const, note: 'Shared within AS via iBGP. Controls outbound path preference.' },
  { label: 'AS_PATH length (shortest wins)', key: 'asPathLen' as const, note: 'Core inter-AS metric. Longer path = less preferred. Can be manipulated with AS-path prepending.' },
  { label: 'Origin code (IGP best, then EGP, then Incomplete)', key: 'origin' as const, note: 'IGP = best (i), EGP = second (e), Incomplete = worst (?).' },
  { label: 'MED (lowest wins)', key: 'med' as const, note: 'Multi-Exit Discriminator — hint to neighbors about preferred entry point.' },
  { label: 'eBGP over iBGP', key: 'peerType' as const, note: 'eBGP routes preferred over iBGP for the same prefix.' },
]

function BgpPathSelector() {
  const [step, setStep] = useState(0)

  const originOrder = (o: string) => (o === 'IGP' ? 0 : o === 'EGP' ? 1 : 2)
  const peerOrder = (p: string) => (p === 'eBGP' ? 0 : 1)

  const winnerIds = (): number[] => {
    let survivors = BGP_PATHS.map(p => p.id)
    for (let i = 0; i <= step && i < BGP_STEPS.length; i++) {
      const s = BGP_STEPS[i]
      if (survivors.length <= 1) break

      const getValue = (id: number): number => {
        const p = BGP_PATHS.find(x => x.id === id)!
        if (s.key === 'origin') return originOrder(p.origin)
        if (s.key === 'peerType') return peerOrder(p.peerType)
        return p[s.key] as number
      }

      const isHigherBetter = s.key === 'weight' || s.key === 'localPref'
      let best = getValue(survivors[0])
      for (const id of survivors.slice(1)) {
        const v = getValue(id)
        if (isHigherBetter ? v > best : v < best) best = v
      }
      survivors = survivors.filter(id => getValue(id) === best)
    }
    return survivors
  }

  const survivors = winnerIds()
  const currentStepInfo = BGP_STEPS[step]

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>BGP Best-Path Selection Wizard</h3>
      <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--text-muted)' }}>Step through BGP&apos;s decision process to see which path wins and why.</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {BGP_STEPS.map((s, i) => (
          <button
            key={s.key}
            onClick={() => setStep(i)}
            style={{
              padding: '5px 12px',
              borderRadius: 20,
              border: `1px solid ${i === step ? G : 'var(--border)'}`,
              background: i === step ? G : 'var(--surface)',
              color: i === step ? '#fff' : 'var(--text-muted)',
              fontSize: 12,
              cursor: 'pointer',
              fontWeight: i === step ? 700 : 400,
            }}
          >
            {i + 1}. {s.key === 'localPref' ? 'LOCAL_PREF' : s.key === 'asPathLen' ? 'AS_PATH' : s.key === 'peerType' ? 'Peer type' : s.key.charAt(0).toUpperCase() + s.key.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ background: 'var(--surface)', border: `1px solid ${G}`, borderRadius: 8, padding: 12, marginBottom: 16 }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: G, marginBottom: 4 }}>Step {step + 1}: {currentStepInfo.label}</p>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{currentStepInfo.note}</p>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Peer', 'Weight', 'LOCAL_PREF', 'AS_PATH', 'Origin', 'MED', 'Type', 'Status'].map(h => (
                <th key={h} style={{ padding: '6px 10px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BGP_PATHS.map(p => {
              const isSurvivor = survivors.includes(p.id)
              const isWinner = survivors.length === 1 && survivors[0] === p.id
              return (
                <tr
                  key={p.id}
                  style={{
                    borderBottom: '1px solid var(--border)',
                    background: isWinner ? `${G}18` : isSurvivor ? 'var(--surface)' : '#ff000008',
                    opacity: isSurvivor ? 1 : 0.45,
                  }}
                >
                  <td style={{ padding: '8px 10px', fontWeight: 600, color: 'var(--text)' }}>{p.peer}</td>
                  <td style={{ padding: '8px 10px', color: currentStepInfo.key === 'weight' ? G : 'var(--text)', fontWeight: currentStepInfo.key === 'weight' ? 700 : 400 }}>{p.weight}</td>
                  <td style={{ padding: '8px 10px', color: currentStepInfo.key === 'localPref' ? G : 'var(--text)', fontWeight: currentStepInfo.key === 'localPref' ? 700 : 400 }}>{p.localPref}</td>
                  <td style={{ padding: '8px 10px', color: currentStepInfo.key === 'asPathLen' ? G : 'var(--text)', fontWeight: currentStepInfo.key === 'asPathLen' ? 700 : 400 }}>{p.asPathLen}</td>
                  <td style={{ padding: '8px 10px', color: currentStepInfo.key === 'origin' ? G : 'var(--text)', fontWeight: currentStepInfo.key === 'origin' ? 700 : 400 }}>{p.origin}</td>
                  <td style={{ padding: '8px 10px', color: currentStepInfo.key === 'med' ? G : 'var(--text)', fontWeight: currentStepInfo.key === 'med' ? 700 : 400 }}>{p.med}</td>
                  <td style={{ padding: '8px 10px', color: currentStepInfo.key === 'peerType' ? G : 'var(--text)', fontWeight: currentStepInfo.key === 'peerType' ? 700 : 400 }}>{p.peerType}</td>
                  <td style={{ padding: '8px 10px' }}>
                    {isWinner ? (
                      <span style={{ background: G, color: '#fff', borderRadius: 4, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>BEST</span>
                    ) : isSurvivor ? (
                      <span style={{ color: '#3b82f6', fontSize: 11 }}>Tied</span>
                    ) : (
                      <span style={{ color: '#ef4444', fontSize: 11 }}>Eliminated</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', cursor: step === 0 ? 'not-allowed' : 'pointer', opacity: step === 0 ? 0.4 : 1 }}
        >
          ← Back
        </button>
        <button
          onClick={() => setStep(s => Math.min(BGP_STEPS.length - 1, s + 1))}
          disabled={step === BGP_STEPS.length - 1}
          style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: '1px solid var(--border)', background: G, color: '#fff', cursor: step === BGP_STEPS.length - 1 ? 'not-allowed' : 'pointer', opacity: step === BGP_STEPS.length - 1 ? 0.5 : 1 }}
        >
          Next →
        </button>
      </div>
    </div>
  )
}

/* ── Interactive Component 3: EIGRP DUAL Feasibility Simulator ────────────── */

interface EigrpPath {
  id: number
  label: string
  fd: number
  rd: number
}

const INITIAL_PATHS: EigrpPath[] = [
  { id: 1, label: 'Path via R1 (Successor)', fd: 150, rd: 100 },
  { id: 2, label: 'Path via R2', fd: 180, rd: 120 },
  { id: 3, label: 'Path via R3', fd: 200, rd: 160 },
  { id: 4, label: 'Path via R4', fd: 190, rd: 145 },
]

function EigrpDualSimulator() {
  const [successorFd, setSuccessorFd] = useState(150)

  const roleColors: Record<string, string> = {
    Successor: G,
    FS: '#3b82f6',
    Neither: '#ef4444',
  }

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>EIGRP DUAL — Feasibility Condition Simulator</h3>
      <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
        Drag the Successor FD slider to see which paths qualify as Feasible Successors.
        Feasibility Condition: <strong>RD of candidate {'<'} FD of Successor</strong>.
      </p>

      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 13, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
          Successor Feasible Distance (FD): <strong style={{ color: G }}>{successorFd}</strong>
        </label>
        <input
          type="range"
          min={120}
          max={210}
          value={successorFd}
          onChange={e => setSuccessorFd(parseInt(e.target.value))}
          style={{ width: '100%', accentColor: G }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
          <span>120 (low cost)</span>
          <span>210 (high cost)</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {INITIAL_PATHS.map((p, idx) => {
          const isSuccessor = idx === 0
          const effectiveFd = isSuccessor ? successorFd : p.fd
          const passes = isSuccessor ? true : p.rd < successorFd
          const role = isSuccessor ? 'Successor' : passes ? 'FS' : 'Neither'
          const description = isSuccessor
            ? `This is the Successor — best path, FD = ${successorFd}`
            : passes
              ? `RD ${p.rd} < FD ${successorFd} → Feasibility Condition met → Feasible Successor`
              : `RD ${p.rd} ≥ FD ${successorFd} → Feasibility Condition FAILS → Not an FS`

          return (
            <div
              key={p.id}
              style={{
                border: `1px solid ${roleColors[role]}`,
                borderRadius: 8,
                padding: '12px 16px',
                background: role === 'Successor' ? `${G}10` : role === 'FS' ? '#3b82f610' : '#ef444410',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{p.label}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>
                    FD: {effectiveFd} &nbsp; RD: {p.rd}
                  </span>
                  <span style={{ background: roleColors[role], color: '#fff', borderRadius: 4, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{role}</span>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.5, fontFamily: 'var(--font-mono)' }}>{description}</p>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: 16, padding: 12, background: 'var(--surface)', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13, lineHeight: 1.7, color: 'var(--text-muted)' }}>
        <strong style={{ color: 'var(--text)' }}>Why this matters:</strong> Feasible Successors provide loop-free backup paths that DUAL can activate <em>instantly</em> without querying the network — achieving sub-second failover. Routes that fail the feasibility condition require a full DUAL diffusing computation before they can be used.
      </div>
    </div>
  )
}

/* ── Main export ──────────────────────────────────────────────────────────── */

export default function DynamicRouting() {
  return (
    <LearnLayout
      title="Dynamic Routing Protocols"
      description="A deep-dive into how routers automatically discover, share, and optimize paths through networks — covering OSPF's link-state database, BGP's policy engine, EIGRP's DUAL algorithm, and IS-IS's TLV architecture at production scale."
      section="Networking Fundamentals — Module 17"
      readTime="30–40 min"
      updatedAt="May 2026"
    >
      {/* Chapter 01 */}
      <Chapter n={1} title="The Routing Arms Race" />

      <StoryBox>
        It is 1969. ARPANET has four nodes. A human engineer maintains the routing tables. This works fine — there are exactly six possible paths in the entire network.
        <br /><br />
        Fast-forward to 2024. The global internet has over 900,000 BGP prefixes. Tier-1 carriers run networks spanning dozens of countries with thousands of routers. Updating routes by hand is not just impractical — it is physically impossible at the timescales involved. A fiber cut in Tokyo triggers routing convergence across the entire planet within seconds. No human is fast enough. The network must route itself.
        <br /><br />
        Dynamic routing protocols are the answer. They are distributed algorithms that give routers the ability to discover topology, compute optimal paths, and adapt to failures — automatically, continuously, and at global scale.
      </StoryBox>

      <Para>Dynamic routing protocols solve three fundamental problems: <Accent>topology discovery</Accent> (how does a router learn what the network looks like?), <Accent>path computation</Accent> (how does it decide which path is best?), and <Accent>convergence</Accent> (how does it react when the topology changes?).</Para>

      <Para>Different protocols answer these questions with radically different architectural philosophies. OSPF builds a complete map of the network and runs Dijkstra. BGP is a policy machine that trades path vectors between autonomous systems. EIGRP keeps feasible backups cached for instant failover. IS-IS speaks in TLVs and runs inside the router&apos;s management plane. Understanding these differences is not academic — it determines how you design, troubleshoot, and scale every network you build.</Para>

      <WowBox emoji="🌐" title="BGP Event Storms at Internet Scale">
        The BGP table at a major IXP contains over 900,000 prefixes, each with multiple paths. Every time a BGP update arrives, the router must re-run best-path selection for the affected prefix and potentially propagate changes to hundreds of peers. During a major route leak, this can generate millions of updates per second — a condition called a <strong>BGP event storm</strong>.
      </WowBox>

      <H3>Classification by Algorithm</H3>
      <Para>Routing protocols fall into three algorithmic families, each with distinct memory and convergence trade-offs:</Para>

      <Para><Accent>Distance-vector protocols</Accent> (RIP, EIGRP in the classical sense) implement a distributed form of Bellman-Ford. Each router knows only distances to destinations and the direction to send packets. Routers share their routing tables with neighbors. Simple to implement, but prone to count-to-infinity problems without additional mechanisms.</Para>

      <Para><Accent>Link-state protocols</Accent> (OSPF, IS-IS) flood topology information to every router in the area. Each router independently computes the SPF tree from the complete link-state database. Converges fast, eliminates routing loops by design, but requires more memory and CPU.</Para>

      <Para><Accent>Path-vector protocols</Accent> (BGP) advertise complete AS-path sequences, eliminating routing loops mathematically. Designed for inter-domain routing where policy controls trump performance. Slow to converge by design — stability is prioritized over speed.</Para>

      <Divider />

      {/* Chapter 02 */}
      <Chapter n={2} title="OSPF — The Link-State Engine" />

      <StoryBox>
        Imagine you want to know the fastest route from New York to Los Angeles. One approach: ask your neighbor &quot;how far is LA from you?&quot; and add that to your distance. This is distance-vector — you rely on neighbors&apos; reports and have no direct knowledge of the full map.
        <br /><br />
        Another approach: collect a complete road atlas of the entire country, then compute the shortest path yourself. This is link-state — you flood every road segment in the atlas to every router, and each one independently solves the shortest-path problem with perfect information.
        <br /><br />
        OSPF takes the second approach. Every router in an OSPF area has an identical copy of the link-state database (LSDB), and each independently runs Dijkstra&apos;s SPF algorithm. The result: perfectly loop-free routes computed from first principles.
      </StoryBox>

      <Para>OSPF (Open Shortest Path First) was standardized in RFC 2328 (OSPFv2 for IPv4) and RFC 5340 (OSPFv3 for IPv6). It uses the Dijkstra algorithm to compute a shortest-path tree (SPT) rooted at each router, with cost as the metric. The default cost formula is <Code>10⁸ / bandwidth</Code>, meaning higher-bandwidth links have lower cost.</Para>

      <H3>The OSPF LSDB and LSA Types</H3>
      <Para>OSPF routers flood <Accent>Link State Advertisements (LSAs)</Accent> to build a shared topology database. Understanding LSA types is critical for designing OSPF in multi-area environments:</Para>

      <CodeBlock>{`LSA Type 1 — Router LSA
  Originated by: every OSPF router
  Scope: single area
  Describes: all links and costs on the originating router

LSA Type 2 — Network LSA
  Originated by: the Designated Router (DR) on broadcast/NBMA segments
  Scope: single area
  Describes: all routers attached to the multi-access segment

LSA Type 3 — Summary LSA
  Originated by: Area Border Routers (ABRs)
  Scope: floods into other areas
  Describes: inter-area routes (distance to a prefix in another area)

LSA Type 4 — ASBR Summary LSA
  Originated by: ABRs
  Scope: all non-stub areas
  Describes: how to reach an ASBR (Autonomous System Boundary Router)

LSA Type 5 — AS External LSA
  Originated by: ASBRs
  Scope: all non-stub areas (entire OSPF domain)
  Describes: routes redistributed from outside OSPF

LSA Type 7 — NSSA External LSA
  Originated by: ASBRs inside a Not-So-Stubby Area
  Scope: NSSA only (converted to Type 5 by ABR at area boundary)`}</CodeBlock>

      <Warn title="LSA Type 3 carries prefix/cost only — not the source area's topology">
        LSA Type 3 does NOT carry the actual topology of the source area — only the prefix and its cost as seen from the ABR. Routers in other areas cannot run SPF against the source area&apos;s topology; they treat inter-area routes as distance-vector information. This is a fundamental limitation of OSPF&apos;s area hierarchy.
      </Warn>

      <H3>DR and BDR Election on Broadcast Segments</H3>
      <Para>On Ethernet segments, OSPF elects a <Accent>Designated Router (DR)</Accent> and <Accent>Backup Designated Router (BDR)</Accent> to reduce adjacency overhead. Without DR/BDR, n routers on one segment would form n(n-1)/2 adjacencies. With DR/BDR, every router forms a full adjacency only with the DR and BDR — reducing it to O(n) relationships.</Para>

      <Para>DR election uses OSPF <Accent>priority</Accent> (0–255, default 1; 0 means ineligible), then <Accent>Router-ID</Accent> as a tiebreaker. The DR uses multicast address <Code>224.0.0.6</Code> (AllDRRouters) while non-DR routers use <Code>224.0.0.5</Code> (AllSPFRouters).</Para>

      <WowBox emoji="🗳️" title="OSPF DR Election is Non-Preemptive">
        Once a DR is elected, it does NOT re-elect when a higher-priority router joins the segment. OSPF is non-preemptive for DR/BDR. A router with priority 255 joining an existing broadcast segment will become BDR (if the current BDR has lower priority), but will only become DR when the current DR fails. This prevents unnecessary reconvergence.
      </WowBox>

      <H3>OSPF Area Design</H3>
      <Para>Areas reduce SPF computation overhead and limit LSA flooding scope. All areas must connect to <Accent>Area 0 (backbone)</Accent>, either directly or through a virtual link. The backbone area floods Type 3 summaries between non-backbone areas.</Para>

      <Para>Special area types reduce routing table size by filtering external LSAs:</Para>
      <Para>• <Accent>Stub Area</Accent>: blocks Type 5 LSAs. ABR injects a default route (Type 3). No external routes, but intra-area and inter-area routes still present.</Para>
      <Para>• <Accent>Totally Stubby Area</Accent> (Cisco extension): blocks Type 3, 4, and 5 LSAs. Only intra-area routes + one default. Extreme simplification for spoke sites.</Para>
      <Para>• <Accent>Not-So-Stubby Area (NSSA)</Accent>: blocks Type 5 but allows redistribution via Type 7. Converted to Type 5 by the ABR at the boundary. Useful for branch sites with their own external connectivity.</Para>

      <CodeBlock>{`# Verify OSPF LSDB
show ip ospf database                    # All LSAs summary
show ip ospf database router             # Type 1 LSAs
show ip ospf database network            # Type 2 LSAs
show ip ospf database summary            # Type 3 LSAs
show ip ospf database external           # Type 5 LSAs

# Check neighbor states
show ip ospf neighbor

# Verify SPF calculation
show ip ospf statistics                  # SPF run count and timing

# Area authentication
router ospf 1
  area 0 authentication message-digest   # MD5 auth for Area 0`}</CodeBlock>

      <Divider />

      {/* Chapter 03 */}
      <Chapter n={3} title="The OSPF Neighbor State Machine" />

      <StoryBox>
        Two routers meet for the first time on an Ethernet segment. They don&apos;t immediately trust each other with their entire routing tables. Instead, they go through a careful eight-step handshake — each step building more trust and more information sharing than the last.
        <br /><br />
        Think of it as two strangers becoming business partners. First you see them across the room (Init). Then you get a handshake and business card exchange (2-Way). Then you negotiate who speaks first (ExStart). Then you exchange company portfolios (Exchange). Then you call for missing details (Loading). Finally, you&apos;re fully synchronized and ready to work together (Full).
      </StoryBox>

      <OspfNeighborStateMachine />

      <Para>The most common production issue is routers stuck in <Accent>EXSTART/EXCHANGE</Accent>. This is almost always an MTU mismatch — one side has a 1500-byte interface, the other has jumbo frames (9000 bytes). DBD packets exceeding the MTU are silently dropped, and the state machine hangs. Fix: match MTU on both sides or use <Code>ip ospf mtu-ignore</Code> as a workaround.</Para>

      <Para>Routers stuck at <Accent>2-WAY</Accent> on a broadcast segment is expected behavior for non-DR/BDR routers — they form 2-Way with each other but Full adjacency only with DR and BDR. This is by design, not a fault.</Para>

      <CodeBlock>{`! Troubleshoot stuck OSPF adjacency
debug ip ospf adj
debug ip ospf hello

! MTU mismatch fix
interface GigabitEthernet0/0
  ip ospf mtu-ignore          ! Workaround — better to fix MTU

! Authentication mismatch (key mismatch shows as stuck at EXSTART)
interface GigabitEthernet0/0
  ip ospf authentication message-digest
  ip ospf message-digest-key 1 md5 SecretKey123`}</CodeBlock>

      <Warn title="Hello/Dead interval mismatch silently prevents OSPF adjacency">
        If an OSPF neighbor relationship flaps between Down and Init repeatedly, check Hello/Dead interval mismatches. Default Hello is 10s (P2P/broadcast) or 30s (NBMA); Dead is 4× Hello. Mismatched intervals prevent adjacency from forming — OSPF will log &quot;Mismatched hello parameters&quot; and discard the Hello packet.
      </Warn>

      <Divider />

      {/* Chapter 04 */}
      <Chapter n={4} title="OSPF Convergence and SPF Scheduling" />

      <StoryBox>
        A fiber cable is cut. The router on one end of the link detects the loss of carrier and immediately sends a Router LSA announcing the link is down. This LSA floods across the area within milliseconds. Every router in the area receives it, updates its LSDB, and schedules an SPF computation. But SPF is expensive — Dijkstra on a large LSDB can take tens of milliseconds. You can&apos;t run it for every single topology change in real time.
        <br /><br />
        This is why OSPF uses SPF delay and throttling. The first SPF after an event runs almost immediately. If more changes arrive, subsequent SPF runs are delayed exponentially to prevent CPU saturation during network instability.
      </StoryBox>

      <Para>Modern OSPF implementations use <Accent>SPF throttle timers</Accent> with three values: initial delay, minimum hold, and maximum hold. RFC 3137 defines this as an exponential back-off. Cisco IOS defaults: <Code>timers throttle spf 50 200 5000</Code> — meaning 50ms initial delay, doubling hold times up to 5000ms maximum.</Para>

      <Para>Similarly, LSA generation is throttled with <Code>timers throttle lsa</Code> to prevent LSA storms from overwhelming OSPF flooding. The default in modern IOS: 50ms initial, 200ms minimum hold, 5000ms maximum.</Para>

      <H3>Incremental SPF (iSPF)</H3>
      <Para>Full SPF recomputes the entire shortest-path tree. <Accent>Incremental SPF (iSPF)</Accent> only recomputes the branches of the tree affected by the topology change, dramatically reducing CPU load in large networks. iSPF is triggered when only leaf nodes change (external routes, stub networks) and the tree structure itself is unchanged.</Para>

      <WowBox emoji="🔄" title="OSPF's Constant LSA Heartbeat">
        OSPF LSAs have a MaxAge of 3600 seconds (one hour). Routers must refresh all self-originated LSAs before they hit MaxAge to prevent topology information from being flushed. In a 1000-router network, each router refreshes ~20 LSAs every hour — this generates a constant background flood of LSAs that never fully stops. It is the &quot;heartbeat&quot; of the OSPF domain.
      </WowBox>

      <H3>Fast Hello and BFD</H3>
      <Para>Default OSPF Hello is 10 seconds with a 40-second Dead interval. For fast convergence, options are:</Para>
      <Para>• <Accent>Fast Hello</Accent>: sub-second Hello intervals (e.g., 1s/3s or 500ms). Works at the OSPF level but adds overhead and is limited by the OSPF process scheduler.</Para>
      <Para>• <Accent>BFD (Bidirectional Forwarding Detection)</Accent>: hardware-assisted failure detection operating independently of OSPF at 50–300ms intervals. BFD notifies OSPF immediately on link failure without waiting for Hello timeout. This is the production standard for sub-second convergence.</Para>

      <CodeBlock>{`! Enable BFD for OSPF
router ospf 1
  bfd all-interfaces                       ! Enable BFD on all OSPF interfaces

interface GigabitEthernet0/1
  bfd interval 100 min_rx 100 multiplier 3 ! 300ms detection time

! Fast Hello (alternative — less preferred than BFD)
interface GigabitEthernet0/1
  ip ospf hello-interval 1
  ip ospf dead-interval 3`}</CodeBlock>

      <Divider />

      {/* Chapter 05 */}
      <Chapter n={5} title="BGP — The Internet's Policy Engine" />

      <StoryBox>
        OSPF is designed for a single organization&apos;s network — a place where everyone trusts everyone and the goal is purely performance. BGP is designed for the opposite: the global internet, where thousands of independent organizations connect and each has its own business policies about what traffic it carries, for whom, and at what cost.
        <br /><br />
        When Comcast (AS 7922) and AT&apos;T (AS 7018) connect at an Internet Exchange, they don&apos;t want AT&apos;T running Dijkstra on Comcast&apos;s internal topology. They exchange only reachability information: &quot;I can reach 192.0.2.0/24 via this path.&quot; Each side applies its own policies — which routes to accept, which to prefer, which to advertise to others.
        <br /><br />
        BGP is not an optimization algorithm. It is a policy distribution mechanism dressed up as a routing protocol.
      </StoryBox>

      <Para>BGP (Border Gateway Protocol, RFC 4271) is the only EGP (Exterior Gateway Protocol) in production use on the internet. It operates between <Accent>Autonomous Systems (ASes)</Accent> — administratively distinct networks identified by 16-bit (original) or 32-bit (RFC 6793) AS numbers. IANA assigns public ASNs; private ASNs (64512–65534 for 16-bit, 4200000000–4294967294 for 32-bit) are used internally.</Para>

      <H3>iBGP vs eBGP</H3>
      <Para>BGP runs in two modes: <Accent>eBGP</Accent> (between different ASes) and <Accent>iBGP</Accent> (within the same AS). The differences are significant:</Para>
      <Para>• eBGP: TTL=1 by default (direct connection required unless multihop configured). Routes received via eBGP are redistributed to iBGP peers and IGP.</Para>
      <Para>• iBGP: TTL=255. iBGP does NOT re-advertise routes learned from one iBGP peer to other iBGP peers (the iBGP split-horizon rule). This prevents loops but requires full mesh or route reflectors.</Para>
      <Para>• iBGP full mesh scales as O(n²) — 50 routers require 1225 sessions. <Accent>Route Reflectors (RRs)</Accent> break the full-mesh requirement by allowing a cluster of routers to share iBGP routes via a central reflector.</Para>

      <CodeBlock>{`! Basic BGP configuration
router bgp 65001
  bgp router-id 10.0.0.1
  neighbor 203.0.113.1 remote-as 65002          ! eBGP peer (ISP)
  neighbor 203.0.113.1 description ISP-A
  neighbor 10.255.0.2 remote-as 65001            ! iBGP peer (internal)
  neighbor 10.255.0.2 update-source Loopback0
  !
  address-family ipv4 unicast
    network 192.0.2.0 mask 255.255.255.0         ! Advertise this prefix
    neighbor 203.0.113.1 activate
    neighbor 203.0.113.1 soft-reconfiguration inbound
    neighbor 10.255.0.2 activate
    neighbor 10.255.0.2 next-hop-self            ! Fix iBGP next-hop issue

! Route Reflector
router bgp 65001
  neighbor 10.255.0.3 remote-as 65001
  neighbor 10.255.0.3 route-reflector-client     ! This peer is an RR client`}</CodeBlock>

      <Warn title="iBGP next-hop must be reachable via IGP — use next-hop-self">
        iBGP next-hop is not changed by default — the eBGP next-hop (an external IP) is advertised to iBGP peers as-is. If iBGP peers cannot reach that external IP via IGP, routes will be in the BGP table but marked as unreachable (no route to next-hop). Always configure <Code>next-hop-self</Code> on iBGP sessions unless you are running IGP redistribution of external prefixes.
      </Warn>

      <Divider />

      {/* Chapter 06 */}
      <Chapter n={6} title="BGP Path Attributes and Best-Path Selection" />

      <StoryBox>
        Two internet service providers both offer you a route to 8.8.8.0/24 (Google DNS). One is cheaper and domestic; the other is slower but redundant. Which should be the primary path? Which should be the backup? And what happens if you want to send some traffic via each?
        <br /><br />
        BGP doesn&apos;t decide this for you — it gives you a rich toolkit of attributes and a deterministic selection algorithm. You express your business policy through those attributes, and BGP faithfully enforces it across every router in your AS. This is why BGP is a policy engine, not an optimizer.
      </StoryBox>

      <Para>BGP path attributes are classified by type: <Accent>well-known mandatory</Accent> (must be present in every update: ORIGIN, AS_PATH, NEXT_HOP), <Accent>well-known discretionary</Accent> (understood by all but optional: LOCAL_PREF, ATOMIC_AGGREGATE), <Accent>optional transitive</Accent> (may be forwarded even if not understood: COMMUNITY, AGGREGATOR), and <Accent>optional non-transitive</Accent> (not forwarded if not understood: MED, ORIGINATOR_ID).</Para>

      <BgpPathSelector />

      <H3>BGP Communities</H3>
      <Para>Communities are 32-bit tags (format AS:value) attached to routes for signaling policy. They are the BGP operator&apos;s primary tool for controlling what happens to routes as they traverse the network:</Para>

      <Para>• <Accent>NO_EXPORT (0xFFFFFF01)</Accent>: do not advertise beyond the local AS boundary.</Para>
      <Para>• <Accent>NO_ADVERTISE (0xFFFFFF02)</Accent>: do not advertise to any BGP peer.</Para>
      <Para>• <Accent>INTERNET (0x00000000)</Accent>: advertise to the entire internet (default behavior).</Para>
      <Para>• <Accent>Large communities (RFC 8092)</Accent>: three 32-bit values (Global Admin:Local Data 1:Local Data 2), enabling more precise signaling between operators.</Para>

      <CodeBlock>{`! BGP community-based routing policy
route-map SET_COMMUNITY permit 10
  match ip address prefix-list CUSTOMER_ROUTES
  set community 65001:100                ! Tag customer routes

route-map PEER_EXPORT permit 10
  match community COMM_100
  set local-preference 200              ! Prefer routes with this community

! AS-path prepending for traffic engineering
route-map PREPEND_ASPATH permit 10
  set as-path prepend 65001 65001 65001  ! Prepend 3x to make path less preferred

! Verify BGP attributes
show bgp ipv4 unicast 192.0.2.0/24
show bgp ipv4 unicast neighbors 203.0.113.1 routes
show bgp ipv4 unicast regexp _65002_     ! Regex on AS-PATH`}</CodeBlock>

      <WowBox emoji="🕳️" title="Remote Triggered Black Hole (RTBH) Filtering">
        BGP communities enable a practice called <strong>BLACKHOLE routing</strong>: a DDoS target announces its prefix with community 65535:666 (or operator-specific variants) to upstream providers, who then drop all traffic destined for that prefix at their edge — preventing DDoS traffic from ever reaching the victim&apos;s network. This is called <strong>Remote Triggered Black Hole (RTBH)</strong> filtering and is a standard DDoS mitigation technique used by virtually every major ISP.
      </WowBox>

      <Divider />

      {/* Chapter 07 */}
      <Chapter n={7} title="EIGRP and the DUAL Algorithm" />

      <StoryBox>
        Most routing protocols must recompute all paths when the topology changes. After a link failure, OSPF recomputes the entire SPF tree. RIP counts to infinity before finding an alternate route. Both approaches take time during which traffic is dropped.
        <br /><br />
        Cisco&apos;s EIGRP (Enhanced Interior Gateway Routing Protocol) takes a fundamentally different approach. Before a failure occurs, it pre-computes backup paths that are guaranteed to be loop-free. When a failure hits, it activates the backup path immediately — no computation, no queries, no waiting. Sub-second failover without needing BFD.
        <br /><br />
        The algorithm that makes this possible is DUAL: the Diffusing Update Algorithm, developed by J.J. Garcia-Luna-Aceves.
      </StoryBox>

      <Para>EIGRP uses <Accent>composite metric</Accent> based on bandwidth, delay, load, and reliability (the latter two disabled by default). The effective metric formula (simplified) is: <Code>metric = (K1 × bandwidth + K3 × delay) × 256</Code> where bandwidth = 10⁷ / min_bandwidth_kbps and delay = sum_delay / 10 (in tens of microseconds).</Para>

      <H3>Feasible Distance and Reported Distance</H3>
      <Para>EIGRP tracks two distances for each route:</Para>
      <Para>• <Accent>Feasible Distance (FD)</Accent>: the best metric this router has ever computed to reach a destination. The FD of the current best path is stored in the topology table.</Para>
      <Para>• <Accent>Reported Distance (RD)</Accent> (also called Advertised Distance): the metric that a neighbor reports for reaching the destination — i.e., the cost from that neighbor to the destination, not including the link to the neighbor.</Para>

      <Para>The <Accent>Feasibility Condition</Accent> is the core of DUAL: a path is a loop-free backup (Feasible Successor) if and only if its <strong>RD is strictly less than the FD of the Successor</strong>. This condition mathematically guarantees that the backup router is not using our current router in its own path — no loops are possible.</Para>

      <EigrpDualSimulator />

      <H3>EIGRP Active/Passive States</H3>
      <Para>Each route in EIGRP is either <Accent>Passive</Accent> (stable, in the routing table) or <Accent>Active</Accent> (undergoing DUAL diffusing computation after losing all feasible successors). During Active state, the router sends queries to all neighbors. If a query goes unanswered for the <Accent>Active Timer</Accent> (default 3 minutes), the router logs a <strong>Stuck in Active (SIA)</strong> error and resets the neighbor relationship.</Para>

      <Warn title="Stuck in Active (SIA) cascades when EIGRP queries propagate too far">
        SIA (Stuck in Active) is one of the most disruptive EIGRP events. It occurs when a query propagates too far into the network — commonly caused by poor EIGRP summarization design. Large, flat EIGRP domains with no route summarization can have SIA propagate across hundreds of routers, causing massive session resets. Always summarize EIGRP routes at distribution/aggregation boundaries to limit query scope.
      </Warn>

      <CodeBlock>{`! EIGRP configuration
router eigrp 100
  network 10.0.0.0 0.255.255.255
  eigrp router-id 1.1.1.1
  no auto-summary                          ! Disable classful auto-summarization

! Manual summarization to limit SIA scope
interface GigabitEthernet0/1
  ip summary-address eigrp 100 10.1.0.0 255.255.0.0

! Verify EIGRP topology table
show ip eigrp topology                     ! All routes: successors and FSes
show ip eigrp topology all-links           ! Include non-feasible paths
show ip eigrp topology active              ! Only routes in Active state (SIA risk)

! Tune DUAL timers
router eigrp 100
  timers active-time 1                     ! Reduce SIA timer to 1 minute`}</CodeBlock>

      <Divider />

      {/* Chapter 08 */}
      <Chapter n={8} title="IS-IS — The Service Provider Favorite" />

      <StoryBox>
        In the 1980s, when OSI protocols were competing with TCP/IP for internet adoption, ISO developed IS-IS (Intermediate System to Intermediate System) as a link-state protocol for OSI networks. TCP/IP won the war, but IS-IS survived in a curious way — it was retrofitted to carry IPv4 routes, and then IPv6. The result is a protocol that operates outside of IP entirely: IS-IS runs at Layer 2, using its own PDU types, and can carry any network layer payload. This independence from IP makes it almost impossible to accidentally break IS-IS by misconfiguring IP.
        <br /><br />
        Tier-1 carriers and hyperscalers often prefer IS-IS over OSPF for this exact reason: it is immune to IP-layer misconfigurations, runs faster on large topologies due to its simpler flooding model, and supports multi-topology (MT) operation natively.
      </StoryBox>

      <Para>IS-IS uses <Accent>TLV (Type-Length-Value)</Accent> encoding for all information, making it naturally extensible. New TLVs can be added for new address families (IPv6 TLV 236, segment routing TLV 135, etc.) without breaking existing implementations. OSPF, by contrast, uses fixed-format LSA types that require protocol revisions for major extensions.</Para>

      <H3>IS-IS Levels and Areas</H3>
      <Para>IS-IS organizes topology into <Accent>Level 1 (L1)</Accent> and <Accent>Level 2 (L2)</Accent> hierarchies, analogous to OSPF areas but with different semantics:</Para>
      <Para>• <Accent>L1 routers</Accent>: know only topology within their area. Route toward the nearest L1/L2 router for destinations outside the area (using the &quot;attached&quot; bit).</Para>
      <Para>• <Accent>L2 routers</Accent>: form the backbone. Know all inter-area topology. Analogous to OSPF backbone.</Para>
      <Para>• <Accent>L1/L2 routers</Accent>: border routers with both databases. Redistribute routes between L1 and L2 LSPs. Analogous to ABRs.</Para>

      <Para>IS-IS addresses use <Accent>NET (Network Entity Title)</Accent> instead of router IDs: format <Code>XX.XXXX.XXXX.XXXX.XX</Code> (area.system-id.selector). The system-id is typically derived from the loopback IP.</Para>

      <CodeBlock>{`! IS-IS configuration (IOS-XR style — common on SP gear)
router isis 1
  net 49.0001.0100.0000.0001.00       ! Area 49.0001, System-ID 0100.0000.0001
  is-type level-2-only               ! L2-only — backbone role
  address-family ipv4 unicast
    metric-style wide                 ! Wide metrics (32-bit, required for TE/SR)
  !
  interface GigabitEthernet0/0/0/0
    address-family ipv4 unicast
      metric 10
    circuit-type level-2-only

! IS-IS with Segment Routing (modern SP config)
router isis 1
  address-family ipv4 unicast
    segment-routing mpls              ! Enable SR-MPLS
  !
  interface Loopback0
    address-family ipv4 unicast
      prefix-sid index 1              ! Assign node SID

! Verify IS-IS
show isis neighbors
show isis database                    ! All LSPs in topology
show isis topology                    ! SPF computed paths`}</CodeBlock>

      <WowBox emoji="⚡" title="Hyperscalers Run IS-IS, Not OSPF">
        Google, Facebook (Meta), Amazon, and most hyperscalers run IS-IS (not OSPF) as their internal IGP. IS-IS&apos;s TLV extensibility makes it easy to add Segment Routing, traffic engineering, and flexible algorithm extensions. Google&apos;s internal network runs IS-IS with a custom traffic engineering extension that rebalances traffic across their planet-scale data center interconnect every few seconds.
      </WowBox>

      <Divider />

      {/* Chapter 09 */}
      <Chapter n={9} title="Redistribution — Connecting Different Routing Domains" />

      <StoryBox>
        A company acquires a competitor. The acquirer runs OSPF. The acquired company runs EIGRP. Customers need to reach resources in both networks immediately. The network team has six months before the full migration is complete. The solution: route redistribution — importing routes from one protocol into another.
        <br /><br />
        Redistribution is powerful and dangerous in equal measure. Done wrong, it creates feedback loops, black holes, and routing instability that can take days to diagnose. Done right, it enables seamless coexistence of multiple routing domains with surgical control over what information crosses each boundary.
      </StoryBox>

      <Para>Redistribution copies routes from one protocol&apos;s database into another. The receiving protocol treats redistributed routes as external (OSPF Type E2 by default, EIGRP external). Critically, redistributed routes carry the <Accent>Administrative Distance (AD)</Accent> of the receiving protocol for comparison with internal routes.</Para>

      <H3>The Mutual Redistribution Problem</H3>
      <Para>Bidirectional redistribution between two protocols creates <Accent>feedback loops</Accent>. Route A is learned by OSPF, redistributed into EIGRP, and then redistributed back into OSPF — now appearing as an OSPF external route with a higher AD than the original OSPF internal route. The same prefix is known via two different OSPF paths with different costs, potentially causing sub-optimal routing or oscillation.</Para>

      <Para>Prevention mechanisms:</Para>
      <Para>• <Accent>Route tags</Accent>: tag routes when redistributing into Protocol B. When redistributing back into Protocol A, filter routes with that tag. This prevents routes from bouncing back.</Para>
      <Para>• <Accent>Prefix-list filtering</Accent>: explicitly enumerate which prefixes cross each boundary. More maintenance overhead but more precise.</Para>
      <Para>• <Accent>Administrative Distance manipulation</Accent>: adjust AD of redistributed routes so internal routes always win over re-redistributed ones.</Para>

      <CodeBlock>{`! Safe bidirectional redistribution with route tags
! -- On OSPF-to-EIGRP boundary router --
router eigrp 100
  redistribute ospf 1 metric 10000 100 255 1 1500 route-map OSPF_TO_EIGRP

route-map OSPF_TO_EIGRP permit 10
  match ip address prefix-list OSPF_PREFIXES
  set tag 100                              ! Tag OSPF->EIGRP routes

router ospf 1
  redistribute eigrp 100 subnets route-map EIGRP_TO_OSPF

route-map EIGRP_TO_OSPF deny 10
  match tag 100                            ! Block routes that came from OSPF
route-map EIGRP_TO_OSPF permit 20
  match ip address prefix-list EIGRP_NATIVE`}</CodeBlock>

      <Warn title="OSPF E2 (default) ignores internal path cost — use E1 for multi-ASBR setups">
        OSPF E1 vs E2 metrics matter critically in redistribution. E2 (default) keeps the external metric constant regardless of internal path cost — a closer ASBR is not preferred over a farther one if the external cost is the same. E1 adds the internal path cost to the external metric. Use E1 when multiple ASBRs redistribute the same prefix to ensure traffic takes the shortest total path.
      </Warn>

      <Divider />

      {/* Chapter 10 */}
      <Chapter n={10} title="BGP Convergence and Route Dampening" />

      <StoryBox>
        A router somewhere in AS 7018 has a flaky optical transceiver. Every 30 seconds, its BGP session to a peer drops and re-establishes. Each drop and re-establishment propagates an UPDATE and a WITHDRAW to that peer, who propagates it to their peers, who propagate it further. A single flapping prefix can generate millions of UPDATE messages that cascade across the global BGP table — a BGP event storm.
        <br /><br />
        Route dampening is BGP&apos;s defense mechanism. Each time a prefix flaps, it accumulates a penalty. When the penalty exceeds a suppress-limit, the route is suppressed (hidden from the routing table). The penalty decays exponentially over time, and once it falls below the reuse threshold, the route is restored. Chronic flappers are suppressed for hours; occasional transients are tolerated.
      </StoryBox>

      <Para>BGP convergence is intentionally slow compared to IGPs. The <Accent>MRAI (Minimum Route Advertisement Interval)</Accent> timer (default 30s for eBGP, 5s for iBGP) delays advertisement of new best paths. This prevents rapid topology changes from being propagated globally before they stabilize. The tradeoff: even a simple link failure can take 30–90 seconds to fully converge across the internet.</Para>

      <H3>BGP Timer Tuning</H3>
      <Para>Production networks balance convergence speed against stability:</Para>
      <CodeBlock>{`! Aggressive BGP timers for faster convergence
router bgp 65001
  neighbor 203.0.113.1 timers 10 30          ! Hello 10s, Hold 30s (default 60/180)
  neighbor 203.0.113.1 timers connect 5      ! Reconnect faster after session drop

! BGP route dampening
router bgp 65001
  bgp dampening 15 750 2000 60               ! Half-life 15min, reuse 750, suppress 2000, max-suppress 60min

! Graceful restart (preserve forwarding during BGP restart)
router bgp 65001
  bgp graceful-restart
  bgp graceful-restart restart-time 120
  bgp graceful-restart stalepath-time 360

! BFD for BGP — detect failure in milliseconds
router bgp 65001
  neighbor 203.0.113.1 fall-over bfd         ! BGP tears down session on BFD failure`}</CodeBlock>

      <WowBox emoji="🚨" title="The 2010 Telefonica Route Leak">
        During the 2010 Telefonica route leak, approximately 40,000 routes were accidentally re-advertised with AS-path modifications, attracting traffic from multiple continents through a single PoP in Spain. BGP&apos;s path-vector mechanism meant the bad routes spread to hundreds of ASes within minutes before operators could apply filters. The incident highlighted how a single misconfigured router can briefly redirect global internet traffic.
      </WowBox>

      <Divider />

      {/* Chapter 11 */}
      <Chapter n={11} title="Modern DC Routing — BGP in the Data Center" />

      <StoryBox>
        Hyperscale data centers have tens of thousands of servers, hundreds of top-of-rack switches, and dozens of spine switches — all requiring IP connectivity at sub-millisecond convergence with no single point of failure. Traditional IGPs like OSPF were designed for campus and WAN topologies, not the Clos fabric of a modern data center.
        <br /><br />
        The answer that Facebook, Microsoft, and Google converged on independently: run eBGP — not OSPF — inside the data center. Each pod gets its own AS number. Spines have their own ASes. Leaves peer with spines via eBGP. This creates a hierarchy of autonomous systems where each layer can apply policy, filter routes, and fail independently.
        <br /><br />
        It sounds bizarre to run an inter-AS protocol inside a single building. But BGP&apos;s properties — policy control, explicit AS-path, no SPF recomputation storms — make it ideal for the massive scale and operational discipline of hyperscale infrastructure.
      </StoryBox>

      <Para>The <Accent>BGP Unnumbered</Accent> RFC 5549 technique allows BGP sessions to form over IPv6 link-local addresses without requiring IP address assignment on every P2P link. Combined with RFC 7938 (&quot;Use of BGP for Routing in Large-Scale Data Centers&quot;), this is the architecture that powers AWS, Azure, and Google Cloud&apos;s internal fabric.</Para>

      <H3>EVPN/VXLAN</H3>
      <Para>Modern data center overlays use <Accent>VXLAN (RFC 7348)</Accent> to tunnel Layer 2 frames across a Layer 3 underlay fabric. The control plane for VXLAN is <Accent>BGP EVPN (RFC 7432)</Accent>, which distributes MAC/IP binding information using BGP address family L2VPN EVPN.</Para>

      <Para>BGP EVPN route types relevant to VXLAN:</Para>
      <Para>• <Accent>Type 2</Accent>: MAC/IP Advertisement — maps MAC and IP to a VNI and VTEP IP.</Para>
      <Para>• <Accent>Type 3</Accent>: Inclusive Multicast Ethernet Tag — advertises VTEP presence for BUM (Broadcast/Unknown/Multicast) traffic handling.</Para>
      <Para>• <Accent>Type 5</Accent>: IP Prefix Route — for inter-VNI IP routing (symmetric IRB).</Para>

      <CodeBlock>{`! BGP EVPN/VXLAN spine configuration (NX-OS)
feature bgp
feature vn-segment-vlan-based
feature nv overlay

vlan 10
  vn-segment 10010                            ! VXLAN VNI 10010

interface nve1
  no shutdown
  host-reachability protocol bgp
  source-interface loopback0
  member vni 10010 associate-vrf              ! L3 VNI for routing

router bgp 65100
  address-family l2vpn evpn
    advertise-pip                             ! Enable per-instance IP for anycast
  neighbor 10.255.0.1
    address-family l2vpn evpn
      send-community extended                 ! Required for EVPN extended communities

! Verify EVPN
show bgp l2vpn evpn summary
show bgp l2vpn evpn route-type 2 0           ! MAC/IP routes
show nve peers`}</CodeBlock>

      <Divider />

      {/* Chapter 12 */}
      <Chapter n={12} title="Troubleshooting Dynamic Routing" />

      <StoryBox>
        A network engineer gets paged at 2 AM. Customers cannot reach the company&apos;s web servers. Ping to the server IP fails from the outside. Ping from inside works fine. The firewall team says the rules are unchanged. The server team says the servers are up and responding locally.
        <br /><br />
        The problem turns out to be a BGP route. The upstream ISP stopped advertising the company&apos;s prefix to the internet — the BGP session had gone down hours earlier due to a certificate expiry on MD5 authentication, and no one noticed. The route was simply absent from the global routing table.
        <br /><br />
        Routing troubleshooting requires a systematic top-down approach: verify the prefix is in the routing table, verify the BGP/OSPF session is up, verify the route is being advertised, verify the route is being received by peers. Every step has a specific show command.
      </StoryBox>

      <H3>OSPF Troubleshooting Checklist</H3>
      <CodeBlock>{`! 1. Verify adjacencies
show ip ospf neighbor

! 2. Check LSDB completeness (compare across routers)
show ip ospf database router | include Router ID
show ip ospf database | count Type-5

! 3. Verify route in routing table
show ip route ospf
show ip route 10.1.2.0

! 4. Check SPF scheduling
show ip ospf statistics        ! SPF run count -- excessive = instability

! 5. Verify area configuration consistency
show ip ospf              ! Check area IDs, types, stub flags

! 6. Debug with care (high CPU impact)
debug ip ospf events       ! neighbor state changes
debug ip ospf adj          ! adjacency formation details`}</CodeBlock>

      <H3>BGP Troubleshooting Checklist</H3>
      <CodeBlock>{`! 1. Session state
show bgp summary                           ! All neighbors, states, prefix counts
show bgp neighbors 203.0.113.1 | include BGP state

! 2. Prefix received from peer
show bgp ipv4 unicast neighbors 203.0.113.1 received-routes

! 3. Prefix in BGP table (after policy)
show bgp ipv4 unicast neighbors 203.0.113.1 routes

! 4. Why is a route not best?
show bgp ipv4 unicast 192.0.2.0/24        ! Shows all paths + best path markers

! 5. What is being advertised to a peer
show bgp ipv4 unicast neighbors 203.0.113.1 advertised-routes

! 6. Policy applied to a prefix
debug ip bgp 203.0.113.1 updates         ! Live update debug (careful on busy sessions)`}</CodeBlock>

      <Para>A route appearing in <Code>received-routes</Code> but not in <Code>routes</Code> means a route-map or prefix-list is filtering it inbound. A route in <Code>routes</Code> but not in <Code>advertised-routes</Code> means an outbound policy is suppressing it or the route failed next-hop validation.</Para>

      <Divider />

      {/* Chapter 13 */}
      <Chapter n={13} title="Common Misconceptions" />

      <Err title="OSPF always produces optimal paths">
        <strong>OSPF always produces optimal paths.</strong> OSPF uses the Dijkstra algorithm to compute the shortest path by metric, but the metric itself may not reflect actual bandwidth or latency. Default OSPF cost = 10⁸/bandwidth — a 100 Mbps link and a 1 Gbps link both get cost 1 using this formula (both below the reference bandwidth). Set <Code>auto-cost reference-bandwidth 100000</Code> (100 Gbps) to ensure costs differentiate modern link speeds.
      </Err>

      <Err title="BGP slow convergence is a bug that can be fixed">
        <strong>BGP slow convergence is a bug that can be fixed.</strong> BGP&apos;s slow convergence (30s MRAI timer) is intentional design, not a bug. It prevents global route oscillation by damping rapid changes before they propagate. While timers can be tuned for specific sessions (e.g., reducing to 1s for iBGP), aggressively reducing eBGP timers on full-table sessions can trigger CPU saturation during route flaps. The right tool for fast convergence is BFD + graceful restart, not aggressive BGP timers.
      </Err>

      <Err title="EIGRP's composite metric always picks the best path">
        <strong>EIGRP&apos;s composite metric always chooses the best path.</strong> EIGRP&apos;s composite metric weights bandwidth and delay by default (K1=1, K3=1, K2=K4=K5=0). Load and reliability are intentionally disabled because they fluctuate rapidly and cause route instability. The &quot;best&quot; path by EIGRP metric may differ from actual best path by latency. For latency-sensitive applications, use DSCP-based QoS policies rather than relying on EIGRP metric tuning.
      </Err>

      <Err title="IS-IS is only for service providers">
        <strong>IS-IS is only for service providers.</strong> While IS-IS is dominant in SP networks, it is increasingly used in data center spine-leaf fabrics and enterprise networks that need SR-MPLS or Flexible Algorithm support. IS-IS&apos;s TLV extensibility makes adding new capabilities (SPRING, SRv6, flexible algorithms) much cleaner than OSPF opaque LSAs. The learning curve is steeper, but the operational benefits justify it at scale.
      </Err>

      <Err title="Route redistribution is safe if done carefully">
        <strong>Route redistribution between protocols is safe if done carefully.</strong> Even &quot;careful&quot; redistribution introduces suboptimal routing, metric translation artifacts, and potential for routing feedback loops. The AD of redistributed routes (OSPF external = 110, EIGRP external = 170) means that if a loop forms, the re-redistributed route may win over the original. Redistribute only when necessary, use strict tagging and filtering, and monitor for route count anomalies after enabling redistribution.
      </Err>

      <Err title="OSPF Full adjacency guarantees the route is in the routing table">
        <strong>Full OSPF adjacency (state Full) means the route is in the routing table.</strong> A router can be Full with an OSPF neighbor yet the route can still be absent from the routing table. Causes: the route exists in the LSDB but SPF cannot find a valid path (discontiguous area, missing Type 4 LSA for ASBR, OSPF cost overflow), or the route is installed in the RIB but overridden by a higher-AD protocol for the same prefix. Always verify with <Code>show ip route</Code>, not just <Code>show ip ospf neighbor</Code>.
      </Err>

      <Divider />

      {/* Chapter 14 */}
      <Chapter n={14} title="Depth Check" />

      <IQ q="What is the difference between distance-vector and link-state routing protocols?" level="Beginner">
        Distance-vector protocols share only their routing table with neighbors (Bellman-Ford). Link-state protocols flood full topology information and each router independently computes paths (Dijkstra). OSPF and IS-IS are link-state; RIP is distance-vector; EIGRP uses DUAL which has characteristics of both.
      </IQ>

      <IQ q="Why does OSPF require all areas to connect to Area 0, and what is a virtual link?" level="Intermediate">
        OSPF Area 0 (backbone) is responsible for inter-area route distribution. Non-backbone areas must connect to it so that inter-area routes are distributed without loops. A virtual link creates a logical adjacency through a transit area when physical connectivity to Area 0 is unavailable — the virtual link traverses the transit area using unicast. It is a workaround, not a design choice — architectural redesign is always preferable.
      </IQ>

      <IQ q="Explain the iBGP split-horizon rule and why route reflectors solve it." level="Intermediate">
        iBGP does not re-advertise routes learned from an iBGP peer to another iBGP peer — this prevents routing loops within an AS. But it requires full mesh (n² sessions) for all routers to see all routes. Route reflectors break this requirement: an RR re-advertises routes between its clients (adding ORIGINATOR_ID and CLUSTER_LIST attributes to detect loops). Multiple RRs can be deployed for redundancy, creating a hierarchical iBGP topology without full mesh.
      </IQ>

      <IQ q="What is the DUAL feasibility condition and why does it guarantee loop-free paths?" level="Senior">
        DUAL&apos;s feasibility condition states: a neighbor&apos;s path is a loop-free backup if its Reported Distance (RD) is strictly less than the local router&apos;s current Feasible Distance (FD). The reasoning: if a neighbor&apos;s cost to the destination is less than my own best-known cost, that neighbor cannot be using me in its path (if it were, its cost would be at least as large as mine). Therefore, routing traffic to that neighbor cannot create a loop. This is a mathematical invariant maintained by DUAL across the entire topology.
      </IQ>

      <IQ q="Why do hyperscale data centers use eBGP rather than OSPF as their internal IGP?" level="Senior">
        BGP&apos;s properties align better with hyperscale operational requirements: AS-path provides explicit loop detection without SPF storms, each pod&apos;s failure domain is isolated by AS boundaries, route policy can be applied at every tier independently, and BGP Unnumbered (RFC 5549) eliminates address management on P2P links. OSPF SPF reconvergence on a 10,000-router topology would be prohibitively slow; BGP&apos;s incremental path-vector updates scale far better at that size.
      </IQ>

      <IQ q="How does BGP Graceful Restart interact with route dampening, and what problems can arise?" level="PhD">
        BGP Graceful Restart (RFC 4724) allows a restarting BGP speaker to retain forwarding state while its control plane recovers. Peers mark routes as &quot;stale&quot; and continue forwarding without withdrawing them for up to the restart-time. The interaction with route dampening is subtle: if a prefix was partially suppressed (penalty above half-suppress) before the graceful restart, the stale routes may be re-advertised after restart with the same dampening penalty still applied. The routes would be immediately re-suppressed even though the peer is now stable — creating a period where the prefix is actively forwarded (stale state) but suppressed in BGP (not installed in RIB). This inconsistency persists until the suppress-limit decays below the reuse threshold. Production mitigation: configure separate dampening policies for iBGP (no dampening) and eBGP (conservative dampening), and set max-suppress-time lower than graceful-restart stalepath-time.
      </IQ>

      <Divider />

      <KeyTakeaways items={[
        'OSPF uses Dijkstra SPF on a synchronized LSDB — all routers in an area compute paths independently from identical topology data, eliminating routing loops by mathematical construction.',
        'OSPF LSA types define flooding scope: Type 1/2 stay within an area, Type 3 summarizes across areas via ABRs, Type 5 floods the entire domain from ASBRs.',
        'OSPF neighbors stuck in EXSTART/EXCHANGE almost always indicates MTU mismatch — fix MTU or use ip ospf mtu-ignore as a temporary workaround.',
        'BGP is a policy engine, not an optimizer — it selects paths based on a deterministic attribute preference chain: Weight → LOCAL_PREF → AS_PATH length → Origin → MED → peer type.',
        'EIGRP DUAL pre-computes loop-free backup paths (Feasible Successors) before failures occur. The feasibility condition (RD < FD) mathematically guarantees these backups are loop-free — enabling sub-second failover without querying the network.',
        'IS-IS uses TLV encoding and operates at Layer 2, making it immune to IP misconfiguration and naturally extensible for Segment Routing, SRv6, and flexible algorithms.',
        'Bidirectional route redistribution creates feedback loop risk. Mitigate with route tags: tag routes when crossing into Protocol B, filter tagged routes when crossing back into Protocol A.',
        'BGP slow convergence (MRAI timer) is intentional — it prevents global route oscillation. Use BFD + graceful restart for fast failure detection, not aggressive BGP timer reduction.',
        'Modern hyperscale data centers use eBGP (not OSPF) as their internal IGP with each pod assigned its own AS number, enabling policy-based routing and isolated failure domains per tier.',
        'BGP EVPN/VXLAN distributes MAC/IP bindings via BGP address family L2VPN EVPN, enabling scalable Layer 2 overlays across Layer 3 fabrics — Type 2 for MAC/IP, Type 3 for BUM, Type 5 for IP prefixes.',
      ]} />
    </LearnLayout>
  )
}
