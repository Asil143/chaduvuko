'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

/* ── Helper components ────────────────────────────────────────────────────── */

const G = '#10b981'
const WARN_BG = '#fefce8'
const WARN_BORDER = '#fef08a'
const ERR_BG = '#fff1f2'
const ERR_BORDER = '#fecdd3'

const Chapter = ({ n }: { n: number }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 11, color: G, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>
      // Chapter {String(n).padStart(2, '0')}
    </p>
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
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `3px solid ${G}`, borderRadius: 8, padding: '16px 20px', margin: '0 0 24px', fontSize: 14.5, lineHeight: 1.8, color: 'var(--text)' }}>{children}</div>
)

const WowBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${G}`, borderRadius: 8, padding: '14px 18px', margin: '0 0 24px', fontSize: 14, lineHeight: 1.8, color: 'var(--text)' }}>
    <span style={{ color: G, fontWeight: 700, marginRight: 8 }}>◆ Wow:</span>{children}
  </div>
)

const Warn = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: WARN_BG, border: `1px solid ${WARN_BORDER}`, borderRadius: 8, padding: '14px 18px', margin: '0 0 24px', fontSize: 14, lineHeight: 1.8, color: '#713f12' }}>
    <span style={{ fontWeight: 700, marginRight: 8 }}>⚠ Warning:</span>{children}
  </div>
)

const Err = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: ERR_BG, border: `1px solid ${ERR_BORDER}`, borderRadius: 8, padding: '14px 18px', margin: '0 0 24px', fontSize: 14, lineHeight: 1.8, color: '#881337' }}>
    <span style={{ fontWeight: 700, marginRight: 8 }}>✗ Misconception:</span>{children}
  </div>
)

const levelColors: Record<string, string> = {
  Beginner: '#10b981',
  Intermediate: '#3b82f6',
  Senior: '#8b5cf6',
  PhD: '#f97316',
}

const IQ = ({ level, children }: { level: string; children: React.ReactNode }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', margin: '0 0 24px', fontSize: 14, lineHeight: 1.8, color: 'var(--text)' }}>
    <span style={{ background: levelColors[level] ?? G, color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: 4, padding: '2px 8px', marginRight: 10, letterSpacing: '.05em' }}>{level.toUpperCase()}</span>
    {children}
  </div>
)

/* ── Interactive Component 1: NAT Translation Table Simulator ─────────────── */

interface NatEntry {
  id: number
  insideLocal: string
  insideGlobal: string
  outsideGlobal: string
  protocol: string
  state: string
  ttl: number
}

const INITIAL_NAT_TABLE: NatEntry[] = [
  { id: 1, insideLocal: '192.168.1.10:54321', insideGlobal: '203.0.113.5:54321', outsideGlobal: '8.8.8.8:53', protocol: 'UDP', state: 'Active', ttl: 30 },
  { id: 2, insideLocal: '192.168.1.20:49152', insideGlobal: '203.0.113.5:49152', outsideGlobal: '172.217.0.1:443', protocol: 'TCP', state: 'Established', ttl: 86400 },
  { id: 3, insideLocal: '192.168.1.30:52000', insideGlobal: '203.0.113.5:52000', outsideGlobal: '93.184.216.34:80', protocol: 'TCP', state: 'SYN_SENT', ttl: 60 },
]

function NatTableSimulator() {
  const [table, setTable] = useState<NatEntry[]>(INITIAL_NAT_TABLE)
  const [nextPort, setNextPort] = useState(55000)
  const [lastAction, setLastAction] = useState('')

  const addEntry = () => {
    const hosts = ['192.168.1.10', '192.168.1.20', '192.168.1.30', '192.168.1.40']
    const destinations = ['1.1.1.1:443', '208.67.222.222:53', '104.16.0.1:80', '151.101.1.1:443']
    const protocols = ['TCP', 'UDP', 'TCP']
    const host = hosts[Math.floor(Math.random() * hosts.length)]
    const dest = destinations[Math.floor(Math.random() * destinations.length)]
    const proto = protocols[Math.floor(Math.random() * protocols.length)]
    const sport = nextPort
    setNextPort(p => p + 1)
    const entry: NatEntry = {
      id: Date.now(),
      insideLocal: `${host}:${sport}`,
      insideGlobal: `203.0.113.5:${sport}`,
      outsideGlobal: dest,
      protocol: proto,
      state: proto === 'TCP' ? 'SYN_SENT' : 'Active',
      ttl: proto === 'TCP' ? 86400 : 30,
    }
    setTable(t => [...t, entry])
    setLastAction(`New ${proto} flow: ${host}:${sport} → ${dest}`)
  }

  const removeEntry = (id: number) => {
    const entry = table.find(e => e.id === id)
    setTable(t => t.filter(e => e.id !== id))
    if (entry) setLastAction(`Removed entry: ${entry.insideLocal} → ${entry.outsideGlobal}`)
  }

  const stateColor = (s: string) => {
    if (s === 'Established') return G
    if (s === 'SYN_SENT') return '#f59e0b'
    if (s === 'Active') return '#3b82f6'
    return '#6b7280'
  }

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>NAT/PAT Translation Table</h3>
      <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
        This is a live NAT table (PAT mode). One public IP <strong>203.0.113.5</strong> serves all inside hosts by multiplexing via port numbers.
      </p>

      {lastAction && (
        <div style={{ background: `${G}18`, border: `1px solid ${G}`, borderRadius: 6, padding: '8px 12px', marginBottom: 12, fontSize: 12, fontFamily: 'var(--font-mono)', color: G }}>
          {lastAction}
        </div>
      )}

      <div style={{ overflowX: 'auto', marginBottom: 12 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
              {['Inside Local', 'Inside Global (PAT)', 'Outside Global', 'Proto', 'State', 'TTL(s)', ''].map(h => (
                <th key={h} style={{ padding: '7px 10px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.map(e => (
              <tr key={e.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '7px 10px', fontFamily: 'var(--font-mono)', color: '#3b82f6' }}>{e.insideLocal}</td>
                <td style={{ padding: '7px 10px', fontFamily: 'var(--font-mono)', color: G }}>{e.insideGlobal}</td>
                <td style={{ padding: '7px 10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{e.outsideGlobal}</td>
                <td style={{ padding: '7px 10px', color: 'var(--text)' }}>{e.protocol}</td>
                <td style={{ padding: '7px 10px' }}>
                  <span style={{ color: stateColor(e.state), fontWeight: 600, fontSize: 11 }}>{e.state}</span>
                </td>
                <td style={{ padding: '7px 10px', color: 'var(--text-muted)' }}>{e.ttl}</td>
                <td style={{ padding: '7px 10px' }}>
                  <button onClick={() => removeEntry(e.id)} style={{ padding: '2px 8px', borderRadius: 4, border: '1px solid #ef4444', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontSize: 11 }}>✕</button>
                </td>
              </tr>
            ))}
            {table.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>NAT table is empty</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <button
          onClick={addEntry}
          style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: 'none', background: G, color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}
        >
          + Simulate new flow
        </button>
        <button
          onClick={() => { setTable(INITIAL_NAT_TABLE); setLastAction('Table reset') }}
          style={{ padding: '8px 20px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', cursor: 'pointer', fontSize: 13 }}
        >
          Reset
        </button>
      </div>

      <p style={{ margin: '12px 0 0', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>
        <strong>Inside Local</strong>: private source IP:port. <strong>Inside Global</strong>: public IP:port (translated). Port number is preserved in PAT when possible. If port conflicts, the router assigns a new port.
      </p>
    </div>
  )
}

/* ── Interactive Component 2: DHCP DORA Walkthrough ──────────────────────── */

interface DhcpStep {
  step: number
  name: string
  direction: string
  srcIp: string
  dstIp: string
  srcMac: string
  payload: string
  description: string
  color: string
}

const DHCP_STEPS: DhcpStep[] = [
  {
    step: 1,
    name: 'DHCPDISCOVER',
    direction: 'Client → Broadcast',
    srcIp: '0.0.0.0',
    dstIp: '255.255.255.255',
    srcMac: 'AA:BB:CC:DD:EE:FF',
    payload: 'Message Type: DISCOVER\nClient Hardware Address: AA:BB:CC:DD:EE:FF\nTransaction ID: 0x3903F326\nParameter Request List: [Subnet Mask, Router, DNS, Domain Name]',
    description: 'Client has no IP. Broadcasts a DISCOVER to find any DHCP server. Source IP is 0.0.0.0 (none yet). Destination is 255.255.255.255 (entire LAN). The Transaction ID (XID) ties this exchange together.',
    color: '#f97316',
  },
  {
    step: 2,
    name: 'DHCPOFFER',
    direction: 'Server → Broadcast',
    srcIp: '192.168.1.1',
    dstIp: '255.255.255.255',
    srcMac: 'Server MAC',
    payload: 'Message Type: OFFER\nOffered IP: 192.168.1.105\nSubnet Mask: 255.255.255.0\nRouter: 192.168.1.1\nDNS: 8.8.8.8, 8.8.4.4\nLease Time: 86400 (24 hours)\nServer ID: 192.168.1.1',
    description: 'Server responds with an OFFER containing a candidate IP address. Still broadcast because the client has no IP to unicast to. Multiple servers may OFFER — the client picks one. The Server ID identifies which server is offering.',
    color: '#3b82f6',
  },
  {
    step: 3,
    name: 'DHCPREQUEST',
    direction: 'Client → Broadcast',
    srcIp: '0.0.0.0',
    dstIp: '255.255.255.255',
    srcMac: 'AA:BB:CC:DD:EE:FF',
    payload: 'Message Type: REQUEST\nRequested IP: 192.168.1.105\nServer ID: 192.168.1.1\nTransaction ID: 0x3903F326\nParameter Request List: [Subnet Mask, Router, DNS]',
    description: 'Client broadcasts a REQUEST for the offered IP from the selected server. Still broadcast so ALL servers see it — unselected servers know to reclaim their offers. The Server ID tells which offer was accepted.',
    color: '#8b5cf6',
  },
  {
    step: 4,
    name: 'DHCPACK',
    direction: 'Server → Broadcast',
    srcIp: '192.168.1.1',
    dstIp: '255.255.255.255',
    srcMac: 'Server MAC',
    payload: 'Message Type: ACK\nYour IP: 192.168.1.105\nSubnet Mask: 255.255.255.0\nRouter (Option 3): 192.168.1.1\nDNS (Option 6): 8.8.8.8, 8.8.4.4\nLease Time (Option 51): 86400\nRenewal Time (T1): 43200 (50% of lease)\nRebind Time (T2): 75600 (87.5% of lease)',
    description: 'Server confirms the lease with an ACK. Client now configures its interface with the leased IP, subnet mask, gateway, and DNS. At T1 (50% lease expiry) the client attempts renewal via unicast REQUEST. At T2 (87.5%), it broadcasts to any server.',
    color: G,
  },
]

function DhcpDoraWalkthrough() {
  const [step, setStep] = useState(0)
  const current = DHCP_STEPS[step]

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>DHCP DORA Exchange — Packet Inspector</h3>
      <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--text-muted)' }}>
        Step through the 4-message DHCP lease acquisition process and inspect each packet&apos;s fields.
      </p>

      {/* Step selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {DHCP_STEPS.map((s, i) => (
          <button
            key={s.step}
            onClick={() => setStep(i)}
            style={{
              flex: 1,
              padding: '10px 4px',
              borderRadius: 8,
              border: `2px solid ${i === step ? s.color : 'var(--border)'}`,
              background: i === step ? s.color : 'var(--surface)',
              color: i === step ? '#fff' : 'var(--text-muted)',
              fontSize: 12,
              fontWeight: i === step ? 700 : 400,
              cursor: 'pointer',
              lineHeight: 1.3,
              textAlign: 'center',
            }}
          >
            {i + 1}<br />{s.name.replace('DHCP', '')}
          </button>
        ))}
      </div>

      {/* Packet visual */}
      <div style={{ background: 'var(--surface)', border: `1px solid ${current.color}`, borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
        <div style={{ background: current.color, color: '#fff', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: 14 }}>{current.name}</span>
          <span style={{ fontSize: 12, opacity: 0.9 }}>{current.direction}</span>
        </div>
        <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', fontSize: 13 }}>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>Source IP</span>
            <p style={{ margin: 0, fontFamily: 'var(--font-mono)', color: 'var(--text)', fontSize: 13 }}>{current.srcIp}</p>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>Destination IP</span>
            <p style={{ margin: 0, fontFamily: 'var(--font-mono)', color: 'var(--text)', fontSize: 13 }}>{current.dstIp}</p>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>Source MAC</span>
            <p style={{ margin: 0, fontFamily: 'var(--font-mono)', color: 'var(--text)', fontSize: 12 }}>{current.srcMac}</p>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>UDP Ports</span>
            <p style={{ margin: 0, fontFamily: 'var(--font-mono)', color: 'var(--text)', fontSize: 13 }}>68 → 67</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', padding: '12px 16px' }}>
          <p style={{ margin: '0 0 8px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>DHCP OPTIONS / PAYLOAD</p>
          <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{current.payload}</pre>
        </div>
      </div>

      <div style={{ background: 'var(--surface)', borderRadius: 8, padding: '12px 16px', fontSize: 13.5, lineHeight: 1.7, color: 'var(--text)', border: '1px solid var(--border)' }}>
        {current.description}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
          style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', cursor: step === 0 ? 'not-allowed' : 'pointer', opacity: step === 0 ? 0.4 : 1 }}>
          ← Previous
        </button>
        <button onClick={() => setStep(s => Math.min(3, s + 1))} disabled={step === 3}
          style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: '1px solid var(--border)', background: G, color: '#fff', cursor: step === 3 ? 'not-allowed' : 'pointer', opacity: step === 3 ? 0.5 : 1 }}>
          Next →
        </button>
      </div>
    </div>
  )
}

/* ── Interactive Component 3: NAT Type Comparator ────────────────────────── */

interface NatType {
  name: string
  also: string
  direction: string
  ratio: string
  example: string
  pros: string[]
  cons: string[]
  useCase: string
  color: string
}

const NAT_TYPES: NatType[] = [
  {
    name: 'Static NAT',
    also: '1:1 NAT',
    direction: 'Inside ↔ Outside',
    ratio: 'One inside IP ↔ One outside IP',
    example: '192.168.1.10 ↔ 203.0.113.10 (always)',
    pros: ['Inbound connections work naturally', 'Predictable for server hosting', 'No port tracking needed'],
    cons: ['Requires one public IP per server', 'Does not conserve address space', 'Security: server always reachable'],
    useCase: 'Web/mail servers that need a permanent public IP for inbound access.',
    color: '#3b82f6',
  },
  {
    name: 'Dynamic NAT',
    also: 'NAT Pool',
    direction: 'Inside → Outside only',
    ratio: 'Many inside IPs ↔ Pool of outside IPs',
    example: '192.168.1.0/24 → pool 203.0.113.0/28',
    pros: ['Better address utilization than static', 'No inbound connections by default', 'Automatic pool management'],
    cons: ['Still requires multiple public IPs', 'Fails when pool exhausted', 'No port multiplexing'],
    useCase: 'Networks with more public IPs than typical concurrent users, rare in modern deployments.',
    color: '#f97316',
  },
  {
    name: 'PAT / NAT Overload',
    also: 'NAPT, IP Masquerade',
    direction: 'Inside → Outside only',
    ratio: 'Many inside IP:port ↔ One outside IP + many ports',
    example: '192.168.x.x:port → 203.0.113.5:ephemeral_port',
    pros: ['Single public IP serves entire LAN', 'Implicit firewall (no inbound)', 'Standard for home/SMB routers'],
    cons: ['Breaks protocols needing embedded IPs (FTP active, SIP)', 'No inbound without port forwarding', 'Connection tracking memory'],
    useCase: 'Home/office internet access — one ISP-assigned IP shared by all devices. Standard in 99% of deployments.',
    color: G,
  },
  {
    name: 'NAT64',
    also: 'Stateful NAT64',
    direction: 'IPv6 → IPv4',
    ratio: 'IPv6 client ↔ IPv4 server',
    example: '2001:db8::1 accesses 93.184.216.34 via NAT64 gateway',
    pros: ['IPv6-only networks reach IPv4 internet', 'Combined with DNS64 is fully transparent', 'No dual-stack on client required'],
    cons: ['Requires DNS64 resolver for AAAA synthesis', 'Does not work for IPv4-embedded protocols', 'Stateful — single point of failure'],
    useCase: 'Mobile networks (especially LTE/5G) and cloud environments transitioning to IPv6-only.',
    color: '#8b5cf6',
  },
]

function NatTypeComparator() {
  const [selected, setSelected] = useState(2)
  const nat = NAT_TYPES[selected]

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>NAT Type Comparator</h3>
      <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--text-muted)' }}>Select a NAT type to compare behavior, use cases, and trade-offs.</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {NAT_TYPES.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setSelected(i)}
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              border: `1px solid ${i === selected ? t.color : 'var(--border)'}`,
              background: i === selected ? t.color : 'var(--surface)',
              color: i === selected ? '#fff' : 'var(--text-muted)',
              fontSize: 13,
              fontWeight: i === selected ? 700 : 400,
              cursor: 'pointer',
            }}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div style={{ background: 'var(--surface)', border: `1px solid ${nat.color}`, borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ background: nat.color, color: '#fff', padding: '12px 16px' }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>{nat.name}</span>
          <span style={{ marginLeft: 12, fontSize: 13, opacity: 0.9 }}>({nat.also})</span>
        </div>
        <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>TRAFFIC DIRECTION</p>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--text)' }}>{nat.direction}</p>
          </div>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>ADDRESS RATIO</p>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--text)' }}>{nat.ratio}</p>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <p style={{ margin: '0 0 4px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>EXAMPLE TRANSLATION</p>
            <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12.5, color: nat.color }}>{nat.example}</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', padding: '14px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <p style={{ margin: '0 0 8px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>ADVANTAGES</p>
            {nat.pros.map(p => (
              <p key={p} style={{ margin: '0 0 4px', fontSize: 13, color: 'var(--text)' }}>
                <span style={{ color: G, marginRight: 6 }}>✓</span>{p}
              </p>
            ))}
          </div>
          <div>
            <p style={{ margin: '0 0 8px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>LIMITATIONS</p>
            {nat.cons.map(c => (
              <p key={c} style={{ margin: '0 0 4px', fontSize: 13, color: 'var(--text)' }}>
                <span style={{ color: '#ef4444', marginRight: 6 }}>✗</span>{c}
              </p>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', padding: '12px 16px', background: `${nat.color}0a` }}>
          <p style={{ margin: '0 0 4px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>PRIMARY USE CASE</p>
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text)', lineHeight: 1.6 }}>{nat.useCase}</p>
        </div>
      </div>
    </div>
  )
}

/* ── Main export ──────────────────────────────────────────────────────────── */

export default function NatAndDhcp() {
  return (
    <LearnLayout
      title="NAT and DHCP"
      description="A deep-dive into how NAT stretches IPv4 address space across billions of devices, how DHCP automates address assignment, and the subtle failure modes and security implications lurking beneath both protocols."
      section="Networking Fundamentals — Module 18"
      readTime="22–30 min"
      updatedAt="May 2026"
    >
      {/* Chapter 01 */}
      <Chapter n={1} />
      <H2>The Address Crisis That Never Ended</H2>

      <StoryBox>
        In 1981, RFC 791 assigned IPv4 its 32-bit address space: 4.29 billion addresses. The designers figured that was plenty — there were fewer than 1,000 machines on ARPANET. They were spectacularly wrong.
        <br /><br />
        By 1990, the internet was growing 20% per month. By 1994, researchers calculated IPv4 exhaustion by 2008 at current allocation rates. Two solutions emerged: a long-term fix (IPv6) and an immediate bandage (NAT). IPv6 was standardized in 1998. NAT was already deployed in 1994. Here we are in 2026, and IPv4 with NAT is still the dominant address scheme in billions of devices.
        <br /><br />
        The bandage became the foundation.
      </StoryBox>

      <Para>Network Address Translation (NAT) allows an entire private network to share one or a few public IP addresses. The principle: routers rewrite packet headers at the boundary between private and public address space, maintaining a translation table that maps inside addresses to outside addresses and back. From the internet&apos;s perspective, all devices behind a NAT share a single identity.</Para>

      <Para>NAT is defined in RFC 2663 (terminology) and RFC 3022 (traditional NAT). It enables three private address ranges defined in RFC 1918 — <Code>10.0.0.0/8</Code>, <Code>172.16.0.0/12</Code>, and <Code>192.168.0.0/16</Code> — to be reused in billions of networks simultaneously without conflict.</Para>

      <WowBox>
        IANA allocated the last IPv4 /8 blocks to Regional Internet Registries in February 2011. APNIC (Asia-Pacific) ran out of general allocation space in April 2011. RIPE NCC (Europe) ran out in September 2012. ARIN (North America) exhausted its pool in September 2015. Yet IPv4 traffic continues to grow — organizations buy, sell, and lease IPv4 addresses on a secondary market where a single /24 block (256 addresses) can sell for $40,000–$60,000.
      </WowBox>

      <H3>The RFC 1918 Private Address Space</H3>
      <Para>Three ranges are reserved for private use — never routed on the public internet:</Para>
      <Para>• <Code>10.0.0.0/8</Code>: Class A equivalent — 16,777,216 host addresses. Used by large enterprises and cloud VPCs.</Para>
      <Para>• <Code>172.16.0.0/12</Code>: Covers 172.16.0.0 – 172.31.255.255 — 1,048,576 addresses. Common in medium enterprises.</Para>
      <Para>• <Code>192.168.0.0/16</Code>: 65,536 addresses. The home/SMB standard — virtually every home router defaults to <Code>192.168.1.0/24</Code>.</Para>

      <Para>Additionally, <Code>100.64.0.0/10</Code> (RFC 6598) is reserved for <Accent>Carrier-Grade NAT (CGNAT)</Accent> — a second layer of NAT where ISPs aggregate multiple customers behind a single public IP, compounding the address translation problem.</Para>

      <Divider />

      {/* Chapter 02 */}
      <Chapter n={2} />
      <H2>NAT Types — Static, Dynamic, and PAT</H2>

      <StoryBox>
        A company has three types of needs: servers that the internet must reach (need a stable public IP), employees who browse the web (just need internet access), and branch offices that need IPv6-only connectivity to reach legacy IPv4 content. Each need calls for a different NAT mechanism.
        <br /><br />
        This is not one protocol — it is a family of address translation techniques that share a common mechanism but differ in mapping permanence, direction, and address ratio.
      </StoryBox>

      <NatTypeComparator />

      <H3>PAT — How Port Multiplexing Works</H3>
      <Para>PAT (Port Address Translation) — also called NAT Overload or IP Masquerade — is the most widely deployed form of NAT. It allows thousands of inside hosts to share a single public IP by differentiating flows using transport layer port numbers.</Para>

      <Para>The NAT router maintains a connection tracking table mapping <Code>(inside_ip, inside_port, protocol)</Code> → <Code>(outside_ip, outside_port)</Code>. When a packet arrives from the inside:</Para>
      <Para>1. Router looks up the source IP:port in the NAT table. If no entry, creates one, assigning an available ephemeral port from the router&apos;s public IP.</Para>
      <Para>2. Router rewrites the source IP to the public IP and the source port to the assigned port.</Para>
      <Para>3. Router forwards the packet. When the reply arrives at the public IP and assigned port, the router reverses the translation.</Para>

      <CodeBlock>{`# Cisco IOS PAT configuration
