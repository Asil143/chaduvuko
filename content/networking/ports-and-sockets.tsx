'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

/* ── design tokens ──────────────────────────────────────────────────── */
const G = '#10b981'
const FONT_MONO = 'var(--font-mono)'
const FONT_DISPLAY = 'var(--font-display)'

/* ── helper components ──────────────────────────────────────────────── */
const Chapter = ({ n, title, subtitle }: { n: string; title: string; subtitle?: string }) => (
  <div style={{ marginBottom: 36 }}>
    <p style={{ fontSize: 11, color: G, fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 6px', letterSpacing: '.12em' }}>
      {`// CHAPTER ${n}`}
    </p>
    <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: subtitle ? '0 0 8px' : 0 }}>{title}</h2>
    {subtitle && <p style={{ fontSize: 15, color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>{subtitle}</p>}
  </div>
)

const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '56px 0' }} />

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.95, margin: '0 0 20px' }}>{children}</p>
)

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', margin: '40px 0 14px', letterSpacing: '-0.5px' }}>{children}</h3>
)

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', margin: '28px 0 10px' }}>{children}</h4>
)

const Accent = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: G, fontWeight: 700 }}>{children}</strong>
)

const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{ fontSize: 13, background: `${G}18`, color: G, padding: '2px 7px', borderRadius: 5, fontFamily: FONT_MONO }}>{children}</code>
)

const CodeBlock = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div style={{ margin: '24px 0', borderRadius: 10, overflow: 'hidden', border: '1px solid #30363d' }}>
    {title && (
      <div style={{ background: '#161b22', padding: '8px 16px', borderBottom: '1px solid #30363d' }}>
        <span style={{ fontSize: 12, color: '#8b949e', fontFamily: FONT_MONO }}>{title}</span>
      </div>
    )}
    <pre style={{ background: '#0d1117', padding: '18px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.75, color: '#e6edf3', margin: 0, fontFamily: FONT_MONO }}>
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
  <div style={{ background: `${G}0d`, border: `1px solid ${G}30`, borderRadius: 10, padding: '20px 24px', margin: '28px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: G, fontFamily: FONT_MONO, letterSpacing: '.12em', margin: '0 0 10px' }}>{emoji} {title}</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
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

/* ── interactive: Well-Known Port Explorer ──────────────────────────── */
const WELL_KNOWN_PORTS = [
  { port: 20, proto: 'TCP', service: 'FTP Data', cat: 'File Transfer', color: '#f97316', description: 'FTP active mode data channel. The server initiates a connection back to the client on port 20. Largely replaced by FTP passive mode (PASV) which uses a dynamic negotiated port above 1023.', sec: 'Unencrypted — credentials and data in plaintext. Replace with SFTP (port 22) or FTPS (port 990/implicit, 21/explicit).' },
  { port: 21, proto: 'TCP', service: 'FTP Control', cat: 'File Transfer', color: '#f97316', description: 'FTP control channel. Client connects here to issue FTP commands (USER, PASS, LIST, RETR, STOR, PASV). Session setup happens here; actual data uses port 20 (active) or negotiated port (passive).', sec: 'Credentials sent in plaintext. Block externally or replace entirely with SFTP.' },
  { port: 22, proto: 'TCP', service: 'SSH / SFTP / SCP', cat: 'Remote Access', color: G, description: 'Secure Shell — encrypted remote terminal, SFTP/SCP file transfer, port forwarding, and tunneling. Replaced Telnet (23), rsh, rlogin entirely. Key-based auth strongly preferred over password auth.', sec: 'Disable password auth; use key-based. Limit source IPs via firewall. Consider port knocking or fail2ban for brute-force protection.' },
  { port: 25, proto: 'TCP', service: 'SMTP (server-to-server)', cat: 'Email', color: '#3b82f6', description: 'Server-to-server email delivery (MTA to MTA). NOT for client email submission (use 587 or 465). Most ISPs block outbound port 25 from residential IPs to prevent spam. Requires STARTTLS + authentication for submission.', sec: 'ISPs block outbound port 25 from residential connections. Use 587 (STARTTLS) or 465 (SMTPS) for client submission.' },
  { port: 53, proto: 'UDP/TCP', service: 'DNS', cat: 'Infrastructure', color: '#8b5cf6', description: 'Domain Name System. UDP for queries under 512 bytes; TCP for large responses (DNSSEC, zone transfers) or when retrying after UDP truncation. Every network connection starts with at least one DNS query.', sec: 'DNS is unencrypted by default — queries visible to ISP, on-path attackers. Use DoH (port 443) or DoT (port 853) for privacy.' },
  { port: 67, proto: 'UDP', service: 'DHCP Server', cat: 'Infrastructure', color: '#8b5cf6', description: 'DHCP server receives client Discover and Request messages on port 67. Clients send from port 68. Broadcast-based — clients use 0.0.0.0:68 → 255.255.255.255:67 before they have an IP.', sec: 'Rogue DHCP servers can assign clients malicious gateway/DNS — a man-in-the-middle attack vector. Use DHCP snooping on managed switches.' },
  { port: 80, proto: 'TCP', service: 'HTTP', cat: 'Web', color: '#ef4444', description: 'Unencrypted HTTP. In modern deployments, port 80 only serves a redirect to HTTPS on port 443 — 301 Moved Permanently with HSTS header. Web servers (nginx, Apache, Caddy) listen here.', sec: 'All data transmitted in plaintext. Never transmit credentials, cookies, or sensitive data over HTTP. Redirect to HTTPS.' },
  { port: 110, proto: 'TCP', service: 'POP3', cat: 'Email', color: '#3b82f6', description: 'Post Office Protocol v3 — downloads email from server to client and (by default) deletes from server. Older protocol; IMAP (143/993) is preferred for modern multi-device use.', sec: 'Plaintext. Use POP3S (port 995, implicit TLS) or STARTTLS upgrade.' },
  { port: 143, proto: 'TCP', service: 'IMAP', cat: 'Email', color: '#3b82f6', description: 'Internet Message Access Protocol — email retrieval that keeps messages on server. Supports folders, flags, and multi-device sync. Preferred over POP3 for modern email clients.', sec: 'Supports STARTTLS upgrade to TLS. Prefer IMAPS (993, implicit TLS) for new deployments.' },
  { port: 443, proto: 'TCP/UDP', service: 'HTTPS / QUIC / HTTP3', cat: 'Web', color: G, description: 'HTTPS (HTTP over TLS) on TCP. HTTP/3 (QUIC) on UDP — same port 443. The primary port for all encrypted web traffic. Also used for any TLS-wrapped service that needs to traverse firewalls (DoH, MQTT over TLS, WebSocket over TLS).', sec: 'Always prefer HTTPS. Verify certificate validity. Implement HSTS to prevent protocol downgrade. Configure TLS 1.2+ minimum.' },
  { port: 465, proto: 'TCP', service: 'SMTPS (implicit TLS)', cat: 'Email', color: '#3b82f6', description: 'Email submission with implicit TLS (TLS starts immediately, before any SMTP dialog). Preferred over 587+STARTTLS for new deployments — simpler, no STARTTLS stripping attack possible.', sec: 'Preferred over port 587 for new client implementations. Implicit TLS is safer than STARTTLS upgrade.' },
  { port: 587, proto: 'TCP', service: 'SMTP Submission (STARTTLS)', cat: 'Email', color: '#3b82f6', description: 'Email client-to-server submission port. Uses STARTTLS to upgrade to TLS after initial plaintext handshake. Requires authentication. The standard port for outbound email from applications and mail clients.', sec: 'STARTTLS can be stripped by a MITM if the client does not enforce it. Prefer 465 (implicit TLS) for new deployments.' },
  { port: 853, proto: 'TCP', service: 'DNS over TLS (DoT)', cat: 'Infrastructure', color: '#8b5cf6', description: 'DNS queries encrypted via TLS (RFC 7858). The client explicitly connects to port 853 for encrypted DNS, separate from regular DNS (53). Used by Android Private DNS, iOS Encrypted DNS, and configurable in resolvers.', sec: 'Preferred over DNS over HTTPS (DoH) for network administrators who want to monitor DNS traffic at the gateway.' },
  { port: 993, proto: 'TCP', service: 'IMAPS', cat: 'Email', color: '#3b82f6', description: 'IMAP with implicit TLS — TLS established before any IMAP dialog. Preferred over IMAP with STARTTLS. Used by virtually all modern email clients for secure mail retrieval.', sec: 'Preferred over port 143. Implicit TLS cannot be downgraded. Ensure certificate is valid and hostname-verified.' },
  { port: 995, proto: 'TCP', service: 'POP3S', cat: 'Email', color: '#3b82f6', description: 'POP3 with implicit TLS. Secure version of POP3. Email is downloaded and typically deleted from server. Less common than IMAPS in modern deployments.', sec: 'Use POP3S (995) rather than POP3 (110) if POP3 is required.' },
  { port: 3389, proto: 'TCP', service: 'RDP', cat: 'Remote Access', color: '#ef4444', description: 'Windows Remote Desktop Protocol. Provides graphical remote access to Windows systems. One of the most targeted ports on the internet — ransomware gangs and nation-state actors scan for RDP constantly.', sec: 'NEVER expose RDP directly to the internet. Require VPN + MFA. Use RDP Gateway or Bastion host. Enable NLA (Network Level Authentication) at minimum.' },
  { port: 5432, proto: 'TCP', service: 'PostgreSQL', cat: 'Database', color: '#f97316', description: 'PostgreSQL database server. Should only be accessible from application servers, never from the internet. Supports SSL/TLS connections natively with ssl=require or ssl=verify-full.', sec: 'Bind to 127.0.0.1 or application server IP only. Never expose to internet. Use pg_hba.conf to restrict access by IP and require SSL.' },
  { port: 6379, proto: 'TCP', service: 'Redis', cat: 'Database', color: '#f97316', description: 'Redis in-memory data store. No authentication by default in older versions. Has been massively exploited when exposed to the internet — used for cryptomining, data exfiltration, and persistent backdoors.', sec: 'Bind to 127.0.0.1 only. Enable requirepass. Use Redis ACL system. Never expose to internet — CVE history is severe.' },
]

const PORT_CATS = ['All', 'Web', 'Email', 'Remote Access', 'Infrastructure', 'Database', 'File Transfer']

function WellKnownPortExplorer() {
  const [cat, setCat] = useState('All')
  const [selected, setSelected] = useState<number | null>(null)
  const filtered = WELL_KNOWN_PORTS.filter(p => cat === 'All' || p.cat === cat)
  const active = selected !== null ? WELL_KNOWN_PORTS.find(p => p.port === selected) : null

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: FONT_MONO, margin: '0 0 4px', letterSpacing: '.1em' }}>WELL-KNOWN PORT REFERENCE</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 16px' }}>Click any port for description and security notes. Filter by category.</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {PORT_CATS.map(c => (
          <button key={c} onClick={() => setCat(c)}
            style={{ padding: '5px 12px', borderRadius: 20, border: `1px solid ${c === cat ? G : 'var(--border)'}`, background: c === cat ? G : 'var(--bg)', color: c === cat ? '#000' : 'var(--muted)', fontSize: 12, cursor: 'pointer', fontWeight: c === cat ? 700 : 400 }}>
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {filtered.map(p => (
          <button key={p.port} onClick={() => setSelected(selected === p.port ? null : p.port)}
            style={{ padding: '8px 12px', borderRadius: 8, border: `2px solid ${selected === p.port ? p.color : 'var(--border)'}`, background: selected === p.port ? p.color : 'var(--bg)', color: selected === p.port ? '#fff' : 'var(--text)', cursor: 'pointer', textAlign: 'center', minWidth: 68, transition: 'all .1s' }}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 700, fontFamily: FONT_MONO }}>{p.port}</p>
            <p style={{ margin: 0, fontSize: 10, opacity: 0.75 }}>{p.proto}</p>
            <p style={{ margin: 0, fontSize: 10, fontWeight: 600 }}>{p.service.split(' ')[0]}</p>
          </button>
        ))}
      </div>

      {active ? (
        <div style={{ background: 'var(--bg)', border: `1px solid ${active.color}40`, borderRadius: 10, padding: 16 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ background: active.color, color: '#fff', borderRadius: 6, padding: '3px 12px', fontSize: 14, fontWeight: 700, fontFamily: FONT_MONO }}>:{active.port}</span>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>{active.proto} — {active.service}</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, background: `${active.color}20`, color: active.color, padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>{active.cat}</span>
          </div>
          <p style={{ margin: '0 0 12px', fontSize: 14, color: 'var(--text)', lineHeight: 1.8 }}>{active.description}</p>
          <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>
            <strong style={{ color: '#f59e0b' }}>⚠ Security: </strong>{active.sec}
          </div>
        </div>
      ) : (
        <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
          Click a port number to inspect its purpose and security implications
        </div>
      )}
    </div>
  )
}

