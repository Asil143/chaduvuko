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

const Term = ({ word, def }: { word: string; def: string }) => (
  <div style={{ display: 'flex', gap: 0, marginBottom: 12, border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
    <div style={{ background: `${N}12`, borderRight: `1px solid ${N}20`, padding: '10px 16px', minWidth: 160, display: 'flex', alignItems: 'center' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: N }}>{word}</span>
    </div>
    <div style={{ padding: '10px 16px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{def}</div>
  </div>
)

// ── Cable Category Selector ───────────────────────────────────────────────────
const USE_CASES = [
  {
    id: 'desktop',
    label: 'Office Desktop',
    desc: 'Single workstation, GbE, PoE for VoIP phone',
    rec: 'Cat6',
    why: 'Cat6 supports 1 Gbps up to 100m with better crosstalk rejection than Cat5e. PoE (30W) runs cleanly on all 4 pairs. Cat6a would be overkill — the extra shielding and cost are only justified for 10GbE needs.',
    alt: 'Cat5e (works, but no headroom for 2.5G/5G multi-gig that many switches now offer)',
    speed: '1–2.5 Gbps',
    maxDist: '100m',
    poe: 'PoE / PoE+ compatible',
    avoid: 'Cat5 (100 Mbps only, no PoE on all pairs in some implementations)',
    color: '#3b82f6',
  },
  {
    id: 'ipcam',
    label: 'IP Camera (outdoor)',
    desc: 'Outdoor PoE camera, ~50m run, 4K video',
    rec: 'Cat6 (shielded / STP)',
    why: 'Outdoor cables need UV-resistant jacket and often shielding (STP or S/FTP) to reject induced noise from power lines and lightning. Direct-burial Cat6 is rated for underground runs. 4K cameras need ~15–25 Mbps — 1 Gbps is headroom enough. PoE+ (25.5W) is usually needed for PTZ heaters.',
    alt: 'Cat5e UV/outdoor (works for 1080p cameras, tight power budget)',
    speed: '1 Gbps',
    maxDist: '100m',
    poe: 'PoE+ (802.3at) recommended for PTZ/heated domes',
    avoid: 'CCA (Copper Clad Aluminum) cable — fails PoE, breaks at connectors, not rated for outdoor burial',
    color: '#f59e0b',
  },
  {
    id: 'server10g',
    label: 'Server 10GbE (in-rack)',
    desc: 'Server to TOR switch, <10m, high density',
    rec: 'Cat6a (or DAC)',
    why: 'Cat6a supports 10 Gbps at 100m. For very short in-rack runs (<7m), a Direct-Attach Copper (DAC) twinax cable with SFP+ transceivers is cheaper and uses less power than separate copper + optics. For 1–10m: DAC. For 10–100m: Cat6a with RJ-45 10GBase-T.',
    alt: 'DAC (Direct Attach Copper): SFP+ twinax, no separate transceivers needed, ~$20 vs $200 for fiber optics',
    speed: '10 Gbps',
    maxDist: '100m (Cat6a) / 7m (DAC)',
    poe: 'Not applicable for servers',
    avoid: 'Cat6 for 10GbE runs >55m (derates to 55m at 10G unless Cat6a)',
    color: N,
  },
  {
    id: 'mdf',
    label: 'Cross-Building Link (200m)',
    desc: 'Main distribution frame to IDF, campus LAN',
    rec: 'OM4 multimode fiber',
    why: 'Copper has a 100m limit. For 200m, fiber is the only option. OM4 supports 40/100 Gbps at 150m and 10 Gbps at 550m with LC/SFP+ transceivers. It is backward-compatible with OM3 equipment. Single-mode (OS2) would work but is significantly more expensive for <1 km distances.',
    alt: 'OS2 single-mode if future-proofing for 100G+ at 1+ km runs',
    speed: '10–100 Gbps',
    maxDist: '550m (10G), 150m (40G/100G)',
    poe: 'N/A — fiber carries no power',
    avoid: 'OM1/OM2 (62.5µm core, orange jacket — legacy, does not support 10G+ reliably)',
    color: '#8b5cf6',
  },
  {
    id: 'wan',
    label: 'WAN / Long-Haul (40 km)',
    desc: 'Building to building across city, ISP handoff',
    rec: 'OS2 single-mode fiber',
    why: 'OS2 (9µm core) supports 10G at 40km with DWDM transceivers reaching 80–120km. Light travels in a single propagation mode, eliminating modal dispersion entirely. Chromatic dispersion at 40km is manageable with standard SFP+ ZR/ZR+ transceivers. Typical ISP handoff is OS2 with LC connectors.',
    alt: 'DWDM over OS2 can multiplex 80+ channels (wavelengths) on a single fiber pair — used by carriers for multi-Tbps capacity',
    speed: '10G–400G+',
    maxDist: '40km (standard), 80–120km (boosted/EDFA amplified)',
    poe: 'N/A',
    avoid: 'Multimode fiber for distances over 2km — it cannot maintain signal integrity at long distances',
    color: '#ec4899',
  },
  {
    id: 'datacenter100g',
    label: 'Data Center 100GbE',
    desc: 'Spine-to-leaf, 5–30m in same row',
    rec: 'QSFP28 DAC or OM4 AOC',
    why: 'For <5m: QSFP28 passive DAC (twinax copper, ~$30). For 5–30m: OM4 Active Optical Cable (AOC) or OM4 MPO/MTP fiber with QSFP28 SR4 transceivers. MPO-12 pre-terminated trunk cables allow 100G (4×25G lanes) or 40G (4×10G lanes) breakout. Data centers avoid copper above 7m due to weight, bend radius, and signal integrity.',
    alt: 'For >30m: OS2 with QSFP28 LR4 transceivers (4×25G CWDM4, reaches 2km)',
    speed: '100 Gbps',
    maxDist: 'DAC: 5m, AOC: 30m, OM4: 100m, OS2: 2km',
    poe: 'N/A',
    avoid: 'Cat6a for 100GbE — there is no 100GBase-T-over-UTP standard at this price/power point',
    color: '#06b6d4',
  },
]

function CableSelector() {
  const [selected, setSelected] = useState(0)
  const uc = USE_CASES[selected]

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', margin: '28px 0' }}>
      <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', background: `${N}06` }}>
        <p style={{ fontSize: 11, color: N, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '.1em', margin: '0 0 4px' }}>// INTERACTIVE — CABLE SELECTOR</p>
        <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>Select a deployment scenario to see the recommended cable type with technical justification.</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '16px 22px', borderBottom: '1px solid var(--border)' }}>
        {USE_CASES.map((u, i) => (
          <button
            key={u.id}
            onClick={() => setSelected(i)}
            style={{
              padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: '1px solid',
              borderColor: selected === i ? u.color : 'var(--border)',
              background: selected === i ? `${u.color}15` : 'transparent',
              color: selected === i ? u.color : 'var(--muted)',
              transition: 'all .15s',
            }}
          >
            {u.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{ background: `${uc.color}20`, border: `2px solid ${uc.color}`, borderRadius: 10, padding: '8px 20px', fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 900, color: uc.color }}>
            {uc.rec}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{uc.label}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{uc.desc}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, marginBottom: 18 }}>
          {[
            { label: 'Max Speed', value: uc.speed },
            { label: 'Max Distance', value: uc.maxDist },
            { label: 'PoE', value: uc.poe },
          ].map(item => (
            <div key={item.label} style={{ background: 'var(--background)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 6px' }}>Why this choice</p>
          <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>{uc.why}</p>
        </div>

        <div style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 6px' }}>Alternative</p>
          <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>{uc.alt}</p>
        </div>

        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 6px' }}>Avoid</p>
          <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>{uc.avoid}</p>
        </div>
      </div>
    </div>
  )
}

// ── Fiber Loss Budget Calculator ──────────────────────────────────────────────
const FIBER_TYPES = [
  { id: 'om3', label: 'OM3 (50µm, aqua)', attenPerKm: 3.5, connLoss: 0.75, spliceLoss: 0.3, maxDist10G: 300, maxDist40G: 100, maxDist100G: 100 },
  { id: 'om4', label: 'OM4 (50µm, magenta)', attenPerKm: 3.0, connLoss: 0.5, spliceLoss: 0.3, maxDist10G: 550, maxDist40G: 150, maxDist100G: 150 },
  { id: 'om5', label: 'OM5 (50µm, lime)', attenPerKm: 3.0, connLoss: 0.5, spliceLoss: 0.3, maxDist10G: 550, maxDist40G: 440, maxDist100G: 440 },
  { id: 'os2', label: 'OS2 (9µm, yellow)', attenPerKm: 0.4, connLoss: 0.3, spliceLoss: 0.1, maxDist10G: 10000, maxDist40G: 10000, maxDist100G: 2000 },
]

const TRANSCEIVER_BUDGETS: Record<string, Record<string, number>> = {
  '10G': { om3: 3.0, om4: 3.5, om5: 3.5, os2: 11.0 },
  '40G': { om3: 7.6, om4: 7.6, om5: 7.6, os2: 11.0 },
  '100G': { om3: 7.6, om4: 7.6, om5: 7.6, os2: 11.0 },
}

function FiberBudgetCalc() {
  const [fiberType, setFiberType] = useState('om4')
  const [distanceM, setDistanceM] = useState(200)
  const [connectors, setConnectors] = useState(4)
  const [splices, setSplices] = useState(0)
  const [speed, setSpeed] = useState('10G')

  const ft = FIBER_TYPES.find(f => f.id === fiberType)!
  const budget = TRANSCEIVER_BUDGETS[speed][fiberType]

  const cableLoss = (distanceM / 1000) * ft.attenPerKm
  const connLoss = connectors * ft.connLoss
  const spliceLoss = splices * ft.spliceLoss
  const totalLoss = cableLoss + connLoss + spliceLoss
  const margin = budget - totalLoss
  const passing = margin > 0

  const barPct = Math.min(100, (totalLoss / budget) * 100)
  const barColor = barPct > 90 ? '#ef4444' : barPct > 70 ? '#f59e0b' : N

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', margin: '28px 0' }}>
      <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', background: `${N}06` }}>
        <p style={{ fontSize: 11, color: N, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '.1em', margin: '0 0 4px' }}>// INTERACTIVE — FIBER LOSS BUDGET CALCULATOR</p>
        <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>Calculate insertion loss for a fiber link and check if it fits within the transceiver&apos;s optical budget.</p>
      </div>

      <div style={{ padding: '20px 22px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, borderBottom: '1px solid var(--border)' }}>
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', display: 'block', marginBottom: 6 }}>Fiber Type</label>
          <select value={fiberType} onChange={e => setFiberType(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text)', fontSize: 13 }}>
            {FIBER_TYPES.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
          </select>
        </div>

        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', display: 'block', marginBottom: 6 }}>Speed</label>
          <select value={speed} onChange={e => setSpeed(e.target.value)} style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text)', fontSize: 13 }}>
            {['10G', '40G', '100G'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', display: 'block', marginBottom: 6 }}>Distance: {distanceM}m</label>
          <input type="range" min="1" max={fiberType === 'os2' ? 10000 : 1000} value={distanceM} onChange={e => setDistanceM(Number(e.target.value))} style={{ width: '100%', accentColor: N }} />
        </div>

        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', display: 'block', marginBottom: 6 }}>Connectors: {connectors}</label>
          <input type="range" min="2" max="12" value={connectors} onChange={e => setConnectors(Number(e.target.value))} style={{ width: '100%', accentColor: N }} />
        </div>

        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', display: 'block', marginBottom: 6 }}>Splices: {splices}</label>
          <input type="range" min="0" max="10" value={splices} onChange={e => setSplices(Number(e.target.value))} style={{ width: '100%', accentColor: N }} />
        </div>
      </div>

      <div style={{ padding: '20px 22px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'Cable Loss', value: `${cableLoss.toFixed(2)} dB`, sub: `${(distanceM/1000).toFixed(3)}km × ${ft.attenPerKm} dB/km` },
            { label: 'Connector Loss', value: `${connLoss.toFixed(2)} dB`, sub: `${connectors} × ${ft.connLoss} dB each` },
            { label: 'Splice Loss', value: `${spliceLoss.toFixed(2)} dB`, sub: `${splices} × ${ft.spliceLoss} dB each` },
            { label: 'Total Loss', value: `${totalLoss.toFixed(2)} dB`, sub: 'insertion loss', bold: true },
            { label: 'Budget', value: `${budget.toFixed(1)} dB`, sub: `${speed} transceiver` },
            { label: 'Margin', value: `${margin.toFixed(2)} dB`, sub: margin > 0 ? 'PASS' : 'FAIL', color: passing ? N : '#ef4444', bold: true },
          ].map(item => (
            <div key={item.label} style={{ background: 'var(--background)', border: `1px solid ${item.bold ? (passing && item.label === 'Margin' ? N : item.label === 'Margin' ? '#ef4444' : 'var(--border)') : 'var(--border)'}`, borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: item.color || 'var(--text)', fontFamily: 'var(--font-mono)' }}>{item.value}</div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>
            <span>0 dB</span>
            <span style={{ color: barColor, fontWeight: 700 }}>{totalLoss.toFixed(2)} dB / {budget} dB budget</span>
          </div>
          <div style={{ height: 12, background: 'var(--border)', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${barPct}%`, background: barColor, borderRadius: 6, transition: 'all .3s' }} />
          </div>
        </div>

        <div style={{ padding: '12px 16px', borderRadius: 8, background: passing ? `${N}10` : '#ef444410', border: `1px solid ${passing ? N : '#ef4444'}30`, fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>
          {passing
            ? `✓ Link passes with ${margin.toFixed(2)} dB margin. TIA-568 recommends a minimum 3 dB margin for headroom against aging, connector contamination, and future splices.${margin < 3 ? ' Warning: margin is below 3 dB — consider cleaning connectors or upgrading fiber type.' : ''}`
            : `✗ Link fails by ${Math.abs(margin).toFixed(2)} dB. Options: (1) shorten the run, (2) reduce connector count with pre-terminated trunk cables, (3) upgrade to a lower-loss fiber type, (4) use a higher-budget transceiver (e.g., SFP+ LR instead of SR).`
          }
        </div>
      </div>
    </div>
  )
}

// ── PoE Power Budget Table ────────────────────────────────────────────────────
const POE_STANDARDS = [
  { std: '802.3af', name: 'PoE', pse: 15.4, pd: 12.95, pairs: '2 pairs', released: 2003, use: 'VoIP phones, basic cameras' },
  { std: '802.3at', name: 'PoE+', pse: 30, pd: 25.5, pairs: '2 pairs', released: 2009, use: 'PTZ cameras, dual-radio APs' },
  { std: '802.3bt Type 3', name: 'PoE++', pse: 60, pd: 51, pairs: '4 pairs', released: 2018, use: 'Tri-band APs, MACsec switches' },
  { std: '802.3bt Type 4', name: 'UPoE+', pse: 100, pd: 71.3, pairs: '4 pairs', released: 2018, use: 'Thin clients, PTZ+heater, LED lighting' },
]

export default function CablesAndConnectors() {
  return (
    <LearnLayout
      title="Cables and Connectors"
      description="Twisted pair, fiber optic, SFP transceivers, PoE, and how physical layer choices determine the speed limit of every network."
      section="Networking Fundamentals"
      readTime="26 min"
      updatedAt="May 2026"
    >

      {/* ── PART 1 ── */}
      <Part n="01" title="The Physical Layer Is the Foundation of Everything" />

      <P>
        Every network conversation you have ever had — every email, video call, API request, DNS query, and database transaction — ultimately became photons in a glass fiber or electrons in a copper wire. The physical layer is Layer 1 of the OSI model, and its constraints are absolute: no software optimization, no protocol trick, and no architectural pattern can overcome a bad cable. A 40 Gbps switch connected to a Cat5e cable running 80 meters is a 40 Gbps switch performing at under 1 Gbps. Understanding cables is not optional; it is the prerequisite for understanding why every other layer behaves the way it does.
      </P>
      <P>
        The physical layer handles one job: transmitting raw bits across a medium. It defines the electrical voltages, light wavelengths, timing, and connector shapes that two devices must agree on before a single useful bit can flow. A network engineer who cannot identify a fiber type from its jacket color, explain why Cat6a supports 10 GbE while Cat6 does not, or calculate a fiber loss budget is missing a core diagnostic skill. At Amazon scale, misidentifying a cable type during a data center buildout can cause months of capacity headaches.
      </P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, margin: '24px 0 32px' }}>
        {[
          { label: 'Twisted pair', value: 'Cat5e–Cat8', desc: 'Office, data center copper' },
          { label: 'Fiber optic', value: 'OM1–OM5, OS1–OS2', desc: 'Long distance, high speed' },
          { label: 'Direct Attach', value: 'DAC / AOC', desc: 'Short-range high speed' },
          { label: 'Coaxial', value: 'RG-6, RG-58', desc: 'Cable TV, legacy LAN' },
        ].map(item => (
          <div key={item.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>{item.label}</div>
            <div style={{ fontSize: 15, fontWeight: 900, color: N, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{item.value}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 2 ── */}
      <Part n="02" title="Twisted Pair Copper: The Workhorse of the LAN" />

      <P>
        <Hl>Twisted pair</Hl> is the dominant medium for LANs worldwide. Each cable contains four pairs of copper wires, individually twisted together. The twist is not aesthetic — it is the entire mechanism by which the cable works. When two conductors carry opposite voltages (differential signaling), the electromagnetic interference they pick up from nearby sources affects both wires nearly equally. By twisting them, any residual differential interference cancels itself out when the receiver subtracts one wire from the other. More twists per inch means less crosstalk but a stiffer, thicker cable.
      </P>

      <H>The Category Hierarchy</H>

      <div style={{ overflowX: 'auto', margin: '12px 0 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 700 }}>
          <thead>
            <tr style={{ background: `${N}12` }}>
              {['Category', 'Max Speed', 'Max Distance', 'Bandwidth', 'Shielding', 'Common Use', 'Release'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Cat5', '100 Mbps', '100m', '100 MHz', 'UTP only', 'Legacy, being replaced', '1995'],
              ['Cat5e', '1 Gbps', '100m', '100 MHz', 'UTP / FTP', 'Office LAN, home, PoE', '1999'],
              ['Cat6', '1 Gbps / 10G*', '100m / 55m*', '250 MHz', 'UTP / STP', 'Desktop, VoIP, cameras', '2002'],
              ['Cat6a', '10 Gbps', '100m', '500 MHz', 'UTP or S/FTP', 'Servers, 10G to desktop', '2008'],
              ['Cat7', '10 Gbps', '100m', '600 MHz', 'S/FTP required', 'Industrial, rarely deployed', '2010'],
              ['Cat8', '25–40 Gbps', '30m', '2000 MHz', 'S/FTP required', 'Server rack (<30m runs)', '2017'],
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
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '-16px 0 24px', fontStyle: 'italic' }}>* Cat6 supports 10 Gbps only up to 55m in low-interference environments. Cat6a extends this to the full 100m.</p>

      <H>UTP vs STP vs S/FTP</H>
      <P>
        <Hl>UTP (Unshielded Twisted Pair)</Hl> relies entirely on differential signaling for noise rejection. It is cheaper, lighter, and easier to terminate. It works well in typical office environments with low electromagnetic interference. <Hl>STP (Shielded Twisted Pair)</Hl> adds a foil or braid shield around the entire cable bundle, protecting against external interference but requiring the shield to be grounded — a shield that is not grounded becomes an antenna that amplifies interference rather than rejecting it. <Hl>S/FTP (Screened/Foiled Twisted Pair)</Hl> adds both an overall shield and individual foil shields around each pair, used in Cat6a and Cat7/8 for extremely high frequencies or noisy industrial environments.
      </P>

      <Err title="Assuming Cat7 is better than Cat6a for most deployments">
        Cat7 uses a proprietary GG45 or TERA connector rather than RJ-45. No mainstream switch, server, or NIC uses GG45. In practice, Cat7 with RJ-45 connectors is electrically equivalent to Cat6a because the RJ-45 connector is the bandwidth bottleneck. Cat6a delivers identical 10GbE performance with standard RJ-45 connectors and is the actual standard for enterprise 10GbE copper. Use Cat6a, not Cat7, for new deployments.
      </Err>

      <H>T568A vs T568B Wiring Standards</H>
      <P>
        Twisted pair cables must be terminated in a specific pinout order. Two standards exist: <Hl>T568A</Hl> and <Hl>T568B</Hl>. Both work identically for performance — the only difference is which color pair goes on pins 1/2 vs 3/6. What matters is consistency: if one end of a cable is T568A, the other end must also be T568A (for a straight-through patch cable). A <Hl>crossover cable</Hl> uses T568A on one end and T568B on the other — it was used to connect two switches or two PCs directly before Auto-MDI/X eliminated the need (modern switches auto-detect and compensate). T568B is the dominant standard in North America.
      </P>

      <div style={{ overflowX: 'auto', margin: '12px 0 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 500 }}>
          <thead>
            <tr style={{ background: `${N}12` }}>
              {['Pin', 'T568A color', 'T568B color', 'Pair', 'Function (10/100 Mbps)'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['1', 'White/Green', 'White/Orange', 'Pair 3', 'TX+'],
              ['2', 'Green', 'Orange', 'Pair 3', 'TX−'],
              ['3', 'White/Orange', 'White/Green', 'Pair 2', 'RX+'],
              ['4', 'Blue', 'Blue', 'Pair 1', 'Unused (PoE spare)'],
              ['5', 'White/Blue', 'White/Blue', 'Pair 1', 'Unused (PoE spare)'],
              ['6', 'Orange', 'Green', 'Pair 2', 'RX−'],
              ['7', 'White/Brown', 'White/Brown', 'Pair 4', 'Unused (PoE spare)'],
              ['8', 'Brown', 'Brown', 'Pair 4', 'Unused (PoE spare)'],
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
        Gigabit Ethernet (1000Base-T) uses all 4 pairs bidirectionally — all 8 wires carry both TX and RX simultaneously using digital cancellation. This is why Cat5e and above support PoE on all pairs: there are no spare pairs in GbE, and PoE injects current on the data-carrying pairs safely using center-tapped transformers.
      </ProTip>

      <HR />

      {/* ── PART 3 ── */}
      <Part n="03" title="Fiber Optic Cables: Light as the Medium" />

      <P>
        <Hl>Fiber optic cables</Hl> transmit data as pulses of light through a glass or plastic core. The physics are fundamentally different from copper: instead of voltage differences between conductors, fiber uses total internal reflection — light bounces off the interface between the high-refractive-index core and low-refractive-index cladding, staying trapped inside the core over kilometers without significant loss. Copper signals degrade rapidly over distance due to resistance and capacitance; fiber signals degrade only through scattering, absorption, and connector/splice losses — orders of magnitude more slowly.
      </P>
      <P>
        A fiber cable&apos;s cross-section: innermost is the <Hl>core</Hl> (the light-guiding glass, 9µm or 50–62.5µm in diameter), surrounded by the <Hl>cladding</Hl> (glass with lower refractive index, always 125µm outer diameter regardless of core size), then a <Hl>coating</Hl> (UV-cured acrylate polymer for mechanical protection), and finally the <Hl>jacket</Hl> (color-coded outer sheath). The 125µm cladding diameter is standardized globally — every LC, SC, and ST connector fits every fiber regardless of core size.
      </P>

      <H>Multimode vs Single-Mode: The Core Difference</H>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '16px 0 28px' }}>
        {[
          {
            name: 'Multimode (MMF)',
            core: '50µm or 62.5µm',
            source: 'LED or VCSEL (cheap)',
            dist: 'Up to 550m (OM4)',
            bandwidth: 'Up to 28,000 MHz·km (OM5)',
            color: 'Orange (OM1/OM2), Aqua (OM3), Magenta (OM4), Lime (OM5)',
            why: 'Wider core allows multiple light modes (angles) to propagate simultaneously. Cheap lasers, cheap transceivers (~$20–$50). Modal dispersion limits distance — different modes arrive at slightly different times, smearing the signal.',
            use: 'Data center, campus (< 550m)',
            bg: '#f59e0b',
          },
          {
            name: 'Single-Mode (SMF)',
            core: '9µm',
            source: 'Laser (expensive)',
            dist: 'Up to 80–120km',
            bandwidth: 'Practically unlimited',
            color: 'Yellow (OS1/OS2)',
            why: 'Tiny core forces all light to travel in one mode (one angle). No modal dispersion. Only chromatic dispersion limits distance, easily compensated. Transceivers cost $50–$1,000+ depending on reach.',
            use: 'Campus backbone, MAN, WAN, ISP',
            bg: '#f59e0b20',
          },
        ].map(item => (
          <div key={item.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--text)', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>{item.name}</div>
            {[
              ['Core diameter', item.core],
              ['Light source', item.source],
              ['Max distance', item.dist],
              ['Jacket colors', item.color],
              ['Primary use', item.use],
            ].map(([label, value]) => (
              <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
                <span style={{ color: 'var(--muted)' }}>{label}</span>
                <span style={{ color: 'var(--text)', fontWeight: 600, textAlign: 'right', maxWidth: '55%' }}>{value}</span>
              </div>
            ))}
            <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7, margin: '12px 0 0' }}>{item.why}</p>
          </div>
        ))}
      </div>

      <H>OM1–OM5: The Multimode Classification System</H>

      <div style={{ overflowX: 'auto', margin: '12px 0 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 700 }}>
          <thead>
            <tr style={{ background: `${N}12` }}>
              {['Type', 'Core', 'Jacket Color', 'Min Bandwidth', '10G reach', '40G reach', '100G reach', 'Era'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['OM1', '62.5µm', 'Orange', '200 MHz·km', '33m', '—', '—', '1980s'],
              ['OM2', '50µm', 'Orange', '500 MHz·km', '82m', '—', '—', '1998'],
              ['OM3', '50µm', 'Aqua', '2000 MHz·km', '300m', '100m', '100m', '2003'],
              ['OM4', '50µm', 'Magenta', '4700 MHz·km', '550m', '150m', '150m', '2009'],
              ['OM5', '50µm', 'Lime green', '28000 MHz·km', '550m', '440m', '440m', '2016'],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '9px 14px', border: '1px solid var(--border)', fontFamily: j <= 1 ? 'var(--font-mono)' : undefined, fontWeight: j === 0 ? 700 : 400, color: j === 0 ? N : 'var(--text)' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>
        <Hl>OM3 and OM4</Hl> are the workhorses of modern data centers. OM5 adds wideband multimode capability supporting Short Wavelength Division Multiplexing (SWDM) — four wavelengths (850nm, 880nm, 910nm, 940nm) multiplexed on a single fiber pair, enabling 40G and 100G over much longer distances. OM1 and OM2 are legacy; replace any orange-jacket fiber in a new deployment. The easiest field identification test: if it&apos;s orange and the core is 62.5µm (visible through a fiber scope), it&apos;s OM1 and needs to be replaced for anything above 100 Mbps at distance.
      </P>

      <Err title="Mixing multimode fiber types in a link">
        Connecting OM3 and OM4 fibers mid-span via a splice or adapter creates a modal mismatch. The wider OM3 bandwidth is the binding constraint, and the interface introduces additional loss. More critically, mixing 50µm and 62.5µm (OM1) fibers creates a dramatic insertion loss — up to 3 dB at a 50µm→62.5µm interface — because the smaller core couples poorly into the larger. Always verify that every segment in a fiber link is the same grade.
      </Err>

      <HR />

      {/* ── PART 4 ── */}
      <Part n="04" title="Connectors: The Weakest Point in Any Fiber Link" />

      <P>
        Every connector in a fiber link introduces <Hl>insertion loss</Hl> — typically 0.3–0.75 dB per mated pair — and potential <Hl>return loss</Hl> (back-reflection, which degrades laser performance). A dirty connector is the leading cause of fiber link failures. A single fingerprint on a fiber endface can scatter enough light to push a link over its loss budget. The IEC 61300-3-35 standard defines pass/fail criteria for connector contamination, and most enterprise fiber certifiers check this automatically.
      </P>

      <H>Connector Types</H>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, margin: '16px 0 28px' }}>
        {[
          {
            name: 'LC (Lucent Connector)',
            color: '#3b82f6',
            ferrule: '1.25mm',
            lock: 'Push-pull latch (SFP/SFP+/SFP28)',
            use: 'Dominant in data centers and enterprise. SFP+ transceivers use LC duplex (two fibers). Smallest common fiber connector.',
            variants: 'LC/UPC (blue), LC/APC (green angled end-face)',
          },
          {
            name: 'SC (Subscriber Connector)',
            color: '#8b5cf6',
            ferrule: '2.5mm',
            lock: 'Push-pull (square body)',
            use: 'Common in ISP/telco infrastructure and GPON ONT connections. Larger than LC, easier to handle with gloves. Still widely used in access networks.',
            variants: 'SC/UPC, SC/APC (green, 8° angle for GPON)',
          },
          {
            name: 'ST (Straight Tip)',
            color: '#f59e0b',
            ferrule: '2.5mm',
            lock: 'Bayonet twist-lock',
            use: 'Legacy enterprise multimode. Was dominant in 1990s–early 2000s. Still found in older buildings and some government installations. Rarely installed new.',
            variants: 'ST/UPC only (multimode)',
          },
          {
            name: 'MPO/MTP (Multi-fiber Push-On)',
            color: N,
            ferrule: '12 or 24 fibers',
            lock: 'Push-pull with alignment pins',
            use: 'Data center parallel optics: 40GbE (4×10G SR4) and 100GbE (4×25G SR4) use 8-fiber MPO connectors. Also used in pre-terminated trunk cables for high-density cabling.',
            variants: 'MPO-12, MPO-24, MPO+ (MTP is a brand name for MPO)',
          },
          {
            name: 'SFP / SFP+ / SFP28',
            color: '#06b6d4',
            ferrule: 'Uses LC duplex fiber',
            lock: 'Cage hot-plug module',
            use: 'Small Form-Factor Pluggable (SFP) is actually a transceiver module, not just a connector. SFP=1G, SFP+=10G, SFP28=25G. The optical interface uses LC connectors. DAC transceivers replace fiber with twinax copper up to ~7m.',
            variants: 'BiDi SFP+ (single fiber, two wavelengths)',
          },
          {
            name: 'QSFP / QSFP+ / QSFP28',
            color: '#ec4899',
            ferrule: 'MPO-12 or MPO-24 fiber',
            lock: 'Cage hot-plug module',
            use: 'Quad SFP: four lanes in one module. QSFP+=40G (4×10G), QSFP28=100G (4×25G), QSFP-DD=400G (8×50G). MPO-12 connector with 8 fibers active (4 TX, 4 RX) for SR4 variants.',
            variants: 'QSFP28 LR4 uses LC duplex with 4 CWDM wavelengths on one fiber pair',
          },
        ].map(item => (
          <div key={item.name} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 900, color: item.color, marginBottom: 10, fontFamily: 'var(--font-mono)' }}>{item.name}</div>
            {[
              ['Ferrule', item.ferrule],
              ['Locking', item.lock],
              ['Variants', item.variants],
            ].map(([label, value]) => (
              <div key={label as string} style={{ display: 'flex', gap: 8, padding: '4px 0', fontSize: 12 }}>
                <span style={{ color: 'var(--muted)', minWidth: 60 }}>{label}:</span>
                <span style={{ color: 'var(--text)' }}>{value}</span>
              </div>
            ))}
            <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7, margin: '10px 0 0', borderTop: '1px solid var(--border)', paddingTop: 8 }}>{item.use}</p>
          </div>
        ))}
      </div>

      <H>UPC vs APC End-Face Polish</H>
      <P>
        Fiber connectors come in two polishing grades. <Hl>UPC (Ultra Physical Contact)</Hl> connectors have a flat or slightly convex end-face — light reflects straight back into the fiber, causing back-reflection of around −50 dB. This is fine for most data communications. <Hl>APC (Angled Physical Contact)</Hl> connectors have an 8° angled end-face — reflected light bounces away from the core rather than back into the source, achieving −65 dB or better return loss. APC is required for high-sensitivity applications like GPON (fiber to the home), analog CATV over fiber, and coherent optical transmission. APC connectors are always green. Never mate a UPC connector to an APC connector — the angle mismatch causes catastrophic insertion loss (3+ dB) and physical damage to both connectors.
      </P>

      <ProTip>
        For SFP+ multirate transceivers, the TX and RX fiber runs must be on separate fibers within a duplex cable. TX from switch A goes to RX on switch B, and vice versa. If you swap the fibers accidentally (a TX-TX or RX-RX connection), the link light will not come up — this is called a crossed fiber and is one of the most common installation mistakes. Most MPO trunk cables are polarity-configured at the factory; verify the polarity type (A, B, or C) matches your intended breakout scheme.
      </ProTip>

      <HR />

      {/* ── PART 5 ── */}
      <Part n="05" title="Interactive: Cable Selector by Deployment Scenario" />

      <CableSelector />

      <HR />

      {/* ── PART 6 ── */}
      <Part n="06" title="Interactive: Fiber Optical Loss Budget Calculator" />

      <P>
        A fiber link&apos;s total insertion loss must be less than the transceiver&apos;s optical power budget — the difference between the transmitter output power and the receiver sensitivity. The total loss is the sum of cable attenuation (dB/km × distance), connector pair losses, and splice losses. Designing a link without calculating the loss budget is guesswork; in practice, a link that barely passes on paper will fail after connector contamination or temperature variation adds 0.5 dB of margin.
      </P>

      <FiberBudgetCalc />

      <HR />

      {/* ── PART 7 ── */}
      <Part n="07" title="Power over Ethernet (PoE)" />

      <P>
        <Hl>Power over Ethernet</Hl> delivers DC power over the same copper pairs used for data, eliminating a separate power cable and outlet for devices like IP phones, access points, security cameras, and smart building sensors. PoE operates by injecting a center-tapped DC voltage across the data pairs — the data signals ride as a differential signal on top of the DC voltage, and the device separates them using a transformer. The PSE (Power Sourcing Equipment, typically the switch) detects a valid PD (Powered Device) using a signature resistance before applying full power, preventing damage to non-PoE devices.
      </P>

      <div style={{ overflowX: 'auto', margin: '12px 0 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 600 }}>
          <thead>
            <tr style={{ background: `${N}12` }}>
              {['Standard', 'Name', 'PSE Power', 'PD Power', 'Pairs Used', 'Release', 'Common Devices'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {POE_STANDARDS.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)' }}>
                <td style={{ padding: '9px 14px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontWeight: 700, color: N }}>{row.std}</td>
                <td style={{ padding: '9px 14px', border: '1px solid var(--border)', color: 'var(--text)' }}>{row.name}</td>
                <td style={{ padding: '9px 14px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', color: 'var(--text)', fontWeight: 700 }}>{row.pse}W</td>
                <td style={{ padding: '9px 14px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>{row.pd}W</td>
                <td style={{ padding: '9px 14px', border: '1px solid var(--border)', color: 'var(--muted)' }}>{row.pairs}</td>
                <td style={{ padding: '9px 14px', border: '1px solid var(--border)', color: 'var(--muted)' }}>{row.released}</td>
                <td style={{ padding: '9px 14px', border: '1px solid var(--border)', color: 'var(--muted)' }}>{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>
        The gap between PSE power (what the switch delivers) and PD power (what the device receives) is cable resistance loss — at 60W on 4 pairs over a 100m Cat6 run, this loss can be several watts. That&apos;s why a 60W PSE port cannot guarantee 60W at the device. IEEE 802.3bt Type 3 and Type 4 use Class Negotiation (LLDP) so the switch knows exactly how much power each device needs and can manage the total switch power budget precisely.
      </P>

      <Err title="Underestimating PoE switch power budgets">
        A 48-port PoE+ switch does not necessarily provide 30W per port simultaneously. Most have a total chassis power budget of 370–740W shared across all ports. A switch advertised as &quot;24-port PoE+&quot; with 370W budget can deliver 30W to only ~12 ports simultaneously. Always verify the switch&apos;s total PoE power budget against your expected load (number of APs × typical power draw) before purchasing. Aruba, Cisco, and Juniper all publish per-chassis PoE budgets in their datasheets.
      </Err>

      <ProTip>
        Cat5e and Cat6 cables rated for PoE must meet TIA-568.2-D requirements for balanced cables — specifically that all 4 pairs meet DC resistance unbalance limits. Cheap, non-compliant cables can develop hot spots under PoE current load, especially in bundled cable runs where heat cannot dissipate. Use cables marked &quot;PoE rated&quot; or verified to TIA-568.2-D for any PoE deployment. CCA (copper-clad aluminum) cables fail this requirement and can cause fires under sustained PoE loads.
      </ProTip>

      <HR />

      {/* ── PART 8 ── */}
      <Part n="08" title="Cable Testing and Certification" />

      <P>
        A cable that looks installed correctly may still fail certification testing. Four critical tests determine whether a copper link meets its category specification: <Hl>NEXT (Near-End Crosstalk)</Hl> measures interference between pairs at the transmitting end — excessive NEXT causes received signal corruption; <Hl>FEXT (Far-End Crosstalk)</Hl> measures the same at the receiving end; <Hl>Return Loss</Hl> measures signal reflected back toward the transmitter due to impedance mismatches (bad terminations, sharp bends, or connector damage); and <Hl>Insertion Loss</Hl> (attenuation) measures the signal level reduction from one end to the other.
      </P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, margin: '16px 0 24px' }}>
        {[
          { test: 'Wire Map', pass: 'All 8 pins connected, correct order, no shorts/opens', tool: 'Cable tester ($50–$200)' },
          { test: 'Length', pass: 'Electrical length ≤ 100m (TDR measurement)', tool: 'Cable certifier' },
          { test: 'NEXT (worst pair)', pass: 'Cat6a: ≥ 40.1 dB @500 MHz', tool: 'Fluke DSX/Versiv ($5k+)' },
          { test: 'Insertion Loss', pass: 'Cat6a: ≤ 24.0 dB @500 MHz', tool: 'Cable certifier' },
          { test: 'Return Loss', pass: 'Cat6a: ≥ 20.1 dB @500 MHz', tool: 'Cable certifier' },
          { test: 'PS-ACRF', pass: 'Power sum alien crosstalk rejection', tool: 'Required for Cat6a field test' },
        ].map(item => (
          <div key={item.test} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', marginBottom: 6 }}>{item.test}</div>
            <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6, marginBottom: 6 }}>{item.pass}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>{item.tool}</div>
          </div>
        ))}
      </div>

      <P>
        For fiber, certification includes <Hl>OLTS (Optical Loss Test Set)</Hl> measuring insertion loss at 850nm and 1300nm (multimode) or 1310nm and 1550nm (single-mode), and OTDR (Optical Time Domain Reflectometer) traces that identify the precise location of every connector, splice, and event along a fiber — essential for troubleshooting a 500m run with 20 connectors. A good OTDR trace shows a clean &quot;staircase&quot; pattern with small steps at each connection point; a large spike indicates a high-loss event or reflection.
      </P>

      <HR />

      {/* ── PART 9 ── */}
      <Part n="09" title="Data Center Cabling Architecture" />

      <P>
        Enterprise and hyperscale data centers use a structured cabling hierarchy to manage thousands of cables without creating unmanageable spaghetti. The three-tier model is: <Hl>Main Distribution Area (MDA)</Hl> where core/backbone switches and routers live, <Hl>Horizontal Distribution Area (HDA)</Hl> per row or zone with aggregation switches, and <Hl>Equipment Distribution Area (EDA)</Hl> at each rack. Pre-terminated trunk cables (MPO-to-MPO or MPO-to-LC) run from MDA to HDA in overhead cable trays; patch cables connect servers to top-of-rack switches. This eliminates field-terminated connectors from the long runs — a factory-terminated MPO-12 trunk cable has measured, certified insertion loss, unlike a cable terminated by an inexperienced tech.
      </P>

      <H>Spine-Leaf Cabling Pattern</H>
      <P>
        Modern data centers use a spine-leaf topology where every leaf switch connects to every spine switch with one cable. In a 4-spine, 20-leaf pod, that is 80 inter-switch links. At 100G with QSFP28 MPO-12 fiber, each uplink needs one MPO-12 trunk. Cable management requires careful planning: the longest leaf-to-spine run must not exceed 100m for OM4 or the attenuation budget for OS2. Google, Facebook, and Amazon document their structured cabling in operations wikis because any deviation — wrong fiber type in the cassette, wrong polarity MPO — silently reduces capacity.
      </P>

      <H>Bend Radius and Cable Management</H>
      <P>
        Both copper and fiber have minimum bend radius specifications. Cat6a: minimum bend radius during installation is 4× the cable diameter (~40mm); in free air the permanent installation limit is 1× OD. Exceeding this kinks the pairs and causes permanent return loss failures. Fiber is more sensitive: a single-mode fiber bent to a radius of 30mm causes measurable loss; bending to 15mm can cause 1–2 dB loss on sensitive links. <Hl>Bend-insensitive single-mode fiber</Hl> (G.657.A2 spec) tolerates 7.5mm bend radii — standard in FTTH drop cables. Cable ties tightened too hard on fiber bundles cause permanent micro-bending losses; use velcro wraps on fiber, never zip ties.
      </P>

      <ProTip>
        In a data center, the cheapest reliability improvement is fiber inspection and cleaning. IEC 61300-3-35 defines inspection criteria: Zone A (fiber core, 0–25µm radius) must be completely clean — a single particle in Zone A can exceed the 0.2 dB insertion loss limit for Grade A connectors. Use a 200× fiber scope before every connection, and clean with a one-push fiber cleaner. Fluke Networks data shows contaminated connectors cause ~85% of fiber link failures.
      </ProTip>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Day in the Life — Cloudflare Network Engineer: Intermittent 100G Link Failure" />

      <P>
        <strong>Company:</strong> Cloudflare · <strong>Role:</strong> Data Center Network Engineer · <strong>Location:</strong> EWR1 (Newark, NJ) data center · <strong>Date:</strong> Tuesday, March 11, 2025
      </P>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', margin: '20px 0 28px' }}>
        <p style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', margin: '0 0 12px' }}>INCIDENT: Spine-leaf-03 ↔ leaf-07 100G link flapping, packet loss 0.3–2.1%</p>

        <TimeBlock time="07:15 AM" label="Alert fires — link flapping on spine-leaf-03 port 14">
          An automated alert fires for excessive interface flaps on QSFP28 port 14 of spine switch spine-leaf-03. The interface has gone down and come back up 7 times in the last 2 hours. Each flap corresponds with 0.3–2.1% packet loss on the affected leaf (leaf-07), impacting roughly 1/20th of the data center fabric. The monitoring system shows the SFP optics Rx power hovering near the transceiver&apos;s receiver sensitivity threshold: −10.1 dBm, where the SFP28 SR spec threshold is −10.3 dBm.
        </TimeBlock>

        <TimeBlock time="07:22 AM" label="Initial hypothesis: bad SFP28 transceiver">
          The engineer SSHs to spine-leaf-03 and pulls the QSFP28 diagnostic interface counters. The TX power from the far end (leaf-07) is reading −10.1 dBm — just above the −10.3 dBm receive threshold. Given that OM4 fiber at this distance (42m) should produce no more than 0.5 dB insertion loss, and the SR4 transceiver budget is 7.6 dB, there is about 7 dB of unexplained loss. The engineer checks the vendor optics inventory — the transceiver was installed 14 months ago. Standard hypothesis: degrading QSFP28 TX laser. The engineer requisitions a replacement transceiver from the spares inventory.
        </TimeBlock>

        <TimeBlock time="08:05 AM" label="Transceiver swap — no improvement">
          After a maintenance window, the engineer swaps the QSFP28 transceiver on leaf-07 (the far end, since that is where TX power is low). The replacement transceiver reports identical Rx power at spine-leaf-03: −10.0 dBm. The link is still marginal. This eliminates the transceiver as the root cause. The problem must be in the fiber path itself.
        </TimeBlock>

        <TimeBlock time="08:18 AM" label="Fiber inspection — the actual root cause">
          The engineer retrieves a Fluke FI-7000 FiberInspector from the toolbox and inspects the LC connectors on the suspect fiber run. The very first connector — the LC on the leaf-07 SFP28 cage — shows a large contamination particle in Zone A (directly on the fiber core). Under 200× magnification, it looks like a fingerprint smear, likely from the transceiver swap 73 minutes earlier: someone touched the fiber connector end-face while handling the cable. Under IEC 61300-3-35, a Zone A defect of this size would cause approximately 0.5–1.5 dB additional insertion loss. On a link already at the margin of its budget, 1 dB is enough to cause flapping.
        </TimeBlock>

        <TimeBlock time="08:24 AM" label="Clean connector, verify with OLTS">
          The engineer cleans the contaminated LC connector with a Fujikura CL-30 one-push cleaner (dry cleaning). Re-inspecting with the fiber scope shows a clean end-face — Zone A completely clear. Before reconnecting, they run a quick OLTS measurement: total insertion loss now reads 0.41 dB, consistent with 42m of OM4 (0.08 dB) plus two clean connector pairs (2 × 0.15 dB each). Rx power at spine-leaf-03 immediately reads −2.9 dBm — 7 dB stronger than before. The interface has not flapped since reconnection.
        </TimeBlock>

        <TimeBlock time="08:35 AM" label="Root cause confirmed, postmortem action items">
          Root cause: fiber connector contaminated during transceiver swap. The technician who swapped the SFP touched the LC connector end-face with bare fingers. The postmortem identifies three process gaps: (1) no mandatory fiber inspection checklist for transceiver swaps — added to runbook immediately; (2) no one-push fiber cleaners staged at the rack — procurement order placed for 50 units distributed across racks; (3) the monitoring threshold for SFP Rx power had a 30-minute hysteresis that delayed the alert, allowing 2 hours of marginal operation before firing. The alert threshold is lowered, hysteresis reduced to 5 minutes, and a secondary alert added for Rx power within 2 dB of threshold (early warning, not yet critical). Total customer impact: approximately 0.3% packet loss across 1 leaf switch for 2 hours.
        </TimeBlock>
      </div>

      <Err title="Assuming a new cable is a good cable">
        A new fiber patch cable can arrive from the factory with a dirty or damaged end-face from handling. Never assume an unboxed cable is ready to connect. Always inspect with a fiber scope before mating. This is not paranoia — field studies by Fluke Networks found that ~25% of new patch cables from reputable vendors have connector end-faces that fail IEC Grade B inspection out of the box. At $0.50 for a one-push cleaner vs $50k/hour data center outage cost, this is the highest-ROI habit in fiber networking.
      </Err>

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="Interview Prep — 8 Questions With Complete Answers" />

      <IQ q="What is the difference between Cat6 and Cat6a, and when would you choose one over the other?">
        <p style={{ margin: '0 0 14px' }}>Cat6 is specified for 1 Gbps at 100m and supports 10 Gbps only up to 55m in low-interference environments. Cat6a is specified for 10 Gbps at the full 100m because its 500 MHz bandwidth (vs Cat6&apos;s 250 MHz) and augmented crosstalk rejection (which gives it the &quot;a&quot;) prevent the signal degradation that limits Cat6 at 10G distances. Cat6a cables are thicker, heavier, and typically shielded — they require more careful bend radius management and are 30–50% more expensive.</p>
        <p style={{ margin: '0 0 14px' }}>Choose Cat6 for standard 1 GbE office workstations, PoE cameras, and VoIP phones where 10 GbE is not anticipated. The cost saving is meaningful at scale. Choose Cat6a for server access connections, 10GbE to the desktop, or any run where future bandwidth growth is expected. The cost premium is small relative to the labor cost of recabling later.</p>
        <p style={{ margin: 0 }}>A practical note: for very short in-rack runs (under 7m) where you need 10 GbE or 25 GbE, a DAC (Direct Attach Copper) SFP+ or SFP28 twinax cable is cheaper and lower power than Cat6a + 10GBase-T transceivers. 10GBase-T transceivers consume ~1–4W per port vs ~0.5W for a DAC.</p>
      </IQ>

      <IQ q="Explain the difference between single-mode and multimode fiber. When would you use each?">
        <p style={{ margin: '0 0 14px' }}>Single-mode fiber (SMF) has a 9µm core that allows only one propagation mode of light. With no modal dispersion, it supports 10 Gbps at 10–40km with standard transceivers, and 400 Gbps+ at shorter distances. The narrow core requires a laser light source, making transceivers expensive ($50–$1,000+ per end). OS2 single-mode is the standard for WAN, campus backbone, and ISP interconnections.</p>
        <p style={{ margin: '0 0 14px' }}>Multimode fiber (MMF) has a 50µm core that allows multiple light modes to propagate. Modal dispersion limits distance — OM4 supports 10 Gbps at 550m and 100 Gbps at 150m. The wider core works with VCSELs (cheap, low-power lasers) that cost $20–$50 per transceiver. OM3/OM4 is the standard for data center server-to-switch and switch-to-switch links within a building.</p>
        <p style={{ margin: 0 }}>Decision rule: for distances under 300m and cost sensitivity, choose OM3/OM4. For distances over 500m, between buildings, or for WAN interconnects, choose OS2 single-mode. The fiber itself costs about the same; the decision is entirely driven by transceiver cost and distance requirements.</p>
      </IQ>

      <IQ q="What is insertion loss in fiber optics, and what factors contribute to it?">
        <p style={{ margin: '0 0 14px' }}>Insertion loss is the reduction in optical power (measured in dB) as light traverses a fiber link. It determines whether the receiving transceiver will successfully detect the signal — if total insertion loss exceeds the transceiver&apos;s power budget, the link will not work or will operate with excessive bit errors.</p>
        <p style={{ margin: '0 0 14px' }}>The components of insertion loss are: (1) <strong>Cable attenuation</strong> — OM4 attenuates at ~3.0 dB/km at 850nm, OS2 at ~0.4 dB/km at 1310nm. For a 200m OM4 run: 0.6 dB. (2) <strong>Connector insertion loss</strong> — each mated connector pair introduces 0.3–0.75 dB; clean connections are 0.1–0.2 dB, dirty ones 0.5–3+ dB. (3) <strong>Splice loss</strong> — fusion splices contribute 0.02–0.1 dB; mechanical splices 0.1–0.5 dB. (4) <strong>Bending losses</strong> — macro-bends below minimum bend radius and micro-bends from tight cable ties cause additional scattering.</p>
        <p style={{ margin: 0 }}>TIA-568 recommends a minimum 3 dB margin above the calculated budget to account for aging, environmental factors, and future maintenance. Design to 75% of budget, not 99%.</p>
      </IQ>

      <IQ q="What is PoE and how does it work electrically? What cable category is required?">
        <p style={{ margin: '0 0 14px' }}>Power over Ethernet (802.3af/at/bt) delivers DC power over the same twisted-pair cables used for data. The PSE (typically a switch) injects a center-tapped DC voltage across the cable pairs. At 802.3af (15.4W), power is on the spare pairs (4/5 and 7/8) or the data pairs (1/2 and 3/6) depending on implementation. At 802.3at and 802.3bt, all four pairs are used. Data signals ride on top of the DC voltage as differential signals — the center-tapped transformer in the powered device separates the DC power from the data signal.</p>
        <p style={{ margin: '0 0 14px' }}>Before delivering power, the PSE checks for a 25kΩ resistive signature to verify the connected device is a valid PD. Without this signature (e.g., a standard non-PoE device), no power is delivered. Power is negotiated further using LLDP in 802.3bt.</p>
        <p style={{ margin: 0 }}>Cable requirements: Cat5e minimum for 802.3af/at. For 802.3bt (60W and 100W), the cable must meet TIA-568.2-D DC resistance unbalance limits — this is TIA-968-B compliant cable. CCA (copper-clad aluminum) cable fails these requirements and can generate dangerous heat under sustained PoE load. Always use 100% solid copper conductors for PoE deployments.</p>
      </IQ>

      <IQ q="You are troubleshooting a fiber link that shows intermittent packet loss. Walk through your diagnostic approach.">
        <p style={{ margin: '0 0 14px' }}>Start with the optical power metrics at both ends. SSH to both switches and check the SFP Rx power readings. If Rx is near the receiver sensitivity threshold (typically −10 to −14 dBm for 10G SR), the link has excess insertion loss. If Rx is normal (−2 to −6 dBm for typical 10G SR links), the problem may be at Layer 2 or above (duplex mismatch, FCS errors) rather than optical.</p>
        <p style={{ margin: '0 0 14px' }}>If optical power is low: inspect all fiber connectors with a fiber scope (both ends). Dirty end-faces are the most common cause (~85%). Clean any dirty connectors with a one-push cleaner, re-inspect, reconnect, and re-check Rx power. If power is still low after cleaning, perform an OLTS measurement — inject a known power and measure the output to get total insertion loss. Compare against the expected value (cable attenuation + connector count × per-connector loss). If actual loss exceeds expected by &gt;1 dB, there is a fault: run an OTDR trace to locate the event by distance.</p>
        <p style={{ margin: 0 }}>If Rx power is normal but errors persist: check for FCS errors (a physical layer issue at the switch), duplex mismatch (auto-neg failure), or interface error counters showing CRC errors on one direction only (RX or TX), which points to a bad SFP. Swap SFPs as the last resort after ruling out the fiber path.</p>
      </IQ>

      <IQ q="What is a DAC cable and when would you use it instead of fiber?">
        <p style={{ margin: '0 0 14px' }}>A DAC (Direct Attach Copper) cable is a fixed-length twinax copper cable with SFP+, SFP28, or QSFP28 transceivers permanently attached at each end. The copper conducts the high-speed differential signal directly without optical conversion — no light is involved. Passive DACs have no active electronics; active DACs have signal amplifiers or retimers in the connector housing.</p>
        <p style={{ margin: '0 0 14px' }}>Use DACs for short in-rack or cross-aisle runs: passive DAC SFP+ works up to 7m, active DAC up to 15m, active optical cables (AOC, which look like DAC but use fiber internally) up to 30m. The economic argument is compelling: a 3m 10G SFP+ DAC costs ~$20–$30 vs $200+ for two 10G SR SFP+ transceivers plus fiber. Power consumption is also lower — a passive DAC uses near-zero power vs 1W per transceiver for active optics.</p>
        <p style={{ margin: 0 }}>Limitations: DACs are inflexible — a 3m cable cannot extend a 4m run. They generate more heat than fiber in high-density racks. And because the transceivers are fixed to the cable, you cannot replace a bad transceiver independently. For server-to-TOR connections in hyperscale data centers, DAC is the default choice for anything under 7m.</p>
      </IQ>

      <IQ q="What are the T568A and T568B standards, and does it matter which one you use?">
        <p style={{ margin: '0 0 14px' }}>T568A and T568B are two pinout standards for RJ-45 connectors defined by TIA-568. The only difference is the position of the green and orange wire pairs: T568A places white/green on pin 1, green on pin 2, white/orange on pin 3, orange on pin 6; T568B swaps these — white/orange on pin 1, orange on pin 2, white/green on pin 3, green on pin 6. Both standards produce a functional cable.</p>
        <p style={{ margin: '0 0 14px' }}>Consistency is what matters. A patch cable must have the same standard on both ends. If you use T568A on one end and T568B on the other, you get a crossover cable — TX and RX pairs swap — which was used to connect similar devices (switch-to-switch, PC-to-PC) before Auto-MDI/X. Modern switches automatically sense and compensate for crossover cables, so a mistaken crossover will usually work today but may cause confusion in troubleshooting.</p>
        <p style={{ margin: 0 }}>T568B is the dominant standard in North America and matches the older AT&amp;T 258A standard that most U.S. cable plants were installed to. T568A is common in government and residential ANSI/TIA structured cabling. In a new installation, pick one and document it — the wrong choice is not technical failure, it is documentation failure that creates confusion later.</p>
      </IQ>

      <IQ q="What is alien crosstalk (AXT) and why does it matter for Cat6a?">
        <p style={{ margin: '0 0 14px' }}>Alien crosstalk is electromagnetic interference between adjacent cables — one cable radiating interference into neighboring cables in the same bundle. Unlike NEXT (crosstalk between pairs within the same cable), alien crosstalk is external and cannot be cancelled by the cable&apos;s differential signaling. It becomes the limiting factor for 10GBase-T (10G over Cat6a) because 10G uses all 500 MHz of the cable&apos;s bandwidth and uses complex modulation (PAM-16 with LDPC error correction) that is sensitive to the noise floor.</p>
        <p style={{ margin: '0 0 14px' }}>Cat6a addresses alien crosstalk in two ways: (1) increased cable diameter — Cat6a cables are typically 8–9mm vs Cat6&apos;s 6mm, creating more physical separation between adjacent cables; (2) optional shielding — S/FTP Cat6a adds individual pair foils plus an overall braid shield, essentially blocking alien crosstalk entirely. TIA-568C.2 requires that Cat6a installations pass the PS-ACRF (Power Sum Alien Crosstalk Reduction Factor) test, which requires testing all cables in a bundle against each other simultaneously.</p>
        <p style={{ margin: 0 }}>Practical implication: a single Cat6a cable tested in isolation may pass all electrical specs, but the same cable bundled with 23 others in a cable tray may fail PS-ACRF. This is why Cat6a field testing is more expensive and time-consuming than Cat6 — the certifier must run the bundle test, not just individual cable tests. Dense cable trays and tight cable ties that press cables together worsen alien crosstalk. In high-density installations, S/FTP Cat6a or fiber is the safer choice.</p>
      </IQ>

      <HR />

      {/* ── PART 12 ── */}
      <Part n="12" title="Common Misconceptions" />

      <Err title="Category number = quality, so higher is always better">
        Cat7 is not better than Cat6a for typical deployments. Cat7 requires GG45 or TERA connectors — not RJ-45. Any Cat7 cable terminated in RJ-45 (the only connector your switches support) performs identically to Cat6a at best, and worse in practice because the RJ-45 connector is the bandwidth bottleneck. The &quot;Cat7&quot; label on RJ-45 cables is misleading marketing. For 10GbE copper, Cat6a is the correct, standards-based choice.
      </Err>

      <Err title="Fiber optic cables are inherently fragile">
        Modern fiber cables are extremely durable. Outdoor-rated fiber with aramid (Kevlar) strength members and armored jackets can be direct-buried, run in conduit, or pulled through walls just like copper. The glass fiber itself has a tensile strength of ~700,000 psi — stronger than steel by weight. The fragility misconception comes from early bare fiber experience. Field-terminated fiber in armored cable with quality connectors is routinely pulled, bent, and handled for decades. The real failure mode is end-face contamination, not physical breakage.
      </Err>

      <Err title="You can extend a PoE cable run past 100m with a switch or injector">
        IEEE 802.3 specifies a 100m maximum for twisted pair, regardless of PoE. The 100m limit is not advisory — it is where the copper electrical characteristics (resistance, capacitance) exceed the spec tolerance for the signaling standard. A PoE extender that creates two 100m segments with a midpoint injector works because it creates two separate electrical segments, not because it extends the copper run. If you need PoE past 100m, use fiber to a remote PoE injector (media converter + PoE injector), or a managed PoE switch with fiber uplinks placed closer to the device.
      </Err>

      <Err title="Single-mode fiber needs expensive equipment everywhere">
        The expensive part of a single-mode link is the transceiver, not the fiber itself. OS2 single-mode fiber cable costs approximately the same as OM4 multimode — around $0.20–$0.50/meter for bulk cable. Where OS2 is more expensive is the optical transceivers: a 10G SFP+ SR (multimode, 300m) costs ~$20–$50; a 10G SFP+ LR (single-mode, 10km) costs ~$50–$200. For a 200m link within a campus where OM4 SR transceivers are adequate, there is no economic reason to choose single-mode. But running OS2 fiber for a new campus backbone is cheap infrastructure insurance — the fiber is already there when you need to upgrade to longer-reach transceivers.
      </Err>

      <HR />

      <KeyTakeaways items={[
        'Twisted pair cable categories are defined by bandwidth (MHz) and crosstalk rejection, not just speed — Cat6a\'s 500 MHz bandwidth enables 10 GbE at 100m, where Cat6 derate to 55m.',
        'UTP relies on differential signaling and twist rate; STP/S-FTP adds shielding that must be grounded or it becomes an antenna — a floating shield is worse than no shield.',
        'Fiber optic cables transmit light via total internal reflection; the 125µm cladding diameter is universal regardless of core size (9µm SMF or 50µm MMF).',
        'Single-mode (OS2, yellow, 9µm) is for distances over 500m and WAN; multimode (OM3/OM4, aqua/magenta, 50µm) is for data center and campus links under 550m.',
        'LC connectors are the dominant fiber interface in enterprise (SFP/SFP+ transceivers); MPO/MTP is used for parallel optics (40G/100G with 4 or 8 fiber lanes).',
        'Fiber connector contamination causes ~85% of fiber link failures — inspect every end-face before mating with a fiber scope and clean with a one-push cleaner.',
        'UPC connectors (blue) are for data; APC connectors (green, 8° angle) are for GPON and analog CATV — never mate UPC to APC or you cause catastrophic insertion loss.',
        'PoE power budgets on switches are shared — a 24-port PoE+ switch may only provide 30W simultaneously to 12 ports depending on the total chassis budget; always size switch budgets from datasheets.',
        'DAC (Direct Attach Copper) twinax cables are the cost-optimized choice for 10G/25G/100G server-to-TOR runs under 7m — lower cost, lower power than optical alternatives.',
        'Always calculate fiber loss budget before deploying: cable attenuation + (connector count × per-connector loss) + splice losses < transceiver optical budget, with 3 dB margin for aging.',
      ]} />

    </LearnLayout>
  )
}
