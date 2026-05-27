'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

// ─── Design tokens ────────────────────────────────────────────────────────────
const G = '#10b981'
const FONT_MONO = 'var(--font-mono)'
const FONT_DISPLAY = 'var(--font-display)'

// ─── Helper components ────────────────────────────────────────────────────────

function Chapter({ n, title, subtitle }: { n: string; title: string; subtitle?: string }) {
  return (
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
}

function Divider() {
  return <div style={{ borderTop: '1px solid var(--border)', margin: '56px 0' }} />
}

function Para({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
}

function H2({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', margin: '36px 0 14px', letterSpacing: '-0.5px' }}>{children}</h3>
}

function H3({ children }: { children: React.ReactNode }) {
  return <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '28px 0 10px' }}>{children}</h4>
}

function Accent({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: G, fontWeight: 700 }}>{children}</strong>
}

function StoryBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: `4px solid #3b82f6`, background: 'rgba(59,130,246,0.07)', borderRadius: '0 10px 10px 0', padding: '18px 22px', margin: '28px 0' }}>
      <p style={{ fontSize: 11, color: '#60a5fa', fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>// REAL-WORLD SCENARIO</p>
      <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

function WowBox({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'rgba(16,185,129,0.08)', border: `1px solid rgba(16,185,129,0.25)`, borderRadius: 12, padding: '18px 22px', margin: '28px 0' }}>
      <p style={{ fontSize: 13, color: G, fontWeight: 800, margin: '0 0 8px' }}>{emoji} {title}</p>
      <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

function Warn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: 12, padding: '18px 22px', margin: '28px 0' }}>
      <p style={{ fontSize: 13, color: '#fbbf24', fontWeight: 800, margin: '0 0 8px' }}>⚠ {title}</p>
      <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

function Err({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: '18px 22px', margin: '28px 0' }}>
      <p style={{ fontSize: 13, color: '#f87171', fontWeight: 800, margin: '0 0 8px' }}>✗ Common Mistake — {title}</p>
      <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

