'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import TopologyDiagram from '@/components/networking/TopologyDiagram'
import type { TopologyType } from '@/components/networking/TopologyDiagram'
import { AllTopologyPreviews } from '@/components/networking/TopologyPreviewCard'

const G = '#10b981'
const FONT_MONO = 'var(--font-mono)'
const FONT_DISPLAY = 'var(--font-display)'

// ─── Layout helpers ───────────────────────────────────────────────────────────

const Chapter = ({ n, title, subtitle }: { n: string; title: string; subtitle?: string }) => (
  <div style={{ marginBottom: 32 }}>
    <p style={{ fontSize: 11, color: G, fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 6px', letterSpacing: '.12em' }}>
      // CHAPTER {n}
    </p>
    <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>
      {title}
    </h2>
    {subtitle && (
      <p style={{ fontSize: 15, color: 'var(--muted)', margin: '8px 0 0', fontStyle: 'italic' }}>{subtitle}</p>
    )}
  </div>
)

const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '56px 0' }} />

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.95, margin: '0 0 20px' }}>{children}</p>
)

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', margin: '40px 0 14px', letterSpacing: '-0.5px' }}>{children}</h3>
)

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '28px 0 10px' }}>{children}</h4>
)

const Accent = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: G, fontWeight: 700 }}>{children}</strong>
)

const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{ fontSize: 13, background: `${G}15`, color: G, padding: '2px 7px', borderRadius: 5, fontFamily: FONT_MONO }}>{children}</code>
)

const CodeBlock = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div style={{ background: '#0d1117', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', margin: '24px 0' }}>
    {title && (
      <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', fontSize: 12, color: 'var(--muted)', fontFamily: FONT_MONO }}>
        {title}
      </div>
    )}
    <pre style={{ margin: 0, padding: '18px 20px', fontSize: 13, color: '#e2e8f0', lineHeight: 1.8, overflowX: 'auto', fontFamily: FONT_MONO }}>
      {children}
    </pre>
  </div>
)

const StoryBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ borderLeft: `4px solid #3b82f6`, background: 'rgba(59,130,246,0.07)', borderRadius: '0 10px 10px 0', padding: '18px 22px', margin: '28px 0' }}>
    <p style={{ fontSize: 11, color: '#60a5fa', fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>// REAL-WORLD SCENARIO</p>
    <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8 }}>{children}</div>
  </div>
)

const WowBox = ({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) => (
  <div style={{ background: `${G}08`, border: `1px solid ${G}25`, borderRadius: 12, padding: '18px 22px', margin: '28px 0' }}>
    <p style={{ fontSize: 13, fontWeight: 700, color: G, margin: '0 0 6px' }}>{emoji} {title}</p>
    <div style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

const Warn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: 12, padding: '18px 22px', margin: '28px 0' }}>
    <p style={{ fontSize: 13, color: '#fbbf24', fontWeight: 800, margin: '0 0 8px' }}>⚠ {title}</p>
    <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8 }}>{children}</div>
  </div>
)

const Err = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: '18px 22px', margin: '28px 0' }}>
    <p style={{ fontSize: 13, color: '#f87171', fontWeight: 800, margin: '0 0 8px' }}>✗ Common Mistake — {title}</p>
    <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8 }}>{children}</div>
  </div>
)

