'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const G = '#10b981'
const FONT_MONO = 'var(--font-mono)'
const FONT_DISPLAY = 'var(--font-display)'

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
  const colors: Record<string, string> = { Beginner: '#34d399', Intermediate: '#60a5fa', Senior: '#a78bfa', PhD: '#f472b6' }
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
    protocols: 'HTTP, HTTPS, FTP, SSH, SMTP, IMAP, DNS, SNMP, Telnet',
    devices: 'Hosts, web browsers, email clients, application load balancers (L7 LBs)',
    job: 'The only layer your application code actually touches. Provides network services — file transfer, web browsing, email — directly to user-facing software. Does NOT mean the app itself lives here; it means the interface between network and app lives here.',
    security: 'SQL injection, XSS, credential stuffing, HTTP flood DDoS, DNS poisoning',
    commands: 'curl -v https://example.com   |   nslookup google.com   |   openssl s_client -connect host:443',
    example: 'Your browser sends: GET /index.html HTTP/1.1 — that text IS the L7 PDU.',
  },
  {
    n: 6, name: 'Presentation', color: '#06b6d4', pdu: 'Data',
    protocols: 'TLS/SSL, JPEG, PNG, MP3, MP4, ASCII, UTF-8, Base64, gzip, zlib',
    devices: 'Gateways performing encryption/decryption, media encoders',
    job: 'Translation, encryption, and compression. Converts data between the network format and the application format. If L7 is "what to say", L6 is "what language to say it in". Responsible for ensuring data sent by one system can be read by another regardless of internal representation differences.',
    security: 'SSL stripping (downgrade HTTPS to HTTP), weak cipher negotiation, certificate spoofing',
    commands: 'openssl s_client -connect host:443   |   sslyze --regular host   |   curl -v (shows TLS negotiation)',
    example: 'Your browser receives gzip-compressed HTML — L6 decompresses it before handing to L7. TLS decryption also happens here.',
  },
  {
    n: 5, name: 'Session', color: '#8b5cf6', pdu: 'Data',
    protocols: 'NetBIOS, RPC (Remote Procedure Call), SQL sessions, NFS, PPTP, SIP (partly)',
    devices: 'Application servers, API gateways, unified communications systems',
    job: 'Establishes, manages, and terminates sessions between applications. Provides dialog control (who talks when), synchronisation checkpoints, and session recovery after failure. Think of it as the "conversation manager" — it knows which data belongs to which ongoing conversation.',
    security: 'Session hijacking, session fixation, CSRF (session token theft)',
    commands: 'netstat -an | grep ESTABLISHED   |   ss -tp   |   Check application session logs',
    example: 'A video call synchronises your audio and video streams. If the network glitches, L5 checkpoints let the call resume from the last sync point rather than restarting.',
  },
  {
    n: 4, name: 'Transport', color: '#f97316', pdu: 'Segment (TCP) / Datagram (UDP)',
    protocols: 'TCP, UDP, SCTP, DCCP',
    devices: 'Load balancers (L4), stateful firewalls, NAT gateways',
    job: 'End-to-end delivery between processes. Multiplexes connections using port numbers. TCP provides reliability (sequencing, acknowledgement, retransmission, flow control, congestion control). UDP provides speed without guarantees. This is where your app chooses between "guaranteed delivery" and "fast delivery".',
    security: 'SYN flood, TCP session hijacking, UDP amplification, port scanning',
    commands: 'netstat -tulpn   |   ss -tulpn   |   nmap -sT host   |   tcpdump port 443',
    example: 'Downloading a 100MB file: TCP splits it into ~68,000 segments of 1,460 bytes each, numbers every byte, and retransmits anything lost. Your app receives a perfect stream.',
  },
  {
    n: 3, name: 'Network', color: '#3b82f6', pdu: 'Packet',
    protocols: 'IPv4, IPv6, ICMP, OSPF, BGP, RIP, EIGRP, IPSec',
    devices: 'Routers, Layer-3 switches, firewalls (L3 rules), VPN gateways',
    job: 'Logical addressing (IP addresses) and routing. Determines the path from source to destination across multiple networks. Handles fragmentation when a packet is too large for a link. TTL prevents packets from looping forever. This layer makes the internet possible — it crosses network boundaries.',
    security: 'IP spoofing, BGP hijacking, ICMP tunneling, route injection, TTL manipulation',
    commands: 'ping 8.8.8.8   |   traceroute 8.8.8.8   |   ip route show   |   route print (Windows)',
    example: "Your HTTP request travels from your ISP → 3 transit routers → Google's edge → Google's data center. Each router reads the destination IP and decides the next hop. 13 hops, each a separate routing decision.",
  },
  {
    n: 2, name: 'Data Link', color: '#ef4444', pdu: 'Frame',
    protocols: 'Ethernet (802.3), Wi-Fi (802.11), ARP, PPP, HDLC, 802.1Q (VLANs), MPLS',
    devices: 'Switches, access points, bridges, NICs (the hardware part)',
    job: 'Physical addressing using MAC addresses. Frames data for transmission on a single network segment. Provides error detection via CRC (Cyclic Redundancy Check). Manages access to the physical medium (CSMA/CD for Ethernet, CSMA/CA for Wi-Fi). Delivers frames only to the correct device on the local segment.',
    security: 'ARP poisoning, MAC flooding, VLAN hopping, rogue access points, MAC spoofing',
    commands: 'arp -a   |   ip neigh   |   ip link show   |   Wireshark Ethernet frame dissection',
    example: "Your laptop's NIC builds a frame: Dst MAC = router's MAC (from ARP cache), Src MAC = your NIC's hardware address, EtherType = 0x0800 (IPv4). The switch reads only the dst MAC to forward to the right port.",
  },
  {
    n: 1, name: 'Physical', color: '#94a3b8', pdu: 'Bit',
    protocols: 'IEEE 802.3 (Ethernet signalling), IEEE 802.11 (Wi-Fi radio), DSL, SONET/SDH, USB, Bluetooth PHY',
    devices: 'Cables, hubs, repeaters, modems, NICs (analog/digital interface), fiber transceivers, wireless radios',
    job: 'Transmission of raw bits over a physical medium. Defines voltage levels, cable specifications, connectors, pin layouts, signal encoding (Manchester, 4B/5B, PAM4), bit timing, and data rates. Has zero awareness of what the bits mean — it just moves them.',
    security: 'Physical eavesdropping, cable tapping, signal jamming, optical fiber tapping, hardware keyloggers',
    commands: 'Check link LEDs on NIC/switch   |   ethtool eth0   |   iwconfig   |   cable tester',
    example: 'A Cat6 cable carries your frame as voltage transitions at 250 MHz. A single-mode fiber carries the same data as pulses of 1,310nm laser light at 10 Gbps. Same bits, completely different physics.',
  },
]