! Define inside interface (private side)
interface GigabitEthernet0/0
  ip address 192.168.1.1 255.255.255.0
  ip nat inside

! Define outside interface (public side)
interface GigabitEthernet0/1
  ip address 203.0.113.5 255.255.255.252
  ip nat outside

! Define which inside traffic gets translated
access-list 1 permit 192.168.0.0 0.0.255.255

! Enable PAT (overload = PAT mode)
ip nat inside source list 1 interface GigabitEthernet0/1 overload

! Verify
show ip nat translations                   ! Live translation table
show ip nat translations verbose           ! With timing info
show ip nat statistics                     ! Hit counts, miss counts, translation table size`}</CodeBlock>

      <Warn>
        The NAT translation table has a maximum size and per-entry timeouts. TCP entries default to 86400s (24 hours after connection established), but UDP entries expire in 300s. For high-traffic networks, this table can become the bottleneck. Monitor <Code>show ip nat statistics</Code> for &quot;expired translations&quot; and &quot;max_entries&quot; warnings. Aggressive UDP applications (DNS, video streaming) can exhaust the table if timeouts are too long.
      </Warn>

      <Divider />

      {/* Chapter 03 */}
      <Chapter n={3} />
      <H2>The NAT Translation Table in Detail</H2>

      <StoryBox>
        When you type a URL in your browser, six to twenty separate TCP connections may be created — one per image, CSS file, font, JavaScript bundle. Each connection gets its own row in the NAT table. For an office with 200 employees each with a browser open, the NAT table can easily have 10,000–50,000 active entries. The router must search this table at line-rate for every packet in both directions.
        <br /><br />
        This is not a trivial data structure problem. Modern NAT routers use hash tables indexed by the 5-tuple (source IP, source port, destination IP, destination port, protocol) for O(1) lookups. The table itself lives in the router&apos;s dedicated memory, separate from the routing table.
      </StoryBox>

      <NatTableSimulator />

      <H3>NAT and Application Layer Gateways (ALGs)</H3>
      <Para>PAT works cleanly for protocols where addresses are only in IP/TCP headers. But some protocols embed IP addresses in the application payload — and those embedded addresses are not translated by basic NAT:</Para>

      <Para>• <Accent>FTP Active Mode</Accent>: the client sends its IP:port in the DATA channel within the PORT command. The server tries to connect back to that private IP — which is unreachable from the internet. Fix: FTP Passive Mode (PASV) or NAT FTP ALG.</Para>
      <Para>• <Accent>SIP (VoIP)</Accent>: Session Description Protocol (SDP) bodies embed IP:port for media streams. NAT breaks SIP without a SIP ALG or STUN/TURN infrastructure.</Para>
      <Para>• <Accent>IPsec ESP</Accent>: ESP encrypts the entire packet including port numbers, so NAT cannot track connections. NAT-T (UDP port 4500 encapsulation) wraps ESP in UDP to work around this.</Para>
      <Para>• <Accent>WebRTC</Accent>: uses ICE (Interactive Connectivity Establishment) with STUN/TURN to discover and traverse NAT, establishing peer-to-peer paths even behind symmetric NAT.</Para>

      <WowBox>
        Symmetric NAT (where each unique destination gets a different translated port) breaks STUN-based NAT traversal. WebRTC applications must fall back to TURN relay servers when both peers are behind symmetric NAT — which routes all media traffic through a TURN server rather than peer-to-peer. This is why some corporate networks with strict NAT policies cause WebRTC video calls to be significantly slower — all video traffic is relayed instead of going direct.
      </WowBox>

      <Divider />

      {/* Chapter 04 */}
      <Chapter n={4} />
      <H2>NAT Security Implications</H2>

      <StoryBox>
        &quot;NAT gives us a free firewall&quot; is one of the most dangerous myths in network security. A NAT router does drop inbound connections by default — there is no translation entry, so the packet is discarded. But this is a side effect of stateful connection tracking, not a security policy. The moment you add port forwarding, the &quot;firewall&quot; has a specific hole. And the moment a device inside the NAT initiates any outbound connection, that connection is tracked and inbound traffic on that session is welcomed.
        <br /><br />
        A real firewall enforces policies based on application, user identity, threat intelligence, and content inspection. NAT enforces nothing — it just manages address translation.
      </StoryBox>

      <Para>NAT does provide <Accent>implicit inbound filtering</Accent> for unsolicited traffic — packets arriving at the public IP without an existing translation entry are dropped because there is nowhere to forward them. This incidentally blocks many opportunistic scans and unsolicited inbound connections.</Para>

      <Para>But NAT provides <Accent>zero protection</Accent> against:</Para>
      <Para>• Malware that initiates outbound connections (C2 callbacks, data exfiltration)</Para>
      <Para>• Drive-by downloads and browser exploits</Para>
      <Para>• DNS-based attacks and DNS exfiltration</Para>
      <Para>• Any attack embedded within allowed application traffic (HTTP, HTTPS)</Para>
      <Para>• IPv6 traffic (if IPv6 is deployed alongside NAT IPv4, it bypasses NAT entirely)</Para>

      <Warn>
        If IPv6 is enabled alongside NAT IPv4 (dual-stack), every device has a globally routable IPv6 address. Those IPv6 addresses are NOT behind NAT and have no equivalent &quot;implicit inbound filtering&quot; — unless your firewall explicitly blocks inbound IPv6 traffic. Many corporate networks deploy NAT on IPv4 but forget to apply equivalent firewall rules to IPv6, creating a wide-open attack surface on the IPv6 side.
      </Warn>

      <H3>CGNAT and Port Exhaustion</H3>
      <Para>Carrier-Grade NAT (CGNAT, RFC 6888) applies a second NAT layer at the ISP level: thousands of customers share a block of public IPs in the <Code>100.64.0.0/10</Code> range. This solves the ISP&apos;s IPv4 exhaustion but introduces severe problems for applications:</Para>
      <Para>• Port forwarding for home servers is impossible (customer gets a CGNAT IP, not a real public IP)</Para>
      <Para>• Law enforcement tracing by IP becomes ambiguous (thousands of customers share one IP at any moment)</Para>
      <Para>• Some gaming platforms, WebRTC, and VPN protocols fail behind double-NAT</Para>
      <Para>• IP reputation systems mistakenly penalize the shared CGNAT IP for any single misbehaving customer</Para>

      <Divider />

      {/* Chapter 05 */}
      <Chapter n={5} />
      <H2>DHCP — Automatic Address Assignment</H2>

      <StoryBox>
        Before DHCP, every device on a network needed a manually assigned IP address. In 1990, a university sysadmin managing 500 workstations spent significant time just tracking IP assignments in a spreadsheet. One typo — two machines with the same IP — and a mystery network outage would follow.
        <br /><br />
        RARP (Reverse ARP) attempted to solve this in the 1980s by letting diskless workstations request an IP. BOOTP improved it with more options. Then RFC 2131 (1997) defined DHCP, which added dynamic leasing, automatic expiry, and a rich options framework. Today DHCP runs on every network — from home routers to hyperscale clouds — managing billions of address assignments.
      </StoryBox>

      <Para>DHCP (Dynamic Host Configuration Protocol) automates the assignment of: <Accent>IP address</Accent>, <Accent>subnet mask</Accent>, <Accent>default gateway</Accent>, <Accent>DNS servers</Accent>, and hundreds of optional parameters (NTP servers, domain name, TFTP server for PXE boot, WPAD URL for proxy autoconfiguration, etc.).</Para>

      <Para>DHCP is a client-server protocol running over UDP: clients use port 68, servers use port 67. The exchange is the <Accent>DORA handshake</Accent>: Discover → Offer → Request → Acknowledge.</Para>

      <Divider />

      {/* Chapter 06 */}
      <Chapter n={6} />
      <H2>The DORA Exchange — Packet by Packet</H2>

      <StoryBox>
        A new laptop joins a Wi-Fi network. It has no IP address, no gateway, no DNS — it knows nothing about the network except the link-layer connection. Within milliseconds of joining, it begins the DORA exchange, and within a second or two it has a fully configured IP stack. This happens billions of times per day on every network on the planet. The DORA sequence is a masterpiece of bootstrap protocol design.
      </StoryBox>

      <DhcpDoraWalkthrough />

      <H3>DHCP Lease Lifecycle</H3>
      <Para>DHCP leases follow a three-phase lifecycle after DORA completes:</Para>
      <Para>• <Accent>T1 (Renewal Time)</Accent>: at 50% of lease duration, the client sends a unicast DHCPREQUEST directly to the server that granted the lease. If the server responds with DHCPACK, the lease is renewed with a fresh duration. Most deployments default T1 to 50% of lease time.</Para>
      <Para>• <Accent>T2 (Rebind Time)</Accent>: at 87.5% of lease duration, if T1 renewal failed, the client broadcasts DHCPREQUEST to any DHCP server. This allows a different server to take over the lease if the original server is unavailable.</Para>
      <Para>• <Accent>Expiry</Accent>: if T2 also fails, the lease expires. The client must start a new DORA exchange and will likely receive a different IP address.</Para>

      <CodeBlock>{`# Cisco IOS DHCP server configuration
