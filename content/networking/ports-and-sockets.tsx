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

/* ── Interactive Component 1: Well-Known Port Reference ──────────────────── */

interface PortEntry {
  port: number
  proto: string
  service: string
  category: string
  description: string
  secNote: string
  color: string
}

const WELL_KNOWN_PORTS: PortEntry[] = [
  { port: 20, proto: 'TCP', service: 'FTP Data', category: 'File Transfer', description: 'FTP active mode data channel. The server initiates a connection back to the client on port 20. Largely replaced by FTP passive mode (PASV) which uses a dynamic port.', secNote: 'Unencrypted. Use SFTP (port 22) or FTPS instead.', color: '#f97316' },
  { port: 21, proto: 'TCP', service: 'FTP Control', category: 'File Transfer', description: 'FTP control channel for commands. Client connects here to issue FTP commands (USER, PASS, LIST, RETR, STOR). Plaintext protocol.', secNote: 'Credentials sent in plaintext. Block externally or replace with SFTP.', color: '#f97316' },
  { port: 22, proto: 'TCP', service: 'SSH', category: 'Remote Access', description: 'Secure Shell. Encrypted remote terminal, file transfer (SFTP/SCP), and port forwarding. Replaces Telnet (23), rsh, rlogin. Key-based auth strongly preferred over passwords.', secNote: 'Disable password auth; use key-based. Change default port or use port knocking.', color: G },
  { port: 25, proto: 'TCP', service: 'SMTP', category: 'Email', description: 'Server-to-server email delivery. Not for client submission (use 587 or 465). ISPs block port 25 outbound from residential IPs to prevent spam.', secNote: 'Most ISPs block outbound port 25. Use 587 (STARTTLS) or 465 (SMTPS) for client submission.', color: '#3b82f6' },
  { port: 53, proto: 'UDP/TCP', service: 'DNS', category: 'Name Resolution', description: 'Domain Name System. UDP for queries, TCP for large responses and zone transfers. Critical infrastructure — every connection starts with DNS.', secNote: 'DNS is unencrypted by default — queries visible to ISP. Use DNS over HTTPS (port 443) or DNS over TLS (port 853).', color: '#8b5cf6' },
  { port: 80, proto: 'TCP', service: 'HTTP', category: 'Web', description: 'Unencrypted HTTP. Served by web servers (nginx, Apache, Caddy). In modern deployments, HTTP on port 80 redirects to HTTPS on port 443 via 301 Moved Permanently.', secNote: 'All data transmitted in plaintext. Never transmit credentials or sensitive data over HTTP.', color: '#ef4444' },
  { port: 443, proto: 'TCP/UDP', service: 'HTTPS / QUIC', category: 'Web', description: 'HTTPS (HTTP over TLS) on TCP. HTTP/3 (QUIC) on UDP. The primary port for encrypted web traffic. Also used for many other TLS-wrapped services.', secNote: 'Always prefer HTTPS. Verify TLS certificate validity. HTTP Strict Transport Security (HSTS) prevents downgrade attacks.', color: G },
  { port: 587, proto: 'TCP', service: 'SMTP Submission', category: 'Email', description: 'Email client-to-server submission. Uses STARTTLS to upgrade to TLS. Requires authentication. The correct port for sending email from mail clients and applications.', secNote: 'Prefer 587 with STARTTLS or 465 with SMTPS. Never 25 for client submission.', color: '#3b82f6' },
  { port: 993, proto: 'TCP', service: 'IMAPS', category: 'Email', description: 'IMAP over TLS (implicit TLS). Used by email clients to retrieve mail. Replaced IMAP (143) + STARTTLS for new deployments.', secNote: 'Prefer 993 (implicit TLS) over 143 (STARTTLS). Implicit TLS is simpler and more reliable.', color: '#3b82f6' },
  { port: 3389, proto: 'TCP', service: 'RDP', category: 'Remote Access', description: 'Windows Remote Desktop Protocol. Widely targeted by ransomware and brute-force attacks. Should never be exposed directly to the internet.', secNote: 'Never expose port 3389 to the internet. Use VPN or RDP Gateway. Enable NLA (Network Level Authentication).', color: '#ef4444' },
]

const PORT_CATEGORIES = ['All', 'File Transfer', 'Remote Access', 'Email', 'Name Resolution', 'Web']

