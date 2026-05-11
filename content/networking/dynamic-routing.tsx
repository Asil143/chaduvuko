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

// ── OSPF Cost Calculator ──────────────────────────────────────────────────────
const LINK_TYPES = [
  { name: 'Loopback', bw: 0, fixed_cost: 1 },
  { name: '10 Mbps Ethernet', bw: 10, fixed_cost: null },
  { name: '100 Mbps FastEthernet', bw: 100, fixed_cost: null },
  { name: '1 Gbps GigabitEthernet', bw: 1000, fixed_cost: null },
  { name: '10 Gbps TenGigE', bw: 10000, fixed_cost: null },
  { name: '40 Gbps FortyGigE', bw: 40000, fixed_cost: null },
  { name: '100 Gbps HundredGigE', bw: 100000, fixed_cost: null },
]

function OSPFCostCalc() {
  const [refBw, setRefBw] = useState(100)

  const calcCost = (bw: number) => Math.max(1, Math.round(refBw / bw))

  const pathLinks = [
    { name: 'R1→R2 (1G)', bw: 1000 },
    { name: 'R2→R3 (100M)', bw: 100 },
    { name: 'R3→Dest (10G)', bw: 10000 },
  ]
  const totalCost = pathLinks.reduce((sum, l) => sum + calcCost(l.bw), 0)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', margin: '28px 0' }}>
      <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', background: `${N}06` }}>
        <p style={{ fontSize: 11, color: N, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '.1em', margin: '0 0 4px' }}>// INTERACTIVE — OSPF COST CALCULATOR</p>
        <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>Adjust the OSPF reference bandwidth to see how interface costs change across link speeds.</p>
      </div>

      <div style={{ padding: '20px 22px', borderBottom: '1px solid var(--border)' }}>
        <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', display: 'block', marginBottom: 8 }}>
          Reference Bandwidth: {refBw.toLocaleString()} Mbps
        </label>
        <input type="range" min={100} max={100000} step={100} value={refBw} onChange={e => setRefBw(Number(e.target.value))} style={{ width: '100%', accentColor: N }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--muted)', marginTop: 4 }}>
          <span>100 Mbps (default)</span>
          <span>100 Gbps (recommended)</span>
        </div>
      </div>

      <div style={{ padding: '20px 22px' }}>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 400 }}>
            <thead>
              <tr style={{ background: `${N}10` }}>
                {['Interface Type', 'Bandwidth', `Cost (ref=${refBw}M)`, 'Note'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 10, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LINK_TYPES.filter(l => l.bw > 0).map((link, i) => {
                const cost = calcCost(link.bw)
                const differentFrom100 = cost !== Math.max(1, Math.round(100 / link.bw))
                return (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)' }}>
                    <td style={{ padding: '8px 12px', border: '1px solid var(--border)', color: 'var(--text)' }}>{link.name}</td>
                    <td style={{ padding: '8px 12px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{link.bw >= 1000 ? `${link.bw / 1000}G` : `${link.bw}M`}</td>
                    <td style={{ padding: '8px 12px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontWeight: 700, color: cost === 1 && link.bw < refBw ? '#f59e0b' : N, fontSize: 15 }}>{cost}</td>
                    <td style={{ padding: '8px 12px', border: '1px solid var(--border)', fontSize: 11, color: 'var(--muted)' }}>
                      {cost === 1 && link.bw < refBw ? '⚠ Same cost as faster links above!' : differentFrom100 ? '✓ Distinct from default' : 'Same as default ref bw'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div style={{ padding: '14px 16px', background: `${N}08`, borderRadius: 8, fontSize: 13 }}>
          <div style={{ fontWeight: 700, color: N, marginBottom: 6 }}>Sample 3-hop path: R1→R2 (1G) + R2→R3 (100M) + R3→Dest (10G)</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 12 }}>
            {pathLinks.map(l => (
              <span key={l.name} style={{ fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--muted)' }}>{l.name}: </span>
                <span style={{ color: N, fontWeight: 700 }}>{calcCost(l.bw)}</span>
              </span>
            ))}
            <span style={{ fontWeight: 700, color: 'var(--text)' }}>→ Total: {totalCost}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── BGP Path Selection Walkthrough ───────────────────────────────────────────
const BGP_PATHS = [
  { id: 'A', nexthop: '10.0.0.1', weight: 0, localpref: 150, aspath: ['AS65001', 'AS65002'], origin: 'IGP', med: 10, via: 'eBGP', igp_metric: 5 },
  { id: 'B', nexthop: '10.0.0.2', weight: 0, localpref: 100, aspath: ['AS65003'], origin: 'IGP', med: 5, via: 'eBGP', igp_metric: 2 },
  { id: 'C', nexthop: '10.0.0.3', weight: 100, localpref: 100, aspath: ['AS65003'], origin: 'IGP', med: 5, via: 'iBGP', igp_metric: 1 },
  { id: 'D', nexthop: '10.0.0.4', weight: 0, localpref: 100, aspath: ['AS65003'], origin: 'EGP', med: 5, via: 'eBGP', igp_metric: 1 },
]

function BGPSim() {
  const [step, setStep] = useState(0)

  const steps = [
    { attr: 'WEIGHT', desc: 'Highest weight wins. Path C has weight=100 (manually configured). C leads.', winner: 'C', elim: [] as string[] },
    { attr: 'LOCAL_PREF', desc: 'C already leading from weight. Among remaining: Path A has LOCAL_PREF=150 (highest). A would be preferred among the others.', winner: 'C', elim: [] as string[] },
    { attr: 'AS_PATH length', desc: 'C has AS_PATH length 1, A has length 2. Shorter is better. C still leads.', winner: 'C', elim: ['A'] },
    { attr: 'ORIGIN', desc: 'C has origin=IGP (best). D has origin=EGP. Eliminating D.', winner: 'C', elim: ['A', 'D'] },
    { attr: 'MED', desc: 'C and B have identical MED=5. No elimination here.', winner: 'C', elim: ['A', 'D'] },
    { attr: 'eBGP over iBGP', desc: 'C is learned via iBGP. B is eBGP. If weight+localpref+aspath+origin+med were all equal, eBGP would win. But C has higher weight — C still wins.', winner: 'C', elim: ['A', 'D'] },
    { attr: 'BEST PATH', desc: 'Path C is selected. Weight=100 (step 1) was the decisive factor.', winner: 'C', elim: ['A', 'B', 'D'] },
  ]

  const currentStep = steps[Math.min(step, steps.length - 1)]

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', margin: '28px 0' }}>
      <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', background: `${N}06` }}>
        <p style={{ fontSize: 11, color: N, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '.1em', margin: '0 0 4px' }}>// INTERACTIVE — BGP BEST PATH SELECTION WALKTHROUGH</p>
        <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>Step through the BGP decision process for 4 candidate paths to the same prefix.</p>
      </div>

      <div style={{ overflowX: 'auto', padding: '16px 22px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, minWidth: 640, marginBottom: 16 }}>
          <thead>
            <tr style={{ background: `${N}10` }}>
              {['Path', 'Next Hop', 'Weight', 'Local Pref', 'AS Path', 'Origin', 'MED', 'Via', 'IGP Metric'].map(h => (
                <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 10, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BGP_PATHS.map((p, i) => {
              const isElim = step > 0 && currentStep.elim.includes(p.id)
              const isWinner = step === steps.length - 1 && currentStep.winner === p.id
              return (
                <tr key={i} style={{ background: isWinner ? `${N}15` : isElim ? '#ef444408' : i % 2 === 0 ? 'var(--surface)' : 'var(--background)', opacity: isElim ? 0.5 : 1 }}>
                  <td style={{ padding: '8px 10px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontWeight: 700, color: isWinner ? N : isElim ? '#ef4444' : 'var(--text)' }}>
                    Path {p.id} {isWinner ? '✓' : isElim ? '✗' : ''}
                  </td>
                  <td style={{ padding: '8px 10px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>{p.nexthop}</td>
                  <td style={{ padding: '8px 10px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', color: p.weight > 0 ? '#f59e0b' : 'var(--text)', fontWeight: p.weight > 0 ? 700 : 400 }}>{p.weight}</td>
                  <td style={{ padding: '8px 10px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', color: p.localpref > 100 ? '#3b82f6' : 'var(--text)', fontWeight: p.localpref > 100 ? 700 : 400 }}>{p.localpref}</td>
                  <td style={{ padding: '8px 10px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text)' }}>{p.aspath.join(' ')}</td>
                  <td style={{ padding: '8px 10px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', color: p.origin === 'EGP' ? '#f59e0b' : 'var(--text)' }}>{p.origin}</td>
                  <td style={{ padding: '8px 10px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{p.med}</td>
                  <td style={{ padding: '8px 10px', border: '1px solid var(--border)', fontSize: 11, color: p.via === 'iBGP' ? '#8b5cf6' : N }}>{p.via}</td>
                  <td style={{ padding: '8px 10px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{p.igp_metric}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div style={{ padding: '0 22px 20px' }}>
        <div style={{ padding: '14px 16px', borderRadius: 8, background: `${N}10`, border: `1px solid ${N}30`, marginBottom: 12, fontSize: 13 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: N, marginRight: 8 }}>Step {Math.min(step + 1, steps.length)}: {currentStep.attr}</span>
          <span style={{ color: 'var(--text)' }}>{currentStep.desc}</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--background)', color: step === 0 ? 'var(--muted)' : 'var(--text)', cursor: step === 0 ? 'default' : 'pointer', fontSize: 13 }}>← Back</button>
          <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step >= steps.length - 1} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: step >= steps.length - 1 ? 'var(--border)' : N, color: '#fff', cursor: step >= steps.length - 1 ? 'default' : 'pointer', fontSize: 13, fontWeight: 700 }}>Next Step →</button>
          <button onClick={() => setStep(0)} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text)', cursor: 'pointer', fontSize: 13 }}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default function DynamicRouting() {
  return (
    <LearnLayout
      title="Dynamic Routing Protocols"
      description="Deep dive into OSPF areas, cost tuning, and convergence; EIGRP DUAL algorithm; BGP path selection, communities, and real-world policy design."
      section="Networking Fundamentals"
      readTime="32 min"
      updatedAt="May 2026"
    >

      {/* ── PART 1 ── */}
      <Part n="01" title="Why Dynamic Routing Protocols Exist" />

      <P>
        A network with 50 routers and redundant paths has thousands of potential routes. Maintaining static routes for this topology manually is impossible — every link failure, every new subnet, every failover event would require immediate manual changes on multiple routers simultaneously. <Hl>Dynamic routing protocols</Hl> automate this entirely: routers discover neighbors, exchange topology information, compute optimal paths, and adapt to failures — all without human intervention, typically within seconds.
      </P>
      <P>
        The choice of routing protocol is not just a technical decision — it is an architectural one. OSPF and IS-IS are the IGP standards for enterprises and carriers respectively. EIGRP is used in Cisco-only environments. BGP is mandatory for any multi-homed internet connection or cloud provider peering. Understanding the tradeoffs of each protocol — not just how to configure them, but <em>why</em> they work the way they do — is the difference between a network operator and a network engineer.
      </P>

      <HR />

      {/* ── PART 2 ── */}
      <Part n="02" title="OSPF Deep Dive: Areas, DR/BDR, and LSA Types" />

      <P>
        OSPF is hierarchical: it divides networks into <Hl>areas</Hl> to limit the scope of link-state flooding and SPF computation. Area 0 is the backbone — all other areas must connect to Area 0 through an <Hl>ABR (Area Border Router)</Hl>. Inter-area routing appears to every non-backbone router as if the destination is directly connected to Area 0, hiding the topology details of other areas. This reduces SPF computation from O(N²) on a flat topology to O(N²/A) where A is the number of areas.
      </P>

      <H>OSPF Router Types</H>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, margin: '16px 0 24px' }}>
        {[
          { type: 'Internal Router', color: '#6b7280', desc: 'All interfaces in one area. Only knows that area\'s topology.' },
          { type: 'ABR (Area Border Router)', color: '#3b82f6', desc: 'Connects two or more areas. Summarizes routes between areas. Has one LSDB per area it belongs to.' },
          { type: 'ASBR (Autonomous System Boundary Router)', color: '#f59e0b', desc: 'Redistributes routes from external protocols (BGP, static, EIGRP) into OSPF. Creates Type 5 or Type 7 LSAs.' },
          { type: 'Backbone Router', color: N, desc: 'Has at least one interface in Area 0. May also be an ABR or ASBR.' },
        ].map(item => (
          <div key={item.type} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: item.color, marginBottom: 6 }}>{item.type}</div>
            <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <H>LSA Types</H>
      <div style={{ overflowX: 'auto', margin: '12px 0 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 580 }}>
          <thead>
            <tr style={{ background: `${N}12` }}>
              {['Type', 'Name', 'Generated by', 'Scope', 'Description'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Type 1', 'Router LSA', 'All routers', 'Within area', 'Describes the router\'s directly connected links, their costs, and neighbor information. One per router per area.'],
              ['Type 2', 'Network LSA', 'DR on broadcast segments', 'Within area', 'Describes all routers connected to a broadcast segment (multi-access network). Generated by the Designated Router.'],
              ['Type 3', 'Summary LSA (inter-area)', 'ABR', 'Backbone + areas', 'Describes routes to subnets in other areas. ABR summarizes Type 1/2 LSAs from one area and advertises as Type 3 into other areas.'],
              ['Type 4', 'ASBR Summary LSA', 'ABR', 'Backbone + areas', 'Tells other areas how to reach the ASBR (for external routes). Generated by ABR when ASBR is not in Area 0.'],
              ['Type 5', 'External LSA', 'ASBR', 'Entire OSPF domain', 'Describes routes redistributed into OSPF from external sources (BGP, static). E1 or E2 metric type.'],
              ['Type 7', 'NSSA External LSA', 'ASBR in NSSA', 'Within NSSA area', 'Like Type 5 but used in Not-So-Stubby Areas. Converted to Type 5 by ABR at area boundary.'],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '9px 14px', border: '1px solid var(--border)', fontFamily: j === 0 ? 'var(--font-mono)' : undefined, fontWeight: j === 0 ? 700 : 400, color: j === 0 ? N : 'var(--text)', lineHeight: 1.5 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H>DR and BDR on Broadcast Segments</H>
      <P>
        On multi-access broadcast segments (Ethernet), OSPF elects a <Hl>DR (Designated Router)</Hl> and <Hl>BDR (Backup Designated Router)</Hl> to reduce flooding. Without DR/BDR, each pair of routers on a segment would form a full adjacency — N×(N−1)/2 adjacencies on a segment with N routers. With DR/BDR: every router forms a Full adjacency only with the DR and BDR. Other routers (DROther) form only 2-Way adjacencies with each other. The DR generates the Type 2 Network LSA for the segment and is responsible for flooding LSAs on behalf of all routers.
      </P>
      <P>
        DR election: highest priority wins (default 1, configurable 0–255 — 0 means never elected). Tie-break: highest router-ID. The election is non-preemptive — the current DR holds its role even if a higher-priority router comes online, unless the DR fails. This is why you should configure explicit priorities to ensure the intended router becomes DR, rather than relying on router-ID.
      </P>

      <Err title="OSPF DR/BDR election happening on point-to-point links">
        OSPF performs DR/BDR election only on broadcast and NBMA (non-broadcast multi-access) network types. For point-to-point links (two routers directly connected), configure <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '2px 5px', borderRadius: 3, fontSize: 12 }}>ip ospf network point-to-point</code> to skip the DR/BDR election entirely. On point-to-point links, DR/BDR election wastes time (up to 40 seconds for Dead timer + election) and adds unnecessary protocol overhead. Always verify the OSPF network type matches the physical link type.
      </Err>

      <HR />

      {/* ── PART 3 ── */}
      <Part n="03" title="Interactive: OSPF Cost Calculator" />

      <P>
        The most common OSPF misconfiguration in modern networks is an incorrect reference bandwidth. When the reference bandwidth is 100 Mbps (default), all links at 1 Gbps and above have the same cost of 1 — OSPF cannot distinguish between a 1G, 10G, or 100G link. The interactive calculator below shows how changing the reference bandwidth makes costs meaningful across link speeds.
      </P>

      <OSPFCostCalc />

      <ProTip>
        Configure OSPF reference bandwidth to the highest-speed link in your network. For a network with 100G links: <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '2px 5px', borderRadius: 3, fontSize: 12 }}>auto-cost reference-bandwidth 100000</code> (in Mbps). Then a 100G link has cost 1, a 10G link has cost 10, a 1G link has cost 100, and a 100M link has cost 1000. This accurately reflects relative bandwidth and ensures OSPF prefers the 100G path over the 10G path. Configure this identically on every router in the OSPF domain.
      </ProTip>

      <HR />

      {/* ── PART 4 ── */}
      <Part n="04" title="OSPF Area Types: Stub, Totally Stubby, NSSA" />

      <P>
        OSPF area types control which LSAs are allowed to enter an area, reducing LSDB size and SPF computation on routers that do not need full external route visibility.
      </P>

      <div style={{ overflowX: 'auto', margin: '12px 0 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 640 }}>
          <thead>
            <tr style={{ background: `${N}12` }}>
              {['Area Type', 'Type 5 LSAs?', 'Type 3 LSAs?', 'Default Route injected?', 'Use case'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Normal area', 'Yes', 'Yes', 'No', 'Core/backbone areas that need full route visibility'],
              ['Stub area', 'No (blocked)', 'Yes (summary)', 'Yes (/0 default)', 'Branch sites that only need a summary + default route'],
              ['Totally stubby (Cisco)', 'No', 'No (only default)', 'Yes (/0 default)', 'Branch sites with only one path — most minimal LSDB'],
              ['NSSA (Not-So-Stubby)', 'No (Type 7 instead)', 'Yes', 'Optional', 'Branch with a local ASBR (e.g., branch has its own MPLS link to ISP)'],
              ['Totally NSSA (Cisco)', 'No', 'No (only default)', 'Yes', 'Branch with local ASBR but no need for inter-area summaries'],
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

      <P>
        A totally stubby area is the most efficient design for branch routers: the branch LSDB contains only Type 1, Type 2 LSAs for the local area, and a single Type 3 default route. A router in a totally stubby area with 100 branch subnets has a tiny LSDB and SPF computation — it simply forwards everything to the ABR via the default route, which knows the full topology.
      </P>

      <HR />

      {/* ── PART 5 ── */}
      <Part n="05" title="EIGRP: Cisco's Fast Converging Distance-Vector Protocol" />

      <P>
        <Hl>EIGRP (Enhanced Interior Gateway Routing Protocol)</Hl> is Cisco&apos;s proprietary routing protocol that combines features of distance-vector and link-state. It uses the <Hl>DUAL (Diffusing Update Algorithm)</Hl> to guarantee loop-free paths and converge instantly when a pre-computed backup path exists.
      </P>

      <H>EIGRP Key Concepts</H>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, margin: '16px 0 28px' }}>
        {[
          { term: 'Feasible Distance (FD)', desc: 'The best metric from this router to the destination. The metric in the EIGRP routing table. Composite: (K1×BW + K3×Delay) × 256 by default (K2, K4, K5 unused by default).' },
          { term: 'Reported Distance (RD)', desc: 'The metric a neighbor advertises for the destination — the neighbor\'s own Feasible Distance. Also called Advertised Distance (AD) — not to be confused with Administrative Distance.' },
          { term: 'Successor', desc: 'The best path to a destination — the neighbor with the lowest FD. Installed in the routing table. The router the packet is forwarded to.' },
          { term: 'Feasible Successor (FS)', desc: 'A backup path satisfying the Feasibility Condition: neighbor\'s RD < current FD. If the Successor fails, the FS immediately becomes the new Successor without re-running DUAL — instant convergence.' },
          { term: 'Feasibility Condition', desc: 'A neighbor qualifies as a Feasible Successor only if its Reported Distance is strictly less than the current Feasible Distance. This guarantees the backup path is loop-free.' },
          { term: 'DUAL Algorithm', desc: 'When a Successor fails and no FS exists, DUAL sends QUERY messages to all neighbors and waits for RD updates. Convergence takes longer but is still typically faster than OSPF SPF for large networks.' },
        ].map(item => (
          <div key={item.term} style={{ background: 'var(--surface)', border: `1px solid ${N}20`, borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: N, marginBottom: 6 }}>{item.term}</div>
            <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <H>EIGRP vs OSPF Comparison</H>
      <div style={{ overflowX: 'auto', margin: '12px 0 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 600 }}>
          <thead>
            <tr style={{ background: `${N}12` }}>
              {['Feature', 'EIGRP', 'OSPF'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Algorithm', 'DUAL (distance vector + diffusing)', 'Dijkstra SPF (link-state)'],
              ['Metric', 'Composite: BW + Delay (+ reliability, load, MTU rarely used)', 'Cost = ref_bw / interface_bw'],
              ['Convergence', 'Instant if FS exists; ~seconds if DUAL needed', '~1-3s with fast timers + BFD'],
              ['Scalability', 'Good; QUERY propagation can be slow on large networks', 'Excellent with proper area design'],
              ['Vendor support', 'Cisco only (now open, but rarely deployed on non-Cisco)', 'All vendors, open standard'],
              ['Topology info', 'Only neighbors\' distances (partial topology)', 'Full topology map (LSDB)'],
              ['Authentication', 'MD5 or SHA-256', 'MD5 or SHA-256'],
              ['VLSM support', 'Yes (EIGRP v2 and later)', 'Yes'],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '9px 14px', border: '1px solid var(--border)', fontWeight: j === 0 ? 700 : 400, color: j === 0 ? N : 'var(--text)' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <HR />

      {/* ── PART 6 ── */}
      <Part n="06" title="BGP Deep Dive: Communities, Route Filtering, and Policy" />

      <P>
        BGP&apos;s power comes from its <Hl>policy control</Hl> capabilities — no other routing protocol allows such fine-grained control over which routes are accepted, preferred, and advertised. The three primary policy tools are: <Hl>communities</Hl> (route tags), <Hl>route maps</Hl> (conditional attribute modification), and <Hl>prefix lists</Hl> (prefix-based filtering).
      </P>

      <H>BGP Communities</H>
      <P>
        A <Hl>community</Hl> is a 32-bit value attached to a BGP route that acts as a tag. Routes can carry multiple communities. ISPs use communities to implement routing policy at scale — customers tag their routes with specific communities to request traffic engineering without needing individual configurations on ISP routers. Well-known standard communities:
      </P>

      <div style={{ overflowX: 'auto', margin: '12px 0 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 580 }}>
          <thead>
            <tr style={{ background: `${N}12` }}>
              {['Community', 'Value', 'Effect'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['NO_EXPORT', '0xFFFFFF01 (65535:65281)', 'Do not advertise this route to any eBGP peer. Route stays within the local AS. Used to prevent a route from leaking to the internet.'],
              ['NO_ADVERTISE', '0xFFFFFF02 (65535:65282)', 'Do not advertise this route to any peer (iBGP or eBGP). Route is used locally only.'],
              ['BLACKHOLE', 'Varies by ISP (e.g., 65535:666)', 'Request the receiving ISP to null-route (drop) this prefix — used for DDoS mitigation. A /32 with blackhole community gets routed to Null0 everywhere.'],
              ['NO_EXPORT_SUBCONFED', '0xFFFFFF03', 'Do not send to eBGP peers outside this sub-confederation.'],
              ['65000:100 (example ISP)', 'ISP-defined', 'Customer-specific community, e.g., &quot;set LOCAL_PREF=100 on ingress&quot; — each ISP publishes their community schema.'],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)' }}>
                <td style={{ padding: '9px 14px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontWeight: 700, color: N }}>{row[0]}</td>
                <td style={{ padding: '9px 14px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>{row[1]}</td>
                <td style={{ padding: '9px 14px', border: '1px solid var(--border)', color: 'var(--text)', lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: row[2] }} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H>BGP Route Filtering</H>
      <P>
        Filtering incoming and outgoing BGP routes is mandatory for security and stability. The <Hl>principle of minimal advertisement</Hl>: never advertise prefixes you did not originate unless you are explicitly paid to provide transit. The <Hl>principle of minimal acceptance</Hl>: validate received prefixes against RPKI (Resource Public Key Infrastructure) and reject routes that are more-specific or aggregated in unexpected ways. Without filtering, a misconfigured router can cause BGP hijacking — advertising other organizations&apos; prefixes and attracting their traffic.
      </P>

      <ProTip>
        RPKI (Resource Public Key Infrastructure) is a cryptographic system where organizations digitally sign their BGP route announcements using certificates tied to their IP address registrations. A Route Origin Authorization (ROA) states: &quot;AS 12345 is authorized to originate 203.0.113.0/24.&quot; Routers with RPKI validation drop any BGP announcement that conflicts with a valid ROA. As of 2025, ~45% of the global BGP routing table has RPKI coverage. Cloudflare, Amazon, and most major providers enforce RPKI-invalid rejection. Enable RPKI on all BGP speakers — it is one of the most impactful security improvements in internet routing history.
      </ProTip>

      <HR />

      {/* ── PART 7 ── */}
      <Part n="07" title="Interactive: BGP Best Path Selection" />

      <BGPSim />

      <HR />

      {/* ── PART 8 ── */}
      <Part n="08" title="Route Redistribution: Connecting Multiple Routing Domains" />

      <P>
        <Hl>Route redistribution</Hl> imports routes from one routing protocol into another. For example, an ASBR redistributes BGP routes into OSPF so internal routers can reach internet destinations. Redistribution requires explicit configuration specifying: which routes to redistribute (usually filtered with a prefix list or route map), the metric for the injected routes, and the metric type (E1 vs E2 for OSPF external routes).
      </P>

      <H>Redistribution Risks</H>
      <P>
        Redistribution between two dynamic routing protocols creates potential for <Hl>routing domain feedback</Hl>: routes from Protocol A get redistributed into Protocol B, which re-distributes them back into Protocol A with modified attributes, causing the route to appear as if it came from a new source — and the loop can continue. The fix is careful use of route maps with route-tags: mark all redistributed routes with a unique tag, and filter out any routes carrying that tag on re-import. Without this, mutual redistribution between OSPF and EIGRP will create routing instability within minutes.
      </P>

      <Err title="Redistributing a full BGP table into OSPF">
        The internet BGP routing table has ~900,000 prefixes. Redistributing all BGP routes into OSPF would create 900,000 Type 5 LSAs, flooding every OSPF router in the domain and exhausting their memory. Never redistribute a full BGP table into an IGP. The correct architecture: run BGP on edge routers and inject only a default route (0.0.0.0/0) into the IGP via redistribution. Internal routers need only to reach the edge — they do not need individual internet routes.
      </Err>

      <HR />

      {/* ── PART 9 ── */}
      <Part n="09" title="BFD: Sub-Second Failure Detection" />

      <P>
        <Hl>BFD (Bidirectional Forwarding Detection)</Hl> is a protocol designed for one purpose: detecting link and path failures in milliseconds — far faster than any routing protocol&apos;s own timers. OSPF Dead timer = 40 seconds (default), EIGRP Hold timer = 15 seconds. With BFD, the same failure can be detected in 50–300 milliseconds. BFD sends control packets between two endpoints at a configured interval (typically 100–300ms); if 3 consecutive packets are missed, the BFD session goes down, triggering the associated routing protocol to immediately remove the failed path.
      </P>
      <P>
        BFD is protocol-agnostic: it works with OSPF, EIGRP, BGP, IS-IS, and static routes. On a BGP peering session where the hold timer is 90 seconds (graceful convergence preference), BFD can detect a link failure in 300ms and trigger BGP path withdrawal immediately — before the hold timer expires. This is critical for enterprise BGP multi-homing where sub-second failover is required.
      </P>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Day in the Life — Juniper Networks SRE: OSPF Stuck in EXSTART" />

      <P>
        <strong>Company:</strong> Major financial services firm (Juniper-based network) · <strong>Role:</strong> Network SRE · <strong>Location:</strong> NYC data center · <strong>Date:</strong> Monday, February 10, 2025
      </P>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', margin: '20px 0 28px' }}>
        <p style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', margin: '0 0 12px' }}>INCIDENT: New firewall insertion breaks OSPF adjacency — two distribution routers stuck in ExStart/Exchange</p>

        <TimeBlock time="09:45 AM" label="Ticket: OSPF adjacency not forming between dist-01 and dist-02">
          After a weekend change — insertion of a new firewall in the path between two distribution routers — OSPF adjacency between dist-01 and dist-02 is not establishing. The state flaps between ExStart and Exchange every 30 seconds, never reaching Full. Basic connectivity works (ping succeeds between the routers&apos; IP addresses). OSPF Hello packets are being received (state reaches 2-Way briefly) but the OSPF Database Description (DBD) exchange fails.
        </TimeBlock>

        <TimeBlock time="09:58 AM" label="Debug output — MTU mismatch identified">
          The engineer runs <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: '#0a0a0a', padding: '2px 6px', borderRadius: 3 }}>show ospf interface detail</code> on both routers. dist-01 shows MTU 9000 (jumbo frames enabled). dist-02 shows MTU 1500. The firewall in between was inserted with default 1500-byte MTU on both sides but with a configuration flag that causes it to negotiate MTU during the OSPF ExStart exchange. OSPF DB Description packets include the sender&apos;s interface MTU. The RFC specifies that if the received MTU in a DBD packet is greater than the router&apos;s own interface MTU, the packet is discarded and the exchange cannot proceed.
        </TimeBlock>

        <TimeBlock time="10:05 AM" label="Root cause confirmed — three-way MTU interaction">
          The specific failure path: dist-01 sends DBD with MTU=9000 (its interface MTU). The DBD travels through the new firewall, which drops the packet because 9000 &gt; firewall interface MTU of 1500 (TCP MSS clamping was enabled for transit, but OSPF uses IP directly, not TCP). dist-02 never receives the DBD from dist-01, so the ExStart timer expires and retries. The workaround option: configure <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: '#0a0a0a', padding: '2px 6px', borderRadius: 3 }}>ip ospf mtu-ignore</code> on both routers to bypass the MTU check — but this masks the underlying mismatch and would cause OSPF packets &gt;1500 bytes to be dropped during normal operation.
        </TimeBlock>

        <TimeBlock time="10:20 AM" label="Fix: consistent MTU, not mtu-ignore">
          The correct fix is to make MTU consistent. The firewall is reconfigured with 9000-byte MTU on its interfaces. dist-02&apos;s interface MTU is also increased to 9000 bytes to match the intended network-wide jumbo frame configuration. After the interface change, OSPF ExStart immediately transitions to Exchange, then Loading, then Full within 8 seconds. The adjacency is stable. The engineer verifies routing tables on both routers and confirms all expected routes are present.
        </TimeBlock>

        <TimeBlock time="Post-incident" label="Change process improvement">
          Postmortem: the firewall insertion change procedure did not include an OSPF verification step. Added to the runbook: &quot;After any middle-of-path device insertion, verify OSPF neighbor states on all routers that transit the new device, and verify MTU consistency with <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>show interfaces</code>.&quot; Also added to the pre-change checklist: &quot;Verify new device passes ICMP packets of size 9000 with DF-bit set before finalizing the change.&quot;
        </TimeBlock>
      </div>

      <Err title="Using 'ip ospf mtu-ignore' to fix MTU mismatch">
        The <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '2px 5px', borderRadius: 3, fontSize: 12 }}>ip ospf mtu-ignore</code> command bypasses the OSPF MTU check, allowing the adjacency to form even when MTUs don&apos;t match. This forms the adjacency but creates a silent problem: any OSPF LSA packet larger than the smaller MTU will be dropped by the device with the smaller MTU — leading to incomplete LSDB synchronization and black holes for routes only advertised in those large LSAs. Always fix the underlying MTU mismatch; use <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '2px 5px', borderRadius: 3, fontSize: 12 }}>mtu-ignore</code> only as a temporary diagnostic tool to confirm MTU is the root cause.
      </Err>

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="Interview Prep — 7 Questions With Complete Answers" />

      <IQ q="Explain the OSPF LSDB and why it is necessary for loop-free routing.">
        <p style={{ margin: '0 0 14px' }}>The LSDB (Link State Database) is OSPF&apos;s complete map of the network topology. Every router in an OSPF area has an identical copy of the LSDB, containing Link State Advertisements (LSAs) from every other router. Each LSA describes a router&apos;s directly connected links, their costs, and neighbor information. The LSDB is synchronized through flooding — when a router originates or receives a new LSA, it floods it to all neighbors, which flood it to their neighbors, until every router has the update.</p>
        <p style={{ margin: '0 0 14px' }}>The LSDB enables loop-free routing because each router independently runs Dijkstra&apos;s SPF algorithm on the complete, accurate topology map. The algorithm mathematically finds the shortest path tree rooted at the local router — because every router uses the same topology map, all their routing decisions are consistent and loop-free. Loops only occur transiently during convergence, before the LSA flood propagates the topology change to all routers.</p>
        <p style={{ margin: 0 }}>Contrast with distance-vector: a distance-vector router only knows its neighbors&apos; distances (it doesn&apos;t know the full topology). The count-to-infinity problem occurs when a link fails and routers pass incorrect distance information back and forth before convergence. Link-state&apos;s full topology knowledge eliminates this category of problem.</p>
      </IQ>

      <IQ q="What is the EIGRP Feasibility Condition and why does it prevent routing loops?">
        <p style={{ margin: '0 0 14px' }}>The EIGRP Feasibility Condition (FC) states that a neighbor qualifies as a Feasible Successor (backup path) only if its Reported Distance (RD) — the metric that neighbor advertises for the destination — is strictly less than the current router&apos;s Feasible Distance (FD) — the best known metric for that destination.</p>
        <p style={{ margin: '0 0 14px' }}>This condition guarantees loop-free backup paths because of a mathematical invariant: if a neighbor&apos;s cost to the destination is less than our own best cost, that neighbor cannot possibly be routing traffic back through us to reach that destination (that would create a loop and contradict its lower cost claim). Put simply: if the neighbor reaches the destination more efficiently than we do, it is not using us as an intermediate hop.</p>
        <p style={{ margin: 0 }}>Practical impact: when a Successor fails and a Feasible Successor exists, EIGRP immediately installs the FS as the new route — no queries sent, no re-computation needed, convergence in milliseconds. This is EIGRP&apos;s primary advantage. When no FS exists (FC not met), EIGRP must send QUERY messages to all neighbors and wait for responses — this is slower, similar in concept to OSPF SPF re-computation.</p>
      </IQ>

      <IQ q="What is a BGP community and give a real-world example of its use.">
        <p style={{ margin: '0 0 14px' }}>A BGP community is a 32-bit value (written as ASN:value, e.g., 65000:100) that acts as a tag on a BGP route. Communities are optional and transitive — they can be propagated to other BGP peers. A single route can carry multiple communities. Communities allow ISPs to implement routing policy at scale without individual per-customer configuration.</p>
        <p style={{ margin: '0 0 14px' }}>Real-world example: Comcast AS7922 publishes its community schema. A customer that peers with Comcast can tag their routes with community 7922:9900 to request &quot;do not advertise this route outside North America&quot; — implemented as LOCAL_PREF manipulation or route filtering in Comcast&apos;s routers. Without communities, the customer would need to call Comcast&apos;s NOC and request a manual configuration change; with communities, the customer simply adds the tag to their BGP advertisements and the policy takes effect automatically.</p>
        <p style={{ margin: 0 }}>DDoS mitigation example: when a network operator is under a DDoS attack targeting 198.51.100.5/32, they tag that /32 route with the BLACKHOLE community (e.g., 65535:666 or ISP-specific value) and advertise it to their upstream ISPs. The ISPs route the /32 to their Null0 interface, dropping all traffic destined for the attack target at the ISP level — before it enters the operator&apos;s network and consumes bandwidth. This is &quot;upstream blackholing&quot; and is the fastest DDoS mitigation technique available.</p>
      </IQ>

      <IQ q="Explain the difference between E1 and E2 external routes in OSPF.">
        <p style={{ margin: '0 0 14px' }}>When an ASBR redistributes external routes into OSPF, it creates Type 5 (or Type 7) External LSAs with a metric type of E1 or E2. The difference: <strong>E2 (type 2)</strong> maintains the cost at the redistribution boundary only — as the route is propagated across OSPF, the internal OSPF cost to reach the ASBR is <em>not</em> added to the route&apos;s metric. Every router sees the same external cost regardless of how far away the ASBR is. <strong>E1 (type 1)</strong> adds the OSPF internal cost to reach the ASBR to the external metric — routers closer to the ASBR see a lower total cost.</p>
        <p style={{ margin: '0 0 14px' }}>E2 is the OSPF default. Use E2 when there is only one ASBR or when you want all internal routers to use the same external metric (simple, deterministic). Use E1 when there are multiple ASBRs redistributing the same prefix and you want routers to prefer the closest ASBR — E1 ensures internal OSPF cost is factored in, naturally directing traffic to the nearest exit point.</p>
        <p style={{ margin: 0 }}>Selection rule when both E1 and E2 exist for the same prefix: E1 always wins over E2, regardless of metric value. This is because E1 is considered more &quot;accurate&quot; (includes internal cost). After E1 vs E2 is compared, within each type, lower metric wins.</p>
      </IQ>

      <IQ q="What is OSPF graceful restart and why is it important for network stability?">
        <p style={{ margin: '0 0 14px' }}>OSPF Graceful Restart (RFC 3623) allows an OSPF router to restart its software (e.g., during an OS upgrade or process crash) while its hardware continues forwarding traffic based on the pre-crash routing table — without causing OSPF neighbor adjacencies to drop and forcing a full SPF re-computation across the network.</p>
        <p style={{ margin: '0 0 14px' }}>How it works: the restarting router sends a Grace LSA before restarting, telling its neighbors &quot;I&apos;m about to restart, please maintain your adjacency with me and don&apos;t change your routing tables for the grace period (typically 120 seconds).&quot; The neighbors act as &quot;helper&quot; routers, keeping the adjacency in their databases as if it were still active. The restarting router re-advertises its LSAs within the grace period. If successful, the restart is invisible to the network — no re-convergence, no traffic disruption.</p>
        <p style={{ margin: 0 }}>Without graceful restart, a software process restart on a distribution router causes adjacency drops, SPF re-computations on all routers in the OSPF domain, and potentially seconds of traffic disruption. On high-availability platforms (Cisco NSF/NSR, Juniper NSR), the control plane restarts while the forwarding plane continues — graceful restart handles the OSPF signaling to keep the rest of the network calm during this window.</p>
      </IQ>

      <IQ q="A BGP session between two routers keeps dropping every 90 seconds. What are the likely causes?">
        <p style={{ margin: '0 0 14px' }}>A BGP session drops every 90 seconds is a strong hint: the default BGP Hold Timer is <strong>90 seconds</strong> (Cisco default). BGP uses the Hold Timer to detect dead sessions — if no BGP KEEPALIVE or UPDATE is received within the Hold Timer period, the session is torn down. The default KEEPALIVE timer is Hold Timer / 3 = 30 seconds. If KEEPALIVE packets are not being exchanged successfully, the session drops at exactly the Hold Timer interval.</p>
        <p style={{ margin: '0 0 14px' }}>Causes of failed KEEPALIVE delivery: (1) <strong>ACL or firewall blocking TCP port 179</strong> — BGP uses TCP/179; a stateful firewall that does not recognize the BGP session, or an ACL that blocks port 179 intermittently, will cause KEEPALIVE drops; (2) <strong>CPU overload</strong> — BGP process starvation on an overloaded router prevents KEEPALIVE generation; (3) <strong>MTU issue</strong> — large BGP UPDATE packets exceeding the path MTU are fragmented and the fragments are dropped; (4) <strong>Routing loop in the TCP path</strong> — the BGP TCP session itself is being routed incorrectly; (5) <strong>Authentication mismatch</strong> — MD5 authentication configured on one side only causes TCP RST after Hold Timer.</p>
        <p style={{ margin: 0 }}>Diagnosis: capture packets on the BGP TCP session (tcpdump on port 179). Verify KALIVEs are being sent (every 30s) and received. Check router CPU utilization during the drop window. Verify MTU on the path with ping+DF-bit. Confirm hold timer values match on both sides with &quot;show bgp neighbors&quot;.</p>
      </IQ>

      <IQ q="What is route reflector and why is it needed in iBGP?">
        <p style={{ margin: '0 0 14px' }}>In iBGP, a router does not re-advertise routes learned from one iBGP peer to another iBGP peer (loop prevention rule). This means every router must peer directly with every other router (full mesh) to receive all routes — N×(N−1)/2 sessions for N routers. At 50 routers: 1225 sessions. At 100 routers: 4950 sessions. This is operationally unmanageable at scale.</p>
        <p style={{ margin: '0 0 14px' }}>A <strong>Route Reflector (RR)</strong> is an iBGP router that is explicitly configured to re-advertise iBGP routes to its clients, breaking the no-readvertise rule for its cluster. Clients only peer with the RR (not with each other). The RR peers with other RRs (and non-client iBGP peers) in a full mesh between RRs. This reduces N×(N−1)/2 sessions to approximately N sessions (N clients + RR-to-RR full mesh between a small number of RRs).</p>
        <p style={{ margin: 0 }}>Loop prevention with route reflectors: the RR adds ORIGINATOR_ID (the route originator&apos;s router-ID) and CLUSTER_LIST (the RR cluster IDs traversed) to reflected routes. A router that receives a route with its own router-ID in ORIGINATOR_ID or its cluster ID in CLUSTER_LIST discards it. Multiple RRs per cluster provide redundancy — clients peer with both and the one that fails is not noticed by clients because the other continues reflecting routes.</p>
      </IQ>

      <HR />

      {/* ── PART 12 ── */}
      <Part n="12" title="Common Misconceptions" />

      <Err title="OSPF cost automatically reflects link speed with default settings">
        The default OSPF reference bandwidth of 100 Mbps means all interfaces at or above 100 Mbps have cost 1 (minimum). A 100 Mbps FastEthernet, a 1 Gbps GigabitEthernet, a 10 Gbps, and a 100 Gbps link all have OSPF cost 1 with default settings. OSPF cannot differentiate them and will route traffic across a 100 Mbps link instead of a 100 Gbps link if metrics happen to be equal. Always configure <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '2px 5px', borderRadius: 3, fontSize: 12 }}>auto-cost reference-bandwidth</code> to a value at least 10× higher than your fastest link.
      </Err>

      <Err title="BGP is a routing protocol that optimizes for performance">
        BGP is a policy routing protocol — it does not optimize for latency, bandwidth, or any performance metric. BGP selects paths based on policy attributes: LOCAL_PREF (administrative preference), AS_PATH length (number of AS hops), MED (neighbor&apos;s suggestion), and bureaucratic tiebreakers. An internet path chosen by BGP may be longer and higher-latency than an alternative because the ISP has a commercial relationship with the first-choice AS. CDNs (Akamai, Cloudflare, Google) solve this by using anycast + BGP to advertise the same prefix from hundreds of PoPs and letting BGP&apos;s nearest-match behavior route users to the closest PoP — this gets near-optimal performance from a fundamentally non-performance-optimized protocol.
      </Err>

      <Err title="More routing protocols in a network is better (redundancy)">
        Running multiple routing protocols simultaneously (e.g., both OSPF and EIGRP throughout an enterprise) creates redistribution loops, increases convergence complexity, and makes troubleshooting harder — not more reliable. Protocol redundancy is not a valid network design strategy. The correct approach: run one IGP domain-wide (OSPF or IS-IS), use static routes only for simple stubs, and use BGP only at the edge for internet/multi-homed connectivity. The &quot;redundancy&quot; comes from redundant links and fast convergence timers, not from running multiple protocols.
      </Err>

      <HR />

      <KeyTakeaways items={[
        'OSPF uses link-state flooding (LSAs) to synchronize a complete topology database (LSDB) across all routers in an area. Dijkstra SPF computes loop-free shortest paths from this map.',
        'OSPF areas limit flooding scope and SPF computation. Area 0 is the backbone. ABRs connect areas. ASBR redistributes external routes. Stub/totally-stubby areas minimize LSDB in branch offices.',
        'OSPF reference bandwidth must be increased above the default 100 Mbps — otherwise all links at 1G and above get cost=1 and OSPF cannot prefer a 100G path over a 1G path.',
        'DR/BDR election on broadcast segments reduces OSPF flooding overhead. Always configure point-to-point network type on P2P links to skip DR/BDR election.',
        'EIGRP uses DUAL: Feasible Successors are pre-computed backup paths satisfying FD_neighbor < FD_local (loop-free guarantee). FS convergence is instant; no-FS convergence uses QUERY/REPLY.',
        'BGP communities are 32-bit policy tags: NO_EXPORT prevents leaking routes to the internet; BLACKHOLE triggers upstream null-routing for DDoS mitigation. ISPs publish their community schemas.',
        'BGP selects best path in order: WEIGHT → LOCAL_PREF → locally originated → shortest AS_PATH → lowest ORIGIN → lowest MED → eBGP over iBGP → lowest IGP metric to next-hop.',
        'iBGP route reflectors solve the full-mesh scaling problem. RRs re-advertise iBGP routes to clients. ORIGINATOR_ID and CLUSTER_LIST prevent loops.',
        'BFD detects link failures in 50–300ms — attach it to OSPF, BGP, and static routes for sub-second failover rather than waiting for protocol-native Dead/Hold timers.',
        'Never redistribute a full BGP table (900K+ routes) into an IGP. Inject only a default route from BGP into the IGP and let edge routers handle internet routing via BGP.',
      ]} />

    </LearnLayout>
  )
}