! Define excluded addresses (routers, printers, servers — never auto-assign these)
ip dhcp excluded-address 192.168.1.1 192.168.1.20

! Define DHCP pool
ip dhcp pool OFFICE
  network 192.168.1.0 255.255.255.0    ! Address space
  default-router 192.168.1.1           ! Option 3: gateway
  dns-server 8.8.8.8 8.8.4.4          ! Option 6: DNS
  domain-name corp.example.com        ! Option 15: domain
  lease 1                              ! Lease duration: 1 day (86400s)
  netbios-node-type h-node             ! Option 46: WINS type (Windows)

! Static DHCP binding (always give this MAC the same IP)
ip dhcp pool PRINTER-FLOOR2
  host 192.168.1.50 255.255.255.0
  hardware-address 00:1A:2B:3C:4D:5E
  default-router 192.168.1.1

! Verify
show ip dhcp binding                   ! All active leases (IP, MAC, expiry)
show ip dhcp pool                      ! Pool utilization stats
show ip dhcp conflict                  ! IPs that caused conflicts (duplicate detection)
debug ip dhcp server events            ! Live DORA trace`}</CodeBlock>

      <Divider />

      {/* Chapter 07 */}
      <Chapter n={7} />
      <H2>DHCP Relay — Crossing Layer 3 Boundaries</H2>

      <StoryBox>
        DHCP Discover is a broadcast. It reaches every device on the local subnet, but it does not cross a router. A large enterprise with 50 VLANs would need 50 separate DHCP servers — one per subnet — if broadcasts were the only mechanism. That is obviously impractical. The solution is the DHCP relay agent (RFC 3046): a router or Layer 3 switch that intercepts DHCP broadcasts and forwards them as unicasts to a central DHCP server.
      </StoryBox>

      <Para>The DHCP relay agent (also called IP Helper) receives the broadcast DISCOVER on the client&apos;s VLAN interface, records the incoming interface IP (the subnet gateway) as the <Accent>giaddr (gateway IP address)</Accent> field in the DHCP packet, and forwards it as a unicast UDP packet to the configured DHCP server. The server uses giaddr to determine which pool to allocate from. The server&apos;s reply is unicast back to the relay agent, which forwards it to the client.</Para>

      <CodeBlock>{`! Configure DHCP relay on the VLAN interface