function WellKnownPortExplorer() {
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState<number | null>(null)

  const filtered = WELL_KNOWN_PORTS.filter(p => category === 'All' || p.category === category)
  const activePort = selected !== null ? WELL_KNOWN_PORTS.find(p => p.port === selected) : null

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>Well-Known Port Reference</h3>
      <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--text-muted)' }}>
        Click any port to see its description, protocol, and security considerations.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {PORT_CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            style={{ padding: '5px 12px', borderRadius: 20, border: `1px solid ${c === category ? G : 'var(--border)'}`, background: c === category ? G : 'var(--surface)', color: c === category ? '#fff' : 'var(--text-muted)', fontSize: 12, cursor: 'pointer', fontWeight: c === category ? 700 : 400 }}>
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {filtered.map(p => (
          <button key={p.port} onClick={() => setSelected(selected === p.port ? null : p.port)}
            style={{ padding: '8px 14px', borderRadius: 8, border: `1px solid ${selected === p.port ? p.color : 'var(--border)'}`, background: selected === p.port ? p.color : 'var(--surface)', color: selected === p.port ? '#fff' : 'var(--text)', cursor: 'pointer', textAlign: 'center', minWidth: 72 }}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{p.port}</p>
            <p style={{ margin: 0, fontSize: 10, opacity: 0.8 }}>{p.proto}</p>
            <p style={{ margin: 0, fontSize: 10, fontWeight: 600 }}>{p.service}</p>
          </button>
        ))}
      </div>

      {activePort ? (
        <div style={{ background: 'var(--surface)', border: `1px solid ${activePort.color}`, borderRadius: 8, padding: '14px 16px' }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
            <span style={{ background: activePort.color, color: '#fff', borderRadius: 4, padding: '2px 10px', fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>:{activePort.port}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{activePort.proto} — {activePort.service}</span>
          </div>
          <p style={{ margin: '0 0 10px', fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>{activePort.description}</p>
          <div style={{ background: WARN_BG, border: `1px solid ${WARN_BORDER}`, borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#713f12' }}>
            <strong>Security: </strong>{activePort.secNote}
          </div>
        </div>
      ) : (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
          Click a port number above to inspect it
        </div>
      )}
    </div>
  )
}

/* ── Interactive Component 2: Socket Connection Lifecycle ────────────────── */

interface SocketState {
  name: string
  client: string
  server: string
  syscall: string
  description: string
  color: string
}

const SOCKET_LIFECYCLE: SocketState[] = [
  {
    name: 'Socket Created',
    client: 'socket(AF_INET, SOCK_STREAM, 0)',
    server: 'socket(AF_INET, SOCK_STREAM, 0)',
    syscall: 'socket()',
    description: 'Both sides create a socket — an OS file descriptor representing a communication endpoint. No network activity yet. The socket is not connected or bound to any address.',
    color: '#6b7280',
  },
  {
    name: 'Server Binds',
    client: '(not yet bound)',
    server: 'bind(fd, "0.0.0.0:8080")',
    syscall: 'bind() → listen()',
    description: 'Server calls bind() to associate the socket with a local address and port. Then listen() marks it as a passive socket ready to accept connections. The kernel begins accepting SYN packets into the accept queue.',
    color: '#3b82f6',
  },
  {
    name: 'Client Connects',
    client: 'connect(fd, "10.0.0.1:8080")',
    server: 'accept() (blocking)',
    syscall: 'connect() → 3-way handshake',
    description: 'Client calls connect() — the kernel sends the SYN packet and blocks until the handshake completes. Server\'s accept() returns a new file descriptor for each accepted connection. The original listening socket remains open for new connections.',
    color: '#f97316',
  },
  {
    name: 'Data Transfer',
    client: 'write() / send()',
    server: 'read() / recv()',
    syscall: 'send() ↔ recv()',
    description: 'Both sides read and write data through their file descriptors. The kernel buffers data in send and receive buffers. TCP handles all reliability, ordering, and flow control transparently.',
    color: G,
  },
  {
    name: 'Connection Closed',
    client: 'close(fd)',
    server: 'close(fd)',
    syscall: 'close() → FIN',
    description: 'close() sends FIN to initiate graceful teardown. The TCP 4-way FIN exchange happens. Active closer enters TIME_WAIT. Both file descriptors are released. All kernel resources cleaned up (eventually).',
    color: '#8b5cf6',
  },
]

function SocketLifecycleViewer() {
  const [step, setStep] = useState(0)
  const current = SOCKET_LIFECYCLE[step]

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>TCP Socket Connection Lifecycle</h3>
      <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--text-muted)' }}>
        Step through the system calls from socket creation to connection close.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
        {SOCKET_LIFECYCLE.map((s, i) => (
          <button key={i} onClick={() => setStep(i)}
            style={{ padding: '6px 14px', borderRadius: 20, border: `1px solid ${i === step ? s.color : 'var(--border)'}`, background: i === step ? s.color : 'var(--surface)', color: i === step ? '#fff' : 'var(--text-muted)', fontSize: 12, fontWeight: i === step ? 700 : 400, cursor: 'pointer' }}>
            {i + 1}. {s.name}
          </button>
        ))}
      </div>

      <div style={{ background: 'var(--surface)', border: `1px solid ${current.color}`, borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ background: current.color, color: '#fff', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontWeight: 700 }}>{current.name}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, opacity: 0.9 }}>{current.syscall}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderBottom: '1px solid var(--border)' }}>
          <div style={{ padding: '12px 16px', borderRight: '1px solid var(--border)' }}>
            <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 600, color: '#3b82f6' }}>CLIENT</p>
            <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)', lineHeight: 1.5 }}>{current.client}</p>
          </div>
          <div style={{ padding: '12px 16px' }}>
            <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 600, color: '#8b5cf6' }}>SERVER</p>
            <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)', lineHeight: 1.5 }}>{current.server}</p>
          </div>
        </div>
        <div style={{ padding: '12px 16px' }}>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>{current.description}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
          style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', cursor: step === 0 ? 'not-allowed' : 'pointer', opacity: step === 0 ? 0.4 : 1 }}>
          ← Back
        </button>
        <button onClick={() => setStep(s => Math.min(4, s + 1))} disabled={step === 4}
          style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: '1px solid var(--border)', background: G, color: '#fff', cursor: step === 4 ? 'not-allowed' : 'pointer', opacity: step === 4 ? 0.5 : 1 }}>
          Next →
        </button>
      </div>
    </div>
  )
}

/* ── Interactive Component 3: Five-Tuple Connection Tracker ──────────────── */

interface Connection {
  id: number
  srcIp: string
  srcPort: number
  dstIp: string
  dstPort: number
  proto: string
  state: string
  process: string
}

const INITIAL_CONNECTIONS: Connection[] = [
  { id: 1, srcIp: '192.168.1.10', srcPort: 54321, dstIp: '93.184.216.34', dstPort: 443, proto: 'TCP', state: 'ESTABLISHED', process: 'Chrome (web browser)' },
  { id: 2, srcIp: '192.168.1.10', srcPort: 54322, dstIp: '93.184.216.34', dstPort: 443, proto: 'TCP', state: 'ESTABLISHED', process: 'Chrome (same server, different tab)' },
  { id: 3, srcIp: '192.168.1.10', srcPort: 54400, dstIp: '8.8.8.8', dstPort: 53, proto: 'UDP', state: 'ESTABLISHED', process: 'systemd-resolved (DNS)' },
  { id: 4, srcIp: '192.168.1.10', srcPort: 22100, dstIp: '10.0.0.5', dstPort: 22, proto: 'TCP', state: 'ESTABLISHED', process: 'ssh (remote terminal)' },
  { id: 5, srcIp: '0.0.0.0', srcPort: 80, dstIp: '*', dstPort: 0, proto: 'TCP', state: 'LISTEN', process: 'nginx (web server)' },
]

