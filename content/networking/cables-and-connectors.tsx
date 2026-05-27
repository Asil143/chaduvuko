'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

// ─── Design tokens ────────────────────────────────────────────────────────────
const G = '#10b981'
const FONT_MONO = 'var(--font-mono)'
const FONT_DISPLAY = 'var(--font-display)'

// ─── Helper components ────────────────────────────────────────────────────────

function Chapter({ n, title, subtitle }: { n: string; title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontSize: 11, color: G, fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 6px', letterSpacing: '.12em' }}>
        // CHAPTER {n}
      </p>
      <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: 15, color: 'var(--muted)', margin: '8px 0 0', fontStyle: 'italic' }}>{subtitle}</p>
      )}
    </div>
  )
}

function Divider() {
  return <div style={{ borderTop: '1px solid var(--border)', margin: '56px 0' }} />
}

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
  return <strong style={{ color: G, fontWeight: 700 }}>{children}</strong>
}

function StoryBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: `4px solid #3b82f6`, background: 'rgba(59,130,246,0.07)', borderRadius: '0 10px 10px 0', padding: '18px 22px', margin: '28px 0' }}>
      <p style={{ fontSize: 11, color: '#60a5fa', fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>// REAL-WORLD SCENARIO</p>
      <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

function WowBox({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'rgba(16,185,129,0.08)', border: `1px solid rgba(16,185,129,0.25)`, borderRadius: 12, padding: '18px 22px', margin: '28px 0' }}>
      <p style={{ fontSize: 13, color: G, fontWeight: 800, margin: '0 0 8px' }}>{emoji} {title}</p>
      <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

function Warn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: 12, padding: '18px 22px', margin: '28px 0' }}>
      <p style={{ fontSize: 13, color: '#fbbf24', fontWeight: 800, margin: '0 0 8px' }}>⚠ {title}</p>
      <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

function Err({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: '18px 22px', margin: '28px 0' }}>
      <p style={{ fontSize: 13, color: '#f87171', fontWeight: 800, margin: '0 0 8px' }}>✗ Common Mistake — {title}</p>
      <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