const IQ = ({ q, level, children }: { q: string; level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) => {
  const colors: Record<string, string> = { Beginner: '#34d399', Intermediate: '#60a5fa', Senior: '#a78bfa', PhD: '#f472b6' }
  const c = colors[level]
  return (
    <div style={{ border: `1px solid ${c}33`, borderRadius: 12, padding: '18px 22px', margin: '18px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontFamily: FONT_MONO, fontWeight: 700, color: c, background: `${c}18`, padding: '3px 10px', borderRadius: 99 }}>{level}</span>
        <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', margin: 0 }}>{q}</p>
      </div>
      <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

// ─── Interactive Component 1: Network Type Explorer ───────────────────────────

const networkTypes = [
  {
    abbr: 'PAN',
    name: 'Personal Area Network',
    color: '#f97316',
    emoji: '📱',
    range: 'Up to 10 meters',
    speed: 'Up to 3 Gbps (Bluetooth 5)',
    owned_by: 'Individual',
    tech: 'Bluetooth, USB, NFC, IrDA',
    examples: ['AirPods ↔ iPhone', 'Smartwatch ↔ Phone', 'Wireless keyboard ↔ Laptop', 'Phone hotspot → Laptop'],
    story: 'Every time you put in your earbuds, you are creating a PAN. The music travels from your phone via Bluetooth radio waves — a tiny private network that only exists within arm\'s reach.',
  },
  {
    abbr: 'LAN',
    name: 'Local Area Network',
    color: G,
    emoji: '🏠',
    range: '10 m – 1 km (one building)',
    speed: '1 Gbps – 100 Gbps',
    owned_by: 'Single organization or household',
    tech: 'Ethernet (802.3), WiFi (802.11)',
    examples: ['Your home WiFi', 'Office floor network', 'University computer lab', 'Coffee shop WiFi', 'Hospital ward network'],
    story: 'The office you work in almost certainly has a LAN. Every laptop connected to WiFi, every printer, every IP phone — all part of the same LAN. Traffic between them never leaves the building.',
  },
  {
    abbr: 'CAN',
    name: 'Campus Area Network',
    color: '#06b6d4',
    emoji: '🏫',
    range: '1 km – 5 km (campus)',
    speed: '1 Gbps – 10 Gbps (between buildings)',
    owned_by: 'Single organization',
    tech: 'Fiber between buildings, Ethernet inside',
    examples: ['Google\'s Mountain View campus (150+ buildings)', 'MIT campus network', 'Hospital campus', 'Military base'],
    story: 'Large campuses need to connect dozens of buildings. Each building has its own LAN — a CAN ties them all together via underground fiber, still entirely owned by one organization.',
  },
  {
    abbr: 'MAN',
    name: 'Metropolitan Area Network',
    color: '#8b5cf6',
    emoji: '🏙️',
    range: '5 km – 50 km (a city)',
    speed: '10 Gbps – 100 Gbps',
    owned_by: 'ISP or city government',
    tech: 'Dark fiber, SONET, Carrier Ethernet',
    examples: ['City government network linking public buildings', 'ISP backbone across a city', 'University spanning multiple city campuses', 'Smart city sensor networks'],
    story: 'A MAN is what connects your ISP\'s street-level cabinets back to their central office in the city. It is also used by city governments to connect police stations, fire departments, and hospitals on private fiber.',
  },
  {
    abbr: 'WAN',
    name: 'Wide Area Network',
    color: '#3b82f6',
    emoji: '🌏',
    range: '50 km – global',
    speed: '1 Mbps – 400 Gbps (varies wildly)',
    owned_by: 'Multiple organizations / ISPs',
    tech: 'Undersea fiber, MPLS, SD-WAN, satellite',
    examples: ['The internet itself', 'AWS internal fiber network', 'Bank\'s private MPLS connecting 500 branches', 'Starlink satellite WAN', 'Corporate SD-WAN'],
    story: 'When your request to Google leaves your city, it enters a WAN — traveling through your ISP\'s backbone, then through Tier-1 carriers, then through undersea cables if needed. You do not own any of this infrastructure.',
  },
  {
    abbr: 'SAN',
    name: 'Storage Area Network',
    color: '#ef4444',
    emoji: '💾',
    range: 'Within a data center',
    speed: '16 Gbps – 128 Gbps (Fibre Channel)',
    owned_by: 'Enterprise / data center operator',
    tech: 'Fibre Channel, iSCSI, NVMe-oF',
    examples: ['Hospital MRI archive (petabytes of imaging)', 'Netflix raw video storage', 'Database cluster shared storage', 'Financial exchange tick data'],
    story: 'A SAN is a network that only carries storage traffic. 100 database servers all see the same storage array as if it were locally attached. No general internet traffic — just block-level storage reads and writes at extreme speed.',
  },
]

function NetworkTypeExplorer() {
  const [selected, setSelected] = useState('LAN')
  const nt = networkTypes.find(n => n.abbr === selected)!

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 4px' }}>Interactive — Network Types</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 20px' }}>Click any network type to explore its scale, speed, ownership, and real-world examples.</p>

      {/* Type pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        {networkTypes.map(nt => (
          <button
            key={nt.abbr}
            onClick={() => setSelected(nt.abbr)}
            style={{
              padding: '8px 16px', borderRadius: 8, border: `2px solid ${selected === nt.abbr ? nt.color : 'var(--border)'}`,
              background: selected === nt.abbr ? `${nt.color}18` : 'var(--bg)',
              color: selected === nt.abbr ? nt.color : 'var(--muted)',
              fontWeight: 800, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s',
              fontFamily: FONT_MONO,
            }}
          >
            {nt.abbr}
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <div style={{ background: 'var(--bg)', border: `1px solid ${nt.color}30`, borderRadius: 12, padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 28 }}>{nt.emoji}</span>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: nt.color, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.12em' }}>{nt.abbr}</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)' }}>{nt.name}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 16 }}>
          {[
            { label: 'Range', value: nt.range },
            { label: 'Speed', value: nt.speed },
            { label: 'Ownership', value: nt.owned_by },
            { label: 'Technology', value: nt.tech },
          ].map(item => (
            <div key={item.label} style={{ background: `${nt.color}08`, borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: nt.color, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.2)', borderLeft: '3px solid #60a5fa', borderRadius: '0 8px 8px 0', padding: '12px 16px', marginBottom: 14 }}>
          <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0, fontStyle: 'italic' }}>{nt.story}</p>
        </div>

        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 8px' }}>Real-world examples</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {nt.examples.map(ex => (
            <span key={ex} style={{ fontSize: 12, color: nt.color, background: `${nt.color}12`, padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>{ex}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Interactive Component 2: Topology Explorer ───────────────────────────────

const topologies = [
  {
    name: 'Bus',
    emoji: '🚌',
    color: '#f97316',
    summary: 'All devices share one cable (the "bus"). Data broadcast to everyone; only the intended recipient keeps it.',
    diagram: `Device A ──┬── Device B ──┬── Device C ──┬── Device D
             │            │            │            │
      ═══════╪════════════╪════════════╪════════════╪═══════  ← shared coaxial cable
             │            │            │            │
          Terminator                             Terminator`,
    pros: ['Very cheap — one cable for everyone', 'Easy to add devices (just tap into cable)', 'Simple to understand', 'Good for small temporary networks'],
    cons: ['One break = entire network down', 'Collisions when two devices transmit at once', 'Performance degrades as devices increase', 'Maximum cable length limits scale', 'No security — everyone sees all traffic'],
    failure: 'A single break anywhere in the cable takes every device offline. There is no alternative path. This is the critical weakness of bus topology.',
    used_today: 'Almost nowhere — replaced by star. Still seen in old coaxial cable TV networks and legacy industrial automation (CAN bus in cars).',
    era: '1970s–1990s',
  },
  {
    name: 'Star',
    emoji: '⭐',
    color: G,
    summary: 'Every device connects to one central hub or switch. No direct device-to-device links. Almost all modern networks use this.',
    diagram: `         Device A
              │
    Device D──┼──Switch/Hub──┬──Device B
              │              │
         Device E        Device C
              │
         Device F`,
    pros: ['One device fails = only that device offline', 'Easy to add/remove devices', 'Centralized monitoring and management', 'No collisions with a switch (full-duplex)', 'Easy to troubleshoot (isolate the faulty port)'],
    cons: ['Switch/hub = single point of failure', 'More cable needed than bus (each device needs its own run)', 'Switch cost increases with port count', 'Hub bandwidth is shared (but switches are per-port)'],
    failure: 'If the central switch fails, the entire star segment goes down. But the switch itself is usually redundant — you can stack two switches. Individual device failures do not affect others.',
    used_today: 'Everywhere — every home router, office switch, data center ToR (Top-of-Rack) switch uses star topology internally.',
    era: '1980s–present',
  },
  {
    name: 'Ring',
    emoji: '💍',
    color: '#8b5cf6',
    summary: 'Devices connect in a closed loop — each device only talks to its two neighbors. Data travels one direction around the ring.',
    diagram: `      Device A
     /        \\
 Device D    Device B
     \\        /
      Device C
  (data flows clockwise →)`,
    pros: ['Predictable performance — token passing prevents collisions', 'Equal access for all devices (no starvation)', 'Self-healing with dual-ring variants (SONET/SDH)', 'Good for real-time deterministic networks'],
    cons: ['One failure breaks the ring (unless dual-ring)', 'Adding a device requires breaking the ring temporarily', 'Slower than star for general use', 'Rarely used for LANs today'],
    failure: 'A single failure in a simple ring breaks all communication. Modern ring implementations (SONET, RPR) use dual counter-rotating rings — if one breaks, traffic reroutes on the second ring within 50ms.',
    used_today: 'Still alive in backbone networks — SONET/SDH rings carry national telephone traffic. Token Ring (IBM) is dead. Resilient Packet Ring (RPR) used in some metro networks.',
    era: '1980s (Token Ring), still used in SONET/SDH backbone',
  },
  {
    name: 'Mesh',
    emoji: '🕸️',
    color: '#60a5fa',
    summary: 'Every device connects to every (or most) other devices directly. Extremely redundant — many paths between any two points.',
    diagram: `  A ─────── B
  │ ╲     ╱ │
  │   ╲ ╱   │
  │   ╱ ╲   │
  │ ╱     ╲ │
  C ─────── D

Full mesh: n×(n-1)/2 links
(4 nodes = 6 links, 10 nodes = 45 links)`,
    pros: ['Maximum redundancy — multiple paths between any two nodes', 'Failure of one link reroutes automatically', 'No single point of failure', 'Parallel paths = load balancing', 'The internet itself is a global partial mesh'],
    cons: ['Extremely expensive (cable and port count grows quadratically)', 'Complex configuration (routing on every node)', 'Not practical for full mesh beyond ~10 nodes'],
    failure: 'Multiple simultaneous failures needed to isolate a node. This is why the internet never "goes down" — it is a massive partial mesh where BGP reroutes around failures automatically.',
    used_today: 'The internet backbone (BGP mesh between ISPs). Data center spine-leaf (partial mesh). Military networks. SD-WAN overlays.',
    era: 'The internet (1969–present)',
  },
  {
    name: 'Tree / Hierarchical',
    emoji: '🌳',
    color: '#fbbf24',
    summary: 'A hierarchy of star networks. Root switch at top, distribution switches in middle, access switches at the bottom connecting end devices.',
    diagram: `              [Core Switch]
             /              \\
    [Distribution]      [Distribution]
     /    \\                /    \\
[Access] [Access]   [Access] [Access]
  │ │ │    │ │ │     │ │ │    │ │ │
 PCs      PCs       PCs      PCs`,
    pros: ['Scales to thousands of devices', 'Hierarchical structure maps to organizational structure', 'Easy to manage segments (by floor, department)', 'Aggregates bandwidth at each tier', 'Industry-standard for enterprise networks'],
    cons: ['Root switch failure takes down the entire tree', 'Traffic must flow up and down to cross segments', 'Complex spanning tree protocol needed to prevent loops', 'More hops = higher latency across segments'],
    failure: 'A core switch failure can isolate large portions of the network. That is why enterprise networks deploy redundant core switches in pairs (Virtual Switch System, VSS, or stacking).',
    used_today: 'Standard enterprise LAN design. Three-tier: Core → Distribution → Access. Also the basis for older data center designs before spine-leaf became dominant.',
    era: '1990s–present (enterprise standard)',
  },
  {
    name: 'Hybrid',
    emoji: '🔀',
    color: '#f472b6',
    summary: 'Any combination of the above topologies. Real-world networks are always hybrid — star within each building, mesh between data centers, ring for backbone.',
    diagram: `[Building A - Star]──[Building B - Star]
        │      ╲          /      │
        │        [Core Mesh]     │
        │      ╱          ╲      │
[Building C - Star]──[Building D - Star]
              │
        [Ring Backbone]
              │
         [WAN/Internet]`,
    pros: ['Flexible — match topology to requirements', 'Combine best features of each type', 'Redundancy where needed, cost savings where acceptable', 'Scales to any size'],
    cons: ['Complex to design and manage', 'Requires understanding of multiple topology types', 'Troubleshooting spans multiple paradigms'],
    failure: 'Failure analysis depends on which part of the hybrid fails. A good hybrid design has no single point of failure at any critical path.',
    used_today: 'Every real-world network of significant size. Your ISP uses ring (backbone) + star (customer access) + mesh (peering). Your office uses tree (internal) + star (floor) + mesh (data center).',
    era: 'Always — no large network is ever one pure topology',
  },
]

const TOPO_TYPE_MAP: Record<string, TopologyType> = {
  Bus: 'bus', Star: 'star', Ring: 'ring', Mesh: 'mesh', Tree: 'tree', Hybrid: 'hybrid',
}

function TopologyExplorer() {
  const [selected, setSelected] = useState('Star')
  const [tab, setTab] = useState<'diagram' | 'pros' | 'failure'>('diagram')
  const top = topologies.find(t => t.name === selected)!
  const topoType = TOPO_TYPE_MAP[selected]

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 4px' }}>Interactive — Topology Explorer</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 20px' }}>Select a topology to see its structure, strengths, weaknesses, and failure behavior.</p>

      {/* Topology selector */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        {topologies.map(t => (
          <button
            key={t.name}
            onClick={() => { setSelected(t.name); setTab('diagram') }}
            style={{
              padding: '8px 16px', borderRadius: 8, border: `2px solid ${selected === t.name ? t.color : 'var(--border)'}`,
              background: selected === t.name ? `${t.color}18` : 'var(--bg)',
              color: selected === t.name ? t.color : 'var(--muted)',
              fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            {t.emoji} {t.name}
          </button>
        ))}
      </div>

      {/* Summary */}
      <div style={{ background: `${top.color}08`, border: `1px solid ${top.color}25`, borderRadius: 10, padding: '14px 18px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 20 }}>{top.emoji}</span>
          <span style={{ fontSize: 15, fontWeight: 800, color: top.color }}>{top.name} Topology</span>
          <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO, marginLeft: 4 }}>Era: {top.era}</span>
        </div>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>{top.summary}</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {(['diagram', 'pros', 'failure'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border)',
              background: tab === t ? top.color : 'var(--bg)',
              color: tab === t ? '#fff' : 'var(--muted)',
              fontWeight: 700, fontSize: 12, cursor: 'pointer', transition: 'all 0.2s',
              textTransform: 'capitalize',
            }}
          >
            {t === 'diagram' ? '📐 Diagram' : t === 'pros' ? '⚖️ Trade-offs' : '💥 Failure'}
          </button>
        ))}
      </div>

      {tab === 'diagram' && topoType && <TopologyDiagram type={topoType} height={400} />}

      {tab === 'pros' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          <div style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: 10, padding: '14px 16px' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#34d399', fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 10px' }}>Advantages</p>
            {top.pros.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <span style={{ color: '#34d399', flexShrink: 0, fontSize: 13 }}>✓</span>
                <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{p}</span>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '14px 16px' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#f87171', fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 10px' }}>Disadvantages</p>
            {top.cons.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <span style={{ color: '#f87171', flexShrink: 0, fontSize: 13 }}>✗</span>
                <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'failure' && (
        <div>
          <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: '16px 18px', marginBottom: 14 }}>
            <p style={{ fontSize: 12, color: '#f87171', fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 8px' }}>💥 What happens when it fails</p>
            <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{top.failure}</p>
          </div>
          <div style={{ background: `${top.color}08`, border: `1px solid ${top.color}25`, borderRadius: 10, padding: '14px 18px' }}>
            <p style={{ fontSize: 12, color: top.color, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 8px' }}>Where it's used today</p>
            <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{top.used_today}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Interactive Component 3: Topology Decision Guide ─────────────────────────

const decisions = [
  {
    q: 'How many devices do you need to connect?',
    answers: [
      { label: '2–4 devices', score: { bus: 1, star: 1, ring: 0, mesh: 0, tree: 0 } },
      { label: '5–50 devices', score: { bus: 0, star: 2, ring: 0, mesh: 1, tree: 1 } },
      { label: '50–500 devices', score: { bus: 0, star: 0, ring: 0, mesh: 0, tree: 2 } },
      { label: '500+ devices', score: { bus: 0, star: 0, ring: 0, mesh: 1, tree: 2 } },
    ],
  },
  {
    q: 'How critical is uptime?',
    answers: [
      { label: 'Low (home / lab)', score: { bus: 1, star: 2, ring: 1, mesh: 0, tree: 1 } },
      { label: 'Medium (office)', score: { bus: 0, star: 2, ring: 0, mesh: 1, tree: 2 } },
      { label: 'High (24/7 critical)', score: { bus: 0, star: 0, ring: 2, mesh: 2, tree: 1 } },
    ],
  },
  {
    q: 'What is your budget?',
    answers: [
      { label: 'Very limited', score: { bus: 2, star: 1, ring: 0, mesh: 0, tree: 0 } },
      { label: 'Moderate', score: { bus: 0, star: 2, ring: 1, mesh: 0, tree: 1 } },
      { label: 'Large / enterprise', score: { bus: 0, star: 1, ring: 1, mesh: 1, tree: 2 } },
    ],
  },
]

function TopologyDecisionGuide() {
  const [answers, setAnswers] = useState<Record<number, number>>({})

  const scores = { bus: 0, star: 0, ring: 0, mesh: 0, tree: 0 }
  Object.entries(answers).forEach(([qIdx, aIdx]) => {
    const ans = decisions[Number(qIdx)].answers[aIdx]
    Object.entries(ans.score).forEach(([k, v]) => {
      scores[k as keyof typeof scores] += v
    })
  })

  const answered = Object.keys(answers).length
  const winner = answered === decisions.length
    ? Object.entries(scores).sort(([, a], [, b]) => b - a)[0][0]
    : null

  const winnerData: Record<string, { label: string; color: string; emoji: string }> = {
    bus: { label: 'Bus Topology', color: '#f97316', emoji: '🚌' },
    star: { label: 'Star Topology', color: G, emoji: '⭐' },
    ring: { label: 'Ring Topology', color: '#8b5cf6', emoji: '💍' },
    mesh: { label: 'Mesh Topology', color: '#60a5fa', emoji: '🕸️' },
    tree: { label: 'Tree/Hierarchical Topology', color: '#fbbf24', emoji: '🌳' },
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 4px' }}>Interactive — Which Topology Should You Use?</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 20px' }}>Answer three questions and get a topology recommendation.</p>

      {decisions.map((d, qi) => (
        <div key={qi} style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', margin: '0 0 10px' }}>{qi + 1}. {d.q}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {d.answers.map((a, ai) => (
              <button
                key={ai}
                onClick={() => setAnswers(prev => ({ ...prev, [qi]: ai }))}
                style={{
                  padding: '9px 16px', borderRadius: 8,
                  border: `2px solid ${answers[qi] === ai ? G : 'var(--border)'}`,
                  background: answers[qi] === ai ? `${G}15` : 'var(--bg)',
                  color: answers[qi] === ai ? G : 'var(--muted)',
                  fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      ))}

      {winner && (
        <div style={{ background: `${winnerData[winner].color}10`, border: `2px solid ${winnerData[winner].color}40`, borderRadius: 12, padding: '18px 20px', marginTop: 8 }}>
          <p style={{ fontSize: 12, color: winnerData[winner].color, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Recommendation</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 24 }}>{winnerData[winner].emoji}</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: winnerData[winner].color }}>{winnerData[winner].label}</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {Object.entries(scores)
              .sort(([, a], [, b]) => b - a)
              .map(([k, v]) => (
                <div key={k} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO, textTransform: 'uppercase', marginBottom: 4 }}>{k}</div>
                  <div style={{ height: Math.max(4, v * 12), background: k === winner ? winnerData[k].color : 'var(--border)', borderRadius: 4, transition: 'height 0.3s' }} />
                  <div style={{ fontSize: 11, color: k === winner ? winnerData[k].color : 'var(--muted)', fontWeight: 700, marginTop: 4 }}>{v}</div>
                </div>
              ))}
          </div>
          <button onClick={() => setAnswers({})} style={{ marginTop: 14, padding: '8px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--muted)', fontSize: 13, cursor: 'pointer' }}>
            ↩ Reset
          </button>
        </div>
      )}

      {!winner && answered > 0 && (
        <p style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', margin: '8px 0 0' }}>{decisions.length - answered} more question{decisions.length - answered !== 1 ? 's' : ''} to go…</p>
      )}
    </div>
  )
}

// ─── Main Module ──────────────────────────────────────────────────────────────

export default function NetworkTypesTopologies() {
  return (
    <LearnLayout
      title="Network Types and Topologies"
      description="LAN to WAN to SAN — and Bus to Star to Mesh. The two dimensions that define every network ever built, and why the layout you choose on day one determines what breaks on year five."
      section="Networking Fundamentals"
      readTime="35 min"
      updatedAt="May 2026"
    >

      {/* ── CHAPTER 1: The Hook ─────────────────────────────────────────── */}
      <Chapter
        n="01"
        title="The Decisions That Haunt You at 2 AM"
        subtitle="Every network failure can be traced back to a design decision made years earlier."
      />

      <StoryBox>
        It's 2 AM. The office building is dark except for one room where three engineers are hunched over laptops. The company's internal HR system just went down — 800 employees can't clock in tomorrow morning, payroll can't run, and the CEO is awake and texting. The engineers find the problem in 40 minutes: a single Ethernet switch on the third floor failed. But because of how the network was wired ten years ago, that one switch sits in the only path between the second floor and the rest of the building. One failure, hundreds of people affected. The fix for tomorrow? Replace the switch. The fix for the architecture? Months of rewiring.
      </StoryBox>

      <Para>
        This is what topology decisions actually cost. The engineer who wired that building in 2014 chose the cheapest option — one switch per floor, connected in a chain. No redundancy. No alternative paths. Nobody asked "what happens if this one switch dies?" That question should have been answered on day one.
      </Para>

      <Para>
        This module gives you two frameworks for classifying and designing networks. The first is <Accent>network type</Accent> — how geographically large is this network, and who owns it? The second is <Accent>topology</Accent> — what shape does the physical wiring take, and how does that shape determine resilience, cost, and scale? These are not academic classifications. They are the vocabulary you need to design networks that survive reality.
      </Para>

      <WowBox emoji="🎯" title="The two questions every network designer must answer">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginTop: 8 }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: G, marginBottom: 6 }}>Network Type</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>"How big is this network and who controls it?" — LAN vs WAN vs MAN. Scale determines technology choices.</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: G, marginBottom: 6 }}>Topology</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>"What shape is the wiring?" — Bus, Star, Ring, Mesh. Shape determines what breaks, what doesn't, and what it costs.</div>
          </div>
        </div>
      </WowBox>

      <Divider />

      {/* ── CHAPTER 2: Network Types ────────────────────────────────────── */}
      <Chapter
        n="02"
        title="Network Types — Classified by Geographic Scope"
        subtitle="From the Bluetooth in your ear to the fiber under the Pacific Ocean."
      />

      <Para>
        The most fundamental way to classify a network is by geographic scale. Engineers use these terms constantly — in job descriptions, architecture diagrams, vendor docs, and incident reports. Understanding what each acronym actually means (not just the expansion) saves you from confusion in every technical conversation.
      </Para>

      <NetworkTypeExplorer />

      <H2>The Lines Are Blurring — Cloud Changed Everything</H2>

      <Para>
        These categories were crisp in 1990. Today, they blur in fascinating ways. When your startup team connects via WireGuard VPN to a private subnet on AWS, is that a LAN or a WAN? Technically, it is a WAN traversal (traffic crosses the internet) that behaves exactly like a LAN — same private IP subnet, no NAT, sub-10ms latency. AWS calls this a <Accent>VPC (Virtual Private Cloud)</Accent>, and it deliberately gives you LAN semantics over WAN infrastructure.
      </Para>

      <Para>
        Similarly, when you use <Accent>SD-WAN (Software-Defined WAN)</Accent>, you are abstracting the physical WAN links (MPLS, broadband, LTE) into a single logical network managed by software. A branch office in Chennai and a headquarters in Hyderabad appear to be on the same "flat" network — but the physical connection might be switching between MPLS and LTE depending on cost and latency. The topology is virtual, not physical.
      </Para>

      <StoryBox>
        Cloudflare operates 300+ data centers in 100+ countries. Between any two Cloudflare data centers, traffic travels over private leased fiber (where available) or their own undersea cable investments. Within each data center, it is a LAN (gigabit Ethernet, millisecond latency). Between data centers in the same city, it is effectively a MAN (fiber, ~1ms). Between continents, it is a WAN (100-200ms). The same organization spans all three types simultaneously — and calls the whole thing "the edge."
      </StoryBox>

      <H2>When to Use What</H2>

      <div style={{ margin: '20px 0 28px' }}>
        {[
          { scenario: 'Connecting devices in your home or small office', type: 'LAN', why: 'Everything is local. High speed (Gigabit WiFi/Ethernet), zero WAN cost, you control everything.' },
          { scenario: 'Connecting multiple office buildings in the same city', type: 'MAN or CAN', why: 'Lease dark fiber between buildings, or pay an ISP for a metro Ethernet service. Faster than WAN, cheaper than private fiber for longer distances.' },
          { scenario: 'Connecting offices in different cities or countries', type: 'WAN', why: 'Options: MPLS (private, expensive, low latency), internet + VPN (cheap, variable latency), SD-WAN (best of both worlds).' },
          { scenario: 'Connecting servers to shared storage in a data center', type: 'SAN', why: 'Block-level storage traffic needs dedicated bandwidth and ultra-low latency. General-purpose LAN is too slow and shared.' },
          { scenario: 'Connecting employee phones, laptops, smartwatches', type: 'PAN (Bluetooth) + LAN (WiFi)', why: 'Bluetooth for personal device pairing, WiFi for internet access. Both coexist — Bluetooth at 2.4 GHz, WiFi at 5 GHz.' },
        ].map(row => (
          <div key={row.scenario} style={{ display: 'flex', gap: 16, marginBottom: 10, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 18px', alignItems: 'flex-start' }}>
            <code style={{ fontSize: 12, fontWeight: 800, color: G, background: `${G}15`, padding: '3px 8px', borderRadius: 5, fontFamily: FONT_MONO, flexShrink: 0, marginTop: 2 }}>{row.type}</code>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{row.scenario}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{row.why}</div>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ── CHAPTER 3: Physical Topologies ─────────────────────────────── */}
      <Chapter
        n="03"
        title="Physical Topologies — The Shape of Your Network"
        subtitle="How devices are wired together determines what can fail, how fast data travels, and how much it costs."
      />

      <StoryBox>
        Imagine you are designing the electrical system for a new apartment building. Option A: run one wire down the hallway and tap each apartment off it. Cheap, but if the wire breaks anywhere, every apartment goes dark. Option B: run a separate wire from the fuse box to each apartment individually. More cable, but each apartment is independent — one failure never affects another. Option C: run two separate wire paths to each apartment, so even if the main wire fails, a backup takes over. The most expensive, but zero single points of failure. You have just designed a bus, star, and redundant star. Every network topology decision follows exactly this logic.
      </StoryBox>

      <Para>
        Physical topology describes how devices are physically wired to each other — the actual shape of the cables. There are six fundamental topologies. Every real-world network is built from some combination of them.
      </Para>

      <AllTopologyPreviews />

      <TopologyExplorer />

      <Divider />

      {/* ── CHAPTER 4: Bus Topology — The Original ─────────────────────── */}
      <Chapter
        n="04"
        title="Bus Topology — The Network That Taught Us What Not to Do"
        subtitle="Understanding why it was built the way it was, and why it disappeared."
      />

      <Para>
        In the early 1980s, a coaxial cable ran through an office building and every computer was physically clamped to it with a vampire tap — a connector that pierced the cable shielding to make contact. This was <Accent>10BASE5 (Thick Ethernet)</Accent>, and it was revolutionary. One cable, unlimited devices, no dedicated hardware beyond the cable itself. By 1985, it evolved to 10BASE2 (Thin Ethernet, BNC connectors) which you could wire yourself with cheap coaxial cable.
      </Para>

      <Para>
        The fundamental problem was <Accent>collision domains</Accent>. Since all devices shared the same wire, only one device could transmit at a time. If two devices transmitted simultaneously, their signals collided and destroyed each other — both had to wait a random interval and retry. This is called <Accent>CSMA/CD (Carrier Sense Multiple Access with Collision Detection)</Accent>. As devices were added, collisions multiplied, performance dropped. A 10 Mbps bus with 20 devices might only deliver 2-3 Mbps effective throughput.
      </Para>

      <CodeBlock title="CSMA/CD — how bus devices took turns">
        {`1. Listen: Is anyone transmitting? (Carrier Sense)
2. If yes: wait until channel is free
3. If no: start transmitting your data
4. While transmitting: keep listening (Collision Detection)
5. If collision detected:
   a. Stop transmitting immediately
   b. Send jam signal (tell everyone there was a collision)
   c. Wait a random "backoff" time (exponential backoff)
   d. Go back to step 1
6. After 16 failed attempts: give up, report error

Efficiency drops sharply with more devices:
 5 devices  → ~85% channel efficiency
20 devices  → ~40% channel efficiency
50 devices  → ~10% channel efficiency`}
      </CodeBlock>

      <Para>
        The single biggest failure mode of bus topology was physical: <Accent>one break, everyone goes down</Accent>. A cable cut, a bad connector, even a loose BNC terminator at either end — and every device on the bus lost connectivity instantly. There was no alternative path. Network troubleshooting in the bus era involved walking the entire cable run with an ohmmeter looking for a break. Engineers who grew up in this era still flinch at coaxial cable.
      </Para>

      <Err title="Bus topology is still used in modern networks">
        You will not build a bus topology LAN today. But you will encounter the concept in two places: (1) exam questions, where understanding bus is the starting point for understanding why star topology became dominant; (2) industrial networks — the CAN bus (Controller Area Network) in every modern car is literally a bus topology. Your car's ECU, ABS controller, airbag system, and infotainment all share a two-wire CAN bus. Industrial settings tolerate bus topology because the devices are few, the cable runs are short, and the environment is controlled. Never design a new office or data center network with bus topology.
      </Err>

      <Divider />

      {/* ── CHAPTER 5: Star Topology — The Dominant Design ─────────────── */}
      <Chapter
        n="05"
        title="Star Topology — Why Every Network Today Looks Like This"
        subtitle="The switch changed everything. Here is why star topology won and how it actually works at scale."
      />

      <StoryBox>
        In 1990, 3Com released the first Ethernet hub — a small box with 8 ports that every device plugged into instead of a shared coaxial cable. Instead of vampire-tapping a single cable running down the hall, you ran a separate cable from each device back to a central hub. Suddenly, adding a new device meant plugging in one cable. Removing a device meant unplugging one cable. A broken cable affected exactly one device. The star topology era had arrived.
      </StoryBox>

      <Para>
        Today, virtually every network — from your home WiFi (all devices connect to one router) to Google's data centers (all servers connect to a Top-of-Rack switch) — is a star at its core. The key innovation was replacing the hub with a <Accent>switch</Accent>.
      </Para>

      <H2>Hub vs Switch — A Critical Distinction</H2>

      <Para>
        Both create a star topology, but they behave completely differently:
      </Para>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, margin: '20px 0 28px' }}>
        <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#f87171', marginBottom: 12 }}>🔴 Hub (Layer 1)</div>
          <ul style={{ fontSize: 13, color: 'var(--text)', paddingLeft: 16, lineHeight: 2, margin: 0 }}>
            <li>Repeats every incoming signal to ALL ports</li>
            <li>All devices still share one collision domain</li>
            <li>Half-duplex only (can't send and receive at once)</li>
            <li>10 Mbps shared among all ports</li>
            <li>Everyone sees everyone else's traffic</li>
            <li>Dead for new installations (ca. 2000)</li>
          </ul>
        </div>
        <div style={{ background: `${G}06`, border: `1px solid ${G}25`, borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: G, marginBottom: 12 }}>🟢 Switch (Layer 2)</div>
          <ul style={{ fontSize: 13, color: 'var(--text)', paddingLeft: 16, lineHeight: 2, margin: 0 }}>
            <li>Learns MAC addresses, forwards only to correct port</li>
            <li>Each port is its own collision domain</li>
            <li>Full-duplex (send and receive simultaneously)</li>
            <li>Each port gets dedicated bandwidth (1–100 Gbps)</li>
            <li>Traffic is private between source and destination</li>
            <li>Standard for all modern networks</li>
          </ul>
        </div>
      </div>

      <Para>
        When data arrives at a switch port, the switch reads the destination MAC address from the Ethernet frame header and looks it up in its <Accent>MAC address table</Accent> (also called the CAM table — Content Addressable Memory). If it knows which port that MAC is on, it forwards the frame only to that port. If it does not know yet (no entry in the table), it floods the frame to all ports except the one it came from — and then learns from the response.
      </Para>

      <CodeBlock title="Switch MAC learning and forwarding">
        {`Switch CAM table (builds up over time):
MAC Address       Port   VLAN   Age
A4:C3:F0:11:22:33   1     10    50s   ← Device A on port 1
B8:E8:56:44:55:66   2     10    30s   ← Device B on port 2
DC:A6:32:77:88:99   3     20    10s   ← Device C on port 3

When a frame arrives (src: A4:C3:F0:11:22:33 → dst: B8:E8:56:44:55:66):
1. Learn: A4:C3:F0:11:22:33 is on port 1 (already known)
2. Look up: B8:E8:56:44:55:66 → port 2
3. Forward: send frame ONLY to port 2

When dst MAC is unknown:
1. Look up: not in table → FLOOD to all ports (except source port)
2. When B replies, learn B's MAC → add to table
3. Future frames to B go only to port 2`}
      </CodeBlock>

      <H2>Spanning Tree Protocol — Preventing Loops</H2>

      <Para>
        A star topology with redundant switches creates a problem: loops. If Switch A is connected to Switch B, which is connected to Switch C, which is connected back to Switch A, a broadcast frame would loop forever — a <Accent>broadcast storm</Accent> that consumes 100% of bandwidth and crashes the network within seconds.
      </Para>

      <Para>
        <Accent>STP (Spanning Tree Protocol — IEEE 802.1D)</Accent> prevents this by logically blocking redundant paths. STP elects a root bridge, calculates the shortest path from every switch to the root, and puts redundant paths in blocking state. If the active path fails, STP unblocks an alternative path — but this takes 30–50 seconds with classic STP. Modern networks use <Accent>RSTP (Rapid Spanning Tree — 802.1w)</Accent> which converges in 1–2 seconds, or port channel/LAG aggregation which bonds multiple links without needing STP at all.
      </Para>

      <WowBox emoji="💡" title="Why your network switch restarts slowly after a power cut">
        When a switch boots, it runs STP discovery. For 30 seconds (classic STP) or 4 seconds (RSTP), ports are in a listening/learning state — they are not yet forwarding traffic. This is the STP convergence delay. If you plug in a laptop and the network seems dead for 4-30 seconds before coming up, you are watching STP run. This is also why PortFast is configured on access ports — it bypasses STP delay for ports that connect to end devices (not other switches), bringing them up instantly.
      </WowBox>

      <Divider />

      {/* ── CHAPTER 6: Ring Topology ────────────────────────────────────── */}
      <Chapter
        n="06"
        title="Ring Topology — Deterministic and Resilient When Done Right"
        subtitle="Token Ring is dead, but ring topology lives on in backbone networks carrying national telephone traffic."
      />

      <Para>
        Ring topology was IBM's answer to Ethernet's collision problem in 1984 — <Accent>Token Ring (IEEE 802.5)</Accent>. Instead of random collision detection, a special packet called a token circulated around the ring. Only the device holding the token was allowed to transmit. Deterministic access: no collisions, equal fairness, predictable performance. But Token Ring was slow to expand (adding a device required breaking the ring), expensive (IBM's MAU — Multistation Access Unit — cost a fortune), and fundamentally lost the market to switched Ethernet by 1998.
      </Para>

      <Para>
        Token Ring died. Ring topology did not. The world's telephone networks and long-haul internet backbone still use ring topology in the form of <Accent>SONET/SDH</Accent> (Synchronous Optical Networking / Synchronous Digital Hierarchy) — the standard physical layer for carrier networks since the 1990s.
      </Para>

      <H2>Dual-Ring Self-Healing — How SONET Achieves 99.999% Uptime</H2>

      <Para>
        The weakness of a simple ring — one break = total failure — is solved by running <Accent>two rings in opposite directions</Accent> simultaneously. This is the SONET/SDH <Accent>BLSR (Bidirectional Line-Switched Ring)</Accent> architecture.
      </Para>

      <CodeBlock title="SONET dual-ring self-healing (in under 50ms)">
        {`Normal operation: traffic flows clockwise on working ring
        Node A ──→──→──→──→ Node B
       ↑                           ↓
       Node D ←──←──←──←── Node C
       (protection ring flows counter-clockwise, idle)

Cable cut between B and C:
        Node A ──→──→──→──→ Node B
       ↑                           ↓ ← traffic "wraps" here
       Node D ←──←──←──←── Node C
       ↑ ← traffic wraps here      ↓
       ← now flowing counter-clockwise on protection ring →

Result: all traffic continues in under 50 milliseconds.
This is why fiber cuts rarely cause noticeable telephone outages.`}
      </CodeBlock>

      <Para>
        The 50ms protection switching time of SONET/SDH is a standard specification — the ITU requires it for carrier-grade networks. This is tight enough that voice calls don't experience audible disruption. For comparison, a human typically does not notice audio interruptions under 200ms. Modern networks use <Accent>OTN (Optical Transport Network)</Accent> which extends SONET concepts with more capacity and better overhead management.
      </Para>

      <Divider />

      {/* ── CHAPTER 7: Mesh Topology ────────────────────────────────────── */}
      <Chapter
        n="07"
        title="Mesh Topology — Why the Internet Never Goes Down"
        subtitle="The internet is a global partial mesh of 80,000 autonomous systems. Here is how routing works in a mesh."
      />

      <StoryBox>
        On October 4, 2021, Facebook's entire global network went offline for 6 hours. Their DNS servers became unreachable, their BGP routes were withdrawn, and 3.5 billion users couldn't access Facebook, Instagram, or WhatsApp. But the rest of the internet worked perfectly. You could still access Google, YouTube, and Netflix without interruption. This is mesh topology's greatest property: Facebook's portion of the internet mesh failed, but the mesh routed around it. The failure was contained.
      </StoryBox>

      <Para>
        The internet is the world's largest mesh network — specifically, a <Accent>partial mesh</Accent> of ~80,000 Autonomous Systems (ASes) connected by BGP peering relationships. No single AS connects to every other AS (that would be a full mesh requiring billions of physical links). Instead, each AS connects to a few well-chosen peers, and BGP propagates reachability information so every AS can eventually reach every other.
      </Para>

      <H2>Full Mesh vs Partial Mesh</H2>

      <CodeBlock title="Mesh link count math">
        {`Full mesh links = n × (n - 1) / 2

 4 nodes  →   6 links   (feasible)
10 nodes  →  45 links   (expensive)
20 nodes  → 190 links   (very expensive)
50 nodes  → 1,225 links (impractical)

Partial mesh: each node connects to 2-4 strategic peers
→ Reduces links while maintaining redundancy
→ Used by: the internet, corporate WANs, data center spines`}
      </CodeBlock>

      <Para>
        In data centers, the dominant topology today is <Accent>spine-leaf</Accent> — a two-tier partial mesh. Every leaf switch (ToR — Top of Rack) connects to every spine switch. No leaf connects directly to another leaf. This creates equal-cost multi-path routing (ECMP) — traffic from any server to any other server takes exactly 2 hops through the fabric, and there are always multiple equal-cost paths to load-balance across.
      </Para>

      <CodeBlock title="Spine-leaf topology (modern data center)">
        {`       Spine 1      Spine 2      Spine 3      Spine 4
         │ │ │ │      │ │ │ │      │ │ │ │      │ │ │ │
         └─┼─┼─┼──────┼─┼─┼─┘      └─┼─┼─┼──────┼─┼─┘
           │ │ │      │ │ │            │ │ │      │ │
        Leaf 1       Leaf 2         Leaf 3       Leaf 4
        │ │ │ │      │ │ │ │       │ │ │ │      │ │ │ │
       Servers      Servers        Servers      Servers

Every leaf connects to every spine (partial mesh between tiers)
Traffic from Server A to Server B: A → Leaf 1 → any Spine → Leaf 3 → B
Always 2 hops regardless of which server pair. Always ECMP load balanced.
Used by: Google, Facebook, AWS, Azure, Netflix, every hyperscale data center.`}
      </CodeBlock>

      <WowBox emoji="📐" title="Why Clos networks are mathematically elegant">
        The spine-leaf topology is a modern implementation of the <strong>Clos network</strong>, invented by Charles Clos at Bell Labs in 1953 for telephone switching. Clos proved mathematically that a 3-stage non-blocking switching fabric can be built using smaller switches — no single switch needs to handle all traffic. Google's data center networks, Facebook's fabric, and AWS's VPC networking all implement variations of Clos. A 50-year-old mathematical theorem is running the internet.
      </WowBox>

      <Divider />

      {/* ── CHAPTER 8: Tree / Hierarchical Topology ─────────────────────── */}
      <Chapter
        n="08"
        title="Tree Topology — The Enterprise Network Standard"
        subtitle="How Fortune 500 companies wire tens of thousands of devices across dozens of floors and buildings."
      />

      <Para>
        When a company needs to connect 5,000 employees across a 20-floor office building, star topology at one level is not enough. You need a <Accent>hierarchy</Accent> — a tree of star networks, where each level aggregates the bandwidth from the level below.
      </Para>

      <H2>The Three-Tier Enterprise Model</H2>

      <div style={{ margin: '24px 0' }}>
        {[
          { tier: 'Core Layer', role: 'The backbone. Connects all distribution switches and provides access to the internet/WAN. High-speed, low-latency switches (40-400 Gbps per port). Redundant core switches in pairs.', devices: '2–4 high-end switches (Cisco Catalyst 9500, Juniper EX9200)', color: '#f472b6' },
          { tier: 'Distribution Layer', role: 'Aggregates access layer traffic, applies routing between VLANs, enforces QoS policies, provides inter-VLAN routing. One distribution switch per zone (building, campus wing, department).', devices: '4–20 switches (Cisco Catalyst 9300)', color: '#60a5fa' },
          { tier: 'Access Layer', role: 'Directly connects end devices (laptops, phones, printers, IP cameras). One switch per room or cluster of rooms. VLAN assignment happens here. PoE for powering IP phones and cameras.', devices: '20–200 switches (Cisco Catalyst 9200)', color: G },
        ].map(row => (
          <div key={row.tier} style={{ display: 'flex', gap: 16, marginBottom: 12, padding: '16px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${row.color}`, borderRadius: '0 12px 12px 0' }}>
            <div style={{ minWidth: 120 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: row.color }}>{row.tier}</div>
            </div>
            <div>
              <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 6 }}>{row.role}</div>
              <code style={{ fontSize: 12, color: 'var(--muted)', fontFamily: FONT_MONO }}>{row.devices}</code>
            </div>
          </div>
        ))}
      </div>

      <Para>
        The critical insight of the three-tier model is <Accent>traffic locality</Accent>. Most office communication stays within a department — emails, file shares, printers. By organizing the tree so that each department is under the same distribution switch, most traffic never needs to go higher than the distribution layer. Only inter-department or internet traffic climbs to the core. This is why enterprise networks can handle 10,000 devices with only a handful of core switches.
      </Para>

      <H2>Collapsed Core — For Smaller Networks</H2>

      <Para>
        For networks under ~500 devices (small offices, branch offices), the distribution and core layers merge into a single <Accent>collapsed core</Accent> layer. Two high-performance switches handle everything that distribution and core would normally split. This reduces hardware cost while maintaining the essential isolation that access layer star topology provides.
      </Para>

      <CodeBlock title="Collapsed core design (small office)">
        {`        [Core/Distribution Switch A] ←→ [Core/Distribution Switch B]
         ╱   ╲     ╱   ╲                ╱   ╲     ╱   ╲
        ↓     ↓   ↓     ↓              ↓     ↓   ↓     ↓
      Floor1 Floor2 Floor3 Floor4    Floor5 Floor6 Floor7 Floor8
       (Access switches with end devices)

Both core switches active (HSRP/VRRP for gateway redundancy)
STP or port channels prevent loops between core switches
If one core switch fails, HSRP failover in ~3 seconds`}
      </CodeBlock>

      <Divider />

      {/* ── CHAPTER 9: Hybrid Topology — The Real World ─────────────────── */}
      <Chapter
        n="09"
        title="Hybrid Topology — What Real Networks Actually Look Like"
        subtitle="No production network of any size is a single pure topology. They are all hybrids."
      />

      <Para>
        Pure topologies exist in textbooks. Real networks combine multiple topologies at different scales, choosing the right shape for each requirement. Understanding this is what separates someone who can recite topology names from someone who can design real infrastructure.
      </Para>

      <H2>A Real Enterprise Network Architecture</H2>

      <CodeBlock title="Hybrid topology: real Fortune 500 network (simplified)">
        {`Personal devices:
  PAN (Bluetooth): employee phone ↔ headset, mouse, keyboard

Building LAN (Star + Tree):
  Access switches (Star) → Distribution switches (Tree) → Core switches

Between buildings on campus (Star + Partial Mesh):
  Each building's core switch connects to 2+ campus core switches
  (partial mesh for redundancy, star within each building)

Between cities (Ring + Partial Mesh WAN):
  SONET/SDH dual rings carry voice and critical traffic
  MPLS partial mesh carries data between city offices

To the internet (Partial Mesh):
  Dual ISP connections for redundancy
  BGP peering with multiple upstream providers

To cloud (Hybrid WAN + VPC):
  AWS Direct Connect: private fiber to AWS (bypasses internet)
  VPN tunnels: encrypted overlay on top of internet WAN
  Inside AWS VPC: virtual star/tree topology (subnets = segments)

Storage (SAN):
  Fibre Channel SAN fabric in data center (dual fabric for HA)
  All database servers connect to both SAN fabrics simultaneously`}
      </CodeBlock>

      <Para>
        Notice how each layer uses the appropriate topology: star for end-device connections (simple, manageable), tree for building-scale aggregation (hierarchical, scalable), partial mesh for building-to-building (redundant), ring for long-haul backbone (self-healing), and mesh peering for internet connectivity (maximum resilience).
      </Para>

      <Divider />

      {/* ── CHAPTER 10: Modern Trends ───────────────────────────────────── */}
      <Chapter
        n="10"
        title="Modern Topology Trends — How Networks Are Evolving"
        subtitle="Software-defined networking, the cloud, and intent-based networking are changing how topology decisions are made."
      />

      <H2>SD-WAN — Topology as Software</H2>

      <Para>
        <Accent>SD-WAN (Software-Defined Wide Area Network)</Accent> abstracts the physical WAN topology from the logical network. Instead of manually configuring MPLS circuits between offices, SD-WAN creates a virtual full mesh — any branch can talk directly to any other branch over whatever physical links are available (MPLS, broadband, 4G/5G, satellite). The SD-WAN controller decides in real-time which physical path each traffic flow should take based on latency, packet loss, and cost.
      </Para>

      <Para>
        A branch office in Vijayawada might send Zoom video directly to a branch in Pune via broadband (low cost, acceptable latency), while SAP traffic goes via MPLS (guaranteed QoS, predictable latency), and backup data goes via LTE (expensive per MB, but available when MPLS is down). The topology is virtual, dynamic, and policy-driven. Cisco Viptela, VMware VeloCloud, and Fortinet Secure SD-WAN are the major vendors.
      </Para>

      <H2>Leaf-Spine Goes Mainstream</H2>

      <Para>
        The three-tier enterprise model (core/distribution/access) was designed for north-south traffic — client to server, up and down the hierarchy. Modern workloads are increasingly <Accent>east-west</Accent> — server to server, microservice to microservice, container to container. The three-tier model is inefficient for east-west: traffic from any server to any other server has to climb to the core and back down.
      </Para>

      <Para>
        Leaf-spine (spine-leaf) topology solves this: every server is always exactly two hops from every other server, regardless of which leaf they are on. As workloads shift from client-server to microservices, leaf-spine is replacing three-tier even in enterprise data centers. If you are designing a new data center today, leaf-spine is the answer.
      </Para>

      <H2>Intent-Based Networking (IBN)</H2>

      <Para>
        Traditional networks are configured device by device, command by command. <Accent>Intent-Based Networking</Accent> lets you declare what you want ("all HR computers should not be able to talk to engineering servers") and software translates that into thousands of ACL rules, VLAN assignments, and routing policies automatically. Cisco DNA Center and Juniper Apstra implement this concept. The topology still matters — but you are increasingly describing intent rather than configuring individual devices.
      </Para>

      <Divider />

      {/* ── CHAPTER 11: Decision Framework ─────────────────────────────── */}
      <Chapter
        n="11"
        title="Choosing the Right Topology — A Decision Framework"
        subtitle="Real-world topology decisions are driven by cost, scale, availability requirements, and traffic patterns."
      />

      <TopologyDecisionGuide />

      <H2>The Five Questions to Ask Before Any Topology Decision</H2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '20px 0 28px' }}>
        {[
          { q: '1. What is the failure blast radius?', a: 'If this component fails, how many users are affected? Bus = everyone. Star port = one user. Core switch = many. Design so the blast radius matches the component\'s MTBF (Mean Time Between Failures). More reliable components can have larger blast radii.' },
          { q: '2. What is the traffic pattern?', a: 'North-south (client → server) = three-tier works well. East-west (server → server) = leaf-spine is better. Mixed = hybrid design. Getting this wrong means you over-provision expensive high-tier links while low-tier links sit idle.' },
          { q: '3. What is the growth rate?', a: 'A network that doubles every year needs topology that can add capacity incrementally. Leaf-spine is ideal — add leaf switches for more devices, add spine switches for more bandwidth. Bus topology can\'t scale at all. Full mesh becomes impractical past ~10 nodes.' },
          { q: '4. What are the latency requirements?', a: 'Every additional hop adds latency. Latency-sensitive applications (trading, real-time gaming, VoIP) should be wired with as few hops as possible. Leaf-spine\'s fixed 2-hop path is predictable. Three-tier can have 4-6 hops across segments.' },
          { q: '5. What is the budget?', a: 'Full mesh is the most resilient and most expensive. Bus is the cheapest and most fragile. Most organizations land somewhere in the middle — redundant star or partial mesh — spending money on redundancy proportional to the value of the data traversing it.' },
        ].map(item => (
          <div key={item.q} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 18px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: G, marginBottom: 6 }}>{item.q}</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>{item.a}</div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ── CHAPTER 12: Failure Analysis ───────────────────────────────── */}
      <Chapter
        n="12"
        title="Failure Analysis — What Breaks in Each Topology"
        subtitle="The best way to understand a topology is to imagine all the ways it can fail."
      />

      <Para>
        Every topology has a characteristic failure mode. Knowing these is essential for both design and troubleshooting.
      </Para>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--surface)' }}>
              {['Topology', 'Single Link Fail', 'Single Node Fail', 'Multiple Failures', 'Self-Healing?'].map((h, i) => (
                <th key={i} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700, color: G, letterSpacing: '.06em', border: '1px solid var(--border)', background: 'var(--surface)', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Bus', '💥 All down', '💥 All down', '💥 All down', '❌ No'],
              ['Star (hub)', '⚡ 1 device', '💥 All down', '⚡ Partial', '❌ No'],
              ['Star (switch)', '⚡ 1 device', '💥 Segment', '⚡ Partial', '⚠️ With redundant switch'],
              ['Ring (single)', '💥 All down', '💥 All down', '💥 All down', '❌ No'],
              ['Ring (dual-SONET)', '✅ No impact', '✅ Wraps in <50ms', '⚡ Depends', '✅ Yes (<50ms)'],
              ['Partial Mesh', '✅ Reroutes', '✅ Reroutes', '⚡ Depends', '✅ Yes (BGP ~minutes)'],
              ['Full Mesh', '✅ Reroutes', '✅ Reroutes', '✅ Very resilient', '✅ Yes'],
              ['Tree (3-tier)', '⚡ Segment', '💥 Zone', '⚡ Partial', '⚠️ With redundant core'],
              ['Leaf-Spine', '✅ ECMP reroutes', '⚡ Partial BW loss', '⚡ Depends', '✅ Yes (ECMP)'],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '10px 14px', color: j === 0 ? 'var(--text)' : 'var(--muted)', border: '1px solid var(--border)', fontWeight: j === 0 ? 700 : 400, fontSize: 13 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Para>
        The pattern is clear: resilience requires redundant paths, and redundant paths require mesh characteristics — either a partial mesh between critical nodes, or a redundant star where two switches both connect to all devices. The most cost-effective approach for most enterprise networks is <Accent>redundant star topology</Accent> — two switches in every critical position, connected to each other, with devices dual-homed where necessary.
      </Para>

      <Divider />

      {/* ── CHAPTER 13: Common Misconceptions ──────────────────────────── */}
      <Chapter
        n="13"
        title="Common Misconceptions That Will Get You in Trouble"
        subtitle="These are the assumptions that cause real outages, failed interviews, and poorly designed networks."
      />

      <Err title="A hub and a switch are the same thing">
        Hubs and switches both create a star topology, but they behave completely differently. A hub (Layer 1) repeats every incoming signal to all ports — every device sees every other device's traffic, all devices share one collision domain, and bandwidth is shared. A switch (Layer 2) learns MAC addresses and forwards frames only to the correct port — each port gets dedicated full-duplex bandwidth, no collisions, and traffic is private between source and destination. A hub with 10 devices sharing 100 Mbps gives each device about 5–10 Mbps effective throughput due to collisions. A switch gives each device the full 100 Mbps dedicated. Hubs have not been sold for new deployments since around 2000.
      </Err>

      <Err title="Star topology has no single point of failure">
        Star topology has one critical single point of failure: the central switch. If the switch dies, every device connected to it loses connectivity — even though no individual cable has failed. This is often misunderstood because star topology correctly isolates individual device failures (one bad cable = one device offline). To eliminate the SPOF at the switch level, you need redundant switches (two switches connected to each other, with all critical devices dual-homed to both) or a switch stack (multiple physical switches acting as one logical unit). High-availability environments always deploy redundant core switches, not single switches.
      </Err>

      <Err title="LAN is always faster than WAN">
        LAN technologies (Gigabit Ethernet, 10GbE WiFi 6) are typically faster than consumer WAN connections, but this is not universal. A direct 400 Gbps fiber WAN link between two data centers can vastly outperform a congested WiFi LAN sharing 300 Mbps among 50 devices. In cloud environments, your "LAN" might be a virtual network inside AWS with 10–25 Gbps between instances — while some enterprise WAN links (MPLS, leased fiber) deliver higher throughput than many office LANs. The defining characteristic of LAN vs WAN is geographic scope and ownership, not speed.
      </Err>

      <Err title="Ring topology is completely dead">
        Token Ring (IBM's LAN implementation) is dead — no enterprise uses Token Ring for local networks. But ring topology itself is very much alive in backbone networks. SONET/SDH rings carry national telephone traffic and internet backbone links in every country. The dual counter-rotating ring with automatic 50ms protection switching makes it ideal for carrier infrastructure where continuous operation is mandatory. When your ISP's backbone fails and fails back in under a minute, SONET ring protection is likely responsible. Confusing "Token Ring is dead" with "ring topology is dead" is a common exam error.
      </Err>

      <Err title="Mesh topology means every device connects to every other device">
        Full mesh (every node connects to every other node) is one specific type of mesh — and it is rarely used because the link count grows as n×(n-1)/2 (10 nodes = 45 links, 100 nodes = 4,950 links). Most real-world mesh networks are partial meshes — each node connects to a strategic subset of others, chosen for redundancy and traffic patterns. The internet itself is a partial mesh of 80,000 Autonomous Systems. Data center spine-leaf is a structured partial mesh (every leaf connects to every spine, but leaves don't connect to each other). When someone says "we use mesh topology," they almost always mean partial mesh.
      </Err>

      <Err title="Three-tier network design is always the right answer for enterprise">
        Three-tier (core/distribution/access) was the enterprise standard for north-south traffic in the client-server era. It becomes a bottleneck for east-west traffic (server-to-server, microservice-to-microservice) — all east-west traffic must climb to the core and back down. Modern virtualized data centers and containerized workloads generate primarily east-west traffic. For these environments, leaf-spine is the correct architecture: always exactly 2 hops, always ECMP load-balanced, scales linearly by adding switches. Three-tier for a new data center design in 2025 is an outdated choice; three-tier for a campus LAN serving end-user devices is still appropriate.
      </Err>

      <Divider />

      {/* ── CHAPTER 14: Interview Questions ────────────────────────────── */}
      <Chapter
        n="14"
        title="Interview Questions — Test Your Understanding"
        subtitle="From entry-level definitions to senior architecture discussions."
      />

      <IQ q="What is the difference between LAN, WAN, and MAN?" level="Beginner">
        A <strong>LAN (Local Area Network)</strong> covers a single location — one building or floor — at high speeds (1–100 Gbps) under single-organization control. A <strong>WAN (Wide Area Network)</strong> spans cities, countries, or continents, typically crossing multiple organization boundaries and operating at variable speeds over leased or public infrastructure. A <strong>MAN (Metropolitan Area Network)</strong> sits between them — city-scale, typically ISP-operated fiber, connecting multiple buildings or campuses within a metropolitan area. The practical difference for engineers: LAN traffic is cheap and fast (you own the infrastructure), WAN traffic is expensive and variable (you're paying per megabit), MAN is in between.
      </IQ>

      <IQ q="Why is star topology preferred over bus topology?" level="Beginner">
        Star topology isolates failures — if one device's cable fails, only that device is affected. In bus topology, any fault on the shared cable takes every device offline simultaneously. Star also eliminates collision domains when using switches (each port is dedicated, full-duplex bandwidth). Bus has one shared collision domain — performance degrades as devices increase due to CSMA/CD collisions. Star is easier to troubleshoot (isolate to one port), easier to expand (just plug in), and enables centralized monitoring. The only advantage bus ever had was cost (one cable), but with modern switch prices under $5/port, that advantage disappeared long ago.
      </IQ>

      <IQ q="What is Spanning Tree Protocol and why is it needed?" level="Intermediate">
        STP (IEEE 802.1D) prevents Layer 2 switching loops. When you connect two switches together via two links for redundancy, you create a loop — a broadcast frame would circulate forever, consuming all bandwidth (a broadcast storm). STP prevents this by electing a root bridge, calculating the shortest path tree from every switch to the root, and putting redundant links into blocking state (they carry no traffic). If an active link fails, STP unblocks a blocked link, restoring connectivity — but classic STP takes 30-50 seconds to converge. RSTP (802.1w) reduced this to 1-2 seconds. Modern networks increasingly replace STP with port-channel/LAG bundling (which bonds multiple links without needing STP) or with routed access (running Layer 3 all the way to access switches, eliminating Layer 2 loops entirely).
      </IQ>

      <IQ q="When would you choose mesh topology over tree topology?" level="Intermediate">
        Choose mesh when redundancy requirements exceed cost constraints. Specifically: (1) <strong>East-west traffic dominates</strong> — if most communication is server-to-server rather than client-to-server, the hierarchy of tree topology forces inefficient paths (up to core, back down). Leaf-spine mesh provides equal-cost 2-hop paths between any pair. (2) <strong>High availability is critical</strong> — a single core switch failure in tree topology can affect thousands of users. In partial mesh/leaf-spine, losing one spine reduces bandwidth but never isolates nodes. (3) <strong>Scale beyond 500-1000 devices</strong> — three-tier tree topology becomes unwieldy and over-subscribed at large scale. Leaf-spine scales linearly by adding switches. Choose tree when budget is constrained, traffic is north-south, or the network is under 500 devices.
      </IQ>

      <IQ q="Explain spine-leaf topology and why it replaced the three-tier model in data centers." level="Senior">
        The three-tier model (core/distribution/access) was designed for client-server workloads where most traffic flows vertically (north-south: client → server). Modern microservices, container orchestration (Kubernetes), and distributed storage (Ceph, HDFS) generate massive east-west traffic (server → server). In a three-tier design, east-west traffic between two servers on different access switches must traverse up to 6 hops and compete for bandwidth at every aggregation point. Spine-leaf guarantees exactly 2 hops (source leaf → any spine → destination leaf) for all east-west traffic, with ECMP load balancing across all spines simultaneously — no single bottleneck. Adding capacity is linear: add a leaf for more ports, add a spine for more bandwidth. The design is non-blocking when properly provisioned — spine count × uplinks-per-leaf = total fabric bandwidth. Additionally, spine-leaf uses Layer 3 routing (BGP or OSPF/ECMP) rather than Layer 2 switching, eliminating STP convergence delays and enabling faster failure recovery via routing protocol reconvergence (~1 second with BFD).
      </IQ>

      <IQ q="How does the internet's mesh topology relate to BGP's path vector algorithm, and what are the implications for routing policy?" level="PhD">
        The internet is a partial mesh of ~80,000 Autonomous Systems (ASes) connected by BGP peering relationships. BGP is a path vector protocol: each AS advertises not just reachability (I can reach 8.8.0.0/16) but the complete AS path (reach it via AS15169, AS1299, AS3356). This prevents routing loops (an AS that sees its own AS number in a path discards it). The partial mesh structure creates several policy-relevant properties: (1) <strong>Valley-free routing</strong>: ASes enforce economic policies via BGP communities and local preference — typically, customer routes are preferred over peer routes, which are preferred over provider routes. An AS will never carry traffic from one upstream provider to another (that would be transit they're not paid for). This constraint means not all mathematically shortest paths are actually taken. (2) <strong>BGP convergence under failure</strong>: when a link fails, BGP must propagate withdrawal messages through the mesh. Convergence time depends on mesh density and timer configuration — typically 30 seconds to several minutes for global propagation, far slower than SONET's 50ms but adequate for the internet's design goals. (3) <strong>Policy expressiveness vs. optimality</strong>: because BGP is policy-driven, the internet may route around a mathematically shorter path to satisfy business relationships. This is intentional and foundational to the internet's economic structure. (4) <strong>Partition resilience</strong>: the AS mesh is designed with enough redundancy that no single AS failure disconnects the global internet — but individual prefixes can become unreachable if their originating AS or their upstreams all simultaneously fail, as seen in Facebook's 2021 outage where their BGP routes were withdrawn and they became unreachable from the global mesh.
      </IQ>

      <Divider />

      {/* ── KEY TAKEAWAYS ───────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'Network type (LAN/WAN/MAN/PAN/SAN) describes geographic scope and ownership. LAN = one location, high speed, you own it. WAN = multi-city or global, you pay someone else for it.',
        'Physical topology (Bus/Star/Ring/Mesh/Tree) describes wiring shape and determines resilience, cost, and scale. These are independent axes — a WAN can use ring topology internally.',
        'Bus topology is dead for LANs — one cable break kills everyone. It survives only in embedded/industrial contexts (CAN bus in cars).',
        'Star topology (with switches) dominates because each device has dedicated bandwidth, failures are isolated, and it is easy to manage. Switches forward only to the correct port using MAC address tables.',
        'STP prevents broadcast storms in redundant star topologies by blocking redundant links. RSTP converges in ~1 second. Modern designs avoid STP via routing or port-channel aggregation.',
        'Mesh topology (full or partial) provides the highest resilience — multiple paths mean routing around failures. The internet is a global partial mesh. Data center spine-leaf is a structured partial mesh.',
        'Three-tier (core/distribution/access) is the enterprise LAN standard for north-south traffic. Leaf-spine is the data center standard for east-west traffic — always exactly 2 hops, always ECMP load balanced.',
        'Real networks are always hybrid — star within buildings, tree across floors, partial mesh between buildings, ring or mesh for backbone, VPC/SD-WAN for cloud connectivity.',
      ]} />

    </LearnLayout>
  )
}
