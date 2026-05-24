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

function Para({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
}

function H2({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', margin: '36px 0 14px', letterSpacing: '-0.5px' }}>{children}</h3>
}

function H3({ children }: { children: React.ReactNode }) {
  return <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '28px 0 10px' }}>{children}</h4>
}

function Accent({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: ACC, fontWeight: 700 }}>{children}</strong>
}

function Code({ children }: { children: React.ReactNode }) {
  return <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: '#1e293b', color: '#e2e8f0', padding: '2px 7px', borderRadius: 5 }}>{children}</code>
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, background: '#0d1525', border: '1px solid #1e293b', borderRadius: 10, padding: '18px 20px', overflowX: 'auto', lineHeight: 1.7, color: '#94a3b8', margin: '18px 0 24px' }}>
      {children}
    </pre>
  )
}

function StoryBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#0a1628', border: '1px solid #1e3a5f', borderLeft: '4px solid #3b82f6', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: '#cbd5e1', lineHeight: 1.85 }}>
      {children}
    </div>
  )
}

function WowBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#0a1a12', border: '1px solid #166534', borderLeft: '4px solid #10b981', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: '#bbf7d0', lineHeight: 1.85 }}>
      <span style={{ fontWeight: 800, color: '#10b981', fontSize: 12, letterSpacing: '.1em', display: 'block', marginBottom: 6 }}>WOW FACT</span>
      {children}
    </div>
  )
}

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#1a1400', border: '1px solid #854d0e', borderLeft: '4px solid #f59e0b', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: '#fef08a', lineHeight: 1.85 }}>
      <span style={{ fontWeight: 800, color: '#f59e0b', fontSize: 12, letterSpacing: '.1em', display: 'block', marginBottom: 6 }}>CAUTION</span>
      {children}
    </div>
  )
}

