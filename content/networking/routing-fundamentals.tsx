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

interface RouteEntry { prefix: string; mask: number; nextHop: string; metric: number; protocol: string; color: string }

const ROUTING_TABLE: RouteEntry[] = [
  { prefix: '0.0.0.0',    mask: 0,  nextHop: '203.0.113.1', metric: 1,   protocol: 'Static',    color: '#6b7280' },
  { prefix: '10.0.0.0',   mask: 8,  nextHop: '10.0.0.1',    metric: 110, protocol: 'OSPF',      color: '#3b82f6' },
  { prefix: '10.10.0.0',  mask: 16, nextHop: '10.10.0.1',   metric: 110, protocol: 'OSPF',      color: '#3b82f6' },
  { prefix: '10.10.10.0', mask: 24, nextHop: '10.10.10.1',  metric: 110, protocol: 'OSPF',      color: '#3b82f6' },
  { prefix: '192.168.1.0',mask: 24, nextHop: '192.168.1.1', metric: 1,   protocol: 'Connected', color: G },
  { prefix: '172.16.0.0', mask: 12, nextHop: '172.16.1.1',  metric: 1,   protocol: 'Static',    color: '#6b7280' },
]

function ipToNum(ip: string): number {
  const parts = ip.split('.').map(Number)
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0
}

