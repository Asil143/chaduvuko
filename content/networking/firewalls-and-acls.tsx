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

// ─── interactive component 1: Firewall Generation Comparator ────────────────
type FwGeneration = {
  id: string
  name: string
  era: string
  inspection: string
  stateTracking: string
  appAwareness: string
  throughput: string
  useCases: string
  limitations: string
  examples: string
  color: string
}
const FW_GENERATIONS: FwGeneration[] = [
  {
    id: 'packet-filter',
    name: 'Packet Filter (1st Gen)',
    era: '1988–present',
    inspection: 'IP header only: src/dst IP, src/dst port, protocol (TCP/UDP/ICMP)',
    stateTracking: 'None — stateless. Each packet evaluated independently.',
    appAwareness: 'None — cannot distinguish HTTP from HTTPS on different ports',
    throughput: 'Very high (line rate on most hardware)',
    useCases: 'Router ACLs, basic perimeter filtering, cloud security groups',
    limitations: 'Cannot track connection state; allows TCP ACK packets from anywhere (ACK bit set = must be reply); easily bypassed by crafting packets that match rules',
    examples: 'Cisco IOS ACLs, AWS Security Groups, iptables -A INPUT rules without conntrack',
    color: '#64748b',
  },
  {
    id: 'stateful',
    name: 'Stateful Inspection (2nd Gen)',
    era: '1994–present',
    inspection: 'IP + TCP/UDP headers + connection state table',
    stateTracking: 'Full — tracks connection tuples (5-tuple + state: SYN_SENT, ESTABLISHED, FIN_WAIT)',
    appAwareness: 'None — protocol-agnostic beyond IP/TCP/UDP',
    throughput: 'High (slightly lower than packet filter due to state lookup)',
    useCases: 'Enterprise perimeter, DMZ firewalls, most network security appliances',
    limitations: 'Blind to application-layer attacks; cannot inspect TLS-encrypted traffic; no user awareness',
    examples: 'pfSense, Cisco ASA, Check Point classic, iptables with conntrack, Windows Firewall',
    color: '#3b82f6',
  },
  {
    id: 'proxy',
    name: 'Application Proxy (2.5 Gen)',
    era: '1991–present',
    inspection: 'Full application-layer protocol (HTTP, FTP, DNS, SMTP)',
    stateTracking: 'Full connection termination — proxy terminates both connections',
    appAwareness: 'Deep — understands application commands, validates protocol compliance',
    throughput: 'Lower — full proxy overhead, CPU-intensive for TLS inspection',
    useCases: 'Secure web gateways, email security gateways, forward/reverse proxies',
    limitations: 'Protocol-specific (separate proxy per protocol), high latency, complex configuration',
    examples: 'Squid (HTTP), Postfix (SMTP relay), NGINX reverse proxy, Zscaler',
    color: '#8b5cf6',
  },
  {
    id: 'ngfw',
    name: 'Next-Generation Firewall (3rd Gen)',
    era: '2007–present',
    inspection: 'IP + transport + application + user identity + threat intelligence',
    stateTracking: 'Full — plus session history and behavioral patterns',
    appAwareness: 'Deep Packet Inspection: app-ID independent of port, TLS inspection, file inspection',
    throughput: 'Medium-high (offloading to dedicated ASICs)',
    useCases: 'Modern enterprise perimeter, data center, cloud-native NGFW',
    limitations: 'TLS inspection raises privacy concerns; high cost; configuration complexity; can miss encrypted tunnels in allowed protocols',
    examples: 'Palo Alto Networks, Fortinet FortiGate, Check Point Quantum, Cisco Firepower, AWS Network Firewall',
    color: '#10b981',
  },
]
const GEN_FIELDS: (keyof FwGeneration)[] = ['era', 'inspection', 'stateTracking', 'appAwareness', 'throughput', 'useCases', 'limitations', 'examples']
const GEN_LABELS: Record<string, string> = { era: 'Era', inspection: 'Inspection Depth', stateTracking: 'State Tracking', appAwareness: 'App Awareness', throughput: 'Throughput', useCases: 'Use Cases', limitations: 'Limitations', examples: 'Products/Examples' }

