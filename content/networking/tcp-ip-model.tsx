'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const G = '#10b981'
const FONT_MONO = 'var(--font-mono)'
const FONT_DISPLAY = 'var(--font-display)'

// ─── Layout helpers ───────────────────────────────────────────────────────────

const Chapter = ({ n, title, subtitle }: { n: string; title: string; subtitle?: string }) => (
  <div style={{ marginBottom: 36 }}>
    <p style={{ fontSize: 11, color: G, fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 6px', letterSpacing: '.12em' }}>
      {`// CHAPTER ${n}`}
    </p>
    <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: subtitle ? '0 0 8px' : 0 }}>
      {title}
    </h2>
    {subtitle && <p style={{ fontSize: 15, color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>{subtitle}</p>}
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

const StoryBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.25)', borderLeft: '3px solid #3b82f6', borderRadius: 10, padding: '20px 24px', margin: '28px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', fontFamily: FONT_MONO, letterSpacing: '.12em', margin: '0 0 10px' }}>// REAL-WORLD SCENARIO</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)

const WowBox = ({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) => (
  <div style={{ background: `${G}08`, border: `1px solid ${G}25`, borderRadius: 12, padding: '18px 22px', margin: '28px 0' }}>
    <p style={{ fontSize: 13, fontWeight: 700, color: G, margin: '0 0 6px' }}>{emoji} {title}</p>
    <div style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

const Warn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', fontFamily: FONT_MONO, letterSpacing: '.1em', margin: '0 0 8px' }}>⚠ {title}</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

const Err = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 12, fontWeight: 700, color: '#ef4444', fontFamily: FONT_MONO, letterSpacing: '.1em', margin: '0 0 8px' }}>✗ Common Mistake — {title}</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

const LEVEL_COLORS: Record<string, string> = {
  Beginner: '#10b981', Intermediate: '#3b82f6', Senior: '#8b5cf6', PhD: '#f97316',
}

const IQ = ({ q, level, children }: { q: string; level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 0 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: LEVEL_COLORS[level], padding: '3px 10px', borderRadius: 20, letterSpacing: '.06em', whiteSpace: 'nowrap', marginTop: 3, flexShrink: 0 }}>{level}</span>
      <div style={{ background: `${LEVEL_COLORS[level]}12`, border: `1px solid ${LEVEL_COLORS[level]}30`, borderRadius: '0 8px 0 0', padding: '12px 16px', fontSize: 14, fontWeight: 700, color: 'var(--text)', flex: 1 }}>{q}</div>
    </div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '16px 18px', fontSize: 14, color: 'var(--muted)', lineHeight: 1.9 }}>{children}</div>
  </div>
)

// ─── Interactive 1: TCP/IP Layer Explorer ─────────────────────────────────────

const TCPIP_LAYERS = [
  {
    name: 'Application',
    color: '#10b981',
    osiMap: 'OSI Layers 5 + 6 + 7',
    pdu: 'Data / Message',
    emoji: '🌐',
    protocols: 'HTTP/1.1, HTTP/2, HTTP/3 (QUIC), HTTPS (TLS), FTP, SSH, SMTP, IMAP, POP3, DNS, DHCP, SNMP, WebSocket, gRPC',
    job: 'Everything the user and application interact with. Combines what OSI separates into Session (L5), Presentation (L6), and Application (L7). Responsible for session management, encryption (TLS), data encoding (JSON/gzip), and the actual application protocol. TCP/IP does not mandate how applications handle these — each application chooses.',
    example: 'Browser constructs "GET /index.html HTTP/2" — the HTTP message, TLS encryption, and session management all happen here.',
    commands: 'curl -v https://example.com  |  openssl s_client -connect host:443  |  dig google.com',
    analogy: 'What you say, how you say it, and maintaining the conversation — all in one.',
  },
  {
    name: 'Transport',
    color: '#f97316',
    osiMap: 'OSI Layer 4',
    pdu: 'Segment (TCP) / Datagram (UDP)',
    emoji: '🚚',
    protocols: 'TCP (RFC 793), UDP (RFC 768), SCTP (RFC 4960), DCCP (RFC 4340), QUIC (RFC 9000)',
    job: 'Process-to-process delivery. Uses port numbers to multiplex multiple application streams over one IP address. TCP provides ordered, reliable delivery with connection establishment, sequencing, acknowledgement, retransmission, flow control, and congestion control. UDP provides fast, connectionless delivery with no guarantees. QUIC adds reliability + encryption over UDP.',
    example: 'TCP SYN to port 443 starts the 3-way handshake. TCP sequence numbers ensure 100 MB of file data arrives in order despite network reordering.',
    commands: 'ss -tulpn  |  netstat -an  |  tcpdump port 443  |  nmap -sT host',
    analogy: 'The postal service — chooses between guaranteed registered mail (TCP) or quick postcard (UDP).',
  },
  {
    name: 'Internet',
    color: '#3b82f6',
    osiMap: 'OSI Layer 3',
    pdu: 'Packet',
    emoji: '🗺️',
    protocols: 'IPv4 (RFC 791), IPv6 (RFC 8200), ICMPv4 (RFC 792), ICMPv6 (RFC 4443), ARP (RFC 826), OSPF (RFC 2328), BGP-4 (RFC 4271)',
    job: 'Logical addressing and routing across multiple networks. IP gives every device a globally unique address and routes packets hop-by-hop from source to destination. ICMP handles errors and diagnostics (ping, traceroute). ARP maps IP addresses to MAC addresses on the local segment. This layer makes the global internet possible.',
    example: 'A packet from Chicago hops across 18 routers to reach São Paulo — each router reads the destination IP and independently decides the next hop.',
    commands: 'ping 8.8.8.8  |  traceroute 8.8.8.8  |  ip route show  |  ip addr show',
    analogy: 'The global GPS — figures out the route between any two points on Earth, regardless of what roads exist in between.',
  },
  {
    name: 'Network Access',
    color: '#ef4444',
    osiMap: 'OSI Layers 1 + 2',
    pdu: 'Frame (L2) / Bit (L1)',
    emoji: '🔌',
    protocols: 'Ethernet (IEEE 802.3), Wi-Fi (IEEE 802.11), PPP (RFC 1661), DSL, LTE/5G radio, DOCSIS (cable), fiber (SONET/SDH)',
    job: 'Physical transmission of bits across a single link. Combines OSI Data Link (MAC addressing, framing, error detection, medium access) and Physical (signaling, cables, radio). TCP/IP intentionally leaves this layer to existing standards — it does not specify how to build Ethernet or Wi-Fi, just uses them. This layer is responsible for getting a frame from one end of a cable/Wi-Fi link to the other.',
    example: 'Your laptop\'s 802.11ac NIC encodes the IP packet as OFDM symbols on 5 GHz radio, transmitting at 867 Mbps to the access point 10 meters away.',
    commands: 'ethtool eth0  |  ip link show  |  iwconfig  |  arp -a  |  ip neigh',
    analogy: 'The road and the vehicle — moves bits from one node to the immediately adjacent node.',
  },
]

