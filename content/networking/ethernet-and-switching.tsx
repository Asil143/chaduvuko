'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

// ─── Helper components ────────────────────────────────────────────────────────

const ACC = '#10b981'

function Chapter({ n, title }: { n: number; title: string }) {
  const num = String(n).padStart(2, '0')
  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontSize: 11, color: ACC, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 6px', letterSpacing: '.12em' }}>// CHAPTER {num}</p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>{title}</h2>
    </div>
  )
}

function Divider() { return <div style={{ borderTop: '1px solid var(--border)', margin: '56px 0' }} /> }
function Para({ children }: { children: React.ReactNode }) { return <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p> }
function H2({ children }: { children: React.ReactNode }) { return <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', margin: '36px 0 14px', letterSpacing: '-0.5px' }}>{children}</h3> }
function H3({ children }: { children: React.ReactNode }) { return <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '28px 0 10px' }}>{children}</h4> }
function Accent({ children }: { children: React.ReactNode }) { return <strong style={{ color: ACC, fontWeight: 700 }}>{children}</strong> }
function Code({ children }: { children: React.ReactNode }) { return <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: '#1e293b', color: '#e2e8f0', padding: '2px 7px', borderRadius: 5 }}>{children}</code> }
function CodeBlock({ children }: { children: React.ReactNode }) {
  return <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, background: '#0d1525', border: '1px solid #1e293b', borderRadius: 10, padding: '18px 20px', overflowX: 'auto', lineHeight: 1.7, color: '#94a3b8', margin: '18px 0 24px' }}>{children}</pre>
}
function StoryBox({ children }: { children: React.ReactNode }) {
  return <div style={{ background: '#0a1628', border: '1px solid #1e3a5f', borderLeft: '4px solid #3b82f6', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: '#cbd5e1', lineHeight: 1.85 }}>{children}</div>
}
function WowBox({ children }: { children: React.ReactNode }) {
  return <div style={{ background: '#0a1a12', border: '1px solid #166534', borderLeft: '4px solid #10b981', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: '#bbf7d0', lineHeight: 1.85 }}><span style={{ fontWeight: 800, color: '#10b981', fontSize: 12, letterSpacing: '.1em', display: 'block', marginBottom: 6 }}>WOW FACT</span>{children}</div>
}
function Warn({ children }: { children: React.ReactNode }) {
  return <div style={{ background: '#1a1400', border: '1px solid #854d0e', borderLeft: '4px solid #f59e0b', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: '#fef08a', lineHeight: 1.85 }}><span style={{ fontWeight: 800, color: '#f59e0b', fontSize: 12, letterSpacing: '.1em', display: 'block', marginBottom: 6 }}>CAUTION</span>{children}</div>
}
function Err({ children }: { children: React.ReactNode }) {
  return <div style={{ background: '#1a0a0a', border: '1px solid #991b1b', borderLeft: '4px solid #ef4444', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: '#fecaca', lineHeight: 1.85 }}><span style={{ fontWeight: 800, color: '#ef4444', fontSize: 12, letterSpacing: '.1em', display: 'block', marginBottom: 6 }}>MISCONCEPTION</span>{children}</div>
}

const LEVEL_COLORS: Record<string, string> = { Beginner: '#10b981', Intermediate: '#3b82f6', Senior: '#8b5cf6', PhD: '#f97316' }
function IQ({ level, children }: { level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) {
  const c = LEVEL_COLORS[level]
  return (
    <div style={{ background: '#080d18', border: `1px solid ${c}40`, borderRadius: 12, padding: '18px 22px', margin: '22px 0' }}>
      <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 800, color: c, background: `${c}18`, border: `1px solid ${c}40`, borderRadius: 20, padding: '3px 10px', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10 }}>{level}</span>
      <div style={{ fontSize: 14.5, color: '#cbd5e1', lineHeight: 1.85 }}>{children}</div>
    </div>
  )
}

// ─── Interactive 1: Switch CAM Table Simulator ────────────────────────────────

type Port = 1 | 2 | 3 | 4
type MacEntry = { mac: string; port: Port; age: number }

const INITIAL_DEVICES: { name: string; mac: string; port: Port; color: string }[] = [
  { name: 'PC-A', mac: 'AA:AA:AA:AA:AA:01', port: 1, color: '#10b981' },
  { name: 'PC-B', mac: 'BB:BB:BB:BB:BB:02', port: 2, color: '#3b82f6' },
  { name: 'PC-C', mac: 'CC:CC:CC:CC:CC:03', port: 3, color: '#8b5cf6' },
  { name: 'Server', mac: 'DD:DD:DD:DD:DD:04', port: 4, color: '#f97316' },
]

