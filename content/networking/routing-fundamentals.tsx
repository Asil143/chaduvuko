'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const N = '#10b981'

const Part = ({ n, title }: { n: string; title: string }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 11, color: N, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>// Part {n}</p>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
)

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
)

const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>{children}</h3>
)

const Hl = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: N }}>{children}</strong>
)

const HR = () => <div style={{ borderTop: '1px solid var(--border)', margin: '48px 0' }} />

const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${N}08`, border: `1px solid ${N}20`, borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Pro Tip</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
)

const Err = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: '#ef444408', border: '1px solid #ef444430', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Common Mistake — {title}</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
)

const IQ = ({ q, children }: { q: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ background: `${N}10`, border: `1px solid ${N}25`, borderRadius: '8px 8px 0 0', padding: '14px 18px', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Q: {q}</div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)

const TimeBlock = ({ time, label, children }: { time: string; label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
    <div style={{ flexShrink: 0, textAlign: 'right', width: 100 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)' }}>{time}</div>
    </div>
    <div style={{ flex: 1, borderLeft: `2px solid ${N}30`, paddingLeft: 20, paddingBottom: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{children}</div>
    </div>
  </div>
)

// ── Routing Table Simulator ───────────────────────────────────────────────────
const ROUTING_TABLE = [
  { dest: '10.0.1.0/24', mask: 24, nexthop: '10.0.0.2', iface: 'Gi0/1', metric: 10, proto: 'OSPF', ad: 110 },
  { dest: '10.0.2.0/24', mask: 24, nexthop: '10.0.0.3', iface: 'Gi0/2', metric: 20, proto: 'OSPF', ad: 110 },
  { dest: '10.0.0.0/8', mask: 8, nexthop: '10.0.0.1', iface: 'Gi0/0', metric: 0, proto: 'Static', ad: 1 },
  { dest: '172.16.0.0/12', mask: 12, nexthop: '10.0.0.5', iface: 'Gi0/3', metric: 100, proto: 'BGP', ad: 20 },
  { dest: '192.168.5.0/30', mask: 30, nexthop: 'directly connected', iface: 'Gi0/4', metric: 0, proto: 'Connected', ad: 0 },
  { dest: '0.0.0.0/0', mask: 0, nexthop: '203.0.113.1', iface: 'Gi0/5', metric: 0, proto: 'Static', ad: 1 },
]

function parseIPInt(ip: string): number | null {
  const parts = ip.trim().split('.')
  if (parts.length !== 4) return null
  const nums = parts.map(p => parseInt(p, 10))
  if (nums.some(n => isNaN(n) || n < 0 || n > 255)) return null
  return ((nums[0] << 24) | (nums[1] << 16) | (nums[2] << 8) | nums[3]) >>> 0
}

function maskInt(prefix: number): number {
  return prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0
}

function RoutingTableSim() {
  const [destIP, setDestIP] = useState('10.0.1.55')
  const [showLookup, setShowLookup] = useState(false)

  const ipInt = parseIPInt(destIP)

  const matches = ipInt !== null ? ROUTING_TABLE.filter(route => {
    const [routeIPStr] = route.dest.split('/')
    const routeIPInt = parseIPInt(routeIPStr)!
    const mInt = maskInt(route.mask)
    return ((ipInt & mInt) >>> 0) === ((routeIPInt & mInt) >>> 0)
  }).sort((a, b) => b.mask - a.mask) : []

  const bestMatch = matches[0] || null
  const protoColors: Record<string, string> = { OSPF: '#3b82f6', BGP: '#8b5cf6', Static: '#f59e0b', Connected: N }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', margin: '28px 0' }}>
      <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', background: `${N}06` }}>
        <p style={{ fontSize: 11, color: N, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '.1em', margin: '0 0 4px' }}>// INTERACTIVE — ROUTING TABLE LOOKUP SIMULATOR</p>
        <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>Enter a destination IP to see how longest prefix match selects a route from the routing table.</p>
      </div>

      {/* Routing table */}
      <div style={{ overflowX: 'auto', padding: '16px 22px 0' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 10px' }}>Routing Table</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, minWidth: 600, marginBottom: 16 }}>
          <thead>
            <tr style={{ background: `${N}10` }}>
              {['Destination', 'Next Hop', 'Interface', 'Protocol', 'AD', 'Metric'].map(h => (
                <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 10, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROUTING_TABLE.map((route, i) => {
              const isMatch = showLookup && matches.some(m => m.dest === route.dest)
              const isBest = showLookup && bestMatch?.dest === route.dest
              return (
                <tr key={i} style={{ background: isBest ? `${N}15` : isMatch ? `${N}06` : i % 2 === 0 ? 'var(--surface)' : 'var(--background)', outline: isBest ? `2px solid ${N}` : 'none' }}>
                  <td style={{ padding: '8px 12px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontWeight: 700, color: isBest ? N : 'var(--text)' }}>
                    {route.dest}
                    {isBest && <span style={{ fontSize: 9, marginLeft: 6, background: N, color: '#fff', padding: '1px 5px', borderRadius: 4, fontWeight: 700 }}>BEST</span>}
                  </td>
                  <td style={{ padding: '8px 12px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', color: 'var(--text)', fontSize: 11 }}>{route.nexthop}</td>
                  <td style={{ padding: '8px 12px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{route.iface}</td>
                  <td style={{ padding: '8px 12px', border: '1px solid var(--border)' }}>
                    <span style={{ background: `${protoColors[route.proto] || '#6b7280'}20`, color: protoColors[route.proto] || '#6b7280', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{route.proto}</span>
                  </td>
                  <td style={{ padding: '8px 12px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{route.ad}</td>
                  <td style={{ padding: '8px 12px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{route.metric}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div style={{ padding: '0 22px 20px' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
          <input
            value={destIP}
            onChange={e => { setDestIP(e.target.value); setShowLookup(false) }}
            style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text)', fontSize: 14, fontFamily: 'var(--font-mono)', flex: 1 }}
            placeholder="Destination IP (e.g. 172.16.50.1)"
          />
          <button
            onClick={() => setShowLookup(true)}
            style={{ padding: '10px 20px', background: N, color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            Lookup Route
          </button>
        </div>

        {showLookup && ipInt !== null && (
          <div style={{ padding: '14px 16px', borderRadius: 10, background: bestMatch ? `${N}10` : '#ef444410', border: `1px solid ${bestMatch ? N : '#ef4444'}30`, fontSize: 13 }}>
            {bestMatch ? (
              <div>
                <div style={{ fontWeight: 700, color: N, marginBottom: 8 }}>
                  ✓ Longest prefix match: <span style={{ fontFamily: 'var(--font-mono)' }}>{bestMatch.dest}</span>
                  {matches.length > 1 && <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 8 }}>({matches.length} routes matched, /{bestMatch.mask} wins)</span>}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 8 }}>
                  {[
                    ['Next Hop', bestMatch.nexthop],
                    ['Interface', bestMatch.iface],
                    ['Protocol', bestMatch.proto],
                    ['Admin Distance', String(bestMatch.ad)],
                  ].map(([k, v]) => (
                    <div key={k} style={{ fontSize: 12 }}>
                      <span style={{ color: 'var(--muted)' }}>{k}: </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text)' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <span style={{ color: '#ef4444', fontWeight: 700 }}>No route found — packet would be dropped (no matching entry, including default route).</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function RoutingFundamentals() {
  return (
    <LearnLayout
      title="Routing Fundamentals"
      description="How routers make forwarding decisions, static vs dynamic routing, administrative distance, metrics, longest prefix match, and the complete journey of an IP packet across the internet."
      section="Networking Fundamentals"
      readTime="28 min"
      updatedAt="May 2026"
    >

      {/* ── PART 1 ── */}
      <Part n="01" title="What Routers Do and Why They Exist" />

      <P>
        Switches forward frames based on MAC addresses — they operate within a single broadcast domain. The moment you need traffic to cross from one IP subnet to another, switches cannot help. <Hl>Routers</Hl> are Layer 3 devices that forward packets based on IP destination addresses, connecting different networks and making the hierarchical, scalable internet possible.
      </P>
      <P>
        A router is fundamentally a device with multiple network interfaces, each connected to a different network, running software (or ASIC hardware) that makes per-packet forwarding decisions. When a packet arrives on an interface, the router strips the Layer 2 frame, examines the Layer 3 IP header, looks up the destination IP in its <Hl>routing table (FIB — Forwarding Information Base)</Hl>, decrements the TTL, updates the checksum, builds a new Layer 2 frame for the next hop, and forwards the packet. This process happens millions of times per second on enterprise routers and billions of times per second on carrier-grade equipment.
      </P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, margin: '24px 0 32px' }}>
        {[
          { label: 'Home router', value: '~50 Kpps', desc: 'Consumer CPE, software forwarding' },
          { label: 'Enterprise edge', value: '~1 Mpps', desc: 'Cisco ISR 4000 series' },
          { label: 'Data center TOR', value: '~100 Mpps', desc: 'Arista 7050X, ASIC forwarding' },
          { label: 'Carrier backbone', value: '~100 Bpps', desc: 'Cisco NCS 5500, line-card ASICs' },
        ].map(item => (
          <div key={item.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: N, fontFamily: 'var(--font-mono)', marginBottom: 2 }}>{item.value}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 2 ── */}
      <Part n="02" title="The Routing Table: How Routers Know Where to Send Traffic" />

      <P>
        A <Hl>routing table</Hl> is a database of network prefixes and the instructions for how to reach each one: which next-hop router to send packets to, which outgoing interface to use, and metadata about the route (source protocol, administrative distance, metric). Routes enter the routing table via three mechanisms: <Hl>directly connected</Hl> networks (interfaces on the router itself), <Hl>static routes</Hl> (manually configured by an administrator), and <Hl>dynamic routing protocols</Hl> (OSPF, BGP, EIGRP — automated route exchange between routers).
      </P>

      <H>Longest Prefix Match (LPM)</H>
      <P>
        When multiple routing table entries match a destination IP address, the router selects the entry with the <Hl>longest (most specific) prefix</Hl>. This is the fundamental rule of IP routing. If a routing table has both 10.0.0.0/8 and 10.0.1.0/24, a packet destined for 10.0.1.55 matches both entries. The /24 is longer (more specific) than the /8, so the /24 entry wins. A /32 host route always wins over any other entry for that specific IP.
      </P>

      <RoutingTableSim />

      <HR />

      {/* ── PART 3 ── */}
      <Part n="03" title="Administrative Distance: Trust Between Routing Sources" />

      <P>
        A router may receive information about the same network prefix from multiple sources simultaneously: a static route configured by an admin, an OSPF advertisement from a neighbor, and a BGP announcement. <Hl>Administrative Distance (AD)</Hl> is a number (0–255) that expresses how trustworthy each routing source is. Lower AD = more trusted. The route with the lowest AD wins and enters the routing table. If two routes have the same AD, the metric is used to break the tie.
      </P>

      <div style={{ overflowX: 'auto', margin: '12px 0 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 550 }}>
          <thead>
            <tr style={{ background: `${N}12` }}>
              {['Route Source', 'Default AD', 'Notes'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Directly Connected', '0', 'Most trusted — the router itself is on that network'],
              ['Static route', '1', 'Administrator configured — almost as trusted as connected'],
              ['EIGRP (summary)', '5', 'Cisco proprietary, internal summary routes'],
              ['EIGRP (internal)', '90', 'Cisco proprietary, internal routes'],
              ['OSPF', '110', 'Open standard, widely deployed IGP'],
              ['IS-IS', '115', 'Link-state IGP, common in carrier networks'],
              ['RIP v2', '120', 'Distance-vector, limited to 15 hops, legacy'],
              ['EIGRP (external)', '170', 'Routes redistributed into EIGRP from other protocols'],
              ['eBGP', '20', 'External BGP — between different ASes (internet routing)'],
              ['iBGP', '200', 'Internal BGP — within the same AS'],
              ['Unknown / unusable', '255', 'Route never installed in forwarding table'],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)' }}>
                <td style={{ padding: '9px 14px', border: '1px solid var(--border)', fontWeight: 600, color: 'var(--text)' }}>{row[0]}</td>
                <td style={{ padding: '9px 14px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontWeight: 700, color: N }}>{row[1]}</td>
                <td style={{ padding: '9px 14px', border: '1px solid var(--border)', color: 'var(--muted)' }}>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>
        Note the counterintuitive placement of eBGP (AD=20) — lower than OSPF (AD=110). This is intentional: when a router receives a route via eBGP from the internet, it is considered more authoritative than an internal routing protocol&apos;s advertisement for the same prefix. iBGP (AD=200) is the least trusted dynamic protocol because iBGP routes within an AS should typically be derived from the IGP, not overriding it.
      </P>

      <Err title="Confusing administrative distance and metric">
        Administrative distance (AD) compares routes from different sources/protocols — it is used to choose between, say, an OSPF route and a static route for the same prefix. Metric compares routes from the same protocol — OSPF cost, BGP attributes, EIGRP composite metric. AD is checked first. If two routes have different ADs, the lower AD wins regardless of metric. Only if two routes have the same AD (same protocol, same prefix) is the metric used to break the tie. A static route (AD=1) to a destination always beats an OSPF route (AD=110) to the same destination, regardless of OSPF metric.
      </Err>

      <HR />

      {/* ── PART 4 ── */}
      <Part n="04" title="Static Routing" />

      <P>
        <Hl>Static routes</Hl> are manually configured by an administrator with an explicit destination prefix and next-hop. They do not change automatically when the network topology changes — if the next-hop becomes unreachable, the static route remains in the routing table and traffic silently black-holes until the admin intervenes. Static routes are appropriate in specific scenarios: default routes (<code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '2px 5px', borderRadius: 3, fontSize: 12 }}>0.0.0.0/0</code>) on stub networks with a single upstream, point-to-point WAN links where there is only one path, and management routes that should never be overridden by a dynamic protocol.
      </P>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '16px 0 28px' }}>
        <div style={{ background: 'var(--surface)', border: `1px solid ${N}20`, borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: N, marginBottom: 12 }}>When to use static routes</div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--text)', lineHeight: 2 }}>
            <li>Default route on a branch office router with one ISP</li>
            <li>Floating static route as backup path (higher AD than dynamic)</li>
            <li>Null0 discard route for RFC 1918 leakage prevention</li>
            <li>Host routes (/32) for critical infrastructure</li>
            <li>Simple networks with 2–3 routers and stable topology</li>
          </ul>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid #ef444420', borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', marginBottom: 12 }}>When NOT to use static routes</div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--text)', lineHeight: 2 }}>
            <li>Large networks with many paths — maintenance nightmare</li>
            <li>When redundancy is needed (static routes do not failover automatically)</li>
            <li>Networks that change frequently — every change requires manual update on all routers</li>
            <li>Multi-homed connections where load balancing across paths is needed</li>
          </ul>
        </div>
      </div>

      <H>Floating Static Routes</H>
      <P>
        A <Hl>floating static route</Hl> is a static route with an AD set higher than the primary dynamic routing protocol. For example, if OSPF (AD=110) provides the primary path to a destination, a floating static to the same destination with AD=115 will not appear in the routing table while the OSPF route is present. If the OSPF route disappears (link failure), the floating static automatically becomes the active route. This is a common technique for providing a static backup path on SD-WAN deployments.
      </P>

      <HR />

      {/* ── PART 5 ── */}
      <Part n="05" title="Dynamic Routing Protocols: The Big Picture" />

      <P>
        Dynamic routing protocols automate the exchange of routing information between routers, building the routing table automatically and adapting to topology changes without manual intervention. They fall into two categories: <Hl>IGPs (Interior Gateway Protocols)</Hl> — used within a single autonomous system (organization) — and <Hl>EGPs (Exterior Gateway Protocols)</Hl> — used between autonomous systems, with BGP being the only surviving EGP on the internet.
      </P>

      <H>Distance Vector vs Link-State vs Path Vector</H>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, margin: '16px 0 28px' }}>
        {[
          {
            name: 'Distance Vector',
            proto: 'RIP, EIGRP',
            color: '#f59e0b',
            how: 'Each router advertises its routing table (distance+direction) to neighbors. Neighbors add their own cost and re-advertise. Routers only know distances, not the full topology.',
            pro: 'Simple, low memory. RIP is simple to configure.',
            con: 'Slow convergence (count-to-infinity problem). Limited hop count (RIP max 15). EIGRP is Cisco-proprietary.',
            use: 'Small/legacy networks, Cisco-only environments (EIGRP)',
          },
          {
            name: 'Link-State',
            proto: 'OSPF, IS-IS',
            color: '#3b82f6',
            how: 'Each router floods its local link-state advertisement (LSA) to all routers. Every router builds a complete map of the network topology and runs Dijkstra\'s SPF algorithm to find shortest paths.',
            pro: 'Fast convergence (sub-second with BFD). Supports VLSM/CIDR natively. Open standards, vendor-agnostic.',
            con: 'More CPU/memory intensive. Complex configuration for large networks.',
            use: 'Enterprise networks, ISP core, data centers',
          },
          {
            name: 'Path Vector',
            proto: 'BGP',
            color: '#8b5cf6',
            how: 'Each router advertises network prefixes with the full AS-path (list of ASes the route has traversed). Loop prevention by AS-path — if your own AS number appears in the path, discard the route.',
            pro: 'Scales to internet size (900K+ routes). Rich policy control via attributes (communities, local preference, MED).',
            con: 'Complex. Slow convergence by design. Can cause global outages if misconfigured (see Facebook 2021).',
            use: 'Internet routing between ISPs, cloud provider edge, enterprise multi-homing',
          },
        ].map(item => (
          <div key={item.name} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 900, color: item.color, marginBottom: 4 }}>{item.name}</div>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--muted)', marginBottom: 10 }}>{item.proto}</div>
            <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.7, marginBottom: 10 }}>{item.how}</div>
            <div style={{ fontSize: 11, color: N, marginBottom: 4 }}>✓ {item.pro}</div>
            <div style={{ fontSize: 11, color: '#ef4444', marginBottom: 4 }}>✗ {item.con}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>Use: {item.use}</div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 6 ── */}
      <Part n="06" title="OSPF: The Enterprise Routing Standard" />

      <P>
        <Hl>OSPF (Open Shortest Path First)</Hl> is the most widely deployed IGP in enterprise and service provider networks. It uses Dijkstra&apos;s shortest path first algorithm on a complete topology map (the LSDB — Link State Database) to find loop-free paths. OSPF is hierarchical: networks are organized into <Hl>areas</Hl>, with Area 0 (the backbone area) connecting all other areas. Area Border Routers (ABRs) connect non-backbone areas to Area 0.
      </P>

      <H>OSPF Operation</H>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, margin: '16px 0 24px' }}>
        {[
          { step: '1. Neighbor Discovery', desc: 'OSPF sends Hello packets to multicast 224.0.0.5 (all OSPF routers). Two routers with matching Hello/Dead timers and area ID form an adjacency.' },
          { step: '2. LSA Exchange', desc: 'Adjacent routers exchange LSAs (Link State Advertisements) — each LSA describes the router\'s links and their costs. The full set of LSAs is the LSDB.' },
          { step: '3. Database Sync', desc: 'Routers flood LSAs throughout the area until all routers have identical LSDBs. On broadcast networks, a DR (Designated Router) reduces flooding overhead.' },
          { step: '4. SPF Calculation', desc: 'Each router runs Dijkstra\'s algorithm on its LSDB to build a shortest-path tree rooted at itself. The tree determines next-hops for every destination.' },
          { step: '5. Routing Table', desc: 'SPF results populate the routing table. Cost = sum of interface costs on the path. Default cost = 100/bandwidth (reference bandwidth configurable).' },
          { step: '6. Incremental updates', desc: 'When topology changes, only the changed LSA is flooded. SPF re-runs only for the affected portion. OSPF converges in ~1s with tuned timers.' },
        ].map(item => (
          <div key={item.step} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', marginBottom: 6 }}>{item.step}</div>
            <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <H>OSPF Cost and Reference Bandwidth</H>
      <P>
        OSPF selects the lowest-cost path. The cost of each interface is <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '2px 5px', borderRadius: 3, fontSize: 12 }}>reference_bandwidth / interface_bandwidth</code>. Default reference bandwidth is 100 Mbps (configured in 1990s when 100 Mbps was fast). This means a 100 Mbps link has cost 1, and a 1 Gbps link also has cost 1 (100/1000 rounds to 1). OSPF cannot distinguish between 100 Mbps and 1 Gbps or 10 Gbps links unless the reference bandwidth is increased. <Hl>Always configure a higher reference bandwidth</Hl> (10,000 or 100,000 Mbps) in modern networks to get meaningful cost differences between link speeds.
      </P>

      <Err title="Not updating OSPF reference bandwidth in modern networks">
        The OSPF default reference bandwidth of 100 Mbps causes all Gigabit and higher interfaces to have an identical cost of 1, making OSPF treat 1 GbE and 100 GbE links as equivalent. Traffic that should prefer the 100G path may take the 1G path instead. Set <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '2px 5px', borderRadius: 3, fontSize: 12 }}>auto-cost reference-bandwidth 100000</code> (100 Gbps reference) on all OSPF routers. This must be consistent across all routers in an OSPF domain — inconsistent reference bandwidth causes asymmetric routing.
      </Err>

      <HR />

      {/* ── PART 7 ── */}
      <Part n="07" title="BGP: The Protocol That Routes the Internet" />

      <P>
        <Hl>BGP (Border Gateway Protocol)</Hl> is the only EGP in use on the internet — it is the protocol responsible for routing between the ~75,000 autonomous systems that make up the public internet. Every ISP, cloud provider, content network, and large enterprise runs BGP at its edge. BGP&apos;s core job: propagate information about which IP address prefixes are reachable via which path through the AS graph.
      </P>

      <H>AS Path and Loop Prevention</H>
      <P>
        BGP is a path-vector protocol. Each BGP advertisement includes the <Hl>AS-PATH attribute</Hl> — a list of AS numbers the route has traversed. When a router receives a BGP update containing its own AS number in the AS-PATH, it discards the route (loop detected). This is how BGP prevents routing loops at the inter-domain level, unlike IGPs which use hop count or SPF.
      </P>

      <H>BGP Attributes for Policy Control</H>
      <div style={{ overflowX: 'auto', margin: '12px 0 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 600 }}>
          <thead>
            <tr style={{ background: `${N}12` }}>
              {['Attribute', 'Type', 'Description', 'Use case'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['NEXT_HOP', 'Well-known mandatory', 'IP address of the next-hop BGP router', 'iBGP next-hop-self requirement'],
              ['AS_PATH', 'Well-known mandatory', 'Ordered list of ASes the route traversed', 'Loop prevention; path length comparison'],
              ['LOCAL_PREF', 'Well-known discretionary', 'Preference within an AS (higher = preferred)', 'Influence egress path selection inside AS'],
              ['MED', 'Optional non-transitive', 'Multi-Exit Discriminator — suggest ingress to neighboring AS', 'Influence which entry point a neighbor uses'],
              ['Communities', 'Optional transitive', '32-bit tag attached to routes for policy', 'Large-scale route manipulation at ISPs; no-export, blackhole'],
              ['WEIGHT', 'Cisco-proprietary', 'Local (per-router) preference, highest wins', 'Single-router policy, not propagated'],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '9px 14px', border: '1px solid var(--border)', fontFamily: j === 0 ? 'var(--font-mono)' : undefined, fontWeight: j === 0 ? 700 : 400, color: j === 0 ? N : 'var(--text)' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProTip>
        BGP best path selection runs through 12+ attributes in order. The most commonly used tiebreakers in order: (1) Highest WEIGHT (Cisco-local, prefer own routes); (2) Highest LOCAL_PREF (influence egress); (3) Locally originated (prefer routes you injected); (4) Shortest AS_PATH; (5) Lowest ORIGIN (IGP &lt; EGP &lt; Incomplete); (6) Lowest MED; (7) eBGP over iBGP; (8) Lowest IGP metric to next-hop; (9) Lowest router-id. In practice, most routing policy is implemented using LOCAL_PREF and communities — these two attributes cover 95% of real-world BGP policy needs.
      </ProTip>

      <HR />

      {/* ── PART 8 ── */}
      <Part n="08" title="How a Packet Crosses the Internet: End-to-End" />

      <P>
        The journey of a single packet from your laptop to a server in another country involves multiple routing decisions at each hop. Here is the complete sequence for an HTTP request from a home network in London to a server in Tokyo:
      </P>

      <div style={{ background: 'var(--surface)', border: `1px solid ${N}20`, borderRadius: 12, padding: '20px 24px', margin: '16px 0 28px' }}>
        {[
          { hop: 'Home router (London)', detail: 'Your laptop sends a packet to 203.0.113.50 (Tokyo server). Home router has a default static route (0.0.0.0/0) pointing to the ISP. Packet forwarded to ISP edge router.' },
          { hop: 'ISP edge router (London)', detail: 'ISP runs OSPF internally and eBGP to peers. BGP table has a route to 203.0.113.0/24 via a peering link to a Tier-1 ISP. Packet forwarded toward Tier-1.' },
          { hop: 'Tier-1 ISP backbone (London PoP)', detail: 'Tier-1 ISP has MPLS core. Packet is labeled and switched through MPLS tunnels across the backbone using LDP or RSVP-TE. LPM is done only at ingress/egress — intermediate nodes switch on labels, not IP.' },
          { hop: 'IXP or submarine cable hand-off', detail: 'Packet crosses a transatlantic or transpacific path — either via a private peering link at an IXP or through a submarine cable operated by the Tier-1. Physical propagation delay: ~150–180ms from London to Tokyo.' },
          { hop: 'Japanese ISP edge router', detail: 'BGP route for 203.0.113.0/24 points to the Tokyo data center\'s ISP. Packet forwarded via Japanese transit ISP.' },
          { hop: 'Tokyo ISP → data center', detail: 'ISP delivers the packet to the Tokyo data center\'s border router, which has a BGP session with the server\'s network. The /24 route is in the BGP table, pointing to the next-hop inside the data center network.' },
          { hop: 'Data center routing', detail: 'Inside the data center, OSPF or BGP (leaf-spine architecture) routes the packet to the correct rack. The TOR (top-of-rack) switch forwards the frame to the server using the ARP-resolved MAC address. TCP/IP stack on the server processes the HTTP request.' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 20, alignItems: 'flex-start' }}>
            <div style={{ background: `${N}20`, color: N, borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, fontFamily: 'var(--font-mono)' }}>{i + 1}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: N, marginBottom: 4 }}>{item.hop}</div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{item.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 9 ── */}
      <Part n="09" title="Day in the Life — Cloudflare Network Engineer: Routing Loop in New POP" />

      <P>
        <strong>Company:</strong> Cloudflare · <strong>Role:</strong> Network Infrastructure Engineer · <strong>Location:</strong> Remote / new PoP in Warsaw, Poland · <strong>Date:</strong> Thursday, October 10, 2024
      </P>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', margin: '20px 0 28px' }}>
        <p style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', margin: '0 0 12px' }}>INCIDENT: New Warsaw PoP goes live but experiences 40% packet loss on some flows — routing loop</p>

        <TimeBlock time="08:00 AM" label="New PoP activated — initial smoke tests pass">
          The Warsaw PoP activates at 08:00 UTC. Initial health checks (BGP session state, basic reachability) pass. Cloudflare&apos;s anycast system starts routing some European traffic to the new PoP. Within 5 minutes, monitoring shows approximately 40% packet loss on TCP flows originating from Warsaw to destinations in the 103.21.244.0/22 range (a Cloudflare customer&apos;s origin servers).
        </TimeBlock>

        <TimeBlock time="08:09 AM" label="Traceroute reveals the loop">
          An engineer runs a traceroute from the Warsaw PoP: the packet goes Warsaw → Frankfurt → Amsterdam → Frankfurt → Amsterdam → (loops). The TTL expires at hop 30 and returns ICMP Time Exceeded to the source. The packets are looping between Frankfurt and Amsterdam. This means both Frankfurt and Amsterdam have a route to 103.21.244.0/22 pointing toward each other.
        </TimeBlock>

        <TimeBlock time="08:14 AM" label="BGP table inspection — missing eBGP advertisement">
          The engineer SSHs to the Frankfurt router and checks the BGP table for 103.21.244.0/22. It shows only one path: via Amsterdam (learned via iBGP, LOCAL_PREF 100). On Amsterdam, the same prefix is pointing to Frankfurt (also iBGP, LOCAL_PREF 100). Neither router has the eBGP route from the customer&apos;s origin ISP. The customer&apos;s BGP session is active on a third PoP (London), and that iBGP advertisement is supposed to propagate to Frankfurt and Amsterdam. But the iBGP route is not appearing on either router — the iBGP session between London and Frankfurt/Amsterdam is showing &apos;Idle&apos; state.
        </TimeBlock>

        <TimeBlock time="08:19 AM" label="Root cause: iBGP route reflector misconfiguration during PoP activation">
          The Warsaw PoP activation included a change to the BGP route reflector configuration — the Warsaw router was added as a new route reflector client. The activation script had a typo in the peer group name: &apos;rr-clients-eu&apos; vs the correct &apos;rr-clients-emea&apos;. This caused the Warsaw router to be isolated from the iBGP full mesh for the EMEA region. As a side effect, iBGP route propagation for routes learned in London was disrupted for Frankfurt and Amsterdam — routes originating from London&apos;s eBGP sessions were not reflected to those two routers. Without the eBGP-learned route, Frankfurt and Amsterdam each fell back to their (incorrect) iBGP route pointing at each other.
        </TimeBlock>

        <TimeBlock time="08:24 AM" label="Fix: correct peer group name, restore iBGP sessions">
          The engineer corrects the peer group name in the route reflector configuration. The iBGP sessions for Frankfurt and Amsterdam reset and re-establish within 30 seconds. iBGP routes from London appear on both routers. The correct route to 103.21.244.0/22 — via the customer&apos;s origin ISP — now appears with the correct LOCAL_PREF and is preferred over the previous looping iBGP routes. Packet loss drops to 0% within 60 seconds. Total impact: 24 minutes of 40% packet loss for traffic using the affected prefix.
        </TimeBlock>

        <TimeBlock time="Post-incident" label="Process improvements">
          Postmortem action items: (1) PoP activation runbook updated to include iBGP session verification step before any new PoP attracts live traffic; (2) automated test added to the activation pipeline that verifies all expected iBGP routes are present on neighboring PoPs after adding a new route reflector client; (3) route reflector peer group names standardized and validated in configuration management (Terraform/Salt) before deployment — free-text peer group names are no longer accepted.
        </TimeBlock>
      </div>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Interview Prep — 8 Questions With Complete Answers" />

      <IQ q="What is the difference between routed and routing protocols?">
        <p style={{ margin: '0 0 14px' }}>A <strong>routed protocol</strong> is a network layer protocol that can be routed — it provides addressing and allows packets to be forwarded between networks. IP (IPv4 and IPv6) is the primary routed protocol. IPX (Novell, legacy) is another example. Routed protocols define the packet format and addressing scheme that routers examine to make forwarding decisions.</p>
        <p style={{ margin: 0 }}>A <strong>routing protocol</strong> is a protocol used by routers to exchange routing information and build routing tables. Examples: OSPF, BGP, EIGRP, RIP. Routing protocols determine which paths are available; routed protocols carry the actual user data. The distinction: you route IP packets (routed protocol) using OSPF routes (routing protocol).</p>
      </IQ>

      <IQ q="Explain longest prefix match. Why is it the fundamental rule of IP routing?">
        <p style={{ margin: '0 0 14px' }}>Longest prefix match (LPM) means: when a routing table has multiple entries that could match a destination IP, the entry with the longest (most specific) prefix wins. A /24 is longer than /8, so a /24 entry beats a /8 entry for any IP in the /24 range. A /32 host route beats everything for that specific IP.</p>
        <p style={{ margin: '0 0 14px' }}>LPM is fundamental because it enables route aggregation to coexist with specific routes. ISPs can advertise 10.0.0.0/8 as a summary while an enterprise also advertises 10.1.0.0/16 specifically for their network. Traffic destined for 10.1.x.x will use the more-specific 10.1.0.0/16 route; traffic for 10.99.x.x will use the summary 10.0.0.0/8. Without LPM, summary routes would prevent specific routes from being effective — you could not have both a summary and a specific route for a subset of that range.</p>
        <p style={{ margin: 0 }}>Implementation: LPM is performed in hardware using TCAM (Ternary Content Addressable Memory) on enterprise and carrier routers. TCAM supports three states per bit (0, 1, or don&apos;t-care), enabling parallel lookup across all routing table entries simultaneously in a single clock cycle. This is why a 100G router forwarding millions of packets per second can make routing decisions faster than a CPU-based software router doing the same lookups in RAM.</p>
      </IQ>

      <IQ q="What is administrative distance and why does it exist?">
        <p style={{ margin: '0 0 14px' }}>Administrative distance (AD) is a number (0–255) representing the trustworthiness of a routing source. When a router receives route information about the same prefix from multiple sources (e.g., both OSPF and a static route), AD determines which source wins. Lower AD = more trusted. Key values: connected = 0, static = 1, OSPF = 110, iBGP = 200.</p>
        <p style={{ margin: '0 0 14px' }}>AD exists because routers frequently learn about the same destination from multiple protocols. Without AD, there would be no deterministic way to choose between an OSPF route and a static route. AD encodes operational intent: an administrator-configured static route (AD=1) should usually override a dynamically learned route (AD=110) because the administrator explicitly knows better. iBGP (AD=200) is lower priority than eBGP (AD=20) because iBGP routes within an AS are typically less authoritative than the external routes that enter the AS via eBGP.</p>
        <p style={{ margin: 0 }}>AD is local to the router — it is not carried in routing protocol messages. Two routers in the same OSPF domain may have different static routes with different ADs configured, and each would independently prefer different paths. This is a common source of routing asymmetry in enterprise networks.</p>
      </IQ>

      <IQ q="Describe the OSPF neighbor formation process.">
        <p style={{ margin: '0 0 14px' }}>OSPF neighbor formation follows a state machine: (1) <strong>Down</strong> — no Hello received. (2) <strong>Init</strong> — Hello received but our router-ID not seen in the neighbor&apos;s Hello. (3) <strong>2-Way</strong> — bidirectional communication established (both see each other in Hello packets). On broadcast networks, DR/BDR election happens here. (4) <strong>ExStart</strong> — master/slave negotiation for database exchange. (5) <strong>Exchange</strong> — database descriptor packets (DBDs) exchanged — each router tells the other which LSAs it has. (6) <strong>Loading</strong> — routers request LSAs they don&apos;t have via LSR (Link State Request). (7) <strong>Full</strong> — LSDBs synchronized, adjacency complete.</p>
        <p style={{ margin: 0 }}>Requirements to form an OSPF adjacency: same area ID, same Hello and Dead timer values, same authentication settings, same subnet mask (for broadcast interfaces), compatible MTU. On broadcast networks (e.g., Ethernet), only the DR and BDR form Full adjacencies with all routers — non-DR/BDR routers form 2-Way adjacencies with each other. This reduces flooding overhead on large broadcast segments.</p>
      </IQ>

      <IQ q="What is the difference between iBGP and eBGP? Why does iBGP require a full mesh?">
        <p style={{ margin: '0 0 14px' }}><strong>eBGP (External BGP)</strong> runs between routers in different Autonomous Systems — for example, between your ISP and your border router. eBGP peers are typically directly connected (via a /30 link), and routes received via eBGP have their AS-PATH extended with the peer&apos;s AS number before being re-advertised.</p>
        <p style={{ margin: '0 0 14px' }}><strong>iBGP (Internal BGP)</strong> runs between routers within the same AS. iBGP is used to distribute BGP routes across the AS interior — for example, propagating customer route announcements received at a London PoP to routers in Paris and Frankfurt. Unlike eBGP, iBGP does not modify the AS-PATH (no AS number prepended), preserving the original external path information.</p>
        <p style={{ margin: 0 }}>iBGP requires a full mesh (every router peers with every other) by default because of the iBGP loop prevention rule: a route learned via iBGP is not re-advertised to another iBGP peer. Without full mesh, a route received at router A from an eBGP peer would not propagate to router C unless A directly peers with C. At scale, a full mesh of N routers requires N×(N−1)/2 sessions — 45 sessions for 10 routers, 4950 for 100 routers. Route Reflectors solve this: a Route Reflector re-advertises iBGP routes to its clients, acting as a hub. Route Reflector clusters are the standard architecture for ISP and large enterprise BGP.</p>
      </IQ>

      <IQ q="What causes a routing loop and how do different protocols prevent them?">
        <p style={{ margin: '0 0 14px' }}>A routing loop occurs when two or more routers forward packets for the same destination toward each other — creating a cycle. Without prevention, packets loop until their TTL expires. Routing loops typically occur during convergence: when a topology changes, different routers may temporarily have inconsistent views of the network, resulting in conflicting forwarding decisions.</p>
        <p style={{ margin: '0 0 14px' }}>Prevention by protocol: <strong>Link-state (OSPF/IS-IS)</strong>: every router has a complete, synchronized topology map — SPF algorithm mathematically guarantees loop-free paths as long as the LSDB is consistent. Loops can only occur during convergence before the LSDB is synchronized. <strong>Distance-vector (RIP)</strong>: uses split-horizon (don&apos;t advertise a route back to the interface it was learned on) and poison reverse (advertise with infinite metric back toward source) to prevent loops. Count-to-infinity problem means slow convergence, not prevented loops. <strong>BGP</strong>: AS-PATH loop detection — discard any route with your own ASN in the path. Prevents inter-AS loops absolutely. iBGP loop prevention relies on not re-advertising iBGP routes to other iBGP peers (requires full mesh or route reflectors).</p>
        <p style={{ margin: 0 }}>IP TTL (Time-to-Live) limits loop damage: a packet in a routing loop decrements its TTL at each hop and is discarded when TTL reaches 0. The router discards the packet and sends an ICMP Type 11 (Time Exceeded) back to the source. Traceroute exploits this mechanism to map routing paths.</p>
      </IQ>

      <IQ q="What is ECMP (Equal-Cost Multi-Path) routing?">
        <p style={{ margin: '0 0 14px' }}>ECMP (Equal-Cost Multi-Path) is a routing technique where a router has multiple routes to the same destination with identical cost (same prefix, same AD, same metric). Instead of arbitrarily choosing one, ECMP distributes traffic across all equal-cost next-hops simultaneously. This provides both load balancing (aggregate bandwidth of all paths) and redundancy (if one path fails, traffic continues via remaining paths).</p>
        <p style={{ margin: '0 0 14px' }}>OSPF and EIGRP support ECMP natively — if SPF yields multiple equal-cost paths, all are installed in the routing table. BGP requires explicit configuration (maximum-paths) to enable ECMP. In ECMP, traffic is typically distributed using a hash of packet header fields (src/dst IP, src/dst port) to ensure the same flow always uses the same path, preventing TCP reordering.</p>
        <p style={{ margin: 0 }}>Real-world use: data center spine-leaf architectures rely heavily on ECMP. Every leaf switch has 4–8 uplinks to spine switches, all with equal OSPF cost. Traffic to any destination hash-distributes across all spines simultaneously. AWS ECMP in the VPC fabric allows an individual flow to use any available path through the fabric — aggregate bandwidth scales with the number of paths.</p>
      </IQ>

      <IQ q="Explain the BGP best-path selection algorithm at a high level.">
        <p style={{ margin: '0 0 14px' }}>BGP may receive multiple paths to the same prefix from different peers. It selects one &quot;best path&quot; to install in the routing table and advertise to neighbors (unless using add-path or ECMP). The selection process runs through attributes in priority order:</p>
        <ol style={{ margin: '0 0 14px', paddingLeft: 24, lineHeight: 2, fontSize: 14 }}>
          <li>Highest WEIGHT (Cisco local, not propagated) — prefer routes injected by this router</li>
          <li>Highest LOCAL_PREF — prefer routes marked with higher local preference (intra-AS egress control)</li>
          <li>Locally originated (network/redistribute/aggregate) — prefer routes this router originated</li>
          <li>Shortest AS_PATH — fewer hops through the AS graph</li>
          <li>Lowest ORIGIN code (IGP=0 &lt; EGP=1 &lt; Incomplete=2)</li>
          <li>Lowest MED — neighbor&apos;s suggested entry point (optional, only comparable from same AS)</li>
          <li>eBGP over iBGP — prefer externally learned routes</li>
          <li>Lowest IGP metric to NEXT_HOP — prefer the path with the closest BGP next-hop</li>
          <li>Lowest BGP Router-ID (IP of the originating router) — final tiebreaker</li>
        </ol>
        <p style={{ margin: 0 }}>In practice: most engineers control BGP path selection using LOCAL_PREF (for egress) and AS-PATH prepending (to influence ingress at peers) and communities. The algorithm stops at the first differentiating attribute — you rarely reach tiebreakers below step 5 in real networks.</p>
      </IQ>

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="Common Misconceptions" />

      <Err title="Routing protocols find the fastest path">
        Routing protocols find the lowest-cost path by their protocol-specific metric. OSPF cost is based on reference bandwidth / interface bandwidth (a proxy for speed but not measured latency). BGP selects paths based on policy attributes — the internet&apos;s &quot;best&quot; BGP path can actually be longer and higher-latency than an alternative because LOCAL_PREF and AS_PATH are evaluated before any latency metric. Content providers like Google and Netflix use GeoDNS and anycast to route users to nearby PoPs — the actual BGP routing underneath may not choose the geographically closest path.
      </Err>

      <Err title="Default routes are only needed on edge routers">
        Default routes (0.0.0.0/0) are used throughout network hierarchies, not just at the edge. Branch office routers use a default route to send all traffic toward headquarters. Within an enterprise OSPF domain, area routers typically have a default route injected by the ABR. In AWS VPCs, subnets have a default route to the VPC router for internet-bound traffic. Virtually every end host has a default route pointing to its gateway. The default route is the most fundamental routing concept after directly-connected routes.
      </Err>

      <Err title="OSPF is always faster to converge than EIGRP">
        EIGRP stores feasible successors (pre-calculated backup paths) and can switch to them in milliseconds without re-running SPF — this is faster than OSPF&apos;s SPF recalculation. OSPF with BFD (Bidirectional Forwarding Detection) detects link failures in ~50ms and triggers SPF, but SPF execution adds time. EIGRP&apos;s DUAL algorithm uses pre-computed alternates and converges in ~milliseconds for failures covered by a feasible successor. However, EIGRP&apos;s convergence advantage only applies to topology changes where a feasible successor exists — for new destinations or topological changes without a pre-computed backup, EIGRP must run diffusing updates which can be slower than OSPF.
      </Err>

      <HR />

      <KeyTakeaways items={[
        'Routers make per-packet forwarding decisions using the routing table (FIB): look up destination IP, find the longest (most specific) prefix match, forward to the next-hop interface.',
        'Longest prefix match (LPM): if multiple routes match a destination, the most specific (/32 beats /24 beats /8) wins. Implemented in hardware TCAM for line-rate forwarding.',
        'Administrative distance (AD) determines which routing source wins when multiple protocols advertise the same prefix: connected=0, static=1, OSPF=110, iBGP=200. Lower = more trusted.',
        'Static routes are manually configured, do not adapt to failures, and are appropriate for default routes, stub networks, and floating backup paths.',
        'OSPF is link-state: every router floods LSAs to build a complete topology map (LSDB) and runs Dijkstra SPF for loop-free shortest paths. Area design and correct reference-bandwidth are critical.',
        'BGP is path-vector: routes carry the full AS_PATH for loop prevention. Path selection uses LOCAL_PREF (egress preference), AS_PATH length, MED, and other attributes for policy control.',
        'iBGP requires a full mesh or route reflectors because iBGP routes are not re-advertised to other iBGP peers (loop prevention). Route Reflectors are the standard solution.',
        'ECMP installs multiple equal-cost next-hops in the routing table, distributing traffic across all paths using per-flow hashing to prevent TCP reordering.',
        'TTL limits the damage from routing loops — packets are discarded after TTL decrements to 0. Traceroute exploits this by sending packets with TTL=1, 2, 3... to map each hop.',
      ]} />

    </LearnLayout>
  )
}
