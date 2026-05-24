'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

// ─── helper components ────────────────────────────────────────────────────────
const Chapter = ({ n, title }: { n: number; title: string }) => (
  <div style={{ marginBottom: '0.25rem' }}>
    <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6366f1' }}>
      Chapter {n}
    </span>
    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', margin: '0.25rem 0 0.75rem' }}>{title}</h2>
  </div>
)
const Divider = () => <hr style={{ border: 'none', borderTop: '2px solid #e2e8f0', margin: '2.5rem 0' }} />
const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ lineHeight: 1.85, color: '#334155', marginBottom: '1rem', fontSize: '1.02rem' }}>{children}</p>
)
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b', margin: '1.75rem 0 0.6rem' }}>{children}</h2>
)
const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#475569', margin: '1.25rem 0 0.4rem' }}>{children}</h3>
)
const Accent = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontWeight: 700, color: '#6366f1' }}>{children}</span>
)
const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '0.1rem 0.4rem', fontSize: '0.88rem', fontFamily: 'monospace', color: '#0f172a' }}>{children}</code>
)
const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '10px', padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontFamily: 'monospace', overflowX: 'auto', lineHeight: 1.7, margin: '1rem 0' }}>
    <code>{children}</code>
  </pre>
)
const StoryBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'linear-gradient(135deg,#f0f9ff,#e0f2fe)', border: '2px solid #0ea5e9', borderRadius: '12px', padding: '1.25rem 1.5rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#0c4a6e' }}>
    {children}
  </div>
)
const WowBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'linear-gradient(135deg,#fdf4ff,#fae8ff)', border: '2px solid #a855f7', borderRadius: '12px', padding: '1.25rem 1.5rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#581c87' }}>
    <span style={{ fontWeight: 800, color: '#7c3aed' }}>WOW: </span>{children}
  </div>
)
const Warn = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#fffbeb', border: '2px solid #f59e0b', borderRadius: '12px', padding: '1.25rem 1.5rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#78350f' }}>
    <span style={{ fontWeight: 800, color: '#d97706' }}>WARN: </span>{children}
  </div>
)
const Err = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#fff1f2', border: '2px solid #f43f5e', borderRadius: '12px', padding: '1.25rem 1.5rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#881337' }}>
    <span style={{ fontWeight: 800, color: '#e11d48' }}>MISCONCEPTION: </span>{children}
  </div>
)
const LEVEL_COLORS: Record<string, string> = {
  Beginner: '#10b981', Intermediate: '#3b82f6', Senior: '#8b5cf6', PhD: '#f97316'
}
const IQ = ({ level, children }: { level: string; children: React.ReactNode }) => (
  <div style={{ background: '#f8fafc', border: `2px solid ${LEVEL_COLORS[level]}`, borderRadius: '12px', padding: '1.25rem 1.5rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#1e293b' }}>
    <span style={{ display: 'inline-block', background: LEVEL_COLORS[level], color: '#fff', fontWeight: 700, fontSize: '0.75rem', borderRadius: '6px', padding: '0.15rem 0.6rem', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>{level}</span>
    <div>{children}</div>
  </div>
)

// ─── interactive component 1: FTP Session Walkthrough ────────────────────────
type FtpStep = {
  id: number
  dir: 'C' | 'S'
  message: string
  explanation: string
  channel: 'control' | 'data'
}
const FTP_STEPS: FtpStep[] = [
  { id: 1, dir: 'S', message: '220 FTP server ready', explanation: 'Server sends greeting banner on port 21 (control channel). Client connects here.', channel: 'control' },
  { id: 2, dir: 'C', message: 'USER alice', explanation: 'Client sends username in plaintext. Anyone sniffing the wire sees this.', channel: 'control' },
  { id: 3, dir: 'S', message: '331 Password required', explanation: 'Server requests password.', channel: 'control' },
  { id: 4, dir: 'C', message: 'PASS s3cr3t!', explanation: 'Password sent in cleartext. This is why FTP is dangerous on untrusted networks.', channel: 'control' },
  { id: 5, dir: 'S', message: '230 User logged in', explanation: 'Authentication succeeded. Session is now established.', channel: 'control' },
  { id: 6, dir: 'C', message: 'TYPE I', explanation: 'Switch to binary (Image) mode. TYPE A is ASCII mode. Binary mode required for non-text files.', channel: 'control' },
  { id: 7, dir: 'S', message: '200 Type set to I', explanation: 'Server acknowledges binary mode.', channel: 'control' },
  { id: 8, dir: 'C', message: 'PASV', explanation: 'Client requests passive mode — server opens a random high port for the data connection. Client initiates the data connection.', channel: 'control' },
  { id: 9, dir: 'S', message: '227 Entering Passive (192,168,1,1,195,149)', explanation: 'Server provides its IP and data port encoded as h1,h2,h3,h4,p1,p2. Port = p1*256+p2 = 195*256+149 = 50069.', channel: 'control' },
  { id: 10, dir: 'C', message: 'RETR report.pdf', explanation: 'Client opens data connection to server port 50069, then issues RETR on control channel.', channel: 'control' },
  { id: 11, dir: 'S', message: '150 Opening BINARY mode data connection', explanation: 'Server opens data channel and begins sending file bytes.', channel: 'data' },
  { id: 12, dir: 'S', message: '[binary file data transfer]', explanation: 'File bytes stream over the data connection (port 50069). Control channel is idle during transfer.', channel: 'data' },
  { id: 13, dir: 'S', message: '226 Transfer complete', explanation: 'Data connection closes. Server signals completion on control channel.', channel: 'control' },
  { id: 14, dir: 'C', message: 'QUIT', explanation: 'Client requests disconnect.', channel: 'control' },
  { id: 15, dir: 'S', message: '221 Goodbye', explanation: 'Control connection closes. Session ends.', channel: 'control' },
]

function FtpSessionWalkthrough() {
  const [active, setActive] = useState<number | null>(null)
  const dirColor = (d: 'C' | 'S') => d === 'C' ? '#3b82f6' : '#10b981'
  const channelBg = (c: 'control' | 'data') => c === 'data' ? '#fef3c7' : '#f8fafc'

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #6366f1', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#6366f1', marginBottom: '0.25rem' }}>FTP Session Walkthrough (Passive Mode)</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>Click any step to see what it means. Yellow = data channel, white = control channel.</p>
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ background: '#3b82f6', color: '#fff', borderRadius: '6px', padding: '0.2rem 0.7rem', fontSize: '0.8rem', fontWeight: 700 }}>C Client</span>
        <span style={{ background: '#10b981', color: '#fff', borderRadius: '6px', padding: '0.2rem 0.7rem', fontSize: '0.8rem', fontWeight: 700 }}>S Server</span>
        <span style={{ background: '#f59e0b', color: '#fff', borderRadius: '6px', padding: '0.2rem 0.7rem', fontSize: '0.8rem', fontWeight: 700 }}>Data channel</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {FTP_STEPS.map(s => (
          <div key={s.id}
            onClick={() => setActive(active === s.id ? null : s.id)}
            style={{ cursor: 'pointer', borderRadius: '8px', border: `2px solid ${active === s.id ? '#6366f1' : '#e2e8f0'}`, background: active === s.id ? '#eef2ff' : channelBg(s.channel), padding: '0.55rem 0.9rem', transition: 'all 0.15s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontWeight: 800, color: '#6366f1', minWidth: '1.4rem', fontSize: '0.82rem' }}>{s.id}</span>
              <span style={{ background: dirColor(s.dir), color: '#fff', borderRadius: '5px', padding: '0.1rem 0.45rem', fontSize: '0.75rem', fontWeight: 800 }}>{s.dir}</span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.88rem', color: '#1e293b', flex: 1 }}>{s.message}</span>
            </div>
            {active === s.id && (
              <div style={{ marginTop: '0.6rem', padding: '0.65rem', background: '#f0f4ff', borderRadius: '7px', color: '#1e293b', fontSize: '0.92rem', lineHeight: 1.65 }}>
                {s.explanation}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── interactive component 2: Protocol Comparator ────────────────────────────
type TransferProto = {
  id: string
  name: string
  port: string
  encryption: string
  authMethods: string
  dataChannel: string
  firewallFriendly: string
  useCase: string
  verdict: string
  color: string
}
const TRANSFER_PROTOS: TransferProto[] = [
  {
    id: 'ftp',
    name: 'FTP',
    port: '21 (control), 20 or ephemeral (data)',
    encryption: 'None — credentials and data in cleartext',
    authMethods: 'Username/password (plaintext), anonymous',
    dataChannel: 'Separate TCP connection (active or passive mode)',
    firewallFriendly: 'Terrible — active mode requires inbound to client; passive opens ephemeral ports',
    useCase: 'Legacy internal transfers, old hardware devices',
    verdict: 'Deprecated for any internet use',
    color: '#ef4444',
  },
  {
    id: 'ftps',
    name: 'FTPS (FTP over TLS)',
    port: '990 (implicit TLS) or 21 (explicit STARTTLS)',
    encryption: 'TLS 1.2/1.3 — credentials and data encrypted',
    authMethods: 'Username/password over TLS, client certificates',
    dataChannel: 'Separate encrypted TLS connection per transfer',
    firewallFriendly: 'Poor — still requires ephemeral data ports; TLS inspection can break it',
    useCase: 'Legacy systems that require FTP semantics but with encryption',
    verdict: 'Better than FTP, but SFTP is simpler and preferred',
    color: '#f59e0b',
  },
  {
    id: 'sftp',
    name: 'SFTP (SSH File Transfer Protocol)',
    port: '22 (uses SSH transport)',
    encryption: 'Always — SSH encryption (ChaCha20, AES-GCM)',
    authMethods: 'SSH public key, password, certificates, GSSAPI',
    dataChannel: 'Single SSH session — no separate data channel',
    firewallFriendly: 'Excellent — single port 22, works through NAT',
    useCase: 'Modern secure file transfer, automation, cloud storage',
    verdict: 'Recommended for all new deployments',
    color: '#10b981',
  },
  {
    id: 'scp',
    name: 'SCP (Secure Copy)',
    port: '22 (uses SSH transport)',
    encryption: 'Always — SSH encryption',
    authMethods: 'Same as SSH: key, password, certificates',
    dataChannel: 'Single SSH session — inline data transfer',
    firewallFriendly: 'Excellent — single port 22',
    useCase: 'Simple one-shot file copies, scripting',
    verdict: 'Good for simple copies; SFTP better for interactive use',
    color: '#3b82f6',
  },
]
const PROTO_FIELDS: (keyof TransferProto)[] = ['port', 'encryption', 'authMethods', 'dataChannel', 'firewallFriendly', 'useCase', 'verdict']
const FIELD_LABELS: Record<string, string> = {
  port: 'Port(s)',
  encryption: 'Encryption',
  authMethods: 'Auth Methods',
  dataChannel: 'Data Channel',
  firewallFriendly: 'Firewall-Friendly?',
  useCase: 'Use Case',
  verdict: 'Verdict',
}

function FileTransferComparator() {
  const [sel, setSel] = useState<string>('sftp')
  const p = TRANSFER_PROTOS.find(x => x.id === sel)!

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #10b981', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#10b981', marginBottom: '0.25rem' }}>File Transfer Protocol Comparator</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Select a protocol to compare features and trade-offs.</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {TRANSFER_PROTOS.map(t => (
          <button key={t.id} onClick={() => setSel(t.id)}
            style={{ padding: '0.45rem 1rem', borderRadius: '8px', border: `2px solid ${t.color}`, background: sel === t.id ? t.color : '#fff', color: sel === t.id ? '#fff' : t.color, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s', fontSize: '0.9rem' }}>
            {t.name}
          </button>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: '10px', border: `2px solid ${p.color}`, overflow: 'hidden' }}>
        {PROTO_FIELDS.map((f, i) => (
          <div key={f} style={{ display: 'flex', borderBottom: i < PROTO_FIELDS.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
            <div style={{ width: '150px', minWidth: '150px', background: '#f8fafc', padding: '0.7rem 1rem', fontWeight: 700, color: '#475569', fontSize: '0.85rem', borderRight: '1px solid #e2e8f0' }}>{FIELD_LABELS[f]}</div>
            <div style={{ flex: 1, padding: '0.7rem 1rem', color: '#1e293b', fontSize: '0.92rem', lineHeight: 1.6 }}>{p[f]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── interactive component 3: SFTP Command Explorer ─────────────────────────
type SftpCommand = {
  cmd: string
  syntax: string
  description: string
  example: string
  category: 'navigation' | 'transfer' | 'management' | 'info'
}
const SFTP_COMMANDS: SftpCommand[] = [
  { cmd: 'ls', syntax: 'ls [-la] [path]', description: 'List remote directory contents. -l for long format, -a to show hidden files.', example: 'ls -la /home/alice', category: 'navigation' },
  { cmd: 'lls', syntax: 'lls [path]', description: 'List LOCAL directory contents. l-prefix commands operate on the local side.', example: 'lls ~/downloads', category: 'navigation' },
  { cmd: 'cd', syntax: 'cd path', description: 'Change remote working directory.', example: 'cd /var/www/html', category: 'navigation' },
  { cmd: 'lcd', syntax: 'lcd path', description: 'Change LOCAL working directory.', example: 'lcd ~/uploads', category: 'navigation' },
  { cmd: 'pwd', syntax: 'pwd', description: 'Print remote working directory.', example: 'pwd', category: 'info' },
  { cmd: 'get', syntax: 'get remote [local]', description: 'Download file from remote to local. Optionally rename on download.', example: 'get report.pdf ~/desktop/report.pdf', category: 'transfer' },
  { cmd: 'mget', syntax: 'mget pattern', description: 'Download multiple files matching a glob pattern.', example: 'mget *.log', category: 'transfer' },
  { cmd: 'put', syntax: 'put local [remote]', description: 'Upload file from local to remote. Optionally rename on upload.', example: 'put build.tar.gz /releases/', category: 'transfer' },
  { cmd: 'mput', syntax: 'mput pattern', description: 'Upload multiple files matching a glob pattern.', example: 'mput *.jpg', category: 'transfer' },
  { cmd: 'mkdir', syntax: 'mkdir path', description: 'Create remote directory.', example: 'mkdir /backups/2026', category: 'management' },
  { cmd: 'rm', syntax: 'rm path', description: 'Delete a remote file.', example: 'rm /tmp/old_log.txt', category: 'management' },
  { cmd: 'rmdir', syntax: 'rmdir path', description: 'Remove an empty remote directory.', example: 'rmdir /backups/2024', category: 'management' },
  { cmd: 'chmod', syntax: 'chmod mode path', description: 'Change permissions on a remote file.', example: 'chmod 644 /var/www/index.html', category: 'management' },
  { cmd: 'stat', syntax: 'stat path', description: 'Show detailed file metadata: size, permissions, timestamps, owner.', example: 'stat /etc/hosts', category: 'info' },
  { cmd: 'rename', syntax: 'rename oldpath newpath', description: 'Rename or move a remote file.', example: 'rename temp.txt final.txt', category: 'management' },
]
const CATS = ['all', 'navigation', 'transfer', 'management', 'info'] as const
type SftpCat = typeof CATS[number]
const CAT_COLOR: Record<SftpCat, string> = { all: '#6366f1', navigation: '#3b82f6', transfer: '#10b981', management: '#f59e0b', info: '#8b5cf6' }

function SftpCommandExplorer() {
  const [cat, setCat] = useState<SftpCat>('all')
  const [active, setActive] = useState<string | null>(null)
  const visible = cat === 'all' ? SFTP_COMMANDS : SFTP_COMMANDS.filter(c => c.category === cat)

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #8b5cf6', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#8b5cf6', marginBottom: '0.25rem' }}>SFTP Interactive Command Reference</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Filter by category, then click a command to see syntax and example.</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)}
            style={{ padding: '0.35rem 0.85rem', borderRadius: '7px', border: `2px solid ${CAT_COLOR[c]}`, background: cat === c ? CAT_COLOR[c] : '#fff', color: cat === c ? '#fff' : CAT_COLOR[c], fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem', textTransform: 'capitalize' }}>
            {c}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
        {visible.map(c => (
          <div key={c.cmd}
            onClick={() => setActive(active === c.cmd ? null : c.cmd)}
            style={{ cursor: 'pointer', borderRadius: '8px', border: `2px solid ${active === c.cmd ? CAT_COLOR[c.category] : '#e2e8f0'}`, background: active === c.cmd ? '#f0f4ff' : '#fff', padding: '0.55rem 0.85rem', transition: 'all 0.15s' }}>
            <div style={{ fontFamily: 'monospace', fontWeight: 800, color: CAT_COLOR[c.category], fontSize: '0.95rem' }}>{c.cmd}</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>{c.description.slice(0, 50)}…</div>
          </div>
        ))}
      </div>
      {active && (() => {
        const cmd = SFTP_COMMANDS.find(c => c.cmd === active)!
        return (
          <div style={{ background: '#fff', borderRadius: '10px', border: `2px solid ${CAT_COLOR[cmd.category]}`, padding: '1rem 1.25rem' }}>
            <div style={{ fontFamily: 'monospace', fontWeight: 800, color: CAT_COLOR[cmd.category], fontSize: '1rem', marginBottom: '0.4rem' }}>{cmd.cmd}</div>
            <div style={{ marginBottom: '0.5rem' }}><span style={{ fontWeight: 700, color: '#475569', fontSize: '0.82rem' }}>SYNTAX: </span><code style={{ fontFamily: 'monospace', fontSize: '0.88rem', color: '#0f172a' }}>{cmd.syntax}</code></div>
            <div style={{ marginBottom: '0.5rem', color: '#334155', lineHeight: 1.65 }}>{cmd.description}</div>
            <div><span style={{ fontWeight: 700, color: '#475569', fontSize: '0.82rem' }}>EXAMPLE: </span><code style={{ fontFamily: 'monospace', fontSize: '0.88rem', background: '#0f172a', color: '#e2e8f0', borderRadius: '5px', padding: '0.1rem 0.5rem' }}>{cmd.example}</code></div>
          </div>
        )
      })()}
    </div>
  )
}

// ─── main export ─────────────────────────────────────────────────────────────
export default function FtpAndSftpPage() {
  return (
    <LearnLayout
      title="FTP, FTPS, and SFTP"
      description="From the original two-channel design of FTP to the encrypted simplicity of SFTP: how file transfer protocols work, why FTP is dangerous, and what to use in 2026."
      section="Networking Fundamentals — Module 29"
      readTime="25–35 min"
      updatedAt="May 2026"
    >
      {/* ── Chapter 1 ─────────────────────────────────────────── */}
      <Chapter n={1} title="The Protocol That Predates Encryption" />
      <StoryBox>
        1971. The ARPAnet has around 23 nodes. Abhay Bhushan publishes RFC 114 — the first File Transfer Protocol. The internet's design philosophy at the time: trust your neighbours, encryption is someone else's problem. FTP was built to solve a real problem — moving files between incompatible time-sharing systems — and it worked. It worked so well that 50 years later, millions of systems still run it. The problem? The world it was designed for no longer exists.
      </StoryBox>
      <Para>
        FTP defined the baseline for file transfer: separate control and data channels, a text-based command protocol, and a small vocabulary of operations (get, put, list, delete). Every subsequent file transfer protocol either built on FTP semantics or explicitly reacted against FTP's weaknesses.
      </Para>
      <Para>
        Understanding FTP is not just archaeology. It is the prerequisite for understanding why FTPS, SFTP, and SCP were designed the way they were, and why they make the different choices they do.
      </Para>
      <WowBox>
        FTP's RFC 959 (1985) has not been formally deprecated despite being 40 years old. It is still technically a "full standard" in the IETF standards track. The US NIST and NCSC have both recommended against using FTP over untrusted networks since at least 2009, but the RFC itself lives on.
      </WowBox>

      <Divider />
      {/* ── Chapter 2 ─────────────────────────────────────────── */}
      <Chapter n={2} title="FTP: Two Channels, One Design Mistake" />
      <StoryBox>
        Most network protocols use a single TCP connection. FTP uses two: a long-lived control channel for commands, and a short-lived data channel for each transfer. This design made sense in 1971 — it separated signaling from data cleanly. But it created a firewall nightmare and, combined with the total lack of encryption, made FTP the worst protocol still in common use.
      </StoryBox>
      <H2>The Control Channel (Port 21)</H2>
      <Para>
        The control channel is a persistent TCP connection to port 21 on the server. Commands (USER, PASS, LIST, RETR, STOR) and responses (3-digit numeric codes like 220, 331, 230) flow over this channel as ASCII text for the lifetime of the session. The control channel stays open even while file data is transferring on a separate connection.
      </Para>
      <H2>The Data Channel: Active vs. Passive Mode</H2>
      <Para>
        This is where FTP's fundamental complexity lives. To transfer a directory listing or a file, FTP must open a second TCP connection — the data channel. There are two modes:
      </Para>
      <H3>Active Mode (PORT)</H3>
      <Para>
        In active mode, the <em>server</em> initiates the data connection. The client sends a PORT command specifying its IP address and a port it is listening on. The server then connects from its port 20 to the client's specified port. Problem: most clients are behind NAT/firewalls that block inbound connections. Active mode is essentially broken in modern internet environments.
      </Para>
      <H3>Passive Mode (PASV)</H3>
      <Para>
        In passive mode, the <em>client</em> initiates both connections. The client sends PASV. The server responds with an IP:port for the client to connect to. The client makes a second TCP connection to that address for data. This works through client-side firewalls but requires the server to open a range of high ports — typically 49152–65535 — in the firewall. NAT devices still need to track the embedded IP in the PASV response (FTP Application Layer Gateways handle this).
      </Para>
      <CodeBlock>{`# Active mode data channel:
Client: PORT 192,168,1,100,204,98     # client IP + port 52322
Server: connects FROM :20 TO client:52322
# Firewall must allow inbound TCP to client (breaks NAT)

# Passive mode data channel:
Client: PASV
Server: 227 Entering Passive Mode (192,168,1,1,195,149)
# Port = 195*256 + 149 = 50069
Client: connects TO server:50069
# Server's firewall must allow inbound to port 50069`}</CodeBlock>
      <H2>FTP Response Codes</H2>
      <Para>
        FTP responses are three-digit codes where the first digit indicates category: <Accent>1xx</Accent> (positive preliminary — action started), <Accent>2xx</Accent> (positive completion), <Accent>3xx</Accent> (positive intermediate — more input needed), <Accent>4xx</Accent> (transient negative — retry may succeed), <Accent>5xx</Accent> (permanent negative).
      </Para>
      <Para>
        Common codes: <Code>220</Code> (service ready), <Code>331</Code> (password required), <Code>230</Code> (login success), <Code>150</Code> (data channel opening), <Code>226</Code> (transfer complete), <Code>425</Code> (can't open data connection), <Code>530</Code> (not logged in).
      </Para>
      <FtpSessionWalkthrough />
      <H2>Anonymous FTP</H2>
      <Para>
        Many public FTP servers historically allowed anonymous access — username <Code>anonymous</Code>, password is your email address (convention, not enforced). Anonymous FTP was the primary distribution mechanism for open-source software before the web. <Code>ftp.gnu.org</Code>, kernel.org, and university mirrors all ran anonymous FTP. HTTP/HTTPS largely replaced it in the 2000s.
      </Para>

      <Divider />
      {/* ── Chapter 3 ─────────────────────────────────────────── */}
      <Chapter n={3} title="Why FTP is Dangerous" />
      <StoryBox>
        A security researcher sets up a packet capture on a coffee shop Wi-Fi network. Within 20 minutes, they capture three FTP sessions — all including usernames and passwords in plaintext. The targets: a web developer uploading files to their hosting provider, a small business syncing inventory to an FTP-based ERP system, and a WordPress plugin updater. None of them knew their credentials were visible to anyone on the same network.
      </StoryBox>
      <H2>Cleartext Credential Transmission</H2>
      <Para>
        USER and PASS commands are sent as ASCII text over TCP. Any network observer — on the same LAN segment, a compromised router, a malicious ISP, a coffee-shop attacker — can read your username and password. There is no optional encryption mode in plain FTP.
      </Para>
      <H2>Cleartext Data Transmission</H2>
      <Para>
        All file data transfers over the data channel without any encryption. If you upload a database export, a source code archive, or confidential documents via FTP, every byte is readable to network observers.
      </Para>
      <H2>No Server Authentication</H2>
      <Para>
        Plain FTP has no mechanism to verify that the server you connected to is the server you intended to connect to. An attacker with control of DNS or ARP can redirect your FTP client to a malicious server that collects your credentials and proxies the real server.
      </Para>
      <H2>PORT Bounce Attack</H2>
      <Para>
        In active mode, the PORT command specifies a destination IP and port for the server to connect to. An attacker could use an FTP server as a TCP proxy by issuing PORT commands pointing at third-party hosts — the server would then make connections on behalf of the attacker. Modern FTP servers mitigate this by refusing PORT commands that specify a different IP from the control channel source, but legacy servers remain vulnerable.
      </Para>
      <Warn>
        Do not use plain FTP for anything other than anonymous public downloads from trusted servers on networks you control. For any scenario involving authentication or sensitive data, use SFTP or FTPS.
      </Warn>

      <Divider />
      {/* ── Chapter 4 ─────────────────────────────────────────── */}
      <Chapter n={4} title="FTPS: FTP Over TLS" />
      <StoryBox>
        In the late 1990s, as SSL matured and FTP's security problems became undeniable, the IETF needed a way to secure FTP without breaking every existing FTP client and server. The solution: add TLS as a layer. RFC 2228 (1997) and later RFC 4217 (2005) define two modes of FTP over TLS, confusingly named Explicit and Implicit.
      </StoryBox>
      <H2>Explicit FTPS (FTPES)</H2>
      <Para>
        Explicit FTPS starts with a plain FTP connection to port 21. The client then issues the <Code>AUTH TLS</Code> command to upgrade the control channel to TLS. This is analogous to SMTP's STARTTLS. The advantage: backward compatibility — clients that don't support TLS can still connect (though they get no security). The server can be configured to require TLS by rejecting non-TLS sessions.
      </Para>
      <CodeBlock>{`# Explicit FTPS negotiation on port 21
Client → Server:  [TCP connect to :21]
Server → Client:  220 FTP server ready
Client → Server:  AUTH TLS
Server → Client:  234 AUTH TLS successful
[TLS handshake begins on control channel]
Client → Server:  USER alice       (now encrypted)
Client → Server:  PASS s3cr3t      (now encrypted)
Server → Client:  230 Logged in
Client → Server:  PBSZ 0           (protection buffer size = 0)
Client → Server:  PROT P           (private = encrypt data channel too)
Client → Server:  PASV
Server → Client:  227 Entering Passive (...)
[Client opens encrypted data channel]`}</CodeBlock>
      <H2>Implicit FTPS</H2>
      <Para>
        Implicit FTPS connects to port 990 and begins TLS immediately — no AUTH TLS command needed. The TLS handshake happens before any FTP commands are exchanged, just like HTTPS vs HTTP. This is simpler but breaks backward compatibility with plain FTP clients. Port 990 is not as widely supported as port 21.
      </Para>
      <H2>FTPS Data Channel Protection</H2>
      <Para>
        After securing the control channel, the client must explicitly request data channel encryption with <Code>PROT P</Code> (private/encrypted). The <Code>PBSZ 0</Code> command sets protection buffer size to 0 (required for streaming TLS). If a client omits PROT P, data transfers may still be unencrypted even with an encrypted control channel.
      </Para>
      <Warn>
        FTPS still has the two-channel problem. The TLS session on the data channel is separate from the control channel TLS session. Some TLS inspection proxies and firewalls cannot correctly handle the implicit data channel reconnection, causing transfer failures. This is one major reason operators prefer SFTP over FTPS.
      </Warn>

      <Divider />
      {/* ── Chapter 5 ─────────────────────────────────────────── */}
      <Chapter n={5} title="SFTP: Not FTP at All" />
      <StoryBox>
        When SSH was being standardized in the late 1990s, the IETF SSH working group faced a design choice: how to do file transfer securely. They could wrap FTP in SSH (like FTPS wraps FTP in TLS). Instead, they designed a completely new protocol from scratch — the SSH File Transfer Protocol, or SFTP. Despite the similar name, SFTP has nothing to do with FTP. It shares no commands, no wire format, and no design philosophy.
      </StoryBox>
      <H2>SFTP Architecture</H2>
      <Para>
        SFTP runs as a <Accent>subsystem</Accent> over an SSH connection. When you connect with an SFTP client to port 22, the SSH handshake completes normally, then the client requests the <Code>sftp</Code> subsystem via an SSH_MSG_CHANNEL_REQUEST. The server spawns <Code>sftp-server</Code> as a subprocess connected to the channel. All SFTP communication happens as SSH_MSG_CHANNEL_DATA messages within the encrypted SSH session.
      </Para>
      <Para>
        The fundamental difference from FTP: <em>one TCP connection, one SSH session, all data encrypted, firewall-friendly</em>. There are no separate data channels, no mode switching, no PORT/PASV negotiation.
      </Para>
      <H2>SFTP Protocol: Binary, Stateful, Request-Response</H2>
      <Para>
        Unlike FTP's ASCII command protocol, SFTP is a binary protocol. Each message has a type byte followed by a request-id (allowing pipelining and out-of-order responses) and binary-encoded fields. Operations are stateful: you open file handles (SSH_FXP_OPEN), read/write with handles (SSH_FXP_READ, SSH_FXP_WRITE), then close them (SSH_FXP_CLOSE).
      </Para>
      <CodeBlock>{`# SFTP message types (binary protocol, not text)
SSH_FXP_INIT (1)        → Client sends protocol version
SSH_FXP_VERSION (2)     ← Server responds with supported version (3–6)
SSH_FXP_OPEN (3)        → Open file handle (flags: read/write/create)
SSH_FXP_CLOSE (4)       → Close handle
SSH_FXP_READ (5)        → Read bytes from open handle
SSH_FXP_WRITE (6)       → Write bytes to open handle
SSH_FXP_LSTAT (7)       → Stat without following symlinks
SSH_FXP_FSTAT (8)       → Stat open handle
SSH_FXP_SETSTAT (9)     → Set file attributes (chmod, times)
SSH_FXP_OPENDIR (11)    → Open directory for listing
SSH_FXP_READDIR (12)    → Read directory entries
SSH_FXP_REMOVE (13)     → Delete file
SSH_FXP_MKDIR (14)      → Create directory
SSH_FXP_REALPATH (16)   → Resolve relative path
SSH_FXP_STAT (17)       → Stat following symlinks
SSH_FXP_RENAME (18)     → Rename/move file
SSH_FXP_STATUS (101)    ← Server status response (ok/error codes)`}</CodeBlock>
      <H2>SFTP Pipelining</H2>
      <Para>
        SFTP supports <Accent>request pipelining</Accent> — the client can send multiple requests without waiting for responses. Each request has a unique 32-bit request-id; responses may arrive in any order and are matched by id. Modern clients like OpenSSH's sftp and paramiko send 64 outstanding requests by default, dramatically improving throughput on high-latency links.
      </Para>
      <WowBox>
        The reason SFTP transfers feel slow on some links is not the protocol — it is the default window size. SFTP transfers small chunks (32 KB by default) and waits for acknowledgement. Setting a larger transfer buffer (<Code>sftp -B 65536</Code>) on high-bandwidth links can multiply throughput significantly. On a 100ms latency link, 32KB window = max ~320 KB/s; 64MB window = potential gigabit speed.
      </WowBox>
      <SftpCommandExplorer />

      <Divider />
      {/* ── Chapter 6 ─────────────────────────────────────────── */}
      <Chapter n={6} title="SCP: The Simpler Sibling" />
      <StoryBox>
        Before SFTP was widely deployed, the OpenSSH project needed a file copy tool. SCP — Secure Copy Protocol — was the answer: a thin wrapper around the SSH connection that mimicked the behavior of rcp (remote copy) with encryption. SCP was never specified in an RFC; it was simply the OpenSSH implementation. For 20 years it was the default.
      </StoryBox>
      <H2>SCP Legacy Protocol</H2>
      <Para>
        The original SCP protocol used a simple in-band signalling mechanism: a single TCP-connected SSH session, where the first byte indicates direction (send or receive), and file data is prefixed by a one-line metadata header. It was simple, fast, and had a critical security flaw: the server could inject arbitrary paths in the metadata header, causing files to land in unexpected locations. This was patched in 2019 (CVE-2019-6111) but the protocol was aging poorly.
      </Para>
      <H2>Modern SCP Uses SFTP Under the Hood</H2>
      <Para>
        OpenSSH 9.0 (2022) switched the <Code>scp</Code> command to use the SFTP protocol internally by default. The command-line interface is unchanged, but the wire protocol is SFTP. This eliminates the path injection vulnerability and provides all of SFTP's benefits while keeping the familiar <Code>scp user@host:/path file</Code> syntax.
      </Para>
      <CodeBlock>{`# scp uses SFTP protocol since OpenSSH 9.0
# -O flag forces legacy SCP protocol if needed for old servers
scp -O file.txt oldserver:/path/

# For new servers, just use scp normally (SFTP underneath)
scp -r local_dir/ user@server:/remote/

# Tune SFTP buffer size for performance
scp -l 100000 large_file.iso user@server:/iso/  # limit to 100 kbps
# (Use sftp -B 65536 for larger buffer size control)`}</CodeBlock>
      <H2>rsync over SSH: Delta Transfers</H2>
      <Para>
        rsync is not a protocol on its own — it is an algorithm for computing file differences and a tool that can use various transports. When used with SSH (<Code>rsync -e ssh</Code> or simply <Code>rsync user@host:/path</Code>), rsync runs the rsync daemon on the remote via the SSH channel. The rsync delta algorithm computes rolling checksums of file blocks; only changed blocks are transferred over the wire.
      </Para>
      <CodeBlock>{`# rsync performance on changed files:
# File: 1 GB, changed 1 MB
# scp transfer: ~1 GB over wire
# rsync transfer: ~1 MB over wire (only the delta)

# This makes rsync ideal for:
# - Incremental backups
# - Deploying website changes (only modified files transferred)
# - Sync large media libraries
# - Mirror package repositories`}</CodeBlock>

      <Divider />
      {/* ── Chapter 7 ─────────────────────────────────────────── */}
      <Chapter n={7} title="Protocol Comparison: When to Use What" />
      <StoryBox>
        A DevOps team is migrating a legacy application that currently uses plain FTP to push deployment artifacts to production servers. They have three options: FTPS (least code change), SFTP (most secure, best compatibility), or rsync over SSH (most efficient for large files). The right answer depends on whether the legacy FTP server can be replaced, the size and change rate of files, and the firewall topology.
      </StoryBox>
      <FileTransferComparator />
      <H2>Decision Framework</H2>
      <Para>
        <Accent>Use SFTP</Accent> for: all new deployments, automation that needs to connect through firewalls, environments managed by SSH keys or certificates, cloud-to-cloud or cloud-to-on-prem file transfer.
      </Para>
      <Para>
        <Accent>Use FTPS</Accent> for: systems with existing FTP infrastructure that can add TLS but cannot be replaced with SFTP (e.g., old Windows FTP servers, EDI trading partners requiring FTP semantics), B2B file exchange where the trading partner mandates FTPS.
      </Para>
      <Para>
        <Accent>Use rsync over SSH</Accent> for: incremental backups, large file synchronization, website deployments, any scenario where only changed portions of files need to transfer.
      </Para>
      <Para>
        <Accent>Avoid plain FTP</Accent>: on any network other than a loopback or fully isolated, air-gapped internal network. There is no legitimate reason to use plain FTP on the internet in 2026.
      </Para>

      <Divider />
      {/* ── Chapter 8 ─────────────────────────────────────────── */}
      <Chapter n={8} title="SFTP Server Configuration" />
      <StoryBox>
        Setting up an SFTP server is straightforward with OpenSSH — it is already installed and the sftp subsystem is enabled by default. The interesting challenges are: restricting users to their home directories (chroot jails), allowing SFTP but not SSH shell access, and managing permissions for service accounts.
      </StoryBox>
      <H2>SFTP-Only Users (No Shell Access)</H2>
      <Para>
        A common pattern: create users who can transfer files via SFTP but cannot run a shell. This is done by setting their shell to <Code>/usr/sbin/nologin</Code> or <Code>/bin/false</Code> and configuring sshd to use the internal-sftp subsystem with a chroot jail.
      </Para>
      <CodeBlock>{`# /etc/ssh/sshd_config

# Enable internal-sftp subsystem
Subsystem sftp internal-sftp

# SFTP-only chroot configuration
Match Group sftp-users
    ChrootDirectory /data/sftp/%u    # %u = username
    ForceCommand internal-sftp
    AllowTcpForwarding no
    X11Forwarding no
    AllowAgentForwarding no`}</CodeBlock>
      <CodeBlock>{`# Set up an sftp-only user
useradd -m -s /usr/sbin/nologin -G sftp-users alice
mkdir -p /data/sftp/alice/uploads

# Chroot requires the directory to be owned by root, mode 755
chown root:root /data/sftp/alice
chmod 755 /data/sftp/alice

# User's writable directory
chown alice:alice /data/sftp/alice/uploads
chmod 755 /data/sftp/alice/uploads`}</CodeBlock>
      <Warn>
        ChrootDirectory ownership rules are strict: the chroot directory and every parent directory must be owned by root with no write permissions for other users. If Alice's chroot is <Code>/data/sftp/alice</Code>, then <Code>/data</Code>, <Code>/data/sftp</Code>, and <Code>/data/sftp/alice</Code> must all be root:root 755. If any component is writable by the user, the chroot fails with a cryptic "broken pipe" error.
      </Warn>
      <H2>SFTP with Key Authentication</H2>
      <Para>
        SFTP inherits all SSH authentication methods. For automated transfers, public key auth is standard. The authorized_keys file must be placed at the path OpenSSH expects — which, with a chroot, requires special care: authorized_keys must be at the real (non-chrooted) path, not inside the chroot, unless AuthorizedKeysFile is configured accordingly.
      </Para>
      <CodeBlock>{`# AuthorizedKeysFile location with chroot
# Default path: %h/.ssh/authorized_keys (%h = user's real home dir)
# With chroot at /data/sftp/alice, the .ssh/authorized_keys
# must be at /home/alice/.ssh/authorized_keys (real path)
# or configure AuthorizedKeysFile /etc/ssh/keys/%u`}</CodeBlock>

      <Divider />
      {/* ── Chapter 9 ─────────────────────────────────────────── */}
      <Chapter n={9} title="Automating File Transfer: Scripts and Libraries" />
      <StoryBox>
        Most production file transfers are automated — CI/CD pipelines deploying artifacts, cron jobs archiving logs, ETL processes ingesting data from trading partners. Each automation needs a reliable SFTP client that handles authentication, error recovery, and often PGP encryption of the files themselves.
      </StoryBox>
      <H2>sftp Batch Mode</H2>
      <CodeBlock>{`# Run sftp commands from a batch file
sftp -b commands.sftp user@server

# commands.sftp content:
cd /uploads
put /local/export_20260524.csv
ls -la
bye`}</CodeBlock>
      <H2>Python with Paramiko</H2>
      <CodeBlock>{`import paramiko

# Connect and transfer
client = paramiko.SSHClient()
client.load_system_host_keys()
client.set_missing_host_key_policy(paramiko.RejectPolicy())  # Never AutoAdd

client.connect(
    'sftp.partner.com',
    username='transfer_user',
    key_filename='/secrets/sftp_ed25519',
    port=22
)

sftp = client.open_sftp()
sftp.put('/local/report.csv', '/uploads/report.csv')
sftp.close()
client.close()`}</CodeBlock>
      <H2>Node.js with ssh2</H2>
      <CodeBlock>{`const { Client } = require('ssh2');
const fs = require('fs');

const conn = new Client();
conn.on('ready', () => {
  conn.sftp((err, sftp) => {
    if (err) throw err;
    sftp.fastPut(
      '/local/data.csv',
      '/uploads/data.csv',
      { concurrency: 8, chunkSize: 65536 },
      (err) => {
        if (err) throw err;
        conn.end();
      }
    );
  });
}).connect({
  host: 'sftp.partner.com',
  port: 22,
  username: 'transfer_user',
  privateKey: fs.readFileSync('/secrets/id_ed25519'),
  hostVerifier: (key) => key.equals(EXPECTED_HOST_KEY_FINGERPRINT),
});`}</CodeBlock>
      <Warn>
        Never use <Code>RejectPolicy</Code> that silently accepts any host key in production automation (equivalent of StrictHostKeyChecking=no). Always pre-load known_hosts or verify the server fingerprint in code. An automated process that accepts any host key is vulnerable to MITM.
      </Warn>

      <Divider />
      {/* ── Chapter 10 ─────────────────────────────────────────── */}
      <Chapter n={10} title="Firewall and NAT Challenges" />
      <StoryBox>
        A network administrator deploys an FTPS server behind a load balancer and NAT. The control channel connects fine. The data channel fails. The PASV response contains the server's private IP (192.168.x.x) instead of the public IP. The client connects to the private IP, which is unreachable from the internet. This misconfiguration costs 3 hours to debug because the error message says nothing about IP addresses in PASV responses.
      </StoryBox>
      <H2>FTP NAT Problems</H2>
      <Para>
        The PASV response embeds the server's IP address in the payload: <Code>227 Entering Passive (192,168,1,1,195,149)</Code>. If the server is behind NAT, this IP is unreachable from the internet. Solutions: configure the FTP server's <Code>masquerade_address</Code> or <Code>pasv_address</Code> to return the public IP; or use a FTP Application Layer Gateway (ALG) in the firewall that rewrites the PASV response.
      </Para>
      <Para>
        SFTP has none of this complexity. Single TCP connection, single port 22, works through any NAT without special firewall configuration.
      </Para>
      <H2>Passive Port Ranges</H2>
      <Para>
        FTPS servers must have a defined passive port range open in the firewall. Common configuration: ports 50000–50100 (or wider). This increases the attack surface compared to SFTP's single-port design.
      </Para>
      <CodeBlock>{`# vsftpd passive port configuration
# /etc/vsftpd.conf
pasv_enable=YES
pasv_min_port=50000
pasv_max_port=50100
pasv_address=203.0.113.1    # public IP

# Firewall rule
iptables -A INPUT -p tcp --dport 21 -j ACCEPT
iptables -A INPUT -p tcp --dport 50000:50100 -j ACCEPT`}</CodeBlock>
      <H2>SFTP Behind Firewalls</H2>
      <Para>
        SFTP requires only port 22 inbound to the server. It works through:
      </Para>
      <Para>
        — NAT without any special handling (single outbound connection from client)
      </Para>
      <Para>
        — Stateful firewalls (one TCP connection, no dynamic port opening needed)
      </Para>
      <Para>
        — Load balancers (sticky sessions or connection persistence on port 22)
      </Para>
      <Para>
        — Web proxies that support CONNECT tunneling to port 22
      </Para>

      <Divider />
      {/* ── Chapter 11 ─────────────────────────────────────────── */}
      <Chapter n={11} title="File Transfer Security Best Practices" />
      <StoryBox>
        A data breach post-mortem analysis reveals the initial access vector: a legacy SFTP server that accepted password authentication and had no fail2ban equivalent. An attacker used credential stuffing — testing 50,000 username/password combinations from a public breach database — and hit a valid pair after 8 hours. The company's firewall allowed all inbound TCP to port 22 with no rate limiting.
      </StoryBox>
      <H2>Authentication Security</H2>
      <Para>
        For all SSH/SFTP servers: disable password authentication (<Code>PasswordAuthentication no</Code>), require public key auth. For service accounts: generate a dedicated key pair per service, store the private key in a secrets manager, rotate annually or after any suspected compromise.
      </Para>
      <H2>Least Privilege Access</H2>
      <Para>
        Use SFTP chroot jails to restrict users to specific directories. Use the <Code>ForceCommand internal-sftp</Code> directive to prevent shell access for SFTP-only users. Create per-service accounts rather than sharing credentials.
      </Para>
      <H2>File Encryption in Transit and at Rest</H2>
      <Para>
        SFTP/FTPS encrypt in transit. For sensitive data, also consider end-to-end encryption of the files themselves using PGP/GPG. Trading partners can encrypt files with your public PGP key before uploading; you decrypt after download. This protects even if the transport is compromised.
      </Para>
      <CodeBlock>{`# Encrypt a file for a partner's PGP key before SFTP upload
gpg --recipient partner@company.com --output report.csv.gpg --encrypt report.csv
sftp -b - user@partner-server << 'EOF'
put report.csv.gpg /incoming/
EOF`}</CodeBlock>
      <H2>Logging and Auditing</H2>
      <Para>
        Enable verbose logging in sshd: <Code>LogLevel VERBOSE</Code> records every authentication attempt, file operation (with internal-sftp), and disconnection. Ship logs to a SIEM. For SFTP-only servers, internal-sftp logs file operations (open, read, write, close) to syslog — essential for compliance and incident response.
      </Para>

      <Divider />
      {/* ── Chapter 12 ─────────────────────────────────────────── */}
      <Chapter n={12} title="Modern File Transfer Alternatives" />
      <StoryBox>
        SFTP is excellent but it is not the only answer. Large cloud-native architectures prefer pre-signed URLs over S3 or GCS — no server to maintain, built-in access control, automatic expiry. Enterprise content delivery platforms like MFT (Managed File Transfer) add scheduling, retry logic, non-repudiation, and audit trails on top of SFTP semantics.
      </StoryBox>
      <H2>S3 Pre-Signed URLs</H2>
      <Para>
        AWS S3 pre-signed URLs grant time-limited access to upload or download specific objects without AWS credentials. Generate a URL that expires in 15 minutes; share it with a partner; they PUT/GET directly to S3 over HTTPS. No SFTP server required.
      </Para>
      <CodeBlock>{`# Generate a 15-minute PUT pre-signed URL
aws s3 presign s3://my-bucket/incoming/data.csv \
  --expires-in 900 \
  --method PUT

# Partner uploads directly:
curl -X PUT --upload-file data.csv "https://my-bucket.s3.amazonaws.com/incoming/data.csv?X-Amz-..."

# For AWS Transfer Family: managed SFTP backed by S3
# - Users connect via SFTP to AWS endpoint
# - Files land in S3 automatically
# - No EC2/server to manage`}</CodeBlock>
      <H2>AWS Transfer Family</H2>
      <Para>
        AWS Transfer Family provides a managed SFTP/FTPS/FTP endpoint backed by S3 or EFS. Users connect to the endpoint with standard SFTP clients; files appear in S3 buckets. No server management, automatic scaling, built-in CloudWatch metrics. Ideal for B2B file exchange with trading partners who require SFTP without the overhead of running your own server.
      </Para>
      <H2>Managed File Transfer (MFT) Platforms</H2>
      <Para>
        Enterprise MFT platforms (GoAnywhere, IBM Sterling, Axway) add business-level features on top of SFTP: scheduled transfers, event-driven workflows, non-repudiation receipts, audit trails, compliance reporting (PCI-DSS, HIPAA), and integration with enterprise directories. They are the right choice when FTP/SFTP is a core business process with regulatory requirements.
      </Para>

      <Divider />
      {/* ── Chapter 13 ─────────────────────────────────────────── */}
      <Chapter n={13} title="Misconceptions About File Transfer Protocols" />
      <Err>
        "SFTP is just FTP with encryption." — SFTP and FTP are completely different protocols with no shared design, wire format, or commands. SFTP is a file transfer subsystem of the SSH protocol (RFC draft-ietf-secsh-filexfer). FTP is RFC 959. The only thing they share is the purpose (file transfer) and two letters in the name.
      </Err>
      <Err>
        "FTPS and SFTP are the same thing — both use S for Secure." — FTPS is FTP over TLS (RFC 4217), uses ports 990 or 21, and still has the two-channel architecture with ephemeral data ports. SFTP is SSH File Transfer Protocol, uses port 22, has a single TCP connection, and is not related to FTP. They are completely different protocols that happen to solve the same problem.
      </Err>
      <Err>
        "Passive mode FTP is firewall-friendly." — Passive mode avoids the problem of servers needing to connect back to clients (active mode), but it still requires the server to open a range of ephemeral high ports in its firewall. It is more firewall-friendly than active mode but significantly less friendly than SFTP's single-port design.
      </Err>
      <Err>
        "Moving to SFTP means I don't need to worry about data security." — SFTP encrypts data in transit. If your SFTP server allows password authentication, an attacker can brute-force it. If the files themselves contain sensitive data, they should be encrypted at rest as well. Transport encryption is necessary but not sufficient for a complete data security posture.
      </Err>
      <Err>
        "SCP is deprecated and I should never use it." — The legacy SCP protocol had security issues, and those led to OpenSSH switching the <Code>scp</Code> command to use SFTP under the hood in version 9.0. The <em>command</em> scp is not deprecated — it is now safer. Only the legacy wire protocol is discouraged. Use <Code>scp</Code> freely; it now uses SFTP unless you force the old protocol with <Code>-O</Code>.
      </Err>

      <Divider />
      {/* ── Chapter 14 ─────────────────────────────────────────── */}
      <Chapter n={14} title="IQ Depth Check: File Transfer Protocol Mastery" />
      <IQ level="Beginner">
        <strong>What is the main difference between FTP and SFTP?</strong><br />
        FTP sends all data, including credentials, in plaintext and uses two TCP connections (control on port 21, data on a separate port). SFTP encrypts everything using SSH (port 22), uses a single TCP connection, and is not related to FTP despite the similar name — it is a completely different protocol designed from scratch.
      </IQ>
      <IQ level="Intermediate">
        <strong>Explain FTP active vs. passive mode and why passive mode is more commonly used today.</strong><br />
        In active mode, the server initiates the data connection back to the client — this breaks NAT and client-side firewalls because it requires an inbound connection to the client. In passive mode, the server opens a random high port and tells the client which port to connect to; the client initiates both connections. Passive mode works through client-side NAT and firewalls because all connections are client-initiated. It is more commonly used because most clients are behind NAT/firewalls, but it still requires the server's firewall to allow a range of high ports.
      </IQ>
      <IQ level="Senior">
        <strong>How does SFTP pipelining work, and why does it matter for performance over high-latency links?</strong><br />
        SFTP is a request-response binary protocol where each request has a 32-bit request-id. The client can send multiple requests without waiting for responses — up to a configurable window of outstanding requests (OpenSSH default: 64). Responses arrive with matching request-ids and can be processed out of order. On a high-latency link (e.g., 100ms RTT), without pipelining you are limited to one round-trip per operation: 10 read requests × 100ms = 1 second minimum. With 64 concurrent requests, all 64 can be in flight simultaneously, reducing 64 round-trips to effectively 1. This is why tuning <Code>-B</Code> (buffer size) on sftp can dramatically improve throughput on WAN links.
      </IQ>
      <IQ level="PhD">
        <strong>Why does the OpenSSH chroot directory for SFTP need to be owned by root:root with mode 755, and what happens at the kernel level if this requirement is violated?</strong><br />
        When sshd performs a <Code>chroot(2)</Code> syscall to jail an SFTP user, the kernel changes the process's notion of root. POSIX requires that a process doing chroot must be root (CAP_SYS_CHROOT). OpenSSH additionally enforces that the chroot directory and all ancestors are not writable by anyone other than root. The reason: if a user could write to any directory in the chroot path, they could create symlinks that escape the jail via hardlink/symlink race conditions. Specifically, a writable directory allows creating a symlink from a name inside the chroot to an absolute path outside; combined with directory traversal, this breaks the containment. The check is done in <Code>session.c</Code> (OpenSSH source) via <Code>safe_path()</Code>, which walks the directory tree verifying owner and mode. If any component fails, sshd logs "bad ownership or modes for chroot directory" and closes the connection — intentionally unhelpful to prevent information disclosure to attackers about the exact failure.
      </IQ>

      <Divider />
      <KeyTakeaways items={[
        'FTP uses two TCP channels: a persistent control channel (port 21) and a per-transfer data channel (active: server-initiated; passive: client-initiated to an ephemeral server port).',
        'Plain FTP transmits credentials and data in cleartext — never use it on the internet or any untrusted network.',
        'FTPS adds TLS to FTP: Explicit FTPS upgrades port 21 with AUTH TLS; Implicit FTPS uses port 990 with immediate TLS. The two-channel architecture remains.',
        'SFTP is a completely separate protocol — not FTP with encryption. It runs as an SSH subsystem over a single TCP connection on port 22 with no separate data channel.',
        'SFTP is firewall-friendly: single port 22, client-initiated, works through NAT without special configuration.',
        'The sftp binary protocol supports pipelining (multiple outstanding requests), enabling high-throughput transfers on high-latency links with appropriate buffer tuning.',
        'Modern OpenSSH scp uses SFTP internally (since version 9.0); the legacy SCP protocol had path injection vulnerabilities.',
        'rsync over SSH uses delta transfer — only changed file blocks are transmitted — making it ideal for incremental backups and deployments.',
        'SFTP chroot jails require the chroot directory and all ancestors to be owned by root with no world/group write permission; sshd performs this check before calling chroot(2).',
        'AWS Transfer Family, S3 pre-signed URLs, and MFT platforms are modern alternatives to self-managed SFTP servers for cloud-native and enterprise file transfer.',
      ]} />
    </LearnLayout>
  )
}