function IQ({ q, level, children }: { q: string; level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    Beginner: '#34d399', Intermediate: '#60a5fa', Senior: '#a78bfa', PhD: '#f472b6',
  }
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

function CodeBlock({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#0d1117', borderRadius: 10, overflow: 'hidden', margin: '20px 0', border: '1px solid #30363d' }}>
      {title && (
        <div style={{ background: '#161b22', padding: '8px 16px', borderBottom: '1px solid #30363d', fontSize: 12, color: '#8b949e', fontFamily: FONT_MONO }}>
          {title}
        </div>
      )}
      <pre style={{ margin: 0, padding: '16px 20px', fontSize: 13, lineHeight: 1.7, color: '#e6edf3', fontFamily: FONT_MONO, overflowX: 'auto', whiteSpace: 'pre' }}>
        {children}
      </pre>
    </div>
  )
}

// ─── Interactive 1: Switch CAM Table Simulator ────────────────────────────────

type Port = 1 | 2 | 3 | 4
type MacEntry = { mac: string; port: Port; age: number }

const INITIAL_DEVICES: { name: string; mac: string; port: Port; color: string }[] = [
  { name: 'PC-A',   mac: 'AA:AA:AA:AA:AA:01', port: 1, color: '#10b981' },
  { name: 'PC-B',   mac: 'BB:BB:BB:BB:BB:02', port: 2, color: '#3b82f6' },
  { name: 'PC-C',   mac: 'CC:CC:CC:CC:CC:03', port: 3, color: '#8b5cf6' },
  { name: 'Server', mac: 'DD:DD:DD:DD:DD:04', port: 4, color: '#f97316' },
]

function CamSimulator() {
  const [camTable, setCamTable] = useState<MacEntry[]>([])
  const [log, setLog] = useState<string[]>([])
  const [src, setSrc] = useState(0)
  const [dst, setDst] = useState(1)

  function sendFrame() {
    const sender   = INITIAL_DEVICES[src]
    const receiver = INITIAL_DEVICES[dst]
    const newLog: string[] = []
    const newCam = [...camTable]

    const existing = newCam.find(e => e.mac === sender.mac)
    if (!existing) {
      newCam.push({ mac: sender.mac, port: sender.port, age: 0 })
      newLog.push(`📖 LEARN: Src ${sender.mac} → Port ${sender.port} added to CAM table`)
    } else {
      newLog.push(`✓ KNOWN: Src ${sender.mac} already on Port ${sender.port}`)
    }

    const dstEntry = newCam.find(e => e.mac === receiver.mac)
    if (dstEntry) {
      newLog.push(`🎯 FORWARD: Dst ${receiver.mac} known → unicast to Port ${dstEntry.port} only`)
    } else {
      newLog.push(`📢 FLOOD: Dst ${receiver.mac} unknown → flood to ALL ports except Port ${sender.port}`)
    }

    setCamTable(newCam)
    setLog(prev => [...newLog, ...prev].slice(0, 20))
  }

  function reset() { setCamTable([]); setLog([]) }

  const devColors: Record<Port, string> = { 1: '#10b981', 2: '#3b82f6', 3: '#8b5cf6', 4: '#f97316' }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', margin: '28px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, margin: 0, padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>// SWITCH CAM TABLE SIMULATOR — send frames to watch learning and forwarding</p>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO }}>From (Source)</label>
          <select value={src} onChange={e => setSrc(Number(e.target.value))} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', padding: '6px 10px', fontSize: 12, fontFamily: FONT_MONO }}>
            {INITIAL_DEVICES.map((d, i) => <option key={d.mac} value={i}>{d.name} ({d.mac.slice(0, 8)}…) Port {d.port}</option>)}
          </select>
        </div>
        <div style={{ fontSize: 18, color: 'var(--muted)', marginTop: 18 }}>→</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO }}>To (Destination)</label>
          <select value={dst} onChange={e => setDst(Number(e.target.value))} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', padding: '6px 10px', fontSize: 12, fontFamily: FONT_MONO }}>
            {INITIAL_DEVICES.map((d, i) => <option key={d.mac} value={i}>{d.name} ({d.mac.slice(0, 8)}…) Port {d.port}</option>)}
          </select>
        </div>
        <button onClick={sendFrame} disabled={src === dst} style={{ padding: '8px 18px', borderRadius: 8, background: G, color: '#000', fontWeight: 800, fontSize: 13, border: 'none', cursor: src === dst ? 'not-allowed' : 'pointer', marginTop: 18, opacity: src === dst ? 0.5 : 1 }}>Send Frame</button>
        <button onClick={reset} style={{ padding: '8px 14px', borderRadius: 8, background: 'transparent', color: 'var(--muted)', fontWeight: 700, fontSize: 12, border: '1px solid var(--border)', cursor: 'pointer', marginTop: 18 }}>Reset</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        <div style={{ padding: '16px 18px', borderRight: '1px solid var(--border)' }}>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO, marginBottom: 10, fontWeight: 700 }}>CAM TABLE (MAC Address Table)</div>
          {camTable.length === 0 && (
            <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: FONT_MONO, textAlign: 'center', padding: '20px 0' }}>empty — send a frame to populate</div>
          )}
          {camTable.map(entry => (
            <div key={entry.mac} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, padding: '6px 10px', background: 'var(--bg)', borderRadius: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: devColors[entry.port], flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontFamily: FONT_MONO, color: 'var(--muted)', flex: 1 }}>{entry.mac}</span>
              <span style={{ fontSize: 11, fontFamily: FONT_MONO, color: devColors[entry.port], fontWeight: 700 }}>Port {entry.port}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '16px 18px' }}>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO, marginBottom: 10, fontWeight: 700 }}>SWITCH DECISION LOG</div>
          {log.length === 0 && (
            <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: FONT_MONO, textAlign: 'center', padding: '20px 0' }}>no events yet</div>
          )}
          {log.slice(0, 8).map((entry, i) => (
            <div key={i} style={{ fontSize: 11.5, color: i === 0 ? 'var(--text)' : 'var(--muted)', fontFamily: FONT_MONO, marginBottom: 6, lineHeight: 1.5 }}>{entry}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Interactive 2: Ethernet Frame Builder ────────────────────────────────────

function EthernetFrameBuilder() {
  const [srcMac, setSrcMac] = useState('AA:BB:CC:DD:EE:FF')
  const [dstMac, setDstMac] = useState('11:22:33:44:55:66')
  const [etherType, setEtherType] = useState('0x0800')
  const [payloadSize, setPayloadSize] = useState(100)

  const ETHERTYPES: Record<string, string> = {
    '0x0800': 'IPv4',
    '0x0806': 'ARP',
    '0x86DD': 'IPv6',
    '0x8100': '802.1Q VLAN Tag',
    '0x8847': 'MPLS unicast',
    '0x88CC': 'LLDP',
    '0x88F7': 'PTP (Precision Time)',
  }

  const clampedPayload = Math.max(46, Math.min(1500, payloadSize))
  const totalSize = 14 + clampedPayload + 4
  const withPreamble = totalSize + 8

  const isVlan = etherType === '0x8100'
  const segments = [
    { name: 'Preamble + SFD', size: 8,  color: '#64748b', desc: '7 bytes preamble (10101010 repeating for clock sync) + 1 byte SFD (10101011 marks start of frame). Not part of the frame proper — stripped before delivery.' },
    { name: 'Dst MAC', size: 6, color: '#ef4444', desc: `Destination MAC: ${dstMac}. Switch reads this first to make the forwarding decision. FF:FF:FF:FF:FF:FF = Layer 2 broadcast to all devices on the segment.` },
    { name: 'Src MAC', size: 6, color: '#f97316', desc: `Source MAC: ${srcMac}. Switch uses this to learn — "this MAC address is on the port this frame arrived on." Updated in CAM table with current timestamp.` },
    ...(isVlan ? [{ name: '802.1Q Tag', size: 4, color: '#ec4899', desc: '4-byte VLAN tag inserted after Src MAC: TPID 0x8100 (2B) + TCI (2B). TCI contains: 3-bit PCP (priority 0–7), 1-bit DEI (drop eligibility), 12-bit VLAN ID (1–4094).' }] : []),
    { name: 'EtherType', size: 2, color: '#8b5cf6', desc: `EtherType ${etherType} = ${ETHERTYPES[etherType] ?? 'unknown'}. Values ≥ 0x0600 (1536) identify the Layer 3 protocol. Values ≤ 1500 are the IEEE 802.3 length field (original format). Most modern frames use EtherType.` },
    { name: 'Payload', size: clampedPayload, color: '#3b82f6', desc: `${clampedPayload} bytes of upper-layer data (${ETHERTYPES[etherType] ?? 'data'}). Minimum 46 bytes — padded with zeros if shorter to ensure minimum 64-byte frame for CSMA/CD slot time. Maximum 1500 bytes (standard MTU). Jumbo frames extend to 9000 bytes.` },
    { name: 'FCS', size: 4, color: '#10b981', desc: 'Frame Check Sequence: CRC-32 computed over Dst+Src+EtherType+Payload. Receiver recomputes CRC and compares. Mismatch = frame silently dropped at L2. No error notification to upper layers — TCP retransmit handles recovery.' },
  ]

  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', margin: '28px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, margin: 0, padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>// ETHERNET FRAME BUILDER — hover any field for details</p>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO }}>Src MAC</label>
          <input value={srcMac} onChange={e => setSrcMac(e.target.value)} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', padding: '5px 10px', fontSize: 12, fontFamily: FONT_MONO, width: 160 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO }}>Dst MAC</label>
          <input value={dstMac} onChange={e => setDstMac(e.target.value)} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', padding: '5px 10px', fontSize: 12, fontFamily: FONT_MONO, width: 160 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO }}>EtherType</label>
          <select value={etherType} onChange={e => setEtherType(e.target.value)} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', padding: '5px 10px', fontSize: 12, fontFamily: FONT_MONO }}>
            {Object.entries(ETHERTYPES).map(([k, v]) => <option key={k} value={k}>{k} ({v})</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO }}>Payload: {clampedPayload}B</label>
          <input type="range" min={1} max={1500} value={payloadSize} onChange={e => setPayloadSize(Number(e.target.value))} style={{ width: 120, accentColor: G }} />
        </div>
      </div>
      <div style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', height: 36, borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
          {segments.map(seg => (
            <div key={seg.name} onMouseEnter={() => setHovered(seg.name)} onMouseLeave={() => setHovered(null)}
              style={{ flex: seg.name === 'Payload' ? clampedPayload : seg.size, background: hovered === seg.name ? `${seg.color}50` : `${seg.color}25`, borderRight: '1px solid var(--bg)', cursor: 'pointer', transition: 'background .15s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {seg.size > 3 && (
                <span style={{ fontSize: 9, color: seg.color, fontFamily: FONT_MONO, fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0 4px' }}>
                  {seg.name === 'Payload' ? `PAYLOAD (${clampedPayload}B)` : seg.name}
                </span>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
          {[
            { label: 'Frame size',    value: `${totalSize}B` },
            { label: 'With preamble', value: `${withPreamble}B` },
            { label: 'Status',        value: clampedPayload < 46 ? 'Padded to 64B min' : payloadSize > 1500 ? 'EXCEEDS MTU!' : 'Valid frame' },
          ].map(r => (
            <div key={r.label} style={{ fontSize: 12, fontFamily: FONT_MONO, color: 'var(--muted)' }}>
              <span>{r.label}: </span><span style={{ color: 'var(--text)', fontWeight: 700 }}>{r.value}</span>
            </div>
          ))}
        </div>
        {hovered ? (
          <div style={{ background: 'var(--bg)', borderRadius: 10, padding: '14px 16px', borderLeft: `3px solid ${segments.find(s => s.name === hovered)?.color}` }}>
            <div style={{ fontSize: 12, color: segments.find(s => s.name === hovered)?.color, fontWeight: 800, fontFamily: FONT_MONO, marginBottom: 6 }}>{hovered}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{segments.find(s => s.name === hovered)?.desc}</div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--muted)', fontFamily: FONT_MONO }}>hover over a field to see its purpose</div>
        )}
      </div>
    </div>
  )
}

// ─── Interactive 3: Hub vs Switch Comparison ──────────────────────────────────

function HubVsSwitch() {
  const [device, setDevice] = useState<'hub' | 'switch'>('hub')
  const [scenario, setScenario] = useState(0)

  const SCENARIOS = [
    {
      label: 'Normal unicast',
      hubBehavior: 'Hub broadcasts to ALL ports. PC-A, PC-B, PC-C all receive the frame even though only the intended recipient needs it. Every NIC must process and discard it — wasting CPU on every host.',
      switchBehavior: 'Switch sends ONLY to the destination port after looking up the CAM table. PC-A gets nothing unless it is the destination. Other hosts are unaware the frame was sent.',
      hubCollision: true,
      efficiency: { hub: 25, sw: 100 },
    },
    {
      label: 'Two hosts transmitting',
      hubBehavior: 'COLLISION. Both signals mix on the shared medium. Both hosts detect the collision (32-bit jam signal), back off using binary exponential backoff (random 0–2^n slot times), and retransmit. At 10 devices: collision rate can reach 60%+.',
      switchBehavior: 'Each port is a separate collision domain. Both hosts transmit simultaneously without collision. Switch buffers both frames in its output queue and forwards each to its destination independently.',
      hubCollision: true,
      efficiency: { hub: 12, sw: 95 },
    },
    {
      label: 'Broadcast traffic',
      hubBehavior: 'Broadcast floods to all ports — exactly the same behavior as unicast flooding. Every device receives and processes the broadcast. This is expected for ARP, DHCP, and similar protocols.',
      switchBehavior: 'Broadcast frames are also flooded to all ports in the same VLAN. The switch cannot filter broadcasts — that requires VLANs. The key difference: only broadcasts flood, never known unicast.',
      hubCollision: false,
      efficiency: { hub: 25, sw: 25 },
    },
    {
      label: '100 devices on network',
      hubBehavior: 'ONE shared collision domain for all 100 devices. Effective throughput per device on a 100 Mbps hub with 100 active devices: ~1 Mbps or less. CSMA/CD exponential backoff means some devices may wait 512+ slot times (26+ ms) before getting access.',
      switchBehavior: '100 SEPARATE collision domains (one per port). Each port gets dedicated full-duplex bandwidth. 100 × 1 Gbps = 100 Gbps aggregate. Adding more devices does not degrade per-device bandwidth (until the uplink is saturated).',
      hubCollision: true,
      efficiency: { hub: 1, sw: 98 },
    },
  ]

  const sc  = SCENARIOS[scenario]
  const info = device === 'hub' ? sc.hubBehavior : sc.switchBehavior

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', margin: '28px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, margin: 0, padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>// HUB vs SWITCH — behavior comparison by scenario</p>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['hub', 'switch'] as const).map(d => (
            <button key={d} onClick={() => setDevice(d)}
              style={{ padding: '6px 16px', borderRadius: 16, border: `1px solid ${device === d ? (d === 'hub' ? '#ef4444' : G) : 'var(--border)'}`, background: device === d ? (d === 'hub' ? '#ef444418' : `${G}18`) : 'transparent', color: device === d ? (d === 'hub' ? '#ef4444' : G) : 'var(--muted)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
              {d.toUpperCase()}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {SCENARIOS.map((s, i) => (
            <button key={s.label} onClick={() => setScenario(i)}
              style={{ padding: '4px 10px', borderRadius: 12, border: `1px solid ${i === scenario ? 'var(--muted)' : 'var(--border)'}`, background: i === scenario ? 'rgba(255,255,255,0.08)' : 'transparent', color: i === scenario ? 'var(--text)' : 'var(--muted)', fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: FONT_MONO }}>
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: '20px 22px' }}>
        <div style={{ marginBottom: 20 }}>
          {[
            { label: 'Hub',    pct: sc.efficiency.hub, color: '#ef4444' },
            { label: 'Switch', pct: sc.efficiency.sw,  color: G },
          ].map(bar => (
            <div key={bar.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: bar.color, fontFamily: FONT_MONO, minWidth: 50, fontWeight: 700 }}>{bar.label}</span>
              <div style={{ flex: 1, height: 8, background: 'var(--bg)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${bar.pct}%`, height: '100%', background: bar.color, borderRadius: 4, transition: 'width .4s ease' }} />
              </div>
              <span style={{ fontSize: 11, color: bar.color, fontFamily: FONT_MONO, minWidth: 35 }}>{bar.pct}%</span>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--bg)', border: `1px solid ${device === 'hub' ? '#ef444440' : `${G}40`}`, borderRadius: 10, padding: '16px 18px', marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: device === 'hub' ? '#ef4444' : G, fontFamily: FONT_MONO, marginBottom: 8 }}>
            {device.toUpperCase()} — {sc.label.toUpperCase()}
          </div>
          <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8 }}>{info}</div>
        </div>
        {device === 'hub' && sc.hubCollision && (
          <div style={{ fontSize: 12, color: '#f59e0b', background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: 8, padding: '10px 14px', fontFamily: FONT_MONO }}>
            ⚠ CSMA/CD active: hosts detect collision → send 32-bit jam signal → wait random backoff (0 to 2ⁿ-1 slot times, n = attempt count) → retransmit. Slot time = 51.2 µs for 10 Mbps (512 bit times).
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function EthernetAndSwitching() {
  return (
    <LearnLayout
      title="Ethernet & Switching"
      description="From a shared coaxial wire in 1973 to dedicated 800 Gbps ports — how Ethernet became the universal LAN standard and how switches replaced hubs, eliminated collisions, and scale to millions of ports."
      section="Networking Fundamentals"
      readTime="55 min"
    >
      {/* ── Ch 01 ── */}
      <Chapter n="01" title="The Wire That Became the World" subtitle="Ethernet's 50-year journey from a shared coax to a global standard" />
      <Para>
        In 1973, Robert Metcalfe and David Boggs at Xerox PARC connected computers to a single thick coaxial cable and called the protocol <Accent>Ethernet</Accent> — named after the luminiferous ether that 19th century physicists believed carried light through space. The original speed was 2.94 Mbps. Today, 800 Gbps Ethernet links carry data inside the world's largest datacenters. The frame format defined in those first experiments is still recognizable in every packet on your network right now.
      </Para>
      <Para>
        Ethernet's longevity is the result of a remarkable design philosophy: a minimal, extensible standard that separates the physical layer from the logical framing. When the physics improved (coax → twisted pair → fiber → 400G optical), the frame format stayed the same. When speeds increased by a factor of 270,000, the switching logic stayed the same. This is what a well-designed protocol looks like.
      </Para>
      <StoryBox>
        The original 10BASE-5 "Thicknet" cable was 10 mm diameter yellow coaxial cable nicknamed "the frozen yellow garden hose." Computers attached via a "vampire tap" — a connector that literally pierced the cable with a pin. The entire segment was one shared collision domain. If two computers transmitted simultaneously, their signals collided, both were destroyed, both had to retransmit. If a tap pierced the cable at the wrong position, the impedance mismatch caused reflections that corrupted all traffic on the entire segment. Installations required exactly 2.5 meter spacing between taps to prevent standing waves. This is the origin of the 100-meter cable limit still referenced in TIA-568 today — it was the maximum before signal degradation destroyed frame integrity.
      </StoryBox>

      <H2>IEEE 802.3 — The Standard That Formalized Ethernet</H2>
      <Para>
        In 1980, Digital Equipment Corporation (DEC), Intel, and Xerox published the "DIX Ethernet" specification (named for their initials). In 1983, IEEE formalized it as <Accent>IEEE 802.3</Accent>. The key difference: IEEE 802.3 replaced the EtherType field with a length field, creating two subtly incompatible frame formats. Modern Ethernet uses values ≥ 0x0600 (1536) as EtherType and values ≤ 1500 as length — a backward-compatible coexistence.
      </Para>
      <Para>
        Today, IEEE 802.3 is one of the most active standards in IEEE. New amendments are published constantly: 802.3bz (2.5G/5GBASE-T), 802.3cd (50G/100G/200G), 802.3ck (100G/200G/400G), 802.3cu (100G/400G over SMF), 802.3db (100G/400G/800G). Each new generation preserves the same frame format while redefining only the physical layer encoding.
      </Para>

      <Divider />

      {/* ── Ch 02 ── */}
      <Chapter n="02" title="The Ethernet Frame — A 50-Year Standard" subtitle="Every field, every byte, every edge case" />
      <Para>
        The Ethernet frame is the Protocol Data Unit (PDU) at Layer 2. Every frame has the same structure — from a 64-byte ARP request to a 9000-byte jumbo frame containing a TLS record. Understanding every field is not academic: network engineers read frames in Wireshark, write code that parses them, and configure hardware that processes them at line rate.
      </Para>

      <EthernetFrameBuilder />

      <H2>Preamble and Start Frame Delimiter (SFD)</H2>
      <Para>
        Before the actual frame, 8 bytes are prepended by the NIC's hardware: 7 bytes of preamble (alternating 1s and 0s: 10101010 repeated) followed by 1 byte SFD (10101011 — the two consecutive 1s signal "frame starting now"). The preamble's purpose is <Accent>clock synchronization</Accent>: the receiver's clock recovery circuit locks to the alternating pattern, synchronizing its sampling with the transmitter. The SFD is stripped before the frame is passed up the stack — it never appears in Wireshark captures.
      </Para>

      <H2>Destination and Source MAC Addresses (6 bytes each)</H2>
      <Para>
        MAC (Media Access Control) addresses are 48-bit (6-byte) globally unique hardware identifiers assigned to every NIC at manufacture. Format: 6 hex bytes separated by colons or hyphens (AA:BB:CC:DD:EE:FF). The first 3 bytes are the <Accent>OUI (Organizationally Unique Identifier)</Accent> — assigned by IEEE to manufacturers. The last 3 bytes are assigned by the manufacturer to individual devices.
      </Para>
      <Para>
        First byte bit 0 (LSB): <Accent>multicast bit</Accent>. If 1, the address is a multicast/broadcast address. FF:FF:FF:FF:FF:FF is the L2 broadcast (all bits 1). 01:00:5E:xx:xx:xx is IPv4 multicast (first 25 bits fixed). 33:33:xx:xx:xx:xx is IPv6 multicast.
      </Para>
      <Para>
        First byte bit 1: <Accent>locally administered bit</Accent>. If 1, the address was assigned locally (not from IEEE registry). VMs often use locally administered MACs. x2, x6, xA, xE in the second hex digit = locally administered.
      </Para>

      <H2>EtherType / Length Field (2 bytes)</H2>
      <Para>
        Values ≥ 0x0600 (1536) identify the encapsulated Layer 3 protocol (EtherType). Values ≤ 1500 represent the frame payload length (IEEE 802.3 format). Common EtherType values:
      </Para>
      <CodeBlock title="Common EtherType values">
{`0x0800  IPv4
0x0806  ARP
0x86DD  IPv6
0x8100  802.1Q VLAN tag (frame is tagged)
0x88A8  802.1ad QinQ (outer VLAN tag)
0x8847  MPLS unicast
0x8848  MPLS multicast
0x88CC  LLDP (Link Layer Discovery Protocol)
0x88E5  MACsec (IEEE 802.1AE L2 encryption)
0x88F7  PTP (Precision Time Protocol, IEEE 1588)
0x9000  Ethernet OAM (loopback)`}
      </CodeBlock>

      <H2>802.1Q VLAN Tag (optional 4 bytes)</H2>
      <Para>
        When a frame is VLAN-tagged, a 4-byte 802.1Q tag is inserted after the Source MAC: 2 bytes TPID (0x8100) + 2 bytes TCI. The TCI contains: 3-bit PCP (Priority Code Point, values 0–7 for QoS), 1-bit DEI (Drop Eligible Indicator, formerly CFI), and 12-bit VLAN ID (0–4095, but 0 and 4095 reserved, so 1–4094 usable). This optionally increases the minimum frame size to 68 bytes and maximum to 1522 bytes for tagged frames.
      </Para>

      <H2>Payload (46–1500 bytes)</H2>
      <Para>
        The payload carries the upper-layer PDU (IPv4 packet, ARP message, IPv6 packet). <Accent>Minimum payload: 46 bytes</Accent>. If the actual data is shorter (e.g., a 28-byte ARP message), the NIC pads with zeros to reach 46 bytes. This ensures minimum frame size of 64 bytes — required for CSMA/CD collision detection (a transmitter must still be transmitting when a collision's jam signal arrives from the far end of a 500m 10BASE-5 segment).
      </Para>
      <Para>
        <Accent>Maximum payload: 1500 bytes</Accent> (standard MTU). This is the <Accent>MTU (Maximum Transmission Unit)</Accent> of Ethernet. IP packets larger than 1500 bytes must be fragmented at Layer 3. Jumbo frames extend the payload to 9000 bytes for datacenter use — requires configuration on all devices end-to-end (switch ports must support jumbo MTU, NIC drivers must be configured).
      </Para>

      <H2>FCS — Frame Check Sequence (4 bytes)</H2>
      <Para>
        The 4-byte CRC-32 computed over the frame content (Destination MAC through end of payload). The transmitter computes it and appends it. The receiver recomputes the CRC and compares. A mismatch means the frame was corrupted and it is silently dropped — no error is returned to the sender. This is a <Accent>silent discard</Accent>. Upper layers (TCP) detect the missing data via retransmission timeout and retransmit. UDP applications must handle loss themselves.
      </Para>

      <Divider />

      {/* ── Ch 03 ── */}
      <Chapter n="03" title="Hubs vs Switches — The Paradigm Shift" subtitle="Why the collision domain was the enemy" />
      <Para>
        Before switches became affordable (~1995), networks used hubs. A hub is a physical-layer repeater: it receives a signal on one port and repeats it out all other ports. Every device connected to a hub shares a single collision domain — they must take turns, just like the original coaxial Ethernet. Switches changed this completely.
      </Para>

      <HubVsSwitch />

      <H2>Why Hubs Were Abandoned</H2>
      <Para>
        The Ethernet CSMA/CD protocol was designed for shared media. It works reasonably well at low utilization (under 40% of link capacity). Above 40%, collision rates grow non-linearly — the probability of collision increases with each additional transmitter. At 70% utilization, collision backoffs dominate, and effective throughput can actually decrease with higher offered load. A 100-device hub network is essentially unusable for any significant traffic.
      </Para>
      <Para>
        Switches solve this by giving each device its own dedicated path. Each switch port is its own collision domain — collision detection only applies within that port. A modern full-duplex switch port has <Accent>zero collisions</Accent>: the switch uses separate transmit and receive paths (or virtual full-duplex with CSMA/CD disabled), and each port's buffer absorbs any timing conflicts.
      </Para>

      <Divider />

      {/* ── Ch 04 ── */}
      <Chapter n="04" title="The CAM Table — How Switches Learn and Forward" subtitle="The data structure that eliminates flooding" />
      <Para>
        A switch's forwarding intelligence lives in the <Accent>CAM table</Accent> (Content Addressable Memory table), also called the MAC address table. The CAM table maps each learned MAC address to the switch port it was last seen on, enabling unicast forwarding — sending frames only to the port where the destination device resides.
      </Para>

      <CamSimulator />

      <H2>The Three Switch Behaviors</H2>
      <Para>
        Every frame a switch processes triggers exactly one of three actions:
      </Para>
      <Para>
        <Accent>1. Learn:</Accent> When a frame arrives, the switch reads the source MAC and records (source MAC, ingress port, timestamp) in the CAM table. This happens on every frame regardless of what action is taken for forwarding. The switch is always learning.
      </Para>
      <Para>
        <Accent>2. Forward (unicast):</Accent> If the destination MAC is in the CAM table, send the frame only to the associated port. No other ports see the frame.
      </Para>
      <Para>
        <Accent>3. Flood:</Accent> If the destination MAC is NOT in the CAM table (unknown unicast), or if the destination is a broadcast (FF:FF:FF:FF:FF:FF), or if it is a multicast address without multicast snooping configured — the frame is flooded to all ports in the same VLAN except the ingress port. Flooding is the fallback, not the normal case.
      </Para>

      <H2>CAM Table Aging</H2>
      <Para>
        CAM table entries have a timer (default: 300 seconds on most switches). If no frame is received from a MAC address for 300 seconds, the entry is removed. This handles: devices that have been powered off, devices that have moved to a different port, and VMs that have migrated. When an entry ages out, the next frame to that MAC is flooded (unknown unicast) until the device transmits again and is re-learned.
      </Para>
      <Para>
        <Accent>CAM table overflow attack (MAC flooding):</Accent> An attacker sends frames with thousands of random source MACs, filling the CAM table. When full, new entries cannot be added — all traffic (including known unicasts) is flooded to all ports. The attacker's port now receives all traffic on the VLAN — effectively performing a passive wiretap. Defense: port security (maximum MAC addresses per port), 802.1X port authentication.
      </Para>

      <H2>CAM Table Size Limits</H2>
      <Para>
        CAM tables are implemented in TCAM (Ternary Content Addressable Memory) — extremely fast but very expensive silicon. Typical sizes: 8,000–16,000 entries on access layer switches, 64,000–256,000 on core/datacenter switches. Large campus networks can exhaust access switch CAM tables if too many devices are on the same VLAN — another reason to segment with VLANs.
      </Para>
      <CodeBlock title="Viewing CAM table on Cisco IOS">
{`show mac address-table
show mac address-table count
show mac address-table address AA:BB:CC:DD:EE:FF
show mac address-table interface GigabitEthernet1/0/1

Mac Address Table
──────────────────────────────────────────────
Vlan    Mac Address         Type     Ports
──────────────────────────────────────────────
   1    a4c3.f085.ac2b      DYNAMIC  Gi1/0/1
   1    ffff.ffff.ffff      STATIC   — (broadcast, hardcoded)
  10    0050.56ab.1234      DYNAMIC  Gi1/0/2

show mac address-table aging-time   # default: 300 seconds`}
      </CodeBlock>

      <Divider />

      {/* ── Ch 05 ── */}
      <Chapter n="05" title="CSMA/CD — The Collision Resolution Protocol" subtitle="The algorithm that made shared Ethernet work" />
      <Para>
        CSMA/CD (Carrier Sense Multiple Access with Collision Detection) is the Layer 2 access control protocol that governed all pre-switch Ethernet. Understanding it matters even today because: it explains why minimum frame size is 64 bytes, it is still relevant for half-duplex links (legacy equipment, some DOCSIS upstream channels), and understanding it is required for networking certifications and interviews.
      </Para>

      <H2>The CSMA/CD Algorithm</H2>
      <CodeBlock title="CSMA/CD algorithm — step by step">
{`1. CARRIER SENSE: Before transmitting, listen to the medium.
   - If medium is idle (no carrier detected): proceed to step 2
   - If medium is busy: wait until it becomes idle, then wait
     one IFG (Inter-Frame Gap = 9.6 µs for 10 Mbps, 0.96 µs for 100 Mbps)

2. TRANSMIT: Begin sending the frame bits onto the medium.

3. COLLISION DETECTION: While transmitting, continuously monitor.
   - If no collision detected: transmission complete → success
   - If collision detected (received signal ≠ transmitted signal):
     go to step 4

4. JAM SIGNAL: Transmit a 32-bit jam signal (alternating 1s and 0s).
   This ensures ALL devices on the segment detect the collision,
   not just those physically close to the collision point.

5. STOP: Cease transmission of the frame.

6. BACKOFF: Wait a random backoff period:
   delay = random(0, 2^n - 1) × slot_time
   where n = min(attempt_count, 10)
   slot_time = 51.2 µs (10 Mbps), 5.12 µs (100 Mbps)
   = 512 bit times (needed for collision detection at max segment length)

7. RETRY: Go back to step 1.
   After 16 failed attempts: abort, report error to upper layer.`}
      </CodeBlock>

      <H2>Why 64 Bytes? The Slot Time Relationship</H2>
      <Para>
        The minimum frame size of 64 bytes directly results from CSMA/CD physics. Consider: a device at one end of a maximum-length 10BASE-5 segment (500 m) starts transmitting. A device at the other end starts transmitting 0.1 µs before the first device's signal arrives (just missed the carrier sense). A collision occurs near the far end. The jam signal must propagate back to the first device — total worst-case round-trip propagation: ~51.2 µs for 10 Mbps. At 10 Mbps, 51.2 µs × 10 Mbps = 512 bits = 64 bytes. If the frame is shorter than 64 bytes, the first device might finish transmitting before the collision signal returns — it would never know the frame was destroyed.
      </Para>
      <Para>
        <Accent>Full-duplex Ethernet</Accent> disables CSMA/CD entirely because there is no shared medium — the switch port and NIC have dedicated TX and RX pairs. The minimum frame size of 64 bytes remains to maintain backward compatibility with legacy frame parsing code, not for collision detection.
      </Para>

      <H2>IFG — Inter-Frame Gap</H2>
      <Para>
        Between consecutive frames, the standard requires a mandatory idle period: <Accent>9.6 µs at 10 Mbps</Accent>, 0.96 µs at 100 Mbps, 0.096 µs at 1 Gbps. The IFG allows receiving NICs to process the previous frame (update CRC check, move data to buffer) before the next frame arrives. At Gigabit speeds and above, hardware pipelining handles frames arriving nearly back-to-back — the IFG is 96 nanoseconds (12 bytes at 1 Gbps).
      </Para>

      <Divider />

      {/* ── Ch 06 ── */}
      <Chapter n="06" title="Ethernet Evolution — 10 Mbps to 800 Gbps" subtitle="Five decades of speed improvements on the same frame format" />
      <Para>
        Each generation of Ethernet redefined the physical layer while preserving the same frame structure. The naming convention tells you everything: <Accent>speed + BASE + medium code</Accent>. "BASE" means baseband (the full bandwidth is used for one signal — not divided into frequency bands like cable TV). The medium code indicates the cable type or distance.
      </Para>

      <CodeBlock title="Ethernet generations — complete lineage">
{`Standard      Year  Speed    Medium               Max Dist  Notes
──────────────────────────────────────────────────────────────────────────────
10BASE-5      1980  10 Mbps  Thick coax (RG-8)    500 m     Vampire taps, obsolete
10BASE-2      1985  10 Mbps  Thin coax (RG-58)    185 m     BNC T-connectors, obsolete
10BASE-T      1990  10 Mbps  Cat3 UTP (2 pairs)   100 m     First twisted pair Ethernet
100BASE-TX    1995  100 Mbps Cat5 UTP (2 pairs)   100 m     MLT-3 encoding, 4B/5B
100BASE-FX    1995  100 Mbps Multi-mode fiber      2 km      Full-duplex, no CSMA/CD
1000BASE-T    1999  1 Gbps   Cat5e UTP (4 pairs)  100 m     4D-PAM5 all 4 pairs TX+RX
1000BASE-SX   1998  1 Gbps   MMF (OM2+)           550 m     850nm VCSEL
1000BASE-LX   1998  1 Gbps   SMF / MMF            5/10 km   1310nm
10GBASE-T     2006  10 Gbps  Cat6a UTP             100 m    DSQ128 encoding
10GBASE-SR    2002  10 Gbps  OM3+ MMF             300/400m  850nm VCSEL
10GBASE-LR    2002  10 Gbps  SMF                  10 km     1310nm DFB laser
25GBASE-SR    2016  25 Gbps  OM4+ MMF             100 m     SFP28
40GBASE-SR4   2010  40 Gbps  OM3+ MMF (MPO-12)    150 m     4×10G lanes
100GBASE-SR4  2014  100 Gbps OM4+ MMF (MPO-12)    100 m     4×25G lanes
100GBASE-LR4  2010  100 Gbps SMF (LC duplex)       10 km    4λ WDM
400GBASE-SR8  2018  400 Gbps OM4+ MMF (MPO-24)    100 m     8×50G PAM4 lanes
400GBASE-LR8  2018  400 Gbps SMF (LC duplex)        2 km    8λ WDM PAM4
800GBASE-SR8  2023  800 Gbps OM4+ (MPO-16)         50 m     8×100G PAM4
800GBASE-DR8  2023  800 Gbps SMF (MPO-16)          500 m    8×100G PAM4`}
      </CodeBlock>

      <H2>Auto-Negotiation (IEEE 802.3u)</H2>
      <Para>
        Introduced with Fast Ethernet (100BASE-TX), auto-negotiation lets two devices automatically agree on the highest common speed and duplex mode. During link setup, devices exchange Fast Link Pulses (FLPs) — a burst of 33 pulses encoded as a 16-bit data word advertising capabilities: 10HD, 10FD, 100HD, 100FD, 1000FD, pause frames, asymmetric pause. Both sides select the highest common capability.
      </Para>
      <Para>
        <Accent>1000BASE-T requires auto-negotiation</Accent> — there is no forced-gigabit mode. The 4D-PAM5 coding used by 1000BASE-T requires the master/slave relationship negotiated during auto-neg to synchronize the echo cancellation coefficients. Forcing to 1000/full without auto-neg simply doesn't work (the link won't come up).
      </Para>

      <H2>Jumbo Frames</H2>
      <Para>
        Standard Ethernet MTU is 1500 bytes. Jumbo frames extend this to 9000 bytes (sometimes 9216 bytes to accommodate VXLAN/MPLS encapsulation overhead). Benefits: fewer frames per data transfer → less CPU overhead per byte → higher throughput for large transfers (storage, backup, bulk data movement). The 9000-byte size reduces CPU interrupts by 6× compared to standard MTU for the same data. Jumbo frames must be configured consistently: NIC, switch port, router interface, and destination NIC must all support the same MTU, or fragmentation/drops occur.
      </Para>

      <Divider />

      {/* ── Ch 07 ── */}
      <Chapter n="07" title="Switch Architecture — How Hardware Makes It Fast" subtitle="Store-and-forward, cut-through, TCAM, and switching fabric" />
      <Para>
        A modern enterprise switch forwards millions of frames per second while simultaneously learning MACs, enforcing ACLs, applying QoS, and updating counters. This performance is possible only because of dedicated hardware — custom ASICs purpose-built for switching.
      </Para>

      <H2>Forwarding Modes</H2>
      <Para>
        <Accent>Store-and-forward:</Accent> The switch receives the entire frame, verifies the CRC, then forwards it. Latency = frame size / link rate (for a 1500-byte frame on 1 Gbps: 12 µs). Advantage: no error frames propagate (a corrupted frame is discarded before forwarding). This is the standard mode for all production switches and is required when input and output ports run at different speeds (rate matching requires buffering the entire frame anyway).
      </Para>
      <Para>
        <Accent>Cut-through:</Accent> The switch begins forwarding as soon as it reads the destination MAC (after the first 14 bytes). Latency: ~1 µs (just the header read time). Disadvantage: error frames propagate — a frame with a bad CRC is already halfway forwarded before the FCS is even received. Most modern high-end datacenter switches (Broadcom Tomahawk ASICs) support cut-through mode on same-speed port pairs as an optional performance optimization.
      </Para>
      <Para>
        <Accent>Fragment-free (modified cut-through):</Accent> Waits for the first 64 bytes before forwarding. This filters collision fragments (which are always &lt;64 bytes in CSMA/CD networks) while keeping latency lower than store-and-forward. Used in older switches and rarely today.
      </Para>

      <H2>TCAM — Ternary Content Addressable Memory</H2>
      <Para>
        The CAM table uses <Accent>TCAM</Accent> hardware. Unlike standard RAM (look up a value by address), TCAM lets you supply a value and find the address in a single clock cycle — a hardware parallel search of all entries simultaneously. Each TCAM cell stores ternary values: 0, 1, or X (don't care). This enables: exact MAC address lookup (used for CAM/forwarding table), prefix matching (for IP routing tables with masks), ACL evaluation (match packets with specific source IP ranges and port ranges).
      </Para>
      <Para>
        TCAM is extremely expensive — each bit of TCAM requires 4 transistors vs 1 for SRAM and 1 for DRAM. This is why switch CAM tables have hard limits (8K–256K entries) and why expanding routing table capacity requires buying a higher-end switch. TCAM can't be upgraded after purchase.
      </Para>

      <H2>Switching Fabric and Port ASICs</H2>
      <Para>
        A switch's switching fabric is the internal high-speed crossbar that connects all port ASICs. Each port ASIC handles reception, transmission, and per-port logic for a group of ports. The switching fabric must have enough bandwidth to allow all ports to transmit simultaneously without blocking — this is a <Accent>non-blocking</Accent> switch. A 48-port 1G switch requires a 96 Gbps switching fabric (48 ports × 2 directions × 1 Gbps). Budget switches may have a fabric that is oversubscribed — if all ports transmit simultaneously, some must wait. Datacenter switches are non-blocking; access closet switches may be 4:1 oversubscribed (acceptable because not all ports are simultaneously saturated).
      </Para>

      <Divider />

      {/* ── Ch 08 ── */}
      <Chapter n="08" title="Broadcast Domains and the Limits of Layer 2" subtitle="Why Layer 2 alone cannot scale" />
      <Para>
        A switch forwards broadcasts to every port in the same VLAN. This defines a <Accent>broadcast domain</Accent> — the set of all devices that receive each other's broadcast frames. Every ARP request, every DHCP discover, every spanning tree BPDU is flooded to every device in the broadcast domain.
      </Para>
      <Para>
        As broadcast domains grow, so does broadcast overhead. Consider a /16 subnet with 65,000 devices: every ARP request reaches every device. Every DHCP discover reaches every device. At a certain scale, broadcast traffic alone consumes significant bandwidth and CPU on every host. The rule of thumb: keep broadcast domains under 500 devices; 250 is safer for networks with chatty protocols. VLANs provide the segmentation — each VLAN is its own broadcast domain.
      </Para>

      <H2>Unknown Unicast Flooding</H2>
      <Para>
        Beyond broadcasts, <Accent>unknown unicast flooding</Accent> is a silent performance problem. Every frame destined for a MAC not in the CAM table is flooded to all ports. In a network with many devices or high turnover (cloud VMs spawning and dying), a significant percentage of traffic can be unknown unicast floods. Symptoms: unexpectedly high traffic on ports that shouldn't be seeing that traffic; CPU spikes on devices caused by processing discarded frames.
      </Para>

      <H2>Layer 3 as the Solution</H2>
      <Para>
        Routers (Layer 3 devices) do not forward Layer 2 broadcasts — they are broadcast domain boundaries. When a router receives a broadcast frame, it processes it locally and never forwards it to other interfaces. This is why large networks use VLANs (each VLAN is a broadcast domain) with a router or Layer 3 switch providing inter-VLAN routing. The design principle: use Layer 2 within a broadcast domain, use Layer 3 to connect broadcast domains.
      </Para>

      <Divider />

      {/* ── Ch 09 ── */}
      <Chapter n="09" title="Port Security and MAC Address Management" subtitle="Controlling which devices can connect" />
      <Para>
        Switches can restrict which MAC addresses are allowed on each port, preventing unauthorized devices from connecting or limiting the impact of MAC flooding attacks.
      </Para>

      <H2>Port Security</H2>
      <Para>
        Cisco's port security feature limits the number of MAC addresses learned on a port. When the limit is reached:
      </Para>
      <CodeBlock title="Port security configuration — Cisco IOS">
{`interface GigabitEthernet1/0/1
 switchport mode access
 switchport access vlan 10
 switchport port-security maximum 2        ! max 2 MAC addresses
 switchport port-security mac-address sticky  ! learn + save to config
 switchport port-security violation restrict   ! or: protect | shutdown

! Violation modes:
!   protect:  drop frames from unknown MACs, no log, no shutdown
!   restrict: drop frames + increment violation counter + syslog
!   shutdown: err-disable the port (manual recovery needed)

show port-security interface GigabitEthernet1/0/1
show port-security address`}
      </CodeBlock>
      <Para>
        <Accent>Sticky MAC:</Accent> The switch dynamically learns the first N MAC addresses and saves them to the running config as static secure MAC addresses. On reboot, these addresses are restored — no need to manually configure each MAC. Useful for locking a port to the device currently plugged in.
      </Para>

      <H2>802.1X Port-Based Network Access Control</H2>
      <Para>
        Port security with MAC addresses is easy to bypass (just spoof the allowed MAC). IEEE 802.1X is the proper solution: authenticate the user/device before granting network access. The switch port acts as an <Accent>Authenticator</Accent> — it blocks all traffic except EAP (Extensible Authentication Protocol) exchanges until the connecting device (Supplicant) authenticates with the RADIUS server (Authentication Server). Once authenticated, the switch places the port in the correct VLAN and grants access.
      </Para>

      <Divider />

      {/* ── Ch 10 ── */}
      <Chapter n="10" title="Link Aggregation — LACP and EtherChannel" subtitle="Bonding multiple physical links into one logical link" />
      <Para>
        A single Ethernet link provides limited bandwidth and no redundancy. <Accent>Link Aggregation (LAG)</Accent> bonds multiple physical links between two devices into a single logical interface, providing both bandwidth multiplication and link redundancy.
      </Para>

      <H2>LACP — IEEE 802.3ad / 802.1AX</H2>
      <Para>
        LACP (Link Aggregation Control Protocol) is the IEEE standard for dynamic LAG negotiation. Both ends exchange LACP PDUs (LACPDUs) advertising their system ID, port priorities, and state. Compatible ports that agree on parameters form an aggregation group automatically. LACP modes:
      </Para>
      <CodeBlock title="LACP configuration — Cisco IOS">
{`! Create port-channel (logical LAG interface)
interface port-channel 1
 switchport mode trunk

! Add physical members
interface range GigabitEthernet1/0/1 - 2
 channel-group 1 mode active    ! LACP active (initiates negotiation)

! Modes:
!   active:  LACP active — sends LACPDUs, negotiates
!   passive: LACP passive — only responds, doesn't initiate
!   on:      Static LAG (no LACP, both sides must be 'on')

show etherchannel summary
show lacp neighbor

Flags: S - Device is sending Slow LACPDUs
       F - Device is sending Fast LACPDUs (1s vs 30s)
       A - Device is in Active mode   P - Device is in Passive mode`}
      </CodeBlock>

      <H2>Load Balancing in LAG</H2>
      <Para>
        A LAG bundles N links but does not distribute a single flow across all links — a single TCP connection always travels on one physical link. LAG load balances at the <Accent>flow level</Accent>: different flows are hashed to different links. Common hash inputs: source+destination MAC (L2), source+destination IP (L3), source+destination IP+port (L4). This means a single large flow (one TCP connection) can only use one link — for a single iSCSI transfer, LAG provides no speed improvement. Multiple simultaneous flows do distribute.
      </Para>

      <H2>Compatibility Requirements</H2>
      <Para>
        All member links in a LAG must have identical: speed, duplex, VLAN configuration, and spanning tree port settings. A mismatch causes the link to be excluded from the bundle. Common mistake: adding a port with different native VLAN or trunk configuration — LACP rejects the port and it operates as a standalone link without error.
      </Para>

      <Divider />

      {/* ── Ch 11 ── */}
      <Chapter n="11" title="Flow Control and Storm Control" subtitle="Preventing packet loss and broadcast storms" />

      <H2>IEEE 802.3x Flow Control (PAUSE Frames)</H2>
      <Para>
        When a switch's input buffer is near full, it can signal the connected device to pause transmission temporarily. The switch sends an <Accent>Ethernet PAUSE frame</Accent> (EtherType 0x8808) containing a pause timer value (0–65535 × 512 bit-times). The receiving NIC stops transmitting for the specified duration. This prevents buffer overflow at the cost of temporary transmission suspension.
      </Para>
      <Para>
        PAUSE frames are problematic in multi-hop networks: a pause from one congested link can propagate back to all upstream senders, head-of-line blocking traffic that doesn't need to pause. <Accent>Priority Flow Control (PFC, IEEE 802.1Qbb)</Accent> — used in lossless Ethernet for RoCE (RDMA over Converged Ethernet) — operates per-priority class, pausing only the congested priority without affecting other classes.
      </Para>

      <H2>Storm Control</H2>
      <Para>
        A broadcast storm occurs when broadcast traffic regenerates itself in a loop — a switch receives a broadcast, floods it, another switch receives and floods, and so on. Without Spanning Tree Protocol, a single broadcast frame loops forever, doubling with each retransmission until the network is completely saturated. Storm control is a per-port rate limiter for broadcast, multicast, and unknown unicast traffic:
      </Para>
      <CodeBlock title="Storm control — Cisco IOS">
{`interface GigabitEthernet1/0/1
 storm-control broadcast level 10  ! drop broadcast > 10% of port bandwidth
 storm-control multicast level 5
 storm-control unknown-unicast level 5
 storm-control action shutdown     ! or: trap (SNMP alert only)

show storm-control GigabitEthernet1/0/1`}
      </CodeBlock>

      <Divider />

      {/* ── Ch 12 ── */}
      <Chapter n="12" title="LLDP and CDP — Switch Discovery Protocols" subtitle="How network devices map the physical topology" />
      <Para>
        Network devices announce themselves to directly connected neighbors using link-layer discovery protocols. This data powers network management systems, automated inventory, and troubleshooting tools.
      </Para>

      <H2>CDP — Cisco Discovery Protocol</H2>
      <Para>
        CDP is Cisco-proprietary, Layer 2, multicast (01:00:0C:CC:CC:CC). Sent every 60 seconds. Advertises: device ID (hostname), platform, capabilities (router/switch/phone), software version, native VLAN, duplex, IP address, and port ID. CDP is enabled by default on all Cisco interfaces. Significant security risk: an attacker on the same segment receives full device inventory. Disable on external-facing ports: <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>no cdp enable</code>.
      </Para>

      <H2>LLDP — IEEE 802.1AB</H2>
      <Para>
        LLDP (Link Layer Discovery Protocol) is the open standard equivalent of CDP. TLV (Type-Length-Value) based — extensible. Core TLVs: Chassis ID, Port ID, TTL (30–120 seconds). Optional TLVs: system name, description, capabilities, management address. LLDP-MED extends LLDP for IP phones: negotiates VLAN, DSCP, PoE power requirements, emergency location information. Supported by all major vendors (Cisco, Juniper, Arista, HP, etc.).
      </Para>
      <CodeBlock title="LLDP commands — Cisco IOS">
{`lldp run                           ! enable globally
interface GigabitEthernet1/0/1
 lldp transmit                     ! enable per-interface
 lldp receive

show lldp neighbors
show lldp neighbors detail

Device ID        Local Intf     Hold-time  Capability Port ID
switch-floor-2   Gi1/0/1        120        B, R        Gi0/1

Capability codes: B - Bridge, R - Router, T - Telephone, W - WLAN`}
      </CodeBlock>

      <Divider />

      {/* ── Ch 13 ── */}
      <Chapter n="13" title="Port Mirroring and SPAN" subtitle="Capturing traffic without tapping the wire" />
      <Para>
        <Accent>SPAN (Switched Port Analyzer)</Accent> — called "port mirroring" on most non-Cisco vendors — copies traffic from one or more ports (source) to a designated monitor port (destination). Used for: IDS/IPS sensors, packet capture analysis, network performance monitoring, passive wiretapping for forensics.
      </Para>
      <CodeBlock title="SPAN configuration — Cisco IOS">
{`! Local SPAN: source and destination on same switch
monitor session 1 source interface GigabitEthernet1/0/1 both
monitor session 1 destination interface GigabitEthernet1/0/48

! Source options:
!   both: capture ingress + egress
!   rx:   capture only received (ingress)
!   tx:   capture only transmitted (egress)

! RSPAN: Remote SPAN — span across switches via VLAN
monitor session 1 source interface GigabitEthernet1/0/1
monitor session 1 destination remote vlan 999

! ERSPAN: Encapsulated RSPAN — GRE tunnel to remote IP
! Used to send captures to a remote collector over IP network
monitor session 1 type erspan-source
 source interface GigabitEthernet1/0/1 both
 destination
  erspan-id 1
  ip address 10.0.0.100       ! remote collector IP
  origin ip address 10.0.0.1  ! local switch IP`}
      </CodeBlock>
      <Para>
        The SPAN destination port receives a copy of all source traffic and must have sufficient bandwidth to handle the aggregate. If 10 × 1 Gbps ports are spanned to a single 1 Gbps destination, only 10% of traffic is captured (the rest is dropped by the SPAN engine). Use a higher-bandwidth destination port, or limit source to a single port, or use a traffic tap instead.
      </Para>

      <Divider />

      {/* ── Ch 14 ── */}
      <Chapter n="14" title="Modern Ethernet — Datacenter and Beyond" subtitle="Where Ethernet is going at 400G, 800G, and RoCE" />
      <Para>
        Modern datacenter networking extends Ethernet far beyond its original LAN purpose. Two key developments: ultra-high-speed Ethernet (400G, 800G for spine-leaf fabric) and lossless Ethernet (for RDMA storage and HPC workloads).
      </Para>

      <H2>400G and 800G Ethernet in Datacenters</H2>
      <Para>
        A modern hyperscale datacenter switch (Broadcom Tomahawk 4: 25.6 Tbps, Broadcom Tomahawk 5: 51.2 Tbps) connects tens or hundreds of servers via high-density QSFP-DD 400G or 800G ports. These switches handle 10+ billion packets per second in hardware with single-digit microsecond latency. The switching ASIC processes every frame through a programmable pipeline: parse headers, look up forwarding table, apply ACL, decrement TTL, recompute CRC, output to correct port — all in hardware, at line rate, simultaneously on every port.
      </Para>

      <H2>RoCE — RDMA over Converged Ethernet</H2>
      <Para>
        RDMA (Remote Direct Memory Access) allows one server to write directly into another server's memory without CPU involvement — bypassing the OS kernel entirely. Originally, RDMA required InfiniBand. RoCEv2 (RDMA over Converged Ethernet v2) runs RDMA over standard 25G/100G Ethernet with UDP/IP encapsulation.
      </Para>
      <Para>
        RoCE requires <Accent>lossless Ethernet</Accent>: RDMA is extremely sensitive to packet loss — a single dropped packet forces retransmission of large amounts of data (the RDMA window). Lossless Ethernet uses Priority Flow Control (PFC) to pause the sending port before buffer overflow occurs, preventing drops. The entire network path must be configured for PFC: NIC, switch, and QoS policies.
      </Para>

      <H2>TSN — Time-Sensitive Networking</H2>
      <Para>
        IEEE 802.1 TSN is a set of standards that make Ethernet deterministic — guaranteed maximum latency for time-critical traffic. Used in: industrial automation (replacing proprietary fieldbuses), automotive in-vehicle networking (replacing CAN bus), audio/video production (AES67, SMPTE ST 2110). TSN standards include: 802.1AS (timing synchronization to 1 µs accuracy), 802.1Qbv (time-aware shaper — scheduled transmission windows), 802.1Qbu (frame preemption — interrupt low-priority frames mid-transmission for time-critical ones).
      </Para>

      <Divider />

      {/* ── Ch 15 ── */}
      <Chapter n="15" title="Troubleshooting Ethernet and Switching" subtitle="A systematic approach to Layer 2 problems" />

      <H2>Common Ethernet Problems and Symptoms</H2>
      <CodeBlock title="Ethernet troubleshooting decision tree">
{`Symptom                           Likely Cause           Tool/Command
─────────────────────────────────────────────────────────────────────────────
Interface shows "down/down"       Physical cable/SFP     DOM, cable tester, swap
Interface shows "up/down"         LACP/STP issue         show spanning-tree
High input errors / CRC errors    Bad cable, EMI, SFP    show interfaces, DOM
Duplex mismatch (2-10 Mbps on G)  One side forced duplex show interfaces (late col)
Unknown device getting traffic     MAC flooding attack    show mac addr-table count
Broadcast storm (CPU 100%)        STP loop               show spanning-tree, debug
Slow link despite gigabit port    Speed/duplex negotiation show interfaces status
Device unreachable on same switch  Port security violation show port-security

Key commands:
  show interfaces GigabitEthernet1/0/1
    → Input errors (CRC, frame, giants, runts), output drops, collisions

  show interfaces status
    → Connected/notconnect, speed, duplex, VLAN for all ports

  show mac address-table count
    → Total entries (near limit = MAC flood risk)

  show spanning-tree vlan 1
    → Port states, root bridge ID, check for topology changes

  debug spanning-tree events
    → Real-time STP topology change notifications`}
      </CodeBlock>

      <H2>Interpreting Interface Error Counters</H2>
      <CodeBlock title="Interface counter interpretation">
{`show interfaces GigabitEthernet1/0/1

GigabitEthernet1/0/1 is up, line protocol is up
  5 minute input rate 450000000 bits/sec
  5 minute output rate 450000000 bits/sec
  ...
  0 input errors         ← CRC + frame + overruns + ignored
  0 CRC                  ← Bad FCS — cable, EMI, bad SFP, dirty fiber connector
  0 frame                ← Framing errors — duplex mismatch, bad NIC
  0 giants               ← Frames > 1518B (or >9022B with jumbo) — MTU mismatch
  0 runts                ← Frames < 64B — collision fragments, bad NIC
  0 input packets with dribble condition  ← extra bit at end — bad NIC/cable
  0 output errors
  0 collisions           ← Should be 0 on full-duplex; >0 = duplex mismatch or hub
  0 late collision       ← CRITICAL: collision after 64B = duplex mismatch
  0 output buffer failures ← Congestion dropping — check QoS and uplink bandwidth`}
      </CodeBlock>

      <Divider />

      {/* ── Ch 16 ── */}
      <Chapter n="16" title="Interview Questions" subtitle="From beginner to PhD" />

      <IQ q="What happens when a switch receives a frame for a MAC address not in its CAM table?" level="Beginner">
        The switch floods the frame out all ports in the same VLAN except the ingress port — this is called unknown unicast flooding. The switch simultaneously learns the source MAC and records it in the CAM table. Once the destination device responds with a frame, the switch learns its MAC and port, and subsequent frames are forwarded directly (unicast) without flooding.
      </IQ>

      <IQ q="Why is the minimum Ethernet frame size 64 bytes? What happens to shorter frames?" level="Beginner">
        64 bytes is the minimum required for CSMA/CD collision detection. At 10 Mbps, the worst-case round-trip propagation delay on a maximum-length segment is 51.2 µs = 512 bit times = 64 bytes. If a frame were shorter, the sender could finish transmitting before a collision signal from the far end arrived — the sender would never detect the collision. Frames shorter than 64 bytes (runts or collision fragments) are discarded by the receiving switch. NICs pad short payloads to 46 bytes (minimum payload) to ensure frames are never shorter than 64 bytes.
      </IQ>

      <IQ q="What is the difference between a collision domain and a broadcast domain? How do switches and routers affect each?" level="Intermediate">
        A collision domain is a network segment where two devices can cause a collision if they transmit simultaneously. Each switch port is its own collision domain (full-duplex eliminates collisions entirely). A broadcast domain is the set of devices that receive each other's broadcast frames. Switches extend broadcast domains — all ports in the same VLAN share one broadcast domain. Routers terminate both: they create separate collision domains (each interface) AND separate broadcast domains (routers never forward Layer 2 broadcasts). A Layer 3 switch with VLANs provides separate broadcast domains per VLAN with inter-VLAN routing.
      </IQ>

      <IQ q="A switch's CAM table is full. What happens to new traffic? How would you detect and prevent this?" level="Intermediate">
        When the CAM table is full, new MAC addresses cannot be learned. All traffic to unknown MACs is flooded to all ports — this is a MAC flooding attack if intentional. Detection: monitor CAM table utilization (show mac address-table count; alert when near maximum). Prevention: port security with maximum MAC address limit per port (switchport port-security maximum 2) — when the limit is reached, new MACs trigger a violation action (restrict/shutdown). For critical networks, 802.1X authentication prevents any unauthorized device from getting a port on the network at all.
      </IQ>

      <IQ q="Explain LACP negotiation in detail: what TLVs are exchanged, what constitutes a compatible LAG pair, and what happens when a member link fails?" level="Senior">
        LACP PDUs (LACPDUs) are sent as multicast to 01:80:C2:00:00:02. Each LACPDU contains: Actor Information TLV (system priority, system ID/MAC, key, port priority, port number, state flags) and Partner Information TLV (same fields for the remote end). Two ports form a LAG when: system IDs are different (not the same device), keys match (configured channel-group number maps to a key), and port states agree (both active or one active/one passive). When a member link fails: LACP detects the loss of LACPDUs (timeout = 3 × LACP timer, either 3 s fast or 90 s slow), removes the port from the bundle, and redistributes flows to remaining active members via the load-balancing hash. Traffic on flows that were hashed to the failed link is briefly disrupted (~sub-second for fast LACP timers) then resumes on surviving links.
      </IQ>

      <IQ q="A datacenter switch is showing increasing 'late collision' errors on a port connected to a server. The link shows as 1Gbps/full-duplex on both sides. What are the possible causes and how do you definitively diagnose?" level="PhD">
        <Para>Late collisions on a full-duplex link are theoretically impossible — collisions require a shared medium and CSMA/CD, which full-duplex disables. If late collisions appear on a reported full-duplex link, the actual link state is inconsistent:</Para>
        <Para><strong>1. Duplex mismatch despite "showing" full-duplex:</strong> The switch port is forced to 1G/full while the server NIC is set to auto-negotiate. Per IEEE 802.3, when the forced side sends at full-duplex but the auto-negotiating side receives no FLPs, it defaults to half-duplex (parallel detection). The server NIC is in half-duplex, running CSMA/CD, detecting "collisions" when the full-duplex switch keeps transmitting while the NIC tries to backoff. The switch counter shows "late collisions" because the NIC's backoff causes it to start a new transmission mid-frame from the switch's perspective. Diagnosis: <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>show interfaces</code> on BOTH sides — if server shows half-duplex and switch shows full-duplex, this is the cause. Fix: set both to autonegotiate.</Para>
        <Para><strong>2. Faulty cable or NIC causing signal corruption:</strong> Severe signal integrity issues (marginal cable, damaged connector, EMI) can cause the NIC's carrier sense circuitry to misfire, misinterpreting received frames as idle. The NIC transmits when the switch is also transmitting, and the resulting noise is interpreted as a late collision. Diagnosis: replace cable, test with known-good SFP, check DOM signal levels.</Para>
        <Para><strong>3. NIC driver/firmware bug:</strong> Rare, but some NIC firmware incorrectly reports duplex to the OS while operating in half-duplex mode internally. Check NIC vendor firmware version, compare against known-bad firmware list. Workaround: force NIC to 1G/full via ethtool or driver parameters.</Para>
      </IQ>

      <Divider />

      <KeyTakeaways items={[
        'Ethernet was invented in 1973 at Xerox PARC. IEEE 802.3 (1983) standardized it. The same frame format has survived 50+ years while speeds increased 270,000-fold from 10 Mbps to 2.7 Tbps.',
        'An Ethernet frame: Preamble(7B)+SFD(1B) | Dst MAC(6B) | Src MAC(6B) | [802.1Q tag(4B)] | EtherType(2B) | Payload(46–1500B) | FCS(4B). Minimum 64 bytes (CSMA/CD), maximum 1522 bytes (standard), 9022 bytes (jumbo).',
        'The FCS (CRC-32) detects bit errors — a corrupted frame is silently dropped at Layer 2 with no error notification to the sender. Upper layers (TCP retransmit, UDP application) must detect and recover.',
        'Hubs are shared collision domains — CSMA/CD required. Switches give each port its own collision domain. Full-duplex switch ports have zero collisions and disable CSMA/CD entirely.',
        'The CAM table maps (MAC address, VLAN, port, timer). On unknown destination: flood. On known: unicast. Source MAC is always learned. Default aging: 300 seconds. TCAM limits entries to 8K–256K.',
        'CSMA/CD: Carrier Sense → transmit → detect collision → jam → exponential backoff. 64-byte minimum frame guarantees the sender is still transmitting when the collision signal arrives from the furthest point.',
        'Store-and-forward: full frame buffered, CRC checked, then forwarded (12 µs for 1500B at 1G). Cut-through: forward after reading 14-byte header (~1 µs). Cut-through propagates errors; store-and-forward does not.',
        'LACP (802.3ad) bonds multiple links into one logical interface. Load balancing hashes flows — a single TCP connection only uses one physical member. All members must match speed/duplex/VLAN config.',
        'Port security limits MAC addresses per port (maximum + sticky). 802.1X is the proper solution: authenticate the user/device via RADIUS before granting any network access.',
        'LLDP (IEEE 802.1AB) and CDP (Cisco-proprietary) discover directly connected neighbors — device ID, port ID, capabilities, VLANs, PoE. Disable on external-facing ports (security risk).',
        'SPAN/port mirroring copies traffic to a monitor port for IDS/packet capture. RSPAN spans across switches via VLAN. ERSPAN encapsulates in GRE for remote IP-based collection.',
        'Late collisions on a full-duplex port = duplex mismatch. CRC errors = cable/fiber/SFP issues. High unknown unicast flood rate = CAM table near capacity or MAC flood attack.',
      ]} />
    </LearnLayout>
  )
}
