'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const G = '#10b981'
const Chapter = ({ n }: { n: number }) => (
  <p style={{ fontSize: 11, color: G, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 6px', letterSpacing: '.12em', textTransform: 'uppercase' }}>// Chapter {n}</p>
)
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
const H2 = ({ children }: { children: React.ReactNode }) => <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', margin: '0 0 20px' }}>{children}</h2>
const H3 = ({ children }: { children: React.ReactNode }) => <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '28px 0 12px' }}>{children}</h3>
const Accent = ({ children }: { children: React.ReactNode }) => <strong style={{ color: G }}>{children}</strong>
const Code = ({ children }: { children: React.ReactNode }) => <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--code-bg)', padding: '2px 6px', borderRadius: 4, color: G }}>{children}</code>
const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', overflowX: 'auto', margin: '20px 0', lineHeight: 1.7, color: 'var(--text)' }}>{children}</pre>
)
const StoryBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${G}08`, border: `1px solid ${G}22`, borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>Story</p>
    <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)
const WowBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#8b5cf608', border: '1px solid #8b5cf630', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#8b5cf6', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>Wow</p>
    <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)
const Warn = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#f59e0b08', border: '1px solid #f59e0b30', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>Caution</p>
    <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)
const Err = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: '#ef444408', border: '1px solid #ef444430', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>Misconception — {title}</p>
    <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)
const IQ = ({ level, children }: { level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) => {
  const colors: Record<string, string> = { Beginner: '#10b981', Intermediate: '#3b82f6', Senior: '#8b5cf6', PhD: '#f97316' }
  const c = colors[level]
  return (
    <div style={{ background: `${c}08`, border: `1px solid ${c}30`, borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: c, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>IQ — {level}</p>
      <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
    </div>
  )
}

// ── Component 1: QUIC vs TCP Race ─────────────────────────────────────────────
interface RaceStep {
  id: number
  label: string
  tcpRtt: number
  quicRtt: number
  tcpDesc: string
  quicDesc: string
}
const RACE_STEPS: RaceStep[] = [
  { id: 1, label: 'DNS Lookup', tcpRtt: 1, quicRtt: 1, tcpDesc: 'DNS query to resolve hostname (UDP port 53)', quicDesc: 'Same DNS lookup — QUIC may cache server config in DNS HTTPS records' },
  { id: 2, label: 'Transport + Crypto', tcpRtt: 2, quicRtt: 1, tcpDesc: 'TCP SYN/SYN-ACK/ACK (1 RTT) + TLS 1.3 ClientHello/ServerHello (1 RTT) = 2 RTTs total', quicDesc: 'QUIC Initial packet combines transport params + TLS 1.3 in one UDP datagram = 1 RTT total' },
  { id: 3, label: '0-RTT Resumption', tcpRtt: 1, quicRtt: 0, tcpDesc: 'TLS 1.3 0-RTT still needs TCP SYN first — minimum 1 RTT', quicDesc: 'QUIC 0-RTT: send app data in first UDP packet — literally zero extra round trips' },
  { id: 4, label: 'First App Response', tcpRtt: 3, quicRtt: 2, tcpDesc: 'After handshake: request + response = 2 more RTTs. Grand total: ~3 RTTs', quicDesc: 'After handshake: request + response = 1 more RTT. Grand total: ~2 RTTs' },
]

function QuicTcpRace() {
  const [active, setActive] = useState(1)
  const step = RACE_STEPS.find(s => s.id === active)!
  const max = 4
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: '28px 24px', margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 18px' }}>QUIC vs TCP — Connection Race</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        {RACE_STEPS.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)}
            style={{ padding: '7px 14px', borderRadius: 8, border: `1px solid ${active === s.id ? G : 'var(--border)'}`, background: active === s.id ? `${G}15` : 'transparent', color: active === s.id ? G : 'var(--text)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            {s.label}
          </button>
        ))}
      </div>
      {[{ label: 'TCP + TLS', color: '#3b82f6', rtt: step.tcpRtt, desc: step.tcpDesc }, { label: 'QUIC', color: G, rtt: step.quicRtt, desc: step.quicDesc }].map(row => (
        <div key={row.label} style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: row.color, fontFamily: 'var(--font-mono)', minWidth: 80 }}>{row.label}</span>
            <div style={{ flex: 1, height: 26, background: 'var(--code-bg)', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ width: row.rtt === 0 ? '8%' : `${(row.rtt / max) * 100}%`, height: '100%', background: row.color, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 8, transition: 'width 0.3s ease', minWidth: 50 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>{row.rtt === 0 ? '0-RTT' : `${row.rtt} RTT`}</span>
              </div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, margin: '0 0 0 90px' }}>{row.desc}</p>
        </div>
      ))}
      {step.quicRtt < step.tcpRtt && (
        <div style={{ background: `${G}10`, border: `1px solid ${G}25`, borderRadius: 8, padding: '10px 16px', fontSize: 13, color: G, fontFamily: 'var(--font-mono)' }}>
          QUIC saves {step.tcpRtt - step.quicRtt} RTT{step.tcpRtt - step.quicRtt > 1 ? 's' : ''} at this stage
        </div>
      )}
    </div>
  )
}

// ── Component 2: QUIC Frame Inspector ────────────────────────────────────────
interface QuicFrame { id: string; type: string; typeHex: string; description: string; fields: { label: string; val: string }[]; note: string }
const QUIC_FRAMES: QuicFrame[] = [
  { id: 'stream', type: 'STREAM', typeHex: '0x08–0x0f', description: 'Carries application data for a specific stream. Multiple STREAM frames from different streams can coexist in one QUIC packet — this is how multiplexing works.', fields: [{ label: 'Stream ID', val: 'Unique per connection; low 2 bits encode direction and uni/bidi' }, { label: 'Offset', val: 'Byte offset in this stream — enables out-of-order delivery and reassembly' }, { label: 'Length', val: 'Optional — may be omitted when data fills remaining packet space' }, { label: 'Stream Data', val: 'Actual payload bytes — opaque to QUIC layer' }], note: 'HTTP/3 uses client-initiated bidirectional streams (IDs 0, 4, 8…). A lost packet only stalls the stream with the missing offset — other streams continue unaffected.' },
  { id: 'ack', type: 'ACK', typeHex: '0x02–0x03', description: 'Acknowledges received QUIC packets. Unlike TCP ACK (byte offset), QUIC ACK references packet numbers. Out-of-order delivery is expected and handled here.', fields: [{ label: 'Largest Acked', val: 'Highest packet number acknowledged' }, { label: 'ACK Delay', val: 'Time between receiving the packet and sending this ACK — improves RTT estimation' }, { label: 'ACK Ranges', val: 'Contiguous ranges of packet numbers — always like TCP SACK, never cumulative-only' }, { label: 'ECN Counts', val: 'Optional: CE/ECT0/ECT1 counts for congestion notification without loss' }], note: 'QUIC packet numbers are monotonically increasing and never reused — a retransmit gets a new packet number. This eliminates TCP retransmit ambiguity completely.' },
  { id: 'crypto', type: 'CRYPTO', typeHex: '0x06', description: 'Carries TLS 1.3 handshake messages (ClientHello, Certificate, Finished). Used in Initial and Handshake packet spaces before application keys are available.', fields: [{ label: 'Offset', val: 'Position in the TLS handshake byte stream' }, { label: 'Length', val: 'Length of TLS data in this frame' }, { label: 'Crypto Data', val: 'TLS 1.3 handshake message bytes (ClientHello, ServerHello, Certificate…)' }], note: 'Initial CRYPTO frames are protected only by Initial keys (derived from connection ID — not secret). They become encrypted once handshake keys exist.' },
  { id: 'new_cid', type: 'NEW_CONNECTION_ID', typeHex: '0x18', description: 'Provides alternative connection IDs. The foundation of connection migration — the peer can use any provided ID, allowing IP/port changes without connection teardown.', fields: [{ label: 'Sequence Number', val: 'Monotonically increasing — detects reordering of CID frames' }, { label: 'Retire Prior To', val: 'Retire all CIDs with sequence number below this value' }, { label: 'Connection ID', val: '8–20 bytes — new identifier peer may use for this connection' }, { label: 'Stateless Reset Token', val: '16-byte token — proves connection knowledge without session state' }], note: 'When your phone switches WiFi→LTE, the IP changes but the connection ID stays the same. The server recognizes it and continues all streams seamlessly after path validation.' },
  { id: 'close', type: 'CONNECTION_CLOSE', typeHex: '0x1c–0x1d', description: 'Terminates the connection. One frame in each direction — much faster than TCP 4-way FIN. No TIME_WAIT state.', fields: [{ label: 'Error Code', val: 'QUIC transport error code or application protocol error code' }, { label: 'Frame Type', val: 'Frame type that triggered the error (if transport error)' }, { label: 'Reason Phrase', val: 'Human-readable UTF-8 error description (may be empty)' }], note: 'QUIC connection close eliminates TIME_WAIT entirely. Server-side connection state can be freed immediately after the close frame is processed.' },
  { id: 'max_data', type: 'MAX_DATA', typeHex: '0x10', description: 'Connection-level flow control — raises the total byte limit across all streams. Prevents a fast sender from overwhelming a slow receiver at the connection level.', fields: [{ label: 'Maximum Data', val: 'Cumulative byte limit for all stream data on this connection' }], note: 'QUIC has two flow control levels: MAX_STREAM_DATA (per stream) and MAX_DATA (entire connection). HTTP/3 adds a third level via MAX_PUSH_ID.' },
]

function QuicFrameInspector() {
  const [sel, setSel] = useState('stream')
  const active = QUIC_FRAMES.find(f => f.id === sel)!
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: '28px 24px', margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 18px' }}>QUIC Frame Inspector</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
        {QUIC_FRAMES.map(f => (
          <button key={f.id} onClick={() => setSel(f.id)}
            style={{ padding: '7px 14px', borderRadius: 8, border: `1px solid ${sel === f.id ? G : 'var(--border)'}`, background: sel === f.id ? `${G}15` : 'transparent', color: sel === f.id ? G : 'var(--text)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-mono)' }}>
            {f.type}
          </button>
        ))}
      </div>
      <div style={{ background: `${G}07`, border: `1px solid ${G}22`, borderRadius: 10, padding: '18px 20px' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 10 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: 0 }}>{active.type}</p>
          <p style={{ fontSize: 11, color: '#6b7280', fontFamily: 'var(--font-mono)', margin: 0 }}>Type {active.typeHex}</p>
        </div>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.65, margin: '0 0 16px' }}>{active.description}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 14 }}>
          {active.fields.map(f => (
            <div key={f.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--code-bg)', borderRadius: 8, padding: '8px 12px' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em', minWidth: 110, flexShrink: 0 }}>{f.label}</span>
              <span style={{ fontSize: 12, color: 'var(--text)', fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}>{f.val}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: '#a3a3a3', lineHeight: 1.65, margin: 0, fontStyle: 'italic', borderTop: '1px solid var(--border)', paddingTop: 12 }}>{active.note}</p>
      </div>
    </div>
  )
}

// ── Component 3: HTTP Version Comparator ─────────────────────────────────────
interface HttpVer { id: string; name: string; transport: string; multiplexing: string; headerComp: string; holBlocking: string; tls: string; migration: string; year: string; note: string }
const HTTP_VERSIONS: HttpVer[] = [
  { id: 'h1', name: 'HTTP/1.1', transport: 'TCP', multiplexing: 'None — one request per connection (pipelining broken in practice)', headerComp: 'None — full headers resent every request', holBlocking: 'Both HTTP and TCP layers', tls: 'Optional', migration: 'No', year: '1997 (RFC 2068)', note: 'Workaround: browsers open 6 parallel TCP connections per origin. Domain sharding across multiple hostnames was common but is an anti-pattern in HTTP/2+.' },
  { id: 'h2', name: 'HTTP/2', transport: 'TCP', multiplexing: 'Yes — binary framing with stream IDs over one TCP connection', headerComp: 'HPACK — Huffman + dynamic indexed table', holBlocking: 'TCP layer remains — one lost packet stalls ALL streams', tls: 'Required by all browsers (de facto)', migration: 'No', year: '2015 (RFC 7540)', note: '1% packet loss on HTTP/2 is often worse than HTTP/1.1 with 6 connections — all streams share one TCP byte stream. Server push was deprecated in 2022.' },
  { id: 'h3', name: 'HTTP/3', transport: 'QUIC (UDP)', multiplexing: 'Yes — independent QUIC streams, no shared byte stream', headerComp: 'QPACK — redesigned for out-of-order QUIC delivery', holBlocking: 'None — a lost packet stalls only its own stream', tls: 'Always required (TLS 1.3 built into QUIC)', migration: 'Yes — connection IDs survive IP/port changes', year: '2022 (RFC 9114)', note: 'HTTP/3 adoption ~30% of web traffic by 2024. Challenge: UDP 443 must be unblocked in firewalls. First connection typically HTTP/2; Alt-Svc header triggers upgrade.' },
]
const H_FIELDS: { key: keyof Omit<HttpVer, 'id' | 'name' | 'note'>; label: string }[] = [
  { key: 'transport', label: 'Transport' }, { key: 'multiplexing', label: 'Multiplexing' },
  { key: 'headerComp', label: 'Header Compression' }, { key: 'holBlocking', label: 'HoL Blocking' },
  { key: 'tls', label: 'TLS' }, { key: 'migration', label: 'Connection Migration' }, { key: 'year', label: 'Standardized' },
]
const verColor = (id: string) => id === 'h1' ? '#ef4444' : id === 'h2' ? '#f59e0b' : G

function HttpVersionComparator() {
  const [sel, setSel] = useState('h3')
  const active = HTTP_VERSIONS.find(v => v.id === sel)!
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: '28px 24px', margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 18px' }}>HTTP Version Comparator</p>
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        {HTTP_VERSIONS.map(v => (
          <button key={v.id} onClick={() => setSel(v.id)}
            style={{ flex: 1, padding: '10px 8px', borderRadius: 8, border: `2px solid ${sel === v.id ? verColor(v.id) : 'var(--border)'}`, background: sel === v.id ? `${verColor(v.id)}12` : 'transparent', color: sel === v.id ? verColor(v.id) : 'var(--text)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            {v.name}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 18 }}>
        {H_FIELDS.map(f => (
          <div key={f.key} style={{ display: 'flex', gap: 14, padding: '9px 12px', borderRadius: 8, border: '1px solid var(--border)', alignItems: 'flex-start' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em', minWidth: 130, flexShrink: 0, paddingTop: 2 }}>{f.label}</span>
            <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5, flex: 1 }}>{active[f.key]}</span>
          </div>
        ))}
      </div>
      <div style={{ background: `${verColor(active.id)}08`, border: `1px solid ${verColor(active.id)}28`, borderRadius: 10, padding: '14px 16px' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: verColor(active.id), fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 6px' }}>Notable</p>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{active.note}</p>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function QuicHttp3Page() {
  return (
    <LearnLayout
      title="QUIC and HTTP/3"
      description="How Google's experiment to fix the web became an IETF standard — and why running a transport protocol over UDP required reinventing congestion control, TLS integration, multiplexing, and connection migration."
      section="Networking Fundamentals — Module 24"
      readTime="25–35 min"
      updatedAt="May 2026"
    >

      <Chapter n={1} />
      <H2>The Problem QUIC Was Designed to Solve</H2>

      <StoryBox>
        <Para>2012. Google engineers are frustrated. HTTP/1.1 is slow — browsers open six TCP connections per origin to work around pipelining. HTTP/2 is being designed to fix this by multiplexing requests over one TCP connection. But there is a deeper problem: TCP itself. When a single packet is lost in a TCP stream, every byte after the gap stalls in the receive buffer. For HTTP/2, this is catastrophic — one dropped packet halts all multiplexed streams at once. On a 1% loss mobile network, HTTP/2 on one TCP connection can be slower than HTTP/1.1 on six.</Para>
        <Para>TCP cannot be fixed quickly. It is baked into every OS kernel, and kernel updates take years to propagate. So Google asked: what if we built a new transport protocol in userspace, on top of UDP? We could iterate monthly, deploy new congestion algorithms instantly, and not wait for kernel maintainers. The result was QUIC — and it became RFC 9000 in 2021.</Para>
      </StoryBox>

      <Para>QUIC is a <Accent>general-purpose encrypted transport protocol</Accent> running over UDP. It provides: reliable ordered delivery per stream, multiplexed independent streams, integrated TLS 1.3 encryption, congestion control, flow control, and connection migration — all in userspace. HTTP/3 is HTTP semantics running over QUIC streams instead of TCP+TLS.</Para>

      <WowBox>
        <Para>By 2024, HTTP/3 is used by over 30% of websites and carries ~10% of all internet traffic. Chrome uses QUIC for most connections to Google services. Cloudflare, Akamai, and Fastly deploy HTTP/3 at global scale. The fastest time from Google experiment to IETF RFC in history: QUIC went from internal prototype to RFC 9000 in roughly 9 years.</Para>
      </WowBox>

      <Para>The key insight driving QUIC's design: UDP is a blank canvas. It provides no reliability, no ordering, no connection — just datagrams. When you rebuild reliability on top, you can make better decisions than the 1974 TCP spec allowed. You own the entire protocol and can change it with a software update, not a kernel patch.</Para>

      <Divider />

      <Chapter n={2} />
      <H2>TCP Head-of-Line Blocking: The Core Problem</H2>

      <Para>TCP guarantees that bytes are delivered in order. If segment #3 is lost and #4, #5, #6 arrive, they buffer in the kernel until #3 is retransmitted and received. The application sees nothing until the gap is filled. This is correct for a byte stream — but catastrophic for multiplexed HTTP requests.</Para>

      <Para>HTTP/2 multiplexes many logical requests over one TCP connection by interleaving bytes from different streams. TCP has no awareness of stream boundaries — it is one byte stream. If a TCP segment carrying bytes from stream 1 is lost, streams 2, 3, and 4 are stalled even though all of <em>their</em> data arrived intact. The kernel buffers it, waiting for the retransmit that will allow TCP to advance its delivery pointer past the gap.</Para>

      <H3>The Quantified Problem</H3>
      <Para>Measurements by Google and academic researchers show: at 0% packet loss, HTTP/2 over one TCP connection outperforms HTTP/1.1 with six parallel connections. At 1% packet loss, they are approximately equal. At 2%+ packet loss, HTTP/1.1 with six connections wins. Mobile networks and satellite links routinely hit 1–5% loss. This means HTTP/2 — a significant engineering achievement — delivered its theoretical benefits only on high-quality networks.</Para>

      <Warn>
        <Para>HTTP/2 server push was theoretically elegant: the server proactively pushes CSS and JS before the browser requests them. In practice, servers pushed resources already cached by the browser, wasting bandwidth. Chrome and Firefox deprecated server push support in 2022. HTTP/3 retains push in the RFC but effectively every implementation disables it by default. Design lesson: push semantics are hard to get right when cache state is unknown to the server.</Para>
      </Warn>

      <Divider />

      <Chapter n={3} />
      <H2>QUIC Connection Establishment</H2>

      <StoryBox>
        <Para>The first time you connect to a server with QUIC, you pay 1 RTT before the first application byte flows — compared to TCP+TLS 1.3's minimum of 2 RTTs. On a returning connection, QUIC 0-RTT sends application data in the very first UDP packet, with zero additional round trips. Multiply this by billions of page loads per day on 4G networks with 80ms RTT, and the latency savings are real and measurable.</Para>
      </StoryBox>

      <QuicTcpRace />

      <H3>How 1-RTT Works</H3>
      <Para>QUIC combines the transport handshake and TLS 1.3 into a single exchange. The client's first packet — an <Accent>Initial packet</Accent> — contains QUIC transport parameters (stream limits, flow control windows, idle timeout) and the TLS 1.3 ClientHello (including the key_share extension with the client's ECDHE public key). The server's response contains QUIC acknowledgment and the TLS 1.3 ServerHello, EncryptedExtensions, Certificate, and Finished. Both sides derive traffic keys from this single exchange. The server can send application data before the client's Finished arrives.</Para>

      <H3>Three Encryption Levels</H3>
      <Para>QUIC bootstraps encryption through three levels: <Accent>Initial</Accent> (keys derived from the connection ID — provides integrity but not confidentiality, any observer can decrypt), <Accent>Handshake</Accent> (keys from the TLS handshake secret — authenticated and encrypted), <Accent>Application</Accent> (keys from the TLS master secret — full TLS 1.3 protection). Each level uses different packet types so that middleboxes cannot confuse them.</Para>

      <CodeBlock>{`# Check HTTP/3 support