interface Vlan10
  ip address 10.10.0.1 255.255.0.0
  ip helper-address 192.168.1.100     ! Forward DHCP broadcasts to this server
  ip helper-address 192.168.1.101     ! Second DHCP server for redundancy

! ip helper-address forwards 8 UDP services by default:
!   TFTP (69), DNS (53), DHCP/BOOTP (67/68), TACACS (49),
!   NetBIOS Name Service (137/138), IEN-116 Name Service (42), Time (37)
! To restrict to DHCP only:
no ip forward-protocol udp 69        ! Disable TFTP forwarding
no ip forward-protocol udp 137       ! Disable NetBIOS forwarding

! Verify relay operation
debug ip dhcp server packet           ! See DISCOVER arriving from relay (giaddr set)`}</CodeBlock>

      <Warn>
        If you configure <Code>ip helper-address</Code> but DHCP clients still get no IP, check: (1) the DHCP server has a pool matching the giaddr subnet, (2) the server can route replies back to the relay agent&apos;s IP (the gateway interface), and (3) no ACL on the router is blocking UDP 67/68. A common mistake is forgetting to add the DHCP subnet to the excluded-address list on the server, causing the server to offer the gateway&apos;s own IP to clients.
      </Warn>

      <Divider />

      {/* Chapter 08 */}
      <Chapter n={8} />
      <H2>DHCPv6 and SLAAC — Address Assignment in IPv6</H2>

      <StoryBox>
        IPv6 was designed partly to eliminate the need for NAT by giving every device a globally unique address. It also designed address assignment to be simpler than DHCPv4 — specifically, to allow devices to configure themselves without any server at all using SLAAC (Stateless Address Autoconfiguration). But then enterprises needed features like DNS provisioning and prefix delegation, so DHCPv6 was created. And then we discovered that some environments need SLAAC for address assignment and DHCPv6 just for options. So now IPv6 has three address assignment methods and two flags to control which ones are used.
        <br /><br />
        Welcome to the glorious complexity of IPv6 address management.
      </StoryBox>

      <Para>IPv6 address assignment uses three mechanisms, controlled by flags in Router Advertisements (RA):</Para>

      <Para>• <Accent>SLAAC (Stateless Address Autoconfiguration)</Accent>: the client uses the router&apos;s advertised prefix + its own interface identifier (EUI-64 or random) to construct an address. No server needed. The RA M-flag = 0 and O-flag = 0 indicates pure SLAAC.</Para>

      <Para>• <Accent>Stateless DHCPv6</Accent>: SLAAC for address + DHCPv6 for options (DNS servers, domain name). RA has M-flag = 0, O-flag = 1. The client autoconfigures its address from the prefix but queries a DHCPv6 server for configuration options only.</Para>

      <Para>• <Accent>Stateful DHCPv6</Accent>: DHCPv6 assigns both address and options, like DHCPv4. RA has M-flag = 1. Server maintains a binding database. Required for environments that need to control exactly which address each client gets.</Para>

      <CodeBlock>{`! IPv6 Router Advertisement configuration (IOS)