function RoutingTableSimulator() {
  const [destIP, setDestIP] = useState('10.10.10.50')
  const [looked, setLooked] = useState(false)

  const lookup = () => setLooked(true)
  const reset = () => { setLooked(false) }

  const valid = /^\d{1,3}(\.\d{1,3}){3}$/.test(destIP) && destIP.split('.').every(p => Number(p) >= 0 && Number(p) <= 255)

  let matchedRoute: RouteEntry | null = null
  const matchResults: { route: RouteEntry; matches: boolean }[] = []

  if (valid && looked) {
    const destNum = ipToNum(destIP)
    for (const route of ROUTING_TABLE) {
      const maskNum = route.mask === 0 ? 0 : (~((1 << (32 - route.mask)) - 1)) >>> 0
      const netNum = (ipToNum(route.prefix) & maskNum) >>> 0
      const destMasked = (destNum & maskNum) >>> 0
      const matches = destMasked === netNum
      matchResults.push({ route, matches })
      if (matches) {
        if (!matchedRoute || route.mask > matchedRoute.mask) {
          matchedRoute = route
        }
      }
    }
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Interactive — Routing Table Lookup</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Enter a destination IP to see which routes match and which wins via Longest Prefix Match.</p>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div>
          <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Destination IP</label>
          <input value={destIP} onChange={e => { setDestIP(e.target.value); setLooked(false) }}
            style={{ background: 'var(--bg)', border: `1px solid ${valid ? 'var(--border)' : '#ef4444'}`, borderRadius: 6, padding: '7px 12px', color: G, fontSize: 14, fontFamily: 'var(--font-mono)', width: 160 }} />
        </div>
        <button onClick={lookup} disabled={!valid}
          style={{ background: valid ? G : 'var(--border)', color: valid ? '#000' : 'var(--muted)', border: 'none', borderRadius: 6, padding: '8px 18px', fontSize: 13, fontWeight: 700, cursor: valid ? 'pointer' : 'default' }}>
          Lookup
        </button>
        {looked && <button onClick={reset} style={{ background: 'var(--bg)', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 14px', fontSize: 13, cursor: 'pointer' }}>Reset</button>}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
          <thead>
            <tr style={{ background: `${G}15` }}>
              {['Network', 'Prefix', 'Next Hop', 'Metric', 'Protocol', looked ? 'Match?' : ''].filter(Boolean).map(h => (
                <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: G, fontWeight: 700, fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROUTING_TABLE.map((r, i) => {
              const mr = matchResults.find(x => x.route === r)
              const isWinner = matchedRoute === r
              return (
                <tr key={i} style={{
                  background: isWinner ? `${r.color}20` : mr?.matches ? `${r.color}08` : 'transparent',
                  borderBottom: '1px solid var(--border)',
                  border: isWinner ? `2px solid ${r.color}` : undefined,
                }}>
                  <td style={{ padding: '7px 12px', color: r.color, fontWeight: isWinner ? 700 : 400 }}>{r.prefix}</td>
                  <td style={{ padding: '7px 12px', color: isWinner ? r.color : 'var(--muted)', fontWeight: isWinner ? 700 : 400 }}>/{r.mask}</td>
                  <td style={{ padding: '7px 12px', color: 'var(--muted)' }}>{r.nextHop}</td>
                  <td style={{ padding: '7px 12px', color: 'var(--muted)' }}>{r.metric}</td>
                  <td style={{ padding: '7px 12px' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, background: `${r.color}20`, color: r.color, padding: '2px 6px', borderRadius: 4 }}>{r.protocol}</span>
                  </td>
                  {looked && (
                    <td style={{ padding: '7px 12px' }}>
                      {isWinner ? <span style={{ color: G, fontWeight: 700 }}>WINNER (LPM)</span>
                        : mr?.matches ? <span style={{ color: '#f59e0b' }}>matches</span>
                        : <span style={{ color: '#374151' }}>—</span>}
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {matchedRoute && (
        <div style={{ marginTop: 14, background: `${matchedRoute.color}10`, border: `1px solid ${matchedRoute.color}30`, borderRadius: 8, padding: 12 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: matchedRoute.color, margin: '0 0 4px' }}>
            Result: forwarding to {matchedRoute.nextHop} via {matchedRoute.protocol} route ({matchedRoute.prefix}/{matchedRoute.mask})
          </p>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>
            Longest Prefix Match selected the /{matchedRoute.mask} route over all other matching routes.
          </p>
        </div>
      )}
    </div>
  )
}

const PROTOCOLS = [
  { name: 'Static',   ad: 1,   type: 'Manual',          alg: 'None',          scope: 'Local only',      color: '#6b7280', desc: 'Manually configured routes. AD=1 (very trusted). No overhead but no automatic updates when topology changes.' },
  { name: 'OSPF',     ad: 110, type: 'Link-State',      alg: 'Dijkstra (SPF)', scope: 'Enterprise',     color: '#3b82f6', desc: 'Open standard. Uses LSAs to build a topology map. Calculates shortest path. Fast convergence. Areas for scalability.' },
  { name: 'EIGRP',    ad: 90,  type: 'Advanced DV',     alg: 'DUAL',          scope: 'Enterprise (Cisco)', color: '#8b5cf6', desc: 'Cisco proprietary (now open). DUAL algorithm for fast loop-free convergence. Low CPU overhead. Feasibility condition prevents loops.' },
  { name: 'BGP',      ad: 20,  type: 'Path-Vector',     alg: 'Best Path',     scope: 'Internet',        color: '#f97316', desc: 'Border Gateway Protocol. Routes between autonomous systems. Policy-based, not metric-based. The internet routing protocol.' },
  { name: 'RIPv2',    ad: 120, type: 'Distance-Vector', alg: 'Bellman-Ford',  scope: 'Small networks',  color: '#f59e0b', desc: 'Simple but limited. 15-hop maximum. Slow convergence (30s update timer). Not suitable for production networks.' },
  { name: 'IS-IS',    ad: 115, type: 'Link-State',      alg: 'Dijkstra (SPF)', scope: 'ISP / Datacenter', color: G,        desc: 'ISO-based link-state protocol. Preferred by ISPs over OSPF. Native multi-topology support. Runs over L2 (not IP).' },
  { name: 'Connected',ad: 0,   type: 'Direct',          alg: 'None',          scope: 'Local',           color: '#10b981', desc: 'Directly connected subnets. AD=0 (most trusted). Installed automatically when interface is up with an IP address.' },
]

function RoutingProtocolComparator() {
  const [selected, setSelected] = useState<string | null>(null)
  const proto = PROTOCOLS.find(p => p.name === selected)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Interactive — Routing Protocol Comparator</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Click a protocol to compare Administrative Distance, type, and use case.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '90px 40px 120px 120px 140px', padding: '8px 12px', background: `${G}15`, borderRadius: '8px 8px 0 0', fontSize: 11, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', gap: 0 }}>
          <span>Protocol</span><span>AD</span><span>Type</span><span>Algorithm</span><span>Scope</span>
        </div>
        {PROTOCOLS.map((p, i) => (
          <div key={p.name} onClick={() => setSelected(selected === p.name ? null : p.name)}
            style={{ display: 'grid', gridTemplateColumns: '90px 40px 120px 120px 140px', padding: '10px 12px', background: selected === p.name ? `${p.color}12` : i % 2 === 0 ? 'var(--bg)' : 'var(--surface)', border: `1px solid ${selected === p.name ? p.color : 'var(--border)'}`, borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderRadius: i === PROTOCOLS.length - 1 ? '0 0 8px 8px' : 0, cursor: 'pointer', transition: 'all .15s', alignItems: 'center', gap: 0 }}>
            <code style={{ fontSize: 12, fontWeight: 700, color: p.color }}>{p.name}</code>
            <span style={{ fontSize: 12, fontWeight: 700, color: p.ad === 0 ? G : p.ad < 20 ? G : 'var(--text)' }}>{p.ad}</span>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>{p.type}</span>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>{p.alg}</span>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>{p.scope}</span>
          </div>
        ))}
      </div>

      {proto && (
        <div style={{ marginTop: 14, background: `${proto.color}10`, border: `1px solid ${proto.color}30`, borderRadius: 8, padding: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: proto.color, margin: '0 0 4px' }}>{proto.name} — AD {proto.ad}</p>
          <p style={{ fontSize: 13, color: 'var(--text)', margin: 0 }}>{proto.desc}</p>
        </div>
      )}
    </div>
  )
}

interface EcmpPath { id: number; nextHop: string; metric: number; interface: string; active: boolean }

function EcmpLoadBalancer() {
  const [paths, setPaths] = useState<EcmpPath[]>([
    { id: 1, nextHop: '10.0.0.1', metric: 100, interface: 'Gi0/0', active: true },
    { id: 2, nextHop: '10.0.1.1', metric: 100, interface: 'Gi0/1', active: true },
    { id: 3, nextHop: '10.0.2.1', metric: 100, interface: 'Gi0/2', active: true },
    { id: 4, nextHop: '10.0.3.1', metric: 150, interface: 'Gi0/3', active: true },
  ])
  const [flowCount, setFlowCount] = useState(0)
  const [flowLog, setFlowLog] = useState<string[]>([])

  const activePaths = paths.filter(p => p.active)
  const ecmpPaths = activePaths.filter(p => p.metric === Math.min(...activePaths.map(x => x.metric)))

  const sendFlow = () => {
    const idx = flowCount % ecmpPaths.length
    const path = ecmpPaths[idx]
    setFlowLog(prev => [`Flow ${flowCount + 1} → ${path.nextHop} (${path.interface})`, ...prev.slice(0, 7)])
    setFlowCount(c => c + 1)
  }

  const togglePath = (id: number) => {
    setPaths(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p))
    setFlowCount(0)
    setFlowLog([])
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Interactive — ECMP Load Balancing</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Toggle paths on/off and send flows to see ECMP routing in action.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, marginBottom: 16 }}>
        {paths.map(p => {
          const isEcmp = p.active && p.metric === Math.min(...activePaths.map(x => x.metric))
          return (
            <div key={p.id} onClick={() => togglePath(p.id)}
              style={{ padding: '10px 14px', background: !p.active ? '#6b728010' : isEcmp ? `${G}12` : '#f59e0b10', border: `2px solid ${!p.active ? '#6b7280' : isEcmp ? G : '#f59e0b'}`, borderRadius: 8, cursor: 'pointer', transition: 'all .15s', opacity: p.active ? 1 : 0.5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <code style={{ fontSize: 12, fontWeight: 700, color: !p.active ? '#6b7280' : isEcmp ? G : '#f59e0b' }}>{p.interface}</code>
                <span style={{ fontSize: 10, fontWeight: 700, color: !p.active ? '#6b7280' : isEcmp ? G : '#f59e0b', background: `${!p.active ? '#6b728020' : isEcmp ? `${G}20` : '#f59e0b20'}`, padding: '2px 6px', borderRadius: 10 }}>
                  {!p.active ? 'DOWN' : isEcmp ? 'ECMP' : 'inactive (higher metric)'}
                </span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>→ {p.nextHop} | metric: {p.metric}</div>
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
        <button onClick={sendFlow} disabled={ecmpPaths.length === 0}
          style={{ background: ecmpPaths.length > 0 ? G : 'var(--border)', color: ecmpPaths.length > 0 ? '#000' : 'var(--muted)', border: 'none', borderRadius: 6, padding: '8px 16px', fontSize: 13, fontWeight: 700, cursor: ecmpPaths.length > 0 ? 'pointer' : 'default' }}>
          Send Flow
        </button>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>{ecmpPaths.length} active ECMP path{ecmpPaths.length !== 1 ? 's' : ''} — load balanced round-robin</span>
      </div>

      <div style={{ background: '#0a0a0a', borderRadius: 8, padding: 12, minHeight: 80 }}>
        {flowLog.length === 0 && <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>Click "Send Flow" to simulate ECMP routing...</p>}
        {flowLog.map((line, i) => (
          <div key={i} style={{ fontSize: 12, color: i === 0 ? G : '#6b7280', fontFamily: 'var(--font-mono)', lineHeight: 1.7 }}>{line}</div>
        ))}
      </div>
    </div>
  )
}

/* ── main module ───────────────────────────────────────────────────── */

export default function RoutingFundamentalsModule() {
  return (
    <LearnLayout
      title="Routing Fundamentals"
      description="How packets find their way across networks — from static routes to dynamic routing protocols. Understand routing tables, Administrative Distance, Longest Prefix Match, and ECMP: the mechanisms that move data across the internet."
      section="Networking Fundamentals — Module 16"
      readTime="25–35 min"
      updatedAt="May 2026"
    >
      {/* ── Chapter 1 ── */}
      <Chapter n={1} title="The Routing Problem" />

      <StoryBox>
        You send an email to someone in Tokyo. Your laptop sends it to your home router. Your home router sends it to your ISP. Your ISP sends it to a transit network. That transit network sends it to a different ISP in Japan. That ISP sends it to a data center. That data center's network sends it to the mail server. Six hops, six routing decisions. Each device along the path examined only the destination IP address and made a local forwarding decision. No device knew the entire path. No device communicated with Tokyo to ask for directions. Routing is fundamentally a distributed, local decision-making process — and that's exactly what makes it scale to the entire internet.
      </StoryBox>

      <Para>
        A router is a Layer 3 device that forwards packets between different IP networks. When a packet arrives on an interface, the router examines the destination IP address, looks it up in the <Accent>routing table</Accent>, and forwards the packet out the appropriate interface toward the next hop. This decision happens for every packet, billions of times per second on modern routers.
      </Para>

      <Para>
        The fundamental question routing answers: given a destination IP address, which outgoing interface and next-hop IP address should this packet be sent to? The routing table is the data structure that answers this question. Each entry in the routing table contains: a <Accent>destination prefix</Accent> (network address + prefix length), a <Accent>next-hop IP address</Accent> (or outgoing interface for connected networks), and a <Accent>metric</Accent> (cost/preference).
      </Para>

      <WowBox emoji="🌐" title="The BGP Default-Free Zone at Internet Scale">
        The global internet routing system — the BGP Default-Free Zone — contains approximately 900,000 IPv4 prefixes and 180,000 IPv6 prefixes. Every core internet router (there are hundreds of thousands) must hold all ~1.08 million routes in memory and perform TCAM-based Longest Prefix Match lookups at line rate — for terabit-per-second links, that means billions of route lookups per second per interface. The engineering behind making this work at internet scale is remarkable.
      </WowBox>

      <Divider />

      {/* ── Chapter 2 ── */}
      <Chapter n={2} title="The Routing Table: Structure and Population" />

      <H2>How Routes Enter the Routing Table</H2>

      <Para>
        Routes enter the routing table through three mechanisms:
      </Para>

      <Para>
        <Accent>1. Connected routes</Accent> (Administrative Distance = 0): automatically installed when an interface is configured with an IP address and the interface is up. If GigabitEthernet0/0 is configured with 192.168.1.1/24, the route 192.168.1.0/24 is instantly in the routing table as "Connected" via that interface.
      </Para>

      <Para>
        <Accent>2. Static routes</Accent> (AD = 1): manually configured by the administrator. Example: <Code>ip route 10.0.0.0 255.0.0.0 192.168.1.254</Code>. Static routes don't update automatically when topology changes — they're fixed until manually removed.
      </Para>

      <Para>
        <Accent>3. Dynamic routes</Accent> (various ADs): learned from routing protocols (OSPF, EIGRP, BGP, RIP). The protocol discovers the network topology and automatically installs routes. When topology changes (a link fails), the protocol reconverges and updates the routing table.
      </Para>

      <H2>Administrative Distance</H2>

      <Para>
        <Accent>Administrative Distance (AD)</Accent> is the "trustworthiness" of a routing information source, expressed as a number from 0 to 255. Lower is better. When multiple routing protocols learn a route to the same destination, the route from the lowest-AD source wins and is installed in the routing table.
      </Para>

      <Para>
        AD is a tie-breaker between sources, not between routes within the same protocol. OSPF internal (AD=110) always loses to EIGRP internal (AD=90) when both know a route to the same prefix — regardless of OSPF's metric. The logic: some protocols are considered more reliable than others, and the administrator configures trustworthiness via AD.
      </Para>

      <CodeBlock>
{`Cisco IOS Default Administrative Distances:
Source                   AD
Connected                 0  (most trusted)
Static                    1
EIGRP summary route       5
eBGP                     20
EIGRP internal           90
IGRP                    100
OSPF                    110
IS-IS                   115
RIPv2                   120
EIGRP external          170
iBGP                    200
Unknown / untrustworthy 255  (never installed in routing table)`}
      </CodeBlock>

      <H2>Metric</H2>

      <Para>
        Within a routing protocol, the <Accent>metric</Accent> determines which of multiple paths to the same destination is best. Each protocol uses different metrics: OSPF uses cumulative interface cost (bandwidth-based, default cost = 10^8/bandwidth-bps), EIGRP uses a composite metric (bandwidth + delay + load + reliability), RIP uses hop count (number of routers crossed), BGP uses a complex set of attributes (AS path length, local preference, MED, etc.).
      </Para>

      <Para>
        A route with a lower metric is preferred over a higher-metric route within the same routing protocol. If two routes have identical metrics, the router can use <Accent>ECMP (Equal-Cost Multi-Path)</Accent> — load balancing across multiple equal-cost paths.
      </Para>

      <RoutingTableSimulator />

      <Divider />

      {/* ── Chapter 3 ── */}
      <Chapter n={3} title="Longest Prefix Match: The Core Algorithm" />

      <StoryBox>
        A postal worker is sorting mail. The address says "100 Main Street, Springfield, IL 62701." The worker has three sorters: one for Illinois, one for Springfield, IL, and one for the specific ZIP code 62701. The most specific address wins — the ZIP-code sorter gets the mail, not the state-level sorter. Longest Prefix Match works identically: when multiple routing table entries match a destination IP, the most specific one (longest prefix) wins.
      </StoryBox>

      <Para>
        <Accent>Longest Prefix Match (LPM)</Accent> is the algorithm every router uses to select the best routing table entry for a destination IP address. Given multiple matching prefixes, the one with the longest (most specific) prefix length is selected.
      </Para>

      <H2>Why LPM Enables Internet Scale</H2>

      <Para>
        LPM enables hierarchical routing — the combination of specific routes and summary routes. An ISP can advertise a summary 10.0.0.0/8 to the internet while internally having specific routes for 10.10.10.0/24, 10.10.20.0/24, etc. Internet routers use the /8 summary; the ISP's own routers use the more specific /24 routes.
      </Para>

      <Para>
        This is also how the default route (0.0.0.0/0) works. Every destination matches 0.0.0.0/0 because zero bits are checked — but any more specific route will always win via LPM. The default route is literally the "prefix of last resort" when no more specific route matches.
      </Para>

      <H2>Floating Static Routes</H2>

      <Para>
        A <Accent>floating static route</Accent> uses a higher-than-normal AD to act as a backup. Example: a primary route learned via OSPF (AD=110) and a backup static route with AD=200 to the same destination. Normally, the OSPF route wins (lower AD). If the OSPF route disappears (the dynamic routing protocol loses the route), the floating static route "floats" to the top and becomes active — automatic failover without any routing protocol reconfiguration.
      </Para>

      <CodeBlock>
{`! Primary route via OSPF (AD 110 — installed when OSPF learns it)
! Backup floating static (AD 200 — only installed when OSPF route gone)
ip route 10.0.0.0 255.0.0.0 192.168.2.1 200   ! AD=200

! Verify both routes
show ip route 10.0.0.0
! Should show OSPF route normally
! Disconnect OSPF neighbor — floating static appears automatically`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 4 ── */}
      <Chapter n={4} title="Static Routing" />

      <StoryBox>
        Small networks don't need the overhead of routing protocols — a home router, a small office router, or a two-device WAN link. Static routes are the simplest form of routing: you tell the router exactly where to send traffic, no negotiation, no convergence, no CPU overhead. The downside: no automatic adaptation. A link fails, the static route stays, and traffic blackholes until a human fixes it. For simple topologies with few exit points and predictable traffic, static routing is elegant. For complex topologies, it becomes unmanageable.
      </StoryBox>

      <H2>Types of Static Routes</H2>

      <Para>
        <Accent>Standard static route:</Accent> explicit next-hop IP and/or outgoing interface. Most common type.
      </Para>

      <Para>
        <Accent>Default route (0.0.0.0/0):</Accent> matches all destinations with no more specific match. Every internet-connected router needs a default route pointing to the upstream ISP.
      </Para>

      <Para>
        <Accent>Null route:</Accent> points to the null0 interface (a virtual drop interface). Packets forwarded to null0 are silently discarded. Used to create "aggregate" entries that prevent routing loops — advertise a summary /16 but route unroutable /24s to null0.
      </Para>

      <Para>
        <Accent>Floating static:</Accent> high AD for backup when primary dynamic route disappears.
      </Para>

      <Para>
        <Accent>Summary static route:</Accent> a single static route covering a range of more specific networks (supernet).
      </Para>

      <CodeBlock>
{`! Standard static route — send 10.0.0.0/8 via 192.168.1.1
ip route 10.0.0.0 255.0.0.0 192.168.1.1

! Default route — send all unmatched traffic to ISP
ip route 0.0.0.0 0.0.0.0 203.0.113.1

! Null route — discard traffic to unallocated parts of summary
ip route 10.0.0.0 255.0.0.0 null0 254   ! AD=254, only wins if no other route

! IPv6 static routes
ipv6 route 2001:db8::/32 2001:db8:1::1
ipv6 route ::/0 2001:db8::1              ! IPv6 default route

! Verify
show ip route static
show ip route 10.0.0.0`}
      </CodeBlock>

      <H2>Recursive Routing and Recursion Depth</H2>

      <Para>
        A static route specifying a next-hop IP (rather than an interface) may require recursive lookup. The router installs the route with next-hop 10.0.1.1, but must look up 10.0.1.1 in the routing table to find the outgoing interface. If that lookup yields another next-hop, the recursion deepens. If no route exists for the next-hop IP, the static route is inactive (doesn't appear in the routing table). Static routes pointing to IP addresses only work if the next-hop IP is reachable.
      </Para>

      <Divider />

      {/* ── Chapter 5 ── */}
      <Chapter n={5} title="Dynamic Routing Protocols: An Overview" />

      <Para>
        Dynamic routing protocols automate route distribution. Routers running the same protocol exchange routing information, build a picture of the network topology, and independently calculate the best paths. When topology changes (link failure, new subnet added), the protocol propagates the change, and all routers reconverge automatically.
      </Para>

      <H2>Classification: Distance Vector vs. Link State vs. Path Vector</H2>

      <Para>
        <Accent>Distance Vector protocols</Accent> (RIP, IGRP): each router knows only the distance (metric) to each destination and the direction (vector) to send traffic. Routers share their routing tables with neighbors. "Routing by rumor" — a router trusts its neighbor's distance without knowing the underlying topology. Slow convergence (routers don't know if a neighbor's route is loop-free) and limited scalability (15-hop max for RIP).
      </Para>

      <Para>
        <Accent>Link State protocols</Accent> (OSPF, IS-IS): each router generates LSAs (Link State Advertisements) describing its directly connected links and neighbors. All routers flood LSAs throughout the topology. Every router has an identical Link State Database (LSDB) representing the complete topology. Each router independently runs Dijkstra's shortest-path-first (SPF) algorithm on the LSDB to calculate routing. Complete topology knowledge enables fast, loop-free convergence.
      </Para>

      <Para>
        <Accent>Path Vector protocols</Accent> (BGP): each route advertisement includes the complete path (sequence of Autonomous Systems) to the destination. This provides loop detection (a router rejects advertisements containing its own AS). BGP is optimized for policy-based routing between organizational boundaries, not for fast convergence.
      </Para>

      <RoutingProtocolComparator />

      <Divider />

      {/* ── Chapter 6 ── */}
      <Chapter n={6} title="OSPF: Open Shortest Path First" />

      <StoryBox>
        In 1988, the internet was growing beyond what RIP could handle. RIP's 15-hop limit meant networks more than 15 router-hops away were unreachable. RIP's slow convergence (routers waited 30 seconds between updates) caused traffic to flow over failed paths for up to a minute. OSPF (RFC 1131, 1989) solved both problems. It was designed from the start for large networks: no hop limit, sub-second convergence, and hierarchical design via areas. Today, OSPF remains the standard interior gateway protocol for enterprise networks worldwide.
      </StoryBox>

      <H2>OSPF Fundamentals</H2>

      <Para>
        OSPF forms <Accent>adjacencies</Accent> with neighboring routers on the same link. Adjacency formation requires: matching area ID, matching authentication (if configured), matching hello/dead timers, matching MTU (by default), and compatible subnet information. Routers exchange Hello packets (every 10 seconds on Ethernet, 30 seconds on serial by default) to establish and maintain adjacencies.
      </Para>

      <Para>
        On broadcast networks (Ethernet), OSPF elects a <Accent>DR (Designated Router)</Accent> and BDR (Backup Designated Router) to reduce flooding overhead. All other routers (DROther) form adjacencies only with the DR and BDR, not with each other. The DR represents the network segment in the LSDB, reducing the n^2 adjacency problem to n adjacencies.
      </Para>

      <H2>OSPF Areas</H2>

      <Para>
        Large OSPF domains are divided into <Accent>areas</Accent> to limit LSA flooding and SPF calculation scope. Each area has a full LSDB; flooding of detailed LSAs is confined within the area boundary. Area 0 (the backbone area) is the hub — all other areas must connect to Area 0 (directly or via virtual links). Area border routers (ABRs) sit between areas and summarize routes at the boundary.
      </Para>

      <Para>
        OSPF router types: <Accent>Internal Router</Accent> (all interfaces in same area), <Accent>ABR</Accent> (Area Border Router — connects multiple areas), <Accent>ASBR</Accent> (AS Boundary Router — redistributes external routes into OSPF), <Accent>Backbone Router</Accent> (has at least one Area 0 interface).
      </Para>

      <H2>OSPF Cost</H2>

      <Para>
        OSPF's metric is <Accent>cost</Accent> = 10^8 / bandwidth-in-bps. A 100 Mbps link has cost = 10^8 / 10^8 = 1. A 10 Mbps link has cost 10. A 1 Mbps link has cost 100. The total path cost is the sum of costs along the path. Problem: 10^8 / 10^9 (1 Gbps) = 0.1, rounded to 1 — same as 100 Mbps. OSPF can't distinguish between 100 Mbps and 1 Gbps with the default reference bandwidth. Fix: change the OSPF reference bandwidth to 10^10 (10 Gbps) or 10^12 (1 Tbps) with <Code>auto-cost reference-bandwidth 10000</Code>.
      </Para>

      <CodeBlock>
{`! OSPF basic configuration
router ospf 1
 router-id 1.1.1.1
 auto-cost reference-bandwidth 10000   ! 10 Gbps reference
 area 0 authentication message-digest  ! MD5 auth for area 0
 passive-interface default             ! don't send hello on access ports
 no passive-interface GigabitEthernet0/0  ! except this router link

interface GigabitEthernet0/0
 ip ospf 1 area 0
 ip ospf cost 10
 ip ospf hello-interval 10
 ip ospf dead-interval 40

! Verify OSPF
show ip ospf neighbor
show ip ospf database
show ip route ospf`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 7 ── */}
      <Chapter n={7} title="BGP: The Internet's Routing Protocol" />

      <StoryBox>
        Every ISP, every cloud provider, every large organization that connects to the internet participates in BGP (Border Gateway Protocol). BGP is what makes the internet work as a collection of independently operated networks. When Cloudflare announces 1.1.1.0/24 to the internet, BGP propagates that announcement to every other network — within minutes, routers worldwide know to send DNS queries for 1.1.1.1 toward Cloudflare. When a cable cuts an undersea fiber link, BGP detects the failure and routes internet traffic along alternate paths — sometimes in seconds, sometimes in minutes, depending on network design.
      </StoryBox>

      <H2>Autonomous Systems</H2>

      <Para>
        The internet is divided into <Accent>Autonomous Systems (AS)</Accent> — collections of IP prefixes under a single administrative control. Each AS has an <Accent>AS Number (ASN)</Accent> assigned by an RIR. Cisco's AS is 109. Google's is 15169. Cloudflare's is 13335. AWS has multiple: 16509, 14618, etc. BGP routes <em>between</em> autonomous systems.
      </Para>

      <Para>
        <Accent>eBGP (External BGP)</Accent>: sessions between routers in different ASes — typically over internet-facing connections. <Accent>iBGP (Internal BGP)</Accent>: sessions within the same AS, used to distribute externally learned routes to all routers in the AS. iBGP requires a full mesh or route reflectors — every iBGP speaker needs to know all external routes.
      </Para>

      <H2>BGP Path Selection</H2>

      <Para>
        BGP is a policy-based protocol. When multiple paths exist to the same destination, BGP uses a 14-step selection process (the "BGP decision process") to choose the best path. Key attributes in order of precedence: Weight (Cisco proprietary, local significance), Local Preference (entire AS preference for egress paths, higher = preferred), AS Path Length (shorter = preferred), Origin (IGP preferred over EGP over Incomplete), MED (Multi-Exit Discriminator, hints to neighboring AS about preferred entry), eBGP preferred over iBGP, IGP metric to next-hop.
      </Para>

      <Para>
        Network engineers manipulate BGP attributes to control traffic: increase Local Preference to prefer one ISP's paths; prepend your own AS number to make AS Path longer (encouraging neighbors to use a different path for inbound traffic); set MED to influence which of your router's IPs a neighboring AS uses as entry point.
      </Para>

      <H2>Route Reflectors</H2>

      <Para>
        iBGP requires all iBGP speakers to have sessions with each other (full mesh). At N routers: N×(N-1)/2 sessions. At 100 routers: 4,950 iBGP sessions. Unscalable. <Accent>Route Reflectors (RR)</Accent> break the full mesh requirement: instead of peering with every router, iBGP clients peer only with the Route Reflector. The RR reflects routes between clients. Large networks use hierarchical RR clusters for redundancy and scalability.
      </Para>

      <Divider />

      {/* ── Chapter 8 ── */}
      <Chapter n={8} title="ECMP: Equal-Cost Multi-Path" />

      <Para>
        When multiple paths to the same destination have identical metrics, most routing protocols install all of them in the routing table. <Accent>ECMP (Equal-Cost Multi-Path)</Accent> load balances traffic across these paths, multiplying effective bandwidth and providing automatic failover if one path goes down.
      </Para>

      <H2>ECMP Load Balancing Methods</H2>

      <Para>
        <Accent>Per-packet:</Accent> each packet is forwarded on the next path in round-robin. Maximizes bandwidth utilization but can cause packet reordering (TCP doesn't handle this well — out-of-order packets trigger retransmissions). Used primarily in high-throughput core networks where packet order is less critical.
      </Para>

      <Para>
        <Accent>Per-flow (5-tuple hashing):</Accent> a hash of source IP, destination IP, source port, destination port, and protocol determines the path. All packets in the same flow (TCP connection, UDP session) use the same path, preserving order. Standard in most modern routers. Different flows are distributed across paths, providing aggregate load balancing while maintaining per-flow ordering.
      </Para>

      <Para>
        <Accent>Per-destination:</Accent> all packets to the same destination IP use the same path. Simple but can cause uneven load if one destination generates significantly more traffic.
      </Para>

      <EcmpLoadBalancer />

      <H2>Unequal-Cost Load Balancing</H2>

      <Para>
        EIGRP supports unequal-cost load balancing via the <Code>variance</Code> command. A variance of 2 means paths with metric up to 2× the best metric are eligible for load balancing. Traffic is distributed proportionally — a path with metric 200 (2× the best 100) carries half as much traffic as the best path. This is unique to EIGRP; OSPF and BGP support equal-cost only.
      </Para>

      <Divider />

      {/* ── Chapter 9 ── */}
      <Chapter n={9} title="Route Redistribution" />

      <Para>
        In enterprise networks, multiple routing protocols often coexist — OSPF for the campus, EIGRP for the WAN, BGP for internet connectivity. <Accent>Redistribution</Accent> imports routes from one routing protocol into another, allowing all routers to know all routes regardless of which protocol originally learned them.
      </Para>

      <H2>Redistribution Mechanics</H2>

      <Para>
        On the router running both protocols (the <Accent>ASBR — Autonomous System Boundary Router</Accent>), you configure redistribution in both directions. OSPF routes redistributed into EIGRP become EIGRP external routes (AD=170). EIGRP routes redistributed into OSPF become OSPF external type 2 (E2) routes.
      </Para>

      <Warn title="Mutual redistribution and routing loops">
        Redistributing bidirectionally between two protocols creates routing loop risk. If OSPF learns a route from EIGRP redistribution, then that OSPF route is redistributed back into EIGRP, the original EIGRP route and the redistributed-back route compete for the same destination — potentially causing suboptimal paths or routing loops. Always use route-maps and distribute-lists to filter what gets redistributed, and apply route tags to mark redistributed routes so they're not redistributed back.
      </Warn>

      <Divider />

      {/* ── Chapter 10 ── */}
      <Chapter n={10} title="Policy-Based Routing" />

      <Para>
        Destination-based routing (normal routing) forwards packets based solely on the destination IP address. <Accent>Policy-Based Routing (PBR)</Accent> can override routing table decisions and forward packets based on source IP, protocol, port, DSCP value, or any other packet attribute.
      </Para>

      <Para>
        Use cases: force specific traffic (e.g., VoIP) to use a higher-quality link; route specific source IPs to a different ISP for legal/compliance reasons; redirect traffic for deep packet inspection; differentiate between internal and external traffic on the same destination subnet.
      </Para>

      <CodeBlock>
{`! PBR example: route traffic from 10.1.0.0/24 via a specific next-hop
ip access-list standard BRANCH-USERS
 permit 10.1.0.0 0.0.0.255

route-map BRANCH-PBR permit 10
 match ip address BRANCH-USERS
 set ip next-hop 192.168.2.1

interface GigabitEthernet0/1
 ip policy route-map BRANCH-PBR`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 11 ── */}
      <Chapter n={11} title="Routing in Data Centers and Cloud" />

      <H2>Leaf-Spine and BGP in the Underlay</H2>

      <Para>
        Modern data center networks use a <Accent>leaf-spine topology</Accent> with fully routed (L3) underlay. Every link is a /31 or /30 routed link — no Spanning Tree, no L2 loops. OSPF or increasingly <Accent>BGP unnumbered</Accent> provides underlay routing. BGP unnumbered uses IPv6 link-local addresses for session establishment and distributes both IPv4 and IPv6 prefixes — simplifying addressing (no need for /31 subnets on every link).
      </Para>

      <H2>EVPN-VXLAN Control and Data Plane</H2>

      <Para>
        The overlay (tenant networks) uses VXLAN for data plane encapsulation and BGP EVPN for control plane. BGP EVPN distributes MAC/IP bindings between VTEPs, eliminating flooding. The underlay routes VXLAN UDP traffic; the overlay provides tenant L2 and L3 connectivity.
      </Para>

      <H2>Cloud Routing: VPC Route Tables</H2>

      <Para>
        In AWS, GCP, and Azure, routing is software-defined. Each VPC subnet has a route table. Routes are programmed via API — no routing protocol configuration. Static routes pointing to NAT gateways, transit gateways, VPC peering connections, and virtual private gateways fill the cloud route table. Cloud routing is fundamentally static, managed by control plane APIs, with automatic failover handled by the cloud platform.
      </Para>

      <Divider />

      {/* ── Chapter 12 ── */}
      <Chapter n={12} title="Routing Troubleshooting" />

      <CodeBlock>
{`# Verify routing table
show ip route
show ip route 10.10.10.50       # lookup specific destination
show ip route summary           # count routes per protocol

# Trace the path
traceroute 8.8.8.8              # standard traceroute
traceroute 8.8.8.8 source 192.168.1.1  # source-specific

# OSPF troubleshooting
show ip ospf neighbor           # check adjacencies
show ip ospf database           # view LSDB
show ip ospf interface Gi0/0    # interface OSPF status
debug ip ospf adj               # watch adjacency formation

# BGP troubleshooting
show ip bgp summary             # BGP peer status
show ip bgp                     # BGP table
show ip bgp 8.8.8.0/24          # specific prefix details
show ip bgp neighbors 10.0.0.1  # specific peer details

# Test routing policy
ip route 10.99.99.0 255.255.255.0 null0  # inject test route
traceroute 10.99.99.1           # verify path
no ip route 10.99.99.0 255.255.255.0 null0  # cleanup`}
      </CodeBlock>

      <H2>Common Routing Issues</H2>

      <Para>
        <Accent>Route not in table:</Accent> check if the AD of the dynamic route is too high (another protocol's route is winning). Check if the subnet mask in the static route is wrong. Check if the next-hop IP is reachable (recursive lookup failure).
      </Para>

      <Para>
        <Accent>Routing loop:</Accent> TTL expiry on packets cycling between routers. Traceroute shows the same pair of routers repeated. Common cause: mutual redistribution without proper filtering. Fix: add route tags, use distribute-lists to prevent redistributed routes from being redistributed back.
      </Para>

      <Para>
        <Accent>Asymmetric routing:</Accent> packets flow via one path outbound, a different path returns. Causes stateful firewall failures (the firewall sees only one direction of a TCP session). Verify routing from both directions: check the remote router's route for the source subnet.
      </Para>

      <Divider />

      {/* ── Chapter 13 ── */}
      <Chapter n={13} title="Common Misconceptions" />

      <Err title="Routers know the entire path to a destination">
        Routers only know the next hop — the immediate next router toward the destination. They have no visibility into what happens after the next hop. This is hop-by-hop routing: each router independently decides the next step based on its local routing table. The complete end-to-end path is only known from traceroute output, not from any individual router's configuration. This distributed design is what makes the internet resilient — no single failure point that "knows the route."
      </Err>

      <Err title="Lower metric = more trusted route source">
        Metric and Administrative Distance are completely independent. AD determines which routing protocol's information is trusted (lower AD wins when multiple protocols learn the same destination). Metric determines the best path within a single routing protocol (lower metric = better path within OSPF, for example). A static route (AD=1) to 10.0.0.0/8 with any metric will always win over an OSPF route (AD=110) to the same prefix, regardless of OSPF's metric.
      </Err>

      <Err title="The default route is always 0.0.0.0/0">
        The default route is technically 0.0.0.0/0 (or ::/0 for IPv6). But it is not a special route — it is simply the most general possible prefix (zero bits are checked, so every IP matches). It works by being the longest match only when no more specific route exists. "Default" just means "used when nothing else matches." There is nothing mechanically different about the default route — it's handled by the same LPM algorithm as every other route. A /0 doesn't mean "the entire internet" as some destinations; it means "any destination where I have no better information."
      </Err>

      <Err title="BGP is a fast routing protocol">
        BGP is deliberately slow and conservative. It uses TCP for reliability, applies route filters and policies, and by default delays propagating route changes (MRAI — Minimum Route Advertisement Interval: 30 seconds for eBGP, 5 seconds for iBGP). BGP is designed for policy-based routing between organizations, not for fast convergence within a network. OSPF and EIGRP converge in seconds; BGP convergence after a major failure can take minutes. This is by design — BGP's policies and filtering must be processed carefully. Use IGPs (OSPF/EIGRP) inside networks; BGP is for inter-AS routing only.
      </Err>

      <Err title="ECMP doubles your available bandwidth">
        ECMP distributes flows across multiple equal-cost paths using per-flow hashing. In the best case (uniformly distributed traffic across many flows), aggregate bandwidth approaches N × link bandwidth. But a single elephant flow (one large TCP connection) can only use one path at a time — ECMP won't help a single flow exceed one link's capacity. The benefit is aggregate throughput across many concurrent connections, not individual flow throughput. Additionally, hash polarization — where the 5-tuple hash consistently maps flows to the same path — can cause uneven distribution.
      </Err>

      <Err title="Static routes are always safer than dynamic routing">
        Static routes don't adapt to topology changes. A failed link with a static route pointing through it causes a black hole — packets are silently discarded without any automatic recovery. Dynamic routing protocols detect failures and reconverge automatically, often within seconds. For production networks with redundant paths, dynamic routing provides both convenience and reliability that static routing cannot match. Static routes are appropriate for simple topologies (home networks, single-homed branch offices) or specific use cases (default routes, floating backup routes) — not as a general replacement for dynamic routing.
      </Err>

      <Divider />

      {/* ── Chapter 14 ── */}
      <Chapter n={14} title="Interview Questions" />

      <IQ q="What is a routing table and what information does each entry contain?" level="Beginner">
        A routing table is a data structure in a router that maps destination IP prefixes to next-hop information. Each entry contains: a destination network prefix (IP address + prefix length, e.g., 192.168.1.0/24), a next-hop IP address (the immediate next router) or outgoing interface (for directly connected networks), a metric (cost of the path, used to compare routes from the same protocol), the protocol source (Connected, Static, OSPF, EIGRP, BGP, etc.), and administrative distance (the trustworthiness of the route source). When a packet arrives, the router performs Longest Prefix Match on the destination IP across all table entries, selects the most specific matching prefix, and forwards the packet to the indicated next hop.
      </IQ>

      <IQ q="What is Administrative Distance and how is it used?" level="Beginner">
        Administrative Distance (AD) is a numeric value (0–255) representing the trustworthiness of a routing information source. Lower AD = more trusted. When multiple routing protocols learn a route to the same destination prefix, the route from the lowest-AD source is installed in the routing table; others are kept as backup. Examples: Connected = 0 (most trusted), Static = 1, OSPF = 110, RIPv2 = 120. AD is used only to break ties between different sources — it has no meaning within a single protocol (OSPF's metric is used to compare OSPF routes to each other). A floating static route uses AD=200+ so it's only used when the primary dynamic route disappears.
      </IQ>

      <IQ q="Explain Longest Prefix Match with a concrete example." level="Intermediate">
        Longest Prefix Match (LPM) selects the most specific matching route table entry for a destination. Example routing table: 0.0.0.0/0 (default), 10.0.0.0/8, 10.10.0.0/16, 10.10.10.0/24. For destination 10.10.10.50: all four entries match (0.0.0.0/0 matches everything, 10.0.0.0/8 matches 10.x.x.x, 10.10.0.0/16 matches 10.10.x.x, 10.10.10.0/24 matches 10.10.10.x). LPM selects /24 — it has the longest (most specific) prefix. For destination 10.20.0.1: three entries match (0/0, 10.0.0.0/8, and 10.10.0.0/16 does NOT match since 10.20 ≠ 10.10). LPM selects /8. The default 0.0.0.0/0 is the "last resort" — only selected when no more specific route matches. TCAM hardware performs LPM in constant time regardless of table size.
      </IQ>

      <IQ q="What is the difference between distance-vector and link-state routing protocols?" level="Intermediate">
        Distance-vector protocols (RIP, IGRP): each router only knows distances and directions. Routes are exchanged between adjacent routers — routers propagate their routing tables. A router trusts its neighbor's distance without knowing the full topology. This "routing by rumor" creates slow convergence (changes propagate hop-by-hop) and loop risk (count-to-infinity problem). Limited by maximum hop count (RIP: 15). Link-state protocols (OSPF, IS-IS): each router generates LSAs describing its direct links and floods them throughout the network. Every router builds an identical complete topology map (LSDB). Each router independently runs Dijkstra's SPF algorithm on the LSDB to calculate shortest paths. Full topology knowledge enables fast convergence (directly detects changes rather than waiting for updates to propagate) and loop-free paths. Scales to large networks through area hierarchies.
      </IQ>

      <IQ q="A network engineer notices asymmetric routing — packets flow via one path but return via a different path. What causes this and why is it a problem?" level="Senior">
        Asymmetric routing occurs when forward and return paths differ. Causes: different routing policies at each end (source-based routing, different IGP configurations, different BGP policies), different AS path lengths or metrics for the two directions, PBR (Policy-Based Routing) applied in one direction only, or multiple ISP connections with outbound path controlled by one ISP's routes and inbound path controlled by another. Problems: (1) Stateful firewalls fail — they see the SYN on one interface but the SYN-ACK arrives on a different interface (or not at all from the firewall's perspective), causing the connection to be blocked or dropped. (2) NAT state tables become inconsistent — the translation is created on one firewall, return traffic arrives at a different firewall without a state entry. (3) QoS policies applied to one path don't apply to return traffic. (4) Intrusion detection systems can't correlate bidirectional traffic. Diagnosis: traceroute from both directions, compare routing tables at both endpoints, check for PBR with "show ip policy". Fix: align routing policies so both directions use the same path, or ensure stateful devices (firewalls, NAT) are in the symmetric path.
      </IQ>

      <IQ q="Explain how BGP controls internet traffic flow between ASes. How do operators use BGP attributes to engineer traffic paths?" level="PhD">
        BGP provides a rich set of path attributes that network operators manipulate to engineer traffic flows: Inbound traffic control (influencing how neighboring ASes reach you): AS Path Prepending — artificially lengthen the AS Path by repeating your own ASN. Neighbors prefer shorter paths, so prepended prefixes are less preferred — allows making one ISP connection "primary" and another "backup" for inbound traffic. MED (Multi-Exit Discriminator) — hints to neighboring ASes which of your routers they should use to enter your network (useful when you have multiple connections to the same neighbor AS). Communities — BGP communities (32-bit tags) allow operators to signal routing policies. Sending a community to an ISP can trigger the ISP to perform prepending or filtering on your behalf, influencing inbound paths without being at the ISP's routers. Outbound traffic control (influencing how you exit to other ASes): Local Preference — a BGP attribute shared among all iBGP peers in your AS. Higher = preferred. Set higher LP on routes learned from the preferred ISP to make all outbound traffic exit that way. Weight (Cisco-proprietary) — local to one router, controls which path that specific router prefers. Route filtering and prefix-lists — accept only specific prefixes from peers; filter out unwanted routes from entering the routing table. BGP communities for traffic shaping — well-known communities (NO_EXPORT, NO_ADVERTISE) control propagation. Advanced techniques: RFC 7999 BLACKHOLE community for DDoS mitigation (signal ISP to black-hole specific prefix). BGP Flowspec (RFC 5575) injects traffic filtering rules via BGP (firewall policies distributed as BGP attributes). RPKI (Resource Public Key Infrastructure) cryptographically validates route origins to prevent BGP hijacking. The underlying philosophy: BGP is a policy language expressed as routing. Every AS makes independent decisions about what to advertise, what to accept, and how to prefer paths — the aggregate of millions of these policies is what creates the internet's routing behavior.
      </IQ>

      <KeyTakeaways items={[
        'Routing is a distributed, hop-by-hop process — each router independently decides the next step toward a destination using only its local routing table.',
        'Routes enter the routing table via connected interfaces (AD=0), static configuration (AD=1), or dynamic protocols (various ADs).',
        'Administrative Distance (AD) determines which routing source wins when multiple protocols know the same prefix — lower AD = higher trust; 0=Connected, 1=Static, 110=OSPF, 120=RIP.',
        'Longest Prefix Match (LPM) selects the most specific matching route — a /24 beats a /16 beats a /8 beats the default /0.',
        'OSPF is a link-state protocol using Dijkstra SPF on a complete topology database (LSDB); it divides domains into areas to limit LSA flooding scope.',
        'BGP is a path-vector protocol between Autonomous Systems — policy-based (Local Preference, AS Path, MED, Communities) rather than metric-based.',
        'ECMP distributes traffic across equal-cost paths using per-flow hashing (5-tuple) — aggregate throughput improves but single flows cannot exceed one link\'s bandwidth.',
        'Floating static routes use a high AD to act as backup — only installed when the primary dynamic route disappears, enabling automatic failover.',
        'Route redistribution allows multiple routing protocols to share route information — requires careful filtering with route tags to prevent routing loops.',
        'In modern data center leaf-spine fabrics, BGP unnumbered on /31 links provides underlay routing; BGP EVPN provides overlay control plane — no Spanning Tree required.',
      ]} />
    </LearnLayout>
  )
}
