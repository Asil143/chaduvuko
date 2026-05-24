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

// ─── interactive component 1: SSH Handshake Visualizer ───────────────────────
type HandshakePhase = {
  id: number
  label: string
  actor: 'Client' | 'Server' | 'Both'
  detail: string
  rtt: string
}
const HANDSHAKE_PHASES: HandshakePhase[] = [
  { id: 1, label: 'TCP SYN / SYN-ACK / ACK', actor: 'Both', detail: 'Three-way TCP handshake on port 22. No encryption yet — just a reliable transport channel.', rtt: '1 RTT' },
  { id: 2, label: 'Protocol Version Exchange', actor: 'Both', detail: 'Both sides send their SSH version string: "SSH-2.0-OpenSSH_9.3". Agreement on SSH-2 only (SSH-1 deprecated).', rtt: '0.5 RTT' },
  { id: 3, label: 'SSH_MSG_KEXINIT', actor: 'Both', detail: 'Both parties advertise supported algorithms: key exchange (curve25519-sha256), host key (ed25519), encryption (chacha20-poly1305), MAC, compression. Sent simultaneously.', rtt: '0.5 RTT' },
  { id: 4, label: 'Key Exchange (ECDH)', actor: 'Both', detail: 'Client sends ephemeral public key. Server responds with: server host public key, server ephemeral key, DH result, signature over exchange hash. Shared secret K derived via ECDH.', rtt: '1 RTT' },
  { id: 5, label: 'SSH_MSG_NEWKEYS', actor: 'Both', detail: 'Both sides send NEWKEYS. All subsequent traffic is encrypted with session keys derived from K, the exchange hash H, and session ID.', rtt: '0 RTT' },
  { id: 6, label: 'Service Request: ssh-userauth', actor: 'Client', detail: 'Client requests the authentication service. Server acknowledges. Now identity negotiation begins.', rtt: '0.5 RTT' },
  { id: 7, label: 'User Authentication', actor: 'Client', detail: 'Client authenticates via: publickey (sign challenge with private key), password (encrypted), keyboard-interactive, or GSSAPI. Server returns SSH_MSG_USERAUTH_SUCCESS or FAILURE.', rtt: '1 RTT' },
  { id: 8, label: 'SSH_MSG_CHANNEL_OPEN', actor: 'Client', detail: 'Client opens a channel (session type). Channels are numbered — SSH multiplexes multiple logical streams over one TCP connection.', rtt: '0.5 RTT' },
  { id: 9, label: 'PTY / Shell Request', actor: 'Client', detail: 'Client requests a pseudo-terminal (pty-req) and shell. Server spawns a shell process connected to the channel. Data flows bidirectionally as SSH_MSG_CHANNEL_DATA packets.', rtt: '0.5 RTT' },
]