interface GigabitEthernet0/0
  ipv6 address 2001:db8:1::1/64
  ipv6 nd managed-config-flag         ! M-flag = 1: use stateful DHCPv6 for address
  ipv6 nd other-config-flag           ! O-flag = 1: use DHCPv6 for options

! Stateful DHCPv6 pool
ipv6 dhcp pool OFFICE-V6
  address prefix 2001:db8:1::/64 lifetime 86400 3600
  dns-server 2001:4860:4860::8888
  domain-name corp.example.com

interface GigabitEthernet0/0
  ipv6 dhcp server OFFICE-V6

! DHCPv6 relay (like ip helper-address for IPv6)
interface Vlan20
  ipv6 address 2001:db8:2::1/64
  ipv6 dhcp relay destination 2001:db8:255::100 GigabitEthernet0/1

! Verify
show ipv6 dhcp binding                ! Active DHCPv6 leases
show ipv6 neighbors                   ! NDP neighbor table (IPv6 ARP equivalent)`}</CodeBlock>

      <WowBox>
        SLAAC&apos;s EUI-64 address generation creates a privacy problem: it embeds the device&apos;s MAC address in the IPv6 address, making it trackable across networks. RFC 4941 (Privacy Extensions for SLAAC) addresses this by generating a random 64-bit interface ID that changes periodically. Modern operating systems (Windows, macOS, Linux) use RFC 4941 by default, generating temporary addresses for outbound connections while keeping a stable &quot;stable privacy&quot; address for inbound services.
      </WowBox>

      <Divider />

      {/* Chapter 09 */}
      <Chapter n={9} />
      <H2>DHCP Security — Starvation, Spoofing, and Snooping</H2>

      <StoryBox>
        An attacker on a shared Ethernet segment runs a tool that sends thousands of DHCPDISCOVER messages with spoofed MAC addresses. The legitimate DHCP server exhausts its address pool responding to fake requests. Within seconds, new clients on the segment cannot get an IP address — a DHCP starvation attack.
        <br /><br />
        Then the attacker sets up a rogue DHCP server that hands out addresses with the attacker&apos;s machine as the default gateway — a DHCP spoofing attack. New clients configure themselves with the rogue gateway and all their traffic flows through the attacker. This is a man-in-the-middle attack achieved entirely through DHCP.
        <br /><br />
        Neither attack requires any hacking skill — they require only a laptop, a free tool, and access to a switch port.
      </StoryBox>

      <Para>DHCP attacks are among the most accessible Layer 2 attacks. The defenses are built into modern switches:</Para>

      <Para><Accent>DHCP Snooping</Accent> (IEEE 802.1Q): the switch differentiates between trusted ports (connecting to DHCP servers) and untrusted ports (connecting to clients). DHCP OFFER and DHCPACK messages on untrusted ports are dropped. The switch also builds a DHCP snooping binding table (IP-to-MAC-to-port mappings) that feeds Dynamic ARP Inspection and IP Source Guard.</Para>

      <CodeBlock>{`! Enable DHCP snooping (Cisco IOS-based switch)
