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

const StoryBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.2)', borderLeft: '4px solid #60a5fa', borderRadius: '0 12px 12px 0', padding: '18px 22px', margin: '28px 0' }}>
    <p style={{ fontSize: 11, color: '#60a5fa', fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Real-World Scenario</p>
    <div style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)

const WowBox = ({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) => (
  <div style={{ background: `${G}08`, border: `1px solid ${G}25`, borderRadius: 12, padding: '18px 22px', margin: '28px 0' }}>
    <p style={{ fontSize: 13, fontWeight: 700, color: G, margin: '0 0 6px' }}>{emoji} {title}</p>
    <div style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

const Warn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: 12, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, color: '#fbbf24', fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>⚠ {title}</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

const Err = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: '#ef444408', border: '1px solid #ef444430', borderRadius: 12, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Common Mistake — {title}</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

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

// ─── Interactive 1: OSI Stack Explorer ───────────────────────────────────────

const OSI_LAYERS = [
  {
    n: 7, name: 'Application', color: '#10b981', pdu: 'Data',
    emoji: '🌐',
    protocols: 'HTTP/S, FTP, SSH, SMTP, IMAP, DNS, SNMP, Telnet, WebSocket',
    devices: 'Web browsers, email clients, API gateways, application load balancers',
    job: 'The only layer your application code actually touches. Provides network services — web browsing, email, file transfer — directly to user-facing software. The interface between the network stack and your application. This layer defines the rules for how applications request and receive data.',
    security: 'SQL injection, XSS, credential stuffing, HTTP flood DDoS, DNS poisoning, SMTP phishing',
    commands: 'curl -v https://example.com   |   nslookup google.com   |   openssl s_client -connect host:443',
    example: 'Your browser sends: "GET /index.html HTTP/1.1 Host: google.com" — that string of text IS the Layer 7 PDU.',
    analogy: 'The conversation itself — what you actually say in a phone call.',
  },
  {
    n: 6, name: 'Presentation', color: '#06b6d4', pdu: 'Data',
    emoji: '🎨',
    protocols: 'TLS/SSL, JPEG, PNG, MP3, MP4, ASCII, UTF-8, Base64, gzip, zlib',
    devices: 'TLS termination proxies, media encoders/decoders, gateways',
    job: 'Translation, encryption, and compression. Converts data between the network format and the application format. If Layer 7 says "what to say", Layer 6 decides "what language and encoding to say it in". Responsible for ensuring data sent by one system can be understood by another, regardless of internal data representation differences.',
    security: 'SSL stripping (downgrade HTTPS → HTTP), weak cipher negotiation, certificate spoofing',
    commands: 'openssl s_client -connect host:443   |   sslyze --regular host   |   curl -v (shows TLS handshake)',
    example: 'Your browser receives gzip-compressed HTML — Layer 6 decompresses it before handing to Layer 7. TLS encryption and decryption also happens at this layer.',
    analogy: 'The translator who converts your words so the other person understands them.',
  },
  {
    n: 5, name: 'Session', color: '#8b5cf6', pdu: 'Data',
    emoji: '🤝',
    protocols: 'NetBIOS, RPC, SQL sessions, NFS, SIP (partly), PPTP control',
    devices: 'Application servers, API gateways, unified communications platforms',
    job: 'Establishes, manages, and terminates sessions between applications. Provides dialog control (who talks when), synchronisation checkpoints, and session recovery after failure. Layer 5 knows which data belongs to which ongoing conversation, and can resume after a network interruption without starting from scratch.',
    security: 'Session hijacking, session fixation, CSRF (cross-site request forgery), replay attacks',
    commands: 'netstat -an | grep ESTABLISHED   |   ss -tp   |   Check application session/cookie logs',
    example: 'A 3-hour Zoom call maintains one persistent session through temporary Wi-Fi interruptions, because Layer 5 checkpoints allow the session to resume.',
    analogy: 'The receptionist who connects two callers and keeps the call open for the duration of the conversation.',
  },
  {
    n: 4, name: 'Transport', color: '#f97316', pdu: 'Segment (TCP) / Datagram (UDP)',
    emoji: '🚚',
    protocols: 'TCP, UDP, SCTP, DCCP, QUIC (partly)',
    devices: 'Load balancers (L4), stateful firewalls, NAT gateways',
    job: 'End-to-end delivery between processes using port numbers for multiplexing. TCP provides reliability through sequencing, acknowledgements, retransmission, flow control, and congestion control. UDP provides speed without guarantees. This is where your application chooses between "guaranteed delivery" and "fastest possible delivery".',
    security: 'SYN flood, TCP session hijacking, UDP amplification attacks, port scanning',
    commands: 'netstat -tulpn   |   ss -tulpn   |   nmap -sT host   |   tcpdump port 443',
    example: 'Downloading a 100 MB file: TCP splits it into ~68,000 segments of 1,460 bytes each, numbers every single byte, and automatically retransmits anything that gets lost. Your application receives a perfect, ordered byte stream.',
    analogy: 'The postal service that guarantees delivery and sends you a receipt for each package.',
  },
  {
    n: 3, name: 'Network', color: '#3b82f6', pdu: 'Packet',
    emoji: '🗺️',
    protocols: 'IPv4, IPv6, ICMP, OSPF, BGP, RIP, EIGRP, IPSec',
    devices: 'Routers, Layer-3 switches, VPN gateways, firewalls (L3 ACLs)',
    job: 'Logical addressing using IP addresses, and routing between different networks. Determines the best path from source to destination across multiple networks. Handles packet fragmentation when a packet is too large for a link. TTL (Time To Live) prevents packets from looping forever. This is the layer that makes the global internet possible.',
    security: 'IP spoofing, BGP hijacking, ICMP tunneling, route injection, TTL manipulation',
    commands: 'ping 8.8.8.8   |   traceroute 8.8.8.8   |   ip route show   |   route print (Windows)',
    example: 'Your HTTP request hops through 15 routers between your ISP and Google. Each router reads only the destination IP, makes an independent routing decision, and forwards the packet to the next hop.',
    analogy: 'The GPS that determines the route between cities, even if it crosses multiple states.',
  },
  {
    n: 2, name: 'Data Link', color: '#ef4444', pdu: 'Frame',
    emoji: '🔗',
    protocols: 'Ethernet (802.3), Wi-Fi (802.11), ARP, PPP, 802.1Q VLANs, MPLS',
    devices: 'Switches, access points, bridges, NICs (hardware component)',
    job: 'Physical addressing using MAC addresses. Frames data for transmission on a single network segment. Provides error detection via CRC (Cyclic Redundancy Check). Manages access to the physical medium (CSMA/CD for Ethernet, CSMA/CA for Wi-Fi). Only responsible for delivering frames to the right device on the LOCAL network segment — not across networks.',
    security: 'ARP poisoning, MAC flooding, VLAN hopping, rogue access points, MAC spoofing',
    commands: 'arp -a   |   ip neigh   |   ip link show   |   Wireshark → Ethernet II frame dissection',
    example: "Your laptop sends a frame with Dst MAC = your router's MAC (from ARP cache), Src MAC = your NIC's hardware address. The switch reads only the dst MAC to forward to the right port. The router strips this frame and builds a new one for the next hop.",
    analogy: 'The street address on a local delivery — only useful within the same neighborhood.',
  },
  {
    n: 1, name: 'Physical', color: '#94a3b8', pdu: 'Bit',
    emoji: '⚡',
    protocols: '802.3 Ethernet signalling, 802.11 radio, DSL, SONET/SDH, USB, fiber standards',
    devices: 'Cables, hubs, repeaters, modems, NICs (analog interface), fiber transceivers, antennas',
    job: 'Transmission of raw bits over a physical medium. Defines voltage levels, cable specifications, connector types, pin layouts, signal encoding schemes (Manchester, 4B/5B, PAM4), bit timing, and data rates. Has zero awareness of what the bits mean — it just moves electrical signals, light pulses, or radio waves from one end to the other.',
    security: 'Physical eavesdropping, fiber tapping, cable cutting, signal jamming, hardware keyloggers',
    commands: 'Check link LEDs on NIC/switch   |   ethtool eth0   |   iwconfig   |   cable tester / TDR',
    example: 'A Cat6 cable carries your frame as voltage transitions at 250 MHz. A single-mode fiber carries the exact same data as pulses of 1,310 nm laser light at 10 Gbps. Same bits, completely different physics.',
    analogy: 'The roads, highways, and air corridors that carry physical vehicles — with no knowledge of what cargo is inside.',
  },
]

function OSIStackExplorer() {
  const [active, setActive] = useState<number | null>(null)
  const activeLayer = active !== null ? OSI_LAYERS[active] : null

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 4px' }}>Interactive — OSI Stack Explorer</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 24px' }}>Click any layer to see its protocols, devices, security threats, diagnostic commands, and a real-world example.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: active !== null ? 20 : 0 }}>
        {OSI_LAYERS.map((layer, i) => (
          <button
            key={layer.n}
            onClick={() => setActive(active === i ? null : i)}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 18px',
              background: active === i ? `${layer.color}15` : 'var(--bg)',
              border: `1px solid ${active === i ? layer.color : 'var(--border)'}`,
              borderLeft: `4px solid ${layer.color}`,
              borderRadius: active === i ? '8px 8px 0 0' : 10,
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
              marginLeft: `${(7 - layer.n) * 14}px`,
            }}
          >
            <span style={{ fontSize: 18 }}>{layer.emoji}</span>
            <span style={{ fontSize: 10, fontWeight: 800, color: layer.color, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.1em', background: `${layer.color}20`, padding: '3px 8px', borderRadius: 5, flexShrink: 0 }}>L{layer.n}</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', flex: 1 }}>{layer.name}</span>
            <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO, flexShrink: 0 }}>{layer.pdu}</span>
            <span style={{ fontSize: 11, color: layer.color, flexShrink: 0 }}>{active === i ? '▲' : '▼'}</span>
          </button>
        ))}
      </div>

      {activeLayer && (
        <div style={{ background: `${activeLayer.color}08`, border: `1px solid ${activeLayer.color}30`, borderRadius: '0 0 12px 12px', padding: '20px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 26 }}>{activeLayer.emoji}</span>
            <div>
              <p style={{ margin: 0, fontSize: 11, color: activeLayer.color, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em' }}>Layer {activeLayer.n}</p>
              <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>{activeLayer.name}</p>
            </div>
          </div>

          <p style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 16px' }}>{activeLayer.job}</p>

          {[
            { label: 'PDU Name', value: activeLayer.pdu },
            { label: 'Key Protocols', value: activeLayer.protocols },
            { label: 'Devices', value: activeLayer.devices },
            { label: 'Security Threats', value: activeLayer.security },
            { label: 'Diagnostic Commands', value: activeLayer.commands },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: activeLayer.color, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.06em', minWidth: 160, paddingTop: 2, flexShrink: 0 }}>{row.label}</span>
              <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, fontFamily: row.label === 'Diagnostic Commands' ? FONT_MONO : 'inherit' }}>{row.value}</span>
            </div>
          ))}

          <div style={{ marginTop: 14, padding: '12px 16px', background: 'var(--bg)', borderRadius: 10, borderLeft: `3px solid ${activeLayer.color}` }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: activeLayer.color, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 6px' }}>Real-World Example</p>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: '0 0 10px' }}>{activeLayer.example}</p>
            <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: 'var(--text)' }}>Analogy: </strong>{activeLayer.analogy}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Interactive 2: Encapsulation Visualizer ─────────────────────────────────

const ENCAP_STEPS = [
  {
    layer: 7, name: 'Application', color: '#10b981',
    label: 'L7 Application — HTTP Request Created',
    description: "Your browser creates the HTTP request — the actual message you want to send. This is the raw application data: the method, URL, headers, and body. Nothing has been added yet. This is what Layer 7 produces.",
    packet: [
      { label: 'HTTP DATA', color: '#10b981', content: 'GET /index.html HTTP/1.1\nHost: google.com\nAccept: text/html\nConnection: keep-alive' },
    ],
  },
  {
    layer: 6, name: 'Presentation', color: '#06b6d4',
    label: 'L6 Presentation — TLS Encrypts the Data',
    description: "The Presentation layer encrypts the HTTP data using TLS (Transport Layer Security). TLS wraps the plaintext HTTP request in a TLS record with a Content Type (0x17 = Application Data), Version, and Length field. The HTTP data is now ciphertext — unreadable without the session key. The receiver's L6 will decrypt it.",
    packet: [
      { label: 'TLS RECORD HEADER', color: '#06b6d4', content: 'Content-Type: 0x17 (Application Data)\nVersion: TLS 1.3 (0x0303)\nLength: 512 bytes' },
      { label: 'ENCRYPTED HTTP DATA', color: '#06b6d4', content: '[ciphertext: AES-256-GCM encrypted payload]\n[authentication tag: 16 bytes]\n(Original HTTP request — now unreadable)' },
    ],
  },
  {
    layer: 5, name: 'Session', color: '#8b5cf6',
    label: 'L5 Session — Session Context Maintained',
    description: "The Session layer tracks that this TLS record belongs to an established session between your browser and Google's server. The session was set up during the TLS handshake. The session ID or ticket ensures that if the connection drops, the session can be resumed without a full re-handshake. The data is passed down with session context intact.",
    packet: [
      { label: 'SESSION CONTEXT', color: '#8b5cf6', content: 'Session ID: [TLS session token]\nDialog: full-duplex\nCheckpoint: seq 4001\n(Session metadata — not a separate wire header)' },
      { label: 'TLS RECORD HEADER', color: '#06b6d4', content: 'Content-Type: 0x17 | Version: TLS 1.3 | Length: 512' },
      { label: 'ENCRYPTED HTTP DATA', color: '#06b6d4', content: '[ciphertext...]' },
    ],
  },
  {
    layer: 4, name: 'Transport', color: '#f97316',
    label: 'L4 Transport — TCP Segment Header Added',
    description: "TCP wraps everything in a segment. It adds source port (random ephemeral, e.g. 54321), destination port (443 = HTTPS), sequence number (so the receiver can reorder and detect gaps), and flags. The PSH flag tells the receiver to push data to the application immediately rather than buffering.",
    packet: [
      { label: 'TCP HEADER', color: '#f97316', content: 'Src Port: 54321 | Dst Port: 443\nSeq: 4001 | Ack: 1 | Flags: PSH,ACK\nWindow: 65535 | Checksum: 0xA3B1' },
      { label: 'TLS RECORD HEADER', color: '#06b6d4', content: 'Content-Type: 0x17 | Length: 512...' },
      { label: 'ENCRYPTED HTTP DATA', color: '#06b6d4', content: '[ciphertext...]' },
    ],
  },
  {
    layer: 3, name: 'Network', color: '#3b82f6',
    label: 'L3 Network — IP Packet Header Added',
    description: "The IP layer wraps the TCP segment in a packet, adding the source IP (your laptop) and destination IP (Google's server). The Protocol field (6 = TCP) tells the remote IP layer which L4 handler to deliver to. TTL starts at 64 — decremented by every router to prevent infinite loops.",
    packet: [
      { label: 'IP HEADER', color: '#3b82f6', content: 'Src: 192.168.1.5 | Dst: 142.250.182.4\nTTL: 64 | Protocol: 6 (TCP) | ID: 0x4E2A\nDF: 1 (don\'t fragment) | Checksum: 0xF1C2' },
      { label: 'TCP HEADER', color: '#f97316', content: 'Src Port: 54321 | Dst Port: 443 | Seq: 4001...' },
      { label: 'TLS + HTTP DATA', color: '#06b6d4', content: '[encrypted payload...]' },
    ],
  },
  {
    layer: 2, name: 'Data Link', color: '#ef4444',
    label: 'L2 Data Link — Ethernet Frame Header + CRC Trailer',
    description: "Ethernet wraps the IP packet in a frame. The Destination MAC is your router's MAC (learned via ARP). The EtherType 0x0800 tells the receiver which L3 protocol to hand this frame to (IPv4). The CRC trailer is a 4-byte checksum: if even one bit flips in transit, the receiver calculates a different CRC and silently drops the frame.",
    packet: [
      { label: 'ETHERNET HEADER', color: '#ef4444', content: 'Dst MAC: B8:E8:56:44:55:66 (router)\nSrc MAC: A4:C3:F0:11:22:33 (your NIC)\nEtherType: 0x0800 (IPv4)' },
      { label: 'IP HEADER', color: '#3b82f6', content: 'Src: 192.168.1.5 | Dst: 142.250.182.4...' },
      { label: 'TCP HEADER', color: '#f97316', content: 'Port: 443 | Seq: 4001...' },
      { label: 'TLS + HTTP DATA', color: '#06b6d4', content: '[encrypted payload...]' },
      { label: 'ETHERNET CRC TRAILER', color: '#ef4444', content: 'CRC-32: 0xA4F2E391\n(Receiver recalculates — drops frame if mismatch)' },
    ],
  },
  {
    layer: 1, name: 'Physical', color: '#94a3b8',
    label: 'L1 Physical — Bits Transmitted on Wire',
    description: "The entire Ethernet frame is converted to raw bits — 1s and 0s — and transmitted as electrical signals (copper Cat6), light pulses (fiber optic), or radio waves (Wi-Fi 802.11). The Physical layer has zero knowledge of what these bits mean. It just moves energy from one end to the other at the negotiated speed.",
    packet: [
      { label: 'RAW BITS (64-byte preamble + frame)', color: '#94a3b8', content: '10101010 10101010 10101010 10101011  ← Preamble + SFD\n11111000 01100011 01010101 01000100  ← Dst MAC start\n... (complete frame as electrical/optical/radio signal)\nData rate: 1 Gbps on Cat6 | 10 Gbps on fiber' },
    ],
  },
]

function EncapsulationVisualizer() {
  const [step, setStep] = useState(0)
  const s = ENCAP_STEPS[step]

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 4px' }}>Interactive — Encapsulation Step-by-Step</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 24px' }}>Watch how each layer wraps data in its own header as it travels down the OSI stack, then click through to see the result.</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {ENCAP_STEPS.map((es, i) => (
          <button key={i} onClick={() => setStep(i)}
            style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, fontFamily: FONT_MONO, cursor: 'pointer', border: `1px solid ${es.color}`, background: step === i ? es.color : 'transparent', color: step === i ? '#fff' : es.color, transition: 'all 0.2s' }}>
            L{es.layer} {es.name}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 20, padding: '16px 20px', background: `${s.color}08`, border: `1px solid ${s.color}30`, borderRadius: 12 }}>
        <p style={{ fontSize: 11, color: s.color, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 6px' }}>Step: {s.label}</p>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{s.description}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO, margin: '0 0 8px' }}>PACKET STRUCTURE AT THIS LAYER:</p>
        {s.packet.map((p, i) => (
          <div key={i} style={{ background: '#0d1117', border: `1px solid ${p.color}40`, borderLeft: `3px solid ${p.color}`, borderRadius: 8, padding: '10px 14px' }}>
            <p style={{ fontSize: 10, color: p.color, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 4px' }}>{p.label}</p>
            <pre style={{ margin: 0, fontSize: 12, color: '#e2e8f0', fontFamily: FONT_MONO, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{p.content}</pre>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
          style={{ flex: 1, padding: '10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, color: step === 0 ? 'var(--muted)' : 'var(--text)', cursor: step === 0 ? 'default' : 'pointer', fontSize: 13, fontWeight: 600 }}>
          ← Previous Layer
        </button>
        <button onClick={() => setStep(Math.min(ENCAP_STEPS.length - 1, step + 1))} disabled={step === ENCAP_STEPS.length - 1}
          style={{ flex: 1, padding: '10px', background: step === ENCAP_STEPS.length - 1 ? 'var(--bg)' : G, border: 'none', borderRadius: 8, color: step === ENCAP_STEPS.length - 1 ? 'var(--muted)' : '#fff', cursor: step === ENCAP_STEPS.length - 1 ? 'default' : 'pointer', fontSize: 13, fontWeight: 700 }}>
          Next Layer →
        </button>
      </div>
      <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', margin: '10px 0 0' }}>Layer {ENCAP_STEPS.length - step} of {ENCAP_STEPS.length} (going down the stack)</p>
    </div>
  )
}

// ─── Interactive 3: OSI Troubleshooter ───────────────────────────────────────

const PROBLEMS = [
  {
    id: 'p1',
    symptom: '🔴 You can ping your router (192.168.1.1) but cannot reach any websites.',
    layer: 3,
    layerName: 'Network Layer (L3)',
    color: '#3b82f6',
    diagnosis: 'You have local connectivity but no internet routing. The issue is at Layer 3 — your router can not route packets beyond your LAN.',
    steps: [
      'ping 8.8.8.8 — if this fails, routing to the internet is broken',
      'ip route show — check that a default gateway (0.0.0.0/0) exists',
      'traceroute 8.8.8.8 — see where packets stop being forwarded',
      'Check ISP connection: is the WAN interface getting a public IP?',
    ],
    fix: "Your router's WAN IP is missing or your ISP's gateway is unreachable. Restart the modem, or call your ISP — the issue is between your router and their network.",
  },
  {
    id: 'p2',
    symptom: '🔴 Your laptop shows "Connected, no internet." Other devices on the same network work fine.',
    layer: 4,
    layerName: 'Transport / Application (L4–L7)',
    color: '#f97316',
    diagnosis: 'Physical and data link are working (other devices share the switch). The problem is specific to this device — likely a bad IP, DNS, or firewall setting.',
    steps: [
      'ipconfig / ip addr — does the device have a valid IP (not 169.254.x.x APIPA)?',
      'ping 8.8.8.8 — if works, DNS is broken. If fails, IP/routing issue.',
      'nslookup google.com — if this fails, DNS server is unreachable or wrong',
      'Check firewall rules on the device — Windows Firewall sometimes blocks routing',
    ],
    fix: 'Most likely DHCP failed (try: ipconfig /release then /renew) or DNS is misconfigured. Check the device\'s network settings and compare to a working device.',
  },
  {
    id: 'p3',
    symptom: '🔴 Two devices on the same switch cannot communicate with each other.',
    layer: 2,
    layerName: 'Data Link Layer (L2)',
    color: '#ef4444',
    diagnosis: 'If both devices have valid IPs on the same subnet and still cannot reach each other, the problem is at Layer 2 — the switch is not forwarding frames correctly.',
    steps: [
      'arp -a — does each device have the other\'s MAC address in its ARP table?',
      'Are both devices on the same VLAN? A switch separates VLANs by default.',
      'Check switch CAM table: does the switch know which port each MAC is on?',
      'Try a direct cable between the two devices — bypasses the switch entirely',
    ],
    fix: 'Most likely a VLAN misconfiguration — both devices are on different VLANs and being treated as separate networks. Assign them to the same VLAN in the switch config.',
  },
  {
    id: 'p4',
    symptom: '🔴 Network cable is plugged in but the NIC shows no link light.',
    layer: 1,
    layerName: 'Physical Layer (L1)',
    color: '#94a3b8',
    diagnosis: 'No link light means no physical-layer connection. The signal is not being established between the two devices.',
    steps: [
      'Try a different cable — most L1 problems are bad cables',
      'Try a different switch port — the port might be faulty or disabled',
      'ethtool eth0 — check negotiated speed and duplex (should show "Link detected: yes")',
      'Check the RJ-45 connector — is it clicked in fully? Are all 8 pins seated?',
    ],
    fix: 'Start with the cable — it is the most common physical layer failure. If a new cable doesn\'t help, test the NIC in another port or device. Physical problems are almost always cable, port, or NIC.',
  },
  {
    id: 'p5',
    symptom: '🔴 You can reach a website by IP (http://142.250.182.4) but not by name (http://google.com).',
    layer: 7,
    layerName: 'Application Layer (L7) — DNS',
    color: '#10b981',
    diagnosis: 'IP connectivity is fine (Layer 3 works). The application protocol DNS is failing — Layer 7 service is down or unreachable.',
    steps: [
      'nslookup google.com — does it return an IP? What DNS server is it querying?',
      'nslookup google.com 8.8.8.8 — try a public DNS server directly',
      'cat /etc/resolv.conf — which DNS server is configured?',
      'ping your DNS server — is the DNS server itself reachable?',
    ],
    fix: "Your device's DNS server is down or misconfigured. Change the DNS server to 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare) as a quick fix. Long-term: find out why your configured DNS server is unreachable.",
  },
]

function OSITroubleshooter() {
  const [selected, setSelected] = useState<string | null>(null)
  const prob = PROBLEMS.find(p => p.id === selected)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 4px' }}>Interactive — OSI Troubleshooter</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 24px' }}>Pick a real networking symptom. Learn how to diagnose it layer-by-layer, the same way senior engineers do.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: selected ? 24 : 0 }}>
        {PROBLEMS.map(p => (
          <button key={p.id} onClick={() => setSelected(selected === p.id ? null : p.id)}
            style={{ padding: '14px 18px', background: selected === p.id ? `${p.color}12` : 'var(--bg)', border: `1px solid ${selected === p.id ? p.color : 'var(--border)'}`, borderRadius: 10, cursor: 'pointer', textAlign: 'left', color: 'var(--text)', fontSize: 14, fontWeight: selected === p.id ? 700 : 400, lineHeight: 1.5, transition: 'all 0.2s' }}>
            {p.symptom}
          </button>
        ))}
      </div>

      {prob && (
        <div style={{ background: `${prob.color}08`, border: `1px solid ${prob.color}30`, borderRadius: 12, padding: '20px 22px' }}>
          <p style={{ fontSize: 11, color: prob.color, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 4px' }}>Identified Layer</p>
          <p style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', margin: '0 0 12px' }}>{prob.layerName}</p>
          <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 18px' }}>{prob.diagnosis}</p>

          <p style={{ fontSize: 11, fontWeight: 700, color: prob.color, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>Diagnostic Steps</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 18 }}>
            {prob.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: prob.color, flexShrink: 0, marginTop: 1, fontWeight: 800 }}>{i + 1}.</span>
                <code style={{ fontSize: 13, color: '#e2e8f0', background: '#0d1117', padding: '5px 10px', borderRadius: 6, fontFamily: FONT_MONO, lineHeight: 1.6, flex: 1 }}>{step}</code>
              </div>
            ))}
          </div>

          <div style={{ padding: '12px 16px', background: 'var(--bg)', borderRadius: 10, borderLeft: `3px solid ${prob.color}` }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: prob.color, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 6px' }}>Most Likely Fix</p>
            <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>{prob.fix}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function OSIModel() {
  return (
    <LearnLayout
      title="The OSI Model — All 7 Layers"
      description="The universal framework every network engineer uses to understand, design, and troubleshoot networks — from copper cables to application APIs."
      section="Networking Fundamentals — Module 3"
      readTime="22–30 min"
      updatedAt="May 2026"
    >

      {/* ── Chapter 1 ── */}
      <Chapter
        n="1"
        title="The Support Call That Changed How I Think"
        subtitle="A real problem, a framework that solved it, and why every engineer needs to know this model."
      />

      <StoryBox>
        <p>It is 2 AM. Your company's e-commerce site is down. Orders are failing. The CEO is awake. Your on-call phone is ringing.</p>
        <p style={{ margin: '12px 0 0' }}>You SSH into the server — it's up. You can ping it from your laptop. But customers in Australia can't reach it. Customers in Germany can. The load balancer logs look fine. The database is healthy. What is broken?</p>
        <p style={{ margin: '12px 0 0' }}>Without a framework, you are just guessing — clicking through dashboards, restarting things, hoping. A senior engineer walks over, opens a terminal, and types three commands. In four minutes she says: "BGP route to our Sydney datacenter is being dropped by a transit provider. Traffic is black-holing at Layer 3." She reroutes through a backup path. The site comes back.</p>
        <p style={{ margin: '12px 0 0' }}>Her secret? She had a mental model that let her eliminate entire categories of failure in seconds. That model is the OSI stack.</p>
      </StoryBox>

      <Para>
        The <Accent>OSI Model</Accent> (Open Systems Interconnection) is a seven-layer framework that describes
        how data travels from one computer to another. It was published by the ISO in 1984 to give engineers
        a universal language for describing and reasoning about network communication.
      </Para>
      <Para>
        Every network problem you will ever face lives in one of these seven layers. The moment you identify
        which layer is broken, you eliminate six layers of noise and focus your diagnostic commands precisely.
        That is why, after 40 years, this model is still the first thing every network engineer learns — and the
        framework every experienced engineer falls back on under pressure.
      </Para>

      <Divider />

      {/* ── Chapter 2 ── */}
      <Chapter
        n="2"
        title="Why Seven Layers? The Power of Modular Design"
        subtitle="Before OSI existed, every manufacturer had their own incompatible networking system. IBM's, DEC's, and Xerox's equipment could not talk to each other."
      />

      <StoryBox>
        <p>Imagine building a skyscraper where the electricians, plumbers, and HVAC engineers all used completely different measurement systems, different connectors, and different standards. A German electric panel would never connect to an American HVAC system. You'd have to rebuild the entire building from scratch if you wanted to swap out the air conditioning.</p>
        <p style={{ margin: '12px 0 0' }}>That was networking before 1984. IBM's SNA, DEC's DECnet, and Xerox's XNS were all proprietary. Buy IBM, stay IBM forever. The OSI model was the industry's answer: agree on the interface between each layer, and anyone can build any layer independently.</p>
      </StoryBox>

      <Para>
        Layering solves one of the hardest problems in engineering: <Accent>how do you build a complex system
        that can evolve without breaking everything that depends on it?</Accent>
      </Para>
      <Para>
        The answer: each layer provides a service to the layer above, and consumes a service from the layer below.
        As long as the interface between layers stays the same, you can completely replace the implementation
        of any single layer without touching the others. This is why:
      </Para>

      <H2>You Can Change the Physical Layer Without Breaking Applications</H2>
      <Para>
        Ethernet started at 10 Mbps in 1980. Today it runs at 400 Gbps. Your browser did not change.
        HTTP still works exactly the same way. The application layer has no idea whether the bits below
        are traveling through copper, fiber, or Wi-Fi radio waves — and it does not need to know.
      </Para>

      <H2>Wi-Fi Can Replace Ethernet Without Changing Anything Above</H2>
      <Para>
        You pull out the Ethernet cable and connect to Wi-Fi. Everything still works — Chrome, SSH, Spotify.
        Layer 1 and 2 changed completely (copper signals → radio waves, Ethernet frames → 802.11 frames),
        but Layers 3 through 7 stayed identical. The layers above only care that bits arrive — not how.
      </Para>

      <H2>IPv6 Can Replace IPv4 Without Changing TCP or HTTP</H2>
      <Para>
        IPv6 is a completely different addressing scheme at Layer 3. But TCP at Layer 4 and HTTP at Layer 7
        work identically whether they are running over IPv4 or IPv6 — they just ask Layer 3 for delivery
        and don't care about the specifics.
      </Para>

      <WowBox emoji="🧠" title="The Mnemonic Everyone Uses">
        To remember the seven layers from top to bottom (7 to 1): <strong>"Please Do Not Throw Sausage Pizza Away"</strong> — Physical, Data Link, Network, Transport, Session, Presentation, Application. Or bottom to top (1 to 7): <strong>"All People Seem To Need Data Processing"</strong>. Senior engineers remember it as "when your network breaks, start at Layer 1 and work up." Interview panels will test this.
      </WowBox>

      <Divider />

      {/* ── Chapter 3 ── */}
      <Chapter
        n="3"
        title="CSMA/CD and CSMA/CA — How Ethernet and Wi-Fi Share the Medium"
        subtitle="Before a device can transmit, it must answer one question: is anyone else transmitting right now? The answer to that question is what separates Ethernet from Wi-Fi."
      />

      <StoryBox>
        <p>Imagine twelve people in a room trying to have a conversation with one rule: only one person can speak at a time. No moderator, no turn order. If two people start talking simultaneously, both stop, wait a random amount of time, then try again. That is exactly how early Ethernet worked — and understanding it explains why switches were invented, why Wi-Fi feels slower than wired, and why your Wi-Fi degrades when more people join the network.</p>
      </StoryBox>

      <H2>CSMA/CD — Ethernet's Original Medium Access Protocol</H2>
      <Para>
        Early Ethernet used a shared coaxial cable — a single wire that every device on the network was literally connected to. Before sending, every device had to check whether the wire was already in use. The protocol that managed this is <Accent>CSMA/CD</Accent>: Carrier Sense Multiple Access with Collision Detection.
      </Para>

      <CodeBlock title="CSMA/CD algorithm — how every Ethernet NIC worked before switches">
{`1. CARRIER SENSE — Listen before transmitting:
   "Is someone else currently using the wire?"
   If yes → wait (defer) until the wire goes idle.
   If no  → proceed to step 2.

2. MULTIPLE ACCESS — All devices share the same medium:
   Any device can attempt to transmit whenever the wire appears idle.
   There is no central controller or scheduler.

3. TRANSMIT + COLLISION DETECTION — While transmitting, keep listening:
   If you hear your own signal reflected back differently → COLLISION detected.
   Two devices started transmitting at nearly the same moment.

4. ON COLLISION:
   a. Send a 32-bit JAM signal — alerts everyone that a collision occurred.
   b. Both devices stop immediately.
   c. Each waits a RANDOM backoff time (binary exponential backoff).
   d. Return to step 1 and try again.

BINARY EXPONENTIAL BACKOFF:
   After 1st collision: wait random(0, 1) × 512 bit-times
   After 2nd collision: wait random(0, 3) × 512 bit-times
   After 3rd collision: wait random(0, 7) × 512 bit-times
   After nth collision: wait random(0, 2ⁿ−1) × 512 bit-times
   After 16 collisions: give up, report error to upper layers`}
      </CodeBlock>

      <WowBox emoji="⚡" title="Why CSMA/CD is Almost Irrelevant Today">
        Modern full-duplex switched Ethernet has eliminated CSMA/CD. A switch gives each device its own dedicated point-to-point link. Since no two devices share a wire, there is no shared medium, no collisions possible, and CSMA/CD is never invoked. Full-duplex lets a device transmit and receive simultaneously — the physical layer knows the difference between your outgoing signal and incoming signals. CSMA/CD survives only on half-duplex links (rare legacy setups) and in textbooks. The reason it still matters: understanding it explains why hubs caused problems, why switches were revolutionary, and why the concept still applies to Wi-Fi.
      </WowBox>

      <H2>CSMA/CA — Wi-Fi's Approach (Collision Avoidance, Not Detection)</H2>
      <Para>
        Wi-Fi cannot use CSMA/CD. The fundamental reason: a Wi-Fi device cannot detect collisions while
        transmitting because its own signal drowns out anything it could hear from others.
        There is also the <Accent>hidden node problem</Accent> — two devices (A and C) may both be in range
        of the access point (B) but out of range of each other. A thinks the channel is idle because it cannot
        hear C transmitting to B. When A transmits, the signals collide at B. A never detects this.
      </Para>
      <Para>
        Wi-Fi's solution is <Accent>CSMA/CA</Accent>: Carrier Sense Multiple Access with Collision Avoidance.
        Instead of detecting and recovering from collisions, Wi-Fi tries to avoid them before they happen:
      </Para>

      <CodeBlock title="CSMA/CA algorithm — how Wi-Fi devices share a channel">
{`1. CARRIER SENSE — Is the channel currently busy?
   If busy → wait until idle, then wait an additional DIFS
             (DCF Interframe Space, ~34 µs for 802.11a/g/n)

2. RANDOM BACKOFF — Even if channel is idle:
   Pick a random number of "slots" to wait (contention window).
   Count down slot by slot while monitoring channel.
   If channel goes busy again → pause countdown, wait for idle + DIFS, resume.
   This spreads out transmissions from multiple devices.

3. OPTIONAL RTS/CTS (Request to Send / Clear to Send):
   Sender →  "RTS" to AP: "I want to send 500 bytes to server X"
   AP broadcasts "CTS": "Go ahead, all other devices: back off for 500 bytes worth of time"
   This solves the hidden node problem.

4. TRANSMIT the frame.

5. WAIT FOR ACK — AP (or destination) must acknowledge every frame:
   If no ACK received within SIFS (Short Interframe Space, ~16 µs):
   → Assume collision/error occurred, retry with larger backoff window.

KEY DIFFERENCE FROM CSMA/CD:
   CSMA/CD: transmit first, detect collision during transmission.
   CSMA/CA: use randomized backoff to avoid collision before transmitting.
   Wi-Fi ACKs every single frame (unlike Ethernet, which relies on upper layers).`}
      </CodeBlock>

      <Warn title="Why Wi-Fi gets slower with more devices">
        Every additional device increases contention. More devices competing for the same channel means larger effective backoff windows and more time spent waiting. This is why a Wi-Fi network with 30 devices connected to one access point degrades significantly — each device is statistically waiting longer before it can transmit. Wired switches have no such problem: each port is an independent collision domain with no contention.
      </Warn>

      <Divider />

      {/* ── Chapter 4 ── */}
      <Chapter
        n="4"
        title="Collision Domains vs Broadcast Domains — Two Types of Network Scope"
        subtitle="These two concepts define what network devices can 'hear' — and misunderstanding them causes some of the most confusing network design mistakes."
      />

      <Para>
        Every network segment has two boundaries: a <Accent>collision domain</Accent> (who you can collide
        with) and a <Accent>broadcast domain</Accent> (who receives your broadcasts). Different devices at
        different OSI layers create different boundaries.
      </Para>

      <H2>Collision Domain — Who You Can Crash Into</H2>
      <Para>
        A collision domain is the set of devices that can cause a collision with each other on a shared medium.
        If you and another device transmit simultaneously and the signals overlap, that is a collision.
        The size of your collision domain determines how badly CSMA/CD contention hurts you.
      </Para>

      <CodeBlock title="How different devices affect collision domains">
{`HUB (Layer 1 device):
  All ports share ONE collision domain.
  8-port hub → 8 devices in one collision domain.
  Any two devices transmitting simultaneously = collision.
  All 8 devices fighting over the same wire bandwidth.

SWITCH (Layer 2 device):
  Each port is its own ISOLATED collision domain.
  24-port switch → 24 separate collision domains.
  Device on port 3 and device on port 17 CANNOT collide.
  Full-duplex on each port → zero collisions possible.
  Each device gets dedicated bandwidth: 24 × 1 Gbps = 24 Gbps total capacity.

ROUTER (Layer 3 device):
  Each interface is its own collision domain (same as switch ports).
  Traffic is terminated at the router — no signal passes between interfaces.`}
      </CodeBlock>

      <H2>Broadcast Domain — Who Hears Your Broadcasts</H2>
      <Para>
        A broadcast domain is the set of devices that receive a frame sent to the broadcast MAC address
        (<Code>FF:FF:FF:FF:FF:FF</Code>). Broadcasts are used by ARP requests, DHCP discovery, and some
        routing protocols. Every device in the broadcast domain must process every broadcast — which is why
        large flat networks with thousands of devices become sluggish.
      </Para>

      <CodeBlock title="How different devices affect broadcast domains">
{`HUB (Layer 1):
  Does NOT separate broadcast domains.
  All ports = one broadcast domain.
  (Hubs don't read frames at all — they repeat every bit to every port.)

SWITCH (Layer 2):
  Does NOT separate broadcast domains by default.
  A broadcast frame is flooded to ALL ports (minus the incoming port).
  All switch ports = one broadcast domain.
  VLANs on a managed switch DO separate broadcast domains.
  Each VLAN = its own isolated broadcast domain.

ROUTER (Layer 3):
  ALWAYS separates broadcast domains.
  A router never forwards a broadcast frame across interfaces.
  Each router interface = its own broadcast domain.
  This is why large networks use routers (or VLANs + L3 switches) to limit
  broadcast traffic — called "broadcast domain segmentation."

SUMMARY TABLE:
  Device    | Separates Collision Domains? | Separates Broadcast Domains?
  ----------|------------------------------|-----------------------------
  Hub       | No (one big domain)          | No
  Switch    | Yes (per port)               | No (unless VLANs configured)
  Router    | Yes (per interface)          | Yes (always)`}
      </CodeBlock>

      <WowBox emoji="🔊" title="Why Broadcast Domains Matter — The ARP Storm">
        In a flat network with 2,000 devices on one broadcast domain, every ARP request goes to all 2,000 devices. Every device's CPU must process every ARP, even if 1,999 of them have nothing to do with it. With hundreds of devices sending ARP requests per second, this is called a "broadcast storm" — CPU time wasted on irrelevant frames. Well-designed enterprise networks segment into /24 subnets (254 hosts) separated by routers or VLANs, keeping broadcast domains small and fast.
      </WowBox>

      <Divider />

      {/* ── Chapter 5 ── */}
      <Chapter
        n="5"
        title="Layer 1 — Physical: The World of Bits, Volts, and Light"
        subtitle="Before any networking protocol can do anything, bits have to physically travel from one place to another."
      />

      <StoryBox>
        <p>You have two laptops. You want them to share a file. Before any protocol, any IP address, any TCP handshake — there is a physical question: how does a 1 or a 0 get from one machine to the other?</p>
        <p style={{ margin: '12px 0 0' }}>Over copper: a high voltage represents a 1, a low voltage represents a 0. Over fiber: a pulse of laser light is a 1, no pulse is a 0. Over Wi-Fi: the phase of a radio wave encodes bits. Three completely different physics. One common answer: whatever carries raw bits without caring what they mean.</p>
      </StoryBox>

      <Para>
        Layer 1 defines the physical medium and signal encoding. It has no knowledge of addresses, frames,
        or packets — it just moves bits from one end of a wire to the other.
      </Para>

      <H2>Signal Encoding: How a Bit Becomes a Signal</H2>
      <Para>
        You cannot literally put a "1" or "0" on a wire. You must encode it as a physical phenomenon.
        Early Ethernet used <Accent>Manchester encoding</Accent> — a transition from low-to-high mid-bit
        represents a 1, high-to-low represents a 0. This is self-clocking but inefficient.
        Modern Gigabit Ethernet uses <Accent>4B/5B encoding</Accent> (maps 4 data bits to 5 signal symbols)
        to maintain synchronisation while transmitting close to line rate.
        400 Gbps Ethernet uses <Accent>PAM4</Accent> (Pulse Amplitude Modulation 4) — four voltage levels
        instead of two, encoding 2 bits per symbol to double throughput without doubling frequency.
      </Para>

      <H2>Physical Media Types</H2>
      <Para>
        <Accent>Copper (UTP):</Accent> Cat5e supports 1 Gbps up to 100m. Cat6A supports 10 Gbps up to 100m.
        Signals degrade with distance (attenuation) and interference (crosstalk).
        Repeaters and switches regenerate signals at each hop.
      </Para>
      <Para>
        <Accent>Fiber optic:</Accent> Single-mode fiber (yellow jacket, 9μm core) carries laser light hundreds
        of kilometers — used for long-haul and datacenter spine connections.
        Multi-mode fiber (orange jacket, 50μm core) works up to ~300–550m — used for short datacenter runs.
        Immune to electromagnetic interference and cannot be easily tapped without detection.
      </Para>
      <Para>
        <Accent>Wi-Fi (802.11):</Accent> Radio waves in the 2.4 GHz, 5 GHz, and 6 GHz bands.
        No physical connection required — but subject to interference, range limits, and walls.
        Shared medium: unlike switched Ethernet, all devices on the same channel share bandwidth.
      </Para>

      <CodeBlock title="Checking physical layer status on Linux">
{`# Check link status and negotiated speed
ethtool eth0

# Output you want to see:
#   Link detected: yes
#   Speed: 1000Mb/s
#   Duplex: Full

# If Link detected: no — check the cable or switch port
# If Speed: 100Mb/s instead of 1000Mb/s — bad cable or NIC mismatch
# If Duplex: Half — performance will be terrible under load`}
      </CodeBlock>

      <Warn title="Half-duplex kills performance">
        If a NIC negotiates half-duplex instead of full-duplex (common with old cables or misconfigured switches), the device and switch must take turns — one transmits, the other waits. On a 1 Gbps link with full-duplex you get 2 Gbps total capacity (1 Gbps each direction simultaneously). On half-duplex you share 1 Gbps total. Always verify duplex settings when troubleshooting slow connections on otherwise-good hardware.
      </Warn>

      <Divider />

      {/* ── Chapter 4 ── */}
      <Chapter
        n="4"
        title="Layer 2 — Data Link: MAC Addresses and Ethernet Frames"
        subtitle="Layer 2 answers the question: on this local network segment, how does data get from this device to that device?"
      />

      <StoryBox>
        <p>There are 20 laptops connected to an 8-port switch in a conference room. You send a file to your colleague two seats away. Layer 3 (IP) doesn't need to get involved — you're on the same network segment. Instead, your laptop finds out your colleague's MAC address using ARP, builds an Ethernet frame addressed to that MAC, and sends it to the switch.</p>
        <p style={{ margin: '12px 0 0' }}>The switch reads the destination MAC from the frame header, looks up which port that MAC is connected to in its CAM table, and forwards the frame only to that single port. Twenty people connected — only two see that conversation. This is Layer 2 efficiency.</p>
      </StoryBox>

      <Para>
        Layer 2 provides <Accent>physical addressing</Accent> using MAC (Media Access Control) addresses.
        Unlike IP addresses (which are logical and can change), MAC addresses are burned into the NIC hardware
        at the factory — unique to every network interface card in the world.
      </Para>

      <H2>Ethernet Frame Structure</H2>

      <CodeBlock title="Ethernet II Frame (IEEE 802.3)">
{`┌──────────────┬─────────────┬───────────┬─────────────────┬─────────────┐
│ Dst MAC (6B) │ Src MAC (6B)│ Type (2B) │ Payload (46-1500│   CRC (4B)  │
│              │             │           │     bytes)      │  (Trailer)  │
└──────────────┴─────────────┴───────────┴─────────────────┴─────────────┘

Dst MAC:  B8:E8:56:44:55:66  (router's MAC — from ARP cache)
Src MAC:  A4:C3:F0:11:22:33  (your laptop's NIC hardware address)
EtherType: 0x0800 = IPv4 | 0x0806 = ARP | 0x86DD = IPv6
CRC:      Error detection — receiver recalculates and discards if mismatch`}
      </CodeBlock>

      <Para>
        A key detail: MAC addresses only survive one network hop. When your packet reaches your router,
        the router strips the Ethernet frame (discarding your MAC address), reads the IP destination,
        and builds a <em>brand new</em> Ethernet frame with its own source MAC and the next router's MAC.
        By the time your packet reaches Google, the Ethernet frame it is traveling in has nothing to do
        with the frame that left your laptop.
      </Para>

      <H2>How a Switch Learns — The CAM Table</H2>
      <Para>
        A switch starts with an empty CAM (Content-Addressable Memory) table. When a frame arrives on port 3
        with source MAC <Code>A4:C3:F0:11:22:33</Code>, the switch records: <Code>A4:C3:F0:11:22:33 → Port 3</Code>.
        Next time a frame is destined for that MAC, the switch forwards it directly to port 3 — no broadcast needed.
        Unknown destinations are flooded to all ports until the switch learns where they are.
      </Para>

      <WowBox emoji="⚡" title="Switches vs Hubs — Why Hubs Disappeared">
        An old network hub (1990s) was a Layer 1 device — every bit that arrived on any port was repeated to every other port. All 20 devices shared the same collision domain and could not transmit simultaneously. A switch operates at Layer 2: it forwards frames only to the specific port where the destination MAC lives. Each port gets its own dedicated bandwidth. A 24-port Gigabit switch gives every device a full 1 Gbps — 24 Gbps total switching capacity. A 24-port hub gave everyone a shared 10 Mbps. Hubs disappeared from the market around 2005.
      </WowBox>

      <Divider />

      {/* ── ARP Chapter ── */}
      <Chapter
        n="8"
        title="ARP — The Bridge Between Layer 2 and Layer 3"
        subtitle="You know your destination's IP address. But to build an Ethernet frame, you need a MAC address. ARP is the protocol that translates one into the other."
      />

      <StoryBox>
        <p>You want to send a packet to 192.168.1.1 (your router). Your IP layer knows the destination — 192.168.1.1. But your Ethernet layer needs to know: what MAC address does that IP belong to? The router is sitting two meters away, but your laptop has never spoken to it before. There is no address book. How does it find the router's MAC?</p>
        <p style={{ margin: '12px 0 0' }}>It shouts to everyone on the network: <em>"Hey, whoever has IP 192.168.1.1 — tell me your MAC address!"</em> The router hears it, and quietly replies with its MAC. Your laptop writes this down in its ARP cache and uses it forever until the entry expires. This entire exchange is ARP — Address Resolution Protocol.</p>
      </StoryBox>

      <Para>
        ARP (RFC 826, 1982) operates between Layer 2 and Layer 3 — technically it is a Layer 2 protocol
        but it serves Layer 3 addressing. Every time your device needs to send an IP packet to a device on
        the same network segment and doesn't already know the MAC address, ARP runs first.
      </Para>

      <H2>The ARP Request — A Broadcast Question</H2>
      <Para>
        An ARP request is sent as an Ethernet broadcast: the destination MAC is <Code>FF:FF:FF:FF:FF:FF</Code>.
        This means every device on the local network segment receives and processes it.
        Only the device that owns the requested IP address replies.
      </Para>

      <CodeBlock title="ARP Request and Reply — full exchange">
{`ARP REQUEST (broadcast to everyone):
  ┌──────────────────────────────────────────────────────────────┐
  │ Ethernet Header:                                             │
  │   Dst MAC:  FF:FF:FF:FF:FF:FF  ← broadcast — everyone reads │
  │   Src MAC:  A4:C3:F0:11:22:33  ← sender's MAC               │
  │   EtherType: 0x0806 (ARP)                                   │
  │                                                              │
  │ ARP Payload:                                                 │
  │   Operation: 1 (Request)                                     │
  │   Sender IP:  192.168.1.5     Sender MAC: A4:C3:F0:11:22:33 │
  │   Target IP:  192.168.1.1     Target MAC: 00:00:00:00:00:00  ← unknown
  │   "Who has 192.168.1.1? Tell 192.168.1.5"                  │
  └──────────────────────────────────────────────────────────────┘

ARP REPLY (unicast back to requester):
  ┌──────────────────────────────────────────────────────────────┐
  │ Ethernet Header:                                             │
  │   Dst MAC:  A4:C3:F0:11:22:33  ← directly to requester      │
  │   Src MAC:  B8:E8:56:44:55:66  ← router's MAC               │
  │   EtherType: 0x0806 (ARP)                                   │
  │                                                              │
  │ ARP Payload:                                                 │
  │   Operation: 2 (Reply)                                       │
  │   Sender IP:  192.168.1.1     Sender MAC: B8:E8:56:44:55:66 │
  │   "192.168.1.1 is at B8:E8:56:44:55:66"                    │
  └──────────────────────────────────────────────────────────────┘`}
      </CodeBlock>

      <H2>ARP Cache — Remembering the Answer</H2>
      <Para>
        After receiving the reply, your OS stores the IP→MAC mapping in the <Accent>ARP cache</Accent>.
        Every subsequent packet to 192.168.1.1 uses the cached MAC directly — no ARP needed.
        Entries expire after ~20 minutes by default (configurable per OS), then ARP runs again to refresh.
        You can inspect and modify your ARP cache:
      </Para>

      <CodeBlock title="ARP cache inspection commands">
{`# View ARP cache
arp -a                          # macOS/Linux — all entries
ip neigh                        # Linux — modern equivalent
arp -a                          # Windows

# Example output:
# 192.168.1.1      B8:E8:56:44:55:66  eth0   REACHABLE
# 192.168.1.100    A2:DE:F1:33:44:55  eth0   STALE

# Manually delete a stale entry (useful for troubleshooting):
ip neigh del 192.168.1.1 dev eth0   # Linux
arp -d 192.168.1.1                  # macOS/Windows

# ARP cache states:
# REACHABLE: recently confirmed working
# STALE:     entry exists but not confirmed recently — will probe on next use
# FAILED:    sent ARP, no reply — host is down or wrong subnet`}
      </CodeBlock>

      <H2>Critical Rule: ARP Only Resolves the Next Hop</H2>
      <Para>
        ARP resolves the MAC address of the <Accent>next hop</Accent> — not the final destination.
        When you send a packet to Google (142.250.182.4), your laptop does NOT send an ARP for Google's MAC.
        Google is not on your local network — it is across the internet, and Ethernet frames cannot cross routers.
        Instead your laptop ARPs for the <em>router's</em> MAC (the default gateway), builds the frame
        with the router's MAC, and the router handles the rest. The IP destination is Google's IP,
        but the MAC destination is your router's MAC. This is the key bridge between L2 and L3.
      </Para>

      <H2>Gratuitous ARP — Announcing Your Own Address</H2>
      <Para>
        A <Accent>gratuitous ARP</Accent> is an ARP reply sent without a prior request.
        A device sends it to announce its own IP→MAC mapping to the network.
        This happens when a device first connects, when its IP changes (DHCP lease renewal),
        or after a failover event (HA clusters send gratuitous ARPs to redirect traffic to the standby).
        It also updates stale ARP caches across the network instantly.
        The dark side: an attacker can send fake gratuitous ARPs to redirect traffic — this is ARP poisoning.
      </Para>

      <Err title="Assuming ARP works across routers">
        ARP is strictly local — it only works within a broadcast domain. A device on 192.168.1.0/24 can never ARP for a device on 10.0.0.0/24. Those subnets are separated by a router, which is always the boundary of a broadcast domain. If you ever see ARP requests for IPs that are not on the local subnet, something is misconfigured (wrong subnet mask, wrong gateway). The fix is always: check the device's subnet mask and default gateway — they must match the actual network topology.
      </Err>

      <Divider />

      {/* ── Chapter 9 ── */}
      <Chapter
        n="9"
        title="Layer 3 — Network: IP Addresses and the Global Routing System"
        subtitle="Layer 3 solves the hardest problem in networking: how do you deliver a packet between any two points on earth, across thousands of intermediate networks?"
      />

      <StoryBox>
        <p>You send a message from your apartment in Mumbai to a server in São Paulo. The packet crosses your home router, your ISP's network, a submarine cable under the Atlantic, several Brazilian ISPs, and finally the destination datacenter. At least 15 different organisations' routers handle it. None of them know each other. None of them were pre-configured for your specific packet.</p>
        <p style={{ margin: '12px 0 0' }}>How? Every router along the path reads the destination IP from the packet, looks it up in a routing table with potentially 900,000 entries, picks the best next hop, and forwards the packet. Fifteen independent decisions, each made in microseconds. This is Layer 3.</p>
      </StoryBox>

      <Para>
        Layer 3 introduces <Accent>logical addressing</Accent> — IP addresses that identify devices not by
        their hardware, but by their position in the network. Unlike MAC addresses (which are flat and have
        no geographic meaning), IP addresses are hierarchical: the network portion tells routers which
        large network the destination belongs to, and the host portion identifies the specific device within it.
      </Para>

      <H2>IPv4 — The 32-bit Address</H2>
      <Para>
        IPv4 uses a 32-bit address written in dotted-decimal notation: <Code>192.168.1.5</Code>.
        Each of the four groups (called octets) is one byte, ranging from 0–255.
        The total address space is 2³² = 4,294,967,296 addresses. With 8 billion people and tens of billions
        of connected devices, we ran out — which is why NAT was invented and why IPv6 exists.
      </Para>

      <H2>Routing: How Packets Find the Next Hop</H2>
      <Para>
        A router never "knows the full path" to the destination. It only knows the next hop — the immediate
        next router to send the packet to. It makes this decision by consulting its routing table:
        a list of destination prefixes matched to next-hop addresses or interfaces.
        The router applies <Accent>longest prefix match</Accent>: if multiple routes match the destination,
        the one with the longest subnet mask wins (most specific route).
      </Para>

      <CodeBlock title="Reading a routing table (ip route show)">
{`$ ip route show

default via 192.168.1.1 dev eth0          # If no specific match: send to 192.168.1.1 (router)
192.168.1.0/24 dev eth0 proto kernel      # This entire subnet: deliver locally
10.0.0.0/8 via 10.8.0.1 dev tun0         # VPN traffic: send through tunnel interface
169.254.0.0/16 dev eth0 proto kernel     # Link-local: on this interface only

# Longest prefix match example:
# Destination: 192.168.1.50
# Matches: 192.168.1.0/24 (prefix length 24) → wins
# Also matches: default 0.0.0.0/0 (prefix length 0) → loses
# Result: delivered directly on eth0`}
      </CodeBlock>

      <H2>TTL — Preventing Infinite Loops</H2>
      <Para>
        Every IP packet carries a TTL (Time To Live) field — an integer starting at 64 or 128.
        Each router that forwards the packet decrements TTL by 1. If TTL reaches 0, the router discards
        the packet and sends an <Accent>ICMP Time Exceeded</Accent> message back to the source.
        This prevents misconfigured routing loops from keeping packets circulating forever.
        The TTL trick is what makes <Code>traceroute</Code> work — it sends packets with TTL=1, 2, 3...
        each hop that drops the packet sends back an ICMP message, revealing its IP address.
      </Para>

      <H2>MTU and IP Fragmentation — When Packets Are Too Big</H2>
      <Para>
        Every network link has a <Accent>Maximum Transmission Unit (MTU)</Accent> — the largest Layer 3
        payload it can carry. Standard Ethernet MTU is <strong>1,500 bytes</strong>.
        An IP packet larger than the outgoing link's MTU must either be fragmented or discarded.
      </Para>
      <Para>
        <Accent>IPv4 fragmentation</Accent> allows any router along the path to split an oversized packet
        into smaller fragments, each with its own IP header. The destination host reassembles all fragments
        into the original packet before passing it to Layer 4. IPv4 headers carry three fields for this:
      </Para>

      <CodeBlock title="IPv4 header fields used for fragmentation">
{`IDENTIFICATION (16 bits):
  All fragments of the same original packet share the same ID.
  The receiver uses this to group fragments for reassembly.

FLAGS (3 bits):
  Bit 1 — DF (Don't Fragment):
    DF=0: routers may fragment this packet
    DF=1: routers must NOT fragment — if packet is too big, drop it
          and send ICMP "Fragmentation Needed" back to sender.
          Used by Path MTU Discovery (PMTUD).
  Bit 2 — MF (More Fragments):
    MF=1: more fragments follow — this is not the last piece.
    MF=0: this is the last (or only) fragment.

FRAGMENT OFFSET (13 bits):
  Where in the original packet does this fragment's data begin?
  Measured in 8-byte units. Offset=0 → first fragment.
  Offset=185 → this fragment starts at byte 185×8 = 1,480 of original data.

EXAMPLE — 4,000-byte packet over Ethernet (MTU 1,500):
  Fragment 1: bytes    0–1479  | MF=1 | Offset=0
  Fragment 2: bytes 1480–2959  | MF=1 | Offset=185
  Fragment 3: bytes 2960–3999  | MF=0 | Offset=370 (last fragment)`}
      </CodeBlock>

      <Para>
        <Accent>IPv6 does NOT allow intermediate routers to fragment.</Accent> Only the original sender
        can fragment an IPv6 packet (using an extension header). If an IPv6 packet is too large for a link,
        the router sends an ICMPv6 "Packet Too Big" message back to the sender, who must reduce the
        packet size. This is intentional: fragmentation at routers adds latency and CPU load.
      </Para>

      <H2>Path MTU Discovery — Avoiding Fragmentation Entirely</H2>
      <Para>
        <Accent>PMTUD</Accent> (Path MTU Discovery) is the modern solution: the sender discovers the
        minimum MTU across the entire path and sends packets that fit — no fragmentation needed.
        It works by sending packets with DF=1 (Don't Fragment). If any router on the path has a smaller
        MTU, it drops the packet and returns an ICMP "Fragmentation Needed" message specifying the
        maximum size it can forward. The sender reduces its MSS (Maximum Segment Size) and retries.
      </Para>

      <Warn title="ICMP blocking breaks PMTUD — the 'black hole' problem">
        Many firewalls block all ICMP traffic. When ICMP "Fragmentation Needed" messages are blocked, the sender never learns that its packets are too large. The result: TCP connections work fine for small requests but hang or time out when transferring large amounts of data. This is called an "MTU black hole." Fix: configure firewalls to allow ICMP type 3 (Destination Unreachable), code 4 (Fragmentation Needed). On Linux servers: <code>ip link set eth0 mtu 1400</code> forces a smaller MTU as a workaround.
      </Warn>

      <CodeBlock title="Common MTU values you will encounter">
{`Standard Ethernet:     1,500 bytes  (most networks)
Wi-Fi (802.11):        2,304 bytes  (but usually matches Ethernet at 1,500)
Jumbo Frames:          9,000 bytes  (datacenter 10G/40G/100G links — must be
                                     configured on every switch port end-to-end)
VPN tunnels (WireGuard): ~1,420 bytes  (reduced because VPN headers eat MTU)
PPPoE (DSL):           1,492 bytes  (8 bytes eaten by PPPoE header)
VXLAN overlay:         ~1,450 bytes  (50-byte VXLAN/UDP/IP/Ethernet overhead)

TCP MSS (Maximum Segment Size) = MTU − IP header (20B) − TCP header (20B)
  On standard Ethernet: MSS = 1,500 − 20 − 20 = 1,460 bytes
  This is why TCP segment payloads are almost always 1,460 bytes.`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 10 ── */}
      <Chapter
        n="10"
        title="Layer 4 — Transport: TCP, UDP, Ports, and Reliability"
        subtitle="Your computer runs dozens of apps simultaneously. Layer 4 is how the OS knows which arriving packet belongs to Chrome vs Spotify vs SSH."
      />

      <StoryBox>
        <p>Right now, your laptop might have 40 active network connections. Chrome is making 15 HTTP requests to different servers. Spotify is streaming audio. A Slack call is running. SSH is connected to a remote server. All of these connections arrive as IP packets addressed to the same IP address — your laptop's IP. How does your OS know which packets belong to which application?</p>
        <p style={{ margin: '12px 0 0' }}>The answer is port numbers — a 16-bit number (0–65535) added by Layer 4. Chrome's connections use port 443 as the destination. Each Chrome tab gets a different source port (e.g., 54321, 54322, 54323). Spotify uses a different source port range. The OS routes arriving packets to the right application by matching the destination port to a listening process.</p>
      </StoryBox>

      <H2>TCP — The Reliable Protocol</H2>
      <Para>
        TCP (Transmission Control Protocol) establishes a connection before sending any data,
        numbers every single byte it sends, requires acknowledgement of every segment,
        retransmits anything not acknowledged within a timeout, and controls the rate of transmission
        to avoid overwhelming the network. This reliability has a cost: overhead.
        Every TCP connection requires a 3-way handshake before data flows.
      </Para>

      <CodeBlock title="TCP 3-Way Handshake">
{`Client                                     Server
  │                                            │
  │──── SYN (Seq=1000, "I want to connect") ──▶│
  │                                            │
  │◀── SYN-ACK (Seq=5000, Ack=1001, "OK") ───│
  │                                            │
  │──── ACK (Ack=5001, "Got it, let's go") ──▶│
  │                                            │
  │           [Data flows now]                 │
  │                                            │

Total cost: 1 round trip (RTT) before any application data`}
      </CodeBlock>

      <Para>
        After the connection: data segments are sent with sequence numbers.
        The receiver sends acknowledgements (ACKs) for received segments.
        If an ACK is not received within a timeout, the segment is retransmitted.
        TCP also implements flow control (receiver advertises its buffer size via Window field)
        and congestion control (slow start, AIMD) to avoid flooding the network.
      </Para>

      <H2>UDP — The Fast Protocol</H2>
      <Para>
        UDP (User Datagram Protocol) adds only port numbers and a basic checksum to the IP packet.
        No connection, no sequencing, no retransmission, no flow control.
        What you send is what goes — lost packets are simply lost.
        But with no handshake and no overhead, a single UDP packet can arrive in one-third the time
        of the equivalent TCP exchange. This is why latency-sensitive applications use UDP:
        a dropped video frame is better than a frozen call waiting for a retransmit.
      </Para>

      <Para>
        Use TCP when: data must arrive complete and in order — web pages, files, emails, databases, SSH.
        Use UDP when: speed matters more than perfection — video calls, DNS lookups, online gaming,
        live streaming, QUIC (HTTP/3). The application layer handles any reliability needed.
      </Para>

      <H2>Port Numbers — The Addressing System Within Layer 4</H2>
      <Para>
        Port numbers (0–65535) are the mechanism by which Layer 4 delivers data to the correct application.
        The operating system maintains a table mapping port numbers to listening processes.
        When a TCP segment or UDP datagram arrives with destination port 443, the OS hands it to the process
        listening on port 443 — your web server, not your database or SSH daemon.
      </Para>
      <Para>
        Port numbers are divided into three ranges by IANA (Internet Assigned Numbers Authority):
      </Para>

      <CodeBlock title="Port number ranges and important well-known ports">
{`WELL-KNOWN PORTS (0–1023):
  Assigned by IANA. Require root/administrator to bind.
  ┌──────┬─────────────────────────────────────────────────────────┐
  │ Port │ Protocol & Purpose                                       │
  ├──────┼─────────────────────────────────────────────────────────┤
  │   20 │ FTP Data — actual file data transfer                     │
  │   21 │ FTP Control — commands (LIST, RETR, STOR)               │
  │   22 │ SSH — encrypted terminal, SFTP, SCP, port forwarding    │
  │   23 │ Telnet — unencrypted terminal (NEVER use on production) │
  │   25 │ SMTP — sending email between mail servers               │
  │   53 │ DNS — domain name resolution (UDP for queries, TCP for  │
  │      │       zone transfers and large responses)               │
  │   67 │ DHCP Server — IP lease assignments to clients           │
  │   68 │ DHCP Client — client port for receiving lease responses │
  │   80 │ HTTP — unencrypted web traffic                         │
  │  110 │ POP3 — email retrieval (download and delete from server)│
  │  143 │ IMAP — email access (server-side storage, multi-device) │
  │  161 │ SNMP — network device monitoring and management (UDP)   │
  │  443 │ HTTPS — HTTP over TLS (the entire modern web)           │
  │  465 │ SMTPS — SMTP over TLS (email submission)               │
  │  514 │ Syslog — centralized log collection (UDP)              │
  │  993 │ IMAPS — IMAP over TLS                                  │
  │  995 │ POP3S — POP3 over TLS                                  │
  └──────┴─────────────────────────────────────────────────────────┘

REGISTERED PORTS (1024–49151):
  Registered with IANA but not exclusively reserved.
  Application developers register these for well-known services.
  │ 1433 │ Microsoft SQL Server                                     │
  │ 1521 │ Oracle Database                                         │
  │ 3306 │ MySQL / MariaDB                                         │
  │ 3389 │ RDP (Windows Remote Desktop Protocol)                   │
  │ 5432 │ PostgreSQL                                              │
  │ 5900 │ VNC (Virtual Network Computing)                         │
  │ 6379 │ Redis                                                   │
  │ 8080 │ HTTP alternate (dev servers, proxies, Tomcat)           │
  │ 8443 │ HTTPS alternate (dev servers, management interfaces)    │
  │ 9200 │ Elasticsearch REST API                                  │
  │ 27017│ MongoDB                                                  │

EPHEMERAL PORTS (49152–65535):
  Dynamic ports assigned by the OS to client connections.
  When your browser connects to google.com:443, the OS assigns your
  browser a random source port (e.g., 54,893) from this range.
  This source port is how the OS routes the server's reply back to
  the correct browser tab — not a different app on the same machine.

THE 5-TUPLE — Unique connection identifier:
  (Source IP, Source Port, Destination IP, Destination Port, Protocol)
  192.168.1.5:54893 → 142.250.182.4:443 TCP  ← Chrome tab 1
  192.168.1.5:54894 → 142.250.182.4:443 TCP  ← Chrome tab 2
  Same destination IP and port — different source ports → different connections`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 11 ── */}
      <Chapter
        n="11"
        title="Layer 5 — Session: Managing the Conversation"
        subtitle="Layer 5 is the most misunderstood layer — because in the modern internet, its functions are often handled by Layer 4 or Layer 7."
      />

      <Para>
        The <Accent>Session layer</Accent> establishes, manages, and terminates sessions between applications.
        In practice, the TCP connection itself handles much of what Layer 5 was designed for — so Layer 5
        is the layer people most often say "I've never actually seen." But its concepts are everywhere:
      </Para>

      <H2>Session Establishment</H2>
      <Para>
        Before two applications can exchange data, they need to agree to talk and set up the conversation.
        In web terms, this is the TLS handshake (at Layer 6) and the HTTP session (at Layer 7).
        In database terms, this is your application's connection pool establishing a persistent connection
        to PostgreSQL — one TCP connection reused for many queries.
      </Para>

      <H2>Synchronisation and Checkpointing</H2>
      <Para>
        Layer 5 was designed to insert checkpoints into data streams so that if a connection is interrupted,
        only the data since the last checkpoint needs to be retransmitted — not everything from the beginning.
        Modern applications handle this at the application layer: YouTube videos resume from where they stopped,
        file transfer tools like rsync track which blocks have been transferred,
        and database replication uses transaction logs to replay only missed changes.
      </Para>

      <H2>Dialog Control</H2>
      <Para>
        Session layer also defines who talks when — half-duplex (one side at a time, like a walkie-talkie)
        or full-duplex (both sides simultaneously, like a phone call).
        Most modern internet protocols are full-duplex over TCP:
        the server can push data to the client at the same moment the client sends a request.
      </Para>

      <WowBox emoji="💡" title="Where You Actually See L5 Today">
        NetBIOS (Windows file sharing) and RPC (Remote Procedure Call, used by Active Directory) are classic Layer 5 protocols. Modern equivalents: WebSockets establish a persistent session between browser and server for real-time apps. gRPC establishes bidirectional streaming sessions for microservices. HTTP/2 multiplexes many streams over one connection — essentially a Layer 5 session manager built into the application protocol.
      </WowBox>

      <Divider />

      {/* ── Chapter 8 ── */}
      <Chapter
        n="8"
        title="Layer 6 — Presentation: Translation, Encryption, Compression"
        subtitle="Layer 6 is the translator that ensures two different systems speaking different internal formats can understand each other."
      />

      <StoryBox>
        <p>You send "Hello" from a Mac to a Windows server. The Mac stores strings in UTF-8. The Windows API your application calls uses UTF-16. If neither side translates, the string arrives as gibberish. Layer 6 — the Presentation layer — defines how data is formatted, encoded, and transformed so that both ends understand it the same way.</p>
      </StoryBox>

      <Para>
        The Presentation layer handles three responsibilities:
      </Para>

      <H2>1. Data Translation and Encoding</H2>
      <Para>
        Character encoding (ASCII vs UTF-8 vs UTF-16), number representation (little-endian vs big-endian),
        and data format standards (JSON vs XML vs Protocol Buffers vs ASN.1).
        When your browser receives a web page, it reads the <Code>Content-Type: text/html; charset=UTF-8</Code>
        header — Layer 6 information telling the browser how to interpret the bytes it is receiving.
      </Para>

      <H2>2. Encryption and Decryption</H2>
      <Para>
        TLS (Transport Layer Security) is the most visible Layer 6 function in the modern internet.
        Before application data flows over HTTPS, TLS negotiates:
        which cipher suite to use (e.g., AES-256-GCM with SHA-384),
        exchanges and validates the server's certificate,
        performs a key exchange using ECDHE (Elliptic Curve Diffie-Hellman),
        and derives symmetric session keys for encrypting all subsequent data.
        Your application layer (HTTP) has no idea whether it is encrypted or not —
        it just sends HTTP, and TLS encrypts it transparently.
      </Para>

      <H2>3. Compression</H2>
      <Para>
        HTTP servers compress responses with <Code>gzip</Code> or <Code>brotli</Code> before sending.
        Your browser sends <Code>Accept-Encoding: gzip, deflate, br</Code> in the request header.
        The server compresses the HTML, CSS, and JavaScript.
        The browser decompresses before rendering. Compression typically reduces text payloads by 60–80%.
        This is transparent to both the HTTP layer above and the TCP layer below.
      </Para>

      <Divider />

      {/* ── Chapter 9 ── */}
      <Chapter
        n="9"
        title="Layer 7 — Application: The Layer You Actually Code"
        subtitle="Everything your users see — every API call, every web page, every email — is a Layer 7 interaction."
      />

      <StoryBox>
        <p>A junior developer joins your team and asks: "Is the problem in the network or the application?" This turns out to be a trick question, because the application IS the network at Layer 7. HTTP, SMTP, DNS, SSH — these are not separate from networking. They are networking. Every request your application makes goes through this layer first.</p>
      </StoryBox>

      <Para>
        Layer 7 is where your application code lives. Every time your React app makes a fetch() call,
        every time your Python script opens a socket to a database, every time curl sends an HTTP request —
        that is a Layer 7 protocol interaction. The application layer defines the rules for how
        applications request, transfer, and receive data from each other.
      </Para>

      <H2>HTTP — The Web's Foundation</H2>
      <Para>
        HTTP (HyperText Transfer Protocol) defines how browsers request resources and how servers respond.
        A request has: a method (GET, POST, PUT, DELETE), a URL, headers (Host, Content-Type, Authorization, Cookie),
        and optionally a body. A response has: a status code (200 OK, 404 Not Found, 500 Internal Server Error),
        headers, and a body.
        HTTP/2 added multiplexing (many requests over one TCP connection, avoiding head-of-line blocking).
        HTTP/3 moved to QUIC (UDP-based) for even lower latency and connection migration support.
      </Para>

      <H2>DNS — The Internet's Phone Book</H2>
      <Para>
        Before your browser can connect to anything, it needs an IP address.
        DNS (Domain Name System) translates human-readable names (google.com) to IP addresses (142.250.182.4).
        A DNS query is itself a Layer 7 protocol — typically UDP on port 53 (for small responses)
        or TCP on port 53 (for large responses or zone transfers).
        DNS failure makes the internet look completely broken even if every other layer is healthy:
        you can reach IPs directly but cannot resolve hostnames.
      </Para>

      <H2>SMTP, IMAP, SSH — Other Layer 7 Protocols</H2>
      <Para>
        <Accent>SMTP</Accent> (Simple Mail Transfer Protocol, port 25/587) handles sending emails between mail servers.
        <Accent>IMAP</Accent> (port 993) allows mail clients to read email from a server, keeping messages server-side.
        <Accent>SSH</Accent> (Secure Shell, port 22) provides encrypted terminal sessions, file transfers (SFTP), and port forwarding.
        Each is a Layer 7 protocol — an application-to-application communication standard.
      </Para>

      <OSIStackExplorer />

      <Divider />

      {/* ── Peer-to-Peer Chapter ── */}
      <Chapter
        n="14"
        title="Logical Peer-to-Peer Communication — How Each Layer Talks to Its Twin"
        subtitle="Data physically travels down 7 layers, across a wire, and up 7 layers. But logically, Layer 4 on your machine is speaking directly to Layer 4 on the remote machine. Understanding this distinction is what separates good engineers from great ones."
      />

      <StoryBox>
        <p>Imagine two embassies exchanging a diplomatic letter. The letter travels from the ambassador (L7) → secretary (L6) → courier (L5) → post office (L4) → customs (L3) → cargo truck (L2) → road (L1) → across the ocean → road (L1) → cargo truck (L2) → customs (L3) → post office (L4) → courier (L5) → secretary (L6) → receiving ambassador (L7).</p>
        <p style={{ margin: '12px 0 0' }}>The road (L1) carries the letter, but it has no idea what's in it. Customs (L3) reads the country-of-origin declaration, but ignores the letter itself. The post office (L4) tracks the delivery confirmation number, but cannot read the letter. Only the receiving ambassador (L7) reads the actual message. Each layer has its own peer on the other side — and they communicate through their headers, even though those headers physically travel through every layer below.</p>
      </StoryBox>

      <Para>
        When your TCP stack (L4) adds a segment header with a sequence number of <Code>4001</Code>,
        that information is <em>not</em> for the IP layer below or the Ethernet layer below that.
        It is a message from <Accent>your TCP to the remote TCP</Accent>.
        The IP layer, Ethernet layer, and every router in between treat the TCP header as opaque payload —
        they move it without reading it. Only when the segment arrives at the destination does the remote
        TCP stack open its header, read sequence number 4001, and respond with ACK 4002.
      </Para>

      <H2>The Physical Path vs the Logical Path</H2>

      <CodeBlock title="How data actually travels vs how it logically communicates">
{`PHYSICAL REALITY (what actually happens on the wire):

  Your Machine                         Remote Machine
  ┌─────────────┐                      ┌─────────────┐
  │ L7 HTTP     │ creates request       │ L7 HTTP     │ reads request
  │ L6 TLS      │ encrypts              │ L6 TLS      │ decrypts
  │ L5 Session  │ session context       │ L5 Session  │ session context
  │ L4 TCP      │ adds seq+ports        │ L4 TCP      │ reads seq+ports
  │ L3 IP       │ adds src/dst IP       │ L3 IP       │ reads src/dst IP
  │ L2 Ethernet │ adds src/dst MAC      │ L2 Ethernet │ reads src/dst MAC
  │ L1 Physical │ ─── bits ──────────▶ │ L1 Physical │ receives bits
  └─────────────┘   (across network)   └─────────────┘
  (Data goes DOWN your stack then UP the remote stack)

LOGICAL REALITY (who is communicating with whom):

  Your L7 HTTP  ←──────────────────────────────▶  Remote L7 HTTP
                   "GET /index.html HTTP/1.1"
                   (logically direct, physically via all layers below)

  Your L4 TCP   ←──────────────────────────────▶  Remote L4 TCP
                   "Seq=4001, ACK=1, Port=443"
                   (logically direct, physically via all layers below)

  Your L3 IP    ←──────────────────────────────▶  Remote L3 IP
                   "Src 192.168.1.5, Dst 142.250.182.4, TTL=64"
                   (logically direct, but physically hops through 15 routers)

Each layer only reads its own header.
TCP headers are invisible to IP. IP headers are invisible to TCP.
Ethernet headers are invisible to IP.`}
      </CodeBlock>

      <H2>Why This Abstraction Is Powerful</H2>
      <Para>
        Because each layer only talks to its peer, layers are completely independent.
        Your HTTP code does not know whether TCP is carrying it over a cable or satellite link.
        Your TCP code does not know whether the underlying IP packets are fragmented by an intermediate router.
        Your IP code does not know whether the frame below it is Ethernet or Wi-Fi.
        Each layer presents a clean service to the layer above and consumes a clean service from the layer below.
        This is what makes it possible to swap Wi-Fi for Ethernet, IPv4 for IPv6, or TCP for QUIC —
        without touching any of the other layers.
      </Para>

      <WowBox emoji="🧠" title="The Hidden Communication in Every Packet">
        When Wireshark shows you a captured packet, you are seeing all of these "private conversations" layered inside each other simultaneously: the Ethernet frame talks to the next switch port, the IP packet talks to the destination IP across the internet, the TCP segment talks to the remote TCP stack about sequencing and flow control, and the HTTP request talks to the web application. All of these communications are happening in one 1,500-byte frame. That is what makes network debugging both fascinating and complex.
      </WowBox>

      <Divider />

      {/* ── SAPs Chapter ── */}
      <Chapter
        n="15"
        title="Service Access Points — The Keys That Unlock the Next Layer"
        subtitle="Every layer contains a field that answers: 'which protocol on the layer above should receive this data?' Without this field, demultiplexing would be impossible — your IP stack and ARP would both receive every Ethernet frame with no way to distinguish them."
      />

      <Para>
        A <Accent>Service Access Point (SAP)</Accent> is a field in a layer's header that identifies which
        higher-layer protocol should receive the data when it is decapsulated.
        It is the multiplexing and demultiplexing mechanism that allows multiple protocols to coexist
        at the same layer simultaneously. Three SAPs exist in the standard networking stack:
      </Para>

      <CodeBlock title="The three Service Access Points in the standard networking stack">
{`LAYER 2 SAP: EtherType (2 bytes in Ethernet header)
  ┌─────────┬─────────┬───────────┬─────────────────┐
  │ Dst MAC │ Src MAC │ EtherType │     Payload      │
  └─────────┴─────────┴───────────┴─────────────────┘
                           ↑
                     This 2-byte field tells L2:
                     "which L3 protocol is inside?"
  ┌──────────┬─────────────────────────────────────────┐
  │ 0x0800   │ IPv4 → hand payload to IPv4 stack       │
  │ 0x86DD   │ IPv6 → hand payload to IPv6 stack       │
  │ 0x0806   │ ARP  → hand payload to ARP processor    │
  │ 0x8100   │ 802.1Q VLAN tag → read VLAN ID, then    │
  │          │        look at next EtherType           │
  │ 0x8847   │ MPLS → MPLS label stack processing      │
  └──────────┴─────────────────────────────────────────┘

LAYER 3 SAP: IP Protocol Number (1 byte in IP header)
  ┌──────────┬──────┬─────────────────────────────────┐
  │ IP Header│ Prot │           Payload               │
  └──────────┴──────┴─────────────────────────────────┘
                  ↑
            This 1-byte field tells L3:
            "which L4 protocol is inside?"
  ┌──────┬──────────────────────────────────────────────┐
  │   1  │ ICMP  → ping, traceroute, error messages     │
  │   6  │ TCP   → reliable, ordered stream delivery    │
  │  17  │ UDP   → fast, connectionless delivery        │
  │  41  │ IPv6  → IPv6-in-IPv4 tunneling               │
  │  47  │ GRE   → Generic Routing Encapsulation (VPN)  │
  │  50  │ ESP   → IPSec Encapsulating Security Payload │
  │  58  │ ICMPv6 → IPv6 version of ICMP               │
  │  89  │ OSPF  → runs directly over IP, no TCP/UDP   │
  └──────┴──────────────────────────────────────────────┘

LAYER 4 SAP: Port Number (2 bytes in TCP/UDP header)
  ┌───────────┬──────────┬─────────────────────────────┐
  │ TCP Header│ Dst Port │        Payload              │
  └───────────┴──────────┴─────────────────────────────┘
                     ↑
               Destination port tells L4:
               "which application/process gets this data?"
  ┌──────┬──────────────────────────────────────────────┐
  │   22 │ SSH daemon → encrypted terminal session      │
  │   53 │ DNS resolver → name lookups                  │
  │   80 │ HTTP server → web requests (unencrypted)     │
  │  443 │ HTTPS/TLS server → encrypted web requests    │
  │ 5432 │ PostgreSQL → database queries                │
  └──────┴──────────────────────────────────────────────┘`}
      </CodeBlock>

      <Para>
        These three SAPs form a chain of demultiplexing: the Ethernet frame's EtherType unlocks the right
        IP handler → the IP header's Protocol Number unlocks the right TCP/UDP handler → the TCP/UDP
        destination port unlocks the right application. Remove any one of these fields and the entire
        stack collapses — every layer would receive every frame with no way to know what to do with it.
      </Para>

      <Err title="Confusing port 80 and port 443 as the only thing that identifies HTTPS">
        The port number (443) is the Layer 4 SAP that routes the data to the correct process. But what makes it HTTPS vs plain HTTP is the TLS handshake that happens at Layer 6 — not the port number itself. Port 443 is just a convention. You can run HTTPS on port 8443. You can run plain HTTP on port 443 (though browsers will warn). The port identifies the process; the protocol spoken on that port is determined by the application agreement. This matters when debugging: "I changed the port and it stopped working" is a routing problem (port filtering); "I changed the port and it works but is broken" is a protocol mismatch.
      </Err>

      <Divider />

      {/* ── Chapter 16 ── */}
      <Chapter
        n="16"
        title="Encapsulation — Wrapping Data in Seven Envelopes"
        subtitle="As your data travels down the OSI stack on the sending side, each layer wraps it in its own header. On the receiving side, each layer unwraps it."
      />

      <StoryBox>
        <p>Think of sending a birthday gift internationally. You write a card (application data). You wrap it in tissue paper with instructions in the recipient's language (presentation). You put it in a gift box with a ribbon (session). You pack it in a shipping box with a tracking number (transport). You add a customs declaration with origin and destination addresses (network). The courier puts it in a van with a delivery route for the local area (data link). The van drives on roads (physical).</p>
        <p style={{ margin: '12px 0 0' }}>At the destination, each layer is removed in reverse — the driver delivers the van (physical), the local address is read (data link), customs processes the international address (network), the tracking number confirms delivery (transport), the gift box is opened (session), the tissue paper instructions are read (presentation), and finally the gift and card are revealed (application).</p>
      </StoryBox>

      <Para>
        This process of adding headers as data travels down the stack is called <Accent>encapsulation</Accent>.
        The reverse process — removing headers as data travels up the stack on the receiving side —
        is called <Accent>decapsulation</Accent> (or de-encapsulation).
        Each layer only cares about its own header — it treats everything from the layer above as opaque payload.
      </Para>

      <EncapsulationVisualizer />

      <H2>PDU Names — Each Layer Has Its Own Term</H2>
      <Para>
        Networking engineers use specific terms for data at each layer.
        Using the wrong term in an interview or incident call signals that you're guessing:
      </Para>

      <CodeBlock title="PDU (Protocol Data Unit) names by layer">
{`Layer 7 (Application):  Data         — the actual application payload (HTTP request body, etc.)
Layer 6 (Presentation): Data         — same, after encoding/encryption/compression
Layer 5 (Session):      Data         — same, managed within a session context
Layer 4 (Transport):    Segment      (TCP) or Datagram (UDP)
Layer 3 (Network):      Packet       — IP packet with source/destination IP
Layer 2 (Data Link):    Frame        — Ethernet frame with source/destination MAC
Layer 1 (Physical):     Bit          — raw binary being transmitted as a signal`}
      </CodeBlock>

      <Para>
        In conversation: "There's a routing issue" = Layer 3 problem.
        "The frame is being dropped" = Layer 2 problem.
        "The segment was retransmitted" = Layer 4 TCP issue.
        Precision in language is precision in thinking.
      </Para>

      <Divider />

      {/* ── Error Detection vs Correction Chapter ── */}
      <Chapter
        n="17"
        title="Error Detection vs Error Correction — How the Stack Handles Corruption"
        subtitle="The physical world is noisy. Bits flip. Signals degrade. The OSI model has a two-level system for handling this: detect corruption at Layer 2, recover from loss at Layer 4."
      />

      <StoryBox>
        <p>A cosmic ray hits a wire. One bit in a TCP segment flips from 0 to 1. Your laptop receives what looks like a valid packet — same IP addresses, same port numbers — but the data inside is corrupted. Without any protection, your browser would render a garbled web page. With the OSI error-handling system, the corrupted frame is silently discarded at Layer 2, the missing data is detected at Layer 4, and TCP automatically retransmits the exact bytes that were lost. Your application never sees a corrupt byte.</p>
      </StoryBox>

      <H2>Layer 2 — Error Detection via CRC</H2>
      <Para>
        Every Ethernet frame ends with a 4-byte <Accent>CRC (Cyclic Redundancy Check)</Accent> trailer.
        The sender runs a polynomial division over the entire frame content and appends the 32-bit remainder.
        The receiver performs the same calculation over the received data and compares results.
        If they match: frame is good, CRC trailer is stripped, payload is passed up.
        If they don't match: <strong>the frame is silently dropped</strong>. No error message is sent.
        No notification to the sender. The corrupted frame simply disappears.
      </Para>

      <CodeBlock title="How CRC works — and what happens when it fails">
{`SENDER (your NIC):
  Frame content = [Ethernet header] + [IP packet] + [TCP segment] + [HTTP data]
  CRC = polynomial_division(frame_content)   → e.g., 0xA4F2E391
  Append CRC to end of frame.
  Transmit on wire.

RECEIVER (switch or NIC):
  Frame arrives. CRC = polynomial_division(received_content) = 0xA4F2E391 ?
    MATCH   → CRC correct. Strip trailer. Pass payload up to Layer 3.
    MISMATCH → CRC error. SILENTLY DROP FRAME. No retry. No notification.
               Update FCS Error counter (visible via ethtool / SNMP).

WHO FIXES THE LOSS?
  Layer 2 does NOT retry. It is a detection-only mechanism.
  The frame is gone. If it was carrying a TCP segment, that segment is lost.
  TCP at Layer 4 will detect the loss (no ACK received) and retransmit.

CHECKING FOR CRC ERRORS:
  ethtool -S eth0 | grep -i error
  # Look for: rx_frame_errors, rx_crc_errors, rx_dropped
  # High CRC error rate → bad cable, dirty fiber connector, EMI interference`}
      </CodeBlock>

      <H2>Layer 4 — Error Correction via TCP Retransmission</H2>
      <Para>
        TCP provides <Accent>error correction</Accent> — not just detection. It does this by numbering
        every byte it sends and requiring acknowledgement of every byte received.
        If a segment is not acknowledged within the <Accent>Retransmission Timeout (RTO)</Accent>,
        TCP retransmits. If three duplicate ACKs arrive (signaling a gap in received segments),
        TCP immediately retransmits without waiting for the timeout — this is <Accent>fast retransmit</Accent>.
      </Para>

      <CodeBlock title="TCP error correction — the full mechanism">
{`TCP SEQUENCE NUMBERS — every byte is numbered:
  Segment 1: carries bytes    1–1460  (Seq=1,    Len=1460)
  Segment 2: carries bytes 1461–2920  (Seq=1461, Len=1460)
  Segment 3: carries bytes 2921–4380  (Seq=2921, Len=1460)

ACKNOWLEDGEMENTS — receiver tells sender what it has received:
  After receiving segment 1: sends ACK=1461  ("I have bytes 1–1460, send from 1461 next")
  After receiving segment 2: sends ACK=2921
  After receiving segment 3: sends ACK=4381

LOST SEGMENT SCENARIO:
  Segment 2 (bytes 1461–2920) is lost (CRC error at L2 → dropped at switch).

  Receiver gets:   Segment 1 (OK) → ACK=1461
  Receiver gets:   Segment 3 (out of order) → ACK=1461 (duplicate! "I still need 1461")
  Receiver gets:   Segment 4 (out of order) → ACK=1461 (second duplicate)
  Receiver gets:   Segment 5 (out of order) → ACK=1461 (third duplicate)

  After 3 duplicate ACKs → FAST RETRANSMIT: sender immediately resends segment 2.
  OR: if no ACKs arrive → RTO expires → sender retransmits segment 2.

  Receiver reassembles 1,2,3,4,5 in order. Delivers perfect byte stream to L5+.
  Application never knew anything was lost.

UDP has NO ERROR CORRECTION:
  UDP has a checksum (error detection) but no sequence numbers or retransmission.
  A lost UDP datagram is simply gone. The application must handle it, or accept the loss.`}
      </CodeBlock>

      <H2>The Full Picture — How L2 and L4 Work Together</H2>
      <Para>
        The two systems are complementary. CRC at Layer 2 catches corruption immediately at the local link
        (fast, no overhead, no state). TCP at Layer 4 catches the loss end-to-end (reliable, but adds RTT).
        Together they provide reliable delivery over an unreliable physical medium:
        corrupt frames are caught at L2 and dropped, the resulting packet loss is detected at L4,
        TCP retransmits the missing data, and the application receives a perfect, ordered byte stream.
      </Para>

      <Warn title="UDP applications must handle their own error correction (or not at all)">
        Since UDP has no retransmission, UDP-based applications must decide: does a lost packet matter? DNS queries: just resend the request if no answer arrives in 500ms. Video calls: skip the lost frame (better than a stutter). Online gaming: accept some packet loss, extrapolate player position. HTTP/3 (QUIC): implements its own reliability over UDP — essentially rebuilding TCP inside the application protocol. Knowing this helps you debug: a "choppy video call" is UDP packet loss. A "stuck download" is TCP waiting to retransmit or retransmission being blocked by a firewall.
      </Warn>

      <Divider />

      {/* ── OSI vs TCP/IP Chapter ── */}
      <Chapter
        n="18"
        title="OSI vs TCP/IP — The History, the Differences, and Why TCP/IP Won"
        subtitle="OSI is the model engineers use to think. TCP/IP is the model the internet actually runs on. Understanding why they are different — and why OSI lost as an implementation standard — is essential context for everything else in networking."
      />

      <StoryBox>
        <p>1983: The ARPANET — the precursor to the internet — switches to TCP/IP. Thousands of research institutions are now running it. The protocol works. It is proven in production. The same year, ISO is still finalising the OSI model in committees, and it won't be published until 1984.</p>
        <p style={{ margin: '12px 0 0' }}>By the time OSI was ready, TCP/IP had already won. The United States Department of Defense mandated TCP/IP for all military networks in 1988. The commercial internet exploded through the early 1990s on TCP/IP infrastructure. OSI was relegated to academic specification — the most comprehensive description of how networking <em>should</em> work, on a network that had already committed to something simpler.</p>
      </StoryBox>

      <H2>The Model Comparison</H2>

      <CodeBlock title="OSI (7 layers) vs TCP/IP (4 layers) — direct mapping">
{`OSI Model                          TCP/IP Model
┌────────────────────────┐          ┌────────────────────────┐
│ 7. Application         │          │                        │
│ 6. Presentation        │  ──────▶ │  Application           │
│ 5. Session             │          │  (HTTP, DNS, SMTP, SSH) │
├────────────────────────┤          ├────────────────────────┤
│ 4. Transport           │  ──────▶ │  Transport             │
│    (TCP, UDP)          │          │  (TCP, UDP)            │
├────────────────────────┤          ├────────────────────────┤
│ 3. Network             │  ──────▶ │  Internet              │
│    (IP, ICMP, OSPF)    │          │  (IP, ICMP, OSPF, BGP) │
├────────────────────────┤          ├────────────────────────┤
│ 2. Data Link           │          │                        │
│    (Ethernet, Wi-Fi)   │  ──────▶ │  Network Access (Link) │
│ 1. Physical            │          │  (Ethernet, Wi-Fi, DSL)│
│    (cables, signals)   │          │                        │
└────────────────────────┘          └────────────────────────┘

KEY DIFFERENCES:
  TCP/IP has NO dedicated Session layer  → session management is the application's job
  TCP/IP has NO dedicated Presentation layer → encoding/encryption is the application's job
  TCP/IP's Application layer = OSI's layers 5 + 6 + 7 combined`}
      </CodeBlock>

      <H2>Why TCP/IP Has No Session or Presentation Layer</H2>
      <Para>
        The TCP/IP designers believed that only network-level functions (routing, addressing, reliable transport)
        need universal standardisation. Session management and data presentation are <em>application-specific</em>:
      </Para>
      <Para>
        HTTP/1.1 is stateless (no persistent session). HTTP/2 multiplexes streams. WebSockets maintain
        persistent bidirectional sessions. SSH has named channels. Each application has completely different
        session semantics. Building one universal Session layer would force every application into one model.
        Similarly, presentation encoding varies by application — JSON, Protocol Buffers, ASN.1, CBOR —
        the right choice depends on the use case, not the protocol. The TCP/IP model acknowledges this
        by saying: <em>"above Transport, you're on your own."</em>
      </Para>

      <H2>Why OSI Lost (as an Implementation Standard)</H2>
      <Para>
        Five reasons TCP/IP won, and OSI failed to displace it:
      </Para>

      <CodeBlock title="Why TCP/IP won over OSI">
{`1. ALREADY DEPLOYED:
   TCP/IP was running on ARPANET since 1983. OSI was not published until 1984.
   Moving to OSI would have required replacing working infrastructure.

2. SIMPLER TO IMPLEMENT:
   TCP/IP's 4-layer model is easier to implement than OSI's 7 distinct layers.
   The OSI protocol suite (X.25, TP4, CLNP) was complex and expensive to implement.
   TCP/IP was designed by engineers solving real problems; OSI by committees solving
   theoretical problems.

3. FREE AND OPEN:
   TCP/IP RFCs (Request for Comments) were freely available.
   Anyone could download the spec and implement it.
   OSI standards were sold by ISO — expensive, and harder to access.

4. US GOVERNMENT MANDATE (1988):
   DoD mandated TCP/IP for all military networking.
   This drove massive adoption across US government, academia, and contractors.

5. THE INTERNET HAPPENED:
   The commercial internet (1991–1995) exploded on TCP/IP.
   Millions of users, billions of dollars in infrastructure.
   No economic incentive to rebuild it all on OSI.

IRONY: OSI as a conceptual model survived and thrived, even as OSI as an
implementation standard died. Every network engineer learns the 7-layer
OSI model today — even though the internet runs 4-layer TCP/IP.`}
      </CodeBlock>

      <H2>Why OSI Won (as a Conceptual and Teaching Model)</H2>
      <Para>
        The 7-layer granularity of OSI is more useful for thinking, troubleshooting, and designing networks
        than TCP/IP's 4-layer model. When debugging, "is this a Layer 2 problem or a Layer 3 problem?"
        is far more precise than "is this a Link problem or an Internet problem?"
        The OSI model gives engineers a shared vocabulary with seven distinct categories of failure,
        seven distinct layers of security controls, seven distinct places to look when diagnosing.
        TCP/IP describes what runs on the wire. OSI describes how to think about what runs on the wire.
        Both are essential.
      </Para>

      <Divider />

      {/* ── HTTP Walkthrough ── */}
      <Chapter
        n="19"
        title="A Complete HTTP Request — Through All 7 Layers"
        subtitle="You type 'google.com' and press Enter. Here is exactly what happens at every single layer, in order."
      />

      <Para>
        Understanding each layer in isolation is step one. Seeing them work together is step two —
        and this is where everything clicks.
      </Para>

      <CodeBlock title="Complete layer-by-layer breakdown: HTTP request to google.com">
{`Layer 7 — Application:
  Browser creates: "GET / HTTP/1.1\r\nHost: google.com\r\nAccept: text/html\r\n\r\n"
  This is the application data — what you actually want to say to Google.

Layer 6 — Presentation:
  TLS encrypts the HTTP request using AES-256-GCM with the session key.
  The browser also compresses using gzip if server supports it.
  Result: encrypted, unreadable blob passed to Layer 5.

Layer 5 — Session:
  The existing TLS session (established during the TLS handshake) is used.
  Session record type = 0x17 (Application Data).
  The session layer ensures this data is part of the right ongoing conversation.

Layer 4 — Transport:
  TCP segment added: Src Port 54321, Dst Port 443, Seq=4001, Flags=PSH|ACK.
  The PSH flag tells the receiver to push data to the application immediately.

Layer 3 — Network:
  IP header added: Src IP 192.168.1.5, Dst IP 142.250.182.4, TTL=64, Protocol=6 (TCP).
  Your OS looks up 142.250.182.4 in the routing table → sends to 192.168.1.1 (router).

Layer 2 — Data Link:
  Ethernet frame: Dst MAC = router's MAC (B8:E8:56:44:55:66, from ARP cache),
                  Src MAC = your NIC (A4:C3:F0:11:22:33), EtherType=0x0800.
  CRC appended. Frame sent to the switch.

Layer 1 — Physical:
  Frame converted to electrical signals on Cat6 cable at 1 Gbps.
  Switch receives, reads Dst MAC, forwards out the port connected to your router.
  At router: L1 receives bits → L2 strips Ethernet frame → L3 reads IP packet →
  Router builds new Ethernet frame to next hop and transmits on WAN interface.`}
      </CodeBlock>

      <Para>
        The same process happens in reverse at Google's server — bits arrive, frames are assembled,
        IP packets are extracted, TCP segments are ordered, TLS decrypts, HTTP parses the request,
        the application code handles it, and the response starts the same journey back in the opposite direction.
      </Para>

      <Divider />

      {/* ── Chapter 12 ── */}
      <Chapter
        n="12"
        title="OSI as a Troubleshooting Framework"
        subtitle="The most powerful use of the OSI model isn't explaining networking — it's diagnosing broken networking."
      />

      <StoryBox>
        <p>Every experienced network engineer follows the same mental algorithm when something breaks: start at Layer 1 and work up. Can the cable carry a signal? (L1) Can the switch see the device's MAC? (L2) Can the device get an IP and reach the gateway? (L3) Is the port open and reachable? (L4) Is the DNS resolving? (L7) Each question eliminates an entire layer. By Layer 4, you've usually found the problem.</p>
      </StoryBox>

      <Para>
        The OSI model is not just academic. It is the fastest debugging algorithm available for network issues:
      </Para>

      <CodeBlock title="The OSI troubleshooting checklist">
{`L1 — Physical:  Is the link light on? Is the cable plugged in?
                ethtool eth0 → "Link detected: yes"? Speed correct?

L2 — Data Link: Does the device have a MAC address? Is ARP working?
                arp -a | ip neigh → can you see the gateway's MAC?

L3 — Network:   Does the device have an IP address?
                ip addr → not 169.254.x.x (APIPA = DHCP failed)
                ping 192.168.1.1 (gateway) → if this fails, routing is broken locally
                ping 8.8.8.8 → if this fails, can't reach internet

L4 — Transport: Is the destination port open and accepting connections?
                telnet host 443 → "Connected to host" means L4 works
                nmap -sT host -p 443

L7 — Application: Is DNS working? Is the service responding to the protocol?
                nslookup google.com → returns an IP = DNS works
                curl -v https://google.com → TLS handshake + HTTP response`}
      </CodeBlock>

      <OSITroubleshooter />

      <Divider />

      {/* ── Chapter 13 ── */}
      <Chapter
        n="13"
        title="Common Misconceptions That Will Get You in Trouble"
        subtitle="These are the beliefs that sound right, feel right, and will get you fired if you act on them."
      />

      <Err title="The OSI model is how the internet actually works">
        The OSI model is a conceptual framework — a tool for thinking, not an implementation specification. The internet runs on the TCP/IP model, which has four layers (Link, Internet, Transport, Application) — not seven. TCP/IP doesn't have Session or Presentation layers as distinct concepts. When you're troubleshooting, think in OSI layers. When you're implementing protocols, think in TCP/IP. The OSI model helps you reason about problems; TCP/IP describes what's actually running on the wire.
      </Err>

      <Err title="TLS is a Layer 7 protocol because it goes in the application">
        TLS is generally mapped to Layer 5 (Session — establishes and manages the secure session) and Layer 6 (Presentation — encrypts and decrypts data). It sits between the transport layer (TCP) and the application layer (HTTP). When people say "HTTPS is HTTP over TLS," TLS is doing the Layer 6 encryption work and HTTP is doing the Layer 7 application work. Knowing this matters during system design interviews and when debugging TLS certificate errors — the error is at L6, not L7.
      </Err>

      <Err title="Layer 3 switches are the same as routers">
        A Layer 3 switch has routing capability added to a switch — it can route between VLANs at wire speed using hardware ASICs. A router is purpose-built for routing across multiple external networks, running routing protocols (OSPF, BGP), handling NAT, firewall features, and WAN connections. In a datacenter, a Layer 3 switch handles inter-VLAN routing at 40–400 Gbps. At the edge connecting to the ISP, you need a router. The distinction matters when designing network topology — use the right tool for the right job.
      </Err>

      <Err title="Firewalls operate at one specific OSI layer">
        Firewalls span multiple layers. A stateless ACL (Access Control List) firewall operates at Layer 3 (IP addresses) and Layer 4 (ports). A stateful firewall adds Layer 4 connection tracking (is this packet part of an established connection?). A Next-Generation Firewall (NGFW) operates all the way up to Layer 7 — it can identify applications (Zoom vs Netflix vs Dropbox) regardless of port number, inspect encrypted traffic (with TLS inspection), and make decisions based on application behavior. Saying "firewalls work at Layer 4" is only true for the simplest firewalls.
      </Err>

      <Err title="The Physical layer doesn't matter anymore — it's all abstracted away">
        Physical layer failures are responsible for a huge proportion of real-world network outages. A bent fiber connector (APC vs UPC mismatch), a bad cable with a marginal CRC error rate, a NIC negotiating half-duplex instead of full, electromagnetic interference causing bit errors — these cause intermittent failures that are almost impossible to diagnose if you don't understand Layer 1. Every senior network engineer has a story about spending days debugging a "mysterious" network issue that turned out to be a $3 cable.
      </Err>

      <Divider />

      {/* ── Chapter 14 ── */}
      <Chapter
        n="14"
        title="Interview Questions — Test Your Understanding"
        subtitle="From first-job interviews to staff-engineer panels. Each question reveals a deeper layer of understanding."
      />

      <IQ q="What are the seven layers of the OSI model, and what does each do?" level="Beginner">
        From Layer 1 to Layer 7: <strong>Physical</strong> (transmits raw bits over cables/radio), <strong>Data Link</strong> (MAC addressing, Ethernet frames, switches), <strong>Network</strong> (IP addressing, routing between networks), <strong>Transport</strong> (TCP/UDP, ports, end-to-end delivery), <strong>Session</strong> (session establishment, synchronisation), <strong>Presentation</strong> (encryption, encoding, compression), <strong>Application</strong> (HTTP, DNS, SMTP, SSH — what applications actually use). Mnemonic: "Please Do Not Throw Sausage Pizza Away" (L1→L7).
      </IQ>

      <IQ q="What is the difference between Layer 2 and Layer 3 addressing?" level="Beginner">
        <strong>Layer 2</strong> uses MAC addresses — 48-bit hardware addresses burned into the NIC at manufacture (e.g., <code>A4:C3:F0:11:22:33</code>). MAC addresses are flat (no hierarchy) and only used within a single network segment. They change at every router hop — the router strips the incoming frame and builds a new one with its own MAC. <strong>Layer 3</strong> uses IP addresses — 32-bit logical addresses (IPv4) or 128-bit (IPv6) assigned by administrators. IP addresses are hierarchical (network + host) and remain unchanged end-to-end across the entire internet (unless NAT rewrites them).
      </IQ>

      <IQ q="Why does encapsulation happen? Why not just send the data directly?" level="Intermediate">
        Encapsulation solves the problem of layered abstraction: each layer needs to attach its own control information without knowing or modifying what the layers above or below are doing. TCP needs to add port numbers and sequence numbers without knowing whether the application above is HTTP or SSH. IP needs to add source/destination addresses without knowing whether the transport below is TCP or UDP. Ethernet needs to add MAC addresses without caring about any of the higher-layer content. By treating the data from the layer above as opaque payload and adding its own header, each layer maintains independence and replaceability. You can swap TCP for QUIC, or Ethernet for Wi-Fi, without touching any other layer.
      </IQ>

      <IQ q="What happens at each OSI layer when you run traceroute?" level="Intermediate">
        Traceroute exploits the TTL field at <strong>Layer 3</strong>. It sends UDP (or ICMP) packets with TTL=1 first — the first router decrements TTL to 0 and sends back an <strong>ICMP Time Exceeded</strong> message (also Layer 3), revealing its IP address. Then TTL=2 — reaches the second router. And so on. The ICMP replies at Layer 3 tell you the path. At Layer 4, traceroute uses UDP (Linux default, port 33434+) or ICMP Echo (Windows). Some firewalls block UDP but allow ICMP, causing hops to appear as * (timeouts). The technique exploits Layer 3's TTL mechanism to build a Layer 3 path map without any special access to intermediate routers.
      </IQ>

      <IQ q="How does a Layer 3 switch differ from a router, and when would you use each?" level="Senior">
        A <strong>Layer 3 switch</strong> performs inter-VLAN routing in hardware (using ASICs) at near line-rate. It is optimised for high-throughput routing within a datacenter or campus — forwarding millions of packets per second between VLANs. It typically lacks WAN interfaces, advanced routing protocols (BGP), NAT, stateful firewall features, and QoS policies. A <strong>router</strong> is optimised for connectivity between disparate networks — ISP connectivity, BGP peering, NAT for internet sharing, VPN termination, firewall policy enforcement. Use a Layer 3 switch for the distribution and core layers of your internal network. Use a router at the edge where you connect to external networks or need advanced traffic policy.
      </IQ>

      <IQ q="At which OSI layers does a stateful firewall operate, and what is the difference between stateful and stateless inspection?" level="Senior">
        A <strong>stateless firewall</strong> operates at Layers 3 and 4 — it examines each packet independently: source IP, destination IP, protocol, source port, destination port. No memory of previous packets. An ACL rule like "permit tcp any host 10.0.0.1 eq 443" is stateless. A <strong>stateful firewall</strong> adds a connection state table — it tracks which TCP connections are in the SYN/ESTABLISHED/FIN state and allows reply traffic automatically without needing explicit inbound rules. For example: if you initiate a TCP connection outbound, the stateful table records the 5-tuple, and the firewall allows the server's SYN-ACK back in automatically. Stateless firewalls require symmetric rules (allow outbound AND allow inbound reply). Stateful firewalls allow only the initiating direction, which is more secure. NGFW adds Layer 7 — application identification and user-based policies.
      </IQ>

      <IQ q="Explain how the OSI model maps to the TCP/IP model, and why TCP/IP doesn't have a Session or Presentation layer." level="PhD">
        The TCP/IP model (RFC 1122) has four layers: Link, Internet, Transport, Application. OSI layers 5 (Session), 6 (Presentation), and 7 (Application) collapse into one TCP/IP "Application" layer. This is not an oversight — it is a deliberate design philosophy. The OSI model (ISO 7498) was designed top-down by committee to be comprehensive and transport-agnostic. TCP/IP evolved bottom-up from ARPANET engineering practice. The designers of TCP/IP believed that session management and data presentation are application responsibilities, not protocol responsibilities. Different applications have wildly different session semantics: HTTP/1.1 is stateless (no session), HTTP/2 has stream multiplexing, WebSockets have persistent bidirectional sessions, SSH has channels. Building a universal Session layer would have forced every application into one session model. Similarly, presentation is application-specific: JSON, Protocol Buffers, CBOR, ASN.1 — each application chooses its own encoding. The TCP/IP model acknowledges that only network-level functions (routing, addressing, reliable transport) need standardisation across all applications. This pragmatism is why TCP/IP won and OSI lost as an implementation standard, despite OSI winning as the conceptual model for teaching and troubleshooting.
      </IQ>

      <Divider />

      {/* ── Chapter 13.5 — OSI in the Cloud Era ── */}
      <Chapter
        n="13"
        title="OSI in the Cloud Era — AWS, GCP, and Kubernetes"
        subtitle="Cloud infrastructure maps directly to OSI layers. Understanding which layer a cloud service operates at tells you exactly how to configure it, secure it, and troubleshoot it."
      />

      <StoryBox>
        <p>A startup deploys their app on AWS. They have an EC2 instance, a load balancer, a security group, and a VPC. An engineer on the team asks: "Why does my security group rule allow port 443 but traffic is still blocked?" Another engineer opens the AWS console and sees the Network ACL is also blocking the subnet. Two different firewall systems, at two different OSI layers, both need to allow the traffic. Understanding OSI instantly explains the problem.</p>
      </StoryBox>

      <H2>Virtual Private Cloud (VPC) — Layer 3</H2>
      <Para>
        AWS VPC is a Layer 3 construct. When you create a VPC with CIDR <Code>10.0.0.0/16</Code> and
        subnets <Code>10.0.1.0/24</Code> (public) and <Code>10.0.2.0/24</Code> (private),
        you are defining Layer 3 IP address spaces. The Internet Gateway, NAT Gateway, and Route Tables
        are all Layer 3 routing decisions. VPC Peering connects two VPC Layer 3 networks.
        AWS Transit Gateway is a managed Layer 3 hub — the cloud equivalent of DMVPN.
      </Para>

      <H2>Security Groups vs Network ACLs — L4 vs L3+L4</H2>
      <Para>
        <Accent>Security Groups</Accent> operate at Layer 4 and are stateful — allow outbound TCP 443
        and the inbound reply is automatically allowed. They are attached to ENIs (Elastic Network Interfaces)
        and evaluate rules before traffic reaches your instance.
        <Accent>Network ACLs</Accent> operate at Layer 3/4 and are stateless — every rule must be explicit.
        Allow outbound TCP 443, AND also allow inbound TCP ephemeral ports (1024–65535) for the reply.
        They are attached to subnets and evaluated in order by rule number.
        Traffic passes through the Network ACL first, then the Security Group.
        Both need to permit traffic for it to flow.
      </Para>

      <H2>AWS Load Balancers — L4 vs L7</H2>
      <Para>
        AWS offers two types of load balancers that directly map to OSI layers:
        <Accent>Network Load Balancer (NLB)</Accent> operates at Layer 4.
        It routes based on TCP/UDP port and IP address. It does not inspect the payload.
        It preserves the client's source IP. It handles millions of requests per second with ultra-low latency.
        Use NLB for TCP-based applications, gaming, VoIP, where raw throughput matters.
      </Para>
      <Para>
        <Accent>Application Load Balancer (ALB)</Accent> operates at Layer 7.
        It terminates TLS (Layer 6), reads HTTP headers, routes based on URL path, hostname, query parameters,
        or HTTP method. It can redirect <Code>/api/*</Code> to one target group and <Code>/static/*</Code> to another.
        Use ALB for web applications, microservices, REST APIs — anything where you need content-based routing.
      </Para>

      <H2>Kubernetes Networking — All Seven Layers</H2>
      <Para>
        Kubernetes networking touches every OSI layer:
      </Para>
      <CodeBlock title="Kubernetes networking mapped to OSI">
{`Layer 1+2 — Physical/Data Link:
  Node NICs, CNI plugin creates veth pairs connecting pod network namespaces
  to the node's network namespace. Flannel/Calico/Cilium handle L2 within a node.

Layer 3 — Network:
  Each pod gets a unique IP from the pod CIDR (e.g., 10.244.x.x).
  CNI plugin (Calico/Flannel) routes pod-to-pod traffic between nodes.
  VXLAN or BGP overlay ensures pods on different nodes can reach each other.

Layer 4 — Transport:
  Kubernetes Services (ClusterIP) create virtual IPs backed by iptables/IPVS rules.
  kube-proxy programs NAT rules to load-balance TCP/UDP traffic across pod replicas.
  NodePort exposes a service on a static port on every node.

Layer 7 — Application:
  Ingress controllers (nginx, traefik, AWS ALB Ingress) handle HTTP routing.
  Path-based routing: /api → backend pods, / → frontend pods.
  TLS termination at the Ingress — pods receive plaintext HTTP internally.
  Service mesh (Istio) adds mTLS, retries, circuit breaking at L7.`}
      </CodeBlock>

      <H2>Content Delivery Networks (CDNs) — Layer 7 Edge Caching</H2>
      <Para>
        A CDN like Cloudflare or AWS CloudFront operates at Layer 7.
        When a user in Tokyo requests your content, the CDN terminates the TLS connection (L6) at a Tokyo
        edge node, processes the HTTP request (L7), checks the cache, and serves the content locally
        without the packet ever reaching your origin server in Virginia.
        The CDN also provides DDoS protection at Layers 3, 4, and 7 simultaneously —
        absorbing volumetric attacks (L3), SYN floods (L4), and HTTP floods (L7).
      </Para>

      <Warn title="Cloud doesn't abstract away OSI — it exposes it differently">
        New cloud engineers often assume AWS manages all the networking. It doesn't. Every VPC, subnet, security group, NACL, route table, and load balancer rule is a direct expression of OSI layer decisions. When traffic is being mysteriously blocked, the debugging process is identical to physical networking: check the route table (L3), check the security group (L4), check the NACL (L3/L4), check the ALB target health (L7). The layers are the same — only the interface to configure them has changed from a CLI to a web console and Terraform.
      </Warn>

      <Divider />

      {/* ── Security at Every Layer ── */}
      <Chapter
        n="14"
        title="Attacking and Defending Every Layer"
        subtitle="Every OSI layer has its own attack surface. Understanding which layer an attack targets tells you exactly which defence to deploy."
      />

      <StoryBox>
        <p>A security engineer is reviewing an incident. The attacker got in. The question is: where did they get in? The SOC analyst pulls up the logs. ARP poisoning at Layer 2 — the attacker redirected traffic through their machine. Then they captured credentials from an unencrypted HTTP session at Layer 7. Two separate attacks, two separate layers, both needed to succeed.</p>
      </StoryBox>

      <H2>Layer 1 — Physical Attacks</H2>
      <Para>
        Physical attacks are often overlooked in digital security reviews.
        <Accent>Cable tapping:</Accent> copper cables radiate electromagnetic signals that can be captured
        with specialized equipment. Fiber cables are harder to tap but not impossible — a bend tap
        captures a fraction of the light without breaking the connection.
        <Accent>Rogue hardware:</Accent> a malicious USB drive or Ethernet dongle placed in an empty port
        (packet capturing keystroke logging hardware). Physical access to the building is often the most
        overlooked attack vector. Defence: locked server rooms, tamper-evident seals, port security
        to disable unused switch ports, and cable management that makes unauthorised connections obvious.
      </Para>

      <H2>Layer 2 — ARP Poisoning and MAC Flooding</H2>
      <Para>
        <Accent>ARP Poisoning (ARP Spoofing):</Accent> ARP has no authentication. An attacker on the same
        network segment sends gratuitous ARP replies claiming their MAC address is associated with
        the gateway's IP. Victims update their ARP cache and send all traffic to the attacker — classic MITM.
        Defence: Dynamic ARP Inspection (DAI) on managed switches validates ARP packets against
        the DHCP Snooping binding table.
      </Para>
      <Para>
        <Accent>MAC Flooding:</Accent> A switch's CAM table has a fixed size (typically 8,000–16,000 entries).
        An attacker floods the switch with frames containing thousands of fake source MAC addresses,
        filling the CAM table. Once full, the switch fails open and floods all frames to all ports —
        turning back into a hub. Every device on the switch can now capture every other device's traffic.
        Defence: Port security limits the number of MACs per switch port.
      </Para>

      <H2>Layer 3 — IP Spoofing and BGP Hijacking</H2>
      <Para>
        <Accent>IP Spoofing:</Accent> An attacker crafts packets with a forged source IP address.
        Used in amplification DDoS attacks: send a DNS or NTP request with the victim's IP as source —
        the server sends a large response to the victim. Defence: BCP38 (ingress filtering)
        instructs ISPs to drop packets with source IPs outside the range assigned to that customer.
      </Para>
      <Para>
        <Accent>BGP Hijacking:</Accent> BGP, the routing protocol of the internet, has no authentication.
        A malicious or misconfigured AS can announce more-specific routes for IP prefixes it doesn't own.
        Routers prefer more-specific routes, so traffic destined for the victim gets routed to the attacker.
        Used for cryptocurrency theft, email interception, and nation-state surveillance.
        Defence: RPKI (Resource Public Key Infrastructure) cryptographically validates BGP route origins.
        Only ~40% of internet routes are RPKI-validated as of 2026.
      </Para>

      <H2>Layer 4 — SYN Flood</H2>
      <Para>
        A SYN flood exploits the TCP 3-way handshake. The attacker sends thousands of SYN packets with
        spoofed source IPs. The server replies with SYN-ACKs and stores each half-open connection in
        a state table, waiting for the final ACK. The ACK never comes because the source IP is fake.
        The state table fills up; new legitimate connections are rejected.
        Defence: SYN cookies — the server encodes the connection state in the SYN-ACK's sequence number
        instead of storing state, freeing memory while still allowing legitimate connections to complete.
      </Para>

      <H2>Layer 7 — Application Attacks</H2>
      <Para>
        Layer 7 attacks target the application protocol itself.
        <Accent>HTTP Flood:</Accent> Legitimate-looking GET/POST requests at high volume — no packets are malformed,
        so network-layer filters cannot stop them. Requires Layer 7 rate limiting and bot detection.
        <Accent>SQL Injection:</Accent> Malicious SQL code in HTTP request parameters, exploiting Layer 7
        application code that builds database queries from user input.
        <Accent>DNS Poisoning (Kaminsky attack):</Accent> Exploiting DNS (Layer 7) resolver race conditions
        to inject false DNS records, redirecting users to malicious servers.
        Defence: WAF (Web Application Firewall), input validation, DNSSEC, rate limiting.
      </Para>

      <CodeBlock title="Defence mapped to OSI layer">
{`L1 Physical:    Port security, cable locks, server room access control, dark fiber
L2 Data Link:   Dynamic ARP Inspection, 802.1X port authentication, port security, VLANs
L3 Network:     Firewall ACLs, RPKI for BGP, BCP38 ingress filtering, IP reputation lists
L4 Transport:   SYN cookies, stateful inspection, rate limiting per IP, connection timeouts
L5 Session:     Session token rotation, timeout on idle sessions, secure session IDs
L6 Presentation:TLS 1.3, HSTS, certificate pinning, cipher suite hardening
L7 Application: WAF, input validation, authentication, rate limiting, DNSSEC, CSP headers`}
      </CodeBlock>

      <Divider />

      <KeyTakeaways items={[
        "The OSI model has 7 layers: Physical (bits/cables), Data Link (MAC/frames/switches), Network (IP/routing), Transport (TCP/UDP/ports), Session (connection management), Presentation (encryption/encoding), Application (HTTP/DNS/SSH). Mnemonic bottom-to-top: 'All People Seem To Need Data Processing.'",
        "Each layer adds a header going DOWN the sender's stack (encapsulation) and removes it going UP the receiver's stack (decapsulation). Each layer reads ONLY its own header — everything above is opaque payload.",
        "Logical peer-to-peer communication: your TCP talks to the remote TCP, your IP talks to the remote IP — through their headers. Physically, data travels down 7 layers, across the wire, and up 7 layers. Logically, each layer has a direct conversation with its twin.",
        "Service Access Points (SAPs) are the demultiplexing fields: EtherType in the Ethernet header identifies which L3 protocol (0x0800=IPv4, 0x86DD=IPv6, 0x0806=ARP). IP Protocol Number identifies which L4 handler (6=TCP, 17=UDP, 1=ICMP). Port number identifies which application (443=HTTPS, 22=SSH, 53=DNS).",
        "CSMA/CD (Ethernet): listen before transmit, detect collisions, send jam signal, random backoff. Irrelevant on modern full-duplex switched Ethernet — switches give every port its own collision domain. CSMA/CA (Wi-Fi): avoid collisions before transmitting using random backoff and ACKs per frame, because hidden node problem prevents collision detection on radio.",
        "Collision domain: devices that can collide (hubs = 1 domain; switch ports = isolated domains). Broadcast domain: devices that receive a broadcast frame (switches don't separate; routers always do). Each VLAN = its own broadcast domain.",
        "ARP translates IP addresses (L3) to MAC addresses (L2). ARP request = broadcast 'who has 192.168.1.1?'; ARP reply = unicast 'I'm B8:E8:56:44:55:66'. ARP only resolves the NEXT HOP (your router), never the final destination. Gratuitous ARP = unsolicited self-announcement, used by failover clusters and exploited by attackers (ARP poisoning).",
        "MTU (Maximum Transmission Unit): Ethernet MTU = 1,500 bytes → TCP MSS = 1,460 bytes. IPv4 allows routers to fragment oversized packets. IPv6 forbids it (only the sender fragments). Path MTU Discovery (PMTUD) uses ICMP to find the minimum MTU along a path — ICMP blocking causes 'MTU black holes' where large transfers hang silently.",
        "Well-known ports (0–1023): SSH=22, DNS=53, HTTP=80, HTTPS=443, SMTP=25, IMAP=143. Registered ports (1024–49151): PostgreSQL=5432, MySQL=3306, Redis=6379. Ephemeral ports (49152–65535): randomly assigned by OS to clients. The 5-tuple (src IP, src port, dst IP, dst port, protocol) uniquely identifies every TCP connection.",
        "Error detection (L2 CRC): receiver recalculates CRC — mismatch → frame SILENTLY DROPPED, no notification. Error correction (L4 TCP): sequence numbers + ACKs → retransmit on timeout or 3 duplicate ACKs. Together: corrupt frames vanish at L2, TCP detects the loss and retransmits, application receives perfect data.",
        "OSI vs TCP/IP: TCP/IP has 4 layers (Link, Internet, Transport, Application). OSI's L5+L6+L7 collapse into one TCP/IP Application layer. TCP/IP won because it was already deployed in 1983 when OSI was published in 1984. US DoD mandated TCP/IP in 1988. OSI survives as the conceptual/teaching model; TCP/IP is the implementation model.",
        "MAC addresses (Layer 2) are hardware addresses valid only within one network segment — they change at every router hop. IP addresses (Layer 3) are logical and survive end-to-end. ARP is the bridge: it resolves the MAC of the next hop for a given IP.",
        "Troubleshoot OSI bottom-up: L1 (ethtool/link light), L2 (arp -a, CAM table), L3 (ip addr, ping gateway, ping 8.8.8.8), L4 (nc/telnet to port, nmap), L7 (nslookup, curl -v). Each layer you verify eliminates an entire category of failure.",
        "Cloud maps directly to OSI: VPC/subnets/route tables = L3. Security Groups (stateful) and NACLs (stateless) = L3-L4. Network Load Balancer = L4. Application Load Balancer = L7 (reads HTTP headers, terminates TLS). CDNs = L7 edge. Understanding which layer a cloud service operates at tells you exactly how to configure and troubleshoot it.",
      ]} />

    </LearnLayout>
  )
}
