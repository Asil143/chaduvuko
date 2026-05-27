'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

/* ── helper components ─────────────────────────────────────────────── */
const G = '#10b981'

const Chapter = ({ n, title }: { n: number; title: string }) => (
  <div style={{ marginBottom: 32 }}>
    <p style={{ fontSize: 11, color: G, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 6px', letterSpacing: '.12em' }}>
      {`// CHAPTER ${String(n).padStart(2, '0')}`}
    </p>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
)

const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '56px 0' }} />

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.95, margin: '0 0 20px' }}>{children}</p>
)

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', margin: '36px 0 14px', letterSpacing: '-0.5px' }}>{children}</h3>
)

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', margin: '28px 0 10px' }}>{children}</h4>
)

const Accent = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: G, fontWeight: 700 }}>{children}</strong>
)

const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{ fontSize: 13, background: `${G}15`, color: G, padding: '2px 7px', borderRadius: 5, fontFamily: 'var(--font-mono)' }}>{children}</code>
)

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ background: '#0a0a0a', border: '1px solid #1f2937', borderRadius: 10, padding: '18px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.75, color: '#e5e7eb', margin: '20px 0', fontFamily: 'var(--font-mono)' }}>
    {children}
  </pre>
)

const StoryBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.2)', borderLeft: '4px solid #3b82f6', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.85 }}>
    <span style={{ fontWeight: 700, color: '#3b82f6', fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '.1em', display: 'block', marginBottom: 8 }}>// REAL-WORLD SCENARIO</span>
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
    <span style={{ fontWeight: 700, color: '#f59e0b', fontSize: 12, fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 8 }}>⚠ {title}</span>
    {children}
  </div>
)

const Err = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.25)', borderLeft: '4px solid #ef4444', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.85 }}>
    <span style={{ fontWeight: 700, color: '#ef4444', fontSize: 12, fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 8 }}>✗ Common Mistake — {title}</span>
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

/* ── interactive components ────────────────────────────────────────── */

type PortRole = 'Root' | 'Designated' | 'Alternate' | 'Backup' | 'Disabled'
type PortState = 'Forwarding' | 'Blocking' | 'Learning' | 'Listening' | 'Disabled'

const ROLE_COLOR: Record<PortRole, string> = {
  Root: '#10b981',
  Designated: '#3b82f6',
  Alternate: '#f59e0b',
  Backup: '#8b5cf6',
  Disabled: '#6b7280',
}

const STATE_COLOR: Record<PortState, string> = {
  Forwarding: '#10b981',
  Blocking: '#ef4444',
  Learning: '#f59e0b',
  Listening: '#f59e0b',
  Disabled: '#6b7280',
}

interface STPSwitch {
  id: string
  priority: number
  mac: string
  isRoot: boolean
  ports: { name: string; role: PortRole; state: PortState; cost: number; toSwitch: string }[]
}

const TOPOLOGY_A: STPSwitch[] = [
  {
    id: 'SW-A', priority: 4096, mac: 'AA:AA:AA:AA:AA:01', isRoot: true,
    ports: [
      { name: 'Gi0/1', role: 'Designated', state: 'Forwarding', cost: 4, toSwitch: 'SW-B' },
      { name: 'Gi0/2', role: 'Designated', state: 'Forwarding', cost: 4, toSwitch: 'SW-C' },
    ],
  },
  {
    id: 'SW-B', priority: 32768, mac: 'BB:BB:BB:BB:BB:01', isRoot: false,
    ports: [
      { name: 'Gi0/1', role: 'Root', state: 'Forwarding', cost: 4, toSwitch: 'SW-A' },
      { name: 'Gi0/2', role: 'Designated', state: 'Forwarding', cost: 4, toSwitch: 'SW-C' },
    ],
  },
  {
    id: 'SW-C', priority: 32768, mac: 'CC:CC:CC:CC:CC:01', isRoot: false,
    ports: [
      { name: 'Gi0/1', role: 'Root', state: 'Forwarding', cost: 4, toSwitch: 'SW-A' },
      { name: 'Gi0/2', role: 'Alternate', state: 'Blocking', cost: 8, toSwitch: 'SW-B' },
    ],
  },
]

function StpTopologyViewer() {
  const [selected, setSelected] = useState<string | null>(null)
  const [portDetail, setPortDetail] = useState<string | null>(null)

  const sw = TOPOLOGY_A.find(s => s.id === selected)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Interactive — STP Topology Viewer</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Click a switch to inspect its port roles and states.</p>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        {TOPOLOGY_A.map(s => (
          <div key={s.id} onClick={() => { setSelected(selected === s.id ? null : s.id); setPortDetail(null) }}
            style={{ flex: 1, minWidth: 160, background: selected === s.id ? `${G}15` : 'var(--bg)', border: `2px solid ${selected === s.id ? G : s.isRoot ? '#f59e0b' : 'var(--border)'}`, borderRadius: 10, padding: 14, cursor: 'pointer', transition: 'all .15s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{s.id}</span>
              {s.isRoot && <span style={{ fontSize: 10, fontWeight: 700, color: '#f59e0b', background: '#f59e0b20', padding: '2px 8px', borderRadius: 10 }}>ROOT</span>}
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>Priority: {s.priority}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>MAC: {s.mac}</div>
          </div>
        ))}
      </div>

      {sw && (
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', margin: '0 0 12px' }}>
            {sw.id} — BID: {sw.priority}:{sw.mac} {sw.isRoot ? '(Root Bridge)' : ''}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {sw.ports.map(p => (
              <div key={p.name} onClick={() => setPortDetail(portDetail === `${sw.id}-${p.name}` ? null : `${sw.id}-${p.name}`)}
                style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 14px', background: 'var(--bg)', border: `1px solid var(--border)`, borderRadius: 8, cursor: 'pointer' }}>
                <code style={{ fontSize: 12, color: G, fontFamily: 'var(--font-mono)', minWidth: 60 }}>{p.name}</code>
                <span style={{ fontSize: 12, fontWeight: 700, color: ROLE_COLOR[p.role], background: `${ROLE_COLOR[p.role]}15`, padding: '2px 8px', borderRadius: 10 }}>{p.role}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: STATE_COLOR[p.state], background: `${STATE_COLOR[p.state]}15`, padding: '2px 8px', borderRadius: 10 }}>{p.state}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 'auto' }}>Cost: {p.cost} → {p.toSwitch}</span>
              </div>
            ))}
          </div>
          {portDetail && (() => {
            const [swId, pName] = portDetail.split('-')
            const s = TOPOLOGY_A.find(x => x.id === swId)
            const port = s?.ports.find(p => p.name === pName)
            if (!port) return null
            const roleDesc: Record<PortRole, string> = {
              Root: 'Best path toward the Root Bridge. One per non-root switch. Always in Forwarding state.',
              Designated: 'Best port on a segment for forwarding toward the Root Bridge. One per LAN segment. Always in Forwarding state.',
              Alternate: 'Backup path toward the Root Bridge. Blocked to prevent loops — becomes Root Port if current Root Port fails.',
              Backup: 'Backup for a Designated Port on the same segment. Rare — requires two ports on same switch on same segment.',
              Disabled: 'Administratively disabled. Does not participate in STP.',
            }
            return (
              <div style={{ marginTop: 12, background: `${ROLE_COLOR[port.role]}10`, border: `1px solid ${ROLE_COLOR[port.role]}30`, borderRadius: 8, padding: 14 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: ROLE_COLOR[port.role], margin: '0 0 6px' }}>{port.role} Port</p>
                <p style={{ fontSize: 13, color: 'var(--text)', margin: 0 }}>{roleDesc[port.role]}</p>
              </div>
            )
          })()}
        </div>
      )}

      <div style={{ marginTop: 20, padding: '12px 16px', background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', margin: '0 0 6px' }}>Topology: SW-A ↔ SW-B ↔ SW-C ↔ SW-A (triangle = physical loop)</p>
        <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>STP blocks SW-C Gi0/2 (Alternate port) to break the loop. Active paths: SW-A→SW-B and SW-A→SW-C. SW-B→SW-C direct path is blocked.</p>
      </div>
    </div>
  )
}