ip dhcp snooping                           ! Enable globally
ip dhcp snooping vlan 10,20,30             ! Enable on specific VLANs

! Mark the uplink to DHCP server as trusted
interface GigabitEthernet0/24
  ip dhcp snooping trust                   ! Allow DHCP server responses

! Rate-limit client-facing ports (starvation defense)
interface GigabitEthernet0/1
  ip dhcp snooping limit rate 15           ! Max 15 DHCP packets/second

! Verify
show ip dhcp snooping binding              ! Binding table (IP, MAC, VLAN, port)
show ip dhcp snooping statistics           ! Dropped messages by reason

! Dynamic ARP Inspection (builds on snooping table)
ip arp inspection vlan 10,20,30
interface GigabitEthernet0/24
  ip arp inspection trust                  ! Only trust ARP from this uplink`}</CodeBlock>

      <Warn>
        DHCP snooping inserts a DHCP option 82 (relay agent information) tag into packets forwarded by the switch. If the DHCP server is not configured to accept option 82 or strips it, clients may not receive responses. This is a common &quot;DHCP snooping breaks DHCP&quot; failure — check <Code>ip dhcp snooping information option</Code> and the server&apos;s option 82 handling configuration.
      </Warn>

      <Divider />

      {/* Chapter 10 */}
      <Chapter n={10} />
      <H2>NAT and Firewall Interaction</H2>

      <StoryBox>
        A company deploys a stateful firewall between the internet and the internal network. The firewall also does PAT. A security engineer wants to know: does NAT happen before or after firewall policy inspection? Does the firewall see the private IP or the public IP when evaluating rules?
        <br /><br />
        The answer depends entirely on the vendor and configuration. In Cisco ASA, NAT happens after firewall policy (policies reference pre-NAT addresses). In iptables/nftables, the order is controlled by the chain order (PREROUTING DNAT happens before FORWARD chain filtering). In Palo Alto, the firewall inspects using pre-NAT source and post-NAT destination by default. Getting this wrong means writing firewall rules that never match — a silent security failure.
      </StoryBox>

      <Para>Modern next-generation firewalls (NGFW) integrate NAT and firewall policy in a unified platform. Key behaviors to understand:</Para>

      <Para>• <Accent>Cisco ASA</Accent>: NAT rules are evaluated after access-list inspection. Firewall policy uses pre-NAT (real) addresses. Object NAT is evaluated before twice-NAT.</Para>
      <Para>• <Accent>Palo Alto Networks</Accent>: Security policy uses pre-NAT source and post-NAT destination for matching. NAT rules run in a separate evaluation pass.</Para>
      <Para>• <Accent>iptables (Linux)</Accent>: DNAT (destination NAT, port forwarding) happens in PREROUTING before the FORWARD chain. SNAT happens in POSTROUTING after the FORWARD chain. Rules in FORWARD see post-DNAT destination but pre-SNAT source.</Para>

      <CodeBlock>{`# Linux iptables NAT + firewall
