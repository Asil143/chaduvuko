'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

/* ── helper components ─────────────────────────────────────────────── */
const G = '#10b981'

const Chapter = ({ n, title }: { n: number; title: string }) => (
  <div style={{ marginBottom: 32 }}>
    <p style={{ fontSize: 11, color: G, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 6px', letterSpacing: '.12em', textTransform: 'uppercase' }}>
      Chapter {String(n).padStart(2, '0')}
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
  <div style={{ background: 'linear-gradient(135deg,#0f2027,#203a43,#2c5364)', border: `1px solid ${G}30`, borderRadius: 12, padding: '20px 24px', margin: '28px 0', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 12, right: 16, fontSize: 22, opacity: 0.18 }}>📖</div>
    <p style={{ fontSize: 11, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.12em', margin: '0 0 10px' }}>Story</p>
    <div style={{ fontSize: 14, color: '#d1fae5', lineHeight: 1.9 }}>{children}</div>
  </div>
)

const WowBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'linear-gradient(135deg,#1c1917,#292524)', border: '1px solid #f59e0b30', borderRadius: 12, padding: '20px 24px', margin: '28px 0', position: 'relative' }}>
    <div style={{ position: 'absolute', top: 12, right: 16, fontSize: 22, opacity: 0.25 }}>⚡</div>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.12em', margin: '0 0 10px' }}>Wow Factor</p>
    <div style={{ fontSize: 14, color: '#fef3c7', lineHeight: 1.9 }}>{children}</div>
  </div>
)

const Warn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: '#f59e0b08', border: '1px solid #f59e0b35', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Caution — {title}</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

const Err = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: '#ef444408', border: '1px solid #ef444430', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Misconception — {title}</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

const LEVEL_COLORS: Record<string, string> = {
  Beginner: '#10b981',
  Intermediate: '#3b82f6',
  Senior: '#8b5cf6',
  PhD: '#f97316',
}

const IQ = ({ q, level, children }: { q: string; level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 0 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: '#000', background: LEVEL_COLORS[level], padding: '2px 9px', borderRadius: 20, letterSpacing: '.06em', textTransform: 'uppercase', flexShrink: 0 }}>{level}</span>
      <div style={{ background: `${LEVEL_COLORS[level]}12`, border: `1px solid ${LEVEL_COLORS[level]}30`, borderRadius: '0 8px 0 0', padding: '12px 16px', fontSize: 14, fontWeight: 700, color: 'var(--text)', flex: 1 }}>Q: {q}</div>
    </div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '16px 18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)

/* ── interactive components ────────────────────────────────────────── */

const WIFI_STANDARDS = [
  { gen: 'Wi-Fi 4', std: '802.11n', year: 2009, band: '2.4 / 5 GHz', maxRate: '600 Mbps', mimo: '4×4 MIMO', modulation: '64-QAM', color: '#6b7280', notable: 'First MIMO standard. Changed Wi-Fi from niche to mainstream.' },
  { gen: 'Wi-Fi 5', std: '802.11ac', year: 2013, band: '5 GHz only', maxRate: '3.5 Gbps', mimo: '8×8 MU-MIMO (DL)', modulation: '256-QAM', color: '#3b82f6', notable: 'Wave 2 added MU-MIMO (4 simultaneous clients). Gigabit Wi-Fi.' },
  { gen: 'Wi-Fi 6', std: '802.11ax', year: 2019, band: '2.4 / 5 GHz', maxRate: '9.6 Gbps', mimo: '8×8 MU-MIMO (DL+UL)', modulation: '1024-QAM', color: '#8b5cf6', notable: 'OFDMA allows sub-channel allocation per client. 4× efficiency in dense environments.' },
  { gen: 'Wi-Fi 6E', std: '802.11ax', year: 2021, band: '2.4 / 5 / 6 GHz', maxRate: '9.6 Gbps', mimo: '8×8 MU-MIMO', modulation: '1024-QAM', color: '#f59e0b', notable: '6 GHz band adds 1.2 GHz of clean spectrum. 59 additional 20 MHz channels.' },
  { gen: 'Wi-Fi 7', std: '802.11be', year: 2024, band: '2.4 / 5 / 6 GHz', maxRate: '46 Gbps', mimo: '16×16 MU-MIMO', modulation: '4096-QAM', color: G, notable: 'Multi-Link Operation (MLO) bonds multiple bands simultaneously. 320 MHz channels.' },
]

function WifiStandardsExplorer() {
  const [selected, setSelected] = useState<string | null>(null)
  const s = WIFI_STANDARDS.find(w => w.gen === selected)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Interactive — Wi-Fi Standards Explorer</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Click a generation to compare specifications.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '80px 80px 60px 100px 110px 100px', gap: 0, padding: '8px 12px', background: `${G}15`, borderRadius: '8px 8px 0 0', fontSize: 11, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
          <span>Gen</span><span>Standard</span><span>Year</span><span>Max Rate</span><span>Band</span><span>MIMO</span>
        </div>
        {WIFI_STANDARDS.map((w, i) => (
          <div key={w.gen} onClick={() => setSelected(selected === w.gen ? null : w.gen)}
            style={{ display: 'grid', gridTemplateColumns: '80px 80px 60px 100px 110px 100px', gap: 0, padding: '10px 12px', background: selected === w.gen ? `${w.color}12` : i % 2 === 0 ? 'var(--bg)' : 'var(--surface)', border: `1px solid ${selected === w.gen ? w.color : 'var(--border)'}`, borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderRadius: i === WIFI_STANDARDS.length - 1 ? '0 0 8px 8px' : 0, cursor: 'pointer', transition: 'all .15s', alignItems: 'center' }}>
            <code style={{ fontSize: 12, fontWeight: 700, color: w.color }}>{w.gen}</code>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>{w.std}</span>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>{w.year}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{w.maxRate}</span>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>{w.band}</span>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>{w.mimo}</span>
          </div>
        ))}
      </div>

      {s && (
        <div style={{ marginTop: 16, background: `${s.color}10`, border: `1px solid ${s.color}30`, borderRadius: 8, padding: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: s.color, margin: '0 0 6px' }}>{s.gen} ({s.std}, {s.year}) — Modulation: {s.modulation}</p>
          <p style={{ fontSize: 13, color: 'var(--text)', margin: 0 }}>{s.notable}</p>
        </div>
      )}
    </div>
  )
}

interface ChannelBand { band: string; channels: { num: number; freq: number; overlap: boolean }[] }

const CHANNELS_2G: ChannelBand = {
  band: '2.4 GHz',
  channels: [
    { num: 1, freq: 2412, overlap: false },
    { num: 2, freq: 2417, overlap: true },
    { num: 3, freq: 2422, overlap: true },
    { num: 4, freq: 2427, overlap: true },
    { num: 5, freq: 2432, overlap: true },
    { num: 6, freq: 2437, overlap: false },
    { num: 7, freq: 2442, overlap: true },
    { num: 8, freq: 2447, overlap: true },
    { num: 9, freq: 2452, overlap: true },
    { num: 10, freq: 2457, overlap: true },
    { num: 11, freq: 2462, overlap: false },
  ],
}

const CHANNELS_5G = [36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 149, 153, 157, 161, 165]