function Err({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#1a0a0a', border: '1px solid #991b1b', borderLeft: '4px solid #ef4444', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: '#fecaca', lineHeight: 1.85 }}>
      <span style={{ fontWeight: 800, color: '#ef4444', fontSize: 12, letterSpacing: '.1em', display: 'block', marginBottom: 6 }}>MISCONCEPTION</span>
      {children}
    </div>
  )
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

// ─── Interactive 1: Cable Selector ───────────────────────────────────────────

const CABLE_TYPES = [
  {
    name: 'Cat5e',
    category: 'copper',
    color: '#94a3b8',
    maxSpeed: '1 Gbps',
    maxDistance: '100m',
    frequency: '100 MHz',
    shielded: false,
    connectors: ['RJ45'],
    cost: 'Very low ($0.15/ft)',
    use: 'Gigabit Ethernet in homes and offices. Supports 10/100/1000BASE-T. Replaced Cat5 as the baseline standard.',
    avoid: 'Do not use for 10GbE — crosstalk at 10G frequencies is too high for Cat5e.',
    standard: 'TIA-568-C.2',
    pinout: 'T568A or T568B (must match both ends)',
  },
  {
    name: 'Cat6',
    category: 'copper',
    color: '#3b82f6',
    maxSpeed: '10 Gbps (55m)',
    maxDistance: '100m (1G) / 55m (10G)',
    frequency: '250 MHz',
    shielded: false,
    connectors: ['RJ45'],
    cost: 'Low ($0.25/ft)',
    use: '10GbE at shorter distances. Higher bandwidth than Cat5e, better crosstalk resistance. Includes a plastic spline separator between pairs.',
    avoid: 'Cat6 supports 10G only up to 55m. Beyond that, use Cat6A.',
    standard: 'TIA-568-C.2',
    pinout: 'T568A or T568B',
  },
  {
    name: 'Cat6A',
    category: 'copper',
    color: '#10b981',
    maxSpeed: '10 Gbps',
    maxDistance: '100m',
    frequency: '500 MHz',
    shielded: true,
    connectors: ['RJ45'],
    cost: 'Medium ($0.60/ft)',
    use: '10GbE at full 100m. Required for data center structured cabling. Augmented Category 6 — thicker, heavier cable.',
    avoid: 'Larger diameter makes it hard to route through conduit designed for Cat5/6. Heavier, less flexible.',
    standard: 'TIA-568-C.2, ISO/IEC 11801',
    pinout: 'T568A or T568B',
  },
  {
    name: 'Cat8',
    category: 'copper',
    color: '#8b5cf6',
    maxSpeed: '25/40 Gbps',
    maxDistance: '30m',
    frequency: '2,000 MHz',
    shielded: true,
    connectors: ['RJ45 (Class I)', 'TERA/GG45 (Class II)'],
    cost: 'High ($1.50+/ft)',
    use: 'Data center Top-of-Rack switch to server connections. Short runs only. 25GBASE-T and 40GBASE-T.',
    avoid: '30m limit makes it useless for runs longer than within a rack row. Almost exclusively for data centers.',
    standard: 'ANSI/TIA-568-C.2-1, ISO/IEC 11801 Ed3',
    pinout: 'T568B (Class I)',
  },
  {
    name: 'Single-Mode Fiber (SMF)',
    category: 'fiber',
    color: '#f97316',
    maxSpeed: '100 Gbps – 400 Gbps+',
    maxDistance: 'Up to 100+ km',
    frequency: 'N/A (optical)',
    shielded: false,
    connectors: ['LC', 'SC', 'MPO/MTP', 'FC', 'ST'],
    cost: 'High fiber, Low cable ($0.20/ft) — transceivers expensive ($200–$2000)',
    use: 'WAN, campus backbone, submarine cables. 8-10 μm core, laser light source (1310nm/1550nm). Long distance.',
    avoid: 'Requires laser transceivers. More fragile than copper. Specialized termination equipment needed.',
    standard: 'ITU-T G.652, G.655, G.657',
    pinout: 'N/A — simplex (one direction per fiber), duplex (pair for TX/RX)',
  },
  {
    name: 'Multi-Mode Fiber (MMF)',
    category: 'fiber',
    color: '#06b6d4',
    maxSpeed: '10–400 Gbps (grade dependent)',
    maxDistance: 'Up to 400m (OM3), 550m (OM4), 2km (OM5)',
    frequency: 'N/A (optical)',
    shielded: false,
    connectors: ['LC', 'SC', 'MPO/MTP'],
    cost: 'Medium — cheaper transceivers ($50–$500) than SMF',
    use: 'Data center inter-switch links, campus building runs. 50 μm core. LED or VCSEL laser (850nm). Cost-effective.',
    avoid: 'Cannot use for WAN or long runs. Higher dispersion than SMF limits distance.',
    standard: 'OM1 (62.5μm), OM2/3/4 (50μm), OM5 (wideband MMF)',
    pinout: 'Duplex (pair), or MPO ribbon (12/24 fibers)',
  },
  {
    name: 'DAC (Direct Attach Copper)',
    category: 'special',
    color: '#ef4444',
    maxSpeed: '10–400 Gbps',
    maxDistance: 'Up to 7m (passive) / 15m (active)',
    frequency: 'N/A',
    shielded: true,
    connectors: ['SFP+', 'QSFP28', 'QSFP-DD'],
    cost: 'Low ($15–$150) — no separate transceivers needed',
    use: 'Data center rack-to-rack and ToR connections. Twinax copper with integrated transceivers. Low latency, low cost.',
    avoid: 'Very short range only. Vendor lock-in risk — some switches only accept their own branded DAC.',
    standard: 'SFF-8431, SFF-8436',
    pinout: 'N/A — plug directly into SFP+/QSFP ports',
  },
  {
    name: 'Coaxial (RG6)',
    category: 'special',
    color: '#ec4899',
    maxSpeed: 'Up to 10 Gbps (DOCSIS 3.1)',
    maxDistance: 'Up to 300m (cable plant)',
    frequency: 'Up to 1.2 GHz',
    shielded: true,
    connectors: ['F-type', 'BNC'],
    cost: 'Low ($0.15/ft)',
    use: 'Cable TV, DOCSIS cable internet, antenna connections. Central conductor + braided shield = excellent EMI resistance.',
    avoid: 'Not used for Ethernet LAN. F-connector is screw-on (cable modem) — not a data center technology.',
    standard: 'RG-6, RG-11 (longer runs), ANSI/SCTE',
    pinout: 'N/A — center conductor (signal), outer shield (ground)',
  },
]

function CableSelector() {
  const [selected, setSelected] = useState(0)
  const [filter, setFilter] = useState<'all' | 'copper' | 'fiber' | 'special'>('all')
  const filtered = CABLE_TYPES.filter(c => filter === 'all' || c.category === filter)
  const cable = CABLE_TYPES[selected] ?? CABLE_TYPES[0]

  return (
    <div style={{ margin: '28px 0', background: '#080d18', border: '1px solid #1e293b', borderRadius: 14, overflow: 'hidden' }}>
      {/* Filter */}
      <div style={{ padding: '12px 18px', borderBottom: '1px solid #1e293b', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {(['all', 'copper', 'fiber', 'special'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '4px 12px', borderRadius: 14, border: `1px solid ${f === filter ? ACC : '#1e293b'}`, background: f === filter ? `${ACC}18` : 'transparent', color: f === filter ? ACC : '#64748b', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'monospace' }}>{f}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', minHeight: 400 }}>
        {/* Cable list */}
        <div style={{ borderRight: '1px solid #1e293b', overflowY: 'auto' }}>
          {filtered.map((c, i) => {
            const idx = CABLE_TYPES.indexOf(c)
            return (
              <div key={c.name} onClick={() => setSelected(idx)} style={{ padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid #0d1525', background: selected === idx ? `${c.color}12` : 'transparent', borderLeft: `3px solid ${selected === idx ? c.color : 'transparent'}`, transition: 'all .15s' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: selected === idx ? c.color : '#94a3b8', fontFamily: 'monospace' }}>{c.name}</div>
                <div style={{ fontSize: 10, color: '#475569', marginTop: 2 }}>{c.maxSpeed}</div>
              </div>
            )
          })}
        </div>

        {/* Detail */}
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: cable.color }} />
            <span style={{ fontSize: 18, fontWeight: 900, color: cable.color, fontFamily: 'monospace' }}>{cable.name}</span>
            <span style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace', background: '#0d1525', borderRadius: 4, padding: '2px 8px' }}>{cable.standard}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
            {[
              { label: 'Max Speed', value: cable.maxSpeed, c: cable.color },
              { label: 'Max Distance', value: cable.maxDistance, c: '#94a3b8' },
              { label: 'Frequency', value: cable.frequency, c: '#64748b' },
              { label: 'Cost', value: cable.cost, c: '#94a3b8' },
            ].map(r => (
              <div key={r.label} style={{ background: '#0d1525', borderRadius: 8, padding: '8px 12px' }}>
                <div style={{ fontSize: 10, color: '#475569', fontFamily: 'monospace', marginBottom: 2 }}>{r.label}</div>
                <div style={{ fontSize: 12, color: r.c, fontWeight: 700, fontFamily: 'monospace' }}>{r.value}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.75, marginBottom: 12 }}>{cable.use}</div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
            <span style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace' }}>Connectors:</span>
            {cable.connectors.map(c => (
              <span key={c} style={{ fontSize: 11, color: cable.color, background: `${cable.color}15`, border: `1px solid ${cable.color}30`, borderRadius: 8, padding: '2px 8px', fontFamily: 'monospace' }}>{c}</span>
            ))}
          </div>

          <div style={{ fontSize: 12, color: '#f59e0b', background: '#1a1400', border: '1px solid #854d0e', borderRadius: 8, padding: '10px 14px', lineHeight: 1.65 }}>
            <span style={{ fontWeight: 700, display: 'block', marginBottom: 3 }}>Avoid when:</span>
            {cable.avoid}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Interactive 2: Connector Identifier ─────────────────────────────────────

const CONNECTORS = [
  {
    name: 'RJ45',
    color: '#3b82f6',
    aka: '8P8C',
    usedFor: 'Ethernet (Cat5e, Cat6, Cat6A, Cat8)',
    description: 'The universal Ethernet connector. 8 pins arranged in two rows. Gold contacts crimp onto 8 conductors (4 twisted pairs). Locking tab (the "click") holds it in the port.',
    pinout: `T568B (most common):
1=TX+ (orange-white)  5=TX- pair spare
2=TX- (orange)        6=RX- (green)
3=RX+ (green-white)   7=spare+ (brown-white)
4=spare (blue)        8=spare- (brown)

1000BASE-T uses all 4 pairs bidirectionally.
10GBASE-T also uses all 4 pairs with advanced DSP.`,
    tip: 'Locking tab breaks off easily. Use strain relief boots on patch cords. Verify pin 1 orientation before crimping.',
  },
  {
    name: 'LC (Lucent Connector)',
    color: '#10b981',
    aka: 'Little Connector / Local Connector',
    usedFor: 'SFP/SFP+ fiber optic transceivers, MMF and SMF',
    description: 'The dominant data center fiber connector. Small form factor with a push-pull latch. Typically comes as a duplex pair (TX + RX) for bidirectional connections. 1.25mm ferrule.',
    pinout: `Duplex LC: Blue boot = SMF (OS2), Aqua/orange = MMF (OM3/OM4)
TX (transmit) and RX (receive) must not be swapped.
Some bidirectional (BiDi) SFPs use a single LC fiber —
one wavelength TX, different wavelength RX on the same fiber.`,
    tip: 'LC connectors are tiny — use a connector cleaner before mating. Dirty connectors cause high insertion loss.',
  },
  {
    name: 'SC (Subscriber Connector)',
    color: '#8b5cf6',
    aka: 'Square Connector / Standard Connector',
    usedFor: 'Older fiber installations, FTTH, GPON',
    description: 'Push-pull mechanism, square housing, 2.5mm ferrule. Larger than LC. Common in ISP FTTH deployments and older enterprise fiber plant.',
    pinout: `SC-APC: Green — angled physical contact (8° angle), minimizes backreflection
SC-UPC: Blue — ultra physical contact, flat end
APC connectors used on GPON/FTTH where low reflection is critical.
Do not mix APC and UPC — different polish angles = high loss.`,
    tip: 'The APC/UPC distinction matters. Connecting APC to UPC causes ~30dB loss — effectively no signal.',
  },
  {
    name: 'MPO/MTP',
    color: '#f97316',
    aka: 'Multi-fiber Push-On / Multi-fiber Termination Push-on',
    usedFor: '40G/100G/400G parallel optics, pre-terminated trunk cables',
    description: 'Single connector carrying 12 or 24 fibers in a rectangular ferrule. Used with parallel optics (SR4, CWDM4) and high-density patch panels. Push-on, key-up/key-down polarity matters.',
    pinout: `12-fiber MPO: Two rows of 6 fibers
24-fiber MPO: Two rows of 12 fibers

Polarity methods (TIA-568-C.3):
  Method A: straight-through (1→1, 2→2 ... 12→12)
  Method B: flip (1→12, 2→11, cross)
  Method C: pair reversal
MTP is a registered trademark of US Conec; MPO is the IEC standard name.`,
    tip: 'Polarity mismatches are the #1 failure in MPO cabling. Always document and test end-to-end polarity before commissioning.',
  },
  {
    name: 'SFP / SFP+',
    color: '#ef4444',
    aka: 'Small Form-factor Pluggable',
    usedFor: '1G (SFP), 10G (SFP+) optical and copper',
    description: 'Transceiver module that plugs into a switch port to define the interface type and speed. The module contains the laser/photodetector or copper PHY. Hot-swappable.',
    pinout: `SFP variants:
  SFP:  1G — LC fiber (SX/LX/LH) or copper (T)
  SFP+: 10G — LC fiber (SR/LR/ER) or DAC/copper
  SFP28: 25G — single 25G lane (25GBASE-SR/LR)
  QSFP+: 40G — 4×10G lanes (40GBASE-SR4/LR4)
  QSFP28: 100G — 4×25G lanes (100GBASE-SR4/LR4)
  QSFP-DD: 400G — 8×50G or 4×100G lanes`,
    tip: 'Third-party SFPs often work perfectly and cost 1/10th of vendor-branded modules. Test before deploying at scale — some vendors (Cisco, Juniper) have compatibility blockers.',
  },
  {
    name: 'F-Type',
    color: '#06b6d4',
    aka: 'F connector',
    usedFor: 'Cable modem, cable TV (DOCSIS), antenna',
    description: 'Threaded coaxial connector for RG-6 cable. The center pin is the coaxial cable\'s center conductor itself (no separate pin to solder). Screw-on design prevents accidental disconnection.',
    pinout: `Coaxial: center conductor = signal (inner), outer thread = shield/ground
Male F-connector threads onto female F-port on:
  - Cable modem (DOCSIS)
  - Cable TV splitter
  - Antenna amplifier
  - Satellite receiver

Tighten to finger-tight + 1/4 turn. Over-tightening cracks the port.
Check: the center pin must protrude 1/8" or signal quality degrades.`,
    tip: 'Corroded F-connectors cause intermittent cable internet issues. Replace outdoor connectors every 5-7 years.',
  },
]

function ConnectorIdentifier() {
  const [selected, setSelected] = useState(0)
  const conn = CONNECTORS[selected]

  return (
    <div style={{ margin: '28px 0', background: '#080d18', border: '1px solid #1e293b', borderRadius: 14, overflow: 'hidden' }}>
      {/* Tabs */}
      <div style={{ padding: '12px 18px', borderBottom: '1px solid #1e293b', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {CONNECTORS.map((c, i) => (
          <button key={c.name} onClick={() => setSelected(i)} style={{ padding: '5px 12px', borderRadius: 16, border: `1px solid ${i === selected ? c.color : '#1e293b'}`, background: i === selected ? `${c.color}18` : 'transparent', color: i === selected ? c.color : '#64748b', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'monospace' }}>{c.name}</button>
        ))}
      </div>

      <div style={{ padding: '20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <span style={{ fontSize: 18, fontWeight: 900, color: conn.color }}>{conn.name}</span>
          <span style={{ fontSize: 12, color: '#475569', fontFamily: 'monospace' }}>aka: {conn.aka}</span>
        </div>

        <div style={{ fontSize: 11, color: conn.color, fontFamily: 'monospace', marginBottom: 10 }}>Used for: {conn.usedFor}</div>
        <p style={{ fontSize: 13.5, color: '#cbd5e1', lineHeight: 1.8, marginBottom: 16 }}>{conn.description}</p>

        <div style={{ background: '#0d1525', borderRadius: 10, padding: '14px 16px', marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace', marginBottom: 8 }}>PINOUT / WIRING DETAILS</div>
          <pre style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'var(--font-mono)', lineHeight: 1.65, margin: 0, whiteSpace: 'pre-wrap' }}>{conn.pinout}</pre>
        </div>

        <div style={{ background: '#0a1a12', borderLeft: `3px solid ${conn.color}`, borderRadius: 8, padding: '12px 16px', fontSize: 12.5, color: '#bbf7d0', lineHeight: 1.7 }}>
          <span style={{ fontWeight: 700, color: conn.color }}>Pro tip: </span>{conn.tip}
        </div>
      </div>
    </div>
  )
}

// ─── Interactive 3: Cable Troubleshooter ─────────────────────────────────────

const CABLE_ISSUES = [
  {
    symptom: 'Link light off / no connection',
    color: '#ef4444',
    causes: [
      'Cable unplugged or connector not fully seated',
      'Broken locking tab causing intermittent seating',
      'Cable damaged (bend radius exceeded — especially fiber)',
      'Wrong cable type (crossover vs straight-through on old equipment)',
      'NIC or switch port failed',
    ],
    tests: [
      'Try a known-good cable from the same run to rule out the cable',
      'Re-seat both connectors (press until you hear a click)',
      'Check link LEDs at both ends — if switch port LED is off, try a different port',
      'Test with a cable tester (continuity + pinout verification)',
      'ethtool eth0 | grep "Link detected"',
    ],
    commands: 'ethtool eth0 | grep -i "link\\|speed\\|duplex"\nip link show eth0 | grep "state"\nmii-tool eth0  # older systems',
  },
  {
    symptom: 'Intermittent disconnections',
    color: '#f97316',
    causes: [
      'Damaged cable — kinked, crushed under furniture, bent too sharply',
      'Corroded or loose connector',
      'Cable length exceeds 100m for copper',
      'Temperature cycling causing connector to expand/contract (outdoor cables)',
      'EMI from nearby power cables, motors, or fluorescent lighting',
    ],
    tests: [
      'Watch interface error counters: ip -s link show eth0 — look for increasing errors',
      'Wiggle the cable while watching the interface — if connection drops, bad cable',
      'Check cable routing for tight bends or crush points',
      'Measure cable length if suspect > 100m',
      'Move cable away from power cables (separate by 6+ inches)',
    ],
    commands: 'watch -n1 "ip -s link show eth0 | grep -A2 RX:"\nethtool -S eth0 | grep -i "error\\|drop\\|miss"\ndmesg | grep -i "eth0\\|link" | tail -20',
  },
  {
    symptom: 'Slow speeds / low throughput',
    color: '#f59e0b',
    causes: [
      'Speed/duplex mismatch (half-duplex causes collisions → low throughput)',
      'Category mismatch (Cat5 trying to run 1G on long runs)',
      'Excessive crosstalk (damaged cable, too many terminations, too-tight cable ties)',
      'Incorrect cable type for transceiver (SMF transceiver in MMF cable)',
      'Dirty fiber connectors causing high insertion loss',
    ],
    tests: [
      'ethtool eth0 to check negotiated speed and duplex',
      'iperf3 test: should achieve >940 Mbps on 1G link, >9 Gbps on 10G',
      'If fiber: use an optical power meter to measure insertion loss',
      'Check error counters for FCS errors, runts, giants',
      'Replace cable — start fresh if all else fails',
    ],
    commands: 'ethtool eth0 | grep -E "Speed|Duplex|Auto"\niperf3 -c server_ip -t 30\nethtool -S eth0 | grep -E "error|drop|crc|collision"',
  },
  {
    symptom: 'No SFP / transceiver not recognized',
    color: '#8b5cf6',
    causes: [
      'Vendor compatibility lock — switch only accepts vendor-branded modules',
      'Incorrect speed/type for port (inserting 1G SFP in 10G SFP+ port without forced 1G mode)',
      'Dirty SFP contacts',
      'Unsupported DOM (Digital Optical Monitoring) version',
      'SFP module failed',
    ],
    tests: [
      'Check switch logs: syslog / show interface to see if module is detected',
      'Try the SFP in a known-good port on the same switch',
      'Clean SFP with an air blower and lint-free swab',
      'Verify the SFP speed matches port type',
      'On Cisco: "service unsupported-transceiver" to allow third-party modules',
    ],
    commands: 'show interface transceiver  # Cisco\nshow interface eth-1/1 transceiver detail  # Arista\nethtool -m eth0  # Linux — reads SFP DOM data\ndmesg | grep -i "sfp\\|transceiver\\|module"',
  },
  {
    symptom: 'High BER / fiber optical errors',
    color: '#06b6d4',
    causes: [
      'Dirty fiber connector (the #1 cause of fiber issues)',
      'Fiber bend radius exceeded (minimum 30mm for most fiber — less = signal loss)',
      'Wrong fiber type (SMF transceiver in MMF cable or vice versa)',
      'APC and UPC connectors mixed (30dB+ loss)',
      'Connector not fully seated or cracked ferrule',
    ],
    tests: [
      'Clean connectors with IEC 61300-3-35 cleaner tool, then measure loss',
      'Optical power meter: measure TX power at near end, RX at far end — difference = loss',
      'Acceptable loss: ~3.5 dB for OM3 MMF 300m, ~1 dB for SMF 1km, verify against budget',
      'Visual fault locator (red laser): shines red light through fiber — break appears as bright spot',
      'OTDR trace: maps loss along the fiber length, finds exact location of break/splice',
    ],
    commands: 'ethtool -m eth0 | grep -E "Rx power|Tx power|Laser"  # SFP DOM\nshow interface eth1 transceiver detail | grep power  # Arista',
  },
]

function CableTroubleshooter() {
  const [selected, setSelected] = useState(0)
  const issue = CABLE_ISSUES[selected]

  return (
    <div style={{ margin: '28px 0', background: '#080d18', border: '1px solid #1e293b', borderRadius: 14, overflow: 'hidden' }}>
      <div style={{ padding: '12px 18px', borderBottom: '1px solid #1e293b', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {CABLE_ISSUES.map((iss, i) => (
          <button key={iss.symptom} onClick={() => setSelected(i)} style={{ padding: '5px 12px', borderRadius: 16, border: `1px solid ${i === selected ? iss.color : '#1e293b'}`, background: i === selected ? `${iss.color}18` : 'transparent', color: i === selected ? iss.color : '#64748b', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'monospace' }}>
            {iss.symptom.split('/')[0].trim()}
          </button>
        ))}
      </div>

      <div style={{ padding: '20px 22px' }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: issue.color, marginBottom: 16 }}>{issue.symptom}</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace', marginBottom: 8, fontWeight: 700 }}>COMMON CAUSES</div>
            {issue.causes.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <span style={{ color: issue.color, fontWeight: 700, flexShrink: 0, fontSize: 12 }}>{i + 1}.</span>
                <span style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.6 }}>{c}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace', marginBottom: 8, fontWeight: 700 }}>DIAGNOSIS STEPS</div>
            {issue.tests.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <span style={{ color: '#10b981', fontWeight: 700, flexShrink: 0, fontSize: 12 }}>→</span>
                <span style={{ fontSize: 12.5, color: '#94a3b8', lineHeight: 1.6 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0d1525', borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace', marginBottom: 8 }}>DIAGNOSTIC COMMANDS</div>
          <pre style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'var(--font-mono)', lineHeight: 1.65, margin: 0, whiteSpace: 'pre-wrap' }}>{issue.commands}</pre>
        </div>
      </div>
    </div>
  )
}

// ─── Module ────────────────────────────────────────────────────────────────────

export default function CablesAndConnectorsPage() {
  return (
    <LearnLayout
      title="Cables and Connectors"
      description="The physical layer in practice — every cable type, every connector, and how to diagnose the hardware problems that bring networks to their knees."
      section="Networking Fundamentals — Module 07"
      readTime="20–28 min"
      updatedAt="May 2026"
    >
      {/* ── Chapter 01 ── */}
      <Chapter n={1} title="Why Cables Still Matter in a Wireless World" />

      <StoryBox>
        It&apos;s 3 AM. Your monitoring system alerts: database cluster unreachable. You log in remotely —
        that works. You ping the database servers — no response. You drive to the data center. One server
        shows a solid amber NIC LED instead of green. You find the problem in 30 seconds: someone
        kicked a patch cable half-out of the switch port during a rack installation earlier that evening.
        The locking tab had been broken months ago. A $0.15 locking tab clip, and three hours of
        downtime for a hundred customers.
      </StoryBox>

      <Para>
        Physical layer failures cause roughly <Accent>30% of all network outages</Accent> in enterprise
        environments. Cables get bent past their minimum radius, connectors corrode, fiber gets dirty,
        patch cables get pulled halfway out and left there. Every network engineer must know the physical
        layer cold — not just the theory, but the practical skills of cable selection, connector identification,
        and systematic physical troubleshooting.
      </Para>

      <Para>
        And for all the talk about wireless networks, the world&apos;s critical infrastructure runs on copper
        and fiber. Every Wi-Fi access point connects to an Ethernet cable. Every 5G base station connects
        to fiber. Every cloud server in every data center connects to hundreds of cables. The wireless
        you see is the last 30 meters. The rest is wired.
      </Para>

      <WowBox>
        The world&apos;s submarine fiber optic network has a combined length of over 1.3 million kilometers —
        enough to circle Earth 32 times. About 400 cable systems carry 95% of all international internet
        traffic. The longest is the SEA-ME-WE 3 cable at 39,000 km, connecting Southeast Asia to Europe
        via the Middle East. Each cable is about the diameter of a garden hose, contains dozens of glass
        fibers thinner than a human hair, and transmits many terabits per second.
      </WowBox>

      <Divider />

      {/* ── Chapter 02 ── */}
      <Chapter n={2} title="Copper Cable Fundamentals" />

      <Para>
        Copper cable for networking means twisted pair — two copper conductors twisted together. The twist
        isn&apos;t decorative: it&apos;s the essential physics that makes high-speed networking possible over copper.
      </Para>

      <H2>Why Twist?</H2>

      <Para>
        When electromagnetic interference hits a twisted pair, it induces a small current on both wires.
        Because the wires alternate which is on top (that&apos;s the twist), the induced current alternates
        direction with each half-twist. At the receiver, the signal is measured as the <Accent>difference</Accent> between
        the two wires — the noise (which is identical on both wires) cancels out. This is called
        <Accent> differential signaling</Accent>, and it&apos;s why Cat6 cable can carry 10 Gbps next to a
        running motor without error.
      </Para>

      <Para>
        The twist rate matters. Cat5e has ~2.5 twists per inch. Cat6 has more. Cat6A has a plastic spline
        that keeps each pair separated from adjacent pairs, reducing alien crosstalk (interference between
        pairs) — the limiting factor for 10GbE over copper.
      </Para>

      <H2>The 100-Meter Rule</H2>

      <Para>
        All copper Ethernet standards (10BASE-T through 10GBASE-T) specify a maximum cable segment length
        of 100 meters. This isn&apos;t arbitrary: it&apos;s derived from the need for the collision detection signal
        to round-trip within the slot time (51.2 μs for 10 Mbps Ethernet). For Gigabit and above, it&apos;s
        signal attenuation — at 100m, the signal arrives weakened but still distinguishable. At 105m, it
        may not.
      </Para>

      <Warn>
        The 100m limit applies to the <em>cable</em>, not the total distance. A cable run of 90m with
        10m of patch cords at both ends = 90m + 10m = 100m (just under the limit). In practice,
        use 90m as your maximum cable run to leave headroom for patch cords. Switch-to-switch distance
        = cable run + both patch cords. No exceptions: Cat5e and Gigabit at 101m = flaky connection.
      </Warn>

      <Divider />

      {/* ── Chapter 03 ── */}
      <Chapter n={3} title="Copper Cable Categories: Choosing the Right Grade" />

      <CableSelector />

      <H2>The T568A vs T568B Wiring Standards</H2>

      <Para>
        There are two standard ways to terminate an RJ45 connector: T568A and T568B. They differ only in
        which color pair goes on pins 1/2 vs 3/6. Both are valid — what matters is <Accent>consistency</Accent>:
        both ends of a patch cable must use the same standard.
      </Para>

      <CodeBlock>{`T568A (used by US government, some residential):
Pin: 1          2          3          4     5     6          7        8
    GW(green)  G(green)   OW(orange)  BL    BLW   O(orange)  BRW     BR

T568B (most common in commercial, data centers):
Pin: 1          2          3          4     5     6          7        8
    OW(orange) O(orange)  GW(green)  BL    BLW   G(green)   BRW     BR

Crossover cable: T568A on one end, T568B on the other.
  Swaps TX and RX pairs — used to directly connect two switches/computers.
  Modern equipment has Auto-MDI/MDIX — automatically detects and corrects.
  In practice: you almost never need a crossover cable anymore.

Color abbreviations: W=white stripe, O=orange, G=green, BL=blue, BR=brown`}</CodeBlock>

      <Divider />

      {/* ── Chapter 04 ── */}
      <Chapter n={4} title="Fiber Optic Cable: Light Through Glass" />

      <Para>
        Fiber optic cable transmits data as pulses of light through a glass or plastic core. The physics:
        light undergoes total internal reflection at the core-cladding boundary (the cladding has a lower
        refractive index than the core), keeping the light trapped inside the fiber as it travels.
      </Para>

      <H2>Single-Mode vs Multi-Mode: The Core Difference</H2>

      <Para>
        The core diameter determines whether only one optical mode (single-mode) or many modes (multi-mode)
        can propagate through the fiber:
      </Para>

      <CodeBlock>{`Parameter        Single-Mode (OS2)      Multi-Mode (OM3/OM4/OM5)
──────────────────────────────────────────────────────────────────────────────
Core diameter    8-10 μm                50 μm (OM3/4/5), 62.5 μm (OM1/2)
Cladding         125 μm                 125 μm
Light source     DFB laser (coherent)   VCSEL laser or LED (less coherent)
Wavelength       1310nm / 1550nm        850nm (mainly)
Max distance     Up to 100+ km          OM3: 300m@10G, OM4: 400m@10G, OM5: 400m@100G
Bandwidth        Essentially unlimited  OM4: 4700 MHz·km (EMB)
Jacket color     Yellow                 Orange (OM2), Aqua (OM3/OM4), Lime (OM5)
Connector color  Blue (UPC), Green(APC) Beige (OM1), various for OM3/4/5

Key tradeoff: SMF requires expensive laser sources ($200+ per transceiver);
MMF uses cheaper VCSELs ($30-100) but has limited reach.
Data centers: MMF for in-rack/row, SMF for inter-building and WAN.`}</CodeBlock>

      <H2>Fiber Grades: OM1 through OM5</H2>

      <CodeBlock>{`Grade  Year  Bandwidth     10G dist  25G dist  100G dist  Core   Jacket
OM1   1983  200 MHz·km    33m       N/A       N/A        62.5μm  Orange
OM2   1998  500 MHz·km    82m       N/A       N/A        50μm   Orange
OM3   2003  2000 MHz·km  300m      70m        100m       50μm   Aqua
OM4   2009  4700 MHz·km  400m     150m        150m       50μm   Aqua
OM5   2016  28000 MHz·km  400m     400m        400m       50μm   Lime green
                                              (using SWDM4)

OM1 and OM2: obsolete for new installations. OM3 minimum for new data centers.
OM4 most common for new enterprise installs. OM5 enables 100G without expensive optics.`}</CodeBlock>

      <WowBox>
        A single strand of standard single-mode fiber has a theoretical capacity of 100+ Tbps using
        DWDM. The record for a single fiber is 1.02 Pbps (petabits per second), achieved in 2020 by
        researchers in Japan. They used 55 wavelengths × 1000 Gbps each = 55 Tbps... wait, let me be
        precise: the actual record was achieved using a custom 4-core fiber with spatial multiplexing.
        Regular commercially deployed DWDM systems achieve 96 wavelengths × 200 Gbps = 19.2 Tbps per
        fiber pair, with multiple fiber pairs per cable. A single modern submarine cable carries 200+ Tbps.
      </WowBox>

      <Divider />

      {/* ── Chapter 05 ── */}
      <Chapter n={5} title="Connectors: The Mechanical Interface" />

      <ConnectorIdentifier />

      <H2>Fiber Connector Polish Types</H2>

      <Para>
        The quality of the fiber end face (ferrule) determines how much light is lost at each connection.
        Three polish types exist:
      </Para>

      <CodeBlock>{`Polish  Angle  Return Loss   Insertion Loss  Use
────────────────────────────────────────────────────────────────────────
PC      flat   ≥30 dB         ≤0.75 dB       Legacy, rarely used
UPC     flat   ≥50 dB         ≤0.3 dB        Standard data applications
APC     8°     ≥60 dB         ≤0.3 dB        CATV, FTTH, GPON, DWDM

APC (Angled Physical Contact): the 8° angled end-face reflects backreflection
away from the fiber core rather than back toward the source. Critical for:
  - CATV where backreflection causes ghost images
  - GPON/FTTH where high optical power and precision are needed
  - Coherent optical transport (100G+ DWDM) where return loss affects performance

NEVER connect APC to UPC — the angle mismatch causes ~30 dB+ loss (signal effectively gone).
APC connectors are GREEN. UPC are BLUE. Colors prevent misconnection.`}</CodeBlock>

      <Divider />

      {/* ── Chapter 06 ── */}
      <Chapter n={6} title="Power over Ethernet: Powering Devices Through Cables" />

      <Para>
        PoE (Power over Ethernet) delivers DC power and data over the same copper cable to devices like
        IP phones, wireless access points, IP cameras, and IoT sensors — eliminating the need for a
        separate power outlet at each device.
      </Para>

      <CodeBlock>{`Standard      Name              Max power   Pairs used  Common devices
──────────────────────────────────────────────────────────────────────────────────
IEEE 802.3af  PoE               15.4W       2 pairs     VoIP phones, basic APs
IEEE 802.3at  PoE+              30W         2 pairs     Video phones, PTZ cameras
IEEE 802.3bt  PoE++ (Type 3)    60W         4 pairs     MU-MIMO APs, PTZ cameras
IEEE 802.3bt  PoE++ (Type 4)    100W        4 pairs     Laptops, high-power APs

Power is delivered on unused pairs (mode A/B) or all 4 pairs (802.3bt).
PSE = Power Sourcing Equipment (the switch). PD = Powered Device (the end device).
Cat3 cable supports basic PoE. Cat5e/Cat6 required for 30W+. Cat6A for 100W.

Caution: 100W through Cat6A heats the cable. Bundled PoE cables can exceed
temperature ratings — derate ampacity or use lower power devices in dense bundles.`}</CodeBlock>

      <Warn>
        Never assume a switch port supports PoE just because the device needs it. Check the switch
        specifications for total PoE budget (a 48-port switch might have only 370W total PoE budget —
        less than 8W per port on average). Plugging too many high-draw devices can trigger PoE budget
        overprotection, randomly de-powering devices.
      </Warn>

      <Divider />

      {/* ── Chapter 07 ── */}
      <Chapter n={7} title="Data Center Cabling: Structure and Scale" />

      <Para>
        Enterprise data centers use structured cabling systems — organized hierarchies of patch panels,
        trunk cables, and horizontal runs that allow any device to be connected to any other device
        through a documented, manageable physical plant.
      </Para>

      <H2>The Three-Layer Cabling Hierarchy</H2>

      <CodeBlock>{`Entrance/Main Cross-Connect (MCC)
│  WAN circuits, ISP handoffs, inter-building fiber
│  Typically single-mode fiber
│
├── Horizontal Distribution Area (HDA) / Intermediate Distribution Frame
│   │  Aggregation switches, network infrastructure
│   │  MMF or SMF trunk cables (12/24/48-fiber MPO)
│   │
│   └── Equipment Distribution Area (EDA)
│       │  Server racks, patch panels
│       │  Cat6A copper (to servers) or DAC/SFP+ (to ToR switches)
│       │
│       └── Top-of-Rack (ToR) switch
│               → servers via Cat6A or SFP+ DAC (< 5m typical)
│               → spine via 25G/100G fiber uplinks

Color coding (TIA-606-B):
  Yellow   SMF fiber
  Orange   MMF fiber (OM1/OM2)
  Aqua     MMF fiber (OM3/OM4)
  Lime     OM5 fiber
  Blue     Cat6/Cat6A horizontal
  White    Horizontal cross-connect
  Gray     LANs and equipment cords`}</CodeBlock>

      <H2>Pre-Terminated MPO Trunks</H2>

      <Para>
        Modern data centers use pre-terminated MPO/MTP trunk cables — factory-terminated fiber bundles
        with 12 or 24 fibers per connector. These deploy instantly (no field termination), have known
        optical performance, and support modular cassette systems. A 40G link uses a 12-fiber MPO
        (4 TX fibers, 4 RX fibers, 4 unused). A 100G QSFP28 SR4 link uses 8 of the 12 fibers.
        BiDi optics can achieve 40G or 100G on a single LC duplex fiber pair using two different wavelengths.
      </Para>

      <Divider />

      {/* ── Chapter 08 ── */}
      <Chapter n={8} title="Transceivers: The Optics That Live in Your Switches" />

      <Para>
        Modern switches and routers don&apos;t have fixed port types — they have cages that accept hot-swappable
        transceiver modules (SFPs, QSFPs). The module determines the speed, distance, and fiber type.
        This allows one switch to support 1G copper access ports, 10G fiber uplinks, and 100G spine
        connections, all from the same hardware.
      </Para>

      <H2>Common Transceiver Types for 10G Fiber</H2>

      <CodeBlock>{`Transceiver   Fiber  Distance  Wavelength  Use case
──────────────────────────────────────────────────────────────────────
10GBASE-SR    MMF    300m      850nm       Data center short reach
10GBASE-LR    SMF    10km      1310nm      Campus/inter-building
10GBASE-ER    SMF    40km      1550nm      Metropolitan area
10GBASE-ZR    SMF    80km      1550nm      Regional WAN
10GBASE-T     Cu     100m      N/A         Copper SFP+ for Cat6A
BiDi SFP+     SMF    10km      1270/1330nm Single-fiber (TX/RX on same strand)
DAC SFP+      Cu     7m (pas.) N/A         Rack direct-attach twinax

For 100G (QSFP28):
100GBASE-SR4  MMF    100m      850nm×4     Short reach parallel MMF
100GBASE-LR4  SMF    10km      1310nm CWDM Single fiber pair, 4 wavelengths
100GBASE-DR   SMF    500m      1310nm      Emerging standard, single lambda`}</CodeBlock>

      <H3>Third-Party vs Vendor-Branded Transceivers</H3>

      <Para>
        Original Equipment Manufacturer (OEM) SFPs from Cisco, Juniper, or Arista cost $500–$5000 each.
        Compatible third-party SFPs with identical specifications cost $50–$500. Both are produced by
        the same optical component manufacturers (Finisar, Lumentum, Hisense). The difference: OEM
        modules have vendor-specific EEPROM data that identifies them as genuine. Some switches (Cisco
        IOS, Juniper JunOS) display warnings or refuse to operate with unsigned modules.
      </Para>

      <Para>
        In practice, third-party SFPs work reliably in most switches when properly tested. The risk is
        vendor support: if you have a problem, the vendor may blame the third-party optic and refuse
        assistance. Enterprise policy: use branded for critical paths, third-party for non-critical.
      </Para>

      <Divider />

      {/* ── Chapter 09 ── */}
      <Chapter n={9} title="Optical Power Budgets: Can the Signal Survive?" />

      <Para>
        Before deploying a fiber link, calculate the <Accent>optical loss budget</Accent>: the maximum
        power loss a link can sustain while still delivering a detectable signal. If actual loss exceeds
        the budget, the link will have errors or won&apos;t work at all.
      </Para>

      <CodeBlock>{`Optical Loss Budget Calculation:

Transceiver: 10GBASE-LR SFP+
  TX power:    -2 dBm (minimum)
  RX sensitivity: -12 dBm (minimum, aka receiver sensitivity)
  Loss budget: TX - RX = -2 - (-12) = 10 dB available

Link components and their typical losses:
  LC connector pair:  0.3 dB each × 4 connectors = 1.2 dB
  SMF cable (1km):    0.4 dB/km × 1 km = 0.4 dB
  Fusion splices:     0.1 dB each × 2 = 0.2 dB
  Safety margin:      3 dB (standard engineering margin)
  ─────────────────────────────────────────────────────────
  Total loss budget needed: 1.2 + 0.4 + 0.2 + 3.0 = 4.8 dB
  Available budget: 10 dB
  Margin remaining: 10 - 4.8 = 5.2 dB (comfortable)

If actual loss budget was 9.5 dB and you added a patch panel (2 connectors = 0.6 dB),
you&apos;d be at 9.6 + 3.0 safety = 12.6 dB required > 10 dB budget = FAIL.`}</CodeBlock>

      <H3>Reading SFP DOM (Digital Optical Monitoring)</H3>

      <CodeBlock>{`$ ethtool -m eth0
        Identifier                                : 0x03 (SFP)
        Transceiver type                          : 10G Ethernet: 10G Base-LR
        Laser bias current                        : 40.000 mA
        Laser output power                        : 0.6310 mW / -2.00 dBm
        Receiver signal average optical power     : 0.2512 mW / -6.00 dBm

Laser output: -2.00 dBm (at TX power minimum spec — good, not too strong)
Receiver power: -6.00 dBm (well above -12 dBm minimum — 6 dB margin — good)

Red flags in DOM readings:
  Rx power below RX sensitivity spec: signal too weak — clean connectors, check cable
  Rx power above maximum (usually -1 dBm): too much power — may damage receiver, add attenuator
  Laser bias current too high: laser degrading — replace SFP
  Temperature out of range: check airflow around switch`}</CodeBlock>

      <Divider />

      {/* ── Chapter 10 ── */}
      <Chapter n={10} title="Wireless Physical Layer: Antennas and Radio Fundamentals" />

      <Para>
        Wi-Fi, 5G, and Bluetooth are physical layer technologies — they just use electromagnetic waves
        instead of copper or glass. The same principles apply: signal strength, noise, bandwidth, distance.
        The engineering is more complex because radio propagates in three dimensions and through various
        materials.
      </Para>

      <H2>Antenna Fundamentals</H2>

      <Para>
        An antenna converts electrical signals to electromagnetic radiation (transmitting) and vice versa
        (receiving). Key properties:
      </Para>

      <CodeBlock>{`Gain: how much the antenna amplifies signal in a specific direction vs an isotropic radiator.
  0 dBi = isotropic (radiates equally in all directions, theoretical)
  2.2 dBi = dipole antenna (standard Wi-Fi stick antenna)
  5-8 dBi = directional patch antenna
  24 dBi = parabolic dish (point-to-point microwave link)

IMPORTANT: antennas don't add power. They redirect it.
  A 6 dBi antenna has 4× gain in one direction, but 4× less in other directions.
  "High-gain" antenna = narrow beam. Use it for directional links, not omnidirectional coverage.

EIRP (Effective Isotropic Radiated Power) = TX power + antenna gain - cable loss
  US FCC limit for 5 GHz Wi-Fi: 30 dBm EIRP
  If TX power = 23 dBm, antenna = 6 dBi, cable = 0.5 dB:
  EIRP = 23 + 6 - 0.5 = 28.5 dBm (within limit)

RSSI (Received Signal Strength Indicator): usually in dBm (negative numbers)
  -30 to -50 dBm: excellent signal (next to AP)
  -50 to -70 dBm: good signal (typical usage)
  -70 to -80 dBm: fair (range of AP, occasional issues)
  -80 to -90 dBm: poor (connection drops, slow speeds)
  Below -90 dBm: unusable`}</CodeBlock>

      <Divider />

      {/* ── Chapter 11 ── */}
      <Chapter n={11} title="Cable Installation Best Practices" />

      <Para>
        Correct installation is as important as correct cable selection. A Cat6A cable installed poorly
        performs worse than a Cat5e installed correctly.
      </Para>

      <H2>Copper Installation Rules</H2>

      <CodeBlock>{`Bend radius:
  Cat5e/Cat6: minimum bend radius = 4× cable diameter ≈ 1 inch (25mm)
  Cat6A: 8× cable diameter ≈ 2 inches due to thicker construction
  Tight bends cause pair untwisting → increased crosstalk → reduced performance

Pulling tension:
  Maximum pull tension: 25 lbs (11 kg) for Cat5e/6, 40 lbs (18 kg) for Cat6A
  Exceeded tension permanently deforms the cable geometry → increased insertion loss

Proximity to EMI sources:
  6 inches (150mm) minimum from power cables (parallel runs)
  Cross power cables at 90° to minimize induction
  12+ inches from fluorescent lights, motors, transformers
  Use STP (shielded) or conduit near severe EMI sources

Pair untwisting at terminations:
  Maximum 1/2 inch (13mm) untwisting allowed at RJ45 terminations
  More untwisting → near-end crosstalk (NEXT) → fails Cat6 spec

Temperature rating:
  CMR (Riser): 75°C rated for vertical runs between floors
  CMP (Plenum): 50°C self-extinguishing, required in air-handling spaces (HVAC return)
  PVC (CM): standard, indoor use only, not in walls or ceilings of some jurisdictions`}</CodeBlock>

      <H2>Fiber Installation Rules</H2>

      <CodeBlock>{`Bend radius:
  Standard single-mode: minimum 30mm (1.2 inch) long-term, 15mm short-term
  Bend-insensitive SMF (G.657): 7.5mm long-term bend radius (inside walls)
  Exceeding bend radius → evanescent field leaks out → signal loss

Fiber cleanliness:
  Clean EVERY connector EVERY time before mating, even new cables
  Use IEC 61300-3-35 compliant push-type cleaner (one-click cleaner)
  Inspect with 400× fiber microscope before mating
  Dirty fiber is #1 cause of fiber link failures

Fiber handling:
  Minimum pull force: 600N (singlemode), 2700N (armored cable)
  No kinking — fiber doesn't recover from tight kinks
  Protect cable ends with dust caps when not connected
  Label both ends immediately — fiber plant label confusion is a major operational issue`}</CodeBlock>

      <Divider />

      {/* ── Chapter 12 ── */}
      <Chapter n={12} title="Diagnosing Cable and Physical Layer Issues" />

      <CableTroubleshooter />

      <H2>Cable Testing Tools</H2>

      <CodeBlock>{`Tool                    What it measures              When to use
────────────────────────────────────────────────────────────────────────────────
Cable tester (basic)    Continuity + pinout           Before deploying new cable
Wiremap tester          Pin-to-pin mapping, shorts     Verifying T568B termination
Certification tester    Loss, NEXT, return loss, etc.  Contract work (TIA certification)
  (Fluke DSX)           — generates pass/fail report
Time domain             Measures cable length, finds   Troubleshooting buried runs
  reflectometer (TDR)   location of breaks/shorts
Optical power meter     dBm at fiber end               Measuring fiber link loss
OTDR                    Loss map along fiber length    Finding fiber breaks/splices
Visual fault locator    Red laser through fiber        Quick break/bend detection
Wi-Fi spectrum analyzer RF spectrum, channel usage     Wi-Fi interference diagnosis`}</CodeBlock>

      <Divider />

      {/* ── Chapter 13 ── */}
      <Chapter n={13} title="Common Misconceptions" />

      <Err>
        <strong>"All Ethernet cables look the same and are interchangeable."</strong><br /><br />
        Cat5e supports 1G at 100m. Cat6 supports 10G only at 55m. Cat6A supports 10G at 100m. Cat8 supports
        40G at 30m. Physically they look similar (all use RJ45, all have 4 pairs), but performance is radically
        different. Using a Cat5e cable for a 10G connection produces intermittent errors or no link at all.
        In production data centers, all cables are labeled with category, length, and installation date.
        Never assume — always check the cable markings on the jacket.
      </Err>

      <Err>
        <strong>"Single-mode fiber is better than multi-mode — always use SMF."</strong><br /><br />
        SMF is better for distance, not necessarily better for your application. For data center runs under
        100m, MMF OM4 with inexpensive VCSEL transceivers ($50–$100) is the right choice. SMF requires laser
        transceivers ($200–$2000+) and is overkill for short distances. The question is: what distance do
        you need? Under 400m (most data centers): OM3/OM4 MMF. Campus building-to-building (400m–2km):
        OM4 or SMF. Anything longer: SMF. Choosing SMF for everything wastes money on transceivers.
      </Err>

      <Err>
        <strong>"Crossover cables are needed to connect two switches together."</strong><br /><br />
        This was true for equipment made before 2000. Modern switches, routers, and computers implement
        Auto-MDI/MDIX (IEEE 802.3ab, 1999) — they automatically detect whether the link is straight-through
        or crossover and adjust internally. You can connect two modern switches with a standard patch cable.
        Crossover cables are essentially obsolete except for connecting to legacy equipment that predates
        Auto-MDI/MDIX.
      </Err>

      <Err>
        <strong>"Fiber is immune to all problems because light doesn&apos;t degrade."</strong><br /><br />
        Fiber has its own failure modes: dirty connectors (the #1 cause — one fingerprint can cause
        3+ dB loss), bent below minimum radius (light leaks out at the bend), cracked ferrules, bad splices,
        moisture ingress in outdoor cables, and connector mismatches (APC/UPC mix). Fiber also doesn&apos;t
        "carry more data by itself" — the transceiver on each end limits speed. A 1000BASE-SX SFP in a
        $500 SMF link gives you 1 Gbps, not 100 Gbps just because the fiber can handle it.
      </Err>

      <Err>
        <strong>"PoE provides free power — there&apos;s no real cost."</strong><br /><br />
        PoE power comes from the switch&apos;s power supply, which costs money and generates heat. A 48-port
        PoE+ switch delivering 30W to every port consumes 1,440W — comparable to a small electric heater.
        That&apos;s power (electricity cost) and heat (cooling cost). Data centers carefully calculate PoE loads
        for power budget and cooling. A switch that delivers less PoE than configured may randomly de-power
        devices when the total budget is exceeded — a mysterious failure mode that&apos;s hard to diagnose without
        checking the switch&apos;s PoE budget status.
      </Err>

      <Err>
        <strong>"The cable tester showed continuity — the cable is fine."</strong><br /><br />
        A basic continuity tester verifies that each pin connects to the right pin at the other end. It
        cannot detect subtle problems: damaged pairs that carry signal but with elevated crosstalk or
        increased insertion loss, pairs with reduced twist rate due to over-pulling, or cables that pass
        1 Gbps but fail 10G certification. A proper cable certification tester (like Fluke DSX) tests
        dozens of parameters against the TIA spec. "Passes continuity" means "not an open circuit" —
        not "certified for 10GbE."
      </Err>

      <Divider />

      {/* ── Chapter 14 ── */}
      <Chapter n={14} title="Test Your Understanding" />

      <IQ level="Beginner">
        <strong>Q: You need to run Ethernet to a device 120 meters from the nearest switch. What are your options?</strong>
        <br /><br />
        At 120m, you exceed the 100m copper limit. Options: (1) Install an intermediate switch or network
        wall jack at the 100m mark, then run a second cable to the device. (2) Replace copper with fiber —
        a single-mode or multi-mode fiber link has no distance issue at this range, though you need SFP
        transceivers at both ends. (3) Use a media converter — a device that converts Ethernet copper to fiber
        at each end. (4) For a single device, a fiber-to-copper media converter pair (~$100–$200) is often
        the most economical solution. You cannot exceed 100m with any copper Cat cable — the limit is physics,
        not the cable grade.
      </IQ>

      <IQ level="Beginner">
        <strong>Q: Your switch shows a port as "connected" but the device gets no IP address. What physical layer checks do you start with?</strong>
        <br /><br />
        "Connected" means the physical link is up (signal at the right level, speed negotiated). So Layer 1
        is working. However: check (1) Speed/duplex: <Code>ethtool eth0</Code> — duplex mismatch (one end
        full, other half) causes DHCP to time out due to collisions. (2) VLAN membership: the port may be
        in the wrong VLAN, so DHCP requests go to the wrong segment. (3) DHCP server: is there a DHCP server
        on this VLAN? (4) MAC address filtering: port security may be blocking the device. Physical layer
        is fine — this is a Layer 2 or Layer 3 issue. The physical connectivity check passed; move up.
      </IQ>

      <IQ level="Intermediate">
        <strong>Q: An ethtool output shows "Speed: 100Mb/s, Duplex: Half". The link should be 1Gbps, Full Duplex. What caused this and how do you fix it?</strong>
        <br /><br />
        This is auto-negotiation failure. 100Mb/s Half is the fallback mode when auto-negotiation fails —
        it&apos;s what Fast Ethernet defaults to without successful negotiation. Likely causes: (1) Bad cable
        (damaged pairs cause negotiation failure — only pairs 1/2 and 3/6 work for 100M, pairs 4/5 and 7/8
        needed for Gigabit). (2) One side has auto-negotiation disabled with a forced setting. (3) Damaged
        NIC or switch port. Fix: try a new cable (most likely fix). If persistent, force speed/duplex on
        both ends: <Code>ethtool -s eth0 speed 1000 duplex full autoneg off</Code> and match on switch.
        But forcing without auto-negotiation hides underlying problems — fix the root cause instead.
      </IQ>

      <IQ level="Intermediate">
        <strong>Q: An SFP+ 10G link shows frequent FCS errors but no interface errors. The cable is new. What do you suspect?</strong>
        <br /><br />
        FCS (Frame Check Sequence) errors mean frames arrive at the interface but fail the CRC check —
        bits were corrupted in transit. Possible causes with new cable: (1) Dirty fiber connectors —
        clean all four LC connectors with a one-click cleaner, then test. (2) Wrong fiber type — if
        the SFP+ is 10GBASE-SR (850nm, multi-mode) but someone used single-mode fiber, power levels
        are wrong, causing errors. (3) Cable routed near strong EMI (unlikely for fiber, but possible
        if the cable jacket was damaged and moisture entered). (4) SFP+ module defective or DOM shows
        Rx power below sensitivity. Check: <Code>ethtool -m eth0</Code> for optical power levels,
        then clean connectors as first action.
      </IQ>

      <IQ level="Senior">
        <strong>Q: You&apos;re designing cabling for a 100-server data center with 25G server connections and 100G spine uplinks. Detail your cabling architecture.</strong>
        <br /><br />
        Top-of-Rack (ToR) design: each rack has a 48-port 25G switch with 8× 100G uplinks to spine.

        Server-to-ToR (within rack, &lt;2m): use DAC (Direct Attach Copper) SFP28 cables — cheapest, lowest
        latency, no transceiver needed. For servers in adjacent racks (&lt;7m): active DAC SFP28. Beyond 7m:
        25GBASE-SR SFP28 with OM4 MMF.

        ToR-to-spine (inter-rack, typically 20-100m): 100GBASE-SR4 QSFP28 using 12-fiber MPO OM4 pre-terminated
        trunks. SR4 uses 4×25G parallel lanes on 8 fibers (4 TX, 4 RX) at 850nm VCSEL — cheaper transceivers,
        enough reach for a typical data center footprint (OM4 reaches 150m at 100G SR4).

        Structured cabling: MPO trunk cables between patch panels → LC cassettes break out to individual
        LC jumpers. Pre-terminated factory cabling ensures known insertion loss. All fiber OM4 (aqua jacket).
        Document with DCIM (Data Center Infrastructure Management) tool from day one.

        Power: 100 servers × 25G = each server NIC draws ~3-5W (SFP28 transceiver at ToR). Total optical
        budget: check ToR switch transceiver power budget. 48× SFP28 + 8× QSFP28 ≈ 250W just in optics
        on one switch.
      </IQ>

      <IQ level="Senior">
        <strong>Q: How does coherent optical technology enable 400G and 800G transmission over existing single-mode fiber infrastructure?</strong>
        <br /><br />
        Traditional intensity-modulated direct-detection (IMDD) optics simply turn a laser on/off (OOK —
        On-Off Keying) to encode bits. At 100G+, the symbol rate exceeds what IMDD can practically achieve
        over long distances due to chromatic dispersion.

        Coherent optics uses the full properties of light — amplitude, phase, and polarization — to encode
        data using complex modulation (DP-QPSK, DP-16QAM, DP-64QAM). A coherent receiver uses a local
        oscillator laser mixed with the received signal to recover the amplitude and phase information.

        400G coherent (400GBASE-ZR, OIFCFE-ZR+): DP-16QAM at ~64 GBaud → 4 bits/symbol × 2 pol × 2 quadratures
        = 16 bits per symbol × 64 Gbaud = 400 Gbps on a single wavelength (one DWDM channel).

        The key advantage: coherent systems use DSP (digital signal processing) to compensate for fiber
        chromatic dispersion and polarization mode dispersion electronically — without dispersion compensation
        fiber modules. This allows 400G to run over existing SMF fiber plants designed decades ago for
        10G DWDM. The fiber doesn&apos;t need upgrading — the new coherent transceivers extract far more capacity
        from the same glass.

        800G moves to DP-64QAM at higher baud rates, requiring better SNR (closer fiber, or Raman amplification).
        The physical fiber remains the same; optical physics and electronics keep advancing.
      </IQ>

      <IQ level="PhD">
        <strong>Q: Analyze the physics of why the minimum bend radius matters for optical fiber, and how bend-insensitive fiber (G.657) achieves its performance improvement.</strong>
        <br /><br />
        Standard single-mode fiber (G.652) uses total internal reflection to guide light in the core.
        The condition for total internal reflection: the angle of incidence at the core-cladding interface
        must exceed the critical angle θ_c = arcsin(n_cladding/n_core). At a bend, the outer side of the
        bend experiences a smaller angle of incidence — eventually below θ_c — and light radiates out of
        the fiber ("bend loss"). This is an evanescent field phenomenon: the mode field extends slightly
        beyond the core, and at bends, this evanescent field couples to radiation modes.

        Macrobend loss increases exponentially with decreasing bend radius and increases with wavelength
        (1550nm has higher macrobend loss than 1310nm for standard fiber). For standard G.652 fiber:
        bend loss becomes significant below 30mm bend radius; below 15mm, loss is catastrophic.

        G.657 bend-insensitive fiber (introduced for FTTH to handle tight bends in homes) uses two strategies:
        (1) Trench-assisted design: a depressed-index "trench" region in the cladding surrounding the core.
        When light attempts to radiate at a bend, the trench reflects it back — acting as a secondary
        waveguide boundary that catches leaking modes. (2) Smaller mode field diameter (MFD): tighter mode
        confinement means the evanescent field extends less into the cladding, reducing bend sensitivity.

        G.657.A2 specifies maximum attenuation increase of 0.1 dB/turn at 7.5mm bend radius at 1550nm.
        The tradeoff: G.657 splice compatibility with G.652 is slightly reduced (MFD mismatch causes
        small splice loss), though modern fusion splicers compensate with TEC (thermally expanded core)
        technique. G.657 is now deployed in all FTTH installations globally.
      </IQ>

      <Divider />

      <KeyTakeaways items={[
        'Twisted pair cable uses differential signaling — twisting cancels common-mode noise. More twists per inch = higher frequency support = faster speeds.',
        '100m is the hard limit for all copper Ethernet standards. Beyond that: add a switch, use fiber, or use a media converter.',
        'Cat5e: 1G/100m. Cat6: 10G/55m. Cat6A: 10G/100m. Cat8: 40G/30m. Always label your cables.',
        'Single-mode fiber (yellow jacket, 8-10μm core): long distance (km+), requires expensive lasers. Multi-mode (aqua/orange, 50μm): short distance (<400m), cheap VCSELs.',
        'LC is the dominant data center fiber connector. MPO/MTP carries 12-24 fibers in one push-on connector for 40G/100G/400G parallel optics.',
        'SFP form factor modules define port capability — speed, fiber type, distance. Hot-swappable. Third-party modules often work; test first.',
        'PoE delivers up to 100W (802.3bt Type 4) over copper. Total switch PoE budget limits how many devices you can power simultaneously.',
        'Dirty fiber connectors are the #1 cause of fiber link failures. Clean every connector before mating, every time.',
        'Optical power budget: TX power - RX sensitivity = available loss. Add connector, cable, and splice losses + 3 dB safety margin. Must be below budget.',
        'Cable test with a continuity tester only checks connectivity. Certification testing (Fluke DSX) tests insertion loss, NEXT, return loss — required before accepting any installation.',
      ]} />
    </LearnLayout>
  )
}