function TCPIPLayerExplorer() {
  const [active, setActive] = useState<number | null>(null)
  const layer = active !== null ? TCPIP_LAYERS[active] : null

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 4px' }}>Interactive — TCP/IP Layer Explorer</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 20px' }}>Click any layer to see protocols, OSI mapping, PDU name, diagnostic commands, and a real-world example.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: active !== null ? 20 : 0 }}>
        {TCPIP_LAYERS.map((l, i) => (
          <button
            key={l.name}
            onClick={() => setActive(active === i ? null : i)}
            style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
              background: active === i ? `${l.color}15` : 'var(--bg)',
              border: `1px solid ${active === i ? l.color : 'var(--border)'}`,
              borderLeft: `4px solid ${l.color}`,
              borderRadius: active === i ? '8px 8px 0 0' : 10,
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
            }}
          >
            <span style={{ fontSize: 20 }}>{l.emoji}</span>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{l.name} Layer</span>
              <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO, marginLeft: 12 }}>{l.pdu}</span>
            </div>
            <span style={{ fontSize: 11, color: l.color, fontFamily: FONT_MONO }}>{l.osiMap}</span>
            <span style={{ fontSize: 11, color: l.color }}>{active === i ? '▲' : '▼'}</span>
          </button>
        ))}
      </div>

      {layer && (
        <div style={{ background: `${layer.color}08`, border: `1px solid ${layer.color}30`, borderRadius: '0 0 12px 12px', padding: '20px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <span style={{ fontSize: 28 }}>{layer.emoji}</span>
            <div>
              <p style={{ margin: 0, fontSize: 11, color: layer.color, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase' }}>{layer.osiMap}</p>
              <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>{layer.name} Layer</p>
            </div>
          </div>
          <p style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 16px' }}>{layer.job}</p>
          {[
            { label: 'PDU Name', value: layer.pdu },
            { label: 'Key Protocols', value: layer.protocols },
            { label: 'Diagnostic Commands', value: layer.commands },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: layer.color, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.06em', minWidth: 180, paddingTop: 2, flexShrink: 0 }}>{row.label}</span>
              <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, fontFamily: row.label === 'Diagnostic Commands' ? FONT_MONO : 'inherit' }}>{row.value}</span>
            </div>
          ))}
          <div style={{ marginTop: 14, padding: '12px 16px', background: 'var(--bg)', borderRadius: 10, borderLeft: `3px solid ${layer.color}` }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: layer.color, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 6px' }}>Real-World Example</p>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: '0 0 8px' }}>{layer.example}</p>
            <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}><strong style={{ color: 'var(--text)' }}>Analogy: </strong>{layer.analogy}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Interactive 2: Protocol Stack Explorer ───────────────────────────────────

const STACKS: Record<string, { color: string; desc: string; layers: { layer: string; color: string; detail: string; header: string }[] }> = {
  'HTTPS (Web)': {
    color: '#10b981',
    desc: 'Loading a web page over encrypted HTTPS — the most common internet action on earth.',
    layers: [
      { layer: 'Application', color: '#10b981', detail: 'Browser constructs HTTP/2 GET request. TLS 1.3 encrypts the payload — the Application layer handles both the protocol (HTTP) and the encryption (TLS). Gzip/brotli compresses the response body. HTTP/2 multiplexes this request alongside 30 others on a single TCP connection.', header: 'HTTP/2 HEADERS frame: GET /index.html, :authority: google.com' },
      { layer: 'Transport', color: '#f97316', detail: 'TCP provides ordered, reliable delivery. The TLS handshake requires 1 RTT (TLS 1.3) before application data flows. TCP splits large responses into 1,460-byte segments, sequences and ACKs each one. Congestion control (CUBIC) adapts transmission rate to network conditions.', header: 'TCP Segment: Src:54321 → Dst:443 | Seq:4001 | Flags:PSH,ACK' },
      { layer: 'Internet', color: '#3b82f6', detail: 'IP routes the packet hop-by-hop across the internet. 15 routers between your ISP and Google, each making an independent forwarding decision using the destination IP. TTL=64 decrements at each hop — prevents infinite loops. The IP header is the same from source to destination.', header: 'IP Packet: Src:192.168.1.5 → Dst:142.250.182.4 | TTL:64 | Proto:6 (TCP)' },
      { layer: 'Network Access', color: '#ef4444', detail: 'Ethernet frame wraps the IP packet. Destination MAC is your router\'s MAC (from ARP cache), not Google\'s — MAC addresses only survive one hop. CRC-32 trailer added for error detection. Frame transmitted as voltage pulses on Cat6 at 1 Gbps, or OFDM symbols over Wi-Fi 5 GHz.', header: 'Ethernet Frame: Src:A4:C3:F0:11:22:33 → Dst:B8:E8:56:44:55:66 | EtherType:0x0800' },
    ],
  },
  'DNS Query': {
    color: '#06b6d4',
    desc: 'Resolving a domain name to an IP — happens before almost every connection on the internet.',
    layers: [
      { layer: 'Application', color: '#10b981', detail: 'DNS protocol (RFC 1035) builds a query: QType=A (IPv4 address), QName="google.com". The 12-byte DNS header includes a random Transaction ID — the resolver echoes it in the reply so the client matches request to response. DNSSEC adds cryptographic signatures. DNS-over-HTTPS (DoH) wraps this entire query inside HTTPS for privacy.', header: 'DNS Query: ID=0xA3B1, QType=A, QName=google.com (28 bytes total)' },
      { layer: 'Transport', color: '#f97316', detail: 'UDP port 53 — no connection setup, fire and receive. The entire query and answer typically fit in one small UDP datagram. If the response exceeds 512 bytes (DNSSEC, large responses), the DNS server returns a truncated response with TC=1, and the client retries over TCP port 53. Resolver waits 500ms, then retries if no answer.', header: 'UDP Datagram: Src:55813 → Dst:53 | Length:36 | No connection, no ACK' },
      { layer: 'Internet', color: '#3b82f6', detail: 'Destination IP is your DNS resolver: 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare). The tiny packet crosses 3-4 routers to reach the resolver\'s datacenter. ICMP Destination Unreachable comes back if UDP port 53 is blocked by a firewall.', header: 'IP Packet: Src:192.168.1.5 → Dst:8.8.8.8 | TTL:64 | Proto:17 (UDP)' },
      { layer: 'Network Access', color: '#ef4444', detail: 'Tiny 74-byte Ethernet frame — the entire DNS query including all headers fits in a single frame with room to spare. CRC computed over the whole frame. On Wi-Fi, even this small frame must wait for CSMA/CA channel access before transmission.', header: 'Ethernet Frame: ~74 bytes total | EtherType:0x0800 (IPv4)' },
    ],
  },
  'SSH Session': {
    color: '#8b5cf6',
    desc: 'Establishing a secure remote shell — how engineers manage servers worldwide.',
    layers: [
      { layer: 'Application', color: '#10b981', detail: 'SSH protocol (RFC 4253): version string exchange → key algorithm negotiation → ECDH key exchange → server authentication via ED25519 host key → client authentication (password or public key challenge) → encrypted shell channel opened. All data encrypted with ChaCha20-Poly1305 or AES-256-GCM. Each keypress is a separate SSH packet.', header: 'SSH: SSH-2.0-OpenSSH_9.0 version exchange → ECDH → encrypted channel' },
      { layer: 'Transport', color: '#f97316', detail: 'TCP port 22. A long-lived connection — one SSH session holds a TCP connection open for minutes or hours. TCP\'s ordered delivery is essential: a dropped keypress would corrupt the shell session. TCP keep-alives detect half-open connections. The server also uses TCP keep-alives to clean up abandoned sessions.', header: 'TCP: Src:random → Dst:22 | Persistent connection | keep-alive enabled' },
      { layer: 'Internet', color: '#3b82f6', detail: 'IP routes each segment independently. BGP reconvergence mid-session can cause packets to take different paths — TCP reorders them at the destination before handing to SSH. If the server\'s IP changes (failover, load balancing), the TCP connection breaks and SSH must reconnect.', header: 'IP Packet: Src:yourIP → Dst:serverIP | TTL:64 | Proto:6 (TCP)' },
      { layer: 'Network Access', color: '#ef4444', detail: 'Interactive typing: one tiny 60-byte Ethernet frame per keypress. Bulk data (scp file transfer): maximum-size 1,514-byte Ethernet frames back-to-back at line rate. The Ethernet layer handles both modes identically — just frames, regardless of content size or rate.', header: 'Ethernet: 60 bytes (typing) or 1,514 bytes (bulk) — same framing' },
    ],
  },
  'Video Call': {
    color: '#f97316',
    desc: 'Real-time video streaming — where latency kills quality and TCP is the wrong tool.',
    layers: [
      { layer: 'Application', color: '#10b981', detail: 'WebRTC (RFC 8825): video encoded as H.264 or VP9 I-frames (keyframes) + P-frames (deltas). Audio: Opus codec at 20ms packets. RTP (Real-time Transport Protocol) carries media with timestamps for synchronisation. RTCP sends receiver reports every 5 seconds for adaptive bitrate control. ICE/STUN/TURN handle NAT traversal.', header: 'RTP: PT=96 (H.264), Seq=43821, Timestamp=720000, SSRC=0xAB12CD34' },
      { layer: 'Transport', color: '#f97316', detail: 'UDP — not TCP. A video frame retransmitted 200ms late is worse than a lost one: the player would freeze waiting. UDP sends and forgets. If a frame is lost, the video codec conceals it with the previous frame (graceful degradation). QUIC (RFC 9000) is increasingly used — UDP-based with per-stream reliability, avoiding head-of-line blocking.', header: 'UDP: Src:5004 → Dst:5004 | No connection | No retransmission' },
      { layer: 'Internet', color: '#3b82f6', detail: 'DSCP (Differentiated Services Code Point) field in the IP header marks video packets as EF (Expedited Forwarding, DSCP 46). Routers with QoS configured give these packets priority queuing over bulk data. Without QoS, video competes equally with a large file download on the same link.', header: 'IP Packet: DSCP=0x2E (EF=46) | TTL:64 | Proto:17 (UDP)' },
      { layer: 'Network Access', color: '#ef4444', detail: 'Wi-Fi 802.11e WMM (Wi-Fi Multimedia) prioritizes voice/video in the AC_VO and AC_VI access categories, giving them shorter AIFS and smaller contention windows. On 2.4 GHz: interference from microwaves and neighbours causes frame loss. On 5 GHz: less congestion, shorter range. A lost Wi-Fi frame = permanently lost UDP datagram.', header: 'Wi-Fi 802.11: WMM AC_VO queue | 5 GHz preferred | No retransmission at L1' },
    ],
  },
}

function ProtocolStackExplorer() {
  const [selected, setSelected] = useState<string>('HTTPS (Web)')
  const [activeLayer, setActiveLayer] = useState<number | null>(null)
  const stack = STACKS[selected]

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 4px' }}>Interactive — Protocol Stack Explorer</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 20px' }}>Choose a real network operation and see exactly which protocols are used at each TCP/IP layer, and why.</p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {Object.keys(STACKS).map(k => (
          <button key={k} onClick={() => { setSelected(k); setActiveLayer(null) }}
            style={{ padding: '7px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700, fontFamily: FONT_MONO, cursor: 'pointer', border: `1px solid ${STACKS[k].color}`, background: selected === k ? STACKS[k].color : 'transparent', color: selected === k ? '#fff' : STACKS[k].color, transition: 'all 0.2s' }}>
            {k}
          </button>
        ))}
      </div>

      <div style={{ padding: '12px 16px', background: `${stack.color}08`, border: `1px solid ${stack.color}25`, borderRadius: 10, marginBottom: 20 }}>
        <p style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>{stack.desc}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {stack.layers.map((l, i) => (
          <div key={i}>
            <button onClick={() => setActiveLayer(activeLayer === i ? null : i)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: activeLayer === i ? `${l.color}12` : 'var(--bg)', border: `1px solid ${activeLayer === i ? l.color : 'var(--border)'}`, borderLeft: `4px solid ${l.color}`, borderRadius: activeLayer === i ? '8px 8px 0 0' : 8, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: l.color, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.08em', minWidth: 100 }}>{l.layer}</span>
              <code style={{ fontSize: 12, color: 'var(--muted)', fontFamily: FONT_MONO, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.header}</code>
              <span style={{ fontSize: 11, color: l.color }}>{activeLayer === i ? '▲' : '▼'}</span>
            </button>
            {activeLayer === i && (
              <div style={{ background: `${l.color}06`, border: `1px solid ${l.color}25`, borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '14px 18px', fontSize: 13.5, color: 'var(--text)', lineHeight: 1.85 }}>
                {l.detail}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Interactive 3: TCP Connection State Machine ──────────────────────────────

const TCP_STATES = [
  {
    state: 'CLOSED',
    color: '#94a3b8',
    description: 'No connection exists. This is the starting and ending state for both client and server.',
    next: ['LISTEN (server: passive open)', 'SYN_SENT (client: active open)'],
    who: 'both',
  },
  {
    state: 'LISTEN',
    color: '#60a5fa',
    description: 'Server is waiting for incoming connection requests. The server socket is bound and listening on a port. No connection exists yet — the server is just ready.',
    next: ['SYN_RECEIVED (receives SYN from client)'],
    who: 'server',
  },
  {
    state: 'SYN_SENT',
    color: '#f97316',
    description: 'Client sent a SYN packet and is waiting for a SYN-ACK from the server. The client has chosen an initial sequence number (ISN) and included it in the SYN.',
    next: ['ESTABLISHED (receives SYN-ACK, sends ACK)'],
    who: 'client',
  },
  {
    state: 'SYN_RECEIVED',
    color: '#a78bfa',
    description: 'Server received a SYN, sent back a SYN-ACK, and is waiting for the final ACK. In SYN flood attacks, the server\'s SYN_RECEIVED table fills up — SYN cookies solve this by encoding state in the SYN-ACK sequence number.',
    next: ['ESTABLISHED (receives ACK — connection open)'],
    who: 'server',
  },
  {
    state: 'ESTABLISHED',
    color: '#10b981',
    description: 'The 3-way handshake is complete. Data flows in both directions. This is the normal state for an active TCP connection — both sides can send and receive simultaneously.',
    next: ['FIN_WAIT_1 (active close: sends FIN)', 'CLOSE_WAIT (passive close: receives FIN)'],
    who: 'both',
  },
  {
    state: 'FIN_WAIT_1',
    color: '#fbbf24',
    description: 'The initiating side sent a FIN (finished sending data) and is waiting for acknowledgement. Data from the remote can still arrive — TCP is half-closed.',
    next: ['FIN_WAIT_2 (receives ACK of FIN)', 'CLOSING (receives FIN simultaneously)'],
    who: 'active close',
  },
  {
    state: 'FIN_WAIT_2',
    color: '#fb923c',
    description: 'FIN has been acknowledged. Waiting for the remote to send its own FIN. The connection is half-closed — the local side cannot send, but can still receive.',
    next: ['TIME_WAIT (receives remote FIN, sends ACK)'],
    who: 'active close',
  },
  {
    state: 'CLOSE_WAIT',
    color: '#e879f9',
    description: 'Received a FIN from the remote. The application must now close its end. If an application holds sockets in CLOSE_WAIT indefinitely, it has a socket leak — a common production bug.',
    next: ['LAST_ACK (application closes, sends FIN)'],
    who: 'passive close',
  },
  {
    state: 'LAST_ACK',
    color: '#f472b6',
    description: 'Sent a FIN and waiting for the final ACK from the active-close side. Once this ACK arrives, the connection is fully closed.',
    next: ['CLOSED (receives final ACK)'],
    who: 'passive close',
  },
  {
    state: 'TIME_WAIT',
    color: '#34d399',
    description: '2×MSL wait (Maximum Segment Lifetime, typically 2×60s = 2 minutes). Ensures any delayed packets from this connection are absorbed before the port is reused. A server with millions of short connections can exhaust port space due to TIME_WAIT — tunable via tcp_tw_reuse.',
    next: ['CLOSED (2×MSL timer expires)'],
    who: 'active close',
  },
]

function TCPStateMachine() {
  const [active, setActive] = useState<number | null>(null)
  const s = active !== null ? TCP_STATES[active] : null

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 4px' }}>Interactive — TCP Connection State Machine</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 20px' }}>Click any TCP state to understand what it means, which side is in it, and what triggers the transition.</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: active !== null ? 20 : 0 }}>
        {TCP_STATES.map((ts, i) => (
          <button key={ts.state} onClick={() => setActive(active === i ? null : i)}
            style={{ padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, fontFamily: FONT_MONO, cursor: 'pointer', border: `1px solid ${ts.color}`, background: active === i ? ts.color : `${ts.color}15`, color: active === i ? '#fff' : ts.color, transition: 'all 0.2s' }}>
            {ts.state}
          </button>
        ))}
      </div>

      {s && (
        <div style={{ background: `${s.color}08`, border: `1px solid ${s.color}30`, borderRadius: 12, padding: '20px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: s.color, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.1em', background: `${s.color}20`, padding: '4px 10px', borderRadius: 6 }}>{s.who}</span>
            <span style={{ fontSize: 18, fontWeight: 900, color: 'var(--text)', fontFamily: FONT_MONO }}>{s.state}</span>
          </div>
          <p style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 16px' }}>{s.description}</p>
          <p style={{ fontSize: 11, fontWeight: 700, color: s.color, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Transitions to:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {s.next.map((n, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ color: s.color, fontWeight: 800 }}>→</span>
                <code style={{ fontSize: 13, color: '#e2e8f0', background: '#0d1117', padding: '4px 10px', borderRadius: 6, fontFamily: FONT_MONO }}>{n}</code>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function TCPIPModel() {
  return (
    <LearnLayout
      title="The TCP/IP Model — How the Internet Works"
      description="The four-layer model that actually runs the internet — from the protocol that created it, to the IP header fields, TCP state machine, and how every packet travels from your keyboard to a server on the other side of the world."
      section="Networking Fundamentals — Module 4"
      readTime="35–50 min"
      updatedAt="May 2026"
    >

      {/* ── Chapter 1 ── */}
      <Chapter
        n="1"
        title="The Day Two Engineers Saved the Internet"
        subtitle="In 1974, Vint Cerf and Bob Kahn published a paper that would become the foundation of the internet. The problem they were solving — how to connect fundamentally different networks — is the same problem TCP/IP solves today."
      />

      <StoryBox>
        <p>1973. ARPANET exists — the US military's experimental network. But ARPANET is just one network. There are also packet radio networks, satellite networks, and Ethernet LANs being developed at Xerox PARC. Each uses different protocols, different addressing, different everything. If you are on ARPANET and want to talk to someone on a satellite network, you cannot. The networks are islands.</p>
        <p style={{ margin: '12px 0 0' }}>Vint Cerf and Bob Kahn's insight: you cannot make every network speak the same low-level language — too many different physical technologies. But you can create a thin software layer that sits on top of any network, hides the differences, and provides a universal way to route packets between them. They called this the Transmission Control Program. In 1978 they split it into two: TCP (handling reliable delivery) and IP (handling addressing and routing). On January 1, 1983 — "Flag Day" — ARPANET switched to TCP/IP. The modern internet was born.</p>
      </StoryBox>

      <Para>
        The genius of TCP/IP is in what it does <em>not</em> do. It does not specify how to build cables
        or wireless radios. It does not tell applications how to format their data. It does not require
        networks to be built in any particular way. It only specifies two things: how to address and
        route packets between networks (IP), and how to reliably deliver data between processes (TCP).
        Everything else is intentionally left to the layers above and below.
      </Para>

      <Para>
        This philosophy — called the <Accent>end-to-end principle</Accent> — says: put complexity at the
        edges (in the applications and endpoints), keep the network simple and dumb in the middle.
        Routers just forward packets. They do not store them, guarantee delivery, or process their contents.
        All reliability, error correction, and application logic happens in the endpoints.
        This is why the internet is so resilient: the network itself has no state to corrupt or fail.
      </Para>

      <WowBox emoji="🌐" title="The Internet's Most Important Number">
        RFC 791 (IPv4, published 1981) is 45 pages. RFC 793 (TCP, published 1981) is 85 pages. Together, 130 pages of specification define the protocols that carry approximately 5 exabytes of data per day across the modern internet. The original authors estimated the internet would never need more than a few hundred hosts. IPv4's 32-bit address space (4.3 billion addresses) seemed infinite in 1981. By 2011, IANA had allocated the last IPv4 address block. 130 pages changed the world — and then nearly broke it 30 years later.
      </WowBox>

      <Divider />

      {/* ── Chapter 2 ── */}
      <Chapter
        n="2"
        title="The Four-Layer Model — TCP/IP's Design Philosophy"
        subtitle="TCP/IP has four layers, not seven. This is not laziness — it reflects a deliberate philosophy about what a network should and should not do."
      />

      <Para>
        The <Accent>TCP/IP model</Accent> (also called the Internet model or DoD model) has four layers:
        Network Access, Internet, Transport, and Application. Each layer has a clean boundary with the
        layer above: it provides a service, hides the implementation details, and asks nothing of the
        layers it does not control.
      </Para>

      <CodeBlock title="The four TCP/IP layers and their responsibilities">
{`┌──────────────────────────────────────────────────────────────────┐
│  APPLICATION LAYER                                               │
│  HTTP, HTTPS, DNS, SMTP, SSH, FTP, DHCP, SNMP, WebSocket...    │
│  "What does the application want to say, and how?"              │
│  Handles: session management, encoding, encryption (TLS), app   │
│           protocol logic (HTTP verbs, DNS query format, etc.)   │
├──────────────────────────────────────────────────────────────────┤
│  TRANSPORT LAYER                                                 │
│  TCP, UDP, SCTP, QUIC                                           │
│  "Get this data from process A on machine X to process B on Y"  │
│  Handles: port multiplexing, reliability (TCP), ordering (TCP), │
│           flow/congestion control (TCP), speed (UDP)            │
├──────────────────────────────────────────────────────────────────┤
│  INTERNET LAYER                                                  │
│  IPv4, IPv6, ICMP, ARP, OSPF, BGP                              │
│  "Get this packet from network A to network B, anywhere on Earth"│
│  Handles: logical addressing (IP), routing, fragmentation,      │
│           error reporting (ICMP), path discovery               │
├──────────────────────────────────────────────────────────────────┤
│  NETWORK ACCESS LAYER (Link Layer)                               │
│  Ethernet, Wi-Fi, PPP, DSL, LTE, fiber                         │
│  "Get this frame across this one physical link"                 │
│  Handles: physical addressing (MAC), framing, error detection   │
│           (CRC), medium access (CSMA/CD, CSMA/CA)              │
└──────────────────────────────────────────────────────────────────┘`}
      </CodeBlock>

      <H2>The Key Difference From OSI: Trust the Edges</H2>
      <Para>
        OSI assumes the network must provide Session and Presentation services to applications.
        TCP/IP says: those are application concerns. HTTP manages its own sessions.
        TLS handles its own encryption. JSON defines its own encoding.
        The network provides one universal service: deliver a packet from A to B.
        How applications use that service is entirely their business.
      </Para>
      <Para>
        This is why TCP/IP evolved while OSI stagnated. When the web needed persistent connections,
        HTTP/1.1 added keep-alive — no protocol changes at L3 or L4. When video needed lower latency,
        WebRTC added real-time extensions — no changes below the Application layer. When TCP proved
        too slow for mobile, QUIC rebuilt reliability over UDP — no changes to IP.
        Every innovation happened at the Application layer without touching the internet infrastructure.
      </Para>

      <TCPIPLayerExplorer />

      <Divider />

      {/* ── Chapter 3 ── */}
      <Chapter
        n="3"
        title="Network Access Layer — Where IP Meets the Physical World"
        subtitle="TCP/IP's lowest layer is intentionally vague. It says: 'use whatever physical network you have.' This is what makes TCP/IP run identically over fiber, Wi-Fi, 5G, and satellite."
      />

      <StoryBox>
        <p>Your laptop sends a TCP/IP packet to a server in Tokyo. The first hop travels over Wi-Fi to your router. The router sends it over DSL to your ISP. Your ISP transmits it over fiber to a submarine cable landing station. The cable crosses the Pacific as pulses of laser light. On the other side, more fiber carries it to the datacenter, where Ethernet connects the server's NIC. Five completely different physical technologies — and TCP/IP runs over all of them, unchanged.</p>
      </StoryBox>

      <Para>
        The Network Access layer corresponds to OSI Layers 1 and 2 combined. TCP/IP deliberately
        does not specify this layer's implementation — it just says "use whatever link technology
        you have." In practice, this is almost always Ethernet or Wi-Fi in modern networks,
        but TCP/IP is equally happy over satellite, 5G, MPLS, or a carrier pigeon (RFC 1149 is a real RFC).
      </Para>

      <H2>What the Network Access Layer Must Provide to TCP/IP</H2>
      <Para>
        For IP to work, the Network Access layer must be able to:
        transmit an IP packet across one physical link,
        identify devices on the link (MAC addresses for Ethernet/Wi-Fi),
        detect transmission errors (CRC checksums), and
        handle medium access (prevent two devices transmitting simultaneously — CSMA/CD, CSMA/CA).
        That's it. Everything else is IP's problem.
      </Para>

      <CodeBlock title="How IP uses the Network Access layer">
{`IP wants to send a packet to 192.168.1.1 (next hop):

  1. Is 192.168.1.1 on the same subnet? YES → deliver locally
     NO → send to default gateway (192.168.1.1 itself, or higher router)

  2. What MAC address does 192.168.1.1 have?
     → ARP cache lookup
     → If not found: broadcast ARP request "who has 192.168.1.1?"
     → Wait for ARP reply with MAC address

  3. Build Ethernet frame:
     Dst MAC: B8:E8:56:44:55:66   (from ARP)
     Src MAC: A4:C3:F0:11:22:33   (own NIC)
     EtherType: 0x0800 (IPv4)
     Payload: [IP header][TCP header][HTTP data]
     CRC: computed and appended

  4. Hand frame to physical NIC → transmit on wire/radio

  IP has no idea whether this is Ethernet, Wi-Fi, or something else.
  It just calls the link layer's "send" function and moves on.`}
      </CodeBlock>

      <H2>The Maximum Transmission Unit (MTU) Constraint</H2>
      <Para>
        Every link technology has a maximum frame payload size — the MTU.
        Standard Ethernet MTU is 1,500 bytes. This constrains the maximum IP packet size that can
        traverse that link without fragmentation. The TCP/IP stack negotiates the <Accent>MSS
        (Maximum Segment Size)</Accent> during the TCP handshake: MSS = MTU − 20 (IP header) − 20 (TCP header) = 1,460 bytes.
        This is why you see 1,460-byte TCP segments everywhere on standard Ethernet networks.
      </Para>

      <Divider />

      {/* ── Chapter 4 ── */}
      <Chapter
        n="4"
        title="Internet Layer — The Protocol That Routes the World"
        subtitle="IP is the most important protocol in existence. Every device on the internet has an IP address. Every packet that crosses the internet has an IP header. Understanding IP means understanding how the internet works at its most fundamental level."
      />

      <StoryBox>
        <p>There are approximately 900,000 routes in the global BGP routing table as of 2026. Every major router on the internet has a copy. When a packet from your laptop starts its journey to a server in Tokyo, the first router in your ISP's network looks up the destination IP in its routing table, picks the best next hop, and forwards the packet. The next router does the same. And the next. No router knows the full path. No single router controls the whole journey. Each one makes one independent decision. This is IP routing.</p>
      </StoryBox>

      <Para>
        IP (Internet Protocol) provides two things: <Accent>logical addressing</Accent> (every device
        gets an IP address that encodes its location in the network) and <Accent>routing</Accent>
        (packets are forwarded hop-by-hop based on the destination IP until they reach the destination).
        That is all IP does. It is a best-effort, connectionless, unreliable delivery service —
        it will try to deliver the packet, but makes no guarantees. Reliability is TCP's job.
      </Para>

      <H2>IPv4 Addressing — The 32-Bit Address Space</H2>
      <Para>
        IPv4 addresses are 32-bit numbers written in dotted-decimal notation: <Code>192.168.1.5</Code>.
        The address is hierarchical: the network portion (determined by the subnet mask) identifies
        the network, and the host portion identifies the specific device within it.
        A subnet mask of <Code>/24</Code> (255.255.255.0) means the first 24 bits are the network
        and the last 8 bits are the host — giving 254 usable host addresses per subnet.
      </Para>

      <CodeBlock title="IPv4 address classes and special ranges">
{`PRIVATE ADDRESS RANGES (RFC 1918 — not routable on the internet):
  10.0.0.0/8         (16,777,214 hosts) — large enterprises, cloud VPCs
  172.16.0.0/12      (1,048,574 hosts)  — medium networks, Docker default
  192.168.0.0/16     (65,534 hosts)     — home networks, small offices

SPECIAL PURPOSE:
  127.0.0.0/8        Loopback — 127.0.0.1 always means "this machine"
  169.254.0.0/16     Link-local / APIPA — auto-assigned when DHCP fails
  0.0.0.0/0          Default route — matches everything (lowest priority)
  255.255.255.255    Limited broadcast — all hosts on local segment
  224.0.0.0/4        Multicast — one source to many subscribed receivers

PUBLIC ADDRESS SPACE:
  Everything else — globally unique, routable on the internet.
  Assigned by IANA → Regional Internet Registries (ARIN, RIPE, APNIC) → ISPs → you.
  Total IPv4 space: 2³² = 4,294,967,296 addresses. Effectively exhausted in 2011.`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 5 ── */}
      <Chapter
        n="5"
        title="The IPv4 Header — Every Field, Every Bit"
        subtitle="The IPv4 header is 20 bytes (without options) that every router on the internet reads for every single packet. Understanding each field means understanding how routing, fragmentation, QoS, and diagnostics actually work."
      />

      <CodeBlock title="IPv4 header structure (RFC 791) — 20 bytes minimum">
{`0                   1                   2                   3
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
┌─────┬──────┬──────────────┬──────────────────────────────────────┐
│ Ver │ IHL  │  DSCP   │ECN │         Total Length (16)            │
├─────┴──────┴──────────────┼────────────┬──┬────────────────────┤
│      Identification (16)  │  Flags (3) │  Fragment Offset (13)│
├──────────────┬────────────┴────────────┴──┴────────────────────┤
│  TTL (8)    │  Protocol (8)           │   Header Checksum (16) │
├──────────────┴──────────────────────────────────────────────────┤
│                    Source IP Address (32)                        │
├─────────────────────────────────────────────────────────────────┤
│                 Destination IP Address (32)                      │
└─────────────────────────────────────────────────────────────────┘
                    [Options, if IHL > 5]`}
      </CodeBlock>

      <H2>Field-by-Field Breakdown</H2>

      <CodeBlock title="Every IPv4 header field explained">
{`VERSION (4 bits):
  Always 4 for IPv4. (IPv6 = 6, but uses a completely different header format.)

IHL — Internet Header Length (4 bits):
  Length of the IP header in 32-bit words. Minimum value: 5 (= 5×4 = 20 bytes).
  If options are present, IHL can be up to 15 (= 60 bytes).
  IP options rarely used in practice; most packets have IHL=5.

DSCP — Differentiated Services Code Point (6 bits, formerly Type of Service):
  QoS marking. Routers use this to prioritize packets:
  DSCP 0   (CS0) = Best Effort — default for most traffic
  DSCP 46  (EF)  = Expedited Forwarding — VoIP, video conferencing
  DSCP 34  (AF41)= Assured Forwarding — interactive video
  DSCP 16  (CS2) = OAM — management traffic

ECN — Explicit Congestion Notification (2 bits):
  When a router is becoming congested, instead of dropping packets it sets ECN
  bits to signal congestion. The receiver reflects this to the sender in TCP ACKs.
  The sender slows down. Reduces latency by avoiding drops entirely.

TOTAL LENGTH (16 bits):
  Total size of the IP packet (header + payload) in bytes.
  Maximum: 65,535 bytes. Practical maximum limited by MTU (1,500 bytes on Ethernet).

IDENTIFICATION (16 bits):
  Random ID assigned to each original packet. All fragments of the same packet
  share the same Identification value — used to group them for reassembly.

FLAGS (3 bits):
  Bit 0: Reserved, must be 0.
  Bit 1: DF (Don't Fragment). DF=1: do not fragment; drop and send ICMP if too big.
          Used by Path MTU Discovery to find minimum MTU along a path.
  Bit 2: MF (More Fragments). MF=1: more fragments follow. MF=0: last fragment.

FRAGMENT OFFSET (13 bits):
  Byte position of this fragment in the original packet, divided by 8.
  Fragment 1: offset=0. Fragment 2: offset=185 (bytes 1480–2959 of original).

TTL — Time To Live (8 bits):
  Decremented by 1 at each router. When TTL=0: packet dropped, ICMP Time Exceeded
  sent to source. Default values: Linux=64, Windows=128, Cisco IOS=255.
  traceroute exploits TTL: send with TTL=1,2,3... each router reveals itself.

PROTOCOL (8 bits):
  Identifies which Layer 4 protocol is inside this packet:
  1=ICMP, 6=TCP, 17=UDP, 41=IPv6, 47=GRE, 50=ESP (IPSec), 89=OSPF.
  This is the SAP (Service Access Point) for the Internet layer.

HEADER CHECKSUM (16 bits):
  One's complement checksum of the IP header only (not the payload).
  Recomputed at every router because TTL changes — an expensive operation at scale.
  IPv6 eliminated the header checksum entirely (link-layer and transport checksums suffice).

SOURCE IP (32 bits): The originating device's IP address.
  Note: NAT rewrites this as packets cross the gateway.

DESTINATION IP (32 bits): The target device's IP address.
  This is what every router uses to make its forwarding decision.
  Unchanged end-to-end (unless NAT or proxy involved).`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 6 ── */}
      <Chapter
        n="6"
        title="ICMP — The Internet's Error and Diagnostic Layer"
        subtitle="Every network engineer's best friend. ICMP is how the internet tells you when something is wrong — and it's the protocol behind ping, traceroute, and MTU discovery."
      />

      <Para>
        ICMP (Internet Control Message Protocol, RFC 792) runs directly over IP (Protocol=1) and provides
        error reporting and network diagnostics. It is not a transport protocol — you cannot send application
        data over ICMP. It exists to let network devices communicate problems back to the sender.
      </Para>

      <CodeBlock title="Important ICMP message types">
{`TYPE 0  — Echo Reply        (response to a ping)
TYPE 3  — Destination Unreachable:
  Code 0: Network Unreachable     — no route to the destination network
  Code 1: Host Unreachable        — route exists but host is down
  Code 3: Port Unreachable        — host is up but nothing listening on that port
  Code 4: Fragmentation Needed    — packet too big, DF=1 → Path MTU Discovery
  Code 13: Communication Administratively Prohibited — firewall blocked it
TYPE 5  — Redirect            — router tells host to use a better gateway
TYPE 8  — Echo Request        (the ping itself)
TYPE 11 — Time Exceeded:
  Code 0: TTL Exceeded in Transit — traceroute exploits this
  Code 1: Fragment Reassembly Timeout — not all fragments arrived in time
TYPE 12 — Parameter Problem   — malformed IP header field

USING ICMP FOR DIAGNOSTICS:
  ping 8.8.8.8         → ICMP Echo Request + Echo Reply (tests end-to-end)
  traceroute 8.8.8.8   → ICMP TTL Exceeded at each hop reveals path
  ping -M do -s 1400   → ICMP Fragmentation Needed reveals MTU limits`}
      </CodeBlock>

      <Warn title="Blocking all ICMP breaks important network functions">
        Some firewalls block all ICMP "for security." This is a mistake. Blocking ICMP Type 3 Code 4 ("Fragmentation Needed") breaks Path MTU Discovery, causing TCP black holes. Blocking ICMP Type 11 ("TTL Exceeded") breaks traceroute — you lose the ability to see where packets die. Blocking ICMP Type 3 Code 1-3 ("Host/Port Unreachable") means applications wait for full TCP timeout (seconds) before discovering a host is down. Security rule: block ICMP Echo Request from the internet to your servers if you want — but never block ICMP Type 3 or Type 11. Those are network infrastructure messages, not attack vectors.
      </Warn>

      <Divider />

      {/* ── Chapter 7 ── */}
      <Chapter
        n="7"
        title="Transport Layer — TCP, Ports, and Reliable Delivery"
        subtitle="The Transport layer is where the internet gets its reliability. IP delivers packets to a machine. TCP delivers data to a specific process, in order, without gaps, without corruption — even when the network loses, reorders, and corrupts packets."
      />

      <StoryBox>
        <p>You download a 100 MB file. Your TCP stack splits it into 68,027 segments of 1,460 bytes each. Each segment is numbered. The other side acknowledges every segment it receives. Three segments get dropped by a congested router — TCP detects the gap in acknowledgements and retransmits exactly those three. The receiving application gets exactly 100 MB, in perfect order, with no corruption. It never knew anything was lost.</p>
        <p style={{ margin: '12px 0 0' }}>This is TCP's contract: whatever the application sends, the application on the other end receives — exactly, in order, or TCP keeps trying until the connection fails entirely.</p>
      </StoryBox>

      <H2>The TCP Header — Every Field Explained</H2>

      <CodeBlock title="TCP header structure (RFC 793) — 20 bytes minimum">
{`0                   1                   2                   3
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
┌──────────────────────────┬──────────────────────────────────────┐
│      Source Port (16)    │       Destination Port (16)          │
├──────────────────────────┴──────────────────────────────────────┤
│                    Sequence Number (32)                          │
├─────────────────────────────────────────────────────────────────┤
│                  Acknowledgment Number (32)                      │
├──────┬──────────┬──┬──┬──┬──┬──┬──┬──┬──┬─────────────────────┤
│Offset│ Reserved │CW│EC│UR│AC│PS│RS│SY│FI│    Window (16)      │
├──────┴──────────┴──┴──┴──┴──┴──┴──┴──┴──┴─────────────────────┤
│         Checksum (16)                │    Urgent Pointer (16)   │
└──────────────────────────────────────┴─────────────────────────┘
                    [Options — variable length]`}
      </CodeBlock>

      <CodeBlock title="TCP header fields — what each one does">
{`SOURCE PORT (16 bits):
  The port number of the sending process. For clients: randomly chosen ephemeral
  port (49152–65535). For servers: the well-known port they are listening on.

DESTINATION PORT (16 bits):
  The port number of the receiving process. This is the Service Access Point
  that tells the remote OS which application socket to deliver data to.

SEQUENCE NUMBER (32 bits):
  The byte position in the sender's data stream of the first byte in this segment.
  Initial Sequence Number (ISN) is randomly chosen during SYN (prevents injection attacks).
  After ISN, each byte sent increments the sequence number by 1.
  Allows receiver to detect gaps, reorder out-of-sequence segments, detect duplicates.

ACKNOWLEDGMENT NUMBER (32 bits):
  Only valid when ACK flag is set. The next sequence number the sender expects to receive.
  ACK=4001 means "I have received bytes 1–4000, please send starting from 4001."
  This is cumulative: one ACK covers all bytes up to ACK-1.
  Selective ACK (SACK option) allows acknowledging non-contiguous ranges.

DATA OFFSET (4 bits):
  Length of TCP header in 32-bit words. Minimum 5 (=20 bytes, no options).
  Maximum 15 (=60 bytes, with all options). Tells receiver where the data begins.

FLAGS (9 bits — each is 1 bit):
  NS  (Nonce Sum)    — ECN-related, rarely used
  CWR (Congestion Window Reduced) — sender reduced cwnd due to ECN
  ECE (ECN-Echo)     — receiver echoes ECN congestion signal to sender
  URG (Urgent)       — Urgent Pointer field is valid (used by Telnet, almost never now)
  ACK (Acknowledgment) — ACK number is valid. Set on all segments after initial SYN.
  PSH (Push)         — tell receiver to push data to application immediately (no buffering)
  RST (Reset)        — abort connection immediately. Used when port is closed or error occurs.
  SYN (Synchronize)  — used only in first packet of handshake to synchronize sequence numbers
  FIN (Finish)       — sender has no more data. Initiates graceful connection close.

WINDOW SIZE (16 bits):
  How many bytes the receiver is willing to accept before it must be acknowledged.
  This is TCP flow control — the receiver tells the sender its available buffer space.
  Maximum raw window: 65,535 bytes (64 KB). With Window Scaling option: up to 1 GB.
  If window=0: sender must stop transmitting (receiver buffer full — backpressure).

CHECKSUM (16 bits):
  One's complement checksum over a pseudo-header (src IP, dst IP, protocol, TCP length)
  plus the TCP header and data. Detects bit errors in the TCP segment.
  Unlike IP header checksum, this covers the payload too.

URGENT POINTER (16 bits):
  Only valid when URG flag set. Points to the last byte of urgent data.
  Used by Telnet's interrupt character. Effectively obsolete in modern protocols.`}
      </CodeBlock>

      <H2>TCP Options — The Extensions That Enable Modern Features</H2>

      <CodeBlock title="Critical TCP options (negotiated during SYN/SYN-ACK)">
{`MSS — Maximum Segment Size (kind=2):
  Tells the remote the largest TCP segment it should send.
  Negotiated during SYN: client announces MSS, server announces MSS.
  Sender uses min(remote MSS, local MSS, Path MTU - headers) as actual MSS.
  Prevents fragmentation — MSS is chosen so TCP segment + headers ≤ link MTU.

SACK — Selective Acknowledgment (kind=4, RFC 2018):
  Without SACK: if segment 3 is lost out of 1–10, receiver can only ACK=3.
  Sender must retransmit from 3 onwards — even if 4–10 arrived fine.
  With SACK: receiver reports "I have 1–2 and 4–10, missing 3."
  Sender retransmits ONLY segment 3. Massive throughput improvement on lossy links.
  Both sides advertise SACK support during SYN. Negotiated, not forced.

TIMESTAMPS (kind=8, RFC 7323):
  Enables two features:
  1. RTTM (Round-Trip Time Measurement): accurate RTT estimates for RTO calculation.
  2. PAWS (Protection Against Wrapped Sequences): rejects old duplicate segments
     that arrive after sequence number wrap-around (on high-speed links).

WINDOW SCALE (kind=3, RFC 7323):
  Extends the 16-bit window field by a scale factor (shift count).
  Example: Window=65535, Scale=7 → actual window = 65535 × 2^7 = 8,388,480 bytes (8 MB).
  Essential for high-bandwidth high-latency links (e.g., satellite with 500ms RTT).
  Without scaling, max throughput on satellite: 64KB / 0.5s RTT = 1 Mbps — unusable.`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 8 ── */}
      <Chapter
        n="8"
        title="The TCP Connection Lifecycle — From SYN to FIN"
        subtitle="A TCP connection goes through a precise sequence of states. Missing any state, or getting stuck in one, causes the network bugs that are hardest to diagnose."
      />

      <StoryBox>
        <p>A production engineer is paged at 3 AM: the application server cannot accept new connections. She SSHes in, runs <code>ss -s</code>, and sees 50,000 sockets in TIME_WAIT state. The server ran out of ephemeral ports. New connection attempts are rejected with "Address already in use." She knows exactly what happened — and exactly how to fix it — because she understands the TCP connection lifecycle.</p>
      </StoryBox>

      <H2>The Three-Way Handshake — Connection Establishment</H2>

      <CodeBlock title="TCP 3-way handshake — every detail">
{`CLIENT                                         SERVER
  │                                                │
  │  SYN  (Seq=1000, MSS=1460, SACK, WinScale=7) │
  │ ─────────────────────────────────────────────▶ │
  │  "I want to connect. My ISN is 1000.           │
  │   Here are my TCP capabilities."               │
  │                                                │ (Server transitions:
  │                                                │  LISTEN → SYN_RECEIVED)
  │  SYN-ACK (Seq=5000, Ack=1001, MSS=1460, ...)  │
  │ ◀───────────────────────────────────────────── │
  │  "OK. My ISN is 5000. I acknowledge your 1000  │
  │   (next byte I expect: 1001)."                 │
  │                                                │
  │  ACK (Seq=1001, Ack=5001)                      │ (Both transition to:
  │ ─────────────────────────────────────────────▶ │  ESTABLISHED)
  │  "Got it. Connection open. Here comes data."   │
  │                                                │
  │  [DATA] HTTP request, TLS handshake, etc.      │
  │ ─────────────────────────────────────────────▶ │

COST: 1 RTT (round trip) before any application data flows.
TLS 1.3 adds 1 more RTT on top: 2 RTTs total for HTTPS.
HTTP/3 (QUIC) reduces this to 0 RTT for returning connections.`}
      </CodeBlock>

      <H2>The Four-Way Termination — Graceful Close</H2>

      <CodeBlock title="TCP graceful connection termination">
{`CLIENT                                         SERVER
  │                                                │
  │  FIN (Seq=8001)                               │
  │ ─────────────────────────────────────────────▶ │  CLIENT: FIN_WAIT_1
  │  "I'm done sending data."                      │  SERVER: CLOSE_WAIT
  │                                                │
  │  ACK (Ack=8002)                               │
  │ ◀───────────────────────────────────────────── │  CLIENT: FIN_WAIT_2
  │  "Got your FIN. I still might have data..."   │  SERVER: (still sending)
  │                                                │
  │  [Server may send remaining data here]         │
  │ ◀───────────────────────────────────────────── │
  │                                                │
  │  FIN (Seq=12000)                              │
  │ ◀───────────────────────────────────────────── │  SERVER: LAST_ACK
  │  "I'm also done sending."                      │  CLIENT: TIME_WAIT
  │                                                │
  │  ACK (Ack=12001)                              │
  │ ─────────────────────────────────────────────▶ │  SERVER: CLOSED
  │                                                │
  │  [Client waits 2×MSL ≈ 2 minutes]             │
  │  [Then: CLIENT: CLOSED]                       │

RST — IMMEDIATE CLOSE:
  Either side can send RST to immediately abort.
  RST closes the connection with no DATA_WAIT, no FIN-ACK exchange.
  Used when: connecting to a closed port, detecting half-open connections,
  load balancers health-checking, or detecting connection anomalies.`}
      </CodeBlock>

      <TCPStateMachine />

      <H2>TIME_WAIT — Why It Exists and Why It Causes Problems</H2>
      <Para>
        TIME_WAIT lasts <Accent>2×MSL</Accent> (Maximum Segment Lifetime, typically 60 seconds, so 120s total).
        It exists for two reasons: (1) ensure the final ACK reaches the server — if it is lost, the server
        retransmits its FIN and the client in TIME_WAIT can re-send the ACK; (2) ensure any delayed packets
        from the old connection are absorbed before the port tuple is reused, preventing them from being
        misinterpreted by a new connection with the same 5-tuple.
      </Para>
      <Para>
        The problem: a high-traffic server making many short connections (HTTP/1.0, microservices) can
        accumulate tens of thousands of TIME_WAIT sockets. If the ephemeral port range is exhausted
        (typically 49152–65535 = 16,383 ports), new connections fail with EADDRNOTAVAIL.
        Fixes: <Code>net.ipv4.tcp_tw_reuse=1</Code> allows reusing TIME_WAIT sockets for new connections
        when it is safe; keep-alive / persistent connections eliminate short connections entirely;
        HTTP/2 multiplexes many requests over one connection, dramatically reducing connection churn.
      </Para>

      <Divider />

      {/* ── Chapter 9 ── */}
      <Chapter
        n="9"
        title="TCP Reliability — Flow Control and Congestion Control"
        subtitle="TCP's reliability is not just about retransmission. It has two separate systems for controlling transmission rate: one based on the receiver's capacity (flow control), one based on the network's capacity (congestion control). Understanding both is what separates senior engineers from juniors."
      />

      <H2>Flow Control — Receiver Controls the Sender</H2>
      <Para>
        Flow control prevents the sender from overwhelming a slow receiver.
        The receiver advertises its available buffer space in the <Accent>receive window (rwnd)</Accent>
        field of every ACK. The sender must not have more than rwnd bytes of unacknowledged data
        in flight at any time.
      </Para>

      <CodeBlock title="TCP flow control — the receive window in action">
{`SCENARIO: Receiver has a 64 KB buffer. Application reads data slowly.

  Sender sends 64 KB (full window).
  Application hasn't read yet — buffer is full.
  Receiver's next ACK: Window=0 (zero window probe)
  Sender: MUST STOP transmitting. Waits.

  Application finally reads 32 KB from the buffer.
  Receiver sends ACK with Window=32768 (32 KB available now).
  Sender: can transmit 32 KB more.

WINDOW SIZE with SCALING:
  Raw window field: 16 bits = max 65,535 bytes (64 KB)
  Window Scale option allows shifting: Window × 2^scale_factor
  With scale=7: 65535 × 128 = 8.3 MB window
  With scale=14: 65535 × 16384 = 1 GB window
  Essential for high-bandwidth networks (1 Gbps × 50ms RTT = 6.25 MB BDP)

BANDWIDTH-DELAY PRODUCT (BDP):
  The maximum data in flight for full utilization:
  BDP = Bandwidth × RTT
  1 Gbps × 50ms = 1,000,000,000 × 0.05 = 6,250,000 bytes = 6 MB
  You need at least a 6 MB window to saturate a 1 Gbps link with 50ms RTT.
  Without window scaling, you hit 64 KB limit → max throughput = 64KB/50ms = 10 Mbps.`}
      </CodeBlock>

      <H2>Congestion Control — TCP Controls the Network</H2>
      <Para>
        Congestion control prevents the sender from overwhelming the <em>network</em> (as opposed to
        the receiver). The network does not tell TCP when it is congested — TCP must infer it from
        packet loss. TCP maintains a <Accent>congestion window (cwnd)</Accent> — the maximum bytes it
        will send before waiting for ACKs, independent of rwnd. The actual limit is:
        <Code>flight_size ≤ min(cwnd, rwnd)</Code>.
      </Para>

      <CodeBlock title="TCP congestion control — slow start, AIMD, and modern algorithms">
{`SLOW START:
  Connection begins with cwnd = 1 MSS (1,460 bytes).
  After each ACK received: cwnd += 1 MSS.
  Result: cwnd doubles each RTT (exponential growth).
  1 MSS → 2 → 4 → 8 → 16 → ... until cwnd reaches ssthresh.

CONGESTION AVOIDANCE (after reaching ssthresh):
  cwnd += MSS²/cwnd per ACK (additive increase: +1 MSS per RTT).
  Grows linearly — careful probing for more bandwidth.

CONGESTION DETECTED:
  Signal 1 — 3 Duplicate ACKs (fast retransmit):
    "Something was lost but network still works."
    ssthresh = cwnd / 2
    cwnd = ssthresh (halved — AIMD: Additive Increase, Multiplicative Decrease)
    Retransmit the lost segment immediately (fast retransmit).

  Signal 2 — Timeout (RTO):
    "Network may be severely congested or broken."
    ssthresh = cwnd / 2
    cwnd = 1 MSS (back to slow start!)
    Much more aggressive reduction — could be a serious problem.

MODERN ALGORITHMS (beyond classic AIMD):
  CUBIC (Linux default since 3.0, RFC 8312):
    Uses cubic function for window growth — grows faster after a loss,
    slower near the previous max. Better for high-speed networks.

  BBR — Bottleneck Bandwidth and RTT (Google, Linux 4.9+):
    Does NOT rely on packet loss as congestion signal.
    Measures actual bandwidth and RTT, models the bottleneck,
    sends exactly at bottleneck bandwidth. Dramatically better throughput
    on high-loss links (satellite, mobile) and high-speed networks.
    Google's backbone uses BBR. YouTube, GCP use BBR.`}
      </CodeBlock>

      <WowBox emoji="📡" title="Why BBR Changed the Internet">
        Before BBR, TCP's loss-based congestion control was tuned for wired networks where loss meant congestion. On mobile and satellite links, loss often means radio interference — not congestion. Classic TCP would halve its window every time rain caused packet loss on a satellite link, achieving maybe 10% of available bandwidth. BBR ignores packet loss as a congestion signal and instead directly measures bandwidth and latency. On a satellite link with 1% packet loss rate, BBR achieves 50–100× higher throughput than CUBIC. Google reported 4% higher throughput globally after deploying BBR — at their scale, that is petabytes per day.
      </WowBox>

      <Divider />

      {/* ── Chapter 10 ── */}
      <Chapter
        n="10"
        title="UDP — The Protocol That Trusts You"
        subtitle="UDP is not a broken TCP. It is a deliberate choice — when your application handles reliability better than TCP can, or when any delay is worse than any loss, UDP is the right tool."
      />

      <Para>
        UDP (User Datagram Protocol, RFC 768) adds only four fields to the IP packet: source port,
        destination port, length, and checksum. That is 8 bytes of header. No connection, no sequence
        numbers, no acknowledgements, no retransmission, no flow control, no congestion control.
        Send a datagram, hope it arrives.
      </Para>

      <CodeBlock title="UDP header — 8 bytes total">
{`┌──────────────────────────┬──────────────────────────────────────┐
│      Source Port (16)    │       Destination Port (16)          │
├──────────────────────────┼──────────────────────────────────────┤
│         Length (16)      │           Checksum (16)              │
└──────────────────────────┴──────────────────────────────────────┘
│                   Data (variable)                               │
└─────────────────────────────────────────────────────────────────┘

LENGTH: Total length of UDP header + data in bytes.
CHECKSUM: Optional in IPv4 (all-zeros = no checksum). Mandatory in IPv6.
          Covers UDP pseudo-header (src IP, dst IP, protocol=17, UDP length) + UDP header + data.`}
      </CodeBlock>

      <H2>When to Use UDP — and When Not To</H2>

      <CodeBlock title="UDP vs TCP — the right choice for each use case">
{`USE UDP WHEN:

  Real-time audio/video (VoIP, video calls, live streaming):
  → A retransmitted packet arriving 200ms late is useless.
  → Better to skip the lost frame and play the next one.
  → UDP's fire-and-forget matches the application's needs.
  Protocols: RTP over UDP, WebRTC.

  DNS queries:
  → Tiny request + tiny response, fits in one datagram.
  → If lost, just retransmit the query after 500ms timeout.
  → No need for a TCP connection just to resolve one name.

  DHCP:
  → Client has no IP yet — cannot establish a TCP connection.
  → Broadcasts a UDP DHCP Discover, receives UDP DHCP Offer.

  SNMP, syslog, NTP:
  → Fire-and-forget monitoring data.
  → Occasional loss acceptable. Low overhead preferred.

  Online gaming:
  → Position updates: if packet lost, the NEXT position update supersedes it.
  → Retransmitting stale positions wastes time and bandwidth.

  QUIC (HTTP/3):
  → UDP used as base, but QUIC implements its OWN reliability per stream.
  → Each stream gets independent loss recovery — losing one stream's packet
    does NOT block other streams (no TCP head-of-line blocking).

USE TCP WHEN:
  File downloads, web pages (HTTP/1.1, HTTP/2): data must arrive complete.
  Email (SMTP, IMAP): messages cannot be partially lost.
  SSH: every keystroke must arrive, in order.
  Databases: transactions must be complete and ordered.
  APIs: request/response must be reliable.`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 11 ── */}
      <Chapter
        n="11"
        title="QUIC and HTTP/3 — Transport Reimagined"
        subtitle="TCP has fundamental limitations that cannot be fixed without breaking backward compatibility. QUIC, built by Google and standardized in RFC 9000, rebuilds reliable transport from scratch over UDP — and it is now the transport for a third of the web."
      />

      <StoryBox>
        <p>2012. Google's engineers are frustrated. HTTP/2 over TCP was supposed to fix web performance, but on mobile networks with 2% packet loss, HTTP/2 is actually <em>slower</em> than HTTP/1.1. Why? HTTP/2 multiplexes many streams over one TCP connection. When one packet is lost, TCP's head-of-line blocking freezes ALL streams while waiting for the retransmit — even streams that had no packet loss. The problem is in TCP itself, and TCP cannot be changed in the kernel of billions of devices overnight. So they built QUIC — reliable transport as a user-space library running over UDP.</p>
      </StoryBox>

      <H2>TCP's Problems That QUIC Solves</H2>

      <CodeBlock title="TCP limitations vs QUIC solutions">
{`PROBLEM 1 — HEAD-OF-LINE BLOCKING:
  TCP: one byte stream. If packet 5 is lost, bytes 6–1000 wait at the OS
       even if they belong to completely independent HTTP requests.
  QUIC: independent streams inside one connection. Packet loss in stream 3
        does not affect streams 1, 2, 4, 5. Each stream has its own
        reliable delivery, independently.

PROBLEM 2 — HANDSHAKE LATENCY:
  TCP: 1 RTT for 3-way handshake before data.
  HTTPS: +1 RTT for TLS 1.3 handshake = 2 RTTs before first byte.
  QUIC: combines transport + crypto handshake = 1 RTT on new connections.
        0-RTT on returning connections (reuse session ticket) — data sent
        in the FIRST packet, before any server reply.

PROBLEM 3 — OSSIFICATION (can't update TCP in the middle):
  TCP is implemented in OS kernels. Deploying a new feature requires:
  OS kernel update → OS vendor ships it → users install update → years pass.
  QUIC runs in user space (browser, library, CDN proxy). Update QUIC by
  updating Chrome or nginx — deployed in days.

PROBLEM 4 — CONNECTION MIGRATION:
  TCP connection is tied to a 5-tuple (src IP, src port, dst IP, dst port, proto).
  Switch from Wi-Fi to 5G → your IP changes → TCP connection breaks.
  QUIC uses a 64-bit Connection ID, not the IP tuple. Switch networks and
  the QUIC connection survives — identified by ID, not IP.

PROBLEM 5 — ENCRYPTED BY DEFAULT:
  TCP headers are visible to every middlebox. Carriers use TCP headers
  for traffic shaping, injection, and manipulation.
  QUIC encrypts nearly all headers — only the Connection ID is visible.
  Middleboxes cannot tamper with QUIC connections.`}
      </CodeBlock>

      <WowBox emoji="🚀" title="QUIC by the Numbers">
        As of 2026, HTTP/3 (which runs exclusively over QUIC) is used by approximately 32% of all websites and handles an even larger fraction of actual internet traffic — Google, YouTube, Facebook, and Cloudflare all serve HTTP/3 by default. Google measured 3% lower page load time globally. On high-loss mobile networks (5% packet loss), QUIC shows 10–30% improvement over HTTP/2 over TCP. QUIC is now standardized in RFC 9000, RFC 9001 (QUIC+TLS), and RFC 9002 (QUIC congestion control). HTTP/3 is RFC 9114.
      </WowBox>

      <Divider />

      {/* ── Chapter 12 ── */}
      <Chapter
        n="12"
        title="Application Layer — Where Your Code Lives"
        subtitle="The Application layer is not a single protocol. It is thousands of protocols, each defining how a specific type of application communicates. HTTP, DNS, SMTP, SSH — each solves a different problem."
      />

      <Para>
        The TCP/IP Application layer combines what OSI separates into Session (L5), Presentation (L6),
        and Application (L7). This means application protocols are responsible for their own session
        management, data encoding, and encryption. In practice, this is handled by libraries:
        TLS for encryption, JSON/Protobuf for encoding, HTTP/2 for session multiplexing.
        Your application code uses these libraries without implementing them from scratch.
      </Para>

      <H2>HTTP — The Protocol That Runs the Web</H2>
      <Para>
        HTTP (HyperText Transfer Protocol) defines how web clients request resources and servers respond.
        HTTP/1.1 (RFC 7230–7235) introduced persistent connections (one TCP connection for multiple requests)
        and chunked transfer encoding. HTTP/2 (RFC 7540) added header compression (HPACK), binary framing,
        and stream multiplexing. HTTP/3 (RFC 9114) moved to QUIC to eliminate head-of-line blocking.
      </Para>

      <CodeBlock title="HTTP version comparison">
{`HTTP/1.1 (1997):
  Request-response pairs over TCP. Text-based headers.
  Problem: one outstanding request per connection. To parallelize,
  browsers open 6 TCP connections per domain → 6 handshakes → waste.
  Head-of-line blocking: later requests wait for earlier responses.

HTTP/2 (2015):
  Binary framing (not text). Header compression with HPACK.
  Multiplexing: many requests on ONE TCP connection simultaneously.
  Server push: server sends resources before client asks.
  Problem: still over TCP. TCP's HOL blocking affects all HTTP/2 streams
  when one packet is lost. At 2% packet loss, slower than HTTP/1.1.

HTTP/3 (2022, RFC 9114):
  Runs over QUIC (UDP-based). Independent stream loss recovery.
  0-RTT connection resumption. Connection migration (Wi-Fi → 5G).
  Header compression with QPACK (designed for QUIC's out-of-order delivery).
  As of 2026: deployed by Google, Cloudflare, Facebook. 32% of the web.`}
      </CodeBlock>

      <H2>DNS — The Internet's Phone Book</H2>
      <Para>
        DNS (Domain Name System, RFC 1035) translates human-readable names (<Code>google.com</Code>)
        to IP addresses (<Code>142.250.182.4</Code>). Without DNS, you would type IP addresses for every
        website. DNS is a distributed, hierarchical, globally cached database.
      </Para>

      <CodeBlock title="DNS resolution hierarchy — how google.com is resolved">
{`Step 1: Check local DNS cache
  Your OS checks its cache. If there's a valid record for google.com: done.
  DNS records have a TTL — after expiry, re-query.

Step 2: Query recursive resolver (your ISP's or 8.8.8.8)
  Your OS sends a DNS query to the configured recursive resolver.
  The resolver checks its own cache. If hit: return the answer. Done.

Step 3: Resolver queries root nameservers (if cache miss)
  13 logical root nameserver clusters worldwide (a.root-servers.net through m.)
  Root nameserver doesn't know google.com's IP, but knows who handles .com:
  → "Ask the .com TLD nameserver at 192.5.6.30"

Step 4: Resolver queries .com TLD nameserver
  .com TLD nameserver doesn't know google.com's IP, but knows who handles google.com:
  → "Ask Google's authoritative nameserver at ns1.google.com (216.239.32.10)"

Step 5: Resolver queries Google's authoritative nameserver
  Google's nameserver knows: google.com A record → 142.250.182.4, TTL=300
  Returns answer to resolver.

Step 6: Resolver caches and returns to client
  Client OS caches: google.com → 142.250.182.4 for 300 seconds.
  Browser connects to 142.250.182.4.

TOTAL TIME: ~50–200ms for cache miss (multiple round trips across the internet).
            < 1ms for cache hit.`}
      </CodeBlock>

      <ProtocolStackExplorer />

      <Divider />

      {/* ── Chapter 13 ── */}
      <Chapter
        n="13"
        title="A Complete Packet Journey — From Keyboard to Server"
        subtitle="You open Chrome, type google.com, press Enter. Here is every single thing that happens — at every TCP/IP layer — before the page starts loading."
      />

      <CodeBlock title="Complete packet journey: browser to google.com — every step">
{`PHASE 1 — DNS RESOLUTION (before TCP even starts):
  Browser checks DNS cache: "Do I have google.com cached?" → No (or expired)
  OS sends UDP DNS query to 8.8.8.8:53
  Network Access: wraps in Ethernet frame to router's MAC, transmits on Wi-Fi
  Internet: IP packet Src=192.168.1.5, Dst=8.8.8.8, Proto=17 (UDP)
  Transport: UDP Src=55813, Dst=53, 28-byte DNS query
  ~50ms later: DNS reply arrives → 142.250.182.4

PHASE 2 — TCP 3-WAY HANDSHAKE (1 RTT):
  Browser calls connect(142.250.182.4, 443)
  OS creates TCP socket, chooses ephemeral port 54321, picks ISN=1000

  Packet 1 — SYN:
    Network Access: Ethernet frame, Dst MAC=router's MAC
    Internet: IP Src=192.168.1.5, Dst=142.250.182.4, TTL=64, Proto=6
    Transport: TCP Src=54321, Dst=443, Seq=1000, SYN=1, MSS=1460, SACK, WS=7

  (Packet travels through ~15 router hops to Google's datacenter)

  Packet 2 — SYN-ACK (from Google's server):
    Transport: TCP Src=443, Dst=54321, Seq=5000, Ack=1001, SYN=1, MSS=1460

  Packet 3 — ACK (your browser completes handshake):
    Transport: TCP Seq=1001, Ack=5001, ACK=1

  Connection ESTABLISHED. RTT measured by TCP for RTO calculation.

PHASE 3 — TLS 1.3 HANDSHAKE (1 RTT for new connection):
  Browser sends: ClientHello (TLS version, cipher suites, key share, SNI=google.com)
  Server sends:  ServerHello + server certificate + encrypted extensions + Finished
  Browser validates certificate against trusted CA store.
  Browser sends: Finished (proves it decrypted the Finished correctly)
  Both derive symmetric session keys. TLS session is established.
  Total: 1 RTT. With 0-RTT session resumption: 0 RTTs (data in first packet).

PHASE 4 — HTTP/2 REQUEST:
  Application: Browser builds HTTP/2 HEADERS frame:
    :method: GET
    :path: /
    :authority: google.com
    :scheme: https
    accept-encoding: gzip, br
  Application: TLS encrypts this frame with AES-256-GCM
  Transport: TCP segments the encrypted data, adds headers (Seq, Ack, Port)
  Internet: IP wraps each segment (Src/Dst IP, TTL, Proto=6)
  Network Access: Ethernet frames each IP packet (Src/Dst MAC, CRC)
  Physical: Wi-Fi encodes frames as OFDM symbols on 5 GHz

PHASE 5 — SERVER PROCESSING + RESPONSE:
  Google's server: TCP reassembles segments → TLS decrypts → HTTP/2 parses
  Server generates HTML response (status 200, content-type text/html)
  TLS encrypts → TCP segments → IP packets → Ethernet frames → physical

PHASE 6 — BROWSER RENDERS:
  Your stack reverses the process at each layer:
  Physical → Ethernet strips CRC, passes to IP
  IP → TCP reorders, checks for gaps (retransmits if needed)
  TCP → TLS decrypts → HTTP/2 decompresses gzip
  Application: Browser renders HTML, discovers linked CSS/JS, starts more requests

TOTAL TIME (typical broadband, no cache):
  DNS: ~30ms | TCP handshake: ~30ms | TLS: ~30ms | HTTP request/response: ~30ms
  First byte received: ~120ms.  Page fully loaded: 1–3s (depends on page complexity).`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 14 ── */}
      <Chapter
        n="14"
        title="IPv6 — Rebuilding the Internet at Scale"
        subtitle="IPv4 is exhausted. IPv6 is the fix — 128-bit addresses, simplified headers, no fragmentation, no NAT, no broadcast. If you work on anything internet-facing in 2026, you must understand IPv6."
      />

      <Para>
        IPv6 (RFC 8200) was published in 1998 in response to the looming IPv4 exhaustion.
        It replaces the 32-bit address space (4.3 billion addresses) with a 128-bit space —
        340 undecillion (3.4×10³⁸) addresses. Every atom on earth could have its own IPv6 address,
        with addresses left over. As of 2026, approximately 40% of global internet traffic uses IPv6.
        Google, Facebook, Netflix, AWS, and all major ISPs support it.
      </Para>

      <CodeBlock title="IPv6 vs IPv4 — key differences">
{`ADDRESS SPACE:
  IPv4: 32 bits = 4,294,967,296 addresses. Exhausted.
  IPv6: 128 bits = 340,282,366,920,938,463,463,374,607,431,768,211,456 addresses.
  IPv6 notation: 2001:0db8:85a3:0000:0000:8a2e:0370:7334
  Compressed:    2001:db8:85a3::8a2e:370:7334 (:: replaces longest zero run)

IPv6 ADDRESS TYPES (no broadcast — replaced by multicast):
  Global Unicast:  2000::/3 — globally routable (like public IPv4)
  Link-Local:      fe80::/10 — auto-configured per interface, not routable
  Loopback:        ::1 — equivalent to 127.0.0.1
  Multicast:       ff00::/8 — one-to-many (replaces broadcast entirely)
  Unique Local:    fc00::/7 — private use (like RFC 1918 in IPv4)

HEADER SIMPLIFICATION (IPv4 had 13 fields; IPv6 has 8):
  REMOVED: IHL (fixed 40-byte header), Header Checksum (redundant with L2 and L4),
           Identification, Flags, Fragment Offset (moved to Extension Headers),
           Options (replaced by Extension Headers)
  ADDED:   Flow Label (identifies streams for QoS — router can prioritize without
                        reading transport headers)

NO FRAGMENTATION BY ROUTERS:
  IPv6 routers never fragment — only the source can.
  If packet is too big: ICMPv6 "Packet Too Big" → source reduces size.
  Path MTU Discovery is mandatory in IPv6.

SLAAC — STATELESS ADDRESS AUTOCONFIGURATION (no DHCP needed):
  1. Interface generates link-local address from MAC (EUI-64) or randomly.
  2. Sends Router Solicitation (RS) to ff02::2 (all-routers multicast).
  3. Router sends Router Advertisement (RA) with network prefix.
  4. Interface combines prefix + interface ID → global unicast address.
  5. No DHCP server required. IPv6 devices self-configure.

NEIGHBOR DISCOVERY PROTOCOL (NDP) — replaces ARP:
  ICMPv6 Neighbor Solicitation = "who has this IPv6 address?" (like ARP request)
  ICMPv6 Neighbor Advertisement = "I have this address, here's my MAC" (like ARP reply)
  Uses multicast (not broadcast) — only devices with matching IPv6 address respond.
  Dramatically more efficient than ARP in large networks.`}
      </CodeBlock>

      <H2>Dual-Stack — Running IPv4 and IPv6 Together</H2>
      <Para>
        The transition to IPv6 is not a flag-day cutover like ARPANET's 1983 switch. It is a
        decades-long gradual migration where both protocols run simultaneously.
        <Accent>Dual-stack</Accent> means a device has both an IPv4 and an IPv6 address,
        runs both protocol stacks, and uses IPv6 when available.
        The <Accent>Happy Eyeballs</Accent> algorithm (RFC 8305) is what browsers use: attempt IPv6 and IPv4
        connections simultaneously, use whichever succeeds first (with a 250ms head start for IPv6).
        If IPv6 is broken on a network, Happy Eyeballs falls back to IPv4 within 250ms
        — the user sees no failure.
      </Para>

      <Divider />

      {/* ── Chapter 15 ── */}
      <Chapter
        n="15"
        title="TCP/IP Security — Attacks That Exploit the Protocol"
        subtitle="TCP/IP was designed in 1970s academic culture, where everyone on the network was a trusted researcher. The internet grew too fast for security to catch up. Understanding which attacks exploit which layer tells you exactly which defences to deploy."
      />

      <H2>IP Spoofing — Forging the Source</H2>
      <Para>
        IP has no authentication — anyone can craft a packet with any source IP.
        Attackers use spoofed source IPs to:
        (1) Bypass IP-based access controls — send packets appearing to come from a trusted IP.
        (2) Amplification DDoS — send DNS/NTP requests with the victim's IP as source;
        the servers send large responses to the victim (amplification factor up to 50×).
        (3) Anonymise attacks — responses cannot reach the real attacker.
      </Para>
      <Para>
        Defence: <Accent>BCP38 (ingress filtering)</Accent> — ISPs drop packets from customers
        with source IPs outside the customer's allocated range. Widely recommended, not universally deployed.
        <Accent>uRPF (Unicast Reverse Path Forwarding)</Accent> — routers check that the source IP's
        return route uses the interface the packet arrived on.
      </Para>

      <H2>TCP SYN Flood — Exhausting Connection State</H2>
      <Para>
        The TCP 3-way handshake requires the server to allocate state for every SYN received —
        before the connection is confirmed. An attacker sends thousands of SYN packets with spoofed
        source IPs. The server sends SYN-ACKs that go nowhere and holds half-open connection state
        (in SYN_RECEIVED) until timeout. The state table fills; legitimate SYNs are rejected.
      </Para>
      <Para>
        Defence: <Accent>SYN cookies</Accent> — when the SYN queue is full, the server encodes
        connection state into the SYN-ACK's sequence number using a cryptographic hash of the 5-tuple
        and a timestamp. No state is stored. If the client sends a valid ACK, the server re-derives
        the state from the sequence number and creates the connection. Legitimate clients succeed;
        spoofed SYNs just waste network bandwidth (which is manageable).
      </Para>

      <H2>BGP Hijacking — Stealing the Route</H2>
      <Para>
        BGP (Border Gateway Protocol) is how internet routers share routing information globally.
        It has no authentication — any AS can announce any IP prefix. In BGP hijacking,
        an attacker's AS announces more-specific routes for IP prefixes it does not own.
        Routers prefer more-specific routes (longer prefix match), so traffic destined for the victim
        gets routed to the attacker.
        Notable incidents: Pakistan Telecom hijacked YouTube (2008), Amazon Route 53 hijacked for
        crypto theft (2018), multiple BGP route leaks disrupting global traffic.
      </Para>

      <CodeBlock title="TCP/IP attack surface and defences by layer">
{`NETWORK ACCESS (L1/L2):
  ARP Poisoning    → Dynamic ARP Inspection (DAI) on managed switches
  MAC Flooding     → Port security, port-based MAC limits
  Rogue DHCP       → DHCP Snooping — only allow DHCP from trusted ports
  Wi-Fi Evil Twin  → 802.1X authentication, WPA3-Enterprise

INTERNET LAYER (IP):
  IP Spoofing      → BCP38 ingress filtering at ISP edge, uRPF on routers
  BGP Hijacking    → RPKI (Resource Public Key Infrastructure) — cryptographic
                     validation of BGP route origins. ~50% of routes RPKI-valid in 2026.
  ICMP Flood       → Rate limit ICMP at edge. Allow Type 3 and 11 (needed for PMTUD).
  TTL Expiry DoS   → Rate limit ICMP Time Exceeded responses.

TRANSPORT LAYER (TCP/UDP):
  SYN Flood        → SYN Cookies, SYN rate limiting, SYN proxy (load balancer)
  TCP RST Attack   → Requires attacker to guess sequence number — mitigated by
                     random ISN (already in RFC 793), TIME_WAIT protection
  UDP Amplification→ BCP38 (prevents spoofing), rate limit UDP to amplifiers (DNS, NTP)
  Port Scanning    → Host-based firewall, non-standard ports (minor obscurity benefit)

APPLICATION LAYER (HTTP/DNS/etc.):
  HTTP Flood       → WAF rate limiting, CAPTCHA, bot detection
  DNS Poisoning    → DNSSEC (cryptographic signatures on DNS records)
  DNS Cache Poison → Random source port + transaction ID (already standard)
  TLS Downgrade    → HSTS (HTTP Strict Transport Security), TLS 1.3 only
  SQL Injection    → Parameterised queries, WAF, input validation`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 16 ── */}
      <Chapter
        n="16"
        title="Troubleshooting TCP/IP — The Engineer's Toolkit"
        subtitle="When something is broken, you need to know exactly which layer to look at and which tool to use. This is the systematic approach."
      />

      <CodeBlock title="TCP/IP troubleshooting toolkit — layer by layer">
{`NETWORK ACCESS LAYER:
  ethtool eth0              # Link status, speed, duplex negotiation
  ip link show              # Interface state (UP/DOWN), MTU, MAC
  arp -a | ip neigh         # ARP cache — who's reachable at L2?
  iwconfig | iw dev wlan0   # Wi-Fi: channel, signal strength, rate

INTERNET LAYER:
  ip addr show              # IP address, subnet mask — do you have a valid IP?
  ip route show             # Routing table — is there a default route?
  ping 192.168.1.1          # Can you reach the default gateway? (L3 local)
  ping 8.8.8.8              # Can you reach the internet? (L3 global)
  traceroute 8.8.8.8        # Where does the path break? Which router drops?
  mtr 8.8.8.8               # Continuous traceroute with packet loss per hop

TRANSPORT LAYER:
  ss -tulpn                 # What's listening on which port?
  ss -s                     # Connection state counts (ESTABLISHED, TIME_WAIT, etc.)
  nc -zv host 443           # Can you connect to a specific port? (L4 reachability)
  nmap -sT host -p 80,443   # Port scan (TCP connect scan)
  tcpdump -i eth0 port 443  # Capture raw packets — see the handshake, flags, etc.

APPLICATION LAYER:
  nslookup google.com       # Is DNS resolving? Which server responded?
  dig google.com +trace     # Full DNS resolution chain step by step
  curl -v https://google.com # Full HTTP(S) request — shows TLS handshake, headers
  openssl s_client -connect host:443  # Debug TLS certificate and cipher

COMMON FAILURE PATTERNS:
  No link light (L1/L2) → bad cable, wrong duplex
  169.254.x.x IP (L3)   → DHCP failed — check DHCP server, VLAN
  Can ping gateway but not 8.8.8.8 (L3) → default route missing or ISP issue
  Can ping IP but not hostname (L7) → DNS is broken
  Port not reachable (L4) → firewall blocking, service not listening
  Connection hangs (L4-L7) → MTU black hole (PMTUD blocked), server-side timeout`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 17 ── */}
      <Chapter
        n="17"
        title="Interview Questions — From Beginner to PhD"
        subtitle="These are the questions that separate surface-level understanding from deep mastery."
      />

      <IQ q="What are the four layers of the TCP/IP model and what does each do?" level="Beginner">
        From bottom to top: <strong>Network Access</strong> (handles physical transmission across a single link — Ethernet, Wi-Fi, cables, frames, MAC addresses, CRC); <strong>Internet</strong> (handles logical addressing and routing across multiple networks — IP packets, IPv4/IPv6 addresses, ICMP, ARP, routing protocols); <strong>Transport</strong> (handles process-to-process delivery using port numbers — TCP for reliability, UDP for speed); <strong>Application</strong> (everything the user and application interact with — HTTP, DNS, SMTP, SSH, TLS encryption, data encoding). TCP/IP's Application layer combines what OSI separates into Session + Presentation + Application.
      </IQ>

      <IQ q="What happens at each TCP/IP layer when you open https://google.com?" level="Beginner">
        Application: browser builds an HTTP/2 GET request, TLS encrypts it. Transport: TCP wraps it in a segment with source port (random ephemeral) and destination port 443, ensures reliable ordered delivery. Internet: IP wraps the segment in a packet with source IP (your device) and destination IP (Google, found via DNS), routes it hop-by-hop. Network Access: Ethernet frames the IP packet with your MAC and your router's MAC, transmits as electrical signals. At each router hop, the Network Access frame is stripped and rebuilt, but the IP header stays the same. At Google's server, the process reverses.
      </IQ>

      <IQ q="Why does TCP do a 3-way handshake instead of a 2-way handshake?" level="Intermediate">
        A 2-way handshake (SYN → SYN-ACK → data) would work for the client: it knows the server received its SYN (got a SYN-ACK). But the server does not know if its SYN-ACK reached the client — it never got confirmation. Without a third ACK, the server would start the connection without knowing if the client is actually ready, which wastes resources. The third ACK (client → server) proves: (1) the client received the server's SYN-ACK, (2) the client chose ISN is known to the server, (3) both directions of the full-duplex channel are proven to work before data flows. Additionally, the SYN/SYN-ACK exchange lets both sides negotiate TCP options (MSS, SACK, window scale) bidirectionally — a 2-way handshake would not let the server advertise its options.
      </IQ>

      <IQ q="What is the TCP congestion window and how does slow start work?" level="Intermediate">
        The congestion window (cwnd) is the maximum number of bytes TCP will have in flight (unacknowledged) based on estimated network capacity. Slow start begins with cwnd=1 MSS (1,460 bytes). After each ACK, cwnd increases by 1 MSS — this causes cwnd to double each RTT (exponential growth). This continues until cwnd reaches the slow-start threshold (ssthresh). Above ssthresh, TCP enters congestion avoidance: cwnd grows by MSS²/cwnd per ACK — approximately 1 MSS per RTT (linear growth). When packet loss is detected (3 duplicate ACKs), ssthresh is halved and cwnd is set to ssthresh — this is AIMD (Additive Increase, Multiplicative Decrease). The actual send window is min(cwnd, rwnd) — limited by both network capacity and receiver buffer space.
      </IQ>

      <IQ q="What are the differences between TCP flow control and congestion control, and why are both needed?" level="Senior">
        <strong>Flow control</strong> (receiver-driven) prevents the sender from overwhelming the receiver. The receiver advertises its available buffer space in the Window field of every ACK. The sender never has more than rwnd bytes unacknowledged. This protects against a fast sender overwhelming a slow application — for example, a 10 Gbps server sending to a 1 Mbps client. <strong>Congestion control</strong> (network-driven) prevents the sender from overwhelming the network itself. TCP infers congestion from packet loss (classic algorithms) or measured bandwidth and RTT (BBR) and adjusts the congestion window. This prevents all TCP connections on a bottleneck link from collectively overwhelming a router's queue. Both are needed because the constraints are different: the receiver's buffer limit (flow control) and the network's forwarding capacity (congestion control) are independent. A receiver could have a huge buffer but the network between them might be a 56k modem.
      </IQ>

      <IQ q="How does QUIC solve TCP's head-of-line blocking, and what are the trade-offs?" level="Senior">
        TCP's HOL blocking: TCP is a single ordered byte stream. If segment 5 is lost, the OS delivers bytes 6–1000 to the application only after segment 5 is retransmitted and arrives — even if those bytes belong to completely independent HTTP/2 streams. HTTP/2 multiplexing is invisible to TCP; TCP just sees one stream. QUIC solves this by running the transport inside the application (user space, over UDP). QUIC has multiple independent streams, each with its own loss recovery. Loss of a packet in stream 3 delays only stream 3; streams 1, 2, 4, 5 continue unaffected. Trade-offs: (1) QUIC in user space has higher CPU cost than kernel-mode TCP — Google estimates ~2-3% more CPU per server. (2) UDP is often rate-limited or blocked by enterprise firewalls — QUIC may fall back to TCP. (3) Encrypted headers make QUIC invisible to middleboxes — good for privacy, frustrating for network monitoring teams. (4) QUIC's loss recovery and congestion control are more complex to implement correctly than TCP's.
      </IQ>

      <IQ q="Explain the BGP routing system — how does the internet decide where to send a packet?" level="PhD">
        BGP (Border Gateway Protocol, RFC 4271) is the inter-AS routing protocol — the only routing protocol that runs between different organisations on the internet. The internet is divided into Autonomous Systems (ASes), each with a globally unique AS Number (ASN, e.g., Google AS15169, Cloudflare AS13335). Each AS announces its IP prefixes to its neighbours (peers) via BGP UPDATE messages. Routers collect these announcements, apply local policy, and build a routing table. BGP is a path-vector protocol: each route advertisement includes the full AS_PATH (list of ASes traversed), preventing routing loops. Route selection uses a complex decision process: prefer routes with the highest LOCAL_PREF (local policy), then shortest AS_PATH, then lowest MULTI_EXIT_DISC (MED, used to prefer certain exit points), then prefer eBGP over iBGP routes, then lowest IGP cost to next hop, then lowest router ID. BGP does NOT optimise for latency or bandwidth — it reflects network policy and commercial agreements (peering, transit). This is why a packet from New York to London might transit Frankfurt — that is the commercial relationship between the ISPs involved, not the shortest path. BGP's lack of authentication is the root cause of hijacking vulnerabilities — RPKI adds cryptographic origin validation but not path validation. BGP route filtering, prefix length limits (max /24 for IPv4 to prevent table explosion), and communities (32-bit tags for policy signalling) are how operators manage routing.
      </IQ>

      <Divider />

      <KeyTakeaways items={[
        "TCP/IP has 4 layers: Network Access (Ethernet/Wi-Fi — one physical link), Internet (IP — routing across networks), Transport (TCP/UDP — process-to-process, ports), Application (HTTP/DNS/SSH — everything your code uses). OSI's L5+L6+L7 collapse into one TCP/IP Application layer by design.",
        "The end-to-end principle: keep the network simple and dumb (just forward packets), put complexity at the edges (endpoints). This is why the internet is resilient and why new application protocols can be deployed without changing network infrastructure.",
        "IPv4 header key fields: TTL (decremented each hop, prevents loops; exploited by traceroute), Protocol (1=ICMP, 6=TCP, 17=UDP — the L3 SAP), DF flag (don't fragment — used by PMTUD), DSCP (QoS marking, EF=46 for VoIP/video). Header checksum recomputed at every router — IPv6 eliminated it.",
        "TCP header key fields: Sequence Number (every byte numbered — enables ordering and gap detection), ACK Number (cumulative, tells sender how far receiver has gotten), Window (flow control — receiver's buffer space), Flags (SYN/ACK/FIN/RST/PSH — control connection lifecycle). MSS, SACK, Window Scale, Timestamps are negotiated in options during SYN.",
        "TCP 3-way handshake: SYN (client chooses ISN, advertises MSS/SACK) → SYN-ACK (server chooses ISN, confirms options) → ACK. 1 RTT cost. TLS 1.3 adds 1 more RTT. QUIC+HTTP/3: 0 RTT for returning connections.",
        "TCP congestion control: slow start (cwnd doubles each RTT until ssthresh), then congestion avoidance (+1 MSS/RTT linear). 3 dup ACKs → halve cwnd (fast retransmit). Timeout → cwnd=1 MSS (slow start again). CUBIC improves on this. BBR ignores loss, measures actual bandwidth and RTT — 4% more throughput globally at Google.",
        "Flow control (rwnd) prevents overwhelming the receiver. Congestion control (cwnd) prevents overwhelming the network. Actual send window = min(cwnd, rwnd). Without Window Scale option, max throughput on satellite (500ms RTT): 64KB/0.5s = 1 Mbps — useless.",
        "TCP TIME_WAIT: 2×MSL (≈2 min) after active close. Ensures delayed packets absorbed before port reuse. Can exhaust ephemeral ports (49152–65535) on busy servers. Fix: tcp_tw_reuse=1, persistent connections, HTTP/2 multiplexing.",
        "QUIC (RFC 9000) over UDP solves: head-of-line blocking (per-stream loss recovery), handshake latency (0-RTT on resume), connection migration (Connection ID not 5-tuple), protocol ossification (user-space deployment). Now used by ~32% of the web via HTTP/3.",
        "ICMP is diagnostic infrastructure, not an attack surface. Never block Type 3 (Destination Unreachable) or Type 11 (TTL Exceeded) — they enable PMTUD and traceroute. Blocking them causes TCP black holes and blind network paths.",
        "IPv6: 128-bit addresses (340 undecillion), no broadcast (multicast instead), no router fragmentation, simplified header (no IHL, no checksum, no options field), SLAAC for auto-configuration, NDP replaces ARP. Dual-stack with Happy Eyeballs (RFC 8305) enables seamless coexistence.",
        "BGP hijacking exploits the fact that BGP has no authentication — any AS can announce any prefix. RPKI (Resource Public Key Infrastructure) adds cryptographic origin validation. As of 2026, ~50% of routes are RPKI-validated. SYN floods are mitigated by SYN cookies — state is encoded in the sequence number, not the kernel table.",
      ]} />

    </LearnLayout>
  )
}
