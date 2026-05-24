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

// ─── Interactive 1: TCP/IP vs OSI Comparator ─────────────────────────────────

const OSI_LAYERS = [
  { n: 7, name: 'Application',  color: '#10b981', tcpip: 'Application' },
  { n: 6, name: 'Presentation', color: '#06b6d4', tcpip: 'Application' },
  { n: 5, name: 'Session',      color: '#8b5cf6', tcpip: 'Application' },
  { n: 4, name: 'Transport',    color: '#f97316', tcpip: 'Transport' },
  { n: 3, name: 'Network',      color: '#3b82f6', tcpip: 'Internet' },
  { n: 2, name: 'Data Link',    color: '#ef4444', tcpip: 'Network Access' },
  { n: 1, name: 'Physical',     color: '#94a3b8', tcpip: 'Network Access' },
]

const TCPIP_LAYERS = [
  {
    name: 'Application',
    color: '#10b981',
    osiLayers: [7, 6, 5],
    protocols: 'HTTP/S, FTP, SSH, SMTP, IMAP, DNS, SNMP, Telnet, SIP, DHCP',
    job: 'Everything the user and application interact with — browsing, email, file transfer, name resolution. Combines what OSI separates into Application, Presentation, and Session.',
    example: 'Your browser sending GET /index.html HTTP/1.1\\r\\nHost: google.com',
    rfc: 'RFC 1122 §4',
  },
  {
    name: 'Transport',
    color: '#f97316',
    osiLayers: [4],
    protocols: 'TCP (RFC 793), UDP (RFC 768), SCTP (RFC 4960)',
    job: 'Process-to-process delivery using port numbers. TCP adds reliability (3-way handshake, sequencing, retransmission, flow/congestion control). UDP adds speed without guarantees.',
    example: 'TCP SYN to port 443, starting a TLS handshake to establish a secure connection.',
    rfc: 'RFC 793, 768',
  },
  {
    name: 'Internet',
    color: '#3b82f6',
    osiLayers: [3],
    protocols: 'IPv4 (RFC 791), IPv6 (RFC 8200), ICMP (RFC 792), ARP (RFC 826), OSPF, BGP',
    job: 'Logical addressing and routing across networks. IP packets find their path through routers worldwide. ICMP handles diagnostics (ping, traceroute). Originally called "Internet" because it defines the internet itself.',
    example: 'Router in Frankfurt reading destination IP 142.250.182.14 and forwarding to next hop toward Google.',
    rfc: 'RFC 791, 792',
  },
  {
    name: 'Network Access',
    color: '#ef4444',
    osiLayers: [2, 1],
    protocols: 'Ethernet (802.3), Wi-Fi (802.11), PPP, DSL, cable, fiber, DOCSIS',
    job: 'Physical transmission on a single link — cables, radio waves, and the framing needed to put bits on that medium. Combines OSI Data Link and Physical. TCP/IP intentionally leaves this mostly to existing standards.',
    example: 'Your Wi-Fi NIC encoding IP packets as 802.11 radio frames on 5 GHz channel 149.',
    rfc: 'RFC 1122 §2',
  },
]