# PREROUTING: port forward before firewall evaluation
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 443 -j DNAT --to-destination 192.168.1.100:443

# FORWARD: firewall rules see post-DNAT destination (192.168.1.100)
iptables -A FORWARD -d 192.168.1.100 -p tcp --dport 443 -m state --state NEW,ESTABLISHED -j ACCEPT

# POSTROUTING: PAT for all outbound traffic
iptables -t nat -A POSTROUTING -s 192.168.0.0/16 -o eth0 -j MASQUERADE

# nftables equivalent (modern Linux)
table ip nat {
    chain prerouting {
        type nat hook prerouting priority dstnat;
        iif eth0 tcp dport 443 dnat to 192.168.1.100:443
    }
    chain postrouting {
        type nat hook postrouting priority srcnat;
        oif eth0 masquerade
    }
}`}</CodeBlock>

      <Divider />

      {/* Chapter 11 */}
      <Chapter n={11} />
      <H2>DHCP Options Deep Dive</H2>

      <StoryBox>
        DHCP is not just about IP addresses. It is a general-purpose configuration distribution mechanism. A client can request dozens of parameters from the server, and the server can push options the client didn&apos;t even ask for. Enterprises use DHCP options to automate VoIP phone provisioning, push WPAD proxy URLs to browsers, direct PXE clients to the right TFTP server, and configure NTP servers — all without touching a single endpoint manually.
      </StoryBox>

      <Para>DHCP options use the TLV (Type-Length-Value) format defined in RFC 2132. Key options in production environments:</Para>

      <CodeBlock>{`DHCP Option Reference (RFC 2132 + extensions)