/* ── interactive: Socket Lifecycle ──────────────────────────────────── */
const SOCKET_LIFECYCLE = [
  { name: 'Socket Created', client: 'socket(AF_INET, SOCK_STREAM, 0)', server: 'socket(AF_INET, SOCK_STREAM, 0)', syscall: 'socket()', description: 'Both sides create a socket — an OS file descriptor representing a network endpoint. No network activity yet. The socket is not connected or bound. AF_INET = IPv4, SOCK_STREAM = TCP, 0 = default protocol.', color: '#6b7280' },
  { name: 'Server Binds & Listens', client: '(not yet bound)', server: 'bind(fd, "0.0.0.0:8080") → listen(backlog)', syscall: 'bind() → listen()', description: "Server calls bind() to associate socket with a local address:port. listen() marks it as passive — ready to accept incoming connections. The kernel allocates an accept queue (SYN queue + established queue). The server's accept queue depth = min(backlog, net.core.somaxconn).", color: '#3b82f6' },
  { name: 'Client Connects (3-Way Handshake)', client: 'connect(fd, "server_ip:8080")', server: 'accept() — blocking, waiting', syscall: 'connect() → SYN/SYN-ACK/ACK', description: "Client calls connect() — the kernel sends SYN and blocks until the TCP 3-way handshake completes. Server's accept() returns a NEW socket fd for this specific connection; the original listening socket stays open for more connections. The new connection has a unique 5-tuple.", color: '#f97316' },
  { name: 'Data Transfer', client: 'write(fd, buf, len) / send()', server: 'read(fd, buf, len) / recv()', syscall: 'send() ↔ recv()', description: 'Both sides read and write through their file descriptors. The kernel buffers data in per-socket send/receive ring buffers (typically 128KB–4MB). TCP handles all reliability, ordering, retransmission, and flow control transparently below the socket API.', color: G },
  { name: 'Graceful Close (FIN Exchange)', client: 'close(fd) → FIN', server: 'read() returns 0 → close(fd)', syscall: 'close() → 4-way FIN/FIN-ACK', description: 'close() on either side sends FIN to begin graceful teardown. The 4-way FIN exchange follows: FIN → ACK, then FIN → ACK from the other side. The active closer enters TIME_WAIT (2×MSL, typically 60–120s) to ensure delayed packets are discarded. File descriptors released when TIME_WAIT expires.', color: '#8b5cf6' },
]

function SocketLifecycleViewer() {
  const [step, setStep] = useState(0)
  const cur = SOCKET_LIFECYCLE[step]

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: FONT_MONO, margin: '0 0 4px', letterSpacing: '.1em' }}>TCP SOCKET CONNECTION LIFECYCLE</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Step through the system calls from socket creation to teardown.</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
        {SOCKET_LIFECYCLE.map((s, i) => (
          <button key={i} onClick={() => setStep(i)}
            style={{ padding: '6px 14px', borderRadius: 20, border: `1px solid ${i === step ? s.color : 'var(--border)'}`, background: i === step ? s.color : 'var(--bg)', color: i === step ? '#fff' : 'var(--muted)', fontSize: 12, fontWeight: i === step ? 700 : 400, cursor: 'pointer' }}>
            {i + 1}. {s.name.split(' ')[0]}
          </button>
        ))}
      </div>

      <div style={{ border: `1px solid ${cur.color}40`, borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ background: cur.color, color: '#fff', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontWeight: 700 }}>{cur.name}</span>
          <span style={{ fontFamily: FONT_MONO, fontSize: 12, opacity: 0.9 }}>{cur.syscall}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--border)' }}>
          <div style={{ padding: '12px 16px', borderRight: '1px solid var(--border)', background: 'var(--bg)' }}>
            <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: '#3b82f6', fontFamily: FONT_MONO }}>CLIENT</p>
            <p style={{ margin: 0, fontFamily: FONT_MONO, fontSize: 12, color: 'var(--text)', lineHeight: 1.6 }}>{cur.client}</p>
          </div>
          <div style={{ padding: '12px 16px', background: 'var(--bg)' }}>
            <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: '#8b5cf6', fontFamily: FONT_MONO }}>SERVER</p>
            <p style={{ margin: 0, fontFamily: FONT_MONO, fontSize: 12, color: 'var(--text)', lineHeight: 1.6 }}>{cur.server}</p>
          </div>
        </div>
        <div style={{ padding: '14px 16px', background: 'var(--surface)' }}>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--text)', lineHeight: 1.8 }}>{cur.description}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
          style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', cursor: step === 0 ? 'not-allowed' : 'pointer', opacity: step === 0 ? 0.4 : 1, fontSize: 13 }}>
          ← Back
        </button>
        <button onClick={() => setStep(s => Math.min(4, s + 1))} disabled={step === 4}
          style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: 'none', background: G, color: '#000', cursor: step === 4 ? 'not-allowed' : 'pointer', opacity: step === 4 ? 0.5 : 1, fontSize: 13, fontWeight: 700 }}>
          Next →
        </button>
      </div>
    </div>
  )
}

