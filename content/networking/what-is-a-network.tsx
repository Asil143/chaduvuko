'use client'

import { useState, useEffect, useRef } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const G = '#10b981'
const FONT_MONO = 'var(--font-mono)'
const FONT_DISPLAY = 'var(--font-display)'

// ─── Layout helpers ───────────────────────────────────────────────────────────

const Chapter = ({ n, title, subtitle }: { n: string; title: string; subtitle?: string }) => (
  <div style={{ marginBottom: 36 }}>
    <p style={{ fontSize: 11, color: G, fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 8px', letterSpacing: '.12em', textTransform: 'uppercase' }}>
      Chapter {n}
    </p>
    <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: '0 0 10px' }}>
      {title}
    </h2>
    {subtitle && (
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, margin: 0, maxWidth: 620 }}>{subtitle}</p>
    )}
  </div>
)

const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '56px 0' }} />

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.95, margin: '0 0 20px' }}>{children}</p>
)

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', margin: '40px 0 14px', letterSpacing: '-0.5px' }}>{children}</h3>
)

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '28px 0 10px' }}>{children}</h4>
)

const Accent = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: G, fontWeight: 700 }}>{children}</strong>
)

const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{ fontSize: 13, background: `${G}15`, color: G, padding: '2px 7px', borderRadius: 5, fontFamily: FONT_MONO }}>{children}</code>
)

const CodeBlock = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div style={{ background: '#0d1117', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', margin: '24px 0' }}>
    {title && (
      <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', fontSize: 12, color: 'var(--muted)', fontFamily: FONT_MONO }}>
        {title}
      </div>
    )}
    <pre style={{ margin: 0, padding: '18px 20px', fontSize: 13, color: '#e2e8f0', lineHeight: 1.8, overflowX: 'auto', fontFamily: FONT_MONO }}>
      {children}
    </pre>
  </div>
)

// Story box — blue left border, real-world scenario
const StoryBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.2)', borderLeft: '4px solid #60a5fa', borderRadius: '0 12px 12px 0', padding: '18px 22px', margin: '28px 0' }}>
    <p style={{ fontSize: 11, color: '#60a5fa', fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Real-World Scenario</p>
    <div style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)

// Wow fact box — green, with emoji
const WowBox = ({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) => (
  <div style={{ background: `${G}08`, border: `1px solid ${G}25`, borderRadius: 12, padding: '18px 22px', margin: '28px 0' }}>
    <p style={{ fontSize: 13, fontWeight: 700, color: G, margin: '0 0 6px' }}>{emoji} {title}</p>
    <div style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

// Warning / common-mistake box
const Warn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: 12, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, color: '#fbbf24', fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>⚠ {title}</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

// Interview question with level badge
const IQ = ({ q, level, children }: { q: string; level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) => {
  const colors: Record<string, string> = {
    Beginner: '#34d399',
    Intermediate: '#60a5fa',
    Senior: '#a78bfa',
    PhD: '#f472b6',
  }
  const c = colors[level]
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: `${c}10`, border: `1px solid ${c}25`, borderRadius: '8px 8px 0 0', padding: '13px 18px' }}>
        <span style={{ fontSize: 10, fontWeight: 800, color: c, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.1em', background: `${c}20`, padding: '3px 8px', borderRadius: 5 }}>{level}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Q: {q}</span>
      </div>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>
        {children}
      </div>
    </div>
  )
}

// ─── Interactive Component 1: Home Network Diagram ────────────────────────────

function HomeNetworkDiagram() {
  const [selected, setSelected] = useState<string | null>(null)

  const devices = [
    { id: 'phone', label: 'Your Phone', emoji: '📱', x: 15, y: 10, ip: '192.168.1.101', mac: 'A4:C3:F0:11:22:33', role: 'End device — sends and receives data. Gets a private IP from your router. MAC address is burned into the hardware at the factory.' },
    { id: 'laptop', label: 'Laptop', emoji: '💻', x: 65, y: 10, ip: '192.168.1.102', mac: 'B8:E8:56:44:55:66', role: 'End device — same as your phone. Can also act as a server if you run software on it.' },
    { id: 'tv', label: 'Smart TV', emoji: '📺', x: 15, y: 60, ip: '192.168.1.110', mac: 'DC:A6:32:77:88:99', role: "End device — streams video by making HTTP requests to Netflix's servers. Uses the same router as your phone." },
    { id: 'router', label: 'Router + Modem', emoji: '📡', x: 40, y: 35, ip: 'LAN: 192.168.1.1 / WAN: 103.74.52.18', mac: 'Multiple', role: "The traffic cop of your home. Assigns private IPs to all your devices via DHCP, and uses NAT to let all of them share one public IP (103.74.52.18) when talking to the internet." },
    { id: 'internet', label: 'The Internet', emoji: '🌍', x: 65, y: 60, ip: 'Public IPs (millions)', mac: 'N/A', role: 'A massive global network of interconnected routers. Data hops through 10–30 of these routers between you and any website.' },
  ]

  const sel = devices.find(d => d.id === selected)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 4px' }}>Interactive — Home Network</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 20px' }}>Click any device to learn what it does and what its IP address means.</p>

      <div style={{ position: 'relative', height: 200, background: 'var(--bg)', borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden' }}>
        {/* Connection lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
          {[['phone','router'], ['laptop','router'], ['tv','router'], ['router','internet']].map(([a, b]) => {
            const da = devices.find(d => d.id === a)!
            const db = devices.find(d => d.id === b)!
            return (
              <line key={`${a}-${b}`}
                x1={da.x + 8} y1={da.y + 8}
                x2={db.x + 8} y2={db.y + 8}
                stroke={`${G}40`} strokeWidth="0.8" strokeDasharray="2 1"
              />
            )
          })}
        </svg>

        {/* Devices */}
        {devices.map(d => (
          <button
            key={d.id}
            onClick={() => setSelected(selected === d.id ? null : d.id)}
            style={{
              position: 'absolute',
              left: `${d.x}%`,
              top: `${d.y}%`,
              background: selected === d.id ? `${G}20` : 'var(--surface)',
              border: `2px solid ${selected === d.id ? G : 'var(--border)'}`,
              borderRadius: 12,
              padding: '8px 12px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.2s',
              minWidth: 80,
            }}
          >
            <div style={{ fontSize: 20 }}>{d.emoji}</div>
            <div style={{ fontSize: 11, color: 'var(--text)', fontWeight: 600, marginTop: 4 }}>{d.label}</div>
          </button>
        ))}
      </div>

      {sel && (
        <div style={{ marginTop: 16, background: `${G}08`, border: `1px solid ${G}25`, borderRadius: 12, padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 22 }}>{sel.emoji}</span>
            <span style={{ fontWeight: 800, color: 'var(--text)', fontSize: 15 }}>{sel.label}</span>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 10 }}>
            <div>
              <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.08em' }}>IP Address</span>
              <div style={{ fontSize: 13, color: G, fontFamily: FONT_MONO, fontWeight: 700, marginTop: 2 }}>{sel.ip}</div>
            </div>
            <div>
              <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.08em' }}>MAC Address</span>
              <div style={{ fontSize: 13, color: G, fontFamily: FONT_MONO, fontWeight: 700, marginTop: 2 }}>{sel.mac}</div>
            </div>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>{sel.role}</p>
        </div>
      )}
    </div>
  )
}

// ─── Interactive Component 2: Packet Journey ─────────────────────────────────

const packetSteps = [
  {
    title: 'Step 1 — You press Enter',
    emoji: '⌨️',
    description: 'You type "google.com" and press Enter. Your browser breaks your HTTP request into small chunks called packets. Each packet is roughly 1,500 bytes (about 1,500 characters). Why not send everything at once? Because smaller chunks can be rerouted around failures, and multiple packets can travel different paths simultaneously.',
    visual: ['[Your Device]', '→ Breaks request into packets', '→ Packets: #1, #2, #3, #4...'],
    color: '#60a5fa',
  },
  {
    title: 'Step 2 — Packets leave your home',
    emoji: '📡',
    description: "Each packet gets wrapped in three envelopes: an HTTP envelope (what you want), a TCP envelope (which \"conversation\" this belongs to + sequence number), and an IP envelope (source IP + destination IP). Your router gets the packets, strips the local delivery label, and forwards them toward Google's IP address.",
    visual: ['[Packet structure]', '  IP Header: src=103.74.52.18 dst=142.250.182.4', '  TCP Header: seq=1001 port=443', '  HTTP Data: GET / HTTP/1.1'],
    color: '#a78bfa',
  },
  {
    title: 'Step 3 — Hopping across the internet',
    emoji: '🌐',
    description: "Your packets don't go directly to Google. They hop through 15–25 routers across the globe — each one reads only the destination IP, decides the best next hop, and forwards the packet. Packets 1, 2, 3, 4 might take completely different routes! They may even arrive out of order. This is called packet switching and it's what makes the internet resilient — if one path fails, packets reroute.",
    visual: ['Your ISP → Tier-1 Router (Mumbai)', '→ Tier-1 Router (Singapore) → Google Edge', '→ Google\'s Server', '(traceroute shows every hop)'],
    color: '#fbbf24',
  },
  {
    title: 'Step 4 — Reassembly at the destination',
    emoji: '🔧',
    description: "Google's server receives all your packets — possibly out of order. TCP's job is to reassemble them in the correct sequence using sequence numbers. If packet #3 never arrives (dropped by a congested router), TCP notices the gap and requests a retransmission. Only when all packets arrive and are verified does your browser render the page.",
    visual: ['Google receives: #1 ✓ #3 ✓ #2 ✓ #4 ✓', 'TCP: reorders → #1 #2 #3 #4', 'HTTP: parses response', 'Browser: renders google.com ✓'],
    color: '#34d399',
  },
]