const STP_VERSIONS = [
  { name: 'STP', std: '802.1D-1998', convergence: '30–50 s', perVlan: false, note: 'Original. One tree for all VLANs. Catastrophically slow convergence.' },
  { name: 'PVST+', std: 'Cisco (prop)', convergence: '30–50 s', perVlan: true, note: 'Cisco per-VLAN STP. Allows load balancing. Still slow convergence.' },
  { name: 'RSTP', std: '802.1w', convergence: '1–6 s', perVlan: false, note: 'Rapid STP. New port states (Discarding/Learning/Forwarding) and role-based negotiation for fast convergence.' },
  { name: 'RPVST+', std: 'Cisco (prop)', convergence: '1–6 s', perVlan: true, note: 'Cisco Rapid per-VLAN STP. Combines RSTP speed with per-VLAN trees.' },
  { name: 'MSTP', std: '802.1s', convergence: '1–6 s', perVlan: false, note: 'Multiple Spanning Tree Protocol. Maps VLANs to instances. Scales to 4094 VLANs with only a handful of STP instances.' },
]

function StpVersionComparator() {
  const [selected, setSelected] = useState<string | null>(null)

  const stp = STP_VERSIONS.find(s => s.name === selected)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Interactive — STP Version Comparator</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Click a protocol to compare features.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '100px 110px 90px 70px', gap: 0, padding: '8px 12px', borderRadius: '8px 8px 0 0', background: `${G}15`, fontSize: 11, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
          <span>Protocol</span><span>Standard</span><span>Convergence</span><span>Per-VLAN</span>
        </div>
        {STP_VERSIONS.map((s, i) => (
          <div key={s.name} onClick={() => setSelected(selected === s.name ? null : s.name)}
            style={{ display: 'grid', gridTemplateColumns: '100px 110px 90px 70px', gap: 0, padding: '10px 12px', background: selected === s.name ? `${G}12` : i % 2 === 0 ? 'var(--bg)' : 'var(--surface)', border: `1px solid ${selected === s.name ? G : 'var(--border)'}`, borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderRadius: i === STP_VERSIONS.length - 1 ? '0 0 8px 8px' : 0, cursor: 'pointer', transition: 'all .15s', alignItems: 'center' }}>
            <code style={{ fontSize: 13, fontWeight: 700, color: selected === s.name ? G : 'var(--text)' }}>{s.name}</code>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>{s.std}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: s.convergence.includes('1–6') ? G : '#f59e0b' }}>{s.convergence}</span>
            <span style={{ fontSize: 12, color: s.perVlan ? G : 'var(--muted)' }}>{s.perVlan ? 'Yes' : 'No'}</span>
          </div>
        ))}
      </div>

      {stp && (
        <div style={{ marginTop: 16, background: `${G}08`, border: `1px solid ${G}25`, borderRadius: 8, padding: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: G, margin: '0 0 6px' }}>{stp.name} — {stp.std}</p>
          <p style={{ fontSize: 13, color: 'var(--text)', margin: 0 }}>{stp.note}</p>
        </div>
      )}
    </div>
  )
}

type StpSimEvent = { type: 'bpdu' | 'topology' | 'portstate'; msg: string; color: string }

