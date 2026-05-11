'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import Link from 'next/link'

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

// ── Signal Visualization ─────────────────────────────────────────────────────
function SignalChart({ title, color, type }: { title: string; color: string; type: 'analog' | 'digital' | 'manchester' | 'pam4' }) {
  const w = 320; const h = 80; const mid = h / 2

  const paths: Record<string, string> = {
    analog: `M0,${mid} C10,${mid - 28} 20,${mid - 35} 40,${mid} C60,${mid + 35} 80,${mid + 35} 100,${mid} C120,${mid - 35} 140,${mid - 35} 160,${mid} C180,${mid + 35} 200,${mid + 35} 220,${mid} C240,${mid - 35} 260,${mid - 35} 280,${mid} C300,${mid + 35} 310,${mid + 35} 320,${mid}`,
    digital: `M0,${mid - 25} L60,${mid - 25} L60,${mid + 25} L130,${mid + 25} L130,${mid - 25} L190,${mid - 25} L190,${mid + 25} L250,${mid + 25} L250,${mid - 25} L320,${mid - 25}`,
    manchester: `M0,${mid - 25} L30,${mid - 25} L30,${mid + 25} L80,${mid + 25} L80,${mid - 25} L110,${mid - 25} L110,${mid + 25} L140,${mid + 25} L140,${mid - 25} L170,${mid - 25} L170,${mid + 25} L200,${mid + 25} L200,${mid - 25} L230,${mid - 25} L230,${mid + 25} L260,${mid + 25} L260,${mid - 25} L290,${mid - 25} L290,${mid + 25} L320,${mid + 25}`,
    pam4: `M0,${mid - 35} L50,${mid - 35} L50,${mid - 12} L100,${mid - 12} L100,${mid + 12} L150,${mid + 12} L150,${mid + 35} L200,${mid + 35} L200,${mid - 12} L250,${mid - 12} L250,${mid - 35} L300,${mid - 35} L300,${mid + 12} L320,${mid + 12}`,
  }

  const labels: Record<string, string[]> = {
    analog: ['Continuous sine wave — infinite values at every point in time'],
    digital: ['Binary: HIGH = 1, LOW = 0. Two voltage levels only.'],
    manchester: ['Rising edge = 1, Falling edge = 0. Self-clocking signal.'],
    pam4: ['4 voltage levels encode 2 bits: 11, 01, 00, 10 per symbol'],
  }

  return (
    <div style={{ border: `1px solid ${color}30`, borderRadius: 10, padding: '14px 16px', background: `${color}06`, marginBottom: 12 }}>
      <p style={{ fontSize: 12, fontWeight: 700, color, fontFamily: 'var(--font-mono)', margin: '0 0 10px' }}>{title}</p>
      <svg width={w} height={h} style={{ display: 'block', maxWidth: '100%' }}>
        <line x1="0" y1={mid} x2={w} y2={mid} stroke={color} strokeOpacity={0.15} strokeWidth={1} />
        <path d={paths[type]} fill="none" stroke={color} strokeWidth={2} />
      </svg>
      <p style={{ fontSize: 11, color: 'var(--muted)', margin: '8px 0 0', fontFamily: 'var(--font-mono)' }}>{labels[type][0]}</p>
    </div>
  )
}

