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
      <p style={{ fontSize: 11, color: ACC, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 6px', letterSpacing: '.12em' }}>
        // CHAPTER {num}
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>
        {title}
      </h2>
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

const LEVEL_COLORS: Record<string, string> = {
  Beginner: '#10b981',
  Intermediate: '#3b82f6',
  Senior: '#8b5cf6',
  PhD: '#f97316',
}

function IQ({ level, children }: { level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) {
  const c = LEVEL_COLORS[level]
  return (
    <div style={{ background: '#080d18', border: `1px solid ${c}40`, borderRadius: 12, padding: '18px 22px', margin: '22px 0' }}>
      <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 800, color: c, background: `${c}18`, border: `1px solid ${c}40`, borderRadius: 20, padding: '3px 10px', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10 }}>
        {level}
      </span>
      <div style={{ fontSize: 14.5, color: '#cbd5e1', lineHeight: 1.85 }}>{children}</div>
    </div>
  )
}

// ─── Interactive 1: Signal Encoding Visualizer ────────────────────────────────

type GetLevelFn = (bit: number, phaseOrIdx: number, prev: number, bits: number[]) => number

const ENCODINGS: {
  name: string; color: string; description: string; bits: number[]
  getLevel: GetLevelFn; note: string
}[] = [
  {
    name: 'NRZ-L (Non-Return-to-Zero Level)',
    color: '#10b981',
    description: 'Simplest encoding. High voltage = 1, low voltage = 0. Problem: long strings of 1s or 0s have no transitions — receiver can\'t stay synchronized with the clock.',
    bits: [1, 0, 1, 1, 0, 0, 0, 1],
    getLevel: (bit) => bit === 1 ? 1 : -1,
    note: 'Used in: RS-232 serial, early Ethernet. Problem: DC drift and clock recovery fails on long runs.',
  },
  {
    name: 'Manchester Encoding',
    color: '#3b82f6',
    description: 'Every bit has a transition in the middle. 1 = low→high, 0 = high→low. The mid-bit transition clocks the receiver automatically. Uses 2× bandwidth of NRZ.',
    bits: [1, 0, 1, 1, 0, 0, 0, 1],
    getLevel: (bit, phase) => phase === 0 ? (bit === 1 ? -1 : 1) : (bit === 1 ? 1 : -1),
    note: 'Used in: 10BASE-T Ethernet (10 Mbps), IEEE 802.4 Token Bus. Self-clocking but 50% bandwidth efficiency.',
  },
  {
    name: '4B/5B + NRZI',
    color: '#f97316',
    description: 'Maps every 4 data bits to a 5-bit code word chosen to guarantee enough transitions for clock recovery. NRZI means a "1" flips the signal; a "0" keeps it same. 80% efficiency.',
    bits: [1, 0, 1, 1, 0, 0, 0, 1],
    getLevel: (bit, _phase, prev) => bit === 1 ? -prev : prev,
    note: 'Used in: 100BASE-TX Fast Ethernet (100 Mbps), FDDI. Balance between bandwidth efficiency and self-clocking.',
  },
  {
    name: 'PAM4 (4-Level Pulse Amplitude Modulation)',
    color: '#8b5cf6',
    description: 'Encodes 2 bits per symbol using 4 voltage levels (-3, -1, +1, +3). Doubles throughput over the same frequency. Used in 100G+ Ethernet. Requires very precise signal-to-noise ratio.',
    bits: [0, 0, 0, 1, 1, 0, 1, 1],
    getLevel: (_bit, i, _prev, bits) => {
      const pair = bits[i * 2] * 2 + (bits[i * 2 + 1] ?? 0)
      const map = [0.33, 1, -1, -0.33]
      return map[pair]
    },
    note: 'Used in: 100GbE, 400GbE, PCIe 6.0. Carrier-grade DSP required for equalization and forward error correction.',
  },
]

function EncodingVisualizer() {
  const [selected, setSelected] = useState(0)
  const enc = ENCODINGS[selected]
  const bits = enc.bits

  const svgW = 520
  const svgH = 110
  const padL = 12
  const padR = 12
  const usableW = svgW - padL - padR
  const bitW = usableW / bits.length
  const midY = svgH / 2
  const amp = 36

  // Build path
  let path = ''
  let prevLevel = 0
  bits.forEach((bit, i) => {
    const x0 = padL + i * bitW
    const xMid = x0 + bitW / 2
    const x1 = x0 + bitW

    if (enc.name.startsWith('Manchester')) {
      const l0 = enc.getLevel(bit, 0, prevLevel, bits)
      const l1 = enc.getLevel(bit, 1, prevLevel, bits)
      const y0 = midY - l0 * amp
      const y1 = midY - l1 * amp
      if (i === 0) path += `M ${x0} ${y0}`
      else path += ` L ${x0} ${midY - prevLevel * amp}`
      path += ` L ${xMid} ${y0} L ${xMid} ${y1} L ${x1} ${y1}`
      prevLevel = l1
    } else if (enc.name.startsWith('4B')) {
      const newLevel = enc.getLevel(bit, 0, prevLevel, bits)
      const y = midY - newLevel * amp
      if (i === 0) path += `M ${x0} ${y}`
      else {
        const prevY = midY - prevLevel * amp
        path += ` L ${x0} ${prevY} L ${x0} ${y}`
      }
      path += ` L ${x1} ${y}`
      prevLevel = newLevel
    } else if (enc.name.startsWith('PAM4')) {
      const levels = [-1, -0.33, 0.33, 1]
      const symbol = i < 4 ? i : 4 - i
      const level = levels[Math.abs(symbol)]
      const y = midY - level * amp
      if (i === 0) path += `M ${x0} ${y}`
      else path += ` L ${x0} ${y}`
      path += ` L ${x1} ${y}`
      prevLevel = level
    } else {
      const level = enc.getLevel(bit, 0, prevLevel, bits)
      const y = midY - level * amp
      if (i === 0) path += `M ${x0} ${y}`
      else {
        const prevY = midY - prevLevel * amp
        path += ` L ${x0} ${prevY} L ${x0} ${y}`
      }
      path += ` L ${x1} ${y}`
      prevLevel = level
    }
  })

  return (
    <div style={{ margin: '28px 0', background: '#080d18', border: '1px solid #1e293b', borderRadius: 14, overflow: 'hidden' }}>
      {/* Selector */}
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #1e293b', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {ENCODINGS.map((e, i) => (
          <button
            key={e.name}
            onClick={() => setSelected(i)}
            style={{
              padding: '5px 12px', borderRadius: 16, border: `1px solid ${i === selected ? e.color : '#1e293b'}`,
              background: i === selected ? `${e.color}18` : 'transparent',
              color: i === selected ? e.color : '#64748b',
              fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'monospace',
            }}
          >{e.name.split(' (')[0]}</button>
        ))}
      </div>

      <div style={{ padding: '18px 20px' }}>
        <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 14 }}>{enc.description}</p>

        {/* Bit labels */}
        <div style={{ display: 'flex', marginLeft: padL, marginBottom: 4 }}>
          {bits.map((b, i) => (
            <div key={i} style={{ width: `${100 / bits.length}%`, textAlign: 'center', fontSize: 11, color: enc.color, fontFamily: 'monospace', fontWeight: 800 }}>{b}</div>
          ))}
        </div>

        {/* SVG waveform */}
        <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: '100%', display: 'block', background: '#0a0f1e', borderRadius: 8 }}>
          {/* Grid lines */}
          <line x1={padL} y1={midY} x2={svgW - padR} y2={midY} stroke="#1e293b" strokeWidth={1} />
          {bits.map((_, i) => (
            <line key={i} x1={padL + i * bitW} y1={10} x2={padL + i * bitW} y2={svgH - 10} stroke="#1a2535" strokeWidth={1} strokeDasharray="3,3" />
          ))}
          {/* Waveform */}
          <path d={path} fill="none" stroke={enc.color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          {/* Voltage labels */}
          <text x={6} y={midY - amp + 4} fill="#334155" fontSize={9} fontFamily="monospace">+V</text>
          <text x={6} y={midY + 4} fill="#334155" fontSize={9} fontFamily="monospace">0</text>
          <text x={6} y={midY + amp + 4} fill="#334155" fontSize={9} fontFamily="monospace">-V</text>
        </svg>

        <div style={{ marginTop: 12, fontSize: 12, color: '#475569', fontFamily: 'monospace', background: '#0d1525', borderRadius: 8, padding: '10px 14px' }}>
          {enc.note}
        </div>
      </div>
    </div>
  )
}

// ─── Interactive 2: Bandwidth vs Throughput vs Latency Explorer ───────────────