function OSIStackExplorer() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 4px' }}>Interactive — OSI Stack Explorer</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 20px' }}>Click any layer to see protocols, devices, security threats, and diagnostic commands.</p>

      {OSI_LAYERS.map((layer, i) => {
        const isOpen = active === i
        return (
          <div key={layer.n} style={{ marginBottom: 6 }}>
            <button
              onClick={() => setActive(isOpen ? null : i)}
              style={{
                width: '100%', textAlign: 'left', padding: '12px 16px',
                background: isOpen ? `${layer.color}20` : `${layer.color}10`,
                border: `1px solid ${isOpen ? layer.color : layer.color + '40'}`,
                borderRadius: isOpen ? '10px 10px 0 0' : 10,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 800, color: layer.color, fontFamily: FONT_MONO, background: `${layer.color}25`, padding: '3px 8px', borderRadius: 5, flexShrink: 0 }}>L{layer.n}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', flex: 1 }}>{layer.name}</span>
              <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO }}>PDU: {layer.pdu}</span>
              <span style={{ fontSize: 12, color: layer.color }}>{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
              <div style={{ background: 'var(--bg)', border: `1px solid ${layer.color}40`, borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '18px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, marginBottom: 14 }}>
                  {[
                    { label: 'Protocols', value: layer.protocols, c: '#60a5fa' },
                    { label: 'Devices', value: layer.devices, c: '#a78bfa' },
                    { label: 'Security Threats', value: layer.security, c: '#ef4444' },
                    { label: 'Diagnostic Commands', value: layer.commands, c: G },
                  ].map(item => (
                    <div key={item.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
                      <p style={{ fontSize: 10, fontWeight: 700, color: item.c, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 6px' }}>{item.label}</p>
                      <p style={{ fontSize: 12.5, color: 'var(--text)', lineHeight: 1.7, margin: 0, fontFamily: item.label === 'Diagnostic Commands' ? FONT_MONO : 'inherit' }}>{item.value}</p>
                    </div>
                  ))}
                </div>
                <div style={{ background: `${layer.color}08`, border: `1px solid ${layer.color}25`, borderRadius: 8, padding: '12px 16px', marginBottom: 10 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: layer.color, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 6px' }}>What it does</p>
                  <p style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{layer.job}</p>
                </div>
                <div style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: 8, padding: '10px 14px' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#fbbf24', fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Real example</p>
                  <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>{layer.example}</p>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Interactive 2: Encapsulation Visualizer ─────────────────────────────────

const ENCAP_STEPS = [
  { layer: 7, name: 'Application', color: '#10b981', header: 'HTTP Request', fields: ['GET /index.html HTTP/1.1', 'Host: google.com', 'User-Agent: Chrome/120', 'Accept: text/html'], label: 'Application data (HTTP)', size: 'variable' },
  { layer: 6, name: 'Presentation', color: '#06b6d4', header: 'TLS Record', fields: ['Content-Type: 23 (Application Data)', 'Version: TLS 1.3', 'Length: 512 bytes', 'Encrypted payload...'], label: '+ TLS encryption wrapper', size: '+5 bytes header' },
  { layer: 5, name: 'Session', color: '#8b5cf6', header: 'Session token', fields: ['Session ID: 0xA3F2...', 'Sequence: 1', 'Context: established'], label: '+ Session context (implicit in TLS)', size: 'embedded in TLS' },
  { layer: 4, name: 'Transport', color: '#f97316', header: 'TCP Segment', fields: ['Src Port: 54321', 'Dst Port: 443', 'Seq: 1001', 'Ack: 0', 'Flags: PSH ACK', 'Window: 65535'], label: '+ TCP header (20 bytes)', size: '+20 bytes' },
  { layer: 3, name: 'Network', color: '#3b82f6', header: 'IP Packet', fields: ['Src IP: 192.168.1.5', 'Dst IP: 142.250.182.4', 'Protocol: 6 (TCP)', 'TTL: 64', 'Header Checksum'], label: '+ IP header (20 bytes)', size: '+20 bytes' },
  { layer: 2, name: 'Data Link', color: '#ef4444', header: 'Ethernet Frame', fields: ['Dst MAC: B8:E8:56:44:55:66', 'Src MAC: A4:C3:F0:11:22:33', 'EtherType: 0x0800 (IPv4)', 'FCS: CRC-32 checksum'], label: '+ Ethernet header + trailer (18 bytes)', size: '+18 bytes' },
  { layer: 1, name: 'Physical', color: '#94a3b8', header: 'Bits on wire', fields: ['10101100 00010001...', '1,500 bytes = 12,000 bits', 'Sent at 1 Gbps = 12 microseconds', 'As voltage transitions / light pulses'], label: '→ Transmitted as electrical/optical signals', size: 'raw bits' },
]

function EncapsulationVisualizer() {
  const [step, setStep] = useState(0)
  const [mode, setMode] = useState<'encap' | 'decap'>('encap')

  const steps = mode === 'encap' ? ENCAP_STEPS : [...ENCAP_STEPS].reverse()
  const current = steps[step]
  const visible = steps.slice(0, step + 1)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 4px' }}>Interactive — Encapsulation Visualizer</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 16px' }}>
        {mode === 'encap' ? 'Watch headers wrap around data as it travels down the sender\'s stack.' : 'Watch headers get stripped as data travels up the receiver\'s stack.'}
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {(['encap', 'decap'] as const).map(m => (
          <button key={m} onClick={() => { setMode(m); setStep(0) }}
            style={{ padding: '8px 18px', borderRadius: 8, border: `1px solid ${mode === m ? G : 'var(--border)'}`, background: mode === m ? `${G}18` : 'var(--bg)', color: mode === m ? G : 'var(--muted)', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: FONT_MONO }}>
            {m === 'encap' ? '↓ Sender (Encapsulate)' : '↑ Receiver (Decapsulate)'}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <p style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 12px' }}>Packet being built</p>
          <div style={{ background: 'var(--bg)', borderRadius: 10, padding: 14, minHeight: 200 }}>
            {visible.map((s, i) => (
              <div key={s.layer} style={{ background: `${s.color}15`, border: `1px solid ${s.color}40`, borderRadius: 6, padding: '7px 12px', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8, opacity: i === visible.length - 1 ? 1 : 0.65 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: s.color, fontFamily: FONT_MONO, background: `${s.color}25`, padding: '2px 6px', borderRadius: 4, flexShrink: 0 }}>L{s.layer}</span>
                <span style={{ fontSize: 12, color: 'var(--text)', fontFamily: FONT_MONO }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 12px' }}>
            Layer {current.layer} — {current.name} header
          </p>
          <div style={{ background: `${current.color}08`, border: `1px solid ${current.color}30`, borderRadius: 10, padding: 14 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: current.color, fontFamily: FONT_MONO, textTransform: 'uppercase', margin: '0 0 10px' }}>{current.header} · {current.size}</p>
            {current.fields.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <span style={{ color: current.color, flexShrink: 0, fontSize: 12 }}>▸</span>
                <code style={{ fontSize: 12, color: 'var(--text)', fontFamily: FONT_MONO, lineHeight: 1.6 }}>{f}</code>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 18, alignItems: 'center' }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
          style={{ padding: '9px 20px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: step === 0 ? 'var(--muted)' : 'var(--text)', fontWeight: 700, fontSize: 13, cursor: step === 0 ? 'default' : 'pointer', fontFamily: FONT_MONO }}>
          ← Back
        </button>
        <div style={{ flex: 1, background: 'var(--bg)', borderRadius: 8, height: 6, overflow: 'hidden' }}>
          <div style={{ width: `${((step + 1) / steps.length) * 100}%`, height: '100%', background: current.color, transition: 'width 0.3s' }} />
        </div>
        <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: FONT_MONO, flexShrink: 0 }}>Step {step + 1} / {steps.length}</span>
        <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1}
          style={{ padding: '9px 20px', borderRadius: 8, border: `1px solid ${current.color}`, background: `${current.color}18`, color: current.color, fontWeight: 700, fontSize: 13, cursor: step === steps.length - 1 ? 'default' : 'pointer', fontFamily: FONT_MONO }}>
          Next →
        </button>
      </div>
    </div>
  )
}

// ─── Interactive 3: OSI Troubleshooting Guide ─────────────────────────────────

const TROUBLE_SCENARIOS = [
  {
    problem: "Can't ping anything",
    layer: 'Layer 1 or 2',
    color: '#94a3b8',
    reason: 'No response to any ping points to a physical or data-link issue — no connectivity at all.',
    steps: [
      { cmd: 'Check cable / Wi-Fi indicator lights on NIC and switch', what: 'L1: Is there a physical link? No link light = cable fault or wrong port.' },
      { cmd: 'ip link show   or   ipconfig /all', what: 'L1/L2: Is the NIC up? Does it have a MAC address? "DOWN" state = driver or hardware issue.' },
      { cmd: 'ping 127.0.0.1 (loopback)', what: 'L3: Can the local IP stack process packets? If this fails, reinstall network drivers.' },
      { cmd: 'arp -a   or   ip neigh', what: 'L2: Is there an ARP entry for your gateway? No entry = cannot reach the local segment.' },
    ],
    cause: 'Unplugged cable, faulty NIC, wrong VLAN, failed switch port, or IP stack corruption.',
  },
  {
    problem: "Can ping IP but not hostname",
    layer: 'Layer 7 (DNS)',
    color: '#10b981',
    reason: 'L1–L3 are working (you can reach IPs). The failure is DNS resolution — an application-layer service.',
    steps: [
      { cmd: 'nslookup google.com', what: 'L7: Sends a DNS query. Shows which resolver is used and whether it responds.' },
      { cmd: 'nslookup google.com 8.8.8.8', what: 'L7: Bypasses your configured resolver. If this works, your DNS server is the problem.' },
      { cmd: 'cat /etc/resolv.conf   or   ipconfig /all', what: 'L7: What DNS servers are configured? Wrong or unreachable server = no resolution.' },
      { cmd: 'ping 8.8.8.8', what: 'L3: Confirm external IP reachability. If this works but DNS fails, it is purely a DNS issue.' },
    ],
    cause: 'Wrong DNS server configured, DNS server down, firewall blocking UDP/53, split-DNS misconfiguration.',
  },
  {
    problem: "Local network works, no internet",
    layer: 'Layer 3 (routing)',
    color: '#3b82f6',
    reason: 'You can reach local devices (L2 works) but cannot route beyond your local network (L3 default gateway problem).',
    steps: [
      { cmd: 'ping 192.168.1.1  (your gateway)', what: 'L3: Can you reach the router itself? If not, L2/L3 local issue.' },
      { cmd: 'ip route show   or   route print', what: 'L3: Is there a default route (0.0.0.0/0)? Missing default route = no internet.' },
      { cmd: 'ping 8.8.8.8', what: 'L3: Can you reach a known external IP? Tests routing beyond your gateway.' },
      { cmd: 'traceroute 8.8.8.8', what: 'L3: Where does the path die? First hop should be your gateway; if packets die there, ISP issue.' },
    ],
    cause: 'Missing default gateway, ISP outage, NAT failure on router, gateway IP misconfigured.',
  },
  {
    problem: "Connected but very slow",
    layer: 'Layer 1, 3, or 4',
    color: '#f97316',
    reason: 'Connectivity exists but performance is degraded. Could be physical signal errors, routing congestion, or TCP problems.',
    steps: [
      { cmd: 'ping -c 50 8.8.8.8 (check packet loss and jitter)', what: 'L3/L1: High RTT variance or packet loss points to a physical or congestion issue.' },
      { cmd: 'ethtool eth0  (Linux) or  netsh int tcp show global', what: 'L1: Check for duplex mismatch, speed negotiation errors, or CRC errors on the interface.' },
      { cmd: 'traceroute 8.8.8.8 or mtr 8.8.8.8', what: 'L3: Find the congested or high-latency hop. Which router is the bottleneck?' },
      { cmd: 'ss -ti  (show TCP socket internals)', what: 'L4: Check TCP retransmits, window size, RTT. High retransmits = packet loss causing TCP slowdown.' },
    ],
    cause: 'Duplex mismatch, ISP congestion, Wi-Fi interference, TCP congestion window collapse, buffer bloat.',
  },
  {
    problem: "App connects but feature broken",
    layer: 'Layer 7 (Application)',
    color: '#8b5cf6',
    reason: 'L1–L4 are fine (basic connectivity works). The failure is in application-layer logic or data format.',
    steps: [
      { cmd: 'curl -v https://api.example.com/endpoint', what: 'L7: Full HTTP request/response with headers. Shows status code, redirect chains, response body.' },
      { cmd: 'openssl s_client -connect host:443', what: 'L6: Is TLS negotiating correctly? Certificate errors, cipher mismatch, or SNI issues.' },
      { cmd: 'Check browser DevTools → Network tab', what: 'L7: Exact HTTP status codes, request headers sent, response body. Is it a 4xx, 5xx, or a CORS error?' },
      { cmd: 'Check application logs on the server', what: 'L7: What does the server actually see? Often reveals missing auth tokens, wrong Content-Type, or oversized payloads.' },
    ],
    cause: 'API authentication failure, CORS policy, broken JSON payload, TLS certificate mismatch, application bug.',
  },
  {
    problem: "Random disconnections",
    layer: 'Layer 1, 2, or 4',
    color: '#ef4444',
    reason: 'Intermittent loss suggests a physical layer fault, L2 loop or flap, or TCP keepalive/timeout issue.',
    steps: [
      { cmd: 'dmesg | grep -i eth  or  journalctl -u NetworkManager', what: 'L1/L2: Kernel logs show "link down" events — cable faults, NIC errors, or power management cycling the NIC.' },
      { cmd: 'netstat -s | grep retransmit  or  ss -ti', what: 'L4: TCP retransmission counter. Rising fast = regular packet loss causing connections to time out.' },
      { cmd: 'ping -i 0.2 gateway (sustained ping)', what: 'L3: Watch for intermittent drops. If you see regular timeouts, it is periodic rather than random.' },
      { cmd: 'ip -s link show eth0', what: 'L2: Check error counters: RX errors, TX errors, dropped frames. Non-zero = hardware or cable fault.' },
    ],
    cause: 'Loose cable, failing NIC, spanning tree topology change, DHCP lease expiry, power management on Wi-Fi.',
  },
]

function TroubleshootingGuide() {
  const [selected, setSelected] = useState<number | null>(null)
  const s = selected !== null ? TROUBLE_SCENARIOS[selected] : null

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 4px' }}>Interactive — OSI Troubleshooting Guide</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 18px' }}>Select a symptom to get the OSI-layer diagnosis methodology and exact commands.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8, marginBottom: 20 }}>
        {TROUBLE_SCENARIOS.map((sc, i) => (
          <button key={i} onClick={() => setSelected(selected === i ? null : i)}
            style={{ padding: '10px 14px', borderRadius: 10, textAlign: 'left', border: `1px solid ${selected === i ? sc.color : 'var(--border)'}`, background: selected === i ? `${sc.color}15` : 'var(--bg)', color: selected === i ? sc.color : 'var(--text)', fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.15s', lineHeight: 1.4 }}>
            {sc.problem}
          </button>
        ))}
      </div>

      {s && (
        <div style={{ background: 'var(--bg)', border: `1px solid ${s.color}35`, borderRadius: 12, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: s.color, fontFamily: FONT_MONO, background: `${s.color}20`, padding: '4px 10px', borderRadius: 6 }}>Start at: {s.layer}</span>
            <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{s.reason}</span>
          </div>

          <div style={{ marginBottom: 14 }}>
            {s.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: s.color, background: `${s.color}20`, borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: FONT_MONO }}>{i + 1}</span>
                <div>
                  <code style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, display: 'block', marginBottom: 3 }}>{step.cmd}</code>
                  <span style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.65 }}>{step.what}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: `${s.color}08`, border: `1px solid ${s.color}25`, borderRadius: 8, padding: '10px 14px' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: s.color, fontFamily: FONT_MONO, textTransform: 'uppercase', letterSpacing: '.08em' }}>Likely cause: </span>
            <span style={{ fontSize: 13, color: 'var(--text)' }}>{s.cause}</span>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OSIModelPage() {
  return (
    <LearnLayout
      title="The OSI Model — All 7 Layers"
      description="The universal framework every network engineer uses to reason about problems — from physical cables to application protocols."
      section="Networking Fundamentals — Module 03"
      readTime="22–30 min"
      updatedAt="May 2026"
    >
      {/* ── CHAPTER 1 ── */}
      <Chapter
        n="01"
        title="Why Does the OSI Model Exist?"
        subtitle="Before OSI, networking was a tower of Babel — every vendor's equipment spoke a different language."
      />

      <StoryBox>
        It is 1975. IBM mainframes use SNA. DEC minicomputers use DECnet. Xerox uses XNS. A hospital in Delhi buys IBM computers for billing and DEC computers for laboratory equipment. They need the two systems to share patient records. They cannot. IBM and DEC speak completely different networking protocols — different framing, different addressing, different everything. The hospital hires two programmers full-time just to manually re-enter data between the two systems. This was normal. Every organisation with mixed-vendor equipment had the same problem.
      </StoryBox>

      <Para>
        The International Organization for Standardization (ISO) started work on a solution in 1977. The goal was radical: define a universal reference model so that <Accent>any vendor's equipment could communicate with any other vendor's equipment</Accent>, as long as both followed the standard. The result, published in 1984 as ISO 7498, was the <Accent>Open Systems Interconnection (OSI) model</Accent>.
      </Para>

      <Para>
        The OSI model divides network communication into <Accent>seven distinct layers</Accent>, each with a specific job. A layer only needs to know how to talk to the layers immediately above and below it — not how any other layer works internally. This separation is called <Accent>encapsulation</Accent>, and it is the architectural insight that made the modern internet possible.
      </Para>

      <WowBox emoji="🧱" title="The Model That Lost the Standards War but Won the Mind War">
        OSI never actually ran the internet. TCP/IP won the protocol war — it was simpler, already deployed in ARPANET, and free. But OSI won as a <strong>teaching and diagnostic framework</strong>. Every network engineer on earth still uses the 7-layer model to describe problems, design systems, and communicate with colleagues. "Is this a Layer 2 issue or Layer 3?" is a sentence you will say every week of your career.
      </WowBox>

      <H2>The Core Insight: Layers Talk to Their Peer Layers</H2>

      <Para>
        When your browser sends an HTTP request to Google, it doesn't think about Ethernet frames or IP packets. It just calls an OS function: "send this data to port 443 at this IP address." The OS handles the rest — wrapping the HTTP data in a TCP segment, wrapping the TCP segment in an IP packet, wrapping the IP packet in an Ethernet frame, and sending the frame down the wire. At Google's server, the process reverses: each layer strips its header and hands the payload up to the next layer, until the HTTP request arrives at Google's web server process — perfectly reconstructed, even though it crossed thousands of miles and dozens of physical links.
      </Para>

      <Para>
        This is the OSI model in action. Each layer at the sender communicates <em>logically</em> with the same layer at the receiver. Your HTTP stack talks to Google's HTTP stack. Your TCP stack talks to Google's TCP stack. Your IP stack talks to the internet's routers. But physically, the only layer that actually touches the wire is Layer 1.
      </Para>

      <Divider />

      {/* ── CHAPTER 2 ── */}
      <Chapter
        n="02"
        title="History — How the 7 Layers Were Decided"
        subtitle="The committee that took 7 years to agree on 7 layers — and why the number 7 is not arbitrary."
      />

      <StoryBox>
        In 1977, ISO formed Study Group 16 — a committee of representatives from IBM, DEC, Honeywell, British Telecom, and national standards bodies from the US, UK, France, Germany, and Japan. Their mandate: define a standard architecture for all computer networking. The first proposal had 6 layers. Then 8. Then 5. Arguments about whether session management deserved its own layer lasted two years. Whether encryption belonged to the presentation layer or the application layer caused international debate. The final 7-layer model was published as ISO/IEC 7498-1 in 1984 — seven years after work began.
      </StoryBox>

      <Para>
        The <Accent>7 layers were not derived from first principles</Accent> — they were a negotiated compromise between different vendors' existing systems. IBM's SNA had 7 layers. DEC's DECnet had 5. The OSI committee found 7 to be the minimum that could accommodate everyone's architecture without being so granular as to be impractical.
      </Para>

      <H2>The Mnemonic — How to Remember All 7 Layers</H2>

      <Para>
        Network engineers have used mnemonics for 40 years to memorise the layer order. The two most common:
      </Para>

      <CodeBlock title="OSI layer order mnemonics">
        {`Top-down (L7 → L1):
  "All People Seem To Need Data Processing"
  Application · Presentation · Session · Transport · Network · Data Link · Physical

Bottom-up (L1 → L7):
  "Please Do Not Throw Sausage Pizza Away"
  Physical · Data Link · Network · Transport · Session · Presentation · Application`}
      </CodeBlock>

      <Para>
        In practice, engineers refer to layers by number far more than by name. "This is a Layer 3 issue" is clearer and faster than "this is a Network layer issue." Learn both the names and numbers — you will use both in different contexts.
      </Para>

      <WowBox emoji="📅" title="OSI vs TCP/IP — The Protocol That Actually Runs the Internet">
        TCP/IP was standardised in 1982 and already ran ARPANET. When OSI was finally published in 1984, TCP/IP had a 2-year head start in real deployments. The US Department of Defense mandated TCP/IP for all military networks in 1983. OSI-based protocols (like X.400 email and X.500 directory services) were deployed mainly in European telecommunications — and were almost completely replaced by TCP/IP by 1995. The OSI <em>model</em> survived. The OSI <em>protocols</em> did not.
      </WowBox>

      <Divider />

      {/* ── CHAPTER 3 ── */}
      <Chapter
        n="03"
        title="All 7 Layers at a Glance"
        subtitle="One click to understand any layer — protocols, devices, threats, and diagnostic commands."
      />

      <Para>
        Before diving deep into each layer, get the full picture. The stack below is fully interactive — click any layer to see exactly what lives there, what can break there, and how to diagnose it.
      </Para>

      <OSIStackExplorer />

      <CodeBlock title="OSI layers — quick reference">
        {`Layer  Name           PDU       Protocols              Devices
─────  ─────────────  ────────  ─────────────────────  ─────────────────────────────
  7    Application    Data      HTTP, DNS, SSH, SMTP   Hosts, L7 load balancers
  6    Presentation   Data      TLS, JPEG, gzip, UTF-8 Gateways, proxies
  5    Session        Data      NetBIOS, RPC, NFS      App servers, API gateways
  4    Transport      Segment   TCP, UDP, SCTP          Stateful FW, L4 load balancers
  3    Network        Packet    IPv4, IPv6, ICMP, OSPF Routers, L3 switches
  2    Data Link      Frame     Ethernet, ARP, 802.1Q  Switches, access points, NICs
  1    Physical       Bit       IEEE 802.3, 802.11     Cables, hubs, repeaters`}
      </CodeBlock>

      <Warn title="OSI vs TCP/IP layer count">
        The TCP/IP model has only 4 layers: Link (≈ L1+L2), Internet (≈ L3), Transport (≈ L4), and Application (≈ L5+L6+L7). When engineers say "Layer 7 firewall" or "Layer 3 switch," they are using OSI numbering — even though TCP/IP is the protocol actually running. Both models coexist in daily usage. OSI gives us the vocabulary; TCP/IP is the implementation.
      </Warn>

      <Divider />

      {/* ── CHAPTER 4 ── */}
      <Chapter
        n="04"
        title="Layer 7 — Application"
        subtitle="The only layer your code touches — and the most misunderstood layer in networking."
      />

      <StoryBox>
        You open Chrome and type "https://gmail.com". Chrome doesn't know anything about packets, ports, or frames. It calls a socket API: "connect to 142.250.182.46, port 443, using TCP." Everything below that call is handled by the OS network stack — Chrome's job ends at Layer 7. The Layer 7 protocol here is HTTPS (HTTP inside TLS), and Chrome constructs the HTTP request: GET / HTTP/2, Host: gmail.com, Authorization: Bearer ... The entire HTTP message is the Layer 7 PDU: raw application data.
      </StoryBox>

      <Para>
        A critical misconception: <Accent>Layer 7 is not the application itself</Accent>. It is the <em>interface</em> between the application and the network. Chrome is a user-space program. The Layer 7 protocols (HTTP, DNS, SMTP) are the language that application speaks over the network. The distinction matters because it explains why a "Layer 7 firewall" or "Layer 7 DDoS attack" refers to application-protocol-aware operations — the firewall understands HTTP requests, not just port numbers.
      </Para>

      <H2>Key Layer 7 Protocols and What They Actually Do</H2>

      <Para>
        <Accent>HTTP/HTTPS</Accent> (port 80/443) — the foundation of the web. Every API call, every web page load, every webhook is HTTP. HTTPS is HTTP with a TLS wrapper added by the Presentation layer.
      </Para>

      <Para>
        <Accent>DNS</Accent> (port 53, UDP and TCP) — translates domain names to IP addresses. Every network connection starts with DNS. If DNS is broken, nothing works — even though IP connectivity might be fine. This trips up engineers constantly.
      </Para>

      <Para>
        <Accent>SSH</Accent> (port 22) — secure remote shell. Uses asymmetric key exchange at L6/L7 boundary to establish an encrypted channel, then provides terminal access. Most server management in the world goes through SSH.
      </Para>

      <Para>
        <Accent>SMTP/IMAP/POP3</Accent> (ports 25/587/465/143/993/110) — email. SMTP delivers mail between servers. IMAP and POP3 retrieve mail from a server to a client. SPF, DKIM, DMARC are L7 security mechanisms that fight email spoofing.
      </Para>

      <Para>
        <Accent>SNMP</Accent> (port 161 UDP) — Simple Network Management Protocol. Network devices (routers, switches) expose metrics (CPU, interface counters, error rates) via SNMP. Your monitoring system polls these every 60 seconds. SNMPv1 and v2 use community strings (basically plaintext passwords) — a security disaster still deployed everywhere.
      </Para>

      <WowBox emoji="🌐" title="Layer 7 Load Balancers Are Smarter Than You Think">
        A Layer 4 load balancer distributes connections based on IP and port — it has no idea what protocol is inside. A Layer 7 load balancer (like an AWS Application Load Balancer or Nginx) reads the HTTP request, inspects the URL path and headers, and routes <code>GET /api/users</code> to the API server cluster while routing <code>GET /static/logo.png</code> to the CDN. It can also terminate TLS, add security headers, rate-limit by user ID, and cache responses. All of that is possible only because it operates at Layer 7.
      </WowBox>

      <Divider />

      {/* ── CHAPTER 5 ── */}
      <Chapter
        n="05"
        title="Layer 6 — Presentation"
        subtitle="The translation layer — encoding, compression, and encryption all live here."
      />

      <StoryBox>
        You send an email with a JPEG photo attached. Your email client needs to transmit binary image data through a protocol (SMTP) originally designed for plain ASCII text. The solution: Base64 encode the JPEG bytes into ASCII characters. The receiving client Base64 decodes them back to the binary image. That encoding/decoding is Layer 6. Now add TLS: before any SMTP data flows, both sides negotiate a cipher suite, exchange keys, and establish an encrypted channel. All subsequent data — including that Base64-encoded photo — is encrypted. That negotiation and encryption is also Layer 6.
      </StoryBox>

      <Para>
        Layer 6 is responsible for three things: <Accent>translation</Accent> (converting between different data representations — ASCII vs Unicode, big-endian vs little-endian), <Accent>compression</Accent> (gzip, zlib, Brotli for HTTP responses), and <Accent>encryption</Accent> (TLS, which secures HTTPS, SMTPS, IMAPS, and most modern protocols).
      </Para>

      <H2>Where TLS Actually Lives</H2>

      <Para>
        TLS is officially a Layer 6 function in the OSI model, but this is hotly debated. In the TCP/IP model, TLS sits between the Transport layer and the Application layer — sometimes called "Layer 4.5" or "between 4 and 7." In practice, TLS runs on top of TCP (a Transport-layer protocol) and beneath HTTP (an Application-layer protocol). It uses port numbers (Layer 4 concept) and handles encryption (Layer 6 concept).
      </Para>

      <Para>
        The practical answer: TLS is a Layer 6 function that is implemented in a library (OpenSSL, BoringSSL, mbedTLS) that your application calls. It establishes an encrypted channel that Layer 7 protocols use. For exam purposes, TLS = Layer 6. For engineering conversations, understanding that it sits between L4 and L7 is what matters.
      </Para>

      <CodeBlock title="What Layer 6 actually transforms">
        {`Encoding conversions (L6):
  ASCII text → Base64 (binary safe transport)
  UTF-8 → UTF-16 (Windows ↔ Unix)
  Big-endian → Little-endian (network byte order)

Compression (L6):
  HTTP response: Content-Encoding: gzip
  HTML 100KB → gzip → 22KB (78% smaller)

Encryption (L6 — TLS):
  Plaintext HTTP request →
  → TLS Record Layer encrypts with AES-256-GCM
  → Ciphertext bytes (indistinguishable from random noise)
  → TCP transports the ciphertext`}
      </CodeBlock>

      <Warn title="JPEG and PNG are Layer 6">
        Image formats (JPEG, PNG, WebP), audio formats (MP3, AAC), video formats (H.264, VP9), and document formats (PDF) are all Layer 6 — they define how data is encoded/compressed for representation. When you upload a profile photo, the JPEG encoding is Layer 6. The HTTP multipart/form-data that wraps it is Layer 7.
      </Warn>

      <Divider />

      {/* ── CHAPTER 6 ── */}
      <Chapter
        n="06"
        title="Layer 5 — Session"
        subtitle="The forgotten layer — managing conversations so connections can survive interruptions."
      />

      <StoryBox>
        You are on a video call with your team in three time zones. Your audio and your video are two separate data streams. Layer 5 keeps them synchronised — if the audio stream gets 200ms ahead of the video stream, the Session layer's synchronisation mechanism detects the drift and adjusts. If your network blips for two seconds and you reconnect, the session resumes rather than starting over from scratch. That state management — tracking which streams belong to which conversation, maintaining sync points, enabling recovery — is what the Session layer does.
      </StoryBox>

      <Para>
        Layer 5 establishes, manages, and terminates <Accent>sessions</Accent> — ongoing conversations between applications. A session is more than a TCP connection. It is a logical conversation that may use multiple TCP connections, may survive network interruptions, and may coordinate multiple simultaneous data streams. Layer 5 provides three services: <Accent>dialog control</Accent> (who is allowed to transmit at what moment — half duplex vs full duplex), <Accent>synchronisation</Accent> (checkpoints that allow a transfer to resume after failure), and <Accent>session establishment/teardown</Accent>.
      </Para>

      <H2>Why Layer 5 Is the "Forgotten Layer"</H2>

      <Para>
        In the TCP/IP model, Layer 5 does not exist as a separate layer. Its functions are absorbed into the Application layer. Most internet protocols — HTTP, SMTP, SSH — manage their own session state at the application layer without relying on a dedicated session protocol. This means in real TCP/IP networking you rarely deal with a protocol you call "the Session layer protocol."
      </Para>

      <Para>
        However, Layer 5 concepts appear constantly: HTTP cookies and session tokens are L5 concepts implemented in L7. TLS session resumption (reusing a previous TLS session to avoid a full handshake) is L5 logic implemented between L4 and L7. NetBIOS (used for Windows file sharing pre-Active Directory) is a genuine L5 protocol. RPC (Remote Procedure Call) manages sessions between services. NFS (Network File System) uses session management to handle reconnection.
      </Para>

      <WowBox emoji="🔁" title="HTTP Keep-Alive is a Layer 5 Concept">
        HTTP/1.0 opened a new TCP connection for every single request. A webpage with 40 resources (CSS, JS, images) required 40 TCP handshakes. HTTP Keep-Alive (and later HTTP/1.1 persistent connections) keeps the TCP connection open for multiple requests — reusing the session. HTTP/2 goes further with multiplexing: multiple requests sharing one TCP connection simultaneously. These are all Layer 5 session management optimisations, implemented at Layer 7.
      </WowBox>

      <Divider />

      {/* ── CHAPTER 7 ── */}
      <Chapter
        n="07"
        title="Layer 4 — Transport"
        subtitle="TCP vs UDP — the choice that decides whether your app is reliable or fast."
      />

      <StoryBox>
        Netflix streams video to 250 million concurrent viewers. WhatsApp handles 100 billion messages per day. Google Maps shows real-time traffic for a billion users. None of these could work with TCP's overhead — the acknowledgement-and-retransmit model would add too much latency. Netflix uses QUIC (which runs over UDP). WhatsApp uses XMPP over TCP for messages but DTLS/SRTP over UDP for voice. Google Maps uses a proprietary protocol over UDP. But your banking app uses TCP exclusively — because losing even one transaction packet is unacceptable. The choice between TCP and UDP happens at Layer 4, and it shapes every performance-critical design decision in networking.
      </StoryBox>

      <Para>
        The Transport layer has one fundamental job: <Accent>deliver data between two processes on two different machines</Accent>. It uses <Accent>port numbers</Accent> to identify which process on each machine should receive the data. Port 443 goes to your HTTPS server. Port 22 goes to your SSH daemon. Port 53 goes to your DNS resolver. Multiple applications on one machine can receive data simultaneously because each gets its own port.
      </Para>

      <H2>TCP — Transmission Control Protocol</H2>

      <Para>
        TCP provides <Accent>reliable, ordered, error-checked delivery</Accent> of a byte stream. Before any data flows, TCP performs a 3-way handshake: SYN → SYN-ACK → ACK, establishing a connection. Every byte sent gets a sequence number. The receiver sends ACKs. If an ACK doesn't arrive within a timeout, TCP retransmits. If the receiver's buffer fills, TCP uses flow control to slow the sender. If the network becomes congested, TCP's congestion control algorithms (CUBIC, BBR) automatically reduce the send rate to prevent collapse.
      </Para>

      <CodeBlock title="TCP 3-way handshake">
        {`Client                          Server
  │                                 │
  │──── SYN, Seq=1000 ────────────► │  Client: "I want to connect, my seq starts at 1000"
  │                                 │
  │ ◄── SYN-ACK, Seq=5000, Ack=1001 │  Server: "OK, my seq starts at 5000, I got your 1000"
  │                                 │
  │──── ACK, Seq=1001, Ack=5001 ──► │  Client: "Got it, connection established"
  │                                 │
  │──── DATA (HTTP request) ──────► │  Now data can flow in both directions
  │ ◄── ACK ──────────────────────  │`}
      </CodeBlock>

      <H2>UDP — User Datagram Protocol</H2>

      <Para>
        UDP is the opposite: <Accent>connectionless, unreliable, unordered</Accent>. No handshake. No acknowledgements. No retransmission. No flow control. You send a datagram and it either arrives or it doesn't — UDP doesn't care. This sounds terrible until you realise the benefits: zero connection overhead, no head-of-line blocking, minimal latency, and the ability to broadcast to multiple receivers simultaneously.
      </Para>

      <Para>
        DNS uses UDP because a query and response fit in one datagram each — a TCP handshake would triple the latency for every DNS lookup. Video streaming uses UDP because a lost frame is better shown as a brief glitch than pausing the video for 200ms to retransmit. Online games use UDP because a stale position update is worthless anyway — better to send fresh data immediately. DHCP uses UDP because the client has no IP address yet to establish a TCP connection.
      </Para>

      <H2>Ports — How Multiple Services Share One Machine</H2>

      <Para>
        A port is a 16-bit number (0–65535) that identifies a specific process or service on a machine. The combination of IP address + protocol + port is called a <Accent>socket</Accent>. A socket pair (client socket + server socket) uniquely identifies every TCP connection on the internet. Ports 0–1023 are <Accent>well-known ports</Accent> assigned by IANA — only root processes can bind them. Ports 1024–49151 are registered ports. Ports 49152–65535 are <Accent>ephemeral ports</Accent> — your OS assigns them dynamically for outgoing connections.
      </Para>

      <CodeBlock title="Common well-known ports">
        {`Port   Protocol  Service
────   ────────  ──────────────────────────────────────
  20   TCP       FTP data
  21   TCP       FTP control
  22   TCP       SSH
  23   TCP       Telnet (unencrypted — never use)
  25   TCP       SMTP (server-to-server email)
  53   UDP/TCP   DNS
  67   UDP       DHCP server
  68   UDP       DHCP client
  80   TCP       HTTP
 110   TCP       POP3
 143   TCP       IMAP
 161   UDP       SNMP
 389   TCP       LDAP
 443   TCP       HTTPS
 445   TCP       SMB (Windows file sharing)
 587   TCP       SMTP (client submission)
3306   TCP       MySQL
5432   TCP       PostgreSQL
6379   TCP       Redis
8080   TCP       HTTP alternate / proxy`}
      </CodeBlock>

      <Divider />

      {/* ── CHAPTER 8 ── */}
      <Chapter
        n="08"
        title="Layer 3 — Network"
        subtitle="IP addresses, routing, and how packets cross the internet hop by hop."
      />

      <StoryBox>
        You stream a YouTube video from a server in Google's Mumbai data center. Your home router in Hyderabad has a public IP of 103.74.52.18. Google's server has IP 74.125.24.100. Between them, your packet crosses your ISP's router (hop 1), a regional aggregation router (hop 2), a national backbone router (hop 3), a Tata Communications peering point in Mumbai (hop 4), Google's edge router (hop 5), Google's internal router (hop 6), and finally arrives at the server — 6 hops, each making an independent routing decision based solely on the destination IP: 74.125.24.100. Not one of those intermediate routers knows or cares what is inside the packet. They read only the IP header and forward.
      </StoryBox>

      <Para>
        The Network layer provides <Accent>logical addressing</Accent> using IP addresses and <Accent>routing</Accent> — determining the path a packet takes from source to destination across multiple networks. Unlike MAC addresses (Layer 2) which only work within a single network segment, IP addresses are globally unique (for public IPs) and routable across the entire internet.
      </Para>

      <H2>How Routing Actually Works</H2>

      <Para>
        Every router maintains a <Accent>routing table</Accent> — a list of network prefixes and the next hop to reach them. When a packet arrives, the router looks up the destination IP in its routing table, finds the most specific matching prefix (<Accent>longest prefix match</Accent>), and forwards the packet to that next hop. This decision is made independently at every router — there is no central coordinator.
      </Para>

      <Para>
        The <Accent>TTL (Time to Live)</Accent> field in every IP packet prevents routing loops. The sender sets TTL to 64 (Linux) or 128 (Windows). Each router decrements TTL by 1. When TTL hits 0, the router drops the packet and sends an ICMP "Time Exceeded" back to the source. This is exactly how <Code>traceroute</Code> works: it sends packets with TTL=1, 2, 3... each triggering a Time Exceeded from successive routers, mapping the path.
      </Para>

      <CodeBlock title="IPv4 packet header (simplified)">
        {`Version: 4 (IPv4)          IHL: 5 (20 bytes header)
DSCP/ECN: 0x00             Total Length: 1500 bytes
Identification: 0x1a2b     Flags: DF (Don't Fragment)
Fragment Offset: 0         TTL: 64
Protocol: 6 (TCP)          Header Checksum: 0x3e4f
Source IP:      192.168.1.5     (your device)
Destination IP: 142.250.182.4   (Google)
[TCP Segment follows...]`}
      </CodeBlock>

      <WowBox emoji="🌍" title="BGP — The Protocol That Holds the Internet Together">
        The internet is not one network — it is ~73,000 separate networks called <strong>Autonomous Systems (AS)</strong>, each owned by an ISP, cloud provider, or large organisation. They connect to each other using <strong>BGP (Border Gateway Protocol)</strong>, the only routing protocol that operates at the internet scale. BGP routes do not automatically find the fastest path — they find the path that each AS operator has agreed to accept through commercial peering agreements. This is why your traffic sometimes takes a surprisingly long path: routing is as much economics as engineering.
      </WowBox>

      <Divider />

      {/* ── CHAPTER 9 ── */}
      <Chapter
        n="09"
        title="Layer 2 — Data Link"
        subtitle="MAC addresses, Ethernet frames, and why switches are smarter than hubs."
      />

      <StoryBox>
        Your laptop's packet needs to go to your router — but the router's IP address (192.168.1.1) is not enough. The NIC doesn't speak IP at the physical level; it speaks MAC addresses. So your laptop sends an ARP request: "Who has 192.168.1.1? Tell 192.168.1.5." The router replies: "192.168.1.1 is at B8:E8:56:44:55:66." Your laptop stores this in its ARP cache and now builds an Ethernet frame: Dst MAC = B8:E8:56:44:55:66, Src MAC = A4:C3:F0:11:22:33, EtherType = 0x0800. The switch receives the frame, looks up B8:E8:56:44:55:66 in its CAM table, and forwards the frame only to the port where the router lives. No broadcast. No collision. Efficient delivery.
      </StoryBox>

      <Para>
        The Data Link layer handles <Accent>physical addressing</Accent> (MAC addresses), <Accent>framing</Accent> (packaging bits into structured frames), <Accent>error detection</Accent> (CRC at the end of every frame), and <Accent>media access control</Accent> (deciding which device can transmit when on a shared medium). It only works within a single network segment — a MAC address cannot be routed across the internet.
      </Para>

      <H2>Ethernet Frame Structure</H2>

      <CodeBlock title="Ethernet II frame">
        {`┌──────────────┬────────────┬───────────┬──────────────────┬───────┐
│ Preamble (8B)│ Dst MAC(6B)│ Src MAC(6B│ EtherType (2B)  │Payload│ FCS(4B)
└──────────────┴────────────┴───────────┴──────────────────┴───────┘
  10101010...    B8:E8:56:..   A4:C3:F0:..  0x0800 = IPv4       1–1500B   CRC-32
                                            0x0806 = ARP
                                            0x86DD = IPv6
                                            0x8100 = VLAN tag

FCS = Frame Check Sequence (CRC-32)
  Sender computes CRC of all fields except preamble and FCS
  Receiver recomputes CRC — mismatch = frame is silently dropped`}
      </CodeBlock>

      <H2>Switches vs Hubs — Why It Matters</H2>

      <Para>
        A <Accent>hub</Accent> is a Layer 1 device — it receives a signal on one port and repeats it to all other ports. Every device hears every frame. One collision domain. Maximum theoretical throughput shared among all devices. Half-duplex only. Hubs are obsolete, but you may still encounter them in embedded systems or legacy hardware.
      </Para>

      <Para>
        A <Accent>switch</Accent> is a Layer 2 device — it maintains a <Accent>CAM (Content Addressable Memory) table</Accent> that maps MAC addresses to ports. When a frame arrives, the switch looks up the destination MAC, finds the port, and forwards the frame only to that port. Each port is its own collision domain. Full duplex. Gigabit per port, simultaneously. Modern switches can handle millions of MAC address lookups per second in hardware ASICs.
      </Para>

      <Divider />

      {/* ── CHAPTER 10 ── */}
      <Chapter
        n="10"
        title="Layer 1 — Physical"
        subtitle="Bits become voltage transitions, light pulses, or radio waves — the real physics of networking."
      />

      <StoryBox>
        A Google datacenter in Singapore connects to a datacenter in Tokyo via a 5,700km submarine fiber optic cable on the ocean floor. Your video call travels as pulses of laser light — specifically, multiple wavelengths of light simultaneously (WDM — Wavelength Division Multiplexing), each wavelength carrying a separate 100 Gbps channel, for a total capacity of 20+ Tbps on a single fiber pair. The cable is thinner than a garden hose. It is buried under 8,000 meters of Pacific Ocean. It took 3 years and $250 million to lay. And yet the bits that travel through it are governed by exactly the same Layer 1 rules as the Cat6 cable in your office — just at a very different scale.
      </StoryBox>

      <Para>
        The Physical layer is responsible for transmitting raw bits over a physical medium. It defines everything about the medium: <Accent>signal levels</Accent> (what voltage represents a 1 vs a 0), <Accent>bit timing</Accent> (how long each bit lasts), <Accent>encoding schemes</Accent> (how bits are represented in the signal), <Accent>connector specifications</Accent> (pin layouts, cable categories), and <Accent>data rates</Accent> (how many bits per second).
      </Para>

      <H2>Signal Encoding — How Bits Become Signals</H2>

      <Para>
        You cannot simply send a 1 as "high voltage" and a 0 as "low voltage" — long strings of identical bits would cause clock recovery to fail (the receiver loses sync). Real encoding schemes solve this. <Accent>Manchester encoding</Accent> (used in early Ethernet) represents each bit as a voltage transition — always providing a clock signal. <Accent>4B/5B encoding</Accent> (Fast Ethernet) maps every 4 data bits to a 5-bit code that guarantees enough transitions. <Accent>PAM4</Accent> (used in 400GbE) uses 4 signal levels to encode 2 bits per symbol, doubling throughput without doubling frequency.
      </Para>

      <H2>Physical Media Types</H2>

      <Para>
        <Accent>Copper (twisted pair)</Accent> — Cat5e (1Gbps/100m), Cat6 (10Gbps/55m), Cat6A (10Gbps/100m), Cat8 (40Gbps/30m). Used for almost all structured cabling in buildings. Susceptible to electromagnetic interference; twisted pairs cancel out EMI. RJ-45 connector.
      </Para>

      <Para>
        <Accent>Fiber optic</Accent> — Single-mode fiber (SMF) transmits one light mode over very long distances (up to 100km) using 1,310nm or 1,550nm laser. Multi-mode fiber (MMF) transmits multiple light modes, cheaper but limited to ~2km. Used for building backbone, data center interconnects, and all long-haul transmission. LC and SC connectors.
      </Para>

      <Para>
        <Accent>Wireless (802.11)</Accent> — Radio waves at 2.4GHz, 5GHz, or 6GHz. Shared medium — every device in range hears every frame. Uses CSMA/CA (Collision Avoidance) instead of CSMA/CD because collisions cannot be detected on a shared wireless medium. Range and speed trade off against each other and against interference.
      </Para>

      <Divider />

      {/* ── CHAPTER 11 ── */}
      <Chapter
        n="11"
        title="Encapsulation and Decapsulation"
        subtitle="How your HTTP request becomes 1,500 bytes of electrical signal — and gets reassembled at the other end."
      />

      <StoryBox>
        Imagine sending a letter internationally. You write the letter (your data — L7). You put it in an envelope and write "URGENT: needs to be signed for" on it (L6/L5 information). You address the inner envelope with the recipient's exact name and room number at a company (L4 port). You put that in another envelope addressed to the recipient's city (L3 IP). A delivery truck picks it up and puts it in a bag labelled with the next sorting facility's barcode (L2 frame). That bag physically travels on a conveyor belt (L1 bits). At each step, a layer adds its own addressing and handling instructions — this is encapsulation. At the destination, each layer reads and removes its own envelope, passing the contents upward — this is decapsulation.
      </StoryBox>

      <Para>
        As data travels <Accent>down the stack</Accent> on the sender's machine, each layer adds a header (and sometimes a trailer) to the payload from the layer above. This process is called <Accent>encapsulation</Accent>. The data unit at each layer has a specific name: the payload from L7-L5 is just called <Accent>Data</Accent>, at L4 it becomes a <Accent>Segment</Accent> (TCP) or <Accent>Datagram</Accent> (UDP), at L3 it becomes a <Accent>Packet</Accent>, at L2 it becomes a <Accent>Frame</Accent>, at L1 it becomes <Accent>Bits</Accent>.
      </Para>

      <EncapsulationVisualizer />

      <CodeBlock title="Complete encapsulation — byte sizes">
        {`Starting with an HTTP GET request: ~200 bytes

After L7 (Application):   HTTP headers + body         = 200 bytes
After L6 (Presentation):  TLS record header           = +5 bytes  → 205 bytes
After L4 (Transport):     TCP header (20 bytes)       = +20 bytes → 225 bytes
After L3 (Network):       IP header (20 bytes)        = +20 bytes → 245 bytes
After L2 (Data Link):     Ethernet header (14 bytes)
                          + FCS trailer (4 bytes)     = +18 bytes → 263 bytes
L1 Physical:              Preamble (8 bytes)          = +8 bytes  → 271 bytes

Total overhead for 200 bytes of actual data: 71 bytes (35% overhead)
Maximum payload efficiency (1500 byte MTU): 1460 bytes of data, 40 bytes TCP/IP overhead = 97.3%`}
      </CodeBlock>

      <Warn title="Headers are stripped at each layer — not passed up">
        A common mistake: thinking the Ethernet header is passed to the IP layer. It is not. At Layer 2, the switch or NIC reads the Ethernet header, verifies the CRC, and <strong>strips the entire Ethernet frame</strong> — passing only the IP packet payload to Layer 3. Each layer handles its own header and discards it. Higher layers never see lower-layer headers.
      </Warn>

      <Divider />

      {/* ── CHAPTER 12 ── */}
      <Chapter
        n="12"
        title="Troubleshooting with the OSI Model"
        subtitle="The systematic approach that experienced engineers use to diagnose any network problem in minutes."
      />

      <StoryBox>
        A developer messages you: "The app is broken, users can't log in." Where do you start? You could randomly check the database, restart services, or check firewall rules — spending hours on the wrong layer. Or you apply OSI methodology: can you ping the server? (L3 ok) Can you resolve the hostname? (L7 DNS ok) Can you open a TCP connection on port 443? (L4 ok) Can you make an HTTPS request and get a 200? (L6 TLS ok, L7 HTTP ok) Can the app actually authenticate? (L7 application logic). The problem is in the authentication service — not the network. Total diagnosis time: 4 minutes. Without OSI methodology: potentially hours.
      </StoryBox>

      <Para>
        The OSI model gives you a <Accent>systematic diagnostic methodology</Accent>: start from the bottom (Layer 1) and work your way up, or start from the symptom and narrow down. Each layer has specific commands that tell you definitively whether that layer is functioning. A confirmed working layer eliminates everything below it — you never go backward.
      </Para>

      <TroubleshootingGuide />

      <H2>The Golden Rule: Confirm Each Layer Before Moving Up</H2>

      <Para>
        Never skip a layer during diagnosis. A symptom at Layer 7 (app not working) can be caused by a failure at Layer 1 (intermittent cable). The OSI methodology prevents you from debugging the wrong layer for hours. Once you confirm a layer works — move up. Once you find a layer that fails — stop and fix it there. Do not investigate Layer 7 when Layer 3 is broken.
      </Para>

      <CodeBlock title="OSI diagnostic commands — complete reference">
        {`Layer 1 — Physical:
  Check NIC/switch link LEDs
  ethtool eth0                      # Link speed, duplex, errors
  ip -s link show eth0               # Error counters
  cable tester / loopback test

Layer 2 — Data Link:
  arp -a                            # ARP cache — can I reach the gateway?
  ip neigh                          # Linux ARP table
  ip link show                      # MAC address, MTU, state

Layer 3 — Network:
  ping 127.0.0.1                    # Local IP stack working?
  ping 192.168.1.1                  # Gateway reachable?
  ping 8.8.8.8                      # Internet routing working?
  ip route show                     # Routing table, default gateway
  traceroute 8.8.8.8               # Path to destination

Layer 4 — Transport:
  netstat -tulpn                    # Open ports and listening services
  ss -tulpn                         # Faster alternative to netstat
  nmap -sT 192.168.1.1              # Port scan target
  telnet host 443                   # Test TCP connectivity to a port

Layer 5–7 — Session/Presentation/Application:
  nslookup google.com               # DNS resolution
  dig google.com A                  # Detailed DNS query
  curl -v https://example.com       # Full HTTP request with TLS
  openssl s_client -connect h:443   # TLS certificate and cipher check`}
      </CodeBlock>

      <Divider />

      {/* ── CHAPTER 13 ── */}
      <Chapter
        n="13"
        title="Common Misconceptions That Will Get You in Trouble"
        subtitle="Things engineers confidently say that are wrong — corrected before they cost you an incident."
      />

      <Err title="'The OSI model is how the internet works'">
        The OSI model is a <strong>reference model</strong> — a teaching framework and diagnostic vocabulary. The internet runs on TCP/IP, which has 4 layers, not 7. TCP/IP's Application layer covers OSI layers 5, 6, and 7 combined. The OSI model was never widely deployed as a protocol suite. What makes OSI valuable is the conceptual framework for reasoning about networking, not its protocols. When someone says "Layer 3 issue," they mean IP routing — even though the protocol running is TCP/IP, not OSI.
      </Err>

      <Err title="'Routers only work at Layer 3'">
        Basic routers forward packets based on IP addresses — a Layer 3 function. But modern network equipment routinely inspects higher layers. A <strong>Next-Generation Firewall (NGFW)</strong> does deep packet inspection at Layer 7 — reading HTTP URLs, identifying applications by signature, and blocking specific content. An <strong>Application Delivery Controller (ADC)</strong> routes HTTP requests based on URL paths. Even a home router doing NAT is performing a Layer 4 operation (tracking port numbers). Saying a router "only works at Layer 3" is decades out of date.
      </Err>

      <Err title="'TLS belongs to Layer 6, period'">
        TLS sits awkwardly between layers. It runs on top of TCP (Layer 4) and beneath HTTP (Layer 7). It provides encryption and authentication — classically Layer 6 functions. But it also manages sessions and connection state — Layer 5 functions. And in TLS 1.3, some features overlap with Layer 4. In practice, most engineers say TLS is between Layer 4 and Layer 7. For certification exams (CompTIA, Cisco), answer Layer 6. For real engineering conversations, "TLS is below HTTP and above TCP" is the accurate answer.
      </Err>

      <Err title="'Switches only work at Layer 2'">
        An unmanaged switch does operate purely at Layer 2 — forwarding frames based on MAC addresses. But a <strong>Layer 3 switch</strong> (sometimes called a multilayer switch) can also route IP packets between VLANs — a Layer 3 function — at wire speed using ASICs. Enterprise data centers use L3 switches to route between VLANs without needing a dedicated router. Some high-end switches even inspect Layer 4 headers for QoS prioritisation. The layer a device "works at" describes its highest layer of intelligence, not its only layer.
      </Err>

      <Err title="'OSI layers are sequential — data passes through every layer every time'">
        The logical model says L7→L6→L5→L4→L3→L2→L1, but real implementations frequently collapse layers. In TCP/IP, L5 and L6 do not exist as separate protocols — their functions are handled by application-layer code (TLS in your app) or the OS. Some protocols skip layers entirely: ARP operates at L2/L3 boundary. ICMP is an L3 protocol that carries data useful to L4 and above. IPSec can operate at L3 (tunnel mode) or between L3 and L4 (transport mode). The model is a map — the territory is messier.
      </Err>

      <Err title="'Layer 1 is just about cables'">
        Layer 1 defines everything about the physical transmission medium — and that goes far beyond cables. Wi-Fi's radio encoding (OFDM, 64-QAM, 256-QAM, 1024-QAM), the modulation scheme used, the channel width, and the antenna technology are all Layer 1 specifications. <strong>Power over Ethernet (PoE)</strong> — delivering electrical power through a network cable to power IP cameras, access points, and phones — is a Layer 1 function. <strong>Optical wavelength division multiplexing (WDM)</strong> — running 80+ separate channels simultaneously on one fiber — is Layer 1. <strong>USB</strong> is a Layer 1 specification. The physical layer is the most varied and complex in the entire stack.
      </Err>

      <Divider />

      {/* ── CHAPTER 14 ── */}
      <Chapter
        n="14"
        title="Interview Questions"
        subtitle="Questions you will face at every level — from first job to staff engineer."
      />

      <IQ level="Beginner" q="Name all 7 OSI layers from top to bottom and give one protocol for each.">
        Top to bottom: <strong>7 — Application</strong> (HTTP, DNS), <strong>6 — Presentation</strong> (TLS, JPEG, gzip), <strong>5 — Session</strong> (NetBIOS, RPC), <strong>4 — Transport</strong> (TCP, UDP), <strong>3 — Network</strong> (IPv4, IPv6, ICMP), <strong>2 — Data Link</strong> (Ethernet, ARP, 802.1Q), <strong>1 — Physical</strong> (IEEE 802.3, 802.11, fiber optics).
        <br /><br />
        Mnemonic top-down: <em>"All People Seem To Need Data Processing."</em> In interviews, listing the protocol alongside each layer shows you understand what the layer actually does, not just its name.
      </IQ>

      <IQ level="Beginner" q="What is the difference between a packet, a frame, and a segment?">
        These are PDU (Protocol Data Unit) names at specific layers. A <strong>segment</strong> is the Transport layer (L4) PDU — TCP splits data into segments, each with a sequence number, port numbers, and flags. A <strong>packet</strong> is the Network layer (L3) PDU — IP wraps the segment with source/destination IP addresses, TTL, and protocol type. A <strong>frame</strong> is the Data Link layer (L2) PDU — Ethernet wraps the packet with source/destination MAC addresses and a CRC checksum.
        <br /><br />
        The key distinction: packets can be routed across networks (they carry IP addresses); frames only work within a single network segment (they carry MAC addresses and are stripped at each router).
      </IQ>

      <IQ level="Intermediate" q="At which OSI layer does a switch, router, and next-gen firewall operate?">
        A <strong>basic switch</strong> operates at Layer 2 — it forwards frames based on MAC address tables (CAM tables). An <strong>L3 switch</strong> also performs Layer 3 routing between VLANs. A <strong>router</strong> operates primarily at Layer 3 — it forwards packets based on IP routing tables and longest prefix match. A <strong>next-generation firewall (NGFW)</strong> operates up to Layer 7 — it does deep packet inspection, identifies applications by signature regardless of port, inspects HTTP request content, and can block based on URL categories, user identity, or application behaviour.
        <br /><br />
        A device "operates at Layer X" means it can make decisions based on that layer's header. It still processes all lower layers to extract the relevant header.
      </IQ>

      <IQ level="Intermediate" q="Explain encapsulation — what happens at each OSI layer when your browser sends an HTTPS request?">
        <strong>L7 (Application):</strong> Browser constructs an HTTP GET request — text with headers like Host, User-Agent, Accept. <br />
        <strong>L6 (Presentation):</strong> TLS encrypts the HTTP data using the negotiated cipher suite (e.g., AES-256-GCM). Adds a TLS Record header (content type, version, length). <br />
        <strong>L5 (Session):</strong> Session context is embedded in the TLS session ID / ticket — no separate header. <br />
        <strong>L4 (Transport):</strong> TCP adds a 20-byte header: source port (ephemeral), destination port (443), sequence number, ACK number, flags (PSH, ACK), window size. <br />
        <strong>L3 (Network):</strong> IP adds a 20-byte header: source IP, destination IP, protocol (6=TCP), TTL (64). <br />
        <strong>L2 (Data Link):</strong> Ethernet adds a 14-byte header (dst MAC, src MAC, EtherType) and a 4-byte FCS trailer. <br />
        <strong>L1 (Physical):</strong> The frame is serialised to bits and sent as voltage transitions (copper) or light pulses (fiber).
      </IQ>

      <IQ level="Senior" q="A user reports 'the internet is down'. Walk through your OSI troubleshooting methodology.">
        Start at Layer 1 and work up until you find the broken layer: <br /><br />
        <strong>L1:</strong> Check physical link — is the NIC link light on? Does <code>ethtool eth0</code> show a link? No link = cable, NIC, or switch port fault. <br />
        <strong>L2:</strong> <code>ip link show</code> — is the interface UP? <code>arp -a</code> — is there an ARP entry for the gateway? No ARP entry = cannot reach the local segment even though the cable is connected. <br />
        <strong>L3:</strong> <code>ping 127.0.0.1</code> — local IP stack working? <code>ping 192.168.1.1</code> — can I reach my default gateway? <code>ip route show</code> — is there a default route? <code>ping 8.8.8.8</code> — can I reach an external IP? <br />
        <strong>L4:</strong> <code>telnet 8.8.8.8 443</code> or <code>nc -zv 8.8.8.8 443</code> — can I establish a TCP connection? Blocked = firewall or missing route. <br />
        <strong>L7:</strong> <code>nslookup google.com</code> — DNS resolution working? <code>curl -v https://google.com</code> — full HTTP request. <br /><br />
        At each step: if the test passes, the layer works — move up. If it fails, fix it at that layer before testing higher.
      </IQ>

      <IQ level="Senior" q="Why doesn't TLS cleanly map to a single OSI layer? What does this tell us about the OSI model's limitations?">
        TLS provides encryption and authentication — OSI Layer 6 functions. But TLS also manages handshake state and session resumption — Layer 5 functions. TLS runs on top of TCP sockets — it consumes a Layer 4 service. And TLS is invoked by application code (Layer 7) via an API. TLS spans L4 through L7. <br /><br />
        This reveals a fundamental limitation of the OSI model: it was designed by committee to model specific 1984-era protocols, not the internet protocols that actually emerged. The real-world lesson is that the OSI model is a <em>conceptual framework</em>, not a specification. When a protocol doesn't map cleanly to one layer, it doesn't mean the protocol is wrong — it means the model is an approximation. Engineers should use OSI as a diagnostic vocabulary and mental model, not as a strict architectural constraint.
      </IQ>

      <IQ level="PhD" q="OSI was the ISO standard, yet TCP/IP won. What does this tell us about protocol design and standardisation?">
        TCP/IP won for several reasons that are instructive for any protocol designer: <br /><br />
        <strong>Simplicity:</strong> TCP/IP has 4 layers and was designed by implementation — Vint Cerf and Bob Kahn wrote the first RFC in 1974 and immediately implemented it. OSI was designed by committee over 7 years, producing 200+ standards documents before any real implementation existed. Simple, working implementations beat comprehensive but unimplemented standards. <br /><br />
        <strong>Open implementation:</strong> TCP/IP was freely available in BSD Unix in 1983. Every university got it for free. OSI protocols were commercial products with licensing fees. Open source wins ecosystems. <br /><br />
        <strong>US DoD mandate:</strong> The US Department of Defense mandated TCP/IP in 1983 for all government networks. This created an immediate large base of deployed equipment that private vendors had to interoperate with. Standards that get deployed by large customers first often win regardless of technical merit. <br /><br />
        The lesson: protocol design is not purely technical. Deployment path, license cost, simplicity of first implementation, and institutional support often matter more than architectural elegance. The "best" protocol rarely wins — the most deployed one does.
      </IQ>

      <IQ level="PhD" q="How does a stateful firewall differ from a NGFW at the OSI layer level, and what new attack surfaces does L7 inspection create?">
        A <strong>stateful firewall</strong> operates at L3 and L4. It tracks TCP connection state — SYN seen, SYN-ACK seen, established, FIN seen — and uses this to determine whether a packet belongs to a legitimate established session. It can block unsolicited inbound packets even if the port is open, because it knows no outbound SYN was sent. Decision: based on IP (L3) and TCP state (L4). <br /><br />
        A <strong>NGFW</strong> adds L7 application inspection. It reassembles TCP streams, decrypts TLS (via certificate interception/MitM), and inspects the HTTP URL, DNS query name, certificate SNI, file type, or application signature. This allows blocking "Facebook" regardless of IP or port, or blocking file downloads over HTTP regardless of extension. <br /><br />
        <strong>New attack surfaces from L7 inspection:</strong> TLS interception (the firewall decrypts all HTTPS traffic) breaks end-to-end encryption and creates a MitM that leaks credentials to the firewall operator. L7 inspection introduces CPU-intensive processing that is a DDoS vector — sending crafted sessions that force deep inspection at line rate. Application identification by signature can be evaded by using unusual protocols, tunnelling traffic inside allowed protocols (DNS tunnelling, HTTP tunnelling), or obfuscation. L7 firewall bugs (parsing vulnerabilities) become exploitable remotely, expanding the attack surface of the security perimeter itself.
      </IQ>

      <KeyTakeaways items={[
        'The OSI model has 7 layers: Application (7), Presentation (6), Session (5), Transport (4), Network (3), Data Link (2), Physical (1). Remember: "All People Seem To Need Data Processing."',
        'Each layer adds a header during encapsulation (sending) and strips it during decapsulation (receiving). Higher layers never see lower-layer headers.',
        'PDU names by layer: Data (L7-L5) → Segment/Datagram (L4) → Packet (L3) → Frame (L2) → Bits (L1).',
        'TCP provides reliable, ordered delivery via 3-way handshake, sequence numbers, and acknowledgements. UDP provides fast, connectionless delivery with no guarantees.',
        'Switches operate at L2 (MAC addresses). Routers operate at L3 (IP addresses). NGFWs operate at L7 (application inspection).',
        'The OSI model is a reference framework — the internet runs on TCP/IP (4 layers), not OSI (7 layers). OSI is a diagnostic vocabulary, not a deployed protocol suite.',
        'TLS sits between L4 and L7 — it provides L6 encryption using L4 TCP transport, invoked by L7 applications. It does not cleanly map to one layer.',
        'OSI troubleshooting: start at L1 (physical) and work up. Confirm each layer before moving to the next. A working lower layer eliminates all layers below it as the cause.',
        'ARP bridges L2 (MAC) and L3 (IP) — it resolves IP addresses to MAC addresses so frames can be addressed correctly on the local segment.',
        'Applying OSI methodology consistently — even for "simple" problems — is the single habit that separates engineers who fix problems in minutes from those who spend hours in the wrong layer.',
      ]} />
    </LearnLayout>
  )
}