function FiveTupleTracker() {
  const [selected, setSelected] = useState<number | null>(null)
  const [showAnnotation, setShowAnnotation] = useState(true)

  const conn = selected !== null ? INITIAL_CONNECTIONS.find(c => c.id === selected) : null

  const stateColor = (s: string) => {
    if (s === 'ESTABLISHED') return G
    if (s === 'LISTEN') return '#3b82f6'
    if (s === 'TIME_WAIT') return '#f59e0b'
    return '#6b7280'
  }

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>Five-Tuple Connection Tracker</h3>
      <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--text-muted)' }}>
        Each connection is uniquely identified by its 5-tuple. Click any row to see why the 5-tuple is unique even when using the same server.
      </p>

      <div style={{ overflowX: 'auto', marginBottom: 12 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
              {['Src IP', 'Src Port', 'Dst IP', 'Dst Port', 'Proto', 'State', 'Process'].map(h => (
                <th key={h} style={{ padding: '6px 10px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INITIAL_CONNECTIONS.map(c => (
              <tr
                key={c.id}
                onClick={() => setSelected(selected === c.id ? null : c.id)}
                style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', background: selected === c.id ? `${G}12` : 'transparent' }}
              >
                <td style={{ padding: '8px 10px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#3b82f6' }}>{c.srcIp}</td>
                <td style={{ padding: '8px 10px', fontFamily: 'var(--font-mono)', fontSize: 12, color: G }}>{c.srcPort || '—'}</td>
                <td style={{ padding: '8px 10px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)' }}>{c.dstIp}</td>
                <td style={{ padding: '8px 10px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)' }}>{c.dstPort || '—'}</td>
                <td style={{ padding: '8px 10px', color: 'var(--text)' }}>{c.proto}</td>
                <td style={{ padding: '8px 10px' }}>
                  <span style={{ color: stateColor(c.state), fontWeight: 600 }}>{c.state}</span>
                </td>
                <td style={{ padding: '8px 10px', color: 'var(--text-muted)', fontSize: 11.5 }}>{c.process}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAnnotation && (
        <div style={{ background: `${G}12`, border: `1px solid ${G}`, borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 12.5, color: 'var(--text)', lineHeight: 1.6 }}>
          <strong style={{ color: G }}>Key insight: </strong> Connections 1 and 2 go to the same server (93.184.216.34:443) but have different source ports (54321 vs 54322). This makes them distinct 5-tuples — the OS correctly delivers replies to the right browser tab.
          <button onClick={() => setShowAnnotation(false)} style={{ float: 'right', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 12 }}>✕</button>
        </div>
      )}

      {conn && (
        <div style={{ background: 'var(--surface)', border: `1px solid ${G}`, borderRadius: 8, padding: '12px 16px', fontSize: 13, lineHeight: 1.7, color: 'var(--text)' }}>
          <p style={{ margin: '0 0 6px', fontWeight: 700, color: G }}>5-Tuple: {conn.srcIp}:{conn.srcPort} ↔ {conn.dstIp}:{conn.dstPort} ({conn.proto})</p>
          <p style={{ margin: 0 }}>
            This 5-tuple is <strong>globally unique</strong> at the moment it is active. The kernel uses it to demultiplex incoming packets to the correct process. The server at {conn.dstIp} uses the reverse 5-tuple to send replies back.
          </p>
        </div>
      )}
    </div>
  )
}

/* ── Main export ──────────────────────────────────────────────────────────── */

export default function PortsAndSockets() {
  return (
    <LearnLayout
      title="Ports and Sockets"
      description="A complete treatment of how transport-layer ports enable multiplexing, how the 5-tuple uniquely identifies every network connection, how the socket API abstracts network I/O for applications, and the performance implications of port exhaustion and socket buffer tuning."
      section="Networking Fundamentals — Module 22"
      readTime="18–24 min"
      updatedAt="May 2026"
    >
      {/* Chapter 01 */}
      <Chapter n={1} />
      <H2>The Multiplexing Problem</H2>

      <StoryBox>
        A computer has one IP address. At any given moment, you have a browser open with 20 tabs, an SSH session to a server, a Zoom call, Slack messages arriving, and a background software update downloading. All of these simultaneously use the same IP address.
        <br /><br />
        When a TCP segment arrives at your IP address from Google&apos;s servers, how does the operating system know which of those twenty browser tabs it belongs to? The IP address identifies the machine, but not the specific application or conversation.
        <br /><br />
        The answer: <strong>port numbers</strong>. Each application binds to a distinct port. Each connection is identified by the combination of source IP, source port, destination IP, destination port, and protocol — the <strong>5-tuple</strong>. Every incoming packet&apos;s 5-tuple uniquely identifies exactly one active connection, and the OS delivers it to exactly the right application.
      </StoryBox>

      <Para>Ports are 16-bit unsigned integers (0–65535) that form the second level of addressing in the transport layer. IP addresses identify machines; ports identify the specific service or application on that machine. Together they form a <Accent>socket address</Accent> (IP:port pair) — one for each endpoint of a connection.</Para>

      <Para>The <Accent>5-tuple</Accent> that uniquely identifies every connection: <Code>(src_ip, src_port, dst_ip, dst_port, protocol)</Code>. This is the kernel&apos;s demultiplexing key — every incoming packet is matched against the connection table using this exact tuple. Two connections can share any four elements as long as the fifth differs.</Para>

      <WowBox>
        A single server can handle millions of simultaneous connections despite having just one IP address and one port (e.g., 443 for HTTPS). All those connections share the same destination IP:port — but each has a different source IP:port combination, making every 5-tuple unique. AWS servers in peak Black Friday traffic routinely handle &gt;1 million active TCP connections per IP address.
      </WowBox>

      <Divider />

      {/* Chapter 02 */}
      <Chapter n={2} />
      <H2>Port Ranges and Registration</H2>

      <StoryBox>
        IANA (Internet Assigned Numbers Authority) maintains the port number registry — a list of which organization has claimed which port for which protocol. It is not a technical enforcement mechanism: the OS will happily run any service on any port. But it is a coordination mechanism: by assigning port 443 to HTTPS, every client in the world knows to try port 443 for secure web access. Without this coordination, every web server would choose a random port and clients would have no way to find them.
      </StoryBox>

      <Para>IANA divides the 65535 ports into three ranges:</Para>

      <Para>• <Accent>Well-Known Ports (0–1023)</Accent>: assigned to specific protocols by IANA. Require root/administrator privileges to bind on Unix/Linux (privilege separation prevents unprivileged processes from impersonating system services). HTTP:80, HTTPS:443, SSH:22, DNS:53, SMTP:25.</Para>

      <Para>• <Accent>Registered Ports (1024–49151)</Accent>: can be registered with IANA by application vendors without requiring root. MySQL (3306), PostgreSQL (5432), Redis (6379), MongoDB (27017), Elasticsearch (9200). Many appear in /etc/services on Unix systems.</Para>

      <Para>• <Accent>Dynamic/Ephemeral Ports (49152–65535)</Accent>: not assigned. Used by the OS for client-side source ports. When you connect to a web server, the OS picks a random ephemeral port for your side of the connection. RFC 6335 designates 49152–65535 as the IANA ephemeral range, but Linux defaults to 32768–60999.</Para>

      <CodeBlock>{`# View port assignments
cat /etc/services | head -50              # Well-known and registered port list
getent services 443                       # Lookup specific port name

# Check ephemeral port range (Linux)
sysctl net.ipv4.ip_local_port_range       # Default: 32768 60999

# Expand ephemeral range (more ports available for outbound connections)
sysctl -w net.ipv4.ip_local_port_range="1024 65535"

# See what is listening
ss -tlnp                                  # TCP listening ports with process
ss -ulnp                                  # UDP listening ports with process
ss -tlnp | awk '{print $4}' | sort -n    # Just the ports

# See all active connections + listening
ss -tanp                                  # TCP all states with process info`}</CodeBlock>

      <Divider />

      {/* Chapter 03 */}
      <Chapter n={3} />
      <H2>Well-Known Ports — A Security Reference</H2>

      <StoryBox>
        A security engineer is auditing a server. She runs <code>ss -tlnp</code> and sees ports 21 (FTP), 23 (Telnet), 3389 (RDP), and 5900 (VNC) all open on public interfaces. Any one of these would be a critical finding: FTP and Telnet send credentials in plaintext; RDP and VNC directly facing the internet are prime ransomware targets. The firewall had been misconfigured during a &quot;temporary test&quot; that became permanent. Knowing what each port means — and its security implications — is an essential operational skill.
      </StoryBox>

      <WellKnownPortExplorer />

      <H3>Security Port Scanning — What Attackers See</H3>
      <Para>Attackers routinely scan the internet for open ports. Shodan, Censys, and custom scanners probe every IPv4 address constantly. Services exposed on well-known ports (especially 22, 3389, 23, 21) receive automated probes within minutes of being connected. Understanding which ports you expose is not optional — it is the first step in every security assessment.</Para>

      <CodeBlock>{`# Check what ports are visible externally (from an attacker's perspective)
nmap -sT -p 1-1024 your.external.ip     # TCP connect scan of well-known ports
nmap -sU -p 53,123,161 your.external.ip  # UDP scan of common UDP ports

# Shodan query to see what is exposed on your IP
# shodan host <your_ip>

# Check for services running on non-standard ports (hiding)
nmap -sV -p 1-65535 --open 192.168.1.1  # Full port range service detection

# Close unnecessary ports:
# Ubuntu/Debian: ufw deny 23 (telnet)
# or iptables: iptables -A INPUT -p tcp --dport 23 -j DROP`}</CodeBlock>

      <Divider />

      {/* Chapter 04 */}
      <Chapter n={4} />
      <H2>Sockets — The Application Interface to the Network</H2>

      <StoryBox>
        A socket is one of the most elegant abstractions in computing. The Unix philosophy: everything is a file. A socket is a file descriptor — just like a regular file, a pipe, or a device. You read() from it and write() to it. The OS handles the network complexity below. An application that reads from a socket cannot tell (at the API level) whether the data came from across the room or across the planet.
        <br /><br />
        This abstraction is so clean that the same network socket API, defined in BSD Unix in 1983, runs on every operating system today — Linux, macOS, Windows (WinSock), iOS, Android. A network program written for BSD in 1985 compiles and runs unchanged on modern Linux. Forty years of API stability, serving billions of connections per second.
      </StoryBox>

      <Para>The socket API abstracts four key operations into standard file I/O:</Para>
      <Para>• <Code>socket()</Code>: create a socket (returns a file descriptor). Specify address family (AF_INET for IPv4, AF_INET6 for IPv6), type (SOCK_STREAM for TCP, SOCK_DGRAM for UDP), and protocol.</Para>
      <Para>• <Code>bind()</Code>: associate the socket with a local address and port. Servers call this; clients usually let the OS assign an ephemeral source port automatically.</Para>
      <Para>• <Code>listen()</Code> + <Code>accept()</Code>: server-side. listen() marks the socket as passive. accept() blocks until a client connects, then returns a new socket fd for that specific connection.</Para>
      <Para>• <Code>connect()</Code>: client-side. Establishes a connection to a remote socket address. For TCP, this triggers the 3-way handshake.</Para>

      <SocketLifecycleViewer />

      <H3>Socket Options — Tuning Connection Behavior</H3>
      <CodeBlock>{`# Key socket options and their effects

# SO_REUSEADDR — allow bind to port with sockets in TIME_WAIT
# Essential for server restart without waiting 2-4 minutes
sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

# SO_REUSEPORT — allow multiple sockets to bind the same address:port
# Enables multiple processes/threads to accept connections on the same port
# Kernel load-balances incoming connections across all bound sockets
sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)

# TCP_NODELAY — disable Nagle algorithm
# Essential for interactive protocols (SSH, gaming, trading)
sock.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)

# SO_KEEPALIVE — enable TCP keepalive probes
# Detects dead connections without application-layer heartbeats
sock.setsockopt(socket.SOL_SOCKET, socket.SO_KEEPALIVE, 1)
# Customize keepalive (Linux)
sock.setsockopt(socket.IPPROTO_TCP, socket.TCP_KEEPIDLE, 60)   # First probe after 60s idle
sock.setsockopt(socket.IPPROTO_TCP, socket.TCP_KEEPINTVL, 10)  # Probe interval 10s
sock.setsockopt(socket.IPPROTO_TCP, socket.TCP_KEEPCNT, 6)     # Close after 6 failed probes

# SO_RCVBUF / SO_SNDBUF — receive/send buffer size
sock.setsockopt(socket.SOL_SOCKET, socket.SO_RCVBUF, 8388608)  # 8 MB receive buffer

# SO_LINGER — control behavior on close()
# Default: FIN graceful close (lingering allowed)
# linger=0 timeout=0: RST on close (immediate, no TIME_WAIT)
import struct
linger = struct.pack('ii', 1, 0)   # l_onoff=1, l_linger=0
sock.setsockopt(socket.SOL_SOCKET, socket.SO_LINGER, linger)   # RST instead of FIN`}</CodeBlock>

      <Divider />

      {/* Chapter 05 */}
      <Chapter n={5} />
      <H2>The 5-Tuple and Connection Demultiplexing</H2>

      <StoryBox>
        Your laptop is connected to a Netflix server. At the same moment, you open a second Netflix window and connect again. Both connections go from your IP address (say 192.168.1.10) to the same Netflix server IP (e.g., 52.94.236.152) on the same port (443). How does the OS know which incoming packet belongs to which window?
        <br /><br />
        The answer: the source port differs. Window 1 might use source port 54321; Window 2 uses 54322. The destination IP and port are identical, but the two 5-tuples are different. The kernel&apos;s connection table holds both entries and delivers packets to the correct socket — and thus the correct window — perfectly.
      </StoryBox>

      <FiveTupleTracker />

      <H3>How the Kernel Uses the 5-Tuple</H3>
      <Para>The kernel maintains a hash table of active TCP connections indexed by 5-tuple. When a TCP segment arrives:</Para>
      <Para>1. Extract the 5-tuple from the IP and TCP headers.</Para>
      <Para>2. Hash the 5-tuple to find the bucket in the connection hash table.</Para>
      <Para>3. Walk the bucket list to find the exact matching connection (or LISTEN socket for new connections).</Para>
      <Para>4. Deliver the segment to the associated socket&apos;s receive buffer.</Para>
      <Para>5. Wake the application thread if it is blocked in recv() waiting for data.</Para>

      <Para>This lookup is O(1) average case — a critical property when a server has millions of active connections. Modern kernels use sophisticated hash functions (SipHash) to prevent hash collision attacks where an attacker crafts connections that all map to the same hash bucket, degrading lookup to O(n) and causing CPU exhaustion.</Para>

      <WowBox>
        The most active TCP listeners on the internet (Google, AWS, Cloudflare load balancers) handle 1–10 million simultaneous connections per machine. The kernel&apos;s connection hash table, socket memory management, and interrupt coalescing (not delivering one interrupt per packet, but batching them) are all finely tuned for this scale. A standard Linux kernel with default settings can handle roughly 65,000 connections; with tuning it scales to millions.
      </WowBox>

      <Divider />

      {/* Chapter 06 */}
      <Chapter n={6} />
      <H2>Port Exhaustion — Running Out of Connections</H2>

      <StoryBox>
        A microservice makes 50,000 database connections per second. Each connection uses one ephemeral port on the service&apos;s IP. Linux&apos;s default ephemeral range is 32768–60999 — that&apos;s 28,231 ports. At 50,000 connections/second with a 30-second database query timeout, the service needs 1.5 million simultaneous port allocations. But only 28,231 are available. New connections fail with &quot;Cannot assign requested address.&quot;
        <br /><br />
        This is port exhaustion — one of the most common scaling failures in microservice architectures.
      </StoryBox>

      <Para>Port exhaustion occurs when a client runs out of available source ports to open new connections. The 5-tuple must be unique — if all 28,231 ephemeral ports to the same destination IP:port are in use (or in TIME_WAIT), no new connections can be opened.</Para>

      <H3>Solutions to Port Exhaustion</H3>
      <Para>• <Accent>Connection pooling</Accent>: reuse existing connections rather than creating new ones per request. This is the primary and best solution — reduce connection creation rate. Database connection pools (PgBouncer, ProxySQL) are essential for high-throughput services.</Para>
      <Para>• <Accent>Expand ephemeral range</Accent>: <Code>sysctl -w net.ipv4.ip_local_port_range="1024 65535"</Code>. Increases available ports from ~28K to ~64K. Combined with SO_REUSEADDR or SO_REUSEPORT, allows faster port recycling.</Para>
      <Para>• <Accent>Enable tcp_tw_reuse</Accent>: <Code>sysctl -w net.ipv4.tcp_tw_reuse=1</Code>. Allows reuse of TIME_WAIT sockets for new outbound connections when safe (TCP Timestamps required). Dramatically reduces TIME_WAIT accumulation.</Para>
      <Para>• <Accent>Reduce TIME_WAIT duration</Accent>: cautiously. <Code>net.ipv4.tcp_fin_timeout</Code> controls FIN_WAIT_2 timeout (default 60s), not TIME_WAIT directly. The TIME_WAIT duration (2 × MSL = 60–120s) is not directly configurable in modern Linux kernels — it is a correctness invariant.</Para>
      <Para>• <Accent>Multiple source IPs</Accent>: bind to multiple IP addresses. Each (src_ip, dst_ip, dst_port, proto) tuple allows a separate set of 64K source ports. A service with 4 VIPs has 4× the connection capacity to any given destination.</Para>

      <CodeBlock>{`# Diagnose port exhaustion
ss -s                                     # Socket summary statistics
ss -tan | awk '{print $1}' | sort | uniq -c  # Count connections by state

# Check TIME_WAIT count (high = port pressure)
ss -tan state time-wait | wc -l

# Tune for high connection rate
sysctl -w net.ipv4.ip_local_port_range="1024 65535"   # Expand ephemeral range
sysctl -w net.ipv4.tcp_tw_reuse=1                      # Reuse TIME_WAIT sockets
sysctl -w net.ipv4.tcp_fin_timeout=15                  # Reduce FIN_WAIT_2 timeout

# Connection pool sizing formula:
# pool_size = peak_QPS × avg_query_time_seconds
# Example: 10,000 QPS × 0.010s = 100 connections needed
# With pgbouncer: 1 connection handles many queries via multiplexing`}</CodeBlock>

      <Divider />

      {/* Chapter 07 */}
      <Chapter n={7} />
      <H2>Server-Side Connection Handling — accept() and Backlog</H2>

      <StoryBox>
        A web server under heavy load starts rejecting connections. Users see &quot;Connection refused&quot; errors. The server is CPU and memory fine — barely above baseline load. The issue: the accept() backlog queue is full. When TCP completes a handshake, the connection waits in the accept queue for the application to call accept(). If the application is slow calling accept() and many connections complete simultaneously (e.g., viral traffic spike), the queue fills. The kernel rejects new handshakes with RST until the queue drains.
      </StoryBox>

      <Para>The TCP accept backlog consists of two queues in the Linux kernel:</Para>
      <Para>• <Accent>SYN queue (incomplete connections)</Accent>: SYN received, SYN-ACK sent, waiting for ACK. Size controlled by <Code>net.ipv4.tcp_max_syn_backlog</Code> (default 128, typically increased to 65536 for production).</Para>
      <Para>• <Accent>Accept queue (complete connections)</Accent>: 3-way handshake complete, waiting for application to call accept(). Size = <Code>min(backlog, net.core.somaxconn)</Code> where backlog is the value passed to listen().</Para>

      <CodeBlock>{`# Production server tuning for high concurrency
sysctl -w net.core.somaxconn=65536            # Max accept queue length
sysctl -w net.ipv4.tcp_max_syn_backlog=65536  # Max SYN queue length

# In application code — set high backlog on listen()
# Python
server.listen(65535)  # Request 65535 backlog (capped by somaxconn)

# C / Go
listen(fd, SOMAXCONN)   // Use maximum

# Verify queue sizes
ss -tlnp | grep :443   # Shows Recv-Q (current accept queue depth) and Send-Q (queue limit)
# If Recv-Q > 0 consistently: application is too slow calling accept()

# Monitor dropped connections
netstat -s | grep "SYN flood\|listen queue"
cat /proc/net/netstat | grep ListenOverflows`}</CodeBlock>

      <Divider />

      {/* Chapter 08 */}
      <Chapter n={8} />
      <H2>Non-Blocking I/O and Event-Driven Servers</H2>

      <StoryBox>
        In the early web era (Apache prefork model), each connection was handled by a dedicated process. 10,000 connections required 10,000 processes, each consuming megabytes of memory. This is the C10K problem (10,000 concurrent connections), which seemed insurmountable in the 1990s.
        <br /><br />
        The solution: event-driven I/O. Instead of blocking in read() and write() per connection, a single thread monitors thousands of sockets simultaneously using I/O multiplexing (select, poll, epoll, kqueue). When any socket becomes readable or writable, the thread handles it. nginx and Node.js became famous for handling 10,000 or 100,000 connections with a single process using this model.
      </StoryBox>

      <Para>I/O multiplexing mechanisms in order of scalability:</Para>
      <Para>• <Code>select()</Code>: monitors up to FD_SETSIZE (1024) file descriptors. O(n) scan on every call. Obsolete for modern servers.</Para>
      <Para>• <Code>poll()</Code>: removes the 1024 limit but still O(n) scan. Portable but not scalable.</Para>
      <Para>• <Code>epoll()</Code> (Linux): O(1) ready fd notification. The kernel maintains the interest list; applications only process events that are actually ready. Scales to millions of connections. Used by nginx, Redis, Node.js.</Para>
      <Para>• <Code>kqueue()</Code> (BSD/macOS): equivalent to epoll for BSD-family systems.</Para>
      <Para>• <Code>io_uring</Code> (Linux 5.1+): asynchronous I/O interface that avoids system call overhead entirely. Batches I/O operations for extreme throughput.</Para>

      <CodeBlock>{`# epoll server pattern (Python asyncio uses epoll internally)
import asyncio

async def handle_client(reader, writer):
    data = await reader.read(1024)
    writer.write(b"Echo: " + data)
    await writer.drain()
    writer.close()

async def main():
    server = await asyncio.start_server(handle_client, '0.0.0.0', 8888)
    async with server:
        await server.serve_forever()

asyncio.run(main())
# asyncio uses epoll (Linux) or kqueue (macOS) under the hood
# Single event loop handles thousands of concurrent connections`}</CodeBlock>

      <Divider />

      {/* Chapter 09 */}
      <Chapter n={9} />
      <H2>Unix Domain Sockets — IPC via Socket API</H2>

      <StoryBox>
        A web application needs to talk to a database on the same machine. It could use TCP (127.0.0.1:5432) — this works, but adds TCP overhead: socket creation, 3-way handshake, ACK for every segment, checksum computation. Or it could use a Unix domain socket (a file path like /var/run/postgresql/.s.PGSQL.5432). No TCP overhead, no IP stack, no checksum — just a memory buffer in the kernel. Communication is ~30% faster and uses no network interfaces.
      </StoryBox>

      <Para>Unix domain sockets (AF_UNIX) use the same socket API but communicate within the kernel, without going through the network stack. They appear as files in the filesystem (typically .sock files). Processes find each other by file path rather than IP:port.</Para>

      <Para>Benefits over TCP loopback (127.0.0.1):</Para>
      <Para>• No TCP overhead (no handshake, no sequence numbers, no ACKs, no checksums)</Para>
      <Para>• Faster: data goes directly from sender&apos;s buffer to receiver&apos;s buffer via kernel memcpy</Para>
      <Para>• File permissions control access (read/write bits on the socket file)</Para>
      <Para>• Can pass file descriptors between processes (sendmsg with SCM_RIGHTS)</Para>
      <Para>• Can pass process credentials (SO_PEERCRED) for authentication without passwords</Para>

      <CodeBlock>{`# Common Unix domain socket paths in production systems
# PostgreSQL:  /var/run/postgresql/.s.PGSQL.5432
# MySQL:       /var/lib/mysql/mysql.sock
# Redis:       /var/run/redis/redis.sock
# nginx:       /run/nginx.sock (for upstream PHP-FPM)
# Docker:      /var/run/docker.sock

# Connect to PostgreSQL via Unix socket (psql)
psql -h /var/run/postgresql -U username dbname

# Connect to MySQL via Unix socket
mysql -S /var/lib/mysql/mysql.sock -u root

# Python: connect via Unix socket
import socket
sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
sock.connect('/tmp/my-service.sock')`}</CodeBlock>

      <Warn>
        The Docker socket (<Code>/var/run/docker.sock</Code>) gives complete control over the Docker daemon — equivalent to root access on the host. Mounting it into a container is a critical privilege escalation vector. An attacker who can write to a container with docker.sock mounted can escape the container entirely by spawning a new privileged container with full host filesystem access.
      </Warn>

      <Divider />

      {/* Chapter 10 */}
      <Chapter n={10} />
      <H2>Port Scanning and Service Discovery</H2>

      <StoryBox>
        A system administrator needs to inventory all services running on a network segment. Rather than logging into each server, she uses nmap — a network scanner that probes TCP ports by attempting connections, observing responses, and fingerprinting the services behind them. Within minutes she has a complete map of open ports, running services, software versions, and even operating system guesses — all from outside the servers, using only the port and socket mechanics already described.
      </StoryBox>

      <H3>How Port Scanners Work</H3>
      <Para>Port scanners test reachability and service presence by exploiting the socket API&apos;s predictable behavior:</Para>
      <Para>• <Accent>TCP SYN scan (half-open)</Accent>: send SYN. RST means port closed. SYN-ACK means port open (scanner immediately sends RST instead of completing the handshake). Faster than full connect scan; less likely to appear in application logs (the handshake never completes).</Para>
      <Para>• <Accent>TCP Connect scan</Accent>: complete the full 3-way handshake. Requires no raw socket privileges but leaves entries in server logs.</Para>
      <Para>• <Accent>UDP scan</Accent>: send UDP packet. ICMP Port Unreachable (Type 3 Code 3) means port closed. No response (or service response) means open. Slow due to ICMP rate limiting.</Para>
      <Para>• <Accent>Service version detection</Accent>: after finding an open port, send protocol-specific probes and analyze the banner/response to identify the service and version.</Para>

      <CodeBlock>{`# nmap scanning fundamentals

# SYN scan (fast, stealthy — requires root/administrator)
nmap -sS 10.0.0.0/24                    # SYN scan entire /24 subnet

# Full connect scan (no root required)
nmap -sT 10.0.0.1                       # TCP connect scan

# UDP scan of common ports
nmap -sU --top-ports 100 10.0.0.1       # Top 100 UDP ports

# Service version detection
nmap -sV 10.0.0.1                       # Detect service versions

# OS fingerprinting
nmap -O 10.0.0.1                        # Guess OS (requires root)

# Aggressive: SYN + version + OS + scripts + traceroute
nmap -A 10.0.0.1                        # Full aggressive scan

# Scan for specific common ports
nmap -p 22,80,443,3306,5432,6379 10.0.0.1  # Specific ports

# Output to file
nmap -sS -oN scan_results.txt 10.0.0.0/24`}</CodeBlock>

      <Divider />

      {/* Chapter 11 */}
      <Chapter n={11} />
      <H2>Firewall Port Rules — Translating Policy to Packets</H2>

      <StoryBox>
        A developer writes: &quot;Allow inbound HTTPS.&quot; A network engineer must translate this to: allow TCP destination port 443 from any source. But also: allow ICMP type 3 (unreachable, for PMTUD). And: allow established connections inbound (return traffic for connections initiated from inside). And: block everything else by default. A single business policy statement maps to multiple technical rules at the packet level.
      </StoryBox>

      <Para>Firewall rules operate on the 5-tuple — matching packets based on source IP, destination IP, source port, destination port, and protocol. Understanding ports directly translates to understanding how to write firewall rules correctly.</Para>

      <CodeBlock>{`# iptables rules implementing a simple server policy

# Default: deny all
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT   # Allow all outbound (common for servers)

# Allow established/related (return traffic for outbound connections)
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# Allow loopback
iptables -A INPUT -i lo -j ACCEPT

# Allow SSH (rate-limited to prevent brute force)
iptables -A INPUT -p tcp --dport 22 -m conntrack --ctstate NEW \
  -m recent --set --name ssh_rate
iptables -A INPUT -p tcp --dport 22 -m conntrack --ctstate NEW \
  -m recent --update --seconds 60 --hitcount 10 --name ssh_rate -j DROP
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Allow HTTP and HTTPS
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Allow ICMP for connectivity testing and PMTUD
iptables -A INPUT -p icmp --icmp-type destination-unreachable -j ACCEPT
iptables -A INPUT -p icmp --icmp-type echo-request -m limit --limit 10/s -j ACCEPT

# Log and drop everything else
iptables -A INPUT -j LOG --log-prefix "DROPPED: "
iptables -A INPUT -j DROP`}</CodeBlock>

      <Divider />

      {/* Chapter 12 */}
      <Chapter n={12} />
      <H2>Troubleshooting Connection Issues</H2>

      <StoryBox>
        A user reports: &quot;I can&apos;t connect to the application.&quot; The systematic diagnostic approach: can you ping the server? (Layer 3 reachability). Can you telnet to the port? (Is the service listening?). Does the connection hang or refuse? (Hang = firewall blocking; refuse = service not running or port not open). Does it connect but immediately disconnect? (Service running but rejecting the client). Each symptom points to a specific layer.
      </StoryBox>

      <CodeBlock>{`# Connection diagnostic toolkit

# 1. Basic port reachability (TCP)
nc -zv 10.0.0.1 443                     # TCP connection test to port 443
# Success: "Connection to 10.0.0.1 443 port [tcp/https] succeeded!"
# Refused: "Connection refused" (port not open or firewall sends RST)
# Timeout: firewall drops packets (no RST, just silence)

# 2. Check if service is listening locally
ss -tlnp | grep 443                     # Is anything listening on port 443?

# 3. Test UDP service
nc -u -zv 10.0.0.1 53                   # UDP port test
echo "" | nc -u 10.0.0.1 53             # Send empty UDP datagram

# 4. Trace the connection attempt
strace -e trace=network nc 10.0.0.1 443 # See every syscall the connection makes

# 5. Watch connection state
ss -tan | grep 10.0.0.1:443             # Connection state to specific IP:port

# 6. Check firewall is not blocking
iptables -L -n -v | grep dpt:443        # Check rules for port 443
iptables -L -n --line-numbers          # List all rules with line numbers

# 7. Packet capture of connection attempt
tcpdump -i eth0 -n 'host 10.0.0.1 and port 443' -c 20  # Capture 20 packets`}</CodeBlock>

      <Divider />

      {/* Chapter 13 */}
      <Chapter n={13} />
      <H2>Common Misconceptions</H2>

      <Err>
        <strong>A server can only handle 65,535 simultaneous connections because there are only 65,535 ports.</strong> Port numbers limit the number of distinct SOURCE ports from one client IP to one server IP:port. A server handles unlimited distinct clients because the 5-tuple uniquely identifies each connection — the server&apos;s port (e.g., 443) stays constant; the client&apos;s (src_ip, src_port) pair provides uniqueness. A server receiving from 1 million different clients on port 443 has 1 million unique 5-tuples — all valid simultaneously.
      </Err>

      <Err>
        <strong>Opening a connection to a server &quot;uses up&quot; a port on the server side.</strong> Servers do not allocate a new port for each incoming connection. The server always listens on the same port (e.g., 443). When a client connects, the server&apos;s accept() returns a new socket file descriptor, not a new port. The server&apos;s side of every connection continues to use port 443. Port exhaustion is exclusively a client-side problem (running out of ephemeral source ports).
      </Err>

      <Err>
        <strong>Connection refused and connection timeout mean the same thing.</strong> Connection refused means the OS at the destination sent RST — the target machine is reachable and actively rejecting the connection (either no service is listening or an application sent RST). Connection timeout means no response at all — either the destination is unreachable, or a firewall is silently dropping packets (DROP rule, not REJECT rule). These require completely different remediation steps.
      </Err>

      <Err>
        <strong>A service running on a non-standard port is secure through obscurity.</strong> Moving SSH from port 22 to port 2222 reduces automated scan hits (most scanners target well-known ports by default). But a full port range scan (<Code>nmap -p 1-65535</Code>) finds the service in minutes. Service security requires authentication, authorization, encryption, and patching — not port choice. Running SSH on a non-standard port is a noise reduction measure, not a security control.
      </Err>

      <Err>
        <strong>SO_REUSEADDR and SO_REUSEPORT do the same thing.</strong> SO_REUSEADDR allows a new server to bind to a port that has sockets in TIME_WAIT from a previous server instance. Essential for restart without waiting. SO_REUSEPORT allows multiple, simultaneously-running processes to bind the same address:port — the kernel load-balances incoming connections. Used for multi-process servers (pre-fork model) where each worker process listens on the same port independently.
      </Err>

      <Err>
        <strong>Closing a socket immediately frees the port for reuse.</strong> A TCP socket in TIME_WAIT after close() still occupies an entry in the kernel&apos;s connection table. The port used by that connection cannot be immediately reused for a new connection to the same remote IP:port combination (it can be reused for connections to other destinations, since the 5-tuple differs). This is why high-connection-rate clients to the same destination exhaust ports despite closing connections promptly — TIME_WAIT accumulates faster than it expires.
      </Err>

      <Divider />

      {/* Chapter 14 */}
      <Chapter n={14} />
      <H2>Depth Check</H2>

      <IQ level="Beginner">
        What is a socket and how does it differ from a port? A port is a 16-bit number that identifies a service endpoint on a machine (e.g., port 443 for HTTPS). A socket is a software abstraction — a file descriptor created by the OS that represents one endpoint of a network connection. A socket has a socket address (IP:port pair). Multiple sockets can use the same port (every active connection to a server has its own socket, all sharing the server&apos;s port 443).
      </IQ>

      <IQ level="Intermediate">
        Explain why the 5-tuple must be unique and what happens when two connections would have the same 5-tuple. The 5-tuple (src_ip, src_port, dst_ip, dst_port, protocol) is the kernel&apos;s demultiplexing key for incoming packets. If two active connections had identical 5-tuples, the kernel could not determine which connection a packet belongs to. The OS prevents this: when a client tries to establish a connection that would create a duplicate 5-tuple, connect() fails with EADDRINUSE (or the OS picks a different ephemeral source port). Connections in TIME_WAIT also prevent 5-tuple reuse until they expire.
      </IQ>

      <IQ level="Senior">
        What is the difference between SO_REUSEADDR, SO_REUSEPORT, and tcp_tw_reuse, and when should each be used? SO_REUSEADDR: allows binding to an address:port that has sockets in TIME_WAIT — used for server restart without waiting. SO_REUSEPORT: allows multiple processes to bind the same address:port simultaneously — used for multi-process server architectures where the kernel load-balances across workers. tcp_tw_reuse (sysctl): allows the client side to reuse TIME_WAIT socket ports for new outbound connections when TCP Timestamps are present and sufficient time has passed — safe for clients making many short-lived outbound connections to the same server.
      </IQ>

      <IQ level="Senior">
        Explain how epoll achieves O(1) complexity compared to select&apos;s O(n). select() takes a set of file descriptors and returns which are ready by scanning all registered fds every call. As the number of connections grows, the scan time grows linearly — O(n). epoll() uses a kernel data structure that maintains the set of monitored fds. When any fd becomes ready, the kernel adds it to a ready list. epoll_wait() returns only the ready fds — the application doesn&apos;t scan anything. Adding/removing fds from monitoring is O(log n) (using a red-black tree). Getting ready events is O(1) in ready fds regardless of total monitored count. This is why nginx handles 100,000 concurrent connections efficiently while Apache prefork with select could not.
      </IQ>

      <IQ level="PhD">
        Describe the hash collision attack against TCP connection tables and how it was mitigated. The kernel&apos;s TCP connection hash table uses a hash function over the 5-tuple to determine the bucket. If an attacker can predict the hash function and craft connections that all map to the same bucket, linear probing degrades lookup from O(1) to O(n), causing CPU exhaustion. This was a real attack: Linux used a deterministic hash (Bob Jenkins) that could be computed from public information. Mitigation: randomize the hash secret per boot (or per connection attempt). Linux switched to SipHash (a cryptographic PRF) seeded with a random secret at boot time. An attacker who cannot predict the hash secret cannot craft bucket-colliding 5-tuples, maintaining O(1) average lookup regardless of connection pattern.
      </IQ>

      <Divider />

      <KeyTakeaways items={[
        'Ports are 16-bit identifiers that allow multiple services to share one IP address. The 5-tuple (src_ip, src_port, dst_ip, dst_port, protocol) uniquely identifies every active connection.',
        'Port ranges: 0-1023 well-known (root required to bind), 1024-49151 registered, 49152-65535 dynamic/ephemeral (OS-assigned for client source ports).',
        'A server handles unlimited simultaneous connections on one port — the server&apos;s port stays constant; client diversity (src_ip, src_port) makes each 5-tuple unique.',
        'Port exhaustion is client-side: running out of ephemeral source ports when making many connections to the same destination. Fix with connection pooling, expanded ephemeral range, or multiple source IPs.',
        'Socket API: socket() creates fd, bind() assigns address, listen()/accept() enables servers, connect() establishes TCP connection. Unix domain sockets use the same API for faster local IPC.',
        'SO_REUSEADDR: allows binding ports in TIME_WAIT (server restart). SO_REUSEPORT: multiple processes share one port (kernel load-balances). tcp_tw_reuse: client-side TIME_WAIT socket recycling.',
        'Connection refused = RST received = port not open or actively rejected. Timeout = no response = firewall DROP rule or host unreachable. Crucially different diagnoses.',
        'epoll() achieves O(1) event notification regardless of connection count. select() scans O(n) descriptors on every call. This difference is why nginx handles 100K connections; Apache prefork could not.',
        'Unix domain sockets bypass the entire TCP/IP stack for local IPC — 30% faster than TCP loopback. Used by PostgreSQL, MySQL, Redis, nginx-to-PHP-FPM communication.',
        'Port security: moving services to non-standard ports reduces automated scan noise but is not a security control. Full range scans find services regardless of port choice in minutes.',
      ]} />
    </LearnLayout>
  )
}
