'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

// ─── helper components ────────────────────────────────────────────────────────
const Chapter = ({ n, title }: { n: number; title: string }) => (
  <div style={{ marginBottom: '0.25rem' }}>
    <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6366f1' }}>
      Chapter {n}
    </span>
    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', margin: '0.25rem 0 0.75rem' }}>{title}</h2>
  </div>
)
const Divider = () => <hr style={{ border: 'none', borderTop: '2px solid #e2e8f0', margin: '2.5rem 0' }} />
const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ lineHeight: 1.85, color: '#334155', marginBottom: '1rem', fontSize: '1.02rem' }}>{children}</p>
)
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b', margin: '1.75rem 0 0.6rem' }}>{children}</h2>
)
const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#475569', margin: '1.25rem 0 0.4rem' }}>{children}</h3>
)
const Accent = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontWeight: 700, color: '#6366f1' }}>{children}</span>
)
const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '0.1rem 0.4rem', fontSize: '0.88rem', fontFamily: 'monospace', color: '#0f172a' }}>{children}</code>
)
const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '10px', padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontFamily: 'monospace', overflowX: 'auto', lineHeight: 1.7, margin: '1rem 0' }}>
    <code>{children}</code>
  </pre>
)
const StoryBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'linear-gradient(135deg,#f0f9ff,#e0f2fe)', border: '2px solid #0ea5e9', borderRadius: '12px', padding: '1.25rem 1.5rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#0c4a6e' }}>
    {children}
  </div>
)
const WowBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'linear-gradient(135deg,#fdf4ff,#fae8ff)', border: '2px solid #a855f7', borderRadius: '12px', padding: '1.25rem 1.5rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#581c87' }}>
    <span style={{ fontWeight: 800, color: '#7c3aed' }}>WOW: </span>{children}
  </div>
)
const Warn = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#fffbeb', border: '2px solid #f59e0b', borderRadius: '12px', padding: '1.25rem 1.5rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#78350f' }}>
    <span style={{ fontWeight: 800, color: '#d97706' }}>WARN: </span>{children}
  </div>
)
const Err = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#fff1f2', border: '2px solid #f43f5e', borderRadius: '12px', padding: '1.25rem 1.5rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#881337' }}>
    <span style={{ fontWeight: 800, color: '#e11d48' }}>MISCONCEPTION: </span>{children}
  </div>
)
const LEVEL_COLORS: Record<string, string> = {
  Beginner: '#10b981', Intermediate: '#3b82f6', Senior: '#8b5cf6', PhD: '#f97316'
}
const IQ = ({ level, children }: { level: string; children: React.ReactNode }) => (
  <div style={{ background: '#f8fafc', border: `2px solid ${LEVEL_COLORS[level]}`, borderRadius: '12px', padding: '1.25rem 1.5rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#1e293b' }}>
    <span style={{ display: 'inline-block', background: LEVEL_COLORS[level], color: '#fff', fontWeight: 700, fontSize: '0.75rem', borderRadius: '6px', padding: '0.15rem 0.6rem', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>{level}</span>
    <div>{children}</div>
  </div>
)

// ─── interactive component 1: DORA Handshake Visualizer ──────────────────────
type DoraStep = {
  id: number
  name: string
  direction: 'Client→Server' | 'Server→Client' | 'Broadcast'
  type: 'discover' | 'offer' | 'request' | 'ack'
  srcIp: string
  dstIp: string
  srcPort: number
  dstPort: number
  detail: string
  keyFields: string[]
}
const DORA_STEPS: DoraStep[] = [
  {
    id: 1, name: 'DHCPDISCOVER', direction: 'Broadcast', type: 'discover',
    srcIp: '0.0.0.0', dstIp: '255.255.255.255', srcPort: 68, dstPort: 67,
    detail: 'Client has no IP yet. Broadcasts a DHCPDISCOVER with its MAC address. All DHCP servers on the subnet hear it. Client includes a transaction ID (xid) to match responses.',
    keyFields: ['xid: 0x3903F326', 'chaddr: AA:BB:CC:DD:EE:FF (client MAC)', 'ciaddr: 0.0.0.0 (client has no IP)', 'Option 53: DHCP Discover', 'Option 55: Parameter Request List (gateway, subnet, DNS, NTP...)'],
  },
  {
    id: 2, name: 'DHCPOFFER', direction: 'Server→Client', type: 'offer',
    srcIp: '192.168.1.1', dstIp: '255.255.255.255', srcPort: 67, dstPort: 68,
    detail: 'Each DHCP server that received the DISCOVER replies with an OFFER, proposing an IP address. Server temporarily reserves the IP. Multiple servers may respond; client picks one.',
    keyFields: ['xid: 0x3903F326 (matches client)', 'yiaddr: 192.168.1.100 (offered IP)', 'siaddr: 192.168.1.1 (server IP)', 'Option 53: DHCP Offer', 'Option 51: Lease time (86400s = 24h)', 'Option 1: Subnet mask 255.255.255.0', 'Option 3: Default gateway 192.168.1.1', 'Option 6: DNS servers 8.8.8.8, 8.8.4.4'],
  },
  {
    id: 3, name: 'DHCPREQUEST', direction: 'Broadcast', type: 'request',
    srcIp: '0.0.0.0', dstIp: '255.255.255.255', srcPort: 68, dstPort: 67,
    detail: 'Client broadcasts a REQUEST announcing which offer it accepted (by including the server identifier). Broadcasting informs all servers — those not selected release their reserved IPs.',
    keyFields: ['xid: 0x3903F326', 'Option 53: DHCP Request', 'Option 54: Server Identifier 192.168.1.1 (selected server)', 'Option 50: Requested IP 192.168.1.100'],
  },
  {
    id: 4, name: 'DHCPACK', direction: 'Server→Client', type: 'ack',
    srcIp: '192.168.1.1', dstIp: '255.255.255.255', srcPort: 67, dstPort: 68,
    detail: 'Selected server confirms the lease with an ACK. Client configures its network interface with the assigned IP, subnet mask, gateway, and DNS. The lease clock starts.',
    keyFields: ['xid: 0x3903F326', 'yiaddr: 192.168.1.100 (confirmed IP)', 'Option 53: DHCP ACK', 'Option 51: Lease time 86400s', 'Option 58: T1 renewal time 43200s (50% of lease)', 'Option 59: T2 rebind time 75600s (87.5% of lease)'],
  },
]
const DORA_COLORS = { discover: '#3b82f6', offer: '#10b981', request: '#f59e0b', ack: '#6366f1' }

function DoraHandshakeVisualizer() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #6366f1', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#6366f1', marginBottom: '0.25rem' }}>DHCP DORA Handshake</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Click each step to see the UDP packet fields and what they mean.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {DORA_STEPS.map(s => (
          <div key={s.id}
            onClick={() => setActive(active === s.id ? null : s.id)}
            style={{ cursor: 'pointer', borderRadius: '10px', border: `2px solid ${active === s.id ? DORA_COLORS[s.type] : '#e2e8f0'}`, background: active === s.id ? '#f0f4ff' : '#fff', padding: '0.75rem 1rem', transition: 'all 0.15s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ background: DORA_COLORS[s.type], color: '#fff', borderRadius: '8px', padding: '0.2rem 0.65rem', fontWeight: 800, fontSize: '0.82rem' }}>{s.id}</span>
              <span style={{ fontWeight: 800, color: '#1e293b', fontSize: '1rem', flex: 1 }}>{s.name}</span>
              <span style={{ color: '#64748b', fontSize: '0.82rem' }}>{s.srcIp}:{s.srcPort} → {s.dstIp}:{s.dstPort}</span>
            </div>
            {active === s.id && (
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ color: '#334155', lineHeight: 1.7, marginBottom: '0.75rem' }}>{s.detail}</div>
                <div style={{ background: '#0f172a', borderRadius: '8px', padding: '0.85rem 1rem', fontFamily: 'monospace', fontSize: '0.83rem', color: '#e2e8f0', lineHeight: 1.7 }}>
                  {s.keyFields.map((f, i) => <div key={i}>{f}</div>)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── interactive component 2: DHCP Options Explorer ─────────────────────────
type DhcpOption = {
  code: number
  name: string
  type: string
  description: string
  example: string
  category: 'network' | 'server' | 'timing' | 'advanced'
}
const DHCP_OPTIONS: DhcpOption[] = [
  { code: 1, name: 'Subnet Mask', type: 'IP', description: 'The subnet mask for the client\'s network segment.', example: '255.255.255.0', category: 'network' },
  { code: 3, name: 'Router (Default Gateway)', type: 'IP list', description: 'List of gateways ordered by preference. Client uses first entry as default route.', example: '192.168.1.1', category: 'network' },
  { code: 6, name: 'DNS Servers', type: 'IP list', description: 'DNS resolvers the client should use, in priority order.', example: '8.8.8.8, 8.8.4.4', category: 'network' },
  { code: 12, name: 'Hostname', type: 'String', description: 'Suggested hostname for the client. Client may ignore it.', example: 'workstation-42', category: 'network' },
  { code: 15, name: 'Domain Name', type: 'String', description: 'Default domain for DNS search. Appended to unqualified hostnames.', example: 'corp.example.com', category: 'network' },
  { code: 28, name: 'Broadcast Address', type: 'IP', description: 'The broadcast address for the client\'s subnet.', example: '192.168.1.255', category: 'network' },
  { code: 42, name: 'NTP Servers', type: 'IP list', description: 'Network Time Protocol servers for clock synchronization.', example: '192.168.1.1', category: 'network' },
  { code: 43, name: 'Vendor-Specific Info', type: 'Binary', description: 'Vendor-specific configuration. Used by VoIP phones (LLDP), thin clients, etc.', example: 'PXE boot server config', category: 'advanced' },
  { code: 50, name: 'Requested IP Address', type: 'IP', description: 'Client requests a specific IP (used when renewing or returning to known network).', example: '192.168.1.100', category: 'server' },
  { code: 51, name: 'IP Address Lease Time', type: 'uint32', description: 'Lease duration in seconds. Client must renew before this expires.', example: '86400 (24 hours)', category: 'timing' },
  { code: 53, name: 'DHCP Message Type', type: 'Enum', description: '1=Discover, 2=Offer, 3=Request, 4=Decline, 5=ACK, 6=NAK, 7=Release, 8=Inform', example: '5 (ACK)', category: 'server' },
  { code: 54, name: 'Server Identifier', type: 'IP', description: 'DHCP server\'s IP. Used by client to select which server\'s offer to accept.', example: '192.168.1.1', category: 'server' },
  { code: 55, name: 'Parameter Request List', type: 'Byte list', description: 'Client lists which options it wants in the response (option codes 1,3,6,15…).', example: '1, 3, 6, 15, 42', category: 'server' },
  { code: 58, name: 'T1 Renewal Time', type: 'uint32', description: 'Time after which client tries to renew directly with its server (typically 50% of lease).', example: '43200 (12 hours)', category: 'timing' },
  { code: 59, name: 'T2 Rebind Time', type: 'uint32', description: 'Time after which client broadcasts to any server (typically 87.5% of lease).', example: '75600 (21 hours)', category: 'timing' },
  { code: 60, name: 'Vendor Class Identifier', type: 'String', description: 'Client identifies its vendor/type. PXE clients use "PXEClient". Used for option 43 matching.', example: 'PXEClient:Arch:00000', category: 'advanced' },
  { code: 66, name: 'TFTP Server Name', type: 'String', description: 'For PXE boot: hostname or IP of TFTP server from which to download the bootloader.', example: 'pxeserver.corp', category: 'advanced' },
  { code: 67, name: 'Bootfile Name', type: 'String', description: 'For PXE boot: path to the bootloader file on the TFTP server.', example: 'pxelinux.0', category: 'advanced' },
  { code: 119, name: 'DNS Search Domain List', type: 'String list', description: 'Multiple DNS search domains. More flexible than option 15 (single domain).', example: 'corp.example.com, example.com', category: 'network' },
  { code: 121, name: 'Classless Static Routes', type: 'Route list', description: 'Static routes pushed to client: CIDR prefix + next-hop pairs. Overrides option 3 per RFC 3442.', example: '10.0.0.0/8 via 192.168.1.254', category: 'advanced' },
]
const OPT_CATS = ['all', 'network', 'server', 'timing', 'advanced'] as const
type OptCat = typeof OPT_CATS[number]
const OPT_CAT_COLOR: Record<OptCat, string> = { all: '#6366f1', network: '#10b981', server: '#3b82f6', timing: '#f59e0b', advanced: '#8b5cf6' }

function DhcpOptionsExplorer() {
  const [cat, setCat] = useState<OptCat>('network')
  const [active, setActive] = useState<number | null>(null)
  const visible = cat === 'all' ? DHCP_OPTIONS : DHCP_OPTIONS.filter(o => o.category === cat)

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #10b981', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#10b981', marginBottom: '0.25rem' }}>DHCP Options Explorer</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Select a category, then click an option to see what it does.</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {OPT_CATS.map(c => (
          <button key={c} onClick={() => setCat(c)}
            style={{ padding: '0.35rem 0.85rem', borderRadius: '7px', border: `2px solid ${OPT_CAT_COLOR[c]}`, background: cat === c ? OPT_CAT_COLOR[c] : '#fff', color: cat === c ? '#fff' : OPT_CAT_COLOR[c], fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem', textTransform: 'capitalize' }}>
            {c}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
        {visible.map(o => (
          <div key={o.code}
            onClick={() => setActive(active === o.code ? null : o.code)}
            style={{ cursor: 'pointer', borderRadius: '8px', border: `2px solid ${active === o.code ? OPT_CAT_COLOR[o.category] : '#e2e8f0'}`, background: active === o.code ? '#f0f4ff' : '#fff', padding: '0.55rem 0.85rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ background: OPT_CAT_COLOR[o.category], color: '#fff', borderRadius: '5px', padding: '0.1rem 0.45rem', fontWeight: 800, fontSize: '0.8rem', minWidth: '2rem', textAlign: 'center' }}>{o.code}</span>
              <span style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.88rem' }}>{o.name}</span>
            </div>
          </div>
        ))}
      </div>
      {active !== null && (() => {
        const opt = DHCP_OPTIONS.find(o => o.code === active)!
        return (
          <div style={{ background: '#fff', borderRadius: '10px', border: `2px solid ${OPT_CAT_COLOR[opt.category]}`, padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', marginBottom: '0.65rem' }}>
              <span style={{ background: OPT_CAT_COLOR[opt.category], color: '#fff', borderRadius: '6px', padding: '0.2rem 0.65rem', fontWeight: 800, fontSize: '0.9rem' }}>Option {opt.code}</span>
              <span style={{ fontWeight: 800, color: '#1e293b', fontSize: '1rem' }}>{opt.name}</span>
              <span style={{ color: '#64748b', fontSize: '0.82rem' }}>Type: {opt.type}</span>
            </div>
            <div style={{ color: '#334155', lineHeight: 1.7, marginBottom: '0.5rem' }}>{opt.description}</div>
            <div><span style={{ fontWeight: 700, color: '#475569', fontSize: '0.82rem' }}>EXAMPLE: </span><code style={{ fontFamily: 'monospace', fontSize: '0.88rem', color: '#0f172a' }}>{opt.example}</code></div>
          </div>
        )
      })()}
    </div>
  )
}

// ─── interactive component 3: Lease State Machine ────────────────────────────
type LeaseState = {
  id: string
  label: string
  description: string
  transitions: { to: string; label: string }[]
  color: string
  x: number
  y: number
}
const LEASE_STATES: LeaseState[] = [
  { id: 'init', label: 'INIT', description: 'Client has no IP. Starts DORA process by broadcasting DHCPDISCOVER.', transitions: [{ to: 'selecting', label: 'Send DISCOVER' }], color: '#64748b', x: 50, y: 5 },
  { id: 'selecting', label: 'SELECTING', description: 'Client sent DISCOVER and is collecting OFFERs from servers. Waits briefly (up to 4s) to hear all offers before picking one.', transitions: [{ to: 'requesting', label: 'Choose offer → REQUEST' }], color: '#3b82f6', x: 50, y: 22 },
  { id: 'requesting', label: 'REQUESTING', description: 'Client broadcasts REQUEST selecting one server. Waiting for ACK or NAK.', transitions: [{ to: 'bound', label: 'Receive ACK' }, { to: 'init', label: 'Receive NAK / timeout' }], color: '#f59e0b', x: 50, y: 40 },
  { id: 'bound', label: 'BOUND', description: 'Client has a lease. IP is configured. T1 timer running (50% of lease time). Normal network operation.', transitions: [{ to: 'renewing', label: 'T1 expires' }], color: '#10b981', x: 50, y: 57 },
  { id: 'renewing', label: 'RENEWING', description: 'T1 expired. Client unicasts REQUEST to its server, trying to renew. T2 timer running.', transitions: [{ to: 'bound', label: 'Receive ACK' }, { to: 'rebinding', label: 'T2 expires / no ACK' }], color: '#8b5cf6', x: 50, y: 74 },
  { id: 'rebinding', label: 'REBINDING', description: 'T2 expired. Server unreachable. Client broadcasts REQUEST to any DHCP server. Lease expiry timer running.', transitions: [{ to: 'bound', label: 'Any server ACKs' }, { to: 'init', label: 'Lease expires / NAK' }], color: '#ef4444', x: 50, y: 91 },
]

function DhcpLeaseStateMachine() {
  const [active, setActive] = useState<string>('bound')
  const s = LEASE_STATES.find(x => x.id === active)!

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #8b5cf6', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#8b5cf6', marginBottom: '0.25rem' }}>DHCP Lease State Machine</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Click a state to see what happens there and what triggers transitions.</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {LEASE_STATES.map(ls => (
          <button key={ls.id} onClick={() => setActive(ls.id)}
            style={{ padding: '0.45rem 1rem', borderRadius: '8px', border: `2px solid ${ls.color}`, background: active === ls.id ? ls.color : '#fff', color: active === ls.id ? '#fff' : ls.color, fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem' }}>
            {ls.label}
          </button>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: '10px', border: `2px solid ${s.color}`, padding: '1.1rem 1.25rem' }}>
        <div style={{ fontWeight: 800, color: s.color, fontSize: '1.05rem', marginBottom: '0.5rem' }}>{s.label}</div>
        <div style={{ color: '#334155', lineHeight: 1.75, marginBottom: '0.85rem' }}>{s.description}</div>
        <div style={{ fontWeight: 700, color: '#475569', fontSize: '0.85rem', marginBottom: '0.5rem' }}>TRANSITIONS</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {s.transitions.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#64748b' }}>{t.label}</span>
              <span style={{ color: '#94a3b8' }}>→</span>
              <span style={{ fontWeight: 700, color: LEASE_STATES.find(ls => ls.id === t.to)?.color || '#334155', background: '#f0f4ff', borderRadius: '5px', padding: '0.1rem 0.5rem', fontSize: '0.85rem' }}>{t.to.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── main export ─────────────────────────────────────────────────────────────
export default function DhcpDeepDivePage() {
  return (
    <LearnLayout
      title="DHCP — Dynamic Host Configuration Protocol"
      description="From the broadcast storm of DORA to the precision of DHCP snooping and stateless DHCPv6: how the protocol that configures every device on your network actually works."
      section="Networking Fundamentals — Module 30"
      readTime="28–38 min"
      updatedAt="May 2026"
    >
      {/* ── Chapter 1 ─────────────────────────────────────────── */}
      <Chapter n={1} title="Before DHCP: The Pain of Static Addresses" />
      <StoryBox>
        1993. A university IT administrator manages 600 workstations spread across 20 buildings. Every IP address is assigned manually. When a machine moves floors, someone must physically reconfigure it. A new student lab of 30 machines means 30 separate visits. IP conflicts — two machines claiming the same address — bring down network segments without warning. A Stanford researcher named Ralph Droms has been working on a solution for two years. In March 1993, RFC 1541 defines DHCP. The administrator can finally go home on time.
      </StoryBox>
      <Para>
        DHCP's predecessor was BOOTP (Bootstrap Protocol, RFC 951, 1985), which could assign IP addresses to diskless workstations from a static table. BOOTP required manually configured MAC-to-IP mappings for every device — better than pure static configuration, but still not dynamic. DHCP extended BOOTP to add dynamic address pools, lease-based allocation, and a rich options framework.
      </Para>
      <Para>
        Today, DHCP is invisible infrastructure. Every device you connect to any network — home Wi-Fi, corporate LAN, mobile data, coffee shop — receives its IP configuration via DHCP within seconds. The DORA exchange (Discover, Offer, Request, ACK) runs before the first application packet leaves the machine.
      </Para>
      <WowBox>
        DHCP runs over UDP — a connectionless, unreliable transport — even though it needs to reliably exchange IP configuration. The protocol handles reliability itself: timeouts (4s, 8s, 16s, 32s with random jitter), retransmissions, and the broadcast fallback (rebinding). The choice of UDP is deliberate: the client has no IP yet, so TCP's connection establishment would require state that doesn't exist.
      </WowBox>

      <Divider />
      {/* ── Chapter 2 ─────────────────────────────────────────── */}
      <Chapter n={2} title="The DORA Handshake: Four Messages, Full Configuration" />
      <StoryBox>
        A laptop connects to a new Wi-Fi network. The wireless association completes; the radio link is up. But the laptop cannot send any IP packets yet — it has no IP address. The OS triggers the DHCP client, which constructs a UDP datagram with source IP 0.0.0.0 (it has none) and destination 255.255.255.255 (limited broadcast, reaches everyone on the local segment). The first message lands on every DHCP server on the subnet. The race begins.
      </StoryBox>
      <H2>Message 1: DHCPDISCOVER (Client Broadcast)</H2>
      <Para>
        The DISCOVER message is a UDP datagram with:
      </Para>
      <Para>
        — <Accent>Source IP</Accent>: 0.0.0.0 (client has no address)
      </Para>
      <Para>
        — <Accent>Destination IP</Accent>: 255.255.255.255 (limited broadcast)
      </Para>
      <Para>
        — <Accent>Source port</Accent>: 68 (DHCP client port)
      </Para>
      <Para>
        — <Accent>Destination port</Accent>: 67 (DHCP server port)
      </Para>
      <Para>
        The DISCOVER payload is a BOOTP-derived message with the client's MAC address in the <Code>chaddr</Code> field and a random transaction ID (<Code>xid</Code>) used to match subsequent messages. The client includes <Accent>Option 55</Accent> (Parameter Request List) asking for specific configuration: subnet mask, gateway, DNS, domain name, NTP, etc.
      </Para>
      <H2>Message 2: DHCPOFFER (Server Response)</H2>
      <Para>
        Each DHCP server that receives the DISCOVER responds with an OFFER. The server selects an available IP from its pool, temporarily reserves it, and sends the offer with:
      </Para>
      <Para>
        — <Code>yiaddr</Code>: the offered IP address ("your IP address")
      </Para>
      <Para>
        — Option 51: proposed lease time
      </Para>
      <Para>
        — Option 54: server identifier (server's own IP)
      </Para>
      <Para>
        — Options 1, 3, 6: subnet mask, gateway, DNS
      </Para>
      <Para>
        The OFFER may still be broadcast (if the client's IP is not yet set) or unicast to the MAC address. Multiple servers may offer; the client accepts the first response by default.
      </Para>
      <H2>Message 3: DHCPREQUEST (Client Broadcast)</H2>
      <Para>
        The client broadcasts a REQUEST selecting one server's offer. Broadcasting is deliberate: all servers that sent offers hear the REQUEST. Servers not selected see their IP reservation released. The REQUEST includes Option 54 (Server Identifier) naming the chosen server and Option 50 (Requested IP Address) confirming the offered IP.
      </Para>
      <H2>Message 4: DHCPACK (Server Confirmation)</H2>
      <Para>
        The selected server sends an ACK confirming the lease. The client configures its interface: sets the IP, subnet mask, default route, and DNS servers. Starts the lease timers. The client may run ARP probing (sending gratuitous ARPs) to verify the assigned IP is not already in use.
      </Para>
      <DoraHandshakeVisualizer />

      <Divider />
      {/* ── Chapter 3 ─────────────────────────────────────────── */}
      <Chapter n={3} title="DHCP Lease Timers: T1, T2, and Expiry" />
      <StoryBox>
        A developer plugs into a conference room Ethernet port. The lease time is 8 hours. She works there all day, disconnects at 5 PM, and comes back at 9 AM. The lease expired overnight. Her laptop starts DORA again and gets a new IP. But wait — DHCP has a mechanism to prevent this: renewal. The client is supposed to renew its lease before it expires, as long as it is still connected.
      </StoryBox>
      <Para>
        DHCP leases have three time points that drive the lease state machine:
      </Para>
      <H2>T1 — Renewal Time (Option 58)</H2>
      <Para>
        At T1 (typically 50% of the lease duration), the client enters <Accent>RENEWING</Accent> state and unicasts a DHCPREQUEST directly to its DHCP server. This is an efficient unicast renewal — the server simply extends the lease. If the server responds with ACK, the lease resets to a fresh duration.
      </Para>
      <H2>T2 — Rebind Time (Option 59)</H2>
      <Para>
        At T2 (typically 87.5% of the lease), the client enters <Accent>REBINDING</Accent> state. The original server hasn't responded to renewals (it may be down). The client now broadcasts to any DHCP server. Any server can extend the lease — not necessarily the original one. This allows DHCP failover to transparently serve rebinding clients.
      </Para>
      <H2>Lease Expiry</H2>
      <Para>
        If no server responds by expiry, the client must stop using the IP. It returns to INIT state and starts DORA again. During INIT, the client has no valid IP — ongoing connections are broken. This is why DHCP servers should be redundant (DHCP failover) and lease times should be long enough to survive server maintenance windows.
      </Para>
      <DhcpLeaseStateMachine />
      <H2>Choosing Lease Times</H2>
      <Para>
        <Accent>Short leases (minutes to hours)</Accent>: good for environments with high device turnover (cafes, conferences, hotels), but increase server load and cause more DORA exchanges. If a server is down during T1/T2, clients lose connectivity faster.
      </Para>
      <Para>
        <Accent>Long leases (days to weeks)</Accent>: stable addresses, less protocol chatter, better for corporate desktops and servers. But address pool exhaustion risk if many devices disconnect without releasing.
      </Para>
      <Para>
        <Accent>DHCP RELEASE</Accent>: clients should send a RELEASE message when they disconnect voluntarily (e.g., at shutdown or when the interface goes down). This immediately frees the address. However, servers must not depend on this — mobile devices often vanish without sending RELEASE.
      </Para>

      <Divider />
      {/* ── Chapter 4 ─────────────────────────────────────────── */}
      <Chapter n={4} title="DHCP Options: The Configuration Payload" />
      <StoryBox>
        DHCP is often described as "the protocol that gives you an IP address." But that description misses half the value. DHCP can push dozens of configuration parameters to clients: DNS servers, default gateway, NTP servers, domain search list, proxy auto-config URL, VoIP phone provisioning server, PXE boot parameters, and custom vendor-specific data. A fully configured DHCP server can bring a factory-fresh device from zero to fully configured in seconds.
      </StoryBox>
      <Para>
        DHCP options are Type-Length-Value (TLV) encoded fields appended to the base BOOTP packet. The <Accent>magic cookie</Accent> (0x63825363) at the start of the options field identifies the packet as DHCP. Options range from code 0 to 255; code 255 signals end of options. The base packet format (chaddr, siaddr, giaddr, etc.) comes from BOOTP; everything else is in options.
      </Para>
      <DhcpOptionsExplorer />
      <H2>Option 82: DHCP Relay Agent Information</H2>
      <Para>
        Option 82 is added by DHCP relay agents (routers that forward DHCP packets between VLANs). It contains sub-options identifying which switch port the client connected to. The DHCP server can use this to assign addresses from pool appropriate for that VLAN, log exact client location, or enforce security policies. This is critical in large networks where clients connect from many different VLANs but the DHCP server is centralized.
      </Para>
      <H2>Option 121: Classless Static Routes</H2>
      <Para>
        Option 121 (RFC 3442) pushes static routes to clients: a list of CIDR prefix + next-hop pairs. RFC 3442 mandates that if Option 121 is present, clients must use it and MUST ignore Option 3 (default gateway) for routing purposes. This allows DHCP to install specific routes for split tunnels, VPN routing, or steering traffic to specific next-hops.
      </Para>
      <Warn>
        Option 121 has been used in VPN bypass attacks. By pushing a specific route for the VPN server's IP via the local gateway (rather than the VPN tunnel), malicious DHCP can cause VPN traffic to bypass the tunnel entirely while appearing connected. This was publicly disclosed (CVE-2024-3661, "TunnelVision"). Verify your VPN client handles this correctly.
      </Warn>

      <Divider />
      {/* ── Chapter 5 ─────────────────────────────────────────── */}
      <Chapter n={5} title="DHCP Relay Agents: Crossing VLAN Boundaries" />
      <StoryBox>
        A corporate network has 50 VLANs — one per department. DHCP broadcasts do not cross VLAN boundaries by design. Installing a DHCP server in each VLAN is wasteful and hard to manage. The solution: DHCP relay agents. One DHCP server in the datacenter serves all 50 VLANs by having routers relay DHCP broadcasts as unicasts.
      </StoryBox>
      <Para>
        A <Accent>DHCP relay agent</Accent> (also called a BOOTP relay or IP helper) is typically configured on a router or L3 switch. When a DHCP broadcast arrives on a VLAN interface, the relay agent:
      </Para>
      <Para>
        1. Intercepts the DHCPDISCOVER broadcast on the client's subnet.
      </Para>
      <Para>
        2. Sets the <Code>giaddr</Code> (gateway IP address) field in the DHCP packet to the relay agent's own interface IP.
      </Para>
      <Para>
        3. Unicasts the modified packet to the configured DHCP server address.
      </Para>
      <Para>
        4. When the server replies, the relay agent forwards the response back to the client (broadcast if ciaddr=0.0.0.0).
      </Para>
      <CodeBlock>{`# Cisco IOS L3 interface configuration
interface Vlan10
  ip address 10.1.10.1 255.255.255.0
  ip helper-address 10.0.0.5    # Unicast DHCP to server at 10.0.0.5

interface Vlan20
  ip address 10.1.20.1 255.255.255.0
  ip helper-address 10.0.0.5

# The DHCP server sees giaddr=10.1.10.1 or 10.1.20.1
# and allocates from the matching scope/pool`}</CodeBlock>
      <Para>
        The DHCP server uses <Code>giaddr</Code> to determine which subnet pool to allocate from. Configure a matching scope for each VLAN's subnet in the DHCP server. Without <Code>giaddr</Code>, the server would have no idea which network the client is on.
      </Para>

      <Divider />
      {/* ── Chapter 6 ─────────────────────────────────────────── */}
      <Chapter n={6} title="DHCP Reservations and Static Assignments" />
      <StoryBox>
        A network printer has a DHCP-assigned IP that changes every time it reboots after a power outage. Users cannot find it. The help desk spends 30 minutes per incident. The fix: a DHCP reservation. The printer keeps using DHCP, but the server always assigns the same IP to that specific MAC address. Same protocol simplicity for the printer; predictable address for the users.
      </StoryBox>
      <H2>MAC-Based Reservations</H2>
      <Para>
        DHCP reservations bind a specific MAC address to a specific IP. The IP is allocated from the DHCP pool, but it is always given to that MAC. Configuration varies by server:
      </Para>
      <CodeBlock>{`# ISC DHCP (dhcpd.conf)
host printer-a3 {
  hardware ethernet AA:BB:CC:DD:EE:FF;
  fixed-address 192.168.1.50;
  option host-name "printer-a3";
}

# Windows DHCP Server PowerShell
Add-DhcpServerv4Reservation -ScopeId 192.168.1.0 -IPAddress 192.168.1.50 \
  -ClientId "AA-BB-CC-DD-EE-FF" -Description "Printer A3"

# Dnsmasq
dhcp-host=AA:BB:CC:DD:EE:FF,192.168.1.50,printer-a3`}</CodeBlock>
      <H2>Client Identifier vs. MAC Address</H2>
      <Para>
        DHCP uses the client's hardware address (MAC, <Code>chaddr</Code>) for identification by default. But clients can also send a <Accent>Client Identifier</Accent> (Option 61) — typically a string. This allows servers to identify clients by something other than MAC, useful for VMs with changing MAC addresses or virtual interfaces.
      </Para>
      <H2>Dynamic DNS Updates</H2>
      <Para>
        Modern DHCP servers (ISC DHCP, Windows DHCP) can update DNS records when leases are assigned. When a client gets IP 192.168.1.100 with hostname "laptop42", the DHCP server updates the DNS zone to add an A record for laptop42.corp.example.com. This keeps DNS in sync with DHCP assignments — critical for environments where hosts need to be reachable by name.
      </Para>

      <Divider />
      {/* ── Chapter 7 ─────────────────────────────────────────── */}
      <Chapter n={7} title="DHCP Security: Attacks and Defenses" />
      <StoryBox>
        An attacker connects a laptop to a corporate network and runs a rogue DHCP server. The legitimate DHCP server is a few milliseconds away across the network. The rogue server is on the same switch — it responds faster. Within minutes, new clients connecting to the network receive the attacker's DNS server, pointing all name resolution to a server that returns forged responses. The attacker has compromised the entire network's DNS without touching a single server.
      </StoryBox>
      <H2>Rogue DHCP Server Attack</H2>
      <Para>
        Any device on a network can run a DHCP server — there is no authentication in the protocol. A rogue DHCP server can:
      </Para>
      <Para>
        — Assign arbitrary DNS servers → DNS hijacking, phishing, MITM
      </Para>
      <Para>
        — Assign the attacker as default gateway → full traffic intercept
      </Para>
      <Para>
        — Assign wrong subnet masks → network communication failures
      </Para>
      <Para>
        — Assign the same IP to multiple clients → address conflict denial-of-service
      </Para>
      <H2>DHCP Snooping: The Defense</H2>
      <Para>
        <Accent>DHCP snooping</Accent> is a Layer 2 switch feature that validates DHCP messages and limits which ports can send DHCP server responses:
      </Para>
      <Para>
        <Accent>Trusted ports</Accent>: uplinks to routers, DHCP servers, and aggregation switches. DHCP OFFER and ACK are allowed through.
      </Para>
      <Para>
        <Accent>Untrusted ports</Accent>: access ports connected to end users. DHCP OFFER and ACK are dropped — only DISCOVER and REQUEST (client messages) are permitted. DHCP server responses from these ports are blocked.
      </Para>
      <CodeBlock>{`# Cisco IOS DHCP snooping
ip dhcp snooping
ip dhcp snooping vlan 10,20,30

interface GigabitEthernet0/1   # uplink to DHCP server
  ip dhcp snooping trust

interface GigabitEthernet0/2   # access port (end user)
  # untrusted by default
  ip dhcp snooping limit rate 15  # rate limit: 15 DHCP pkt/s per port`}</CodeBlock>
      <H2>DHCP Snooping Binding Table</H2>
      <Para>
        DHCP snooping maintains a binding table: MAC address → IP address → VLAN → switch port → lease time. This table is consumed by other security features:
      </Para>
      <Para>
        — <Accent>Dynamic ARP Inspection (DAI)</Accent>: validates that ARP replies map to binding table entries, preventing ARP spoofing.
      </Para>
      <Para>
        — <Accent>IP Source Guard (IPSG)</Accent>: drops packets from ports where the source IP doesn't match the binding table, preventing IP spoofing.
      </Para>
      <H2>DHCP Starvation Attack</H2>
      <Para>
        An attacker sends thousands of DHCPDISCOVER messages with spoofed MAC addresses, exhausting the DHCP pool. Legitimate clients cannot get addresses (DHCPNAK or no response). Defense: DHCP snooping rate limiting per port, 802.1X port authentication before allowing DHCP traffic.
      </Para>
      <Warn>
        DHCP snooping must be enabled <em>before</em> devices connect to the network, or on a maintenance window — re-enabling it after the network is live requires careful handling of existing leases and the binding table (which does not survive reboots by default; configure write to flash or use an external database).
      </Warn>

      <Divider />
      {/* ── Chapter 8 ─────────────────────────────────────────── */}
      <Chapter n={8} title="PXE Boot: DHCP as Network Boot Infrastructure" />
      <StoryBox>
        A data center needs to provision 500 new servers. No one walks up to each server with a USB drive. Instead, the servers are configured to PXE boot: they broadcast a DHCPDISCOVER with a special vendor class identifier, receive options pointing to a TFTP server and bootloader filename, download the bootloader over UDP, and boot from a network-hosted OS image. DHCP is the first step in automated bare-metal provisioning.
      </StoryBox>
      <H2>PXE Boot DHCP Flow</H2>
      <Para>
        1. Client broadcasts DISCOVER with <Accent>Option 60</Accent> (Vendor Class Identifier) set to <Code>PXEClient:Arch:00000:UNDI:002001</Code> (or similar, encoding architecture and network driver version).
      </Para>
      <Para>
        2. DHCP server recognizes the PXE client and includes in the ACK:
      </Para>
      <Para>
        — <Accent>Option 66</Accent>: TFTP server hostname (where to download the bootloader)
      </Para>
      <Para>
        — <Accent>Option 67</Accent>: Boot filename (e.g., <Code>pxelinux.0</Code> for BIOS, <Code>bootx64.efi</Code> for UEFI)
      </Para>
      <Para>
        3. Client downloads the bootloader via TFTP (UDP port 69) from the specified server.
      </Para>
      <Para>
        4. Bootloader may issue a second DHCP exchange (ProxyDHCP) for additional PXE-specific options.
      </Para>
      <Para>
        5. Bootloader downloads OS image/kernel and boots.
      </Para>
      <H2>DHCP and UEFI HTTP Boot</H2>
      <Para>
        Modern UEFI systems support HTTP boot as an alternative to TFTP. DHCP delivers the boot URL via Option 67 as an HTTP/HTTPS URL (<Code>http://deploy.corp/grubx64.efi</Code>). The UEFI firmware fetches the bootloader via HTTP, enabling faster and more reliable delivery than TFTP (which uses unreliable UDP).
      </Para>

      <Divider />
      {/* ── Chapter 9 ─────────────────────────────────────────── */}
      <Chapter n={9} title="DHCPv6: IPv6 Address Configuration" />
      <StoryBox>
        IPv6 was designed with stateless address autoconfiguration (SLAAC) built in — hosts generate their own addresses from the network prefix announced in Router Advertisements. DHCPv6 was added later for environments that need centralized address management, additional options, and client tracking. The two systems coexist in complex ways.
      </StoryBox>
      <H2>SLAAC vs. DHCPv6</H2>
      <Para>
        <Accent>SLAAC</Accent> (Stateless Address Autoconfiguration, RFC 4862): router sends Router Advertisement (RA) with the /64 prefix. Host generates its interface ID using Modified EUI-64 (from MAC address) or a random stable address (RFC 7217). No server needed, no lease records, no central tracking. Address persists until RA stops.
      </Para>
      <Para>
        <Accent>DHCPv6 Stateful</Accent>: like DHCPv4 — server maintains a lease database, assigns specific addresses from pools, records client MAC/DUID and assigned address. Enables per-host tracking and central address management.
      </Para>
      <Para>
        <Accent>DHCPv6 Stateless</Accent>: the host uses SLAAC for its address but sends a DHCPv6 Information-Request to get other options (DNS, NTP, SIP servers) that SLAAC alone cannot provide.
      </Para>
      <H2>The M and O Flags in Router Advertisements</H2>
      <Para>
        Router Advertisements include two flags that tell hosts which method to use:
      </Para>
      <Para>
        — <Accent>M flag</Accent> (Managed): if set, hosts should use DHCPv6 for addresses.
      </Para>
      <Para>
        — <Accent>O flag</Accent> (Other): if set, hosts should use DHCPv6 for other configuration (DNS, etc.) even if using SLAAC for addresses.
      </Para>
      <Para>
        M=0, O=0: pure SLAAC, no DHCPv6. M=0, O=1: SLAAC + stateless DHCPv6 for options. M=1, O=1: full stateful DHCPv6.
      </Para>
      <H2>DHCPv6 Uses Multicast, Not Broadcast</H2>
      <Para>
        IPv6 has no broadcast. DHCPv6 uses <Accent>multicast</Accent>: clients send to <Code>ff02::1:2</Code> (All_DHCP_Relay_Agents_and_Servers, link-local multicast). Servers respond with unicast back to the client's link-local address. Relay agents forward using <Code>ff05::1:3</Code> (site-scoped multicast) to reach servers across routers.
      </Para>
      <CodeBlock>{`# DHCPv6 message types
SOLICIT (1)         → Like DISCOVER — client looks for servers
ADVERTISE (2)       ← Like OFFER — server responds
REQUEST (3)         → Client requests address from chosen server
REPLY (7)           ← Server confirms
RENEW (5)           → Client renews lease directly with server
REBIND (6)          → Client broadcasts to any server (T2 expired)
RELEASE (8)         → Client releases address
INFORMATION-REQUEST (11) → Stateless: only wants options, not address`}</CodeBlock>

      <Divider />
      {/* ── Chapter 10 ─────────────────────────────────────────── */}
      <Chapter n={10} title="DHCP Failover and High Availability" />
      <StoryBox>
        A single DHCP server goes down at 2 AM for unplanned maintenance. By morning, every device whose lease expires before the server comes back is offline. A company with a 12-hour lease time and 8-hour server downtime loses all devices in the last 4 hours. The solution is DHCP failover — two servers, synchronized state, automatic takeover.
      </StoryBox>
      <H2>ISC DHCP Failover Protocol</H2>
      <Para>
        ISC DHCP implements a load-sharing/failover protocol (RFC 3074 / ISC proprietary for DHCPv4). Two servers — <Accent>primary</Accent> and <Accent>secondary</Accent> — share a pool and synchronize lease states over TCP. In normal operation, both servers actively allocate from their half of the pool. If one fails, the other takes over the full pool after a configured split timeout.
      </Para>
      <CodeBlock>{`# Primary dhcpd.conf failover
failover peer "dhcp-failover" {
  primary;
  address 10.0.0.5;
  port 519;
  peer address 10.0.0.6;
  peer port 519;
  max-response-delay 30;
  max-unacked-updates 10;
  load balance max seconds 3;
  split 128;               # 50/50 split of addresses
  mclt 1800;               # Max Client Lead Time: 30 min
}

subnet 192.168.1.0 netmask 255.255.255.0 {
  pool {
    failover peer "dhcp-failover";
    range 192.168.1.100 192.168.1.200;
  }
  option routers 192.168.1.1;
}`}</CodeBlock>
      <H2>Windows DHCP Failover</H2>
      <Para>
        Windows Server 2012+ includes built-in DHCP failover configured via the DHCP Manager GUI or PowerShell. It supports hot standby (one active, one standby) and load balance (both active, 50/50 split by default). State replication is automatic.
      </Para>
      <CodeBlock>{`# Windows PowerShell DHCP failover
Add-DhcpServerv4Failover \
  -ComputerName dhcp1.corp \
  -Name "DHCP-Failover" \
  -PartnerServer dhcp2.corp \
  -ScopeId 192.168.1.0 \
  -LoadBalancePercent 50 \
  -MaxClientLeadTime (New-TimeSpan -Hours 1) \
  -AutoStateTransition $true`}</CodeBlock>

      <Divider />
      {/* ── Chapter 11 ─────────────────────────────────────────── */}
      <Chapter n={11} title="DHCP in Cloud and Containerized Environments" />
      <StoryBox>
        In AWS, every EC2 instance gets an IP from a DHCP server managed by the hypervisor — there is no option to disable this. The DHCP server is behind the VPC router (169.254.169.254), responding in microseconds before the instance boot completes. Kubernetes runs its own DHCP-like system (IPAM plugins) to assign pod IPs from cluster subnets. The protocol and its concepts permeate every layer of modern infrastructure.
      </StoryBox>
      <H2>AWS VPC DHCP</H2>
      <Para>
        Every VPC has a DHCP options set that specifies: domain-name, domain-name-servers, ntp-servers, netbios-name-servers. The default options push AmazonProvidedDNS (VPC resolver at base VPC CIDR +2, e.g., 10.0.0.2). Custom options sets can override to point to private DNS resolvers. The DHCP server itself is the AWS-managed router; you cannot change it.
      </Para>
      <H2>Kubernetes IPAM and CNI Plugins</H2>
      <Para>
        Kubernetes pod networking uses a CNI (Container Network Interface) plugin to assign IPs. Some CNIs (Flannel, Calico, Cilium) use their own IPAM without DHCP; others (like Multus with Whereabouts) support DHCP delegation for specific pod NICs. The concepts remain the same: IP pool management, lease allocation, conflict avoidance — just implemented in software without the UDP protocol overhead.
      </Para>
      <H2>Docker and DHCP</H2>
      <Para>
        Docker's bridge network uses its own built-in DHCP-like system (implemented in libnetwork) to assign IPs to containers on the docker0 bridge. The <Code>macvlan</Code> driver allows containers to appear as physical hosts on the network and receive IPs from the upstream DHCP server — useful for containers that need to be reachable at a specific network address.
      </Para>

      <Divider />
      {/* ── Chapter 12 ─────────────────────────────────────────── */}
      <Chapter n={12} title="DHCP Server Configuration Examples" />
      <StoryBox>
        Configuration is where theory meets practice. A DHCP server with wrong options causes mysterious network failures: DNS that doesn't resolve, routes that don't work, NTP drift that breaks certificate validation. Getting the options right — and in the right scope — is as important as the protocol mechanics.
      </StoryBox>
      <H2>ISC DHCP (dhcpd.conf)</H2>
      <CodeBlock>{`# /etc/dhcp/dhcpd.conf
default-lease-time 86400;      # 24 hours
max-lease-time 604800;         # 7 days maximum
authoritative;                 # This server is authoritative for these networks

option domain-name "corp.example.com";
option domain-name-servers 10.0.0.53, 10.0.0.54;
option ntp-servers 10.0.0.123;

# Production subnet
subnet 10.1.10.0 netmask 255.255.255.0 {
  range 10.1.10.50 10.1.10.200;
  option routers 10.1.10.1;
  option broadcast-address 10.1.10.255;
  # Classless static routes: 10.2.0.0/16 via 10.1.10.254
  option rfc3442-classless-static-routes 16, 10, 2, 10.1.10.254;
}

# Guest VLAN (shorter lease, no internal DNS)
subnet 10.1.99.0 netmask 255.255.255.0 {
  range 10.1.99.10 10.1.99.250;
  option routers 10.1.99.1;
  default-lease-time 3600;     # 1 hour for guest
  option domain-name-servers 8.8.8.8, 1.1.1.1;  # Public DNS only
}

# Static reservation
host fileserver {
  hardware ethernet DE:AD:BE:EF:00:01;
  fixed-address 10.1.10.20;
  option host-name "fileserver";
}`}</CodeBlock>
      <H2>Dnsmasq (Lightweight, Common in Home/SMB)</H2>
      <CodeBlock>{`# /etc/dnsmasq.conf
interface=eth0
dhcp-range=192.168.1.100,192.168.1.200,24h
dhcp-option=3,192.168.1.1          # default gateway
dhcp-option=6,8.8.8.8,8.8.4.4     # DNS servers
dhcp-option=42,192.168.1.1         # NTP server
dhcp-host=AA:BB:CC:DD:EE:FF,192.168.1.10,printer,infinite  # reservation`}</CodeBlock>

      <Divider />
      {/* ── Chapter 13 ─────────────────────────────────────────── */}
      <Chapter n={13} title="Misconceptions About DHCP" />
      <Err>
        "DHCP assigns permanent addresses." — DHCP assigns leases with expiry times. Unless you configure a reservation (fixed address bound to a MAC), the IP is returned to the pool when the lease expires. That said, most clients renew their leases successfully and effectively keep the same IP for a long time — but this is a side effect of lease renewal, not guaranteed permanence.
      </Err>
      <Err>
        "DHCP is not secure because it has no authentication." — Plain DHCP (RFC 2131) has no client or server authentication. However, DHCP snooping on managed switches, Dynamic ARP Inspection, and IP Source Guard together create a robust security posture at Layer 2. The absence of cryptographic authentication in the protocol does not mean DHCP environments cannot be secured.
      </Err>
      <Err>
        "Option 3 (default gateway) can be overridden by Option 121." — According to RFC 3442, clients that support Option 121 MUST use Option 121 routes and MUST ignore Option 3 for routing to destinations covered by Option 121 routes. If Option 121 contains a 0.0.0.0/0 route, it overrides the default gateway entirely — this is the basis of the TunnelVision VPN bypass attack (CVE-2024-3661).
      </Err>
      <Err>
        "DHCP and DNS are independent systems." — In modern networks they are tightly coupled. DHCP servers typically perform dynamic DNS updates (DDNS) when assigning leases, so that hostnames resolve to their current DHCP-assigned IPs. Without this integration, DNS records become stale. Windows Active Directory environments depend on this integration for workstation name resolution.
      </Err>
      <Err>
        "DHCPv6 replaces IPv4 DHCP in all IPv6 deployments." — Many IPv6 deployments use SLAAC (stateless address autoconfiguration) rather than DHCPv6 for addresses, potentially supplemented by stateless DHCPv6 for options like DNS. Whether to use DHCPv6, SLAAC, or both is a network design decision controlled by the M/O flags in Router Advertisements. DHCPv6 is optional in IPv6 networks, whereas DHCPv4 is essentially universal in IPv4 networks.
      </Err>

      <Divider />
      {/* ── Chapter 14 ─────────────────────────────────────────── */}
      <Chapter n={14} title="IQ Depth Check: How Deep Does Your DHCP Knowledge Go?" />
      <IQ level="Beginner">
        <strong>What are the four steps of the DHCP DORA process?</strong><br />
        DISCOVER — client broadcasts to find DHCP servers (source: 0.0.0.0, destination: 255.255.255.255). OFFER — each server responds with a proposed IP and configuration. REQUEST — client broadcasts selecting one server's offer (all servers hear this; unselected servers release their reserved IPs). ACK — selected server confirms the lease; client configures its interface.
      </IQ>
      <IQ level="Intermediate">
        <strong>What are T1 and T2 timers, and what happens at each?</strong><br />
        T1 (Option 58, typically 50% of lease): client enters RENEWING state and unicasts a DHCPREQUEST to its server to extend the lease. If ACK received, lease resets. T2 (Option 59, typically 87.5% of lease): client enters REBINDING state after server hasn't responded to T1 renewal. Client now broadcasts REQUEST to any DHCP server. Any server can ACK and extend. If lease expires without any ACK, client releases the IP and restarts DORA.
      </IQ>
      <IQ level="Senior">
        <strong>Explain DHCP snooping and what other security features depend on it.</strong><br />
        DHCP snooping is a switch feature that classifies ports as trusted (uplinks to servers/routers) or untrusted (access ports). On untrusted ports, it drops DHCP OFFER and ACK messages, blocking rogue DHCP servers. It builds a binding table mapping MAC+IP+VLAN+port+lease-time from observed legitimate DHCP exchanges. Dynamic ARP Inspection uses this table to validate ARP replies — an ARP mapping not matching the binding table is dropped, preventing ARP spoofing. IP Source Guard uses the binding table to create per-port ACLs that drop packets where source IP doesn't match the binding — preventing IP spoofing. Together these three features form a complete Layer 2 security framework.
      </IQ>
      <IQ level="PhD">
        <strong>Why does DHCP run over UDP instead of TCP, and how does RFC 3442 Option 121 create the TunnelVision VPN bypass vulnerability?</strong><br />
        DHCP must operate before the client has a valid IP address. TCP's three-way handshake requires maintaining state (SYN-SENT, SYN-RECEIVED, ESTABLISHED) with specific source/destination IP addresses — impossible when the source IP is 0.0.0.0 and must be bound to a socket. UDP allows sending datagrams with any source IP without connection state, enabling DHCP's broadcast-based discovery. The kernel can receive the UDP response even with no assigned IP because the DHCP client binds to port 68 before having an address, and the response is delivered to the MAC address layer. RFC 3442 states that Option 121 classless routes, when present, supersede Option 3 (default gateway). A malicious DHCP server (or a server on the same network as a VPN client) can push Option 121 with a /32 route for the VPN server's IP pointing to the local gateway instead of the VPN tunnel. The OS routes VPN handshake traffic directly to the gateway, bypassing the tunnel. The VPN appears connected (the tunnel is up) but traffic leaks in plaintext. Mitigations: VPN clients that explicitly ignore Option 121 (requires vendor fix), network-level firewall rules, or routing-based VPN architectures that don't rely on policy routing.
      </IQ>

      <Divider />
      <KeyTakeaways items={[
        'DHCP DORA: Discover (client broadcast, 0.0.0.0→255.255.255.255), Offer (server proposes IP), Request (client selects, all servers hear), ACK (server confirms lease).',
        'DHCP uses UDP (not TCP) because clients have no IP address before DHCP completes — TCP connection establishment requires valid source IPs.',
        'T1 (50%) triggers unicast renewal to the original server; T2 (87.5%) triggers broadcast rebinding to any server; lease expiry forces DORA restart.',
        'DHCP options (TLV-encoded, 0–255 codes) deliver subnet mask, gateway, DNS, NTP, domain, static routes, PXE boot parameters, and vendor-specific data.',
        'Option 121 (classless static routes) overrides Option 3 (default gateway) per RFC 3442 — enabling the TunnelVision VPN bypass attack (CVE-2024-3661).',
        'DHCP relay agents (ip helper-address) forward broadcasts as unicasts to centralized DHCP servers; giaddr identifies the client subnet for pool selection.',
        'DHCP snooping blocks rogue DHCP servers by dropping OFFER/ACK on untrusted ports; its binding table powers Dynamic ARP Inspection and IP Source Guard.',
        'DHCPv6 uses multicast (ff02::1:2) instead of broadcast, and coexists with SLAAC; M/O flags in Router Advertisements control which method clients use.',
        'PXE boot uses Options 43, 60, 66, 67 to deliver TFTP server and bootloader filename; UEFI HTTP boot delivers a URL instead.',
        'DHCP failover (ISC or Windows) synchronizes lease state between two servers; MCLT (Max Client Lead Time) is the maximum time a server can extend a lease without the peer confirming.',
      ]} />
    </LearnLayout>
  )
}