function FirewallGenerationComparator() {
  const [sel, setSel] = useState<string>('ngfw')
  const g = FW_GENERATIONS.find(x => x.id === sel)!

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #10b981', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#10b981', marginBottom: '0.25rem' }}>Firewall Generation Comparator</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Select a firewall generation to compare inspection depth, capabilities, and limitations.</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {FW_GENERATIONS.map(f => (
          <button key={f.id} onClick={() => setSel(f.id)}
            style={{ padding: '0.45rem 1rem', borderRadius: '8px', border: `2px solid ${f.color}`, background: sel === f.id ? f.color : '#fff', color: sel === f.id ? '#fff' : f.color, fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem' }}>
            {f.name.split('(')[0].trim()}
          </button>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: '10px', border: `2px solid ${g.color}`, overflow: 'hidden' }}>
        {GEN_FIELDS.map((f, i) => (
          <div key={f} style={{ display: 'flex', borderBottom: i < GEN_FIELDS.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
            <div style={{ width: '140px', minWidth: '140px', background: '#f8fafc', padding: '0.65rem 0.9rem', fontWeight: 700, color: '#475569', fontSize: '0.82rem', borderRight: '1px solid #e2e8f0' }}>{GEN_LABELS[f]}</div>
            <div style={{ flex: 1, padding: '0.65rem 0.9rem', color: '#1e293b', fontSize: '0.9rem', lineHeight: 1.6 }}>{g[f]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── interactive component 2: ACL Rule Simulator ────────────────────────────
type AclRule = {
  id: number
  action: 'PERMIT' | 'DENY'
  protocol: string
  srcIp: string
  srcPort: string
  dstIp: string
  dstPort: string
  note: string
}
const SAMPLE_RULES: AclRule[] = [
  { id: 1, action: 'PERMIT', protocol: 'TCP', srcIp: '10.0.1.0/24', srcPort: 'any', dstIp: 'any', dstPort: '443', note: 'Allow internal users HTTPS outbound' },
  { id: 2, action: 'PERMIT', protocol: 'TCP', srcIp: '10.0.1.0/24', srcPort: 'any', dstIp: 'any', dstPort: '80', note: 'Allow internal users HTTP outbound' },
  { id: 3, action: 'PERMIT', protocol: 'TCP', srcIp: '10.0.2.0/24', srcPort: 'any', dstIp: '10.0.3.10', dstPort: '5432', note: 'App servers → Postgres DB only' },
  { id: 4, action: 'DENY', protocol: 'TCP', srcIp: '10.0.2.0/24', srcPort: 'any', dstIp: '10.0.3.0/24', dstPort: 'any', note: 'Block app servers from all other DB hosts' },
  { id: 5, action: 'PERMIT', protocol: 'TCP', srcIp: 'any', srcPort: 'any', dstIp: '10.0.4.10', dstPort: '443', note: 'Allow public access to web server HTTPS' },
  { id: 6, action: 'DENY', protocol: 'TCP', srcIp: 'any', srcPort: 'any', dstIp: '10.0.4.10', dstPort: '22', note: 'Block SSH to web server from internet' },
  { id: 7, action: 'PERMIT', protocol: 'TCP', srcIp: '10.0.5.0/24', srcPort: 'any', dstIp: '10.0.4.10', dstPort: '22', note: 'Allow SSH from management VLAN only' },
  { id: 8, action: 'DENY', protocol: 'any', srcIp: 'any', srcPort: 'any', dstIp: 'any', dstPort: 'any', note: 'Implicit deny all (default — all firewalls)' },
]

type TestPacket = {
  protocol: string
  srcIp: string
  srcPort: string
  dstIp: string
  dstPort: string
}
const TEST_PACKETS: TestPacket[] = [
  { protocol: 'TCP', srcIp: '10.0.1.5', srcPort: '54321', dstIp: '8.8.8.8', dstPort: '443' },
  { protocol: 'TCP', srcIp: '10.0.2.15', srcPort: '45678', dstIp: '10.0.3.10', dstPort: '5432' },
  { protocol: 'TCP', srcIp: '10.0.2.15', srcPort: '45678', dstIp: '10.0.3.20', dstPort: '5432' },
  { protocol: 'TCP', srcIp: '203.0.113.5', srcPort: '12345', dstIp: '10.0.4.10', dstPort: '443' },
  { protocol: 'TCP', srcIp: '203.0.113.5', srcPort: '12345', dstIp: '10.0.4.10', dstPort: '22' },
  { protocol: 'TCP', srcIp: '10.0.5.3', srcPort: '34567', dstIp: '10.0.4.10', dstPort: '22' },
]

function ipInCidr(ip: string, cidr: string): boolean {
  if (cidr === 'any') return true
  if (!cidr.includes('/')) return ip === cidr
  const [net, bits] = cidr.split('/')
  const mask = ~((1 << (32 - parseInt(bits))) - 1) >>> 0
  const ipNum = ip.split('.').reduce((acc, o) => (acc << 8) + parseInt(o), 0) >>> 0
  const netNum = net.split('.').reduce((acc, o) => (acc << 8) + parseInt(o), 0) >>> 0
  return (ipNum & mask) === (netNum & mask)
}

function matchRule(rule: AclRule, pkt: TestPacket): boolean {
  if (rule.protocol !== 'any' && rule.protocol !== pkt.protocol) return false
  if (!ipInCidr(pkt.srcIp, rule.srcIp)) return false
  if (rule.srcPort !== 'any' && rule.srcPort !== pkt.srcPort) return false
  if (!ipInCidr(pkt.dstIp, rule.dstIp)) return false
  if (rule.dstPort !== 'any' && rule.dstPort !== pkt.dstPort) return false
  return true
}

function AclRuleSimulator() {
  const [pktIdx, setPktIdx] = useState<number>(0)
  const pkt = TEST_PACKETS[pktIdx]

  let hitRule: AclRule | null = null
  const traversal: { rule: AclRule; hit: boolean }[] = []
  for (const rule of SAMPLE_RULES) {
    const hit = matchRule(rule, pkt)
    traversal.push({ rule, hit })
    if (hit) { hitRule = rule; break }
  }

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #6366f1', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#6366f1', marginBottom: '0.25rem' }}>ACL Rule Simulator</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Select a test packet and watch which rule it matches (top-to-bottom, first-match wins).</p>
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {TEST_PACKETS.map((p, i) => (
          <button key={i} onClick={() => setPktIdx(i)}
            style={{ padding: '0.35rem 0.75rem', borderRadius: '7px', border: `1.5px solid ${pktIdx === i ? '#6366f1' : '#e2e8f0'}`, background: pktIdx === i ? '#eef2ff' : '#fff', color: pktIdx === i ? '#6366f1' : '#475569', fontWeight: pktIdx === i ? 800 : 500, cursor: 'pointer', fontSize: '0.78rem', fontFamily: 'monospace' }}>
            {p.srcIp}:{p.srcPort}→{p.dstIp}:{p.dstPort}
          </button>
        ))}
      </div>
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#e2e8f0' }}>
        Packet: {pkt.protocol} {pkt.srcIp}:{pkt.srcPort} → {pkt.dstIp}:{pkt.dstPort}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem' }}>
        {traversal.map(({ rule, hit }) => (
          <div key={rule.id} style={{ borderRadius: '8px', border: `1.5px solid ${hit ? (rule.action === 'PERMIT' ? '#10b981' : '#ef4444') : '#e2e8f0'}`, background: hit ? (rule.action === 'PERMIT' ? '#ecfdf5' : '#fff1f2') : '#fff', padding: '0.5rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ fontWeight: 800, color: '#6366f1', minWidth: '1.5rem', fontSize: '0.82rem' }}>{rule.id}</span>
            <span style={{ background: rule.action === 'PERMIT' ? '#10b981' : '#ef4444', color: '#fff', borderRadius: '5px', padding: '0.1rem 0.5rem', fontSize: '0.78rem', fontWeight: 800, minWidth: '52px', textAlign: 'center' }}>{rule.action}</span>
            <span style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: '#475569', flex: 1 }}>{rule.protocol} {rule.srcIp}:{rule.srcPort} → {rule.dstIp}:{rule.dstPort}</span>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{rule.note}</span>
            {hit && <span style={{ fontWeight: 800, color: rule.action === 'PERMIT' ? '#10b981' : '#ef4444' }}>← MATCH</span>}
          </div>
        ))}
      </div>
      <div style={{ background: hitRule?.action === 'PERMIT' ? '#ecfdf5' : '#fff1f2', borderRadius: '8px', border: `2px solid ${hitRule?.action === 'PERMIT' ? '#10b981' : '#ef4444'}`, padding: '0.7rem 1rem', fontWeight: 800, color: hitRule?.action === 'PERMIT' ? '#10b981' : '#ef4444', fontSize: '1rem' }}>
        {hitRule?.action === 'PERMIT' ? '✓ PACKET PERMITTED' : '✗ PACKET DENIED'} — Rule {hitRule?.id}: {hitRule?.note}
      </div>
    </div>
  )
}

// ─── interactive component 3: Firewall Zone Architecture ────────────────────
type FwZone = {
  id: string
  name: string
  trustLevel: string
  hosts: string[]
  allowedFrom: string[]
  blockedFrom: string[]
  description: string
  color: string
}
const FW_ZONES: FwZone[] = [
  {
    id: 'internet', name: 'Internet (Untrusted)', trustLevel: 'Trust 0 — Completely Untrusted',
    hosts: ['Public clients', 'Attackers', 'Scanners', 'Legitimate users'],
    allowedFrom: [], blockedFrom: ['All internal zones by default'],
    description: 'The external zone. No trust. All traffic from the internet is denied by default at the perimeter firewall. Only explicitly permitted services (HTTPS on port 443, for example) pass through.',
    color: '#ef4444',
  },
  {
    id: 'dmz', name: 'DMZ (Demilitarized Zone)', trustLevel: 'Trust 1 — Limited Trust',
    hosts: ['Web servers', 'Reverse proxies', 'Email gateways', 'Public APIs', 'Load balancers'],
    allowedFrom: ['Internet (to specific ports: 80, 443, 25)', 'Management zone (admin access)', 'Internal (read app responses)'],
    blockedFrom: ['Cannot initiate connections to Internal zone', 'Cannot reach database zone directly'],
    description: 'Hosts services that must be accessible from the internet. Isolated from the internal network. If a DMZ host is compromised, the attacker cannot directly reach internal systems. DMZ hosts typically connect to internal databases via a second firewall or strict ACLs.',
    color: '#f97316',
  },
  {
    id: 'internal', name: 'Internal / Corporate', trustLevel: 'Trust 2 — Medium Trust',
    hosts: ['Employee workstations', 'Internal servers', 'VoIP phones', 'Printers'],
    allowedFrom: ['Internal hosts (can reach most internal services)', 'Management zone'],
    blockedFrom: ['Internet cannot initiate to internal', 'DMZ cannot initiate to internal (DMZ hosts are not trusted)'],
    description: 'The corporate LAN. Employees and internal services. Higher trust than DMZ but not unconditional. Segmented further by department/function VLANs. East-west traffic between VLANs should be inspected.',
    color: '#3b82f6',
  },
  {
    id: 'database', name: 'Database / Sensitive Data', trustLevel: 'Trust 3 — High Trust',
    hosts: ['SQL/NoSQL databases', 'Data warehouses', 'Secret stores (Vault)', 'HSMs'],
    allowedFrom: ['App servers in internal/DMZ on specific ports (5432, 3306, 27017)', 'Backup servers', 'Management zone'],
    blockedFrom: ['Direct access from workstations', 'All internet traffic', 'Broad internal access'],
    description: 'The most restricted zone. Only specific, identified application servers can connect to databases. No workstations, no internet, no broad access. Breach of the application layer does not automatically give database access.',
    color: '#8b5cf6',
  },
  {
    id: 'mgmt', name: 'Management / Out-of-Band', trustLevel: 'Trust 4 — Administrative',
    hosts: ['Bastion/jump hosts', 'SIEM', 'NMS servers', 'Ansible control nodes', 'Security tools'],
    allowedFrom: ['Network admins (from corporate workstations)', 'Security team only'],
    blockedFrom: ['Regular users', 'Internet (management is never internet-accessible)'],
    description: 'The management network. Used by network admins and security teams. Can reach all other zones for management purposes, but access to the management zone is strictly controlled. Network devices are managed only from here.',
    color: '#10b981',
  },
]

function FirewallZoneArchitecture() {
  const [active, setActive] = useState<string>('dmz')
  const z = FW_ZONES.find(x => x.id === active)!

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #8b5cf6', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#8b5cf6', marginBottom: '0.25rem' }}>Firewall Zone Architecture</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Select a zone to understand what it contains and what traffic is allowed in/out.</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {FW_ZONES.map(zone => (
          <button key={zone.id} onClick={() => setActive(zone.id)}
            style={{ padding: '0.45rem 1rem', borderRadius: '8px', border: `2px solid ${zone.color}`, background: active === zone.id ? zone.color : '#fff', color: active === zone.id ? '#fff' : zone.color, fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem' }}>
            {zone.name.split(' ')[0]}
          </button>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: '10px', border: `2px solid ${z.color}`, padding: '1.1rem 1.25rem' }}>
        <div style={{ fontWeight: 800, color: z.color, fontSize: '1.05rem', marginBottom: '0.3rem' }}>{z.name}</div>
        <div style={{ background: '#f0f4ff', borderRadius: '6px', padding: '0.35rem 0.75rem', display: 'inline-block', marginBottom: '0.65rem', fontWeight: 700, color: '#6366f1', fontSize: '0.85rem' }}>{z.trustLevel}</div>
        <div style={{ color: '#334155', lineHeight: 1.75, marginBottom: '0.75rem' }}>{z.description}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
          {[['Hosts / Services', z.hosts, '#475569'], ['Allowed From', z.allowedFrom, '#10b981'], ['Blocked From', z.blockedFrom, '#ef4444']].map(([label, items, color]) => (
            <div key={label as string}>
              <div style={{ fontWeight: 700, color: color as string, fontSize: '0.82rem', marginBottom: '0.35rem' }}>{label as string}</div>
              <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                {(items as string[]).map((item, i) => <li key={i} style={{ color: '#334155', fontSize: '0.83rem', lineHeight: 1.65 }}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── main export ─────────────────────────────────────────────────────────────
export default function FirewallsAndAclsPage() {
  return (
    <LearnLayout
      title="Firewalls and ACLs"
      description="From packet filters to next-generation firewalls: how network access control works, how rules are evaluated, and how to design a zone-based security architecture that actually holds."
      section="Networking Fundamentals — Module 34"
      readTime="28–38 min"
      updatedAt="May 2026"
    >
      {/* ── Chapter 1 ─────────────────────────────────────────── */}
      <Chapter n={1} title="The First Firewall: A Packet Filter in a Crisis" />
      <StoryBox>
        1988. The Morris Worm rampages across the internet. A DEC VAX at MIT is getting hammered by connection attempts. A researcher named Bill Cheswick at Bell Labs watches the traffic and thinks: what if we could just drop packets from specific source IPs at the router? The concept seems obvious in retrospect, but the idea of using routers for access control rather than just routing was novel. Cheswick and Steve Bellovin publish "Firewalls and Internet Security" in 1994, codifying what would become the default architecture for internet-connected networks.
      </StoryBox>
      <Para>
        A firewall is a network security device that monitors and controls incoming and outgoing traffic based on predefined rules. The word comes from the fireproof wall in a building that prevents a fire from spreading between compartments. The network analogy: a firewall prevents threats from spreading from untrusted zones (the internet) to trusted zones (the internal network).
      </Para>
      <Para>
        Firewalls have evolved through four distinct generations over 35 years. Understanding each generation — what problem it solved and what it left unsolved — explains why modern NGFWs are designed the way they are.
      </Para>
      <WowBox>
        The term "firewall" in computing predates network security. In the 1983 WarGames movie (and 1986 RFC 966 on IP routing), "firewall" referred to routing isolation. The first use in the network security context is attributed to Cheswick and Bellovin (1988), though the earliest firewall products were sold by Digital Equipment Corporation (SEAL, 1992) and Check Point (FireWall-1, 1993).
      </WowBox>

      <Divider />
      {/* ── Chapter 2 ─────────────────────────────────────────── */}
      <Chapter n={2} title="ACLs: The Building Block of All Access Control" />
      <StoryBox>
        Before dedicated firewall appliances, routers were the first line of defense. Cisco IOS access control lists (ACLs) allowed network administrators to permit or deny packets based on source/destination IP and port. A router interface with an inbound ACL would evaluate each arriving packet against a list of rules, top to bottom, and either permit or deny. This model is still the foundation of every firewall and cloud security group in use today.
      </StoryBox>
      <H2>ACL Structure and Processing</H2>
      <Para>
        An ACL is an ordered list of permit/deny rules. Each rule specifies match criteria — protocol, source IP/range, source port, destination IP/range, destination port. The ACL processor evaluates rules sequentially from top to bottom. The first rule that matches determines the action. If no rule matches, the <Accent>implicit deny all</Accent> applies — traffic not explicitly permitted is dropped.
      </Para>
      <Para>
        This "first-match, top-to-bottom" model has a critical implication: rule order matters. A broad deny rule placed before a specific permit rule will catch and deny traffic that should have been permitted. Most firewall misconfigurations stem from incorrect rule ordering.
      </Para>
      <AclRuleSimulator />
      <H2>Standard vs. Extended ACLs</H2>
      <Para>
        <Accent>Standard ACLs</Accent> (Cisco: numbered 1-99) match only on source IP address. They are placed close to the destination to avoid blocking traffic unnecessarily early. Limited use — primarily for routing policy decisions.
      </Para>
      <Para>
        <Accent>Extended ACLs</Accent> (Cisco: numbered 100-199) match on source IP, destination IP, protocol, source port, destination port. These are the ACLs used for security filtering. Place them close to the source to drop traffic early.
      </Para>
      <CodeBlock>{`! Cisco IOS Extended ACL
ip access-list extended OUTBOUND-FILTER
 permit tcp 10.0.1.0 0.0.0.255 any eq 443     ! allow HTTPS
 permit tcp 10.0.1.0 0.0.0.255 any eq 80      ! allow HTTP
 deny ip 10.0.1.0 0.0.0.255 192.168.99.0 0.0.0.255  ! block access to mgmt VLAN
 permit ip any any                             ! allow everything else

! Apply to interface (inbound = filter traffic entering the router interface)
interface GigabitEthernet0/1
 ip access-group OUTBOUND-FILTER in`}</CodeBlock>
      <Warn>
        ACL wildcard masks (Cisco) are the bitwise inverse of subnet masks: 0.0.0.255 = match the last octet as a wildcard (matches any host in /24). Do not confuse with subnet masks. <Code>0.0.0.255</Code> in an ACL is NOT the same as <Code>255.255.255.0</Code> subnet mask — they are mathematically complementary.
      </Warn>

      <Divider />
      {/* ── Chapter 3 ─────────────────────────────────────────── */}
      <Chapter n={3} title="Stateful Inspection: Tracking Connections" />
      <StoryBox>
        Early packet filters had a fundamental weakness: they could not distinguish an initial connection request from a reply. To allow users to browse the web, you had to permit inbound TCP from anywhere above port 1023 (the ephemeral port range) — because the server's response would come back to the client's ephemeral port. This created a large hole. Check Point's StateFull Inspection technology (1994) solved it by tracking the state of every TCP connection.
      </StoryBox>
      <H2>The Connection State Table</H2>
      <Para>
        A stateful firewall maintains a <Accent>connection state table</Accent> (also called a connection tracking table or session table). For every TCP connection it permits, it records:
      </Para>
      <Para>
        — Source IP, Source Port, Destination IP, Destination Port, Protocol (the 5-tuple)
      </Para>
      <Para>
        — Connection state (SYN_SENT, ESTABLISHED, FIN_WAIT_1, etc.)
      </Para>
      <Para>
        — Timeout timer (removed from table after idle period)
      </Para>
      <Para>
        When an inbound packet arrives with ACK set (a "reply"), the firewall checks the state table. If it matches an ESTABLISHED connection that was permitted outbound, the reply is automatically allowed — without needing an explicit inbound allow rule.
      </Para>
      <CodeBlock>{`# Linux iptables with conntrack (stateful)
# Allow outbound HTTP/HTTPS
iptables -A OUTPUT -p tcp --dport 80 -j ACCEPT
iptables -A OUTPUT -p tcp --dport 443 -j ACCEPT

# Allow established connections back in (no explicit inbound rules needed for replies)
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
iptables -A INPUT -m conntrack --ctstate INVALID -j DROP

# Default deny
iptables -P INPUT DROP
iptables -P FORWARD DROP`}</CodeBlock>
      <H2>Connection States in Stateful Firewalls</H2>
      <Para>
        <Accent>NEW</Accent>: first packet of a new connection (TCP SYN). The firewall checks rules to permit or deny.
      </Para>
      <Para>
        <Accent>ESTABLISHED</Accent>: connection is active. Packets matching the 5-tuple are automatically permitted.
      </Para>
      <Para>
        <Accent>RELATED</Accent>: associated with an established connection (e.g., FTP data channel related to FTP control session, ICMP error related to TCP session).
      </Para>
      <Para>
        <Accent>INVALID</Accent>: malformed packets, out-of-state packets (RST for non-existent connection). Should be dropped.
      </Para>
      <H2>State Table Exhaustion</H2>
      <Para>
        The state table has a finite size (hardware memory). If an attacker can exhaust it by sending millions of SYN packets (SYN flood), the firewall can no longer track new connections. Legitimate new connections are denied even while existing ones work. Mitigation: SYN cookies, rate limiting new connections per source IP, aggressive state table timeouts.
      </Para>
      <FirewallGenerationComparator />

      <Divider />
      {/* ── Chapter 4 ─────────────────────────────────────────── */}
      <Chapter n={4} title="Deep Packet Inspection and Application-Layer Firewalls" />
      <StoryBox>
        2005. An enterprise firewall permits outbound TCP/443 (HTTPS). An attacker runs a command-and-control server on port 443. The C2 traffic looks like HTTPS to the firewall — same port, same TLS handshake. The firewall has no way to distinguish legitimate HTTPS to a bank from malware calling home to a C2 server on the same port. This was the death knell of port-based firewalling and the birth of next-generation firewalls.
      </StoryBox>
      <H2>Application Identification (App-ID)</H2>
      <Para>
        NGFWs use multiple techniques to identify applications regardless of port:
      </Para>
      <Para>
        — <Accent>Protocol decoders</Accent>: understand application-layer protocols (HTTP, DNS, TLS). Can identify Dropbox traffic over HTTPS, Facebook over HTTPS, YouTube over HTTPS — same port, very different risk profiles.
      </Para>
      <Para>
        — <Accent>Behavioral patterns</Accent>: traffic timing, packet sizes, connection patterns. BitTorrent has a distinctive pattern even when encrypted.
      </Para>
      <Para>
        — <Accent>TLS SNI inspection</Accent>: the Server Name Indication field in the TLS ClientHello reveals the hostname being accessed, even before the certificate is exchanged.
      </Para>
      <Para>
        — <Accent>Certificate subject</Accent>: the server certificate reveals organization and domain.
      </Para>
      <H2>TLS Inspection (SSL Decryption)</H2>
      <Para>
        NGFWs can perform TLS inspection: acting as a man-in-the-middle with the organization's own CA. The firewall decrypts TLS traffic from clients (presenting its CA-signed certificate), inspects the plaintext content, then re-encrypts to the server. This allows inspection of malware, DLP policy enforcement, and URL filtering inside HTTPS.
      </Para>
      <Para>
        TLS inspection requires:
      </Para>
      <Para>
        1. A CA certificate deployed to all clients (via MDM or Group Policy).
      </Para>
      <Para>
        2. Exclusion lists for sites where inspection is legally prohibited (banking, healthcare, attorney-client) or technically problematic (certificate pinning will break).
      </Para>
      <Para>
        3. Privacy disclosures to users (intercepting encrypted traffic has legal implications in many jurisdictions).
      </Para>
      <Warn>
        TLS inspection breaks certificate pinning in applications that pin their certificates. Mobile banking apps, corporate MDM agents, and security tools often pin certificates. Excluding these from TLS inspection is essential or the applications break silently. Maintain an exclusion list and test it regularly.
      </Warn>

      <Divider />
      {/* ── Chapter 5 ─────────────────────────────────────────── */}
      <Chapter n={5} title="Zone-Based Firewall Architecture" />
      <StoryBox>
        A network administrator configures a firewall with 200 rules covering every possible source/destination combination. Two years later, no one knows which rules are still needed. Rules that were added for temporary projects never removed. Overlapping rules that contradict each other. Shadow rules that never match because an earlier rule always catches first. This is the "rule sprawl" that plagues every firewall deployment. Zone-based design prevents it by organizing security policy around network zones rather than individual hosts.
      </StoryBox>
      <FirewallZoneArchitecture />
      <H2>Zone Design Principles</H2>
      <Para>
        1. <Accent>Trust levels increase inward</Accent>: Internet (untrusted) → DMZ (limited trust) → Internal (medium trust) → Database (high trust). Traffic is permitted from less trusted to more trusted zones only for specific, necessary purposes.
      </Para>
      <Para>
        2. <Accent>Default deny between zones</Accent>: no traffic crosses a zone boundary unless explicitly permitted. The firewall policy is a whitelist, not a blacklist.
      </Para>
      <Para>
        3. <Accent>Least privilege</Accent>: DMZ web servers can reach specific database servers on specific ports — not the entire database zone. Specificity reduces blast radius.
      </Para>
      <Para>
        4. <Accent>No bypass paths</Accent>: ensure no routing path exists that bypasses the firewall. VLAN configurations, routing decisions, and firewall placement must all align.
      </Para>
      <H2>The Two-Firewall DMZ</H2>
      <Para>
        Best practice for sensitive environments: two firewalls with the DMZ between them. The outer firewall separates the internet from the DMZ. The inner firewall separates the DMZ from the internal network. Compromising the DMZ requires defeating both firewalls. The outer and inner firewalls should be from different vendors — a vulnerability in one vendor's product doesn't compromise both layers.
      </Para>
      <CodeBlock>{`# Two-firewall DMZ architecture
Internet
    │ (443, 25 allowed)
[Outer FW — Vendor A]
    │
   DMZ: Web servers, Email gateways, Load balancers
    │ (only app→DB on port 5432)
[Inner FW — Vendor B]
    │
Internal: Corporate LAN
    │
[Database segment — additional ACLs]
    │
Databases`}</CodeBlock>

      <Divider />
      {/* ── Chapter 6 ─────────────────────────────────────────── */}
      <Chapter n={6} title="iptables and nftables: Linux Firewalling" />
      <StoryBox>
        Every Linux server is also a potential firewall. The kernel's netfilter framework intercepts packets at multiple points in the network stack. iptables (and its successor nftables) provides a userspace interface to configure netfilter rules. Understanding iptables is essential for server hardening, container networking, and cloud-native security.
      </StoryBox>
      <H2>iptables Tables and Chains</H2>
      <Para>
        iptables organizes rules into tables, each with predefined chains:
      </Para>
      <Para>
        <Accent>filter</Accent>: primary security filtering. Chains: INPUT (packets destined for the local host), OUTPUT (packets originating from the local host), FORWARD (packets routed through the host).
      </Para>
      <Para>
        <Accent>nat</Accent>: Network Address Translation. Chains: PREROUTING (DNAT — change destination IP), POSTROUTING (SNAT/MASQUERADE — change source IP).
      </Para>
      <Para>
        <Accent>mangle</Accent>: modify packet headers (TTL, TOS, mark for policy routing).
      </Para>
      <Para>
        <Accent>raw</Accent>: bypass conntrack for high-performance applications.
      </Para>
      <CodeBlock>{`# Minimal server hardening iptables ruleset
# Flush existing rules
iptables -F && iptables -X

# Default policies: DROP everything
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT   # or DROP if you want strict egress filtering

# Allow loopback
iptables -A INPUT -i lo -j ACCEPT

# Allow established/related connections (stateful)
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
iptables -A INPUT -m conntrack --ctstate INVALID -j DROP

# Allow SSH from admin VLAN only
iptables -A INPUT -p tcp -s 10.0.5.0/24 --dport 22 -m conntrack --ctstate NEW -j ACCEPT

# Allow HTTPS
iptables -A INPUT -p tcp --dport 443 -m conntrack --ctstate NEW -j ACCEPT

# Rate-limit new SSH connections (anti-brute-force)
iptables -A INPUT -p tcp --dport 22 -m conntrack --ctstate NEW -m limit --limit 3/min --limit-burst 5 -j ACCEPT

# Save rules
iptables-save > /etc/iptables/rules.v4`}</CodeBlock>
      <H2>nftables: The Modern Replacement</H2>
      <Para>
        nftables replaced iptables in Linux 5.2+ as the default (though iptables still works via nf_tables compatibility layer). nftables advantages: single tool for IPv4+IPv6, atomic rule updates (no mid-update inconsistency), better performance, cleaner syntax.
      </Para>
      <CodeBlock>{`# nftables equivalent
table inet filter {
  chain input {
    type filter hook input priority 0; policy drop;
    ct state established,related accept
    ct state invalid drop
    iif lo accept
    tcp dport 22 ip saddr 10.0.5.0/24 ct state new accept
    tcp dport 443 ct state new accept
    tcp dport 22 ct state new limit rate 3/minute burst 5 packets accept
  }
  chain forward {
    type filter hook forward priority 0; policy drop;
  }
  chain output {
    type filter hook output priority 0; policy accept;
  }
}`}</CodeBlock>

      <Divider />
      {/* ── Chapter 7 ─────────────────────────────────────────── */}
      <Chapter n={7} title="Cloud Firewalling: Security Groups and NACLs" />
      <StoryBox>
        AWS launched EC2 in 2006. The original security model was simple: each EC2 instance was assigned one or more "security groups" — virtual firewalls applied at the hypervisor level. Unlike traditional firewalls, security groups were stateful, could be applied to thousands of instances simultaneously, and could reference other security groups as source/destination (allowing "any instance in the web-server security group"). Cloud networking changed firewall architecture fundamentally.
      </StoryBox>
      <H2>AWS Security Groups (Stateful)</H2>
      <Para>
        AWS Security Groups are stateful virtual firewalls applied per-ENI (Elastic Network Interface). Rules specify inbound and outbound traffic. The connection tracking table is maintained by the hypervisor — return traffic for permitted connections is automatically allowed without explicit outbound rules.
      </Para>
      <CodeBlock>{`# AWS Security Group (Terraform)
resource "aws_security_group" "web" {
  name_prefix = "web-"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]   # internet HTTPS
  }
  ingress {
    from_port       = 22
    to_port         = 22
    protocol        = "tcp"
    security_groups = [aws_security_group.bastion.id]  # SSH only from bastion SG
  }
  egress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.database.id]  # DB access only
  }
}`}</CodeBlock>
      <H2>AWS Network ACLs (Stateless)</H2>
      <Para>
        NACLs (Network Access Control Lists) are stateless subnet-level filters applied at the VPC subnet boundary. Because they are stateless, you must explicitly allow both inbound and outbound directions (including ephemeral ports for replies). NACLs are evaluated in rule-number order; the first matching rule wins. Use NACLs as a coarse second layer of defense, not as a replacement for security groups.
      </Para>
      <H2>Cloud-Native Firewall Products</H2>
      <Para>
        <Accent>AWS Network Firewall</Accent>: stateful inspection with Suricata-based rule engine. Inspects VPC-to-internet, east-west, and VPN traffic with stateful protocol tracking and IPS signatures.
      </Para>
      <Para>
        <Accent>Azure Firewall</Accent>: managed FQDN filtering, network rules, application rules. DNAT for inbound. Threat intelligence-based filtering.
      </Para>
      <Para>
        <Accent>GCP Cloud Firewall</Accent>: VPC-level rules with service account-based source/destination (instead of just IPs). Hierarchical policies across organizations.
      </Para>

      <Divider />
      {/* ── Chapter 8 ─────────────────────────────────────────── */}
      <Chapter n={8} title="Firewall Rule Management and Best Practices" />
      <StoryBox>
        A PCI-DSS audit reveals that a bank's firewall has 4,800 rules. Of those, 1,200 are never matched (shadow rules, duplicates, or rules for decommissioned systems). 300 rules have "any" as both source and destination, creating unintentional holes. The cleanup takes 6 months of careful analysis. This is not unusual — it is the default state of unmanaged firewall rule bases.
      </StoryBox>
      <H2>Rule Design Principles</H2>
      <Para>
        1. <Accent>Default deny, explicit permit</Accent>: start from zero, add only what is needed. Never start from permit-all and add denies.
      </Para>
      <Para>
        2. <Accent>Specificity over generality</Accent>: permit TCP from app-server-subnet to db-server:5432 — not "permit tcp any any".
      </Para>
      <Para>
        3. <Accent>Documentation</Accent>: every rule needs a comment explaining why it exists, who requested it, and when it can be removed.
      </Para>
      <Para>
        4. <Accent>Expiry dates</Accent>: temporary rules (for testing, emergency access) should have removal dates set in the ticket system.
      </Para>
      <Para>
        5. <Accent>Rule review cadence</Accent>: audit firewall rules quarterly. Use firewall rule analysis tools (Tufin, AlgoSec) to identify unused, shadowed, or overly permissive rules.
      </Para>
      <H2>Common Firewall Mistakes</H2>
      <Para>
        <Accent>Shadow rules</Accent>: a broader rule above a specific rule catches everything the specific rule would catch. The specific rule never fires.
      </Para>
      <Para>
        <Accent>Any-any rules</Accent>: <Code>permit ip any any</Code> defeats the purpose of the firewall. Often added by frustrated admins when troubleshooting and never removed.
      </Para>
      <Para>
        <Accent>Inbound management from internet</Accent>: SSH, RDP, or management interfaces accessible from the internet. Default in many cloud deployments. Always restrict management to specific source IPs or a VPN/bastion.
      </Para>
      <Para>
        <Accent>No egress filtering</Accent>: most organizations control inbound traffic but ignore outbound. Egress filtering catches malware calling home, data exfiltration, and DNS amplification from internal hosts.
      </Para>

      <Divider />
      {/* ── Chapter 9 ─────────────────────────────────────────── */}
      <Chapter n={9} title="NAT: Network Address Translation and Its Security Implications" />
      <StoryBox>
        1994. IANA realizes IPv4 addresses will run out. RFC 1631 proposes Network Address Translation: private IPs (10.x.x.x, 172.16.x.x, 192.168.x.x) on the inside, a single public IP on the outside. NAT translates between them. This buys the internet 20+ years. The side effect that everyone noticed: NAT provides a degree of implicit security — internal hosts are not directly routable from the internet.
      </StoryBox>
      <H2>How NAT Works</H2>
      <Para>
        <Accent>SNAT (Source NAT)</Accent>: when a packet leaves the private network, the firewall replaces the source IP (private) with the public IP and records the mapping (src_private_IP:src_port → public_IP:nat_port) in the NAT table. When the reply arrives at the public IP, the firewall translates back to the private address.
      </Para>
      <Para>
        <Accent>DNAT (Destination NAT)</Accent>: for inbound connections to published services. The firewall translates the destination public IP:port to an internal private IP:port. Used for port forwarding and load balancing.
      </Para>
      <CodeBlock>{`# iptables NAT for internet-sharing
# MASQUERADE: auto-uses the outgoing interface's IP as SNAT source
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

# DNAT: forward port 443 to internal web server
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 443 -j DNAT --to-destination 192.168.1.10:443
iptables -A FORWARD -p tcp -d 192.168.1.10 --dport 443 -j ACCEPT`}</CodeBlock>
      <H2>NAT is Not a Firewall</H2>
      <Para>
        NAT provides <em>implicit</em> protection: internal hosts are not directly addressable from the internet. But this is a side effect, not a security feature. NAT does not:
      </Para>
      <Para>
        — Filter traffic by port or protocol
      </Para>
      <Para>
        — Inspect packet content
      </Para>
      <Para>
        — Prevent outbound connections to malicious destinations
      </Para>
      <Para>
        — Protect against compromised hosts on the inside
      </Para>
      <Para>
        IPv6 eliminates the need for NAT (every device gets a globally routable address). IPv6 networks require explicit firewall rules to protect internal hosts — the "behind NAT = protected" assumption doesn't apply.
      </Para>

      <Divider />
      {/* ── Chapter 10 ─────────────────────────────────────────── */}
      <Chapter n={10} title="Web Application Firewalls (WAF)" />
      <StoryBox>
        A traditional NGFW permits outbound port 443 and inbound port 443 to a web server. A SQL injection attack arrives via a crafted HTTP POST body on port 443. The NGFW sees: valid TLS, valid HTTP, allowed port. It passes. A Web Application Firewall (WAF) sits in front of the web server and inspects the HTTP content — the URLs, headers, cookies, and body — for known attack patterns like SQL injection, XSS, and path traversal.
      </StoryBox>
      <H2>WAF vs. NGFW</H2>
      <Para>
        NGFWs understand protocols up to Layer 7 and can identify applications, but they operate on policy (allow/deny Dropbox, allow/deny YouTube). WAFs inspect the content of HTTP/HTTPS requests and responses for application-layer attack patterns. They are complementary, not alternatives.
      </Para>
      <H2>WAF Rule Types</H2>
      <Para>
        <Accent>Signature-based</Accent>: match known attack patterns. OWASP ModSecurity Core Rule Set (CRS) contains hundreds of signatures for SQLi, XSS, LFI, RFI, SSRF. Updated regularly as new attack patterns emerge.
      </Para>
      <Para>
        <Accent>Positive model (allowlist)</Accent>: learn normal application behavior — valid URLs, expected parameter formats, allowed methods. Block everything that deviates. Lower false-positive rate but requires training period.
      </Para>
      <Para>
        <Accent>Rate limiting</Accent>: block IPs making excessive requests. Defeats brute force and credential stuffing.
      </Para>
      <Para>
        <Accent>Bot detection</Accent>: CAPTCHAs, browser fingerprinting, behavioral analysis to distinguish human users from automated bots.
      </Para>
      <CodeBlock>{`# ModSecurity / OWASP CRS (Apache/NGINX)
# Block SQL injection attempts
SecRule ARGS "@detectSQLi" \
  "id:942100,phase:2,block,t:none,t:urlDecodeUni,msg:'SQL Injection Attack Detected'"

# Block XSS attempts
SecRule ARGS "@detectXSS" \
  "id:941100,phase:2,block,msg:'XSS Attack Detected'"

# AWS WAF managed rule (Terraform)
resource "aws_wafv2_web_acl" "main" {
  rule {
    name     = "AWSManagedRulesCommonRuleSet"
    priority = 1
    override_action { none {} }
    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }
  }
}`}</CodeBlock>

      <Divider />
      {/* ── Chapter 11 ─────────────────────────────────────────── */}
      <Chapter n={11} title="Firewall High Availability and Failover" />
      <StoryBox>
        A production firewall fails at 3 AM. All internet traffic stops. The firewall is a single point of failure for the entire organization. This scenario drives the universal practice of firewall HA (High Availability) — running two firewalls in active-passive or active-active mode with synchronized state tables.
      </StoryBox>
      <H2>Active-Passive HA</H2>
      <Para>
        One firewall is active and handles all traffic. A second is in standby, receiving synchronized connection state. A heartbeat link between them detects failure. On failover (active fails to respond), the passive firewall becomes active, inherits the connection state, and traffic resumes with minimal interruption. Existing TCP connections survive failover because the new active firewall already knows their state.
      </Para>
      <H2>Active-Active HA</H2>
      <Para>
        Both firewalls handle traffic simultaneously, sharing load. More complex — requires asymmetric routing to be handled carefully (both firewalls must see both directions of each connection). Used when throughput exceeds a single unit's capacity.
      </Para>
      <H2>State Synchronization</H2>
      <Para>
        Firewalls synchronize: connection state table, NAT table, authentication sessions, and VPN tunnels. The sync link should be dedicated (not shared with user traffic) and isolated. Some vendors support multi-site HA for geographic redundancy.
      </Para>

      <Divider />
      {/* ── Chapter 12 ─────────────────────────────────────────── */}
      <Chapter n={12} title="Firewall Bypasses and Evasion Techniques" />
      <StoryBox>
        A penetration tester finds a corporate firewall that blocks outbound TCP except on ports 80 and 443. They run their C2 server on port 443 with valid TLS. The firewall passes the traffic — it looks like HTTPS. Next, they try SSH over port 443 (using the firewall's TLS inspection bypass for the corporate SSO). Through a series of protocol tunneling and evasion techniques, they maintain a persistent connection from the target network to their infrastructure despite the "strict" firewall.
      </StoryBox>
      <H2>Protocol Tunneling</H2>
      <Para>
        Any protocol can carry another protocol's traffic inside it:
      </Para>
      <Para>
        — <Accent>DNS tunneling</Accent>: encode data in DNS query labels (e.g., <Code>base64data.attacker.com</Code>). DNS is nearly always permitted outbound. Tools: iodine, dnscat2. Detection: query rate monitoring, response size analysis.
      </Para>
      <Para>
        — <Accent>HTTPS tunneling</Accent>: legitimate-looking HTTPS from a browser-embedded payload on port 443. TLS inspection needed to detect.
      </Para>
      <Para>
        — <Accent>ICMP tunneling</Accent>: encode data in ICMP echo request/reply payloads. Tools: icmpsh. Detection: unusual payload sizes in ICMP, rate limiting ICMP.
      </Para>
      <H2>Firewall Bypass via Allowed Protocols</H2>
      <Para>
        <Accent>IPv6 bypass</Accent>: if IPv4 is filtered but IPv6 is not explicitly blocked, an attacker can tunnel over IPv6 if the network supports it.
      </Para>
      <Para>
        <Accent>HTTPS proxy bypass</Accent>: CONNECT method on port 443 can tunnel any TCP protocol. A firewall that allows HTTPS without deep inspection allows arbitrary TCP tunnels.
      </Para>
      <Para>
        The lesson: firewalls that filter by port and protocol are defeated by any protocol running on an allowed port. TLS inspection and application-level detection are necessary to close these gaps — but come with their own costs and complexities.
      </Para>

      <Divider />
      {/* ── Chapter 13 ─────────────────────────────────────────── */}
      <Chapter n={13} title="Misconceptions About Firewalls and ACLs" />
      <Err>
        "A firewall makes my network secure." — A firewall is one layer of defense. It controls which traffic is permitted to flow between zones. It does not prevent: attacks within the same zone (lateral movement), insider threats, application-layer vulnerabilities in permitted traffic (SQL injection over port 443), attacks via permitted protocols (malware download via HTTPS), or social engineering. Security requires defense in depth.
      </Err>
      <Err>
        "Stateful firewalls don't need explicit inbound rules for established sessions." — Correct for the firewall itself, but only for the direction of established connections. A stateful firewall that permits outbound TCP/443 will automatically allow inbound responses. However, if you allow a server to make outbound connections, you are also implicitly allowing any server it connects to send data back. This matters for servers — their outbound connections should be as restricted as inbound.
      </Err>
      <Err>
        "NAT provides security equivalent to a firewall." — NAT hides internal IPs (a side effect of address translation, not a security feature), but it doesn't filter traffic. An open NAT that forwards ports, or a NAT table entry established by internal malware, provides no security. IPv6 networks without NAT require explicit firewall rules, making the distinction obvious.
      </Err>
      <Err>
        "More firewall rules mean better security." — Complexity is the enemy of security. A rule base with 5,000 rules is harder to audit, more likely to contain contradictions, and more prone to misconfigurations than a clean 50-rule policy. The principle of minimality: fewer, more specific rules are more secure than many broad ones. Every unnecessary rule is a potential misconfiguration.
      </Err>
      <Err>
        "Cloud security groups work the same as traditional firewalls." — Cloud security groups are stateful packet filters applied at the hypervisor level. They have no application awareness, no TLS inspection, and no protocol-level intelligence. They also differ from traditional firewalls in important ways: they can reference other security groups as sources/destinations (instead of just IPs), they are auto-applied to new instances, and they operate per-ENI rather than per-subnet. Supplementing security groups with NACLs and cloud-native firewall products provides additional depth.
      </Err>

      <Divider />
      {/* ── Chapter 14 ─────────────────────────────────────────── */}
      <Chapter n={14} title="IQ Depth Check: Firewall and ACL Mastery" />
      <IQ level="Beginner">
        <strong>What is the difference between a stateless packet filter and a stateful firewall?</strong><br />
        A stateless packet filter evaluates each packet independently based on its headers (src/dst IP, ports, protocol). It cannot tell if a packet is part of an established connection or a new attack. A stateful firewall maintains a connection state table and tracks TCP/UDP sessions. It automatically permits return traffic for established connections without explicit inbound rules. A stateless filter would need a broad "permit inbound TCP from any port {'>'} 1024" to allow web browsing replies; a stateful firewall automatically permits these replies while blocking uninitiated inbound connections.
      </IQ>
      <IQ level="Intermediate">
        <strong>Explain ACL rule processing: first-match vs. last-match and the implicit deny.</strong><br />
        Most firewalls and routers use first-match, top-to-bottom ACL processing. The packet is compared against each rule in order; the first matching rule's action (permit or deny) is applied. Processing stops — subsequent rules are not checked. The implicit deny is a virtual rule at the bottom of every ACL: if no rule matches, the packet is dropped. This means: (1) more specific rules should come before broader rules that would shadow them; (2) a missing explicit permit means traffic is denied; (3) troubleshoot connectivity by checking which rule the packet hits — if it's the implicit deny, a permit rule is missing.
      </IQ>
      <IQ level="Senior">
        <strong>How does TLS inspection work in an NGFW, and what applications will break if TLS inspection is not properly excluded?</strong><br />
        TLS inspection: the NGFW acts as an SSL/TLS proxy. For outbound HTTPS, the firewall intercepts the TLS ClientHello, establishes its own TLS session to the destination server (verifying its certificate), then presents a newly generated certificate (signed by the corporate CA) to the client. The client trusts the firewall's CA because it was installed via MDM/GPO. The firewall decrypts, inspects, and re-encrypts. Applications that break: (1) certificate pinning (mobile banking, Duo, corporate apps that hardcode expected certificates); (2) mutual TLS (client certificates don't chain through the firewall's CA); (3) HPKP-enabled sites (deprecated but still seen); (4) services with their own CA trust chains (Apple APNs, Google FCM). The exclusion list must cover these, or the applications silently fail or show cert errors.
      </IQ>
      <IQ level="PhD">
        <strong>Explain why state table exhaustion is a fundamental vulnerability in stateful firewalls and how hardware-based solutions address it at the chip level.</strong><br />
        Stateful firewalls allocate a state table entry for every new connection: a 5-tuple (src IP, src port, dst IP, dst port, protocol) plus metadata (state, timers, sequence numbers for TCP). The table lives in TCAM (Ternary Content Addressable Memory) or DRAM. TCAM enables O(1) lookup but is expensive and limited in size (1-4M entries typical on enterprise firewalls). An attacker sending 100,000 SYN packets/second from spoofed IPs creates 100,000 half-open entries per second. With 1M table size and 60-second half-open timeout, 100k/s × 60s = 6M entries — the table exhausts in seconds. Hardware-based solutions: (1) SYN cookies offloaded to network processors — no state allocated for SYN-only packets; state created only when ACK arrives with valid cookie (verified in hardware); (2) per-source rate limiting in hardware (CAM-based packet rate tracking per /32 source) before packets reach the state engine; (3) tiered storage — hot connections in TCAM, warm connections in DRAM, session offload to NP (Network Processor) with dedicated connection memory. Modern firewall ASICs (Palo Alto's CN-series, Fortinet's NP7) process 100M+ packets/second with hardware-enforced rate limiting, removing the state exhaustion vulnerability from software-only implementations.
      </IQ>

      <Divider />
      <KeyTakeaways items={[
        'ACLs are ordered permit/deny rules evaluated top-to-bottom with first-match wins; the implicit deny all at the bottom drops everything not explicitly permitted.',
        'Stateless packet filters evaluate each packet independently; stateful firewalls track connection state and automatically permit return traffic for established sessions.',
        'NGFWs add application identification (App-ID), user awareness, TLS inspection, and threat intelligence to stateful inspection — identifying applications regardless of port.',
        'TLS inspection breaks certificate pinning; maintain an exclusion list for banking apps, MDM agents, and mutual-TLS endpoints.',
        'Zone-based design: Internet (trust 0) → DMZ (trust 1) → Internal (trust 2) → Database (trust 3) → Management (admin). Default deny between zones; explicit permit only.',
        'Two-firewall DMZ from different vendors provides defense-in-depth; a vulnerability in one vendor does not compromise both layers.',
        'NAT hides internal IPs as a side effect of address translation — it is not a firewall. IPv6 networks without NAT require explicit firewall rules.',
        'State table exhaustion (SYN flood against firewall itself) is mitigated by SYN cookies, per-source rate limiting, and hardware-offloaded connection tracking.',
        'DNS tunneling, HTTPS C2, and protocol tunneling bypass port-based firewalls; TLS inspection and application-layer detection are needed to close these gaps.',
        'WAFs complement NGFWs: NGFWs allow/deny applications; WAFs inspect HTTP content for SQLi, XSS, and OWASP Top 10 attacks within permitted HTTPS traffic.',
      ]} />
    </LearnLayout>
  )
}