function ChannelPlanningTool() {
  const [band, setBand] = useState<'2.4' | '5'>('2.4')
  const [selectedCh, setSelectedCh] = useState<number | null>(null)
  const [width, setWidth] = useState<20 | 40 | 80 | 160>(20)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Interactive — Channel Planning Tool</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Visualize channel allocations and overlaps across 2.4 GHz and 5 GHz bands.</p>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {(['2.4', '5'] as const).map(b => (
            <button key={b} onClick={() => { setBand(b); setSelectedCh(null) }}
              style={{ background: band === b ? G : 'var(--bg)', color: band === b ? '#000' : 'var(--muted)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
              {b} GHz
            </button>
          ))}
        </div>
        {band === '5' && (
          <div style={{ display: 'flex', gap: 4 }}>
            {([20, 40, 80, 160] as const).map(w => (
              <button key={w} onClick={() => setWidth(w)}
                style={{ background: width === w ? '#3b82f6' : 'var(--bg)', color: width === w ? '#fff' : 'var(--muted)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 10px', fontSize: 12, cursor: 'pointer' }}>
                {w}MHz
              </button>
            ))}
          </div>
        )}
      </div>

      {band === '2.4' && (
        <>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 12 }}>
            {CHANNELS_2G.channels.map(c => (
              <div key={c.num} onClick={() => setSelectedCh(selectedCh === c.num ? null : c.num)}
                style={{ width: 44, padding: '8px 0', textAlign: 'center', background: selectedCh === c.num ? G : c.overlap ? '#ef444420' : `${G}20`, border: `2px solid ${selectedCh === c.num ? G : c.overlap ? '#ef444440' : `${G}40`}`, borderRadius: 6, cursor: 'pointer' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: selectedCh === c.num ? '#000' : c.overlap ? '#ef4444' : G }}>{c.num}</div>
                <div style={{ fontSize: 9, color: selectedCh === c.num ? '#000' : 'var(--muted)' }}>{c.freq}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 10px' }}>
            Green = non-overlapping channels (1, 6, 11). Red = overlap with adjacent channels. In the 2.4 GHz band, only channels 1, 6, and 11 are non-overlapping — use these exclusively for access point deployment.
          </p>
          {selectedCh !== null && (
            <div style={{ background: `${G}10`, border: `1px solid ${G}30`, borderRadius: 8, padding: 12 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: G, margin: '0 0 4px' }}>Channel {selectedCh} — {CHANNELS_2G.channels.find(c => c.num === selectedCh)?.freq} MHz</p>
              <p style={{ fontSize: 13, color: 'var(--text)', margin: 0 }}>
                {[1, 6, 11].includes(selectedCh)
                  ? `Non-overlapping channel. Safe to use. Deploy APs on only channels 1, 6, and 11 to avoid co-channel interference with adjacent APs.`
                  : `This channel overlaps with adjacent channels. Using it causes co-channel interference with APs on nearby channels. Avoid in new deployments — use channels 1, 6, or 11 only.`
                }
              </p>
            </div>
          )}
        </>
      )}

      {band === '5' && (
        <>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 12 }}>
            {CHANNELS_5G.map(c => (
              <div key={c} onClick={() => setSelectedCh(selectedCh === c ? null : c)}
                style={{ width: 40, padding: '8px 0', textAlign: 'center', background: selectedCh === c ? G : `${G}15`, border: `2px solid ${selectedCh === c ? G : `${G}30`}`, borderRadius: 6, cursor: 'pointer' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: selectedCh === c ? '#000' : G }}>{c}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 10px' }}>
            5 GHz has 25 non-overlapping 20 MHz channels (vs. 3 in 2.4 GHz). Channels 52–144 require Dynamic Frequency Selection (DFS) — the AP must scan for radar signals before using them, adding up to 60-second startup delay. Channels 36–48 and 149–165 are UNII-1 and UNII-3 (no DFS required) — preferred for indoor deployments.
          </p>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>
            With {width} MHz channel width: each channel group uses {width / 20} × 20 MHz channels. Wider channels = higher throughput per client but fewer non-overlapping channels available for adjacent APs.
          </p>
        </>
      )}
    </div>
  )
}

type AuthMode = 'open' | 'wpa2-personal' | 'wpa2-enterprise' | 'wpa3-personal' | 'wpa3-enterprise'

const AUTH_MODES: { id: AuthMode; name: string; color: string; security: number; desc: string; useCase: string }[] = [
  { id: 'open', name: 'Open (No Security)', color: '#ef4444', security: 0, desc: 'No authentication or encryption. Anyone can connect and all traffic is plaintext.', useCase: 'Legacy captive portals, guest networks with no sensitive data (bad practice).' },
  { id: 'wpa2-personal', name: 'WPA2-Personal (PSK)', color: '#f59e0b', security: 3, desc: 'Pre-shared key (password). AES-CCMP encryption. Vulnerable to offline dictionary attacks if password is weak. All clients share the same key.', useCase: 'Home networks, small offices. Not suitable for environments where different users need different access levels.' },
  { id: 'wpa2-enterprise', name: 'WPA2-Enterprise (802.1X)', color: '#3b82f6', security: 7, desc: 'RADIUS-backed authentication. Each user/device has unique credentials. EAP-TLS with certificates provides mutual authentication. Per-session unique encryption keys.', useCase: 'Enterprise corporate Wi-Fi. Individual user/device accountability. Integrates with LDAP/AD.' },
  { id: 'wpa3-personal', name: 'WPA3-Personal (SAE)', color: '#8b5cf6', security: 8, desc: 'Simultaneous Authentication of Equals (SAE) replaces PSK. Resistant to offline dictionary attacks — each authentication requires interaction with the AP. Forward secrecy: past traffic stays private even if password is later discovered.', useCase: 'Modern home and small business networks. Eliminates WPA2-PSK\'s offline attack vulnerability.' },
  { id: 'wpa3-enterprise', name: 'WPA3-Enterprise (192-bit)', color: G, security: 10, desc: '192-bit security mode with GCMP-256 encryption, HMAC-SHA-384, and ECDH/ECDSA-384. Meets NSA Suite B requirements for protecting classified information.', useCase: 'Government, financial, healthcare environments with highest security requirements.' },
]

function WifiSecurityComparator() {
  const [selected, setSelected] = useState<AuthMode | null>(null)
  const mode = AUTH_MODES.find(a => a.id === selected)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Interactive — Wi-Fi Security Mode Comparator</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Click a security mode to see details, use cases, and security level.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {AUTH_MODES.map(a => (
          <div key={a.id} onClick={() => setSelected(selected === a.id ? null : a.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: selected === a.id ? `${a.color}12` : 'var(--bg)', border: `2px solid ${selected === a.id ? a.color : 'var(--border)'}`, borderRadius: 8, cursor: 'pointer', transition: 'all .15s' }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: selected === a.id ? a.color : 'var(--text)' }}>{a.name}</span>
            </div>
            <div style={{ display: 'flex', gap: 3 }}>
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} style={{ width: 8, height: 16, borderRadius: 2, background: i < a.security ? a.color : 'var(--border)' }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {mode && (
        <div style={{ background: `${mode.color}10`, border: `1px solid ${mode.color}30`, borderRadius: 8, padding: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: mode.color, margin: '0 0 8px' }}>{mode.name}</p>
          <p style={{ fontSize: 13, color: 'var(--text)', margin: '0 0 10px' }}>{mode.desc}</p>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>Use case: {mode.useCase}</p>
        </div>
      )}
    </div>
  )
}

/* ── main module ───────────────────────────────────────────────────── */

export default function WirelessNetworkingModule() {
  return (
    <LearnLayout
      title="Wireless Networking"
      description="From 802.11b's 11 Mbps to Wi-Fi 7's 46 Gbps — the physics, protocols, and design principles behind wireless networks. Understand why Wi-Fi behaves differently from wired Ethernet and how to design high-density wireless deployments."
      section="Networking Fundamentals — Module 12"
      readTime="25–35 min"
      updatedAt="May 2026"
    >
      {/* ── Chapter 1 ── */}
      <Chapter n={1} title="Radio Waves and the Wireless Channel" />

      <StoryBox>
        It is 1997. Apple is about to launch the iMac. Steve Jobs wants to cut the wires — keyboards, mice, and eventually network cables. The IEEE 802.11 standard was just ratified, delivering 1–2 Mbps over radio at 2.4 GHz. It was barely faster than a slow modem. But the promise was undeniable: computing without cables. Two years later, 802.11b delivered 11 Mbps and Apple launched the AirPort — the first consumer wireless router. A market that barely existed in 1997 would become the dominant way humans connect to the internet within a decade.
      </StoryBox>

      <Para>
        Wireless networks transmit data using <Accent>radio frequency (RF) electromagnetic waves</Accent>. Unlike wired Ethernet where signals travel through copper or fiber, wireless signals propagate through air (and walls, floors, furniture — with varying degrees of attenuation). Understanding wireless performance requires understanding the physics of radio propagation.
      </Para>

      <H2>The Wireless Channel: A Shared, Hostile Medium</H2>

      <Para>
        Wired Ethernet (full-duplex, point-to-point) gives each device exclusive, dedicated use of the medium. Wireless is fundamentally different: it is a <Accent>shared broadcast medium</Accent>. Every device in range can hear every transmission. Multiple simultaneous transmissions on the same channel cause collisions and mutual interference. This is why Wi-Fi performance degrades dramatically in dense environments (stadiums, airports, conference halls).
      </Para>

      <Para>
        <Accent>CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)</Accent> is Wi-Fi's access control mechanism. Before transmitting, a device listens to see if the medium is busy (carrier sense). If busy, it waits. If the medium is idle for DIFS (Distributed Interframe Space, 34 µs), the device starts a random backoff timer. When the timer expires, it transmits. This avoids collisions by having devices transmit at randomized times — but it also means Wi-Fi is inherently half-duplex: only one device can transmit on a channel at a time (within the collision domain).
      </Para>

      <H2>Signal Propagation Phenomena</H2>

      <Para>
        <Accent>Path loss:</Accent> Signal strength decreases with distance following the inverse square law (double the distance = quarter the power in free space). In indoor environments with walls and furniture, path loss is typically higher.
      </Para>

      <Para>
        <Accent>Multipath:</Accent> Radio signals bounce off walls, floors, and objects, creating multiple signal copies that arrive at the receiver at different times. These copies can interfere constructively (stronger signal) or destructively (weaker signal), causing unpredictable signal variation as devices move a few centimeters. MIMO exploits multipath deliberately — using multiple antennas to receive different multipath copies and combine them.
      </Para>

      <Para>
        <Accent>Hidden node problem:</Accent> Device A and Device B can both reach the AP but cannot hear each other. Both may attempt to transmit simultaneously, causing a collision at the AP that neither device can detect. RTS/CTS (Request to Send/Clear to Send) protocol mitigates this by having the AP explicitly grant transmission rights.
      </Para>

      <WowBox>
        The 2.4 GHz band is shared with microwave ovens (which operate at 2.45 GHz), Bluetooth, baby monitors, Zigbee smart home devices, and cordless phones. When your microwave runs, it radiates significant RF energy that can desensitize nearby Wi-Fi receivers, causing retransmissions and throughput drops. Microwave ovens are poorly shielded intentionally — the safety standard allows leakage up to 5 mW/cm² at 5 cm, which is still enough to affect Wi-Fi sensitivity within a few meters.
      </WowBox>

      <Divider />

      {/* ── Chapter 2 ── */}
      <Chapter n={2} title="The 802.11 Standard Family" />

      <StoryBox>
        The first Wi-Fi router I owned was a Linksys WRT54G running 802.11b/g. Maximum theoretical speed: 54 Mbps. Actual speed to a laptop across the house: 8 Mbps. That felt miraculous in 2002. Today, a Wi-Fi 7 access point achieves 46 Gbps theoretical — a 5,000× improvement in 22 years. Each Wi-Fi generation introduced a fundamentally new technique: MIMO, beamforming, OFDMA, multi-link operation. The physics never changed — the engineering did.
      </StoryBox>

      <H2>Evolution of Wi-Fi Standards</H2>

      <Para>
        The IEEE 802.11 family has grown from the original 1997 standard through numerous amendments. The Wi-Fi Alliance introduced marketing names (Wi-Fi 4, Wi-Fi 5, etc.) in 2018 to simplify what had become a confusing alphabet soup of 802.11a/b/g/n/ac/ax.
      </Para>

      <WifiStandardsExplorer />

      <H2>Key Technical Innovations by Generation</H2>

      <H3>OFDM (Orthogonal Frequency Division Multiplexing)</H3>

      <Para>
        Introduced in 802.11a/g, <Accent>OFDM</Accent> splits the channel into multiple orthogonal subcarriers, each carrying a portion of the data. This dramatically reduces intersymbol interference caused by multipath — shorter symbols on each subcarrier are less affected by multipath delay spreads. Each 20 MHz channel is divided into 64 subcarriers (52 data, 4 pilots, 8 null). 802.11ax (Wi-Fi 6) increased to 256 subcarriers per 20 MHz channel, enabling finer-grained resource allocation.
      </Para>

      <H3>MIMO — Multiple Input, Multiple Output</H3>

      <Para>
        <Accent>MIMO</Accent> uses multiple antennas at both transmitter and receiver to simultaneously transmit independent data streams (spatial multiplexing) or combine signals for improved range (diversity). An 802.11n 4×4 MIMO AP transmits up to 4 simultaneous streams, multiplying throughput by 4× compared to single-stream. The number of achievable spatial streams is limited by the smaller of the transmit and receive antenna counts.
      </Para>

      <H3>MU-MIMO — Multi-User MIMO</H3>

      <Para>
        <Accent>SU-MIMO</Accent> (single-user) transmits all streams to one device. <Accent>MU-MIMO</Accent> (multi-user) transmits different streams simultaneously to different clients. Wi-Fi 5 Wave 2 introduced downlink MU-MIMO (AP transmits to multiple clients simultaneously). Wi-Fi 6 added uplink MU-MIMO (multiple clients transmit to AP simultaneously). An 8×8 MU-MIMO AP can serve up to 8 clients simultaneously per frequency — critical for high-density deployments.
      </Para>

      <H3>OFDMA — Orthogonal Frequency Division Multiple Access</H3>

      <Para>
        Wi-Fi 6's biggest innovation. Classic Wi-Fi allocates the entire channel width to one client per transmission. <Accent>OFDMA</Accent> divides the channel into smaller <Accent>Resource Units (RUs)</Accent> and assigns different RUs to different clients simultaneously. A 20 MHz channel can be divided into up to 9 RUs for small IoT-type frames. This is transformative for dense environments: instead of 50 clients queuing for their turn, multiple clients transmit simultaneously in different frequency sub-channels.
      </Para>

      <Para>
        The efficiency gain is dramatic. In a 100-device wireless classroom, classic Wi-Fi has clients queuing for 50+ milliseconds per transmission. With OFDMA, multiple clients transmit in parallel, reducing latency by 75% and improving capacity significantly.
      </Para>

      <H3>Wi-Fi 7: Multi-Link Operation (MLO)</H3>

      <Para>
        <Accent>MLO</Accent> is Wi-Fi 7's flagship feature. Instead of a device operating on one band at a time (as with Wi-Fi 6E's band steering), MLO allows a single logical connection to simultaneously use two or three links (e.g., 2.4 GHz + 5 GHz + 6 GHz). The MAC layer aggregates the bandwidth of all active links, and the protocol can dynamically shift traffic between links based on congestion. This provides both higher throughput and better reliability — if one link is congested, traffic automatically shifts to another.
      </Para>

      <Divider />

      {/* ── Chapter 3 ── */}
      <Chapter n={3} title="Frequency Bands and Channel Planning" />

      <StoryBox>
        A university deploys 500 access points across a campus. The RF engineer spent three months doing a site survey, modeling signal coverage, and planning channel assignments. On the first day of class, 1,500 students arrive simultaneously and the network grinds to a halt. The problem: channel interference. APs 50 meters apart were assigned channels 1 and 6 in 2.4 GHz, but the building's concrete walls absorbed the signal so poorly that APs 150 meters away were still interfering with each other. The engineer had to re-plan the entire deployment, reducing 2.4 GHz AP density and relying more heavily on 5 GHz. Wi-Fi 6E's 6 GHz band with its 59 clean channels would have solved this problem entirely.
      </StoryBox>

      <H2>The 2.4 GHz Band</H2>

      <Para>
        The 2.4 GHz band spans 2.400–2.4835 GHz, providing 83.5 MHz of total spectrum. In the US, channels 1–11 are available; in Europe, channels 1–13; in Japan, channels 1–14. Each 20 MHz channel is spaced 5 MHz apart, meaning adjacent channels overlap significantly.
      </Para>

      <Para>
        Only <Accent>channels 1, 6, and 11</Accent> are non-overlapping in a 20 MHz configuration. All other channels overlap with at least one of these three. In practice, this means a 2.4 GHz deployment has a maximum of 3 non-interfering channels — regardless of how many APs are deployed. This is the fundamental scalability limitation of 2.4 GHz for high-density environments.
      </Para>

      <H2>The 5 GHz Band</H2>

      <Para>
        The 5 GHz band (5.150–5.850 GHz in the US) provides 25 non-overlapping 20 MHz channels — dramatically better than 2.4 GHz's 3 channels. Channels are organized into UNII (Unlicensed National Information Infrastructure) sub-bands:
      </Para>

      <Para>
        <Accent>UNII-1 (36–48):</Accent> Indoor-only, no DFS required. Best for dense deployments.
      </Para>

      <Para>
        <Accent>UNII-2A (52–64) and UNII-2C (100–144):</Accent> Require <Accent>DFS (Dynamic Frequency Selection)</Accent> — the AP must scan for radar signals (weather radar, military) before using and must vacate the channel within 10 seconds if radar is detected. DFS adds up to 60-second channel startup delay and occasional forced channel changes.
      </Para>

      <Para>
        <Accent>UNII-3 (149–165):</Accent> No DFS, no power limits beyond standard. Preferred for high-throughput outdoor links.
      </Para>

      <H2>The 6 GHz Band (Wi-Fi 6E/7)</H2>

      <Para>
        The 6 GHz band (5.925–7.125 GHz) opened in the US in 2020 by FCC ruling provides 1.2 GHz of new spectrum — more than the 2.4 GHz and 5 GHz bands combined. It offers <Accent>59 non-overlapping 20 MHz channels</Accent> (7 at 160 MHz width, 14 at 80 MHz, 29 at 40 MHz). Crucially, the 6 GHz band has essentially no legacy devices — no 2.4 GHz or 5 GHz devices can use it, so there is no legacy interference. This creates a clean, high-capacity band perfect for Wi-Fi 6E and Wi-Fi 7 deployments.
      </Para>

      <ChannelPlanningTool />

      <H2>Channel Width Trade-offs</H2>

      <Para>
        Wider channels provide higher throughput per connection by fitting more OFDM subcarriers. A 160 MHz channel carries 8× as many subcarriers as a 20 MHz channel. But wider channels reduce the number of non-overlapping channels available, increasing the chance of co-channel interference from neighboring APs. The optimal channel width depends on environment density.
      </Para>

      <Para>
        In high-density environments (stadium, conference hall): use 20 MHz channels to maximize the number of non-overlapping channels and minimize co-channel interference. In low-density environments (warehouse, home): use 80–160 MHz to maximize per-client throughput.
      </Para>

      <Divider />

      {/* ── Chapter 4 ── */}
      <Chapter n={4} title="Wi-Fi Architecture: BSS, ESS, and Controllers" />

      <H2>Basic Service Set (BSS)</H2>

      <Para>
        A <Accent>BSS (Basic Service Set)</Accent> is the fundamental Wi-Fi cell — one AP and the clients associated to it. The AP transmits management frames (Beacons, Probe Responses) advertising the SSID and capabilities. The <Accent>BSSID</Accent> (BSS Identifier) is the AP's MAC address, uniquely identifying the BSS. An <Accent>IBSS (Independent BSS)</Accent> is an ad-hoc network with no AP — devices communicate directly peer-to-peer.
      </Para>

      <H2>Extended Service Set (ESS)</H2>

      <Para>
        An <Accent>ESS (Extended Service Set)</Accent> is multiple BSSs sharing the same SSID connected via a distribution system (typically wired Ethernet). Clients see a single network name (SSID) but can roam between APs seamlessly. The distribution system handles MAC frame forwarding between APs and to the upstream network.
      </Para>

      <H2>Autonomous vs. Controller-Based Architecture</H2>

      <Para>
        <Accent>Autonomous APs</Accent> are self-contained — each AP manages its own RF settings, client associations, QoS policies, and VLAN configuration independently. Managing hundreds of autonomous APs requires SSHing into each one individually. Changes are error-prone and time-consuming.
      </Para>

      <Para>
        <Accent>Controller-based (Lightweight) APs</Accent> offload management intelligence to a central <Accent>Wireless LAN Controller (WLC)</Accent>. The lightweight AP (LWAP) uses the CAPWAP (Control and Provisioning of Wireless Access Points) protocol to tunnel all management and sometimes data traffic to the WLC. Configuration changes are made once on the WLC and pushed to all APs. The WLC also performs RF management (automatic channel selection, power adjustment), client load balancing, and seamless Layer 2/3 roaming.
      </Para>

      <H2>Cloud-Managed Wi-Fi</H2>

      <Para>
        Cisco Meraki, Aruba Central, and similar solutions use cloud-based controllers. The AP establishes a secure tunnel to the cloud controller for management traffic, while data plane traffic (client internet access) is forwarded locally. This simplifies management for distributed deployments (retail chains, branch offices) without requiring on-premises controllers, but creates a cloud dependency for management functions.
      </Para>

      <H2>Wi-Fi Roaming: 802.11r, 802.11k, 802.11v</H2>

      <Para>
        When a client moves between APs in an ESS, it needs to <Accent>roam</Accent> — disconnect from the current AP and reassociate to a better one. Standard roaming requires full re-authentication (which can take 500ms–2s for 802.1X/RADIUS), causing noticeable interruption for voice and video.
      </Para>

      <Para>
        <Accent>802.11r (Fast BSS Transition)</Accent> caches key material to speed re-authentication to under 50ms. <Accent>802.11k (Radio Resource Management)</Accent> lets APs provide clients with neighbor lists — clients can pre-scan candidate APs before roaming instead of scanning all channels. <Accent>802.11v (BSS Transition Management)</Accent> allows APs to suggest roaming targets to clients (steering clients away from overloaded APs). Together, these three standards are often called "Fast, Safe Roaming" (FSR).
      </Para>

      <Divider />

      {/* ── Chapter 5 ── */}
      <Chapter n={5} title="802.11 Frame Types and the Association Process" />

      <Para>
        Wi-Fi frames are divided into three types: <Accent>Management frames</Accent> (connection establishment and maintenance), <Accent>Control frames</Accent> (medium access control), and <Accent>Data frames</Accent> (payload).
      </Para>

      <H2>The Association Process</H2>

      <Para>
        <Accent>1. Beacons:</Accent> The AP broadcasts beacon frames every 102.4 ms (default) advertising the SSID, BSSID, supported rates, capabilities (HT/VHT/HE), and security parameters. Passive scanning: clients listen for beacons.
      </Para>

      <Para>
        <Accent>2. Probe Request/Response:</Accent> Active scanning: the client sends a Probe Request (with SSID or wildcard). APs respond with Probe Responses containing their capabilities. This is faster than waiting for beacons but generates RF traffic.
      </Para>

      <Para>
        <Accent>3. Authentication:</Accent> The client sends an Authentication Request to the selected AP. For Open System authentication (precursor to WPA2/3), the AP responds with Authentication Response (success). This step is almost vestigial in modern WPA2/3 — actual authentication happens during association.
      </Para>

      <Para>
        <Accent>4. Association Request/Response:</Accent> The client requests association, advertising its capabilities (supported rates, MIMO streams, HT/VHT/HE capabilities). The AP assigns an Association ID (AID) and responds with the final negotiated parameters.
      </Para>

      <Para>
        <Accent>5. 4-Way Handshake (WPA2/3):</Accent> After association, WPA2 performs a 4-way handshake to establish the Per-Station Key (PTK) for encrypting unicast traffic and derive the Group Temporal Key (GTK) for broadcast/multicast traffic. The 4-way handshake uses the PMK (Pairwise Master Key) derived from the PSK or EAP authentication.
      </Para>

      <H2>Management Frame Protection (802.11w)</H2>

      <Para>
        Management frames (Beacons, Probe Responses, Disassociation, Deauthentication) were historically unencrypted and unauthenticated in Wi-Fi. An attacker could send spoofed Deauthentication frames to disconnect any client from an AP — this is the basis of Wi-Fi deauthentication attacks used in WPA2-handshake-capture exploits.
      </Para>

      <Para>
        <Accent>802.11w (Management Frame Protection, MFP)</Accent> adds cryptographic protection to management frames. WPA3 mandates 802.11w — spoofed deauthentication attacks are no longer possible against WPA3-only networks.
      </Para>

      <Divider />

      {/* ── Chapter 6 ── */}
      <Chapter n={6} title="Wireless Security" />

      <StoryBox>
        In 2007, a researcher at DefCon demonstrated cracking a WEP key in under 3 minutes using a standard laptop. WEP (Wired Equivalent Privacy) used RC4 encryption with static keys and had a catastrophically flawed IV (Initialization Vector) reuse vulnerability. Networks believed to be secure for years were trivially compromised. This drove the rapid adoption of WPA2 (2004) and eventually WPA3 (2018). Today, WEP is completely broken and should be considered equivalent to no encryption at all.
      </StoryBox>

      <H2>WEP: Completely Broken</H2>

      <Para>
        <Accent>WEP (Wired Equivalent Privacy)</Accent> used 40-bit or 104-bit RC4 with a static PSK. The 24-bit IV was too short — after ~5,000 frames, IVs begin to repeat, allowing passive traffic analysis to recover the key. The FMS attack (2001) and subsequent tools like Aircrack-ng reduced WEP cracking to minutes on a consumer laptop. WEP was deprecated by IEEE in 2004. If you see a WEP network, assume it is entirely compromised.
      </Para>

      <H2>WPA/WPA2: The Era of AES</H2>

      <Para>
        <Accent>WPA (Wi-Fi Protected Access)</Accent> was a 2003 emergency fix using TKIP (Temporal Key Integrity Protocol) over RC4 — designed to run on existing WEP hardware. TKIP added per-packet key mixing and a message integrity check (MIC), addressing WEP's IV reuse flaw. WPA2 (802.11i, 2004) replaced TKIP with <Accent>AES-CCMP</Accent> — 128-bit AES in Counter Mode with CBC-MAC (CCMP). This is fundamentally secure encryption.
      </Para>

      <Para>
        WPA2 remains secure against brute force if a strong passphrase is used, but WPA2-Personal (PSK) is vulnerable to offline dictionary attacks: an attacker who captures the 4-way handshake can attempt to brute force the PSK offline at billions of guesses per second using GPU cracking tools.
      </Para>

      <H2>WPA3: Closing the Gaps</H2>

      <Para>
        <Accent>WPA3-Personal</Accent> replaces PSK with <Accent>SAE (Simultaneous Authentication of Equals)</Accent>, based on the Dragonfly key exchange (a variant of Diffie-Hellman). SAE requires interactive computation with the AP for each authentication attempt — offline brute-force attacks are impossible. SAE also provides <Accent>forward secrecy</Accent>: past session keys cannot be compromised even if the passphrase is later discovered.
      </Para>

      <Para>
        <Accent>WPA3-Enterprise</Accent> adds optional 192-bit security mode (GCMP-256 encryption, HMAC-SHA-384 authentication, ECDH/ECDSA-384 key exchange). This meets NSA Suite B requirements for protecting classified data.
      </Para>

      <WifiSecurityComparator />

      <H2>802.1X / EAP for Enterprise Wi-Fi</H2>

      <Para>
        <Accent>802.1X</Accent> provides port-based network access control. When a client connects to an 802.1X-enabled network, the AP (authenticator) blocks all traffic except EAP authentication messages until the RADIUS server (authentication server) grants access. The client (supplicant) authenticates using an EAP method:
      </Para>

      <Para>
        <Accent>EAP-TLS</Accent>: mutual certificate authentication — both client and server present X.509 certificates. Most secure, requires client certificate infrastructure (PKI). Zero reliance on passwords.
      </Para>

      <Para>
        <Accent>PEAP (Protected EAP)</Accent>: creates a TLS tunnel to the server (server certificate only), then authenticates the user inside the tunnel with MSCHAPv2 (username/password). Most common in enterprise deployments — integrates with Active Directory.
      </Para>

      <Para>
        <Accent>EAP-TTLS</Accent>: similar to PEAP but more flexible inner authentication methods. Supports MSCHAPv2, PAP, CHAP.
      </Para>

      <Divider />

      {/* ── Chapter 7 ── */}
      <Chapter n={7} title="High-Density Wi-Fi Design" />

      <StoryBox>
        Super Bowl LIII at Mercedes-Benz Stadium, Atlanta, 2019: 70,763 fans, all wanting to share the moment on Instagram simultaneously. The stadium Wi-Fi team deployed 1,800 access points — nearly one per 40 fans. Channel planning used 20 MHz channels exclusively in 5 GHz to maximize non-overlapping channel count. Each AP was tuned to low transmit power (8–10 dBm) to prevent signals from bleeding into adjacent sections. The result: peak aggregate throughput of 15 Gbps. Each fan averaged 200 Mbps of available capacity. This is high-density Wi-Fi design at its most extreme.
      </StoryBox>

      <H2>High-Density Design Principles</H2>

      <Para>
        <Accent>1. More APs, lower power:</Accent> In high-density deployments, use more APs at lower transmit power rather than fewer APs at higher power. This creates smaller cells with better signal-to-interference ratio, reduces the client-to-AP ratio, and allows more aggressive channel reuse.
      </Para>

      <Para>
        <Accent>2. 5 GHz preferred, 2.4 GHz minimized:</Accent> Disable 2.4 GHz or use it only for coverage extension (IoT devices, wearables). The 3-channel limitation of 2.4 GHz makes it useless for high-density — adjacent APs will always co-channel interfere.
      </Para>

      <Para>
        <Accent>3. Narrow channel widths:</Accent> Use 20 MHz channels in dense environments. 80 MHz channels in a stadium would reduce available non-overlapping channels from 25 to ~5, causing severe interference.
      </Para>

      <Para>
        <Accent>4. Band steering and load balancing:</Accent> Configure APs to steer capable clients to 5 GHz or 6 GHz and distribute clients across APs. An AP with 100 clients performs far worse than 10 APs with 10 clients each.
      </Para>

      <Para>
        <Accent>5. Disable low data rates:</Accent> Slow clients transmit slower (lower modulation rate), occupying the channel longer and reducing throughput for all clients on that AP. Disabling rates below 12 or 24 Mbps forces clients to either connect at higher rates or not connect at all — improving aggregate performance.
      </Para>

      <H2>RF Survey and Planning</H2>

      <Para>
        A <Accent>site survey</Accent> involves physically walking the coverage area with a laptop running RF survey software (Ekahau, AirMagnet) to measure signal levels, interference, and channel utilization. Predictive RF planning uses building blueprints and material RF attenuation models to plan AP placement before deployment, validated with a post-deployment validation survey.
      </Para>

      <Divider />

      {/* ── Chapter 8 ── */}
      <Chapter n={8} title="Wi-Fi Troubleshooting" />

      <H2>The Five Most Common Wi-Fi Issues</H2>

      <Para>
        <Accent>1. Co-channel interference.</Accent> Symptom: good signal strength but poor throughput, high retry rates. Diagnosis: use <Code>iwlist scan</Code> (Linux) or Wireless Diagnostics (macOS) to identify APs on the same channel in range. Fix: re-plan channel assignments to maximize separation between co-channel APs. Use Ekahau or similar for systematic planning.
      </Para>

      <Para>
        <Accent>2. Poor roaming.</Accent> Symptom: connectivity drops when moving between areas, voice calls break. Client clings to a distant AP with -75 dBm signal when a nearby AP at -55 dBm is available. Fix: enable 802.11r/k/v for fast roaming; adjust AP transmit power so the client has less reason to hold onto a distant AP; configure BSS Transition Management to suggest better APs.
      </Para>

      <Para>
        <Accent>3. Authentication failures.</Accent> Symptom: client repeatedly associates but can't complete authentication. Check: RADIUS server logs (for 802.1X), PSK mismatch (for WPA2-Personal), certificate expiry (for EAP-TLS), RADIUS shared secret mismatch between AP and server.
      </Para>

      <Para>
        <Accent>4. Hidden SSID misconception.</Accent> Hiding the SSID does not provide security — clients still send Probe Requests advertising the hidden SSID name when roaming, revealing it. It only breaks legitimate client connectivity (clients can't discover the network automatically) while providing zero additional security.
      </Para>

      <Para>
        <Accent>5. Slow legacy devices.</Accent> A single 802.11b/g device associating to a modern AP forces the AP to periodically send protection frames (CTS-to-self or RTS/CTS), reducing throughput for all other clients. Disabling 802.11b/g support on the AP (requiring 802.11n minimum) eliminates this penalty.
      </Para>

      <H2>Key Diagnostic Tools</H2>

      <CodeBlock>
{`# macOS — wireless diagnostics from menu bar
# Hold Option key + click Wi-Fi icon → Open Wireless Diagnostics

# Linux — scan nearby networks and see signal/channel
iwlist wlan0 scan | grep -E "ESSID|Channel|Signal"

# Linux — monitor mode capture for frame analysis
iw dev wlan0 set monitor none
tcpdump -i wlan0 -w wifi-capture.pcap

# macOS — show current association details
/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I

# Show Wi-Fi stats on Linux
iw dev wlan0 station dump

# Check for 802.11 retransmissions (high = interference/poor signal)
iw dev wlan0 station dump | grep retry`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 9 ── */}
      <Chapter n={9} title="Wi-Fi 6E and Wi-Fi 7 Deep Dive" />

      <H2>Wi-Fi 6E: The 6 GHz Revolution</H2>

      <Para>
        The 6 GHz band's regulatory opening was arguably the most significant spectrum policy decision of the decade. The United States (2020), UK (2021), Brazil, Saudi Arabia, and over 65 countries have opened 6 GHz for unlicensed Wi-Fi use. The impact:
      </Para>

      <Para>
        <Accent>59 non-overlapping 20 MHz channels</Accent> (vs. 3 in 2.4 GHz and 25 in 5 GHz). <Accent>7 non-overlapping 160 MHz channels</Accent> — enabling peak Wi-Fi 6E speeds in deployments where no adjacent channel conflict exists. No legacy interference — the 6 GHz band is exclusive to Wi-Fi 6E/7 capable devices. No DFS requirement in the US Low Power Indoor (LPI) category.
      </Para>

      <Para>
        The 6 GHz band has higher atmospheric attenuation than 5 GHz — signals don't travel as far through walls, which is actually beneficial for high-density deployments (smaller cells, less interference between floors and sections).
      </Para>

      <H2>Wi-Fi 7: 46 Gbps Theoretical Peak</H2>

      <Para>
        <Accent>802.11be</Accent> achieves its headline 46 Gbps through several compounding improvements: <Accent>4096-QAM</Accent> (vs. 1024-QAM in Wi-Fi 6) encodes 12 bits per symbol (vs. 10), a 20% increase per stream. <Accent>320 MHz channel width</Accent> (vs. 160 MHz max in Wi-Fi 6) — available in the 6 GHz band which has sufficient contiguous spectrum. <Accent>16×16 MU-MIMO</Accent> (vs. 8×8) doubles the maximum simultaneous spatial streams. <Accent>Multi-Link Operation (MLO)</Accent> aggregates multiple bands simultaneously.
      </Para>

      <WowBox>
        Wi-Fi 7's 46 Gbps theoretical maximum requires: 16-stream MU-MIMO (an AP with 16 antennas serving 16 clients simultaneously), 320 MHz channel width, 4096-QAM (requires excellent SNR — the device needs to be essentially in the same room as the AP), and perfect channel conditions. Real-world single-client throughput with Wi-Fi 7 in good conditions: 2–5 Gbps. Still extraordinary — faster than most enterprise wired switch uplinks just a decade ago.
      </WowBox>

      <Divider />

      {/* ── Chapter 10 ── */}
      <Chapter n={10} title="Wi-Fi in IoT and Industrial Environments" />

      <Para>
        Wi-Fi is increasingly deployed in environments far removed from the corporate office: factory floors, hospitals, warehouses, and outdoor campuses. These environments introduce challenges that consumer-grade Wi-Fi design doesn't account for.
      </Para>

      <H2>Industrial Wi-Fi Considerations</H2>

      <Para>
        <Accent>RF interference:</Accent> Industrial environments often have motors, arc welding, variable frequency drives, and metallic equipment that generate significant RF noise. The 2.4 GHz band is particularly susceptible. 5 GHz and 6 GHz bands with their shorter range are less affected by distant interference sources.
      </Para>

      <Para>
        <Accent>Metal and reflections:</Accent> Dense metal structures (server racks, machinery) create complex multipath environments. MIMO systems that exploit multipath can actually perform better in these environments than in open spaces, but unpredictable dead zones can occur.
      </Para>

      <Para>
        <Accent>Real-time requirements:</Accent> Automated guided vehicles (AGVs), robotic systems, and safety-critical wireless controls require deterministic, low-latency Wi-Fi. 802.11ax (Wi-Fi 6) with OFDMA reduces latency in congested environments. TSN (Time-Sensitive Networking) profiles for Wi-Fi are being standardized for industrial control applications.
      </Para>

      <H2>Wi-Fi 6 for IoT: Target Wake Time (TWT)</H2>

      <Para>
        <Accent>TWT (Target Wake Time)</Accent> is a Wi-Fi 6 feature designed for battery-powered IoT devices. The AP negotiates wake schedules with each IoT device — the device sleeps (radio off) until its scheduled wake time, transmits its data, and returns to sleep. This enables IoT devices to achieve months of battery life on small batteries while still maintaining Wi-Fi connectivity. A smart sensor might transmit once every 30 seconds, spending 99.9% of the time in deep sleep.
      </Para>

      <Divider />

      {/* ── Chapter 11 ── */}
      <Chapter n={11} title="Configuration Reference" />

      <H2>Enterprise AP Configuration (Cisco WLC)</H2>

      <CodeBlock>
{`# Cisco WLC CLI — WLAN configuration
(Cisco Controller) > config wlan create 1 CorpWiFi CorpWiFi
(Cisco Controller) > config wlan security wpa enable 1
(Cisco Controller) > config wlan security wpa akm 802.1x enable 1
(Cisco Controller) > config wlan radius_server auth add 1 192.168.99.10 1812 shared_secret
(Cisco Controller) > config wlan band-select enable 1
(Cisco Controller) > config wlan enable 1

# RF management — automatic channel and power
(Cisco Controller) > config 802.11a channel global auto
(Cisco Controller) > config 802.11a txpower global auto

# Guest WLAN with captive portal
(Cisco Controller) > config wlan create 2 GuestWiFi GuestWiFi
(Cisco Controller) > config wlan security web-auth enable 2
(Cisco Controller) > config wlan interface 2 guest-vlan-interface`}
      </CodeBlock>

      <H2>Linux hostapd — Software Access Point</H2>

      <CodeBlock>
{`# /etc/hostapd/hostapd.conf — WPA3-Personal (SAE)
interface=wlan0
driver=nl80211
ssid=MyNetwork
hw_mode=a
channel=36
ieee80211n=1
ieee80211ac=1
ieee80211ax=1

# WPA3 SAE
wpa=2
wpa_key_mgmt=SAE
rsn_pairwise=CCMP
sae_password=StrongPassphrase
ieee80211w=2      # MFP required (mandatory for WPA3)

# Enable WPA3-Enterprise (802.1X)
# auth_algs=1
# wpa_key_mgmt=WPA-EAP
# eap_server=0
# auth_server_addr=192.168.1.10
# auth_server_port=1812
# auth_server_shared_secret=radius_secret`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 12 ── */}
      <Chapter n={12} title="Wi-Fi Performance Optimization" />

      <H2>Modulation and Coding Scheme (MCS)</H2>

      <Para>
        Wi-Fi adapts its data rate based on signal quality using <Accent>MCS (Modulation and Coding Scheme)</Accent> indices. Wi-Fi 6 supports MCS 0–11. Higher MCS = higher modulation order + less error correction. MCS 11 (1024-QAM, 5/6 coding rate) requires very high SNR ({'>'}35 dB). MCS 0 (BPSK, 1/2 coding rate) works down to -82 dBm signal. The AP and client negotiate the highest MCS both can support given current signal conditions — this negotiation happens continuously.
      </Para>

      <Para>
        When you see Wi-Fi advertised at "up to 9.6 Gbps," that is the highest MCS (11) with all streams active. In practice, most clients are at MCS 7–9 due to realistic signal conditions and fewer than the maximum antenna count.
      </Para>

      <H2>Airtime Fairness</H2>

      <Para>
        Without Airtime Fairness, a slow client (802.11g at 24 Mbps) associated to a modern AP degrades performance for all other clients. Since the slow client takes much longer to transmit the same amount of data, it occupies the channel disproportionately. <Accent>Airtime Fairness</Accent> allocates equal <em>airtime</em> (not equal bandwidth) to each client. A fast client gets the same time slot as a slow client — but delivers far more data in that time. This prevents legacy clients from monopolizing the medium.
      </Para>

      <Divider />

      {/* ── Chapter 13 ── */}
      <Chapter n={13} title="Common Misconceptions" />

      <Err title="More signal strength = better performance">
        Signal strength (RSSI) is necessary but not sufficient for good Wi-Fi performance. What matters is Signal-to-Noise Ratio (SNR) — if both signal and interference are high, the high RSSI doesn't help. A -65 dBm signal with -80 dBm noise floor (15 dB SNR) performs worse than -72 dBm signal with -95 dBm noise floor (23 dB SNR). Always check SNR, not just RSSI. High signal with poor SNR (lots of interference) causes high retry rates and low throughput.
      </Err>

      <Err title="Hiding your SSID improves security">
        A hidden SSID is not a security feature. Clients that have previously connected send Probe Requests advertising the hidden SSID name — any passive observer with a Wi-Fi adapter in monitor mode can see your "hidden" SSID. SSID hiding only breaks legitimate connectivity (devices have trouble auto-connecting) without providing meaningful security. Use WPA3 and strong passwords instead.
      </Err>

      <Err title="5 GHz is always better than 2.4 GHz">
        5 GHz provides more channels and less interference in dense environments, but has shorter range — it attenuates more through walls and distance. A device far from the AP at -80 dBm on 5 GHz may perform better on 2.4 GHz at -65 dBm with 15 more dB of SNR. Band steering algorithms should consider both signal strength and interference, not just band preference. The 2.4 GHz band remains valuable for range coverage and IoT devices.
      </Err>

      <Err title="Wi-Fi is half-duplex, so MU-MIMO doesn't help">
        Wi-Fi is half-duplex per frequency channel, but MU-MIMO allows simultaneous transmissions to multiple clients on different spatial streams — all at the same time, on the same channel. These spatial streams are orthogonal (using beamforming to direct energy toward specific clients), so they don't interfere. MU-MIMO effectively multiplies the channel's capacity by the number of simultaneous streams. This is different from traditional half-duplex — it's spatial division multiplexing within the half-duplex medium.
      </Err>

      <Err title="WPA2-Personal with a strong password is enterprise-grade security">
        WPA2-Personal (PSK) has a fundamental flaw beyond password strength: all devices share the same key. An attacker who captures the 4-way handshake can attempt offline cracking. More importantly, if any device in the network is compromised (employee's laptop stolen), the entire network's traffic can potentially be decrypted. WPA2-Enterprise (802.1X) gives each device a unique session key — even with access to one compromised device's credentials, other sessions remain secure. Enterprise wireless requires enterprise authentication.
      </Err>

      <Err title="Wi-Fi 6 is always faster than Wi-Fi 5">
        Wi-Fi 6 (802.11ax) is optimized for high-density and efficiency, not raw single-client speed. A Wi-Fi 5 (802.11ac) AP may actually deliver higher single-client throughput in a low-density environment because Wi-Fi 5 uses 8 spatial streams at 80/160 MHz vs. Wi-Fi 6's OFDMA overhead. Wi-Fi 6's real advantage emerges in dense environments with many clients — OFDMA and improved scheduling dramatically improve overall network capacity, but a single isolated client may not see speed improvements over Wi-Fi 5.
      </Err>

      <Divider />

      {/* ── Chapter 14 ── */}
      <Chapter n={14} title="Interview Questions" />

      <IQ q="What is CSMA/CA and why does Wi-Fi use it instead of CSMA/CD?" level="Beginner">
        CSMA/CD (Collision Detection) works when a device can simultaneously transmit and receive on the same medium — it sends a signal, detects a collision (if both signals are present simultaneously), and retransmits. Wi-Fi cannot use CD because wireless devices cannot transmit and receive at the same time on the same frequency (they would hear their own transmission, masking any collision). Instead, Wi-Fi uses CSMA/CA (Collision Avoidance): listen before transmitting (carrier sense), wait if busy, use a random backoff if the medium is idle after DIFS, and use ACKs to confirm successful receipt. CA avoids collisions by randomizing transmission timing rather than detecting them after the fact.
      </IQ>

      <IQ q="What are the only non-overlapping channels in the 2.4 GHz band?" level="Beginner">
        In the 2.4 GHz band, only channels 1, 6, and 11 are non-overlapping (in the US/Canada). Each 20 MHz channel is spaced 5 MHz apart, but a 20 MHz channel requires 25 MHz to avoid overlap (channel center ± 11 MHz). Channels 1 (2412 MHz) and 6 (2437 MHz) are 25 MHz apart — just barely non-overlapping. Channels 6 and 11 similarly. Any other channel selection results in partial overlap with adjacent channels, causing co-channel interference. This means a 2.4 GHz wireless deployment can only have a maximum of 3 non-interfering cells regardless of density — a fundamental scalability limitation.
      </IQ>

      <IQ q="Explain OFDMA in Wi-Fi 6 and why it improves dense network performance." level="Intermediate">
        In Wi-Fi 4/5, the entire channel is allocated to one client per transmission slot — all other clients wait. In Wi-Fi 6's OFDMA, the channel is divided into Resource Units (RUs). The AP allocates different RUs to different clients simultaneously, within a single OFDM symbol period. A 20 MHz channel can be divided into 9 RUs, each serving a different client. This is transformative for dense networks: instead of 50 clients in a classroom each waiting for their turn (introducing 50-slot queue delay), multiple clients transmit simultaneously in different sub-channels. Latency drops significantly (each client waits for a much smaller fraction of the TXOP), overhead is reduced (single scheduling frame for multiple clients), and airtime efficiency improves because small IoT packets don't waste an entire channel time slot on a single device.
      </IQ>

      <IQ q="What makes WPA3-SAE more secure than WPA2-PSK against password attacks?" level="Intermediate">
        WPA2-PSK uses a pre-shared key to derive the PMK directly (PMK = PBKDF2(HMAC-SHA1, PSK, SSID, 4096, 256)). An attacker who captures the 4-way handshake can attempt offline brute force — testing billions of PSK candidates per second on a GPU without interacting with the AP. WPA3-SAE (Simultaneous Authentication of Equals) uses the Dragonfly key exchange (based on Diffie-Hellman over an elliptic curve with a password element). The critical property: each SAE authentication attempt requires a network round-trip to the AP — offline brute force is impossible because you must interact with the AP for each guess. Additionally, SAE provides forward secrecy: the session key is independent of the password, so discovering the password later cannot decrypt past captured traffic.
      </IQ>

      <IQ q="A high-density Wi-Fi deployment at a convention center is showing poor throughput despite strong signal strength. How would you diagnose and remediate?" level="Senior">
        Methodology: (1) Check co-channel interference: use Ekahau or site survey tools to identify which channels adjacent APs are on. In 2.4 GHz, any adjacent AP uses one of only 3 channels. If APs in the same area are on the same channel, co-channel interference causes CSMA/CA backoff storms — devices take turns in increasingly small transmission windows. (2) Check client density: an AP with 80+ associated clients will have poor per-client performance regardless of signal quality. Look at client load distribution. (3) Check channel width: 80 or 160 MHz channels in a dense environment reduce available non-overlapping channels, increasing interference. Switch to 20 MHz channels. (4) Check data rate floor: if 1, 2, 5.5 Mbps legacy rates are enabled, slow legacy clients (or even retransmissions at low MCS) consume disproportionate airtime. Disable all rates below 12 Mbps. (5) Check 2.4 GHz interference: disable 2.4 GHz SSIDs or reduce 2.4 GHz AP density. Remediation: increase AP density with lower transmit power per AP, enforce 5/6 GHz only, use 20 MHz channels, enable Airtime Fairness, configure band steering with minimum RSSI thresholds, implement load balancing between APs.
      </IQ>

      <IQ q="Explain Multi-Link Operation (MLO) in Wi-Fi 7 and its implications for latency-sensitive applications." level="PhD">
        Multi-Link Operation (MLO, defined in IEEE 802.11be) allows a logical association to simultaneously operate across multiple independent radio links — potentially on 2.4 GHz, 5 GHz, and 6 GHz simultaneously. The MAC layer presents a single logical link to upper layers while the PHY uses multiple radios simultaneously. MLO has three operational modes: Simultaneous Transmit and Receive (STR): the AP and client transmit and receive on different links at the same time — enables true full-duplex-like behavior at the link layer. Asynchronous (ASYN): links can independently start/stop transmissions. Synchronous (EMSR): multiple links transmit the same frame for reliability in challenging environments. For latency-sensitive applications (voice, video, gaming, AR/VR), MLO provides critical benefits: if one link is congested or interference appears, the MAC scheduler immediately routes frames to the cleaner link, avoiding CSMA/CA backoff delay; the aggregate bandwidth across 3 bands provides enough headroom that queues rarely build up; link failure (DFS channel change, interference) doesn't drop the connection because other links continue. The RTT improvement stems from load distribution — with three active links, each link carries one-third the traffic, dramatically reducing collision probability and backoff time. Measured improvements show median RTT reductions of 50–60% compared to Wi-Fi 6E single-link in congested environments. The research challenge: implementing truly simultaneous STR requires careful RF isolation between the 2.4/5/6 GHz radios in a compact device to prevent self-interference.
      </IQ>

      <KeyTakeaways items={[
        'Wi-Fi is a shared half-duplex medium — CSMA/CA coordinates access by randomizing transmission timing to avoid (not detect) collisions.',
        'The 2.4 GHz band has only 3 non-overlapping channels (1, 6, 11) — fundamentally limiting high-density deployments. The 5 GHz band has 25 non-overlapping 20 MHz channels.',
        'Wi-Fi 6 (802.11ax) introduced OFDMA (sub-channel allocation per client) and TWT (battery-efficient IoT scheduling), dramatically improving dense network performance.',
        'Wi-Fi 6E adds the 6 GHz band with 59 non-overlapping 20 MHz channels and no legacy interference — the biggest Wi-Fi spectrum expansion in history.',
        'Wi-Fi 7 Multi-Link Operation (MLO) bonds multiple bands simultaneously for both higher throughput and lower latency, routing traffic to the least-congested link dynamically.',
        'WPA3-SAE replaces WPA2-PSK\'s offline-crackable handshake with an interactive Dragonfly key exchange, providing resistance to dictionary attacks and forward secrecy.',
        '802.1X/EAP enterprise Wi-Fi gives each user/device unique credentials and per-session keys — EAP-TLS (mutual certificates) is the most secure; PEAP (server cert + AD password) is most common.',
        'High-density Wi-Fi requires: 20 MHz channels, low AP transmit power, 5/6 GHz preferred, Airtime Fairness enabled, legacy rates disabled, and band steering to distribute load.',
        'Management Frame Protection (802.11w, mandatory in WPA3) prevents deauthentication attacks where attackers force clients off the network with spoofed frames.',
        'In high-density designs, SNR (Signal-to-Noise Ratio) matters more than RSSI — high signal strength with high interference produces worse performance than moderate signal with low noise.',
      ]} />
    </LearnLayout>
  )
}
