'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

/* ── helper components ─────────────────────────────────────────────── */
const G = '#10b981'

const Chapter = ({ n, title }: { n: number; title: string }) => (
  <div style={{ marginBottom: 32 }}>
    <p style={{ fontSize: 11, color: G, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 6px', letterSpacing: '.12em', textTransform: 'uppercase' }}>
      Chapter {String(n).padStart(2, '0')}
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
  <div style={{ background: 'linear-gradient(135deg,#0f2027,#203a43,#2c5364)', border: `1px solid ${G}30`, borderRadius: 12, padding: '20px 24px', margin: '28px 0', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 12, right: 16, fontSize: 22, opacity: 0.18 }}>📖</div>
    <p style={{ fontSize: 11, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.12em', margin: '0 0 10px' }}>Story</p>
    <div style={{ fontSize: 14, color: '#d1fae5', lineHeight: 1.9 }}>{children}</div>
  </div>
)

const WowBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'linear-gradient(135deg,#1c1917,#292524)', border: '1px solid #f59e0b30', borderRadius: 12, padding: '20px 24px', margin: '28px 0', position: 'relative' }}>
    <div style={{ position: 'absolute', top: 12, right: 16, fontSize: 22, opacity: 0.25 }}>⚡</div>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.12em', margin: '0 0 10px' }}>Wow Factor</p>
    <div style={{ fontSize: 14, color: '#fef3c7', lineHeight: 1.9 }}>{children}</div>
  </div>
)

const Warn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: '#f59e0b08', border: '1px solid #f59e0b35', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Caution — {title}</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

const Err = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: '#ef444408', border: '1px solid #ef444430', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Misconception — {title}</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

const LEVEL_COLORS: Record<string, string> = {
  Beginner: '#10b981',
  Intermediate: '#3b82f6',
  Senior: '#8b5cf6',
  PhD: '#f97316',
}

const IQ = ({ q, level, children }: { q: string; level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 0 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: '#000', background: LEVEL_COLORS[level], padding: '2px 9px', borderRadius: 20, letterSpacing: '.06em', textTransform: 'uppercase', flexShrink: 0 }}>{level}</span>
      <div style={{ background: `${LEVEL_COLORS[level]}12`, border: `1px solid ${LEVEL_COLORS[level]}30`, borderRadius: '0 8px 0 0', padding: '12px 16px', fontSize: 14, fontWeight: 700, color: 'var(--text)', flex: 1 }}>Q: {q}</div>
    </div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '16px 18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)

/* ── interactive components ────────────────────────────────────────── */

const VLANS = [
  { id: 10, name: 'ENGINEERING', color: '#3b82f6', subnet: '10.10.10.0/24', gw: '10.10.10.1', hosts: ['eng-ws-01 (10.10.10.100)', 'eng-ws-02 (10.10.10.101)', 'build-server (10.10.10.200)'] },
  { id: 20, name: 'SALES',       color: '#f59e0b', subnet: '10.10.20.0/24', gw: '10.10.20.1', hosts: ['sales-laptop-01 (10.10.20.50)', 'sales-laptop-02 (10.10.20.51)', 'crm-terminal (10.10.20.60)'] },
  { id: 30, name: 'SERVERS',     color: '#8b5cf6', subnet: '10.10.30.0/24', gw: '10.10.30.1', hosts: ['web-01 (10.10.30.10)', 'db-primary (10.10.30.20)', 'db-replica (10.10.30.21)'] },
  { id: 99, name: 'MGMT',        color: '#ef4444', subnet: '10.10.99.0/24', gw: '10.10.99.1', hosts: ['sw-core (10.10.99.2)', 'sw-dist-01 (10.10.99.3)', 'oob-console (10.10.99.254)'] },
]

function VlanSegmentationLab() {
  const [selectedVlan, setSelectedVlan] = useState<number | null>(null)
  const [srcVlan, setSrcVlan] = useState(10)
  const [dstVlan, setDstVlan] = useState(30)
  const [analyzed, setAnalyzed] = useState(false)

  const src = VLANS.find(v => v.id === srcVlan)!
  const dst = VLANS.find(v => v.id === dstVlan)!
  const sameVlan = srcVlan === dstVlan
  const selected = VLANS.find(v => v.id === selectedVlan)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Interactive — VLAN Segmentation Lab</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Click a VLAN to inspect it, or use the traffic simulator below.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 20 }}>
        {VLANS.map(v => (
          <div key={v.id} onClick={() => setSelectedVlan(selectedVlan === v.id ? null : v.id)}
            style={{ background: selectedVlan === v.id ? `${v.color}15` : 'var(--bg)', border: `2px solid ${selectedVlan === v.id ? v.color : 'var(--border)'}`, borderRadius: 10, padding: 14, cursor: 'pointer', transition: 'all .15s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <code style={{ fontSize: 12, background: `${v.color}20`, color: v.color, padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>VLAN {v.id}</code>
              <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{v.subnet}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{v.name}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>GW: {v.gw}</div>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ background: `${selected.color}08`, border: `1px solid ${selected.color}30`, borderRadius: 10, padding: 16, marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: selected.color, margin: '0 0 10px' }}>VLAN {selected.id} — {selected.name} — Hosts:</p>
          {selected.hosts.map(h => (
            <div key={h} style={{ fontSize: 13, color: 'var(--text)', padding: '4px 0', borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-mono)' }}>{h}</div>
          ))}
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '10px 0 0' }}>
            SVI gateway: <strong style={{ color: selected.color }}>{selected.gw}</strong> on the Layer 3 switch. All hosts in this subnet use this IP as their default gateway. Broadcast domain is confined to this VLAN — no other VLAN sees these ARP broadcasts.
          </p>
        </div>
      )}

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 18 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', margin: '0 0 12px' }}>Traffic Path Simulator</p>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
          <select value={srcVlan} onChange={e => { setSrcVlan(Number(e.target.value)); setAnalyzed(false) }}
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 10px', color: 'var(--text)', fontSize: 13 }}>
            {VLANS.map(v => <option key={v.id} value={v.id}>VLAN {v.id} — {v.name}</option>)}
          </select>
          <span style={{ color: 'var(--muted)' }}>→</span>
          <select value={dstVlan} onChange={e => { setDstVlan(Number(e.target.value)); setAnalyzed(false) }}
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 10px', color: 'var(--text)', fontSize: 13 }}>
            {VLANS.map(v => <option key={v.id} value={v.id}>VLAN {v.id} — {v.name}</option>)}
          </select>
          <button onClick={() => setAnalyzed(true)} style={{ background: G, color: '#000', border: 'none', borderRadius: 6, padding: '7px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Analyze</button>
        </div>
        {analyzed && (
          <div style={{ background: sameVlan ? `${G}08` : '#f59e0b08', border: `1px solid ${sameVlan ? G : '#f59e0b'}30`, borderRadius: 8, padding: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: sameVlan ? G : '#f59e0b', margin: '0 0 8px' }}>
              {sameVlan ? '✓ Same VLAN — Layer 2 switching only' : '⚡ Different VLANs — Layer 3 routing required'}
            </p>
            <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>
              {sameVlan
                ? `Frame stays in VLAN ${srcVlan}. Switch uses MAC table. No router involved. Broadcasts stay within ${src.subnet}.`
                : `Traffic from ${src.subnet} → ${dst.subnet} is sent to the SVI gateway (${src.gw}), routed by the L3 switch using the FIB, then forwarded to VLAN ${dstVlan}'s SVI (${dst.gw}). A firewall policy can inspect or drop this traffic. In a flat network, ${src.name} could reach ${dst.name} directly — no security control possible.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const DOT1Q_FIELDS = [
  { name: 'Dst MAC', bytes: 6, color: '#3b82f6', desc: 'Destination MAC address (unchanged by VLAN tagging)' },
  { name: 'Src MAC', bytes: 6, color: '#8b5cf6', desc: 'Source MAC address (unchanged by VLAN tagging)' },
  { name: 'TPID', bytes: 2, color: '#f59e0b', desc: '0x8100 — Tag Protocol Identifier, signals 802.1Q frame' },
  { name: 'TCI', bytes: 2, color: '#ef4444', desc: 'Tag Control Info: 3-bit PCP (QoS) + 1-bit DEI + 12-bit VLAN ID' },
  { name: 'EtherType', bytes: 2, color: '#10b981', desc: '0x0800=IPv4 / 0x86DD=IPv6 / 0x0806=ARP' },
  { name: 'Payload', bytes: 8, color: '#6b7280', desc: 'IP packet or other L3 payload (46–1500 bytes)' },
  { name: 'FCS', bytes: 4, color: '#374151', desc: '32-bit CRC frame check sequence' },
]

const TCI_BITS = [
  { label: 'PCP', bits: 3, color: '#f59e0b', desc: 'Priority Code Point — 0-7 QoS class (7=highest)' },
  { label: 'DEI', bits: 1, color: '#ef4444', desc: 'Drop Eligible Indicator — frame may be dropped under congestion' },
  { label: 'VID', bits: 12, color: '#10b981', desc: 'VLAN ID — 12 bits → 0 to 4095 (0 and 4095 reserved → 4094 usable VLANs)' },
]

function Dot1QFrameInspector() {
  const [selected, setSelected] = useState<number | null>(null)
  const [tciSelected, setTciSelected] = useState<number | null>(null)
  const [vlanId, setVlanId] = useState(10)
  const [pcp, setPcp] = useState(0)

  const field = selected !== null ? DOT1Q_FIELDS[selected] : null
  const tciField = tciSelected !== null ? TCI_BITS[tciSelected] : null

  const totalBytes = DOT1Q_FIELDS.reduce((a, f) => a + f.bytes, 0)

  const tciHex = () => {
    const word = (pcp << 13) | (0 << 12) | (vlanId & 0xFFF)
    return '0x' + word.toString(16).toUpperCase().padStart(4, '0')
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Interactive — 802.1Q Frame Inspector</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Click any field to inspect it. Configure VID and PCP below.</p>

      <div style={{ display: 'flex', gap: 2, marginBottom: 10, flexWrap: 'wrap' }}>
        {DOT1Q_FIELDS.map((f, i) => (
          <div key={i} onClick={() => { setSelected(selected === i ? null : i); setTciSelected(null) }}
            style={{ background: selected === i ? f.color : `${f.color}25`, border: `2px solid ${selected === i ? f.color : 'transparent'}`, borderRadius: 6, padding: '6px 0', textAlign: 'center', cursor: 'pointer', flex: f.bytes, minWidth: 36, transition: 'all .15s' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: selected === i ? '#fff' : f.color, fontFamily: 'var(--font-mono)' }}>{f.name}</div>
            <div style={{ fontSize: 9, color: selected === i ? '#ffffffb0' : 'var(--muted)' }}>{f.bytes}B</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: 'var(--muted)', margin: '0 0 16px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>Total frame overhead with 802.1Q tag: {totalBytes} bytes (4 bytes added vs. untagged)</p>

      {field && (
        <div style={{ background: `${field.color}10`, border: `1px solid ${field.color}30`, borderRadius: 8, padding: 14, marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: field.color, margin: '0 0 6px' }}>{field.name} — {field.bytes} byte{field.bytes !== 1 ? 's' : ''}</p>
          <p style={{ fontSize: 13, color: 'var(--text)', margin: 0 }}>{field.desc}</p>
        </div>
      )}

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginBottom: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', margin: '0 0 12px' }}>TCI Field Breakdown (16 bits)</p>
        <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
          {TCI_BITS.map((b, i) => (
            <div key={i} onClick={() => { setTciSelected(tciSelected === i ? null : i); setSelected(null) }}
              style={{ background: tciSelected === i ? b.color : `${b.color}20`, border: `2px solid ${tciSelected === i ? b.color : 'transparent'}`, borderRadius: 6, padding: '8px 4px', textAlign: 'center', cursor: 'pointer', flex: b.bits, transition: 'all .15s' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: tciSelected === i ? '#fff' : b.color }}>{b.label}</div>
              <div style={{ fontSize: 9, color: tciSelected === i ? '#ffffffb0' : 'var(--muted)' }}>{b.bits}b</div>
            </div>
          ))}
        </div>
        {tciField && (
          <div style={{ background: `${tciField.color}10`, border: `1px solid ${tciField.color}30`, borderRadius: 8, padding: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: tciField.color, margin: '0 0 4px' }}>{tciField.label} — {tciField.bits} bit{tciField.bits !== 1 ? 's' : ''}</p>
            <p style={{ fontSize: 13, color: 'var(--text)', margin: 0 }}>{tciField.desc}</p>
          </div>
        )}
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', margin: '0 0 12px' }}>Build Your TCI</p>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>VLAN ID (0–4094)</label>
            <input type="number" min={0} max={4094} value={vlanId} onChange={e => setVlanId(Number(e.target.value))}
              style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 10px', color: G, fontSize: 14, width: 90, fontFamily: 'var(--font-mono)' }} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>PCP (0–7)</label>
            <input type="number" min={0} max={7} value={pcp} onChange={e => setPcp(Number(e.target.value))}
              style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 10px', color: '#f59e0b', fontSize: 14, width: 70, fontFamily: 'var(--font-mono)' }} />
          </div>
          <div style={{ background: `${G}12`, border: `1px solid ${G}30`, borderRadius: 8, padding: '10px 16px' }}>
            <p style={{ fontSize: 11, color: 'var(--muted)', margin: '0 0 2px' }}>TCI hex value</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: 0 }}>{tciHex()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

type AttackPhase = 'idle' | 'reconnaissance' | 'attack' | 'success' | 'defense'

const ATTACK_PHASES: { phase: AttackPhase; label: string; color: string; detail: string }[] = [
  { phase: 'reconnaissance', label: '1. Reconnaissance', color: '#f59e0b', detail: 'Attacker on VLAN 10 (Engineering) discovers that native VLAN is VLAN 1. Their port is an access port in VLAN 10, but trunk links use untagged native VLAN 1.' },
  { phase: 'attack', label: '2. Double-Tag Attack', color: '#ef4444', detail: 'Attacker crafts a frame with TWO 802.1Q tags: outer tag = VLAN 1 (native), inner tag = VLAN 30 (Servers). The frame looks like a native-VLAN frame from the attacker\'s perspective.' },
  { phase: 'success', label: '3. Frame Hops VLANs', color: '#dc2626', detail: 'Switch A strips the outer (native) tag and forwards the frame to Switch B as a trunk frame with VID=30 (inner tag). Switch B sees VLAN 30 and delivers it to the Servers VLAN — a security violation.' },
  { phase: 'defense', label: '4. Mitigation', color: G, detail: 'Fix: change native VLAN from 1 to an unused VLAN (e.g., 999). Configure "vlan dot1q tag native" on trunk ports to tag all traffic including the native VLAN. Set all edge ports to "switchport mode access" to disable DTP.' },
]

function VlanHoppingDemo() {
  const [phase, setPhase] = useState<AttackPhase>('idle')

  const current = ATTACK_PHASES.find(p => p.phase === phase)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Interactive — VLAN Hopping Attack Demo</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Step through a double-tagging VLAN hopping attack and its defense.</p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {ATTACK_PHASES.map(p => (
          <button key={p.phase} onClick={() => setPhase(p.phase)}
            style={{ background: phase === p.phase ? p.color : `${p.color}15`, color: phase === p.phase ? '#fff' : p.color, border: `1px solid ${p.color}40`, borderRadius: 8, padding: '8px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all .15s' }}>
            {p.label}
          </button>
        ))}
      </div>

      {phase === 'idle' && (
        <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--muted)', fontSize: 14 }}>
          Select a phase above to walk through the attack.
        </div>
      )}

      {current && (
        <div style={{ background: `${current.color}10`, border: `1px solid ${current.color}30`, borderRadius: 10, padding: 18 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: current.color, margin: '0 0 10px' }}>{current.label}</p>
          <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.9, margin: 0 }}>{current.detail}</p>
        </div>
      )}

      {phase === 'attack' && (
        <div style={{ marginTop: 16, background: '#0a0a0a', borderRadius: 8, padding: 14, fontFamily: 'var(--font-mono)', fontSize: 12, color: '#e5e7eb' }}>
          <div style={{ color: '#6b7280', marginBottom: 4 }}># Attacker-crafted frame structure</div>
          <div style={{ color: '#f59e0b' }}>[ Dst MAC ][ Src MAC ]</div>
          <div style={{ color: '#ef4444' }}>[ TPID=0x8100 ][ TCI: VID=1  (outer / native tag) ]</div>
          <div style={{ color: '#ef4444' }}>[ TPID=0x8100 ][ TCI: VID=30 (inner / target tag)  ]</div>
          <div style={{ color: '#94a3b8' }}>[ EtherType ][ IP Payload ][ FCS ]</div>
        </div>
      )}

      {phase === 'defense' && (
        <div style={{ marginTop: 16, background: '#0a0a0a', borderRadius: 8, padding: 14, fontFamily: 'var(--font-mono)', fontSize: 12, color: '#e5e7eb' }}>
          <div style={{ color: '#6b7280' }}># Cisco IOS mitigation commands</div>
          <div style={{ color: '#10b981' }}>vlan 999</div>
          <div style={{ color: '#10b981' }}> name UNUSED_NATIVE</div>
          <div style={{ color: '#6b7280' }}>#</div>
          <div style={{ color: '#10b981' }}>interface GigabitEthernet0/1</div>
          <div style={{ color: '#10b981' }}> switchport trunk native vlan 999</div>
          <div style={{ color: '#10b981' }}> switchport trunk allowed vlan 10,20,30,99</div>
          <div style={{ color: '#6b7280' }}>#</div>
          <div style={{ color: '#10b981' }}>vlan dot1q tag native    ! tag native VLAN frames explicitly</div>
        </div>
      )}
    </div>
  )
}

/* ── main module ───────────────────────────────────────────────────── */

export default function VLANsModule() {
  return (
    <LearnLayout
      title="VLANs — Virtual Network Segmentation"
      description="VLANs let you carve one physical switch fabric into multiple isolated broadcast domains. The foundation of every secure, scalable enterprise network — from the office to hyperscale data centers."
      section="Networking Fundamentals — Module 10"
      readTime="22–30 min"
      updatedAt="May 2026"
    >
      {/* ── Chapter 1 ── */}
      <Chapter n={1} title="The Flat Network Catastrophe" />

      <StoryBox>
        It is 1998. A hospital in Ohio has 400 devices on a single Ethernet segment — workstations, medical imaging machines, printers, nurses' stations. One Monday morning, someone plugs in a misconfigured PC that starts flooding the network with broadcast packets. Within three minutes, every device on the floor stops responding. Monitors flatline — not patients, but the network monitors. Clinicians cannot access patient records. The culprit? A flat network with a single broadcast domain. Every device had to process every broadcast from every other device. The whole fabric choked. The fix took weeks of physical rewiring. A year later, IEEE 802.1Q was finalized. VLANs were born out of necessity.
      </StoryBox>

      <Para>
        In the early days of Ethernet, every device on a LAN shared the same <Accent>broadcast domain</Accent>. Every ARP request, every DHCP discover, every NetBIOS name resolution — every single one of these frames was sent to every device on the network simultaneously. With 20 computers this was tolerable. With 400 devices, broadcasts consumed significant bandwidth and CPU cycles on every endpoint. With 1,000 devices, network-wide broadcast storms could render the entire segment unusable.
      </Para>

      <Para>
        The deeper problem was security. A flat network gives every device direct Layer 2 access to every other device. The accounting server sits on the same broadcast domain as the receptionist's PC. The hospital's imaging machines share a network with the administrative desktops. There is no boundary, no checkpoint. Anyone who can physically plug into any switch port can reach anything.
      </Para>

      <Para>
        The traditional solution was physical segmentation: buy more routers, run more cabling, create separate physical networks for each department. Finance gets its own switch and router interface, Engineering gets another, Servers get a third. This worked but was brutally expensive, inflexible (moving a desk meant rewiring), and required significant capital expenditure for each new segment.
      </Para>

      <H2>The Virtual Solution</H2>

      <Para>
        IEEE 802.1Q (1998) defined a standard for <Accent>Virtual LANs</Accent> — logical broadcast domains that are independent of physical topology. A VLAN is software-defined: the switch administrator assigns each port to a VLAN ID, and the switch enforces isolation between VLANs in hardware. One physical switch can simultaneously carry dozens of isolated VLANs. Hosts in the same room can be in different VLANs (isolated from each other), while hosts in different buildings can be in the same VLAN (as if directly connected).
      </Para>

      <WowBox>
        The 12-bit VLAN ID field in 802.1Q theoretically supports 4,096 unique VLANs per physical domain (IDs 0 and 4095 are reserved, leaving 4,094 usable). But modern hyperscale data centers using VXLAN (Virtual Extensible LAN) extend this to 16 million unique segments using 24-bit VNI (VXLAN Network Identifier) — a 4,000× expansion needed to support multi-tenant cloud environments.
      </WowBox>

      <Para>
        The only way traffic can cross VLAN boundaries is through a <Accent>Layer 3 device</Accent> — a router or a Layer 3 switch. This creates a natural security enforcement point: all inter-segment traffic must pass through a router or firewall, where access control lists (ACLs) or firewall policies can inspect, permit, or deny every flow. VLANs transform security from "physical location" to "software-defined policy."
      </Para>

      <VlanSegmentationLab />

      <Divider />

      {/* ── Chapter 2 ── */}
      <Chapter n={2} title="802.1Q Tagging: How Frames Carry VLAN Identity" />

      <StoryBox>
        Imagine a warehouse with conveyor belts — all running to the same sorting area. Without labeling, packages get mixed up. The 802.1Q standard solves the same problem for Ethernet frames: it adds a 4-byte label (tag) to each frame as it enters a trunk port, so every switch along the path knows which "conveyor belt" (VLAN) a frame belongs to. When the frame reaches its destination port, the tag is stripped before delivery — the end device never even knows VLANs exist.
      </StoryBox>

      <H2>Access Ports vs. Trunk Ports</H2>

      <Para>
        Switch ports operate in two fundamental modes. An <Accent>access port</Accent> belongs to exactly one VLAN. Frames arriving on an access port are untagged — the end device (PC, printer, IP phone, server) has no knowledge of VLANs. The switch silently assigns all incoming frames to the configured VLAN and strips any VLAN tag when forwarding out to the end device.
      </Para>

      <Para>
        A <Accent>trunk port</Accent> carries traffic from multiple VLANs simultaneously. Trunk ports are used to interconnect switches, connect to routers for inter-VLAN routing, and connect to hypervisors that host VMs in different VLANs. Frames on trunk ports carry an 802.1Q tag identifying which VLAN they belong to. The administrator configures an "allowed VLAN list" on each trunk — VLANs not in this list are pruned (blocked) from the trunk.
      </Para>

      <H2>The 802.1Q Tag Structure</H2>

      <Para>
        The 802.1Q standard inserts a <Accent>4-byte tag</Accent> into the Ethernet frame header, inserted between the source MAC address and the original EtherType field. This makes 802.1Q-tagged frames slightly larger than standard Ethernet frames (1522 bytes max vs. 1518 bytes). The tag contains four fields:
      </Para>

      <Para>
        <Accent>TPID (Tag Protocol Identifier)</Accent> — 2 bytes, always 0x8100. This identifies the frame as 802.1Q tagged. Devices that don't understand VLANs see 0x8100 as an unknown EtherType and may drop the frame — this is intentional.
      </Para>

      <Para>
        <Accent>TCI (Tag Control Information)</Accent> — 2 bytes comprising three sub-fields: 3-bit PCP (Priority Code Point, 0–7 for 802.1p QoS marking), 1-bit DEI (Drop Eligible Indicator, frames may be discarded under congestion), and 12-bit <Accent>VID (VLAN Identifier)</Accent> ranging from 0 to 4095.
      </Para>

      <Dot1QFrameInspector />

      <H2>The Native VLAN</H2>

      <Para>
        On a trunk port, one VLAN is designated the <Accent>native VLAN</Accent>. Frames from the native VLAN are sent <em>untagged</em> across the trunk (for backward compatibility with older untagged equipment). Untagged frames received on a trunk port are assigned to the native VLAN. By default on Cisco equipment, VLAN 1 is the native VLAN.
      </Para>

      <Warn title="Native VLAN mismatch">
        If the native VLAN differs between two ends of a trunk link (e.g., VLAN 1 on Switch A, VLAN 10 on Switch B), untagged frames will be misassigned — frames intended for VLAN 1 will be delivered to VLAN 10. Spanning Tree Protocol may also malfunction. Always verify native VLAN matches on both ends of every trunk link. Use <Code>show interfaces trunk</Code> on Cisco to audit.
      </Warn>

      <CodeBlock>
{`# Cisco IOS — configure access port in VLAN 10
interface GigabitEthernet0/1
  description PC-Engineering-Floor-1
  switchport mode access
  switchport access vlan 10
  spanning-tree portfast

# Cisco IOS — configure trunk port between switches
interface GigabitEthernet0/24
  description Trunk-to-SW-DIST-01
  switchport mode trunk
  switchport trunk encapsulation dot1q
  switchport trunk native vlan 999
  switchport trunk allowed vlan 10,20,30,99`}
      </CodeBlock>

      <H2>Dynamic Trunking Protocol (DTP)</H2>

      <Para>
        Cisco's proprietary <Accent>DTP</Accent> automatically negotiates trunk formation between switches. A port in "dynamic desirable" mode will actively try to form a trunk; "dynamic auto" will form a trunk if the other end initiates. While convenient in small labs, DTP is a security risk in production: an attacker can plug in a device that sends DTP frames, causing the switch port to trunk up, potentially exposing all VLANs.
      </Para>

      <Para>
        Best practice: explicitly set every port to either <Code>switchport mode access</Code> or <Code>switchport mode trunk</Code>, and disable DTP negotiation on trunk ports with <Code>switchport nonegotiate</Code>. Never rely on auto-negotiation for security-sensitive switch ports.
      </Para>

      <Divider />

      {/* ── Chapter 3 ── */}
      <Chapter n={3} title="Inter-VLAN Routing: Crossing Broadcast Domains" />

      <StoryBox>
        Your VLAN architecture is perfect — Engineering can't reach Finance, Finance can't reach Servers. But then an Engineering developer needs to access the database server in the Servers VLAN. How? VLANs are Layer 2 isolation; crossing them requires Layer 3. This is where routers and Layer 3 switches enter the picture.
      </StoryBox>

      <H2>Router-on-a-Stick</H2>

      <Para>
        The classic method uses a single router physical interface connected to a trunk port. The router creates logical <Accent>sub-interfaces</Accent>, each encapsulating a different VLAN tag and configured with the gateway IP for that VLAN. All inter-VLAN traffic must exit the switch, travel up to the router's single uplink, get routed, and return on the same trunk link.
      </Para>

      <CodeBlock>
{`# Cisco IOS — router-on-a-stick configuration
interface GigabitEthernet0/0.10
  encapsulation dot1q 10
  ip address 10.10.10.1 255.255.255.0

interface GigabitEthernet0/0.20
  encapsulation dot1q 20
  ip address 10.10.20.1 255.255.255.0

interface GigabitEthernet0/0.30
  encapsulation dot1q 30
  ip address 10.10.30.1 255.255.255.0`}
      </CodeBlock>

      <Para>
        Router-on-a-stick works well for small networks and labs. The limitation is bandwidth: all inter-VLAN traffic shares the single uplink's capacity. If the link is 1 Gbps and you have Engineering at 200 Mbps, Sales at 150 Mbps, and Servers at 400 Mbps all simultaneously doing inter-VLAN transfers, you've already saturated the uplink.
      </Para>

      <H2>Layer 3 Switches and SVIs</H2>

      <Para>
        Modern enterprise networks use <Accent>Layer 3 switches</Accent> for inter-VLAN routing. A <Accent>Switched Virtual Interface (SVI)</Accent> is a logical Layer 3 interface for each VLAN on the switch itself. Each SVI has an IP address that serves as the default gateway for that VLAN. Routing between SVIs happens in the switch's <Accent>hardware ASICs</Accent> using the FIB (Forwarding Information Base), at line rate.
      </Para>

      <Para>
        The performance difference is dramatic. Router-on-a-stick with software routing: ~50 µs per-packet latency. Layer 3 switch ASIC routing: ~1–3 µs. A Cisco Catalyst 9300 can route 200+ million packets per second across SVIs in hardware — orders of magnitude beyond what any router can achieve on the same budget.
      </Para>

      <CodeBlock>
{`# Cisco IOS — Layer 3 switch with SVIs
ip routing

interface Vlan10
  description Engineering Gateway
  ip address 10.10.10.1 255.255.255.0
  no shutdown

interface Vlan20
  description Sales Gateway
  ip address 10.10.20.1 255.255.255.0
  no shutdown

interface Vlan30
  description Servers Gateway
  ip address 10.10.30.1 255.255.255.0
  no shutdown

interface Vlan99
  description Management Gateway
  ip address 10.10.99.1 255.255.255.0
  no shutdown`}
      </CodeBlock>

      <H2>CEF and the Hardware Fast Path</H2>

      <Para>
        Cisco's <Accent>CEF (Cisco Express Forwarding)</Accent> pre-builds a hardware FIB from the software routing table. After the first packet of a new flow is processed in software (the "process switching" path), CEF installs a flow entry and subsequent packets are switched entirely in hardware without CPU involvement. This is called <Accent>fast-path</Accent> or <Accent>hardware switching</Accent>.
      </Para>

      <Para>
        Modern switch ASICs go further: ternary content-addressable memory (TCAM) allows parallel lookups across all FIB entries in a single clock cycle, regardless of table size. A 100,000-entry routing table and a 10-entry routing table have identical lookup latency in TCAM hardware.
      </Para>

      <Divider />

      {/* ── Chapter 4 ── */}
      <Chapter n={4} title="VTP, Private VLANs, and Advanced Segmentation" />

      <H2>VLAN Trunking Protocol (VTP)</H2>

      <StoryBox>
        You manage 50 switches across a campus. You need to add VLAN 50 for a new department. Without VTP, you SSH into each of 50 switches and type the same VLAN commands. With VTP, you add it once on the Server switch and it propagates automatically. Sounds perfect — until someone brings in a switch from another site with a higher VTP revision number. Within seconds, that switch's VLAN database overwrites yours across every switch in the campus, deleting every VLAN. Everything goes dark.
      </StoryBox>

      <Para>
        Cisco's proprietary <Accent>VTP</Accent> synchronizes VLAN databases across all switches in a VTP domain. The VTP Server holds the authoritative VLAN database; Client switches receive updates and propagate them. The revision number determines precedence — the switch with the highest revision wins.
      </Para>

      <Para>
        The danger: any switch can be brought in from another deployment, lab environment, or storage with a higher revision number. Plugging it in propagates its (possibly empty or outdated) VLAN database to the entire campus instantly, dropping all active VLANs and crashing the network. This has caused production outages at Fortune 500 companies.
      </Para>

      <Warn title="VTP Server mode in production">
        Most experienced network engineers configure all switches to <Code>vtp mode transparent</Code> (propagates VTP frames without acting on them) or use VTP version 3 with a primary server requiring explicit promotion before changes propagate. The convenience of VTP Server mode rarely justifies the risk of an accidental database wipe.
      </Warn>

      <H2>Private VLANs (PVLANs)</H2>

      <Para>
        Private VLANs (IEEE 802.1Q-2003 extension) add isolation <em>within</em> a VLAN. Used primarily in hosting environments where multiple customers share a VLAN but must be isolated from each other. The PVLAN structure uses a primary VLAN containing secondary VLANs:
      </Para>

      <Para>
        <Accent>Promiscuous port</Accent> — can communicate with all ports in all secondary VLANs. Typically the uplink to the router or gateway.
      </Para>

      <Para>
        <Accent>Isolated port</Accent> — can only communicate with the promiscuous port. Two isolated ports in the same PVLAN cannot reach each other directly.
      </Para>

      <Para>
        <Accent>Community port</Accent> — can communicate with other ports in the same community and with the promiscuous port, but not with isolated ports or other communities.
      </Para>

      <Para>
        A typical web hosting scenario: all customer web servers are in an isolated secondary VLAN, sharing one IP subnet (e.g., 192.168.1.0/24). They can all reach the gateway (promiscuous port) for internet access, but they cannot reach each other directly — even though they share the same subnet. This prevents one compromised server from attacking others via Layer 2 techniques.
      </Para>

      <H2>QinQ (IEEE 802.1ad)</H2>

      <Para>
        <Accent>QinQ</Accent> stacks two 802.1Q tags in a single frame: an outer <Accent>S-Tag</Accent> (Service VLAN, 0x88a8) and an inner <Accent>C-Tag</Accent> (Customer VLAN, 0x8100). Service providers use QinQ to transparently carry customer VLANs across a provider backbone.
      </Para>

      <Para>
        The math: 4,094 usable S-Tags × 4,094 usable C-Tags ≈ 16.7 million unique combinations. This effectively eliminates VLAN ID conflicts between customers — each customer can use VLAN IDs 1–4094 internally without interfering with other customers using the same IDs. The provider's backbone only sees the S-Tag; the C-Tag is opaque.
      </Para>

      <H2>VXLAN — VLANs at Cloud Scale</H2>

      <Para>
        Enterprise VLANs max out at 4,094 segments. AWS, Azure, and Google Cloud run millions of isolated tenant networks simultaneously — 4,094 VLANs is laughably insufficient. <Accent>VXLAN (Virtual Extensible LAN, RFC 7348)</Accent> solves this by encapsulating Layer 2 Ethernet frames inside UDP packets. The VXLAN header contains a <Accent>24-bit VNI (VXLAN Network Identifier)</Accent>, supporting 16,777,216 unique virtual networks.
      </Para>

      <Para>
        Each hypervisor runs a VTEP (VXLAN Tunnel Endpoint) that encapsulates/decapsulates VXLAN traffic. From the VM's perspective, it's on a flat Layer 2 network. From the physical network's perspective, it's all just UDP traffic on port 4789. VXLAN enables VM mobility across physical racks, rows, and even data centers while maintaining Layer 2 adjacency.
      </Para>

      <WowBox>
        AWS's internal network fabric — Nitro — uses a proprietary overlay similar to VXLAN. Every EC2 instance runs in an isolated VPC (Virtual Private Cloud) that is fundamentally a VXLAN-like virtual network. When you create an AWS VPC with subnets, you're provisioning what is essentially a software-defined VLAN spanning the entire AWS region's physical fabric — hundreds of thousands of servers across dozens of availability zones.
      </WowBox>

      <Divider />

      {/* ── Chapter 5 ── */}
      <Chapter n={5} title="VLAN Security: Threats and Defenses" />

      <H2>VLAN Hopping via Double-Tagging</H2>

      <Para>
        The most famous VLAN attack is <Accent>double-tagging</Accent>, exploiting the native VLAN's untagged behavior. An attacker on the native VLAN sends a frame with two 802.1Q tags: the outer tag matches the native VLAN (stripped by the first switch), and the inner tag contains the target VLAN ID. The first switch forwards the frame to the second switch, which sees only the inner tag and delivers it to the victim VLAN.
      </Para>

      <Para>
        This attack is <em>unidirectional only</em> — the attacker can send frames into the target VLAN but cannot receive responses (responses would be tagged correctly and not reach the attacker's VLAN). Despite this limitation, it's sufficient to send exploit payloads, ARP packets, or probe for vulnerabilities in the victim VLAN.
      </Para>

      <VlanHoppingDemo />

      <H2>DTP-Based VLAN Hopping</H2>

      <Para>
        A simpler form of VLAN hopping exploits <Accent>DTP</Accent>. If an attacker connects to a switch port that is in "dynamic auto" or "dynamic desirable" DTP mode, they can send DTP frames causing the switch to negotiate the port into trunk mode. Once the port is a trunk, the attacker can tag frames with any VLAN ID and access any VLAN carried by that trunk.
      </Para>

      <Para>
        Mitigation: explicitly configure all end-host ports with <Code>switchport mode access</Code> and <Code>switchport nonegotiate</Code>. These two commands together ensure DTP frames are never sent or honored on the port.
      </Para>

      <H2>MAC Flooding and CAM Table Overflow</H2>

      <Para>
        A switch maintains a CAM (Content Addressable Memory) table mapping MAC addresses to ports. If an attacker floods the switch with frames containing thousands of fake source MAC addresses, the CAM table fills up and new legitimate MACs cannot be learned. The switch enters <Accent>fail-open</Accent> mode, broadcasting all frames to all ports — effectively turning the switch into a hub and allowing the attacker to capture all traffic.
      </Para>

      <Para>
        Defense: <Accent>Port Security</Accent> limits the number of MAC addresses allowed on a port (e.g., <Code>switchport port-security maximum 3</Code>). Exceeding the limit triggers an action: <Code>protect</Code> (drop), <Code>restrict</Code> (drop + log), or <Code>shutdown</Code> (disable port). 802.1X authentication provides stronger protection by authenticating devices before allowing network access.
      </Para>

      <H2>VLAN ACLs (VACLs)</H2>

      <Para>
        Standard router ACLs filter traffic between VLANs at Layer 3. But what about filtering traffic <em>within</em> a VLAN? <Accent>VLAN ACLs (VACLs)</Accent> on Cisco switches apply to all traffic within a VLAN — both routed and bridged. A VACL can block specific protocols, IP addresses, or port numbers between hosts in the same VLAN, where a router ACL would never see the traffic.
      </Para>

      <Divider />

      {/* ── Chapter 6 ── */}
      <Chapter n={6} title="VLANs in the Data Center" />

      <StoryBox>
        Imagine a data center with 10,000 servers and 300 tenants (companies). Each tenant needs their own isolated network — their VMs must not be able to talk to another tenant's VMs. With classic 802.1Q VLANs, you'd need 300 VLANs minimum, a reasonable number. But each tenant might need 10–20 sub-segments (web tier, app tier, database tier, management). Suddenly you need 3,000–6,000 VLANs. And that's just one data center. Multiply across 20 availability zones and 6 regions. Classic VLANs collapse. This is why cloud providers use VXLAN and BGP EVPN.
      </StoryBox>

      <H2>Leaf-Spine and VXLAN Fabric</H2>

      <Para>
        Modern data centers use a <Accent>leaf-spine topology</Accent>. Leaf switches connect to servers; spine switches interconnect all leaves in a full mesh. Every leaf connects to every spine — this guarantees that any server can reach any other server in exactly two hops (leaf → spine → leaf). There is no hierarchy, no bottleneck core.
      </Para>

      <Para>
        In a VXLAN-based leaf-spine fabric, each leaf switch is a VTEP. VMs on different leaves that belong to the same VXLAN segment communicate through VXLAN-encapsulated UDP tunnels between VTEPs. The spine layer is pure IP — it has no knowledge of the overlay VLANs. This separation of underlay (IP transport) from overlay (virtual networks) is the key architectural principle.
      </Para>

      <H2>BGP EVPN Control Plane</H2>

      <Para>
        <Accent>BGP EVPN (Ethernet VPN, RFC 7432)</Accent> is the control plane for VXLAN fabrics. Instead of flooding ARP requests across the fabric (as traditional VLANs do), BGP EVPN distributes MAC and IP binding information between VTEPs using BGP UPDATE messages. When a VM comes online, its local VTEP advertises the MAC/IP to all other VTEPs via BGP. ARP requests are answered locally from a distributed database rather than flooded across the fabric.
      </Para>

      <Para>
        This eliminates the flood-and-learn behavior that makes traditional VLANs unscalable. BGP EVPN also enables efficient multi-site connectivity, VM live migration with preserved MAC/IP bindings, and consistent policy application across data center fabrics.
      </Para>

      <H2>Microsegmentation</H2>

      <Para>
        Traditional VLANs create perimeter security — you secure the boundary between VLANs but traffic within a VLAN is trusted. In modern zero-trust architectures, this is insufficient. <Accent>Microsegmentation</Accent> applies firewall policies at the individual workload level, regardless of VLAN.
      </Para>

      <Para>
        VMware NSX and Cisco ACI implement microsegmentation using distributed firewalls in the hypervisor's vSwitch. Each VM has its own firewall policy enforced at the virtual NIC level. Two VMs in the same VLAN can be isolated from each other by policy. This is computationally expensive in software but is offloaded to SmartNICs (Data Processing Units — DPUs) in modern deployments.
      </Para>

      <Divider />

      {/* ── Chapter 7 ── */}
      <Chapter n={7} title="VLAN Configuration Reference" />

      <H2>Cisco IOS VLAN Configuration</H2>

      <CodeBlock>
{`! Create VLANs
vlan 10
 name ENGINEERING
vlan 20
 name SALES
vlan 30
 name SERVERS
vlan 99
 name MANAGEMENT
vlan 999
 name UNUSED_NATIVE

! Access ports
interface range GigabitEthernet0/1-10
 description Engineering-Workstations
 switchport mode access
 switchport access vlan 10
 switchport nonegotiate
 spanning-tree portfast
 spanning-tree bpduguard enable

! Trunk port
interface GigabitEthernet0/24
 description Uplink-to-Distribution
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk native vlan 999
 switchport trunk allowed vlan 10,20,30,99
 switchport nonegotiate

! Layer 3 SVIs
ip routing
interface Vlan10
 ip address 10.10.10.1 255.255.255.0
 no shutdown
interface Vlan20
 ip address 10.10.20.1 255.255.255.0
 no shutdown
interface Vlan30
 ip address 10.10.30.1 255.255.255.0
 no shutdown`}
      </CodeBlock>

      <H2>Verification Commands</H2>

      <CodeBlock>
{`# Show VLAN database
show vlan brief

# Show trunk ports and allowed VLANs
show interfaces trunk

# Show a specific interface's VLAN assignment
show interfaces GigabitEthernet0/1 switchport

# Show spanning tree per VLAN
show spanning-tree vlan 10

# Show MAC address table for a VLAN
show mac address-table vlan 10

# Show SVI status
show interfaces vlan 10`}
      </CodeBlock>

      <H2>Linux (Open vSwitch) VLAN Configuration</H2>

      <CodeBlock>
{`# Create OVS bridge
ovs-vsctl add-br br0

# Add access port for VLAN 10
ovs-vsctl add-port br0 eth1 tag=10

# Add trunk port with VLANs 10,20,30
ovs-vsctl add-port br0 eth2 trunks=10,20,30

# Add VXLAN tunnel (VTEP)
ovs-vsctl add-port br0 vxlan0 \
  -- set interface vxlan0 type=vxlan \
     options:remote_ip=192.168.1.2 \
     options:key=1000

# Linux kernel VLAN (for servers)
ip link add link eth0 name eth0.10 type vlan id 10
ip addr add 10.10.10.100/24 dev eth0.10
ip link set eth0.10 up`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 8 ── */}
      <Chapter n={8} title="VLANs in Wireless Networks" />

      <Para>
        Wireless networks need VLAN integration too. A corporate campus might have one SSID for employees (mapped to the corporate VLAN), one for guests (mapped to an isolated guest VLAN), and one for IoT devices (mapped to a restricted IoT VLAN) — all broadcasting from the same physical access point.
      </Para>

      <H2>SSID-to-VLAN Mapping</H2>

      <Para>
        Modern wireless controllers (Cisco WLC, Aruba, Meraki) map each SSID to a VLAN. The access point's uplink to the switch is a trunk port carrying all VLANs. When a client connects to the guest SSID, the AP tags their traffic with the guest VLAN ID before forwarding it to the switch. The switch treats this traffic identically to any wired VLAN 50 traffic.
      </Para>

      <CodeBlock>
{`# Cisco WLC — WLAN to VLAN mapping
(Cisco Controller) > config wlan interface <wlan-id> <interface-name>

# Example interfaces:
# SSID "CorpNet"   → management interface (VLAN 10)
# SSID "GuestWifi" → dynamic interface (VLAN 100)
# SSID "IoT-Mgmt"  → dynamic interface (VLAN 200)

# Switch AP uplink
interface GigabitEthernet0/20
 description AP-Uplink-Floor-1
 switchport mode trunk
 switchport trunk native vlan 999
 switchport trunk allowed vlan 10,100,200`}
      </CodeBlock>

      <H2>Guest VLAN Isolation</H2>

      <Para>
        Guest VLANs require careful design. Guests need internet access but must be isolated from the corporate network. The standard architecture: guest VLAN traffic exits through a dedicated firewall rule that allows only outbound internet traffic (TCP 80, 443, DNS) while blocking all access to RFC 1918 (private) address space. Dynamic captive portal registration can be implemented by intercepting guest HTTP traffic.
      </Para>

      <Warn title="Guest VLAN on the same L3 switch as corporate VLANs">
        If guest and corporate VLANs both have SVIs on the same Layer 3 switch, a misconfigured or missing ACL could allow guests to route to corporate VLANs. Better architecture: route guest VLAN traffic to a dedicated firewall or directly to a separate internet uplink, bypassing the corporate router entirely.
      </Warn>

      <Divider />

      {/* ── Chapter 9 ── */}
      <Chapter n={9} title="VLANs and Quality of Service (QoS)" />

      <Para>
        The 3-bit PCP field in the 802.1Q TCI provides <Accent>Layer 2 QoS marking</Accent> — called <Accent>802.1p</Accent>. PCP values range from 0 (best effort) to 7 (highest priority). This allows switches to prioritize voice traffic (PCP=5), video traffic (PCP=4), and drop best-effort internet traffic last (PCP=0 or 1) when queues fill under congestion.
      </Para>

      <H2>CoS-to-DSCP Mapping</H2>

      <Para>
        PCP (Class of Service, CoS) operates at Layer 2; <Accent>DSCP (Differentiated Services Code Point)</Accent> operates at Layer 3 in the IP header. As traffic crosses router boundaries, Layer 2 tags are stripped and only the IP DSCP value persists. QoS policy must map CoS to DSCP at the first L3 hop to ensure consistent treatment across the routed network.
      </Para>

      <CodeBlock>
{`! Cisco IOS — trust CoS marking on ingress
interface GigabitEthernet0/1
 mls qos trust cos

! Map CoS to DSCP globally
mls qos map cos-dscp 0 8 16 24 32 46 48 56

! Apply a QoS policy on voice VLAN
policy-map VOICE-POLICY
 class VOICE-CLASS
  set dscp ef
  priority 1000       ! 1 Gbps guaranteed
 class class-default
  fair-queue`}
      </CodeBlock>

      <H2>Voice VLANs (Auxiliary VLANs)</H2>

      <Para>
        IP phones create a special VLAN challenge: the phone is on an access port, but so is the PC connected through the phone's built-in switch. Cisco's <Accent>auxiliary VLAN</Accent> (also called voice VLAN) solves this: the port carries two VLANs simultaneously — the data VLAN (untagged, for the PC) and the voice VLAN (tagged with PCP=5, for the phone). The phone learns its VLAN from CDP/LLDP and tags its traffic accordingly.
      </Para>

      <CodeBlock>
{`interface GigabitEthernet0/5
 description IP-Phone-with-PC
 switchport mode access
 switchport access vlan 10           ! PC data traffic — untagged
 switchport voice vlan 40            ! IP phone voice — 802.1Q tagged
 mls qos trust cos                   ! trust CoS marking from phone
 spanning-tree portfast`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 10 ── */}
      <Chapter n={10} title="Real-World VLAN Design Patterns" />

      <StoryBox>
        A retail chain with 500 stores needs a consistent VLAN design deployed identically at every location. The corporate team defines: VLAN 10 = POS (Point of Sale), VLAN 20 = Employee Wi-Fi, VLAN 30 = Corporate WAN, VLAN 40 = Cameras, VLAN 99 = Management. Each store's switch is auto-provisioned via ZTP (Zero Touch Provisioning) from a central template. Audit compliance checks run nightly via SNMP to confirm VLAN assignments haven't drifted. The standard template is the difference between a manageable 500-store network and chaos.
      </StoryBox>

      <H2>Enterprise Three-Tier Model</H2>

      <Para>
        The traditional enterprise campus uses a three-tier hierarchy: Access → Distribution → Core. VLAN assignment happens at the Access layer (end devices). Distribution layer switches (L3) terminate SVIs and route between VLANs. Core switches (L3) carry aggregated traffic between buildings.
      </Para>

      <Para>
        VLAN IDs are typically standardized campus-wide. VLAN 10 is always Engineering regardless of which building. This consistency allows network engineers to troubleshoot any switch in the campus using the same mental model. Documentation and monitoring tools that reference VLAN IDs remain valid across refreshes.
      </Para>

      <H2>VLAN Numbering Standards</H2>

      <Para>
        There is no enforced VLAN numbering convention, but common schemes include: low numbers (10–99) for user VLANs organized by department, mid-range (100–199) for servers organized by function, high range (200–299) for wireless/IoT, and 800–899 for management. Using multiples of 10 leaves room for future sub-segmentation (VLAN 11 could be "Engineering Guest" without conflict).
      </Para>

      <H2>VLAN Sprawl and Lifecycle Management</H2>

      <Para>
        Large networks develop <Accent>VLAN sprawl</Accent> — hundreds of VLANs created for projects that have since ended, but nobody deleted them. Abandoned VLANs consume CAM table entries, generate unnecessary STP topology computations, and create security uncertainty ("who knows what's in VLAN 847?"). Best practice: document every VLAN with owner, purpose, and review date. Implement a quarterly VLAN audit that flags VLANs with zero traffic for decommissioning review.
      </Para>

      <Divider />

      {/* ── Chapter 11 ── */}
      <Chapter n={11} title="VLAN Troubleshooting Methodology" />

      <H2>The Five Most Common VLAN Issues</H2>

      <Para>
        <Accent>1. Native VLAN mismatch.</Accent> Symptom: inter-switch connectivity works but specific VLANs have traffic issues, or STP errors appear in logs. Diagnosis: <Code>show interfaces trunk</Code> on both ends of a trunk link and compare native VLAN.
      </Para>

      <Para>
        <Accent>2. Missing VLAN in trunk allowed list.</Accent> Symptom: hosts in a specific VLAN cannot communicate across switches even though the VLAN exists on both. Diagnosis: <Code>show interfaces trunk</Code> — the VLAN must appear in "VLANs allowed and active in management domain" column, not just "VLANs allowed on trunk."
      </Para>

      <Para>
        <Accent>3. VLAN exists on access port but not in VLAN database.</Accent> Symptom: port is assigned VLAN X but traffic doesn't flow. The VLAN must be created in the VLAN database (<Code>vlan X</Code>) not just referenced on a port. Some platforms auto-create VLANs; others require explicit creation.
      </Para>

      <Para>
        <Accent>4. SVI not up/up.</Accent> Symptom: hosts have correct IPs and VLAN is configured, but cannot reach their gateway IP. <Code>show interfaces vlan 10</Code> shows "down/down." An SVI comes up only when at least one access port in that VLAN is active. No active ports = SVI stays down.
      </Para>

      <Para>
        <Accent>5. Spanning Tree blocking a VLAN.</Accent> Symptom: intermittent connectivity in a specific VLAN. <Code>show spanning-tree vlan X</Code> to identify if a port is in BLK state that shouldn't be.
      </Para>

      <CodeBlock>
{`# Comprehensive VLAN troubleshooting workflow
show vlan brief                         # Is the VLAN created and active?
show interfaces GigabitEthernet0/1 swp  # What VLAN is this port in?
show interfaces trunk                   # What VLANs traverse each trunk?
show interfaces vlan 10                 # Is the SVI up?
show spanning-tree vlan 10             # Is STP blocking any ports?
show mac address-table vlan 10         # Are hosts being learned?
show ip arp vlan 10                    # Is L3 resolution working?`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 12 ── */}
      <Chapter n={12} title="VLANs in the Wild: Case Studies" />

      <H2>Healthcare: PCI DSS and HIPAA Segmentation</H2>

      <Para>
        Healthcare networks must comply with HIPAA (health data) and PCI DSS (payment card data). HIPAA requires that protected health information (PHI) be isolated from non-clinical systems. PCI DSS requires cardholder data environments (CDE) to be network-isolated. A hospital VLAN architecture: VLAN 10 Clinical (EHR, medical devices), VLAN 20 Administrative (email, HR), VLAN 30 Guest/Patient Wi-Fi, VLAN 40 POS/Revenue Cycle, VLAN 50 Medical Imaging (huge file transfers, separate bandwidth), VLAN 99 Management.
      </Para>

      <Para>
        Inter-VLAN traffic between Clinical and Administrative must pass through a next-generation firewall with application-layer inspection, not just an L3 switch with ACLs. The firewall policy explicitly permits only necessary clinical application flows and logs all traffic for compliance auditing.
      </Para>

      <H2>Financial Services: Low-Latency Trading Networks</H2>

      <Para>
        High-frequency trading (HFT) firms have unusual VLAN requirements: microseconds matter. Standard VLAN processing on managed switches adds ~1–5 µs of latency. HFT networks use specialized low-latency switches (Arista, Cisco Nexus 3000 series) with hardware forwarding pipelines that reduce cut-through latency to sub-microsecond. VLAN tagging still happens in ASICs, but the entire pipeline is optimized.
      </Para>

      <Para>
        Market data VLANs carry multicast feeds from exchanges. Trading VLANs carry order flow. Risk management VLANs carry position monitoring. The firm's risk management systems are on a separate VLAN specifically so they can always observe trading VLANs via SPAN (Switched Port Analyzer) monitoring — even if the trading VLAN is congested, the SPAN port to risk management is never dropped.
      </Para>

      <Divider />

      {/* ── Chapter 13 ── */}
      <Chapter n={13} title="Common Misconceptions" />

      <Err title="VLANs provide complete security isolation">
        VLANs provide Layer 2 broadcast domain isolation, not security isolation. A misconfigured ACL on the Layer 3 switch allows full inter-VLAN traffic. VLAN hopping attacks bypass VLAN isolation entirely if native VLAN is misconfigured. VLANs are a segmentation tool — they must be combined with ACLs, firewall policies, and proper port configuration to provide actual security. "We have VLANs" is not a complete security answer.
      </Err>

      <Err title="VLANs and subnets are the same thing">
        VLANs operate at Layer 2 (Ethernet). Subnets operate at Layer 3 (IP). They are correlated but independent. It is technically possible (though inadvisable) to have multiple subnets within one VLAN, or one subnet that spans multiple VLANs (with proxy ARP). In practice, one VLAN maps to one subnet in virtually all enterprise designs. But confusing "I can't reach that IP" with "I'm in the wrong VLAN" without checking both layers leads to circular troubleshooting.
      </Err>

      <Err title="Trunking a port makes all VLANs accessible">
        A trunk port carries only VLANs explicitly listed in the trunk's "allowed VLAN" list. By default on Cisco, all VLANs (1–4094) are allowed on a trunk — but best practice is to explicitly restrict this to only VLANs that need to cross the link. An attacker who compromises a trunk port still cannot access VLANs that are pruned from that trunk (they don't carry traffic for those VLANs).
      </Err>

      <Err title="VLAN 1 is just like any other VLAN">
        VLAN 1 is the default VLAN on Cisco equipment and has special behaviors: it is the default native VLAN on trunk ports, it carries CDP/VTP/PAgP/DTP management frames regardless of configuration, and it cannot be deleted. Using VLAN 1 for production traffic is a security risk because management protocol traffic is co-mingled with data. Best practice: move all hosts off VLAN 1, change native VLAN to an unused ID, and treat VLAN 1 as a management-only protocol carrier.
      </Err>

      <Err title="Layer 3 switches don't need VLANs — just use routing">
        Layer 3 switches still use VLANs internally — the SVIs (Switched Virtual Interfaces) are the Layer 3 representation of VLANs. Saying "use routing instead of VLANs" conflates two different layers. VLANs define which physical ports are in the same broadcast domain. SVIs on an L3 switch provide the gateway IPs that enable routing between those broadcast domains. You need both.
      </Err>

      <Err title="QinQ is just two VLANs stacked — it's simple">
        QinQ frames require specific TPID handling. The outer S-Tag uses EtherType 0x88a8 (IEEE 802.1ad) while the inner C-Tag uses 0x8100. Devices that don't understand 0x88a8 will process the frame incorrectly. MTU must also be increased: a standard 1518-byte frame gains 4 bytes for each VLAN tag. With QinQ, you need MTU ≥ 1526 bytes (1500 payload + 14 Ethernet header + 4 C-Tag + 4 S-Tag + 4 FCS). Misconfigured MTU causes intermittent drops on larger packets.
      </Err>

      <Divider />

      {/* ── Chapter 14 ── */}
      <Chapter n={14} title="Interview Questions" />

      <IQ q="What is a VLAN and why is it used?" level="Beginner">
        A VLAN (Virtual LAN) is a logical grouping of devices into a broadcast domain, independent of their physical location. VLANs are used to: (1) reduce broadcast traffic by confining broadcasts to a segment, (2) improve security by isolating groups of devices — they cannot directly communicate across VLAN boundaries, (3) simplify network management by grouping devices by function rather than physical location, and (4) allow one physical switch infrastructure to support multiple logically separate networks. The only way to cross a VLAN boundary is through a Layer 3 device (router or L3 switch).
      </IQ>

      <IQ q="Explain the difference between an access port and a trunk port." level="Beginner">
        An access port belongs to a single VLAN and carries untagged frames — end hosts (PCs, printers, servers) connect to access ports and have no VLAN awareness. The switch adds the VLAN tag internally and strips it before delivery. A trunk port carries multiple VLANs simultaneously using 802.1Q tagging — each frame includes a 12-bit VLAN ID so the receiving switch knows which VLAN it belongs to. Trunk ports are used between switches, to routers, and to hypervisors. The allowed VLAN list on a trunk port controls which VLANs can traverse the link.
      </IQ>

      <IQ q="What is the 802.1Q tag structure and what does each field do?" level="Intermediate">
        The 802.1Q tag is 4 bytes inserted between the Source MAC and EtherType in an Ethernet frame. It consists of: TPID (2 bytes, always 0x8100) — identifies the frame as 802.1Q tagged; TCI (2 bytes) containing: 3-bit PCP (Priority Code Point, 0–7 for 802.1p QoS), 1-bit DEI (Drop Eligible Indicator for congestion), and 12-bit VID (VLAN Identifier, 0–4095). The 12-bit VID supports 4,096 values; 0 and 4095 are reserved, leaving 4,094 usable VLANs. The 4-byte addition increases maximum Ethernet frame size from 1518 to 1522 bytes.
      </IQ>

      <IQ q="How does VLAN hopping via double-tagging work, and how do you prevent it?" level="Intermediate">
        Double-tagging exploits the native VLAN's untagged behavior on trunk ports. An attacker on the native VLAN sends a frame with two 802.1Q tags: outer = native VLAN (stripped by first switch), inner = target VLAN. Switch 1 strips the outer tag (it's native, so forwarded untagged toward Switch 2). Switch 2 sees the inner tag as a legitimate VLAN tag and delivers the frame to the victim VLAN. This is unidirectional — attacker can send but not receive responses. Prevention: change native VLAN to an unused ID (e.g., 999), enable "vlan dot1q tag native" to explicitly tag native VLAN frames, use "switchport mode access" on all end-host ports to disable DTP, and never assign hosts to the native VLAN.
      </IQ>

      <IQ q="What is the difference between Router-on-a-Stick and an SVI on a Layer 3 switch for inter-VLAN routing?" level="Senior">
        Router-on-a-stick uses a router with sub-interfaces on a trunk link to the switch. Each sub-interface encapsulates a different VLAN. All inter-VLAN traffic must traverse the single physical uplink to the router and back — creating a bandwidth bottleneck. Routing is done in software (or NPU), typically adding ~50µs latency. Layer 3 switch SVIs (Switched Virtual Interfaces) create virtual gateway interfaces directly in the switch. Routing between SVIs uses hardware ASICs (TCAM-based FIB lookup), adding ~1–3µs latency. A modern L3 switch can route 200M+ pps between SVIs simultaneously without any uplink bottleneck. SVIs also eliminate the need for a separate router device, reducing cost and failure domains. Use RoaS in small environments where an L3 switch is unavailable; use SVIs in any production environment.
      </IQ>

      <IQ q="Explain how BGP EVPN eliminates ARP flooding in VXLAN fabrics and its implications for VLAN-scale design." level="PhD">
        Traditional VLANs use flood-and-learn for MAC discovery and broadcast ARP for IP-to-MAC resolution. In a VXLAN fabric, flooding would require every VTEP to replicate traffic to all other VTEPs in the same VNI — O(n) traffic for n VTEPs, catastrophically unscalable. BGP EVPN (RFC 7432) replaces flooding with a distributed control plane. When a host comes online, its local VTEP advertises a Type-2 (MAC/IP Advertisement) route via MP-BGP UPDATE, carrying the host's MAC and IP bound to the local VTEP's IP. All remote VTEPs install this as a host route and ARP proxy entry. When any host needs to ARP, the local VTEP answers from its local cache — the ARP request never traverses the fabric. This reduces fabric ARP traffic from O(n×m) (n hosts × m VTEPs) to O(1) — a single BGP advertisement. EVPN also provides: Type-3 routes for BUM (Broadcast, Unknown, Multicast) traffic optimization via ingress replication lists; Type-5 routes for IP prefix advertisement enabling VXLAN-to-IP-VRF routing without flood; consistent policy anchor points for microsegmentation. The architectural implication: VXLAN+EVPN scales to millions of virtual segments because the control plane complexity is O(n log n) BGP routes rather than O(n²) flooded traffic.
      </IQ>

      <IQ q="In a multi-tenant cloud environment, how would you design VLAN/overlay segmentation to satisfy 10,000 tenants with strict isolation guarantees?" level="PhD">
        Classic 802.1Q VLANs are insufficient — 4,094 usable IDs is far below 10,000. The architecture requires an overlay model: VXLAN provides 16.7M VNIs (24-bit identifier), eliminating the ID constraint. Each tenant receives one or more VNIs mapped to their VPC/VNet. Control plane: BGP EVPN distributes MAC/IP/prefix bindings across all VTEPs; each tenant's routes live in a dedicated VRF (Virtual Routing and Forwarding instance), providing routing isolation at the IP layer. Data plane: VTEP encapsulation ensures tenant traffic never appears in another tenant's L2 domain; outer IP/UDP headers carry tenant traffic transparently across the physical fabric. Security: VRF isolation prevents inter-tenant routing (packets destined to another VRF are dropped by the routing policy, not by VLAN membership); additionally, security groups implemented in the hypervisor's vSwitch or hardware DPU enforce per-flow policies. Verification: each tenant's VNI/VRF has an independent routing table, ARP cache, and MAC table — a compromised tenant VM cannot see or affect another tenant's routing entries. Scalability: with BGP EVPN, adding a new tenant requires only provisioning a new VNI, a new VRF, and advertising the first host route — the control plane converges incrementally without impacting existing tenants.
      </IQ>

      <KeyTakeaways items={[
        'VLANs create logical broadcast domains on shared switch infrastructure — one physical switch can host dozens of isolated VLANs simultaneously.',
        '802.1Q inserts a 4-byte tag (TPID + TCI) into Ethernet frames; the 12-bit VID supports 4,094 usable VLAN IDs (0 and 4095 reserved).',
        'Access ports carry untagged traffic for one VLAN; trunk ports carry tagged traffic for multiple VLANs using 802.1Q.',
        'The native VLAN is sent untagged on trunk ports — mismatched native VLANs between switches cause traffic misassignment and STP issues.',
        'Inter-VLAN routing requires a Layer 3 device; Layer 3 switch SVIs route between VLANs in hardware ASICs at line rate (~1–3 µs).',
        'VLAN hopping via double-tagging exploits the native VLAN — mitigate by assigning an unused VLAN ID as native and tagging it explicitly.',
        'DTP auto-trunking is a security risk; configure all end-host ports explicitly with switchport mode access and switchport nonegotiate.',
        'VTP Server mode can wipe an entire campus VLAN database if a higher-revision switch is plugged in — prefer VTP Transparent or VTP v3.',
        'VXLAN extends VLAN concepts to 16 million virtual segments (24-bit VNI), enabling cloud-scale multi-tenant network isolation.',
        'BGP EVPN eliminates ARP flooding in VXLAN fabrics by distributing MAC/IP bindings via BGP — converting O(n²) floods to O(n log n) control-plane updates.',
      ]} />
    </LearnLayout>
  )
}
