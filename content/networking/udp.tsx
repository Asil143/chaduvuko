'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

/* ── Helper components ────────────────────────────────────────────────────── */

const G = '#10b981'
const WARN_BG = '#fefce8'
const WARN_BORDER = '#fef08a'
const ERR_BG = '#fff1f2'
const ERR_BORDER = '#fecdd3'

const Chapter = ({ n }: { n: number }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 11, color: G, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>
      // Chapter {String(n).padStart(2, '0')}
    </p>
  </div>
)

const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '56px 0' }} />

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
)

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: '0 0 24px' }}>{children}</h2>
)

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>{children}</h3>
)

const Accent = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: G }}>{children}</strong>
)

const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 6px', color: G }}>{children}</code>
)

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', lineHeight: 1.7, color: 'var(--text)', margin: '0 0 24px' }}>{children}</pre>
)

const StoryBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `3px solid ${G}`, borderRadius: 8, padding: '16px 20px', margin: '0 0 24px', fontSize: 14.5, lineHeight: 1.8, color: 'var(--text)' }}>{children}</div>
)

const WowBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${G}`, borderRadius: 8, padding: '14px 18px', margin: '0 0 24px', fontSize: 14, lineHeight: 1.8, color: 'var(--text)' }}>
    <span style={{ color: G, fontWeight: 700, marginRight: 8 }}>◆ Wow:</span>{children}
  </div>
)

const Warn = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: WARN_BG, border: `1px solid ${WARN_BORDER}`, borderRadius: 8, padding: '14px 18px', margin: '0 0 24px', fontSize: 14, lineHeight: 1.8, color: '#713f12' }}>
    <span style={{ fontWeight: 700, marginRight: 8 }}>⚠ Warning:</span>{children}
  </div>
)

const Err = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: ERR_BG, border: `1px solid ${ERR_BORDER}`, borderRadius: 8, padding: '14px 18px', margin: '0 0 24px', fontSize: 14, lineHeight: 1.8, color: '#881337' }}>
    <span style={{ fontWeight: 700, marginRight: 8 }}>✗ Misconception:</span>{children}
  </div>
)

const levelColors: Record<string, string> = {
  Beginner: '#10b981',
  Intermediate: '#3b82f6',
  Senior: '#8b5cf6',
  PhD: '#f97316',
}

const IQ = ({ level, children }: { level: string; children: React.ReactNode }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', margin: '0 0 24px', fontSize: 14, lineHeight: 1.8, color: 'var(--text)' }}>
    <span style={{ background: levelColors[level] ?? G, color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: 4, padding: '2px 8px', marginRight: 10, letterSpacing: '.05em' }}>{level.toUpperCase()}</span>
    {children}
  </div>
)

/* ── Interactive Component 1: UDP vs TCP Packet Race ─────────────────────── */

interface RaceStep {
  rtt: number
  udpStatus: string
  tcpStatus: string
  udpBytes: number
  tcpBytes: number
  udpNote: string
  tcpNote: string
}

const RACE_STEPS: RaceStep[] = [
  { rtt: 0, udpStatus: 'Sending', tcpStatus: 'SYN sent', udpBytes: 100, tcpBytes: 0, udpNote: 'UDP sends immediately — no setup', tcpNote: 'TCP must complete 3-way handshake first' },
  { rtt: 1, udpStatus: 'Done ✓', tcpStatus: 'SYN-ACK received', udpBytes: 100, tcpBytes: 0, udpNote: 'UDP finishes in 1 RTT (request + response)', tcpNote: 'Still in handshake — no data yet' },
  { rtt: 2, udpStatus: 'Done ✓', tcpStatus: 'Handshake done, data sent', udpBytes: 100, tcpBytes: 100, udpNote: 'UDP has been done for 1 RTT', tcpNote: '1 RTT handshake + 1 RTT data = 2 RTT total' },
  { rtt: 3, udpStatus: 'Done ✓', tcpStatus: 'ACK received ✓', udpBytes: 100, tcpBytes: 100, udpNote: 'UDP: 1 RTT for a request-response', tcpNote: 'TCP: minimum 2 RTT for first request-response' },
]

function UdpVsTcpRace() {
  const [step, setStep] = useState(0)
  const current = RACE_STEPS[step]

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>UDP vs TCP: First Byte Latency Race</h3>
      <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--text-muted)' }}>
        Step through a 100-byte request-response exchange. See why DNS uses UDP — TCP costs a full extra RTT just for setup.
      </p>

      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {RACE_STEPS.map((s, i) => (
          <button key={i} onClick={() => setStep(i)}
            style={{ padding: '6px 14px', borderRadius: 20, border: `1px solid ${i === step ? G : 'var(--border)'}`, background: i === step ? G : 'var(--surface)', color: i === step ? '#fff' : 'var(--text-muted)', fontSize: 12, fontWeight: i === step ? 700 : 400, cursor: 'pointer' }}>
            RTT {s.rtt}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        {/* UDP card */}
        <div style={{ border: `1px solid ${G}`, borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ background: G, color: '#fff', padding: '10px 14px', fontWeight: 700, fontSize: 14 }}>UDP</div>
          <div style={{ padding: '12px 14px' }}>
            <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{current.udpStatus}</p>
            <div style={{ background: 'var(--surface)', borderRadius: 6, height: 8, marginBottom: 8 }}>
              <div style={{ background: G, height: '100%', width: `${current.udpBytes}%`, borderRadius: 6, transition: 'width .3s' }} />
            </div>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{current.udpNote}</p>
          </div>
        </div>
        {/* TCP card */}
        <div style={{ border: '1px solid #3b82f6', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ background: '#3b82f6', color: '#fff', padding: '10px 14px', fontWeight: 700, fontSize: 14 }}>TCP</div>
          <div style={{ padding: '12px 14px' }}>
            <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{current.tcpStatus}</p>
            <div style={{ background: 'var(--surface)', borderRadius: 6, height: 8, marginBottom: 8 }}>
              <div style={{ background: '#3b82f6', height: '100%', width: `${current.tcpBytes}%`, borderRadius: 6, transition: 'width .3s' }} />
            </div>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{current.tcpNote}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
          style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', cursor: step === 0 ? 'not-allowed' : 'pointer', opacity: step === 0 ? 0.4 : 1 }}>
          ← Back
        </button>
        <button onClick={() => setStep(s => Math.min(3, s + 1))} disabled={step === 3}
          style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: '1px solid var(--border)', background: G, color: '#fff', cursor: step === 3 ? 'not-allowed' : 'pointer', opacity: step === 3 ? 0.5 : 1 }}>
          Next RTT →
        </button>
      </div>
    </div>
  )
}

/* ── Interactive Component 2: UDP Header Dissector ───────────────────────── */

interface UdpField {
  name: string
  bits: string
  value: string
  description: string
  color: string
}

const UDP_FIELDS: UdpField[] = [
  { name: 'Source Port', bits: '16 bits', value: '53421', description: 'Ephemeral port chosen by the client OS. UDP clients usually use a random port in the range 1024–65535 per datagram (or per application session). Unlike TCP, different UDP datagrams to the same server can use different source ports — there is no connection to track.', color: '#3b82f6' },
  { name: 'Destination Port', bits: '16 bits', value: '53', description: 'Well-known port 53 for DNS. UDP uses the same port number namespace as TCP — each port can be used independently by UDP and TCP. A service can listen on both UDP/53 and TCP/53 simultaneously (DNS does exactly this).', color: '#8b5cf6' },
  { name: 'Length', bits: '16 bits', value: '29 bytes', description: 'Total length of the UDP header (8 bytes) plus data. Minimum value: 8 (header only, no data). Maximum: 65535 bytes — but in practice limited by IP fragmentation (IPv4 max 65507 bytes of UDP data before fragmentation; IPv6 allows jumbo-grams).', color: G },
  { name: 'Checksum', bits: '16 bits', value: '0x1A4F', description: 'One\'s complement checksum over UDP header + data + pseudo-header (source IP, destination IP, protocol=17, UDP length). Optional in IPv4 (all-zeros = no checksum). MANDATORY in IPv6. If the checksum is wrong, the datagram is silently discarded — no error message, no retransmission. The sender never knows.', color: '#f97316' },
  { name: 'Data (Payload)', bits: 'Variable', value: 'DNS query (21 bytes)', description: 'Application data. For DNS: query ID (2B), flags (2B), question section with domain name and type. UDP delivers this payload as a complete unit — the receiver always gets the entire datagram or nothing at all. This atomic delivery is a key UDP property that TCP does not offer.', color: '#06b6d4' },
]

function UdpHeaderDissector() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>UDP Header Dissector</h3>
      <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--text-muted)' }}>
        UDP&apos;s entire header is 8 bytes — 4 fields. Click each to understand what it does and what TCP drops to achieve that simplicity.
      </p>

      <div style={{ display: 'flex', gap: 4, marginBottom: 16, flexWrap: 'wrap' }}>
        {UDP_FIELDS.map((f, i) => (
          <div
            key={f.name}
            onClick={() => setActive(active === i ? null : i)}
            style={{
              flex: i === UDP_FIELDS.length - 1 ? '1 1 200px' : '1 1 80px',
              padding: '10px 8px',
              borderRadius: 6,
              background: active === i ? f.color : `${f.color}18`,
              border: `1px solid ${f.color}`,
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all .15s',
            }}
          >
            <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: active === i ? '#fff' : f.color }}>{f.name}</p>
            <p style={{ margin: 0, fontSize: 10, color: active === i ? '#ffffffcc' : 'var(--text-muted)' }}>{f.bits}</p>
            <p style={{ margin: 0, fontSize: 11, fontFamily: 'var(--font-mono)', color: active === i ? '#fff' : 'var(--text)' }}>{f.value}</p>
          </div>
        ))}
      </div>

      {active !== null ? (
        <div style={{ background: 'var(--surface)', border: `1px solid ${UDP_FIELDS[active].color}`, borderRadius: 8, padding: '14px 16px' }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
            <span style={{ background: UDP_FIELDS[active].color, color: '#fff', borderRadius: 4, padding: '2px 10px', fontSize: 12, fontWeight: 700 }}>{UDP_FIELDS[active].name}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{UDP_FIELDS[active].bits}</span>
          </div>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>{UDP_FIELDS[active].description}</p>
        </div>
      ) : (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
          Click any field above to inspect it
        </div>
      )}
    </div>
  )
}

/* ── Interactive Component 3: UDP Application Protocol Selector ──────────── */

interface UdpApp {
  name: string
  port: string
  category: string
  whyUdp: string
  lossHandling: string
  reliability: string
  example: string
  color: string
}

const UDP_APPS: UdpApp[] = [
  {
    name: 'DNS',
    port: 'UDP 53 (TCP 53 for large)',
    category: 'Query-Response',
    whyUdp: 'Each DNS query is a small, self-contained request-response. A single UDP datagram fits the entire exchange. TCP would add 1 RTT of handshake overhead — doubling latency for a 50-byte transaction.',
    lossHandling: 'Client-side timeout and retry. If no response within 3-5s, resend (possibly to another resolver). Simple and effective for short queries.',
    reliability: 'Application-level retry',
    example: 'dig @8.8.8.8 example.com A',
    color: G,
  },
  {
    name: 'DNS over TCP',
    port: 'TCP 53',
    category: 'Fallback / Large Responses',
    whyUdp: 'DNS uses TCP when responses exceed 512 bytes (or 4096 with EDNS0), for zone transfers (AXFR), and for DNSSEC responses. The TC (TruncatedResponse) bit in a UDP DNS response tells the client to retry over TCP.',
    lossHandling: 'TCP handles reliability. Zone transfers can be megabytes — too large for repeated UDP retries.',
    reliability: 'TCP guaranteed delivery',
    example: 'dig @8.8.8.8 example.com ANY +tcp',
    color: '#3b82f6',
  },
  {
    name: 'NTP',
    port: 'UDP 123',
    category: 'Time Synchronization',
    whyUdp: 'NTP timestamps must be as precise as possible. TCP adds variable latency (retransmission, ACK timing) that would corrupt the timing measurement. UDP allows precise timestamping of when each packet was sent and received.',
    lossHandling: 'NTP uses multiple servers and statistical filtering — occasional lost packets don\'t matter, only the statistical sample matters.',
    reliability: 'Statistical averaging over multiple samples',
    example: 'ntpdate -q pool.ntp.org',
    color: '#8b5cf6',
  },
  {
    name: 'QUIC / HTTP/3',
    port: 'UDP 443',
    category: 'Reliable Transport (User Space)',
    whyUdp: 'QUIC implements TCP-equivalent reliability in user space on top of UDP, but without TCP\'s head-of-line blocking. A lost UDP datagram only blocks one QUIC stream, not all streams. Also enables 0-RTT connection establishment (faster than TLS 1.3 over TCP).',
    lossHandling: 'Built-in QUIC reliability: ACKs, retransmission, flow control — all in user-space code, not kernel. Faster iteration than kernel TCP.',
    reliability: 'QUIC ACK/retransmit (user space)',
    example: 'curl --http3 https://www.google.com',
    color: '#f97316',
  },
  {
    name: 'RTP (VoIP/Video)',
    port: 'UDP 5004+ (dynamic)',
    category: 'Real-Time Media',
    whyUdp: 'Voice and video are delay-sensitive. A 150ms delay in voice is perceptible; a 300ms delay causes conversation breakdown. TCP retransmission of a lost packet arrives too late to be useful — better to interpolate or skip the lost frame. UDP allows delivery of the next packet without waiting for retransmission.',
    lossHandling: 'Tolerate loss. Codecs use concealment (interpolation). 1-5% packet loss is acceptable for voice; 10% causes audible degradation.',
    reliability: 'Application-level concealment, no retransmit',
    example: 'RTP stream: ffmpeg -i input.mp3 -f rtp rtp://192.168.1.100:5004',
    color: '#ec4899',
  },
  {
    name: 'DHCP',
    port: 'UDP 67/68',
    category: 'Bootstrap Protocol',
    whyUdp: 'DHCP clients have no IP address when they start — they cannot initiate TCP connections (which require a source IP). UDP allows sending with source 0.0.0.0 and destination 255.255.255.255 (broadcast), which bootstraps the address assignment process.',
    lossHandling: 'Simple retry: if no OFFER received in N seconds, resend DISCOVER. Client-side exponential backoff.',
    reliability: 'Application-level retry with broadcast',
    example: 'dhclient -v eth0',
    color: '#06b6d4',
  },
]

function UdpApplicationExplorer() {
  const [selected, setSelected] = useState(0)
  const app = UDP_APPS[selected]

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>UDP Application Protocol Explorer</h3>
      <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--text-muted)' }}>
        Select a protocol to understand the specific reason UDP was chosen over TCP — each represents a different category of use case.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
        {UDP_APPS.map((a, i) => (
          <button key={a.name} onClick={() => setSelected(i)}
            style={{ padding: '6px 14px', borderRadius: 20, border: `1px solid ${i === selected ? a.color : 'var(--border)'}`, background: i === selected ? a.color : 'var(--surface)', color: i === selected ? '#fff' : 'var(--text-muted)', fontSize: 12, fontWeight: i === selected ? 700 : 400, cursor: 'pointer' }}>
            {a.name}
          </button>
        ))}
      </div>

      <div style={{ background: 'var(--surface)', border: `1px solid ${app.color}`, borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ background: app.color, color: '#fff', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>{app.name}</span>
          <span style={{ fontSize: 12, opacity: 0.9 }}>{app.port} — {app.category}</span>
        </div>
        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>WHY UDP SPECIFICALLY</p>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>{app.whyUdp}</p>
          </div>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>HOW LOSS IS HANDLED</p>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>{app.lossHandling}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>RELIABILITY MECHANISM</p>
              <p style={{ margin: 0, fontSize: 13, color: app.color, fontWeight: 600 }}>{app.reliability}</p>
            </div>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>EXAMPLE COMMAND</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text)', lineHeight: 1.5 }}>{app.example}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main export ──────────────────────────────────────────────────────────── */

export default function Udp() {
  return (
    <LearnLayout
      title="UDP — The Protocol That Trusts You"
      description="A deep-dive into UDP's minimalist design philosophy — covering its 8-byte header, datagram delivery semantics, why latency-sensitive and broadcast applications need it, UDP amplification attacks, and how QUIC builds reliability on top of UDP in user space."
      section="Networking Fundamentals — Module 21"
      readTime="18–24 min"
      updatedAt="May 2026"
    >
      {/* Chapter 01 */}
      <Chapter n={1} />
      <H2>When Less Is More</H2>

      <StoryBox>
        The year is 1983. The internet is small. Every host is trusted. Performance is precious. Jon Postel notices that many applications don&apos;t need TCP&apos;s machinery — DNS just needs a single question and answer; NTP needs precise timing without retransmission overhead; routing protocols need to broadcast to neighbors without establishing connections first.
        <br /><br />
        He writes RFC 768 in eight pages. The resulting protocol — UDP — has no connection establishment, no sequence numbers, no acknowledgments, no flow control, no congestion control, and no retransmission. Its header is 8 bytes: source port, destination port, length, checksum. That&apos;s it. If you want reliability, write it yourself.
        <br /><br />
        UDP is not a broken TCP. It is a deliberate choice: a raw packet delivery service that gives applications the power to implement exactly the semantics they need, without paying for semantics they don&apos;t.
      </StoryBox>

      <Para>UDP (User Datagram Protocol) is defined in RFC 768 (1980). It provides: <Accent>connectionless delivery</Accent> (no setup, no teardown, just send), <Accent>datagram semantics</Accent> (each packet is independent and atomic — delivered completely or not at all), <Accent>multiplexing</Accent> (port numbers identify applications), and <Accent>optional integrity checking</Accent> (checksum, mandatory in IPv6). Everything else is the application&apos;s responsibility.</Para>

      <Para>The trade-off: UDP sends faster than TCP (no handshake), has lower per-packet overhead (8 bytes vs TCP&apos;s 20+), and introduces no head-of-line blocking. The price: no delivery guarantee, no ordering, no flow control. Lose a packet? Nobody tells you. Packets arrive out of order? You sort them yourself.</Para>

      <WowBox>
        UDP carries more internet traffic by volume than TCP in some categories. Real-time video streaming (Netflix, YouTube, gaming), VoIP, DNS — all UDP. Zoom Video Communications analyzed their traffic and found UDP significantly outperforms TCP for video conferencing: TCP&apos;s retransmission creates 200–500ms jitter spikes that destroy call quality, while UDP with application-level concealment produces tolerable degradation. The QUIC protocol (HTTP/3) adds reliability on top of UDP to get the best of both worlds.
      </WowBox>

      <Divider />

      {/* Chapter 02 */}
      <Chapter n={2} />
      <H2>The 8-Byte Header</H2>

      <StoryBox>
        TCP&apos;s header is at least 20 bytes and up to 60 bytes with options. UDP&apos;s header is exactly 8 bytes. Always. No options, no variable-length fields, no state. The simplicity is not laziness — it is engineering. Every byte of header is overhead that does not carry application data. For a 12-byte DNS query, TCP adds more overhead than the DNS payload itself.
      </StoryBox>

      <UdpHeaderDissector />

      <H3>The Checksum Optional Problem</H3>
      <Para>In IPv4, the UDP checksum is technically optional (all-zero checksum means &quot;no checksum calculated&quot;). This was designed for low-overhead local network communication — a shortcut that was acceptable in 1980. In practice, all modern UDP senders compute checksums because:</Para>
      <Para>• Modern NICs compute UDP checksums in hardware at no CPU cost (UDP checksum offload)</Para>
      <Para>• Silent data corruption (bit flip in payload, no checksum) is far worse than the microscopic overhead of checksum computation</Para>
      <Para>• IPv6 mandates UDP checksum — skipping it on IPv4 creates inconsistency</Para>

      <Para>The edge case where skipping UDP checksum is intentional: <Accent>UDP tunnel encapsulation</Accent>. VXLAN, GENEVE, and other tunneling protocols may skip the outer UDP checksum because the inner payload has its own integrity protection. This is a deliberate optimization for data center overlay networks where the outer IP+UDP header is added by the kernel and the inner payload checksum is already validated by the application.</Para>

      <Divider />

      {/* Chapter 03 */}
      <Chapter n={3} />
      <H2>UDP vs TCP — The Right Tool for the Job</H2>

      <StoryBox>
        A developer is building a real-time multiplayer game. She implements it over TCP because &quot;TCP is reliable.&quot; Players immediately notice that the game stutters when any single packet is lost — all subsequent game state updates are held up waiting for the retransmitted packet. The 20ms delay becomes 200ms. The fix: switch to UDP, send the full game state in every packet, discard old packets that arrive late, and tolerate occasional missing state updates with client-side interpolation. TCP&apos;s &quot;reliability&quot; was actively harmful.
      </StoryBox>

      <UdpVsTcpRace />

      <Para>The decision of UDP vs TCP comes down to one fundamental question: <Accent>does your application need in-order, reliable delivery — or does it need low latency and self-managed loss handling?</Accent></Para>

      <Para>UDP excels for applications where:</Para>
      <Para>• Transactions are short (small request + small response)</Para>
      <Para>• Latency matters more than completeness (real-time media)</Para>
      <Para>• Loss is tolerable or handles gracefully (video codecs, game state)</Para>
      <Para>• Broadcast/multicast is needed (DHCP, mDNS, SSDP)</Para>
      <Para>• The application provides its own, more appropriate reliability (QUIC, game state sync)</Para>

      <Divider />

      {/* Chapter 04 */}
      <Chapter n={4} />
      <H2>UDP Applications — A Taxonomy</H2>

      <StoryBox>
        Not all UDP uses are alike. DNS uses UDP for brevity. NTP uses UDP for timing precision. RTP uses UDP for real-time delivery. DHCP uses UDP because it has no IP address yet. QUIC uses UDP to circumvent kernel protocol ossification. Each represents a distinct category of why UDP is the right choice — and each handles loss differently.
      </StoryBox>

      <UdpApplicationExplorer />

      <H3>UDP Multicast and Broadcast</H3>
      <Para>UDP supports broadcast (<Code>255.255.255.255</Code> or subnet broadcast) and multicast (IP range 224.0.0.0–239.255.255.255) — something TCP fundamentally cannot do, since TCP requires a connection between exactly two endpoints. This makes UDP the only option for:</Para>

      <Para>• <Accent>DHCP</Accent>: before a client has an IP, it must broadcast. DHCP DISCOVER goes to 255.255.255.255.</Para>
      <Para>• <Accent>mDNS (Multicast DNS)</Accent>: zero-configuration name resolution on local networks. Chromecasts, AirPrint printers, and Apple Bonjour use mDNS on 224.0.0.251:5353.</Para>
      <Para>• <Accent>SSDP (Simple Service Discovery Protocol)</Accent>: UPnP device discovery. Smart home devices, network printers. Multicast to 239.255.255.250:1900.</Para>
      <Para>• <Accent>Routing protocols</Accent>: OSPF uses 224.0.0.5/224.0.0.6, RIP uses 224.0.0.9, EIGRP uses 224.0.0.10 — all via IP multicast over UDP.</Para>
      <Para>• <Accent>Video distribution</Accent>: IPTV systems multicast video streams to thousands of subscribers simultaneously. Each subscriber&apos;s set-top box joins the multicast group; the router sends one stream that fans out to all members.</Para>

      <Divider />

      {/* Chapter 05 */}
      <Chapter n={5} />
      <H2>UDP and Firewalls — The Stateless Challenge</H2>

      <StoryBox>
        A stateful firewall tracks TCP connections in a session table. SYN opens an entry; FIN closes it. The firewall knows which packets belong to established connections and which are unsolicited. Simple and clean.
        <br /><br />
        UDP has no connection. How does a stateful firewall handle UDP? It creates a pseudo-connection entry based on 5-tuple (src IP, src port, dst IP, dst port, protocol). When a UDP packet leaves the network, the firewall creates an entry expecting a reply from the same remote IP:port within a timeout (typically 30–300 seconds). This allows most UDP applications to work through firewalls. But it creates edge cases that bite UDP application developers constantly.
      </StoryBox>

      <Para>Key UDP + firewall interaction issues:</Para>

      <Para>• <Accent>Asymmetric UDP flows</Accent>: in media streaming, the server may send UDP packets from a different port than the one the client sent to (RTP uses separate ports for each media stream). The firewall does not have a state entry for the server&apos;s sending port, and drops the inbound traffic.</Para>
      <Para>• <Accent>UDP timeout too short</Accent>: long-running UDP applications (online games) must send keepalives to maintain the firewall state entry. If the game stops sending for 30+ seconds during a loading screen, the firewall entry expires and the game&apos;s UDP stream is blocked when it resumes.</Para>
      <Para>• <Accent>NAT and UDP</Accent>: NAT creates entries for UDP flows but with shorter timeouts than TCP. A DNS query UDP NAT entry expires in 30 seconds (unnecessary after the response). A game UDP NAT entry needs to last hours. NAT devices must balance entry lifetime vs. table size.</Para>

      <CodeBlock>{`# iptables UDP stateful tracking