function IQ({ q, level, children }: { q: string; level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    Beginner: '#34d399', Intermediate: '#60a5fa', Senior: '#a78bfa', PhD: '#f472b6',
  }
  const c = colors[level]
  return (
    <div style={{ border: `1px solid ${c}33`, borderRadius: 12, padding: '18px 22px', margin: '18px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontFamily: FONT_MONO, fontWeight: 700, color: c, background: `${c}18`, padding: '3px 10px', borderRadius: 99 }}>{level}</span>
        <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', margin: 0 }}>{q}</p>
      </div>
      <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

function CodeBlock({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#0d1117', borderRadius: 10, overflow: 'hidden', margin: '20px 0', border: '1px solid #30363d' }}>
      {title && (
        <div style={{ background: '#161b22', padding: '8px 16px', borderBottom: '1px solid #30363d', fontSize: 12, color: '#8b949e', fontFamily: FONT_MONO }}>
          {title}
        </div>
      )}
      <pre style={{ margin: 0, padding: '16px 20px', fontSize: 13, lineHeight: 1.7, color: '#e6edf3', fontFamily: FONT_MONO, overflowX: 'auto', whiteSpace: 'pre' }}>
        {children}
      </pre>
    </div>
  )
}

// ─── Interactive: Cable Comparison Explorer ───────────────────────────────────

const CABLES = [
  {
    key: 'cat5e',
    label: 'Cat5e',
    color: '#60a5fa',
    type: 'Twisted Pair (UTP)',
    maxSpeed: '1 Gbps',
    maxDist: '100 m',
    freq: '100 MHz',
    pairs: 4,
    shielded: false,
    use: 'Home networks, older office wiring',
    standard: 'TIA/EIA-568-B.2-1',
    connector: 'RJ-45',
    notes: 'Most common legacy cable. Sufficient for 1 Gbps to desktops. Crosstalk limits it to 1 Gbps at 100m.',
  },
  {
    key: 'cat6',
    label: 'Cat6',
    color: '#34d399',
    type: 'Twisted Pair (UTP/STP)',
    maxSpeed: '10 Gbps (55m) / 1 Gbps (100m)',
    maxDist: '100 m (1G), 55 m (10G)',
    freq: '250 MHz',
    pairs: 4,
    shielded: false,
    use: 'Modern office LANs, new installations',
    standard: 'TIA/EIA-568-B.2-1',
    connector: 'RJ-45',
    notes: 'Stricter twist rates and larger conductor diameter vs Cat5e. Internal separator (spline) reduces crosstalk. 10G only to 55m without shielding.',
  },
  {
    key: 'cat6a',
    label: 'Cat6a',
    color: '#f59e0b',
    type: 'Twisted Pair (UTP/STP/SFTP)',
    maxSpeed: '10 Gbps',
    maxDist: '100 m',
    freq: '500 MHz',
    pairs: 4,
    shielded: true,
    use: 'Datacenter horizontal runs, 10G to desktop',
    standard: 'TIA/EIA-568-B.2-10',
    connector: 'RJ-45',
    notes: 'Augmented Category 6 — eliminates alien crosstalk (AXT) from adjacent cables. Thicker and stiffer. Shielded variants need grounded patch panels.',
  },
  {
    key: 'cat8',
    label: 'Cat8',
    color: '#a78bfa',
    type: 'Twisted Pair (SFTP)',
    maxSpeed: '25 Gbps (Cat8.1) / 40 Gbps (Cat8.2)',
    maxDist: '30 m',
    freq: '2000 MHz',
    pairs: 4,
    shielded: true,
    use: 'Datacenter top-of-rack switch to server',
    standard: 'TIA/EIA-568-C.2-1',
    connector: 'RJ-45 (Cat8.1) / TERA/ARJ45 (Cat8.2)',
    notes: 'Always shielded. 30m limit makes it datacenter-only. 2 GHz bandwidth with PAM4 signaling. Replacing short fiber runs in dense datacenter environments.',
  },
  {
    key: 'smf',
    label: 'Single-Mode Fiber',
    color: '#f472b6',
    type: 'Optical Fiber',
    maxSpeed: '100 Gbps+ per lambda',
    maxDist: '80 km (unamplified), 10,000+ km (amplified)',
    freq: 'THz (C-band 191–196 THz)',
    pairs: 1,
    shielded: false,
    use: 'WAN, campus backbone, datacenter interconnect',
    standard: 'ITU-T G.652/G.654/G.655',
    connector: 'LC, SC, FC, MPO',
    notes: '9 µm core. Single light path = no modal dispersion. 0.2 dB/km attenuation at 1550nm. Requires laser (not LED) sources. Supports DWDM with 80–160 wavelengths.',
  },
  {
    key: 'mmf',
    label: 'Multi-Mode Fiber',
    color: '#fb923c',
    type: 'Optical Fiber',
    maxSpeed: '100 Gbps (OM5), 40 Gbps (OM4)',
    maxDist: '400 m (OM4/100G), 150 m (OM3/100G)',
    freq: 'THz',
    pairs: 1,
    shielded: false,
    use: 'Datacenter intra-building, campus backbone',
    standard: 'TIA-492AAAE (OM5), ISO/IEC 11801',
    connector: 'LC, SC, MPO',
    notes: '50 µm core (OM3/4/5) or 62.5 µm (OM1/2). Multiple light modes cause modal dispersion limiting distance. Cheaper transceivers (VCSEL vs DFB laser). OM5 supports SWDM4 (4 wavelengths on one fiber).',
  },
  {
    key: 'coax',
    label: 'Coaxial',
    color: '#94a3b8',
    type: 'Coaxial (center conductor + shield)',
    maxSpeed: '10 Mbps (10BASE-2/5) / GHz for cable TV',
    maxDist: '185 m (10BASE-2) / 500 m (10BASE-5)',
    freq: '1 GHz+ (DOCSIS)',
    pairs: 1,
    shielded: true,
    use: 'Cable TV/internet (DOCSIS), legacy Ethernet, CCTV',
    standard: 'RG-6 (cable), RG-58 (legacy Ethernet)',
    connector: 'F-type (cable), BNC (legacy), N-type (RF)',
    notes: 'Center conductor surrounded by dielectric and braid/foil shield. Ground and signal share the same cable. Still dominant for last-mile cable internet and RF applications.',
  },
]

function CableExplorer() {
  const [active, setActive] = useState('cat6')
  const cable = CABLES.find(c => c.key === active)!

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '28px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 16px' }}>// CABLE TYPE EXPLORER</p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
        {CABLES.map(c => (
          <button key={c.key} onClick={() => setActive(c.key)}
            style={{ padding: '6px 14px', borderRadius: 8, fontSize: 12, fontFamily: FONT_MONO, fontWeight: 700, cursor: 'pointer', border: `1px solid ${c.key === active ? c.color : 'var(--border)'}`, background: c.key === active ? `${c.color}18` : 'transparent', color: c.key === active ? c.color : 'var(--muted)' }}>
            {c.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 16 }}>
        {[
          { label: 'Type',      val: cable.type },
          { label: 'Max Speed', val: cable.maxSpeed },
          { label: 'Max Distance', val: cable.maxDist },
          { label: 'Bandwidth', val: cable.freq },
          { label: 'Shielded',  val: cable.shielded ? 'Yes (STP/SFTP)' : 'No (UTP)' },
          { label: 'Connector', val: cable.connector },
          { label: 'Standard',  val: cable.standard },
          { label: 'Use Case',  val: cable.use },
        ].map(row => (
          <div key={row.label} style={{ background: 'var(--bg)', borderRadius: 8, padding: '10px 14px', border: '1px solid var(--border)' }}>
            <p style={{ fontSize: 11, color: 'var(--muted)', margin: '0 0 3px', fontFamily: FONT_MONO }}>{row.label}</p>
            <p style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600, margin: 0 }}>{row.val}</p>
          </div>
        ))}
      </div>
      <div style={{ background: `${cable.color}0d`, border: `1px solid ${cable.color}33`, borderRadius: 10, padding: '12px 16px' }}>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{cable.notes}</p>
      </div>
    </div>
  )
}

// ─── Interactive: Fiber Connector Identifier ─────────────────────────────────

const CONNECTORS = [
  {
    key: 'lc',
    label: 'LC',
    color: '#60a5fa',
    fullName: 'Lucent Connector (Little Connector)',
    ferrule: '1.25 mm',
    use: 'Datacenter, enterprise SFP/SFP+ transceivers',
    duplex: 'Yes (LC duplex = 2 fibers in one housing)',
    desc: 'The dominant fiber connector in modern datacenters and enterprise networking. Small form factor allows high-density patch panels. Pull-tab or push-pull latch mechanism. Standard on all SFP, SFP+, SFP28, and QSFP transceivers.',
  },
  {
    key: 'sc',
    label: 'SC',
    color: '#34d399',
    fullName: 'Subscriber Connector (Square Connector)',
    ferrule: '2.5 mm',
    use: 'Telco/ISP, older enterprise, GPON ONT',
    duplex: 'SC/APC duplex (two SC side by side)',
    desc: 'Push-pull mechanism — snap in, pull out. Larger than LC but very reliable. Color coded: SC/PC = blue (physical contact), SC/APC = green (angled physical contact, 8° angle reduces back-reflection). ISPs use SC/APC for GPON fiber-to-home.',
  },
  {
    key: 'st',
    label: 'ST',
    color: '#f59e0b',
    fullName: 'Straight Tip',
    ferrule: '2.5 mm',
    use: 'Legacy campus multi-mode fiber',
    duplex: 'No (separate TX and RX connectors)',
    desc: 'Bayonet-style twist-lock mechanism. Common in buildings wired in the 1990s–2000s. Largely replaced by SC and LC. Still found in legacy campus networks and some security camera systems. Requires careful alignment — the bayonet can loosen under vibration.',
  },
  {
    key: 'mpo',
    label: 'MPO/MTP',
    color: '#a78bfa',
    fullName: 'Multi-fiber Push On / MTP (brand name)',
    ferrule: '12 or 24 fibers in one ferrule',
    use: '40G/100G/400G datacenter parallel optics',
    duplex: '12-fiber or 24-fiber ribbon',
    desc: 'Carries 12 or 24 fibers in a single connector. Essential for 40GBASE-SR4 (uses 4 TX + 4 RX fibers), 100GBASE-SR4 (same), and 400G-SR8. MPO polarity (Type A/B/C) must match — wrong polarity = TX→TX, RX→RX (no signal). MTP is a higher-precision brand of MPO from US Conec.',
  },
  {
    key: 'fc',
    label: 'FC',
    color: '#f472b6',
    fullName: 'Fiber Channel / Ferrule Connector',
    ferrule: '2.5 mm',
    use: 'Test equipment, telecom, Fibre Channel SAN',
    duplex: 'No (separate fibers)',
    desc: 'Screw-on threaded coupling — highest mechanical stability of any fiber connector. Used in environments with vibration (aircraft, industrial). Also used on optical test equipment (OTDR, optical power meters) because screwing in ensures consistent physical contact every time. Slower to connect/disconnect than LC/SC.',
  },
  {
    key: 'sfp',
    label: 'SFP/SFP+/SFP28',
    color: '#fb923c',
    fullName: 'Small Form-factor Pluggable transceiver',
    ferrule: 'Uses LC or MPO internally',
    use: '1G/10G/25G switch ports, routers',
    duplex: 'Duplex LC or BiDi (single fiber, two wavelengths)',
    desc: 'Not a connector but a hot-pluggable transceiver module. SFP = 1 Gbps (1000BASE-SX/LX/ZX). SFP+ = 10 Gbps (10GBASE-SR/LR/ER). SFP28 = 25 Gbps. BiDi SFP uses one fiber with TX and RX on different wavelengths (1310nm TX / 1490nm RX). Plugs into switch/router SFP cages. DOM (Digital Optical Monitoring) provides TX power, RX power, temperature, voltage via SNMP.',
  },
]

function ConnectorExplorer() {
  const [active, setActive] = useState('lc')
  const conn = CONNECTORS.find(c => c.key === active)!

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '28px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 16px' }}>// FIBER CONNECTOR / TRANSCEIVER EXPLORER</p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
        {CONNECTORS.map(c => (
          <button key={c.key} onClick={() => setActive(c.key)}
            style={{ padding: '6px 14px', borderRadius: 8, fontSize: 12, fontFamily: FONT_MONO, fontWeight: 700, cursor: 'pointer', border: `1px solid ${c.key === active ? c.color : 'var(--border)'}`, background: c.key === active ? `${c.color}18` : 'transparent', color: c.key === active ? c.color : 'var(--muted)' }}>
            {c.label}
          </button>
        ))}
      </div>
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', margin: '0 0 4px' }}>{conn.fullName}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10, marginTop: 12 }}>
          {[
            { label: 'Ferrule / Form',  val: conn.ferrule },
            { label: 'Primary Use',     val: conn.use },
            { label: 'Duplex Support',  val: conn.duplex },
          ].map(r => (
            <div key={r.label} style={{ background: 'var(--bg)', borderRadius: 8, padding: '10px 14px', border: '1px solid var(--border)' }}>
              <p style={{ fontSize: 11, color: 'var(--muted)', margin: '0 0 3px', fontFamily: FONT_MONO }}>{r.label}</p>
              <p style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600, margin: 0 }}>{r.val}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: `${conn.color}0d`, border: `1px solid ${conn.color}33`, borderRadius: 10, padding: '14px 16px' }}>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>{conn.desc}</p>
      </div>
    </div>
  )
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function CablesAndConnectors() {
  return (
    <LearnLayout
      title="Cables & Connectors"
      description="A complete, gap-free treatment of every physical medium used in networking — twisted-pair copper, fiber optic, coaxial, and wireless — plus connectors, transceivers, PoE, structured cabling, and physical layer troubleshooting."
      section="Networking Fundamentals"
      readTime="50 min"
    >
      {/* ── Ch 01 ── */}
      <Chapter n="01" title="Why Physical Layer Knowledge Matters" subtitle="Software breaks — but so does hardware, and usually at the worst time" />
      <Para>
        Network engineers who understand only protocols will be stumped the moment a physical layer problem appears — and physical layer problems are common. The <Accent>most common cause of network outages</Accent> in enterprise environments is physical layer failures: bad cables, dirty fiber connectors, wrong transceiver types, and wiring mistakes. No amount of BGP expertise helps when the cable is bent too tightly around a corner.
      </Para>
      <Para>
        The physical layer defines: what the medium is (copper, glass, air), how signals propagate through it, what connectors terminate it, how far it can reach, and how fast it can carry data. Understanding these constraints lets you make the right decisions when designing infrastructure, troubleshoot problems without guesswork, and interpret diagnostic output (cable testers, OTDRs, DOM readings) correctly.
      </Para>
      <StoryBox>
        A datacenter migration is complete. Most racks are up. But 8 servers in one rack have no connectivity. You swap the switch, re-seat the cables, check the MAC table — nothing. After 90 minutes of software troubleshooting, someone notices the fiber runs to that rack are OM3 multi-mode, but the new switches use SFP+ transceivers rated for single-mode only. The light is at the wrong wavelength — the transceivers are physically incompatible. 90 minutes wasted because no one checked the physical layer first. Physical layer first is not just a rule — it's how you save your career.
      </StoryBox>

      <Divider />

      {/* ── Ch 02 ── */}
      <Chapter n="02" title="Copper Twisted-Pair Cables" subtitle="Cat5e through Cat8 — the complete guide" />
      <Para>
        Twisted-pair copper cable is the dominant medium for horizontal wiring (from patch panel to desk/server). It consists of four pairs of copper wires, each pair individually twisted. The twisting is the key: it ensures that external noise (EMI) hits both wires in a pair at nearly the same time, and the differential receiver subtracts the common noise. The result is that external interference cancels out.
      </Para>
      <Para>
        Different pairs have different twist rates (turns per meter) — this is how they minimize crosstalk between pairs. If two adjacent pairs had identical twist rates, their interference would add coherently. Different rates cause the interference to average out over the cable's length.
      </Para>

      <CableExplorer />

      <H2>UTP vs STP vs FTP vs SFTP</H2>
      <Para>
        <Accent>UTP (Unshielded Twisted Pair):</Accent> No shielding. Relies entirely on the balanced differential signaling and twist rates to cancel noise. Lighter, cheaper, easier to terminate. Most Cat5e and Cat6 cables are UTP. Works well in typical office environments.
      </Para>
      <Para>
        <Accent>STP (Shielded Twisted Pair):</Accent> Each individual pair has its own foil shield. Reduces crosstalk between pairs and EMI. Heavier, stiffer, more expensive. Must be grounded at one end only (grounding both ends creates a ground loop — a 60 Hz hum that actually degrades SNR).
      </Para>
      <Para>
        <Accent>FTP / ScTP (Foil Twisted Pair / Screened):</Accent> Overall foil shield around all four pairs, but pairs themselves unshielded. Common in Europe. Better EMI resistance than UTP, less complex than STP.
      </Para>
      <Para>
        <Accent>SFTP (Shielded Foil Twisted Pair / S/FTP):</Accent> Each pair has individual foil + an overall braid shield. Maximum noise rejection. Used in Cat6a, Cat7, Cat8. Mandatory for high-EMI industrial environments (factory floors, elevator shafts, near heavy machinery).
      </Para>

      <H2>T568A vs T568B Wiring Standards</H2>
      <Para>
        RJ-45 connectors have 8 pins. Two wiring standards define which wire color goes in which pin. Both standards work for Ethernet — the standard you choose simply must be consistent at both ends.
      </Para>
      <CodeBlock title="T568A and T568B pin assignments">
{`Pin   T568A                T568B
─────────────────────────────────────
1     White/Green          White/Orange
2     Green                Orange
3     White/Orange         White/Green
4     Blue                 Blue
5     White/Blue           White/Blue
6     Orange               Green
7     White/Brown          White/Brown
8     Brown                Brown

Pairs:
  Pair 1: Blue/White-Blue   (pins 4,5) — least used, PoE
  Pair 2: Orange/White-Orange (pins 1,6 in T568B) — 100/1000BASE-T TX
  Pair 3: Green/White-Green (pins 3,6 in T568A / 1,2 in T568B) — RX
  Pair 4: Brown/White-Brown (pins 7,8) — 1000BASE-T only

Straight-through cable: same standard at both ends (T568B↔T568B)
  → used to connect different devices: PC to switch, switch to router

Crossover cable: T568A at one end, T568B at the other
  → swaps TX and RX pairs
  → used to connect same-type devices: PC to PC, switch to switch
  → largely obsolete with Auto-MDI/MDI-X (modern devices detect and swap automatically)`}
      </CodeBlock>

      <H2>Cable Categories — Technical Details</H2>
      <CodeBlock title="Ethernet standards by cable category">
{`Category  Bandwidth  Max Speed   Max Dist  Ethernet Standard
──────────────────────────────────────────────────────────────
Cat3      16 MHz     10 Mbps     100 m     10BASE-T (obsolete)
Cat5      100 MHz    100 Mbps    100 m     100BASE-TX (obsolete)
Cat5e     100 MHz    1 Gbps      100 m     1000BASE-T
Cat6      250 MHz    1 Gbps      100 m     1000BASE-T
                     10 Gbps      55 m     10GBASE-T
Cat6a     500 MHz    10 Gbps     100 m     10GBASE-T
Cat7      600 MHz    10 Gbps     100 m     10GBASE-T (non-standard connector)
Cat7a    1000 MHz    40 Gbps*    100 m     *not widely adopted
Cat8     2000 MHz    25/40 Gbps   30 m     25GBASE-T / 40GBASE-T

* The "100 m" rule: all categories limited to 100m for horizontal runs per TIA-568.
  This is a standards mandate, not a physical limitation — some cables work beyond 100m
  but are not guaranteed and are not supported by equipment warranties.`}
      </CodeBlock>

      <H2>Bend Radius and Installation Rules</H2>
      <Para>
        <Accent>Minimum bend radius:</Accent> Twisting a cable too tightly changes the geometry of the twist rates, increasing crosstalk and altering impedance. Minimum bend radius for installed Cat6 UTP is 4× the cable diameter (~25–30 mm). For Cat6a, it's larger due to the thicker cable. Cable management systems (J-hooks, ladder trays, velcro ties) must respect bend radius — zip ties cranked tight around a bundle crush the cables and degrade performance.
      </Para>
      <Para>
        <Accent>Pair untwisting at termination:</Accent> When punching down to a patch panel or terminating an RJ-45, the pairs must not be untwisted more than 13 mm (0.5 inch) from the point of termination. This is a hard TIA/EIA requirement. Untwisting more than 13 mm introduces crosstalk at the termination point — a very common wiring error that causes intermittent gigabit failures.
      </Para>
      <Para>
        <Accent>Pull tension:</Accent> Do not exceed 25 lbs (110 N) pull tension during installation. Exceeding this stretches the cable, changes conductor diameter, and permanently increases resistance and alters impedance matching.
      </Para>

      <Warn title="Never use Cat5e for new installations">
        <Para>Even if Cat5e costs slightly less, new installations should always use Cat6a minimum. The cost difference over the lifetime of a building's wiring (typically 15–20 years) is negligible, but rewiring for 10G later is enormously expensive. Labor cost is 80–90% of a cabling project — the cable material cost is a small fraction. Always install for the next generation, not the current one.</Para>
      </Warn>

      <Divider />

      {/* ── Ch 03 ── */}
      <Chapter n="03" title="Fiber Optic Cables" subtitle="Glass threads that carry terabits on light" />
      <Para>
        Fiber optic cable transmits data as pulses of light through a glass or plastic core. It is immune to electromagnetic interference, supports far longer distances than copper, and can carry terabits per second using wavelength division multiplexing. Understanding fiber is essential for any engineer working with datacenter interconnects, campus backbones, or WAN links.
      </Para>

      <H2>How Fiber Works — Total Internal Reflection</H2>
      <Para>
        Light travels through the fiber core by <Accent>total internal reflection</Accent>. The core has a higher refractive index than the surrounding cladding. When light hits the core-cladding boundary at an angle less than the critical angle, it reflects completely back into the core — no light escapes. The critical angle is determined by Snell's Law: sin(θc) = n₂/n₁, where n₁ = core refractive index, n₂ = cladding refractive index.
      </Para>
      <Para>
        In single-mode fiber (9 µm core), the core is so narrow that only one light mode (ray path) can propagate — straight down the center. In multi-mode fiber (50 or 62.5 µm core), the wider core allows multiple light modes at different angles, which arrive at the receiver at slightly different times — <Accent>modal dispersion</Accent>. This limits multi-mode fiber's usable length because at some distance the pulse spreading from modal dispersion causes inter-symbol interference.
      </Para>

      <H2>Fiber Categories — OM1 through OM5, OS1, OS2</H2>
      <CodeBlock title="Fiber categories — complete specification">
{`Multi-Mode Fiber (MMF) — 50 µm or 62.5 µm core:
Category  Core    Bandwidth (850nm)  Max Dist (10G)  Max Dist (100G) Color
─────────────────────────────────────────────────────────────────────────
OM1       62.5µm  200 MHz·km         33 m (10GBASE-SR) N/A            Orange
OM2       50 µm   500 MHz·km         82 m              N/A            Orange
OM3       50 µm   2000 MHz·km        300 m             70 m (100G)    Aqua
OM4       50 µm   4700 MHz·km        400 m             150 m          Aqua/Violet
OM5       50 µm   28000 MHz·km       400 m             400 m (SWDM4)  Lime green

Single-Mode Fiber (SMF) — 9 µm core:
Category   Attenuation (1310nm)  Max Dist  Application   Color
──────────────────────────────────────────────────────────────────
OS1 (ITU G.652)  ≤1.0 dB/km     ~10 km    Indoor, tight buffer  Yellow
OS2 (ITU G.652D) ≤0.4 dB/km     80+ km    Outdoor loose tube    Yellow
G.654           ≤0.17 dB/km     400+ km   Ultra-low loss submarine Yellow

Note: OS1/OS2 are installation/cable specifications; G.652/G.654 are fiber specifications.`}
      </CodeBlock>

      <H2>Single-Mode vs Multi-Mode — When to Use Which</H2>
      <Para>
        <Accent>Use multi-mode when:</Accent> distance is under 400 m (OM4/OM5), you need many connections in a small space (datacenter within a building), budget is constrained (VCSEL transceivers for MMF are cheaper than DFB lasers for SMF).
      </Para>
      <Para>
        <Accent>Use single-mode when:</Accent> distance exceeds 400 m, you need future-proofing (SMF supports DWDM, terabit-scale upgrades), or you're connecting buildings/campuses. SMF transceivers cost more today but the fiber itself is installed once and lasts 25+ years — always install SMF for inter-building runs even if you only need 1 Gbps today.
      </Para>

      <H2>Fiber Connectors and Polish Types</H2>
      <ConnectorExplorer />

      <H2>PC vs APC — Why the Polish Type Matters</H2>
      <Para>
        <Accent>PC (Physical Contact):</Accent> The fiber end face is polished to a curved (dome) shape so the glass cores touch directly — reducing air gap back-reflections. Return loss: -40 to -50 dB. Used for most data applications.
      </Para>
      <Para>
        <Accent>APC (Angled Physical Contact):</Accent> The end face is polished at an 8° angle. Any reflected light exits at an angle that doesn't return down the fiber — return loss: -60 to -70 dB. Critical for: analog RF over fiber (cable TV), DWDM systems (back-reflections can destabilize lasers), and high-gain amplified links. APC connectors are green; PC connectors are blue.
      </Para>
      <Para>
        <Accent>Never mate APC with PC.</Accent> The 8° angle creates a physical gap between the end faces, causing 10+ dB of insertion loss — your link will fail. APC connectors are physically keyed to prevent accidental mating in some connector types but not all.
      </Para>

      <Err title="Mixing APC and PC connectors">
        <Para>Connecting an APC patch cord to a PC adapter (or vice versa) creates a misaligned physical interface with extremely high insertion loss. The connector housings are the same for SC — only the color (green vs blue) and the internal ferrule angle differ. Always verify the polish type matches at both ends. For GPON/FTTH, the ONT uses SC/APC — using SC/PC will cause your fiber internet to fail or have severe packet loss.</Para>
      </Err>

      <H2>Fiber Construction — Cable Types</H2>
      <Para>
        <Accent>Tight-buffered fiber:</Accent> Each fiber is directly coated with a 900 µm plastic buffer. More flexible, easier to handle for short indoor runs and patch cords. Higher attenuation specification (OS1) due to stress from the tight buffer.
      </Para>
      <Para>
        <Accent>Loose-tube fiber:</Accent> Fibers float freely in a gel-filled tube (the gel blocks water migration). Multiple tubes in a single cable jacket. The gel absorbs mechanical stress — fibers are not stressed when the cable bends or expands/contracts with temperature. Standard for outdoor, aerial, and direct-burial applications. Can contain 2–864 fibers in a single cable.
      </Para>
      <Para>
        <Accent>Ribbon fiber:</Accent> 12 fibers arranged side-by-side and bonded into a flat ribbon. Mass fusion splicers can splice all 12 fibers simultaneously (12-fiber mass splice takes the same time as a single fusion splice). Used in ultra-high-density datacenter and campus cabling. 432-fiber ribbon cables are common in modern datacenter trays.
      </Para>
      <Para>
        <Accent>Armored fiber:</Accent> Steel or corrugated aluminum armor layer between inner and outer jacket. Protects against rodent damage (crucial for direct-burial) and crushing. Used for outdoor/underground runs and in some industrial environments.
      </Para>

      <H2>Fiber Optic Loss Budget</H2>
      <Para>
        Every fiber link has a loss budget — the maximum signal attenuation it can tolerate while still working. To validate a link:
      </Para>
      <CodeBlock title="Fiber loss budget calculation">
{`Loss Budget = (Transmitter output power) - (Receiver sensitivity)

Example: 10GBASE-LR (10G, 10km single-mode, 1310nm)
  TX power: -1 dBm (typical)
  RX sensitivity: -14.4 dBm (minimum)
  Loss budget: -1 - (-14.4) = 13.4 dB

Actual link losses:
  Fiber run:      2 km × 0.35 dB/km = 0.7 dB
  2 splices:      2 × 0.1 dB = 0.2 dB
  4 connectors:   4 × 0.5 dB = 2.0 dB
  Total loss:     2.9 dB

Safety margin: 13.4 - 2.9 = 10.5 dB remaining margin  ← link will work

Rule of thumb loss allowances:
  Fusion splice:  0.1 dB (good), 0.3 dB (acceptable), >0.5 dB (redo it)
  Connector pair: 0.3–0.5 dB (clean), >1.0 dB = dirty/damaged (clean/replace)
  SMF at 1310nm: 0.35 dB/km
  SMF at 1550nm: 0.20 dB/km (lower loss — used for long haul)
  MMF OM3/4 at 850nm: 2.0–3.5 dB/km`}
      </CodeBlock>

      <H2>Fusion Splicing vs Mechanical Splicing</H2>
      <Para>
        <Accent>Fusion splicing:</Accent> An electric arc melts the two fiber ends and fuses them together — permanent, low-loss (0.02–0.1 dB). Requires a fusion splicer (expensive, ~$3,000–$10,000). The dominant method for permanent installations. The splice is protected by a heat-shrink sleeve.
      </Para>
      <Para>
        <Accent>Mechanical splicing:</Accent> Two fibers held in alignment by a mechanical fixture with index-matching gel between the ends — no fusion. Loss: 0.1–0.5 dB. Faster (no heat-shrink wait time), cheaper tooling. Used for temporary repairs, emergency restoration. Not recommended for permanent high-quality links.
      </Para>
      <Para>
        <Accent>Field-terminated connectors (factory-polished):</Accent> A pre-polished stub fiber inside a connector body. The field fiber is cleaved and inserted; index-matching gel at the junction. No fusion splicer needed. Common for terminating in tight spaces (rack-mounted closures). Loss: 0.3–0.5 dB per connector — acceptable for most links.
      </Para>

      <Divider />

      {/* ── Ch 04 ── */}
      <Chapter n="04" title="Coaxial Cable" subtitle="From 10BASE-5 to DOCSIS 3.1 — still powering cable internet" />
      <Para>
        Coaxial cable (coax) has a center conductor surrounded by a dielectric insulator, a braided or foil ground shield, and an outer jacket. The shield is concentric with (coaxial to) the center conductor — hence the name. Because the signal and return path are concentric, the cable is self-shielding: external fields cancel because they affect the center conductor and shield equally.
      </Para>

      <H2>Coax in Legacy Ethernet</H2>
      <Para>
        <Accent>10BASE-5 (Thicknet):</Accent> The original Ethernet (1980) used 10 mm coax (RG-8 / Type N connectors). Nodes tapped into the cable with a "vampire tap" — a connector that pierced the outer sheath without cutting the cable. Maximum segment length: 500 m. Called a "bus topology" — all nodes shared the same cable, used CSMA/CD. Maximum 100 nodes per segment. Still seen in old industrial automation wiring.
      </Para>
      <Para>
        <Accent>10BASE-2 (Thinnet/Cheapernet):</Accent> Thinner RG-58 coax (BNC connectors). Maximum segment: 185 m, 30 nodes. Segments connected with BNC T-connectors at each node — the cable literally plugged into the back of the PC. Both ends required 50-ohm termination resistors. If the terminator was missing or a T-connector failed, the entire segment lost connectivity.
      </Para>
      <Para>
        Both are completely obsolete for Ethernet. However, the bus topology principle and 50-ohm impedance matching are still relevant in RF engineering.
      </Para>

      <H2>Coax in Modern Cable Internet (DOCSIS)</H2>
      <Para>
        Cable TV (CATV) and cable internet use RG-6 coax (75-ohm impedance) from the street-side tap to the subscriber's modem (or directly to the cable box). This last-mile coax is not bus topology — each subscriber has their own dedicated coax run from a tap on the distribution cable.
      </Para>
      <Para>
        <Accent>DOCSIS 3.1</Accent> (Data Over Cable Service Interface Specification) achieves download speeds up to 10 Gbps on existing coax plant using OFDM with up to 4096-QAM on channels up to 192 MHz wide. The cable plant amplifiers (trunk amplifiers) every 500–800 m add noise and intermodulation distortion — this is why cable internet SNR decreases during peak usage (more users = more upstream RF noise).
      </Para>
      <Para>
        <Accent>MoCA (Multimedia over Coax Alliance):</Accent> Uses existing in-home coax (originally installed for cable TV) to create a gigabit home network. MoCA 2.5 achieves 2.5 Gbps using the 1.125–1.675 GHz band — above the DOCSIS upstream and downstream bands, so both can coexist on the same coax.
      </Para>

      <H2>Coax Connectors</H2>
      <Para>
        <Accent>F-type (threaded):</Accent> Standard for cable TV and DOCSIS. Crimped or compression-type. The center conductor is the actual cable center conductor (no pin). 75-ohm. F-type connectors must be properly torqued — a loose F connector is one of the most common causes of cable internet problems (intermittent loss, poor SNR).
      </Para>
      <Para>
        <Accent>BNC (Bayonet Neill-Concelman):</Accent> Quarter-turn bayonet lock. 50-ohm (network use) or 75-ohm (video). Used on legacy Thinnet Ethernet, oscilloscopes, video broadcast equipment (SDI video), and network test equipment.
      </Para>
      <Para>
        <Accent>N-type:</Accent> Large threaded connector for high-power, high-frequency RF applications (cellular base stations, microwave antennas). 50-ohm. Handles up to 11 GHz on some versions.
      </Para>
      <Para>
        <Accent>SMA/SMB:</Accent> Small RF connectors for microwave frequencies (up to 18 GHz for SMA). Used on WiFi antenna pigtails, test equipment, RF modules.
      </Para>

      <Divider />

      {/* ── Ch 05 ── */}
      <Chapter n="05" title="Transceivers and Form Factors" subtitle="SFP, QSFP, DAC, AOC — the pluggable ecosystem" />
      <Para>
        Modern network equipment uses <Accent>pluggable transceivers</Accent> — hot-swappable modules that convert between the electrical signal inside the switch/router and the optical or electrical signal on the cable. This separates the line card from the optical technology, allowing a single switch to support many different speeds, distances, and media types.
      </Para>

      <H2>SFP Family</H2>
      <CodeBlock title="SFP transceiver family — speeds and standards">
{`Form Factor  Speed     Lanes  Application          Connector
──────────────────────────────────────────────────────────────
SFP          1 Gbps    1      1000BASE-SX/LX/ZX    LC duplex
SFP+         10 Gbps   1      10GBASE-SR/LR/ER/ZR  LC duplex
SFP28        25 Gbps   1      25GBASE-SR/LR         LC duplex
SFP56        50 Gbps   1      50GBASE-SR/LR (PAM4)  LC duplex
QSFP+        40 Gbps   4×10G  40GBASE-SR4/LR4       MPO-12 or LC
QSFP28       100 Gbps  4×25G  100GBASE-SR4/LR4/PSM4 MPO-12 or LC
QSFP56       200 Gbps  4×50G  200GBASE-SR4           MPO-12
QSFP-DD      400 Gbps  8×50G  400GBASE-SR8/LR8       MPO-24 or LC
OSFP         400 Gbps  8×50G  400GBASE (datacenter)  MPO/LC
CFP2         100 Gbps  10×10G Long-haul coherent      LC duplex

Speed breakdown for QSFP28 100GBASE-SR4:
  4 transmit lanes × 25 Gbps = 100 Gbps TX
  4 receive lanes  × 25 Gbps = 100 Gbps RX
  Uses MPO-12 connector (4 TX fibers + 4 RX fibers + 4 unused)`}
      </CodeBlock>

      <H2>DAC and AOC Cables</H2>
      <Para>
        <Accent>DAC (Direct Attach Copper):</Accent> A twinaxial copper cable with SFP+/QSFP28/QSFP-DD transceivers permanently attached at each end. No optical conversion — purely electrical. DAC cables are: cheaper than fiber + transceivers, extremely low latency (no optical conversion), but limited to short distances (0.5 m to 7 m typically). Used extensively for top-of-rack switch to server connections in datacenters.
      </Para>
      <Para>
        <Accent>AOC (Active Optical Cable):</Accent> Optical fiber cable with active transceiver modules permanently attached. Lighter and more flexible than DAC at the same reach, with better EMI performance. Typical reach: 1–100 m. More expensive than DAC. Used for longer inter-rack connections within a datacenter row.
      </Para>
      <CodeBlock title="DAC vs AOC vs Optical transceiver comparison">
{`Property          DAC           AOC            Optical (SFP+)
───────────────────────────────────────────────────────────────
Max reach         7 m           100 m          2–40 km (LR)
Cost              Lowest        Medium         Medium-High
Power             Low           Medium         Medium
Signal type       Electrical    Optical        Optical
Flexibility       Stiff         Very flexible  Cable+module separate
Interoperability  Good          Good           Best (any cable)
Latency           Lowest        Low            Low
Use case          TOR to server  Inter-rack    Inter-building

DAC active vs passive:
  Passive DAC: simple copper, no signal conditioning, max 3–5 m
  Active DAC:  signal equalization and re-driving circuitry, up to 7 m`}
      </CodeBlock>

      <H2>Transceiver Compatibility and DOM</H2>
      <Para>
        <Accent>Vendor lock-in:</Accent> Cisco, Juniper, and Arista switches by default reject third-party transceivers. Cisco shows "transceiver is not supported" in the log. Cisco's override command: <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>service unsupported-transceiver</code>. Third-party transceivers are programmed with the correct EEPROM data to pass vendor checks — most work fine but may void support contracts.
      </Para>
      <Para>
        <Accent>DOM (Digital Optical Monitoring / DDM):</Accent> SFF-8472 standard allows transceivers to report real-time diagnostics: TX optical power (dBm), RX optical power (dBm), laser bias current (mA), temperature (°C), and supply voltage (V). Reading DOM values is essential for fiber troubleshooting:
      </Para>
      <CodeBlock title="Reading DOM values — Cisco, Linux">
{`# Cisco IOS / IOS-XE
show interfaces GigabitEthernet0/1 transceiver
  Transceiver Type:       SFP-1000BASE-LX/LH
  Tx Power  (dBm):        -4.2  (normal: -3 to -7 dBm for 1000BASE-LX)
  Rx Power  (dBm):        -8.5  (normal: > -20 dBm = good signal)
  Temperature (Celsius):  42.3  (normal: 0–70°C)
  Voltage (Volts):         3.3

# Linux (ethtool)
ethtool -m eth0
  Transceiver type: External
  Laser output power: 0.3850 mW / -4.14 dBm
  Receiver signal average optical power: 0.1413 mW / -8.50 dBm
  Module temperature: 42.30 degrees C

Interpreting RX power:
  > -3 dBm:   Possibly too strong (saturation risk)
  -3 to -20:  Excellent signal
  -20 to -25: Acceptable (near sensitivity limit)
  < -25 dBm:  Weak — check connectors, fiber bends, attenuation
  No light:   Check TX end, fiber continuity`}
      </CodeBlock>

      <H2>BiDi Transceivers</H2>
      <Para>
        BiDi (Bidirectional) transceivers transmit and receive on <Accent>a single fiber</Accent> using two different wavelengths. One end transmits at 1310 nm and receives at 1490 nm; the other end does the opposite. A wavelength-selective splitter (WDM coupler) inside the transceiver separates TX and RX. Used to double the utilization of existing fiber runs — one fiber pair becomes two independent links. BiDi transceivers must be purchased in matched pairs (the wavelength assignments are reversed at each end).
      </Para>

      <Divider />

      {/* ── Ch 06 ── */}
      <Chapter n="06" title="Power over Ethernet (PoE)" subtitle="Sending power and data on the same cable" />
      <Para>
        Power over Ethernet delivers DC power alongside data over twisted-pair Ethernet cable, eliminating the need for a separate power outlet at every device. PoE is essential for: IP phones, wireless access points, IP cameras, and IoT devices — all devices that need to be mounted away from power outlets.
      </Para>

      <H2>PoE Standards Evolution</H2>
      <CodeBlock title="PoE standards — power levels and pin usage">
{`Standard   IEEE       Power at PSE  Power at PD  Pairs Used  Notes
───────────────────────────────────────────────────────────────────────
PoE        802.3af    15.4 W        12.95 W      2 pairs     Mode A or B
PoE+       802.3at    30 W          25.5 W       2 pairs     Higher current
PoE++/4PPoE 802.3bt   Type 3: 60 W  51 W         All 4 pairs Cat6a req
           802.3bt    Type 4: 90 W   71.3 W      All 4 pairs 4-pair only

PSE = Power Sourcing Equipment (the switch/injector providing power)
PD  = Powered Device (the device receiving power)

Power loss in cable:
  At 15.4W (PoE):   ~2W lost in cable → PD gets 12.95W
  At 90W (PoE++):   ~18.7W lost → PD gets 71.3W
  Loss = I²R. Higher power → higher current → more heat in cable

Temperature rise:
  Bundled cables dissipate heat less efficiently
  802.3bt limits bundle size when using Type 3/4 to prevent overheating
  Cat5e can carry PoE but Cat6a is recommended for Type 3/4 (lower resistance)`}
      </CodeBlock>

      <H2>PoE Detection and Classification</H2>
      <Para>
        A PoE-capable switch (PSE) does not immediately apply power. It first negotiates:
      </Para>
      <Para>
        <Accent>Detection:</Accent> The PSE applies a small probe voltage (2.7–10 V) and measures the current. A valid PD has a 25 kΩ resistor between the data pairs and return — this signature identifies it as PoE-capable. A non-PoE device (standard PC) has no such resistor — the PSE detects this and does not apply power. This prevents frying non-PoE equipment.
      </Para>
      <Para>
        <Accent>Classification:</Accent> The PSE applies 15.5–20.5 V and measures the current drawn by the PD's classification resistor. The PD responds with a current signature indicating its power class (0–8). This tells the PSE how much power to allocate from its power budget.
      </Para>
      <Para>
        <Accent>LLDP-MED power negotiation:</Accent> After link-up, 802.3at/bt devices use LLDP (Link Layer Discovery Protocol) to precisely negotiate power levels — the PD tells the PSE exactly how much power it needs, and the PSE either grants it or reduces the link power.
      </Para>

      <H2>PoE Injectors and Splitters</H2>
      <Para>
        <Accent>PoE injector (midspan):</Accent> A device that adds PoE to an existing non-PoE switch. Data enters on one port, power is injected, and combined data+power exits on another port toward the PD. Useful for retrofitting older switches.
      </Para>
      <Para>
        <Accent>PoE splitter:</Accent> The opposite — takes a PoE-powered cable and separates it into a data-only RJ-45 and a DC power connector. Used for devices that need power but don't have PoE circuits (some older IP cameras, custom devices). The splitter converts the PoE voltage to whatever the device requires (5V, 12V, 19V).
      </Para>

      <Divider />

      {/* ── Ch 07 ── */}
      <Chapter n="07" title="Structured Cabling and TIA-568" subtitle="The standard that defines how buildings are wired" />
      <Para>
        <Accent>Structured cabling</Accent> is a standardized approach to building telecommunications wiring using a hierarchical, star-topology design. TIA-568 (American) and ISO/IEC 11801 (international) define the standards. A properly structured cabling system supports any protocol (voice, data, video) on the same physical infrastructure and makes moves/adds/changes simple.
      </Para>

      <H2>Structured Cabling Hierarchy</H2>
      <Para>
        <Accent>Entrance Facility (EF):</Accent> Where the service provider's infrastructure enters the building. Demarc point (demarcation = boundary between carrier responsibility and building responsibility). Houses the main cross-connect for outside plant fiber.
      </Para>
      <Para>
        <Accent>Main Distribution Frame / Main Cross-Connect (MDF/MC):</Accent> The core of the building's cabling system. Houses the main switches/routers, connections to the EF, and backbone connections to all IDF closets. Typically in the basement or first floor.
      </Para>
      <Para>
        <Accent>Intermediate Distribution Frame / Horizontal Cross-Connect (IDF/HC):</Accent> One per floor or zone. Contains a switch that connects to the MDF via backbone cable (typically fiber) and provides horizontal cable distribution to work areas on that floor.
      </Para>
      <Para>
        <Accent>Horizontal cabling:</Accent> Runs from the IDF patch panel to the work area outlet (wall plate). Maximum 90 m of permanent horizontal cable + 10 m for patch cords = 100 m total. This 90 m + 10 m rule is TIA-568 mandatory.
      </Para>
      <Para>
        <Accent>Work area:</Accent> Wall plate with RJ-45 keystone jack → short patch cord → device. Patch cords count toward the 10 m allowance.
      </Para>

      <H2>Patch Panels and Cross-Connects</H2>
      <Para>
        <Accent>Patch panel:</Accent> A passive panel with RJ-45 ports on the front and punchdown blocks (110-style IDC) on the back. Horizontal cables are punched down to the back; patch cords connect front ports to switch ports. This creates an administration layer — a device can be moved to any switch port by changing one patch cord at the panel, without re-running cable.
      </Para>
      <Para>
        <Accent>Punchdown tool (110-type):</Accent> Used to seat the cable conductor into the IDC (Insulation Displacement Connector) contact. The tool has a high-impact side (cuts excess wire) and low-impact side. Always use the correct category punchdown blade (Cat6a blade vs generic Cat5e blade) — using the wrong blade can damage the contacts.
      </Para>

      <H2>Cable Labeling and Documentation</H2>
      <Para>
        TIA-606 defines cable administration standards. Every cable should be labeled at both ends with a unique identifier. Minimum documentation: cable ID, source location (IDF panel, port number), destination location (wall plate, room, desk number), installation date, and tested performance category. Without documentation, troubleshooting becomes archaeology — never let a cabling installation be undocumented.
      </Para>

      <Divider />

      {/* ── Ch 08 ── */}
      <Chapter n="08" title="Physical Layer Troubleshooting" subtitle="From cable testers to OTDRs — diagnosing every fault type" />
      <Para>
        Physical layer faults are often intermittent and can masquerade as software problems. A disciplined physical-layer-first approach saves hours of frustration.
      </Para>

      <H2>Copper Cable Faults</H2>
      <Para>
        <Accent>Open circuit:</Accent> A conductor is broken — no continuity. The most obvious fault. Caused by: sharp bend that breaks the conductor internally (no visible damage outside), cut, pull damage.
      </Para>
      <Para>
        <Accent>Short circuit:</Accent> Two conductors (in the same or different pairs) touch. Caused by: over-stripped wire during termination, damaged jacket.
      </Para>
      <Para>
        <Accent>Split pair:</Accent> The two wires of a logical pair are wired with wires from different physical pairs — so the pair appears continuous in a simple continuity test but the twist rates don't cancel crosstalk correctly. Causes severe near-end crosstalk (NEXT) that prevents gigabit operation even though the cable "works" for 10/100. Split pairs are invisible to a simple pin-by-pin continuity test — you need a cable certifier that measures NEXT to detect them.
      </Para>
      <Para>
        <Accent>Impedance mismatch:</Accent> A change in cable geometry (tight bend, kink, bad termination, barrel connector) creates a reflection point. Part of the signal reflects back — the NVP (Nominal Velocity of Propagation) test on a time-domain reflectometer (TDR) shows the reflection location.
      </Para>

      <H2>Copper Testing Tools</H2>
      <Para>
        <Accent>Cable tester (continuity/wiremap):</Accent> Verifies pin-to-pin continuity and correct wiring order. Detects opens, shorts, crossed pairs, and wrong wire mapping. Cannot detect split pairs, impedance issues, or marginal performance. Cost: $20–$100.
      </Para>
      <Para>
        <Accent>Cable certifier (Fluke DSX, Ideal SignalTEK):</Accent> Measures all TIA-568 electrical parameters: NEXT, FEXT, attenuation, return loss, propagation delay, delay skew. Provides PASS/FAIL against TIA categories. Shows exactly which pair fails and at what frequency. Required for certifying new installations. Cost: $3,000–$10,000.
      </Para>
      <Para>
        <Accent>TDR (Time-Domain Reflectometer):</Accent> Sends a pulse and measures reflections — allows pinpointing the exact location of a fault in meters. Built into most cable certifiers.
      </Para>

      <H2>Fiber Faults</H2>
      <Para>
        <Accent>Dirty connector:</Accent> The #1 cause of fiber link failures. A single fingerprint, dust particle, or scratch on the end face can add 0.5–3 dB of loss — often enough to drop below the RX sensitivity threshold. <Accent>Always inspect fiber connectors before mating with a fiber inspection scope (FIS).</Accent> Clean with a dry fiber connector cleaner (cassette cleaner or stick cleaner) before first insertion and when troubleshooting.
      </Para>
      <Para>
        <Accent>Physical damage:</Accent> Fiber bent below its minimum bend radius (typically 30 mm for LC/SC patch cords) causes macrobend loss — light escapes where the fiber curves. A cable routed over a sharp cabinet edge, tied with a zip tie too tightly, or pulled at an angle can cause this. The fiber may look fine externally.
      </Para>
      <Para>
        <Accent>Microbend loss:</Accent> Microscopic deformation of the fiber from mechanical stress (crushing, improper installation, freezing). Unlike macrobends, microbends are distributed along the fiber length and show as increased dB/km loss.
      </Para>
      <Para>
        <Accent>Broken fiber:</Accent> A clean break shows zero light at the break point on an OTDR. A fracture (partial crack) shows as a high-loss event. Both are easily located with an OTDR.
      </Para>

      <H2>Fiber Testing Tools</H2>
      <Para>
        <Accent>Visual Fault Locator (VFL):</Accent> Injects visible red laser (~650 nm) into the fiber. Any break, sharp bend, or bad splice glows red/pink where the light escapes. Simple, cheap ($50–$200). Only useful for short runs (under 5 km) and accessible cable sections.
      </Para>
      <Para>
        <Accent>Optical Power Meter (OPM):</Accent> Measures optical power at the receive end in dBm. Combined with an optical light source at the transmit end, measures total insertion loss. Cheap ($100–$500). Essential for commissioning and troubleshooting.
      </Para>
      <Para>
        <Accent>OTDR (Optical Time-Domain Reflectometer):</Accent> The equivalent of TDR for fiber. Sends a laser pulse and measures backscattered light over time (= distance). Shows: fiber length, attenuation per kilometer, location and loss of every splice and connector, and fiber breaks. An OTDR trace looks like a descending staircase — each connector/splice shows as a step or event. Cost: $5,000–$30,000 for professional units.
      </Para>
      <CodeBlock title="Systematic physical layer troubleshooting process">
{`Step 1: Check physical indicators
  - Interface LED: dark=no signal, amber=error, green=link up
  - DOM RX power: < -25 dBm = weak/no signal
  - DOM TX power: < -10 dBm below spec = failing laser

Step 2: Inspect fiber connectors (both ends)
  - Use fiber inspection scope or video microscope
  - Check for dust, scratches, chips on end face
  - Clean with dry cassette cleaner, re-inspect
  - Never insert an uninspected connector

Step 3: Check polarity / fiber path
  - Verify TX→RX (not TX→TX)
  - For MPO: check polarity type (A/B/C)
  - Trace physical fiber path for sharp bends

Step 4: Measure loss with OPM
  - Connect known-good light source at far end
  - Measure received power vs expected
  - Compare against loss budget

Step 5: OTDR if problem not found
  - Trace entire fiber length
  - Locate high-loss events
  - Measure and record all connector/splice losses

Step 6: Copper specific
  - Run cable certifier if intermittent 1G failures
  - Check for split pairs (NEXT failure)
  - Check both cable ends for proper seating in keystone/RJ-45`}
      </CodeBlock>

      <H2>Auto-MDI/MDI-X and Autonegotiation</H2>
      <Para>
        <Accent>MDI (Medium Dependent Interface):</Accent> Standard pin assignment — pins 1,2 = TX, pins 3,6 = RX. Used on NICs (end devices).
      </Para>
      <Para>
        <Accent>MDI-X (Crossover):</Accent> Crossed pin assignment — pins 1,2 = RX, pins 3,6 = TX. Used on switch ports so straight-through cables work between NIC and switch.
      </Para>
      <Para>
        <Accent>Auto-MDI/MDI-X (IEEE 802.3ab):</Accent> Introduced with 1000BASE-T, required for 10GBASE-T. The interface automatically detects whether a straight or crossover cable is connected and configures its TX/RX accordingly. This is why modern Ethernet equipment doesn't require crossover cables — both straight and crossover cables work. The detection uses low-level pulse signaling during link setup.
      </Para>
      <Para>
        <Accent>Autonegotiation (IEEE 802.3u):</Accent> Devices advertise their capabilities (10/100/1000 Mbps, full/half duplex) during link setup using Fast Link Pulses (FLPs). Both sides agree on the fastest common speed and full duplex if available. Forcing speed/duplex at one end while leaving the other set to autonegotiation creates a duplex mismatch — the autonegotiating side falls back to half duplex while the forced side expects full duplex. This causes massive CRC errors and late collisions under any significant traffic. Always either both auto, or both forced to the same settings.
      </Para>

      <Err title="Duplex mismatch — silent performance killer">
        <Para>Duplex mismatch is one of the most common misconfigurations. Symptoms: ping works fine, but file transfer speeds are 2–10 Mbps on a gigabit link. The error output of the interface shows: increasing "late collision" counter (on the half-duplex side). Fix: set both sides to autonegotiation, or force both to 1000/full-duplex with matching configurations. The forced-side never sees FLPs, falls back to 10 Mbps by IEEE spec if the other side is auto — another reason to always use autonegotiation on both sides.</Para>
      </Err>

      <Divider />

      {/* ── Ch 09 ── */}
      <Chapter n="09" title="Wireless Physical Layer" subtitle="RF fundamentals, antennas, and channel planning" />
      <Para>
        Wireless networking is as much a physical layer discipline as copper and fiber. The radio frequency (RF) environment — frequencies, power levels, antenna radiation patterns, propagation characteristics — determines wireless network performance as much as the 802.11 protocol does.
      </Para>

      <H2>RF Frequency Bands for WiFi</H2>
      <CodeBlock title="WiFi frequency bands">
{`Band    Frequency Range    Channels (non-overlapping)  Range   Notes
──────────────────────────────────────────────────────────────────────────
2.4 GHz  2.400–2.500 GHz   3 (1, 6, 11)                Long    Congested (microwaves,
                                                                  BT, many neighbors)
5 GHz    5.150–5.850 GHz   25 (20 MHz), up to 9        Medium  Less congested,
                            (80 MHz bonded)                       faster falloff
6 GHz    5.925–7.125 GHz   59 (20 MHz)                 Short   WiFi 6E/7 only,
                            14 (80 MHz), 7 (160 MHz)            clean spectrum

Channel bonding:
  20 MHz:   oldest standard, each channel 20 MHz wide
  40 MHz:   802.11n (HT40), 2× 20 MHz bonded
  80 MHz:   802.11ac (VHT80), 4× 20 MHz bonded  ← default for WiFi 5/6
  160 MHz:  802.11ax (HE160), 8× bonded         ← highest throughput, rare
  320 MHz:  802.11be (WiFi 7)                   ← future

Wider channels = higher throughput but more interference/congestion
Narrower channels = lower throughput but more cells in dense environments`}
      </CodeBlock>

      <H2>Free Space Path Loss</H2>
      <Para>
        RF signals weaken with distance following the inverse square law. The Friis free space path loss formula: FSPL(dB) = 20log₁₀(d) + 20log₁₀(f) + 20log₁₀(4π/c), where d = distance in meters, f = frequency in Hz. Simplified: FSPL(dB) ≈ 20log₁₀(d) + 20log₁₀(f) − 147.55.
      </Para>
      <Para>
        Key implication: every time distance doubles, path loss increases by 6 dB (signal power quarters). Every time frequency doubles, path loss also increases by 6 dB. This is why 5 GHz WiFi has shorter range than 2.4 GHz — the higher frequency itself attenuates more aggressively with distance, beyond the identical inverse-square law loss.
      </Para>

      <H2>Antenna Types and Gain</H2>
      <Para>
        <Accent>Omnidirectional antenna:</Accent> Radiates in all directions in the horizontal plane (like a donut shape in 3D). Used on access points for indoor coverage. Gain: 2–5 dBi. The gain doesn't add power — it concentrates radiation in the horizontal plane by reducing radiation above/below, creating a flatter donut pattern.
      </Para>
      <Para>
        <Accent>Directional / patch antenna:</Accent> Focuses radiation in a specific direction, achieving 8–30+ dBi gain. Used for: point-to-point building-to-building wireless bridges, outdoor AP sectors, long-range client CPE devices. A 20 dBi dish antenna has 10× the effective range of a 10 dBi antenna for the same transmitted power.
      </Para>
      <Para>
        <Accent>MIMO and spatial streams:</Accent> 802.11n/ac/ax use Multiple Input, Multiple Output antennas. Multiple antennas transmit independent data streams simultaneously, multiplying throughput. Notation: 4×4:4 means 4 transmit antennas, 4 receive antennas, 4 simultaneous spatial streams. 802.11ac Wave 2 (MU-MIMO) lets an AP simultaneously serve multiple clients on the downlink. 802.11ax (WiFi 6) adds UL MU-MIMO (uplink multi-user MIMO).
      </Para>

      <H2>dBm — Power in Wireless</H2>
      <Para>
        Wireless power is measured in <Accent>dBm</Accent> (decibels relative to 1 milliwatt). dBm = 10 × log₁₀(P/1mW). Key reference points:
      </Para>
      <CodeBlock title="dBm reference values">
{`dBm     Power          Typical context
─────────────────────────────────────────────────────
+30      1 W           Max WiFi AP transmit (US legal)
+20      100 mW        Typical indoor AP transmit
+15      32 mW         Typical client device transmit
 0       1 mW          Reference point
-30      1 µW          Very strong received signal (close to AP)
-65      316 nW        Good WiFi signal (fast connection)
-70      100 nW        Acceptable signal (-70 to -80 borderline)
-80       10 nW        Weak — reduced speeds, higher retry rate
-90        1 nW        Very weak — barely associated
-95      320 pW        Thermal noise floor ≈ -100 dBm at 20 MHz

Rules of thumb:
  +3 dB = power doubled
  -3 dB = power halved
  +10 dB = 10× power
  -10 dB = 1/10 power
  -65 dBm target for voice/video; -70 dBm for data`}
      </CodeBlock>

      <Divider />

      {/* ── Ch 10 ── */}
      <Chapter n="10" title="Interview Questions" subtitle="From beginner to PhD" />

      <IQ q="What is the difference between Cat6 and Cat6a? When would you choose each?" level="Beginner">
        Cat6 supports 10 Gbps only to 55 meters; Cat6a extends 10 Gbps to the full 100-meter standard horizontal run by eliminating alien crosstalk (AXT) from adjacent cables. Cat6a is thicker, heavier, and more expensive. Choose Cat6 only for short 10G runs or when 1 Gbps to the desktop is sufficient. For any new installation, specify Cat6a — labor costs dominate a cabling project, and rewiring for 10G later is far more expensive than upgrading to Cat6a now.
      </IQ>

      <IQ q="What is the difference between single-mode and multi-mode fiber?" level="Beginner">
        Single-mode fiber (9 µm core) carries one light mode — no modal dispersion, supports 80+ km without amplification, requires laser sources. Multi-mode (50 µm core, OM3/4/5) allows multiple light modes, has modal dispersion limiting distance to 150–400 m for 10G/100G, but uses cheaper VCSEL transceivers. Use multi-mode within buildings (datacenter intra-rack to intra-building), single-mode for any inter-building or WAN run.
      </IQ>

      <IQ q="A 10G fiber link comes up but has very high packet error rates. What do you check first?" level="Intermediate">
        DOM (Digital Optical Monitoring) on the transceiver — specifically RX optical power. Below -20 dBm suggests weak signal; below -25 dBm is near sensitivity threshold. Then inspect both fiber connectors with an inspection scope for contamination or damage (dirty connectors are the most common cause). Clean with a dry connector cleaner and reinspect. Then check fiber path for sharp bends below minimum bend radius. Finally, verify transceiver wavelength matches the fiber type (single-mode transceiver on multi-mode fiber = no light received because the wavelengths are mismatched for the fiber's modal bandwidth).
      </IQ>

      <IQ q="Explain duplex mismatch: how it occurs, what it looks like, and how to fix it." level="Intermediate">
        Duplex mismatch occurs when one side of a link is forced to full-duplex while the other is set to autonegotiate — the auto side defaults to half-duplex per IEEE 802.3 spec. The full-duplex side transmits freely; the half-duplex side waits for silence but the other side never stops, so it detects constant "collisions." Symptoms: ping works fine (small packets), but file transfer throughput is 2–10 Mbps on a gigabit link; interface shows increasing late collisions and input errors. Fix: set both sides to autonegotiation, or force both to the same speed/duplex. Never force one side and leave the other on auto.
      </IQ>

      <IQ q="How does PoE 802.3bt Type 4 deliver 90W over Cat6a? Walk through the electrical path including detection, classification, and power delivery." level="Senior">
        802.3bt Type 4 uses all four wire pairs. Detection: PSE applies 2.7–10 V probe; PD presents 25 kΩ signature resistance, confirming PoE capability. Classification: PSE applies 15.5–20.5 V; PD responds with a multi-event physical layer classification indicating Class 8 (90 W). The PSE allocates power budget. Power delivery: 52–57 V DC is applied across all four pairs simultaneously — both Mode A (pins 1,2,3,6) and Mode B (pins 4,5,7,8) carry power. Current: P = IV → at 57 V, 90 W requires ~1.57 A total (~0.78 A per pair). Power loss: 0.78 A through 26 AWG conductor (0.188 Ω/m × 2 × 100 m = 37.6 Ω per pair) → I²R = 0.78² × 37.6 ≈ 22.9 W per pair / 4 pairs = ~18.7 W total loss → PD receives 71.3 W. Temperature rise in bundled Cat6a must be managed — 802.3bt requires derating in cable bundles.
      </IQ>

      <IQ q="Design the fiber cabling architecture for a 3-floor office building: 100 users per floor, 10G to every desk, a datacenter on floor 1, and future-proof for 25G. Justify every choice." level="PhD">
        <Para><strong>Horizontal (floor to desk):</strong> Cat6a UTP from IDF to each desk. 10GBASE-T supports full 100 m. Cat6a is future-proof for 25GBASE-T (with Cat6a rated at 500 MHz, it will support 25G in short runs). Avoid Cat7/Cat8 — non-standard connectors, overkill for desk-side, and labor cost is identical.</Para>
        <Para><strong>IDF per floor:</strong> One IDF per floor with 48-port PoE+ switch (802.3at 30W per port for AP/phone) and 8-port PoE++ (802.3bt 60W for video conferencing). Each IDF connected to MDF via 2× OM4 MMF (40GBASE-SR4 today, upgradable to 100G by swapping transceivers on the same fiber).</Para>
        <Para><strong>MDF to datacenter (same building):</strong> 12-fiber OM5 ribbon (supports SWDM4 for 100G on 2 fibers when needed) plus pre-installed OS2 SMF for future DCI or ISP handoff. Never install only what you need today — fiber raceway fill costs more to pull later.</Para>
        <Para><strong>Datacenter:</strong> TOR (Top-of-Rack) switches with 25G SFP28 to servers (DAC for ≤5m, AOC for cross-rack). 100G QSFP28 uplinks to spine switches. Pre-install MPO-24 trunk cables for direct 400G QSFP-DD when needed — avoid re-cabling the datacenter floor.</Para>
        <Para><strong>Future-proofing for 25G to desk:</strong> Cat6a supports 25GBASE-T at reduced distance (~30m). If full 100m 25G is needed, a second fiber run to the desk (using SFP28) would be required — conduit capacity must be reserved now. Install empty conduits with pull strings alongside every cable run during construction.</Para>
      </IQ>

      <Divider />

      <KeyTakeaways items={[
        'Twisted-pair copper works by differential cancellation — twisting ensures external noise hits both wires equally and cancels at the differential receiver. Different twist rates per pair minimize inter-pair crosstalk.',
        'Cat6a (500 MHz, 10G to 100m) is the minimum for new installations. Cat5e/Cat6 are acceptable for existing infrastructure but should be replaced during renovations.',
        'Single-mode fiber (9 µm, no modal dispersion) supports 80+ km and DWDM. Multi-mode (50 µm OM3/4/5) supports 150–400 m at 10G/100G with cheaper VCSEL transceivers. Always install SMF for inter-building runs.',
        'Fiber connector polish type matters: APC (green, 8° angle, -60 dBm return loss) for GPON/analog RF; PC/UPC (blue, domed, -40 dBm) for data. Never mate APC with PC.',
        'Dirty fiber connectors are the leading cause of fiber link failures. Always inspect with a fiber scope before mating. Clean with a dry cassette cleaner, reinspect, then connect.',
        'SFP/SFP+/SFP28/QSFP28/QSFP-DD transceivers define speed and reach. DAC cables are cheapest for ≤7m datacenter connections; AOC for 1–100m; optical transceivers for anything longer.',
        'PoE (802.3af/at/bt) delivers up to 90W over Cat6a. PSE detects (25 kΩ signature) and classifies the PD before applying power. 802.3bt Type 3/4 uses all four pairs and requires Cat6a for full reach.',
        'TIA-568 horizontal cabling: 90m permanent + 10m patch cords = 100m total. MDF/IDF star topology, patch panels for administration, 13mm max untwist at termination.',
        'Autonegotiation should be enabled on both sides. Duplex mismatch (one forced full-duplex, one auto → half-duplex) causes 2–10 Mbps throughput on gigabit links with late collision errors.',
        'DOM (Digital Optical Monitoring) provides real-time TX/RX optical power, temperature, and voltage from SFP transceivers. RX power below -20 dBm requires physical investigation.',
        'Loss budget = TX power − RX sensitivity. Every connector adds 0.3–0.5 dB, fusion splice adds 0.1 dB, SMF adds 0.35 dB/km at 1310 nm. Calculate the budget before deploying any fiber link.',
        'Wireless physical layer: 5 GHz has shorter range but less congestion than 2.4 GHz. Path loss increases by 6 dB per doubling of distance or frequency. Target -65 dBm RX signal for voice/video reliability.',
      ]} />
    </LearnLayout>
  )
}