--
Option 1:   Subnet Mask           (e.g., 255.255.255.0)
Option 3:   Router / Default GW   (e.g., 192.168.1.1)
Option 6:   DNS Servers           (e.g., 8.8.8.8 8.8.4.4)
Option 12:  Hostname              (client sends its hostname)
Option 15:  Domain Name           (e.g., corp.example.com)
Option 42:  NTP Servers           (e.g., 192.168.1.5)
Option 43:  Vendor-Specific Info  (VoIP phones, APs, PDAs)
Option 51:  IP Address Lease Time (seconds)
Option 52:  Option Overload       (extends into sname/file fields)
Option 53:  DHCP Message Type     (DISCOVER/OFFER/REQUEST/ACK/etc.)
Option 54:  Server Identifier     (server's IP)
Option 55:  Parameter Request List (client's wish list)
Option 58:  Renewal Time T1       (default 50% of lease)
Option 59:  Rebind Time T2        (default 87.5% of lease)
Option 60:  Vendor Class ID       (client announces device type)
Option 66:  TFTP Server Name      (for PXE boot)
Option 67:  Bootfile Name         (for PXE boot)
Option 82:  Relay Agent Info      (switch port, circuit ID — anti-spoofing)
Option 121: Classless Static Routes (RFC 3442 — push specific routes)
Option 252: WPAD URL              (Web Proxy Auto-Discovery)`}</CodeBlock>

      <Para>Option 121 (Classless Static Routes) is particularly powerful — it lets DHCP push specific routing entries to clients. This can override the default gateway for specific prefixes, but it also creates a <Accent>security risk</Accent>: a rogue DHCP server injecting Option 121 with a route for 0.0.0.0/0 via an attacker-controlled gateway can completely redirect a client&apos;s traffic — including VPN traffic on some operating systems (the VPN bypass vulnerability documented in 2024).</Para>

      <Divider />

      {/* Chapter 12 */}
      <Chapter n={12} />
      <H2>Troubleshooting NAT and DHCP</H2>

      <StoryBox>
        A help desk ticket: &quot;I can&apos;t reach the internet from my laptop.&quot; The engineer checks: the laptop has a 169.254.x.x address — APIPA self-assigned, which means DHCP failed. The DHCP server is up. The relay agent is configured. A packet capture on the server shows DISCOVER packets arriving, but no OFFER going out. The reason: the server&apos;s address pool was exhausted — 800 leases with a 7-day lease time, and the building had been hosting a conference for a week. Every visitor&apos;s device took a lease and left, but the leases hadn&apos;t expired yet. Fix: reduce lease time to 4 hours for the conference VLAN, or clear expired leases manually.
      </StoryBox>

      <H3>DHCP Troubleshooting Commands</H3>
      <CodeBlock>{`! Client side (Windows)
ipconfig /all                          ! Show current DHCP lease, server IP, lease times
ipconfig /release                      ! Release the current lease
ipconfig /renew                        ! Perform new DORA exchange
netsh dhcp client show all

! Client side (Linux)
dhclient -v eth0                       ! Verbose DHCP client, shows DORA exchange
journalctl -u NetworkManager | grep DHCP

! Server side (IOS)
show ip dhcp binding                   ! Lease table — check utilization
show ip dhcp pool POOLNAME             ! Free vs. allocated addresses
show ip dhcp conflict                  ! IPs that triggered duplicate detection
clear ip dhcp binding *                ! Clear all leases (emergency fix for exhaustion)

! Relay debugging
debug ip dhcp server packet            ! Verify DISCOVER arrives with correct giaddr
show ip helper-address                 ! Check relay config`}</CodeBlock>

      <H3>NAT Troubleshooting Commands</H3>
      <CodeBlock>{`! Verify translation is happening
show ip nat translations               ! Active entries in NAT table
show ip nat translations verbose       ! With timeout remaining

! Statistics
show ip nat statistics                 ! Hits, misses, expired translations, pool usage

! Clear specific or all translations
clear ip nat translation *             ! Nuclear option — drops all active sessions

! Debug (use carefully — very verbose)
debug ip nat                           ! Live NAT event log
debug ip nat detailed                  ! Per-packet NAT decisions

! Check NAT is configured correctly
show running-config | include nat       ! Verify nat inside/outside and ip nat statements`}</CodeBlock>

      <Para>A common NAT issue is <Accent>asymmetric routing</Accent>: packets go out via the NAT router but return via a different path. The NAT router never sees the return traffic, so it never creates the reverse translation entry. The fix: ensure symmetric routing so both directions of a flow traverse the same NAT device, or use stateful NAT clusters with session synchronization.</Para>

      <Divider />

      {/* Chapter 13 */}
      <Chapter n={13} />
      <H2>Common Misconceptions</H2>

      <Err>
        <strong>NAT is a security feature that protects the internal network.</strong> NAT provides incidental inbound filtering as a side effect of stateful connection tracking. It is not a security mechanism. A properly configured stateful firewall with explicit deny-all default is required for actual security. NAT does nothing to stop outbound malware, exfiltration, or drive-by downloads. Relying on NAT as a security control creates false confidence and leaves real attack vectors unaddressed.
      </Err>

      <Err>
        <strong>DHCP leases are permanent once assigned.</strong> DHCP leases expire. A device that is off the network for longer than the lease duration will return to find its IP reassigned to another device. The new DORA exchange will give it a different IP. Applications that hard-code the DHCP-assigned IP will break. Use DHCP reservations (static bindings by MAC) for servers and infrastructure, or use static IP assignment. DHCP is designed for dynamic hosts.
      </Err>

      <Err>
        <strong>Two devices with the same IP on the same subnet can coexist without issues.</strong> Duplicate IP addresses cause intermittent connectivity for both devices and are extremely difficult to diagnose. ARP replies from both devices compete — whichever replied most recently wins in the neighbor&apos;s ARP cache, causing traffic to randomly route to one machine or the other. Use DHCP to prevent manual assignment conflicts, enable DAD (Duplicate Address Detection) for IPv6, and monitor DHCP conflict logs for early warning.
      </Err>

      <Err>
        <strong>DHCPv6 replaces SLAAC in IPv6.</strong> DHCPv6 and SLAAC coexist and serve different purposes. SLAAC uses Router Advertisement prefixes for address autoconfiguration; DHCPv6 provides options (DNS, domain). The M and O flags in RAs determine which mechanisms clients use. Many mobile devices and modern OSes prefer SLAAC + RDNSS (DNS option in RA, RFC 8106) over DHCPv6. Android famously ignored DHCPv6 for many years, relying entirely on SLAAC+RDNSS. In mixed environments, configure both mechanisms and verify with actual client behavior.
      </Err>

      <Err>
        <strong>DHCP snooping can be safely enabled without impact.</strong> Enabling DHCP snooping has several potential impacts: it drops DHCP OFFERs from untrusted ports (correct), inserts Option 82 into relayed packets (may break some servers), and can cause ACK delays if the binding table lookup is slow on high-traffic switches. Before enabling on production, audit all uplink ports are marked trusted and verify the DHCP server handles or ignores Option 82. Test in a maintenance window or lab first.
      </Err>

      <Err>
        <strong>NAT64 allows IPv6 clients to reach all IPv4 services transparently.</strong> NAT64 requires DNS64 to synthesize AAAA records from A records, allowing IPv6 clients to resolve IPv4-only hostnames. However, it does not work for applications that embed raw IPv4 addresses in application data (bypassing DNS), applications using DNSSEC (DNS64 synthesized records cannot be validated), or some applications that use IP literal addresses in their protocols. NAT64 + DNS64 covers most HTTP/S traffic but requires careful testing for legacy applications.
      </Err>

      <Divider />

      {/* Chapter 14 */}
      <Chapter n={14} />
      <H2>Depth Check</H2>

      <IQ level="Beginner">
        What is the difference between NAT and PAT? NAT (Network Address Translation) rewrites IP addresses in packet headers. PAT (Port Address Translation), also called NAT Overload, additionally rewrites port numbers — allowing many inside devices to share a single public IP by differentiating flows via port numbers. PAT is the dominant form in home/office routers (one public IP, many devices).
      </IQ>

      <IQ level="Beginner">
        What is the DORA sequence and what does each message do? DISCOVER: client broadcasts to find a server. OFFER: server proposes an IP address and configuration. REQUEST: client broadcasts acceptance of a specific offer (and implicitly rejects others). ACK: server confirms the lease. All four messages use UDP with source port 68 (client) and destination port 67 (server).
      </IQ>

      <IQ level="Intermediate">
        Why does DHCPREQUEST use broadcast even after the server already offered a unicast IP? The client must inform ALL DHCP servers which offer it accepted. If it unicasted only to the selected server, other servers would not know their offers were rejected and would hold their offered IP addresses in limbo indefinitely. The broadcast ensures all servers see the REQUEST, allowing un-selected servers to release their offered IPs back to their pools.
      </IQ>

      <IQ level="Senior">
        Explain how NAT affects TCP connection tracking and what happens during NAT table exhaustion. NAT maintains a 5-tuple entry (src_ip, src_port, dst_ip, dst_port, protocol) for each active flow. TCP states (SYN_SENT, ESTABLISHED, FIN_WAIT, TIME_WAIT) determine entry timeout — established TCP entries may persist 24 hours. Under exhaustion, the router cannot create new translation entries — new connection attempts are silently dropped. Recovery requires either clearing stale entries, reducing timeouts, adding public IPs to the NAT pool, or load-balancing across multiple NAT routers. Monitoring NAT table utilization is critical for capacity planning.
      </IQ>

      <IQ level="Senior">
        What is the DHCP Option 121 VPN bypass vulnerability and how does it work? RFC 3442 Option 121 allows DHCP to push classless static routes to clients. A rogue DHCP server (or one controlled by an attacker on a network) can push a route for the VPN server&apos;s IP via the attacker&apos;s gateway — before the VPN tunnel is established. Some VPN clients (particularly split-tunnel configurations) honor these routes and send pre-tunnel traffic to the VPN server via the rogue gateway, allowing the attacker to intercept credentials. Mitigation: use full-tunnel VPN (all traffic inside tunnel), use network-based firewall policies, and configure OS-level DHCP option 121 ignore settings where supported.
      </IQ>

      <IQ level="PhD">
        How does NAT interact with TCP sequence number randomization and what are the implications for connection reuse attacks? NAT routers that perform TCP sequence number randomization (ISN randomization) rewrite sequence numbers in addition to addresses and ports. This prevents blind TCP injection attacks that exploit predictable ISNs. However, this introduces state: the NAT router must track the ISN offset for each connection to translate sequence numbers in both directions. If the NAT entry is cleared (timeout or failure) and the TCP session is reused (same 5-tuple), the router sees incorrect sequence numbers and drops packets with RST. This is why NAT timeouts must be longer than typical TCP TIME_WAIT (120s default, 2 × MSL). In high-connection-rate environments (load balancers, API gateways), ISN translation adds measurable CPU overhead — some production NAT implementations disable it, accepting the security trade-off in exchange for performance at scale.
      </IQ>

      <Divider />

      <KeyTakeaways items={[
        'NAT stretches IPv4 by rewriting packet headers at private/public boundaries. PAT multiplexes thousands of private hosts through a single public IP using port number differentiation.',
        'The NAT translation table maps (inside_ip, inside_port, protocol) → (outside_ip, outside_port). Table exhaustion silently drops new connections — monitor utilization proactively.',
        'NAT is NOT a security feature. It provides incidental inbound filtering as a side effect of connection tracking, but provides zero protection against outbound malware, exfiltration, or application-layer attacks.',
        'DHCP DORA sequence: DISCOVER (0.0.0.0 → 255.255.255.255) → OFFER (server → broadcast) → REQUEST (0.0.0.0 → broadcast, announces selected server) → ACK (server confirms lease).',
        'DHCPREQUEST is broadcast — not unicast — so all DHCP servers learn which offer was accepted and can release their offers back to their pools.',
        'DHCP relay agents (ip helper-address) forward broadcast DISCOVER as unicast to a central server, stamping the giaddr field with the relay interface IP so the server knows which pool to allocate from.',
        'DHCP snooping protects against rogue DHCP servers by classifying switch ports as trusted (uplinks to real servers) or untrusted (client ports). OFFER/ACK from untrusted ports are dropped.',
        'IPv6 uses SLAAC (prefix + EUI-64/random interface ID), stateless DHCPv6 (SLAAC address + DHCPv6 options), or stateful DHCPv6 (DHCPv6 assigns everything). M and O flags in Router Advertisements select the mode.',
        'DHCP Option 121 (classless static routes) can be weaponized by rogue DHCP servers to redirect traffic before VPN tunnels establish — a real attack vector requiring full-tunnel VPN or OS-level mitigation.',
        'Duplicate IP addresses cause random connectivity failures for both conflicting devices. Prevent with DHCP for dynamic hosts, static reservations for infrastructure, and DHCP conflict monitoring.',
      ]} />
    </LearnLayout>
  )
}