/* ── interactive: Five-Tuple Tracker ────────────────────────────────── */
const CONNECTIONS = [
  { id: 1, srcIp: '192.168.1.10', srcPort: 54321, dstIp: '142.250.80.46', dstPort: 443, proto: 'TCP', state: 'ESTABLISHED', process: 'Chrome (google.com tab 1)' },
  { id: 2, srcIp: '192.168.1.10', srcPort: 54322, dstIp: '142.250.80.46', dstPort: 443, proto: 'TCP', state: 'ESTABLISHED', process: 'Chrome (google.com tab 2 — same server!)' },
  { id: 3, srcIp: '192.168.1.10', srcPort: 54400, dstIp: '8.8.8.8', dstPort: 53, proto: 'UDP', state: '—', process: 'systemd-resolved (DNS query)' },
  { id: 4, srcIp: '192.168.1.10', srcPort: 22100, dstIp: '10.0.0.5', dstPort: 22, proto: 'TCP', state: 'ESTABLISHED', process: 'ssh (remote shell)' },
  { id: 5, srcIp: '0.0.0.0', srcPort: 443, dstIp: '*', dstPort: 0, proto: 'TCP', state: 'LISTEN', process: 'nginx (accepts all inbound HTTPS)' },
  { id: 6, srcIp: '192.168.1.10', srcPort: 55000, dstIp: '142.250.80.46', dstPort: 443, proto: 'UDP', state: '—', process: 'Chrome (HTTP/3 QUIC — same dst, diff protocol)' },
]