function SshHandshakeVisualizer() {
  const [active, setActive] = useState<number | null>(null)
  const actorColor = (a: HandshakePhase['actor']) =>
    a === 'Client' ? '#3b82f6' : a === 'Server' ? '#10b981' : '#8b5cf6'

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #6366f1', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#6366f1', marginBottom: '0.25rem' }}>SSH Connection Handshake</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Click any phase to see what is exchanged and why.</p>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {(['Client', 'Server', 'Both'] as const).map(a => (
          <span key={a} style={{ background: actorColor(a), color: '#fff', borderRadius: '6px', padding: '0.2rem 0.7rem', fontSize: '0.8rem', fontWeight: 700 }}>{a}</span>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {HANDSHAKE_PHASES.map(p => (
          <div key={p.id}
            onClick={() => setActive(active === p.id ? null : p.id)}
            style={{ cursor: 'pointer', borderRadius: '10px', border: `2px solid ${active === p.id ? '#6366f1' : '#e2e8f0'}`, background: active === p.id ? '#eef2ff' : '#fff', padding: '0.7rem 1rem', transition: 'all 0.15s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontWeight: 800, color: '#6366f1', minWidth: '1.5rem' }}>{p.id}</span>
              <span style={{ flex: 1, fontWeight: 600, color: '#1e293b' }}>{p.label}</span>
              <span style={{ background: actorColor(p.actor), color: '#fff', borderRadius: '6px', padding: '0.15rem 0.55rem', fontSize: '0.75rem', fontWeight: 700 }}>{p.actor}</span>
              <span style={{ color: '#64748b', fontSize: '0.82rem' }}>{p.rtt}</span>
            </div>
            {active === p.id && (
              <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#f0f4ff', borderRadius: '8px', color: '#1e293b', fontSize: '0.93rem', lineHeight: 1.7 }}>
                {p.detail}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── interactive component 2: SSH Auth Method Comparator ─────────────────────
type AuthMethod = {
  id: string
  name: string
  security: string
  usability: string
  howItWorks: string
  bestFor: string
  risk: string
  color: string
}
const AUTH_METHODS: AuthMethod[] = [
  { id: 'password', name: 'Password Auth', security: 'Low–Medium', usability: 'High', howItWorks: 'Client sends plaintext password over encrypted channel. Server compares hash.', bestFor: 'Quick one-off servers (dev)', risk: 'Brute-force, credential stuffing, phishing', color: '#f59e0b' },
  { id: 'pubkey', name: 'Public Key Auth', security: 'Very High', usability: 'Medium', howItWorks: 'Server stores user public key. Client proves private key possession by signing a challenge derived from session ID.', bestFor: 'All production SSH, automation', risk: 'Key theft if private key unprotected', color: '#10b981' },
  { id: 'cert', name: 'Certificate Auth (SSH CA)', security: 'Highest', usability: 'Medium', howItWorks: 'Admin CA signs user keys with expiry and principals. Server trusts CA cert. No per-server authorized_keys needed.', bestFor: 'Enterprises, ephemeral certs, short-lived access', risk: 'CA compromise affects all; CA must be secured', color: '#6366f1' },
  { id: 'gssapi', name: 'GSSAPI / Kerberos', security: 'High', usability: 'High (SSO)', howItWorks: 'Leverages Kerberos tickets from AD/LDAP. User authenticates to KDC once, gets TGT, SSH uses service ticket.', bestFor: 'Active Directory environments', risk: 'KDC is single point of failure', color: '#8b5cf6' },
]
const AUTH_FIELDS = ['Security', 'Usability', 'How It Works', 'Best For', 'Risk']

function SshAuthComparator() {
  const [selected, setSelected] = useState<string>('pubkey')
  const m = AUTH_METHODS.find(a => a.id === selected)!

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #10b981', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#10b981', marginBottom: '0.25rem' }}>SSH Authentication Methods</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Select a method to compare security, usability, and trade-offs.</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {AUTH_METHODS.map(a => (
          <button key={a.id} onClick={() => setSelected(a.id)}
            style={{ padding: '0.45rem 1rem', borderRadius: '8px', border: `2px solid ${a.color}`, background: selected === a.id ? a.color : '#fff', color: selected === a.id ? '#fff' : a.color, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s', fontSize: '0.9rem' }}>
            {a.name}
          </button>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: '10px', border: `2px solid ${m.color}`, overflow: 'hidden' }}>
        {AUTH_FIELDS.map((f, i) => {
          const val = [m.security, m.usability, m.howItWorks, m.bestFor, m.risk][i]
          return (
            <div key={f} style={{ display: 'flex', borderBottom: i < AUTH_FIELDS.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
              <div style={{ width: '140px', minWidth: '140px', background: '#f8fafc', padding: '0.7rem 1rem', fontWeight: 700, color: '#475569', fontSize: '0.88rem', borderRight: '1px solid #e2e8f0' }}>{f}</div>
              <div style={{ flex: 1, padding: '0.7rem 1rem', color: '#1e293b', fontSize: '0.93rem', lineHeight: 1.6 }}>{val}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── interactive component 3: SSH Port Forwarding Explorer ───────────────────
type ForwardType = {
  id: string
  name: string
  command: string
  diagram: string
  useCase: string
  warning: string
  color: string
}
const FORWARD_TYPES: ForwardType[] = [
  {
    id: 'local',
    name: 'Local Port Forwarding (-L)',
    command: 'ssh -L 8080:internal.corp:80 user@bastion',
    diagram: 'Browser:8080 → [SSH Client] ──SSH tunnel──→ [SSH Server] → internal.corp:80',
    useCase: 'Access an internal web server through a bastion host. Your local port 8080 maps to the remote network resource.',
    warning: 'Opens a local port — any process on localhost can use the tunnel unless you also pass -o GatewayPorts=no (default).',
    color: '#3b82f6',
  },
  {
    id: 'remote',
    name: 'Remote Port Forwarding (-R)',
    command: 'ssh -R 9090:localhost:3000 user@cloud-server',
    diagram: 'Internet → cloud-server:9090 → [SSH Server] ──SSH tunnel──→ [SSH Client] → localhost:3000',
    useCase: 'Expose a local dev server to the internet via a cloud VM. Often called "reverse tunnel."',
    warning: 'GatewayPorts no by default — the remote port only binds to 127.0.0.1 on the server. Set GatewayPorts yes to expose publicly.',
    color: '#10b981',
  },
  {
    id: 'dynamic',
    name: 'Dynamic SOCKS5 Proxy (-D)',
    command: 'ssh -D 1080 user@jump-host',
    diagram: 'App (SOCKS5:1080) → [SSH Client] ──SSH tunnel──→ [SSH Server] → ANY destination',
    useCase: 'Route arbitrary TCP traffic (browser, curl, git) through SSH server. Acts as a full SOCKS5 proxy for any protocol.',
    warning: 'No destination restriction — all traffic is proxied. Do not leave -D tunnels open unattended on shared machines.',
    color: '#8b5cf6',
  },
  {
    id: 'jump',
    name: 'Jump Host / ProxyJump (-J)',
    command: 'ssh -J bastion.corp user@internal-host',
    diagram: 'SSH Client → [bastion.corp:22] ──proxy──→ [internal-host:22]',
    useCase: 'Single command to reach a host behind a bastion without manually nesting SSH sessions.',
    warning: 'Agent forwarding (-A) adds convenience but risks key theft if bastion is compromised. Use ProxyJump instead.',
    color: '#f97316',
  },
]

function SshForwardingExplorer() {
  const [active, setActive] = useState<string>('local')
  const f = FORWARD_TYPES.find(x => x.id === active)!

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #f97316', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#f97316', marginBottom: '0.25rem' }}>SSH Port Forwarding Explorer</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Select a forwarding type to see the command, data flow, and use case.</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {FORWARD_TYPES.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}
            style={{ padding: '0.45rem 1rem', borderRadius: '8px', border: `2px solid ${t.color}`, background: active === t.id ? t.color : '#fff', color: active === t.id ? '#fff' : t.color, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s', fontSize: '0.88rem' }}>
            {t.name.split(' ')[0]} {t.name.split(' ')[1]}
          </button>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: '10px', border: `2px solid ${f.color}`, padding: '1.25rem' }}>
        <div style={{ fontWeight: 800, color: f.color, fontSize: '1.05rem', marginBottom: '0.75rem' }}>{f.name}</div>
        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ fontWeight: 700, color: '#475569', fontSize: '0.82rem', marginBottom: '0.25rem' }}>COMMAND</div>
          <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.85rem', fontFamily: 'monospace', overflowX: 'auto', margin: 0 }}>{f.command}</pre>
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ fontWeight: 700, color: '#475569', fontSize: '0.82rem', marginBottom: '0.25rem' }}>DATA FLOW</div>
          <div style={{ background: '#f0f4ff', borderRadius: '8px', padding: '0.65rem 1rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#1e293b', lineHeight: 1.6 }}>{f.diagram}</div>
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ fontWeight: 700, color: '#475569', fontSize: '0.82rem', marginBottom: '0.25rem' }}>USE CASE</div>
          <div style={{ color: '#334155', lineHeight: 1.7 }}>{f.useCase}</div>
        </div>
        <div style={{ background: '#fffbeb', border: '1px solid #f59e0b', borderRadius: '8px', padding: '0.65rem 1rem', color: '#78350f', fontSize: '0.9rem', lineHeight: 1.7 }}>
          <span style={{ fontWeight: 800, color: '#d97706' }}>WARN: </span>{f.warning}
        </div>
      </div>
    </div>
  )
}

// ─── main export ─────────────────────────────────────────────────────────────
export default function SSHPage() {
  return (
    <LearnLayout
      title="SSH — Secure Shell"
      description="From the terminal of desperation to the cryptographic bedrock of modern infrastructure: how SSH works, why it replaced everything else, and how to use it without shooting yourself in the foot."
      section="Networking Fundamentals — Module 28"
      readTime="30–42 min"
      updatedAt="May 2026"
    >
      {/* ── Chapter 1 ─────────────────────────────────────────── */}
      <Chapter n={1} title="The Night Tatu Ylönen Wrote SSH" />
      <StoryBox>
        February 1995. Helsinki. A Finnish researcher named Tatu Ylönen watches his university network get sniffed. The attacker harvested thousands of usernames and passwords from unencrypted Telnet and rlogin sessions crossing the wire. Ylönen has a decision: patch the protocol or replace it. Within three months he ships SSH-1 — an encrypted, authenticated replacement for Telnet, rlogin, and rsh — and releases it free on the internet. Within a year, 2 million users have it. SSH changes the rules of remote administration forever.
      </StoryBox>
      <Para>
        Before SSH, remote shell access was a horror show. <Accent>Telnet</Accent> sent everything — credentials, keystrokes, output — in plaintext. <Accent>rlogin</Accent> and <Accent>rsh</Accent> trusted hostnames that could be spoofed. Network sniffers were trivial. The 1995 Helsinki incident was not unique; it was simply the one that produced a solution.
      </Para>
      <Para>
        SSH-1 was good but had design flaws. In 2006, the IETF standardized <Accent>SSH-2</Accent> (RFC 4251–4254), which fixed the cryptographic weaknesses, separated authentication from transport, and introduced multiplexed channels. Today SSH-2 is the only acceptable version; SSH-1 must be disabled everywhere.
      </Para>
      <WowBox>
        SSH is used for more than remote shells. Every time you run <Code>git push</Code> to GitHub over SSH, every time your CI/CD pipeline deploys code via <Code>rsync</Code> or <Code>scp</Code>, every time a Kubernetes operator syncs a secret — SSH is working underneath.
      </WowBox>
      <Para>
        This module covers the SSH protocol from the TCP handshake through the cryptographic key exchange, all authentication methods, channel multiplexing, port forwarding, the agent, certificates, and the security hardening practices that separate a properly locked-down server from a breach waiting to happen.
      </Para>

      <Divider />
      {/* ── Chapter 2 ─────────────────────────────────────────── */}
      <Chapter n={2} title="The Protocol Stack: Transport, Auth, Connection" />
      <StoryBox>
        Most protocols are monolithic — one specification, one wire format. SSH is different. The IETF deliberately split it into three independent layers, each specified in its own RFC. This layering is why SSH can be extended (new auth methods, new channel types) without touching the cryptographic core.
      </StoryBox>
      <Para>
        SSH-2 is composed of three protocol layers stacked on top of TCP:
      </Para>
      <H2>SSH Transport Layer Protocol (RFC 4253)</H2>
      <Para>
        The transport layer handles algorithm negotiation, key exchange, encryption, integrity protection, and compression. After the transport layer finishes its work, every subsequent packet is encrypted and MAC-protected. The transport layer produces a <Accent>session identifier</Accent> — a hash of values exchanged during key exchange — that is used by the upper layers to bind authentication to a specific session.
      </Para>
      <Para>
        Key exchange produces two shared secrets: the session key material and the exchange hash H. Six symmetric keys are derived from these: client-to-server encryption key, server-to-client encryption key, client-to-server MAC key, server-to-client MAC key, client-to-server IV, server-to-client IV. This direction-split design means compromising one direction's key does not reveal the other.
      </Para>
      <H2>SSH Authentication Protocol (RFC 4252)</H2>
      <Para>
        Once the transport layer is established, the client authenticates against the <Code>ssh-userauth</Code> service. The authentication protocol is pluggable: <Accent>publickey</Accent>, <Accent>password</Accent>, <Accent>keyboard-interactive</Accent>, <Accent>hostbased</Accent>, and <Accent>gssapi-with-mic</Accent> are all defined methods. The server advertises which methods it accepts; clients try them in order.
      </Para>
      <H2>SSH Connection Protocol (RFC 4254)</H2>
      <Para>
        After authentication, the connection protocol multiplexes logical <Accent>channels</Accent> over the single encrypted TCP connection. A channel can be a shell session, a port-forward, an X11 connection, or any custom application type. Each channel has a sender and recipient channel number, and a window size — SSH implements its own flow control independent of TCP.
      </Para>
      <CodeBlock>{`SSH Packet Structure (after key exchange):
  uint32   packet_length      (length of payload + padding + padding_length)
  byte     padding_length     (random padding to enforce block boundary)
  byte[n]  payload            (SSH message)
  byte[m]  random padding     (m = padding_length)
  byte[k]  mac                (HMAC of seqno + plaintext, then packet encrypted)`}</CodeBlock>
      <Warn>
        SSH packet sequence numbers are maintained per direction and reset to 0 after a rekey. If you write custom SSH tooling, failing to handle rekey sequence number resets is a common bug that breaks MAC verification.
      </Warn>

      <Divider />
      {/* ── Chapter 3 ─────────────────────────────────────────── */}
      <Chapter n={3} title="Key Exchange: How Two Strangers Agree on a Secret" />
      <StoryBox>
        Imagine you have never met a server before. You have no shared secret. You need to agree on an encryption key — but everything you send can be observed by an attacker. This is the fundamental problem of key exchange, solved by Diffie-Hellman in 1976 and extended by elliptic-curve variants. SSH uses this mathematics every time a new connection is made.
      </StoryBox>
      <H2>Elliptic Curve Diffie-Hellman (ECDH) with Curve25519</H2>
      <Para>
        Modern OpenSSH defaults to <Accent>curve25519-sha256</Accent> for key exchange. Both sides generate an ephemeral EC key pair. The client sends its ephemeral public key. The server sends its ephemeral public key plus its host key signature. Both sides independently compute the same ECDH shared secret. The critical word is <em>ephemeral</em>: these keys are thrown away after the session ends.
      </Para>
      <Para>
        The mathematical basis: choose a random scalar <em>a</em> (private key) and compute <em>A = a × G</em> where G is the curve base point. The server does the same with scalar <em>b</em> and point <em>B</em>. The shared secret is <em>K = a × B = b × A = a × b × G</em>. An eavesdropper sees A and B but cannot compute K — this is the elliptic curve discrete logarithm problem.
      </Para>
      <H2>The Exchange Hash and Host Key Verification</H2>
      <Para>
        SSH computes an exchange hash H = SHA-256(client_version || server_version || client_KEXINIT || server_KEXINIT || server_host_key || client_ephemeral_pub || server_ephemeral_pub || K). The server signs H with its <Accent>host private key</Accent>. The client verifies this signature using the server's public key — which it must already know or trust-on-first-use.
      </Para>
      <Para>
        This signature binds the key exchange to the specific server identity. An attacker who can observe but not intercept gets nothing. An attacker who intercepts would need the server's host private key to forge the signature.
      </Para>
      <H2>Trust-on-First-Use (TOFU) and known_hosts</H2>
      <Para>
        The first time a client connects to a server, OpenSSH asks: "Are you sure you want to continue connecting? The authenticity of host X can't be established." If you type yes, the host public key fingerprint is stored in <Code>~/.ssh/known_hosts</Code>. On all future connections, OpenSSH verifies the server presents the same key — this catches MITM attacks.
      </Para>
      <Warn>
        The TOFU model has a fatal weakness: the first connection is unverified. If an attacker intercepts your first-ever SSH connection to a server, they can insert themselves undetected. For critical servers, verify the host key fingerprint out-of-band (e.g., via cloud console) before first connection.
      </Warn>
      <WowBox>
        Curve25519 was designed by Daniel J. Bernstein to be impossible to misimplement — fixed-time scalar multiplication, no weak cofactor issues, no special-case edge inputs. Compare that to NIST P-256, which has a complex cofactor and special-case handling that has caused numerous implementation bugs. Bernstein specifically designed the constants so they could not have been chosen to embed a backdoor.
      </WowBox>
      <SshHandshakeVisualizer />

      <Divider />
      {/* ── Chapter 4 ─────────────────────────────────────────── */}
      <Chapter n={4} title="Host Keys: Server Identity" />
      <StoryBox>
        A host key is the server's identity — the long-term asymmetric key pair that proves "I am the server you connected to last time, not an impostor." Unlike user keys (which identify humans), host keys identify machines. Every SSH server generates them on install and stores them in /etc/ssh/. Losing a host private key forces all clients to re-verify (and accept a "WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!" alarm).
      </StoryBox>
      <H2>Host Key Types</H2>
      <Para>
        OpenSSH supports multiple host key algorithms:
      </Para>
      <Para>
        <Accent>ed25519</Accent> — Preferred. EdDSA over Curve25519. Fast, small key (32 bytes), constant-time, no weak parameter risk. Generate: <Code>ssh-keygen -t ed25519</Code>
      </Para>
      <Para>
        <Accent>ecdsa</Accent> — ECDSA over NIST P-256/P-384/P-521. Faster than RSA, smaller than RSA, but NIST curves have theoretical parameter-selection concerns. Still widely used.
      </Para>
      <Para>
        <Accent>rsa</Accent> — Classic RSA. Minimum 3072 bits for new keys (NIST recommendation). Still compatible with all clients. Slower keygen and signing. Key size: 4096-bit RSA ≈ 256-bit ECC security.
      </Para>
      <Para>
        <Accent>dsa</Accent> — Deprecated. Fixed 1024-bit key size (by FIPS 186), broken. Never generate DSA host keys.
      </Para>
      <H2>The known_hosts File Format</H2>
      <CodeBlock>{`# ~/.ssh/known_hosts
github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA... (base64 pubkey)
|1|abc123=|def456= ssh-rsa AAAAB3NzaC1yc2EAAAA...   (hashed hostname)

# Hashed format: ssh-keygen -H hashes the hostname for privacy
# The hash is SHA1(hostname) with a random salt — prevents leaking
# which hosts you connect to if your known_hosts is stolen`}</CodeBlock>
      <Warn>
        Run <Code>ssh-keygen -R hostname</Code> to cleanly remove a stale host key rather than manually editing known_hosts — the hash entries need proper removal. Never use <Code>StrictHostKeyChecking no</Code> in production; it defeats the entire host-key trust model.
      </Warn>

      <Divider />
      {/* ── Chapter 5 ─────────────────────────────────────────── */}
      <Chapter n={5} title="User Authentication Deep Dive" />
      <StoryBox>
        Authentication is where most SSH security incidents happen. Not in the crypto — modern AES-CTR with HMAC-SHA2 or ChaCha20-Poly1305 are solid. The failures happen in authentication: reused keys, unprotected private key files, password auth on internet-facing servers, authorized_keys files containing stale or unauthorized entries. This chapter covers every auth method and its real-world trade-offs.
      </StoryBox>
      <SshAuthComparator />
      <H2>Public Key Authentication: The Mechanics</H2>
      <Para>
        The client wants to prove it holds the private key corresponding to a public key listed in the server's <Code>~/.ssh/authorized_keys</Code>. The protocol:
      </Para>
      <Para>
        1. Client sends: public key algorithm name + public key bytes (SSH_MSG_USERAUTH_REQUEST with method=publickey, signed=false) — asking "would you accept this key?"
      </Para>
      <Para>
        2. Server checks <Code>authorized_keys</Code>. If the key is listed, replies SSH_MSG_USERAUTH_PK_OK.
      </Para>
      <Para>
        3. Client signs: <Code>SHA-256(session_id || "publickey" || username || service || algorithm || pubkey)</Code> with its private key.
      </Para>
      <Para>
        4. Server verifies the signature. On success: SSH_MSG_USERAUTH_SUCCESS.
      </Para>
      <Para>
        The session ID binds the signature to this specific session — a signature from a legitimate user cannot be replayed against a different session with a different exchange hash.
      </Para>
      <H2>The authorized_keys File</H2>
      <CodeBlock>{`# ~/.ssh/authorized_keys (on the server)
# Each line: [options] keytype base64key [comment]

# Basic entry
ssh-ed25519 AAAAC3NzaC... user@laptop

# Restricted entry: force a specific command, no PTY, no forwarding
command="/usr/bin/rsync --server -avz . /backup/",no-pty,no-agent-forwarding,no-port-forwarding ssh-ed25519 AAAAC3NzaC...

# Restrict to source IP
from="10.0.1.0/24",no-x11-forwarding ssh-rsa AAAAB3NzaC...`}</CodeBlock>
      <H2>Generating Keys with ssh-keygen</H2>
      <CodeBlock>{`# Best practice: ed25519 with passphrase
ssh-keygen -t ed25519 -C "user@hostname-$(date +%Y)" -f ~/.ssh/id_ed25519

# Generates:
#   ~/.ssh/id_ed25519     (private key, encrypted with passphrase)
#   ~/.ssh/id_ed25519.pub (public key, copy to server's authorized_keys)

# View fingerprint
ssh-keygen -lf ~/.ssh/id_ed25519.pub
# 256 SHA256:abc123... user@hostname (ED25519)

# Convert old RSA to modern format
ssh-keygen -p -f ~/.ssh/id_rsa -m RFC4716`}</CodeBlock>
      <Warn>
        Always protect your private key with a passphrase. An unprotected private key on a stolen laptop is an immediate full compromise of every server that key authorizes. Use the SSH agent to avoid typing the passphrase repeatedly while keeping the file encrypted.
      </Warn>

      <Divider />
      {/* ── Chapter 6 ─────────────────────────────────────────── */}
      <Chapter n={6} title="SSH Certificates: The Enterprise Answer to authorized_keys Sprawl" />
      <StoryBox>
        A company has 500 engineers and 2,000 servers. The naive approach: each engineer has a key pair, and their public key is added to the authorized_keys file of every server they need access to. That is 500 × 2,000 = 1,000,000 authorized_keys entries to manage. When an engineer leaves, you have to hunt down and remove their key from every server. SSH certificates solve this at the infrastructure level.
      </StoryBox>
      <H2>How SSH CAs Work</H2>
      <Para>
        An SSH CA is just another SSH key pair — but it is trusted to sign user and host certificates. The workflow:
      </Para>
      <Para>
        1. Each server has <Code>TrustedUserCAKeys /etc/ssh/ca_user_key.pub</Code> in sshd_config — it trusts any user key signed by this CA.
      </Para>
      <Para>
        2. When a user needs access, an admin (or automated system like Vault) signs their public key: <Code>ssh-keygen -s ca_key -I "user@corp" -n "john,deploy" -V "+8h" user_key.pub</Code>
      </Para>
      <Para>
        3. The user presents their certificate during authentication. The server verifies the CA signature and checks principals, validity period, and critical options.
      </Para>
      <Para>
        4. No authorized_keys entry needed on any server. To revoke: let the certificate expire, or add the key to <Code>RevokedKeys</Code>.
      </Para>
      <H2>Certificate Fields</H2>
      <CodeBlock>{`ssh-keygen -Lf ~/.ssh/id_ed25519-cert.pub

# id_ed25519-cert.pub:
#         Type: ssh-ed25519-cert-v01@openssh.com user certificate
#         Public key: ED25519-CERT SHA256:abc123
#         Signing CA: ED25519 SHA256:ca_fingerprint (using rsa-sha2-512)
#         Key ID: "john@corp"
#         Serial: 42
#         Valid: from 2026-05-24T10:00:00 to 2026-05-24T18:00:00
#         Principals:
#                 john
#                 deploy
#         Critical Options: (none)
#         Extensions:
#                 permit-agent-forwarding
#                 permit-port-forwarding
#                 permit-pty
#                 permit-user-rc`}</CodeBlock>
      <WowBox>
        HashiCorp Vault has an SSH Secrets Engine that functions as a certificate authority. Engineers authenticate to Vault (LDAP, OIDC, etc.), request a signed SSH certificate valid for 30 minutes, and connect to the server. No static authorized_keys. No long-lived keys. Certificates expire automatically. This is the gold standard for enterprise SSH access management.
      </WowBox>

      <Divider />
      {/* ── Chapter 7 ─────────────────────────────────────────── */}
      <Chapter n={7} title="The SSH Agent: Unlocking Keys Once" />
      <StoryBox>
        You protect your private key with a passphrase. Good. But typing a 30-character passphrase every time you SSH somewhere would drive you insane. The SSH agent is the solution: a background process that holds your decrypted private key in memory and performs signing operations on behalf of SSH clients. The key never leaves the agent — client applications ask the agent to sign challenges.
      </StoryBox>
      <H2>How the Agent Works</H2>
      <Para>
        <Code>ssh-agent</Code> listens on a Unix domain socket (path stored in <Code>$SSH_AUTH_SOCK</Code>). The OpenSSH client, when it needs to authenticate, connects to the agent socket and sends a "please sign this challenge" request. The agent returns the signature. The private key material never crosses the socket.
      </Para>
      <CodeBlock>{`# Start agent and add key
eval "$(ssh-agent -s)"        # sets SSH_AUTH_SOCK and SSH_AGENT_PID
ssh-add ~/.ssh/id_ed25519     # prompts for passphrase ONCE, decrypts key

# Add with expiry (remove key after 8 hours)
ssh-add -t 28800 ~/.ssh/id_ed25519

# List keys in agent
ssh-add -l

# macOS Keychain integration (adds passphrase to Keychain for persistence)
ssh-add --apple-use-keychain ~/.ssh/id_ed25519`}</CodeBlock>
      <H2>Agent Forwarding: Power and Risk</H2>
      <Para>
        With agent forwarding (<Code>ssh -A</Code> or <Code>ForwardAgent yes</Code>), a remote SSH session on server A can use your local agent to authenticate to server B. This enables bastion-host workflows without copying private keys to intermediate hosts.
      </Para>
      <Warn>
        Agent forwarding is dangerous on untrusted servers. Root on the remote server can interact with your forwarded agent socket and impersonate you to any server your key authorizes — without ever seeing your private key. Prefer ProxyJump over agent forwarding. If you must forward, only do so to hosts you fully trust.
      </Warn>
      <H2>SSH_AUTH_SOCK Hijacking</H2>
      <Para>
        On shared servers, if another user has sudo/root, they can find your agent socket (<Code>/tmp/ssh-XXXX/agent.YYYY</Code>), set <Code>SSH_AUTH_SOCK</Code> to that path, and use your agent. This is why you should not forward your agent to shared multi-user servers. The socket permissions (user-only) stop other non-root users, but root can bypass them.
      </Para>

      <Divider />
      {/* ── Chapter 8 ─────────────────────────────────────────── */}
      <Chapter n={8} title="SSH Port Forwarding and Tunneling" />
      <StoryBox>
        SSH can do much more than remote shells. Its channel multiplexing capability lets it act as a general-purpose secure tunnel — forwarding TCP ports, proxying arbitrary protocols, even running VPN-like setups. Network engineers who understand SSH tunneling can reach any resource on a private network through a single SSH-accessible bastion.
      </StoryBox>
      <SshForwardingExplorer />
      <H2>The Mechanics of Local Forwarding</H2>
      <Para>
        When you run <Code>ssh -L 8080:internal:80 user@bastion</Code>, OpenSSH:
      </Para>
      <Para>
        1. Opens a listening socket on localhost:8080 (or 0.0.0.0:8080 if GatewayPorts yes).
      </Para>
      <Para>
        2. When a local connection arrives on port 8080, opens a new SSH channel of type direct-tcpip with destination internal:80.
      </Para>
      <Para>
        3. The SSH server receives the channel-open request and makes a TCP connection to internal:80 on behalf of the channel.
      </Para>
      <Para>
        4. Data flows bidirectionally through the channel, encrypted end-to-end in the SSH session.
      </Para>
      <H2>SOCKS5 Proxy: The Swiss Army Knife</H2>
      <Para>
        Dynamic forwarding (<Code>ssh -D 1080 user@jump</Code>) spawns a SOCKS5 server locally. Configure your browser or <Code>curl --socks5</Code> to route through it. The SSH client dynamically opens <Code>direct-tcpip</Code> channels for each SOCKS connection — no fixed destination required. This is essentially a poor-man's VPN for TCP applications.
      </Para>
      <CodeBlock>{`# Use SOCKS proxy with curl
curl --socks5 localhost:1080 https://internal-service.corp/api

# Use SOCKS proxy in git
git config --global core.gitProxy "nc -x localhost:1080"

# Use SOCKS proxy in Firefox:
# Network Settings → Manual proxy → SOCKS Host: localhost, Port: 1080, SOCKS v5`}</CodeBlock>
      <H2>ProxyJump: The Right Way to Reach Internal Hosts</H2>
      <Para>
        ProxyJump is the modern, safe way to connect through a bastion. It works by opening a channel to the destination using the bastion as a relay, but the bastion never sees plaintext — it merely relays TCP bytes. Your credentials authenticate to the destination directly.
      </Para>
      <CodeBlock>{`# ~/.ssh/config
Host bastion
    HostName bastion.corp.example.com
    User admin
    IdentityFile ~/.ssh/corp_ed25519

Host internal-*
    ProxyJump bastion
    User deploy
    IdentityFile ~/.ssh/corp_ed25519

# Now:  ssh internal-app1  connects via bastion automatically`}</CodeBlock>

      <Divider />
      {/* ── Chapter 9 ─────────────────────────────────────────── */}
      <Chapter n={9} title="The SSH Config File: Taming Complexity" />
      <StoryBox>
        Most sysadmins who are new to SSH type the full <Code>ssh -i ~/.ssh/specific_key -p 2222 -l deploy internal.corp</Code> every time. Experienced engineers write a ~/.ssh/config that reduces that to <Code>ssh internal</Code>. The config file is one of SSH's most powerful and underused features.
      </StoryBox>
      <H2>config File Syntax and Match Logic</H2>
      <CodeBlock>{`# ~/.ssh/config
# ---- Global defaults (apply to all hosts) ----
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3
    AddKeysToAgent yes
    IdentityFile ~/.ssh/id_ed25519

# ---- GitHub ----
Host github.com
    IdentityFile ~/.ssh/github_ed25519
    User git

# ---- Work bastion ----
Host bastion
    HostName bastion.corp.example.com
    User admin
    Port 22
    ControlMaster auto
    ControlPath ~/.ssh/cm-%r@%h:%p
    ControlPersist 10m

# ---- Internal hosts (via bastion) ----
Host *.corp.internal
    ProxyJump bastion
    User deploy
    StrictHostKeyChecking yes
    UserKnownHostsFile ~/.ssh/known_hosts_corp`}</CodeBlock>
      <H2>Connection Multiplexing with ControlMaster</H2>
      <Para>
        <Accent>ControlMaster</Accent> allows multiple SSH sessions to share a single TCP connection. The first connection creates a control socket. Subsequent connections to the same host reuse the socket without TCP handshake or key exchange. This dramatically speeds up repeated operations (git push, scp, ansible).
      </Para>
      <Para>
        <Code>ControlPersist 10m</Code> keeps the master connection alive for 10 minutes after the last session ends, so the next <Code>ssh</Code> command is near-instant.
      </Para>
      <Warn>
        ControlMaster sockets on shared filesystems (NFS, SMB) are dangerous — other users on the same share could hijack the socket. Keep <Code>ControlPath</Code> on local storage, ideally in /tmp or a user-only directory with mode 700.
      </Warn>

      <Divider />
      {/* ── Chapter 10 ─────────────────────────────────────────── */}
      <Chapter n={10} title="sshd: Hardening the Server" />
      <StoryBox>
        A default OpenSSH install is reasonably secure but not paranoid. An internet-facing SSH server will receive thousands of brute-force attempts per day. Hardening sshd is not optional — it is the difference between an annoying background noise and a breached server.
      </StoryBox>
      <H2>Essential sshd_config Hardening</H2>
      <CodeBlock>{`# /etc/ssh/sshd_config

# Disable password authentication - keys only
PasswordAuthentication no
ChallengeResponseAuthentication no
UsePAM no           # or: keep UsePAM yes but disable ChallengeResponse

# Disable root login
PermitRootLogin no
# (or PermitRootLogin prohibit-password if root must be accessible)

# Allow only specific users / groups
AllowUsers deploy ansible
AllowGroups ssh-access

# Modern algorithms only
KexAlgorithms curve25519-sha256,diffie-hellman-group16-sha512
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com

# Disable old protocol features
X11Forwarding no
AllowAgentForwarding no    # unless needed
AllowTcpForwarding no      # unless needed
PrintMotd no
Banner none

# Limit connection rate (supplement with fail2ban)
MaxAuthTries 3
MaxSessions 10
LoginGraceTime 30

# Log level for auditing
LogLevel VERBOSE`}</CodeBlock>
      <H2>Fail2ban and Port Knocking</H2>
      <Para>
        <Accent>Fail2ban</Accent> parses auth log files and bans IPs that exceed failed login thresholds. Install it and configure it to watch <Code>/var/log/auth.log</Code> (Ubuntu/Debian) or <Code>/var/log/secure</Code> (RHEL). A typical rule: 5 failures in 10 minutes → ban for 1 hour.
      </Para>
      <Para>
        <Accent>Port knocking</Accent> hides the SSH port: firewall drops all port-22 traffic until a client sends packets to a secret sequence of ports in order. After the knock sequence, the firewall temporarily opens port 22 for that source IP. This makes the server invisible to port scanners.
      </Para>
      <Para>
        Moving SSH to a non-standard port (e.g., 2222) reduces log noise but provides no real security — port scanners find it in seconds. It is security theater, not defense-in-depth.
      </Para>
      <WowBox>
        Shodan, the internet-connected device search engine, indexes all internet-accessible SSH servers. If your server has <Code>PasswordAuthentication yes</Code> and is reachable from the internet, automated credential stuffing bots will find it within hours. The average internet-facing server receives 1,000–5,000 SSH brute-force attempts per day.
      </WowBox>

      <Divider />
      {/* ── Chapter 11 ─────────────────────────────────────────── */}
      <Chapter n={11} title="SCP, SFTP, and rsync-over-SSH" />
      <StoryBox>
        SSH's channel multiplexing lets it carry more than shell sessions. File transfer protocols built on SSH take advantage of the same authenticated, encrypted transport — without needing a separate security layer. SCP, SFTP, and rsync are the three workhorses.
      </StoryBox>
      <H2>SCP: Simple Copy</H2>
      <Para>
        <Accent>SCP</Accent> (Secure Copy) uses the SSH connection to transfer files. Modern OpenSSH (9.0+) replaced the legacy SCP protocol (which had path injection vulnerabilities) with SFTP under the hood while keeping the SCP command interface.
      </Para>
      <CodeBlock>{`# Copy local file to remote
scp file.txt user@server:/remote/path/

# Copy remote file to local
scp user@server:/remote/file.txt ./local/

# Copy recursively
scp -r local_dir/ user@server:/remote/dir/

# Use specific key and port
scp -i ~/.ssh/deploy_key -P 2222 artifact.tar.gz deploy@server:/releases/`}</CodeBlock>
      <H2>SFTP: The Right Tool for File Operations</H2>
      <Para>
        <Accent>SFTP</Accent> is a full file transfer protocol defined in RFC draft-ietf-secsh-filexfer. Unlike SCP, which is a one-shot copy, SFTP is stateful: you open a connection, navigate directories, read/write files, stat metadata. OpenSSH's <Code>sftp-server</Code> subsystem runs on the remote as a child process.
      </Para>
      <CodeBlock>{`sftp user@server
# Connected to server.
sftp> ls -la /remote/path
sftp> get remote_file.txt
sftp> put local_file.txt /remote/
sftp> mkdir /remote/new_dir
sftp> chmod 644 /remote/new_dir/file
sftp> bye`}</CodeBlock>
      <H2>rsync over SSH: The Best of Both</H2>
      <Para>
        <Accent>rsync</Accent> over SSH combines rsync's delta-transfer algorithm with SSH's security. Only changed blocks of files are transferred — essential for large files or slow links. The <Code>-e ssh</Code> flag (default in modern rsync) routes traffic through SSH.
      </Para>
      <CodeBlock>{`# Sync local to remote (archive mode: preserves permissions, timestamps, symlinks)
rsync -avz --delete local_dir/ user@server:/remote/dir/

# Use specific SSH key and port
rsync -avz -e "ssh -i ~/.ssh/deploy_key -p 2222" dist/ deploy@server:/var/www/

# Dry run: show what would change without doing it
rsync -avzn local/ user@server:/remote/`}</CodeBlock>
      <Warn>
        The <Code>--delete</Code> flag removes files on the destination that don't exist on the source. Always do a dry run with <Code>-n</Code> before a destructive rsync. Forgetting <Code>--delete</Code> on a backup job means stale deleted files accumulate; including it without <Code>-n</Code> first can wipe destination-only files.
      </Warn>

      <Divider />
      {/* ── Chapter 12 ─────────────────────────────────────────── */}
      <Chapter n={12} title="SSH in Automation: CI/CD, Ansible, and Deploy Keys" />
      <StoryBox>
        Humans type passphrases. Machines cannot. Automation — CI/CD pipelines, configuration management, deployment tools — needs SSH keys that can authenticate without human interaction. The security challenge: how do you store long-lived SSH credentials without putting a target on your infrastructure?
      </StoryBox>
      <H2>Deploy Keys (GitHub / GitLab)</H2>
      <Para>
        A <Accent>deploy key</Accent> is an SSH key pair associated with a single repository rather than a user account. The public key is registered in the repository settings with read-only (or read-write) access. The private key is placed in the CI runner or deployment server.
      </Para>
      <CodeBlock>{`# Generate a dedicated deploy key (no passphrase for automation)
ssh-keygen -t ed25519 -f ~/.ssh/deploy_key_myrepo -C "deploy@myrepo" -N ""

# Add public key to GitHub repo Settings → Deploy Keys
# Store private key in CI/CD secret: SECRET_DEPLOY_KEY

# Use in CI
eval "$(ssh-agent -s)"
echo "$SECRET_DEPLOY_KEY" | ssh-add -
git clone git@github.com:org/repo.git`}</CodeBlock>
      <H2>Ansible and SSH</H2>
      <Para>
        Ansible manages remote hosts exclusively over SSH. The control node needs key-based authentication to all managed hosts. Key practices:
      </Para>
      <Para>
        1. Create a dedicated <Code>ansible</Code> service account on managed hosts with a locked password (only SSH key auth).
      </Para>
      <Para>
        2. Store the Ansible private key in your secrets manager (Vault, AWS Secrets Manager).
      </Para>
      <Para>
        3. Use <Code>ansible_ssh_common_args: '-o StrictHostKeyChecking=yes'</Code> — never disable host key checking in production.
      </Para>
      <Para>
        4. Use Ansible Vault to encrypt sensitive variables — SSH keys in playbook repos must be encrypted, not committed in plaintext.
      </Para>
      <H2>Short-Lived Certificates for Automation</H2>
      <Para>
        The gold standard: automation requests a signed SSH certificate from Vault (valid 15–60 minutes) at the start of each job. The certificate expires before the job could be replayed. No long-lived secrets on disk. This is available via Vault's SSH Secrets Engine and is the pattern used by large engineering organizations.
      </Para>

      <Divider />
      {/* ── Chapter 13 ─────────────────────────────────────────── */}
      <Chapter n={13} title="Misconceptions About SSH" />
      <Err>
        "SSH encrypts everything, so my server is secure." — Encryption is transport security, not access control. If password authentication is enabled and someone brute-forces your credentials, encryption provides zero protection. The attacker's session is encrypted too. Disable password auth.
      </Err>
      <Err>
        "Moving SSH to port 2222 protects against attacks." — This is security through obscurity, not security. Masscan can scan the entire IPv4 internet for all 65535 ports in under 6 minutes. Attackers find non-standard SSH ports within hours. Change the port to reduce log noise if that helps operationally, but never rely on it for security.
      </Err>
      <Err>
        "My private key is safe because it has a passphrase." — A passphrase encrypts the key file on disk. If you add it to an SSH agent on a compromised machine, or if you forward the agent to an untrusted host, your private key is accessible to anyone who can interact with the agent socket — regardless of the passphrase.
      </Err>
      <Err>
        "SSH agent forwarding is safe because the private key never leaves my machine." — True: the key doesn't cross the socket. But the signing oracle does. Root on the remote server can connect to your forwarded agent and sign arbitrary challenges — authenticating as you to any host your key accesses. The key never moves, but the capability does.
      </Err>
      <Err>
        "Root login is only dangerous if password auth is enabled." — Even with key-only auth, permitting root login means a compromised key grants immediate root everywhere that key is authorized. Use a non-root account with sudo access instead. Privilege escalation stays audited in sudo logs; direct root login does not.
      </Err>
      <Err>
        "known_hosts protects me from MITM attacks." — It protects you on the second and subsequent connections. The first connection (TOFU) is unverified. If an attacker intercepts your very first SSH connection to a new server and you type "yes", you have accepted their host key and subsequent connections will verify against the attacker's key, not the real server's.
      </Err>

      <Divider />
      {/* ── Chapter 14 ─────────────────────────────────────────── */}
      <Chapter n={14} title="IQ Depth Check: How Deep Does Your SSH Knowledge Go?" />
      <IQ level="Beginner">
        <strong>What does SSH stand for and what does it replace?</strong><br />
        SSH stands for Secure Shell. It replaces Telnet (unencrypted remote shell), rlogin (trusted-hostname authentication), rsh (remote shell execution), and rcp (remote file copy) — all of which transmitted credentials and data in plaintext over the network.
      </IQ>
      <IQ level="Intermediate">
        <strong>Explain the difference between -L, -R, and -D port forwarding.</strong><br />
        <strong>-L (local)</strong>: Listens on a local port, forwards connections through the SSH tunnel to a destination reachable by the SSH server. Good for accessing internal services through a bastion. <strong>-R (remote)</strong>: Listens on a port on the SSH server, forwards connections back through the tunnel to a destination reachable by your local machine. Good for exposing local services. <strong>-D (dynamic)</strong>: Creates a SOCKS5 proxy locally; the SSH client dynamically opens channels to destinations requested by SOCKS clients — no fixed destination. Good for routing arbitrary traffic.
      </IQ>
      <IQ level="Senior">
        <strong>How does SSH certificate authentication differ from public key authentication, and when should you use certificates?</strong><br />
        Public key auth requires the server to have the user's public key in <Code>authorized_keys</Code> — managed per-server. Certificates add a CA layer: the server trusts a CA key; users present keys signed by the CA with embedded principals, validity period, and critical options. Benefits: no per-server key distribution, automatic expiry, centralized revocation, auditable serial numbers. Use certificates when managing more than a handful of servers or engineers, or when you need short-lived access (ephemeral certs from Vault with 30-minute TTLs).
      </IQ>
      <IQ level="PhD">
        <strong>Explain the cryptographic binding in SSH public key authentication — why can't a valid signature from one session be replayed against another?</strong><br />
        During public key authentication, the data signed by the client is: <Code>SHA-256(session_id || "publickey" || username || service_name || algorithm || public_key_blob)</Code>. The session_id is the exchange hash H from the key exchange phase — computed as SHA-256(client_version || server_version || client_KEXINIT || server_KEXINIT || host_public_key || client_ephemeral_pub || server_ephemeral_pub || shared_secret K). Since the ephemeral keys are random per session, H is unique per session. Including H in the signed data means a valid signature is bound to a specific session's H — it cannot be reused in a session with a different H. This prevents signature replay attacks across sessions.
      </IQ>

      <Divider />
      <KeyTakeaways items={[
        'SSH-2 (RFC 4251–4254) is the only acceptable version; SSH-1 has cryptographic flaws and must be disabled.',
        'The SSH protocol has three layers: Transport (encryption, key exchange), Authentication (publickey/password/cert), and Connection (multiplexed channels).',
        'Curve25519 ECDH key exchange provides perfect forward secrecy — session keys are ephemeral and not derivable from the host key even if the host key is later compromised.',
        'Public key authentication uses challenge-response with the session ID embedded in the signed data, preventing cross-session replay.',
        'SSH certificates (SSH CA) eliminate authorized_keys management at scale and enable short-lived, automatically expiring access.',
        'Agent forwarding grants root-on-remote the ability to use your agent as a signing oracle — prefer ProxyJump over -A.',
        'ControlMaster/ControlPersist multiplexes multiple SSH sessions over one TCP connection, dramatically speeding up repeated operations.',
        'Disable PasswordAuthentication, PermitRootLogin, and legacy algorithms in sshd_config; complement with fail2ban.',
        'Deploy keys and short-lived certificates from Vault are the right approach for CI/CD and automation — long-lived unprotected private keys in CI secrets are a liability.',
        'Trust-on-first-use (TOFU) means the first connection to a new server is the attack window; verify host key fingerprints out-of-band for critical systems.',
      ]} />
    </LearnLayout>
  )
}