curl -I --http3 https://example.com      # curl compiled with QUIC support
curl -v https://example.com 2>&1 | grep "alt-svc"
# alt-svc: h3=":443"; ma=86400  ← server advertises HTTP/3

# First connection: typically HTTP/2 (TCP)
# Browser caches Alt-Svc, upgrades to HTTP/3 on next visit

# Check in Chrome DevTools → Network → Protocol column
# "h3" = HTTP/3 over QUIC, "h2" = HTTP/2 over TLS/TCP

# Inspect QUIC connection details
openssl s_client -connect example.com:443  # does NOT speak QUIC
# Use quiche-client or ngtcp2 for actual QUIC inspection`}</CodeBlock>

      <Divider />

      <Chapter n={4} />
      <H2>QUIC Packets and Frames</H2>

      <Para>QUIC has a two-layer structure. <Accent>Packets</Accent> are UDP datagrams with a QUIC header (connection ID, packet number, packet type) plus an encrypted payload. <Accent>Frames</Accent> are typed structures inside the payload — a single UDP datagram can carry multiple frames from multiple streams simultaneously. This multiplexing at the datagram level is what eliminates HoL blocking.</Para>

      <QuicFrameInspector />

      <H3>Packet Numbers and Retransmit Disambiguation</H3>
      <Para>TCP reuses sequence numbers for retransmissions, creating the classic "retransmit ambiguity": did the ACK acknowledge the original or the retransmit? QUIC uses monotonically increasing packet numbers that are <em>never reused</em>. A retransmitted STREAM frame gets a new packet number but carries the original stream offset. ACK timestamps are therefore always unambiguous, enabling more accurate RTT estimates and better congestion control.</Para>

      <Divider />

      <Chapter n={5} />
      <H2>Multiplexing Without Head-of-Line Blocking</H2>

      <Para>QUIC streams are fully independent within a connection. Each stream has its own byte offset space and its own flow control budget. A lost UDP datagram stalls only the stream(s) whose data was in that datagram. Other streams receive their data and deliver it to the application without waiting.</Para>

      <Para>Stream IDs encode direction in their low 2 bits: 0x0 = client-initiated bidirectional, 0x1 = server-initiated bidirectional, 0x2 = client-initiated unidirectional, 0x3 = server-initiated unidirectional. HTTP/3 request/response pairs use client-initiated bidirectional streams (IDs 0, 4, 8, 12…). HTTP/3 also uses three pairs of unidirectional streams for control, QPACK encoder, and QPACK decoder.</Para>

      <H3>Two-Level Flow Control</H3>
      <Para>QUIC flow control operates at two levels simultaneously. <Accent>Stream-level</Accent> (<Code>MAX_STREAM_DATA</Code>): per-stream byte limit, allowing the receiver to give different budgets to different streams — a video stream gets more headroom than a control channel. <Accent>Connection-level</Accent> (<Code>MAX_DATA</Code>): total byte limit across all streams, preventing memory exhaustion regardless of how many streams are open.</Para>

      <WowBox>
        <Para>A QUIC connection can have up to 2^60 bidirectional and 2^60 unidirectional streams — effectively unlimited. Long-lived service connections that handle millions of requests over their lifetime benefit from this: no TCP connection-per-request overhead, and stream IDs never wrap around in any practical scenario.</Para>
      </WowBox>

      <Divider />

      <Chapter n={6} />
      <H2>Connection Migration</H2>

      <StoryBox>
        <Para>You are downloading a 2 GB file on your laptop connected to hotel WiFi. You close the lid, walk to the coffee shop next door, and open it again. New WiFi, new IP address. With TCP, every connection is defined by the 4-tuple (srcIP:srcPort → dstIP:dstPort). Your IP changed — the 4-tuple is gone. Every connection drops. The download starts from zero.</Para>
        <Para>With QUIC, connections are identified by a <Accent>Connection ID</Accent> — an arbitrary byte string chosen by endpoints, not tied to any IP address. You reappear from the coffee shop IP and send a QUIC packet with the same connection ID. The server detects the new address, sends a PATH_CHALLENGE frame, receives your PATH_RESPONSE, validates the new path, and continues every open stream from exactly where they left off. The download resumes mid-byte.</Para>
      </StoryBox>

      <Para>Connection migration is transformative for mobile users who switch between WiFi and cellular multiple times per hour. With TCP, each switch breaks all connections — ongoing video calls, uploads, WebSocket sessions, long-running RPC streams. With QUIC, all survive.</Para>

      <H3>Path Validation</H3>
      <Para>QUIC cannot simply trust any packet claiming to be from a connection — an attacker could spoof a source IP to redirect traffic. Path validation requires the migrating endpoint to respond to a <Code>PATH_CHALLENGE</Code> with a matching <Code>PATH_RESPONSE</Code> from the new address. Only after receiving a valid response does the server switch its sending path. Until then, it continues sending on the old path (if still reachable) or buffers data.</Para>

      <H3>Connection ID Privacy</H3>
      <Para>Connection IDs are visible in packet headers (outside encryption). An observer watching traffic before and after a migration can correlate packets via the connection ID, revealing movement. QUIC addresses this with ID rotation: <Code>NEW_CONNECTION_ID</Code> frames provide fresh IDs, and <Code>RETIRE_CONNECTION_ID</Code> retires old ones. Clients concerned about mobility privacy should rotate IDs on each migration event.</Para>

      <Divider />

      <Chapter n={7} />
      <H2>QUIC Congestion Control</H2>

      <Para>QUIC ships with NewReno as the default congestion control algorithm (RFC 9002), but its design explicitly supports <Accent>pluggable congestion control</Accent>. Because QUIC runs in userspace, deploying BBR, CUBIC, Copa, or a custom algorithm requires only a software update — not a kernel patch and multi-year OS distribution cycle.</Para>

      <Para>Google's production QUIC has used BBR (Bottleneck Bandwidth and RTT) for years. BBR models the network bottleneck by estimating bandwidth and minimum RTT, then probes for bandwidth in cycles rather than backing off at every loss event. On high-bandwidth, high-latency paths (cross-continental, satellite), BBR significantly outperforms CUBIC.</Para>

      <H3>Accurate RTT Estimation</H3>
      <Para>Every QUIC ACK carries an <Code>ack_delay</Code> field — the time between receiving the acknowledged packet and generating the ACK. The sender subtracts this delay from the raw RTT sample, producing a more accurate smoothed RTT. TCP ACKs carry no such information; RTT estimates include unpredictable ACK batching and interrupt coalescing delays. Better RTT estimates mean more accurate congestion window calculations and fewer spurious retransmits.</Para>

      <Para>QUIC also supports ECN (Explicit Congestion Notification) — ACK frames report counts of IP packets marked CE (Congestion Experienced) by routers. This enables congestion signals without packet loss, reducing the latency spikes of loss-based congestion control.</Para>

      <CodeBlock>{`# Enable HTTP/3 in nginx (nginx 1.25+ with --with-http_v3_module)
server {
    listen 443 quic reuseport;
    listen 443 ssl;
    ssl_protocols TLSv1.3;
    ssl_certificate     /etc/ssl/cert.pem;
    ssl_certificate_key /etc/ssl/key.pem;
    add_header Alt-Svc 'h3=":443"; ma=86400';
}

# Verify QUIC is working
curl -v --http3-only https://your-server.com 2>&1 | grep -E "HTTP|QUIC|proto"

# h3spec: HTTP/3 conformance test suite
h3spec https://your-server.com:443`}</CodeBlock>

      <Divider />

      <Chapter n={8} />
      <H2>HTTP/3: HTTP Semantics over QUIC</H2>

      <Para>HTTP/3 (RFC 9114) preserves all HTTP/1.1 and HTTP/2 semantics — methods, status codes, headers, trailers — but replaces the framing layer. HTTP/2 framing was designed around TCP's ordered byte stream; HTTP/3 redesigns it for QUIC's independent streams.</Para>

      <HttpVersionComparator />

      <H3>QPACK: Header Compression Redesigned for QUIC</H3>
      <Para>HTTP/2 used HPACK for header compression. HPACK maintains a shared dynamic table between encoder and decoder, with entries referenced by index. This works perfectly over TCP's ordered delivery — but QUIC delivers streams out of order. If a dynamic table update (in one stream) hasn't arrived yet and a header references that entry (in another stream), HPACK would stall. This would reintroduce HoL blocking at the header layer.</Para>

      <Para><Accent>QPACK</Accent> (RFC 9204) redesigns this. It uses two dedicated unidirectional streams — an encoder stream and a decoder stream — for table updates and acknowledgments. A header can reference dynamic table entries only if those entries have already been acknowledged by the decoder. Headers that reference unconfirmed entries are encoded as literals (never blocked). The result: zero HoL blocking from header compression, at the cost of two extra streams per connection.</Para>

      <H3>HTTP/3 Request/Response Flow</H3>
      <Para>Each request/response pair uses a client-initiated bidirectional QUIC stream. The client sends a HEADERS frame (QPACK-encoded request headers) followed by optional DATA frames (request body). The server responds with a HEADERS frame (response headers) and DATA frames (response body). Trailers are sent in a final HEADERS frame. Each stream is independent — 100 parallel requests use 100 independent QUIC streams with no shared stall point.</Para>

      <Warn>
        <Para>HTTP/3 discovery requires either an Alt-Svc HTTP response header (<Code>alt-svc: h3=":443"; ma=86400</Code>) or a DNS HTTPS record with ALPN h3. The <em>first</em> connection to any new server is almost always HTTP/2 over TCP — the browser doesn't know the server supports QUIC until it receives the Alt-Svc header. Only on subsequent connections does the browser attempt HTTP/3. This means QUIC's 0-RTT benefit only applies to returning connections, not cold first visits.</Para>
      </Warn>

      <Divider />

      <Chapter n={9} />
      <H2>Deployment Challenges</H2>

      <Para>QUIC's UDP foundation creates friction that TCP never faced. Network equipment has been TCP-optimized for 50 years. UDP was historically used only for DNS and media streaming, and was often treated as second-class traffic.</Para>

      <H3>UDP Blocking</H3>
      <Para>Enterprise firewalls frequently block or rate-limit UDP on port 443. Google reports that approximately 3–8% of connections cannot use QUIC due to UDP blocking, falling back to HTTP/2 over TCP. QUIC clients must implement this fallback — without it, those users would lose HTTPS access entirely. The fallback adds latency on first connection to affected networks (connection attempt timeout before fallback).</Para>

      <H3>NAT and Firewall Idle Timeouts</H3>
      <Para>NAT tables track UDP state with shorter idle timeouts than TCP — typically 30–60 seconds for UDP vs 300+ seconds for TCP. A QUIC connection idle for more than 30 seconds may have its NAT mapping expire. When the client sends the next packet, it arrives at the server from a "new" source (from the server's perspective) and is dropped. QUIC mitigates this with PING frames (sending keepalives) and the <Code>max_idle_timeout</Code> transport parameter to negotiate shorter connection idle times.</Para>

      <H3>Load Balancer Routing</H3>
      <Para>Traditional load balancers route by TCP 5-tuple. QUIC connection migration changes the source IP/port, breaking 5-tuple routing. QUIC-aware load balancers must route by connection ID. RFC 9000 defines a convention where servers encode routing information into connection IDs they generate — the load balancer extracts this without packet decryption. Cloudflare's implementation embeds a 1-byte routing key into the connection ID for stateless L4 routing.</Para>

      <WowBox>
        <Para>QUIC's Initial packets must be padded to at least 1200 bytes. This is a deliberate anti-amplification measure: since UDP source addresses can be spoofed, QUIC servers must not send more than 3x the unverified client bytes until address validation completes. A 1200-byte minimum forces the attacker to send a substantial packet, limiting the amplification ratio to 3:1 — far below the 10,000:1 amplification possible with DNS or NTP amplification attacks.</Para>
      </WowBox>

      <Divider />

      <Chapter n={10} />
      <H2>QUIC Security Design</H2>

      <Para>TLS 1.3 is not bolted onto QUIC — it is integrated into QUIC's handshake. Every byte of QUIC application data and post-Initial handshake data is encrypted. Even QUIC's internal framing (ACKs, flow control, stream IDs) is encrypted after the Initial exchange. This encryption prevents <Accent>ossification</Accent>: middleboxes cannot read and depend on QUIC internal fields, which means QUIC can evolve those fields without breaking middleboxes.</Para>

      <Para>Compare to TCP: TCP options, timestamps, and even the window scale option have been partially ossified by middleboxes that inspect and rewrite them. QUIC's encryption makes this manipulation impossible, preserving the protocol's ability to evolve. This is why QUIC's version field and connection ID format are the only invariants (RFC 8999) — everything else can change.</Para>

      <H3>Packet Injection Attacks</H3>
      <Para>An attacker who observes QUIC packets and knows the connection ID could try to inject forged packets. QUIC prevents this: application-level packets use per-packet AEAD authentication with keys derived from the TLS session — a forged packet without the session key produces an authentication failure and is silently dropped. The connection ID alone provides no decryption capability.</Para>

      <CodeBlock>{`# QUIC version negotiation
# If client sends an unknown QUIC version, server responds with
# a Version Negotiation packet listing supported versions
# Client retries with a version from that list

# QUIC invariants (must remain constant across all QUIC versions):
# - First bit of first byte (fixed bit, currently 1)
# - Next 4 bytes are the version field
# - Remaining long-header fields may change in future versions

# QUIC v2 (RFC 9369) changes the Initial salt to force new implementations
# Prevents ossification by ensuring old QUIC v1 code cannot parse v2 packets
# Check if server supports QUIC v2:
curl --http3 -v https://example.com 2>&1 | grep "QUIC version"`}</CodeBlock>

      <Divider />

      <Chapter n={11} />
      <H2>QUIC Beyond HTTP</H2>

      <Para>QUIC is a general transport protocol, not HTTP-specific. Several applications have adopted it for its properties independently of HTTP/3.</Para>

      <H3>DNS over QUIC (DoQ) — RFC 9250</H3>
      <Para>Each DNS query runs in its own QUIC stream. Subsequent queries on an established connection take zero additional RTTs for connection setup. Unlike DNS-over-TCP (which prefixes a 2-byte length), DoQ uses QUIC stream framing. 0-RTT enables sub-millisecond DNS resolution on warm connections. The privacy benefit: every query is encrypted, the server is authenticated, and queries cannot be correlated by packet timing because streams are independent.</Para>

      <H3>WebTransport</H3>
      <Para>WebTransport (W3C + IETF) exposes QUIC stream and datagram semantics to browser JavaScript. A web application can open multiple independent streams (reliable, ordered) and send unreliable datagrams — like a low-level socket API in the browser. Use cases: game networking (unreliable datagrams for position updates), live streaming (parallel audio/video streams), collaborative editing (low-latency independent updates). Chrome shipped WebTransport in 2023; it runs over HTTP/3 as a protocol extension.</Para>

      <H3>MASQUE and VPN-style Use Cases</H3>
      <Para>MASQUE (Multiplexed Application Substrate over QUIC Encryption) defines HTTP/3 extensions for proxying IP and UDP traffic through QUIC tunnels. This enables QUIC-native VPN architectures where the outer tunnel is QUIC (surviving IP changes, benefiting from connection migration) and inner traffic is encapsulated with CONNECT-IP or CONNECT-UDP. Apple's iCloud Private Relay uses a variant of this approach.</Para>

      <Divider />

      <Chapter n={12} />
      <H2>Performance in Practice</H2>

      <Para>QUIC's benefits are real on certain paths and marginal or negative on others. The deployment decision requires understanding your specific traffic patterns.</Para>

      <H3>Where QUIC Wins</H3>
      <Para>• <Accent>Lossy, high-latency paths</Accent>: mobile in fringe coverage, satellite. Per-stream HoL blocking elimination has measurable impact above 1% loss rate.</Para>
      <Para>• <Accent>Frequent IP changes</Accent>: mobile users switching WiFi/cellular. Connection migration keeps sessions alive vs TCP teardown+restart.</Para>
      <Para>• <Accent>Short-lived connections to known servers</Accent>: 0-RTT saves one full RTT. For search results and API calls where every millisecond matters, this is significant at scale.</Para>
      <Para>• <Accent>Many parallel requests</Accent>: a page loading 80 resources benefits from 80 independent QUIC streams vs HTTP/2's all-on-one-TCP-connection approach.</Para>

      <H3>Where QUIC Underperforms</H3>
      <Para>• <Accent>Reliable, low-latency LANs and data center networks</Accent>: TCP with kernel-optimized zero-copy and hardware offload is highly efficient. QUIC's userspace implementation has additional context-switch and memory copy overhead.</Para>
      <Para>• <Accent>High-throughput bulk transfers</Accent>: CDNs report 20–30% higher CPU per byte for QUIC vs TLS/TCP on the same hardware — hardware AES acceleration works for both, but QUIC's per-packet processing overhead is higher in userspace.</Para>
      <Para>• <Accent>UDP-blocked networks</Accent>: falls back to TCP transparently, no benefit.</Para>

      <Warn>
        <Para>Do not enable HTTP/3 on a high-throughput internal API server expecting a speed improvement. Measure CPU and latency first. QUIC's gains are primarily at the user-facing edge with heterogeneous client networks. Internal service-to-service traffic on reliable data center networks will often see higher CPU for the same throughput with no latency benefit. Use HTTP/2 for internal traffic; save HTTP/3 for user-facing endpoints.</Para>
      </Warn>

      <Divider />

      <Chapter n={13} />
      <H2>Common Misconceptions</H2>

      <Err title="QUIC is just UDP with reliability">
        <Para>QUIC is a complete transport protocol that uses UDP as a substrate. It includes: TLS 1.3 integration, multiplexed streams with independent flow control, connection migration, pluggable congestion control, path validation, amplification protection, and a complete typed framing layer. Calling QUIC "UDP with reliability" is like calling TCP "IP with reliability" — technically a subset of the truth but missing everything that matters.</Para>
      </Err>

      <Err title="HTTP/3 is faster than HTTP/2 on every connection">
        <Para>HTTP/3 outperforms HTTP/2 on lossy, high-latency paths and in frequent-reconnect scenarios. On reliable, low-latency networks (data center LANs, office WiFi), HTTP/2 over TCP is comparable or better, because kernel-space TCP has decades of optimization that userspace QUIC hasn't matched yet. The performance benefit is network-condition dependent, not universal.</Para>
      </Err>

      <Err title="QUIC doesn't need TLS because UDP already encrypts">
        <Para>UDP provides zero encryption. It is a stateless, unordered, unencrypted datagram protocol with an 8-byte header. QUIC mandates TLS 1.3 — this is not optional or configurable. TLS is integrated into QUIC's handshake from the ground up. Every QUIC connection is always encrypted with TLS 1.3. There is no plaintext QUIC mode.</Para>
      </Err>

      <Err title="0-RTT is always safe for resuming connections">
        <Para>0-RTT data is vulnerable to replay attacks. An attacker who records a 0-RTT packet can replay it to cause the server to process the same request again. This is safe only for idempotent HTTP methods (GET, HEAD). Using 0-RTT for POST, DELETE, payment flows, or any state-changing operation risks processing the request twice. HTTP/3 stacks that enable 0-RTT should refuse to send early data for non-safe HTTP methods.</Para>
      </Err>

      <Err title="Connection migration makes IP changes completely transparent">
        <Para>Migration requires path validation (one RTT) before the server trusts the new path. Additionally, the new path has unknown bandwidth and RTT characteristics — the congestion window must ramp up. A migration event adds roughly 50–200ms of latency before the connection reaches its previous throughput. This is vastly better than TCP's full teardown and reconnect, but not instantaneous or free.</Para>
      </Err>

      <Divider />

      <Chapter n={14} />
      <H2>IQ Depth Check</H2>

      <IQ level="Beginner">
        <Para>HTTP/3 is the newest version of HTTP — the protocol that loads web pages. Instead of using TCP (which previous versions used), HTTP/3 runs over QUIC, a protocol built on UDP. QUIC connects faster, handles dropped packets better (especially on mobile), and can keep your connection alive when you switch from WiFi to cellular. The padlock icon still means encrypted — QUIC always uses encryption.</Para>
      </IQ>

      <IQ level="Intermediate">
        <Para>QUIC connects in 1 RTT (vs 2 for TCP+TLS 1.3) by combining transport parameters and TLS 1.3 in one exchange. 0-RTT resumption sends app data in the first packet. Each HTTP/3 request uses an independent QUIC stream — a lost packet only stalls that stream, not all requests (fixing HTTP/2's TCP HoL blocking). Connection IDs allow connections to survive IP changes. QPACK replaces HPACK to handle out-of-order stream delivery. Alt-Svc headers advertise HTTP/3 support; browsers upgrade on the next visit.</Para>
      </IQ>

      <IQ level="Senior">
        <Para>QUIC packet numbers are monotonically increasing and never reused — retransmits carry new numbers with original stream offsets, eliminating retransmit ambiguity in RTT estimates. The three encryption levels (Initial/Handshake/Application) map to TLS flight epochs; Initial uses keys derived from connection ID (observable but integrity-protected). Initial packets are padded to 1200 bytes limiting amplification to 3x. Load balancers must route by server-chosen connection ID encoding (routing token in CID bytes) rather than 5-tuple. QPACK uses two unidirectional control streams with required_insert_count headers to handle out-of-order dynamic table updates. Path validation via PATH_CHALLENGE/PATH_RESPONSE prevents source-IP spoofing during migration. NEW_CONNECTION_ID + RETIRE_CONNECTION_ID enable privacy-preserving ID rotation on migration.</Para>
      </IQ>

      <IQ level="PhD">
        <Para>QUIC's formal security proof (Fischlin et al., CCS 2021) establishes multi-stage key exchange (MSKE) security under the PRF-ODH assumption. 0-RTT achieves only bounded forward secrecy — replays within the ticket validity window are possible without server-side nonce tracking; the proof includes an anti-replay oracle model. The QUIC invariants (RFC 8999) are the minimum ossification surface: first bit, version field, and connection ID encoding convention — all other long-header fields are version-specific. QUIC v2 (RFC 9369) changes the Initial salt and AEAD labels to force version negotiation and prevent v1 ossification. MASQUE (RFC 9484–9499 series) defines CONNECT-UDP and CONNECT-IP for HTTP/3-tunneled proxying, enabling QUIC-native VPN architectures where connection migration survives outer-tunnel IP changes. The QUIC ACK frequency extension (draft-ietf-quic-ack-frequency) decouples ACK generation rate from packet arrival rate, trading RTT measurement accuracy for server CPU at high fan-in. Open research: formal UC-composable security of connection migration under adaptive network adversaries; QUIC multipath (draft-ietf-quic-multipath) extensions for simultaneous path usage; post-quantum QUIC handshake using X25519Kyber768 hybrid KEM (deployed experimentally by Cloudflare and Google as of 2024).</Para>
      </IQ>

      <Divider />

      <KeyTakeaways items={[
        'QUIC is a general-purpose encrypted transport protocol over UDP, combining TLS 1.3 and transport negotiation into a single 1-RTT handshake — vs 2 RTTs for TCP+TLS.',
        'HTTP/3 is HTTP semantics over QUIC streams, eliminating TCP head-of-line blocking: a lost packet stalls only the stream it belongs to, not all concurrent requests.',
        'QUIC stream multiplexing gives each request an independent byte stream with its own flow control — 100 parallel requests use 100 independent streams with no shared stall point.',
        'Connection IDs decouple QUIC connections from IP:port 4-tuples, enabling seamless migration when devices switch networks (WiFi to LTE) without dropping streams.',
        'QPACK redesigns HPACK header compression for QUIC\'s out-of-order delivery, using dedicated encoder/decoder streams to synchronize the dynamic header table.',
        '0-RTT resumption sends application data in the first packet but is replay-vulnerable — only safe for idempotent HTTP methods (GET/HEAD), never for state-changing operations.',
        'TLS 1.3 is mandatory and integrated into QUIC — there is no unencrypted QUIC mode. All QUIC traffic is always encrypted and authenticated.',
        'QUIC Initial packets are padded to 1200 bytes to limit amplification attacks to 3:1; servers must not send more than 3x unvalidated client bytes.',
        'Deployment challenges: UDP 443 blocking in enterprise firewalls (requires TCP fallback), short NAT idle timeouts for UDP, and load balancers needing connection-ID-based routing.',
        'QUIC\'s biggest gains are on lossy/high-latency networks and frequent-reconnect scenarios; reliable data center networks often see comparable performance to optimized TCP.',
      ]} />
    </LearnLayout>
  )
}
