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

// ─── Interactive: Signal Encoding Visualizer ──────────────────────────────────

const ENCODINGS = [
  { key: 'nrzl',    label: 'NRZ-L',       color: '#60a5fa' },
  { key: 'nrzi',    label: 'NRZ-I',       color: '#34d399' },
  { key: 'manchester', label: 'Manchester', color: '#f59e0b' },
  { key: '4b5b',    label: '4B/5B+NRZI',  color: '#a78bfa' },
  { key: 'pam4',    label: 'PAM4',         color: '#f472b6' },
]

// Bit sequence to visualize: 1 1 0 1 0 0 1 0
const BITS = [1, 1, 0, 1, 0, 0, 1, 0]

function SignalEncodingVisualizer() {
  const [active, setActive] = useState('nrzl')
  const W = 400
  const H = 100
  const segW = W / BITS.length // 50px per bit

  function getPath(key: string): string {
    let path = ''
    let lastLevel = -1

    if (key === 'nrzl') {
      BITS.forEach((b, i) => {
        const level = b === 1 ? 20 : 75
        const x = i * segW
        if (i === 0) {
          path += `M ${x} ${level}`
        } else if (level !== lastLevel) {
          path += ` L ${x} ${lastLevel} L ${x} ${level}`
        }
        path += ` L ${x + segW} ${level}`
        lastLevel = level
      })
    } else if (key === 'nrzi') {
      let current = 75
      BITS.forEach((b, i) => {
        const x = i * segW
        if (i === 0) {
          path += `M ${x} ${current}`
        } else {
          path += ` L ${x} ${current}`
        }
        if (b === 1) {
          const next = current === 20 ? 75 : 20
          path += ` L ${x} ${next}`
          current = next
        }
        path += ` L ${x + segW} ${current}`
      })
    } else if (key === 'manchester') {
      BITS.forEach((b, i) => {
        const x = i * segW
        const mid = x + segW / 2
        if (b === 1) {
          // High first half → Low second half
          if (i === 0) path += `M ${x} 20`
          else path += ` L ${x} 20`
          path += ` L ${mid} 20 L ${mid} 75 L ${x + segW} 75`
        } else {
          // Low first half → High second half
          if (i === 0) path += `M ${x} 75`
          else path += ` L ${x} 75`
          path += ` L ${mid} 75 L ${mid} 20 L ${x + segW} 20`
        }
      })
    } else if (key === '4b5b') {
      // PAM2 (NRZ-I) on 4B/5B encoded bits: add parity bits: 1101 0010 → 11010 00101
      const encoded = [1,1,0,1,0, 0,0,1,0,1]
      let current = 75
      const segW2 = W / encoded.length
      encoded.forEach((b, i) => {
        const x = i * segW2
        if (i === 0) path += `M ${x} ${current}`
        else path += ` L ${x} ${current}`
        if (b === 1) {
          const next = current === 20 ? 75 : 20
          path += ` L ${x} ${next}`
          current = next
        }
        path += ` L ${x + segW2} ${current}`
      })
    } else if (key === 'pam4') {
      // PAM4: 2 bits per symbol → 4 voltage levels (0,1,2,3 mapped to 85,65,35,15)
      const levels: Record<string, number> = { '00': 80, '01': 60, '10': 35, '11': 15 }
      const pairs = ['11','01','00','10'] // group input bits into 2-bit symbols (4 symbols)
      const segW2 = W / pairs.length
      pairs.forEach((p, i) => {
        const lvl = levels[p]
        const x = i * segW2
        if (i === 0) path += `M ${x} ${lvl}`
        else path += ` L ${x} ${lvl}`
        path += ` L ${x + segW2} ${lvl}`
      })
    }
    return path
  }

  const enc = ENCODINGS.find(e => e.key === active)!
  const descriptions: Record<string, string> = {
    nrzl:    'NRZ-L (Non-Return to Zero Level): 1 = high voltage, 0 = low voltage. Simple but no clock recovery — long runs of same bit lose synchronization.',
    nrzi:    'NRZ-I (Non-Return to Zero Inverted): transition on 1, no transition on 0. USB uses this. Still has long-zero synchronization issue.',
    manchester: 'Manchester: always a mid-bit transition — falling = 1, rising = 0 (IEEE 802.3). Self-clocking. Doubles baud rate vs NRZ for same bit rate.',
    '4b5b':  '4B/5B: every 4 data bits mapped to 5 code bits (no more than 3 consecutive zeros). Then sent with NRZ-I. Used in 100BASE-TX Fast Ethernet.',
    pam4:    'PAM4 (Pulse Amplitude Modulation 4-level): 4 voltage levels encode 2 bits per symbol. 400G/800G Ethernet uses PAM4 to double throughput per lane.',
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '28px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 16px' }}>// SIGNAL ENCODING VISUALIZER — input bits: 1 1 0 1 0 0 1 0</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {ENCODINGS.map(e => (
          <button key={e.key} onClick={() => setActive(e.key)}
            style={{ padding: '6px 16px', borderRadius: 99, fontSize: 12, fontFamily: FONT_MONO, fontWeight: 700, cursor: 'pointer', border: `2px solid ${e.color}`, background: active === e.key ? e.color : 'transparent', color: active === e.key ? '#000' : e.color, transition: 'all .15s' }}>
            {e.label}
          </button>
        ))}
      </div>
      <div style={{ background: '#0d1117', borderRadius: 10, padding: 16, overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, display: 'block' }}>
          {/* Grid lines */}
          <line x1="0" y1="48" x2={W} y2="48" stroke="#ffffff15" strokeWidth="1" />
          {/* Bit labels */}
          {BITS.map((b, i) => (
            <text key={i} x={i * segW + segW / 2} y="95" textAnchor="middle" fontSize="9" fill="#8b949e" fontFamily="monospace">{b}</text>
          ))}
          {/* Signal path */}
          <path d={getPath(active)} fill="none" stroke={enc.color} strokeWidth="2.5" />
        </svg>
      </div>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 14, lineHeight: 1.7 }}>{descriptions[active]}</p>
    </div>
  )
}

// ─── Interactive: Latency Breakdown Calculator ────────────────────────────────

const LINK_TYPES = [
  { label: 'Fiber (1000 km)',  propagation_ms: 5,    bw_gbps: 100, processing_us: 50,  queuing_us: 100 },
  { label: 'Copper (1 km)',    propagation_ms: 0.005, bw_gbps: 1,  processing_us: 10,  queuing_us: 50  },
  { label: 'WiFi 6 (50 m)',    propagation_ms: 0.0002,bw_gbps: 0.6,processing_us: 200, queuing_us: 300 },
  { label: 'Satellite GEO',    propagation_ms: 280,   bw_gbps: 0.05,processing_us: 100,queuing_us: 500 },
  { label: 'Satellite LEO',    propagation_ms: 20,    bw_gbps: 0.1, processing_us: 100,queuing_us: 200 },
  { label: '5G mmWave (300m)', propagation_ms: 0.001, bw_gbps: 2,  processing_us: 150, queuing_us: 400 },
]

const PKT_SIZES = [
  { label: 'DNS Query (64 B)',     bytes: 64   },
  { label: 'ACK packet (64 B)',    bytes: 64   },
  { label: 'Web page (1400 B)',    bytes: 1400 },
  { label: 'Max Ethernet (1500 B)',bytes: 1500 },
  { label: 'Jumbo frame (9000 B)', bytes: 9000 },
]

function LatencyBreakdown() {
  const [linkIdx, setLinkIdx] = useState(0)
  const [pktIdx, setPktIdx] = useState(2)

  const link = LINK_TYPES[linkIdx]
  const pkt  = PKT_SIZES[pktIdx]

  const transmission_ms = (pkt.bytes * 8) / (link.bw_gbps * 1e9) * 1000
  const propagation_ms  = link.propagation_ms
  const processing_ms   = link.processing_us / 1000
  const queuing_ms      = link.queuing_us / 1000
  const total_ms        = transmission_ms + propagation_ms + processing_ms + queuing_ms

  const bars = [
    { label: 'Propagation',  ms: propagation_ms,  color: '#60a5fa', desc: 'distance ÷ speed_of_light_in_medium' },
    { label: 'Transmission', ms: transmission_ms, color: '#34d399', desc: 'packet_size ÷ link_bandwidth' },
    { label: 'Processing',   ms: processing_ms,   color: '#f59e0b', desc: 'router/switch lookup time' },
    { label: 'Queuing',      ms: queuing_ms,       color: '#f472b6', desc: 'wait in output buffer' },
  ]
  const maxMs = Math.max(...bars.map(b => b.ms), 0.001)

  function fmt(ms: number) {
    if (ms < 0.001) return `${(ms * 1e6).toFixed(2)} ns`
    if (ms < 1) return `${(ms * 1000).toFixed(1)} µs`
    return `${ms.toFixed(3)} ms`
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '28px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 16px' }}>// LATENCY BREAKDOWN CALCULATOR</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 8px' }}>Link type</p>
          {LINK_TYPES.map((l, i) => (
            <button key={i} onClick={() => setLinkIdx(i)}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '7px 12px', marginBottom: 4, borderRadius: 8, fontSize: 13, cursor: 'pointer', border: `1px solid ${i === linkIdx ? G : 'var(--border)'}`, background: i === linkIdx ? 'rgba(16,185,129,0.1)' : 'transparent', color: i === linkIdx ? G : 'var(--muted)' }}>
              {l.label}
            </button>
          ))}
        </div>
        <div>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 8px' }}>Packet size</p>
          {PKT_SIZES.map((p, i) => (
            <button key={i} onClick={() => setPktIdx(i)}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '7px 12px', marginBottom: 4, borderRadius: 8, fontSize: 13, cursor: 'pointer', border: `1px solid ${i === pktIdx ? '#60a5fa' : 'var(--border)'}`, background: i === pktIdx ? 'rgba(96,165,250,0.1)' : 'transparent', color: i === pktIdx ? '#60a5fa' : 'var(--muted)' }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>
      {bars.map(b => (
        <div key={b.label} style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 13, color: b.color, fontWeight: 700 }}>{b.label}</span>
            <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: FONT_MONO }}>{fmt(b.ms)} — {b.desc}</span>
          </div>
          <div style={{ background: '#1e293b', borderRadius: 4, height: 10 }}>
            <div style={{ background: b.color, width: `${Math.max((b.ms / maxMs) * 100, 0.5)}%`, height: 10, borderRadius: 4, transition: 'width .3s' }} />
          </div>
        </div>
      ))}
      <div style={{ borderTop: '1px solid var(--border)', marginTop: 18, paddingTop: 14, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 700 }}>Total one-way latency</span>
        <span style={{ fontSize: 16, color: G, fontWeight: 800, fontFamily: FONT_MONO }}>{fmt(total_ms)}</span>
      </div>
      <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>RTT ≈ 2× one-way. BDP = bandwidth × RTT = {((link.bw_gbps * 1e9 / 8) * (total_ms * 2 / 1000) / 1024).toFixed(0)} KB in flight</p>
    </div>
  )
}

// ─── Interactive: Bandwidth vs Latency — what matters for which app? ──────────