function CamSimulator() {
  const [camTable, setCamTable] = useState<MacEntry[]>([])
  const [log, setLog] = useState<string[]>([])
  const [src, setSrc] = useState(0)
  const [dst, setDst] = useState(1)

  function sendFrame() {
    const sender = INITIAL_DEVICES[src]
    const receiver = INITIAL_DEVICES[dst]
    const newLog: string[] = []
    let newCam = [...camTable]

    // Learn source MAC
    const existing = newCam.find(e => e.mac === sender.mac)
    if (!existing) {
      newCam.push({ mac: sender.mac, port: sender.port, age: 0 })
      newLog.push(`📖 LEARN: Src MAC ${sender.mac} is on Port ${sender.port} → added to CAM table`)
    } else {
      newLog.push(`✓ KNOWN: Src MAC ${sender.mac} already in CAM table on Port ${sender.port}`)
    }

    // Forward decision
    const dstEntry = newCam.find(e => e.mac === receiver.mac)
    if (dstEntry) {
      newLog.push(`🎯 FORWARD: Dst MAC ${receiver.mac} known on Port ${dstEntry.port} → unicast to Port ${dstEntry.port} only`)
    } else {
      newLog.push(`📢 FLOOD: Dst MAC ${receiver.mac} not in CAM table → flood frame to ALL ports except Port ${sender.port}`)
    }

    setCamTable(newCam)
    setLog(prev => [...newLog, ...prev].slice(0, 20))
  }

  function reset() {
    setCamTable([])
    setLog([])
  }

  const devColors: Record<Port, string> = { 1: '#10b981', 2: '#3b82f6', 3: '#8b5cf6', 4: '#f97316' }

  return (
    <div style={{ margin: '28px 0', background: '#080d18', border: '1px solid #1e293b', borderRadius: 14, overflow: 'hidden' }}>
      {/* Controls */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #1e293b', display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace' }}>From (Source)</label>
          <select value={src} onChange={e => setSrc(Number(e.target.value))} style={{ background: '#0d1525', border: '1px solid #1e293b', borderRadius: 6, color: '#e2e8f0', padding: '6px 10px', fontSize: 12, fontFamily: 'monospace' }}>
            {INITIAL_DEVICES.map((d, i) => <option key={d.mac} value={i}>{d.name} ({d.mac.slice(0, 8)}…) Port {d.port}</option>)}
          </select>
        </div>
        <div style={{ fontSize: 18, color: '#334155', marginTop: 18 }}>→</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace' }}>To (Destination)</label>
          <select value={dst} onChange={e => setDst(Number(e.target.value))} style={{ background: '#0d1525', border: '1px solid #1e293b', borderRadius: 6, color: '#e2e8f0', padding: '6px 10px', fontSize: 12, fontFamily: 'monospace' }}>
            {INITIAL_DEVICES.map((d, i) => <option key={d.mac} value={i}>{d.name} ({d.mac.slice(0, 8)}…) Port {d.port}</option>)}
          </select>
        </div>
        <button onClick={sendFrame} disabled={src === dst} style={{ padding: '8px 18px', borderRadius: 8, background: ACC, color: '#000', fontWeight: 800, fontSize: 13, border: 'none', cursor: src === dst ? 'not-allowed' : 'pointer', marginTop: 18, opacity: src === dst ? 0.5 : 1 }}>Send Frame</button>
        <button onClick={reset} style={{ padding: '8px 14px', borderRadius: 8, background: 'transparent', color: '#64748b', fontWeight: 700, fontSize: 12, border: '1px solid #1e293b', cursor: 'pointer', marginTop: 18 }}>Reset</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        {/* CAM Table */}
        <div style={{ padding: '16px 18px', borderRight: '1px solid #1e293b' }}>
          <div style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace', marginBottom: 10, fontWeight: 700 }}>CAM TABLE (MAC Address Table)</div>
          {camTable.length === 0 && (
            <div style={{ fontSize: 12, color: '#334155', fontFamily: 'monospace', textAlign: 'center', padding: '20px 0' }}>empty — send a frame to populate</div>
          )}
          {camTable.map(entry => (
            <div key={entry.mac} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, padding: '6px 10px', background: '#0d1525', borderRadius: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: devColors[entry.port], flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#94a3b8', flex: 1 }}>{entry.mac}</span>
              <span style={{ fontSize: 11, fontFamily: 'monospace', color: devColors[entry.port], fontWeight: 700 }}>Port {entry.port}</span>
            </div>
          ))}
        </div>

        {/* Event log */}
        <div style={{ padding: '16px 18px' }}>
          <div style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace', marginBottom: 10, fontWeight: 700 }}>SWITCH DECISION LOG</div>
          {log.length === 0 && (
            <div style={{ fontSize: 12, color: '#334155', fontFamily: 'monospace', textAlign: 'center', padding: '20px 0' }}>no events yet</div>
          )}
          {log.slice(0, 8).map((entry, i) => (
            <div key={i} style={{ fontSize: 11.5, color: i === 0 ? '#cbd5e1' : '#475569', fontFamily: 'monospace', marginBottom: 6, lineHeight: 1.5 }}>{entry}</div>
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
  const totalSize = 14 + clampedPayload + 4  // header + payload + FCS
  const withPreamble = totalSize + 8  // preamble + SFD

  const isVlan = etherType === '0x8100'
  const segments = [
    { name: 'Preamble + SFD', size: 8, color: '#64748b', desc: '7 bytes preamble (10101010 pattern for clock sync) + 1 byte SFD (10101011, marks start of frame). Part of Ethernet framing, not the actual frame.' },
    { name: 'Dst MAC', size: 6, color: '#ef4444', desc: `Destination MAC: ${dstMac}. Switch reads this to make forwarding decision. FF:FF:FF:FF:FF:FF = broadcast to all.` },
    { name: 'Src MAC', size: 6, color: '#f97316', desc: `Source MAC: ${srcMac}. Switch learns this to update CAM table — "this MAC is on the port this frame arrived on."` },
    ...(isVlan ? [{ name: '802.1Q Tag', size: 4, color: '#ec4899', desc: '4-byte VLAN tag: EtherType 0x8100, then 3-bit PCP (priority), 1-bit DEI (drop eligibility), 12-bit VLAN ID (0-4094).' }] : []),
    { name: 'EtherType', size: 2, color: '#8b5cf6', desc: `EtherType ${etherType} = ${ETHERTYPES[etherType] ?? 'unknown'}. If value ≤ 1500: IEEE 802.3 length field. If > 1536 (0x0600): EtherType identifying upper-layer protocol.` },
    { name: 'Payload', size: clampedPayload, color: '#3b82f6', desc: `${clampedPayload} bytes of upper-layer data (${ETHERTYPES[etherType] ?? 'data'}). Minimum 46 bytes (padded if shorter to meet min frame size of 64 bytes). Maximum 1500 bytes (jumbo frames extend to 9000 bytes).` },
    { name: 'FCS', size: 4, color: '#10b981', desc: 'Frame Check Sequence: CRC-32 computed over Dst+Src+Type+Payload. Receiver recomputes and compares. Mismatch = frame dropped silently.' },
  ]

  const totalDisplay = segments.reduce((s, seg) => s + seg.size, 0)
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div style={{ margin: '28px 0', background: '#080d18', border: '1px solid #1e293b', borderRadius: 14, overflow: 'hidden' }}>
      {/* Inputs */}
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #1e293b', display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace' }}>Src MAC</label>
          <input value={srcMac} onChange={e => setSrcMac(e.target.value)} style={{ background: '#0d1525', border: '1px solid #1e293b', borderRadius: 6, color: '#e2e8f0', padding: '5px 10px', fontSize: 12, fontFamily: 'monospace', width: 160 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace' }}>Dst MAC</label>
          <input value={dstMac} onChange={e => setDstMac(e.target.value)} style={{ background: '#0d1525', border: '1px solid #1e293b', borderRadius: 6, color: '#e2e8f0', padding: '5px 10px', fontSize: 12, fontFamily: 'monospace', width: 160 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace' }}>EtherType</label>
          <select value={etherType} onChange={e => setEtherType(e.target.value)} style={{ background: '#0d1525', border: '1px solid #1e293b', borderRadius: 6, color: '#e2e8f0', padding: '5px 10px', fontSize: 12, fontFamily: 'monospace' }}>
            {Object.entries(ETHERTYPES).map(([k, v]) => <option key={k} value={k}>{k} ({v})</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace' }}>Payload: {clampedPayload}B</label>
          <input type="range" min={1} max={1500} value={payloadSize} onChange={e => setPayloadSize(Number(e.target.value))} style={{ width: 120, accentColor: ACC }} />
        </div>
      </div>

      <div style={{ padding: '18px 20px' }}>
        {/* Frame visual */}
        <div style={{ display: 'flex', height: 36, borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
          {segments.map(seg => (
            <div
              key={seg.name}
              onMouseEnter={() => setHovered(seg.name)}
              onMouseLeave={() => setHovered(null)}
              style={{
                flex: seg.name === 'Payload' ? clampedPayload : seg.size,
                background: hovered === seg.name ? `${seg.color}50` : `${seg.color}25`,
                borderRight: '1px solid #080d18',
                cursor: 'pointer',
                transition: 'background .15s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {seg.size > 3 && (
                <span style={{ fontSize: 9, color: seg.color, fontFamily: 'monospace', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0 4px' }}>
                  {seg.name === 'Payload' ? `PAYLOAD (${clampedPayload}B)` : seg.name}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Size summary */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
          {[
            { label: 'Frame size', value: `${totalDisplay - 8}B` },
            { label: 'With preamble', value: `${totalDisplay}B` },
            { label: 'Status', value: clampedPayload < 46 ? 'Padded to 64B min' : payloadSize > 1500 ? 'EXCEEDS MTU!' : 'Valid frame' },
          ].map(r => (
            <div key={r.label} style={{ fontSize: 12, fontFamily: 'monospace', color: '#64748b' }}>
              <span>{r.label}: </span><span style={{ color: '#94a3b8', fontWeight: 700 }}>{r.value}</span>
            </div>
          ))}
        </div>

        {/* Field detail */}
        {hovered && (
          <div style={{ background: '#0d1525', borderRadius: 10, padding: '14px 16px', borderLeft: `3px solid ${segments.find(s => s.name === hovered)?.color}` }}>
            <div style={{ fontSize: 12, color: segments.find(s => s.name === hovered)?.color, fontWeight: 800, fontFamily: 'monospace', marginBottom: 6 }}>{hovered}</div>
            <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7 }}>{segments.find(s => s.name === hovered)?.desc}</div>
          </div>
        )}
        {!hovered && (
          <div style={{ textAlign: 'center', fontSize: 12, color: '#334155', fontFamily: 'monospace' }}>hover over a field to see its purpose</div>
        )}
      </div>
    </div>
  )
}

// ─── Interactive 3: Hub vs Switch Comparison ─────────────────────────────────

function HubVsSwitch() {
  const [device, setDevice] = useState<'hub' | 'switch'>('hub')
  const [scenario, setScenario] = useState(0)

  const SCENARIOS = [
    {
      label: 'Normal unicast',
      hubBehavior: 'Hub broadcasts to ALL ports. PC-A, PC-B, PC-C all receive the frame even though only the intended recipient needs it.',
      switchBehavior: 'Switch sends ONLY to the destination port (after learning). PC-A gets nothing unless it\'s the destination.',
      hubCollision: true,
      efficiency: { hub: 25, sw: 100 },
    },
    {
      label: 'Two hosts transmitting',
      hubBehavior: 'COLLISION! Both signals collide on the shared medium. Both hosts detect the collision (jam signal) and back off using exponential backoff. Both retransmit after random delay. At 10 devices: collision rate can reach 60%.',
      switchBehavior: 'Each port is a separate collision domain. Both hosts transmit simultaneously without collision. Switch buffers both frames and forwards each independently.',
      hubCollision: true,
      efficiency: { hub: 12, sw: 95 },
    },
    {
      label: 'Broadcast traffic',
      hubBehavior: 'Broadcast is flood behavior — same as normal hub. Every device receives the broadcast. This is expected behavior for ARP, DHCP, and similar protocols.',
      switchBehavior: 'Broadcast frames are ALSO flooded to all ports — this is correct behavior. Switch does NOT filter broadcasts (that\'s what VLANs are for). Difference from hub: only broadcasts flood, not unicast.',
      hubCollision: false,
      efficiency: { hub: 25, sw: 25 },
    },
    {
      label: '100 devices on network',
      hubBehavior: 'ONE shared collision domain for all 100 devices. With 100 devices all transmitting, collision rate approaches 99%. Effective throughput per device on a 10Mbps hub: <0.1 Mbps. Network is essentially unusable.',
      switchBehavior: '100 SEPARATE collision domains (one per port). Each port can simultaneously transmit at full line rate. 100 devices × 1 Gbps = aggregate throughput approaches 100 Gbps. Bandwidth doesn\'t degrade with more devices.',
      hubCollision: true,
      efficiency: { hub: 1, sw: 98 },
    },
  ]

  const sc = SCENARIOS[scenario]
  const info = device === 'hub' ? sc.hubBehavior : sc.switchBehavior

  return (
    <div style={{ margin: '28px 0', background: '#080d18', border: '1px solid #1e293b', borderRadius: 14, overflow: 'hidden' }}>
      {/* Device toggle */}
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #1e293b', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['hub', 'switch'] as const).map(d => (
            <button key={d} onClick={() => setDevice(d)} style={{ padding: '6px 16px', borderRadius: 16, border: `1px solid ${device === d ? (d === 'hub' ? '#ef4444' : '#10b981') : '#1e293b'}`, background: device === d ? (d === 'hub' ? '#ef444418' : '#10b98118') : 'transparent', color: device === d ? (d === 'hub' ? '#ef4444' : '#10b981') : '#64748b', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{d.toUpperCase()}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {SCENARIOS.map((s, i) => (
            <button key={s.label} onClick={() => setScenario(i)} style={{ padding: '4px 10px', borderRadius: 12, border: `1px solid ${i === scenario ? '#64748b' : '#1e293b'}`, background: i === scenario ? '#1e293b' : 'transparent', color: i === scenario ? '#cbd5e1' : '#64748b', fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'monospace' }}>{s.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 22px' }}>
        {/* Efficiency bars */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', fontFamily: 'monospace', marginBottom: 8 }}>
            <span>Effective bandwidth utilization — {sc.label}</span>
          </div>
          {[
            { label: 'Hub', pct: sc.efficiency.hub, color: '#ef4444' },
            { label: 'Switch', pct: sc.efficiency.sw, color: '#10b981' },
          ].map(bar => (
            <div key={bar.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: bar.color, fontFamily: 'monospace', minWidth: 50, fontWeight: 700 }}>{bar.label}</span>
              <div style={{ flex: 1, height: 8, background: '#1e293b', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${bar.pct}%`, height: '100%', background: bar.color, borderRadius: 4, transition: 'width .4s ease' }} />
              </div>
              <span style={{ fontSize: 11, color: bar.color, fontFamily: 'monospace', minWidth: 35 }}>{bar.pct}%</span>
            </div>
          ))}
        </div>

        {/* Behavior description */}
        <div style={{ background: device === 'hub' ? '#1a0a0a' : '#0a1a12', border: `1px solid ${device === 'hub' ? '#991b1b' : '#166534'}`, borderRadius: 10, padding: '16px 18px', marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: device === 'hub' ? '#ef4444' : '#10b981', fontFamily: 'monospace', marginBottom: 8 }}>
            {device.toUpperCase()} BEHAVIOR — {sc.label.toUpperCase()}
          </div>
          <div style={{ fontSize: 13.5, color: device === 'hub' ? '#fecaca' : '#bbf7d0', lineHeight: 1.8 }}>{info}</div>
        </div>

        {device === 'hub' && sc.hubCollision && (
          <div style={{ fontSize: 12, color: '#f97316', background: '#1a1400', border: '1px solid #854d0e', borderRadius: 8, padding: '10px 14px', fontFamily: 'monospace' }}>
            ⚠ CSMA/CD active: hosts detect collision, send 32-bit jam signal, wait random backoff × slot time (51.2 μs for 10Mbps) before retrying
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Module ────────────────────────────────────────────────────────────────────

export default function EthernetAndSwitchingPage() {
  return (
    <LearnLayout
      title="Ethernet and Switching"
      description="From a shared wire in 1973 to dedicated 400G ports in 2024 — how Ethernet became the universal LAN standard and how switches make it scale."
      section="Networking Fundamentals — Module 08"
      readTime="22–30 min"
      updatedAt="May 2026"
    >
      {/* ── Chapter 01 ── */}
      <Chapter n={1} title="The Wire That Became the World" />

      <StoryBox>
        Xerox PARC, 1973. Robert Metcalfe needs to connect the ALTO workstations in his lab to a printer.
        He stretches a coaxial cable along the hall — "the Ether." Any machine can transmit a signal into
        this shared wire. If two machines transmit at once, their signals collide into noise. He designs
        a simple rule: before transmitting, listen. If the wire is busy, wait. If two collide, they both
        back off for a random time and try again. He calls it CSMA/CD — Carrier Sense Multiple Access
        with Collision Detection. The first Ethernet runs at 2.94 Mbps.
      </StoryBox>

      <Para>
        Fifty years later, Ethernet runs at 400 Gbps and 800 Gbps in data centers. The name stuck.
        The coaxial cable became twisted pair, then fiber. The shared Ether became a dedicated, switched
        full-duplex connection where collisions are essentially impossible. But the fundamental frame format
        Metcalfe designed in 1973 — source MAC, destination MAC, type field, payload, CRC — is still
        what your laptop sends when you load a web page.
      </Para>

      <WowBox>
        Metcalfe wrote the original Ethernet spec on May 22, 1973 — a 4-page memo. He co-founded 3Com
        in 1979 to commercialize Ethernet. When Ethernet was standardized by IEEE as 802.3 in 1983,
        there were competing alternatives: Token Ring (IBM) and Token Bus. Token Ring had guaranteed
        deterministic access, no collisions, and better utilization at high load. Ethernet won anyway
        because it was cheaper, simpler, and "good enough." Engineering is full of this pattern.
      </WowBox>

      <Divider />

      {/* ── Chapter 02 ── */}
      <Chapter n={2} title="The Ethernet Frame: A 50-Year Standard" />

      <Para>
        Every bit of data on a LAN is wrapped in an Ethernet frame. The frame structure has remained
        essentially unchanged since 1980 (IEEE 802.3), though it has been extended for VLAN tags,
        jumbo frames, and new field definitions.
      </Para>

      <EthernetFrameBuilder />

      <H2>The Minimum Frame Size: Why 64 Bytes?</H2>

      <Para>
        Ethernet has a minimum frame size of 64 bytes (excluding preamble). The reason is CSMA/CD:
        for collision detection to work, the transmission must still be in progress when the collision
        signal travels back from the far end of the network. With a maximum network diameter of 2,500 meters
        (at 10 Mbps), the round-trip propagation takes 51.2 μs. At 10 Mbps, 51.2 μs = 512 bits = 64 bytes.
        A frame shorter than 64 bytes would finish transmitting before the collision signal arrived — the
        sender would think the frame was sent successfully when it had actually collided.
      </Para>

      <Para>
        Today, with switched full-duplex networks where collisions don&apos;t occur, the 64-byte minimum is
        maintained for backwards compatibility. Frames shorter than 64 bytes are called <Accent>runts</Accent> —
        they&apos;re a sign of a problem (truncation, line errors, or half-duplex collision).
      </Para>

      <H2>Jumbo Frames: Breaking the 1500-Byte MTU</H2>

      <Para>
        The 1,500-byte payload limit (IEEE 802.3) was set in 1980 for a 10 Mbps network. At 10 Mbps,
        a 1500-byte frame takes 1.2ms to transmit — already long enough. At 10 Gbps, a 1500-byte frame
        takes 0.0012ms. The overhead of per-frame processing (headers, checksums, interrupts) dominates.
        Jumbo frames (up to 9,000 bytes or more, depending on hardware) dramatically reduce per-frame
        overhead for bulk transfers.
      </Para>

      <CodeBlock>{`Standard Ethernet: 1,500 byte payload
Jumbo frame:       9,000 byte payload (most common)
Super jumbo:       16,000+ bytes (some storage networks)

Performance improvement at 10 Gbps:
  1500-byte frames: ~833,333 frames/second × interrupt overhead
  9000-byte frames: ~138,889 frames/second × interrupt overhead
  ~6× fewer interrupts → lower CPU utilization → higher sustainable throughput

Requirements: ALL devices in the path must support the same MTU.
If any device has smaller MTU, jumbo frames are dropped.
Enable with: ip link set eth0 mtu 9000 (Linux)
Test: ping -s 8972 host (8972 + 28 IP/ICMP headers = 9000 bytes)`}</CodeBlock>

      <Divider />

      {/* ── Chapter 03 ── */}
      <Chapter n={3} title="Hubs vs Switches: A Paradigm Shift" />

      <Para>
        The most important evolution in Ethernet wasn&apos;t speed — it was the transition from hubs to switches.
        A hub makes all connected devices share a single collision domain. A switch gives each device
        its own dedicated collision domain.
      </Para>

      <HubVsSwitch />

      <H2>The Hub: Shared Everything</H2>

      <Para>
        A hub is a Layer 1 device: it receives an electrical signal on one port and electrically repeats
        it to all other ports simultaneously. It has no intelligence — no MAC learning, no frame buffering,
        no forwarding decisions. Every device on a hub segment hears every frame. This creates one collision
        domain for all connected devices and one broadcast domain.
      </Para>

      <Para>
        Hubs are obsolete. You will not encounter them in modern networks. But understanding why they
        failed teaches you everything important about why switching works.
      </Para>

      <H2>The Switch: Intelligence at Layer 2</H2>

      <Para>
        A switch is a Layer 2 device that makes forwarding decisions based on destination MAC addresses.
        Each port is a separate collision domain (full-duplex, no CSMA/CD needed). The switch maintains
        a <Accent>CAM table</Accent> (Content Addressable Memory) — a MAC-to-port mapping that it builds
        dynamically through frame observation.
      </Para>

      <Divider />

      {/* ── Chapter 04 ── */}
      <Chapter n={4} title="The CAM Table: How Switches Learn and Forward" />

      <Para>
        The CAM table (also called MAC address table or forwarding table) is the switch&apos;s brain.
        It maps MAC addresses to ports. The learning process is elegant in its simplicity:
        the switch learns by watching where frames come from.
      </Para>

      <CamSimulator />

      <H2>The Learning Algorithm</H2>

      <CodeBlock>{`When a frame arrives on Port 3 with Src MAC AA:BB:CC:DD:EE:01:

STEP 1 — LEARN SOURCE:
  Look up AA:BB:CC:DD:EE:01 in CAM table.
  Not found → add: {MAC: AA:BB:CC:DD:EE:01, Port: 3, Age: 0}
  Found on Port 3 → reset age timer to 0 (refresh entry)
  Found on different port → update port (the device moved)

STEP 2 — FORWARD BASED ON DESTINATION:
  Case 1: Dst MAC found in CAM → UNICAST to that port only
  Case 2: Dst MAC not in CAM → FLOOD to all ports except Port 3 (unknown unicast)
  Case 3: Dst MAC is broadcast (FF:FF:FF:FF:FF:FF) → FLOOD to all ports except source
  Case 4: Dst MAC is multicast → FLOOD to all ports (or to IGMP-managed ports)

AGING:
  CAM entries age out after 300 seconds (5 minutes, configurable).
  After aging, that MAC must be relearned on next frame.
  Prevents stale entries from dead devices filling the table.

CAM TABLE SIZE:
  Enterprise switches: 16,000 – 256,000 entries
  Data center switches: 256,000 – 1,000,000+ entries
  Full table → CAM overflow → all unknown unicast floods (like a hub!)
  Security attack: MAC flooding deliberately fills the CAM table`}</CodeBlock>

      <H2>Flooding vs Forwarding Performance</H2>

      <Para>
        When a switch floods a frame (unknown destination), every device on every port receives the frame,
        even though only one should. In a busy network, this flood traffic (also called <Accent>unknown unicast flood</Accent>)
        can significantly impact performance. This is why proper network design limits broadcast domain size
        with VLANs — a smaller broadcast domain means fewer destinations to flood to.
      </Para>

      <Divider />

      {/* ── Chapter 05 ── */}
      <Chapter n={5} title="CSMA/CD: The Collision Resolution Protocol" />

      <Para>
        CSMA/CD (Carrier Sense Multiple Access with Collision Detection) was Ethernet&apos;s original media
        access control method for shared (hub) networks. In full-duplex switched networks, CSMA/CD is
        not used — collisions are impossible. But understanding CSMA/CD is fundamental to understanding
        why switches were such an improvement.
      </Para>

      <H2>How CSMA/CD Works</H2>

      <CodeBlock>{`1. CARRIER SENSE: Before transmitting, listen to the wire.
   If carrier detected (someone else is transmitting): WAIT.
   If idle: proceed to transmit.

2. TRANSMISSION: Begin sending the frame.
   Continue monitoring the wire while sending.

3. COLLISION DETECTION: While transmitting, compare what you
   sent vs what you receive on the wire.
   If they differ: COLLISION detected.

4. JAM SIGNAL: Transmit 32-bit jam signal to ensure all devices
   on the segment know a collision occurred.

5. BACKOFF: Stop transmitting. Wait a random time determined by
   binary exponential backoff:
   - 1st collision: wait random[0, 1] × 51.2 μs
   - 2nd collision: wait random[0, 3] × 51.2 μs
   - Nth collision: wait random[0, 2ⁿ-1] × 51.2 μs
   - After 16 collisions: give up and report error

6. RETRY: Go to step 1 and try again.

Why backoff must be random: if both hosts backed off the same time,
they&apos;d collide again on the next attempt. Random times break the symmetry.`}</CodeBlock>

      <Para>
        In practice, modern Ethernet (100Mbps+) runs almost exclusively in full-duplex mode over switched
        infrastructure. CSMA/CD is technically defined by the standards but never actually executes because
        there are no shared collision domains. The 64-byte minimum frame size remains as a legacy artifact.
      </Para>

      <Divider />

      {/* ── Chapter 06 ── */}
      <Chapter n={6} title="Ethernet Evolution: From 10 Mbps to 800 Gbps" />

      <Para>
        Ethernet has scaled 80,000× in speed over 50 years — from 10 Mbps (1980) to 800 Gbps (2023) —
        while maintaining backward compatibility at the frame level. The same frame format works across all speeds.
      </Para>

      <H2>Speed Milestones and Key Technologies</H2>

      <CodeBlock>{`Standard         Year  Speed      Medium            Key technology
─────────────────────────────────────────────────────────────────────────────
10BASE5          1980  10 Mbps    Thick coax        Shared bus, Manchester encoding
10BASE2          1985  10 Mbps    Thin coax         Cheaper, still shared
10BASE-T         1990  10 Mbps    UTP Cat3          Twisted pair, hub-based
100BASE-TX       1995  100 Mbps   Cat5              4B/5B + NRZI + MLT-3 encoding
1000BASE-T       1998  1 Gbps     Cat5e             PAM5, 4-pair simultaneous TX/RX
10GBASE-T        2006  10 Gbps    Cat6A             DSP equalization, PAM16 + LDPC
10GBASE-SR/LR    2002  10 Gbps    MMF/SMF           Serial optics, direct detection
25GBASE-R        2014  25 Gbps    SMF/MMF           Single-lane 25G
40GBASE-SR4      2010  40 Gbps    MMF (MPO)         4×10G parallel lanes, 850nm
100GBASE-LR4     2010  100 Gbps   SMF               4 wavelengths × 25G, CWDM4
400GBASE-DR4     2017  400 Gbps   SMF               4×100G lanes, 500m reach
400GBASE-ZR      2021  400 Gbps   SMF               Coherent, 80km reach, DSP
800GBASE-DR8     2023  800 Gbps   SMF               8×100G lanes, 500m reach`}</CodeBlock>

      <WowBox>
        The jump from 10Mbps (1980) to 10Gbps (2002) took 22 years. From 10Gbps to 400Gbps took 15 years.
        Each speed increase required fundamental changes in encoding, signal processing, and manufacturing.
        10GBASE-T copper (2006) needed DSP chips doing billions of operations per second to equalize the
        signal from a 100m Cat6A cable — the equivalent of removing an echo from a 100m phone call 200
        million times per second. The chip was larger and more powerful than the CPUs of the era when
        10BASE-T was designed.
      </WowBox>

      <H2>Auto-Negotiation: How Devices Agree on Speed</H2>

      <CodeBlock>{`Auto-Negotiation (IEEE 802.3u, 1995) lets two devices agree on:
  - Speed: 10/100/1000 Mbps (copper), fixed for fiber
  - Duplex: Half or Full
  - Flow control: Pause frames (802.3x)

How it works (for copper Ethernet):
  Both ends transmit Fast Link Pulses (FLPs) before the link comes up.
  FLPs encode a capability bitfield (what speeds/duplex each side supports).
  Both sides take the highest capability that both support.

Priority (highest to lowest in 1G auto-negotiate):
  1. 1000BASE-T Full Duplex
  2. 1000BASE-T Half Duplex
  3. 100BASE-TX Full Duplex
  4. 100BASE-TX Half Duplex
  5. 10BASE-T Full Duplex
  6. 10BASE-T Half Duplex

Failure modes:
  - One side has auto-negotiation disabled → other side falls to 10/100 Half Duplex
  - "Duplex mismatch" (one full, one half) → half-duplex side gets collisions
  - Collisions → high retransmits → very low throughput despite link being "up"
  - Appears as "1 Gbps link but only 10 Mbps throughput" — classic symptom`}</CodeBlock>

      <Divider />

      {/* ── Chapter 07 ── */}
      <Chapter n={7} title="Switch Architecture: How Hardware Makes it Fast" />

      <Para>
        A Layer 2 switch must make forwarding decisions in nanoseconds — at 10 Gbps, a minimum-size
        64-byte frame arrives in just 51 nanoseconds. Software cannot process frames this fast;
        all the core forwarding logic runs in dedicated hardware (ASICs).
      </Para>

      <H2>The Forwarding Pipeline</H2>

      <CodeBlock>{`Physical Layer → MACs → Input Buffer → Forwarding ASIC → Output Buffer → Physical Layer

Key components:
  MAC: serializes/deserializes bits, performs FCS check, handles auto-negotiation
  Input buffer: queues frames while forwarding decision is made (nanoseconds)
  Forwarding ASIC: performs parallel CAM lookup using TCAM
    → TCAM (Ternary CAM): hardware lookup in O(1) time
    → Can match on 0, 1, or X (don't care) — enables wildcard matching
    → 1M TCAM entry lookup takes ~20 nanoseconds
  Output buffer: multiple queues per port for QoS (different priorities)
  Scheduler: decides which queue to drain next (strict priority, WRR, WFQ)

Switching fabric: connects all ports simultaneously
  Shared memory: all ports share a large buffer, managed by scheduler
  Cross-bar: dedicated paths between every port pair (non-blocking)
  Clos network: multi-stage switching for very high port count

Switch capacity:
  Total switching capacity: number of ports × port speed × 2 (full duplex)
  48-port 10G switch: 48 × 10G × 2 = 960 Gbps capacity
  Non-blocking: if capacity ≥ sum of all port speeds (no congestion under load)`}</CodeBlock>

      <H2>Store-and-Forward vs Cut-Through</H2>

      <CodeBlock>{`Store-and-Forward:
  Receive ENTIRE frame before forwarding.
  Verify FCS checksum — drop bad frames before forwarding.
  Latency: proportional to frame size (for 1500B at 1G: 12μs wait)
  Benefit: no corrupt frames propagated downstream.
  Default on most enterprise switches.

Cut-Through:
  Start forwarding frame BEFORE fully received.
  Read only the first 6 bytes (destination MAC) then immediately forward.
  Latency: constant ~1μs regardless of frame size.
  Risk: corrupt frames ARE forwarded (CRC checked at destination only).
  Used in: latency-sensitive applications (HFT, HPC cluster interconnects).
  Available: premium data center switches (Arista, Cisco Nexus).

Fragment-Free (hybrid):
  Read first 64 bytes (full collision window) then forward.
  Filters runts/collision fragments while maintaining low latency.
  Latency: constant ~0.5μs for most frames.`}</CodeBlock>

      <Divider />

      {/* ── Chapter 08 ── */}
      <Chapter n={8} title="Broadcast Domains and the Limits of Layer 2" />

      <Para>
        Switches create a flat Layer 2 network — every device on every switch port is in the same broadcast
        domain. ARP requests, DHCP discovers, and other broadcast protocols reach every device.
        As the broadcast domain grows, broadcast traffic becomes a significant fraction of total traffic.
      </Para>

      <H2>Broadcast Storm: When Everything Goes Wrong</H2>

      <Para>
        A broadcast storm occurs when a frame is broadcast, received by switches, re-broadcast, received again,
        and re-broadcast in an infinite loop. The most common cause: a network loop in a Layer 2 topology
        without Spanning Tree Protocol. Within milliseconds, broadcast frames multiply exponentially until
        the network is 100% saturated with broadcast traffic and all normal communication is impossible.
      </Para>

      <StoryBox>
        The classic scenario: someone connects two Ethernet cables between the same two switches "for redundancy."
        Now there&apos;s a loop. A broadcast frame enters switch A on port 1, gets broadcast to all ports
        including the two links to switch B. Switch B receives two copies, broadcasts both to all ports
        including back to switch A. Switch A receives them, broadcasts again. Each iteration doubles the
        broadcast traffic. Within 100 milliseconds, the switches are forwarding millions of frames per second
        and have CAM tables full of rapidly changing, contradictory entries. All production traffic stops.
        Spanning Tree Protocol prevents this — but only if it&apos;s configured and enabled.
      </StoryBox>

      <H2>Solutions: Routing, VLANs, and STP</H2>

      <Para>
        Three tools control broadcast domain size: <Accent>routing</Accent> (Layer 3 boundaries stop broadcasts),
        <Accent>VLANs</Accent> (logical broadcast domain segmentation within a switch), and
        <Accent>Spanning Tree Protocol</Accent> (prevents loops by logically blocking redundant links).
        All three are covered in dedicated modules — understanding why they exist starts here.
      </Para>

      <Divider />

      {/* ── Chapter 09 ── */}
      <Chapter n={9} title="Flow Control and QoS in Switching" />

      <Para>
        When a fast sender fills a switch&apos;s output buffer faster than the receiver can drain it,
        frames are dropped. Layer 2 has two mechanisms to prevent this: <Accent>PAUSE frames</Accent>
        (flow control) and <Accent>Quality of Service</Accent> (priority queuing).
      </Para>

      <H2>IEEE 802.3x PAUSE Frames</H2>

      <Para>
        When a switch&apos;s receive buffer fills, it sends a PAUSE frame to the sender, instructing it to stop
        transmitting for a specified time (0–65,535 quanta, where 1 quantum = 512 bit times). The sender
        pauses, the buffer drains, then the sender resumes. This is a binary on/off mechanism — all traffic
        stops regardless of priority.
      </Para>

      <H2>PFC: Priority Flow Control (802.1Qbb)</H2>

      <Para>
        PAUSE frames have a critical flaw: stopping all traffic to prevent loss on one class also stops
        latency-sensitive traffic. PFC (Priority Flow Control) solves this by applying PAUSE selectively
        per traffic class. There are 8 traffic classes (defined by 802.1p CoS bits in the VLAN tag).
        PFC can pause class 4 (bulk data) without pausing class 6 (voice) or class 7 (network control).
      </Para>

      <Para>
        PFC is the foundation of <Accent>lossless Ethernet</Accent> — required for RDMA over Converged Ethernet
        (RoCE) used in high-performance computing and storage (NVMe-oF). Without PFC, any dropped packet
        in RDMA triggers a connection reset, destroying performance. With PFC, the network admits no drops
        for the designated RDMA traffic class.
      </Para>

      <Divider />

      {/* ── Chapter 10 ── */}
      <Chapter n={10} title="LLDP and CDP: How Switches Discover Each Other" />

      <Para>
        LLDP (Link Layer Discovery Protocol, IEEE 802.1AB) allows network devices to advertise their
        identity and capabilities to directly connected neighbors. Unlike routing protocols, LLDP doesn&apos;t
        traverse Layer 3 boundaries — it only reaches one hop.
      </Para>

      <CodeBlock>{`LLDP frame content:
  Chassis ID (MAC address or system name)
  Port ID (interface name, e.g., "GigabitEthernet0/1")
  Time-to-Live (hold time before entry expires)
  Optional TLVs:
    - System Name ("switch-core-1.datacenter.example.com")
    - System Description (hardware model, OS version)
    - Capabilities (bridge, router, telephone, DOCSIS, WLAN AP...)
    - Management Address (IP for management)
    - Port VLAN ID (what VLAN the port is on)
    - Power via MDI (PoE parameters)

$ ip neighbor show      # LLDP neighbors on Linux (requires lldpd)
$ lldpctl               # Full LLDP neighbor details

CDP (Cisco Discovery Protocol) — Cisco proprietary:
  Same concept, more Cisco-specific data.
  Includes IOS version, VTP domain, native VLAN, platform.
  Note: CDP frames are Cisco proprietary — doesn't work with non-Cisco devices.
  Best practice: use LLDP for multi-vendor environments.

Use cases:
  Network mapping: build physical topology without manual documentation
  Troubleshooting: which switch port is a device connected to?
  PoE: phone tells switch its power requirements via LLDP-MED
  Voice VLAN: IP phone receives voice VLAN info via LLDP-MED/CDP`}</CodeBlock>

      <Divider />

      {/* ── Chapter 11 ── */}
      <Chapter n={11} title="Modern Ethernet: Data Center and Beyond" />

      <Para>
        Modern data center Ethernet (100G, 400G, 800G) looks fundamentally different from office Ethernet.
        The speeds are higher, the architectures are leaf-spine, the optics are coherent, and the protocols
        have been extended for lossless RDMA and automated configuration.
      </Para>

      <H2>Leaf-Spine Architecture</H2>

      <CodeBlock>{`Traditional 3-tier (collapsed core):
  Access Layer → Distribution Layer → Core Layer
  Problem: servers on the same access switch have low latency (1 hop)
           servers on different access switches have high latency (3 hops)
           creates "elephant flows" through distribution layer

Leaf-Spine (2-tier, popular in modern data centers):
  Every Leaf switch connects to EVERY Spine switch.
  Every server is exactly 2 hops from every other server.
  Deterministic, uniform latency across all server-to-server traffic.
  Scale-out: add a leaf for more servers, add a spine for more bandwidth.

Typical sizing (2024):
  Leaf: 48× 25G server ports + 8× 100G spine uplinks
  Spine: 32× 100G downlinks to leaves
  Max servers: 32 leaves × 48 servers = 1,536 servers at uniform latency
  Bandwidth oversubscription: 48×25G = 1.2Tbps down, 8×100G = 800Gbps up → ~1.5:1

For full bisectional bandwidth (no oversubscription):
  Use ECMP (Equal-Cost Multi-Path) across all spine uplinks
  Hash traffic across all spine switches per flow
  LACP bonding or ECMP for load distribution`}</CodeBlock>

      <H2>RDMA over Converged Ethernet (RoCE)</H2>

      <Para>
        Traditional RDMA (Remote Direct Memory Access) allowed InfiniBand-connected servers to directly
        read/write each other&apos;s memory without CPU involvement, at very low latency (1-3 μs). RoCE
        brings this to Ethernet: RDMA over UDP/IPv4 (RoCEv1) or over IP (RoCEv2). Used in high-performance
        computing (GPU clusters), distributed storage (NVMe-oF), and cloud hypervisors (AWS ENA, Azure RDMA).
        Requires lossless Ethernet with PFC — any packet loss in RDMA triggers retransmission storms.
      </Para>

      <Divider />

      {/* ── Chapter 12 ── */}
      <Chapter n={12} title="Troubleshooting Ethernet and Switching" />

      <Para>
        Layer 2 problems are some of the hardest to diagnose because they often cause cascading failures:
        a loop causes a storm that hides the original problem. A systematic approach is essential.
      </Para>

      <H2>Common Ethernet Issues and Diagnostics</H2>

      <CodeBlock>{`SYMPTOM: Intermittent connectivity, high CPU on switches
  → CHECK: Broadcast storm / STP topology change
  show spanning-tree detail | grep "topology change"  (Cisco)
  watch -n1 "ip -s link show eth0 | grep -A2 RX:"   (Linux host)
  Broadcast storm: counters increase rapidly → find the loop

SYMPTOM: All traffic from one host is flooding everywhere
  → CHECK: CAM table overflow (MAC flooding attack or full table)
  show mac address-table count  (Cisco) — compare to table size
  show mac address-table | grep Total
  If full: investigate MAC flooding source port

SYMPTOM: 1G link shows "connected" but only 10Mbps throughput
  → CHECK: Duplex mismatch
  ethtool eth0 | grep -i duplex  (should show Full, not Half)
  show interface Gi0/1  (Cisco) → should show "Full-duplex, 1 Gb/s"
  Half duplex → collisions → exponential backoff → ~10% utilization

SYMPTOM: Frames received with FCS errors
  → CHECK: Physical layer issue (bad cable, bad SFP, connector)
  show interface Gi0/1 | grep CRC  (Cisco)
  ip -s link show eth0 | grep errors  (Linux)
  ethtool -S eth0 | grep -i error
  → Replace cable, clean SFP, check cable bend radius

SYMPTOM: MAC address keeps moving between ports in switch logs
  → CHECK: MAC address spoofing or physical loop
  show mac address-table | grep <flapping-mac>  (Cisco)
  Port security violation: configure port-security max 1 sticky
  If loop: check for unauthorized cable connections

SYMPTOM: Switch CPU high, traffic passing but latency very high
  → CHECK: Control plane overload
  show processes cpu sorted | head  (Cisco)
  Common culprits: Spanning Tree TCN storm, OSPF adjacency flap, broadcast storm
  → Rate-limit broadcast on access ports (storm-control broadcast level 20)`}</CodeBlock>

      <Divider />

      {/* ── Chapter 13 ── */}
      <Chapter n={13} title="Common Misconceptions" />

      <Err>
        <strong>"A switch is just a faster hub."</strong><br /><br />
        A hub operates at Layer 1 — it electrically repeats signals, with no intelligence, creating
        a shared collision domain. A switch operates at Layer 2 — it makes forwarding decisions per
        destination MAC, creates separate collision domains per port, buffers frames, and runs sophisticated
        ASIC logic. The difference isn&apos;t speed — it&apos;s architecture. Two devices connected to the same
        switch never compete for bandwidth with each other (in a non-blocking switch). Two devices on a hub
        share every bit of the hub&apos;s bandwidth, competing with CSMA/CD.
      </Err>

      <Err>
        <strong>"Switches forward frames to the destination immediately — they don&apos;t store them."</strong><br /><br />
        Store-and-forward switching (the default) receives the entire frame before forwarding.
        This allows FCS verification — corrupt frames are dropped before they propagate.
        Cut-through switching starts forwarding after reading only the destination MAC (6 bytes), but
        risks forwarding corrupt frames. Most enterprise switches use store-and-forward. In any case,
        frames ARE buffered: if the output port is busy, the frame waits in the output queue. "No storage"
        only describes cut-through in specific circumstances.
      </Err>

      <Err>
        <strong>"The CAM table stores the full routing table."</strong><br /><br />
        The CAM table (MAC address table) is a Layer 2 construct mapping MAC addresses to physical ports.
        It is built dynamically by observing source MAC addresses and has no awareness of IP addresses
        or subnets. The routing table (FIB — Forwarding Information Base) is a Layer 3 construct used by
        routers and Layer 3 switches to map IP network prefixes to next-hop routers. A Layer 2 switch
        has a CAM table but no routing table. A Layer 3 switch has both.
      </Err>

      <Err>
        <strong>"Full-duplex Ethernet is twice as fast as half-duplex."</strong><br /><br />
        Full-duplex allows simultaneous bidirectional transmission — both sides can send and receive at
        full speed at the same time. A 1 Gbps full-duplex link provides 1 Gbps in each direction = 2 Gbps
        aggregate. But the 1 Gbps "speed" you see in <Code>ethtool</Code> is the link rate, not the aggregate.
        In practice, most connections are asymmetric (web browsing sends small requests, receives large
        responses). The real benefit of full-duplex over half-duplex is eliminating collisions and CSMA/CD
        overhead — going from 30-50% effective utilization (half-duplex) to 95%+ (full-duplex).
      </Err>

      <Err>
        <strong>"MAC addresses are permanent and unique worldwide."</strong><br /><br />
        Factory-assigned MAC addresses include an OUI (vendor prefix) that is globally unique.
        The device portion (last 3 bytes) is assigned by the vendor and should be unique within their
        production. In practice: (1) MACs can be changed in software (<Code>ip link set eth0 address XX:XX:XX:XX:XX:XX</Code>).
        (2) Virtual machines use locally-administered MACs that are randomly generated. (3) Modern
        operating systems (iOS, Android, Windows 10+) use MAC address randomization for Wi-Fi scans
        to prevent tracking — your phone&apos;s MAC changes every time it probes for networks. The "globally
        unique" assumption fails in multi-tenant environments and for privacy-preserving devices.
      </Err>

      <Err>
        <strong>"A network loop always causes an immediate, obvious outage."</strong><br /><br />
        Some loops start slowly. A single low-rate broadcast in a looped network duplicates and duplicates
        until it saturates the bandwidth — but this can take seconds to minutes depending on the loop&apos;s
        characteristics. During that time, you may see intermittent connectivity issues, high latency,
        and CPU spikes on switches before the full storm hits. By the time it&apos;s obvious, all logs may
        be full of the storm&apos;s traffic rather than the original cause. Physical loop detection before
        enabling Spanning Tree is critical, and documented cable management prevents accidental loops.
      </Err>

      <Divider />

      {/* ── Chapter 14 ── */}
      <Chapter n={14} title="Test Your Understanding" />

      <IQ level="Beginner">
        <strong>Q: A switch receives a frame with destination MAC FF:FF:FF:FF:FF:FF. What does it do?</strong>
        <br /><br />
        The switch floods the frame to every port except the port it arrived on. FF:FF:FF:FF:FF:FF is the
        Ethernet broadcast address — by definition, it should reach all devices on the local network segment.
        The switch cannot do anything else: it cannot look this up in the CAM table (no specific destination
        to learn or forward to). This is correct behavior — ARP requests, DHCP discover messages, and other
        broadcast protocols rely on this flooding. It is not an error.
      </IQ>

      <IQ level="Beginner">
        <strong>Q: What is the difference between a collision domain and a broadcast domain?</strong>
        <br /><br />
        A collision domain is the set of devices that share a transmission medium — if two transmit simultaneously,
        they collide. In a hub network, all connected devices are in one collision domain. In a switched network,
        each port is a separate collision domain (full-duplex).
        A broadcast domain is the set of devices that receive a broadcast frame (FF:FF:FF:FF:FF:FF). Switches
        do NOT separate broadcast domains — a broadcast goes to every port on the switch. Routers DO separate
        broadcast domains — broadcasts do not cross Layer 3 boundaries. VLANs create separate broadcast
        domains within a switch without needing separate physical switches.
      </IQ>

      <IQ level="Intermediate">
        <strong>Q: Your iperf3 test on a 1 Gbps link achieves only 100 Mbps. ethtool shows the link is "1000 Mbps, Full Duplex". What is the most likely cause?</strong>
        <br /><br />
        Speed and duplex are correct, so CSMA/CD/duplex issues are ruled out. With full duplex at 1Gbps,
        you should achieve ~940 Mbps. At 100 Mbps (10% of link capacity), the most likely causes:
        (1) Single-stream TCP limited by window size — try <Code>iperf3 -P 4</Code> (parallel streams).
        If multiple streams achieve 940 Mbps combined, TCP window is the single-stream bottleneck.
        (2) CPU bottleneck at either end — check CPU utilization during the test. (3) Firewall or NAT
        processing in the path at the switch or host. (4) Misconfigured QoS that rate-limits to 100 Mbps.
        First step: try <Code>iperf3 -P 4</Code> and check if aggregate reaches expected throughput.
      </IQ>

      <IQ level="Intermediate">
        <strong>Q: How would you identify which physical switch port a device with IP 10.0.0.50 is connected to, starting from a router?</strong>
        <br /><br />
        Step 1: On the router, find the MAC address: <Code>show arp | grep 10.0.0.50</Code> → get MAC address XX:XX:XX:XX:XX:XX.
        Step 2: On the distribution/access switch, find the port: <Code>show mac address-table address XX:XX:XX:XX:XX:XX</Code> → returns port number (e.g., Gi0/24).
        Step 3: Verify with LLDP/CDP if the port connects to another switch: <Code>show cdp neighbors Gi0/24 detail</Code>.
        Step 4: If another switch, repeat step 2 on that switch until you reach the access port with no downstream switch.
        On Linux hosts: <Code>arp -n 10.0.0.50</Code> to get MAC, then trace through switches.
        This exact process is automated by DCIM tools and network management software.
      </IQ>

      <IQ level="Senior">
        <strong>Q: Explain why MAC flooding attacks work and how port security and dynamic ARP inspection mitigate them.</strong>
        <br /><br />
        MAC flooding: an attacker sends thousands of frames with random, fake source MAC addresses.
        Each frame causes the switch to add a new CAM table entry. When the CAM table is full
        (16,000–256,000 entries depending on switch), the switch can no longer learn new legitimate MAC addresses.
        New frames with unknown destination MACs must be flooded to all ports — the switch effectively
        behaves like a hub. The attacker captures all traffic on the network with a promiscuous NIC.
        <br /><br />
        Port security mitigation: limits the number of MAC addresses learned per port (typically max 1 or 2).
        When the limit is exceeded, the port either (a) restricts access (silently drops), (b) generates
        a violation log entry, or (c) err-disables the port. This prevents any single port from flooding
        the CAM table.
        <br /><br />
        Dynamic ARP Inspection (DAI): validates ARP packets against a DHCP snooping binding table
        (MAC-to-IP mappings learned from DHCP). An ARP reply claiming IP X has MAC Y is checked —
        if the DHCP snooping table shows IP X was assigned to MAC Z, the ARP is dropped. This prevents
        ARP poisoning (man-in-the-middle) even if the attacker is already on the network.
        <br /><br />
        Additional defense: DHCP snooping (rate-limits DHCP, prevents rogue DHCP servers), 802.1X
        port authentication (blocks all traffic until the user/device authenticates via RADIUS).
      </IQ>

      <IQ level="Senior">
        <strong>Q: What is ECMP in the context of leaf-spine switching, and what hashing algorithms are used to distribute traffic?</strong>
        <br /><br />
        ECMP (Equal-Cost Multi-Path) allows a switch to load-balance traffic across multiple equal-cost
        paths to the same destination. In leaf-spine, every leaf switch has multiple equal-cost paths
        to every other leaf (through each spine switch). Without ECMP, only one path would be used and
        the others would be blocked by STP. With ECMP, all spine links carry traffic simultaneously.
        <br /><br />
        Hashing: per-packet ECMP would reorder packets, breaking TCP. Therefore, ECMP uses per-flow
        hashing — all packets in the same flow take the same path. A 5-tuple hash is standard:
        (source IP, destination IP, source port, destination port, protocol). All packets with the same
        5-tuple hash to the same spine switch → no reordering.
        <br /><br />
        Problem: "elephant flows" (large, long-lived TCP flows like database backups) can hash to one spine
        while "mouse flows" (short, small) hash across all spines — creating imbalance. Solutions:
        (1) Fine-grained load balancing (hash on more fields including VXLAN VNI for overlays).
        (2) Adaptive ECMP (measure utilization and re-hash overloaded flows — Cisco Nexus, Arista).
        (3) Application-layer connection splitting (multiple TCP connections → multiple hash buckets).
        (4) MLAG (Multi-chassis LAG) to present multiple physical switches as one logical switch — forces
        per-packet distribution within a bonded port.
      </IQ>

      <IQ level="PhD">
        <strong>Q: Analyze the fundamental tradeoffs between store-and-forward, cut-through, and virtual output queuing (VOQ) in high-speed switches, and explain when head-of-line blocking becomes a system-level bottleneck.</strong>
        <br /><br />
        Store-and-forward requires receiving the complete frame before forwarding. Latency = frame
        transmission time = 12 μs for 1500B at 1G, 1.2 μs at 10G, 0.12 μs at 100G. At 100G+,
        serialization latency is negligible compared to processing time; store-and-forward costs
        little and provides CRC validation. At 10G, it matters for real-time applications.
        <br /><br />
        Cut-through latency is proportional to clock cycles, not frame size — typically 0.5-1 μs
        regardless of frame size. At 10G+, cut-through saves 1-10 μs per hop × 5 hops = 5-50 μs
        saved per flow. For HFT (microsecond-sensitive), this matters.
        <br /><br />
        Head-of-line (HOL) blocking: in a shared-output-queue architecture, if the output port for
        flow A is busy, frames for flow A queue behind flow B even if B&apos;s output port is idle.
        Flow B is blocked by A&apos;s congestion — this is HOL blocking. It reduces throughput to ~58%
        of line rate in worst-case random traffic (Karol, Hluchyj, Morgan theorem, 1987).
        <br /><br />
        Virtual Output Queuing (VOQ) solves HOL blocking: each input port maintains a separate queue
        for each output port. When output port X is busy, only frames destined for X are queued —
        frames for idle output ports proceed immediately. VOQ enables throughput approaching 100% of
        line rate but requires N² queues (N input ports × N output ports) — for a 256-port switch,
        65,536 queues. Memory and scheduling complexity scale as O(N²).
        <br /><br />
        Practical implementation: high-performance switches (Broadcom Tomahawk, Tofino) use combined
        VOQ + output queuing with iSLIP or SERENA schedulers that achieve near-100% throughput in
        O(N log N) time. The VOQ approach is also why modern cloud switches use programmable ASICs
        (P4-based) — the scheduler algorithm can be updated in the field without new silicon.
      </IQ>

      <Divider />

      <KeyTakeaways items={[
        'Ethernet was invented in 1973 at Xerox PARC and standardized by IEEE as 802.3 in 1983. The frame format has remained the same while speeds scaled 80,000×.',
        'An Ethernet frame: Preamble(8B) + Dst MAC(6B) + Src MAC(6B) + EtherType(2B) + Payload(46-1500B) + FCS(4B). Minimum frame 64 bytes (CSMA/CD requirement).',
        'Hubs share one collision domain — all devices compete via CSMA/CD. Switches give each port a dedicated collision domain — no competition, full throughput.',
        'The CAM table maps MAC addresses to ports. Learn from source MAC, forward by destination MAC. Unknown destination → flood. FF:FF:FF:FF:FF:FF → always flood.',
        'Full-duplex eliminates collisions and CSMA/CD. Each link can transmit and receive simultaneously at full speed. Required for Gigabit and above.',
        'Auto-negotiation failure causes duplex mismatch: one end full-duplex, other half-duplex. Result: half-duplex side sees collisions → retransmission storms → 10% effective throughput on a 1G link.',
        'LLDP (IEEE 802.1AB) provides one-hop device discovery — switch port inventory, PoE negotiation, voice VLAN assignment. CDP is Cisco\'s proprietary equivalent.',
        'MAC flooding fills the CAM table, forcing the switch to flood all unknown unicast traffic (behaving like a hub). Port security limits MACs per port.',
        'Leaf-spine architecture: every leaf connects to every spine. All server-to-server traffic is exactly 2 hops. ECMP distributes flows across all spine links via 5-tuple hashing.',
        'Store-and-forward verifies FCS before forwarding (drops corrupt frames). Cut-through reads 6-byte destination then immediately forwards (lower latency, may forward corrupt frames).',
      ]} />
    </LearnLayout>
  )
}