# Allow established UDP (stateful tracking via conntrack)
iptables -A INPUT  -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
iptables -A OUTPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# Allow specific outbound UDP (DNS, NTP)
iptables -A OUTPUT -p udp --dport 53 -j ACCEPT
iptables -A OUTPUT -p udp --dport 123 -j ACCEPT

# Allow DHCP on local network
iptables -A INPUT  -i eth0 -p udp --dport 68 -j ACCEPT  # DHCP client receive
iptables -A OUTPUT -o eth0 -p udp --dport 67 -j ACCEPT  # DHCP discover

# UDP conntrack timeout tuning
# Default UDP timeout is 30s (usually too short for games/VOIP)
sysctl -w net.netfilter.nf_conntrack_udp_timeout=180      # 3 minutes
sysctl -w net.netfilter.nf_conntrack_udp_timeout_stream=300  # 5 minutes for streams`}</CodeBlock>

      <Divider />

      {/* Chapter 06 */}
      <Chapter n={6} />
      <H2>UDP Amplification Attacks</H2>

      <StoryBox>
        In February 2018, GitHub received the largest DDoS attack recorded at the time: 1.35 Tbps. The attack used Memcached servers — a UDP-based caching system. The attacker sent small UDP requests (15 bytes) to thousands of open Memcached servers, spoofing the source IP as GitHub&apos;s. The Memcached servers responded with large responses (up to 1 MB each) — directly to GitHub. The amplification factor: 51,000×. One byte of attacker traffic generated 51,000 bytes of attack traffic at the victim.
        <br /><br />
        UDP amplification is possible because UDP is connectionless. There is no handshake to verify the source IP. Any UDP service that generates a larger response than request can be weaponized.
      </StoryBox>

      <Para>UDP amplification attacks work via three properties:</Para>
      <Para>1. <Accent>IP spoofing</Accent>: UDP has no 3-way handshake, so source IP cannot be verified by the responding server.</Para>
      <Para>2. <Accent>Amplification factor</Accent>: response is much larger than request (DNS: 40-50×, NTP: 556×, Memcached: 51,000×).</Para>
      <Para>3. <Accent>Reflection</Accent>: response goes to the spoofed (victim) IP, not back to the attacker.</Para>

      <Para>Notable UDP amplification vectors:</Para>
      <Para>• <Accent>DNS</Accent>: ANY queries can return large DNSSEC responses. Amplification 40–50×.</Para>
      <Para>• <Accent>NTP monlist</Accent>: deprecated NTP command returns list of recent NTP clients. Amplification 556×. Fixed by disabling monlist in NTP.</Para>
      <Para>• <Accent>SSDP</Accent>: M-SEARCH requests generate large responses from UPnP devices. Amplification 30×.</Para>
      <Para>• <Accent>Memcached over UDP</Accent>: disabled by default in modern versions after the 2018 GitHub attack.</Para>
      <Para>• <Accent>CLDAP (Connection-less LDAP)</Accent>: amplification 70×. Publicly accessible LDAP servers.</Para>

      <Warn>
        Defending against UDP amplification requires both victim-side and infrastructure-side mitigations. Victim-side: anycast-based DDoS scrubbing, BGP RTBH (Remote Triggered Black Hole). Infrastructure-side: BCP38 (network ingress filtering — ISPs should block traffic with spoofed source IPs leaving their networks). BCP38 adoption is incomplete — many ISPs allow IP spoofing from their customers, enabling amplification attacks to this day.
      </Warn>

      <CodeBlock>{`# Check if your DNS server is open to amplification (nmap)
nmap -sU -p 53 --script dns-recursion 203.0.113.1

# Check NTP monlist (should fail on patched NTP)
ntpdc -c monlist 203.0.113.1 2>&1 | head

# Disable UDP for Memcached (prevents amplification)
# memcached.conf
-U 0                          # Disable UDP entirely
# or
--port 11211 --no-udp         # TCP only

# Rate-limit DNS responses to prevent amplification (BIND)
options {
    rate-limit {
        responses-per-second 10;
        window 5;
    };
};`}</CodeBlock>

      <Divider />

      {/* Chapter 07 */}
      <Chapter n={7} />
      <H2>Building Reliability on UDP — Application-Layer Solutions</H2>

      <StoryBox>
        UDP is often compared to the postal service: you can send a letter, but you don&apos;t get a delivery confirmation, and letters might arrive out of order. If you need confirmation, you add a return receipt — an application-layer mechanism.
        <br /><br />
        Many protocols do exactly this: build their own lightweight reliability on top of UDP, tailored precisely to their needs rather than accepting TCP&apos;s one-size-fits-all semantics. DNS uses transaction IDs + client-side retry. RTP uses sequence numbers + RTCP feedback for quality monitoring. QUIC implements full TCP-equivalent reliability in user space. The common thread: UDP provides the raw delivery mechanism; the application adds exactly the reliability it needs.
      </StoryBox>

      <H3>QUIC — The Paradigm Shift</H3>
      <Para>QUIC (RFC 9000) is Google&apos;s answer to TCP limitations, implemented in user space over UDP. It achieves:</Para>
      <Para>• <Accent>0-RTT connection establishment</Accent> (subsequent connections): send data in the first packet. TCP TLS 1.3 needs 1 RTT minimum for the handshake.</Para>
      <Para>• <Accent>Stream-level head-of-line blocking elimination</Accent>: a lost packet blocks only the QUIC stream that contains it, not all streams on the connection.</Para>
      <Para>• <Accent>Connection migration</Accent>: the connection ID is independent of IP address. When a mobile device switches from Wi-Fi to cellular, the QUIC connection continues without re-establishment.</Para>
      <Para>• <Accent>User-space implementation</Accent>: QUIC is in the application or library, not the kernel. Protocol improvements deploy with application updates, not OS kernel patches.</Para>

      <Para>QUIC uses <Accent>UDP port 443</Accent> and fires a <Accent>Version Negotiation</Accent> packet if the receiver doesn&apos;t understand the version. Firewalls see a UDP flow to port 443 — most corporate firewalls allow this (HTTPS). QUIC&apos;s use of UDP is partly an engineering choice and partly a pragmatic decision to traverse firewalls that might block new TCP options or protocols.</Para>

      <CodeBlock>{`# Test QUIC / HTTP/3 support
curl --http3 https://cloudflare.com          # Requires curl with HTTP/3 support
curl -I --http3 https://www.google.com

# Verify QUIC is being used (look for QUIC header in response)
curl -v --http3 https://cloudflare.com 2>&1 | grep -i "QUIC\|alt-svc"

# Wireshark filter for QUIC traffic
# udp.port == 443 and quic

# QUIC in server code (Go example with quic-go library)
# server.ListenAndServeTLS("0.0.0.0:443", certFile, keyFile, handler)
# This serves both TCP (HTTP/1.1, HTTP/2) and QUIC (HTTP/3) on the same port`}</CodeBlock>

      <Divider />

      {/* Chapter 08 */}
      <Chapter n={8} />
      <H2>UDP Socket Programming</H2>

      <StoryBox>
        A network programmer opens a UDP socket. They notice something strange: calling <code>connect()</code> on a UDP socket does not establish a connection or send any packets. It just sets the default destination address and filters incoming packets. Nothing went over the wire. This surprises almost every developer who first encounters UDP sockets — the API is shared with TCP but the semantics are completely different.
      </StoryBox>

      <CodeBlock>{`# UDP server in Python
import socket

# Create UDP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(('0.0.0.0', 9999))

while True:
    data, addr = sock.recvfrom(65535)   # Receive up to 65535 bytes
    print(f"Received {len(data)} bytes from {addr}: {data.decode()}")
    sock.sendto(b"Echo: " + data, addr)  # Echo back to sender

---

# UDP client in Python
import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
# UDP connect() does NOT send any packet — just sets default destination
# and allows using send() instead of sendto()
sock.connect(('127.0.0.1', 9999))
sock.send(b"Hello UDP")
response = sock.recv(65535)
print(response)

---

# Key UDP socket options
sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)    # Enable broadcast
sock.setsockopt(socket.SOL_SOCKET, socket.SO_RCVBUF, 8388608) # 8 MB receive buffer
sock.setsockopt(socket.IPPROTO_IP, socket.IP_MULTICAST_TTL, 2) # Multicast TTL

# Join multicast group (for receiving multicast traffic)
import struct
mcast_group = socket.inet_aton('224.0.0.251')   # mDNS multicast
interface   = socket.inet_aton('0.0.0.0')
sock.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP,
                struct.pack('4s4s', mcast_group, interface))`}</CodeBlock>

      <H3>UDP Receive Buffer Management</H3>
      <Para>UDP receive buffers are particularly important because UDP datagrams arrive at the rate the sender sends them — there is no TCP flow control to slow the sender. If the application cannot read from the socket fast enough, the kernel buffer fills and <Accent>datagrams are silently dropped</Accent>. Unlike TCP which applies backpressure, UDP simply discards packets when the buffer is full.</Para>

      <Para>Monitoring UDP receive drops:</Para>
      <CodeBlock>{`# Check UDP receive errors (Linux)
netstat -su                              # UDP socket statistics
cat /proc/net/snmp | grep Udp           # UDP MIB counters
ss -uap                                 # Active UDP sockets with statistics

# Key counter: RcvbufErrors — datagrams dropped due to full receive buffer
# If this number is increasing, your application is too slow to consume UDP data

# Increase system-wide UDP receive buffer maximum
sysctl -w net.core.rmem_max=8388608    # 8 MB max receive buffer

# Set per-socket buffer in application
sock.setsockopt(socket.SOL_SOCKET, socket.SO_RCVBUF, 4194304)  # 4 MB`}</CodeBlock>

      <Divider />

      {/* Chapter 09 */}
      <Chapter n={9} />
      <H2>UDP Fragmentation and Jumbograms</H2>

      <StoryBox>
        A developer builds a UDP application that sends 10,000-byte messages. It works perfectly on the local network. The moment it goes through the internet (MTU 1500 bytes), strange things happen. Sometimes messages arrive. Sometimes they don&apos;t. Occasionally they arrive partially corrupted. The developer assumes network problems. The actual issue: IP fragmentation.
        <br /><br />
        UDP has no MTU awareness. Send a 10,000-byte UDP datagram over a 1500-byte MTU path, and IP must fragment it into 7 packets. If any single fragment is lost, the entire datagram is dropped — the receiver has no way to reassemble a partial datagram. On a path with even 1% per-packet loss, a 7-fragment datagram has a 7% delivery failure rate. Fragmentation is reliable packet loss.
      </StoryBox>

      <Para>UDP applications should avoid fragmentation by sizing datagrams to fit within the path MTU:</Para>
      <Para>• IPv4: max datagram size to avoid fragmentation on standard internet = 1472 bytes (1500 MTU - 20 IP - 8 UDP)</Para>
      <Para>• IPv6: max without fragmentation = 1452 bytes (1500 - 40 IPv6 - 8 UDP)</Para>
      <Para>• UDP jumbograms (RFC 2675): IPv6 allows payload {'>'} 65535 bytes via the Jumbo Payload option. Requires support throughout the path, used only in controlled networks (HPC clusters, data center backplanes).</Para>

      <Para>The <Accent>DF bit</Accent> can be set on the IP header encapsulating a UDP datagram. If the datagram is too large for a link, the router sends ICMP Fragmentation Needed (Type 3 Code 4) back to the sender. The application can then reduce datagram size. This is PMTUD for UDP — but only works if the application handles ICMP errors (most do not) and if ICMP Type 3/4 is not filtered.</Para>

      <Divider />

      {/* Chapter 10 */}
      <Chapter n={10} />
      <H2>UDP in Cloud and Modern Infrastructure</H2>

      <StoryBox>
        Cloud load balancers present a challenge for UDP. A TCP load balancer can track connection state and route all packets from the same TCP connection to the same backend. UDP has no connections — each datagram is independent. A DNS query could go to any backend. A QUIC connection (using a QUIC connection ID) must go to the same backend for the duration of the session. Solving this requires stateful UDP tracking or consistent-hash based routing — neither of which is built into UDP itself.
      </StoryBox>

      <Para>Key considerations for UDP in cloud environments:</Para>

      <Para>• <Accent>AWS Network Load Balancer (NLB)</Accent>: supports UDP by routing based on flow hash (5-tuple). UDP datagrams with the same 5-tuple always route to the same backend. This works for QUIC (same source IP:port per connection) but not for protocols that change source ports.</Para>

      <Para>• <Accent>Security groups for UDP</Accent>: AWS security groups are stateful for UDP in the same way as TCP — outbound UDP creates a state entry that allows the inbound response. Inbound UDP rules must explicitly allow the protocol and port for listening services.</Para>

      <Para>• <Accent>QUIC in load balancers</Accent>: QUIC connection IDs (not IP 5-tuple) should identify a session for proper connection affinity. RFC 9000 defines a stable connection ID for this purpose. Modern load balancers (Cloudflare, nginx, HAProxy 2.6+) support QUIC connection ID-based routing.</Para>

      <CodeBlock>{`# AWS: Allow UDP in Security Group (Terraform)
resource "aws_security_group_rule" "dns_udp" {
  type              = "ingress"
  from_port         = 53
  to_port           = 53
  protocol          = "udp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.dns.id
}

# Allow QUIC (HTTP/3) — UDP 443
resource "aws_security_group_rule" "quic" {
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "udp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.web.id
}

# nginx UDP load balancing (for DNS/QUIC)
stream {
    upstream dns_backend {
        server 10.0.0.1:53;
        server 10.0.0.2:53;
    }
    server {
        listen 53 udp;
        proxy_pass dns_backend;
        proxy_timeout 1s;
        proxy_responses 1;        # Number of UDP responses per request
    }
}`}</CodeBlock>

      <Divider />

      {/* Chapter 11 */}
      <Chapter n={11} />
      <H2>Troubleshooting UDP Applications</H2>

      <StoryBox>
        A VoIP call sounds choppy and robotic. The developer checks: packet loss? Zero. Latency? 50ms average. Then they look at jitter — the variation in packet arrival times — and find it is 40ms. The audio codec buffers 20ms of audio. When packets arrive with 40ms variation, some arrive after the playback deadline and must be discarded. The choppy sound is not packet loss — it is jitter-induced packet discard. The fix: increase the jitter buffer size from 20ms to 80ms. Calls become clear, at the cost of 60ms extra latency.
      </StoryBox>

      <CodeBlock>{`# UDP troubleshooting toolkit

# 1. Capture UDP traffic
tcpdump -i eth0 -n udp port 5353      # mDNS
tcpdump -i eth0 -n udp port 53        # DNS
tcpdump -i eth0 -n 'udp and port not 53 and port not 123'  # Non-DNS/NTP UDP

# 2. Check UDP socket statistics
ss -uanp                               # All UDP sockets with process info
ss -uap | grep UNCONN                  # Unconnected UDP listeners

# 3. Monitor packet drops
watch -n 1 'netstat -su | grep errors'
# Look for: RcvbufErrors (buffer overflow), InErrors (checksum), SndbufErrors

# 4. Test UDP connectivity (netcat)
nc -u -l 9999                          # UDP server on port 9999
echo "test" | nc -u 10.0.0.1 9999     # UDP client, send one datagram

# 5. DNS over UDP debugging
dig @8.8.8.8 example.com +notcp        # Force UDP for DNS
dig @8.8.8.8 example.com +stats        # Show timing, query size

# 6. Jitter measurement
ping -i 0.05 -c 200 10.0.0.1 | tail -3  # 200 pings at 50ms interval
mtr --report --interval 0.1 10.0.0.1    # 100ms interval mtr

# 7. Bandwidth test over UDP
iperf3 -c 10.0.0.1 -u -b 100M         # UDP bandwidth test at 100 Mbps
iperf3 -c 10.0.0.1 -u -b 1G --reverse # Test from server to client`}</CodeBlock>

      <Divider />

      {/* Chapter 12 */}
      <Chapter n={12} />
      <H2>UDP Security Hardening</H2>

      <StoryBox>
        A company deploys a UDP-based IoT telemetry system. Thousands of sensors send UDP datagrams to a central collector every second. An attacker discovers the UDP port and begins sending crafted datagrams. Because UDP is connectionless, the collector processes every packet — including the attacker&apos;s. The collector is overwhelmed (UDP flood). Then the attacker crafts valid-looking telemetry with malicious values, and the processing application crashes on an integer overflow.
        <br /><br />
        UDP applications must be hardened against both volumetric (flood) and semantic (malformed input) attacks, because UDP provides no connection verification.
      </StoryBox>

      <Para>UDP security hardening checklist:</Para>
      <Para>• <Accent>Source IP validation</Accent>: for request-response protocols, the response is sent to the source IP. Without verification (impossible in basic UDP), any source IP can trigger responses directed at the spoofed IP (amplification). Mitigation: application-level tokens/cookies (DTLS cookies, QUIC initial tokens), or network-level ingress filtering (BCP38).</Para>
      <Para>• <Accent>Rate limiting</Accent>: at the network level (iptables rate limiting, cloud security groups) and application level (token bucket per source IP).</Para>
      <Para>• <Accent>Input validation</Accent>: every UDP datagram is untrusted. Validate length (check against declared length field), validate protocol version, validate field ranges. Never trust that a UDP packet came from who it says it did.</Para>
      <Para>• <Accent>DTLS (Datagram TLS)</Accent>: TLS for UDP. Provides authentication (you know who you are talking to), encryption, and replay protection. Used by WebRTC (DTLS-SRTP), CoAP (IoT protocol), and CAPWAP (wireless controller protocol).</Para>

      <CodeBlock>{`# iptables UDP rate limiting (protect against UDP flood)
iptables -A INPUT -p udp --dport 9999 -m hashlimit \
  --hashlimit-name udp_limit \
  --hashlimit-above 100/second \
  --hashlimit-mode srcip \
  --hashlimit-burst 200 \
  -j DROP

# DTLS in Python (using ssl module — requires Python 3.6+)
import ssl, socket

# DTLS server
context = ssl.SSLContext(ssl.PROTOCOL_DTLS_SERVER)
context.load_cert_chain('server.crt', 'server.key')
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock = context.wrap_socket(sock, server_side=True)
sock.bind(('0.0.0.0', 4433))`}</CodeBlock>

      <Divider />

      {/* Chapter 13 */}
      <Chapter n={13} />
      <H2>Common Misconceptions</H2>

      <Err>
        <strong>UDP is unreliable and should only be used when reliability doesn&apos;t matter.</strong> UDP is not unreliable — it delivers packets when the network delivers them. Many UDP applications implement their own reliability that is more appropriate than TCP&apos;s. QUIC has TCP-equivalent reliability over UDP. DNS has application-level retry. NTP uses statistical averaging. RTP uses application-level error concealment. The choice of UDP does not mean abandoning reliability — it means implementing the right reliability for the application.
      </Err>

      <Err>
        <strong>UDP always delivers a complete datagram or nothing at all.</strong> At the UDP layer, yes — the socket API delivers complete datagrams atomically. But at the IP layer, large UDP datagrams are fragmented. If any fragment is lost, the entire UDP datagram is silently discarded by the IP layer before UDP receives it. From the application&apos;s perspective, the datagram simply never arrived. This is why applications should size UDP datagrams to fit within the PMTU.
      </Err>

      <Err>
        <strong>UDP cannot be used behind firewalls.</strong> Stateful firewalls track UDP flows via pseudo-sessions (5-tuple timeout). Outbound UDP traffic creates entries that allow inbound replies. Most firewalls allow outbound UDP to common ports (53, 123, 443 for QUIC). Some environments block outbound UDP aggressively — QUIC falls back to TCP in these cases (the Alt-Svc header allows HTTP servers to advertise QUIC support; if QUIC fails, the browser uses HTTP/2 over TCP transparently).
      </Err>

      <Err>
        <strong>UDP amplification attacks are fixed by blocking UDP.</strong> Blocking outbound UDP breaks DNS (no name resolution), NTP (no time sync), DHCP (no IP assignment), and any UDP-based application. The fix for UDP amplification is: (1) configure open amplification services to disable UDP or rate-limit responses, (2) ISP network ingress filtering (BCP38) to prevent IP spoofing, (3) DDoS scrubbing at the victim. Blanket UDP blocking destroys legitimate functionality without eliminating the root cause.
      </Err>

      <Err>
        <strong>UDP connect() establishes a connection like TCP connect().</strong> UDP <Code>connect()</Code> does not send any packets. It simply associates a default remote address with the socket, enabling <Code>send()</Code> (instead of <Code>sendto()</Code>) and filtering incoming datagrams to only receive from that address. This is a local kernel operation. The remote host has no idea <Code>connect()</Code> was called. There is no connection to close — calling <Code>close()</Code> on a UDP socket just destroys the local file descriptor.
      </Err>

      <Err>
        <strong>QUIC is TCP over UDP.</strong> QUIC shares concepts with TCP (reliability, flow control, congestion control) but is not TCP. Key differences: QUIC has independent streams with no head-of-line blocking between them; QUIC&apos;s connection ID survives IP address changes (connection migration); QUIC integrates TLS 1.3 cryptography — there is no unencrypted QUIC; QUIC uses a different acknowledgment mechanism (QUIC ACK ranges, not TCP cumulative ACKs); QUIC&apos;s implementation is in user space (faster evolution) rather than the kernel.
      </Err>

      <Divider />

      {/* Chapter 14 */}
      <Chapter n={14} />
      <H2>Depth Check</H2>

      <IQ level="Beginner">
        What are the four fields in the UDP header? Source Port (16 bits), Destination Port (16 bits), Length (16 bits — header + data), Checksum (16 bits — optional in IPv4, mandatory in IPv6). Total: 8 bytes. Compared to TCP&apos;s minimum 20 bytes, UDP adds essentially no overhead.
      </IQ>

      <IQ level="Beginner">
        Why does DNS use UDP instead of TCP? DNS queries are small (typically under 512 bytes) and the exchange is a single request-response pair. UDP allows this in one round-trip. TCP would require an additional round-trip for the 3-way handshake before any DNS data could be exchanged — doubling the latency for a 50-byte transaction.
      </IQ>

      <IQ level="Intermediate">
        How does UDP amplification work and what makes it effective? An attacker sends small UDP packets to a server with a spoofed source IP (the victim&apos;s IP). The server sends a large response to the spoofed source — the victim. The attacker generates a small amount of traffic that causes the server to send a large amount of traffic to the victim. Effectiveness: (1) amplification factor can be 50–51,000×, (2) attacker&apos;s origin is hidden behind spoofed IPs, (3) victim&apos;s upstream link is flooded without the attacker needing equivalent bandwidth.
      </IQ>

      <IQ level="Senior">
        Explain how QUIC eliminates TCP&apos;s head-of-line blocking. TCP delivers bytes in order — a lost packet blocks all subsequent data from being delivered to the application. HTTP/2 multiplexes streams over one TCP connection, so a single lost packet blocks ALL streams. QUIC implements independent streams in user space over UDP. Each QUIC packet carries data for one or more streams. When a packet is lost, only the streams whose data was in that packet are blocked — other streams continue unaffected. This is analogous to multiple independent UDP flows (no ordering dependency between them) while still providing per-stream ordering and reliability.
      </IQ>

      <IQ level="PhD">
        Describe the QUIC Initial packet exchange and how it provides 0-RTT connection establishment while resisting replay attacks. QUIC Initial packets use QUIC-specific AEAD encryption (HKDF-derived from the destination connection ID) to provide obfuscation and integrity without secrecy. The Initial exchange performs TLS 1.3 ClientHello/ServerHello inside QUIC Initial frames, establishing session keys. For 0-RTT (repeat connections): the client uses a PSK (Pre-Shared Key) stored from a prior session, sending TLS 0-RTT data encrypted with the PSK in the first QUIC packet — data before the handshake completes. Replay attack protection: the server issues single-use replay protection tokens for 0-RTT data. The server may reject 0-RTT data that appears to be a replay (detected via token deduplication or anti-replay window). Applications using 0-RTT must be idempotent or accept replay risk — GET requests qualify, POST requests creating resources do not. The server signals acceptance of 0-RTT data in the ServerHello; if rejected, the client resends data in 1-RTT mode with full handshake security.
      </IQ>

      <Divider />

      <KeyTakeaways items={[
        'UDP provides connectionless, atomic datagram delivery with an 8-byte header. No handshake, no acknowledgments, no retransmission — applications implement exactly the reliability they need.',
        'UDP datagram delivery is atomic: the application receives the entire datagram or nothing. But large UDP datagrams are fragmented at the IP layer — any fragment loss silently discards the entire datagram.',
        'DNS uses UDP for brevity (1-RTT vs. TCP\'s 2-RTT minimum), NTP for timing precision, RTP for latency tolerance, DHCP because clients have no IP yet, and QUIC to avoid TCP head-of-line blocking.',
        'UDP multicast and broadcast enable one-to-many delivery — routing protocols, DHCP, mDNS, IPTV. TCP fundamentally cannot do this (requires point-to-point connection).',
        'Stateful firewalls track UDP via 5-tuple pseudo-sessions with timeout. Outbound UDP creates entries for inbound replies. Keepalives are needed for long-running UDP sessions (games, VoIP) to prevent firewall state expiry.',
        'UDP amplification attacks exploit connectionless delivery: spoofed source IP triggers large server responses directed at the victim. Mitigation: BCP38 ingress filtering at ISPs, disabling or rate-limiting open UDP amplifiers.',
        'QUIC (HTTP/3) implements TCP-equivalent reliability in user space over UDP, adding: 0-RTT setup, per-stream head-of-line blocking elimination, connection migration (IP change without reconnect), and integrated TLS 1.3.',
        'UDP receive buffer overflow silently drops datagrams — unlike TCP which applies backpressure. Monitor RcvbufErrors in netstat -su and increase SO_RCVBUF for high-throughput UDP applications.',
        'DTLS (Datagram TLS) adds authentication, encryption, and replay protection to UDP. Used by WebRTC (DTLS-SRTP), IoT protocols (CoAP), and wireless infrastructure (CAPWAP).',
        'UDP connect() does not send any packets — it only sets a default destination address and filters received datagrams. This surprises TCP developers: the API is shared, but UDP semantics are fundamentally different.',
      ]} />
    </LearnLayout>
  )
}