const APPS = [
  { name: 'Large File Download', emoji: '⬇', bwScore: 10, latScore: 1, why: 'Throughput is everything. Once TCP window is full, latency only matters for slow-start phase. A 10 Gbps link with 100ms RTT moves data faster than a 1 Gbps link with 1ms RTT.' },
  { name: 'Web Page Load',       emoji: '🌐', bwScore: 5,  latScore: 7, why: 'Mixed. The first RTT (DNS + TCP handshake + HTTP GET + first byte) is pure latency. Then content download is bandwidth-limited. HTTP/2 multiplexing and TLS 1.3 0-RTT cut latency impact.' },
  { name: 'Video Call (1080p)',   emoji: '📹', bwScore: 4,  latScore: 9, why: 'Needs ~4 Mbps stable — easy on modern links. But jitter > 30ms causes visual artifacts; latency > 150ms makes conversation feel unnatural. Latency + jitter dominate.' },
  { name: 'Online Gaming',        emoji: '🎮', bwScore: 1,  latScore: 10, why: 'Games send tiny state packets (64-512 B), barely using bandwidth. RTT ("ping") must be < 50ms for responsive gameplay. Jitter causes rubber-banding. Pure latency app.' },
  { name: 'DNS Lookup',           emoji: '🔍', bwScore: 1,  latScore: 10, why: 'Query + response is ~64 bytes each. Completely latency-bound. A 1ms DNS lookup vs 100ms lookup adds 99ms to every new TCP connection — critical on mobile networks.' },
  { name: 'Database Replication', emoji: '🗄',  bwScore: 7,  latScore: 8, why: 'Needs both: high bandwidth to ship bulk changes + low latency to keep replica lag tight. WAN replication between datacenters is often limited by speed-of-light propagation.' },
]