function PacketJourney() {
  const [step, setStep] = useState(0)
  const s = packetSteps[step]

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 4px' }}>Interactive — Packet Journey</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 20px' }}>Follow a single request from your keyboard to Google and back.</p>

      {/* Progress bar */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
        {packetSteps.map((_, i) => (
          <div key={i} onClick={() => setStep(i)} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= step ? s.color : 'var(--border)', cursor: 'pointer', transition: 'background 0.3s' }} />
        ))}
      </div>

      <div style={{ background: 'var(--bg)', border: `1px solid ${s.color}30`, borderLeft: `4px solid ${s.color}`, borderRadius: '0 12px 12px 0', padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <span style={{ fontSize: 28 }}>{s.emoji}</span>
          <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)' }}>{s.title}</span>
        </div>
        <p style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 16px' }}>{s.description}</p>
        <div style={{ background: '#0d1117', borderRadius: 8, padding: '12px 16px', fontFamily: FONT_MONO, fontSize: 12, color: '#94a3b8', lineHeight: 1.8 }}>
          {s.visual.map((line, i) => <div key={i}>{line}</div>)}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          style={{ flex: 1, padding: '10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, color: step === 0 ? 'var(--muted)' : 'var(--text)', cursor: step === 0 ? 'default' : 'pointer', fontSize: 13, fontWeight: 600 }}
        >
          ← Previous
        </button>
        <button
          onClick={() => setStep(Math.min(packetSteps.length - 1, step + 1))}
          disabled={step === packetSteps.length - 1}
          style={{ flex: 1, padding: '10px', background: step === packetSteps.length - 1 ? 'var(--bg)' : G, border: 'none', borderRadius: 8, color: step === packetSteps.length - 1 ? 'var(--muted)' : '#fff', cursor: step === packetSteps.length - 1 ? 'default' : 'pointer', fontSize: 13, fontWeight: 700 }}
        >
          Next Step →
        </button>
      </div>
      <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', margin: '10px 0 0' }}>{step + 1} / {packetSteps.length}</p>
    </div>
  )
}

// ─── Interactive Component 3: TCP vs UDP Comparison ──────────────────────────

function ProtocolComparison() {
  const [active, setActive] = useState<'tcp' | 'udp'>('tcp')

  const tcp = {
    color: '#60a5fa',
    label: 'TCP — Reliable Delivery',
    analogy: "Like sending a registered letter via post — you get a delivery confirmation for every letter, and if one gets lost, it's resent automatically.",
    how: [
      '3-way handshake before any data flows (SYN → SYN-ACK → ACK)',
      'Every packet gets a sequence number and must be acknowledged',
      'Lost packets are automatically retransmitted',
      'Flow control prevents the sender from overwhelming the receiver',
      'Congestion control slows down when the network is busy',
    ],
    uses: ['Web browsing (HTTP/HTTPS)', 'Email (SMTP, IMAP)', 'File transfers (FTP, SCP)', 'Database queries', 'SSH remote access'],
    tradeoff: 'The overhead of acknowledgments adds latency. A typical TCP connection takes 1–3 round trips just to establish before data flows.',
  }

  const udp = {
    color: '#f472b6',
    label: 'UDP — Fast, Connectionless',
    analogy: "Like shouting across a room — you don't wait for a reply, you don't know if everyone heard, but it's instant and works for many listeners at once.",
    how: [
      'No handshake — data is fired immediately',
      'No sequence numbers, no acknowledgments',
      'Lost packets are just lost — no retransmission',
      'No flow control, no congestion control',
      "Receiver's app decides what to do with gaps",
    ],
    uses: ['Video calls (Zoom, Teams)', 'Online gaming', 'Live video streaming', 'DNS lookups', 'VoIP (WhatsApp calls)'],
    tradeoff: 'For video calls, a missing packet means a tiny video glitch — far better than waiting for retransmission which would freeze your call for a full second.',
  }

  const d = active === 'tcp' ? tcp : udp

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 4px' }}>Interactive — TCP vs UDP</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 20px' }}>Toggle between the two to understand when each protocol is used and why.</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {(['tcp', 'udp'] as const).map(p => (
          <button
            key={p}
            onClick={() => setActive(p)}
            style={{
              flex: 1, padding: '12px', borderRadius: 10, border: `2px solid ${active === p ? (p === 'tcp' ? '#60a5fa' : '#f472b6') : 'var(--border)'}`,
              background: active === p ? (p === 'tcp' ? 'rgba(96,165,250,0.12)' : 'rgba(244,114,182,0.12)') : 'var(--bg)',
              color: active === p ? (p === 'tcp' ? '#60a5fa' : '#f472b6') : 'var(--muted)',
              fontWeight: 800, fontSize: 15, cursor: 'pointer', transition: 'all 0.2s',
              textTransform: 'uppercase', fontFamily: FONT_MONO, letterSpacing: '.05em',
            }}
          >
            {p}
          </button>
        ))}
      </div>

      <div style={{ background: 'var(--bg)', border: `1px solid ${d.color}30`, borderRadius: 12, padding: '20px 22px', marginBottom: 16 }}>
        <p style={{ fontSize: 16, fontWeight: 800, color: d.color, margin: '0 0 10px' }}>{d.label}</p>
        <div style={{ background: `${d.color}08`, border: `1px solid ${d.color}20`, borderRadius: 8, padding: '12px 16px', marginBottom: 16 }}>
          <p style={{ fontSize: 12, color: d.color, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Analogy</p>
          <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>{d.analogy}</p>
        </div>

        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', margin: '0 0 10px' }}>How it works:</p>
        <ul style={{ margin: '0 0 16px', paddingLeft: 18 }}>
          {d.how.map((item, i) => (
            <li key={i} style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 6 }}>{item}</li>
          ))}
        </ul>

        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', margin: '0 0 10px' }}>Used for:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {d.uses.map(u => (
            <span key={u} style={{ fontSize: 12, color: d.color, background: `${d.color}15`, padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>{u}</span>
          ))}
        </div>

        <div style={{ background: `${d.color}08`, borderRadius: 8, padding: '12px 16px' }}>
          <p style={{ fontSize: 12, color: d.color, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>The Trade-off</p>
          <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>{d.tradeoff}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Interactive Component 4: DNS Journey ─────────────────────────────────────

const dnsSteps = [
  { label: 'Browser Cache', emoji: '🔍', detail: 'Your browser first checks its own DNS cache. Did you visit google.com in the last few minutes? The answer is already stored locally — no network request needed. Chrome keeps DNS records for ~60 seconds.', result: 'MISS — not in cache', color: '#94a3b8' },
  { label: 'OS Cache', emoji: '💻', detail: 'Your operating system has its own DNS cache (separate from the browser). On macOS/Linux you can see it with `sudo dscacheutil -cachedump`. Windows has `ipconfig /displaydns`. Still not found.', result: 'MISS — not in OS cache', color: '#94a3b8' },
  { label: 'Your Router (Local Resolver)', emoji: '📡', detail: "Your OS asks your router: \"What's the IP for google.com?\" The router forwards this to your ISP's DNS server (your ISP assigns you their DNS server via DHCP when you connect). If they have it cached, you get an answer immediately.", result: 'MISS — forwarding to ISP DNS', color: '#fbbf24' },
  { label: 'Root Name Server', emoji: '🌍', detail: "Your ISP's DNS server asks one of 13 root name servers (there are actually thousands of instances worldwide via anycast). The root doesn't know google.com's IP — but it knows who's responsible for \".com\" domains.", result: "Refer → .com TLD servers at 192.5.6.30", color: '#60a5fa' },
  { label: '.com TLD Server', emoji: '📋', detail: "The TLD (Top-Level Domain) server for \".com\" doesn't know google.com's exact IP either — but it knows which name servers Google registered as authoritative for their domain.", result: "Refer → ns1.google.com (Google's DNS)", color: '#a78bfa' },
  { label: "Google's Authoritative DNS", emoji: '✅', detail: "Google's own name servers have the definitive answer. They return the A record: google.com = 142.250.182.4. This answer is cached at every resolver along the way according to the TTL (Time To Live) value — typically 300 seconds for Google.", result: 'HIT → 142.250.182.4 (TTL: 300s)', color: '#34d399' },
]

function DNSJourney() {
  const [step, setStep] = useState(-1)
  const started = step >= 0

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 4px' }}>Interactive — DNS Resolution</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 20px' }}>Follow a DNS query from "google.com" to an IP address, step by step.</p>

      {!started ? (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔎</div>
          <p style={{ fontSize: 15, color: 'var(--text)', marginBottom: 20 }}>You type <Code>google.com</Code> in your browser. What happens next?</p>
          <button onClick={() => setStep(0)} style={{ padding: '12px 32px', background: G, border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            Start DNS Query →
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {dnsSteps.map((s, i) => (
              <div
                key={i}
                onClick={() => setStep(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px',
                  background: i === step ? `${s.color}12` : (i < step ? `${s.color}06` : 'var(--bg)'),
                  border: `1px solid ${i === step ? s.color + '40' : 'var(--border)'}`,
                  borderRadius: 10, cursor: 'pointer', transition: 'all 0.2s',
                  opacity: i > step ? 0.4 : 1,
                }}
              >
                <span style={{ fontSize: 18 }}>{s.emoji}</span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{s.label}</span>
                  {i <= step && (
                    <div style={{ fontSize: 11, color: s.color, fontFamily: FONT_MONO, marginTop: 2 }}>{s.result}</div>
                  )}
                </div>
                {i < step && <span style={{ fontSize: 16 }}>✓</span>}
                {i === step && <span style={{ fontSize: 12, color: s.color, fontWeight: 700 }}>← NOW</span>}
              </div>
            ))}
          </div>

          {step < dnsSteps.length && (
            <div style={{ background: `${dnsSteps[step].color}08`, border: `1px solid ${dnsSteps[step].color}25`, borderRadius: 12, padding: '16px 20px', marginBottom: 16 }}>
              <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.9, margin: 0 }}>{dnsSteps[step].detail}</p>
            </div>
          )}

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
              style={{ flex: 1, padding: 10, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, color: step === 0 ? 'var(--muted)' : 'var(--text)', cursor: step === 0 ? 'default' : 'pointer', fontSize: 13, fontWeight: 600 }}>
              ← Back
            </button>
            {step < dnsSteps.length - 1 ? (
              <button onClick={() => setStep(step + 1)}
                style={{ flex: 2, padding: 10, background: G, border: 'none', borderRadius: 8, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                Next Step →
              </button>
            ) : (
              <button onClick={() => setStep(-1)}
                style={{ flex: 2, padding: 10, background: 'rgba(16,185,129,0.15)', border: `1px solid ${G}40`, borderRadius: 8, color: G, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                ↩ Restart
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Interactive Component 5: Bandwidth vs Latency Demo ──────────────────────

function BandwidthLatencyDemo() {
  const [bandwidth, setBandwidth] = useState(50)
  const [latency, setLatency] = useState(30)

  const scenarios = [
    {
      name: 'Load Google.com (1 MB page)',
      icon: '🌐',
      compute: () => {
        const transferMs = (1 * 8) / bandwidth * 1000
        const totalMs = latency * 4 + transferMs
        return {
          time: totalMs < 1000 ? `${Math.round(totalMs)} ms` : `${(totalMs / 1000).toFixed(2)} s`,
          note: `${Math.round(latency * 4)}ms for TCP + DNS handshakes, ${Math.round(transferMs)}ms data transfer`,
          good: totalMs < 500,
        }
      },
    },
    {
      name: 'Download Ubuntu ISO (4 GB)',
      icon: '💿',
      compute: () => {
        const transferSec = (4096 * 8) / bandwidth
        const fmt = transferSec < 60 ? `${Math.round(transferSec)}s` : `${Math.round(transferSec / 60)}m ${Math.round(transferSec % 60)}s`
        return {
          time: fmt,
          note: 'For downloads, latency barely matters — it\'s almost pure bandwidth',
          good: transferSec < 120,
        }
      },
    },
    {
      name: 'Video Call (Zoom)',
      icon: '📹',
      compute: () => {
        const feel = latency < 50 ? 'Excellent — conversations feel natural' : latency < 150 ? 'Acceptable — slight delay noticeable' : 'Poor — significant delay, awkward pauses'
        const good = latency < 80
        const bwOk = bandwidth >= 3
        return {
          time: `${latency}ms RTT`,
          note: bwOk ? feel : 'Bandwidth too low for Zoom (needs ≥ 3 Mbps)',
          good: good && bwOk,
        }
      },
    },
  ]

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 4px' }}>Interactive — Bandwidth vs Latency</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 24px' }}>Move the sliders and see how each metric affects different tasks differently.</p>

      <div style={{ display: 'grid', gap: 20, marginBottom: 24 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Bandwidth (pipe width)</label>
            <span style={{ fontSize: 15, fontWeight: 800, color: '#60a5fa', fontFamily: FONT_MONO }}>{bandwidth} Mbps</span>
          </div>
          <input type="range" min={1} max={1000} value={bandwidth} onChange={e => setBandwidth(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#60a5fa' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
            <span>1 Mbps (2G-ish)</span><span>100 Mbps (fiber)</span><span>1 Gbps</span>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Latency (round-trip delay)</label>
            <span style={{ fontSize: 15, fontWeight: 800, color: '#f472b6', fontFamily: FONT_MONO }}>{latency} ms</span>
          </div>
          <input type="range" min={1} max={500} value={latency} onChange={e => setLatency(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#f472b6' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
            <span>1ms (LAN)</span><span>30ms (good fiber)</span><span>300ms (satellite)</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {scenarios.map(s => {
          const result = s.compute()
          return (
            <div key={s.name} style={{ background: 'var(--bg)', border: `1px solid ${result.good ? G + '30' : 'rgba(239,68,68,0.25)'}`, borderRadius: 12, padding: '14px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{s.icon} {s.name}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: result.good ? G : '#f87171', fontFamily: FONT_MONO }}>{result.time}</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>{result.note}</p>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: 10 }}>
        <p style={{ fontSize: 13, color: 'var(--text)', margin: 0, lineHeight: 1.8 }}>
          <strong style={{ color: '#fbbf24' }}>Key insight:</strong> For large downloads, <strong>bandwidth</strong> is everything. For interactive use (web pages, video calls, gaming), <strong>latency</strong> is everything. A 1 Gbps connection with 300ms latency will feel slower for web browsing than a 10 Mbps connection with 10ms latency.
        </p>
      </div>
    </div>
  )
}

// ─── Interactive Component 6: Full HTTP Request Journey ───────────────────────

const httpSteps = [
  { phase: 'DNS Lookup', icon: '🔎', duration: '~15ms', detail: 'Browser resolves "example.com" → 93.184.216.34. If cached, this is instant. If not, it triggers the full DNS resolution chain you saw earlier.', layer: 'Application Layer' },
  { phase: 'TCP Handshake', icon: '🤝', duration: '~30ms', detail: 'Browser connects to port 443 on the server. SYN → SYN-ACK → ACK. One full round trip just to establish the connection. This is why TCP connections have overhead.', layer: 'Transport Layer' },
  { phase: 'TLS Handshake', icon: '🔒', duration: '~60ms', detail: 'HTTPS requires a TLS handshake: browser and server agree on encryption algorithm, server sends its certificate, keys are exchanged using asymmetric encryption (RSA/ECDH). TLS 1.3 does this in 1 round trip.', layer: 'Security Layer' },
  { phase: 'HTTP Request', icon: '📤', duration: '~1ms', detail: 'Browser sends: "GET / HTTP/1.1 Host: example.com Accept: text/html". This is the actual request — tiny compared to the overhead to get here.', layer: 'Application Layer' },
  { phase: 'Server Processing', icon: '⚙️', duration: '~50ms', detail: 'Server receives the request, queries its database (if any), renders HTML, and prepares the response. This is where your application code runs — FastAPI, Express, Django, etc.', layer: 'Server Side' },
  { phase: 'Response Transfer', icon: '📥', duration: '~20ms', detail: 'Server sends: "HTTP/1.1 200 OK Content-Type: text/html" followed by the HTML body. Response is broken into packets and sent back through the same path.', layer: 'Network Layer' },
  { phase: 'Browser Renders', icon: '🎨', duration: '~100ms', detail: 'Browser parses HTML, finds CSS/JS/image references, makes additional requests for each resource, executes JavaScript, applies styles, and paints pixels. This is why the DOM matters.', layer: 'Browser Engine' },
]

function HttpRequestJourney() {
  const [step, setStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setStep(prev => {
          if (prev >= httpSteps.length - 1) {
            setPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 1200)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [playing])

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 4px' }}>Interactive — Full HTTP Request</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 20px' }}>The complete lifecycle of visiting a webpage — from keypress to pixels. Total: ~276ms</p>

      {step >= 0 && (
        <div style={{ display: 'flex', gap: 3, marginBottom: 20, height: 8, borderRadius: 6, overflow: 'hidden', background: 'var(--bg)' }}>
          {httpSteps.map((_, i) => (
            <div key={i} style={{ flex: 1, background: i <= step ? G : 'var(--border)', transition: 'background 0.3s', borderRadius: 2 }} />
          ))}
        </div>
      )}

      {step < 0 ? (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🌐</div>
          <p style={{ fontSize: 15, color: 'var(--text)', marginBottom: 20 }}>Watch the complete journey of a single webpage request.</p>
          <button onClick={() => { setStep(0); setPlaying(true) }}
            style={{ padding: '12px 32px', background: G, border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            ▶ Auto-Play Journey
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
            {httpSteps.map((s, i) => {
              const active = i === step
              const done = i < step
              return (
                <div key={i} onClick={() => { setPlaying(false); setStep(i) }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                    background: active ? `${G}12` : done ? `${G}05` : 'var(--bg)',
                    border: `1px solid ${active ? G + '40' : 'var(--border)'}`,
                    borderRadius: 10, cursor: 'pointer', opacity: i > step ? 0.35 : 1, transition: 'all 0.3s',
                  }}
                >
                  <span style={{ fontSize: 18, minWidth: 22 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: done || active ? 700 : 500, color: 'var(--text)' }}>{s.phase}</span>
                      <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: FONT_MONO }}>{s.layer}</span>
                    </div>
                    {(active || done) && <div style={{ fontSize: 11, color: G, fontFamily: FONT_MONO, marginTop: 2 }}>{s.duration}</div>}
                  </div>
                  {done && <span style={{ color: G, fontSize: 14 }}>✓</span>}
                  {active && <span style={{ fontSize: 11, color: G, fontWeight: 800 }}>← NOW</span>}
                </div>
              )
            })}
          </div>

          {step < httpSteps.length && (
            <div style={{ background: `${G}08`, border: `1px solid ${G}25`, borderRadius: 12, padding: '14px 18px', marginBottom: 16 }}>
              <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.9, margin: 0 }}>{httpSteps[step].detail}</p>
            </div>
          )}

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => { setPlaying(false); setStep(Math.max(0, step - 1)) }} disabled={step === 0}
              style={{ flex: 1, padding: 10, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, color: step === 0 ? 'var(--muted)' : 'var(--text)', cursor: step === 0 ? 'default' : 'pointer', fontSize: 13, fontWeight: 600 }}>
              ← Back
            </button>
            <button onClick={() => setPlaying(!playing)}
              style={{ flex: 1, padding: 10, background: 'var(--bg)', border: `1px solid ${G}40`, borderRadius: 8, color: G, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              {playing ? '⏸ Pause' : '▶ Play'}
            </button>
            {step < httpSteps.length - 1 ? (
              <button onClick={() => { setPlaying(false); setStep(step + 1) }}
                style={{ flex: 1, padding: 10, background: G, border: 'none', borderRadius: 8, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                Next →
              </button>
            ) : (
              <button onClick={() => { setPlaying(false); setStep(-1) }}
                style={{ flex: 1, padding: 10, background: 'rgba(16,185,129,0.15)', border: `1px solid ${G}40`, borderRadius: 8, color: G, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                ↩ Reset
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Main Module ──────────────────────────────────────────────────────────────

export default function WhatIsANetworkModule() {
  return (
    <LearnLayout
      title="What is a Network?"
      description="A beginner-to-PhD journey through computer networks — from why they exist, to how a single click on your phone becomes electrons crossing five continents and back in 300 milliseconds."
      section="Networking Fundamentals"
      readTime="45 min"
      updatedAt="May 2026"
    >

      {/* ── CHAPTER 1: The Hook ─────────────────────────────────────────── */}
      <Chapter
        n="01"
        title="You Already Use Networks — Millions of Times a Day"
        subtitle="Before we define anything, let's look at what you've already done today."
      />

      <StoryBox>
        You woke up this morning and checked Instagram. Your phone sent a request to a server in California, which looked up your account in a database, pulled 20 photos from a storage cluster, compressed them, and sent them back — all in under 2 seconds. Then you opened Google Maps. Your phone asked a GPS satellite for coordinates, sent them to Google's servers in Iowa, which computed your route using live traffic data collected from 2 million other phones at that exact moment, and returned turn-by-turn directions. Then you streamed a YouTube video. 4K video means roughly 25 megabytes per second of data — continuous, uninterrupted, from a data center that might be 10,000 km away.
      </StoryBox>

      <Para>
        None of this feels magical anymore. But every single action above required a computer network — a system that lets machines talk to each other across any distance, reliably, at speed. Understanding how networks work means understanding the invisible infrastructure that modern life runs on. Every app you build, every job in tech, every system you design touches networks.
      </Para>

      <Para>
        This guide starts at zero. No background required. By the end, you will understand not just <Accent>what</Accent> networks are, but <Accent>why</Accent> they work the way they do — and what would break if they worked differently.
      </Para>

      <WowBox emoji="🌍" title="The internet in numbers (2025)">
        <ul style={{ margin: '8px 0 0', paddingLeft: 18, lineHeight: 2 }}>
          <li>5.5 billion internet users — 68% of humanity</li>
          <li>~500 billion GB of data transferred every day</li>
          <li>600+ undersea fiber optic cables carrying 99% of international internet traffic</li>
          <li>4.6 billion websites, ~200 million actively maintained</li>
          <li>~1.5 million data centers worldwide, with hyperscale facilities consuming more power than small countries</li>
        </ul>
      </WowBox>

      <Divider />

      {/* ── CHAPTER 2: What is a Network? ──────────────────────────────── */}
      <Chapter
        n="02"
        title="What is a Network, Really?"
        subtitle="The simplest definition, and why it's not enough."
      />

      <Para>
        A <Accent>computer network</Accent> is two or more devices connected in a way that allows them to exchange information. That is it. Your phone and laptop connected via Bluetooth — that is a network. Two computers in an office with a cable between them — that is a network. The entire global internet — that is also a network, just one with billions of devices.
      </Para>

      <Para>
        The interesting question is not "what is a network" — it is <Accent>why do we connect devices at all?</Accent> The answer is resource sharing. Before networks, every computer was an island. Want to print a document? You needed a printer connected directly to your machine. Want to share a file with a colleague? You physically handed them a floppy disk (called "sneakernet" — because you walked the data over on your sneakers). Networks eliminated the island problem.
      </Para>

      <H2>Three Things Every Network Does</H2>

      <Para>
        Every network in existence — from your home WiFi to the global internet — does exactly three things:
      </Para>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, margin: '24px 0' }}>
        {[
          { icon: '🔗', title: '1. Connect', desc: 'Establishes a path between devices — physical cables, WiFi radio waves, fiber optic light pulses, or satellite signals.' },
          { icon: '📦', title: '2. Transfer', desc: 'Moves data from one device to another. But not as a single stream — as small packets that can be routed independently.' },
          { icon: '📋', title: '3. Follow Rules', desc: 'Uses agreed-upon protocols so that a Samsung phone, an Apple server, and a Windows PC can all talk to each other.' },
        ].map(item => (
          <div key={item.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>{item.title}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <H2>Your Home Network — Up Close</H2>

      <Para>
        Before we scale up to the global internet, let us look at the smallest network most people interact with: their home network. Every device in your home that connects to the internet is part of this network — your phone, laptop, smart TV, thermostat, and even your printer.
      </Para>

      <HomeNetworkDiagram />

      <Para>
        Notice that your router has <Accent>two different IP addresses</Accent>. One faces inward (your home network) — like 192.168.1.1. One faces outward (the internet) — your actual public IP like 103.74.52.18. This is because there are not enough public IP addresses for every device in every home. Your router uses a technique called <Accent>NAT (Network Address Translation)</Accent> to let all your devices share one public IP. We will explore this in detail in Chapter 5.
      </Para>

      <Divider />

      {/* ── CHAPTER 3: How Data Actually Travels ───────────────────────── */}
      <Chapter
        n="03"
        title="How Data Actually Travels — The Packet Revolution"
        subtitle="The internet doesn't work the way most people assume. Here's the surprising reality."
      />

      <StoryBox>
        Imagine you need to mail a 500-page manuscript to a publisher in another city. You could stuff all 500 pages in one enormous box — but if that box gets lost or damaged in transit, you lose everything. Or you could send 50 smaller packages, each with 10 pages and a label saying "Package 3 of 50, pages 21-30." If package 12 gets lost, only that package needs to be re-sent. The publisher waits for all 50 packages, reassembles them in order, and reads the complete manuscript. This is exactly how the internet works.
      </StoryBox>

      <Para>
        The internet uses <Accent>packet switching</Accent> — data is broken into small chunks called <Accent>packets</Accent> (typically 1,500 bytes each), sent independently, and reassembled at the destination. This was a radical idea in the 1960s. Before packet switching, telephone networks used <Accent>circuit switching</Accent> — when you made a call, a dedicated physical circuit was reserved between you and the other person for the entire duration of the call, even when neither of you was speaking. Wasteful.
      </Para>

      <H2>Why Packets Changed Everything</H2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, margin: '20px 0 32px' }}>
        {[
          { icon: '🛡️', title: 'Fault Tolerant', desc: 'If one router fails, packets reroute around it automatically. The internet was originally designed to survive nuclear strikes by the US military (ARPANET, 1969).' },
          { icon: '⚡', title: 'Efficient', desc: "Multiple packets from different users share the same physical wire simultaneously. One slow download doesn't block someone else's video call." },
          { icon: '📈', title: 'Scalable', desc: 'Billions of devices can join the internet without reserving circuits in advance. Capacity is shared dynamically.' },
          { icon: '🔄', title: 'Resilient', desc: 'Packets can take different paths. One packet might go Mumbai → Singapore → Google, the next might go Mumbai → London → Google.' },
        ].map(item => (
          <div key={item.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{item.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <H2>Anatomy of a Packet</H2>

      <Para>
        Every packet has two parts: a <Accent>header</Accent> (the label on the envelope — who it is from, who it is going to, what number this packet is) and a <Accent>payload</Accent> (the actual data inside). Multiple headers can be stacked — one for each layer of the network stack.
      </Para>

      <CodeBlock title="Simplified packet structure">
        {`[Ethernet Header  | IP Header         | TCP Header        | HTTP Data      ]
 src MAC           src IP: 192.168.1.5  seq: 1001          GET / HTTP/1.1
 dst MAC           dst IP: 142.250.182.4 ack: 0             Host: google.com
 type: IPv4        protocol: TCP         port: 443           ...

 ← 14 bytes →    ← 20 bytes →          ← 20 bytes →       ← up to ~1460 bytes →

 Total packet = 1500 bytes (MTU = Maximum Transmission Unit)`}
      </CodeBlock>

      <Para>
        The <Accent>MTU (Maximum Transmission Unit)</Accent> of 1,500 bytes is not arbitrary — it is the maximum payload size that Ethernet (the most common link-layer protocol) defined in the 1980s. If your data is larger, it gets fragmented into multiple packets automatically.
      </Para>

      <PacketJourney />

      <Warn title="Common misconception: packets always take the same path">
        Many people imagine the internet as a series of tubes where their data flows in a straight line. In reality, packets from the same TCP connection can take entirely different physical paths — one might go through London, another through Singapore — and arrive out of order. TCP's job is to reorder them correctly.
      </Warn>

      <Divider />

      {/* ── CHAPTER 4: Protocols ────────────────────────────────────────── */}
      <Chapter
        n="04"
        title="Protocols — The Rules Everyone Must Follow"
        subtitle="Without protocols, a Google server and an Apple iPhone would have nothing to say to each other."
      />

      <StoryBox>
        Imagine landing at an airport in Japan when you do not speak Japanese. You go to the information desk and the agent speaks only Japanese. You speak only English. Neither of you can help the other. Now imagine both of you speak French — a common language. That is what protocols are: agreed-upon communication rules that let completely different devices understand each other.
      </StoryBox>

      <Para>
        A <Accent>protocol</Accent> is a set of rules that defines: how to start a conversation, what format messages must be in, how to handle errors, and how to end the conversation. Without protocols, a Samsung phone could not load a page from an Apple server in a Google data center.
      </Para>

      <H2>The Protocol Stack — Layers of Responsibility</H2>

      <Para>
        Networking is organized in <Accent>layers</Accent>. Each layer handles one job and passes work up or down to the next layer. You do not need to memorize this yet — but understanding the concept is crucial.
      </Para>

      <div style={{ margin: '24px 0' }}>
        {[
          { layer: '7 — Application', proto: 'HTTP, HTTPS, DNS, SMTP, FTP', job: 'What are you asking for? (A webpage, an email, a file)', color: '#10b981' },
          { layer: '4 — Transport', proto: 'TCP, UDP', job: 'How reliably? Port numbers. Splitting data into segments.', color: '#60a5fa' },
          { layer: '3 — Network', proto: 'IP (IPv4/IPv6), ICMP', job: 'Where does it go? IP addresses. Routing across the internet.', color: '#a78bfa' },
          { layer: '2 — Data Link', proto: 'Ethernet, WiFi (802.11)', job: 'How does it move on the local link? MAC addresses.', color: '#fbbf24' },
          { layer: '1 — Physical', proto: 'Fiber, copper, radio', job: 'Actual electrons, photons, or radio waves.', color: '#f472b6' },
        ].map((row, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 8, padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${row.color}`, borderRadius: '0 10px 10px 0' }}>
            <div style={{ minWidth: 140, fontSize: 12, fontFamily: FONT_MONO, fontWeight: 700, color: row.color }}>{row.layer}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{row.proto}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{row.job}</div>
            </div>
          </div>
        ))}
      </div>

      <Para>
        When you send a request, each layer <Accent>wraps</Accent> the data with its own header (called encapsulation). When data arrives, each layer <Accent>unwraps</Accent> the header it understands (called decapsulation). Your web browser never knows about MAC addresses. The Ethernet hardware never knows about HTTP. Each layer only speaks to the layer above and below it.
      </Para>

      <H2>The Two Great Transport Protocols: TCP and UDP</H2>

      <Para>
        At the Transport layer (Layer 4), two protocols divide the world between them: <Accent>TCP</Accent> (Transmission Control Protocol) and <Accent>UDP</Accent> (User Datagram Protocol). The choice between them is one of the most important decisions in network application design.
      </Para>

      <ProtocolComparison />

      <Para>
        Modern protocols often blur this line. <Accent>QUIC</Accent> (used by HTTP/3) implements reliability on top of UDP at the application layer — gaining the benefits of UDP's speed while adding its own congestion control and stream multiplexing. When you watch YouTube, there is a good chance you are using QUIC right now.
      </Para>

      <Divider />

      {/* ── CHAPTER 5: Addresses — IP, MAC, NAT, DNS ───────────────────── */}
      <Chapter
        n="05"
        title="Addresses — How the Internet Knows Where to Send Your Data"
        subtitle="The internet needs to find your device among 5.5 billion users. Here's how."
      />

      <StoryBox>
        Think about your home. It has a postal address — say, "42 MG Road, Hyderabad 500016." That address gets a letter from anywhere in the world to your building. But inside your building, you also have an apartment number — "Flat 3B." The postal system uses the building address. Once the letter arrives, your building's internal system uses the apartment number. IP addresses work the same way: public IPs route traffic across the internet, private IPs route traffic within your home network.
      </StoryBox>

      <H2>IP Addresses — Your Device's Mailing Address</H2>

      <Para>
        An <Accent>IP address</Accent> (Internet Protocol address) is a unique identifier for a device on a network. Every packet on the internet carries a source IP (where it came from) and a destination IP (where it is going). Routers use destination IPs to decide where to forward each packet.
      </Para>

      <Para>
        There are two versions of IP addresses in use today:
      </Para>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, margin: '20px 0 28px' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid rgba(96,165,250,0.3)', borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#60a5fa', marginBottom: 10 }}>IPv4 — The Old Standard</div>
          <div style={{ fontSize: 22, fontFamily: FONT_MONO, color: 'var(--text)', marginBottom: 10, fontWeight: 700 }}>192.168.1.1</div>
          <ul style={{ fontSize: 13, color: 'var(--muted)', paddingLeft: 16, lineHeight: 1.9, margin: 0 }}>
            <li>32-bit address (4 groups of 0–255)</li>
            <li>~4.3 billion possible addresses</li>
            <li>We ran out in 2011 — NAT is the workaround</li>
            <li>Still 95%+ of internet traffic today</li>
          </ul>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: G, marginBottom: 10 }}>IPv6 — The Future</div>
          <div style={{ fontSize: 16, fontFamily: FONT_MONO, color: 'var(--text)', marginBottom: 10, fontWeight: 700, wordBreak: 'break-all' }}>2001:0db8:85a3::8a2e:0370:7334</div>
          <ul style={{ fontSize: 13, color: 'var(--muted)', paddingLeft: 16, lineHeight: 1.9, margin: 0 }}>
            <li>128-bit address (8 groups of hex)</li>
            <li>340 undecillion addresses (3.4 × 10³⁸)</li>
            <li>Enough for every atom on Earth's surface</li>
            <li>No need for NAT — every device gets a public IP</li>
          </ul>
        </div>
      </div>

      <H2>Private vs Public IP Addresses</H2>

      <Para>
        Not all IP addresses are visible on the internet. Three ranges are reserved as <Accent>private</Accent> — they can only exist on local networks (your home, office, etc.) and are never routed on the public internet:
      </Para>

      <CodeBlock title="RFC 1918 Private Address Ranges">
        {`10.0.0.0    to  10.255.255.255    # 10.x.x.x  — Class A (16M addresses)
172.16.0.0  to  172.31.255.255    # 172.16-31.x.x — Class B (1M addresses)
192.168.0.0 to  192.168.255.255   # 192.168.x.x — Class C (65K addresses)

Your home router gives devices addresses in 192.168.x.x range (most common).
Enterprise networks often use 10.x.x.x for scale.`}
      </CodeBlock>

      <H2>NAT — How Millions of Devices Share One IP Address</H2>

      <Para>
        Since IPv4 only has 4.3 billion addresses and there are 5.5 billion internet users (plus multiple devices each), we would have run out long ago without a workaround. The solution is <Accent>NAT (Network Address Translation)</Accent>. Your router has one public IP from your ISP. Every device in your home gets a private IP from the router. When your phone (192.168.1.101) sends a request to Google, the router translates: "This packet is really from me (103.74.52.18), and when the reply comes, send it back to 192.168.1.101:54321." This translation table is maintained in memory.
      </Para>

      <CodeBlock title="NAT translation table (simplified)">
        {`Private IP:Port          Public IP:Port          Destination
192.168.1.101:54321  →   103.74.52.18:1024  →   142.250.182.4:443 (Google)
192.168.1.102:55001  →   103.74.52.18:1025  →   31.13.79.70:443   (Facebook)
192.168.1.110:56789  →   103.74.52.18:1026  →   52.84.17.99:443   (Netflix)

When Google replies to 103.74.52.18:1024, NAT routes it to 192.168.1.101:54321`}
      </CodeBlock>

      <H2>MAC Addresses — The Hardware Identity</H2>

      <Para>
        Every network interface (WiFi card, Ethernet port) has a <Accent>MAC address</Accent> (Media Access Control address) burned into its hardware at the factory. Unlike IP addresses (which are logical and can change), MAC addresses are permanent hardware identifiers.
      </Para>

      <Para>
        MAC addresses are used for <Accent>local delivery only</Accent>. When your laptop sends a packet to your router, it uses the router's MAC address as the destination. When the router forwards that packet to the next router on the internet, the MAC addresses change — but the IP addresses stay the same. MAC addresses are replaced at every hop; IP addresses travel end-to-end.
      </Para>

      <CodeBlock title="MAC address format">
        {`A4:C3:F0:11:22:33

First 3 bytes (A4:C3:F0) = OUI (Organizationally Unique Identifier)
  → Assigned to a manufacturer (Apple, Intel, Qualcomm, etc.)
  → You can look up who made the card from the first 3 bytes

Last 3 bytes (11:22:33) = Device-specific unique identifier
  → Assigned by manufacturer at factory

Total: 48-bit = ~281 trillion possible addresses`}
      </CodeBlock>

      <H2>DNS — The Internet's Phone Book</H2>

      <Para>
        You type "google.com." Your computer needs an IP address to connect to. But you are not going to type "142.250.182.4" into your browser — you need a translation service. That is <Accent>DNS (Domain Name System)</Accent>: the distributed database that maps human-readable names to IP addresses.
      </Para>

      <Para>
        DNS is not a single server — it is a <Accent>hierarchical tree</Accent> of servers distributed across the world. No single server knows all domain names. Instead, servers delegate responsibility downward: root servers know about TLDs (.com, .org, .in), TLD servers know about domains (google.com, amazon.com), and authoritative servers know the actual IPs.
      </Para>

      <DNSJourney />

      <WowBox emoji="⚡" title="DNS is faster than you think">
        A DNS query typically completes in 5–50ms for cached responses, and 100–300ms for a full recursive resolution. Google's 8.8.8.8 and Cloudflare's 1.1.1.1 are public DNS resolvers with servers on every continent — they cache billions of records and can often answer in under 10ms. The first time you visit a site, DNS takes a round trip. Every time after (within the TTL window), it is instant from cache.
      </WowBox>

      <Divider />

      {/* ── CHAPTER 6: Bandwidth vs Latency ────────────────────────────── */}
      <Chapter
        n="06"
        title="Bandwidth, Latency, and Why Your Fast Connection Sometimes Feels Slow"
        subtitle="The two most misunderstood concepts in networking — and why they matter for every application you build."
      />

      <StoryBox>
        You have a 200 Mbps fiber connection at home — blazing fast. But when you join a video call, there is a half-second delay on everything you say. Your colleague's WiFi is only 20 Mbps, but her video call is crisp and instant. How? Because bandwidth and latency are completely different things — and for interactive applications, latency is far more important.
      </StoryBox>

      <Para>
        People often confuse "fast internet" with "high bandwidth." They are not the same. These are the four metrics that actually describe a network connection:
      </Para>

      <div style={{ margin: '24px 0' }}>
        {[
          { metric: 'Bandwidth', unit: 'Mbps / Gbps', analogy: 'The width of a pipe — how much data can flow through per second.', detail: 'A 1 Gbps connection can transfer 1,000 Megabits (125 Megabytes) per second. Relevant for large file transfers and streaming — not for interactive apps.', color: '#60a5fa' },
          { metric: 'Latency', unit: 'milliseconds (ms)', analogy: 'How long it takes for one bit to travel from A to B and back (round-trip time / RTT).', detail: 'Governed by the speed of light (~200,000 km/s in fiber) and the number of router hops. Mumbai to New York is ~200ms minimum — physics, not technology.', color: '#f472b6' },
          { metric: 'Throughput', unit: 'Mbps (actual)', analogy: 'What you actually get — bandwidth minus overhead, congestion, and retransmissions.', detail: 'Bandwidth is the ceiling. Throughput is what reaches your application after TCP overhead, packet loss, and congestion control. Often 60–80% of bandwidth.', color: '#fbbf24' },
          { metric: 'Jitter', unit: 'ms (variation)', analogy: 'Inconsistency in latency — packets arriving with varying delays.', detail: 'Video calls hate jitter. If packet 1 arrives in 30ms and packet 2 arrives in 90ms, you get audio/video stuttering. High jitter = poor call quality even with low average latency.', color: '#34d399' },
        ].map(item => (
          <div key={item.metric} style={{ display: 'flex', gap: 16, marginBottom: 12, background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${item.color}`, borderRadius: '0 12px 12px 0', padding: '16px 20px' }}>
            <div style={{ minWidth: 110 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: item.color }}>{item.metric}</div>
              <div style={{ fontSize: 11, fontFamily: FONT_MONO, color: 'var(--muted)', marginTop: 3 }}>{item.unit}</div>
            </div>
            <div>
              <div style={{ fontSize: 14, color: 'var(--text)', fontStyle: 'italic', marginBottom: 6 }}>{item.analogy}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <BandwidthLatencyDemo />

      <H2>The Bandwidth-Delay Product — Why "Fast" Networks Can Still Feel Slow</H2>

      <Para>
        The <Accent>Bandwidth-Delay Product (BDP)</Accent> tells you how much data can be "in flight" in the network at any moment — like water filling a long hose:
      </Para>

      <CodeBlock title="Bandwidth-Delay Product">
        {`BDP = Bandwidth × RTT

Example: 1 Gbps connection with 100ms RTT
BDP = 1,000,000,000 bits/sec × 0.1 sec = 100,000,000 bits = 12.5 MB

This means 12.5 MB of data can be "in flight" simultaneously.
TCP's congestion window must be large enough to fill this pipe.
If the window is too small, TCP sits idle waiting for acknowledgments
instead of sending more data — wasting your bandwidth.`}
      </CodeBlock>

      <Para>
        This is why downloading a large file from a server 20ms away is much faster than from a server 200ms away, even if both have 10 Gbps connections. TCP cannot fill the pipe if it has to wait 200ms for every acknowledgment before sending more.
      </Para>

      <H2>Bufferbloat — The Hidden Problem in Your Router</H2>

      <Para>
        Modern routers have large buffers (queues) to hold packets when they are congested. Sounds good? It causes a problem called <Accent>bufferbloat</Accent>: when someone in your house starts a large download, the router fills its buffer with download packets, and all your other traffic (video calls, gaming) has to wait in line — adding hundreds of milliseconds of latency. You can test this at fast.com or dslreports.com/speedtest.
      </Para>

      <Para>
        The solution is <Accent>CoDel (Controlled Delay)</Accent> — a queue management algorithm built into modern Linux kernels and routers like those running OpenWRT. CoDel deliberately drops packets that have been waiting too long, forcing senders to slow down before the buffer fills, keeping latency consistently low. Most consumer routers do not implement this properly — it is why enterprise-grade routers (from Ubiquiti, MikroTik) often feel noticeably better for real-time use.
      </Para>

      <Divider />

      {/* ── CHAPTER 7: Physical Internet Infrastructure ─────────────────── */}
      <Chapter
        n="07"
        title="The Physical Internet — What It Actually Looks Like"
        subtitle="The internet is real, physical, and surprisingly fragile in some ways."
      />

      <StoryBox>
        In March 2013, someone in Egypt dug into the seabed with an anchor and accidentally cut an undersea fiber optic cable. Internet speeds across South Asia and the Middle East dropped by 60% for three days. In 2022, a volcanic eruption near Tonga severed the undersea cable connecting the island nation, cutting it off from the internet for weeks. The internet feels invisible, but it runs on physical infrastructure that can be cut, flooded, or destroyed.
      </StoryBox>

      <H2>Undersea Cables — The Backbone of Global Communication</H2>

      <Para>
        Forget satellites for a moment. <Accent>99% of international internet traffic</Accent> travels through undersea fiber optic cables. There are 600+ of these cables crisscrossing the ocean floor, each one about as thick as a garden hose, carrying thousands of fiber strands. Each fiber can carry terabits per second using wavelength-division multiplexing (sending dozens of different colors of light through one fiber simultaneously).
      </Para>

      <Para>
        The cable from India to the UK (the FLAG cable) is 28,000 km long. A photon travels through glass at about 2/3 the speed of light (200,000 km/s), so the theoretical minimum latency Mumbai to London is about 70ms one way. Real-world latency is ~130-170ms round-trip due to router processing, signal amplification at repeaters, and routing overhead.
      </Para>

      <WowBox emoji="🔦" title="How fiber optic cables work">
        Fiber optic cables transmit data as pulses of light through thin glass fibers (thinner than a human hair). Light bounces along the fiber via total internal reflection — it never touches the cable walls because the glass core is denser than the cladding around it, causing light to reflect back inward at the boundary. Undersea cables have electronic "repeaters" every 50–100 km that receive the optical signal, convert it to electricity, amplify it, convert back to light, and retransmit — all underwater, running on power sent through the copper core of the cable from shore.
      </WowBox>

      <H2>Data Centers — Where the Internet Lives</H2>

      <Para>
        When you access any website, app, or service, your request ultimately reaches a <Accent>data center</Accent> — a facility housing thousands of servers. Hyperscale data centers (Google, Amazon, Meta, Microsoft) can contain 100,000+ servers and consume 100+ megawatts of power (enough for a small city). They are typically located near renewable energy sources, cool climates (for natural cooling), and major fiber optic networks.
      </Para>

      <Para>
        Google has 35+ data center campuses worldwide. A request from India to google.com typically hits a data center in Singapore, Mumbai, or Taiwan — rarely one in the US. This is by design: keeping servers close to users reduces latency.
      </Para>

      <H2>CDNs — The Internet's Distributed Cache</H2>

      <Para>
        A <Accent>CDN (Content Delivery Network)</Accent> is a globally distributed network of servers that cache and serve content from locations close to end users. When Netflix has a new show, they do not stream it from a central server to 100 million viewers simultaneously. Instead, they push copies of the content to CDN servers in hundreds of cities worldwide. When you hit play, you are streaming from a server 20ms away, not 200ms away from a central location.
      </Para>

      <Para>
        Cloudflare, Akamai, Fastly, and AWS CloudFront are major CDN providers. They serve images, videos, static HTML/CSS/JS, and sometimes entire dynamic applications from edge nodes. A website using a CDN correctly will serve the same content 10x faster to users worldwide compared to a single-region server.
      </Para>

      <Divider />

      {/* ── CHAPTER 8: Security and HTTPS ──────────────────────────────── */}
      <Chapter
        n="08"
        title="Security — How HTTPS Protects Everything You Send"
        subtitle="Without encryption, every packet you send is readable by anyone between you and the server."
      />

      <StoryBox>
        Imagine sending a postcard vs. a sealed letter. A postcard (plain HTTP) — anyone who handles it can read everything. A sealed, tamper-evident letter with a wax seal (HTTPS) — your postman can see the destination address, but not the contents. Even if they intercept it, they cannot read it without breaking the seal (and you would know if they did). HTTPS is that sealed letter — encrypted so that only you and the server can read the contents.
      </StoryBox>

      <H2>Why HTTP Alone Is Dangerous</H2>

      <Para>
        Plain HTTP sends everything in cleartext. If you are on public WiFi at a coffee shop and you log into a site using HTTP, anyone on the same network running <Code>Wireshark</Code> can capture your username and password as plaintext. This is called a <Accent>man-in-the-middle attack</Accent>. As recently as 2010, the tool "Firesheep" let anyone on public WiFi steal Facebook session cookies in one click, because Facebook was still serving login pages over HTTP.
      </Para>

      <H2>HTTPS and TLS — The Full Story</H2>

      <Para>
        <Accent>HTTPS</Accent> = HTTP + <Accent>TLS</Accent> (Transport Layer Security). TLS does three things:
      </Para>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '20px 0 28px' }}>
        {[
          { n: '1', title: 'Authentication', desc: "Proves you're talking to the real server (google.com) and not an impostor. Servers have digital certificates signed by a Certificate Authority (CA) like DigiCert or Let's Encrypt. Your browser trusts ~150 root CAs pre-installed by the OS.", color: '#60a5fa' },
          { n: '2', title: 'Encryption', desc: 'All data is encrypted using symmetric keys (AES-256 or ChaCha20) that are negotiated during the handshake. Even if someone captures every packet, they cannot decrypt the contents without the session key.', color: G },
          { n: '3', title: 'Integrity', desc: 'Each message includes a cryptographic MAC (Message Authentication Code). If any bit of the data is modified in transit, the MAC check fails and the connection is terminated immediately.', color: '#a78bfa' },
        ].map(item => (
          <div key={item.n} style={{ display: 'flex', gap: 14, background: 'var(--surface)', border: `1px solid ${item.color}25`, borderRadius: 10, padding: '14px 18px' }}>
            <div style={{ width: 28, height: 28, background: `${item.color}20`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: item.color, flexShrink: 0 }}>{item.n}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <CodeBlock title="TLS 1.3 Handshake (simplified)">
        {`Client → Server:  ClientHello  (supported TLS versions, cipher suites, random nonce)
Server → Client:  ServerHello  (chosen cipher, server certificate, server public key)
                  Certificate  (signed by DigiCert, proving server identity)

Client:           Verifies certificate chain → Root CA in browser trust store ✓
                  Generates pre-master secret, encrypts with server's public key
Client → Server:  ClientKeyExchange (encrypted pre-master secret)
                  ChangeCipherSpec (switching to symmetric encryption now)
                  Finished (HMAC of entire handshake, proving integrity)

Server:           Decrypts pre-master secret using its private key
                  Both sides derive the same symmetric session key
Server → Client:  ChangeCipherSpec + Finished

→ From here, all communication is AES-256-GCM encrypted.
→ TLS 1.3 optimized this from TLS 1.2's 3+ round trips down to 1-2.`}
      </CodeBlock>

      <Para>
        Modern HTTPS uses <Accent>forward secrecy</Accent> — the session keys are ephemeral and never stored. Even if a server's private key is stolen years later, past encrypted sessions cannot be decrypted. This is achieved using Diffie-Hellman Ephemeral (DHE) or Elliptic Curve DHE key exchange.
      </Para>

      <Divider />

      {/* ── CHAPTER 9: Full HTTP Request Journey ───────────────────────── */}
      <Chapter
        n="09"
        title="Putting It All Together — The Full Journey of a Web Request"
        subtitle="Every concept from the previous chapters comes together when you click a link."
      />

      <Para>
        You have learned about packets, TCP, IP addresses, DNS, latency, and HTTPS separately. Now watch them all work together in real time — this is what happens when you click a link on any website.
      </Para>

      <HttpRequestJourney />

      <Para>
        Notice the single most surprising insight: <Accent>the actual HTTP request is trivial compared to the setup.</Accent> DNS + TCP + TLS take 3–5 round trips before a single byte of your actual content is transferred. This is why connection reuse matters so much — HTTP/1.1 introduced <Code>keep-alive</Code>, HTTP/2 introduced multiplexing (multiple requests on one connection), and HTTP/3 (QUIC) starts transferring data in the very first packet.
      </Para>

      <WowBox emoji="🚀" title="HTTP/3 and QUIC — the next generation">
        HTTP/3 runs on QUIC instead of TCP. QUIC is built on UDP but implements its own reliability, congestion control, and stream multiplexing. The key innovation: QUIC integrates TLS 1.3 into the transport handshake — so you go from connection establishment to encrypted data in just 1 round trip (or even 0 round trips for returning connections via session resumption). YouTube, Google Search, and Cloudflare-protected sites already use HTTP/3 for most connections.
      </WowBox>

      <Divider />

      {/* ── CHAPTER 10: Hands-On Tools ─────────────────────────────────── */}
      <Chapter
        n="10"
        title="Hands-On — Network Tools Every Developer Must Know"
        subtitle="These commands are available on every Mac, Linux, and most Windows machines. Run them yourself right now."
      />

      <Para>
        Understanding networks in theory is one thing. Being able to observe and debug them in practice is what separates good engineers from great ones. Here are the essential tools:
      </Para>

      <H2>ping — Is the host reachable?</H2>

      <Para>
        <Code>ping</Code> sends ICMP Echo Request packets to a host and measures the round-trip time. It tells you: is the host alive, and how far away is it in milliseconds?
      </Para>

      <CodeBlock title="ping examples">
        {`$ ping google.com
PING google.com (142.250.182.4): 56 data bytes
64 bytes from 142.250.182.4: icmp_seq=0 ttl=57 time=12.847 ms
64 bytes from 142.250.182.4: icmp_seq=1 ttl=57 time=13.201 ms
64 bytes from 142.250.182.4: icmp_seq=2 ttl=57 time=12.953 ms

# time= is your round-trip latency
# ttl= (Time To Live) starts at 64/128 and decrements at each router hop
# 57 means it passed through 64-57=7 routers to reach you

$ ping -c 100 8.8.8.8 | tail -5
--- 8.8.8.8 ping statistics ---
100 packets transmitted, 99 received, 1% packet loss
round-trip min/avg/max/stddev = 11.2/13.4/45.2/3.1 ms
# stddev = jitter. 3.1ms = good. 30ms = bad for video calls.`}
      </CodeBlock>

      <H2>traceroute / tracert — Every router on the path</H2>

      <Para>
        <Code>traceroute</Code> (macOS/Linux) or <Code>tracert</Code> (Windows) shows every router hop between you and a destination, and the latency to each hop. It exploits the TTL field — sends packets with TTL=1 (dies at first router), then TTL=2 (dies at second), and so on, collecting the IP and latency of each hop.
      </Para>

      <CodeBlock title="traceroute example">
        {`$ traceroute google.com
traceroute to google.com (142.250.182.4)
 1  192.168.1.1          1.2 ms   # Your home router
 2  10.8.32.1            5.1 ms   # Your ISP's first router
 3  125.16.8.17          8.3 ms   # ISP backbone
 4  72.14.204.85         15.2 ms  # Google's network (AS15169 = Google)
 5  142.250.182.4        16.1 ms  # Google's edge server

 * * * means the router didn't reply (firewalled) but packets pass through`}
      </CodeBlock>

      <H2>dig — DNS debugging</H2>

      <Para>
        <Code>dig</Code> (Domain Information Groper) queries DNS servers and shows you the raw response, including TTL, record type, and which server answered. Every backend developer should know this command.
      </Para>

      <CodeBlock title="dig examples">
        {`$ dig google.com
;; ANSWER SECTION:
google.com.    300  IN  A  142.250.182.4
# TTL=300s, A record (IPv4), IP address

$ dig google.com MX        # Mail servers for google.com
$ dig google.com NS        # Authoritative name servers
$ dig @8.8.8.8 google.com  # Use Google's DNS instead of default
$ dig +trace google.com    # Full resolution chain (root → TLD → authoritative)
$ dig -x 142.250.182.4     # Reverse lookup: IP → domain name`}
      </CodeBlock>

      <H2>curl — Making HTTP requests from the command line</H2>

      <Para>
        <Code>curl</Code> is the Swiss Army knife of HTTP — you can make any kind of request, set headers, inspect responses, measure timing, and test APIs.
      </Para>

      <CodeBlock title="curl examples">
        {`# Basic GET request
$ curl https://httpbin.org/get

# See response headers only
$ curl -I https://google.com

# Detailed timing breakdown (invaluable for debugging)
$ curl -w "DNS: %{time_namelookup}s | TCP: %{time_connect}s | TLS: %{time_appconnect}s | Total: %{time_total}s\n" -o /dev/null -s https://google.com
DNS: 0.012s | TCP: 0.024s | TLS: 0.056s | Total: 0.089s

# POST with JSON body
$ curl -X POST https://api.example.com/data \\
  -H "Content-Type: application/json" \\
  -d '{"key": "value"}'

# Follow redirects and show all verbose headers
$ curl -L -v https://google.com 2>&1 | head -50`}
      </CodeBlock>

      <H2>ss / netstat — What's happening on your machine right now</H2>

      <CodeBlock title="ss examples (macOS: use netstat -an)">
        {`$ ss -tuln
# -t TCP, -u UDP, -l listening, -n don't resolve hostnames
Netid  State   Recv-Q  Send-Q  Local Address:Port  Peer Address:Port
tcp    LISTEN  0       128     0.0.0.0:22           0.0.0.0:*     # SSH server
tcp    LISTEN  0       511     0.0.0.0:80           0.0.0.0:*     # HTTP server
tcp    LISTEN  0       511     0.0.0.0:443          0.0.0.0:*     # HTTPS server

$ ss -tnp    # Show which process owns each connection
$ ss -s      # Summary statistics (established, time-wait, etc.)`}
      </CodeBlock>

      <Divider />

      {/* ── CHAPTER 11: Troubleshooting Methodology ────────────────────── */}
      <Chapter
        n="11"
        title="Troubleshooting — How to Systematically Debug Any Network Problem"
        subtitle="The OSI model isn't just theory — it's a debugging framework used by every network engineer."
      />

      <StoryBox>
        A developer at 2 AM: "The website is down!" But why? Is the server off? Is DNS broken? Is the network unreachable? Did a certificate expire? Is there a firewall rule? Is the application crashing? Without a systematic approach, you would guess randomly and waste hours. The OSI model gives you a bottom-up debugging methodology.
      </StoryBox>

      <Para>
        When something does not work, always start at <Accent>Layer 1 (Physical)</Accent> and work your way up. Confirming each layer is working before checking the next prevents you from debugging application code when the problem is actually a bad ethernet cable.
      </Para>

      <div style={{ margin: '24px 0' }}>
        {[
          { layer: 'L1 Physical', check: 'Is the cable plugged in? Is WiFi enabled? Any link lights?', cmd: 'ip link show / ifconfig / Check indicator LEDs', color: '#f472b6' },
          { layer: 'L2 Data Link', check: 'Can I see my own IP? Is the network interface up?', cmd: 'ip addr show / ifconfig / ipconfig /all', color: '#fbbf24' },
          { layer: 'L3 Network', check: 'Can I reach the default gateway (router)?', cmd: "ping 192.168.1.1 (your router's IP)", color: '#60a5fa' },
          { layer: 'L3 Internet', check: 'Can I reach a public IP (bypass DNS)?', cmd: 'ping 8.8.8.8 (if this works, it is a DNS issue)', color: '#60a5fa' },
          { layer: 'L7 DNS', check: 'Can I resolve domain names?', cmd: 'dig google.com / nslookup google.com', color: '#a78bfa' },
          { layer: 'L7 Application', check: 'Can I make an HTTP connection?', cmd: 'curl -v https://google.com / curl -I https://yoursite.com', color: G },
        ].map(row => (
          <div key={row.layer} style={{ display: 'flex', gap: 14, marginBottom: 8, padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${row.color}`, borderRadius: '0 10px 10px 0' }}>
            <div style={{ minWidth: 100, fontSize: 12, fontFamily: FONT_MONO, fontWeight: 700, color: row.color, flexShrink: 0 }}>{row.layer}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{row.check}</div>
              <code style={{ fontSize: 12, color: 'var(--muted)', fontFamily: FONT_MONO }}>{row.cmd}</code>
            </div>
          </div>
        ))}
      </div>

      <H2>Common Failures and Their Signatures</H2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12, margin: '20px 0' }}>
        {[
          { symptom: "Browser says 'site can't be reached'", cause: 'DNS failure OR no network connectivity', fix: 'Try ping 8.8.8.8 (network OK?) then dig domain (DNS OK?)' },
          { symptom: 'SSL certificate error', cause: 'Expired cert, wrong domain, or self-signed', fix: 'openssl s_client -connect host:443 to see the cert details' },
          { symptom: 'Connection refused', cause: 'Server is up, but nothing is listening on that port', fix: 'ss -tuln on server to see what ports are open' },
          { symptom: 'Connection timed out', cause: 'Firewall dropping packets silently (vs. rejecting them)', fix: 'traceroute to see where packets stop. Check iptables/security groups.' },
          { symptom: '502 Bad Gateway', cause: "Nginx/load balancer can't reach the upstream app server", fix: 'Check if app server is running (systemctl status), check app logs' },
          { symptom: 'High latency to server', cause: 'Congestion, bufferbloat, or wrong CDN region serving you', fix: 'traceroute to find the slow hop. curl --timing to isolate DNS/TCP/TLS' },
        ].map(item => (
          <div key={item.symptom} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#f87171', marginBottom: 6 }}>🔴 {item.symptom}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}><strong style={{ color: 'var(--text)' }}>Likely cause:</strong> {item.cause}</div>
            <div style={{ fontSize: 12, color: G }}><strong>Fix:</strong> {item.fix}</div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ── CHAPTER 12: Advanced Topics ────────────────────────────────── */}
      <Chapter
        n="12"
        title="Advanced Topics — Where Networking Gets Fascinating"
        subtitle="For those ready to go deeper — the mechanisms that make the internet at scale possible."
      />

      <H2>BGP — How the Internet Routes Between Networks</H2>

      <Para>
        The internet is not one network — it is ~80,000 <Accent>Autonomous Systems (ASes)</Accent>, each one managed by an organization: your ISP, Google, Cloudflare, universities, etc. Each AS has its own internal routing. Between ASes, they use <Accent>BGP (Border Gateway Protocol)</Accent> to announce which IP prefixes they can reach.
      </Para>

      <Para>
        BGP is a path vector protocol — each AS announces "I can reach X, and the path is through these ASes." This is why the internet is sometimes called "a network of networks." BGP is also notoriously fragile: in 2010, Pakistan Telecom accidentally announced it could reach YouTube's IP space, and BGP propagated this lie globally — causing YouTube to be unreachable worldwide for two hours. This is called a <Accent>BGP hijack</Accent>.
      </Para>

      <H2>Subnetting — Dividing Networks Efficiently</H2>

      <Para>
        A <Accent>subnet</Accent> is a logical subdivision of an IP network. Instead of one flat network where all 65,000 devices in a company can talk to each other directly, subnetting divides them into smaller groups. 192.168.1.0/24 means "all IPs from 192.168.1.0 to 192.168.1.255" — the /24 is the CIDR notation for "the first 24 bits are the network portion."
      </Para>

      <CodeBlock title="CIDR subnetting">
        {`Notation   Subnet Mask       # of hosts   Example range
/24        255.255.255.0     254          192.168.1.1 - 192.168.1.254
/25        255.255.255.128   126          192.168.1.1 - 192.168.1.126
/16        255.255.0.0       65,534       10.0.0.1 - 10.0.255.254
/8         255.0.0.0         16M          10.0.0.1 - 10.255.255.254

Rule: /X means the first X bits are fixed (network address).
The remaining 32-X bits are host addresses.
First and last IPs in a subnet are reserved (network + broadcast).`}
      </CodeBlock>

      <H2>Load Balancing — Distributing Traffic Across Servers</H2>

      <Para>
        No single server can handle millions of requests per second. <Accent>Load balancers</Accent> distribute incoming traffic across a pool of servers. They check server health continuously and remove failed servers automatically. Common strategies:
      </Para>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '16px 0 28px' }}>
        {[
          { name: 'Round Robin', desc: 'Request 1 → Server 1, Request 2 → Server 2, Request 3 → Server 3, back to Server 1. Simple, equal distribution. Does not account for server load.' },
          { name: 'Least Connections', desc: 'Routes each new request to the server with fewest active connections. Better for requests with variable processing time.' },
          { name: 'IP Hash / Sticky Sessions', desc: 'Always routes the same client IP to the same server. Required for stateful applications that store session data locally.' },
          { name: 'Weighted', desc: 'Different servers get different proportions of traffic based on their capacity. A server with 4x the RAM might get 4x the traffic.' },
        ].map(item => (
          <div key={item.name} style={{ display: 'flex', gap: 12, padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }}>
            <code style={{ fontSize: 12, color: G, background: `${G}15`, padding: '3px 8px', borderRadius: 5, fontFamily: FONT_MONO, flexShrink: 0, height: 'fit-content', marginTop: 2 }}>{item.name}</code>
            <span style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.75 }}>{item.desc}</span>
          </div>
        ))}
      </div>

      <H2>WebSockets — Real-Time Bidirectional Communication</H2>

      <Para>
        Regular HTTP is request-response: you ask, the server answers, connection closes. For real-time apps (chat, live dashboards, multiplayer games), you need the server to push data to you without you asking. <Accent>WebSockets</Accent> solve this by upgrading an HTTP connection to a persistent, bidirectional channel. Both sides can send messages at any time.
      </Para>

      <CodeBlock title="WebSocket upgrade handshake">
        {`Client → Server (HTTP):
GET /chat HTTP/1.1
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==

Server → Client:
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=

→ Now both sides can send frames at any time. No more polling.
→ Used by: Slack, Discord, WhatsApp Web, trading platforms, live sports scores`}
      </CodeBlock>

      <Divider />

      {/* ── CHAPTER 13: Interview Questions ────────────────────────────── */}
      <Chapter
        n="13"
        title="Interview Questions — Test Your Understanding"
        subtitle="From entry-level to research-level. Each answer reveals a deeper layer of how networks actually work."
      />

      <IQ q="What is the difference between a switch and a router?" level="Beginner">
        A <strong>switch</strong> operates at Layer 2 (Data Link) and connects devices within the same network using MAC addresses. When your laptop sends data to your printer on the same WiFi, the switch handles it locally — no routing needed. A <strong>router</strong> operates at Layer 3 (Network) and connects different networks using IP addresses. It routes traffic between your home network and the internet. Most home "routers" are actually router + switch + WiFi access point combined in one box.
      </IQ>

      <IQ q="What happens when you type google.com in a browser and press Enter?" level="Beginner">
        The complete sequence: (1) Browser checks DNS cache for google.com's IP. If not found, queries the OS cache, then your router/ISP's resolver, then performs a full recursive DNS lookup through root → TLD → Google's authoritative DNS. (2) Browser initiates a TCP connection to port 443 (3-way handshake: SYN, SYN-ACK, ACK). (3) TLS handshake: browser verifies Google's certificate, negotiates encryption keys. (4) Browser sends HTTP GET request. (5) Google's servers process it and return an HTTP response with HTML. (6) Browser parses HTML, discovers additional resources (CSS, JS, images), makes additional requests for each. (7) Browser executes JS, applies styles, renders pixels. Total time: 200–500ms for a first visit.
      </IQ>

      <IQ q="What's the difference between TCP and UDP? When would you use each?" level="Beginner">
        TCP provides reliable, ordered delivery with flow control and congestion control — every packet is acknowledged, and lost packets are retransmitted. UDP provides fast, connectionless transmission with no guarantees — packets may be lost, reordered, or duplicated. Use TCP for anything that needs completeness and accuracy: web pages, email, file transfers, database connections, SSH. Use UDP for anything where speed matters more than perfection: video calls (a lost packet means a glitch, not a freeze), DNS queries (small, fast, retried at the application layer if needed), online gaming, live streaming, and QUIC (HTTP/3).
      </IQ>

      <IQ q="What is NAT and why was it invented?" level="Intermediate">
        NAT (Network Address Translation) allows multiple devices with private IP addresses to share a single public IP address. It was invented as a stopgap solution to IPv4 address exhaustion (only 4.3 billion addresses for billions of devices). The router maintains a translation table mapping private IP:port pairs to public IP:port pairs. When a private device sends a packet, NAT rewrites the source IP/port to the public address and records the mapping. When the response arrives, NAT looks up the mapping and rewrites the destination back to the private address. NAT has side effects: it breaks some protocols (like FTP active mode, SIP, IPsec) that embed IP addresses in the payload, complicates peer-to-peer connections, and requires techniques like STUN/TURN/ICE for WebRTC to work behind NAT.
      </IQ>

      <IQ q="Explain DNS resolution in detail. What is a TTL and what happens when it expires?" level="Intermediate">
        DNS resolution follows a hierarchical tree: Recursive resolver (your ISP or 8.8.8.8) → Root nameservers (13 logical roots, ~1,000 anycast instances) → TLD nameservers (.com, .org, .in) → Authoritative nameservers (the domain owner's DNS). Each DNS record has a TTL (Time To Live) in seconds. Resolvers cache records for their TTL duration — if TTL=300, the record is cached for 5 minutes and then discarded. After expiration, the next query triggers a fresh lookup. Short TTLs (60s) enable faster DNS changes during migrations. Long TTLs (3600s) reduce DNS query load and improve performance. Propagation delay: when you change a DNS record, old TTL-cached records persist until they expire — this is why "DNS propagation" can take hours if you had a long TTL.
      </IQ>

      <IQ q="What is the Bandwidth-Delay Product and how does it affect TCP throughput?" level="Senior">
        The Bandwidth-Delay Product (BDP) = bandwidth × round-trip time. It represents the amount of data "in flight" in the network at any moment — the pipeline capacity. TCP's congestion window limits how much unacknowledged data can be in flight simultaneously. If the congestion window is smaller than the BDP, TCP is underutilizing the available bandwidth — it transmits, then sits idle waiting for ACKs before sending more. To saturate a 10 Gbps link with 100ms RTT, the congestion window must be at least 10Gbps × 0.1s = 125 MB. TCP's slow start begins with a small window and grows exponentially until it detects congestion. For long-distance, high-bandwidth links (satellite, transoceanic fiber), this slow start phase can significantly limit throughput. Solutions include BBR (Bottleneck Bandwidth and RTT) congestion control used by Google, TCP window scaling (RFC 7323), and QUIC which can be more aggressively tuned.
      </IQ>

      <IQ q="How does TLS 1.3 differ from TLS 1.2, and what are the security implications of forward secrecy?" level="Senior">
        TLS 1.3 made three major improvements over TLS 1.2: (1) Handshake reduced from 2 round trips to 1 (0-RTT for session resumption). TLS 1.3 removes non-forward-secret cipher suites (RSA key exchange) and mandates ECDHE/DHE. (2) Forward secrecy (Perfect Forward Secrecy / PFS) is mandatory. In TLS 1.2 with RSA key exchange, the client encrypted the pre-master secret with the server's long-term RSA key — if that key is compromised later, all past sessions can be decrypted. TLS 1.3 uses ephemeral Diffie-Hellman: fresh key pairs are generated per-session, and private keys are immediately discarded after use. Compromising the server's certificate key doesn't decrypt any past sessions. (3) Removed weak algorithms: RC4, 3DES, MD5, SHA-1, RSA key exchange. Only AES-128-GCM, AES-256-GCM, and ChaCha20-Poly1305 are allowed. Security implication: large-scale passive surveillance becomes infeasible even if an attacker records all encrypted traffic today hoping to break it later.
      </IQ>

      <IQ q="Describe the QUIC protocol architecture. What problems does it solve that TCP + TLS could not?" level="PhD">
        QUIC (originally Google QUIC, now IETF RFC 9000) is a general-purpose transport protocol built on UDP that reimplements and improves upon TCP + TLS. Core problems it solves: (1) Head-of-line blocking: HTTP/2 multiplexes multiple streams over one TCP connection, but a single lost packet stalls all streams (TCP must deliver data in order). QUIC implements stream multiplexing at the transport layer — a lost packet only blocks the affected stream, not others. (2) Connection migration: TCP connections are identified by the 4-tuple (src IP, src port, dst IP, dst port). If your IP changes (switching from WiFi to LTE), the TCP connection breaks. QUIC uses connection IDs independent of IP — connections survive network transitions. (3) 0-RTT resumption: returning clients can send application data in the first packet (no handshake delay). (4) Integrated TLS: QUIC integrates TLS 1.3 into the handshake — connection establishment and key exchange happen simultaneously. (5) Loss detection improvements: QUIC uses explicit packet numbers (not sequence numbers) and separate ACK streams, enabling more precise RTT measurement and faster loss detection. (6) Congestion control flexibility: QUIC makes it easier to deploy new congestion control algorithms (BBR, CUBIC) without OS-level kernel changes. Deployed in: Google Search, YouTube, Cloudflare, Meta, and HTTP/3.
      </IQ>

      <Divider />

      {/* ── KEY TAKEAWAYS ───────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        "A network is two or more devices that can exchange data — from Bluetooth earphones to the global internet. All networks connect, transfer, and follow protocols.",
        "Packet switching breaks data into small chunks that travel independently and are reassembled at the destination — enabling the internet's fault tolerance, efficiency, and scale.",
        "TCP provides reliable, ordered delivery (used for web, email, files). UDP is fast but unreliable (used for video calls, gaming, DNS). HTTP/3 (QUIC) combines UDP's speed with application-layer reliability.",
        "Every IP packet carries source and destination IPs end-to-end. MAC addresses handle local delivery and change at every router hop. NAT lets millions of private IPs share one public IP.",
        "DNS translates domain names to IP addresses through a hierarchy: root → TLD → authoritative. Responses are cached by TTL. DNS is critical infrastructure — broken DNS equals broken internet.",
        "Bandwidth = how much data per second (pipe width). Latency = how long data takes to travel (pipe length). For downloads, maximize bandwidth. For interactive apps, minimize latency.",
        "HTTPS = HTTP + TLS. TLS authenticates the server via certificates, encrypts all data with AES-256, and ensures integrity via HMAC. TLS 1.3 mandates forward secrecy — past sessions cannot be decrypted even if keys are stolen later.",
        "Troubleshoot network issues bottom-up: Physical → Link → Network (ping router) → Internet (ping 8.8.8.8) → DNS (dig) → Application (curl). Confirm each layer works before checking the next.",
      ]} />

    </LearnLayout>
  )
}