function ModelComparator() {
  const [hoveredTcpip, setHoveredTcpip] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const active = selected || hoveredTcpip
  const layer = TCPIP_LAYERS.find(l => l.name === active)

  return (
    <div style={{ margin: '28px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 0, alignItems: 'stretch', background: '#080d18', border: '1px solid #1e293b', borderRadius: 14, overflow: 'hidden' }}>
        {/* OSI column */}
        <div>
          <div style={{ padding: '12px 16px', background: '#0d1525', borderBottom: '1px solid #1e293b', textAlign: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#64748b', fontFamily: 'monospace', letterSpacing: '.1em' }}>OSI MODEL (7 Layers)</span>
          </div>
          {OSI_LAYERS.map(l => {
            const isHighlighted = active && TCPIP_LAYERS.find(t => t.name === active)?.osiLayers.includes(l.n)
            return (
              <div key={l.n} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px',
                borderBottom: '1px solid #1e293b',
                background: isHighlighted ? `${l.color}12` : 'transparent',
                transition: 'background .2s',
              }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: l.color, fontFamily: 'monospace', minWidth: 18 }}>L{l.n}</span>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: l.color, opacity: isHighlighted ? 1 : 0.35, flexShrink: 0, transition: 'opacity .2s' }} />
                <span style={{ fontSize: 13, color: isHighlighted ? l.color : '#64748b', fontWeight: isHighlighted ? 700 : 400, transition: 'color .2s' }}>{l.name}</span>
              </div>
            )
          })}
        </div>

        {/* Arrow column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 12px', background: '#0a0f1e', borderLeft: '1px solid #1e293b', borderRight: '1px solid #1e293b' }}>
          {['⟵', '⟶'].map((a, i) => (
            <div key={i} style={{ fontSize: 18, color: '#334155', lineHeight: 1.2 }}>{a}</div>
          ))}
        </div>

        {/* TCP/IP column */}
        <div>
          <div style={{ padding: '12px 16px', background: '#0d1525', borderBottom: '1px solid #1e293b', textAlign: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#64748b', fontFamily: 'monospace', letterSpacing: '.1em' }}>TCP/IP MODEL (4 Layers)</span>
          </div>
          {TCPIP_LAYERS.map(l => (
            <div
              key={l.name}
              onClick={() => setSelected(selected === l.name ? null : l.name)}
              onMouseEnter={() => setHoveredTcpip(l.name)}
              onMouseLeave={() => setHoveredTcpip(null)}
              style={{
                padding: l.name === 'Application' ? '27px 16px' : l.name === 'Network Access' ? '18px 16px' : '9px 16px',
                borderBottom: '1px solid #1e293b',
                cursor: 'pointer',
                background: active === l.name ? `${l.color}18` : 'transparent',
                transition: 'background .2s',
                display: 'flex', alignItems: 'center', gap: 10,
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: 3, background: l.color, opacity: active === l.name ? 1 : 0.4, flexShrink: 0, transition: 'opacity .2s' }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: active === l.name ? l.color : '#94a3b8', transition: 'color .2s' }}>{l.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      {layer && (
        <div style={{ marginTop: 12, background: `${layer.color}0a`, border: `1px solid ${layer.color}30`, borderRadius: 12, padding: '20px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <span style={{ fontWeight: 800, fontSize: 15, color: layer.color }}>{layer.name} Layer</span>
            <span style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace' }}>Maps to OSI L{layer.osiLayers.join(', ')}</span>
            <span style={{ fontSize: 10, color: layer.color, background: `${layer.color}18`, border: `1px solid ${layer.color}30`, borderRadius: 10, padding: '2px 8px', fontFamily: 'monospace' }}>{layer.rfc}</span>
          </div>
          <p style={{ fontSize: 13.5, color: '#cbd5e1', lineHeight: 1.8, margin: '0 0 12px' }}>{layer.job}</p>
          <div style={{ fontSize: 12, color: '#64748b', fontFamily: 'monospace', marginBottom: 10 }}>
            <span style={{ color: '#475569' }}>Protocols: </span>{layer.protocols}
          </div>
          <div style={{ fontSize: 12, background: '#0d1525', border: '1px solid #1e293b', borderRadius: 8, padding: '10px 14px', fontFamily: 'monospace', color: '#94a3b8' }}>
            <span style={{ color: '#475569' }}>Example: </span>{layer.example}
          </div>
        </div>
      )}
      {!layer && (
        <div style={{ marginTop: 10, textAlign: 'center', fontSize: 12, color: '#334155', fontFamily: 'monospace' }}>
          hover or click a TCP/IP layer to see the mapping
        </div>
      )}
    </div>
  )
}

// ─── Interactive 2: Protocol Stack Tracer ─────────────────────────────────────

const PROTOCOL_STACKS: Record<string, {
  color: string
  description: string
  layers: { name: string; color: string; detail: string; header: string }[]
}> = {
  'HTTPS (Web)': {
    color: '#10b981',
    description: 'Loading a web page over encrypted HTTPS — the most common internet action.',
    layers: [
      { name: 'Application', color: '#10b981', detail: 'Browser constructs HTTP/1.1 GET request: "GET /index.html HTTP/1.1\\r\\nHost: example.com\\r\\nAccept: text/html"', header: 'HTTP GET request (~500 bytes)' },
      { name: 'Transport', color: '#f97316', detail: 'TCP ensures reliable delivery. TLS 1.3 handshake happens here (inside TCP). Data split into segments of up to 1,460 bytes, each sequenced and acknowledged.', header: 'TCP/TLS segment: Src:54321 → Dst:443' },
      { name: 'Internet', color: '#3b82f6', detail: 'IP header added: Src IP (your machine), Dst IP (server). TTL=64. If the packet crosses many routers, TTL decrements at each hop to prevent infinite loops.', header: 'IP packet: 192.168.1.50 → 93.184.216.34' },
      { name: 'Network Access', color: '#ef4444', detail: 'Ethernet frame wraps everything. Dst MAC = your gateway\'s MAC (from ARP). CRC appended for error detection. Frame sent as voltage pulses on Cat6 or radio waves on Wi-Fi.', header: 'Ethernet frame: MAC → gateway MAC' },
    ],
  },
  'DNS Query': {
    color: '#06b6d4',
    description: 'Resolving a domain name to an IP — happens before almost every web connection.',
    layers: [
      { name: 'Application', color: '#10b981', detail: 'DNS query built: Question type=A, name="example.com". UDP preferred for speed (< 512 bytes). DNSSEC adds digital signatures. DNS-over-HTTPS wraps this in HTTPS for privacy.', header: 'DNS Query: A? example.com (28 bytes)' },
      { name: 'Transport', color: '#f97316', detail: 'UDP port 53. No handshake — just fire and wait 500ms for response. If lost, retry. TCP port 53 used if response exceeds 512 bytes (zone transfers, DNSSEC).', header: 'UDP: Src:random → Dst:53, no connection' },
      { name: 'Internet', color: '#3b82f6', detail: 'Destination IP = your DNS server (typically 8.8.8.8 or 1.1.1.1). Query may traverse 3-4 routers before reaching resolver. ICMP error if router drops the packet.', header: 'IP: yourIP → 8.8.8.8, TTL=64' },
      { name: 'Network Access', color: '#ef4444', detail: 'Tiny 60-byte Ethernet frame. Entire DNS query + all headers fits in a single frame. CRC computed over the entire frame for integrity.', header: 'Ethernet frame: ~60 bytes total' },
    ],
  },
  'SSH Session': {
    color: '#8b5cf6',
    description: 'Establishing a secure remote shell — how sysadmins and engineers manage servers.',
    layers: [
      { name: 'Application', color: '#10b981', detail: 'SSH protocol: version exchange, key exchange (ECDH), server authentication (RSA/ED25519 host key), client authentication (password or public key). Interactive shell data encrypted with ChaCha20-Poly1305.', header: 'SSH: version exchange, kex, encrypted shell' },
      { name: 'Transport', color: '#f97316', detail: 'TCP provides ordered, reliable stream — crucial because a dropped keystroke would corrupt the shell session. Connection persists for the entire session duration (minutes to hours).', header: 'TCP: Src:random → Dst:22, long-lived conn' },
      { name: 'Internet', color: '#3b82f6', detail: 'IP routes each TCP segment independently. Same SSH session\'s packets may travel different routes if BGP re-converges midway — TCP re-assembles them in order.', header: 'IP: yourIP → serverIP, independent routing' },
      { name: 'Network Access', color: '#ef4444', detail: 'Each keypress = tiny 60-byte frame every time you type. Sustained data = frames back-to-back at line rate. Ethernet handles both extremes identically.', header: 'Ethernet: burst or trickle, same framing' },
    ],
  },
  'Video Call': {
    color: '#f97316',
    description: 'Real-time video — where latency kills quality and TCP is the wrong tool.',
    layers: [
      { name: 'Application', color: '#10b981', detail: 'WebRTC application: video encoded as H.264/VP9 I-frames + P-frames, audio as Opus 20ms packets. RTCP sends receiver reports every 5 seconds for adaptive bitrate. ICE/STUN/TURN for NAT traversal.', header: 'RTP: H.264 video frame, seq=43821, ts=...' },
      { name: 'Transport', color: '#f97316', detail: 'UDP, not TCP. A retransmitted video frame that arrives 200ms late is useless — better to show a corrupted frame than wait. RTP runs over UDP. QUIC (UDP-based) increasingly used.', header: 'UDP: Src:5004 → Dst:5004, fire-and-forget' },
      { name: 'Internet', color: '#3b82f6', detail: 'DSCP QoS markings (DSCP EF = Expedited Forwarding) tell routers to prioritize video packets over bulk downloads. Still no guarantee at IP layer.', header: 'IP: DSCP=EF (46), priority marking set' },
      { name: 'Network Access', color: '#ef4444', detail: 'Wi-Fi QoS (WMM) prioritizes voice/video queues. 5 GHz preferred for lower latency. A frame lost to radio interference is gone — UDP delivers nothing, app conceals with interpolation.', header: 'Wi-Fi: WMM AC_VO queue, 5 GHz band' },
    ],
  },
}

function ProtocolStackTracer() {
  const [selectedProto, setSelectedProto] = useState('HTTPS (Web)')
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null)
  const proto = PROTOCOL_STACKS[selectedProto]

  return (
    <div style={{ margin: '28px 0', background: '#080d18', border: '1px solid #1e293b', borderRadius: 14, overflow: 'hidden' }}>
      {/* Protocol selector */}
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #1e293b', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {Object.keys(PROTOCOL_STACKS).map(name => (
          <button
            key={name}
            onClick={() => { setSelectedProto(name); setSelectedLayer(null) }}
            style={{
              padding: '6px 14px', borderRadius: 20, border: `1px solid ${selectedProto === name ? PROTOCOL_STACKS[name].color : '#1e293b'}`,
              background: selectedProto === name ? `${PROTOCOL_STACKS[name].color}18` : 'transparent',
              color: selectedProto === name ? PROTOCOL_STACKS[name].color : '#64748b',
              fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'monospace',
            }}
          >{name}</button>
        ))}
      </div>

      <div style={{ padding: '18px 20px' }}>
        <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 18 }}>{proto.description}</p>

        {/* Stack visualization */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {proto.layers.map((layer, i) => (
            <div
              key={layer.name}
              onClick={() => setSelectedLayer(selectedLayer === i ? null : i)}
              style={{
                padding: '12px 16px', borderRadius: 8, cursor: 'pointer',
                background: selectedLayer === i ? `${layer.color}1a` : '#0d1525',
                border: `1px solid ${selectedLayer === i ? layer.color + '50' : '#1e293b'}`,
                transition: 'all .2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: layer.color, fontFamily: 'monospace', minWidth: 80 }}>{layer.name.toUpperCase()}</span>
                <span style={{ fontSize: 12, color: '#475569', fontFamily: 'monospace', flex: 1 }}>{layer.header}</span>
                <span style={{ fontSize: 11, color: selectedLayer === i ? layer.color : '#334155' }}>{selectedLayer === i ? '▲' : '▼'}</span>
              </div>
              {selectedLayer === i && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${layer.color}20`, fontSize: 13, color: '#cbd5e1', lineHeight: 1.75 }}>
                  {layer.detail}
                </div>
              )}
            </div>
          ))}
        </div>

        <p style={{ fontSize: 11, color: '#334155', fontFamily: 'monospace', marginTop: 12, textAlign: 'center' }}>
          click any layer to see what it adds to this protocol
        </p>
      </div>
    </div>
  )
}

// ─── Interactive 3: RFC 1122 Timeline ─────────────────────────────────────────

const TIMELINE_EVENTS = [
  { year: 1969, color: '#10b981', title: 'ARPANET Born', detail: 'First packet-switched network connects 4 universities: UCLA, Stanford, UCSB, Utah. Uses NCP (Network Control Protocol) — TCP/IP\'s predecessor. First message: "lo" (tried to send "login" but system crashed).', significance: 'Proof that packet switching works at network scale.' },
  { year: 1973, color: '#06b6d4', title: 'TCP Designed', detail: 'Vint Cerf and Bob Kahn publish "A Protocol for Packet Network Intercommunication". Original TCP handled everything — reliability, routing, flow control. One monolithic protocol.', significance: 'The paper that gave TCP/IP its core ideas: datagrams + end-to-end reliability.' },
  { year: 1978, color: '#8b5cf6', title: 'TCP/IP Split', detail: 'TCP split into two: TCP (reliability) and IP (routing). This separation — the "end-to-end principle" — is the most important architectural decision in internet history. Keeps the network simple; complexity at the endpoints.', significance: 'The 4-layer model takes shape. IP becomes "dumb", TCP becomes "smart".' },
  { year: 1981, color: '#f97316', title: 'IPv4 Finalized', detail: 'RFC 791 defines IPv4. 32-bit addresses = 4.3 billion IPs. Designers assumed that was more than enough. Nobody predicted the smartphone era. CIDR and NAT would later extend IPv4\'s life by decades.', significance: 'The addressing scheme that runs most of the internet today, 40+ years later.' },
  { year: 1983, color: '#3b82f6', title: 'Flag Day', detail: 'January 1, 1983: ARPANET switches from NCP to TCP/IP overnight — "flag day". Every connected machine must upgrade simultaneously. Considered the official "birthday" of the modern internet.', significance: 'TCP/IP becomes the universal language of the internet.' },
  { year: 1989, color: '#ef4444', title: 'RFC 1122', detail: 'RFC 1122 "Requirements for Internet Hosts — Communication Layers" formalizes TCP/IP architecture. Defines the 4-layer model explicitly and specifies which layer is responsible for what. Still the authoritative reference.', significance: 'TCP/IP gets its official spec — the document that defines the model we study today.' },
  { year: 1998, color: '#ec4899', title: 'IPv6 Born', detail: 'RFC 2460 defines IPv6 with 128-bit addresses = 340 undecillion IPs. Also adds auto-configuration, built-in IPSec, flow labels for QoS. Transition from IPv4 takes decades — most networks run dual-stack today.', significance: 'The long-term solution to IPv4 exhaustion, still being deployed globally.' },
  { year: 2020, color: '#a855f7', title: 'QUIC Standardized', detail: 'RFC 9000: QUIC becomes a new Transport-layer protocol over UDP. 0-RTT connection setup, multiplexed streams without head-of-line blocking, connection migration across IPs. Used by HTTP/3.', significance: 'The TCP/IP model gains a third transport option — the first major change in 40 years.' },
]

function HistoryTimeline() {
  const [selected, setSelected] = useState<number | null>(0)
  const ev = selected !== null ? TIMELINE_EVENTS[selected] : null

  return (
    <div style={{ margin: '28px 0' }}>
      {/* Timeline bar */}
      <div style={{ display: 'flex', overflowX: 'auto', paddingBottom: 8, gap: 0, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 20, left: 0, right: 0, height: 2, background: '#1e293b', zIndex: 0 }} />
        {TIMELINE_EVENTS.map((e, i) => (
          <div
            key={e.year}
            onClick={() => setSelected(selected === i ? null : i)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 90, cursor: 'pointer', position: 'relative', zIndex: 1 }}
          >
            <div style={{
              width: 14, height: 14, borderRadius: '50%',
              background: selected === i ? e.color : '#1e293b',
              border: `2px solid ${e.color}`,
              transition: 'background .2s',
              boxShadow: selected === i ? `0 0 12px ${e.color}80` : 'none',
            }} />
            <span style={{ fontSize: 10, color: selected === i ? e.color : '#475569', fontFamily: 'monospace', marginTop: 6, fontWeight: selected === i ? 800 : 400 }}>{e.year}</span>
          </div>
        ))}
      </div>

      {/* Event detail */}
      {ev && (
        <div style={{ marginTop: 18, background: `${ev.color}0a`, border: `1px solid ${ev.color}30`, borderRadius: 12, padding: '20px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10 }}>
            <span style={{ fontWeight: 900, fontSize: 16, color: ev.color }}>{ev.title}</span>
            <span style={{ fontSize: 12, color: '#475569', fontFamily: 'monospace' }}>{ev.year}</span>
          </div>
          <p style={{ fontSize: 13.5, color: '#cbd5e1', lineHeight: 1.8, margin: '0 0 12px' }}>{ev.detail}</p>
          <div style={{ fontSize: 12, color: ev.color, background: `${ev.color}10`, border: `1px solid ${ev.color}20`, borderRadius: 8, padding: '8px 12px', fontStyle: 'italic' }}>
            Why it matters: {ev.significance}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Module ────────────────────────────────────────────────────────────────────

export default function TcpIpModelPage() {
  return (
    <LearnLayout
      title="The TCP/IP Model"
      description="The architectural blueprint of the internet — four layers that have powered global communication for 40 years, from ARPANET to 5G."
      section="Networking Fundamentals — Module 04"
      readTime="25–35 min"
      updatedAt="May 2026"
    >
      {/* ── Chapter 01 ── */}
      <Chapter n={1} title="The Protocol War Nobody Remembers" />

      <StoryBox>
        It&apos;s 1980. You work at a bank in Frankfurt. Your computers use SNA — IBM&apos;s proprietary network architecture.
        Your partner bank in London runs DECnet. Your clearing house in Zurich speaks X.25.
        None of them can talk to each other without expensive, custom translation boxes.
        Every vendor has their own incompatible networking stack. The internet doesn&apos;t exist yet.
        It&apos;s a Tower of Babel, and every cable is a wall.
      </StoryBox>

      <Para>
        Two different solutions emerged to fix this chaos. The International Standards Organization (ISO) designed a
        perfect, theoretically elegant 7-layer model called OSI — Open Systems Interconnection. Meanwhile, the
        US Department of Defense funded a scrappy, practical protocol suite called TCP/IP that actually ran on
        real networks connecting real universities and research labs.
      </Para>

      <Para>
        OSI won the standards battle. TCP/IP won the internet.
      </Para>

      <WowBox>
        The OSI model took 7 years to standardize (1977–1984). TCP/IP took 2 years to design and was already
        running on ARPANET while ISO was still debating committee procedures. By the time OSI was finalized,
        TCP/IP had a 10-year head start in real deployments.
      </WowBox>

      <Para>
        Today, <Accent>TCP/IP is the internet</Accent>. OSI is the teaching model — the perfect map that describes
        the territory. TCP/IP is the territory itself. Understanding both is essential: OSI gives you the vocabulary
        to think about networking, TCP/IP gives you the actual mechanics of how every packet you send actually moves.
      </Para>

      <Divider />

      {/* ── Chapter 02 ── */}
      <Chapter n={2} title="ARPANET to the Internet: A 14-Year Sprint" />

      <Para>
        The story of TCP/IP is the story of the internet itself — a sequence of decisions made under real constraints
        by researchers who couldn&apos;t predict what they were building would become the backbone of civilization.
      </Para>

      <HistoryTimeline />

      <H2>The End-to-End Principle</H2>

      <Para>
        The most important design decision in TCP/IP is one most engineers never learn explicitly:
        the <Accent>end-to-end principle</Accent>, articulated by Saltzer, Reed, and Clark in 1981.
      </Para>

      <StoryBox>
        The idea: the network itself should be as simple as possible — just move packets from A to B.
        All intelligence (reliability, ordering, error correction) should live at the endpoints — the computers
        sending and receiving. Routers should do one thing: forward packets toward the destination.
        They should not guarantee delivery, fix errors, or maintain state. The TCP at the endpoint handles all of that.
      </StoryBox>

      <Para>
        This is why the internet is so resilient. Routers can fail, paths can change, entire datacenters can
        go offline — and TCP just retransmits from the endpoints. The network doesn&apos;t need to know or care.
        Compare this to telephone networks where the switch (the network) maintained the entire circuit state.
        When a telephone switch failed, every active call died immediately.
      </Para>

      <WowBox>
        The end-to-end principle is also why the internet can run on anything — Wi-Fi, fiber, radio, power lines,
        carrier pigeons (RFC 2549, not a joke). IP doesn&apos;t care what moves it. IP just needs to move.
      </WowBox>

      <Divider />

      {/* ── Chapter 03 ── */}
      <Chapter n={3} title="The Four-Layer Model: How It Maps to OSI" />

      <Para>
        The TCP/IP model has 4 layers. The OSI model has 7. This causes endless confusion because people
        try to find a 1:1 mapping — there isn&apos;t one. TCP/IP collapsed three OSI layers into one because
        the designers felt that distinction wasn&apos;t useful for real implementations. Click each TCP/IP layer
        to see which OSI layers it absorbs and what it actually does.
      </Para>

      <ModelComparator />

      <H2>Why the Discrepancy Exists</H2>

      <Para>
        OSI separates Application (L7), Presentation (L6), and Session (L5) into distinct layers because it
        wanted to be maximally precise about where each function lives. In practice, almost no protocol
        cleanly separates these concerns.
      </Para>

      <Para>
        HTTP handles application logic (GET requests), encoding (chunked transfer), and session management
        (HTTP/2 multiplexed streams, cookies) all in one protocol. TLS handles presentation (encryption,
        encoding). TCP handles session (connection state). The OSI model is conceptually correct but
        architecturally prescriptive in a way that real protocols don&apos;t follow.
      </Para>

      <Warn>
        When someone asks "what layer does TLS operate at?" the honest answer is: it straddles L5/L6/L7
        depending on which function you&apos;re asking about. TCP/IP sidesteps this by having a single Application
        layer that says "figure it out yourself". This is pragmatic, not sloppy.
      </Warn>

      <H2>Quick Reference: Every Layer in One Table</H2>

      <CodeBlock>{`Layer           | Protocols          | PDU      | Addr. Used | Device
─────────────────────────────────────────────────────────────────────
Application     | HTTP,DNS,SSH,SMTP  | Message  | None       | Hosts
Transport       | TCP, UDP, SCTP     | Segment  | Port #     | LB/Firewall
Internet        | IP, ICMP, ARP      | Packet   | IP address | Routers
Network Access  | Ethernet, Wi-Fi    | Frame    | MAC addr   | Switch/NIC`}</CodeBlock>

      <Divider />

      {/* ── Chapter 04 ── */}
      <Chapter n={4} title="Application Layer: The Protocol You Actually See" />

      <Para>
        The TCP/IP Application layer is the only layer your code ever touches directly. Every socket, every
        HTTP call, every database connection — all application layer. It combines what OSI splits into three
        layers (5, 6, 7) because those boundaries rarely matter in implementation.
      </Para>

      <H2>Application Layer Protocols at a Glance</H2>

      <CodeBlock>{`Protocol  Port     Transport  Description
────────────────────────────────────────────────────────────────────
HTTP      80       TCP        Web — plaintext (deprecated for public use)
HTTPS     443      TCP/UDP    Web — TLS-encrypted (HTTP/3 uses QUIC/UDP)
DNS       53       UDP+TCP    Name resolution: domain → IP
SSH       22       TCP        Secure remote shell and file transfer
SMTP      25,587   TCP        Email submission and relay
IMAP      993      TCP        Email retrieval (SSL)
FTP       21,20    TCP        File transfer (control + data channels)
DHCP      67,68    UDP        IP address assignment
SNMP      161,162  UDP        Network device management
NTP       123      UDP        Clock synchronization (sub-millisecond)
BGP       179      TCP        Internet routing between ASes`}</CodeBlock>

      <H3>What "Application Layer" Actually Means</H3>

      <Para>
        The Application layer is not where your application lives. It&apos;s where the <Accent>interface between
        your application and the network</Accent> lives. Your Python Flask app is not the Application layer.
        The HTTP protocol that Flask uses to communicate over the network — that&apos;s the Application layer.
      </Para>

      <StoryBox>
        Think of it this way: when you speak English on a phone call, the English language is the Application
        layer. The conversation structure (who speaks when) is the Session layer. The way your voice is
        encoded for digital transmission is the Presentation layer. In TCP/IP, all three collapse into one
        because the phone protocol handles all of them without you needing to know which is which.
      </StoryBox>

      <H3>HTTP/3 and the Protocol Evolution</H3>

      <Para>
        HTTP/3 breaks the assumption that TCP/IP&apos;s Application layer always uses TCP at Transport.
        HTTP/3 runs over QUIC, which runs over UDP. This means the Application-layer protocol now
        handles its own reliability, connection setup, and multiplexing — blurring the boundary between
        Application and Transport. The 4-layer model holds, but the mapping gets fuzzy at the edges.
      </Para>

      <Divider />

      {/* ── Chapter 05 ── */}
      <Chapter n={5} title="Transport Layer: TCP vs UDP — Every Tradeoff" />

      <Para>
        The Transport layer solves two problems: <Accent>multiplexing</Accent> (how do multiple applications
        share one IP address?) and <Accent>delivery semantics</Accent> (does the app need guaranteed delivery
        or just speed?). Ports solve multiplexing. TCP and UDP offer opposite delivery guarantees.
      </Para>

      <H2>TCP: Reliability at the Cost of Speed</H2>

      <Para>
        TCP (Transmission Control Protocol, RFC 793, 1981) provides a <Accent>reliable, ordered, byte-stream</Accent> abstraction.
        From your application&apos;s perspective, TCP is a pipe — you write bytes in, they arrive at the other end
        in exactly the same order, no matter how many packets were lost and retransmitted along the way.
      </Para>

      <H3>The Three-Way Handshake</H3>

      <CodeBlock>{`  Client                          Server
    │                               │
    │──── SYN (seq=1000) ──────────▶│   Client: "I want to connect, my start seq is 1000"
    │                               │
    │◀─── SYN-ACK (seq=5000,        │   Server: "OK, my start seq is 5000,
    │          ack=1001) ───────────│            I acknowledge your seq 1000"
    │                               │
    │──── ACK (ack=5001) ──────────▶│   Client: "Got it. Connection established."
    │                               │
    │════════ DATA FLOWS ═══════════│
    │                               │
    │◀─── FIN ──────────────────────│   (4-way teardown: FIN/ACK/FIN/ACK)`}</CodeBlock>

      <Para>
        The handshake takes 1.5 round trips (1.5 × RTT) before any data can flow. For a user in Berlin
        connecting to a server in Singapore (RTT ≈ 180ms), that&apos;s 270ms of pure overhead before the
        first HTTP request byte is sent. This is why TLS 1.3 and QUIC work hard to reduce handshake RTTs.
      </Para>

      <H3>TCP Flow Control and Congestion Control</H3>

      <Para>
        TCP has two separate rate-limiting mechanisms. <Accent>Flow control</Accent> prevents a fast sender
        from overwhelming a slow receiver — the receiver advertises its buffer size (window) and the sender
        respects it. <Accent>Congestion control</Accent> prevents a sender from overwhelming the network
        itself — TCP uses Slow Start, Congestion Avoidance, and Cubic (Linux default) or BBR (Google&apos;s
        algorithm, used by YouTube, Google Cloud) to probe for available bandwidth without causing collapse.
      </Para>

      <WowBox>
        TCP&apos;s congestion control is one of the most important algorithms in computer science. In 1988, a
        congestion collapse on the ARPANET reduced throughput to 1/1000th of normal. Van Jacobson wrote
        the fix in a weekend — the Jacobson congestion control algorithm. A variation still runs on every
        TCP connection today. One algorithm, written in one weekend, runs on every internet-connected device.
      </WowBox>

      <H2>UDP: Speed Without Guarantees</H2>

      <Para>
        UDP (User Datagram Protocol, RFC 768, 1980) adds exactly two things to raw IP: port numbers (so
        multiple apps can share an IP) and a checksum (so you know if the payload was corrupted). That&apos;s it.
        No connection, no sequencing, no retransmission, no flow control.
      </Para>

      <Para>
        UDP is used when: the application handles its own reliability (DNS, DHCP), latency matters more than
        reliability (video, games), or the data is so small that setup overhead dominates (DNS again).
        Modern protocols built on UDP often reimplement TCP features selectively — QUIC adds reliability
        and ordering per-stream, but not globally, avoiding head-of-line blocking.
      </Para>

      <H3>Port Number Reference</H3>

      <CodeBlock>{`Range           Category                Assignment
───────────────────────────────────────────────────────────
0 – 1023        Well-known ports        IANA-assigned (requires root)
1024 – 49151    Registered ports        Vendor-registered, no root needed
49152 – 65535   Ephemeral/dynamic       Assigned by OS for client connections

Key well-known: 80/HTTP, 443/HTTPS, 22/SSH, 25/SMTP, 53/DNS
                3306/MySQL, 5432/Postgres, 6379/Redis, 27017/MongoDB`}</CodeBlock>

      <Divider />

      {/* ── Chapter 06 ── */}
      <Chapter n={6} title="Internet Layer: IP, the Universal Language" />

      <Para>
        The Internet layer is the reason the internet exists. IP (Internet Protocol) provides a single,
        universal addressing scheme that works across any underlying physical network — Ethernet, Wi-Fi,
        fiber optic cables crossing ocean floors, 5G radio, or RFC 2549&apos;s satirical carrier pigeons.
        Every device on the internet gets an IP address. Every packet carries source and destination IPs.
        Routers forward packets based solely on the destination IP.
      </Para>

      <H2>IPv4 Packet Header</H2>

      <CodeBlock>{`  0               1               2               3
  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 ┌─┬─────┬────────────────┬──┬──────────────────────────────────────┐
 │V│ IHL │  DSCP (ToS)    │ │         Total Length (bytes)          │
 ├─┴─────┴────────────────┴──┴──────────────────────────────────────┤
 │         Identification        │ Flags │    Fragment Offset        │
 ├───────────────────────────────┴───────┴───────────────────────────┤
 │     TTL      │   Protocol    │          Header Checksum           │
 ├──────────────┴───────────────┴───────────────────────────────────┤
 │                       Source IP Address                           │
 ├───────────────────────────────────────────────────────────────────┤
 │                    Destination IP Address                         │
 └───────────────────────────────────────────────────────────────────┘

V=Version(4), IHL=Header Length, DSCP=QoS, TTL=hop limit, Protocol:
  6=TCP, 17=UDP, 1=ICMP, 89=OSPF, 50=ESP(IPSec)`}</CodeBlock>

      <H3>TTL: The Packet&apos;s Expiration Date</H3>

      <Para>
        TTL (Time to Live) starts at 64 (Linux default), 128 (Windows), or 255 (router-to-router).
        Each router decrements TTL by 1. When TTL reaches 0, the router discards the packet and sends
        an ICMP "Time Exceeded" message back to the sender. This is exactly how <Code>traceroute</Code> works —
        it sends packets with TTL=1, 2, 3... and each router along the path sends back the ICMP error,
        revealing itself.
      </Para>

      <H3>ICMP: IP&apos;s Error and Diagnostic Layer</H3>

      <Para>
        ICMP (Internet Control Message Protocol, RFC 792) rides inside IP packets (Protocol=1) and provides
        feedback about network conditions. It&apos;s not truly a separate layer — it&apos;s a service that runs at
        the Internet layer. <Code>ping</Code> uses ICMP Echo Request/Echo Reply. <Code>traceroute</Code> uses
        TTL expiration to trigger ICMP Time Exceeded messages. Path MTU Discovery uses ICMP
        "Fragmentation Needed" (type 3, code 4) to find the maximum packet size a path supports.
      </Para>

      <H2>Routing: How Packets Find Their Way</H2>

      <Para>
        When a router receives a packet, it looks up the destination IP in its routing table and forwards
        to the next hop. The routing table uses <Accent>longest prefix match</Accent> — the most specific
        matching route wins.
      </Para>

      <CodeBlock>{`$ ip route show
default via 192.168.1.1 dev eth0
10.0.0.0/8 via 10.1.0.1 dev vpn0
172.16.0.0/12 via 172.16.0.254 dev eth1
192.168.1.0/24 dev eth0 proto kernel scope link

# Packet to 10.5.3.2:
# Match 1: default (0 bits match)    → too vague
# Match 2: 10.0.0.0/8 (8 bits match) → winner — most specific

# Routing protocols that build these tables:
# OSPF  — Link-state, fast convergence, within an AS
# BGP   — Path-vector, the internet's routing protocol, between ASes
# RIP   — Distance-vector, simple but slow (obsolete for large nets)
# EIGRP — Cisco proprietary, hybrid distance-vector`}</CodeBlock>

      <WowBox>
        BGP (Border Gateway Protocol) routes all internet traffic between 100,000+ autonomous systems.
        It was originally written on two napkins during a 1989 lunch. The resulting RFC 1105 is sometimes
        called the "two-napkin protocol." BGP misconfigurations ("route leaks") can accidentally take
        down large portions of the internet — Pakistan Telecom once black-holed YouTube for 2 hours this way.
      </WowBox>

      <Divider />

      {/* ── Chapter 07 ── */}
      <Chapter n={7} title="Network Access Layer: Where Bits Meet Physics" />

      <Para>
        The Network Access layer (called Link layer in some references) handles the actual physical
        transmission of data on a single network segment. It combines what OSI separates into Data Link (L2)
        and Physical (L1). TCP/IP is intentionally vague here — it says "use whatever physical network
        technology you have." The design works over anything.
      </Para>

      <H2>Ethernet: The Dominant Link Technology</H2>

      <Para>
        Ethernet (IEEE 802.3) is the dominant wired networking standard. An Ethernet frame wraps an IP
        packet for delivery on a local network segment — a LAN. Switches forward frames based on MAC
        addresses (48-bit hardware addresses burned into each NIC).
      </Para>

      <CodeBlock>{`Ethernet Frame Structure:
┌─────────────────┬─────────────────┬──────────┬──────────────┬─────────┐
│   Dst MAC       │   Src MAC       │EtherType │   Payload    │   FCS   │
│   6 bytes       │   6 bytes       │ 2 bytes  │  46-1500 B   │ 4 bytes │
└─────────────────┴─────────────────┴──────────┴──────────────┴─────────┘

EtherType values:
  0x0800 = IPv4
  0x0806 = ARP
  0x86DD = IPv6
  0x8100 = 802.1Q VLAN tag

FCS = Frame Check Sequence (CRC-32) — detects bit errors in transit`}</CodeBlock>

      <H3>ARP: Bridging IP to MAC</H3>

      <Para>
        When your computer wants to send a packet to 192.168.1.1 (your router), it knows the IP address
        but needs the MAC address for the Ethernet frame. ARP (Address Resolution Protocol) broadcasts
        "Who has 192.168.1.1? Tell 192.168.1.50." The router replies with its MAC. Your computer caches
        this in the ARP table (<Code>arp -a</Code>) for a few minutes.
      </Para>

      <H2>Wi-Fi: The Same Idea, Completely Different Physics</H2>

      <Para>
        Wi-Fi (IEEE 802.11) provides the same service as Ethernet at Layer 2 — it delivers frames between
        MAC addresses. But the physics are completely different: radio waves instead of electrical signals,
        shared medium instead of dedicated wires, and CSMA/CA (Collision Avoidance) instead of CSMA/CD
        (Collision Detection) because you can&apos;t detect collisions on radio.
      </Para>

      <Para>
        From the IP layer&apos;s perspective, Wi-Fi and Ethernet are identical. IP doesn&apos;t know or care whether
        the frame underneath it traveled through copper or air. This is the Network Access layer&apos;s promise:
        abstract away the physical medium.
      </Para>

      <Divider />

      {/* ── Chapter 08 ── */}
      <Chapter n={8} title="Protocol Stacks in Action: What Really Happens" />

      <Para>
        Every network operation you perform involves all four TCP/IP layers working simultaneously.
        The stack tracer below lets you explore exactly what each layer contributes to real protocols.
      </Para>

      <ProtocolStackTracer />

      <H2>Encapsulation: Headers All the Way Down</H2>

      <Para>
        As data moves down the stack from Application to Network Access, each layer wraps the previous
        layer&apos;s data with its own header. This is <Accent>encapsulation</Accent>. When the data arrives
        at the destination, each layer strips its header and passes the payload up — <Accent>decapsulation</Accent>.
      </Para>

      <CodeBlock>{`Sending side (encapsulation, top → bottom):
  Application data: "GET / HTTP/1.1\\r\\n" (200 bytes)
  + Transport header (TCP): 20 bytes → 220 bytes
  + Internet header (IP):   20 bytes → 240 bytes
  + Network Access (Ethernet): 14 + 4 bytes → 258 bytes total

Receiving side (decapsulation, bottom → top):
  Ethernet frame arrives → strip 14-byte header, 4-byte FCS
  IP packet → strip 20-byte header
  TCP segment → strip 20-byte header, reassemble if fragmented
  HTTP data → parse "GET / HTTP/1.1" → send response`}</CodeBlock>

      <H3>Maximum Transmission Unit (MTU)</H3>

      <Para>
        Ethernet has a maximum payload of 1,500 bytes. This is the MTU. An IP packet larger than 1,500
        bytes must either be fragmented (split into multiple packets) or the sender must be told to send
        smaller packets (Path MTU Discovery). TCP uses MSS (Maximum Segment Size) to ensure segments
        never exceed the path MTU. In practice, most TCP connections use MSS = 1,460 bytes
        (1,500 MTU − 20 IP − 20 TCP).
      </Para>

      <Warn>
        Fragmentation is expensive and causes problems. Firewalls that block ICMP "Fragmentation Needed"
        messages break Path MTU Discovery, causing TCP "black holes" — connections that appear to work
        but silently hang when large packets are sent. This is called PMTUD black hole and is a real
        production issue that bites VPN deployments constantly.
      </Warn>

      <Divider />

      {/* ── Chapter 09 ── */}
      <Chapter n={9} title="TCP/IP vs OSI: When to Use Each Mental Model" />

      <Para>
        Both models exist, both are useful, and knowing when to think in which model makes you a better
        engineer. They&apos;re not competing models — they&apos;re different lenses on the same reality.
      </Para>

      <H2>Use OSI When...</H2>

      <Para>
        <Accent>Describing where a problem is:</Accent> "This is a Layer 2 problem" (MAC addresses,
        switches, VLANs) or "Layer 3 issue" (routing, IP). OSI&apos;s 7-layer vocabulary is the universal
        networking language across vendors, certifications, and job roles. Cisco, Juniper, Palo Alto,
        AWS — everyone speaks OSI layer numbers.
      </Para>

      <Para>
        <Accent>Categorizing devices:</Accent> L2 switches, L3 routers, L4 load balancers, L7 application
        delivery controllers. The OSI numbering scheme is how the industry describes where a device
        operates.
      </Para>

      <Para>
        <Accent>Security analysis:</Accent> "ARP poisoning is a Layer 2 attack." "SQL injection is Layer 7."
        "IP spoofing is Layer 3." The specific layer vocabulary matters for defense.
      </Para>

      <H2>Use TCP/IP When...</H2>

      <Para>
        <Accent>Reading RFCs:</Accent> All internet standards are written against the TCP/IP model.
        RFC 793 (TCP), RFC 791 (IP), RFC 1122 (requirements for hosts) — all use TCP/IP layer terminology.
      </Para>

      <Para>
        <Accent>Programming sockets:</Accent> POSIX sockets expose the TCP/IP model directly.
        <Code>socket(AF_INET, SOCK_STREAM, 0)</Code> creates a TCP/Internet socket.
        <Code>socket(AF_INET, SOCK_DGRAM, 0)</Code> creates UDP. You never program against an OSI-specific API.
      </Para>

      <Para>
        <Accent>Debugging actual traffic:</Accent> Wireshark, tcpdump, and every packet analyzer organize
        captures by TCP/IP layers. You see Ethernet → IP → TCP → HTTP, not the 7-layer OSI breakdown.
      </Para>

      <H3>The Honest Answer</H3>

      <Para>
        Most networking engineers use both interchangeably depending on context and who they&apos;re talking to.
        When troubleshooting with a Cisco engineer, they&apos;ll say "L2 loop" or "L3 routing issue." When
        writing a socket program, they think about TCP/IP. The models coexist because they&apos;re both useful
        abstractions, not because one is right and the other is wrong.
      </Para>

      <Divider />

      {/* ── Chapter 10 ── */}
      <Chapter n={10} title="RFC 1122: The Law of TCP/IP" />

      <Para>
        RFC 1122 (October 1989) is the authoritative specification of TCP/IP for internet hosts.
        It defines which behaviors are required (<Accent>MUST</Accent>), recommended (<Accent>SHOULD</Accent>),
        optional (<Accent>MAY</Accent>), and forbidden (<Accent>MUST NOT</Accent>). Any host that implements
        TCP/IP must comply with RFC 1122 to correctly interoperate with the internet.
      </Para>

      <H2>What RFC 1122 Actually Defines</H2>

      <CodeBlock>{`RFC 1122 REQUIREMENTS (selected critical ones):

LINK LAYER:
  MUST: Detect and handle ARP cache poisoning
  MUST: Support broadcast addresses
  SHOULD: Limit ARP rate to prevent storms

IP LAYER:
  MUST: Send ICMP Destination Unreachable when dropping packets
  MUST: Implement TTL decrement
  MUST NOT: Silently discard packets without ICMP notification
  SHOULD: Implement Path MTU Discovery (RFC 1191)

TCP:
  MUST: Implement Nagle algorithm (to reduce small packet flooding)
  MUST: Implement TCP keepalives (with configurable timers)
  MUST: Handle urgent data (even if rarely used today)
  SHOULD: Implement congestion control (Jacobson algorithm)

UDP:
  MUST: Compute and verify UDP checksum
  MAY: Allow applications to disable checksum (loopback only)`}</CodeBlock>

      <H3>Robustness Principle (Postel&apos;s Law)</H3>

      <Para>
        RFC 1122 enshrines Jon Postel&apos;s famous robustness principle from RFC 761:
        <Accent>"Be conservative in what you do, be liberal in what you accept from others."</Accent>
      </Para>

      <Para>
        This means: send perfectly conformant packets, but accept slightly malformed packets from other
        hosts if you can determine their intent. This is why the early internet could interconnect
        diverse, sometimes buggy implementations — each host was forgiving of others&apos; minor mistakes.
        It&apos;s also why the internet has so many legacy quirks — liberal acceptance means accepting
        behaviors that probably shouldn&apos;t have been accepted.
      </Para>

      <WowBox>
        RFC 1122 is 116 pages. It was written by Robert Braden and a small IETF working group, and
        it effectively defines what "being on the internet" means for a host. If your device follows
        RFC 1122, it can communicate with any other RFC 1122-compliant device anywhere on the planet,
        no matter who built either device.
      </WowBox>

      <Divider />

      {/* ── Chapter 11 ── */}
      <Chapter n={11} title="IPv4 Exhaustion and IPv6: The Same Model, Bigger Addresses" />

      <Para>
        IPv4 provides 4,294,967,296 addresses (2³²). That seemed impossible to exhaust in 1981.
        By 2011, IANA (the global IP address authority) had allocated its last block. Regional registries
        ran out through 2019. IPv4 addresses now trade for $50+ each on secondary markets.
      </Para>

      <H2>IPv6: 128-Bit Addresses</H2>

      <Para>
        IPv6 provides 2¹²⁸ = 340 undecillion addresses — enough to assign a unique IP to every
        atom in a cubic meter of matter, for every cubic meter of Earth&apos;s volume, 100 million times over.
        It also adds stateless address autoconfiguration (SLAAC), mandatory IPSec support, built-in flow
        labels for QoS, and eliminates broadcast (uses multicast instead).
      </Para>

      <CodeBlock>{`IPv4 address: 192.168.1.50
IPv6 address: 2001:0db8:85a3:0000:0000:8a2e:0370:7334
Shortened:    2001:db8:85a3::8a2e:370:7334

IPv6 prefixes:
  2000::/3      — Global unicast (public internet IPs)
  fc00::/7      — Unique local (like RFC 1918 private ranges)
  fe80::/10     — Link-local (auto-configured, on-link only)
  ff00::/8      — Multicast (replaces IPv4 broadcast)
  ::1           — Loopback (equivalent to 127.0.0.1)

Check your IPv6: ip -6 addr show (Linux) or ipconfig (Windows)`}</CodeBlock>

      <H3>Dual-Stack: The Transition Reality</H3>

      <Para>
        Most modern networks run <Accent>dual-stack</Accent> — every host has both an IPv4 and IPv6 address.
        When you connect to a website, your OS tries IPv6 first (Happy Eyeballs algorithm, RFC 6555) and
        falls back to IPv4 if IPv6 fails. As of 2024, about 45% of Google traffic is IPv6.
      </Para>

      <Para>
        In the TCP/IP model, IPv6 sits at exactly the same Internet layer as IPv4. The Transport layer
        (TCP, UDP) works identically over both — only the socket address family changes
        (<Code>AF_INET6</Code> instead of <Code>AF_INET</Code>).
      </Para>

      <Divider />

      {/* ── Chapter 12 ── */}
      <Chapter n={12} title="Troubleshooting the TCP/IP Stack" />

      <Para>
        When something doesn&apos;t work, the TCP/IP model gives you a systematic debugging framework.
        Start from the Network Access layer (can the physical connection carry bits?) and work up.
        Or start from the Application layer (what error do you see?) and work down to find the root cause.
      </Para>

      <H2>The Bottom-Up Debugging Checklist</H2>

      <CodeBlock>{`Layer 1: Network Access — "Can bits move?"
  ● Check link LED on NIC and switch port (green = link)
  ● ip link show eth0  — "state UP" needed
  ● ethtool eth0       — check speed, duplex negotiation
  ● ifconfig / ip addr — interface must have an IP

Layer 2: Ethernet — "Can frames reach the gateway?"
  ● arp -a             — can you see the gateway's MAC?
  ● arping 192.168.1.1 — ARP-level ping (bypasses IP)
  ● ip neigh           — check ARP/NDP table
  ● If ARP works but IP doesn't: Layer 3 problem

Layer 3: IP — "Can packets route to destination?"
  ● ping 8.8.8.8       — basic IP connectivity
  ● ping -c1 $(ip route|awk '/default/{print $3}') — gateway
  ● traceroute 8.8.8.8 — where do packets die?
  ● ip route           — routing table correct?

Layer 4: Transport — "Can TCP/UDP reach the service?"
  ● nc -zv host port   — can you connect to the port?
  ● telnet host port   — same, interactive
  ● netstat -tulpn     — is the service listening?
  ● ss -tp             — which processes have connections?

Application — "Does the protocol work?"
  ● curl -v https://host  — full HTTP + TLS debugging
  ● openssl s_client -connect host:443  — TLS details
  ● nslookup / dig host   — DNS working?
  ● Check application logs — final answer is usually here`}</CodeBlock>

      <H3>The Most Common TCP/IP Failures</H3>

      <CodeBlock>{`Symptom                         → Layer     → Likely Cause
─────────────────────────────────────────────────────────────────
No link LED                     → L1/Net.A  → Cable unplugged
"Network unreachable"           → L3/IP     → No route to destination
Ping works, SSH fails           → L4/Trans  → Firewall blocking port 22
IP works, hostname fails        → L7/App    → DNS broken
HTTPS fails, HTTP works         → L7/App    → TLS cert issue or port 443 blocked
Slow but working                → L4/Trans  → TCP retransmits (packet loss)
Connects then hangs at large    → L3/IP     → PMTUD black hole (ICMP blocked)`}</CodeBlock>

      <Divider />

      {/* ── Chapter 13 ── */}
      <Chapter n={13} title="Common Misconceptions" />

      <Err>
        <strong>"TCP/IP is just two protocols."</strong><br /><br />
        TCP/IP is a suite of dozens of protocols. The name "TCP/IP" comes from its two most important
        protocols, but the suite includes IP, TCP, UDP, ICMP, ARP, IGMP, OSPF, BGP, DNS, DHCP, HTTP,
        FTP, SSH, SMTP, and many more. The name is misleading — it&apos;s properly called the "Internet Protocol Suite."
      </Err>

      <Err>
        <strong>"TCP/IP and OSI are competing standards — you use one or the other."</strong><br /><br />
        They coexist. TCP/IP is what the internet actually implements. OSI provides the vocabulary everyone
        uses to describe it. No device implements OSI protocols (OSI&apos;s native protocols like TP4 and CLNS
        are essentially dead). Every device implements TCP/IP. But everyone uses "Layer 3" and "Layer 7"
        to describe TCP/IP problems because OSI&apos;s layer numbers became industry-standard vocabulary.
      </Err>

      <Err>
        <strong>"UDP is broken TCP — it&apos;s only used when you don&apos;t care about reliability."</strong><br /><br />
        UDP is intentionally unreliable because reliability at the transport layer is a performance penalty
        for applications that don&apos;t need it or handle it themselves. DNS, DHCP, video streaming, gaming,
        and QUIC all use UDP deliberately. QUIC implements its own selective reliability per-stream,
        which is strictly better than TCP&apos;s all-or-nothing head-of-line blocking for multiplexed connections.
      </Err>

      <Err>
        <strong>"IP addresses identify computers."</strong><br /><br />
        IP addresses identify <em>interfaces</em>, not computers. A server with 4 NICs has 4 IP addresses.
        A router has many. A laptop with Ethernet + Wi-Fi has 2 (at minimum). After NAT, your "IP address"
        visible to the internet is your router&apos;s public IP — shared by every device on your home network.
        After VPN, it&apos;s the VPN server&apos;s IP. IP addresses are more like postal codes than identity cards.
      </Err>

      <Err>
        <strong>"The Application layer is where your application runs."</strong><br /><br />
        The Application layer is the network-facing interface of your application — the protocols it uses
        to communicate. Your code is not "in" the Application layer. HTTP, the protocol your web server
        speaks, is in the Application layer. Your Flask or Express code sits above the network stack entirely;
        it calls into it via the sockets API.
      </Err>

      <Err>
        <strong>"HTTPS is just HTTP with encryption added on top."</strong><br /><br />
        HTTPS is HTTP over TLS over TCP over IP. TLS is a complete cryptographic protocol that handles
        key exchange, authentication (via certificates), encryption, and integrity checking. It negotiates
        cipher suites, validates X.509 certificate chains, and provides forward secrecy via ephemeral keys.
        The "encryption added on top" framing misses that TLS adds authentication (you verify who you&apos;re
        talking to) and integrity (nobody can modify the data in transit) — not just confidentiality.
      </Err>

      <Divider />

      {/* ── Chapter 14 ── */}
      <Chapter n={14} title="Test Your Understanding" />

      <IQ level="Beginner">
        <strong>Q: You open your browser and type google.com. Before any HTTP request is sent, what happens?</strong>
        <br /><br />
        A DNS query goes out first — your OS asks a resolver to translate "google.com" into an IP address.
        The query travels as a UDP datagram (port 53) to your DNS server (usually your router or ISP&apos;s resolver).
        The resolver returns an IP like 142.250.182.14. Only then does your browser open a TCP connection
        to that IP on port 443 (HTTPS), perform a TLS handshake, and send the HTTP GET request.
        Every website load involves at least one DNS lookup first.
      </IQ>

      <IQ level="Beginner">
        <strong>Q: What is the difference between a port number and an IP address?</strong>
        <br /><br />
        An IP address identifies a machine (technically an interface) on the network. A port number identifies
        a specific process or service on that machine. Think of the IP as a building address and the port
        as an apartment number. 192.168.1.50:443 means: "the HTTPS service (port 443) on the machine at
        IP 192.168.1.50." Without the port, the IP packet arrives at the right machine but the OS doesn&apos;t
        know which running process to give the data to.
      </IQ>

      <IQ level="Intermediate">
        <strong>Q: Why does a TCP connection require 3 packets to establish but 4 to close?</strong>
        <br /><br />
        The asymmetric teardown exists because TCP is full-duplex. During the handshake, both sides
        synchronize simultaneously (SYN from client, SYN-ACK combines server&apos;s SYN with the ACK of client&apos;s).
        During teardown, each direction closes independently. The server may still have data to send after
        receiving the client&apos;s FIN, so FIN-ACK separates into two packets (ACK of FIN, then later FIN when
        the server is done). The client then sends the final ACK. The TIME_WAIT state holds the connection
        for 2×MSL (Maximum Segment Lifetime ≈ 4 minutes) to absorb any delayed duplicate packets.
      </IQ>

      <IQ level="Intermediate">
        <strong>Q: Your application works perfectly on localhost but fails when deployed. What systematic approach do you take?</strong>
        <br /><br />
        Work up the TCP/IP stack: (1) Network Access: is the interface up? Does the deploy machine have
        network? (2) Internet: can you ping the destination IP? Run traceroute — does the route exist?
        (3) Transport: can you <Code>nc -zv host port</Code>? Is a firewall blocking the port? Is the service
        even listening (<Code>ss -tulpn</Code>)? (4) Application: curl -v to see the full HTTP exchange,
        including TLS negotiation. Is the hostname correct? Are environment variables (DB_HOST, API_URL)
        pointing to the right place in production? The structured approach prevents random guessing.
      </IQ>

      <IQ level="Senior">
        <strong>Q: Explain why TCP&apos;s head-of-line blocking is a fundamental problem for multiplexed connections, and how QUIC solves it.</strong>
        <br /><br />
        HTTP/2 multiplexes multiple request/response streams over a single TCP connection. When a TCP
        segment is lost, all streams halt — TCP&apos;s reliable delivery requires the lost segment be
        retransmitted before any subsequent data in the stream is delivered to the application. A lost
        segment for stream A blocks streams B, C, and D even though those streams&apos; data arrived safely.
        This is TCP head-of-line blocking: a problem in one stream serializes all streams.
        <br /><br />
        QUIC solves this by implementing reliability per-stream rather than per-connection. Each QUIC stream
        is independent. A lost packet in stream A only blocks stream A — streams B, C, D continue delivering
        data unaffected. QUIC runs over UDP (no OS-level head-of-line blocking) and implements per-stream
        flow control, ordering, and retransmission in user space. HTTP/3 (RFC 9114) runs entirely over QUIC.
      </IQ>

      <IQ level="Senior">
        <strong>Q: How does the TCP/IP model handle the reality that VPN tunnels create an "IP inside IP" situation?</strong>
        <br /><br />
        VPN tunneling (IPSec, OpenVPN, WireGuard) creates a situation where the TCP/IP model is applied twice.
        The inner packet has its own complete IP/TCP/Application headers with private addresses. This inner
        packet is treated as payload by the outer IP packet, which has public internet addresses. The outer
        Internet layer routes the tunnel packet to the VPN endpoint. The endpoint decapsulates the outer
        IP header and processes the inner IP packet as if it arrived on a local interface.
        <br /><br />
        This is called a "tunnel" and violates the clean separation of the 4-layer model. The inner packet&apos;s
        Internet layer rides inside the outer packet&apos;s Network Access payload. The OS maintains two routing
        tables: one for the physical interface (outer), one for the virtual VPN interface (inner). MTU must
        account for both headers (typically outer MTU − 60 bytes for headers = inner MTU 1,420 bytes for WireGuard).
      </IQ>

      <IQ level="PhD">
        <strong>Q: The end-to-end principle was a key design choice for TCP/IP. What are its fundamental tradeoffs and where has it created tension in modern internet architecture?</strong>
        <br /><br />
        The end-to-end principle (Saltzer, Reed, Clark 1981) states that functions should be implemented at
        the endpoints if they require application-level knowledge, rather than in the network. This produces
        a "dumb" network (IP just routes) and "smart" endpoints (TCP handles reliability). Advantages: network
        is simple and resilient, endpoints can evolve independently, new application protocols deploy without
        network upgrades, failures at network nodes don&apos;t destroy application state.
        <br /><br />
        Tensions: (1) NAT violates end-to-end by breaking the invariant that every host has a globally
        unique, reachable IP address. NAT requires the network to maintain per-connection state (NAPT tables),
        the opposite of the dumb-network ideal. (2) DPI (Deep Packet Inspection) firewalls inspect application
        payloads at middleboxes — the network reading application-layer data contradicts end-to-end. (3) CDNs
        terminate TCP connections at edge nodes (not the origin) to reduce RTT — this breaks end-to-end TCP
        by making the "reliable stream" involve two separate TCP connections with an application-level relay.
        (4) QUIC encrypts transport headers (connection IDs) to prevent middlebox interference — a deliberate
        move to restore end-to-end properties that NAT and DPI eroded. The principle remains correct as a
        design ideal; reality is messier because business and operational constraints push intelligence back
        into the network.
      </IQ>

      <IQ level="PhD">
        <strong>Q: Analyze the BGP security problem and explain why the internet&apos;s routing system is fundamentally insecure by design.</strong>
        <br /><br />
        BGP (Border Gateway Protocol, RFC 4271) was designed in 1989 for a network of trusted research
        institutions. It operates on policy, not cryptography — an AS announces "I can reach prefix X"
        and all other ASes accept this on faith. There is no cryptographic verification that the announcing
        AS is authorized to originate that prefix. This produces two classes of attacks:
        <br /><br />
        (1) Route hijacking: AS announces a prefix it doesn&apos;t own. Traffic to the hijacked prefix is
        attracted to the hijacker — can be dropped (DoS), inspected (surveillance), or re-routed after
        inspection (man-in-the-middle). The 2008 Pakistan Telecom incident that took down YouTube globally
        for 2 hours, the 2010 China Telecom incident that briefly routed 15% of US internet traffic through
        China, and the 2019 Verizon-Cloudflare outage were all BGP route leaks/hijacks.
        <br /><br />
        (2) Route leaks: AS re-announces routes to its customers that should only go to peers — accidentally
        attracting traffic through an AS that lacks the capacity or authorization.
        <br /><br />
        RPKI (Resource Public Key Infrastructure, RFC 6480) partially addresses this: certificate authorities
        issue ROAs (Route Origin Authorizations) that cryptographically bind IP prefixes to originating ASes.
        Routers can reject RPKI-invalid announcements. As of 2024, ~35% of global routes are RPKI-validated.
        BGPsec (RFC 8205) extends this to path validation — not just origin, but the full AS path.
        Deployment is slow because each AS must upgrade and misconfiguration could cause route withdrawal
        in a system where uptime is paramount. The fundamental issue: BGP must work with partial RPKI
        deployment, meaning hijacks from non-RPKI ASes remain possible indefinitely.
      </IQ>

      <Divider />

      <KeyTakeaways items={[
        'TCP/IP is the actual protocol of the internet — 4 layers: Application, Transport, Internet, Network Access.',
        'OSI is the teaching model — 7 layers with precise boundaries. Use OSI vocabulary, TCP/IP mechanics.',
        'The end-to-end principle keeps routers dumb and endpoints smart — the internet\'s most important architectural decision.',
        'TCP provides reliable, ordered byte streams via 3-way handshake, sequencing, and retransmission. Costs 1.5×RTT setup time.',
        'UDP provides fast, connectionless delivery. No reliability. Used for DNS, video, games, and QUIC (which adds selective reliability).',
        'IP routes packets hop-by-hop using destination IP and routing tables. TTL prevents infinite loops. BGP connects autonomous systems.',
        'ARP bridges IP addresses to MAC addresses on local segments. The Network Access layer abstracts away all physical media.',
        'RFC 1122 (1989) is the law — it defines MUST/SHOULD/MAY requirements for any TCP/IP host.',
        'IPv4 exhaustion is real — 4.3B addresses ran out. IPv6 provides 340 undecillion addresses. Most networks run dual-stack.',
        'Debug bottom-up: link → IP → port → app. Or top-down from the error. Structured approach beats random guessing.',
      ]} />
    </LearnLayout>
  )
}