function RstpConvergenceSimulator() {
  const [events, setEvents] = useState<StpSimEvent[]>([])
  const [running, setRunning] = useState(false)
  const [step, setStep] = useState(0)

  const SCENARIO: StpSimEvent[] = [
    { type: 'bpdu', msg: 'T=0.0s SW-A sends BPDU: Root=SW-A, Cost=0, Port=Gi0/1', color: '#3b82f6' },
    { type: 'bpdu', msg: 'T=0.0s SW-B receives superior BPDU. Elects SW-A as Root. Gi0/1 → Root Port', color: '#3b82f6' },
    { type: 'bpdu', msg: 'T=0.0s SW-C receives superior BPDU. Elects SW-A as Root. Gi0/1 → Root Port', color: '#3b82f6' },
    { type: 'topology', msg: 'T=0.1s RSTP Proposal sent: SW-A Gi0/1 → SW-B (Designated port proposes sync)', color: '#8b5cf6' },
    { type: 'topology', msg: 'T=0.1s SW-B agrees (Agreement): Gi0/1 transitions to Forwarding immediately', color: G },
    { type: 'topology', msg: 'T=0.2s RSTP Proposal: SW-B Gi0/2 → SW-C', color: '#8b5cf6' },
    { type: 'portstate', msg: 'T=0.3s SW-C Gi0/2: Alternate port → Discarding (loop prevention)', color: '#f59e0b' },
    { type: 'portstate', msg: 'T=0.4s All Designated ports confirmed Forwarding. Active topology stable.', color: G },
    { type: 'topology', msg: 'T=2.0s [LINK FAILURE] SW-A Gi0/2 ↔ SW-C link goes down', color: '#ef4444' },
    { type: 'portstate', msg: 'T=2.0s SW-C detects loss of BPDUs on Gi0/1 (Root Port). Declares failure.', color: '#ef4444' },
    { type: 'portstate', msg: 'T=2.1s SW-C Gi0/2 (was Alternate): transitions from Discarding → Root Port → Forwarding', color: G },
    { type: 'topology', msg: 'T=2.1s New active path: SW-C → SW-B → SW-A. Convergence complete in ~100ms', color: G },
  ]

  const advance = () => {
    if (step < SCENARIO.length) {
      setEvents(prev => [...prev, SCENARIO[step]])
      setStep(s => s + 1)
    }
  }

  const reset = () => { setEvents([]); setStep(0); setRunning(false) }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Interactive — RSTP Convergence Simulator</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Step through BPDU exchange, port role assignments, and a link failure recovery scenario.</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={advance} disabled={step >= SCENARIO.length}
          style={{ background: step >= SCENARIO.length ? 'var(--bg)' : G, color: step >= SCENARIO.length ? 'var(--muted)' : '#000', border: '1px solid var(--border)', borderRadius: 6, padding: '7px 16px', fontSize: 13, fontWeight: 700, cursor: step >= SCENARIO.length ? 'default' : 'pointer' }}>
          Next Step
        </button>
        <button onClick={reset} style={{ background: 'var(--bg)', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 6, padding: '7px 16px', fontSize: 13, cursor: 'pointer' }}>
          Reset
        </button>
        <span style={{ fontSize: 12, color: 'var(--muted)', alignSelf: 'center' }}>{step}/{SCENARIO.length} events</span>
      </div>

      <div style={{ background: '#0a0a0a', borderRadius: 8, padding: 14, minHeight: 120, maxHeight: 280, overflowY: 'auto' }}>
        {events.length === 0 && (
          <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>Click "Next Step" to begin the simulation...</p>
        )}
        {events.map((e, i) => (
          <div key={i} style={{ fontSize: 12, color: e.color, fontFamily: 'var(--font-mono)', lineHeight: 1.7, borderBottom: '1px solid #1f2937', padding: '4px 0' }}>
            {e.msg}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── main module ───────────────────────────────────────────────────── */

export default function SpanningTreeModule() {
  return (
    <LearnLayout
      title="Spanning Tree Protocol"
      description="STP is the protocol that keeps Ethernet networks alive by breaking loops in redundant topologies. From 802.1D's 50-second convergence to RSTP's sub-second failover — a deep dive into network resilience."
      section="Networking Fundamentals — Module 11"
      readTime="22–30 min"
      updatedAt="May 2026"
    >
      {/* ── Chapter 1 ── */}
      <Chapter n={1} title="The Broadcast Storm That Killed the Network" />

      <StoryBox>
        It is 1990. A corporate campus has just deployed a second switch for redundancy. Now there are two paths between floors. The network administrator is pleased — redundancy means resilience. Then someone plugs in a misconfigured cable that creates a physical loop between the two switches. Within seconds, a single broadcast frame multiplies into thousands. Each switch receives the frame on one port and forwards it out all other ports — including back toward the source. The frame bounces forever. In under a minute, the network is saturated with billions of duplicate frames. Every device freezes. The network is dead. It takes hours to track down the cable and unplug it. Radia Perlman had already solved this problem in 1985 — with the Spanning Tree Algorithm.
      </StoryBox>

      <Para>
        Ethernet switches have a fundamental design rule: when a switch receives a frame destined for an unknown MAC address, it <Accent>floods</Accent> the frame out all ports except the incoming port. This is essential for network discovery. But in a topology with redundant links (loops), flooding creates an infinite storm.
      </Para>

      <Para>
        Consider three switches: SW-A, SW-B, SW-C, each connected to each of the others, forming a triangle. A broadcast frame enters SW-A. SW-A floods it to SW-B and SW-C. SW-B floods it back to SW-A and to SW-C. SW-C floods it back to SW-A and SW-B. Each switch immediately floods again. The frame count doubles every microsecond. In milliseconds, all bandwidth is consumed. This is a <Accent>broadcast storm</Accent>.
      </Para>

      <Para>
        The catastrophic consequence: switches also have limited memory for MAC address tables. As the storm generates billions of frames with randomized or duplicated source MAC addresses, the CAM table thrashes — constantly being overwritten. Legitimate MAC learning becomes impossible, further amplifying flooding.
      </Para>

      <H2>Radia Perlman's Solution</H2>

      <Para>
        In 1985, Radia Perlman (working at Digital Equipment Corporation) invented the <Accent>Spanning Tree Algorithm</Accent>. The insight: to eliminate loops in a graph, turn the graph into a <em>tree</em> — a loop-free topology. A tree can be constructed by identifying a root node and then finding the shortest path from every other node to the root, discarding all links that are not on any shortest path.
      </Para>

      <Para>
        Perlman's algorithm works by having switches exchange special frames called <Accent>BPDUs (Bridge Protocol Data Units)</Accent> to collectively elect a root bridge and block the redundant links that would create loops. The result: a loop-free active topology overlaid on the redundant physical topology.
      </Para>

      <WowBox emoji="🌳" title="Radia Perlman's 'Algorhyme' — and Her Regrets">
        Radia Perlman wrote a now-famous poem, "Algorhyme," to explain Spanning Tree: "I think that I shall never see / A graph more lovely than a tree. / A tree whose crucial property / Is loop-free connectivity..." She has since said she considers STP one of her least favorite inventions — it is "one of those things that is probably worse than the disease it was meant to solve" in modern data centers. RSTP and MSTP are significantly better, but STP's legacy persists.
      </WowBox>

      <Divider />

      {/* ── Chapter 2 ── */}
      <Chapter n={2} title="How STP Works: BPDUs, Root Election, and Port Roles" />

      <StoryBox>
        Imagine a democratic election where every switch starts by claiming to be the leader (Root Bridge). They all shout their candidate ID. When a switch hears a "better" candidate — one with a lower priority, or the same priority but a lower MAC address — it stops voting for itself and starts voting for the better candidate. Eventually, one switch wins unanimously: the Root Bridge. Every other switch then calculates its shortest path to the Root and blocks any ports that would create a redundant path.
      </StoryBox>

      <H2>Step 1: Root Bridge Election</H2>

      <Para>
        Every switch has a <Accent>Bridge ID (BID)</Accent> — a combination of a 2-byte priority (configurable, default 32768) and the switch's 6-byte MAC address. The switch with the <em>lowest BID</em> becomes the Root Bridge. Since priorities are configurable, network administrators can deterministically elect any switch as root by setting it to the lowest priority (e.g., 4096).
      </Para>

      <Para>
        BPDUs are sent every 2 seconds (Hello interval). Each switch initially claims to be the Root, but will defer to a lower BID when it receives a superior BPDU. The election converges when all switches agree on the same Root Bridge.
      </Para>

      <CodeBlock>
{`# Cisco IOS — verify root bridge
show spanning-tree vlan 10

VLAN0010
  Spanning tree enabled protocol rstp
  Root ID    Priority    4096
             Address     aabb.cc00.0101
             This bridge is the root
             Hello Time   2 sec  Max Age 20 sec  Forward Delay 15 sec

  Bridge ID  Priority    4096   (priority 4096 sys-id-ext 10)
             Address     aabb.cc00.0101
             Hello Time   2 sec  Max Age 20 sec  Forward Delay 15 sec

Interface           Role Sts Cost      Prio.Nbr Type
------------------- ---- --- --------- -------- ----
Gi0/1               Desg FWD 4         128.1    P2p
Gi0/2               Desg FWD 4         128.2    P2p`}
      </CodeBlock>

      <H2>Step 2: Root Port Selection</H2>

      <Para>
        On every non-root switch, each port is assigned a <Accent>port cost</Accent> based on link speed. The port that provides the <em>lowest cumulative cost path</em> to the Root Bridge is elected the <Accent>Root Port</Accent>. There is exactly one Root Port per non-root switch, and it is always in Forwarding state.
      </Para>

      <Para>
        Standard STP port costs: 10 Mbps = 100, 100 Mbps = 19, 1 Gbps = 4, 10 Gbps = 2, 100 Gbps = 1. (These are the IEEE 802.1D-2004 short-mode values — long mode uses larger values for very high-speed links.)
      </Para>

      <H2>Step 3: Designated Port Selection</H2>

      <Para>
        For every LAN segment (link between two switches), one port is elected the <Accent>Designated Port</Accent> — the single port on that segment that will forward traffic toward the Root Bridge. The Root Bridge's ports are always Designated. For other segments, the switch with the lower path cost to the Root wins Designated status; tiebreaker is lower BID.
      </Para>

      <H2>Step 4: Alternate and Backup Ports</H2>

      <Para>
        Any port that is neither a Root Port nor a Designated Port becomes an <Accent>Alternate Port</Accent> (in RSTP) — it is blocked to prevent loops. In classic STP, this was called a "Non-Designated Port" and entered the Blocking state. The key insight: Alternate Ports are pre-calculated backup paths. In RSTP, when the Root Port fails, the Alternate Port can immediately transition to Root Port without waiting for timers to expire.
      </Para>

      <StpTopologyViewer />

      <Divider />

      {/* ── Chapter 3 ── */}
      <Chapter n={3} title="STP Port States and Timers" />

      <H2>Classic STP Port States (802.1D)</H2>

      <Para>
        In original STP, ports transition through five states when coming online or recovering from a failure. This deliberate slow progression prevents transient loops during topology changes.
      </Para>

      <Para>
        <Accent>Blocking</Accent> — the initial state. Port receives BPDUs but does not forward any frames (except BPDUs). Duration: Max Age (default 20 seconds) to decide if the port should be active.
      </Para>

      <Para>
        <Accent>Listening</Accent> — the port is participating in STP and is listening to BPDUs to determine the active topology. No user data frames are forwarded. Duration: Forward Delay (default 15 seconds).
      </Para>

      <Para>
        <Accent>Learning</Accent> — the port still doesn't forward user data, but it is learning MAC addresses from frames it sees. This pre-populates the CAM table before forwarding starts, preventing a brief flood when forwarding begins. Duration: Forward Delay (15 seconds).
      </Para>

      <Para>
        <Accent>Forwarding</Accent> — the port is active and fully operational: forwarding frames, learning MAC addresses, and sending/receiving BPDUs.
      </Para>

      <Para>
        <Accent>Disabled</Accent> — administratively shut down.
      </Para>

      <Para>
        Total time from Blocking to Forwarding: Max Age (20s) + Listening (15s) + Learning (15s) = <Accent>50 seconds minimum</Accent>. This is why classic STP convergence is so slow — every topology change means 50 seconds of network unavailability on affected ports.
      </Para>

      <H2>The STP Timers</H2>

      <Para>
        <Accent>Hello Timer</Accent> (2 seconds): how often the Root Bridge sends BPDUs. If a switch misses 10 consecutive BPDUs (10 × Hello = 20s = Max Age), it declares the Root path lost and re-initiates topology change.
      </Para>

      <Para>
        <Accent>Max Age</Accent> (20 seconds): how long a switch stores a BPDU before discarding it. When a port misses BPDUs for Max Age duration, it assumes a topology change and begins transitioning.
      </Para>

      <Para>
        <Accent>Forward Delay</Accent> (15 seconds): time spent in each of the Listening and Learning states.
      </Para>

      <Warn title="Modifying STP timers">
        The STP timers are mathematically related — modifying them without understanding the relationships can cause STP instability. The default values (Hello=2, MaxAge=20, ForwardDelay=15) were calculated for a maximum network diameter of 7 switches. For larger topologies, increase Max Age and Forward Delay first. Never set Hello Timer below 1 second.
      </Warn>

      <Divider />

      {/* ── Chapter 4 ── */}
      <Chapter n={4} title="Rapid STP (RSTP) — 802.1w" />

      <StoryBox>
        The year is 2001. Modern networks have grown dramatically more complex. A 50-second convergence time means 50 seconds of voice calls dropping, video freezing, and transactions failing every time a switch is rebooted or a link flaps. The industry demands something faster. IEEE 802.1w — Rapid Spanning Tree Protocol — was published, reducing convergence from 50 seconds to under 6 seconds in most cases, and often under 1 second for directly connected switches.
      </StoryBox>

      <H2>What Changed in RSTP</H2>

      <Para>
        RSTP keeps the same fundamental algorithm — elect a Root Bridge, select Root Ports and Designated Ports, block alternate paths — but dramatically accelerates convergence with several key changes:
      </Para>

      <Para>
        <Accent>Reduced port states:</Accent> RSTP collapses five states into three: Discarding (combines Blocking + Listening + Disabled), Learning, and Forwarding. This eliminates the Listening state entirely.
      </Para>

      <Para>
        <Accent>Proposal/Agreement mechanism:</Accent> When a port wants to become Designated and forward, it sends a BPDU with the Proposal bit set. The downstream switch responds with an Agreement (if it agrees the upstream is the Designated port for the segment). Upon receiving Agreement, the port transitions to Forwarding immediately — no timers needed. This handshake replaces the 30-second wait in classic STP.
      </Para>

      <Para>
        <Accent>Topology Change Notification:</Accent> In classic STP, Topology Change Notifications (TCN) are sent to the Root, which then floods a TC flag, causing all switches to shorten their MAC address table aging time to Forward Delay (15s) — causing unnecessary MAC flushes. In RSTP, each switch directly flushes its MAC table for ports that receive a TC-flagged BPDU and notifies its neighbors, converging faster without involving the Root.
      </Para>

      <Para>
        <Accent>Edge Ports (PortFast equivalent):</Accent> RSTP designates ports connected to end devices as "edge ports" — they immediately transition to Forwarding without going through Discarding/Learning. This is functionally identical to Cisco's PortFast feature.
      </Para>

      <H2>RSTP Port Roles</H2>

      <Para>
        RSTP defines the same roles (Root, Designated, Alternate) plus one new role: <Accent>Backup Port</Accent> — a port that is a backup for a Designated Port on the same switch and same segment (requires a switch with two ports connected to the same hub/segment — rare in modern networks). Alternate and Backup ports are in the Discarding state.
      </Para>

      <RstpConvergenceSimulator />

      <H2>RSTP Link Types</H2>

      <Para>
        RSTP uses link type to determine whether Proposal/Agreement can be used. <Accent>Point-to-point</Accent> links (full-duplex between two switches) support Proposal/Agreement and achieve rapid convergence. <Accent>Shared</Accent> links (half-duplex, connected to a hub with multiple switches) cannot use Proposal/Agreement — they fall back to classic STP timer-based convergence. In modern networks with only full-duplex switches, all links are point-to-point.
      </Para>

      <Divider />

      {/* ── Chapter 5 ── */}
      <Chapter n={5} title="PVST+, RPVST+, and MSTP" />

      <H2>Per-VLAN Spanning Tree (PVST+)</H2>

      <Para>
        Standard 802.1D and 802.1w run a single spanning tree instance for the entire switched domain. This means all VLANs use the same active topology — the same links are blocked regardless of which VLAN is being considered. This wastes bandwidth on blocked links.
      </Para>

      <Para>
        Cisco's proprietary <Accent>PVST+ (Per-VLAN Spanning Tree Plus)</Accent> runs a separate STP instance per VLAN. This enables <Accent>load balancing</Accent>: SW-A can be root for VLANs 10–20 (directing traffic through one path), while SW-B is root for VLANs 30–40 (directing traffic through another path). Both paths carry traffic simultaneously for different VLANs — doubling effective bandwidth utilization of redundant links.
      </Para>

      <H2>Multiple Spanning Tree Protocol (MSTP)</H2>

      <Para>
        PVST+ runs one STP instance per VLAN. With 200 VLANs, you run 200 independent STP processes, each exchanging BPDUs every 2 seconds. On a large campus with 500 switches and 200 VLANs, that's 500 × 200 = 100,000 BPDU packets every 2 seconds — significant CPU and bandwidth overhead.
      </Para>

      <Para>
        IEEE 802.1s <Accent>MSTP</Accent> solves this by mapping multiple VLANs to a single <Accent>MST Instance (MSTI)</Accent>. You might have MSTI 1 covering VLANs 10–50, MSTI 2 covering VLANs 51–100, and MSTI 0 (IST, Internal Spanning Tree) covering all remaining VLANs. You get load balancing with only a handful of STP instances regardless of VLAN count.
      </Para>

      <StpVersionComparator />

      <Divider />

      {/* ── Chapter 6 ── */}
      <Chapter n={6} title="STP Optimizations: PortFast, BPDU Guard, Root Guard" />

      <StoryBox>
        A helpdesk technician plugs a cheap unmanaged switch into an office port to extend connectivity for a few desks. The switch starts sending BPDUs. Suddenly the network thinks there's a new switch in the topology. STP detects the change and starts recalculating. Thirty seconds of intermittent connectivity for half the floor. This is why STP hardening features exist — to protect the production topology from unintended changes.
      </StoryBox>

      <H2>PortFast</H2>

      <Para>
        End-host ports (connecting to PCs, phones, printers) will never receive BPDUs — only switches and bridges generate them. Making these ports wait 30–50 seconds to transition to Forwarding is wasteful and causes problems (DHCP requests time out before the port comes up, causing boot failures on diskless workstations).
      </Para>

      <Para>
        <Accent>PortFast</Accent> bypasses the Listening and Learning states, immediately transitioning to Forwarding when the link comes up. This should <em>only</em> be used on access ports connected to end hosts — if a switch is plugged into a PortFast port, loops can form before STP can react.
      </Para>

      <H2>BPDU Guard</H2>

      <Para>
        <Accent>BPDU Guard</Accent> is the enforcement mechanism for PortFast ports. If a BPDU is received on a PortFast port, it means something other than an end host is connected — likely a rogue switch. BPDU Guard immediately <em>error-disables</em> the port (shuts it down) and logs an alert. The port requires manual recovery (<Code>shutdown</Code> → <Code>no shutdown</Code>) or can be configured to auto-recover after a timeout.
      </Para>

      <CodeBlock>
{`! Apply PortFast and BPDU Guard to all access ports globally
spanning-tree portfast default
spanning-tree portfast bpduguard default

! Or per-interface
interface GigabitEthernet0/1
 spanning-tree portfast
 spanning-tree bpduguard enable

! Verify error-disabled ports
show interfaces status err-disabled

! Auto-recovery after 300 seconds
errdisable recovery cause bpduguard
errdisable recovery interval 300`}
      </CodeBlock>

      <H2>Root Guard</H2>

      <Para>
        <Accent>Root Guard</Accent> protects against an unauthorized switch becoming the Root Bridge. When Root Guard is enabled on a port, if a superior BPDU is received (one that would cause a new Root election), the port is immediately placed in the <em>root-inconsistent</em> state (no traffic, no MAC learning) until the superior BPDUs stop. This prevents an attacker or misconfigured switch from hijacking the Root Bridge role.
      </Para>

      <Para>
        Root Guard should be configured on all ports where you know the Root Bridge should never be located — typically all downlink ports from the distribution layer. The Root Bridge candidates should be the core/distribution switches, never access-layer switches or customer-connected ports.
      </Para>

      <H2>BPDU Filter</H2>

      <Para>
        <Accent>BPDU Filter</Accent> prevents BPDUs from being sent or processed on a port — essentially hiding the port from STP. This is appropriate for ports connecting to non-STP-capable devices. Use with extreme caution: if a loop is created on a BPDU-filtered port, STP cannot detect and block it, resulting in a broadcast storm.
      </Para>

      <H2>Loop Guard</H2>

      <Para>
        <Accent>Loop Guard</Accent> protects against a specific failure mode: a unidirectional link failure where a switch stops receiving BPDUs on a Blocking/Alternate port (because the upstream switch can't transmit) but the physical link remains up. Normally, the switch would "age out" the BPDU info and transition the blocked port to Forwarding — creating a loop. Loop Guard detects the absence of BPDUs on a port that should be receiving them and places the port in "loop-inconsistent" state instead of allowing it to transition forward.
      </Para>

      <Divider />

      {/* ── Chapter 7 ── */}
      <Chapter n={7} title="STP and Network Design" />

      <H2>Root Bridge Placement Strategy</H2>

      <Para>
        The Root Bridge should be placed at the <em>network's center of gravity</em> — the switch that provides the shortest average path to all other switches. In a three-tier enterprise network (Access → Distribution → Core), the Root Bridge should be one of the Core switches, not a Distribution or Access switch.
      </Para>

      <Para>
        Configure <Accent>primary and secondary root bridges</Accent> explicitly. The primary root uses priority 4096; the secondary uses 8192. This ensures deterministic election even after a switch replacement (a replacement switch with default priority 32768 will never outbid 4096).
      </Para>

      <CodeBlock>
{`! Set SW-CORE-01 as primary root for all VLANs
spanning-tree vlan 1-4094 root primary   ! sets priority to 24576 or lower

! Or manually
spanning-tree vlan 10 priority 4096

! Set SW-CORE-02 as secondary root
spanning-tree vlan 10 priority 8192

! Verify
show spanning-tree vlan 10 detail`}
      </CodeBlock>

      <H2>Diameter and Timer Considerations</H2>

      <Para>
        The STP default timers assume a maximum network diameter of 7 hops (switches) between any two end points. For each additional hop beyond 7, the Max Age timer may need to be increased. If a BPDU travels 9 hops but Max Age is 20 seconds with 2-second hello intervals, a valid BPDU might expire before reaching the far end, triggering unnecessary topology changes.
      </Para>

      <Para>
        With RSTP and MSTP, this is less critical — RSTP uses per-port BPDU aging rather than a global timer, and BPDUs are generated by every switch (not just the Root), so BPDUs never travel the full topology diameter.
      </Para>

      <Divider />

      {/* ── Chapter 8 ── */}
      <Chapter n={8} title="STP Attacks and Security" />

      <H2>Root Bridge Spoofing</H2>

      <Para>
        An attacker connected to an access port can send crafted BPDUs claiming a very low priority (BID priority = 0, MAC = 00:00:00:00:00:01). If Root Guard is not configured, the switch will elect the attacker's device as the Root Bridge. The attacker becomes a chokepoint for traffic flows, enabling traffic interception, manipulation, and man-in-the-middle attacks.
      </Para>

      <Para>
        Even without MITM intent, this disrupts the network: topology reconvergence causes 1–50 seconds of outage (depending on STP version), affects all VLANs (unless PVST+ is used), and may establish suboptimal traffic paths that permanently degrade performance.
      </Para>

      <Para>
        Mitigation: <Code>spanning-tree portfast bpduguard enable</Code> on all access ports, <Code>spanning-tree guard root</Code> on all designated downlinks, and 802.1X authentication to prevent unauthorized devices from connecting.
      </Para>

      <H2>TCN (Topology Change Notification) Flooding</H2>

      <Para>
        In classic STP, when a topology change occurs, all switches reduce their MAC address aging time to Forward Delay (15 seconds) for the duration of the TC flag. An attacker can flood the network with continuous TC BPDUs, causing every switch to continuously flush its MAC table. This forces switches into hub-like behavior (flooding unknown MACs) and creates significant CPU and traffic overhead.
      </Para>

      <H2>STP and VLAN Hopping</H2>

      <Para>
        Some VLAN hopping attacks require an active trunk port. By injecting BPDUs that trigger topology changes, an attacker can try to manipulate which ports are Designated vs. Alternate — potentially causing a previously blocked trunk to become active, exposing VLANs. This is why BPDU Guard and proper port security must work together.
      </Para>

      <Divider />

      {/* ── Chapter 9 ── */}
      <Chapter n={9} title="STP Monitoring and Troubleshooting" />

      <H2>Key Diagnostic Commands</H2>

      <CodeBlock>
{`# Full STP topology for a VLAN
show spanning-tree vlan 10

# See all port roles/states across all VLANs
show spanning-tree summary

# Detailed STP info including timers and BID
show spanning-tree vlan 10 detail

# Which ports are designated on this switch
show spanning-tree vlan 10 | include Desg

# Watch for topology changes in real time
debug spanning-tree events

# STP statistics — topology change count
show spanning-tree vlan 10 | include topology

# Port-level STP state
show spanning-tree interface GigabitEthernet0/1 detail`}
      </CodeBlock>

      <H2>The Five Most Common STP Issues</H2>

      <Para>
        <Accent>1. Unexpected Root Bridge.</Accent> A new switch with default priority (32768) is added to the network but has a lower MAC than the current Root, winning the election. Symptom: topology changes across the network. Fix: explicitly configure priorities on core switches to prevent any access-layer switch from winning.
      </Para>

      <Para>
        <Accent>2. PortFast on trunk ports.</Accent> A trunk port configured with PortFast immediately forwards frames before STP has determined the topology — creating a loop risk. Symptom: broadcast storms after configuration changes. Fix: PortFast should only be used on access ports. Use <Code>spanning-tree portfast trunk</Code> only when intentionally needed on trunk ports, and understand the risk.
      </Para>

      <Para>
        <Accent>3. Unidirectional link.</Accent> A fiber link can transmit in one direction but not the other (TX works, RX fails). The switch on the dead-receive end stops getting BPDUs and transitions its Blocking port to Forwarding — creating a loop. Fix: enable Loop Guard and UDLD (Unidirectional Link Detection) on all inter-switch fiber links.
      </Para>

      <Para>
        <Accent>4. Native VLAN mismatch causing STP issues.</Accent> STP BPDUs for the native VLAN are sent untagged. If native VLAN doesn't match between switches, STP BPDUs for VLAN 1 will be delivered to the wrong VLAN, causing STP to see phantom topology changes. Fix: ensure native VLAN is consistent across all trunk links.
      </Para>

      <Para>
        <Accent>5. Excessive topology changes.</Accent> A flapping link (going up/down repeatedly) triggers a TC event every time, causing MAC table flushes and brief forwarding degradation. Identify the flapping port with <Code>show interfaces counters errors</Code>, then investigate the physical layer (cable, SFP, interface settings).
      </Para>

      <Divider />

      {/* ── Chapter 10 ── */}
      <Chapter n={10} title="STP in Modern Data Centers" />

      <StoryBox>
        A hyperscaler operates 100,000 servers across 500 racks. STP cannot scale to this environment — a single topology change on a 100,000-switch domain would require all switches to participate in re-convergence, causing minutes of disruption. Modern data centers have largely eliminated STP by moving to routed leaf-spine topologies where every link is an L3 routed connection (IP-connected), not a bridged L2 connection. When everything is routed, there are no L2 loops, and STP is simply not needed.
      </StoryBox>

      <H2>RSTP in Enterprise vs. Elimination in Data Centers</H2>

      <Para>
        In enterprise campus networks, RSTP (typically RPVST+ for Cisco) remains standard. The hierarchical Access-Distribution-Core topology naturally limits the STP domain size. BPDU Guard and Root Guard protect the topology from misconfiguration. PortFast ensures end hosts connect instantly.
      </Para>

      <Para>
        In modern data centers, the move to VXLAN-based leaf-spine fabric eliminates L2 loops at the physical layer. Each leaf-to-spine connection is a routed (L3) link. VMs communicate via VXLAN overlay, which encapsulates L2 frames in UDP/IP. The underlay is fully routed — STP is irrelevant at the physical layer. STP may still run within hypervisor virtual switches, but limited to the per-host vSwitch domain.
      </Para>

      <H2>SPB (Shortest Path Bridging) — IEEE 802.1aq</H2>

      <Para>
        Shortest Path Bridging uses IS-IS routing protocol to provide loop-free L2 topology without STP. Unlike STP which blocks redundant paths, SPB allows <em>all</em> paths to be active simultaneously, using MAC-in-MAC encapsulation to route frames via the shortest path. SPB provides better bandwidth utilization than STP while maintaining L2 semantics. It has seen adoption in carrier networks and some large enterprise deployments.
      </Para>

      <Divider />

      {/* ── Chapter 11 ── */}
      <Chapter n={11} title="STP Configuration Reference" />

      <CodeBlock>
{`! === Cisco IOS — Production RSTP Configuration ===

! Enable RSTP globally (default on newer IOS)
spanning-tree mode rapid-pvst

! Set primary and secondary root bridges
spanning-tree vlan 10,20 priority 4096      ! Primary root
spanning-tree vlan 30,40 priority 8192      ! Secondary root

! PortFast + BPDU Guard on all access ports (global)
spanning-tree portfast default
spanning-tree portfast bpduguard default

! Root Guard on distribution downlinks
interface range GigabitEthernet0/1-12
 spanning-tree guard root

! Loop Guard on inter-switch links
interface GigabitEthernet0/24
 spanning-tree guard loop

! UDLD on fiber links
udld enable aggressive

! Verify complete STP state
show spanning-tree summary totals
show spanning-tree inconsistentports`}
      </CodeBlock>

      <CodeBlock>
{`! === MSTP Configuration (scaling to many VLANs) ===

spanning-tree mode mst

spanning-tree mst configuration
 name CAMPUS_MST
 revision 1
 instance 1 vlan 10-50        ! Instance 1 covers VLANs 10-50
 instance 2 vlan 51-100       ! Instance 2 covers VLANs 51-100
 instance 3 vlan 101-200      ! Instance 3 covers VLANs 101-200

! Set root per MSTI (load balance between core switches)
spanning-tree mst 1 priority 4096
spanning-tree mst 2 priority 8192
spanning-tree mst 3 priority 4096`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 12 ── */}
      <Chapter n={12} title="Real-World STP Incidents" />

      <H2>The Facebook Outage Analogy</H2>

      <Para>
        While Facebook's 2021 outage was BGP-related, the cascading failure pattern is analogous to STP storms. In STP: one misconfigured link causes a topology change → all switches flush MACs → all switches flood unknown frames → CPU spikes across all switches → switches can't process BPDUs → topology changes cascade → entire domain oscillates.
      </Para>

      <Para>
        The defense is always defense-in-depth: Root Guard prevents unauthorized Root elections; BPDU Guard prevents rogue switches; Loop Guard prevents unidirectional link failures from creating loops; UDLD detects fiber failures before STP timer expiration. No single protection is sufficient.
      </Para>

      <H2>The "Rogue Switch" Incident</H2>

      <Para>
        A common real-world incident: an employee brings a home router/switch combination and plugs two of its ports into different wall jacks on the office network (perhaps trying to extend connectivity). The device creates a physical loop. If the office switch ports have PortFast but no BPDU Guard, and the home device sends BPDUs, STP must reconverge. If the home device doesn't send BPDUs (it's not STP-aware), a loop forms and a broadcast storm ensues. BPDU Guard would err-disable the ports immediately. Without it, the network operator scrambles to find which port is looped.
      </Para>

      <Divider />

      {/* ── Chapter 13 ── */}
      <Chapter n={13} title="Common Misconceptions" />

      <Err title="STP prevents all loops permanently">
        STP prevents Layer 2 loops under normal operation, but it can be fooled. Unidirectional link failures (fiber with dead receive direction) can cause a switch to incorrectly believe it has lost its BPDU source and transition a blocked port to forwarding, creating a loop. BPDU spoofing attacks can manipulate port states. Physical cabling errors during maintenance can create transient loops before STP detects and reacts. STP provides loop prevention under the assumption of bidirectional links and honest BPDU sources. Use Loop Guard and UDLD to address the fiber failure case.
      </Err>

      <Err title="PortFast is safe on any port">
        PortFast is safe only on ports that will never connect to another switch or bridge. If a switch is plugged into a PortFast port, the port immediately starts forwarding before STP topology has been calculated — if a loop exists, STP won't have time to block it before the broadcast storm starts. Always pair PortFast with BPDU Guard, which will err-disable the port if it ever receives a BPDU (indicating a switch was plugged in).
      </Err>

      <Err title="Lowering STP timers improves reliability">
        Lowering STP timers (especially Hello interval) seems like it would speed convergence. But Hello interval and Max Age are mathematically related: Max Age = 2 × (Hello × max_hops). If Hello is too low, BPDUs may age out on large networks before reaching all switches, causing false topology changes and instability. RSTP is the correct solution for faster convergence — it doesn't rely on timers for rapid convergence; it uses Proposal/Agreement handshakes.
      </Err>

      <Err title="PVST+ runs one STP for the whole network">
        PVST+ (Per-VLAN STP+) runs a completely separate STP instance for each VLAN. With 200 VLANs, there are 200 independent root elections, 200 sets of port roles, and 200 sets of BPDUs being sent every 2 seconds. This is why MSTP was developed — to reduce this overhead by mapping many VLANs to a small number of MST instances.
      </Err>

      <Err title="Root Guard and BPDU Guard do the same thing">
        They protect different scenarios. BPDU Guard is for access ports (connected to end hosts): if any BPDU arrives, err-disable immediately — no switch should be here. Root Guard is for designated downlink ports (connected to downstream switches): the downstream switch is allowed to send BPDUs and participate in STP, but it must never send a BPDU superior enough to become Root — if it does, block it.
      </Err>

      <Divider />

      {/* ── Chapter 14 ── */}
      <Chapter n={14} title="Interview Questions" />

      <IQ q="What problem does Spanning Tree Protocol solve?" level="Beginner">
        STP solves the broadcast storm problem in redundant Ethernet networks. Ethernet switches flood unknown-destination and broadcast frames to all ports. In a topology with physical loops (redundant links between switches), a flooded frame cycles forever — each switch floods it, creating exponentially multiplying copies. STP prevents this by logically breaking loops: it selects a root bridge, calculates the shortest path from every switch to the root, and blocks any port that would create a redundant loop path. The result: a loop-free logical tree (hence "spanning tree") is overlaid on the redundant physical topology.
      </IQ>

      <IQ q="Explain the STP root bridge election process." level="Beginner">
        Every switch has a Bridge ID (BID) consisting of a 2-byte configurable priority (default 32768) and the switch's 6-byte MAC address. All switches start by claiming to be the Root Bridge and sending BPDUs with themselves as root. When a switch receives a BPDU with a lower BID than its own, it stops claiming to be Root and starts advertising the received BID as root. This propagates until all switches agree on the single lowest-BID switch as the Root Bridge. Since priorities are configurable (in increments of 4096), network administrators explicitly control which switch becomes Root by setting it to the lowest priority (e.g., 4096).
      </IQ>

      <IQ q="What are the differences between STP port roles: Root, Designated, Alternate, and Backup?" level="Intermediate">
        Root Port: one per non-root switch; the port with the lowest cumulative cost path to the Root Bridge. Always in Forwarding state. Designated Port: one per LAN segment; the port on that segment that provides the best path to the Root. On the Root Bridge, all ports are Designated. Always in Forwarding state. Alternate Port (RSTP): a port with an alternative path to the Root Bridge — blocked to prevent loops, but immediately available as a backup if the Root Port fails (no timer wait in RSTP). Backup Port (RSTP): a backup for a Designated Port on the same segment — used when a switch has two ports on the same shared segment. In the Discarding state. The key insight: Alternate Ports are why RSTP can converge so quickly after a link failure — the backup path is already known and pre-approved, it just needs to be activated.
      </IQ>

      <IQ q="How does RSTP achieve faster convergence than classic STP?" level="Intermediate">
        RSTP uses three mechanisms: (1) Proposal/Agreement handshake — when a Designated port wants to forward, it sends a Proposal BPDU. The downstream switch responds with Agreement, allowing immediate transition to Forwarding without any timer wait. (2) Edge ports (PortFast equivalent) — ports connected to end hosts skip Discarding and Learning entirely, transitioning directly to Forwarding when a link comes up. (3) Per-port BPDU aging — each port independently ages BPDUs rather than waiting for a global Max Age timer. These changes reduce convergence from the classic STP worst case of 30–50 seconds to typically 1–6 seconds, often under 1 second for directly connected links.
      </IQ>

      <IQ q="A network engineer reports intermittent connectivity issues with occasional broadcast storms. How would you diagnose and fix an STP problem?" level="Senior">
        Systematic approach: (1) Identify scope: which VLANs, which switches. Use 'show spanning-tree summary' to find topology change counts — high TC count indicates instability. (2) Find the root cause: 'show spanning-tree vlan X detail' | grep 'topology changes' shows which port is generating TCs. (3) Check port states: look for ports oscillating between Blocking and Forwarding using 'debug spanning-tree events'. (4) Check for unauthorized Root Bridges: compare 'show spanning-tree' root BID against expected core switches. (5) Identify unidirectional links: 'show interfaces counters errors' for high error counts on fiber links — enable UDLD to detect. (6) Remediation: add BPDU Guard to all access ports, add Root Guard on distribution downlinks, verify PortFast is not misconfigured on trunk ports, check for physical loop (two cables between same pair of switches without port-channel). For immediate relief during a storm: disconnect suspect links, clear MAC tables, verify STP reconverges cleanly, then reconnect and validate.
      </IQ>

      <IQ q="Explain why modern hyperscale data centers have largely eliminated STP, and what replaced it." level="PhD">
        STP has fundamental scaling limitations for hyperscale: (1) A single topology change triggers MAC table flushes across the entire L2 domain — at 100,000 servers, this causes massive traffic bursts as every switch simultaneously floods unknown destinations. (2) BPDU processing scales poorly: with PVST+ and 200 VLANs across 500 switches, you have 500 × 200 = 100,000 BPDU processes every 2 seconds. (3) STP's loop-avoidance by blocking links wastes 50% of redundant path capacity, which is economically unacceptable in hyperscale CAPEX models. Modern hyperscale solutions: (a) Routed leaf-spine fabric: every inter-switch link is an L3 routed (IP) link using ECMP (Equal-Cost Multi-Path). All paths are active simultaneously — no blocking, full bandwidth utilization, no STP needed. L3 routing convergence via OSPF/BGP replaces STP. (b) VXLAN overlay: L2 semantics are preserved for VM-to-VM communication by encapsulating Ethernet frames in VXLAN UDP tunnels between VTEP endpoints. The underlay is purely L3 (no L2 loops), so STP is irrelevant. (c) BGP EVPN as control plane: distributes MAC/IP bindings, replaces L2 flooding for ARP, provides consistent multi-site fabric extension. The result: zero dependency on STP in the physical underlay. L2 loops are architecturally impossible in a fully routed underlay. STP may run within individual hypervisor virtual switches but is contained to the hypervisor and never escapes to the physical fabric.
      </IQ>

      <KeyTakeaways items={[
        'STP prevents broadcast storms in redundant Ethernet topologies by blocking ports that would create loops — creating a logical tree over a physical mesh.',
        'Root Bridge election uses Bridge ID (priority + MAC); the lowest BID wins. Explicitly set priority on core switches to control which switch becomes Root.',
        'Port roles: Root Port (best path to Root, one per non-root switch), Designated Port (best port per segment), Alternate (blocked backup path), Backup (blocked duplicate Designated).',
        'Classic STP convergence is 30–50 seconds due to Listening + Learning timers. RSTP (802.1w) achieves 1–6 seconds using Proposal/Agreement handshake instead of timers.',
        'PVST+ runs one STP instance per VLAN (enabling load balancing). MSTP maps multiple VLANs to MST instances, reducing BPDU overhead dramatically.',
        'PortFast bypasses Listening/Learning for access ports — pair it always with BPDU Guard, which err-disables the port if a BPDU is received (indicating a rogue switch).',
        'Root Guard prevents unauthorized switches from becoming Root Bridge. Loop Guard prevents unidirectional link failures from causing loops. Both are critical hardening measures.',
        'Modern data center leaf-spine topologies are fully routed (L3), making STP irrelevant at the underlay. VXLAN provides L2 overlay semantics without requiring STP.',
        'STP attacks include Root Bridge spoofing (injecting low-priority BPDUs) and TCN flooding (forcing continuous MAC table flushes). BPDU Guard and Root Guard mitigate both.',
        'RSTP port states are Discarding, Learning, and Forwarding — simpler than classic STP\'s five states. Edge ports (PortFast) skip directly to Forwarding for end-host connections.',
      ]} />
    </LearnLayout>
  )
}