const SCENARIOS = [
  {
    name: 'Home Wi-Fi',
    color: '#10b981',
    bandwidth: 300,    // Mbps theoretical
    throughput: 185,   // Mbps real
    latency: 8,        // ms to router
    jitter: 3,
    loss: 0.1,
    description: 'Wi-Fi 5 (802.11ac) on 5 GHz, 80 MHz channel. Multiple devices competing for the medium reduce effective throughput. Router 6 meters away through one wall.',
    why: 'Radio interference, shared medium (CSMA/CA), 802.11 overhead (headers, ACKs, SIFS/DIFS gaps), retransmissions from interference.',
    improveTip: 'Move closer, use 5 GHz band, use Wi-Fi 6 (OFDMA allows multi-device scheduling), or plug in Ethernet.',
  },
  {
    name: 'Gigabit Ethernet',
    color: '#3b82f6',
    bandwidth: 1000,
    throughput: 940,
    latency: 0.1,
    jitter: 0.01,
    loss: 0.0001,
    description: 'Cat6 Ethernet, single duplex link, switch with dedicated port. Near wire-speed throughput with negligible jitter.',
    why: '60 Mbps gap from Ethernet frame overhead (IFG, preamble, SFD), MAC processing. No shared medium — full duplex, no collisions.',
    improveTip: 'For most workloads this is the ceiling. Link aggregation (802.3ad) can bond 2-4 ports for multi-Gbps.',
  },
  {
    name: 'Transatlantic Fiber',
    color: '#8b5cf6',
    bandwidth: 400000, // 400 Gbps per fiber pair
    throughput: 380000,
    latency: 68,       // ms New York → London
    jitter: 0.5,
    loss: 0.00001,
    description: 'Submarine fiber optic cable (e.g., AEConnect-1) connecting New York to London. 400Gbps per fiber pair, multiple pairs per cable.',
    why: '68ms latency = speed of light through fiber (~200,000 km/s) over ~14,000 km route, plus amplifier delay. Bandwidth near-theoretical due to DWDM wavelength precision.',
    improveTip: 'Latency is physics — you cannot beat the speed of light. Closer servers (CDN edge nodes) are the answer for latency-sensitive applications.',
  },
  {
    name: 'Mobile 5G (mmWave)',
    color: '#f97316',
    bandwidth: 10000,  // 10 Gbps peak
    throughput: 800,   // Mbps real-world
    latency: 4,        // ms
    jitter: 2,
    loss: 0.5,
    description: '5G mmWave (28 GHz band) in urban outdoor deployment. Theoretical peak 10 Gbps, but coverage range is only ~150 meters and walls block signal entirely.',
    why: 'mmWave attenuation is severe — 1 concrete wall drops throughput by 90%. Real deployments see 800 Mbps in line-of-sight, much less with obstacles. Sub-6 GHz 5G more practical.',
    improveTip: 'For indoor use, sub-6 GHz 5G (3.5 GHz band) trades peak speed for coverage. 5G NR (New Radio) dynamic spectrum sharing helps.',
  },
  {
    name: 'Starlink Satellite',
    color: '#ef4444',
    bandwidth: 100,    // Mbps
    throughput: 80,
    latency: 25,       // ms (LEO)
    jitter: 15,
    loss: 0.2,
    description: 'Starlink low-earth orbit satellite (550 km altitude). Dramatically better latency than geostationary (35,786 km = 600ms+ RTT). Still variable due to satellite handoff.',
    why: '25ms latency from 550km altitude × 2 (up + down) at speed of light. Jitter from satellite handoffs every 5-10 minutes and weather. Loss from rain fade and beam transitions.',
    improveTip: 'Gen2 Starlink dishes support satellite handoff without interruption. Laser inter-satellite links bypass ground relay latency for long-distance routes.',
  },
]

function BandwidthExplorer() {
  const [selected, setSelected] = useState(0)
  const s = SCENARIOS[selected]
  const maxBw = Math.max(...SCENARIOS.map(x => Math.log10(x.bandwidth + 1)))
  const maxLatency = Math.max(...SCENARIOS.map(x => x.latency))

  const bwPct = (Math.log10(s.bandwidth + 1) / maxBw) * 100
  const tpPct = (Math.log10(s.throughput + 1) / maxBw) * 100
  const latPct = (s.latency / maxLatency) * 100

  const fmtBw = (mbps: number) => mbps >= 1000 ? `${(mbps / 1000).toFixed(0)} Gbps` : `${mbps} Mbps`

  return (
    <div style={{ margin: '28px 0', background: '#080d18', border: '1px solid #1e293b', borderRadius: 14, overflow: 'hidden' }}>
      {/* Scenario tabs */}
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #1e293b', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {SCENARIOS.map((sc, i) => (
          <button
            key={sc.name}
            onClick={() => setSelected(i)}
            style={{
              padding: '5px 12px', borderRadius: 16, border: `1px solid ${i === selected ? sc.color : '#1e293b'}`,
              background: i === selected ? `${sc.color}18` : 'transparent',
              color: i === selected ? sc.color : '#64748b',
              fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'monospace',
            }}
          >{sc.name}</button>
        ))}
      </div>

      <div style={{ padding: '20px 22px' }}>
        <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 20 }}>{s.description}</p>

        {/* Metric bars */}
        {[
          { label: 'Theoretical Bandwidth', value: fmtBw(s.bandwidth), pct: bwPct, color: s.color },
          { label: 'Real Throughput', value: fmtBw(s.throughput), pct: tpPct, color: '#94a3b8' },
        ].map(m => (
          <div key={m.label} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', fontFamily: 'monospace', marginBottom: 6 }}>
              <span>{m.label}</span>
              <span style={{ color: m.color, fontWeight: 700 }}>{m.value}</span>
            </div>
            <div style={{ height: 8, background: '#1e293b', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: `${m.pct}%`, height: '100%', background: m.color, borderRadius: 4, transition: 'width .4s ease' }} />
            </div>
          </div>
        ))}

        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', fontFamily: 'monospace', marginBottom: 6 }}>
            <span>Latency (one-way)</span>
            <span style={{ color: s.latency < 5 ? '#10b981' : s.latency < 30 ? '#f59e0b' : '#ef4444', fontWeight: 700 }}>{s.latency} ms</span>
          </div>
          <div style={{ height: 8, background: '#1e293b', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ width: `${latPct}%`, height: '100%', background: s.latency < 5 ? '#10b981' : s.latency < 30 ? '#f59e0b' : '#ef4444', borderRadius: 4, transition: 'width .4s ease' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 12, marginTop: 16 }}>
          <div style={{ background: '#0d1525', borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ color: '#475569', marginBottom: 4, fontFamily: 'monospace' }}>Jitter</div>
            <div style={{ color: s.color, fontWeight: 700 }}>±{s.jitter} ms</div>
          </div>
          <div style={{ background: '#0d1525', borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ color: '#475569', marginBottom: 4, fontFamily: 'monospace' }}>Packet Loss</div>
            <div style={{ color: s.loss < 0.01 ? '#10b981' : s.loss < 0.5 ? '#f59e0b' : '#ef4444', fontWeight: 700 }}>{s.loss}%</div>
          </div>
        </div>

        <div style={{ marginTop: 16, background: '#0a1628', borderLeft: `3px solid ${s.color}`, borderRadius: 8, padding: '12px 16px' }}>
          <div style={{ fontSize: 11, color: s.color, fontFamily: 'monospace', fontWeight: 800, marginBottom: 6 }}>WHY THE GAP</div>
          <p style={{ fontSize: 12.5, color: '#94a3b8', margin: 0, lineHeight: 1.7 }}>{s.why}</p>
        </div>
        <div style={{ marginTop: 10, background: '#0a1a12', borderLeft: '3px solid #10b981', borderRadius: 8, padding: '12px 16px' }}>
          <div style={{ fontSize: 11, color: '#10b981', fontFamily: 'monospace', fontWeight: 800, marginBottom: 6 }}>HOW TO IMPROVE</div>
          <p style={{ fontSize: 12.5, color: '#94a3b8', margin: 0, lineHeight: 1.7 }}>{s.improveTip}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Interactive 3: Error Detection Methods ───────────────────────────────────

function computeParity(bits: number[]): number {
  return bits.reduce((a, b) => a ^ b, 0)
}

function computeChecksum(bytes: number[]): number {
  let sum = 0
  for (let i = 0; i < bytes.length; i += 2) {
    sum += (bytes[i] << 8) | (bytes[i + 1] ?? 0)
  }
  while (sum >> 16) sum = (sum & 0xffff) + (sum >> 16)
  return (~sum) & 0xffff
}

function crc8(bytes: number[]): number {
  let crc = 0xff
  for (const byte of bytes) {
    crc ^= byte
    for (let i = 0; i < 8; i++) {
      if (crc & 0x80) crc = ((crc << 1) ^ 0x31) & 0xff
      else crc = (crc << 1) & 0xff
    }
  }
  return crc ^ 0xff
}