function FiveTupleTracker() {
  const [sel, setSel] = useState<number | null>(1)
  const conn = sel !== null ? CONNECTIONS.find(c => c.id === sel) : null
  const stateColor = (s: string) => s === 'ESTABLISHED' ? G : s === 'LISTEN' ? '#3b82f6' : s === 'TIME_WAIT' ? '#f59e0b' : 'var(--muted)'

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: FONT_MONO, margin: '0 0 4px', letterSpacing: '.1em' }}>FIVE-TUPLE CONNECTION TABLE</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Click any connection row to see why its 5-tuple is unique. Note connections 1 and 2 go to the same server.</p>

      <div style={{ overflowX: 'auto', marginBottom: 12 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ background: `${G}12`, borderBottom: '1px solid var(--border)' }}>
              {['Src IP', 'Src Port', 'Dst IP', 'Dst Port', 'Proto', 'State', 'Process'].map(h => (
                <th key={h} style={{ padding: '7px 10px', textAlign: 'left', color: G, fontWeight: 700, fontSize: 11, fontFamily: FONT_MONO }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CONNECTIONS.map(c => (
              <tr key={c.id} onClick={() => setSel(sel === c.id ? null : c.id)}
                style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', background: sel === c.id ? `${G}10` : 'transparent', transition: 'background .1s' }}>
                <td style={{ padding: '8px 10px', fontFamily: FONT_MONO, color: '#3b82f6' }}>{c.srcIp}</td>
                <td style={{ padding: '8px 10px', fontFamily: FONT_MONO, color: G, fontWeight: 700 }}>{c.srcPort || '—'}</td>
                <td style={{ padding: '8px 10px', fontFamily: FONT_MONO, color: 'var(--text)' }}>{c.dstIp}</td>
                <td style={{ padding: '8px 10px', fontFamily: FONT_MONO, color: 'var(--text)' }}>{c.dstPort || '—'}</td>
                <td style={{ padding: '8px 10px', color: 'var(--text)' }}>{c.proto}</td>
                <td style={{ padding: '8px 10px' }}><span style={{ color: stateColor(c.state), fontWeight: 600 }}>{c.state}</span></td>
                <td style={{ padding: '8px 10px', color: 'var(--muted)', fontSize: 11 }}>{c.process}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {conn && (
        <div style={{ background: `${G}0d`, border: `1px solid ${G}30`, borderRadius: 8, padding: 14 }}>
          <p style={{ margin: '0 0 6px', fontWeight: 700, color: G, fontFamily: FONT_MONO, fontSize: 12 }}>
            {conn.srcIp}:{conn.srcPort} ↔ {conn.dstIp}:{conn.dstPort} ({conn.proto})
          </p>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text)', lineHeight: 1.8 }}>
            {conn.id === 1 && 'This is the first Chrome tab connection. The kernel tracks this as a unique 5-tuple. Replies from 142.250.80.46:443 with dst port 54321 are delivered to this specific tab.'}
            {conn.id === 2 && 'Same destination server and port as connection 1! But the source port is 54322 — making a different 5-tuple. The kernel perfectly delivers replies to the right tab, not the other one. This is transport-layer multiplexing.'}
            {conn.id === 3 && 'UDP DNS query. No connection state — UDP is connectionless. The kernel still tracks the 5-tuple to match replies to the querying process. Short-lived; closed after response.'}
            {conn.id === 4 && 'SSH connection to a private server. Different destination IP and port from the HTTPS connections — entirely separate kernel state. Runs indefinitely (keepalive packets prevent idle timeout).'}
            {conn.id === 5 && 'LISTEN socket — nginx waiting for incoming HTTPS connections. Not a connection but a listening endpoint. Source port = local port; all other fields wildcard. One accept() call returns a new ESTABLISHED socket per new client.'}
            {conn.id === 6 && 'HTTP/3 over QUIC — UDP to the same server as connections 1 and 2, but different protocol (UDP vs TCP). The protocol field of the 5-tuple makes this unique even though IP and ports are the same as the TCP connections.'}
          </p>
        </div>
      )}
    </div>
  )
}

/* ── main export ────────────────────────────────────────────────────── */
export default function PortsAndSockets() {
  return (
    <LearnLayout
      title="Ports and Sockets"
      description="Transport-layer multiplexing, the 5-tuple that uniquely identifies every network connection, the Berkeley socket API, well-known port security, port exhaustion, and the performance tuning that separates a 1K-connection server from a 1M-connection server."
      section="Networking Fundamentals"
      readTime="50 min"
    >

      {/* ──────────────────────────────────────────── CHAPTER 1 */}
      <Chapter n="01" title="The Multiplexing Problem" subtitle="One IP address, millions of simultaneous connections — how does the OS sort them out?" />

      <StoryBox>
        Your laptop has one IP address: 192.168.1.10. At this moment, you have Chrome open with 20 tabs, an SSH session to a remote server, a Zoom call, Slack downloading messages, and a background macOS update. All of these simultaneously use the single IP address. When a TCP segment arrives at 192.168.1.10 from Google's server, how does the OS know which of the 20 browser tabs it belongs to? The IP address identifies the machine, not the application or conversation. The answer is port numbers and the 5-tuple.
      </StoryBox>

      <Para>
        <Accent>Port numbers</Accent> are 16-bit unsigned integers (0–65,535) that form the second level of addressing at the transport layer. IP addresses identify machines on a network; port numbers identify the specific service or process on that machine. Together, an IP address and port number form a <Accent>socket address</Accent> — the complete endpoint identifier used by the transport layer.
      </Para>

      <Para>
        Every TCP connection and every UDP flow is uniquely identified by a <Accent>5-tuple</Accent>:
      </Para>

      <CodeBlock title="The 5-tuple — the kernel's demultiplexing key">
{`(source_ip, source_port, destination_ip, destination_port, protocol)

Example — two simultaneous Chrome tabs to the same server:
  Tab 1: (192.168.1.10, 54321, 142.250.80.46, 443, TCP)
  Tab 2: (192.168.1.10, 54322, 142.250.80.46, 443, TCP)

Same destination — different source ports — different 5-tuples.
The kernel delivers replies to exactly the right tab via this key.

The receiving server sees the reverse 5-tuple as its connection state:
  (142.250.80.46, 443, 192.168.1.10, 54321, TCP) — for tab 1
  (142.250.80.46, 443, 192.168.1.10, 54322, TCP) — for tab 2`}
      </CodeBlock>

      <Para>
        The 5-tuple is the kernel's demultiplexing key: when a segment arrives, the kernel hashes the 5-tuple and looks up the corresponding socket in its connection table. The matching socket's receive buffer receives the data, and the application thread waiting on <Code>recv()</Code> is woken. This lookup happens millions of times per second on a busy server.
      </Para>

      <WowBox emoji="🌐" title="One Port Handles Millions of Connections">
        A Google frontend server handles millions of simultaneous HTTPS connections — all to destination port 443. The server's port stays constant at 443 across every connection. The diversity comes from client source IPs and source ports. Two clients from 192.168.1.10:54321 and 10.0.0.1:54321 have different source IPs, making them different 5-tuples. Within one client, different tabs use different source ports. One server IP, one server port, unlimited unique connections. Port 65K limit is a client-side constraint, not a server-side one.
      </WowBox>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 2 */}
      <Chapter n="02" title="Port Ranges and IANA Registration" subtitle="Well-known, registered, and ephemeral ranges — and why root is required for ports below 1024" />

      <StoryBox>
        IANA (Internet Assigned Numbers Authority) maintains the port number registry at www.iana.org/assignments/service-names-port-numbers. It is not a technical enforcement mechanism — the OS will bind any port to any process that has permission. But it is a global coordination mechanism: by assigning port 443 to HTTPS, every client in the world knows to try 443 for encrypted web access. Without this coordination, every web server would choose an arbitrary port and clients would have no discovery mechanism.
      </StoryBox>

      <Para>
        IANA divides the 65,535 port space into three ranges:
      </Para>

      <CodeBlock title="Port range assignments">
{`0–1023:     Well-Known Ports (System Ports)
            Assigned to specific protocols by IANA.
            Require root/administrator privilege to bind on Unix/Linux.
            (The privilege requirement prevents an unprivileged process
            from impersonating a system service like SSH or HTTP.)
            Examples: HTTP=80, HTTPS=443, SSH=22, DNS=53, SMTP=25

1024–49151: Registered Ports (User Ports)
            Can be registered with IANA by application vendors.
            No root privilege required to bind.
            Examples: MySQL=3306, PostgreSQL=5432, Redis=6379,
                      MongoDB=27017, Elasticsearch=9200, NATS=4222

49152–65535: Dynamic/Ephemeral Ports (Private Ports)
            Not assigned. Used by the OS for client-side source ports.
            When your browser connects to a server, the OS picks a
            random ephemeral port for your end of the connection.
            RFC 6335: IANA defines 49152–65535 as ephemeral range.
            Linux default: 32768–60999 (sysctl net.ipv4.ip_local_port_range).`}
      </CodeBlock>

      <H2>Why Ports 0–1023 Require Root</H2>

      <Para>
        On Unix/Linux, binding to ports below 1024 requires the CAP_NET_BIND_SERVICE capability (effectively root). This is a security boundary: an unprivileged user who could bind port 22 could impersonate the SSH daemon, capture credentials from other users who try to connect. By requiring root for well-known ports, the system ensures only trusted services claim the ports associated with specific protocols.
      </Para>

      <Para>
        Modern workarounds: <Code>authbind</Code> allows specific non-root users to bind specific ports. Setting the <Code>CAP_NET_BIND_SERVICE</Code> capability on a binary allows it to bind low ports without full root. Using a reverse proxy (nginx on port 80/443, application on port 3000) is the most common cloud-native approach — nginx runs as root briefly to bind 80/443, then drops privileges.
      </Para>

      <CodeBlock title="Viewing and tuning ports">
{`# View port assignments
cat /etc/services | head -50             # Known port names
getent services 443                      # Lookup specific port

# Check ephemeral port range
sysctl net.ipv4.ip_local_port_range      # Default: 32768 60999

# Expand ephemeral range for high-connection services
sysctl -w net.ipv4.ip_local_port_range="1024 65535"

# Check what is listening
ss -tlnp                                 # TCP listening sockets with process
ss -ulnp                                 # UDP listening sockets
ss -tanp                                 # All TCP connections with process

# Count connections by state
ss -tan | awk '{print $1}' | sort | uniq -c

# Check TIME_WAIT accumulation
ss -tan state time-wait | wc -l`}
      </CodeBlock>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 3 */}
      <Chapter n="03" title="Well-Known Ports — A Security Reference" subtitle="Every open port is an attack surface — know what you're exposing and why" />

      <StoryBox>
        A security engineer audits a newly deployed server. She runs <Code>ss -tlnp</Code> and finds ports 21 (FTP), 23 (Telnet), 3389 (RDP), and 5900 (VNC) open on public interfaces. Any single one of these would be a critical finding: FTP and Telnet send credentials in cleartext; RDP and VNC directly on the internet are prime ransomware entry points. The firewall had been disabled "temporarily" for testing. That test had been running for 11 days. Knowing what each port means — and its exact security profile — is not academic knowledge, it's operational survival.
      </StoryBox>

      <WellKnownPortExplorer />

      <H2>Security Posture: Attack Surface by Port</H2>

      <Para>
        Internet-connected services on well-known ports receive automated probes within minutes of exposure. Shodan, Censys, ZoomEye, and custom botnets constantly scan the entire IPv4 address space. A server appearing on the internet with port 22 open will receive SSH brute-force attempts within 2 minutes. Port 3389 (RDP) receives credential stuffing attacks within seconds. Port 6379 (Redis, no auth) has been exploited en masse — attackers write SSH keys to the server and add crontab backdoors.
      </Para>

      <Para>
        The principle: every listening port that is not required is closed. Every required port is protected by authentication, encryption, and rate limiting. Firewall rules are default-deny — only explicitly listed ports are allowed.
      </Para>

      <H2>Non-Standard Ports — Security Through Obscurity</H2>

      <Para>
        Moving SSH from port 22 to port 2222 reduces automated brute-force noise (most scanners target well-known ports by default). A full port range scan (<Code>nmap -p 1-65535 -T4 host</Code>) finds the service in under 10 minutes. Non-standard ports reduce log noise but provide zero actual security. Real SSH hardening: key-based authentication only, fail2ban rate limiting, firewall source IP restrictions, and optionally a VPN requirement.
      </Para>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 4 */}
      <Chapter n="04" title="The Socket API — 40 Years of Stable Abstraction" subtitle="socket(), bind(), listen(), accept(), connect() — how the Berkeley Sockets API works" />

      <StoryBox>
        In 1983, the Berkeley Software Distribution team added the socket API to 4.2BSD Unix. The design was elegant: a network connection is treated exactly like a file. You call socket() to get a file descriptor, read() and write() to transfer data, and close() when done. Applications have no idea whether the data travels across a room or across a continent — the OS handles all the complexity. This API, designed 40 years ago, runs on Linux, macOS, Windows (WinSock), iOS, Android, and every device connected to the internet today. A network program written in C for BSD in 1985 compiles and runs unchanged on modern Linux.
      </StoryBox>

      <Para>
        The core socket API calls:
      </Para>

      <CodeBlock title="Socket API — annotated with what each call does">
{`# 1. socket() — create an endpoint
fd = socket(AF_INET, SOCK_STREAM, 0)
# AF_INET = IPv4, AF_INET6 = IPv6, AF_UNIX = local IPC
# SOCK_STREAM = TCP (reliable, ordered), SOCK_DGRAM = UDP (unreliable, fast)
# Returns: file descriptor (integer) — treat it like a file

# 2. bind() — associate socket with an address (server-side)
bind(fd, ("0.0.0.0", 8080))
# 0.0.0.0 = listen on all interfaces
# 127.0.0.1 = listen on localhost only (no external access)
# Clients usually skip bind() — OS auto-assigns an ephemeral source port

# 3. listen() — mark socket as passive (server-side)
listen(fd, 1024)  # 1024 = accept queue depth
# Kernel now accepts TCP handshakes and queues completed connections
# Application calls accept() to retrieve them

# 4. accept() — retrieve a completed connection (server-side)
client_fd, client_addr = accept(fd)
# Returns a NEW socket fd for this specific connection
# Original fd stays listening for more connections
# New fd's 5-tuple: (server_ip:8080, client_ip:ephemeral_port)

# 5. connect() — establish a connection (client-side)
connect(fd, ("server.example.com", 443))
# Triggers TCP 3-way handshake
# Blocks until connected (or times out after ~127 seconds default)
# OS auto-assigns ephemeral source port

# 6. send/recv — transfer data
send(fd, data, 0)           # Write to socket (kernel buffers it)
data = recv(fd, 4096, 0)    # Read up to 4096 bytes (blocks if no data)
# recv() returns 0 when remote side closed connection (FIN received)

# 7. close() — initiate graceful shutdown
close(fd)   # Sends FIN, begins 4-way teardown`}
      </CodeBlock>

      <SocketLifecycleViewer />

      <H2>Socket Options — Tuning Connection Behavior</H2>

      <CodeBlock title="Key socket options and when to use each">
{`# SO_REUSEADDR — allow binding to port in TIME_WAIT
# Essential for server restart without waiting ~120 seconds
sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

# SO_REUSEPORT — allow multiple processes to bind the same address:port
# Kernel load-balances incoming connections across all bound processes
# Used by multi-worker servers (nginx worker processes all bind port 443)
sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)

# TCP_NODELAY — disable Nagle algorithm (don't buffer small writes)
# Essential for interactive protocols: SSH, gaming, financial trading
# Without it, small writes are buffered for up to 200ms
sock.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)

# SO_KEEPALIVE — send TCP keepalive probes on idle connections
# Detects dead peers (router rebooted, network cable pulled)
sock.setsockopt(socket.SOL_SOCKET, socket.SO_KEEPALIVE, 1)
sock.setsockopt(socket.IPPROTO_TCP, socket.TCP_KEEPIDLE, 60)    # First probe after 60s idle
sock.setsockopt(socket.IPPROTO_TCP, socket.TCP_KEEPINTVL, 10)   # Probe every 10s
sock.setsockopt(socket.IPPROTO_TCP, socket.TCP_KEEPCNT, 5)      # Close after 5 missed probes

# SO_RCVBUF / SO_SNDBUF — receive/send buffer size
sock.setsockopt(socket.SOL_SOCKET, socket.SO_RCVBUF, 4194304)   # 4 MB receive buffer
# Larger buffers = better throughput on high-latency paths (BDP tuning)

# SO_LINGER — control behavior when close() is called
# linger=True, timeout=0 → RST on close (no TIME_WAIT, immediate port reclaim)
# Useful for test servers; dangerous in production (may lose in-flight data)
import struct
sock.setsockopt(socket.SOL_SOCKET, socket.SO_LINGER, struct.pack('ii', 1, 0))`}
      </CodeBlock>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 5 */}
      <Chapter n="05" title="The 5-Tuple and Connection Demultiplexing" subtitle="How the kernel uses five fields to identify every active connection in O(1)" />

      <StoryBox>
        Your laptop connects to Netflix. Then you open a second Netflix window. Both connections go from 192.168.1.10 to Netflix's server (52.94.236.152) on port 443. How does the OS deliver the right video frames to the right window? The source port differs: window 1 might use port 54321, window 2 uses 54322. Both destination IP and port are identical — but the 5-tuples are different. The kernel maintains a hash table of connections indexed by 5-tuple. Incoming packets arrive, the 5-tuple is hashed, the bucket is found, and the packet lands in the right socket's receive buffer. Window 1 gets its frames, window 2 gets its frames, perfectly separated.
      </StoryBox>

      <FiveTupleTracker />

      <H2>Kernel Connection Table: Implementation</H2>

      <Para>
        The kernel maintains a hash table of active TCP connections, keyed by the full 5-tuple. When a TCP segment arrives:
      </Para>

      <CodeBlock title="Kernel TCP demultiplexing path (simplified)">
{`1. Interrupt: NIC DMA's packet to ring buffer, signals CPU via interrupt
2. Kernel extracts IP header: src_ip, dst_ip, protocol
3. Kernel extracts TCP header: src_port, dst_port
4. Computes: hash(src_ip, src_port, dst_ip, dst_port, proto) → bucket
5. Walks bucket list to find matching socket
6. Copies segment data to socket's receive buffer (sk_buff)
7. Wakes any thread blocked in recv()/read() on that socket

If no match in ESTABLISHED table → check LISTEN sockets
If match in LISTEN → process new connection (send SYN-ACK, add to SYN queue)
If no match at all → send RST (connection refused)`}
      </CodeBlock>

      <Para>
        This lookup is O(1) average case — critical when a server has millions of connections. Modern kernels use <Accent>SipHash</Accent> (a cryptographic PRF) seeded with a random secret at boot time to prevent hash collision attacks where an adversary crafts connections that all map to the same hash bucket, degrading lookup to O(n) and causing CPU exhaustion.
      </Para>

      <WowBox emoji="⚡" title="Modern Servers Handle 1–10 Million Connections Per Machine">
        Cloudflare, Google, and AWS load balancers handle 1–10 million simultaneous TCP connections per machine. The kernel's connection hash table, socket memory management, interrupt coalescing (NAPI batching — not one interrupt per packet but batching multiple packets per interrupt), and receive-side scaling (RSS — spreading interrupts across CPU cores) enable this scale. Linux with default settings handles ~65,000 connections before socket buffer memory exhausts; with tuning (rmem, wmem, somaxconn, file descriptor limits) it scales to millions.
      </WowBox>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 6 */}
      <Chapter n="06" title="Port Exhaustion — When Connections Run Out" subtitle="The client-side scaling failure nobody talks about until it hits production" />

      <StoryBox>
        A microservice makes 50,000 outbound database connections per second, each with a 30ms average duration. Concurrent connections = 50,000 × 0.030s = 1,500 connections. Linux's default ephemeral range: 32,768–60,999 = 28,231 ports. That's fine. But after a database performance regression, queries slow to 800ms average. Now concurrent connections = 50,000 × 0.8 = 40,000. TIME_WAIT connections add another 30,000 (held 60 seconds each). Total: 70,000 connections to the same destination IP:port — exceeding the 28,231 ephemeral port limit. New connections fail with "Cannot assign requested address" (EADDRNOTAVAIL). The database appears "down" even though it's healthy. This is port exhaustion.
      </StoryBox>

      <Para>
        Port exhaustion occurs when a client runs out of available source ports to open new connections to a specific destination IP:port. The constraint: the 5-tuple must be unique. If all 28,231 ephemeral ports to a given (dst_ip:dst_port) are either active or in TIME_WAIT, the OS cannot open another connection.
      </Para>

      <H2>TIME_WAIT: The Root Cause of Most Port Exhaustion</H2>

      <Para>
        When a TCP connection closes (the active closer — the side that sends the first FIN), the connection enters <Accent>TIME_WAIT</Accent> for 2×MSL (Maximum Segment Lifetime = 30–60 seconds, so TIME_WAIT lasts 60–120 seconds). The OS keeps this state to: (1) ensure the final ACK reaches the remote peer, and (2) ensure any delayed packets from the old connection are discarded before a new connection reuses the 5-tuple.
      </Para>

      <Para>
        On a client making 1,000 short-lived connections per second to the same server, TIME_WAIT accumulates: at 60s timeout, up to 60,000 TIME_WAIT entries exist simultaneously. With a 28K ephemeral port range, the client is 32K connections short of being able to open a new connection. This is the TIME_WAIT problem.
      </Para>

      <CodeBlock title="Diagnosing and fixing port exhaustion">
{`# Diagnose port exhaustion
ss -s                                          # Summary: connected, listening, TIME_WAIT counts
ss -tan | awk '{print $1}' | sort | uniq -c   # Count by state
ss -tan state time-wait | wc -l                # Count TIME_WAIT specifically

# Quick checks
cat /proc/sys/net/ipv4/ip_local_port_range     # Ephemeral range
netstat -s | grep "SYNs to LISTEN\|failed"    # Connection failures

# SOLUTION 1: Connection pooling (best solution — root cause fix)
# Reuse existing connections instead of creating new ones per request
# PgBouncer for PostgreSQL, ProxySQL for MySQL
# pool_size = peak_QPS × avg_query_time_seconds
# Example: 10,000 QPS × 0.010s = 100 connections max needed

# SOLUTION 2: Expand ephemeral port range
sysctl -w net.ipv4.ip_local_port_range="1024 65535"  # ~64K ports instead of ~28K

# SOLUTION 3: Enable tcp_tw_reuse (safe for clients)
sysctl -w net.ipv4.tcp_tw_reuse=1
# Allows reusing TIME_WAIT sockets for new outbound connections
# Requires TCP Timestamps (enabled by default on Linux)
# SAFE: client-side only, doesn't affect connection correctness

# SOLUTION 4: Multiple source IPs (each source IP gets its own port space)
ip addr add 10.0.0.2/24 dev eth0
# Now client can use 10.0.0.1 AND 10.0.0.2 as source IPs = 2× port space

# DANGER — do NOT use tcp_tw_recycle (removed in Linux 4.12)
# Breaks connections through NAT; was never safe for production`}
      </CodeBlock>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 7 */}
      <Chapter n="07" title="Server-Side: Accept Queue and Backlog" subtitle="Why connections get refused under burst traffic and how to fix it" />

      <StoryBox>
        A web server is handling steady 10,000 requests/second without issue. A news article mentions the site; traffic spikes to 100,000 requests/second for 30 seconds. Users see "Connection refused." CPU: 20%. Memory: fine. The problem: the accept queue — where completed TCP handshakes wait for accept() to be called — is full at its default size of 128. The kernel is dropping incoming SYNs. Linux sends RST to every new connection attempt. Raising somaxconn to 65,536 and restarting nginx with a higher backlog fixes it — the burst is absorbed, connections queue, nginx processes them in order.
      </StoryBox>

      <Para>
        The Linux kernel maintains two queues for incoming connections on each listening socket:
      </Para>

      <Para>
        <Accent>SYN queue (incomplete connections):</Accent> A SYN has arrived, a SYN-ACK was sent, waiting for the client's ACK to complete the 3-way handshake. Size controlled by <Code>net.ipv4.tcp_max_syn_backlog</Code> (default 128, production: 65536). Each entry uses ~200 bytes of kernel memory.
      </Para>

      <Para>
        <Accent>Accept queue (complete connections):</Accent> 3-way handshake is complete. The connection is waiting for the application to call <Code>accept()</Code>. If the application is slow calling accept() (e.g., single-threaded, or under heavy CPU load), the queue fills. New completions are dropped, causing clients to see "Connection refused." Queue depth = <Code>min(backlog_arg_to_listen(), net.core.somaxconn)</Code>.
      </Para>

      <CodeBlock title="Tuning the accept queue for high concurrency">
{`# Production kernel tuning
sysctl -w net.core.somaxconn=65536             # Max accept queue depth
sysctl -w net.ipv4.tcp_max_syn_backlog=65536   # Max SYN queue depth
sysctl -w net.core.netdev_max_backlog=65536    # NIC receive queue depth

# Application: request high backlog in listen()
# Python
import socket
s = socket.socket()
s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
s.bind(('0.0.0.0', 8080))
s.listen(65535)  # Capped by somaxconn

# C
listen(fd, SOMAXCONN);   // Use OS maximum

# nginx config (also needs OS tuning above)
# listen 443 ssl backlog=65535;

# Monitor queue state
ss -tlnp | grep ':443'
# Output: State Recv-Q Send-Q
# Recv-Q = current accept queue depth (> 0 means app is behind)
# Send-Q = max queue size

# Monitor drops
cat /proc/net/netstat | grep ListenOverflows
netstat -s | grep "listen queue"  # Count dropped due to full queue`}
      </CodeBlock>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 8 */}
      <Chapter n="08" title="Non-Blocking I/O and Event-Driven Servers" subtitle="From the C10K problem to epoll — why nginx handles 100K connections" />

      <StoryBox>
        1999: Dan Kegel publishes the "C10K Problem" paper asking how to handle 10,000 simultaneous network connections. At the time, Apache used a prefork model: one process per connection. 10,000 connections = 10,000 processes, each consuming 2–4 MB memory = 20–40 GB RAM just for process overhead. Impossible on 1990s hardware. The solution, already available in Linux: event-driven I/O with epoll. One thread monitors thousands of sockets; when any becomes readable/writable, it handles that socket. nginx and Node.js made this mainstream. Today a single nginx process routinely handles 100,000+ concurrent connections.
      </StoryBox>

      <Para>
        I/O multiplexing mechanisms (in order of scalability):
      </Para>

      <CodeBlock title="I/O multiplexing API evolution">
{`select()  — monitors up to FD_SETSIZE (1024) fds.
             O(n) scan on EVERY call. Obsolete. Max 1024 connections.

poll()    — removes 1024 limit. Still O(n) scan. Not scalable.

epoll()   — Linux only (since 2.5.44, 2002). O(1) event notification.
(Linux)    The kernel maintains a red-black tree of monitored fds.
             When any fd becomes ready, kernel adds it to a ready list.
             epoll_wait() returns ONLY ready fds — no scanning.
             Supports edge-triggered (ET) and level-triggered (LT) modes.
             Used by: nginx, Redis, Node.js (libuv), PostgreSQL.

kqueue()  — BSD/macOS equivalent of epoll. Same O(1) semantics.
(BSD/macOS)

io_uring  — Linux 5.1+ (2019). Async I/O that avoids syscall overhead.
             Batches I/O operations through shared ring buffers.
             Application submits operations without syscall (mmap'd ring).
             Used by: Tokio (Rust), io_uring-aware web servers.`}
      </CodeBlock>

      <CodeBlock title="epoll server pattern (Python asyncio)">
{`import asyncio

async def handle_client(reader, writer):
    while True:
        data = await reader.read(4096)
        if not data:
            break
        writer.write(b"Echo: " + data)
        await writer.drain()
    writer.close()
    await writer.wait_closed()

async def main():
    server = await asyncio.start_server(handle_client, '0.0.0.0', 8888, backlog=65535)
    async with server:
        await server.serve_forever()

asyncio.run(main())
# asyncio uses epoll (Linux), kqueue (macOS), or IOCP (Windows) automatically
# Single event loop handles 100,000 concurrent connections in one thread`}
      </CodeBlock>

      <Para>
        The key insight of event-driven servers: <Accent>blocking on network I/O wastes CPU</Accent>. A thread blocked in <Code>recv()</Code> waiting for a client to send data is doing nothing — but it consumes a thread stack (8 MB default on Linux). With 10,000 blocked threads that's 80 GB of stack memory just for waiting. Non-blocking sockets + epoll let one thread service thousands of connections — it only runs when there's actual data to process.
      </Para>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 9 */}
      <Chapter n="09" title="Unix Domain Sockets — Local IPC via the Socket API" subtitle="Same API, no network stack — why your database connection is 30% faster using /tmp/postgres.sock" />

      <StoryBox>
        A web application and its PostgreSQL database run on the same machine. Option A: connect via TCP — 127.0.0.1:5432. This works, but involves the full TCP stack: socket creation, 3-way handshake, ACK for every segment, sequence numbers, checksums. Option B: connect via Unix domain socket — /var/run/postgresql/.s.PGSQL.5432. No TCP overhead, no IP stack, no network interface. Data transfers through a kernel memory buffer (a memcpy). Latency drops from ~50μs to ~20μs. CPU usage drops. No handshake means no connection setup overhead. Every major database uses Unix sockets for local connections.
      </StoryBox>

      <Para>
        Unix domain sockets (AF_UNIX, also called AF_LOCAL) use the exact same BSD socket API as TCP sockets — <Code>socket()</Code>, <Code>bind()</Code>, <Code>listen()</Code>, <Code>accept()</Code>, <Code>connect()</Code>, <Code>read()</Code>, <Code>write()</Code>, <Code>close()</Code> — but communicate entirely within the kernel's virtual file system, without any network stack involvement.
      </Para>

      <Para>
        Instead of binding to an IP:port, a Unix socket binds to a filesystem path (e.g., <Code>/tmp/myapp.sock</Code>). The socket appears as a special file in the filesystem. Access control is enforced by Unix file permissions on the socket file — only users with read+write permission on the file can connect. This gives Unix sockets stronger access control than TCP (where any process can connect to 127.0.0.1:5432 if it has network access).
      </Para>

      <CodeBlock title="Unix domain socket usage in production systems">
{`# Common Unix domain socket paths
/var/run/postgresql/.s.PGSQL.5432   # PostgreSQL
/var/lib/mysql/mysql.sock           # MySQL/MariaDB
/var/run/redis/redis.sock           # Redis (when configured)
/run/nginx.sock                     # nginx upstream to PHP-FPM
/var/run/docker.sock                # Docker daemon API
/run/systemd/private/io.systemd.PrivateUsers  # systemd internal

# Connect to PostgreSQL via Unix socket
psql -h /var/run/postgresql -U username dbname
# Or simply: psql -U username dbname (auto-finds socket)

# Connect to MySQL via Unix socket
mysql -S /var/lib/mysql/mysql.sock -u root

# Python: explicitly use Unix socket
import socket
sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
sock.connect('/tmp/myapp.sock')

# Python: PostgreSQL via Unix socket (psycopg2)
import psycopg2
conn = psycopg2.connect(host='/var/run/postgresql', dbname='mydb', user='user')
# Equivalent to TCP: host='127.0.0.1', port=5432`}
      </CodeBlock>

      <Warn title="The Docker socket is root-equivalent">
        <Code>/var/run/docker.sock</Code> is the Docker daemon's control socket. Any process with write access to it can make Docker API calls — including spawning a new container with <Code>--privileged --volume /:/host</Code> and accessing the entire host filesystem as root. Mounting the Docker socket into a container (a common pattern for CI systems and monitoring tools) is a complete privilege escalation path from container to host. Only mount it when absolutely required, in containers with restricted network access and monitored execution.
      </Warn>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 10 */}
      <Chapter n="10" title="TCP Socket States" subtitle="The full state machine — from CLOSED to ESTABLISHED to TIME_WAIT" />

      <Para>
        TCP connections move through a defined set of states. Understanding these states is essential for diagnosing connection failures, interpreting <Code>ss</Code> / <Code>netstat</Code> output, and tuning server performance.
      </Para>

      <CodeBlock title="TCP state machine — key states and transitions">
{`CLOSED      → Initial state. No connection.

LISTEN      → Server has called listen(). Waiting for incoming SYNs.
               (Server side only. Shows in ss -tlnp output.)

SYN_SENT    → Client called connect(), sent SYN. Waiting for SYN-ACK.
               (If stuck here: server unreachable or firewall dropped SYN)

SYN_RCVD    → Server received SYN, sent SYN-ACK. Waiting for final ACK.
               (SYN flood attack fills this state for many spoofed IPs)

ESTABLISHED → 3-way handshake complete. Data transfer phase.
               (Normal connected state. Both sides.)

FIN_WAIT_1  → Active closer sent FIN. Waiting for ACK.

FIN_WAIT_2  → ACK received for our FIN. Waiting for remote FIN.
               (net.ipv4.tcp_fin_timeout controls max time here — default 60s)

CLOSE_WAIT  → Remote sent FIN; we sent ACK. App must call close() to continue.
               ⚠ Many CLOSE_WAIT entries = application not calling close() promptly
               (Often a resource leak bug)

LAST_ACK    → Passive closer sent FIN after receiving FIN. Waiting for final ACK.

TIME_WAIT   → Active closer received remote FIN, sent final ACK. Waiting 2×MSL.
               ⚠ Many TIME_WAIT entries = many short-lived connections from one client
               (Normal but can cause port exhaustion. See Chapter 6.)

CLOSED      → Connection fully terminated.`}
      </CodeBlock>

      <Para>
        Diagnostic tip: <Code>ss -tan | awk '{'{print $1}'}' | sort | uniq -c</Code> shows counts by state. A healthy server predominantly shows ESTABLISHED. A server with many CLOSE_WAIT entries has an application-level resource leak (not calling close()). A client with many TIME_WAIT entries is making many short-lived connections to the same destination — consider connection pooling.
      </Para>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 11 */}
      <Chapter n="11" title="Port Scanning and Service Discovery" subtitle="How nmap works, what attackers see, and interpreting scan results" />

      <StoryBox>
        A network security engineer needs to verify that a newly deployed server only exposes intended services. She runs <Code>nmap -sS -p 1-65535 server_ip</Code> from an external perspective, exactly as an attacker would. The scan completes in 4 minutes and shows: 22/tcp open (SSH), 443/tcp open (HTTPS), 3306/tcp open (MySQL — not intended!). The MySQL service was left listening on all interfaces because a developer set bind-address=0.0.0.0 for "easier local testing." An internet-exposed MySQL with default credentials is a critical finding. The engineer escalates immediately.
      </StoryBox>

      <H2>How TCP Port Scanners Work</H2>

      <Para>
        Port scanners exploit the kernel's predictable behavior at the socket level:
      </Para>

      <Para>
        <Accent>SYN scan (half-open, -sS):</Accent> Send a SYN packet. If port is open: receive SYN-ACK (immediately send RST, never completing the handshake). If port is closed: receive RST. If firewalled: no response (timeout). Faster than full connect scan; may not appear in application logs since the handshake never completes. Requires raw socket access (root).
      </Para>

      <Para>
        <Accent>Connect scan (-sT):</Accent> Complete the full 3-way handshake (use connect() syscall). No root required. Leaves entries in application logs. Useful when running without root privileges.
      </Para>

      <Para>
        <Accent>UDP scan (-sU):</Accent> Send a UDP packet. If port closed: receive ICMP Port Unreachable (type 3, code 3). If open: either no response or a service-specific response. Slow due to ICMP rate limiting (Linux limits ICMP unreachables to 1/second by default).
      </Para>

      <CodeBlock title="nmap scanning reference">
{`# SYN scan — fastest, requires root
nmap -sS -p 1-1024 target           # Top 1024 ports
nmap -sS -p 1-65535 target          # Full scan
nmap -sS --top-ports 100 target     # nmap's 100 most common ports

# Connect scan — no root required
nmap -sT target

# UDP scan of common services
nmap -sU --top-ports 20 target      # DNS(53), SNMP(161), NTP(123)...

# Service and version detection
nmap -sV target                     # Identify service versions (banner grab)
nmap -A target                      # SYN + version + OS + scripts + traceroute

# Specific port checks
nmap -p 22,80,443,3306 target

# Subnet scan
nmap -sS 192.168.1.0/24             # All hosts in /24

# Output formats
nmap -sS -oN output.txt target      # Normal output
nmap -sS -oX output.xml target      # XML for parsing
nmap -sS -oG output.gnmap target    # Grepable format

# Quick ping sweep (host discovery only)
nmap -sn 10.0.0.0/24`}
      </CodeBlock>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 12 */}
      <Chapter n="12" title="Firewall Rules and the 5-Tuple" subtitle="Translating security policy to packet-level rules using port knowledge" />

      <Para>
        Firewall rules are pattern-matched against the 5-tuple of each packet. Understanding port numbers and socket states directly translates to writing correct firewall rules. The most important concept: <Accent>stateful inspection</Accent> — tracking connection state so return traffic for established connections is automatically allowed without explicit rules for the return direction.
      </Para>

      <CodeBlock title="iptables rules — server security policy">
{`# Default: deny all inbound, allow all outbound
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Allow loopback (localhost communication)
iptables -A INPUT -i lo -j ACCEPT

# Allow established/related (return traffic for outbound connections)
# This allows: responses to our outbound requests, ICMP errors, FTP data
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# SSH with rate limiting (prevent brute force)
iptables -A INPUT -p tcp --dport 22 -m conntrack --ctstate NEW \
  -m limit --limit 5/min --limit-burst 10 -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -j DROP   # Drop excess

# HTTPS
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# HTTP (redirect to HTTPS — still needs to be open)
iptables -A INPUT -p tcp --dport 80 -j ACCEPT

# ICMP — allow for ping and PMTUD (fragmentation needed)
iptables -A INPUT -p icmp --icmp-type destination-unreachable -j ACCEPT
iptables -A INPUT -p icmp --icmp-type echo-request \
  -m limit --limit 10/sec -j ACCEPT

# Log dropped packets (for incident investigation)
iptables -A INPUT -j LOG --log-prefix "IPTABLES DROP: " --log-level 4
iptables -A INPUT -j DROP`}
      </CodeBlock>

      <H2>Connection Refused vs. Connection Timeout</H2>

      <Para>
        The single most important diagnostic distinction in connection troubleshooting:
      </Para>

      <Para>
        <Accent>Connection refused:</Accent> The remote OS received the SYN and sent RST back. The machine is reachable. Either no service is listening on that port, or the application called close() sending RST. Fix: check that the service is running (<Code>ss -tlnp | grep PORT</Code>).
      </Para>

      <Para>
        <Accent>Connection timeout:</Accent> The SYN was sent, no response received after ~127 seconds (Linux TCP retransmit timeout). Either the destination is unreachable (routing problem), or a firewall is silently dropping packets (DROP rule, not REJECT rule). A REJECT rule sends ICMP unreachable back (fast failure); a DROP rule causes the slow timeout. Fix: check routing, check intermediate firewall rules.
      </Para>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 13 */}
      <Chapter n="13" title="Troubleshooting Connection Issues" subtitle="Systematic diagnosis from socket layer to application layer" />

      <CodeBlock title="Connection diagnostic toolkit">
{`# ── LAYER 3: Is the host reachable? ─────────────────────────────────
ping -c 4 10.0.0.1                   # ICMP echo (blocked by some firewalls)
traceroute 10.0.0.1                  # Hop-by-hop path trace

# ── LAYER 4: Is the port open? ───────────────────────────────────────
nc -zv 10.0.0.1 443                  # TCP connect test
# "succeeded" = port open
# "refused" = port not open or actively rejected (RST)
# (timeout) = firewall DROP or host unreachable

nc -u -zv 10.0.0.1 53               # UDP port test

# ── LOCAL: Is the service listening? ────────────────────────────────
ss -tlnp | grep ':443'               # TCP listening on 443?
ss -ulnp | grep ':53'                # UDP listening on 53?
ss -tanp | grep 'ESTABLISHED'        # All active connections

# ── FIREWALL: Is traffic being blocked? ─────────────────────────────
iptables -L -n -v | grep 443         # Check rules for port 443
iptables -L -n --line-numbers        # All rules with line numbers

# ── PACKET CAPTURE: What's actually happening? ──────────────────────
tcpdump -i eth0 -n 'host 10.0.0.1 and port 443' -c 20
# If you see: SYN → SYN-ACK → ACK = connected
# If you see: SYN → SYN → SYN = server not responding (firewall drop)
# If you see: SYN → RST = refused (no listener or app rejected)

# ── APPLICATION: TLS/SSL check ───────────────────────────────────────
openssl s_client -connect 10.0.0.1:443 -servername hostname
# Shows certificate, cipher suite, TLS version

# ── SYSCALL TRACE: What's the app doing? ────────────────────────────
strace -e trace=network -p PID      # All network syscalls for a process`}
      </CodeBlock>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 14 */}
      <Chapter n="14" title="Common Misconceptions" subtitle="Port and socket errors that waste hours in production debugging" />

      <Err title="A server can only handle 65,535 simultaneous connections">
        Port numbers are 16-bit, giving 65,535 possible values — but this limit applies to the source port used by one client IP when connecting to one server IP:port. A server handling connections from thousands of different client IPs has thousands of different 5-tuples per port. There is no 65,535 limit on server-side connections. A server with 1 million clients connecting to port 443 has 1 million unique 5-tuples, all valid simultaneously. The per-server limit is memory (each connection uses ~4KB kernel memory) and file descriptor limits (ulimit -n, default 1024 — must be raised to 1M+ for high-performance servers).
      </Err>

      <Err title="Opening a connection 'uses up' a port on the server">
        The server does not allocate a new port for each incoming connection. Every connection uses the same server port (e.g., 443). The <Code>accept()</Code> call returns a new socket file descriptor — not a new port. The kernel differentiates connections by the full 5-tuple, not just the server port. Port exhaustion is exclusively a client-side problem: clients run out of ephemeral source ports when connecting to the same destination IP:port.
      </Err>

      <Err title="Connection refused and connection timeout mean the same thing">
        They indicate completely different problems. Connection refused = RST received = the destination machine is reachable and actively rejecting the connection (no listener on that port, or explicit reject rule). The failure is fast (immediate RST). Connection timeout = no response = either the destination is unreachable, or a firewall is silently dropping packets (DROP vs REJECT). The failure is slow (127 seconds default). These require entirely different remediation: refused → fix the service; timeout → fix routing or firewall.
      </Err>

      <Err title="SO_REUSEADDR and SO_REUSEPORT do the same thing">
        They solve different problems. SO_REUSEADDR allows a new server process to bind a port that has lingering TIME_WAIT sockets from the previous server instance — essential for restarting a server without a 120-second wait. SO_REUSEPORT allows multiple simultaneously-running processes to bind the exact same address:port — the kernel distributes incoming connections across all of them. This enables a multi-process server model where nginx spawns 8 worker processes, each calling listen() on port 443 independently.
      </Err>

      <Err title="Closing a connection immediately frees the port">
        After close(), a TCP connection in TIME_WAIT still occupies a kernel connection table entry for 2×MSL (60–120 seconds). The 5-tuple cannot be reused for a new connection to the same destination during this period. This is by design — to prevent a new connection from receiving delayed packets from the old connection. High-throughput clients making thousands of short-lived connections to the same server accumulate TIME_WAIT entries that can exceed the ephemeral port range. Fix: connection pooling (avoid creating/destroying connections), tcp_tw_reuse, or multiple source IPs.
      </Err>

      <Err title="Moving a service to a non-standard port makes it secure">
        Moving SSH from port 22 to port 2222 reduces automated brute-force noise — most scanners specifically target well-known ports. But a full port scan (<Code>nmap -p 1-65535 target</Code>) finds any service in under 10 minutes. Security through obscurity is not a security control. Actual SSH security: key-based authentication (no passwords), fail2ban rate limiting, firewall source IP whitelisting, and regular patching. Non-standard ports are a noise filter, not a barrier.
      </Err>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 15 */}
      <Chapter n="15" title="Interview Questions" />

      <IQ q="What is the difference between a port and a socket?" level="Beginner">
        A port is a 16-bit number (0–65,535) identifying a service or process endpoint on a machine. Port 443 means HTTPS; port 22 means SSH. A socket is an OS file descriptor representing one endpoint of a network connection. Multiple sockets can use the same port (every client connected to a web server has their own socket, all sharing the server's port 443). A socket address is an (IP, port) pair. A TCP connection is identified by two socket addresses plus the protocol — the 5-tuple. When you call socket() in code, you get a file descriptor; that fd is the socket.
      </IQ>

      <IQ q="Explain the 5-tuple. Why must it be unique, and what happens when two connections would share the same 5-tuple?" level="Beginner">
        The 5-tuple is (source_ip, source_port, destination_ip, destination_port, protocol). It is the kernel's demultiplexing key for incoming packets — every packet is matched against the connection table using this key to find the right socket. If two active connections had identical 5-tuples, the kernel could not determine which connection a packet belongs to. The OS enforces uniqueness: connect() fails with EADDRINUSE if the resulting 5-tuple is already in use. Connections in TIME_WAIT also prevent 5-tuple reuse until they expire. The OS automatically picks a different ephemeral source port if the requested one would create a duplicate.
      </IQ>

      <IQ q="What causes port exhaustion, and how would you diagnose and fix it?" level="Intermediate">
        Port exhaustion occurs when a client runs out of ephemeral source ports when connecting to the same destination IP:port. The 5-tuple must be unique — if all ~28K ephemeral ports (Linux default range 32768–60999) to a given destination are either active or in TIME_WAIT (held 60–120s after close), no new connections can be opened (EADDRNOTAVAIL error). Diagnosis: <Code>{"ss -tan | awk '{print $1}' | sort | uniq -c"}</Code> shows TIME_WAIT counts; <Code>ss -s</Code> shows socket summary. Fixes: (1) Connection pooling — reuse connections instead of creating new ones per request (root cause fix). (2) Expand ephemeral range: <Code>sysctl -w net.ipv4.ip_local_port_range="1024 65535"</Code>. (3) Enable <Code>tcp_tw_reuse=1</Code> — allows safe reuse of TIME_WAIT sockets for new outbound connections. (4) Multiple source IPs — each source IP has its own 64K port space.
      </IQ>

      <IQ q="Why does epoll achieve O(1) complexity compared to select's O(n), and what does this mean for server scalability?" level="Senior">
        select() requires the application to pass the complete set of file descriptors to monitor on every call. The kernel scans all of them to find which are ready — O(n) per call. With 100,000 connections, the kernel scans 100,000 fds even if only 1 is ready. epoll() uses a kernel-maintained data structure (red-black tree for the interest set, linked list for ready events). When any fd becomes ready, the kernel adds it to the ready list. epoll_wait() returns only fds that are actually ready — the application processes exactly those, no scanning. This is O(1) in the number of ready events regardless of total monitored fds. Scalability impact: nginx with select() would spend most CPU time scanning idle connections. With epoll(), nginx only processes connections with actual data. This is why nginx handles 100,000 simultaneous connections while Apache prefork (one process per connection, select() based) could not scale past a few thousand on typical hardware.
      </IQ>

      <IQ q="Explain the TCP TIME_WAIT state — why it exists, why it matters, and when it's safe to bypass it." level="Senior">
        TIME_WAIT is the state a TCP connection's active closer enters after completing the 4-way FIN exchange. It lasts 2×MSL (Maximum Segment Lifetime = 30–60s, so TIME_WAIT = 60–120s). It exists for two reasons: (1) Reliable close: ensure the final ACK (for the remote's FIN) is delivered. If the final ACK is lost, the remote retransmits its FIN. TIME_WAIT allows the ACK to be retransmitted. (2) Prevent 5-tuple reuse: ensure any delayed packets from the old connection are discarded before a new connection can reuse the same 5-tuple. Without TIME_WAIT, a delayed packet from a previous connection could corrupt a new connection. TIME_WAIT matters for high-throughput clients: at 10,000 connections/second to one server, TIME_WAIT accumulates 600,000–1,200,000 entries simultaneously — exceeding the ephemeral port range. Safe bypasses: tcp_tw_reuse (allows client-side reuse when TCP Timestamps confirm the old connection is truly gone — safe). tcp_tw_recycle (was unsafe for NATted networks; removed in Linux 4.12). SO_LINGER with timeout=0 (sends RST instead of FIN — avoids TIME_WAIT but may lose in-flight data; acceptable for test environments, dangerous in production).
      </IQ>

      <IQ q="Describe the hash collision attack against TCP connection tables and how Linux mitigated it." level="PhD">
        The Linux kernel's TCP connection table is a hash table keyed by 5-tuple. Lookup is O(1) average when connections distribute uniformly across buckets. If an attacker can predict the hash function and craft 5-tuples that all hash to the same bucket, the hash table degrades to a linked list — O(n) lookup per packet, causing CPU exhaustion proportional to connections-per-bucket. This was a real attack: early Linux used Bob Jenkins' hash function seeded with a deterministic value (or values predictable from network timing). An attacker could compute which source IPs and ports would collide. Mitigation: Linux (and other modern kernels) switched to SipHash — a cryptographic pseudo-random function (PRF) seeded with a secret random value generated at boot time. An attacker who cannot predict the hash secret cannot craft colliding 5-tuples. Even if they try exhaustive probing, the hash function's output is computationally unpredictable from observable inputs. Modern Linux also adds additional randomization per-network-namespace. This is an example of algorithm security — the correct algorithm provides O(1) amortized complexity even in adversarial conditions.
      </IQ>

      <KeyTakeaways items={[
        'Ports (0–65,535) identify services on a machine. The 5-tuple (src_ip, src_port, dst_ip, dst_port, protocol) uniquely identifies every active connection — the kernel\'s demultiplexing key.',
        'Port ranges: 0–1023 well-known (root required to bind), 1024–49151 registered, 49152–65535 ephemeral (OS-assigned for client-side source ports, Linux default 32768–60999).',
        'A server handles unlimited connections on one port — the server\'s port is constant; client diversity (src_ip:src_port) makes each 5-tuple unique. Port exhaustion is client-side only.',
        'Socket API: socket()→bind()→listen()→accept() for servers; socket()→connect() for clients. File descriptors — treat them like files. Same API for TCP, UDP, and Unix domain sockets.',
        'Port exhaustion: client runs out of ephemeral ports to a specific dst_ip:port. Fix with connection pooling (best), expanded ephemeral range, tcp_tw_reuse, or multiple source IPs.',
        'TIME_WAIT lasts 60–120s after connection close — ensures safe 5-tuple reuse. tcp_tw_reuse safely allows client-side reuse; never use tcp_tw_recycle (removed in Linux 4.12).',
        'Accept queue: completed handshakes waiting for accept() — raise net.core.somaxconn to 65536 for production. Full queue = connections refused under burst traffic.',
        'epoll (Linux) achieves O(1) event notification regardless of connection count. select is O(n). nginx/Node.js use epoll for 100K+ concurrent connections per process.',
        'Unix domain sockets use the same API as TCP but bypass the network stack — ~30% faster for local IPC. Used by PostgreSQL, MySQL, Redis, and nginx-to-PHP-FPM communication.',
        'Connection refused (RST received) ≠ connection timeout (no response). Refused = port not open or actively rejected. Timeout = firewall DROP rule or host unreachable. Different problems, different fixes.',
      ]} />
    </LearnLayout>
  )
}