// ── Latency Calculator ───────────────────────────────────────────────────────
function LatencyCalc() {
  const [dist, setDist] = useState(100)
  const speedOfLight = 299792 // km/s
  const fiberSlowdown = 0.67 // ~2/3 speed of light in fiber
  const propagation = (dist / (speedOfLight * fiberSlowdown) * 1000).toFixed(2)
  const rtt = (parseFloat(propagation) * 2).toFixed(2)
  const tcp3way = (parseFloat(rtt) * 1.5).toFixed(2)
  const tlsRtt = (parseFloat(rtt) * 1).toFixed(2)

  const presets = [
    { label: 'NYC → Boston', km: 340 },
    { label: 'NYC → Chicago', km: 1200 },
    { label: 'NYC → LA', km: 4500 },
    { label: 'NYC → London', km: 5500 },
    { label: 'NYC → Tokyo', km: 11000 },
    { label: 'Low Earth Orbit', km: 600 },
  ]

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', margin: '20px 0 28px', background: 'var(--surface)' }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 16px' }}>Propagation Delay Calculator</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {presets.map(p => (
          <button key={p.label} onClick={() => setDist(p.km)}
            style={{ padding: '5px 12px', borderRadius: 6, border: `1px solid ${dist === p.km ? N : 'var(--border)'}`, background: dist === p.km ? `${N}15` : 'transparent', cursor: 'pointer', fontSize: 12, color: dist === p.km ? N : 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: dist === p.km ? 700 : 400 }}>
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <input type="range" min={1} max={20000} value={dist} onChange={e => setDist(Number(e.target.value))}
          style={{ width: '100%', accentColor: N }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
          <span>1 km</span>
          <span style={{ color: N, fontWeight: 700 }}>{dist.toLocaleString()} km</span>
          <span>20,000 km</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { label: 'One-way propagation', value: `${propagation} ms`, color: N, note: 'Light speed in fiber (2×10⁸ m/s)' },
          { label: 'Round-trip time (RTT)', value: `${rtt} ms`, color: '#3b82f6', note: 'Minimum possible ping time' },
          { label: 'TCP 3-way handshake', value: `${tcp3way} ms`, color: '#f97316', note: '1.5× RTT before first byte' },
          { label: 'TLS 1.3 (0-RTT save)', value: `${tlsRtt} ms extra`, color: '#8b5cf6', note: '+1 RTT for TLS (was +2 in TLS 1.2)' },
        ].map((m, i) => (
          <div key={i} style={{ border: `1px solid ${m.color}25`, borderRadius: 8, padding: '10px 12px', background: `${m.color}08` }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: m.color, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{m.value}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{m.note}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DataTransmission() {
  return (
    <LearnLayout
      title="Data Transmission — Signals, Bandwidth, and Latency"
      description="How bits travel as electrical signals, light pulses, and radio waves. The physics behind bandwidth, throughput, latency, and jitter — and why they matter for every network you'll ever build."
      section="Networking Fundamentals — Module 05"
      readTime="20–26 min"
      updatedAt="May 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="The Physics Underneath Every Network" />

      <P>All networking ultimately reduces to physics. When you send a file to a server, you are converting binary data into physical phenomena — electrical voltage changes on copper wire, infrared laser pulses on glass fiber, or electromagnetic radio waves in free space — then converting them back to binary at the destination. The fundamental constraints of physics determine what is possible: how fast data can travel, how much fits on a medium, and why the speed of light matters even to application developers.</P>

      <P>Understanding data transmission is not merely academic. The engineers at AWS who decided that us-east-1 and us-west-2 are different availability regions, not one, made that decision because of propagation delay physics — the round-trip latency between Virginia and Oregon is ~65ms, which is too high for synchronous database replication. The engineers at Starlink who chose low Earth orbit at 550km (vs GEO at 35,786km) made that choice because of propagation delay physics — GEO satellite latency is 600ms, making interactive applications unusable. Physics constraints are system design constraints.</P>

      <div style={{ background: `${N}08`, border: `1px solid ${N}25`, borderLeft: `4px solid ${N}`, borderRadius: '0 10px 10px 0', padding: '20px 24px', margin: '4px 0 28px' }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: N, margin: '0 0 8px', fontFamily: 'var(--font-mono)' }}>THE HARD LIMIT</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>
          The speed of light in a vacuum is 299,792 km/s. In fiber optic cable, light travels at about 2×10⁸ m/s — approximately <strong>2/3 the speed of light</strong> in vacuum, due to the glass&apos;s refractive index. No networking technology can break this limit. A signal from New York to London (5,500 km of undersea fiber) takes at minimum <strong>27ms one-way</strong>, regardless of how much money you spend on equipment.
        </p>
      </div>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Analog vs Digital Signals — The Foundation" />

      <P>Data networks transmit binary data (0s and 1s), but the physical medium carries analog signals — continuous waves, voltage levels, or light intensities. The question is how to <Hl>encode digital information into analog physical signals</Hl> and back, and how efficiently you can do so.</P>

      <SignalChart title="Analog Signal" color="#3b82f6" type="analog" />
      <SignalChart title="Digital (NRZ) Signal" color="#10b981" type="digital" />
      <SignalChart title="Manchester Encoding (10BASE-T)" color="#f97316" type="manchester" />
      <SignalChart title="PAM4 (400GbE, modern fiber)" color="#8b5cf6" type="pam4" />

      <H>Why Encoding Matters for Speed</H>
      <P>The choice of encoding scheme directly determines how many bits per second you can transmit on a given physical medium. Nyquist&apos;s theorem (1928) established the theoretical maximum for a noiseless channel: a channel with bandwidth B can transmit at most <Hl>2B symbols per second</Hl> (the Nyquist rate). With 2 signal levels (binary), that is 2B bits/second. With 4 signal levels (PAM4), it is 4B bits/second for the same channel bandwidth.</P>

      <P>Shannon&apos;s theorem (1948) is more powerful: it gives the maximum bits/second for a channel with noise: <Hl>C = B × log₂(1 + S/N)</Hl>, where B is bandwidth in Hz, S is signal power, and N is noise power. This is the Shannon-Hartley theorem — the absolute maximum data rate regardless of encoding cleverness. A fiber link with 50 GHz of optical bandwidth and 30 dB signal-to-noise ratio has a Shannon limit of approximately 500 Gbps. Current 400GbE implementations approach this limit using sophisticated modulation (DP-16QAM on coherent optics).</P>

      <Term word="Bandwidth" def="The range of frequencies a channel can carry, measured in Hz. This is the physical property — NOT the data rate. A Cat6A cable has 500 MHz of bandwidth. A 5 GHz Wi-Fi channel has 80–160 MHz of bandwidth. More bandwidth Hz → more bits/second possible." />
      <Term word="Bit rate / Data rate" def="Bits transmitted per second. Depends on both the channel bandwidth AND the encoding efficiency. Cat6A at 500 MHz bandwidth achieves 10 Gbps using PAM4 encoding. Often (incorrectly) called 'bandwidth' in everyday speech." />
      <Term word="Symbol rate (Baud)" def="Symbols transmitted per second. With binary encoding, 1 symbol = 1 bit, so baud = bit rate. With PAM4 (4 levels), 1 symbol = 2 bits, so bit rate = 2 × baud. 10GbE uses 10.3125 Gbaud at 1 bit/symbol. 25GbE uses 25.78125 Gbaud at 1 bit/symbol." />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="The Transmission Media — What Actually Carries Your Bits" />

      <H>Twisted Pair Copper (Ethernet)</H>
      <P>The standard medium for LAN connections. Pairs of wires are twisted together to cancel electromagnetic interference — the twist ensures that any noise picked up by one wire is approximately equal on both, allowing the receiver to subtract the common noise and recover the signal (differential signaling). The tighter the twist (more twists per inch), the better the interference rejection.</P>

      <div style={{ overflowX: 'auto', margin: '16px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Category', 'Max Bandwidth', 'Max Speed', 'Max Distance', 'Use Case'].map((h, i) => (
                <th key={i} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: N, letterSpacing: '.06em', border: '1px solid var(--border)', background: 'var(--surface)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Cat5e', '100 MHz', '1 GbE', '100 m', 'Legacy office wiring (still common)'],
              ['Cat6', '250 MHz', '10 GbE (55 m)', '100 m', 'Modern office, 1G standard use'],
              ['Cat6A', '500 MHz', '10 GbE', '100 m', 'New building installs, PoE++'],
              ['Cat7/8', '600–2000 MHz', '25/40 GbE', '30 m', 'Data center short runs, top-of-rack'],
            ].map((r, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                {r.map((v, j) => (
                  <td key={j} style={{ padding: '10px 14px', color: j === 0 ? N : 'var(--muted)', fontFamily: j === 0 ? 'var(--font-mono)' : undefined, fontWeight: j === 0 ? 700 : 400, border: '1px solid var(--border)' }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H>Fiber Optic Cable</H>
      <P>Light instead of electricity. A glass or plastic core surrounded by cladding with a lower refractive index — the difference causes total internal reflection, keeping light trapped in the core as it bounces along the cable. Two fundamental types:</P>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, margin: '16px 0 24px' }}>
        <div style={{ border: `1px solid ${N}30`, borderRadius: 10, padding: '16px 18px', background: `${N}06` }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: N, margin: '0 0 8px' }}>Single-Mode Fiber (SMF)</p>
          <ul style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.9, margin: 0, paddingLeft: 18 }}>
            <li>Core: 9 µm diameter</li>
            <li>Single light path (mode) — no modal dispersion</li>
            <li>Distance: up to 40–80 km at 100G without amplification</li>
            <li>Wavelengths: 1310nm and 1550nm (O-band, C-band)</li>
            <li>Cost: higher (laser sources, tight tolerances)</li>
            <li>Use: ISP backbones, data center interconnects, metro fiber</li>
          </ul>
        </div>
        <div style={{ border: '1px solid #3b82f6' + '30', borderRadius: 10, padding: '16px 18px', background: '#3b82f6' + '06' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#3b82f6', margin: '0 0 8px' }}>Multi-Mode Fiber (MMF)</p>
          <ul style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.9, margin: 0, paddingLeft: 18 }}>
            <li>Core: 50 or 62.5 µm diameter</li>
            <li>Multiple light paths (modes) — modal dispersion limits distance</li>
            <li>Distance: up to 100–550 m at 100G (OM3–OM5)</li>
            <li>Wavelengths: 850nm VCSEL lasers (cheaper)</li>
            <li>Cost: lower (VCSEL sources, relaxed tolerances)</li>
            <li>Use: inside data centers (top-of-rack to spine), within buildings</li>
          </ul>
        </div>
      </div>

      <P>DWDM (Dense Wavelength Division Multiplexing) is how fiber achieves terabit capacity: instead of one laser per fiber, hundreds of lasers at slightly different wavelengths travel the same fiber simultaneously. A single SMF strand carrying DWDM with 80 wavelengths at 100G each carries 8 Tbps. Combine multiple fiber strands in one cable, and intercontinental cables routinely carry 100–200 Tbps. The transatlantic cable from 2024 (Google&apos;s Firmina) has a design capacity of 340 Tbps — more than all of Cloudflare&apos;s network traffic combined.</P>

      <H>Wireless Radio Transmission</H>
      <P>Wireless networking converts electrical signals to electromagnetic waves in the radio frequency spectrum. Unlike wire, radio waves propagate in all directions, can be absorbed, reflected, or refracted by objects, and share spectrum with other transmitters. Wi-Fi, cellular (LTE/5G), Bluetooth, and satellite all use radio.</P>

      <ul style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 2, paddingLeft: 24 }}>
        <li><Hl>2.4 GHz Wi-Fi</Hl>: longer wavelength (12.5 cm), penetrates walls better, but only 3 non-overlapping channels (1, 6, 11 in the US). Maximum 600 Mbps (Wi-Fi 4) to 1.2 Gbps (Wi-Fi 5). Heavily congested in dense environments.</li>
        <li><Hl>5 GHz Wi-Fi</Hl>: shorter wavelength (6 cm), higher bandwidth (25+ non-overlapping channels), faster (up to 3.5 Gbps for Wi-Fi 5, 9.6 Gbps for Wi-Fi 6). Limited wall penetration.</li>
        <li><Hl>6 GHz Wi-Fi (Wi-Fi 6E/7)</Hl>: 1.2 GHz of fresh spectrum (FCC opened in 2020). Up to 46 channels at 80 MHz wide or 24 at 160 MHz. Significantly less interference than 5 GHz — the 6 GHz band is new, so there is no legacy Wi-Fi 4 devices filling it with interference yet.</li>
        <li><Hl>mmWave 5G (24–100 GHz)</Hl>: extremely high bandwidth but range measured in meters. T-Mobile&apos;s Sub-6 5G covers miles per tower. Verizon&apos;s mmWave 5G covers about 200 meters per transmitter — fast but requires dense deployment.</li>
      </ul>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Bandwidth vs Throughput vs Latency vs Jitter — Four Different Things" />

      <P>These four terms are used interchangeably in casual conversation. They measure completely different things and getting them confused leads to incorrect diagnoses and wrong architectural decisions.</P>

      <div style={{ margin: '20px 0 32px' }}>
        {[
          {
            term: 'Bandwidth',
            color: '#10b981',
            definition: 'Maximum data rate a link can carry, measured in bits per second (bps). Theoretical maximum — the size of the pipe.',
            analogy: 'A 4-lane highway. 4 lanes = 4× more cars/hour capacity vs 1 lane.',
            realWorld: 'Your ISP advertises 1 Gbps. Your cable has 1 Gbps bandwidth. That is the maximum, not the guaranteed speed.',
            formula: 'Available bandwidth = link speed (e.g., 1 Gbps Ethernet port)',
          },
          {
            term: 'Throughput',
            color: '#3b82f6',
            definition: 'Actual data rate achieved in practice, accounting for overhead, errors, retransmissions, and protocol inefficiency. Always ≤ bandwidth.',
            analogy: 'Actual cars per hour on that 4-lane highway. Traffic jams, accidents, and tolls reduce it below theoretical maximum.',
            realWorld: 'Your 1 Gbps link achieves 850 Mbps throughput during a file transfer. TCP overhead, packet loss, and application processing cap it below 1 Gbps.',
            formula: 'Throughput ≈ bandwidth × (1 - packet_loss) × (1 - protocol_overhead)',
          },
          {
            term: 'Latency',
            color: '#f97316',
            definition: 'Time for one bit/packet to travel from source to destination. Measured one-way (OWD) or round-trip (RTT). Determines responsiveness.',
            analogy: 'Travel time on the highway. 4 lanes (bandwidth) does not make the journey faster. Distance determines travel time.',
            realWorld: 'NYC to LA: ~40ms RTT on fiber. NYC to London: ~85ms RTT. 5ms to your local gaming server. Latency is the bottleneck for real-time apps.',
            formula: 'Latency = propagation delay + transmission delay + queuing delay + processing delay',
          },
          {
            term: 'Jitter',
            color: '#8b5cf6',
            definition: 'Variation in latency over time. If packets arrive 10ms, 10ms, 10ms apart, jitter = 0. If they arrive 8ms, 14ms, 7ms apart, jitter = 7ms. Kills real-time apps.',
            analogy: 'Variation in travel time — some days the highway is clear (low latency), some days it is congested (high latency). Unpredictability is the problem.',
            realWorld: 'VoIP requires jitter < 30ms (Cisco recommendation). Video conferencing requires < 50ms. Gaming FPS shooters require < 10ms for competitive play.',
            formula: 'Jitter = |current_latency - previous_latency| averaged over a window',
          },
        ].map((m, i) => (
          <div key={i} style={{ border: `1px solid ${m.color}30`, borderRadius: 10, padding: '16px 18px', marginBottom: 12, background: `${m.color}06` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <span style={{ background: m.color, color: '#fff', fontSize: 12, fontWeight: 800, fontFamily: 'var(--font-mono)', padding: '3px 10px', borderRadius: 4 }}>{m.term.toUpperCase()}</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, margin: '0 0 8px', fontWeight: 600 }}>{m.definition}</p>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: '0 0 6px' }}><strong style={{ color: 'var(--text)' }}>Analogy:</strong> {m.analogy}</p>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: '0 0 6px' }}><strong style={{ color: 'var(--text)' }}>Real world:</strong> {m.realWorld}</p>
            <p style={{ fontSize: 12, color: m.color, fontFamily: 'var(--font-mono)', margin: 0 }}>{m.formula}</p>
          </div>
        ))}
      </div>

      <H>The Bandwidth-Delay Product: Why Fast Is Not Enough</H>
      <P>The <Hl>bandwidth-delay product (BDP)</Hl> is one of the most important concepts in networking performance, yet it is rarely taught in introductory courses. It is the product of link bandwidth and round-trip latency, and it represents the amount of data &quot;in flight&quot; on a network at any given time:</P>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px', margin: '12px 0 24px', lineHeight: 2 }}>
        <div style={{ color: 'var(--muted)', marginBottom: 4 }}># Bandwidth-Delay Product examples</div>
        <div>Home network:     <span style={{ color: N }}>100 Mbps</span> × <span style={{ color: '#f97316' }}>5ms RTT</span> = <span style={{ color: '#8b5cf6' }}>62.5 KB</span> in flight</div>
        <div>US cross-country: <span style={{ color: N }}>10 Gbps</span>  × <span style={{ color: '#f97316' }}>60ms RTT</span> = <span style={{ color: '#8b5cf6' }}>75 MB</span> in flight</div>
        <div>Transatlantic:    <span style={{ color: N }}>100 Gbps</span> × <span style={{ color: '#f97316' }}>180ms RTT</span>= <span style={{ color: '#8b5cf6' }}>2.25 GB</span> in flight</div>
        <div style={{ marginTop: 8, color: 'var(--muted)' }}># TCP window must be at least BDP to keep the pipe full</div>
        <div style={{ color: 'var(--muted)' }}># If window &lt; BDP, sender pauses waiting for ACKs — wasted bandwidth</div>
      </div>

      <P>This is why TCP window scaling matters for long-distance, high-bandwidth links. The default TCP window of 65 KB (without scaling) means that on a 10 Gbps transatlantic link with 90ms one-way latency, TCP can only achieve: 65 KB / 0.18s RTT = 2.9 Mbps — 0.003% of the available bandwidth. With window scaling to 64 MB, you get 64 MB / 0.18s = 2.8 Gbps — still not full, but vastly better. This is why AWS recommends tuning kernel TCP buffer sizes for their inter-region data transfer tools.</P>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Propagation Delay Calculator — Light Speed Matters to Engineers" />

      <P>The propagation delay is the time for a signal to travel from sender to receiver, determined purely by distance and the speed of light in the medium. No matter how fast your hardware, no matter how optimized your code, propagation delay is a hard physical limit that cannot be reduced except by moving the communicating endpoints closer together.</P>

      <LatencyCalc />

      <H>Why Propagation Delay Shapes Cloud Architecture</H>
      <P>These numbers are not academic — they drive billion-dollar infrastructure decisions:</P>

      <ul style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 2.1, paddingLeft: 24 }}>
        <li><Hl>Database replication synchrony</Hl>: Synchronous replication requires the primary to wait for the replica to confirm a write before acknowledging to the application. At 20ms RTT (NYC to Chicago), each write adds 20ms. At 1,000 writes/second, that is acceptable. At 65ms RTT (NYC to Seattle), it becomes a bottleneck for high-throughput applications. This is why AWS Aurora global databases use asynchronous replication for cross-region (different AZs in different cities) and synchronous for same-region multi-AZ.</li>
        <li><Hl>CDN placement</Hl>: Cloudflare has 300 Points of Presence (PoPs) globally because propagation delay from a user to a content origin in Virginia would add 80–200ms for international users. Serving from the nearest PoP reduces propagation to under 20ms for 95% of users. Netflix operates Open Connect Appliances (OCAs) inside ISP networks for the same reason — eliminating 40–120ms of backbone propagation per video segment request.</li>
        <li><Hl>High-frequency trading (HFT)</Hl>: Financial traders pay millions for co-location in the same data center as NYSE/NASDAQ matching engines. The propagation delay advantage of 0.1ms vs 1ms can determine whether a trade executes profitably. Spread Networks built a straight-line fiber from Chicago to New York (compared to existing curved routes) specifically to reduce latency by 3ms — and sold access for ~$300K/year per customer.</li>
        <li><Hl>Starlink&apos;s LEO orbit choice</Hl>: SpaceX placed Starlink satellites at 550 km altitude, giving ~20ms RTT to a ground station. Geosynchronous orbit (35,786 km) would give ~600ms RTT — unusable for web browsing, video calls, or gaming. The extra orbital mechanics complexity of LEO (hundreds of satellites needed for continuous coverage) is accepted because the latency physics of GEO are unacceptable.</li>
      </ul>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Transmission Delay, Queuing Delay, Processing Delay" />

      <P>Propagation delay is just one component of total latency. The full latency budget has four components, each from a different source:</P>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px', margin: '12px 0 24px', lineHeight: 2.2 }}>
        <div style={{ color: 'var(--muted)', marginBottom: 4 }}># Total latency = sum of all four components</div>
        <div><span style={{ color: '#10b981' }}>Propagation</span>   = distance / signal_speed   <span style={{ color: 'var(--muted)' }}># Physics. Cannot reduce without moving.</span></div>
        <div><span style={{ color: '#3b82f6' }}>Transmission</span>  = packet_size / link_rate    <span style={{ color: 'var(--muted)' }}># Time to put all bits on the wire</span></div>
        <div><span style={{ color: '#f97316' }}>Queuing</span>        = packets_waiting / link_rate <span style={{ color: 'var(--muted)' }}># Time waiting in router buffer</span></div>
        <div><span style={{ color: '#8b5cf6' }}>Processing</span>     = lookup + forwarding time    <span style={{ color: 'var(--muted)' }}># Router/switch decision time</span></div>
        <div style={{ marginTop: 8, color: 'var(--muted)' }}># Example: 1500B packet on 1 Gbps link</div>
        <div><span style={{ color: '#3b82f6' }}>Transmission</span>  = 1500×8 bits / 10⁹ bps = <span style={{ color: N }}>0.012 ms</span>  <span style={{ color: 'var(--muted)' }}># 12 microseconds</span></div>
        <div style={{ color: 'var(--muted)' }}># On a 10 Gbps link: same packet takes 1.2 µs (10× faster)</div>
        <div style={{ color: 'var(--muted)' }}># Propagation for 100km fiber: 0.5 ms — dominates by far</div>
      </div>

      <H>Queuing Delay: The Latency You Can Control</H>
      <P>When packets arrive at a router or switch faster than they can be forwarded, they queue in a buffer. Queuing delay is the time a packet waits in that buffer. It is <Hl>the largest and most variable component of latency</Hl> in practice, and the one most directly under the network engineer&apos;s control through QoS (Quality of Service) configuration.</P>

      <P>Bufferbloat is a specific pathology where routers and modems have excessively large buffers. A buffer that can hold 1 second of traffic (250 MB at 2 Gbps) means that when the buffer fills up under load, queuing delay can reach 1 second — completely destroying interactive application performance. The solution is <Hl>Active Queue Management (AQM)</Hl> algorithms like CoDel (Controlled Delay) or FQ-CoDel, which proactively drop or delay packets before the buffer fills, keeping queuing delay under 5ms. Most modern home routers support FQ-CoDel (enabled in OpenWRT, Ubiquiti, and others).</P>

      <ProTip>When users complain that &quot;the internet is slow but Netflix works fine,&quot; bufferbloat is often the culprit. Netflix pre-buffers video into local memory — it is tolerant of variable latency. Interactive apps (video calls, gaming, web browsing) need low queuing delay. Run the Waveform Bufferbloat test to measure it. If queuing delay spikes above 50ms under load, enable FQ-CoDel on your router if supported.</ProTip>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Full-Duplex vs Half-Duplex — Why This Matters for Performance" />

      <P>Ethernet links can operate in two modes:</P>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, margin: '16px 0 24px' }}>
        <div style={{ border: '1px solid #ef444430', borderRadius: 10, padding: '16px 18px', background: '#ef444408' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', margin: '0 0 10px' }}>Half-Duplex</p>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, margin: 0 }}>
            Transmission in only one direction at a time. Like a walkie-talkie: one side transmits, the other must wait. Used with hubs (all devices share one collision domain) and very early Ethernet. CSMA/CD is required to manage who transmits. Effective throughput is typically 50–70% of link speed due to collisions and backoff.
          </p>
        </div>
        <div style={{ border: `1px solid ${N}30`, borderRadius: 10, padding: '16px 18px', background: `${N}06` }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: N, margin: '0 0 10px' }}>Full-Duplex</p>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, margin: 0 }}>
            Simultaneous transmission in both directions. Like a telephone: both sides can speak and hear simultaneously. Requires switches (each port is its own collision domain — no collisions possible). All modern Ethernet is full-duplex. A 1 Gbps full-duplex link provides 1 Gbps in each direction simultaneously — 2 Gbps total throughput.
          </p>
        </div>
      </div>

      <P>Full-duplex is why switches were so transformative: each port on a switch has a dedicated full-duplex connection to the switch backplane. A 48-port 10G switch has 480 Gbps of switching capacity. 48 devices can simultaneously transmit and receive at 10 Gbps each. With a hub, those same 48 devices would share one 10 Gbps collision domain — 10 Gbps total, half-duplex, with heavy collision degradation under load.</P>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="A Day at Comcast — When Physics Meets Operations" />

      <P>You are a <Hl>Network Performance Engineer at Comcast</Hl> in Philadelphia, supporting residential broadband infrastructure for 2.3 million subscribers in the Philadelphia metro area. It is Tuesday morning. Your team&apos;s real-time monitoring shows elevated customer complaints about video buffering in two specific ZIP codes since 5:45 AM.</P>

      <TimeBlock time="06:10 AM" label="Initial Alert — Throughput Drop on DOCSIS Segment">
        Your monitoring platform (based on SNMP polling of Comcast&apos;s CMTS — Cable Modem Termination Systems) shows a throughput drop from the usual 87% utilization to 94.3% utilization on one CMTS node serving 850 households. You also see increased packet retransmission rates on downstream channels.

        DOCSIS (Data Over Cable Service Interface Specification) uses cable TV coaxial infrastructure. The downstream (internet to home) uses QAM modulation at 6 MHz channel widths. At QAM-256 (256 distinct signal levels, 8 bits per symbol), a single 6 MHz DOCSIS channel carries 38.2 Mbps. Multiple channels are bonded to achieve 1+ Gbps. Signal quality is measured in MER (Modulation Error Ratio) — similar to SNR.

        You pull the MER statistics for the affected node: the downstream MER dropped from a healthy 38 dB to 29 dB at 5:43 AM — 2 minutes before customer complaints started. 29 dB is marginal for QAM-256 (requires ~30 dB). The CMTS has already down-shifted some customers to QAM-64 (64 signal levels, 6 bits/symbol = 28.9 Mbps/channel) automatically.
      </TimeBlock>

      <TimeBlock time="06:25 AM" label="Root Cause Investigation — Signal Impairment">
        MER degradation at this time of day pattern-matches to one cause: thermal noise ingress. DOCSIS upstream spectrum is in the 5–85 MHz range (DOCSIS 3.0) or 5–204 MHz (DOCSIS 3.1). These frequencies are shared with AM radio, CB radio, and RF noise from electrical equipment in homes and businesses.

        As businesses open in the morning (5:45 AM aligns with a large bakery and a commercial laundry facility opening on this node), their electrical equipment generates RF interference that enters through improperly shielded or corroded coaxial tap connections. The interference reduces the signal-to-noise ratio at the CMTS, forcing lower modulation orders.

        You dispatch a technician with a spectrum analyzer. They walk the node&apos;s coaxial network and find what you suspected: a corroded underground tap box at a commercial strip mall shows 14 dB of signal loss (should be less than 3 dB), and the spectrum analyzer shows ingress noise at 35–55 MHz correlating with the electrical equipment&apos;s harmonics.

        Fix: replace the corroded tap housing ($85 in hardware, 45 minutes of work). Signal quality restores to 40 dB MER. All customers return to QAM-256 modulation. Video buffering complaints stop.

        The physics lesson: signal-to-noise ratio directly limits achievable data rate via Shannon&apos;s theorem. A 10 dB SNR drop can halve achievable throughput. A corroded connector introducing signal loss costs 850 households in streaming quality. Physical layer maintenance is not glamorous, but it directly determines the network experience of millions of people.
      </TimeBlock>

      <TimeBlock time="10:30 AM" label="Planning Meeting — Fiber Node Splits for Capacity">
        Your afternoon meeting is about capacity planning. The Philadelphia node at issue is serving 850 households from one DOCSIS 3.1 CMTS port. Industry best practice is 250–400 households per node for reliable service at modern consumption rates (average US household uses 625 GB/month in 2024, peak rate ~500 Mbps during 4K streaming).

        The solution is a node split: install additional fiber runs from the headend to new coaxial nodes, dividing the 850 households into groups of ~280 each. Each group gets its own CMTS port with dedicated upstream and downstream capacity. Cost: $180,000 per node split ($120K for fiber, $60K for equipment). Benefit: restoring headroom from 94% utilization to ~31% per new node.

        This is the fundamental bandwidth-sharing problem of cable infrastructure: coaxial cable is a shared medium (like bus topology), where all homes on the same coaxial segment share the available bandwidth. More households = less bandwidth per household at peak times. Fiber to the home (FTTH/FTTP) eliminates this by giving each home a dedicated fiber strand — but costs 4–6× more to build than HFC (Hybrid Fiber-Coax).
      </TimeBlock>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Interview Questions" />

      <IQ q="What is the difference between bandwidth and throughput? Why does a 1 Gbps link rarely deliver 1 Gbps?">
        <P>Bandwidth is the maximum theoretical capacity of a link — the pipe size. A 1 Gbps Ethernet port has 1 Gbps of bandwidth. Throughput is the actual data rate achieved in practice, always less than or equal to bandwidth.</P>
        <P>Why actual throughput is lower: (1) <strong>Protocol overhead</strong> — TCP/IP headers, Ethernet frame headers, and FCS consume ~4–10% of raw bandwidth. (2) <strong>Packet loss and retransmission</strong> — TCP retransmits lost segments, consuming bandwidth twice. At 1% packet loss, TCP throughput drops significantly due to congestion control reactions. (3) <strong>TCP congestion control</strong> — TCP deliberately backs off when it detects congestion, leaving bandwidth underutilized. (4) <strong>Application processing</strong> — disk I/O, encryption, compression on the sender or receiver can bottleneck before the link is saturated. (5) <strong>Half-duplex or duplex mismatch</strong> — a switch port configured full-duplex talking to a NIC configured half-duplex causes massive collision-induced retransmission. This is a common misconfiguration that can reduce throughput to 10–20% of link speed while the link counters show no physical errors.</P>
      </IQ>

      <IQ q="Why does latency matter more than bandwidth for some applications?">
        <P>Latency determines <em>responsiveness</em> — the perceived delay between an action and its result. Bandwidth determines <em>capacity</em> — how much data you can transfer per unit time. They are independent properties that affect different application characteristics.</P>
        <P>For interactive applications — a SQL query that returns 2KB, a webpage click, a VoIP packet, a gaming position update — the user perceives latency directly. A 10ms SQL query on a 1 Mbps link returns in ~10.016ms. On a 10 Gbps link: ~10.000016ms. The bandwidth difference is irrelevant because the payload is tiny. But a 100ms latency change makes the 1 Mbps link feel 10× slower to the user.</P>
        <P>For bulk transfer applications — backup, video streaming, large file download — bandwidth is the bottleneck. Downloading a 10 GB file over 10 Mbps (1,000+ seconds) vs 1 Gbps (80 seconds). The 1 Gbps latency is irrelevant here since the download takes minutes regardless. This is why CDNs optimize for both: they put content geographically close to reduce latency for the initial request, but then serve it over high-bandwidth links to minimize transfer time.</P>
      </IQ>

      <IQ q="What is jitter and why does it matter more than latency for VoIP?">
        <P>Jitter is the variation in packet arrival intervals over time. If packets are sent every 20ms (standard VoIP frame size) and arrive every 20ms ± 0.5ms, jitter = 0.5ms — excellent. If packets arrive at 10ms, 35ms, 15ms, 40ms intervals, jitter = ~12.5ms — problematic.</P>
        <P>VoIP can tolerate consistent high latency better than variable low latency. A call with 150ms consistent latency is noticeable but usable — users adapt to the pause. A call with 20ms average latency but 80ms jitter sounds choppy: audio arrives in bursts, buffers fill and drain unevenly, causing skips and gaps. VoIP endpoints use a <em>jitter buffer</em> to smooth out arrival variations by holding packets for a small fixed delay before playing them. If jitter exceeds the jitter buffer size, packets arrive too late to play — they are discarded, and the codec must conceal the gap (sounding like brief static or silence).</P>
      </IQ>

      <IQ q="Explain the bandwidth-delay product. Why does it matter for file transfer performance?">
        <P>The bandwidth-delay product (BDP) = link bandwidth × round-trip time. It represents the amount of data that can be &quot;in flight&quot; simultaneously on the network — the maximum amount of unacknowledged data that the sender should be transmitting to fully utilize the link.</P>
        <P>For TCP to saturate a link, the TCP send window must be at least equal to the BDP. If the window is smaller, the sender runs out of transmit credits and pauses waiting for ACKs — leaving bandwidth idle. Example: 1 Gbps transcontinental link, 60ms RTT. BDP = 1 Gbps × 0.06s = 7.5 MB. If TCP window = 65 KB (pre-window-scaling default), achievable throughput = 65 KB / 0.06s = 8.7 Mbps — less than 1% of available bandwidth. With a 64 MB window (window scaling enabled): 64 MB / 0.06s = 8.5 Gbps — close to saturating the link. This is why bulk data transfer tools like iperf3 recommend tuning buffer sizes, and why AWS Direct Connect requires careful TCP tuning for the best performance.</P>
      </IQ>

      <HR />

      <Part n="10" title="Common Misconceptions" />

      <Err title="'Bandwidth IS speed — more Mbps = faster internet'">
        Bandwidth is one component of &quot;speed,&quot; but latency often matters more for perceived performance. A 100 Mbps connection with 5ms latency feels faster for web browsing than a 1 Gbps connection with 100ms latency. This is because most web interactions involve many small round trips — a page with 50 resources (images, scripts, CSS) requires 50 round trips. At 100ms RTT, each round trip adds 100ms. At 5ms RTT, each adds 5ms. HTTP/2 and HTTP/3 reduce round trips through multiplexing, but latency still dominates for interactive web use.
      </Err>

      <Err title="'Fiber is faster than copper because light travels faster'">
        Light in fiber (2×10⁸ m/s) is actually slower than electrical signals in copper (0.7–0.9× speed of light, approximately 2.1–2.7×10⁸ m/s). Fiber is preferred for long-distance and high-bandwidth applications because: (1) Fiber has much lower attenuation — electrical signal in copper degrades significantly over 100m; fiber can run 40+ km without amplification. (2) Fiber has much higher bandwidth capacity (GHz vs MHz). (3) Fiber is immune to electromagnetic interference. (4) Fiber cannot be tapped without physically disturbing the cable (though this is possible with specialized equipment). Fiber&apos;s speed advantage is in bandwidth capacity, not raw propagation speed.
      </Err>

      <Err title="'Wireless is slower because signals travel through air'">
        Radio waves in free space travel at the full speed of light (3×10⁸ m/s) — faster than light in fiber (2×10⁸ m/s). Wireless latency is not caused by slow signal propagation. It is caused by: (1) Contention access protocols (CSMA/CA) that require waiting before transmitting. (2) Retransmissions due to RF interference and packet loss. (3) Multiple hops (access point, then wired network). (4) Protocol overhead for encryption, authentication. Starlink&apos;s satellite-to-ground propagation is actually faster than equivalent fiber routes because radio travels 1.5× faster than light in glass.
      </Err>

      <HR />

      <KeyTakeaways items={[
        'Signal speed in fiber is ~2/3 the speed of light (2×10⁸ m/s). This hard physical limit sets the minimum latency for any network communication.',
        'Bandwidth (Hz) is the physical property of a channel. Data rate (bps) depends on bandwidth AND encoding scheme. PAM4 doubles data rate vs NRZ by using 4 signal levels per symbol.',
        'Shannon\'s theorem: max data rate = B × log₂(1 + S/N). Signal-to-noise ratio limits achievable throughput regardless of bandwidth. A corroded connector degrading SNR reduces throughput for hundreds of users.',
        'Bandwidth ≠ throughput ≠ latency ≠ jitter. These measure four different things. High bandwidth links can have high latency (satellite). Low bandwidth links can have low latency (local fiber).',
        'The bandwidth-delay product determines TCP window requirements. A 1 Gbps link with 60ms RTT needs a 7.5 MB window to saturate. Default TCP windows (64 KB) leave 99% of bandwidth idle on such links.',
        'Full-duplex allows simultaneous bidirectional transmission — switches make this possible by eliminating shared collision domains. A 1 Gbps full-duplex link delivers 1 Gbps in each direction simultaneously.',
        'Latency components: propagation (distance/speed), transmission (packet_size/link_rate), queuing (buffer depth), processing (lookup + forwarding). Only queuing is significantly under your control via QoS.',
        'Queuing delay (bufferbloat) is the most variable latency component. AQM algorithms like FQ-CoDel keep queuing delay under 5ms by dropping packets proactively before buffers fill.',
        'Cat6A supports 10GbE at 100m with 500 MHz bandwidth. Single-mode fiber supports 100GbE at 40km. DWDM multiplies fiber capacity by running hundreds of wavelengths simultaneously.',
        'Jitter matters more than average latency for real-time apps. VoIP needs jitter < 30ms. High consistent latency is usable; unpredictable variable latency destroys audio/video quality.',
      ]} />

      <HR />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px', textAlign: 'center', margin: '16px 0' }}>
        <p style={{ fontSize: 11, color: N, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '.1em', margin: '0 0 8px' }}>NEXT MODULE</p>
        <p style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', margin: '0 0 8px', letterSpacing: '-0.5px' }}>Binary and Hexadecimal for Network Engineers</p>
        <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 18px', lineHeight: 1.7 }}>The two number systems behind every IP address, MAC address, and packet capture. Master binary and hex once and never struggle with subnetting or packet analysis again.</p>
        <Link href="/learn/networking/binary-and-hex" style={{ display: 'inline-block', background: N, color: '#fff', padding: '10px 28px', borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: 'none', letterSpacing: '.02em' }}>
          Continue to Binary and Hex →
        </Link>
      </div>

    </LearnLayout>
  )
}