const ERROR_METHODS = [
  {
    name: 'Parity Bit',
    color: '#10b981',
    used: 'RAM (old), RS-232 serial, some USB protocols',
    overhead: '1 bit per 7-8 bits (12.5%)',
    detects: 'Single-bit errors only. Cannot detect 2-bit errors. Cannot correct any errors.',
    description: 'A single bit added to make the total number of 1s either always even (even parity) or always odd (odd parity). If a single bit flips in transit, the parity no longer matches.',
    limitation: 'Completely invisible to 2-bit errors (one flip cancels the other). Cannot locate which bit is wrong, so cannot correct.',
  },
  {
    name: 'Internet Checksum',
    color: '#3b82f6',
    used: 'IPv4 header, TCP, UDP, ICMP',
    overhead: '16 bits per packet (minimal)',
    detects: 'Detects most burst errors and single-bit errors. Misses some 2-byte transpositions. Fast: one pass through data.',
    description: "Sum all 16-bit words of the data, fold carries into the low 16 bits, invert. Receiver re-computes and checks if result is all 1s. Used in IPv4/TCP/UDP headers.",
    limitation: "Not cryptographically strong — an attacker can craft data with a valid checksum. Also misses some error patterns. Ethernet CRC-32 handles the hard cases.",
  },
  {
    name: 'CRC-32',
    color: '#f97316',
    used: 'Ethernet frames, ZIP/PNG/zlib, storage devices',
    overhead: '32 bits per frame (4 bytes)',
    detects: 'All 1-3 bit errors, all burst errors ≤ 32 bits, 99.9997% of longer bursts. Polynomial division over GF(2).',
    description: 'Treats data as a large binary polynomial, divides by a generator polynomial (0xEDB88320 for CRC-32), and appends the remainder. Receiver performs the same division — if remainder is 0, data is intact.',
    limitation: 'Detects errors but does not correct them. An Ethernet frame with a bad CRC is simply dropped — higher layers (TCP) handle retransmission. Not cryptographic: attackers can compute valid CRCs for modified data.',
  },
  {
    name: 'Forward Error Correction (Hamming/Reed-Solomon)',
    color: '#8b5cf6',
    used: 'ECC RAM, QR codes, DVDs, deep-space comms, 5G',
    overhead: '25–50% (significant)',
    detects: 'Detects AND corrects multiple bit errors. Reed-Solomon can fix erasures (known-bad symbols).',
    description: 'Adds significant redundancy that not only detects errors but contains enough information to reconstruct the original data. Hamming codes add parity bits at power-of-2 positions to locate and correct single-bit errors. Reed-Solomon operates on symbol blocks.',
    limitation: 'High overhead (25-50% extra bits). Computationally expensive. Used where retransmission is impossible (deep space) or too slow (streaming video).',
  },
]

function ErrorDetectionExplorer() {
  const [selected, setSelected] = useState(0)
  const [inputText, setInputText] = useState('Hello')
  const [flipped, setFlipped] = useState<number | null>(null)
  const method = ERROR_METHODS[selected]

  const bytes = Array.from(inputText.slice(0, 8)).map(c => c.charCodeAt(0))
  const allBits = bytes.flatMap(b => Array.from({ length: 8 }, (_, i) => (b >> (7 - i)) & 1))

  const bitsWithFlip = allBits.map((b, i) => i === flipped ? 1 - b : b)
  const originalParity = computeParity(allBits)
  const flippedParity = computeParity(bitsWithFlip)
  const originalCRC = crc8(bytes)
  const flippedBytes = bitsWithFlip.reduce<number[]>((acc, bit, i) => {
    const byteIdx = Math.floor(i / 8)
    const bitIdx = 7 - (i % 8)
    if (!acc[byteIdx]) acc[byteIdx] = 0
    acc[byteIdx] |= bit << bitIdx
    return acc
  }, [])
  const flippedCRC = crc8(flippedBytes)
  const detected = flipped !== null && (
    selected === 0 ? originalParity !== flippedParity :
    selected === 2 ? originalCRC !== flippedCRC :
    true
  )

  return (
    <div style={{ margin: '28px 0', background: '#080d18', border: '1px solid #1e293b', borderRadius: 14, overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #1e293b', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {ERROR_METHODS.map((m, i) => (
          <button
            key={m.name}
            onClick={() => { setSelected(i); setFlipped(null) }}
            style={{
              padding: '5px 12px', borderRadius: 16, border: `1px solid ${i === selected ? m.color : '#1e293b'}`,
              background: i === selected ? `${m.color}18` : 'transparent',
              color: i === selected ? m.color : '#64748b',
              fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'monospace',
            }}
          >{m.name.split(' (')[0]}</button>
        ))}
      </div>

      <div style={{ padding: '18px 20px' }}>
        <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16 }}>{method.description}</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: '#64748b', fontFamily: 'monospace' }}>Input text:</label>
          <input
            value={inputText}
            onChange={e => { setInputText(e.target.value.slice(0, 8)); setFlipped(null) }}
            style={{ background: '#0d1525', border: '1px solid #1e293b', borderRadius: 6, color: '#e2e8f0', padding: '6px 10px', fontSize: 13, fontFamily: 'monospace', width: 120 }}
            placeholder="up to 8 chars"
          />
          <span style={{ fontSize: 11, color: '#334155', fontFamily: 'monospace' }}>click any bit to flip it (simulate error)</span>
        </div>

        {/* Bit display */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginBottom: 16 }}>
          {allBits.map((bit, i) => (
            <button
              key={i}
              onClick={() => setFlipped(flipped === i ? null : i)}
              style={{
                width: 22, height: 22, borderRadius: 4,
                background: flipped === i ? '#ef444430' : bit ? `${method.color}20` : '#0d1525',
                border: `1px solid ${flipped === i ? '#ef4444' : bit ? method.color + '60' : '#1e293b'}`,
                color: flipped === i ? '#ef4444' : bit ? method.color : '#334155',
                fontSize: 11, fontWeight: 800, cursor: 'pointer', fontFamily: 'monospace',
                transition: 'all .15s',
              }}
            >{bitsWithFlip[i]}</button>
          ))}
        </div>

        {/* Detection result */}
        <div style={{
          padding: '12px 16px', borderRadius: 8,
          background: flipped === null ? '#0d1525' : detected ? '#0a1a12' : '#1a0a0a',
          border: `1px solid ${flipped === null ? '#1e293b' : detected ? '#10b981' : '#ef4444'}`,
          fontSize: 13, fontFamily: 'monospace',
          color: flipped === null ? '#475569' : detected ? '#10b981' : '#ef4444',
          marginBottom: 16,
        }}>
          {flipped === null
            ? `Original data. ${selected === 0 ? `Parity: ${originalParity} (${originalParity === 0 ? 'even' : 'odd'})` : selected === 2 ? `CRC-8: 0x${originalCRC.toString(16).padStart(2, '0').toUpperCase()}` : 'No errors introduced.'}`
            : detected
            ? `✓ ERROR DETECTED — bit ${flipped} flipped. ${selected === 0 ? `Parity changed: ${originalParity} → ${flippedParity}` : `CRC changed: 0x${originalCRC.toString(16).toUpperCase()} → 0x${flippedCRC.toString(16).toUpperCase()}`}`
            : `✗ ERROR UNDETECTED — bit ${flipped} flipped but ${method.name} missed it! (This is the real limitation.)`
          }
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 12 }}>
          <div style={{ background: '#0d1525', borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ color: '#475569', fontFamily: 'monospace', marginBottom: 4 }}>Used in</div>
            <div style={{ color: '#94a3b8' }}>{method.used}</div>
          </div>
          <div style={{ background: '#0d1525', borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ color: '#475569', fontFamily: 'monospace', marginBottom: 4 }}>Overhead</div>
            <div style={{ color: '#94a3b8' }}>{method.overhead}</div>
          </div>
          <div style={{ background: '#0d1525', borderRadius: 8, padding: '10px 14px', gridColumn: '1 / -1' }}>
            <div style={{ color: '#ef4444', fontFamily: 'monospace', marginBottom: 4 }}>Limitation</div>
            <div style={{ color: '#94a3b8' }}>{method.limitation}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Module ────────────────────────────────────────────────────────────────────