function BandwidthVsLatency() {
  const [active, setActive] = useState(0)
  const app = APPS[active]

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '28px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 16px' }}>// BANDWIDTH vs LATENCY — what dominates each application?</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {APPS.map((a, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{ padding: '6px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer', border: `1px solid ${i === active ? G : 'var(--border)'}`, background: i === active ? 'rgba(16,185,129,0.1)' : 'transparent', color: 'var(--text)' }}>
            {a.emoji} {a.name}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 18 }}>
        <div>
          <p style={{ fontSize: 12, color: '#60a5fa', margin: '0 0 8px', fontWeight: 700 }}>Bandwidth sensitivity</p>
          <div style={{ background: '#1e293b', borderRadius: 6, height: 16 }}>
            <div style={{ background: '#60a5fa', width: `${app.bwScore * 10}%`, height: 16, borderRadius: 6, transition: 'width .3s' }} />
          </div>
          <p style={{ fontSize: 12, color: '#60a5fa', margin: '6px 0 0', fontFamily: FONT_MONO }}>{app.bwScore}/10</p>
        </div>
        <div>
          <p style={{ fontSize: 12, color: '#f59e0b', margin: '0 0 8px', fontWeight: 700 }}>Latency sensitivity</p>
          <div style={{ background: '#1e293b', borderRadius: 6, height: 16 }}>
            <div style={{ background: '#f59e0b', width: `${app.latScore * 10}%`, height: 16, borderRadius: 6, transition: 'width .3s' }} />
          </div>
          <p style={{ fontSize: 12, color: '#f59e0b', margin: '6px 0 0', fontFamily: FONT_MONO }}>{app.latScore}/10</p>
        </div>
      </div>
      <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8 }}>{app.why}</p>
    </div>
  )
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function DataTransmission() {
  return (
    <LearnLayout
      title="Data Transmission"
      description="A complete, gap-free treatment of how data physically moves: signal encoding, modulation, the mathematics of bandwidth, every component of latency, noise, error correction, QoS, and practical measurement tools."
      section="Networking Fundamentals"
      readTime="55 min"
    >
      {/* ── Ch 01 ── */}
      <Chapter n="01" title="What Is Data Transmission?" subtitle="From electrons to information" />
      <Para>
        Every byte you send — a text message, a video call frame, a DNS query — must ultimately become a physical phenomenon: a voltage on a wire, a light pulse in fiber, an electromagnetic wave in the air. <Accent>Data transmission</Accent> is the entire discipline of converting digital bits into physical signals, moving those signals across a medium, and recovering the original bits at the other end as faithfully as possible.
      </Para>
      <Para>
        This sounds simple, but three forces work against you: <Accent>distance</Accent> weakens signals (attenuation), <Accent>noise</Accent> corrupts them, and <Accent>time</Accent> limits how fast you can send them. Understanding these forces — and the techniques engineered to fight them — is the foundation of everything else in networking.
      </Para>
      <StoryBox>
        You click "Send" on a 4K video file. The bytes leave your SSD, cross a PCIe bus, get handed to your NIC, encoded as electrical pulses on your Ethernet cable, converted to light in a fiber transceiver at your building's patch panel, launched as laser pulses that travel at ~200,000 km/s through 800 km of fiber, and reconstructed as electrons at the destination datacenter — all in about 4 milliseconds of propagation. The file itself takes seconds because the link speed (not the speed of light) is the bottleneck. This module explains every step of that journey in precise detail.
      </StoryBox>

      <H2>Transmission Media: Where Signals Live</H2>
      <Para>
        Three physical media dominate modern networking, each with a different physics:
      </Para>
      <Para>
        <Accent>Copper (twisted-pair, coaxial):</Accent> Current flows through a conductor. Electrons don't actually move fast — they drift ~1 mm/s — but the electromagnetic field propagates at ~67% the speed of light (~200,000 km/s). Twisted pairs (used in Ethernet Cat5e/Cat6/Cat8) twist the two conductors around each other so external noise hits both wires equally and cancels when the receiver takes the differential voltage. Coax uses a center conductor surrounded by a ground shield — still used in cable TV and some last-mile internet.
      </Para>
      <Para>
        <Accent>Fiber optic:</Accent> Light pulses travel through a glass or plastic core. Single-mode fiber (9 µm core) uses a single laser ray path and supports 100+ km without amplification. Multi-mode fiber (50 or 62.5 µm core) allows multiple ray paths (modes), causes modal dispersion, and is limited to ~300–500 m — used in datacenter and campus backbones. Light in glass travels at ~200,000 km/s (about 67% of c in vacuum). Fiber is immune to EMI, can't be tapped without physical intrusion, and supports terabit-per-second throughput on DWDM systems.
      </Para>
      <Para>
        <Accent>Wireless (radio frequency):</Accent> Electromagnetic waves propagate through air or vacuum. WiFi uses 2.4 GHz and 5 GHz (or 6 GHz in WiFi 6E). 5G uses frequency bands from 700 MHz (long range, low capacity) to 39 GHz mmWave (short range, very high capacity). Radio signals travel at c ≈ 300,000 km/s in air — faster than in glass. Wireless introduces unique challenges: multipath reflections, interference from neighboring networks, and the shared, unguided nature of the medium.
      </Para>

      <Divider />

      {/* ── Ch 02 ── */}
      <Chapter n="02" title="Analog vs Digital Signals" subtitle="The fundamental representation divide" />
      <Para>
        An <Accent>analog signal</Accent> is a continuously variable quantity. A telephone's classic voice signal varied voltage in exact proportion to sound pressure — infinite possible values, smooth curves, infinite resolution (at least in theory). Analog signals are elegant but fragile: any amplification also amplifies the noise that has accumulated on the signal, and after many amplification stages noise compounds into distortion.
      </Para>
      <Para>
        A <Accent>digital signal</Accent> uses a finite set of discrete states — most commonly two: high voltage = 1, low voltage = 0. The key advantage of digital isn't that it sounds better — it's that it can be <Accent>regenerated</Accent>, not just amplified. A regenerator reads the incoming signal, decides whether each bit is 0 or 1 (even with noise present), and outputs a clean new signal. Noise below the decision threshold is completely eliminated. This is why digital communication dominates: every repeater restores perfect signal quality.
      </Para>

      <H2>Signal Parameters</H2>
      <Para>
        Any periodic signal can be described by:
      </Para>
      <Para>
        <Accent>Amplitude:</Accent> The peak value (voltage, optical power, field strength). Higher amplitude = higher power = better SNR = longer reach.
      </Para>
      <Para>
        <Accent>Frequency:</Accent> Cycles per second (Hz). Higher frequency = more oscillations per second = potentially more data per second, but also more attenuation over distance (high-frequency energy is absorbed more by most media).
      </Para>
      <Para>
        <Accent>Phase:</Accent> The position of the waveform relative to a reference point (0° to 360°). Phase shifts can encode information — PSK and QAM both exploit this.
      </Para>
      <Para>
        <Accent>Wavelength:</Accent> λ = c / f. The physical distance one complete cycle occupies. In fiber optic, different wavelengths of light carry independent data streams simultaneously (WDM). The C-band (1530–1565 nm) carries most long-haul traffic today.
      </Para>

      <H2>Baud Rate vs Bit Rate — a Critical Distinction</H2>
      <Para>
        <Accent>Baud rate</Accent> (symbols per second, Bd) is the number of signal state changes per second. <Accent>Bit rate</Accent> (bits per second, bps) is the number of data bits per second. These are only equal when each symbol carries exactly 1 bit.
      </Para>
      <Para>
        If each symbol can be one of 4 states (2 bits), then: bit rate = baud rate × 2. If each symbol can be one of 64 states (6 bits): bit rate = baud rate × 6. Modern modulations (QAM-4096 in cable DOCSIS 3.1) carry 12 bits per symbol — the baud rate is a fraction of the bit rate. This distinction is critical for understanding why "56K modem" ran at only 8000 baud.
      </Para>

      <Err title="Confusing baud rate with bit rate">
        <Para>Saying "100 Mbps Ethernet runs at 100 million baud" is wrong. 100BASE-TX Ethernet uses 4B/5B encoding and MLT-3 signaling, running at 125 Mbaud to achieve 100 Mbps. 1000BASE-T uses 4D-PAM5 across 4 pairs, each pair at 125 Mbaud, achieving 1000 Mbps total — baud rate is 125 million, bit rate is 1 billion.</Para>
      </Err>

      <Divider />

      {/* ── Ch 03 ── */}
      <Chapter n="03" title="Signal Encoding" subtitle="How bits become waveforms on a wire" />
      <Para>
        <Accent>Line coding</Accent> is the process of converting a sequence of bits into a sequence of voltage levels (or light pulses) for transmission. The choice of line code directly affects synchronization, bandwidth efficiency, DC component (important for transformers), and error detection capability.
      </Para>
      <Para>
        The interactive visualizer below shows the same 8-bit sequence (1 1 0 1 0 0 1 0) encoded in five different schemes. Click each to see the waveform and understand the trade-offs.
      </Para>

      <SignalEncodingVisualizer />

      <H2>NRZ-L (Non-Return to Zero Level)</H2>
      <Para>
        The simplest possible scheme: 1 = high, 0 = low, voltage stays constant throughout the bit period. Used internally in many chips. Problems: (1) <Accent>DC component</Accent> — a long string of 1s means DC voltage, which can't pass through AC-coupled transformers; (2) <Accent>clock recovery failure</Accent> — long strings of the same bit provide no transitions for the receiver's clock recovery circuit to lock onto. After 10–20 identical bits, the receiver's clock drifts and bits are miscounted.
      </Para>

      <H2>NRZ-I (Non-Return to Zero Inverted)</H2>
      <Para>
        Encodes data as transitions rather than levels: a 1 causes a voltage transition, a 0 produces no change. This eliminates the problem with long strings of 1s (every 1 gives a transition). But a long string of 0s still has no transitions. USB 1.1 and 2.0 use NRZ-I with bit-stuffing: a 0 is forcibly inserted after 6 consecutive 1s, which is then removed by the receiver.
      </Para>

      <H2>Manchester Encoding</H2>
      <Para>
        Every bit period contains a mandatory mid-bit transition: falling (high→low) encodes a 1; rising (low→high) encodes a 0. This is the IEEE 802.3 convention (10BASE-T Ethernet). Advantages: <Accent>self-clocking</Accent> — the receiver can recover the clock from transitions alone, and there are never more than 1 bit period without a transition. Disadvantage: the guaranteed mid-bit transition means Manchester encoding requires <Accent>twice the baud rate</Accent> of NRZ for the same bit rate. 10BASE-T at 10 Mbps runs at 20 Mbaud.
      </Para>
      <Para>
        Differential Manchester (used in Token Ring) always has a mid-bit transition, but encodes data in whether a transition occurs at the <em>start</em> of the bit period (0 = transition, 1 = no transition). This is more robust to polarity inversion.
      </Para>

      <H2>4B/5B + NRZI</H2>
      <Para>
        Used in FDDI and 100BASE-TX (Fast Ethernet): every 4 data bits are mapped to a 5-bit code word selected to guarantee no more than 3 consecutive zeros. The 5-bit code words are then sent using NRZ-I. The 32 code words (out of 32 possible 5-bit patterns) that have too many zeros are simply never used — this gives 16 data codes plus 16 control codes. Efficiency: 4/5 = 80%. To achieve 100 Mbps, 100BASE-TX runs the physical layer at 125 Mbaud.
      </Para>

      <H2>8B/10B Encoding</H2>
      <Para>
        A generalization: every 8 data bits map to a 10-bit code. Used in Gigabit Ethernet (1000BASE-X), Fibre Channel, USB 3.0 (SuperSpeed). Guarantees DC balance (equal 1s and 0s over any run) and limits run length. Efficiency: 80%. The codes maintain a running disparity — if more 1s than 0s have been sent recently, the next code word is chosen to have more 0s.
      </Para>

      <H2>64B/66B Encoding</H2>
      <Para>
        Used in 10 Gigabit Ethernet and faster. Every 64 data bits are preceded by a 2-bit synchronization header (01 or 10 — never 00 or 11, ensuring transitions). Efficiency: 64/66 ≈ 97%. Much more efficient than 8B/10B, at the cost of more complex scrambling logic.
      </Para>

      <H2>PAM4 (Pulse Amplitude Modulation, 4-level)</H2>
      <Para>
        PAM4 uses 4 voltage levels instead of 2, encoding 2 bits per symbol. At the same baud rate as NRZ (PAM2), PAM4 carries twice the data. Used in 400 Gbps and 800 Gbps Ethernet. The trade-off is reduced noise margin: with 4 levels, the voltage difference between adjacent levels is one-third the voltage difference in 2-level signaling, requiring a much better SNR. PAM4 links use sophisticated DSP, forward error correction, and low-noise components.
      </Para>

      <WowBox emoji="⚡" title="How 400G Ethernet achieves 400 Gbps">
        <Para>400GBASE-SR8: 8 optical lanes × 50 Gbps per lane = 400 Gbps. Each lane uses PAM4 at 26.5625 Gbaud × 2 bits/symbol = 53.125 Gbps, then reduced to 50 Gbps after 64B/66B encoding overhead. 400GBASE-DR4: 4 lanes × 100 Gbps each with 50 Gbaud PAM4. Future 800G and 1.6T use the same approach with more lanes and higher baud rates.</Para>
      </WowBox>

      <Divider />

      {/* ── Ch 04 ── */}
      <Chapter n="04" title="Modulation" subtitle="Carrying digital data over analog carriers" />
      <Para>
        Line coding works directly on DC signals (voltage levels on wire). But many transmission systems — wireless, DSL, cable, fiber with multiple wavelengths — need to carry digital data by modifying a <Accent>carrier wave</Accent> (a continuous sinusoidal signal). This is <Accent>modulation</Accent>. Three fundamental properties of a sine wave can be varied to carry data.
      </Para>

      <H2>ASK — Amplitude Shift Keying</H2>
      <Para>
        The amplitude (strength) of the carrier changes between states: high amplitude = 1, low amplitude = 0 (or zero amplitude — this is called OOK, On-Off Keying). Simplest conceptually. <Accent>Problem:</Accent> amplitude variations are exactly what noise and attenuation cause — any distance attenuates the signal and corrupts the data. Used in optical fiber for simple single-channel systems (on/off laser = 1/0), but avoided in RF systems exposed to fading.
      </Para>

      <H2>FSK — Frequency Shift Keying</H2>
      <Para>
        The carrier switches between two different frequencies: one frequency = 1, another frequency = 0. Old analog modems (Bell 103 at 300 bps) used FSK. Frequency changes are robust to amplitude noise (AGC circuits can equalize amplitude). Still used in: low-speed telemetry, some IoT devices (LoRa uses a form of FSK called chirp spread spectrum). <Accent>Problem:</Accent> each frequency occupies bandwidth in the spectrum — two frequencies means at least 2× the bandwidth of a single-frequency system.
      </Para>

      <H2>PSK — Phase Shift Keying</H2>
      <Para>
        The phase of the carrier changes to represent symbols. <Accent>BPSK</Accent> (Binary PSK): 0° = 0, 180° = 1 — 1 bit per symbol, very robust, used in satellite and deep-space comms. <Accent>QPSK</Accent> (Quadrature PSK): 4 phases (45°, 135°, 225°, 315°) — 2 bits per symbol. <Accent>8-PSK</Accent>: 8 phases — 3 bits per symbol. Used in GSM, HSPA+. Phase detection requires coherent receivers that maintain a reference phase — adds receiver complexity.
      </Para>

      <H2>QAM — Quadrature Amplitude Modulation</H2>
      <Para>
        QAM combines both amplitude and phase variation. Symbols are points on a 2D constellation diagram (in-phase I vs quadrature Q axes). <Accent>16-QAM</Accent>: 16 points in a 4×4 grid — 4 bits per symbol. <Accent>64-QAM</Accent>: 64 points — 6 bits per symbol. <Accent>256-QAM</Accent>: 8 bits per symbol. <Accent>1024-QAM</Accent> (WiFi 6): 10 bits per symbol. <Accent>4096-QAM</Accent> (DOCSIS 3.1): 12 bits per symbol.
      </Para>
      <Para>
        Higher-order QAM carries more bits per symbol but requires higher SNR because the constellation points are closer together. Cable DOCSIS 3.1 can use 4096-QAM downstream because cable plants are well-controlled, amplified environments. WiFi must use lower orders at longer distances where SNR degrades.
      </Para>
      <CodeBlock title="QAM bit efficiency">
{`Modulation    Bits/Symbol   Min SNR (approx)  Application
─────────────────────────────────────────────────────────
BPSK          1             ~6 dB             Satellite, deep space
QPSK          2             ~9 dB             LTE control channels
16-QAM        4             ~16 dB            4G LTE data
64-QAM        6             ~22 dB            WiFi 5, cable
256-QAM       8             ~28 dB            WiFi 6, DOCSIS
1024-QAM      10            ~34 dB            WiFi 6 close range
4096-QAM      12            ~40 dB            DOCSIS 3.1 downstream`}
      </CodeBlock>

      <H2>OFDM — Orthogonal Frequency Division Multiplexing</H2>
      <Para>
        WiFi, 4G LTE, 5G NR, and ADSL all use OFDM. Instead of one wide carrier, OFDM divides the channel into hundreds or thousands of narrow <Accent>subcarriers</Accent>, each carrying a QAM symbol at a low symbol rate. "Orthogonal" means the subcarriers are mathematically perpendicular — each subcarrier's peak coincides exactly with the nulls of all other subcarriers, eliminating inter-carrier interference.
      </Para>
      <Para>
        OFDM advantages: (1) <Accent>multipath resilience</Accent> — echoes spread over time are contained within the cyclic prefix (guard interval), not contaminating adjacent symbols; (2) frequency-selective fading only affects some subcarriers, not all; (3) can allocate different modulation per subcarrier based on channel quality. WiFi 6 (802.11ax) adds OFDMA, which divides subcarriers among multiple users simultaneously.
      </Para>

      <Divider />

      {/* ── Ch 05 ── */}
      <Chapter n="05" title="The Nyquist and Shannon Theorems" subtitle="The mathematics that defines the ceiling" />
      <Para>
        Two theorems form the absolute mathematical foundation of data rate limits. Every network engineer must understand these — they determine what is physically possible, independent of technology.
      </Para>

      <H2>Nyquist's Theorem (1924)</H2>
      <Para>
        <Accent>The maximum data rate of a noiseless channel</Accent> of bandwidth B Hz, using V discrete signal levels, is:
      </Para>
      <CodeBlock title="Nyquist's Theorem">
{`Max data rate = 2 × B × log₂(V)   bits/second

Where:
  B = channel bandwidth in Hz
  V = number of discrete signal levels

Examples:
  Noiseless 3 kHz voice channel, binary:
    = 2 × 3000 × log₂(2) = 6,000 bps

  Noiseless 3 kHz channel, 4 levels (2 bits/symbol):
    = 2 × 3000 × log₂(4) = 12,000 bps

  Noiseless 3 kHz channel, 8 levels (3 bits/symbol):
    = 2 × 3000 × log₂(8) = 18,000 bps`}
      </CodeBlock>
      <Para>
        Nyquist tells us that even in a perfect, noiseless world, you can't sample a signal faster than twice its bandwidth (the Nyquist rate) without aliasing — sampling faster gives you no new information. This is why audio CD quality samples at 44,100 Hz for 20 kHz audio (44,100 ≈ 2 × 22,050 Hz with some headroom).
      </Para>
      <Para>
        The limit is only on the <em>sampling rate</em> given the bandwidth — you can still increase the data rate by using more voltage levels. But more levels require better SNR, which brings us to Shannon.
      </Para>

      <H2>Shannon-Hartley Theorem (1948)</H2>
      <Para>
        Claude Shannon's theorem gives the <Accent>absolute theoretical maximum</Accent> (the channel capacity C) for a real channel with Gaussian noise:
      </Para>
      <CodeBlock title="Shannon-Hartley Theorem">
{`C = B × log₂(1 + S/N)   bits/second

Where:
  B   = channel bandwidth in Hz
  S/N = signal-to-noise ratio (linear, not dB)

Converting SNR from dB to linear:
  S/N (linear) = 10^(SNR_dB / 10)

Examples:
  3 kHz telephone channel, SNR = 30 dB:
    S/N = 10^3 = 1000
    C = 3000 × log₂(1001) ≈ 3000 × 9.97 ≈ 29,900 bps
    (This is why 56K modems topped out ~33–56 kbps)

  100 MHz WiFi channel, SNR = 20 dB (S/N = 100):
    C = 100×10⁶ × log₂(101) ≈ 100×10⁶ × 6.66 ≈ 666 Mbps

  100 MHz WiFi channel, SNR = 40 dB (S/N = 10000):
    C = 100×10⁶ × log₂(10001) ≈ 100×10⁶ × 13.29 ≈ 1.33 Gbps`}
      </CodeBlock>
      <Para>
        Shannon capacity is an absolute ceiling — no error-correcting code, no modulation scheme, no amount of engineering can exceed it. It can only be approached. Modern systems (LTE Advanced, WiFi 6) operate within a few dB of the Shannon limit thanks to LDPC and Turbo codes.
      </Para>

      <H2>Reconciling Nyquist and Shannon</H2>
      <Para>
        The two theorems answer different questions: Nyquist says given a noiseless channel of bandwidth B, the maximum symbol rate is 2B. Shannon says given noise level S/N, the maximum bit rate is B × log₂(1 + S/N). Together: to approach the Shannon limit, you must use many voltage levels (as Nyquist allows), which in turn requires a high SNR to distinguish those levels reliably.
      </Para>
      <WowBox emoji="🧮" title="Why 56K modems were limited to ~53 kbps">
        <Para>The public switched telephone network (PSTN) limited lines to 3.4 kHz bandwidth and had quantization noise equivalent to about SNR = 38 dB. Shannon: C = 3400 × log₂(1 + 6310) ≈ 42,900 bps upstream. Downstream from ISP (pure digital path) could reach 56,000 bps. But FCC Part 68 regulations limited transmit power, capping it at 53.3 kbps in practice. Shannon's theorem predicted the ceiling; physics and regulation determined exactly where it sat.</Para>
      </WowBox>

      <IQ q="What's the Shannon capacity of a 20 MHz WiFi channel at 25 dB SNR?" level="Intermediate">
        S/N = 10^(25/10) = 316. C = 20×10⁶ × log₂(317) ≈ 20×10⁶ × 8.31 ≈ 166 Mbps. This is the absolute ceiling. Real WiFi 802.11n achieves ~150 Mbps on 20 MHz because it uses 64-QAM (6 bits/symbol) + LDPC, which approaches but doesn't reach the Shannon limit.
      </IQ>

      <Divider />

      {/* ── Ch 06 ── */}
      <Chapter n="06" title="Bandwidth — Hz vs bps" subtitle="Two measurements, one confusing word" />
      <Para>
        "Bandwidth" is used to mean two completely different things in networking, and conflating them causes genuine confusion.
      </Para>

      <H2>Signal Bandwidth (Hz)</H2>
      <Para>
        In physics and electrical engineering, bandwidth means the <Accent>range of frequencies</Accent> a signal occupies, measured in hertz. A 3 kHz telephone channel has a 300 Hz–3400 Hz bandwidth — a 3.1 kHz wide band of the frequency spectrum. A 20 MHz WiFi channel occupies 20 MHz of spectrum. This is a physical property of the channel, determined by filters, regulators (spectrum licenses), and the physics of the medium.
      </Para>
      <Para>
        Shannon and Nyquist both use bandwidth in Hz. When we say "more bandwidth enables more data," it is ultimately because more Hz of spectrum allows more independent signal changes per second.
      </Para>

      <H2>Data Bandwidth / Throughput (bps)</H2>
      <Para>
        In casual networking usage, "bandwidth" means the <Accent>data rate</Accent> — bits per second. "I have 500 Mbps bandwidth" means the link can carry 500 million bits per second. This is more precisely called <Accent>throughput</Accent> or <Accent>link rate</Accent>.
      </Para>

      <H2>Three Measurements You Must Distinguish</H2>
      <Para>
        <Accent>Bandwidth (link rate):</Accent> The maximum rate a link can carry bits, as specified by the standard. 1 Gbps Ethernet has a 1 Gbps link rate. This is a property of the link, not of current traffic.
      </Para>
      <Para>
        <Accent>Throughput:</Accent> The actual measured rate of data transfer, averaged over time. Always ≤ bandwidth due to protocol overhead, retransmissions, collisions, or contention. When you run iperf3, you measure throughput.
      </Para>
      <Para>
        <Accent>Goodput:</Accent> The application-layer useful data rate — bytes the application actually receives and uses, excluding headers, retransmitted data, and protocol overhead. Goodput ≤ Throughput ≤ Bandwidth. If TCP retransmits 10% of segments due to loss, your goodput is ~90% of throughput.
      </Para>
      <CodeBlock title="Bandwidth → Throughput → Goodput">
{`  Link bandwidth:   1,000 Mbps
  TCP overhead:        ~3% (headers, ACKs)
  Retransmissions:     ~5% (2% packet loss × 2.5 retransmits avg)
  Application overhead: ~2% (TLS record headers, HTTP headers)
  ─────────────────────────────────────────────────────
  Goodput:            ~90% × 970 Mbps ≈ ~873 Mbps

  Rule of thumb: goodput ≈ 80–95% of bandwidth on healthy links
                 goodput can fall to 30–50% with 1%+ packet loss (TCP)`}
      </CodeBlock>

      <Err title="Using 'bandwidth' to mean all three things interchangeably">
        <Para>Your ISP advertises "1 Gbps bandwidth." This is the link rate — the maximum possible rate. Your throughput (measured by iperf3) might be 940 Mbps due to your router's CPU. Your goodput (what your browser sees downloading a file) might be 880 Mbps due to HTTP overhead and TCP slow start. All three are different numbers. Never say "I have 1 Gbps" when diagnosing performance — specify which measurement you mean.</Para>
      </Err>

      <Divider />

      {/* ── Ch 07 ── */}
      <Chapter n="07" title="Multiplexing" subtitle="Sharing one medium among many senders" />
      <Para>
        A physical link is expensive. <Accent>Multiplexing</Accent> lets multiple independent data streams share a single physical medium simultaneously, dividing the channel in space (frequency, wavelength, time, or code).
      </Para>

      <H2>FDM — Frequency Division Multiplexing</H2>
      <Para>
        Each sender gets an exclusive, non-overlapping frequency band. Guard bands (unused spectrum between channels) prevent interference between adjacent channels. Used in: AM/FM radio (each station gets a 200 kHz FM band), cable TV (each channel gets a 6 MHz band), ADSL (upstream band: 25–138 kHz; downstream band: 138 kHz–1.1 MHz), and ISDN. FDM works in continuous time — all channels transmit simultaneously in their own spectrum slice.
      </Para>

      <H2>TDM — Time Division Multiplexing</H2>
      <Para>
        All senders share the full bandwidth but take turns using fixed time slots. In <Accent>synchronous TDM</Accent> (used in T1/E1 telephone circuits), each channel gets the same time slot in every frame whether or not it has data to send — wasteful for bursty traffic. A T1 line carries 24 voice channels at 64 kbps each in a 193-bit frame repeated 8000 times/second = 1.544 Mbps.
      </Para>
      <Para>
        <Accent>Statistical TDM</Accent> (STDM): slots are assigned dynamically to channels that have data to send. Used in packet-switched networks (Ethernet, Internet) — the underlying mechanism of all packet switching. A busy sender can use more slots; an idle sender uses none.
      </Para>

      <H2>WDM and DWDM — Wavelength Division Multiplexing</H2>
      <Para>
        In fiber optics, FDM applied to light wavelengths. <Accent>WDM</Accent> uses a small number of widely-spaced wavelengths (typically 4–8). <Accent>DWDM</Accent> (Dense WDM) packs 80–160+ wavelengths into the C-band (1530–1565 nm) at 100 GHz spacing (0.8 nm). Each wavelength carries an independent data stream at 100–400 Gbps. A single fiber pair with DWDM can carry 80 channels × 400 Gbps = 32 Tbps. Intercontinental submarine cables use DWDM with optical amplifiers (EDFAs) every 50–80 km.
      </Para>
      <Para>
        <Accent>CWDM</Accent> (Coarse WDM): fewer channels (18) at wider 20 nm spacing — no amplifiers needed, lower cost, shorter reach. Used in metro networks.
      </Para>

      <H2>OFDM as Frequency Division Multiplexing</H2>
      <Para>
        OFDM (covered in Chapter 4) is fundamentally FDM within a single communication link — hundreds of orthogonal subcarriers share the channel. The difference from classical FDM is mathematical orthogonality: OFDM subcarriers are spaced exactly 1/(symbol duration) apart, making them orthogonal without needing guard bands between subcarriers. This dramatically improves spectral efficiency.
      </Para>

      <H2>CDMA — Code Division Multiple Access</H2>
      <Para>
        Multiple senders transmit simultaneously on the same frequency by multiplying their data with a unique pseudorandom spreading code. Each receiver despreads only its intended signal — other signals appear as noise. Used in 3G UMTS/WCDMA and CDMA2000 cellular. The spreading codes (Walsh codes) are mathematically orthogonal, so they cancel each other when correlated against the wrong code. Near-far problem: a close strong transmitter can overwhelm a distant weak one — requires precise power control.
      </Para>

      <Divider />

      {/* ── Ch 08 ── */}
      <Chapter n="08" title="The Four Components of Latency" subtitle="Every millisecond accounted for" />
      <Para>
        When a packet travels from source to destination, the total delay is the sum of four distinct components. Understanding each one is critical for diagnosing network problems — the fix for each type is completely different.
      </Para>

      <LatencyBreakdown />

      <H2>1. Propagation Delay</H2>
      <Para>
        The time for a signal to physically travel from sender to receiver. Determined entirely by distance and the speed of the signal in the medium:
      </Para>
      <CodeBlock title="Propagation delay formula">
{`Propagation delay = Distance / Propagation speed

Medium                Speed              1000 km takes...
─────────────────────────────────────────────────────────
Vacuum (radio)        299,792 km/s       3.34 ms
Fiber optic           ~200,000 km/s      5.00 ms
Copper (Cat6)         ~200,000 km/s      5.00 ms
WiFi (air ≈ vacuum)   ~300,000 km/s      3.33 ms

Note: fiber propagation speed = c / refractive_index ≈ c / 1.5`}
      </CodeBlock>
      <Para>
        Propagation delay is a hard physical limit. You cannot make light travel faster. New York to London is ~5500 km of fiber → ~27 ms one-way (the fiber path is not a straight line). This is why trading firms build proprietary microwave relay towers for NY→London: microwave travels in air (≈c) along a straighter path → ~18 ms — saving ~9 ms per trip for high-frequency trading.
      </Para>

      <H2>2. Transmission Delay (Serialization Delay)</H2>
      <Para>
        The time to push all bits of a packet onto the wire. Depends on packet size and link bandwidth:
      </Para>
      <CodeBlock title="Transmission delay formula">
{`Transmission delay = Packet size (bits) / Link bandwidth (bps)

Examples:
  1500 byte Ethernet frame on 1 Gbps link:
    = (1500 × 8) / 1,000,000,000 = 12 microseconds

  1500 byte frame on 1 Mbps DSL link:
    = 12,000 / 1,000,000 = 12 milliseconds (1000× slower!)

  64 byte ACK on 10 Gbps link:
    = 512 / 10,000,000,000 = 0.051 microseconds (51 ns)`}
      </CodeBlock>
      <Para>
        This is why large packet sizes hurt more on slow links. Jumbo frames (9000 bytes) on a 10 Gbps datacenter link add 7.2 µs of transmission delay — negligible. On a 1 Mbps satellite link the same frame takes 72 ms — enough to be the dominant delay component.
      </Para>

      <H2>3. Processing Delay</H2>
      <Para>
        The time a router or switch takes to examine a packet header and make a forwarding decision. Involves: CRC check, destination lookup in routing/MAC table, ACL evaluation, header modification (TTL decrement), and output queue selection. On modern hardware routers with ASICs: ~1–10 microseconds. On software routers (Linux): ~50–200 microseconds. Deep packet inspection firewalls: 1–50 ms. Processing delay varies with load (more routes to search, more ACL rules to evaluate = higher processing time).
      </Para>

      <H2>4. Queuing Delay</H2>
      <Para>
        The time a packet waits in a router's output queue before being transmitted, when packets arrive faster than the outgoing link can drain them. This is the <Accent>most variable</Accent> delay component — it can be zero (empty queue) or hundreds of milliseconds (congested link). Queuing delay depends on: traffic intensity (ρ = λ/μ where λ = arrival rate, μ = service rate), queue length, and scheduling policy.
      </Para>
      <Para>
        When ρ approaches 1.0 (queue nearly saturated), queuing delay grows exponentially — this is the mathematical basis for why the internet gets dramatically slower near congestion. Little's Law: L = λW (average queue length = arrival rate × average wait time). At ρ = 0.9, average wait time is 9× the service time. At ρ = 0.99, it's 99×.
      </Para>

      <WowBox emoji="🌍" title="Why GEO satellite internet has 600ms+ RTT">
        <Para>A geostationary satellite orbits at 35,786 km altitude. Signal path: ground → satellite → ground = ~72,000 km total. At ~300,000 km/s: 240 ms one-way, 480 ms RTT just for propagation. Plus queuing at the satellite transponder and processing at the ground station: typical RTT is 580–650 ms. This makes interactive apps (SSH, video calls) feel terrible — each keypress takes 0.6 seconds to echo back. Starlink (LEO) at 550 km altitude achieves ~20–40 ms RTT, solving the interactivity problem.</Para>
      </WowBox>

      <H2>Round-Trip Time (RTT)</H2>
      <Para>
        <Accent>RTT</Accent> is the time from sending a packet to receiving its acknowledgment — two one-way latencies plus processing time at the destination. RTT is what ping measures. Why RTT matters more than one-way latency: TCP acknowledgments travel backward, so every TCP operation takes at least one RTT. Establishing a TCP connection requires 1.5 RTTs (SYN→SYN-ACK→ACK+data). TLS 1.2 handshake: 2 RTTs. TLS 1.3: 1 RTT (or 0-RTT for resumption). A web page requiring 10 separate HTTP/1.1 requests serially needs 10 RTTs of pure latency before content is fully loaded.
      </Para>

      <Divider />

      {/* ── Ch 09 ── */}
      <Chapter n="09" title="Bandwidth-Delay Product" subtitle="How much data is 'in flight' at any moment" />
      <Para>
        The <Accent>Bandwidth-Delay Product (BDP)</Accent> is the amount of data that can be "in the pipe" — transmitted but not yet acknowledged — at any given moment. It is fundamental to understanding TCP performance, especially over high-bandwidth, high-latency links.
      </Para>
      <CodeBlock title="Bandwidth-Delay Product">
{`BDP = Bandwidth × RTT

Examples:
  100 Mbps link, 1 ms RTT (LAN):
    BDP = 100×10⁶ × 0.001 = 100,000 bits = 12,500 bytes = 12.5 KB

  1 Gbps link, 40 ms RTT (continental):
    BDP = 1×10⁹ × 0.04 = 40,000,000 bits = 5,000,000 bytes = 4.88 MB

  10 Gbps link, 160 ms RTT (trans-Pacific):
    BDP = 10×10⁹ × 0.16 = 1.6×10⁹ bits = 200,000,000 bytes = 190 MB`}
      </CodeBlock>
      <Para>
        <Accent>Why this matters for TCP:</Accent> TCP's receive window size limits how much unacknowledged data can be in flight. To fully utilize a link, the TCP window must be at least as large as the BDP. The original TCP RFC allowed a maximum window of 65,535 bytes. On a 1 Gbps / 40 ms RTT link, BDP is ~5 MB — 65,535 bytes would only utilize 65,535 / 5,000,000 = 1.3% of the link capacity! This is why TCP window scaling (RFC 7323) was invented — it extends the window to up to 1 GB.
      </Para>
      <Para>
        <Accent>For file downloads:</Accent> if you have a 10 Gbps link to a server 100 ms away (BDP = 125 MB), you need 125 MB of TCP window space just to saturate the link. If the server's socket buffer is only 4 MB, throughput is limited to 4 MB / 0.1 s = 320 Mbps regardless of link speed. This is why modern servers set tcp_rmem and tcp_wmem to 16–64 MB.
      </Para>

      <IQ q="A trans-Atlantic fiber link carries 100 Gbps and has 70 ms RTT. What window size is needed to fill it?" level="Senior">
        BDP = 100×10⁹ × 0.07 = 7×10⁹ bits = 875 MB. You need an 875 MB TCP window to fully utilize this link. With default 64 KB windows, you'd achieve only 64 KB / 0.07 s ≈ 7.3 Mbps — less than 0.01% of the link capacity. Modern high-speed file transfer protocols (GridFTP, BBR-tuned TCP) configure multi-GB socket buffers specifically for this reason.
      </IQ>

      <Divider />

      {/* ── Ch 10 ── */}
      <Chapter n="10" title="Throughput, Jitter, and Packet Loss" subtitle="The three axes of network quality" />
      <Para>
        Beyond raw bandwidth and latency, three metrics define the actual quality of a network path for real applications: throughput, jitter, and packet loss. Each affects different application types differently.
      </Para>

      <BandwidthVsLatency />

      <H2>Jitter — Latency Variation</H2>
      <Para>
        <Accent>Jitter</Accent> is the variation in packet arrival times. If packets are sent at t=0, t=10ms, t=20ms and arrive at t=5ms, t=17ms, t=32ms — the one-way latencies are 5ms, 7ms, 12ms. Jitter is the standard deviation (or inter-arrival variation) of these latencies. High jitter means packets arrive bunched together or with gaps, even if the average latency is acceptable.
      </Para>
      <Para>
        <Accent>Sources of jitter:</Accent> queuing delay variation (packets wait different amounts based on queue state), CPU scheduling jitter in software routers, wireless channel variations, and processing delays. Note that propagation delay is constant (speed of light doesn't vary) — jitter comes from the variable components.
      </Para>

      <H2>Jitter Buffer</H2>
      <Para>
        Real-time applications (VoIP, video conferencing) use a <Accent>jitter buffer</Accent> to absorb jitter. The receiver deliberately delays playback by a fixed amount (e.g., 60 ms) and stores arriving packets in a buffer. Packets that arrive within the buffer window play smoothly. Packets that arrive after the deadline are either played late (glitch) or dropped.
      </Para>
      <Para>
        <Accent>Adaptive jitter buffer:</Accent> modern VoIP clients dynamically adjust the buffer depth based on measured jitter. Low jitter → shrink buffer (lower latency); high jitter → grow buffer (more smoothing). The trade-off is latency vs smoothness — deeper buffer = less dropout but more delay.
      </Para>

      <H2>Packet Loss</H2>
      <Para>
        Packets are dropped when: (1) queue overflows (tail drop or RED/WRED active queue management); (2) CRC error detected at L2 — frame is silently discarded; (3) TTL reaches zero at a router; (4) wireless channel error too severe for FEC to correct.
      </Para>
      <Para>
        <Accent>Effect on TCP:</Accent> TCP treats packet loss as a congestion signal (even if the loss was due to wireless error, not congestion). A single lost packet triggers: (1) fast retransmit if 3 duplicate ACKs received; (2) halves the congestion window (cwnd). At 1% packet loss, Mathis equation gives maximum TCP throughput ≈ MSS / (RTT × √loss_rate). At 1% loss on a 100 ms RTT link with 1460 byte MSS: throughput ≤ 1460 / (0.1 × √0.01) = 1460 / (0.1 × 0.1) = 146,000 bytes/s = 1.17 Mbps — regardless of link bandwidth. This is why packet loss is catastrophic for TCP performance.
      </Para>
      <Para>
        <Accent>Effect on UDP:</Accent> UDP has no retransmission — lost packets are simply gone. Video conferencing handles this with: error concealment (copy last frame), packet interleaving (spread loss across time), and FEC (send redundant packets). At &lt;1% loss, most video codecs recover gracefully. Above 5% loss, video quality degrades severely.
      </Para>

      <CodeBlock title="TCP throughput under packet loss — Mathis formula">
{`TCP_max_throughput = (MSS / RTT) × (1 / √p)

Where MSS = max segment size, p = packet loss probability

loss = 0.01% (0.0001):  1/√0.0001 = 100x  → effectively unlimited
loss = 0.1%  (0.001):   1/√0.001  = 31.6x → throughput degrades ~3%
loss = 1%    (0.01):    1/√0.01   = 10x   → severe degradation
loss = 5%    (0.05):    1/√0.05   = 4.47x → application barely works

Note: 1% loss is not "acceptable" — it causes ~10x throughput reduction.
Production networks target < 0.01% packet loss on links.`}
      </CodeBlock>

      <Divider />

      {/* ── Ch 11 ── */}
      <Chapter n="11" title="Noise and Signal Impairments" subtitle="Everything working against your signal" />
      <Para>
        Every physical transmission is degraded by noise. Understanding noise types helps you diagnose the right problem — some noise types are fundamental (thermal noise), others are engineering failures (grounding issues causing EMI).
      </Para>

      <H2>Attenuation</H2>
      <Para>
        Signal strength decreases as it travels through the medium. In copper: resistive losses convert electrical energy to heat. In fiber: Rayleigh scattering and absorption (hydroxyl ions in glass). In wireless: free-space path loss follows the inverse square law — doubling the distance reduces signal power to one-quarter.
      </Para>
      <Para>
        Attenuation is measured in decibels (dB): every 3 dB = signal power halved; every 10 dB = signal power ×10 reduction. Cat6a copper cable: ~20 dB loss per 100m at 100 MHz. Single-mode fiber: ~0.2 dB/km at 1550 nm (a 100 km fiber link loses only 20 dB — remarkable). Copper at 100m: same 20 dB loss as 100 km of fiber.
      </Para>

      <H2>Crosstalk — NEXT and FEXT</H2>
      <Para>
        In twisted-pair cables, the electromagnetic field of one pair induces voltage in an adjacent pair. <Accent>NEXT</Accent> (Near-End CrossTalk): crosstalk measured at the transmitting end — the strongest because the injecting signal is strongest near the source. <Accent>FEXT</Accent> (Far-End CrossTalk): crosstalk measured at the far end — weaker because the inducing signal has attenuated. Twisting the pairs with different twist rates per pair reduces crosstalk by ensuring that induced noise tends to cancel over each twist cycle. Cat6a's tighter twist rates achieve 500 MHz bandwidth with acceptable crosstalk; Cat5e only manages 100 MHz.
      </Para>

      <H2>EMI — Electromagnetic Interference</H2>
      <Para>
        External electromagnetic sources induce noise currents in cables: fluorescent lights (~30 kHz harmonics), electric motors, microwave ovens (2.45 GHz), and other network cables. Shielded cables (STP/FTP/SFTP) add a foil or braid shield around each pair or the whole cable, connected to ground at one end, to block external EMI. Unshielded cables (UTP) rely entirely on balanced differential signaling to cancel common-mode noise — it works well for moderate EMI but fails in industrial environments.
      </Para>

      <H2>Thermal Noise (Johnson-Nyquist Noise)</H2>
      <Para>
        Every resistor generates noise voltage proportional to its temperature and bandwidth: V_noise = √(4kTBR), where k = Boltzmann constant (1.38×10⁻²³ J/K), T = temperature in Kelvin, B = bandwidth in Hz, R = resistance in Ohms. This is the irreducible, fundamental noise floor — it exists at any nonzero temperature. It's why cooling RF amplifiers and ADCs with liquid nitrogen improves SNR in radio astronomy.
      </Para>

      <H2>Impulse Noise</H2>
      <Para>
        Short, intense noise bursts: lightning, switching transients, arc welders, elevator motor commutators. Impulse noise can corrupt many consecutive bits — exactly the scenario that Reed-Solomon codes (which correct burst errors) are designed to handle. DSL modems use forward error correction specifically sized for the expected impulse noise duration in telephone lines.
      </Para>

      <H2>SNR — Signal-to-Noise Ratio</H2>
      <Para>
        SNR is the ratio of signal power to noise power: SNR(dB) = 10 × log₁₀(S/N). A higher SNR means a cleaner signal and enables higher-order modulation (more bits per symbol). Practical thresholds: below 10 dB SNR, even BPSK becomes unreliable; above 40 dB SNR, 4096-QAM becomes practical. The SNR must be measured at the receiver (after all path losses), not at the transmitter.
      </Para>

      <H2>BER — Bit Error Rate</H2>
      <Para>
        <Accent>BER</Accent> is the fraction of bits received in error: BER = number_of_errored_bits / total_bits_received. Target BER in different systems:
      </Para>
      <CodeBlock title="BER targets by system">
{`System                  Target BER      Why
──────────────────────────────────────────────────────────
Ethernet (before FEC)   10⁻¹²           1 error per trillion bits
Fiber optic links       10⁻¹² to 10⁻¹⁵  Very long paths need perfection
5G NR (after FEC)       10⁻⁵            FEC handles the rest
WiFi (after FEC)        10⁻³ to 10⁻⁵    FEC corrects wireless errors
Satellite (pre-FEC)     10⁻³            FEC turns this into 10⁻⁹

At 10 Gbps: 10⁻¹² BER → 10,000 bit errors per second
  → undetected frame error every ~125,000 frames
  → must use FEC (100GBASE-R uses RS(544,514) FEC)`}
      </CodeBlock>

      <Divider />

      {/* ── Ch 12 ── */}
      <Chapter n="12" title="Error Detection and Forward Error Correction" subtitle="Finding and fixing bit errors without retransmission" />
      <Para>
        Once noise corrupts bits, two strategies exist: <Accent>error detection</Accent> (detect that something went wrong, request retransmission) and <Accent>forward error correction — FEC</Accent> (add enough redundancy to reconstruct the original data even after errors, no retransmission needed).
      </Para>

      <H2>Error Detection: Parity, Checksum, CRC</H2>
      <Para>
        <Accent>Parity bit:</Accent> Add one bit to make the count of 1s even (even parity) or odd. Detects 1-bit errors; fails for 2-bit errors (probability ½ of missing 2-bit errors). Used in RAM (ECC adds more parity bits for correction).
      </Para>
      <Para>
        <Accent>Checksum:</Accent> Sum all words in the message and include the complement. IPv4, TCP, UDP headers include 16-bit Internet Checksum (one's complement addition). Weak — doesn't detect all error patterns, especially when two errors cancel. CRC is always preferred for link-layer error detection.
      </Para>
      <Para>
        <Accent>CRC (Cyclic Redundancy Check):</Accent> Treat the message as a polynomial and divide by a generator polynomial. The remainder becomes the CRC. Ethernet uses CRC-32 (4 bytes appended to every frame). CRC-32 detects: all single-bit errors, all 2-bit errors, all burst errors ≤ 32 bits, and 99.9999977% of longer burst errors. If CRC fails, the frame is <em>silently dropped</em> at L2 — no error message, no retransmission request. Recovery is the job of upper layers (TCP retransmits; UDP applications must decide).
      </Para>

      <H2>FEC: Reed-Solomon Codes</H2>
      <Para>
        <Accent>Reed-Solomon (RS)</Accent> codes treat data as polynomial coefficients over a finite field (Galois field). RS(n,k): k data symbols + (n-k) parity symbols. Can correct up to (n-k)/2 symbol errors. RS(255,223) is the NASA standard: can correct 16 erased bytes out of 255. Used in CDs (RS corrects scratches), DVDs, QR codes, DSL, and 100G Ethernet (RS(544,514) with 10-bit symbols).
      </Para>
      <Para>
        RS is excellent for <Accent>burst errors</Accent> — errors clustered together (a scratch on a CD, an impulse noise spike) — because even large bursts only corrupt a few symbols.
      </Para>

      <H2>FEC: Turbo Codes</H2>
      <Para>
        Invented in 1993 and used in 3G/4G cellular. Two parallel recursive systematic convolutional (RSC) encoders process the data (one with a pseudo-random interleaver). The receiver uses iterative Bayesian decoding (belief propagation), passing soft-decision estimates back and forth between the two decoders. After 5–10 iterations, the decoder converges. Turbo codes approach within 0.5 dB of the Shannon limit — a breakthrough. Key advantage: linear encoding complexity, manageable decoding complexity.
      </Para>

      <H2>FEC: LDPC Codes (Low-Density Parity Check)</H2>
      <Para>
        Introduced by Gallager in 1963, forgotten for 30 years, rediscovered in the 1990s. LDPC codes use a sparse parity check matrix (most entries are zero — hence "low-density"). Decoded with belief propagation on a Tanner graph. LDPC achieves performance within 0.0045 dB of the Shannon limit (practically perfect). Used in: WiFi (802.11n/ac/ax), DVB-S2/T2, 10G/100G Ethernet, and 5G NR (replacing Turbo codes for data channels). LDPC can be decoded in parallel, making high-throughput hardware implementation practical.
      </Para>

      <H2>FEC: Polar Codes</H2>
      <Para>
        The newest entrant — proven theoretically optimal by Arıkan in 2009. Achieves Shannon capacity as code length N → ∞. Used in 5G NR control channels. Polar codes are based on channel polarization: combining many uses of a noisy channel creates some "perfect" channels and some "completely noisy" channels — data is sent only on perfect ones. Decoding uses successive cancellation with list decoding for finite lengths.
      </Para>

      <WowBox emoji="🛸" title="Voyager 1 and Reed-Solomon">
        <Para>Voyager 1 is ~22 billion km from Earth (as of 2025). Its 22-watt radio transmitter sends data at 160 bps. The received signal power at Earth is 10⁻¹⁶ watts — a femtowatt. The SNR at reception is close to the thermal noise floor. Without FEC, almost every bit would be wrong. With concatenated Reed-Solomon + Golay FEC, engineers recover perfect images and scientific data from 22 billion km. FEC doesn't just improve links — it makes some links possible at all.</Para>
      </WowBox>

      <Divider />

      {/* ── Ch 13 ── */}
      <Chapter n="13" title="Bufferbloat and Active Queue Management" subtitle="When bigger buffers make the internet worse" />
      <Para>
        For most of the 2000s, network engineers followed a simple heuristic: "more buffer = better performance." Routers and home DSL/cable modems shipped with increasingly large buffers. By 2011, Jim Gettys identified a crisis: <Accent>bufferbloat</Accent> — large buffers that cause enormous, variable latency under load.
      </Para>
      <Para>
        The mechanism: when a link is congested, packets fill the buffer. A large buffer takes a long time to drain, meaning packets can queue for hundreds of milliseconds. Worse: TCP's congestion control needs to detect congestion (via packet loss) to reduce its sending rate. With a huge buffer, the link never drops packets — instead, queuing delay grows without bound. TCP sees no loss and happily keeps sending, filling the buffer further. The result: latency of 1000–5000 ms on consumer links under load, making gaming and VoIP unusable while a download runs.
      </Para>

      <H2>Tail Drop (the default, and why it's bad)</H2>
      <Para>
        Traditional queue discipline: accept packets until the queue is completely full, then drop all new arrivals. Problems: (1) TCP flows all see loss simultaneously (tail drop synchronizes all senders to reduce rates at the same moment), causing oscillation in network load; (2) UDP flows can fill the queue and starve TCP; (3) the buffer stays full continuously, maximizing queuing delay for all packets.
      </Para>

      <H2>RED — Random Early Detection</H2>
      <Para>
        RED drops packets probabilistically as the average queue length increases, before the queue is full. When average queue length is between min_thresh and max_thresh, drop probability increases linearly (0 to max_p). Above max_thresh, drop every packet. Advantages: signals congestion to TCP senders early, before the queue is full; prevents queue synchronization; maintains lower average queue depth. Problems: doesn't distinguish between large (bandwidth-consuming) and small (interactive) flows.
      </Para>

      <H2>CoDel — Controlled Delay</H2>
      <Para>
        <Accent>CoDel</Accent> (Controlled Delay, pronounced "coddle") was the breakthrough algorithm proposed by Nichols and Jacobson in 2012 and standardized in Linux 3.5. Key insight: measure the <em>sojourn time</em> (how long each packet waits in the queue), not the queue length. Goal: keep sojourn time below 5 ms. Algorithm: if sojourn time exceeds 5 ms for a sustained 100 ms interval, start dropping packets. The drop rate increases over time until congestion is signaled. When sojourn time falls below 5 ms, stop dropping.
      </Para>
      <Para>
        <Accent>FQ-CoDel</Accent> (Fair Queuing + CoDel): combines CoDel's delay control with per-flow fair queuing. Packets are hashed into 1024 flow queues. A deficit round-robin scheduler ensures each flow gets equal bandwidth. Small flows (DNS, ACKs, interactive SSH) are served immediately without waiting behind large flows. This eliminates bufferbloat while also providing isolation between flows. FQ-CoDel is the default qdisc in many modern Linux systems and home routers (OpenWrt, LEDE).
      </Para>

      <CodeBlock title="Configuring CoDel/FQ-CoDel on Linux">
{`# View current queue discipline
tc qdisc show dev eth0

# Set fq_codel on the egress interface
tc qdisc replace dev eth0 root fq_codel

# With explicit target and interval (defaults: 5ms target, 100ms interval)
tc qdisc replace dev eth0 root fq_codel target 5ms interval 100ms

# View statistics (look for 'drop_count' and 'delay')
tc -s qdisc show dev eth0`}
      </CodeBlock>

      <Divider />

      {/* ── Ch 14 ── */}
      <Chapter n="14" title="Quality of Service (QoS)" subtitle="Giving priority to what matters most" />
      <Para>
        All traffic on a network is not equal. A VoIP call packet delayed by 200 ms causes a noticeable glitch; a bulk file transfer packet delayed by 200 ms is invisible to the user. <Accent>QoS</Accent> is the set of mechanisms to differentiate treatment of packets based on their service requirements.
      </Para>

      <H2>DSCP — Differentiated Services Code Point</H2>
      <Para>
        The IPv4 Type of Service (ToS) byte was redefined by RFC 2474 as the <Accent>DS field</Accent>. The top 6 bits form the DSCP (Differentiated Services Code Point), providing 64 possible traffic classes. The bottom 2 bits are the Explicit Congestion Notification (ECN) field.
      </Para>
      <CodeBlock title="Common DSCP values">
{`DSCP (decimal) | DSCP name  | Hex | Use case
───────────────────────────────────────────────────────
0              | CS0/BE     | 0x00 | Best effort (default)
8              | CS1        | 0x08 | Scavenger (low priority)
16             | CS2        | 0x10 | OAM (management traffic)
24             | CS3        | 0x18 | Call signaling
32             | CS4        | 0x20 | Video broadcast
40             | CS5        | 0x28 | Telephony signaling
46             | EF         | 0xB8 | Expedited Forwarding (VoIP)
34             | AF41       | 0x88 | Interactive video
26             | AF31       | 0x68 | Mission-critical data
18             | AF21       | 0x48 | Transactional data
10             | AF11       | 0x28 | Bulk data
48             | CS6        | 0xC0 | Network control (OSPF, BGP)
56             | CS7        | 0xE0 | Reserved (highest priority)`}
      </CodeBlock>

      <H2>Queuing Disciplines</H2>
      <Para>
        <Accent>Priority Queuing (PQ):</Accent> Multiple queues with strict priority levels. High-priority queue is always served before low-priority queues. Risk: a flood of high-priority traffic can completely starve low-priority queues — used only when you're certain about traffic volume. Typical use: VoIP at highest priority, then interactive, then bulk.
      </Para>
      <Para>
        <Accent>Weighted Fair Queuing (WFQ):</Accent> Each flow or class gets a weighted share of bandwidth. No class is completely starved (unlike strict PQ). A VoIP class might get weight 30%, video 40%, data 30%. If a class isn't using its allocation, others can borrow it. Computationally expensive for software implementations but widely available in hardware routers.
      </Para>
      <Para>
        <Accent>CBWFQ (Class-Based WFQ):</Accent> Cisco's implementation: classify traffic into classes via ACL/DSCP, assign bandwidth guarantees, apply WFQ within classes. Low-latency queuing (LLQ) adds a strict-priority class for real-time traffic on top of CBWFQ.
      </Para>

      <H2>Traffic Shaping vs Traffic Policing</H2>
      <Para>
        <Accent>Traffic shaping</Accent> smooths bursty traffic by holding excess packets in a buffer and releasing them at the committed rate. Uses a token bucket algorithm: tokens accumulate at the CIR (committed information rate), each packet consumes tokens equal to its size. When tokens run out, packets are held (not dropped) until tokens refill. Shaping adds delay but preserves traffic — good for regulating your own outbound traffic.
      </Para>
      <Para>
        <Accent>Traffic policing</Accent> enforces a rate limit by <em>dropping</em> (or remarking) packets that exceed the limit. No buffering — excess packets are immediately dropped or marked with lower DSCP. Used by ISPs to enforce customer bandwidth commitments. If you exceed your committed rate, packets are dropped immediately (hard policing) or remarked to "best effort" (soft policing).
      </Para>

      <H2>ECN — Explicit Congestion Notification</H2>
      <Para>
        ECN allows routers to signal congestion without dropping packets. When a router detects congestion (via RED/CoDel), instead of dropping the packet it sets the CE (Congestion Experienced) bit in the ECN field of the IP header. The receiver echoes this back to the sender via the ECE flag in the TCP header. The sender reduces its window as if a packet had been lost — but the packet itself was delivered. Result: congestion control without the retransmission and throughput penalty of actual loss. Both endpoints must support ECN (negotiated during TCP handshake with CWR and ECE flags). Widely deployed; enabled by default in Linux and macOS.
      </Para>

      <Divider />

      {/* ── Ch 15 ── */}
      <Chapter n="15" title="Transmission Modes" subtitle="Directions and channels of communication" />
      <Para>
        Before two devices can communicate, they must agree on the directionality and structure of communication: who can send when, and on how many physical paths.
      </Para>

      <H2>Simplex</H2>
      <Para>
        Communication in only one direction: sender transmits, receiver never responds. Examples: over-the-air broadcast TV (the tower transmits; your television has no transmitter back to the tower), traditional radio, one-way paging. The full channel capacity is available in one direction. No return path means no acknowledgments, no error recovery — a fire-and-forget model.
      </Para>

      <H2>Half-Duplex</H2>
      <Para>
        Communication in both directions, but only one direction at a time. Both parties share the same channel and must take turns. Examples: walkie-talkies (press-to-talk, "over"), legacy Ethernet hubs (CSMA/CD governs turns), police radio, early WiFi. Half-duplex requires a mechanism to resolve contention: CSMA/CD for Ethernet, CSMA/CA for WiFi, the push-to-talk convention for voice radio.
      </Para>
      <Para>
        Maximum theoretical throughput is half of full-duplex — the channel is idle in one direction whenever the other is transmitting.
      </Para>

      <H2>Full-Duplex</H2>
      <Para>
        Both parties can transmit and receive simultaneously, using separate channels (or echo cancellation on a shared medium). Examples: modern Ethernet over twisted pair (each direction uses a separate pair — or in 1000BASE-T, all 4 pairs with DSP-based echo cancellation), telephone calls (hybrid transformers separate send/receive on the same wire pair), cellular (FDD uses separate frequency bands for uplink and downlink; TDD uses separate time slots).
      </Para>
      <Para>
        Full-duplex doubles effective throughput compared to half-duplex. Modern gigabit and 10G Ethernet switches always operate full-duplex on point-to-point links — there are no shared collision domains.
      </Para>

      <H2>Serial vs Parallel Transmission</H2>
      <Para>
        <Accent>Parallel transmission</Accent>: multiple bits are sent simultaneously over multiple physical wires. The original PC parallel port (LPT) sent 8 bits at once over 8 data lines. Early IDE disk interfaces (PATA) used 16-bit parallel. Advantages: higher data rate at lower clock frequency. Problems: skew (bits on different wires arrive at slightly different times), crosstalk between wires, and cable bulk. At high frequencies, skew becomes the dominant limitation — by ~2 GHz, parallel buses fail.
      </Para>
      <Para>
        <Accent>Serial transmission</Accent>: bits are sent one at a time over a single differential pair. USB, PCIe, SATA, HDMI, DisplayPort, Ethernet — all modern high-speed interfaces are serial. The key insight: by sending one bit at a time, you can run the clock much faster, easily exceeding parallel interfaces. PCIe 5.0 runs at 32 GT/s per lane. 10 PCIe 5.0 lanes = 320 Gbps. USB 4 Gen 3×2: 40 Gbps over 2 pairs. Modern serial achieves this with embedded clocking (8b/10b or 128b/130b encoding), CDR (clock and data recovery), and pre-emphasis/equalization.
      </Para>

      <Divider />

      {/* ── Ch 16 ── */}
      <Chapter n="16" title="Measuring Transmission Performance" subtitle="iperf3, ping, mtr, and traceroute" />
      <Para>
        Theory is only useful when you can measure it. These four tools, used correctly, let you diagnose almost any transmission problem.
      </Para>

      <H2>ping — Measuring RTT and Packet Loss</H2>
      <Para>
        <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>ping</code> sends ICMP Echo Request packets and measures RTT. Run 100+ pings for meaningful statistics — 5-ping measurements are unreliable due to queuing jitter.
      </Para>
      <CodeBlock title="ping: key metrics">
{`ping -c 100 8.8.8.8

# Key output metrics:
# min/avg/max/mdev = 8.5/9.2/15.8/1.2 ms
#   min:  best-case (near-empty queue)
#   avg:  typical RTT
#   max:  worst case (check for spikes = jitter)
#   mdev: mean deviation = jitter proxy

# Packet loss: 0% is normal; >0.1% is a problem
# Large mdev (e.g., 1ms avg but 50ms max) indicates bufferbloat

# Extended: flood ping to stress-test (root required)
ping -f -c 10000 192.168.1.1   # flood at maximum rate`}
      </CodeBlock>

      <H2>traceroute / tracert — Mapping the Path</H2>
      <Para>
        Traceroute sends probe packets with incrementally increasing TTL values (1, 2, 3...). Each router that decrements TTL to 0 sends back an ICMP Time Exceeded — revealing its address and RTT. This maps the entire path hop by hop.
      </Para>
      <CodeBlock title="traceroute interpretation">
{`traceroute -n google.com

 1  192.168.1.1        1.2 ms   # Home router
 2  10.0.0.1           8.5 ms   # ISP first hop (DSLAM/CMTS)
 3  172.16.0.1        12.3 ms   # ISP core
 4  72.14.198.0       15.1 ms   # Google peering
 5  8.8.8.8           18.2 ms   # Destination

# Interpreting increases:
#   Each hop should add ~(distance × propagation) + router processing
#   Sudden +50ms jump at one hop = congestion OR slow link at that hop
#   * * * at a hop = ICMP TTL exceeded blocked (hop still forwards packets)
#   RTT going DOWN at later hops = ICMP responses from different interface
#     (ASYM routing — don't diagnose hop-by-hop from asymmetric hops)`}
      </CodeBlock>

      <H2>mtr — Continuous Path Statistics</H2>
      <Para>
        mtr (Matt's Traceroute) combines traceroute + ping, sending continuous probes and computing per-hop loss and jitter statistics. Far superior to a one-shot traceroute for diagnosing intermittent packet loss.
      </Para>
      <CodeBlock title="mtr usage and interpretation">
{`mtr -n -c 100 --report google.com

                           Loss%  Snt  Last  Avg   Best  Wrst  StDev
  1. 192.168.1.1           0.0%   100  1.1   1.2   0.9   2.1   0.2
  2. 10.0.0.1              0.0%   100  8.4   8.5   8.1   9.8   0.3
  3. 172.16.45.1           2.0%   100  12.1  11.9  11.1  65.4  5.2  ← Problem!
  4. 72.14.198.0           2.0%   100  14.2  14.0  13.5  67.1  5.1
  5. 8.8.8.8               2.0%   100  18.1  18.2  17.9  18.5  0.2

# Loss at hop 3 but NOT at hop 4+ → router at hop 3 deprioritizes ICMP
# Loss at hop 3 AND all subsequent hops → real loss starts at hop 3
# Loss only at final destination → destination drops ICMP (common, benign)
# Wrst much higher than Avg at one hop → queuing there`}
      </CodeBlock>

      <H2>iperf3 — Measuring Throughput and Goodput</H2>
      <Para>
        iperf3 measures the actual achievable TCP (or UDP) throughput between two endpoints. Requires running a server on one end and a client on the other.
      </Para>
      <CodeBlock title="iperf3 common usage">
{`# Server side
iperf3 -s

# Client side — basic TCP test (10 seconds)
iperf3 -c server_ip

# Client — TCP with 64 parallel streams (fills BDP on WAN links)
iperf3 -c server_ip -P 64

# Client — specify buffer size matching BDP (e.g., 4 MB for 1Gbps / 40ms RTT)
iperf3 -c server_ip -w 4M

# Client — UDP test, useful for measuring packet loss + jitter
iperf3 -c server_ip -u -b 100M   # 100 Mbps UDP

# Output to interpret:
# [ ID] Interval    Transfer    Bitrate     Retr  Cwnd
# [ 5] 0.0-10.0s   1.09 GBytes  936 Mbits/sec  12  9.08 MBytes
#   936 Mbps actual throughput on 1 Gbps link (93.6% utilization — healthy)
#   Retr = 12 retransmissions in 10 sec = 0.001% loss (excellent)
#   Cwnd = 9 MB = TCP congestion window (should approach BDP for full utilization)`}
      </CodeBlock>

      <H2>Diagnosing Common Transmission Problems</H2>
      <CodeBlock title="Diagnosis decision tree">
{`Symptom                    → Tool          → Look for
────────────────────────────────────────────────────────────────
High latency               → ping -c 100   → avg RTT, mdev spike
Packet loss                → mtr -c 100    → Loss% per hop
Throughput lower than link → iperf3 -P 16  → actual Mbps, Retr count
Bursty slowdowns           → mtr + ping    → max/mdev spike (bufferbloat)
DNS slow                   → dig +stats    → Query time >10ms = DNS issue
Intermittent drops         → mtr -c 1000   → % loss over long run
Asymmetric perf            → iperf3 both   → compare -c and reversed

Golden rules:
  - Always test both directions (iperf3 forward AND reverse)
  - Test at different times (congestion patterns repeat daily)
  - Use -P 8 or more parallel streams — single stream hides window limits
  - Measure from multiple endpoints before blaming a single hop`}
      </CodeBlock>

      <Divider />

      {/* ── Ch 17 ── */}
      <Chapter n="17" title="Interview Questions" subtitle="From beginner to PhD — all levels" />

      <IQ q="What is the difference between bandwidth and throughput?" level="Beginner">
        Bandwidth is the maximum capacity of a link (e.g., 1 Gbps Ethernet). Throughput is the actual measured data rate achieved, always ≤ bandwidth due to overhead, congestion, and protocol inefficiencies. Goodput is the application-level useful data rate, excluding headers and retransmissions.
      </IQ>

      <IQ q="What are the four components of network latency?" level="Beginner">
        (1) Propagation delay: time for signal to travel through the medium — distance/speed. (2) Transmission delay: time to put all bits on the wire — packet_size/bandwidth. (3) Processing delay: time for router to look up forwarding decision. (4) Queuing delay: time spent waiting in an output buffer. Each has a different cause and different fix.
      </IQ>

      <IQ q="Why does packet loss hurt TCP so much more than UDP?" level="Intermediate">
        TCP treats any packet loss as a congestion signal and halves its congestion window (cwnd), drastically reducing send rate. At 1% loss, the Mathis formula limits TCP throughput to ~MSS/(RTT×√loss) ≈ 1.17 Mbps on a 100ms RTT link regardless of link bandwidth. UDP ignores loss — the application receives fewer packets but UDP keeps sending at full rate. For UDP applications (VoIP, video), loss is handled by application-level FEC or error concealment, not by protocol-level rate reduction.
      </IQ>

      <IQ q="Explain the Shannon-Hartley theorem and what it implies about WiFi performance." level="Intermediate">
        C = B × log₂(1 + S/N). The channel capacity is determined by bandwidth (Hz) and SNR. A 20 MHz WiFi channel at 30 dB SNR has capacity ~200 Mbps — that's the absolute ceiling, not 600 Mbps as the spec sheet says. "Up to 600 Mbps" assumes a 40 MHz channel and 40 dB SNR. As a client moves further from the AP, SNR drops from 40 dB to 20 dB — the theoretical capacity falls by 50%, and the radio adapts by dropping from 256-QAM to 16-QAM, cutting the actual throughput.
      </IQ>

      <IQ q="What is the Bandwidth-Delay Product and why does it matter for TCP tuning?" level="Senior">
        BDP = bandwidth × RTT = the amount of data that must be "in flight" to fully utilize the link. A 10 Gbps link with 100 ms RTT has a 125 MB BDP — you need 125 MB of unacknowledged data in the network at all times to saturate the link. TCP's congestion window must be ≥ BDP, and the receive socket buffer must be ≥ BDP. Default Linux rmem_max of 212 KB is sufficient for LAN but catastrophically small for WAN. Tuning: set net.core.rmem_max = net.core.wmem_max = 134217728 (128 MB) and enable tcp_window_scaling. Use iperf3 with -w 64M to verify the buffer is being used.
      </IQ>

      <IQ q="Explain bufferbloat: its cause, effect, and the CoDel solution. What does CoDel measure and why is that better than measuring queue length?" level="Senior">
        Bufferbloat: large buffers in routers/modems fill under load, creating enormous queuing delay (1000+ ms) without ever dropping packets. TCP never sees loss so never reduces its rate — the buffer stays perpetually full. Effect: during a download, interactive traffic (games, VoIP, SSH) experiences 1–5 second latency, making them unusable. CoDel (Controlled Delay) measures packet sojourn time (how long each packet waited in the queue) rather than queue length. Target: keep sojourn time below 5 ms. If sojourn exceeds 5 ms for 100 ms continuously, CoDel starts dropping packets to signal congestion, then decreases drop interval (increases drop frequency) until sojourn falls. Queue length is a flawed metric — a large buffer at low utilization has few packets, while a small buffer under heavy load is full. Sojourn time directly measures the latency impact on packets, which is what we actually care about.
      </IQ>

      <IQ q="A link achieves only 1% of its theoretical Shannon capacity. What physical and protocol factors could cause this? How would you diagnose each?" level="PhD">
        <Para><strong>Physical factors:</strong></Para>
        <Para>1. <em>SNR far below assumed value</em> — the modulation order is being reduced. Measure: check radio statistics for MCS (Modulation and Coding Scheme) index; a WiFi AP reporting MCS 0 (BPSK 1/2) where MCS 11 (1024-QAM 5/6) was expected explains 12× throughput reduction.</Para>
        <Para>2. <em>High BER requiring FEC to absorb most capacity</em> — even with FEC, the code rate overhead may be consuming 50%+ of capacity. Measure: check pre-FEC and post-FEC BER at the optical transponder; RS(544,514) overhead is 5.8% normally but link BER may require retransmission at higher layers.</Para>
        <Para>3. <em>Channel bandwidth mismatch</em> — the actual allocated bandwidth is less than assumed (e.g., only 20 MHz allocated instead of 80 MHz). Measure: spectrum analyzer or PHY statistics.</Para>
        <Para><strong>Protocol factors:</strong></Para>
        <Para>4. <em>BDP {'>'}{'>'}{'>'} TCP window</em> — on high-latency links, default socket buffers prevent more than a tiny fraction of BDP from being in flight. Single-stream iperf3 on a 10G/100ms link with 64 KB window achieves ~5 Mbps of 10 Gbps. Fix: increase socket buffers, use parallel streams, or use QUIC (maintains its own flow control).</Para>
        <Para>5. <em>Head-of-line blocking</em> — HTTP/1.1 with a single connection; one large object blocks all others. Fix: HTTP/2 multiplexing or HTTP/3 QUIC streams.</Para>
        <Para>6. <em>Extreme packet loss causing TCP cwnd collapse</em> — even 2% loss collapses TCP to near-zero throughput via the Mathis formula. Measure: iperf3 retransmission count, mtr loss statistics.</Para>
        <Para>Diagnosis: iperf3 -P 64 (removes window limitation), mtr (finds loss), radio/optical management plane statistics (checks physical layer), Shannon calculation from measured SNR/bandwidth (computes theoretical max to compare against measured).</Para>
      </IQ>

      <Divider />

      <KeyTakeaways items={[
        'Analog signals vary continuously; digital signals use discrete states and can be regenerated perfectly — this is why digital communication dominates.',
        'Baud rate (symbols/second) ≠ bit rate (bits/second). PAM4 carries 2 bits per symbol, so a 50 Gbaud PAM4 lane achieves 100 Gbps.',
        'Line coding schemes (NRZ-L, Manchester, 4B/5B, LDPC, PAM4) solve DC balance, clock recovery, and bandwidth efficiency — each with different trade-offs.',
        'Modulation (ASK, FSK, PSK, QAM) encodes digital data onto a carrier wave. Higher-order QAM (e.g., 4096-QAM) carries more bits/symbol but requires much higher SNR.',
        "Nyquist theorem: max noise-free data rate = 2 × B × log₂(V). Shannon-Hartley: C = B × log₂(1 + S/N). Shannon's limit is absolute — no technology can exceed it.",
        '"Bandwidth" means Hz (signal bandwidth) in physics and bps (data rate) in networking. Bandwidth (link rate) ≥ Throughput ≥ Goodput — these are three different measurements.',
        'FDM, TDM, WDM/DWDM, OFDM, and CDMA are the major multiplexing techniques. DWDM enables terabit-per-second throughput on a single fiber pair.',
        'Latency has four components: propagation (distance/speed), transmission (size/rate), processing (routing lookup), and queuing (output buffer wait). Each requires a different fix.',
        'Bandwidth-Delay Product (BDP = bandwidth × RTT) is the amount of data that must be in-flight to saturate a link. TCP window size must be ≥ BDP for full utilization.',
        'Jitter (latency variation) is the enemy of real-time apps. Jitter buffers absorb jitter at the cost of additional latency. FQ-CoDel eliminates bufferbloat by targeting sojourn time.',
        'Noise types: attenuation, crosstalk (NEXT/FEXT), EMI, thermal noise, impulse noise. SNR determines which modulation order is usable; BER measures the result.',
        'FEC (Reed-Solomon, LDPC, Turbo, Polar codes) adds redundancy to correct errors without retransmission, approaching the Shannon limit. Modern 400G Ethernet requires FEC.',
        'QoS uses DSCP marking, priority queuing, WFQ, and ECN to give latency-sensitive traffic preferential treatment. Traffic shaping holds excess; policing drops it.',
        'Tools: ping (RTT/loss), traceroute (path mapping), mtr (per-hop loss + jitter over time), iperf3 (throughput with -P for parallel streams, -w for window size tuning).',
      ]} />
    </LearnLayout>
  )
}