export default function DataTransmissionPage() {
  return (
    <LearnLayout
      title="Data Transmission"
      description="How bits physically move — from voltage pulses on copper to light in fiber, and every mechanism that keeps the data intact along the way."
      section="Networking Fundamentals — Module 05"
      readTime="22–30 min"
      updatedAt="May 2026"
    >
      {/* ── Chapter 01 ── */}
      <Chapter n={1} title="The Problem of Moving Bits" />

      <StoryBox>
        You type the letter &apos;A&apos; on your keyboard. Inside your computer it&apos;s just 01000001 — eight electrical
        states in a CPU register. Your goal: move that byte to a server in Tokyo. It will travel through your
        keyboard cable, across your motherboard, down a Cat6 cable, through your router, across fiber optic
        cables under the Pacific Ocean, through seven routers, and arrive at a server rack — still perfectly
        01000001 — in about 90 milliseconds. How?
      </StoryBox>

      <Para>
        Data transmission is the engineering discipline of moving binary information reliably from one place
        to another through a physical medium. It involves converting bits to physical signals, choosing the
        right medium, maximizing throughput, minimizing latency, and detecting and correcting errors that
        inevitably occur along the way.
      </Para>

      <Para>
        Every network technology you&apos;ve ever used — Ethernet, Wi-Fi, fiber, 5G, Bluetooth — is a specific
        answer to the same question: how do we move bits through this particular physical medium as fast,
        reliably, and efficiently as possible?
      </Para>

      <WowBox>
        The longest data transmission ever measured: NASA&apos;s Voyager 1 probe transmits data from 23 billion
        kilometers away at 160 bits per second. The signal takes 22 hours and 35 minutes to reach Earth.
        The Deep Space Network dish must point to within 0.0006 degrees accuracy to receive it. That&apos;s
        data transmission at its most extreme.
      </WowBox>

      <Divider />

      {/* ── Chapter 02 ── */}
      <Chapter n={2} title="Analog vs Digital: Two Ways to Encode Information" />

      <Para>
        All physical signals are analog — continuous waves of voltage, light intensity, or electromagnetic
        fields. Digital information is discrete — sequences of 0s and 1s. The fundamental challenge of
        data transmission is encoding discrete digital values into continuous analog signals and recovering
        the digital values at the other end.
      </Para>

      <H2>Analog Signals</H2>

      <Para>
        An analog signal varies continuously — every possible value is valid. Your voice on a traditional
        telephone was transmitted as continuous electrical waveforms that exactly mirrored the sound pressure
        changes of your voice. Analog signals are intuitive but vulnerable: amplifiers don&apos;t just boost the
        signal, they boost the noise too. After enough hops, noise drowns the signal.
      </Para>

      <H2>Digital Signals</H2>

      <Para>
        Digital signals use a finite set of discrete levels — typically just two (high voltage / low voltage
        representing 1 and 0). Any signal that&apos;s closer to the high level is interpreted as 1; closer to low
        is interpreted as 0. This creates a massive noise immunity advantage: you can add significant noise
        to a digital signal and the receiver still correctly identifies 1 vs 0. Repeaters can regenerate
        a perfect digital signal rather than just amplifying a noisy one.
      </Para>

      <WowBox>
        The telephone system converted from analog to digital in stages from the 1960s. T1 lines (1962)
        could carry 24 digitized phone calls on a single wire that previously carried only 1. Digital
        encoding&apos;s immunity to noise allowed cross-continental calls without the hiss and static that
        plagued long-distance analog circuits. The same principle is why your music sounds identical
        on streaming vs CD vs vinyl copy — once digital, noise doesn&apos;t accumulate.
      </WowBox>

      <H2>Modulation: Encoding Digital in Analog Carriers</H2>

      <Para>
        Wi-Fi and 5G don&apos;t send square waves — they use radio frequency carriers. Digital bits are encoded
        by varying (modulating) the carrier wave&apos;s amplitude, frequency, or phase:
      </Para>

      <CodeBlock>{`Modulation scheme → bits per symbol → example use
──────────────────────────────────────────────────────────────────────
OOK  (On-Off Keying)        → 1 bit   → Infrared remote controls
BPSK (Binary PSK)           → 1 bit   → GPS signal, Wi-Fi legacy
QPSK (Quadrature PSK)       → 2 bits  → Satellite, 3G uplink
16-QAM                      → 4 bits  → Wi-Fi 4 (802.11n)
64-QAM                      → 6 bits  → Wi-Fi 5 (802.11ac), 4G LTE
256-QAM                     → 8 bits  → DOCSIS 3.1 cable, Wi-Fi 6
1024-QAM                    → 10 bits → Wi-Fi 6E (requires excellent SNR)
4096-QAM                    → 12 bits → Wi-Fi 7 (802.11be) — needs -40dB noise`}</CodeBlock>

      <Para>
        Higher-order QAM sends more bits per symbol but requires a much cleaner signal (higher SNR).
        Modern Wi-Fi adapts modulation dynamically: when you&apos;re far from the router (noisy signal), it drops
        to QPSK or BPSK. When you&apos;re close (clean signal), it uses 1024-QAM. This is called
        <Accent> adaptive modulation</Accent> or <Accent>MCS (Modulation and Coding Scheme) selection</Accent>.
      </Para>

      <Divider />

      {/* ── Chapter 03 ── */}
      <Chapter n={3} title="Signal Encoding: How Bits Become Voltage Patterns" />

      <Para>
        On wired networks, bits are transmitted as specific voltage patterns. The encoding scheme determines
        how voltage levels map to bits over time. A good encoding scheme must solve two problems:
        <Accent> clock recovery</Accent> (the receiver needs to know exactly when each bit starts and ends)
        and <Accent> DC balance</Accent> (equal amounts of high and low voltage to prevent transformer saturation).
      </Para>

      <EncodingVisualizer />

      <H2>Why Encoding Matters for Speed</H2>

      <Para>
        The encoding scheme directly determines achievable data rates. Manchester encoding is 100% efficient
        at clock recovery but only 50% efficient at data transfer (needs 2× the frequency for the same
        bit rate). This is why 10BASE-T (10 Mbps) needed 20 MHz bandwidth. 100BASE-TX (100 Mbps)
        switched to 4B/5B + NRZI + MLT-3, needing only 125 MHz bandwidth for 100 Mbps of data.
      </Para>

      <Para>
        Gigabit Ethernet (1000BASE-T) uses 4 pairs simultaneously with 5-level PAM5 signaling at 125 MHz
        each, achieving 1 Gbps on the same Cat5 cable that carries Fast Ethernet. 10GBase-T pushed this
        to 800 MHz with DSP equalization. The physics of copper sets a hard limit — beyond ~10 Gbps,
        copper simply can&apos;t carry the signal reliably, which is why data center interconnects above
        10 Gbps use fiber optic cable.
      </Para>

      <Divider />

      {/* ── Chapter 04 ── */}
      <Chapter n={4} title="Transmission Media: Copper, Fiber, and Air" />

      <Para>
        The physical medium determines the fundamental constraints of any transmission: maximum speed,
        maximum distance, immunity to interference, and cost. Three types dominate modern networking.
      </Para>

      <H2>Copper Wire: Ubiquitous and Practical</H2>

      <H3>Twisted Pair (Ethernet)</H3>

      <Para>
        Twisted pair cable twists two conductors together. The twist is the key innovation: both wires
        pick up the same electromagnetic interference from external sources (common-mode noise), and the
        receiver subtracts one wire from the other — the data signals add, the noise cancels. More twists
        per meter = better noise rejection = higher speed and longer distance.
      </Para>

      <CodeBlock>{`Category  Max Speed    Max Distance   Application
─────────────────────────────────────────────────────────────────────
Cat5      100 Mbps     100m           Fast Ethernet (legacy)
Cat5e     1 Gbps       100m           Gigabit Ethernet (most offices)
Cat6      1 Gbps/250m  55m @ 10Gbps  10GBase-T (shorter runs)
Cat6A     10 Gbps      100m           10GBase-T (data centers)
Cat7      10 Gbps      100m           Shielded, enterprise/industrial
Cat8      40 Gbps      30m            Data center ToR to spine

All categories: RJ45 connector, 8 conductors (4 pairs), 100m max for Ethernet
Shielded (STP/FTP): better EMI rejection, required near motors/machinery`}</CodeBlock>

      <H3>Coaxial Cable</H3>

      <Para>
        Coaxial cable has a central conductor surrounded by insulation, a braided shield, and an outer jacket.
        The shield provides excellent EMI rejection and high bandwidth over long distances. Used for cable TV
        (CATV), DOCSIS cable internet (up to 10 Gbps with DOCSIS 3.1), and RF antenna connections.
        The original 10BASE5 "Thicknet" Ethernet used coaxial cable. Modern cable internet (DOCSIS)
        still runs on the same coaxial plant installed for cable TV in the 1980s.
      </Para>

      <H2>Fiber Optic: Light Through Glass</H2>

      <Para>
        Fiber optic cable transmits data as pulses of light through a glass or plastic core. Light doesn&apos;t
        experience electrical resistance or electromagnetic interference — the two main enemies of copper.
        This gives fiber its extraordinary properties: massive bandwidth, negligible signal loss over long
        distances, and complete immunity to electrical interference.
      </Para>

      <H3>Single-Mode vs Multi-Mode</H3>

      <CodeBlock>{`Parameter        Single-Mode (SMF)     Multi-Mode (MMF)
──────────────────────────────────────────────────────────────────────
Core diameter    8-10 μm               50 or 62.5 μm
Light source     Laser (coherent)      LED or VCSEL laser
Distance         Up to 100+ km         Up to 2km (OM4), 400m (OM3)
Bandwidth        100+ Gbps × km        10 Gbps × km (OM4)
Cost             Higher (laser tx)     Lower (LED tx)
Use case         WAN, submarine cable  Data center, campus
Color            Yellow jacket         Orange (OM2), Aqua (OM3/4/5)

Wavelengths:
  SMF: 1310nm (short haul), 1550nm (long haul), 1625nm (monitoring)
  MMF: 850nm (VCSELs), 1300nm (LEDs)

DWDM (Dense Wavelength Division Multiplexing):
  Up to 160 wavelengths per fiber pair × 100+ Gbps each = 16+ Tbps per fiber`}</CodeBlock>

      <WowBox>
        The Facebook submarine cable "2Africa Pearls" (2023) has a design capacity of 180 Tbps and
        stretches 45,000 km around Africa and into the Mediterranean. That&apos;s 180,000,000 Mbps through
        fibers thinner than a human hair, across ocean floors, for 10+ years without replacement.
        A single transatlantic fiber pair carries more data every second than all the books ever
        written combined.
      </WowBox>

      <H2>Wireless: Data Through Air</H2>

      <Para>
        Wireless transmission uses electromagnetic waves — radio frequencies (Wi-Fi, 5G, Bluetooth) or
        infrared (TV remotes, old IrDA) or visible light (Li-Fi, laser communication). The fundamental
        challenge: air is a <Accent>shared medium</Accent>. Everyone in range can hear everyone else&apos;s
        transmissions. This requires careful coordination (CSMA/CA, TDMA, OFDMA) and encryption
        (WPA2/WPA3) to work reliably.
      </Para>

      <CodeBlock>{`Technology     Frequency      Max Speed      Range        Use
─────────────────────────────────────────────────────────────────────────
Wi-Fi 4        2.4/5 GHz      600 Mbps       ~50m indoor  Legacy
Wi-Fi 5        5 GHz          3.5 Gbps       ~35m indoor  Most homes
Wi-Fi 6        2.4/5 GHz      9.6 Gbps       ~35m indoor  Modern (OFDMA)
Wi-Fi 6E       6 GHz          9.6 Gbps       ~25m indoor  High density
Wi-Fi 7        2.4/5/6 GHz    46 Gbps        ~35m indoor  Multi-link ops
Bluetooth 5    2.4 GHz        2 Mbps         ~30m         IoT, audio
5G (sub-6)     600 MHz-6 GHz  ~1 Gbps        ~1 km        Mobile broad.
5G (mmWave)    24-100 GHz     10 Gbps        ~150m        Urban dense
Starlink LEO   Ku/Ka band     100-300 Mbps   Global       Rural/maritime`}</CodeBlock>

      <Divider />

      {/* ── Chapter 05 ── */}
      <Chapter n={5} title="Bandwidth, Throughput, and Latency: The Three Metrics That Matter" />

      <Para>
        Three terms get used interchangeably by non-engineers and confused by many engineers. They measure
        completely different things and have different implications for network performance.
      </Para>

      <H2>Bandwidth</H2>
      <Para>
        Bandwidth is the <Accent>theoretical maximum capacity</Accent> of a link — the size of the pipe.
        A 1 Gbps Ethernet link has 1 Gbps of bandwidth regardless of whether you&apos;re using it or not.
        Bandwidth is determined by the physical medium, encoding scheme, and hardware — you cannot
        exceed it through software optimization.
      </Para>

      <H2>Throughput</H2>
      <Para>
        Throughput is <Accent>actual data transferred per unit time</Accent>. It&apos;s always less than bandwidth
        due to protocol overhead (headers, checksums, ACKs), retransmissions, processing delay, and
        sharing with other traffic. A "1 Gbps" connection typically achieves 940 Mbps real throughput
        because Ethernet frames have 60 bytes of overhead per 1500-byte payload (4% overhead).
      </Para>

      <H2>Latency</H2>
      <Para>
        Latency is the <Accent>time for one bit to travel from source to destination</Accent>. For interactive
        applications (gaming, video calls, trading systems), latency often matters more than bandwidth.
        Latency has four components:
      </Para>

      <CodeBlock>{`Propagation delay   = distance / propagation speed
                    = 14,000 km / 200,000 km/s (fiber)
                    = 70 ms (New York → London, one-way)

Transmission delay  = packet size / link bandwidth
                    = 1500 bytes × 8 bits/B / 1,000,000,000 bps
                    = 0.012 ms (negligible on gigabit links)

Processing delay    = time to route and switch the packet
                    = 0.001 – 0.1 ms (modern routers/switches)

Queuing delay       = time waiting in router/switch buffer
                    = 0 ms (lightly loaded) to 100ms+ (congested)
                    = the variable, unpredictable component (jitter)

Total RTT = 2 × (propagation + transmission + processing + queuing)`}</CodeBlock>

      <BandwidthExplorer />

      <H3>The Bandwidth-Delay Product</H3>

      <Para>
        The <Accent>bandwidth-delay product (BDP)</Accent> = bandwidth × round-trip time. This is the amount
        of data "in flight" in the network at any moment. If BDP is larger than TCP&apos;s congestion window,
        you can&apos;t fill the pipe. A 100 Mbps link with 300ms RTT has BDP = 3.75 MB. Default TCP window
        sizes (64 KB) completely fail to fill this pipe. This is why long-fat networks (satellite,
        transoceanic fiber) need TCP window scaling (RFC 7323) and tuned kernel parameters.
      </Para>

      <Warn>
        Marketing lies about bandwidth. "Up to 300 Mbps" Wi-Fi means theoretical peak under ideal
        conditions — 1 device, line of sight, quiet spectrum. Real throughput for most users is
        30-100 Mbps. "1 Gbps fiber internet" means 1 Gbps to the ISP — from there, the internet&apos;s
        actual speed depends on the destination server&apos;s connection, not yours. Always test with
        a tool like <Code>iperf3</Code> rather than trusting marketed speeds.
      </Warn>

      <Divider />

      {/* ── Chapter 06 ── */}
      <Chapter n={6} title="Serial vs Parallel Transmission" />

      <Para>
        Data can move between two points in two fundamentally different ways: one bit at a time through
        a single channel (serial), or multiple bits simultaneously through multiple channels (parallel).
      </Para>

      <H2>Parallel Transmission</H2>

      <Para>
        Old parallel printer ports (LPT) sent 8 bits simultaneously over 8 wires. More wires = more speed,
        right? In practice, parallel transmission hits a wall: at high frequencies, the 8 wires experience
        slightly different propagation delays and electromagnetic coupling between adjacent wires (crosstalk).
        The faster you send, the more skew accumulates. By the time you reach hundreds of MHz, bits sent
        together arrive at different times — you can&apos;t even tell which byte they belong to.
      </Para>

      <H2>Serial Transmission: Counterintuitively Faster</H2>

      <Para>
        USB, PCIe, SATA, and modern Ethernet all use <Accent>serial transmission</Accent> — one bit at a
        time over a single differential pair. No skew, no crosstalk between bits, and differential signaling
        (signal on one wire, inverted signal on another) cancels common-mode noise. The result: serial links
        can run at tens of GHz per lane.
      </Para>

      <Para>
        PCIe 5.0 runs at 32 GT/s (gigatransfers per second) per lane using NRZ signaling. PCIe 6.0
        switches to PAM4, doubling bandwidth to 64 GT/s per lane. A PCIe 5.0 ×16 GPU slot provides
        512 Gbps — more bandwidth than most transatlantic fiber cables, inside your computer.
      </Para>

      <H3>Simplex, Half-Duplex, and Full-Duplex</H3>

      <CodeBlock>{`Simplex:      Data flows in one direction only
              Example: broadcast radio, TV, one-way sensors

Half-duplex:  Both directions, but not simultaneously. Must "take turns".
              Example: walkie-talkies, old 10BASE-T hubs (CSMA/CD)
              Problem: if two send simultaneously → collision → backoff → retry

Full-duplex:  Both directions simultaneously on separate channels.
              Example: modern Ethernet switches (each port = dedicated link)
                       phone calls (separate send/receive audio paths)
              Doubles effective throughput: 1 Gbps link = 1 Gbps each way

Wi-Fi is inherently half-duplex (one shared radio channel) even though
the spec shows high speeds. MIMO (Multiple Input Multiple Output)
uses multiple antennas to create independent spatial streams,
approaching full-duplex behavior but not achieving it exactly.`}</CodeBlock>

      <Divider />

      {/* ── Chapter 07 ── */}
      <Chapter n={7} title="Multiplexing: Sharing One Channel Among Many" />

      <Para>
        A transatlantic fiber cable is expensive to lay and maintain. Running one cable per user would
        be absurd. <Accent>Multiplexing</Accent> allows many users to share a single physical medium
        simultaneously. Different multiplexing schemes are used at different layers of the network.
      </Para>

      <H2>Time Division Multiplexing (TDM)</H2>

      <Para>
        Divide time into fixed slots. Each user gets their slot, sends their data, waits for the next slot.
        The T1 carrier system (1962) uses TDM to combine 24 voice channels on one wire: each 8-bit voice
        sample gets a time slot, 8000 samples per second × 24 channels × 8 bits = 1.544 Mbps (T1 rate).
        TDM is simple and deterministic but wastes capacity — if a user has no data, their slot is empty.
      </Para>

      <H2>Frequency Division Multiplexing (FDM)</H2>

      <Para>
        Divide the frequency spectrum into bands. Each user gets a dedicated frequency band. Your cable
        TV service uses FDM: each channel occupies a 6 MHz slice of the 5-1002 MHz cable spectrum.
        DOCSIS cable internet uses FDM at the coaxial level and OFDM within each band.
        Radio stations use FDM: each station has its frequency (104.3 FM, 97.1 FM, etc.) and can
        transmit simultaneously without interference.
      </Para>

      <H2>Wavelength Division Multiplexing (WDM)</H2>

      <Para>
        The fiber optic version of FDM: different data streams travel as different wavelengths (colors) of
        light simultaneously through the same fiber. DWDM (Dense WDM) can pack 80–160 channels separated
        by 0.4 nm into a single fiber, each carrying 100–400 Gbps. Total capacity: 12–64 Tbps per fiber pair.
      </Para>

      <H2>OFDM: The Modern Standard</H2>

      <Para>
        OFDM (Orthogonal Frequency Division Multiplexing) splits the spectrum into hundreds or thousands
        of narrow subcarriers, each carrying a small data stream. The subcarriers are mathematically
        orthogonal — they don&apos;t interfere with each other despite overlapping. This allows very efficient
        use of spectrum and excellent resistance to multipath interference (echoes in Wi-Fi environments).
      </Para>

      <Para>
        Wi-Fi, 4G LTE, 5G, and ADSL all use OFDM. Wi-Fi 6 adds <Accent>OFDMA</Accent> (the A for Access),
        allowing different subcarriers to serve different users simultaneously — solving Wi-Fi&apos;s
        half-duplex limitation in dense environments like airport lounges.
      </Para>

      <Divider />

      {/* ── Chapter 08 ── */}
      <Chapter n={8} title="Error Detection and Correction: Keeping Data Intact" />

      <Para>
        Physical transmission is imperfect. Electrical noise, radio interference, cosmic rays, manufacturing
        defects, and signal attenuation all cause bits to flip during transit. Error detection catches these
        flips. Error correction fixes them without retransmission. Choosing the right method involves
        tradeoffs between overhead, computation, and the type/frequency of expected errors.
      </Para>

      <ErrorDetectionExplorer />

      <H2>How Ethernet Uses CRC-32</H2>

      <Para>
        Every Ethernet frame ends with a 4-byte FCS (Frame Check Sequence) containing a CRC-32 value.
        The sender computes CRC over the entire frame payload. The receiver recomputes and compares.
        A mismatch means a bit error — the switch or NIC silently drops the frame. Higher layers (TCP)
        detect the loss via missing acknowledgment and retransmit. Ethernet doesn&apos;t send NACKs
        (negative acknowledgments) — it just drops bad frames silently.
      </Para>

      <H2>Forward Error Correction in the Real World</H2>

      <Para>
        FEC (Forward Error Correction) adds redundancy so the receiver can fix errors without requesting
        retransmission. Essential when retransmission is impossible or too slow:
      </Para>

      <CodeBlock>{`Application         FEC Algorithm          Why FEC
─────────────────────────────────────────────────────────────────────
Deep space comms    Turbo codes, LDPC       Round-trip 20+ minutes
DVDs/Blu-ray        Reed-Solomon            Can't retransmit a disc
QR codes            Reed-Solomon            Must decode when partially obscured
4G/5G               Turbo codes, Polar      Real-time, retransmit too slow
Wi-Fi 802.11        LDPC (Wi-Fi 4+)         Reduces retransmissions
ECC RAM             Hamming + extended      Bit flip crashes the server
NVMe SSD            LDPC                    Worn flash cells have high error rate
Optical 100GbE      RS(544,514) FEC         Required for 100G DWDM over any distance`}</CodeBlock>

      <Warn>
        FEC increases latency slightly (must buffer data to compute/decode the code). Real-time audio
        codecs (Opus, used by WebRTC) include packet-level FEC: if a UDP packet is lost, the next packet
        contains a lower-quality copy of the previous one. Listeners hear a slight quality drop rather
        than a gap. This is why Zoom calls "hide" single packet losses — FEC at the application layer.
      </Warn>

      <Divider />

      {/* ── Chapter 09 ── */}
      <Chapter n={9} title="Flow Control and Congestion: Managing Fast Senders" />

      <Para>
        Sending data faster than the receiver can process it, or faster than the network can carry it,
        causes buffers to overflow and packets to be dropped. Two distinct problems require two distinct
        solutions: <Accent>flow control</Accent> (sender vs receiver capacity) and
        <Accent> congestion control</Accent> (sender vs network capacity).
      </Para>

      <H2>Flow Control: Receiver Window</H2>

      <Para>
        If a fast server sends data at 10 Gbps to a client with a 1 Gbps NIC, the client&apos;s buffer fills
        and frames are dropped. The receiver advertises how much buffer space it has via the TCP window
        size field. The sender must not send more than the receiver&apos;s window at any time. This creates
        back-pressure from receiver to sender without requiring a separate control channel.
      </Para>

      <H2>Congestion Control: Network Window</H2>

      <Para>
        Even if the receiver can handle data at 10 Gbps, the network between sender and receiver may only
        handle 100 Mbps. TCP&apos;s congestion control probes for available network bandwidth and backs off
        when congestion is detected (packet loss or ECN signals).
      </Para>

      <CodeBlock>{`TCP Cubic (Linux default):
  1. Slow Start: begin at 1 MSS, double every RTT until loss or ssthresh
  2. Congestion Avoidance: cubic function of time since last loss
  3. Loss detected (3 dup ACKs or timeout): reduce window, restart
  4. ECN: routers mark packets instead of dropping → smoother behavior

TCP BBR (Google, 2016 — used by YouTube, GCP):
  Directly models bottleneck bandwidth and RTT
  Maintains high throughput even with mild packet loss
  Doesn't rely on loss as congestion signal (loss = already too late)
  Dramatically better on long-fat networks (satellite, transoceanic)`}</CodeBlock>

      <WowBox>
        TCP BBR (Bottleneck Bandwidth and RTT) was published by Google in 2016 and immediately deployed
        on YouTube. It increased YouTube throughput by 4% globally — which at YouTube&apos;s scale represents
        petabytes of additional video delivered per day. On high-latency links (satellite), BBR improved
        throughput by up to 2700× versus CUBIC. One algorithm change, affecting billions of streams.
      </WowBox>

      <Divider />

      {/* ── Chapter 10 ── */}
      <Chapter n={10} title="Shannon's Theorem: The Physics of Maximum Speed" />

      <Para>
        Claude Shannon&apos;s 1948 paper <em>A Mathematical Theory of Communication</em> established the
        absolute theoretical maximum data rate for any channel, regardless of the engineering brilliance
        applied. This is the Shannon-Hartley theorem:
      </Para>

      <CodeBlock>{`C = B × log₂(1 + S/N)

Where:
  C = channel capacity (bits per second) — the theoretical maximum
  B = bandwidth of the channel (Hz)
  S/N = signal-to-noise ratio (linear, not dB)

Converting dB to linear SNR:
  SNR_linear = 10^(SNR_dB / 10)

Examples:
  Phone call: B=4,000 Hz, SNR=30 dB → C = 4000 × log₂(1001) ≈ 40 kbps
  Cat6 Ethernet: B=250 MHz, SNR=40 dB → C = 250M × 13.3 = 3.3 Gbps
  Wi-Fi 6 80MHz channel, SNR=30 dB: C = 80M × 10 = 800 Mbps per stream
  Single-mode fiber: B=25 THz, SNR=60 dB → C ≈ 500 Tbps`}</CodeBlock>

      <Para>
        Shannon&apos;s limit means you can never exceed C bits/second on a given channel, no matter how clever
        your encoding. Modern fiber optic systems are approaching this limit using DWDM + advanced
        modulation (64-QAM, 256-QAM). When engineers say they need more bandwidth, they&apos;re ultimately
        asking for more spectrum (B) or better SNR (via amplifiers, shorter cables, or better hardware).
      </Para>

      <WowBox>
        Shannon published this theorem in 1948 — before transistors were widely available, before computers
        were commercially available, before digital communication was mainstream. He proved mathematically
        that perfect error-free communication was possible over any noisy channel given enough redundancy,
        and gave the exact formula for the maximum rate. It took engineers 50 years to build systems that
        actually approach the Shannon limit. He was that far ahead.
      </WowBox>

      <Divider />

      {/* ── Chapter 11 ── */}
      <Chapter n={11} title="Measuring and Diagnosing Transmission Performance" />

      <Para>
        Understanding data transmission theory lets you read the tools that measure it. Every network
        engineer needs a standard toolkit for measuring latency, throughput, and error rates.
      </Para>

      <H2>Essential Tools</H2>

      <CodeBlock>{`# Latency measurement
ping -c 10 8.8.8.8          # Basic RTT, also shows jitter (stddev)
ping -c 100 host | tail -1  # Statistics line: min/avg/max/mdev

# Throughput measurement (iperf3 — requires server + client)
iperf3 -s                               # Start server
iperf3 -c server_ip -t 30              # 30-second TCP test
iperf3 -c server_ip -u -b 100M         # UDP test at 100 Mbps
iperf3 -c server_ip -P 4               # 4 parallel streams (fill the pipe)
iperf3 -c server_ip -R                 # Reverse: server sends to client

# Trace the path
traceroute -n 8.8.8.8       # Show each hop, no DNS resolution
mtr 8.8.8.8                 # Live traceroute with loss/latency per hop

# Bandwidth-Delay Product tuning (Linux)
cat /proc/sys/net/ipv4/tcp_rmem         # Receive buffer: min/default/max
sysctl net.ipv4.tcp_rmem='4096 87380 16777216'
# For satellite/high-RTT: increase max to RTT×bandwidth/8 bytes`}</CodeBlock>

      <H2>Reading iperf3 Output</H2>

      <CodeBlock>{`$ iperf3 -c 192.168.1.1 -t 10
Connecting to host 192.168.1.1, port 5201
[ ID] Interval      Transfer    Bitrate       Retr  Cwnd
[  5] 0-1 sec      112 MBytes  942 Mbits/sec  0    1.67 MBytes
[  5] 1-2 sec      112 MBytes  944 Mbits/sec  0    1.67 MBytes
[  5] 9-10 sec     111 MBytes  934 Mbits/sec  2    1.45 MBytes
- - - - - - - - - - - - - - - - - - - - - - - - -
[  5] 0-10 sec    1.09 GBytes  940 Mbits/sec  2   (sender)
[  5] 0-10 sec    1.09 GBytes  939 Mbits/sec      (receiver)

"Retr" column = TCP retransmissions (2 in 10 sec = excellent)
"Cwnd" = congestion window size (should grow to fill BDP)
940 Mbits/sec on 1 Gbps link = 94% utilization = normal Ethernet overhead`}</CodeBlock>

      <Divider />

      {/* ── Chapter 12 ── */}
      <Chapter n={12} title="Practical Optimization: Getting the Most From Your Medium" />

      <Para>
        Knowing the theory, you can systematically improve real network performance. Most "slow network"
        problems fall into one of four categories: wrong medium, wrong configuration, hardware issues,
        or congestion. Here&apos;s how to approach each:
      </Para>

      <H2>Diagnosing and Fixing Common Issues</H2>

      <CodeBlock>{`Problem: Low throughput on Ethernet
Diagnosis:
  ethtool eth0 | grep -i speed          # Should show 1000 Mbps
  ethtool eth0 | grep -i duplex         # Must be Full
  ip -s link show eth0                  # Check TX/RX errors
Fix:
  Force speed/duplex if auto-negotiation fails:
  ethtool -s eth0 speed 1000 duplex full autoneg off
  Replace cable if errors > 0.01% of packets

Problem: Wi-Fi slower than expected
Diagnosis:
  iwconfig wlan0 | grep -i rate         # Current bitrate
  iw dev wlan0 link                     # Signal strength (dBm), expected: > -70 dBm
  iwlist wlan0 scan | grep -E "Chan|Quality|Signal"
Fix:
  > -70 dBm: acceptable, > -80 dBm: marginal (move closer or add AP)
  Check for channel congestion (overlapping 2.4 GHz channels 1/6/11)
  Switch to 5 GHz band if possible

Problem: High latency, packet loss
Diagnosis:
  mtr --report --report-cycles 100 8.8.8.8
  Look for: loss that first appears at a specific hop (that hop is congested)
  Increasing RTT through all subsequent hops (bottleneck found)
Fix:
  QoS to prioritize latency-sensitive traffic
  Add bandwidth or fix the congested link
  Switch to a less congested path/ISP

Problem: Low throughput on high-RTT link (satellite)
Diagnosis:
  iperf3 -c server -t 30 --verbose | grep cwnd
  If Cwnd stays small: TCP window is limiting throughput
Fix:
  sysctl net.ipv4.tcp_wmem='4096 131072 67108864'
  sysctl net.ipv4.tcp_rmem='4096 131072 67108864'
  Use BBR congestion control: sysctl net.ipv4.tcp_congestion_control=bbr`}</CodeBlock>

      <Divider />

      {/* ── Chapter 13 ── */}
      <Chapter n={13} title="Common Misconceptions" />

      <Err>
        <strong>"Bandwidth and speed are the same thing."</strong><br /><br />
        Bandwidth is the maximum capacity of a link. Speed (throughput) is how much data actually moves.
        Latency is how long it takes for data to get there. A satellite link can have 50 Mbps bandwidth
        but 600ms latency — "fast" in bandwidth, painfully slow for interactive use. A gigabit fiber link
        to a congested server gives you 1 Gbps bandwidth but maybe 10 Mbps throughput. Bandwidth ≠ speed.
      </Err>

      <Err>
        <strong>"Wireless is almost as good as wired now."</strong><br /><br />
        Wi-Fi 6 theoretical speeds exceed Gigabit Ethernet. But in practice: Wi-Fi is shared half-duplex
        medium (everyone in range shares the channel), highly sensitive to interference (microwaves, other
        Wi-Fi networks, Bluetooth), subject to multipath fading, and adds 2-8ms latency vs 0.1ms for
        wired. For latency-sensitive applications (trading, gaming, real-time audio), Ethernet&apos;s
        deterministic behavior is irreplaceable. Wi-Fi is convenient, not equivalent.
      </Err>

      <Err>
        <strong>"More antennas on a Wi-Fi router always means better performance."</strong><br /><br />
        MIMO (Multiple Input Multiple Output) antennas work by creating independent spatial streams using
        multipath reflections. This requires the environment to have scatterers (walls, objects) and
        client devices to support the same number of streams. A 4×4 MIMO router gives 4× speed only to
        a 4×4 MIMO client, not to a 1×1 phone. And in a line-of-sight open field with no reflections,
        MIMO gains disappear because there are no distinct spatial paths.
      </Err>

      <Err>
        <strong>"Fiber is the fastest possible transmission medium."</strong><br /><br />
        Light in a vacuum travels at 299,792 km/s. Light in fiber travels at ~200,000 km/s (refractive
        index ≈ 1.5). For some ultra-low-latency applications (high-frequency trading between New York and
        Chicago), microwave/millimeter-wave wireless links are faster — air has lower refractive index
        than glass, so radio waves travel 30-40% faster. Spread Networks built a fiber route specifically
        optimized for the shortest path; HFT firms then built microwave towers along the same route
        and beat the fiber latency.
      </Err>

      <Err>
        <strong>"Packet loss is always a problem that needs fixing."</strong><br /><br />
        TCP Cubic deliberately causes a small amount of packet loss to probe the congestion limit —
        that&apos;s how it finds available bandwidth. A &lt;0.1% loss rate on a properly functioning TCP
        connection is normal and expected. Loss becomes a problem above ~1% (significant throughput
        reduction) or on UDP streams where loss = visible artifact (video glitch, audio dropout).
        Different protocols have completely different tolerance for loss.
      </Err>

      <Err>
        <strong>"You can always improve speed by upgrading the hardware."</strong><br /><br />
        Shannon&apos;s theorem sets a hard physical limit. Beyond a certain point, more powerful hardware
        doesn&apos;t help — the limiting factor is the channel&apos;s bandwidth and SNR, not the equipment.
        A 100-year-old copper pair in the phone network has a Shannon capacity of ~50 Mbps under ideal
        conditions — no amount of better DSP chips changes that. To go faster, you need a better channel:
        more bandwidth (wider spectrum) or better SNR (shorter cable, fiber, cleaner environment).
      </Err>

      <Divider />

      {/* ── Chapter 14 ── */}
      <Chapter n={14} title="Test Your Understanding" />

      <IQ level="Beginner">
        <strong>Q: Your Wi-Fi shows "Connected, 300 Mbps" but your actual download is only 30 Mbps. What are three possible reasons?</strong>
        <br /><br />
        (1) The 300 Mbps is the Wi-Fi link rate (PHY speed) — the rate of the air interface, not the internet
        connection. Your ISP plan may be 30 Mbps, which is the actual bottleneck.
        (2) Multiple devices sharing the Wi-Fi channel — the 300 Mbps is the total channel capacity split
        among all connected devices.
        (3) Signal quality — even though Windows shows 300 Mbps, actual throughput varies with interference,
        distance, and the number of spatial streams negotiated. Use a speed test to find the real bottleneck
        (if fast on Ethernet but slow on Wi-Fi, the Wi-Fi is the issue; if slow on both, it&apos;s the ISP).
      </IQ>

      <IQ level="Beginner">
        <strong>Q: Why does fiber optic cable use light instead of electricity?</strong>
        <br /><br />
        Three reasons: (1) Light doesn&apos;t lose energy to electrical resistance — copper resistance increases
        with frequency, limiting high-speed signal distance. (2) Light is immune to electromagnetic interference
        — no lightning strikes, no motors nearby can corrupt the signal. (3) Light travels much faster through
        fiber than electrons through copper (though slower than light in vacuum), and can carry multiple
        wavelengths (colors) simultaneously (WDM), multiplying capacity. The tradeoff: fiber is more fragile
        and expensive to terminate than copper, and requires laser sources instead of simple voltage circuits.
      </IQ>

      <IQ level="Intermediate">
        <strong>Q: What is the theoretical maximum throughput for a 1 Gbps Ethernet link with standard TCP, MTU 1500, and RTT 100ms?</strong>
        <br /><br />
        Without window scaling, TCP&apos;s default receive window is 65,535 bytes (64 KB). At RTT=100ms,
        max throughput = window / RTT = 65,535 B / 0.1 s = 655,350 B/s ≈ 5.24 Mbps. That&apos;s less than
        1% of the 1 Gbps link! TCP window scaling (RFC 7323) allows windows up to 1 GB. With a 16 MB
        window: 16,777,216 / 0.1 = 167 Mbps — still well short of 1 Gbps. To saturate the link:
        window = 1 Gbps × 100ms / 8 = 12.5 MB. Kernel parameter <Code>net.ipv4.tcp_rmem</Code>
        must be tuned to allow this window size, and the server must support window scaling.
        This is the bandwidth-delay product problem in practice.
      </IQ>

      <IQ level="Intermediate">
        <strong>Q: Explain why 2.4 GHz Wi-Fi reaches farther than 5 GHz Wi-Fi but is slower.</strong>
        <br /><br />
        Two effects: (1) Free-space path loss increases with frequency — higher frequency = shorter wavelength
        = more diffraction loss per meter. 5 GHz loses ~6 dB more per doubling of distance than 2.4 GHz.
        This means 5 GHz signal drops below usable threshold at shorter distances.
        (2) Available channel bandwidth: 2.4 GHz has three non-overlapping 20 MHz channels (1, 6, 11).
        5 GHz has channels up to 80 or 160 MHz wide. More bandwidth = more capacity (Shannon).
        The tradeoff is physics: higher frequency = wider channels available but shorter range due to
        more attenuation by walls, floors, and air. Tri-band routers use both: 2.4 GHz for range,
        5 GHz for throughput when nearby.
      </IQ>

      <IQ level="Senior">
        <strong>Q: A file transfer over a 100 Mbps link with 200ms RTT achieves only 40 Mbps throughput. You see no packet loss in the Ethernet statistics. What is the most likely cause and how do you fix it?</strong>
        <br /><br />
        With no packet loss, the likely culprit is TCP window size limiting throughput. Required window
        for 100 Mbps at 200ms RTT: 100 Mbps × 0.2 s / 8 = 2.5 MB. If the TCP socket&apos;s receive buffer
        is smaller (default on many systems is 128 KB), TCP can only have 128 KB in flight, limiting
        throughput to 128,000 / 0.2 = 640,000 B/s ≈ 5.1 Mbps (not 40 Mbps, so may not be the only factor).
        Other causes: (1) Application reading data slowly, keeping the receive buffer full —
        profile the application. (2) Nagle&apos;s algorithm accumulating small writes before sending —
        disable with <Code>TCP_NODELAY</Code>. (3) Multiple TCP streams, each limited individually —
        aggregate over parallel connections. Fix: increase socket buffers (<Code>SO_RCVBUF</Code>,
        <Code>SO_SNDBUF</Code>), enable TCP window scaling, consider switching to QUIC for better
        multi-stream behavior.
      </IQ>

      <IQ level="Senior">
        <strong>Q: How does OFDMA in Wi-Fi 6 improve performance in dense environments, and what is its fundamental tradeoff?</strong>
        <br /><br />
        Traditional Wi-Fi (OFDM in 802.11ac/n) is TDMA at the MAC layer — one device transmits at a time.
        In a coffee shop with 50 devices, each device waits for its turn. The channel may be idle between
        transmissions (DCF backoff overhead), and bursty traffic patterns leave bandwidth wasted.
        OFDMA (802.11ax) divides the OFDM subcarriers into Resource Units (RUs) and assigns different
        RUs to different clients simultaneously. The AP can serve 16+ clients in a single OFDM symbol
        period. Small packets (IoT sensors, DNS queries, VoIP) that previously each needed their own
        channel access now share a transmission. Measured improvement: 30-50% higher aggregate
        throughput in dense deployments; reduced latency per client from ~10ms to ~2ms.
        Tradeoff: OFDMA requires the AP to schedule transmissions centrally — clients must request
        uplink resource units via buffer status reports, adding a small scheduling overhead. Single-device
        throughput may be slightly lower than with the full OFDM channel. OFDMA excels when many
        devices have small messages; a single device running iperf3 is better served by the full channel.
      </IQ>

      <IQ level="PhD">
        <strong>Q: Shannon&apos;s theorem gives theoretical channel capacity. Why do real systems operate well below capacity, and what techniques bring them closest to the limit?</strong>
        <br /><br />
        Shannon&apos;s theorem proves capacity exists but doesn&apos;t specify how to achieve it. The gap between
        Shannon capacity and practice comes from several sources:
        <br /><br />
        (1) <em>Encoding complexity:</em> Shannon-capacity-achieving codes exist theoretically but require
        infinite codeword length and exponential decoding complexity. Real codes trade performance for
        practicality. Turbo codes (3G) and LDPC codes (Wi-Fi, 5G, optical) approach capacity within
        0.1-0.5 dB with polynomial complexity. Polar codes (5G NR control channels) are the first
        provably capacity-achieving codes with efficient successive cancellation decoding — a Shannon
        paper from 1948 finally realized in 5G deployments in 2019.
        <br /><br />
        (2) <em>Channel estimation:</em> Shannon assumes perfect knowledge of channel state. Real channels
        (especially wireless multipath) are estimated using pilot symbols, consuming bandwidth and
        introducing estimation error. Massive MIMO uses hundreds of antennas to average out estimation
        error — channel hardening.
        <br /><br />
        (3) <em>Non-Gaussian noise:</em> Shannon assumes additive white Gaussian noise (AWGN). Real
        channels have impulsive noise (switching transients), narrowband interference, and time-varying
        fading — all of which require more robust codes than AWGN-optimal designs.
        <br /><br />
        Techniques approaching the limit: (a) LDPC + HARQ (Hybrid ARQ) in 4G/5G — retransmit only
        the incremental redundancy needed, approaching capacity per retransmission. (b) Continuous
        phase modulation with nonlinear equalization for optical DWDM. (c) Constellation shaping:
        using Maxwell-Boltzmann distribution instead of uniform QAM to match AWGN-optimal distribution —
        adds 0.5-1 dB over standard QAM. Used in 400G optical transceivers. (d) Coded modulation
        (Ungerböck TCM): jointly optimizing modulation and coding to maximize minimum Euclidean distance
        in signal space.
      </IQ>

      <IQ level="PhD">
        <strong>Q: Analyze the impact of buffer bloat on modern networks and explain why it took 30 years to diagnose and fix.</strong>
        <br /><br />
        Bufferbloat is the systematic addition of large buffers at every network device (routers, switches,
        cable modems, Wi-Fi APs, NICs) starting in the 2000s. Manufacturing economics drove this: RAM
        became cheap, and larger buffers seemed to improve performance by absorbing traffic bursts.
        The catastrophic side effect went unnoticed for a decade.
        <br /><br />
        Mechanism: TCP&apos;s loss-based congestion control requires packet loss to detect congestion.
        With large buffers, packets queue for hundreds of milliseconds before being dropped — TCP doesn&apos;t
        see loss, so it continues sending at high rate. Result: throughput is maintained but latency
        explodes (buffered packets wait 500-2000ms in queue). Interactive applications (VoIP, gaming,
        SSH) become unusable during bulk transfers, even though bandwidth appears fully utilized.
        This is why a large download kills your Zoom call on consumer routers — the router&apos;s buffer
        bloats and every Zoom packet sits behind bulk data.
        <br /><br />
        Why 30 years: The effect was known theoretically but masked by measurement tools that reported
        average latency (dominated by idle periods) rather than latency-under-load. Jim Gettys (author
        of HTTP/1.1) named and popularized the problem in 2011 after noticing it on a consumer router.
        Diagnosis required load-testing while measuring interactive latency simultaneously — not standard
        practice.
        <br /><br />
        Solutions: (1) CoDel (Controlled Delay) algorithm — marks/drops packets when sojourn time
        in queue exceeds 5ms target, keeping latency bounded. (2) FQ-CoDel (Fair Queue CoDel) — adds
        per-flow fairness so one bulk flow can&apos;t starve interactive traffic. Deployed in Linux 3.6
        (2012), now default on OpenWrt routers. (3) CAKE (Common Applications Kept Enhanced) —
        extends FQ-CoDel with better traffic classification. (4) BBR — avoids filling buffers by
        not using loss as congestion signal, maintaining high throughput with controlled latency.
        As of 2024, bufferbloat remains unresolved on most ISP-provided equipment where customers
        don&apos;t control the firmware.
      </IQ>

      <Divider />

      <KeyTakeaways items={[
        'Data transmission converts discrete bits to physical signals (voltage, light, radio waves) and recovers them at the destination.',
        'Signal encoding (Manchester, 4B/5B, PAM4) solves clock recovery and DC balance — the encoding determines achievable speed.',
        'Three media dominate: copper (cost-effective, 100m limit), fiber (long distance, immune to EMI, near-unlimited bandwidth), wireless (mobile, shared medium).',
        'Bandwidth (pipe size) ≠ throughput (actual speed) ≠ latency (time to arrive). All three matter for different applications.',
        'Shannon\'s theorem C = B × log₂(1 + S/N) sets the absolute physical maximum for any channel. More bandwidth or better SNR is the only way past it.',
        'Error detection: parity (1-bit only), checksum (IPv4/TCP/UDP, fast), CRC-32 (Ethernet, strong burst detection), FEC (detect AND correct, high overhead).',
        'Multiplexing (TDM, FDM, OFDM, OFDMA, WDM) allows many users to share one physical medium — the basis of all shared networks.',
        'TCP flow control prevents overwhelming the receiver; TCP congestion control prevents overwhelming the network. BBR outperforms CUBIC on high-RTT links.',
        'Bufferbloat: over-sized router buffers maintain throughput but add 500ms+ latency. Fixed by CoDel/FQ-CoDel/CAKE algorithms and BBR congestion control.',
        'Measure, don\'t assume: use iperf3 for throughput, ping/mtr for latency/loss. ethtool and iwconfig reveal the link-layer truth.',
      ]} />
    </LearnLayout>
  )
}
